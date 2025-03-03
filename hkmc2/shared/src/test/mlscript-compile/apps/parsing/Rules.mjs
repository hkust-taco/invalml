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
    let tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20, tmp21, tmp22, tmp23, tmp24, tmp25, tmp26, tmp27, tmp28, tmp29, tmp30, tmp31, tmp32, tmp33, tmp34, tmp35, tmp36, tmp37, tmp38, tmp39, tmp40, tmp41, tmp42, tmp43, tmp44, tmp45, tmp46, tmp47, tmp48, tmp49, tmp50, tmp51, tmp52, tmp53, tmp54, tmp55, tmp56, tmp57, tmp58, tmp59, tmp60, tmp61, tmp62, tmp63, tmp64, tmp65, tmp66, tmp67, tmp68, tmp69, tmp70, tmp71, tmp72, tmp73, tmp74, tmp75, tmp76, tmp77, tmp78, tmp79, tmp80, tmp81, tmp82, tmp83, tmp84, tmp85, tmp86, tmp87, tmp88, tmp89, tmp90, tmp91, tmp92, tmp93, tmp94, tmp95, tmp96, tmp97, tmp98, tmp99, tmp100, tmp101, tmp102, tmp103, tmp104, tmp105, tmp106, tmp107, tmp108, tmp109, tmp110, tmp111, tmp112, tmp113, tmp114, tmp115, tmp116, tmp117, tmp118, tmp119, tmp120, tmp121, tmp122, tmp123, tmp124, tmp125, tmp126, tmp127, tmp128, tmp129, tmp130, tmp131, tmp132, tmp133, tmp134, tmp135, tmp136, tmp137, tmp138, tmp139, tmp140, tmp141, tmp142, tmp143, tmp144, tmp145, tmp146, tmp147, tmp148, tmp149, tmp150, tmp151, tmp152, tmp153, tmp154, tmp155, tmp156, tmp157, tmp158, tmp159, tmp160, tmp161, tmp162, tmp163, tmp164, tmp165, tmp166, tmp167, tmp168, tmp169, tmp170, tmp171, tmp172, tmp173, tmp174, tmp175, tmp176, tmp177, tmp178, tmp179, tmp180, tmp181, tmp182, tmp183, tmp184, tmp185, tmp186, tmp187, tmp188, tmp189, tmp190, tmp191, tmp192, tmp193, tmp194;
    tmp = new BetterMap.Map();
    this.syntaxKinds = tmp;
    tmp1 = new globalThis.Set();
    this.extendedKinds = tmp1;
    tmp2 = (lhs, rhsBindings) => {
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
    };
    tmp3 = ParseRule.Choice.end(Stack.Nil);
    tmp4 = ParseRule.Choice.reference("let-bindings", (tail, _) => {
      return tail
    }, "let-bindings tail");
    tmp5 = ParseRule.Choice.keyword(Precedence.Keywords._and, tmp4);
    tmp6 = ParseRule.Choice.term((rhs, tail) => {
      return [
        rhs,
        tail
      ]
    }, "right-hand side", tmp3, tmp5);
    tmp7 = ParseRule.Choice.keyword(Precedence.Keywords._equal, tmp6);
    tmp8 = ParseRule.Choice.term(tmp2, "left-hand side", tmp7);
    tmp9 = Rules.defineKind("let-bindings", tmp8);
    tmp10 = Rules.makeLetBindings(true);
    Rules.#letExpression = tmp10;
    tmp11 = ParseRule.Choice.end(Option.None);
    tmp12 = ParseRule.Choice.term((body, _) => {
      return body
    }, "function body", tmp11);
    tmp13 = ParseRule.Choice.keyword(Precedence.Keywords._thinArrow, tmp12);
    tmp14 = ParseRule.Choice.term((params, body) => {
      let tmp195;
      tmp195 = Stack.Cons(params, Stack.Nil);
      return Tree.Lambda(tmp195, body)
    }, "function parameters", tmp13);
    tmp15 = ParseRule.Choice.keyword(Precedence.Keywords._fun, tmp14);
    Rules.#funTerm = tmp15;
    tmp16 = (lhs, rhsTail) => {
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
    };
    tmp17 = ParseRule.Choice.end(Stack.Nil);
    tmp18 = ParseRule.Choice.reference("simple-matching", (tail, _) => {
      return tail
    }, "simple-matching tail");
    tmp19 = ParseRule.Choice.keyword(Precedence.Keywords._bar, tmp18);
    tmp20 = ParseRule.Choice.term((rhs, tail) => {
      return [
        rhs,
        tail
      ]
    }, "rhs", tmp17, tmp19);
    tmp21 = ParseRule.Choice.keyword(Precedence.Keywords._thinArrow, tmp20);
    tmp22 = ParseRule.Choice.term(tmp16, "pattern", tmp21);
    tmp23 = Rules.defineKind("simple-matching", tmp22);
    tmp24 = ParseRule.Choice.reference("pattern-list", (tail, _) => {
      return tail
    }, "pattern list tail");
    tmp25 = ParseRule.Choice.term((head, tail) => {
      return Stack.Cons(head, tail)
    }, "pattern", tmp24);
    tmp26 = Rules.defineKind("pattern-list", tmp25);
    tmp27 = Tree.infix(Precedence.Keywords._thinArrow);
    tmp28 = ParseRule.Choice.end(Stack.Nil);
    tmp29 = ParseRule.Choice.reference("multiple-matching", (tail, _) => {
      return tail
    }, "multiple-matching tail");
    tmp30 = ParseRule.Choice.keyword(Precedence.Keywords._bar, tmp29);
    tmp31 = ParseRule.Choice.term((rhs, _) => {
      return rhs
    }, "the right-hand side of the arrow", tmp28, tmp30);
    tmp32 = ParseRule.Choice.keyword(Precedence.Keywords._thinArrow, tmp31);
    tmp33 = ParseRule.Choice.reference("pattern-list", tmp27, "the list of patterns", tmp32);
    tmp34 = Rules.defineKind("multiple-matching", tmp33);
    tmp35 = (lhs, rhs) => {
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
    };
    tmp36 = Rules.makeInfixChoice(Precedence.Keywords._comma, "term", tmp35);
    tmp37 = (lhs, rhs) => {
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
    };
    tmp38 = Rules.makeInfixChoice(Precedence.Keywords._semicolon, "term", tmp37);
    tmp39 = Rules.makeInfixChoice(Precedence.Keywords._leftArrow, "term", (lhs, rhs) => {
      return Tree.Infix(Precedence.Keywords._leftArrow, lhs, rhs)
    });
    tmp40 = Rules.makeInfixChoice(Precedence.Keywords._equalequal, "term", (lhs, rhs) => {
      return Tree.Infix(Precedence.Keywords._equalequal, lhs, rhs)
    });
    tmp41 = (lhs, rhs) => {
      let tmp195, tmp196, tmp197;
      tmp195 = Tree.Ident("*", true);
      tmp196 = Stack.Cons(rhs, Stack.Nil);
      tmp197 = Stack.Cons(lhs, tmp196);
      return Tree.App(tmp195, tmp197)
    };
    tmp42 = Rules.makeInfixChoice(Precedence.Keywords._asterisk, "term", tmp41);
    tmp43 = ParseRule.Choice.keyword(Precedence.Keywords._rightRound);
    tmp44 = ParseRule.Choice.term((argument, _) => {
      return (lhs) => {
        let tmp195;
        tmp195 = Tree.Bracketed(Token.Round, argument);
        return Tree.Infix(Precedence.Keywords._period, lhs, tmp195)
      }
    }, "application argument", tmp43);
    tmp45 = ParseRule.Choice.keyword(Precedence.Keywords._leftRound, tmp44);
    tmp46 = ParseRule.Choice.reference("term", (rhs, _) => {
      return (lhs) => {
        return Tree.Infix(Precedence.Keywords._period, lhs, rhs)
      }
    }, "operator `.` right-hand side");
    tmp47 = ParseRule.Choice.keyword(Precedence.Keywords._period, tmp45, tmp46);
    tmp48 = ParseRule.Choice.typeExpr((rhs, _) => {
      return (lhs) => {
        return Tree.Infix(Precedence.Keywords._colon, lhs, rhs)
      }
    }, "right-hand side type");
    tmp49 = ParseRule.Choice.keyword(Precedence.Keywords._colon, tmp48);
    tmp50 = Option.Some(Precedence.Keywords.appPrec);
    tmp51 = ParseRule.Choice.termWithPrec((argument, _) => {
      return (callee) => {
        return Tree.App(callee, argument)
      }
    }, "application argument", tmp50, Option.None);
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
    tmp64 = ParseRule.Choice.map(tmp63, (branches) => {
      return Tree.Match(Tree.empty, branches)
    });
    tmp65 = ParseRule.Choice.keyword(Precedence.Keywords._function, tmp64);
    tmp66 = (tst, conAlt) => {
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
    };
    tmp67 = ParseRule.Choice.end(Option.None);
    tmp68 = ParseRule.Choice.end(Option.None);
    tmp69 = ParseRule.Choice.term((alt, _) => {
      return Option.Some(alt)
    }, "if-then-else alternative", tmp68);
    tmp70 = ParseRule.Choice.keyword(Precedence.Keywords._else, tmp69);
    tmp71 = ParseRule.Choice.term((con, optAlt) => {
      return [
        con,
        optAlt
      ]
    }, "if-then-else consequent", tmp67, tmp70);
    tmp72 = ParseRule.Choice.keyword(Precedence.Keywords._then, tmp71);
    tmp73 = ParseRule.Choice.term(tmp66, "if-then-else condition", tmp72);
    tmp74 = ParseRule.Choice.keyword(Precedence.Keywords._if, tmp73);
    tmp75 = ParseRule.Choice.keyword(Precedence.Keywords._done);
    tmp76 = ParseRule.Choice.term((body, _) => {
      return body
    }, "while end", tmp75);
    tmp77 = ParseRule.Choice.keyword(Precedence.Keywords._do, tmp76);
    tmp78 = ParseRule.Choice.term(Tree.While, "while body", tmp77);
    tmp79 = ParseRule.Choice.keyword(Precedence.Keywords._while, tmp78);
    tmp80 = ParseRule.Choice.keyword(Precedence.Keywords._to);
    tmp81 = ParseRule.Choice.keyword(Precedence.Keywords._downto);
    tmp82 = ParseRule.rule("iteration keyword", tmp80, tmp81);
    tmp83 = ParseRule.Choice.keyword(Precedence.Keywords._done);
    tmp84 = ParseRule.Choice.term((body, _) => {
      return body
    }, "`for` `done` keyword", tmp83);
    tmp85 = ParseRule.Choice.keyword(Precedence.Keywords._do, tmp84);
    tmp86 = ParseRule.Choice.term((end, body) => {
      return [
        end,
        body
      ]
    }, "`for` `do` keyword", tmp85);
    tmp87 = ParseRule.rule("the iteration keyword", tmp86);
    tmp88 = ParseRule.Choice.siding(tmp82, tmp87);
    tmp89 = ParseRule.Choice.term((start, endBody) => {
      return [
        start,
        ...endBody
      ]
    }, "`for` `to` or `downto` keyword", tmp88);
    tmp90 = ParseRule.Choice.keyword(Precedence.Keywords._equal, tmp89);
    tmp91 = ParseRule.Choice.term((head, startEndBody) => {
      return Tree.For(head, ...startEndBody)
    }, "`for` head", tmp90);
    tmp92 = ParseRule.Choice.keyword(Precedence.Keywords._for, tmp91);
    tmp93 = Rules.makeBracketRule(Precedence.Keywords._leftRound, Precedence.Keywords._rightRound, "term", (tree) => {
      if (tree instanceof Tree.Empty.class) {
        return Tree.Tuple(Stack.Nil)
      } else {
        return tree
      }
    });
    tmp94 = (tree) => {
      let tmp195;
      if (tree instanceof Tree.Empty.class) {
        tmp195 = Tree.Sequence(Stack.Nil);
      } else {
        tmp195 = tree;
      }
      return Tree.Bracketed(Token.Square, tmp195)
    };
    tmp95 = Rules.makeBracketRule(Precedence.Keywords._leftSquare, Precedence.Keywords._rightSquare, "term", tmp94);
    tmp96 = Rules.makeBracketRule(Precedence.Keywords._leftCurly, Precedence.Keywords._rightCurly, "term", Predef.id);
    tmp97 = Rules.makeBracketRule(Precedence.Keywords._begin, Precedence.Keywords._end, "term", (tree) => {
      if (tree instanceof Tree.Empty.class) {
        return Tree.Sequence(Stack.Nil)
      } else {
        return tree
      }
    });
    tmp98 = ParseRule.Choice.Ref("term", (lhs, compose) => {
      return runtime.safeCall(compose(lhs))
    }, Option.None, Option.None, Rules.termInfixRule);
    tmp99 = ParseRule.rule("prefix rules for expressions", Rules.#letExpression, Rules.#funTerm, tmp59, tmp65, tmp74, tmp79, tmp92, tmp93, tmp95, tmp96, tmp97, tmp98);
    this.termRule = tmp99;
    tmp100 = Rules.makeInfixChoice(Precedence.Keywords._thinArrow, "type", (lhs, rhs) => {
      return Tree.Infix(Precedence.Keywords._thinArrow, lhs, rhs)
    });
    tmp101 = Rules.makeInfixChoice(Precedence.Keywords._asterisk, "type", (lhs, rhs) => {
      return Tree.Infix(Precedence.Keywords._asterisk, lhs, rhs)
    });
    tmp102 = Option.Some(Precedence.Keywords.appPrec);
    tmp103 = ParseRule.rule("end of type infix rules");
    tmp104 = ParseRule.Choice.Ref("type", (callee, _) => {
      return (argument) => {
        return Tree.App(callee, argument)
      }
    }, tmp102, Option.None, tmp103);
    tmp105 = ParseRule.rule("infix rules for types", tmp100, tmp101, tmp104);
    this.typeInfixRule = tmp105;
    tmp106 = (headArg, tailArgsCtor) => {
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
    };
    tmp107 = ParseRule.Choice.reference("ident", (ident, _) => {
      return Option.Some(ident)
    }, "the type constructor's name");
    tmp108 = ParseRule.Choice.keyword(Precedence.Keywords._rightRound, tmp107);
    tmp109 = ParseRule.Choice.reference("type-arguments-tail", (args, ident) => {
      return [
        args,
        ident
      ]
    }, "the remaining type arguments", tmp108);
    tmp110 = ParseRule.Choice.end(Option.None);
    tmp111 = ParseRule.Choice.reference("ident", (ident, _) => {
      return Option.Some(ident)
    }, "the type constructor's name");
    tmp112 = ParseRule.Choice.keyword(Precedence.Keywords._rightRound, tmp110, tmp111);
    tmp113 = ParseRule.Choice.reference("type", tmp106, "the first type in the parentheses", tmp109, tmp112);
    tmp114 = ParseRule.Choice.keyword(Precedence.Keywords._leftRound, tmp113);
    tmp115 = ParseRule.Choice.Ref("type", (lhs, compose) => {
      return runtime.safeCall(compose(lhs))
    }, Option.None, Option.None, Rules.typeInfixRule);
    tmp116 = ParseRule.rule("rules for types", tmp114, tmp115);
    this.typeRule = tmp116;
    tmp117 = ParseRule.Choice.end(Stack.Nil);
    tmp118 = ParseRule.Choice.reference("type-arguments-tail", (tail, _) => {
      return tail
    }, "more type arguments");
    tmp119 = ParseRule.Choice.reference("type", Stack.Cons, "the first type argument", tmp117, tmp118);
    tmp120 = ParseRule.Choice.keyword(Precedence.Keywords._comma, tmp119);
    tmp121 = Rules.defineKind("type-arguments-tail", tmp120);
    tmp122 = (ctor, argOpt) => {
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
    };
    tmp123 = ParseRule.Choice.end(Option.None);
    tmp124 = ParseRule.Choice.reference("type", (argument, _) => {
      return Option.Some(argument)
    }, "the variant constructor's argument");
    tmp125 = ParseRule.Choice.keyword(Precedence.Keywords._of, tmp124);
    tmp126 = ParseRule.Choice.reference("ident", tmp122, "the variant constructor's name", tmp123, tmp125);
    tmp127 = Rules.defineKind("constr-decl", tmp126);
    tmp128 = (lhs, rhsOpt) => {
      let param0, rhs;
      if (rhsOpt instanceof Option.Some.class) {
        param0 = rhsOpt.value;
        rhs = param0;
        return Tree.Infix(Precedence.Keywords._bar, lhs, rhs)
      } else {
        return lhs
      }
    };
    tmp129 = ParseRule.Choice.end(Option.None);
    tmp130 = ParseRule.Choice.reference("variants", (more, _) => {
      return Option.Some(more)
    }, "variants end");
    tmp131 = ParseRule.Choice.keyword(Precedence.Keywords._bar, tmp130);
    tmp132 = ParseRule.Choice.reference("constr-decl", tmp128, "variants item", tmp129, tmp131);
    tmp133 = Rules.defineKind("variants", tmp132);
    tmp134 = (lhs, rhsMore) => {
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
    };
    tmp135 = ParseRule.Choice.end(Stack.Nil);
    tmp136 = ParseRule.Choice.reference("typedefs", (more, _) => {
      return more
    }, "typedef end");
    tmp137 = ParseRule.Choice.keyword(Precedence.Keywords._and, tmp136);
    tmp138 = ParseRule.Choice.reference("typedef-rhs", Predef.tuple, "typedef body", tmp135, tmp137);
    tmp139 = ParseRule.Choice.reference("typedef-lhs", tmp134, "typedef name", tmp138);
    tmp140 = Rules.defineKind("typedefs", tmp139);
    tmp141 = ParseRule.Choice.reference("variants", (rhs, _) => {
      return (lhs) => {
        return Tree.Infix(Precedence.Keywords._equal, lhs, rhs)
      }
    }, "typedef-rhs: variants");
    tmp142 = (content, _) => {
      let tmp195, tmp196;
      if (content instanceof Stack.Nil.class) {
        tmp195 = Tree.Sequence(Stack.Nil);
        return Tree.Bracketed(Token.Curly, tmp195)
      } else {
        tmp196 = Tree.Sequence(content);
        return Tree.Bracketed(Token.Curly, tmp196)
      }
    };
    tmp143 = ParseRule.Choice.end(Tree.empty);
    tmp144 = ParseRule.Choice.keyword(Precedence.Keywords._rightCurly, tmp143);
    tmp145 = ParseRule.Choice.reference("label-decls", tmp142, "label-decl", tmp144);
    tmp146 = ParseRule.Choice.keyword(Precedence.Keywords._leftCurly, tmp145);
    tmp147 = ParseRule.Choice.map(tmp146, (rhs) => {
      return (lhs) => {
        return Tree.Infix(Precedence.Keywords._equal, lhs, rhs)
      }
    });
    tmp148 = ParseRule.Choice.keyword(Precedence.Keywords._equal, tmp141, tmp147);
    tmp149 = ParseRule.Choice.reference("type", (rhs, _) => {
      return (lhs) => {
        return Tree.Infix(Precedence.Keywords._equalequal, lhs, rhs)
      }
    }, "type alias body");
    tmp150 = ParseRule.Choice.keyword(Precedence.Keywords._equalequal, tmp149);
    tmp151 = Rules.defineKind("typedef-rhs", tmp148, tmp150);
    tmp152 = Tree.infix(Precedence.Keywords._colon);
    tmp153 = ParseRule.Choice.typeExpr((rhs, _) => {
      return rhs
    }, "label-decl body");
    tmp154 = ParseRule.Choice.keyword(Precedence.Keywords._colon, tmp153);
    tmp155 = ParseRule.Choice.typeExpr(tmp152, "label-decl name", tmp154);
    tmp156 = Rules.defineKind("label-decl", tmp155);
    tmp157 = ParseRule.Choice.end(Stack.Nil);
    tmp158 = ParseRule.Choice.reference("label-decls", (more, _) => {
      return more
    }, "more label-decls");
    tmp159 = ParseRule.Choice.keyword(Precedence.Keywords._semicolon, tmp158);
    tmp160 = ParseRule.Choice.reference("label-decl", Stack.Cons, "the first label-decl", tmp157, tmp159);
    tmp161 = Rules.defineKind("label-decls", tmp160);
    tmp162 = ParseRule.Choice.end(Stack.Nil);
    tmp163 = ParseRule.Choice.reference("constr-decls", (tail, _) => {
      return tail
    }, "more constructor declarations");
    tmp164 = ParseRule.Choice.keyword(Precedence.Keywords._bar, tmp163);
    tmp165 = ParseRule.Choice.reference("constr-decl", Stack.Cons, "the first constructor declaration", tmp162, tmp164);
    tmp166 = Rules.defineKind("constr-decls", tmp165);
    tmp167 = (params, ident) => {
      let tmp195;
      if (params instanceof Stack.Nil.class) {
        return ident
      } else {
        tmp195 = Tree.Tuple(params);
        return Tree.App(ident, tmp195)
      }
    };
    tmp168 = ParseRule.Choice.reference("ident", (ident, _) => {
      return ident
    }, "the type identifier");
    tmp169 = ParseRule.Choice.reference("type-params", tmp167, "the type parameters", tmp168);
    tmp170 = Rules.defineKind("typedef-lhs", tmp169);
    tmp171 = ParseRule.Choice.reference("typevar", (head, _) => {
      return Stack.Cons(head, Stack.Nil)
    }, "the only type parameter");
    tmp172 = ParseRule.Choice.keyword(Precedence.Keywords._rightRound);
    tmp173 = ParseRule.Choice.reference("type-params-tail", (tail, _) => {
      return tail
    }, "more type parameters", tmp172);
    tmp174 = ParseRule.Choice.reference("typevar", Stack.Cons, "the first type parameter", tmp173);
    tmp175 = ParseRule.Choice.keyword(Precedence.Keywords._leftRound, tmp174);
    tmp176 = ParseRule.Choice.end(Stack.Nil);
    tmp177 = Rules.defineKind("type-params", tmp171, tmp175, tmp176);
    tmp178 = ParseRule.Choice.end(Stack.Nil);
    tmp179 = ParseRule.Choice.end(runtime.Unit);
    tmp180 = ParseRule.Choice.reference("type-params-tail", (tail, _) => {
      return tail
    }, "more type parameters", tmp179);
    tmp181 = ParseRule.Choice.reference("typevar", Stack.Cons, "the first type parameter", tmp180);
    tmp182 = ParseRule.Choice.keyword(Precedence.Keywords._comma, tmp181);
    tmp183 = Rules.defineKind("type-params-tail", tmp178, tmp182);
    tmp184 = Rules.makeLetBindings(false);
    tmp185 = ParseRule.Choice.reference("typedefs", (typedefs, _) => {
      return Tree.Define(Tree.DefineKind.Type, typedefs)
    }, "more typedefs");
    tmp186 = ParseRule.Choice.keyword(Precedence.Keywords._type, tmp185);
    tmp187 = ParseRule.Choice.reference("constr-decls", (decls, _) => {
      return Tree.Define(Tree.DefineKind.Exception, decls)
    }, "constructor declarations");
    tmp188 = ParseRule.Choice.keyword(Precedence.Keywords._exception, tmp187);
    tmp189 = ParseRule.Choice.reference("term", (body, _) => {
      return body
    }, "directive body");
    tmp190 = ParseRule.Choice.reference("ident", (ident, body) => {
      let tmp195;
      tmp195 = Stack.Cons([
        ident,
        body
      ], Stack.Nil);
      return Tree.Define(Tree.DefineKind.Directive, tmp195)
    }, "directive name", tmp189);
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
    let intro, tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12;
    intro = "let binding: ";
    tmp = intro + "keyword";
    tmp1 = ParseRule.Choice.keyword(Precedence.Keywords._rec);
    tmp2 = ParseRule.rule(tmp, tmp1);
    tmp3 = intro + "body";
    if (hasInClause === true) {
      tmp4 = intro + "body";
      tmp5 = ParseRule.Choice.term((body, _) => {
        return Option.Some(body)
      }, tmp4);
      tmp6 = ParseRule.Choice.keyword(Precedence.Keywords._in, tmp5);
      tmp7 = ParseRule.Choice.end(Option.None);
      tmp8 = Predef.tuple(tmp6, tmp7);
    } else {
      tmp9 = ParseRule.Choice.end(Option.None);
      tmp8 = Predef.tuple(tmp9);
    }
    tmp10 = ParseRule.Choice.reference("let-bindings", (bindings, body) => {
      return Tree.LetIn(bindings, body)
    }, "let-bindings", ...tmp8);
    tmp11 = ParseRule.rule(tmp3, tmp10);
    tmp12 = ParseRule.Choice.optional(tmp2, tmp11);
    return ParseRule.Choice.keyword(Precedence.Keywords._let, tmp12)
  } 
  static makeInfixChoice(keyword, rhsKind, compose) {
    let tmp, tmp1, tmp2;
    tmp = "operator `" + keyword.name;
    tmp1 = tmp + "` right-hand side";
    tmp2 = ParseRule.Choice.reference(rhsKind, (rhs, _) => {
      return (lhs) => {
        return runtime.safeCall(compose(lhs, rhs))
      }
    }, tmp1);
    return ParseRule.Choice.keyword(keyword, tmp2)
  } 
  static makeBracketRule(opening, closing, contentKind, wrapContent) {
    let tmp, tmp1, tmp2, tmp3, tmp4;
    tmp = (tree, end) => {
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
    };
    tmp1 = contentKind + " in bracket";
    tmp2 = ParseRule.Choice.end(Tree.empty);
    tmp3 = ParseRule.Choice.keyword(closing, tmp2);
    tmp4 = ParseRule.Choice.reference(contentKind, tmp, tmp1, tmp3);
    return ParseRule.Choice.keyword(opening, tmp4)
  }
  static toString() { return "Rules"; }
};
let Rules = Rules1; export default Rules;
