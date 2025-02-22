import runtime from "./../../Runtime.mjs";
import Option from "./../../Option.mjs";
import BetterMap from "./../../BetterMap.mjs";
import Keyword from "./Keyword.mjs";
let Precedence1;
Precedence1 = class Precedence {
  static #precMap;
  static {
    let scrut, param0, prec, tmp, tmp1, tmp2;
    this.Keywords = class Keywords {
      static #prec;
      static #basePrec;
      static #semiPrec;
      static #commaPrec;
      static #eqPrec;
      static #ascPrec;
      static #thenPrec;
      static {
        let tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20, tmp21, tmp22, tmp23, tmp24, tmp25, tmp26, tmp27, tmp28, tmp29;
        Keywords.#prec = 0;
        Keywords.#basePrec = Keywords.currPrec;
        tmp3 = Keyword.Keyword("class", Option.None, Keywords.#basePrec);
        this._class = tmp3;
        tmp4 = Keyword.Keyword("begin", Option.None, Keywords.#basePrec);
        this._begin = tmp4;
        tmp5 = Keyword.Keyword("end", Keywords.#basePrec, Option.None);
        this._end = tmp5;
        Keywords.#semiPrec = Keywords.nextPrec;
        Keywords.#commaPrec = Keywords.nextPrec;
        tmp6 = Keyword.Keyword(";", Keywords.#semiPrec, Keywords.#basePrec);
        this._semicolon = tmp6;
        tmp7 = Keyword.Keyword(",", Keywords.#commaPrec, Keywords.#semiPrec);
        this._comma = tmp7;
        Keywords.#eqPrec = Keywords.nextPrec;
        Keywords.#ascPrec = Keywords.nextPrec;
        tmp8 = Keyword.Keyword("=", Keywords.#eqPrec, Keywords.#eqPrec);
        this._equal = tmp8;
        tmp9 = Keyword.Keyword("|", Option.None, Keywords.currPrec);
        this._bar = tmp9;
        tmp10 = Keyword.Keyword("and", Option.None, Keywords.currPrec);
        this._and = tmp10;
        tmp11 = Keyword.Keyword(":", Keywords.#ascPrec, Keywords.#eqPrec);
        this._colon = tmp11;
        tmp12 = Keyword.Keyword("match", Keywords.nextPrec, Keywords.currPrec);
        this._match = tmp12;
        tmp13 = Keyword.Keyword("with", Option.None, Keywords.currPrec);
        this._with = tmp13;
        tmp14 = Keyword.Keyword("case", Option.None, Keywords.currPrec);
        this._case = tmp14;
        Keywords.#thenPrec = Keywords.nextPrec;
        tmp15 = Keyword.Keyword("if", Keywords.nextPrec, Keywords.#thenPrec);
        this._if = tmp15;
        tmp16 = Keyword.Keyword("then", Keywords.#thenPrec, Keywords.#thenPrec);
        this._then = tmp16;
        tmp17 = Keyword.Keyword("do", Keywords.#thenPrec, Keywords.#thenPrec);
        this._do = tmp17;
        tmp18 = Keyword.Keyword("else", Keywords.#thenPrec, Keywords.#thenPrec);
        this._else = tmp18;
        tmp19 = Keyword.Keyword("let", Keywords.#eqPrec, Keywords.#semiPrec);
        this._let = tmp19;
        tmp20 = Keyword.Keyword("in", Keywords.#thenPrec, Keywords.#thenPrec);
        this._in = tmp20;
        tmp21 = Keyword.Keyword("true", Option.None, Option.None);
        this._true = tmp21;
        tmp22 = Keyword.Keyword("false", Option.None, Option.None);
        this._false = tmp22;
        tmp23 = Keyword.Keyword("as", Keywords.nextPrec, Keywords.currPrec);
        this._as = tmp23;
        tmp24 = Keyword.Keyword("->", Keywords.nextPrec, Keywords.#eqPrec);
        this._thinArrow = tmp24;
        tmp25 = Keyword.Keyword("fun", Keywords.currPrec, Option.None);
        this._fun = tmp25;
        tmp26 = Keyword.Keyword("function", Keywords.currPrec, Option.None);
        this._function = tmp26;
        tmp27 = Keyword.Keyword("type", Keywords.currPrec, Option.None);
        this._type = tmp27;
        tmp28 = Keyword.Keyword("exception", Keywords.currPrec, Option.None);
        this._exception = tmp28;
        tmp29 = Keyword.Keyword("rec", Keywords.currPrec, Keywords.#eqPrec);
        this._rec = tmp29;
        this.maxPrec = Keywords.#prec;
      }
      static get currPrec() {
        return Option.Some(Keywords.#prec);
      } 
      static get nextPrec() {
        let tmp3;
        tmp3 = Keywords.#prec + 1;
        Keywords.#prec = tmp3;
        return Option.Some(Keywords.#prec);
      }
      static toString() { return "Keywords"; }
    };
    tmp = Precedence.makePrecMap(",", "@", ":", "|", "&", "=", "/ \\", "^", "!", "< >", "+ -", "* %", "~", "", "", ".");
    Precedence.#precMap = tmp;
    scrut = runtime.safeCall(Precedence.#precMap.get("."));
    if (scrut instanceof Option.Some.class) {
      param0 = scrut.value;
      prec = param0;
      tmp1 = prec - 1;
    } else {
      throw new globalThis.Error("match error");
    }
    this.appPrec = tmp1;
    tmp2 = Precedence.appPrec - 1;
    this.prefixPrec = tmp2;
    const Letter$class = class Letter {
      constructor() {}
      unapply(scrut1) {
        let gtLo, ltHi, gtLo1, ltHi1;
        gtLo = "a" <= scrut1;
        if (gtLo === true) {
          ltHi = scrut1 <= "z";
          if (ltHi === true) {
            return runtime.safeCall(globalThis.Predef.MatchResult([]))
          } else {
            gtLo1 = "A" <= scrut1;
            if (gtLo1 === true) {
              ltHi1 = scrut1 <= "Z";
              if (ltHi1 === true) {
                return runtime.safeCall(globalThis.Predef.MatchResult([]))
              } else {
                return runtime.safeCall(globalThis.Predef.MatchFailure())
              }
            } else {
              return runtime.safeCall(globalThis.Predef.MatchFailure())
            }
          }
        } else {
          gtLo1 = "A" <= scrut1;
          if (gtLo1 === true) {
            ltHi1 = scrut1 <= "Z";
            if (ltHi1 === true) {
              return runtime.safeCall(globalThis.Predef.MatchResult([]))
            } else {
              return runtime.safeCall(globalThis.Predef.MatchFailure())
            }
          } else {
            return runtime.safeCall(globalThis.Predef.MatchFailure())
          }
        }
      } 
      unapplyStringPrefix(topic) {
        let emptyTest, head, tail, gtLo, ltHi, emptyTest1, head1, tail1, gtLo1, ltHi1;
        emptyTest = topic == "";
        if (emptyTest === true) {
          return runtime.safeCall(globalThis.Predef.MatchFailure())
        } else {
          head = globalThis.Predef.stringGet(topic, 0);
          tail = globalThis.Predef.stringDrop(topic, 1);
          gtLo = "a" <= head;
          if (gtLo === true) {
            ltHi = head <= "z";
            if (ltHi === true) {
              return runtime.safeCall(globalThis.Predef.MatchResult([
                tail
              ]))
            } else {
              emptyTest1 = topic == "";
              if (emptyTest1 === true) {
                return runtime.safeCall(globalThis.Predef.MatchFailure())
              } else {
                head1 = globalThis.Predef.stringGet(topic, 0);
                tail1 = globalThis.Predef.stringDrop(topic, 1);
                gtLo1 = "A" <= head1;
                if (gtLo1 === true) {
                  ltHi1 = head1 <= "Z";
                  if (ltHi1 === true) {
                    return runtime.safeCall(globalThis.Predef.MatchResult([
                      tail1
                    ]))
                  } else {
                    return runtime.safeCall(globalThis.Predef.MatchFailure())
                  }
                } else {
                  return runtime.safeCall(globalThis.Predef.MatchFailure())
                }
              }
            }
          } else {
            emptyTest1 = topic == "";
            if (emptyTest1 === true) {
              return runtime.safeCall(globalThis.Predef.MatchFailure())
            } else {
              head1 = globalThis.Predef.stringGet(topic, 0);
              tail1 = globalThis.Predef.stringDrop(topic, 1);
              gtLo1 = "A" <= head1;
              if (gtLo1 === true) {
                ltHi1 = head1 <= "Z";
                if (ltHi1 === true) {
                  return runtime.safeCall(globalThis.Predef.MatchResult([
                    tail1
                  ]))
                } else {
                  return runtime.safeCall(globalThis.Predef.MatchFailure())
                }
              } else {
                return runtime.safeCall(globalThis.Predef.MatchFailure())
              }
            }
          }
        }
      }
      toString() { return "Letter"; }
    };
    this.Letter = new Letter$class;
    this.Letter.class = Letter$class;
    const FloatOperator$class = class FloatOperator {
      constructor() {}
      unapply(scrut1) {
        if (scrut1 === "+.") {
          return runtime.safeCall(globalThis.Predef.MatchResult([]))
        } else if (scrut1 === "-.") {
          return runtime.safeCall(globalThis.Predef.MatchResult([]))
        } else if (scrut1 === "*.") {
          return runtime.safeCall(globalThis.Predef.MatchResult([]))
        } else if (scrut1 === "/.") {
          return runtime.safeCall(globalThis.Predef.MatchResult([]))
        } else {
          return runtime.safeCall(globalThis.Predef.MatchFailure())
        }
      } 
      unapplyStringPrefix(topic) {
        let cond, sliced, cond1, sliced1, cond2, sliced2, cond3, sliced3;
        cond = globalThis.Predef.stringStartsWith(topic, "+.");
        if (cond === true) {
          sliced = globalThis.Predef.stringDrop(topic, 2);
          return runtime.safeCall(globalThis.Predef.MatchResult([
            sliced
          ]))
        } else {
          cond1 = globalThis.Predef.stringStartsWith(topic, "-.");
          if (cond1 === true) {
            sliced1 = globalThis.Predef.stringDrop(topic, 2);
            return runtime.safeCall(globalThis.Predef.MatchResult([
              sliced1
            ]))
          } else {
            cond2 = globalThis.Predef.stringStartsWith(topic, "*.");
            if (cond2 === true) {
              sliced2 = globalThis.Predef.stringDrop(topic, 2);
              return runtime.safeCall(globalThis.Predef.MatchResult([
                sliced2
              ]))
            } else {
              cond3 = globalThis.Predef.stringStartsWith(topic, "/.");
              if (cond3 === true) {
                sliced3 = globalThis.Predef.stringDrop(topic, 2);
                return runtime.safeCall(globalThis.Predef.MatchResult([
                  sliced3
                ]))
              } else {
                return runtime.safeCall(globalThis.Predef.MatchFailure())
              }
            }
          }
        }
      }
      toString() { return "FloatOperator"; }
    };
    this.FloatOperator = new FloatOperator$class;
    this.FloatOperator.class = FloatOperator$class;
    const RightAssociative$class = class RightAssociative {
      constructor() {}
      unapply(scrut1) {
        if (scrut1 === "@") {
          return runtime.safeCall(globalThis.Predef.MatchResult([]))
        } else if (scrut1 === "/") {
          return runtime.safeCall(globalThis.Predef.MatchResult([]))
        } else if (scrut1 === ",") {
          return runtime.safeCall(globalThis.Predef.MatchResult([]))
        } else if (scrut1 === ":") {
          return runtime.safeCall(globalThis.Predef.MatchResult([]))
        } else {
          return runtime.safeCall(globalThis.Predef.MatchFailure())
        }
      } 
      unapplyStringPrefix(topic) {
        let cond, sliced, cond1, sliced1, cond2, sliced2, cond3, sliced3;
        cond = globalThis.Predef.stringStartsWith(topic, "@");
        if (cond === true) {
          sliced = globalThis.Predef.stringDrop(topic, 1);
          return runtime.safeCall(globalThis.Predef.MatchResult([
            sliced
          ]))
        } else {
          cond1 = globalThis.Predef.stringStartsWith(topic, "/");
          if (cond1 === true) {
            sliced1 = globalThis.Predef.stringDrop(topic, 1);
            return runtime.safeCall(globalThis.Predef.MatchResult([
              sliced1
            ]))
          } else {
            cond2 = globalThis.Predef.stringStartsWith(topic, ",");
            if (cond2 === true) {
              sliced2 = globalThis.Predef.stringDrop(topic, 1);
              return runtime.safeCall(globalThis.Predef.MatchResult([
                sliced2
              ]))
            } else {
              cond3 = globalThis.Predef.stringStartsWith(topic, ":");
              if (cond3 === true) {
                sliced3 = globalThis.Predef.stringDrop(topic, 1);
                return runtime.safeCall(globalThis.Predef.MatchResult([
                  sliced3
                ]))
              } else {
                return runtime.safeCall(globalThis.Predef.MatchFailure())
              }
            }
          }
        }
      }
      toString() { return "RightAssociative"; }
    };
    this.RightAssociative = new RightAssociative$class;
    this.RightAssociative.class = RightAssociative$class;
  }
  static makePrecMap(...ops) {
    let m, i, scrut, tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6;
    tmp = new BetterMap.Map();
    m = tmp;
    i = 0;
    tmp7: while (true) {
      scrut = i < ops.length;
      if (scrut === true) {
        tmp1 = runtime.safeCall(ops.at(i));
        tmp2 = runtime.safeCall(tmp1.split(" "));
        tmp3 = (op, _, _1) => {
          let scrut1, tmp8;
          scrut1 = op.length > 0;
          if (scrut1 === true) {
            tmp8 = i + Precedence.Keywords.maxPrec;
            return m.insert(op, tmp8)
          } else {
            return runtime.Unit
          }
        };
        tmp4 = runtime.safeCall(tmp2.forEach(tmp3));
        tmp5 = i + 1;
        i = tmp5;
        tmp6 = runtime.Unit;
        continue tmp7;
      } else {
        tmp6 = runtime.Unit;
      }
      break;
    }
    return m
  } 
  static orMaxPrec(precOpt) {
    let param0, prec;
    if (precOpt instanceof Option.Some.class) {
      param0 = precOpt.value;
      prec = param0;
      return prec
    } else if (precOpt instanceof Option.None.class) {
      return Keyword.INT_MAX
    } else {
      throw new globalThis.Error("match error");
    }
  } 
  static charPrec(op) {
    let scrut, param0, prec;
    scrut = runtime.safeCall(Precedence.#precMap.get(op));
    if (scrut instanceof Option.Some.class) {
      param0 = scrut.value;
      prec = param0;
      return prec
    } else {
      return Keyword.INT_MAX
    }
  } 
  static hasLetter(s) {
    return runtime.safeCall([
      ...s
    ].some((ch, _, _1) => {
      let matchResult;
      matchResult = runtime.safeCall(Precedence.Letter.unapply(ch));
      if (matchResult instanceof globalThis.Predef.MatchResult.class) {
        return true
      } else {
        return false
      }
    }))
  } 
  static opPrec(opStr) {
    let leftPrec, rightOp, rightPrec, matchResult, scrut, matchResult1, tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6;
    matchResult1 = runtime.safeCall(Precedence.FloatOperator.unapply(opStr));
    if (matchResult1 instanceof globalThis.Predef.MatchResult.class) {
      tmp = runtime.safeCall(opStr.at(0));
      tmp1 = Precedence.charPrec(tmp);
      tmp2 = runtime.safeCall(opStr.at(0));
      tmp3 = Precedence.charPrec(tmp2);
      return [
        tmp1,
        tmp3
      ]
    } else {
      scrut = Precedence.hasLetter(opStr);
      if (scrut === true) {
        return [
          Precedence.Keywords.maxPrec,
          Precedence.Keywords.maxPrec
        ]
      } else {
        tmp4 = runtime.safeCall(opStr.at(0));
        leftPrec = Precedence.charPrec(tmp4);
        tmp5 = - 1;
        rightOp = runtime.safeCall(opStr.at(tmp5));
        rightPrec = Precedence.charPrec(rightOp);
        matchResult = runtime.safeCall(Precedence.RightAssociative.unapply(rightOp));
        if (matchResult instanceof globalThis.Predef.MatchResult.class) {
          tmp6 = rightPrec - 1;
          return [
            leftPrec,
            tmp6
          ]
        } else {
          return [
            leftPrec,
            rightPrec
          ]
        }
      }
    }
  }
  static toString() { return "Precedence"; }
};
let Precedence = Precedence1; export default Precedence;
