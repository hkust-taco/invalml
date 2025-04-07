import runtime from "./../../Runtime.mjs";
let Token1;
Token1 = class Token {
  static {
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
    const Error$class = class Error {
      constructor() {}
      toString() { return "Error"; }
    };
    this.Error = new Error$class;
    this.Error.class = Error$class;
    this.Comment = function Comment(content1) {
      return new Comment.class(content1);
    };
    this.Comment.class = class Comment {
      constructor(content) {
        this.content = content;
      }
      toString() { return "Comment(" + globalThis.Predef.render(this.content) + ")"; }
    };
    this.Identifier = function Identifier(name1, symbolic1) {
      return new Identifier.class(name1, symbolic1);
    };
    this.Identifier.class = class Identifier {
      constructor(name, symbolic) {
        this.name = name;
        this.symbolic = symbolic;
      }
      toString() { return "Identifier(" + globalThis.Predef.render(this.name) + ", " + globalThis.Predef.render(this.symbolic) + ")"; }
    };
    this.Literal = function Literal(kind1, literal1) {
      return new Literal.class(kind1, literal1);
    };
    this.Literal.class = class Literal {
      constructor(kind, literal) {
        this.kind = kind;
        this.literal = literal;
      }
      toString() { return "Literal(" + globalThis.Predef.render(this.kind) + ", " + globalThis.Predef.render(this.literal) + ")"; }
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
    let param0, param1, literal4, param01, param11, name, param02;
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
  static display(token1) {
    return runtime.safeCall(token1.toString())
  }
  static toString() { return "Token"; }
};
let Token = Token1; export default Token;
