import runtime from "./../Runtime.mjs";
import Predef from "./../Predef.mjs";
import Option from "./../Option.mjs";
import Stack from "./../Stack.mjs";
import BetterMap from "./../BetterMap.mjs";
import TreeTracer from "./../TreeTracer.mjs";
import Iter from "./../Iter.mjs";
import Lexer from "./Lexer.mjs";
import Keyword from "./parsing/Keyword.mjs";
import Precedence from "./parsing/Precedence.mjs";
import Tree from "./parsing/Tree.mjs";
import ParseRule from "./parsing/ParseRule.mjs";
let Parser1;
Parser1 = class Parser {
  static #letChoice;
  static {
    let tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12;
    tmp = new TreeTracer.TreeTracer();
    this.tracer = tmp;
    tmp1 = Parser.letBinding(Precedence.Keywords._let);
    Parser.#letChoice = tmp1;
    tmp2 = Parser.funChoice();
    tmp3 = Parser.typeDefinition();
    tmp4 = Parser.matchWithChoice();
    tmp5 = Parser.matchFunctionChoice();
    tmp6 = Parser.ifThenElse();
    tmp7 = Tree.Underscore();
    tmp8 = ParseRule.Choice.end(tmp7);
    tmp9 = ParseRule.Choice.keyword(Precedence.Keywords._underscore, "wildcard pattern", tmp8);
    tmp10 = ParseRule.rule("start of the statement", Parser.#letChoice, Parser.recursiveModifier, tmp2, tmp3, tmp4, tmp5, tmp6, tmp9);
    this.prefixRules = tmp10;
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
      let keyword, param0, param1, p1, b, param01, param11, param2, param3, n, l, r, b1, param02, param12, param21, op3, lhs, rhs, param03, param13, c, a, param04, param14, scrutinee, branches, param05, param15, k, v, param06, t, param07, t1, param08, param16, m, s, param09, param17, n1, param010, param18, t2, m1, m2, param011, param19, head, tail, items, remaining, param012, param110, head$_, tail$_, param013, content, tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20, tmp21, tmp22, tmp23, tmp24, tmp25, tmp26, tmp27, tmp28, tmp29, tmp30, tmp31, tmp32, tmp33, tmp34, tmp35, tmp36, tmp37, tmp38;
      if (something instanceof Option.Some.class) {
        param013 = something.value;
        content = param013;
        tmp = go(content);
        tmp1 = "Some of " + tmp;
        return Predef.tuple([
          tmp1
        ], [])
      } else if (something instanceof Option.None.class) {
        return Predef.tuple("None", [])
      } else if (something instanceof Stack.Cons.class) {
        param011 = something.head;
        param19 = something.tail;
        head = param011;
        tail = param19;
        tmp2 = go(head);
        items = [
          tmp2
        ];
        remaining = tail;
        tmp39: while (true) {
          if (remaining instanceof Stack.Cons.class) {
            param012 = remaining.head;
            param110 = remaining.tail;
            head$_ = param012;
            tail$_ = param110;
            tmp3 = go(head$_);
            tmp4 = runtime.safeCall(items.push(tmp3));
            remaining = tail$_;
            tmp5 = runtime.Unit;
            continue tmp39;
          } else {
            tmp5 = runtime.Unit;
          }
          break;
        }
        tmp6 = "Stack of \n" + "  ";
        tmp7 = runtime.safeCall(items.join("\n"));
        tmp8 = Parser.indented(tmp7);
        tmp9 = tmp6 + tmp8;
        return Predef.tuple(tmp9, [])
      } else if (something instanceof Stack.Nil.class) {
        return [
          "Nil",
          []
        ]
      } else {
        if (typeof something === 'string') {
          tmp10 = runtime.safeCall(globalThis.JSON.stringify(something));
          return [
            tmp10,
            []
          ]
        } else if (globalThis.Number.isInteger(something)) {
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
          param010 = something.tree;
          param18 = something.message;
          if (param010 instanceof Tree.Empty.class) {
            m2 = param18;
            tmp12 = go(m2);
            return Predef.tuple("Error", [
              [
                "message",
                tmp12
              ]
            ])
          } else {
            t2 = param010;
            m1 = param18;
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
          param09 = something.name;
          param17 = something.symbolic;
          n1 = param09;
          tmp15 = go(n1);
          return Predef.tuple("Ident", [
            [
              "name",
              tmp15
            ]
          ])
        } else if (something instanceof Tree.Underscore.class) {
          return Predef.tuple("Underscore", [])
        } else if (something instanceof Tree.Modified.class) {
          param08 = something.modifier;
          param16 = something.subject;
          m = param08;
          s = param16;
          tmp16 = go(m);
          tmp17 = go(s);
          return Predef.tuple("Modified", [
            [
              "modifier",
              tmp16
            ],
            [
              "subject",
              tmp17
            ]
          ])
        } else if (something instanceof Tree.Tuple.class) {
          param07 = something.trees;
          t1 = param07;
          tmp18 = go(t1);
          return Predef.tuple("Tuple", [
            [
              "items",
              tmp18
            ]
          ])
        } else if (something instanceof Tree.Sequence.class) {
          param06 = something.trees;
          t = param06;
          tmp19 = go(t);
          return Predef.tuple("Sequence", [
            [
              "items",
              tmp19
            ]
          ])
        } else if (something instanceof Tree.Literal.class) {
          param05 = something.kind;
          param15 = something.value;
          k = param05;
          v = param15;
          tmp20 = go(k);
          tmp21 = "Literal#" + tmp20;
          tmp22 = tmp21 + " of ";
          tmp23 = go(v);
          tmp24 = tmp22 + tmp23;
          return Predef.tuple(tmp24, [])
        } else {
          if (something instanceof Tree.Match.class) {
            param04 = something.scrutinee;
            param14 = something.branches;
            scrutinee = param04;
            branches = param14;
            tmp25 = go(branches);
            return Predef.tuple("Match", [
              [
                "scrutinee",
                scrutinee
              ],
              [
                "branches",
                tmp25
              ]
            ])
          } else if (something instanceof Tree.App.class) {
            param03 = something.callee;
            param13 = something.arguments;
            c = param03;
            a = param13;
            tmp26 = go(c);
            tmp27 = go(a);
            return Predef.tuple("App", [
              [
                "callee",
                tmp26
              ],
              [
                "arguments",
                tmp27
              ]
            ])
          } else if (something instanceof Tree.Infix.class) {
            param02 = something.op;
            param12 = something.lhs;
            param21 = something.rhs;
            op3 = param02;
            lhs = param12;
            rhs = param21;
            tmp28 = go(op3);
            tmp29 = go(lhs);
            tmp30 = go(rhs);
            return Predef.tuple("Infix", [
              [
                "op",
                tmp28
              ],
              [
                "lhs",
                tmp29
              ],
              [
                "rhs",
                tmp30
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
            tmp31 = go(n);
            tmp32 = go(l);
            tmp33 = go(r);
            tmp34 = go(b1);
            return Predef.tuple("Ternary", [
              [
                "name",
                tmp31
              ],
              [
                "lhs",
                tmp32
              ],
              [
                "rhs",
                tmp33
              ],
              [
                "body",
                tmp34
              ]
            ])
          } else if (something instanceof Tree.Lambda.class) {
            param0 = something.params;
            param1 = something.body;
            p1 = param0;
            b = param1;
            tmp35 = go(p1);
            tmp36 = go(b);
            return Predef.tuple("Lambda", [
              [
                "params",
                tmp35
              ],
              [
                "body",
                tmp36
              ]
            ])
          } else if (something instanceof Keyword.Keyword.class) {
            keyword = something;
            tmp37 = runtime.safeCall(keyword.toString());
            return [
              tmp37,
              []
            ]
          } else if (something instanceof Lexer.LiteralKind.Integer.class) {
            return Predef.tuple("Integer", [])
          } else if (something instanceof Lexer.LiteralKind.Decimal.class) {
            return Predef.tuple("Decimal", [])
          } else if (something instanceof Lexer.LiteralKind.String.class) {
            return Predef.tuple("String", [])
          } else if (something instanceof Lexer.LiteralKind.Boolean.class) {
            return Predef.tuple("Boolean", [])
          } else {
            tmp38 = runtime.safeCall(globalThis.JSON.stringify(something));
            return Predef.tuple("Unknown", [
              [
                "JSON.stringify(_)",
                tmp38
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
  static letBinding(keyword) {
    let makeItems, makeBinding, intro, items, tmp, tmp1, tmp2, tmp3;
    makeBinding = function makeBinding(body) {
      let tmp4, tmp5, tmp6, tmp7;
      tmp4 = (lhs, rhsAndBody) => {
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
      tmp5 = intro + "left-hand side";
      tmp6 = intro + "equal sign";
      tmp7 = ParseRule.Choice.keyword(Precedence.Keywords._equal, tmp6, body);
      return ParseRule.Choice.expr(tmp4, tmp5, tmp7)
    };
    makeItems = function makeItems(get) {
      let tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14;
      tmp4 = intro + "right-hand side";
      tmp5 = intro + "`and` keyword";
      tmp6 = ParseRule.Choice.Lazy(get, makeItems);
      tmp7 = makeBinding(tmp6);
      tmp8 = ParseRule.Choice.keyword(Precedence.Keywords._and, tmp5, tmp7);
      tmp9 = intro + "`in` keyword";
      tmp10 = intro + "body";
      tmp11 = ParseRule.Choice.end(runtime.Unit);
      tmp12 = ParseRule.Choice.expr((body, _) => {
        return body
      }, tmp10, tmp11);
      tmp13 = ParseRule.Choice.keyword(Precedence.Keywords._in, tmp9, tmp12);
      tmp14 = ParseRule.Choice.end(Tree.empty);
      return ParseRule.Choice.expr((rhs, body) => {
        return [
          rhs,
          body
        ]
      }, tmp4, tmp8, tmp13, tmp14)
    };
    tmp = keyword.name + " binding: ";
    intro = tmp;
    tmp1 = ParseRule.Choice.lazy(makeItems);
    items = tmp1;
    tmp2 = intro + "keyword";
    tmp3 = makeBinding(items);
    return ParseRule.Choice.keyword(keyword, tmp2, tmp3)
  } 
  static get recursiveModifier() {
    let tmp, tmp1;
    tmp = ParseRule.Choice.end(runtime.Unit);
    tmp1 = ParseRule.Choice.expr((body, _) => {
      return Tree.Modified(Precedence.Keywords._rec, body)
    }, "body", tmp);
    return ParseRule.Choice.keyword(Precedence.Keywords._rec, "rec keyword", tmp1);
  } 
  static typeDefinition() {
    let intro, tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7;
    intro = "type definition: ";
    tmp = intro + "`type` keyword";
    tmp1 = intro + "name";
    tmp2 = intro + "equal sign";
    tmp3 = intro + "body";
    tmp4 = ParseRule.Choice.end(runtime.Unit);
    tmp5 = ParseRule.Choice.expr((body, _) => {
      return body
    }, tmp3, tmp4);
    tmp6 = ParseRule.Choice.keyword(Precedence.Keywords._equal, tmp2, tmp5);
    tmp7 = ParseRule.Choice.expr((name, body) => {
      return Tree.Ternary(Precedence.Keywords._type, name, body, Option.None)
    }, tmp1, tmp6);
    return ParseRule.Choice.keyword(Precedence.Keywords._type, tmp, tmp7)
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
    let makeMatchArms, matchArms, tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6;
    makeMatchArms = function makeMatchArms(get) {
      let tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16;
      tmp7 = (pat, rhsAndRest) => {
        let first1, first0, rhs, rest, tmp17;
        if (globalThis.Array.isArray(rhsAndRest) && rhsAndRest.length === 2) {
          first0 = rhsAndRest[0];
          first1 = rhsAndRest[1];
          rhs = first0;
          rest = first1;
          tmp17 = Tree.Infix(Precedence.Keywords._thinArrow, pat, rhs);
          return runtime.safeCall(cons(tmp17, rest))
        } else {
          throw new globalThis.Error("match error");
        }
      };
      tmp8 = intro + "pattern";
      tmp9 = intro + "arrow";
      tmp10 = intro + "body";
      tmp11 = ParseRule.Choice.end(nil);
      tmp12 = intro + "leading bar";
      tmp13 = ParseRule.Choice.Lazy(get, makeMatchArms);
      tmp14 = ParseRule.Choice.keyword(Precedence.Keywords._bar, tmp12, tmp13);
      tmp15 = ParseRule.Choice.expr((curr, next) => {
        return [
          curr,
          next
        ]
      }, tmp10, tmp11, tmp14);
      tmp16 = ParseRule.Choice.keyword(Precedence.Keywords._thinArrow, tmp9, tmp15);
      return ParseRule.Choice.expr(tmp7, tmp8, tmp16)
    };
    tmp = ParseRule.Choice.lazy(makeMatchArms);
    matchArms = tmp;
    tmp1 = intro + "leading bar";
    tmp2 = ParseRule.Choice.end(runtime.Unit);
    tmp3 = ParseRule.Choice.keyword(Precedence.Keywords._bar, tmp1, tmp2);
    tmp4 = ParseRule.rule("match arms", tmp3);
    tmp5 = ParseRule.rule("match arms", matchArms);
    tmp6 = ParseRule.Choice.Optional(tmp4, tmp5);
    return Predef.tuple(tmp6)
  } 
  static matchWithChoice() {
    let intro1, tmp, tmp1, tmp2, tmp3, tmp4, tmp5;
    intro1 = "`match`-`with` expression: ";
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
    intro1 = "`match` function: ";
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
  static makeInfixChoice(keyword1) {
    let tmp, tmp1, tmp2, tmp3, tmp4, tmp5;
    tmp = "operator `" + keyword1.name;
    tmp1 = tmp + "`";
    tmp2 = "operator `" + keyword1.name;
    tmp3 = tmp2 + "` right-hand side";
    tmp4 = ParseRule.Choice.end(runtime.Unit);
    tmp5 = ParseRule.Choice.expr((rhs, _) => {
      return (lhs) => {
        return Tree.Infix(keyword1, lhs, rhs)
      }
    }, tmp3, tmp4);
    return ParseRule.Choice.keyword(keyword1, tmp1, tmp5)
  } 
  static parse(tokens) {
    let exprCont, simpleExpr, parseRule, yeetSpaces, consume, current, counter, tree, scrut, param0, param1, token, message, tmp, tmp1, tmp2, tmp3;
    yeetSpaces = function yeetSpaces() {
      let param01, param11, tail, tmp4, tmp5, tmp6, tmp7;
      tmp8: while (true) {
        if (current instanceof Stack.Cons.class) {
          param01 = current.head;
          param11 = current.tail;
          if (param01 instanceof Lexer.Token.Space.class) {
            tail = param11;
            tmp4 = "skipped a space at " + counter;
            tmp5 = Parser.tracer.print(tmp4, 338);
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
        tmp4 = Lexer.Token.summary(head);
        tmp5 = "consumed `" + tmp4;
        tmp6 = tmp5 + "` at ";
        tmp7 = tmp6 + counter;
        tmp8 = Parser.tracer.print(tmp7, 346);
        current = tail;
        tmp9 = counter + 1;
        counter = tmp9;
        return runtime.Unit
      } else {
        return Parser.tracer.print("consumed: EOF", 350)
      }
    };
    parseRule = function parseRule(prec, rule, opened) {
      let tmp4, tmp5, tmp6, tmp7;
      tmp4 = "parsing rule \"" + rule.name;
      tmp5 = tmp4 + "\" with precedence ";
      tmp6 = tmp5 + prec;
      tmp7 = () => {
        let scrut1, scrut2, param01, value, param02, param11, other, doTemp, scrut3, reserve, scrut4, param03, first1, first0, process, rest, rhs, param04, param12, scrut5, param05, value1, param06, param13, name, doTemp1, doTemp2, scrut6, param07, keyword2, doTemp3, scrut7, scrut8, expr, scrut9, param08, first11, first01, process1, rest1, rhs1, scrut10, scrut11, param09, value2, param010, rest2, param011, encountered, doTemp4, param012, expected, scrut12, scrut13, param013, value3, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20, tmp21, tmp22, tmp23, tmp24, tmp25, tmp26, tmp27, tmp28, tmp29, tmp30, tmp31, tmp32, tmp33, tmp34, tmp35, tmp36, tmp37, tmp38, tmp39, tmp40, tmp41, tmp42, tmp43, tmp44, tmp45, tmp46, tmp47, tmp48, tmp49, tmp50, tmp51, tmp52, tmp53, tmp54, tmp55, tmp56, tmp57, tmp58, tmp59, tmp60, tmp61, tmp62, tmp63, tmp64, tmp65, tmp66, tmp67, tmp68, tmp69, tmp70, tmp71, tmp72, tmp73, tmp74, tmp75, tmp76, tmp77, tmp78, tmp79, tmp80, tmp81, tmp82, tmp83, tmp84, tmp85, tmp86, tmp87, tmp88, tmp89, tmp90, tmp91, tmp92, tmp93, tmp94, tmp95, tmp96, tmp97, tmp98, tmp99, tmp100, tmp101, tmp102, tmp103, tmp104, tmp105, tmp106, tmp107, tmp108, tmp109, tmp110, tmp111, tmp112, tmp113, tmp114, tmp115, tmp116, tmp117, tmp118, tmp119, tmp120, tmp121, tmp122, tmp123, tmp124, tmp125, tmp126, tmp127, tmp128, tmp129, tmp130, tmp131, tmp132, tmp133, tmp134, tmp135, tmp136, tmp137, tmp138, tmp139, tmp140, tmp141, tmp142, tmp143, tmp144, tmp145, tmp146, tmp147, tmp148, tmp149;
        tmp8 = yeetSpaces();
        scrut1 = tmp8;
        if (scrut1 instanceof Stack.Cons.class) {
          param02 = scrut1.head;
          param11 = scrut1.tail;
          if (param02 instanceof Lexer.Token.Close.class) {
            param011 = param02.kind;
            encountered = param011;
            doTemp4 = Parser.tracer.print("the case of closing brackets", 358);
            if (opened instanceof Option.Some.class) {
              param012 = opened.value;
              expected = param012;
              scrut12 = encountered == expected;
              if (scrut12 === true) {
                scrut13 = rule.endChoice;
                if (scrut13 instanceof Option.Some.class) {
                  param013 = scrut13.value;
                  value3 = param013;
                  return value3
                } else if (scrut13 instanceof Option.None.class) {
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
              tmp12 = Lexer.Token.preview(current);
              tmp13 = "try parse an expression from " + tmp12;
              doTemp = Parser.tracer.print(tmp13, 397);
              scrut3 = simpleExpr(prec, opened);
              if (scrut3 instanceof Tree.Error.class) {
                param04 = scrut3.tree;
                param12 = scrut3.message;
                if (param04 instanceof Tree.Empty.class) {
                  scrut5 = rule.endChoice;
                  if (scrut5 instanceof Option.Some.class) {
                    param05 = scrut5.value;
                    value1 = param05;
                    return value1
                  } else {
                    reserve = scrut3;
                    scrut4 = rule.exprChoice;
                    if (scrut4 instanceof Option.Some.class) {
                      param03 = scrut4.value;
                      if (globalThis.Array.isArray(param03) && param03.length === 2) {
                        first0 = param03[0];
                        first1 = param03[1];
                        process = first0;
                        rest = first1;
                        tmp14 = parseRule(prec, rest, opened);
                        rhs = tmp14;
                        tmp15 = Tree.summary(reserve);
                        tmp16 = "the reserved expression: " + tmp15;
                        tmp17 = Parser.tracer.print(tmp16, 404);
                        tmp18 = Tree.summary(rhs);
                        tmp19 = "the result from sub-rule: " + tmp18;
                        tmp20 = Parser.tracer.print(tmp19, 405);
                        return runtime.safeCall(process(reserve, rhs))
                      } else {
                        throw new globalThis.Error("match error");
                      }
                    } else if (scrut4 instanceof Option.None.class) {
                      tmp21 = Parser.tracer.print("the rule doesn't have a choice starting with expressions", 408);
                      tmp22 = Parser.tracer.print(rule.display, 409);
                      return Tree.error("unexpected expression")
                    } else {
                      throw new globalThis.Error("match error");
                    }
                  }
                } else {
                  reserve = scrut3;
                  scrut4 = rule.exprChoice;
                  if (scrut4 instanceof Option.Some.class) {
                    param03 = scrut4.value;
                    if (globalThis.Array.isArray(param03) && param03.length === 2) {
                      first0 = param03[0];
                      first1 = param03[1];
                      process = first0;
                      rest = first1;
                      tmp23 = parseRule(prec, rest, opened);
                      rhs = tmp23;
                      tmp24 = Tree.summary(reserve);
                      tmp25 = "the reserved expression: " + tmp24;
                      tmp26 = Parser.tracer.print(tmp25, 404);
                      tmp27 = Tree.summary(rhs);
                      tmp28 = "the result from sub-rule: " + tmp27;
                      tmp29 = Parser.tracer.print(tmp28, 405);
                      return runtime.safeCall(process(reserve, rhs))
                    } else {
                      throw new globalThis.Error("match error");
                    }
                  } else if (scrut4 instanceof Option.None.class) {
                    tmp30 = Parser.tracer.print("the rule doesn't have a choice starting with expressions", 408);
                    tmp31 = Parser.tracer.print(rule.display, 409);
                    return Tree.error("unexpected expression")
                  } else {
                    throw new globalThis.Error("match error");
                  }
                }
              } else {
                reserve = scrut3;
                scrut4 = rule.exprChoice;
                if (scrut4 instanceof Option.Some.class) {
                  param03 = scrut4.value;
                  if (globalThis.Array.isArray(param03) && param03.length === 2) {
                    first0 = param03[0];
                    first1 = param03[1];
                    process = first0;
                    rest = first1;
                    tmp32 = parseRule(prec, rest, opened);
                    rhs = tmp32;
                    tmp33 = Tree.summary(reserve);
                    tmp34 = "the reserved expression: " + tmp33;
                    tmp35 = Parser.tracer.print(tmp34, 404);
                    tmp36 = Tree.summary(rhs);
                    tmp37 = "the result from sub-rule: " + tmp36;
                    tmp38 = Parser.tracer.print(tmp37, 405);
                    return runtime.safeCall(process(reserve, rhs))
                  } else {
                    throw new globalThis.Error("match error");
                  }
                } else if (scrut4 instanceof Option.None.class) {
                  tmp39 = Parser.tracer.print("the rule doesn't have a choice starting with expressions", 408);
                  tmp40 = Parser.tracer.print(rule.display, 409);
                  return Tree.error("unexpected expression")
                } else {
                  throw new globalThis.Error("match error");
                }
              }
            }
          } else if (param02 instanceof Lexer.Token.Identifier.class) {
            param06 = param02.name;
            param13 = param02.symbolic;
            name = param06;
            tmp41 = "check if \"" + name;
            tmp42 = tmp41 + "\" is a keyword or not";
            doTemp1 = Parser.tracer.print(tmp42, 370);
            scrut6 = runtime.safeCall(Keyword.allKeywords.get(name));
            if (scrut6 instanceof Option.Some.class) {
              param07 = scrut6.value;
              keyword2 = param07;
              tmp43 = (caseScrut) => {
                let first12, first02, k, v, tmp150;
                if (globalThis.Array.isArray(caseScrut) && caseScrut.length === 2) {
                  first02 = caseScrut[0];
                  first12 = caseScrut[1];
                  k = first02;
                  v = first12;
                  tmp150 = "`" + k;
                  return tmp150 + "`"
                } else {
                  throw new globalThis.Error("match error");
                }
              };
              tmp44 = Iter.mapping(rule.keywordChoices, tmp43);
              tmp45 = Iter.joined(tmp44, ", ");
              doTemp3 = Parser.tracer.print("keyword choices: ", tmp45);
              scrut7 = runtime.safeCall(rule.keywordChoices.get(name));
              if (scrut7 instanceof Option.Some.class) {
                param010 = scrut7.value;
                rest2 = param010;
                tmp46 = "found a rule starting with `" + name;
                tmp47 = tmp46 + "`";
                tmp48 = Parser.tracer.print(tmp47, 377);
                tmp49 = "the rest of the rule: " + rest2.display;
                tmp50 = Parser.tracer.print(tmp49, 378);
                tmp51 = globalThis.Array(rule.keywordChoices);
                tmp52 = "keyword choices of the rule: " + tmp51;
                tmp53 = Parser.tracer.print(tmp52, 379);
                tmp54 = consume();
                return parseRule(keyword2.rightPrecOrMax, rest2, opened)
              } else if (scrut7 instanceof Option.None.class) {
                tmp55 = "no rule starting with `" + name;
                tmp56 = tmp55 + "` was found";
                tmp57 = Parser.tracer.print(tmp56, 383);
                scrut8 = simpleExpr(prec, opened);
                if (scrut8 instanceof Tree.Empty.class) {
                  scrut11 = rule.endChoice;
                  if (scrut11 instanceof Option.Some.class) {
                    param09 = scrut11.value;
                    value2 = param09;
                    return value2
                  } else {
                    scrut10 = rule.exprChoice;
                    if (scrut10 instanceof Option.Some.class) {
                      return Tree.error("expect an expression")
                    } else {
                      return Predef.notImplementedError
                    }
                  }
                } else {
                  expr = scrut8;
                  scrut9 = rule.exprChoice;
                  if (scrut9 instanceof Option.Some.class) {
                    param08 = scrut9.value;
                    if (globalThis.Array.isArray(param08) && param08.length === 2) {
                      first01 = param08[0];
                      first11 = param08[1];
                      process1 = first01;
                      rest1 = first11;
                      tmp58 = parseRule(prec, rest1, opened);
                      rhs1 = tmp58;
                      return runtime.safeCall(process1(expr, rhs1))
                    } else {
                      throw new globalThis.Error("match error");
                    }
                  } else if (scrut9 instanceof Option.None.class) {
                    return Tree.Error(expr, "unexpected expression")
                  } else {
                    throw new globalThis.Error("match error");
                  }
                }
              } else {
                tmp59 = "\"" + name;
                tmp60 = tmp59 + "\" is not a keyword";
                doTemp2 = Parser.tracer.print(tmp60, 395);
                other = param02;
                tmp61 = Lexer.Token.preview(current);
                tmp62 = "try parse an expression from " + tmp61;
                doTemp = Parser.tracer.print(tmp62, 397);
                scrut3 = simpleExpr(prec, opened);
                if (scrut3 instanceof Tree.Error.class) {
                  param04 = scrut3.tree;
                  param12 = scrut3.message;
                  if (param04 instanceof Tree.Empty.class) {
                    scrut5 = rule.endChoice;
                    if (scrut5 instanceof Option.Some.class) {
                      param05 = scrut5.value;
                      value1 = param05;
                      return value1
                    } else {
                      reserve = scrut3;
                      scrut4 = rule.exprChoice;
                      if (scrut4 instanceof Option.Some.class) {
                        param03 = scrut4.value;
                        if (globalThis.Array.isArray(param03) && param03.length === 2) {
                          first0 = param03[0];
                          first1 = param03[1];
                          process = first0;
                          rest = first1;
                          tmp63 = parseRule(prec, rest, opened);
                          rhs = tmp63;
                          tmp64 = Tree.summary(reserve);
                          tmp65 = "the reserved expression: " + tmp64;
                          tmp66 = Parser.tracer.print(tmp65, 404);
                          tmp67 = Tree.summary(rhs);
                          tmp68 = "the result from sub-rule: " + tmp67;
                          tmp69 = Parser.tracer.print(tmp68, 405);
                          return runtime.safeCall(process(reserve, rhs))
                        } else {
                          throw new globalThis.Error("match error");
                        }
                      } else if (scrut4 instanceof Option.None.class) {
                        tmp70 = Parser.tracer.print("the rule doesn't have a choice starting with expressions", 408);
                        tmp71 = Parser.tracer.print(rule.display, 409);
                        return Tree.error("unexpected expression")
                      } else {
                        throw new globalThis.Error("match error");
                      }
                    }
                  } else {
                    reserve = scrut3;
                    scrut4 = rule.exprChoice;
                    if (scrut4 instanceof Option.Some.class) {
                      param03 = scrut4.value;
                      if (globalThis.Array.isArray(param03) && param03.length === 2) {
                        first0 = param03[0];
                        first1 = param03[1];
                        process = first0;
                        rest = first1;
                        tmp72 = parseRule(prec, rest, opened);
                        rhs = tmp72;
                        tmp73 = Tree.summary(reserve);
                        tmp74 = "the reserved expression: " + tmp73;
                        tmp75 = Parser.tracer.print(tmp74, 404);
                        tmp76 = Tree.summary(rhs);
                        tmp77 = "the result from sub-rule: " + tmp76;
                        tmp78 = Parser.tracer.print(tmp77, 405);
                        return runtime.safeCall(process(reserve, rhs))
                      } else {
                        throw new globalThis.Error("match error");
                      }
                    } else if (scrut4 instanceof Option.None.class) {
                      tmp79 = Parser.tracer.print("the rule doesn't have a choice starting with expressions", 408);
                      tmp80 = Parser.tracer.print(rule.display, 409);
                      return Tree.error("unexpected expression")
                    } else {
                      throw new globalThis.Error("match error");
                    }
                  }
                } else {
                  reserve = scrut3;
                  scrut4 = rule.exprChoice;
                  if (scrut4 instanceof Option.Some.class) {
                    param03 = scrut4.value;
                    if (globalThis.Array.isArray(param03) && param03.length === 2) {
                      first0 = param03[0];
                      first1 = param03[1];
                      process = first0;
                      rest = first1;
                      tmp81 = parseRule(prec, rest, opened);
                      rhs = tmp81;
                      tmp82 = Tree.summary(reserve);
                      tmp83 = "the reserved expression: " + tmp82;
                      tmp84 = Parser.tracer.print(tmp83, 404);
                      tmp85 = Tree.summary(rhs);
                      tmp86 = "the result from sub-rule: " + tmp85;
                      tmp87 = Parser.tracer.print(tmp86, 405);
                      return runtime.safeCall(process(reserve, rhs))
                    } else {
                      throw new globalThis.Error("match error");
                    }
                  } else if (scrut4 instanceof Option.None.class) {
                    tmp88 = Parser.tracer.print("the rule doesn't have a choice starting with expressions", 408);
                    tmp89 = Parser.tracer.print(rule.display, 409);
                    return Tree.error("unexpected expression")
                  } else {
                    throw new globalThis.Error("match error");
                  }
                }
              }
            } else {
              tmp90 = "\"" + name;
              tmp91 = tmp90 + "\" is not a keyword";
              doTemp2 = Parser.tracer.print(tmp91, 395);
              other = param02;
              tmp92 = Lexer.Token.preview(current);
              tmp93 = "try parse an expression from " + tmp92;
              doTemp = Parser.tracer.print(tmp93, 397);
              scrut3 = simpleExpr(prec, opened);
              if (scrut3 instanceof Tree.Error.class) {
                param04 = scrut3.tree;
                param12 = scrut3.message;
                if (param04 instanceof Tree.Empty.class) {
                  scrut5 = rule.endChoice;
                  if (scrut5 instanceof Option.Some.class) {
                    param05 = scrut5.value;
                    value1 = param05;
                    return value1
                  } else {
                    reserve = scrut3;
                    scrut4 = rule.exprChoice;
                    if (scrut4 instanceof Option.Some.class) {
                      param03 = scrut4.value;
                      if (globalThis.Array.isArray(param03) && param03.length === 2) {
                        first0 = param03[0];
                        first1 = param03[1];
                        process = first0;
                        rest = first1;
                        tmp94 = parseRule(prec, rest, opened);
                        rhs = tmp94;
                        tmp95 = Tree.summary(reserve);
                        tmp96 = "the reserved expression: " + tmp95;
                        tmp97 = Parser.tracer.print(tmp96, 404);
                        tmp98 = Tree.summary(rhs);
                        tmp99 = "the result from sub-rule: " + tmp98;
                        tmp100 = Parser.tracer.print(tmp99, 405);
                        return runtime.safeCall(process(reserve, rhs))
                      } else {
                        throw new globalThis.Error("match error");
                      }
                    } else if (scrut4 instanceof Option.None.class) {
                      tmp101 = Parser.tracer.print("the rule doesn't have a choice starting with expressions", 408);
                      tmp102 = Parser.tracer.print(rule.display, 409);
                      return Tree.error("unexpected expression")
                    } else {
                      throw new globalThis.Error("match error");
                    }
                  }
                } else {
                  reserve = scrut3;
                  scrut4 = rule.exprChoice;
                  if (scrut4 instanceof Option.Some.class) {
                    param03 = scrut4.value;
                    if (globalThis.Array.isArray(param03) && param03.length === 2) {
                      first0 = param03[0];
                      first1 = param03[1];
                      process = first0;
                      rest = first1;
                      tmp103 = parseRule(prec, rest, opened);
                      rhs = tmp103;
                      tmp104 = Tree.summary(reserve);
                      tmp105 = "the reserved expression: " + tmp104;
                      tmp106 = Parser.tracer.print(tmp105, 404);
                      tmp107 = Tree.summary(rhs);
                      tmp108 = "the result from sub-rule: " + tmp107;
                      tmp109 = Parser.tracer.print(tmp108, 405);
                      return runtime.safeCall(process(reserve, rhs))
                    } else {
                      throw new globalThis.Error("match error");
                    }
                  } else if (scrut4 instanceof Option.None.class) {
                    tmp110 = Parser.tracer.print("the rule doesn't have a choice starting with expressions", 408);
                    tmp111 = Parser.tracer.print(rule.display, 409);
                    return Tree.error("unexpected expression")
                  } else {
                    throw new globalThis.Error("match error");
                  }
                }
              } else {
                reserve = scrut3;
                scrut4 = rule.exprChoice;
                if (scrut4 instanceof Option.Some.class) {
                  param03 = scrut4.value;
                  if (globalThis.Array.isArray(param03) && param03.length === 2) {
                    first0 = param03[0];
                    first1 = param03[1];
                    process = first0;
                    rest = first1;
                    tmp112 = parseRule(prec, rest, opened);
                    rhs = tmp112;
                    tmp113 = Tree.summary(reserve);
                    tmp114 = "the reserved expression: " + tmp113;
                    tmp115 = Parser.tracer.print(tmp114, 404);
                    tmp116 = Tree.summary(rhs);
                    tmp117 = "the result from sub-rule: " + tmp116;
                    tmp118 = Parser.tracer.print(tmp117, 405);
                    return runtime.safeCall(process(reserve, rhs))
                  } else {
                    throw new globalThis.Error("match error");
                  }
                } else if (scrut4 instanceof Option.None.class) {
                  tmp119 = Parser.tracer.print("the rule doesn't have a choice starting with expressions", 408);
                  tmp120 = Parser.tracer.print(rule.display, 409);
                  return Tree.error("unexpected expression")
                } else {
                  throw new globalThis.Error("match error");
                }
              }
            }
          } else {
            other = param02;
            tmp121 = Lexer.Token.preview(current);
            tmp122 = "try parse an expression from " + tmp121;
            doTemp = Parser.tracer.print(tmp122, 397);
            scrut3 = simpleExpr(prec, opened);
            if (scrut3 instanceof Tree.Error.class) {
              param04 = scrut3.tree;
              param12 = scrut3.message;
              if (param04 instanceof Tree.Empty.class) {
                scrut5 = rule.endChoice;
                if (scrut5 instanceof Option.Some.class) {
                  param05 = scrut5.value;
                  value1 = param05;
                  return value1
                } else {
                  reserve = scrut3;
                  scrut4 = rule.exprChoice;
                  if (scrut4 instanceof Option.Some.class) {
                    param03 = scrut4.value;
                    if (globalThis.Array.isArray(param03) && param03.length === 2) {
                      first0 = param03[0];
                      first1 = param03[1];
                      process = first0;
                      rest = first1;
                      tmp123 = parseRule(prec, rest, opened);
                      rhs = tmp123;
                      tmp124 = Tree.summary(reserve);
                      tmp125 = "the reserved expression: " + tmp124;
                      tmp126 = Parser.tracer.print(tmp125, 404);
                      tmp127 = Tree.summary(rhs);
                      tmp128 = "the result from sub-rule: " + tmp127;
                      tmp129 = Parser.tracer.print(tmp128, 405);
                      return runtime.safeCall(process(reserve, rhs))
                    } else {
                      throw new globalThis.Error("match error");
                    }
                  } else if (scrut4 instanceof Option.None.class) {
                    tmp130 = Parser.tracer.print("the rule doesn't have a choice starting with expressions", 408);
                    tmp131 = Parser.tracer.print(rule.display, 409);
                    return Tree.error("unexpected expression")
                  } else {
                    throw new globalThis.Error("match error");
                  }
                }
              } else {
                reserve = scrut3;
                scrut4 = rule.exprChoice;
                if (scrut4 instanceof Option.Some.class) {
                  param03 = scrut4.value;
                  if (globalThis.Array.isArray(param03) && param03.length === 2) {
                    first0 = param03[0];
                    first1 = param03[1];
                    process = first0;
                    rest = first1;
                    tmp132 = parseRule(prec, rest, opened);
                    rhs = tmp132;
                    tmp133 = Tree.summary(reserve);
                    tmp134 = "the reserved expression: " + tmp133;
                    tmp135 = Parser.tracer.print(tmp134, 404);
                    tmp136 = Tree.summary(rhs);
                    tmp137 = "the result from sub-rule: " + tmp136;
                    tmp138 = Parser.tracer.print(tmp137, 405);
                    return runtime.safeCall(process(reserve, rhs))
                  } else {
                    throw new globalThis.Error("match error");
                  }
                } else if (scrut4 instanceof Option.None.class) {
                  tmp139 = Parser.tracer.print("the rule doesn't have a choice starting with expressions", 408);
                  tmp140 = Parser.tracer.print(rule.display, 409);
                  return Tree.error("unexpected expression")
                } else {
                  throw new globalThis.Error("match error");
                }
              }
            } else {
              reserve = scrut3;
              scrut4 = rule.exprChoice;
              if (scrut4 instanceof Option.Some.class) {
                param03 = scrut4.value;
                if (globalThis.Array.isArray(param03) && param03.length === 2) {
                  first0 = param03[0];
                  first1 = param03[1];
                  process = first0;
                  rest = first1;
                  tmp141 = parseRule(prec, rest, opened);
                  rhs = tmp141;
                  tmp142 = Tree.summary(reserve);
                  tmp143 = "the reserved expression: " + tmp142;
                  tmp144 = Parser.tracer.print(tmp143, 404);
                  tmp145 = Tree.summary(rhs);
                  tmp146 = "the result from sub-rule: " + tmp145;
                  tmp147 = Parser.tracer.print(tmp146, 405);
                  return runtime.safeCall(process(reserve, rhs))
                } else {
                  throw new globalThis.Error("match error");
                }
              } else if (scrut4 instanceof Option.None.class) {
                tmp148 = Parser.tracer.print("the rule doesn't have a choice starting with expressions", 408);
                tmp149 = Parser.tracer.print(rule.display, 409);
                return Tree.error("unexpected expression")
              } else {
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
            return Tree.error("unexpected EOF")
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
      tmp6 = Lexer.Token.preview(current);
      tmp7 = tmp5 + tmp6;
      tmp8 = () => {
        let scrut1, param01, param11, token1, param02, kind, param03, kind$_, scrut2, param04, kind1, content, content1, scrut3, message1, param05, param12, token2, message2, param06, kind$_1, scrut4, param07, param13, kind2, literal, param08, param14, name, symbolic, scrut5, param09, keyword2, scrut6, param010, rule, acc, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20, tmp21, tmp22, tmp23, tmp24, tmp25, tmp26, tmp27, tmp28, tmp29, tmp30, tmp31, tmp32, tmp33;
        tmp9 = yeetSpaces();
        scrut1 = tmp9;
        if (scrut1 instanceof Stack.Cons.class) {
          param01 = scrut1.head;
          param11 = scrut1.tail;
          if (param01 instanceof Lexer.Token.Identifier.class) {
            param08 = param01.name;
            param14 = param01.symbolic;
            name = param08;
            symbolic = param14;
            scrut5 = runtime.safeCall(Keyword.allKeywords.get(name));
            if (scrut5 instanceof Option.Some.class) {
              param09 = scrut5.value;
              keyword2 = param09;
              scrut6 = runtime.safeCall(Parser.prefixRules.keywordChoices.get(name));
              if (scrut6 instanceof Option.Some.class) {
                param010 = scrut6.value;
                rule = param010;
                tmp10 = consume();
                tmp11 = parseRule(keyword2.rightPrecOrMax, rule, bracket);
                acc = tmp11;
                return exprCont(acc, prec, bracket)
              } else if (scrut6 instanceof Option.None.class) {
                tmp12 = "no rule starting with " + name;
                tmp13 = Parser.tracer.print(tmp12, 427);
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
          } else if (param01 instanceof Lexer.Token.Literal.class) {
            param07 = param01.kind;
            param13 = param01.literal;
            kind2 = param07;
            literal = param13;
            tmp18 = consume();
            tmp19 = Tree.Literal(kind2, literal);
            return exprCont(tmp19, prec, bracket)
          } else if (param01 instanceof Lexer.Token.Open.class) {
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
              if (param05 instanceof Lexer.Token.Close.class) {
                param06 = param05.kind;
                kind$_1 = param06;
                scrut4 = kind1 == kind$_1;
                if (scrut4 === true) {
                  tmp23 = "closing bracket " + kind1;
                  tmp24 = Parser.tracer.print(tmp23, 443);
                  tmp25 = consume();
                  if (content1 instanceof Tree.Empty.class) {
                    if (kind1 instanceof Lexer.Round.class) {
                      tmp26 = Tree.Tuple(Stack.Nil);
                    } else if (kind1 instanceof Lexer.BeginEnd.class) {
                      tmp26 = Tree.Sequence(Stack.Nil);
                    } else {
                      tmp26 = content1;
                    }
                  } else {
                    tmp26 = content1;
                  }
                  tmp27 = tmp26;
                } else {
                  tmp27 = Tree.Error(content1, "mismatched brackets");
                }
              } else {
                token2 = param05;
                tmp28 = "expect a close bracket instead of " + token2;
                message2 = tmp28;
                tmp29 = Parser.tracer.print(message2, 453);
                tmp27 = Tree.Error(content1, message2);
              }
            } else if (scrut3 instanceof Stack.Nil.class) {
              message1 = "expect a close bracket instead of EOF";
              tmp30 = Parser.tracer.print(message1, 457);
              tmp27 = Tree.Error(content1, message1);
            } else {
              throw new globalThis.Error("match error");
            }
            content = tmp27;
            return exprCont(content, prec, bracket)
          } else if (param01 instanceof Lexer.Token.Close.class) {
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
              tmp31 = Parser.tracer.print("missing close bracket", 465);
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
      let scrut1, doTemp, doTemp1, param01, param11, token1, scrut2, scrut3, rhs, scrut4, param02, keyword2, scrut5, param03, leftPrec, scrut6, scrut7, param04, rightPrec, acc$_, scrut8, tree1, param05, trees, scrut9, param06, keyword3, scrut10, param07, leftPrec1, scrut11, scrut12, param08, rightPrec1, acc$_1, scrut13, tree2, param09, trees1, param010, kind, doTemp2, param011, kind$_, scrut14, param012, param12, name, scrut15, doTemp3, scrut16, first1, first0, leftPrec2, rightPrec2, doTemp4, scrut17, op3, rhs1, name1, scrut18, param013, keyword4, doTemp5, doTemp6, scrut19, param014, rule, doTemp7, scrut20, scrut21, param015, first11, first01, process, rest, rhs2, acc$_2, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20, tmp21, tmp22, tmp23, tmp24, tmp25, tmp26, tmp27, tmp28, tmp29, tmp30, tmp31, tmp32, tmp33, tmp34, tmp35, tmp36, tmp37, tmp38, tmp39, tmp40, tmp41, tmp42, tmp43, tmp44, tmp45, tmp46, tmp47, tmp48, tmp49, tmp50, tmp51, tmp52, tmp53, tmp54, tmp55, tmp56, tmp57, tmp58, tmp59, tmp60, tmp61, tmp62, tmp63, tmp64, tmp65, tmp66, tmp67, tmp68, tmp69, tmp70, tmp71, tmp72, tmp73, tmp74, tmp75, tmp76, tmp77, tmp78, tmp79, tmp80, tmp81, tmp82, tmp83, tmp84, tmp85, tmp86, tmp87, tmp88, tmp89, tmp90, tmp91, tmp92, tmp93, tmp94, tmp95, tmp96, tmp97, tmp98, tmp99, tmp100, tmp101, tmp102, tmp103, tmp104, tmp105, tmp106, tmp107, tmp108, tmp109, tmp110, tmp111, tmp112, tmp113, tmp114, tmp115, tmp116, tmp117, tmp118, tmp119, tmp120, tmp121, tmp122, tmp123, tmp124, tmp125, tmp126, tmp127, tmp128, tmp129, tmp130, tmp131, tmp132, tmp133, tmp134, tmp135, tmp136, tmp137, tmp138, tmp139, tmp140, tmp141, tmp142, tmp143, tmp144, tmp145, tmp146, tmp147, tmp148, tmp149, tmp150, tmp151, tmp152, tmp153, tmp154, tmp155, tmp156, tmp157, tmp158, tmp159, tmp160, tmp161, tmp162, tmp163, tmp164, tmp165, tmp166, tmp167, tmp168, tmp169;
      tmp4 = yeetSpaces();
      scrut1 = tmp4;
      tmp5 = ">>> exprCont " + prec;
      tmp6 = tmp5 + " ";
      tmp7 = Tree.summary(acc);
      tmp8 = tmp6 + tmp7;
      tmp9 = tmp8 + " <<<";
      doTemp = Parser.tracer.print(tmp9, 471);
      if (scrut1 instanceof Stack.Cons.class) {
        param01 = scrut1.head;
        param11 = scrut1.tail;
        if (param01 instanceof Lexer.Token.Identifier.class) {
          param012 = param01.name;
          param12 = param01.symbolic;
          name1 = param012;
          scrut18 = runtime.safeCall(Keyword.allKeywords.get(name1));
          if (scrut18 instanceof Option.Some.class) {
            param013 = scrut18.value;
            keyword4 = param013;
            tmp10 = "found a keyword: " + name1;
            doTemp5 = Parser.tracer.print(tmp10, 473);
            scrut19 = runtime.safeCall(Parser.infixRules.keywordChoices.get(name1));
            if (scrut19 instanceof Option.Some.class) {
              param014 = scrut19.value;
              rule = param014;
              tmp11 = "found an infix keyword " + name1;
              doTemp7 = Parser.tracer.print(tmp11, 475);
              scrut20 = keyword4.leftPrecOrMin > prec;
              if (scrut20 === true) {
                scrut21 = rule.exprChoice;
                if (scrut21 instanceof Option.Some.class) {
                  param015 = scrut21.value;
                  if (globalThis.Array.isArray(param015) && param015.length === 2) {
                    first01 = param015[0];
                    first11 = param015[1];
                    process = first01;
                    rest = first11;
                    tmp12 = consume();
                    tmp13 = simpleExpr(keyword4.rightPrecOrMin, bracket);
                    rhs2 = tmp13;
                    tmp14 = Tree.Infix(keyword4, acc, rhs2);
                    acc$_2 = tmp14;
                    return exprCont(acc$_2, prec, bracket)
                  } else {
                    tmp15 = "keyword `" + name1;
                    tmp16 = tmp15 + "` does not have infix rules";
                    doTemp6 = Parser.tracer.print(tmp16, 483);
                    name = param012;
                    if (param12 === true) {
                      scrut15 = runtime.safeCall(Keyword.allKeywords.get(name));
                      if (scrut15 instanceof Option.None.class) {
                        tmp17 = "found an operator \"" + name;
                        tmp18 = tmp17 + "\"";
                        doTemp3 = Parser.tracer.print(tmp18, 485);
                        scrut16 = Precedence.opPrec(name);
                        if (globalThis.Array.isArray(scrut16) && scrut16.length === 2) {
                          first0 = scrut16[0];
                          first1 = scrut16[1];
                          leftPrec2 = first0;
                          rightPrec2 = first1;
                          tmp19 = "its precedence is " + leftPrec2;
                          doTemp4 = Parser.tracer.print(tmp19, 487);
                          scrut17 = leftPrec2 > prec;
                          if (scrut17 === true) {
                            tmp20 = consume();
                            tmp21 = Tree.Ident(name, true);
                            op3 = tmp21;
                            tmp22 = simpleExpr(rightPrec2, bracket);
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
                            tmp26 = Parser.tracer.print("found an application", 531);
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
                            tmp30 = Parser.tracer.print(tmp29, 537);
                            return acc
                          }
                        }
                      } else {
                        token1 = param01;
                        scrut2 = Precedence.appPrec > prec;
                        if (scrut2 === true) {
                          tmp31 = Parser.tracer.print("found an application", 531);
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
                          tmp35 = Parser.tracer.print(tmp34, 537);
                          return acc
                        }
                      }
                    } else {
                      token1 = param01;
                      scrut2 = Precedence.appPrec > prec;
                      if (scrut2 === true) {
                        tmp36 = Parser.tracer.print("found an application", 531);
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
                        tmp40 = Parser.tracer.print(tmp39, 537);
                        return acc
                      }
                    }
                  }
                } else if (scrut21 instanceof Option.None.class) {
                  return acc
                } else {
                  tmp41 = "keyword `" + name1;
                  tmp42 = tmp41 + "` does not have infix rules";
                  doTemp6 = Parser.tracer.print(tmp42, 483);
                  name = param012;
                  if (param12 === true) {
                    scrut15 = runtime.safeCall(Keyword.allKeywords.get(name));
                    if (scrut15 instanceof Option.None.class) {
                      tmp43 = "found an operator \"" + name;
                      tmp44 = tmp43 + "\"";
                      doTemp3 = Parser.tracer.print(tmp44, 485);
                      scrut16 = Precedence.opPrec(name);
                      if (globalThis.Array.isArray(scrut16) && scrut16.length === 2) {
                        first0 = scrut16[0];
                        first1 = scrut16[1];
                        leftPrec2 = first0;
                        rightPrec2 = first1;
                        tmp45 = "its precedence is " + leftPrec2;
                        doTemp4 = Parser.tracer.print(tmp45, 487);
                        scrut17 = leftPrec2 > prec;
                        if (scrut17 === true) {
                          tmp46 = consume();
                          tmp47 = Tree.Ident(name, true);
                          op3 = tmp47;
                          tmp48 = simpleExpr(rightPrec2, bracket);
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
                          tmp52 = Parser.tracer.print("found an application", 531);
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
                          tmp56 = Parser.tracer.print(tmp55, 537);
                          return acc
                        }
                      }
                    } else {
                      token1 = param01;
                      scrut2 = Precedence.appPrec > prec;
                      if (scrut2 === true) {
                        tmp57 = Parser.tracer.print("found an application", 531);
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
                        tmp61 = Parser.tracer.print(tmp60, 537);
                        return acc
                      }
                    }
                  } else {
                    token1 = param01;
                    scrut2 = Precedence.appPrec > prec;
                    if (scrut2 === true) {
                      tmp62 = Parser.tracer.print("found an application", 531);
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
                      tmp66 = Parser.tracer.print(tmp65, 537);
                      return acc
                    }
                  }
                }
              } else {
                tmp67 = "keyword `" + name1;
                tmp68 = tmp67 + "` does not have infix rules";
                doTemp6 = Parser.tracer.print(tmp68, 483);
                name = param012;
                if (param12 === true) {
                  scrut15 = runtime.safeCall(Keyword.allKeywords.get(name));
                  if (scrut15 instanceof Option.None.class) {
                    tmp69 = "found an operator \"" + name;
                    tmp70 = tmp69 + "\"";
                    doTemp3 = Parser.tracer.print(tmp70, 485);
                    scrut16 = Precedence.opPrec(name);
                    if (globalThis.Array.isArray(scrut16) && scrut16.length === 2) {
                      first0 = scrut16[0];
                      first1 = scrut16[1];
                      leftPrec2 = first0;
                      rightPrec2 = first1;
                      tmp71 = "its precedence is " + leftPrec2;
                      doTemp4 = Parser.tracer.print(tmp71, 487);
                      scrut17 = leftPrec2 > prec;
                      if (scrut17 === true) {
                        tmp72 = consume();
                        tmp73 = Tree.Ident(name, true);
                        op3 = tmp73;
                        tmp74 = simpleExpr(rightPrec2, bracket);
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
                        tmp78 = Parser.tracer.print("found an application", 531);
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
                        tmp82 = Parser.tracer.print(tmp81, 537);
                        return acc
                      }
                    }
                  } else {
                    token1 = param01;
                    scrut2 = Precedence.appPrec > prec;
                    if (scrut2 === true) {
                      tmp83 = Parser.tracer.print("found an application", 531);
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
                      tmp87 = Parser.tracer.print(tmp86, 537);
                      return acc
                    }
                  }
                } else {
                  token1 = param01;
                  scrut2 = Precedence.appPrec > prec;
                  if (scrut2 === true) {
                    tmp88 = Parser.tracer.print("found an application", 531);
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
                    tmp92 = Parser.tracer.print(tmp91, 537);
                    return acc
                  }
                }
              }
            } else {
              tmp93 = "keyword `" + name1;
              tmp94 = tmp93 + "` does not have infix rules";
              doTemp6 = Parser.tracer.print(tmp94, 483);
              name = param012;
              if (param12 === true) {
                scrut15 = runtime.safeCall(Keyword.allKeywords.get(name));
                if (scrut15 instanceof Option.None.class) {
                  tmp95 = "found an operator \"" + name;
                  tmp96 = tmp95 + "\"";
                  doTemp3 = Parser.tracer.print(tmp96, 485);
                  scrut16 = Precedence.opPrec(name);
                  if (globalThis.Array.isArray(scrut16) && scrut16.length === 2) {
                    first0 = scrut16[0];
                    first1 = scrut16[1];
                    leftPrec2 = first0;
                    rightPrec2 = first1;
                    tmp97 = "its precedence is " + leftPrec2;
                    doTemp4 = Parser.tracer.print(tmp97, 487);
                    scrut17 = leftPrec2 > prec;
                    if (scrut17 === true) {
                      tmp98 = consume();
                      tmp99 = Tree.Ident(name, true);
                      op3 = tmp99;
                      tmp100 = simpleExpr(rightPrec2, bracket);
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
                      tmp104 = Parser.tracer.print("found an application", 531);
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
                      tmp108 = Parser.tracer.print(tmp107, 537);
                      return acc
                    }
                  }
                } else {
                  token1 = param01;
                  scrut2 = Precedence.appPrec > prec;
                  if (scrut2 === true) {
                    tmp109 = Parser.tracer.print("found an application", 531);
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
                    tmp113 = Parser.tracer.print(tmp112, 537);
                    return acc
                  }
                }
              } else {
                token1 = param01;
                scrut2 = Precedence.appPrec > prec;
                if (scrut2 === true) {
                  tmp114 = Parser.tracer.print("found an application", 531);
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
                  tmp118 = Parser.tracer.print(tmp117, 537);
                  return acc
                }
              }
            }
          } else {
            name = param012;
            if (param12 === true) {
              scrut15 = runtime.safeCall(Keyword.allKeywords.get(name));
              if (scrut15 instanceof Option.None.class) {
                tmp119 = "found an operator \"" + name;
                tmp120 = tmp119 + "\"";
                doTemp3 = Parser.tracer.print(tmp120, 485);
                scrut16 = Precedence.opPrec(name);
                if (globalThis.Array.isArray(scrut16) && scrut16.length === 2) {
                  first0 = scrut16[0];
                  first1 = scrut16[1];
                  leftPrec2 = first0;
                  rightPrec2 = first1;
                  tmp121 = "its precedence is " + leftPrec2;
                  doTemp4 = Parser.tracer.print(tmp121, 487);
                  scrut17 = leftPrec2 > prec;
                  if (scrut17 === true) {
                    tmp122 = consume();
                    tmp123 = Tree.Ident(name, true);
                    op3 = tmp123;
                    tmp124 = simpleExpr(rightPrec2, bracket);
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
                    tmp128 = Parser.tracer.print("found an application", 531);
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
                    tmp132 = Parser.tracer.print(tmp131, 537);
                    return acc
                  }
                }
              } else {
                token1 = param01;
                scrut2 = Precedence.appPrec > prec;
                if (scrut2 === true) {
                  tmp133 = Parser.tracer.print("found an application", 531);
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
                  tmp137 = Parser.tracer.print(tmp136, 537);
                  return acc
                }
              }
            } else {
              token1 = param01;
              scrut2 = Precedence.appPrec > prec;
              if (scrut2 === true) {
                tmp138 = Parser.tracer.print("found an application", 531);
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
                tmp142 = Parser.tracer.print(tmp141, 537);
                return acc
              }
            }
          }
        } else if (param01 instanceof Lexer.Token.Close.class) {
          param010 = param01.kind;
          kind = param010;
          tmp143 = "found a close bracket of " + kind;
          doTemp2 = Parser.tracer.print(tmp143, 496);
          if (bracket instanceof Option.Some.class) {
            param011 = bracket.value;
            kind$_ = param011;
            scrut14 = kind == kind$_;
            if (scrut14 === true) {
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
              tmp144 = Parser.tracer.print("found an application", 531);
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
              tmp148 = Parser.tracer.print(tmp147, 537);
              return acc
            }
          }
        } else if (param01 instanceof Lexer.Token.Semicolon.class) {
          tmp149 = Parser.tracer.print("found a semicolon", 502);
          scrut9 = runtime.safeCall(Keyword.allKeywords.get(";"));
          if (scrut9 instanceof Option.Some.class) {
            param06 = scrut9.value;
            keyword3 = param06;
            scrut10 = keyword3.leftPrec;
            if (scrut10 instanceof Option.Some.class) {
              param07 = scrut10.value;
              leftPrec1 = param07;
              scrut11 = leftPrec1 > prec;
              if (scrut11 === true) {
                tmp150 = consume();
                scrut12 = keyword3.rightPrec;
                if (scrut12 instanceof Option.Some.class) {
                  param08 = scrut12.value;
                  rightPrec1 = param08;
                  scrut13 = simpleExpr(rightPrec1, bracket);
                  if (scrut13 instanceof Tree.Sequence.class) {
                    param09 = scrut13.trees;
                    trees1 = param09;
                    tmp151 = Stack.Cons(acc, trees1);
                    tmp152 = Tree.Sequence(tmp151);
                  } else {
                    tree2 = scrut13;
                    tmp153 = Stack.Cons(tree2, Stack.Nil);
                    tmp154 = Stack.Cons(acc, tmp153);
                    tmp152 = Tree.Sequence(tmp154);
                  }
                  acc$_1 = tmp152;
                  return exprCont(acc$_1, prec, bracket)
                } else {
                  throw new globalThis.Error("match error");
                }
              } else {
                tmp155 = "cannot consume " + keyword3;
                tmp156 = Parser.tracer.print(tmp155, 513);
                return acc
              }
            } else {
              throw new globalThis.Error("match error");
            }
          } else {
            throw new globalThis.Error("match error");
          }
        } else if (param01 instanceof Lexer.Token.Comma.class) {
          tmp157 = Parser.tracer.print("found a comma", 516);
          scrut4 = runtime.safeCall(Keyword.allKeywords.get(","));
          if (scrut4 instanceof Option.Some.class) {
            param02 = scrut4.value;
            keyword2 = param02;
            scrut5 = keyword2.leftPrec;
            if (scrut5 instanceof Option.Some.class) {
              param03 = scrut5.value;
              leftPrec = param03;
              scrut6 = leftPrec > prec;
              if (scrut6 === true) {
                tmp158 = consume();
                scrut7 = keyword2.rightPrec;
                if (scrut7 instanceof Option.Some.class) {
                  param04 = scrut7.value;
                  rightPrec = param04;
                  scrut8 = simpleExpr(rightPrec, bracket);
                  if (scrut8 instanceof Tree.Tuple.class) {
                    param05 = scrut8.trees;
                    trees = param05;
                    tmp159 = Stack.Cons(acc, trees);
                    tmp160 = Tree.Tuple(tmp159);
                  } else {
                    tree1 = scrut8;
                    tmp161 = Stack.Cons(tree1, Stack.Nil);
                    tmp162 = Stack.Cons(acc, tmp161);
                    tmp160 = Tree.Tuple(tmp162);
                  }
                  acc$_ = tmp160;
                  return exprCont(acc$_, prec, bracket)
                } else {
                  throw new globalThis.Error("match error");
                }
              } else {
                tmp163 = "cannot consume " + keyword2;
                tmp164 = Parser.tracer.print(tmp163, 527);
                return acc
              }
            } else {
              throw new globalThis.Error("match error");
            }
          } else {
            throw new globalThis.Error("match error");
          }
        } else {
          token1 = param01;
          scrut2 = Precedence.appPrec > prec;
          if (scrut2 === true) {
            tmp165 = Parser.tracer.print("found an application", 531);
            scrut3 = simpleExpr(Precedence.appPrec, bracket);
            if (scrut3 instanceof Tree.Empty.class) {
              return acc
            } else if (scrut3 instanceof Tree.Error.class) {
              return acc
            } else {
              rhs = scrut3;
              tmp166 = Stack.Cons(rhs, Stack.Nil);
              tmp167 = Tree.App(acc, tmp166);
              return exprCont(tmp167, prec, bracket)
            }
          } else {
            tmp168 = "cannot consume " + token1;
            tmp169 = Parser.tracer.print(tmp168, 537);
            return acc
          }
        }
      } else if (scrut1 instanceof Stack.Nil.class) {
        doTemp1 = Parser.tracer.print("found an EOF", 540);
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
    current = tokens;
    counter = 0;
    tmp = simpleExpr(0, Option.None);
    tree = tmp;
    tmp1 = yeetSpaces();
    scrut = tmp1;
    if (scrut instanceof Stack.Cons.class) {
      param0 = scrut.head;
      param1 = scrut.tail;
      token = param0;
      tmp2 = "expect EOF instead of " + token;
      message = tmp2;
      tmp3 = Parser.tracer.print(message, 548);
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
