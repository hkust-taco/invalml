import runtime from "./Runtime.mjs";
import Predef from "./Predef.mjs";
import Iter from "./Iter.mjs";
let StyleAttributeValue1, XML1;
StyleAttributeValue1 = function StyleAttributeValue(rules1) {
  return new StyleAttributeValue.class(rules1);
};
StyleAttributeValue1.class = class StyleAttributeValue {
  constructor(rules) {
    this.rules = rules;
  }
  toValue() {
    let tmp, tmp1, tmp2, tmp3, lambda;
    tmp = runtime.safeCall(globalThis.Object.entries(this.rules));
    lambda = (undefined, function (caseScrut) {
      let first1, first0, name, value, tmp4;
      if (globalThis.Array.isArray(caseScrut) && caseScrut.length === 2) {
        first0 = caseScrut[0];
        first1 = caseScrut[1];
        name = first0;
        value = first1;
        tmp4 = name + ": ";
        return tmp4 + value
      } else {
        throw new globalThis.Error("match error");
      }
    });
    tmp1 = lambda;
    tmp2 = Iter.mapping(tmp, tmp1);
    tmp3 = Iter.joined(tmp2, "; ");
    return runtime.safeCall(globalThis.JSON.stringify(tmp3))
  }
  toString() { return "StyleAttributeValue(" + runtime.render(this.rules) + ")"; }
};
(class XML {
  static {
    XML1 = XML;
  }
  static serializeValue(value) {
    if (typeof value === 'string') {
      return runtime.safeCall(globalThis.JSON.stringify(value))
    } else if (value instanceof StyleAttributeValue1.class) {
      return runtime.safeCall(value.toValue())
    } else {
      throw new globalThis.Error("match error");
    }
  } 
  static joinAttributes(attributes) {
    let tmp, tmp1, lambda;
    lambda = (undefined, function (caseScrut) {
      let record, style, first1, first0, name, value1, tmp2, tmp3, tmp4, tmp5;
      if (globalThis.Array.isArray(caseScrut) && caseScrut.length === 2) {
        first0 = caseScrut[0];
        first1 = caseScrut[1];
        name = first0;
        value1 = first1;
        tmp2 = name + "=";
        tmp3 = XML.serializeValue(value1);
        return tmp2 + tmp3
      } else if (caseScrut instanceof StyleAttributeValue1.class) {
        style = caseScrut;
        tmp4 = runtime.safeCall(style.toValue());
        return "style=" + tmp4
      } else if (caseScrut instanceof globalThis.Object) {
        record = caseScrut;
        tmp5 = runtime.safeCall(globalThis.Object.entries(record));
        return XML.joinAttributes(tmp5)
      } else {
        throw new globalThis.Error("match error");
      }
    });
    tmp = lambda;
    tmp1 = Iter.mapping(attributes, tmp);
    return Iter.joined(tmp1, " ")
  } 
  static elem(tagName, ...attributes1) {
    return (...elements) => {
      let tmp, tmp1, tmp2, lambda;
      lambda = (undefined, function (arg1, arg2) {
        return arg1 + arg2
      });
      tmp = runtime.safeCall(Predef.fold(lambda));
      if (globalThis.Array.isArray(attributes1) && attributes1.length === 0) {
        tmp1 = "";
      } else {
        tmp2 = XML.joinAttributes(attributes1);
        tmp1 = " " + tmp2;
      }
      return runtime.safeCall(tmp("<", tagName, tmp1, ">", ...elements, "</", tagName, ">"))
    }
  } 
  static tag(tagName1) {
    return (...attributes2) => {
      let tmp, tmp1, tmp2, lambda;
      lambda = (undefined, function (arg1, arg2) {
        return arg1 + arg2
      });
      tmp = runtime.safeCall(Predef.fold(lambda));
      if (globalThis.Array.isArray(attributes2) && attributes2.length === 0) {
        tmp1 = "";
      } else {
        tmp2 = XML.joinAttributes(attributes2);
        tmp1 = " " + tmp2;
      }
      return runtime.safeCall(tmp("<", tagName1, tmp1, " ", "/>"))
    }
  } 
  static style(rules) {
    return StyleAttributeValue1(rules)
  } 
  static html(...attributes2) {
    return (...elements) => {
      let tmp, tmp1;
      tmp = XML.elem("html", ...attributes2);
      tmp1 = runtime.safeCall(tmp(...elements));
      return "<!DOCTYPE html>" + tmp1
    }
  }
  static toString() { return "XML"; }
});
let XML = XML1; export default XML;
