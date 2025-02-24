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
    let tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20, tmp21, tmp22, tmp23, tmp24, tmp25, tmp26, tmp27, tmp28, tmp29, tmp30, tmp31, tmp32;
    tmp = new TreeTracer.TreeTracer();
    this.tracer = tmp;
    tmp1 = Parser.letBinding(true);
    Parser.#letExpression = tmp1;
    tmp2 = Parser.letBinding(false);
    Parser.#letDefinition = tmp2;
    tmp3 = ParseRule.Choice.end(runtime.Unit);
    tmp4 = ParseRule.Choice.keyword(Precedence.Keywords._done, "while end", tmp3);
    tmp5 = ParseRule.Choice.expr((body, _) => {
      return body
    }, "while end", tmp4);
    tmp6 = ParseRule.Choice.keyword(Precedence.Keywords._do, "while body", tmp5);
    tmp7 = ParseRule.Choice.expr(Tree.While, "while body", tmp6);
    tmp8 = ParseRule.Choice.keyword(Precedence.Keywords._while, "while condition", tmp7);
    Parser.#whileTerm = tmp8;
    tmp9 = (lhs, rhs) => {
      let param0, tail, tmp33, tmp34, tmp35;
      if (rhs instanceof Tree.Tuple.class) {
        param0 = rhs.trees;
        tail = param0;
        tmp33 = Stack.Cons(lhs, tail);
        return Tree.Tuple(tmp33)
      } else {
        tmp34 = Stack.Cons(rhs, Stack.Nil);
        tmp35 = Stack.Cons(lhs, tmp34);
        return Tree.Tuple(tmp35)
      }
    };
    tmp10 = Parser.makeInfixChoice(Precedence.Keywords._comma, tmp9);
    tmp11 = (lhs, rhs) => {
      let param0, tail, tmp33, tmp34, tmp35;
      if (rhs instanceof Tree.Sequence.class) {
        param0 = rhs.trees;
        tail = param0;
        tmp33 = Stack.Cons(lhs, tail);
        return Tree.Sequence(tmp33)
      } else {
        tmp34 = Stack.Cons(rhs, Stack.Nil);
        tmp35 = Stack.Cons(lhs, tmp34);
        return Tree.Sequence(tmp35)
      }
    };
    tmp12 = Parser.makeInfixChoice(Precedence.Keywords._semicolon, tmp11);
    tmp13 = ParseRule.Choice.end(runtime.Unit);
    tmp14 = ParseRule.Choice.typeExpr((rhs, _) => {
      return (lhs) => {
        return Tree.Infix(Precedence.Keywords._colon, lhs, rhs)
      }
    }, "right-hand side type", tmp13);
    tmp15 = ParseRule.Choice.keyword(Precedence.Keywords._colon, "type ascription", tmp14);
    tmp16 = ParseRule.rule("infix rules for expressions", tmp10, tmp12, tmp15);
    this.exprInfixRules = tmp16;
    tmp17 = Parser.funChoice();
    tmp18 = Parser.matchWithChoice();
    tmp19 = Parser.matchFunctionChoice();
    tmp20 = Parser.ifThenElse();
    tmp21 = ParseRule.Choice.Expr(false, (lhs, compose) => {
      return runtime.safeCall(compose(lhs))
    }, Parser.exprInfixRules);
    tmp22 = ParseRule.rule("prefix rules for expressions", Parser.#letExpression, tmp17, tmp18, tmp19, tmp20, Parser.#whileTerm, Parser.forTerm, tmp21);
    this.exprRules = tmp22;
    tmp23 = (lhs, rhs) => {
      let param0, tail, tmp33, tmp34, tmp35;
      if (rhs instanceof Tree.Tuple.class) {
        param0 = rhs.trees;
        tail = param0;
        tmp33 = Stack.Cons(lhs, tail);
        return Tree.Tuple(tmp33)
      } else {
        tmp34 = Stack.Cons(rhs, Stack.Nil);
        tmp35 = Stack.Cons(lhs, tmp34);
        return Tree.Tuple(tmp35)
      }
    };
    tmp24 = Parser.makeTypeInfixChoice(Precedence.TypeKeywords._comma, tmp23);
    tmp25 = (lhs, rhs) => {
      let param0, tail, tmp33, tmp34, tmp35;
      if (rhs instanceof Tree.Sequence.class) {
        param0 = rhs.trees;
        tail = param0;
        tmp33 = Stack.Cons(lhs, tail);
        return Tree.Sequence(tmp33)
      } else {
        tmp34 = Stack.Cons(rhs, Stack.Nil);
        tmp35 = Stack.Cons(lhs, tmp34);
        return Tree.Sequence(tmp35)
      }
    };
    tmp26 = Parser.makeTypeInfixChoice(Precedence.TypeKeywords._semicolon, tmp25);
    tmp27 = ParseRule.rule("infix rules for types", tmp24, tmp26);
    this.typeInfixRules = tmp27;
    tmp28 = ParseRule.Choice.Expr(true, (lhs, compose) => {
      return runtime.safeCall(compose(lhs))
    }, Parser.typeInfixRules);
    tmp29 = ParseRule.rule("rules for types", tmp28);
    this.typeRules = tmp29;
    tmp30 = Parser.typeDefinition();
    tmp31 = Parser.exceptionDefinition();
    tmp32 = ParseRule.rule("prefix rules for module items", Parser.#letDefinition, tmp30, tmp31);
    this.moduleRules = tmp32;
  }
  static at(target, index) {
    return runtime.safeCall(target.at(index))
  } 
  static toStack(array) {
    let length, i, reserve, scrut, tmp, tmp1, tmp2, tmp3, tmp4;
    length = array.length;
    tmp = length - 1;
    i = tmp;
    reserve = Stack.Nil;
    tmp5: while (true) {
      scrut = i >= 0;
      if (scrut === true) {
        tmp1 = runtime.safeCall(array.at(i));
        tmp2 = Stack.Cons(tmp1, reserve);
        reserve = tmp2;
        tmp3 = i - 1;
        i = tmp3;
        tmp4 = runtime.Unit;
        continue tmp5;
      } else {
        tmp4 = runtime.Unit;
      }
      break;
    }
    return reserve
  } 
  static stack(...args) {
    return Parser.toStack(args)
  } 
  static mapJoin(stack, op, sep) {
    let buffer, param0, param1, head, tail, param01, param11, tmp, tmp1, tmp2, tmp3, tmp4;
    buffer = "";
    tmp5: while (true) {
      if (stack instanceof Stack.Cons.class) {
        param0 = stack.head;
        param1 = stack.tail;
        head = param0;
        tail = param1;
        tmp = runtime.safeCall(op(head));
        tmp1 = buffer + tmp;
        buffer = tmp1;
        if (tail instanceof Stack.Cons.class) {
          param01 = tail.head;
          param11 = tail.tail;
          tmp2 = buffer + sep;
          buffer = tmp2;
          tmp3 = runtime.Unit;
        } else {
          tmp3 = runtime.Unit;
        }
        stack = tail;
        tmp4 = runtime.Unit;
        continue tmp5;
      } else {
        tmp4 = runtime.Unit;
      }
      break;
    }
    return buffer
  } 
  static collectFirst(stack1, op1) {
    let lastResult, param0, param1, head, tail, doTemp, tmp, tmp1;
    lastResult = Option.None;
    tmp2: while (true) {
      if (stack1 instanceof Stack.Cons.class) {
        param0 = stack1.head;
        param1 = stack1.tail;
        head = param0;
        tail = param1;
        tmp = runtime.safeCall(op1(head));
        lastResult = tmp;
        doTemp = runtime.Unit;
        if (lastResult instanceof Option.None.class) {
          stack1 = tail;
          tmp1 = runtime.Unit;
          continue tmp2;
        } else {
          tmp1 = runtime.Unit;
        }
      } else {
        tmp1 = runtime.Unit;
      }
      break;
    }
    return lastResult
  } 
  static collectToArray(stack2, p) {
    let elements, param0, param1, head, tail, scrut, param01, value, tmp, tmp1;
    elements = [];
    tmp2: while (true) {
      if (stack2 instanceof Stack.Cons.class) {
        param0 = stack2.head;
        param1 = stack2.tail;
        head = param0;
        tail = param1;
        scrut = runtime.safeCall(p(head));
        if (scrut instanceof Option.Some.class) {
          param01 = scrut.value;
          value = param01;
          tmp = runtime.safeCall(elements.push(value));
        } else {
          tmp = runtime.Unit;
        }
        stack2 = tail;
        tmp1 = runtime.Unit;
        continue tmp2;
      } else {
        tmp1 = runtime.Unit;
      }
      break;
    }
    return elements
  } 
  static map(xs, op2) {
    let param0, param1, head, tail, result, current, rest, param01, param11, head1, tail1, next, tmp, tmp1, tmp2, tmp3, tmp4;
    if (xs instanceof Stack.Nil.class) {
      return Stack.Nil
    } else if (xs instanceof Stack.Cons.class) {
      param0 = xs.head;
      param1 = xs.tail;
      head = param0;
      tail = param1;
      tmp = runtime.safeCall(op2(head));
      tmp1 = Stack.Cons(tmp, Stack.Nil);
      result = tmp1;
      current = result;
      rest = tail;
      tmp5: while (true) {
        if (rest instanceof Stack.Cons.class) {
          param01 = rest.head;
          param11 = rest.tail;
          head1 = param01;
          tail1 = param11;
          tmp2 = runtime.safeCall(op2(head1));
          tmp3 = Stack.Cons(tmp2, Stack.Nil);
          next = tmp3;
          current.tail = next;
          current = next;
          rest = tail1;
          tmp4 = runtime.Unit;
          continue tmp5;
        } else {
          tmp4 = runtime.Unit;
        }
        break;
      }
      return result
    } else {
      throw new globalThis.Error("match error");
    }
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
      return ParseRule.Choice.expr(tmp12, tmp14, tmp16)
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
        tmp19 = ParseRule.Choice.expr((body, _) => {
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
      return ParseRule.Choice.expr((body, defLike) => {
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
    tmp1 = (tst, conAndAlt) => {
      let first1, first0, con, alt;
      if (globalThis.Array.isArray(conAndAlt) && conAndAlt.length === 2) {
        first0 = conAndAlt[0];
        first1 = conAndAlt[1];
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
    tmp5 = intro + "`else` keyword";
    tmp6 = intro + "alternative";
    tmp7 = ParseRule.Choice.end(Option.None);
    tmp8 = ParseRule.Choice.expr((alt, _) => {
      return Option.Some(alt)
    }, tmp6, tmp7);
    tmp9 = ParseRule.Choice.keyword(Precedence.Keywords._else, tmp5, tmp8);
    tmp10 = ParseRule.Choice.end(Option.None);
    tmp11 = ParseRule.Choice.expr((con, optAlt) => {
      return [
        con,
        optAlt
      ]
    }, tmp4, tmp9, tmp10);
    tmp12 = ParseRule.Choice.keyword(Precedence.Keywords._then, tmp3, tmp11);
    tmp13 = ParseRule.Choice.expr(tmp1, tmp2, tmp12);
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
    tmp5 = ParseRule.Choice.expr((body, _) => {
      return body
    }, tmp3, tmp4);
    tmp6 = ParseRule.Choice.keyword(Precedence.Keywords._thinArrow, tmp2, tmp5);
    tmp7 = ParseRule.Choice.expr((params, body) => {
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
      tmp17 = ParseRule.Choice.expr((curr, next) => {
        return [
          curr,
          next
        ]
      }, tmp12, tmp13, tmp16);
      tmp18 = ParseRule.Choice.keyword(Precedence.Keywords._thinArrow, tmp11, tmp17);
      return ParseRule.Choice.expr(tmp9, tmp10, tmp18)
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
    tmp3 = Parser.patternMatchingBody(intro1, (x, xs1) => {
      return Stack.Cons(x, xs1)
    }, Stack.Nil);
    tmp4 = ParseRule.Choice.keyword(Precedence.Keywords._with, tmp2, ...tmp3);
    tmp5 = ParseRule.Choice.expr((scrutinee, branches) => {
      return Tree.Match(scrutinee, branches)
    }, tmp1, tmp4);
    return ParseRule.Choice.keyword(Precedence.Keywords._match, tmp, tmp5)
  } 
  static matchFunctionChoice() {
    let intro1, tmp, tmp1, tmp2, tmp3;
    intro1 = "`function` definition: ";
    tmp = intro1 + "`function` keyword";
    tmp1 = (x, xs1) => {
      let param0, param1, scrut, arms, tmp4;
      if (xs1 instanceof Tree.Match.class) {
        param0 = xs1.scrutinee;
        param1 = xs1.branches;
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
    tmp5 = ParseRule.Choice.expr((body, _) => {
      return body
    }, tmp2, tmp4);
    tmp6 = ParseRule.Choice.keyword(Precedence.Keywords._do, tmp1, tmp5);
    tmp7 = ParseRule.Choice.expr((end, body) => {
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
    tmp16 = ParseRule.Choice.expr(tmp12, tmp13, tmp14, tmp15);
    tmp17 = ParseRule.Choice.keyword(Precedence.Keywords._equal, tmp11, tmp16);
    tmp18 = ParseRule.Choice.expr(tmp9, tmp10, tmp17);
    return ParseRule.Choice.keyword(Precedence.Keywords._for, tmp8, tmp18);
  } 
  static makeInfixChoice(keyword, compose) {
    let tmp, tmp1, tmp2, tmp3, tmp4, tmp5;
    tmp = "operator `" + keyword.name;
    tmp1 = tmp + "`";
    tmp2 = "operator `" + keyword.name;
    tmp3 = tmp2 + "` right-hand side";
    tmp4 = ParseRule.Choice.end(runtime.Unit);
    tmp5 = ParseRule.Choice.expr((rhs, _) => {
      return (lhs) => {
        return runtime.safeCall(compose(lhs, rhs))
      }
    }, tmp3, tmp4);
    return ParseRule.Choice.keyword(keyword, tmp1, tmp5)
  } 
  static makeTypeInfixChoice(keyword1, compose1) {
    let tmp, tmp1, tmp2, tmp3, tmp4, tmp5;
    tmp = "operator `" + keyword1.name;
    tmp1 = tmp + "`";
    tmp2 = "operator `" + keyword1.name;
    tmp3 = tmp2 + "` right-hand side";
    tmp4 = ParseRule.Choice.end(runtime.Unit);
    tmp5 = ParseRule.Choice.typeExpr((rhs, _) => {
      return (lhs) => {
        return runtime.safeCall(compose1(lhs, rhs))
      }
    }, tmp3, tmp4);
    return ParseRule.Choice.keyword(keyword1, tmp1, tmp5)
  } 
  static typeDefinition() {
    let makeTypedefsTail, typedefs, intro1, typedefsTail, tmp, tmp1, tmp2;
    typedefs = function typedefs(tail) {
      let tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10;
      tmp3 = (head, bodyAndDefine) => {
        let first1, first0, body, param0, param1, kind, typedefs1, tmp11;
        if (globalThis.Array.isArray(bodyAndDefine) && bodyAndDefine.length === 2) {
          first0 = bodyAndDefine[0];
          first1 = bodyAndDefine[1];
          body = first0;
          if (first1 instanceof Tree.Define.class) {
            param0 = first1.kind;
            param1 = first1.items;
            kind = param0;
            typedefs1 = param1;
            tmp11 = Stack.Cons([
              head,
              body
            ], typedefs1);
            return Tree.Define(kind, tmp11)
          } else {
            throw new globalThis.Error("match error");
          }
        } else {
          throw new globalThis.Error("match error");
        }
      };
      tmp4 = intro1 + "name";
      tmp5 = intro1 + "equal sign";
      tmp6 = intro1 + "body";
      tmp7 = Tree.Define(Tree.DefineKind.Type, Stack.Nil);
      tmp8 = ParseRule.Choice.end(tmp7);
      tmp9 = ParseRule.Choice.typeExpr((body, define) => {
        return [
          body,
          define
        ]
      }, tmp6, tmp8, tail);
      tmp10 = ParseRule.Choice.keyword(Precedence.Keywords._equal, tmp5, tmp9);
      return ParseRule.Choice.typeExpr(tmp3, tmp4, tmp10)
    };
    makeTypedefsTail = function makeTypedefsTail(get) {
      let tmp3, tmp4, tmp5;
      tmp3 = intro1 + "more typedefs";
      tmp4 = ParseRule.Choice.Lazy(get, makeTypedefsTail);
      tmp5 = typedefs(tmp4);
      return ParseRule.Choice.keyword(Precedence.Keywords._and, tmp3, tmp5)
    };
    intro1 = "type definition: ";
    tmp = ParseRule.Choice.lazy(makeTypedefsTail);
    typedefsTail = tmp;
    tmp1 = intro1 + "`type` keyword";
    tmp2 = typedefs(typedefsTail);
    return ParseRule.Choice.keyword(Precedence.Keywords._type, tmp1, tmp2)
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
    let require, bracketed, exprCont, typeExprCont, simpleExpr, parseRule, yeetSpaces, modCont, consume, closeBy, typeExpr, mod, current, counter, tree, scrut, param0, param1, token, message, tmp, tmp1, tmp2, tmp3;
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
    closeBy = function closeBy(acc, kind) {
      let scrut1, param01, param11, token1, param02, param12, param03, kind$_, scrut2, tmp4, tmp5, tmp6, tmp7, tmp8;
      tmp4 = yeetSpaces();
      scrut1 = tmp4;
      if (scrut1 instanceof Stack.Cons.class) {
        param01 = scrut1.head;
        param11 = scrut1.tail;
        if (param01 instanceof Token.Close.class) {
          param03 = param01.kind;
          kind$_ = param03;
          scrut2 = kind == kind$_;
          if (scrut2 === true) {
            tmp5 = consume();
            return acc
          } else {
            return Tree.error("Mismatched bracket")
          }
        } else if (param01 instanceof Token.Identifier.class) {
          param02 = param01.name;
          param12 = param01.symbolic;
          if (param02 === ">") {
            if (kind instanceof Token.Angle.class) {
              tmp6 = consume();
              return acc
            } else {
              return Tree.Error(acc, "Mismatched bracket")
            }
          } else {
            token1 = param01;
            tmp7 = "Expect a close bracket instead of " + token1;
            return Tree.Error(acc, tmp7)
          }
        } else {
          token1 = param01;
          tmp8 = "Expect a close bracket instead of " + token1;
          return Tree.Error(acc, tmp8)
        }
      } else if (scrut1 instanceof Stack.Nil.class) {
        return Tree.Error(acc, "Expected a close bracket, but found the end of input")
      } else {
        throw new globalThis.Error("match error");
      }
    };
    parseRule = function parseRule(prec, rule) {
      let tmp4, tmp5, tmp6, tmp7;
      tmp4 = "parsing rule \"" + rule.name;
      tmp5 = tmp4 + "\" with precedence ";
      tmp6 = tmp5 + prec;
      tmp7 = () => {
        let scrut1, scrut2, param01, value, param02, param11, other, doTemp, doTemp1, doTemp2, scrut3, param03, value1, scrut4, param04, first2, first1, first0, isType, process, rest, acc, doTemp3, scrut5, tree1, param05, param12, name, doTemp4, doTemp5, scrut6, param06, keyword2, doTemp6, doTemp7, scrut7, doTemp8, doTemp9, doTemp10, scrut8, param07, value2, scrut9, param08, first21, first11, first01, isType1, process1, rest1, scrut10, acc1, tree2, param09, rest2, param010, encountered, scrut11, param011, result, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20, tmp21, tmp22, tmp23, tmp24, tmp25, tmp26, tmp27, tmp28, tmp29, tmp30, tmp31, tmp32, tmp33, tmp34, tmp35, tmp36, tmp37, tmp38, tmp39, tmp40, tmp41, tmp42, tmp43, tmp44, tmp45, tmp46, tmp47, tmp48, tmp49, tmp50, tmp51, tmp52, tmp53, tmp54, tmp55, tmp56, tmp57, tmp58, tmp59, tmp60, tmp61, tmp62, tmp63, tmp64, tmp65, tmp66, tmp67, tmp68, tmp69, tmp70, tmp71, tmp72, tmp73, tmp74, tmp75, tmp76, tmp77, tmp78, tmp79, tmp80, tmp81, tmp82, tmp83, tmp84, tmp85, tmp86, tmp87, tmp88, tmp89, tmp90, tmp91, tmp92, tmp93;
        tmp8 = yeetSpaces();
        scrut1 = tmp8;
        if (scrut1 instanceof Stack.Cons.class) {
          param02 = scrut1.head;
          param11 = scrut1.tail;
          if (param02 instanceof Token.Close.class) {
            param010 = param02.kind;
            encountered = param010;
            scrut11 = rule.endChoice;
            if (scrut11 instanceof Option.Some.class) {
              param011 = scrut11.value;
              result = param011;
              return result
            } else if (scrut11 instanceof Option.None.class) {
              tmp9 = consume();
              tmp10 = "unexpected close bracket `" + encountered;
              tmp11 = tmp10 + "`";
              return Tree.error(tmp11)
            } else {
              other = param02;
              tmp12 = TokenHelpers.preview(current);
              tmp13 = "try parse an expression from " + tmp12;
              doTemp = Parser.tracer.print(tmp13, 515);
              scrut4 = rule.exprChoice;
              if (scrut4 instanceof Option.Some.class) {
                param04 = scrut4.value;
                if (globalThis.Array.isArray(param04) && param04.length === 3) {
                  first0 = param04[0];
                  first1 = param04[1];
                  first2 = param04[2];
                  isType = first0;
                  process = first1;
                  rest = first2;
                  if (isType === true) {
                    tmp14 = typeExpr;
                  } else {
                    tmp14 = simpleExpr;
                  }
                  acc = runtime.safeCall(tmp14(prec));
                  scrut5 = Tree.nonEmptyError(acc);
                  if (scrut5 === true) {
                    tmp15 = parseRule(prec, rest);
                    tree1 = tmp15;
                    tmp16 = Tree.summary(acc);
                    tmp17 = "acc: " + tmp16;
                    tmp18 = Parser.tracer.print(tmp17, 534);
                    tmp19 = Tree.summary(tree1);
                    tmp20 = "tree: " + tmp19;
                    tmp21 = Parser.tracer.print(tmp20, 535);
                    return runtime.safeCall(process(acc, tree1))
                  } else {
                    doTemp3 = Parser.tracer.print("fallback to end choice", 537);
                    doTemp1 = Parser.tracer.print("no expression choice", 538);
                    scrut3 = rule.endChoice;
                    if (scrut3 instanceof Option.Some.class) {
                      param03 = scrut3.value;
                      value1 = param03;
                      tmp22 = Parser.tracer.print("found end choice", 540);
                      return value1
                    } else {
                      doTemp2 = Parser.tracer.print("no end choice", 542);
                      throw new globalThis.Error("match error");
                    }
                  }
                } else {
                  doTemp1 = Parser.tracer.print("no expression choice", 538);
                  scrut3 = rule.endChoice;
                  if (scrut3 instanceof Option.Some.class) {
                    param03 = scrut3.value;
                    value1 = param03;
                    tmp23 = Parser.tracer.print("found end choice", 540);
                    return value1
                  } else {
                    doTemp2 = Parser.tracer.print("no end choice", 542);
                    throw new globalThis.Error("match error");
                  }
                }
              } else {
                doTemp1 = Parser.tracer.print("no expression choice", 538);
                scrut3 = rule.endChoice;
                if (scrut3 instanceof Option.Some.class) {
                  param03 = scrut3.value;
                  value1 = param03;
                  tmp24 = Parser.tracer.print("found end choice", 540);
                  return value1
                } else {
                  doTemp2 = Parser.tracer.print("no end choice", 542);
                  throw new globalThis.Error("match error");
                }
              }
            }
          } else if (param02 instanceof Token.Identifier.class) {
            param05 = param02.name;
            param12 = param02.symbolic;
            name = param05;
            tmp25 = "found an identifier \"" + name;
            tmp26 = tmp25 + "\"";
            doTemp4 = Parser.tracer.print(tmp26, 486);
            scrut6 = runtime.safeCall(Precedence.Keywords.all.get(name));
            if (scrut6 instanceof Option.Some.class) {
              param06 = scrut6.value;
              keyword2 = param06;
              tmp27 = runtime.safeCall(keyword2.toString());
              doTemp6 = Parser.tracer.print(tmp27, 488);
              tmp28 = (caseScrut) => {
                let first12, first02, k, v, tmp94;
                if (globalThis.Array.isArray(caseScrut) && caseScrut.length === 2) {
                  first02 = caseScrut[0];
                  first12 = caseScrut[1];
                  k = first02;
                  v = first12;
                  tmp94 = "`" + k;
                  return tmp94 + "`"
                } else {
                  throw new globalThis.Error("match error");
                }
              };
              tmp29 = Iter.mapping(rule.keywordChoices, tmp28);
              tmp30 = Iter.joined(tmp29, ", ");
              doTemp7 = Parser.tracer.print("keyword choices: ", tmp30);
              scrut7 = runtime.safeCall(rule.keywordChoices.get(name));
              if (scrut7 instanceof Option.Some.class) {
                param09 = scrut7.value;
                rest2 = param09;
                tmp31 = "found a rule starting with `" + name;
                tmp32 = tmp31 + "`";
                tmp33 = Parser.tracer.print(tmp32, 494);
                tmp34 = "the rest of the rule: " + rest2.display;
                tmp35 = Parser.tracer.print(tmp34, 495);
                tmp36 = consume();
                return parseRule(0, rest2)
              } else if (scrut7 instanceof Option.None.class) {
                tmp37 = "no rule starting with `" + name;
                tmp38 = tmp37 + "` was found";
                doTemp8 = Parser.tracer.print(tmp38, 500);
                tmp39 = "the left prec of `" + name;
                tmp40 = tmp39 + "` is ";
                tmp41 = tmp40 + keyword2.leftPrec;
                doTemp9 = Parser.tracer.print(tmp41, 501);
                scrut9 = rule.exprChoice;
                if (scrut9 instanceof Option.Some.class) {
                  param08 = scrut9.value;
                  if (globalThis.Array.isArray(param08) && param08.length === 3) {
                    first01 = param08[0];
                    first11 = param08[1];
                    first21 = param08[2];
                    isType1 = first01;
                    process1 = first11;
                    rest1 = first21;
                    scrut10 = true;
                    if (scrut10 === true) {
                      if (isType1 === true) {
                        tmp42 = typeExpr;
                      } else {
                        tmp42 = simpleExpr;
                      }
                      tmp43 = runtime.safeCall(tmp42(prec));
                      acc1 = tmp43;
                      tmp44 = parseRule(prec, rest1);
                      tree2 = tmp44;
                      return runtime.safeCall(process1(acc1, tree2))
                    } else {
                      tmp45 = "no exprChoice or the prec is less than " + prec;
                      doTemp10 = Parser.tracer.print(tmp45, 508);
                      scrut8 = rule.endChoice;
                      if (scrut8 instanceof Option.Some.class) {
                        param07 = scrut8.value;
                        value2 = param07;
                        tmp46 = Parser.tracer.print("found end choice", 510);
                        return value2
                      } else {
                        return Predef.notImplementedError
                      }
                    }
                  } else {
                    tmp47 = "no exprChoice or the prec is less than " + prec;
                    doTemp10 = Parser.tracer.print(tmp47, 508);
                    scrut8 = rule.endChoice;
                    if (scrut8 instanceof Option.Some.class) {
                      param07 = scrut8.value;
                      value2 = param07;
                      tmp48 = Parser.tracer.print("found end choice", 510);
                      return value2
                    } else {
                      return Predef.notImplementedError
                    }
                  }
                } else {
                  tmp49 = "no exprChoice or the prec is less than " + prec;
                  doTemp10 = Parser.tracer.print(tmp49, 508);
                  scrut8 = rule.endChoice;
                  if (scrut8 instanceof Option.Some.class) {
                    param07 = scrut8.value;
                    value2 = param07;
                    tmp50 = Parser.tracer.print("found end choice", 510);
                    return value2
                  } else {
                    return Predef.notImplementedError
                  }
                }
              } else {
                tmp51 = "\"" + name;
                tmp52 = tmp51 + "\" is not a keyword";
                doTemp5 = Parser.tracer.print(tmp52, 513);
                other = param02;
                tmp53 = TokenHelpers.preview(current);
                tmp54 = "try parse an expression from " + tmp53;
                doTemp = Parser.tracer.print(tmp54, 515);
                scrut4 = rule.exprChoice;
                if (scrut4 instanceof Option.Some.class) {
                  param04 = scrut4.value;
                  if (globalThis.Array.isArray(param04) && param04.length === 3) {
                    first0 = param04[0];
                    first1 = param04[1];
                    first2 = param04[2];
                    isType = first0;
                    process = first1;
                    rest = first2;
                    if (isType === true) {
                      tmp55 = typeExpr;
                    } else {
                      tmp55 = simpleExpr;
                    }
                    acc = runtime.safeCall(tmp55(prec));
                    scrut5 = Tree.nonEmptyError(acc);
                    if (scrut5 === true) {
                      tmp56 = parseRule(prec, rest);
                      tree1 = tmp56;
                      tmp57 = Tree.summary(acc);
                      tmp58 = "acc: " + tmp57;
                      tmp59 = Parser.tracer.print(tmp58, 534);
                      tmp60 = Tree.summary(tree1);
                      tmp61 = "tree: " + tmp60;
                      tmp62 = Parser.tracer.print(tmp61, 535);
                      return runtime.safeCall(process(acc, tree1))
                    } else {
                      doTemp3 = Parser.tracer.print("fallback to end choice", 537);
                      doTemp1 = Parser.tracer.print("no expression choice", 538);
                      scrut3 = rule.endChoice;
                      if (scrut3 instanceof Option.Some.class) {
                        param03 = scrut3.value;
                        value1 = param03;
                        tmp63 = Parser.tracer.print("found end choice", 540);
                        return value1
                      } else {
                        doTemp2 = Parser.tracer.print("no end choice", 542);
                        throw new globalThis.Error("match error");
                      }
                    }
                  } else {
                    doTemp1 = Parser.tracer.print("no expression choice", 538);
                    scrut3 = rule.endChoice;
                    if (scrut3 instanceof Option.Some.class) {
                      param03 = scrut3.value;
                      value1 = param03;
                      tmp64 = Parser.tracer.print("found end choice", 540);
                      return value1
                    } else {
                      doTemp2 = Parser.tracer.print("no end choice", 542);
                      throw new globalThis.Error("match error");
                    }
                  }
                } else {
                  doTemp1 = Parser.tracer.print("no expression choice", 538);
                  scrut3 = rule.endChoice;
                  if (scrut3 instanceof Option.Some.class) {
                    param03 = scrut3.value;
                    value1 = param03;
                    tmp65 = Parser.tracer.print("found end choice", 540);
                    return value1
                  } else {
                    doTemp2 = Parser.tracer.print("no end choice", 542);
                    throw new globalThis.Error("match error");
                  }
                }
              }
            } else {
              tmp66 = "\"" + name;
              tmp67 = tmp66 + "\" is not a keyword";
              doTemp5 = Parser.tracer.print(tmp67, 513);
              other = param02;
              tmp68 = TokenHelpers.preview(current);
              tmp69 = "try parse an expression from " + tmp68;
              doTemp = Parser.tracer.print(tmp69, 515);
              scrut4 = rule.exprChoice;
              if (scrut4 instanceof Option.Some.class) {
                param04 = scrut4.value;
                if (globalThis.Array.isArray(param04) && param04.length === 3) {
                  first0 = param04[0];
                  first1 = param04[1];
                  first2 = param04[2];
                  isType = first0;
                  process = first1;
                  rest = first2;
                  if (isType === true) {
                    tmp70 = typeExpr;
                  } else {
                    tmp70 = simpleExpr;
                  }
                  acc = runtime.safeCall(tmp70(prec));
                  scrut5 = Tree.nonEmptyError(acc);
                  if (scrut5 === true) {
                    tmp71 = parseRule(prec, rest);
                    tree1 = tmp71;
                    tmp72 = Tree.summary(acc);
                    tmp73 = "acc: " + tmp72;
                    tmp74 = Parser.tracer.print(tmp73, 534);
                    tmp75 = Tree.summary(tree1);
                    tmp76 = "tree: " + tmp75;
                    tmp77 = Parser.tracer.print(tmp76, 535);
                    return runtime.safeCall(process(acc, tree1))
                  } else {
                    doTemp3 = Parser.tracer.print("fallback to end choice", 537);
                    doTemp1 = Parser.tracer.print("no expression choice", 538);
                    scrut3 = rule.endChoice;
                    if (scrut3 instanceof Option.Some.class) {
                      param03 = scrut3.value;
                      value1 = param03;
                      tmp78 = Parser.tracer.print("found end choice", 540);
                      return value1
                    } else {
                      doTemp2 = Parser.tracer.print("no end choice", 542);
                      throw new globalThis.Error("match error");
                    }
                  }
                } else {
                  doTemp1 = Parser.tracer.print("no expression choice", 538);
                  scrut3 = rule.endChoice;
                  if (scrut3 instanceof Option.Some.class) {
                    param03 = scrut3.value;
                    value1 = param03;
                    tmp79 = Parser.tracer.print("found end choice", 540);
                    return value1
                  } else {
                    doTemp2 = Parser.tracer.print("no end choice", 542);
                    throw new globalThis.Error("match error");
                  }
                }
              } else {
                doTemp1 = Parser.tracer.print("no expression choice", 538);
                scrut3 = rule.endChoice;
                if (scrut3 instanceof Option.Some.class) {
                  param03 = scrut3.value;
                  value1 = param03;
                  tmp80 = Parser.tracer.print("found end choice", 540);
                  return value1
                } else {
                  doTemp2 = Parser.tracer.print("no end choice", 542);
                  throw new globalThis.Error("match error");
                }
              }
            }
          } else {
            other = param02;
            tmp81 = TokenHelpers.preview(current);
            tmp82 = "try parse an expression from " + tmp81;
            doTemp = Parser.tracer.print(tmp82, 515);
            scrut4 = rule.exprChoice;
            if (scrut4 instanceof Option.Some.class) {
              param04 = scrut4.value;
              if (globalThis.Array.isArray(param04) && param04.length === 3) {
                first0 = param04[0];
                first1 = param04[1];
                first2 = param04[2];
                isType = first0;
                process = first1;
                rest = first2;
                if (isType === true) {
                  tmp83 = typeExpr;
                } else {
                  tmp83 = simpleExpr;
                }
                acc = runtime.safeCall(tmp83(prec));
                scrut5 = Tree.nonEmptyError(acc);
                if (scrut5 === true) {
                  tmp84 = parseRule(prec, rest);
                  tree1 = tmp84;
                  tmp85 = Tree.summary(acc);
                  tmp86 = "acc: " + tmp85;
                  tmp87 = Parser.tracer.print(tmp86, 534);
                  tmp88 = Tree.summary(tree1);
                  tmp89 = "tree: " + tmp88;
                  tmp90 = Parser.tracer.print(tmp89, 535);
                  return runtime.safeCall(process(acc, tree1))
                } else {
                  doTemp3 = Parser.tracer.print("fallback to end choice", 537);
                  doTemp1 = Parser.tracer.print("no expression choice", 538);
                  scrut3 = rule.endChoice;
                  if (scrut3 instanceof Option.Some.class) {
                    param03 = scrut3.value;
                    value1 = param03;
                    tmp91 = Parser.tracer.print("found end choice", 540);
                    return value1
                  } else {
                    doTemp2 = Parser.tracer.print("no end choice", 542);
                    throw new globalThis.Error("match error");
                  }
                }
              } else {
                doTemp1 = Parser.tracer.print("no expression choice", 538);
                scrut3 = rule.endChoice;
                if (scrut3 instanceof Option.Some.class) {
                  param03 = scrut3.value;
                  value1 = param03;
                  tmp92 = Parser.tracer.print("found end choice", 540);
                  return value1
                } else {
                  doTemp2 = Parser.tracer.print("no end choice", 542);
                  throw new globalThis.Error("match error");
                }
              }
            } else {
              doTemp1 = Parser.tracer.print("no expression choice", 538);
              scrut3 = rule.endChoice;
              if (scrut3 instanceof Option.Some.class) {
                param03 = scrut3.value;
                value1 = param03;
                tmp93 = Parser.tracer.print("found end choice", 540);
                return value1
              } else {
                doTemp2 = Parser.tracer.print("no end choice", 542);
                throw new globalThis.Error("match error");
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
    bracketed = function bracketed(content, kind) {
      let tmp4;
      if (content instanceof Tree.Empty.class) {
        if (kind instanceof Token.Round.class) {
          return Tree.Tuple(Stack.Nil)
        } else if (kind instanceof Token.Square.class) {
          tmp4 = Tree.Sequence(Stack.Nil);
          return Tree.Bracketed(Token.Square, tmp4)
        } else if (kind instanceof Token.BeginEnd.class) {
          return Tree.Sequence(Stack.Nil)
        } else {
          return content
        }
      } else {
        if (kind instanceof Token.Square.class) {
          return Tree.Bracketed(Token.Square, content)
        } else {
          return content
        }
      }
    };
    simpleExpr = function simpleExpr(prec) {
      let tmp4, tmp5, tmp6, tmp7, tmp8;
      tmp4 = "simple expression <<< " + prec;
      tmp5 = tmp4 + " ";
      tmp6 = TokenHelpers.preview(current);
      tmp7 = tmp5 + tmp6;
      tmp8 = () => {
        let scrut1, param01, param11, token1, param02, kind, param03, kind1, param04, param12, kind2, literal, param05, param13, name, symbolic, scrut2, param06, keyword2, scrut3, param07, rule, scrut4, acc, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20, tmp21, tmp22, tmp23, tmp24, tmp25, tmp26, tmp27;
        tmp9 = yeetSpaces();
        scrut1 = tmp9;
        if (scrut1 instanceof Stack.Cons.class) {
          param01 = scrut1.head;
          param11 = scrut1.tail;
          if (param01 instanceof Token.Identifier.class) {
            param05 = param01.name;
            param13 = param01.symbolic;
            name = param05;
            symbolic = param13;
            scrut2 = runtime.safeCall(Precedence.Keywords.all.get(name));
            if (scrut2 instanceof Option.Some.class) {
              param06 = scrut2.value;
              keyword2 = param06;
              scrut3 = runtime.safeCall(Parser.exprRules.keywordChoices.get(name));
              if (scrut3 instanceof Option.Some.class) {
                param07 = scrut3.value;
                rule = param07;
                scrut4 = keyword2.leftPrecOrMin > prec;
                if (scrut4 === true) {
                  tmp10 = consume();
                  tmp11 = parseRule(keyword2.rightPrecOrMax, rule);
                  acc = tmp11;
                  return exprCont(acc, prec)
                } else {
                  tmp12 = "the left precedence is less" + name;
                  tmp13 = Parser.tracer.print(tmp12, 569);
                  return Tree.empty
                }
              } else if (scrut3 instanceof Option.None.class) {
                tmp14 = "no rule starting with " + name;
                tmp15 = Parser.tracer.print(tmp14, 572);
                return Tree.empty
              } else {
                token1 = param01;
                tmp16 = "unrecognized token: " + token1;
                return Tree.error(tmp16)
              }
            } else if (scrut2 instanceof Option.None.class) {
              tmp17 = consume();
              tmp18 = Tree.Ident(name, symbolic);
              return exprCont(tmp18, prec)
            } else {
              token1 = param01;
              tmp19 = "unrecognized token: " + token1;
              return Tree.error(tmp19)
            }
          } else if (param01 instanceof Token.Literal.class) {
            param04 = param01.kind;
            param12 = param01.literal;
            kind2 = param04;
            literal = param12;
            tmp20 = consume();
            tmp21 = Tree.Literal(kind2, literal);
            return exprCont(tmp21, prec)
          } else if (param01 instanceof Token.Open.class) {
            param03 = param01.kind;
            kind1 = param03;
            tmp22 = consume();
            tmp23 = Option.Some(kind1);
            tmp24 = simpleExpr(0, tmp23);
            tmp25 = closeBy(tmp24, kind1);
            tmp26 = bracketed(tmp25, kind1);
            return exprCont(tmp26, prec)
          } else if (param01 instanceof Token.Close.class) {
            param02 = param01.kind;
            kind = param02;
            return Tree.Empty()
          } else {
            token1 = param01;
            tmp27 = "unrecognized token: " + token1;
            return Tree.error(tmp27)
          }
        } else if (scrut1 instanceof Stack.Nil.class) {
          return Tree.error("unexpected EOF")
        } else {
          throw new globalThis.Error("match error");
        }
      };
      return runtime.safeCall(Parser.tracer.trace(tmp7, (result) => {
        let tmp9;
        tmp9 = Tree.summary(result);
        return "simple expression >>> " + tmp9
      }, tmp8))
    };
    exprCont = function exprCont(acc, prec) {
      let scrut1, doTemp, param01, param11, token1, scrut2, scrut3, rhs, param02, kind, param03, param12, name, scrut4, doTemp1, scrut5, first1, first0, leftPrec, rightPrec, doTemp2, scrut6, op3, rhs1, name1, scrut7, param04, keyword2, doTemp3, doTemp4, scrut8, param05, rule, doTemp5, scrut9, scrut10, param06, first2, first11, first01, isType, process, rest, rhs2, acc$_, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20, tmp21, tmp22, tmp23, tmp24, tmp25, tmp26, tmp27, tmp28, tmp29, tmp30, tmp31, tmp32, tmp33, tmp34, tmp35, tmp36, tmp37, tmp38, tmp39, tmp40, tmp41, tmp42, tmp43, tmp44, tmp45, tmp46, tmp47, tmp48, tmp49, tmp50, tmp51, tmp52, tmp53, tmp54, tmp55, tmp56, tmp57, tmp58, tmp59, tmp60, tmp61, tmp62, tmp63, tmp64, tmp65, tmp66, tmp67, tmp68, tmp69, tmp70, tmp71, tmp72, tmp73, tmp74, tmp75, tmp76, tmp77, tmp78, tmp79, tmp80, tmp81, tmp82, tmp83, tmp84, tmp85, tmp86, tmp87, tmp88, tmp89, tmp90, tmp91, tmp92, tmp93, tmp94, tmp95, tmp96, tmp97, tmp98, tmp99, tmp100, tmp101, tmp102, tmp103, tmp104, tmp105, tmp106, tmp107, tmp108, tmp109, tmp110, tmp111, tmp112, tmp113, tmp114, tmp115, tmp116, tmp117, tmp118, tmp119, tmp120, tmp121, tmp122, tmp123, tmp124, tmp125, tmp126, tmp127, tmp128, tmp129, tmp130, tmp131, tmp132, tmp133, tmp134, tmp135, tmp136, tmp137, tmp138, tmp139, tmp140, tmp141, tmp142, tmp143, tmp144, tmp145, tmp146, tmp147, tmp148, tmp149;
      tmp4 = yeetSpaces();
      scrut1 = tmp4;
      tmp5 = ">>> exprCont " + prec;
      tmp6 = tmp5 + " ";
      tmp7 = Tree.summary(acc);
      tmp8 = tmp6 + tmp7;
      tmp9 = tmp8 + " <<<";
      doTemp = Parser.tracer.print(tmp9, 591);
      if (scrut1 instanceof Stack.Cons.class) {
        param01 = scrut1.head;
        param11 = scrut1.tail;
        if (param01 instanceof Token.Identifier.class) {
          param03 = param01.name;
          param12 = param01.symbolic;
          name1 = param03;
          scrut7 = runtime.safeCall(Precedence.Keywords.all.get(name1));
          if (scrut7 instanceof Option.Some.class) {
            param04 = scrut7.value;
            keyword2 = param04;
            tmp10 = "found a keyword: " + name1;
            doTemp3 = Parser.tracer.print(tmp10, 594);
            scrut8 = runtime.safeCall(Parser.exprInfixRules.keywordChoices.get(name1));
            if (scrut8 instanceof Option.Some.class) {
              param05 = scrut8.value;
              rule = param05;
              tmp11 = "the keyword is found in infix rules" + name1;
              doTemp5 = Parser.tracer.print(tmp11, 598);
              scrut9 = keyword2.leftPrecOrMin > prec;
              if (scrut9 === true) {
                scrut10 = rule.exprChoice;
                if (scrut10 instanceof Option.Some.class) {
                  param06 = scrut10.value;
                  if (globalThis.Array.isArray(param06) && param06.length === 3) {
                    first01 = param06[0];
                    first11 = param06[1];
                    first2 = param06[2];
                    isType = first01;
                    process = first11;
                    rest = first2;
                    tmp12 = consume();
                    if (isType === true) {
                      tmp13 = typeExpr;
                    } else {
                      tmp13 = simpleExpr;
                    }
                    tmp14 = runtime.safeCall(tmp13(keyword2.rightPrecOrMin));
                    rhs2 = tmp14;
                    tmp15 = runtime.safeCall(process(rhs2));
                    tmp16 = runtime.safeCall(tmp15(acc));
                    acc$_ = tmp16;
                    return exprCont(acc$_, prec)
                  } else {
                    tmp17 = "keyword `" + name1;
                    tmp18 = tmp17 + "` does not have infix rules";
                    doTemp4 = Parser.tracer.print(tmp18, 606);
                    name = param03;
                    if (param12 === true) {
                      scrut4 = runtime.safeCall(Precedence.Keywords.all.get(name));
                      if (scrut4 instanceof Option.None.class) {
                        tmp19 = "found an operator \"" + name;
                        tmp20 = tmp19 + "\"";
                        doTemp1 = Parser.tracer.print(tmp20, 608);
                        scrut5 = Precedence.opPrec(name);
                        if (globalThis.Array.isArray(scrut5) && scrut5.length === 2) {
                          first0 = scrut5[0];
                          first1 = scrut5[1];
                          leftPrec = first0;
                          rightPrec = first1;
                          tmp21 = "its precedence is " + leftPrec;
                          doTemp2 = Parser.tracer.print(tmp21, 610);
                          scrut6 = leftPrec > prec;
                          if (scrut6 === true) {
                            tmp22 = consume();
                            tmp23 = Tree.Ident(name, true);
                            op3 = tmp23;
                            tmp24 = simpleExpr(rightPrec);
                            rhs1 = tmp24;
                            tmp25 = Stack.Cons(rhs1, Stack.Nil);
                            tmp26 = Stack.Cons(acc, tmp25);
                            tmp27 = Tree.App(op3, tmp26);
                            return exprCont(tmp27, prec)
                          } else {
                            return acc
                          }
                        } else {
                          token1 = param01;
                          scrut2 = Precedence.appPrec > prec;
                          if (scrut2 === true) {
                            tmp28 = Parser.tracer.print("found an application", 621);
                            scrut3 = simpleExpr(Precedence.appPrec);
                            if (scrut3 instanceof Tree.Empty.class) {
                              return acc
                            } else if (scrut3 instanceof Tree.Error.class) {
                              return acc
                            } else {
                              rhs = scrut3;
                              tmp29 = Stack.Cons(rhs, Stack.Nil);
                              tmp30 = Tree.App(acc, tmp29);
                              return exprCont(tmp30, prec)
                            }
                          } else {
                            tmp31 = "cannot consume " + token1;
                            tmp32 = Parser.tracer.print(tmp31, 627);
                            return acc
                          }
                        }
                      } else {
                        token1 = param01;
                        scrut2 = Precedence.appPrec > prec;
                        if (scrut2 === true) {
                          tmp33 = Parser.tracer.print("found an application", 621);
                          scrut3 = simpleExpr(Precedence.appPrec);
                          if (scrut3 instanceof Tree.Empty.class) {
                            return acc
                          } else if (scrut3 instanceof Tree.Error.class) {
                            return acc
                          } else {
                            rhs = scrut3;
                            tmp34 = Stack.Cons(rhs, Stack.Nil);
                            tmp35 = Tree.App(acc, tmp34);
                            return exprCont(tmp35, prec)
                          }
                        } else {
                          tmp36 = "cannot consume " + token1;
                          tmp37 = Parser.tracer.print(tmp36, 627);
                          return acc
                        }
                      }
                    } else {
                      token1 = param01;
                      scrut2 = Precedence.appPrec > prec;
                      if (scrut2 === true) {
                        tmp38 = Parser.tracer.print("found an application", 621);
                        scrut3 = simpleExpr(Precedence.appPrec);
                        if (scrut3 instanceof Tree.Empty.class) {
                          return acc
                        } else if (scrut3 instanceof Tree.Error.class) {
                          return acc
                        } else {
                          rhs = scrut3;
                          tmp39 = Stack.Cons(rhs, Stack.Nil);
                          tmp40 = Tree.App(acc, tmp39);
                          return exprCont(tmp40, prec)
                        }
                      } else {
                        tmp41 = "cannot consume " + token1;
                        tmp42 = Parser.tracer.print(tmp41, 627);
                        return acc
                      }
                    }
                  }
                } else if (scrut10 instanceof Option.None.class) {
                  return acc
                } else {
                  tmp43 = "keyword `" + name1;
                  tmp44 = tmp43 + "` does not have infix rules";
                  doTemp4 = Parser.tracer.print(tmp44, 606);
                  name = param03;
                  if (param12 === true) {
                    scrut4 = runtime.safeCall(Precedence.Keywords.all.get(name));
                    if (scrut4 instanceof Option.None.class) {
                      tmp45 = "found an operator \"" + name;
                      tmp46 = tmp45 + "\"";
                      doTemp1 = Parser.tracer.print(tmp46, 608);
                      scrut5 = Precedence.opPrec(name);
                      if (globalThis.Array.isArray(scrut5) && scrut5.length === 2) {
                        first0 = scrut5[0];
                        first1 = scrut5[1];
                        leftPrec = first0;
                        rightPrec = first1;
                        tmp47 = "its precedence is " + leftPrec;
                        doTemp2 = Parser.tracer.print(tmp47, 610);
                        scrut6 = leftPrec > prec;
                        if (scrut6 === true) {
                          tmp48 = consume();
                          tmp49 = Tree.Ident(name, true);
                          op3 = tmp49;
                          tmp50 = simpleExpr(rightPrec);
                          rhs1 = tmp50;
                          tmp51 = Stack.Cons(rhs1, Stack.Nil);
                          tmp52 = Stack.Cons(acc, tmp51);
                          tmp53 = Tree.App(op3, tmp52);
                          return exprCont(tmp53, prec)
                        } else {
                          return acc
                        }
                      } else {
                        token1 = param01;
                        scrut2 = Precedence.appPrec > prec;
                        if (scrut2 === true) {
                          tmp54 = Parser.tracer.print("found an application", 621);
                          scrut3 = simpleExpr(Precedence.appPrec);
                          if (scrut3 instanceof Tree.Empty.class) {
                            return acc
                          } else if (scrut3 instanceof Tree.Error.class) {
                            return acc
                          } else {
                            rhs = scrut3;
                            tmp55 = Stack.Cons(rhs, Stack.Nil);
                            tmp56 = Tree.App(acc, tmp55);
                            return exprCont(tmp56, prec)
                          }
                        } else {
                          tmp57 = "cannot consume " + token1;
                          tmp58 = Parser.tracer.print(tmp57, 627);
                          return acc
                        }
                      }
                    } else {
                      token1 = param01;
                      scrut2 = Precedence.appPrec > prec;
                      if (scrut2 === true) {
                        tmp59 = Parser.tracer.print("found an application", 621);
                        scrut3 = simpleExpr(Precedence.appPrec);
                        if (scrut3 instanceof Tree.Empty.class) {
                          return acc
                        } else if (scrut3 instanceof Tree.Error.class) {
                          return acc
                        } else {
                          rhs = scrut3;
                          tmp60 = Stack.Cons(rhs, Stack.Nil);
                          tmp61 = Tree.App(acc, tmp60);
                          return exprCont(tmp61, prec)
                        }
                      } else {
                        tmp62 = "cannot consume " + token1;
                        tmp63 = Parser.tracer.print(tmp62, 627);
                        return acc
                      }
                    }
                  } else {
                    token1 = param01;
                    scrut2 = Precedence.appPrec > prec;
                    if (scrut2 === true) {
                      tmp64 = Parser.tracer.print("found an application", 621);
                      scrut3 = simpleExpr(Precedence.appPrec);
                      if (scrut3 instanceof Tree.Empty.class) {
                        return acc
                      } else if (scrut3 instanceof Tree.Error.class) {
                        return acc
                      } else {
                        rhs = scrut3;
                        tmp65 = Stack.Cons(rhs, Stack.Nil);
                        tmp66 = Tree.App(acc, tmp65);
                        return exprCont(tmp66, prec)
                      }
                    } else {
                      tmp67 = "cannot consume " + token1;
                      tmp68 = Parser.tracer.print(tmp67, 627);
                      return acc
                    }
                  }
                }
              } else {
                tmp69 = "keyword `" + name1;
                tmp70 = tmp69 + "` does not have infix rules";
                doTemp4 = Parser.tracer.print(tmp70, 606);
                name = param03;
                if (param12 === true) {
                  scrut4 = runtime.safeCall(Precedence.Keywords.all.get(name));
                  if (scrut4 instanceof Option.None.class) {
                    tmp71 = "found an operator \"" + name;
                    tmp72 = tmp71 + "\"";
                    doTemp1 = Parser.tracer.print(tmp72, 608);
                    scrut5 = Precedence.opPrec(name);
                    if (globalThis.Array.isArray(scrut5) && scrut5.length === 2) {
                      first0 = scrut5[0];
                      first1 = scrut5[1];
                      leftPrec = first0;
                      rightPrec = first1;
                      tmp73 = "its precedence is " + leftPrec;
                      doTemp2 = Parser.tracer.print(tmp73, 610);
                      scrut6 = leftPrec > prec;
                      if (scrut6 === true) {
                        tmp74 = consume();
                        tmp75 = Tree.Ident(name, true);
                        op3 = tmp75;
                        tmp76 = simpleExpr(rightPrec);
                        rhs1 = tmp76;
                        tmp77 = Stack.Cons(rhs1, Stack.Nil);
                        tmp78 = Stack.Cons(acc, tmp77);
                        tmp79 = Tree.App(op3, tmp78);
                        return exprCont(tmp79, prec)
                      } else {
                        return acc
                      }
                    } else {
                      token1 = param01;
                      scrut2 = Precedence.appPrec > prec;
                      if (scrut2 === true) {
                        tmp80 = Parser.tracer.print("found an application", 621);
                        scrut3 = simpleExpr(Precedence.appPrec);
                        if (scrut3 instanceof Tree.Empty.class) {
                          return acc
                        } else if (scrut3 instanceof Tree.Error.class) {
                          return acc
                        } else {
                          rhs = scrut3;
                          tmp81 = Stack.Cons(rhs, Stack.Nil);
                          tmp82 = Tree.App(acc, tmp81);
                          return exprCont(tmp82, prec)
                        }
                      } else {
                        tmp83 = "cannot consume " + token1;
                        tmp84 = Parser.tracer.print(tmp83, 627);
                        return acc
                      }
                    }
                  } else {
                    token1 = param01;
                    scrut2 = Precedence.appPrec > prec;
                    if (scrut2 === true) {
                      tmp85 = Parser.tracer.print("found an application", 621);
                      scrut3 = simpleExpr(Precedence.appPrec);
                      if (scrut3 instanceof Tree.Empty.class) {
                        return acc
                      } else if (scrut3 instanceof Tree.Error.class) {
                        return acc
                      } else {
                        rhs = scrut3;
                        tmp86 = Stack.Cons(rhs, Stack.Nil);
                        tmp87 = Tree.App(acc, tmp86);
                        return exprCont(tmp87, prec)
                      }
                    } else {
                      tmp88 = "cannot consume " + token1;
                      tmp89 = Parser.tracer.print(tmp88, 627);
                      return acc
                    }
                  }
                } else {
                  token1 = param01;
                  scrut2 = Precedence.appPrec > prec;
                  if (scrut2 === true) {
                    tmp90 = Parser.tracer.print("found an application", 621);
                    scrut3 = simpleExpr(Precedence.appPrec);
                    if (scrut3 instanceof Tree.Empty.class) {
                      return acc
                    } else if (scrut3 instanceof Tree.Error.class) {
                      return acc
                    } else {
                      rhs = scrut3;
                      tmp91 = Stack.Cons(rhs, Stack.Nil);
                      tmp92 = Tree.App(acc, tmp91);
                      return exprCont(tmp92, prec)
                    }
                  } else {
                    tmp93 = "cannot consume " + token1;
                    tmp94 = Parser.tracer.print(tmp93, 627);
                    return acc
                  }
                }
              }
            } else {
              tmp95 = "keyword `" + name1;
              tmp96 = tmp95 + "` does not have infix rules";
              doTemp4 = Parser.tracer.print(tmp96, 606);
              name = param03;
              if (param12 === true) {
                scrut4 = runtime.safeCall(Precedence.Keywords.all.get(name));
                if (scrut4 instanceof Option.None.class) {
                  tmp97 = "found an operator \"" + name;
                  tmp98 = tmp97 + "\"";
                  doTemp1 = Parser.tracer.print(tmp98, 608);
                  scrut5 = Precedence.opPrec(name);
                  if (globalThis.Array.isArray(scrut5) && scrut5.length === 2) {
                    first0 = scrut5[0];
                    first1 = scrut5[1];
                    leftPrec = first0;
                    rightPrec = first1;
                    tmp99 = "its precedence is " + leftPrec;
                    doTemp2 = Parser.tracer.print(tmp99, 610);
                    scrut6 = leftPrec > prec;
                    if (scrut6 === true) {
                      tmp100 = consume();
                      tmp101 = Tree.Ident(name, true);
                      op3 = tmp101;
                      tmp102 = simpleExpr(rightPrec);
                      rhs1 = tmp102;
                      tmp103 = Stack.Cons(rhs1, Stack.Nil);
                      tmp104 = Stack.Cons(acc, tmp103);
                      tmp105 = Tree.App(op3, tmp104);
                      return exprCont(tmp105, prec)
                    } else {
                      return acc
                    }
                  } else {
                    token1 = param01;
                    scrut2 = Precedence.appPrec > prec;
                    if (scrut2 === true) {
                      tmp106 = Parser.tracer.print("found an application", 621);
                      scrut3 = simpleExpr(Precedence.appPrec);
                      if (scrut3 instanceof Tree.Empty.class) {
                        return acc
                      } else if (scrut3 instanceof Tree.Error.class) {
                        return acc
                      } else {
                        rhs = scrut3;
                        tmp107 = Stack.Cons(rhs, Stack.Nil);
                        tmp108 = Tree.App(acc, tmp107);
                        return exprCont(tmp108, prec)
                      }
                    } else {
                      tmp109 = "cannot consume " + token1;
                      tmp110 = Parser.tracer.print(tmp109, 627);
                      return acc
                    }
                  }
                } else {
                  token1 = param01;
                  scrut2 = Precedence.appPrec > prec;
                  if (scrut2 === true) {
                    tmp111 = Parser.tracer.print("found an application", 621);
                    scrut3 = simpleExpr(Precedence.appPrec);
                    if (scrut3 instanceof Tree.Empty.class) {
                      return acc
                    } else if (scrut3 instanceof Tree.Error.class) {
                      return acc
                    } else {
                      rhs = scrut3;
                      tmp112 = Stack.Cons(rhs, Stack.Nil);
                      tmp113 = Tree.App(acc, tmp112);
                      return exprCont(tmp113, prec)
                    }
                  } else {
                    tmp114 = "cannot consume " + token1;
                    tmp115 = Parser.tracer.print(tmp114, 627);
                    return acc
                  }
                }
              } else {
                token1 = param01;
                scrut2 = Precedence.appPrec > prec;
                if (scrut2 === true) {
                  tmp116 = Parser.tracer.print("found an application", 621);
                  scrut3 = simpleExpr(Precedence.appPrec);
                  if (scrut3 instanceof Tree.Empty.class) {
                    return acc
                  } else if (scrut3 instanceof Tree.Error.class) {
                    return acc
                  } else {
                    rhs = scrut3;
                    tmp117 = Stack.Cons(rhs, Stack.Nil);
                    tmp118 = Tree.App(acc, tmp117);
                    return exprCont(tmp118, prec)
                  }
                } else {
                  tmp119 = "cannot consume " + token1;
                  tmp120 = Parser.tracer.print(tmp119, 627);
                  return acc
                }
              }
            }
          } else {
            name = param03;
            if (param12 === true) {
              scrut4 = runtime.safeCall(Precedence.Keywords.all.get(name));
              if (scrut4 instanceof Option.None.class) {
                tmp121 = "found an operator \"" + name;
                tmp122 = tmp121 + "\"";
                doTemp1 = Parser.tracer.print(tmp122, 608);
                scrut5 = Precedence.opPrec(name);
                if (globalThis.Array.isArray(scrut5) && scrut5.length === 2) {
                  first0 = scrut5[0];
                  first1 = scrut5[1];
                  leftPrec = first0;
                  rightPrec = first1;
                  tmp123 = "its precedence is " + leftPrec;
                  doTemp2 = Parser.tracer.print(tmp123, 610);
                  scrut6 = leftPrec > prec;
                  if (scrut6 === true) {
                    tmp124 = consume();
                    tmp125 = Tree.Ident(name, true);
                    op3 = tmp125;
                    tmp126 = simpleExpr(rightPrec);
                    rhs1 = tmp126;
                    tmp127 = Stack.Cons(rhs1, Stack.Nil);
                    tmp128 = Stack.Cons(acc, tmp127);
                    tmp129 = Tree.App(op3, tmp128);
                    return exprCont(tmp129, prec)
                  } else {
                    return acc
                  }
                } else {
                  token1 = param01;
                  scrut2 = Precedence.appPrec > prec;
                  if (scrut2 === true) {
                    tmp130 = Parser.tracer.print("found an application", 621);
                    scrut3 = simpleExpr(Precedence.appPrec);
                    if (scrut3 instanceof Tree.Empty.class) {
                      return acc
                    } else if (scrut3 instanceof Tree.Error.class) {
                      return acc
                    } else {
                      rhs = scrut3;
                      tmp131 = Stack.Cons(rhs, Stack.Nil);
                      tmp132 = Tree.App(acc, tmp131);
                      return exprCont(tmp132, prec)
                    }
                  } else {
                    tmp133 = "cannot consume " + token1;
                    tmp134 = Parser.tracer.print(tmp133, 627);
                    return acc
                  }
                }
              } else {
                token1 = param01;
                scrut2 = Precedence.appPrec > prec;
                if (scrut2 === true) {
                  tmp135 = Parser.tracer.print("found an application", 621);
                  scrut3 = simpleExpr(Precedence.appPrec);
                  if (scrut3 instanceof Tree.Empty.class) {
                    return acc
                  } else if (scrut3 instanceof Tree.Error.class) {
                    return acc
                  } else {
                    rhs = scrut3;
                    tmp136 = Stack.Cons(rhs, Stack.Nil);
                    tmp137 = Tree.App(acc, tmp136);
                    return exprCont(tmp137, prec)
                  }
                } else {
                  tmp138 = "cannot consume " + token1;
                  tmp139 = Parser.tracer.print(tmp138, 627);
                  return acc
                }
              }
            } else {
              token1 = param01;
              scrut2 = Precedence.appPrec > prec;
              if (scrut2 === true) {
                tmp140 = Parser.tracer.print("found an application", 621);
                scrut3 = simpleExpr(Precedence.appPrec);
                if (scrut3 instanceof Tree.Empty.class) {
                  return acc
                } else if (scrut3 instanceof Tree.Error.class) {
                  return acc
                } else {
                  rhs = scrut3;
                  tmp141 = Stack.Cons(rhs, Stack.Nil);
                  tmp142 = Tree.App(acc, tmp141);
                  return exprCont(tmp142, prec)
                }
              } else {
                tmp143 = "cannot consume " + token1;
                tmp144 = Parser.tracer.print(tmp143, 627);
                return acc
              }
            }
          }
        } else if (param01 instanceof Token.Close.class) {
          param02 = param01.kind;
          kind = param02;
          return acc
        } else {
          token1 = param01;
          scrut2 = Precedence.appPrec > prec;
          if (scrut2 === true) {
            tmp145 = Parser.tracer.print("found an application", 621);
            scrut3 = simpleExpr(Precedence.appPrec);
            if (scrut3 instanceof Tree.Empty.class) {
              return acc
            } else if (scrut3 instanceof Tree.Error.class) {
              return acc
            } else {
              rhs = scrut3;
              tmp146 = Stack.Cons(rhs, Stack.Nil);
              tmp147 = Tree.App(acc, tmp146);
              return exprCont(tmp147, prec)
            }
          } else {
            tmp148 = "cannot consume " + token1;
            tmp149 = Parser.tracer.print(tmp148, 627);
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
        let scrut1, param01, param11, param02, param12, param03, kind, param04, kind1, openness, param05, param13, marker, param06, param14, scrut2, param07, param15, param08, param16, marker1, name, param09, name1, param010, name2, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20, tmp21, tmp22, tmp23, tmp24, tmp25, tmp26, tmp27, tmp28, tmp29, tmp30, tmp31, tmp32, tmp33, tmp34, tmp35, tmp36, tmp37, tmp38, tmp39, tmp40, tmp41, tmp42, tmp43, tmp44, tmp45;
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
            } else if (param02 === "_") {
              tmp11 = consume();
              tmp12 = Tree.Underscore();
              return typeExprCont(tmp12, prec)
            } else if (param02 === "..") {
              tmp13 = consume();
              tmp14 = Tree.Ident("..");
              return typeExprCont(tmp14, prec)
            } else {
              name = param02;
              if (param12 === false) {
                tmp15 = consume();
                tmp16 = Tree.Ident(name);
                return typeExprCont(tmp16, prec)
              } else {
                if (param02 === "<") {
                  tmp17 = consume();
                  tmp18 = Option.Some(Token.Angle);
                  tmp19 = typeExpr(0, tmp18);
                  tmp20 = Tree.asSequence(tmp19);
                  tmp21 = Tree.bracketed(tmp20, Token.Angle);
                  tmp22 = closeBy(tmp21, Token.Angle);
                  return typeExprCont(tmp22, prec)
                } else if (param02 === ">") {
                  return Tree.Empty()
                } else {
                  return Tree.empty
                }
              }
            }
          } else if (param01 instanceof Token.TagName.class) {
            param010 = param01.name;
            name2 = param010;
            tmp23 = consume();
            tmp24 = "`" + name2;
            tmp25 = Tree.Ident(tmp24);
            return typeExprCont(tmp25, prec)
          } else if (param01 instanceof Token.TypeVariable.class) {
            param09 = param01.name;
            name1 = param09;
            tmp26 = consume();
            tmp27 = "'" + name1;
            tmp28 = Tree.Ident(tmp27);
            return typeExprCont(tmp28, prec)
          } else if (param01 instanceof Token.Open.class) {
            param04 = param01.kind;
            if (param04 instanceof Token.Square.class) {
              tmp29 = consume();
              if (current instanceof Stack.Cons.class) {
                param05 = current.head;
                param13 = current.tail;
                if (param05 instanceof Token.Identifier.class) {
                  param06 = param05.name;
                  param14 = param05.symbolic;
                  if (param06 === ">") {
                    marker1 = param05;
                    tmp30 = consume();
                    tmp31 = Option.Some(marker1);
                  } else if (param06 === "<") {
                    marker = param05;
                    tmp32 = consume();
                    tmp33 = yeetSpaces();
                    scrut2 = tmp33;
                    if (scrut2 instanceof Stack.Cons.class) {
                      param07 = scrut2.head;
                      param15 = scrut2.tail;
                      if (param07 instanceof Token.Identifier.class) {
                        param08 = param07.name;
                        param16 = param07.symbolic;
                        if (param08 === "|") {
                          tmp34 = consume();
                          tmp35 = tmp34;
                        } else {
                          tmp35 = runtime.Unit;
                        }
                      } else {
                        tmp35 = runtime.Unit;
                      }
                    } else {
                      tmp35 = runtime.Unit;
                    }
                    tmp31 = Option.Some(marker);
                  } else {
                    tmp31 = Option.None;
                  }
                } else {
                  tmp31 = Option.None;
                }
              } else {
                tmp31 = Option.None;
              }
              openness = tmp31;
              tmp36 = Option.Some(Token.Square);
              tmp37 = typeExpr(0, tmp36);
              tmp38 = closeBy(tmp37, Token.Square);
              return typeExprCont(tmp38, prec)
            } else {
              kind1 = param04;
              tmp39 = runtime.safeCall(Parser.tracer.print("found an open ", kind1, " bracket", 676));
              tmp40 = consume();
              if (kind1 instanceof Token.Curly.class) {
                tmp41 = (_) => {
                  return Tree.Bracketed(Token.Curly, _)
                };
              } else {
                tmp41 = Predef.id;
              }
              tmp42 = Option.Some(kind1);
              tmp43 = typeExpr(0, tmp42);
              tmp44 = runtime.safeCall(tmp41(tmp43));
              tmp45 = closeBy(tmp44, kind1);
              return typeExprCont(tmp45, prec)
            }
          } else if (param01 instanceof Token.Close.class) {
            param03 = param01.kind;
            kind = param03;
            return Tree.Empty()
          } else {
            return Tree.empty
          }
        } else {
          return Tree.empty
        }
      };
      return runtime.safeCall(Parser.tracer.trace(tmp7, (result) => {
        let tmp9;
        tmp9 = Tree.summary(result);
        return "typeExpr >>> " + tmp9
      }, tmp8))
    };
    typeExprCont = function typeExprCont(acc, prec) {
      let scrut1, doTemp, doTemp1, param01, param11, token1, param02, param12, name, scrut2, scrut3, rhs, name1, scrut4, param03, keyword2, doTemp2, scrut5, rhs1, name2, scrut6, param04, keyword3, scrut7, param05, rule, doTemp3, doTemp4, scrut8, scrut9, param06, first2, first1, first0, isType, process, rest, rhs2, acc$_, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20, tmp21, tmp22, tmp23, tmp24, tmp25, tmp26, tmp27, tmp28, tmp29, tmp30, tmp31, tmp32, tmp33, tmp34, tmp35, tmp36, tmp37, tmp38, tmp39, tmp40, tmp41, tmp42, tmp43, tmp44, tmp45, tmp46, tmp47, tmp48, tmp49, tmp50, tmp51, tmp52, tmp53, tmp54, tmp55, tmp56, tmp57, tmp58, tmp59, tmp60, tmp61, tmp62, tmp63, tmp64, tmp65, tmp66, tmp67, tmp68, tmp69, tmp70, tmp71, tmp72, tmp73, tmp74, tmp75, tmp76, tmp77, tmp78, tmp79, tmp80, tmp81, tmp82, tmp83, tmp84, tmp85;
      tmp4 = ">>> typeExprCont " + prec;
      tmp5 = tmp4 + " ";
      tmp6 = Tree.summary(acc);
      tmp7 = tmp5 + tmp6;
      tmp8 = tmp7 + " <<<";
      tmp9 = Parser.tracer.print(tmp8, 697);
      tmp10 = yeetSpaces();
      scrut1 = tmp10;
      if (scrut1 instanceof Stack.Cons.class) {
        param01 = scrut1.head;
        param11 = scrut1.tail;
        if (param01 instanceof Token.Close.class) {
          return acc
        } else if (param01 instanceof Token.Identifier.class) {
          param02 = param01.name;
          param12 = param01.symbolic;
          if (param02 === ">") {
            return acc
          } else {
            tmp11 = TokenHelpers.preview(current);
            tmp12 = "check keyword " + tmp11;
            doTemp = Parser.tracer.print(tmp12, 701);
            name2 = param02;
            scrut6 = runtime.safeCall(Precedence.TypeKeywords.all.get(name2));
            if (scrut6 instanceof Option.Some.class) {
              param04 = scrut6.value;
              keyword3 = param04;
              scrut7 = runtime.safeCall(Parser.typeInfixRules.keywordChoices.get(name2));
              if (scrut7 instanceof Option.Some.class) {
                param05 = scrut7.value;
                rule = param05;
                tmp13 = "the keyword is found in infix rules" + name2;
                doTemp3 = Parser.tracer.print(tmp13, 704);
                scrut8 = keyword3.leftPrecOrMin > prec;
                if (scrut8 === true) {
                  scrut9 = rule.exprChoice;
                  if (scrut9 instanceof Option.Some.class) {
                    param06 = scrut9.value;
                    if (globalThis.Array.isArray(param06) && param06.length === 3) {
                      first0 = param06[0];
                      first1 = param06[1];
                      first2 = param06[2];
                      isType = first0;
                      process = first1;
                      rest = first2;
                      tmp14 = consume();
                      if (isType === true) {
                        tmp15 = typeExpr;
                      } else {
                        tmp15 = simpleExpr;
                      }
                      tmp16 = runtime.safeCall(tmp15(keyword3.rightPrecOrMin));
                      rhs2 = tmp16;
                      tmp17 = runtime.safeCall(process(rhs2));
                      tmp18 = runtime.safeCall(tmp17(acc));
                      acc$_ = tmp18;
                      return typeExprCont(acc$_, prec)
                    } else {
                      tmp19 = "keyword `" + name2;
                      tmp20 = tmp19 + "` does not have infix rules";
                      doTemp4 = Parser.tracer.print(tmp20, 712);
                      name1 = param02;
                      scrut4 = runtime.safeCall(Precedence.TypeKeywords.all.get(name1));
                      if (scrut4 instanceof Option.Some.class) {
                        param03 = scrut4.value;
                        keyword2 = param03;
                        tmp21 = "found a keyword " + name1;
                        doTemp2 = Parser.tracer.print(tmp21, 715);
                        scrut5 = keyword2.leftPrecOrMin > prec;
                        if (scrut5 === true) {
                          tmp22 = consume();
                          tmp23 = typeExpr(keyword2.rightPrecOrMax);
                          rhs1 = tmp23;
                          tmp24 = Tree.Infix(keyword2, acc, rhs1);
                          return typeExprCont(tmp24, prec)
                        } else {
                          return acc
                        }
                      } else {
                        doTemp1 = Parser.tracer.print("not a keyword", 723);
                        name = param02;
                        if (param12 === false) {
                          scrut2 = Precedence.TypeKeywords.appPrec > prec;
                          if (scrut2 === true) {
                            tmp25 = Parser.tracer.print("found an application", 726);
                            scrut3 = typeExpr(Precedence.TypeKeywords.appPrec);
                            if (scrut3 instanceof Tree.Empty.class) {
                              return acc
                            } else if (scrut3 instanceof Tree.Error.class) {
                              return acc
                            } else {
                              rhs = scrut3;
                              tmp26 = Stack.Cons(acc, Stack.Nil);
                              tmp27 = Tree.App(rhs, tmp26);
                              return typeExprCont(tmp27, prec)
                            }
                          } else {
                            token1 = param01;
                            tmp28 = "cannot consume " + token1;
                            tmp29 = Parser.tracer.print(tmp28, 732);
                            return acc
                          }
                        } else {
                          token1 = param01;
                          tmp30 = "cannot consume " + token1;
                          tmp31 = Parser.tracer.print(tmp30, 732);
                          return acc
                        }
                      }
                    }
                  } else if (scrut9 instanceof Option.None.class) {
                    return acc
                  } else {
                    tmp32 = "keyword `" + name2;
                    tmp33 = tmp32 + "` does not have infix rules";
                    doTemp4 = Parser.tracer.print(tmp33, 712);
                    name1 = param02;
                    scrut4 = runtime.safeCall(Precedence.TypeKeywords.all.get(name1));
                    if (scrut4 instanceof Option.Some.class) {
                      param03 = scrut4.value;
                      keyword2 = param03;
                      tmp34 = "found a keyword " + name1;
                      doTemp2 = Parser.tracer.print(tmp34, 715);
                      scrut5 = keyword2.leftPrecOrMin > prec;
                      if (scrut5 === true) {
                        tmp35 = consume();
                        tmp36 = typeExpr(keyword2.rightPrecOrMax);
                        rhs1 = tmp36;
                        tmp37 = Tree.Infix(keyword2, acc, rhs1);
                        return typeExprCont(tmp37, prec)
                      } else {
                        return acc
                      }
                    } else {
                      doTemp1 = Parser.tracer.print("not a keyword", 723);
                      name = param02;
                      if (param12 === false) {
                        scrut2 = Precedence.TypeKeywords.appPrec > prec;
                        if (scrut2 === true) {
                          tmp38 = Parser.tracer.print("found an application", 726);
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
                          tmp42 = Parser.tracer.print(tmp41, 732);
                          return acc
                        }
                      } else {
                        token1 = param01;
                        tmp43 = "cannot consume " + token1;
                        tmp44 = Parser.tracer.print(tmp43, 732);
                        return acc
                      }
                    }
                  }
                } else {
                  tmp45 = "keyword `" + name2;
                  tmp46 = tmp45 + "` does not have infix rules";
                  doTemp4 = Parser.tracer.print(tmp46, 712);
                  name1 = param02;
                  scrut4 = runtime.safeCall(Precedence.TypeKeywords.all.get(name1));
                  if (scrut4 instanceof Option.Some.class) {
                    param03 = scrut4.value;
                    keyword2 = param03;
                    tmp47 = "found a keyword " + name1;
                    doTemp2 = Parser.tracer.print(tmp47, 715);
                    scrut5 = keyword2.leftPrecOrMin > prec;
                    if (scrut5 === true) {
                      tmp48 = consume();
                      tmp49 = typeExpr(keyword2.rightPrecOrMax);
                      rhs1 = tmp49;
                      tmp50 = Tree.Infix(keyword2, acc, rhs1);
                      return typeExprCont(tmp50, prec)
                    } else {
                      return acc
                    }
                  } else {
                    doTemp1 = Parser.tracer.print("not a keyword", 723);
                    name = param02;
                    if (param12 === false) {
                      scrut2 = Precedence.TypeKeywords.appPrec > prec;
                      if (scrut2 === true) {
                        tmp51 = Parser.tracer.print("found an application", 726);
                        scrut3 = typeExpr(Precedence.TypeKeywords.appPrec);
                        if (scrut3 instanceof Tree.Empty.class) {
                          return acc
                        } else if (scrut3 instanceof Tree.Error.class) {
                          return acc
                        } else {
                          rhs = scrut3;
                          tmp52 = Stack.Cons(acc, Stack.Nil);
                          tmp53 = Tree.App(rhs, tmp52);
                          return typeExprCont(tmp53, prec)
                        }
                      } else {
                        token1 = param01;
                        tmp54 = "cannot consume " + token1;
                        tmp55 = Parser.tracer.print(tmp54, 732);
                        return acc
                      }
                    } else {
                      token1 = param01;
                      tmp56 = "cannot consume " + token1;
                      tmp57 = Parser.tracer.print(tmp56, 732);
                      return acc
                    }
                  }
                }
              } else {
                name1 = param02;
                scrut4 = runtime.safeCall(Precedence.TypeKeywords.all.get(name1));
                if (scrut4 instanceof Option.Some.class) {
                  param03 = scrut4.value;
                  keyword2 = param03;
                  tmp58 = "found a keyword " + name1;
                  doTemp2 = Parser.tracer.print(tmp58, 715);
                  scrut5 = keyword2.leftPrecOrMin > prec;
                  if (scrut5 === true) {
                    tmp59 = consume();
                    tmp60 = typeExpr(keyword2.rightPrecOrMax);
                    rhs1 = tmp60;
                    tmp61 = Tree.Infix(keyword2, acc, rhs1);
                    return typeExprCont(tmp61, prec)
                  } else {
                    return acc
                  }
                } else {
                  doTemp1 = Parser.tracer.print("not a keyword", 723);
                  name = param02;
                  if (param12 === false) {
                    scrut2 = Precedence.TypeKeywords.appPrec > prec;
                    if (scrut2 === true) {
                      tmp62 = Parser.tracer.print("found an application", 726);
                      scrut3 = typeExpr(Precedence.TypeKeywords.appPrec);
                      if (scrut3 instanceof Tree.Empty.class) {
                        return acc
                      } else if (scrut3 instanceof Tree.Error.class) {
                        return acc
                      } else {
                        rhs = scrut3;
                        tmp63 = Stack.Cons(acc, Stack.Nil);
                        tmp64 = Tree.App(rhs, tmp63);
                        return typeExprCont(tmp64, prec)
                      }
                    } else {
                      token1 = param01;
                      tmp65 = "cannot consume " + token1;
                      tmp66 = Parser.tracer.print(tmp65, 732);
                      return acc
                    }
                  } else {
                    token1 = param01;
                    tmp67 = "cannot consume " + token1;
                    tmp68 = Parser.tracer.print(tmp67, 732);
                    return acc
                  }
                }
              }
            } else {
              name1 = param02;
              scrut4 = runtime.safeCall(Precedence.TypeKeywords.all.get(name1));
              if (scrut4 instanceof Option.Some.class) {
                param03 = scrut4.value;
                keyword2 = param03;
                tmp69 = "found a keyword " + name1;
                doTemp2 = Parser.tracer.print(tmp69, 715);
                scrut5 = keyword2.leftPrecOrMin > prec;
                if (scrut5 === true) {
                  tmp70 = consume();
                  tmp71 = typeExpr(keyword2.rightPrecOrMax);
                  rhs1 = tmp71;
                  tmp72 = Tree.Infix(keyword2, acc, rhs1);
                  return typeExprCont(tmp72, prec)
                } else {
                  return acc
                }
              } else {
                doTemp1 = Parser.tracer.print("not a keyword", 723);
                name = param02;
                if (param12 === false) {
                  scrut2 = Precedence.TypeKeywords.appPrec > prec;
                  if (scrut2 === true) {
                    tmp73 = Parser.tracer.print("found an application", 726);
                    scrut3 = typeExpr(Precedence.TypeKeywords.appPrec);
                    if (scrut3 instanceof Tree.Empty.class) {
                      return acc
                    } else if (scrut3 instanceof Tree.Error.class) {
                      return acc
                    } else {
                      rhs = scrut3;
                      tmp74 = Stack.Cons(acc, Stack.Nil);
                      tmp75 = Tree.App(rhs, tmp74);
                      return typeExprCont(tmp75, prec)
                    }
                  } else {
                    token1 = param01;
                    tmp76 = "cannot consume " + token1;
                    tmp77 = Parser.tracer.print(tmp76, 732);
                    return acc
                  }
                } else {
                  token1 = param01;
                  tmp78 = "cannot consume " + token1;
                  tmp79 = Parser.tracer.print(tmp78, 732);
                  return acc
                }
              }
            }
          }
        } else {
          tmp80 = TokenHelpers.preview(current);
          tmp81 = "check keyword " + tmp80;
          doTemp = Parser.tracer.print(tmp81, 701);
          doTemp1 = Parser.tracer.print("not a keyword", 723);
          token1 = param01;
          tmp82 = "cannot consume " + token1;
          tmp83 = Parser.tracer.print(tmp82, 732);
          return acc
        }
      } else {
        tmp84 = TokenHelpers.preview(current);
        tmp85 = "check keyword " + tmp84;
        doTemp = Parser.tracer.print(tmp85, 701);
        doTemp1 = Parser.tracer.print("not a keyword", 723);
        if (scrut1 instanceof Stack.Nil.class) {
          return acc
        } else {
          throw new globalThis.Error("match error");
        }
      }
    };
    mod = function mod(acc) {
      let scrut1, doTemp, param01, param11, param02, param12, name, scrut2, param03, keyword2, scrut3, param04, rule, tree1, scrut4, param05, rule1, tree2, param06, param13, bindings, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20, tmp21;
      tmp4 = yeetSpaces();
      scrut1 = tmp4;
      doTemp = Parser.tracer.print(">>>>>> mod <<<<<<", 737);
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
              keyword2 = param03;
              scrut4 = runtime.safeCall(Parser.exprRules.keywordChoices.get(name));
              if (scrut4 instanceof Option.Some.class) {
                param05 = scrut4.value;
                rule1 = param05;
                tmp6 = consume();
                tmp7 = parseRule(0, rule1, Option.None);
                tree2 = tmp7;
                if (tree2 instanceof Tree.LetIn.class) {
                  param06 = tree2.bindings;
                  param13 = tree2.body;
                  bindings = param06;
                  if (param13 instanceof Tree.Empty.class) {
                    tmp8 = Tree.DefineKind.Let(false);
                    tmp9 = Tree.Define(tmp8, bindings);
                    tmp10 = Stack.Cons(tmp9, acc);
                    return modCont(tmp10)
                  } else {
                    tmp11 = Stack.Cons(tree2, acc);
                    return modCont(tmp11)
                  }
                } else {
                  tmp12 = Stack.Cons(tree2, acc);
                  return modCont(tmp12)
                }
              } else {
                scrut3 = runtime.safeCall(Parser.moduleRules.keywordChoices.get(name));
                if (scrut3 instanceof Option.Some.class) {
                  param04 = scrut3.value;
                  rule = param04;
                  tmp13 = consume();
                  tmp14 = parseRule(0, rule, Option.None);
                  tree1 = tmp14;
                  tmp15 = Stack.Cons(tree1, acc);
                  return modCont(tmp15)
                } else {
                  tmp16 = simpleExpr(0, Option.None);
                  tmp17 = Stack.Cons(tmp16, acc);
                  return modCont(tmp17)
                }
              }
            } else {
              tmp18 = simpleExpr(0, Option.None);
              tmp19 = Stack.Cons(tmp18, acc);
              return modCont(tmp19)
            }
          }
        } else {
          tmp20 = simpleExpr(0, Option.None);
          tmp21 = Stack.Cons(tmp20, acc);
          return modCont(tmp21)
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
      doTemp = Parser.tracer.print(">>>>>> modCont <<<<<<", 759);
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
            tmp6 = parseRule(0, Parser.moduleRules, Option.None);
            tmp7 = Stack.Cons(tmp6, acc);
            return modCont(tmp7)
          }
        } else {
          tmp8 = parseRule(0, Parser.moduleRules, Option.None);
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
      tmp3 = Parser.tracer.print(message, 774);
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
