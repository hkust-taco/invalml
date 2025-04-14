import runtime from "./../Runtime.mjs";
import Predef from "./../Predef.mjs";
import Char from "./../Char.mjs";
import Stack from "./../Stack.mjs";
import Str from "./../Str.mjs";
import Option from "./../Option.mjs";
import Iter from "./../Iter.mjs";
import Token from "./parsing/Token.mjs";
let Lexer1;
(class Lexer {
  static {
    Lexer1 = Lexer;
    this.Location = function Location(start1, end1) {
      return new Location.class(start1, end1);
    };
    this.Location.class = class Location {
      #start;
      #end;
      constructor(start, end) {
        this.#start = start;
        this.#end = end;
      }
      toString() { return "Location(" + "" + ")"; }
    };
    this.Message = function Message(description1, location1) {
      return new Message.class(description1, location1);
    };
    this.Message.class = class Message {
      #description;
      #location;
      constructor(description, location) {
        this.#description = description;
        this.#location = location;
      }
      toString() { return "Message(" + "" + ")"; }
    };
    this.Report = function Report(messages1) {
      return new Report.class(messages1);
    };
    this.Report.class = class Report {
      #messages;
      constructor(messages) {
        this.#messages = messages;
      }
      toString() { return "Report(" + "" + ")"; }
    };
    const IdentifierStart$class = class IdentifierStart {
      constructor() {}
      unapply(scrut) {
        let matchResult;
        matchResult = runtime.safeCall(Char.Letter.unapply(scrut));
        if (matchResult instanceof runtime.MatchResult.class) {
          return runtime.safeCall(runtime.MatchResult([]))
        } else {
          if (scrut === "_") {
            return runtime.safeCall(runtime.MatchResult([]))
          } else {
            return runtime.safeCall(runtime.MatchFailure())
          }
        }
      } 
      unapplyStringPrefix(topic) {
        let matchResult, arg, postfix, cond, sliced;
        matchResult = runtime.safeCall(Char.Letter.unapplyStringPrefix(topic));
        if (matchResult instanceof runtime.MatchResult.class) {
          arg = matchResult.captures;
          postfix = globalThis.Predef.tupleGet(arg, 0);
          return runtime.safeCall(runtime.MatchResult([
            postfix
          ]))
        } else {
          cond = globalThis.Predef.stringStartsWith(topic, "_");
          if (cond === true) {
            sliced = globalThis.Predef.stringDrop(topic, 1);
            return runtime.safeCall(runtime.MatchResult([
              sliced
            ]))
          } else {
            return runtime.safeCall(runtime.MatchFailure())
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
        if (matchResult instanceof runtime.MatchResult.class) {
          return runtime.safeCall(runtime.MatchResult([]))
        } else {
          matchResult1 = runtime.safeCall(Char.Digit.unapply(scrut));
          if (matchResult1 instanceof runtime.MatchResult.class) {
            return runtime.safeCall(runtime.MatchResult([]))
          } else {
            if (scrut === "_") {
              return runtime.safeCall(runtime.MatchResult([]))
            } else if (scrut === "'") {
              return runtime.safeCall(runtime.MatchResult([]))
            } else {
              return runtime.safeCall(runtime.MatchFailure())
            }
          }
        }
      } 
      unapplyStringPrefix(topic) {
        let matchResult, arg, postfix, matchResult1, arg1, postfix1, cond, sliced, cond1, sliced1;
        matchResult = runtime.safeCall(Char.Letter.unapplyStringPrefix(topic));
        if (matchResult instanceof runtime.MatchResult.class) {
          arg = matchResult.captures;
          postfix = globalThis.Predef.tupleGet(arg, 0);
          return runtime.safeCall(runtime.MatchResult([
            postfix
          ]))
        } else {
          matchResult1 = runtime.safeCall(Char.Digit.unapplyStringPrefix(topic));
          if (matchResult1 instanceof runtime.MatchResult.class) {
            arg1 = matchResult1.captures;
            postfix1 = globalThis.Predef.tupleGet(arg1, 0);
            return runtime.safeCall(runtime.MatchResult([
              postfix1
            ]))
          } else {
            cond = globalThis.Predef.stringStartsWith(topic, "_");
            if (cond === true) {
              sliced = globalThis.Predef.stringDrop(topic, 1);
              return runtime.safeCall(runtime.MatchResult([
                sliced
              ]))
            } else {
              cond1 = globalThis.Predef.stringStartsWith(topic, "'");
              if (cond1 === true) {
                sliced1 = globalThis.Predef.stringDrop(topic, 1);
                return runtime.safeCall(runtime.MatchResult([
                  sliced1
                ]))
              } else {
                return runtime.safeCall(runtime.MatchFailure())
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
          return runtime.safeCall(runtime.MatchResult([]))
        } else {
          if (scrut === ";") {
            return runtime.safeCall(runtime.MatchResult([]))
          } else if (scrut === "!") {
            return runtime.safeCall(runtime.MatchResult([]))
          } else if (scrut === "#") {
            return runtime.safeCall(runtime.MatchResult([]))
          } else if (scrut === "%") {
            return runtime.safeCall(runtime.MatchResult([]))
          } else if (scrut === "&") {
            return runtime.safeCall(runtime.MatchResult([]))
          } else if (scrut === "*") {
            return runtime.safeCall(runtime.MatchResult([]))
          } else if (scrut === "+") {
            return runtime.safeCall(runtime.MatchResult([]))
          } else if (scrut === "-") {
            return runtime.safeCall(runtime.MatchResult([]))
          } else if (scrut === "/") {
            return runtime.safeCall(runtime.MatchResult([]))
          } else if (scrut === ":") {
            return runtime.safeCall(runtime.MatchResult([]))
          } else {
            if (scrut === "<") {
              return runtime.safeCall(runtime.MatchResult([]))
            } else if (scrut === "=") {
              return runtime.safeCall(runtime.MatchResult([]))
            } else if (scrut === ">") {
              return runtime.safeCall(runtime.MatchResult([]))
            } else if (scrut === "?") {
              return runtime.safeCall(runtime.MatchResult([]))
            } else if (scrut === "@") {
              return runtime.safeCall(runtime.MatchResult([]))
            } else if (scrut === "\\") {
              return runtime.safeCall(runtime.MatchResult([]))
            } else if (scrut === "^") {
              return runtime.safeCall(runtime.MatchResult([]))
            } else if (scrut === "|") {
              return runtime.safeCall(runtime.MatchResult([]))
            } else if (scrut === "~") {
              return runtime.safeCall(runtime.MatchResult([]))
            } else if (scrut === ".") {
              return runtime.safeCall(runtime.MatchResult([]))
            } else {
              return runtime.safeCall(runtime.MatchFailure())
            }
          }
        }
      } 
      unapplyStringPrefix(topic) {
        let cond, sliced, cond1, sliced1, cond2, sliced2, cond3, sliced3, cond4, sliced4, cond5, sliced5, cond6, sliced6, cond7, sliced7, cond8, sliced8, cond9, sliced9, cond10, sliced10, cond11, sliced11, cond12, sliced12, cond13, sliced13, cond14, sliced14, cond15, sliced15, cond16, sliced16, cond17, sliced17, cond18, sliced18, cond19, sliced19, cond20, sliced20;
        cond = globalThis.Predef.stringStartsWith(topic, ",");
        if (cond === true) {
          sliced = globalThis.Predef.stringDrop(topic, 1);
          return runtime.safeCall(runtime.MatchResult([
            sliced
          ]))
        } else {
          cond1 = globalThis.Predef.stringStartsWith(topic, ";");
          if (cond1 === true) {
            sliced1 = globalThis.Predef.stringDrop(topic, 1);
            return runtime.safeCall(runtime.MatchResult([
              sliced1
            ]))
          } else {
            cond2 = globalThis.Predef.stringStartsWith(topic, "!");
            if (cond2 === true) {
              sliced2 = globalThis.Predef.stringDrop(topic, 1);
              return runtime.safeCall(runtime.MatchResult([
                sliced2
              ]))
            } else {
              cond3 = globalThis.Predef.stringStartsWith(topic, "#");
              if (cond3 === true) {
                sliced3 = globalThis.Predef.stringDrop(topic, 1);
                return runtime.safeCall(runtime.MatchResult([
                  sliced3
                ]))
              } else {
                cond4 = globalThis.Predef.stringStartsWith(topic, "%");
                if (cond4 === true) {
                  sliced4 = globalThis.Predef.stringDrop(topic, 1);
                  return runtime.safeCall(runtime.MatchResult([
                    sliced4
                  ]))
                } else {
                  cond5 = globalThis.Predef.stringStartsWith(topic, "&");
                  if (cond5 === true) {
                    sliced5 = globalThis.Predef.stringDrop(topic, 1);
                    return runtime.safeCall(runtime.MatchResult([
                      sliced5
                    ]))
                  } else {
                    cond6 = globalThis.Predef.stringStartsWith(topic, "*");
                    if (cond6 === true) {
                      sliced6 = globalThis.Predef.stringDrop(topic, 1);
                      return runtime.safeCall(runtime.MatchResult([
                        sliced6
                      ]))
                    } else {
                      cond7 = globalThis.Predef.stringStartsWith(topic, "+");
                      if (cond7 === true) {
                        sliced7 = globalThis.Predef.stringDrop(topic, 1);
                        return runtime.safeCall(runtime.MatchResult([
                          sliced7
                        ]))
                      } else {
                        cond8 = globalThis.Predef.stringStartsWith(topic, "-");
                        if (cond8 === true) {
                          sliced8 = globalThis.Predef.stringDrop(topic, 1);
                          return runtime.safeCall(runtime.MatchResult([
                            sliced8
                          ]))
                        } else {
                          cond9 = globalThis.Predef.stringStartsWith(topic, "/");
                          if (cond9 === true) {
                            sliced9 = globalThis.Predef.stringDrop(topic, 1);
                            return runtime.safeCall(runtime.MatchResult([
                              sliced9
                            ]))
                          } else {
                            cond10 = globalThis.Predef.stringStartsWith(topic, ":");
                            if (cond10 === true) {
                              sliced10 = globalThis.Predef.stringDrop(topic, 1);
                              return runtime.safeCall(runtime.MatchResult([
                                sliced10
                              ]))
                            } else {
                              cond11 = globalThis.Predef.stringStartsWith(topic, "<");
                              if (cond11 === true) {
                                sliced11 = globalThis.Predef.stringDrop(topic, 1);
                                return runtime.safeCall(runtime.MatchResult([
                                  sliced11
                                ]))
                              } else {
                                cond12 = globalThis.Predef.stringStartsWith(topic, "=");
                                if (cond12 === true) {
                                  sliced12 = globalThis.Predef.stringDrop(topic, 1);
                                  return runtime.safeCall(runtime.MatchResult([
                                    sliced12
                                  ]))
                                } else {
                                  cond13 = globalThis.Predef.stringStartsWith(topic, ">");
                                  if (cond13 === true) {
                                    sliced13 = globalThis.Predef.stringDrop(topic, 1);
                                    return runtime.safeCall(runtime.MatchResult([
                                      sliced13
                                    ]))
                                  } else {
                                    cond14 = globalThis.Predef.stringStartsWith(topic, "?");
                                    if (cond14 === true) {
                                      sliced14 = globalThis.Predef.stringDrop(topic, 1);
                                      return runtime.safeCall(runtime.MatchResult([
                                        sliced14
                                      ]))
                                    } else {
                                      cond15 = globalThis.Predef.stringStartsWith(topic, "@");
                                      if (cond15 === true) {
                                        sliced15 = globalThis.Predef.stringDrop(topic, 1);
                                        return runtime.safeCall(runtime.MatchResult([
                                          sliced15
                                        ]))
                                      } else {
                                        cond16 = globalThis.Predef.stringStartsWith(topic, "\\");
                                        if (cond16 === true) {
                                          sliced16 = globalThis.Predef.stringDrop(topic, 1);
                                          return runtime.safeCall(runtime.MatchResult([
                                            sliced16
                                          ]))
                                        } else {
                                          cond17 = globalThis.Predef.stringStartsWith(topic, "^");
                                          if (cond17 === true) {
                                            sliced17 = globalThis.Predef.stringDrop(topic, 1);
                                            return runtime.safeCall(runtime.MatchResult([
                                              sliced17
                                            ]))
                                          } else {
                                            cond18 = globalThis.Predef.stringStartsWith(topic, "|");
                                            if (cond18 === true) {
                                              sliced18 = globalThis.Predef.stringDrop(topic, 1);
                                              return runtime.safeCall(runtime.MatchResult([
                                                sliced18
                                              ]))
                                            } else {
                                              cond19 = globalThis.Predef.stringStartsWith(topic, "~");
                                              if (cond19 === true) {
                                                sliced19 = globalThis.Predef.stringDrop(topic, 1);
                                                return runtime.safeCall(runtime.MatchResult([
                                                  sliced19
                                                ]))
                                              } else {
                                                cond20 = globalThis.Predef.stringStartsWith(topic, ".");
                                                if (cond20 === true) {
                                                  sliced20 = globalThis.Predef.stringDrop(topic, 1);
                                                  return runtime.safeCall(runtime.MatchResult([
                                                    sliced20
                                                  ]))
                                                } else {
                                                  return runtime.safeCall(runtime.MatchFailure())
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
          return runtime.safeCall(runtime.MatchResult([]))
        } else if (scrut === ")") {
          return runtime.safeCall(runtime.MatchResult([]))
        } else if (scrut === "[") {
          return runtime.safeCall(runtime.MatchResult([]))
        } else if (scrut === "]") {
          return runtime.safeCall(runtime.MatchResult([]))
        } else if (scrut === "{") {
          return runtime.safeCall(runtime.MatchResult([]))
        } else if (scrut === "}") {
          return runtime.safeCall(runtime.MatchResult([]))
        } else {
          return runtime.safeCall(runtime.MatchFailure())
        }
      } 
      unapplyStringPrefix(topic) {
        let cond, sliced, cond1, sliced1, cond2, sliced2, cond3, sliced3, cond4, sliced4, cond5, sliced5;
        cond = globalThis.Predef.stringStartsWith(topic, "(");
        if (cond === true) {
          sliced = globalThis.Predef.stringDrop(topic, 1);
          return runtime.safeCall(runtime.MatchResult([
            sliced
          ]))
        } else {
          cond1 = globalThis.Predef.stringStartsWith(topic, ")");
          if (cond1 === true) {
            sliced1 = globalThis.Predef.stringDrop(topic, 1);
            return runtime.safeCall(runtime.MatchResult([
              sliced1
            ]))
          } else {
            cond2 = globalThis.Predef.stringStartsWith(topic, "[");
            if (cond2 === true) {
              sliced2 = globalThis.Predef.stringDrop(topic, 1);
              return runtime.safeCall(runtime.MatchResult([
                sliced2
              ]))
            } else {
              cond3 = globalThis.Predef.stringStartsWith(topic, "]");
              if (cond3 === true) {
                sliced3 = globalThis.Predef.stringDrop(topic, 1);
                return runtime.safeCall(runtime.MatchResult([
                  sliced3
                ]))
              } else {
                cond4 = globalThis.Predef.stringStartsWith(topic, "{");
                if (cond4 === true) {
                  sliced4 = globalThis.Predef.stringDrop(topic, 1);
                  return runtime.safeCall(runtime.MatchResult([
                    sliced4
                  ]))
                } else {
                  cond5 = globalThis.Predef.stringStartsWith(topic, "}");
                  if (cond5 === true) {
                    sliced5 = globalThis.Predef.stringDrop(topic, 1);
                    return runtime.safeCall(runtime.MatchResult([
                      sliced5
                    ]))
                  } else {
                    return runtime.safeCall(runtime.MatchFailure())
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
          return runtime.safeCall(runtime.MatchResult([]))
        } else if (scrut === "`") {
          return runtime.safeCall(runtime.MatchResult([]))
        } else {
          return runtime.safeCall(runtime.MatchFailure())
        }
      } 
      unapplyStringPrefix(topic) {
        let cond, sliced, cond1, sliced1;
        cond = globalThis.Predef.stringStartsWith(topic, "'");
        if (cond === true) {
          sliced = globalThis.Predef.stringDrop(topic, 1);
          return runtime.safeCall(runtime.MatchResult([
            sliced
          ]))
        } else {
          cond1 = globalThis.Predef.stringStartsWith(topic, "`");
          if (cond1 === true) {
            sliced1 = globalThis.Predef.stringDrop(topic, 1);
            return runtime.safeCall(runtime.MatchResult([
              sliced1
            ]))
          } else {
            return runtime.safeCall(runtime.MatchFailure())
          }
        }
      }
      toString() { return "IdentifierQuote"; }
    };
    this.IdentifierQuote = new IdentifierQuote$class;
    this.IdentifierQuote.class = IdentifierQuote$class;
  }
  static makeLineLookupTable(text) {
    let i, n, ns, scrut, i$_, scrut1, tmp, tmp1, tmp2, tmp3, tmp4;
    i = 0;
    n = text.length;
    ns = [];
    tmp5: while (true) {
      scrut = i < n;
      if (scrut === true) {
        tmp = text.indexOf("\n", i);
        i$_ = tmp;
        tmp1 = - 1;
        scrut1 = i$_ == tmp1;
        if (scrut1 === true) {
          i = n;
          tmp2 = runtime.safeCall(ns.push(n));
        } else {
          tmp3 = i$_ + 1;
          i = tmp3;
          tmp2 = runtime.safeCall(ns.push(i$_));
        }
        tmp4 = tmp2;
        continue tmp5;
      } else {
        tmp4 = runtime.Unit;
      }
      break;
    }
    return Token.LineLookupTable(ns)
  } 
  static lex(str, options) {
    let number, hex, instance$Ident$_LineLookupTable$_, identifier, digits, char1, scanHexDigits, whitespace, scan, string, escape, take, operator, comment, tmp;
    char1 = function (idx) {
      let scrut, tmp1;
      scrut = idx < str.length;
      if (scrut === true) {
        tmp1 = runtime.safeCall(str.charAt(idx));
        return Option.Some(tmp1)
      } else {
        return Option.None
      }
    };
    take = function take(pred, idx, acc) {
      let scrut, param0, ch, scrut1, tmp1, tmp2, tmp3;
      tmp4: while (true) {
        scrut = char1(idx);
        if (scrut instanceof Option.Some.class) {
          param0 = scrut.value;
          ch = param0;
          scrut1 = runtime.safeCall(pred(ch));
          if (scrut1 === true) {
            tmp1 = idx + 1;
            idx = tmp1;
            tmp2 = acc + ch;
            acc = tmp2;
            tmp3 = runtime.Unit;
            continue tmp4;
          } else {
            tmp3 = [
              idx,
              acc
            ];
          }
        } else {
          tmp3 = [
            idx,
            acc
          ];
        }
        break;
      }
      return tmp3
    };
    whitespace = function whitespace(idx) {
      let scrut, param0, matchResult, tmp1, tmp2;
      tmp3: while (true) {
        scrut = char1(idx);
        if (scrut instanceof Option.Some.class) {
          param0 = scrut.value;
          matchResult = runtime.safeCall(Char.Whitespace.unapply(param0));
          if (matchResult instanceof runtime.MatchResult.class) {
            tmp1 = idx + 1;
            idx = tmp1;
            tmp2 = runtime.Unit;
            continue tmp3;
          } else {
            tmp2 = idx;
          }
        } else {
          tmp2 = idx;
        }
        break;
      }
      return tmp2
    };
    digits = function digits(idx, acc) {
      let scrut, param0, ch, matchResult, tmp1, tmp2, tmp3;
      tmp4: while (true) {
        scrut = char1(idx);
        if (scrut instanceof Option.Some.class) {
          param0 = scrut.value;
          matchResult = runtime.safeCall(Char.Digit.unapply(param0));
          if (matchResult instanceof runtime.MatchResult.class) {
            ch = param0;
            tmp1 = idx + 1;
            idx = tmp1;
            tmp2 = acc + ch;
            acc = tmp2;
            tmp3 = runtime.Unit;
            continue tmp4;
          } else {
            tmp3 = [
              idx,
              acc
            ];
          }
        } else {
          tmp3 = [
            idx,
            acc
          ];
        }
        break;
      }
      return tmp3
    };
    hex = function hex(idx, acc) {
      let scrut, param0, ch, matchResult, tmp1, tmp2, tmp3;
      tmp4: while (true) {
        scrut = char1(idx);
        if (scrut instanceof Option.Some.class) {
          param0 = scrut.value;
          matchResult = runtime.safeCall(Char.Digit.unapply(param0));
          if (matchResult instanceof runtime.MatchResult.class) {
            ch = param0;
            tmp1 = idx + 1;
            idx = tmp1;
            tmp2 = acc + ch;
            acc = tmp2;
            tmp3 = runtime.Unit;
            continue tmp4;
          } else {
            tmp3 = [
              idx,
              acc
            ];
          }
        } else {
          tmp3 = [
            idx,
            acc
          ];
        }
        break;
      }
      return tmp3
    };
    identifier = function identifier(idx, acc) {
      let scrut, param0, ch, matchResult, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11;
      tmp12: while (true) {
        scrut = char1(idx);
        if (scrut instanceof Option.Some.class) {
          param0 = scrut.value;
          matchResult = runtime.safeCall(Lexer.IdentifierBody.unapply(param0));
          if (matchResult instanceof runtime.MatchResult.class) {
            ch = param0;
            tmp1 = idx + 1;
            idx = tmp1;
            tmp2 = acc + ch;
            acc = tmp2;
            tmp3 = runtime.Unit;
            continue tmp12;
          } else {
            if (acc === "true") {
              tmp4 = Token.boolean("true", idx);
              tmp5 = runtime.safeCall(tmp4(instance$Ident$_LineLookupTable$_));
            } else if (acc === "false") {
              tmp6 = Token.boolean("false", idx);
              tmp5 = runtime.safeCall(tmp6(instance$Ident$_LineLookupTable$_));
            } else {
              tmp7 = Token.identifier(acc, idx);
              tmp5 = runtime.safeCall(tmp7(instance$Ident$_LineLookupTable$_));
            }
            tmp3 = Predef.tuple(idx, tmp5);
          }
        } else {
          if (acc === "true") {
            tmp8 = Token.boolean("true", idx);
            tmp9 = runtime.safeCall(tmp8(instance$Ident$_LineLookupTable$_));
          } else if (acc === "false") {
            tmp10 = Token.boolean("false", idx);
            tmp9 = runtime.safeCall(tmp10(instance$Ident$_LineLookupTable$_));
          } else {
            tmp11 = Token.identifier(acc, idx);
            tmp9 = runtime.safeCall(tmp11(instance$Ident$_LineLookupTable$_));
          }
          tmp3 = Predef.tuple(idx, tmp9);
        }
        break;
      }
      return tmp3
    };
    operator = function operator(idx, acc) {
      let scrut, param0, ch, matchResult, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7;
      tmp8: while (true) {
        scrut = char1(idx);
        if (scrut instanceof Option.Some.class) {
          param0 = scrut.value;
          matchResult = runtime.safeCall(Lexer.Operator.unapply(param0));
          if (matchResult instanceof runtime.MatchResult.class) {
            ch = param0;
            tmp1 = idx + 1;
            idx = tmp1;
            tmp2 = acc + ch;
            acc = tmp2;
            tmp3 = runtime.Unit;
            continue tmp8;
          } else {
            tmp4 = Token.symbol(acc, idx);
            tmp5 = runtime.safeCall(tmp4(instance$Ident$_LineLookupTable$_));
            tmp3 = [
              idx,
              tmp5
            ];
          }
        } else {
          tmp6 = Token.symbol(acc, idx);
          tmp7 = runtime.safeCall(tmp6(instance$Ident$_LineLookupTable$_));
          tmp3 = [
            idx,
            tmp7
          ];
        }
        break;
      }
      return tmp3
    };
    comment = function comment(idx) {
      let start, content, scrut, param0, terminated, scrut1, param01, ch, scrut2, param02, scrut3, param03, ch1, scrut4, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20, tmp21, tmp22, tmp23;
      start = idx;
      content = "";
      scrut = char1(idx);
      if (scrut instanceof Option.Some.class) {
        param0 = scrut.value;
        if (param0 === "/") {
          tmp1 = idx + 1;
          idx = tmp1;
          tmp24: while (true) {
            scrut3 = char1(idx);
            if (scrut3 instanceof Option.Some.class) {
              param03 = scrut3.value;
              ch1 = param03;
              scrut4 = ch1 !== "\n";
              if (scrut4 === true) {
                tmp2 = idx + 1;
                idx = tmp2;
                tmp3 = content + ch1;
                content = tmp3;
                tmp4 = runtime.Unit;
                continue tmp24;
              } else {
                tmp5 = Token.comment(content, start, idx);
                tmp6 = runtime.safeCall(tmp5(instance$Ident$_LineLookupTable$_));
                tmp4 = [
                  idx,
                  tmp6
                ];
              }
            } else {
              tmp7 = Token.comment(content, start, idx);
              tmp8 = runtime.safeCall(tmp7(instance$Ident$_LineLookupTable$_));
              tmp4 = [
                idx,
                tmp8
              ];
            }
            break;
          }
          return tmp4
        } else if (param0 === "*") {
          terminated = false;
          tmp9 = idx + 1;
          idx = tmp9;
          tmp25: while (true) {
            if (terminated === false) {
              scrut1 = char1(idx);
              if (scrut1 instanceof Option.Some.class) {
                param01 = scrut1.value;
                if (param01 === "*") {
                  tmp10 = idx + 1;
                  scrut2 = char1(tmp10);
                  if (scrut2 instanceof Option.Some.class) {
                    param02 = scrut2.value;
                    if (param02 === "/") {
                      tmp11 = idx + 2;
                      idx = tmp11;
                      terminated = true;
                      tmp12 = runtime.Unit;
                      continue tmp25;
                    } else {
                      ch = param01;
                      tmp13 = idx + 1;
                      idx = tmp13;
                      tmp14 = content + ch;
                      content = tmp14;
                      tmp12 = runtime.Unit;
                    }
                  } else {
                    ch = param01;
                    tmp15 = idx + 1;
                    idx = tmp15;
                    tmp16 = content + ch;
                    content = tmp16;
                    tmp12 = runtime.Unit;
                  }
                } else {
                  ch = param01;
                  tmp17 = idx + 1;
                  idx = tmp17;
                  tmp18 = content + ch;
                  content = tmp18;
                  tmp12 = runtime.Unit;
                }
              } else {
                if (terminated === true) {
                  tmp19 = Token.comment(content, start, idx);
                  tmp20 = runtime.safeCall(tmp19(instance$Ident$_LineLookupTable$_));
                  tmp21 = [
                    idx,
                    tmp20
                  ];
                } else {
                  tmp22 = Token.error(start, idx);
                  tmp23 = runtime.safeCall(tmp22(instance$Ident$_LineLookupTable$_));
                  tmp21 = [
                    idx,
                    tmp23
                  ];
                }
                tmp12 = tmp21;
              }
            } else {
              throw new globalThis.Error("match error");
            }
            break;
          }
          return tmp12
        } else {
          return operator(idx, "/")
        }
      } else {
        return operator(idx, "/")
      }
    };
    scanHexDigits = function scanHexDigits(idx, lim, acc, cnt) {
      let scrut, param0, ch, matchResult, scrut1, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7;
      scrut = char1(idx);
      if (scrut instanceof Option.Some.class) {
        param0 = scrut.value;
        matchResult = runtime.safeCall(Char.HexDigit.unapply(param0));
        if (matchResult instanceof runtime.MatchResult.class) {
          ch = param0;
          scrut1 = cnt < lim;
          if (scrut1 === true) {
            tmp1 = idx + 1;
            tmp2 = acc * 16;
            tmp3 = globalThis.parseInt(ch, 16);
            tmp4 = tmp2 + tmp3;
            tmp5 = cnt + 1;
            return scanHexDigits(tmp1, lim, tmp4, tmp5)
          } else {
            tmp6 = idx + 1;
            tmp7 = cnt + 1;
            return scanHexDigits(tmp6, lim, acc, tmp7)
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
      let scrut, param0, ch, scrut1, first2, first1, first0, idx1, cp, cnt, scrut2, param01, scrut3, first21, first11, first01, idx2, cp1, cnt1, idx3, scrut4, param02, scrut5, first22, first12, first02, idx4, cp2, cnt2, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20, tmp21, tmp22, tmp23, tmp24, tmp25, tmp26, tmp27, tmp28, tmp29, tmp30, tmp31, tmp32;
      scrut = char1(idx);
      if (scrut instanceof Option.Some.class) {
        param0 = scrut.value;
        if (param0 === "n") {
          tmp1 = idx + 1;
          tmp2 = Option.Some("\n");
          return [
            tmp1,
            tmp2
          ]
        } else if (param0 === "r") {
          tmp3 = idx + 1;
          tmp4 = Option.Some("\r");
          return [
            tmp3,
            tmp4
          ]
        } else if (param0 === "t") {
          tmp5 = idx + 1;
          tmp6 = Option.Some("\t");
          return [
            tmp5,
            tmp6
          ]
        } else if (param0 === "0") {
          tmp7 = idx + 1;
          tmp8 = Option.Some("\u0000");
          return [
            tmp7,
            tmp8
          ]
        } else if (param0 === "b") {
          tmp9 = idx + 1;
          tmp10 = Option.Some("\b");
          return [
            tmp9,
            tmp10
          ]
        } else if (param0 === "f") {
          tmp11 = idx + 1;
          tmp12 = Option.Some("\f");
          return [
            tmp11,
            tmp12
          ]
        } else if (param0 === "\"") {
          tmp13 = idx + 1;
          tmp14 = Option.Some("\"");
          return [
            tmp13,
            tmp14
          ]
        } else if (param0 === "\\") {
          tmp15 = idx + 1;
          tmp16 = Option.Some("\\");
          return [
            tmp15,
            tmp16
          ]
        } else if (param0 === "x") {
          tmp17 = idx + 1;
          scrut5 = scanHexDigits(tmp17, 2, 0, 0);
          if (globalThis.Array.isArray(scrut5) && scrut5.length === 3) {
            first02 = scrut5[0];
            first12 = scrut5[1];
            first22 = scrut5[2];
            idx4 = first02;
            cp2 = first12;
            cnt2 = first22;
            if (cnt2 === 0) {
              tmp18 = Option.None;
            } else {
              tmp19 = runtime.safeCall(globalThis.String.fromCodePoint(cp2));
              tmp18 = Option.Some(tmp19);
            }
            return Predef.tuple(idx4, tmp18)
          } else {
            throw new globalThis.Error("match error");
          }
        } else if (param0 === "u") {
          tmp20 = idx + 1;
          scrut2 = char1(tmp20);
          if (scrut2 instanceof Option.Some.class) {
            param01 = scrut2.value;
            if (param01 === "{") {
              tmp21 = idx + 2;
              scrut3 = scanHexDigits(tmp21, 6, 0, 0);
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
                    tmp22 = idx2 + 1;
                  } else {
                    tmp22 = idx2;
                  }
                } else {
                  tmp22 = idx2;
                }
                idx3 = tmp22;
                if (cnt1 === 0) {
                  tmp23 = Option.None;
                } else {
                  tmp24 = runtime.safeCall(globalThis.String.fromCodePoint(cp1));
                  tmp23 = Option.Some(tmp24);
                }
                return Predef.tuple(idx3, tmp23)
              } else {
                throw new globalThis.Error("match error");
              }
            } else {
              tmp25 = idx + 1;
              scrut1 = scanHexDigits(tmp25, 4, 0, 0);
              if (globalThis.Array.isArray(scrut1) && scrut1.length === 3) {
                first0 = scrut1[0];
                first1 = scrut1[1];
                first2 = scrut1[2];
                idx1 = first0;
                cp = first1;
                cnt = first2;
                if (cnt === 0) {
                  tmp26 = Option.None;
                } else {
                  tmp27 = runtime.safeCall(globalThis.String.fromCodePoint(cp));
                  tmp26 = Option.Some(tmp27);
                }
                return Predef.tuple(idx1, tmp26)
              } else {
                throw new globalThis.Error("match error");
              }
            }
          } else {
            tmp28 = idx + 1;
            scrut1 = scanHexDigits(tmp28, 4, 0, 0);
            if (globalThis.Array.isArray(scrut1) && scrut1.length === 3) {
              first0 = scrut1[0];
              first1 = scrut1[1];
              first2 = scrut1[2];
              idx1 = first0;
              cp = first1;
              cnt = first2;
              if (cnt === 0) {
                tmp29 = Option.None;
              } else {
                tmp30 = runtime.safeCall(globalThis.String.fromCodePoint(cp));
                tmp29 = Option.Some(tmp30);
              }
              return Predef.tuple(idx1, tmp29)
            } else {
              throw new globalThis.Error("match error");
            }
          }
        } else {
          ch = param0;
          tmp31 = idx + 1;
          tmp32 = Option.Some(ch);
          return [
            tmp31,
            tmp32
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
      let startIndex, content, terminated, scrut, param0, ch, scrut1, first1, first0, idx$_, chOpt, param01, ch1, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11;
      startIndex = idx;
      content = "";
      terminated = false;
      tmp12: while (true) {
        if (terminated === false) {
          scrut = char1(idx);
          if (scrut instanceof Option.Some.class) {
            param0 = scrut.value;
            if (param0 === "\"") {
              terminated = true;
              tmp1 = idx + 1;
              idx = tmp1;
              tmp2 = runtime.Unit;
            } else if (param0 === "\\") {
              tmp3 = idx + 1;
              scrut1 = escape(tmp3);
              if (globalThis.Array.isArray(scrut1) && scrut1.length === 2) {
                first0 = scrut1[0];
                first1 = scrut1[1];
                idx$_ = first0;
                chOpt = first1;
                idx = idx$_;
                if (chOpt instanceof Option.Some.class) {
                  param01 = chOpt.value;
                  ch1 = param01;
                  tmp4 = content + ch1;
                  content = tmp4;
                  tmp5 = runtime.Unit;
                } else {
                  tmp5 = runtime.Unit;
                }
                tmp6 = tmp5;
              } else {
                throw new globalThis.Error("match error");
              }
              tmp2 = tmp6;
            } else {
              ch = param0;
              tmp7 = idx + 1;
              idx = tmp7;
              tmp8 = content + ch;
              content = tmp8;
              tmp2 = runtime.Unit;
            }
          } else if (scrut instanceof Option.None.class) {
            terminated = true;
            tmp2 = runtime.Unit;
          } else {
            tmp2 = runtime.Unit;
          }
          tmp9 = tmp2;
          continue tmp12;
        } else {
          tmp9 = runtime.Unit;
        }
        break;
      }
      tmp10 = Token.string(content, startIndex, idx);
      tmp11 = runtime.safeCall(tmp10(instance$Ident$_LineLookupTable$_));
      return [
        idx,
        tmp11
      ]
    };
    number = function number(idx, head) {
      let scrut, first1, first0, idx$_, integer, scrut1, param0, scrut2, first11, first01, idx$_$_, fraction, scrut3, param01, scrut4, first12, first02, idx$_1, integer1, scrut5, first13, first03, idx$_2, ds, scrut6, first14, first04, idx$_3, xs, scrut7, first15, first05, idx$_4, os, scrut8, first16, first06, idx$_5, bs, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20, tmp21, tmp22, tmp23, tmp24, tmp25, tmp26, tmp27, tmp28, tmp29, tmp30, tmp31, tmp32, tmp33, tmp34, tmp35, tmp36, tmp37, tmp38, tmp39, tmp40, tmp41, tmp42, tmp43, tmp44, tmp45, tmp46, tmp47, tmp48, tmp49, tmp50, tmp51, tmp52, tmp53, tmp54, tmp55, tmp56, tmp57, tmp58, tmp59, tmp60, tmp61, tmp62, tmp63, tmp64, tmp65, tmp66, tmp67, tmp68, tmp69, tmp70, tmp71, tmp72, tmp73, tmp74, tmp75, tmp76, tmp77, tmp78, tmp79, tmp80, tmp81, tmp82, tmp83, tmp84, tmp85, tmp86, tmp87, tmp88, tmp89, tmp90, tmp91, tmp92, tmp93, tmp94, tmp95, tmp96, tmp97, tmp98, tmp99, tmp100, tmp101, tmp102, tmp103, tmp104, tmp105, tmp106, tmp107, tmp108, lambda, lambda1, lambda2;
      if (head === "0") {
        scrut3 = char1(idx);
        if (scrut3 instanceof Option.None.class) {
          tmp1 = Token.integer("0", idx);
          tmp2 = runtime.safeCall(tmp1(instance$Ident$_LineLookupTable$_));
          return [
            idx,
            tmp2
          ]
        } else if (scrut3 instanceof Option.Some.class) {
          param01 = scrut3.value;
          if (param01 === "b") {
            lambda = (undefined, function (x) {
              let matchResult;
              matchResult = runtime.safeCall(Char.BinDigit.unapply(x));
              if (matchResult instanceof runtime.MatchResult.class) {
                return true
              } else {
                return false
              }
            });
            tmp3 = lambda;
            tmp4 = idx + 1;
            scrut8 = take(tmp3, tmp4, "");
            if (globalThis.Array.isArray(scrut8) && scrut8.length === 2) {
              first06 = scrut8[0];
              first16 = scrut8[1];
              idx$_5 = first06;
              bs = first16;
              tmp5 = Str.concat2("0b", bs);
              tmp6 = Token.integer(tmp5, idx);
              tmp7 = runtime.safeCall(tmp6(instance$Ident$_LineLookupTable$_));
              return [
                idx$_5,
                tmp7
              ]
            } else {
              scrut4 = digits(idx, head);
              if (globalThis.Array.isArray(scrut4) && scrut4.length === 2) {
                first02 = scrut4[0];
                first12 = scrut4[1];
                idx$_1 = first02;
                integer1 = first12;
                tmp8 = Token.integer(integer1, idx);
                tmp9 = runtime.safeCall(tmp8(instance$Ident$_LineLookupTable$_));
                return [
                  idx$_1,
                  tmp9
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
                      tmp10 = idx$_ + 1;
                      scrut2 = digits(tmp10, "");
                      if (globalThis.Array.isArray(scrut2) && scrut2.length === 2) {
                        first01 = scrut2[0];
                        first11 = scrut2[1];
                        idx$_$_ = first01;
                        fraction = first11;
                        tmp11 = Str.concat2(integer, ".");
                        tmp12 = Str.concat2(tmp11, fraction);
                        tmp13 = Token.decimal(tmp12, idx);
                        tmp14 = runtime.safeCall(tmp13(instance$Ident$_LineLookupTable$_));
                        return [
                          idx$_$_,
                          tmp14
                        ]
                      } else {
                        tmp15 = Token.integer(integer, idx);
                        tmp16 = runtime.safeCall(tmp15(instance$Ident$_LineLookupTable$_));
                        return [
                          idx$_,
                          tmp16
                        ]
                      }
                    } else {
                      tmp17 = Token.integer(integer, idx);
                      tmp18 = runtime.safeCall(tmp17(instance$Ident$_LineLookupTable$_));
                      return [
                        idx$_,
                        tmp18
                      ]
                    }
                  } else {
                    tmp19 = Token.integer(integer, idx);
                    tmp20 = runtime.safeCall(tmp19(instance$Ident$_LineLookupTable$_));
                    return [
                      idx$_,
                      tmp20
                    ]
                  }
                } else {
                  throw new globalThis.Error("match error");
                }
              }
            }
          } else if (param01 === "o") {
            lambda1 = (undefined, function (x) {
              let matchResult;
              matchResult = runtime.safeCall(Char.OctDigit.unapply(x));
              if (matchResult instanceof runtime.MatchResult.class) {
                return true
              } else {
                return false
              }
            });
            tmp21 = lambda1;
            tmp22 = idx + 1;
            scrut7 = take(tmp21, tmp22, "");
            if (globalThis.Array.isArray(scrut7) && scrut7.length === 2) {
              first05 = scrut7[0];
              first15 = scrut7[1];
              idx$_4 = first05;
              os = first15;
              tmp23 = Str.concat2("0o", os);
              tmp24 = Token.integer(tmp23, idx);
              tmp25 = runtime.safeCall(tmp24(instance$Ident$_LineLookupTable$_));
              return [
                idx$_4,
                tmp25
              ]
            } else {
              scrut4 = digits(idx, head);
              if (globalThis.Array.isArray(scrut4) && scrut4.length === 2) {
                first02 = scrut4[0];
                first12 = scrut4[1];
                idx$_1 = first02;
                integer1 = first12;
                tmp26 = Token.integer(integer1, idx);
                tmp27 = runtime.safeCall(tmp26(instance$Ident$_LineLookupTable$_));
                return [
                  idx$_1,
                  tmp27
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
                      tmp28 = idx$_ + 1;
                      scrut2 = digits(tmp28, "");
                      if (globalThis.Array.isArray(scrut2) && scrut2.length === 2) {
                        first01 = scrut2[0];
                        first11 = scrut2[1];
                        idx$_$_ = first01;
                        fraction = first11;
                        tmp29 = Str.concat2(integer, ".");
                        tmp30 = Str.concat2(tmp29, fraction);
                        tmp31 = Token.decimal(tmp30, idx);
                        tmp32 = runtime.safeCall(tmp31(instance$Ident$_LineLookupTable$_));
                        return [
                          idx$_$_,
                          tmp32
                        ]
                      } else {
                        tmp33 = Token.integer(integer, idx);
                        tmp34 = runtime.safeCall(tmp33(instance$Ident$_LineLookupTable$_));
                        return [
                          idx$_,
                          tmp34
                        ]
                      }
                    } else {
                      tmp35 = Token.integer(integer, idx);
                      tmp36 = runtime.safeCall(tmp35(instance$Ident$_LineLookupTable$_));
                      return [
                        idx$_,
                        tmp36
                      ]
                    }
                  } else {
                    tmp37 = Token.integer(integer, idx);
                    tmp38 = runtime.safeCall(tmp37(instance$Ident$_LineLookupTable$_));
                    return [
                      idx$_,
                      tmp38
                    ]
                  }
                } else {
                  throw new globalThis.Error("match error");
                }
              }
            }
          } else if (param01 === "x") {
            lambda2 = (undefined, function (x) {
              let matchResult;
              matchResult = runtime.safeCall(Char.HexDigit.unapply(x));
              if (matchResult instanceof runtime.MatchResult.class) {
                return true
              } else {
                return false
              }
            });
            tmp39 = lambda2;
            tmp40 = idx + 1;
            scrut6 = take(tmp39, tmp40, "");
            if (globalThis.Array.isArray(scrut6) && scrut6.length === 2) {
              first04 = scrut6[0];
              first14 = scrut6[1];
              idx$_3 = first04;
              xs = first14;
              tmp41 = Str.concat2("0x", xs);
              tmp42 = Token.integer(tmp41, idx);
              tmp43 = runtime.safeCall(tmp42(instance$Ident$_LineLookupTable$_));
              return [
                idx$_3,
                tmp43
              ]
            } else {
              scrut4 = digits(idx, head);
              if (globalThis.Array.isArray(scrut4) && scrut4.length === 2) {
                first02 = scrut4[0];
                first12 = scrut4[1];
                idx$_1 = first02;
                integer1 = first12;
                tmp44 = Token.integer(integer1, idx);
                tmp45 = runtime.safeCall(tmp44(instance$Ident$_LineLookupTable$_));
                return [
                  idx$_1,
                  tmp45
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
                      tmp46 = idx$_ + 1;
                      scrut2 = digits(tmp46, "");
                      if (globalThis.Array.isArray(scrut2) && scrut2.length === 2) {
                        first01 = scrut2[0];
                        first11 = scrut2[1];
                        idx$_$_ = first01;
                        fraction = first11;
                        tmp47 = Str.concat2(integer, ".");
                        tmp48 = Str.concat2(tmp47, fraction);
                        tmp49 = Token.decimal(tmp48, idx);
                        tmp50 = runtime.safeCall(tmp49(instance$Ident$_LineLookupTable$_));
                        return [
                          idx$_$_,
                          tmp50
                        ]
                      } else {
                        tmp51 = Token.integer(integer, idx);
                        tmp52 = runtime.safeCall(tmp51(instance$Ident$_LineLookupTable$_));
                        return [
                          idx$_,
                          tmp52
                        ]
                      }
                    } else {
                      tmp53 = Token.integer(integer, idx);
                      tmp54 = runtime.safeCall(tmp53(instance$Ident$_LineLookupTable$_));
                      return [
                        idx$_,
                        tmp54
                      ]
                    }
                  } else {
                    tmp55 = Token.integer(integer, idx);
                    tmp56 = runtime.safeCall(tmp55(instance$Ident$_LineLookupTable$_));
                    return [
                      idx$_,
                      tmp56
                    ]
                  }
                } else {
                  throw new globalThis.Error("match error");
                }
              }
            }
          } else if (param01 === ".") {
            tmp57 = idx + 1;
            scrut5 = digits(tmp57, ".");
            if (globalThis.Array.isArray(scrut5) && scrut5.length === 2) {
              first03 = scrut5[0];
              first13 = scrut5[1];
              idx$_2 = first03;
              ds = first13;
              tmp58 = Str.concat2("0.", ds);
              tmp59 = Token.decimal(tmp58, idx);
              tmp60 = runtime.safeCall(tmp59(instance$Ident$_LineLookupTable$_));
              return [
                idx$_2,
                tmp60
              ]
            } else {
              scrut4 = digits(idx, head);
              if (globalThis.Array.isArray(scrut4) && scrut4.length === 2) {
                first02 = scrut4[0];
                first12 = scrut4[1];
                idx$_1 = first02;
                integer1 = first12;
                tmp61 = Token.integer(integer1, idx);
                tmp62 = runtime.safeCall(tmp61(instance$Ident$_LineLookupTable$_));
                return [
                  idx$_1,
                  tmp62
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
                      tmp63 = idx$_ + 1;
                      scrut2 = digits(tmp63, "");
                      if (globalThis.Array.isArray(scrut2) && scrut2.length === 2) {
                        first01 = scrut2[0];
                        first11 = scrut2[1];
                        idx$_$_ = first01;
                        fraction = first11;
                        tmp64 = Str.concat2(integer, ".");
                        tmp65 = Str.concat2(tmp64, fraction);
                        tmp66 = Token.decimal(tmp65, idx);
                        tmp67 = runtime.safeCall(tmp66(instance$Ident$_LineLookupTable$_));
                        return [
                          idx$_$_,
                          tmp67
                        ]
                      } else {
                        tmp68 = Token.integer(integer, idx);
                        tmp69 = runtime.safeCall(tmp68(instance$Ident$_LineLookupTable$_));
                        return [
                          idx$_,
                          tmp69
                        ]
                      }
                    } else {
                      tmp70 = Token.integer(integer, idx);
                      tmp71 = runtime.safeCall(tmp70(instance$Ident$_LineLookupTable$_));
                      return [
                        idx$_,
                        tmp71
                      ]
                    }
                  } else {
                    tmp72 = Token.integer(integer, idx);
                    tmp73 = runtime.safeCall(tmp72(instance$Ident$_LineLookupTable$_));
                    return [
                      idx$_,
                      tmp73
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
              tmp74 = Token.integer(integer1, idx);
              tmp75 = runtime.safeCall(tmp74(instance$Ident$_LineLookupTable$_));
              return [
                idx$_1,
                tmp75
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
                    tmp76 = idx$_ + 1;
                    scrut2 = digits(tmp76, "");
                    if (globalThis.Array.isArray(scrut2) && scrut2.length === 2) {
                      first01 = scrut2[0];
                      first11 = scrut2[1];
                      idx$_$_ = first01;
                      fraction = first11;
                      tmp77 = Str.concat2(integer, ".");
                      tmp78 = Str.concat2(tmp77, fraction);
                      tmp79 = Token.decimal(tmp78, idx);
                      tmp80 = runtime.safeCall(tmp79(instance$Ident$_LineLookupTable$_));
                      return [
                        idx$_$_,
                        tmp80
                      ]
                    } else {
                      tmp81 = Token.integer(integer, idx);
                      tmp82 = runtime.safeCall(tmp81(instance$Ident$_LineLookupTable$_));
                      return [
                        idx$_,
                        tmp82
                      ]
                    }
                  } else {
                    tmp83 = Token.integer(integer, idx);
                    tmp84 = runtime.safeCall(tmp83(instance$Ident$_LineLookupTable$_));
                    return [
                      idx$_,
                      tmp84
                    ]
                  }
                } else {
                  tmp85 = Token.integer(integer, idx);
                  tmp86 = runtime.safeCall(tmp85(instance$Ident$_LineLookupTable$_));
                  return [
                    idx$_,
                    tmp86
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
                tmp87 = idx$_ + 1;
                scrut2 = digits(tmp87, "");
                if (globalThis.Array.isArray(scrut2) && scrut2.length === 2) {
                  first01 = scrut2[0];
                  first11 = scrut2[1];
                  idx$_$_ = first01;
                  fraction = first11;
                  tmp88 = Str.concat2(integer, ".");
                  tmp89 = Str.concat2(tmp88, fraction);
                  tmp90 = Token.decimal(tmp89, idx);
                  tmp91 = runtime.safeCall(tmp90(instance$Ident$_LineLookupTable$_));
                  return [
                    idx$_$_,
                    tmp91
                  ]
                } else {
                  tmp92 = Token.integer(integer, idx);
                  tmp93 = runtime.safeCall(tmp92(instance$Ident$_LineLookupTable$_));
                  return [
                    idx$_,
                    tmp93
                  ]
                }
              } else {
                tmp94 = Token.integer(integer, idx);
                tmp95 = runtime.safeCall(tmp94(instance$Ident$_LineLookupTable$_));
                return [
                  idx$_,
                  tmp95
                ]
              }
            } else {
              tmp96 = Token.integer(integer, idx);
              tmp97 = runtime.safeCall(tmp96(instance$Ident$_LineLookupTable$_));
              return [
                idx$_,
                tmp97
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
              tmp98 = idx$_ + 1;
              scrut2 = digits(tmp98, "");
              if (globalThis.Array.isArray(scrut2) && scrut2.length === 2) {
                first01 = scrut2[0];
                first11 = scrut2[1];
                idx$_$_ = first01;
                fraction = first11;
                tmp99 = Str.concat2(integer, ".");
                tmp100 = Str.concat2(tmp99, fraction);
                tmp101 = Token.decimal(tmp100, idx);
                tmp102 = runtime.safeCall(tmp101(instance$Ident$_LineLookupTable$_));
                return [
                  idx$_$_,
                  tmp102
                ]
              } else {
                tmp103 = Token.integer(integer, idx);
                tmp104 = runtime.safeCall(tmp103(instance$Ident$_LineLookupTable$_));
                return [
                  idx$_,
                  tmp104
                ]
              }
            } else {
              tmp105 = Token.integer(integer, idx);
              tmp106 = runtime.safeCall(tmp105(instance$Ident$_LineLookupTable$_));
              return [
                idx$_,
                tmp106
              ]
            }
          } else {
            tmp107 = Token.integer(integer, idx);
            tmp108 = runtime.safeCall(tmp107(instance$Ident$_LineLookupTable$_));
            return [
              idx$_,
              tmp108
            ]
          }
        } else {
          throw new globalThis.Error("match error");
        }
      }
    };
    scan = function scan(idx, acc) {
      let go, scrut, param0, other, quote, matchResult, scrut1, param01, ch, matchResult1, scrut2, first1, first0, idx$_, token, param02, param1, name, ch1, matchResult2, ch2, matchResult3, ch3, matchResult4, b, matchResult5, matchResult6, scrut3, idx$_1, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20, tmp21, tmp22, tmp23, tmp24, tmp25, tmp26, tmp27, tmp28, tmp29, tmp30, tmp31, tmp32, tmp33, tmp34, tmp35, tmp36, tmp37, tmp38, tmp39, tmp40, tmp41, tmp42, tmp43, tmp44, tmp45, tmp46, tmp47, tmp48, tmp49, tmp50, tmp51, tmp52;
      go = function go(idx1, tok) {
        let scrut4, tmp53, tmp54;
        scrut4 = options.noWhitespace;
        if (scrut4 === true) {
          if (tok instanceof Token.Comment.class) {
            return scan(idx1, acc)
          } else if (tok instanceof Token.Space.class) {
            return scan(idx1, acc)
          } else {
            tmp53 = Stack.Cons(tok, acc);
            return scan(idx1, tmp53)
          }
        } else {
          tmp54 = Stack.Cons(tok, acc);
          return scan(idx1, tmp54)
        }
      };
      scrut = char1(idx);
      if (scrut instanceof Option.None.class) {
        return Stack.reverse(acc)
      } else if (scrut instanceof Option.Some.class) {
        param0 = scrut.value;
        matchResult6 = runtime.safeCall(Char.Whitespace.unapply(param0));
        if (matchResult6 instanceof runtime.MatchResult.class) {
          scrut3 = whitespace(idx);
          idx$_1 = scrut3;
          tmp1 = Token.space(idx, idx$_1);
          tmp2 = runtime.safeCall(tmp1(instance$Ident$_LineLookupTable$_));
          return go(idx$_1, tmp2)
        } else {
          if (param0 === "\"") {
            tmp3 = idx + 1;
            tmp4 = string(tmp3);
            return go(...tmp4)
          } else {
            matchResult5 = runtime.safeCall(Lexer.Bracket.unapply(param0));
            if (matchResult5 instanceof runtime.MatchResult.class) {
              b = param0;
              tmp5 = idx + 1;
              tmp6 = Token.symbol(b, idx);
              tmp7 = runtime.safeCall(tmp6(instance$Ident$_LineLookupTable$_));
              return go(tmp5, tmp7)
            } else {
              if (param0 === "/") {
                tmp8 = idx + 1;
                tmp9 = comment(tmp8);
                return go(...tmp9)
              } else {
                matchResult4 = runtime.safeCall(Lexer.Operator.unapply(param0));
                if (matchResult4 instanceof runtime.MatchResult.class) {
                  ch3 = param0;
                  tmp10 = idx + 1;
                  tmp11 = operator(tmp10, ch3);
                  return go(...tmp11)
                } else {
                  matchResult3 = runtime.safeCall(Char.Digit.unapply(param0));
                  if (matchResult3 instanceof runtime.MatchResult.class) {
                    ch2 = param0;
                    tmp12 = idx + 1;
                    tmp13 = number(tmp12, ch2);
                    return go(...tmp13)
                  } else {
                    matchResult2 = runtime.safeCall(Lexer.IdentifierStart.unapply(param0));
                    if (matchResult2 instanceof runtime.MatchResult.class) {
                      ch1 = param0;
                      tmp14 = idx + 1;
                      tmp15 = identifier(tmp14, ch1);
                      return go(...tmp15)
                    } else {
                      matchResult = runtime.safeCall(Lexer.IdentifierQuote.unapply(param0));
                      if (matchResult instanceof runtime.MatchResult.class) {
                        quote = param0;
                        tmp16 = idx + 1;
                        scrut1 = char1(tmp16);
                        if (scrut1 instanceof Option.Some.class) {
                          param01 = scrut1.value;
                          matchResult1 = runtime.safeCall(Lexer.IdentifierStart.unapply(param01));
                          if (matchResult1 instanceof runtime.MatchResult.class) {
                            ch = param01;
                            tmp17 = idx + 2;
                            tmp18 = quote + ch;
                            scrut2 = identifier(tmp17, tmp18);
                            if (globalThis.Array.isArray(scrut2) && scrut2.length === 2) {
                              first0 = scrut2[0];
                              first1 = scrut2[1];
                              idx$_ = first0;
                              token = first1;
                              if (token instanceof Token.Identifier.class) {
                                param02 = token.name;
                                param1 = token.symbolic;
                                name = param02;
                                tmp19 = Token.identifier(name, idx);
                                tmp20 = runtime.safeCall(tmp19(instance$Ident$_LineLookupTable$_));
                                return go(idx$_, tmp20)
                              } else {
                                tmp21 = idx + 1;
                                tmp22 = idx + 1;
                                tmp23 = Token.error(idx, tmp22);
                                tmp24 = runtime.safeCall(tmp23(instance$Ident$_LineLookupTable$_));
                                return go(tmp21, tmp24)
                              }
                            } else {
                              other = param0;
                              tmp25 = Str.concat2("Unrecognized character: '", other);
                              tmp26 = Str.concat2(tmp25, "'");
                              tmp27 = Predef.print(tmp26);
                              tmp28 = idx + 1;
                              tmp29 = idx + 1;
                              tmp30 = Token.error(idx, tmp29);
                              tmp31 = runtime.safeCall(tmp30(instance$Ident$_LineLookupTable$_));
                              return go(tmp28, tmp31)
                            }
                          } else {
                            other = param0;
                            tmp32 = Str.concat2("Unrecognized character: '", other);
                            tmp33 = Str.concat2(tmp32, "'");
                            tmp34 = Predef.print(tmp33);
                            tmp35 = idx + 1;
                            tmp36 = idx + 1;
                            tmp37 = Token.error(idx, tmp36);
                            tmp38 = runtime.safeCall(tmp37(instance$Ident$_LineLookupTable$_));
                            return go(tmp35, tmp38)
                          }
                        } else {
                          other = param0;
                          tmp39 = Str.concat2("Unrecognized character: '", other);
                          tmp40 = Str.concat2(tmp39, "'");
                          tmp41 = Predef.print(tmp40);
                          tmp42 = idx + 1;
                          tmp43 = idx + 1;
                          tmp44 = Token.error(idx, tmp43);
                          tmp45 = runtime.safeCall(tmp44(instance$Ident$_LineLookupTable$_));
                          return go(tmp42, tmp45)
                        }
                      } else {
                        other = param0;
                        tmp46 = Str.concat2("Unrecognized character: '", other);
                        tmp47 = Str.concat2(tmp46, "'");
                        tmp48 = Predef.print(tmp47);
                        tmp49 = idx + 1;
                        tmp50 = idx + 1;
                        tmp51 = Token.error(idx, tmp50);
                        tmp52 = runtime.safeCall(tmp51(instance$Ident$_LineLookupTable$_));
                        return go(tmp49, tmp52)
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
    tmp = Lexer.makeLineLookupTable(str);
    instance$Ident$_LineLookupTable$_ = tmp;
    return scan(0, Stack.Nil)
  }
  static toString() { return "Lexer"; }
});
let Lexer = Lexer1; export default Lexer;
