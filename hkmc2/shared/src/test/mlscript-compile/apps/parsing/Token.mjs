import runtime from "./../../Runtime.mjs";
import Option from "./../../Option.mjs";
import Predef from "./../../Predef.mjs";
let Token2;
(class Token {
  static {
    Token2 = Token;
    const Angle$class = class Angle {
      constructor() {}
      toString() { return "Angle"; }
    };
    this.Angle = new Angle$class;
    this.Angle.class = Angle$class;
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
    (class LiteralKind {
      static {
        Token.LiteralKind = LiteralKind;
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
    });
    this.Token = class Token1 {
      #_location;
      constructor() {
        this.#_location = Option.None;
      }
      withLocation(start, end, lookupTable) {
        let tmp;
        tmp = Option.Some({
        "start": start, "end": end, "lookupTable": lookupTable
        });
        this.#_location = tmp;
        return this
      } 
      get location() {
        return this.#_location;
      } 
      get displayLocation() {
        let scrut, param0, location, start1, end1, tmp, tmp1, tmp2, tmp3, tmp4, tmp5;
        scrut = this.#_location;
        if (scrut instanceof Option.Some.class) {
          param0 = scrut.value;
          location = param0;
          tmp = runtime.safeCall(location.lookupTable.lookup(location.start));
          start1 = tmp;
          tmp1 = runtime.safeCall(location.lookupTable.lookup(location.end));
          end1 = tmp1;
          tmp2 = runtime.safeCall(start1[0].toString());
          tmp3 = runtime.safeCall(start1[1].toString());
          tmp4 = runtime.safeCall(end1[0].toString());
          tmp5 = runtime.safeCall(end1[1].toString());
          return Predef.mkStr(tmp2, ":", tmp3, "-", tmp4, ":", tmp5)
        } else {
          return ""
        }
      }
      toString() { return "Token"; }
    };
    this.LineLookupTable = function LineLookupTable(lines1) {
      return new LineLookupTable.class(lines1);
    };
    this.LineLookupTable.class = class LineLookupTable {
      #lines;
      constructor(lines) {
        this.#lines = lines;
      }
      lookup(index) {
        let scrut, begin, end, mid, scrut1, scrut2, line, column, scrut3, tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14;
        scrut = index < 0;
        if (scrut === true) {
          index = 0;
          tmp = runtime.Unit;
        } else {
          tmp = runtime.Unit;
        }
        begin = 0;
        end = this.#lines.length;
        tmp1 = begin + end;
        tmp2 = tmp1 / 2;
        tmp3 = runtime.safeCall(globalThis.Math.floor(tmp2));
        mid = tmp3;
        tmp15: while (true) {
          scrut1 = begin < end;
          if (scrut1 === true) {
            tmp4 = runtime.safeCall(this.#lines.at(mid));
            scrut2 = index <= tmp4;
            if (scrut2 === true) {
              end = mid;
              tmp5 = runtime.Unit;
            } else {
              tmp6 = mid + 1;
              begin = tmp6;
              tmp5 = runtime.Unit;
            }
            tmp7 = begin + end;
            tmp8 = tmp7 / 2;
            tmp9 = runtime.safeCall(globalThis.Math.floor(tmp8));
            mid = tmp9;
            tmp10 = runtime.Unit;
            continue tmp15;
          } else {
            tmp10 = runtime.Unit;
          }
          break;
        }
        tmp11 = mid + 1;
        line = tmp11;
        scrut3 = mid == 0;
        if (scrut3 === true) {
          tmp12 = - 1;
        } else {
          tmp13 = mid - 1;
          tmp12 = runtime.safeCall(this.#lines.at(tmp13));
        }
        tmp14 = index - tmp12;
        column = tmp14;
        return [
          line,
          column
        ]
      }
      toString() { return "LineLookupTable(" + "" + ")"; }
    };
    this.Space = function Space() {
      return new Space.class();
    };
    this.Space.class = class Space extends Token.Token {
      constructor() {
        super();
      }
      toString() { return "Space(" + "" + ")"; }
    };
    this.Error = function Error() {
      return new Error.class();
    };
    this.Error.class = class Error extends Token.Token {
      constructor() {
        super();
      }
      toString() { return "Error(" + "" + ")"; }
    };
    this.Comment = function Comment(content1) {
      return new Comment.class(content1);
    };
    this.Comment.class = class Comment extends Token.Token {
      constructor(content) {
        super();
        this.content = content;
      }
      toString() { return "Comment(" + runtime.render(this.content) + ")"; }
    };
    this.Identifier = function Identifier(name1, symbolic1) {
      return new Identifier.class(name1, symbolic1);
    };
    this.Identifier.class = class Identifier extends Token.Token {
      constructor(name, symbolic) {
        super();
        this.name = name;
        this.symbolic = symbolic;
      }
      toString() { return "Identifier(" + runtime.render(this.name) + ", " + runtime.render(this.symbolic) + ")"; }
    };
    this.Literal = function Literal(kind1, literal1) {
      return new Literal.class(kind1, literal1);
    };
    this.Literal.class = class Literal extends Token.Token {
      constructor(kind, literal) {
        super();
        this.kind = kind;
        this.literal = literal;
      }
      toString() { return "Literal(" + runtime.render(this.kind) + ", " + runtime.render(this.literal) + ")"; }
    };
  }
  static same(a, b) {
    let param0, param1, k, l, param01, param11, k$_, l$_, scrut, scrut1, param02, param12, n, s, param03, param13, n$_, s$_, scrut2, scrut3, param04, c, param05, c$_;
    if (a instanceof Token.Space.class) {
      if (b instanceof Token.Space.class) {
        return true
      } else {
        return false
      }
    } else if (a instanceof Token.Comment.class) {
      param04 = a.content;
      c = param04;
      if (b instanceof Token.Comment.class) {
        param05 = b.content;
        c$_ = param05;
        return c == c$_
      } else {
        return false
      }
    } else if (a instanceof Token.Identifier.class) {
      param02 = a.name;
      param12 = a.symbolic;
      n = param02;
      s = param12;
      if (b instanceof Token.Identifier.class) {
        param03 = b.name;
        param13 = b.symbolic;
        n$_ = param03;
        s$_ = param13;
        scrut2 = n == n$_;
        if (scrut2 === true) {
          scrut3 = s == s$_;
          if (scrut3 === true) {
            return true
          } else {
            return false
          }
        } else {
          return false
        }
      } else {
        return false
      }
    } else if (a instanceof Token.Literal.class) {
      param0 = a.kind;
      param1 = a.literal;
      k = param0;
      l = param1;
      if (b instanceof Token.Literal.class) {
        param01 = b.kind;
        param11 = b.literal;
        k$_ = param01;
        l$_ = param11;
        scrut = k == k$_;
        if (scrut === true) {
          scrut1 = l == l$_;
          if (scrut1 === true) {
            return true
          } else {
            return false
          }
        } else {
          return false
        }
      } else {
        return false
      }
    } else {
      return false
    }
  } 
  static integer(literal, endIndex) {
    return (llt) => {
      let tmp, tmp1;
      tmp = Token.Literal(Token.LiteralKind.Integer, literal);
      tmp1 = endIndex - literal.length;
      return runtime.safeCall(tmp.withLocation(tmp1, endIndex, llt))
    }
  } 
  static decimal(literal1, endIndex1) {
    return (llt) => {
      let tmp, tmp1;
      tmp = Token.Literal(Token.LiteralKind.Decimal, literal1);
      tmp1 = endIndex1 - literal1.length;
      return runtime.safeCall(tmp.withLocation(tmp1, endIndex1, llt))
    }
  } 
  static string(literal2, startIndex, endIndex2) {
    return (llt) => {
      let tmp;
      tmp = Token.Literal(Token.LiteralKind.String, literal2);
      return runtime.safeCall(tmp.withLocation(startIndex, endIndex2, llt))
    }
  } 
  static boolean(literal3, endIndex3) {
    return (llt) => {
      let tmp, tmp1;
      tmp = Token.Literal(Token.LiteralKind.Boolean, literal3);
      tmp1 = endIndex3 - literal3.length;
      return runtime.safeCall(tmp.withLocation(tmp1, endIndex3, llt))
    }
  } 
  static identifier(name, endIndex4) {
    return (llt) => {
      let tmp, tmp1;
      tmp = Token.Identifier(name, false);
      tmp1 = endIndex4 - name.length;
      return runtime.safeCall(tmp.withLocation(tmp1, endIndex4, llt))
    }
  } 
  static symbol(name1, endIndex5) {
    return (llt) => {
      let tmp, tmp1;
      tmp = Token.Identifier(name1, true);
      tmp1 = endIndex5 - name1.length;
      return runtime.safeCall(tmp.withLocation(tmp1, endIndex5, llt))
    }
  } 
  static comment(content, startIndex1, endIndex6) {
    return (llt) => {
      let tmp;
      tmp = Token.Comment(content);
      return runtime.safeCall(tmp.withLocation(startIndex1, endIndex6, llt))
    }
  } 
  static error(startIndex2, endIndex7) {
    return (llt) => {
      let tmp;
      tmp = Token.Error();
      return runtime.safeCall(tmp.withLocation(startIndex2, endIndex7, llt))
    }
  } 
  static space(startIndex3, endIndex8) {
    return (llt) => {
      let tmp;
      tmp = Token.Space();
      return runtime.safeCall(tmp.withLocation(startIndex3, endIndex8, llt))
    }
  } 
  static summary(token) {
    let param0, param1, literal4, param01, param11, name2, param02;
    if (token instanceof Token.Space.class) {
      return "\u2420"
    } else if (token instanceof Token.Error.class) {
      return "\u26A0"
    } else if (token instanceof Token.Comment.class) {
      param02 = token.content;
      return "\uD83D\uDCAC"
    } else if (token instanceof Token.Identifier.class) {
      param01 = token.name;
      param11 = token.symbolic;
      name2 = param01;
      return name2
    } else if (token instanceof Token.Literal.class) {
      param0 = token.kind;
      param1 = token.literal;
      literal4 = param1;
      return literal4
    } else {
      throw new globalThis.Error("match error");
    }
  } 
  static display(token1) {
    let param0, param1, kind, value, param01, param11, name2, tmp, tmp1, tmp2, tmp3, tmp4, tmp5;
    if (token1 instanceof Token.Space.class) {
      tmp = "space";
    } else if (token1 instanceof Token.Error.class) {
      tmp = "error";
    } else if (token1 instanceof Token.Comment.class) {
      tmp = "comment";
    } else if (token1 instanceof Token.Identifier.class) {
      param01 = token1.name;
      param11 = token1.symbolic;
      name2 = param01;
      tmp1 = "identifier `" + name2;
      tmp = tmp1 + "`";
    } else if (token1 instanceof Token.Literal.class) {
      param0 = token1.kind;
      param1 = token1.literal;
      kind = param0;
      value = param1;
      tmp2 = runtime.safeCall(kind.toString());
      tmp3 = runtime.safeCall(tmp2.toLowerCase());
      tmp4 = runtime.safeCall(globalThis.JSON.stringify(value));
      tmp = Predef.mkStr(tmp3, " ", tmp4);
    } else {
      throw new globalThis.Error("match error");
    }
    tmp5 = tmp + " at ";
    return tmp5 + token1.displayLocation
  }
  static toString() { return "Token"; }
});
let Token = Token2; export default Token;
