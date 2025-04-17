import runtime from "./Runtime.mjs";
import Predef from "./Predef.mjs";
let TreeTracer2;
(class TreeTracer {
  static {
    TreeTracer2 = TreeTracer;
    this.TreeTracer = class TreeTracer1 {
      constructor() {
        this.steps = 0;
        this.enabled = false;
      }
      output(outie, innie, innieAlt, message) {
        let scrut, lines, tmp, tmp1, lambda;
        scrut = this.enabled;
        if (scrut === true) {
          tmp = runtime.safeCall(message.split("\n"));
          lines = tmp;
          lambda = (undefined, function (line, i, xs) {
            let postfix, scrut1, scrut2, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11;
            scrut1 = lines.length > 1;
            if (scrut1 === true) {
              tmp2 = " \u21B5";
            } else {
              tmp2 = "";
            }
            postfix = tmp2;
            if (i === 0) {
              tmp3 = outie + innie;
              tmp4 = tmp3 + line;
              tmp5 = tmp4 + postfix;
              return runtime.safeCall(globalThis.console.log(tmp5))
            } else {
              tmp6 = i + 1;
              scrut2 = tmp6 == lines.length;
              if (scrut2 === true) {
                tmp7 = outie + innieAlt;
                tmp8 = tmp7 + line;
                return runtime.safeCall(globalThis.console.log(tmp8))
              } else {
                tmp9 = outie + innieAlt;
                tmp10 = tmp9 + line;
                tmp11 = tmp10 + postfix;
                return runtime.safeCall(globalThis.console.log(tmp11))
              }
            }
          });
          tmp1 = lambda;
          return runtime.safeCall(lines.forEach(tmp1))
        } else {
          return runtime.Unit
        }
      } 
      enter(...pieces) {
        let scrut, scrut1, tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, lambda;
        scrut = this.steps > 0;
        if (scrut === true) {
          tmp = this.steps - 1;
          tmp1 = runtime.safeCall("\u2502 ".repeat(tmp));
          tmp2 = tmp1 + "\u251C\u2500";
        } else {
          tmp2 = "";
        }
        scrut1 = this.steps > 0;
        if (scrut1 === true) {
          tmp3 = "\u252E ";
        } else {
          tmp3 = "\u250D ";
        }
        lambda = (undefined, function (arg1, arg2) {
          return arg1 + arg2
        });
        tmp4 = runtime.safeCall(Predef.fold(lambda));
        tmp5 = runtime.safeCall(tmp4(...pieces));
        tmp6 = this.output(tmp2, tmp3, "\u2502 ", tmp5);
        tmp7 = this.steps + 1;
        this.steps = tmp7;
        return runtime.Unit
      } 
      print(...pieces1) {
        let message1, last0, rest, line, pieces2, scrut, scrut1, tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, lambda, lambda1, lambda2;
        if (globalThis.Array.isArray(pieces1) && pieces1.length >= 1) {
          rest = runtime.safeCall(runtime.Tuple.slice(pieces1, 0, 1));
          last0 = runtime.Tuple.get(pieces1, -1);
          pieces2 = rest;
          if (globalThis.Number.isInteger(last0)) {
            line = last0;
            lambda = (undefined, function (arg1, arg2) {
              return arg1 + arg2
            });
            tmp = runtime.safeCall(Predef.fold(lambda));
            tmp1 = " [Ln " + line;
            tmp2 = tmp1 + "]";
            tmp3 = runtime.safeCall(tmp(...pieces2, tmp2));
          } else {
            lambda1 = (undefined, function (arg1, arg2) {
              return arg1 + arg2
            });
            tmp4 = runtime.safeCall(Predef.fold(lambda1));
            tmp3 = runtime.safeCall(tmp4(...pieces1));
          }
        } else {
          lambda2 = (undefined, function (arg1, arg2) {
            return arg1 + arg2
          });
          tmp5 = runtime.safeCall(Predef.fold(lambda2));
          tmp3 = runtime.safeCall(tmp5(...pieces1));
        }
        message1 = tmp3;
        scrut = this.steps > 0;
        if (scrut === true) {
          tmp6 = this.steps - 1;
          tmp7 = runtime.safeCall("\u2502 ".repeat(tmp6));
        } else {
          tmp7 = "";
        }
        scrut1 = this.steps > 0;
        if (scrut1 === true) {
          tmp8 = "\u251C ";
        } else {
          tmp8 = "";
        }
        return this.output(tmp7, tmp8, "\u2502 ", message1)
      } 
      leave(...pieces2) {
        let tmp, tmp1, tmp2, tmp3, lambda;
        tmp = this.steps - 1;
        this.steps = tmp;
        tmp1 = runtime.safeCall("\u2502 ".repeat(this.steps));
        lambda = (undefined, function (arg1, arg2) {
          return arg1 + arg2
        });
        tmp2 = runtime.safeCall(Predef.fold(lambda));
        tmp3 = runtime.safeCall(tmp2(...pieces2));
        return this.output(tmp1, "\u2515 ", "  ", tmp3)
      } 
      trace(intro, makeOutro, thunk) {
        let result, tmp, tmp1, tmp2, tmp3;
        tmp = this.enter(intro);
        tmp1 = runtime.safeCall(thunk());
        result = tmp1;
        tmp2 = runtime.safeCall(makeOutro(result));
        tmp3 = this.leave(tmp2);
        return result
      } 
      reset() {
        this.steps = 0;
        return runtime.Unit
      }
      toString() { return "TreeTracer"; }
    };
  }
  static toString() { return "TreeTracer"; }
});
let TreeTracer = TreeTracer2; export default TreeTracer;
