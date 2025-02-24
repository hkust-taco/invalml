import runtime from "./../../Runtime.mjs";
import Predef from "./../../Predef.mjs";
import Stack from "./../../Stack.mjs";
import Option from "./../../Option.mjs";
import Iter from "./../../Iter.mjs";
import Token from "./Token.mjs";
import BasicExpr from "./BasicExpr.mjs";
let RecursiveDescent1;
RecursiveDescent1 = class RecursiveDescent {
  static {}
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
          return BasicExpr.withErr(result1, tmp7)
        }
      } else if (peek instanceof Option.None.class) {
        tmp8 = Token.summary(expected);
        tmp9 = Predef.mkStr("Expected token ", tmp8, ", but found end of input");
        return BasicExpr.withErr(result1, tmp9)
      } else {
        throw new globalThis.Error("match error");
      }
    };
    atom = function atom() {
      let param01, token1, param02, param1, name, param03, param11, literal, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18;
      if (peek instanceof Option.Some.class) {
        param01 = peek.value;
        if (param01 instanceof Token.Literal.class) {
          param03 = param01.kind;
          param11 = param01.literal;
          if (param03 instanceof Token.LiteralKind.Integer.class) {
            literal = param11;
            tmp4 = consume();
            tmp5 = globalThis.parseInt(literal, 10);
            return BasicExpr.Lit(tmp5)
          } else {
            token1 = param01;
            tmp6 = Token.summary(token1);
            tmp7 = "Unexpected token " + tmp6;
            return BasicExpr.justErr(tmp7)
          }
        } else if (param01 instanceof Token.Identifier.class) {
          param02 = param01.name;
          param1 = param01.symbolic;
          if (param02 === "(") {
            name = param02;
            if (param1 === true) {
              tmp8 = consume();
              tmp9 = expr();
              tmp10 = Token.Identifier(")", true);
              return require(tmp9, tmp10)
            } else if (param1 === false) {
              tmp11 = consume();
              return BasicExpr.Var(name)
            } else {
              token1 = param01;
              tmp12 = Token.summary(token1);
              tmp13 = "Unexpected token " + tmp12;
              return BasicExpr.justErr(tmp13)
            }
          } else {
            name = param02;
            if (param1 === false) {
              tmp14 = consume();
              return BasicExpr.Var(name)
            } else {
              token1 = param01;
              tmp15 = Token.summary(token1);
              tmp16 = "Unexpected token " + tmp15;
              return BasicExpr.justErr(tmp16)
            }
          }
        } else {
          token1 = param01;
          tmp17 = Token.summary(token1);
          tmp18 = "Unexpected token " + tmp17;
          return BasicExpr.justErr(tmp18)
        }
      } else if (peek instanceof Option.None.class) {
        return BasicExpr.justErr("Unexpected end of input")
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
      return Iter.folded(tmp6, leftmost, BasicExpr.Add)
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
      return Iter.folded(tmp6, leftmost, BasicExpr.Mul)
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
      return BasicExpr.withErr(result, tmp3)
    } else if (peek instanceof Option.None.class) {
      return result
    } else {
      throw new globalThis.Error("match error");
    }
  }
  static toString() { return "RecursiveDescent"; }
};
let RecursiveDescent = RecursiveDescent1; export default RecursiveDescent;
