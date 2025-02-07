import Predef from "./Predef.mjs";
let TreeTracer2;
TreeTracer2 = class TreeTracer {
  static {
    this.TreeTracer = class TreeTracer1 {
      #output;
      constructor() {
        this.steps = 0;
        this.#output = globalThis.console.log;
      }
      get indentPrefix() {
        let scrut, tmp;
        scrut = this.steps == 0;
        if (scrut === true) {
          return "";
        } else {
          tmp = this.steps - 1;
          return "\u2502 ".repeat(tmp) ?? null;
        }
      } 
      enter(...pieces) {
        let scrut, tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6;
        tmp = Predef.fold((arg1, arg2) => {
          return arg1 + arg2;
        });
        scrut = this.steps > 0;
        if (scrut === true) {
          tmp1 = this.steps - 1;
          tmp2 = "\u2502 ".repeat(tmp1) ?? null;
          tmp3 = tmp2 + "\u251C\u2500\u252E ";
        } else {
          tmp3 = "\u250D ";
        }
        tmp4 = tmp(tmp3, ...pieces) ?? null;
        tmp5 = this.#output(tmp4) ?? null;
        tmp6 = this.steps + 1;
        this.steps = tmp6;
        return null;
      } 
      print(...pieces1) {
        let message, scrut, tmp, tmp1, tmp2, tmp3;
        tmp = Predef.fold((arg1, arg2) => {
          return arg1 + arg2;
        });
        tmp1 = tmp(...pieces1) ?? null;
        message = tmp1;
        scrut = this.steps == 0;
        if (scrut === true) {
          return this.#output(message) ?? null;
        } else {
          tmp2 = this.indentPrefix + "\u251C ";
          tmp3 = tmp2 + message;
          return this.#output(tmp3) ?? null;
        }
      } 
      leave(...pieces2) {
        let scrut, tmp, tmp1, tmp2, tmp3, tmp4, tmp5;
        tmp = this.steps - 1;
        this.steps = tmp;
        tmp1 = Predef.fold((arg1, arg2) => {
          return arg1 + arg2;
        });
        scrut = this.steps > 0;
        if (scrut === true) {
          tmp2 = this.steps - 1;
          tmp3 = "\u2502 ".repeat(tmp2) ?? null;
          tmp4 = tmp3 + "\u2502 \u2515 ";
        } else {
          tmp4 = "\u2515 ";
        }
        tmp5 = tmp1(tmp4, ...pieces2) ?? null;
        return this.#output(tmp5) ?? null;
      } 
      trace(intro, makeOutro, thunk) {
        let result, tmp, tmp1, tmp2, tmp3;
        tmp = this.enter(intro);
        tmp1 = thunk() ?? null;
        result = tmp1;
        tmp2 = makeOutro(result) ?? null;
        tmp3 = this.leave(tmp2);
        return result;
      }
      toString() { return "TreeTracer"; }
    };
  }
  static toString() { return "TreeTracer"; }
};
null
let TreeTracer = TreeTracer2; export default TreeTracer;
