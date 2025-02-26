import runtime from "./../Runtime.mjs";
import Predef from "./../Predef.mjs";
import Option from "./../Option.mjs";
import Stack from "./../Stack.mjs";
import BetterMap from "./../BetterMap.mjs";
import TreeTracer from "./../TreeTracer.mjs";
import Iter from "./../Iter.mjs";
import Lexer from "./Lexer.mjs";
import Token from "./parsing/Token.mjs";
import TokenHelpers from "./parsing/TokenHelpers.mjs";
import Keyword from "./parsing/Keyword.mjs";
import Precedence from "./parsing/Precedence.mjs";
import Tree from "./parsing/Tree.mjs";
import ParseRule from "./parsing/ParseRule.mjs";
let Parser1;
Parser1 = class Parser {
  static #letExpression;
  static #letDefinition;
  static #whileTerm;
  static {
    let tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20, tmp21, tmp22, tmp23, tmp24, tmp25, tmp26, tmp27, tmp28, tmp29, tmp30, tmp31, tmp32, tmp33, tmp34, tmp35, tmp36, tmp37, tmp38, tmp39, tmp40, tmp41, tmp42, tmp43, tmp44, tmp45, tmp46, tmp47, tmp48, tmp49, tmp50, tmp51, tmp52, tmp53, tmp54, tmp55, tmp56, tmp57, tmp58, tmp59, tmp60, tmp61, tmp62, tmp63, tmp64, tmp65, tmp66, tmp67, tmp68;
    tmp = new TreeTracer.TreeTracer();
    this.tracer = tmp;
    tmp1 = new BetterMap.Map();
    this.syntaxKinds = tmp1;
    tmp2 = Parser.letBinding(true);
    Parser.#letExpression = tmp2;
    tmp3 = Parser.letBinding(false);
    Parser.#letDefinition = tmp3;
    tmp4 = (lhs, rhsTail) => {
      let first1, first0, rhs, tail, tmp69;
      if (globalThis.Array.isArray(rhsTail) && rhsTail.length === 2) {
        first0 = rhsTail[0];
        first1 = rhsTail[1];
        rhs = first0;
        tail = first1;
        tmp69 = Tree.Infix(Precedence.Keywords._thinArrow, lhs, rhs);
        return Stack.Cons(tmp69, tail)
      } else {
        throw new globalThis.Error("match error");
      }
    };
    tmp5 = ParseRule.Choice.end(Stack.Nil);
    tmp6 = ParseRule.Choice.end(runtime.Unit);
    tmp7 = ParseRule.Choice.reference("simple-matching", (tail, _) => {
      return tail
    }, "simple-matching tail", tmp6);
    tmp8 = ParseRule.Choice.keyword(Precedence.Keywords._bar, "separator", tmp7);
    tmp9 = ParseRule.Choice.term((rhs, tail) => {
      return [
        rhs,
        tail
      ]
    }, "rhs", tmp5, tmp8);
    tmp10 = ParseRule.Choice.keyword(Precedence.Keywords._thinArrow, "arrow", tmp9);
    tmp11 = ParseRule.Choice.term(tmp4, "pattern", tmp10);
    tmp12 = Parser.defineKind("simple-matching", tmp11);
    tmp13 = ParseRule.Choice.end(runtime.Unit);
    tmp14 = ParseRule.Choice.reference("pattern-list", (tail, _) => {
      return tail
    }, "pattern list tail", tmp13);
    tmp15 = ParseRule.Choice.term((head, tail) => {
      return Stack.Cons(head, tail)
    }, "pattern", tmp14);
    tmp16 = Parser.defineKind("pattern-list", tmp15);
    tmp17 = Tree.infix(Precedence.Keywords._thinArrow);
    tmp18 = ParseRule.Choice.end(Stack.Nil);
    tmp19 = ParseRule.Choice.end(runtime.Unit);
    tmp20 = ParseRule.Choice.reference("multiple-matching", (tail, _) => {
      return tail
    }, tmp19);
    tmp21 = ParseRule.Choice.term((rhs, _) => {
      return rhs
    }, "the right-hand side of the arrow", tmp18, tmp20);
    tmp22 = ParseRule.Choice.keyword(Precedence.Keywords._thinArrow, "the arrow symbol", tmp21);
    tmp23 = ParseRule.Choice.reference("pattern-list", tmp17, "the list of pattern", tmp22);
    tmp24 = Parser.defineKind("multiple-matching", tmp23);
    tmp25 = ParseRule.Choice.end(runtime.Unit);
    tmp26 = ParseRule.Choice.keyword(Precedence.Keywords._done, "while end", tmp25);
    tmp27 = ParseRule.Choice.term((body, _) => {
      return body
    }, "while end", tmp26);
    tmp28 = ParseRule.Choice.keyword(Precedence.Keywords._do, "while body", tmp27);
    tmp29 = ParseRule.Choice.term(Tree.While, "while body", tmp28);
    tmp30 = ParseRule.Choice.keyword(Precedence.Keywords._while, "while condition", tmp29);
    Parser.#whileTerm = tmp30;
    tmp31 = (lhs, rhs) => {
      let param0, tail, tmp69, tmp70, tmp71;
      if (rhs instanceof Tree.Tuple.class) {
        param0 = rhs.trees;
        tail = param0;
        tmp69 = Stack.Cons(lhs, tail);
        return Tree.Tuple(tmp69)
      } else {
        tmp70 = Stack.Cons(rhs, Stack.Nil);
        tmp71 = Stack.Cons(lhs, tmp70);
        return Tree.Tuple(tmp71)
      }
    };
    tmp32 = Parser.makeInfixChoice(Precedence.Keywords._comma, "term", tmp31);
    tmp33 = (lhs, rhs) => {
      let param0, tail, tmp69, tmp70, tmp71;
      if (rhs instanceof Tree.Sequence.class) {
        param0 = rhs.trees;
        tail = param0;
        tmp69 = Stack.Cons(lhs, tail);
        return Tree.Sequence(tmp69)
      } else {
        tmp70 = Stack.Cons(rhs, Stack.Nil);
        tmp71 = Stack.Cons(lhs, tmp70);
        return Tree.Sequence(tmp71)
      }
    };
    tmp34 = Parser.makeInfixChoice(Precedence.Keywords._semicolon, "term", tmp33);
    tmp35 = ParseRule.Choice.end(runtime.Unit);
    tmp36 = ParseRule.Choice.typeExpr((rhs, _) => {
      return (lhs) => {
        return Tree.Infix(Precedence.Keywords._colon, lhs, rhs)
      }
    }, "right-hand side type", tmp35);
    tmp37 = ParseRule.Choice.keyword(Precedence.Keywords._colon, "type ascription", tmp36);
    tmp38 = ParseRule.rule("infix rules for expressions", tmp32, tmp34, tmp37);
    this.termInfixRule = tmp38;
    tmp39 = Parser.funTerm();
    tmp40 = Parser.matchTerm();
    tmp41 = Parser.functionTerm();
    tmp42 = Parser.ifThenElse();
    tmp43 = Parser.makeBracketRule(Precedence.Keywords._leftRound, Precedence.Keywords._rightRound, "term", (tree) => {
      if (tree instanceof Tree.Empty.class) {
        return Tree.Tuple(Stack.Nil)
      } else {
        return tree
      }
    });
    tmp44 = (tree) => {
      let tmp69;
      if (tree instanceof Tree.Empty.class) {
        tmp69 = Tree.Sequence(Stack.Nil);
      } else {
        tmp69 = tree;
      }
      return Tree.Bracketed(Token.Square, tmp69)
    };
    tmp45 = Parser.makeBracketRule(Precedence.Keywords._leftSquare, Precedence.Keywords._rightSquare, "term", tmp44);
    tmp46 = Parser.makeBracketRule(Precedence.Keywords._leftCurly, Precedence.Keywords._rightCurly, "term", Predef.id);
    tmp47 = Parser.makeBracketRule(Precedence.Keywords._begin, Precedence.Keywords._end, "term", (tree) => {
      if (tree instanceof Tree.Empty.class) {
        return Tree.Sequence(Stack.Nil)
      } else {
        return tree
      }
    });
    tmp48 = ParseRule.Choice.Ref("term", (lhs, compose) => {
      return runtime.safeCall(compose(lhs))
    }, Parser.termInfixRule);
    tmp49 = ParseRule.rule("prefix rules for expressions", Parser.#letExpression, tmp39, tmp40, tmp41, tmp42, Parser.#whileTerm, Parser.forTerm, tmp43, tmp45, tmp46, tmp47, tmp48);
    this.termRule = tmp49;
    tmp50 = (lhs, rhs) => {
      let param0, tail, tmp69, tmp70, tmp71;
      if (rhs instanceof Tree.Tuple.class) {
        param0 = rhs.trees;
        tail = param0;
        tmp69 = Stack.Cons(lhs, tail);
        return Tree.Tuple(tmp69)
      } else {
        tmp70 = Stack.Cons(rhs, Stack.Nil);
        tmp71 = Stack.Cons(lhs, tmp70);
        return Tree.Tuple(tmp71)
      }
    };
    tmp51 = Parser.makeInfixChoice(Precedence.TypeKeywords._comma, "type", tmp50);
    tmp52 = Parser.makeInfixChoice(Precedence.TypeKeywords._arrow, "type", (lhs, rhs) => {
      return Tree.Infix(Precedence.TypeKeywords._arrow, lhs, rhs)
    });
    tmp53 = Parser.makeInfixChoice(Precedence.TypeKeywords._asterisk, "type", (lhs, rhs) => {
      return Tree.Infix(Precedence.TypeKeywords._asterisk, lhs, rhs)
    });
    tmp54 = Parser.makeInfixChoice(Precedence.TypeKeywords._of, "type", (lhs, rhs) => {
      return Tree.Infix(Precedence.TypeKeywords._of, lhs, rhs)
    });
    tmp55 = ParseRule.rule("infix rules for types", tmp51, tmp52, tmp53, tmp54);
    this.typeInfixRule = tmp55;
    tmp56 = Parser.makeBracketRule(Precedence.TypeKeywords._leftRound, Precedence.TypeKeywords._rightRound, "type", Predef.id);
    tmp57 = ParseRule.Choice.Ref("type", (lhs, compose) => {
      return runtime.safeCall(compose(lhs))
    }, Parser.typeInfixRule);
    tmp58 = ParseRule.rule("rules for types", tmp56, tmp57);
    this.typeRule = tmp58;
    tmp59 = Parser.defineKind("variants", Parser.variantsRule);
    tmp60 = Parser.defineKind("typedefs", Parser.typedefRule);
    tmp61 = ParseRule.Choice.end(Stack.Nil);
    tmp62 = ParseRule.Choice.reference("variants", (rhs, _) => {
      return rhs
    }, "variants", tmp61);
    tmp63 = Parser.defineKind("typedef-rhs", tmp62, Parser.recordTypeChoice);
    tmp64 = Parser.defineKind("label-decl", Parser.labelDecl);
    tmp65 = Parser.defineKind("label-decls", Parser.labelDecls);
    tmp66 = Parser.typeDefinition();
    tmp67 = Parser.exceptionDefinition();
    tmp68 = ParseRule.rule("prefix rules for module items", Parser.#letDefinition, tmp66, tmp67);
    this.declRule = tmp68;
  }
  static getRuleByKind(kind) {
    let tmp;
    tmp = runtime.safeCall(Parser.syntaxKinds.get(kind));
    return Option.unsafe.get(tmp)
  } 
  static defineKind(name, ...choices) {
    let tmp;
    tmp = ParseRule.rule(name, ...choices);
    return Parser.syntaxKinds.insert(name, tmp)
  } 
  static letBinding(hasInClause) {
    let makeItems, makeBinding, intro, items, tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10;
    makeBinding = function makeBinding(bindingBody) {
      let tmp11, tmp12, tmp13, tmp14, tmp15, tmp16;
      if (hasInClause === true) {
        tmp11 = (head, bodyAndLetIn) => {
          let first1, first0, body, param0, param1, bindings, letBody, tmp17;
          if (globalThis.Array.isArray(bodyAndLetIn) && bodyAndLetIn.length === 2) {
            first0 = bodyAndLetIn[0];
            first1 = bodyAndLetIn[1];
            body = first0;
            if (first1 instanceof Tree.LetIn.class) {
              param0 = first1.bindings;
              param1 = first1.body;
              bindings = param0;
              letBody = param1;
              tmp17 = Stack.Cons([
                head,
                body
              ], bindings);
              return Tree.LetIn(tmp17, letBody)
            } else {
              throw new globalThis.Error("match error");
            }
          } else {
            throw new globalThis.Error("match error");
          }
        };
        tmp12 = tmp11;
      } else {
        tmp13 = (head, bodyAndDefine) => {
          let first1, first0, body, param0, param1, kind1, defs, tmp17;
          if (globalThis.Array.isArray(bodyAndDefine) && bodyAndDefine.length === 2) {
            first0 = bodyAndDefine[0];
            first1 = bodyAndDefine[1];
            body = first0;
            if (first1 instanceof Tree.Define.class) {
              param0 = first1.kind;
              param1 = first1.items;
              kind1 = param0;
              defs = param1;
              tmp17 = Stack.Cons([
                head,
                body
              ], defs);
              return Tree.Define(kind1, tmp17)
            } else {
              throw new globalThis.Error("match error");
            }
          } else {
            throw new globalThis.Error("match error");
          }
        };
        tmp12 = tmp13;
      }
      tmp14 = intro + "left-hand side";
      tmp15 = intro + "right-hand side";
      tmp16 = ParseRule.Choice.keyword(Precedence.Keywords._equal, tmp15, bindingBody);
      return ParseRule.Choice.term(tmp12, tmp14, tmp16)
    };
    makeItems = function makeItems(get) {
      let tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20, tmp21, tmp22, tmp23, tmp24, tmp25, tmp26;
      tmp11 = intro + "right-hand side";
      tmp12 = intro + "`and` keyword";
      tmp13 = ParseRule.Choice.Lazy(get, makeItems);
      tmp14 = makeBinding(tmp13);
      tmp15 = ParseRule.Choice.keyword(Precedence.Keywords._and, tmp12, tmp14);
      if (hasInClause === true) {
        tmp16 = intro + "`in` keyword";
        tmp17 = intro + "body";
        tmp18 = ParseRule.Choice.end(runtime.Unit);
        tmp19 = ParseRule.Choice.term((body, _) => {
          return Tree.LetIn(Stack.Nil, body)
        }, tmp17, tmp18);
        tmp20 = ParseRule.Choice.keyword(Precedence.Keywords._in, tmp16, tmp19);
        tmp21 = Tree.LetIn(Stack.Nil, Tree.empty);
        tmp22 = ParseRule.Choice.end(tmp21);
        tmp23 = Predef.tuple(tmp20, tmp22);
      } else {
        tmp24 = Tree.DefineKind.Let(false);
        tmp25 = Tree.Define(tmp24, Stack.Nil);
        tmp26 = ParseRule.Choice.end(tmp25);
        tmp23 = Predef.tuple(tmp26);
      }
      return ParseRule.Choice.term((body, defLike) => {
        return [
          body,
          defLike
        ]
      }, tmp11, tmp15, ...tmp23)
    };
    intro = "let binding: ";
    tmp = ParseRule.Choice.lazy(makeItems);
    items = tmp;
    tmp1 = intro + "keyword";
    tmp2 = intro + "keyword";
    tmp3 = intro + "`rec` keyword";
    tmp4 = ParseRule.Choice.end(runtime.Unit);
    tmp5 = ParseRule.Choice.keyword(Precedence.Keywords._rec, tmp3, tmp4);
    tmp6 = ParseRule.rule(tmp2, tmp5);
    tmp7 = intro + "body";
    tmp8 = makeBinding(items);
    tmp9 = ParseRule.rule(tmp7, tmp8);
    tmp10 = ParseRule.Choice.Optional(tmp6, tmp9);
    return ParseRule.Choice.keyword(Precedence.Keywords._let, tmp1, tmp10)
  } 
  static ifThenElse() {
    let intro, tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13;
    intro = "if-then-else: ";
    tmp = intro + "`if` keyword";
    tmp1 = (tst, conAlt) => {
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
    tmp2 = intro + "condition";
    tmp3 = intro + "`then` keyword";
    tmp4 = intro + "consequent";
    tmp5 = ParseRule.Choice.end(Option.None);
    tmp6 = intro + "`else` keyword";
    tmp7 = intro + "alternative";
    tmp8 = ParseRule.Choice.end(Option.None);
    tmp9 = ParseRule.Choice.term((alt, _) => {
      return Option.Some(alt)
    }, tmp7, tmp8);
    tmp10 = ParseRule.Choice.keyword(Precedence.Keywords._else, tmp6, tmp9);
    tmp11 = ParseRule.Choice.term((con, optAlt) => {
      return [
        con,
        optAlt
      ]
    }, tmp4, tmp5, tmp10);
    tmp12 = ParseRule.Choice.keyword(Precedence.Keywords._then, tmp3, tmp11);
    tmp13 = ParseRule.Choice.term(tmp1, tmp2, tmp12);
    return ParseRule.Choice.keyword(Precedence.Keywords._if, tmp, tmp13)
  } 
  static funTerm() {
    let intro, tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7;
    intro = "function expression: ";
    tmp = intro + "keyword";
    tmp1 = intro + "parameters";
    tmp2 = intro + "arrow";
    tmp3 = intro + "body";
    tmp4 = ParseRule.Choice.end(Option.None);
    tmp5 = ParseRule.Choice.term((body, _) => {
      return body
    }, tmp3, tmp4);
    tmp6 = ParseRule.Choice.keyword(Precedence.Keywords._thinArrow, tmp2, tmp5);
    tmp7 = ParseRule.Choice.term((params, body) => {
      let tmp8;
      tmp8 = Stack.Cons(params, Stack.Nil);
      return Tree.Lambda(tmp8, body)
    }, tmp1, tmp6);
    return ParseRule.Choice.keyword(Precedence.Keywords._fun, tmp, tmp7)
  } 
  static matchTerm() {
    let intro, tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11;
    intro = "`match` expression: ";
    tmp = intro + "keyword";
    tmp1 = intro + "scrutinee";
    tmp2 = intro + "with";
    tmp3 = intro + "body";
    tmp4 = intro + "leading bar";
    tmp5 = ParseRule.Choice.end(runtime.Unit);
    tmp6 = ParseRule.Choice.keyword(Precedence.Keywords._bar, tmp4, tmp5);
    tmp7 = ParseRule.rule(tmp3, tmp6);
    tmp8 = Parser.getRuleByKind("simple-matching");
    tmp9 = ParseRule.Choice.Optional(tmp7, tmp8);
    tmp10 = ParseRule.Choice.keyword(Precedence.Keywords._with, tmp2, tmp9);
    tmp11 = ParseRule.Choice.term((scrutinee, branches) => {
      return Tree.Match(scrutinee, branches)
    }, tmp1, tmp10);
    return ParseRule.Choice.keyword(Precedence.Keywords._match, tmp, tmp11)
  } 
  static functionTerm() {
    let intro, body, tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8;
    intro = "`function` definition: ";
    tmp = intro + "body";
    tmp1 = intro + "leading bar";
    tmp2 = ParseRule.Choice.end(runtime.Unit);
    tmp3 = ParseRule.Choice.keyword(Precedence.Keywords._bar, tmp1, tmp2);
    tmp4 = ParseRule.rule(tmp, tmp3);
    tmp5 = Parser.getRuleByKind("simple-matching");
    tmp6 = ParseRule.Choice.Optional(tmp4, tmp5);
    body = tmp6;
    tmp7 = intro + "`function` keyword";
    tmp8 = ParseRule.Choice.map(body, (branches) => {
      return Tree.Match(Tree.empty, branches)
    });
    return ParseRule.Choice.keyword(Precedence.Keywords._function, tmp7, tmp8)
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
  static get recordTypeChoice() {
    let intro, tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6;
    intro = "record type: ";
    tmp = intro + "left brace";
    tmp1 = (content, _) => {
      let tmp7, tmp8;
      if (content instanceof Stack.Nil.class) {
        tmp7 = Tree.Sequence(Stack.Nil);
        return Tree.Bracketed(Token.Curly, tmp7)
      } else {
        tmp8 = Tree.Sequence(content);
        return Tree.Bracketed(Token.Curly, tmp8)
      }
    };
    tmp2 = intro + "label-decl";
    tmp3 = intro + "right brace";
    tmp4 = ParseRule.Choice.end(Tree.empty);
    tmp5 = ParseRule.Choice.keyword(Precedence.Keywords._rightCurly, tmp3, tmp4);
    tmp6 = ParseRule.Choice.reference("label-decls", tmp1, tmp2, tmp5);
    return ParseRule.Choice.keyword(Precedence.Keywords._leftCurly, tmp, tmp6);
  } 
  static typeDefinition() {
    let intro, tmp, tmp1, tmp2, tmp3;
    intro = "type definition";
    tmp = intro + "type defs";
    tmp1 = intro + "end";
    tmp2 = ParseRule.Choice.end(runtime.Unit);
    tmp3 = ParseRule.Choice.reference("typedefs", (typedefs, _) => {
      return Tree.Define(Tree.DefineKind.Type, typedefs)
    }, tmp1, tmp2);
    return ParseRule.Choice.keyword(Precedence.Keywords._type, tmp, tmp3)
  } 
  static get variantsRule() {
    let intro, tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7;
    intro = "variant ";
    tmp = (lhs, rhsMore) => {
      let param0, rhs;
      if (rhsMore instanceof Option.Some.class) {
        param0 = rhsMore.value;
        rhs = param0;
        return Tree.Infix(Precedence.Keywords._bar, lhs, rhs)
      } else {
        return lhs
      }
    };
    tmp1 = intro + "item";
    tmp2 = ParseRule.Choice.end(Option.None);
    tmp3 = intro + "bar";
    tmp4 = intro + "end";
    tmp5 = ParseRule.Choice.end(runtime.Unit);
    tmp6 = ParseRule.Choice.reference("variants", (more, _) => {
      return Option.Some(more)
    }, tmp4, tmp5);
    tmp7 = ParseRule.Choice.keyword(Precedence.Keywords._bar, tmp3, tmp6);
    return ParseRule.Choice.typeExpr(tmp, tmp1, tmp2, tmp7);
  } 
  static get typedefRule() {
    let intro, tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11;
    intro = "typedef ";
    tmp = (lhs, rhsMore) => {
      let first1, first0, rhs, more;
      if (globalThis.Array.isArray(rhsMore) && rhsMore.length === 2) {
        first0 = rhsMore[0];
        first1 = rhsMore[1];
        rhs = first0;
        more = first1;
        return Stack.Cons([
          lhs,
          rhs
        ], more)
      } else {
        throw new globalThis.Error("match error");
      }
    };
    tmp1 = intro + "name";
    tmp2 = intro + "equal sign";
    tmp3 = intro + "body";
    tmp4 = ParseRule.Choice.end(Stack.Nil);
    tmp5 = intro + "and";
    tmp6 = intro + "end";
    tmp7 = ParseRule.Choice.end(runtime.Unit);
    tmp8 = ParseRule.Choice.reference("typedefs", (more, _) => {
      return more
    }, tmp6, tmp7);
    tmp9 = ParseRule.Choice.keyword(Precedence.Keywords._and, tmp5, tmp8);
    tmp10 = ParseRule.Choice.reference("typedef-rhs", (rhs, more) => {
      return [
        rhs,
        more
      ]
    }, tmp3, tmp4, tmp9);
    tmp11 = ParseRule.Choice.keyword(Precedence.Keywords._equal, tmp2, tmp10);
    return ParseRule.Choice.typeExpr(tmp, tmp1, tmp11);
  } 
  static get labelDecl() {
    let intro, tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6;
    intro = "label-decl: ";
    tmp = Tree.infix(Precedence.TypeKeywords._colon);
    tmp1 = intro + "name";
    tmp2 = intro + "colon";
    tmp3 = intro + "body";
    tmp4 = ParseRule.Choice.end(runtime.Unit);
    tmp5 = ParseRule.Choice.typeExpr((rhs, _) => {
      return rhs
    }, tmp3, tmp4);
    tmp6 = ParseRule.Choice.keyword(Precedence.TypeKeywords._colon, tmp2, tmp5);
    return ParseRule.Choice.typeExpr(tmp, tmp1, tmp6);
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
  static exceptionDefinition() {
    let intro, tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8;
    intro = "exception definition: ";
    tmp = intro + "keyword";
    tmp1 = intro + "name";
    tmp2 = ParseRule.Choice.end(Tree.empty);
    tmp3 = intro + "equal sign";
    tmp4 = intro + "body";
    tmp5 = ParseRule.Choice.end(runtime.Unit);
    tmp6 = ParseRule.Choice.typeExpr((body, _) => {
      return body
    }, tmp4, tmp5);
    tmp7 = ParseRule.Choice.keyword(Precedence.Keywords._equal, tmp3, tmp6);
    tmp8 = ParseRule.Choice.typeExpr((name1, body) => {
      let tmp9;
      tmp9 = Stack.Cons([
        name1,
        body
      ], Stack.Nil);
      return Tree.Define(Tree.DefineKind.Exception, tmp9)
    }, tmp1, tmp2, tmp7);
    return ParseRule.Choice.keyword(Precedence.Keywords._exception, tmp, tmp8)
  } 
  static parse(tokens) {
    let parseKind, require, typeExprCont, term, parseRule, yeetSpaces, modCont, consume, termCont, typeExpr, mod, current, counter, tree, scrut, param0, param1, token, message, tmp, tmp1, tmp2, tmp3;
    yeetSpaces = function yeetSpaces() {
      let param01, param11, tail, tmp4, tmp5, tmp6, tmp7;
      tmp8: while (true) {
        if (current instanceof Stack.Cons.class) {
          param01 = current.head;
          param11 = current.tail;
          if (param01 instanceof Token.Space.class) {
            tail = param11;
            tmp4 = "skipped a space at " + counter;
            tmp5 = runtime.safeCall(Parser.tracer.print(tmp4));
            current = tail;
            tmp6 = counter + 1;
            counter = tmp6;
            tmp7 = runtime.Unit;
            continue tmp8;
          } else {
            tmp7 = runtime.Unit;
          }
        } else {
          tmp7 = runtime.Unit;
        }
        break;
      }
      return current
    };
    consume = function consume() {
      let param01, param11, head, tail, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9;
      if (current instanceof Stack.Cons.class) {
        param01 = current.head;
        param11 = current.tail;
        head = param01;
        tail = param11;
        tmp4 = Token.summary(head);
        tmp5 = "consumed `" + tmp4;
        tmp6 = tmp5 + "` at ";
        tmp7 = tmp6 + counter;
        tmp8 = runtime.safeCall(Parser.tracer.print(tmp7));
        current = tail;
        tmp9 = counter + 1;
        counter = tmp9;
        return runtime.Unit
      } else {
        return runtime.safeCall(Parser.tracer.print("consumed: EOF"))
      }
    };
    require = function require(result, expected) {
      let scrut1, param01, param11, actual, scrut2, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10;
      tmp4 = yeetSpaces();
      scrut1 = tmp4;
      if (scrut1 instanceof Stack.Cons.class) {
        param01 = scrut1.head;
        param11 = scrut1.tail;
        actual = param01;
        scrut2 = Token.same(expected, actual);
        if (scrut2 === true) {
          tmp5 = consume();
          return result
        } else {
          tmp6 = Token.summary(expected);
          tmp7 = Token.summary(actual);
          tmp8 = Predef.mkStr("Expected token ", tmp6, ", but found ", tmp7);
          return Tree.Error(result, tmp8)
        }
      } else if (scrut1 instanceof Stack.Nil.class) {
        tmp9 = Token.summary(expected);
        tmp10 = Predef.mkStr("Expected token ", tmp9, ", but found end of input");
        return Tree.Error(result, tmp10)
      } else {
        throw new globalThis.Error("match error");
      }
    };
    parseKind = function parseKind(kind1, prec) {
      let scrut1, param01, rule, tmp4, tmp5;
      if (kind1 === "type") {
        return typeExpr(prec, Precedence.TypeKeywords.all)
      } else if (kind1 === "term") {
        return term(prec, Precedence.Keywords.all)
      } else {
        scrut1 = runtime.safeCall(Parser.syntaxKinds.get(kind1));
        if (scrut1 instanceof Option.Some.class) {
          param01 = scrut1.value;
          rule = param01;
          return parseRule(prec, rule, Precedence.Keywords.all)
        } else {
          tmp4 = "Unknown syntax kind: \"" + kind1;
          tmp5 = tmp4 + "\"";
          throw globalThis.Error(tmp5);
        }
      }
    };
    parseRule = function parseRule(prec, rule, allKeywords) {
      let tmp4, tmp5, tmp6, tmp7;
      tmp4 = "parsing rule \"" + rule.name;
      tmp5 = tmp4 + "\" with precedence ";
      tmp6 = tmp5 + prec;
      tmp7 = () => {
        let scrut1, scrut2, param01, value, param02, param11, other, doTemp, doTemp1, doTemp2, scrut3, param03, value1, scrut4, param04, first2, first1, first0, kind1, process, rest, doTemp3, acc, doTemp4, scrut5, tree1, param05, param12, name1, doTemp5, doTemp6, scrut6, param06, keyword1, doTemp7, doTemp8, scrut7, doTemp9, doTemp10, doTemp11, scrut8, param07, value2, scrut9, param08, first21, first11, first01, kind2, process1, rest1, acc1, tree2, param09, rest2, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20, tmp21, tmp22, tmp23, tmp24, tmp25, tmp26, tmp27, tmp28, tmp29, tmp30, tmp31, tmp32, tmp33, tmp34, tmp35, tmp36, tmp37, tmp38, tmp39, tmp40, tmp41, tmp42, tmp43, tmp44, tmp45, tmp46, tmp47, tmp48, tmp49, tmp50, tmp51, tmp52, tmp53, tmp54, tmp55, tmp56, tmp57, tmp58, tmp59, tmp60, tmp61, tmp62, tmp63, tmp64, tmp65, tmp66, tmp67, tmp68, tmp69, tmp70, tmp71, tmp72, tmp73, tmp74, tmp75, tmp76, tmp77, tmp78, tmp79, tmp80, tmp81, tmp82, tmp83, tmp84, tmp85, tmp86, tmp87, tmp88, tmp89, tmp90, tmp91, tmp92, tmp93, tmp94, tmp95, tmp96, tmp97, tmp98, tmp99, tmp100, tmp101, tmp102, tmp103, tmp104, tmp105, tmp106, tmp107, tmp108, tmp109, tmp110, tmp111, tmp112, tmp113, tmp114, tmp115, tmp116;
        tmp8 = yeetSpaces();
        scrut1 = tmp8;
        if (scrut1 instanceof Stack.Cons.class) {
          param02 = scrut1.head;
          param11 = scrut1.tail;
          if (param02 instanceof Token.Identifier.class) {
            param05 = param02.name;
            param12 = param02.symbolic;
            name1 = param05;
            tmp9 = "found an identifier \"" + name1;
            tmp10 = tmp9 + "\"";
            doTemp5 = Parser.tracer.print(tmp10, 565);
            scrut6 = runtime.safeCall(allKeywords.get(name1));
            if (scrut6 instanceof Option.Some.class) {
              param06 = scrut6.value;
              keyword1 = param06;
              tmp11 = runtime.safeCall(keyword1.toString());
              doTemp7 = Parser.tracer.print(tmp11, 567);
              tmp12 = (caseScrut) => {
                let first12, first02, k, v, tmp117;
                if (globalThis.Array.isArray(caseScrut) && caseScrut.length === 2) {
                  first02 = caseScrut[0];
                  first12 = caseScrut[1];
                  k = first02;
                  v = first12;
                  tmp117 = "`" + k;
                  return tmp117 + "`"
                } else {
                  throw new globalThis.Error("match error");
                }
              };
              tmp13 = Iter.mapping(rule.keywordChoices, tmp12);
              tmp14 = Iter.joined(tmp13, ", ");
              doTemp8 = Parser.tracer.print("keyword choices: ", tmp14);
              scrut7 = runtime.safeCall(rule.keywordChoices.get(name1));
              if (scrut7 instanceof Option.Some.class) {
                param09 = scrut7.value;
                rest2 = param09;
                tmp15 = "found a rule starting with `" + name1;
                tmp16 = tmp15 + "`";
                tmp17 = Parser.tracer.print(tmp16, 573);
                tmp18 = "the rest of the rule: " + rest2.display;
                tmp19 = Parser.tracer.print(tmp18, 574);
                tmp20 = consume();
                return parseRule(0, rest2, allKeywords)
              } else if (scrut7 instanceof Option.None.class) {
                tmp21 = "no rule starting with `" + name1;
                tmp22 = tmp21 + "` was found";
                doTemp9 = Parser.tracer.print(tmp22, 578);
                tmp23 = "the left prec of `" + name1;
                tmp24 = tmp23 + "` is ";
                tmp25 = tmp24 + keyword1.leftPrec;
                doTemp10 = Parser.tracer.print(tmp25, 579);
                scrut9 = rule.exprChoice;
                if (scrut9 instanceof Option.Some.class) {
                  param08 = scrut9.value;
                  if (globalThis.Array.isArray(param08) && param08.length === 3) {
                    first01 = param08[0];
                    first11 = param08[1];
                    first21 = param08[2];
                    kind2 = first01;
                    process1 = first11;
                    rest1 = first21;
                    tmp26 = Parser.tracer.print("found an expression choice", 581);
                    tmp27 = parseKind(kind2, prec);
                    acc1 = tmp27;
                    tmp28 = parseRule(prec, rest1, allKeywords);
                    tree2 = tmp28;
                    return runtime.safeCall(process1(acc1, tree2))
                  } else {
                    tmp29 = "no exprChoice or the prec is less than " + prec;
                    doTemp11 = Parser.tracer.print(tmp29, 585);
                    scrut8 = rule.endChoice;
                    if (scrut8 instanceof Option.Some.class) {
                      param07 = scrut8.value;
                      value2 = param07;
                      tmp30 = Parser.tracer.print("found end choice", 587);
                      return value2
                    } else {
                      tmp31 = consume();
                      tmp32 = "unexpected keyword " + keyword1.name;
                      return Tree.error(tmp32)
                    }
                  }
                } else {
                  tmp33 = "no exprChoice or the prec is less than " + prec;
                  doTemp11 = Parser.tracer.print(tmp33, 585);
                  scrut8 = rule.endChoice;
                  if (scrut8 instanceof Option.Some.class) {
                    param07 = scrut8.value;
                    value2 = param07;
                    tmp34 = Parser.tracer.print("found end choice", 587);
                    return value2
                  } else {
                    tmp35 = consume();
                    tmp36 = "unexpected keyword " + keyword1.name;
                    return Tree.error(tmp36)
                  }
                }
              } else {
                tmp37 = "\"" + name1;
                tmp38 = tmp37 + "\" is not a keyword";
                doTemp6 = Parser.tracer.print(tmp38, 592);
                other = param02;
                tmp39 = "the current rule is " + rule.display;
                doTemp = runtime.safeCall(Parser.tracer.print(tmp39));
                scrut4 = rule.exprChoice;
                if (scrut4 instanceof Option.Some.class) {
                  param04 = scrut4.value;
                  if (globalThis.Array.isArray(param04) && param04.length === 3) {
                    first0 = param04[0];
                    first1 = param04[1];
                    first2 = param04[2];
                    kind1 = first0;
                    process = first1;
                    rest = first2;
                    tmp40 = "parse \"" + kind1;
                    tmp41 = tmp40 + "\" kind from ";
                    tmp42 = TokenHelpers.preview(current);
                    tmp43 = tmp41 + tmp42;
                    doTemp3 = Parser.tracer.print(tmp43, 596);
                    acc = parseKind(kind1, prec);
                    scrut5 = Tree.nonEmptyError(acc);
                    if (scrut5 === true) {
                      tmp44 = "the rest rule: " + rest.display;
                      tmp45 = Parser.tracer.print(tmp44, 599);
                      tmp46 = parseRule(prec, rest, allKeywords);
                      tree1 = tmp46;
                      tmp47 = Tree.summary(acc);
                      tmp48 = "acc: " + tmp47;
                      tmp49 = Parser.tracer.print(tmp48, 601);
                      tmp50 = Tree.summary(tree1);
                      tmp51 = "tree: " + tmp50;
                      tmp52 = Parser.tracer.print(tmp51, 602);
                      tmp53 = "tree AST is: " + tree1;
                      tmp54 = Parser.tracer.print(tmp53, 603);
                      return runtime.safeCall(process(acc, tree1))
                    } else {
                      doTemp4 = Parser.tracer.print("fallback to end choice", 605);
                      doTemp1 = Parser.tracer.print("no expression choice", 606);
                      scrut3 = rule.endChoice;
                      if (scrut3 instanceof Option.Some.class) {
                        param03 = scrut3.value;
                        value1 = param03;
                        tmp55 = Parser.tracer.print("found end choice", 608);
                        return value1
                      } else {
                        doTemp2 = Parser.tracer.print("no end choice", 610);
                        tmp56 = consume();
                        tmp57 = "unexpected token " + other;
                        return Tree.error(tmp57)
                      }
                    }
                  } else {
                    doTemp1 = Parser.tracer.print("no expression choice", 606);
                    scrut3 = rule.endChoice;
                    if (scrut3 instanceof Option.Some.class) {
                      param03 = scrut3.value;
                      value1 = param03;
                      tmp58 = Parser.tracer.print("found end choice", 608);
                      return value1
                    } else {
                      doTemp2 = Parser.tracer.print("no end choice", 610);
                      tmp59 = consume();
                      tmp60 = "unexpected token " + other;
                      return Tree.error(tmp60)
                    }
                  }
                } else {
                  doTemp1 = Parser.tracer.print("no expression choice", 606);
                  scrut3 = rule.endChoice;
                  if (scrut3 instanceof Option.Some.class) {
                    param03 = scrut3.value;
                    value1 = param03;
                    tmp61 = Parser.tracer.print("found end choice", 608);
                    return value1
                  } else {
                    doTemp2 = Parser.tracer.print("no end choice", 610);
                    tmp62 = consume();
                    tmp63 = "unexpected token " + other;
                    return Tree.error(tmp63)
                  }
                }
              }
            } else {
              tmp64 = "\"" + name1;
              tmp65 = tmp64 + "\" is not a keyword";
              doTemp6 = Parser.tracer.print(tmp65, 592);
              other = param02;
              tmp66 = "the current rule is " + rule.display;
              doTemp = runtime.safeCall(Parser.tracer.print(tmp66));
              scrut4 = rule.exprChoice;
              if (scrut4 instanceof Option.Some.class) {
                param04 = scrut4.value;
                if (globalThis.Array.isArray(param04) && param04.length === 3) {
                  first0 = param04[0];
                  first1 = param04[1];
                  first2 = param04[2];
                  kind1 = first0;
                  process = first1;
                  rest = first2;
                  tmp67 = "parse \"" + kind1;
                  tmp68 = tmp67 + "\" kind from ";
                  tmp69 = TokenHelpers.preview(current);
                  tmp70 = tmp68 + tmp69;
                  doTemp3 = Parser.tracer.print(tmp70, 596);
                  acc = parseKind(kind1, prec);
                  scrut5 = Tree.nonEmptyError(acc);
                  if (scrut5 === true) {
                    tmp71 = "the rest rule: " + rest.display;
                    tmp72 = Parser.tracer.print(tmp71, 599);
                    tmp73 = parseRule(prec, rest, allKeywords);
                    tree1 = tmp73;
                    tmp74 = Tree.summary(acc);
                    tmp75 = "acc: " + tmp74;
                    tmp76 = Parser.tracer.print(tmp75, 601);
                    tmp77 = Tree.summary(tree1);
                    tmp78 = "tree: " + tmp77;
                    tmp79 = Parser.tracer.print(tmp78, 602);
                    tmp80 = "tree AST is: " + tree1;
                    tmp81 = Parser.tracer.print(tmp80, 603);
                    return runtime.safeCall(process(acc, tree1))
                  } else {
                    doTemp4 = Parser.tracer.print("fallback to end choice", 605);
                    doTemp1 = Parser.tracer.print("no expression choice", 606);
                    scrut3 = rule.endChoice;
                    if (scrut3 instanceof Option.Some.class) {
                      param03 = scrut3.value;
                      value1 = param03;
                      tmp82 = Parser.tracer.print("found end choice", 608);
                      return value1
                    } else {
                      doTemp2 = Parser.tracer.print("no end choice", 610);
                      tmp83 = consume();
                      tmp84 = "unexpected token " + other;
                      return Tree.error(tmp84)
                    }
                  }
                } else {
                  doTemp1 = Parser.tracer.print("no expression choice", 606);
                  scrut3 = rule.endChoice;
                  if (scrut3 instanceof Option.Some.class) {
                    param03 = scrut3.value;
                    value1 = param03;
                    tmp85 = Parser.tracer.print("found end choice", 608);
                    return value1
                  } else {
                    doTemp2 = Parser.tracer.print("no end choice", 610);
                    tmp86 = consume();
                    tmp87 = "unexpected token " + other;
                    return Tree.error(tmp87)
                  }
                }
              } else {
                doTemp1 = Parser.tracer.print("no expression choice", 606);
                scrut3 = rule.endChoice;
                if (scrut3 instanceof Option.Some.class) {
                  param03 = scrut3.value;
                  value1 = param03;
                  tmp88 = Parser.tracer.print("found end choice", 608);
                  return value1
                } else {
                  doTemp2 = Parser.tracer.print("no end choice", 610);
                  tmp89 = consume();
                  tmp90 = "unexpected token " + other;
                  return Tree.error(tmp90)
                }
              }
            }
          } else {
            other = param02;
            tmp91 = "the current rule is " + rule.display;
            doTemp = runtime.safeCall(Parser.tracer.print(tmp91));
            scrut4 = rule.exprChoice;
            if (scrut4 instanceof Option.Some.class) {
              param04 = scrut4.value;
              if (globalThis.Array.isArray(param04) && param04.length === 3) {
                first0 = param04[0];
                first1 = param04[1];
                first2 = param04[2];
                kind1 = first0;
                process = first1;
                rest = first2;
                tmp92 = "parse \"" + kind1;
                tmp93 = tmp92 + "\" kind from ";
                tmp94 = TokenHelpers.preview(current);
                tmp95 = tmp93 + tmp94;
                doTemp3 = Parser.tracer.print(tmp95, 596);
                acc = parseKind(kind1, prec);
                scrut5 = Tree.nonEmptyError(acc);
                if (scrut5 === true) {
                  tmp96 = "the rest rule: " + rest.display;
                  tmp97 = Parser.tracer.print(tmp96, 599);
                  tmp98 = parseRule(prec, rest, allKeywords);
                  tree1 = tmp98;
                  tmp99 = Tree.summary(acc);
                  tmp100 = "acc: " + tmp99;
                  tmp101 = Parser.tracer.print(tmp100, 601);
                  tmp102 = Tree.summary(tree1);
                  tmp103 = "tree: " + tmp102;
                  tmp104 = Parser.tracer.print(tmp103, 602);
                  tmp105 = "tree AST is: " + tree1;
                  tmp106 = Parser.tracer.print(tmp105, 603);
                  return runtime.safeCall(process(acc, tree1))
                } else {
                  doTemp4 = Parser.tracer.print("fallback to end choice", 605);
                  doTemp1 = Parser.tracer.print("no expression choice", 606);
                  scrut3 = rule.endChoice;
                  if (scrut3 instanceof Option.Some.class) {
                    param03 = scrut3.value;
                    value1 = param03;
                    tmp107 = Parser.tracer.print("found end choice", 608);
                    return value1
                  } else {
                    doTemp2 = Parser.tracer.print("no end choice", 610);
                    tmp108 = consume();
                    tmp109 = "unexpected token " + other;
                    return Tree.error(tmp109)
                  }
                }
              } else {
                doTemp1 = Parser.tracer.print("no expression choice", 606);
                scrut3 = rule.endChoice;
                if (scrut3 instanceof Option.Some.class) {
                  param03 = scrut3.value;
                  value1 = param03;
                  tmp110 = Parser.tracer.print("found end choice", 608);
                  return value1
                } else {
                  doTemp2 = Parser.tracer.print("no end choice", 610);
                  tmp111 = consume();
                  tmp112 = "unexpected token " + other;
                  return Tree.error(tmp112)
                }
              }
            } else {
              doTemp1 = Parser.tracer.print("no expression choice", 606);
              scrut3 = rule.endChoice;
              if (scrut3 instanceof Option.Some.class) {
                param03 = scrut3.value;
                value1 = param03;
                tmp113 = Parser.tracer.print("found end choice", 608);
                return value1
              } else {
                doTemp2 = Parser.tracer.print("no end choice", 610);
                tmp114 = consume();
                tmp115 = "unexpected token " + other;
                return Tree.error(tmp115)
              }
            }
          }
        } else if (scrut1 instanceof Stack.Nil.class) {
          scrut2 = rule.endChoice;
          if (scrut2 instanceof Option.Some.class) {
            param01 = scrut2.value;
            value = param01;
            return value
          } else if (scrut2 instanceof Option.None.class) {
            tmp116 = Parser.tracer.print("no end choice but found the end of input", 617);
            return Tree.error("unexpected end of input")
          } else {
            throw new globalThis.Error("match error");
          }
        } else {
          throw new globalThis.Error("match error");
        }
      };
      return runtime.safeCall(Parser.tracer.trace(tmp6, (result) => {
        let tmp8, tmp9, tmp10;
        tmp8 = "parsed rule \"" + rule.name;
        tmp9 = tmp8 + "\": ";
        tmp10 = Tree.summary(result);
        return tmp9 + tmp10
      }, tmp7))
    };
    term = function term(prec) {
      let tmp4, tmp5, tmp6, tmp7, tmp8;
      tmp4 = "term <<< " + prec;
      tmp5 = tmp4 + " ";
      tmp6 = TokenHelpers.preview(current);
      tmp7 = tmp5 + tmp6;
      tmp8 = () => {
        let scrut1, param01, param11, token1, param02, param12, kind1, literal, param03, param13, name1, symbolic, scrut2, param04, keyword1, scrut3, param05, rule, scrut4, acc, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20, tmp21, tmp22;
        tmp9 = yeetSpaces();
        scrut1 = tmp9;
        if (scrut1 instanceof Stack.Cons.class) {
          param01 = scrut1.head;
          param11 = scrut1.tail;
          if (param01 instanceof Token.Identifier.class) {
            param03 = param01.name;
            param13 = param01.symbolic;
            name1 = param03;
            symbolic = param13;
            scrut2 = runtime.safeCall(Precedence.Keywords.all.get(name1));
            if (scrut2 instanceof Option.Some.class) {
              param04 = scrut2.value;
              keyword1 = param04;
              scrut3 = runtime.safeCall(Parser.termRule.keywordChoices.get(name1));
              if (scrut3 instanceof Option.Some.class) {
                param05 = scrut3.value;
                rule = param05;
                scrut4 = keyword1.leftPrecOrMin > prec;
                if (scrut4 === true) {
                  tmp10 = consume();
                  tmp11 = parseRule(keyword1.rightPrecOrMax, rule, Precedence.Keywords.all);
                  acc = tmp11;
                  return termCont(acc, prec)
                } else {
                  tmp12 = "the left precedence is less" + name1;
                  tmp13 = Parser.tracer.print(tmp12, 633);
                  return Tree.empty
                }
              } else if (scrut3 instanceof Option.None.class) {
                tmp14 = "no rule starting with " + name1;
                tmp15 = Parser.tracer.print(tmp14, 636);
                return Tree.empty
              } else {
                token1 = param01;
                tmp16 = "unrecognized token: " + token1;
                return Tree.error(tmp16)
              }
            } else if (scrut2 instanceof Option.None.class) {
              tmp17 = consume();
              tmp18 = Tree.Ident(name1, symbolic);
              return termCont(tmp18, prec)
            } else {
              token1 = param01;
              tmp19 = "unrecognized token: " + token1;
              return Tree.error(tmp19)
            }
          } else if (param01 instanceof Token.Literal.class) {
            param02 = param01.kind;
            param12 = param01.literal;
            kind1 = param02;
            literal = param12;
            tmp20 = consume();
            tmp21 = Tree.Literal(kind1, literal);
            return termCont(tmp21, prec)
          } else {
            token1 = param01;
            tmp22 = "unrecognized token: " + token1;
            return Tree.error(tmp22)
          }
        } else if (scrut1 instanceof Stack.Nil.class) {
          return Tree.error("unexpected end of input")
        } else {
          throw new globalThis.Error("match error");
        }
      };
      return runtime.safeCall(Parser.tracer.trace(tmp7, (result) => {
        let tmp9;
        tmp9 = Tree.summary(result);
        return "term >>> " + tmp9
      }, tmp8))
    };
    termCont = function termCont(acc, prec) {
      let scrut1, doTemp, param01, param11, token1, scrut2, scrut3, rhs, param02, param12, name1, scrut4, doTemp1, scrut5, first1, first0, leftPrec, rightPrec, doTemp2, scrut6, op, rhs1, name2, scrut7, param03, keyword1, doTemp3, doTemp4, scrut8, param04, rule, doTemp5, scrut9, scrut10, param05, first2, first11, first01, kind1, process, rest, rhs2, acc$_, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20, tmp21, tmp22, tmp23, tmp24, tmp25, tmp26, tmp27, tmp28, tmp29, tmp30, tmp31, tmp32, tmp33, tmp34, tmp35, tmp36, tmp37, tmp38, tmp39, tmp40, tmp41, tmp42, tmp43, tmp44, tmp45, tmp46, tmp47, tmp48, tmp49, tmp50, tmp51, tmp52, tmp53, tmp54, tmp55, tmp56, tmp57, tmp58, tmp59, tmp60, tmp61, tmp62, tmp63, tmp64, tmp65, tmp66, tmp67, tmp68, tmp69, tmp70, tmp71, tmp72, tmp73, tmp74, tmp75, tmp76, tmp77, tmp78, tmp79, tmp80, tmp81, tmp82, tmp83, tmp84, tmp85, tmp86, tmp87, tmp88, tmp89, tmp90, tmp91, tmp92, tmp93, tmp94, tmp95, tmp96, tmp97, tmp98, tmp99, tmp100, tmp101, tmp102, tmp103, tmp104, tmp105, tmp106, tmp107, tmp108, tmp109, tmp110, tmp111, tmp112, tmp113, tmp114, tmp115, tmp116, tmp117, tmp118, tmp119, tmp120, tmp121, tmp122, tmp123, tmp124, tmp125, tmp126, tmp127, tmp128, tmp129, tmp130, tmp131, tmp132, tmp133, tmp134, tmp135, tmp136, tmp137, tmp138, tmp139, tmp140, tmp141, tmp142, tmp143, tmp144, tmp145, tmp146, tmp147, tmp148, tmp149, tmp150, tmp151, tmp152, tmp153, tmp154, tmp155, tmp156, tmp157, tmp158;
      tmp4 = yeetSpaces();
      scrut1 = tmp4;
      tmp5 = ">>> termCont " + prec;
      tmp6 = tmp5 + " ";
      tmp7 = Tree.summary(acc);
      tmp8 = tmp6 + tmp7;
      tmp9 = tmp8 + " <<<";
      doTemp = Parser.tracer.print(tmp9, 648);
      if (scrut1 instanceof Stack.Cons.class) {
        param01 = scrut1.head;
        param11 = scrut1.tail;
        if (param01 instanceof Token.Identifier.class) {
          param02 = param01.name;
          param12 = param01.symbolic;
          name2 = param02;
          scrut7 = runtime.safeCall(Precedence.Keywords.all.get(name2));
          if (scrut7 instanceof Option.Some.class) {
            param03 = scrut7.value;
            keyword1 = param03;
            tmp10 = "found a keyword: " + name2;
            doTemp3 = Parser.tracer.print(tmp10, 651);
            scrut8 = runtime.safeCall(Parser.termInfixRule.keywordChoices.get(name2));
            if (scrut8 instanceof Option.Some.class) {
              param04 = scrut8.value;
              rule = param04;
              tmp11 = "the keyword is found in infix rules" + name2;
              doTemp5 = Parser.tracer.print(tmp11, 655);
              scrut9 = keyword1.leftPrecOrMin > prec;
              if (scrut9 === true) {
                scrut10 = rule.exprChoice;
                if (scrut10 instanceof Option.Some.class) {
                  param05 = scrut10.value;
                  if (globalThis.Array.isArray(param05) && param05.length === 3) {
                    first01 = param05[0];
                    first11 = param05[1];
                    first2 = param05[2];
                    kind1 = first01;
                    process = first11;
                    rest = first2;
                    tmp12 = consume();
                    tmp13 = parseKind(kind1, keyword1.rightPrecOrMin);
                    rhs2 = tmp13;
                    tmp14 = runtime.safeCall(process(rhs2));
                    tmp15 = runtime.safeCall(tmp14(acc));
                    acc$_ = tmp15;
                    return termCont(acc$_, prec)
                  } else {
                    tmp16 = "keyword `" + name2;
                    tmp17 = tmp16 + "` does not have infix rules";
                    doTemp4 = Parser.tracer.print(tmp17, 663);
                    name1 = param02;
                    if (param12 === true) {
                      scrut4 = runtime.safeCall(Precedence.Keywords.all.get(name1));
                      if (scrut4 instanceof Option.None.class) {
                        tmp18 = "found an operator \"" + name1;
                        tmp19 = tmp18 + "\"";
                        doTemp1 = Parser.tracer.print(tmp19, 665);
                        scrut5 = Precedence.opPrec(name1);
                        if (globalThis.Array.isArray(scrut5) && scrut5.length === 2) {
                          first0 = scrut5[0];
                          first1 = scrut5[1];
                          leftPrec = first0;
                          rightPrec = first1;
                          tmp20 = "leftPrec = " + leftPrec;
                          tmp21 = tmp20 + "; rightPrec = ";
                          tmp22 = tmp21 + rightPrec;
                          doTemp2 = Parser.tracer.print(tmp22, 667);
                          scrut6 = leftPrec > prec;
                          if (scrut6 === true) {
                            tmp23 = consume();
                            tmp24 = Tree.Ident(name1, true);
                            op = tmp24;
                            tmp25 = term(rightPrec);
                            rhs1 = tmp25;
                            tmp26 = Stack.Cons(rhs1, Stack.Nil);
                            tmp27 = Stack.Cons(acc, tmp26);
                            tmp28 = Tree.App(op, tmp27);
                            return termCont(tmp28, prec)
                          } else {
                            return acc
                          }
                        } else {
                          token1 = param01;
                          scrut2 = Precedence.Keywords.appPrec > prec;
                          if (scrut2 === true) {
                            tmp29 = Parser.tracer.print("found an application", 677);
                            scrut3 = term(Precedence.Keywords.appPrec);
                            if (scrut3 instanceof Tree.Empty.class) {
                              return acc
                            } else if (scrut3 instanceof Tree.Error.class) {
                              return acc
                            } else {
                              rhs = scrut3;
                              tmp30 = Stack.Cons(rhs, Stack.Nil);
                              tmp31 = Tree.App(acc, tmp30);
                              return termCont(tmp31, prec)
                            }
                          } else {
                            tmp32 = "cannot consume " + token1;
                            tmp33 = Parser.tracer.print(tmp32, 683);
                            return acc
                          }
                        }
                      } else {
                        token1 = param01;
                        scrut2 = Precedence.Keywords.appPrec > prec;
                        if (scrut2 === true) {
                          tmp34 = Parser.tracer.print("found an application", 677);
                          scrut3 = term(Precedence.Keywords.appPrec);
                          if (scrut3 instanceof Tree.Empty.class) {
                            return acc
                          } else if (scrut3 instanceof Tree.Error.class) {
                            return acc
                          } else {
                            rhs = scrut3;
                            tmp35 = Stack.Cons(rhs, Stack.Nil);
                            tmp36 = Tree.App(acc, tmp35);
                            return termCont(tmp36, prec)
                          }
                        } else {
                          tmp37 = "cannot consume " + token1;
                          tmp38 = Parser.tracer.print(tmp37, 683);
                          return acc
                        }
                      }
                    } else {
                      token1 = param01;
                      scrut2 = Precedence.Keywords.appPrec > prec;
                      if (scrut2 === true) {
                        tmp39 = Parser.tracer.print("found an application", 677);
                        scrut3 = term(Precedence.Keywords.appPrec);
                        if (scrut3 instanceof Tree.Empty.class) {
                          return acc
                        } else if (scrut3 instanceof Tree.Error.class) {
                          return acc
                        } else {
                          rhs = scrut3;
                          tmp40 = Stack.Cons(rhs, Stack.Nil);
                          tmp41 = Tree.App(acc, tmp40);
                          return termCont(tmp41, prec)
                        }
                      } else {
                        tmp42 = "cannot consume " + token1;
                        tmp43 = Parser.tracer.print(tmp42, 683);
                        return acc
                      }
                    }
                  }
                } else if (scrut10 instanceof Option.None.class) {
                  return acc
                } else {
                  tmp44 = "keyword `" + name2;
                  tmp45 = tmp44 + "` does not have infix rules";
                  doTemp4 = Parser.tracer.print(tmp45, 663);
                  name1 = param02;
                  if (param12 === true) {
                    scrut4 = runtime.safeCall(Precedence.Keywords.all.get(name1));
                    if (scrut4 instanceof Option.None.class) {
                      tmp46 = "found an operator \"" + name1;
                      tmp47 = tmp46 + "\"";
                      doTemp1 = Parser.tracer.print(tmp47, 665);
                      scrut5 = Precedence.opPrec(name1);
                      if (globalThis.Array.isArray(scrut5) && scrut5.length === 2) {
                        first0 = scrut5[0];
                        first1 = scrut5[1];
                        leftPrec = first0;
                        rightPrec = first1;
                        tmp48 = "leftPrec = " + leftPrec;
                        tmp49 = tmp48 + "; rightPrec = ";
                        tmp50 = tmp49 + rightPrec;
                        doTemp2 = Parser.tracer.print(tmp50, 667);
                        scrut6 = leftPrec > prec;
                        if (scrut6 === true) {
                          tmp51 = consume();
                          tmp52 = Tree.Ident(name1, true);
                          op = tmp52;
                          tmp53 = term(rightPrec);
                          rhs1 = tmp53;
                          tmp54 = Stack.Cons(rhs1, Stack.Nil);
                          tmp55 = Stack.Cons(acc, tmp54);
                          tmp56 = Tree.App(op, tmp55);
                          return termCont(tmp56, prec)
                        } else {
                          return acc
                        }
                      } else {
                        token1 = param01;
                        scrut2 = Precedence.Keywords.appPrec > prec;
                        if (scrut2 === true) {
                          tmp57 = Parser.tracer.print("found an application", 677);
                          scrut3 = term(Precedence.Keywords.appPrec);
                          if (scrut3 instanceof Tree.Empty.class) {
                            return acc
                          } else if (scrut3 instanceof Tree.Error.class) {
                            return acc
                          } else {
                            rhs = scrut3;
                            tmp58 = Stack.Cons(rhs, Stack.Nil);
                            tmp59 = Tree.App(acc, tmp58);
                            return termCont(tmp59, prec)
                          }
                        } else {
                          tmp60 = "cannot consume " + token1;
                          tmp61 = Parser.tracer.print(tmp60, 683);
                          return acc
                        }
                      }
                    } else {
                      token1 = param01;
                      scrut2 = Precedence.Keywords.appPrec > prec;
                      if (scrut2 === true) {
                        tmp62 = Parser.tracer.print("found an application", 677);
                        scrut3 = term(Precedence.Keywords.appPrec);
                        if (scrut3 instanceof Tree.Empty.class) {
                          return acc
                        } else if (scrut3 instanceof Tree.Error.class) {
                          return acc
                        } else {
                          rhs = scrut3;
                          tmp63 = Stack.Cons(rhs, Stack.Nil);
                          tmp64 = Tree.App(acc, tmp63);
                          return termCont(tmp64, prec)
                        }
                      } else {
                        tmp65 = "cannot consume " + token1;
                        tmp66 = Parser.tracer.print(tmp65, 683);
                        return acc
                      }
                    }
                  } else {
                    token1 = param01;
                    scrut2 = Precedence.Keywords.appPrec > prec;
                    if (scrut2 === true) {
                      tmp67 = Parser.tracer.print("found an application", 677);
                      scrut3 = term(Precedence.Keywords.appPrec);
                      if (scrut3 instanceof Tree.Empty.class) {
                        return acc
                      } else if (scrut3 instanceof Tree.Error.class) {
                        return acc
                      } else {
                        rhs = scrut3;
                        tmp68 = Stack.Cons(rhs, Stack.Nil);
                        tmp69 = Tree.App(acc, tmp68);
                        return termCont(tmp69, prec)
                      }
                    } else {
                      tmp70 = "cannot consume " + token1;
                      tmp71 = Parser.tracer.print(tmp70, 683);
                      return acc
                    }
                  }
                }
              } else {
                tmp72 = "keyword `" + name2;
                tmp73 = tmp72 + "` does not have infix rules";
                doTemp4 = Parser.tracer.print(tmp73, 663);
                name1 = param02;
                if (param12 === true) {
                  scrut4 = runtime.safeCall(Precedence.Keywords.all.get(name1));
                  if (scrut4 instanceof Option.None.class) {
                    tmp74 = "found an operator \"" + name1;
                    tmp75 = tmp74 + "\"";
                    doTemp1 = Parser.tracer.print(tmp75, 665);
                    scrut5 = Precedence.opPrec(name1);
                    if (globalThis.Array.isArray(scrut5) && scrut5.length === 2) {
                      first0 = scrut5[0];
                      first1 = scrut5[1];
                      leftPrec = first0;
                      rightPrec = first1;
                      tmp76 = "leftPrec = " + leftPrec;
                      tmp77 = tmp76 + "; rightPrec = ";
                      tmp78 = tmp77 + rightPrec;
                      doTemp2 = Parser.tracer.print(tmp78, 667);
                      scrut6 = leftPrec > prec;
                      if (scrut6 === true) {
                        tmp79 = consume();
                        tmp80 = Tree.Ident(name1, true);
                        op = tmp80;
                        tmp81 = term(rightPrec);
                        rhs1 = tmp81;
                        tmp82 = Stack.Cons(rhs1, Stack.Nil);
                        tmp83 = Stack.Cons(acc, tmp82);
                        tmp84 = Tree.App(op, tmp83);
                        return termCont(tmp84, prec)
                      } else {
                        return acc
                      }
                    } else {
                      token1 = param01;
                      scrut2 = Precedence.Keywords.appPrec > prec;
                      if (scrut2 === true) {
                        tmp85 = Parser.tracer.print("found an application", 677);
                        scrut3 = term(Precedence.Keywords.appPrec);
                        if (scrut3 instanceof Tree.Empty.class) {
                          return acc
                        } else if (scrut3 instanceof Tree.Error.class) {
                          return acc
                        } else {
                          rhs = scrut3;
                          tmp86 = Stack.Cons(rhs, Stack.Nil);
                          tmp87 = Tree.App(acc, tmp86);
                          return termCont(tmp87, prec)
                        }
                      } else {
                        tmp88 = "cannot consume " + token1;
                        tmp89 = Parser.tracer.print(tmp88, 683);
                        return acc
                      }
                    }
                  } else {
                    token1 = param01;
                    scrut2 = Precedence.Keywords.appPrec > prec;
                    if (scrut2 === true) {
                      tmp90 = Parser.tracer.print("found an application", 677);
                      scrut3 = term(Precedence.Keywords.appPrec);
                      if (scrut3 instanceof Tree.Empty.class) {
                        return acc
                      } else if (scrut3 instanceof Tree.Error.class) {
                        return acc
                      } else {
                        rhs = scrut3;
                        tmp91 = Stack.Cons(rhs, Stack.Nil);
                        tmp92 = Tree.App(acc, tmp91);
                        return termCont(tmp92, prec)
                      }
                    } else {
                      tmp93 = "cannot consume " + token1;
                      tmp94 = Parser.tracer.print(tmp93, 683);
                      return acc
                    }
                  }
                } else {
                  token1 = param01;
                  scrut2 = Precedence.Keywords.appPrec > prec;
                  if (scrut2 === true) {
                    tmp95 = Parser.tracer.print("found an application", 677);
                    scrut3 = term(Precedence.Keywords.appPrec);
                    if (scrut3 instanceof Tree.Empty.class) {
                      return acc
                    } else if (scrut3 instanceof Tree.Error.class) {
                      return acc
                    } else {
                      rhs = scrut3;
                      tmp96 = Stack.Cons(rhs, Stack.Nil);
                      tmp97 = Tree.App(acc, tmp96);
                      return termCont(tmp97, prec)
                    }
                  } else {
                    tmp98 = "cannot consume " + token1;
                    tmp99 = Parser.tracer.print(tmp98, 683);
                    return acc
                  }
                }
              }
            } else {
              tmp100 = "keyword `" + name2;
              tmp101 = tmp100 + "` does not have infix rules";
              doTemp4 = Parser.tracer.print(tmp101, 663);
              name1 = param02;
              if (param12 === true) {
                scrut4 = runtime.safeCall(Precedence.Keywords.all.get(name1));
                if (scrut4 instanceof Option.None.class) {
                  tmp102 = "found an operator \"" + name1;
                  tmp103 = tmp102 + "\"";
                  doTemp1 = Parser.tracer.print(tmp103, 665);
                  scrut5 = Precedence.opPrec(name1);
                  if (globalThis.Array.isArray(scrut5) && scrut5.length === 2) {
                    first0 = scrut5[0];
                    first1 = scrut5[1];
                    leftPrec = first0;
                    rightPrec = first1;
                    tmp104 = "leftPrec = " + leftPrec;
                    tmp105 = tmp104 + "; rightPrec = ";
                    tmp106 = tmp105 + rightPrec;
                    doTemp2 = Parser.tracer.print(tmp106, 667);
                    scrut6 = leftPrec > prec;
                    if (scrut6 === true) {
                      tmp107 = consume();
                      tmp108 = Tree.Ident(name1, true);
                      op = tmp108;
                      tmp109 = term(rightPrec);
                      rhs1 = tmp109;
                      tmp110 = Stack.Cons(rhs1, Stack.Nil);
                      tmp111 = Stack.Cons(acc, tmp110);
                      tmp112 = Tree.App(op, tmp111);
                      return termCont(tmp112, prec)
                    } else {
                      return acc
                    }
                  } else {
                    token1 = param01;
                    scrut2 = Precedence.Keywords.appPrec > prec;
                    if (scrut2 === true) {
                      tmp113 = Parser.tracer.print("found an application", 677);
                      scrut3 = term(Precedence.Keywords.appPrec);
                      if (scrut3 instanceof Tree.Empty.class) {
                        return acc
                      } else if (scrut3 instanceof Tree.Error.class) {
                        return acc
                      } else {
                        rhs = scrut3;
                        tmp114 = Stack.Cons(rhs, Stack.Nil);
                        tmp115 = Tree.App(acc, tmp114);
                        return termCont(tmp115, prec)
                      }
                    } else {
                      tmp116 = "cannot consume " + token1;
                      tmp117 = Parser.tracer.print(tmp116, 683);
                      return acc
                    }
                  }
                } else {
                  token1 = param01;
                  scrut2 = Precedence.Keywords.appPrec > prec;
                  if (scrut2 === true) {
                    tmp118 = Parser.tracer.print("found an application", 677);
                    scrut3 = term(Precedence.Keywords.appPrec);
                    if (scrut3 instanceof Tree.Empty.class) {
                      return acc
                    } else if (scrut3 instanceof Tree.Error.class) {
                      return acc
                    } else {
                      rhs = scrut3;
                      tmp119 = Stack.Cons(rhs, Stack.Nil);
                      tmp120 = Tree.App(acc, tmp119);
                      return termCont(tmp120, prec)
                    }
                  } else {
                    tmp121 = "cannot consume " + token1;
                    tmp122 = Parser.tracer.print(tmp121, 683);
                    return acc
                  }
                }
              } else {
                token1 = param01;
                scrut2 = Precedence.Keywords.appPrec > prec;
                if (scrut2 === true) {
                  tmp123 = Parser.tracer.print("found an application", 677);
                  scrut3 = term(Precedence.Keywords.appPrec);
                  if (scrut3 instanceof Tree.Empty.class) {
                    return acc
                  } else if (scrut3 instanceof Tree.Error.class) {
                    return acc
                  } else {
                    rhs = scrut3;
                    tmp124 = Stack.Cons(rhs, Stack.Nil);
                    tmp125 = Tree.App(acc, tmp124);
                    return termCont(tmp125, prec)
                  }
                } else {
                  tmp126 = "cannot consume " + token1;
                  tmp127 = Parser.tracer.print(tmp126, 683);
                  return acc
                }
              }
            }
          } else {
            name1 = param02;
            if (param12 === true) {
              scrut4 = runtime.safeCall(Precedence.Keywords.all.get(name1));
              if (scrut4 instanceof Option.None.class) {
                tmp128 = "found an operator \"" + name1;
                tmp129 = tmp128 + "\"";
                doTemp1 = Parser.tracer.print(tmp129, 665);
                scrut5 = Precedence.opPrec(name1);
                if (globalThis.Array.isArray(scrut5) && scrut5.length === 2) {
                  first0 = scrut5[0];
                  first1 = scrut5[1];
                  leftPrec = first0;
                  rightPrec = first1;
                  tmp130 = "leftPrec = " + leftPrec;
                  tmp131 = tmp130 + "; rightPrec = ";
                  tmp132 = tmp131 + rightPrec;
                  doTemp2 = Parser.tracer.print(tmp132, 667);
                  scrut6 = leftPrec > prec;
                  if (scrut6 === true) {
                    tmp133 = consume();
                    tmp134 = Tree.Ident(name1, true);
                    op = tmp134;
                    tmp135 = term(rightPrec);
                    rhs1 = tmp135;
                    tmp136 = Stack.Cons(rhs1, Stack.Nil);
                    tmp137 = Stack.Cons(acc, tmp136);
                    tmp138 = Tree.App(op, tmp137);
                    return termCont(tmp138, prec)
                  } else {
                    return acc
                  }
                } else {
                  token1 = param01;
                  scrut2 = Precedence.Keywords.appPrec > prec;
                  if (scrut2 === true) {
                    tmp139 = Parser.tracer.print("found an application", 677);
                    scrut3 = term(Precedence.Keywords.appPrec);
                    if (scrut3 instanceof Tree.Empty.class) {
                      return acc
                    } else if (scrut3 instanceof Tree.Error.class) {
                      return acc
                    } else {
                      rhs = scrut3;
                      tmp140 = Stack.Cons(rhs, Stack.Nil);
                      tmp141 = Tree.App(acc, tmp140);
                      return termCont(tmp141, prec)
                    }
                  } else {
                    tmp142 = "cannot consume " + token1;
                    tmp143 = Parser.tracer.print(tmp142, 683);
                    return acc
                  }
                }
              } else {
                token1 = param01;
                scrut2 = Precedence.Keywords.appPrec > prec;
                if (scrut2 === true) {
                  tmp144 = Parser.tracer.print("found an application", 677);
                  scrut3 = term(Precedence.Keywords.appPrec);
                  if (scrut3 instanceof Tree.Empty.class) {
                    return acc
                  } else if (scrut3 instanceof Tree.Error.class) {
                    return acc
                  } else {
                    rhs = scrut3;
                    tmp145 = Stack.Cons(rhs, Stack.Nil);
                    tmp146 = Tree.App(acc, tmp145);
                    return termCont(tmp146, prec)
                  }
                } else {
                  tmp147 = "cannot consume " + token1;
                  tmp148 = Parser.tracer.print(tmp147, 683);
                  return acc
                }
              }
            } else {
              token1 = param01;
              scrut2 = Precedence.Keywords.appPrec > prec;
              if (scrut2 === true) {
                tmp149 = Parser.tracer.print("found an application", 677);
                scrut3 = term(Precedence.Keywords.appPrec);
                if (scrut3 instanceof Tree.Empty.class) {
                  return acc
                } else if (scrut3 instanceof Tree.Error.class) {
                  return acc
                } else {
                  rhs = scrut3;
                  tmp150 = Stack.Cons(rhs, Stack.Nil);
                  tmp151 = Tree.App(acc, tmp150);
                  return termCont(tmp151, prec)
                }
              } else {
                tmp152 = "cannot consume " + token1;
                tmp153 = Parser.tracer.print(tmp152, 683);
                return acc
              }
            }
          }
        } else {
          token1 = param01;
          scrut2 = Precedence.Keywords.appPrec > prec;
          if (scrut2 === true) {
            tmp154 = Parser.tracer.print("found an application", 677);
            scrut3 = term(Precedence.Keywords.appPrec);
            if (scrut3 instanceof Tree.Empty.class) {
              return acc
            } else if (scrut3 instanceof Tree.Error.class) {
              return acc
            } else {
              rhs = scrut3;
              tmp155 = Stack.Cons(rhs, Stack.Nil);
              tmp156 = Tree.App(acc, tmp155);
              return termCont(tmp156, prec)
            }
          } else {
            tmp157 = "cannot consume " + token1;
            tmp158 = Parser.tracer.print(tmp157, 683);
            return acc
          }
        }
      } else if (scrut1 instanceof Stack.Nil.class) {
        return acc
      } else {
        throw new globalThis.Error("match error");
      }
    };
    typeExpr = function typeExpr(prec) {
      let tmp4, tmp5, tmp6, tmp7, tmp8;
      tmp4 = "typeExpr <<< " + prec;
      tmp5 = tmp4 + " ";
      tmp6 = TokenHelpers.preview(current);
      tmp7 = tmp5 + tmp6;
      tmp8 = () => {
        let scrut1, param01, param11, token1, param02, param12, name1, symbolic, scrut2, param03, keyword1, scrut3, param04, rule, scrut4, acc, param05, name2, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20, tmp21, tmp22, tmp23, tmp24, tmp25, tmp26;
        tmp9 = yeetSpaces();
        scrut1 = tmp9;
        if (scrut1 instanceof Stack.Cons.class) {
          param01 = scrut1.head;
          param11 = scrut1.tail;
          if (param01 instanceof Token.Identifier.class) {
            param02 = param01.name;
            param12 = param01.symbolic;
            if (param02 === "|") {
              tmp10 = consume();
              return typeExpr(prec)
            } else {
              name1 = param02;
              symbolic = param12;
              scrut2 = runtime.safeCall(Precedence.TypeKeywords.all.get(name1));
              if (scrut2 instanceof Option.Some.class) {
                param03 = scrut2.value;
                keyword1 = param03;
                scrut3 = runtime.safeCall(Parser.typeRule.keywordChoices.get(name1));
                if (scrut3 instanceof Option.Some.class) {
                  param04 = scrut3.value;
                  rule = param04;
                  scrut4 = keyword1.leftPrecOrMin > prec;
                  if (scrut4 === true) {
                    tmp11 = consume();
                    tmp12 = parseRule(keyword1.rightPrecOrMax, rule, Precedence.TypeKeywords.all);
                    acc = tmp12;
                    return typeExprCont(acc, prec)
                  } else {
                    tmp13 = "the left precedence is less" + name1;
                    tmp14 = Parser.tracer.print(tmp13, 708);
                    return Tree.empty
                  }
                } else if (scrut3 instanceof Option.None.class) {
                  tmp15 = "no rule starting with " + name1;
                  tmp16 = Parser.tracer.print(tmp15, 711);
                  return Tree.empty
                } else {
                  token1 = param01;
                  tmp17 = "unrecognized token: " + token1;
                  return Tree.error(tmp17)
                }
              } else if (scrut2 instanceof Option.None.class) {
                if (symbolic === true) {
                  tmp18 = consume();
                  tmp19 = "unexpected symbolic identifier: " + name1;
                  return Tree.error(tmp19)
                } else {
                  tmp20 = consume();
                  tmp21 = Tree.Ident(name1);
                  return typeExprCont(tmp21, prec)
                }
              } else {
                token1 = param01;
                tmp22 = "unrecognized token: " + token1;
                return Tree.error(tmp22)
              }
            }
          } else if (param01 instanceof Token.TypeVariable.class) {
            param05 = param01.name;
            name2 = param05;
            tmp23 = consume();
            tmp24 = "'" + name2;
            tmp25 = Tree.Ident(tmp24);
            return typeExprCont(tmp25, prec)
          } else {
            token1 = param01;
            tmp26 = "unrecognized token: " + token1;
            return Tree.error(tmp26)
          }
        } else {
          return Tree.error("unexpected end of input")
        }
      };
      return runtime.safeCall(Parser.tracer.trace(tmp7, (result) => {
        let tmp9;
        tmp9 = Tree.summary(result);
        return "typeExpr >>> " + tmp9
      }, tmp8))
    };
    typeExprCont = function typeExprCont(acc, prec) {
      let scrut1, doTemp, doTemp1, param01, param11, token1, param02, param12, name1, scrut2, scrut3, rhs, name2, scrut4, param03, keyword1, scrut5, param04, rule, doTemp2, doTemp3, scrut6, scrut7, param05, first2, first1, first0, kind1, process, rest, rhs1, acc$_, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20, tmp21, tmp22, tmp23, tmp24, tmp25, tmp26, tmp27, tmp28, tmp29, tmp30, tmp31, tmp32, tmp33, tmp34, tmp35, tmp36, tmp37, tmp38, tmp39, tmp40, tmp41, tmp42, tmp43, tmp44, tmp45, tmp46, tmp47, tmp48, tmp49, tmp50, tmp51, tmp52, tmp53, tmp54, tmp55, tmp56, tmp57, tmp58, tmp59, tmp60;
      tmp4 = ">>> typeExprCont " + prec;
      tmp5 = tmp4 + " ";
      tmp6 = Tree.summary(acc);
      tmp7 = tmp5 + tmp6;
      tmp8 = tmp7 + " <<<";
      tmp9 = Parser.tracer.print(tmp8, 724);
      tmp10 = yeetSpaces();
      scrut1 = tmp10;
      tmp11 = TokenHelpers.preview(current);
      tmp12 = "check keyword " + tmp11;
      doTemp = Parser.tracer.print(tmp12, 726);
      if (scrut1 instanceof Stack.Cons.class) {
        param01 = scrut1.head;
        param11 = scrut1.tail;
        if (param01 instanceof Token.Identifier.class) {
          param02 = param01.name;
          param12 = param01.symbolic;
          name2 = param02;
          scrut4 = runtime.safeCall(Precedence.TypeKeywords.all.get(name2));
          if (scrut4 instanceof Option.Some.class) {
            param03 = scrut4.value;
            keyword1 = param03;
            scrut5 = runtime.safeCall(Parser.typeInfixRule.keywordChoices.get(name2));
            if (scrut5 instanceof Option.Some.class) {
              param04 = scrut5.value;
              rule = param04;
              tmp13 = "the keyword is found in infix rules" + name2;
              doTemp2 = Parser.tracer.print(tmp13, 729);
              scrut6 = keyword1.leftPrecOrMin > prec;
              if (scrut6 === true) {
                scrut7 = rule.exprChoice;
                if (scrut7 instanceof Option.Some.class) {
                  param05 = scrut7.value;
                  if (globalThis.Array.isArray(param05) && param05.length === 3) {
                    first0 = param05[0];
                    first1 = param05[1];
                    first2 = param05[2];
                    kind1 = first0;
                    process = first1;
                    rest = first2;
                    tmp14 = consume();
                    tmp15 = parseKind(kind1, keyword1.rightPrecOrMin);
                    rhs1 = tmp15;
                    tmp16 = runtime.safeCall(process(rhs1));
                    tmp17 = runtime.safeCall(tmp16(acc));
                    acc$_ = tmp17;
                    return typeExprCont(acc$_, prec)
                  } else {
                    tmp18 = "keyword `" + name2;
                    tmp19 = tmp18 + "` does not have infix rules";
                    doTemp3 = Parser.tracer.print(tmp19, 737);
                    doTemp1 = Parser.tracer.print("not a keyword", 748);
                    name1 = param02;
                    if (param12 === false) {
                      scrut2 = Precedence.TypeKeywords.appPrec > prec;
                      if (scrut2 === true) {
                        tmp20 = Parser.tracer.print("found an application", 751);
                        scrut3 = typeExpr(Precedence.TypeKeywords.appPrec);
                        if (scrut3 instanceof Tree.Empty.class) {
                          return acc
                        } else if (scrut3 instanceof Tree.Error.class) {
                          return acc
                        } else {
                          rhs = scrut3;
                          tmp21 = Stack.Cons(acc, Stack.Nil);
                          tmp22 = Tree.App(rhs, tmp21);
                          return typeExprCont(tmp22, prec)
                        }
                      } else {
                        token1 = param01;
                        tmp23 = "cannot consume " + token1;
                        tmp24 = Parser.tracer.print(tmp23, 757);
                        return acc
                      }
                    } else {
                      token1 = param01;
                      tmp25 = "cannot consume " + token1;
                      tmp26 = Parser.tracer.print(tmp25, 757);
                      return acc
                    }
                  }
                } else if (scrut7 instanceof Option.None.class) {
                  return acc
                } else {
                  tmp27 = "keyword `" + name2;
                  tmp28 = tmp27 + "` does not have infix rules";
                  doTemp3 = Parser.tracer.print(tmp28, 737);
                  doTemp1 = Parser.tracer.print("not a keyword", 748);
                  name1 = param02;
                  if (param12 === false) {
                    scrut2 = Precedence.TypeKeywords.appPrec > prec;
                    if (scrut2 === true) {
                      tmp29 = Parser.tracer.print("found an application", 751);
                      scrut3 = typeExpr(Precedence.TypeKeywords.appPrec);
                      if (scrut3 instanceof Tree.Empty.class) {
                        return acc
                      } else if (scrut3 instanceof Tree.Error.class) {
                        return acc
                      } else {
                        rhs = scrut3;
                        tmp30 = Stack.Cons(acc, Stack.Nil);
                        tmp31 = Tree.App(rhs, tmp30);
                        return typeExprCont(tmp31, prec)
                      }
                    } else {
                      token1 = param01;
                      tmp32 = "cannot consume " + token1;
                      tmp33 = Parser.tracer.print(tmp32, 757);
                      return acc
                    }
                  } else {
                    token1 = param01;
                    tmp34 = "cannot consume " + token1;
                    tmp35 = Parser.tracer.print(tmp34, 757);
                    return acc
                  }
                }
              } else {
                tmp36 = "keyword `" + name2;
                tmp37 = tmp36 + "` does not have infix rules";
                doTemp3 = Parser.tracer.print(tmp37, 737);
                doTemp1 = Parser.tracer.print("not a keyword", 748);
                name1 = param02;
                if (param12 === false) {
                  scrut2 = Precedence.TypeKeywords.appPrec > prec;
                  if (scrut2 === true) {
                    tmp38 = Parser.tracer.print("found an application", 751);
                    scrut3 = typeExpr(Precedence.TypeKeywords.appPrec);
                    if (scrut3 instanceof Tree.Empty.class) {
                      return acc
                    } else if (scrut3 instanceof Tree.Error.class) {
                      return acc
                    } else {
                      rhs = scrut3;
                      tmp39 = Stack.Cons(acc, Stack.Nil);
                      tmp40 = Tree.App(rhs, tmp39);
                      return typeExprCont(tmp40, prec)
                    }
                  } else {
                    token1 = param01;
                    tmp41 = "cannot consume " + token1;
                    tmp42 = Parser.tracer.print(tmp41, 757);
                    return acc
                  }
                } else {
                  token1 = param01;
                  tmp43 = "cannot consume " + token1;
                  tmp44 = Parser.tracer.print(tmp43, 757);
                  return acc
                }
              }
            } else {
              doTemp1 = Parser.tracer.print("not a keyword", 748);
              name1 = param02;
              if (param12 === false) {
                scrut2 = Precedence.TypeKeywords.appPrec > prec;
                if (scrut2 === true) {
                  tmp45 = Parser.tracer.print("found an application", 751);
                  scrut3 = typeExpr(Precedence.TypeKeywords.appPrec);
                  if (scrut3 instanceof Tree.Empty.class) {
                    return acc
                  } else if (scrut3 instanceof Tree.Error.class) {
                    return acc
                  } else {
                    rhs = scrut3;
                    tmp46 = Stack.Cons(acc, Stack.Nil);
                    tmp47 = Tree.App(rhs, tmp46);
                    return typeExprCont(tmp47, prec)
                  }
                } else {
                  token1 = param01;
                  tmp48 = "cannot consume " + token1;
                  tmp49 = Parser.tracer.print(tmp48, 757);
                  return acc
                }
              } else {
                token1 = param01;
                tmp50 = "cannot consume " + token1;
                tmp51 = Parser.tracer.print(tmp50, 757);
                return acc
              }
            }
          } else {
            doTemp1 = Parser.tracer.print("not a keyword", 748);
            name1 = param02;
            if (param12 === false) {
              scrut2 = Precedence.TypeKeywords.appPrec > prec;
              if (scrut2 === true) {
                tmp52 = Parser.tracer.print("found an application", 751);
                scrut3 = typeExpr(Precedence.TypeKeywords.appPrec);
                if (scrut3 instanceof Tree.Empty.class) {
                  return acc
                } else if (scrut3 instanceof Tree.Error.class) {
                  return acc
                } else {
                  rhs = scrut3;
                  tmp53 = Stack.Cons(acc, Stack.Nil);
                  tmp54 = Tree.App(rhs, tmp53);
                  return typeExprCont(tmp54, prec)
                }
              } else {
                token1 = param01;
                tmp55 = "cannot consume " + token1;
                tmp56 = Parser.tracer.print(tmp55, 757);
                return acc
              }
            } else {
              token1 = param01;
              tmp57 = "cannot consume " + token1;
              tmp58 = Parser.tracer.print(tmp57, 757);
              return acc
            }
          }
        } else {
          doTemp1 = Parser.tracer.print("not a keyword", 748);
          token1 = param01;
          tmp59 = "cannot consume " + token1;
          tmp60 = Parser.tracer.print(tmp59, 757);
          return acc
        }
      } else {
        doTemp1 = Parser.tracer.print("not a keyword", 748);
        if (scrut1 instanceof Stack.Nil.class) {
          return acc
        } else {
          throw new globalThis.Error("match error");
        }
      }
    };
    mod = function mod(acc) {
      let scrut1, doTemp, param01, param11, param02, param12, name1, scrut2, param03, keyword1, scrut3, param04, rule, tree1, scrut4, param05, rule1, tree2, param06, param13, bindings, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20;
      tmp4 = yeetSpaces();
      scrut1 = tmp4;
      doTemp = Parser.tracer.print(">>>>>> mod <<<<<<", 762);
      if (scrut1 instanceof Stack.Cons.class) {
        param01 = scrut1.head;
        param11 = scrut1.tail;
        if (param01 instanceof Token.Identifier.class) {
          param02 = param01.name;
          param12 = param01.symbolic;
          if (param02 === ";;") {
            tmp5 = consume();
            return mod
          } else {
            name1 = param02;
            scrut2 = runtime.safeCall(Precedence.Keywords.all.get(name1));
            if (scrut2 instanceof Option.Some.class) {
              param03 = scrut2.value;
              keyword1 = param03;
              scrut4 = runtime.safeCall(Parser.termRule.keywordChoices.get(name1));
              if (scrut4 instanceof Option.Some.class) {
                param05 = scrut4.value;
                rule1 = param05;
                tmp6 = term(0);
                tree2 = tmp6;
                if (tree2 instanceof Tree.LetIn.class) {
                  param06 = tree2.bindings;
                  param13 = tree2.body;
                  bindings = param06;
                  if (param13 instanceof Tree.Empty.class) {
                    tmp7 = Tree.DefineKind.Let(false);
                    tmp8 = Tree.Define(tmp7, bindings);
                    tmp9 = Stack.Cons(tmp8, acc);
                    return modCont(tmp9)
                  } else {
                    tmp10 = Stack.Cons(tree2, acc);
                    return modCont(tmp10)
                  }
                } else {
                  tmp11 = Stack.Cons(tree2, acc);
                  return modCont(tmp11)
                }
              } else {
                scrut3 = runtime.safeCall(Parser.declRule.keywordChoices.get(name1));
                if (scrut3 instanceof Option.Some.class) {
                  param04 = scrut3.value;
                  rule = param04;
                  tmp12 = consume();
                  tmp13 = parseRule(0, rule, Precedence.Keywords.all);
                  tree1 = tmp13;
                  tmp14 = Stack.Cons(tree1, acc);
                  return modCont(tmp14)
                } else {
                  tmp15 = term(0, Option.None);
                  tmp16 = Stack.Cons(tmp15, acc);
                  return modCont(tmp16)
                }
              }
            } else {
              tmp17 = term(0, Option.None);
              tmp18 = Stack.Cons(tmp17, acc);
              return modCont(tmp18)
            }
          }
        } else {
          tmp19 = term(0, Option.None);
          tmp20 = Stack.Cons(tmp19, acc);
          return modCont(tmp20)
        }
      } else if (scrut1 instanceof Stack.Nil.class) {
        return Stack.reverse(acc)
      } else {
        throw new globalThis.Error("match error");
      }
    };
    modCont = function modCont(acc) {
      let scrut1, doTemp, param01, param11, param02, param12, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9;
      tmp4 = yeetSpaces();
      scrut1 = tmp4;
      doTemp = Parser.tracer.print(">>>>>> modCont <<<<<<", 783);
      if (scrut1 instanceof Stack.Cons.class) {
        param01 = scrut1.head;
        param11 = scrut1.tail;
        if (param01 instanceof Token.Identifier.class) {
          param02 = param01.name;
          param12 = param01.symbolic;
          if (param02 === ";;") {
            tmp5 = consume();
            return mod(acc)
          } else {
            tmp6 = parseRule(0, Parser.declRule, Precedence.Keywords.all);
            tmp7 = Stack.Cons(tmp6, acc);
            return modCont(tmp7)
          }
        } else {
          tmp8 = parseRule(0, Parser.declRule, Precedence.Keywords.all);
          tmp9 = Stack.Cons(tmp8, acc);
          return modCont(tmp9)
        }
      } else if (scrut1 instanceof Stack.Nil.class) {
        return Stack.reverse(acc)
      } else {
        throw new globalThis.Error("match error");
      }
    };
    current = tokens;
    counter = 0;
    tmp = runtime.safeCall(Parser.tracer.trace("module <<< ", (result) => {
      let tmp4;
      tmp4 = Tree.summary(result);
      return "module >>> " + tmp4
    }, () => {
      return mod(Stack.Nil)
    }));
    tree = tmp;
    tmp1 = yeetSpaces();
    scrut = tmp1;
    if (scrut instanceof Stack.Cons.class) {
      param0 = scrut.head;
      param1 = scrut.tail;
      token = param0;
      tmp2 = "expect EOF instead of " + token;
      message = tmp2;
      tmp3 = Parser.tracer.print(message, 798);
      return Tree.Error(tree, message)
    } else if (scrut instanceof Stack.Nil.class) {
      return tree
    } else {
      throw new globalThis.Error("match error");
    }
  }
  static toString() { return "Parser"; }
};
let Parser = Parser1; export default Parser;
