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
  static #letDefinition;
  static #ifThenElse;
  static #funTerm;
  static #matchTerm;
  static #functionTerm;
  static #whileTerm;
  static #recordTypeChoice;
  static #typeDefinition;
  static #exceptionDefinition;
  static {
    let tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20, tmp21, tmp22, tmp23, tmp24, tmp25, tmp26, tmp27, tmp28, tmp29, tmp30, tmp31, tmp32, tmp33, tmp34, tmp35, tmp36, tmp37, tmp38, tmp39, tmp40, tmp41, tmp42, tmp43, tmp44, tmp45, tmp46, tmp47, tmp48, tmp49, tmp50, tmp51, tmp52, tmp53, tmp54, tmp55, tmp56, tmp57, tmp58, tmp59, tmp60, tmp61, tmp62, tmp63, tmp64, tmp65, tmp66, tmp67, tmp68, tmp69, tmp70, tmp71, tmp72, tmp73, tmp74, tmp75, tmp76, tmp77, tmp78, tmp79, tmp80, tmp81, tmp82, tmp83, tmp84, tmp85, tmp86, tmp87, tmp88, tmp89, tmp90, tmp91, tmp92, tmp93, tmp94, tmp95, tmp96, tmp97, tmp98, tmp99, tmp100, tmp101, tmp102, tmp103, tmp104, tmp105, tmp106, tmp107, tmp108, tmp109, tmp110, tmp111, tmp112, tmp113, tmp114, tmp115, tmp116, tmp117, tmp118, tmp119, tmp120, tmp121, tmp122, tmp123, tmp124, tmp125, tmp126, tmp127, tmp128, tmp129, tmp130, tmp131, tmp132, tmp133, tmp134, tmp135, tmp136, tmp137, tmp138, tmp139, tmp140, tmp141, tmp142, tmp143, tmp144, tmp145, tmp146, tmp147, tmp148, tmp149, tmp150, tmp151, tmp152, tmp153;
    tmp = new BetterMap.Map();
    this.syntaxKinds = tmp;
    tmp1 = (lhs, rhsBindings) => {
      let first1, first0, rhs, bindings, tmp154;
      if (globalThis.Array.isArray(rhsBindings) && rhsBindings.length === 2) {
        first0 = rhsBindings[0];
        first1 = rhsBindings[1];
        rhs = first0;
        bindings = first1;
        tmp154 = Tree.Infix(Precedence.Keywords._equal, lhs, rhs);
        return Stack.Cons(tmp154, bindings)
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
    tmp10 = Rules.letBinding(true);
    Rules.#letExpression = tmp10;
    tmp11 = Rules.letBinding(false);
    Rules.#letDefinition = tmp11;
    tmp12 = (tst, conAlt) => {
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
    tmp13 = ParseRule.Choice.end(Option.None);
    tmp14 = ParseRule.Choice.end(Option.None);
    tmp15 = ParseRule.Choice.term((alt, _) => {
      return Option.Some(alt)
    }, "if-then-else alternative", tmp14);
    tmp16 = ParseRule.Choice.keyword(Precedence.Keywords._else, "`else` keyword", tmp15);
    tmp17 = ParseRule.Choice.term((con, optAlt) => {
      return [
        con,
        optAlt
      ]
    }, "if-then-else consequent", tmp13, tmp16);
    tmp18 = ParseRule.Choice.keyword(Precedence.Keywords._then, "`then` keyword", tmp17);
    tmp19 = ParseRule.Choice.term(tmp12, "if-then-else condition", tmp18);
    tmp20 = ParseRule.Choice.keyword(Precedence.Keywords._if, "`if` keyword", tmp19);
    Rules.#ifThenElse = tmp20;
    tmp21 = ParseRule.Choice.end(Option.None);
    tmp22 = ParseRule.Choice.term((body, _) => {
      return body
    }, "function body", tmp21);
    tmp23 = ParseRule.Choice.keyword(Precedence.Keywords._thinArrow, "`->` operator", tmp22);
    tmp24 = ParseRule.Choice.term((params, body) => {
      let tmp154;
      tmp154 = Stack.Cons(params, Stack.Nil);
      return Tree.Lambda(tmp154, body)
    }, "function parameters", tmp23);
    tmp25 = ParseRule.Choice.keyword(Precedence.Keywords._fun, "`function` keyword", tmp24);
    Rules.#funTerm = tmp25;
    tmp26 = (lhs, rhsTail) => {
      let first1, first0, rhs, tail, tmp154;
      if (globalThis.Array.isArray(rhsTail) && rhsTail.length === 2) {
        first0 = rhsTail[0];
        first1 = rhsTail[1];
        rhs = first0;
        tail = first1;
        tmp154 = Tree.Infix(Precedence.Keywords._thinArrow, lhs, rhs);
        return Stack.Cons(tmp154, tail)
      } else {
        throw new globalThis.Error("match error");
      }
    };
    tmp27 = ParseRule.Choice.end(Stack.Nil);
    tmp28 = ParseRule.Choice.end(runtime.Unit);
    tmp29 = ParseRule.Choice.reference("simple-matching", (tail, _) => {
      return tail
    }, "simple-matching tail", tmp28);
    tmp30 = ParseRule.Choice.keyword(Precedence.Keywords._bar, "separator", tmp29);
    tmp31 = ParseRule.Choice.term((rhs, tail) => {
      return [
        rhs,
        tail
      ]
    }, "rhs", tmp27, tmp30);
    tmp32 = ParseRule.Choice.keyword(Precedence.Keywords._thinArrow, "arrow", tmp31);
    tmp33 = ParseRule.Choice.term(tmp26, "pattern", tmp32);
    tmp34 = Rules.defineKind("simple-matching", tmp33);
    tmp35 = ParseRule.Choice.end(runtime.Unit);
    tmp36 = ParseRule.Choice.reference("pattern-list", (tail, _) => {
      return tail
    }, "pattern list tail", tmp35);
    tmp37 = ParseRule.Choice.term((head, tail) => {
      return Stack.Cons(head, tail)
    }, "pattern", tmp36);
    tmp38 = Rules.defineKind("pattern-list", tmp37);
    tmp39 = Tree.infix(Precedence.Keywords._thinArrow);
    tmp40 = ParseRule.Choice.end(Stack.Nil);
    tmp41 = ParseRule.Choice.end(runtime.Unit);
    tmp42 = ParseRule.Choice.reference("multiple-matching", (tail, _) => {
      return tail
    }, "multiple-matching tail", tmp41);
    tmp43 = ParseRule.Choice.keyword(Precedence.Keywords._bar, "separator", tmp42);
    tmp44 = ParseRule.Choice.term((rhs, _) => {
      return rhs
    }, "the right-hand side of the arrow", tmp40, tmp43);
    tmp45 = ParseRule.Choice.keyword(Precedence.Keywords._thinArrow, "the arrow symbol", tmp44);
    tmp46 = ParseRule.Choice.reference("pattern-list", tmp39, "the list of patterns", tmp45);
    tmp47 = Rules.defineKind("multiple-matching", tmp46);
    tmp48 = ParseRule.Choice.end(runtime.Unit);
    tmp49 = ParseRule.Choice.keyword(Precedence.Keywords._bar, "`|` separator", tmp48);
    tmp50 = ParseRule.rule("pattern matching case body", tmp49);
    tmp51 = Rules.getRuleByKind("simple-matching");
    tmp52 = ParseRule.Choice.Optional(tmp50, tmp51);
    tmp53 = ParseRule.Choice.keyword(Precedence.Keywords._with, "`with` keyword", tmp52);
    tmp54 = ParseRule.Choice.term((scrutinee, branches) => {
      return Tree.Match(scrutinee, branches)
    }, "pattern matching scrutinee", tmp53);
    tmp55 = ParseRule.Choice.keyword(Precedence.Keywords._match, "`match` keyword", tmp54);
    Rules.#matchTerm = tmp55;
    tmp56 = ParseRule.Choice.end(runtime.Unit);
    tmp57 = ParseRule.Choice.keyword(Precedence.Keywords._bar, "`|` separator", tmp56);
    tmp58 = ParseRule.rule("function body", tmp57);
    tmp59 = Rules.getRuleByKind("simple-matching");
    tmp60 = ParseRule.Choice.Optional(tmp58, tmp59);
    tmp61 = ParseRule.Choice.map(tmp60, (branches) => {
      return Tree.Match(Tree.empty, branches)
    });
    tmp62 = ParseRule.Choice.keyword(Precedence.Keywords._function, "`function` keyword", tmp61);
    Rules.#functionTerm = tmp62;
    tmp63 = ParseRule.Choice.end(runtime.Unit);
    tmp64 = ParseRule.Choice.keyword(Precedence.Keywords._done, "while end", tmp63);
    tmp65 = ParseRule.Choice.term((body, _) => {
      return body
    }, "while end", tmp64);
    tmp66 = ParseRule.Choice.keyword(Precedence.Keywords._do, "while body", tmp65);
    tmp67 = ParseRule.Choice.term(Tree.While, "while body", tmp66);
    tmp68 = ParseRule.Choice.keyword(Precedence.Keywords._while, "while condition", tmp67);
    Rules.#whileTerm = tmp68;
    tmp69 = (lhs, rhs) => {
      let param0, tail, tmp154, tmp155, tmp156;
      if (rhs instanceof Tree.Tuple.class) {
        param0 = rhs.trees;
        tail = param0;
        tmp154 = Stack.Cons(lhs, tail);
        return Tree.Tuple(tmp154)
      } else {
        tmp155 = Stack.Cons(rhs, Stack.Nil);
        tmp156 = Stack.Cons(lhs, tmp155);
        return Tree.Tuple(tmp156)
      }
    };
    tmp70 = Rules.makeInfixChoice(Precedence.Keywords._comma, "term", tmp69);
    tmp71 = (lhs, rhs) => {
      let param0, tail, tmp154, tmp155, tmp156;
      if (rhs instanceof Tree.Sequence.class) {
        param0 = rhs.trees;
        tail = param0;
        tmp154 = Stack.Cons(lhs, tail);
        return Tree.Sequence(tmp154)
      } else {
        tmp155 = Stack.Cons(rhs, Stack.Nil);
        tmp156 = Stack.Cons(lhs, tmp155);
        return Tree.Sequence(tmp156)
      }
    };
    tmp72 = Rules.makeInfixChoice(Precedence.Keywords._semicolon, "term", tmp71);
    tmp73 = Rules.makeInfixChoice(Precedence.Keywords._leftArrow, "term", (lhs, rhs) => {
      return Tree.Infix(Precedence.Keywords._leftArrow, lhs, rhs)
    });
    tmp74 = ParseRule.Choice.end(runtime.Unit);
    tmp75 = ParseRule.Choice.typeExpr((rhs, _) => {
      return (lhs) => {
        return Tree.Infix(Precedence.Keywords._colon, lhs, rhs)
      }
    }, "right-hand side type", tmp74);
    tmp76 = ParseRule.Choice.keyword(Precedence.Keywords._colon, "type ascription", tmp75);
    tmp77 = Option.Some(Precedence.Keywords.appPrec);
    tmp78 = ParseRule.Choice.end(runtime.Unit);
    tmp79 = ParseRule.Choice.Ref("term", (argument, _) => {
      return (callee) => {
        return Tree.App(callee, argument)
      }
    }, tmp77, Option.None, tmp78);
    tmp80 = ParseRule.rule("infix rules for expressions", tmp70, tmp72, tmp73, tmp76, tmp79);
    this.termInfixRule = tmp80;
    tmp81 = Rules.makeBracketRule(Precedence.Keywords._leftRound, Precedence.Keywords._rightRound, "term", (tree) => {
      if (tree instanceof Tree.Empty.class) {
        return Tree.Tuple(Stack.Nil)
      } else {
        return tree
      }
    });
    tmp82 = (tree) => {
      let tmp154;
      if (tree instanceof Tree.Empty.class) {
        tmp154 = Tree.Sequence(Stack.Nil);
      } else {
        tmp154 = tree;
      }
      return Tree.Bracketed(Token.Square, tmp154)
    };
    tmp83 = Rules.makeBracketRule(Precedence.Keywords._leftSquare, Precedence.Keywords._rightSquare, "term", tmp82);
    tmp84 = Rules.makeBracketRule(Precedence.Keywords._leftCurly, Precedence.Keywords._rightCurly, "term", Predef.id);
    tmp85 = Rules.makeBracketRule(Precedence.Keywords._begin, Precedence.Keywords._end, "term", (tree) => {
      if (tree instanceof Tree.Empty.class) {
        return Tree.Sequence(Stack.Nil)
      } else {
        return tree
      }
    });
    tmp86 = ParseRule.Choice.Ref("term", (lhs, compose) => {
      return runtime.safeCall(compose(lhs))
    }, Option.None, Option.None, Rules.termInfixRule);
    tmp87 = ParseRule.rule("prefix rules for expressions", Rules.#letExpression, Rules.#funTerm, Rules.#matchTerm, Rules.#functionTerm, Rules.#ifThenElse, Rules.#whileTerm, Rules.forTerm, tmp81, tmp83, tmp84, tmp85, tmp86);
    this.termRule = tmp87;
    tmp88 = (content, _) => {
      let tmp154, tmp155;
      if (content instanceof Stack.Nil.class) {
        tmp154 = Tree.Sequence(Stack.Nil);
        return Tree.Bracketed(Token.Curly, tmp154)
      } else {
        tmp155 = Tree.Sequence(content);
        return Tree.Bracketed(Token.Curly, tmp155)
      }
    };
    tmp89 = ParseRule.Choice.end(Tree.empty);
    tmp90 = ParseRule.Choice.keyword(Precedence.Keywords._rightCurly, "right brace", tmp89);
    tmp91 = ParseRule.Choice.reference("label-decls", tmp88, "label-decl", tmp90);
    tmp92 = ParseRule.Choice.keyword(Precedence.Keywords._leftCurly, "left brace", tmp91);
    Rules.#recordTypeChoice = tmp92;
    tmp93 = (lhs, rhs) => {
      let param0, tail, tmp154, tmp155, tmp156;
      if (rhs instanceof Tree.Tuple.class) {
        param0 = rhs.trees;
        tail = param0;
        tmp154 = Stack.Cons(lhs, tail);
        return Tree.Tuple(tmp154)
      } else {
        tmp155 = Stack.Cons(rhs, Stack.Nil);
        tmp156 = Stack.Cons(lhs, tmp155);
        return Tree.Tuple(tmp156)
      }
    };
    tmp94 = Rules.makeInfixChoice(Precedence.TypeKeywords._comma, "type", tmp93);
    tmp95 = Rules.makeInfixChoice(Precedence.TypeKeywords._arrow, "type", (lhs, rhs) => {
      return Tree.Infix(Precedence.TypeKeywords._arrow, lhs, rhs)
    });
    tmp96 = Rules.makeInfixChoice(Precedence.TypeKeywords._asterisk, "type", (lhs, rhs) => {
      return Tree.Infix(Precedence.TypeKeywords._asterisk, lhs, rhs)
    });
    tmp97 = Option.Some(Precedence.TypeKeywords.appPrec);
    tmp98 = ParseRule.Choice.end(runtime.Unit);
    tmp99 = ParseRule.Choice.Ref("type", (callee, _) => {
      return (argument) => {
        return Tree.App(callee, argument)
      }
    }, tmp97, Option.None, tmp98);
    tmp100 = ParseRule.rule("infix rules for types", tmp94, tmp95, tmp96, tmp99);
    this.typeInfixRule = tmp100;
    tmp101 = Rules.makeBracketRule(Precedence.TypeKeywords._leftRound, Precedence.TypeKeywords._rightRound, "type", Predef.id);
    tmp102 = ParseRule.Choice.Ref("type", (lhs, compose) => {
      return runtime.safeCall(compose(lhs))
    }, Option.None, Option.None, Rules.typeInfixRule);
    tmp103 = ParseRule.rule("rules for types", tmp101, tmp102);
    this.typeRule = tmp103;
    tmp104 = ParseRule.Choice.end(runtime.Unit);
    tmp105 = ParseRule.Choice.reference("typedefs", (typedefs, _) => {
      return Tree.Define(Tree.DefineKind.Type, typedefs)
    }, "more typedefs", tmp104);
    tmp106 = ParseRule.Choice.keyword(Precedence.Keywords._type, "`type` keyword", tmp105);
    Rules.#typeDefinition = tmp106;
    tmp107 = (ctor, argOpt) => {
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
    tmp108 = ParseRule.Choice.end(Option.None);
    tmp109 = ParseRule.Choice.end(runtime.Unit);
    tmp110 = ParseRule.Choice.reference("type", (argument, _) => {
      return Option.Some(argument)
    }, "the variant constructor's argument", tmp109);
    tmp111 = ParseRule.Choice.keyword(Precedence.Keywords._of, "the `of` operator", tmp110);
    tmp112 = ParseRule.Choice.typeExpr(tmp107, "the variant constructor's name", tmp108, tmp111);
    tmp113 = Rules.defineKind("constr-decl", tmp112);
    tmp114 = (lhs, rhsOpt) => {
      let param0, rhs;
      if (rhsOpt instanceof Option.Some.class) {
        param0 = rhsOpt.value;
        rhs = param0;
        return Tree.Infix(Precedence.Keywords._bar, lhs, rhs)
      } else {
        return lhs
      }
    };
    tmp115 = ParseRule.Choice.end(Option.None);
    tmp116 = ParseRule.Choice.end(runtime.Unit);
    tmp117 = ParseRule.Choice.reference("variants", (more, _) => {
      return Option.Some(more)
    }, "variants end", tmp116);
    tmp118 = ParseRule.Choice.keyword(Precedence.Keywords._bar, "variants bar", tmp117);
    tmp119 = ParseRule.Choice.reference("constr-decl", tmp114, "variants item", tmp115, tmp118);
    tmp120 = Rules.defineKind("variants", tmp119);
    tmp121 = (lhs, rhsMore) => {
      let first1, first0, rhs, more, tmp154;
      if (globalThis.Array.isArray(rhsMore) && rhsMore.length === 2) {
        first0 = rhsMore[0];
        first1 = rhsMore[1];
        rhs = first0;
        more = first1;
        tmp154 = runtime.safeCall(rhs(lhs));
        return Stack.Cons(tmp154, more)
      } else {
        throw new globalThis.Error("match error");
      }
    };
    tmp122 = ParseRule.Choice.end(Stack.Nil);
    tmp123 = ParseRule.Choice.end(runtime.Unit);
    tmp124 = ParseRule.Choice.reference("typedefs", (more, _) => {
      return more
    }, "typedef end", tmp123);
    tmp125 = ParseRule.Choice.keyword(Precedence.Keywords._and, "typedef `and` separator", tmp124);
    tmp126 = ParseRule.Choice.reference("typedef-rhs", (rhs, more) => {
      return [
        rhs,
        more
      ]
    }, "typedef body", tmp122, tmp125);
    tmp127 = ParseRule.Choice.typeExpr(tmp121, "typedef name", tmp126);
    tmp128 = Rules.defineKind("typedefs", tmp127);
    tmp129 = ParseRule.Choice.end(runtime.Unit);
    tmp130 = ParseRule.Choice.reference("variants", (rhs, _) => {
      return (lhs) => {
        return Tree.Infix(Precedence.Keywords._equal, lhs, rhs)
      }
    }, "typedef-rhs: variants", tmp129);
    tmp131 = ParseRule.Choice.map(Rules.#recordTypeChoice, (rhs) => {
      return (lhs) => {
        return Tree.Infix(Precedence.Keywords._equal, lhs, rhs)
      }
    });
    tmp132 = ParseRule.Choice.keyword(Precedence.Keywords._equal, "`=` operator", tmp130, tmp131);
    tmp133 = ParseRule.Choice.end(runtime.Unit);
    tmp134 = ParseRule.Choice.reference("type", (rhs, _) => {
      return (lhs) => {
        return Tree.Infix(Precedence.Keywords._equalequal, lhs, rhs)
      }
    }, "type alias body", tmp133);
    tmp135 = ParseRule.Choice.keyword(Precedence.Keywords._equalequal, "`==` operator", tmp134);
    tmp136 = Rules.defineKind("typedef-rhs", tmp132, tmp135);
    tmp137 = Tree.infix(Precedence.TypeKeywords._colon);
    tmp138 = ParseRule.Choice.end(runtime.Unit);
    tmp139 = ParseRule.Choice.typeExpr((rhs, _) => {
      return rhs
    }, "label-decl body", tmp138);
    tmp140 = ParseRule.Choice.keyword(Precedence.TypeKeywords._colon, "label-decl colon", tmp139);
    tmp141 = ParseRule.Choice.typeExpr(tmp137, "label-decl name", tmp140);
    tmp142 = Rules.defineKind("label-decl", tmp141);
    tmp143 = Rules.defineKind("label-decls", Rules.labelDecls);
    tmp144 = ParseRule.Choice.end(Stack.Nil);
    tmp145 = ParseRule.Choice.end(runtime.Unit);
    tmp146 = ParseRule.Choice.reference("constr-decls", (tail, _) => {
      return tail
    }, "more constructor declarations", tmp145);
    tmp147 = ParseRule.Choice.keyword(Precedence.Keywords._bar, "separator `and`", tmp146);
    tmp148 = ParseRule.Choice.reference("constr-decl", Stack.Cons, "the first constructor declaration", tmp144, tmp147);
    tmp149 = Rules.defineKind("constr-decls", tmp148);
    tmp150 = ParseRule.Choice.end(runtime.Unit);
    tmp151 = ParseRule.Choice.reference("constr-decls", (decls, _) => {
      return Tree.Define(Tree.DefineKind.Exception, decls)
    }, "constructor declarations", tmp150);
    tmp152 = ParseRule.Choice.keyword(Precedence.Keywords._exception, "`exception` keyword", tmp151);
    Rules.#exceptionDefinition = tmp152;
    tmp153 = ParseRule.rule("prefix rules for module items", Rules.#letDefinition, Rules.#typeDefinition, Rules.#exceptionDefinition);
    this.declRule = tmp153;
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
  static letBinding(hasInClause) {
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
  static get labelDecls() {
    let intro, tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6;
    intro = "label-decls: ";
    tmp = intro + "label-decl";
    tmp1 = ParseRule.Choice.end(Stack.Nil);
    tmp2 = intro + "semicolon";
    tmp3 = intro + "end";
    tmp4 = ParseRule.Choice.end(runtime.Unit);
    tmp5 = ParseRule.Choice.reference("label-decls", (more, _) => {
      return more
    }, tmp3, tmp4);
    tmp6 = ParseRule.Choice.keyword(Precedence.Keywords._semicolon, tmp2, tmp5);
    return ParseRule.Choice.reference("label-decl", Stack.Cons, tmp, tmp1, tmp6);
  }
  static toString() { return "Rules"; }
};
let Rules = Rules1; export default Rules;
