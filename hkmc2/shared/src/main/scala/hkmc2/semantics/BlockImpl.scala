package hkmc2
package semantics

import mlscript.utils.*, shorthands.*
import syntax.Tree
import syntax.Tree.*
import hkmc2.syntax.{PossiblyAnnotated, TypeOrTermDef}


trait BlockImpl(using Elaborator.State):
  self: Block =>
  
  val desugStmts =
    def desug(stmts: Ls[Tree]): Ls[Tree] =
      stmts match
      case stmt :: stmts =>
        stmt.desugared match
        case PossiblyAnnotated(anns, h @ Hndl(body = N)) =>
          PossiblyAnnotated(anns, h.copy(body = S(Block(stmts)))) :: Nil
        case PossiblyAnnotated(anns, TypeDef(syntax.Cls, head, rhs, S(Block(Constructor(Block(ctors)) :: rest)))) =>
          val (headId, headPs) = head match
            case id: Ident => (id, Nil)
            case App(id: Ident, TyTup(ps)) => (id, ps)
            case _ => Error() // TODO: report invalid head
          def wrapGeneric(decl: Tree, res: Tree) = decl match // TODO a temp solution for gadt. remove it later.
            case InfixApp(_, syntax.Keyword.`extends`, _) =>
              Annotated(Keywrd(syntax.Keyword.data), res)
            case _ => res
          def genExt(decl: Tree) = decl match
            case InfixApp(_, syntax.Keyword.`extends`, ext) => ext match
              case _: Ident if headPs.isEmpty => ext
              case App(id: Ident, TyTup(ps)) if id.name == headId.name && ps.length == headPs.length => ext
              case _ => Error() // TODO: report invalid head
            case _ => headPs match
              case Nil => headId
              case ps => App(headId, TyTup(ps.map(
                t => Tup(Tree.Modified(syntax.Keyword.`in`, N, t) :: Tree.Modified(syntax.Keyword.`out`, N, t) :: Nil)
              )))
          def genCtorHead(decl: Tree) = decl match
            case InfixApp(decl, syntax.Keyword.`extends`, _) => decl // check will be applied in genExt
            case App(_: Ident, tup: TyTup) => Error() // TODO: report invalid head
            case App(id: Ident, ps: Tup) => App(App(id, TyTup(headPs)), ps)
            case id: Ident => App(id, TyTup(headPs))
            case _ => Error() // TODO: report invalid head
          def insertVal(decl: Tree): Tree = decl match
            case id: Ident => id
            case App(f, Tup(ps)) => App(f, Tup(ps.map(p => TermDef(syntax.ImmutVal, p, N))))
            case App(f, tup: TyTup) => App(insertVal(f), tup)
            case _ => Error() // TODO: report invalid head
          PossiblyAnnotated(anns, TypeDef(syntax.Cls, head, rhs, if rest.isEmpty then N else S(Block(rest)))) ::
            (ctors.map(h => PossiblyAnnotated(anns, wrapGeneric(h, TypeDef(syntax.Cls, InfixApp(insertVal(genCtorHead(h)), syntax.Keyword.`extends`, genExt(h)), N, N)))))
          ::: desug(stmts)
        case stmt => stmt :: desug(stmts)
      case Nil => Nil
    desug(stmts)
  
  val definedSymbols: Array[Str -> BlockMemberSymbol] =
    desugStmts
      .flatMap:
        case PossiblyAnnotated(_, td: syntax.TypeOrTermDef) =>
          td.name match
            case L(_) => Nil
            case R(id) =>
              id.name -> R(td) :: (
                td.symbName match
                case S(R(sid)) => id.name -> L(sid.name) :: Nil
                case _ => Nil
              )
        case _ => Nil
      .groupMap(_._1)(_._2).flatMap:
        case (nme, snmes_tds) =>
          val (symNmes, tds) = snmes_tds.partitionMap(identity)
          val sym = new BlockMemberSymbol(nme, tds)
          nme -> sym :: symNmes.map(_ -> sym)
      .toArray.sortBy(_._1)
  
end BlockImpl


