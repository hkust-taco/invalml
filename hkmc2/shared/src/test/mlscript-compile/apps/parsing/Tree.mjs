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
      let param0, param1, param2, op, param01, param11, callee, param02, param12, op1, scrut, first1, first0, leftPrec, rightPrec, param03, param13, tree2;
      if (tree1 instanceof Tree.Empty.class) {
        return Keyword.INT_MAX
      } else if (tree1 instanceof Tree.Error.class) {
        param03 = tree1.tree;
        param13 = tree1.message;
        tree2 = param03;
        return prec(tree2, side)
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
      let rest, trees, param0, param1, param01, tree2, param02, param11, param2, name, param03, param12, params, body, param04, param13, param21, param3, keyword, lhs, rhs, body1, scrut, param05, rhs$_, scrut1, param06, body2, param07, param14, param22, op, lhs1, rhs1, param08, param15, callee, arguments1, param09, param16, op1, param010, param17, lhs2, param011, param18, rhs2, scrut2, first1, first0, leftPrec, rightPrec, target, param012, param19, field, scrut3, first11, first01, leftPrec1, param013, param110, scrutinee, branches, param014, param111, value, value1, scrut4, param015, trees1, param016, trees2, param017, param112, modifier, subject, param018, param113, name1, param019, param114, tree3, tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20, tmp21, tmp22, tmp23, tmp24, tmp25, tmp26, tmp27, tmp28, tmp29, tmp30, tmp31, tmp32, tmp33, tmp34, tmp35, tmp36, tmp37, tmp38, tmp39, tmp40, tmp41, tmp42, tmp43, tmp44, tmp45, tmp46, tmp47, tmp48, tmp49, tmp50, tmp51, tmp52, tmp53, tmp54, tmp55, tmp56, tmp57, tmp58, tmp59, tmp60, tmp61, tmp62, tmp63, tmp64, tmp65, tmp66, tmp67, tmp68, tmp69, tmp70, tmp71, tmp72, tmp73, tmp74, tmp75, tmp76, tmp77, tmp78, tmp79, tmp80, tmp81, tmp82, tmp83, tmp84, tmp85, tmp86, tmp87, tmp88, tmp89, tmp90, tmp91, tmp92, tmp93, tmp94, tmp95, tmp96, tmp97, tmp98, tmp99, tmp100, tmp101, tmp102, tmp103, tmp104, tmp105, tmp106, tmp107, tmp108, tmp109, tmp110, tmp111, tmp112, tmp113, tmp114, tmp115, tmp116, tmp117, tmp118, tmp119, tmp120, tmp121, tmp122, tmp123, tmp124, tmp125, tmp126, tmp127, tmp128, tmp129, tmp130, tmp131;
      if (tree1 instanceof Tree.Empty.class) {
        return ""
      } else if (tree1 instanceof Tree.Error.class) {
        param019 = tree1.tree;
        param114 = tree1.message;
        if (param019 instanceof Tree.Empty.class) {
          return "\u26A0"
        } else {
          tree3 = param019;
          tmp = go(tree3);
          tmp1 = "<\u26A0:" + tmp;
          return tmp1 + ">"
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
        tmp2 = go(modifier);
        tmp3 = tmp2 + " ";
        tmp4 = go(subject);
        return tmp3 + tmp4
      } else if (tree1 instanceof Tree.Tuple.class) {
        param016 = tree1.trees;
        trees2 = param016;
        tmp5 = Iter.fromStack(trees2);
        tmp6 = Iter.mapping(tmp5, go);
        tmp7 = Iter.joined(tmp6, ", ");
        tmp8 = "(" + tmp7;
        return tmp8 + ")"
      } else if (tree1 instanceof Tree.Sequence.class) {
        param015 = tree1.trees;
        trees1 = param015;
        tmp9 = Iter.fromStack(trees1);
        tmp10 = Iter.mapping(tmp9, go);
        return Iter.joined(tmp10, "; ")
      } else if (tree1 instanceof Tree.Literal.class) {
        param014 = tree1.kind;
        param111 = tree1.value;
        if (param014 instanceof Token.LiteralKind.String.class) {
          value1 = param111;
          scrut4 = value1.length > 5;
          if (scrut4 === true) {
            tmp11 = value1.slice(0, 5);
            tmp12 = runtime.safeCall(globalThis.JSON.stringify(tmp11));
            tmp13 = - 1;
            tmp14 = tmp12.slice(0, tmp13);
            return tmp14 + "\u2026\""
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
        tmp15 = Predef.fold((arg1, arg2) => {
          return arg1 + arg2
        });
        tmp16 = go(scrutinee);
        tmp17 = Iter.fromStack(branches);
        tmp18 = Iter.mapping(tmp17, go);
        tmp19 = Iter.joined(tmp18, " | ");
        return runtime.safeCall(tmp15("match ", tmp16, " with ", tmp19))
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
                        tmp20 = Predef.fold((arg1, arg2) => {
                          return arg1 + arg2
                        });
                        tmp21 = go(target);
                        tmp22 = prec(target, false);
                        tmp23 = tmp22 < leftPrec1;
                        tmp24 = par(tmp21, tmp23);
                        return runtime.safeCall(tmp20(tmp24, ".", field))
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
                        tmp25 = Predef.fold((arg1, arg2) => {
                          return arg1 + arg2
                        });
                        tmp26 = go(callee);
                        tmp27 = Iter.fromStack(arguments1);
                        tmp28 = Iter.mapping(tmp27, go);
                        tmp29 = Iter.joined(tmp28, ", ");
                        return runtime.safeCall(tmp25(tmp26, "(", tmp29, ")"))
                      } else {
                        callee = param08;
                        arguments1 = param15;
                        tmp30 = Predef.fold((arg1, arg2) => {
                          return arg1 + arg2
                        });
                        tmp31 = go(callee);
                        tmp32 = Iter.fromStack(arguments1);
                        tmp33 = Iter.mapping(tmp32, go);
                        tmp34 = Iter.joined(tmp33, ", ");
                        return runtime.safeCall(tmp30(tmp31, "(", tmp34, ")"))
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
                          tmp35 = Predef.fold((arg1, arg2) => {
                            return arg1 + arg2
                          });
                          tmp36 = go(lhs2);
                          tmp37 = prec(lhs2, false);
                          tmp38 = tmp37 < leftPrec;
                          tmp39 = par(tmp36, tmp38);
                          tmp40 = go(rhs2);
                          tmp41 = prec(rhs2, true);
                          tmp42 = tmp41 < rightPrec;
                          tmp43 = par(tmp40, tmp42);
                          return runtime.safeCall(tmp35(tmp39, " ", op1, " ", tmp43))
                        } else {
                          throw new globalThis.Error("match error");
                        }
                      } else {
                        callee = param08;
                        arguments1 = param15;
                        tmp44 = Predef.fold((arg1, arg2) => {
                          return arg1 + arg2
                        });
                        tmp45 = go(callee);
                        tmp46 = Iter.fromStack(arguments1);
                        tmp47 = Iter.mapping(tmp46, go);
                        tmp48 = Iter.joined(tmp47, ", ");
                        return runtime.safeCall(tmp44(tmp45, "(", tmp48, ")"))
                      }
                    } else {
                      callee = param08;
                      arguments1 = param15;
                      tmp49 = Predef.fold((arg1, arg2) => {
                        return arg1 + arg2
                      });
                      tmp50 = go(callee);
                      tmp51 = Iter.fromStack(arguments1);
                      tmp52 = Iter.mapping(tmp51, go);
                      tmp53 = Iter.joined(tmp52, ", ");
                      return runtime.safeCall(tmp49(tmp50, "(", tmp53, ")"))
                    }
                  }
                } else {
                  op1 = param09;
                  if (param16 === true) {
                    lhs2 = param010;
                    callee = param08;
                    arguments1 = param15;
                    tmp54 = Predef.fold((arg1, arg2) => {
                      return arg1 + arg2
                    });
                    tmp55 = go(callee);
                    tmp56 = Iter.fromStack(arguments1);
                    tmp57 = Iter.mapping(tmp56, go);
                    tmp58 = Iter.joined(tmp57, ", ");
                    return runtime.safeCall(tmp54(tmp55, "(", tmp58, ")"))
                  } else {
                    callee = param08;
                    arguments1 = param15;
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
                op1 = param09;
                if (param16 === true) {
                  callee = param08;
                  arguments1 = param15;
                  tmp64 = Predef.fold((arg1, arg2) => {
                    return arg1 + arg2
                  });
                  tmp65 = go(callee);
                  tmp66 = Iter.fromStack(arguments1);
                  tmp67 = Iter.mapping(tmp66, go);
                  tmp68 = Iter.joined(tmp67, ", ");
                  return runtime.safeCall(tmp64(tmp65, "(", tmp68, ")"))
                } else {
                  callee = param08;
                  arguments1 = param15;
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
                        tmp74 = Predef.fold((arg1, arg2) => {
                          return arg1 + arg2
                        });
                        tmp75 = go(lhs2);
                        tmp76 = prec(lhs2, false);
                        tmp77 = tmp76 < leftPrec;
                        tmp78 = par(tmp75, tmp77);
                        tmp79 = go(rhs2);
                        tmp80 = prec(rhs2, true);
                        tmp81 = tmp80 < rightPrec;
                        tmp82 = par(tmp79, tmp81);
                        return runtime.safeCall(tmp74(tmp78, " ", op1, " ", tmp82))
                      } else {
                        throw new globalThis.Error("match error");
                      }
                    } else {
                      callee = param08;
                      arguments1 = param15;
                      tmp83 = Predef.fold((arg1, arg2) => {
                        return arg1 + arg2
                      });
                      tmp84 = go(callee);
                      tmp85 = Iter.fromStack(arguments1);
                      tmp86 = Iter.mapping(tmp85, go);
                      tmp87 = Iter.joined(tmp86, ", ");
                      return runtime.safeCall(tmp83(tmp84, "(", tmp87, ")"))
                    }
                  } else {
                    callee = param08;
                    arguments1 = param15;
                    tmp88 = Predef.fold((arg1, arg2) => {
                      return arg1 + arg2
                    });
                    tmp89 = go(callee);
                    tmp90 = Iter.fromStack(arguments1);
                    tmp91 = Iter.mapping(tmp90, go);
                    tmp92 = Iter.joined(tmp91, ", ");
                    return runtime.safeCall(tmp88(tmp89, "(", tmp92, ")"))
                  }
                } else {
                  callee = param08;
                  arguments1 = param15;
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
                callee = param08;
                arguments1 = param15;
                tmp98 = Predef.fold((arg1, arg2) => {
                  return arg1 + arg2
                });
                tmp99 = go(callee);
                tmp100 = Iter.fromStack(arguments1);
                tmp101 = Iter.mapping(tmp100, go);
                tmp102 = Iter.joined(tmp101, ", ");
                return runtime.safeCall(tmp98(tmp99, "(", tmp102, ")"))
              }
            }
          } else {
            callee = param08;
            arguments1 = param15;
            tmp103 = Predef.fold((arg1, arg2) => {
              return arg1 + arg2
            });
            tmp104 = go(callee);
            tmp105 = Iter.fromStack(arguments1);
            tmp106 = Iter.mapping(tmp105, go);
            tmp107 = Iter.joined(tmp106, ", ");
            return runtime.safeCall(tmp103(tmp104, "(", tmp107, ")"))
          }
        } else if (tree1 instanceof Tree.Infix.class) {
          param07 = tree1.op;
          param14 = tree1.lhs;
          param22 = tree1.rhs;
          op = param07;
          lhs1 = param14;
          rhs1 = param22;
          tmp108 = Predef.fold((arg1, arg2) => {
            return arg1 + arg2
          });
          tmp109 = go(lhs1);
          tmp110 = go(op);
          tmp111 = go(rhs1);
          return runtime.safeCall(tmp108(tmp109, " ", tmp110, " ", tmp111))
        } else if (tree1 instanceof Tree.Ternary.class) {
          param04 = tree1.keyword;
          param13 = tree1.lhs;
          param21 = tree1.rhs;
          param3 = tree1.body;
          keyword = param04;
          lhs = param13;
          rhs = param21;
          body1 = param3;
          tmp112 = Predef.fold((arg1, arg2) => {
            return arg1 + arg2
          });
          tmp113 = go(lhs);
          scrut = keyword.name;
          if (scrut === "if") {
            tmp114 = " then ";
          } else if (scrut === "type") {
            tmp114 = " = ";
          } else if (scrut === "let") {
            tmp114 = " = ";
          } else {
            throw new globalThis.Error("match error");
          }
          if (rhs instanceof Option.Some.class) {
            param05 = rhs.value;
            rhs$_ = param05;
            tmp115 = go(rhs$_);
          } else {
            tmp115 = go(rhs);
          }
          scrut1 = keyword.name;
          if (scrut1 === "if") {
            tmp116 = " then ";
          } else if (scrut1 === "type") {
            tmp116 = "";
          } else if (scrut1 === "let") {
            tmp116 = " in ";
          } else {
            throw new globalThis.Error("match error");
          }
          if (body1 instanceof Option.Some.class) {
            param06 = body1.value;
            body2 = param06;
            tmp117 = go(body2);
          } else {
            tmp117 = "";
          }
          return runtime.safeCall(tmp112(keyword.name, " ", tmp113, tmp114, tmp115, tmp116, tmp117))
        } else if (tree1 instanceof Tree.Lambda.class) {
          param03 = tree1.params;
          param12 = tree1.body;
          params = param03;
          body = param12;
          tmp118 = Predef.fold((arg1, arg2) => {
            return arg1 + arg2
          });
          tmp119 = Iter.fromStack(params);
          tmp120 = Iter.mapping(tmp119, go);
          tmp121 = Iter.joined(tmp120, " ");
          tmp122 = go(body);
          return runtime.safeCall(tmp118("fun ", tmp121, " -> ", tmp122))
        } else if (tree1 instanceof Keyword.Keyword.class) {
          param02 = tree1.name;
          param11 = tree1.leftPrec;
          param2 = tree1.rightPrec;
          name = param02;
          return name
        } else if (tree1 instanceof Option.Some.class) {
          param01 = tree1.value;
          tree2 = param01;
          tmp123 = wrap(tree2);
          tmp124 = "Some(" + tmp123;
          return tmp124 + ")"
        } else if (tree1 instanceof Option.None.class) {
          return "None"
        } else if (tree1 instanceof Stack.Cons.class) {
          param0 = tree1.head;
          param1 = tree1.tail;
          tmp125 = Iter.fromStack(tree1);
          tmp126 = Iter.mapping(tmp125, wrap);
          tmp127 = Iter.joined(tmp126, " :: ");
          return tmp127 + " :: Nil"
        } else if (tree1 instanceof Stack.Nil.class) {
          return "Nil"
        } else if (globalThis.Array.isArray(tree1) && tree1.length >= 0) {
          rest = runtime.safeCall(globalThis.Predef.tupleSlice(tree1, 0, 0));
          trees = rest;
          tmp128 = runtime.safeCall(trees.map((tree4, _, _1) => {
            return wrap(tree4)
          }));
          tmp129 = runtime.safeCall(tmp128.join(", "));
          tmp130 = "[" + tmp129;
          return tmp130 + "]"
        } else {
          tmp131 = "<unexpected:" + tree1;
          return tmp131 + ">"
        }
      }
    };
    return wrap(tree)
  }
  static toString() { return "Tree"; }
};
let Tree = Tree2; export default Tree;
