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
    let tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20, tmp21, tmp22, tmp23, tmp24, tmp25, tmp26, tmp27, tmp28, tmp29, tmp30, tmp31, tmp32, tmp33, tmp34, tmp35, tmp36, tmp37, tmp38, tmp39, tmp40, tmp41, tmp42, tmp43, tmp44, tmp45, tmp46, tmp47, tmp48, tmp49, tmp50, tmp51, tmp52, tmp53, tmp54, tmp55, tmp56, tmp57, tmp58, tmp59, tmp60, tmp61, tmp62, tmp63, tmp64, tmp65, tmp66, tmp67, tmp68, tmp69, tmp70, tmp71, tmp72, tmp73, tmp74, tmp75, tmp76, tmp77, tmp78, tmp79, tmp80, tmp81, tmp82, tmp83, tmp84, tmp85, tmp86, tmp87, tmp88, tmp89, tmp90, tmp91, tmp92, tmp93, tmp94, tmp95, tmp96, tmp97, tmp98, tmp99, tmp100, tmp101, tmp102, tmp103, tmp104, tmp105, tmp106, tmp107, tmp108, tmp109, tmp110, tmp111, tmp112, tmp113, tmp114, tmp115, tmp116, tmp117, tmp118, tmp119, tmp120, tmp121, tmp122, tmp123, tmp124, tmp125, tmp126, tmp127, tmp128, tmp129, tmp130, tmp131, tmp132, tmp133, tmp134, tmp135, tmp136, tmp137, tmp138, tmp139, tmp140, tmp141, tmp142, tmp143, tmp144, tmp145, tmp146, tmp147, tmp148, tmp149, tmp150, tmp151, tmp152, tmp153, tmp154, tmp155, tmp156, tmp157, tmp158, tmp159, tmp160, tmp161, tmp162, tmp163, tmp164, tmp165, tmp166, tmp167, tmp168, tmp169, tmp170, tmp171, tmp172, tmp173, tmp174, tmp175, tmp176, tmp177, tmp178, tmp179, tmp180, tmp181, tmp182, tmp183, tmp184, tmp185, tmp186, tmp187, tmp188, tmp189, tmp190, tmp191, tmp192, tmp193, tmp194, tmp195, tmp196, tmp197, tmp198, tmp199, tmp200, tmp201, tmp202, tmp203, tmp204, tmp205, tmp206, tmp207, tmp208, tmp209, tmp210, tmp211, tmp212, tmp213, tmp214, tmp215, tmp216, tmp217, tmp218, tmp219, tmp220, tmp221, tmp222, tmp223, tmp224, tmp225, tmp226, tmp227, tmp228, tmp229, tmp230, tmp231, tmp232, tmp233, tmp234, tmp235, tmp236, tmp237, tmp238, tmp239, tmp240, tmp241, tmp242, tmp243, tmp244, tmp245, tmp246, tmp247, tmp248, tmp249, tmp250, tmp251, tmp252, tmp253, tmp254, tmp255, tmp256, tmp257, tmp258, tmp259, tmp260, tmp261, tmp262, tmp263, tmp264, tmp265, tmp266, tmp267, tmp268, tmp269, tmp270, tmp271, tmp272, tmp273, tmp274, tmp275, tmp276, tmp277, tmp278, tmp279, tmp280, tmp281, tmp282, tmp283, tmp284, tmp285, tmp286, tmp287, tmp288, tmp289, tmp290, tmp291, tmp292, tmp293, tmp294, tmp295, tmp296, tmp297, tmp298, tmp299, tmp300, tmp301, tmp302, tmp303, tmp304, tmp305, tmp306, tmp307, tmp308, tmp309, tmp310, tmp311, tmp312, tmp313, tmp314, tmp315, tmp316, lambda, lambda1, lambda2, lambda3, lambda4, lambda5, lambda6, lambda7, lambda8, lambda9, lambda10, lambda11, lambda12, lambda13, lambda14, lambda15, lambda16, lambda17, lambda18, lambda19, lambda20, lambda21, lambda22, lambda23, lambda24, lambda25, lambda26, lambda27, lambda28, lambda29, lambda30, lambda31, lambda32, lambda33, lambda34, lambda35, lambda36, lambda37, lambda38, lambda39, lambda40, lambda41, lambda42, lambda43, lambda44, lambda45, lambda46, lambda47, lambda48, lambda49, lambda50, lambda51, lambda52, lambda53, lambda54, lambda55, lambda56, lambda57, lambda58, lambda59, lambda60, lambda61, lambda62, lambda63, lambda64, lambda65, lambda66;
    tmp = new BetterMap.Map();
    this.syntaxKinds = tmp;
    tmp1 = new globalThis.Set();
    this.extendedKinds = tmp1;
    tmp2 = Rules.define("let-bindings");
    lambda = (undefined, function (lhs, rhsBindings) {
      let first1, first0, rhs, bindings, tmp317;
      if (globalThis.Array.isArray(rhsBindings) && rhsBindings.length === 2) {
        first0 = rhsBindings[0];
        first1 = rhsBindings[1];
        rhs = first0;
        bindings = first1;
        tmp317 = Tree.Infix(Precedence.Keywords._equal, lhs, rhs);
        return Stack.Cons(tmp317, bindings)
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
    tmp8 = runtime.safeCall(tmp7({
    "process": lambda1, "name": "let-bindings tail"
    }));
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
      let tmp317;
      tmp317 = Stack.Cons(params, Stack.Nil);
      return Tree.Lambda(tmp317, body)
    });
    tmp20 = ParseRule.Choice.term(lambda4, "function parameters", tmp19);
    tmp21 = runtime.safeCall(tmp15(tmp20));
    Rules.#funTerm = tmp21;
    tmp22 = Rules.define("simple-matching");
    lambda5 = (undefined, function (lhs, rhsTail) {
      let first1, first0, rhs, tail, tmp317;
      if (globalThis.Array.isArray(rhsTail) && rhsTail.length === 2) {
        first0 = rhsTail[0];
        first1 = rhsTail[1];
        rhs = first0;
        tail = first1;
        tmp317 = Tree.Infix(Precedence.Keywords._thinArrow, lhs, rhs);
        return Stack.Cons(tmp317, tail)
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
    tmp28 = runtime.safeCall(tmp27({
    "process": lambda6, "name": "simple-matching tail"
    }));
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
    tmp36 = runtime.safeCall(tmp35({
    "process": lambda8, "name": "pattern list tail"
    }));
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
    tmp46 = runtime.safeCall(tmp45({
    "process": lambda10, "name": "multiple-matching tail"
    }));
    tmp47 = runtime.safeCall(tmp44(tmp46));
    lambda11 = (undefined, function (rhs, _) {
      return rhs
    });
    tmp48 = ParseRule.Choice.term(lambda11, "the right-hand side of the arrow", tmp43, tmp47);
    tmp49 = runtime.safeCall(tmp42(tmp48));
    tmp50 = Predef.tuple(tmp49);
    tmp51 = runtime.safeCall(tmp40({
    "process": tmp41, "name": "the list of patterns", "choices": tmp50
    }));
    tmp52 = runtime.safeCall(tmp39(tmp51));
    lambda12 = (undefined, function (lhs, rhs) {
      let param0, tail, tmp317, tmp318, tmp319;
      if (rhs instanceof Tree.Tuple.class) {
        param0 = rhs.trees;
        tail = param0;
        tmp317 = Stack.Cons(lhs, tail);
        return Tree.Tuple(tmp317)
      } else {
        tmp318 = Stack.Cons(rhs, Stack.Nil);
        tmp319 = Stack.Cons(lhs, tmp318);
        return Tree.Tuple(tmp319)
      }
    });
    tmp53 = lambda12;
    tmp54 = Rules.makeInfixChoice(Precedence.Keywords._comma, "term", tmp53);
    lambda13 = (undefined, function (lhs, rhs) {
      let param0, tail, tmp317, tmp318, tmp319;
      if (rhs instanceof Tree.Sequence.class) {
        param0 = rhs.trees;
        tail = param0;
        tmp317 = Stack.Cons(lhs, tail);
        return Tree.Sequence(tmp317)
      } else {
        tmp318 = Stack.Cons(rhs, Stack.Nil);
        tmp319 = Stack.Cons(lhs, tmp318);
        return Tree.Sequence(tmp319)
      }
    });
    tmp55 = lambda13;
    tmp56 = Rules.makeInfixChoice(Precedence.Keywords._semicolon, "term", tmp55);
    lambda14 = (undefined, function (lhs, rhs) {
      return Tree.Infix(Precedence.Keywords._leftArrow, lhs, rhs)
    });
    tmp57 = Rules.makeInfixChoice(Precedence.Keywords._leftArrow, "term", lambda14);
    lambda15 = (undefined, function (lhs, rhs) {
      return Tree.Infix(Precedence.Keywords._equalequal, lhs, rhs)
    });
    tmp58 = Rules.makeInfixChoice(Precedence.Keywords._equalequal, "term", lambda15);
    lambda16 = (undefined, function (lhs, rhs) {
      let tmp317, tmp318, tmp319;
      tmp317 = Tree.Ident("*", true);
      tmp318 = Stack.Cons(rhs, Stack.Nil);
      tmp319 = Stack.Cons(lhs, tmp318);
      return Tree.App(tmp317, tmp319)
    });
    tmp59 = lambda16;
    tmp60 = Rules.makeInfixChoice(Precedence.Keywords._asterisk, "term", tmp59);
    tmp61 = ParseRule.Choice.keyword(Precedence.Keywords._period);
    tmp62 = ParseRule.Choice.keyword(Precedence.Keywords._leftRound);
    tmp63 = ParseRule.Choice.keyword(Precedence.Keywords._rightRound);
    tmp64 = runtime.safeCall(tmp63());
    lambda17 = (undefined, function (argument, _) {
      let lambda67;
      lambda67 = (undefined, function (lhs) {
        let tmp317;
        tmp317 = Tree.Bracketed(Token.Round, argument);
        return Tree.Infix(Precedence.Keywords._period, lhs, tmp317)
      });
      return lambda67
    });
    tmp65 = ParseRule.Choice.term(lambda17, "application argument", tmp64);
    tmp66 = runtime.safeCall(tmp62(tmp65));
    tmp67 = ParseRule.Choice.reference("term");
    lambda18 = (undefined, function (rhs, _) {
      let lambda67;
      lambda67 = (undefined, function (lhs) {
        return Tree.Infix(Precedence.Keywords._period, lhs, rhs)
      });
      return lambda67
    });
    tmp68 = runtime.safeCall(tmp67({
    "process": lambda18, "name": "operator `.` right-hand side"
    }));
    tmp69 = runtime.safeCall(tmp61(tmp66, tmp68));
    tmp70 = ParseRule.Choice.keyword(Precedence.Keywords._colon);
    lambda19 = (undefined, function (rhs, _) {
      let lambda67;
      lambda67 = (undefined, function (lhs) {
        return Tree.Infix(Precedence.Keywords._colon, lhs, rhs)
      });
      return lambda67
    });
    tmp71 = ParseRule.Choice.typeExpr(lambda19, "right-hand side type");
    tmp72 = runtime.safeCall(tmp70(tmp71));
    tmp73 = Option.Some(Precedence.Keywords.appPrec);
    lambda20 = (undefined, function (argument, _) {
      let lambda67;
      lambda67 = (undefined, function (callee) {
        return Tree.App(callee, argument)
      });
      return lambda67
    });
    tmp74 = ParseRule.Choice.termWithPrec(lambda20, "application argument", tmp73, Option.None);
    tmp75 = ParseRule.rule("infix rules for expressions", tmp54, tmp56, tmp57, tmp58, tmp60, tmp69, tmp72, tmp74);
    this.termInfixRule = tmp75;
    tmp76 = ParseRule.Choice.keyword(Precedence.Keywords._match);
    tmp77 = ParseRule.Choice.keyword(Precedence.Keywords._with);
    tmp78 = ParseRule.Choice.keyword(Precedence.Keywords._bar);
    tmp79 = runtime.safeCall(tmp78());
    tmp80 = ParseRule.rule("pattern matching case body", tmp79);
    tmp81 = Rules.getRuleByKind("simple-matching");
    tmp82 = ParseRule.Choice.optional(tmp80, tmp81);
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
    tmp83 = lambda21;
    tmp84 = ParseRule.Choice.map(tmp82, tmp83);
    tmp85 = runtime.safeCall(tmp77(tmp84));
    tmp86 = ParseRule.Choice.term(Tree.Match, "pattern matching scrutinee", tmp85);
    tmp87 = runtime.safeCall(tmp76(tmp86));
    tmp88 = ParseRule.Choice.keyword(Precedence.Keywords._function);
    tmp89 = ParseRule.Choice.keyword(Precedence.Keywords._bar);
    tmp90 = runtime.safeCall(tmp89());
    tmp91 = ParseRule.rule("function body", tmp90);
    tmp92 = Rules.getRuleByKind("simple-matching");
    tmp93 = ParseRule.Choice.optional(tmp91, tmp92);
    tmp94 = runtime.safeCall(tmp88(tmp93));
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
    tmp95 = lambda22;
    tmp96 = ParseRule.Choice.map(tmp94, tmp95);
    tmp97 = ParseRule.Choice.keyword(Precedence.Keywords._if);
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
    tmp98 = lambda23;
    tmp99 = ParseRule.Choice.keyword(Precedence.Keywords._then);
    tmp100 = ParseRule.Choice.end(Option.None);
    tmp101 = ParseRule.Choice.keyword(Precedence.Keywords._else);
    tmp102 = ParseRule.Choice.end(Option.None);
    lambda24 = (undefined, function (alt, _) {
      return Option.Some(alt)
    });
    tmp103 = ParseRule.Choice.term(lambda24, "if-then-else alternative", tmp102);
    tmp104 = runtime.safeCall(tmp101(tmp103));
    lambda25 = (undefined, function (con, optAlt) {
      return [
        con,
        optAlt
      ]
    });
    tmp105 = ParseRule.Choice.term(lambda25, "if-then-else consequent", tmp100, tmp104);
    tmp106 = runtime.safeCall(tmp99(tmp105));
    tmp107 = ParseRule.Choice.term(tmp98, "if-then-else condition", tmp106);
    tmp108 = runtime.safeCall(tmp97(tmp107));
    tmp109 = ParseRule.Choice.keyword(Precedence.Keywords._while);
    tmp110 = ParseRule.Choice.keyword(Precedence.Keywords._do);
    tmp111 = ParseRule.Choice.keyword(Precedence.Keywords._done);
    tmp112 = runtime.safeCall(tmp111());
    lambda26 = (undefined, function (body, _) {
      return body
    });
    tmp113 = ParseRule.Choice.term(lambda26, "while end", tmp112);
    tmp114 = runtime.safeCall(tmp110(tmp113));
    tmp115 = ParseRule.Choice.term(Tree.While, "while body", tmp114);
    tmp116 = runtime.safeCall(tmp109(tmp115));
    tmp117 = ParseRule.Choice.keyword(Precedence.Keywords._for);
    tmp118 = ParseRule.Choice.keyword(Precedence.Keywords._equal);
    tmp119 = ParseRule.Choice.keyword(Precedence.Keywords._to);
    tmp120 = runtime.safeCall(tmp119());
    tmp121 = ParseRule.Choice.keyword(Precedence.Keywords._downto);
    tmp122 = runtime.safeCall(tmp121());
    tmp123 = ParseRule.rule("iteration keyword", tmp120, tmp122);
    tmp124 = ParseRule.Choice.keyword(Precedence.Keywords._do);
    tmp125 = ParseRule.Choice.keyword(Precedence.Keywords._done);
    tmp126 = runtime.safeCall(tmp125());
    lambda27 = (undefined, function (body, _) {
      return body
    });
    tmp127 = ParseRule.Choice.term(lambda27, "`for` `done` keyword", tmp126);
    tmp128 = runtime.safeCall(tmp124(tmp127));
    lambda28 = (undefined, function (end, body) {
      return [
        end,
        body
      ]
    });
    tmp129 = ParseRule.Choice.term(lambda28, "`for` `do` keyword", tmp128);
    tmp130 = ParseRule.rule("the iteration keyword", tmp129);
    tmp131 = ParseRule.Choice.siding(tmp123, tmp130);
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
    tmp132 = lambda29;
    tmp133 = ParseRule.Choice.map(tmp131, tmp132);
    lambda30 = (undefined, function (start, endBody) {
      return [
        start,
        ...endBody
      ]
    });
    tmp134 = ParseRule.Choice.term(lambda30, "`for` `to` or `downto` keyword", tmp133);
    tmp135 = runtime.safeCall(tmp118(tmp134));
    lambda31 = (undefined, function (head, startEndBody) {
      return Tree.For(head, ...startEndBody)
    });
    tmp136 = ParseRule.Choice.term(lambda31, "`for` head", tmp135);
    tmp137 = runtime.safeCall(tmp117(tmp136));
    lambda32 = (undefined, function (tree) {
      if (tree instanceof Tree.Empty.class) {
        return Tree.Tuple(Stack.Nil)
      } else {
        return tree
      }
    });
    tmp138 = Rules.makeBracketRule(Precedence.Keywords._leftRound, Precedence.Keywords._rightRound, "term", lambda32);
    lambda33 = (undefined, function (tree) {
      let tmp317;
      if (tree instanceof Tree.Empty.class) {
        tmp317 = Tree.Sequence(Stack.Nil);
      } else {
        tmp317 = tree;
      }
      return Tree.Bracketed(Token.Square, tmp317)
    });
    tmp139 = lambda33;
    tmp140 = Rules.makeBracketRule(Precedence.Keywords._leftSquare, Precedence.Keywords._rightSquare, "term", tmp139);
    tmp141 = Rules.makeBracketRule(Precedence.Keywords._leftCurly, Precedence.Keywords._rightCurly, "term", Predef.id);
    lambda34 = (undefined, function (tree) {
      if (tree instanceof Tree.Empty.class) {
        return Tree.Sequence(Stack.Nil)
      } else {
        return tree
      }
    });
    tmp142 = Rules.makeBracketRule(Precedence.Keywords._begin, Precedence.Keywords._end, "term", lambda34);
    lambda35 = (undefined, function (lhs, compose) {
      return runtime.safeCall(compose(lhs))
    });
    tmp143 = ParseRule.Choice.Ref("term", lambda35, Option.None, Option.None, Rules.termInfixRule);
    tmp144 = ParseRule.rule("prefix rules for expressions", Rules.#letExpression, Rules.#funTerm, tmp87, tmp96, tmp108, tmp116, tmp137, tmp138, tmp140, tmp141, tmp142, tmp143);
    this.termRule = tmp144;
    lambda36 = (undefined, function (lhs, rhs) {
      return Tree.Infix(Precedence.Keywords._thinArrow, lhs, rhs)
    });
    tmp145 = Rules.makeInfixChoice(Precedence.Keywords._thinArrow, "type", lambda36);
    lambda37 = (undefined, function (lhs, rhs) {
      return Tree.Infix(Precedence.Keywords._asterisk, lhs, rhs)
    });
    tmp146 = Rules.makeInfixChoice(Precedence.Keywords._asterisk, "type", lambda37);
    tmp147 = Option.Some(Precedence.Keywords.appPrec);
    tmp148 = ParseRule.rule("end of type infix rules");
    lambda38 = (undefined, function (callee, _) {
      let lambda67;
      lambda67 = (undefined, function (argument) {
        return Tree.App(callee, argument)
      });
      return lambda67
    });
    tmp149 = ParseRule.Choice.Ref("type", lambda38, tmp147, Option.None, tmp148);
    tmp150 = ParseRule.rule("infix rules for types", tmp145, tmp146, tmp149);
    this.typeInfixRule = tmp150;
    tmp151 = ParseRule.Choice.keyword(Precedence.Keywords._leftRound);
    tmp152 = ParseRule.Choice.reference("type");
    lambda39 = (undefined, function (headArg, tailArgsCtor) {
      let param0, ctor, first1, first0, tailArgs, ctor1, tmp317, tmp318;
      if (globalThis.Array.isArray(tailArgsCtor) && tailArgsCtor.length === 2) {
        first0 = tailArgsCtor[0];
        first1 = tailArgsCtor[1];
        tailArgs = first0;
        ctor1 = first1;
        tmp317 = Stack.Cons(headArg, tailArgs);
        tmp318 = Tree.Tuple(tmp317);
        return Tree.App(ctor1, tmp318)
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
    tmp153 = lambda39;
    tmp154 = ParseRule.Choice.reference("type-arguments-tail");
    tmp155 = ParseRule.Choice.keyword(Precedence.Keywords._rightRound);
    tmp156 = ParseRule.Choice.reference("ident");
    lambda40 = (undefined, function (ident, _) {
      return Option.Some(ident)
    });
    tmp157 = runtime.safeCall(tmp156({
    "process": lambda40, "name": "the type constructor's name"
    }));
    tmp158 = runtime.safeCall(tmp155(tmp157));
    tmp159 = Predef.tuple(tmp158);
    lambda41 = (undefined, function (args, ident) {
      return [
        args,
        ident
      ]
    });
    tmp160 = runtime.safeCall(tmp154({
    "process": lambda41, "name": "the remaining type arguments", "choices": tmp159
    }));
    tmp161 = ParseRule.Choice.keyword(Precedence.Keywords._rightRound);
    tmp162 = ParseRule.Choice.end(Option.None);
    tmp163 = ParseRule.Choice.reference("ident");
    lambda42 = (undefined, function (ident, _) {
      return Option.Some(ident)
    });
    tmp164 = runtime.safeCall(tmp163({
    "process": lambda42, "name": "the type constructor's name"
    }));
    tmp165 = runtime.safeCall(tmp161(tmp162, tmp164));
    tmp166 = Predef.tuple(tmp160, tmp165);
    tmp167 = runtime.safeCall(tmp152({
    "process": tmp153, "name": "the first type in the parentheses", "choices": tmp166
    }));
    tmp168 = runtime.safeCall(tmp151(tmp167));
    tmp169 = ParseRule.Choice.reference("type");
    lambda43 = (undefined, function (lhs, compose) {
      return runtime.safeCall(compose(lhs))
    });
    tmp170 = runtime.safeCall(tmp169({
    "process": lambda43, "choices": Rules.typeInfixRule
    }));
    tmp171 = ParseRule.rule("rules for types", tmp168, tmp170);
    this.typeRule = tmp171;
    tmp172 = Rules.define("type-arguments-tail");
    tmp173 = ParseRule.Choice.keyword(Precedence.Keywords._comma);
    tmp174 = ParseRule.Choice.reference("type");
    tmp175 = ParseRule.Choice.end(Stack.Nil);
    tmp176 = ParseRule.Choice.reference("type-arguments-tail");
    lambda44 = (undefined, function (tail, _) {
      return tail
    });
    tmp177 = runtime.safeCall(tmp176({
    "process": lambda44, "name": "more type arguments"
    }));
    tmp178 = Predef.tuple(tmp175, tmp177);
    tmp179 = runtime.safeCall(tmp174({
    "process": Stack.Cons, "name": "the first type argument", "choices": tmp178
    }));
    tmp180 = runtime.safeCall(tmp173(tmp179));
    tmp181 = runtime.safeCall(tmp172(tmp180));
    tmp182 = Rules.define("constr-decl");
    tmp183 = ParseRule.Choice.reference("ident");
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
    tmp184 = lambda45;
    tmp185 = ParseRule.Choice.end(Option.None);
    tmp186 = ParseRule.Choice.keyword(Precedence.Keywords._of);
    tmp187 = ParseRule.Choice.reference("type");
    lambda46 = (undefined, function (argument, _) {
      return Option.Some(argument)
    });
    tmp188 = runtime.safeCall(tmp187({
    "process": lambda46, "name": "the variant constructor's argument"
    }));
    tmp189 = runtime.safeCall(tmp186(tmp188));
    tmp190 = Predef.tuple(tmp185, tmp189);
    tmp191 = runtime.safeCall(tmp183({
    "process": tmp184, "name": "the variant constructor's name", "choices": tmp190
    }));
    tmp192 = runtime.safeCall(tmp182(tmp191));
    tmp193 = Rules.define("variants");
    tmp194 = ParseRule.Choice.reference("constr-decl");
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
    tmp195 = lambda47;
    tmp196 = ParseRule.Choice.end(Option.None);
    tmp197 = ParseRule.Choice.keyword(Precedence.Keywords._bar);
    tmp198 = ParseRule.Choice.reference("variants");
    lambda48 = (undefined, function (more, _) {
      return Option.Some(more)
    });
    tmp199 = runtime.safeCall(tmp198({
    "process": lambda48, "name": "variants end"
    }));
    tmp200 = runtime.safeCall(tmp197(tmp199));
    tmp201 = Predef.tuple(tmp196, tmp200);
    tmp202 = runtime.safeCall(tmp194({
    "process": tmp195, "name": "variants item", "choices": tmp201
    }));
    tmp203 = runtime.safeCall(tmp193(tmp202));
    tmp204 = Rules.define("typedefs");
    tmp205 = ParseRule.Choice.reference("typedef-lhs");
    lambda49 = (undefined, function (lhs, rhsMore) {
      let first1, first0, rhs, more, tmp317;
      if (globalThis.Array.isArray(rhsMore) && rhsMore.length === 2) {
        first0 = rhsMore[0];
        first1 = rhsMore[1];
        rhs = first0;
        more = first1;
        tmp317 = runtime.safeCall(rhs(lhs));
        return Stack.Cons(tmp317, more)
      } else {
        throw new globalThis.Error("match error");
      }
    });
    tmp206 = lambda49;
    tmp207 = ParseRule.Choice.reference("typedef-rhs");
    tmp208 = ParseRule.Choice.end(Stack.Nil);
    tmp209 = ParseRule.Choice.keyword(Precedence.Keywords._and);
    tmp210 = ParseRule.Choice.reference("typedefs");
    lambda50 = (undefined, function (more, _) {
      return more
    });
    tmp211 = runtime.safeCall(tmp210({
    "process": lambda50, "name": "typedef end"
    }));
    tmp212 = runtime.safeCall(tmp209(tmp211));
    tmp213 = Predef.tuple(tmp208, tmp212);
    tmp214 = runtime.safeCall(tmp207({
    "name": "typedef body", "choices": tmp213
    }));
    tmp215 = Predef.tuple(tmp214);
    tmp216 = runtime.safeCall(tmp205({
    "process": tmp206, "name": "typedef name", "choices": tmp215
    }));
    tmp217 = runtime.safeCall(tmp204(tmp216));
    tmp218 = Rules.define("typedef-rhs");
    tmp219 = ParseRule.Choice.keyword(Precedence.Keywords._equal);
    tmp220 = ParseRule.Choice.reference("variants");
    lambda51 = (undefined, function (rhs, _) {
      let lambda67;
      lambda67 = (undefined, function (lhs) {
        return Tree.Infix(Precedence.Keywords._equal, lhs, rhs)
      });
      return lambda67
    });
    tmp221 = runtime.safeCall(tmp220({
    "process": lambda51, "name": "typedef-rhs: variants"
    }));
    tmp222 = ParseRule.Choice.keyword(Precedence.Keywords._leftCurly);
    tmp223 = ParseRule.Choice.reference("label-decls");
    lambda52 = (undefined, function (content, _) {
      let tmp317, tmp318;
      if (content instanceof Stack.Nil.class) {
        tmp317 = Tree.Sequence(Stack.Nil);
        return Tree.Bracketed(Token.Curly, tmp317)
      } else {
        tmp318 = Tree.Sequence(content);
        return Tree.Bracketed(Token.Curly, tmp318)
      }
    });
    tmp224 = lambda52;
    tmp225 = ParseRule.Choice.keyword(Precedence.Keywords._rightCurly);
    tmp226 = ParseRule.Choice.end(Tree.empty);
    tmp227 = runtime.safeCall(tmp225(tmp226));
    tmp228 = Predef.tuple(tmp227);
    tmp229 = runtime.safeCall(tmp223({
    "process": tmp224, "name": "label-decl", "choices": tmp228
    }));
    tmp230 = runtime.safeCall(tmp222(tmp229));
    lambda53 = (undefined, function (rhs) {
      let lambda67;
      lambda67 = (undefined, function (lhs) {
        return Tree.Infix(Precedence.Keywords._equal, lhs, rhs)
      });
      return lambda67
    });
    tmp231 = ParseRule.Choice.map(tmp230, lambda53);
    tmp232 = runtime.safeCall(tmp219(tmp221, tmp231));
    tmp233 = ParseRule.Choice.keyword(Precedence.Keywords._equalequal);
    tmp234 = ParseRule.Choice.reference("type");
    lambda54 = (undefined, function (rhs, _) {
      let lambda67;
      lambda67 = (undefined, function (lhs) {
        return Tree.Infix(Precedence.Keywords._equalequal, lhs, rhs)
      });
      return lambda67
    });
    tmp235 = runtime.safeCall(tmp234({
    "process": lambda54, "name": "type alias body"
    }));
    tmp236 = runtime.safeCall(tmp233(tmp235));
    tmp237 = runtime.safeCall(tmp218(tmp232, tmp236));
    tmp238 = Rules.define("label-decl");
    tmp239 = Tree.infix(Precedence.Keywords._colon);
    tmp240 = ParseRule.Choice.keyword(Precedence.Keywords._colon);
    lambda55 = (undefined, function (rhs, _) {
      return rhs
    });
    tmp241 = ParseRule.Choice.typeExpr(lambda55, "label-decl body");
    tmp242 = runtime.safeCall(tmp240(tmp241));
    tmp243 = ParseRule.Choice.typeExpr(tmp239, "label-decl name", tmp242);
    tmp244 = runtime.safeCall(tmp238(tmp243));
    tmp245 = Rules.define("label-decls");
    tmp246 = ParseRule.Choice.reference("label-decl");
    tmp247 = ParseRule.Choice.end(Stack.Nil);
    tmp248 = ParseRule.Choice.keyword(Precedence.Keywords._semicolon);
    tmp249 = ParseRule.Choice.reference("label-decls");
    lambda56 = (undefined, function (more, _) {
      return more
    });
    tmp250 = runtime.safeCall(tmp249({
    "process": lambda56, "name": "more label-decls"
    }));
    tmp251 = runtime.safeCall(tmp248(tmp250));
    tmp252 = Predef.tuple(tmp247, tmp251);
    tmp253 = runtime.safeCall(tmp246({
    "process": Stack.Cons, "name": "the first label-decl", "choices": tmp252
    }));
    tmp254 = runtime.safeCall(tmp245(tmp253));
    tmp255 = Rules.define("constr-decls");
    tmp256 = ParseRule.Choice.reference("constr-decl");
    tmp257 = ParseRule.Choice.end(Stack.Nil);
    tmp258 = ParseRule.Choice.keyword(Precedence.Keywords._bar);
    tmp259 = ParseRule.Choice.reference("constr-decls");
    lambda57 = (undefined, function (tail, _) {
      return tail
    });
    tmp260 = runtime.safeCall(tmp259({
    "process": lambda57, "name": "more constructor declarations"
    }));
    tmp261 = runtime.safeCall(tmp258(tmp260));
    tmp262 = Predef.tuple(tmp257, tmp261);
    tmp263 = runtime.safeCall(tmp256({
    "process": Stack.Cons, "name": "the first constructor declaration", "choices": tmp262
    }));
    tmp264 = runtime.safeCall(tmp255(tmp263));
    tmp265 = Rules.define("typedef-lhs");
    tmp266 = ParseRule.Choice.reference("type-params");
    lambda58 = (undefined, function (params, ident) {
      let tmp317;
      if (params instanceof Stack.Nil.class) {
        return ident
      } else {
        tmp317 = Tree.Tuple(params);
        return Tree.App(ident, tmp317)
      }
    });
    tmp267 = lambda58;
    tmp268 = ParseRule.Choice.reference("ident");
    lambda59 = (undefined, function (ident, _) {
      return ident
    });
    tmp269 = runtime.safeCall(tmp268({
    "process": lambda59, "name": "the type identifier"
    }));
    tmp270 = Predef.tuple(tmp269);
    tmp271 = runtime.safeCall(tmp266({
    "process": tmp267, "name": "the type parameters", "choices": tmp270
    }));
    tmp272 = runtime.safeCall(tmp265(tmp271));
    tmp273 = Rules.define("type-params");
    tmp274 = ParseRule.Choice.reference("typevar");
    lambda60 = (undefined, function (head, _) {
      return Stack.Cons(head, Stack.Nil)
    });
    tmp275 = runtime.safeCall(tmp274({
    "process": lambda60, "name": "the only type parameter"
    }));
    tmp276 = ParseRule.Choice.keyword(Precedence.Keywords._leftRound);
    tmp277 = ParseRule.Choice.reference("typevar");
    tmp278 = ParseRule.Choice.reference("type-params-tail");
    tmp279 = ParseRule.Choice.keyword(Precedence.Keywords._rightRound);
    tmp280 = runtime.safeCall(tmp279());
    tmp281 = Predef.tuple(tmp280);
    lambda61 = (undefined, function (tail, _) {
      return tail
    });
    tmp282 = runtime.safeCall(tmp278({
    "process": lambda61, "name": "more type parameters", "choices": tmp281
    }));
    tmp283 = Predef.tuple(tmp282);
    tmp284 = runtime.safeCall(tmp277({
    "process": Stack.Cons, "name": "the first type parameter", "choices": tmp283
    }));
    tmp285 = runtime.safeCall(tmp276(tmp284));
    tmp286 = ParseRule.Choice.end(Stack.Nil);
    tmp287 = runtime.safeCall(tmp273(tmp275, tmp285, tmp286));
    tmp288 = Rules.define("type-params-tail");
    tmp289 = ParseRule.Choice.end(Stack.Nil);
    tmp290 = ParseRule.Choice.keyword(Precedence.Keywords._comma);
    tmp291 = ParseRule.Choice.reference("typevar");
    tmp292 = ParseRule.Choice.reference("type-params-tail");
    tmp293 = ParseRule.Choice.end(runtime.Unit);
    lambda62 = (undefined, function (tail, _) {
      return tail
    });
    tmp294 = runtime.safeCall(tmp292(tmp293, {
    "process": lambda62, "name": "more type parameters"
    }));
    tmp295 = Predef.tuple(tmp294);
    tmp296 = runtime.safeCall(tmp291({
    "process": Stack.Cons, "name": "the first type parameter", "choices": tmp295
    }));
    tmp297 = runtime.safeCall(tmp290(tmp296));
    tmp298 = runtime.safeCall(tmp288(tmp289, tmp297));
    tmp299 = Rules.makeLetBindings(false);
    tmp300 = ParseRule.Choice.keyword(Precedence.Keywords._type);
    tmp301 = ParseRule.Choice.reference("typedefs");
    lambda63 = (undefined, function (typedefs, _) {
      return Tree.Define(Tree.DefineKind.Type, typedefs)
    });
    tmp302 = runtime.safeCall(tmp301({
    "process": lambda63, "name": "more typedefs"
    }));
    tmp303 = runtime.safeCall(tmp300(tmp302));
    tmp304 = ParseRule.Choice.keyword(Precedence.Keywords._exception);
    tmp305 = ParseRule.Choice.reference("constr-decls");
    lambda64 = (undefined, function (decls, _) {
      return Tree.Define(Tree.DefineKind.Exception, decls)
    });
    tmp306 = runtime.safeCall(tmp305({
    "process": lambda64, "name": "constructor declarations"
    }));
    tmp307 = runtime.safeCall(tmp304(tmp306));
    tmp308 = ParseRule.Choice.keyword(Precedence.Keywords._hash);
    tmp309 = ParseRule.Choice.reference("ident");
    lambda65 = (undefined, function (ident, body) {
      let tmp317;
      tmp317 = Stack.Cons([
        ident,
        body
      ], Stack.Nil);
      return Tree.Define(Tree.DefineKind.Directive, tmp317)
    });
    tmp310 = runtime.safeCall(tmp309({
    "process": lambda65, "name": "directive name"
    }));
    tmp311 = ParseRule.Choice.reference("term");
    lambda66 = (undefined, function (body, _) {
      return body
    });
    tmp312 = runtime.safeCall(tmp311({
    "process": lambda66, "name": "directive body"
    }));
    tmp313 = runtime.safeCall(tmp308(tmp310, tmp312));
    tmp314 = ParseRule.rule("prefix rules for module items", tmp299, tmp303, tmp307, tmp313);
    this.declRule = tmp314;
    tmp315 = Rules.syntaxKinds.insert("term", Rules.termRule);
    tmp316 = Rules.syntaxKinds.insert("type", Rules.typeRule);
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
    tmp14 = runtime.safeCall(tmp6({
    "process": lambda1, "name": "let-bindings", "choices": tmp12
    }));
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
    tmp4 = runtime.safeCall(tmp1({
    "process": lambda, "name": tmp3
    }));
    return runtime.safeCall(tmp(tmp4))
  } 
  static makeBracketRule(opening, closing, contentKind, wrapContent) {
    let tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, lambda;
    tmp = ParseRule.Choice.keyword(opening);
    tmp1 = ParseRule.Choice.reference(contentKind);
    lambda = (undefined, function (tree, end) {
      let param0, param1, msg, tmp9;
      if (end instanceof Tree.Error.class) {
        param0 = end.tree;
        param1 = end.message;
        if (param0 instanceof Tree.Empty.class) {
          msg = param1;
          tmp9 = runtime.safeCall(wrapContent(tree));
          return Tree.Error(tmp9, msg)
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
    tmp7 = Predef.tuple(tmp6);
    tmp8 = runtime.safeCall(tmp1({
    "process": tmp2, "name": tmp3, "choices": tmp7
    }));
    return runtime.safeCall(tmp(tmp8))
  }
  static toString() { return "Rules"; }
};
let Rules = Rules1; export default Rules;
