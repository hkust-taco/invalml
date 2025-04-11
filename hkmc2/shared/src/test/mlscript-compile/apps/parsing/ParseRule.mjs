import runtime from "./../../Runtime.mjs";
import BetterMap from "./../../BetterMap.mjs";
import Iter from "./../../Iter.mjs";
import Option from "./../../Option.mjs";
import Stack from "./../../Stack.mjs";
import Predef from "./../../Predef.mjs";
import Keyword1 from "./Keyword.mjs";
import Token from "./Token.mjs";
import Tree from "./Tree.mjs";
let ParseRule2;
ParseRule2 = class ParseRule {
  static {
    this.Lazy = function Lazy(init1) {
      return new Lazy.class(init1);
    };
    this.Lazy.class = class Lazy {
      constructor(init) {
        this.init = init;
        this.cached = Option.None;
      }
      reset() {
        this.cached = Option.None;
        return runtime.Unit
      } 
      get() {
        let scrut, v, param0, v1, tmp, tmp1;
        scrut = this.cached;
        if (scrut instanceof Option.Some.class) {
          param0 = scrut.value;
          v1 = param0;
          return v1
        } else {
          tmp = runtime.safeCall(this.init());
          v = tmp;
          tmp1 = Option.Some(v);
          this.cached = tmp1;
          return v
        }
      }
      toString() { return "Lazy(" + globalThis.Predef.render(this.init) + ")"; }
    };
    this.ParseRule = function ParseRule(name1, choices1) {
      return new ParseRule.class(name1, choices1);
    };
    this.ParseRule.class = class ParseRule1 {
      #_endChoice;
      #_keywordChoices;
      #_refChoice;
      constructor(name, choices) {
        let tmp, tmp1, tmp2, tmp3, lambda, lambda1, lambda2;
        this.name = name;
        this.choices = choices;
        const this$ParseRule = this;
        lambda = (undefined, function () {
          let tmp4, tmp5, lambda3;
          tmp4 = Iter.fromStack(this$ParseRule.choices);
          lambda3 = (undefined, function (caseScrut) {
            let param0, param1, param2, param3, init, optional, rest, process, scrut, param01, initRes, scrut1, param02, restRes, param03, value, tmp6, lambda4;
            if (caseScrut instanceof ParseRule.Choice.End.class) {
              param03 = caseScrut.value;
              value = param03;
              return Option.Some(value)
            } else if (caseScrut instanceof ParseRule.Choice.Siding.class) {
              param0 = caseScrut.init;
              param1 = caseScrut.optional;
              param2 = caseScrut.rest;
              param3 = caseScrut.process;
              init = param0;
              optional = param1;
              rest = param2;
              process = param3;
              if (optional === true) {
                lambda4 = (undefined, function (restRes1) {
                  return runtime.safeCall(process(Option.None, restRes1))
                });
                return rest.endChoice.map(runtime.Unit, lambda4)
              } else {
                scrut = init.endChoice;
                if (scrut instanceof Option.Some.class) {
                  param01 = scrut.value;
                  initRes = param01;
                  scrut1 = rest.endChoice;
                  if (scrut1 instanceof Option.Some.class) {
                    param02 = scrut1.value;
                    restRes = param02;
                    tmp6 = Option.Some(initRes);
                    return runtime.safeCall(process(tmp6, restRes))
                  } else {
                    return Option.None
                  }
                } else {
                  return Option.None
                }
              }
            } else {
              return Option.None
            }
          });
          tmp5 = lambda3;
          return Iter.firstDefined(tmp4, tmp5)
        });
        tmp = ParseRule.Lazy(lambda);
        this.#_endChoice = tmp;
        lambda1 = (undefined, function () {
          let tmp4, tmp5, tmp6, tmp7, tmp8, lambda3;
          tmp4 = Iter.fromStack(this$ParseRule.choices);
          lambda3 = (undefined, function (caseScrut) {
            let param0, param1, param2, param3, init, optional, rest, process, param01, param11, keyword, rest1, tmp9, tmp10, tmp11, tmp12, tmp13, lambda4, lambda5;
            if (caseScrut instanceof ParseRule.Choice.Keyword.class) {
              param01 = caseScrut.keyword;
              param11 = caseScrut.rest;
              keyword = param01;
              rest1 = param11;
              return [
                [
                  keyword.name,
                  rest1
                ]
              ]
            } else if (caseScrut instanceof ParseRule.Choice.Siding.class) {
              param0 = caseScrut.init;
              param1 = caseScrut.optional;
              param2 = caseScrut.rest;
              param3 = caseScrut.process;
              init = param0;
              optional = param1;
              rest = param2;
              process = param3;
              lambda4 = (undefined, function (caseScrut1) {
                let first1, first0, keyword1, rule, tmp14, tmp15;
                if (globalThis.Array.isArray(caseScrut1) && caseScrut1.length === 2) {
                  first0 = caseScrut1[0];
                  first1 = caseScrut1[1];
                  keyword1 = first0;
                  rule = first1;
                  tmp14 = runtime.safeCall(rule.map(Option.Some));
                  tmp15 = tmp14.andThen(rest, process);
                  return [
                    keyword1,
                    tmp15
                  ]
                } else {
                  throw new globalThis.Error("match error");
                }
              });
              tmp9 = lambda4;
              tmp10 = Iter.mapping(init.keywordChoices, tmp9);
              if (optional === true) {
                lambda5 = (undefined, function (caseScrut1) {
                  let first1, first0, keyword1, rule, tmp14, lambda6;
                  if (globalThis.Array.isArray(caseScrut1) && caseScrut1.length === 2) {
                    first0 = caseScrut1[0];
                    first1 = caseScrut1[1];
                    keyword1 = first0;
                    rule = first1;
                    lambda6 = (undefined, function (res) {
                      return runtime.safeCall(process(Option.None, res))
                    });
                    tmp14 = runtime.safeCall(rule.map(lambda6));
                    return [
                      keyword1,
                      tmp14
                    ]
                  } else {
                    throw new globalThis.Error("match error");
                  }
                });
                tmp11 = lambda5;
                tmp12 = Iter.mapping(rest.keywordChoices, tmp11);
              } else {
                tmp12 = [];
              }
              tmp13 = Iter.appended(tmp10, tmp12);
              return Iter.toArray(tmp13)
            } else {
              return []
            }
          });
          tmp5 = lambda3;
          tmp6 = Iter.mapping(tmp4, tmp5);
          tmp7 = Iter.flattening(tmp6);
          tmp8 = Iter.toArray(tmp7);
          return BetterMap.toMap(tmp8)
        });
        tmp1 = lambda1;
        tmp2 = ParseRule.Lazy(tmp1);
        this.#_keywordChoices = tmp2;
        lambda2 = (undefined, function () {
          let tmp4, tmp5, lambda3;
          tmp4 = Iter.fromStack(this$ParseRule.choices);
          lambda3 = (undefined, function (caseScrut) {
            let param0, param1, param2, param3, init, optional, rest, process, scrut, param01, param02, param11, param21, param31, param4, k, process$_, op, ip, rest$_, process$_$_, scrut1, param03, param04, param12, param22, param32, param41, k1, process$_1, op1, ip1, rest$_1, process$_$_1, rest$_$_, ref, tmp6, tmp7, tmp8, tmp9, tmp10, lambda4, process$_$_2, process$_$_3;
            if (caseScrut instanceof ParseRule.Choice.Ref.class) {
              ref = caseScrut;
              return Option.Some(ref)
            } else if (caseScrut instanceof ParseRule.Choice.Siding.class) {
              param0 = caseScrut.init;
              param1 = caseScrut.optional;
              param2 = caseScrut.rest;
              param3 = caseScrut.process;
              init = param0;
              optional = param1;
              rest = param2;
              process = param3;
              scrut1 = init.refChoice;
              if (scrut1 instanceof Option.Some.class) {
                param03 = scrut1.value;
                if (param03 instanceof ParseRule.Choice.Ref.class) {
                  param04 = param03.kind;
                  param12 = param03.process;
                  param22 = param03.outerPrec;
                  param32 = param03.innerPrec;
                  param41 = param03.rest;
                  k1 = param04;
                  process$_1 = param12;
                  op1 = param22;
                  ip1 = param32;
                  rest$_1 = param41;
                  lambda4 = (undefined, function (exprRes, pairRes) {
                    let first1, first0, restRes$_, restRes, tmp11;
                    if (globalThis.Array.isArray(pairRes) && pairRes.length === 2) {
                      first0 = pairRes[0];
                      first1 = pairRes[1];
                      restRes$_ = first0;
                      restRes = first1;
                      tmp11 = runtime.safeCall(process$_1(exprRes, restRes$_));
                      return runtime.safeCall(process(tmp11, restRes))
                    } else {
                      throw new globalThis.Error("match error");
                    }
                  });
                  tmp6 = lambda4;
                  process$_$_1 = tmp6;
                  tmp7 = rest$_1.andThen(rest, Predef.tuple);
                  rest$_$_ = tmp7;
                  tmp8 = ParseRule.Choice.Ref(k1, process$_$_1, op1, ip1, rest$_$_);
                  return Option.Some(tmp8)
                } else {
                  if (optional === true) {
                    scrut = rest.refChoice;
                    if (scrut instanceof Option.Some.class) {
                      param01 = scrut.value;
                      if (param01 instanceof ParseRule.Choice.Ref.class) {
                        param02 = param01.kind;
                        param11 = param01.process;
                        param21 = param01.outerPrec;
                        param31 = param01.innerPrec;
                        param4 = param01.rest;
                        k = param02;
                        process$_ = param11;
                        op = param21;
                        ip = param31;
                        rest$_ = param4;
                        process$_$_2 = function (exprRes, restRes) {
                          let tmp11;
                          tmp11 = runtime.safeCall(process$_(exprRes, restRes));
                          return runtime.safeCall(process(Option.None, tmp11))
                        };
                        process$_$_ = process$_$_2;
                        tmp9 = ParseRule.Choice.Ref(k, process$_$_, op, ip, rest$_);
                        return Option.Some(tmp9)
                      } else {
                        return Option.None
                      }
                    } else {
                      return Option.None
                    }
                  } else {
                    return Option.None
                  }
                }
              } else {
                if (optional === true) {
                  scrut = rest.refChoice;
                  if (scrut instanceof Option.Some.class) {
                    param01 = scrut.value;
                    if (param01 instanceof ParseRule.Choice.Ref.class) {
                      param02 = param01.kind;
                      param11 = param01.process;
                      param21 = param01.outerPrec;
                      param31 = param01.innerPrec;
                      param4 = param01.rest;
                      k = param02;
                      process$_ = param11;
                      op = param21;
                      ip = param31;
                      rest$_ = param4;
                      process$_$_3 = function (exprRes, restRes) {
                        let tmp11;
                        tmp11 = runtime.safeCall(process$_(exprRes, restRes));
                        return runtime.safeCall(process(Option.None, tmp11))
                      };
                      process$_$_ = process$_$_3;
                      tmp10 = ParseRule.Choice.Ref(k, process$_$_, op, ip, rest$_);
                      return Option.Some(tmp10)
                    } else {
                      return Option.None
                    }
                  } else {
                    return Option.None
                  }
                } else {
                  return Option.None
                }
              }
            } else {
              return Option.None
            }
          });
          tmp5 = lambda3;
          return Iter.firstDefined(tmp4, tmp5)
        });
        tmp3 = ParseRule.Lazy(lambda2);
        this.#_refChoice = tmp3;
      }
      map(op) {
        let tmp, tmp1, tmp2, lambda;
        tmp = Iter.fromStack(this.choices);
        const this$ParseRule = this;
        lambda = (undefined, function (choice) {
          return ParseRule.Choice.map(choice, op)
        });
        tmp1 = Iter.mapping(tmp, lambda);
        tmp2 = Iter.toStack(tmp1);
        return ParseRule.ParseRule(this.name, tmp2)
      } 
      andThen(rest, process) {
        let go, tmp, lambda;
        const this$ParseRule = this;
        go = function go(rule) {
          let tmp1, tmp2, tmp3, tmp4, tmp5, lambda1;
          tmp1 = Iter.fromStack(rule.choices);
          lambda1 = (undefined, function (caseScrut) {
            let param0, param1, param2, param3, rule1, optional, rest$_, process1, process$_, param01, value, param02, param11, param21, param31, param4, kind, process2, outerPrec, innerPrec, rest$_1, process$_1, param03, param12, keyword, rest$_2, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, lambda2, lambda3, lambda4;
            if (caseScrut instanceof ParseRule.Choice.Keyword.class) {
              param03 = caseScrut.keyword;
              param12 = caseScrut.rest;
              keyword = param03;
              rest$_2 = param12;
              tmp6 = go(rest$_2);
              tmp7 = ParseRule.Choice.Keyword(keyword, tmp6);
              return [
                tmp7
              ]
            } else if (caseScrut instanceof ParseRule.Choice.Ref.class) {
              param02 = caseScrut.kind;
              param11 = caseScrut.process;
              param21 = caseScrut.outerPrec;
              param31 = caseScrut.innerPrec;
              param4 = caseScrut.rest;
              kind = param02;
              process2 = param11;
              outerPrec = param21;
              innerPrec = param31;
              rest$_1 = param4;
              lambda2 = (undefined, function (lhs, rhsInnerResult) {
                let doTemp, first1, first0, rhs, innerResult, tmp15;
                if (globalThis.Array.isArray(rhsInnerResult) && rhsInnerResult.length === 2) {
                  first0 = rhsInnerResult[0];
                  first1 = rhsInnerResult[1];
                  rhs = first0;
                  innerResult = first1;
                  tmp15 = runtime.safeCall(process2(lhs, rhs));
                  return [
                    tmp15,
                    innerResult
                  ]
                } else {
                  doTemp = Predef.assert(false, "illgeal result from inner");
                  throw new globalThis.Error("match error");
                }
              });
              tmp8 = lambda2;
              process$_1 = tmp8;
              tmp9 = go(rest$_1);
              tmp10 = ParseRule.Choice.Ref(kind, process$_1, outerPrec, innerPrec, tmp9);
              return [
                tmp10
              ]
            } else if (caseScrut instanceof ParseRule.Choice.End.class) {
              param01 = caseScrut.value;
              value = param01;
              tmp11 = Iter.fromStack(rest.choices);
              lambda3 = (undefined, function (choice) {
                let lambda5;
                lambda5 = (undefined, function (result) {
                  return [
                    value,
                    result
                  ]
                });
                return ParseRule.Choice.map(choice, lambda5)
              });
              return Iter.mapping(tmp11, lambda3)
            } else if (caseScrut instanceof ParseRule.Choice.Siding.class) {
              param0 = caseScrut.init;
              param1 = caseScrut.optional;
              param2 = caseScrut.rest;
              param3 = caseScrut.process;
              rule1 = param0;
              optional = param1;
              rest$_ = param2;
              process1 = param3;
              lambda4 = (undefined, function (initRes, restRes) {
                let doTemp, first1, first0, restRes$_, innerRes, tmp15;
                if (globalThis.Array.isArray(restRes) && restRes.length === 2) {
                  first0 = restRes[0];
                  first1 = restRes[1];
                  restRes$_ = first0;
                  innerRes = first1;
                  tmp15 = runtime.safeCall(process1(initRes, restRes$_));
                  return [
                    tmp15,
                    innerRes
                  ]
                } else {
                  doTemp = Predef.assert(false, "illegal result from inner");
                  throw new globalThis.Error("match error");
                }
              });
              tmp12 = lambda4;
              process$_ = tmp12;
              tmp13 = go(rest$_);
              tmp14 = ParseRule.Choice.Siding(rule1, optional, tmp13, process$_);
              return [
                tmp14
              ]
            } else {
              throw new globalThis.Error("match error");
            }
          });
          tmp2 = lambda1;
          tmp3 = Iter.mapping(tmp1, tmp2);
          tmp4 = Iter.flattening(tmp3);
          tmp5 = Iter.toStack(tmp4);
          return ParseRule.ParseRule(rule.name, tmp5)
        };
        tmp = go(this);
        lambda = (undefined, function (res) {
          return runtime.safeCall(process(res[0], res[1]))
        });
        return runtime.safeCall(tmp.map(lambda))
      } 
      get endChoice() {
        return runtime.safeCall(this.#_endChoice.get());
      } 
      get keywordChoices() {
        return runtime.safeCall(this.#_keywordChoices.get());
      } 
      get refChoice() {
        return runtime.safeCall(this.#_refChoice.get());
      } 
      extendChoices(newChoices) {
        let tmp, tmp1, tmp2, tmp3;
        tmp = Stack.concat(this.choices, newChoices);
        this.choices = tmp;
        tmp1 = runtime.safeCall(this.#_endChoice.reset());
        tmp2 = runtime.safeCall(this.#_keywordChoices.reset());
        tmp3 = runtime.safeCall(this.#_refChoice.reset());
        return this
      } 
      get display() {
        let tail, go, displayChoice, scrut, first1, first0, name1, line, tmp, tmp1;
        const this$ParseRule = this;
        displayChoice = function displayChoice(choice) {
          let other, param0, param1, param2, param3, init, opt, rest1, init$_, param01, param11, param21, param31, param4, kind, rest2, param02, param12, keyword, rest3, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13;
          if (choice instanceof ParseRule.Choice.Keyword.class) {
            param02 = choice.keyword;
            param12 = choice.rest;
            keyword = param02;
            rest3 = param12;
            tmp2 = "\"" + keyword.name;
            tmp3 = tmp2 + "\"";
            tmp4 = tail(rest3);
            return tmp3 + tmp4[1]
          } else if (choice instanceof ParseRule.Choice.Ref.class) {
            param01 = choice.kind;
            param11 = choice.process;
            param21 = choice.outerPrec;
            param31 = choice.innerPrec;
            param4 = choice.rest;
            kind = param01;
            rest2 = param4;
            tmp5 = "<" + kind;
            tmp6 = tmp5 + ">";
            tmp7 = tail(rest2);
            return tmp6 + tmp7[1]
          } else if (choice instanceof ParseRule.Choice.Siding.class) {
            param0 = choice.init;
            param1 = choice.optional;
            param2 = choice.rest;
            param3 = choice.process;
            init = param0;
            opt = param1;
            rest1 = param2;
            tmp8 = go(init, false);
            init$_ = tmp8[1];
            if (opt === true) {
              tmp9 = "[" + init$_;
              tmp10 = tmp9 + "]";
            } else {
              tmp11 = "(" + init$_;
              tmp10 = tmp11 + ")";
            }
            tmp12 = tail(rest1);
            return tmp10 + tmp12[1]
          } else if (choice instanceof ParseRule.Choice.End.class) {
            return ""
          } else {
            other = choice;
            tmp13 = "<unknown:" + other;
            return tmp13 + ">"
          }
        };
        tail = function tail(rest1) {
          let param0, param1, choices1, scrut1, first11, first01, name2, line1, param01, param11, param02, param12, scrut2, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, lambda, lambda1;
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
                      lambda = (undefined, function (c) {
                        if (c instanceof ParseRule.Choice.End.class) {
                          return true
                        } else {
                          return false
                        }
                      });
                      scrut2 = Iter.some(tmp2, lambda);
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
                    lambda1 = (undefined, function (c) {
                      if (c instanceof ParseRule.Choice.End.class) {
                        return true
                      } else {
                        return false
                      }
                    });
                    scrut2 = Iter.some(tmp8, lambda1);
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
          let lines, first01, line1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, lambda;
          tmp2 = Iter.fromStack(rule.choices);
          lambda = (undefined, function (caseScrut) {
            if (caseScrut instanceof ParseRule.Choice.End.class) {
              return false
            } else {
              return true
            }
          });
          tmp3 = Iter.filtering(tmp2, lambda);
          tmp4 = Iter.mapping(tmp3, displayChoice);
          tmp5 = Iter.toArray(tmp4);
          lines = tmp5;
          if (globalThis.Array.isArray(lines) && lines.length === 0) {
            tmp6 = "\u03B5";
          } else if (globalThis.Array.isArray(lines) && lines.length === 1) {
            first01 = lines[0];
            line1 = first01;
            tmp6 = line1;
          } else {
            if (top === true) {
              tmp7 = runtime.safeCall(lines.join("\n  | "));
              tmp6 = "\n  | " + tmp7;
            } else {
              tmp6 = runtime.safeCall(lines.join(" | "));
            }
          }
          return Predef.tuple(rule.name, tmp6)
        };
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
      static #ensureChoices;
      static #shouldHaveFunction;
      static #shouldHaveStr;
      static #shouldHaveInt;
      static #shouldHaveBool;
      static #shouldHaveRuleLike;
      static {
        let tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, ensureChoices, lambda, lambda1, lambda2, lambda3, lambda4;
        this.Choice = class Choice1 {
          constructor() {}
          toString() { return "Choice"; }
        };
        this.Keyword = function Keyword(keyword1, rest1) {
          return new Keyword.class(keyword1, rest1);
        };
        this.Keyword.class = class Keyword extends Choice.Choice {
          constructor(keyword, rest) {
            super();
            this.keyword = keyword;
            this.rest = rest;
          }
          toString() { return "Keyword(" + globalThis.Predef.render(this.keyword) + ", " + globalThis.Predef.render(this.rest) + ")"; }
        };
        this.Ref = function Ref(kind1, process1, outerPrec1, innerPrec1, rest1) {
          return new Ref.class(kind1, process1, outerPrec1, innerPrec1, rest1);
        };
        this.Ref.class = class Ref extends Choice.Choice {
          constructor(kind, process, outerPrec, innerPrec, rest) {
            super();
            this.kind = kind;
            this.process = process;
            this.outerPrec = outerPrec;
            this.innerPrec = innerPrec;
            this.rest = rest;
          }
          toString() { return "Ref(" + globalThis.Predef.render(this.kind) + ", " + globalThis.Predef.render(this.process) + ", " + globalThis.Predef.render(this.outerPrec) + ", " + globalThis.Predef.render(this.innerPrec) + ", " + globalThis.Predef.render(this.rest) + ")"; }
        };
        this.End = function End(value1) {
          return new End.class(value1);
        };
        this.End.class = class End extends Choice.Choice {
          constructor(value) {
            super();
            this.value = value;
          }
          toString() { return "End(" + globalThis.Predef.render(this.value) + ")"; }
        };
        this.Siding = function Siding(init1, optional1, rest1, process1) {
          return new Siding.class(init1, optional1, rest1, process1);
        };
        this.Siding.class = class Siding extends Choice.Choice {
          constructor(init, optional, rest, process) {
            super();
            this.init = init;
            this.optional = optional;
            this.rest = rest;
            this.process = process;
          }
          toString() { return "Siding(" + globalThis.Predef.render(this.init) + ", " + globalThis.Predef.render(this.optional) + ", " + globalThis.Predef.render(this.rest) + ", " + globalThis.Predef.render(this.process) + ")"; }
        };
        ensureChoices = function ensureChoices(xs, name) {
          let tmp9, tmp10, lambda5;
          tmp9 = Iter.zippingWithIndex(xs);
          lambda5 = (undefined, function (caseScrut) {
            let first1, first0, item, index, tmp11, tmp12, tmp13, tmp14;
            if (globalThis.Array.isArray(caseScrut) && caseScrut.length === 2) {
              first0 = caseScrut[0];
              first1 = caseScrut[1];
              item = first0;
              index = first1;
              if (item instanceof Choice.Choice) {
                tmp11 = true;
              } else {
                tmp11 = false;
              }
              tmp12 = name + ": element [";
              tmp13 = tmp12 + index;
              tmp14 = tmp13 + "] is not Choice";
              return Predef.assert(tmp11, tmp14)
            } else {
              throw new globalThis.Error("match error");
            }
          });
          tmp10 = lambda5;
          return Iter.each(tmp9, tmp10)
        };
        Choice.#ensureChoices = ensureChoices;
        lambda = (undefined, function (options, key, defaultValue, callerName) {
          let func, scrut, tmp9, tmp10, tmp11, tmp12;
          func = options[key];
          tmp9 = typeof func;
          scrut = tmp9 === "function";
          if (scrut === true) {
            return func
          } else {
            if (func === undefined) {
              return defaultValue
            } else {
              tmp10 = callerName + ": `";
              tmp11 = tmp10 + key;
              tmp12 = tmp11 + "` is not a string";
              throw globalThis.TypeError(tmp12);
            }
          }
        });
        tmp = lambda;
        Choice.#shouldHaveFunction = tmp;
        lambda1 = (undefined, function (options, key, defaultValue, callerName) {
          let value, tmp9, tmp10, tmp11;
          value = options[key];
          if (typeof value === 'string') {
            return Option.Some(value)
          } else if (value === undefined) {
            return defaultValue
          } else {
            tmp9 = callerName + ": `";
            tmp10 = tmp9 + key;
            tmp11 = tmp10 + "` is not a string";
            throw globalThis.TypeError(tmp11);
          }
        });
        tmp1 = lambda1;
        Choice.#shouldHaveStr = tmp1;
        lambda2 = (undefined, function (options, key, callerName) {
          let value, tmp9, tmp10, tmp11;
          value = options[key];
          if (globalThis.Number.isInteger(value)) {
            return Option.Some(value)
          } else if (value === undefined) {
            return Option.None
          } else {
            tmp9 = callerName + ": `";
            tmp10 = tmp9 + key;
            tmp11 = tmp10 + "` is not an Int";
            throw globalThis.TypeError(tmp11);
          }
        });
        tmp2 = lambda2;
        Choice.#shouldHaveInt = tmp2;
        lambda3 = (undefined, function (options, key, defaultValue, callerName) {
          let value, tmp9, tmp10, tmp11;
          value = options[key];
          if (typeof value === 'boolean') {
            return value
          } else if (value === undefined) {
            return defaultValue
          } else {
            tmp9 = callerName + ": `";
            tmp10 = tmp9 + key;
            tmp11 = tmp10 + "` is not a Boolean";
            throw globalThis.TypeError(tmp11);
          }
        });
        tmp3 = lambda3;
        Choice.#shouldHaveBool = tmp3;
        lambda4 = (undefined, function (options, key, ruleName, callerName) {
          let choices, rest, tmp9, tmp10, tmp11, tmp12;
          choices = options[key];
          if (choices instanceof ParseRule.ParseRule.class) {
            return choices
          } else if (choices instanceof Choice.Choice) {
            return ParseRule.rule(ruleName, choices)
          } else if (globalThis.Array.isArray(choices) && choices.length >= 0) {
            rest = runtime.safeCall(globalThis.Predef.tupleSlice(choices, 0, 0));
            tmp9 = runtime.safeCall(Choice.#ensureChoices(choices, "Choice.reference"));
            return ParseRule.rule(ruleName, ...choices)
          } else if (choices === undefined) {
            return ParseRule.rule(ruleName)
          } else {
            tmp10 = callerName + ": `";
            tmp11 = tmp10 + key;
            tmp12 = tmp11 + "` is neither a rule nor a choice";
            throw globalThis.TypeError(tmp12);
          }
        });
        tmp4 = lambda4;
        Choice.#shouldHaveRuleLike = tmp4;
        tmp5 = Choice.reference("term");
        this.term = tmp5;
        tmp6 = Choice.reference("type");
        this.typeExpr = tmp6;
        tmp7 = Choice.reference("ident");
        this.ident = tmp7;
        tmp8 = Choice.reference("typevar");
        this.typeVar = tmp8;
      }
      static keyword(keyword) {
        return (...choices) => {
          let tmp, tmp1, tmp2, tmp3;
          tmp = runtime.safeCall(Choice.#ensureChoices(choices, "Choice.keyword"));
          tmp1 = "`" + keyword.name;
          tmp2 = tmp1 + "` keyword";
          tmp3 = ParseRule.rule(tmp2, ...choices);
          return Choice.Keyword(keyword, tmp3)
        }
      } 
      static reference(kind) {
        return (fields) => {
          let ruleName, tmp, tmp1, tmp2, tmp3, tmp4;
          tmp = runtime.safeCall(Choice.#shouldHaveStr(fields, "name", "unnamed", "Choice.reference"));
          ruleName = tmp;
          tmp1 = runtime.safeCall(Choice.#shouldHaveFunction(fields, "process", Predef.tuple, "Choice.reference"));
          tmp2 = runtime.safeCall(Choice.#shouldHaveInt(fields, "outerPrec", "Choice.reference"));
          tmp3 = runtime.safeCall(Choice.#shouldHaveInt(fields, "innerPrec", "Choice.reference"));
          tmp4 = runtime.safeCall(Choice.#shouldHaveRuleLike(fields, "choices", ruleName, "Choice.reference"));
          return Choice.Ref(kind, tmp1, tmp2, tmp3, tmp4)
        }
      } 
      static optional(init, rest) {
        let tmp, tmp1, tmp2, tmp3;
        if (init instanceof ParseRule.ParseRule.class) {
          tmp = true;
        } else {
          tmp = false;
        }
        tmp1 = Predef.assert(tmp, "Choice.optional: init is not ParseRule");
        if (rest instanceof ParseRule.ParseRule.class) {
          tmp2 = true;
        } else {
          tmp2 = false;
        }
        tmp3 = Predef.assert(tmp2, "Choice.optional: rest is not ParseRule");
        return Choice.Siding(init, true, rest, Predef.tuple)
      } 
      static siding(fields) {
        let optional, initName, restName, init1, rest1, defaultProcess, process, tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, lambda;
        tmp = runtime.safeCall(Choice.#shouldHaveBool(fields, "optional", false, "Choice.siding"));
        optional = tmp;
        tmp1 = runtime.safeCall(Choice.#shouldHaveStr(fields, "initName", "unnamed", "Choice.siding"));
        initName = tmp1;
        tmp2 = runtime.safeCall(Choice.#shouldHaveStr(fields, "restName", "unnamed", "Choice.siding"));
        restName = tmp2;
        tmp3 = runtime.safeCall(Choice.#shouldHaveRuleLike(fields, "init", initName, "Choice.siding"));
        init1 = tmp3;
        tmp4 = runtime.safeCall(Choice.#shouldHaveRuleLike(fields, "rest", restName, "Choice.siding"));
        rest1 = tmp4;
        if (optional === true) {
          tmp5 = Predef.tuple;
        } else {
          lambda = (undefined, function (initRes, restRes) {
            let param0, initRes1;
            if (initRes instanceof Option.Some.class) {
              param0 = initRes.value;
              initRes1 = param0;
              return [
                initRes1,
                restRes
              ]
            } else {
              throw new globalThis.Error("match error");
            }
          });
          tmp6 = lambda;
          tmp5 = tmp6;
        }
        defaultProcess = tmp5;
        tmp7 = runtime.safeCall(Choice.#shouldHaveFunction(fields, "process", defaultProcess, "Choice.siding"));
        process = tmp7;
        return Choice.Siding(init1, optional, rest1, process)
      } 
      static end(value) {
        return Choice.End(value)
      } 
      static map(choice, op) {
        let param0, value1, param01, param1, param2, param3, init1, optional, rest1, process, param02, param11, param21, param31, param4, kind1, process1, outerPrec, innerPrec, rest2, param03, param12, keyword1, rest3, tmp, tmp1, lambda, lambda1;
        if (choice instanceof Choice.Keyword.class) {
          param03 = choice.keyword;
          param12 = choice.rest;
          keyword1 = param03;
          rest3 = param12;
          tmp = runtime.safeCall(rest3.map(op));
          return Choice.Keyword(keyword1, tmp)
        } else if (choice instanceof Choice.Ref.class) {
          param02 = choice.kind;
          param11 = choice.process;
          param21 = choice.outerPrec;
          param31 = choice.innerPrec;
          param4 = choice.rest;
          kind1 = param02;
          process1 = param11;
          outerPrec = param21;
          innerPrec = param31;
          rest2 = param4;
          lambda = (undefined, function (x, y) {
            let tmp2;
            tmp2 = runtime.safeCall(process1(x, y));
            return runtime.safeCall(op(tmp2))
          });
          return Choice.Ref(kind1, lambda, outerPrec, innerPrec, rest2)
        } else if (choice instanceof Choice.Siding.class) {
          param01 = choice.init;
          param1 = choice.optional;
          param2 = choice.rest;
          param3 = choice.process;
          init1 = param01;
          optional = param1;
          rest1 = param2;
          process = param3;
          lambda1 = (undefined, function (x, y) {
            let tmp2;
            tmp2 = runtime.safeCall(process(x, y));
            return runtime.safeCall(op(tmp2))
          });
          return Choice.Siding(init1, optional, rest1, lambda1)
        } else if (choice instanceof Choice.End.class) {
          param0 = choice.value;
          value1 = param0;
          tmp1 = runtime.safeCall(op(value1));
          return Choice.End(tmp1)
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
