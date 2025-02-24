import runtime from "./../../Runtime.mjs";
import Iter from "./../../Iter.mjs";
import Predef from "./../../Predef.mjs";
import Stack from "./../../Stack.mjs";
import Option from "./../../Option.mjs";
import Keyword from "./Keyword.mjs";
import Precedence from "./Precedence.mjs";
import Token from "./Token.mjs";
let Tree2;
Tree2 = class Tree {
  static {
    this.Tree = class Tree1 {
      constructor() {}
      toString() { return "Tree"; }
    };
    this.DefineKind = class DefineKind {
      static {
        this.Let = function Let(recursive1) { return new Let.class(recursive1); };
        this.Let.class = class Let {
          constructor(recursive) {
            this.recursive = recursive;
          }
          toString() { return "Let(" + globalThis.Predef.render(this.recursive) + ")"; }
        };
        const Type$class = class Type {
          constructor() {}
          toString() { return "Type"; }
        };
        this.Type = new Type$class;
        this.Type.class = Type$class;
        const Exception$class = class Exception {
          constructor() {}
          toString() { return "Exception"; }
        };
        this.Exception = new Exception$class;
        this.Exception.class = Exception$class;
      }
      static toString() { return "DefineKind"; }
    };
    this.Empty = function Empty() { return new Empty.class(); };
    this.Empty.class = class Empty extends Tree.Tree {
      constructor() {
        super();
      }
      toString() { return "Empty(" + "" + ")"; }
    };
    this.Error = function Error(tree1, message1) { return new Error.class(tree1, message1); };
    this.Error.class = class Error extends Tree.Tree {
      constructor(tree, message) {
        super();
        this.tree = tree;
        this.message = message;
      }
      toString() { return "Error(" + globalThis.Predef.render(this.tree) + ", " + globalThis.Predef.render(this.message) + ")"; }
    };
    this.Bracketed = function Bracketed(kind1, tree1) { return new Bracketed.class(kind1, tree1); };
    this.Bracketed.class = class Bracketed extends Tree.Tree {
      constructor(kind, tree) {
        super();
        this.kind = kind;
        this.tree = tree;
      }
      toString() { return "Bracketed(" + globalThis.Predef.render(this.kind) + ", " + globalThis.Predef.render(this.tree) + ")"; }
    };
    this.Ident = function Ident(name1, symbolic1) { return new Ident.class(name1, symbolic1); };
    this.Ident.class = class Ident extends Tree.Tree {
      constructor(name, symbolic) {
        super();
        this.name = name;
        this.symbolic = symbolic;
      }
      toString() { return "Ident(" + globalThis.Predef.render(this.name) + ", " + globalThis.Predef.render(this.symbolic) + ")"; }
    };
    this.Underscore = function Underscore() { return new Underscore.class(); };
    this.Underscore.class = class Underscore extends Tree.Tree {
      constructor() {
        super();
      }
      toString() { return "Underscore(" + "" + ")"; }
    };
    this.Modified = function Modified(modifier1, subject1) { return new Modified.class(modifier1, subject1); };
    this.Modified.class = class Modified extends Tree.Tree {
      constructor(modifier, subject) {
        super();
        this.modifier = modifier;
        this.subject = subject;
      }
      toString() { return "Modified(" + globalThis.Predef.render(this.modifier) + ", " + globalThis.Predef.render(this.subject) + ")"; }
    };
    this.Tuple = function Tuple(trees1) { return new Tuple.class(trees1); };
    this.Tuple.class = class Tuple extends Tree.Tree {
      constructor(trees) {
        super();
        this.trees = trees;
      }
      toString() { return "Tuple(" + globalThis.Predef.render(this.trees) + ")"; }
    };
    this.Sequence = function Sequence(trees1) { return new Sequence.class(trees1); };
    this.Sequence.class = class Sequence extends Tree.Tree {
      constructor(trees) {
        super();
        this.trees = trees;
      }
      toString() { return "Sequence(" + globalThis.Predef.render(this.trees) + ")"; }
    };
    this.Literal = function Literal(kind1, value1) { return new Literal.class(kind1, value1); };
    this.Literal.class = class Literal extends Tree.Tree {
      constructor(kind, value) {
        super();
        this.kind = kind;
        this.value = value;
      }
      toString() { return "Literal(" + globalThis.Predef.render(this.kind) + ", " + globalThis.Predef.render(this.value) + ")"; }
    };
    this.Match = function Match(scrutinee1, branches1) { return new Match.class(scrutinee1, branches1); };
    this.Match.class = class Match extends Tree.Tree {
      constructor(scrutinee, branches) {
        super();
        this.scrutinee = scrutinee;
        this.branches = branches;
      }
      toString() { return "Match(" + globalThis.Predef.render(this.scrutinee) + ", " + globalThis.Predef.render(this.branches) + ")"; }
    };
    this.Lambda = function Lambda(params1, body1) { return new Lambda.class(params1, body1); };
    this.Lambda.class = class Lambda extends Tree.Tree {
      constructor(params, body) {
        super();
        this.params = params;
        this.body = body;
      }
      toString() { return "Lambda(" + globalThis.Predef.render(this.params) + ", " + globalThis.Predef.render(this.body) + ")"; }
    };
    this.App = function App(callee1, arguments2) { return new App.class(callee1, arguments2); };
    this.App.class = class App extends Tree.Tree {
      constructor(callee, arguments1) {
        super();
        this.callee = callee;
        this.arguments = arguments1;
      }
      toString() { return "App(" + globalThis.Predef.render(this.callee) + ", " + globalThis.Predef.render(this.arguments) + ")"; }
    };
    this.Infix = function Infix(op1, lhs1, rhs1) { return new Infix.class(op1, lhs1, rhs1); };
    this.Infix.class = class Infix extends Tree.Tree {
      constructor(op, lhs, rhs) {
        super();
        this.op = op;
        this.lhs = lhs;
        this.rhs = rhs;
      }
      toString() { return "Infix(" + globalThis.Predef.render(this.op) + ", " + globalThis.Predef.render(this.lhs) + ", " + globalThis.Predef.render(this.rhs) + ")"; }
    };
    this.Define = function Define(kind1, items1) { return new Define.class(kind1, items1); };
    this.Define.class = class Define extends Tree.Tree {
      constructor(kind, items) {
        super();
        this.kind = kind;
        this.items = items;
      }
      toString() { return "Define(" + globalThis.Predef.render(this.kind) + ", " + globalThis.Predef.render(this.items) + ")"; }
    };
    this.LetIn = function LetIn(bindings1, body1) { return new LetIn.class(bindings1, body1); };
    this.LetIn.class = class LetIn extends Tree.Tree {
      constructor(bindings, body) {
        super();
        this.bindings = bindings;
        this.body = body;
      }
      toString() { return "LetIn(" + globalThis.Predef.render(this.bindings) + ", " + globalThis.Predef.render(this.body) + ")"; }
    };
    this.While = function While(cond1, body1) { return new While.class(cond1, body1); };
    this.While.class = class While extends Tree.Tree {
      constructor(cond, body) {
        super();
        this.cond = cond;
        this.body = body;
      }
      toString() { return "While(" + globalThis.Predef.render(this.cond) + ", " + globalThis.Predef.render(this.body) + ")"; }
    };
    this.For = function For(head1, start1, end1, body1) { return new For.class(head1, start1, end1, body1); };
    this.For.class = class For extends Tree.Tree {
      constructor(head, start, end, body) {
        super();
        this.head = head;
        this.start = start;
        this.end = end;
        this.body = body;
      }
      toString() { return "For(" + globalThis.Predef.render(this.head) + ", " + globalThis.Predef.render(this.start) + ", " + globalThis.Predef.render(this.end) + ", " + globalThis.Predef.render(this.body) + ")"; }
    };
    this.Ternary = function Ternary(keyword1, lhs1, rhs1, body1) { return new Ternary.class(keyword1, lhs1, rhs1, body1); };
    this.Ternary.class = class Ternary extends Tree.Tree {
      constructor(keyword, lhs, rhs, body) {
        super();
        this.keyword = keyword;
        this.lhs = lhs;
        this.rhs = rhs;
        this.body = body;
      }
      toString() { return "Ternary(" + globalThis.Predef.render(this.keyword) + ", " + globalThis.Predef.render(this.lhs) + ", " + globalThis.Predef.render(this.rhs) + ", " + globalThis.Predef.render(this.body) + ")"; }
    };
  }
  static get empty() {
    return Tree.Empty();
  } 
  static error(message) {
    return Tree.Error(Tree.empty, message)
  } 
  static summary(tree) {
    let par, prec, go, wrap;
    par = function par(text, cond) {
      let tmp;
      if (cond === true) {
        tmp = "(" + text;
        return tmp + ")"
      } else {
        return text
      }
    };
    prec = function prec(tree1, side) {
      let param0, param1, param2, op, param01, param11, callee, param02, param12, op1, scrut, first1, first0, leftPrec, rightPrec, param03, param13, param04, param14, tree2;
      if (tree1 instanceof Tree.Empty.class) {
        return Keyword.INT_MAX
      } else if (tree1 instanceof Tree.Error.class) {
        param04 = tree1.tree;
        param14 = tree1.message;
        tree2 = param04;
        return prec(tree2, side)
      } else if (tree1 instanceof Tree.Bracketed.class) {
        param03 = tree1.kind;
        param13 = tree1.tree;
        return Keyword.INT_MAX
      } else {
        if (tree1 instanceof Tree.Ident.class) {
          return Keyword.INT_MAX
        } else if (tree1 instanceof Tree.Underscore.class) {
          return Keyword.INT_MAX
        } else if (tree1 instanceof Tree.Modified.class) {
          return 1
        } else if (tree1 instanceof Tree.Tuple.class) {
          return Keyword.INT_MAX
        } else if (tree1 instanceof Tree.Sequence.class) {
          return 1
        } else if (tree1 instanceof Tree.Literal.class) {
          return Keyword.INT_MAX
        } else if (tree1 instanceof Tree.Match.class) {
          return 2
        } else if (tree1 instanceof Tree.App.class) {
          param01 = tree1.callee;
          param11 = tree1.arguments;
          callee = param01;
          if (callee instanceof Tree.Ident.class) {
            param02 = callee.name;
            param12 = callee.symbolic;
            op1 = param02;
            if (param12 === true) {
              scrut = Precedence.opPrec(op1);
              if (globalThis.Array.isArray(scrut) && scrut.length === 2) {
                first0 = scrut[0];
                first1 = scrut[1];
                leftPrec = first0;
                rightPrec = first1;
                if (side === true) {
                  return rightPrec
                } else {
                  return leftPrec
                }
              } else {
                return Precedence.Keywords.appPrec
              }
            } else {
              return Precedence.Keywords.appPrec
            }
          } else {
            return Precedence.Keywords.appPrec
          }
        } else if (tree1 instanceof Tree.Infix.class) {
          param0 = tree1.op;
          param1 = tree1.lhs;
          param2 = tree1.rhs;
          op = param0;
          if (side === true) {
            return op.rightPrecOrMax
          } else {
            return op.leftPrecOrMax
          }
        } else if (tree1 instanceof Tree.Ternary.class) {
          return 3
        } else {
          throw new globalThis.Error("match error");
        }
      }
    };
    wrap = function wrap(something) {
      let tmp, tmp1;
      if (something instanceof Tree.Tree) {
        tmp = go(something);
        tmp1 = "«" + tmp;
        return tmp1 + "»"
      } else {
        return go(something)
      }
    };
    go = function go(tree1) {
      let rest, trees, param0, param1, param01, tree2, param02, param11, param2, name, param03, param12, params, body, param04, param13, param21, param3, keyword, lhs, rhs, body1, scrut, param05, rhs$_, scrut1, param06, body2, param07, param14, param22, param31, head, start, end, body3, param08, param15, cond, body4, param09, param16, bindings, body5, param010, param17, kind, items, param011, param012, param18, param23, op, lhs1, rhs1, param013, param19, callee, arguments1, param014, param110, op1, param015, param111, lhs2, param016, param112, rhs2, scrut2, first1, first0, leftPrec, rightPrec, target, param017, param113, field, scrut3, first11, first01, leftPrec1, param018, param114, scrutinee, branches, param019, param115, value, value1, scrut4, param020, trees1, param021, trees2, param022, param116, modifier, subject, param023, param117, name1, param024, param118, kind1, tree3, param025, param119, tree4, tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20, tmp21, tmp22, tmp23, tmp24, tmp25, tmp26, tmp27, tmp28, tmp29, tmp30, tmp31, tmp32, tmp33, tmp34, tmp35, tmp36, tmp37, tmp38, tmp39, tmp40, tmp41, tmp42, tmp43, tmp44, tmp45, tmp46, tmp47, tmp48, tmp49, tmp50, tmp51, tmp52, tmp53, tmp54, tmp55, tmp56, tmp57, tmp58, tmp59, tmp60, tmp61, tmp62, tmp63, tmp64, tmp65, tmp66, tmp67, tmp68, tmp69, tmp70, tmp71, tmp72, tmp73, tmp74, tmp75, tmp76, tmp77, tmp78, tmp79, tmp80, tmp81, tmp82, tmp83, tmp84, tmp85, tmp86, tmp87, tmp88, tmp89, tmp90, tmp91, tmp92, tmp93, tmp94, tmp95, tmp96, tmp97, tmp98, tmp99, tmp100, tmp101, tmp102, tmp103, tmp104, tmp105, tmp106, tmp107, tmp108, tmp109, tmp110, tmp111, tmp112, tmp113, tmp114, tmp115, tmp116, tmp117, tmp118, tmp119, tmp120, tmp121, tmp122, tmp123, tmp124, tmp125, tmp126, tmp127, tmp128, tmp129, tmp130, tmp131, tmp132, tmp133, tmp134, tmp135, tmp136, tmp137, tmp138, tmp139, tmp140, tmp141, tmp142, tmp143, tmp144, tmp145, tmp146, tmp147, tmp148, tmp149, tmp150, tmp151, tmp152, tmp153, tmp154, tmp155, tmp156, tmp157;
      if (tree1 instanceof Tree.Empty.class) {
        return "{}"
      } else if (tree1 instanceof Tree.Error.class) {
        param025 = tree1.tree;
        param119 = tree1.message;
        if (param025 instanceof Tree.Empty.class) {
          return "\u26A0"
        } else {
          tree4 = param025;
          tmp = go(tree4);
          tmp1 = "<\u26A0:" + tmp;
          return tmp1 + ">"
        }
      } else if (tree1 instanceof Tree.Bracketed.class) {
        param024 = tree1.kind;
        param118 = tree1.tree;
        kind1 = param024;
        tree3 = param118;
        if (kind1 instanceof Token.Round.class) {
          tmp2 = go(tree3);
          tmp3 = "(" + tmp2;
          return tmp3 + ")"
        } else if (kind1 instanceof Token.Square.class) {
          tmp4 = go(tree3);
          tmp5 = "[" + tmp4;
          return tmp5 + "]"
        } else if (kind1 instanceof Token.Curly.class) {
          tmp6 = go(tree3);
          tmp7 = "{" + tmp6;
          return tmp7 + "}"
        } else if (kind1 instanceof Token.Angle.class) {
          tmp8 = go(tree3);
          tmp9 = "<" + tmp8;
          return tmp9 + ">"
        } else {
          tmp10 = "<unexpected:" + tree1;
          return tmp10 + ">"
        }
      } else if (tree1 instanceof Tree.Ident.class) {
        param023 = tree1.name;
        param117 = tree1.symbolic;
        name1 = param023;
        return name1
      } else {
        if (tree1 instanceof Tree.Underscore.class) {
          return "_"
        } else if (tree1 instanceof Tree.Modified.class) {
          param022 = tree1.modifier;
          param116 = tree1.subject;
          modifier = param022;
          subject = param116;
          tmp11 = go(modifier);
          tmp12 = tmp11 + " ";
          tmp13 = go(subject);
          return tmp12 + tmp13
        } else if (tree1 instanceof Tree.Tuple.class) {
          param021 = tree1.trees;
          trees2 = param021;
          tmp14 = Iter.fromStack(trees2);
          tmp15 = Iter.mapping(tmp14, go);
          tmp16 = Iter.joined(tmp15, ", ");
          tmp17 = "(" + tmp16;
          return tmp17 + ")"
        } else if (tree1 instanceof Tree.Sequence.class) {
          param020 = tree1.trees;
          trees1 = param020;
          tmp18 = Iter.fromStack(trees1);
          tmp19 = Iter.mapping(tmp18, go);
          return Iter.joined(tmp19, "; ")
        } else if (tree1 instanceof Tree.Literal.class) {
          param019 = tree1.kind;
          param115 = tree1.value;
          if (param019 instanceof Token.LiteralKind.String.class) {
            value1 = param115;
            scrut4 = value1.length > 5;
            if (scrut4 === true) {
              tmp20 = value1.slice(0, 5);
              tmp21 = runtime.safeCall(globalThis.JSON.stringify(tmp20));
              tmp22 = - 1;
              tmp23 = tmp21.slice(0, tmp22);
              return tmp23 + "\u2026\""
            } else {
              return runtime.safeCall(globalThis.JSON.stringify(value1))
            }
          } else {
            value = param115;
            return value
          }
        } else if (tree1 instanceof Tree.Match.class) {
          param018 = tree1.scrutinee;
          param114 = tree1.branches;
          scrutinee = param018;
          branches = param114;
          if (scrutinee instanceof Tree.Empty.class) {
            tmp24 = "function ";
          } else {
            tmp25 = go(scrutinee);
            tmp26 = "match " + tmp25;
            tmp24 = tmp26 + " with ";
          }
          tmp27 = Iter.fromStack(branches);
          tmp28 = Iter.mapping(tmp27, go);
          tmp29 = Iter.joined(tmp28, " | ");
          return Predef.mkStr(tmp24, tmp29)
        } else if (tree1 instanceof Tree.App.class) {
          param013 = tree1.callee;
          param19 = tree1.arguments;
          if (param013 instanceof Tree.Ident.class) {
            param014 = param013.name;
            param110 = param013.symbolic;
            if (param014 === ".") {
              if (param19 instanceof Stack.Cons.class) {
                param015 = param19.head;
                param111 = param19.tail;
                target = param015;
                if (param111 instanceof Stack.Cons.class) {
                  param016 = param111.head;
                  param112 = param111.tail;
                  if (param016 instanceof Tree.Ident.class) {
                    param017 = param016.name;
                    param113 = param016.symbolic;
                    field = param017;
                    if (param112 instanceof Stack.Nil.class) {
                      scrut3 = Precedence.opPrec(".");
                      if (globalThis.Array.isArray(scrut3) && scrut3.length === 2) {
                        first01 = scrut3[0];
                        first11 = scrut3[1];
                        leftPrec1 = first01;
                        tmp30 = Predef.fold((arg1, arg2) => {
                          return arg1 + arg2
                        });
                        tmp31 = go(target);
                        tmp32 = prec(target, false);
                        tmp33 = tmp32 < leftPrec1;
                        tmp34 = par(tmp31, tmp33);
                        return runtime.safeCall(tmp30(tmp34, ".", field))
                      } else {
                        throw new globalThis.Error("match error");
                      }
                    } else {
                      op1 = param014;
                      if (param110 === true) {
                        lhs2 = param015;
                        rhs2 = param016;
                        callee = param013;
                        arguments1 = param19;
                        tmp35 = Predef.fold((arg1, arg2) => {
                          return arg1 + arg2
                        });
                        tmp36 = go(callee);
                        tmp37 = Iter.fromStack(arguments1);
                        tmp38 = Iter.mapping(tmp37, go);
                        tmp39 = Iter.joined(tmp38, ", ");
                        return runtime.safeCall(tmp35(tmp36, "(", tmp39, ")"))
                      } else {
                        callee = param013;
                        arguments1 = param19;
                        tmp40 = Predef.fold((arg1, arg2) => {
                          return arg1 + arg2
                        });
                        tmp41 = go(callee);
                        tmp42 = Iter.fromStack(arguments1);
                        tmp43 = Iter.mapping(tmp42, go);
                        tmp44 = Iter.joined(tmp43, ", ");
                        return runtime.safeCall(tmp40(tmp41, "(", tmp44, ")"))
                      }
                    }
                  } else {
                    op1 = param014;
                    if (param110 === true) {
                      lhs2 = param015;
                      rhs2 = param016;
                      if (param112 instanceof Stack.Nil.class) {
                        scrut2 = Precedence.opPrec(op1);
                        if (globalThis.Array.isArray(scrut2) && scrut2.length === 2) {
                          first0 = scrut2[0];
                          first1 = scrut2[1];
                          leftPrec = first0;
                          rightPrec = first1;
                          tmp45 = Predef.fold((arg1, arg2) => {
                            return arg1 + arg2
                          });
                          tmp46 = go(lhs2);
                          tmp47 = prec(lhs2, false);
                          tmp48 = tmp47 < leftPrec;
                          tmp49 = par(tmp46, tmp48);
                          tmp50 = go(rhs2);
                          tmp51 = prec(rhs2, true);
                          tmp52 = tmp51 < rightPrec;
                          tmp53 = par(tmp50, tmp52);
                          return runtime.safeCall(tmp45(tmp49, " ", op1, " ", tmp53))
                        } else {
                          throw new globalThis.Error("match error");
                        }
                      } else {
                        callee = param013;
                        arguments1 = param19;
                        tmp54 = Predef.fold((arg1, arg2) => {
                          return arg1 + arg2
                        });
                        tmp55 = go(callee);
                        tmp56 = Iter.fromStack(arguments1);
                        tmp57 = Iter.mapping(tmp56, go);
                        tmp58 = Iter.joined(tmp57, ", ");
                        return runtime.safeCall(tmp54(tmp55, "(", tmp58, ")"))
                      }
                    } else {
                      callee = param013;
                      arguments1 = param19;
                      tmp59 = Predef.fold((arg1, arg2) => {
                        return arg1 + arg2
                      });
                      tmp60 = go(callee);
                      tmp61 = Iter.fromStack(arguments1);
                      tmp62 = Iter.mapping(tmp61, go);
                      tmp63 = Iter.joined(tmp62, ", ");
                      return runtime.safeCall(tmp59(tmp60, "(", tmp63, ")"))
                    }
                  }
                } else {
                  op1 = param014;
                  if (param110 === true) {
                    lhs2 = param015;
                    callee = param013;
                    arguments1 = param19;
                    tmp64 = Predef.fold((arg1, arg2) => {
                      return arg1 + arg2
                    });
                    tmp65 = go(callee);
                    tmp66 = Iter.fromStack(arguments1);
                    tmp67 = Iter.mapping(tmp66, go);
                    tmp68 = Iter.joined(tmp67, ", ");
                    return runtime.safeCall(tmp64(tmp65, "(", tmp68, ")"))
                  } else {
                    callee = param013;
                    arguments1 = param19;
                    tmp69 = Predef.fold((arg1, arg2) => {
                      return arg1 + arg2
                    });
                    tmp70 = go(callee);
                    tmp71 = Iter.fromStack(arguments1);
                    tmp72 = Iter.mapping(tmp71, go);
                    tmp73 = Iter.joined(tmp72, ", ");
                    return runtime.safeCall(tmp69(tmp70, "(", tmp73, ")"))
                  }
                }
              } else {
                op1 = param014;
                if (param110 === true) {
                  callee = param013;
                  arguments1 = param19;
                  tmp74 = Predef.fold((arg1, arg2) => {
                    return arg1 + arg2
                  });
                  tmp75 = go(callee);
                  tmp76 = Iter.fromStack(arguments1);
                  tmp77 = Iter.mapping(tmp76, go);
                  tmp78 = Iter.joined(tmp77, ", ");
                  return runtime.safeCall(tmp74(tmp75, "(", tmp78, ")"))
                } else {
                  callee = param013;
                  arguments1 = param19;
                  tmp79 = Predef.fold((arg1, arg2) => {
                    return arg1 + arg2
                  });
                  tmp80 = go(callee);
                  tmp81 = Iter.fromStack(arguments1);
                  tmp82 = Iter.mapping(tmp81, go);
                  tmp83 = Iter.joined(tmp82, ", ");
                  return runtime.safeCall(tmp79(tmp80, "(", tmp83, ")"))
                }
              }
            } else {
              op1 = param014;
              if (param110 === true) {
                if (param19 instanceof Stack.Cons.class) {
                  param015 = param19.head;
                  param111 = param19.tail;
                  lhs2 = param015;
                  if (param111 instanceof Stack.Cons.class) {
                    param016 = param111.head;
                    param112 = param111.tail;
                    rhs2 = param016;
                    if (param112 instanceof Stack.Nil.class) {
                      scrut2 = Precedence.opPrec(op1);
                      if (globalThis.Array.isArray(scrut2) && scrut2.length === 2) {
                        first0 = scrut2[0];
                        first1 = scrut2[1];
                        leftPrec = first0;
                        rightPrec = first1;
                        tmp84 = Predef.fold((arg1, arg2) => {
                          return arg1 + arg2
                        });
                        tmp85 = go(lhs2);
                        tmp86 = prec(lhs2, false);
                        tmp87 = tmp86 < leftPrec;
                        tmp88 = par(tmp85, tmp87);
                        tmp89 = go(rhs2);
                        tmp90 = prec(rhs2, true);
                        tmp91 = tmp90 < rightPrec;
                        tmp92 = par(tmp89, tmp91);
                        return runtime.safeCall(tmp84(tmp88, " ", op1, " ", tmp92))
                      } else {
                        throw new globalThis.Error("match error");
                      }
                    } else {
                      callee = param013;
                      arguments1 = param19;
                      tmp93 = Predef.fold((arg1, arg2) => {
                        return arg1 + arg2
                      });
                      tmp94 = go(callee);
                      tmp95 = Iter.fromStack(arguments1);
                      tmp96 = Iter.mapping(tmp95, go);
                      tmp97 = Iter.joined(tmp96, ", ");
                      return runtime.safeCall(tmp93(tmp94, "(", tmp97, ")"))
                    }
                  } else {
                    callee = param013;
                    arguments1 = param19;
                    tmp98 = Predef.fold((arg1, arg2) => {
                      return arg1 + arg2
                    });
                    tmp99 = go(callee);
                    tmp100 = Iter.fromStack(arguments1);
                    tmp101 = Iter.mapping(tmp100, go);
                    tmp102 = Iter.joined(tmp101, ", ");
                    return runtime.safeCall(tmp98(tmp99, "(", tmp102, ")"))
                  }
                } else {
                  callee = param013;
                  arguments1 = param19;
                  tmp103 = Predef.fold((arg1, arg2) => {
                    return arg1 + arg2
                  });
                  tmp104 = go(callee);
                  tmp105 = Iter.fromStack(arguments1);
                  tmp106 = Iter.mapping(tmp105, go);
                  tmp107 = Iter.joined(tmp106, ", ");
                  return runtime.safeCall(tmp103(tmp104, "(", tmp107, ")"))
                }
              } else {
                callee = param013;
                arguments1 = param19;
                tmp108 = Predef.fold((arg1, arg2) => {
                  return arg1 + arg2
                });
                tmp109 = go(callee);
                tmp110 = Iter.fromStack(arguments1);
                tmp111 = Iter.mapping(tmp110, go);
                tmp112 = Iter.joined(tmp111, ", ");
                return runtime.safeCall(tmp108(tmp109, "(", tmp112, ")"))
              }
            }
          } else {
            callee = param013;
            arguments1 = param19;
            tmp113 = Predef.fold((arg1, arg2) => {
              return arg1 + arg2
            });
            tmp114 = go(callee);
            tmp115 = Iter.fromStack(arguments1);
            tmp116 = Iter.mapping(tmp115, go);
            tmp117 = Iter.joined(tmp116, ", ");
            return runtime.safeCall(tmp113(tmp114, "(", tmp117, ")"))
          }
        } else if (tree1 instanceof Tree.Infix.class) {
          param012 = tree1.op;
          param18 = tree1.lhs;
          param23 = tree1.rhs;
          op = param012;
          lhs1 = param18;
          rhs1 = param23;
          tmp118 = Predef.fold((arg1, arg2) => {
            return arg1 + arg2
          });
          tmp119 = go(lhs1);
          tmp120 = go(op);
          tmp121 = go(rhs1);
          return runtime.safeCall(tmp118(tmp119, " ", tmp120, " ", tmp121))
        } else if (tree1 instanceof Tree.Define.class) {
          param010 = tree1.kind;
          param17 = tree1.items;
          kind = param010;
          items = param17;
          if (kind instanceof Tree.DefineKind.Let.class) {
            param011 = kind.recursive;
            if (param011 === true) {
              tmp122 = "let rec ";
            } else if (param011 === false) {
              tmp122 = "let ";
            } else {
              throw new globalThis.Error("match error");
            }
          } else if (kind instanceof Tree.DefineKind.Type.class) {
            tmp122 = "type ";
          } else if (kind instanceof Tree.DefineKind.Exception.class) {
            tmp122 = "exception ";
          } else {
            throw new globalThis.Error("match error");
          }
          tmp123 = Iter.fromStack(items);
          tmp124 = (caseScrut) => {
            let first12, first02, lhs3, rhs3, tmp158, tmp159, tmp160;
            if (globalThis.Array.isArray(caseScrut) && caseScrut.length === 2) {
              first02 = caseScrut[0];
              first12 = caseScrut[1];
              lhs3 = first02;
              rhs3 = first12;
              tmp158 = go(lhs3);
              tmp159 = tmp158 + " = ";
              tmp160 = go(rhs3);
              return tmp159 + tmp160
            } else {
              throw new globalThis.Error("match error");
            }
          };
          tmp125 = Iter.mapping(tmp123, tmp124);
          tmp126 = Iter.joined(tmp125, " and ");
          return Predef.mkStr(tmp122, tmp126)
        } else if (tree1 instanceof Tree.LetIn.class) {
          param09 = tree1.bindings;
          param16 = tree1.body;
          bindings = param09;
          body5 = param16;
          tmp127 = Iter.fromStack(bindings);
          tmp128 = (caseScrut) => {
            let first12, first02, lhs3, rhs3, tmp158, tmp159, tmp160;
            if (globalThis.Array.isArray(caseScrut) && caseScrut.length === 2) {
              first02 = caseScrut[0];
              first12 = caseScrut[1];
              lhs3 = first02;
              rhs3 = first12;
              tmp158 = go(lhs3);
              tmp159 = tmp158 + " = ";
              tmp160 = go(rhs3);
              return tmp159 + tmp160
            } else {
              throw new globalThis.Error("match error");
            }
          };
          tmp129 = Iter.mapping(tmp127, tmp128);
          tmp130 = Iter.joined(tmp129, " and ");
          tmp131 = go(body5);
          return Predef.mkStr("let ", tmp130, " in ", tmp131)
        } else {
          if (tree1 instanceof Tree.While.class) {
            param08 = tree1.cond;
            param15 = tree1.body;
            cond = param08;
            body4 = param15;
            tmp132 = go(cond);
            tmp133 = go(body4);
            return Predef.mkStr("while ", tmp132, " do ", tmp133, " done")
          } else if (tree1 instanceof Tree.For.class) {
            param07 = tree1.head;
            param14 = tree1.start;
            param22 = tree1.end;
            param31 = tree1.body;
            head = param07;
            start = param14;
            end = param22;
            body3 = param31;
            tmp134 = go(head);
            tmp135 = go(start);
            tmp136 = go(end);
            tmp137 = go(body3);
            return Predef.mkStr("for ", tmp134, " = ", tmp135, " to ", tmp136, " do ", tmp137, " done")
          } else if (tree1 instanceof Tree.Ternary.class) {
            param04 = tree1.keyword;
            param13 = tree1.lhs;
            param21 = tree1.rhs;
            param3 = tree1.body;
            keyword = param04;
            lhs = param13;
            rhs = param21;
            body1 = param3;
            tmp138 = Predef.fold((arg1, arg2) => {
              return arg1 + arg2
            });
            tmp139 = go(lhs);
            scrut = keyword.name;
            if (scrut === "if") {
              tmp140 = " then ";
            } else if (scrut === "type") {
              tmp140 = " = ";
            } else if (scrut === "let") {
              tmp140 = " = ";
            } else {
              throw new globalThis.Error("match error");
            }
            if (rhs instanceof Option.Some.class) {
              param05 = rhs.value;
              rhs$_ = param05;
              tmp141 = go(rhs$_);
            } else {
              tmp141 = go(rhs);
            }
            scrut1 = keyword.name;
            if (scrut1 === "if") {
              tmp142 = " then ";
            } else if (scrut1 === "type") {
              tmp142 = "";
            } else if (scrut1 === "let") {
              tmp142 = " in ";
            } else {
              throw new globalThis.Error("match error");
            }
            if (body1 instanceof Option.Some.class) {
              param06 = body1.value;
              body2 = param06;
              tmp143 = go(body2);
            } else {
              tmp143 = go(body1);
            }
            return runtime.safeCall(tmp138(keyword.name, " ", tmp139, tmp140, tmp141, tmp142, tmp143))
          } else if (tree1 instanceof Tree.Lambda.class) {
            param03 = tree1.params;
            param12 = tree1.body;
            params = param03;
            body = param12;
            tmp144 = Predef.fold((arg1, arg2) => {
              return arg1 + arg2
            });
            tmp145 = Iter.fromStack(params);
            tmp146 = Iter.mapping(tmp145, go);
            tmp147 = Iter.joined(tmp146, " ");
            tmp148 = go(body);
            return runtime.safeCall(tmp144("fun ", tmp147, " -> ", tmp148))
          } else if (tree1 instanceof Keyword.Keyword.class) {
            param02 = tree1.name;
            param11 = tree1.leftPrec;
            param2 = tree1.rightPrec;
            name = param02;
            return name
          } else if (tree1 instanceof Option.Some.class) {
            param01 = tree1.value;
            tree2 = param01;
            tmp149 = wrap(tree2);
            tmp150 = "Some(" + tmp149;
            return tmp150 + ")"
          } else if (tree1 instanceof Option.None.class) {
            return "None"
          } else if (tree1 instanceof Stack.Cons.class) {
            param0 = tree1.head;
            param1 = tree1.tail;
            tmp151 = Iter.fromStack(tree1);
            tmp152 = Iter.mapping(tmp151, wrap);
            tmp153 = Iter.joined(tmp152, " :: ");
            return tmp153 + " :: Nil"
          } else if (tree1 instanceof Stack.Nil.class) {
            return "Nil"
          } else if (globalThis.Array.isArray(tree1) && tree1.length >= 0) {
            rest = runtime.safeCall(globalThis.Predef.tupleSlice(tree1, 0, 0));
            trees = rest;
            tmp154 = runtime.safeCall(trees.map((tree5, _, _1) => {
              return wrap(tree5)
            }));
            tmp155 = runtime.safeCall(tmp154.join(", "));
            tmp156 = "[" + tmp155;
            return tmp156 + "]"
          } else {
            tmp157 = "<unexpected:" + tree1;
            return tmp157 + ">"
          }
        }
      }
    };
    return wrap(tree)
  } 
  static bracketed(tree1, kind) {
    return Tree.Bracketed(kind, tree1)
  } 
  static asSequence(tree2) {
    let tmp;
    if (tree2 instanceof Tree.Empty.class) {
      return Tree.Sequence(Stack.Nil)
    } else if (tree2 instanceof Tree.Sequence.class) {
      return tree2
    } else {
      tmp = Stack.Cons(tree2, Stack.Nil);
      return Tree.Sequence(tmp)
    }
  } 
  static tupleWithHead(tree3, head) {
    let param0, tail, tmp, tmp1, tmp2;
    if (tree3 instanceof Tree.Tuple.class) {
      param0 = tree3.trees;
      tail = param0;
      tmp = Stack.Cons(head, tail);
      return Tree.Tuple(tmp)
    } else {
      tmp1 = Stack.Cons(tree3, Stack.Nil);
      tmp2 = Stack.Cons(head, tmp1);
      return Tree.Tuple(tmp2)
    }
  } 
  static sequenceWithHead(tree4, head1) {
    let param0, tail, tmp, tmp1, tmp2;
    if (tree4 instanceof Tree.Sequence.class) {
      param0 = tree4.trees;
      tail = param0;
      tmp = Stack.Cons(head1, tail);
      return Tree.Sequence(tmp)
    } else {
      tmp1 = Stack.Cons(tree4, Stack.Nil);
      tmp2 = Stack.Cons(head1, tmp1);
      return Tree.Sequence(tmp2)
    }
  } 
  static nonEmptyError(tree5) {
    let param0, param1;
    if (tree5 instanceof Tree.Error.class) {
      param0 = tree5.tree;
      param1 = tree5.message;
      if (param0 instanceof Tree.Empty.class) {
        return false
      } else {
        return true
      }
    } else {
      return true
    }
  }
  static toString() { return "Tree"; }
};
let Tree = Tree2; export default Tree;
