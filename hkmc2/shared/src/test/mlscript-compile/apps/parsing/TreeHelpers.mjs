import runtime from "./../../Runtime.mjs";
import Option from "./../../Option.mjs";
import Predef from "./../../Predef.mjs";
import Stack from "./../../Stack.mjs";
import Tree from "./Tree.mjs";
import Keyword from "./Keyword.mjs";
import Token from "./Token.mjs";
let TreeHelpers1;
TreeHelpers1 = class TreeHelpers {
  static {}
  static first(array) {
    let first0, first;
    if (globalThis.Array.isArray(array) && array.length >= 1) {
      first0 = array[0];
      first = first0;
      return first
    } else {
      throw new globalThis.Error("match error");
    }
  } 
  static second(array1) {
    let first1, first0, second;
    if (globalThis.Array.isArray(array1) && array1.length >= 2) {
      first0 = array1[0];
      first1 = array1[1];
      second = first1;
      return second
    } else {
      throw new globalThis.Error("match error");
    }
  } 
  static indented(text) {
    let tmp;
    tmp = runtime.safeCall(text.split("\n"));
    return runtime.safeCall(tmp.join("\n  "))
  } 
  static showAsTree(thing) {
    let itemize, go;
    itemize = function itemize(something) {
      let first1, first0, x, y, keyword, param0, param1, p, b, param01, param11, param2, param3, n, l, r, b1, param02, param12, k, i, param03, param13, param21, op, lhs, rhs, param04, param14, c, a, param05, param15, scrutinee, branches, param06, param16, k1, v, param07, t, param08, t1, param09, param17, m, s, param010, param18, k2, items, param011, param19, n1, param012, param110, t2, m1, m2, param013, param111, head, tail, items1, remaining, param014, param112, head$_, tail$_, param015, content, tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20, tmp21, tmp22, tmp23, tmp24, tmp25, tmp26, tmp27, tmp28, tmp29, tmp30, tmp31, tmp32, tmp33, tmp34, tmp35, tmp36, tmp37, tmp38, tmp39, tmp40, tmp41, tmp42, tmp43, tmp44;
      if (something instanceof Option.Some.class) {
        param015 = something.value;
        content = param015;
        tmp = go(content);
        tmp1 = "Some of " + tmp;
        return Predef.tuple([
          tmp1
        ], [])
      } else if (something instanceof Option.None.class) {
        return Predef.tuple("None", [])
      } else if (something instanceof Stack.Cons.class) {
        param013 = something.head;
        param111 = something.tail;
        head = param013;
        tail = param111;
        tmp2 = go(head);
        items1 = [
          tmp2
        ];
        remaining = tail;
        tmp45: while (true) {
          if (remaining instanceof Stack.Cons.class) {
            param014 = remaining.head;
            param112 = remaining.tail;
            head$_ = param014;
            tail$_ = param112;
            tmp3 = go(head$_);
            tmp4 = runtime.safeCall(items1.push(tmp3));
            remaining = tail$_;
            tmp5 = runtime.Unit;
            continue tmp45;
          } else {
            tmp5 = runtime.Unit;
          }
          break;
        }
        tmp6 = "Stack of \n" + "  ";
        tmp7 = runtime.safeCall(items1.join("\n"));
        tmp8 = TreeHelpers.indented(tmp7);
        tmp9 = tmp6 + tmp8;
        return Predef.tuple(tmp9, [])
      } else if (something instanceof Stack.Nil.class) {
        return [
          "Nil",
          []
        ]
      } else if (typeof something === 'string') {
        tmp10 = runtime.safeCall(globalThis.JSON.stringify(something));
        return [
          tmp10,
          []
        ]
      } else if (globalThis.Number.isInteger(something)) {
        tmp11 = runtime.safeCall(something.toString());
        return [
          tmp11,
          []
        ]
      } else if (something instanceof Tree.Empty.class) {
        return [
          "Empty",
          []
        ]
      } else {
        if (something instanceof Tree.Error.class) {
          param012 = something.tree;
          param110 = something.message;
          if (param012 instanceof Tree.Empty.class) {
            m2 = param110;
            tmp12 = go(m2);
            return Predef.tuple("Error", [
              [
                "message",
                tmp12
              ]
            ])
          } else {
            t2 = param012;
            m1 = param110;
            tmp13 = go(t2);
            tmp14 = go(m1);
            return Predef.tuple("Error", [
              [
                "tree",
                tmp13
              ],
              [
                "message",
                tmp14
              ]
            ])
          }
        } else if (something instanceof Tree.Ident.class) {
          param011 = something.name;
          param19 = something.symbolic;
          n1 = param011;
          tmp15 = go(n1);
          return Predef.tuple("Ident", [
            [
              "name",
              tmp15
            ]
          ])
        } else if (something instanceof Tree.Bracketed.class) {
          param010 = something.kind;
          param18 = something.tree;
          k2 = param010;
          items = param18;
          tmp16 = "Bracketed#" + k2;
          tmp17 = go(items);
          return Predef.tuple(tmp16, [
            [
              "items",
              tmp17
            ]
          ])
        } else if (something instanceof Tree.Underscore.class) {
          return Predef.tuple("Underscore", [])
        } else if (something instanceof Tree.Modified.class) {
          param09 = something.modifier;
          param17 = something.subject;
          m = param09;
          s = param17;
          tmp18 = go(m);
          tmp19 = go(s);
          return Predef.tuple("Modified", [
            [
              "modifier",
              tmp18
            ],
            [
              "subject",
              tmp19
            ]
          ])
        } else if (something instanceof Tree.Tuple.class) {
          param08 = something.trees;
          t1 = param08;
          tmp20 = go(t1);
          return Predef.tuple("Tuple", [
            [
              "items",
              tmp20
            ]
          ])
        } else if (something instanceof Tree.Sequence.class) {
          param07 = something.trees;
          t = param07;
          tmp21 = go(t);
          return Predef.tuple("Sequence", [
            [
              "items",
              tmp21
            ]
          ])
        } else if (something instanceof Tree.Literal.class) {
          param06 = something.kind;
          param16 = something.value;
          k1 = param06;
          v = param16;
          tmp22 = go(k1);
          tmp23 = "Literal#" + tmp22;
          tmp24 = tmp23 + " of ";
          tmp25 = go(v);
          tmp26 = tmp24 + tmp25;
          return Predef.tuple(tmp26, [])
        } else if (something instanceof Tree.Match.class) {
          param05 = something.scrutinee;
          param15 = something.branches;
          scrutinee = param05;
          branches = param15;
          tmp27 = go(branches);
          return Predef.tuple("Match", [
            [
              "scrutinee",
              scrutinee
            ],
            [
              "branches",
              tmp27
            ]
          ])
        } else if (something instanceof Tree.App.class) {
          param04 = something.callee;
          param14 = something.arguments;
          c = param04;
          a = param14;
          tmp28 = go(c);
          tmp29 = go(a);
          return Predef.tuple("App", [
            [
              "callee",
              tmp28
            ],
            [
              "arguments",
              tmp29
            ]
          ])
        } else {
          if (something instanceof Tree.Infix.class) {
            param03 = something.op;
            param13 = something.lhs;
            param21 = something.rhs;
            op = param03;
            lhs = param13;
            rhs = param21;
            tmp30 = go(op);
            tmp31 = go(lhs);
            tmp32 = go(rhs);
            return Predef.tuple("Infix", [
              [
                "op",
                tmp30
              ],
              [
                "lhs",
                tmp31
              ],
              [
                "rhs",
                tmp32
              ]
            ])
          } else if (something instanceof Tree.Define.class) {
            param02 = something.kind;
            param12 = something.items;
            k = param02;
            i = param12;
            tmp33 = runtime.safeCall(k.toString());
            tmp34 = go(i);
            return Predef.tuple("Define", [
              [
                "kind",
                tmp33
              ],
              [
                "items",
                tmp34
              ]
            ])
          } else if (something instanceof Tree.Ternary.class) {
            param01 = something.keyword;
            param11 = something.lhs;
            param2 = something.rhs;
            param3 = something.body;
            n = param01;
            l = param11;
            r = param2;
            b1 = param3;
            tmp35 = go(n);
            tmp36 = go(l);
            tmp37 = go(r);
            tmp38 = go(b1);
            return Predef.tuple("Ternary", [
              [
                "name",
                tmp35
              ],
              [
                "lhs",
                tmp36
              ],
              [
                "rhs",
                tmp37
              ],
              [
                "body",
                tmp38
              ]
            ])
          } else if (something instanceof Tree.Lambda.class) {
            param0 = something.params;
            param1 = something.body;
            p = param0;
            b = param1;
            tmp39 = go(p);
            tmp40 = go(b);
            return Predef.tuple("Lambda", [
              [
                "params",
                tmp39
              ],
              [
                "body",
                tmp40
              ]
            ])
          } else if (something instanceof Keyword.Keyword.class) {
            keyword = something;
            tmp41 = runtime.safeCall(keyword.toString());
            return [
              tmp41,
              []
            ]
          } else if (something instanceof Token.LiteralKind.Integer.class) {
            return Predef.tuple("Integer", [])
          } else if (something instanceof Token.LiteralKind.Decimal.class) {
            return Predef.tuple("Decimal", [])
          } else if (something instanceof Token.LiteralKind.String.class) {
            return Predef.tuple("String", [])
          } else if (something instanceof Token.LiteralKind.Boolean.class) {
            return Predef.tuple("Boolean", [])
          } else if (globalThis.Array.isArray(something) && something.length === 2) {
            first0 = something[0];
            first1 = something[1];
            x = first0;
            y = first1;
            tmp42 = go(x);
            tmp43 = go(y);
            return Predef.tuple("Pair", [
              [
                "first",
                tmp42
              ],
              [
                "second",
                tmp43
              ]
            ])
          } else {
            tmp44 = runtime.safeCall(globalThis.JSON.stringify(something));
            return Predef.tuple("Unknown", [
              [
                "JSON.stringify(_)",
                tmp44
              ]
            ])
          }
        }
      }
    };
    go = function go(something) {
      let scrut, first1, first0, intro, fields, dialogue, intro1, first01, field, scrut1, intro2, tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9;
      scrut = itemize(something);
      if (globalThis.Array.isArray(scrut) && scrut.length === 2) {
        first0 = scrut[0];
        first1 = scrut[1];
        intro2 = first0;
        intro1 = first0;
        if (globalThis.Array.isArray(first1) && first1.length === 0) {
          return intro2
        } else if (globalThis.Array.isArray(first1) && first1.length === 1) {
          first01 = first1[0];
          field = first01;
          scrut1 = intro1 != "Unknown";
          if (scrut1 === true) {
            tmp = intro1 + " of ";
            tmp1 = TreeHelpers.second(field);
            return tmp + tmp1
          } else {
            intro = first0;
            fields = first1;
            tmp2 = runtime.safeCall(fields.map((field1, _, _1) => {
              let tmp10, tmp11, tmp12;
              tmp10 = TreeHelpers.first(field1);
              tmp11 = tmp10 + " = ";
              tmp12 = TreeHelpers.second(field1);
              return tmp11 + tmp12
            }));
            dialogue = tmp2;
            tmp3 = intro + ":\n  ";
            tmp4 = runtime.safeCall(dialogue.join("\n"));
            tmp5 = TreeHelpers.indented(tmp4);
            return tmp3 + tmp5
          }
        } else {
          intro = first0;
          fields = first1;
          tmp6 = runtime.safeCall(fields.map((field1, _, _1) => {
            let tmp10, tmp11, tmp12;
            tmp10 = TreeHelpers.first(field1);
            tmp11 = tmp10 + " = ";
            tmp12 = TreeHelpers.second(field1);
            return tmp11 + tmp12
          }));
          dialogue = tmp6;
          tmp7 = intro + ":\n  ";
          tmp8 = runtime.safeCall(dialogue.join("\n"));
          tmp9 = TreeHelpers.indented(tmp8);
          return tmp7 + tmp9
        }
      } else {
        throw new globalThis.Error("match error");
      }
    };
    return go(thing)
  }
  static toString() { return "TreeHelpers"; }
};
let TreeHelpers = TreeHelpers1; export default TreeHelpers;
