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
    let tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20, tmp21, tmp22, tmp23, tmp24, tmp25, tmp26, tmp27, tmp28, tmp29, tmp30, tmp31, tmp32, tmp33, tmp34, tmp35, tmp36, tmp37, tmp38, tmp39, tmp40, tmp41, tmp42, tmp43, tmp44, tmp45, tmp46, tmp47, tmp48, tmp49, tmp50, tmp51, tmp52, tmp53, tmp54, tmp55, tmp56, tmp57, tmp58, tmp59, tmp60, tmp61, tmp62, tmp63, tmp64, tmp65, tmp66, tmp67, tmp68, tmp69, tmp70, tmp71, tmp72, tmp73, tmp74, tmp75, tmp76, tmp77, tmp78, tmp79, tmp80, tmp81, tmp82, tmp83, tmp84, tmp85, tmp86, tmp87, tmp88, tmp89, tmp90, tmp91, tmp92, tmp93, tmp94, tmp95, tmp96, tmp97, tmp98, tmp99, tmp100, tmp101, tmp102, tmp103, tmp104, tmp105, tmp106, tmp107, tmp108, tmp109, tmp110, tmp111, tmp112, tmp113, tmp114, tmp115, tmp116, tmp117, tmp118, tmp119, tmp120, tmp121, tmp122, tmp123, tmp124, tmp125, tmp126, tmp127, tmp128, tmp129, tmp130, tmp131, tmp132, tmp133, tmp134, tmp135, tmp136, tmp137, tmp138, tmp139, tmp140, tmp141, tmp142, tmp143, tmp144, tmp145, tmp146, tmp147, tmp148, tmp149, tmp150, tmp151, tmp152;
    tmp = new BetterMap.Map();
    this.syntaxKinds = tmp;
    tmp1 = (lhs, rhsBindings) => {
      let first1, first0, rhs, bindings, tmp153;
      if (globalThis.Array.isArray(rhsBindings) && rhsBindings.length === 2) {
        first0 = rhsBindings[0];
        first1 = rhsBindings[1];
        rhs = first0;
        bindings = first1;
        tmp153 = Tree.Infix(Precedence.Keywords._equal, lhs, rhs);
        return Stack.Cons(tmp153, bindings)
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
      let tmp153;
      tmp153 = Stack.Cons(params, Stack.Nil);
      return Tree.Lambda(tmp153, body)
    }, "function parameters", tmp12);
    tmp14 = ParseRule.Choice.keyword(Precedence.Keywords._fun, tmp13);
    Rules.#funTerm = tmp14;
    tmp15 = (lhs, rhsTail) => {
      let first1, first0, rhs, tail, tmp153;
      if (globalThis.Array.isArray(rhsTail) && rhsTail.length === 2) {
        first0 = rhsTail[0];
        first1 = rhsTail[1];
        rhs = first0;
        tail = first1;
        tmp153 = Tree.Infix(Precedence.Keywords._thinArrow, lhs, rhs);
        return Stack.Cons(tmp153, tail)
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
      let param0, tail, tmp153, tmp154, tmp155;
      if (rhs instanceof Tree.Tuple.class) {
        param0 = rhs.trees;
        tail = param0;
        tmp153 = Stack.Cons(lhs, tail);
        return Tree.Tuple(tmp153)
      } else {
        tmp154 = Stack.Cons(rhs, Stack.Nil);
        tmp155 = Stack.Cons(lhs, tmp154);
        return Tree.Tuple(tmp155)
      }
    };
    tmp35 = Rules.makeInfixChoice(Precedence.Keywords._comma, "term", tmp34);
    tmp36 = (lhs, rhs) => {
      let param0, tail, tmp153, tmp154, tmp155;
      if (rhs instanceof Tree.Sequence.class) {
        param0 = rhs.trees;
        tail = param0;
        tmp153 = Stack.Cons(lhs, tail);
        return Tree.Sequence(tmp153)
      } else {
        tmp154 = Stack.Cons(rhs, Stack.Nil);
        tmp155 = Stack.Cons(lhs, tmp154);
        return Tree.Sequence(tmp155)
      }
    };
    tmp37 = Rules.makeInfixChoice(Precedence.Keywords._semicolon, "term", tmp36);
    tmp38 = Rules.makeInfixChoice(Precedence.Keywords._leftArrow, "term", (lhs, rhs) => {
      return Tree.Infix(Precedence.Keywords._leftArrow, lhs, rhs)
    });
    tmp39 = ParseRule.Choice.typeExpr((rhs, _) => {
      return (lhs) => {
        return Tree.Infix(Precedence.Keywords._colon, lhs, rhs)
      }
    }, "right-hand side type");
    tmp40 = ParseRule.Choice.keyword(Precedence.Keywords._colon, tmp39);
    tmp41 = Option.Some(Precedence.Keywords.appPrec);
    tmp42 = ParseRule.Choice.termWithPrec((argument, _) => {
      return (callee) => {
        return Tree.App(callee, argument)
      }
    }, "application argument", tmp41, Option.None);
    tmp43 = ParseRule.rule("infix rules for expressions", tmp35, tmp37, tmp38, tmp40, tmp42);
    this.termInfixRule = tmp43;
    tmp44 = ParseRule.Choice.keyword(Precedence.Keywords._bar);
    tmp45 = ParseRule.rule("pattern matching case body", tmp44);
    tmp46 = Rules.getRuleByKind("simple-matching");
    tmp47 = ParseRule.Choice.optional(tmp45, tmp46);
    tmp48 = ParseRule.Choice.keyword(Precedence.Keywords._with, tmp47);
    tmp49 = ParseRule.Choice.term(Tree.Match, "pattern matching scrutinee", tmp48);
    tmp50 = ParseRule.Choice.keyword(Precedence.Keywords._match, tmp49);
    tmp51 = ParseRule.Choice.keyword(Precedence.Keywords._bar);
    tmp52 = ParseRule.rule("function body", tmp51);
    tmp53 = Rules.getRuleByKind("simple-matching");
    tmp54 = ParseRule.Choice.optional(tmp52, tmp53);
    tmp55 = ParseRule.Choice.map(tmp54, (branches) => {
      return Tree.Match(Tree.empty, branches)
    });
    tmp56 = ParseRule.Choice.keyword(Precedence.Keywords._function, tmp55);
    tmp57 = (tst, conAlt) => {
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
    tmp58 = ParseRule.Choice.end(Option.None);
    tmp59 = ParseRule.Choice.end(Option.None);
    tmp60 = ParseRule.Choice.term((alt, _) => {
      return Option.Some(alt)
    }, "if-then-else alternative", tmp59);
    tmp61 = ParseRule.Choice.keyword(Precedence.Keywords._else, tmp60);
    tmp62 = ParseRule.Choice.term((con, optAlt) => {
      return [
        con,
        optAlt
      ]
    }, "if-then-else consequent", tmp58, tmp61);
    tmp63 = ParseRule.Choice.keyword(Precedence.Keywords._then, tmp62);
    tmp64 = ParseRule.Choice.term(tmp57, "if-then-else condition", tmp63);
    tmp65 = ParseRule.Choice.keyword(Precedence.Keywords._if, tmp64);
    tmp66 = ParseRule.Choice.keyword(Precedence.Keywords._done);
    tmp67 = ParseRule.Choice.term((body, _) => {
      return body
    }, "while end", tmp66);
    tmp68 = ParseRule.Choice.keyword(Precedence.Keywords._do, tmp67);
    tmp69 = ParseRule.Choice.term(Tree.While, "while body", tmp68);
    tmp70 = ParseRule.Choice.keyword(Precedence.Keywords._while, tmp69);
    tmp71 = ParseRule.Choice.keyword(Precedence.Keywords._to);
    tmp72 = ParseRule.Choice.keyword(Precedence.Keywords._downto);
    tmp73 = ParseRule.rule("iteration keyword", tmp71, tmp72);
    tmp74 = ParseRule.Choice.keyword(Precedence.Keywords._done);
    tmp75 = ParseRule.Choice.term((body, _) => {
      return body
    }, "`for` `done` keyword", tmp74);
    tmp76 = ParseRule.Choice.keyword(Precedence.Keywords._do, tmp75);
    tmp77 = ParseRule.Choice.term((end, body) => {
      return [
        end,
        body
      ]
    }, "`for` `do` keyword", tmp76);
    tmp78 = ParseRule.rule("the iteration keyword", tmp77);
    tmp79 = ParseRule.Choice.siding(tmp73, tmp78);
    tmp80 = ParseRule.Choice.term((start, endBody) => {
      return [
        start,
        ...endBody
      ]
    }, "`for` `to` or `downto` keyword", tmp79);
    tmp81 = ParseRule.Choice.keyword(Precedence.Keywords._equal, tmp80);
    tmp82 = ParseRule.Choice.term((head, startEndBody) => {
      return Tree.For(head, ...startEndBody)
    }, "`for` head", tmp81);
    tmp83 = ParseRule.Choice.keyword(Precedence.Keywords._for, tmp82);
    tmp84 = Rules.makeBracketRule(Precedence.Keywords._leftRound, Precedence.Keywords._rightRound, "term", (tree) => {
      if (tree instanceof Tree.Empty.class) {
        return Tree.Tuple(Stack.Nil)
      } else {
        return tree
      }
    });
    tmp85 = (tree) => {
      let tmp153;
      if (tree instanceof Tree.Empty.class) {
        tmp153 = Tree.Sequence(Stack.Nil);
      } else {
        tmp153 = tree;
      }
      return Tree.Bracketed(Token.Square, tmp153)
    };
    tmp86 = Rules.makeBracketRule(Precedence.Keywords._leftSquare, Precedence.Keywords._rightSquare, "term", tmp85);
    tmp87 = Rules.makeBracketRule(Precedence.Keywords._leftCurly, Precedence.Keywords._rightCurly, "term", Predef.id);
    tmp88 = Rules.makeBracketRule(Precedence.Keywords._begin, Precedence.Keywords._end, "term", (tree) => {
      if (tree instanceof Tree.Empty.class) {
        return Tree.Sequence(Stack.Nil)
      } else {
        return tree
      }
    });
    tmp89 = ParseRule.Choice.Ref("term", (lhs, compose) => {
      return runtime.safeCall(compose(lhs))
    }, Option.None, Option.None, Rules.termInfixRule);
    tmp90 = ParseRule.rule("prefix rules for expressions", Rules.#letExpression, Rules.#funTerm, tmp50, tmp56, tmp65, tmp70, tmp83, tmp84, tmp86, tmp87, tmp88, tmp89);
    this.termRule = tmp90;
    tmp91 = (lhs, rhs) => {
      let param0, tail, tmp153, tmp154, tmp155;
      if (rhs instanceof Tree.Tuple.class) {
        param0 = rhs.trees;
        tail = param0;
        tmp153 = Stack.Cons(lhs, tail);
        return Tree.Tuple(tmp153)
      } else {
        tmp154 = Stack.Cons(rhs, Stack.Nil);
        tmp155 = Stack.Cons(lhs, tmp154);
        return Tree.Tuple(tmp155)
      }
    };
    tmp92 = Rules.makeInfixChoice(Precedence.TypeKeywords._comma, "type", tmp91);
    tmp93 = Rules.makeInfixChoice(Precedence.TypeKeywords._arrow, "type", (lhs, rhs) => {
      return Tree.Infix(Precedence.TypeKeywords._arrow, lhs, rhs)
    });
    tmp94 = Rules.makeInfixChoice(Precedence.TypeKeywords._asterisk, "type", (lhs, rhs) => {
      return Tree.Infix(Precedence.TypeKeywords._asterisk, lhs, rhs)
    });
    tmp95 = Option.Some(Precedence.TypeKeywords.appPrec);
    tmp96 = ParseRule.rule("end of type infix rules");
    tmp97 = ParseRule.Choice.Ref("type", (callee, _) => {
      return (argument) => {
        return Tree.App(callee, argument)
      }
    }, tmp95, Option.None, tmp96);
    tmp98 = ParseRule.rule("infix rules for types", tmp92, tmp93, tmp94, tmp97);
    this.typeInfixRule = tmp98;
    tmp99 = Rules.makeBracketRule(Precedence.TypeKeywords._leftRound, Precedence.TypeKeywords._rightRound, "type", Predef.id);
    tmp100 = ParseRule.Choice.Ref("type", (lhs, compose) => {
      return runtime.safeCall(compose(lhs))
    }, Option.None, Option.None, Rules.typeInfixRule);
    tmp101 = ParseRule.rule("rules for types", tmp99, tmp100);
    this.typeRule = tmp101;
    tmp102 = (ctor, argOpt) => {
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
    tmp103 = ParseRule.Choice.end(Option.None);
    tmp104 = ParseRule.Choice.reference("type", (argument, _) => {
      return Option.Some(argument)
    }, "the variant constructor's argument");
    tmp105 = ParseRule.Choice.keyword(Precedence.Keywords._of, tmp104);
    tmp106 = ParseRule.Choice.typeExpr(tmp102, "the variant constructor's name", tmp103, tmp105);
    tmp107 = Rules.defineKind("constr-decl", tmp106);
    tmp108 = (lhs, rhsOpt) => {
      let param0, rhs;
      if (rhsOpt instanceof Option.Some.class) {
        param0 = rhsOpt.value;
        rhs = param0;
        return Tree.Infix(Precedence.Keywords._bar, lhs, rhs)
      } else {
        return lhs
      }
    };
    tmp109 = ParseRule.Choice.end(Option.None);
    tmp110 = ParseRule.Choice.reference("variants", (more, _) => {
      return Option.Some(more)
    }, "variants end");
    tmp111 = ParseRule.Choice.keyword(Precedence.Keywords._bar, tmp110);
    tmp112 = ParseRule.Choice.reference("constr-decl", tmp108, "variants item", tmp109, tmp111);
    tmp113 = Rules.defineKind("variants", tmp112);
    tmp114 = (lhs, rhsMore) => {
      let first1, first0, rhs, more, tmp153;
      if (globalThis.Array.isArray(rhsMore) && rhsMore.length === 2) {
        first0 = rhsMore[0];
        first1 = rhsMore[1];
        rhs = first0;
        more = first1;
        tmp153 = runtime.safeCall(rhs(lhs));
        return Stack.Cons(tmp153, more)
      } else {
        throw new globalThis.Error("match error");
      }
    };
    tmp115 = ParseRule.Choice.end(Stack.Nil);
    tmp116 = ParseRule.Choice.reference("typedefs", (more, _) => {
      return more
    }, "typedef end");
    tmp117 = ParseRule.Choice.keyword(Precedence.Keywords._and, tmp116);
    tmp118 = ParseRule.Choice.reference("typedef-rhs", (rhs, more) => {
      return [
        rhs,
        more
      ]
    }, "typedef body", tmp115, tmp117);
    tmp119 = ParseRule.Choice.typeExpr(tmp114, "typedef name", tmp118);
    tmp120 = Rules.defineKind("typedefs", tmp119);
    tmp121 = ParseRule.Choice.reference("variants", (rhs, _) => {
      return (lhs) => {
        return Tree.Infix(Precedence.Keywords._equal, lhs, rhs)
      }
    }, "typedef-rhs: variants");
    tmp122 = (content, _) => {
      let tmp153, tmp154;
      if (content instanceof Stack.Nil.class) {
        tmp153 = Tree.Sequence(Stack.Nil);
        return Tree.Bracketed(Token.Curly, tmp153)
      } else {
        tmp154 = Tree.Sequence(content);
        return Tree.Bracketed(Token.Curly, tmp154)
      }
    };
    tmp123 = ParseRule.Choice.end(Tree.empty);
    tmp124 = ParseRule.Choice.keyword(Precedence.Keywords._rightCurly, tmp123);
    tmp125 = ParseRule.Choice.reference("label-decls", tmp122, "label-decl", tmp124);
    tmp126 = ParseRule.Choice.keyword(Precedence.Keywords._leftCurly, tmp125);
    tmp127 = ParseRule.Choice.map(tmp126, (rhs) => {
      return (lhs) => {
        return Tree.Infix(Precedence.Keywords._equal, lhs, rhs)
      }
    });
    tmp128 = ParseRule.Choice.keyword(Precedence.Keywords._equal, tmp121, tmp127);
    tmp129 = ParseRule.Choice.reference("type", (rhs, _) => {
      return (lhs) => {
        return Tree.Infix(Precedence.Keywords._equalequal, lhs, rhs)
      }
    }, "type alias body");
    tmp130 = ParseRule.Choice.keyword(Precedence.Keywords._equalequal, tmp129);
    tmp131 = Rules.defineKind("typedef-rhs", tmp128, tmp130);
    tmp132 = Tree.infix(Precedence.TypeKeywords._colon);
    tmp133 = ParseRule.Choice.typeExpr((rhs, _) => {
      return rhs
    }, "label-decl body");
    tmp134 = ParseRule.Choice.keyword(Precedence.TypeKeywords._colon, tmp133);
    tmp135 = ParseRule.Choice.typeExpr(tmp132, "label-decl name", tmp134);
    tmp136 = Rules.defineKind("label-decl", tmp135);
    tmp137 = ParseRule.Choice.end(Stack.Nil);
    tmp138 = ParseRule.Choice.reference("label-decls", (more, _) => {
      return more
    }, "more label-decls");
    tmp139 = ParseRule.Choice.keyword(Precedence.Keywords._semicolon, tmp138);
    tmp140 = ParseRule.Choice.reference("label-decl", Stack.Cons, "the first label-decl", tmp137, tmp139);
    tmp141 = Rules.defineKind("label-decls", tmp140);
    tmp142 = ParseRule.Choice.end(Stack.Nil);
    tmp143 = ParseRule.Choice.reference("constr-decls", (tail, _) => {
      return tail
    }, "more constructor declarations");
    tmp144 = ParseRule.Choice.keyword(Precedence.Keywords._bar, tmp143);
    tmp145 = ParseRule.Choice.reference("constr-decl", Stack.Cons, "the first constructor declaration", tmp142, tmp144);
    tmp146 = Rules.defineKind("constr-decls", tmp145);
    tmp147 = Rules.makeLetBindings(false);
    tmp148 = ParseRule.Choice.reference("typedefs", (typedefs, _) => {
      return Tree.Define(Tree.DefineKind.Type, typedefs)
    }, "more typedefs");
    tmp149 = ParseRule.Choice.keyword(Precedence.Keywords._type, tmp148);
    tmp150 = ParseRule.Choice.reference("constr-decls", (decls, _) => {
      return Tree.Define(Tree.DefineKind.Exception, decls)
    }, "constructor declarations");
    tmp151 = ParseRule.Choice.keyword(Precedence.Keywords._exception, tmp150);
    tmp152 = ParseRule.rule("prefix rules for module items", tmp147, tmp149, tmp151);
    this.declRule = tmp152;
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
