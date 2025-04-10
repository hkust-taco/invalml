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
    let tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20, tmp21, tmp22, tmp23, tmp24, tmp25, tmp26, tmp27, tmp28, tmp29, tmp30, tmp31, tmp32, tmp33, tmp34, tmp35, tmp36, tmp37, tmp38, tmp39, tmp40, tmp41, tmp42, tmp43, tmp44, tmp45, tmp46, tmp47, tmp48, tmp49, tmp50, tmp51, tmp52, tmp53, tmp54, tmp55, tmp56, tmp57, tmp58, tmp59, tmp60, tmp61, tmp62, tmp63, tmp64, tmp65, tmp66, tmp67, tmp68, tmp69, tmp70, tmp71, tmp72, tmp73, tmp74, tmp75, tmp76, tmp77, tmp78, tmp79, tmp80, tmp81, tmp82, tmp83, tmp84, tmp85, tmp86, tmp87, tmp88, tmp89, tmp90, tmp91, tmp92, tmp93, tmp94, tmp95, tmp96, tmp97, tmp98, tmp99, tmp100, tmp101, tmp102, tmp103, tmp104, tmp105, tmp106, tmp107, tmp108, tmp109, tmp110, tmp111, tmp112, tmp113, tmp114, tmp115, tmp116, tmp117, tmp118, tmp119, tmp120, tmp121, tmp122, tmp123, tmp124, tmp125, tmp126, tmp127, tmp128, tmp129, tmp130, tmp131, tmp132, tmp133, tmp134, tmp135, tmp136, tmp137, tmp138, tmp139, tmp140, tmp141, tmp142, tmp143, tmp144, tmp145, tmp146, tmp147, tmp148, tmp149, tmp150, tmp151, tmp152, tmp153, tmp154, tmp155, tmp156, tmp157, tmp158, tmp159, tmp160, tmp161, tmp162, tmp163, tmp164, tmp165, tmp166, tmp167, tmp168, tmp169, tmp170, tmp171, tmp172, tmp173, tmp174, tmp175, tmp176, tmp177, tmp178, tmp179, tmp180, tmp181, tmp182, tmp183, tmp184, tmp185, tmp186, tmp187, tmp188, tmp189, tmp190, tmp191, tmp192, tmp193, tmp194, tmp195, tmp196, tmp197, tmp198, tmp199, tmp200, tmp201, tmp202, tmp203, tmp204, tmp205, tmp206, tmp207, tmp208, tmp209, tmp210, tmp211, tmp212, tmp213, tmp214, tmp215, tmp216, tmp217, tmp218, tmp219, tmp220, tmp221, tmp222, tmp223, tmp224, tmp225, tmp226, tmp227, tmp228, tmp229, tmp230, tmp231, tmp232, tmp233, tmp234, tmp235, tmp236, tmp237, tmp238, tmp239, tmp240, tmp241, tmp242, tmp243, tmp244, tmp245, tmp246, tmp247, tmp248, tmp249, tmp250, tmp251, tmp252, tmp253, tmp254, tmp255, tmp256, tmp257, tmp258, tmp259, tmp260, tmp261, tmp262, tmp263, tmp264, tmp265, tmp266, tmp267, tmp268, tmp269, tmp270, tmp271, tmp272, tmp273, tmp274, tmp275, tmp276, tmp277, tmp278, tmp279, tmp280, tmp281, tmp282, tmp283, tmp284, tmp285, tmp286, tmp287, tmp288, tmp289, tmp290, tmp291, tmp292, tmp293, tmp294, lambda, lambda1, lambda2, lambda3, lambda4, lambda5, lambda6, lambda7, lambda8, lambda9, lambda10, lambda11, lambda12, lambda13, lambda14, lambda15, lambda16, lambda17, lambda18, lambda19, lambda20, lambda21, lambda22, lambda23, lambda24, lambda25, lambda26, lambda27, lambda28, lambda29, lambda30, lambda31, lambda32, lambda33, lambda34, lambda35;
    tmp = new BetterMap.Map();
    this.syntaxKinds = tmp;
    tmp1 = new globalThis.Set();
    this.extendedKinds = tmp1;
    tmp2 = Rules.define("let-bindings");
    lambda = (undefined, function (lhs, rhsBindings) {
      let first1, first0, rhs, bindings, tmp295;
      if (globalThis.Array.isArray(rhsBindings) && rhsBindings.length === 2) {
        first0 = rhsBindings[0];
        first1 = rhsBindings[1];
        rhs = first0;
        bindings = first1;
        tmp295 = Tree.Infix(Precedence.Keywords._equal, lhs, rhs);
        return Stack.Cons(tmp295, bindings)
      } else {
        throw new globalThis.Error("match error");
      }
    });
    tmp3 = lambda;
    tmp4 = ParseRule.Choice.keyword(Precedence.Keywords._equal);
    tmp5 = ParseRule.Choice.end(Stack.Nil);
    tmp6 = ParseRule.Choice.keyword(Precedence.Keywords._and);
    tmp7 = ParseRule.Choice.reference("let-bindings");
    tmp8 = runtime.safeCall(tmp7({
    "process": Rules.idFirst, "name": "let-bindings tail"
    }));
    tmp9 = runtime.safeCall(tmp6(tmp8));
    tmp10 = Predef.tuple(tmp5, tmp9);
    tmp11 = runtime.safeCall(ParseRule.Choice.term({
    "name": "right-hand side", "choices": tmp10
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
    lambda1 = (undefined, function (lhs, rhsTail) {
      let first1, first0, rhs, tail, tmp295;
      if (globalThis.Array.isArray(rhsTail) && rhsTail.length === 2) {
        first0 = rhsTail[0];
        first1 = rhsTail[1];
        rhs = first0;
        tail = first1;
        tmp295 = Tree.Infix(Precedence.Keywords._thinArrow, lhs, rhs);
        return Stack.Cons(tmp295, tail)
      } else {
        throw new globalThis.Error("match error");
      }
    });
    tmp18 = lambda1;
    tmp19 = ParseRule.Choice.keyword(Precedence.Keywords._thinArrow);
    tmp20 = ParseRule.Choice.end(Stack.Nil);
    tmp21 = ParseRule.Choice.keyword(Precedence.Keywords._bar);
    tmp22 = ParseRule.Choice.reference("simple-matching");
    tmp23 = runtime.safeCall(tmp22({
    "process": Rules.idFirst, "name": "simple-matching tail"
    }));
    tmp24 = runtime.safeCall(tmp21(tmp23));
    tmp25 = Predef.tuple(tmp20, tmp24);
    tmp26 = runtime.safeCall(ParseRule.Choice.term({
    "name": "rhs", "choices": tmp25
    }));
    tmp27 = runtime.safeCall(tmp19(tmp26));
    tmp28 = Predef.tuple(tmp27);
    tmp29 = runtime.safeCall(ParseRule.Choice.term({
    "process": tmp18, "name": "pattern", "choices": tmp28
    }));
    tmp30 = runtime.safeCall(tmp17(tmp29));
    tmp31 = Rules.define("pattern-list");
    tmp32 = ParseRule.Choice.reference("pattern-list");
    tmp33 = runtime.safeCall(tmp32({
    "process": Rules.idFirst, "name": "pattern list tail"
    }));
    tmp34 = Predef.tuple(tmp33);
    lambda2 = (undefined, function (head, tail) {
      return Stack.Cons(head, tail)
    });
    tmp35 = runtime.safeCall(ParseRule.Choice.term({
    "process": lambda2, "name": "pattern", "choices": tmp34
    }));
    tmp36 = runtime.safeCall(tmp31(tmp35));
    tmp37 = Rules.define("multiple-matching");
    tmp38 = ParseRule.Choice.reference("pattern-list");
    tmp39 = Tree.infix(Precedence.Keywords._thinArrow);
    tmp40 = ParseRule.Choice.keyword(Precedence.Keywords._thinArrow);
    tmp41 = ParseRule.Choice.end(Stack.Nil);
    tmp42 = ParseRule.Choice.keyword(Precedence.Keywords._bar);
    tmp43 = ParseRule.Choice.reference("multiple-matching");
    tmp44 = runtime.safeCall(tmp43({
    "process": Rules.idFirst, "name": "multiple-matching tail"
    }));
    tmp45 = runtime.safeCall(tmp42(tmp44));
    tmp46 = Predef.tuple(tmp41, tmp45);
    tmp47 = runtime.safeCall(ParseRule.Choice.term({
    "process": Rules.idFirst, "name": "the right-hand side of the arrow", "choices": tmp46
    }));
    tmp48 = runtime.safeCall(tmp40(tmp47));
    tmp49 = Predef.tuple(tmp48);
    tmp50 = runtime.safeCall(tmp38({
    "process": tmp39, "name": "the list of patterns", "choices": tmp49
    }));
    tmp51 = runtime.safeCall(tmp37(tmp50));
    lambda3 = (undefined, function (lhs, rhs) {
      let param0, tail, tmp295, tmp296, tmp297;
      if (rhs instanceof Tree.Tuple.class) {
        param0 = rhs.trees;
        tail = param0;
        tmp295 = Stack.Cons(lhs, tail);
        return Tree.Tuple(tmp295)
      } else {
        tmp296 = Stack.Cons(rhs, Stack.Nil);
        tmp297 = Stack.Cons(lhs, tmp296);
        return Tree.Tuple(tmp297)
      }
    });
    tmp52 = lambda3;
    tmp53 = Rules.makeInfixChoice(Precedence.Keywords._comma, "term", tmp52);
    lambda4 = (undefined, function (lhs, rhs) {
      let param0, tail, tmp295, tmp296, tmp297;
      if (rhs instanceof Tree.Sequence.class) {
        param0 = rhs.trees;
        tail = param0;
        tmp295 = Stack.Cons(lhs, tail);
        return Tree.Sequence(tmp295)
      } else {
        tmp296 = Stack.Cons(rhs, Stack.Nil);
        tmp297 = Stack.Cons(lhs, tmp296);
        return Tree.Sequence(tmp297)
      }
    });
    tmp54 = lambda4;
    tmp55 = Rules.makeInfixChoice(Precedence.Keywords._semicolon, "term", tmp54);
    lambda5 = (undefined, function (lhs, rhs) {
      return Tree.Infix(Precedence.Keywords._leftArrow, lhs, rhs)
    });
    tmp56 = Rules.makeInfixChoice(Precedence.Keywords._leftArrow, "term", lambda5);
    lambda6 = (undefined, function (lhs, rhs) {
      return Tree.Infix(Precedence.Keywords._equalequal, lhs, rhs)
    });
    tmp57 = Rules.makeInfixChoice(Precedence.Keywords._equalequal, "term", lambda6);
    lambda7 = (undefined, function (lhs, rhs) {
      let tmp295, tmp296, tmp297;
      tmp295 = Tree.Ident("*", true);
      tmp296 = Stack.Cons(rhs, Stack.Nil);
      tmp297 = Stack.Cons(lhs, tmp296);
      return Tree.App(tmp295, tmp297)
    });
    tmp58 = lambda7;
    tmp59 = Rules.makeInfixChoice(Precedence.Keywords._asterisk, "term", tmp58);
    tmp60 = ParseRule.Choice.keyword(Precedence.Keywords._period);
    tmp61 = ParseRule.Choice.keyword(Precedence.Keywords._leftRound);
    tmp62 = ParseRule.Choice.keyword(Precedence.Keywords._rightRound);
    tmp63 = runtime.safeCall(tmp62());
    tmp64 = Predef.tuple(tmp63);
    lambda8 = (undefined, function (argument, _) {
      let lambda36;
      lambda36 = (undefined, function (lhs) {
        let tmp295;
        tmp295 = Tree.Bracketed(Token.Round, argument);
        return Tree.Infix(Precedence.Keywords._period, lhs, tmp295)
      });
      return lambda36
    });
    tmp65 = runtime.safeCall(ParseRule.Choice.term({
    "process": lambda8, "name": "application argument", "choices": tmp64
    }));
    tmp66 = runtime.safeCall(tmp61(tmp65));
    lambda9 = (undefined, function (rhs, _) {
      let lambda36;
      lambda36 = (undefined, function (lhs) {
        return Tree.Infix(Precedence.Keywords._period, lhs, rhs)
      });
      return lambda36
    });
    tmp67 = runtime.safeCall(ParseRule.Choice.term({
    "process": lambda9, "name": "operator `.` right-hand side"
    }));
    tmp68 = runtime.safeCall(tmp60(tmp66, tmp67));
    tmp69 = ParseRule.Choice.keyword(Precedence.Keywords._colon);
    lambda10 = (undefined, function (rhs, _) {
      let lambda36;
      lambda36 = (undefined, function (lhs) {
        return Tree.Infix(Precedence.Keywords._colon, lhs, rhs)
      });
      return lambda36
    });
    tmp70 = runtime.safeCall(ParseRule.Choice.typeExpr({
    "process": lambda10, "name": "right-hand side type"
    }));
    tmp71 = runtime.safeCall(tmp69(tmp70));
    lambda11 = (undefined, function (argument, _) {
      let lambda36;
      lambda36 = (undefined, function (callee) {
        return Tree.App(callee, argument)
      });
      return lambda36
    });
    tmp72 = runtime.safeCall(ParseRule.Choice.term({
    "process": lambda11, "name": "application argument", "outerPrec": Precedence.Keywords.appPrec
    }));
    tmp73 = ParseRule.rule("infix rules for expressions", tmp53, tmp55, tmp56, tmp57, tmp59, tmp68, tmp71, tmp72);
    this.termInfixRule = tmp73;
    tmp74 = ParseRule.Choice.keyword(Precedence.Keywords._fun);
    tmp75 = ParseRule.Choice.keyword(Precedence.Keywords._thinArrow);
    tmp76 = runtime.safeCall(ParseRule.Choice.term({
    "process": Rules.idFirst, "name": "function body"
    }));
    tmp77 = runtime.safeCall(tmp75(tmp76));
    tmp78 = Predef.tuple(tmp77);
    lambda12 = (undefined, function (params, body) {
      let tmp295;
      tmp295 = Stack.Cons(params, Stack.Nil);
      return Tree.Lambda(tmp295, body)
    });
    tmp79 = runtime.safeCall(ParseRule.Choice.term({
    "process": lambda12, "name": "function parameters", "choices": tmp78
    }));
    tmp80 = runtime.safeCall(tmp74(tmp79));
    tmp81 = ParseRule.Choice.keyword(Precedence.Keywords._match);
    tmp82 = ParseRule.Choice.keyword(Precedence.Keywords._with);
    tmp83 = ParseRule.Choice.keyword(Precedence.Keywords._bar);
    tmp84 = runtime.safeCall(tmp83());
    tmp85 = Rules.getRuleByKind("simple-matching");
    tmp86 = ParseRule.Choice.siding({
    "optional": true, "init": tmp84, "rest": tmp85, "process": Rules.idSecond
    });
    tmp87 = runtime.safeCall(tmp82(tmp86));
    tmp88 = Predef.tuple(tmp87);
    tmp89 = runtime.safeCall(ParseRule.Choice.term({
    "process": Tree.Match, "name": "pattern matching scrutinee", "choices": tmp88
    }));
    tmp90 = runtime.safeCall(tmp81(tmp89));
    tmp91 = ParseRule.Choice.keyword(Precedence.Keywords._function);
    tmp92 = ParseRule.Choice.keyword(Precedence.Keywords._bar);
    tmp93 = runtime.safeCall(tmp92());
    tmp94 = Rules.getRuleByKind("simple-matching");
    lambda13 = (undefined, function (_, branches) {
      return Tree.Match(Tree.empty, branches)
    });
    tmp95 = ParseRule.Choice.siding({
    "optional": true, "init": tmp93, "rest": tmp94, "process": lambda13
    });
    tmp96 = runtime.safeCall(tmp91(tmp95));
    tmp97 = ParseRule.Choice.keyword(Precedence.Keywords._if);
    lambda14 = (undefined, function (tst, conAlt) {
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
    tmp98 = lambda14;
    tmp99 = ParseRule.Choice.keyword(Precedence.Keywords._then);
    tmp100 = ParseRule.Choice.end(Option.None);
    tmp101 = ParseRule.Choice.keyword(Precedence.Keywords._else);
    tmp102 = runtime.safeCall(ParseRule.Choice.term({
    "process": Rules.someFirst, "name": "if-then-else alternative"
    }));
    tmp103 = runtime.safeCall(tmp101(tmp102));
    tmp104 = Predef.tuple(tmp100, tmp103);
    tmp105 = runtime.safeCall(ParseRule.Choice.term({
    "name": "if-then-else consequent", "choices": tmp104
    }));
    tmp106 = runtime.safeCall(tmp99(tmp105));
    tmp107 = Predef.tuple(tmp106);
    tmp108 = runtime.safeCall(ParseRule.Choice.term({
    "process": tmp98, "name": "if-then-else condition", "choices": tmp107
    }));
    tmp109 = runtime.safeCall(tmp97(tmp108));
    tmp110 = ParseRule.Choice.keyword(Precedence.Keywords._while);
    tmp111 = ParseRule.Choice.keyword(Precedence.Keywords._do);
    tmp112 = ParseRule.Choice.keyword(Precedence.Keywords._done);
    tmp113 = runtime.safeCall(tmp112());
    tmp114 = Predef.tuple(tmp113);
    tmp115 = runtime.safeCall(ParseRule.Choice.term({
    "name": "while end", "process": Rules.idFirst, "choices": tmp114
    }));
    tmp116 = runtime.safeCall(tmp111(tmp115));
    tmp117 = Predef.tuple(tmp116);
    tmp118 = runtime.safeCall(ParseRule.Choice.term({
    "process": Tree.While, "name": "while body", "choices": tmp117
    }));
    tmp119 = runtime.safeCall(tmp110(tmp118));
    tmp120 = ParseRule.Choice.keyword(Precedence.Keywords._for);
    tmp121 = ParseRule.Choice.keyword(Precedence.Keywords._equal);
    tmp122 = ParseRule.Choice.keyword(Precedence.Keywords._to);
    tmp123 = runtime.safeCall(tmp122());
    tmp124 = ParseRule.Choice.keyword(Precedence.Keywords._downto);
    tmp125 = runtime.safeCall(tmp124());
    tmp126 = Predef.tuple(tmp123, tmp125);
    tmp127 = ParseRule.Choice.keyword(Precedence.Keywords._do);
    tmp128 = ParseRule.Choice.keyword(Precedence.Keywords._done);
    tmp129 = runtime.safeCall(tmp128());
    tmp130 = Predef.tuple(tmp129);
    tmp131 = runtime.safeCall(ParseRule.Choice.term({
    "name": "`for` `done` keyword", "process": Rules.idFirst, "choices": tmp130
    }));
    tmp132 = runtime.safeCall(tmp127(tmp131));
    tmp133 = Predef.tuple(tmp132);
    tmp134 = runtime.safeCall(ParseRule.Choice.term({
    "name": "`for` `do` keyword", "choices": tmp133
    }));
    tmp135 = ParseRule.Choice.siding({
    "init": tmp126, "rest": tmp134, "process": Rules.idSecond
    });
    tmp136 = Predef.tuple(tmp135);
    lambda15 = (undefined, function (start, endBody) {
      return [
        start,
        ...endBody
      ]
    });
    tmp137 = runtime.safeCall(ParseRule.Choice.term({
    "process": lambda15, "name": "`for` `to` or `downto` keyword", "choices": tmp136
    }));
    tmp138 = runtime.safeCall(tmp121(tmp137));
    tmp139 = Predef.tuple(tmp138);
    lambda16 = (undefined, function (head, startEndBody) {
      return Tree.For(head, ...startEndBody)
    });
    tmp140 = runtime.safeCall(ParseRule.Choice.term({
    "name": "`for` head", "process": lambda16, "choices": tmp139
    }));
    tmp141 = runtime.safeCall(tmp120(tmp140));
    lambda17 = (undefined, function (tree) {
      if (tree instanceof Tree.Empty.class) {
        return Tree.Tuple(Stack.Nil)
      } else {
        return tree
      }
    });
    tmp142 = Rules.makeBracketRule({
    "opening": Precedence.Keywords._leftRound, "closing": Precedence.Keywords._rightRound, "kind": "term", "wrapContent": lambda17
    });
    lambda18 = (undefined, function (tree) {
      let tmp295;
      if (tree instanceof Tree.Empty.class) {
        tmp295 = Tree.Sequence(Stack.Nil);
      } else {
        tmp295 = tree;
      }
      return Tree.Bracketed(Token.Square, tmp295)
    });
    tmp143 = lambda18;
    tmp144 = Rules.makeBracketRule({
    "opening": Precedence.Keywords._leftSquare, "closing": Precedence.Keywords._rightSquare, "kind": "term", "wrapContent": tmp143
    });
    tmp145 = Rules.makeBracketRule({
    "opening": Precedence.Keywords._leftCurly, "closing": Precedence.Keywords._rightCurly, "kind": "term", "wrapContent": Predef.id
    });
    lambda19 = (undefined, function (tree) {
      if (tree instanceof Tree.Empty.class) {
        return Tree.Sequence(Stack.Nil)
      } else {
        return tree
      }
    });
    tmp146 = Rules.makeBracketRule({
    "opening": Precedence.Keywords._begin, "closing": Precedence.Keywords._end, "kind": "term", "wrapContent": lambda19
    });
    tmp147 = runtime.safeCall(ParseRule.Choice.term({
    "process": Predef.pipeInto, "choices": Rules.termInfixRule
    }));
    tmp148 = ParseRule.rule("prefix rules for expressions", Rules.#letExpression, tmp80, tmp90, tmp96, tmp109, tmp119, tmp141, tmp142, tmp144, tmp145, tmp146, tmp147);
    this.termRule = tmp148;
    lambda20 = (undefined, function (lhs, rhs) {
      return Tree.Infix(Precedence.Keywords._thinArrow, lhs, rhs)
    });
    tmp149 = Rules.makeInfixChoice(Precedence.Keywords._thinArrow, "type", lambda20);
    lambda21 = (undefined, function (lhs, rhs) {
      return Tree.Infix(Precedence.Keywords._asterisk, lhs, rhs)
    });
    tmp150 = Rules.makeInfixChoice(Precedence.Keywords._asterisk, "type", lambda21);
    lambda22 = (undefined, function (callee, _) {
      let lambda36;
      lambda36 = (undefined, function (argument) {
        return Tree.App(callee, argument)
      });
      return lambda36
    });
    tmp151 = runtime.safeCall(ParseRule.Choice.typeExpr({
    "process": lambda22, "outerPrec": Precedence.Keywords.appPrec
    }));
    tmp152 = ParseRule.rule("infix rules for types", tmp149, tmp150, tmp151);
    this.typeInfixRule = tmp152;
    tmp153 = ParseRule.Choice.keyword(Precedence.Keywords._leftRound);
    lambda23 = (undefined, function (headArg, tailArgsCtor) {
      let param0, ctor, first1, first0, tailArgs, ctor1, tmp295, tmp296;
      if (globalThis.Array.isArray(tailArgsCtor) && tailArgsCtor.length === 2) {
        first0 = tailArgsCtor[0];
        first1 = tailArgsCtor[1];
        tailArgs = first0;
        ctor1 = first1;
        tmp295 = Stack.Cons(headArg, tailArgs);
        tmp296 = Tree.Tuple(tmp295);
        return Tree.App(ctor1, tmp296)
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
    tmp154 = lambda23;
    tmp155 = ParseRule.Choice.reference("type-arguments-tail");
    tmp156 = ParseRule.Choice.keyword(Precedence.Keywords._rightRound);
    tmp157 = runtime.safeCall(ParseRule.Choice.ident({
    "process": Rules.someFirst, "name": "the type constructor's name"
    }));
    tmp158 = runtime.safeCall(tmp156(tmp157));
    tmp159 = Predef.tuple(tmp158);
    tmp160 = runtime.safeCall(tmp155({
    "name": "the remaining type arguments", "choices": tmp159
    }));
    tmp161 = ParseRule.Choice.keyword(Precedence.Keywords._rightRound);
    tmp162 = ParseRule.Choice.end(Option.None);
    tmp163 = runtime.safeCall(ParseRule.Choice.ident({
    "process": Rules.someFirst, "name": "the type constructor's name"
    }));
    tmp164 = runtime.safeCall(tmp161(tmp162, tmp163));
    tmp165 = Predef.tuple(tmp160, tmp164);
    tmp166 = runtime.safeCall(ParseRule.Choice.typeExpr({
    "process": tmp154, "name": "the first type in the parentheses", "choices": tmp165
    }));
    tmp167 = runtime.safeCall(tmp153(tmp166));
    tmp168 = runtime.safeCall(ParseRule.Choice.typeExpr({
    "process": Predef.pipeInto, "choices": Rules.typeInfixRule
    }));
    tmp169 = ParseRule.rule("rules for types", tmp167, tmp168);
    this.typeRule = tmp169;
    tmp170 = Rules.define("type-arguments-tail");
    tmp171 = ParseRule.Choice.keyword(Precedence.Keywords._comma);
    tmp172 = Rules.listLike({
    "head": "type", "tail": "type-arguments-tail", "name": "type argument"
    });
    tmp173 = runtime.safeCall(tmp171(tmp172));
    tmp174 = runtime.safeCall(tmp170(tmp173));
    tmp175 = Rules.define("constr-decl");
    lambda24 = (undefined, function (ctor, argOpt) {
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
    tmp176 = lambda24;
    tmp177 = ParseRule.Choice.end(Option.None);
    tmp178 = ParseRule.Choice.keyword(Precedence.Keywords._of);
    tmp179 = runtime.safeCall(ParseRule.Choice.typeExpr({
    "process": Rules.someFirst, "name": "the variant constructor's argument"
    }));
    tmp180 = runtime.safeCall(tmp178(tmp179));
    tmp181 = Predef.tuple(tmp177, tmp180);
    tmp182 = runtime.safeCall(ParseRule.Choice.ident({
    "process": tmp176, "name": "the variant constructor's name", "choices": tmp181
    }));
    tmp183 = runtime.safeCall(tmp175(tmp182));
    tmp184 = Rules.define("variants");
    tmp185 = ParseRule.Choice.reference("constr-decl");
    lambda25 = (undefined, function (lhs, rhsOpt) {
      let param0, rhs;
      if (rhsOpt instanceof Option.Some.class) {
        param0 = rhsOpt.value;
        rhs = param0;
        return Tree.Infix(Precedence.Keywords._bar, lhs, rhs)
      } else {
        return lhs
      }
    });
    tmp186 = lambda25;
    tmp187 = ParseRule.Choice.end(Option.None);
    tmp188 = ParseRule.Choice.keyword(Precedence.Keywords._bar);
    tmp189 = ParseRule.Choice.reference("variants");
    tmp190 = runtime.safeCall(tmp189({
    "process": Rules.someFirst, "name": "variants end"
    }));
    tmp191 = runtime.safeCall(tmp188(tmp190));
    tmp192 = Predef.tuple(tmp187, tmp191);
    tmp193 = runtime.safeCall(tmp185({
    "process": tmp186, "name": "variants item", "choices": tmp192
    }));
    tmp194 = runtime.safeCall(tmp184(tmp193));
    tmp195 = Rules.define("typedefs");
    tmp196 = ParseRule.Choice.reference("typedef-lhs");
    lambda26 = (undefined, function (lhs, rhsMore) {
      let first1, first0, rhs, more, tmp295;
      if (globalThis.Array.isArray(rhsMore) && rhsMore.length === 2) {
        first0 = rhsMore[0];
        first1 = rhsMore[1];
        rhs = first0;
        more = first1;
        tmp295 = runtime.safeCall(rhs(lhs));
        return Stack.Cons(tmp295, more)
      } else {
        throw new globalThis.Error("match error");
      }
    });
    tmp197 = lambda26;
    tmp198 = ParseRule.Choice.reference("typedef-rhs");
    tmp199 = ParseRule.Choice.end(Stack.Nil);
    tmp200 = ParseRule.Choice.keyword(Precedence.Keywords._and);
    tmp201 = ParseRule.Choice.reference("typedefs");
    tmp202 = runtime.safeCall(tmp201({
    "process": Rules.idFirst, "name": "typedef end"
    }));
    tmp203 = runtime.safeCall(tmp200(tmp202));
    tmp204 = Predef.tuple(tmp199, tmp203);
    tmp205 = runtime.safeCall(tmp198({
    "name": "typedef body", "choices": tmp204
    }));
    tmp206 = Predef.tuple(tmp205);
    tmp207 = runtime.safeCall(tmp196({
    "process": tmp197, "name": "typedef name", "choices": tmp206
    }));
    tmp208 = runtime.safeCall(tmp195(tmp207));
    tmp209 = Rules.define("typedef-rhs");
    tmp210 = ParseRule.Choice.keyword(Precedence.Keywords._equal);
    tmp211 = ParseRule.Choice.reference("variants");
    lambda27 = (undefined, function (rhs, _) {
      let lambda36;
      lambda36 = (undefined, function (lhs) {
        return Tree.Infix(Precedence.Keywords._equal, lhs, rhs)
      });
      return lambda36
    });
    tmp212 = runtime.safeCall(tmp211({
    "process": lambda27, "name": "typedef-rhs: variants"
    }));
    tmp213 = ParseRule.Choice.keyword(Precedence.Keywords._leftCurly);
    tmp214 = ParseRule.Choice.reference("label-decls");
    lambda28 = (undefined, function (content, _) {
      let tmp295, tmp296;
      if (content instanceof Stack.Nil.class) {
        tmp295 = Tree.Sequence(Stack.Nil);
        return Tree.Bracketed(Token.Curly, tmp295)
      } else {
        tmp296 = Tree.Sequence(content);
        return Tree.Bracketed(Token.Curly, tmp296)
      }
    });
    tmp215 = lambda28;
    tmp216 = ParseRule.Choice.keyword(Precedence.Keywords._rightCurly);
    tmp217 = ParseRule.Choice.end(Tree.empty);
    tmp218 = runtime.safeCall(tmp216(tmp217));
    tmp219 = runtime.safeCall(tmp214({
    "process": tmp215, "name": "label-decl", "choices": tmp218
    }));
    tmp220 = runtime.safeCall(tmp213(tmp219));
    lambda29 = (undefined, function (rhs) {
      let lambda36;
      lambda36 = (undefined, function (lhs) {
        return Tree.Infix(Precedence.Keywords._equal, lhs, rhs)
      });
      return lambda36
    });
    tmp221 = ParseRule.Choice.map(tmp220, lambda29);
    tmp222 = runtime.safeCall(tmp210(tmp212, tmp221));
    tmp223 = runtime.safeCall(tmp209(tmp222));
    tmp224 = Rules.define("typedef-rhs");
    tmp225 = ParseRule.Choice.keyword(Precedence.Keywords._equalequal);
    lambda30 = (undefined, function (rhs, _) {
      let lambda36;
      lambda36 = (undefined, function (lhs) {
        return Tree.Infix(Precedence.Keywords._equalequal, lhs, rhs)
      });
      return lambda36
    });
    tmp226 = runtime.safeCall(ParseRule.Choice.typeExpr({
    "process": lambda30, "name": "type alias body"
    }));
    tmp227 = runtime.safeCall(tmp225(tmp226));
    tmp228 = runtime.safeCall(tmp224(tmp227));
    tmp229 = Rules.define("label-decl");
    tmp230 = Tree.infix(Precedence.Keywords._colon);
    tmp231 = ParseRule.Choice.keyword(Precedence.Keywords._colon);
    tmp232 = runtime.safeCall(ParseRule.Choice.typeExpr({
    "process": Rules.idFirst, "name": "label-decl body"
    }));
    tmp233 = runtime.safeCall(tmp231(tmp232));
    tmp234 = Predef.tuple(tmp233);
    tmp235 = runtime.safeCall(ParseRule.Choice.typeExpr({
    "process": tmp230, "name": "label-decl name", "choices": tmp234
    }));
    tmp236 = runtime.safeCall(tmp229(tmp235));
    tmp237 = Rules.define("label-decls");
    tmp238 = Rules.listLike({
    "head": "label-decl", "tail": "label-decls", "name": "label and declaration pair", "sep": Precedence.Keywords._semicolon
    });
    tmp239 = runtime.safeCall(tmp237(tmp238));
    tmp240 = Rules.define("constr-decls");
    tmp241 = Rules.listLike({
    "head": "constr-decl", "tail": "constr-decls", "name": "constructor declaration", "sep": Precedence.Keywords._bar
    });
    tmp242 = runtime.safeCall(tmp240(tmp241));
    tmp243 = Rules.define("typedef-lhs");
    tmp244 = ParseRule.Choice.reference("type-params");
    lambda31 = (undefined, function (params, ident) {
      let tmp295;
      if (params instanceof Stack.Nil.class) {
        return ident
      } else {
        tmp295 = Tree.Tuple(params);
        return Tree.App(ident, tmp295)
      }
    });
    tmp245 = lambda31;
    tmp246 = runtime.safeCall(ParseRule.Choice.ident({
    "process": Rules.idFirst, "name": "the type identifier"
    }));
    tmp247 = Predef.tuple(tmp246);
    tmp248 = runtime.safeCall(tmp244({
    "process": tmp245, "name": "the type parameters", "choices": tmp247
    }));
    tmp249 = runtime.safeCall(tmp243(tmp248));
    tmp250 = Rules.define("type-params");
    tmp251 = ParseRule.Choice.end(Stack.Nil);
    tmp252 = runtime.safeCall(tmp250(tmp251));
    tmp253 = Rules.define("type-params");
    lambda32 = (undefined, function (h, _) {
      return Stack.Cons(h, Stack.Nil)
    });
    tmp254 = runtime.safeCall(ParseRule.Choice.typeVar({
    "process": lambda32, "name": "the only type parameter"
    }));
    tmp255 = runtime.safeCall(tmp253(tmp254));
    tmp256 = Rules.define("type-params");
    tmp257 = ParseRule.Choice.keyword(Precedence.Keywords._leftRound);
    tmp258 = ParseRule.Choice.reference("type-params-tail");
    tmp259 = ParseRule.Choice.keyword(Precedence.Keywords._rightRound);
    tmp260 = runtime.safeCall(tmp259());
    tmp261 = Predef.tuple(tmp260);
    tmp262 = runtime.safeCall(tmp258({
    "process": Rules.idFirst, "name": "more type parameters", "choices": tmp261
    }));
    tmp263 = Predef.tuple(tmp262);
    tmp264 = runtime.safeCall(ParseRule.Choice.typeVar({
    "process": Stack.Cons, "name": "the first type parameter", "choices": tmp263
    }));
    tmp265 = runtime.safeCall(tmp257(tmp264));
    tmp266 = runtime.safeCall(tmp256(tmp265));
    tmp267 = Rules.define("type-params-tail");
    tmp268 = ParseRule.Choice.end(Stack.Nil);
    tmp269 = runtime.safeCall(tmp267(tmp268));
    tmp270 = Rules.define("type-params-tail");
    tmp271 = ParseRule.Choice.keyword(Precedence.Keywords._comma);
    tmp272 = ParseRule.Choice.reference("type-params-tail");
    tmp273 = runtime.safeCall(tmp272({
    "process": Rules.idFirst, "name": "more type parameters"
    }));
    tmp274 = Predef.tuple(tmp273);
    tmp275 = runtime.safeCall(ParseRule.Choice.typeVar({
    "process": Stack.Cons, "name": "the first type parameter", "choices": tmp274
    }));
    tmp276 = runtime.safeCall(tmp271(tmp275));
    tmp277 = runtime.safeCall(tmp270(tmp276));
    tmp278 = Rules.makeLetBindings(false);
    tmp279 = ParseRule.Choice.keyword(Precedence.Keywords._type);
    tmp280 = ParseRule.Choice.reference("typedefs");
    lambda33 = (undefined, function (typedefs, _) {
      return Tree.Define(Tree.DefineKind.Type, typedefs)
    });
    tmp281 = runtime.safeCall(tmp280({
    "process": lambda33, "name": "more typedefs"
    }));
    tmp282 = runtime.safeCall(tmp279(tmp281));
    tmp283 = ParseRule.Choice.keyword(Precedence.Keywords._exception);
    tmp284 = ParseRule.Choice.reference("constr-decls");
    lambda34 = (undefined, function (decls, _) {
      return Tree.Define(Tree.DefineKind.Exception, decls)
    });
    tmp285 = runtime.safeCall(tmp284({
    "process": lambda34, "name": "constructor declarations"
    }));
    tmp286 = runtime.safeCall(tmp283(tmp285));
    tmp287 = ParseRule.Choice.keyword(Precedence.Keywords._hash);
    tmp288 = runtime.safeCall(ParseRule.Choice.term({
    "process": Rules.idFirst, "name": "directive body"
    }));
    tmp289 = Predef.tuple(tmp288);
    lambda35 = (undefined, function (ident, body) {
      let tmp295;
      tmp295 = Stack.Cons([
        ident,
        body
      ], Stack.Nil);
      return Tree.Define(Tree.DefineKind.Directive, tmp295)
    });
    tmp290 = runtime.safeCall(ParseRule.Choice.ident({
    "process": lambda35, "name": "directive name", "choices": tmp289
    }));
    tmp291 = runtime.safeCall(tmp287(tmp290));
    tmp292 = ParseRule.rule("prefix rules for module items", tmp278, tmp282, tmp286, tmp291);
    this.declRule = tmp292;
    tmp293 = Rules.syntaxKinds.insert("term", Rules.termRule);
    tmp294 = Rules.syntaxKinds.insert("type", Rules.typeRule);
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
  static idFirst(value, _) {
    return value
  } 
  static idSecond(_1, value1) {
    return value1
  } 
  static someFirst(value2, _2) {
    return Option.Some(value2)
  } 
  static listFirst(value3, _3) {
    return Stack.Cons(value3, Stack.Nil)
  } 
  static listLike(fields) {
    let mkTail, scrut, tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9;
    scrut = fields["sep"];
    if (scrut === undefined) {
      tmp = Predef.id;
    } else {
      tmp = ParseRule.Choice.keyword(fields["sep"]);
    }
    mkTail = tmp;
    tmp1 = ParseRule.Choice.reference(fields.head);
    tmp2 = "the first " + fields.name;
    tmp3 = ParseRule.Choice.end(Stack.Nil);
    tmp4 = ParseRule.Choice.reference(fields.tail);
    tmp5 = "more " + fields.name;
    tmp6 = tmp5 + "s";
    tmp7 = runtime.safeCall(tmp4({
    "process": Rules.idFirst, "name": tmp6
    }));
    tmp8 = runtime.safeCall(mkTail(tmp7));
    tmp9 = Predef.tuple(tmp3, tmp8);
    return runtime.safeCall(tmp1({
    "process": Stack.Cons, "name": tmp2, "choices": tmp9
    }))
  } 
  static makeLetBindings(hasInClause) {
    let intro, tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12;
    intro = "let binding: ";
    tmp = ParseRule.Choice.keyword(Precedence.Keywords._let);
    tmp1 = ParseRule.Choice.keyword(Precedence.Keywords._rec);
    tmp2 = runtime.safeCall(tmp1());
    tmp3 = ParseRule.Choice.reference("let-bindings");
    if (hasInClause === true) {
      tmp4 = ParseRule.Choice.keyword(Precedence.Keywords._in);
      tmp5 = intro + "body";
      tmp6 = runtime.safeCall(ParseRule.Choice.term({
      "process": Rules.someFirst, "name": tmp5
      }));
      tmp7 = runtime.safeCall(tmp4(tmp6));
      tmp8 = ParseRule.Choice.end(Option.None);
      tmp9 = Predef.tuple(tmp7, tmp8);
    } else {
      tmp10 = ParseRule.Choice.end(Option.None);
      tmp9 = Predef.tuple(tmp10);
    }
    tmp11 = runtime.safeCall(tmp3({
    "process": Tree.LetIn, "name": "let-bindings", "choices": tmp9
    }));
    tmp12 = ParseRule.Choice.siding({
    "optional": true, "init": tmp2, "rest": tmp11, "process": Rules.idSecond
    });
    return runtime.safeCall(tmp(tmp12))
  } 
  static makeInfixChoice(kw, rhsKind, compose) {
    let tmp, tmp1, tmp2, tmp3, tmp4, lambda;
    tmp = ParseRule.Choice.keyword(kw);
    tmp1 = ParseRule.Choice.reference(rhsKind);
    tmp2 = "operator `" + kw.name;
    tmp3 = tmp2 + "` right-hand side";
    lambda = (undefined, function (rhs, _4) {
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
  static makeBracketRule(fields1) {
    let tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, lambda;
    tmp = ParseRule.Choice.keyword(fields1.opening);
    tmp1 = ParseRule.Choice.reference(fields1.kind);
    lambda = (undefined, function (tree, next) {
      let param0, param1, msg, tmp9;
      if (next instanceof Tree.Error.class) {
        param0 = next.tree;
        param1 = next.message;
        if (param0 instanceof Tree.Empty.class) {
          msg = param1;
          tmp9 = runtime.safeCall(fields1.wrapContent(tree));
          return Tree.Error(tmp9, msg)
        } else {
          throw new globalThis.Error("match error");
        }
      } else if (next instanceof Tree.Empty.class) {
        return runtime.safeCall(fields1.wrapContent(tree))
      } else {
        throw new globalThis.Error("match error");
      }
    });
    tmp2 = lambda;
    tmp3 = fields1.kind + " in bracket";
    tmp4 = ParseRule.Choice.keyword(fields1.closing);
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
