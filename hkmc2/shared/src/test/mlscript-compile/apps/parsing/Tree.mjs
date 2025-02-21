import runtime from "./../../Runtime.mjs";
import Iter from "./../../Iter.mjs";
import Predef from "./../../Predef.mjs";
import Stack from "./../../Stack.mjs";
import Option from "./../../Option.mjs";
import Lexer from "./../Lexer.mjs";
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
                return Precedence.appPrec
              }
            } else {
              return Precedence.appPrec
            }
          } else {
            return Precedence.appPrec
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
        tmp1 = "{" + tmp;
        return tmp1 + "}"
      } else {
        return go(something)
      }
    };
    go = function go(tree1) {
      let rest, trees, param0, param1, param01, tree2, param02, param11, param2, name, param03, param12, params, body, param04, param13, param21, param3, keyword, lhs, rhs, body1, scrut, param05, rhs$_, scrut1, param06, body2, param07, param14, param22, op, lhs1, rhs1, param08, param15, callee, arguments1, param09, param16, op1, param010, param17, lhs2, param011, param18, rhs2, scrut2, first1, first0, leftPrec, rightPrec, target, param012, param19, field, scrut3, first11, first01, leftPrec1, param013, param110, scrutinee, branches, param014, param111, value, value1, scrut4, param015, trees1, param016, trees2, param017, param112, modifier, subject, param018, param113, name1, param019, param114, kind, tree3, param020, param115, tree4, tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20, tmp21, tmp22, tmp23, tmp24, tmp25, tmp26, tmp27, tmp28, tmp29, tmp30, tmp31, tmp32, tmp33, tmp34, tmp35, tmp36, tmp37, tmp38, tmp39, tmp40, tmp41, tmp42, tmp43, tmp44, tmp45, tmp46, tmp47, tmp48, tmp49, tmp50, tmp51, tmp52, tmp53, tmp54, tmp55, tmp56, tmp57, tmp58, tmp59, tmp60, tmp61, tmp62, tmp63, tmp64, tmp65, tmp66, tmp67, tmp68, tmp69, tmp70, tmp71, tmp72, tmp73, tmp74, tmp75, tmp76, tmp77, tmp78, tmp79, tmp80, tmp81, tmp82, tmp83, tmp84, tmp85, tmp86, tmp87, tmp88, tmp89, tmp90, tmp91, tmp92, tmp93, tmp94, tmp95, tmp96, tmp97, tmp98, tmp99, tmp100, tmp101, tmp102, tmp103, tmp104, tmp105, tmp106, tmp107, tmp108, tmp109, tmp110, tmp111, tmp112, tmp113, tmp114, tmp115, tmp116, tmp117, tmp118, tmp119, tmp120, tmp121, tmp122, tmp123, tmp124, tmp125, tmp126, tmp127, tmp128, tmp129, tmp130, tmp131, tmp132, tmp133, tmp134, tmp135, tmp136, tmp137, tmp138, tmp139, tmp140;
      if (tree1 instanceof Tree.Empty.class) {
        return ""
      } else if (tree1 instanceof Tree.Error.class) {
        param020 = tree1.tree;
        param115 = tree1.message;
        if (param020 instanceof Tree.Empty.class) {
          return "\u26A0"
        } else {
          tree4 = param020;
          tmp = go(tree4);
          tmp1 = "<\u26A0:" + tmp;
          return tmp1 + ">"
        }
      } else if (tree1 instanceof Tree.Bracketed.class) {
        param019 = tree1.kind;
        param114 = tree1.tree;
        kind = param019;
        tree3 = param114;
        if (kind instanceof Token.Round.class) {
          tmp2 = go(tree3);
          tmp3 = "(" + tmp2;
          return tmp3 + ")"
        } else if (kind instanceof Token.Square.class) {
          tmp4 = go(tree3);
          tmp5 = "[" + tmp4;
          return tmp5 + "]"
        } else if (kind instanceof Token.Curly.class) {
          tmp6 = go(tree3);
          tmp7 = "{" + tmp6;
          return tmp7 + "}"
        } else if (kind instanceof Token.Angle.class) {
          tmp8 = go(tree3);
          tmp9 = "<" + tmp8;
          return tmp9 + ">"
        } else {
          tmp10 = "<unexpected:" + tree1;
          return tmp10 + ">"
        }
      } else if (tree1 instanceof Tree.Ident.class) {
        param018 = tree1.name;
        param113 = tree1.symbolic;
        name1 = param018;
        return name1
      } else if (tree1 instanceof Tree.Underscore.class) {
        return "_"
      } else if (tree1 instanceof Tree.Modified.class) {
        param017 = tree1.modifier;
        param112 = tree1.subject;
        modifier = param017;
        subject = param112;
        tmp11 = go(modifier);
        tmp12 = tmp11 + " ";
        tmp13 = go(subject);
        return tmp12 + tmp13
      } else if (tree1 instanceof Tree.Tuple.class) {
        param016 = tree1.trees;
        trees2 = param016;
        tmp14 = Iter.fromStack(trees2);
        tmp15 = Iter.mapping(tmp14, go);
        tmp16 = Iter.joined(tmp15, ", ");
        tmp17 = "(" + tmp16;
        return tmp17 + ")"
      } else if (tree1 instanceof Tree.Sequence.class) {
        param015 = tree1.trees;
        trees1 = param015;
        tmp18 = Iter.fromStack(trees1);
        tmp19 = Iter.mapping(tmp18, go);
        return Iter.joined(tmp19, "; ")
      } else if (tree1 instanceof Tree.Literal.class) {
        param014 = tree1.kind;
        param111 = tree1.value;
        if (param014 instanceof Token.LiteralKind.String.class) {
          value1 = param111;
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
          value = param111;
          return value
        }
      } else if (tree1 instanceof Tree.Match.class) {
        param013 = tree1.scrutinee;
        param110 = tree1.branches;
        scrutinee = param013;
        branches = param110;
        tmp24 = Predef.fold((arg1, arg2) => {
          return arg1 + arg2
        });
        tmp25 = go(scrutinee);
        tmp26 = Iter.fromStack(branches);
        tmp27 = Iter.mapping(tmp26, go);
        tmp28 = Iter.joined(tmp27, " | ");
        return runtime.safeCall(tmp24("match ", tmp25, " with ", tmp28))
      } else {
        if (tree1 instanceof Tree.App.class) {
          param08 = tree1.callee;
          param15 = tree1.arguments;
          if (param08 instanceof Tree.Ident.class) {
            param09 = param08.name;
            param16 = param08.symbolic;
            if (param09 === ".") {
              if (param15 instanceof Stack.Cons.class) {
                param010 = param15.head;
                param17 = param15.tail;
                target = param010;
                if (param17 instanceof Stack.Cons.class) {
                  param011 = param17.head;
                  param18 = param17.tail;
                  if (param011 instanceof Tree.Ident.class) {
                    param012 = param011.name;
                    param19 = param011.symbolic;
                    field = param012;
                    if (param18 instanceof Stack.Nil.class) {
                      scrut3 = Precedence.opPrec(".");
                      if (globalThis.Array.isArray(scrut3) && scrut3.length === 2) {
                        first01 = scrut3[0];
                        first11 = scrut3[1];
                        leftPrec1 = first01;
                        tmp29 = Predef.fold((arg1, arg2) => {
                          return arg1 + arg2
                        });
                        tmp30 = go(target);
                        tmp31 = prec(target, false);
                        tmp32 = tmp31 < leftPrec1;
                        tmp33 = par(tmp30, tmp32);
                        return runtime.safeCall(tmp29(tmp33, ".", field))
                      } else {
                        throw new globalThis.Error("match error");
                      }
                    } else {
                      op1 = param09;
                      if (param16 === true) {
                        lhs2 = param010;
                        rhs2 = param011;
                        callee = param08;
                        arguments1 = param15;
                        tmp34 = Predef.fold((arg1, arg2) => {
                          return arg1 + arg2
                        });
                        tmp35 = go(callee);
                        tmp36 = Iter.fromStack(arguments1);
                        tmp37 = Iter.mapping(tmp36, go);
                        tmp38 = Iter.joined(tmp37, ", ");
                        return runtime.safeCall(tmp34(tmp35, "(", tmp38, ")"))
                      } else {
                        callee = param08;
                        arguments1 = param15;
                        tmp39 = Predef.fold((arg1, arg2) => {
                          return arg1 + arg2
                        });
                        tmp40 = go(callee);
                        tmp41 = Iter.fromStack(arguments1);
                        tmp42 = Iter.mapping(tmp41, go);
                        tmp43 = Iter.joined(tmp42, ", ");
                        return runtime.safeCall(tmp39(tmp40, "(", tmp43, ")"))
                      }
                    }
                  } else {
                    op1 = param09;
                    if (param16 === true) {
                      lhs2 = param010;
                      rhs2 = param011;
                      if (param18 instanceof Stack.Nil.class) {
                        scrut2 = Precedence.opPrec(op1);
                        if (globalThis.Array.isArray(scrut2) && scrut2.length === 2) {
                          first0 = scrut2[0];
                          first1 = scrut2[1];
                          leftPrec = first0;
                          rightPrec = first1;
                          tmp44 = Predef.fold((arg1, arg2) => {
                            return arg1 + arg2
                          });
                          tmp45 = go(lhs2);
                          tmp46 = prec(lhs2, false);
                          tmp47 = tmp46 < leftPrec;
                          tmp48 = par(tmp45, tmp47);
                          tmp49 = go(rhs2);
                          tmp50 = prec(rhs2, true);
                          tmp51 = tmp50 < rightPrec;
                          tmp52 = par(tmp49, tmp51);
                          return runtime.safeCall(tmp44(tmp48, " ", op1, " ", tmp52))
                        } else {
                          throw new globalThis.Error("match error");
                        }
                      } else {
                        callee = param08;
                        arguments1 = param15;
                        tmp53 = Predef.fold((arg1, arg2) => {
                          return arg1 + arg2
                        });
                        tmp54 = go(callee);
                        tmp55 = Iter.fromStack(arguments1);
                        tmp56 = Iter.mapping(tmp55, go);
                        tmp57 = Iter.joined(tmp56, ", ");
                        return runtime.safeCall(tmp53(tmp54, "(", tmp57, ")"))
                      }
                    } else {
                      callee = param08;
                      arguments1 = param15;
                      tmp58 = Predef.fold((arg1, arg2) => {
                        return arg1 + arg2
                      });
                      tmp59 = go(callee);
                      tmp60 = Iter.fromStack(arguments1);
                      tmp61 = Iter.mapping(tmp60, go);
                      tmp62 = Iter.joined(tmp61, ", ");
                      return runtime.safeCall(tmp58(tmp59, "(", tmp62, ")"))
                    }
                  }
                } else {
                  op1 = param09;
                  if (param16 === true) {
                    lhs2 = param010;
                    callee = param08;
                    arguments1 = param15;
                    tmp63 = Predef.fold((arg1, arg2) => {
                      return arg1 + arg2
                    });
                    tmp64 = go(callee);
                    tmp65 = Iter.fromStack(arguments1);
                    tmp66 = Iter.mapping(tmp65, go);
                    tmp67 = Iter.joined(tmp66, ", ");
                    return runtime.safeCall(tmp63(tmp64, "(", tmp67, ")"))
                  } else {
                    callee = param08;
                    arguments1 = param15;
                    tmp68 = Predef.fold((arg1, arg2) => {
                      return arg1 + arg2
                    });
                    tmp69 = go(callee);
                    tmp70 = Iter.fromStack(arguments1);
                    tmp71 = Iter.mapping(tmp70, go);
                    tmp72 = Iter.joined(tmp71, ", ");
                    return runtime.safeCall(tmp68(tmp69, "(", tmp72, ")"))
                  }
                }
              } else {
                op1 = param09;
                if (param16 === true) {
                  callee = param08;
                  arguments1 = param15;
                  tmp73 = Predef.fold((arg1, arg2) => {
                    return arg1 + arg2
                  });
                  tmp74 = go(callee);
                  tmp75 = Iter.fromStack(arguments1);
                  tmp76 = Iter.mapping(tmp75, go);
                  tmp77 = Iter.joined(tmp76, ", ");
                  return runtime.safeCall(tmp73(tmp74, "(", tmp77, ")"))
                } else {
                  callee = param08;
                  arguments1 = param15;
                  tmp78 = Predef.fold((arg1, arg2) => {
                    return arg1 + arg2
                  });
                  tmp79 = go(callee);
                  tmp80 = Iter.fromStack(arguments1);
                  tmp81 = Iter.mapping(tmp80, go);
                  tmp82 = Iter.joined(tmp81, ", ");
                  return runtime.safeCall(tmp78(tmp79, "(", tmp82, ")"))
                }
              }
            } else {
              op1 = param09;
              if (param16 === true) {
                if (param15 instanceof Stack.Cons.class) {
                  param010 = param15.head;
                  param17 = param15.tail;
                  lhs2 = param010;
                  if (param17 instanceof Stack.Cons.class) {
                    param011 = param17.head;
                    param18 = param17.tail;
                    rhs2 = param011;
                    if (param18 instanceof Stack.Nil.class) {
                      scrut2 = Precedence.opPrec(op1);
                      if (globalThis.Array.isArray(scrut2) && scrut2.length === 2) {
                        first0 = scrut2[0];
                        first1 = scrut2[1];
                        leftPrec = first0;
                        rightPrec = first1;
                        tmp83 = Predef.fold((arg1, arg2) => {
                          return arg1 + arg2
                        });
                        tmp84 = go(lhs2);
                        tmp85 = prec(lhs2, false);
                        tmp86 = tmp85 < leftPrec;
                        tmp87 = par(tmp84, tmp86);
                        tmp88 = go(rhs2);
                        tmp89 = prec(rhs2, true);
                        tmp90 = tmp89 < rightPrec;
                        tmp91 = par(tmp88, tmp90);
                        return runtime.safeCall(tmp83(tmp87, " ", op1, " ", tmp91))
                      } else {
                        throw new globalThis.Error("match error");
                      }
                    } else {
                      callee = param08;
                      arguments1 = param15;
                      tmp92 = Predef.fold((arg1, arg2) => {
                        return arg1 + arg2
                      });
                      tmp93 = go(callee);
                      tmp94 = Iter.fromStack(arguments1);
                      tmp95 = Iter.mapping(tmp94, go);
                      tmp96 = Iter.joined(tmp95, ", ");
                      return runtime.safeCall(tmp92(tmp93, "(", tmp96, ")"))
                    }
                  } else {
                    callee = param08;
                    arguments1 = param15;
                    tmp97 = Predef.fold((arg1, arg2) => {
                      return arg1 + arg2
                    });
                    tmp98 = go(callee);
                    tmp99 = Iter.fromStack(arguments1);
                    tmp100 = Iter.mapping(tmp99, go);
                    tmp101 = Iter.joined(tmp100, ", ");
                    return runtime.safeCall(tmp97(tmp98, "(", tmp101, ")"))
                  }
                } else {
                  callee = param08;
                  arguments1 = param15;
                  tmp102 = Predef.fold((arg1, arg2) => {
                    return arg1 + arg2
                  });
                  tmp103 = go(callee);
                  tmp104 = Iter.fromStack(arguments1);
                  tmp105 = Iter.mapping(tmp104, go);
                  tmp106 = Iter.joined(tmp105, ", ");
                  return runtime.safeCall(tmp102(tmp103, "(", tmp106, ")"))
                }
              } else {
                callee = param08;
                arguments1 = param15;
                tmp107 = Predef.fold((arg1, arg2) => {
                  return arg1 + arg2
                });
                tmp108 = go(callee);
                tmp109 = Iter.fromStack(arguments1);
                tmp110 = Iter.mapping(tmp109, go);
                tmp111 = Iter.joined(tmp110, ", ");
                return runtime.safeCall(tmp107(tmp108, "(", tmp111, ")"))
              }
            }
          } else {
            callee = param08;
            arguments1 = param15;
            tmp112 = Predef.fold((arg1, arg2) => {
              return arg1 + arg2
            });
            tmp113 = go(callee);
            tmp114 = Iter.fromStack(arguments1);
            tmp115 = Iter.mapping(tmp114, go);
            tmp116 = Iter.joined(tmp115, ", ");
            return runtime.safeCall(tmp112(tmp113, "(", tmp116, ")"))
          }
        } else if (tree1 instanceof Tree.Infix.class) {
          param07 = tree1.op;
          param14 = tree1.lhs;
          param22 = tree1.rhs;
          op = param07;
          lhs1 = param14;
          rhs1 = param22;
          tmp117 = Predef.fold((arg1, arg2) => {
            return arg1 + arg2
          });
          tmp118 = go(lhs1);
          tmp119 = go(op);
          tmp120 = go(rhs1);
          return runtime.safeCall(tmp117(tmp118, " ", tmp119, " ", tmp120))
        } else if (tree1 instanceof Tree.Ternary.class) {
          param04 = tree1.keyword;
          param13 = tree1.lhs;
          param21 = tree1.rhs;
          param3 = tree1.body;
          keyword = param04;
          lhs = param13;
          rhs = param21;
          body1 = param3;
          tmp121 = Predef.fold((arg1, arg2) => {
            return arg1 + arg2
          });
          tmp122 = go(lhs);
          scrut = keyword.name;
          if (scrut === "if") {
            tmp123 = " then ";
          } else if (scrut === "type") {
            tmp123 = " = ";
          } else if (scrut === "let") {
            tmp123 = " = ";
          } else {
            throw new globalThis.Error("match error");
          }
          if (rhs instanceof Option.Some.class) {
            param05 = rhs.value;
            rhs$_ = param05;
            tmp124 = go(rhs$_);
          } else {
            tmp124 = go(rhs);
          }
          scrut1 = keyword.name;
          if (scrut1 === "if") {
            tmp125 = " then ";
          } else if (scrut1 === "type") {
            tmp125 = "";
          } else if (scrut1 === "let") {
            tmp125 = " in ";
          } else {
            throw new globalThis.Error("match error");
          }
          if (body1 instanceof Option.Some.class) {
            param06 = body1.value;
            body2 = param06;
            tmp126 = go(body2);
          } else {
            tmp126 = "";
          }
          return runtime.safeCall(tmp121(keyword.name, " ", tmp122, tmp123, tmp124, tmp125, tmp126))
        } else if (tree1 instanceof Tree.Lambda.class) {
          param03 = tree1.params;
          param12 = tree1.body;
          params = param03;
          body = param12;
          tmp127 = Predef.fold((arg1, arg2) => {
            return arg1 + arg2
          });
          tmp128 = Iter.fromStack(params);
          tmp129 = Iter.mapping(tmp128, go);
          tmp130 = Iter.joined(tmp129, " ");
          tmp131 = go(body);
          return runtime.safeCall(tmp127("fun ", tmp130, " -> ", tmp131))
        } else if (tree1 instanceof Keyword.Keyword.class) {
          param02 = tree1.name;
          param11 = tree1.leftPrec;
          param2 = tree1.rightPrec;
          name = param02;
          return name
        } else if (tree1 instanceof Option.Some.class) {
          param01 = tree1.value;
          tree2 = param01;
          tmp132 = wrap(tree2);
          tmp133 = "Some(" + tmp132;
          return tmp133 + ")"
        } else if (tree1 instanceof Option.None.class) {
          return "None"
        } else if (tree1 instanceof Stack.Cons.class) {
          param0 = tree1.head;
          param1 = tree1.tail;
          tmp134 = Iter.fromStack(tree1);
          tmp135 = Iter.mapping(tmp134, wrap);
          tmp136 = Iter.joined(tmp135, " :: ");
          return tmp136 + " :: Nil"
        } else if (tree1 instanceof Stack.Nil.class) {
          return "Nil"
        } else if (globalThis.Array.isArray(tree1) && tree1.length >= 0) {
          rest = runtime.safeCall(globalThis.Predef.tupleSlice(tree1, 0, 0));
          trees = rest;
          tmp137 = runtime.safeCall(trees.map((tree5, _, _1) => {
            return wrap(tree5)
          }));
          tmp138 = runtime.safeCall(tmp137.join(", "));
          tmp139 = "[" + tmp138;
          return tmp139 + "]"
        } else {
          tmp140 = "<unexpected:" + tree1;
          return tmp140 + ">"
        }
      }
    };
    return wrap(tree)
  } 
  static tupleWithHead(tree1, head) {
    let param0, tail, tmp, tmp1, tmp2;
    if (tree1 instanceof Tree.Tuple.class) {
      param0 = tree1.trees;
      tail = param0;
      tmp = Stack.Cons(head, tail);
      return Tree.Tuple(tmp)
    } else {
      tmp1 = Stack.Cons(tree1, Stack.Nil);
      tmp2 = Stack.Cons(head, tmp1);
      return Tree.Tuple(tmp2)
    }
  } 
  static sequenceWithHead(tree2, head1) {
    let param0, tail, tmp, tmp1, tmp2;
    if (tree2 instanceof Tree.Sequence.class) {
      param0 = tree2.trees;
      tail = param0;
      tmp = Stack.Cons(head1, tail);
      return Tree.Sequence(tmp)
    } else {
      tmp1 = Stack.Cons(tree2, Stack.Nil);
      tmp2 = Stack.Cons(head1, tmp1);
      return Tree.Sequence(tmp2)
    }
  } 
  static nonEmptyError(tree3) {
    let param0, param1;
    if (tree3 instanceof Tree.Error.class) {
      param0 = tree3.tree;
      param1 = tree3.message;
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
