import runtime from "./../../Runtime.mjs";
import BetterMap from "./../../BetterMap.mjs";
import Iter from "./../../Iter.mjs";
import Option from "./../../Option.mjs";
import Stack from "./../../Stack.mjs";
import Predef from "./../../Predef.mjs";
import Token from "./Token.mjs";
import Keyword1 from "./Keyword.mjs";
import Tree from "./Tree.mjs";
let ParseRule2;
ParseRule2 = class ParseRule {
  static {
    this.ParseRule = function ParseRule(name1, choices1) { return new ParseRule.class(name1, choices1); };
    this.ParseRule.class = class ParseRule1 {
      #_endChoice;
      #_computeEndChoice;
      #_keywordChoices;
      #_computeKeywordsChoices;
      #_exprChoice;
      #_computeExprChoice;
      constructor(name, choices) {
        this.name = name;
        this.choices = choices;
        let tmp;
        this.#_endChoice = Option.None;
        this.#_computeEndChoice = () => {
          let tmp1, tmp2;
          tmp1 = Iter.fromStack(this.choices);
          tmp2 = (choice) => {
            let scrut, param0, param1, param2, rest, param01, value;
            scrut = ParseRule.Choice.forced(choice);
            if (scrut instanceof ParseRule.Choice.End.class) {
              param01 = scrut.value;
              value = param01;
              return Option.Some(value)
            } else if (scrut instanceof ParseRule.Choice.Siding.class) {
              param0 = scrut.rule;
              param1 = scrut.optional;
              param2 = scrut.rest;
              rest = param2;
              return rest.endChoice
            } else {
              return Option.None
            }
          };
          return Iter.firstDefined(tmp1, tmp2)
        };
        this.#_keywordChoices = Option.None;
        tmp = () => {
          let tmp1, tmp2, tmp3, tmp4, tmp5;
          tmp1 = Iter.fromStack(this.choices);
          tmp2 = (choice) => {
            let scrut, param0, param1, param2, rule, optional, rest, param01, param11, keyword, rest1, tmp6, tmp7, tmp8, tmp9;
            scrut = ParseRule.Choice.forced(choice);
            if (scrut instanceof ParseRule.Choice.Keyword.class) {
              param01 = scrut.keyword;
              param11 = scrut.rest;
              keyword = param01;
              rest1 = param11;
              return [
                [
                  keyword.name,
                  rest1
                ]
              ]
            } else if (scrut instanceof ParseRule.Choice.Siding.class) {
              param0 = scrut.rule;
              param1 = scrut.optional;
              param2 = scrut.rest;
              rule = param0;
              optional = param1;
              rest = param2;
              tmp6 = (caseScrut) => {
                let first1, first0, keyword1, rule1, tmp10;
                if (globalThis.Array.isArray(caseScrut) && caseScrut.length === 2) {
                  first0 = caseScrut[0];
                  first1 = caseScrut[1];
                  keyword1 = first0;
                  rule1 = first1;
                  tmp10 = runtime.safeCall(rule1.andThen(rest));
                  return [
                    keyword1,
                    tmp10
                  ]
                } else {
                  throw new globalThis.Error("match error");
                }
              };
              tmp7 = Iter.mapping(rule.keywordChoices, tmp6);
              if (optional === true) {
                tmp8 = [];
              } else {
                tmp8 = rest.keywordChoices;
              }
              tmp9 = Iter.appended(tmp7, tmp8);
              return Iter.toArray(tmp9)
            } else {
              return []
            }
          };
          tmp3 = Iter.mapping(tmp1, tmp2);
          tmp4 = Iter.flattening(tmp3);
          tmp5 = Iter.toArray(tmp4);
          return BetterMap.toMap(tmp5)
        };
        this.#_computeKeywordsChoices = tmp;
        this.#_exprChoice = Option.None;
        this.#_computeExprChoice = () => {
          let tmp1, tmp2;
          tmp1 = Iter.fromStack(this.choices);
          tmp2 = (choice) => {
            let scrut, param0, param1, param2, rule, optional, rest, scrut1, param01, first4, first3, first2, first1, first0, kind, process, outerPrec, innerPrec, rest$_, param02, param11, param21, param3, param4, isType, process1, outerPrec1, innerPrec1, rest1, tmp3;
            scrut = ParseRule.Choice.forced(choice);
            if (scrut instanceof ParseRule.Choice.Ref.class) {
              param02 = scrut.kind;
              param11 = scrut.process;
              param21 = scrut.outerPrec;
              param3 = scrut.innerPrec;
              param4 = scrut.rest;
              isType = param02;
              process1 = param11;
              outerPrec1 = param21;
              innerPrec1 = param3;
              rest1 = param4;
              return Option.Some([
                isType,
                process1,
                outerPrec1,
                innerPrec1,
                rest1
              ])
            } else if (scrut instanceof ParseRule.Choice.Siding.class) {
              param0 = scrut.rule;
              param1 = scrut.optional;
              param2 = scrut.rest;
              rule = param0;
              optional = param1;
              rest = param2;
              scrut1 = rule.exprChoice;
              if (scrut1 instanceof Option.Some.class) {
                param01 = scrut1.value;
                if (globalThis.Array.isArray(param01) && param01.length === 5) {
                  first0 = param01[0];
                  first1 = param01[1];
                  first2 = param01[2];
                  first3 = param01[3];
                  first4 = param01[4];
                  kind = first0;
                  process = first1;
                  outerPrec = first2;
                  innerPrec = first3;
                  rest$_ = first4;
                  tmp3 = rest$_.andThen(innerPrec, rest);
                  return Option.Some([
                    kind,
                    process,
                    outerPrec,
                    tmp3
                  ])
                } else {
                  if (optional === true) {
                    return rest.exprChoice
                  } else {
                    return Option.None
                  }
                }
              } else {
                if (optional === true) {
                  return rest.exprChoice
                } else {
                  return Option.None
                }
              }
            } else {
              return Option.None
            }
          };
          return Iter.firstDefined(tmp1, tmp2)
        };
      }
      map(op) {
        let tmp, tmp1, tmp2;
        tmp = Iter.fromStack(this.choices);
        tmp1 = Iter.mapping(tmp, (choice) => {
          return ParseRule.Choice.map(choice, op)
        });
        tmp2 = Iter.toStack(tmp1);
        return ParseRule.ParseRule(this.name, tmp2)
      } 
      andThen(rest) {
        let tmp, tmp1, tmp2, tmp3, tmp4;
        tmp = Iter.fromStack(this.choices);
        tmp1 = (caseScrut) => {
          let param0, param1, get, make, get$_, make$_, param01, param11, param2, rule, optional, rest$_, param02, param12, param21, param3, param4, isType, process, outerPrec, innerPrec, rest$_1, param03, param13, keyword, rest$_2, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11;
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
          } else if (caseScrut instanceof ParseRule.Choice.Ref.class) {
            param02 = caseScrut.kind;
            param12 = caseScrut.process;
            param21 = caseScrut.outerPrec;
            param3 = caseScrut.innerPrec;
            param4 = caseScrut.rest;
            isType = param02;
            process = param12;
            outerPrec = param21;
            innerPrec = param3;
            rest$_1 = param4;
            tmp7 = runtime.safeCall(rest$_1.andThen(rest));
            tmp8 = ParseRule.Choice.Ref(isType, process, outerPrec, innerPrec, tmp7);
            return [
              tmp8
            ]
          } else if (caseScrut instanceof ParseRule.Choice.End.class) {
            return Iter.fromStack(rest.choices)
          } else if (caseScrut instanceof ParseRule.Choice.Siding.class) {
            param01 = caseScrut.rule;
            param11 = caseScrut.optional;
            param2 = caseScrut.rest;
            rule = param01;
            optional = param11;
            rest$_ = param2;
            tmp9 = runtime.safeCall(rest$_.andThen(rest));
            tmp10 = ParseRule.Choice.Siding(rule, optional, tmp9);
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
        let scrut, param0, cache, computed, tmp, tmp1;
        scrut = this.#_endChoice;
        if (scrut instanceof Option.None.class) {
          tmp = runtime.safeCall(this.#_computeEndChoice());
          computed = tmp;
          tmp1 = Option.Some(computed);
          this.#_endChoice = tmp1;
          return computed
        } else if (scrut instanceof Option.Some.class) {
          param0 = scrut.value;
          cache = param0;
          return cache
        } else {
          throw new globalThis.Error("match error");
        }
      } 
      get keywordChoices() {
        let scrut, param0, cache, computed, tmp, tmp1;
        scrut = this.#_keywordChoices;
        if (scrut instanceof Option.None.class) {
          tmp = runtime.safeCall(this.#_computeKeywordsChoices());
          computed = tmp;
          tmp1 = Option.Some(computed);
          this.#_keywordChoices = tmp1;
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
        let scrut, param0, cache, computed, tmp, tmp1;
        scrut = this.#_exprChoice;
        if (scrut instanceof Option.None.class) {
          tmp = runtime.safeCall(this.#_computeExprChoice());
          computed = tmp;
          tmp1 = Option.Some(computed);
          this.#_exprChoice = tmp1;
          return computed
        } else if (scrut instanceof Option.Some.class) {
          param0 = scrut.value;
          cache = param0;
          return cache
        } else {
          throw new globalThis.Error("match error");
        }
      } 
      get display() {
        let tail, go, Knot1, displayChoice, scrut, first1, first0, name1, line, tmp, tmp1;
        displayChoice = function displayChoice(choice) {
          let other, param0, param1, get, make, scrut1, param01, param11, param2, rule, optional, rest1, ruleContent, scrut2, first11, first01, name2, line1, prefix, scrut3, first12, first02, name3, line2, param02, param12, param21, param3, param4, kind, rest2, prefix1, scrut4, first13, first03, name4, line3, param03, param13, keyword, rest3, prefix2, scrut5, first14, first04, name5, line4, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17;
          if (choice instanceof ParseRule.Choice.Keyword.class) {
            param03 = choice.keyword;
            param13 = choice.rest;
            keyword = param03;
            rest3 = param13;
            tmp2 = "\"" + keyword.name;
            prefix2 = tmp2 + "\"";
            scrut5 = tail(rest3);
            if (globalThis.Array.isArray(scrut5) && scrut5.length === 2) {
              first04 = scrut5[0];
              first14 = scrut5[1];
              name5 = first04;
              line4 = first14;
              tmp3 = prefix2 + line4;
              return [
                tmp3
              ]
            } else {
              other = choice;
              tmp4 = runtime.safeCall(globalThis.JSON.stringify(other));
              tmp5 = "<unknown>" + tmp4;
              return [
                tmp5
              ]
            }
          } else if (choice instanceof ParseRule.Choice.Ref.class) {
            param02 = choice.kind;
            param12 = choice.process;
            param21 = choice.outerPrec;
            param3 = choice.innerPrec;
            param4 = choice.rest;
            kind = param02;
            rest2 = param4;
            tmp6 = "<" + kind;
            prefix1 = tmp6 + ">";
            scrut4 = tail(rest2);
            if (globalThis.Array.isArray(scrut4) && scrut4.length === 2) {
              first03 = scrut4[0];
              first13 = scrut4[1];
              name4 = first03;
              line3 = first13;
              tmp7 = prefix1 + line3;
              return [
                tmp7
              ]
            } else {
              other = choice;
              tmp8 = runtime.safeCall(globalThis.JSON.stringify(other));
              tmp9 = "<unknown>" + tmp8;
              return [
                tmp9
              ]
            }
          } else if (choice instanceof ParseRule.Choice.Siding.class) {
            param01 = choice.rule;
            param11 = choice.optional;
            param2 = choice.rest;
            rule = param01;
            optional = param11;
            rest1 = param2;
            scrut2 = go(rule, false);
            if (globalThis.Array.isArray(scrut2) && scrut2.length === 2) {
              first01 = scrut2[0];
              first11 = scrut2[1];
              name2 = first01;
              line1 = first11;
              tmp10 = line1;
            } else {
              throw new globalThis.Error("match error");
            }
            ruleContent = tmp10;
            if (optional === true) {
              tmp11 = "[" + ruleContent;
              tmp12 = tmp11 + "]";
            } else {
              tmp13 = "(" + ruleContent;
              tmp12 = tmp13 + ")";
            }
            prefix = tmp12;
            scrut3 = tail(rest1);
            if (globalThis.Array.isArray(scrut3) && scrut3.length === 2) {
              first02 = scrut3[0];
              first12 = scrut3[1];
              name3 = first02;
              line2 = first12;
              tmp14 = prefix + line2;
              return [
                tmp14
              ]
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
              tmp15 = runtime.safeCall(make(() => {
                return Knot1
              }));
              return displayChoice(tmp15)
            }
          } else {
            other = choice;
            tmp16 = runtime.safeCall(globalThis.JSON.stringify(other));
            tmp17 = "<unknown>" + tmp16;
            return [
              tmp17
            ]
          }
        };
        tail = function tail(rest1) {
          let param0, param1, choices1, scrut1, first11, first01, name2, line1, param01, param11, param02, param12, scrut2, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14;
          if (rest1 instanceof ParseRule.ParseRule.class) {
            param0 = rest1.name;
            param1 = rest1.choices;
            choices1 = param1;
            if (choices1 instanceof Stack.Cons.class) {
              param01 = choices1.head;
              param11 = choices1.tail;
              if (param01 instanceof ParseRule.Choice.End.class) {
                if (param11 instanceof Stack.Nil.class) {
                  return [
                    "",
                    ""
                  ]
                } else {
                  scrut1 = go(rest1, false);
                  if (globalThis.Array.isArray(scrut1) && scrut1.length === 2) {
                    first01 = scrut1[0];
                    first11 = scrut1[1];
                    name2 = first01;
                    line1 = first11;
                    if (param11 instanceof Stack.Cons.class) {
                      param02 = param11.head;
                      param12 = param11.tail;
                      tmp2 = Iter.fromStack(choices1);
                      scrut2 = Iter.some(tmp2, (c) => {
                        if (c instanceof ParseRule.Choice.End.class) {
                          return true
                        } else {
                          return false
                        }
                      });
                      if (scrut2 === true) {
                        tmp3 = " [" + line1;
                        tmp4 = tmp3 + "]";
                        return [
                          name2,
                          tmp4
                        ]
                      } else {
                        tmp5 = " (" + line1;
                        tmp6 = tmp5 + ")";
                        return [
                          name2,
                          tmp6
                        ]
                      }
                    } else {
                      tmp7 = " " + line1;
                      return [
                        name2,
                        tmp7
                      ]
                    }
                  } else {
                    throw new globalThis.Error("match error");
                  }
                }
              } else {
                scrut1 = go(rest1, false);
                if (globalThis.Array.isArray(scrut1) && scrut1.length === 2) {
                  first01 = scrut1[0];
                  first11 = scrut1[1];
                  name2 = first01;
                  line1 = first11;
                  if (param11 instanceof Stack.Cons.class) {
                    param02 = param11.head;
                    param12 = param11.tail;
                    tmp8 = Iter.fromStack(choices1);
                    scrut2 = Iter.some(tmp8, (c) => {
                      if (c instanceof ParseRule.Choice.End.class) {
                        return true
                      } else {
                        return false
                      }
                    });
                    if (scrut2 === true) {
                      tmp9 = " [" + line1;
                      tmp10 = tmp9 + "]";
                      return [
                        name2,
                        tmp10
                      ]
                    } else {
                      tmp11 = " (" + line1;
                      tmp12 = tmp11 + ")";
                      return [
                        name2,
                        tmp12
                      ]
                    }
                  } else {
                    tmp13 = " " + line1;
                    return [
                      name2,
                      tmp13
                    ]
                  }
                } else {
                  throw new globalThis.Error("match error");
                }
              }
            } else {
              scrut1 = go(rest1, false);
              if (globalThis.Array.isArray(scrut1) && scrut1.length === 2) {
                first01 = scrut1[0];
                first11 = scrut1[1];
                name2 = first01;
                line1 = first11;
                tmp14 = " " + line1;
                return [
                  name2,
                  tmp14
                ]
              } else {
                throw new globalThis.Error("match error");
              }
            }
          } else {
            throw new globalThis.Error("match error");
          }
        };
        go = function go(rule, top) {
          let content, scrut1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8;
          tmp2 = Iter.fromStack(rule.choices);
          tmp3 = Iter.filtering(tmp2, (caseScrut) => {
            if (caseScrut instanceof ParseRule.Choice.End.class) {
              return false
            } else {
              return true
            }
          });
          tmp4 = Iter.mapping(tmp3, displayChoice);
          if (top === true) {
            tmp5 = "\n  | ";
          } else {
            tmp5 = " | ";
          }
          tmp6 = Iter.joined(tmp4, tmp5);
          content = tmp6;
          if (top === true) {
            tmp7 = "\n  | " + content;
          } else {
            scrut1 = rule.choices.length > 1;
            if (scrut1 === true) {
              tmp8 = "(" + content;
              tmp7 = tmp8 + ")";
            } else {
              tmp7 = content;
            }
          }
          return Predef.tuple(rule.name, tmp7)
        };
        const Knot$class = class Knot {
          constructor() {}
          toString() { return "Knot"; }
        }; Knot1 = new Knot$class;
        Knot1.class = Knot$class;
        scrut = go(this, true);
        if (globalThis.Array.isArray(scrut) && scrut.length === 2) {
          first0 = scrut[0];
          first1 = scrut[1];
          name1 = first0;
          line = first1;
          tmp = "<" + name1;
          tmp1 = tmp + "> ::= ";
          return tmp1 + line
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
        this.Ref = function Ref(kind1, process1, outerPrec1, innerPrec1, rest1) { return new Ref.class(kind1, process1, outerPrec1, innerPrec1, rest1); };
        this.Ref.class = class Ref {
          constructor(kind, process, outerPrec, innerPrec, rest) {
            this.kind = kind;
            this.process = process;
            this.outerPrec = outerPrec;
            this.innerPrec = innerPrec;
            this.rest = rest;
          }
          toString() { return "Ref(" + globalThis.Predef.render(this.kind) + ", " + globalThis.Predef.render(this.process) + ", " + globalThis.Predef.render(this.outerPrec) + ", " + globalThis.Predef.render(this.innerPrec) + ", " + globalThis.Predef.render(this.rest) + ")"; }
        };
        this.End = function End(value1) { return new End.class(value1); };
        this.End.class = class End {
          constructor(value) {
            this.value = value;
          }
          toString() { return "End(" + globalThis.Predef.render(this.value) + ")"; }
        };
        this.Siding = function Siding(rule1, optional1, rest1) { return new Siding.class(rule1, optional1, rest1); };
        this.Siding.class = class Siding {
          constructor(rule, optional, rest) {
            this.rule = rule;
            this.optional = optional;
            this.rest = rest;
          }
          toString() { return "Siding(" + globalThis.Predef.render(this.rule) + ", " + globalThis.Predef.render(this.optional) + ", " + globalThis.Predef.render(this.rest) + ")"; }
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
      static rest(choice) {
        let param0, param1, param2, rest, param01, param11, param21, param3, param4, rest1, param02, param12, rest2, param03, param13, get, tmp;
        if (choice instanceof Choice.Lazy.class) {
          param03 = choice.get;
          param13 = choice.make;
          get = param03;
          tmp = runtime.safeCall(get());
          return Choice.rest(tmp)
        } else if (choice instanceof Choice.Keyword.class) {
          param02 = choice.keyword;
          param12 = choice.rest;
          rest2 = param12;
          return Option.Some(rest2)
        } else if (choice instanceof Choice.Ref.class) {
          param01 = choice.kind;
          param11 = choice.process;
          param21 = choice.outerPrec;
          param3 = choice.innerPrec;
          param4 = choice.rest;
          rest1 = param4;
          return Option.Some(rest1)
        } else if (choice instanceof Choice.Siding.class) {
          param0 = choice.rule;
          param1 = choice.optional;
          param2 = choice.rest;
          rest = param1;
          return Option.Some(rest)
        } else if (choice instanceof Choice.End.class) {
          return Option.None
        } else {
          throw new globalThis.Error("match error");
        }
      } 
      static forced(choice1) {
        let param0, param1, get;
        if (choice1 instanceof Choice.Lazy.class) {
          param0 = choice1.get;
          param1 = choice1.make;
          get = param0;
          return runtime.safeCall(get())
        } else {
          return choice1
        }
      } 
      static keyword(keyword, ...choices) {
        let tmp, tmp1, tmp2;
        tmp = "`" + keyword.name;
        tmp1 = tmp + "` keyword";
        tmp2 = ParseRule.rule(tmp1, ...choices);
        return Choice.Keyword(keyword, tmp2)
      } 
      static reference(kind, process, name, ...choices1) {
        let tmp;
        tmp = ParseRule.rule(name, ...choices1);
        return Choice.Ref(kind, process, Option.None, Option.None, tmp)
      } 
      static term(process1, name1, ...choices2) {
        let tmp;
        tmp = ParseRule.rule(name1, ...choices2);
        return Choice.Ref("term", process1, Option.None, Option.None, tmp)
      } 
      static termWithPrec(process2, name2, outerPrec, innerPrec, ...choices3) {
        let tmp;
        tmp = ParseRule.rule(name2, ...choices3);
        return Choice.Ref("term", process2, outerPrec, innerPrec, tmp)
      } 
      static typeExpr(process3, name3, ...choices4) {
        let tmp;
        tmp = ParseRule.rule(name3, ...choices4);
        return Choice.Ref("type", process3, Option.None, Option.None, tmp)
      } 
      static optional(rule, rest) {
        return Choice.Siding(rule, true, rest)
      } 
      static siding(rule1, rest1) {
        return Choice.Siding(rule1, false, rest1)
      } 
      static end(value) {
        return Choice.End(value)
      } 
      static lazy(makeChoice) {
        let getChoice, cache;
        getChoice = function getChoice() {
          let param0, choice2, tmp;
          if (cache instanceof Option.Some.class) {
            param0 = cache.value;
            choice2 = param0;
            return choice2
          } else {
            tmp = runtime.safeCall(makeChoice(getChoice));
            cache = tmp;
            return cache
          }
        };
        cache = Option.None;
        return Choice.Lazy(getChoice, makeChoice)
      } 
      static map(choice2, op) {
        let param0, value1, param01, param1, param2, rule2, optional, rest2, param02, param11, param21, param3, param4, kind1, process4, outerPrec1, innerPrec1, rest3, param03, param12, keyword1, rest4, tmp, tmp1, tmp2, tmp3;
        if (choice2 instanceof Choice.Keyword.class) {
          param03 = choice2.keyword;
          param12 = choice2.rest;
          keyword1 = param03;
          rest4 = param12;
          tmp = runtime.safeCall(rest4.map(op));
          return Choice.Keyword(keyword1, tmp)
        } else if (choice2 instanceof Choice.Ref.class) {
          param02 = choice2.kind;
          param11 = choice2.process;
          param21 = choice2.outerPrec;
          param3 = choice2.innerPrec;
          param4 = choice2.rest;
          kind1 = param02;
          process4 = param11;
          outerPrec1 = param21;
          innerPrec1 = param3;
          rest3 = param4;
          return Choice.Ref(kind1, (x, y) => {
            let tmp4;
            tmp4 = runtime.safeCall(process4(x, y));
            return runtime.safeCall(op(tmp4))
          }, outerPrec1, innerPrec1, rest3)
        } else if (choice2 instanceof Choice.Siding.class) {
          param01 = choice2.rule;
          param1 = choice2.optional;
          param2 = choice2.rest;
          rule2 = param01;
          optional = param1;
          rest2 = param2;
          tmp1 = runtime.safeCall(rule2.map(op));
          tmp2 = runtime.safeCall(rest2.map(op));
          return Choice.Siding(tmp1, optional, tmp2)
        } else if (choice2 instanceof Choice.End.class) {
          param0 = choice2.value;
          value1 = param0;
          tmp3 = runtime.safeCall(op(value1));
          return Choice.End(tmp3)
        } else {
          throw new globalThis.Error("match error");
        }
      }
      static toString() { return "Choice"; }
    };
  }
  static rule(name, ...choices) {
    let scrut, tmp, tmp1;
    scrut = choices.length == 0;
    if (scrut === true) {
      tmp = ParseRule.Choice.end(runtime.Unit);
      tmp1 = Stack.Cons(tmp, Stack.Nil);
    } else {
      tmp1 = Iter.toStack(choices);
    }
    return ParseRule.ParseRule(name, tmp1)
  }
  static toString() { return "ParseRule"; }
};
let ParseRule = ParseRule2; export default ParseRule;
