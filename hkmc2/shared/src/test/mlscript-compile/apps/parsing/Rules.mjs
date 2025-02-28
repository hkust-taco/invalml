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
    let tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20, tmp21, tmp22, tmp23, tmp24, tmp25, tmp26, tmp27, tmp28, tmp29, tmp30, tmp31, tmp32, tmp33, tmp34, tmp35, tmp36, tmp37, tmp38, tmp39, tmp40, tmp41, tmp42, tmp43, tmp44, tmp45, tmp46, tmp47, tmp48, tmp49, tmp50, tmp51, tmp52, tmp53, tmp54, tmp55, tmp56, tmp57, tmp58, tmp59, tmp60, tmp61, tmp62, tmp63, tmp64, tmp65, tmp66, tmp67, tmp68, tmp69, tmp70, tmp71, tmp72, tmp73, tmp74, tmp75, tmp76, tmp77, tmp78, tmp79, tmp80, tmp81, tmp82, tmp83, tmp84, tmp85, tmp86, tmp87, tmp88, tmp89, tmp90, tmp91, tmp92, tmp93, tmp94, tmp95, tmp96, tmp97, tmp98, tmp99, tmp100, tmp101, tmp102, tmp103, tmp104, tmp105, tmp106, tmp107, tmp108, tmp109, tmp110, tmp111, tmp112, tmp113, tmp114, tmp115, tmp116, tmp117, tmp118, tmp119, tmp120, tmp121, tmp122, tmp123, tmp124, tmp125, tmp126, tmp127, tmp128, tmp129, tmp130, tmp131, tmp132, tmp133, tmp134, tmp135, tmp136, tmp137, tmp138, tmp139, tmp140, tmp141, tmp142, tmp143, tmp144, tmp145, tmp146, tmp147, tmp148, tmp149, tmp150, tmp151, tmp152, tmp153, tmp154, tmp155, tmp156, tmp157, tmp158, tmp159, tmp160, tmp161, tmp162, tmp163, tmp164, tmp165, tmp166, tmp167, tmp168, tmp169, tmp170, tmp171, tmp172, tmp173, tmp174, tmp175, tmp176, tmp177, tmp178, tmp179, tmp180, tmp181, tmp182, tmp183, tmp184, tmp185, tmp186, tmp187, tmp188, tmp189, tmp190, tmp191;
    tmp = new BetterMap.Map();
    this.syntaxKinds = tmp;
    tmp1 = (lhs, rhsBindings) => {
      let first1, first0, rhs, bindings, tmp192;
      if (globalThis.Array.isArray(rhsBindings) && rhsBindings.length === 2) {
        first0 = rhsBindings[0];
        first1 = rhsBindings[1];
        rhs = first0;
        bindings = first1;
        tmp192 = Tree.Infix(Precedence.Keywords._equal, lhs, rhs);
        return Stack.Cons(tmp192, bindings)
      } else {
        throw new globalThis.Error("match error");
      }
    };
    tmp2 = ParseRule.Choice.end(Stack.Nil);
    tmp3 = ParseRule.Choice.reference("let-bindings", (tail, _) => {
      return tail
    }, "let-bindings tail");
    tmp4 = ParseRule.Choice.keyword(Precedence.Keywords._and, tmp3);
    tmp5 = ParseRule.Choice.term((rhs, tail) => {
      return [
        rhs,
        tail
      ]
    }, "right-hand side", tmp2, tmp4);
    tmp6 = ParseRule.Choice.keyword(Precedence.Keywords._equal, tmp5);
    tmp7 = ParseRule.Choice.term(tmp1, "left-hand side", tmp6);
    tmp8 = Rules.defineKind("let-bindings", tmp7);
    tmp9 = Rules.makeLetBindings(true);
    Rules.#letExpression = tmp9;
    tmp10 = ParseRule.Choice.end(Option.None);
    tmp11 = ParseRule.Choice.term((body, _) => {
      return body
    }, "function body", tmp10);
    tmp12 = ParseRule.Choice.keyword(Precedence.Keywords._thinArrow, tmp11);
    tmp13 = ParseRule.Choice.term((params, body) => {
      let tmp192;
      tmp192 = Stack.Cons(params, Stack.Nil);
      return Tree.Lambda(tmp192, body)
    }, "function parameters", tmp12);
    tmp14 = ParseRule.Choice.keyword(Precedence.Keywords._fun, tmp13);
    Rules.#funTerm = tmp14;
    tmp15 = (lhs, rhsTail) => {
      let first1, first0, rhs, tail, tmp192;
      if (globalThis.Array.isArray(rhsTail) && rhsTail.length === 2) {
        first0 = rhsTail[0];
        first1 = rhsTail[1];
        rhs = first0;
        tail = first1;
        tmp192 = Tree.Infix(Precedence.Keywords._thinArrow, lhs, rhs);
        return Stack.Cons(tmp192, tail)
      } else {
        throw new globalThis.Error("match error");
      }
    };
    tmp16 = ParseRule.Choice.end(Stack.Nil);
    tmp17 = ParseRule.Choice.reference("simple-matching", (tail, _) => {
      return tail
    }, "simple-matching tail");
    tmp18 = ParseRule.Choice.keyword(Precedence.Keywords._bar, tmp17);
    tmp19 = ParseRule.Choice.term((rhs, tail) => {
      return [
        rhs,
        tail
      ]
    }, "rhs", tmp16, tmp18);
    tmp20 = ParseRule.Choice.keyword(Precedence.Keywords._thinArrow, tmp19);
    tmp21 = ParseRule.Choice.term(tmp15, "pattern", tmp20);
    tmp22 = Rules.defineKind("simple-matching", tmp21);
    tmp23 = ParseRule.Choice.reference("pattern-list", (tail, _) => {
      return tail
    }, "pattern list tail");
    tmp24 = ParseRule.Choice.term((head, tail) => {
      return Stack.Cons(head, tail)
    }, "pattern", tmp23);
    tmp25 = Rules.defineKind("pattern-list", tmp24);
    tmp26 = Tree.infix(Precedence.Keywords._thinArrow);
    tmp27 = ParseRule.Choice.end(Stack.Nil);
    tmp28 = ParseRule.Choice.reference("multiple-matching", (tail, _) => {
      return tail
    }, "multiple-matching tail");
    tmp29 = ParseRule.Choice.keyword(Precedence.Keywords._bar, tmp28);
    tmp30 = ParseRule.Choice.term((rhs, _) => {
      return rhs
    }, "the right-hand side of the arrow", tmp27, tmp29);
    tmp31 = ParseRule.Choice.keyword(Precedence.Keywords._thinArrow, tmp30);
    tmp32 = ParseRule.Choice.reference("pattern-list", tmp26, "the list of patterns", tmp31);
    tmp33 = Rules.defineKind("multiple-matching", tmp32);
    tmp34 = (lhs, rhs) => {
      let param0, tail, tmp192, tmp193, tmp194;
      if (rhs instanceof Tree.Tuple.class) {
        param0 = rhs.trees;
        tail = param0;
        tmp192 = Stack.Cons(lhs, tail);
        return Tree.Tuple(tmp192)
      } else {
        tmp193 = Stack.Cons(rhs, Stack.Nil);
        tmp194 = Stack.Cons(lhs, tmp193);
        return Tree.Tuple(tmp194)
      }
    };
    tmp35 = Rules.makeInfixChoice(Precedence.Keywords._comma, "term", tmp34);
    tmp36 = (lhs, rhs) => {
      let param0, tail, tmp192, tmp193, tmp194;
      if (rhs instanceof Tree.Sequence.class) {
        param0 = rhs.trees;
        tail = param0;
        tmp192 = Stack.Cons(lhs, tail);
        return Tree.Sequence(tmp192)
      } else {
        tmp193 = Stack.Cons(rhs, Stack.Nil);
        tmp194 = Stack.Cons(lhs, tmp193);
        return Tree.Sequence(tmp194)
      }
    };
    tmp37 = Rules.makeInfixChoice(Precedence.Keywords._semicolon, "term", tmp36);
    tmp38 = Rules.makeInfixChoice(Precedence.Keywords._leftArrow, "term", (lhs, rhs) => {
      return Tree.Infix(Precedence.Keywords._leftArrow, lhs, rhs)
    });
    tmp39 = Rules.makeInfixChoice(Precedence.Keywords._equalequal, "term", (lhs, rhs) => {
      return Tree.Infix(Precedence.Keywords._equalequal, lhs, rhs)
    });
    tmp40 = (lhs, rhs) => {
      let tmp192, tmp193, tmp194;
      tmp192 = Tree.Ident("*", true);
      tmp193 = Stack.Cons(rhs, Stack.Nil);
      tmp194 = Stack.Cons(lhs, tmp193);
      return Tree.App(tmp192, tmp194)
    };
    tmp41 = Rules.makeInfixChoice(Precedence.Keywords._asterisk, "term", tmp40);
    tmp42 = ParseRule.Choice.keyword(Precedence.Keywords._rightRound);
    tmp43 = ParseRule.Choice.term((argument, _) => {
      return (lhs) => {
        let tmp192;
        tmp192 = Tree.Bracketed(Token.Round, argument);
        return Tree.Infix(Precedence.Keywords._period, lhs, tmp192)
      }
    }, "application argument", tmp42);
    tmp44 = ParseRule.Choice.keyword(Precedence.Keywords._leftRound, tmp43);
    tmp45 = ParseRule.Choice.reference("term", (rhs, _) => {
      return (lhs) => {
        return Tree.Infix(Precedence.Keywords._period, lhs, rhs)
      }
    }, "operator `.` right-hand side");
    tmp46 = ParseRule.Choice.keyword(Precedence.Keywords._period, tmp44, tmp45);
    tmp47 = ParseRule.Choice.typeExpr((rhs, _) => {
      return (lhs) => {
        return Tree.Infix(Precedence.Keywords._colon, lhs, rhs)
      }
    }, "right-hand side type");
    tmp48 = ParseRule.Choice.keyword(Precedence.Keywords._colon, tmp47);
    tmp49 = Option.Some(Precedence.Keywords.appPrec);
    tmp50 = ParseRule.Choice.termWithPrec((argument, _) => {
      return (callee) => {
        return Tree.App(callee, argument)
      }
    }, "application argument", tmp49, Option.None);
    tmp51 = ParseRule.rule("infix rules for expressions", tmp35, tmp37, tmp38, tmp39, tmp41, tmp46, tmp48, tmp50);
    this.termInfixRule = tmp51;
    tmp52 = ParseRule.Choice.keyword(Precedence.Keywords._bar);
    tmp53 = ParseRule.rule("pattern matching case body", tmp52);
    tmp54 = Rules.getRuleByKind("simple-matching");
    tmp55 = ParseRule.Choice.optional(tmp53, tmp54);
    tmp56 = ParseRule.Choice.keyword(Precedence.Keywords._with, tmp55);
    tmp57 = ParseRule.Choice.term(Tree.Match, "pattern matching scrutinee", tmp56);
    tmp58 = ParseRule.Choice.keyword(Precedence.Keywords._match, tmp57);
    tmp59 = ParseRule.Choice.keyword(Precedence.Keywords._bar);
    tmp60 = ParseRule.rule("function body", tmp59);
    tmp61 = Rules.getRuleByKind("simple-matching");
    tmp62 = ParseRule.Choice.optional(tmp60, tmp61);
    tmp63 = ParseRule.Choice.map(tmp62, (branches) => {
      return Tree.Match(Tree.empty, branches)
    });
    tmp64 = ParseRule.Choice.keyword(Precedence.Keywords._function, tmp63);
    tmp65 = (tst, conAlt) => {
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
    tmp66 = ParseRule.Choice.end(Option.None);
    tmp67 = ParseRule.Choice.end(Option.None);
    tmp68 = ParseRule.Choice.term((alt, _) => {
      return Option.Some(alt)
    }, "if-then-else alternative", tmp67);
    tmp69 = ParseRule.Choice.keyword(Precedence.Keywords._else, tmp68);
    tmp70 = ParseRule.Choice.term((con, optAlt) => {
      return [
        con,
        optAlt
      ]
    }, "if-then-else consequent", tmp66, tmp69);
    tmp71 = ParseRule.Choice.keyword(Precedence.Keywords._then, tmp70);
    tmp72 = ParseRule.Choice.term(tmp65, "if-then-else condition", tmp71);
    tmp73 = ParseRule.Choice.keyword(Precedence.Keywords._if, tmp72);
    tmp74 = ParseRule.Choice.keyword(Precedence.Keywords._done);
    tmp75 = ParseRule.Choice.term((body, _) => {
      return body
    }, "while end", tmp74);
    tmp76 = ParseRule.Choice.keyword(Precedence.Keywords._do, tmp75);
    tmp77 = ParseRule.Choice.term(Tree.While, "while body", tmp76);
    tmp78 = ParseRule.Choice.keyword(Precedence.Keywords._while, tmp77);
    tmp79 = ParseRule.Choice.keyword(Precedence.Keywords._to);
    tmp80 = ParseRule.Choice.keyword(Precedence.Keywords._downto);
    tmp81 = ParseRule.rule("iteration keyword", tmp79, tmp80);
    tmp82 = ParseRule.Choice.keyword(Precedence.Keywords._done);
    tmp83 = ParseRule.Choice.term((body, _) => {
      return body
    }, "`for` `done` keyword", tmp82);
    tmp84 = ParseRule.Choice.keyword(Precedence.Keywords._do, tmp83);
    tmp85 = ParseRule.Choice.term((end, body) => {
      return [
        end,
        body
      ]
    }, "`for` `do` keyword", tmp84);
    tmp86 = ParseRule.rule("the iteration keyword", tmp85);
    tmp87 = ParseRule.Choice.siding(tmp81, tmp86);
    tmp88 = ParseRule.Choice.term((start, endBody) => {
      return [
        start,
        ...endBody
      ]
    }, "`for` `to` or `downto` keyword", tmp87);
    tmp89 = ParseRule.Choice.keyword(Precedence.Keywords._equal, tmp88);
    tmp90 = ParseRule.Choice.term((head, startEndBody) => {
      return Tree.For(head, ...startEndBody)
    }, "`for` head", tmp89);
    tmp91 = ParseRule.Choice.keyword(Precedence.Keywords._for, tmp90);
    tmp92 = Rules.makeBracketRule(Precedence.Keywords._leftRound, Precedence.Keywords._rightRound, "term", (tree) => {
      if (tree instanceof Tree.Empty.class) {
        return Tree.Tuple(Stack.Nil)
      } else {
        return tree
      }
    });
    tmp93 = (tree) => {
      let tmp192;
      if (tree instanceof Tree.Empty.class) {
        tmp192 = Tree.Sequence(Stack.Nil);
      } else {
        tmp192 = tree;
      }
      return Tree.Bracketed(Token.Square, tmp192)
    };
    tmp94 = Rules.makeBracketRule(Precedence.Keywords._leftSquare, Precedence.Keywords._rightSquare, "term", tmp93);
    tmp95 = Rules.makeBracketRule(Precedence.Keywords._leftCurly, Precedence.Keywords._rightCurly, "term", Predef.id);
    tmp96 = Rules.makeBracketRule(Precedence.Keywords._begin, Precedence.Keywords._end, "term", (tree) => {
      if (tree instanceof Tree.Empty.class) {
        return Tree.Sequence(Stack.Nil)
      } else {
        return tree
      }
    });
    tmp97 = ParseRule.Choice.Ref("term", (lhs, compose) => {
      return runtime.safeCall(compose(lhs))
    }, Option.None, Option.None, Rules.termInfixRule);
    tmp98 = ParseRule.rule("prefix rules for expressions", Rules.#letExpression, Rules.#funTerm, tmp58, tmp64, tmp73, tmp78, tmp91, tmp92, tmp94, tmp95, tmp96, tmp97);
    this.termRule = tmp98;
    tmp99 = Rules.makeInfixChoice(Precedence.Keywords._thinArrow, "type", (lhs, rhs) => {
      return Tree.Infix(Precedence.Keywords._thinArrow, lhs, rhs)
    });
    tmp100 = Rules.makeInfixChoice(Precedence.Keywords._asterisk, "type", (lhs, rhs) => {
      return Tree.Infix(Precedence.Keywords._asterisk, lhs, rhs)
    });
    tmp101 = Option.Some(Precedence.Keywords.appPrec);
    tmp102 = ParseRule.rule("end of type infix rules");
    tmp103 = ParseRule.Choice.Ref("type", (callee, _) => {
      return (argument) => {
        return Tree.App(callee, argument)
      }
    }, tmp101, Option.None, tmp102);
    tmp104 = ParseRule.rule("infix rules for types", tmp99, tmp100, tmp103);
    this.typeInfixRule = tmp104;
    tmp105 = (headArg, tailArgsCtor) => {
      let param0, ctor, first1, first0, tailArgs, ctor1, tmp192, tmp193;
      if (globalThis.Array.isArray(tailArgsCtor) && tailArgsCtor.length === 2) {
        first0 = tailArgsCtor[0];
        first1 = tailArgsCtor[1];
        tailArgs = first0;
        ctor1 = first1;
        tmp192 = Stack.Cons(headArg, tailArgs);
        tmp193 = Tree.Tuple(tmp192);
        return Tree.App(ctor1, tmp193)
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
    tmp106 = ParseRule.Choice.reference("ident", (ident, _) => {
      return Option.Some(ident)
    }, "the type constructor's name");
    tmp107 = ParseRule.Choice.keyword(Precedence.Keywords._rightRound, tmp106);
    tmp108 = ParseRule.Choice.reference("type-arguments-tail", (args, ident) => {
      return [
        args,
        ident
      ]
    }, "the remaining type arguments", tmp107);
    tmp109 = ParseRule.Choice.end(Option.None);
    tmp110 = ParseRule.Choice.reference("ident", (ident, _) => {
      return Option.Some(ident)
    }, "the type constructor's name");
    tmp111 = ParseRule.Choice.keyword(Precedence.Keywords._rightRound, tmp109, tmp110);
    tmp112 = ParseRule.Choice.reference("type", tmp105, "the first type in the parentheses", tmp108, tmp111);
    tmp113 = ParseRule.Choice.keyword(Precedence.Keywords._leftRound, tmp112);
    tmp114 = ParseRule.Choice.Ref("type", (lhs, compose) => {
      return runtime.safeCall(compose(lhs))
    }, Option.None, Option.None, Rules.typeInfixRule);
    tmp115 = ParseRule.rule("rules for types", tmp113, tmp114);
    this.typeRule = tmp115;
    tmp116 = ParseRule.Choice.end(Stack.Nil);
    tmp117 = ParseRule.Choice.reference("type-arguments-tail", (tail, _) => {
      return tail
    }, "more type arguments");
    tmp118 = ParseRule.Choice.reference("type", Stack.Cons, "the first type argument", tmp116, tmp117);
    tmp119 = ParseRule.Choice.keyword(Precedence.Keywords._comma, tmp118);
    tmp120 = Rules.defineKind("type-arguments-tail", tmp119);
    tmp121 = (ctor, argOpt) => {
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
    tmp122 = ParseRule.Choice.end(Option.None);
    tmp123 = ParseRule.Choice.reference("type", (argument, _) => {
      return Option.Some(argument)
    }, "the variant constructor's argument");
    tmp124 = ParseRule.Choice.keyword(Precedence.Keywords._of, tmp123);
    tmp125 = ParseRule.Choice.reference("ident", tmp121, "the variant constructor's name", tmp122, tmp124);
    tmp126 = Rules.defineKind("constr-decl", tmp125);
    tmp127 = (lhs, rhsOpt) => {
      let param0, rhs;
      if (rhsOpt instanceof Option.Some.class) {
        param0 = rhsOpt.value;
        rhs = param0;
        return Tree.Infix(Precedence.Keywords._bar, lhs, rhs)
      } else {
        return lhs
      }
    };
    tmp128 = ParseRule.Choice.end(Option.None);
    tmp129 = ParseRule.Choice.reference("variants", (more, _) => {
      return Option.Some(more)
    }, "variants end");
    tmp130 = ParseRule.Choice.keyword(Precedence.Keywords._bar, tmp129);
    tmp131 = ParseRule.Choice.reference("constr-decl", tmp127, "variants item", tmp128, tmp130);
    tmp132 = Rules.defineKind("variants", tmp131);
    tmp133 = (lhs, rhsMore) => {
      let first1, first0, rhs, more, tmp192;
      if (globalThis.Array.isArray(rhsMore) && rhsMore.length === 2) {
        first0 = rhsMore[0];
        first1 = rhsMore[1];
        rhs = first0;
        more = first1;
        tmp192 = runtime.safeCall(rhs(lhs));
        return Stack.Cons(tmp192, more)
      } else {
        throw new globalThis.Error("match error");
      }
    };
    tmp134 = ParseRule.Choice.end(Stack.Nil);
    tmp135 = ParseRule.Choice.reference("typedefs", (more, _) => {
      return more
    }, "typedef end");
    tmp136 = ParseRule.Choice.keyword(Precedence.Keywords._and, tmp135);
    tmp137 = ParseRule.Choice.reference("typedef-rhs", Predef.tuple, "typedef body", tmp134, tmp136);
    tmp138 = ParseRule.Choice.reference("typedef-lhs", tmp133, "typedef name", tmp137);
    tmp139 = Rules.defineKind("typedefs", tmp138);
    tmp140 = ParseRule.Choice.reference("variants", (rhs, _) => {
      return (lhs) => {
        return Tree.Infix(Precedence.Keywords._equal, lhs, rhs)
      }
    }, "typedef-rhs: variants");
    tmp141 = (content, _) => {
      let tmp192, tmp193;
      if (content instanceof Stack.Nil.class) {
        tmp192 = Tree.Sequence(Stack.Nil);
        return Tree.Bracketed(Token.Curly, tmp192)
      } else {
        tmp193 = Tree.Sequence(content);
        return Tree.Bracketed(Token.Curly, tmp193)
      }
    };
    tmp142 = ParseRule.Choice.end(Tree.empty);
    tmp143 = ParseRule.Choice.keyword(Precedence.Keywords._rightCurly, tmp142);
    tmp144 = ParseRule.Choice.reference("label-decls", tmp141, "label-decl", tmp143);
    tmp145 = ParseRule.Choice.keyword(Precedence.Keywords._leftCurly, tmp144);
    tmp146 = ParseRule.Choice.map(tmp145, (rhs) => {
      return (lhs) => {
        return Tree.Infix(Precedence.Keywords._equal, lhs, rhs)
      }
    });
    tmp147 = ParseRule.Choice.keyword(Precedence.Keywords._equal, tmp140, tmp146);
    tmp148 = ParseRule.Choice.reference("type", (rhs, _) => {
      return (lhs) => {
        return Tree.Infix(Precedence.Keywords._equalequal, lhs, rhs)
      }
    }, "type alias body");
    tmp149 = ParseRule.Choice.keyword(Precedence.Keywords._equalequal, tmp148);
    tmp150 = Rules.defineKind("typedef-rhs", tmp147, tmp149);
    tmp151 = Tree.infix(Precedence.Keywords._colon);
    tmp152 = ParseRule.Choice.typeExpr((rhs, _) => {
      return rhs
    }, "label-decl body");
    tmp153 = ParseRule.Choice.keyword(Precedence.Keywords._colon, tmp152);
    tmp154 = ParseRule.Choice.typeExpr(tmp151, "label-decl name", tmp153);
    tmp155 = Rules.defineKind("label-decl", tmp154);
    tmp156 = ParseRule.Choice.end(Stack.Nil);
    tmp157 = ParseRule.Choice.reference("label-decls", (more, _) => {
      return more
    }, "more label-decls");
    tmp158 = ParseRule.Choice.keyword(Precedence.Keywords._semicolon, tmp157);
    tmp159 = ParseRule.Choice.reference("label-decl", Stack.Cons, "the first label-decl", tmp156, tmp158);
    tmp160 = Rules.defineKind("label-decls", tmp159);
    tmp161 = ParseRule.Choice.end(Stack.Nil);
    tmp162 = ParseRule.Choice.reference("constr-decls", (tail, _) => {
      return tail
    }, "more constructor declarations");
    tmp163 = ParseRule.Choice.keyword(Precedence.Keywords._bar, tmp162);
    tmp164 = ParseRule.Choice.reference("constr-decl", Stack.Cons, "the first constructor declaration", tmp161, tmp163);
    tmp165 = Rules.defineKind("constr-decls", tmp164);
    tmp166 = (params, ident) => {
      let tmp192;
      if (params instanceof Stack.Nil.class) {
        return ident
      } else {
        tmp192 = Tree.Tuple(params);
        return Tree.App(ident, tmp192)
      }
    };
    tmp167 = ParseRule.Choice.reference("ident", (ident, _) => {
      return ident
    }, "the type identifier");
    tmp168 = ParseRule.Choice.reference("type-params", tmp166, "the type parameters", tmp167);
    tmp169 = Rules.defineKind("typedef-lhs", tmp168);
    tmp170 = ParseRule.Choice.reference("typevar", (head, _) => {
      return Stack.Cons(head, Stack.Nil)
    }, "the only type parameter");
    tmp171 = ParseRule.Choice.keyword(Precedence.Keywords._rightRound);
    tmp172 = ParseRule.Choice.reference("type-params-tail", (tail, _) => {
      return tail
    }, "more type parameters", tmp171);
    tmp173 = ParseRule.Choice.reference("typevar", Stack.Cons, "the first type parameter", tmp172);
    tmp174 = ParseRule.Choice.keyword(Precedence.Keywords._leftRound, tmp173);
    tmp175 = ParseRule.Choice.end(Stack.Nil);
    tmp176 = Rules.defineKind("type-params", tmp170, tmp174, tmp175);
    tmp177 = ParseRule.Choice.end(Stack.Nil);
    tmp178 = ParseRule.Choice.end(runtime.Unit);
    tmp179 = ParseRule.Choice.reference("type-params-tail", (tail, _) => {
      return tail
    }, "more type parameters", tmp178);
    tmp180 = ParseRule.Choice.reference("typevar", Stack.Cons, "the first type parameter", tmp179);
    tmp181 = ParseRule.Choice.keyword(Precedence.Keywords._comma, tmp180);
    tmp182 = Rules.defineKind("type-params-tail", tmp177, tmp181);
    tmp183 = Rules.makeLetBindings(false);
    tmp184 = ParseRule.Choice.reference("typedefs", (typedefs, _) => {
      return Tree.Define(Tree.DefineKind.Type, typedefs)
    }, "more typedefs");
    tmp185 = ParseRule.Choice.keyword(Precedence.Keywords._type, tmp184);
    tmp186 = ParseRule.Choice.reference("constr-decls", (decls, _) => {
      return Tree.Define(Tree.DefineKind.Exception, decls)
    }, "constructor declarations");
    tmp187 = ParseRule.Choice.keyword(Precedence.Keywords._exception, tmp186);
    tmp188 = ParseRule.Choice.reference("term", (body, _) => {
      return body
    }, "directive body");
    tmp189 = ParseRule.Choice.reference("ident", (ident, body) => {
      let tmp192;
      tmp192 = Stack.Cons([
        ident,
        body
      ], Stack.Nil);
      return Tree.Define(Tree.DefineKind.Directive, tmp192)
    }, "directive name", tmp188);
    tmp190 = ParseRule.Choice.keyword(Precedence.Keywords._hash, tmp189);
    tmp191 = ParseRule.rule("prefix rules for module items", tmp183, tmp185, tmp187, tmp190);
    this.declRule = tmp191;
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
