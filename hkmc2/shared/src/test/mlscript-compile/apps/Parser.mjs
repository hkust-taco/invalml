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
    let tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20, tmp21, tmp22, tmp23, tmp24, tmp25, tmp26, tmp27, tmp28, tmp29, tmp30, tmp31, tmp32, tmp33, tmp34, tmp35, tmp36, tmp37, tmp38, tmp39, tmp40, tmp41, tmp42, tmp43, tmp44, tmp45;
    tmp = new TreeTracer.TreeTracer();
    this.tracer = tmp;
    tmp1 = Parser.letBinding(true);
    Parser.#letExpression = tmp1;
    tmp2 = Parser.letBinding(false);
    Parser.#letDefinition = tmp2;
    tmp3 = ParseRule.Choice.end(runtime.Unit);
    tmp4 = ParseRule.Choice.keyword(Precedence.Keywords._done, "while end", tmp3);
    tmp5 = ParseRule.Choice.term((body, _) => {
      return body
    }, "while end", tmp4);
    tmp6 = ParseRule.Choice.keyword(Precedence.Keywords._do, "while body", tmp5);
    tmp7 = ParseRule.Choice.term(Tree.While, "while body", tmp6);
    tmp8 = ParseRule.Choice.keyword(Precedence.Keywords._while, "while condition", tmp7);
    Parser.#whileTerm = tmp8;
    tmp9 = (lhs, rhs) => {
      let param0, tail, tmp46, tmp47, tmp48;
      if (rhs instanceof Tree.Tuple.class) {
        param0 = rhs.trees;
        tail = param0;
        tmp46 = Stack.Cons(lhs, tail);
        return Tree.Tuple(tmp46)
      } else {
        tmp47 = Stack.Cons(rhs, Stack.Nil);
        tmp48 = Stack.Cons(lhs, tmp47);
        return Tree.Tuple(tmp48)
      }
    };
    tmp10 = Parser.makeInfixChoice(Precedence.Keywords._comma, "term", tmp9);
    tmp11 = (lhs, rhs) => {
      let param0, tail, tmp46, tmp47, tmp48;
      if (rhs instanceof Tree.Sequence.class) {
        param0 = rhs.trees;
        tail = param0;
        tmp46 = Stack.Cons(lhs, tail);
        return Tree.Sequence(tmp46)
      } else {
        tmp47 = Stack.Cons(rhs, Stack.Nil);
        tmp48 = Stack.Cons(lhs, tmp47);
        return Tree.Sequence(tmp48)
      }
    };
    tmp12 = Parser.makeInfixChoice(Precedence.Keywords._semicolon, "term", tmp11);
    tmp13 = ParseRule.Choice.end(runtime.Unit);
    tmp14 = ParseRule.Choice.typeExpr((rhs, _) => {
      return (lhs) => {
        return Tree.Infix(Precedence.Keywords._colon, lhs, rhs)
      }
    }, "right-hand side type", tmp13);
    tmp15 = ParseRule.Choice.keyword(Precedence.Keywords._colon, "type ascription", tmp14);
    tmp16 = ParseRule.rule("infix rules for expressions", tmp10, tmp12, tmp15);
    this.termInfixRule = tmp16;
    tmp17 = Parser.funChoice();
    tmp18 = Parser.matchWithChoice();
    tmp19 = Parser.matchFunctionChoice();
    tmp20 = Parser.ifThenElse();
    tmp21 = Parser.makeBracketRule(Precedence.Keywords._leftRound, Precedence.Keywords._rightRound, "term", (tree) => {
      if (tree instanceof Tree.Empty.class) {
        return Tree.Tuple(Stack.Nil)
      } else {
        return tree
      }
    });
    tmp22 = (tree) => {
      let tmp46;
      if (tree instanceof Tree.Empty.class) {
        tmp46 = Tree.Sequence(Stack.Nil);
      } else {
        tmp46 = tree;
      }
      return Tree.Bracketed(Token.Square, tmp46)
    };
    tmp23 = Parser.makeBracketRule(Precedence.Keywords._leftSquare, Precedence.Keywords._rightSquare, "term", tmp22);
    tmp24 = Parser.makeBracketRule(Precedence.Keywords._leftCurly, Precedence.Keywords._rightCurly, "term", Predef.id);
    tmp25 = Parser.makeBracketRule(Precedence.Keywords._begin, Precedence.Keywords._end, "term", (tree) => {
      if (tree instanceof Tree.Empty.class) {
        return Tree.Sequence(Stack.Nil)
      } else {
        return tree
      }
    });
    tmp26 = ParseRule.Choice.Ref("term", (lhs, compose) => {
      return runtime.safeCall(compose(lhs))
    }, Parser.termInfixRule);
    tmp27 = ParseRule.rule("prefix rules for expressions", Parser.#letExpression, tmp17, tmp18, tmp19, tmp20, Parser.#whileTerm, Parser.forTerm, tmp21, tmp23, tmp24, tmp25, tmp26);
    this.termRule = tmp27;
    tmp28 = (lhs, rhs) => {
      let param0, tail, tmp46, tmp47, tmp48;
      if (rhs instanceof Tree.Tuple.class) {
        param0 = rhs.trees;
        tail = param0;
        tmp46 = Stack.Cons(lhs, tail);
        return Tree.Tuple(tmp46)
      } else {
        tmp47 = Stack.Cons(rhs, Stack.Nil);
        tmp48 = Stack.Cons(lhs, tmp47);
        return Tree.Tuple(tmp48)
      }
    };
    tmp29 = Parser.makeInfixChoice(Precedence.TypeKeywords._comma, "type", tmp28);
    tmp30 = Parser.makeInfixChoice(Precedence.TypeKeywords._arrow, "type", (lhs, rhs) => {
      return Tree.Infix(Precedence.TypeKeywords._arrow, lhs, rhs)
    });
    tmp31 = Parser.makeInfixChoice(Precedence.TypeKeywords._asterisk, "type", (lhs, rhs) => {
      return Tree.Infix(Precedence.TypeKeywords._asterisk, lhs, rhs)
    });
    tmp32 = Parser.makeInfixChoice(Precedence.TypeKeywords._of, "type", (lhs, rhs) => {
      return Tree.Infix(Precedence.TypeKeywords._of, lhs, rhs)
    });
    tmp33 = ParseRule.rule("infix rules for types", tmp29, tmp30, tmp31, tmp32);
    this.typeInfixRule = tmp33;
    tmp34 = Parser.makeBracketRule(Precedence.TypeKeywords._leftRound, Precedence.TypeKeywords._rightRound, "type", Predef.id);
    tmp35 = ParseRule.Choice.Ref("type", (lhs, compose) => {
      return runtime.safeCall(compose(lhs))
    }, Parser.typeInfixRule);
    tmp36 = ParseRule.rule("rules for types", tmp34, tmp35);
    this.typeRule = tmp36;
    tmp37 = new BetterMap.Map();
    this.categories = tmp37;
    tmp38 = Parser.categories.insert("variants", Parser.variantsRule);
    tmp39 = Parser.categories.insert("typedefs", Parser.typedefRule);
    tmp40 = Parser.categories.insert("typedef-rhs", Parser.typedefRhsRule);
    tmp41 = Parser.categories.insert("label-decl", Parser.labelDecl);
    tmp42 = Parser.categories.insert("label-decls", Parser.labelDecls);
    tmp43 = Parser.typeDefinition();
    tmp44 = Parser.exceptionDefinition();
    tmp45 = ParseRule.rule("prefix rules for module items", Parser.#letDefinition, tmp43, tmp44);
    this.declRule = tmp45;
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
          let first1, first0, body, param0, param1, kind, defs, tmp17;
          if (globalThis.Array.isArray(bodyAndDefine) && bodyAndDefine.length === 2) {
            first0 = bodyAndDefine[0];
            first1 = bodyAndDefine[1];
            body = first0;
            if (first1 instanceof Tree.Define.class) {
              param0 = first1.kind;
              param1 = first1.items;
              kind = param0;
              defs = param1;
              tmp17 = Stack.Cons([
                head,
                body
              ], defs);
              return Tree.Define(kind, tmp17)
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
  static funChoice() {
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
  static patternMatchingBody(intro, cons, nil) {
    let makeMatchArms, matchArms, tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8;
    makeMatchArms = function makeMatchArms(get) {
      let tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18;
      tmp9 = (pat, rhsAndRest) => {
        let first1, first0, rhs, rest, tmp19;
        if (globalThis.Array.isArray(rhsAndRest) && rhsAndRest.length === 2) {
          first0 = rhsAndRest[0];
          first1 = rhsAndRest[1];
          rhs = first0;
          rest = first1;
          tmp19 = Tree.Infix(Precedence.Keywords._thinArrow, pat, rhs);
          return runtime.safeCall(cons(tmp19, rest))
        } else {
          throw new globalThis.Error("match error");
        }
      };
      tmp10 = intro + "pattern";
      tmp11 = intro + "arrow";
      tmp12 = intro + "body";
      tmp13 = ParseRule.Choice.end(nil);
      tmp14 = intro + "leading bar";
      tmp15 = ParseRule.Choice.Lazy(get, makeMatchArms);
      tmp16 = ParseRule.Choice.keyword(Precedence.Keywords._bar, tmp14, tmp15);
      tmp17 = ParseRule.Choice.term((curr, next) => {
        return [
          curr,
          next
        ]
      }, tmp12, tmp13, tmp16);
      tmp18 = ParseRule.Choice.keyword(Precedence.Keywords._thinArrow, tmp11, tmp17);
      return ParseRule.Choice.term(tmp9, tmp10, tmp18)
    };
    tmp = ParseRule.Choice.lazy(makeMatchArms);
    matchArms = tmp;
    tmp1 = intro + "body";
    tmp2 = intro + "leading bar";
    tmp3 = ParseRule.Choice.end(runtime.Unit);
    tmp4 = ParseRule.Choice.keyword(Precedence.Keywords._bar, tmp2, tmp3);
    tmp5 = ParseRule.rule(tmp1, tmp4);
    tmp6 = intro + "body";
    tmp7 = ParseRule.rule(tmp6, matchArms);
    tmp8 = ParseRule.Choice.Optional(tmp5, tmp7);
    return Predef.tuple(tmp8)
  } 
  static matchWithChoice() {
    let intro1, tmp, tmp1, tmp2, tmp3, tmp4, tmp5;
    intro1 = "`match` expression: ";
    tmp = intro1 + "keyword";
    tmp1 = intro1 + "scrutinee";
    tmp2 = intro1 + "with";
    tmp3 = Parser.patternMatchingBody(intro1, (x, xs) => {
      return Stack.Cons(x, xs)
    }, Stack.Nil);
    tmp4 = ParseRule.Choice.keyword(Precedence.Keywords._with, tmp2, ...tmp3);
    tmp5 = ParseRule.Choice.term((scrutinee, branches) => {
      return Tree.Match(scrutinee, branches)
    }, tmp1, tmp4);
    return ParseRule.Choice.keyword(Precedence.Keywords._match, tmp, tmp5)
  } 
  static matchFunctionChoice() {
    let intro1, tmp, tmp1, tmp2, tmp3;
    intro1 = "`function` definition: ";
    tmp = intro1 + "`function` keyword";
    tmp1 = (x, xs) => {
      let param0, param1, scrut, arms, tmp4;
      if (xs instanceof Tree.Match.class) {
        param0 = xs.scrutinee;
        param1 = xs.branches;
        scrut = param0;
        arms = param1;
        tmp4 = Stack.Cons(x, arms);
        return Tree.Match(scrut, tmp4)
      } else {
        throw new globalThis.Error("match error");
      }
    };
    tmp2 = Tree.Match(Tree.empty, Stack.Nil);
    tmp3 = Parser.patternMatchingBody(intro1, tmp1, tmp2);
    return ParseRule.Choice.keyword(Precedence.Keywords._function, tmp, ...tmp3)
  } 
  static get forTerm() {
    let intro1, innerPart, tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18;
    intro1 = "for: ";
    tmp = intro1 + "`do` keyword";
    tmp1 = intro1 + "body expression";
    tmp2 = intro1 + "`done` keyword";
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
    tmp8 = intro1 + "left-hand side";
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
    tmp10 = intro1 + "head";
    tmp11 = intro1 + "start expression";
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
    tmp13 = intro1 + "`to` or `downto` keyword";
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
    let intro1, tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6;
    intro1 = "record type: ";
    tmp = intro1 + "left brace";
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
    tmp2 = intro1 + "label-decl";
    tmp3 = intro1 + "right brace";
    tmp4 = ParseRule.Choice.end(Tree.empty);
    tmp5 = ParseRule.Choice.keyword(Precedence.Keywords._rightCurly, tmp3, tmp4);
    tmp6 = ParseRule.Choice.reference("label-decls", tmp1, tmp2, tmp5);
    return ParseRule.Choice.keyword(Precedence.Keywords._leftCurly, tmp, tmp6);
  } 
  static typeDefinition() {
    let intro1, tmp, tmp1, tmp2, tmp3;
    intro1 = "type definition";
    tmp = intro1 + "type defs";
    tmp1 = intro1 + "end";
    tmp2 = ParseRule.Choice.end(runtime.Unit);
    tmp3 = ParseRule.Choice.reference("typedefs", (typedefs, _) => {
      return Tree.Define(Tree.DefineKind.Type, typedefs)
    }, tmp1, tmp2);
    return ParseRule.Choice.keyword(Precedence.Keywords._type, tmp, tmp3)
  } 
  static get variantsRule() {
    let intro1, tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9;
    intro1 = "variant ";
    tmp = intro1 + "variant";
    tmp1 = (lhs, rhsMore) => {
      let param0, rhs;
      if (rhsMore instanceof Option.Some.class) {
        param0 = rhsMore.value;
        rhs = param0;
        return Tree.Infix(Precedence.Keywords._bar, lhs, rhs)
      } else {
        return lhs
      }
    };
    tmp2 = intro1 + "item";
    tmp3 = ParseRule.Choice.end(Option.None);
    tmp4 = intro1 + "bar";
    tmp5 = intro1 + "end";
    tmp6 = ParseRule.Choice.end(runtime.Unit);
    tmp7 = ParseRule.Choice.reference("variants", (more, _) => {
      return Option.Some(more)
    }, tmp5, tmp6);
    tmp8 = ParseRule.Choice.keyword(Precedence.Keywords._bar, tmp4, tmp7);
    tmp9 = ParseRule.Choice.typeExpr(tmp1, tmp2, tmp3, tmp8);
    return ParseRule.rule(tmp, tmp9);
  } 
  static get typedefRule() {
    let intro1, tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13;
    intro1 = "typedef ";
    tmp = intro1 + "rule";
    tmp1 = (lhs, rhsMore) => {
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
    tmp2 = intro1 + "name";
    tmp3 = intro1 + "equal sign";
    tmp4 = intro1 + "body";
    tmp5 = ParseRule.Choice.end(Stack.Nil);
    tmp6 = intro1 + "and";
    tmp7 = intro1 + "end";
    tmp8 = ParseRule.Choice.end(runtime.Unit);
    tmp9 = ParseRule.Choice.reference("typedefs", (more, _) => {
      return more
    }, tmp7, tmp8);
    tmp10 = ParseRule.Choice.keyword(Precedence.Keywords._and, tmp6, tmp9);
    tmp11 = ParseRule.Choice.reference("typedef-rhs", (rhs, more) => {
      return [
        rhs,
        more
      ]
    }, tmp4, tmp5, tmp10);
    tmp12 = ParseRule.Choice.keyword(Precedence.Keywords._equal, tmp3, tmp11);
    tmp13 = ParseRule.Choice.typeExpr(tmp1, tmp2, tmp12);
    return ParseRule.rule(tmp, tmp13);
  } 
  static get typedefRhsRule() {
    let intro1, tmp, tmp1, tmp2, tmp3;
    intro1 = "typedef rhs ";
    tmp = intro1 + "rule";
    tmp1 = intro1 + "variants";
    tmp2 = ParseRule.Choice.end(Stack.Nil);
    tmp3 = ParseRule.Choice.reference("variants", (rhs, _) => {
      return rhs
    }, tmp1, tmp2);
    return ParseRule.rule(tmp, tmp3, Parser.recordTypeChoice);
  } 
  static get labelDecl() {
    let intro1, tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8;
    intro1 = "label-decl: ";
    tmp = intro1 + ParseRule.rule;
    tmp1 = Tree.infix(Precedence.TypeKeywords._colon);
    tmp2 = intro1 + "name";
    tmp3 = intro1 + "colon";
    tmp4 = intro1 + "body";
    tmp5 = ParseRule.Choice.end(Tree.empty);
    tmp6 = ParseRule.Choice.typeExpr((rhs, _) => {
      return rhs
    }, tmp4, tmp5);
    tmp7 = ParseRule.Choice.keyword(Precedence.TypeKeywords._colon, tmp3, tmp6);
    tmp8 = ParseRule.Choice.typeExpr(tmp1, tmp2, tmp7);
    return ParseRule.rule(tmp, tmp8);
  } 
  static get labelDecls() {
    let intro1, tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8;
    intro1 = "label-decls: ";
    tmp = intro1 + ParseRule.rule;
    tmp1 = intro1 + "label-decl";
    tmp2 = ParseRule.Choice.end(Stack.Nil);
    tmp3 = intro1 + "semicolon";
    tmp4 = intro1 + "end";
    tmp5 = ParseRule.Choice.end(runtime.Unit);
    tmp6 = ParseRule.Choice.reference("label-decls", (more, _) => {
      return more
    }, tmp4, tmp5);
    tmp7 = ParseRule.Choice.keyword(Precedence.Keywords._semicolon, tmp3, tmp6);
    tmp8 = ParseRule.Choice.reference("label-decl", Stack.Cons, tmp1, tmp2, tmp7);
    return ParseRule.rule(tmp, tmp8);
  } 
  static exceptionDefinition() {
    let intro1, tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8;
    intro1 = "exception definition: ";
    tmp = intro1 + "keyword";
    tmp1 = intro1 + "name";
    tmp2 = intro1 + "equal sign";
    tmp3 = intro1 + "body";
    tmp4 = ParseRule.Choice.end(runtime.Unit);
    tmp5 = ParseRule.Choice.typeExpr((body, _) => {
      return body
    }, tmp3, tmp4);
    tmp6 = ParseRule.Choice.keyword(Precedence.Keywords._equal, tmp2, tmp5);
    tmp7 = ParseRule.Choice.end(Tree.empty);
    tmp8 = ParseRule.Choice.typeExpr((name, body) => {
      let tmp9;
      tmp9 = Stack.Cons([
        name,
        body
      ], Stack.Nil);
      return Tree.Define(Tree.DefineKind.Exception, tmp9)
    }, tmp1, tmp6, tmp7);
    return ParseRule.Choice.keyword(Precedence.Keywords._exception, tmp, tmp8)
  } 
  static parse(tokens) {
    let require, typeExprCont, term, getParsingByKind, parseRule, yeetSpaces, modCont, consume, termCont, typeExpr, mod, current, counter, tree, scrut, param0, param1, token, message, tmp, tmp1, tmp2, tmp3;
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
    parseRule = function parseRule(prec, rule, allKeywords) {
      let tmp4, tmp5, tmp6, tmp7;
      tmp4 = "parsing rule \"" + rule.name;
      tmp5 = tmp4 + "\" with precedence ";
      tmp6 = tmp5 + prec;
      tmp7 = () => {
        let scrut1, scrut2, param01, value, param02, param11, other, doTemp, doTemp1, scrut3, param03, value1, scrut4, param04, first2, first1, first0, kind, process, rest, doTemp2, acc, doTemp3, scrut5, tree1, param05, param12, name, doTemp4, doTemp5, scrut6, param06, keyword1, doTemp6, doTemp7, scrut7, doTemp8, doTemp9, doTemp10, scrut8, param07, value2, scrut9, param08, first21, first11, first01, kind1, process1, rest1, acc1, tree2, param09, rest2, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20, tmp21, tmp22, tmp23, tmp24, tmp25, tmp26, tmp27, tmp28, tmp29, tmp30, tmp31, tmp32, tmp33, tmp34, tmp35, tmp36, tmp37, tmp38, tmp39, tmp40, tmp41, tmp42, tmp43, tmp44, tmp45, tmp46, tmp47, tmp48, tmp49, tmp50, tmp51, tmp52, tmp53, tmp54, tmp55, tmp56, tmp57, tmp58, tmp59, tmp60, tmp61, tmp62, tmp63, tmp64, tmp65, tmp66, tmp67, tmp68, tmp69, tmp70, tmp71, tmp72, tmp73, tmp74, tmp75, tmp76, tmp77, tmp78, tmp79, tmp80, tmp81, tmp82, tmp83, tmp84, tmp85, tmp86, tmp87, tmp88, tmp89, tmp90, tmp91, tmp92, tmp93, tmp94, tmp95, tmp96, tmp97, tmp98, tmp99, tmp100, tmp101, tmp102, tmp103, tmp104, tmp105, tmp106, tmp107, tmp108, tmp109, tmp110, tmp111;
        tmp8 = yeetSpaces();
        scrut1 = tmp8;
        if (scrut1 instanceof Stack.Cons.class) {
          param02 = scrut1.head;
          param11 = scrut1.tail;
          if (param02 instanceof Token.Identifier.class) {
            param05 = param02.name;
            param12 = param02.symbolic;
            name = param05;
            tmp9 = "found an identifier \"" + name;
            tmp10 = tmp9 + "\"";
            doTemp4 = Parser.tracer.print(tmp10, 532);
            scrut6 = runtime.safeCall(allKeywords.get(name));
            if (scrut6 instanceof Option.Some.class) {
              param06 = scrut6.value;
              keyword1 = param06;
              tmp11 = runtime.safeCall(keyword1.toString());
              doTemp6 = Parser.tracer.print(tmp11, 534);
              tmp12 = (caseScrut) => {
                let first12, first02, k, v, tmp112;
                if (globalThis.Array.isArray(caseScrut) && caseScrut.length === 2) {
                  first02 = caseScrut[0];
                  first12 = caseScrut[1];
                  k = first02;
                  v = first12;
                  tmp112 = "`" + k;
                  return tmp112 + "`"
                } else {
                  throw new globalThis.Error("match error");
                }
              };
              tmp13 = Iter.mapping(rule.keywordChoices, tmp12);
              tmp14 = Iter.joined(tmp13, ", ");
              doTemp7 = Parser.tracer.print("keyword choices: ", tmp14);
              scrut7 = runtime.safeCall(rule.keywordChoices.get(name));
              if (scrut7 instanceof Option.Some.class) {
                param09 = scrut7.value;
                rest2 = param09;
                tmp15 = "found a rule starting with `" + name;
                tmp16 = tmp15 + "`";
                tmp17 = Parser.tracer.print(tmp16, 540);
                tmp18 = "the rest of the rule: " + rest2.display;
                tmp19 = Parser.tracer.print(tmp18, 541);
                tmp20 = consume();
                return parseRule(0, rest2, allKeywords)
              } else if (scrut7 instanceof Option.None.class) {
                tmp21 = "no rule starting with `" + name;
                tmp22 = tmp21 + "` was found";
                doTemp8 = Parser.tracer.print(tmp22, 545);
                tmp23 = "the left prec of `" + name;
                tmp24 = tmp23 + "` is ";
                tmp25 = tmp24 + keyword1.leftPrec;
                doTemp9 = Parser.tracer.print(tmp25, 546);
                scrut9 = rule.exprChoice;
                if (scrut9 instanceof Option.Some.class) {
                  param08 = scrut9.value;
                  if (globalThis.Array.isArray(param08) && param08.length === 3) {
                    first01 = param08[0];
                    first11 = param08[1];
                    first21 = param08[2];
                    kind1 = first01;
                    process1 = first11;
                    rest1 = first21;
                    tmp26 = Parser.tracer.print("found an expression choice", 548);
                    tmp27 = getParsingByKind(kind1);
                    tmp28 = runtime.safeCall(tmp27(prec));
                    acc1 = tmp28;
                    tmp29 = parseRule(prec, rest1, allKeywords);
                    tree2 = tmp29;
                    return runtime.safeCall(process1(acc1, tree2))
                  } else {
                    tmp30 = "no exprChoice or the prec is less than " + prec;
                    doTemp10 = Parser.tracer.print(tmp30, 552);
                    scrut8 = rule.endChoice;
                    if (scrut8 instanceof Option.Some.class) {
                      param07 = scrut8.value;
                      value2 = param07;
                      tmp31 = Parser.tracer.print("found end choice", 554);
                      return value2
                    } else {
                      tmp32 = consume();
                      tmp33 = "unexpected keyword " + keyword1.name;
                      return Tree.error(tmp33)
                    }
                  }
                } else {
                  tmp34 = "no exprChoice or the prec is less than " + prec;
                  doTemp10 = Parser.tracer.print(tmp34, 552);
                  scrut8 = rule.endChoice;
                  if (scrut8 instanceof Option.Some.class) {
                    param07 = scrut8.value;
                    value2 = param07;
                    tmp35 = Parser.tracer.print("found end choice", 554);
                    return value2
                  } else {
                    tmp36 = consume();
                    tmp37 = "unexpected keyword " + keyword1.name;
                    return Tree.error(tmp37)
                  }
                }
              } else {
                tmp38 = "\"" + name;
                tmp39 = tmp38 + "\" is not a keyword";
                doTemp5 = Parser.tracer.print(tmp39, 559);
                other = param02;
                scrut4 = rule.exprChoice;
                if (scrut4 instanceof Option.Some.class) {
                  param04 = scrut4.value;
                  if (globalThis.Array.isArray(param04) && param04.length === 3) {
                    first0 = param04[0];
                    first1 = param04[1];
                    first2 = param04[2];
                    kind = first0;
                    process = first1;
                    rest = first2;
                    tmp40 = "parse \"" + kind;
                    tmp41 = tmp40 + "\" kind from ";
                    tmp42 = TokenHelpers.preview(current);
                    tmp43 = tmp41 + tmp42;
                    doTemp2 = Parser.tracer.print(tmp43, 562);
                    tmp44 = getParsingByKind(kind);
                    acc = runtime.safeCall(tmp44(prec));
                    scrut5 = Tree.nonEmptyError(acc);
                    if (scrut5 === true) {
                      tmp45 = "the rest rule: " + rest.display;
                      tmp46 = Parser.tracer.print(tmp45, 565);
                      tmp47 = parseRule(prec, rest, allKeywords);
                      tree1 = tmp47;
                      tmp48 = Tree.summary(acc);
                      tmp49 = "acc: " + tmp48;
                      tmp50 = Parser.tracer.print(tmp49, 567);
                      tmp51 = Tree.summary(tree1);
                      tmp52 = "tree: " + tmp51;
                      tmp53 = Parser.tracer.print(tmp52, 568);
                      return runtime.safeCall(process(acc, tree1))
                    } else {
                      doTemp3 = Parser.tracer.print("fallback to end choice", 570);
                      doTemp = Parser.tracer.print("no expression choice", 571);
                      scrut3 = rule.endChoice;
                      if (scrut3 instanceof Option.Some.class) {
                        param03 = scrut3.value;
                        value1 = param03;
                        tmp54 = Parser.tracer.print("found end choice", 573);
                        return value1
                      } else {
                        doTemp1 = Parser.tracer.print("no end choice", 575);
                        tmp55 = consume();
                        tmp56 = "unexpected token " + other;
                        return Tree.error(tmp56)
                      }
                    }
                  } else {
                    doTemp = Parser.tracer.print("no expression choice", 571);
                    scrut3 = rule.endChoice;
                    if (scrut3 instanceof Option.Some.class) {
                      param03 = scrut3.value;
                      value1 = param03;
                      tmp57 = Parser.tracer.print("found end choice", 573);
                      return value1
                    } else {
                      doTemp1 = Parser.tracer.print("no end choice", 575);
                      tmp58 = consume();
                      tmp59 = "unexpected token " + other;
                      return Tree.error(tmp59)
                    }
                  }
                } else {
                  doTemp = Parser.tracer.print("no expression choice", 571);
                  scrut3 = rule.endChoice;
                  if (scrut3 instanceof Option.Some.class) {
                    param03 = scrut3.value;
                    value1 = param03;
                    tmp60 = Parser.tracer.print("found end choice", 573);
                    return value1
                  } else {
                    doTemp1 = Parser.tracer.print("no end choice", 575);
                    tmp61 = consume();
                    tmp62 = "unexpected token " + other;
                    return Tree.error(tmp62)
                  }
                }
              }
            } else {
              tmp63 = "\"" + name;
              tmp64 = tmp63 + "\" is not a keyword";
              doTemp5 = Parser.tracer.print(tmp64, 559);
              other = param02;
              scrut4 = rule.exprChoice;
              if (scrut4 instanceof Option.Some.class) {
                param04 = scrut4.value;
                if (globalThis.Array.isArray(param04) && param04.length === 3) {
                  first0 = param04[0];
                  first1 = param04[1];
                  first2 = param04[2];
                  kind = first0;
                  process = first1;
                  rest = first2;
                  tmp65 = "parse \"" + kind;
                  tmp66 = tmp65 + "\" kind from ";
                  tmp67 = TokenHelpers.preview(current);
                  tmp68 = tmp66 + tmp67;
                  doTemp2 = Parser.tracer.print(tmp68, 562);
                  tmp69 = getParsingByKind(kind);
                  acc = runtime.safeCall(tmp69(prec));
                  scrut5 = Tree.nonEmptyError(acc);
                  if (scrut5 === true) {
                    tmp70 = "the rest rule: " + rest.display;
                    tmp71 = Parser.tracer.print(tmp70, 565);
                    tmp72 = parseRule(prec, rest, allKeywords);
                    tree1 = tmp72;
                    tmp73 = Tree.summary(acc);
                    tmp74 = "acc: " + tmp73;
                    tmp75 = Parser.tracer.print(tmp74, 567);
                    tmp76 = Tree.summary(tree1);
                    tmp77 = "tree: " + tmp76;
                    tmp78 = Parser.tracer.print(tmp77, 568);
                    return runtime.safeCall(process(acc, tree1))
                  } else {
                    doTemp3 = Parser.tracer.print("fallback to end choice", 570);
                    doTemp = Parser.tracer.print("no expression choice", 571);
                    scrut3 = rule.endChoice;
                    if (scrut3 instanceof Option.Some.class) {
                      param03 = scrut3.value;
                      value1 = param03;
                      tmp79 = Parser.tracer.print("found end choice", 573);
                      return value1
                    } else {
                      doTemp1 = Parser.tracer.print("no end choice", 575);
                      tmp80 = consume();
                      tmp81 = "unexpected token " + other;
                      return Tree.error(tmp81)
                    }
                  }
                } else {
                  doTemp = Parser.tracer.print("no expression choice", 571);
                  scrut3 = rule.endChoice;
                  if (scrut3 instanceof Option.Some.class) {
                    param03 = scrut3.value;
                    value1 = param03;
                    tmp82 = Parser.tracer.print("found end choice", 573);
                    return value1
                  } else {
                    doTemp1 = Parser.tracer.print("no end choice", 575);
                    tmp83 = consume();
                    tmp84 = "unexpected token " + other;
                    return Tree.error(tmp84)
                  }
                }
              } else {
                doTemp = Parser.tracer.print("no expression choice", 571);
                scrut3 = rule.endChoice;
                if (scrut3 instanceof Option.Some.class) {
                  param03 = scrut3.value;
                  value1 = param03;
                  tmp85 = Parser.tracer.print("found end choice", 573);
                  return value1
                } else {
                  doTemp1 = Parser.tracer.print("no end choice", 575);
                  tmp86 = consume();
                  tmp87 = "unexpected token " + other;
                  return Tree.error(tmp87)
                }
              }
            }
          } else {
            other = param02;
            scrut4 = rule.exprChoice;
            if (scrut4 instanceof Option.Some.class) {
              param04 = scrut4.value;
              if (globalThis.Array.isArray(param04) && param04.length === 3) {
                first0 = param04[0];
                first1 = param04[1];
                first2 = param04[2];
                kind = first0;
                process = first1;
                rest = first2;
                tmp88 = "parse \"" + kind;
                tmp89 = tmp88 + "\" kind from ";
                tmp90 = TokenHelpers.preview(current);
                tmp91 = tmp89 + tmp90;
                doTemp2 = Parser.tracer.print(tmp91, 562);
                tmp92 = getParsingByKind(kind);
                acc = runtime.safeCall(tmp92(prec));
                scrut5 = Tree.nonEmptyError(acc);
                if (scrut5 === true) {
                  tmp93 = "the rest rule: " + rest.display;
                  tmp94 = Parser.tracer.print(tmp93, 565);
                  tmp95 = parseRule(prec, rest, allKeywords);
                  tree1 = tmp95;
                  tmp96 = Tree.summary(acc);
                  tmp97 = "acc: " + tmp96;
                  tmp98 = Parser.tracer.print(tmp97, 567);
                  tmp99 = Tree.summary(tree1);
                  tmp100 = "tree: " + tmp99;
                  tmp101 = Parser.tracer.print(tmp100, 568);
                  return runtime.safeCall(process(acc, tree1))
                } else {
                  doTemp3 = Parser.tracer.print("fallback to end choice", 570);
                  doTemp = Parser.tracer.print("no expression choice", 571);
                  scrut3 = rule.endChoice;
                  if (scrut3 instanceof Option.Some.class) {
                    param03 = scrut3.value;
                    value1 = param03;
                    tmp102 = Parser.tracer.print("found end choice", 573);
                    return value1
                  } else {
                    doTemp1 = Parser.tracer.print("no end choice", 575);
                    tmp103 = consume();
                    tmp104 = "unexpected token " + other;
                    return Tree.error(tmp104)
                  }
                }
              } else {
                doTemp = Parser.tracer.print("no expression choice", 571);
                scrut3 = rule.endChoice;
                if (scrut3 instanceof Option.Some.class) {
                  param03 = scrut3.value;
                  value1 = param03;
                  tmp105 = Parser.tracer.print("found end choice", 573);
                  return value1
                } else {
                  doTemp1 = Parser.tracer.print("no end choice", 575);
                  tmp106 = consume();
                  tmp107 = "unexpected token " + other;
                  return Tree.error(tmp107)
                }
              }
            } else {
              doTemp = Parser.tracer.print("no expression choice", 571);
              scrut3 = rule.endChoice;
              if (scrut3 instanceof Option.Some.class) {
                param03 = scrut3.value;
                value1 = param03;
                tmp108 = Parser.tracer.print("found end choice", 573);
                return value1
              } else {
                doTemp1 = Parser.tracer.print("no end choice", 575);
                tmp109 = consume();
                tmp110 = "unexpected token " + other;
                return Tree.error(tmp110)
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
            tmp111 = Parser.tracer.print("no end choice but found the end of input", 582);
            return Tree.error("unexpected end of input")
          } else {
            throw new globalThis.Error("match error");
          }
        } else {
          throw new globalThis.Error("match error");
        }
      };
      return runtime.safeCall(Parser.tracer.trace(tmp6, (result) => {
        let tmp8;
        tmp8 = Tree.summary(result);
        return "parsed: " + tmp8
      }, tmp7))
    };
    getParsingByKind = function getParsingByKind(kind) {
      let scrut1, param01, rule, tmp4, tmp5;
      if (kind === "type") {
        return typeExpr
      } else if (kind === "term") {
        return term
      } else {
        scrut1 = runtime.safeCall(Parser.categories.get(kind));
        if (scrut1 instanceof Option.Some.class) {
          param01 = scrut1.value;
          rule = param01;
          return (prec) => {
            return parseRule(prec, rule, Precedence.Keywords.all)
          }
        } else {
          tmp4 = "Unknown syntax category: \"" + kind;
          tmp5 = tmp4 + "\"";
          throw new globalThis.Error.class(tmp5);
        }
      }
    };
    term = function term(prec) {
      let tmp4, tmp5, tmp6, tmp7, tmp8;
      tmp4 = "term <<< " + prec;
      tmp5 = tmp4 + " ";
      tmp6 = TokenHelpers.preview(current);
      tmp7 = tmp5 + tmp6;
      tmp8 = () => {
        let scrut1, param01, param11, token1, param02, param12, kind, literal, param03, param13, name, symbolic, scrut2, param04, keyword1, scrut3, param05, rule, scrut4, acc, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20, tmp21, tmp22;
        tmp9 = yeetSpaces();
        scrut1 = tmp9;
        if (scrut1 instanceof Stack.Cons.class) {
          param01 = scrut1.head;
          param11 = scrut1.tail;
          if (param01 instanceof Token.Identifier.class) {
            param03 = param01.name;
            param13 = param01.symbolic;
            name = param03;
            symbolic = param13;
            scrut2 = runtime.safeCall(Precedence.Keywords.all.get(name));
            if (scrut2 instanceof Option.Some.class) {
              param04 = scrut2.value;
              keyword1 = param04;
              scrut3 = runtime.safeCall(Parser.termRule.keywordChoices.get(name));
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
                  tmp12 = "the left precedence is less" + name;
                  tmp13 = Parser.tracer.print(tmp12, 606);
                  return Tree.empty
                }
              } else if (scrut3 instanceof Option.None.class) {
                tmp14 = "no rule starting with " + name;
                tmp15 = Parser.tracer.print(tmp14, 609);
                return Tree.empty
              } else {
                token1 = param01;
                tmp16 = "unrecognized token: " + token1;
                return Tree.error(tmp16)
              }
            } else if (scrut2 instanceof Option.None.class) {
              tmp17 = consume();
              tmp18 = Tree.Ident(name, symbolic);
              return termCont(tmp18, prec)
            } else {
              token1 = param01;
              tmp19 = "unrecognized token: " + token1;
              return Tree.error(tmp19)
            }
          } else if (param01 instanceof Token.Literal.class) {
            param02 = param01.kind;
            param12 = param01.literal;
            kind = param02;
            literal = param12;
            tmp20 = consume();
            tmp21 = Tree.Literal(kind, literal);
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
      let scrut1, doTemp, param01, param11, token1, scrut2, scrut3, rhs, param02, param12, name, scrut4, doTemp1, scrut5, first1, first0, leftPrec, rightPrec, doTemp2, scrut6, op, rhs1, name1, scrut7, param03, keyword1, doTemp3, doTemp4, scrut8, param04, rule, doTemp5, scrut9, scrut10, param05, first2, first11, first01, kind, process, rest, rhs2, acc$_, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20, tmp21, tmp22, tmp23, tmp24, tmp25, tmp26, tmp27, tmp28, tmp29, tmp30, tmp31, tmp32, tmp33, tmp34, tmp35, tmp36, tmp37, tmp38, tmp39, tmp40, tmp41, tmp42, tmp43, tmp44, tmp45, tmp46, tmp47, tmp48, tmp49, tmp50, tmp51, tmp52, tmp53, tmp54, tmp55, tmp56, tmp57, tmp58, tmp59, tmp60, tmp61, tmp62, tmp63, tmp64, tmp65, tmp66, tmp67, tmp68, tmp69, tmp70, tmp71, tmp72, tmp73, tmp74, tmp75, tmp76, tmp77, tmp78, tmp79, tmp80, tmp81, tmp82, tmp83, tmp84, tmp85, tmp86, tmp87, tmp88, tmp89, tmp90, tmp91, tmp92, tmp93, tmp94, tmp95, tmp96, tmp97, tmp98, tmp99, tmp100, tmp101, tmp102, tmp103, tmp104, tmp105, tmp106, tmp107, tmp108, tmp109, tmp110, tmp111, tmp112, tmp113, tmp114, tmp115, tmp116, tmp117, tmp118, tmp119, tmp120, tmp121, tmp122, tmp123, tmp124, tmp125, tmp126, tmp127, tmp128, tmp129, tmp130, tmp131, tmp132, tmp133, tmp134, tmp135, tmp136, tmp137, tmp138, tmp139, tmp140, tmp141, tmp142, tmp143, tmp144, tmp145, tmp146, tmp147, tmp148, tmp149, tmp150, tmp151, tmp152, tmp153, tmp154, tmp155, tmp156, tmp157, tmp158, tmp159;
      tmp4 = yeetSpaces();
      scrut1 = tmp4;
      tmp5 = ">>> termCont " + prec;
      tmp6 = tmp5 + " ";
      tmp7 = Tree.summary(acc);
      tmp8 = tmp6 + tmp7;
      tmp9 = tmp8 + " <<<";
      doTemp = Parser.tracer.print(tmp9, 621);
      if (scrut1 instanceof Stack.Cons.class) {
        param01 = scrut1.head;
        param11 = scrut1.tail;
        if (param01 instanceof Token.Identifier.class) {
          param02 = param01.name;
          param12 = param01.symbolic;
          name1 = param02;
          scrut7 = runtime.safeCall(Precedence.Keywords.all.get(name1));
          if (scrut7 instanceof Option.Some.class) {
            param03 = scrut7.value;
            keyword1 = param03;
            tmp10 = "found a keyword: " + name1;
            doTemp3 = Parser.tracer.print(tmp10, 624);
            scrut8 = runtime.safeCall(Parser.termInfixRule.keywordChoices.get(name1));
            if (scrut8 instanceof Option.Some.class) {
              param04 = scrut8.value;
              rule = param04;
              tmp11 = "the keyword is found in infix rules" + name1;
              doTemp5 = Parser.tracer.print(tmp11, 628);
              scrut9 = keyword1.leftPrecOrMin > prec;
              if (scrut9 === true) {
                scrut10 = rule.exprChoice;
                if (scrut10 instanceof Option.Some.class) {
                  param05 = scrut10.value;
                  if (globalThis.Array.isArray(param05) && param05.length === 3) {
                    first01 = param05[0];
                    first11 = param05[1];
                    first2 = param05[2];
                    kind = first01;
                    process = first11;
                    rest = first2;
                    tmp12 = consume();
                    tmp13 = getParsingByKind(kind);
                    tmp14 = runtime.safeCall(tmp13(keyword1.rightPrecOrMin));
                    rhs2 = tmp14;
                    tmp15 = runtime.safeCall(process(rhs2));
                    tmp16 = runtime.safeCall(tmp15(acc));
                    acc$_ = tmp16;
                    return termCont(acc$_, prec)
                  } else {
                    tmp17 = "keyword `" + name1;
                    tmp18 = tmp17 + "` does not have infix rules";
                    doTemp4 = Parser.tracer.print(tmp18, 636);
                    name = param02;
                    if (param12 === true) {
                      scrut4 = runtime.safeCall(Precedence.Keywords.all.get(name));
                      if (scrut4 instanceof Option.None.class) {
                        tmp19 = "found an operator \"" + name;
                        tmp20 = tmp19 + "\"";
                        doTemp1 = Parser.tracer.print(tmp20, 638);
                        scrut5 = Precedence.opPrec(name);
                        if (globalThis.Array.isArray(scrut5) && scrut5.length === 2) {
                          first0 = scrut5[0];
                          first1 = scrut5[1];
                          leftPrec = first0;
                          rightPrec = first1;
                          tmp21 = "leftPrec = " + leftPrec;
                          tmp22 = tmp21 + "; rightPrec = ";
                          tmp23 = tmp22 + rightPrec;
                          doTemp2 = Parser.tracer.print(tmp23, 640);
                          scrut6 = leftPrec > prec;
                          if (scrut6 === true) {
                            tmp24 = consume();
                            tmp25 = Tree.Ident(name, true);
                            op = tmp25;
                            tmp26 = term(rightPrec);
                            rhs1 = tmp26;
                            tmp27 = Stack.Cons(rhs1, Stack.Nil);
                            tmp28 = Stack.Cons(acc, tmp27);
                            tmp29 = Tree.App(op, tmp28);
                            return termCont(tmp29, prec)
                          } else {
                            return acc
                          }
                        } else {
                          token1 = param01;
                          scrut2 = Precedence.Keywords.appPrec > prec;
                          if (scrut2 === true) {
                            tmp30 = Parser.tracer.print("found an application", 650);
                            scrut3 = term(Precedence.Keywords.appPrec);
                            if (scrut3 instanceof Tree.Empty.class) {
                              return acc
                            } else if (scrut3 instanceof Tree.Error.class) {
                              return acc
                            } else {
                              rhs = scrut3;
                              tmp31 = Stack.Cons(rhs, Stack.Nil);
                              tmp32 = Tree.App(acc, tmp31);
                              return termCont(tmp32, prec)
                            }
                          } else {
                            tmp33 = "cannot consume " + token1;
                            tmp34 = Parser.tracer.print(tmp33, 656);
                            return acc
                          }
                        }
                      } else {
                        token1 = param01;
                        scrut2 = Precedence.Keywords.appPrec > prec;
                        if (scrut2 === true) {
                          tmp35 = Parser.tracer.print("found an application", 650);
                          scrut3 = term(Precedence.Keywords.appPrec);
                          if (scrut3 instanceof Tree.Empty.class) {
                            return acc
                          } else if (scrut3 instanceof Tree.Error.class) {
                            return acc
                          } else {
                            rhs = scrut3;
                            tmp36 = Stack.Cons(rhs, Stack.Nil);
                            tmp37 = Tree.App(acc, tmp36);
                            return termCont(tmp37, prec)
                          }
                        } else {
                          tmp38 = "cannot consume " + token1;
                          tmp39 = Parser.tracer.print(tmp38, 656);
                          return acc
                        }
                      }
                    } else {
                      token1 = param01;
                      scrut2 = Precedence.Keywords.appPrec > prec;
                      if (scrut2 === true) {
                        tmp40 = Parser.tracer.print("found an application", 650);
                        scrut3 = term(Precedence.Keywords.appPrec);
                        if (scrut3 instanceof Tree.Empty.class) {
                          return acc
                        } else if (scrut3 instanceof Tree.Error.class) {
                          return acc
                        } else {
                          rhs = scrut3;
                          tmp41 = Stack.Cons(rhs, Stack.Nil);
                          tmp42 = Tree.App(acc, tmp41);
                          return termCont(tmp42, prec)
                        }
                      } else {
                        tmp43 = "cannot consume " + token1;
                        tmp44 = Parser.tracer.print(tmp43, 656);
                        return acc
                      }
                    }
                  }
                } else if (scrut10 instanceof Option.None.class) {
                  return acc
                } else {
                  tmp45 = "keyword `" + name1;
                  tmp46 = tmp45 + "` does not have infix rules";
                  doTemp4 = Parser.tracer.print(tmp46, 636);
                  name = param02;
                  if (param12 === true) {
                    scrut4 = runtime.safeCall(Precedence.Keywords.all.get(name));
                    if (scrut4 instanceof Option.None.class) {
                      tmp47 = "found an operator \"" + name;
                      tmp48 = tmp47 + "\"";
                      doTemp1 = Parser.tracer.print(tmp48, 638);
                      scrut5 = Precedence.opPrec(name);
                      if (globalThis.Array.isArray(scrut5) && scrut5.length === 2) {
                        first0 = scrut5[0];
                        first1 = scrut5[1];
                        leftPrec = first0;
                        rightPrec = first1;
                        tmp49 = "leftPrec = " + leftPrec;
                        tmp50 = tmp49 + "; rightPrec = ";
                        tmp51 = tmp50 + rightPrec;
                        doTemp2 = Parser.tracer.print(tmp51, 640);
                        scrut6 = leftPrec > prec;
                        if (scrut6 === true) {
                          tmp52 = consume();
                          tmp53 = Tree.Ident(name, true);
                          op = tmp53;
                          tmp54 = term(rightPrec);
                          rhs1 = tmp54;
                          tmp55 = Stack.Cons(rhs1, Stack.Nil);
                          tmp56 = Stack.Cons(acc, tmp55);
                          tmp57 = Tree.App(op, tmp56);
                          return termCont(tmp57, prec)
                        } else {
                          return acc
                        }
                      } else {
                        token1 = param01;
                        scrut2 = Precedence.Keywords.appPrec > prec;
                        if (scrut2 === true) {
                          tmp58 = Parser.tracer.print("found an application", 650);
                          scrut3 = term(Precedence.Keywords.appPrec);
                          if (scrut3 instanceof Tree.Empty.class) {
                            return acc
                          } else if (scrut3 instanceof Tree.Error.class) {
                            return acc
                          } else {
                            rhs = scrut3;
                            tmp59 = Stack.Cons(rhs, Stack.Nil);
                            tmp60 = Tree.App(acc, tmp59);
                            return termCont(tmp60, prec)
                          }
                        } else {
                          tmp61 = "cannot consume " + token1;
                          tmp62 = Parser.tracer.print(tmp61, 656);
                          return acc
                        }
                      }
                    } else {
                      token1 = param01;
                      scrut2 = Precedence.Keywords.appPrec > prec;
                      if (scrut2 === true) {
                        tmp63 = Parser.tracer.print("found an application", 650);
                        scrut3 = term(Precedence.Keywords.appPrec);
                        if (scrut3 instanceof Tree.Empty.class) {
                          return acc
                        } else if (scrut3 instanceof Tree.Error.class) {
                          return acc
                        } else {
                          rhs = scrut3;
                          tmp64 = Stack.Cons(rhs, Stack.Nil);
                          tmp65 = Tree.App(acc, tmp64);
                          return termCont(tmp65, prec)
                        }
                      } else {
                        tmp66 = "cannot consume " + token1;
                        tmp67 = Parser.tracer.print(tmp66, 656);
                        return acc
                      }
                    }
                  } else {
                    token1 = param01;
                    scrut2 = Precedence.Keywords.appPrec > prec;
                    if (scrut2 === true) {
                      tmp68 = Parser.tracer.print("found an application", 650);
                      scrut3 = term(Precedence.Keywords.appPrec);
                      if (scrut3 instanceof Tree.Empty.class) {
                        return acc
                      } else if (scrut3 instanceof Tree.Error.class) {
                        return acc
                      } else {
                        rhs = scrut3;
                        tmp69 = Stack.Cons(rhs, Stack.Nil);
                        tmp70 = Tree.App(acc, tmp69);
                        return termCont(tmp70, prec)
                      }
                    } else {
                      tmp71 = "cannot consume " + token1;
                      tmp72 = Parser.tracer.print(tmp71, 656);
                      return acc
                    }
                  }
                }
              } else {
                tmp73 = "keyword `" + name1;
                tmp74 = tmp73 + "` does not have infix rules";
                doTemp4 = Parser.tracer.print(tmp74, 636);
                name = param02;
                if (param12 === true) {
                  scrut4 = runtime.safeCall(Precedence.Keywords.all.get(name));
                  if (scrut4 instanceof Option.None.class) {
                    tmp75 = "found an operator \"" + name;
                    tmp76 = tmp75 + "\"";
                    doTemp1 = Parser.tracer.print(tmp76, 638);
                    scrut5 = Precedence.opPrec(name);
                    if (globalThis.Array.isArray(scrut5) && scrut5.length === 2) {
                      first0 = scrut5[0];
                      first1 = scrut5[1];
                      leftPrec = first0;
                      rightPrec = first1;
                      tmp77 = "leftPrec = " + leftPrec;
                      tmp78 = tmp77 + "; rightPrec = ";
                      tmp79 = tmp78 + rightPrec;
                      doTemp2 = Parser.tracer.print(tmp79, 640);
                      scrut6 = leftPrec > prec;
                      if (scrut6 === true) {
                        tmp80 = consume();
                        tmp81 = Tree.Ident(name, true);
                        op = tmp81;
                        tmp82 = term(rightPrec);
                        rhs1 = tmp82;
                        tmp83 = Stack.Cons(rhs1, Stack.Nil);
                        tmp84 = Stack.Cons(acc, tmp83);
                        tmp85 = Tree.App(op, tmp84);
                        return termCont(tmp85, prec)
                      } else {
                        return acc
                      }
                    } else {
                      token1 = param01;
                      scrut2 = Precedence.Keywords.appPrec > prec;
                      if (scrut2 === true) {
                        tmp86 = Parser.tracer.print("found an application", 650);
                        scrut3 = term(Precedence.Keywords.appPrec);
                        if (scrut3 instanceof Tree.Empty.class) {
                          return acc
                        } else if (scrut3 instanceof Tree.Error.class) {
                          return acc
                        } else {
                          rhs = scrut3;
                          tmp87 = Stack.Cons(rhs, Stack.Nil);
                          tmp88 = Tree.App(acc, tmp87);
                          return termCont(tmp88, prec)
                        }
                      } else {
                        tmp89 = "cannot consume " + token1;
                        tmp90 = Parser.tracer.print(tmp89, 656);
                        return acc
                      }
                    }
                  } else {
                    token1 = param01;
                    scrut2 = Precedence.Keywords.appPrec > prec;
                    if (scrut2 === true) {
                      tmp91 = Parser.tracer.print("found an application", 650);
                      scrut3 = term(Precedence.Keywords.appPrec);
                      if (scrut3 instanceof Tree.Empty.class) {
                        return acc
                      } else if (scrut3 instanceof Tree.Error.class) {
                        return acc
                      } else {
                        rhs = scrut3;
                        tmp92 = Stack.Cons(rhs, Stack.Nil);
                        tmp93 = Tree.App(acc, tmp92);
                        return termCont(tmp93, prec)
                      }
                    } else {
                      tmp94 = "cannot consume " + token1;
                      tmp95 = Parser.tracer.print(tmp94, 656);
                      return acc
                    }
                  }
                } else {
                  token1 = param01;
                  scrut2 = Precedence.Keywords.appPrec > prec;
                  if (scrut2 === true) {
                    tmp96 = Parser.tracer.print("found an application", 650);
                    scrut3 = term(Precedence.Keywords.appPrec);
                    if (scrut3 instanceof Tree.Empty.class) {
                      return acc
                    } else if (scrut3 instanceof Tree.Error.class) {
                      return acc
                    } else {
                      rhs = scrut3;
                      tmp97 = Stack.Cons(rhs, Stack.Nil);
                      tmp98 = Tree.App(acc, tmp97);
                      return termCont(tmp98, prec)
                    }
                  } else {
                    tmp99 = "cannot consume " + token1;
                    tmp100 = Parser.tracer.print(tmp99, 656);
                    return acc
                  }
                }
              }
            } else {
              tmp101 = "keyword `" + name1;
              tmp102 = tmp101 + "` does not have infix rules";
              doTemp4 = Parser.tracer.print(tmp102, 636);
              name = param02;
              if (param12 === true) {
                scrut4 = runtime.safeCall(Precedence.Keywords.all.get(name));
                if (scrut4 instanceof Option.None.class) {
                  tmp103 = "found an operator \"" + name;
                  tmp104 = tmp103 + "\"";
                  doTemp1 = Parser.tracer.print(tmp104, 638);
                  scrut5 = Precedence.opPrec(name);
                  if (globalThis.Array.isArray(scrut5) && scrut5.length === 2) {
                    first0 = scrut5[0];
                    first1 = scrut5[1];
                    leftPrec = first0;
                    rightPrec = first1;
                    tmp105 = "leftPrec = " + leftPrec;
                    tmp106 = tmp105 + "; rightPrec = ";
                    tmp107 = tmp106 + rightPrec;
                    doTemp2 = Parser.tracer.print(tmp107, 640);
                    scrut6 = leftPrec > prec;
                    if (scrut6 === true) {
                      tmp108 = consume();
                      tmp109 = Tree.Ident(name, true);
                      op = tmp109;
                      tmp110 = term(rightPrec);
                      rhs1 = tmp110;
                      tmp111 = Stack.Cons(rhs1, Stack.Nil);
                      tmp112 = Stack.Cons(acc, tmp111);
                      tmp113 = Tree.App(op, tmp112);
                      return termCont(tmp113, prec)
                    } else {
                      return acc
                    }
                  } else {
                    token1 = param01;
                    scrut2 = Precedence.Keywords.appPrec > prec;
                    if (scrut2 === true) {
                      tmp114 = Parser.tracer.print("found an application", 650);
                      scrut3 = term(Precedence.Keywords.appPrec);
                      if (scrut3 instanceof Tree.Empty.class) {
                        return acc
                      } else if (scrut3 instanceof Tree.Error.class) {
                        return acc
                      } else {
                        rhs = scrut3;
                        tmp115 = Stack.Cons(rhs, Stack.Nil);
                        tmp116 = Tree.App(acc, tmp115);
                        return termCont(tmp116, prec)
                      }
                    } else {
                      tmp117 = "cannot consume " + token1;
                      tmp118 = Parser.tracer.print(tmp117, 656);
                      return acc
                    }
                  }
                } else {
                  token1 = param01;
                  scrut2 = Precedence.Keywords.appPrec > prec;
                  if (scrut2 === true) {
                    tmp119 = Parser.tracer.print("found an application", 650);
                    scrut3 = term(Precedence.Keywords.appPrec);
                    if (scrut3 instanceof Tree.Empty.class) {
                      return acc
                    } else if (scrut3 instanceof Tree.Error.class) {
                      return acc
                    } else {
                      rhs = scrut3;
                      tmp120 = Stack.Cons(rhs, Stack.Nil);
                      tmp121 = Tree.App(acc, tmp120);
                      return termCont(tmp121, prec)
                    }
                  } else {
                    tmp122 = "cannot consume " + token1;
                    tmp123 = Parser.tracer.print(tmp122, 656);
                    return acc
                  }
                }
              } else {
                token1 = param01;
                scrut2 = Precedence.Keywords.appPrec > prec;
                if (scrut2 === true) {
                  tmp124 = Parser.tracer.print("found an application", 650);
                  scrut3 = term(Precedence.Keywords.appPrec);
                  if (scrut3 instanceof Tree.Empty.class) {
                    return acc
                  } else if (scrut3 instanceof Tree.Error.class) {
                    return acc
                  } else {
                    rhs = scrut3;
                    tmp125 = Stack.Cons(rhs, Stack.Nil);
                    tmp126 = Tree.App(acc, tmp125);
                    return termCont(tmp126, prec)
                  }
                } else {
                  tmp127 = "cannot consume " + token1;
                  tmp128 = Parser.tracer.print(tmp127, 656);
                  return acc
                }
              }
            }
          } else {
            name = param02;
            if (param12 === true) {
              scrut4 = runtime.safeCall(Precedence.Keywords.all.get(name));
              if (scrut4 instanceof Option.None.class) {
                tmp129 = "found an operator \"" + name;
                tmp130 = tmp129 + "\"";
                doTemp1 = Parser.tracer.print(tmp130, 638);
                scrut5 = Precedence.opPrec(name);
                if (globalThis.Array.isArray(scrut5) && scrut5.length === 2) {
                  first0 = scrut5[0];
                  first1 = scrut5[1];
                  leftPrec = first0;
                  rightPrec = first1;
                  tmp131 = "leftPrec = " + leftPrec;
                  tmp132 = tmp131 + "; rightPrec = ";
                  tmp133 = tmp132 + rightPrec;
                  doTemp2 = Parser.tracer.print(tmp133, 640);
                  scrut6 = leftPrec > prec;
                  if (scrut6 === true) {
                    tmp134 = consume();
                    tmp135 = Tree.Ident(name, true);
                    op = tmp135;
                    tmp136 = term(rightPrec);
                    rhs1 = tmp136;
                    tmp137 = Stack.Cons(rhs1, Stack.Nil);
                    tmp138 = Stack.Cons(acc, tmp137);
                    tmp139 = Tree.App(op, tmp138);
                    return termCont(tmp139, prec)
                  } else {
                    return acc
                  }
                } else {
                  token1 = param01;
                  scrut2 = Precedence.Keywords.appPrec > prec;
                  if (scrut2 === true) {
                    tmp140 = Parser.tracer.print("found an application", 650);
                    scrut3 = term(Precedence.Keywords.appPrec);
                    if (scrut3 instanceof Tree.Empty.class) {
                      return acc
                    } else if (scrut3 instanceof Tree.Error.class) {
                      return acc
                    } else {
                      rhs = scrut3;
                      tmp141 = Stack.Cons(rhs, Stack.Nil);
                      tmp142 = Tree.App(acc, tmp141);
                      return termCont(tmp142, prec)
                    }
                  } else {
                    tmp143 = "cannot consume " + token1;
                    tmp144 = Parser.tracer.print(tmp143, 656);
                    return acc
                  }
                }
              } else {
                token1 = param01;
                scrut2 = Precedence.Keywords.appPrec > prec;
                if (scrut2 === true) {
                  tmp145 = Parser.tracer.print("found an application", 650);
                  scrut3 = term(Precedence.Keywords.appPrec);
                  if (scrut3 instanceof Tree.Empty.class) {
                    return acc
                  } else if (scrut3 instanceof Tree.Error.class) {
                    return acc
                  } else {
                    rhs = scrut3;
                    tmp146 = Stack.Cons(rhs, Stack.Nil);
                    tmp147 = Tree.App(acc, tmp146);
                    return termCont(tmp147, prec)
                  }
                } else {
                  tmp148 = "cannot consume " + token1;
                  tmp149 = Parser.tracer.print(tmp148, 656);
                  return acc
                }
              }
            } else {
              token1 = param01;
              scrut2 = Precedence.Keywords.appPrec > prec;
              if (scrut2 === true) {
                tmp150 = Parser.tracer.print("found an application", 650);
                scrut3 = term(Precedence.Keywords.appPrec);
                if (scrut3 instanceof Tree.Empty.class) {
                  return acc
                } else if (scrut3 instanceof Tree.Error.class) {
                  return acc
                } else {
                  rhs = scrut3;
                  tmp151 = Stack.Cons(rhs, Stack.Nil);
                  tmp152 = Tree.App(acc, tmp151);
                  return termCont(tmp152, prec)
                }
              } else {
                tmp153 = "cannot consume " + token1;
                tmp154 = Parser.tracer.print(tmp153, 656);
                return acc
              }
            }
          }
        } else {
          token1 = param01;
          scrut2 = Precedence.Keywords.appPrec > prec;
          if (scrut2 === true) {
            tmp155 = Parser.tracer.print("found an application", 650);
            scrut3 = term(Precedence.Keywords.appPrec);
            if (scrut3 instanceof Tree.Empty.class) {
              return acc
            } else if (scrut3 instanceof Tree.Error.class) {
              return acc
            } else {
              rhs = scrut3;
              tmp156 = Stack.Cons(rhs, Stack.Nil);
              tmp157 = Tree.App(acc, tmp156);
              return termCont(tmp157, prec)
            }
          } else {
            tmp158 = "cannot consume " + token1;
            tmp159 = Parser.tracer.print(tmp158, 656);
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
        let scrut1, param01, param11, token1, param02, param12, name, symbolic, scrut2, param03, keyword1, scrut3, param04, rule, scrut4, acc, param05, name1, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20, tmp21, tmp22, tmp23, tmp24, tmp25, tmp26;
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
              name = param02;
              symbolic = param12;
              scrut2 = runtime.safeCall(Precedence.TypeKeywords.all.get(name));
              if (scrut2 instanceof Option.Some.class) {
                param03 = scrut2.value;
                keyword1 = param03;
                scrut3 = runtime.safeCall(Parser.typeRule.keywordChoices.get(name));
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
                    tmp13 = "the left precedence is less" + name;
                    tmp14 = Parser.tracer.print(tmp13, 681);
                    return Tree.empty
                  }
                } else if (scrut3 instanceof Option.None.class) {
                  tmp15 = "no rule starting with " + name;
                  tmp16 = Parser.tracer.print(tmp15, 684);
                  return Tree.empty
                } else {
                  token1 = param01;
                  tmp17 = "unrecognized token: " + token1;
                  return Tree.error(tmp17)
                }
              } else if (scrut2 instanceof Option.None.class) {
                if (symbolic === true) {
                  tmp18 = consume();
                  tmp19 = "unexpected symbolic identifier: " + name;
                  return Tree.error(tmp19)
                } else {
                  tmp20 = consume();
                  tmp21 = Tree.Ident(name);
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
            name1 = param05;
            tmp23 = consume();
            tmp24 = "'" + name1;
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
      let scrut1, doTemp, doTemp1, param01, param11, token1, param02, param12, name, scrut2, scrut3, rhs, name1, scrut4, param03, keyword1, scrut5, param04, rule, doTemp2, doTemp3, scrut6, scrut7, param05, first2, first1, first0, kind, process, rest, rhs1, acc$_, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20, tmp21, tmp22, tmp23, tmp24, tmp25, tmp26, tmp27, tmp28, tmp29, tmp30, tmp31, tmp32, tmp33, tmp34, tmp35, tmp36, tmp37, tmp38, tmp39, tmp40, tmp41, tmp42, tmp43, tmp44, tmp45, tmp46, tmp47, tmp48, tmp49, tmp50, tmp51, tmp52, tmp53, tmp54, tmp55, tmp56, tmp57, tmp58, tmp59, tmp60, tmp61;
      tmp4 = ">>> typeExprCont " + prec;
      tmp5 = tmp4 + " ";
      tmp6 = Tree.summary(acc);
      tmp7 = tmp5 + tmp6;
      tmp8 = tmp7 + " <<<";
      tmp9 = Parser.tracer.print(tmp8, 697);
      tmp10 = yeetSpaces();
      scrut1 = tmp10;
      tmp11 = TokenHelpers.preview(current);
      tmp12 = "check keyword " + tmp11;
      doTemp = Parser.tracer.print(tmp12, 699);
      if (scrut1 instanceof Stack.Cons.class) {
        param01 = scrut1.head;
        param11 = scrut1.tail;
        if (param01 instanceof Token.Identifier.class) {
          param02 = param01.name;
          param12 = param01.symbolic;
          name1 = param02;
          scrut4 = runtime.safeCall(Precedence.TypeKeywords.all.get(name1));
          if (scrut4 instanceof Option.Some.class) {
            param03 = scrut4.value;
            keyword1 = param03;
            scrut5 = runtime.safeCall(Parser.typeInfixRule.keywordChoices.get(name1));
            if (scrut5 instanceof Option.Some.class) {
              param04 = scrut5.value;
              rule = param04;
              tmp13 = "the keyword is found in infix rules" + name1;
              doTemp2 = Parser.tracer.print(tmp13, 702);
              scrut6 = keyword1.leftPrecOrMin > prec;
              if (scrut6 === true) {
                scrut7 = rule.exprChoice;
                if (scrut7 instanceof Option.Some.class) {
                  param05 = scrut7.value;
                  if (globalThis.Array.isArray(param05) && param05.length === 3) {
                    first0 = param05[0];
                    first1 = param05[1];
                    first2 = param05[2];
                    kind = first0;
                    process = first1;
                    rest = first2;
                    tmp14 = consume();
                    tmp15 = getParsingByKind(kind);
                    tmp16 = runtime.safeCall(tmp15(keyword1.rightPrecOrMin));
                    rhs1 = tmp16;
                    tmp17 = runtime.safeCall(process(rhs1));
                    tmp18 = runtime.safeCall(tmp17(acc));
                    acc$_ = tmp18;
                    return typeExprCont(acc$_, prec)
                  } else {
                    tmp19 = "keyword `" + name1;
                    tmp20 = tmp19 + "` does not have infix rules";
                    doTemp3 = Parser.tracer.print(tmp20, 710);
                    doTemp1 = Parser.tracer.print("not a keyword", 721);
                    name = param02;
                    if (param12 === false) {
                      scrut2 = Precedence.TypeKeywords.appPrec > prec;
                      if (scrut2 === true) {
                        tmp21 = Parser.tracer.print("found an application", 724);
                        scrut3 = typeExpr(Precedence.TypeKeywords.appPrec);
                        if (scrut3 instanceof Tree.Empty.class) {
                          return acc
                        } else if (scrut3 instanceof Tree.Error.class) {
                          return acc
                        } else {
                          rhs = scrut3;
                          tmp22 = Stack.Cons(acc, Stack.Nil);
                          tmp23 = Tree.App(rhs, tmp22);
                          return typeExprCont(tmp23, prec)
                        }
                      } else {
                        token1 = param01;
                        tmp24 = "cannot consume " + token1;
                        tmp25 = Parser.tracer.print(tmp24, 730);
                        return acc
                      }
                    } else {
                      token1 = param01;
                      tmp26 = "cannot consume " + token1;
                      tmp27 = Parser.tracer.print(tmp26, 730);
                      return acc
                    }
                  }
                } else if (scrut7 instanceof Option.None.class) {
                  return acc
                } else {
                  tmp28 = "keyword `" + name1;
                  tmp29 = tmp28 + "` does not have infix rules";
                  doTemp3 = Parser.tracer.print(tmp29, 710);
                  doTemp1 = Parser.tracer.print("not a keyword", 721);
                  name = param02;
                  if (param12 === false) {
                    scrut2 = Precedence.TypeKeywords.appPrec > prec;
                    if (scrut2 === true) {
                      tmp30 = Parser.tracer.print("found an application", 724);
                      scrut3 = typeExpr(Precedence.TypeKeywords.appPrec);
                      if (scrut3 instanceof Tree.Empty.class) {
                        return acc
                      } else if (scrut3 instanceof Tree.Error.class) {
                        return acc
                      } else {
                        rhs = scrut3;
                        tmp31 = Stack.Cons(acc, Stack.Nil);
                        tmp32 = Tree.App(rhs, tmp31);
                        return typeExprCont(tmp32, prec)
                      }
                    } else {
                      token1 = param01;
                      tmp33 = "cannot consume " + token1;
                      tmp34 = Parser.tracer.print(tmp33, 730);
                      return acc
                    }
                  } else {
                    token1 = param01;
                    tmp35 = "cannot consume " + token1;
                    tmp36 = Parser.tracer.print(tmp35, 730);
                    return acc
                  }
                }
              } else {
                tmp37 = "keyword `" + name1;
                tmp38 = tmp37 + "` does not have infix rules";
                doTemp3 = Parser.tracer.print(tmp38, 710);
                doTemp1 = Parser.tracer.print("not a keyword", 721);
                name = param02;
                if (param12 === false) {
                  scrut2 = Precedence.TypeKeywords.appPrec > prec;
                  if (scrut2 === true) {
                    tmp39 = Parser.tracer.print("found an application", 724);
                    scrut3 = typeExpr(Precedence.TypeKeywords.appPrec);
                    if (scrut3 instanceof Tree.Empty.class) {
                      return acc
                    } else if (scrut3 instanceof Tree.Error.class) {
                      return acc
                    } else {
                      rhs = scrut3;
                      tmp40 = Stack.Cons(acc, Stack.Nil);
                      tmp41 = Tree.App(rhs, tmp40);
                      return typeExprCont(tmp41, prec)
                    }
                  } else {
                    token1 = param01;
                    tmp42 = "cannot consume " + token1;
                    tmp43 = Parser.tracer.print(tmp42, 730);
                    return acc
                  }
                } else {
                  token1 = param01;
                  tmp44 = "cannot consume " + token1;
                  tmp45 = Parser.tracer.print(tmp44, 730);
                  return acc
                }
              }
            } else {
              doTemp1 = Parser.tracer.print("not a keyword", 721);
              name = param02;
              if (param12 === false) {
                scrut2 = Precedence.TypeKeywords.appPrec > prec;
                if (scrut2 === true) {
                  tmp46 = Parser.tracer.print("found an application", 724);
                  scrut3 = typeExpr(Precedence.TypeKeywords.appPrec);
                  if (scrut3 instanceof Tree.Empty.class) {
                    return acc
                  } else if (scrut3 instanceof Tree.Error.class) {
                    return acc
                  } else {
                    rhs = scrut3;
                    tmp47 = Stack.Cons(acc, Stack.Nil);
                    tmp48 = Tree.App(rhs, tmp47);
                    return typeExprCont(tmp48, prec)
                  }
                } else {
                  token1 = param01;
                  tmp49 = "cannot consume " + token1;
                  tmp50 = Parser.tracer.print(tmp49, 730);
                  return acc
                }
              } else {
                token1 = param01;
                tmp51 = "cannot consume " + token1;
                tmp52 = Parser.tracer.print(tmp51, 730);
                return acc
              }
            }
          } else {
            doTemp1 = Parser.tracer.print("not a keyword", 721);
            name = param02;
            if (param12 === false) {
              scrut2 = Precedence.TypeKeywords.appPrec > prec;
              if (scrut2 === true) {
                tmp53 = Parser.tracer.print("found an application", 724);
                scrut3 = typeExpr(Precedence.TypeKeywords.appPrec);
                if (scrut3 instanceof Tree.Empty.class) {
                  return acc
                } else if (scrut3 instanceof Tree.Error.class) {
                  return acc
                } else {
                  rhs = scrut3;
                  tmp54 = Stack.Cons(acc, Stack.Nil);
                  tmp55 = Tree.App(rhs, tmp54);
                  return typeExprCont(tmp55, prec)
                }
              } else {
                token1 = param01;
                tmp56 = "cannot consume " + token1;
                tmp57 = Parser.tracer.print(tmp56, 730);
                return acc
              }
            } else {
              token1 = param01;
              tmp58 = "cannot consume " + token1;
              tmp59 = Parser.tracer.print(tmp58, 730);
              return acc
            }
          }
        } else {
          doTemp1 = Parser.tracer.print("not a keyword", 721);
          token1 = param01;
          tmp60 = "cannot consume " + token1;
          tmp61 = Parser.tracer.print(tmp60, 730);
          return acc
        }
      } else {
        doTemp1 = Parser.tracer.print("not a keyword", 721);
        if (scrut1 instanceof Stack.Nil.class) {
          return acc
        } else {
          throw new globalThis.Error("match error");
        }
      }
    };
    mod = function mod(acc) {
      let scrut1, doTemp, param01, param11, param02, param12, name, scrut2, param03, keyword1, scrut3, param04, rule, tree1, scrut4, param05, rule1, tree2, param06, param13, bindings, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20;
      tmp4 = yeetSpaces();
      scrut1 = tmp4;
      doTemp = Parser.tracer.print(">>>>>> mod <<<<<<", 735);
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
            name = param02;
            scrut2 = runtime.safeCall(Precedence.Keywords.all.get(name));
            if (scrut2 instanceof Option.Some.class) {
              param03 = scrut2.value;
              keyword1 = param03;
              scrut4 = runtime.safeCall(Parser.termRule.keywordChoices.get(name));
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
                scrut3 = runtime.safeCall(Parser.declRule.keywordChoices.get(name));
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
      doTemp = Parser.tracer.print(">>>>>> modCont <<<<<<", 756);
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
      tmp3 = Parser.tracer.print(message, 771);
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
