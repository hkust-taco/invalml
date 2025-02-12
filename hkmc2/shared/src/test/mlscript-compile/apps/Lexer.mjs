import runtime from "./../Runtime.mjs";
import Predef from "./../Predef.mjs";
import Stack from "./../Stack.mjs";
import Str from "./../Str.mjs";
import Option from "./../Option.mjs";
let Lexer1;
Lexer1 = class Lexer {
  static {
    const Round$class = class Round {
      constructor() {}
      toString() { return "Round"; }
    };
    this.Round = new Round$class;
    this.Round.class = Round$class;
    const Square$class = class Square {
      constructor() {}
      toString() { return "Square"; }
    };
    this.Square = new Square$class;
    this.Square.class = Square$class;
    const Curly$class = class Curly {
      constructor() {}
      toString() { return "Curly"; }
    };
    this.Curly = new Curly$class;
    this.Curly.class = Curly$class;
    const BeginEnd$class = class BeginEnd {
      constructor() {}
      toString() { return "BeginEnd"; }
    };
    this.BeginEnd = new BeginEnd$class;
    this.BeginEnd.class = BeginEnd$class;
    this.LiteralKind = class LiteralKind {
      static {
        const Integer$class = class Integer {
          constructor() {}
          toString() { return "Integer"; }
        };
        this.Integer = new Integer$class;
        this.Integer.class = Integer$class;
        const Decimal$class = class Decimal {
          constructor() {}
          toString() { return "Decimal"; }
        };
        this.Decimal = new Decimal$class;
        this.Decimal.class = Decimal$class;
        const String$class = class String {
          constructor() {}
          toString() { return "String"; }
        };
        this.String = new String$class;
        this.String.class = String$class;
        const Boolean$class = class Boolean {
          constructor() {}
          toString() { return "Boolean"; }
        };
        this.Boolean = new Boolean$class;
        this.Boolean.class = Boolean$class;
      }
      static toString() { return "LiteralKind"; }
    };
    this.Token = class Token {
      static {
        const Space$class = class Space {
          constructor() {}
          toString() { return "Space"; }
        };
        this.Space = new Space$class;
        this.Space.class = Space$class;
        const Comma$class = class Comma {
          constructor() {}
          toString() { return "Comma"; }
        };
        this.Comma = new Comma$class;
        this.Comma.class = Comma$class;
        const Semicolon$class = class Semicolon {
          constructor() {}
          toString() { return "Semicolon"; }
        };
        this.Semicolon = new Semicolon$class;
        this.Semicolon.class = Semicolon$class;
        const Error$class = class Error {
          constructor() {}
          toString() { return "Error"; }
        };
        this.Error = new Error$class;
        this.Error.class = Error$class;
        this.Open = function Open(kind1) { return new Open.class(kind1); };
        this.Open.class = class Open {
          constructor(kind) {
            this.kind = kind;
          }
          toString() { return "Open(" + globalThis.Predef.render(this.kind) + ")"; }
        };
        this.Close = function Close(kind1) { return new Close.class(kind1); };
        this.Close.class = class Close {
          constructor(kind) {
            this.kind = kind;
          }
          toString() { return "Close(" + globalThis.Predef.render(this.kind) + ")"; }
        };
        this.Comment = function Comment(content1) { return new Comment.class(content1); };
        this.Comment.class = class Comment {
          constructor(content) {
            this.content = content;
          }
          toString() { return "Comment(" + globalThis.Predef.render(this.content) + ")"; }
        };
        this.Identifier = function Identifier(name1, symbolic1) { return new Identifier.class(name1, symbolic1); };
        this.Identifier.class = class Identifier {
          constructor(name, symbolic) {
            this.name = name;
            this.symbolic = symbolic;
          }
          toString() { return "Identifier(" + globalThis.Predef.render(this.name) + ", " + globalThis.Predef.render(this.symbolic) + ")"; }
        };
        this.Literal = function Literal(kind1, literal1) { return new Literal.class(kind1, literal1); };
        this.Literal.class = class Literal {
          constructor(kind, literal) {
            this.kind = kind;
            this.literal = literal;
          }
          toString() { return "Literal(" + globalThis.Predef.render(this.kind) + ", " + globalThis.Predef.render(this.literal) + ")"; }
        };
      }
      static integer(literal) {
        return Lexer.Token.Literal(Lexer.LiteralKind.Integer, literal)
      } 
      static decimal(literal1) {
        return Lexer.Token.Literal(Lexer.LiteralKind.Decimal, literal1)
      } 
      static string(literal2) {
        return Lexer.Token.Literal(Lexer.LiteralKind.String, literal2)
      } 
      static boolean(literal3) {
        return Lexer.Token.Literal(Lexer.LiteralKind.Boolean, literal3)
      } 
      static summary(token) {
        let param0, param1, literal4, param01, param11, name, param02, param03, kind, param04, kind1;
        if (token instanceof Token.Space.class) {
          return "\u2420"
        } else if (token instanceof Token.Comma.class) {
          return ","
        } else if (token instanceof Token.Semicolon.class) {
          return ";"
        } else if (token instanceof Token.Error.class) {
          return "\u26A0"
        } else if (token instanceof Token.Open.class) {
          param04 = token.kind;
          kind1 = param04;
          if (kind1 instanceof Lexer.Round.class) {
            return "("
          } else if (kind1 instanceof Lexer.Square.class) {
            return "["
          } else if (kind1 instanceof Lexer.Curly.class) {
            return "{"
          } else if (kind1 instanceof Lexer.BeginEnd.class) {
            return "begin"
          } else {
            throw new globalThis.Error("match error");
          }
        } else if (token instanceof Token.Close.class) {
          param03 = token.kind;
          kind = param03;
          if (kind instanceof Lexer.Round.class) {
            return ")"
          } else if (kind instanceof Lexer.Square.class) {
            return "]"
          } else if (kind instanceof Lexer.Curly.class) {
            return "}"
          } else if (kind instanceof Lexer.BeginEnd.class) {
            return "end"
          } else {
            throw new globalThis.Error("match error");
          }
        } else if (token instanceof Token.Comment.class) {
          param02 = token.content;
          return "\uD83D\uDCAC"
        } else if (token instanceof Token.Identifier.class) {
          param01 = token.name;
          param11 = token.symbolic;
          name = param01;
          return name
        } else if (token instanceof Token.Literal.class) {
          param0 = token.kind;
          param1 = token.literal;
          literal4 = param1;
          return literal4
        } else {
          throw new globalThis.Error("match error");
        }
      } 
      static preview(tokens) {
        let i, limit, values, scrut, param0, param1, head, tail, param01, param11, tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6;
        i = 0;
        limit = 5;
        values = [];
        tmp7: while (true) {
          scrut = i < limit;
          if (scrut === true) {
            if (tokens instanceof Stack.Cons.class) {
              param0 = tokens.head;
              param1 = tokens.tail;
              head = param0;
              tail = param1;
              tmp = Lexer1.Token.summary(head);
              tmp1 = runtime.safeCall(values.push(tmp));
              tokens = tail;
              tmp2 = i + 1;
              i = tmp2;
              tmp3 = runtime.Unit;
              continue tmp7;
            } else {
              tmp3 = runtime.Unit;
            }
          } else {
            tmp3 = runtime.Unit;
          }
          break;
        }
        tmp4 = Predef.fold((arg1, arg2) => {
          return arg1 + arg2
        });
        tmp5 = runtime.safeCall(values.join("\u2502"));
        if (tokens instanceof Stack.Cons.class) {
          param01 = tokens.head;
          param11 = tokens.tail;
          tmp6 = "\u2502\u22EF";
        } else {
          tmp6 = "\u2503";
        }
        return runtime.safeCall(tmp4("\u2503", tmp5, tmp6))
      } 
      static display(token1) {
        let param0, param1, kind, literal4, param01, param11, name, symbolic, param02, content, param03, kind1, param04, kind2, tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11;
        if (token1 instanceof Token.Space.class) {
          return "Space"
        } else if (token1 instanceof Token.Comma.class) {
          return "Comma"
        } else if (token1 instanceof Token.Semicolon.class) {
          return "Semicolon"
        } else if (token1 instanceof Token.Error.class) {
          return "Error"
        } else if (token1 instanceof Token.Open.class) {
          param04 = token1.kind;
          kind2 = param04;
          tmp = Token.display(kind2);
          tmp1 = Str.concat2("Open(", tmp);
          return Str.concat2(tmp1, ")")
        } else if (token1 instanceof Token.Close.class) {
          param03 = token1.kind;
          kind1 = param03;
          tmp2 = Token.display(kind1);
          tmp3 = Str.concat2("Close(", tmp2);
          return Str.concat2(tmp3, ")")
        } else {
          if (token1 instanceof Token.Comment.class) {
            param02 = token1.content;
            content = param02;
            tmp4 = Str.concat2("Comment(", content);
            return Str.concat2(tmp4, ")")
          } else if (token1 instanceof Token.Identifier.class) {
            param01 = token1.name;
            param11 = token1.symbolic;
            name = param01;
            symbolic = param11;
            tmp5 = Str.concat2("Identifier(", name);
            tmp6 = Str.concat2(tmp5, ", ");
            tmp7 = Str.concat2(tmp6, symbolic);
            return Str.concat2(tmp7, ")")
          } else if (token1 instanceof Token.Literal.class) {
            param0 = token1.kind;
            param1 = token1.literal;
            kind = param0;
            literal4 = param1;
            tmp8 = Token.display(kind);
            tmp9 = Str.concat2("Literal(", tmp8);
            tmp10 = Str.concat2(tmp9, ", ");
            tmp11 = Str.concat2(tmp10, literal4);
            return Str.concat2(tmp11, ")")
          } else if (token1 instanceof Lexer.Round.class) {
            return "Round"
          } else if (token1 instanceof Lexer.Square.class) {
            return "Square"
          } else if (token1 instanceof Lexer.Curly.class) {
            return "Curly"
          } else if (token1 instanceof Lexer.LiteralKind.Integer.class) {
            return "Integer"
          } else if (token1 instanceof Lexer.LiteralKind.Decimal.class) {
            return "Decimal"
          } else if (token1 instanceof Lexer.LiteralKind.String.class) {
            return "String"
          } else if (token1 instanceof Lexer.LiteralKind.Boolean.class) {
            return "Boolean"
          } else {
            throw new globalThis.Error("match error");
          }
        }
      }
      static toString() { return "Token"; }
    };
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
    this.Char = class Char {
      static {
        const Operator$class = class Operator {
          constructor() {}
          unapply(scrut) {
            if (scrut === "!") {
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
          unapplyStringPrefix(topic) {
            let cond, sliced, cond1, sliced1, cond2, sliced2, cond3, sliced3, cond4, sliced4, cond5, sliced5, cond6, sliced6, cond7, sliced7, cond8, sliced8, cond9, sliced9, cond10, sliced10, cond11, sliced11, cond12, sliced12, cond13, sliced13, cond14, sliced14, cond15, sliced15, cond16, sliced16, cond17, sliced17, cond18, sliced18;
            cond = globalThis.Predef.stringStartsWith(topic, "!");
            if (cond === true) {
              sliced = globalThis.Predef.stringDrop(topic, 1);
              return runtime.safeCall(globalThis.Predef.MatchResult([
                sliced
              ]))
            } else {
              cond1 = globalThis.Predef.stringStartsWith(topic, "#");
              if (cond1 === true) {
                sliced1 = globalThis.Predef.stringDrop(topic, 1);
                return runtime.safeCall(globalThis.Predef.MatchResult([
                  sliced1
                ]))
              } else {
                cond2 = globalThis.Predef.stringStartsWith(topic, "%");
                if (cond2 === true) {
                  sliced2 = globalThis.Predef.stringDrop(topic, 1);
                  return runtime.safeCall(globalThis.Predef.MatchResult([
                    sliced2
                  ]))
                } else {
                  cond3 = globalThis.Predef.stringStartsWith(topic, "&");
                  if (cond3 === true) {
                    sliced3 = globalThis.Predef.stringDrop(topic, 1);
                    return runtime.safeCall(globalThis.Predef.MatchResult([
                      sliced3
                    ]))
                  } else {
                    cond4 = globalThis.Predef.stringStartsWith(topic, "*");
                    if (cond4 === true) {
                      sliced4 = globalThis.Predef.stringDrop(topic, 1);
                      return runtime.safeCall(globalThis.Predef.MatchResult([
                        sliced4
                      ]))
                    } else {
                      cond5 = globalThis.Predef.stringStartsWith(topic, "+");
                      if (cond5 === true) {
                        sliced5 = globalThis.Predef.stringDrop(topic, 1);
                        return runtime.safeCall(globalThis.Predef.MatchResult([
                          sliced5
                        ]))
                      } else {
                        cond6 = globalThis.Predef.stringStartsWith(topic, "-");
                        if (cond6 === true) {
                          sliced6 = globalThis.Predef.stringDrop(topic, 1);
                          return runtime.safeCall(globalThis.Predef.MatchResult([
                            sliced6
                          ]))
                        } else {
                          cond7 = globalThis.Predef.stringStartsWith(topic, "/");
                          if (cond7 === true) {
                            sliced7 = globalThis.Predef.stringDrop(topic, 1);
                            return runtime.safeCall(globalThis.Predef.MatchResult([
                              sliced7
                            ]))
                          } else {
                            cond8 = globalThis.Predef.stringStartsWith(topic, ":");
                            if (cond8 === true) {
                              sliced8 = globalThis.Predef.stringDrop(topic, 1);
                              return runtime.safeCall(globalThis.Predef.MatchResult([
                                sliced8
                              ]))
                            } else {
                              cond9 = globalThis.Predef.stringStartsWith(topic, "<");
                              if (cond9 === true) {
                                sliced9 = globalThis.Predef.stringDrop(topic, 1);
                                return runtime.safeCall(globalThis.Predef.MatchResult([
                                  sliced9
                                ]))
                              } else {
                                cond10 = globalThis.Predef.stringStartsWith(topic, "=");
                                if (cond10 === true) {
                                  sliced10 = globalThis.Predef.stringDrop(topic, 1);
                                  return runtime.safeCall(globalThis.Predef.MatchResult([
                                    sliced10
                                  ]))
                                } else {
                                  cond11 = globalThis.Predef.stringStartsWith(topic, ">");
                                  if (cond11 === true) {
                                    sliced11 = globalThis.Predef.stringDrop(topic, 1);
                                    return runtime.safeCall(globalThis.Predef.MatchResult([
                                      sliced11
                                    ]))
                                  } else {
                                    cond12 = globalThis.Predef.stringStartsWith(topic, "?");
                                    if (cond12 === true) {
                                      sliced12 = globalThis.Predef.stringDrop(topic, 1);
                                      return runtime.safeCall(globalThis.Predef.MatchResult([
                                        sliced12
                                      ]))
                                    } else {
                                      cond13 = globalThis.Predef.stringStartsWith(topic, "@");
                                      if (cond13 === true) {
                                        sliced13 = globalThis.Predef.stringDrop(topic, 1);
                                        return runtime.safeCall(globalThis.Predef.MatchResult([
                                          sliced13
                                        ]))
                                      } else {
                                        cond14 = globalThis.Predef.stringStartsWith(topic, "\\");
                                        if (cond14 === true) {
                                          sliced14 = globalThis.Predef.stringDrop(topic, 1);
                                          return runtime.safeCall(globalThis.Predef.MatchResult([
                                            sliced14
                                          ]))
                                        } else {
                                          cond15 = globalThis.Predef.stringStartsWith(topic, "^");
                                          if (cond15 === true) {
                                            sliced15 = globalThis.Predef.stringDrop(topic, 1);
                                            return runtime.safeCall(globalThis.Predef.MatchResult([
                                              sliced15
                                            ]))
                                          } else {
                                            cond16 = globalThis.Predef.stringStartsWith(topic, "|");
                                            if (cond16 === true) {
                                              sliced16 = globalThis.Predef.stringDrop(topic, 1);
                                              return runtime.safeCall(globalThis.Predef.MatchResult([
                                                sliced16
                                              ]))
                                            } else {
                                              cond17 = globalThis.Predef.stringStartsWith(topic, "~");
                                              if (cond17 === true) {
                                                sliced17 = globalThis.Predef.stringDrop(topic, 1);
                                                return runtime.safeCall(globalThis.Predef.MatchResult([
                                                  sliced17
                                                ]))
                                              } else {
                                                cond18 = globalThis.Predef.stringStartsWith(topic, ".");
                                                if (cond18 === true) {
                                                  sliced18 = globalThis.Predef.stringDrop(topic, 1);
                                                  return runtime.safeCall(globalThis.Predef.MatchResult([
                                                    sliced18
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
          toString() { return "Operator"; }
        };
        this.Operator = new Operator$class;
        this.Operator.class = Operator$class;
        const Letter$class = class Letter {
          constructor() {}
          unapply(scrut) {
            let gtLo, ltHi, gtLo1, ltHi1;
            gtLo = "a" <= scrut;
            if (gtLo === true) {
              ltHi = scrut <= "z";
              if (ltHi === true) {
                return runtime.safeCall(globalThis.Predef.MatchResult([]))
              } else {
                gtLo1 = "A" <= scrut;
                if (gtLo1 === true) {
                  ltHi1 = scrut <= "Z";
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
                ltHi1 = scrut <= "Z";
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
            matchResult = runtime.safeCall(Char.IdentifierStart.unapply(scrut));
            if (matchResult instanceof globalThis.Predef.MatchResult.class) {
              return runtime.safeCall(globalThis.Predef.MatchResult([]))
            } else {
              matchResult1 = runtime.safeCall(Char.Digit.unapply(scrut));
              if (matchResult1 instanceof globalThis.Predef.MatchResult.class) {
                return runtime.safeCall(globalThis.Predef.MatchResult([]))
              } else {
                return runtime.safeCall(globalThis.Predef.MatchFailure())
              }
            }
          } 
          unapplyStringPrefix(topic) {
            let matchResult, arg, postfix, matchResult1, arg1, postfix1;
            matchResult = runtime.safeCall(Char.IdentifierStart.unapplyStringPrefix(topic));
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
                return runtime.safeCall(globalThis.Predef.MatchFailure())
              }
            }
          }
          toString() { return "IdentifierBody"; }
        };
        this.IdentifierBody = new IdentifierBody$class;
        this.IdentifierBody.class = IdentifierBody$class;
        const Space$class = class Space1 {
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
          toString() { return "Space"; }
        };
        this.Space = new Space$class;
        this.Space.class = Space$class;
        const Zero$class = class Zero {
          constructor() {}
          unapply(scrut) {
            if (scrut === "0") {
              return runtime.safeCall(globalThis.Predef.MatchResult([]))
            } else {
              return runtime.safeCall(globalThis.Predef.MatchFailure())
            }
          } 
          unapplyStringPrefix(topic) {
            let cond, sliced;
            cond = globalThis.Predef.stringStartsWith(topic, "0");
            if (cond === true) {
              sliced = globalThis.Predef.stringDrop(topic, 1);
              return runtime.safeCall(globalThis.Predef.MatchResult([
                sliced
              ]))
            } else {
              return runtime.safeCall(globalThis.Predef.MatchFailure())
            }
          }
          toString() { return "Zero"; }
        };
        this.Zero = new Zero$class;
        this.Zero.class = Zero$class;
      }
      static isDigit(ch) {
        let matchResult;
        matchResult = runtime.safeCall(Char.Digit.unapply(ch));
        if (matchResult instanceof globalThis.Predef.MatchResult.class) {
          return true
        } else {
          return false
        }
      } 
      static isHexDigit(ch1) {
        let matchResult;
        matchResult = runtime.safeCall(Char.HexDigit.unapply(ch1));
        if (matchResult instanceof globalThis.Predef.MatchResult.class) {
          return true
        } else {
          return false
        }
      } 
      static isOctDigit(ch2) {
        let matchResult;
        matchResult = runtime.safeCall(Char.OctDigit.unapply(ch2));
        if (matchResult instanceof globalThis.Predef.MatchResult.class) {
          return true
        } else {
          return false
        }
      } 
      static isBinDigit(ch3) {
        let matchResult;
        matchResult = runtime.safeCall(Char.BinDigit.unapply(ch3));
        if (matchResult instanceof globalThis.Predef.MatchResult.class) {
          return true
        } else {
          return false
        }
      }
      static toString() { return "Char"; }
    };
  }
  static lex(str) {
    let number, hex, identifier, digits, char1, take, whitespace, scan, string, operator, comment;
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
          matchResult = runtime.safeCall(Lexer.Char.Space.unapply(param0));
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
          matchResult = runtime.safeCall(Lexer.Char.Digit.unapply(param0));
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
          matchResult = runtime.safeCall(Lexer.Char.Digit.unapply(param0));
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
          matchResult = runtime.safeCall(Lexer.Char.IdentifierBody.unapply(param0));
          if (matchResult instanceof globalThis.Predef.MatchResult.class) {
            ch = param0;
            tmp = idx + 1;
            idx = tmp;
            tmp1 = acc + ch;
            acc = tmp1;
            tmp2 = runtime.Unit;
            continue tmp5;
          } else {
            if (acc === "begin") {
              tmp3 = Lexer.Token.Open(Lexer.BeginEnd);
            } else if (acc === "end") {
              tmp3 = Lexer.Token.Close(Lexer.BeginEnd);
            } else if (acc === "true") {
              tmp3 = Lexer.Token.boolean("true");
            } else if (acc === "false") {
              tmp3 = Lexer.Token.boolean("false");
            } else {
              tmp3 = Lexer.Token.Identifier(acc, false);
            }
            tmp2 = Predef.tuple(idx, tmp3);
          }
        } else {
          if (acc === "begin") {
            tmp4 = Lexer.Token.Open(Lexer.BeginEnd);
          } else if (acc === "end") {
            tmp4 = Lexer.Token.Close(Lexer.BeginEnd);
          } else if (acc === "true") {
            tmp4 = Lexer.Token.boolean("true");
          } else if (acc === "false") {
            tmp4 = Lexer.Token.boolean("false");
          } else {
            tmp4 = Lexer.Token.Identifier(acc, false);
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
          matchResult = runtime.safeCall(Lexer.Char.Operator.unapply(param0));
          if (matchResult instanceof globalThis.Predef.MatchResult.class) {
            ch = param0;
            tmp = idx + 1;
            idx = tmp;
            tmp1 = acc + ch;
            acc = tmp1;
            tmp2 = runtime.Unit;
            continue tmp5;
          } else {
            tmp3 = Lexer.Token.Identifier(acc, true);
            tmp2 = [
              idx,
              tmp3
            ];
          }
        } else {
          tmp4 = Lexer.Token.Identifier(acc, true);
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
      let content, scrut, param0, ch, matchResult, terminated, scrut1, param01, ch1, scrut2, param02, scrut3, param03, ch2, scrut4, tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19;
      content = "";
      scrut = char1(idx);
      if (scrut instanceof Option.Some.class) {
        param0 = scrut.value;
        if (param0 === "/") {
          tmp = idx + 1;
          idx = tmp;
          tmp20: while (true) {
            scrut3 = char1(idx);
            if (scrut3 instanceof Option.Some.class) {
              param03 = scrut3.value;
              ch2 = param03;
              scrut4 = ch2 !== "\n";
              if (scrut4 === true) {
                tmp1 = idx + 1;
                idx = tmp1;
                tmp2 = content + ch2;
                content = tmp2;
                tmp3 = runtime.Unit;
                continue tmp20;
              } else {
                tmp4 = Lexer.Token.Comment(content);
                tmp3 = [
                  idx,
                  tmp4
                ];
              }
            } else {
              tmp5 = Lexer.Token.Comment(content);
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
          tmp21: while (true) {
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
                      continue tmp21;
                    } else {
                      ch1 = param01;
                      tmp10 = idx + 1;
                      idx = tmp10;
                      tmp11 = content + ch1;
                      content = tmp11;
                      tmp9 = runtime.Unit;
                    }
                  } else {
                    ch1 = param01;
                    tmp12 = idx + 1;
                    idx = tmp12;
                    tmp13 = content + ch1;
                    content = tmp13;
                    tmp9 = runtime.Unit;
                  }
                } else {
                  ch1 = param01;
                  tmp14 = idx + 1;
                  idx = tmp14;
                  tmp15 = content + ch1;
                  content = tmp15;
                  tmp9 = runtime.Unit;
                }
              } else {
                if (terminated === true) {
                  tmp16 = Lexer.Token.Comment(content);
                  tmp17 = [
                    idx,
                    tmp16
                  ];
                } else {
                  tmp17 = [
                    idx,
                    Lexer.Token.Error
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
          matchResult = runtime.safeCall(Lexer.Char.IdentifierStart.unapply(param0));
          if (matchResult instanceof globalThis.Predef.MatchResult.class) {
            ch = param0;
            tmp18 = Str.concat2("/", ch);
            tmp19 = idx + 1;
            return operator(tmp18, tmp19)
          } else {
            return [
              idx,
              Lexer.Token.Error
            ]
          }
        }
      } else {
        return [
          idx,
          Lexer.Token.Error
        ]
      }
    };
    string = function string(idx) {
      let dummy, content, terminated, scrut, param0, ch, scrut1, scrut2, tmp, tmp1, tmp2, tmp3, tmp4;
      dummy = function dummy(ch1) {
        return true
      };
      content = "";
      terminated = false;
      tmp5: while (true) {
        if (terminated === false) {
          scrut = char1(idx);
          if (scrut instanceof Option.Some.class) {
            param0 = scrut.value;
            ch = param0;
            scrut2 = ch == "\"";
            if (scrut2 === true) {
              terminated = true;
              tmp = idx + 1;
              idx = tmp;
              tmp1 = runtime.Unit;
              continue tmp5;
            } else {
              scrut1 = dummy(ch);
              if (scrut1 === true) {
                tmp2 = idx + 1;
                idx = tmp2;
                tmp3 = content + ch;
                content = tmp3;
                tmp1 = runtime.Unit;
                continue tmp5;
              } else {
                tmp1 = runtime.Unit;
              }
            }
          } else {
            tmp1 = runtime.Unit;
          }
        } else {
          tmp1 = runtime.Unit;
        }
        break;
      }
      if (terminated === true) {
        tmp4 = Lexer.Token.Literal(Lexer.LiteralKind.String, content);
        return [
          idx,
          tmp4
        ]
      } else {
        return [
          idx,
          Lexer.Token.Error
        ]
      }
    };
    number = function number(idx, head) {
      let scrut, first1, first0, idx$_, integer, scrut1, param0, scrut2, first11, first01, idx$_$_, fraction, scrut3, param01, scrut4, first12, first02, idx$_1, integer1, scrut5, first13, first03, idx$_2, ds, scrut6, first14, first04, idx$_3, xs, scrut7, first15, first05, idx$_4, os, scrut8, first16, first06, idx$_5, bs, tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20, tmp21, tmp22, tmp23, tmp24, tmp25, tmp26, tmp27, tmp28, tmp29, tmp30, tmp31, tmp32, tmp33, tmp34, tmp35, tmp36, tmp37, tmp38, tmp39, tmp40, tmp41, tmp42, tmp43, tmp44, tmp45, tmp46, tmp47, tmp48, tmp49, tmp50, tmp51, tmp52, tmp53, tmp54, tmp55, tmp56, tmp57, tmp58, tmp59, tmp60, tmp61, tmp62, tmp63, tmp64, tmp65, tmp66;
      if (head === "0") {
        scrut3 = char1(idx);
        if (scrut3 instanceof Option.None.class) {
          tmp = Lexer.Token.integer("0");
          return [
            idx,
            tmp
          ]
        } else if (scrut3 instanceof Option.Some.class) {
          param01 = scrut3.value;
          if (param01 === "b") {
            tmp1 = idx + 1;
            scrut8 = take(Lexer.Char.isBinDigit, tmp1, "");
            if (globalThis.Array.isArray(scrut8) && scrut8.length === 2) {
              first06 = scrut8[0];
              first16 = scrut8[1];
              idx$_5 = first06;
              bs = first16;
              tmp2 = Str.concat2("0b", bs);
              tmp3 = Lexer.Token.integer(tmp2);
              return [
                idx$_5,
                tmp3
              ]
            } else {
              scrut4 = digits(idx, head);
              if (globalThis.Array.isArray(scrut4) && scrut4.length === 2) {
                first02 = scrut4[0];
                first12 = scrut4[1];
                idx$_1 = first02;
                integer1 = first12;
                tmp4 = Lexer.Token.integer(integer1);
                return [
                  idx$_1,
                  tmp4
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
                      tmp5 = idx$_ + 1;
                      scrut2 = digits(tmp5, "");
                      if (globalThis.Array.isArray(scrut2) && scrut2.length === 2) {
                        first01 = scrut2[0];
                        first11 = scrut2[1];
                        idx$_$_ = first01;
                        fraction = first11;
                        tmp6 = Str.concat2(integer, ".");
                        tmp7 = Str.concat2(tmp6, fraction);
                        tmp8 = Lexer.Token.decimal(tmp7);
                        return [
                          idx$_$_,
                          tmp8
                        ]
                      } else {
                        tmp9 = Lexer.Token.integer(integer);
                        return [
                          idx$_,
                          tmp9
                        ]
                      }
                    } else {
                      tmp10 = Lexer.Token.integer(integer);
                      return [
                        idx$_,
                        tmp10
                      ]
                    }
                  } else {
                    tmp11 = Lexer.Token.integer(integer);
                    return [
                      idx$_,
                      tmp11
                    ]
                  }
                } else {
                  throw new globalThis.Error("match error");
                }
              }
            }
          } else if (param01 === "o") {
            tmp12 = idx + 1;
            scrut7 = take(Lexer.Char.isOctDigit, tmp12, "");
            if (globalThis.Array.isArray(scrut7) && scrut7.length === 2) {
              first05 = scrut7[0];
              first15 = scrut7[1];
              idx$_4 = first05;
              os = first15;
              tmp13 = Str.concat2("0o", os);
              tmp14 = Lexer.Token.integer(tmp13);
              return [
                idx$_4,
                tmp14
              ]
            } else {
              scrut4 = digits(idx, head);
              if (globalThis.Array.isArray(scrut4) && scrut4.length === 2) {
                first02 = scrut4[0];
                first12 = scrut4[1];
                idx$_1 = first02;
                integer1 = first12;
                tmp15 = Lexer.Token.integer(integer1);
                return [
                  idx$_1,
                  tmp15
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
                      tmp16 = idx$_ + 1;
                      scrut2 = digits(tmp16, "");
                      if (globalThis.Array.isArray(scrut2) && scrut2.length === 2) {
                        first01 = scrut2[0];
                        first11 = scrut2[1];
                        idx$_$_ = first01;
                        fraction = first11;
                        tmp17 = Str.concat2(integer, ".");
                        tmp18 = Str.concat2(tmp17, fraction);
                        tmp19 = Lexer.Token.decimal(tmp18);
                        return [
                          idx$_$_,
                          tmp19
                        ]
                      } else {
                        tmp20 = Lexer.Token.integer(integer);
                        return [
                          idx$_,
                          tmp20
                        ]
                      }
                    } else {
                      tmp21 = Lexer.Token.integer(integer);
                      return [
                        idx$_,
                        tmp21
                      ]
                    }
                  } else {
                    tmp22 = Lexer.Token.integer(integer);
                    return [
                      idx$_,
                      tmp22
                    ]
                  }
                } else {
                  throw new globalThis.Error("match error");
                }
              }
            }
          } else if (param01 === "x") {
            tmp23 = idx + 1;
            scrut6 = take(Lexer.Char.isHexDigit, tmp23, "");
            if (globalThis.Array.isArray(scrut6) && scrut6.length === 2) {
              first04 = scrut6[0];
              first14 = scrut6[1];
              idx$_3 = first04;
              xs = first14;
              tmp24 = Str.concat2("0x", xs);
              tmp25 = Lexer.Token.integer(tmp24);
              return [
                idx$_3,
                tmp25
              ]
            } else {
              scrut4 = digits(idx, head);
              if (globalThis.Array.isArray(scrut4) && scrut4.length === 2) {
                first02 = scrut4[0];
                first12 = scrut4[1];
                idx$_1 = first02;
                integer1 = first12;
                tmp26 = Lexer.Token.integer(integer1);
                return [
                  idx$_1,
                  tmp26
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
                      tmp27 = idx$_ + 1;
                      scrut2 = digits(tmp27, "");
                      if (globalThis.Array.isArray(scrut2) && scrut2.length === 2) {
                        first01 = scrut2[0];
                        first11 = scrut2[1];
                        idx$_$_ = first01;
                        fraction = first11;
                        tmp28 = Str.concat2(integer, ".");
                        tmp29 = Str.concat2(tmp28, fraction);
                        tmp30 = Lexer.Token.decimal(tmp29);
                        return [
                          idx$_$_,
                          tmp30
                        ]
                      } else {
                        tmp31 = Lexer.Token.integer(integer);
                        return [
                          idx$_,
                          tmp31
                        ]
                      }
                    } else {
                      tmp32 = Lexer.Token.integer(integer);
                      return [
                        idx$_,
                        tmp32
                      ]
                    }
                  } else {
                    tmp33 = Lexer.Token.integer(integer);
                    return [
                      idx$_,
                      tmp33
                    ]
                  }
                } else {
                  throw new globalThis.Error("match error");
                }
              }
            }
          } else if (param01 === ".") {
            tmp34 = idx + 1;
            scrut5 = digits(tmp34);
            if (globalThis.Array.isArray(scrut5) && scrut5.length === 2) {
              first03 = scrut5[0];
              first13 = scrut5[1];
              idx$_2 = first03;
              ds = first13;
              tmp35 = Str.concat2("0.", ds);
              tmp36 = Lexer.Token.decimal(tmp35);
              return [
                idx$_2,
                tmp36
              ]
            } else {
              scrut4 = digits(idx, head);
              if (globalThis.Array.isArray(scrut4) && scrut4.length === 2) {
                first02 = scrut4[0];
                first12 = scrut4[1];
                idx$_1 = first02;
                integer1 = first12;
                tmp37 = Lexer.Token.integer(integer1);
                return [
                  idx$_1,
                  tmp37
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
                      tmp38 = idx$_ + 1;
                      scrut2 = digits(tmp38, "");
                      if (globalThis.Array.isArray(scrut2) && scrut2.length === 2) {
                        first01 = scrut2[0];
                        first11 = scrut2[1];
                        idx$_$_ = first01;
                        fraction = first11;
                        tmp39 = Str.concat2(integer, ".");
                        tmp40 = Str.concat2(tmp39, fraction);
                        tmp41 = Lexer.Token.decimal(tmp40);
                        return [
                          idx$_$_,
                          tmp41
                        ]
                      } else {
                        tmp42 = Lexer.Token.integer(integer);
                        return [
                          idx$_,
                          tmp42
                        ]
                      }
                    } else {
                      tmp43 = Lexer.Token.integer(integer);
                      return [
                        idx$_,
                        tmp43
                      ]
                    }
                  } else {
                    tmp44 = Lexer.Token.integer(integer);
                    return [
                      idx$_,
                      tmp44
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
              tmp45 = Lexer.Token.integer(integer1);
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
                      tmp49 = Lexer.Token.decimal(tmp48);
                      return [
                        idx$_$_,
                        tmp49
                      ]
                    } else {
                      tmp50 = Lexer.Token.integer(integer);
                      return [
                        idx$_,
                        tmp50
                      ]
                    }
                  } else {
                    tmp51 = Lexer.Token.integer(integer);
                    return [
                      idx$_,
                      tmp51
                    ]
                  }
                } else {
                  tmp52 = Lexer.Token.integer(integer);
                  return [
                    idx$_,
                    tmp52
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
                tmp53 = idx$_ + 1;
                scrut2 = digits(tmp53, "");
                if (globalThis.Array.isArray(scrut2) && scrut2.length === 2) {
                  first01 = scrut2[0];
                  first11 = scrut2[1];
                  idx$_$_ = first01;
                  fraction = first11;
                  tmp54 = Str.concat2(integer, ".");
                  tmp55 = Str.concat2(tmp54, fraction);
                  tmp56 = Lexer.Token.decimal(tmp55);
                  return [
                    idx$_$_,
                    tmp56
                  ]
                } else {
                  tmp57 = Lexer.Token.integer(integer);
                  return [
                    idx$_,
                    tmp57
                  ]
                }
              } else {
                tmp58 = Lexer.Token.integer(integer);
                return [
                  idx$_,
                  tmp58
                ]
              }
            } else {
              tmp59 = Lexer.Token.integer(integer);
              return [
                idx$_,
                tmp59
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
              tmp60 = idx$_ + 1;
              scrut2 = digits(tmp60, "");
              if (globalThis.Array.isArray(scrut2) && scrut2.length === 2) {
                first01 = scrut2[0];
                first11 = scrut2[1];
                idx$_$_ = first01;
                fraction = first11;
                tmp61 = Str.concat2(integer, ".");
                tmp62 = Str.concat2(tmp61, fraction);
                tmp63 = Lexer.Token.decimal(tmp62);
                return [
                  idx$_$_,
                  tmp63
                ]
              } else {
                tmp64 = Lexer.Token.integer(integer);
                return [
                  idx$_,
                  tmp64
                ]
              }
            } else {
              tmp65 = Lexer.Token.integer(integer);
              return [
                idx$_,
                tmp65
              ]
            }
          } else {
            tmp66 = Lexer.Token.integer(integer);
            return [
              idx$_,
              tmp66
            ]
          }
        } else {
          throw new globalThis.Error("match error");
        }
      }
    };
    scan = function scan(idx, acc) {
      let go, scrut, param0, other, ch, matchResult, ch1, matchResult1, ch2, matchResult2, matchResult3, tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20, tmp21, tmp22, tmp23, tmp24, tmp25, tmp26, tmp27, tmp28, tmp29;
      go = function go(idx1, tok) {
        let tmp30;
        tmp30 = Stack.Cons(tok, acc);
        return scan(idx1, tmp30)
      };
      scrut = char1(idx);
      if (scrut instanceof Option.None.class) {
        return Stack.reverse(acc)
      } else if (scrut instanceof Option.Some.class) {
        param0 = scrut.value;
        matchResult3 = runtime.safeCall(Lexer.Char.Space.unapply(param0));
        if (matchResult3 instanceof globalThis.Predef.MatchResult.class) {
          tmp = idx + 1;
          tmp1 = whitespace(tmp);
          return go(tmp1, Lexer.Token.Space)
        } else {
          if (param0 === ",") {
            tmp2 = idx + 1;
            return go(tmp2, Lexer.Token.Comma)
          } else if (param0 === ";") {
            tmp3 = idx + 1;
            return go(tmp3, Lexer.Token.Semicolon)
          } else if (param0 === "\"") {
            tmp4 = idx + 1;
            tmp5 = string(tmp4);
            return go(...tmp5)
          } else if (param0 === "(") {
            tmp6 = idx + 1;
            tmp7 = Lexer.Token.Open(Lexer.Round);
            return go(tmp6, tmp7)
          } else if (param0 === "[") {
            tmp8 = idx + 1;
            tmp9 = Lexer.Token.Open(Lexer.Square);
            return go(tmp8, tmp9)
          } else if (param0 === "{") {
            tmp10 = idx + 1;
            tmp11 = Lexer.Token.Open(Lexer.Curly);
            return go(tmp10, tmp11)
          } else if (param0 === ")") {
            tmp12 = idx + 1;
            tmp13 = Lexer.Token.Close(Lexer.Round);
            return go(tmp12, tmp13)
          } else if (param0 === "]") {
            tmp14 = idx + 1;
            tmp15 = Lexer.Token.Close(Lexer.Square);
            return go(tmp14, tmp15)
          } else if (param0 === "}") {
            tmp16 = idx + 1;
            tmp17 = Lexer.Token.Close(Lexer.Curly);
            return go(tmp16, tmp17)
          } else if (param0 === "/") {
            tmp18 = idx + 1;
            tmp19 = comment(tmp18);
            return go(...tmp19)
          } else {
            matchResult2 = runtime.safeCall(Lexer.Char.IdentifierStart.unapply(param0));
            if (matchResult2 instanceof globalThis.Predef.MatchResult.class) {
              ch2 = param0;
              tmp20 = idx + 1;
              tmp21 = identifier(tmp20, ch2);
              return go(...tmp21)
            } else {
              matchResult1 = runtime.safeCall(Lexer.Char.Operator.unapply(param0));
              if (matchResult1 instanceof globalThis.Predef.MatchResult.class) {
                ch1 = param0;
                tmp22 = idx + 1;
                tmp23 = operator(tmp22, ch1);
                return go(...tmp23)
              } else {
                matchResult = runtime.safeCall(Lexer.Char.Digit.unapply(param0));
                if (matchResult instanceof globalThis.Predef.MatchResult.class) {
                  ch = param0;
                  tmp24 = idx + 1;
                  tmp25 = number(tmp24, ch);
                  return go(...tmp25)
                } else {
                  other = param0;
                  tmp26 = Str.concat2("Unrecognized character: '", other);
                  tmp27 = Str.concat2(tmp26, "'");
                  tmp28 = Predef.print(tmp27);
                  tmp29 = idx + 1;
                  return go(tmp29, Lexer.Token.Error)
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
