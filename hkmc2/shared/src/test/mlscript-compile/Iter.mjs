import runtime from "./Runtime.mjs";
import Predef from "./Predef.mjs";
let Iterable1, Iterator1, Iter1, Result1;
Iterable1 = function Iterable(mk1) { return new Iterable.class(mk1); };
Iterable1.class = class Iterable {
  constructor(mk) {
    this.mk = mk;
    this[globalThis.Symbol.iterator] = this.mk;
    runtime.Unit
  }
  toString() { return "Iterable(" + globalThis.Predef.render(this.mk) + ")"; }
};
Iterator1 = function Iterator(next1) { return new Iterator.class(next1); };
Iterator1.class = class Iterator {
  constructor(next) {
    this.next = next;
  }
  toString() { return "Iterator(" + globalThis.Predef.render(this.next) + ")"; }
};
Result1 = class Result {
  static {
    this.Next = function Next(value1) { return new Next.class(value1); };
    this.Next.class = class Next {
      constructor(value) {
        this.value = value;
        this.done = false;
      }
      toString() { return "Next(" + globalThis.Predef.render(this.value) + ")"; }
    };
    const Done$class = class Done {
      constructor() {
        this.done = true;
      }
      toString() { return "Done"; }
    };
    this.Done = new Done$class;
    this.Done.class = Done$class;
  }
  static toString() { return "Result"; }
};
Iter1 = class Iter {
  static {}
  static derive(iterable, makeNext) {
    return Iterable1(() => {
      let iterator, tmp, tmp1;
      tmp = runtime.safeCall(iterable[globalThis.Symbol.iterator]());
      iterator = tmp;
      tmp1 = runtime.safeCall(makeNext(iterator));
      return Iterator1(tmp1)
    })
  } 
  static mapping(xs, op) {
    return Iter.derive(xs, (iterator) => {
      return () => {
        let next, scrut, tmp, tmp1;
        tmp = runtime.safeCall(iterator.next());
        next = tmp;
        scrut = next.done;
        if (scrut === true) {
          return Result1.Done
        } else {
          tmp1 = runtime.safeCall(op(next.value));
          return Result1.Next(tmp1)
        }
      }
    })
  } 
  static filtering(xs1, op1) {
    return Iter.derive(xs1, (iterator) => {
      return () => {
        let next, scrut, scrut1, scrut2, tmp, tmp1, tmp2;
        tmp = runtime.safeCall(iterator.next());
        next = tmp;
        tmp3: while (true) {
          scrut = next.done;
          if (scrut === false) {
            scrut1 = runtime.safeCall(op1(next.value));
            if (scrut1 === false) {
              tmp1 = runtime.safeCall(iterator.next());
              next = tmp1;
              tmp2 = runtime.Unit;
              continue tmp3;
            } else {
              tmp2 = runtime.Unit;
            }
          } else {
            tmp2 = runtime.Unit;
          }
          break;
        }
        scrut2 = next.done;
        if (scrut2 === true) {
          return Result1.Done
        } else {
          return Result1.Next(next.value)
        }
      }
    })
  } 
  static taking(xs2, n) {
    let i;
    i = 0;
    return Iter.filtering(xs2, (_) => {
      let tmp;
      tmp = i + 1;
      i = tmp;
      return i <= n
    })
  } 
  static zippingWithIndex(xs3) {
    let i;
    i = 0;
    return Iter.mapping(xs3, (x) => {
      let j, tmp;
      j = i;
      tmp = i + 1;
      i = tmp;
      return [
        x,
        j
      ]
    })
  } 
  static foldingImpl(iterator, acc, op2) {
    let next, scrut, tmp, tmp1, tmp2, tmp3;
    tmp = runtime.safeCall(iterator.next());
    next = tmp;
    tmp4: while (true) {
      scrut = next.done;
      if (scrut === false) {
        tmp1 = runtime.safeCall(op2(acc, next.value));
        acc = tmp1;
        tmp2 = runtime.safeCall(iterator.next());
        next = tmp2;
        tmp3 = runtime.Unit;
        continue tmp4;
      } else {
        tmp3 = runtime.Unit;
      }
      break;
    }
    return acc
  } 
  static reduced(xs4, op3) {
    let iterator1, next, scrut, tmp, tmp1, tmp2;
    tmp = runtime.safeCall(xs4[globalThis.Symbol.iterator]());
    iterator1 = tmp;
    tmp1 = runtime.safeCall(iterator1.next());
    next = tmp1;
    scrut = next.done;
    if (scrut === true) {
      throw new globalThis.Error.class("Empty iterator");
    } else {
      tmp2 = runtime.Unit;
    }
    return Iter.foldingImpl(iterator1, next.value, op3)
  } 
  static folded(xs5, z, op4) {
    let iterator1, tmp;
    tmp = runtime.safeCall(xs5[globalThis.Symbol.iterator]());
    iterator1 = tmp;
    return Iter.foldingImpl(iterator1, z, op4)
  } 
  static rightFolded(xs6, z1, op5) {
    let go, iterator1, tmp;
    go = function go() {
      let next, scrut, tmp1;
      next = runtime.safeCall(iterator1.next());
      scrut = next.done;
      if (scrut === true) {
        return z1
      } else {
        tmp1 = go();
        return runtime.safeCall(op5(next.value, tmp1))
      }
    };
    tmp = runtime.safeCall(xs6[globalThis.Symbol.iterator]());
    iterator1 = tmp;
    return go()
  } 
  static joined(xs7, sep) {
    let iterator1, next, sep$_, scrut, tmp, tmp1, tmp2, tmp3;
    tmp = runtime.safeCall(xs7[globalThis.Symbol.iterator]());
    iterator1 = tmp;
    tmp1 = runtime.safeCall(iterator1.next());
    next = tmp1;
    scrut = next.done;
    if (scrut === true) {
      return ""
    } else {
      tmp2 = globalThis.String(sep);
      sep$_ = tmp2;
      tmp3 = globalThis.String(next.value);
      return Iter.foldingImpl(iterator1, tmp3, (acc1, x) => {
        let tmp4, tmp5;
        tmp4 = acc1 + sep;
        tmp5 = globalThis.String(x);
        return tmp4 + tmp5
      })
    }
  } 
  static toArray(view) {
    return runtime.safeCall(globalThis.Array.from(view))
  }
  static toString() { return "Iter"; }
};
let Iter = Iter1; export default Iter;
