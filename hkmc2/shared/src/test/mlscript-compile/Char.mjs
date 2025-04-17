import runtime from "./Runtime.mjs";
let Char1;
(class Char {
  static {
    Char1 = Char;
    const Lowercase$class = class Lowercase {
      constructor() {}
      unapply(scrut) {
        let gtLo, ltHi;
        gtLo = "a" <= scrut;
        if (gtLo === true) {
          ltHi = scrut <= "z";
          if (ltHi === true) {
            return runtime.safeCall(runtime.MatchResult([]))
          } else {
            return runtime.safeCall(runtime.MatchFailure())
          }
        } else {
          return runtime.safeCall(runtime.MatchFailure())
        }
      } 
      unapplyStringPrefix(topic) {
        let emptyTest, head, tail, gtLo, ltHi;
        emptyTest = topic == "";
        if (emptyTest === true) {
          return runtime.safeCall(runtime.MatchFailure())
        } else {
          head = runtime.Str.get(topic, 0);
          tail = runtime.Str.drop(topic, 1);
          gtLo = "a" <= head;
          if (gtLo === true) {
            ltHi = head <= "z";
            if (ltHi === true) {
              return runtime.safeCall(runtime.MatchResult([
                tail
              ]))
            } else {
              return runtime.safeCall(runtime.MatchFailure())
            }
          } else {
            return runtime.safeCall(runtime.MatchFailure())
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
            return runtime.safeCall(runtime.MatchResult([]))
          } else {
            return runtime.safeCall(runtime.MatchFailure())
          }
        } else {
          return runtime.safeCall(runtime.MatchFailure())
        }
      } 
      unapplyStringPrefix(topic) {
        let emptyTest, head, tail, gtLo, ltHi;
        emptyTest = topic == "";
        if (emptyTest === true) {
          return runtime.safeCall(runtime.MatchFailure())
        } else {
          head = runtime.Str.get(topic, 0);
          tail = runtime.Str.drop(topic, 1);
          gtLo = "A" <= head;
          if (gtLo === true) {
            ltHi = head <= "Z";
            if (ltHi === true) {
              return runtime.safeCall(runtime.MatchResult([
                tail
              ]))
            } else {
              return runtime.safeCall(runtime.MatchFailure())
            }
          } else {
            return runtime.safeCall(runtime.MatchFailure())
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
        if (matchResult instanceof runtime.MatchResult.class) {
          return runtime.safeCall(runtime.MatchResult([]))
        } else {
          matchResult1 = runtime.safeCall(Char.Uppercase.unapply(scrut));
          if (matchResult1 instanceof runtime.MatchResult.class) {
            return runtime.safeCall(runtime.MatchResult([]))
          } else {
            return runtime.safeCall(runtime.MatchFailure())
          }
        }
      } 
      unapplyStringPrefix(topic) {
        let matchResult, arg, postfix, matchResult1, arg1, postfix1;
        matchResult = runtime.safeCall(Char.Lowercase.unapplyStringPrefix(topic));
        if (matchResult instanceof runtime.MatchResult.class) {
          arg = matchResult.captures;
          postfix = runtime.Tuple.get(arg, 0);
          return runtime.safeCall(runtime.MatchResult([
            postfix
          ]))
        } else {
          matchResult1 = runtime.safeCall(Char.Uppercase.unapplyStringPrefix(topic));
          if (matchResult1 instanceof runtime.MatchResult.class) {
            arg1 = matchResult1.captures;
            postfix1 = runtime.Tuple.get(arg1, 0);
            return runtime.safeCall(runtime.MatchResult([
              postfix1
            ]))
          } else {
            return runtime.safeCall(runtime.MatchFailure())
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
            return runtime.safeCall(runtime.MatchResult([]))
          } else {
            return runtime.safeCall(runtime.MatchFailure())
          }
        } else {
          return runtime.safeCall(runtime.MatchFailure())
        }
      } 
      unapplyStringPrefix(topic) {
        let emptyTest, head, tail, gtLo, ltHi;
        emptyTest = topic == "";
        if (emptyTest === true) {
          return runtime.safeCall(runtime.MatchFailure())
        } else {
          head = runtime.Str.get(topic, 0);
          tail = runtime.Str.drop(topic, 1);
          gtLo = "0" <= head;
          if (gtLo === true) {
            ltHi = head <= "9";
            if (ltHi === true) {
              return runtime.safeCall(runtime.MatchResult([
                tail
              ]))
            } else {
              return runtime.safeCall(runtime.MatchFailure())
            }
          } else {
            return runtime.safeCall(runtime.MatchFailure())
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
        if (matchResult instanceof runtime.MatchResult.class) {
          return runtime.safeCall(runtime.MatchResult([]))
        } else {
          gtLo = "a" <= scrut;
          if (gtLo === true) {
            ltHi = scrut <= "f";
            if (ltHi === true) {
              return runtime.safeCall(runtime.MatchResult([]))
            } else {
              gtLo1 = "A" <= scrut;
              if (gtLo1 === true) {
                ltHi1 = scrut <= "F";
                if (ltHi1 === true) {
                  return runtime.safeCall(runtime.MatchResult([]))
                } else {
                  return runtime.safeCall(runtime.MatchFailure())
                }
              } else {
                return runtime.safeCall(runtime.MatchFailure())
              }
            }
          } else {
            gtLo1 = "A" <= scrut;
            if (gtLo1 === true) {
              ltHi1 = scrut <= "F";
              if (ltHi1 === true) {
                return runtime.safeCall(runtime.MatchResult([]))
              } else {
                return runtime.safeCall(runtime.MatchFailure())
              }
            } else {
              return runtime.safeCall(runtime.MatchFailure())
            }
          }
        }
      } 
      unapplyStringPrefix(topic) {
        let matchResult, arg, postfix, emptyTest, head, tail, gtLo, ltHi, emptyTest1, head1, tail1, gtLo1, ltHi1;
        matchResult = runtime.safeCall(Char.Digit.unapplyStringPrefix(topic));
        if (matchResult instanceof runtime.MatchResult.class) {
          arg = matchResult.captures;
          postfix = runtime.Tuple.get(arg, 0);
          return runtime.safeCall(runtime.MatchResult([
            postfix
          ]))
        } else {
          emptyTest = topic == "";
          if (emptyTest === true) {
            return runtime.safeCall(runtime.MatchFailure())
          } else {
            head = runtime.Str.get(topic, 0);
            tail = runtime.Str.drop(topic, 1);
            gtLo = "a" <= head;
            if (gtLo === true) {
              ltHi = head <= "f";
              if (ltHi === true) {
                return runtime.safeCall(runtime.MatchResult([
                  tail
                ]))
              } else {
                emptyTest1 = topic == "";
                if (emptyTest1 === true) {
                  return runtime.safeCall(runtime.MatchFailure())
                } else {
                  head1 = runtime.Str.get(topic, 0);
                  tail1 = runtime.Str.drop(topic, 1);
                  gtLo1 = "A" <= head1;
                  if (gtLo1 === true) {
                    ltHi1 = head1 <= "F";
                    if (ltHi1 === true) {
                      return runtime.safeCall(runtime.MatchResult([
                        tail1
                      ]))
                    } else {
                      return runtime.safeCall(runtime.MatchFailure())
                    }
                  } else {
                    return runtime.safeCall(runtime.MatchFailure())
                  }
                }
              }
            } else {
              emptyTest1 = topic == "";
              if (emptyTest1 === true) {
                return runtime.safeCall(runtime.MatchFailure())
              } else {
                head1 = runtime.Str.get(topic, 0);
                tail1 = runtime.Str.drop(topic, 1);
                gtLo1 = "A" <= head1;
                if (gtLo1 === true) {
                  ltHi1 = head1 <= "F";
                  if (ltHi1 === true) {
                    return runtime.safeCall(runtime.MatchResult([
                      tail1
                    ]))
                  } else {
                    return runtime.safeCall(runtime.MatchFailure())
                  }
                } else {
                  return runtime.safeCall(runtime.MatchFailure())
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
            return runtime.safeCall(runtime.MatchResult([]))
          } else {
            return runtime.safeCall(runtime.MatchFailure())
          }
        } else {
          return runtime.safeCall(runtime.MatchFailure())
        }
      } 
      unapplyStringPrefix(topic) {
        let emptyTest, head, tail, gtLo, ltHi;
        emptyTest = topic == "";
        if (emptyTest === true) {
          return runtime.safeCall(runtime.MatchFailure())
        } else {
          head = runtime.Str.get(topic, 0);
          tail = runtime.Str.drop(topic, 1);
          gtLo = "0" <= head;
          if (gtLo === true) {
            ltHi = head <= "7";
            if (ltHi === true) {
              return runtime.safeCall(runtime.MatchResult([
                tail
              ]))
            } else {
              return runtime.safeCall(runtime.MatchFailure())
            }
          } else {
            return runtime.safeCall(runtime.MatchFailure())
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
          return runtime.safeCall(runtime.MatchResult([]))
        } else if (scrut === "1") {
          return runtime.safeCall(runtime.MatchResult([]))
        } else {
          return runtime.safeCall(runtime.MatchFailure())
        }
      } 
      unapplyStringPrefix(topic) {
        let cond, sliced, cond1, sliced1;
        cond = runtime.Str.startsWith(topic, "0");
        if (cond === true) {
          sliced = runtime.Str.drop(topic, 1);
          return runtime.safeCall(runtime.MatchResult([
            sliced
          ]))
        } else {
          cond1 = runtime.Str.startsWith(topic, "1");
          if (cond1 === true) {
            sliced1 = runtime.Str.drop(topic, 1);
            return runtime.safeCall(runtime.MatchResult([
              sliced1
            ]))
          } else {
            return runtime.safeCall(runtime.MatchFailure())
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
          return runtime.safeCall(runtime.MatchResult([]))
        } else if (scrut === "\t") {
          return runtime.safeCall(runtime.MatchResult([]))
        } else if (scrut === "\n") {
          return runtime.safeCall(runtime.MatchResult([]))
        } else if (scrut === "\r") {
          return runtime.safeCall(runtime.MatchResult([]))
        } else {
          return runtime.safeCall(runtime.MatchFailure())
        }
      } 
      unapplyStringPrefix(topic) {
        let cond, sliced, cond1, sliced1, cond2, sliced2, cond3, sliced3;
        cond = runtime.Str.startsWith(topic, " ");
        if (cond === true) {
          sliced = runtime.Str.drop(topic, 1);
          return runtime.safeCall(runtime.MatchResult([
            sliced
          ]))
        } else {
          cond1 = runtime.Str.startsWith(topic, "\t");
          if (cond1 === true) {
            sliced1 = runtime.Str.drop(topic, 1);
            return runtime.safeCall(runtime.MatchResult([
              sliced1
            ]))
          } else {
            cond2 = runtime.Str.startsWith(topic, "\n");
            if (cond2 === true) {
              sliced2 = runtime.Str.drop(topic, 1);
              return runtime.safeCall(runtime.MatchResult([
                sliced2
              ]))
            } else {
              cond3 = runtime.Str.startsWith(topic, "\r");
              if (cond3 === true) {
                sliced3 = runtime.Str.drop(topic, 1);
                return runtime.safeCall(runtime.MatchResult([
                  sliced3
                ]))
              } else {
                return runtime.safeCall(runtime.MatchFailure())
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
});
let Char = Char1; export default Char;
