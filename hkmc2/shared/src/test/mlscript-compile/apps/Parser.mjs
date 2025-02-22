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
  static {
    let tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12;
    tmp = new TreeTracer.TreeTracer();
    this.tracer = tmp;
    tmp1 = Parser.letBinding(true);
    Parser.#letExpression = tmp1;
    tmp2 = Parser.letBinding(false);
    Parser.#letDefinition = tmp2;
    tmp3 = Parser.funChoice();
    tmp4 = Parser.matchWithChoice();
    tmp5 = Parser.matchFunctionChoice();
    tmp6 = Parser.ifThenElse();
    tmp7 = ParseRule.rule("prefix rules for expressions", Parser.#letExpression, tmp3, tmp4, tmp5, tmp6);
    this.exprRules = tmp7;
    tmp8 = Parser.typeDefinition();
    tmp9 = Parser.exceptionDefinition();
    tmp10 = ParseRule.rule("start of statement", Parser.#letDefinition, tmp8, tmp9);
    this.moduleRules = tmp10;
    tmp11 = Parser.makeInfixChoice(Precedence.Keywords._bar);
    tmp12 = ParseRule.rule("the continuation of expressions", tmp11);
    this.infixRules = tmp12;
  }
  static at(target, index) {
    return runtime.safeCall(target.at(index))
  } 
  static first(array) {
    let first0, first;
    if (globalThis.Array.isArray(array) && array.length >= 1) {
      first0 = array[0];
      first = first0;
      return first
    } else {
      throw new globalThis.Error("match error");
    }
  } 
  static second(array1) {
    let first1, first0, second;
    if (globalThis.Array.isArray(array1) && array1.length >= 2) {
      first0 = array1[0];
      first1 = array1[1];
      second = first1;
      return second
    } else {
      throw new globalThis.Error("match error");
    }
  } 
  static toStack(array2) {
    let length, i, reserve, scrut, tmp, tmp1, tmp2, tmp3, tmp4;
    length = array2.length;
    tmp = length - 1;
    i = tmp;
    reserve = Stack.Nil;
    tmp5: while (true) {
      scrut = i >= 0;
      if (scrut === true) {
        tmp1 = runtime.safeCall(array2.at(i));
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
  static indented(text) {
    let tmp;
    tmp = runtime.safeCall(text.split("\n"));
    return runtime.safeCall(tmp.join("\n  "))
  } 
  static showAsTree(thing) {
    let itemize, go;
    itemize = function itemize(something) {
      let keyword, param0, param1, p1, b, param01, param11, param2, param3, n, l, r, b1, param02, param12, param21, op3, lhs, rhs, param03, param13, c, a, param04, param14, scrutinee, branches, param05, param15, k, v, param06, t, param07, t1, param08, param16, m, s, param09, param17, k1, items, param010, param18, n1, param011, param19, t2, m1, m2, param012, param110, head, tail, items1, remaining, param013, param111, head$_, tail$_, param014, content, tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20, tmp21, tmp22, tmp23, tmp24, tmp25, tmp26, tmp27, tmp28, tmp29, tmp30, tmp31, tmp32, tmp33, tmp34, tmp35, tmp36, tmp37, tmp38, tmp39, tmp40;
      if (something instanceof Option.Some.class) {
        param014 = something.value;
        content = param014;
        tmp = go(content);
        tmp1 = "Some of " + tmp;
        return Predef.tuple([
          tmp1
        ], [])
      } else if (something instanceof Option.None.class) {
        return Predef.tuple("None", [])
      } else if (something instanceof Stack.Cons.class) {
        param012 = something.head;
        param110 = something.tail;
        head = param012;
        tail = param110;
        tmp2 = go(head);
        items1 = [
          tmp2
        ];
        remaining = tail;
        tmp41: while (true) {
          if (remaining instanceof Stack.Cons.class) {
            param013 = remaining.head;
            param111 = remaining.tail;
            head$_ = param013;
            tail$_ = param111;
            tmp3 = go(head$_);
            tmp4 = runtime.safeCall(items1.push(tmp3));
            remaining = tail$_;
            tmp5 = runtime.Unit;
            continue tmp41;
          } else {
            tmp5 = runtime.Unit;
          }
          break;
        }
        tmp6 = "Stack of \n" + "  ";
        tmp7 = runtime.safeCall(items1.join("\n"));
        tmp8 = Parser.indented(tmp7);
        tmp9 = tmp6 + tmp8;
        return Predef.tuple(tmp9, [])
      } else if (something instanceof Stack.Nil.class) {
        return [
          "Nil",
          []
        ]
      } else if (typeof something === 'string') {
        tmp10 = runtime.safeCall(globalThis.JSON.stringify(something));
        return [
          tmp10,
          []
        ]
      } else {
        if (globalThis.Number.isInteger(something)) {
          tmp11 = runtime.safeCall(something.toString());
          return [
            tmp11,
            []
          ]
        } else if (something instanceof Tree.Empty.class) {
          return [
            "Empty",
            []
          ]
        } else if (something instanceof Tree.Error.class) {
          param011 = something.tree;
          param19 = something.message;
          if (param011 instanceof Tree.Empty.class) {
            m2 = param19;
            tmp12 = go(m2);
            return Predef.tuple("Error", [
              [
                "message",
                tmp12
              ]
            ])
          } else {
            t2 = param011;
            m1 = param19;
            tmp13 = go(t2);
            tmp14 = go(m1);
            return Predef.tuple("Error", [
              [
                "tree",
                tmp13
              ],
              [
                "message",
                tmp14
              ]
            ])
          }
        } else if (something instanceof Tree.Ident.class) {
          param010 = something.name;
          param18 = something.symbolic;
          n1 = param010;
          tmp15 = go(n1);
          return Predef.tuple("Ident", [
            [
              "name",
              tmp15
            ]
          ])
        } else if (something instanceof Tree.Bracketed.class) {
          param09 = something.kind;
          param17 = something.tree;
          k1 = param09;
          items = param17;
          tmp16 = "Bracketed#" + k1;
          tmp17 = go(items);
          return Predef.tuple(tmp16, [
            [
              "items",
              tmp17
            ]
          ])
        } else if (something instanceof Tree.Underscore.class) {
          return Predef.tuple("Underscore", [])
        } else if (something instanceof Tree.Modified.class) {
          param08 = something.modifier;
          param16 = something.subject;
          m = param08;
          s = param16;
          tmp18 = go(m);
          tmp19 = go(s);
          return Predef.tuple("Modified", [
            [
              "modifier",
              tmp18
            ],
            [
              "subject",
              tmp19
            ]
          ])
        } else if (something instanceof Tree.Tuple.class) {
          param07 = something.trees;
          t1 = param07;
          tmp20 = go(t1);
          return Predef.tuple("Tuple", [
            [
              "items",
              tmp20
            ]
          ])
        } else if (something instanceof Tree.Sequence.class) {
          param06 = something.trees;
          t = param06;
          tmp21 = go(t);
          return Predef.tuple("Sequence", [
            [
              "items",
              tmp21
            ]
          ])
        } else if (something instanceof Tree.Literal.class) {
          param05 = something.kind;
          param15 = something.value;
          k = param05;
          v = param15;
          tmp22 = go(k);
          tmp23 = "Literal#" + tmp22;
          tmp24 = tmp23 + " of ";
          tmp25 = go(v);
          tmp26 = tmp24 + tmp25;
          return Predef.tuple(tmp26, [])
        } else {
          if (something instanceof Tree.Match.class) {
            param04 = something.scrutinee;
            param14 = something.branches;
            scrutinee = param04;
            branches = param14;
            tmp27 = go(branches);
            return Predef.tuple("Match", [
              [
                "scrutinee",
                scrutinee
              ],
              [
                "branches",
                tmp27
              ]
            ])
          } else if (something instanceof Tree.App.class) {
            param03 = something.callee;
            param13 = something.arguments;
            c = param03;
            a = param13;
            tmp28 = go(c);
            tmp29 = go(a);
            return Predef.tuple("App", [
              [
                "callee",
                tmp28
              ],
              [
                "arguments",
                tmp29
              ]
            ])
          } else if (something instanceof Tree.Infix.class) {
            param02 = something.op;
            param12 = something.lhs;
            param21 = something.rhs;
            op3 = param02;
            lhs = param12;
            rhs = param21;
            tmp30 = go(op3);
            tmp31 = go(lhs);
            tmp32 = go(rhs);
            return Predef.tuple("Infix", [
              [
                "op",
                tmp30
              ],
              [
                "lhs",
                tmp31
              ],
              [
                "rhs",
                tmp32
              ]
            ])
          } else if (something instanceof Tree.Ternary.class) {
            param01 = something.keyword;
            param11 = something.lhs;
            param2 = something.rhs;
            param3 = something.body;
            n = param01;
            l = param11;
            r = param2;
            b1 = param3;
            tmp33 = go(n);
            tmp34 = go(l);
            tmp35 = go(r);
            tmp36 = go(b1);
            return Predef.tuple("Ternary", [
              [
                "name",
                tmp33
              ],
              [
                "lhs",
                tmp34
              ],
              [
                "rhs",
                tmp35
              ],
              [
                "body",
                tmp36
              ]
            ])
          } else if (something instanceof Tree.Lambda.class) {
            param0 = something.params;
            param1 = something.body;
            p1 = param0;
            b = param1;
            tmp37 = go(p1);
            tmp38 = go(b);
            return Predef.tuple("Lambda", [
              [
                "params",
                tmp37
              ],
              [
                "body",
                tmp38
              ]
            ])
          } else if (something instanceof Keyword.Keyword.class) {
            keyword = something;
            tmp39 = runtime.safeCall(keyword.toString());
            return [
              tmp39,
              []
            ]
          } else if (something instanceof Token.LiteralKind.Integer.class) {
            return Predef.tuple("Integer", [])
          } else if (something instanceof Token.LiteralKind.Decimal.class) {
            return Predef.tuple("Decimal", [])
          } else if (something instanceof Token.LiteralKind.String.class) {
            return Predef.tuple("String", [])
          } else if (something instanceof Token.LiteralKind.Boolean.class) {
            return Predef.tuple("Boolean", [])
          } else {
            tmp40 = runtime.safeCall(globalThis.JSON.stringify(something));
            return Predef.tuple("Unknown", [
              [
                "JSON.stringify(_)",
                tmp40
              ]
            ])
          }
        }
      }
    };
    go = function go(something) {
      let scrut, first1, first0, intro, fields, dialogue, intro1, first01, field, scrut1, intro2, tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9;
      scrut = itemize(something);
      if (globalThis.Array.isArray(scrut) && scrut.length === 2) {
        first0 = scrut[0];
        first1 = scrut[1];
        intro2 = first0;
        intro1 = first0;
        if (globalThis.Array.isArray(first1) && first1.length === 0) {
          return intro2
        } else if (globalThis.Array.isArray(first1) && first1.length === 1) {
          first01 = first1[0];
          field = first01;
          scrut1 = intro1 != "Unknown";
          if (scrut1 === true) {
            tmp = intro1 + " of ";
            tmp1 = Parser.second(field);
            return tmp + tmp1
          } else {
            intro = first0;
            fields = first1;
            tmp2 = runtime.safeCall(fields.map((field1, _, _1) => {
              let tmp10, tmp11, tmp12;
              tmp10 = Parser.first(field1);
              tmp11 = tmp10 + " = ";
              tmp12 = Parser.second(field1);
              return tmp11 + tmp12
            }));
            dialogue = tmp2;
            tmp3 = intro + ":\n  ";
            tmp4 = runtime.safeCall(dialogue.join("\n"));
            tmp5 = Parser.indented(tmp4);
            return tmp3 + tmp5
          }
        } else {
          intro = first0;
          fields = first1;
          tmp6 = runtime.safeCall(fields.map((field1, _, _1) => {
            let tmp10, tmp11, tmp12;
            tmp10 = Parser.first(field1);
            tmp11 = tmp10 + " = ";
            tmp12 = Parser.second(field1);
            return tmp11 + tmp12
          }));
          dialogue = tmp6;
          tmp7 = intro + ":\n  ";
          tmp8 = runtime.safeCall(dialogue.join("\n"));
          tmp9 = Parser.indented(tmp8);
          return tmp7 + tmp9
        }
      } else {
        throw new globalThis.Error("match error");
      }
    };
    return go(thing)
  } 
  static letBinding(hasInClause) {
    let makeItems, makeBinding, intro, items, tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10;
    makeBinding = function makeBinding(body) {
      let tmp11, tmp12, tmp13, tmp14;
      tmp11 = (lhs, rhsAndBody) => {
        let first1, first0, rhs, body1;
        if (globalThis.Array.isArray(rhsAndBody) && rhsAndBody.length === 2) {
          first0 = rhsAndBody[0];
          first1 = rhsAndBody[1];
          rhs = first0;
          body1 = first1;
          return Tree.Ternary(Precedence.Keywords._let, lhs, rhs, body1)
        } else {
          throw new globalThis.Error("match error");
        }
      };
      tmp12 = intro + "left-hand side";
      tmp13 = intro + "right-hand side";
      tmp14 = ParseRule.Choice.keyword(Precedence.Keywords._equal, tmp13, body);
      return ParseRule.Choice.expr(tmp11, tmp12, tmp14)
    };
    makeItems = function makeItems(get) {
      let tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20, tmp21, tmp22, tmp23;
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
          return Option.Some(body)
        }, tmp17, tmp18);
        tmp20 = ParseRule.Choice.keyword(Precedence.Keywords._in, tmp16, tmp19);
        tmp21 = ParseRule.Choice.end(Option.None);
        tmp22 = Predef.tuple(tmp20, tmp21);
      } else {
        tmp23 = ParseRule.Choice.end(Tree.empty);
        tmp22 = Predef.tuple(tmp23);
      }
      return ParseRule.Choice.expr((rhs, body) => {
        return [
          rhs,
          body
        ]
      }, tmp11, tmp15, ...tmp22)
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
  static typeDefinition() {
    let intro1, tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7;
    intro1 = "type definition: ";
    tmp = intro1 + "`type` keyword";
    tmp1 = intro1 + "name";
    tmp2 = intro1 + "equal sign";
    tmp3 = intro1 + "body";
    tmp4 = ParseRule.Choice.end(runtime.Unit);
    tmp5 = ParseRule.Choice.typeExpr((body, _) => {
      return body
    }, tmp3, tmp4);
    tmp6 = ParseRule.Choice.keyword(Precedence.Keywords._equal, tmp2, tmp5);
    tmp7 = ParseRule.Choice.typeExpr((name, body) => {
      return Tree.Ternary(Precedence.Keywords._type, name, body, Option.None)
    }, tmp1, tmp6);
    return ParseRule.Choice.keyword(Precedence.Keywords._type, tmp, tmp7)
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
      return Option.Some(body)
    }, tmp3, tmp4);
    tmp6 = ParseRule.Choice.keyword(Precedence.Keywords._equal, tmp2, tmp5);
    tmp7 = ParseRule.Choice.end(Option.None);
    tmp8 = ParseRule.Choice.typeExpr((name, body) => {
      return Tree.Ternary(Precedence.Keywords._exception, name, body, Option.None)
    }, tmp1, tmp6, tmp7);
    return ParseRule.Choice.keyword(Precedence.Keywords._exception, tmp, tmp8)
  } 
  static makeInfixChoice(keyword) {
    let tmp, tmp1, tmp2, tmp3, tmp4, tmp5;
    tmp = "operator `" + keyword.name;
    tmp1 = tmp + "`";
    tmp2 = "operator `" + keyword.name;
    tmp3 = tmp2 + "` right-hand side";
    tmp4 = ParseRule.Choice.end(runtime.Unit);
    tmp5 = ParseRule.Choice.expr((rhs, _) => {
      return (lhs) => {
        return Tree.Infix(keyword, lhs, rhs)
      }
    }, tmp3, tmp4);
    return ParseRule.Choice.keyword(keyword, tmp1, tmp5)
  } 
  static parse(tokens) {
    let require, exprCont, typeExprCont, simpleExpr, parseRule, yeetSpaces, modCont, consume, typeExpr, mod, current, counter, tree, scrut, param0, param1, token, message, tmp, tmp1, tmp2, tmp3;
    yeetSpaces = function yeetSpaces() {
      let param01, param11, tail, tmp4, tmp5, tmp6, tmp7;
      tmp8: while (true) {
        if (current instanceof Stack.Cons.class) {
          param01 = current.head;
          param11 = current.tail;
          if (param01 instanceof Token.Space.class) {
            tail = param11;
            tmp4 = "skipped a space at " + counter;
            tmp5 = Parser.tracer.print(tmp4, 363);
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
      let scrut1, param01, actual, scrut2, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10;
      tmp4 = yeetSpaces();
      scrut1 = tmp4;
      if (scrut1 instanceof Option.Some.class) {
        param01 = scrut1.value;
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
      } else if (scrut1 instanceof Option.None.class) {
        tmp9 = Token.summary(expected);
        tmp10 = Predef.mkStr("Expected token ", tmp9, ", but found end of input");
        return Tree.Error(result, tmp10)
      } else {
        throw new globalThis.Error("match error");
      }
    };
    parseRule = function parseRule(prec, rule, opened) {
      let tmp4, tmp5, tmp6, tmp7;
      tmp4 = "parsing rule \"" + rule.name;
      tmp5 = tmp4 + "\" with precedence ";
      tmp6 = tmp5 + prec;
      tmp7 = () => {
        let scrut1, scrut2, param01, value, param02, param11, other, doTemp, doTemp1, doTemp2, scrut3, param03, value1, scrut4, param04, first2, first1, first0, isType, process, rest, acc, doTemp3, scrut5, tree1, param05, param12, name, doTemp4, doTemp5, scrut6, param06, keyword1, doTemp6, scrut7, doTemp7, doTemp8, scrut8, param07, value2, scrut9, param08, first21, first11, first01, isType1, process1, rest1, scrut10, acc1, tree2, param09, rest2, param010, encountered, doTemp9, param011, expected, scrut11, scrut12, param012, value3, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20, tmp21, tmp22, tmp23, tmp24, tmp25, tmp26, tmp27, tmp28, tmp29, tmp30, tmp31, tmp32, tmp33, tmp34, tmp35, tmp36, tmp37, tmp38, tmp39, tmp40, tmp41, tmp42, tmp43, tmp44, tmp45, tmp46, tmp47, tmp48, tmp49, tmp50, tmp51, tmp52, tmp53, tmp54, tmp55, tmp56, tmp57, tmp58, tmp59, tmp60, tmp61, tmp62, tmp63, tmp64, tmp65, tmp66, tmp67, tmp68, tmp69, tmp70, tmp71, tmp72, tmp73, tmp74, tmp75, tmp76, tmp77, tmp78, tmp79, tmp80, tmp81, tmp82, tmp83, tmp84, tmp85, tmp86, tmp87, tmp88;
        tmp8 = yeetSpaces();
        scrut1 = tmp8;
        if (scrut1 instanceof Stack.Cons.class) {
          param02 = scrut1.head;
          param11 = scrut1.tail;
          if (param02 instanceof Token.Close.class) {
            param010 = param02.kind;
            encountered = param010;
            doTemp9 = Parser.tracer.print("the case of closing brackets", 399);
            if (opened instanceof Option.Some.class) {
              param011 = opened.value;
              expected = param011;
              scrut11 = encountered == expected;
              if (scrut11 === true) {
                scrut12 = rule.endChoice;
                if (scrut12 instanceof Option.Some.class) {
                  param012 = scrut12.value;
                  value3 = param012;
                  return value3
                } else if (scrut12 instanceof Option.None.class) {
                  tmp9 = "unexpected close bracket `" + encountered;
                  tmp10 = tmp9 + "`";
                  return Tree.error(tmp10)
                } else {
                  return Tree.error("mismatched brackets")
                }
              } else {
                return Tree.error("mismatched brackets")
              }
            } else if (opened instanceof Option.None.class) {
              tmp11 = "unexpected bracket: " + encountered;
              return Tree.error(tmp11)
            } else {
              other = param02;
              tmp12 = TokenHelpers.preview(current);
              tmp13 = "try parse an expression from " + tmp12;
              doTemp = Parser.tracer.print(tmp13, 447);
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
                  acc = runtime.safeCall(tmp14(prec, opened));
                  scrut5 = Tree.nonEmptyError(acc);
                  if (scrut5 === true) {
                    tmp15 = parseRule(prec, rest, opened);
                    tree1 = tmp15;
                    tmp16 = Tree.summary(acc);
                    tmp17 = "acc: " + tmp16;
                    tmp18 = Parser.tracer.print(tmp17, 466);
                    tmp19 = Tree.summary(tree1);
                    tmp20 = "tree: " + tmp19;
                    tmp21 = Parser.tracer.print(tmp20, 467);
                    return runtime.safeCall(process(acc, tree1))
                  } else {
                    doTemp3 = Parser.tracer.print("fallback to end choice", 469);
                    doTemp1 = Parser.tracer.print("no expression choice", 470);
                    scrut3 = rule.endChoice;
                    if (scrut3 instanceof Option.Some.class) {
                      param03 = scrut3.value;
                      value1 = param03;
                      tmp22 = Parser.tracer.print("found end choice", 472);
                      return value1
                    } else {
                      doTemp2 = Parser.tracer.print("no end choice", 474);
                      throw new globalThis.Error("match error");
                    }
                  }
                } else {
                  doTemp1 = Parser.tracer.print("no expression choice", 470);
                  scrut3 = rule.endChoice;
                  if (scrut3 instanceof Option.Some.class) {
                    param03 = scrut3.value;
                    value1 = param03;
                    tmp23 = Parser.tracer.print("found end choice", 472);
                    return value1
                  } else {
                    doTemp2 = Parser.tracer.print("no end choice", 474);
                    throw new globalThis.Error("match error");
                  }
                }
              } else {
                doTemp1 = Parser.tracer.print("no expression choice", 470);
                scrut3 = rule.endChoice;
                if (scrut3 instanceof Option.Some.class) {
                  param03 = scrut3.value;
                  value1 = param03;
                  tmp24 = Parser.tracer.print("found end choice", 472);
                  return value1
                } else {
                  doTemp2 = Parser.tracer.print("no end choice", 474);
                  throw new globalThis.Error("match error");
                }
              }
            }
          } else if (param02 instanceof Token.Identifier.class) {
            param05 = param02.name;
            param12 = param02.symbolic;
            name = param05;
            tmp25 = "check if \"" + name;
            tmp26 = tmp25 + "\" is a keyword or not";
            doTemp4 = Parser.tracer.print(tmp26, 411);
            scrut6 = runtime.safeCall(Keyword.allKeywords.get(name));
            if (scrut6 instanceof Option.Some.class) {
              param06 = scrut6.value;
              keyword1 = param06;
              tmp27 = (caseScrut) => {
                let first12, first02, k, v, tmp89;
                if (globalThis.Array.isArray(caseScrut) && caseScrut.length === 2) {
                  first02 = caseScrut[0];
                  first12 = caseScrut[1];
                  k = first02;
                  v = first12;
                  tmp89 = "`" + k;
                  return tmp89 + "`"
                } else {
                  throw new globalThis.Error("match error");
                }
              };
              tmp28 = Iter.mapping(rule.keywordChoices, tmp27);
              tmp29 = Iter.joined(tmp28, ", ");
              doTemp6 = Parser.tracer.print("keyword choices: ", tmp29);
              scrut7 = runtime.safeCall(rule.keywordChoices.get(name));
              if (scrut7 instanceof Option.Some.class) {
                param09 = scrut7.value;
                rest2 = param09;
                tmp30 = "found a rule starting with `" + name;
                tmp31 = tmp30 + "`";
                tmp32 = Parser.tracer.print(tmp31, 418);
                tmp33 = "the rest of the rule: " + rest2.display;
                tmp34 = Parser.tracer.print(tmp33, 419);
                tmp35 = consume();
                return parseRule(0, rest2, opened)
              } else if (scrut7 instanceof Option.None.class) {
                tmp36 = "no rule starting with `" + name;
                tmp37 = tmp36 + "` was found";
                doTemp7 = Parser.tracer.print(tmp37, 424);
                tmp38 = "the left prec of `" + name;
                tmp39 = tmp38 + "` is ";
                tmp40 = tmp39 + keyword1.leftPrec;
                doTemp8 = Parser.tracer.print(tmp40, 436);
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
                    scrut10 = keyword1.leftPrecOrMin > prec;
                    if (scrut10 === true) {
                      tmp41 = simpleExpr(keyword1.rightPrecOrMax, opened);
                      acc1 = tmp41;
                      tmp42 = parseRule(prec, rest1, opened);
                      tree2 = tmp42;
                      return runtime.safeCall(process1(acc1, tree2))
                    } else {
                      scrut8 = rule.endChoice;
                      if (scrut8 instanceof Option.Some.class) {
                        param07 = scrut8.value;
                        value2 = param07;
                        tmp43 = Parser.tracer.print("found end choice", 442);
                        return value2
                      } else {
                        return Predef.notImplementedError
                      }
                    }
                  } else {
                    scrut8 = rule.endChoice;
                    if (scrut8 instanceof Option.Some.class) {
                      param07 = scrut8.value;
                      value2 = param07;
                      tmp44 = Parser.tracer.print("found end choice", 442);
                      return value2
                    } else {
                      return Predef.notImplementedError
                    }
                  }
                } else {
                  scrut8 = rule.endChoice;
                  if (scrut8 instanceof Option.Some.class) {
                    param07 = scrut8.value;
                    value2 = param07;
                    tmp45 = Parser.tracer.print("found end choice", 442);
                    return value2
                  } else {
                    return Predef.notImplementedError
                  }
                }
              } else {
                tmp46 = "\"" + name;
                tmp47 = tmp46 + "\" is not a keyword";
                doTemp5 = Parser.tracer.print(tmp47, 445);
                other = param02;
                tmp48 = TokenHelpers.preview(current);
                tmp49 = "try parse an expression from " + tmp48;
                doTemp = Parser.tracer.print(tmp49, 447);
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
                      tmp50 = typeExpr;
                    } else {
                      tmp50 = simpleExpr;
                    }
                    acc = runtime.safeCall(tmp50(prec, opened));
                    scrut5 = Tree.nonEmptyError(acc);
                    if (scrut5 === true) {
                      tmp51 = parseRule(prec, rest, opened);
                      tree1 = tmp51;
                      tmp52 = Tree.summary(acc);
                      tmp53 = "acc: " + tmp52;
                      tmp54 = Parser.tracer.print(tmp53, 466);
                      tmp55 = Tree.summary(tree1);
                      tmp56 = "tree: " + tmp55;
                      tmp57 = Parser.tracer.print(tmp56, 467);
                      return runtime.safeCall(process(acc, tree1))
                    } else {
                      doTemp3 = Parser.tracer.print("fallback to end choice", 469);
                      doTemp1 = Parser.tracer.print("no expression choice", 470);
                      scrut3 = rule.endChoice;
                      if (scrut3 instanceof Option.Some.class) {
                        param03 = scrut3.value;
                        value1 = param03;
                        tmp58 = Parser.tracer.print("found end choice", 472);
                        return value1
                      } else {
                        doTemp2 = Parser.tracer.print("no end choice", 474);
                        throw new globalThis.Error("match error");
                      }
                    }
                  } else {
                    doTemp1 = Parser.tracer.print("no expression choice", 470);
                    scrut3 = rule.endChoice;
                    if (scrut3 instanceof Option.Some.class) {
                      param03 = scrut3.value;
                      value1 = param03;
                      tmp59 = Parser.tracer.print("found end choice", 472);
                      return value1
                    } else {
                      doTemp2 = Parser.tracer.print("no end choice", 474);
                      throw new globalThis.Error("match error");
                    }
                  }
                } else {
                  doTemp1 = Parser.tracer.print("no expression choice", 470);
                  scrut3 = rule.endChoice;
                  if (scrut3 instanceof Option.Some.class) {
                    param03 = scrut3.value;
                    value1 = param03;
                    tmp60 = Parser.tracer.print("found end choice", 472);
                    return value1
                  } else {
                    doTemp2 = Parser.tracer.print("no end choice", 474);
                    throw new globalThis.Error("match error");
                  }
                }
              }
            } else {
              tmp61 = "\"" + name;
              tmp62 = tmp61 + "\" is not a keyword";
              doTemp5 = Parser.tracer.print(tmp62, 445);
              other = param02;
              tmp63 = TokenHelpers.preview(current);
              tmp64 = "try parse an expression from " + tmp63;
              doTemp = Parser.tracer.print(tmp64, 447);
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
                    tmp65 = typeExpr;
                  } else {
                    tmp65 = simpleExpr;
                  }
                  acc = runtime.safeCall(tmp65(prec, opened));
                  scrut5 = Tree.nonEmptyError(acc);
                  if (scrut5 === true) {
                    tmp66 = parseRule(prec, rest, opened);
                    tree1 = tmp66;
                    tmp67 = Tree.summary(acc);
                    tmp68 = "acc: " + tmp67;
                    tmp69 = Parser.tracer.print(tmp68, 466);
                    tmp70 = Tree.summary(tree1);
                    tmp71 = "tree: " + tmp70;
                    tmp72 = Parser.tracer.print(tmp71, 467);
                    return runtime.safeCall(process(acc, tree1))
                  } else {
                    doTemp3 = Parser.tracer.print("fallback to end choice", 469);
                    doTemp1 = Parser.tracer.print("no expression choice", 470);
                    scrut3 = rule.endChoice;
                    if (scrut3 instanceof Option.Some.class) {
                      param03 = scrut3.value;
                      value1 = param03;
                      tmp73 = Parser.tracer.print("found end choice", 472);
                      return value1
                    } else {
                      doTemp2 = Parser.tracer.print("no end choice", 474);
                      throw new globalThis.Error("match error");
                    }
                  }
                } else {
                  doTemp1 = Parser.tracer.print("no expression choice", 470);
                  scrut3 = rule.endChoice;
                  if (scrut3 instanceof Option.Some.class) {
                    param03 = scrut3.value;
                    value1 = param03;
                    tmp74 = Parser.tracer.print("found end choice", 472);
                    return value1
                  } else {
                    doTemp2 = Parser.tracer.print("no end choice", 474);
                    throw new globalThis.Error("match error");
                  }
                }
              } else {
                doTemp1 = Parser.tracer.print("no expression choice", 470);
                scrut3 = rule.endChoice;
                if (scrut3 instanceof Option.Some.class) {
                  param03 = scrut3.value;
                  value1 = param03;
                  tmp75 = Parser.tracer.print("found end choice", 472);
                  return value1
                } else {
                  doTemp2 = Parser.tracer.print("no end choice", 474);
                  throw new globalThis.Error("match error");
                }
              }
            }
          } else {
            other = param02;
            tmp76 = TokenHelpers.preview(current);
            tmp77 = "try parse an expression from " + tmp76;
            doTemp = Parser.tracer.print(tmp77, 447);
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
                  tmp78 = typeExpr;
                } else {
                  tmp78 = simpleExpr;
                }
                acc = runtime.safeCall(tmp78(prec, opened));
                scrut5 = Tree.nonEmptyError(acc);
                if (scrut5 === true) {
                  tmp79 = parseRule(prec, rest, opened);
                  tree1 = tmp79;
                  tmp80 = Tree.summary(acc);
                  tmp81 = "acc: " + tmp80;
                  tmp82 = Parser.tracer.print(tmp81, 466);
                  tmp83 = Tree.summary(tree1);
                  tmp84 = "tree: " + tmp83;
                  tmp85 = Parser.tracer.print(tmp84, 467);
                  return runtime.safeCall(process(acc, tree1))
                } else {
                  doTemp3 = Parser.tracer.print("fallback to end choice", 469);
                  doTemp1 = Parser.tracer.print("no expression choice", 470);
                  scrut3 = rule.endChoice;
                  if (scrut3 instanceof Option.Some.class) {
                    param03 = scrut3.value;
                    value1 = param03;
                    tmp86 = Parser.tracer.print("found end choice", 472);
                    return value1
                  } else {
                    doTemp2 = Parser.tracer.print("no end choice", 474);
                    throw new globalThis.Error("match error");
                  }
                }
              } else {
                doTemp1 = Parser.tracer.print("no expression choice", 470);
                scrut3 = rule.endChoice;
                if (scrut3 instanceof Option.Some.class) {
                  param03 = scrut3.value;
                  value1 = param03;
                  tmp87 = Parser.tracer.print("found end choice", 472);
                  return value1
                } else {
                  doTemp2 = Parser.tracer.print("no end choice", 474);
                  throw new globalThis.Error("match error");
                }
              }
            } else {
              doTemp1 = Parser.tracer.print("no expression choice", 470);
              scrut3 = rule.endChoice;
              if (scrut3 instanceof Option.Some.class) {
                param03 = scrut3.value;
                value1 = param03;
                tmp88 = Parser.tracer.print("found end choice", 472);
                return value1
              } else {
                doTemp2 = Parser.tracer.print("no end choice", 474);
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
    simpleExpr = function simpleExpr(prec, bracket) {
      let tmp4, tmp5, tmp6, tmp7, tmp8;
      tmp4 = "simple expression <<< " + prec;
      tmp5 = tmp4 + " ";
      tmp6 = TokenHelpers.preview(current);
      tmp7 = tmp5 + tmp6;
      tmp8 = () => {
        let scrut1, param01, param11, token1, param02, kind, param03, kind$_, scrut2, param04, kind1, content, content1, scrut3, message1, param05, param12, token2, message2, param06, kind$_1, scrut4, param07, param13, kind2, literal, param08, param14, name, symbolic, scrut5, param09, keyword1, scrut6, param010, rule, acc, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20, tmp21, tmp22, tmp23, tmp24, tmp25, tmp26, tmp27, tmp28, tmp29, tmp30, tmp31, tmp32, tmp33;
        tmp9 = yeetSpaces();
        scrut1 = tmp9;
        if (scrut1 instanceof Stack.Cons.class) {
          param01 = scrut1.head;
          param11 = scrut1.tail;
          if (param01 instanceof Token.Identifier.class) {
            param08 = param01.name;
            param14 = param01.symbolic;
            name = param08;
            symbolic = param14;
            scrut5 = runtime.safeCall(Keyword.allKeywords.get(name));
            if (scrut5 instanceof Option.Some.class) {
              param09 = scrut5.value;
              keyword1 = param09;
              scrut6 = runtime.safeCall(Parser.exprRules.keywordChoices.get(name));
              if (scrut6 instanceof Option.Some.class) {
                param010 = scrut6.value;
                rule = param010;
                tmp10 = consume();
                tmp11 = parseRule(keyword1.rightPrecOrMax, rule, bracket);
                acc = tmp11;
                return exprCont(acc, prec, bracket)
              } else if (scrut6 instanceof Option.None.class) {
                tmp12 = "no rule starting with " + name;
                tmp13 = Parser.tracer.print(tmp12, 491);
                return Tree.empty
              } else {
                token1 = param01;
                tmp14 = "unrecognized token: " + token1;
                return Tree.error(tmp14)
              }
            } else if (scrut5 instanceof Option.None.class) {
              tmp15 = consume();
              tmp16 = Tree.Ident(name, symbolic);
              return exprCont(tmp16, prec, bracket)
            } else {
              token1 = param01;
              tmp17 = "unrecognized token: " + token1;
              return Tree.error(tmp17)
            }
          } else if (param01 instanceof Token.Literal.class) {
            param07 = param01.kind;
            param13 = param01.literal;
            kind2 = param07;
            literal = param13;
            tmp18 = consume();
            tmp19 = Tree.Literal(kind2, literal);
            return exprCont(tmp19, prec, bracket)
          } else if (param01 instanceof Token.Open.class) {
            param04 = param01.kind;
            kind1 = param04;
            tmp20 = consume();
            tmp21 = Option.Some(kind1);
            content1 = simpleExpr(0, tmp21);
            tmp22 = yeetSpaces();
            scrut3 = tmp22;
            if (scrut3 instanceof Stack.Cons.class) {
              param05 = scrut3.head;
              param12 = scrut3.tail;
              if (param05 instanceof Token.Close.class) {
                param06 = param05.kind;
                kind$_1 = param06;
                scrut4 = kind1 == kind$_1;
                if (scrut4 === true) {
                  tmp23 = "closing bracket " + kind1;
                  tmp24 = Parser.tracer.print(tmp23, 506);
                  tmp25 = consume();
                  if (content1 instanceof Tree.Empty.class) {
                    if (kind1 instanceof Token.Round.class) {
                      tmp26 = Tree.Tuple(Stack.Nil);
                    } else if (kind1 instanceof Token.Square.class) {
                      tmp26 = Tree.Bracketed(Token.Square, Stack.Nil);
                    } else if (kind1 instanceof Token.BeginEnd.class) {
                      tmp26 = Tree.Sequence(Stack.Nil);
                    } else {
                      tmp26 = content1;
                    }
                  } else {
                    if (kind1 instanceof Token.Square.class) {
                      tmp26 = Tree.Bracketed(Token.Square, content1);
                    } else {
                      tmp26 = content1;
                    }
                  }
                  tmp27 = tmp26;
                } else {
                  tmp27 = Tree.Error(content1, "mismatched brackets");
                }
              } else {
                token2 = param05;
                tmp28 = "expect a close bracket instead of " + token2;
                message2 = tmp28;
                tmp29 = Parser.tracer.print(message2, 519);
                tmp27 = Tree.Error(content1, message2);
              }
            } else if (scrut3 instanceof Stack.Nil.class) {
              message1 = "expect a close bracket instead of EOF";
              tmp30 = Parser.tracer.print(message1, 523);
              tmp27 = Tree.Error(content1, message1);
            } else {
              throw new globalThis.Error("match error");
            }
            content = tmp27;
            return exprCont(content, prec, bracket)
          } else if (param01 instanceof Token.Close.class) {
            param02 = param01.kind;
            kind = param02;
            if (bracket instanceof Option.Some.class) {
              param03 = bracket.value;
              kind$_ = param03;
              scrut2 = kind == kind$_;
              if (scrut2 === true) {
                return Tree.Empty()
              } else {
                return Tree.error("mismatched brackets")
              }
            } else if (bracket instanceof Option.None.class) {
              tmp31 = Parser.tracer.print("missing close bracket", 531);
              return Tree.error("missing close bracket")
            } else {
              token1 = param01;
              tmp32 = "unrecognized token: " + token1;
              return Tree.error(tmp32)
            }
          } else {
            token1 = param01;
            tmp33 = "unrecognized token: " + token1;
            return Tree.error(tmp33)
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
    exprCont = function exprCont(acc, prec, bracket) {
      let scrut1, doTemp, doTemp1, param01, param11, token1, scrut2, scrut3, rhs, doTemp2, scrut4, doTemp3, scrut5, param02, kind, doTemp4, param03, kind$_, scrut6, param04, param12, name, scrut7, doTemp5, scrut8, first1, first0, leftPrec, rightPrec, doTemp6, scrut9, op3, rhs1, name1, scrut10, param05, keyword1, doTemp7, doTemp8, scrut11, param06, rule, doTemp9, scrut12, scrut13, param07, first2, first11, first01, isType, process, rest, rhs2, acc$_, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20, tmp21, tmp22, tmp23, tmp24, tmp25, tmp26, tmp27, tmp28, tmp29, tmp30, tmp31, tmp32, tmp33, tmp34, tmp35, tmp36, tmp37, tmp38, tmp39, tmp40, tmp41, tmp42, tmp43, tmp44, tmp45, tmp46, tmp47, tmp48, tmp49, tmp50, tmp51, tmp52, tmp53, tmp54, tmp55, tmp56, tmp57, tmp58, tmp59, tmp60, tmp61, tmp62, tmp63, tmp64, tmp65, tmp66, tmp67, tmp68, tmp69, tmp70, tmp71, tmp72, tmp73, tmp74, tmp75, tmp76, tmp77, tmp78, tmp79, tmp80, tmp81, tmp82, tmp83, tmp84, tmp85, tmp86, tmp87, tmp88, tmp89, tmp90, tmp91, tmp92, tmp93, tmp94, tmp95, tmp96, tmp97, tmp98, tmp99, tmp100, tmp101, tmp102, tmp103, tmp104, tmp105, tmp106, tmp107, tmp108, tmp109, tmp110, tmp111, tmp112, tmp113, tmp114, tmp115, tmp116, tmp117, tmp118, tmp119, tmp120, tmp121, tmp122, tmp123, tmp124, tmp125, tmp126, tmp127, tmp128, tmp129, tmp130, tmp131, tmp132, tmp133, tmp134, tmp135, tmp136, tmp137, tmp138, tmp139, tmp140, tmp141, tmp142, tmp143, tmp144, tmp145, tmp146, tmp147, tmp148, tmp149, tmp150, tmp151, tmp152, tmp153, tmp154, tmp155, tmp156, tmp157, tmp158, tmp159, tmp160, tmp161, tmp162, tmp163, tmp164, tmp165;
      tmp4 = yeetSpaces();
      scrut1 = tmp4;
      tmp5 = ">>> exprCont " + prec;
      tmp6 = tmp5 + " ";
      tmp7 = Tree.summary(acc);
      tmp8 = tmp6 + tmp7;
      tmp9 = tmp8 + " <<<";
      doTemp = Parser.tracer.print(tmp9, 537);
      if (scrut1 instanceof Stack.Cons.class) {
        param01 = scrut1.head;
        param11 = scrut1.tail;
        if (param01 instanceof Token.Identifier.class) {
          param04 = param01.name;
          param12 = param01.symbolic;
          name1 = param04;
          scrut10 = runtime.safeCall(Keyword.allKeywords.get(name1));
          if (scrut10 instanceof Option.Some.class) {
            param05 = scrut10.value;
            keyword1 = param05;
            tmp10 = "found a keyword: " + name1;
            doTemp7 = Parser.tracer.print(tmp10, 539);
            scrut11 = runtime.safeCall(Parser.infixRules.keywordChoices.get(name1));
            if (scrut11 instanceof Option.Some.class) {
              param06 = scrut11.value;
              rule = param06;
              tmp11 = "found an infix keyword " + name1;
              doTemp9 = Parser.tracer.print(tmp11, 541);
              scrut12 = keyword1.leftPrecOrMin > prec;
              if (scrut12 === true) {
                scrut13 = rule.exprChoice;
                if (scrut13 instanceof Option.Some.class) {
                  param07 = scrut13.value;
                  if (globalThis.Array.isArray(param07) && param07.length === 3) {
                    first01 = param07[0];
                    first11 = param07[1];
                    first2 = param07[2];
                    isType = first01;
                    process = first11;
                    rest = first2;
                    tmp12 = consume();
                    tmp13 = simpleExpr(keyword1.rightPrecOrMin, bracket);
                    rhs2 = tmp13;
                    tmp14 = Tree.Infix(keyword1, acc, rhs2);
                    acc$_ = tmp14;
                    return exprCont(acc$_, prec, bracket)
                  } else {
                    tmp15 = "keyword `" + name1;
                    tmp16 = tmp15 + "` does not have infix rules";
                    doTemp8 = Parser.tracer.print(tmp16, 549);
                    name = param04;
                    if (param12 === true) {
                      scrut7 = runtime.safeCall(Keyword.allKeywords.get(name));
                      if (scrut7 instanceof Option.None.class) {
                        tmp17 = "found an operator \"" + name;
                        tmp18 = tmp17 + "\"";
                        doTemp5 = Parser.tracer.print(tmp18, 551);
                        scrut8 = Precedence.opPrec(name);
                        if (globalThis.Array.isArray(scrut8) && scrut8.length === 2) {
                          first0 = scrut8[0];
                          first1 = scrut8[1];
                          leftPrec = first0;
                          rightPrec = first1;
                          tmp19 = "its precedence is " + leftPrec;
                          doTemp6 = Parser.tracer.print(tmp19, 553);
                          scrut9 = leftPrec > prec;
                          if (scrut9 === true) {
                            tmp20 = consume();
                            tmp21 = Tree.Ident(name, true);
                            op3 = tmp21;
                            tmp22 = simpleExpr(rightPrec, bracket);
                            rhs1 = tmp22;
                            tmp23 = Stack.Cons(rhs1, Stack.Nil);
                            tmp24 = Stack.Cons(acc, tmp23);
                            tmp25 = Tree.App(op3, tmp24);
                            return exprCont(tmp25, prec, bracket)
                          } else {
                            return acc
                          }
                        } else {
                          token1 = param01;
                          scrut2 = Precedence.appPrec > prec;
                          if (scrut2 === true) {
                            tmp26 = Parser.tracer.print("found an application", 591);
                            scrut3 = simpleExpr(Precedence.appPrec, bracket);
                            if (scrut3 instanceof Tree.Empty.class) {
                              return acc
                            } else if (scrut3 instanceof Tree.Error.class) {
                              return acc
                            } else {
                              rhs = scrut3;
                              tmp27 = Stack.Cons(rhs, Stack.Nil);
                              tmp28 = Tree.App(acc, tmp27);
                              return exprCont(tmp28, prec, bracket)
                            }
                          } else {
                            tmp29 = "cannot consume " + token1;
                            tmp30 = Parser.tracer.print(tmp29, 597);
                            return acc
                          }
                        }
                      } else {
                        token1 = param01;
                        scrut2 = Precedence.appPrec > prec;
                        if (scrut2 === true) {
                          tmp31 = Parser.tracer.print("found an application", 591);
                          scrut3 = simpleExpr(Precedence.appPrec, bracket);
                          if (scrut3 instanceof Tree.Empty.class) {
                            return acc
                          } else if (scrut3 instanceof Tree.Error.class) {
                            return acc
                          } else {
                            rhs = scrut3;
                            tmp32 = Stack.Cons(rhs, Stack.Nil);
                            tmp33 = Tree.App(acc, tmp32);
                            return exprCont(tmp33, prec, bracket)
                          }
                        } else {
                          tmp34 = "cannot consume " + token1;
                          tmp35 = Parser.tracer.print(tmp34, 597);
                          return acc
                        }
                      }
                    } else {
                      token1 = param01;
                      scrut2 = Precedence.appPrec > prec;
                      if (scrut2 === true) {
                        tmp36 = Parser.tracer.print("found an application", 591);
                        scrut3 = simpleExpr(Precedence.appPrec, bracket);
                        if (scrut3 instanceof Tree.Empty.class) {
                          return acc
                        } else if (scrut3 instanceof Tree.Error.class) {
                          return acc
                        } else {
                          rhs = scrut3;
                          tmp37 = Stack.Cons(rhs, Stack.Nil);
                          tmp38 = Tree.App(acc, tmp37);
                          return exprCont(tmp38, prec, bracket)
                        }
                      } else {
                        tmp39 = "cannot consume " + token1;
                        tmp40 = Parser.tracer.print(tmp39, 597);
                        return acc
                      }
                    }
                  }
                } else if (scrut13 instanceof Option.None.class) {
                  return acc
                } else {
                  tmp41 = "keyword `" + name1;
                  tmp42 = tmp41 + "` does not have infix rules";
                  doTemp8 = Parser.tracer.print(tmp42, 549);
                  name = param04;
                  if (param12 === true) {
                    scrut7 = runtime.safeCall(Keyword.allKeywords.get(name));
                    if (scrut7 instanceof Option.None.class) {
                      tmp43 = "found an operator \"" + name;
                      tmp44 = tmp43 + "\"";
                      doTemp5 = Parser.tracer.print(tmp44, 551);
                      scrut8 = Precedence.opPrec(name);
                      if (globalThis.Array.isArray(scrut8) && scrut8.length === 2) {
                        first0 = scrut8[0];
                        first1 = scrut8[1];
                        leftPrec = first0;
                        rightPrec = first1;
                        tmp45 = "its precedence is " + leftPrec;
                        doTemp6 = Parser.tracer.print(tmp45, 553);
                        scrut9 = leftPrec > prec;
                        if (scrut9 === true) {
                          tmp46 = consume();
                          tmp47 = Tree.Ident(name, true);
                          op3 = tmp47;
                          tmp48 = simpleExpr(rightPrec, bracket);
                          rhs1 = tmp48;
                          tmp49 = Stack.Cons(rhs1, Stack.Nil);
                          tmp50 = Stack.Cons(acc, tmp49);
                          tmp51 = Tree.App(op3, tmp50);
                          return exprCont(tmp51, prec, bracket)
                        } else {
                          return acc
                        }
                      } else {
                        token1 = param01;
                        scrut2 = Precedence.appPrec > prec;
                        if (scrut2 === true) {
                          tmp52 = Parser.tracer.print("found an application", 591);
                          scrut3 = simpleExpr(Precedence.appPrec, bracket);
                          if (scrut3 instanceof Tree.Empty.class) {
                            return acc
                          } else if (scrut3 instanceof Tree.Error.class) {
                            return acc
                          } else {
                            rhs = scrut3;
                            tmp53 = Stack.Cons(rhs, Stack.Nil);
                            tmp54 = Tree.App(acc, tmp53);
                            return exprCont(tmp54, prec, bracket)
                          }
                        } else {
                          tmp55 = "cannot consume " + token1;
                          tmp56 = Parser.tracer.print(tmp55, 597);
                          return acc
                        }
                      }
                    } else {
                      token1 = param01;
                      scrut2 = Precedence.appPrec > prec;
                      if (scrut2 === true) {
                        tmp57 = Parser.tracer.print("found an application", 591);
                        scrut3 = simpleExpr(Precedence.appPrec, bracket);
                        if (scrut3 instanceof Tree.Empty.class) {
                          return acc
                        } else if (scrut3 instanceof Tree.Error.class) {
                          return acc
                        } else {
                          rhs = scrut3;
                          tmp58 = Stack.Cons(rhs, Stack.Nil);
                          tmp59 = Tree.App(acc, tmp58);
                          return exprCont(tmp59, prec, bracket)
                        }
                      } else {
                        tmp60 = "cannot consume " + token1;
                        tmp61 = Parser.tracer.print(tmp60, 597);
                        return acc
                      }
                    }
                  } else {
                    token1 = param01;
                    scrut2 = Precedence.appPrec > prec;
                    if (scrut2 === true) {
                      tmp62 = Parser.tracer.print("found an application", 591);
                      scrut3 = simpleExpr(Precedence.appPrec, bracket);
                      if (scrut3 instanceof Tree.Empty.class) {
                        return acc
                      } else if (scrut3 instanceof Tree.Error.class) {
                        return acc
                      } else {
                        rhs = scrut3;
                        tmp63 = Stack.Cons(rhs, Stack.Nil);
                        tmp64 = Tree.App(acc, tmp63);
                        return exprCont(tmp64, prec, bracket)
                      }
                    } else {
                      tmp65 = "cannot consume " + token1;
                      tmp66 = Parser.tracer.print(tmp65, 597);
                      return acc
                    }
                  }
                }
              } else {
                tmp67 = "keyword `" + name1;
                tmp68 = tmp67 + "` does not have infix rules";
                doTemp8 = Parser.tracer.print(tmp68, 549);
                name = param04;
                if (param12 === true) {
                  scrut7 = runtime.safeCall(Keyword.allKeywords.get(name));
                  if (scrut7 instanceof Option.None.class) {
                    tmp69 = "found an operator \"" + name;
                    tmp70 = tmp69 + "\"";
                    doTemp5 = Parser.tracer.print(tmp70, 551);
                    scrut8 = Precedence.opPrec(name);
                    if (globalThis.Array.isArray(scrut8) && scrut8.length === 2) {
                      first0 = scrut8[0];
                      first1 = scrut8[1];
                      leftPrec = first0;
                      rightPrec = first1;
                      tmp71 = "its precedence is " + leftPrec;
                      doTemp6 = Parser.tracer.print(tmp71, 553);
                      scrut9 = leftPrec > prec;
                      if (scrut9 === true) {
                        tmp72 = consume();
                        tmp73 = Tree.Ident(name, true);
                        op3 = tmp73;
                        tmp74 = simpleExpr(rightPrec, bracket);
                        rhs1 = tmp74;
                        tmp75 = Stack.Cons(rhs1, Stack.Nil);
                        tmp76 = Stack.Cons(acc, tmp75);
                        tmp77 = Tree.App(op3, tmp76);
                        return exprCont(tmp77, prec, bracket)
                      } else {
                        return acc
                      }
                    } else {
                      token1 = param01;
                      scrut2 = Precedence.appPrec > prec;
                      if (scrut2 === true) {
                        tmp78 = Parser.tracer.print("found an application", 591);
                        scrut3 = simpleExpr(Precedence.appPrec, bracket);
                        if (scrut3 instanceof Tree.Empty.class) {
                          return acc
                        } else if (scrut3 instanceof Tree.Error.class) {
                          return acc
                        } else {
                          rhs = scrut3;
                          tmp79 = Stack.Cons(rhs, Stack.Nil);
                          tmp80 = Tree.App(acc, tmp79);
                          return exprCont(tmp80, prec, bracket)
                        }
                      } else {
                        tmp81 = "cannot consume " + token1;
                        tmp82 = Parser.tracer.print(tmp81, 597);
                        return acc
                      }
                    }
                  } else {
                    token1 = param01;
                    scrut2 = Precedence.appPrec > prec;
                    if (scrut2 === true) {
                      tmp83 = Parser.tracer.print("found an application", 591);
                      scrut3 = simpleExpr(Precedence.appPrec, bracket);
                      if (scrut3 instanceof Tree.Empty.class) {
                        return acc
                      } else if (scrut3 instanceof Tree.Error.class) {
                        return acc
                      } else {
                        rhs = scrut3;
                        tmp84 = Stack.Cons(rhs, Stack.Nil);
                        tmp85 = Tree.App(acc, tmp84);
                        return exprCont(tmp85, prec, bracket)
                      }
                    } else {
                      tmp86 = "cannot consume " + token1;
                      tmp87 = Parser.tracer.print(tmp86, 597);
                      return acc
                    }
                  }
                } else {
                  token1 = param01;
                  scrut2 = Precedence.appPrec > prec;
                  if (scrut2 === true) {
                    tmp88 = Parser.tracer.print("found an application", 591);
                    scrut3 = simpleExpr(Precedence.appPrec, bracket);
                    if (scrut3 instanceof Tree.Empty.class) {
                      return acc
                    } else if (scrut3 instanceof Tree.Error.class) {
                      return acc
                    } else {
                      rhs = scrut3;
                      tmp89 = Stack.Cons(rhs, Stack.Nil);
                      tmp90 = Tree.App(acc, tmp89);
                      return exprCont(tmp90, prec, bracket)
                    }
                  } else {
                    tmp91 = "cannot consume " + token1;
                    tmp92 = Parser.tracer.print(tmp91, 597);
                    return acc
                  }
                }
              }
            } else {
              tmp93 = "keyword `" + name1;
              tmp94 = tmp93 + "` does not have infix rules";
              doTemp8 = Parser.tracer.print(tmp94, 549);
              name = param04;
              if (param12 === true) {
                scrut7 = runtime.safeCall(Keyword.allKeywords.get(name));
                if (scrut7 instanceof Option.None.class) {
                  tmp95 = "found an operator \"" + name;
                  tmp96 = tmp95 + "\"";
                  doTemp5 = Parser.tracer.print(tmp96, 551);
                  scrut8 = Precedence.opPrec(name);
                  if (globalThis.Array.isArray(scrut8) && scrut8.length === 2) {
                    first0 = scrut8[0];
                    first1 = scrut8[1];
                    leftPrec = first0;
                    rightPrec = first1;
                    tmp97 = "its precedence is " + leftPrec;
                    doTemp6 = Parser.tracer.print(tmp97, 553);
                    scrut9 = leftPrec > prec;
                    if (scrut9 === true) {
                      tmp98 = consume();
                      tmp99 = Tree.Ident(name, true);
                      op3 = tmp99;
                      tmp100 = simpleExpr(rightPrec, bracket);
                      rhs1 = tmp100;
                      tmp101 = Stack.Cons(rhs1, Stack.Nil);
                      tmp102 = Stack.Cons(acc, tmp101);
                      tmp103 = Tree.App(op3, tmp102);
                      return exprCont(tmp103, prec, bracket)
                    } else {
                      return acc
                    }
                  } else {
                    token1 = param01;
                    scrut2 = Precedence.appPrec > prec;
                    if (scrut2 === true) {
                      tmp104 = Parser.tracer.print("found an application", 591);
                      scrut3 = simpleExpr(Precedence.appPrec, bracket);
                      if (scrut3 instanceof Tree.Empty.class) {
                        return acc
                      } else if (scrut3 instanceof Tree.Error.class) {
                        return acc
                      } else {
                        rhs = scrut3;
                        tmp105 = Stack.Cons(rhs, Stack.Nil);
                        tmp106 = Tree.App(acc, tmp105);
                        return exprCont(tmp106, prec, bracket)
                      }
                    } else {
                      tmp107 = "cannot consume " + token1;
                      tmp108 = Parser.tracer.print(tmp107, 597);
                      return acc
                    }
                  }
                } else {
                  token1 = param01;
                  scrut2 = Precedence.appPrec > prec;
                  if (scrut2 === true) {
                    tmp109 = Parser.tracer.print("found an application", 591);
                    scrut3 = simpleExpr(Precedence.appPrec, bracket);
                    if (scrut3 instanceof Tree.Empty.class) {
                      return acc
                    } else if (scrut3 instanceof Tree.Error.class) {
                      return acc
                    } else {
                      rhs = scrut3;
                      tmp110 = Stack.Cons(rhs, Stack.Nil);
                      tmp111 = Tree.App(acc, tmp110);
                      return exprCont(tmp111, prec, bracket)
                    }
                  } else {
                    tmp112 = "cannot consume " + token1;
                    tmp113 = Parser.tracer.print(tmp112, 597);
                    return acc
                  }
                }
              } else {
                token1 = param01;
                scrut2 = Precedence.appPrec > prec;
                if (scrut2 === true) {
                  tmp114 = Parser.tracer.print("found an application", 591);
                  scrut3 = simpleExpr(Precedence.appPrec, bracket);
                  if (scrut3 instanceof Tree.Empty.class) {
                    return acc
                  } else if (scrut3 instanceof Tree.Error.class) {
                    return acc
                  } else {
                    rhs = scrut3;
                    tmp115 = Stack.Cons(rhs, Stack.Nil);
                    tmp116 = Tree.App(acc, tmp115);
                    return exprCont(tmp116, prec, bracket)
                  }
                } else {
                  tmp117 = "cannot consume " + token1;
                  tmp118 = Parser.tracer.print(tmp117, 597);
                  return acc
                }
              }
            }
          } else {
            name = param04;
            if (param12 === true) {
              scrut7 = runtime.safeCall(Keyword.allKeywords.get(name));
              if (scrut7 instanceof Option.None.class) {
                tmp119 = "found an operator \"" + name;
                tmp120 = tmp119 + "\"";
                doTemp5 = Parser.tracer.print(tmp120, 551);
                scrut8 = Precedence.opPrec(name);
                if (globalThis.Array.isArray(scrut8) && scrut8.length === 2) {
                  first0 = scrut8[0];
                  first1 = scrut8[1];
                  leftPrec = first0;
                  rightPrec = first1;
                  tmp121 = "its precedence is " + leftPrec;
                  doTemp6 = Parser.tracer.print(tmp121, 553);
                  scrut9 = leftPrec > prec;
                  if (scrut9 === true) {
                    tmp122 = consume();
                    tmp123 = Tree.Ident(name, true);
                    op3 = tmp123;
                    tmp124 = simpleExpr(rightPrec, bracket);
                    rhs1 = tmp124;
                    tmp125 = Stack.Cons(rhs1, Stack.Nil);
                    tmp126 = Stack.Cons(acc, tmp125);
                    tmp127 = Tree.App(op3, tmp126);
                    return exprCont(tmp127, prec, bracket)
                  } else {
                    return acc
                  }
                } else {
                  token1 = param01;
                  scrut2 = Precedence.appPrec > prec;
                  if (scrut2 === true) {
                    tmp128 = Parser.tracer.print("found an application", 591);
                    scrut3 = simpleExpr(Precedence.appPrec, bracket);
                    if (scrut3 instanceof Tree.Empty.class) {
                      return acc
                    } else if (scrut3 instanceof Tree.Error.class) {
                      return acc
                    } else {
                      rhs = scrut3;
                      tmp129 = Stack.Cons(rhs, Stack.Nil);
                      tmp130 = Tree.App(acc, tmp129);
                      return exprCont(tmp130, prec, bracket)
                    }
                  } else {
                    tmp131 = "cannot consume " + token1;
                    tmp132 = Parser.tracer.print(tmp131, 597);
                    return acc
                  }
                }
              } else {
                token1 = param01;
                scrut2 = Precedence.appPrec > prec;
                if (scrut2 === true) {
                  tmp133 = Parser.tracer.print("found an application", 591);
                  scrut3 = simpleExpr(Precedence.appPrec, bracket);
                  if (scrut3 instanceof Tree.Empty.class) {
                    return acc
                  } else if (scrut3 instanceof Tree.Error.class) {
                    return acc
                  } else {
                    rhs = scrut3;
                    tmp134 = Stack.Cons(rhs, Stack.Nil);
                    tmp135 = Tree.App(acc, tmp134);
                    return exprCont(tmp135, prec, bracket)
                  }
                } else {
                  tmp136 = "cannot consume " + token1;
                  tmp137 = Parser.tracer.print(tmp136, 597);
                  return acc
                }
              }
            } else {
              token1 = param01;
              scrut2 = Precedence.appPrec > prec;
              if (scrut2 === true) {
                tmp138 = Parser.tracer.print("found an application", 591);
                scrut3 = simpleExpr(Precedence.appPrec, bracket);
                if (scrut3 instanceof Tree.Empty.class) {
                  return acc
                } else if (scrut3 instanceof Tree.Error.class) {
                  return acc
                } else {
                  rhs = scrut3;
                  tmp139 = Stack.Cons(rhs, Stack.Nil);
                  tmp140 = Tree.App(acc, tmp139);
                  return exprCont(tmp140, prec, bracket)
                }
              } else {
                tmp141 = "cannot consume " + token1;
                tmp142 = Parser.tracer.print(tmp141, 597);
                return acc
              }
            }
          }
        } else if (param01 instanceof Token.Close.class) {
          param02 = param01.kind;
          kind = param02;
          tmp143 = "found a close bracket of " + kind;
          doTemp4 = Parser.tracer.print(tmp143, 562);
          if (bracket instanceof Option.Some.class) {
            param03 = bracket.value;
            kind$_ = param03;
            scrut6 = kind == kind$_;
            if (scrut6 === true) {
              return acc
            } else {
              return Tree.Error(acc, "mismatched brackets")
            }
          } else if (bracket instanceof Option.None.class) {
            return Tree.Error(acc, "missing close bracket")
          } else {
            token1 = param01;
            scrut2 = Precedence.appPrec > prec;
            if (scrut2 === true) {
              tmp144 = Parser.tracer.print("found an application", 591);
              scrut3 = simpleExpr(Precedence.appPrec, bracket);
              if (scrut3 instanceof Tree.Empty.class) {
                return acc
              } else if (scrut3 instanceof Tree.Error.class) {
                return acc
              } else {
                rhs = scrut3;
                tmp145 = Stack.Cons(rhs, Stack.Nil);
                tmp146 = Tree.App(acc, tmp145);
                return exprCont(tmp146, prec, bracket)
              }
            } else {
              tmp147 = "cannot consume " + token1;
              tmp148 = Parser.tracer.print(tmp147, 597);
              return acc
            }
          }
        } else if (param01 instanceof Token.Semicolon.class) {
          doTemp3 = Parser.tracer.print("found a semicolon", 569);
          tmp149 = Option.unsafe.get(Precedence.Keywords._semicolon.leftPrec);
          scrut5 = tmp149 > prec;
          if (scrut5 === true) {
            tmp150 = consume();
            tmp151 = Option.unsafe.get(Precedence.Keywords._semicolon.rightPrec);
            tmp152 = simpleExpr(tmp151, bracket);
            tmp153 = Tree.sequenceWithHead(tmp152, acc);
            return exprCont(tmp153, prec, bracket)
          } else {
            tmp154 = Parser.tracer.print("cannot consume the semicolon", 576);
            return acc
          }
        } else if (param01 instanceof Token.Comma.class) {
          doTemp2 = Parser.tracer.print("found a comma", 579);
          tmp155 = Option.unsafe.get(Precedence.Keywords._comma.leftPrec);
          scrut4 = tmp155 > prec;
          if (scrut4 === true) {
            tmp156 = consume();
            tmp157 = Option.unsafe.get(Precedence.Keywords._comma.rightPrec);
            tmp158 = simpleExpr(tmp157, bracket);
            tmp159 = Tree.tupleWithHead(tmp158, acc);
            return exprCont(tmp159, prec, bracket)
          } else {
            tmp160 = Parser.tracer.print("cannot consume the comma", 586);
            return acc
          }
        } else {
          token1 = param01;
          scrut2 = Precedence.appPrec > prec;
          if (scrut2 === true) {
            tmp161 = Parser.tracer.print("found an application", 591);
            scrut3 = simpleExpr(Precedence.appPrec, bracket);
            if (scrut3 instanceof Tree.Empty.class) {
              return acc
            } else if (scrut3 instanceof Tree.Error.class) {
              return acc
            } else {
              rhs = scrut3;
              tmp162 = Stack.Cons(rhs, Stack.Nil);
              tmp163 = Tree.App(acc, tmp162);
              return exprCont(tmp163, prec, bracket)
            }
          } else {
            tmp164 = "cannot consume " + token1;
            tmp165 = Parser.tracer.print(tmp164, 597);
            return acc
          }
        }
      } else if (scrut1 instanceof Stack.Nil.class) {
        doTemp1 = Parser.tracer.print("found an EOF", 600);
        if (bracket instanceof Option.Some.class) {
          return Tree.Error(acc, "expect a close bracket instead of EOF")
        } else if (bracket instanceof Option.None.class) {
          return acc
        } else {
          throw new globalThis.Error("match error");
        }
      } else {
        throw new globalThis.Error("match error");
      }
    };
    typeExpr = function typeExpr(prec, bracket) {
      let tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10;
      tmp4 = "typeExpr <<< " + prec;
      tmp5 = tmp4 + " ";
      tmp6 = tmp5 + bracket;
      tmp7 = tmp6 + " ";
      tmp8 = TokenHelpers.preview(current);
      tmp9 = tmp7 + tmp8;
      tmp10 = () => {
        let scrut1, param01, param11, param02, param12, param03, kind, param04, kind1, kind$_, param05, openness, param06, param13, marker, param07, param14, scrut2, param08, param15, param09, param16, marker1, param010, name, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20, tmp21, tmp22, tmp23, tmp24, tmp25, tmp26, tmp27, tmp28, tmp29, tmp30, tmp31, tmp32, tmp33, tmp34, tmp35;
        tmp11 = yeetSpaces();
        scrut1 = tmp11;
        if (scrut1 instanceof Stack.Cons.class) {
          param01 = scrut1.head;
          param11 = scrut1.tail;
          if (param01 instanceof Token.TypeVariable.class) {
            param010 = param01.name;
            name = param010;
            tmp12 = consume();
            tmp13 = Tree.Ident(name);
            return typeExprCont(tmp13, prec, bracket)
          } else if (param01 instanceof Token.Identifier.class) {
            param02 = param01.name;
            param12 = param01.symbolic;
            if (param02 === "_") {
              tmp14 = consume();
              tmp15 = Tree.Underscore();
              return typeExprCont(tmp15, prec, bracket)
            } else if (param02 === "<") {
              tmp16 = consume();
              tmp17 = Option.Some(Token.Angle);
              tmp18 = typeExpr(0, tmp17);
              tmp19 = require(tmp18, (_) => {
                return Token.Identifier(">", _)
              });
              return typeExprCont(tmp19, prec, bracket)
            } else if (param02 === ">") {
              if (bracket instanceof Option.Some.class) {
                param03 = bracket.value;
                if (param03 instanceof Token.Angle.class) {
                  return Tree.Empty()
                } else {
                  kind = param03;
                  return Tree.error("mismatched brackets")
                }
              } else if (bracket instanceof Option.None.class) {
                return Tree.error("unexpected close bracket")
              } else {
                throw new globalThis.Error("match error");
              }
            } else {
              throw new globalThis.Error("match error");
            }
          } else if (param01 instanceof Token.Open.class) {
            param05 = param01.kind;
            if (param05 instanceof Token.Round.class) {
              tmp20 = consume();
              tmp21 = Option.Some(Token.Round);
              tmp22 = typeExpr(0, tmp21);
              tmp23 = Token.Close(Token.Round);
              tmp24 = require(tmp22, tmp23);
              return typeExprCont(tmp24, prec, bracket)
            } else if (param05 instanceof Token.Square.class) {
              tmp25 = consume();
              if (current instanceof Stack.Cons.class) {
                param06 = current.head;
                param13 = current.tail;
                if (param06 instanceof Token.Identifier.class) {
                  param07 = param06.name;
                  param14 = param06.symbolic;
                  if (param07 === ">") {
                    marker1 = param06;
                    tmp26 = consume();
                    tmp27 = Option.Some(marker1);
                  } else if (param07 === "<") {
                    marker = param06;
                    tmp28 = consume();
                    tmp29 = yeetSpaces();
                    scrut2 = tmp29;
                    if (scrut2 instanceof Stack.Cons.class) {
                      param08 = scrut2.head;
                      param15 = scrut2.tail;
                      if (param08 instanceof Token.Identifier.class) {
                        param09 = param08.name;
                        param16 = param08.symbolic;
                        if (param09 === "|") {
                          tmp30 = consume();
                          tmp31 = tmp30;
                        } else {
                          tmp31 = runtime.Unit;
                        }
                      } else {
                        tmp31 = runtime.Unit;
                      }
                    } else {
                      tmp31 = runtime.Unit;
                    }
                    tmp27 = Option.Some(marker);
                  } else {
                    tmp27 = Option.None;
                  }
                } else {
                  tmp27 = Option.None;
                }
              } else {
                tmp27 = Option.None;
              }
              openness = tmp27;
              tmp32 = Option.Some(Token.Square);
              tmp33 = typeExpr(0, tmp32);
              tmp34 = Token.Close(Token.Square);
              tmp35 = require(tmp33, tmp34);
              return typeExprCont(tmp35, prec, bracket)
            } else {
              throw new globalThis.Error("match error");
            }
          } else if (param01 instanceof Token.Close.class) {
            param04 = param01.kind;
            kind1 = param04;
            if (bracket instanceof Option.Some.class) {
              param03 = bracket.value;
              kind$_ = param03;
              return Tree.Empty()
            } else if (bracket instanceof Option.None.class) {
              return Tree.error("unexpected close bracket")
            } else {
              throw new globalThis.Error("match error");
            }
          } else {
            throw new globalThis.Error("match error");
          }
        } else {
          throw new globalThis.Error("match error");
        }
      };
      return runtime.safeCall(Parser.tracer.trace(tmp9, (result) => {
        let tmp11;
        tmp11 = Tree.summary(result);
        return "typeExpr >>> " + tmp11
      }, tmp10))
    };
    typeExprCont = function typeExprCont(acc, prec, bracket) {
      let scrut1, param01, param11, token1, scrut2, scrut3, rhs, doTemp, scrut4, doTemp1, scrut5, param02, param12, param03, kind, param04, kind1, kind$_, scrut6, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20, tmp21, tmp22, tmp23, tmp24, tmp25, tmp26, tmp27, tmp28, tmp29, tmp30, tmp31, tmp32, tmp33, tmp34, tmp35, tmp36, tmp37, tmp38, tmp39, tmp40, tmp41, tmp42;
      tmp4 = ">>> typeExprCont " + prec;
      tmp5 = tmp4 + " ";
      tmp6 = Tree.summary(acc);
      tmp7 = tmp5 + tmp6;
      tmp8 = tmp7 + " <<<";
      tmp9 = Parser.tracer.print(tmp8, 656);
      tmp10 = yeetSpaces();
      scrut1 = tmp10;
      if (scrut1 instanceof Stack.Cons.class) {
        param01 = scrut1.head;
        param11 = scrut1.tail;
        if (param01 instanceof Token.Close.class) {
          param04 = param01.kind;
          kind1 = param04;
          if (bracket instanceof Option.Some.class) {
            param03 = bracket.value;
            kind$_ = param03;
            scrut6 = kind1 == kind$_;
            if (scrut6 === true) {
              return acc
            } else {
              return Tree.error("mismatched brackets")
            }
          } else if (bracket instanceof Option.None.class) {
            return Tree.error("unexpected close bracket")
          } else {
            token1 = param01;
            scrut2 = Precedence.appPrec > prec;
            if (scrut2 === true) {
              tmp11 = Parser.tracer.print("found an application", 692);
              scrut3 = typeExpr(Precedence.appPrec, bracket);
              if (scrut3 instanceof Tree.Empty.class) {
                return acc
              } else if (scrut3 instanceof Tree.Error.class) {
                return acc
              } else {
                rhs = scrut3;
                tmp12 = Stack.Cons(rhs, Stack.Nil);
                tmp13 = Tree.App(acc, tmp12);
                return exprCont(tmp13, prec, bracket)
              }
            } else {
              tmp14 = "cannot consume " + token1;
              tmp15 = Parser.tracer.print(tmp14, 698);
              return acc
            }
          }
        } else if (param01 instanceof Token.Identifier.class) {
          param02 = param01.name;
          param12 = param01.symbolic;
          if (param02 === ">") {
            if (bracket instanceof Option.Some.class) {
              param03 = bracket.value;
              if (param03 instanceof Token.Angle.class) {
                return acc
              } else {
                kind = param03;
                return Tree.error("mismatched brackets")
              }
            } else if (bracket instanceof Option.None.class) {
              return Tree.error("unexpected close bracket")
            } else {
              token1 = param01;
              scrut2 = Precedence.appPrec > prec;
              if (scrut2 === true) {
                tmp16 = Parser.tracer.print("found an application", 692);
                scrut3 = typeExpr(Precedence.appPrec, bracket);
                if (scrut3 instanceof Tree.Empty.class) {
                  return acc
                } else if (scrut3 instanceof Tree.Error.class) {
                  return acc
                } else {
                  rhs = scrut3;
                  tmp17 = Stack.Cons(rhs, Stack.Nil);
                  tmp18 = Tree.App(acc, tmp17);
                  return exprCont(tmp18, prec, bracket)
                }
              } else {
                tmp19 = "cannot consume " + token1;
                tmp20 = Parser.tracer.print(tmp19, 698);
                return acc
              }
            }
          } else {
            token1 = param01;
            scrut2 = Precedence.appPrec > prec;
            if (scrut2 === true) {
              tmp21 = Parser.tracer.print("found an application", 692);
              scrut3 = typeExpr(Precedence.appPrec, bracket);
              if (scrut3 instanceof Tree.Empty.class) {
                return acc
              } else if (scrut3 instanceof Tree.Error.class) {
                return acc
              } else {
                rhs = scrut3;
                tmp22 = Stack.Cons(rhs, Stack.Nil);
                tmp23 = Tree.App(acc, tmp22);
                return exprCont(tmp23, prec, bracket)
              }
            } else {
              tmp24 = "cannot consume " + token1;
              tmp25 = Parser.tracer.print(tmp24, 698);
              return acc
            }
          }
        } else if (param01 instanceof Token.Semicolon.class) {
          doTemp1 = Parser.tracer.print("found a semicolon", 669);
          tmp26 = Option.unsafe.get(Precedence.Keywords._semicolon.leftPrec);
          scrut5 = tmp26 > prec;
          if (scrut5 === true) {
            tmp27 = consume();
            tmp28 = Option.unsafe.get(Precedence.Keywords._semicolon.rightPrec);
            tmp29 = typeExpr(tmp28, bracket);
            tmp30 = Tree.sequenceWithHead(tmp29, acc);
            return typeExprCont(tmp30, prec, bracket)
          } else {
            tmp31 = Parser.tracer.print("cannot consume the semicolon", 676);
            return acc
          }
        } else if (param01 instanceof Token.Comma.class) {
          doTemp = Parser.tracer.print("found a comma", 679);
          tmp32 = Option.unsafe.get(Precedence.Keywords._comma.leftPrec);
          scrut4 = tmp32 > prec;
          if (scrut4 === true) {
            tmp33 = consume();
            tmp34 = Option.unsafe.get(Precedence.Keywords._comma.rightPrec);
            tmp35 = typeExpr(tmp34, bracket);
            tmp36 = Tree.tupleWithHead(tmp35, acc);
            return typeExprCont(tmp36, prec, bracket)
          } else {
            tmp37 = Parser.tracer.print("cannot consume the comma", 686);
            return acc
          }
        } else {
          token1 = param01;
          scrut2 = Precedence.appPrec > prec;
          if (scrut2 === true) {
            tmp38 = Parser.tracer.print("found an application", 692);
            scrut3 = typeExpr(Precedence.appPrec, bracket);
            if (scrut3 instanceof Tree.Empty.class) {
              return acc
            } else if (scrut3 instanceof Tree.Error.class) {
              return acc
            } else {
              rhs = scrut3;
              tmp39 = Stack.Cons(rhs, Stack.Nil);
              tmp40 = Tree.App(acc, tmp39);
              return exprCont(tmp40, prec, bracket)
            }
          } else {
            tmp41 = "cannot consume " + token1;
            tmp42 = Parser.tracer.print(tmp41, 698);
            return acc
          }
        }
      } else {
        throw new globalThis.Error("match error");
      }
    };
    mod = function mod(acc) {
      let scrut1, param01, param11, param02, param12, name, scrut2, param03, keyword1, scrut3, param04, rule, tree1, scrut4, param05, rule1, tree2, param06, param13, param2, param3, param07, param14, param21, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20, tmp21;
      tmp4 = yeetSpaces();
      scrut1 = tmp4;
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
            scrut2 = runtime.safeCall(Keyword.allKeywords.get(name));
            if (scrut2 instanceof Option.Some.class) {
              param03 = scrut2.value;
              keyword1 = param03;
              scrut4 = runtime.safeCall(Parser.exprRules.keywordChoices.get(name));
              if (scrut4 instanceof Option.Some.class) {
                param05 = scrut4.value;
                rule1 = param05;
                tmp6 = consume();
                tmp7 = parseRule(0, rule1, Option.None);
                tree2 = tmp7;
                if (tree2 instanceof Tree.Ternary.class) {
                  param06 = tree2.keyword;
                  param13 = tree2.lhs;
                  param2 = tree2.rhs;
                  param3 = tree2.body;
                  if (param06 instanceof Keyword.Keyword.class) {
                    param07 = param06.name;
                    param14 = param06.leftPrec;
                    param21 = param06.rightPrec;
                    if (param07 === "let") {
                      if (param3 instanceof Option.None.class) {
                        tmp8 = Stack.Cons(tree2, acc);
                        return mod(tmp8)
                      } else {
                        tmp9 = Stack.Cons(tree2, acc);
                        return modCont(tmp9)
                      }
                    } else {
                      tmp10 = Stack.Cons(tree2, acc);
                      return modCont(tmp10)
                    }
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
      let scrut1, param01, param11, param02, param12, tmp4, tmp5, tmp6, tmp7;
      tmp4 = yeetSpaces();
      scrut1 = tmp4;
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
            return Stack.Cons(tmp6, acc)
          }
        } else {
          tmp7 = parseRule(0, Parser.moduleRules, Option.None);
          return Stack.Cons(tmp7, acc)
        }
      } else if (scrut1 instanceof Stack.Nil.class) {
        return Stack.reverse(acc)
      } else {
        throw new globalThis.Error("match error");
      }
    };
    current = tokens;
    counter = 0;
    tmp = mod(Stack.Nil);
    tree = tmp;
    tmp1 = yeetSpaces();
    scrut = tmp1;
    if (scrut instanceof Stack.Cons.class) {
      param0 = scrut.head;
      param1 = scrut.tail;
      token = param0;
      tmp2 = "expect EOF instead of " + token;
      message = tmp2;
      tmp3 = Parser.tracer.print(message, 732);
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
