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
    let tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20, tmp21, tmp22, tmp23, tmp24, tmp25, tmp26, tmp27, tmp28, tmp29, tmp30, tmp31, tmp32, tmp33, tmp34, tmp35, tmp36, tmp37, tmp38, tmp39, tmp40, tmp41, tmp42, tmp43, tmp44, tmp45, tmp46, tmp47, tmp48, tmp49, tmp50, tmp51, tmp52, tmp53, tmp54, tmp55, tmp56, tmp57, tmp58, tmp59, tmp60, tmp61, tmp62, tmp63, tmp64, tmp65, tmp66, tmp67, tmp68, tmp69, tmp70, tmp71, tmp72, tmp73, tmp74, tmp75, tmp76, tmp77, tmp78, tmp79, tmp80, tmp81, tmp82, tmp83, tmp84, tmp85, tmp86, tmp87, tmp88, tmp89, tmp90, tmp91, tmp92, tmp93, tmp94, tmp95, tmp96, tmp97, tmp98, tmp99, tmp100, tmp101, tmp102, tmp103, tmp104, tmp105, tmp106, tmp107, tmp108, tmp109, tmp110, tmp111, tmp112, tmp113, tmp114, tmp115, tmp116, tmp117, tmp118, tmp119, tmp120, tmp121, tmp122, tmp123, tmp124, tmp125, tmp126, tmp127, tmp128, tmp129, tmp130, tmp131, tmp132, tmp133, tmp134, tmp135, tmp136, tmp137, tmp138, tmp139, tmp140, tmp141, tmp142, tmp143, tmp144, tmp145, tmp146, tmp147, tmp148, tmp149, tmp150, tmp151, tmp152, tmp153, tmp154, tmp155, tmp156, tmp157, tmp158, tmp159, tmp160, tmp161, tmp162, tmp163, tmp164, tmp165, tmp166, tmp167, tmp168, tmp169, tmp170, tmp171, tmp172, tmp173, tmp174, tmp175, tmp176, tmp177, tmp178, tmp179, tmp180, tmp181, tmp182, tmp183, tmp184, tmp185, tmp186, tmp187, tmp188, tmp189, tmp190, tmp191, tmp192, tmp193, tmp194, tmp195, tmp196, tmp197, tmp198, tmp199, tmp200, tmp201, tmp202, tmp203, tmp204, tmp205, tmp206, tmp207, tmp208, tmp209, tmp210, tmp211, tmp212, tmp213, tmp214, tmp215, tmp216, tmp217, tmp218, tmp219, tmp220, tmp221, tmp222, tmp223, tmp224, tmp225, tmp226, tmp227, tmp228, tmp229, tmp230, tmp231, tmp232, tmp233, tmp234, tmp235, tmp236, tmp237, tmp238, tmp239, tmp240, tmp241, tmp242, tmp243, tmp244, tmp245, tmp246, tmp247, tmp248, tmp249, tmp250, tmp251, tmp252, tmp253, tmp254, tmp255, tmp256, tmp257, tmp258, lambda, lambda1, lambda2, lambda3, lambda4, lambda5, lambda6, lambda7, lambda8, lambda9, lambda10, lambda11, lambda12, lambda13, lambda14, lambda15, lambda16, lambda17, lambda18, lambda19, lambda20, lambda21, lambda22, lambda23, lambda24, lambda25, lambda26, lambda27, lambda28, lambda29, lambda30, lambda31, lambda32, lambda33, lambda34, lambda35, lambda36, lambda37, lambda38, lambda39, lambda40, lambda41, lambda42, lambda43, lambda44, lambda45, lambda46, lambda47, lambda48, lambda49, lambda50, lambda51, lambda52, lambda53, lambda54, lambda55, lambda56, lambda57, lambda58, lambda59, lambda60, lambda61, lambda62, lambda63, lambda64;
    tmp = new BetterMap.Map();
    this.syntaxKinds = tmp;
    tmp1 = new globalThis.Set();
    this.extendedKinds = tmp1;
    tmp2 = Rules.defineKind("let-bindings");
    lambda = (undefined, function (lhs, rhsBindings) {
      let first1, first0, rhs, bindings, tmp259;
      if (globalThis.Array.isArray(rhsBindings) && rhsBindings.length === 2) {
        first0 = rhsBindings[0];
        first1 = rhsBindings[1];
        rhs = first0;
        bindings = first1;
        tmp259 = Tree.Infix(Precedence.Keywords._equal, lhs, rhs);
        return Stack.Cons(tmp259, bindings)
      } else {
        throw new globalThis.Error("match error");
      }
    });
    tmp3 = lambda;
    tmp4 = ParseRule.Choice.keyword(Precedence.Keywords._equal);
    tmp5 = ParseRule.Choice.end(Stack.Nil);
    tmp6 = ParseRule.Choice.keyword(Precedence.Keywords._and);
    lambda1 = (undefined, function (tail, _) {
      return tail
    });
    tmp7 = ParseRule.Choice.reference("let-bindings", lambda1, "let-bindings tail");
    tmp8 = runtime.safeCall(tmp6(tmp7));
    lambda2 = (undefined, function (rhs, tail) {
      return [
        rhs,
        tail
      ]
    });
    tmp9 = ParseRule.Choice.term(lambda2, "right-hand side", tmp5, tmp8);
    tmp10 = runtime.safeCall(tmp4(tmp9));
    tmp11 = ParseRule.Choice.term(tmp3, "left-hand side", tmp10);
    tmp12 = runtime.safeCall(tmp2(tmp11));
    tmp13 = Rules.makeLetBindings(true);
    Rules.#letExpression = tmp13;
    tmp14 = ParseRule.Choice.keyword(Precedence.Keywords._fun);
    tmp15 = ParseRule.Choice.keyword(Precedence.Keywords._thinArrow);
    tmp16 = ParseRule.Choice.end(Option.None);
    lambda3 = (undefined, function (body, _) {
      return body
    });
    tmp17 = ParseRule.Choice.term(lambda3, "function body", tmp16);
    tmp18 = runtime.safeCall(tmp15(tmp17));
    lambda4 = (undefined, function (params, body) {
      let tmp259;
      tmp259 = Stack.Cons(params, Stack.Nil);
      return Tree.Lambda(tmp259, body)
    });
    tmp19 = ParseRule.Choice.term(lambda4, "function parameters", tmp18);
    tmp20 = runtime.safeCall(tmp14(tmp19));
    Rules.#funTerm = tmp20;
    tmp21 = Rules.defineKind("simple-matching");
    lambda5 = (undefined, function (lhs, rhsTail) {
      let first1, first0, rhs, tail, tmp259;
      if (globalThis.Array.isArray(rhsTail) && rhsTail.length === 2) {
        first0 = rhsTail[0];
        first1 = rhsTail[1];
        rhs = first0;
        tail = first1;
        tmp259 = Tree.Infix(Precedence.Keywords._thinArrow, lhs, rhs);
        return Stack.Cons(tmp259, tail)
      } else {
        throw new globalThis.Error("match error");
      }
    });
    tmp22 = lambda5;
    tmp23 = ParseRule.Choice.keyword(Precedence.Keywords._thinArrow);
    tmp24 = ParseRule.Choice.end(Stack.Nil);
    tmp25 = ParseRule.Choice.keyword(Precedence.Keywords._bar);
    lambda6 = (undefined, function (tail, _) {
      return tail
    });
    tmp26 = ParseRule.Choice.reference("simple-matching", lambda6, "simple-matching tail");
    tmp27 = runtime.safeCall(tmp25(tmp26));
    lambda7 = (undefined, function (rhs, tail) {
      return [
        rhs,
        tail
      ]
    });
    tmp28 = ParseRule.Choice.term(lambda7, "rhs", tmp24, tmp27);
    tmp29 = runtime.safeCall(tmp23(tmp28));
    tmp30 = ParseRule.Choice.term(tmp22, "pattern", tmp29);
    tmp31 = runtime.safeCall(tmp21(tmp30));
    tmp32 = Rules.defineKind("pattern-list");
    lambda8 = (undefined, function (tail, _) {
      return tail
    });
    tmp33 = ParseRule.Choice.reference("pattern-list", lambda8, "pattern list tail");
    lambda9 = (undefined, function (head, tail) {
      return Stack.Cons(head, tail)
    });
    tmp34 = ParseRule.Choice.term(lambda9, "pattern", tmp33);
    tmp35 = runtime.safeCall(tmp32(tmp34));
    tmp36 = Rules.defineKind("multiple-matching");
    tmp37 = Tree.infix(Precedence.Keywords._thinArrow);
    tmp38 = ParseRule.Choice.keyword(Precedence.Keywords._thinArrow);
    tmp39 = ParseRule.Choice.end(Stack.Nil);
    tmp40 = ParseRule.Choice.keyword(Precedence.Keywords._bar);
    lambda10 = (undefined, function (tail, _) {
      return tail
    });
    tmp41 = ParseRule.Choice.reference("multiple-matching", lambda10, "multiple-matching tail");
    tmp42 = runtime.safeCall(tmp40(tmp41));
    lambda11 = (undefined, function (rhs, _) {
      return rhs
    });
    tmp43 = ParseRule.Choice.term(lambda11, "the right-hand side of the arrow", tmp39, tmp42);
    tmp44 = runtime.safeCall(tmp38(tmp43));
    tmp45 = ParseRule.Choice.reference("pattern-list", tmp37, "the list of patterns", tmp44);
    tmp46 = runtime.safeCall(tmp36(tmp45));
    lambda12 = (undefined, function (lhs, rhs) {
      let param0, tail, tmp259, tmp260, tmp261;
      if (rhs instanceof Tree.Tuple.class) {
        param0 = rhs.trees;
        tail = param0;
        tmp259 = Stack.Cons(lhs, tail);
        return Tree.Tuple(tmp259)
      } else {
        tmp260 = Stack.Cons(rhs, Stack.Nil);
        tmp261 = Stack.Cons(lhs, tmp260);
        return Tree.Tuple(tmp261)
      }
    });
    tmp47 = lambda12;
    tmp48 = Rules.makeInfixChoice(Precedence.Keywords._comma, "term", tmp47);
    lambda13 = (undefined, function (lhs, rhs) {
      let param0, tail, tmp259, tmp260, tmp261;
      if (rhs instanceof Tree.Sequence.class) {
        param0 = rhs.trees;
        tail = param0;
        tmp259 = Stack.Cons(lhs, tail);
        return Tree.Sequence(tmp259)
      } else {
        tmp260 = Stack.Cons(rhs, Stack.Nil);
        tmp261 = Stack.Cons(lhs, tmp260);
        return Tree.Sequence(tmp261)
      }
    });
    tmp49 = lambda13;
    tmp50 = Rules.makeInfixChoice(Precedence.Keywords._semicolon, "term", tmp49);
    lambda14 = (undefined, function (lhs, rhs) {
      return Tree.Infix(Precedence.Keywords._leftArrow, lhs, rhs)
    });
    tmp51 = Rules.makeInfixChoice(Precedence.Keywords._leftArrow, "term", lambda14);
    lambda15 = (undefined, function (lhs, rhs) {
      return Tree.Infix(Precedence.Keywords._equalequal, lhs, rhs)
    });
    tmp52 = Rules.makeInfixChoice(Precedence.Keywords._equalequal, "term", lambda15);
    lambda16 = (undefined, function (lhs, rhs) {
      let tmp259, tmp260, tmp261;
      tmp259 = Tree.Ident("*", true);
      tmp260 = Stack.Cons(rhs, Stack.Nil);
      tmp261 = Stack.Cons(lhs, tmp260);
      return Tree.App(tmp259, tmp261)
    });
    tmp53 = lambda16;
    tmp54 = Rules.makeInfixChoice(Precedence.Keywords._asterisk, "term", tmp53);
    tmp55 = ParseRule.Choice.keyword(Precedence.Keywords._period);
    tmp56 = ParseRule.Choice.keyword(Precedence.Keywords._leftRound);
    tmp57 = ParseRule.Choice.keyword(Precedence.Keywords._rightRound);
    tmp58 = runtime.safeCall(tmp57());
    lambda17 = (undefined, function (argument, _) {
      let lambda65;
      lambda65 = (undefined, function (lhs) {
        let tmp259;
        tmp259 = Tree.Bracketed(Token.Round, argument);
        return Tree.Infix(Precedence.Keywords._period, lhs, tmp259)
      });
      return lambda65
    });
    tmp59 = ParseRule.Choice.term(lambda17, "application argument", tmp58);
    tmp60 = runtime.safeCall(tmp56(tmp59));
    lambda18 = (undefined, function (rhs, _) {
      let lambda65;
      lambda65 = (undefined, function (lhs) {
        return Tree.Infix(Precedence.Keywords._period, lhs, rhs)
      });
      return lambda65
    });
    tmp61 = ParseRule.Choice.reference("term", lambda18, "operator `.` right-hand side");
    tmp62 = runtime.safeCall(tmp55(tmp60, tmp61));
    tmp63 = ParseRule.Choice.keyword(Precedence.Keywords._colon);
    lambda19 = (undefined, function (rhs, _) {
      let lambda65;
      lambda65 = (undefined, function (lhs) {
        return Tree.Infix(Precedence.Keywords._colon, lhs, rhs)
      });
      return lambda65
    });
    tmp64 = ParseRule.Choice.typeExpr(lambda19, "right-hand side type");
    tmp65 = runtime.safeCall(tmp63(tmp64));
    tmp66 = Option.Some(Precedence.Keywords.appPrec);
    lambda20 = (undefined, function (argument, _) {
      let lambda65;
      lambda65 = (undefined, function (callee) {
        return Tree.App(callee, argument)
      });
      return lambda65
    });
    tmp67 = ParseRule.Choice.termWithPrec(lambda20, "application argument", tmp66, Option.None);
    tmp68 = ParseRule.rule("infix rules for expressions", tmp48, tmp50, tmp51, tmp52, tmp54, tmp62, tmp65, tmp67);
    this.termInfixRule = tmp68;
    tmp69 = ParseRule.Choice.keyword(Precedence.Keywords._match);
    tmp70 = ParseRule.Choice.keyword(Precedence.Keywords._with);
    tmp71 = ParseRule.Choice.keyword(Precedence.Keywords._bar);
    tmp72 = runtime.safeCall(tmp71());
    tmp73 = ParseRule.rule("pattern matching case body", tmp72);
    tmp74 = Rules.getRuleByKind("simple-matching");
    tmp75 = ParseRule.Choice.optional(tmp73, tmp74);
    tmp76 = runtime.safeCall(tmp70(tmp75));
    tmp77 = ParseRule.Choice.term(Tree.Match, "pattern matching scrutinee", tmp76);
    tmp78 = runtime.safeCall(tmp69(tmp77));
    tmp79 = ParseRule.Choice.keyword(Precedence.Keywords._function);
    tmp80 = ParseRule.Choice.keyword(Precedence.Keywords._bar);
    tmp81 = runtime.safeCall(tmp80());
    tmp82 = ParseRule.rule("function body", tmp81);
    tmp83 = Rules.getRuleByKind("simple-matching");
    tmp84 = ParseRule.Choice.optional(tmp82, tmp83);
    lambda21 = (undefined, function (branches) {
      return Tree.Match(Tree.empty, branches)
    });
    tmp85 = ParseRule.Choice.map(tmp84, lambda21);
    tmp86 = runtime.safeCall(tmp79(tmp85));
    tmp87 = ParseRule.Choice.keyword(Precedence.Keywords._if);
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
    tmp88 = lambda22;
    tmp89 = ParseRule.Choice.keyword(Precedence.Keywords._then);
    tmp90 = ParseRule.Choice.end(Option.None);
    tmp91 = ParseRule.Choice.keyword(Precedence.Keywords._else);
    tmp92 = ParseRule.Choice.end(Option.None);
    lambda23 = (undefined, function (alt, _) {
      return Option.Some(alt)
    });
    tmp93 = ParseRule.Choice.term(lambda23, "if-then-else alternative", tmp92);
    tmp94 = runtime.safeCall(tmp91(tmp93));
    lambda24 = (undefined, function (con, optAlt) {
      return [
        con,
        optAlt
      ]
    });
    tmp95 = ParseRule.Choice.term(lambda24, "if-then-else consequent", tmp90, tmp94);
    tmp96 = runtime.safeCall(tmp89(tmp95));
    tmp97 = ParseRule.Choice.term(tmp88, "if-then-else condition", tmp96);
    tmp98 = runtime.safeCall(tmp87(tmp97));
    tmp99 = ParseRule.Choice.keyword(Precedence.Keywords._while);
    tmp100 = ParseRule.Choice.keyword(Precedence.Keywords._do);
    tmp101 = ParseRule.Choice.keyword(Precedence.Keywords._done);
    tmp102 = runtime.safeCall(tmp101());
    lambda25 = (undefined, function (body, _) {
      return body
    });
    tmp103 = ParseRule.Choice.term(lambda25, "while end", tmp102);
    tmp104 = runtime.safeCall(tmp100(tmp103));
    tmp105 = ParseRule.Choice.term(Tree.While, "while body", tmp104);
    tmp106 = runtime.safeCall(tmp99(tmp105));
    tmp107 = ParseRule.Choice.keyword(Precedence.Keywords._for);
    tmp108 = ParseRule.Choice.keyword(Precedence.Keywords._equal);
    tmp109 = ParseRule.Choice.keyword(Precedence.Keywords._to);
    tmp110 = runtime.safeCall(tmp109());
    tmp111 = ParseRule.Choice.keyword(Precedence.Keywords._downto);
    tmp112 = runtime.safeCall(tmp111());
    tmp113 = ParseRule.rule("iteration keyword", tmp110, tmp112);
    tmp114 = ParseRule.Choice.keyword(Precedence.Keywords._do);
    tmp115 = ParseRule.Choice.keyword(Precedence.Keywords._done);
    tmp116 = runtime.safeCall(tmp115());
    lambda26 = (undefined, function (body, _) {
      return body
    });
    tmp117 = ParseRule.Choice.term(lambda26, "`for` `done` keyword", tmp116);
    tmp118 = runtime.safeCall(tmp114(tmp117));
    lambda27 = (undefined, function (end, body) {
      return [
        end,
        body
      ]
    });
    tmp119 = ParseRule.Choice.term(lambda27, "`for` `do` keyword", tmp118);
    tmp120 = ParseRule.rule("the iteration keyword", tmp119);
    tmp121 = ParseRule.Choice.siding(tmp113, tmp120);
    lambda28 = (undefined, function (start, endBody) {
      return [
        start,
        ...endBody
      ]
    });
    tmp122 = ParseRule.Choice.term(lambda28, "`for` `to` or `downto` keyword", tmp121);
    tmp123 = runtime.safeCall(tmp108(tmp122));
    lambda29 = (undefined, function (head, startEndBody) {
      return Tree.For(head, ...startEndBody)
    });
    tmp124 = ParseRule.Choice.term(lambda29, "`for` head", tmp123);
    tmp125 = runtime.safeCall(tmp107(tmp124));
    lambda30 = (undefined, function (tree) {
      if (tree instanceof Tree.Empty.class) {
        return Tree.Tuple(Stack.Nil)
      } else {
        return tree
      }
    });
    tmp126 = Rules.makeBracketRule(Precedence.Keywords._leftRound, Precedence.Keywords._rightRound, "term", lambda30);
    lambda31 = (undefined, function (tree) {
      let tmp259;
      if (tree instanceof Tree.Empty.class) {
        tmp259 = Tree.Sequence(Stack.Nil);
      } else {
        tmp259 = tree;
      }
      return Tree.Bracketed(Token.Square, tmp259)
    });
    tmp127 = lambda31;
    tmp128 = Rules.makeBracketRule(Precedence.Keywords._leftSquare, Precedence.Keywords._rightSquare, "term", tmp127);
    tmp129 = Rules.makeBracketRule(Precedence.Keywords._leftCurly, Precedence.Keywords._rightCurly, "term", Predef.id);
    lambda32 = (undefined, function (tree) {
      if (tree instanceof Tree.Empty.class) {
        return Tree.Sequence(Stack.Nil)
      } else {
        return tree
      }
    });
    tmp130 = Rules.makeBracketRule(Precedence.Keywords._begin, Precedence.Keywords._end, "term", lambda32);
    lambda33 = (undefined, function (lhs, compose) {
      return runtime.safeCall(compose(lhs))
    });
    tmp131 = ParseRule.Choice.Ref("term", lambda33, Option.None, Option.None, Rules.termInfixRule);
    tmp132 = ParseRule.rule("prefix rules for expressions", Rules.#letExpression, Rules.#funTerm, tmp78, tmp86, tmp98, tmp106, tmp125, tmp126, tmp128, tmp129, tmp130, tmp131);
    this.termRule = tmp132;
    lambda34 = (undefined, function (lhs, rhs) {
      return Tree.Infix(Precedence.Keywords._thinArrow, lhs, rhs)
    });
    tmp133 = Rules.makeInfixChoice(Precedence.Keywords._thinArrow, "type", lambda34);
    lambda35 = (undefined, function (lhs, rhs) {
      return Tree.Infix(Precedence.Keywords._asterisk, lhs, rhs)
    });
    tmp134 = Rules.makeInfixChoice(Precedence.Keywords._asterisk, "type", lambda35);
    tmp135 = Option.Some(Precedence.Keywords.appPrec);
    tmp136 = ParseRule.rule("end of type infix rules");
    lambda36 = (undefined, function (callee, _) {
      let lambda65;
      lambda65 = (undefined, function (argument) {
        return Tree.App(callee, argument)
      });
      return lambda65
    });
    tmp137 = ParseRule.Choice.Ref("type", lambda36, tmp135, Option.None, tmp136);
    tmp138 = ParseRule.rule("infix rules for types", tmp133, tmp134, tmp137);
    this.typeInfixRule = tmp138;
    tmp139 = ParseRule.Choice.keyword(Precedence.Keywords._leftRound);
    lambda37 = (undefined, function (headArg, tailArgsCtor) {
      let param0, ctor, first1, first0, tailArgs, ctor1, tmp259, tmp260;
      if (globalThis.Array.isArray(tailArgsCtor) && tailArgsCtor.length === 2) {
        first0 = tailArgsCtor[0];
        first1 = tailArgsCtor[1];
        tailArgs = first0;
        ctor1 = first1;
        tmp259 = Stack.Cons(headArg, tailArgs);
        tmp260 = Tree.Tuple(tmp259);
        return Tree.App(ctor1, tmp260)
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
    tmp140 = lambda37;
    tmp141 = ParseRule.Choice.keyword(Precedence.Keywords._rightRound);
    lambda38 = (undefined, function (ident, _) {
      return Option.Some(ident)
    });
    tmp142 = ParseRule.Choice.reference("ident", lambda38, "the type constructor's name");
    tmp143 = runtime.safeCall(tmp141(tmp142));
    lambda39 = (undefined, function (args, ident) {
      return [
        args,
        ident
      ]
    });
    tmp144 = ParseRule.Choice.reference("type-arguments-tail", lambda39, "the remaining type arguments", tmp143);
    tmp145 = ParseRule.Choice.keyword(Precedence.Keywords._rightRound);
    tmp146 = ParseRule.Choice.end(Option.None);
    lambda40 = (undefined, function (ident, _) {
      return Option.Some(ident)
    });
    tmp147 = ParseRule.Choice.reference("ident", lambda40, "the type constructor's name");
    tmp148 = runtime.safeCall(tmp145(tmp146, tmp147));
    tmp149 = ParseRule.Choice.reference("type", tmp140, "the first type in the parentheses", tmp144, tmp148);
    tmp150 = runtime.safeCall(tmp139(tmp149));
    lambda41 = (undefined, function (lhs, compose) {
      return runtime.safeCall(compose(lhs))
    });
    tmp151 = ParseRule.Choice.Ref("type", lambda41, Option.None, Option.None, Rules.typeInfixRule);
    tmp152 = ParseRule.rule("rules for types", tmp150, tmp151);
    this.typeRule = tmp152;
    tmp153 = Rules.defineKind("type-arguments-tail");
    tmp154 = ParseRule.Choice.keyword(Precedence.Keywords._comma);
    tmp155 = ParseRule.Choice.end(Stack.Nil);
    lambda42 = (undefined, function (tail, _) {
      return tail
    });
    tmp156 = ParseRule.Choice.reference("type-arguments-tail", lambda42, "more type arguments");
    tmp157 = ParseRule.Choice.reference("type", Stack.Cons, "the first type argument", tmp155, tmp156);
    tmp158 = runtime.safeCall(tmp154(tmp157));
    tmp159 = runtime.safeCall(tmp153(tmp158));
    tmp160 = Rules.defineKind("constr-decl");
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
    tmp161 = lambda43;
    tmp162 = ParseRule.Choice.end(Option.None);
    tmp163 = ParseRule.Choice.keyword(Precedence.Keywords._of);
    lambda44 = (undefined, function (argument, _) {
      return Option.Some(argument)
    });
    tmp164 = ParseRule.Choice.reference("type", lambda44, "the variant constructor's argument");
    tmp165 = runtime.safeCall(tmp163(tmp164));
    tmp166 = ParseRule.Choice.reference("ident", tmp161, "the variant constructor's name", tmp162, tmp165);
    tmp167 = runtime.safeCall(tmp160(tmp166));
    tmp168 = Rules.defineKind("variants");
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
    tmp169 = lambda45;
    tmp170 = ParseRule.Choice.end(Option.None);
    tmp171 = ParseRule.Choice.keyword(Precedence.Keywords._bar);
    lambda46 = (undefined, function (more, _) {
      return Option.Some(more)
    });
    tmp172 = ParseRule.Choice.reference("variants", lambda46, "variants end");
    tmp173 = runtime.safeCall(tmp171(tmp172));
    tmp174 = ParseRule.Choice.reference("constr-decl", tmp169, "variants item", tmp170, tmp173);
    tmp175 = runtime.safeCall(tmp168(tmp174));
    tmp176 = Rules.defineKind("typedefs");
    lambda47 = (undefined, function (lhs, rhsMore) {
      let first1, first0, rhs, more, tmp259;
      if (globalThis.Array.isArray(rhsMore) && rhsMore.length === 2) {
        first0 = rhsMore[0];
        first1 = rhsMore[1];
        rhs = first0;
        more = first1;
        tmp259 = runtime.safeCall(rhs(lhs));
        return Stack.Cons(tmp259, more)
      } else {
        throw new globalThis.Error("match error");
      }
    });
    tmp177 = lambda47;
    tmp178 = ParseRule.Choice.end(Stack.Nil);
    tmp179 = ParseRule.Choice.keyword(Precedence.Keywords._and);
    lambda48 = (undefined, function (more, _) {
      return more
    });
    tmp180 = ParseRule.Choice.reference("typedefs", lambda48, "typedef end");
    tmp181 = runtime.safeCall(tmp179(tmp180));
    tmp182 = ParseRule.Choice.reference("typedef-rhs", Predef.tuple, "typedef body", tmp178, tmp181);
    tmp183 = ParseRule.Choice.reference("typedef-lhs", tmp177, "typedef name", tmp182);
    tmp184 = runtime.safeCall(tmp176(tmp183));
    tmp185 = Rules.defineKind("typedef-rhs");
    tmp186 = ParseRule.Choice.keyword(Precedence.Keywords._equal);
    lambda49 = (undefined, function (rhs, _) {
      let lambda65;
      lambda65 = (undefined, function (lhs) {
        return Tree.Infix(Precedence.Keywords._equal, lhs, rhs)
      });
      return lambda65
    });
    tmp187 = ParseRule.Choice.reference("variants", lambda49, "typedef-rhs: variants");
    tmp188 = ParseRule.Choice.keyword(Precedence.Keywords._leftCurly);
    lambda50 = (undefined, function (content, _) {
      let tmp259, tmp260;
      if (content instanceof Stack.Nil.class) {
        tmp259 = Tree.Sequence(Stack.Nil);
        return Tree.Bracketed(Token.Curly, tmp259)
      } else {
        tmp260 = Tree.Sequence(content);
        return Tree.Bracketed(Token.Curly, tmp260)
      }
    });
    tmp189 = lambda50;
    tmp190 = ParseRule.Choice.keyword(Precedence.Keywords._rightCurly);
    tmp191 = ParseRule.Choice.end(Tree.empty);
    tmp192 = runtime.safeCall(tmp190(tmp191));
    tmp193 = ParseRule.Choice.reference("label-decls", tmp189, "label-decl", tmp192);
    tmp194 = runtime.safeCall(tmp188(tmp193));
    lambda51 = (undefined, function (rhs) {
      let lambda65;
      lambda65 = (undefined, function (lhs) {
        return Tree.Infix(Precedence.Keywords._equal, lhs, rhs)
      });
      return lambda65
    });
    tmp195 = ParseRule.Choice.map(tmp194, lambda51);
    tmp196 = runtime.safeCall(tmp186(tmp187, tmp195));
    tmp197 = ParseRule.Choice.keyword(Precedence.Keywords._equalequal);
    lambda52 = (undefined, function (rhs, _) {
      let lambda65;
      lambda65 = (undefined, function (lhs) {
        return Tree.Infix(Precedence.Keywords._equalequal, lhs, rhs)
      });
      return lambda65
    });
    tmp198 = ParseRule.Choice.reference("type", lambda52, "type alias body");
    tmp199 = runtime.safeCall(tmp197(tmp198));
    tmp200 = runtime.safeCall(tmp185(tmp196, tmp199));
    tmp201 = Rules.defineKind("label-decl");
    tmp202 = Tree.infix(Precedence.Keywords._colon);
    tmp203 = ParseRule.Choice.keyword(Precedence.Keywords._colon);
    lambda53 = (undefined, function (rhs, _) {
      return rhs
    });
    tmp204 = ParseRule.Choice.typeExpr(lambda53, "label-decl body");
    tmp205 = runtime.safeCall(tmp203(tmp204));
    tmp206 = ParseRule.Choice.typeExpr(tmp202, "label-decl name", tmp205);
    tmp207 = runtime.safeCall(tmp201(tmp206));
    tmp208 = Rules.defineKind("label-decls");
    tmp209 = ParseRule.Choice.end(Stack.Nil);
    tmp210 = ParseRule.Choice.keyword(Precedence.Keywords._semicolon);
    lambda54 = (undefined, function (more, _) {
      return more
    });
    tmp211 = ParseRule.Choice.reference("label-decls", lambda54, "more label-decls");
    tmp212 = runtime.safeCall(tmp210(tmp211));
    tmp213 = ParseRule.Choice.reference("label-decl", Stack.Cons, "the first label-decl", tmp209, tmp212);
    tmp214 = runtime.safeCall(tmp208(tmp213));
    tmp215 = Rules.defineKind("constr-decls");
    tmp216 = ParseRule.Choice.end(Stack.Nil);
    tmp217 = ParseRule.Choice.keyword(Precedence.Keywords._bar);
    lambda55 = (undefined, function (tail, _) {
      return tail
    });
    tmp218 = ParseRule.Choice.reference("constr-decls", lambda55, "more constructor declarations");
    tmp219 = runtime.safeCall(tmp217(tmp218));
    tmp220 = ParseRule.Choice.reference("constr-decl", Stack.Cons, "the first constructor declaration", tmp216, tmp219);
    tmp221 = runtime.safeCall(tmp215(tmp220));
    tmp222 = Rules.defineKind("typedef-lhs");
    lambda56 = (undefined, function (params, ident) {
      let tmp259;
      if (params instanceof Stack.Nil.class) {
        return ident
      } else {
        tmp259 = Tree.Tuple(params);
        return Tree.App(ident, tmp259)
      }
    });
    tmp223 = lambda56;
    lambda57 = (undefined, function (ident, _) {
      return ident
    });
    tmp224 = ParseRule.Choice.reference("ident", lambda57, "the type identifier");
    tmp225 = ParseRule.Choice.reference("type-params", tmp223, "the type parameters", tmp224);
    tmp226 = runtime.safeCall(tmp222(tmp225));
    tmp227 = Rules.defineKind("type-params");
    lambda58 = (undefined, function (head, _) {
      return Stack.Cons(head, Stack.Nil)
    });
    tmp228 = ParseRule.Choice.reference("typevar", lambda58, "the only type parameter");
    tmp229 = ParseRule.Choice.keyword(Precedence.Keywords._leftRound);
    tmp230 = ParseRule.Choice.keyword(Precedence.Keywords._rightRound);
    tmp231 = runtime.safeCall(tmp230());
    lambda59 = (undefined, function (tail, _) {
      return tail
    });
    tmp232 = ParseRule.Choice.reference("type-params-tail", lambda59, "more type parameters", tmp231);
    tmp233 = ParseRule.Choice.reference("typevar", Stack.Cons, "the first type parameter", tmp232);
    tmp234 = runtime.safeCall(tmp229(tmp233));
    tmp235 = ParseRule.Choice.end(Stack.Nil);
    tmp236 = runtime.safeCall(tmp227(tmp228, tmp234, tmp235));
    tmp237 = Rules.defineKind("type-params-tail");
    tmp238 = ParseRule.Choice.end(Stack.Nil);
    tmp239 = ParseRule.Choice.keyword(Precedence.Keywords._comma);
    tmp240 = ParseRule.Choice.end(runtime.Unit);
    lambda60 = (undefined, function (tail, _) {
      return tail
    });
    tmp241 = ParseRule.Choice.reference("type-params-tail", lambda60, "more type parameters", tmp240);
    tmp242 = ParseRule.Choice.reference("typevar", Stack.Cons, "the first type parameter", tmp241);
    tmp243 = runtime.safeCall(tmp239(tmp242));
    tmp244 = runtime.safeCall(tmp237(tmp238, tmp243));
    tmp245 = Rules.makeLetBindings(false);
    tmp246 = ParseRule.Choice.keyword(Precedence.Keywords._type);
    lambda61 = (undefined, function (typedefs, _) {
      return Tree.Define(Tree.DefineKind.Type, typedefs)
    });
    tmp247 = ParseRule.Choice.reference("typedefs", lambda61, "more typedefs");
    tmp248 = runtime.safeCall(tmp246(tmp247));
    tmp249 = ParseRule.Choice.keyword(Precedence.Keywords._exception);
    lambda62 = (undefined, function (decls, _) {
      return Tree.Define(Tree.DefineKind.Exception, decls)
    });
    tmp250 = ParseRule.Choice.reference("constr-decls", lambda62, "constructor declarations");
    tmp251 = runtime.safeCall(tmp249(tmp250));
    tmp252 = ParseRule.Choice.keyword(Precedence.Keywords._hash);
    lambda63 = (undefined, function (body, _) {
      return body
    });
    tmp253 = ParseRule.Choice.reference("term", lambda63, "directive body");
    lambda64 = (undefined, function (ident, body) {
      let tmp259;
      tmp259 = Stack.Cons([
        ident,
        body
      ], Stack.Nil);
      return Tree.Define(Tree.DefineKind.Directive, tmp259)
    });
    tmp254 = ParseRule.Choice.reference("ident", lambda64, "directive name", tmp253);
    tmp255 = runtime.safeCall(tmp252(tmp254));
    tmp256 = ParseRule.rule("prefix rules for module items", tmp245, tmp248, tmp251, tmp255);
    this.declRule = tmp256;
    tmp257 = Rules.syntaxKinds.insert("term", Rules.termRule);
    tmp258 = Rules.syntaxKinds.insert("type", Rules.typeRule);
    Rules.syntaxKinds.insert("decl", Rules.declRule)
  }
  static getRuleByKind(kind) {
    let tmp;
    tmp = runtime.safeCall(Rules.syntaxKinds.get(kind));
    return Option.unsafe.get(tmp)
  } 
  static defineKind(name) {
    return (...choices) => {
      let tmp;
      tmp = ParseRule.rule(name, ...choices);
      return Rules.syntaxKinds.insert(name, tmp)
    }
  } 
  static makeLetBindings(hasInClause) {
    let intro, tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, lambda, lambda1;
    intro = "let binding: ";
    tmp = ParseRule.Choice.keyword(Precedence.Keywords._let);
    tmp1 = intro + "keyword";
    tmp2 = ParseRule.Choice.keyword(Precedence.Keywords._rec);
    tmp3 = runtime.safeCall(tmp2());
    tmp4 = ParseRule.rule(tmp1, tmp3);
    tmp5 = intro + "body";
    if (hasInClause === true) {
      tmp6 = ParseRule.Choice.keyword(Precedence.Keywords._in);
      tmp7 = intro + "body";
      lambda = (undefined, function (body, _) {
        return Option.Some(body)
      });
      tmp8 = ParseRule.Choice.term(lambda, tmp7);
      tmp9 = runtime.safeCall(tmp6(tmp8));
      tmp10 = ParseRule.Choice.end(Option.None);
      tmp11 = Predef.tuple(tmp9, tmp10);
    } else {
      tmp12 = ParseRule.Choice.end(Option.None);
      tmp11 = Predef.tuple(tmp12);
    }
    lambda1 = (undefined, function (bindings, body) {
      return Tree.LetIn(bindings, body)
    });
    tmp13 = ParseRule.Choice.reference("let-bindings", lambda1, "let-bindings", ...tmp11);
    tmp14 = ParseRule.rule(tmp5, tmp13);
    tmp15 = ParseRule.Choice.optional(tmp4, tmp14);
    return runtime.safeCall(tmp(tmp15))
  } 
  static makeInfixChoice(keyword, rhsKind, compose) {
    let tmp, tmp1, tmp2, tmp3, lambda;
    tmp = ParseRule.Choice.keyword(keyword);
    tmp1 = "operator `" + keyword.name;
    tmp2 = tmp1 + "` right-hand side";
    lambda = (undefined, function (rhs, _) {
      let lambda1;
      lambda1 = (undefined, function (lhs) {
        return runtime.safeCall(compose(lhs, rhs))
      });
      return lambda1
    });
    tmp3 = ParseRule.Choice.reference(rhsKind, lambda, tmp2);
    return runtime.safeCall(tmp(tmp3))
  } 
  static makeBracketRule(opening, closing, contentKind, wrapContent) {
    let tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, lambda;
    tmp = ParseRule.Choice.keyword(opening);
    lambda = (undefined, function (tree, end) {
      let param0, param1, msg, tmp7;
      if (end instanceof Tree.Error.class) {
        param0 = end.tree;
        param1 = end.message;
        if (param0 instanceof Tree.Empty.class) {
          msg = param1;
          tmp7 = runtime.safeCall(wrapContent(tree));
          return Tree.Error(tmp7, msg)
        } else {
          throw new globalThis.Error("match error");
        }
      } else if (end instanceof Tree.Empty.class) {
        return runtime.safeCall(wrapContent(tree))
      } else {
        throw new globalThis.Error("match error");
      }
    });
    tmp1 = lambda;
    tmp2 = contentKind + " in bracket";
    tmp3 = ParseRule.Choice.keyword(closing);
    tmp4 = ParseRule.Choice.end(Tree.empty);
    tmp5 = runtime.safeCall(tmp3(tmp4));
    tmp6 = ParseRule.Choice.reference(contentKind, tmp1, tmp2, tmp5);
    return runtime.safeCall(tmp(tmp6))
  }
  static toString() { return "Rules"; }
};
let Rules = Rules1; export default Rules;
