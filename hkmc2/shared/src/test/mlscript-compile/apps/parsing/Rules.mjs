import runtime from "./../../Runtime.mjs";
import Predef from "./../../Predef.mjs";
import Option from "./../../Option.mjs";
import Stack from "./../../Stack.mjs";
import BetterMap from "./../../BetterMap.mjs";
import TreeTracer from "./../../TreeTracer.mjs";
import Iter from "./../../Iter.mjs";
import Lexer from "./../Lexer.mjs";
import Token from "./Token.mjs";
import TokenHelpers from "./TokenHelpers.mjs";
import Keyword from "./Keyword.mjs";
import Precedence from "./Precedence.mjs";
import Tree from "./Tree.mjs";
import ParseRule from "./ParseRule.mjs";
let Rules1;
Rules1 = class Rules {
  static #letExpression;
  static #funTerm;
  static {
    let tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20, tmp21, tmp22, tmp23, tmp24, tmp25, tmp26, tmp27, tmp28, tmp29, tmp30, tmp31, tmp32, tmp33, tmp34, tmp35, tmp36, tmp37, tmp38, tmp39, tmp40, tmp41, tmp42, tmp43, tmp44, tmp45, tmp46, tmp47, tmp48, tmp49, tmp50, tmp51, tmp52, tmp53, tmp54, tmp55, tmp56, tmp57, tmp58, tmp59, tmp60, tmp61, tmp62, tmp63, tmp64, tmp65, tmp66, tmp67, tmp68, tmp69, tmp70, tmp71, tmp72, tmp73, tmp74, tmp75, tmp76, tmp77, tmp78, tmp79, tmp80, tmp81, tmp82, tmp83, tmp84, tmp85, tmp86, tmp87, tmp88, tmp89, tmp90, tmp91, tmp92, tmp93, tmp94, tmp95, tmp96, tmp97, tmp98, tmp99, tmp100, tmp101, tmp102, tmp103, tmp104, tmp105, tmp106, tmp107, tmp108, tmp109, tmp110, tmp111, tmp112, tmp113, tmp114, tmp115, tmp116, tmp117, tmp118, tmp119, tmp120, tmp121, tmp122, tmp123, tmp124, tmp125, tmp126, tmp127, tmp128, tmp129, tmp130, tmp131, tmp132, tmp133, tmp134, tmp135, tmp136, tmp137, tmp138, tmp139, tmp140, tmp141, tmp142, tmp143, tmp144, tmp145, tmp146, tmp147, tmp148, tmp149, tmp150, tmp151, tmp152, tmp153, tmp154, tmp155, tmp156, tmp157, tmp158, tmp159, tmp160, tmp161, tmp162, tmp163, tmp164, tmp165, tmp166, tmp167, tmp168, tmp169, tmp170, tmp171, tmp172, tmp173, tmp174, tmp175, tmp176, tmp177, tmp178, tmp179, tmp180, tmp181, tmp182, tmp183, tmp184, tmp185, tmp186, tmp187, tmp188, tmp189, tmp190, tmp191, tmp192, tmp193, tmp194, lambda, lambda1, lambda2, lambda3, lambda4, lambda5, lambda6, lambda7, lambda8, lambda9, lambda10, lambda11, lambda12, lambda13, lambda14, lambda15, lambda16, lambda17, lambda18, lambda19, lambda20, lambda21, lambda22, lambda23, lambda24, lambda25, lambda26, lambda27, lambda28, lambda29, lambda30, lambda31, lambda32, lambda33, lambda34, lambda35, lambda36, lambda37, lambda38, lambda39, lambda40, lambda41, lambda42, lambda43, lambda44, lambda45, lambda46, lambda47, lambda48, lambda49, lambda50, lambda51, lambda52, lambda53, lambda54, lambda55, lambda56, lambda57, lambda58, lambda59, lambda60, lambda61, lambda62, lambda63, lambda64;
    tmp = new BetterMap.Map();
    this.syntaxKinds = tmp;
    tmp1 = new globalThis.Set();
    this.extendedKinds = tmp1;
    lambda = (undefined, function (lhs, rhsBindings) {
      let first1, first0, rhs, bindings, tmp195;
      if (globalThis.Array.isArray(rhsBindings) && rhsBindings.length === 2) {
        first0 = rhsBindings[0];
        first1 = rhsBindings[1];
        rhs = first0;
        bindings = first1;
        tmp195 = Tree.Infix(Precedence.Keywords._equal, lhs, rhs);
        return Stack.Cons(tmp195, bindings)
      } else {
        throw new globalThis.Error("match error");
      }
    });
    tmp2 = lambda;
    tmp3 = ParseRule.Choice.end(Stack.Nil);
    lambda1 = (undefined, function (tail, _) {
      return tail
    });
    tmp4 = ParseRule.Choice.reference("let-bindings", lambda1, "let-bindings tail");
    tmp5 = ParseRule.Choice.keyword(Precedence.Keywords._and, tmp4);
    lambda2 = (undefined, function (rhs, tail) {
      return [
        rhs,
        tail
      ]
    });
    tmp6 = ParseRule.Choice.term(lambda2, "right-hand side", tmp3, tmp5);
    tmp7 = ParseRule.Choice.keyword(Precedence.Keywords._equal, tmp6);
    tmp8 = ParseRule.Choice.term(tmp2, "left-hand side", tmp7);
    tmp9 = Rules.defineKind("let-bindings", tmp8);
    tmp10 = Rules.makeLetBindings(true);
    Rules.#letExpression = tmp10;
    tmp11 = ParseRule.Choice.end(Option.None);
    lambda3 = (undefined, function (body, _) {
      return body
    });
    tmp12 = ParseRule.Choice.term(lambda3, "function body", tmp11);
    tmp13 = ParseRule.Choice.keyword(Precedence.Keywords._thinArrow, tmp12);
    lambda4 = (undefined, function (params, body) {
      let tmp195;
      tmp195 = Stack.Cons(params, Stack.Nil);
      return Tree.Lambda(tmp195, body)
    });
    tmp14 = ParseRule.Choice.term(lambda4, "function parameters", tmp13);
    tmp15 = ParseRule.Choice.keyword(Precedence.Keywords._fun, tmp14);
    Rules.#funTerm = tmp15;
    lambda5 = (undefined, function (lhs, rhsTail) {
      let first1, first0, rhs, tail, tmp195;
      if (globalThis.Array.isArray(rhsTail) && rhsTail.length === 2) {
        first0 = rhsTail[0];
        first1 = rhsTail[1];
        rhs = first0;
        tail = first1;
        tmp195 = Tree.Infix(Precedence.Keywords._thinArrow, lhs, rhs);
        return Stack.Cons(tmp195, tail)
      } else {
        throw new globalThis.Error("match error");
      }
    });
    tmp16 = lambda5;
    tmp17 = ParseRule.Choice.end(Stack.Nil);
    lambda6 = (undefined, function (tail, _) {
      return tail
    });
    tmp18 = ParseRule.Choice.reference("simple-matching", lambda6, "simple-matching tail");
    tmp19 = ParseRule.Choice.keyword(Precedence.Keywords._bar, tmp18);
    lambda7 = (undefined, function (rhs, tail) {
      return [
        rhs,
        tail
      ]
    });
    tmp20 = ParseRule.Choice.term(lambda7, "rhs", tmp17, tmp19);
    tmp21 = ParseRule.Choice.keyword(Precedence.Keywords._thinArrow, tmp20);
    tmp22 = ParseRule.Choice.term(tmp16, "pattern", tmp21);
    tmp23 = Rules.defineKind("simple-matching", tmp22);
    lambda8 = (undefined, function (tail, _) {
      return tail
    });
    tmp24 = ParseRule.Choice.reference("pattern-list", lambda8, "pattern list tail");
    lambda9 = (undefined, function (head, tail) {
      return Stack.Cons(head, tail)
    });
    tmp25 = ParseRule.Choice.term(lambda9, "pattern", tmp24);
    tmp26 = Rules.defineKind("pattern-list", tmp25);
    tmp27 = Tree.infix(Precedence.Keywords._thinArrow);
    tmp28 = ParseRule.Choice.end(Stack.Nil);
    lambda10 = (undefined, function (tail, _) {
      return tail
    });
    tmp29 = ParseRule.Choice.reference("multiple-matching", lambda10, "multiple-matching tail");
    tmp30 = ParseRule.Choice.keyword(Precedence.Keywords._bar, tmp29);
    lambda11 = (undefined, function (rhs, _) {
      return rhs
    });
    tmp31 = ParseRule.Choice.term(lambda11, "the right-hand side of the arrow", tmp28, tmp30);
    tmp32 = ParseRule.Choice.keyword(Precedence.Keywords._thinArrow, tmp31);
    tmp33 = ParseRule.Choice.reference("pattern-list", tmp27, "the list of patterns", tmp32);
    tmp34 = Rules.defineKind("multiple-matching", tmp33);
    lambda12 = (undefined, function (lhs, rhs) {
      let param0, tail, tmp195, tmp196, tmp197;
      if (rhs instanceof Tree.Tuple.class) {
        param0 = rhs.trees;
        tail = param0;
        tmp195 = Stack.Cons(lhs, tail);
        return Tree.Tuple(tmp195)
      } else {
        tmp196 = Stack.Cons(rhs, Stack.Nil);
        tmp197 = Stack.Cons(lhs, tmp196);
        return Tree.Tuple(tmp197)
      }
    });
    tmp35 = lambda12;
    tmp36 = Rules.makeInfixChoice(Precedence.Keywords._comma, "term", tmp35);
    lambda13 = (undefined, function (lhs, rhs) {
      let param0, tail, tmp195, tmp196, tmp197;
      if (rhs instanceof Tree.Sequence.class) {
        param0 = rhs.trees;
        tail = param0;
        tmp195 = Stack.Cons(lhs, tail);
        return Tree.Sequence(tmp195)
      } else {
        tmp196 = Stack.Cons(rhs, Stack.Nil);
        tmp197 = Stack.Cons(lhs, tmp196);
        return Tree.Sequence(tmp197)
      }
    });
    tmp37 = lambda13;
    tmp38 = Rules.makeInfixChoice(Precedence.Keywords._semicolon, "term", tmp37);
    lambda14 = (undefined, function (lhs, rhs) {
      return Tree.Infix(Precedence.Keywords._leftArrow, lhs, rhs)
    });
    tmp39 = Rules.makeInfixChoice(Precedence.Keywords._leftArrow, "term", lambda14);
    lambda15 = (undefined, function (lhs, rhs) {
      return Tree.Infix(Precedence.Keywords._equalequal, lhs, rhs)
    });
    tmp40 = Rules.makeInfixChoice(Precedence.Keywords._equalequal, "term", lambda15);
    lambda16 = (undefined, function (lhs, rhs) {
      let tmp195, tmp196, tmp197;
      tmp195 = Tree.Ident("*", true);
      tmp196 = Stack.Cons(rhs, Stack.Nil);
      tmp197 = Stack.Cons(lhs, tmp196);
      return Tree.App(tmp195, tmp197)
    });
    tmp41 = lambda16;
    tmp42 = Rules.makeInfixChoice(Precedence.Keywords._asterisk, "term", tmp41);
    tmp43 = ParseRule.Choice.keyword(Precedence.Keywords._rightRound);
    lambda17 = (undefined, function (argument, _) {
      let lambda65;
      lambda65 = (undefined, function (lhs) {
        let tmp195;
        tmp195 = Tree.Bracketed(Token.Round, argument);
        return Tree.Infix(Precedence.Keywords._period, lhs, tmp195)
      });
      return lambda65
    });
    tmp44 = ParseRule.Choice.term(lambda17, "application argument", tmp43);
    tmp45 = ParseRule.Choice.keyword(Precedence.Keywords._leftRound, tmp44);
    lambda18 = (undefined, function (rhs, _) {
      let lambda65;
      lambda65 = (undefined, function (lhs) {
        return Tree.Infix(Precedence.Keywords._period, lhs, rhs)
      });
      return lambda65
    });
    tmp46 = ParseRule.Choice.reference("term", lambda18, "operator `.` right-hand side");
    tmp47 = ParseRule.Choice.keyword(Precedence.Keywords._period, tmp45, tmp46);
    lambda19 = (undefined, function (rhs, _) {
      let lambda65;
      lambda65 = (undefined, function (lhs) {
        return Tree.Infix(Precedence.Keywords._colon, lhs, rhs)
      });
      return lambda65
    });
    tmp48 = ParseRule.Choice.typeExpr(lambda19, "right-hand side type");
    tmp49 = ParseRule.Choice.keyword(Precedence.Keywords._colon, tmp48);
    tmp50 = Option.Some(Precedence.Keywords.appPrec);
    lambda20 = (undefined, function (argument, _) {
      let lambda65;
      lambda65 = (undefined, function (callee) {
        return Tree.App(callee, argument)
      });
      return lambda65
    });
    tmp51 = ParseRule.Choice.termWithPrec(lambda20, "application argument", tmp50, Option.None);
    tmp52 = ParseRule.rule("infix rules for expressions", tmp36, tmp38, tmp39, tmp40, tmp42, tmp47, tmp49, tmp51);
    this.termInfixRule = tmp52;
    tmp53 = ParseRule.Choice.keyword(Precedence.Keywords._bar);
    tmp54 = ParseRule.rule("pattern matching case body", tmp53);
    tmp55 = Rules.getRuleByKind("simple-matching");
    tmp56 = ParseRule.Choice.optional(tmp54, tmp55);
    tmp57 = ParseRule.Choice.keyword(Precedence.Keywords._with, tmp56);
    tmp58 = ParseRule.Choice.term(Tree.Match, "pattern matching scrutinee", tmp57);
    tmp59 = ParseRule.Choice.keyword(Precedence.Keywords._match, tmp58);
    tmp60 = ParseRule.Choice.keyword(Precedence.Keywords._bar);
    tmp61 = ParseRule.rule("function body", tmp60);
    tmp62 = Rules.getRuleByKind("simple-matching");
    tmp63 = ParseRule.Choice.optional(tmp61, tmp62);
    lambda21 = (undefined, function (branches) {
      return Tree.Match(Tree.empty, branches)
    });
    tmp64 = ParseRule.Choice.map(tmp63, lambda21);
    tmp65 = ParseRule.Choice.keyword(Precedence.Keywords._function, tmp64);
    lambda22 = (undefined, function (tst, conAlt) {
      let first1, first0, con, alt;
      if (globalThis.Array.isArray(conAlt) && conAlt.length === 2) {
        first0 = conAlt[0];
        first1 = conAlt[1];
        con = first0;
        alt = first1;
        return Tree.Ternary(Precedence.Keywords._if, tst, con, alt)
      } else {
        throw new globalThis.Error("match error");
      }
    });
    tmp66 = lambda22;
    tmp67 = ParseRule.Choice.end(Option.None);
    tmp68 = ParseRule.Choice.end(Option.None);
    lambda23 = (undefined, function (alt, _) {
      return Option.Some(alt)
    });
    tmp69 = ParseRule.Choice.term(lambda23, "if-then-else alternative", tmp68);
    tmp70 = ParseRule.Choice.keyword(Precedence.Keywords._else, tmp69);
    lambda24 = (undefined, function (con, optAlt) {
      return [
        con,
        optAlt
      ]
    });
    tmp71 = ParseRule.Choice.term(lambda24, "if-then-else consequent", tmp67, tmp70);
    tmp72 = ParseRule.Choice.keyword(Precedence.Keywords._then, tmp71);
    tmp73 = ParseRule.Choice.term(tmp66, "if-then-else condition", tmp72);
    tmp74 = ParseRule.Choice.keyword(Precedence.Keywords._if, tmp73);
    tmp75 = ParseRule.Choice.keyword(Precedence.Keywords._done);
    lambda25 = (undefined, function (body, _) {
      return body
    });
    tmp76 = ParseRule.Choice.term(lambda25, "while end", tmp75);
    tmp77 = ParseRule.Choice.keyword(Precedence.Keywords._do, tmp76);
    tmp78 = ParseRule.Choice.term(Tree.While, "while body", tmp77);
    tmp79 = ParseRule.Choice.keyword(Precedence.Keywords._while, tmp78);
    tmp80 = ParseRule.Choice.keyword(Precedence.Keywords._to);
    tmp81 = ParseRule.Choice.keyword(Precedence.Keywords._downto);
    tmp82 = ParseRule.rule("iteration keyword", tmp80, tmp81);
    tmp83 = ParseRule.Choice.keyword(Precedence.Keywords._done);
    lambda26 = (undefined, function (body, _) {
      return body
    });
    tmp84 = ParseRule.Choice.term(lambda26, "`for` `done` keyword", tmp83);
    tmp85 = ParseRule.Choice.keyword(Precedence.Keywords._do, tmp84);
    lambda27 = (undefined, function (end, body) {
      return [
        end,
        body
      ]
    });
    tmp86 = ParseRule.Choice.term(lambda27, "`for` `do` keyword", tmp85);
    tmp87 = ParseRule.rule("the iteration keyword", tmp86);
    tmp88 = ParseRule.Choice.siding(tmp82, tmp87);
    lambda28 = (undefined, function (start, endBody) {
      return [
        start,
        ...endBody
      ]
    });
    tmp89 = ParseRule.Choice.term(lambda28, "`for` `to` or `downto` keyword", tmp88);
    tmp90 = ParseRule.Choice.keyword(Precedence.Keywords._equal, tmp89);
    lambda29 = (undefined, function (head, startEndBody) {
      return Tree.For(head, ...startEndBody)
    });
    tmp91 = ParseRule.Choice.term(lambda29, "`for` head", tmp90);
    tmp92 = ParseRule.Choice.keyword(Precedence.Keywords._for, tmp91);
    lambda30 = (undefined, function (tree) {
      if (tree instanceof Tree.Empty.class) {
        return Tree.Tuple(Stack.Nil)
      } else {
        return tree
      }
    });
    tmp93 = Rules.makeBracketRule(Precedence.Keywords._leftRound, Precedence.Keywords._rightRound, "term", lambda30);
    lambda31 = (undefined, function (tree) {
      let tmp195;
      if (tree instanceof Tree.Empty.class) {
        tmp195 = Tree.Sequence(Stack.Nil);
      } else {
        tmp195 = tree;
      }
      return Tree.Bracketed(Token.Square, tmp195)
    });
    tmp94 = lambda31;
    tmp95 = Rules.makeBracketRule(Precedence.Keywords._leftSquare, Precedence.Keywords._rightSquare, "term", tmp94);
    tmp96 = Rules.makeBracketRule(Precedence.Keywords._leftCurly, Precedence.Keywords._rightCurly, "term", Predef.id);
    lambda32 = (undefined, function (tree) {
      if (tree instanceof Tree.Empty.class) {
        return Tree.Sequence(Stack.Nil)
      } else {
        return tree
      }
    });
    tmp97 = Rules.makeBracketRule(Precedence.Keywords._begin, Precedence.Keywords._end, "term", lambda32);
    lambda33 = (undefined, function (lhs, compose) {
      return runtime.safeCall(compose(lhs))
    });
    tmp98 = ParseRule.Choice.Ref("term", lambda33, Option.None, Option.None, Rules.termInfixRule);
    tmp99 = ParseRule.rule("prefix rules for expressions", Rules.#letExpression, Rules.#funTerm, tmp59, tmp65, tmp74, tmp79, tmp92, tmp93, tmp95, tmp96, tmp97, tmp98);
    this.termRule = tmp99;
    lambda34 = (undefined, function (lhs, rhs) {
      return Tree.Infix(Precedence.Keywords._thinArrow, lhs, rhs)
    });
    tmp100 = Rules.makeInfixChoice(Precedence.Keywords._thinArrow, "type", lambda34);
    lambda35 = (undefined, function (lhs, rhs) {
      return Tree.Infix(Precedence.Keywords._asterisk, lhs, rhs)
    });
    tmp101 = Rules.makeInfixChoice(Precedence.Keywords._asterisk, "type", lambda35);
    tmp102 = Option.Some(Precedence.Keywords.appPrec);
    tmp103 = ParseRule.rule("end of type infix rules");
    lambda36 = (undefined, function (callee, _) {
      let lambda65;
      lambda65 = (undefined, function (argument) {
        return Tree.App(callee, argument)
      });
      return lambda65
    });
    tmp104 = ParseRule.Choice.Ref("type", lambda36, tmp102, Option.None, tmp103);
    tmp105 = ParseRule.rule("infix rules for types", tmp100, tmp101, tmp104);
    this.typeInfixRule = tmp105;
    lambda37 = (undefined, function (headArg, tailArgsCtor) {
      let param0, ctor, first1, first0, tailArgs, ctor1, tmp195, tmp196;
      if (globalThis.Array.isArray(tailArgsCtor) && tailArgsCtor.length === 2) {
        first0 = tailArgsCtor[0];
        first1 = tailArgsCtor[1];
        tailArgs = first0;
        ctor1 = first1;
        tmp195 = Stack.Cons(headArg, tailArgs);
        tmp196 = Tree.Tuple(tmp195);
        return Tree.App(ctor1, tmp196)
      } else if (tailArgsCtor instanceof Option.Some.class) {
        param0 = tailArgsCtor.value;
        ctor = param0;
        return Tree.App(ctor, headArg)
      } else if (tailArgsCtor instanceof Option.None.class) {
        return headArg
      } else {
        throw new globalThis.Error("match error");
      }
    });
    tmp106 = lambda37;
    lambda38 = (undefined, function (ident, _) {
      return Option.Some(ident)
    });
    tmp107 = ParseRule.Choice.reference("ident", lambda38, "the type constructor's name");
    tmp108 = ParseRule.Choice.keyword(Precedence.Keywords._rightRound, tmp107);
    lambda39 = (undefined, function (args, ident) {
      return [
        args,
        ident
      ]
    });
    tmp109 = ParseRule.Choice.reference("type-arguments-tail", lambda39, "the remaining type arguments", tmp108);
    tmp110 = ParseRule.Choice.end(Option.None);
    lambda40 = (undefined, function (ident, _) {
      return Option.Some(ident)
    });
    tmp111 = ParseRule.Choice.reference("ident", lambda40, "the type constructor's name");
    tmp112 = ParseRule.Choice.keyword(Precedence.Keywords._rightRound, tmp110, tmp111);
    tmp113 = ParseRule.Choice.reference("type", tmp106, "the first type in the parentheses", tmp109, tmp112);
    tmp114 = ParseRule.Choice.keyword(Precedence.Keywords._leftRound, tmp113);
    lambda41 = (undefined, function (lhs, compose) {
      return runtime.safeCall(compose(lhs))
    });
    tmp115 = ParseRule.Choice.Ref("type", lambda41, Option.None, Option.None, Rules.typeInfixRule);
    tmp116 = ParseRule.rule("rules for types", tmp114, tmp115);
    this.typeRule = tmp116;
    tmp117 = ParseRule.Choice.end(Stack.Nil);
    lambda42 = (undefined, function (tail, _) {
      return tail
    });
    tmp118 = ParseRule.Choice.reference("type-arguments-tail", lambda42, "more type arguments");
    tmp119 = ParseRule.Choice.reference("type", Stack.Cons, "the first type argument", tmp117, tmp118);
    tmp120 = ParseRule.Choice.keyword(Precedence.Keywords._comma, tmp119);
    tmp121 = Rules.defineKind("type-arguments-tail", tmp120);
    lambda43 = (undefined, function (ctor, argOpt) {
      let param0, arg;
      if (argOpt instanceof Option.Some.class) {
        param0 = argOpt.value;
        arg = param0;
        return Tree.Infix(Precedence.Keywords._of, ctor, arg)
      } else if (argOpt instanceof Option.None.class) {
        return ctor
      } else {
        throw new globalThis.Error("match error");
      }
    });
    tmp122 = lambda43;
    tmp123 = ParseRule.Choice.end(Option.None);
    lambda44 = (undefined, function (argument, _) {
      return Option.Some(argument)
    });
    tmp124 = ParseRule.Choice.reference("type", lambda44, "the variant constructor's argument");
    tmp125 = ParseRule.Choice.keyword(Precedence.Keywords._of, tmp124);
    tmp126 = ParseRule.Choice.reference("ident", tmp122, "the variant constructor's name", tmp123, tmp125);
    tmp127 = Rules.defineKind("constr-decl", tmp126);
    lambda45 = (undefined, function (lhs, rhsOpt) {
      let param0, rhs;
      if (rhsOpt instanceof Option.Some.class) {
        param0 = rhsOpt.value;
        rhs = param0;
        return Tree.Infix(Precedence.Keywords._bar, lhs, rhs)
      } else {
        return lhs
      }
    });
    tmp128 = lambda45;
    tmp129 = ParseRule.Choice.end(Option.None);
    lambda46 = (undefined, function (more, _) {
      return Option.Some(more)
    });
    tmp130 = ParseRule.Choice.reference("variants", lambda46, "variants end");
    tmp131 = ParseRule.Choice.keyword(Precedence.Keywords._bar, tmp130);
    tmp132 = ParseRule.Choice.reference("constr-decl", tmp128, "variants item", tmp129, tmp131);
    tmp133 = Rules.defineKind("variants", tmp132);
    lambda47 = (undefined, function (lhs, rhsMore) {
      let first1, first0, rhs, more, tmp195;
      if (globalThis.Array.isArray(rhsMore) && rhsMore.length === 2) {
        first0 = rhsMore[0];
        first1 = rhsMore[1];
        rhs = first0;
        more = first1;
        tmp195 = runtime.safeCall(rhs(lhs));
        return Stack.Cons(tmp195, more)
      } else {
        throw new globalThis.Error("match error");
      }
    });
    tmp134 = lambda47;
    tmp135 = ParseRule.Choice.end(Stack.Nil);
    lambda48 = (undefined, function (more, _) {
      return more
    });
    tmp136 = ParseRule.Choice.reference("typedefs", lambda48, "typedef end");
    tmp137 = ParseRule.Choice.keyword(Precedence.Keywords._and, tmp136);
    tmp138 = ParseRule.Choice.reference("typedef-rhs", Predef.tuple, "typedef body", tmp135, tmp137);
    tmp139 = ParseRule.Choice.reference("typedef-lhs", tmp134, "typedef name", tmp138);
    tmp140 = Rules.defineKind("typedefs", tmp139);
    lambda49 = (undefined, function (rhs, _) {
      let lambda65;
      lambda65 = (undefined, function (lhs) {
        return Tree.Infix(Precedence.Keywords._equal, lhs, rhs)
      });
      return lambda65
    });
    tmp141 = ParseRule.Choice.reference("variants", lambda49, "typedef-rhs: variants");
    lambda50 = (undefined, function (content, _) {
      let tmp195, tmp196;
      if (content instanceof Stack.Nil.class) {
        tmp195 = Tree.Sequence(Stack.Nil);
        return Tree.Bracketed(Token.Curly, tmp195)
      } else {
        tmp196 = Tree.Sequence(content);
        return Tree.Bracketed(Token.Curly, tmp196)
      }
    });
    tmp142 = lambda50;
    tmp143 = ParseRule.Choice.end(Tree.empty);
    tmp144 = ParseRule.Choice.keyword(Precedence.Keywords._rightCurly, tmp143);
    tmp145 = ParseRule.Choice.reference("label-decls", tmp142, "label-decl", tmp144);
    tmp146 = ParseRule.Choice.keyword(Precedence.Keywords._leftCurly, tmp145);
    lambda51 = (undefined, function (rhs) {
      let lambda65;
      lambda65 = (undefined, function (lhs) {
        return Tree.Infix(Precedence.Keywords._equal, lhs, rhs)
      });
      return lambda65
    });
    tmp147 = ParseRule.Choice.map(tmp146, lambda51);
    tmp148 = ParseRule.Choice.keyword(Precedence.Keywords._equal, tmp141, tmp147);
    lambda52 = (undefined, function (rhs, _) {
      let lambda65;
      lambda65 = (undefined, function (lhs) {
        return Tree.Infix(Precedence.Keywords._equalequal, lhs, rhs)
      });
      return lambda65
    });
    tmp149 = ParseRule.Choice.reference("type", lambda52, "type alias body");
    tmp150 = ParseRule.Choice.keyword(Precedence.Keywords._equalequal, tmp149);
    tmp151 = Rules.defineKind("typedef-rhs", tmp148, tmp150);
    tmp152 = Tree.infix(Precedence.Keywords._colon);
    lambda53 = (undefined, function (rhs, _) {
      return rhs
    });
    tmp153 = ParseRule.Choice.typeExpr(lambda53, "label-decl body");
    tmp154 = ParseRule.Choice.keyword(Precedence.Keywords._colon, tmp153);
    tmp155 = ParseRule.Choice.typeExpr(tmp152, "label-decl name", tmp154);
    tmp156 = Rules.defineKind("label-decl", tmp155);
    tmp157 = ParseRule.Choice.end(Stack.Nil);
    lambda54 = (undefined, function (more, _) {
      return more
    });
    tmp158 = ParseRule.Choice.reference("label-decls", lambda54, "more label-decls");
    tmp159 = ParseRule.Choice.keyword(Precedence.Keywords._semicolon, tmp158);
    tmp160 = ParseRule.Choice.reference("label-decl", Stack.Cons, "the first label-decl", tmp157, tmp159);
    tmp161 = Rules.defineKind("label-decls", tmp160);
    tmp162 = ParseRule.Choice.end(Stack.Nil);
    lambda55 = (undefined, function (tail, _) {
      return tail
    });
    tmp163 = ParseRule.Choice.reference("constr-decls", lambda55, "more constructor declarations");
    tmp164 = ParseRule.Choice.keyword(Precedence.Keywords._bar, tmp163);
    tmp165 = ParseRule.Choice.reference("constr-decl", Stack.Cons, "the first constructor declaration", tmp162, tmp164);
    tmp166 = Rules.defineKind("constr-decls", tmp165);
    lambda56 = (undefined, function (params, ident) {
      let tmp195;
      if (params instanceof Stack.Nil.class) {
        return ident
      } else {
        tmp195 = Tree.Tuple(params);
        return Tree.App(ident, tmp195)
      }
    });
    tmp167 = lambda56;
    lambda57 = (undefined, function (ident, _) {
      return ident
    });
    tmp168 = ParseRule.Choice.reference("ident", lambda57, "the type identifier");
    tmp169 = ParseRule.Choice.reference("type-params", tmp167, "the type parameters", tmp168);
    tmp170 = Rules.defineKind("typedef-lhs", tmp169);
    lambda58 = (undefined, function (head, _) {
      return Stack.Cons(head, Stack.Nil)
    });
    tmp171 = ParseRule.Choice.reference("typevar", lambda58, "the only type parameter");
    tmp172 = ParseRule.Choice.keyword(Precedence.Keywords._rightRound);
    lambda59 = (undefined, function (tail, _) {
      return tail
    });
    tmp173 = ParseRule.Choice.reference("type-params-tail", lambda59, "more type parameters", tmp172);
    tmp174 = ParseRule.Choice.reference("typevar", Stack.Cons, "the first type parameter", tmp173);
    tmp175 = ParseRule.Choice.keyword(Precedence.Keywords._leftRound, tmp174);
    tmp176 = ParseRule.Choice.end(Stack.Nil);
    tmp177 = Rules.defineKind("type-params", tmp171, tmp175, tmp176);
    tmp178 = ParseRule.Choice.end(Stack.Nil);
    tmp179 = ParseRule.Choice.end(runtime.Unit);
    lambda60 = (undefined, function (tail, _) {
      return tail
    });
    tmp180 = ParseRule.Choice.reference("type-params-tail", lambda60, "more type parameters", tmp179);
    tmp181 = ParseRule.Choice.reference("typevar", Stack.Cons, "the first type parameter", tmp180);
    tmp182 = ParseRule.Choice.keyword(Precedence.Keywords._comma, tmp181);
    tmp183 = Rules.defineKind("type-params-tail", tmp178, tmp182);
    tmp184 = Rules.makeLetBindings(false);
    lambda61 = (undefined, function (typedefs, _) {
      return Tree.Define(Tree.DefineKind.Type, typedefs)
    });
    tmp185 = ParseRule.Choice.reference("typedefs", lambda61, "more typedefs");
    tmp186 = ParseRule.Choice.keyword(Precedence.Keywords._type, tmp185);
    lambda62 = (undefined, function (decls, _) {
      return Tree.Define(Tree.DefineKind.Exception, decls)
    });
    tmp187 = ParseRule.Choice.reference("constr-decls", lambda62, "constructor declarations");
    tmp188 = ParseRule.Choice.keyword(Precedence.Keywords._exception, tmp187);
    lambda63 = (undefined, function (body, _) {
      return body
    });
    tmp189 = ParseRule.Choice.reference("term", lambda63, "directive body");
    lambda64 = (undefined, function (ident, body) {
      let tmp195;
      tmp195 = Stack.Cons([
        ident,
        body
      ], Stack.Nil);
      return Tree.Define(Tree.DefineKind.Directive, tmp195)
    });
    tmp190 = ParseRule.Choice.reference("ident", lambda64, "directive name", tmp189);
    tmp191 = ParseRule.Choice.keyword(Precedence.Keywords._hash, tmp190);
    tmp192 = ParseRule.rule("prefix rules for module items", tmp184, tmp186, tmp188, tmp191);
    this.declRule = tmp192;
    tmp193 = Rules.syntaxKinds.insert("term", Rules.termRule);
    tmp194 = Rules.syntaxKinds.insert("type", Rules.typeRule);
    Rules.syntaxKinds.insert("decl", Rules.declRule)
  }
  static getRuleByKind(kind) {
    let tmp;
    tmp = runtime.safeCall(Rules.syntaxKinds.get(kind));
    return Option.unsafe.get(tmp)
  } 
  static defineKind(name, ...choices) {
    let tmp;
    tmp = ParseRule.rule(name, ...choices);
    return Rules.syntaxKinds.insert(name, tmp)
  } 
  static makeLetBindings(hasInClause) {
    let intro, tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, lambda, lambda1;
    intro = "let binding: ";
    tmp = intro + "keyword";
    tmp1 = ParseRule.Choice.keyword(Precedence.Keywords._rec);
    tmp2 = ParseRule.rule(tmp, tmp1);
    tmp3 = intro + "body";
    if (hasInClause === true) {
      tmp4 = intro + "body";
      lambda = (undefined, function (body, _) {
        return Option.Some(body)
      });
      tmp5 = ParseRule.Choice.term(lambda, tmp4);
      tmp6 = ParseRule.Choice.keyword(Precedence.Keywords._in, tmp5);
      tmp7 = ParseRule.Choice.end(Option.None);
      tmp8 = Predef.tuple(tmp6, tmp7);
    } else {
      tmp9 = ParseRule.Choice.end(Option.None);
      tmp8 = Predef.tuple(tmp9);
    }
    lambda1 = (undefined, function (bindings, body) {
      return Tree.LetIn(bindings, body)
    });
    tmp10 = ParseRule.Choice.reference("let-bindings", lambda1, "let-bindings", ...tmp8);
    tmp11 = ParseRule.rule(tmp3, tmp10);
    tmp12 = ParseRule.Choice.optional(tmp2, tmp11);
    return ParseRule.Choice.keyword(Precedence.Keywords._let, tmp12)
  } 
  static makeInfixChoice(keyword, rhsKind, compose) {
    let tmp, tmp1, tmp2, lambda;
    tmp = "operator `" + keyword.name;
    tmp1 = tmp + "` right-hand side";
    lambda = (undefined, function (rhs, _) {
      let lambda1;
      lambda1 = (undefined, function (lhs) {
        return runtime.safeCall(compose(lhs, rhs))
      });
      return lambda1
    });
    tmp2 = ParseRule.Choice.reference(rhsKind, lambda, tmp1);
    return ParseRule.Choice.keyword(keyword, tmp2)
  } 
  static makeBracketRule(opening, closing, contentKind, wrapContent) {
    let tmp, tmp1, tmp2, tmp3, tmp4, lambda;
    lambda = (undefined, function (tree, end) {
      let param0, param1, msg, tmp5;
      if (end instanceof Tree.Error.class) {
        param0 = end.tree;
        param1 = end.message;
        if (param0 instanceof Tree.Empty.class) {
          msg = param1;
          tmp5 = runtime.safeCall(wrapContent(tree));
          return Tree.Error(tmp5, msg)
        } else {
          throw new globalThis.Error("match error");
        }
      } else if (end instanceof Tree.Empty.class) {
        return runtime.safeCall(wrapContent(tree))
      } else {
        throw new globalThis.Error("match error");
      }
    });
    tmp = lambda;
    tmp1 = contentKind + " in bracket";
    tmp2 = ParseRule.Choice.end(Tree.empty);
    tmp3 = ParseRule.Choice.keyword(closing, tmp2);
    tmp4 = ParseRule.Choice.reference(contentKind, tmp, tmp1, tmp3);
    return ParseRule.Choice.keyword(opening, tmp4)
  }
  static toString() { return "Rules"; }
};
let Rules = Rules1; export default Rules;
