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
    let tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20, tmp21, tmp22, tmp23, tmp24, tmp25, tmp26, tmp27, tmp28, tmp29, tmp30, tmp31, tmp32, tmp33, tmp34, tmp35, tmp36, tmp37, tmp38, tmp39, tmp40, tmp41, tmp42, tmp43, tmp44, tmp45, tmp46, tmp47, tmp48, tmp49, tmp50, tmp51, tmp52, tmp53, tmp54, tmp55, tmp56, tmp57, tmp58, tmp59, tmp60, tmp61, tmp62, tmp63, tmp64, tmp65, tmp66, tmp67, tmp68, tmp69, tmp70, tmp71, tmp72, tmp73, tmp74, tmp75, tmp76, tmp77, tmp78, tmp79, tmp80, tmp81, tmp82, tmp83, tmp84, tmp85, tmp86, tmp87, tmp88, tmp89, tmp90, tmp91, tmp92, tmp93, tmp94, tmp95, tmp96, tmp97, tmp98, tmp99, tmp100, tmp101, tmp102, tmp103, tmp104, tmp105, tmp106, tmp107, tmp108, tmp109, tmp110, tmp111, tmp112, tmp113, tmp114, tmp115, tmp116, tmp117, tmp118, tmp119, tmp120, tmp121, tmp122, tmp123, tmp124, tmp125, tmp126, tmp127, tmp128, tmp129, tmp130, tmp131, tmp132, tmp133, tmp134, tmp135, tmp136, tmp137, tmp138, tmp139, tmp140, tmp141, tmp142, tmp143, tmp144, tmp145, tmp146, tmp147, tmp148, tmp149, tmp150, tmp151, tmp152, tmp153, tmp154, tmp155, tmp156, tmp157;
    tmp = new BetterMap.Map();
    this.syntaxKinds = tmp;
    tmp1 = (lhs, rhsBindings) => {
      let first1, first0, rhs, bindings, tmp158;
      if (globalThis.Array.isArray(rhsBindings) && rhsBindings.length === 2) {
        first0 = rhsBindings[0];
        first1 = rhsBindings[1];
        rhs = first0;
        bindings = first1;
        tmp158 = Tree.Infix(Precedence.Keywords._equal, lhs, rhs);
        return Stack.Cons(tmp158, bindings)
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
      let tmp158;
      tmp158 = Stack.Cons(params, Stack.Nil);
      return Tree.Lambda(tmp158, body)
    }, "function parameters", tmp12);
    tmp14 = ParseRule.Choice.keyword(Precedence.Keywords._fun, tmp13);
    Rules.#funTerm = tmp14;
    tmp15 = (lhs, rhsTail) => {
      let first1, first0, rhs, tail, tmp158;
      if (globalThis.Array.isArray(rhsTail) && rhsTail.length === 2) {
        first0 = rhsTail[0];
        first1 = rhsTail[1];
        rhs = first0;
        tail = first1;
        tmp158 = Tree.Infix(Precedence.Keywords._thinArrow, lhs, rhs);
        return Stack.Cons(tmp158, tail)
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
      let param0, tail, tmp158, tmp159, tmp160;
      if (rhs instanceof Tree.Tuple.class) {
        param0 = rhs.trees;
        tail = param0;
        tmp158 = Stack.Cons(lhs, tail);
        return Tree.Tuple(tmp158)
      } else {
        tmp159 = Stack.Cons(rhs, Stack.Nil);
        tmp160 = Stack.Cons(lhs, tmp159);
        return Tree.Tuple(tmp160)
      }
    };
    tmp35 = Rules.makeInfixChoice(Precedence.Keywords._comma, "term", tmp34);
    tmp36 = (lhs, rhs) => {
      let param0, tail, tmp158, tmp159, tmp160;
      if (rhs instanceof Tree.Sequence.class) {
        param0 = rhs.trees;
        tail = param0;
        tmp158 = Stack.Cons(lhs, tail);
        return Tree.Sequence(tmp158)
      } else {
        tmp159 = Stack.Cons(rhs, Stack.Nil);
        tmp160 = Stack.Cons(lhs, tmp159);
        return Tree.Sequence(tmp160)
      }
    };
    tmp37 = Rules.makeInfixChoice(Precedence.Keywords._semicolon, "term", tmp36);
    tmp38 = Rules.makeInfixChoice(Precedence.Keywords._leftArrow, "term", (lhs, rhs) => {
      return Tree.Infix(Precedence.Keywords._leftArrow, lhs, rhs)
    });
    tmp39 = ParseRule.Choice.keyword(Precedence.Keywords._rightRound);
    tmp40 = ParseRule.Choice.term((argument, _) => {
      return (lhs) => {
        let tmp158;
        tmp158 = Tree.Bracketed(Token.Round, argument);
        return Tree.Infix(Precedence.Keywords._period, lhs, tmp158)
      }
    }, "application argument", tmp39);
    tmp41 = ParseRule.Choice.keyword(Precedence.Keywords._leftRound, tmp40);
    tmp42 = ParseRule.Choice.reference("term", (rhs, _) => {
      return (lhs) => {
        return Tree.Infix(Precedence.Keywords._period, lhs, rhs)
      }
    }, "operator `.` right-hand side");
    tmp43 = ParseRule.Choice.keyword(Precedence.Keywords._period, tmp41, tmp42);
    tmp44 = ParseRule.Choice.typeExpr((rhs, _) => {
      return (lhs) => {
        return Tree.Infix(Precedence.Keywords._colon, lhs, rhs)
      }
    }, "right-hand side type");
    tmp45 = ParseRule.Choice.keyword(Precedence.Keywords._colon, tmp44);
    tmp46 = Option.Some(Precedence.Keywords.appPrec);
    tmp47 = ParseRule.Choice.termWithPrec((argument, _) => {
      return (callee) => {
        return Tree.App(callee, argument)
      }
    }, "application argument", tmp46, Option.None);
    tmp48 = ParseRule.rule("infix rules for expressions", tmp35, tmp37, tmp38, tmp43, tmp45, tmp47);
    this.termInfixRule = tmp48;
    tmp49 = ParseRule.Choice.keyword(Precedence.Keywords._bar);
    tmp50 = ParseRule.rule("pattern matching case body", tmp49);
    tmp51 = Rules.getRuleByKind("simple-matching");
    tmp52 = ParseRule.Choice.optional(tmp50, tmp51);
    tmp53 = ParseRule.Choice.keyword(Precedence.Keywords._with, tmp52);
    tmp54 = ParseRule.Choice.term(Tree.Match, "pattern matching scrutinee", tmp53);
    tmp55 = ParseRule.Choice.keyword(Precedence.Keywords._match, tmp54);
    tmp56 = ParseRule.Choice.keyword(Precedence.Keywords._bar);
    tmp57 = ParseRule.rule("function body", tmp56);
    tmp58 = Rules.getRuleByKind("simple-matching");
    tmp59 = ParseRule.Choice.optional(tmp57, tmp58);
    tmp60 = ParseRule.Choice.map(tmp59, (branches) => {
      return Tree.Match(Tree.empty, branches)
    });
    tmp61 = ParseRule.Choice.keyword(Precedence.Keywords._function, tmp60);
    tmp62 = (tst, conAlt) => {
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
    tmp63 = ParseRule.Choice.end(Option.None);
    tmp64 = ParseRule.Choice.end(Option.None);
    tmp65 = ParseRule.Choice.term((alt, _) => {
      return Option.Some(alt)
    }, "if-then-else alternative", tmp64);
    tmp66 = ParseRule.Choice.keyword(Precedence.Keywords._else, tmp65);
    tmp67 = ParseRule.Choice.term((con, optAlt) => {
      return [
        con,
        optAlt
      ]
    }, "if-then-else consequent", tmp63, tmp66);
    tmp68 = ParseRule.Choice.keyword(Precedence.Keywords._then, tmp67);
    tmp69 = ParseRule.Choice.term(tmp62, "if-then-else condition", tmp68);
    tmp70 = ParseRule.Choice.keyword(Precedence.Keywords._if, tmp69);
    tmp71 = ParseRule.Choice.keyword(Precedence.Keywords._done);
    tmp72 = ParseRule.Choice.term((body, _) => {
      return body
    }, "while end", tmp71);
    tmp73 = ParseRule.Choice.keyword(Precedence.Keywords._do, tmp72);
    tmp74 = ParseRule.Choice.term(Tree.While, "while body", tmp73);
    tmp75 = ParseRule.Choice.keyword(Precedence.Keywords._while, tmp74);
    tmp76 = ParseRule.Choice.keyword(Precedence.Keywords._to);
    tmp77 = ParseRule.Choice.keyword(Precedence.Keywords._downto);
    tmp78 = ParseRule.rule("iteration keyword", tmp76, tmp77);
    tmp79 = ParseRule.Choice.keyword(Precedence.Keywords._done);
    tmp80 = ParseRule.Choice.term((body, _) => {
      return body
    }, "`for` `done` keyword", tmp79);
    tmp81 = ParseRule.Choice.keyword(Precedence.Keywords._do, tmp80);
    tmp82 = ParseRule.Choice.term((end, body) => {
      return [
        end,
        body
      ]
    }, "`for` `do` keyword", tmp81);
    tmp83 = ParseRule.rule("the iteration keyword", tmp82);
    tmp84 = ParseRule.Choice.siding(tmp78, tmp83);
    tmp85 = ParseRule.Choice.term((start, endBody) => {
      return [
        start,
        ...endBody
      ]
    }, "`for` `to` or `downto` keyword", tmp84);
    tmp86 = ParseRule.Choice.keyword(Precedence.Keywords._equal, tmp85);
    tmp87 = ParseRule.Choice.term((head, startEndBody) => {
      return Tree.For(head, ...startEndBody)
    }, "`for` head", tmp86);
    tmp88 = ParseRule.Choice.keyword(Precedence.Keywords._for, tmp87);
    tmp89 = Rules.makeBracketRule(Precedence.Keywords._leftRound, Precedence.Keywords._rightRound, "term", (tree) => {
      if (tree instanceof Tree.Empty.class) {
        return Tree.Tuple(Stack.Nil)
      } else {
        return tree
      }
    });
    tmp90 = (tree) => {
      let tmp158;
      if (tree instanceof Tree.Empty.class) {
        tmp158 = Tree.Sequence(Stack.Nil);
      } else {
        tmp158 = tree;
      }
      return Tree.Bracketed(Token.Square, tmp158)
    };
    tmp91 = Rules.makeBracketRule(Precedence.Keywords._leftSquare, Precedence.Keywords._rightSquare, "term", tmp90);
    tmp92 = Rules.makeBracketRule(Precedence.Keywords._leftCurly, Precedence.Keywords._rightCurly, "term", Predef.id);
    tmp93 = Rules.makeBracketRule(Precedence.Keywords._begin, Precedence.Keywords._end, "term", (tree) => {
      if (tree instanceof Tree.Empty.class) {
        return Tree.Sequence(Stack.Nil)
      } else {
        return tree
      }
    });
    tmp94 = ParseRule.Choice.Ref("term", (lhs, compose) => {
      return runtime.safeCall(compose(lhs))
    }, Option.None, Option.None, Rules.termInfixRule);
    tmp95 = ParseRule.rule("prefix rules for expressions", Rules.#letExpression, Rules.#funTerm, tmp55, tmp61, tmp70, tmp75, tmp88, tmp89, tmp91, tmp92, tmp93, tmp94);
    this.termRule = tmp95;
    tmp96 = (lhs, rhs) => {
      let param0, tail, tmp158, tmp159, tmp160;
      if (rhs instanceof Tree.Tuple.class) {
        param0 = rhs.trees;
        tail = param0;
        tmp158 = Stack.Cons(lhs, tail);
        return Tree.Tuple(tmp158)
      } else {
        tmp159 = Stack.Cons(rhs, Stack.Nil);
        tmp160 = Stack.Cons(lhs, tmp159);
        return Tree.Tuple(tmp160)
      }
    };
    tmp97 = Rules.makeInfixChoice(Precedence.TypeKeywords._comma, "type", tmp96);
    tmp98 = Rules.makeInfixChoice(Precedence.TypeKeywords._arrow, "type", (lhs, rhs) => {
      return Tree.Infix(Precedence.TypeKeywords._arrow, lhs, rhs)
    });
    tmp99 = Rules.makeInfixChoice(Precedence.TypeKeywords._asterisk, "type", (lhs, rhs) => {
      return Tree.Infix(Precedence.TypeKeywords._asterisk, lhs, rhs)
    });
    tmp100 = Option.Some(Precedence.TypeKeywords.appPrec);
    tmp101 = ParseRule.rule("end of type infix rules");
    tmp102 = ParseRule.Choice.Ref("type", (callee, _) => {
      return (argument) => {
        return Tree.App(callee, argument)
      }
    }, tmp100, Option.None, tmp101);
    tmp103 = ParseRule.rule("infix rules for types", tmp97, tmp98, tmp99, tmp102);
    this.typeInfixRule = tmp103;
    tmp104 = Rules.makeBracketRule(Precedence.TypeKeywords._leftRound, Precedence.TypeKeywords._rightRound, "type", Predef.id);
    tmp105 = ParseRule.Choice.Ref("type", (lhs, compose) => {
      return runtime.safeCall(compose(lhs))
    }, Option.None, Option.None, Rules.typeInfixRule);
    tmp106 = ParseRule.rule("rules for types", tmp104, tmp105);
    this.typeRule = tmp106;
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
    tmp109 = ParseRule.Choice.reference("type", (argument, _) => {
      return Option.Some(argument)
    }, "the variant constructor's argument");
    tmp110 = ParseRule.Choice.keyword(Precedence.Keywords._of, tmp109);
    tmp111 = ParseRule.Choice.typeExpr(tmp107, "the variant constructor's name", tmp108, tmp110);
    tmp112 = Rules.defineKind("constr-decl", tmp111);
    tmp113 = (lhs, rhsOpt) => {
      let param0, rhs;
      if (rhsOpt instanceof Option.Some.class) {
        param0 = rhsOpt.value;
        rhs = param0;
        return Tree.Infix(Precedence.Keywords._bar, lhs, rhs)
      } else {
        return lhs
      }
    };
    tmp114 = ParseRule.Choice.end(Option.None);
    tmp115 = ParseRule.Choice.reference("variants", (more, _) => {
      return Option.Some(more)
    }, "variants end");
    tmp116 = ParseRule.Choice.keyword(Precedence.Keywords._bar, tmp115);
    tmp117 = ParseRule.Choice.reference("constr-decl", tmp113, "variants item", tmp114, tmp116);
    tmp118 = Rules.defineKind("variants", tmp117);
    tmp119 = (lhs, rhsMore) => {
      let first1, first0, rhs, more, tmp158;
      if (globalThis.Array.isArray(rhsMore) && rhsMore.length === 2) {
        first0 = rhsMore[0];
        first1 = rhsMore[1];
        rhs = first0;
        more = first1;
        tmp158 = runtime.safeCall(rhs(lhs));
        return Stack.Cons(tmp158, more)
      } else {
        throw new globalThis.Error("match error");
      }
    };
    tmp120 = ParseRule.Choice.end(Stack.Nil);
    tmp121 = ParseRule.Choice.reference("typedefs", (more, _) => {
      return more
    }, "typedef end");
    tmp122 = ParseRule.Choice.keyword(Precedence.Keywords._and, tmp121);
    tmp123 = ParseRule.Choice.reference("typedef-rhs", (rhs, more) => {
      return [
        rhs,
        more
      ]
    }, "typedef body", tmp120, tmp122);
    tmp124 = ParseRule.Choice.typeExpr(tmp119, "typedef name", tmp123);
    tmp125 = Rules.defineKind("typedefs", tmp124);
    tmp126 = ParseRule.Choice.reference("variants", (rhs, _) => {
      return (lhs) => {
        return Tree.Infix(Precedence.Keywords._equal, lhs, rhs)
      }
    }, "typedef-rhs: variants");
    tmp127 = (content, _) => {
      let tmp158, tmp159;
      if (content instanceof Stack.Nil.class) {
        tmp158 = Tree.Sequence(Stack.Nil);
        return Tree.Bracketed(Token.Curly, tmp158)
      } else {
        tmp159 = Tree.Sequence(content);
        return Tree.Bracketed(Token.Curly, tmp159)
      }
    };
    tmp128 = ParseRule.Choice.end(Tree.empty);
    tmp129 = ParseRule.Choice.keyword(Precedence.Keywords._rightCurly, tmp128);
    tmp130 = ParseRule.Choice.reference("label-decls", tmp127, "label-decl", tmp129);
    tmp131 = ParseRule.Choice.keyword(Precedence.Keywords._leftCurly, tmp130);
    tmp132 = ParseRule.Choice.map(tmp131, (rhs) => {
      return (lhs) => {
        return Tree.Infix(Precedence.Keywords._equal, lhs, rhs)
      }
    });
    tmp133 = ParseRule.Choice.keyword(Precedence.Keywords._equal, tmp126, tmp132);
    tmp134 = ParseRule.Choice.reference("type", (rhs, _) => {
      return (lhs) => {
        return Tree.Infix(Precedence.Keywords._equalequal, lhs, rhs)
      }
    }, "type alias body");
    tmp135 = ParseRule.Choice.keyword(Precedence.Keywords._equalequal, tmp134);
    tmp136 = Rules.defineKind("typedef-rhs", tmp133, tmp135);
    tmp137 = Tree.infix(Precedence.TypeKeywords._colon);
    tmp138 = ParseRule.Choice.typeExpr((rhs, _) => {
      return rhs
    }, "label-decl body");
    tmp139 = ParseRule.Choice.keyword(Precedence.TypeKeywords._colon, tmp138);
    tmp140 = ParseRule.Choice.typeExpr(tmp137, "label-decl name", tmp139);
    tmp141 = Rules.defineKind("label-decl", tmp140);
    tmp142 = ParseRule.Choice.end(Stack.Nil);
    tmp143 = ParseRule.Choice.reference("label-decls", (more, _) => {
      return more
    }, "more label-decls");
    tmp144 = ParseRule.Choice.keyword(Precedence.Keywords._semicolon, tmp143);
    tmp145 = ParseRule.Choice.reference("label-decl", Stack.Cons, "the first label-decl", tmp142, tmp144);
    tmp146 = Rules.defineKind("label-decls", tmp145);
    tmp147 = ParseRule.Choice.end(Stack.Nil);
    tmp148 = ParseRule.Choice.reference("constr-decls", (tail, _) => {
      return tail
    }, "more constructor declarations");
    tmp149 = ParseRule.Choice.keyword(Precedence.Keywords._bar, tmp148);
    tmp150 = ParseRule.Choice.reference("constr-decl", Stack.Cons, "the first constructor declaration", tmp147, tmp149);
    tmp151 = Rules.defineKind("constr-decls", tmp150);
    tmp152 = Rules.makeLetBindings(false);
    tmp153 = ParseRule.Choice.reference("typedefs", (typedefs, _) => {
      return Tree.Define(Tree.DefineKind.Type, typedefs)
    }, "more typedefs");
    tmp154 = ParseRule.Choice.keyword(Precedence.Keywords._type, tmp153);
    tmp155 = ParseRule.Choice.reference("constr-decls", (decls, _) => {
      return Tree.Define(Tree.DefineKind.Exception, decls)
    }, "constructor declarations");
    tmp156 = ParseRule.Choice.keyword(Precedence.Keywords._exception, tmp155);
    tmp157 = ParseRule.rule("prefix rules for module items", tmp152, tmp154, tmp156);
    this.declRule = tmp157;
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
