import runtime from "./../../Runtime.mjs";
import BetterMap from "./../../BetterMap.mjs";
import Iter from "./../../Iter.mjs";
import Option from "./../../Option.mjs";
import Stack from "./../../Stack.mjs";
import Token from "./Token.mjs";
import Keyword1 from "./Keyword.mjs";
import Tree from "./Tree.mjs";
let ParseRule2;
ParseRule2 = class ParseRule {
  static {
    this.ParseRule = function ParseRule(name1, choices1) { return new ParseRule.class(name1, choices1); };
    this.ParseRule.class = class ParseRule1 {
      #_keywordChoices;
      constructor(name, choices) {
        this.name = name;
        this.choices = choices;
        this.#_keywordChoices = Option.None;
      }
      andThen(rest) {
        let tmp, tmp1, tmp2, tmp3, tmp4;
        tmp = Iter.fromStack(this.choices);
        tmp1 = (caseScrut) => {
          let param0, param1, get, make, get$_, make$_, param01, param11, rule, rest$_, param02, param12, param2, isType, process, rest$_1, param03, param13, keyword, rest$_2, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11;
          if (caseScrut instanceof ParseRule.Choice.Keyword.class) {
            param03 = caseScrut.keyword;
            param13 = caseScrut.rest;
            keyword = param03;
            rest$_2 = param13;
            tmp5 = runtime.safeCall(rest$_2.andThen(rest));
            tmp6 = ParseRule.Choice.Keyword(keyword, tmp5);
            return [
              tmp6
            ]
          } else if (caseScrut instanceof ParseRule.Choice.Expr.class) {
            param02 = caseScrut.isType;
            param12 = caseScrut.process;
            param2 = caseScrut.rest;
            isType = param02;
            process = param12;
            rest$_1 = param2;
            tmp7 = runtime.safeCall(rest$_1.andThen(rest));
            tmp8 = ParseRule.Choice.Expr(isType, process, tmp7);
            return [
              tmp8
            ]
          } else if (caseScrut instanceof ParseRule.Choice.End.class) {
            return Iter.fromStack(rest.choices)
          } else if (caseScrut instanceof ParseRule.Choice.Optional.class) {
            param01 = caseScrut.rule;
            param11 = caseScrut.rest;
            rule = param01;
            rest$_ = param11;
            tmp9 = runtime.safeCall(rest$_.andThen(rest));
            tmp10 = ParseRule.Choice.Optional(globalThis.process, rule, tmp9);
            return [
              tmp10
            ]
          } else if (caseScrut instanceof ParseRule.Choice.Lazy.class) {
            param0 = caseScrut.get;
            param1 = caseScrut.make;
            get = param0;
            make = param1;
            get$_ = () => {
              let tmp12;
              tmp12 = runtime.safeCall(get());
              return this.andThen(tmp12, rest)
            };
            make$_ = (getChoice) => {
              return runtime.safeCall(make(() => {
                return this.andThen(getChoice, rest)
              }))
            };
            tmp11 = ParseRule.Choice.Lazy(get$_, make$_);
            return [
              tmp11
            ]
          } else {
            throw new globalThis.Error("match error");
          }
        };
        tmp2 = Iter.mapping(tmp, tmp1);
        tmp3 = Iter.flattening(tmp2);
        tmp4 = Iter.toStack(tmp3);
        return ParseRule.ParseRule(this.name, tmp4)
      } 
      get endChoice() {
        let tmp, tmp1;
        tmp = Iter.fromStack(this.choices);
        tmp1 = (choice) => {
          let scrut, param0, param1, rest1, param01, value;
          scrut = ParseRule.Choice.forced(choice);
          if (scrut instanceof ParseRule.Choice.End.class) {
            param01 = scrut.value;
            value = param01;
            return Option.Some(value)
          } else if (scrut instanceof ParseRule.Choice.Optional.class) {
            param0 = scrut.rule;
            param1 = scrut.rest;
            rest1 = param1;
            return rest1.endChoice
          } else {
            return Option.None
          }
        };
        return Iter.firstDefined(tmp, tmp1);
      } 
      get keywordChoices() {
        let scrut, param0, cache, computed, tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6;
        scrut = this.#_keywordChoices;
        if (scrut instanceof Option.None.class) {
          tmp = Iter.fromStack(this.choices);
          tmp1 = (choice) => {
            let scrut1, param01, param1, rule, rest1, param02, param11, keyword, rest2, tmp7, tmp8, tmp9;
            scrut1 = ParseRule.Choice.forced(choice);
            if (scrut1 instanceof ParseRule.Choice.Keyword.class) {
              param02 = scrut1.keyword;
              param11 = scrut1.rest;
              keyword = param02;
              rest2 = param11;
              return [
                [
                  keyword.name,
                  rest2
                ]
              ]
            } else if (scrut1 instanceof ParseRule.Choice.Optional.class) {
              param01 = scrut1.rule;
              param1 = scrut1.rest;
              rule = param01;
              rest1 = param1;
              tmp7 = (caseScrut) => {
                let first1, first0, keyword1, rule1, tmp10;
                if (globalThis.Array.isArray(caseScrut) && caseScrut.length === 2) {
                  first0 = caseScrut[0];
                  first1 = caseScrut[1];
                  keyword1 = first0;
                  rule1 = first1;
                  tmp10 = runtime.safeCall(rule1.andThen(rest1));
                  return [
                    keyword1,
                    tmp10
                  ]
                } else {
                  throw new globalThis.Error("match error");
                }
              };
              tmp8 = Iter.mapping(rule.keywordChoices, tmp7);
              tmp9 = Iter.appended(tmp8, rest1.keywordChoices);
              return Iter.toArray(tmp9)
            } else {
              return []
            }
          };
          tmp2 = Iter.mapping(tmp, tmp1);
          tmp3 = Iter.flattening(tmp2);
          tmp4 = Iter.toArray(tmp3);
          tmp5 = BetterMap.toMap(tmp4);
          computed = tmp5;
          tmp6 = Option.Some(computed);
          this.#_keywordChoices = tmp6;
          return computed
        } else if (scrut instanceof Option.Some.class) {
          param0 = scrut.value;
          cache = param0;
          return cache
        } else {
          throw new globalThis.Error("match error");
        }
      } 
      get exprChoice() {
        let tmp, tmp1;
        tmp = Iter.fromStack(this.choices);
        tmp1 = (choice) => {
          let scrut, param0, param1, rule, rest1, scrut1, param01, first1, first0, process, rest$_, param02, param11, param2, isType, process1, rest2, tmp2;
          scrut = ParseRule.Choice.forced(choice);
          if (scrut instanceof ParseRule.Choice.Expr.class) {
            param02 = scrut.isType;
            param11 = scrut.process;
            param2 = scrut.rest;
            isType = param02;
            process1 = param11;
            rest2 = param2;
            return Option.Some([
              isType,
              process1,
              rest2
            ])
          } else if (scrut instanceof ParseRule.Choice.Optional.class) {
            param0 = scrut.rule;
            param1 = scrut.rest;
            rule = param0;
            rest1 = param1;
            scrut1 = rule.exprChoice;
            if (scrut1 instanceof Option.Some.class) {
              param01 = scrut1.value;
              if (globalThis.Array.isArray(param01) && param01.length === 2) {
                first0 = param01[0];
                first1 = param01[1];
                process = first0;
                rest$_ = first1;
                tmp2 = runtime.safeCall(rest$_.andThen(rest1));
                return Option.Some([
                  process,
                  tmp2
                ])
              } else {
                return rest1.exprChoice
              }
            } else {
              return rest1.exprChoice
            }
          } else {
            return Option.None
          }
        };
        return Iter.firstDefined(tmp, tmp1);
      } 
      get display() {
        let go, Knot1, displayChoice, scrut, first1, first0, name1, lines, rest1, first01, head, tail, line, tmp, tmp1, tmp2, tmp3, tmp4;
        displayChoice = function displayChoice(choice) {
          let other, param0, param1, get, make, scrut1, param01, param11, rule, rest2, prefix, scrut2, first11, first02, name2, lines1, name3, first03, line1, scrut3, first12, first04, name4, lines2, name5, first05, line2, param02, param12, param2, isType, rest3, prefix1, scrut4, first13, first06, name6, lines3, name7, first07, line3, param03, param13, keyword, rest4, prefix2, scrut5, first14, first08, name8, rest5, first09, head1, tail$_, name9, line4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20, tmp21, tmp22, tmp23, tmp24;
          if (choice instanceof ParseRule.Choice.Keyword.class) {
            param03 = choice.keyword;
            param13 = choice.rest;
            keyword = param03;
            rest4 = param13;
            tmp5 = "`" + keyword.name;
            prefix2 = tmp5 + "` ";
            scrut5 = go(rest4);
            if (globalThis.Array.isArray(scrut5) && scrut5.length === 2) {
              first08 = scrut5[0];
              first14 = scrut5[1];
              name9 = first08;
              name8 = first08;
              if (globalThis.Array.isArray(first14) && first14.length === 1) {
                first09 = first14[0];
                line4 = first09;
                tmp6 = prefix2 + line4;
                return [
                  tmp6
                ]
              } else if (globalThis.Array.isArray(first14) && first14.length >= 1) {
                first09 = first14[0];
                rest5 = runtime.safeCall(globalThis.Predef.tupleSlice(first14, 1, 0));
                head1 = first09;
                tail$_ = rest5;
                tmp7 = prefix2 + head1;
                return [
                  tmp7,
                  ...tail$_
                ]
              } else {
                other = choice;
                tmp8 = runtime.safeCall(globalThis.JSON.stringify(other));
                tmp9 = "<unknown>" + tmp8;
                return [
                  tmp9
                ]
              }
            } else {
              other = choice;
              tmp10 = runtime.safeCall(globalThis.JSON.stringify(other));
              tmp11 = "<unknown>" + tmp10;
              return [
                tmp11
              ]
            }
          } else if (choice instanceof ParseRule.Choice.Expr.class) {
            param02 = choice.isType;
            param12 = choice.process;
            param2 = choice.rest;
            isType = param02;
            rest3 = param2;
            if (isType === true) {
              tmp12 = "<typexpr> ";
            } else {
              tmp12 = "<expr> ";
            }
            prefix1 = tmp12;
            scrut4 = go(rest3);
            if (globalThis.Array.isArray(scrut4) && scrut4.length === 2) {
              first06 = scrut4[0];
              first13 = scrut4[1];
              name7 = first06;
              if (globalThis.Array.isArray(first13) && first13.length === 1) {
                first07 = first13[0];
                line3 = first07;
                tmp13 = prefix1 + line3;
                return [
                  tmp13
                ]
              } else {
                name6 = first06;
                lines3 = first13;
                tmp14 = runtime.safeCall(lines3.map((line5, _, _1) => {
                  return "  " + line5
                }));
                return [
                  prefix1,
                  ...tmp14
                ]
              }
            } else {
              other = choice;
              tmp15 = runtime.safeCall(globalThis.JSON.stringify(other));
              tmp16 = "<unknown>" + tmp15;
              return [
                tmp16
              ]
            }
          } else if (choice instanceof ParseRule.Choice.Optional.class) {
            param01 = choice.rule;
            param11 = choice.rest;
            rule = param01;
            rest2 = param11;
            scrut2 = go(rule);
            if (globalThis.Array.isArray(scrut2) && scrut2.length === 2) {
              first02 = scrut2[0];
              first11 = scrut2[1];
              name3 = first02;
              if (globalThis.Array.isArray(first11) && first11.length === 1) {
                first03 = first11[0];
                line1 = first03;
                tmp17 = line1;
              } else {
                name2 = first02;
                lines1 = first11;
                tmp17 = runtime.safeCall(lines1.map((line5, _, _1) => {
                  return "  " + line5
                }));
              }
            } else {
              throw new globalThis.Error("match error");
            }
            tmp18 = "[" + tmp17;
            tmp19 = tmp18 + "] ";
            prefix = tmp19;
            scrut3 = go(rest2);
            if (globalThis.Array.isArray(scrut3) && scrut3.length === 2) {
              first04 = scrut3[0];
              first12 = scrut3[1];
              name5 = first04;
              if (globalThis.Array.isArray(first12) && first12.length === 1) {
                first05 = first12[0];
                line2 = first05;
                tmp20 = prefix + line2;
                return [
                  tmp20
                ]
              } else {
                name4 = first04;
                lines2 = first12;
                tmp21 = runtime.safeCall(lines2.map((line5, _, _1) => {
                  return "  " + line5
                }));
                return [
                  prefix,
                  ...tmp21
                ]
              }
            } else {
              throw new globalThis.Error("match error");
            }
          } else if (choice instanceof ParseRule.Choice.End.class) {
            return [
              ""
            ]
          } else if (choice instanceof ParseRule.Choice.Lazy.class) {
            param0 = choice.get;
            param1 = choice.make;
            get = param0;
            make = param1;
            scrut1 = runtime.safeCall(get());
            if (scrut1 instanceof Knot1.class) {
              return [
                "<rec>"
              ]
            } else {
              tmp22 = runtime.safeCall(make(() => {
                return Knot1
              }));
              return displayChoice(tmp22)
            }
          } else {
            other = choice;
            tmp23 = runtime.safeCall(globalThis.JSON.stringify(other));
            tmp24 = "<unknown>" + tmp23;
            return [
              tmp24
            ]
          }
        };
        go = function go(rule) {
          let choices1, lines1, param0, param1, head1, tail1, tmp5, tmp6, tmp7, tmp8;
          choices1 = rule.choices;
          lines1 = [];
          tmp9: while (true) {
            if (choices1 instanceof Stack.Cons.class) {
              param0 = choices1.head;
              param1 = choices1.tail;
              head1 = param0;
              tail1 = param1;
              tmp5 = displayChoice(head1);
              tmp6 = runtime.safeCall(lines1.push(tmp5));
              choices1 = tail1;
              tmp7 = runtime.Unit;
              continue tmp9;
            } else {
              tmp7 = runtime.Unit;
            }
            break;
          }
          tmp8 = runtime.safeCall(lines1.flat());
          return [
            rule.name,
            tmp8
          ]
        };
        const Knot$class = class Knot {
          constructor() {}
          toString() { return "Knot"; }
        }; Knot1 = new Knot$class;
        Knot1.class = Knot$class;
        scrut = go(this);
        if (globalThis.Array.isArray(scrut) && scrut.length === 2) {
          first0 = scrut[0];
          first1 = scrut[1];
          name1 = first0;
          lines = first1;
          tmp = "<" + name1;
          tmp1 = tmp + "> ::= ";
          if (globalThis.Array.isArray(lines) && lines.length === 1) {
            first01 = lines[0];
            line = first01;
            tmp2 = line;
          } else if (globalThis.Array.isArray(lines) && lines.length >= 1) {
            first01 = lines[0];
            rest1 = runtime.safeCall(globalThis.Predef.tupleSlice(lines, 1, 0));
            head = first01;
            tail = rest1;
            tmp3 = head + "\n";
            tmp4 = runtime.safeCall(tail.join("\n"));
            tmp2 = tmp3 + tmp4;
          } else {
            throw new globalThis.Error("match error");
          }
          return tmp1 + tmp2
        } else {
          throw new globalThis.Error("match error");
        }
      }
      toString() { return "ParseRule(" + globalThis.Predef.render(this.name) + ", " + globalThis.Predef.render(this.choices) + ")"; }
    };
    this.Choice = class Choice {
      static {
        this.Keyword = function Keyword(keyword1, rest1) { return new Keyword.class(keyword1, rest1); };
        this.Keyword.class = class Keyword {
          constructor(keyword, rest) {
            this.keyword = keyword;
            this.rest = rest;
          }
          toString() { return "Keyword(" + globalThis.Predef.render(this.keyword) + ", " + globalThis.Predef.render(this.rest) + ")"; }
        };
        this.Expr = function Expr(isType1, process1, rest1) { return new Expr.class(isType1, process1, rest1); };
        this.Expr.class = class Expr {
          constructor(isType, process, rest) {
            this.isType = isType;
            this.process = process;
            this.rest = rest;
          }
          toString() { return "Expr(" + globalThis.Predef.render(this.isType) + ", " + globalThis.Predef.render(this.process) + ", " + globalThis.Predef.render(this.rest) + ")"; }
        };
        this.End = function End(value1) { return new End.class(value1); };
        this.End.class = class End {
          constructor(value) {
            this.value = value;
          }
          toString() { return "End(" + globalThis.Predef.render(this.value) + ")"; }
        };
        this.Optional = function Optional(rule1, rest1) { return new Optional.class(rule1, rest1); };
        this.Optional.class = class Optional {
          constructor(rule, rest) {
            this.rule = rule;
            this.rest = rest;
          }
          toString() { return "Optional(" + globalThis.Predef.render(this.rule) + ", " + globalThis.Predef.render(this.rest) + ")"; }
        };
        this.Lazy = function Lazy(get1, make1) { return new Lazy.class(get1, make1); };
        this.Lazy.class = class Lazy {
          constructor(get, make) {
            this.get = get;
            this.make = make;
          }
          toString() { return "Lazy(" + globalThis.Predef.render(this.get) + ", " + globalThis.Predef.render(this.make) + ")"; }
        };
      }
      static forced(choice) {
        let param0, param1, get;
        if (choice instanceof Choice.Lazy.class) {
          param0 = choice.get;
          param1 = choice.make;
          get = param0;
          return runtime.safeCall(get())
        } else {
          return choice
        }
      } 
      static keyword(keyword, name, ...choices) {
        let tmp;
        tmp = ParseRule.rule(name, ...choices);
        return Choice.Keyword(keyword, tmp)
      } 
      static expr(process, name1, ...choices1) {
        let tmp;
        tmp = ParseRule.rule(name1, ...choices1);
        return Choice.Expr(false, process, tmp)
      } 
      static typexpr(process1, name2, ...choices2) {
        let tmp;
        tmp = ParseRule.rule(name2, ...choices2);
        return Choice.Expr(true, process1, tmp)
      } 
      static end(value) {
        return Choice.End(value)
      } 
      static lazy(makeChoice) {
        let getChoice, cache;
        getChoice = function getChoice() {
          let param0, choice1, tmp;
          if (cache instanceof Option.Some.class) {
            param0 = cache.value;
            choice1 = param0;
            return choice1
          } else {
            tmp = runtime.safeCall(makeChoice(getChoice));
            cache = tmp;
            return cache
          }
        };
        cache = Option.None;
        return Choice.Lazy(getChoice, makeChoice)
      }
      static toString() { return "Choice"; }
    };
  }
  static rule(name, ...choices) {
    let tmp;
    tmp = Iter.toStack(choices);
    return ParseRule.ParseRule(name, tmp)
  }
  static toString() { return "ParseRule"; }
};
let ParseRule = ParseRule2; export default ParseRule;
