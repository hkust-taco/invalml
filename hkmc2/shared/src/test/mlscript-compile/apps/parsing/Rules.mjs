import runtime from "./../../Runtime.mjs";
import Predef from "./../../Predef.mjs";
import Option from "./../../Option.mjs";
import Stack from "./../../Stack.mjs";
import BetterMap from "./../../BetterMap.mjs";
import Iter from "./../../Iter.mjs";
import Token from "./Token.mjs";
import Keyword from "./Keyword.mjs";
import Precedence from "./Precedence.mjs";
import Tree from "./Tree.mjs";
import ParseRule from "./ParseRule.mjs";
let Rules1;
Rules1 = class Rules {
  static #letExpression;
  static {
    let tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20, tmp21, tmp22, tmp23, tmp24, tmp25, tmp26, tmp27, tmp28, tmp29, tmp30, tmp31, tmp32, tmp33, tmp34, tmp35, tmp36, tmp37, tmp38, tmp39, tmp40, tmp41, tmp42, tmp43, tmp44, tmp45, tmp46, tmp47, tmp48, tmp49, tmp50, tmp51, tmp52, tmp53, tmp54, tmp55, tmp56, tmp57, tmp58, tmp59, tmp60, tmp61, tmp62, tmp63, tmp64, tmp65, tmp66, tmp67, tmp68, tmp69, tmp70, tmp71, tmp72, tmp73, tmp74, tmp75, tmp76, tmp77, tmp78, tmp79, tmp80, tmp81, tmp82, tmp83, tmp84, tmp85, tmp86, tmp87, tmp88, tmp89, tmp90, tmp91, tmp92, tmp93, tmp94, tmp95, tmp96, tmp97, tmp98, tmp99, tmp100, tmp101, tmp102, tmp103, tmp104, tmp105, tmp106, tmp107, tmp108, tmp109, tmp110, tmp111, tmp112, tmp113, tmp114, tmp115, tmp116, tmp117, tmp118, tmp119, tmp120, tmp121, tmp122, tmp123, tmp124, tmp125, tmp126, tmp127, tmp128, tmp129, tmp130, tmp131, tmp132, tmp133, tmp134, tmp135, tmp136, tmp137, tmp138, tmp139, tmp140, tmp141, tmp142, tmp143, tmp144, tmp145, tmp146, tmp147, tmp148, tmp149, tmp150, tmp151, tmp152, tmp153, tmp154, tmp155, tmp156, tmp157, tmp158, tmp159, tmp160, tmp161, tmp162, tmp163, tmp164, tmp165, tmp166, tmp167, tmp168, tmp169, tmp170, tmp171, tmp172, tmp173, tmp174, tmp175, tmp176, tmp177, tmp178, tmp179, tmp180, tmp181, tmp182, tmp183, tmp184, tmp185, tmp186, tmp187, tmp188, tmp189, tmp190, tmp191, tmp192, tmp193, tmp194, tmp195, tmp196, tmp197, tmp198, tmp199, tmp200, tmp201, tmp202, tmp203, tmp204, tmp205, tmp206, tmp207, tmp208, tmp209, tmp210, tmp211, tmp212, tmp213, tmp214, tmp215, tmp216, tmp217, tmp218, tmp219, tmp220, tmp221, tmp222, tmp223, tmp224, tmp225, tmp226, tmp227, tmp228, tmp229, tmp230, tmp231, tmp232, tmp233, tmp234, tmp235, tmp236, tmp237, tmp238, tmp239, tmp240, tmp241, tmp242, tmp243, tmp244, tmp245, tmp246, tmp247, tmp248, tmp249, tmp250, tmp251, tmp252, tmp253, tmp254, tmp255, tmp256, tmp257, tmp258, tmp259, tmp260, tmp261, tmp262, tmp263, tmp264, tmp265, tmp266, tmp267, tmp268, tmp269, tmp270, tmp271, tmp272, tmp273, tmp274, tmp275, tmp276, tmp277, tmp278, tmp279, tmp280, tmp281, tmp282, tmp283, tmp284, tmp285, tmp286, tmp287, tmp288, tmp289, tmp290, tmp291, tmp292, tmp293, tmp294, tmp295, tmp296, tmp297, tmp298, tmp299, tmp300, tmp301, tmp302, tmp303, tmp304, tmp305, tmp306, tmp307, tmp308, tmp309, tmp310, tmp311, tmp312, tmp313, tmp314, tmp315, tmp316, tmp317, tmp318, tmp319, tmp320, tmp321, tmp322, tmp323, tmp324, tmp325, tmp326, tmp327, tmp328, tmp329, tmp330, tmp331, tmp332, tmp333, tmp334, tmp335, tmp336, tmp337, lambda, lambda1, lambda2, lambda3, lambda4, lambda5, lambda6, lambda7, lambda8, lambda9, lambda10, lambda11, lambda12, lambda13, lambda14, lambda15, lambda16, lambda17, lambda18, lambda19, lambda20, lambda21, lambda22, lambda23, lambda24, lambda25, lambda26, lambda27, lambda28, lambda29, lambda30, lambda31, lambda32, lambda33, lambda34, lambda35, lambda36, lambda37, lambda38, lambda39, lambda40, lambda41, lambda42, lambda43, lambda44, lambda45, lambda46, lambda47, lambda48, lambda49, lambda50, lambda51, lambda52, lambda53, lambda54, lambda55, lambda56, lambda57, lambda58, lambda59, lambda60, lambda61, lambda62, lambda63, lambda64, lambda65;
    tmp = new BetterMap.Map();
    this.syntaxKinds = tmp;
    tmp1 = new globalThis.Set();
    this.extendedKinds = tmp1;
    tmp2 = Rules.define("let-bindings");
    lambda = (undefined, function (lhs, rhsBindings) {
      let first1, first0, rhs, bindings, tmp338;
      if (globalThis.Array.isArray(rhsBindings) && rhsBindings.length === 2) {
        first0 = rhsBindings[0];
        first1 = rhsBindings[1];
        rhs = first0;
        bindings = first1;
        tmp338 = Tree.Infix(Precedence.Keywords._equal, lhs, rhs);
        return Stack.Cons(tmp338, bindings)
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
    tmp10 = Predef.tuple(tmp5, tmp9);
    lambda2 = (undefined, function (rhs, tail) {
      return [
        rhs,
        tail
      ]
    });
    tmp11 = runtime.safeCall(ParseRule.Choice.term({
    "process": lambda2, "name": "right-hand side", "choices": tmp10
    }));
    tmp12 = runtime.safeCall(tmp4(tmp11));
    tmp13 = Predef.tuple(tmp12);
    tmp14 = runtime.safeCall(ParseRule.Choice.term({
    "process": tmp3, "name": "left-hand side", "choices": tmp13
    }));
    tmp15 = runtime.safeCall(tmp2(tmp14));
    tmp16 = Rules.makeLetBindings(true);
    Rules.#letExpression = tmp16;
    tmp17 = Rules.define("simple-matching");
    lambda3 = (undefined, function (lhs, rhsTail) {
      let first1, first0, rhs, tail, tmp338;
      if (globalThis.Array.isArray(rhsTail) && rhsTail.length === 2) {
        first0 = rhsTail[0];
        first1 = rhsTail[1];
        rhs = first0;
        tail = first1;
        tmp338 = Tree.Infix(Precedence.Keywords._thinArrow, lhs, rhs);
        return Stack.Cons(tmp338, tail)
      } else {
        throw new globalThis.Error("match error");
      }
    });
    tmp18 = lambda3;
    tmp19 = ParseRule.Choice.keyword(Precedence.Keywords._thinArrow);
    tmp20 = ParseRule.Choice.end(Stack.Nil);
    tmp21 = ParseRule.Choice.keyword(Precedence.Keywords._bar);
    tmp22 = ParseRule.Choice.reference("simple-matching");
    lambda4 = (undefined, function (tail, _) {
      return tail
    });
    tmp23 = runtime.safeCall(tmp22({
    "process": lambda4, "name": "simple-matching tail"
    }));
    tmp24 = runtime.safeCall(tmp21(tmp23));
    tmp25 = Predef.tuple(tmp20, tmp24);
    lambda5 = (undefined, function (rhs, tail) {
      return [
        rhs,
        tail
      ]
    });
    tmp26 = runtime.safeCall(ParseRule.Choice.term({
    "process": lambda5, "name": "rhs", "choices": tmp25
    }));
    tmp27 = runtime.safeCall(tmp19(tmp26));
    tmp28 = Predef.tuple(tmp27);
    tmp29 = runtime.safeCall(ParseRule.Choice.term({
    "process": tmp18, "name": "pattern", "choices": tmp28
    }));
    tmp30 = runtime.safeCall(tmp17(tmp29));
    tmp31 = Rules.define("pattern-list");
    tmp32 = ParseRule.Choice.reference("pattern-list");
    lambda6 = (undefined, function (tail, _) {
      return tail
    });
    tmp33 = runtime.safeCall(tmp32({
    "process": lambda6, "name": "pattern list tail"
    }));
    tmp34 = Predef.tuple(tmp33);
    lambda7 = (undefined, function (head, tail) {
      return Stack.Cons(head, tail)
    });
    tmp35 = runtime.safeCall(ParseRule.Choice.term({
    "process": lambda7, "name": "pattern", "choices": tmp34
    }));
    tmp36 = runtime.safeCall(tmp31(tmp35));
    tmp37 = Rules.define("multiple-matching");
    tmp38 = ParseRule.Choice.reference("pattern-list");
    tmp39 = Tree.infix(Precedence.Keywords._thinArrow);
    tmp40 = ParseRule.Choice.keyword(Precedence.Keywords._thinArrow);
    tmp41 = ParseRule.Choice.end(Stack.Nil);
    tmp42 = ParseRule.Choice.keyword(Precedence.Keywords._bar);
    tmp43 = ParseRule.Choice.reference("multiple-matching");
    lambda8 = (undefined, function (tail, _) {
      return tail
    });
    tmp44 = runtime.safeCall(tmp43({
    "process": lambda8, "name": "multiple-matching tail"
    }));
    tmp45 = runtime.safeCall(tmp42(tmp44));
    tmp46 = Predef.tuple(tmp41, tmp45);
    lambda9 = (undefined, function (rhs, _) {
      return rhs
    });
    tmp47 = runtime.safeCall(ParseRule.Choice.term({
    "process": lambda9, "name": "the right-hand side of the arrow", "choices": tmp46
    }));
    tmp48 = runtime.safeCall(tmp40(tmp47));
    tmp49 = Predef.tuple(tmp48);
    tmp50 = runtime.safeCall(tmp38({
    "process": tmp39, "name": "the list of patterns", "choices": tmp49
    }));
    tmp51 = runtime.safeCall(tmp37(tmp50));
    lambda10 = (undefined, function (lhs, rhs) {
      let param0, tail, tmp338, tmp339, tmp340;
      if (rhs instanceof Tree.Tuple.class) {
        param0 = rhs.trees;
        tail = param0;
        tmp338 = Stack.Cons(lhs, tail);
        return Tree.Tuple(tmp338)
      } else {
        tmp339 = Stack.Cons(rhs, Stack.Nil);
        tmp340 = Stack.Cons(lhs, tmp339);
        return Tree.Tuple(tmp340)
      }
    });
    tmp52 = lambda10;
    tmp53 = Rules.makeInfixChoice(Precedence.Keywords._comma, "term", tmp52);
    lambda11 = (undefined, function (lhs, rhs) {
      let param0, tail, tmp338, tmp339, tmp340;
      if (rhs instanceof Tree.Sequence.class) {
        param0 = rhs.trees;
        tail = param0;
        tmp338 = Stack.Cons(lhs, tail);
        return Tree.Sequence(tmp338)
      } else {
        tmp339 = Stack.Cons(rhs, Stack.Nil);
        tmp340 = Stack.Cons(lhs, tmp339);
        return Tree.Sequence(tmp340)
      }
    });
    tmp54 = lambda11;
    tmp55 = Rules.makeInfixChoice(Precedence.Keywords._semicolon, "term", tmp54);
    lambda12 = (undefined, function (lhs, rhs) {
      return Tree.Infix(Precedence.Keywords._leftArrow, lhs, rhs)
    });
    tmp56 = Rules.makeInfixChoice(Precedence.Keywords._leftArrow, "term", lambda12);
    lambda13 = (undefined, function (lhs, rhs) {
      return Tree.Infix(Precedence.Keywords._equalequal, lhs, rhs)
    });
    tmp57 = Rules.makeInfixChoice(Precedence.Keywords._equalequal, "term", lambda13);
    lambda14 = (undefined, function (lhs, rhs) {
      let tmp338, tmp339, tmp340;
      tmp338 = Tree.Ident("*", true);
      tmp339 = Stack.Cons(rhs, Stack.Nil);
      tmp340 = Stack.Cons(lhs, tmp339);
      return Tree.App(tmp338, tmp340)
    });
    tmp58 = lambda14;
    tmp59 = Rules.makeInfixChoice(Precedence.Keywords._asterisk, "term", tmp58);
    tmp60 = ParseRule.Choice.keyword(Precedence.Keywords._period);
    tmp61 = ParseRule.Choice.keyword(Precedence.Keywords._leftRound);
    tmp62 = ParseRule.Choice.keyword(Precedence.Keywords._rightRound);
    tmp63 = runtime.safeCall(tmp62());
    tmp64 = Predef.tuple(tmp63);
    lambda15 = (undefined, function (argument, _) {
      let lambda66;
      lambda66 = (undefined, function (lhs) {
        let tmp338;
        tmp338 = Tree.Bracketed(Token.Round, argument);
        return Tree.Infix(Precedence.Keywords._period, lhs, tmp338)
      });
      return lambda66
    });
    tmp65 = runtime.safeCall(ParseRule.Choice.term({
    "process": lambda15, "name": "application argument", "choices": tmp64
    }));
    tmp66 = runtime.safeCall(tmp61(tmp65));
    lambda16 = (undefined, function (rhs, _) {
      let lambda66;
      lambda66 = (undefined, function (lhs) {
        return Tree.Infix(Precedence.Keywords._period, lhs, rhs)
      });
      return lambda66
    });
    tmp67 = runtime.safeCall(ParseRule.Choice.term({
    "process": lambda16, "name": "operator `.` right-hand side"
    }));
    tmp68 = runtime.safeCall(tmp60(tmp66, tmp67));
    tmp69 = ParseRule.Choice.keyword(Precedence.Keywords._colon);
    lambda17 = (undefined, function (rhs, _) {
      let lambda66;
      lambda66 = (undefined, function (lhs) {
        return Tree.Infix(Precedence.Keywords._colon, lhs, rhs)
      });
      return lambda66
    });
    tmp70 = runtime.safeCall(ParseRule.Choice.typeExpr({
    "process": lambda17, "name": "right-hand side type"
    }));
    tmp71 = runtime.safeCall(tmp69(tmp70));
    lambda18 = (undefined, function (argument, _) {
      let lambda66;
      lambda66 = (undefined, function (callee) {
        return Tree.App(callee, argument)
      });
      return lambda66
    });
    tmp72 = runtime.safeCall(ParseRule.Choice.term({
    "process": lambda18, "name": "application argument", "outerPrec": Precedence.Keywords.appPrec
    }));
    tmp73 = ParseRule.rule("infix rules for expressions", tmp53, tmp55, tmp56, tmp57, tmp59, tmp68, tmp71, tmp72);
    this.termInfixRule = tmp73;
    tmp74 = ParseRule.Choice.keyword(Precedence.Keywords._fun);
    tmp75 = ParseRule.Choice.keyword(Precedence.Keywords._thinArrow);
    lambda19 = (undefined, function (body, _) {
      return body
    });
    tmp76 = runtime.safeCall(ParseRule.Choice.term({
    "process": lambda19, "name": "function body"
    }));
    tmp77 = runtime.safeCall(tmp75(tmp76));
    tmp78 = Predef.tuple(tmp77);
    lambda20 = (undefined, function (params, body) {
      let tmp338;
      tmp338 = Stack.Cons(params, Stack.Nil);
      return Tree.Lambda(tmp338, body)
    });
    tmp79 = runtime.safeCall(ParseRule.Choice.term({
    "process": lambda20, "name": "function parameters", "choices": tmp78
    }));
    tmp80 = runtime.safeCall(tmp74(tmp79));
    tmp81 = ParseRule.Choice.keyword(Precedence.Keywords._match);
    tmp82 = ParseRule.Choice.keyword(Precedence.Keywords._with);
    tmp83 = ParseRule.Choice.keyword(Precedence.Keywords._bar);
    tmp84 = runtime.safeCall(tmp83());
    tmp85 = ParseRule.rule("pattern matching case body", tmp84);
    tmp86 = Rules.getRuleByKind("simple-matching");
    tmp87 = ParseRule.Choice.optional(tmp85, tmp86);
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
    tmp88 = lambda21;
    tmp89 = ParseRule.Choice.map(tmp87, tmp88);
    tmp90 = runtime.safeCall(tmp82(tmp89));
    tmp91 = Predef.tuple(tmp90);
    tmp92 = runtime.safeCall(ParseRule.Choice.term({
    "process": Tree.Match, "name": "pattern matching scrutinee", "choices": tmp91
    }));
    tmp93 = runtime.safeCall(tmp81(tmp92));
    tmp94 = ParseRule.Choice.keyword(Precedence.Keywords._function);
    tmp95 = ParseRule.Choice.keyword(Precedence.Keywords._bar);
    tmp96 = runtime.safeCall(tmp95());
    tmp97 = ParseRule.rule("function body", tmp96);
    tmp98 = Rules.getRuleByKind("simple-matching");
    tmp99 = ParseRule.Choice.optional(tmp97, tmp98);
    tmp100 = runtime.safeCall(tmp94(tmp99));
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
    tmp101 = lambda22;
    tmp102 = ParseRule.Choice.map(tmp100, tmp101);
    tmp103 = ParseRule.Choice.keyword(Precedence.Keywords._if);
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
    tmp104 = lambda23;
    tmp105 = ParseRule.Choice.keyword(Precedence.Keywords._then);
    tmp106 = ParseRule.Choice.end(Option.None);
    tmp107 = ParseRule.Choice.keyword(Precedence.Keywords._else);
    lambda24 = (undefined, function (alt, _) {
      return Option.Some(alt)
    });
    tmp108 = runtime.safeCall(ParseRule.Choice.term({
    "process": lambda24, "name": "if-then-else alternative"
    }));
    tmp109 = runtime.safeCall(tmp107(tmp108));
    tmp110 = Predef.tuple(tmp106, tmp109);
    lambda25 = (undefined, function (con, optAlt) {
      return [
        con,
        optAlt
      ]
    });
    tmp111 = runtime.safeCall(ParseRule.Choice.term({
    "process": lambda25, "name": "if-then-else consequent", "choices": tmp110
    }));
    tmp112 = runtime.safeCall(tmp105(tmp111));
    tmp113 = Predef.tuple(tmp112);
    tmp114 = runtime.safeCall(ParseRule.Choice.term({
    "process": tmp104, "name": "if-then-else condition", "choices": tmp113
    }));
    tmp115 = runtime.safeCall(tmp103(tmp114));
    tmp116 = ParseRule.Choice.keyword(Precedence.Keywords._while);
    tmp117 = ParseRule.Choice.keyword(Precedence.Keywords._do);
    tmp118 = ParseRule.Choice.keyword(Precedence.Keywords._done);
    tmp119 = runtime.safeCall(tmp118());
    tmp120 = Predef.tuple(tmp119);
    lambda26 = (undefined, function (body, _) {
      return body
    });
    tmp121 = runtime.safeCall(ParseRule.Choice.term({
    "name": "while end", "process": lambda26, "choices": tmp120
    }));
    tmp122 = runtime.safeCall(tmp117(tmp121));
    tmp123 = Predef.tuple(tmp122);
    tmp124 = runtime.safeCall(ParseRule.Choice.term({
    "process": Tree.While, "name": "while body", "choices": tmp123
    }));
    tmp125 = runtime.safeCall(tmp116(tmp124));
    tmp126 = ParseRule.Choice.keyword(Precedence.Keywords._for);
    tmp127 = ParseRule.Choice.keyword(Precedence.Keywords._equal);
    tmp128 = ParseRule.Choice.keyword(Precedence.Keywords._to);
    tmp129 = runtime.safeCall(tmp128());
    tmp130 = ParseRule.Choice.keyword(Precedence.Keywords._downto);
    tmp131 = runtime.safeCall(tmp130());
    tmp132 = ParseRule.rule("iteration keyword", tmp129, tmp131);
    tmp133 = ParseRule.Choice.keyword(Precedence.Keywords._do);
    tmp134 = ParseRule.Choice.keyword(Precedence.Keywords._done);
    tmp135 = runtime.safeCall(tmp134());
    tmp136 = Predef.tuple(tmp135);
    lambda27 = (undefined, function (body, _) {
      return body
    });
    tmp137 = runtime.safeCall(ParseRule.Choice.term({
    "name": "`for` `done` keyword", "process": lambda27, "choices": tmp136
    }));
    tmp138 = runtime.safeCall(tmp133(tmp137));
    tmp139 = Predef.tuple(tmp138);
    tmp140 = runtime.safeCall(ParseRule.Choice.term({
    "name": "`for` `do` keyword", "process": Predef.tuple, "choices": tmp139
    }));
    tmp141 = ParseRule.rule("the iteration keyword", tmp140);
    tmp142 = ParseRule.Choice.siding(tmp132, tmp141);
    lambda28 = (undefined, function (caseScrut) {
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
    tmp143 = lambda28;
    tmp144 = ParseRule.Choice.map(tmp142, tmp143);
    tmp145 = Predef.tuple(tmp144);
    lambda29 = (undefined, function (start, endBody) {
      return [
        start,
        ...endBody
      ]
    });
    tmp146 = runtime.safeCall(ParseRule.Choice.term({
    "process": lambda29, "name": "`for` `to` or `downto` keyword", "choices": tmp145
    }));
    tmp147 = runtime.safeCall(tmp127(tmp146));
    tmp148 = Predef.tuple(tmp147);
    lambda30 = (undefined, function (head, startEndBody) {
      return Tree.For(head, ...startEndBody)
    });
    tmp149 = runtime.safeCall(ParseRule.Choice.term({
    "name": "`for` head", "process": lambda30, "choices": tmp148
    }));
    tmp150 = runtime.safeCall(tmp126(tmp149));
    lambda31 = (undefined, function (tree) {
      if (tree instanceof Tree.Empty.class) {
        return Tree.Tuple(Stack.Nil)
      } else {
        return tree
      }
    });
    tmp151 = Rules.makeBracketRule({
    "opening": Precedence.Keywords._leftRound, "closing": Precedence.Keywords._rightRound, "contentKind": "term", "wrapContent": lambda31
    });
    lambda32 = (undefined, function (tree) {
      let tmp338;
      if (tree instanceof Tree.Empty.class) {
        tmp338 = Tree.Sequence(Stack.Nil);
      } else {
        tmp338 = tree;
      }
      return Tree.Bracketed(Token.Square, tmp338)
    });
    tmp152 = lambda32;
    tmp153 = Rules.makeBracketRule({
    "opening": Precedence.Keywords._leftSquare, "closing": Precedence.Keywords._rightSquare, "contentKind": "term", "wrapContent": tmp152
    });
    tmp154 = Rules.makeBracketRule({
    "opening": Precedence.Keywords._leftCurly, "closing": Precedence.Keywords._rightCurly, "contentKind": "term", "wrapContent": Predef.id
    });
    lambda33 = (undefined, function (tree) {
      if (tree instanceof Tree.Empty.class) {
        return Tree.Sequence(Stack.Nil)
      } else {
        return tree
      }
    });
    tmp155 = Rules.makeBracketRule({
    "opening": Precedence.Keywords._begin, "closing": Precedence.Keywords._end, "contentKind": "term", "wrapContent": lambda33
    });
    lambda34 = (undefined, function (lhs, compose) {
      return runtime.safeCall(compose(lhs))
    });
    tmp156 = ParseRule.Choice.Ref("term", lambda34, Option.None, Option.None, Rules.termInfixRule);
    tmp157 = ParseRule.rule("prefix rules for expressions", Rules.#letExpression, tmp80, tmp93, tmp102, tmp115, tmp125, tmp150, tmp151, tmp153, tmp154, tmp155, tmp156);
    this.termRule = tmp157;
    lambda35 = (undefined, function (lhs, rhs) {
      return Tree.Infix(Precedence.Keywords._thinArrow, lhs, rhs)
    });
    tmp158 = Rules.makeInfixChoice(Precedence.Keywords._thinArrow, "type", lambda35);
    lambda36 = (undefined, function (lhs, rhs) {
      return Tree.Infix(Precedence.Keywords._asterisk, lhs, rhs)
    });
    tmp159 = Rules.makeInfixChoice(Precedence.Keywords._asterisk, "type", lambda36);
    tmp160 = Option.Some(Precedence.Keywords.appPrec);
    tmp161 = ParseRule.rule("end of type infix rules");
    lambda37 = (undefined, function (callee, _) {
      let lambda66;
      lambda66 = (undefined, function (argument) {
        return Tree.App(callee, argument)
      });
      return lambda66
    });
    tmp162 = ParseRule.Choice.Ref("type", lambda37, tmp160, Option.None, tmp161);
    tmp163 = ParseRule.rule("infix rules for types", tmp158, tmp159, tmp162);
    this.typeInfixRule = tmp163;
    tmp164 = ParseRule.Choice.keyword(Precedence.Keywords._leftRound);
    tmp165 = ParseRule.Choice.reference("type");
    lambda38 = (undefined, function (headArg, tailArgsCtor) {
      let param0, ctor, first1, first0, tailArgs, ctor1, tmp338, tmp339;
      if (globalThis.Array.isArray(tailArgsCtor) && tailArgsCtor.length === 2) {
        first0 = tailArgsCtor[0];
        first1 = tailArgsCtor[1];
        tailArgs = first0;
        ctor1 = first1;
        tmp338 = Stack.Cons(headArg, tailArgs);
        tmp339 = Tree.Tuple(tmp338);
        return Tree.App(ctor1, tmp339)
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
    tmp166 = lambda38;
    tmp167 = ParseRule.Choice.reference("type-arguments-tail");
    tmp168 = ParseRule.Choice.keyword(Precedence.Keywords._rightRound);
    tmp169 = ParseRule.Choice.reference("ident");
    lambda39 = (undefined, function (ident, _) {
      return Option.Some(ident)
    });
    tmp170 = runtime.safeCall(tmp169({
    "process": lambda39, "name": "the type constructor's name"
    }));
    tmp171 = runtime.safeCall(tmp168(tmp170));
    tmp172 = Predef.tuple(tmp171);
    lambda40 = (undefined, function (args, ident) {
      return [
        args,
        ident
      ]
    });
    tmp173 = runtime.safeCall(tmp167({
    "process": lambda40, "name": "the remaining type arguments", "choices": tmp172
    }));
    tmp174 = ParseRule.Choice.keyword(Precedence.Keywords._rightRound);
    tmp175 = ParseRule.Choice.end(Option.None);
    tmp176 = ParseRule.Choice.reference("ident");
    lambda41 = (undefined, function (ident, _) {
      return Option.Some(ident)
    });
    tmp177 = runtime.safeCall(tmp176({
    "process": lambda41, "name": "the type constructor's name"
    }));
    tmp178 = runtime.safeCall(tmp174(tmp175, tmp177));
    tmp179 = Predef.tuple(tmp173, tmp178);
    tmp180 = runtime.safeCall(tmp165({
    "process": tmp166, "name": "the first type in the parentheses", "choices": tmp179
    }));
    tmp181 = runtime.safeCall(tmp164(tmp180));
    tmp182 = ParseRule.Choice.reference("type");
    lambda42 = (undefined, function (lhs, compose) {
      return runtime.safeCall(compose(lhs))
    });
    tmp183 = runtime.safeCall(tmp182({
    "process": lambda42, "choices": Rules.typeInfixRule
    }));
    tmp184 = ParseRule.rule("rules for types", tmp181, tmp183);
    this.typeRule = tmp184;
    tmp185 = Rules.define("type-arguments-tail");
    tmp186 = ParseRule.Choice.keyword(Precedence.Keywords._comma);
    tmp187 = ParseRule.Choice.reference("type");
    tmp188 = ParseRule.Choice.end(Stack.Nil);
    tmp189 = ParseRule.Choice.reference("type-arguments-tail");
    lambda43 = (undefined, function (tail, _) {
      return tail
    });
    tmp190 = runtime.safeCall(tmp189({
    "process": lambda43, "name": "more type arguments"
    }));
    tmp191 = Predef.tuple(tmp188, tmp190);
    tmp192 = runtime.safeCall(tmp187({
    "process": Stack.Cons, "name": "the first type argument", "choices": tmp191
    }));
    tmp193 = runtime.safeCall(tmp186(tmp192));
    tmp194 = runtime.safeCall(tmp185(tmp193));
    tmp195 = Rules.define("constr-decl");
    tmp196 = ParseRule.Choice.reference("ident");
    lambda44 = (undefined, function (ctor, argOpt) {
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
    tmp197 = lambda44;
    tmp198 = ParseRule.Choice.end(Option.None);
    tmp199 = ParseRule.Choice.keyword(Precedence.Keywords._of);
    tmp200 = ParseRule.Choice.reference("type");
    lambda45 = (undefined, function (argument, _) {
      return Option.Some(argument)
    });
    tmp201 = runtime.safeCall(tmp200({
    "process": lambda45, "name": "the variant constructor's argument"
    }));
    tmp202 = runtime.safeCall(tmp199(tmp201));
    tmp203 = Predef.tuple(tmp198, tmp202);
    tmp204 = runtime.safeCall(tmp196({
    "process": tmp197, "name": "the variant constructor's name", "choices": tmp203
    }));
    tmp205 = runtime.safeCall(tmp195(tmp204));
    tmp206 = Rules.define("variants");
    tmp207 = ParseRule.Choice.reference("constr-decl");
    lambda46 = (undefined, function (lhs, rhsOpt) {
      let param0, rhs;
      if (rhsOpt instanceof Option.Some.class) {
        param0 = rhsOpt.value;
        rhs = param0;
        return Tree.Infix(Precedence.Keywords._bar, lhs, rhs)
      } else {
        return lhs
      }
    });
    tmp208 = lambda46;
    tmp209 = ParseRule.Choice.end(Option.None);
    tmp210 = ParseRule.Choice.keyword(Precedence.Keywords._bar);
    tmp211 = ParseRule.Choice.reference("variants");
    lambda47 = (undefined, function (more, _) {
      return Option.Some(more)
    });
    tmp212 = runtime.safeCall(tmp211({
    "process": lambda47, "name": "variants end"
    }));
    tmp213 = runtime.safeCall(tmp210(tmp212));
    tmp214 = Predef.tuple(tmp209, tmp213);
    tmp215 = runtime.safeCall(tmp207({
    "process": tmp208, "name": "variants item", "choices": tmp214
    }));
    tmp216 = runtime.safeCall(tmp206(tmp215));
    tmp217 = Rules.define("typedefs");
    tmp218 = ParseRule.Choice.reference("typedef-lhs");
    lambda48 = (undefined, function (lhs, rhsMore) {
      let first1, first0, rhs, more, tmp338;
      if (globalThis.Array.isArray(rhsMore) && rhsMore.length === 2) {
        first0 = rhsMore[0];
        first1 = rhsMore[1];
        rhs = first0;
        more = first1;
        tmp338 = runtime.safeCall(rhs(lhs));
        return Stack.Cons(tmp338, more)
      } else {
        throw new globalThis.Error("match error");
      }
    });
    tmp219 = lambda48;
    tmp220 = ParseRule.Choice.reference("typedef-rhs");
    tmp221 = ParseRule.Choice.end(Stack.Nil);
    tmp222 = ParseRule.Choice.keyword(Precedence.Keywords._and);
    tmp223 = ParseRule.Choice.reference("typedefs");
    lambda49 = (undefined, function (more, _) {
      return more
    });
    tmp224 = runtime.safeCall(tmp223({
    "process": lambda49, "name": "typedef end"
    }));
    tmp225 = runtime.safeCall(tmp222(tmp224));
    tmp226 = Predef.tuple(tmp221, tmp225);
    tmp227 = runtime.safeCall(tmp220({
    "name": "typedef body", "choices": tmp226
    }));
    tmp228 = Predef.tuple(tmp227);
    tmp229 = runtime.safeCall(tmp218({
    "process": tmp219, "name": "typedef name", "choices": tmp228
    }));
    tmp230 = runtime.safeCall(tmp217(tmp229));
    tmp231 = Rules.define("typedef-rhs");
    tmp232 = ParseRule.Choice.keyword(Precedence.Keywords._equal);
    tmp233 = ParseRule.Choice.reference("variants");
    lambda50 = (undefined, function (rhs, _) {
      let lambda66;
      lambda66 = (undefined, function (lhs) {
        return Tree.Infix(Precedence.Keywords._equal, lhs, rhs)
      });
      return lambda66
    });
    tmp234 = runtime.safeCall(tmp233({
    "process": lambda50, "name": "typedef-rhs: variants"
    }));
    tmp235 = ParseRule.Choice.keyword(Precedence.Keywords._leftCurly);
    tmp236 = ParseRule.Choice.reference("label-decls");
    lambda51 = (undefined, function (content, _) {
      let tmp338, tmp339;
      if (content instanceof Stack.Nil.class) {
        tmp338 = Tree.Sequence(Stack.Nil);
        return Tree.Bracketed(Token.Curly, tmp338)
      } else {
        tmp339 = Tree.Sequence(content);
        return Tree.Bracketed(Token.Curly, tmp339)
      }
    });
    tmp237 = lambda51;
    tmp238 = ParseRule.Choice.keyword(Precedence.Keywords._rightCurly);
    tmp239 = ParseRule.Choice.end(Tree.empty);
    tmp240 = runtime.safeCall(tmp238(tmp239));
    tmp241 = Predef.tuple(tmp240);
    tmp242 = runtime.safeCall(tmp236({
    "process": tmp237, "name": "label-decl", "choices": tmp241
    }));
    tmp243 = runtime.safeCall(tmp235(tmp242));
    lambda52 = (undefined, function (rhs) {
      let lambda66;
      lambda66 = (undefined, function (lhs) {
        return Tree.Infix(Precedence.Keywords._equal, lhs, rhs)
      });
      return lambda66
    });
    tmp244 = ParseRule.Choice.map(tmp243, lambda52);
    tmp245 = runtime.safeCall(tmp232(tmp234, tmp244));
    tmp246 = runtime.safeCall(tmp231(tmp245));
    tmp247 = Rules.define("typedef-rhs");
    tmp248 = ParseRule.Choice.keyword(Precedence.Keywords._equalequal);
    tmp249 = ParseRule.Choice.reference("type");
    lambda53 = (undefined, function (rhs, _) {
      let lambda66;
      lambda66 = (undefined, function (lhs) {
        return Tree.Infix(Precedence.Keywords._equalequal, lhs, rhs)
      });
      return lambda66
    });
    tmp250 = runtime.safeCall(tmp249({
    "process": lambda53, "name": "type alias body"
    }));
    tmp251 = runtime.safeCall(tmp248(tmp250));
    tmp252 = runtime.safeCall(tmp247(tmp251));
    tmp253 = Rules.define("label-decl");
    tmp254 = Tree.infix(Precedence.Keywords._colon);
    tmp255 = ParseRule.Choice.keyword(Precedence.Keywords._colon);
    lambda54 = (undefined, function (rhs, _) {
      return rhs
    });
    tmp256 = runtime.safeCall(ParseRule.Choice.typeExpr({
    "process": lambda54, "name": "label-decl body"
    }));
    tmp257 = runtime.safeCall(tmp255(tmp256));
    tmp258 = Predef.tuple(tmp257);
    tmp259 = runtime.safeCall(ParseRule.Choice.typeExpr({
    "process": tmp254, "name": "label-decl name", "choices": tmp258
    }));
    tmp260 = runtime.safeCall(tmp253(tmp259));
    tmp261 = Rules.define("label-decls");
    tmp262 = ParseRule.Choice.reference("label-decl");
    tmp263 = ParseRule.Choice.end(Stack.Nil);
    tmp264 = ParseRule.Choice.keyword(Precedence.Keywords._semicolon);
    tmp265 = ParseRule.Choice.reference("label-decls");
    lambda55 = (undefined, function (more, _) {
      return more
    });
    tmp266 = runtime.safeCall(tmp265({
    "process": lambda55, "name": "more label-decls"
    }));
    tmp267 = runtime.safeCall(tmp264(tmp266));
    tmp268 = Predef.tuple(tmp263, tmp267);
    tmp269 = runtime.safeCall(tmp262({
    "process": Stack.Cons, "name": "the first label-decl", "choices": tmp268
    }));
    tmp270 = runtime.safeCall(tmp261(tmp269));
    tmp271 = Rules.define("constr-decls");
    tmp272 = ParseRule.Choice.reference("constr-decl");
    tmp273 = ParseRule.Choice.end(Stack.Nil);
    tmp274 = ParseRule.Choice.keyword(Precedence.Keywords._bar);
    tmp275 = ParseRule.Choice.reference("constr-decls");
    lambda56 = (undefined, function (tail, _) {
      return tail
    });
    tmp276 = runtime.safeCall(tmp275({
    "process": lambda56, "name": "more constructor declarations"
    }));
    tmp277 = runtime.safeCall(tmp274(tmp276));
    tmp278 = Predef.tuple(tmp273, tmp277);
    tmp279 = runtime.safeCall(tmp272({
    "process": Stack.Cons, "name": "the first constructor declaration", "choices": tmp278
    }));
    tmp280 = runtime.safeCall(tmp271(tmp279));
    tmp281 = Rules.define("typedef-lhs");
    tmp282 = ParseRule.Choice.reference("type-params");
    lambda57 = (undefined, function (params, ident) {
      let tmp338;
      if (params instanceof Stack.Nil.class) {
        return ident
      } else {
        tmp338 = Tree.Tuple(params);
        return Tree.App(ident, tmp338)
      }
    });
    tmp283 = lambda57;
    tmp284 = ParseRule.Choice.reference("ident");
    lambda58 = (undefined, function (ident, _) {
      return ident
    });
    tmp285 = runtime.safeCall(tmp284({
    "process": lambda58, "name": "the type identifier"
    }));
    tmp286 = Predef.tuple(tmp285);
    tmp287 = runtime.safeCall(tmp282({
    "process": tmp283, "name": "the type parameters", "choices": tmp286
    }));
    tmp288 = runtime.safeCall(tmp281(tmp287));
    tmp289 = Rules.define("type-params");
    tmp290 = ParseRule.Choice.reference("typevar");
    lambda59 = (undefined, function (head, _) {
      return Stack.Cons(head, Stack.Nil)
    });
    tmp291 = runtime.safeCall(tmp290({
    "process": lambda59, "name": "the only type parameter"
    }));
    tmp292 = runtime.safeCall(tmp289(tmp291));
    tmp293 = Rules.define("type-params");
    tmp294 = ParseRule.Choice.keyword(Precedence.Keywords._leftRound);
    tmp295 = ParseRule.Choice.reference("typevar");
    tmp296 = ParseRule.Choice.reference("type-params-tail");
    tmp297 = ParseRule.Choice.keyword(Precedence.Keywords._rightRound);
    tmp298 = runtime.safeCall(tmp297());
    tmp299 = Predef.tuple(tmp298);
    lambda60 = (undefined, function (tail, _) {
      return tail
    });
    tmp300 = runtime.safeCall(tmp296({
    "process": lambda60, "name": "more type parameters", "choices": tmp299
    }));
    tmp301 = Predef.tuple(tmp300);
    tmp302 = runtime.safeCall(tmp295({
    "process": Stack.Cons, "name": "the first type parameter", "choices": tmp301
    }));
    tmp303 = runtime.safeCall(tmp294(tmp302));
    tmp304 = runtime.safeCall(tmp293(tmp303));
    tmp305 = Rules.define("type-params");
    tmp306 = ParseRule.Choice.end(Stack.Nil);
    tmp307 = runtime.safeCall(tmp305(tmp306));
    tmp308 = Rules.define("type-params-tail");
    tmp309 = ParseRule.Choice.end(Stack.Nil);
    tmp310 = runtime.safeCall(tmp308(tmp309));
    tmp311 = Rules.define("type-params-tail");
    tmp312 = ParseRule.Choice.keyword(Precedence.Keywords._comma);
    tmp313 = ParseRule.Choice.reference("typevar");
    tmp314 = ParseRule.Choice.reference("type-params-tail");
    lambda61 = (undefined, function (tail, _) {
      return tail
    });
    tmp315 = runtime.safeCall(tmp314({
    "process": lambda61, "name": "more type parameters"
    }));
    tmp316 = Predef.tuple(tmp315);
    tmp317 = runtime.safeCall(tmp313({
    "process": Stack.Cons, "name": "the first type parameter", "choices": tmp316
    }));
    tmp318 = runtime.safeCall(tmp312(tmp317));
    tmp319 = runtime.safeCall(tmp311(tmp318));
    tmp320 = Rules.makeLetBindings(false);
    tmp321 = ParseRule.Choice.keyword(Precedence.Keywords._type);
    tmp322 = ParseRule.Choice.reference("typedefs");
    lambda62 = (undefined, function (typedefs, _) {
      return Tree.Define(Tree.DefineKind.Type, typedefs)
    });
    tmp323 = runtime.safeCall(tmp322({
    "process": lambda62, "name": "more typedefs"
    }));
    tmp324 = runtime.safeCall(tmp321(tmp323));
    tmp325 = ParseRule.Choice.keyword(Precedence.Keywords._exception);
    tmp326 = ParseRule.Choice.reference("constr-decls");
    lambda63 = (undefined, function (decls, _) {
      return Tree.Define(Tree.DefineKind.Exception, decls)
    });
    tmp327 = runtime.safeCall(tmp326({
    "process": lambda63, "name": "constructor declarations"
    }));
    tmp328 = runtime.safeCall(tmp325(tmp327));
    tmp329 = ParseRule.Choice.keyword(Precedence.Keywords._hash);
    tmp330 = ParseRule.Choice.reference("ident");
    lambda64 = (undefined, function (body, _) {
      return body
    });
    tmp331 = runtime.safeCall(ParseRule.Choice.term({
    "process": lambda64, "name": "directive body"
    }));
    tmp332 = Predef.tuple(tmp331);
    lambda65 = (undefined, function (ident, body) {
      let tmp338;
      tmp338 = Stack.Cons([
        ident,
        body
      ], Stack.Nil);
      return Tree.Define(Tree.DefineKind.Directive, tmp338)
    });
    tmp333 = runtime.safeCall(tmp330({
    "process": lambda65, "name": "directive name", "choices": tmp332
    }));
    tmp334 = runtime.safeCall(tmp329(tmp333));
    tmp335 = ParseRule.rule("prefix rules for module items", tmp320, tmp324, tmp328, tmp334);
    this.declRule = tmp335;
    tmp336 = Rules.syntaxKinds.insert("term", Rules.termRule);
    tmp337 = Rules.syntaxKinds.insert("type", Rules.typeRule);
    Rules.syntaxKinds.insert("decl", Rules.declRule)
  }
  static getRuleByKind(kind) {
    let tmp;
    tmp = runtime.safeCall(Rules.syntaxKinds.get(kind));
    return Option.unsafe.get(tmp)
  } 
  static define(name) {
    return (...choices) => {
      let tmp, tmp1, lambda;
      tmp = runtime.safeCall(Rules.syntaxKinds.updateWith(name));
      lambda = (undefined, function (caseScrut) {
        let param0, rule, tmp2, tmp3, tmp4;
        if (caseScrut instanceof Option.None.class) {
          tmp2 = ParseRule.rule(name, ...choices);
          return Option.Some(tmp2)
        } else if (caseScrut instanceof Option.Some.class) {
          param0 = caseScrut.value;
          rule = param0;
          tmp3 = Iter.toStack(choices);
          tmp4 = runtime.safeCall(rule.extendChoices(tmp3));
          return Option.Some(tmp4)
        } else {
          throw new globalThis.Error("match error");
        }
      });
      tmp1 = lambda;
      return runtime.safeCall(tmp(tmp1))
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
      tmp9 = runtime.safeCall(ParseRule.Choice.term({
      "process": lambda, "name": tmp8
      }));
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
  static makeBracketRule(fields) {
    let tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, lambda;
    tmp = ParseRule.Choice.keyword(fields.opening);
    tmp1 = ParseRule.Choice.reference(fields.contentKind);
    lambda = (undefined, function (tree, end) {
      let param0, param1, msg, tmp9;
      if (end instanceof Tree.Error.class) {
        param0 = end.tree;
        param1 = end.message;
        if (param0 instanceof Tree.Empty.class) {
          msg = param1;
          tmp9 = runtime.safeCall(fields.wrapContent(tree));
          return Tree.Error(tmp9, msg)
        } else {
          throw new globalThis.Error("match error");
        }
      } else if (end instanceof Tree.Empty.class) {
        return runtime.safeCall(fields.wrapContent(tree))
      } else {
        throw new globalThis.Error("match error");
      }
    });
    tmp2 = lambda;
    tmp3 = fields.contentKind + " in bracket";
    tmp4 = ParseRule.Choice.keyword(fields.closing);
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
