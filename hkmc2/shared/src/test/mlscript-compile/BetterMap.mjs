import runtime from "./Runtime.mjs";
import Option from "./Option.mjs";
let BetterMap1;
BetterMap1 = class BetterMap {
  static {
    this.Map = class Map {
      #storage;
      constructor() {
        let tmp;
        tmp = new globalThis.Map();
        this.#storage = tmp;
        this[globalThis.Symbol.iterator] = () => {
          return runtime.safeCall(this.#storage[globalThis.Symbol.iterator]())
        };
      }
      get(key) {
        let scrut, tmp;
        scrut = runtime.safeCall(this.#storage.has(key));
        if (scrut === true) {
          tmp = runtime.safeCall(this.#storage.get(key));
          return Option.Some(tmp)
        } else {
          return Option.None
        }
      } 
      insert(key1, value) {
        let tmp;
        tmp = this.#storage.set(key1, value);
        return runtime.Unit
      } 
      get keysIterator() {
        return runtime.safeCall(this.#storage.keys());
      } 
      get valuesIterator() {
        return runtime.safeCall(this.#storage.values());
      } 
      get values() {
        let tmp;
        tmp = runtime.safeCall(this.#storage.values());
        return runtime.safeCall(globalThis.Array.from(tmp));
      }
      toString() { return "Map"; }
    };
  }
  static toMap(entries) {
    let m, i, length, scrut, tmp, tmp1, tmp2, tmp3, tmp4;
    tmp = new BetterMap.Map();
    m = tmp;
    i = 0;
    length = entries.length;
    tmp5: while (true) {
      scrut = i < length;
      if (scrut === true) {
        tmp1 = runtime.safeCall(entries.at(i));
        tmp2 = runtime.safeCall(m.insert(...tmp1));
        tmp3 = i + 1;
        i = tmp3;
        tmp4 = runtime.Unit;
        continue tmp5;
      } else {
        tmp4 = runtime.Unit;
      }
      break;
    }
    return m
  }
  static toString() { return "BetterMap"; }
};
let BetterMap = BetterMap1; export default BetterMap;
