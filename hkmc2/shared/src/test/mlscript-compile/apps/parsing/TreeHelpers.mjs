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
      let first1, first0, x, y, keyword, param0, param1, p, b, param01, param11, param2, param3, n, l, r, b1, param02, param12, bds, b2, param03, param13, k, i, param04, param14, param21, op, lhs, rhs, param05, param15, c, a, param06, param16, scrutinee, branches, param07, param17, k1, v, param08, t, param09, t1, param010, param18, m, s, param011, param19, k2, items, param012, param110, n1, param013, param111, t2, m1, m2, param014, param112, head, tail, items1, remaining, param015, param113, head$_, tail$_, param016, content, tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20, tmp21, tmp22, tmp23, tmp24, tmp25, tmp26, tmp27, tmp28, tmp29, tmp30, tmp31, tmp32, tmp33, tmp34, tmp35, tmp36, tmp37, tmp38, tmp39, tmp40, tmp41, tmp42, tmp43, tmp44, tmp45, tmp46;
      if (something instanceof Option.Some.class) {
        param016 = something.value;
        content = param016;
        tmp = go(content);
        tmp1 = "Some of " + tmp;
        return Predef.tuple([
          tmp1
        ], [])
      } else if (something instanceof Option.None.class) {
        return Predef.tuple("None", [])
      } else if (something instanceof Stack.Cons.class) {
        param014 = something.head;
        param112 = something.tail;
        head = param014;
        tail = param112;
        tmp2 = go(head);
        items1 = [
          tmp2
        ];
        remaining = tail;
        tmp47: while (true) {
          if (remaining instanceof Stack.Cons.class) {
            param015 = remaining.head;
            param113 = remaining.tail;
            head$_ = param015;
            tail$_ = param113;
            tmp3 = go(head$_);
            tmp4 = runtime.safeCall(items1.push(tmp3));
            remaining = tail$_;
            tmp5 = runtime.Unit;
            continue tmp47;
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
      } else if (something instanceof Tree.Error.class) {
        param013 = something.tree;
        param111 = something.message;
        if (param013 instanceof Tree.Empty.class) {
          m2 = param111;
          tmp12 = go(m2);
          return Predef.tuple("Error", [
            [
              "message",
              tmp12
            ]
          ])
        } else {
          t2 = param013;
          m1 = param111;
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
      } else {
        if (something instanceof Tree.Ident.class) {
          param012 = something.name;
          param110 = something.symbolic;
          n1 = param012;
          tmp15 = go(n1);
          return Predef.tuple("Ident", [
            [
              "name",
              tmp15
            ]
          ])
        } else if (something instanceof Tree.Bracketed.class) {
          param011 = something.kind;
          param19 = something.tree;
          k2 = param011;
          items = param19;
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
          param010 = something.modifier;
          param18 = something.subject;
          m = param010;
          s = param18;
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
          param09 = something.trees;
          t1 = param09;
          tmp20 = go(t1);
          return Predef.tuple("Tuple", [
            [
              "items",
              tmp20
            ]
          ])
        } else if (something instanceof Tree.Sequence.class) {
          param08 = something.trees;
          t = param08;
          tmp21 = go(t);
          return Predef.tuple("Sequence", [
            [
              "items",
              tmp21
            ]
          ])
        } else if (something instanceof Tree.Literal.class) {
          param07 = something.kind;
          param17 = something.value;
          k1 = param07;
          v = param17;
          tmp22 = go(k1);
          tmp23 = "Literal#" + tmp22;
          tmp24 = tmp23 + " of ";
          tmp25 = go(v);
          tmp26 = tmp24 + tmp25;
          return Predef.tuple(tmp26, [])
        } else if (something instanceof Tree.Match.class) {
          param06 = something.scrutinee;
          param16 = something.branches;
          scrutinee = param06;
          branches = param16;
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
          param05 = something.callee;
          param15 = something.arguments;
          c = param05;
          a = param15;
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
        } else if (something instanceof Tree.Infix.class) {
          param04 = something.op;
          param14 = something.lhs;
          param21 = something.rhs;
          op = param04;
          lhs = param14;
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
        } else {
          if (something instanceof Tree.Define.class) {
            param03 = something.kind;
            param13 = something.items;
            k = param03;
            i = param13;
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
          } else if (something instanceof Tree.LetIn.class) {
            param02 = something.bindings;
            param12 = something.body;
            bds = param02;
            b2 = param12;
            tmp35 = go(bds);
            tmp36 = go(b2);
            return Predef.tuple("LetIn", [
              [
                "bindings",
                tmp35
              ],
              [
                "body",
                tmp36
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
            tmp37 = go(n);
            tmp38 = go(l);
            tmp39 = go(r);
            tmp40 = go(b1);
            return Predef.tuple("Ternary", [
              [
                "name",
                tmp37
              ],
              [
                "lhs",
                tmp38
              ],
              [
                "rhs",
                tmp39
              ],
              [
                "body",
                tmp40
              ]
            ])
          } else if (something instanceof Tree.Lambda.class) {
            param0 = something.params;
            param1 = something.body;
            p = param0;
            b = param1;
            tmp41 = go(p);
            tmp42 = go(b);
            return Predef.tuple("Lambda", [
              [
                "params",
                tmp41
              ],
              [
                "body",
                tmp42
              ]
            ])
          } else if (something instanceof Keyword.Keyword.class) {
            keyword = something;
            tmp43 = runtime.safeCall(keyword.toString());
            return [
              tmp43,
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
            tmp44 = go(x);
            tmp45 = go(y);
            return Predef.tuple("Pair", [
              [
                "first",
                tmp44
              ],
              [
                "second",
                tmp45
              ]
            ])
          } else {
            tmp46 = runtime.safeCall(globalThis.JSON.stringify(something));
            return Predef.tuple("Unknown", [
              [
                "JSON.stringify(_)",
                tmp46
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
