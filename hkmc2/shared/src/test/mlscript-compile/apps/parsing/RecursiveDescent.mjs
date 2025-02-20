import runtime from "./../../Runtime.mjs";
import Predef from "./../../Predef.mjs";
import Stack from "./../../Stack.mjs";
import Option from "./../../Option.mjs";
import Iter from "./../../Iter.mjs";
import Lexer from "./../Lexer.mjs";
import Token from "./Token.mjs";
let RecursiveDescent1;
RecursiveDescent1 = class RecursiveDescent {
  static {
    this.Expr = class Expr {
      static {
        this.Expr = class Expr1 {
          constructor() {}
          toString() { return "Expr"; }
        };
        this.Lit = function Lit(value1) { return new Lit.class(value1); };
        this.Lit.class = class Lit extends Expr.Expr {
          constructor(value) {
            super();
            this.value = value;
          }
          toString() { return "Lit(" + globalThis.Predef.render(this.value) + ")"; }
        };
        this.Var = function Var(name1) { return new Var.class(name1); };
        this.Var.class = class Var extends Expr.Expr {
          constructor(name) {
            super();
            this.name = name;
          }
          toString() { return "Var(" + globalThis.Predef.render(this.name) + ")"; }
        };
        this.Add = function Add(left1, right1) { return new Add.class(left1, right1); };
        this.Add.class = class Add extends Expr.Expr {
          constructor(left, right) {
            super();
            this.left = left;
            this.right = right;
          }
          toString() { return "Add(" + globalThis.Predef.render(this.left) + ", " + globalThis.Predef.render(this.right) + ")"; }
        };
        this.Mul = function Mul(left1, right1) { return new Mul.class(left1, right1); };
        this.Mul.class = class Mul extends Expr.Expr {
          constructor(left, right) {
            super();
            this.left = left;
            this.right = right;
          }
          toString() { return "Mul(" + globalThis.Predef.render(this.left) + ", " + globalThis.Predef.render(this.right) + ")"; }
        };
        this.Err = function Err(expr1, msg1) { return new Err.class(expr1, msg1); };
        this.Err.class = class Err extends Expr.Expr {
          constructor(expr, msg) {
            super();
            this.expr = expr;
            this.msg = msg;
          }
          toString() { return "Err(" + globalThis.Predef.render(this.expr) + ", " + globalThis.Predef.render(this.msg) + ")"; }
        };
      }
      static withErr(expr, msg) {
        let tmp;
        tmp = Option.Some(expr);
        return Expr.Err(tmp, msg)
      } 
      static justErr(msg1) {
        return Expr.Err(Option.None, msg1)
      } 
      static prettyPrint(tree) {
        let param0, param1, msg2, param01, expr1, msg3, param02, param11, left, right, param03, param12, left1, right1, param04, name, param05, value, tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15;
        if (tree instanceof Expr.Lit.class) {
          param05 = tree.value;
          value = param05;
          return runtime.safeCall(value.toString())
        } else if (tree instanceof Expr.Var.class) {
          param04 = tree.name;
          name = param04;
          return name
        } else if (tree instanceof Expr.Add.class) {
          param03 = tree.left;
          param12 = tree.right;
          left1 = param03;
          right1 = param12;
          tmp = Expr.prettyPrint(left1);
          tmp1 = tmp + " + ";
          tmp2 = Expr.prettyPrint(right1);
          return tmp1 + tmp2
        } else if (tree instanceof Expr.Mul.class) {
          param02 = tree.left;
          param11 = tree.right;
          left = param02;
          right = param11;
          tmp3 = Expr.prettyPrint(left);
          if (left instanceof Expr.Add.class) {
            tmp4 = true;
          } else {
            tmp4 = false;
          }
          tmp5 = RecursiveDescent.parenthesized(tmp3, tmp4);
          tmp6 = Expr.prettyPrint(right);
          if (right instanceof Expr.Add.class) {
            tmp7 = true;
          } else {
            tmp7 = false;
          }
          tmp8 = RecursiveDescent.parenthesized(tmp6, tmp7);
          return Predef.mkStr(tmp5, " * ", tmp8)
        } else if (tree instanceof Expr.Err.class) {
          param0 = tree.expr;
          param1 = tree.msg;
          if (param0 instanceof Option.Some.class) {
            param01 = param0.value;
            expr1 = param01;
            msg3 = param1;
            tmp9 = Expr.prettyPrint(expr1);
            tmp10 = tmp9 + " | ";
            tmp11 = runtime.safeCall(globalThis.JSON.stringify(msg3));
            tmp12 = tmp10 + tmp11;
            tmp13 = tmp12 + " }";
            return Predef.mkStr("{ ", tmp13)
          } else if (param0 instanceof Option.None.class) {
            msg2 = param1;
            tmp14 = runtime.safeCall(globalThis.JSON.stringify(msg2));
            tmp15 = "{ " + tmp14;
            return tmp15 + " }"
          } else {
            throw new globalThis.Error("match error");
          }
        } else {
          throw new globalThis.Error("match error");
        }
      }
      static toString() { return "Expr"; }
    };
  }
  static parenthesized(x, cond) {
    let tmp;
    if (cond === true) {
      tmp = "(" + x;
      return tmp + ")"
    } else {
      return x
    }
  } 
  static parse(tokens) {
    let require, addSeq, advance, expr, atom, product, mulSeq, consume, peek, result, param0, token, tmp, tmp1, tmp2, tmp3;
    advance = function advance() {
      let param01, param1, head, tail, tail1, tmp4;
      if (tokens instanceof Stack.Cons.class) {
        param01 = tokens.head;
        param1 = tokens.tail;
        if (param01 instanceof Token.Space.class) {
          tail1 = param1;
          tokens = tail1;
          tmp4 = advance();
          return tmp4
        } else {
          head = param01;
          tail = param1;
          tokens = tail;
          return Option.Some(head)
        }
      } else if (tokens instanceof Stack.Nil.class) {
        return Option.None
      } else {
        throw new globalThis.Error("match error");
      }
    };
    consume = function consume() {
      let tmp4;
      tmp4 = advance();
      peek = tmp4;
      return runtime.Unit
    };
    require = function require(result1, expected) {
      let param01, actual, scrut, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9;
      if (peek instanceof Option.Some.class) {
        param01 = peek.value;
        actual = param01;
        scrut = Token.same(expected, actual);
        if (scrut === true) {
          tmp4 = consume();
          return result1
        } else {
          tmp5 = Token.summary(expected);
          tmp6 = Token.summary(actual);
          tmp7 = Predef.mkStr("Expected token ", tmp5, ", but found ", tmp6);
          return RecursiveDescent.Expr.withErr(result1, tmp7)
        }
      } else if (peek instanceof Option.None.class) {
        tmp8 = Token.summary(expected);
        tmp9 = Predef.mkStr("Expected token ", tmp8, ", but found end of input");
        return RecursiveDescent.Expr.withErr(result1, tmp9)
      } else {
        throw new globalThis.Error("match error");
      }
    };
    atom = function atom() {
      let param01, token1, param02, param03, param1, name, param04, param11, literal, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17;
      if (peek instanceof Option.Some.class) {
        param01 = peek.value;
        if (param01 instanceof Token.Literal.class) {
          param04 = param01.kind;
          param11 = param01.literal;
          if (param04 instanceof Token.LiteralKind.Integer.class) {
            literal = param11;
            tmp4 = consume();
            tmp5 = globalThis.parseInt(literal, 10);
            return RecursiveDescent.Expr.Lit(tmp5)
          } else {
            token1 = param01;
            tmp6 = Token.summary(token1);
            tmp7 = "Unexpected token " + tmp6;
            return RecursiveDescent.Expr.justErr(tmp7)
          }
        } else if (param01 instanceof Token.Identifier.class) {
          param03 = param01.name;
          param1 = param01.symbolic;
          name = param03;
          if (param1 === false) {
            tmp8 = consume();
            return RecursiveDescent.Expr.Var(name)
          } else {
            token1 = param01;
            tmp9 = Token.summary(token1);
            tmp10 = "Unexpected token " + tmp9;
            return RecursiveDescent.Expr.justErr(tmp10)
          }
        } else if (param01 instanceof Token.Open.class) {
          param02 = param01.kind;
          if (param02 instanceof Token.Round.class) {
            tmp11 = consume();
            tmp12 = expr();
            tmp13 = Token.Close(Token.Round);
            return require(tmp12, tmp13)
          } else {
            token1 = param01;
            tmp14 = Token.summary(token1);
            tmp15 = "Unexpected token " + tmp14;
            return RecursiveDescent.Expr.justErr(tmp15)
          }
        } else {
          token1 = param01;
          tmp16 = Token.summary(token1);
          tmp17 = "Unexpected token " + tmp16;
          return RecursiveDescent.Expr.justErr(tmp17)
        }
      } else if (peek instanceof Option.None.class) {
        return RecursiveDescent.Expr.justErr("Unexpected end of input")
      } else {
        throw new globalThis.Error("match error");
      }
    };
    expr = function expr() {
      let leftmost, tmp4, tmp5, tmp6;
      tmp4 = product();
      leftmost = tmp4;
      tmp5 = addSeq();
      tmp6 = Iter.fromStack(tmp5);
      return Iter.folded(tmp6, leftmost, RecursiveDescent.Expr.Add)
    };
    addSeq = function addSeq() {
      let param01, param02, param1, tmp4, tmp5, tmp6;
      if (peek instanceof Option.Some.class) {
        param01 = peek.value;
        if (param01 instanceof Token.Identifier.class) {
          param02 = param01.name;
          param1 = param01.symbolic;
          if (param02 === "+") {
            tmp4 = consume();
            tmp5 = product();
            tmp6 = addSeq();
            return Stack.Cons(tmp5, tmp6)
          } else {
            return Stack.Nil
          }
        } else {
          return Stack.Nil
        }
      } else {
        return Stack.Nil
      }
    };
    product = function product() {
      let leftmost, tmp4, tmp5, tmp6;
      tmp4 = atom();
      leftmost = tmp4;
      tmp5 = mulSeq();
      tmp6 = Iter.fromStack(tmp5);
      return Iter.folded(tmp6, leftmost, RecursiveDescent.Expr.Mul)
    };
    mulSeq = function mulSeq() {
      let param01, param02, param1, tmp4, tmp5, tmp6;
      if (peek instanceof Option.Some.class) {
        param01 = peek.value;
        if (param01 instanceof Token.Identifier.class) {
          param02 = param01.name;
          param1 = param01.symbolic;
          if (param02 === "*") {
            tmp4 = consume();
            tmp5 = atom();
            tmp6 = mulSeq();
            return Stack.Cons(tmp5, tmp6)
          } else {
            return Stack.Nil
          }
        } else {
          return Stack.Nil
        }
      } else {
        return Stack.Nil
      }
    };
    tmp = advance();
    peek = tmp;
    tmp1 = expr();
    result = tmp1;
    if (peek instanceof Option.Some.class) {
      param0 = peek.value;
      token = param0;
      tmp2 = Token.summary(token);
      tmp3 = "Expect end of input, but found " + tmp2;
      return RecursiveDescent.Expr.withErr(result, tmp3)
    } else if (peek instanceof Option.None.class) {
      return result
    } else {
      throw new globalThis.Error("match error");
    }
  }
  static toString() { return "RecursiveDescent"; }
};
let RecursiveDescent = RecursiveDescent1; export default RecursiveDescent;
