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
          val splitHead = head match
            case _: Ident => head
            case App(id: Ident, TyTup(tup)) => App(id, TyTup(tup.map(
              t => Tup(Tree.Modified(syntax.Keyword.`in`, N, t) :: Tree.Modified(syntax.Keyword.`out`, N, t) :: Nil)
            )))
          def genCtorHead(decl: Tree) = head match
            case _: Ident => decl
            case App(_: Ident, tup: TyTup) => decl match
              case App(id: Ident, ps: Tup) => App(App(id, tup), ps)
              case id: Ident => App(id, tup)
              case _ => ??? // TODO: GADT
          PossiblyAnnotated(anns, TypeDef(syntax.Cls, head, rhs, if rest.isEmpty then N else S(Block(rest)))) ::
            (ctors.map(h => PossiblyAnnotated(anns, TypeDef(syntax.Cls, InfixApp(genCtorHead(h), syntax.Keyword.`extends`, splitHead), N, N))))
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


