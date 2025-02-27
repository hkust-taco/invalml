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
    let tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20, tmp21, tmp22, tmp23, tmp24, tmp25, tmp26, tmp27, tmp28, tmp29, tmp30, tmp31, tmp32, tmp33, tmp34, tmp35, tmp36, tmp37, tmp38, tmp39, tmp40, tmp41, tmp42, tmp43, tmp44, tmp45, tmp46, tmp47, tmp48, tmp49, tmp50, tmp51, tmp52, tmp53, tmp54, tmp55, tmp56, tmp57, tmp58, tmp59, tmp60, tmp61, tmp62, tmp63, tmp64, tmp65, tmp66, tmp67, tmp68, tmp69, tmp70, tmp71, tmp72, tmp73, tmp74, tmp75, tmp76, tmp77, tmp78, tmp79, tmp80, tmp81, tmp82, tmp83, tmp84, tmp85, tmp86, tmp87, tmp88, tmp89, tmp90, tmp91, tmp92, tmp93, tmp94, tmp95, tmp96, tmp97, tmp98, tmp99, tmp100, tmp101, tmp102, tmp103, tmp104, tmp105, tmp106, tmp107, tmp108, tmp109, tmp110, tmp111, tmp112, tmp113, tmp114, tmp115, tmp116, tmp117, tmp118, tmp119, tmp120, tmp121, tmp122, tmp123, tmp124, tmp125, tmp126, tmp127, tmp128, tmp129, tmp130, tmp131, tmp132, tmp133, tmp134, tmp135, tmp136, tmp137, tmp138, tmp139, tmp140, tmp141, tmp142, tmp143, tmp144, tmp145, tmp146, tmp147, tmp148, tmp149, tmp150, tmp151, tmp152, tmp153, tmp154, tmp155, tmp156, tmp157, tmp158, tmp159, tmp160, tmp161, tmp162, tmp163, tmp164, tmp165, tmp166, tmp167, tmp168, tmp169, tmp170, tmp171, tmp172, tmp173, tmp174, tmp175, tmp176, tmp177, tmp178, tmp179, tmp180, tmp181, tmp182, tmp183, tmp184, tmp185, tmp186, tmp187, tmp188, tmp189;
    tmp = new BetterMap.Map();
    this.syntaxKinds = tmp;
    tmp1 = (lhs, rhsBindings) => {
      let first1, first0, rhs, bindings, tmp190;
      if (globalThis.Array.isArray(rhsBindings) && rhsBindings.length === 2) {
        first0 = rhsBindings[0];
        first1 = rhsBindings[1];
        rhs = first0;
        bindings = first1;
        tmp190 = Tree.Infix(Precedence.Keywords._equal, lhs, rhs);
        return Stack.Cons(tmp190, bindings)
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
      let tmp190;
      tmp190 = Stack.Cons(params, Stack.Nil);
      return Tree.Lambda(tmp190, body)
    }, "function parameters", tmp12);
    tmp14 = ParseRule.Choice.keyword(Precedence.Keywords._fun, tmp13);
    Rules.#funTerm = tmp14;
    tmp15 = (lhs, rhsTail) => {
      let first1, first0, rhs, tail, tmp190;
      if (globalThis.Array.isArray(rhsTail) && rhsTail.length === 2) {
        first0 = rhsTail[0];
        first1 = rhsTail[1];
        rhs = first0;
        tail = first1;
        tmp190 = Tree.Infix(Precedence.Keywords._thinArrow, lhs, rhs);
        return Stack.Cons(tmp190, tail)
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
      let param0, tail, tmp190, tmp191, tmp192;
      if (rhs instanceof Tree.Tuple.class) {
        param0 = rhs.trees;
        tail = param0;
        tmp190 = Stack.Cons(lhs, tail);
        return Tree.Tuple(tmp190)
      } else {
        tmp191 = Stack.Cons(rhs, Stack.Nil);
        tmp192 = Stack.Cons(lhs, tmp191);
        return Tree.Tuple(tmp192)
      }
    };
    tmp35 = Rules.makeInfixChoice(Precedence.Keywords._comma, "term", tmp34);
    tmp36 = (lhs, rhs) => {
      let param0, tail, tmp190, tmp191, tmp192;
      if (rhs instanceof Tree.Sequence.class) {
        param0 = rhs.trees;
        tail = param0;
        tmp190 = Stack.Cons(lhs, tail);
        return Tree.Sequence(tmp190)
      } else {
        tmp191 = Stack.Cons(rhs, Stack.Nil);
        tmp192 = Stack.Cons(lhs, tmp191);
        return Tree.Sequence(tmp192)
      }
    };
    tmp37 = Rules.makeInfixChoice(Precedence.Keywords._semicolon, "term", tmp36);
    tmp38 = Rules.makeInfixChoice(Precedence.Keywords._leftArrow, "term", (lhs, rhs) => {
      return Tree.Infix(Precedence.Keywords._leftArrow, lhs, rhs)
    });
    tmp39 = Rules.makeInfixChoice(Precedence.Keywords._equalequal, "term", (lhs, rhs) => {
      return Tree.Infix(Precedence.Keywords._equalequal, lhs, rhs)
    });
    tmp40 = ParseRule.Choice.keyword(Precedence.Keywords._rightRound);
    tmp41 = ParseRule.Choice.term((argument, _) => {
      return (lhs) => {
        let tmp190;
        tmp190 = Tree.Bracketed(Token.Round, argument);
        return Tree.Infix(Precedence.Keywords._period, lhs, tmp190)
      }
    }, "application argument", tmp40);
    tmp42 = ParseRule.Choice.keyword(Precedence.Keywords._leftRound, tmp41);
    tmp43 = ParseRule.Choice.reference("term", (rhs, _) => {
      return (lhs) => {
        return Tree.Infix(Precedence.Keywords._period, lhs, rhs)
      }
    }, "operator `.` right-hand side");
    tmp44 = ParseRule.Choice.keyword(Precedence.Keywords._period, tmp42, tmp43);
    tmp45 = ParseRule.Choice.typeExpr((rhs, _) => {
      return (lhs) => {
        return Tree.Infix(Precedence.Keywords._colon, lhs, rhs)
      }
    }, "right-hand side type");
    tmp46 = ParseRule.Choice.keyword(Precedence.Keywords._colon, tmp45);
    tmp47 = Option.Some(Precedence.Keywords.appPrec);
    tmp48 = ParseRule.Choice.termWithPrec((argument, _) => {
      return (callee) => {
        return Tree.App(callee, argument)
      }
    }, "application argument", tmp47, Option.None);
    tmp49 = ParseRule.rule("infix rules for expressions", tmp35, tmp37, tmp38, tmp39, tmp44, tmp46, tmp48);
    this.termInfixRule = tmp49;
    tmp50 = ParseRule.Choice.keyword(Precedence.Keywords._bar);
    tmp51 = ParseRule.rule("pattern matching case body", tmp50);
    tmp52 = Rules.getRuleByKind("simple-matching");
    tmp53 = ParseRule.Choice.optional(tmp51, tmp52);
    tmp54 = ParseRule.Choice.keyword(Precedence.Keywords._with, tmp53);
    tmp55 = ParseRule.Choice.term(Tree.Match, "pattern matching scrutinee", tmp54);
    tmp56 = ParseRule.Choice.keyword(Precedence.Keywords._match, tmp55);
    tmp57 = ParseRule.Choice.keyword(Precedence.Keywords._bar);
    tmp58 = ParseRule.rule("function body", tmp57);
    tmp59 = Rules.getRuleByKind("simple-matching");
    tmp60 = ParseRule.Choice.optional(tmp58, tmp59);
    tmp61 = ParseRule.Choice.map(tmp60, (branches) => {
      return Tree.Match(Tree.empty, branches)
    });
    tmp62 = ParseRule.Choice.keyword(Precedence.Keywords._function, tmp61);
    tmp63 = (tst, conAlt) => {
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
    tmp64 = ParseRule.Choice.end(Option.None);
    tmp65 = ParseRule.Choice.end(Option.None);
    tmp66 = ParseRule.Choice.term((alt, _) => {
      return Option.Some(alt)
    }, "if-then-else alternative", tmp65);
    tmp67 = ParseRule.Choice.keyword(Precedence.Keywords._else, tmp66);
    tmp68 = ParseRule.Choice.term((con, optAlt) => {
      return [
        con,
        optAlt
      ]
    }, "if-then-else consequent", tmp64, tmp67);
    tmp69 = ParseRule.Choice.keyword(Precedence.Keywords._then, tmp68);
    tmp70 = ParseRule.Choice.term(tmp63, "if-then-else condition", tmp69);
    tmp71 = ParseRule.Choice.keyword(Precedence.Keywords._if, tmp70);
    tmp72 = ParseRule.Choice.keyword(Precedence.Keywords._done);
    tmp73 = ParseRule.Choice.term((body, _) => {
      return body
    }, "while end", tmp72);
    tmp74 = ParseRule.Choice.keyword(Precedence.Keywords._do, tmp73);
    tmp75 = ParseRule.Choice.term(Tree.While, "while body", tmp74);
    tmp76 = ParseRule.Choice.keyword(Precedence.Keywords._while, tmp75);
    tmp77 = ParseRule.Choice.keyword(Precedence.Keywords._to);
    tmp78 = ParseRule.Choice.keyword(Precedence.Keywords._downto);
    tmp79 = ParseRule.rule("iteration keyword", tmp77, tmp78);
    tmp80 = ParseRule.Choice.keyword(Precedence.Keywords._done);
    tmp81 = ParseRule.Choice.term((body, _) => {
      return body
    }, "`for` `done` keyword", tmp80);
    tmp82 = ParseRule.Choice.keyword(Precedence.Keywords._do, tmp81);
    tmp83 = ParseRule.Choice.term((end, body) => {
      return [
        end,
        body
      ]
    }, "`for` `do` keyword", tmp82);
    tmp84 = ParseRule.rule("the iteration keyword", tmp83);
    tmp85 = ParseRule.Choice.siding(tmp79, tmp84);
    tmp86 = ParseRule.Choice.term((start, endBody) => {
      return [
        start,
        ...endBody
      ]
    }, "`for` `to` or `downto` keyword", tmp85);
    tmp87 = ParseRule.Choice.keyword(Precedence.Keywords._equal, tmp86);
    tmp88 = ParseRule.Choice.term((head, startEndBody) => {
      return Tree.For(head, ...startEndBody)
    }, "`for` head", tmp87);
    tmp89 = ParseRule.Choice.keyword(Precedence.Keywords._for, tmp88);
    tmp90 = Rules.makeBracketRule(Precedence.Keywords._leftRound, Precedence.Keywords._rightRound, "term", (tree) => {
      if (tree instanceof Tree.Empty.class) {
        return Tree.Tuple(Stack.Nil)
      } else {
        return tree
      }
    });
    tmp91 = (tree) => {
      let tmp190;
      if (tree instanceof Tree.Empty.class) {
        tmp190 = Tree.Sequence(Stack.Nil);
      } else {
        tmp190 = tree;
      }
      return Tree.Bracketed(Token.Square, tmp190)
    };
    tmp92 = Rules.makeBracketRule(Precedence.Keywords._leftSquare, Precedence.Keywords._rightSquare, "term", tmp91);
    tmp93 = Rules.makeBracketRule(Precedence.Keywords._leftCurly, Precedence.Keywords._rightCurly, "term", Predef.id);
    tmp94 = Rules.makeBracketRule(Precedence.Keywords._begin, Precedence.Keywords._end, "term", (tree) => {
      if (tree instanceof Tree.Empty.class) {
        return Tree.Sequence(Stack.Nil)
      } else {
        return tree
      }
    });
    tmp95 = ParseRule.Choice.Ref("term", (lhs, compose) => {
      return runtime.safeCall(compose(lhs))
    }, Option.None, Option.None, Rules.termInfixRule);
    tmp96 = ParseRule.rule("prefix rules for expressions", Rules.#letExpression, Rules.#funTerm, tmp56, tmp62, tmp71, tmp76, tmp89, tmp90, tmp92, tmp93, tmp94, tmp95);
    this.termRule = tmp96;
    tmp97 = Rules.makeInfixChoice(Precedence.TypeKeywords._arrow, "type", (lhs, rhs) => {
      return Tree.Infix(Precedence.TypeKeywords._arrow, lhs, rhs)
    });
    tmp98 = Rules.makeInfixChoice(Precedence.TypeKeywords._asterisk, "type", (lhs, rhs) => {
      return Tree.Infix(Precedence.TypeKeywords._asterisk, lhs, rhs)
    });
    tmp99 = Option.Some(Precedence.TypeKeywords.appPrec);
    tmp100 = ParseRule.rule("end of type infix rules");
    tmp101 = ParseRule.Choice.Ref("type", (callee, _) => {
      return (argument) => {
        return Tree.App(callee, argument)
      }
    }, tmp99, Option.None, tmp100);
    tmp102 = ParseRule.rule("infix rules for types", tmp97, tmp98, tmp101);
    this.typeInfixRule = tmp102;
    tmp103 = (headArg, tailArgsCtor) => {
      let param0, ctor, first1, first0, tailArgs, ctor1, tmp190, tmp191;
      if (globalThis.Array.isArray(tailArgsCtor) && tailArgsCtor.length === 2) {
        first0 = tailArgsCtor[0];
        first1 = tailArgsCtor[1];
        tailArgs = first0;
        ctor1 = first1;
        tmp190 = Stack.Cons(headArg, tailArgs);
        tmp191 = Tree.Tuple(tmp190);
        return Tree.App(ctor1, tmp191)
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
    tmp104 = ParseRule.Choice.reference("ident", (ident, _) => {
      return Option.Some(ident)
    }, "the type constructor's name");
    tmp105 = ParseRule.Choice.keyword(Precedence.Keywords._rightRound, tmp104);
    tmp106 = ParseRule.Choice.reference("type-arguments-tail", (args, ident) => {
      return [
        args,
        ident
      ]
    }, "the remaining type arguments", tmp105);
    tmp107 = ParseRule.Choice.end(Option.None);
    tmp108 = ParseRule.Choice.reference("ident", (ident, _) => {
      return Option.Some(ident)
    }, "the type constructor's name");
    tmp109 = ParseRule.Choice.keyword(Precedence.Keywords._rightRound, tmp107, tmp108);
    tmp110 = ParseRule.Choice.reference("type", tmp103, "the first type in the parentheses", tmp106, tmp109);
    tmp111 = ParseRule.Choice.keyword(Precedence.Keywords._leftRound, tmp110);
    tmp112 = ParseRule.Choice.Ref("type", (lhs, compose) => {
      return runtime.safeCall(compose(lhs))
    }, Option.None, Option.None, Rules.typeInfixRule);
    tmp113 = ParseRule.rule("rules for types", tmp111, tmp112);
    this.typeRule = tmp113;
    tmp114 = ParseRule.Choice.end(Stack.Nil);
    tmp115 = ParseRule.Choice.reference("type-arguments-tail", (tail, _) => {
      return tail
    }, "more type arguments");
    tmp116 = ParseRule.Choice.reference("type", Stack.Cons, "the first type argument", tmp114, tmp115);
    tmp117 = ParseRule.Choice.keyword(Precedence.Keywords._comma, tmp116);
    tmp118 = Rules.defineKind("type-arguments-tail", tmp117);
    tmp119 = (ctor, argOpt) => {
      let param0, arg;
      if (argOpt instanceof Option.Some.class) {
        param0 = argOpt.value;
        arg = param0;
        return Tree.Infix(Precedence.TypeKeywords._of, ctor, arg)
      } else if (argOpt instanceof Option.None.class) {
        return ctor
      } else {
        throw new globalThis.Error("match error");
      }
    };
    tmp120 = ParseRule.Choice.end(Option.None);
    tmp121 = ParseRule.Choice.reference("type", (argument, _) => {
      return Option.Some(argument)
    }, "the variant constructor's argument");
    tmp122 = ParseRule.Choice.keyword(Precedence.Keywords._of, tmp121);
    tmp123 = ParseRule.Choice.reference("ident", tmp119, "the variant constructor's name", tmp120, tmp122);
    tmp124 = Rules.defineKind("constr-decl", tmp123);
    tmp125 = (lhs, rhsOpt) => {
      let param0, rhs;
      if (rhsOpt instanceof Option.Some.class) {
        param0 = rhsOpt.value;
        rhs = param0;
        return Tree.Infix(Precedence.Keywords._bar, lhs, rhs)
      } else {
        return lhs
      }
    };
    tmp126 = ParseRule.Choice.end(Option.None);
    tmp127 = ParseRule.Choice.reference("variants", (more, _) => {
      return Option.Some(more)
    }, "variants end");
    tmp128 = ParseRule.Choice.keyword(Precedence.Keywords._bar, tmp127);
    tmp129 = ParseRule.Choice.reference("constr-decl", tmp125, "variants item", tmp126, tmp128);
    tmp130 = Rules.defineKind("variants", tmp129);
    tmp131 = (lhs, rhsMore) => {
      let first1, first0, rhs, more, tmp190;
      if (globalThis.Array.isArray(rhsMore) && rhsMore.length === 2) {
        first0 = rhsMore[0];
        first1 = rhsMore[1];
        rhs = first0;
        more = first1;
        tmp190 = runtime.safeCall(rhs(lhs));
        return Stack.Cons(tmp190, more)
      } else {
        throw new globalThis.Error("match error");
      }
    };
    tmp132 = ParseRule.Choice.end(Stack.Nil);
    tmp133 = ParseRule.Choice.reference("typedefs", (more, _) => {
      return more
    }, "typedef end");
    tmp134 = ParseRule.Choice.keyword(Precedence.Keywords._and, tmp133);
    tmp135 = ParseRule.Choice.reference("typedef-rhs", Predef.tuple, "typedef body", tmp132, tmp134);
    tmp136 = ParseRule.Choice.reference("typedef-lhs", tmp131, "typedef name", tmp135);
    tmp137 = Rules.defineKind("typedefs", tmp136);
    tmp138 = ParseRule.Choice.reference("variants", (rhs, _) => {
      return (lhs) => {
        return Tree.Infix(Precedence.Keywords._equal, lhs, rhs)
      }
    }, "typedef-rhs: variants");
    tmp139 = (content, _) => {
      let tmp190, tmp191;
      if (content instanceof Stack.Nil.class) {
        tmp190 = Tree.Sequence(Stack.Nil);
        return Tree.Bracketed(Token.Curly, tmp190)
      } else {
        tmp191 = Tree.Sequence(content);
        return Tree.Bracketed(Token.Curly, tmp191)
      }
    };
    tmp140 = ParseRule.Choice.end(Tree.empty);
    tmp141 = ParseRule.Choice.keyword(Precedence.Keywords._rightCurly, tmp140);
    tmp142 = ParseRule.Choice.reference("label-decls", tmp139, "label-decl", tmp141);
    tmp143 = ParseRule.Choice.keyword(Precedence.Keywords._leftCurly, tmp142);
    tmp144 = ParseRule.Choice.map(tmp143, (rhs) => {
      return (lhs) => {
        return Tree.Infix(Precedence.Keywords._equal, lhs, rhs)
      }
    });
    tmp145 = ParseRule.Choice.keyword(Precedence.Keywords._equal, tmp138, tmp144);
    tmp146 = ParseRule.Choice.reference("type", (rhs, _) => {
      return (lhs) => {
        return Tree.Infix(Precedence.Keywords._equalequal, lhs, rhs)
      }
    }, "type alias body");
    tmp147 = ParseRule.Choice.keyword(Precedence.Keywords._equalequal, tmp146);
    tmp148 = Rules.defineKind("typedef-rhs", tmp145, tmp147);
    tmp149 = Tree.infix(Precedence.TypeKeywords._colon);
    tmp150 = ParseRule.Choice.typeExpr((rhs, _) => {
      return rhs
    }, "label-decl body");
    tmp151 = ParseRule.Choice.keyword(Precedence.TypeKeywords._colon, tmp150);
    tmp152 = ParseRule.Choice.typeExpr(tmp149, "label-decl name", tmp151);
    tmp153 = Rules.defineKind("label-decl", tmp152);
    tmp154 = ParseRule.Choice.end(Stack.Nil);
    tmp155 = ParseRule.Choice.reference("label-decls", (more, _) => {
      return more
    }, "more label-decls");
    tmp156 = ParseRule.Choice.keyword(Precedence.Keywords._semicolon, tmp155);
    tmp157 = ParseRule.Choice.reference("label-decl", Stack.Cons, "the first label-decl", tmp154, tmp156);
    tmp158 = Rules.defineKind("label-decls", tmp157);
    tmp159 = ParseRule.Choice.end(Stack.Nil);
    tmp160 = ParseRule.Choice.reference("constr-decls", (tail, _) => {
      return tail
    }, "more constructor declarations");
    tmp161 = ParseRule.Choice.keyword(Precedence.Keywords._bar, tmp160);
    tmp162 = ParseRule.Choice.reference("constr-decl", Stack.Cons, "the first constructor declaration", tmp159, tmp161);
    tmp163 = Rules.defineKind("constr-decls", tmp162);
    tmp164 = (params, ident) => {
      let tmp190;
      if (params instanceof Stack.Nil.class) {
        return ident
      } else {
        tmp190 = Tree.Tuple(params);
        return Tree.App(ident, tmp190)
      }
    };
    tmp165 = ParseRule.Choice.reference("ident", (ident, _) => {
      return ident
    }, "the type identifier");
    tmp166 = ParseRule.Choice.reference("type-params", tmp164, "the type parameters", tmp165);
    tmp167 = Rules.defineKind("typedef-lhs", tmp166);
    tmp168 = ParseRule.Choice.reference("typevar", (head, _) => {
      return Stack.Cons(head, Stack.Nil)
    }, "the only type parameter");
    tmp169 = ParseRule.Choice.keyword(Precedence.Keywords._rightRound);
    tmp170 = ParseRule.Choice.reference("type-params-tail", (tail, _) => {
      return tail
    }, "more type parameters", tmp169);
    tmp171 = ParseRule.Choice.reference("typevar", Stack.Cons, "the first type parameter", tmp170);
    tmp172 = ParseRule.Choice.keyword(Precedence.Keywords._leftRound, tmp171);
    tmp173 = ParseRule.Choice.end(Stack.Nil);
    tmp174 = Rules.defineKind("type-params", tmp168, tmp172, tmp173);
    tmp175 = ParseRule.Choice.end(Stack.Nil);
    tmp176 = ParseRule.Choice.end(runtime.Unit);
    tmp177 = ParseRule.Choice.reference("type-params-tail", (tail, _) => {
      return tail
    }, "more type parameters", tmp176);
    tmp178 = ParseRule.Choice.reference("typevar", Stack.Cons, "the first type parameter", tmp177);
    tmp179 = ParseRule.Choice.keyword(Precedence.Keywords._comma, tmp178);
    tmp180 = Rules.defineKind("type-params-tail", tmp175, tmp179);
    tmp181 = Rules.makeLetBindings(false);
    tmp182 = ParseRule.Choice.reference("typedefs", (typedefs, _) => {
      return Tree.Define(Tree.DefineKind.Type, typedefs)
    }, "more typedefs");
    tmp183 = ParseRule.Choice.keyword(Precedence.Keywords._type, tmp182);
    tmp184 = ParseRule.Choice.reference("constr-decls", (decls, _) => {
      return Tree.Define(Tree.DefineKind.Exception, decls)
    }, "constructor declarations");
    tmp185 = ParseRule.Choice.keyword(Precedence.Keywords._exception, tmp184);
    tmp186 = ParseRule.Choice.reference("term", (body, _) => {
      return body
    }, "directive body");
    tmp187 = ParseRule.Choice.reference("ident", (ident, body) => {
      let tmp190;
      tmp190 = Stack.Cons([
        ident,
        body
      ], Stack.Nil);
      return Tree.Define(Tree.DefineKind.Directive, tmp190)
    }, "directive name", tmp186);
    tmp188 = ParseRule.Choice.keyword(Precedence.Keywords._hash, tmp187);
    tmp189 = ParseRule.rule("prefix rules for module items", tmp181, tmp183, tmp185, tmp188);
    this.declRule = tmp189;
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
