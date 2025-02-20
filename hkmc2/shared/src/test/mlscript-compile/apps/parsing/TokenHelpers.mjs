import runtime from "./../../Runtime.mjs";
import Token from "./Token.mjs";
import Stack from "./../../Stack.mjs";
import Predef from "./../../Predef.mjs";
let TokenHelpers1;
TokenHelpers1 = class TokenHelpers {
  static {}
  static display(tokens, limit) {
    let i, values, scrut, param0, param1, head, tail, param01, param11, tmp, tmp1, tmp2, tmp3, tmp4, tmp5;
    i = 0;
    values = [];
    tmp6: while (true) {
      scrut = i < limit;
      if (scrut === true) {
        if (tokens instanceof Stack.Cons.class) {
          param0 = tokens.head;
          param1 = tokens.tail;
          head = param0;
          tail = param1;
          tmp = Token.summary(head);
          tmp1 = runtime.safeCall(values.push(tmp));
          tokens = tail;
          tmp2 = i + 1;
          i = tmp2;
          tmp3 = runtime.Unit;
          continue tmp6;
        } else {
          tmp3 = runtime.Unit;
        }
      } else {
        tmp3 = runtime.Unit;
      }
      break;
    }
    tmp4 = runtime.safeCall(values.join("\u2502"));
    if (tokens instanceof Stack.Cons.class) {
      param01 = tokens.head;
      param11 = tokens.tail;
      tmp5 = "\u2502\u22EF";
    } else {
      tmp5 = "\u2503";
    }
    return Predef.mkStr("\u2503", tmp4, tmp5)
  } 
  static panorama(tokens1) {
    return TokenHelpers.display(tokens1, globalThis.Number.MAX_SAFE_INTEGER)
  } 
  static preview(tokens2) {
    return TokenHelpers.display(tokens2, 5)
  }
  static toString() { return "TokenHelpers"; }
};
let TokenHelpers = TokenHelpers1; export default TokenHelpers;
