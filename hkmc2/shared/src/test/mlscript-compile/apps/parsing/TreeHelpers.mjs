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
      let first1, first0, x, y, keyword, param0, param1, p, b, param01, param11, param2, param3, n, l, r, b1, param02, param12, param21, param31, h, s, e, b2, param03, param13, c, b3, param04, param14, bds, b4, param05, param15, k, i, param06, param16, param22, op, lhs, rhs, param07, param17, c1, a, param08, param18, scrutinee, branches, param09, param19, k1, v, param010, t, param011, t1, param012, param110, m, s1, param013, param111, k2, items, param014, param112, n1, param015, param113, t2, m1, m2, param016, param114, head, tail, items1, remaining, param017, param115, head$_, tail$_, param018, content, tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20, tmp21, tmp22, tmp23, tmp24, tmp25, tmp26, tmp27, tmp28, tmp29, tmp30, tmp31, tmp32, tmp33, tmp34, tmp35, tmp36, tmp37, tmp38, tmp39, tmp40, tmp41, tmp42, tmp43, tmp44, tmp45, tmp46, tmp47, tmp48, tmp49, tmp50, tmp51, tmp52;
      if (something instanceof Option.Some.class) {
        param018 = something.value;
        content = param018;
        tmp = go(content);
        tmp1 = "Some of " + tmp;
        return Predef.tuple([
          tmp1
        ], [])
      } else if (something instanceof Option.None.class) {
        return Predef.tuple("None", [])
      } else if (something instanceof Stack.Cons.class) {
        param016 = something.head;
        param114 = something.tail;
        head = param016;
        tail = param114;
        tmp2 = go(head);
        items1 = [
          tmp2
        ];
        remaining = tail;
        tmp53: while (true) {
          if (remaining instanceof Stack.Cons.class) {
            param017 = remaining.head;
            param115 = remaining.tail;
            head$_ = param017;
            tail$_ = param115;
            tmp3 = go(head$_);
            tmp4 = runtime.safeCall(items1.push(tmp3));
            remaining = tail$_;
            tmp5 = runtime.Unit;
            continue tmp53;
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
        param015 = something.tree;
        param113 = something.message;
        if (param015 instanceof Tree.Empty.class) {
          m2 = param113;
          tmp12 = go(m2);
          return Predef.tuple("Error", [
            [
              "message",
              tmp12
            ]
          ])
        } else {
          t2 = param015;
          m1 = param113;
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
        param014 = something.name;
        param112 = something.symbolic;
        n1 = param014;
        tmp15 = go(n1);
        return Predef.tuple("Ident", [
          [
            "name",
            tmp15
          ]
        ])
      } else if (something instanceof Tree.Bracketed.class) {
        param013 = something.kind;
        param111 = something.tree;
        k2 = param013;
        items = param111;
        tmp16 = "Bracketed#" + k2;
        tmp17 = go(items);
        return Predef.tuple(tmp16, [
          [
            "items",
            tmp17
          ]
        ])
      } else {
        if (something instanceof Tree.Underscore.class) {
          return Predef.tuple("Underscore", [])
        } else if (something instanceof Tree.Modified.class) {
          param012 = something.modifier;
          param110 = something.subject;
          m = param012;
          s1 = param110;
          tmp18 = go(m);
          tmp19 = go(s1);
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
          param011 = something.trees;
          t1 = param011;
          tmp20 = go(t1);
          return Predef.tuple("Tuple", [
            [
              "items",
              tmp20
            ]
          ])
        } else if (something instanceof Tree.Sequence.class) {
          param010 = something.trees;
          t = param010;
          tmp21 = go(t);
          return Predef.tuple("Sequence", [
            [
              "items",
              tmp21
            ]
          ])
        } else if (something instanceof Tree.Literal.class) {
          param09 = something.kind;
          param19 = something.value;
          k1 = param09;
          v = param19;
          tmp22 = go(k1);
          tmp23 = "Literal#" + tmp22;
          tmp24 = tmp23 + " of ";
          tmp25 = go(v);
          tmp26 = tmp24 + tmp25;
          return Predef.tuple(tmp26, [])
        } else if (something instanceof Tree.Match.class) {
          param08 = something.scrutinee;
          param18 = something.branches;
          scrutinee = param08;
          branches = param18;
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
          param07 = something.callee;
          param17 = something.argument;
          c1 = param07;
          a = param17;
          tmp28 = go(c1);
          tmp29 = go(a);
          return Predef.tuple("App", [
            [
              "callee",
              tmp28
            ],
            [
              "argument",
              tmp29
            ]
          ])
        } else if (something instanceof Tree.Infix.class) {
          param06 = something.op;
          param16 = something.lhs;
          param22 = something.rhs;
          op = param06;
          lhs = param16;
          rhs = param22;
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
          param05 = something.kind;
          param15 = something.items;
          k = param05;
          i = param15;
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
          param04 = something.bindings;
          param14 = something.body;
          bds = param04;
          b4 = param14;
          tmp35 = go(bds);
          tmp36 = go(b4);
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
        } else {
          if (something instanceof Tree.While.class) {
            param03 = something.cond;
            param13 = something.body;
            c = param03;
            b3 = param13;
            tmp37 = go(c);
            tmp38 = go(b3);
            return Predef.tuple("While", [
              [
                "condition",
                tmp37
              ],
              [
                "body",
                tmp38
              ]
            ])
          } else if (something instanceof Tree.For.class) {
            param02 = something.head;
            param12 = something.start;
            param21 = something.end;
            param31 = something.body;
            h = param02;
            s = param12;
            e = param21;
            b2 = param31;
            tmp39 = go(h);
            tmp40 = go(s);
            tmp41 = go(e);
            tmp42 = go(b2);
            return Predef.tuple("For", [
              [
                "head",
                tmp39
              ],
              [
                "start",
                tmp40
              ],
              [
                "end",
                tmp41
              ],
              [
                "body",
                tmp42
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
            tmp43 = go(n);
            tmp44 = go(l);
            tmp45 = go(r);
            tmp46 = go(b1);
            return Predef.tuple("Ternary", [
              [
                "name",
                tmp43
              ],
              [
                "lhs",
                tmp44
              ],
              [
                "rhs",
                tmp45
              ],
              [
                "body",
                tmp46
              ]
            ])
          } else if (something instanceof Tree.Lambda.class) {
            param0 = something.params;
            param1 = something.body;
            p = param0;
            b = param1;
            tmp47 = go(p);
            tmp48 = go(b);
            return Predef.tuple("Lambda", [
              [
                "params",
                tmp47
              ],
              [
                "body",
                tmp48
              ]
            ])
          } else if (something instanceof Keyword.Keyword.class) {
            keyword = something;
            tmp49 = runtime.safeCall(keyword.toString());
            return [
              tmp49,
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
            tmp50 = go(x);
            tmp51 = go(y);
            return Predef.tuple("Pair", [
              [
                "first",
                tmp50
              ],
              [
                "second",
                tmp51
              ]
            ])
          } else {
            tmp52 = runtime.safeCall(globalThis.JSON.stringify(something));
            return Predef.tuple("Unknown", [
              [
                "JSON.stringify(_)",
                tmp52
              ]
            ])
          }
        }
      }
    };
    go = function go(something) {
      let scrut, first1, first0, intro, fields, dialogue, intro1, first01, field, scrut1, intro2, tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, lambda, lambda1;
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
            lambda = (undefined, function (field1, _, _1) {
              let tmp12, tmp13, tmp14;
              tmp12 = TreeHelpers.first(field1);
              tmp13 = tmp12 + " = ";
              tmp14 = TreeHelpers.second(field1);
              return tmp13 + tmp14
            });
            tmp2 = lambda;
            tmp3 = runtime.safeCall(fields.map(tmp2));
            dialogue = tmp3;
            tmp4 = intro + ":\n  ";
            tmp5 = runtime.safeCall(dialogue.join("\n"));
            tmp6 = TreeHelpers.indented(tmp5);
            return tmp4 + tmp6
          }
        } else {
          intro = first0;
          fields = first1;
          lambda1 = (undefined, function (field1, _, _1) {
            let tmp12, tmp13, tmp14;
            tmp12 = TreeHelpers.first(field1);
            tmp13 = tmp12 + " = ";
            tmp14 = TreeHelpers.second(field1);
            return tmp13 + tmp14
          });
          tmp7 = lambda1;
          tmp8 = runtime.safeCall(fields.map(tmp7));
          dialogue = tmp8;
          tmp9 = intro + ":\n  ";
          tmp10 = runtime.safeCall(dialogue.join("\n"));
          tmp11 = TreeHelpers.indented(tmp10);
          return tmp9 + tmp11
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
