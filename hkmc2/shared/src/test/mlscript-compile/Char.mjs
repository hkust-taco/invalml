import runtime from "./Runtime.mjs";
let Char1;
Char1 = class Char {
  static {
    const Lowercase$class = class Lowercase {
      constructor() {}
      unapply(scrut) {
        let gtLo, ltHi;
        gtLo = "a" <= scrut;
        if (gtLo === true) {
          ltHi = scrut <= "z";
          if (ltHi === true) {
            return runtime.safeCall(globalThis.Predef.MatchResult([]))
          } else {
            return runtime.safeCall(globalThis.Predef.MatchFailure())
          }
        } else {
          return runtime.safeCall(globalThis.Predef.MatchFailure())
        }
      } 
      unapplyStringPrefix(topic) {
        let emptyTest, head, tail, gtLo, ltHi;
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
              return runtime.safeCall(globalThis.Predef.MatchFailure())
            }
          } else {
            return runtime.safeCall(globalThis.Predef.MatchFailure())
          }
        }
      }
      toString() { return "Lowercase"; }
    };
    this.Lowercase = new Lowercase$class;
    this.Lowercase.class = Lowercase$class;
    const Uppercase$class = class Uppercase {
      constructor() {}
      unapply(scrut) {
        let gtLo, ltHi;
        gtLo = "A" <= scrut;
        if (gtLo === true) {
          ltHi = scrut <= "Z";
          if (ltHi === true) {
            return runtime.safeCall(globalThis.Predef.MatchResult([]))
          } else {
            return runtime.safeCall(globalThis.Predef.MatchFailure())
          }
        } else {
          return runtime.safeCall(globalThis.Predef.MatchFailure())
        }
      } 
      unapplyStringPrefix(topic) {
        let emptyTest, head, tail, gtLo, ltHi;
        emptyTest = topic == "";
        if (emptyTest === true) {
          return runtime.safeCall(globalThis.Predef.MatchFailure())
        } else {
          head = globalThis.Predef.stringGet(topic, 0);
          tail = globalThis.Predef.stringDrop(topic, 1);
          gtLo = "A" <= head;
          if (gtLo === true) {
            ltHi = head <= "Z";
            if (ltHi === true) {
              return runtime.safeCall(globalThis.Predef.MatchResult([
                tail
              ]))
            } else {
              return runtime.safeCall(globalThis.Predef.MatchFailure())
            }
          } else {
            return runtime.safeCall(globalThis.Predef.MatchFailure())
          }
        }
      }
      toString() { return "Uppercase"; }
    };
    this.Uppercase = new Uppercase$class;
    this.Uppercase.class = Uppercase$class;
    const Letter$class = class Letter {
      constructor() {}
      unapply(scrut) {
        let matchResult, matchResult1;
        matchResult = runtime.safeCall(Char.Lowercase.unapply(scrut));
        if (matchResult instanceof globalThis.Predef.MatchResult.class) {
          return runtime.safeCall(globalThis.Predef.MatchResult([]))
        } else {
          matchResult1 = runtime.safeCall(Char.Uppercase.unapply(scrut));
          if (matchResult1 instanceof globalThis.Predef.MatchResult.class) {
            return runtime.safeCall(globalThis.Predef.MatchResult([]))
          } else {
            return runtime.safeCall(globalThis.Predef.MatchFailure())
          }
        }
      } 
      unapplyStringPrefix(topic) {
        let matchResult, arg, postfix, matchResult1, arg1, postfix1;
        matchResult = runtime.safeCall(Char.Lowercase.unapplyStringPrefix(topic));
        if (matchResult instanceof globalThis.Predef.MatchResult.class) {
          arg = matchResult.captures;
          postfix = globalThis.Predef.tupleGet(arg, 0);
          return runtime.safeCall(globalThis.Predef.MatchResult([
            postfix
          ]))
        } else {
          matchResult1 = runtime.safeCall(Char.Uppercase.unapplyStringPrefix(topic));
          if (matchResult1 instanceof globalThis.Predef.MatchResult.class) {
            arg1 = matchResult1.captures;
            postfix1 = globalThis.Predef.tupleGet(arg1, 0);
            return runtime.safeCall(globalThis.Predef.MatchResult([
              postfix1
            ]))
          } else {
            return runtime.safeCall(globalThis.Predef.MatchFailure())
          }
        }
      }
      toString() { return "Letter"; }
    };
    this.Letter = new Letter$class;
    this.Letter.class = Letter$class;
    const Digit$class = class Digit {
      constructor() {}
      unapply(scrut) {
        let gtLo, ltHi;
        gtLo = "0" <= scrut;
        if (gtLo === true) {
          ltHi = scrut <= "9";
          if (ltHi === true) {
            return runtime.safeCall(globalThis.Predef.MatchResult([]))
          } else {
            return runtime.safeCall(globalThis.Predef.MatchFailure())
          }
        } else {
          return runtime.safeCall(globalThis.Predef.MatchFailure())
        }
      } 
      unapplyStringPrefix(topic) {
        let emptyTest, head, tail, gtLo, ltHi;
        emptyTest = topic == "";
        if (emptyTest === true) {
          return runtime.safeCall(globalThis.Predef.MatchFailure())
        } else {
          head = globalThis.Predef.stringGet(topic, 0);
          tail = globalThis.Predef.stringDrop(topic, 1);
          gtLo = "0" <= head;
          if (gtLo === true) {
            ltHi = head <= "9";
            if (ltHi === true) {
              return runtime.safeCall(globalThis.Predef.MatchResult([
                tail
              ]))
            } else {
              return runtime.safeCall(globalThis.Predef.MatchFailure())
            }
          } else {
            return runtime.safeCall(globalThis.Predef.MatchFailure())
          }
        }
      }
      toString() { return "Digit"; }
    };
    this.Digit = new Digit$class;
    this.Digit.class = Digit$class;
    const HexDigit$class = class HexDigit {
      constructor() {}
      unapply(scrut) {
        let matchResult, gtLo, ltHi, gtLo1, ltHi1;
        matchResult = runtime.safeCall(Char.Digit.unapply(scrut));
        if (matchResult instanceof globalThis.Predef.MatchResult.class) {
          return runtime.safeCall(globalThis.Predef.MatchResult([]))
        } else {
          gtLo = "a" <= scrut;
          if (gtLo === true) {
            ltHi = scrut <= "f";
            if (ltHi === true) {
              return runtime.safeCall(globalThis.Predef.MatchResult([]))
            } else {
              gtLo1 = "A" <= scrut;
              if (gtLo1 === true) {
                ltHi1 = scrut <= "F";
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
            gtLo1 = "A" <= scrut;
            if (gtLo1 === true) {
              ltHi1 = scrut <= "F";
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
      } 
      unapplyStringPrefix(topic) {
        let matchResult, arg, postfix, emptyTest, head, tail, gtLo, ltHi, emptyTest1, head1, tail1, gtLo1, ltHi1;
        matchResult = runtime.safeCall(Char.Digit.unapplyStringPrefix(topic));
        if (matchResult instanceof globalThis.Predef.MatchResult.class) {
          arg = matchResult.captures;
          postfix = globalThis.Predef.tupleGet(arg, 0);
          return runtime.safeCall(globalThis.Predef.MatchResult([
            postfix
          ]))
        } else {
          emptyTest = topic == "";
          if (emptyTest === true) {
            return runtime.safeCall(globalThis.Predef.MatchFailure())
          } else {
            head = globalThis.Predef.stringGet(topic, 0);
            tail = globalThis.Predef.stringDrop(topic, 1);
            gtLo = "a" <= head;
            if (gtLo === true) {
              ltHi = head <= "f";
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
                    ltHi1 = head1 <= "F";
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
                  ltHi1 = head1 <= "F";
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
      }
      toString() { return "HexDigit"; }
    };
    this.HexDigit = new HexDigit$class;
    this.HexDigit.class = HexDigit$class;
    const OctDigit$class = class OctDigit {
      constructor() {}
      unapply(scrut) {
        let gtLo, ltHi;
        gtLo = "0" <= scrut;
        if (gtLo === true) {
          ltHi = scrut <= "7";
          if (ltHi === true) {
            return runtime.safeCall(globalThis.Predef.MatchResult([]))
          } else {
            return runtime.safeCall(globalThis.Predef.MatchFailure())
          }
        } else {
          return runtime.safeCall(globalThis.Predef.MatchFailure())
        }
      } 
      unapplyStringPrefix(topic) {
        let emptyTest, head, tail, gtLo, ltHi;
        emptyTest = topic == "";
        if (emptyTest === true) {
          return runtime.safeCall(globalThis.Predef.MatchFailure())
        } else {
          head = globalThis.Predef.stringGet(topic, 0);
          tail = globalThis.Predef.stringDrop(topic, 1);
          gtLo = "0" <= head;
          if (gtLo === true) {
            ltHi = head <= "7";
            if (ltHi === true) {
              return runtime.safeCall(globalThis.Predef.MatchResult([
                tail
              ]))
            } else {
              return runtime.safeCall(globalThis.Predef.MatchFailure())
            }
          } else {
            return runtime.safeCall(globalThis.Predef.MatchFailure())
          }
        }
      }
      toString() { return "OctDigit"; }
    };
    this.OctDigit = new OctDigit$class;
    this.OctDigit.class = OctDigit$class;
    const BinDigit$class = class BinDigit {
      constructor() {}
      unapply(scrut) {
        if (scrut === "0") {
          return runtime.safeCall(globalThis.Predef.MatchResult([]))
        } else if (scrut === "1") {
          return runtime.safeCall(globalThis.Predef.MatchResult([]))
        } else {
          return runtime.safeCall(globalThis.Predef.MatchFailure())
        }
      } 
      unapplyStringPrefix(topic) {
        let cond, sliced, cond1, sliced1;
        cond = globalThis.Predef.stringStartsWith(topic, "0");
        if (cond === true) {
          sliced = globalThis.Predef.stringDrop(topic, 1);
          return runtime.safeCall(globalThis.Predef.MatchResult([
            sliced
          ]))
        } else {
          cond1 = globalThis.Predef.stringStartsWith(topic, "1");
          if (cond1 === true) {
            sliced1 = globalThis.Predef.stringDrop(topic, 1);
            return runtime.safeCall(globalThis.Predef.MatchResult([
              sliced1
            ]))
          } else {
            return runtime.safeCall(globalThis.Predef.MatchFailure())
          }
        }
      }
      toString() { return "BinDigit"; }
    };
    this.BinDigit = new BinDigit$class;
    this.BinDigit.class = BinDigit$class;
    const Whitespace$class = class Whitespace {
      constructor() {}
      unapply(scrut) {
        if (scrut === " ") {
          return runtime.safeCall(globalThis.Predef.MatchResult([]))
        } else if (scrut === "\t") {
          return runtime.safeCall(globalThis.Predef.MatchResult([]))
        } else if (scrut === "\n") {
          return runtime.safeCall(globalThis.Predef.MatchResult([]))
        } else if (scrut === "\r") {
          return runtime.safeCall(globalThis.Predef.MatchResult([]))
        } else {
          return runtime.safeCall(globalThis.Predef.MatchFailure())
        }
      } 
      unapplyStringPrefix(topic) {
        let cond, sliced, cond1, sliced1, cond2, sliced2, cond3, sliced3;
        cond = globalThis.Predef.stringStartsWith(topic, " ");
        if (cond === true) {
          sliced = globalThis.Predef.stringDrop(topic, 1);
          return runtime.safeCall(globalThis.Predef.MatchResult([
            sliced
          ]))
        } else {
          cond1 = globalThis.Predef.stringStartsWith(topic, "\t");
          if (cond1 === true) {
            sliced1 = globalThis.Predef.stringDrop(topic, 1);
            return runtime.safeCall(globalThis.Predef.MatchResult([
              sliced1
            ]))
          } else {
            cond2 = globalThis.Predef.stringStartsWith(topic, "\n");
            if (cond2 === true) {
              sliced2 = globalThis.Predef.stringDrop(topic, 1);
              return runtime.safeCall(globalThis.Predef.MatchResult([
                sliced2
              ]))
            } else {
              cond3 = globalThis.Predef.stringStartsWith(topic, "\r");
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
      toString() { return "Whitespace"; }
    };
    this.Whitespace = new Whitespace$class;
    this.Whitespace.class = Whitespace$class;
  }
  static toString() { return "Char"; }
};
let Char = Char1; export default Char;
