import runtime from "./../../Runtime.mjs";
import Str from "./../../Str.mjs";
import Option from "./../../Option.mjs";
import Predef from "./../../Predef.mjs";
let Expr1;
Expr1 = class Expr {
  static {
    let tmp, lambda;
    lambda = (undefined, function (caseScrut) {
      if (caseScrut === "**") {
        return [
          70,
          69
        ]
      } else if (caseScrut === "*") {
        return [
          50,
          50
        ]
      } else if (caseScrut === "/") {
        return [
          50,
          50
        ]
      } else if (caseScrut === "+") {
        return [
          30,
          30
        ]
      } else if (caseScrut === "-") {
        return [
          30,
          30
        ]
      } else {
        throw new globalThis.Error("match error");
      }
    });
    tmp = lambda;
    this.opPrec = tmp;
    this.Lit = function Lit(value1) {
      return new Lit.class(value1);
    };
    this.Lit.class = class Lit {
      constructor(value) {
        this.value = value;
      }
      toString() { return "Lit(" + globalThis.Predef.render(this.value) + ")"; }
    };
    this.Var = function Var(name1) {
      return new Var.class(name1);
    };
    this.Var.class = class Var {
      constructor(name) {
        this.name = name;
      }
      toString() { return "Var(" + globalThis.Predef.render(this.name) + ")"; }
    };
    this.Inf = function Inf(op1, left1, right1) {
      return new Inf.class(op1, left1, right1);
    };
    this.Inf.class = class Inf {
      constructor(op, left, right) {
        this.op = op;
        this.left = left;
        this.right = right;
      }
      toString() { return "Inf(" + globalThis.Predef.render(this.op) + ", " + globalThis.Predef.render(this.left) + ", " + globalThis.Predef.render(this.right) + ")"; }
    };
    this.Err = function Err(expr1, msg1) {
      return new Err.class(expr1, msg1);
    };
    this.Err.class = class Err {
      constructor(expr, msg) {
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
    let param0, param1, msg2, param01, expr1, msg3, param02, param11, param2, op, left, right, scrut, first1, first0, l, r, param03, param12, param21, op$_, scrut1, first11, first01, r$_, scrut2, param04, param13, param22, op$_1, scrut3, first12, first02, l$_, scrut4, param05, name, param06, value, tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12;
    if (tree instanceof Expr.Lit.class) {
      param06 = tree.value;
      value = param06;
      return runtime.safeCall(value.toString())
    } else if (tree instanceof Expr.Var.class) {
      param05 = tree.name;
      name = param05;
      return name
    } else if (tree instanceof Expr.Inf.class) {
      param02 = tree.op;
      param11 = tree.left;
      param2 = tree.right;
      op = param02;
      left = param11;
      right = param2;
      scrut = runtime.safeCall(Expr.opPrec(op));
      if (globalThis.Array.isArray(scrut) && scrut.length === 2) {
        first0 = scrut[0];
        first1 = scrut[1];
        l = first0;
        r = first1;
        tmp = Expr.prettyPrint(left);
        if (left instanceof Expr.Inf.class) {
          param03 = left.op;
          param12 = left.left;
          param21 = left.right;
          op$_ = param03;
          scrut1 = runtime.safeCall(Expr.opPrec(op$_));
          if (globalThis.Array.isArray(scrut1) && scrut1.length === 2) {
            first01 = scrut1[0];
            first11 = scrut1[1];
            r$_ = first11;
            scrut2 = r$_ < l;
            if (scrut2 === true) {
              tmp1 = true;
            } else {
              tmp1 = false;
            }
          } else {
            tmp1 = false;
          }
        } else {
          tmp1 = false;
        }
        tmp2 = Str.parenthesizedIf(tmp, tmp1);
        tmp3 = Expr.prettyPrint(right);
        if (right instanceof Expr.Inf.class) {
          param04 = right.op;
          param13 = right.left;
          param22 = right.right;
          op$_1 = param04;
          scrut3 = runtime.safeCall(Expr.opPrec(op$_1));
          if (globalThis.Array.isArray(scrut3) && scrut3.length === 2) {
            first02 = scrut3[0];
            first12 = scrut3[1];
            l$_ = first02;
            scrut4 = r > l$_;
            if (scrut4 === true) {
              tmp4 = true;
            } else {
              tmp4 = false;
            }
          } else {
            tmp4 = false;
          }
        } else {
          tmp4 = false;
        }
        tmp5 = Str.parenthesizedIf(tmp3, tmp4);
        return Str.concat(tmp2, " ", op, " ", tmp5)
      } else {
        throw new globalThis.Error("match error");
      }
    } else if (tree instanceof Expr.Err.class) {
      param0 = tree.expr;
      param1 = tree.msg;
      if (param0 instanceof Option.Some.class) {
        param01 = param0.value;
        expr1 = param01;
        msg3 = param1;
        tmp6 = Expr.prettyPrint(expr1);
        tmp7 = "{ " + tmp6;
        tmp8 = tmp7 + " | ";
        tmp9 = runtime.safeCall(globalThis.JSON.stringify(msg3));
        tmp10 = tmp8 + tmp9;
        return tmp10 + " }"
      } else if (param0 instanceof Option.None.class) {
        msg2 = param1;
        tmp11 = runtime.safeCall(globalThis.JSON.stringify(msg2));
        tmp12 = "{ " + tmp11;
        return tmp12 + " }"
      } else {
        throw new globalThis.Error("match error");
      }
    } else {
      throw new globalThis.Error("match error");
    }
  }
  static toString() { return "Expr"; }
};
let Expr = Expr1; export default Expr;
