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
    let tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20, tmp21, tmp22, tmp23, tmp24, tmp25, tmp26, tmp27, tmp28, tmp29, tmp30, tmp31, tmp32, tmp33, tmp34, tmp35, tmp36, tmp37, tmp38, tmp39, tmp40, tmp41, tmp42, tmp43, tmp44, tmp45, tmp46, tmp47, tmp48, tmp49, tmp50, tmp51, tmp52, tmp53, tmp54, tmp55, tmp56, tmp57, tmp58, tmp59, tmp60, tmp61, tmp62, tmp63, tmp64, tmp65, tmp66, tmp67, tmp68, tmp69, tmp70, tmp71, tmp72, tmp73, tmp74, tmp75, tmp76, tmp77, tmp78, tmp79, tmp80, tmp81, tmp82, tmp83, tmp84, tmp85, tmp86, tmp87, tmp88, tmp89, tmp90, tmp91, tmp92, tmp93, tmp94, tmp95, tmp96, tmp97, tmp98, tmp99, tmp100, tmp101, tmp102, tmp103, tmp104, tmp105, tmp106, tmp107, tmp108, tmp109, tmp110, tmp111, tmp112, tmp113, tmp114, tmp115, tmp116, tmp117, tmp118, tmp119, tmp120, tmp121, tmp122, tmp123, tmp124, tmp125, tmp126, tmp127, tmp128, tmp129, tmp130, tmp131, tmp132, tmp133, tmp134, tmp135, tmp136, tmp137, tmp138, tmp139;
    tmp = new BetterMap.Map();
    this.syntaxKinds = tmp;
    tmp1 = (lhs, rhsBindings) => {
      let first1, first0, rhs, bindings, tmp140;
      if (globalThis.Array.isArray(rhsBindings) && rhsBindings.length === 2) {
        first0 = rhsBindings[0];
        first1 = rhsBindings[1];
        rhs = first0;
        bindings = first1;
        tmp140 = Tree.Infix(Precedence.Keywords._equal, lhs, rhs);
        return Stack.Cons(tmp140, bindings)
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
    tmp10 = (tst, conAlt) => {
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
    tmp11 = ParseRule.Choice.end(Option.None);
    tmp12 = ParseRule.Choice.end(Option.None);
    tmp13 = ParseRule.Choice.term((alt, _) => {
      return Option.Some(alt)
    }, "if-then-else alternative", tmp12);
    tmp14 = ParseRule.Choice.keyword(Precedence.Keywords._else, tmp13);
    tmp15 = ParseRule.Choice.term((con, optAlt) => {
      return [
        con,
        optAlt
      ]
    }, "if-then-else consequent", tmp11, tmp14);
    tmp16 = ParseRule.Choice.keyword(Precedence.Keywords._then, tmp15);
    tmp17 = ParseRule.Choice.term(tmp10, "if-then-else condition", tmp16);
    tmp18 = ParseRule.Choice.keyword(Precedence.Keywords._if, tmp17);
    Rules.#ifThenElse = tmp18;
    tmp19 = ParseRule.Choice.end(Option.None);
    tmp20 = ParseRule.Choice.term((body, _) => {
      return body
    }, "function body", tmp19);
    tmp21 = ParseRule.Choice.keyword(Precedence.Keywords._thinArrow, tmp20);
    tmp22 = ParseRule.Choice.term((params, body) => {
      let tmp140;
      tmp140 = Stack.Cons(params, Stack.Nil);
      return Tree.Lambda(tmp140, body)
    }, "function parameters", tmp21);
    tmp23 = ParseRule.Choice.keyword(Precedence.Keywords._fun, tmp22);
    Rules.#funTerm = tmp23;
    tmp24 = (lhs, rhsTail) => {
      let first1, first0, rhs, tail, tmp140;
      if (globalThis.Array.isArray(rhsTail) && rhsTail.length === 2) {
        first0 = rhsTail[0];
        first1 = rhsTail[1];
        rhs = first0;
        tail = first1;
        tmp140 = Tree.Infix(Precedence.Keywords._thinArrow, lhs, rhs);
        return Stack.Cons(tmp140, tail)
      } else {
        throw new globalThis.Error("match error");
      }
    };
    tmp25 = ParseRule.Choice.end(Stack.Nil);
    tmp26 = ParseRule.Choice.reference("simple-matching", (tail, _) => {
      return tail
    }, "simple-matching tail");
    tmp27 = ParseRule.Choice.keyword(Precedence.Keywords._bar, tmp26);
    tmp28 = ParseRule.Choice.term((rhs, tail) => {
      return [
        rhs,
        tail
      ]
    }, "rhs", tmp25, tmp27);
    tmp29 = ParseRule.Choice.keyword(Precedence.Keywords._thinArrow, tmp28);
    tmp30 = ParseRule.Choice.term(tmp24, "pattern", tmp29);
    tmp31 = Rules.defineKind("simple-matching", tmp30);
    tmp32 = ParseRule.Choice.reference("pattern-list", (tail, _) => {
      return tail
    }, "pattern list tail");
    tmp33 = ParseRule.Choice.term((head, tail) => {
      return Stack.Cons(head, tail)
    }, "pattern", tmp32);
    tmp34 = Rules.defineKind("pattern-list", tmp33);
    tmp35 = Tree.infix(Precedence.Keywords._thinArrow);
    tmp36 = ParseRule.Choice.end(Stack.Nil);
    tmp37 = ParseRule.Choice.reference("multiple-matching", (tail, _) => {
      return tail
    }, "multiple-matching tail");
    tmp38 = ParseRule.Choice.keyword(Precedence.Keywords._bar, tmp37);
    tmp39 = ParseRule.Choice.term((rhs, _) => {
      return rhs
    }, "the right-hand side of the arrow", tmp36, tmp38);
    tmp40 = ParseRule.Choice.keyword(Precedence.Keywords._thinArrow, tmp39);
    tmp41 = ParseRule.Choice.reference("pattern-list", tmp35, "the list of patterns", tmp40);
    tmp42 = Rules.defineKind("multiple-matching", tmp41);
    tmp43 = ParseRule.Choice.keyword(Precedence.Keywords._bar);
    tmp44 = ParseRule.rule("pattern matching case body", tmp43);
    tmp45 = Rules.getRuleByKind("simple-matching");
    tmp46 = ParseRule.Choice.Optional(tmp44, tmp45);
    tmp47 = ParseRule.Choice.keyword(Precedence.Keywords._with, tmp46);
    tmp48 = ParseRule.Choice.term((scrutinee, branches) => {
      return Tree.Match(scrutinee, branches)
    }, "pattern matching scrutinee", tmp47);
    tmp49 = ParseRule.Choice.keyword(Precedence.Keywords._match, tmp48);
    Rules.#matchTerm = tmp49;
    tmp50 = ParseRule.Choice.keyword(Precedence.Keywords._bar);
    tmp51 = ParseRule.rule("function body", tmp50);
    tmp52 = Rules.getRuleByKind("simple-matching");
    tmp53 = ParseRule.Choice.Optional(tmp51, tmp52);
    tmp54 = ParseRule.Choice.map(tmp53, (branches) => {
      return Tree.Match(Tree.empty, branches)
    });
    tmp55 = ParseRule.Choice.keyword(Precedence.Keywords._function, tmp54);
    Rules.#functionTerm = tmp55;
    tmp56 = ParseRule.Choice.keyword(Precedence.Keywords._done);
    tmp57 = ParseRule.Choice.term((body, _) => {
      return body
    }, "while end", tmp56);
    tmp58 = ParseRule.Choice.keyword(Precedence.Keywords._do, tmp57);
    tmp59 = ParseRule.Choice.term(Tree.While, "while body", tmp58);
    tmp60 = ParseRule.Choice.keyword(Precedence.Keywords._while, tmp59);
    Rules.#whileTerm = tmp60;
    tmp61 = (lhs, rhs) => {
      let param0, tail, tmp140, tmp141, tmp142;
      if (rhs instanceof Tree.Tuple.class) {
        param0 = rhs.trees;
        tail = param0;
        tmp140 = Stack.Cons(lhs, tail);
        return Tree.Tuple(tmp140)
      } else {
        tmp141 = Stack.Cons(rhs, Stack.Nil);
        tmp142 = Stack.Cons(lhs, tmp141);
        return Tree.Tuple(tmp142)
      }
    };
    tmp62 = Rules.makeInfixChoice(Precedence.Keywords._comma, "term", tmp61);
    tmp63 = (lhs, rhs) => {
      let param0, tail, tmp140, tmp141, tmp142;
      if (rhs instanceof Tree.Sequence.class) {
        param0 = rhs.trees;
        tail = param0;
        tmp140 = Stack.Cons(lhs, tail);
        return Tree.Sequence(tmp140)
      } else {
        tmp141 = Stack.Cons(rhs, Stack.Nil);
        tmp142 = Stack.Cons(lhs, tmp141);
        return Tree.Sequence(tmp142)
      }
    };
    tmp64 = Rules.makeInfixChoice(Precedence.Keywords._semicolon, "term", tmp63);
    tmp65 = Rules.makeInfixChoice(Precedence.Keywords._leftArrow, "term", (lhs, rhs) => {
      return Tree.Infix(Precedence.Keywords._leftArrow, lhs, rhs)
    });
    tmp66 = ParseRule.Choice.typeExpr((rhs, _) => {
      return (lhs) => {
        return Tree.Infix(Precedence.Keywords._colon, lhs, rhs)
      }
    }, "right-hand side type");
    tmp67 = ParseRule.Choice.keyword(Precedence.Keywords._colon, tmp66);
    tmp68 = Option.Some(Precedence.Keywords.appPrec);
    tmp69 = ParseRule.Choice.termWithPrec((argument, _) => {
      return (callee) => {
        return Tree.App(callee, argument)
      }
    }, "application argument", tmp68, Option.None);
    tmp70 = ParseRule.rule("infix rules for expressions", tmp62, tmp64, tmp65, tmp67, tmp69);
    this.termInfixRule = tmp70;
    tmp71 = Rules.makeBracketRule(Precedence.Keywords._leftRound, Precedence.Keywords._rightRound, "term", (tree) => {
      if (tree instanceof Tree.Empty.class) {
        return Tree.Tuple(Stack.Nil)
      } else {
        return tree
      }
    });
    tmp72 = (tree) => {
      let tmp140;
      if (tree instanceof Tree.Empty.class) {
        tmp140 = Tree.Sequence(Stack.Nil);
      } else {
        tmp140 = tree;
      }
      return Tree.Bracketed(Token.Square, tmp140)
    };
    tmp73 = Rules.makeBracketRule(Precedence.Keywords._leftSquare, Precedence.Keywords._rightSquare, "term", tmp72);
    tmp74 = Rules.makeBracketRule(Precedence.Keywords._leftCurly, Precedence.Keywords._rightCurly, "term", Predef.id);
    tmp75 = Rules.makeBracketRule(Precedence.Keywords._begin, Precedence.Keywords._end, "term", (tree) => {
      if (tree instanceof Tree.Empty.class) {
        return Tree.Sequence(Stack.Nil)
      } else {
        return tree
      }
    });
    tmp76 = ParseRule.Choice.Ref("term", (lhs, compose) => {
      return runtime.safeCall(compose(lhs))
    }, Option.None, Option.None, Rules.termInfixRule);
    tmp77 = ParseRule.rule("prefix rules for expressions", Rules.#letExpression, Rules.#funTerm, Rules.#matchTerm, Rules.#functionTerm, Rules.#ifThenElse, Rules.#whileTerm, Rules.forTerm, tmp71, tmp73, tmp74, tmp75, tmp76);
    this.termRule = tmp77;
    tmp78 = (lhs, rhs) => {
      let param0, tail, tmp140, tmp141, tmp142;
      if (rhs instanceof Tree.Tuple.class) {
        param0 = rhs.trees;
        tail = param0;
        tmp140 = Stack.Cons(lhs, tail);
        return Tree.Tuple(tmp140)
      } else {
        tmp141 = Stack.Cons(rhs, Stack.Nil);
        tmp142 = Stack.Cons(lhs, tmp141);
        return Tree.Tuple(tmp142)
      }
    };
    tmp79 = Rules.makeInfixChoice(Precedence.TypeKeywords._comma, "type", tmp78);
    tmp80 = Rules.makeInfixChoice(Precedence.TypeKeywords._arrow, "type", (lhs, rhs) => {
      return Tree.Infix(Precedence.TypeKeywords._arrow, lhs, rhs)
    });
    tmp81 = Rules.makeInfixChoice(Precedence.TypeKeywords._asterisk, "type", (lhs, rhs) => {
      return Tree.Infix(Precedence.TypeKeywords._asterisk, lhs, rhs)
    });
    tmp82 = Option.Some(Precedence.TypeKeywords.appPrec);
    tmp83 = ParseRule.rule("end of type infix rules");
    tmp84 = ParseRule.Choice.Ref("type", (callee, _) => {
      return (argument) => {
        return Tree.App(callee, argument)
      }
    }, tmp82, Option.None, tmp83);
    tmp85 = ParseRule.rule("infix rules for types", tmp79, tmp80, tmp81, tmp84);
    this.typeInfixRule = tmp85;
    tmp86 = Rules.makeBracketRule(Precedence.TypeKeywords._leftRound, Precedence.TypeKeywords._rightRound, "type", Predef.id);
    tmp87 = ParseRule.Choice.Ref("type", (lhs, compose) => {
      return runtime.safeCall(compose(lhs))
    }, Option.None, Option.None, Rules.typeInfixRule);
    tmp88 = ParseRule.rule("rules for types", tmp86, tmp87);
    this.typeRule = tmp88;
    tmp89 = (ctor, argOpt) => {
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
    tmp90 = ParseRule.Choice.end(Option.None);
    tmp91 = ParseRule.Choice.reference("type", (argument, _) => {
      return Option.Some(argument)
    }, "the variant constructor's argument");
    tmp92 = ParseRule.Choice.keyword(Precedence.Keywords._of, tmp91);
    tmp93 = ParseRule.Choice.typeExpr(tmp89, "the variant constructor's name", tmp90, tmp92);
    tmp94 = Rules.defineKind("constr-decl", tmp93);
    tmp95 = (lhs, rhsOpt) => {
      let param0, rhs;
      if (rhsOpt instanceof Option.Some.class) {
        param0 = rhsOpt.value;
        rhs = param0;
        return Tree.Infix(Precedence.Keywords._bar, lhs, rhs)
      } else {
        return lhs
      }
    };
    tmp96 = ParseRule.Choice.end(Option.None);
    tmp97 = ParseRule.Choice.reference("variants", (more, _) => {
      return Option.Some(more)
    }, "variants end");
    tmp98 = ParseRule.Choice.keyword(Precedence.Keywords._bar, tmp97);
    tmp99 = ParseRule.Choice.reference("constr-decl", tmp95, "variants item", tmp96, tmp98);
    tmp100 = Rules.defineKind("variants", tmp99);
    tmp101 = (lhs, rhsMore) => {
      let first1, first0, rhs, more, tmp140;
      if (globalThis.Array.isArray(rhsMore) && rhsMore.length === 2) {
        first0 = rhsMore[0];
        first1 = rhsMore[1];
        rhs = first0;
        more = first1;
        tmp140 = runtime.safeCall(rhs(lhs));
        return Stack.Cons(tmp140, more)
      } else {
        throw new globalThis.Error("match error");
      }
    };
    tmp102 = ParseRule.Choice.end(Stack.Nil);
    tmp103 = ParseRule.Choice.reference("typedefs", (more, _) => {
      return more
    }, "typedef end");
    tmp104 = ParseRule.Choice.keyword(Precedence.Keywords._and, tmp103);
    tmp105 = ParseRule.Choice.reference("typedef-rhs", (rhs, more) => {
      return [
        rhs,
        more
      ]
    }, "typedef body", tmp102, tmp104);
    tmp106 = ParseRule.Choice.typeExpr(tmp101, "typedef name", tmp105);
    tmp107 = Rules.defineKind("typedefs", tmp106);
    tmp108 = ParseRule.Choice.reference("variants", (rhs, _) => {
      return (lhs) => {
        return Tree.Infix(Precedence.Keywords._equal, lhs, rhs)
      }
    }, "typedef-rhs: variants");
    tmp109 = (content, _) => {
      let tmp140, tmp141;
      if (content instanceof Stack.Nil.class) {
        tmp140 = Tree.Sequence(Stack.Nil);
        return Tree.Bracketed(Token.Curly, tmp140)
      } else {
        tmp141 = Tree.Sequence(content);
        return Tree.Bracketed(Token.Curly, tmp141)
      }
    };
    tmp110 = ParseRule.Choice.end(Tree.empty);
    tmp111 = ParseRule.Choice.keyword(Precedence.Keywords._rightCurly, tmp110);
    tmp112 = ParseRule.Choice.reference("label-decls", tmp109, "label-decl", tmp111);
    tmp113 = ParseRule.Choice.keyword(Precedence.Keywords._leftCurly, tmp112);
    tmp114 = ParseRule.Choice.map(tmp113, (rhs) => {
      return (lhs) => {
        return Tree.Infix(Precedence.Keywords._equal, lhs, rhs)
      }
    });
    tmp115 = ParseRule.Choice.keyword(Precedence.Keywords._equal, tmp108, tmp114);
    tmp116 = ParseRule.Choice.reference("type", (rhs, _) => {
      return (lhs) => {
        return Tree.Infix(Precedence.Keywords._equalequal, lhs, rhs)
      }
    }, "type alias body");
    tmp117 = ParseRule.Choice.keyword(Precedence.Keywords._equalequal, tmp116);
    tmp118 = Rules.defineKind("typedef-rhs", tmp115, tmp117);
    tmp119 = Tree.infix(Precedence.TypeKeywords._colon);
    tmp120 = ParseRule.Choice.typeExpr((rhs, _) => {
      return rhs
    }, "label-decl body");
    tmp121 = ParseRule.Choice.keyword(Precedence.TypeKeywords._colon, tmp120);
    tmp122 = ParseRule.Choice.typeExpr(tmp119, "label-decl name", tmp121);
    tmp123 = Rules.defineKind("label-decl", tmp122);
    tmp124 = ParseRule.Choice.end(Stack.Nil);
    tmp125 = ParseRule.Choice.reference("label-decls", (more, _) => {
      return more
    }, "more label-decls");
    tmp126 = ParseRule.Choice.keyword(Precedence.Keywords._semicolon, tmp125);
    tmp127 = ParseRule.Choice.reference("label-decl", Stack.Cons, "the first label-decl", tmp124, tmp126);
    tmp128 = Rules.defineKind("label-decls", tmp127);
    tmp129 = ParseRule.Choice.end(Stack.Nil);
    tmp130 = ParseRule.Choice.reference("constr-decls", (tail, _) => {
      return tail
    }, "more constructor declarations");
    tmp131 = ParseRule.Choice.keyword(Precedence.Keywords._bar, tmp130);
    tmp132 = ParseRule.Choice.reference("constr-decl", Stack.Cons, "the first constructor declaration", tmp129, tmp131);
    tmp133 = Rules.defineKind("constr-decls", tmp132);
    tmp134 = Rules.makeLetBindings(false);
    tmp135 = ParseRule.Choice.reference("typedefs", (typedefs, _) => {
      return Tree.Define(Tree.DefineKind.Type, typedefs)
    }, "more typedefs");
    tmp136 = ParseRule.Choice.keyword(Precedence.Keywords._type, tmp135);
    tmp137 = ParseRule.Choice.reference("constr-decls", (decls, _) => {
      return Tree.Define(Tree.DefineKind.Exception, decls)
    }, "constructor declarations");
    tmp138 = ParseRule.Choice.keyword(Precedence.Keywords._exception, tmp137);
    tmp139 = ParseRule.rule("prefix rules for module items", tmp134, tmp136, tmp138);
    this.declRule = tmp139;
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
    tmp12 = ParseRule.Choice.Optional(tmp2, tmp11);
    return ParseRule.Choice.keyword(Precedence.Keywords._let, tmp12)
  } 
  static get forTerm() {
    let intro, innerPart, tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14;
    intro = "for: ";
    tmp = intro + "`do` keyword";
    tmp1 = intro + "`done` keyword";
    tmp2 = ParseRule.Choice.keyword(Precedence.Keywords._done);
    tmp3 = ParseRule.Choice.term((body, _) => {
      return body
    }, tmp1, tmp2);
    tmp4 = ParseRule.Choice.keyword(Precedence.Keywords._do, tmp3);
    tmp5 = ParseRule.Choice.term((end, body) => {
      return [
        end,
        body
      ]
    }, tmp, tmp4);
    innerPart = tmp5;
    tmp6 = (head, startEndBody) => {
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
    tmp7 = intro + "head";
    tmp8 = (start, endBody) => {
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
    tmp9 = intro + "`to` or `downto` keyword";
    tmp10 = ParseRule.Choice.keyword(Precedence.Keywords._to, innerPart);
    tmp11 = ParseRule.Choice.keyword(Precedence.Keywords._downto, innerPart);
    tmp12 = ParseRule.Choice.term(tmp8, tmp9, tmp10, tmp11);
    tmp13 = ParseRule.Choice.keyword(Precedence.Keywords._equal, tmp12);
    tmp14 = ParseRule.Choice.term(tmp6, tmp7, tmp13);
    return ParseRule.Choice.keyword(Precedence.Keywords._for, tmp14);
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
    tmp1 = contentKind + ": close bracket";
    tmp2 = ParseRule.Choice.end(Tree.empty);
    tmp3 = ParseRule.Choice.keyword(closing, tmp2);
    tmp4 = ParseRule.Choice.reference(contentKind, tmp, tmp1, tmp3);
    return ParseRule.Choice.keyword(opening, tmp4)
  }
  static toString() { return "Rules"; }
};
let Rules = Rules1; export default Rules;
