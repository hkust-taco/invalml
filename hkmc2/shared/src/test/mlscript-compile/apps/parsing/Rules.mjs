import runtime from "./../../Runtime.mjs";
import Predef from "./../../Predef.mjs";
import Option from "./../../Option.mjs";
import Stack from "./../../Stack.mjs";
import BetterMap from "./../../BetterMap.mjs";
import Token from "./Token.mjs";
import Keyword from "./Keyword.mjs";
import Precedence from "./Precedence.mjs";
import Tree from "./Tree.mjs";
import ParseRule from "./ParseRule.mjs";
let Rules1;
Rules1 = class Rules {
  static #letExpression;
  static #funTerm;
  static {
    let tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20, tmp21, tmp22, tmp23, tmp24, tmp25, tmp26, tmp27, tmp28, tmp29, tmp30, tmp31, tmp32, tmp33, tmp34, tmp35, tmp36, tmp37, tmp38, tmp39, tmp40, tmp41, tmp42, tmp43, tmp44, tmp45, tmp46, tmp47, tmp48, tmp49, tmp50, tmp51, tmp52, tmp53, tmp54, tmp55, tmp56, tmp57, tmp58, tmp59, tmp60, tmp61, tmp62, tmp63, tmp64, tmp65, tmp66, tmp67, tmp68, tmp69, tmp70, tmp71, tmp72, tmp73, tmp74, tmp75, tmp76, tmp77, tmp78, tmp79, tmp80, tmp81, tmp82, tmp83, tmp84, tmp85, tmp86, tmp87, tmp88, tmp89, tmp90, tmp91, tmp92, tmp93, tmp94, tmp95, tmp96, tmp97, tmp98, tmp99, tmp100, tmp101, tmp102, tmp103, tmp104, tmp105, tmp106, tmp107, tmp108, tmp109, tmp110, tmp111, tmp112, tmp113, tmp114, tmp115, tmp116, tmp117, tmp118, tmp119, tmp120, tmp121, tmp122, tmp123, tmp124, tmp125, tmp126, tmp127, tmp128, tmp129, tmp130, tmp131, tmp132, tmp133, tmp134, tmp135, tmp136, tmp137, tmp138, tmp139, tmp140, tmp141, tmp142, tmp143, tmp144, tmp145, tmp146, tmp147, tmp148, tmp149, tmp150, tmp151, tmp152, tmp153, tmp154, tmp155, tmp156, tmp157, tmp158, tmp159, tmp160, tmp161, tmp162, tmp163, tmp164, tmp165, tmp166, tmp167, tmp168, tmp169, tmp170, tmp171, tmp172, tmp173, tmp174, tmp175, tmp176, tmp177, tmp178, tmp179, tmp180, tmp181, tmp182, tmp183, tmp184, tmp185, tmp186, tmp187, tmp188, tmp189, tmp190, tmp191, tmp192, tmp193, tmp194, tmp195, tmp196, tmp197, tmp198, tmp199, tmp200, tmp201, tmp202, tmp203, tmp204, tmp205, tmp206, tmp207, tmp208, tmp209, tmp210, tmp211, tmp212, tmp213, tmp214, tmp215, tmp216, tmp217, tmp218, tmp219, tmp220, tmp221, tmp222, tmp223, tmp224, tmp225, tmp226, tmp227, tmp228, tmp229, tmp230, tmp231, tmp232, tmp233, tmp234, tmp235, tmp236, tmp237, tmp238, tmp239, tmp240, tmp241, tmp242, tmp243, tmp244, tmp245, tmp246, tmp247, tmp248, tmp249, tmp250, tmp251, tmp252, tmp253, tmp254, tmp255, tmp256, tmp257, tmp258, tmp259, tmp260, tmp261, tmp262, tmp263, tmp264, tmp265, tmp266, tmp267, tmp268, tmp269, tmp270, tmp271, tmp272, tmp273, tmp274, tmp275, tmp276, tmp277, tmp278, tmp279, tmp280, tmp281, tmp282, tmp283, tmp284, tmp285, tmp286, tmp287, tmp288, tmp289, tmp290, tmp291, tmp292, tmp293, tmp294, tmp295, tmp296, tmp297, tmp298, tmp299, tmp300, lambda, lambda1, lambda2, lambda3, lambda4, lambda5, lambda6, lambda7, lambda8, lambda9, lambda10, lambda11, lambda12, lambda13, lambda14, lambda15, lambda16, lambda17, lambda18, lambda19, lambda20, lambda21, lambda22, lambda23, lambda24, lambda25, lambda26, lambda27, lambda28, lambda29, lambda30, lambda31, lambda32, lambda33, lambda34, lambda35, lambda36, lambda37, lambda38, lambda39, lambda40, lambda41, lambda42, lambda43, lambda44, lambda45, lambda46, lambda47, lambda48, lambda49, lambda50, lambda51, lambda52, lambda53, lambda54, lambda55, lambda56, lambda57, lambda58, lambda59, lambda60, lambda61, lambda62, lambda63, lambda64, lambda65, lambda66;
    tmp = new BetterMap.Map();
    this.syntaxKinds = tmp;
    tmp1 = new globalThis.Set();
    this.extendedKinds = tmp1;
    tmp2 = Rules.define("let-bindings");
    lambda = (undefined, function (lhs, rhsBindings) {
      let first1, first0, rhs, bindings, tmp301;
      if (globalThis.Array.isArray(rhsBindings) && rhsBindings.length === 2) {
        first0 = rhsBindings[0];
        first1 = rhsBindings[1];
        rhs = first0;
        bindings = first1;
        tmp301 = Tree.Infix(Precedence.Keywords._equal, lhs, rhs);
        return Stack.Cons(tmp301, bindings)
      } else {
        throw new globalThis.Error("match error");
      }
    });
    tmp3 = lambda;
    tmp4 = ParseRule.Choice.keyword(Precedence.Keywords._equal);
    tmp5 = ParseRule.Choice.end(Stack.Nil);
    tmp6 = ParseRule.Choice.keyword(Precedence.Keywords._and);
    tmp7 = ParseRule.Choice.reference("let-bindings");
    lambda1 = (undefined, function (tail, _) {
      return tail
    });
    tmp8 = runtime.safeCall(tmp7(lambda1, "let-bindings tail"));
    tmp9 = runtime.safeCall(tmp6(tmp8));
    lambda2 = (undefined, function (rhs, tail) {
      return [
        rhs,
        tail
      ]
    });
    tmp10 = ParseRule.Choice.term(lambda2, "right-hand side", tmp5, tmp9);
    tmp11 = runtime.safeCall(tmp4(tmp10));
    tmp12 = ParseRule.Choice.term(tmp3, "left-hand side", tmp11);
    tmp13 = runtime.safeCall(tmp2(tmp12));
    tmp14 = Rules.makeLetBindings(true);
    Rules.#letExpression = tmp14;
    tmp15 = ParseRule.Choice.keyword(Precedence.Keywords._fun);
    tmp16 = ParseRule.Choice.keyword(Precedence.Keywords._thinArrow);
    tmp17 = ParseRule.Choice.end(Option.None);
    lambda3 = (undefined, function (body, _) {
      return body
    });
    tmp18 = ParseRule.Choice.term(lambda3, "function body", tmp17);
    tmp19 = runtime.safeCall(tmp16(tmp18));
    lambda4 = (undefined, function (params, body) {
      let tmp301;
      tmp301 = Stack.Cons(params, Stack.Nil);
      return Tree.Lambda(tmp301, body)
    });
    tmp20 = ParseRule.Choice.term(lambda4, "function parameters", tmp19);
    tmp21 = runtime.safeCall(tmp15(tmp20));
    Rules.#funTerm = tmp21;
    tmp22 = Rules.define("simple-matching");
    lambda5 = (undefined, function (lhs, rhsTail) {
      let first1, first0, rhs, tail, tmp301;
      if (globalThis.Array.isArray(rhsTail) && rhsTail.length === 2) {
        first0 = rhsTail[0];
        first1 = rhsTail[1];
        rhs = first0;
        tail = first1;
        tmp301 = Tree.Infix(Precedence.Keywords._thinArrow, lhs, rhs);
        return Stack.Cons(tmp301, tail)
      } else {
        throw new globalThis.Error("match error");
      }
    });
    tmp23 = lambda5;
    tmp24 = ParseRule.Choice.keyword(Precedence.Keywords._thinArrow);
    tmp25 = ParseRule.Choice.end(Stack.Nil);
    tmp26 = ParseRule.Choice.keyword(Precedence.Keywords._bar);
    tmp27 = ParseRule.Choice.reference("simple-matching");
    lambda6 = (undefined, function (tail, _) {
      return tail
    });
    tmp28 = runtime.safeCall(tmp27(lambda6, "simple-matching tail"));
    tmp29 = runtime.safeCall(tmp26(tmp28));
    lambda7 = (undefined, function (rhs, tail) {
      return [
        rhs,
        tail
      ]
    });
    tmp30 = ParseRule.Choice.term(lambda7, "rhs", tmp25, tmp29);
    tmp31 = runtime.safeCall(tmp24(tmp30));
    tmp32 = ParseRule.Choice.term(tmp23, "pattern", tmp31);
    tmp33 = runtime.safeCall(tmp22(tmp32));
    tmp34 = Rules.define("pattern-list");
    tmp35 = ParseRule.Choice.reference("pattern-list");
    lambda8 = (undefined, function (tail, _) {
      return tail
    });
    tmp36 = runtime.safeCall(tmp35(lambda8, "pattern list tail"));
    lambda9 = (undefined, function (head, tail) {
      return Stack.Cons(head, tail)
    });
    tmp37 = ParseRule.Choice.term(lambda9, "pattern", tmp36);
    tmp38 = runtime.safeCall(tmp34(tmp37));
    tmp39 = Rules.define("multiple-matching");
    tmp40 = ParseRule.Choice.reference("pattern-list");
    tmp41 = Tree.infix(Precedence.Keywords._thinArrow);
    tmp42 = ParseRule.Choice.keyword(Precedence.Keywords._thinArrow);
    tmp43 = ParseRule.Choice.end(Stack.Nil);
    tmp44 = ParseRule.Choice.keyword(Precedence.Keywords._bar);
    tmp45 = ParseRule.Choice.reference("multiple-matching");
    lambda10 = (undefined, function (tail, _) {
      return tail
    });
    tmp46 = runtime.safeCall(tmp45(lambda10, "multiple-matching tail"));
    tmp47 = runtime.safeCall(tmp44(tmp46));
    lambda11 = (undefined, function (rhs, _) {
      return rhs
    });
    tmp48 = ParseRule.Choice.term(lambda11, "the right-hand side of the arrow", tmp43, tmp47);
    tmp49 = runtime.safeCall(tmp42(tmp48));
    tmp50 = runtime.safeCall(tmp40(tmp41, "the list of patterns", tmp49));
    tmp51 = runtime.safeCall(tmp39(tmp50));
    lambda12 = (undefined, function (lhs, rhs) {
      let param0, tail, tmp301, tmp302, tmp303;
      if (rhs instanceof Tree.Tuple.class) {
        param0 = rhs.trees;
        tail = param0;
        tmp301 = Stack.Cons(lhs, tail);
        return Tree.Tuple(tmp301)
      } else {
        tmp302 = Stack.Cons(rhs, Stack.Nil);
        tmp303 = Stack.Cons(lhs, tmp302);
        return Tree.Tuple(tmp303)
      }
    });
    tmp52 = lambda12;
    tmp53 = Rules.makeInfixChoice(Precedence.Keywords._comma, "term", tmp52);
    lambda13 = (undefined, function (lhs, rhs) {
      let param0, tail, tmp301, tmp302, tmp303;
      if (rhs instanceof Tree.Sequence.class) {
        param0 = rhs.trees;
        tail = param0;
        tmp301 = Stack.Cons(lhs, tail);
        return Tree.Sequence(tmp301)
      } else {
        tmp302 = Stack.Cons(rhs, Stack.Nil);
        tmp303 = Stack.Cons(lhs, tmp302);
        return Tree.Sequence(tmp303)
      }
    });
    tmp54 = lambda13;
    tmp55 = Rules.makeInfixChoice(Precedence.Keywords._semicolon, "term", tmp54);
    lambda14 = (undefined, function (lhs, rhs) {
      return Tree.Infix(Precedence.Keywords._leftArrow, lhs, rhs)
    });
    tmp56 = Rules.makeInfixChoice(Precedence.Keywords._leftArrow, "term", lambda14);
    lambda15 = (undefined, function (lhs, rhs) {
      return Tree.Infix(Precedence.Keywords._equalequal, lhs, rhs)
    });
    tmp57 = Rules.makeInfixChoice(Precedence.Keywords._equalequal, "term", lambda15);
    lambda16 = (undefined, function (lhs, rhs) {
      let tmp301, tmp302, tmp303;
      tmp301 = Tree.Ident("*", true);
      tmp302 = Stack.Cons(rhs, Stack.Nil);
      tmp303 = Stack.Cons(lhs, tmp302);
      return Tree.App(tmp301, tmp303)
    });
    tmp58 = lambda16;
    tmp59 = Rules.makeInfixChoice(Precedence.Keywords._asterisk, "term", tmp58);
    tmp60 = ParseRule.Choice.keyword(Precedence.Keywords._period);
    tmp61 = ParseRule.Choice.keyword(Precedence.Keywords._leftRound);
    tmp62 = ParseRule.Choice.keyword(Precedence.Keywords._rightRound);
    tmp63 = runtime.safeCall(tmp62());
    lambda17 = (undefined, function (argument, _) {
      let lambda67;
      lambda67 = (undefined, function (lhs) {
        let tmp301;
        tmp301 = Tree.Bracketed(Token.Round, argument);
        return Tree.Infix(Precedence.Keywords._period, lhs, tmp301)
      });
      return lambda67
    });
    tmp64 = ParseRule.Choice.term(lambda17, "application argument", tmp63);
    tmp65 = runtime.safeCall(tmp61(tmp64));
    tmp66 = ParseRule.Choice.reference("term");
    lambda18 = (undefined, function (rhs, _) {
      let lambda67;
      lambda67 = (undefined, function (lhs) {
        return Tree.Infix(Precedence.Keywords._period, lhs, rhs)
      });
      return lambda67
    });
    tmp67 = runtime.safeCall(tmp66(lambda18, "operator `.` right-hand side"));
    tmp68 = runtime.safeCall(tmp60(tmp65, tmp67));
    tmp69 = ParseRule.Choice.keyword(Precedence.Keywords._colon);
    lambda19 = (undefined, function (rhs, _) {
      let lambda67;
      lambda67 = (undefined, function (lhs) {
        return Tree.Infix(Precedence.Keywords._colon, lhs, rhs)
      });
      return lambda67
    });
    tmp70 = ParseRule.Choice.typeExpr(lambda19, "right-hand side type");
    tmp71 = runtime.safeCall(tmp69(tmp70));
    tmp72 = Option.Some(Precedence.Keywords.appPrec);
    lambda20 = (undefined, function (argument, _) {
      let lambda67;
      lambda67 = (undefined, function (callee) {
        return Tree.App(callee, argument)
      });
      return lambda67
    });
    tmp73 = ParseRule.Choice.termWithPrec(lambda20, "application argument", tmp72, Option.None);
    tmp74 = ParseRule.rule("infix rules for expressions", tmp53, tmp55, tmp56, tmp57, tmp59, tmp68, tmp71, tmp73);
    this.termInfixRule = tmp74;
    tmp75 = ParseRule.Choice.keyword(Precedence.Keywords._match);
    tmp76 = ParseRule.Choice.keyword(Precedence.Keywords._with);
    tmp77 = ParseRule.Choice.keyword(Precedence.Keywords._bar);
    tmp78 = runtime.safeCall(tmp77());
    tmp79 = ParseRule.rule("pattern matching case body", tmp78);
    tmp80 = Rules.getRuleByKind("simple-matching");
    tmp81 = ParseRule.Choice.optional(tmp79, tmp80);
    lambda21 = (undefined, function (caseScrut) {
      let first1, first0, res;
      if (globalThis.Array.isArray(caseScrut) && caseScrut.length === 2) {
        first0 = caseScrut[0];
        first1 = caseScrut[1];
        res = first1;
        return res
      } else {
        throw new globalThis.Error("match error");
      }
    });
    tmp82 = lambda21;
    tmp83 = ParseRule.Choice.map(tmp81, tmp82);
    tmp84 = runtime.safeCall(tmp76(tmp83));
    tmp85 = ParseRule.Choice.term(Tree.Match, "pattern matching scrutinee", tmp84);
    tmp86 = runtime.safeCall(tmp75(tmp85));
    tmp87 = ParseRule.Choice.keyword(Precedence.Keywords._function);
    tmp88 = ParseRule.Choice.keyword(Precedence.Keywords._bar);
    tmp89 = runtime.safeCall(tmp88());
    tmp90 = ParseRule.rule("function body", tmp89);
    tmp91 = Rules.getRuleByKind("simple-matching");
    tmp92 = ParseRule.Choice.optional(tmp90, tmp91);
    tmp93 = runtime.safeCall(tmp87(tmp92));
    lambda22 = (undefined, function (caseScrut) {
      let first1, first0, branches;
      if (globalThis.Array.isArray(caseScrut) && caseScrut.length === 2) {
        first0 = caseScrut[0];
        first1 = caseScrut[1];
        branches = first1;
        return Tree.Match(Tree.empty, branches)
      } else {
        throw new globalThis.Error("match error");
      }
    });
    tmp94 = lambda22;
    tmp95 = ParseRule.Choice.map(tmp93, tmp94);
    tmp96 = ParseRule.Choice.keyword(Precedence.Keywords._if);
    lambda23 = (undefined, function (tst, conAlt) {
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
    tmp97 = lambda23;
    tmp98 = ParseRule.Choice.keyword(Precedence.Keywords._then);
    tmp99 = ParseRule.Choice.end(Option.None);
    tmp100 = ParseRule.Choice.keyword(Precedence.Keywords._else);
    tmp101 = ParseRule.Choice.end(Option.None);
    lambda24 = (undefined, function (alt, _) {
      return Option.Some(alt)
    });
    tmp102 = ParseRule.Choice.term(lambda24, "if-then-else alternative", tmp101);
    tmp103 = runtime.safeCall(tmp100(tmp102));
    lambda25 = (undefined, function (con, optAlt) {
      return [
        con,
        optAlt
      ]
    });
    tmp104 = ParseRule.Choice.term(lambda25, "if-then-else consequent", tmp99, tmp103);
    tmp105 = runtime.safeCall(tmp98(tmp104));
    tmp106 = ParseRule.Choice.term(tmp97, "if-then-else condition", tmp105);
    tmp107 = runtime.safeCall(tmp96(tmp106));
    tmp108 = ParseRule.Choice.keyword(Precedence.Keywords._while);
    tmp109 = ParseRule.Choice.keyword(Precedence.Keywords._do);
    tmp110 = ParseRule.Choice.keyword(Precedence.Keywords._done);
    tmp111 = runtime.safeCall(tmp110());
    lambda26 = (undefined, function (body, _) {
      return body
    });
    tmp112 = ParseRule.Choice.term(lambda26, "while end", tmp111);
    tmp113 = runtime.safeCall(tmp109(tmp112));
    tmp114 = ParseRule.Choice.term(Tree.While, "while body", tmp113);
    tmp115 = runtime.safeCall(tmp108(tmp114));
    tmp116 = ParseRule.Choice.keyword(Precedence.Keywords._for);
    tmp117 = ParseRule.Choice.keyword(Precedence.Keywords._equal);
    tmp118 = ParseRule.Choice.keyword(Precedence.Keywords._to);
    tmp119 = runtime.safeCall(tmp118());
    tmp120 = ParseRule.Choice.keyword(Precedence.Keywords._downto);
    tmp121 = runtime.safeCall(tmp120());
    tmp122 = ParseRule.rule("iteration keyword", tmp119, tmp121);
    tmp123 = ParseRule.Choice.keyword(Precedence.Keywords._do);
    tmp124 = ParseRule.Choice.keyword(Precedence.Keywords._done);
    tmp125 = runtime.safeCall(tmp124());
    lambda27 = (undefined, function (body, _) {
      return body
    });
    tmp126 = ParseRule.Choice.term(lambda27, "`for` `done` keyword", tmp125);
    tmp127 = runtime.safeCall(tmp123(tmp126));
    lambda28 = (undefined, function (end, body) {
      return [
        end,
        body
      ]
    });
    tmp128 = ParseRule.Choice.term(lambda28, "`for` `do` keyword", tmp127);
    tmp129 = ParseRule.rule("the iteration keyword", tmp128);
    tmp130 = ParseRule.Choice.siding(tmp122, tmp129);
    lambda29 = (undefined, function (caseScrut) {
      let first1, first0, res;
      if (globalThis.Array.isArray(caseScrut) && caseScrut.length === 2) {
        first0 = caseScrut[0];
        first1 = caseScrut[1];
        res = first1;
        return res
      } else {
        throw new globalThis.Error("match error");
      }
    });
    tmp131 = lambda29;
    tmp132 = ParseRule.Choice.map(tmp130, tmp131);
    lambda30 = (undefined, function (start, endBody) {
      return [
        start,
        ...endBody
      ]
    });
    tmp133 = ParseRule.Choice.term(lambda30, "`for` `to` or `downto` keyword", tmp132);
    tmp134 = runtime.safeCall(tmp117(tmp133));
    lambda31 = (undefined, function (head, startEndBody) {
      return Tree.For(head, ...startEndBody)
    });
    tmp135 = ParseRule.Choice.term(lambda31, "`for` head", tmp134);
    tmp136 = runtime.safeCall(tmp116(tmp135));
    lambda32 = (undefined, function (tree) {
      if (tree instanceof Tree.Empty.class) {
        return Tree.Tuple(Stack.Nil)
      } else {
        return tree
      }
    });
    tmp137 = Rules.makeBracketRule(Precedence.Keywords._leftRound, Precedence.Keywords._rightRound, "term", lambda32);
    lambda33 = (undefined, function (tree) {
      let tmp301;
      if (tree instanceof Tree.Empty.class) {
        tmp301 = Tree.Sequence(Stack.Nil);
      } else {
        tmp301 = tree;
      }
      return Tree.Bracketed(Token.Square, tmp301)
    });
    tmp138 = lambda33;
    tmp139 = Rules.makeBracketRule(Precedence.Keywords._leftSquare, Precedence.Keywords._rightSquare, "term", tmp138);
    tmp140 = Rules.makeBracketRule(Precedence.Keywords._leftCurly, Precedence.Keywords._rightCurly, "term", Predef.id);
    lambda34 = (undefined, function (tree) {
      if (tree instanceof Tree.Empty.class) {
        return Tree.Sequence(Stack.Nil)
      } else {
        return tree
      }
    });
    tmp141 = Rules.makeBracketRule(Precedence.Keywords._begin, Precedence.Keywords._end, "term", lambda34);
    lambda35 = (undefined, function (lhs, compose) {
      return runtime.safeCall(compose(lhs))
    });
    tmp142 = ParseRule.Choice.Ref("term", lambda35, Option.None, Option.None, Rules.termInfixRule);
    tmp143 = ParseRule.rule("prefix rules for expressions", Rules.#letExpression, Rules.#funTerm, tmp86, tmp95, tmp107, tmp115, tmp136, tmp137, tmp139, tmp140, tmp141, tmp142);
    this.termRule = tmp143;
    lambda36 = (undefined, function (lhs, rhs) {
      return Tree.Infix(Precedence.Keywords._thinArrow, lhs, rhs)
    });
    tmp144 = Rules.makeInfixChoice(Precedence.Keywords._thinArrow, "type", lambda36);
    lambda37 = (undefined, function (lhs, rhs) {
      return Tree.Infix(Precedence.Keywords._asterisk, lhs, rhs)
    });
    tmp145 = Rules.makeInfixChoice(Precedence.Keywords._asterisk, "type", lambda37);
    tmp146 = Option.Some(Precedence.Keywords.appPrec);
    tmp147 = ParseRule.rule("end of type infix rules");
    lambda38 = (undefined, function (callee, _) {
      let lambda67;
      lambda67 = (undefined, function (argument) {
        return Tree.App(callee, argument)
      });
      return lambda67
    });
    tmp148 = ParseRule.Choice.Ref("type", lambda38, tmp146, Option.None, tmp147);
    tmp149 = ParseRule.rule("infix rules for types", tmp144, tmp145, tmp148);
    this.typeInfixRule = tmp149;
    tmp150 = ParseRule.Choice.keyword(Precedence.Keywords._leftRound);
    tmp151 = ParseRule.Choice.reference("type");
    lambda39 = (undefined, function (headArg, tailArgsCtor) {
      let param0, ctor, first1, first0, tailArgs, ctor1, tmp301, tmp302;
      if (globalThis.Array.isArray(tailArgsCtor) && tailArgsCtor.length === 2) {
        first0 = tailArgsCtor[0];
        first1 = tailArgsCtor[1];
        tailArgs = first0;
        ctor1 = first1;
        tmp301 = Stack.Cons(headArg, tailArgs);
        tmp302 = Tree.Tuple(tmp301);
        return Tree.App(ctor1, tmp302)
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
    tmp152 = lambda39;
    tmp153 = ParseRule.Choice.reference("type-arguments-tail");
    tmp154 = ParseRule.Choice.keyword(Precedence.Keywords._rightRound);
    tmp155 = ParseRule.Choice.reference("ident");
    lambda40 = (undefined, function (ident, _) {
      return Option.Some(ident)
    });
    tmp156 = runtime.safeCall(tmp155(lambda40, "the type constructor's name"));
    tmp157 = runtime.safeCall(tmp154(tmp156));
    lambda41 = (undefined, function (args, ident) {
      return [
        args,
        ident
      ]
    });
    tmp158 = runtime.safeCall(tmp153(lambda41, "the remaining type arguments", tmp157));
    tmp159 = ParseRule.Choice.keyword(Precedence.Keywords._rightRound);
    tmp160 = ParseRule.Choice.end(Option.None);
    tmp161 = ParseRule.Choice.reference("ident");
    lambda42 = (undefined, function (ident, _) {
      return Option.Some(ident)
    });
    tmp162 = runtime.safeCall(tmp161(lambda42, "the type constructor's name"));
    tmp163 = runtime.safeCall(tmp159(tmp160, tmp162));
    tmp164 = runtime.safeCall(tmp151(tmp152, "the first type in the parentheses", tmp158, tmp163));
    tmp165 = runtime.safeCall(tmp150(tmp164));
    lambda43 = (undefined, function (lhs, compose) {
      return runtime.safeCall(compose(lhs))
    });
    tmp166 = ParseRule.Choice.Ref("type", lambda43, Option.None, Option.None, Rules.typeInfixRule);
    tmp167 = ParseRule.rule("rules for types", tmp165, tmp166);
    this.typeRule = tmp167;
    tmp168 = Rules.define("type-arguments-tail");
    tmp169 = ParseRule.Choice.keyword(Precedence.Keywords._comma);
    tmp170 = ParseRule.Choice.reference("type");
    tmp171 = ParseRule.Choice.end(Stack.Nil);
    tmp172 = ParseRule.Choice.reference("type-arguments-tail");
    lambda44 = (undefined, function (tail, _) {
      return tail
    });
    tmp173 = runtime.safeCall(tmp172(lambda44, "more type arguments"));
    tmp174 = runtime.safeCall(tmp170(Stack.Cons, "the first type argument", tmp171, tmp173));
    tmp175 = runtime.safeCall(tmp169(tmp174));
    tmp176 = runtime.safeCall(tmp168(tmp175));
    tmp177 = Rules.define("constr-decl");
    tmp178 = ParseRule.Choice.reference("ident");
    lambda45 = (undefined, function (ctor, argOpt) {
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
    tmp179 = lambda45;
    tmp180 = ParseRule.Choice.end(Option.None);
    tmp181 = ParseRule.Choice.keyword(Precedence.Keywords._of);
    tmp182 = ParseRule.Choice.reference("type");
    lambda46 = (undefined, function (argument, _) {
      return Option.Some(argument)
    });
    tmp183 = runtime.safeCall(tmp182(lambda46, "the variant constructor's argument"));
    tmp184 = runtime.safeCall(tmp181(tmp183));
    tmp185 = runtime.safeCall(tmp178(tmp179, "the variant constructor's name", tmp180, tmp184));
    tmp186 = runtime.safeCall(tmp177(tmp185));
    tmp187 = Rules.define("variants");
    tmp188 = ParseRule.Choice.reference("constr-decl");
    lambda47 = (undefined, function (lhs, rhsOpt) {
      let param0, rhs;
      if (rhsOpt instanceof Option.Some.class) {
        param0 = rhsOpt.value;
        rhs = param0;
        return Tree.Infix(Precedence.Keywords._bar, lhs, rhs)
      } else {
        return lhs
      }
    });
    tmp189 = lambda47;
    tmp190 = ParseRule.Choice.end(Option.None);
    tmp191 = ParseRule.Choice.keyword(Precedence.Keywords._bar);
    tmp192 = ParseRule.Choice.reference("variants");
    lambda48 = (undefined, function (more, _) {
      return Option.Some(more)
    });
    tmp193 = runtime.safeCall(tmp192(lambda48, "variants end"));
    tmp194 = runtime.safeCall(tmp191(tmp193));
    tmp195 = runtime.safeCall(tmp188(tmp189, "variants item", tmp190, tmp194));
    tmp196 = runtime.safeCall(tmp187(tmp195));
    tmp197 = Rules.define("typedefs");
    tmp198 = ParseRule.Choice.reference("typedef-lhs");
    lambda49 = (undefined, function (lhs, rhsMore) {
      let first1, first0, rhs, more, tmp301;
      if (globalThis.Array.isArray(rhsMore) && rhsMore.length === 2) {
        first0 = rhsMore[0];
        first1 = rhsMore[1];
        rhs = first0;
        more = first1;
        tmp301 = runtime.safeCall(rhs(lhs));
        return Stack.Cons(tmp301, more)
      } else {
        throw new globalThis.Error("match error");
      }
    });
    tmp199 = lambda49;
    tmp200 = ParseRule.Choice.reference("typedef-rhs");
    tmp201 = ParseRule.Choice.end(Stack.Nil);
    tmp202 = ParseRule.Choice.keyword(Precedence.Keywords._and);
    tmp203 = ParseRule.Choice.reference("typedefs");
    lambda50 = (undefined, function (more, _) {
      return more
    });
    tmp204 = runtime.safeCall(tmp203(lambda50, "typedef end"));
    tmp205 = runtime.safeCall(tmp202(tmp204));
    tmp206 = runtime.safeCall(tmp200(Predef.tuple, "typedef body", tmp201, tmp205));
    tmp207 = runtime.safeCall(tmp198(tmp199, "typedef name", tmp206));
    tmp208 = runtime.safeCall(tmp197(tmp207));
    tmp209 = Rules.define("typedef-rhs");
    tmp210 = ParseRule.Choice.keyword(Precedence.Keywords._equal);
    tmp211 = ParseRule.Choice.reference("variants");
    lambda51 = (undefined, function (rhs, _) {
      let lambda67;
      lambda67 = (undefined, function (lhs) {
        return Tree.Infix(Precedence.Keywords._equal, lhs, rhs)
      });
      return lambda67
    });
    tmp212 = runtime.safeCall(tmp211(lambda51, "typedef-rhs: variants"));
    tmp213 = ParseRule.Choice.keyword(Precedence.Keywords._leftCurly);
    tmp214 = ParseRule.Choice.reference("label-decls");
    lambda52 = (undefined, function (content, _) {
      let tmp301, tmp302;
      if (content instanceof Stack.Nil.class) {
        tmp301 = Tree.Sequence(Stack.Nil);
        return Tree.Bracketed(Token.Curly, tmp301)
      } else {
        tmp302 = Tree.Sequence(content);
        return Tree.Bracketed(Token.Curly, tmp302)
      }
    });
    tmp215 = lambda52;
    tmp216 = ParseRule.Choice.keyword(Precedence.Keywords._rightCurly);
    tmp217 = ParseRule.Choice.end(Tree.empty);
    tmp218 = runtime.safeCall(tmp216(tmp217));
    tmp219 = runtime.safeCall(tmp214(tmp215, "label-decl", tmp218));
    tmp220 = runtime.safeCall(tmp213(tmp219));
    lambda53 = (undefined, function (rhs) {
      let lambda67;
      lambda67 = (undefined, function (lhs) {
        return Tree.Infix(Precedence.Keywords._equal, lhs, rhs)
      });
      return lambda67
    });
    tmp221 = ParseRule.Choice.map(tmp220, lambda53);
    tmp222 = runtime.safeCall(tmp210(tmp212, tmp221));
    tmp223 = ParseRule.Choice.keyword(Precedence.Keywords._equalequal);
    tmp224 = ParseRule.Choice.reference("type");
    lambda54 = (undefined, function (rhs, _) {
      let lambda67;
      lambda67 = (undefined, function (lhs) {
        return Tree.Infix(Precedence.Keywords._equalequal, lhs, rhs)
      });
      return lambda67
    });
    tmp225 = runtime.safeCall(tmp224(lambda54, "type alias body"));
    tmp226 = runtime.safeCall(tmp223(tmp225));
    tmp227 = runtime.safeCall(tmp209(tmp222, tmp226));
    tmp228 = Rules.define("label-decl");
    tmp229 = Tree.infix(Precedence.Keywords._colon);
    tmp230 = ParseRule.Choice.keyword(Precedence.Keywords._colon);
    lambda55 = (undefined, function (rhs, _) {
      return rhs
    });
    tmp231 = ParseRule.Choice.typeExpr(lambda55, "label-decl body");
    tmp232 = runtime.safeCall(tmp230(tmp231));
    tmp233 = ParseRule.Choice.typeExpr(tmp229, "label-decl name", tmp232);
    tmp234 = runtime.safeCall(tmp228(tmp233));
    tmp235 = Rules.define("label-decls");
    tmp236 = ParseRule.Choice.reference("label-decl");
    tmp237 = ParseRule.Choice.end(Stack.Nil);
    tmp238 = ParseRule.Choice.keyword(Precedence.Keywords._semicolon);
    tmp239 = ParseRule.Choice.reference("label-decls");
    lambda56 = (undefined, function (more, _) {
      return more
    });
    tmp240 = runtime.safeCall(tmp239(lambda56, "more label-decls"));
    tmp241 = runtime.safeCall(tmp238(tmp240));
    tmp242 = runtime.safeCall(tmp236(Stack.Cons, "the first label-decl", tmp237, tmp241));
    tmp243 = runtime.safeCall(tmp235(tmp242));
    tmp244 = Rules.define("constr-decls");
    tmp245 = ParseRule.Choice.reference("constr-decl");
    tmp246 = ParseRule.Choice.end(Stack.Nil);
    tmp247 = ParseRule.Choice.keyword(Precedence.Keywords._bar);
    tmp248 = ParseRule.Choice.reference("constr-decls");
    lambda57 = (undefined, function (tail, _) {
      return tail
    });
    tmp249 = runtime.safeCall(tmp248(lambda57, "more constructor declarations"));
    tmp250 = runtime.safeCall(tmp247(tmp249));
    tmp251 = runtime.safeCall(tmp245(Stack.Cons, "the first constructor declaration", tmp246, tmp250));
    tmp252 = runtime.safeCall(tmp244(tmp251));
    tmp253 = Rules.define("typedef-lhs");
    tmp254 = ParseRule.Choice.reference("type-params");
    lambda58 = (undefined, function (params, ident) {
      let tmp301;
      if (params instanceof Stack.Nil.class) {
        return ident
      } else {
        tmp301 = Tree.Tuple(params);
        return Tree.App(ident, tmp301)
      }
    });
    tmp255 = lambda58;
    tmp256 = ParseRule.Choice.reference("ident");
    lambda59 = (undefined, function (ident, _) {
      return ident
    });
    tmp257 = runtime.safeCall(tmp256(lambda59, "the type identifier"));
    tmp258 = runtime.safeCall(tmp254(tmp255, "the type parameters", tmp257));
    tmp259 = runtime.safeCall(tmp253(tmp258));
    tmp260 = Rules.define("type-params");
    tmp261 = ParseRule.Choice.reference("typevar");
    lambda60 = (undefined, function (head, _) {
      return Stack.Cons(head, Stack.Nil)
    });
    tmp262 = runtime.safeCall(tmp261(lambda60, "the only type parameter"));
    tmp263 = ParseRule.Choice.keyword(Precedence.Keywords._leftRound);
    tmp264 = ParseRule.Choice.reference("typevar");
    tmp265 = ParseRule.Choice.reference("type-params-tail");
    tmp266 = ParseRule.Choice.keyword(Precedence.Keywords._rightRound);
    tmp267 = runtime.safeCall(tmp266());
    lambda61 = (undefined, function (tail, _) {
      return tail
    });
    tmp268 = runtime.safeCall(tmp265(lambda61, "more type parameters", tmp267));
    tmp269 = runtime.safeCall(tmp264(Stack.Cons, "the first type parameter", tmp268));
    tmp270 = runtime.safeCall(tmp263(tmp269));
    tmp271 = ParseRule.Choice.end(Stack.Nil);
    tmp272 = runtime.safeCall(tmp260(tmp262, tmp270, tmp271));
    tmp273 = Rules.define("type-params-tail");
    tmp274 = ParseRule.Choice.end(Stack.Nil);
    tmp275 = ParseRule.Choice.keyword(Precedence.Keywords._comma);
    tmp276 = ParseRule.Choice.reference("typevar");
    tmp277 = ParseRule.Choice.reference("type-params-tail");
    tmp278 = ParseRule.Choice.end(runtime.Unit);
    lambda62 = (undefined, function (tail, _) {
      return tail
    });
    tmp279 = runtime.safeCall(tmp277(lambda62, "more type parameters", tmp278));
    tmp280 = runtime.safeCall(tmp276(Stack.Cons, "the first type parameter", tmp279));
    tmp281 = runtime.safeCall(tmp275(tmp280));
    tmp282 = runtime.safeCall(tmp273(tmp274, tmp281));
    tmp283 = Rules.makeLetBindings(false);
    tmp284 = ParseRule.Choice.keyword(Precedence.Keywords._type);
    tmp285 = ParseRule.Choice.reference("typedefs");
    lambda63 = (undefined, function (typedefs, _) {
      return Tree.Define(Tree.DefineKind.Type, typedefs)
    });
    tmp286 = runtime.safeCall(tmp285(lambda63, "more typedefs"));
    tmp287 = runtime.safeCall(tmp284(tmp286));
    tmp288 = ParseRule.Choice.keyword(Precedence.Keywords._exception);
    tmp289 = ParseRule.Choice.reference("constr-decls");
    lambda64 = (undefined, function (decls, _) {
      return Tree.Define(Tree.DefineKind.Exception, decls)
    });
    tmp290 = runtime.safeCall(tmp289(lambda64, "constructor declarations"));
    tmp291 = runtime.safeCall(tmp288(tmp290));
    tmp292 = ParseRule.Choice.keyword(Precedence.Keywords._hash);
    tmp293 = ParseRule.Choice.reference("ident");
    tmp294 = ParseRule.Choice.reference("term");
    lambda65 = (undefined, function (body, _) {
      return body
    });
    tmp295 = runtime.safeCall(tmp294(lambda65, "directive body"));
    lambda66 = (undefined, function (ident, body) {
      let tmp301;
      tmp301 = Stack.Cons([
        ident,
        body
      ], Stack.Nil);
      return Tree.Define(Tree.DefineKind.Directive, tmp301)
    });
    tmp296 = runtime.safeCall(tmp293(lambda66, "directive name", tmp295));
    tmp297 = runtime.safeCall(tmp292(tmp296));
    tmp298 = ParseRule.rule("prefix rules for module items", tmp283, tmp287, tmp291, tmp297);
    this.declRule = tmp298;
    tmp299 = Rules.syntaxKinds.insert("term", Rules.termRule);
    tmp300 = Rules.syntaxKinds.insert("type", Rules.typeRule);
    Rules.syntaxKinds.insert("decl", Rules.declRule)
  }
  static getRuleByKind(kind) {
    let tmp;
    tmp = runtime.safeCall(Rules.syntaxKinds.get(kind));
    return Option.unsafe.get(tmp)
  } 
  static define(name) {
    return (...choices) => {
      let tmp;
      tmp = ParseRule.rule(name, ...choices);
      return Rules.syntaxKinds.insert(name, tmp)
    }
  } 
  static makeLetBindings(hasInClause) {
    let intro, tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, lambda, lambda1, lambda2;
    intro = "let binding: ";
    tmp = ParseRule.Choice.keyword(Precedence.Keywords._let);
    tmp1 = intro + "keyword";
    tmp2 = ParseRule.Choice.keyword(Precedence.Keywords._rec);
    tmp3 = runtime.safeCall(tmp2());
    tmp4 = ParseRule.rule(tmp1, tmp3);
    tmp5 = intro + "body";
    tmp6 = ParseRule.Choice.reference("let-bindings");
    if (hasInClause === true) {
      tmp7 = ParseRule.Choice.keyword(Precedence.Keywords._in);
      tmp8 = intro + "body";
      lambda = (undefined, function (body, _) {
        return Option.Some(body)
      });
      tmp9 = ParseRule.Choice.term(lambda, tmp8);
      tmp10 = runtime.safeCall(tmp7(tmp9));
      tmp11 = ParseRule.Choice.end(Option.None);
      tmp12 = Predef.tuple(tmp10, tmp11);
    } else {
      tmp13 = ParseRule.Choice.end(Option.None);
      tmp12 = Predef.tuple(tmp13);
    }
    lambda1 = (undefined, function (bindings, body) {
      return Tree.LetIn(bindings, body)
    });
    tmp14 = runtime.safeCall(tmp6(lambda1, "let-bindings", ...tmp12));
    tmp15 = ParseRule.rule(tmp5, tmp14);
    tmp16 = ParseRule.Choice.optional(tmp4, tmp15);
    lambda2 = (undefined, function (caseScrut) {
      let first1, first0, res;
      if (globalThis.Array.isArray(caseScrut) && caseScrut.length === 2) {
        first0 = caseScrut[0];
        first1 = caseScrut[1];
        res = first1;
        return res
      } else {
        throw new globalThis.Error("match error");
      }
    });
    tmp17 = lambda2;
    tmp18 = ParseRule.Choice.map(tmp16, tmp17);
    return runtime.safeCall(tmp(tmp18))
  } 
  static makeInfixChoice(kw, rhsKind, compose) {
    let tmp, tmp1, tmp2, tmp3, tmp4, lambda;
    tmp = ParseRule.Choice.keyword(kw);
    tmp1 = ParseRule.Choice.reference(rhsKind);
    tmp2 = "operator `" + kw.name;
    tmp3 = tmp2 + "` right-hand side";
    lambda = (undefined, function (rhs, _) {
      let lambda1;
      lambda1 = (undefined, function (lhs) {
        return runtime.safeCall(compose(lhs, rhs))
      });
      return lambda1
    });
    tmp4 = runtime.safeCall(tmp1(lambda, tmp3));
    return runtime.safeCall(tmp(tmp4))
  } 
  static makeBracketRule(opening, closing, contentKind, wrapContent) {
    let tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, lambda;
    tmp = ParseRule.Choice.keyword(opening);
    tmp1 = ParseRule.Choice.reference(contentKind);
    lambda = (undefined, function (tree, end) {
      let param0, param1, msg, tmp8;
      if (end instanceof Tree.Error.class) {
        param0 = end.tree;
        param1 = end.message;
        if (param0 instanceof Tree.Empty.class) {
          msg = param1;
          tmp8 = runtime.safeCall(wrapContent(tree));
          return Tree.Error(tmp8, msg)
        } else {
          throw new globalThis.Error("match error");
        }
      } else if (end instanceof Tree.Empty.class) {
        return runtime.safeCall(wrapContent(tree))
      } else {
        throw new globalThis.Error("match error");
      }
    });
    tmp2 = lambda;
    tmp3 = contentKind + " in bracket";
    tmp4 = ParseRule.Choice.keyword(closing);
    tmp5 = ParseRule.Choice.end(Tree.empty);
    tmp6 = runtime.safeCall(tmp4(tmp5));
    tmp7 = runtime.safeCall(tmp1(tmp2, tmp3, tmp6));
    return runtime.safeCall(tmp(tmp7))
  }
  static toString() { return "Rules"; }
};
let Rules = Rules1; export default Rules;
