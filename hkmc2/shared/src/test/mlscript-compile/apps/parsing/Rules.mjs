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
  static #ifThenElse;
  static #funTerm;
  static #matchTerm;
  static #functionTerm;
  static #whileTerm;
  static {
    let tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20, tmp21, tmp22, tmp23, tmp24, tmp25, tmp26, tmp27, tmp28, tmp29, tmp30, tmp31, tmp32, tmp33, tmp34, tmp35, tmp36, tmp37, tmp38, tmp39, tmp40, tmp41, tmp42, tmp43, tmp44, tmp45, tmp46, tmp47, tmp48, tmp49, tmp50, tmp51, tmp52, tmp53, tmp54, tmp55, tmp56, tmp57, tmp58, tmp59, tmp60, tmp61, tmp62, tmp63, tmp64, tmp65, tmp66, tmp67, tmp68, tmp69, tmp70, tmp71, tmp72, tmp73, tmp74, tmp75, tmp76, tmp77, tmp78, tmp79, tmp80, tmp81, tmp82, tmp83, tmp84, tmp85, tmp86, tmp87, tmp88, tmp89, tmp90, tmp91, tmp92, tmp93, tmp94, tmp95, tmp96, tmp97, tmp98, tmp99, tmp100, tmp101, tmp102, tmp103, tmp104, tmp105, tmp106, tmp107, tmp108, tmp109, tmp110, tmp111, tmp112, tmp113, tmp114, tmp115, tmp116, tmp117, tmp118, tmp119, tmp120, tmp121, tmp122, tmp123, tmp124, tmp125, tmp126, tmp127, tmp128, tmp129, tmp130, tmp131, tmp132, tmp133, tmp134, tmp135, tmp136, tmp137, tmp138, tmp139, tmp140, tmp141, tmp142, tmp143, tmp144, tmp145, tmp146, tmp147, tmp148, tmp149, tmp150, tmp151, tmp152, tmp153, tmp154, tmp155, tmp156, tmp157, tmp158;
    tmp = new BetterMap.Map();
    this.syntaxKinds = tmp;
    tmp1 = (lhs, rhsBindings) => {
      let first1, first0, rhs, bindings, tmp159;
      if (globalThis.Array.isArray(rhsBindings) && rhsBindings.length === 2) {
        first0 = rhsBindings[0];
        first1 = rhsBindings[1];
        rhs = first0;
        bindings = first1;
        tmp159 = Tree.Infix(Precedence.Keywords._equal, lhs, rhs);
        return Stack.Cons(tmp159, bindings)
      } else {
        throw new globalThis.Error("match error");
      }
    };
    tmp2 = ParseRule.Choice.end(Stack.Nil);
    tmp3 = ParseRule.Choice.end(runtime.Unit);
    tmp4 = ParseRule.Choice.reference("let-bindings", (tail, _) => {
      return tail
    }, "let-bindings tail", tmp3);
    tmp5 = ParseRule.Choice.keyword(Precedence.Keywords._and, "separator", tmp4);
    tmp6 = ParseRule.Choice.term((rhs, tail) => {
      return [
        rhs,
        tail
      ]
    }, "right-hand side", tmp2, tmp5);
    tmp7 = ParseRule.Choice.keyword(Precedence.Keywords._equal, "equal sign", tmp6);
    tmp8 = ParseRule.Choice.term(tmp1, "left-hand side", tmp7);
    tmp9 = Rules.defineKind("let-bindings", tmp8);
    tmp10 = Rules.makeLetBindings(true);
    Rules.#letExpression = tmp10;
    tmp11 = (tst, conAlt) => {
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
    tmp12 = ParseRule.Choice.end(Option.None);
    tmp13 = ParseRule.Choice.end(Option.None);
    tmp14 = ParseRule.Choice.term((alt, _) => {
      return Option.Some(alt)
    }, "if-then-else alternative", tmp13);
    tmp15 = ParseRule.Choice.keyword(Precedence.Keywords._else, "`else` keyword", tmp14);
    tmp16 = ParseRule.Choice.term((con, optAlt) => {
      return [
        con,
        optAlt
      ]
    }, "if-then-else consequent", tmp12, tmp15);
    tmp17 = ParseRule.Choice.keyword(Precedence.Keywords._then, "`then` keyword", tmp16);
    tmp18 = ParseRule.Choice.term(tmp11, "if-then-else condition", tmp17);
    tmp19 = ParseRule.Choice.keyword(Precedence.Keywords._if, "`if` keyword", tmp18);
    Rules.#ifThenElse = tmp19;
    tmp20 = ParseRule.Choice.end(Option.None);
    tmp21 = ParseRule.Choice.term((body, _) => {
      return body
    }, "function body", tmp20);
    tmp22 = ParseRule.Choice.keyword(Precedence.Keywords._thinArrow, "`->` operator", tmp21);
    tmp23 = ParseRule.Choice.term((params, body) => {
      let tmp159;
      tmp159 = Stack.Cons(params, Stack.Nil);
      return Tree.Lambda(tmp159, body)
    }, "function parameters", tmp22);
    tmp24 = ParseRule.Choice.keyword(Precedence.Keywords._fun, "`function` keyword", tmp23);
    Rules.#funTerm = tmp24;
    tmp25 = (lhs, rhsTail) => {
      let first1, first0, rhs, tail, tmp159;
      if (globalThis.Array.isArray(rhsTail) && rhsTail.length === 2) {
        first0 = rhsTail[0];
        first1 = rhsTail[1];
        rhs = first0;
        tail = first1;
        tmp159 = Tree.Infix(Precedence.Keywords._thinArrow, lhs, rhs);
        return Stack.Cons(tmp159, tail)
      } else {
        throw new globalThis.Error("match error");
      }
    };
    tmp26 = ParseRule.Choice.end(Stack.Nil);
    tmp27 = ParseRule.Choice.end(runtime.Unit);
    tmp28 = ParseRule.Choice.reference("simple-matching", (tail, _) => {
      return tail
    }, "simple-matching tail", tmp27);
    tmp29 = ParseRule.Choice.keyword(Precedence.Keywords._bar, "separator", tmp28);
    tmp30 = ParseRule.Choice.term((rhs, tail) => {
      return [
        rhs,
        tail
      ]
    }, "rhs", tmp26, tmp29);
    tmp31 = ParseRule.Choice.keyword(Precedence.Keywords._thinArrow, "arrow", tmp30);
    tmp32 = ParseRule.Choice.term(tmp25, "pattern", tmp31);
    tmp33 = Rules.defineKind("simple-matching", tmp32);
    tmp34 = ParseRule.Choice.end(runtime.Unit);
    tmp35 = ParseRule.Choice.reference("pattern-list", (tail, _) => {
      return tail
    }, "pattern list tail", tmp34);
    tmp36 = ParseRule.Choice.term((head, tail) => {
      return Stack.Cons(head, tail)
    }, "pattern", tmp35);
    tmp37 = Rules.defineKind("pattern-list", tmp36);
    tmp38 = Tree.infix(Precedence.Keywords._thinArrow);
    tmp39 = ParseRule.Choice.end(Stack.Nil);
    tmp40 = ParseRule.Choice.end(runtime.Unit);
    tmp41 = ParseRule.Choice.reference("multiple-matching", (tail, _) => {
      return tail
    }, "multiple-matching tail", tmp40);
    tmp42 = ParseRule.Choice.keyword(Precedence.Keywords._bar, "separator", tmp41);
    tmp43 = ParseRule.Choice.term((rhs, _) => {
      return rhs
    }, "the right-hand side of the arrow", tmp39, tmp42);
    tmp44 = ParseRule.Choice.keyword(Precedence.Keywords._thinArrow, "the arrow symbol", tmp43);
    tmp45 = ParseRule.Choice.reference("pattern-list", tmp38, "the list of patterns", tmp44);
    tmp46 = Rules.defineKind("multiple-matching", tmp45);
    tmp47 = ParseRule.Choice.end(runtime.Unit);
    tmp48 = ParseRule.Choice.keyword(Precedence.Keywords._bar, "`|` separator", tmp47);
    tmp49 = ParseRule.rule("pattern matching case body", tmp48);
    tmp50 = Rules.getRuleByKind("simple-matching");
    tmp51 = ParseRule.Choice.Optional(tmp49, tmp50);
    tmp52 = ParseRule.Choice.keyword(Precedence.Keywords._with, "`with` keyword", tmp51);
    tmp53 = ParseRule.Choice.term((scrutinee, branches) => {
      return Tree.Match(scrutinee, branches)
    }, "pattern matching scrutinee", tmp52);
    tmp54 = ParseRule.Choice.keyword(Precedence.Keywords._match, "`match` keyword", tmp53);
    Rules.#matchTerm = tmp54;
    tmp55 = ParseRule.Choice.end(runtime.Unit);
    tmp56 = ParseRule.Choice.keyword(Precedence.Keywords._bar, "`|` separator", tmp55);
    tmp57 = ParseRule.rule("function body", tmp56);
    tmp58 = Rules.getRuleByKind("simple-matching");
    tmp59 = ParseRule.Choice.Optional(tmp57, tmp58);
    tmp60 = ParseRule.Choice.map(tmp59, (branches) => {
      return Tree.Match(Tree.empty, branches)
    });
    tmp61 = ParseRule.Choice.keyword(Precedence.Keywords._function, "`function` keyword", tmp60);
    Rules.#functionTerm = tmp61;
    tmp62 = ParseRule.Choice.end(runtime.Unit);
    tmp63 = ParseRule.Choice.keyword(Precedence.Keywords._done, "while end", tmp62);
    tmp64 = ParseRule.Choice.term((body, _) => {
      return body
    }, "while end", tmp63);
    tmp65 = ParseRule.Choice.keyword(Precedence.Keywords._do, "while body", tmp64);
    tmp66 = ParseRule.Choice.term(Tree.While, "while body", tmp65);
    tmp67 = ParseRule.Choice.keyword(Precedence.Keywords._while, "while condition", tmp66);
    Rules.#whileTerm = tmp67;
    tmp68 = (lhs, rhs) => {
      let param0, tail, tmp159, tmp160, tmp161;
      if (rhs instanceof Tree.Tuple.class) {
        param0 = rhs.trees;
        tail = param0;
        tmp159 = Stack.Cons(lhs, tail);
        return Tree.Tuple(tmp159)
      } else {
        tmp160 = Stack.Cons(rhs, Stack.Nil);
        tmp161 = Stack.Cons(lhs, tmp160);
        return Tree.Tuple(tmp161)
      }
    };
    tmp69 = Rules.makeInfixChoice(Precedence.Keywords._comma, "term", tmp68);
    tmp70 = (lhs, rhs) => {
      let param0, tail, tmp159, tmp160, tmp161;
      if (rhs instanceof Tree.Sequence.class) {
        param0 = rhs.trees;
        tail = param0;
        tmp159 = Stack.Cons(lhs, tail);
        return Tree.Sequence(tmp159)
      } else {
        tmp160 = Stack.Cons(rhs, Stack.Nil);
        tmp161 = Stack.Cons(lhs, tmp160);
        return Tree.Sequence(tmp161)
      }
    };
    tmp71 = Rules.makeInfixChoice(Precedence.Keywords._semicolon, "term", tmp70);
    tmp72 = Rules.makeInfixChoice(Precedence.Keywords._leftArrow, "term", (lhs, rhs) => {
      return Tree.Infix(Precedence.Keywords._leftArrow, lhs, rhs)
    });
    tmp73 = ParseRule.Choice.end(runtime.Unit);
    tmp74 = ParseRule.Choice.typeExpr((rhs, _) => {
      return (lhs) => {
        return Tree.Infix(Precedence.Keywords._colon, lhs, rhs)
      }
    }, "right-hand side type", tmp73);
    tmp75 = ParseRule.Choice.keyword(Precedence.Keywords._colon, "type ascription", tmp74);
    tmp76 = Option.Some(Precedence.Keywords.appPrec);
    tmp77 = ParseRule.Choice.end(runtime.Unit);
    tmp78 = ParseRule.Choice.Ref("term", (argument, _) => {
      return (callee) => {
        return Tree.App(callee, argument)
      }
    }, tmp76, Option.None, tmp77);
    tmp79 = ParseRule.rule("infix rules for expressions", tmp69, tmp71, tmp72, tmp75, tmp78);
    this.termInfixRule = tmp79;
    tmp80 = Rules.makeBracketRule(Precedence.Keywords._leftRound, Precedence.Keywords._rightRound, "term", (tree) => {
      if (tree instanceof Tree.Empty.class) {
        return Tree.Tuple(Stack.Nil)
      } else {
        return tree
      }
    });
    tmp81 = (tree) => {
      let tmp159;
      if (tree instanceof Tree.Empty.class) {
        tmp159 = Tree.Sequence(Stack.Nil);
      } else {
        tmp159 = tree;
      }
      return Tree.Bracketed(Token.Square, tmp159)
    };
    tmp82 = Rules.makeBracketRule(Precedence.Keywords._leftSquare, Precedence.Keywords._rightSquare, "term", tmp81);
    tmp83 = Rules.makeBracketRule(Precedence.Keywords._leftCurly, Precedence.Keywords._rightCurly, "term", Predef.id);
    tmp84 = Rules.makeBracketRule(Precedence.Keywords._begin, Precedence.Keywords._end, "term", (tree) => {
      if (tree instanceof Tree.Empty.class) {
        return Tree.Sequence(Stack.Nil)
      } else {
        return tree
      }
    });
    tmp85 = ParseRule.Choice.Ref("term", (lhs, compose) => {
      return runtime.safeCall(compose(lhs))
    }, Option.None, Option.None, Rules.termInfixRule);
    tmp86 = ParseRule.rule("prefix rules for expressions", Rules.#letExpression, Rules.#funTerm, Rules.#matchTerm, Rules.#functionTerm, Rules.#ifThenElse, Rules.#whileTerm, Rules.forTerm, tmp80, tmp82, tmp83, tmp84, tmp85);
    this.termRule = tmp86;
    tmp87 = (lhs, rhs) => {
      let param0, tail, tmp159, tmp160, tmp161;
      if (rhs instanceof Tree.Tuple.class) {
        param0 = rhs.trees;
        tail = param0;
        tmp159 = Stack.Cons(lhs, tail);
        return Tree.Tuple(tmp159)
      } else {
        tmp160 = Stack.Cons(rhs, Stack.Nil);
        tmp161 = Stack.Cons(lhs, tmp160);
        return Tree.Tuple(tmp161)
      }
    };
    tmp88 = Rules.makeInfixChoice(Precedence.TypeKeywords._comma, "type", tmp87);
    tmp89 = Rules.makeInfixChoice(Precedence.TypeKeywords._arrow, "type", (lhs, rhs) => {
      return Tree.Infix(Precedence.TypeKeywords._arrow, lhs, rhs)
    });
    tmp90 = Rules.makeInfixChoice(Precedence.TypeKeywords._asterisk, "type", (lhs, rhs) => {
      return Tree.Infix(Precedence.TypeKeywords._asterisk, lhs, rhs)
    });
    tmp91 = Option.Some(Precedence.TypeKeywords.appPrec);
    tmp92 = ParseRule.Choice.end(runtime.Unit);
    tmp93 = ParseRule.Choice.Ref("type", (callee, _) => {
      return (argument) => {
        return Tree.App(callee, argument)
      }
    }, tmp91, Option.None, tmp92);
    tmp94 = ParseRule.rule("infix rules for types", tmp88, tmp89, tmp90, tmp93);
    this.typeInfixRule = tmp94;
    tmp95 = Rules.makeBracketRule(Precedence.TypeKeywords._leftRound, Precedence.TypeKeywords._rightRound, "type", Predef.id);
    tmp96 = ParseRule.Choice.Ref("type", (lhs, compose) => {
      return runtime.safeCall(compose(lhs))
    }, Option.None, Option.None, Rules.typeInfixRule);
    tmp97 = ParseRule.rule("rules for types", tmp95, tmp96);
    this.typeRule = tmp97;
    tmp98 = (ctor, argOpt) => {
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
    tmp99 = ParseRule.Choice.end(Option.None);
    tmp100 = ParseRule.Choice.end(runtime.Unit);
    tmp101 = ParseRule.Choice.reference("type", (argument, _) => {
      return Option.Some(argument)
    }, "the variant constructor's argument", tmp100);
    tmp102 = ParseRule.Choice.keyword(Precedence.Keywords._of, "the `of` operator", tmp101);
    tmp103 = ParseRule.Choice.typeExpr(tmp98, "the variant constructor's name", tmp99, tmp102);
    tmp104 = Rules.defineKind("constr-decl", tmp103);
    tmp105 = (lhs, rhsOpt) => {
      let param0, rhs;
      if (rhsOpt instanceof Option.Some.class) {
        param0 = rhsOpt.value;
        rhs = param0;
        return Tree.Infix(Precedence.Keywords._bar, lhs, rhs)
      } else {
        return lhs
      }
    };
    tmp106 = ParseRule.Choice.end(Option.None);
    tmp107 = ParseRule.Choice.end(runtime.Unit);
    tmp108 = ParseRule.Choice.reference("variants", (more, _) => {
      return Option.Some(more)
    }, "variants end", tmp107);
    tmp109 = ParseRule.Choice.keyword(Precedence.Keywords._bar, "variants bar", tmp108);
    tmp110 = ParseRule.Choice.reference("constr-decl", tmp105, "variants item", tmp106, tmp109);
    tmp111 = Rules.defineKind("variants", tmp110);
    tmp112 = (lhs, rhsMore) => {
      let first1, first0, rhs, more, tmp159;
      if (globalThis.Array.isArray(rhsMore) && rhsMore.length === 2) {
        first0 = rhsMore[0];
        first1 = rhsMore[1];
        rhs = first0;
        more = first1;
        tmp159 = runtime.safeCall(rhs(lhs));
        return Stack.Cons(tmp159, more)
      } else {
        throw new globalThis.Error("match error");
      }
    };
    tmp113 = ParseRule.Choice.end(Stack.Nil);
    tmp114 = ParseRule.Choice.end(runtime.Unit);
    tmp115 = ParseRule.Choice.reference("typedefs", (more, _) => {
      return more
    }, "typedef end", tmp114);
    tmp116 = ParseRule.Choice.keyword(Precedence.Keywords._and, "typedef `and` separator", tmp115);
    tmp117 = ParseRule.Choice.reference("typedef-rhs", (rhs, more) => {
      return [
        rhs,
        more
      ]
    }, "typedef body", tmp113, tmp116);
    tmp118 = ParseRule.Choice.typeExpr(tmp112, "typedef name", tmp117);
    tmp119 = Rules.defineKind("typedefs", tmp118);
    tmp120 = ParseRule.Choice.end(runtime.Unit);
    tmp121 = ParseRule.Choice.reference("variants", (rhs, _) => {
      return (lhs) => {
        return Tree.Infix(Precedence.Keywords._equal, lhs, rhs)
      }
    }, "typedef-rhs: variants", tmp120);
    tmp122 = (content, _) => {
      let tmp159, tmp160;
      if (content instanceof Stack.Nil.class) {
        tmp159 = Tree.Sequence(Stack.Nil);
        return Tree.Bracketed(Token.Curly, tmp159)
      } else {
        tmp160 = Tree.Sequence(content);
        return Tree.Bracketed(Token.Curly, tmp160)
      }
    };
    tmp123 = ParseRule.Choice.end(Tree.empty);
    tmp124 = ParseRule.Choice.keyword(Precedence.Keywords._rightCurly, "right brace", tmp123);
    tmp125 = ParseRule.Choice.reference("label-decls", tmp122, "label-decl", tmp124);
    tmp126 = ParseRule.Choice.keyword(Precedence.Keywords._leftCurly, "left brace", tmp125);
    tmp127 = ParseRule.Choice.map(tmp126, (rhs) => {
      return (lhs) => {
        return Tree.Infix(Precedence.Keywords._equal, lhs, rhs)
      }
    });
    tmp128 = ParseRule.Choice.keyword(Precedence.Keywords._equal, "`=` operator", tmp121, tmp127);
    tmp129 = ParseRule.Choice.end(runtime.Unit);
    tmp130 = ParseRule.Choice.reference("type", (rhs, _) => {
      return (lhs) => {
        return Tree.Infix(Precedence.Keywords._equalequal, lhs, rhs)
      }
    }, "type alias body", tmp129);
    tmp131 = ParseRule.Choice.keyword(Precedence.Keywords._equalequal, "`==` operator", tmp130);
    tmp132 = Rules.defineKind("typedef-rhs", tmp128, tmp131);
    tmp133 = Tree.infix(Precedence.TypeKeywords._colon);
    tmp134 = ParseRule.Choice.end(runtime.Unit);
    tmp135 = ParseRule.Choice.typeExpr((rhs, _) => {
      return rhs
    }, "label-decl body", tmp134);
    tmp136 = ParseRule.Choice.keyword(Precedence.TypeKeywords._colon, "label-decl colon", tmp135);
    tmp137 = ParseRule.Choice.typeExpr(tmp133, "label-decl name", tmp136);
    tmp138 = Rules.defineKind("label-decl", tmp137);
    tmp139 = ParseRule.Choice.end(Stack.Nil);
    tmp140 = ParseRule.Choice.end(runtime.Unit);
    tmp141 = ParseRule.Choice.reference("label-decls", (more, _) => {
      return more
    }, "more label-decls", tmp140);
    tmp142 = ParseRule.Choice.keyword(Precedence.Keywords._semicolon, "the `;` separator", tmp141);
    tmp143 = ParseRule.Choice.reference("label-decl", Stack.Cons, "the first label-decl", tmp139, tmp142);
    tmp144 = Rules.defineKind("label-decls", tmp143);
    tmp145 = ParseRule.Choice.end(Stack.Nil);
    tmp146 = ParseRule.Choice.end(runtime.Unit);
    tmp147 = ParseRule.Choice.reference("constr-decls", (tail, _) => {
      return tail
    }, "more constructor declarations", tmp146);
    tmp148 = ParseRule.Choice.keyword(Precedence.Keywords._bar, "separator `and`", tmp147);
    tmp149 = ParseRule.Choice.reference("constr-decl", Stack.Cons, "the first constructor declaration", tmp145, tmp148);
    tmp150 = Rules.defineKind("constr-decls", tmp149);
    tmp151 = Rules.makeLetBindings(false);
    tmp152 = ParseRule.Choice.end(runtime.Unit);
    tmp153 = ParseRule.Choice.reference("typedefs", (typedefs, _) => {
      return Tree.Define(Tree.DefineKind.Type, typedefs)
    }, "more typedefs", tmp152);
    tmp154 = ParseRule.Choice.keyword(Precedence.Keywords._type, "`type` keyword", tmp153);
    tmp155 = ParseRule.Choice.end(runtime.Unit);
    tmp156 = ParseRule.Choice.reference("constr-decls", (decls, _) => {
      return Tree.Define(Tree.DefineKind.Exception, decls)
    }, "constructor declarations", tmp155);
    tmp157 = ParseRule.Choice.keyword(Precedence.Keywords._exception, "`exception` keyword", tmp156);
    tmp158 = ParseRule.rule("prefix rules for module items", tmp151, tmp154, tmp157);
    this.declRule = tmp158;
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
    let intro, tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17;
    intro = "let binding: ";
    tmp = intro + "keyword";
    tmp1 = intro + "keyword";
    tmp2 = intro + "`rec` keyword";
    tmp3 = ParseRule.Choice.end(runtime.Unit);
    tmp4 = ParseRule.Choice.keyword(Precedence.Keywords._rec, tmp2, tmp3);
    tmp5 = ParseRule.rule(tmp1, tmp4);
    tmp6 = intro + "body";
    if (hasInClause === true) {
      tmp7 = intro + "`in` keyword";
      tmp8 = intro + "body";
      tmp9 = ParseRule.Choice.end(runtime.Unit);
      tmp10 = ParseRule.Choice.term((body, _) => {
        return Option.Some(body)
      }, tmp8, tmp9);
      tmp11 = ParseRule.Choice.keyword(Precedence.Keywords._in, tmp7, tmp10);
      tmp12 = ParseRule.Choice.end(Option.None);
      tmp13 = Predef.tuple(tmp11, tmp12);
    } else {
      tmp14 = ParseRule.Choice.end(Option.None);
      tmp13 = Predef.tuple(tmp14);
    }
    tmp15 = ParseRule.Choice.reference("let-bindings", (bindings, body) => {
      return Tree.LetIn(bindings, body)
    }, "let-bindings", ...tmp13);
    tmp16 = ParseRule.rule(tmp6, tmp15);
    tmp17 = ParseRule.Choice.Optional(tmp5, tmp16);
    return ParseRule.Choice.keyword(Precedence.Keywords._let, tmp, tmp17)
  } 
  static get forTerm() {
    let intro, innerPart, tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18;
    intro = "for: ";
    tmp = intro + "`do` keyword";
    tmp1 = intro + "body expression";
    tmp2 = intro + "`done` keyword";
    tmp3 = ParseRule.Choice.end(runtime.Unit);
    tmp4 = ParseRule.Choice.keyword(Precedence.Keywords._done, "the end", tmp3);
    tmp5 = ParseRule.Choice.term((body, _) => {
      return body
    }, tmp2, tmp4);
    tmp6 = ParseRule.Choice.keyword(Precedence.Keywords._do, tmp1, tmp5);
    tmp7 = ParseRule.Choice.term((end, body) => {
      return [
        end,
        body
      ]
    }, tmp, tmp6);
    innerPart = tmp7;
    tmp8 = intro + "left-hand side";
    tmp9 = (head, startEndBody) => {
      let first2, first1, first0, start, end, body;
      if (globalThis.Array.isArray(startEndBody) && startEndBody.length === 3) {
        first0 = startEndBody[0];
        first1 = startEndBody[1];
        first2 = startEndBody[2];
        start = first0;
        end = first1;
        body = first2;
        return Tree.For(head, start, end, body)
      } else {
        throw new globalThis.Error("match error");
      }
    };
    tmp10 = intro + "head";
    tmp11 = intro + "start expression";
    tmp12 = (start, endBody) => {
      let first1, first0, end, body;
      if (globalThis.Array.isArray(endBody) && endBody.length === 2) {
        first0 = endBody[0];
        first1 = endBody[1];
        end = first0;
        body = first1;
        return [
          start,
          end,
          body
        ]
      } else {
        throw new globalThis.Error("match error");
      }
    };
    tmp13 = intro + "`to` or `downto` keyword";
    tmp14 = ParseRule.Choice.keyword(Precedence.Keywords._to, "end expression", innerPart);
    tmp15 = ParseRule.Choice.keyword(Precedence.Keywords._downto, "end expression", innerPart);
    tmp16 = ParseRule.Choice.term(tmp12, tmp13, tmp14, tmp15);
    tmp17 = ParseRule.Choice.keyword(Precedence.Keywords._equal, tmp11, tmp16);
    tmp18 = ParseRule.Choice.term(tmp9, tmp10, tmp17);
    return ParseRule.Choice.keyword(Precedence.Keywords._for, tmp8, tmp18);
  } 
  static makeInfixChoice(keyword, rhsKind, compose) {
    let tmp, tmp1, tmp2, tmp3, tmp4, tmp5;
    tmp = "operator `" + keyword.name;
    tmp1 = tmp + "`";
    tmp2 = "operator `" + keyword.name;
    tmp3 = tmp2 + "` right-hand side";
    tmp4 = ParseRule.Choice.end(runtime.Unit);
    tmp5 = ParseRule.Choice.reference(rhsKind, (rhs, _) => {
      return (lhs) => {
        return runtime.safeCall(compose(lhs, rhs))
      }
    }, tmp3, tmp4);
    return ParseRule.Choice.keyword(keyword, tmp1, tmp5)
  } 
  static makeBracketRule(opening, closing, contentKind, wrapContent) {
    let tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6;
    tmp = contentKind + ": bracket content";
    tmp1 = (tree, end) => {
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
    };
    tmp2 = contentKind + ": close bracket";
    tmp3 = contentKind + ": the end of bracket";
    tmp4 = ParseRule.Choice.end(Tree.empty);
    tmp5 = ParseRule.Choice.keyword(closing, tmp3, tmp4);
    tmp6 = ParseRule.Choice.reference(contentKind, tmp1, tmp2, tmp5);
    return ParseRule.Choice.keyword(opening, tmp, tmp6)
  }
  static toString() { return "Rules"; }
};
let Rules = Rules1; export default Rules;
