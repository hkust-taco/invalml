import runtime from "./../../Runtime.mjs";
import Str from "./../../Str.mjs";
import Option from "./../../Option.mjs";
import Predef from "./../../Predef.mjs";
let BasicExpr1;
(class BasicExpr {
  static {
    BasicExpr1 = BasicExpr;
    this.Lit = function Lit(value1) {
      return new Lit.class(value1);
    };
    this.Lit.class = class Lit {
      constructor(value) {
        this.value = value;
      }
      toString() { return "Lit(" + runtime.render(this.value) + ")"; }
    };
    this.Var = function Var(name1) {
      return new Var.class(name1);
    };
    this.Var.class = class Var {
      constructor(name) {
        this.name = name;
      }
      toString() { return "Var(" + runtime.render(this.name) + ")"; }
    };
    this.Add = function Add(left1, right1) {
      return new Add.class(left1, right1);
    };
    this.Add.class = class Add {
      constructor(left, right) {
        this.left = left;
        this.right = right;
      }
      toString() { return "Add(" + runtime.render(this.left) + ", " + runtime.render(this.right) + ")"; }
    };
    this.Mul = function Mul(left1, right1) {
      return new Mul.class(left1, right1);
    };
    this.Mul.class = class Mul {
      constructor(left, right) {
        this.left = left;
        this.right = right;
      }
      toString() { return "Mul(" + runtime.render(this.left) + ", " + runtime.render(this.right) + ")"; }
    };
    this.Err = function Err(expr1, msg1) {
      return new Err.class(expr1, msg1);
    };
    this.Err.class = class Err {
      constructor(expr, msg) {
        this.expr = expr;
        this.msg = msg;
      }
      toString() { return "Err(" + runtime.render(this.expr) + ", " + runtime.render(this.msg) + ")"; }
    };
  }
  static withErr(expr, msg) {
    let tmp;
    tmp = Option.Some(expr);
    return BasicExpr.Err(tmp, msg)
  } 
  static justErr(msg1) {
    return BasicExpr.Err(Option.None, msg1)
  } 
  static prettyPrint(tree) {
    let param0, param1, msg2, param01, expr1, msg3, param02, param11, left, right, param03, param12, left1, right1, param04, name, param05, value, tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15;
    if (tree instanceof BasicExpr.Lit.class) {
      param05 = tree.value;
      value = param05;
      return runtime.safeCall(value.toString())
    } else if (tree instanceof BasicExpr.Var.class) {
      param04 = tree.name;
      name = param04;
      return name
    } else if (tree instanceof BasicExpr.Add.class) {
      param03 = tree.left;
      param12 = tree.right;
      left1 = param03;
      right1 = param12;
      tmp = BasicExpr.prettyPrint(left1);
      tmp1 = tmp + " + ";
      tmp2 = BasicExpr.prettyPrint(right1);
      return tmp1 + tmp2
    } else if (tree instanceof BasicExpr.Mul.class) {
      param02 = tree.left;
      param11 = tree.right;
      left = param02;
      right = param11;
      tmp3 = BasicExpr.prettyPrint(left);
      if (left instanceof BasicExpr.Add.class) {
        tmp4 = true;
      } else {
        tmp4 = false;
      }
      tmp5 = Str.parenthesizedIf(tmp3, tmp4);
      tmp6 = BasicExpr.prettyPrint(right);
      if (right instanceof BasicExpr.Add.class) {
        tmp7 = true;
      } else {
        tmp7 = false;
      }
      tmp8 = Str.parenthesizedIf(tmp6, tmp7);
      return Str.concat(tmp5, " * ", tmp8)
    } else if (tree instanceof BasicExpr.Err.class) {
      param0 = tree.expr;
      param1 = tree.msg;
      if (param0 instanceof Option.Some.class) {
        param01 = param0.value;
        expr1 = param01;
        msg3 = param1;
        tmp9 = BasicExpr.prettyPrint(expr1);
        tmp10 = "{ " + tmp9;
        tmp11 = tmp10 + " | ";
        tmp12 = runtime.safeCall(globalThis.JSON.stringify(msg3));
        tmp13 = tmp11 + tmp12;
        return tmp13 + " }"
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
  static toString() { return "BasicExpr"; }
});
let BasicExpr = BasicExpr1; export default BasicExpr;
