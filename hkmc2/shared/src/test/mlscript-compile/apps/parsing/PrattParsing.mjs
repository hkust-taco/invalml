import runtime from "./../../Runtime.mjs";
import Predef from "./../../Predef.mjs";
import Stack from "./../../Stack.mjs";
import Option from "./../../Option.mjs";
import Iter from "./../../Iter.mjs";
import Lexer from "./../Lexer.mjs";
import Token from "./Token.mjs";
import Expr from "./Expr.mjs";
let PrattParsing1;
PrattParsing1 = class PrattParsing {
  static {}
  static parse(tokens) {
    let require, exprCont, advance, expr, consume, peek, result, param0, token, tmp, tmp1, tmp2, tmp3;
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
          return Expr.withErr(result1, tmp7)
        }
      } else if (peek instanceof Option.None.class) {
        tmp8 = Token.summary(expected);
        tmp9 = Predef.mkStr("Expected token ", tmp8, ", but found end of input");
        return Expr.withErr(result1, tmp9)
      } else {
        throw new globalThis.Error("match error");
      }
    };
    expr = function expr(prec) {
      let param01, token1, param02, param03, param1, name, param04, param11, literal, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20;
      if (peek instanceof Option.Some.class) {
        param01 = peek.value;
        if (param01 instanceof Token.Literal.class) {
          param04 = param01.kind;
          param11 = param01.literal;
          if (param04 instanceof Token.LiteralKind.Integer.class) {
            literal = param11;
            tmp4 = consume();
            tmp5 = globalThis.parseInt(literal, 10);
            tmp6 = Expr.Lit(tmp5);
            return exprCont(tmp6, prec)
          } else {
            token1 = param01;
            tmp7 = Token.summary(token1);
            tmp8 = "Unexpected token " + tmp7;
            return Expr.justErr(tmp8)
          }
        } else if (param01 instanceof Token.Identifier.class) {
          param03 = param01.name;
          param1 = param01.symbolic;
          name = param03;
          if (param1 === false) {
            tmp9 = consume();
            tmp10 = Expr.Var(name);
            return exprCont(tmp10, prec)
          } else {
            token1 = param01;
            tmp11 = Token.summary(token1);
            tmp12 = "Unexpected token " + tmp11;
            return Expr.justErr(tmp12)
          }
        } else if (param01 instanceof Token.Open.class) {
          param02 = param01.kind;
          if (param02 instanceof Token.Round.class) {
            tmp13 = consume();
            tmp14 = expr(0);
            tmp15 = Token.Close(Token.Round);
            tmp16 = require(tmp14, tmp15);
            return exprCont(tmp16, prec)
          } else {
            token1 = param01;
            tmp17 = Token.summary(token1);
            tmp18 = "Unexpected token " + tmp17;
            return Expr.justErr(tmp18)
          }
        } else {
          token1 = param01;
          tmp19 = Token.summary(token1);
          tmp20 = "Unexpected token " + tmp19;
          return Expr.justErr(tmp20)
        }
      } else if (peek instanceof Option.None.class) {
        return Expr.justErr("Unexpected end of input")
      } else {
        throw new globalThis.Error("match error");
      }
    };
    exprCont = function exprCont(acc, prec) {
      let param01, param02, param1, op, scrut, first1, first0, leftPrec, rightPrec, scrut1, right, tmp4, tmp5, tmp6;
      if (peek instanceof Option.Some.class) {
        param01 = peek.value;
        if (param01 instanceof Token.Identifier.class) {
          param02 = param01.name;
          param1 = param01.symbolic;
          op = param02;
          if (param1 === true) {
            scrut = runtime.safeCall(Expr.opPrec(op));
            if (globalThis.Array.isArray(scrut) && scrut.length === 2) {
              first0 = scrut[0];
              first1 = scrut[1];
              leftPrec = first0;
              rightPrec = first1;
              scrut1 = leftPrec > prec;
              if (scrut1 === true) {
                tmp4 = consume();
                tmp5 = expr(rightPrec);
                right = tmp5;
                tmp6 = Expr.Inf(op, acc, right);
                return exprCont(tmp6, prec)
              } else {
                return acc
              }
            } else {
              return acc
            }
          } else {
            return acc
          }
        } else {
          return acc
        }
      } else {
        return acc
      }
    };
    tmp = advance();
    peek = tmp;
    tmp1 = expr(0);
    result = tmp1;
    if (peek instanceof Option.Some.class) {
      param0 = peek.value;
      token = param0;
      tmp2 = Token.summary(token);
      tmp3 = "Expect end of input, but found " + tmp2;
      return Expr.withErr(result, tmp3)
    } else if (peek instanceof Option.None.class) {
      return result
    } else {
      throw new globalThis.Error("match error");
    }
  }
  static toString() { return "PrattParsing"; }
};
let PrattParsing = PrattParsing1; export default PrattParsing;
