import runtime from "./../../Runtime.mjs";
import Predef from "./../../Predef.mjs";
import Option from "./../../Option.mjs";
import BetterMap from "./../../BetterMap.mjs";
let Keyword2;
Keyword2 = class Keyword {
  static {
    let tmp, tmp1;
    tmp = - 2147483648;
    this.INT_MIN = tmp;
    this.INT_MAX = 2147483647;
    tmp1 = new BetterMap.Map();
    this.allKeywords = tmp1;
    this.Keyword = function Keyword(name1, leftPrec1, rightPrec1) { return new Keyword.class(name1, leftPrec1, rightPrec1); };
    this.Keyword.class = class Keyword1 {
      constructor(name, leftPrec, rightPrec) {
        this.name = name;
        this.leftPrec = leftPrec;
        this.rightPrec = rightPrec;
        let tmp2;
        tmp2 = Keyword.allKeywords.insert(this.name, this);
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
        let scrut, param0, prec, scrut1, param01, prec1, tmp2, tmp3, tmp4;
        tmp2 = Predef.fold((arg1, arg2) => {
          return arg1 + arg2
        });
        scrut = this.leftPrec;
        if (scrut instanceof Option.Some.class) {
          param0 = scrut.value;
          prec = param0;
          tmp3 = runtime.safeCall(prec.toString());
        } else {
          tmp3 = "N/A";
        }
        scrut1 = this.rightPrec;
        if (scrut1 instanceof Option.Some.class) {
          param01 = scrut1.value;
          prec1 = param01;
          tmp4 = runtime.safeCall(prec1.toString());
        } else {
          tmp4 = "N/A";
        }
        return runtime.safeCall(tmp2("Keyword(`", this.name, "`, ", tmp3, ", ", tmp4, ")"))
      }
    };
  }
  static toString() { return "Keyword"; }
};
let Keyword = Keyword2; export default Keyword;
