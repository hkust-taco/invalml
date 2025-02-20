import runtime from "./../../Runtime.mjs";
let Token1;
Token1 = class Token {
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
    this.TypeVariable = function TypeVariable(name1) { return new TypeVariable.class(name1); };
    this.TypeVariable.class = class TypeVariable {
      constructor(name) {
        this.name = name;
      }
      toString() { return "TypeVariable(" + globalThis.Predef.render(this.name) + ")"; }
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
  static same(a, b) {
    let param0, param1, k, l, param01, param11, k$_, l$_, scrut, scrut1, param02, n, param03, n$_, param04, param12, n1, s, param05, param13, n$_1, s$_, scrut2, scrut3, param06, c, param07, c$_, param08, k1, param09, k$_1, param010, k2, param011, k$_2;
    if (a instanceof Token.Space.class) {
      if (b instanceof Token.Space.class) {
        return true
      } else {
        return false
      }
    } else if (a instanceof Token.Comma.class) {
      if (b instanceof Token.Comma.class) {
        return true
      } else {
        return false
      }
    } else if (a instanceof Token.Semicolon.class) {
      if (b instanceof Token.Semicolon.class) {
        return true
      } else {
        return false
      }
    } else if (a instanceof Token.Open.class) {
      param010 = a.kind;
      k2 = param010;
      if (b instanceof Token.Open.class) {
        param011 = b.kind;
        k$_2 = param011;
        return k2 == k$_2
      } else {
        return false
      }
    } else if (a instanceof Token.Close.class) {
      param08 = a.kind;
      k1 = param08;
      if (b instanceof Token.Close.class) {
        param09 = b.kind;
        k$_1 = param09;
        return k1 == k$_1
      } else {
        return false
      }
    } else if (a instanceof Token.Comment.class) {
      param06 = a.content;
      c = param06;
      if (b instanceof Token.Comment.class) {
        param07 = b.content;
        c$_ = param07;
        return c == c$_
      } else {
        return false
      }
    } else if (a instanceof Token.Identifier.class) {
      param04 = a.name;
      param12 = a.symbolic;
      n1 = param04;
      s = param12;
      if (b instanceof Token.Identifier.class) {
        param05 = b.name;
        param13 = b.symbolic;
        n$_1 = param05;
        s$_ = param13;
        scrut2 = n1 == n$_1;
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
    } else if (a instanceof Token.TypeVariable.class) {
      param02 = a.name;
      n = param02;
      if (b instanceof Token.TypeVariable.class) {
        param03 = b.name;
        n$_ = param03;
        return n == n$_
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
  static integer(literal) {
    return Token.Literal(Token.LiteralKind.Integer, literal)
  } 
  static decimal(literal1) {
    return Token.Literal(Token.LiteralKind.Decimal, literal1)
  } 
  static string(literal2) {
    return Token.Literal(Token.LiteralKind.String, literal2)
  } 
  static boolean(literal3) {
    return Token.Literal(Token.LiteralKind.Boolean, literal3)
  } 
  static summary(token) {
    let param0, param1, literal4, param01, name, param02, param11, name1, param03, param04, kind, param05, kind1;
    if (token instanceof Token.Space.class) {
      return "\u2420"
    } else if (token instanceof Token.Comma.class) {
      return ","
    } else if (token instanceof Token.Semicolon.class) {
      return ";"
    } else if (token instanceof Token.Error.class) {
      return "\u26A0"
    } else if (token instanceof Token.Open.class) {
      param05 = token.kind;
      kind1 = param05;
      if (kind1 instanceof Token.Round.class) {
        return "("
      } else if (kind1 instanceof Token.Square.class) {
        return "["
      } else if (kind1 instanceof Token.Curly.class) {
        return "{"
      } else if (kind1 instanceof Token.BeginEnd.class) {
        return "begin"
      } else {
        throw new globalThis.Error("match error");
      }
    } else if (token instanceof Token.Close.class) {
      param04 = token.kind;
      kind = param04;
      if (kind instanceof Token.Round.class) {
        return ")"
      } else if (kind instanceof Token.Square.class) {
        return "]"
      } else if (kind instanceof Token.Curly.class) {
        return "}"
      } else if (kind instanceof Token.BeginEnd.class) {
        return "end"
      } else {
        throw new globalThis.Error("match error");
      }
    } else if (token instanceof Token.Comment.class) {
      param03 = token.content;
      return "\uD83D\uDCAC"
    } else if (token instanceof Token.Identifier.class) {
      param02 = token.name;
      param11 = token.symbolic;
      name1 = param02;
      return name1
    } else if (token instanceof Token.TypeVariable.class) {
      param01 = token.name;
      name = param01;
      return "'" + name
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
    let param0, param1, kind, literal4, param01, name, param02, param11, name1, symbolic, param03, content, param04, kind1, param05, kind2, tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13;
    if (token1 instanceof Token.Space.class) {
      return "Space"
    } else if (token1 instanceof Token.Comma.class) {
      return "Comma"
    } else if (token1 instanceof Token.Semicolon.class) {
      return "Semicolon"
    } else if (token1 instanceof Token.Error.class) {
      return "Error"
    } else if (token1 instanceof Token.Open.class) {
      param05 = token1.kind;
      kind2 = param05;
      tmp = Token.display(kind2);
      tmp1 = "Open(" + tmp;
      return tmp1 + ")"
    } else if (token1 instanceof Token.Close.class) {
      param04 = token1.kind;
      kind1 = param04;
      tmp2 = Token.display(kind1);
      tmp3 = "Close(" + tmp2;
      return tmp3 + ")"
    } else if (token1 instanceof Token.Comment.class) {
      param03 = token1.content;
      content = param03;
      tmp4 = "Comment(" + content;
      return tmp4 + ")"
    } else {
      if (token1 instanceof Token.Identifier.class) {
        param02 = token1.name;
        param11 = token1.symbolic;
        name1 = param02;
        symbolic = param11;
        tmp5 = "Identifier(" + name1;
        tmp6 = tmp5 + ", ";
        tmp7 = tmp6 + symbolic;
        return tmp7 + ")"
      } else if (token1 instanceof Token.TypeVariable.class) {
        param01 = token1.name;
        name = param01;
        tmp8 = "TypeVariable(" + name;
        return tmp8 + ")"
      } else if (token1 instanceof Token.Literal.class) {
        param0 = token1.kind;
        param1 = token1.literal;
        kind = param0;
        literal4 = param1;
        tmp9 = Token.display(kind);
        tmp10 = "Literal(" + tmp9;
        tmp11 = tmp10 + ", ";
        tmp12 = runtime.safeCall(globalThis.JSON.stringify(literal4));
        tmp13 = tmp11 + tmp12;
        return tmp13 + ")"
      } else if (token1 instanceof Token.Round.class) {
        return "Round"
      } else if (token1 instanceof Token.Square.class) {
        return "Square"
      } else if (token1 instanceof Token.Curly.class) {
        return "Curly"
      } else if (token1 instanceof Token.LiteralKind.Integer.class) {
        return "Integer"
      } else if (token1 instanceof Token.LiteralKind.Decimal.class) {
        return "Decimal"
      } else if (token1 instanceof Token.LiteralKind.String.class) {
        return "String"
      } else if (token1 instanceof Token.LiteralKind.Boolean.class) {
        return "Boolean"
      } else {
        throw new globalThis.Error("match error");
      }
    }
  }
  static toString() { return "Token"; }
};
let Token = Token1; export default Token;
