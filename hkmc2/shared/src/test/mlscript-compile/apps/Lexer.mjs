import runtime from "./../Runtime.mjs";
import Predef from "./../Predef.mjs";
import Char from "./../Char.mjs";
import Stack from "./../Stack.mjs";
import Str from "./../Str.mjs";
import Option from "./../Option.mjs";
import Iter from "./../Iter.mjs";
import Token from "./parsing/Token.mjs";
let Lexer1;
Lexer1 = class Lexer {
  static {
    this.Location = function Location(start1, end1) { return new Location.class(start1, end1); };
    this.Location.class = class Location {
      constructor(start, end) {
        this.start = start;
        this.end = end;
      }
      toString() { return "Location(" + globalThis.Predef.render(this.start) + ", " + globalThis.Predef.render(this.end) + ")"; }
    };
    this.Message = function Message(description1, location1) { return new Message.class(description1, location1); };
    this.Message.class = class Message {
      constructor(description, location) {
        this.description = description;
        this.location = location;
      }
      toString() { return "Message(" + globalThis.Predef.render(this.description) + ", " + globalThis.Predef.render(this.location) + ")"; }
    };
    this.Report = function Report(messages1) { return new Report.class(messages1); };
    this.Report.class = class Report {
      constructor(messages) {
        this.messages = messages;
      }
      toString() { return "Report(" + globalThis.Predef.render(this.messages) + ")"; }
    };
    const IdentifierStart$class = class IdentifierStart {
      constructor() {}
      unapply(scrut) {
        let matchResult;
        matchResult = runtime.safeCall(Char.Letter.unapply(scrut));
        if (matchResult instanceof globalThis.Predef.MatchResult.class) {
          return runtime.safeCall(globalThis.Predef.MatchResult([]))
        } else {
          if (scrut === "_") {
            return runtime.safeCall(globalThis.Predef.MatchResult([]))
          } else {
            return runtime.safeCall(globalThis.Predef.MatchFailure())
          }
        }
      } 
      unapplyStringPrefix(topic) {
        let matchResult, arg, postfix, cond, sliced;
        matchResult = runtime.safeCall(Char.Letter.unapplyStringPrefix(topic));
        if (matchResult instanceof globalThis.Predef.MatchResult.class) {
          arg = matchResult.captures;
          postfix = globalThis.Predef.tupleGet(arg, 0);
          return runtime.safeCall(globalThis.Predef.MatchResult([
            postfix
          ]))
        } else {
          cond = globalThis.Predef.stringStartsWith(topic, "_");
          if (cond === true) {
            sliced = globalThis.Predef.stringDrop(topic, 1);
            return runtime.safeCall(globalThis.Predef.MatchResult([
              sliced
            ]))
          } else {
            return runtime.safeCall(globalThis.Predef.MatchFailure())
          }
        }
      }
      toString() { return "IdentifierStart"; }
    };
    this.IdentifierStart = new IdentifierStart$class;
    this.IdentifierStart.class = IdentifierStart$class;
    const IdentifierBody$class = class IdentifierBody {
      constructor() {}
      unapply(scrut) {
        let matchResult, matchResult1;
        matchResult = runtime.safeCall(Char.Letter.unapply(scrut));
        if (matchResult instanceof globalThis.Predef.MatchResult.class) {
          return runtime.safeCall(globalThis.Predef.MatchResult([]))
        } else {
          matchResult1 = runtime.safeCall(Char.Digit.unapply(scrut));
          if (matchResult1 instanceof globalThis.Predef.MatchResult.class) {
            return runtime.safeCall(globalThis.Predef.MatchResult([]))
          } else {
            if (scrut === "_") {
              return runtime.safeCall(globalThis.Predef.MatchResult([]))
            } else if (scrut === "'") {
              return runtime.safeCall(globalThis.Predef.MatchResult([]))
            } else {
              return runtime.safeCall(globalThis.Predef.MatchFailure())
            }
          }
        }
      } 
      unapplyStringPrefix(topic) {
        let matchResult, arg, postfix, matchResult1, arg1, postfix1, cond, sliced, cond1, sliced1;
        matchResult = runtime.safeCall(Char.Letter.unapplyStringPrefix(topic));
        if (matchResult instanceof globalThis.Predef.MatchResult.class) {
          arg = matchResult.captures;
          postfix = globalThis.Predef.tupleGet(arg, 0);
          return runtime.safeCall(globalThis.Predef.MatchResult([
            postfix
          ]))
        } else {
          matchResult1 = runtime.safeCall(Char.Digit.unapplyStringPrefix(topic));
          if (matchResult1 instanceof globalThis.Predef.MatchResult.class) {
            arg1 = matchResult1.captures;
            postfix1 = globalThis.Predef.tupleGet(arg1, 0);
            return runtime.safeCall(globalThis.Predef.MatchResult([
              postfix1
            ]))
          } else {
            cond = globalThis.Predef.stringStartsWith(topic, "_");
            if (cond === true) {
              sliced = globalThis.Predef.stringDrop(topic, 1);
              return runtime.safeCall(globalThis.Predef.MatchResult([
                sliced
              ]))
            } else {
              cond1 = globalThis.Predef.stringStartsWith(topic, "'");
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
        }
      }
      toString() { return "IdentifierBody"; }
    };
    this.IdentifierBody = new IdentifierBody$class;
    this.IdentifierBody.class = IdentifierBody$class;
    const Operator$class = class Operator {
      constructor() {}
      unapply(scrut) {
        if (scrut === ",") {
          return runtime.safeCall(globalThis.Predef.MatchResult([]))
        } else {
          if (scrut === ";") {
            return runtime.safeCall(globalThis.Predef.MatchResult([]))
          } else if (scrut === "!") {
            return runtime.safeCall(globalThis.Predef.MatchResult([]))
          } else if (scrut === "#") {
            return runtime.safeCall(globalThis.Predef.MatchResult([]))
          } else if (scrut === "%") {
            return runtime.safeCall(globalThis.Predef.MatchResult([]))
          } else if (scrut === "&") {
            return runtime.safeCall(globalThis.Predef.MatchResult([]))
          } else if (scrut === "*") {
            return runtime.safeCall(globalThis.Predef.MatchResult([]))
          } else if (scrut === "+") {
            return runtime.safeCall(globalThis.Predef.MatchResult([]))
          } else if (scrut === "-") {
            return runtime.safeCall(globalThis.Predef.MatchResult([]))
          } else if (scrut === "/") {
            return runtime.safeCall(globalThis.Predef.MatchResult([]))
          } else if (scrut === ":") {
            return runtime.safeCall(globalThis.Predef.MatchResult([]))
          } else {
            if (scrut === "<") {
              return runtime.safeCall(globalThis.Predef.MatchResult([]))
            } else if (scrut === "=") {
              return runtime.safeCall(globalThis.Predef.MatchResult([]))
            } else if (scrut === ">") {
              return runtime.safeCall(globalThis.Predef.MatchResult([]))
            } else if (scrut === "?") {
              return runtime.safeCall(globalThis.Predef.MatchResult([]))
            } else if (scrut === "@") {
              return runtime.safeCall(globalThis.Predef.MatchResult([]))
            } else if (scrut === "\\") {
              return runtime.safeCall(globalThis.Predef.MatchResult([]))
            } else if (scrut === "^") {
              return runtime.safeCall(globalThis.Predef.MatchResult([]))
            } else if (scrut === "|") {
              return runtime.safeCall(globalThis.Predef.MatchResult([]))
            } else if (scrut === "~") {
              return runtime.safeCall(globalThis.Predef.MatchResult([]))
            } else if (scrut === ".") {
              return runtime.safeCall(globalThis.Predef.MatchResult([]))
            } else {
              return runtime.safeCall(globalThis.Predef.MatchFailure())
            }
          }
        }
      } 
      unapplyStringPrefix(topic) {
        let cond, sliced, cond1, sliced1, cond2, sliced2, cond3, sliced3, cond4, sliced4, cond5, sliced5, cond6, sliced6, cond7, sliced7, cond8, sliced8, cond9, sliced9, cond10, sliced10, cond11, sliced11, cond12, sliced12, cond13, sliced13, cond14, sliced14, cond15, sliced15, cond16, sliced16, cond17, sliced17, cond18, sliced18, cond19, sliced19, cond20, sliced20;
        cond = globalThis.Predef.stringStartsWith(topic, ",");
        if (cond === true) {
          sliced = globalThis.Predef.stringDrop(topic, 1);
          return runtime.safeCall(globalThis.Predef.MatchResult([
            sliced
          ]))
        } else {
          cond1 = globalThis.Predef.stringStartsWith(topic, ";");
          if (cond1 === true) {
            sliced1 = globalThis.Predef.stringDrop(topic, 1);
            return runtime.safeCall(globalThis.Predef.MatchResult([
              sliced1
            ]))
          } else {
            cond2 = globalThis.Predef.stringStartsWith(topic, "!");
            if (cond2 === true) {
              sliced2 = globalThis.Predef.stringDrop(topic, 1);
              return runtime.safeCall(globalThis.Predef.MatchResult([
                sliced2
              ]))
            } else {
              cond3 = globalThis.Predef.stringStartsWith(topic, "#");
              if (cond3 === true) {
                sliced3 = globalThis.Predef.stringDrop(topic, 1);
                return runtime.safeCall(globalThis.Predef.MatchResult([
                  sliced3
                ]))
              } else {
                cond4 = globalThis.Predef.stringStartsWith(topic, "%");
                if (cond4 === true) {
                  sliced4 = globalThis.Predef.stringDrop(topic, 1);
                  return runtime.safeCall(globalThis.Predef.MatchResult([
                    sliced4
                  ]))
                } else {
                  cond5 = globalThis.Predef.stringStartsWith(topic, "&");
                  if (cond5 === true) {
                    sliced5 = globalThis.Predef.stringDrop(topic, 1);
                    return runtime.safeCall(globalThis.Predef.MatchResult([
                      sliced5
                    ]))
                  } else {
                    cond6 = globalThis.Predef.stringStartsWith(topic, "*");
                    if (cond6 === true) {
                      sliced6 = globalThis.Predef.stringDrop(topic, 1);
                      return runtime.safeCall(globalThis.Predef.MatchResult([
                        sliced6
                      ]))
                    } else {
                      cond7 = globalThis.Predef.stringStartsWith(topic, "+");
                      if (cond7 === true) {
                        sliced7 = globalThis.Predef.stringDrop(topic, 1);
                        return runtime.safeCall(globalThis.Predef.MatchResult([
                          sliced7
                        ]))
                      } else {
                        cond8 = globalThis.Predef.stringStartsWith(topic, "-");
                        if (cond8 === true) {
                          sliced8 = globalThis.Predef.stringDrop(topic, 1);
                          return runtime.safeCall(globalThis.Predef.MatchResult([
                            sliced8
                          ]))
                        } else {
                          cond9 = globalThis.Predef.stringStartsWith(topic, "/");
                          if (cond9 === true) {
                            sliced9 = globalThis.Predef.stringDrop(topic, 1);
                            return runtime.safeCall(globalThis.Predef.MatchResult([
                              sliced9
                            ]))
                          } else {
                            cond10 = globalThis.Predef.stringStartsWith(topic, ":");
                            if (cond10 === true) {
                              sliced10 = globalThis.Predef.stringDrop(topic, 1);
                              return runtime.safeCall(globalThis.Predef.MatchResult([
                                sliced10
                              ]))
                            } else {
                              cond11 = globalThis.Predef.stringStartsWith(topic, "<");
                              if (cond11 === true) {
                                sliced11 = globalThis.Predef.stringDrop(topic, 1);
                                return runtime.safeCall(globalThis.Predef.MatchResult([
                                  sliced11
                                ]))
                              } else {
                                cond12 = globalThis.Predef.stringStartsWith(topic, "=");
                                if (cond12 === true) {
                                  sliced12 = globalThis.Predef.stringDrop(topic, 1);
                                  return runtime.safeCall(globalThis.Predef.MatchResult([
                                    sliced12
                                  ]))
                                } else {
                                  cond13 = globalThis.Predef.stringStartsWith(topic, ">");
                                  if (cond13 === true) {
                                    sliced13 = globalThis.Predef.stringDrop(topic, 1);
                                    return runtime.safeCall(globalThis.Predef.MatchResult([
                                      sliced13
                                    ]))
                                  } else {
                                    cond14 = globalThis.Predef.stringStartsWith(topic, "?");
                                    if (cond14 === true) {
                                      sliced14 = globalThis.Predef.stringDrop(topic, 1);
                                      return runtime.safeCall(globalThis.Predef.MatchResult([
                                        sliced14
                                      ]))
                                    } else {
                                      cond15 = globalThis.Predef.stringStartsWith(topic, "@");
                                      if (cond15 === true) {
                                        sliced15 = globalThis.Predef.stringDrop(topic, 1);
                                        return runtime.safeCall(globalThis.Predef.MatchResult([
                                          sliced15
                                        ]))
                                      } else {
                                        cond16 = globalThis.Predef.stringStartsWith(topic, "\\");
                                        if (cond16 === true) {
                                          sliced16 = globalThis.Predef.stringDrop(topic, 1);
                                          return runtime.safeCall(globalThis.Predef.MatchResult([
                                            sliced16
                                          ]))
                                        } else {
                                          cond17 = globalThis.Predef.stringStartsWith(topic, "^");
                                          if (cond17 === true) {
                                            sliced17 = globalThis.Predef.stringDrop(topic, 1);
                                            return runtime.safeCall(globalThis.Predef.MatchResult([
                                              sliced17
                                            ]))
                                          } else {
                                            cond18 = globalThis.Predef.stringStartsWith(topic, "|");
                                            if (cond18 === true) {
                                              sliced18 = globalThis.Predef.stringDrop(topic, 1);
                                              return runtime.safeCall(globalThis.Predef.MatchResult([
                                                sliced18
                                              ]))
                                            } else {
                                              cond19 = globalThis.Predef.stringStartsWith(topic, "~");
                                              if (cond19 === true) {
                                                sliced19 = globalThis.Predef.stringDrop(topic, 1);
                                                return runtime.safeCall(globalThis.Predef.MatchResult([
                                                  sliced19
                                                ]))
                                              } else {
                                                cond20 = globalThis.Predef.stringStartsWith(topic, ".");
                                                if (cond20 === true) {
                                                  sliced20 = globalThis.Predef.stringDrop(topic, 1);
                                                  return runtime.safeCall(globalThis.Predef.MatchResult([
                                                    sliced20
                                                  ]))
                                                } else {
                                                  return runtime.safeCall(globalThis.Predef.MatchFailure())
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      toString() { return "Operator"; }
    };
    this.Operator = new Operator$class;
    this.Operator.class = Operator$class;
    const Bracket$class = class Bracket {
      constructor() {}
      unapply(scrut) {
        if (scrut === "(") {
          return runtime.safeCall(globalThis.Predef.MatchResult([]))
        } else if (scrut === ")") {
          return runtime.safeCall(globalThis.Predef.MatchResult([]))
        } else if (scrut === "[") {
          return runtime.safeCall(globalThis.Predef.MatchResult([]))
        } else if (scrut === "]") {
          return runtime.safeCall(globalThis.Predef.MatchResult([]))
        } else if (scrut === "{") {
          return runtime.safeCall(globalThis.Predef.MatchResult([]))
        } else if (scrut === "}") {
          return runtime.safeCall(globalThis.Predef.MatchResult([]))
        } else {
          return runtime.safeCall(globalThis.Predef.MatchFailure())
        }
      } 
      unapplyStringPrefix(topic) {
        let cond, sliced, cond1, sliced1, cond2, sliced2, cond3, sliced3, cond4, sliced4, cond5, sliced5;
        cond = globalThis.Predef.stringStartsWith(topic, "(");
        if (cond === true) {
          sliced = globalThis.Predef.stringDrop(topic, 1);
          return runtime.safeCall(globalThis.Predef.MatchResult([
            sliced
          ]))
        } else {
          cond1 = globalThis.Predef.stringStartsWith(topic, ")");
          if (cond1 === true) {
            sliced1 = globalThis.Predef.stringDrop(topic, 1);
            return runtime.safeCall(globalThis.Predef.MatchResult([
              sliced1
            ]))
          } else {
            cond2 = globalThis.Predef.stringStartsWith(topic, "[");
            if (cond2 === true) {
              sliced2 = globalThis.Predef.stringDrop(topic, 1);
              return runtime.safeCall(globalThis.Predef.MatchResult([
                sliced2
              ]))
            } else {
              cond3 = globalThis.Predef.stringStartsWith(topic, "]");
              if (cond3 === true) {
                sliced3 = globalThis.Predef.stringDrop(topic, 1);
                return runtime.safeCall(globalThis.Predef.MatchResult([
                  sliced3
                ]))
              } else {
                cond4 = globalThis.Predef.stringStartsWith(topic, "{");
                if (cond4 === true) {
                  sliced4 = globalThis.Predef.stringDrop(topic, 1);
                  return runtime.safeCall(globalThis.Predef.MatchResult([
                    sliced4
                  ]))
                } else {
                  cond5 = globalThis.Predef.stringStartsWith(topic, "}");
                  if (cond5 === true) {
                    sliced5 = globalThis.Predef.stringDrop(topic, 1);
                    return runtime.safeCall(globalThis.Predef.MatchResult([
                      sliced5
                    ]))
                  } else {
                    return runtime.safeCall(globalThis.Predef.MatchFailure())
                  }
                }
              }
            }
          }
        }
      }
      toString() { return "Bracket"; }
    };
    this.Bracket = new Bracket$class;
    this.Bracket.class = Bracket$class;
    const IdentifierQuote$class = class IdentifierQuote {
      constructor() {}
      unapply(scrut) {
        if (scrut === "'") {
          return runtime.safeCall(globalThis.Predef.MatchResult([]))
        } else if (scrut === "`") {
          return runtime.safeCall(globalThis.Predef.MatchResult([]))
        } else {
          return runtime.safeCall(globalThis.Predef.MatchFailure())
        }
      } 
      unapplyStringPrefix(topic) {
        let cond, sliced, cond1, sliced1;
        cond = globalThis.Predef.stringStartsWith(topic, "'");
        if (cond === true) {
          sliced = globalThis.Predef.stringDrop(topic, 1);
          return runtime.safeCall(globalThis.Predef.MatchResult([
            sliced
          ]))
        } else {
          cond1 = globalThis.Predef.stringStartsWith(topic, "`");
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
      toString() { return "IdentifierQuote"; }
    };
    this.IdentifierQuote = new IdentifierQuote$class;
    this.IdentifierQuote.class = IdentifierQuote$class;
  }
  static lex(str) {
    let number, hex, identifier, digits, char1, scanHexDigits, whitespace, scan, string, escape, take, operator, comment;
    char1 = function char(idx) {
      let scrut, tmp;
      scrut = idx < str.length;
      if (scrut === true) {
        tmp = runtime.safeCall(str.charAt(idx));
        return Option.Some(tmp)
      } else {
        return Option.None
      }
    };
    take = function take(pred, idx, acc) {
      let scrut, param0, ch, scrut1, tmp, tmp1, tmp2;
      tmp3: while (true) {
        scrut = char1(idx);
        if (scrut instanceof Option.Some.class) {
          param0 = scrut.value;
          ch = param0;
          scrut1 = runtime.safeCall(pred(ch));
          if (scrut1 === true) {
            tmp = idx + 1;
            idx = tmp;
            tmp1 = acc + ch;
            acc = tmp1;
            tmp2 = runtime.Unit;
            continue tmp3;
          } else {
            tmp2 = [
              idx,
              acc
            ];
          }
        } else {
          tmp2 = [
            idx,
            acc
          ];
        }
        break;
      }
      return tmp2
    };
    whitespace = function whitespace(idx) {
      let scrut, param0, matchResult, tmp, tmp1;
      tmp2: while (true) {
        scrut = char1(idx);
        if (scrut instanceof Option.Some.class) {
          param0 = scrut.value;
          matchResult = runtime.safeCall(Char.Whitespace.unapply(param0));
          if (matchResult instanceof globalThis.Predef.MatchResult.class) {
            tmp = idx + 1;
            idx = tmp;
            tmp1 = runtime.Unit;
            continue tmp2;
          } else {
            tmp1 = idx;
          }
        } else {
          tmp1 = idx;
        }
        break;
      }
      return tmp1
    };
    digits = function digits(idx, acc) {
      let scrut, param0, ch, matchResult, tmp, tmp1, tmp2;
      tmp3: while (true) {
        scrut = char1(idx);
        if (scrut instanceof Option.Some.class) {
          param0 = scrut.value;
          matchResult = runtime.safeCall(Char.Digit.unapply(param0));
          if (matchResult instanceof globalThis.Predef.MatchResult.class) {
            ch = param0;
            tmp = idx + 1;
            idx = tmp;
            tmp1 = acc + ch;
            acc = tmp1;
            tmp2 = runtime.Unit;
            continue tmp3;
          } else {
            tmp2 = [
              idx,
              acc
            ];
          }
        } else {
          tmp2 = [
            idx,
            acc
          ];
        }
        break;
      }
      return tmp2
    };
    hex = function hex(idx, acc) {
      let scrut, param0, ch, matchResult, tmp, tmp1, tmp2;
      tmp3: while (true) {
        scrut = char1(idx);
        if (scrut instanceof Option.Some.class) {
          param0 = scrut.value;
          matchResult = runtime.safeCall(Char.Digit.unapply(param0));
          if (matchResult instanceof globalThis.Predef.MatchResult.class) {
            ch = param0;
            tmp = idx + 1;
            idx = tmp;
            tmp1 = acc + ch;
            acc = tmp1;
            tmp2 = runtime.Unit;
            continue tmp3;
          } else {
            tmp2 = [
              idx,
              acc
            ];
          }
        } else {
          tmp2 = [
            idx,
            acc
          ];
        }
        break;
      }
      return tmp2
    };
    identifier = function identifier(idx, acc) {
      let scrut, param0, ch, matchResult, tmp, tmp1, tmp2, tmp3, tmp4;
      tmp5: while (true) {
        scrut = char1(idx);
        if (scrut instanceof Option.Some.class) {
          param0 = scrut.value;
          matchResult = runtime.safeCall(Lexer.IdentifierBody.unapply(param0));
          if (matchResult instanceof globalThis.Predef.MatchResult.class) {
            ch = param0;
            tmp = idx + 1;
            idx = tmp;
            tmp1 = acc + ch;
            acc = tmp1;
            tmp2 = runtime.Unit;
            continue tmp5;
          } else {
            if (acc === "true") {
              tmp3 = Token.boolean("true");
            } else if (acc === "false") {
              tmp3 = Token.boolean("false");
            } else {
              tmp3 = Token.Identifier(acc, false);
            }
            tmp2 = Predef.tuple(idx, tmp3);
          }
        } else {
          if (acc === "true") {
            tmp4 = Token.boolean("true");
          } else if (acc === "false") {
            tmp4 = Token.boolean("false");
          } else {
            tmp4 = Token.Identifier(acc, false);
          }
          tmp2 = Predef.tuple(idx, tmp4);
        }
        break;
      }
      return tmp2
    };
    operator = function operator(idx, acc) {
      let scrut, param0, ch, matchResult, tmp, tmp1, tmp2, tmp3, tmp4;
      tmp5: while (true) {
        scrut = char1(idx);
        if (scrut instanceof Option.Some.class) {
          param0 = scrut.value;
          matchResult = runtime.safeCall(Lexer.Operator.unapply(param0));
          if (matchResult instanceof globalThis.Predef.MatchResult.class) {
            ch = param0;
            tmp = idx + 1;
            idx = tmp;
            tmp1 = acc + ch;
            acc = tmp1;
            tmp2 = runtime.Unit;
            continue tmp5;
          } else {
            tmp3 = Token.Identifier(acc, true);
            tmp2 = [
              idx,
              tmp3
            ];
          }
        } else {
          tmp4 = Token.Identifier(acc, true);
          tmp2 = [
            idx,
            tmp4
          ];
        }
        break;
      }
      return tmp2
    };
    comment = function comment(idx) {
      let content, scrut, param0, terminated, scrut1, param01, ch, scrut2, param02, scrut3, param03, ch1, scrut4, tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17;
      content = "";
      scrut = char1(idx);
      if (scrut instanceof Option.Some.class) {
        param0 = scrut.value;
        if (param0 === "/") {
          tmp = idx + 1;
          idx = tmp;
          tmp18: while (true) {
            scrut3 = char1(idx);
            if (scrut3 instanceof Option.Some.class) {
              param03 = scrut3.value;
              ch1 = param03;
              scrut4 = ch1 !== "\n";
              if (scrut4 === true) {
                tmp1 = idx + 1;
                idx = tmp1;
                tmp2 = content + ch1;
                content = tmp2;
                tmp3 = runtime.Unit;
                continue tmp18;
              } else {
                tmp4 = Token.Comment(content);
                tmp3 = [
                  idx,
                  tmp4
                ];
              }
            } else {
              tmp5 = Token.Comment(content);
              tmp3 = [
                idx,
                tmp5
              ];
            }
            break;
          }
          return tmp3
        } else if (param0 === "*") {
          terminated = false;
          tmp6 = idx + 1;
          idx = tmp6;
          tmp19: while (true) {
            if (terminated === false) {
              scrut1 = char1(idx);
              if (scrut1 instanceof Option.Some.class) {
                param01 = scrut1.value;
                if (param01 === "*") {
                  tmp7 = idx + 1;
                  scrut2 = char1(tmp7);
                  if (scrut2 instanceof Option.Some.class) {
                    param02 = scrut2.value;
                    if (param02 === "/") {
                      tmp8 = idx + 2;
                      idx = tmp8;
                      terminated = true;
                      tmp9 = runtime.Unit;
                      continue tmp19;
                    } else {
                      ch = param01;
                      tmp10 = idx + 1;
                      idx = tmp10;
                      tmp11 = content + ch;
                      content = tmp11;
                      tmp9 = runtime.Unit;
                    }
                  } else {
                    ch = param01;
                    tmp12 = idx + 1;
                    idx = tmp12;
                    tmp13 = content + ch;
                    content = tmp13;
                    tmp9 = runtime.Unit;
                  }
                } else {
                  ch = param01;
                  tmp14 = idx + 1;
                  idx = tmp14;
                  tmp15 = content + ch;
                  content = tmp15;
                  tmp9 = runtime.Unit;
                }
              } else {
                if (terminated === true) {
                  tmp16 = Token.Comment(content);
                  tmp17 = [
                    idx,
                    tmp16
                  ];
                } else {
                  tmp17 = [
                    idx,
                    Token.Error
                  ];
                }
                tmp9 = tmp17;
              }
            } else {
              throw new globalThis.Error("match error");
            }
            break;
          }
          return tmp9
        } else {
          return operator(idx, "/")
        }
      } else {
        return operator(idx, "/")
      }
    };
    scanHexDigits = function scanHexDigits(idx, lim, acc, cnt) {
      let scrut, param0, ch, matchResult, scrut1, tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6;
      scrut = char1(idx);
      if (scrut instanceof Option.Some.class) {
        param0 = scrut.value;
        matchResult = runtime.safeCall(Char.HexDigit.unapply(param0));
        if (matchResult instanceof globalThis.Predef.MatchResult.class) {
          ch = param0;
          scrut1 = cnt < lim;
          if (scrut1 === true) {
            tmp = idx + 1;
            tmp1 = acc * 16;
            tmp2 = globalThis.parseInt(ch, 16);
            tmp3 = tmp1 + tmp2;
            tmp4 = cnt + 1;
            return scanHexDigits(tmp, lim, tmp3, tmp4)
          } else {
            tmp5 = idx + 1;
            tmp6 = cnt + 1;
            return scanHexDigits(tmp5, lim, acc, tmp6)
          }
        } else {
          return [
            idx,
            acc,
            cnt
          ]
        }
      } else {
        return [
          idx,
          acc,
          cnt
        ]
      }
    };
    escape = function escape(idx) {
      let scrut, param0, ch, scrut1, first2, first1, first0, idx1, cp, cnt, scrut2, param01, scrut3, first21, first11, first01, idx2, cp1, cnt1, idx3, scrut4, param02, scrut5, first22, first12, first02, idx4, cp2, cnt2, tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20, tmp21, tmp22, tmp23, tmp24, tmp25, tmp26, tmp27, tmp28, tmp29, tmp30, tmp31;
      scrut = char1(idx);
      if (scrut instanceof Option.Some.class) {
        param0 = scrut.value;
        if (param0 === "n") {
          tmp = idx + 1;
          tmp1 = Option.Some("\n");
          return [
            tmp,
            tmp1
          ]
        } else if (param0 === "r") {
          tmp2 = idx + 1;
          tmp3 = Option.Some("\r");
          return [
            tmp2,
            tmp3
          ]
        } else if (param0 === "t") {
          tmp4 = idx + 1;
          tmp5 = Option.Some("\t");
          return [
            tmp4,
            tmp5
          ]
        } else if (param0 === "0") {
          tmp6 = idx + 1;
          tmp7 = Option.Some("\u0000");
          return [
            tmp6,
            tmp7
          ]
        } else if (param0 === "b") {
          tmp8 = idx + 1;
          tmp9 = Option.Some("\b");
          return [
            tmp8,
            tmp9
          ]
        } else if (param0 === "f") {
          tmp10 = idx + 1;
          tmp11 = Option.Some("\f");
          return [
            tmp10,
            tmp11
          ]
        } else if (param0 === "\"") {
          tmp12 = idx + 1;
          tmp13 = Option.Some("\"");
          return [
            tmp12,
            tmp13
          ]
        } else if (param0 === "\\") {
          tmp14 = idx + 1;
          tmp15 = Option.Some("\\");
          return [
            tmp14,
            tmp15
          ]
        } else if (param0 === "x") {
          tmp16 = idx + 1;
          scrut5 = scanHexDigits(tmp16, 2, 0, 0);
          if (globalThis.Array.isArray(scrut5) && scrut5.length === 3) {
            first02 = scrut5[0];
            first12 = scrut5[1];
            first22 = scrut5[2];
            idx4 = first02;
            cp2 = first12;
            cnt2 = first22;
            if (cnt2 === 0) {
              tmp17 = Option.None;
            } else {
              tmp18 = runtime.safeCall(globalThis.String.fromCodePoint(cp2));
              tmp17 = Option.Some(tmp18);
            }
            return Predef.tuple(idx4, tmp17)
          } else {
            throw new globalThis.Error("match error");
          }
        } else if (param0 === "u") {
          tmp19 = idx + 1;
          scrut2 = char1(tmp19);
          if (scrut2 instanceof Option.Some.class) {
            param01 = scrut2.value;
            if (param01 === "{") {
              tmp20 = idx + 2;
              scrut3 = scanHexDigits(tmp20, 6, 0, 0);
              if (globalThis.Array.isArray(scrut3) && scrut3.length === 3) {
                first01 = scrut3[0];
                first11 = scrut3[1];
                first21 = scrut3[2];
                idx2 = first01;
                cp1 = first11;
                cnt1 = first21;
                scrut4 = char1(idx2);
                if (scrut4 instanceof Option.Some.class) {
                  param02 = scrut4.value;
                  if (param02 === "}") {
                    tmp21 = idx2 + 1;
                  } else {
                    tmp21 = idx2;
                  }
                } else {
                  tmp21 = idx2;
                }
                idx3 = tmp21;
                if (cnt1 === 0) {
                  tmp22 = Option.None;
                } else {
                  tmp23 = runtime.safeCall(globalThis.String.fromCodePoint(cp1));
                  tmp22 = Option.Some(tmp23);
                }
                return Predef.tuple(idx3, tmp22)
              } else {
                throw new globalThis.Error("match error");
              }
            } else {
              tmp24 = idx + 1;
              scrut1 = scanHexDigits(tmp24, 4, 0, 0);
              if (globalThis.Array.isArray(scrut1) && scrut1.length === 3) {
                first0 = scrut1[0];
                first1 = scrut1[1];
                first2 = scrut1[2];
                idx1 = first0;
                cp = first1;
                cnt = first2;
                if (cnt === 0) {
                  tmp25 = Option.None;
                } else {
                  tmp26 = runtime.safeCall(globalThis.String.fromCodePoint(cp));
                  tmp25 = Option.Some(tmp26);
                }
                return Predef.tuple(idx1, tmp25)
              } else {
                throw new globalThis.Error("match error");
              }
            }
          } else {
            tmp27 = idx + 1;
            scrut1 = scanHexDigits(tmp27, 4, 0, 0);
            if (globalThis.Array.isArray(scrut1) && scrut1.length === 3) {
              first0 = scrut1[0];
              first1 = scrut1[1];
              first2 = scrut1[2];
              idx1 = first0;
              cp = first1;
              cnt = first2;
              if (cnt === 0) {
                tmp28 = Option.None;
              } else {
                tmp29 = runtime.safeCall(globalThis.String.fromCodePoint(cp));
                tmp28 = Option.Some(tmp29);
              }
              return Predef.tuple(idx1, tmp28)
            } else {
              throw new globalThis.Error("match error");
            }
          }
        } else {
          ch = param0;
          tmp30 = idx + 1;
          tmp31 = Option.Some(ch);
          return [
            tmp30,
            tmp31
          ]
        }
      } else if (scrut instanceof Option.None.class) {
        return [
          idx,
          Option.None
        ]
      } else {
        throw new globalThis.Error("match error");
      }
    };
    string = function string(idx) {
      let content, terminated, scrut, param0, ch, scrut1, first1, first0, idx$_, chOpt, param01, ch1, tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9;
      content = "";
      terminated = false;
      tmp10: while (true) {
        if (terminated === false) {
          scrut = char1(idx);
          if (scrut instanceof Option.Some.class) {
            param0 = scrut.value;
            if (param0 === "\"") {
              terminated = true;
              tmp = idx + 1;
              idx = tmp;
              tmp1 = runtime.Unit;
            } else if (param0 === "\\") {
              tmp2 = idx + 1;
              scrut1 = escape(tmp2);
              if (globalThis.Array.isArray(scrut1) && scrut1.length === 2) {
                first0 = scrut1[0];
                first1 = scrut1[1];
                idx$_ = first0;
                chOpt = first1;
                idx = idx$_;
                if (chOpt instanceof Option.Some.class) {
                  param01 = chOpt.value;
                  ch1 = param01;
                  tmp3 = content + ch1;
                  content = tmp3;
                  tmp4 = runtime.Unit;
                } else {
                  tmp4 = runtime.Unit;
                }
                tmp5 = tmp4;
              } else {
                throw new globalThis.Error("match error");
              }
              tmp1 = tmp5;
            } else {
              ch = param0;
              tmp6 = idx + 1;
              idx = tmp6;
              tmp7 = content + ch;
              content = tmp7;
              tmp1 = runtime.Unit;
            }
          } else if (scrut instanceof Option.None.class) {
            terminated = true;
            tmp1 = runtime.Unit;
          } else {
            tmp1 = runtime.Unit;
          }
          tmp8 = tmp1;
          continue tmp10;
        } else {
          tmp8 = runtime.Unit;
        }
        break;
      }
      tmp9 = Token.Literal(Token.LiteralKind.String, content);
      return [
        idx,
        tmp9
      ]
    };
    number = function number(idx, head) {
      let scrut, first1, first0, idx$_, integer, scrut1, param0, scrut2, first11, first01, idx$_$_, fraction, scrut3, param01, scrut4, first12, first02, idx$_1, integer1, scrut5, first13, first03, idx$_2, ds, scrut6, first14, first04, idx$_3, xs, scrut7, first15, first05, idx$_4, os, scrut8, first16, first06, idx$_5, bs, tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20, tmp21, tmp22, tmp23, tmp24, tmp25, tmp26, tmp27, tmp28, tmp29, tmp30, tmp31, tmp32, tmp33, tmp34, tmp35, tmp36, tmp37, tmp38, tmp39, tmp40, tmp41, tmp42, tmp43, tmp44, tmp45, tmp46, tmp47, tmp48, tmp49, tmp50, tmp51, tmp52, tmp53, tmp54, tmp55, tmp56, tmp57, tmp58, tmp59, tmp60, tmp61, tmp62, tmp63, tmp64, tmp65, tmp66, tmp67, tmp68, tmp69;
      if (head === "0") {
        scrut3 = char1(idx);
        if (scrut3 instanceof Option.None.class) {
          tmp = Token.integer("0");
          return [
            idx,
            tmp
          ]
        } else if (scrut3 instanceof Option.Some.class) {
          param01 = scrut3.value;
          if (param01 === "b") {
            tmp1 = (x) => {
              let matchResult;
              matchResult = runtime.safeCall(Char.BinDigit.unapply(x));
              if (matchResult instanceof globalThis.Predef.MatchResult.class) {
                return true
              } else {
                return false
              }
            };
            tmp2 = idx + 1;
            scrut8 = take(tmp1, tmp2, "");
            if (globalThis.Array.isArray(scrut8) && scrut8.length === 2) {
              first06 = scrut8[0];
              first16 = scrut8[1];
              idx$_5 = first06;
              bs = first16;
              tmp3 = Str.concat2("0b", bs);
              tmp4 = Token.integer(tmp3);
              return [
                idx$_5,
                tmp4
              ]
            } else {
              scrut4 = digits(idx, head);
              if (globalThis.Array.isArray(scrut4) && scrut4.length === 2) {
                first02 = scrut4[0];
                first12 = scrut4[1];
                idx$_1 = first02;
                integer1 = first12;
                tmp5 = Token.integer(integer1);
                return [
                  idx$_1,
                  tmp5
                ]
              } else {
                scrut = digits(idx, head);
                if (globalThis.Array.isArray(scrut) && scrut.length === 2) {
                  first0 = scrut[0];
                  first1 = scrut[1];
                  idx$_ = first0;
                  integer = first1;
                  scrut1 = char1(idx$_);
                  if (scrut1 instanceof Option.Some.class) {
                    param0 = scrut1.value;
                    if (param0 === ".") {
                      tmp6 = idx$_ + 1;
                      scrut2 = digits(tmp6, "");
                      if (globalThis.Array.isArray(scrut2) && scrut2.length === 2) {
                        first01 = scrut2[0];
                        first11 = scrut2[1];
                        idx$_$_ = first01;
                        fraction = first11;
                        tmp7 = Str.concat2(integer, ".");
                        tmp8 = Str.concat2(tmp7, fraction);
                        tmp9 = Token.decimal(tmp8);
                        return [
                          idx$_$_,
                          tmp9
                        ]
                      } else {
                        tmp10 = Token.integer(integer);
                        return [
                          idx$_,
                          tmp10
                        ]
                      }
                    } else {
                      tmp11 = Token.integer(integer);
                      return [
                        idx$_,
                        tmp11
                      ]
                    }
                  } else {
                    tmp12 = Token.integer(integer);
                    return [
                      idx$_,
                      tmp12
                    ]
                  }
                } else {
                  throw new globalThis.Error("match error");
                }
              }
            }
          } else if (param01 === "o") {
            tmp13 = (x) => {
              let matchResult;
              matchResult = runtime.safeCall(Char.OctDigit.unapply(x));
              if (matchResult instanceof globalThis.Predef.MatchResult.class) {
                return true
              } else {
                return false
              }
            };
            tmp14 = idx + 1;
            scrut7 = take(tmp13, tmp14, "");
            if (globalThis.Array.isArray(scrut7) && scrut7.length === 2) {
              first05 = scrut7[0];
              first15 = scrut7[1];
              idx$_4 = first05;
              os = first15;
              tmp15 = Str.concat2("0o", os);
              tmp16 = Token.integer(tmp15);
              return [
                idx$_4,
                tmp16
              ]
            } else {
              scrut4 = digits(idx, head);
              if (globalThis.Array.isArray(scrut4) && scrut4.length === 2) {
                first02 = scrut4[0];
                first12 = scrut4[1];
                idx$_1 = first02;
                integer1 = first12;
                tmp17 = Token.integer(integer1);
                return [
                  idx$_1,
                  tmp17
                ]
              } else {
                scrut = digits(idx, head);
                if (globalThis.Array.isArray(scrut) && scrut.length === 2) {
                  first0 = scrut[0];
                  first1 = scrut[1];
                  idx$_ = first0;
                  integer = first1;
                  scrut1 = char1(idx$_);
                  if (scrut1 instanceof Option.Some.class) {
                    param0 = scrut1.value;
                    if (param0 === ".") {
                      tmp18 = idx$_ + 1;
                      scrut2 = digits(tmp18, "");
                      if (globalThis.Array.isArray(scrut2) && scrut2.length === 2) {
                        first01 = scrut2[0];
                        first11 = scrut2[1];
                        idx$_$_ = first01;
                        fraction = first11;
                        tmp19 = Str.concat2(integer, ".");
                        tmp20 = Str.concat2(tmp19, fraction);
                        tmp21 = Token.decimal(tmp20);
                        return [
                          idx$_$_,
                          tmp21
                        ]
                      } else {
                        tmp22 = Token.integer(integer);
                        return [
                          idx$_,
                          tmp22
                        ]
                      }
                    } else {
                      tmp23 = Token.integer(integer);
                      return [
                        idx$_,
                        tmp23
                      ]
                    }
                  } else {
                    tmp24 = Token.integer(integer);
                    return [
                      idx$_,
                      tmp24
                    ]
                  }
                } else {
                  throw new globalThis.Error("match error");
                }
              }
            }
          } else if (param01 === "x") {
            tmp25 = (x) => {
              let matchResult;
              matchResult = runtime.safeCall(Char.HexDigit.unapply(x));
              if (matchResult instanceof globalThis.Predef.MatchResult.class) {
                return true
              } else {
                return false
              }
            };
            tmp26 = idx + 1;
            scrut6 = take(tmp25, tmp26, "");
            if (globalThis.Array.isArray(scrut6) && scrut6.length === 2) {
              first04 = scrut6[0];
              first14 = scrut6[1];
              idx$_3 = first04;
              xs = first14;
              tmp27 = Str.concat2("0x", xs);
              tmp28 = Token.integer(tmp27);
              return [
                idx$_3,
                tmp28
              ]
            } else {
              scrut4 = digits(idx, head);
              if (globalThis.Array.isArray(scrut4) && scrut4.length === 2) {
                first02 = scrut4[0];
                first12 = scrut4[1];
                idx$_1 = first02;
                integer1 = first12;
                tmp29 = Token.integer(integer1);
                return [
                  idx$_1,
                  tmp29
                ]
              } else {
                scrut = digits(idx, head);
                if (globalThis.Array.isArray(scrut) && scrut.length === 2) {
                  first0 = scrut[0];
                  first1 = scrut[1];
                  idx$_ = first0;
                  integer = first1;
                  scrut1 = char1(idx$_);
                  if (scrut1 instanceof Option.Some.class) {
                    param0 = scrut1.value;
                    if (param0 === ".") {
                      tmp30 = idx$_ + 1;
                      scrut2 = digits(tmp30, "");
                      if (globalThis.Array.isArray(scrut2) && scrut2.length === 2) {
                        first01 = scrut2[0];
                        first11 = scrut2[1];
                        idx$_$_ = first01;
                        fraction = first11;
                        tmp31 = Str.concat2(integer, ".");
                        tmp32 = Str.concat2(tmp31, fraction);
                        tmp33 = Token.decimal(tmp32);
                        return [
                          idx$_$_,
                          tmp33
                        ]
                      } else {
                        tmp34 = Token.integer(integer);
                        return [
                          idx$_,
                          tmp34
                        ]
                      }
                    } else {
                      tmp35 = Token.integer(integer);
                      return [
                        idx$_,
                        tmp35
                      ]
                    }
                  } else {
                    tmp36 = Token.integer(integer);
                    return [
                      idx$_,
                      tmp36
                    ]
                  }
                } else {
                  throw new globalThis.Error("match error");
                }
              }
            }
          } else if (param01 === ".") {
            tmp37 = idx + 1;
            scrut5 = digits(tmp37);
            if (globalThis.Array.isArray(scrut5) && scrut5.length === 2) {
              first03 = scrut5[0];
              first13 = scrut5[1];
              idx$_2 = first03;
              ds = first13;
              tmp38 = Str.concat2("0.", ds);
              tmp39 = Token.decimal(tmp38);
              return [
                idx$_2,
                tmp39
              ]
            } else {
              scrut4 = digits(idx, head);
              if (globalThis.Array.isArray(scrut4) && scrut4.length === 2) {
                first02 = scrut4[0];
                first12 = scrut4[1];
                idx$_1 = first02;
                integer1 = first12;
                tmp40 = Token.integer(integer1);
                return [
                  idx$_1,
                  tmp40
                ]
              } else {
                scrut = digits(idx, head);
                if (globalThis.Array.isArray(scrut) && scrut.length === 2) {
                  first0 = scrut[0];
                  first1 = scrut[1];
                  idx$_ = first0;
                  integer = first1;
                  scrut1 = char1(idx$_);
                  if (scrut1 instanceof Option.Some.class) {
                    param0 = scrut1.value;
                    if (param0 === ".") {
                      tmp41 = idx$_ + 1;
                      scrut2 = digits(tmp41, "");
                      if (globalThis.Array.isArray(scrut2) && scrut2.length === 2) {
                        first01 = scrut2[0];
                        first11 = scrut2[1];
                        idx$_$_ = first01;
                        fraction = first11;
                        tmp42 = Str.concat2(integer, ".");
                        tmp43 = Str.concat2(tmp42, fraction);
                        tmp44 = Token.decimal(tmp43);
                        return [
                          idx$_$_,
                          tmp44
                        ]
                      } else {
                        tmp45 = Token.integer(integer);
                        return [
                          idx$_,
                          tmp45
                        ]
                      }
                    } else {
                      tmp46 = Token.integer(integer);
                      return [
                        idx$_,
                        tmp46
                      ]
                    }
                  } else {
                    tmp47 = Token.integer(integer);
                    return [
                      idx$_,
                      tmp47
                    ]
                  }
                } else {
                  throw new globalThis.Error("match error");
                }
              }
            }
          } else {
            scrut4 = digits(idx, head);
            if (globalThis.Array.isArray(scrut4) && scrut4.length === 2) {
              first02 = scrut4[0];
              first12 = scrut4[1];
              idx$_1 = first02;
              integer1 = first12;
              tmp48 = Token.integer(integer1);
              return [
                idx$_1,
                tmp48
              ]
            } else {
              scrut = digits(idx, head);
              if (globalThis.Array.isArray(scrut) && scrut.length === 2) {
                first0 = scrut[0];
                first1 = scrut[1];
                idx$_ = first0;
                integer = first1;
                scrut1 = char1(idx$_);
                if (scrut1 instanceof Option.Some.class) {
                  param0 = scrut1.value;
                  if (param0 === ".") {
                    tmp49 = idx$_ + 1;
                    scrut2 = digits(tmp49, "");
                    if (globalThis.Array.isArray(scrut2) && scrut2.length === 2) {
                      first01 = scrut2[0];
                      first11 = scrut2[1];
                      idx$_$_ = first01;
                      fraction = first11;
                      tmp50 = Str.concat2(integer, ".");
                      tmp51 = Str.concat2(tmp50, fraction);
                      tmp52 = Token.decimal(tmp51);
                      return [
                        idx$_$_,
                        tmp52
                      ]
                    } else {
                      tmp53 = Token.integer(integer);
                      return [
                        idx$_,
                        tmp53
                      ]
                    }
                  } else {
                    tmp54 = Token.integer(integer);
                    return [
                      idx$_,
                      tmp54
                    ]
                  }
                } else {
                  tmp55 = Token.integer(integer);
                  return [
                    idx$_,
                    tmp55
                  ]
                }
              } else {
                throw new globalThis.Error("match error");
              }
            }
          }
        } else {
          scrut = digits(idx, head);
          if (globalThis.Array.isArray(scrut) && scrut.length === 2) {
            first0 = scrut[0];
            first1 = scrut[1];
            idx$_ = first0;
            integer = first1;
            scrut1 = char1(idx$_);
            if (scrut1 instanceof Option.Some.class) {
              param0 = scrut1.value;
              if (param0 === ".") {
                tmp56 = idx$_ + 1;
                scrut2 = digits(tmp56, "");
                if (globalThis.Array.isArray(scrut2) && scrut2.length === 2) {
                  first01 = scrut2[0];
                  first11 = scrut2[1];
                  idx$_$_ = first01;
                  fraction = first11;
                  tmp57 = Str.concat2(integer, ".");
                  tmp58 = Str.concat2(tmp57, fraction);
                  tmp59 = Token.decimal(tmp58);
                  return [
                    idx$_$_,
                    tmp59
                  ]
                } else {
                  tmp60 = Token.integer(integer);
                  return [
                    idx$_,
                    tmp60
                  ]
                }
              } else {
                tmp61 = Token.integer(integer);
                return [
                  idx$_,
                  tmp61
                ]
              }
            } else {
              tmp62 = Token.integer(integer);
              return [
                idx$_,
                tmp62
              ]
            }
          } else {
            throw new globalThis.Error("match error");
          }
        }
      } else {
        scrut = digits(idx, head);
        if (globalThis.Array.isArray(scrut) && scrut.length === 2) {
          first0 = scrut[0];
          first1 = scrut[1];
          idx$_ = first0;
          integer = first1;
          scrut1 = char1(idx$_);
          if (scrut1 instanceof Option.Some.class) {
            param0 = scrut1.value;
            if (param0 === ".") {
              tmp63 = idx$_ + 1;
              scrut2 = digits(tmp63, "");
              if (globalThis.Array.isArray(scrut2) && scrut2.length === 2) {
                first01 = scrut2[0];
                first11 = scrut2[1];
                idx$_$_ = first01;
                fraction = first11;
                tmp64 = Str.concat2(integer, ".");
                tmp65 = Str.concat2(tmp64, fraction);
                tmp66 = Token.decimal(tmp65);
                return [
                  idx$_$_,
                  tmp66
                ]
              } else {
                tmp67 = Token.integer(integer);
                return [
                  idx$_,
                  tmp67
                ]
              }
            } else {
              tmp68 = Token.integer(integer);
              return [
                idx$_,
                tmp68
              ]
            }
          } else {
            tmp69 = Token.integer(integer);
            return [
              idx$_,
              tmp69
            ]
          }
        } else {
          throw new globalThis.Error("match error");
        }
      }
    };
    scan = function scan(idx, acc) {
      let go, scrut, param0, other, quote, matchResult, scrut1, param01, ch, matchResult1, scrut2, first1, first0, idx$_, token, param02, param1, name, ch1, matchResult2, ch2, matchResult3, ch3, matchResult4, b, matchResult5, matchResult6, tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20, tmp21, tmp22, tmp23, tmp24, tmp25, tmp26, tmp27, tmp28, tmp29, tmp30, tmp31, tmp32, tmp33, tmp34;
      go = function go(idx1, tok) {
        let tmp35;
        tmp35 = Stack.Cons(tok, acc);
        return scan(idx1, tmp35)
      };
      scrut = char1(idx);
      if (scrut instanceof Option.None.class) {
        return Stack.reverse(acc)
      } else if (scrut instanceof Option.Some.class) {
        param0 = scrut.value;
        matchResult6 = runtime.safeCall(Char.Whitespace.unapply(param0));
        if (matchResult6 instanceof globalThis.Predef.MatchResult.class) {
          tmp = idx + 1;
          tmp1 = whitespace(tmp);
          return go(tmp1, Token.Space)
        } else {
          if (param0 === "\"") {
            tmp2 = idx + 1;
            tmp3 = string(tmp2);
            return go(...tmp3)
          } else {
            matchResult5 = runtime.safeCall(Lexer.Bracket.unapply(param0));
            if (matchResult5 instanceof globalThis.Predef.MatchResult.class) {
              b = param0;
              tmp4 = idx + 1;
              tmp5 = Token.Identifier(b, true);
              return go(tmp4, tmp5)
            } else {
              if (param0 === "/") {
                tmp6 = idx + 1;
                tmp7 = comment(tmp6);
                return go(...tmp7)
              } else {
                matchResult4 = runtime.safeCall(Lexer.Operator.unapply(param0));
                if (matchResult4 instanceof globalThis.Predef.MatchResult.class) {
                  ch3 = param0;
                  tmp8 = idx + 1;
                  tmp9 = operator(tmp8, ch3);
                  return go(...tmp9)
                } else {
                  matchResult3 = runtime.safeCall(Char.Digit.unapply(param0));
                  if (matchResult3 instanceof globalThis.Predef.MatchResult.class) {
                    ch2 = param0;
                    tmp10 = idx + 1;
                    tmp11 = number(tmp10, ch2);
                    return go(...tmp11)
                  } else {
                    matchResult2 = runtime.safeCall(Lexer.IdentifierStart.unapply(param0));
                    if (matchResult2 instanceof globalThis.Predef.MatchResult.class) {
                      ch1 = param0;
                      tmp12 = idx + 1;
                      tmp13 = identifier(tmp12, ch1);
                      return go(...tmp13)
                    } else {
                      matchResult = runtime.safeCall(Lexer.IdentifierQuote.unapply(param0));
                      if (matchResult instanceof globalThis.Predef.MatchResult.class) {
                        quote = param0;
                        tmp14 = idx + 1;
                        scrut1 = char1(tmp14);
                        if (scrut1 instanceof Option.Some.class) {
                          param01 = scrut1.value;
                          matchResult1 = runtime.safeCall(Lexer.IdentifierStart.unapply(param01));
                          if (matchResult1 instanceof globalThis.Predef.MatchResult.class) {
                            ch = param01;
                            tmp15 = idx + 2;
                            tmp16 = quote + ch;
                            scrut2 = identifier(tmp15, tmp16);
                            if (globalThis.Array.isArray(scrut2) && scrut2.length === 2) {
                              first0 = scrut2[0];
                              first1 = scrut2[1];
                              idx$_ = first0;
                              token = first1;
                              if (token instanceof Token.Identifier.class) {
                                param02 = token.name;
                                param1 = token.symbolic;
                                name = param02;
                                tmp17 = Token.Identifier(name, false);
                                return go(idx$_, tmp17)
                              } else {
                                tmp18 = idx + 1;
                                return go(tmp18, Token.Error)
                              }
                            } else {
                              other = param0;
                              tmp19 = Str.concat2("Unrecognized character: '", other);
                              tmp20 = Str.concat2(tmp19, "'");
                              tmp21 = Predef.print(tmp20);
                              tmp22 = idx + 1;
                              return go(tmp22, Token.Error)
                            }
                          } else {
                            other = param0;
                            tmp23 = Str.concat2("Unrecognized character: '", other);
                            tmp24 = Str.concat2(tmp23, "'");
                            tmp25 = Predef.print(tmp24);
                            tmp26 = idx + 1;
                            return go(tmp26, Token.Error)
                          }
                        } else {
                          other = param0;
                          tmp27 = Str.concat2("Unrecognized character: '", other);
                          tmp28 = Str.concat2(tmp27, "'");
                          tmp29 = Predef.print(tmp28);
                          tmp30 = idx + 1;
                          return go(tmp30, Token.Error)
                        }
                      } else {
                        other = param0;
                        tmp31 = Str.concat2("Unrecognized character: '", other);
                        tmp32 = Str.concat2(tmp31, "'");
                        tmp33 = Predef.print(tmp32);
                        tmp34 = idx + 1;
                        return go(tmp34, Token.Error)
                      }
                    }
                  }
                }
              }
            }
          }
        }
      } else {
        throw new globalThis.Error("match error");
      }
    };
    return scan(0, Stack.Nil)
  }
  static toString() { return "Lexer"; }
};
let Lexer = Lexer1; export default Lexer;
