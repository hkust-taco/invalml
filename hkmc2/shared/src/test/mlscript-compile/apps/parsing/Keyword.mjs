import runtime from "./../../Runtime.mjs";
import Predef from "./../../Predef.mjs";
import Option from "./../../Option.mjs";
let Keyword2;
Keyword2 = class Keyword {
  static {
    let tmp;
    tmp = - 2147483648;
    this.INT_MIN = tmp;
    this.INT_MAX = 2147483647;
    this.Keyword = function Keyword(name1, leftPrec1, rightPrec1) { return new Keyword.class(name1, leftPrec1, rightPrec1); };
    this.Keyword.class = class Keyword1 {
      constructor(name, leftPrec, rightPrec) {
        this.name = name;
        this.leftPrec = leftPrec;
        this.rightPrec = rightPrec;
      }
      get leftPrecOrMin() {
        let scrut, param0, prec;
        scrut = this.leftPrec;
        if (scrut instanceof Option.Some.class) {
          param0 = scrut.value;
          prec = param0;
          return prec
        } else {
          return Keyword.INT_MIN
        }
      } 
      get rightPrecOrMin() {
        let scrut, param0, prec;
        scrut = this.rightPrec;
        if (scrut instanceof Option.Some.class) {
          param0 = scrut.value;
          prec = param0;
          return prec
        } else {
          return Keyword.INT_MIN
        }
      } 
      get leftPrecOrMax() {
        let scrut, param0, prec;
        scrut = this.leftPrec;
        if (scrut instanceof Option.Some.class) {
          param0 = scrut.value;
          prec = param0;
          return prec
        } else {
          return Keyword.INT_MAX
        }
      } 
      get rightPrecOrMax() {
        let scrut, param0, prec;
        scrut = this.rightPrec;
        if (scrut instanceof Option.Some.class) {
          param0 = scrut.value;
          prec = param0;
          return prec
        } else {
          return Keyword.INT_MAX
        }
      } 
      toString() {
        let scrut, param0, prec, scrut1, param01, prec1, tmp1, tmp2, tmp3;
        tmp1 = Predef.fold((arg1, arg2) => {
          return arg1 + arg2
        });
        scrut = this.leftPrec;
        if (scrut instanceof Option.Some.class) {
          param0 = scrut.value;
          prec = param0;
          tmp2 = runtime.safeCall(prec.toString());
        } else {
          tmp2 = "N/A";
        }
        scrut1 = this.rightPrec;
        if (scrut1 instanceof Option.Some.class) {
          param01 = scrut1.value;
          prec1 = param01;
          tmp3 = runtime.safeCall(prec1.toString());
        } else {
          tmp3 = "N/A";
        }
        return runtime.safeCall(tmp1("Keyword(`", this.name, "`, ", tmp2, ", ", tmp3, ")"))
      }
    };
  }
  static toString() { return "Keyword"; }
};
let Keyword = Keyword2; export default Keyword;
