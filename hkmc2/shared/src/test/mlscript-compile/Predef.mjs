import runtime from "./Runtime.mjs";
let Predef1;
Predef1 = class Predef {
  static {
    this.assert = globalThis.console.assert;
    this.foldl = Predef.fold;
    this.MatchResult = function MatchResult(captures1) { return new MatchResult.class(captures1); };
    this.MatchResult.class = class MatchResult {
      constructor(captures) {
        this.captures = captures;
      }
      toString() { return "MatchResult(" + globalThis.Predef.render(this.captures) + ")"; }
    };
    this.MatchFailure = function MatchFailure(errors1) { return new MatchFailure.class(errors1); };
    this.MatchFailure.class = class MatchFailure {
      constructor(errors) {
        this.errors = errors;
      }
      toString() { return "MatchFailure(" + globalThis.Predef.render(this.errors) + ")"; }
    };
    this.TraceLogger = class TraceLogger {
      static {
        this.enabled = false;
        this.indentLvl = 0;
      }
      static indent() {
        let scrut, prev, tmp;
        scrut = TraceLogger.enabled;
        if (scrut === true) {
          prev = TraceLogger.indentLvl;
          tmp = prev + 1;
          TraceLogger.indentLvl = tmp;
          return prev
        } else {
          return runtime.Unit
        }
      } 
      static resetIndent(n) {
        let scrut;
        scrut = TraceLogger.enabled;
        if (scrut === true) {
          TraceLogger.indentLvl = n;
          return runtime.Unit
        } else {
          return runtime.Unit
        }
      } 
      static log(msg) {
        let scrut, tmp, tmp1, tmp2, tmp3, tmp4;
        scrut = TraceLogger.enabled;
        if (scrut === true) {
          tmp = runtime.safeCall("| ".repeat(TraceLogger.indentLvl));
          tmp1 = runtime.safeCall("  ".repeat(TraceLogger.indentLvl));
          tmp2 = "\n" + tmp1;
          tmp3 = msg.replaceAll("\n", tmp2);
          tmp4 = tmp + tmp3;
          return runtime.safeCall(globalThis.console.log(tmp4))
        } else {
          return runtime.Unit
        }
      }
      static toString() { return "TraceLogger"; }
    };
    this.Test = class Test {
      constructor() {
        let tmp;
        tmp = Predef.print("Test");
        this.y = 1;
      }
      toString() { return "Test"; }
    };
    this.__Cont = function __Cont(next1) { return new __Cont.class(next1); };
    this.__Cont.class = class __Cont {
      constructor(next) {
        this.next = next;
      }
      toString() { return "__Cont(" + globalThis.Predef.render(this.next) + ")"; }
    };
    this.__TailList = function __TailList(next1) { return new __TailList.class(next1); };
    this.__TailList.class = class __TailList {
      constructor(next) {
        this.next = next;
      }
      toString() { return "__TailList(" + globalThis.Predef.render(this.next) + ")"; }
    };
    this.__ListWithTail = function __ListWithTail(next1, tail1) { return new __ListWithTail.class(next1, tail1); };
    this.__ListWithTail.class = class __ListWithTail {
      constructor(next, tail) {
        this.next = next;
        this.tail = tail;
      }
      append(elem) {
        this.tail.next = elem;
        this.tail = elem;
        return runtime.Unit
      }
      toString() { return "__ListWithTail(" + globalThis.Predef.render(this.next) + ", " + globalThis.Predef.render(this.tail) + ")"; }
    };
    this.__HandleBlock = function __HandleBlock(contHead1, lastHandlerCont1, next1, handler1) { return new __HandleBlock.class(contHead1, lastHandlerCont1, next1, handler1); };
    this.__HandleBlock.class = class __HandleBlock {
      constructor(contHead, lastHandlerCont, next, handler) {
        this.contHead = contHead;
        this.lastHandlerCont = lastHandlerCont;
        this.next = next;
        this.handler = handler;
      }
      toString() { return "__HandleBlock(" + globalThis.Predef.render(this.contHead) + ", " + globalThis.Predef.render(this.lastHandlerCont) + ", " + globalThis.Predef.render(this.next) + ", " + globalThis.Predef.render(this.handler) + ")"; }
    };
    this.__EffectSig = function __EffectSig(next1, tail1, handleBlockList1, resumed1, handler1, handlerFun1) { return new __EffectSig.class(next1, tail1, handleBlockList1, resumed1, handler1, handlerFun1); };
    this.__EffectSig.class = class __EffectSig {
      constructor(next, tail, handleBlockList, resumed, handler, handlerFun) {
        this.next = next;
        this.tail = tail;
        this.handleBlockList = handleBlockList;
        this.resumed = resumed;
        this.handler = handler;
        this.handlerFun = handlerFun;
      }
      toString() { return "__EffectSig(" + globalThis.Predef.render(this.next) + ", " + globalThis.Predef.render(this.tail) + ", " + globalThis.Predef.render(this.handleBlockList) + ", " + globalThis.Predef.render(this.resumed) + ", " + globalThis.Predef.render(this.handler) + ", " + globalThis.Predef.render(this.handlerFun) + ")"; }
    };
    this.__Return = function __Return(value1) { return new __Return.class(value1); };
    this.__Return.class = class __Return {
      constructor(value) {
        this.value = value;
      }
      toString() { return "__Return(" + globalThis.Predef.render(this.value) + ")"; }
    };
    this.__stackLimit = 0;
    this.__stackDepth = 0;
    this.__stackOffset = 0;
    this.__stackHandler = null;
    this.__StackDelay = class __StackDelay {
      constructor() {}
      toString() { return "__StackDelay"; }
    };
  }
  static id(x) {
    return x
  } 
  static not(x1) {
    if (x1 === false) {
      return true
    } else {
      return false
    }
  } 
  static apply(f, ...args) {
    return runtime.safeCall(f(...args))
  } 
  static pipeInto(x2, f1) {
    return runtime.safeCall(f1(x2))
  } 
  static pipeFrom(f2, x3) {
    return runtime.safeCall(f2(x3))
  } 
  static andThen(f3, g) {
    return (x4) => {
      let tmp;
      tmp = runtime.safeCall(f3(x4));
      return runtime.safeCall(g(tmp))
    }
  } 
  static compose(f4, g1) {
    return (x4) => {
      let tmp;
      tmp = runtime.safeCall(g1(x4));
      return runtime.safeCall(f4(tmp))
    }
  } 
  static passTo(receiver, f5) {
    return (...args1) => {
      return runtime.safeCall(f5(receiver, ...args1))
    }
  } 
  static call(receiver1, f6) {
    return (...args1) => {
      return f6.call(receiver1, ...args1)
    }
  } 
  static pass1(f7) {
    return (...xs) => {
      return runtime.safeCall(f7(xs[0]))
    }
  } 
  static pass2(f8) {
    return (...xs) => {
      return runtime.safeCall(f8(xs[0], xs[1]))
    }
  } 
  static pass3(f9) {
    return (...xs) => {
      return runtime.safeCall(f9(xs[0], xs[1], xs[2]))
    }
  } 
  static tap(x4, f10) {
    let tmp;
    tmp = runtime.safeCall(f10(x4));
    return x4
  } 
  static print(...xs) {
    let tmp, tmp1;
    tmp = Predef.map(Predef.renderAsStr);
    tmp1 = runtime.safeCall(tmp(...xs));
    return runtime.safeCall(globalThis.console.log(...tmp1))
  } 
  static printRaw(x5) {
    let tmp;
    tmp = Predef.render(x5);
    return runtime.safeCall(globalThis.console.log(tmp))
  } 
  static interleave(sep) {
    return (...args1) => {
      let res, len, i, scrut, idx, scrut1, scrut2, tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7;
      scrut2 = args1.length === 0;
      if (scrut2 === true) {
        return []
      } else {
        tmp = args1.length * 2;
        tmp1 = tmp - 1;
        tmp2 = globalThis.Array(tmp1);
        res = tmp2;
        len = args1.length;
        i = 0;
        tmp8: while (true) {
          scrut = i < len;
          if (scrut === true) {
            tmp3 = i * 2;
            idx = tmp3;
            res[idx] = args1[i];
            tmp4 = i + 1;
            i = tmp4;
            scrut1 = i < len;
            if (scrut1 === true) {
              tmp5 = idx + 1;
              res[tmp5] = sep;
              tmp6 = runtime.Unit;
            } else {
              tmp6 = runtime.Unit;
            }
            tmp7 = tmp6;
            continue tmp8;
          } else {
            tmp7 = runtime.Unit;
          }
          break;
        }
        return res
      }
    }
  } 
  static renderAsStr(arg) {
    if (typeof arg === 'string') {
      return arg
    } else {
      return Predef.render(arg)
    }
  } 
  static render(arg1) {
    let ts, p, scrut, scrut1, scrut2, nme, tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20;
    if (arg1 === undefined) {
      return "undefined"
    } else if (arg1 === null) {
      return "null"
    } else if (arg1 instanceof globalThis.Array) {
      tmp = Predef.fold((arg11, arg2) => {
        return arg11 + arg2
      });
      tmp1 = Predef.interleave(", ");
      tmp2 = Predef.map(Predef.render);
      tmp3 = runtime.safeCall(tmp2(...arg1));
      tmp4 = runtime.safeCall(tmp1(...tmp3));
      return runtime.safeCall(tmp("[", ...tmp4, "]"))
    } else if (typeof arg1 === 'string') {
      return runtime.safeCall(globalThis.JSON.stringify(arg1))
    } else if (arg1 instanceof globalThis.Set) {
      tmp5 = Predef.fold((arg11, arg2) => {
        return arg11 + arg2
      });
      tmp6 = Predef.interleave(", ");
      tmp7 = Predef.map(Predef.render);
      tmp8 = runtime.safeCall(tmp7(...arg1));
      tmp9 = runtime.safeCall(tmp6(...tmp8));
      return runtime.safeCall(tmp5("Set{", ...tmp9, "}"))
    } else if (arg1 instanceof globalThis.Map) {
      tmp10 = Predef.fold((arg11, arg2) => {
        return arg11 + arg2
      });
      tmp11 = Predef.interleave(", ");
      tmp12 = Predef.map(Predef.render);
      tmp13 = runtime.safeCall(tmp12(...arg1));
      tmp14 = runtime.safeCall(tmp11(...tmp13));
      return runtime.safeCall(tmp10("Map{", ...tmp14, "}"))
    } else if (arg1 instanceof globalThis.Function) {
      p = globalThis.Object.getOwnPropertyDescriptor(arg1, "prototype");
      if (p instanceof globalThis.Object) {
        scrut = p["writable"];
        if (scrut === true) {
          tmp15 = true;
        } else {
          tmp15 = false;
        }
      } else {
        tmp15 = false;
      }
      if (p === undefined) {
        tmp16 = true;
      } else {
        tmp16 = false;
      }
      scrut1 = tmp15 || tmp16;
      if (scrut1 === true) {
        scrut2 = arg1.name;
        if (scrut2 === "") {
          tmp17 = "";
        } else {
          nme = scrut2;
          tmp17 = " " + nme;
        }
        tmp18 = "[function" + tmp17;
        return tmp18 + "]"
      } else {
        return globalThis.String(arg1)
      }
    } else if (arg1 instanceof globalThis.Object) {
      return globalThis.String(arg1)
    } else {
      ts = arg1["toString"];
      if (ts === undefined) {
        tmp19 = typeof arg1;
        tmp20 = "[" + tmp19;
        return tmp20 + "]"
      } else {
        return runtime.safeCall(ts.call(arg1))
      }
    }
  } 
  static notImplemented(msg) {
    let tmp;
    tmp = "Not implemented: " + msg;
    throw globalThis.Error(tmp);
  } 
  static get notImplementedError() {
    throw globalThis.Error("Not implemented");
  } 
  static tuple(...xs1) {
    return xs1
  } 
  static tupleSlice(xs2, i, j) {
    let tmp;
    tmp = xs2.length - j;
    return runtime.safeCall(globalThis.Array.prototype.slice.call(xs2, i, tmp))
  } 
  static tupleGet(xs3, i1) {
    return globalThis.Array.prototype.at.call(xs3, i1)
  } 
  static map(f11) {
    return (...xs4) => {
      let tmp;
      tmp = Predef.pass1(f11);
      return runtime.safeCall(xs4.map(tmp))
    }
  } 
  static fold(f12) {
    return (init, ...rest) => {
      let i2, len, scrut, tmp, tmp1, tmp2, tmp3;
      i2 = 0;
      len = rest.length;
      tmp4: while (true) {
        scrut = i2 < len;
        if (scrut === true) {
          tmp = runtime.safeCall(rest.at(i2));
          tmp1 = runtime.safeCall(f12(init, tmp));
          init = tmp1;
          tmp2 = i2 + 1;
          i2 = tmp2;
          tmp3 = runtime.Unit;
          continue tmp4;
        } else {
          tmp3 = runtime.Unit;
        }
        break;
      }
      return init
    }
  } 
  static foldr(f13) {
    return (first, ...rest) => {
      let len, i2, init, scrut, scrut1, tmp, tmp1, tmp2, tmp3, tmp4, tmp5;
      len = rest.length;
      scrut1 = len == 0;
      if (scrut1 === true) {
        return first
      } else {
        tmp = len - 1;
        i2 = tmp;
        tmp1 = runtime.safeCall(rest.at(i2));
        init = tmp1;
        tmp6: while (true) {
          scrut = i2 > 0;
          if (scrut === true) {
            tmp2 = i2 - 1;
            i2 = tmp2;
            tmp3 = runtime.safeCall(rest.at(i2));
            tmp4 = runtime.safeCall(f13(tmp3, init));
            init = tmp4;
            tmp5 = runtime.Unit;
            continue tmp6;
          } else {
            tmp5 = runtime.Unit;
          }
          break;
        }
        return runtime.safeCall(f13(first, init))
      }
    }
  } 
  static mkStr(...xs4) {
    let tmp, tmp1;
    tmp = (acc, x6) => {
      let tmp2, tmp3, tmp4;
      if (typeof x6 === 'string') {
        tmp2 = true;
      } else {
        tmp2 = false;
      }
      tmp3 = runtime.safeCall(Predef.assert(tmp2));
      tmp4 = acc + x6;
      return (tmp3 , tmp4)
    };
    tmp1 = Predef.fold(tmp);
    return runtime.safeCall(tmp1(...xs4))
  } 
  static stringStartsWith(string, prefix) {
    return runtime.safeCall(string.startsWith(prefix))
  } 
  static stringGet(string1, i2) {
    return runtime.safeCall(string1.at(i2))
  } 
  static stringDrop(string2, n) {
    return runtime.safeCall(string2.slice(n))
  } 
  static get unreachable() {
    throw globalThis.Error("unreachable");
  } 
  static checkArgs(functionName, expected, isUB, got) {
    let scrut, name, scrut1, scrut2, tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8;
    tmp = got < expected;
    tmp1 = got > expected;
    tmp2 = isUB && tmp1;
    scrut = tmp || tmp2;
    if (scrut === true) {
      scrut1 = functionName.length > 0;
      if (scrut1 === true) {
        tmp3 = " '" + functionName;
        tmp4 = tmp3 + "'";
      } else {
        tmp4 = "";
      }
      name = tmp4;
      tmp5 = Predef.fold((arg11, arg2) => {
        return arg11 + arg2
      });
      if (isUB === true) {
        tmp6 = "";
      } else {
        tmp6 = "at least ";
      }
      scrut2 = expected === 1;
      if (scrut2 === true) {
        tmp7 = "";
      } else {
        tmp7 = "s";
      }
      tmp8 = runtime.safeCall(tmp5("Function", name, " expected ", tmp6, expected, " argument", tmp7, " but got ", got));
      throw globalThis.Error(tmp8);
    } else {
      return runtime.Unit
    }
  } 
  static __mkListWithTail() {
    let res, tmp;
    tmp = new Predef.__ListWithTail.class(null, null);
    res = tmp;
    res.tail = res;
    return res
  } 
  static __appendInCont(eff, cont) {
    let scrut, scrut1, tmp, tmp1;
    scrut = eff.tail;
    if (scrut instanceof Predef.__TailList.class) {
      scrut1 = cont.next !== null;
      if (scrut1 === true) {
        throw globalThis.Error("unexpected handler continuation");
      } else {
        tmp = runtime.Unit;
      }
      cont.next = eff.tail.next;
      eff.tail.next = cont;
      tmp1 = runtime.Unit;
    } else {
      eff.tail.next = cont;
      tmp1 = runtime.Unit;
    }
    return eff
  } 
  static __mkEffect(handler, handlerFun) {
    let res, tmp, tmp1;
    tmp = Predef.__mkListWithTail();
    tmp1 = new Predef.__EffectSig.class(null, null, tmp, false, handler, handlerFun);
    res = tmp1;
    res.tail = res;
    return res
  } 
  static __handleBlockImpl(cur, handler1) {
    let handleBlock, nxt, scrut, scrut1, tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6;
    tmp = Predef.__TailList(null);
    tmp1 = new Predef.__HandleBlock.class(tmp, null, null, handler1);
    handleBlock = tmp1;
    tmp2 = runtime.safeCall(cur.handleBlockList.append(handleBlock));
    tmp7: while (true) {
      if (cur instanceof Predef.__EffectSig.class) {
        tmp3 = Predef.__handleEffect(cur);
        nxt = tmp3;
        scrut = cur === nxt;
        if (scrut === true) {
          scrut1 = handleBlock.lastHandlerCont === null;
          if (scrut1 === true) {
            cur.tail = handleBlock.contHead;
            tmp4 = runtime.Unit;
          } else {
            cur.tail = handleBlock.lastHandlerCont;
            tmp4 = runtime.Unit;
          }
          return cur
        } else {
          cur = nxt;
          tmp5 = runtime.Unit;
        }
        tmp6 = tmp5;
        continue tmp7;
      } else {
        return cur
      }
      break;
    }
    return tmp6
  } 
  static __handleEffect(cur1) {
    let prevBlock, scrut, scrut1, scrut2, handleBlock, origTailBlock, savedNext, scrut3, scrut4, tmp, tmp1, tmp2, tmp3, tmp4, tmp5;
    prevBlock = cur1.handleBlockList;
    tmp6: while (true) {
      scrut = prevBlock.next;
      if (scrut instanceof Predef.__HandleBlock.class) {
        scrut1 = prevBlock.next.handler !== cur1.handler;
        if (scrut1 === true) {
          prevBlock = prevBlock.next;
          tmp = runtime.Unit;
          continue tmp6;
        } else {
          tmp = runtime.Unit;
        }
      } else {
        tmp = runtime.Unit;
      }
      break;
    }
    scrut2 = prevBlock.next === null;
    if (scrut2 === true) {
      return cur1
    } else {
      tmp1 = runtime.Unit;
    }
    handleBlock = prevBlock.next;
    origTailBlock = cur1.handleBlockList.tail;
    prevBlock.next = null;
    cur1.handleBlockList.tail = prevBlock;
    savedNext = handleBlock.contHead.next;
    tmp2 = Predef.__resume(cur1, handleBlock.contHead);
    tmp3 = runtime.safeCall(cur1.handlerFun(tmp2));
    cur1 = tmp3;
    scrut3 = savedNext !== handleBlock.contHead.next;
    if (scrut3 === true) {
      handleBlock.contHead.next.next = savedNext;
      scrut4 = handleBlock.lastHandlerCont === null;
      if (scrut4 === true) {
        handleBlock.lastHandlerCont = handleBlock.contHead.next;
        tmp4 = runtime.Unit;
      } else {
        tmp4 = runtime.Unit;
      }
      tmp5 = tmp4;
    } else {
      tmp5 = runtime.Unit;
    }
    if (cur1 instanceof Predef.__EffectSig.class) {
      cur1.handleBlockList.tail.next = handleBlock;
      cur1.handleBlockList.tail = origTailBlock;
      return cur1
    } else {
      return Predef.__resumeHandleBlocks(handleBlock, origTailBlock, cur1)
    }
  } 
  static __resume(cur2, tail) {
    return (value) => {
      let scrut, cont1, scrut1, scrut2, scrut3, scrut4, scrut5, scrut6, tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9;
      scrut = cur2.resumed;
      if (scrut === true) {
        throw globalThis.Error("Multiple resumption");
      } else {
        tmp = runtime.Unit;
      }
      cur2.resumed = true;
      cont1 = cur2.next;
      tmp10: while (true) {
        if (cont1 instanceof Predef.__Cont.class) {
          tmp1 = runtime.safeCall(cont1.resume(value));
          value = tmp1;
          if (value instanceof Predef.__EffectSig.class) {
            scrut1 = value.tail.next !== cont1;
            if (scrut1 === true) {
              scrut2 = cont1.next !== null;
              if (scrut2 === true) {
                scrut3 = value.tail.next !== null;
                if (scrut3 === true) {
                  throw globalThis.Error("Internal Error: unexpected continuation");
                } else {
                  tmp2 = runtime.Unit;
                }
              } else {
                tmp2 = runtime.Unit;
              }
              tmp3 = tmp2;
            } else {
              tmp3 = runtime.Unit;
            }
            scrut4 = value.tail.next === null;
            if (scrut4 === true) {
              value.tail.next = cont1.next;
              tmp4 = runtime.Unit;
            } else {
              tmp4 = runtime.Unit;
            }
            value.tail = tail;
            scrut5 = cur2.handleBlockList.next !== null;
            if (scrut5 === true) {
              value.handleBlockList.tail.next = cur2.handleBlockList.next;
              value.handleBlockList.tail = cur2.handleBlockList.tail;
              tmp5 = runtime.Unit;
            } else {
              tmp5 = runtime.Unit;
            }
            return value
          } else {
            cont1 = cont1.next;
            tmp6 = runtime.Unit;
          }
          tmp7 = tmp6;
          continue tmp10;
        } else {
          tmp7 = runtime.Unit;
        }
        break;
      }
      scrut6 = cur2.handleBlockList.next === null;
      if (scrut6 === true) {
        return value
      } else {
        tmp8 = Predef.__resumeHandleBlocks(cur2.handleBlockList.next, cur2.handleBlockList.tail, value);
        cur2 = tmp8;
        if (cur2 instanceof Predef.__EffectSig.class) {
          cur2.tail = tail;
          tmp9 = runtime.Unit;
        } else {
          tmp9 = runtime.Unit;
        }
        return cur2
      }
    }
  } 
  static __resumeHandleBlocks(handleBlock, tailHandleBlock, value) {
    let scrut, scrut1, scrut2, scrut3, scrut4, tmp, tmp1, tmp2, tmp3, tmp4;
    tmp5: while (true) {
      scrut1 = handleBlock.contHead.next;
      if (scrut1 instanceof Predef.__Cont.class) {
        tmp = runtime.safeCall(handleBlock.contHead.next.resume(value));
        value = tmp;
        if (value instanceof Predef.__EffectSig.class) {
          scrut2 = value.tail.next !== handleBlock.contHead.next;
          if (scrut2 === true) {
            scrut3 = value.tail.next !== null;
            if (scrut3 === true) {
              throw globalThis.Error("Internal Error: unexpected continuation during handle block resumption");
            } else {
              tmp1 = runtime.Unit;
            }
          } else {
            tmp1 = runtime.Unit;
          }
          scrut4 = value.tail.next !== handleBlock.contHead.next;
          if (scrut4 === true) {
            handleBlock.contHead.next = handleBlock.contHead.next.next;
            tmp2 = runtime.Unit;
          } else {
            tmp2 = runtime.Unit;
          }
          value.tail.next = null;
          value.handleBlockList.tail.next = handleBlock;
          value.handleBlockList.tail = tailHandleBlock;
          return value
        } else {
          handleBlock.contHead.next = handleBlock.contHead.next.next;
          tmp3 = runtime.Unit;
        }
        tmp4 = tmp3;
        continue tmp5;
      } else {
        scrut = handleBlock.next;
        if (scrut instanceof Predef.__HandleBlock.class) {
          handleBlock = handleBlock.next;
          tmp4 = runtime.Unit;
          continue tmp5;
        } else {
          return value
        }
      }
      break;
    }
    return tmp4
  } 
  static checkDepth() {
    let scrut, tmp, tmp1, tmp2;
    tmp = Predef.__stackDepth - Predef.__stackOffset;
    tmp1 = tmp >= Predef.__stackLimit;
    tmp2 = Predef.__stackHandler !== null;
    scrut = tmp1 && tmp2;
    if (scrut === true) {
      return runtime.safeCall(Predef.__stackHandler.perform())
    } else {
      return runtime.Unit
    }
  } 
  static resetDepth(tmp, curDepth) {
    let scrut, tmp1;
    Predef.__stackDepth = curDepth;
    scrut = curDepth < Predef.__stackOffset;
    if (scrut === true) {
      Predef.__stackOffset = curDepth;
      tmp1 = runtime.Unit;
    } else {
      tmp1 = runtime.Unit;
    }
    return tmp
  }
  static toString() { return "Predef"; }
};
let Predef = Predef1; export default Predef;
