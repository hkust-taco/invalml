import runtime from "./Runtime.mjs";
let Runtime1;
Runtime1 = class Runtime {
  static {
    const Unit$class = class Unit {
      constructor() {}
      toString() {
        return "()"
      }
    };
    this.Unit = new Unit$class;
    this.Unit.class = Unit$class;
  }
  static safeCall(x) {
    if (x === undefined) {
      return Runtime.Unit
    } else {
      return x
    }
  } 
  static checkCall(x1) {
    if (x1 === undefined) {
      throw globalThis.Error("MLscript call unexpectedly returned `undefined`, the forbidden value.");
    } else {
      return x1
    }
  }
  static toString() { return "Runtime"; }
};
let Runtime = Runtime1; export default Runtime;
