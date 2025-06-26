package hkmc2

import scala.collection.mutable

import mlscript.utils.*, shorthands.*
import utils.*

import hkmc2.semantics.MemberSymbol
import hkmc2.semantics.Elaborator
import hkmc2.semantics.{Resolver, FileImporter}
import semantics.Elaborator.Ctx
import hkmc2.syntax.Keyword.`override`
import semantics.Elaborator.State


class ParserSetup(file: os.Path, dbgParsing: Bool)(using Elaborator.State, Raise):
  
  val block = os.read(file)
  val fph = new FastParseHelpers(block)
  val origin = Origin(file.toString, 0, fph)
  
  val lexer = new syntax.Lexer(origin, dbg = dbgParsing)
  val tokens = lexer.bracketedTokens
  
  // if showParse.isSet || dbgParsing.isSet then
  //   output(syntax.Lexer.printTokens(tokens))
  
  val rules = syntax.ParseRules()
  val parser = new syntax.Parser(origin, tokens, rules, raise, dbg = dbgParsing):
    def doPrintDbg(msg: => Str): Unit =
      // if dbg then output(msg)
      if dbg then println(msg)
  
  val result = parser.parseAll(parser.block(allowNewlines = true))
  
  val resultBlk = new syntax.Tree.Block(result)
  


// * The weird type of `mkOutput` is to allow wrapping the reporting of diagnostics in synchronized blocks
class MLsCompiler(preludeFile: os.Path, mkOutput: ((Str => Unit) => Unit) => Unit)(using Config):
  
  val runtimeFile: os.Path = preludeFile/os.up/os.up/os.up/"mlscript-compile"/"Runtime.mjs"
  val termFile: os.Path = preludeFile/os.up/os.up/os.up/"mlscript-compile"/"Term.mjs"
  
  
  val report = ReportFormatter: outputConsumer =>
    mkOutput: output =>
      outputConsumer: str =>
        output(fansi.Color.Red(str).toString)
  
  
  // TODO adapt logic
  val etl = new TraceLogger{override def doTrace: Bool = false}
  val ltl = new TraceLogger{override def doTrace: Bool = false}
  val rtl = new TraceLogger{override def doTrace: Bool = false}
  
  
  var dbgParsing = false
  
  
  def compileModule(file: os.Path): Unit =
    
    val wd = file / os.up
    
    given raise: Raise = d =>
      mkOutput:
        _(fansi.Color.LightRed(s"/!!!\\ Error in ${file.relativeTo(wd/os.up)} /!!!\\").toString)
      report(0, d :: Nil, showRelativeLineNums = false)
    
    given Elaborator.State = new Elaborator.State
    
    val preludeParse = ParserSetup(preludeFile, dbgParsing)
    val mainParse = ParserSetup(file, dbgParsing)
    
    val elab = Elaborator(etl, new FileImporter(wd, Ctx.empty)(using etl))
    
    val initState = State.init.nestLocal
    
    val (pblk, newCtx) = elab.importFrom(preludeParse.resultBlk)(using initState)
    
    newCtx.nestLocal.givenIn:
      val elab = Elaborator(etl, new FileImporter(wd, newCtx)(using etl))
      val parsed = mainParse.resultBlk
      val (blk0, _) = elab.importFrom(parsed)
      val resolver = Resolver(rtl)
      resolver.traverseBlock(blk0)(using Resolver.ICtx.empty)
      val blk = new semantics.Term.Blk(
        // semantics.Import(State.runtimeSymbol, runtimeFile.toString) :: semantics.Import(State.termSymbol, termFile.toString) :: blk0.stats,
        semantics.Import(State.runtimeSymbol, runtimeFile.toString) :: blk0.stats,
        blk0.res
      )
      val low = ltl.givenIn:
        new codegen.Lowering()
          with codegen.LoweringSelSanityChecks
      val jsb = ltl.givenIn:
        codegen.js.JSBuilder()
      val le = low.program(blk)
      val baseScp: utils.Scope =
        utils.Scope.empty
      // * This line serves for `import.meta.url`, which retrieves directory and file names of mjs files.
      // * Having `module id"import" with ...` in `prelude.mls` will generate `globalThis.import` that is undefined.
      baseScp.bindings += Elaborator.State.importSymbol -> "import"
      val nestedScp = baseScp.nest
      val nme = file.baseName
      val exportedSymbol = parsed.definedSymbols.find(_._1 === nme).map(_._2)
      val je = nestedScp.givenIn:
        jsb.program(le, exportedSymbol, wd)
      val jsStr = je.stripBreaks.mkString(100)
      val out = file / os.up / (file.baseName + ".mjs")
      os.write.over(out, jsStr)
  
  
end MLsCompiler


