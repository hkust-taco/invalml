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
            let scrut, param0, param1, rest, param01, value;
            scrut = ParseRule.Choice.forced(choice);
            if (scrut instanceof ParseRule.Choice.End.class) {
              param01 = scrut.value;
              value = param01;
              return Option.Some(value)
            } else if (scrut instanceof ParseRule.Choice.Optional.class) {
              param0 = scrut.rule;
              param1 = scrut.rest;
              rest = param1;
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
            let scrut, param0, param1, rule, rest, param01, param11, keyword, rest1, tmp6, tmp7, tmp8;
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
            } else if (scrut instanceof ParseRule.Choice.Optional.class) {
              param0 = scrut.rule;
              param1 = scrut.rest;
              rule = param0;
              rest = param1;
              tmp6 = (caseScrut) => {
                let first1, first0, keyword1, rule1, tmp9;
                if (globalThis.Array.isArray(caseScrut) && caseScrut.length === 2) {
                  first0 = caseScrut[0];
                  first1 = caseScrut[1];
                  keyword1 = first0;
                  rule1 = first1;
                  tmp9 = runtime.safeCall(rule1.andThen(rest));
                  return [
                    keyword1,
                    tmp9
                  ]
                } else {
                  throw new globalThis.Error("match error");
                }
              };
              tmp7 = Iter.mapping(rule.keywordChoices, tmp6);
              tmp8 = Iter.appended(tmp7, rest.keywordChoices);
              return Iter.toArray(tmp8)
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
            let scrut, param0, param1, rule, rest, scrut1, param01, first4, first3, first2, first1, first0, kind, process, outerPrec, innerPrec, rest$_, param02, param11, param2, param3, param4, isType, process1, outerPrec1, innerPrec1, rest1, tmp3;
            scrut = ParseRule.Choice.forced(choice);
            if (scrut instanceof ParseRule.Choice.Ref.class) {
              param02 = scrut.kind;
              param11 = scrut.process;
              param2 = scrut.outerPrec;
              param3 = scrut.innerPrec;
              param4 = scrut.rest;
              isType = param02;
              process1 = param11;
              outerPrec1 = param2;
              innerPrec1 = param3;
              rest1 = param4;
              return Option.Some([
                isType,
                process1,
                outerPrec1,
                innerPrec1,
                rest1
              ])
            } else if (scrut instanceof ParseRule.Choice.Optional.class) {
              param0 = scrut.rule;
              param1 = scrut.rest;
              rule = param0;
              rest = param1;
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
                  return rest.exprChoice
                }
              } else {
                return rest.exprChoice
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
          let param0, param1, get, make, get$_, make$_, param01, param11, rule, rest$_, param02, param12, param2, param3, param4, isType, process, outerPrec, innerPrec, rest$_1, param03, param13, keyword, rest$_2, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11;
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
            param2 = caseScrut.outerPrec;
            param3 = caseScrut.innerPrec;
            param4 = caseScrut.rest;
            isType = param02;
            process = param12;
            outerPrec = param2;
            innerPrec = param3;
            rest$_1 = param4;
            tmp7 = runtime.safeCall(rest$_1.andThen(rest));
            tmp8 = ParseRule.Choice.Ref(isType, process, outerPrec, innerPrec, tmp7);
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
        let go, Knot1, displayChoice, scrut, first1, first0, name1, lines, rest1, first01, head, tail, line, tmp, tmp1, tmp2, tmp3, tmp4;
        displayChoice = function displayChoice(choice) {
          let other, param0, param1, get, make, scrut1, param01, param11, rule, rest2, prefix, scrut2, first11, first02, name2, lines1, name3, first03, line1, scrut3, first12, first04, name4, lines2, name5, first05, line2, param02, param12, param2, param3, param4, kind, rest3, prefix1, scrut4, first13, first06, name6, lines3, name7, first07, line3, param03, param13, rest4, prefix2, scrut5, first14, first08, name8, rest5, first09, head1, tail$_, name9, line4, param04, param14, keyword, rest6, prefix3, scrut6, first15, first010, name10, rest7, first011, head2, tail$_1, name11, line5, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20, tmp21, tmp22, tmp23, tmp24, tmp25, tmp26, tmp27, tmp28, tmp29, tmp30;
          if (choice instanceof ParseRule.Choice.Keyword.class) {
            param04 = choice.keyword;
            param14 = choice.rest;
            keyword = param04;
            rest6 = param14;
            tmp5 = "`" + keyword.name;
            prefix3 = tmp5 + "` ";
            scrut6 = go(rest6);
            if (globalThis.Array.isArray(scrut6) && scrut6.length === 2) {
              first010 = scrut6[0];
              first15 = scrut6[1];
              name11 = first010;
              name10 = first010;
              if (globalThis.Array.isArray(first15) && first15.length === 1) {
                first011 = first15[0];
                line5 = first011;
                tmp6 = prefix3 + line5;
                return [
                  tmp6
                ]
              } else if (globalThis.Array.isArray(first15) && first15.length >= 1) {
                first011 = first15[0];
                rest7 = runtime.safeCall(globalThis.Predef.tupleSlice(first15, 1, 0));
                head2 = first011;
                tail$_1 = rest7;
                tmp7 = prefix3 + head2;
                return [
                  tmp7,
                  ...tail$_1
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
          } else if (choice instanceof ParseRule.Choice.Ident.class) {
            param03 = choice.process;
            param13 = choice.rest;
            rest4 = param13;
            prefix2 = "<ident> ";
            scrut5 = go(rest4);
            if (globalThis.Array.isArray(scrut5) && scrut5.length === 2) {
              first08 = scrut5[0];
              first14 = scrut5[1];
              name9 = first08;
              name8 = first08;
              if (globalThis.Array.isArray(first14) && first14.length === 1) {
                first09 = first14[0];
                line4 = first09;
                tmp12 = prefix2 + line4;
                return [
                  tmp12
                ]
              } else if (globalThis.Array.isArray(first14) && first14.length >= 1) {
                first09 = first14[0];
                rest5 = runtime.safeCall(globalThis.Predef.tupleSlice(first14, 1, 0));
                head1 = first09;
                tail$_ = rest5;
                tmp13 = prefix2 + head1;
                return [
                  tmp13,
                  ...tail$_
                ]
              } else {
                other = choice;
                tmp14 = runtime.safeCall(globalThis.JSON.stringify(other));
                tmp15 = "<unknown>" + tmp14;
                return [
                  tmp15
                ]
              }
            } else {
              other = choice;
              tmp16 = runtime.safeCall(globalThis.JSON.stringify(other));
              tmp17 = "<unknown>" + tmp16;
              return [
                tmp17
              ]
            }
          } else if (choice instanceof ParseRule.Choice.Ref.class) {
            param02 = choice.kind;
            param12 = choice.process;
            param2 = choice.outerPrec;
            param3 = choice.innerPrec;
            param4 = choice.rest;
            kind = param02;
            rest3 = param4;
            tmp18 = "<" + kind;
            prefix1 = tmp18 + ">";
            scrut4 = go(rest3);
            if (globalThis.Array.isArray(scrut4) && scrut4.length === 2) {
              first06 = scrut4[0];
              first13 = scrut4[1];
              name7 = first06;
              if (globalThis.Array.isArray(first13) && first13.length === 1) {
                first07 = first13[0];
                line3 = first07;
                tmp19 = prefix1 + line3;
                return [
                  tmp19
                ]
              } else {
                name6 = first06;
                lines3 = first13;
                tmp20 = runtime.safeCall(lines3.map((line6, _, _1) => {
                  return "  " + line6
                }));
                return [
                  prefix1,
                  ...tmp20
                ]
              }
            } else {
              other = choice;
              tmp21 = runtime.safeCall(globalThis.JSON.stringify(other));
              tmp22 = "<unknown>" + tmp21;
              return [
                tmp22
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
                tmp23 = line1;
              } else {
                name2 = first02;
                lines1 = first11;
                tmp23 = runtime.safeCall(lines1.map((line6, _, _1) => {
                  return "  " + line6
                }));
              }
            } else {
              throw new globalThis.Error("match error");
            }
            tmp24 = "[" + tmp23;
            tmp25 = tmp24 + "] ";
            prefix = tmp25;
            scrut3 = go(rest2);
            if (globalThis.Array.isArray(scrut3) && scrut3.length === 2) {
              first04 = scrut3[0];
              first12 = scrut3[1];
              name5 = first04;
              if (globalThis.Array.isArray(first12) && first12.length === 1) {
                first05 = first12[0];
                line2 = first05;
                tmp26 = prefix + line2;
                return [
                  tmp26
                ]
              } else {
                name4 = first04;
                lines2 = first12;
                tmp27 = runtime.safeCall(lines2.map((line6, _, _1) => {
                  return "  " + line6
                }));
                return [
                  prefix,
                  ...tmp27
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
              tmp28 = runtime.safeCall(make(() => {
                return Knot1
              }));
              return displayChoice(tmp28)
            }
          } else {
            other = choice;
            tmp29 = runtime.safeCall(globalThis.JSON.stringify(other));
            tmp30 = "<unknown>" + tmp29;
            return [
              tmp30
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
        this.Ident = function Ident(process1, rest1) { return new Ident.class(process1, rest1); };
        this.Ident.class = class Ident {
          constructor(process, rest) {
            this.process = process;
            this.rest = rest;
          }
          toString() { return "Ident(" + globalThis.Predef.render(this.process) + ", " + globalThis.Predef.render(this.rest) + ")"; }
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
      static rest(choice) {
        let param0, param1, rest, param01, param11, param2, param3, param4, rest1, param02, param12, rest2, param03, param13, rest3, param04, param14, get, tmp;
        if (choice instanceof Choice.Lazy.class) {
          param04 = choice.get;
          param14 = choice.make;
          get = param04;
          tmp = runtime.safeCall(get());
          return Choice.rest(tmp)
        } else if (choice instanceof Choice.Keyword.class) {
          param03 = choice.keyword;
          param13 = choice.rest;
          rest3 = param13;
          return Option.Some(rest3)
        } else if (choice instanceof Choice.Ident.class) {
          param02 = choice.process;
          param12 = choice.rest;
          rest2 = param12;
          return Option.Some(rest2)
        } else if (choice instanceof Choice.Ref.class) {
          param01 = choice.kind;
          param11 = choice.process;
          param2 = choice.outerPrec;
          param3 = choice.innerPrec;
          param4 = choice.rest;
          rest1 = param4;
          return Option.Some(rest1)
        } else if (choice instanceof Choice.Optional.class) {
          param0 = choice.rule;
          param1 = choice.rest;
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
      static keyword(keyword, name, ...choices) {
        let tmp;
        tmp = ParseRule.rule(name, ...choices);
        return Choice.Keyword(keyword, tmp)
      } 
      static reference(kind, process, name1, ...choices1) {
        let tmp;
        tmp = ParseRule.rule(name1, ...choices1);
        return Choice.Ref(kind, process, Option.None, Option.None, tmp)
      } 
      static term(process1, name2, ...choices2) {
        let tmp;
        tmp = ParseRule.rule(name2, ...choices2);
        return Choice.Ref("term", process1, Option.None, Option.None, tmp)
      } 
      static termWithPrec(process2, name3, outerPrec, innerPrec, ...choices3) {
        let tmp;
        tmp = ParseRule.rule(name3, ...choices3);
        return Choice.Ref("term", process2, outerPrec, innerPrec, tmp)
      } 
      static typeExpr(process3, name4, ...choices4) {
        let tmp;
        tmp = ParseRule.rule(name4, ...choices4);
        return Choice.Ref("type", process3, Option.None, Option.None, tmp)
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
        let param0, value1, param01, param1, rule, rest, param02, param11, param2, param3, param4, kind1, process4, outerPrec1, innerPrec1, rest1, param03, param12, process5, rest2, param04, param13, keyword1, rest3, tmp, tmp1, tmp2, tmp3, tmp4;
        if (choice2 instanceof Choice.Keyword.class) {
          param04 = choice2.keyword;
          param13 = choice2.rest;
          keyword1 = param04;
          rest3 = param13;
          tmp = runtime.safeCall(rest3.map(op));
          return Choice.Keyword(keyword1, tmp)
        } else if (choice2 instanceof Choice.Ident.class) {
          param03 = choice2.process;
          param12 = choice2.rest;
          process5 = param03;
          rest2 = param12;
          tmp1 = runtime.safeCall(rest2.map(op));
          return Choice.Ident((tok, tree) => {
            let tmp5;
            tmp5 = runtime.safeCall(process5(tok, tree));
            return runtime.safeCall(op(tmp5))
          }, tmp1)
        } else if (choice2 instanceof Choice.Ref.class) {
          param02 = choice2.kind;
          param11 = choice2.process;
          param2 = choice2.outerPrec;
          param3 = choice2.innerPrec;
          param4 = choice2.rest;
          kind1 = param02;
          process4 = param11;
          outerPrec1 = param2;
          innerPrec1 = param3;
          rest1 = param4;
          return Choice.Ref(kind1, (x, y) => {
            let tmp5;
            tmp5 = runtime.safeCall(process4(x, y));
            return runtime.safeCall(op(tmp5))
          }, outerPrec1, innerPrec1, rest1)
        } else if (choice2 instanceof Choice.Optional.class) {
          param01 = choice2.rule;
          param1 = choice2.rest;
          rule = param01;
          rest = param1;
          tmp2 = runtime.safeCall(rule.map(op));
          tmp3 = runtime.safeCall(rest.map(op));
          return Choice.Optional(tmp2, tmp3)
        } else if (choice2 instanceof Choice.End.class) {
          param0 = choice2.value;
          value1 = param0;
          tmp4 = runtime.safeCall(op(value1));
          return Choice.End(tmp4)
        } else {
          throw new globalThis.Error("match error");
        }
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
