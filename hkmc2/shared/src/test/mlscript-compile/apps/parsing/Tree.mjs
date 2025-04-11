import runtime from "./../../Runtime.mjs";
import Iter from "./../../Iter.mjs";
import Predef from "./../../Predef.mjs";
import Stack from "./../../Stack.mjs";
import Option from "./../../Option.mjs";
import Str from "./../../Str.mjs";
import Keyword from "./Keyword.mjs";
import Precedence from "./Precedence.mjs";
import Token from "./Token.mjs";
let Tree2;
(class Tree {
  static {
    Tree2 = Tree;
    this.Tree = class Tree1 {
      constructor() {}
      toString() { return "Tree"; }
    };
    (class DefineKind {
      static {
        Tree.DefineKind = DefineKind;
        this.Let = function Let(recursive1) {
          return new Let.class(recursive1);
        };
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
        const Directive$class = class Directive {
          constructor() {}
          toString() { return "Directive"; }
        };
        this.Directive = new Directive$class;
        this.Directive.class = Directive$class;
      }
      static toString() { return "DefineKind"; }
    });
    this.Empty = function Empty() {
      return new Empty.class();
    };
    this.Empty.class = class Empty extends Tree.Tree {
      constructor() {
        super();
      }
      toString() { return "Empty(" + "" + ")"; }
    };
    this.Error = function Error(tree1, message1) {
      return new Error.class(tree1, message1);
    };
    this.Error.class = class Error extends Tree.Tree {
      constructor(tree, message) {
        super();
        this.tree = tree;
        this.message = message;
      }
      toString() { return "Error(" + globalThis.Predef.render(this.tree) + ", " + globalThis.Predef.render(this.message) + ")"; }
    };
    this.Bracketed = function Bracketed(kind1, tree1) {
      return new Bracketed.class(kind1, tree1);
    };
    this.Bracketed.class = class Bracketed extends Tree.Tree {
      constructor(kind, tree) {
        super();
        this.kind = kind;
        this.tree = tree;
      }
      toString() { return "Bracketed(" + globalThis.Predef.render(this.kind) + ", " + globalThis.Predef.render(this.tree) + ")"; }
    };
    this.Ident = function Ident(name1, symbolic1) {
      return new Ident.class(name1, symbolic1);
    };
    this.Ident.class = class Ident extends Tree.Tree {
      constructor(name, symbolic) {
        super();
        this.name = name;
        this.symbolic = symbolic;
      }
      toString() { return "Ident(" + globalThis.Predef.render(this.name) + ", " + globalThis.Predef.render(this.symbolic) + ")"; }
    };
    this.Underscore = function Underscore() {
      return new Underscore.class();
    };
    this.Underscore.class = class Underscore extends Tree.Tree {
      constructor() {
        super();
      }
      toString() { return "Underscore(" + "" + ")"; }
    };
    this.Modified = function Modified(modifier1, subject1) {
      return new Modified.class(modifier1, subject1);
    };
    this.Modified.class = class Modified extends Tree.Tree {
      constructor(modifier, subject) {
        super();
        this.modifier = modifier;
        this.subject = subject;
      }
      toString() { return "Modified(" + globalThis.Predef.render(this.modifier) + ", " + globalThis.Predef.render(this.subject) + ")"; }
    };
    this.Tuple = function Tuple(trees1) {
      return new Tuple.class(trees1);
    };
    this.Tuple.class = class Tuple extends Tree.Tree {
      constructor(trees) {
        super();
        this.trees = trees;
      }
      toString() { return "Tuple(" + globalThis.Predef.render(this.trees) + ")"; }
    };
    this.Sequence = function Sequence(trees1) {
      return new Sequence.class(trees1);
    };
    this.Sequence.class = class Sequence extends Tree.Tree {
      constructor(trees) {
        super();
        this.trees = trees;
      }
      toString() { return "Sequence(" + globalThis.Predef.render(this.trees) + ")"; }
    };
    this.Literal = function Literal(kind1, value1) {
      return new Literal.class(kind1, value1);
    };
    this.Literal.class = class Literal extends Tree.Tree {
      constructor(kind, value) {
        super();
        this.kind = kind;
        this.value = value;
      }
      toString() { return "Literal(" + globalThis.Predef.render(this.kind) + ", " + globalThis.Predef.render(this.value) + ")"; }
    };
    this.Match = function Match(scrutinee1, branches1) {
      return new Match.class(scrutinee1, branches1);
    };
    this.Match.class = class Match extends Tree.Tree {
      constructor(scrutinee, branches) {
        super();
        this.scrutinee = scrutinee;
        this.branches = branches;
      }
      toString() { return "Match(" + globalThis.Predef.render(this.scrutinee) + ", " + globalThis.Predef.render(this.branches) + ")"; }
    };
    this.Lambda = function Lambda(params1, body1) {
      return new Lambda.class(params1, body1);
    };
    this.Lambda.class = class Lambda extends Tree.Tree {
      constructor(params, body) {
        super();
        this.params = params;
        this.body = body;
      }
      toString() { return "Lambda(" + globalThis.Predef.render(this.params) + ", " + globalThis.Predef.render(this.body) + ")"; }
    };
    this.App = function App(callee1, argument1) {
      return new App.class(callee1, argument1);
    };
    this.App.class = class App extends Tree.Tree {
      constructor(callee, argument) {
        super();
        this.callee = callee;
        this.argument = argument;
      }
      toString() { return "App(" + globalThis.Predef.render(this.callee) + ", " + globalThis.Predef.render(this.argument) + ")"; }
    };
    this.Infix = function Infix(op1, lhs1, rhs1) {
      return new Infix.class(op1, lhs1, rhs1);
    };
    this.Infix.class = class Infix extends Tree.Tree {
      constructor(op, lhs, rhs) {
        super();
        this.op = op;
        this.lhs = lhs;
        this.rhs = rhs;
      }
      toString() { return "Infix(" + globalThis.Predef.render(this.op) + ", " + globalThis.Predef.render(this.lhs) + ", " + globalThis.Predef.render(this.rhs) + ")"; }
    };
    this.Define = function Define(kind1, items1) {
      return new Define.class(kind1, items1);
    };
    this.Define.class = class Define extends Tree.Tree {
      constructor(kind, items) {
        super();
        this.kind = kind;
        this.items = items;
      }
      toString() { return "Define(" + globalThis.Predef.render(this.kind) + ", " + globalThis.Predef.render(this.items) + ")"; }
    };
    this.LetIn = function LetIn(bindings1, body1) {
      return new LetIn.class(bindings1, body1);
    };
    this.LetIn.class = class LetIn extends Tree.Tree {
      constructor(bindings, body) {
        super();
        this.bindings = bindings;
        this.body = body;
      }
      toString() { return "LetIn(" + globalThis.Predef.render(this.bindings) + ", " + globalThis.Predef.render(this.body) + ")"; }
    };
    this.While = function While(cond1, body1) {
      return new While.class(cond1, body1);
    };
    this.While.class = class While extends Tree.Tree {
      constructor(cond, body) {
        super();
        this.cond = cond;
        this.body = body;
      }
      toString() { return "While(" + globalThis.Predef.render(this.cond) + ", " + globalThis.Predef.render(this.body) + ")"; }
    };
    this.For = function For(head1, start1, end1, body1) {
      return new For.class(head1, start1, end1, body1);
    };
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
    this.Ternary = function Ternary(keyword1, lhs1, rhs1, body1) {
      return new Ternary.class(keyword1, lhs1, rhs1, body1);
    };
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
      } else if (tree1 instanceof Tree.Ident.class) {
        return Keyword.INT_MAX
      } else {
        if (tree1 instanceof Tree.Underscore.class) {
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
          param11 = tree1.argument;
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
        } else if (tree1 instanceof Tree.Lambda.class) {
          return Precedence.Keywords._fun.leftPrecOrMax
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
      let rest, trees, param0, param1, param01, tree2, param02, param11, param2, name, param03, param12, params, body, param04, param13, param21, param3, keyword, lhs, rhs, body1, scrut, param05, rhs$_, scrut1, param06, body2, param07, param14, param22, param31, head, start, end, body3, param08, param15, cond, body4, param09, param16, bindings, body5, param010, body6, param011, param17, kind, items, param012, param013, param18, first1, first0, name1, value, param014, param19, param23, op, lhs1, rhs1, param015, param110, param24, target, param016, param111, field, scrut2, first11, first01, leftPrec, param017, param112, callee, argument, param018, param113, op1, arg, op2, param019, param114, lhs2, param020, param115, rhs2, scrut3, first12, first02, leftPrec1, rightPrec, param021, param116, scrutinee, branches, param022, param117, value1, value2, scrut4, param023, trees1, param024, trees2, param025, param118, modifier, subject, param026, param119, name2, param027, param120, kind1, tree3, param028, param121, tree4, tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20, tmp21, tmp22, tmp23, tmp24, tmp25, tmp26, tmp27, tmp28, tmp29, tmp30, tmp31, tmp32, tmp33, tmp34, tmp35, tmp36, tmp37, tmp38, tmp39, tmp40, tmp41, tmp42, tmp43, tmp44, tmp45, tmp46, tmp47, tmp48, tmp49, tmp50, tmp51, tmp52, tmp53, tmp54, tmp55, tmp56, tmp57, tmp58, tmp59, tmp60, tmp61, tmp62, tmp63, tmp64, tmp65, tmp66, tmp67, tmp68, tmp69, tmp70, tmp71, tmp72, tmp73, tmp74, tmp75, tmp76, tmp77, tmp78, tmp79, tmp80, tmp81, tmp82, tmp83, tmp84, tmp85, tmp86, tmp87, tmp88, tmp89, tmp90, tmp91, tmp92, tmp93, tmp94, tmp95, tmp96, tmp97, tmp98, tmp99, tmp100, tmp101, tmp102, tmp103, tmp104, tmp105, tmp106, tmp107, tmp108, tmp109, tmp110, tmp111, tmp112, tmp113, tmp114, tmp115, tmp116, tmp117, tmp118, tmp119, tmp120, tmp121, tmp122, tmp123, tmp124, tmp125, tmp126, tmp127, tmp128, tmp129, lambda, lambda1, lambda2, lambda3, lambda4, lambda5, lambda6, lambda7, lambda8, lambda9, lambda10;
      if (tree1 instanceof Tree.Empty.class) {
        return "{}"
      } else if (tree1 instanceof Tree.Error.class) {
        param028 = tree1.tree;
        param121 = tree1.message;
        if (param028 instanceof Tree.Empty.class) {
          return "\u26A0"
        } else {
          tree4 = param028;
          tmp = go(tree4);
          tmp1 = "<\u26A0:" + tmp;
          return tmp1 + ">"
        }
      } else if (tree1 instanceof Tree.Bracketed.class) {
        param027 = tree1.kind;
        param120 = tree1.tree;
        kind1 = param027;
        tree3 = param120;
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
        param026 = tree1.name;
        param119 = tree1.symbolic;
        name2 = param026;
        return name2
      } else {
        if (tree1 instanceof Tree.Underscore.class) {
          return "_"
        } else if (tree1 instanceof Tree.Modified.class) {
          param025 = tree1.modifier;
          param118 = tree1.subject;
          modifier = param025;
          subject = param118;
          tmp11 = go(modifier);
          tmp12 = tmp11 + " ";
          tmp13 = go(subject);
          return tmp12 + tmp13
        } else if (tree1 instanceof Tree.Tuple.class) {
          param024 = tree1.trees;
          trees2 = param024;
          tmp14 = Iter.fromStack(trees2);
          tmp15 = Iter.mapping(tmp14, go);
          tmp16 = Iter.joined(tmp15, ", ");
          tmp17 = "(" + tmp16;
          return tmp17 + ")"
        } else if (tree1 instanceof Tree.Sequence.class) {
          param023 = tree1.trees;
          trees1 = param023;
          tmp18 = Iter.fromStack(trees1);
          tmp19 = Iter.mapping(tmp18, go);
          return Iter.joined(tmp19, "; ")
        } else if (tree1 instanceof Tree.Literal.class) {
          param022 = tree1.kind;
          param117 = tree1.value;
          if (param022 instanceof Token.LiteralKind.String.class) {
            value2 = param117;
            scrut4 = value2.length > 5;
            if (scrut4 === true) {
              tmp20 = value2.slice(0, 5);
              tmp21 = runtime.safeCall(globalThis.JSON.stringify(tmp20));
              tmp22 = - 1;
              tmp23 = tmp21.slice(0, tmp22);
              return tmp23 + "\u2026\""
            } else {
              return runtime.safeCall(globalThis.JSON.stringify(value2))
            }
          } else {
            value1 = param117;
            return value1
          }
        } else if (tree1 instanceof Tree.Match.class) {
          param021 = tree1.scrutinee;
          param116 = tree1.branches;
          scrutinee = param021;
          branches = param116;
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
          param017 = tree1.callee;
          param112 = tree1.argument;
          if (param017 instanceof Tree.Ident.class) {
            param018 = param017.name;
            param113 = param017.symbolic;
            op2 = param018;
            if (param113 === true) {
              if (param112 instanceof Stack.Cons.class) {
                param019 = param112.head;
                param114 = param112.tail;
                lhs2 = param019;
                if (param114 instanceof Stack.Cons.class) {
                  param020 = param114.head;
                  param115 = param114.tail;
                  rhs2 = param020;
                  if (param115 instanceof Stack.Nil.class) {
                    scrut3 = Precedence.opPrec(op2);
                    if (globalThis.Array.isArray(scrut3) && scrut3.length === 2) {
                      first02 = scrut3[0];
                      first12 = scrut3[1];
                      leftPrec1 = first02;
                      rightPrec = first12;
                      lambda = (undefined, function (arg1, arg2) {
                        return arg1 + arg2
                      });
                      tmp30 = runtime.safeCall(Predef.fold(lambda));
                      tmp31 = go(lhs2);
                      tmp32 = prec(lhs2, false);
                      tmp33 = tmp32 < leftPrec1;
                      tmp34 = par(tmp31, tmp33);
                      tmp35 = go(rhs2);
                      tmp36 = prec(rhs2, true);
                      tmp37 = tmp36 < rightPrec;
                      tmp38 = par(tmp35, tmp37);
                      return runtime.safeCall(tmp30(tmp34, " ", op2, " ", tmp38))
                    } else {
                      throw new globalThis.Error("match error");
                    }
                  } else {
                    op1 = param018;
                    arg = param112;
                    tmp39 = go(arg);
                    tmp40 = prec(arg, false);
                    tmp41 = tmp40 <= Precedence.Keywords.prefixPrec;
                    tmp42 = par(tmp39, tmp41);
                    return Predef.mkStr(op1, tmp42)
                  }
                } else {
                  op1 = param018;
                  arg = param112;
                  tmp43 = go(arg);
                  tmp44 = prec(arg, false);
                  tmp45 = tmp44 <= Precedence.Keywords.prefixPrec;
                  tmp46 = par(tmp43, tmp45);
                  return Predef.mkStr(op1, tmp46)
                }
              } else {
                op1 = param018;
                arg = param112;
                tmp47 = go(arg);
                tmp48 = prec(arg, false);
                tmp49 = tmp48 <= Precedence.Keywords.prefixPrec;
                tmp50 = par(tmp47, tmp49);
                return Predef.mkStr(op1, tmp50)
              }
            } else {
              op1 = param018;
              callee = param017;
              argument = param112;
              tmp51 = go(callee);
              tmp52 = go(argument);
              tmp53 = prec(argument, false);
              tmp54 = tmp53 <= Precedence.Keywords.appPrec;
              tmp55 = par(tmp52, tmp54);
              return Predef.mkStr(tmp51, " ", tmp55)
            }
          } else {
            callee = param017;
            argument = param112;
            tmp56 = go(callee);
            tmp57 = go(argument);
            tmp58 = prec(argument, false);
            tmp59 = tmp58 <= Precedence.Keywords.appPrec;
            tmp60 = par(tmp57, tmp59);
            return Predef.mkStr(tmp56, " ", tmp60)
          }
        } else if (tree1 instanceof Tree.Infix.class) {
          param014 = tree1.op;
          param19 = tree1.lhs;
          param23 = tree1.rhs;
          if (param014 instanceof Keyword.Keyword.class) {
            param015 = param014.name;
            param110 = param014.leftPrec;
            param24 = param014.rightPrec;
            if (param015 === ".") {
              target = param19;
              if (param23 instanceof Tree.Ident.class) {
                param016 = param23.name;
                param111 = param23.symbolic;
                field = param016;
                scrut2 = Precedence.opPrec(".");
                if (globalThis.Array.isArray(scrut2) && scrut2.length === 2) {
                  first01 = scrut2[0];
                  first11 = scrut2[1];
                  leftPrec = first01;
                  tmp61 = go(target);
                  tmp62 = prec(target, false);
                  tmp63 = tmp62 < leftPrec;
                  tmp64 = par(tmp61, tmp63);
                  return Predef.mkStr(tmp64, ".", field)
                } else {
                  throw new globalThis.Error("match error");
                }
              } else {
                op = param014;
                lhs1 = param19;
                rhs1 = param23;
                lambda1 = (undefined, function (arg1, arg2) {
                  return arg1 + arg2
                });
                tmp65 = runtime.safeCall(Predef.fold(lambda1));
                tmp66 = go(lhs1);
                tmp67 = go(op);
                tmp68 = go(rhs1);
                return runtime.safeCall(tmp65(tmp66, " ", tmp67, " ", tmp68))
              }
            } else {
              op = param014;
              lhs1 = param19;
              rhs1 = param23;
              lambda2 = (undefined, function (arg1, arg2) {
                return arg1 + arg2
              });
              tmp69 = runtime.safeCall(Predef.fold(lambda2));
              tmp70 = go(lhs1);
              tmp71 = go(op);
              tmp72 = go(rhs1);
              return runtime.safeCall(tmp69(tmp70, " ", tmp71, " ", tmp72))
            }
          } else {
            op = param014;
            lhs1 = param19;
            rhs1 = param23;
            lambda3 = (undefined, function (arg1, arg2) {
              return arg1 + arg2
            });
            tmp73 = runtime.safeCall(Predef.fold(lambda3));
            tmp74 = go(lhs1);
            tmp75 = go(op);
            tmp76 = go(rhs1);
            return runtime.safeCall(tmp73(tmp74, " ", tmp75, " ", tmp76))
          }
        } else if (tree1 instanceof Tree.Define.class) {
          param011 = tree1.kind;
          param17 = tree1.items;
          if (param011 instanceof Tree.DefineKind.Directive.class) {
            if (param17 instanceof Stack.Cons.class) {
              param013 = param17.head;
              param18 = param17.tail;
              if (globalThis.Array.isArray(param013) && param013.length === 2) {
                first0 = param013[0];
                first1 = param013[1];
                name1 = first0;
                value = first1;
                if (param18 instanceof Stack.Nil.class) {
                  tmp77 = go(name1);
                  tmp78 = go(value);
                  return Str.concat("#", tmp77, " ", tmp78)
                } else {
                  kind = param011;
                  items = param17;
                  if (kind instanceof Tree.DefineKind.Let.class) {
                    param012 = kind.recursive;
                    if (param012 === true) {
                      tmp79 = "let rec ";
                    } else if (param012 === false) {
                      tmp79 = "let ";
                    } else {
                      throw new globalThis.Error("match error");
                    }
                  } else if (kind instanceof Tree.DefineKind.Type.class) {
                    tmp79 = "type ";
                  } else if (kind instanceof Tree.DefineKind.Exception.class) {
                    tmp79 = "exception ";
                  } else {
                    throw new globalThis.Error("match error");
                  }
                  tmp80 = Iter.fromStack(items);
                  lambda4 = (undefined, function (caseScrut) {
                    let first13, first03, lhs3, rhs3, tree5, tmp130, tmp131, tmp132;
                    if (caseScrut instanceof Tree.Tree) {
                      tree5 = caseScrut;
                      return go(tree5)
                    } else if (globalThis.Array.isArray(caseScrut) && caseScrut.length === 2) {
                      first03 = caseScrut[0];
                      first13 = caseScrut[1];
                      lhs3 = first03;
                      rhs3 = first13;
                      tmp130 = go(lhs3);
                      tmp131 = tmp130 + " = ";
                      tmp132 = go(rhs3);
                      return tmp131 + tmp132
                    } else {
                      throw new globalThis.Error("match error");
                    }
                  });
                  tmp81 = lambda4;
                  tmp82 = Iter.mapping(tmp80, tmp81);
                  tmp83 = Iter.joined(tmp82, " and ");
                  return Predef.mkStr(tmp79, tmp83)
                }
              } else {
                kind = param011;
                items = param17;
                if (kind instanceof Tree.DefineKind.Let.class) {
                  param012 = kind.recursive;
                  if (param012 === true) {
                    tmp84 = "let rec ";
                  } else if (param012 === false) {
                    tmp84 = "let ";
                  } else {
                    throw new globalThis.Error("match error");
                  }
                } else if (kind instanceof Tree.DefineKind.Type.class) {
                  tmp84 = "type ";
                } else if (kind instanceof Tree.DefineKind.Exception.class) {
                  tmp84 = "exception ";
                } else {
                  throw new globalThis.Error("match error");
                }
                tmp85 = Iter.fromStack(items);
                lambda5 = (undefined, function (caseScrut) {
                  let first13, first03, lhs3, rhs3, tree5, tmp130, tmp131, tmp132;
                  if (caseScrut instanceof Tree.Tree) {
                    tree5 = caseScrut;
                    return go(tree5)
                  } else if (globalThis.Array.isArray(caseScrut) && caseScrut.length === 2) {
                    first03 = caseScrut[0];
                    first13 = caseScrut[1];
                    lhs3 = first03;
                    rhs3 = first13;
                    tmp130 = go(lhs3);
                    tmp131 = tmp130 + " = ";
                    tmp132 = go(rhs3);
                    return tmp131 + tmp132
                  } else {
                    throw new globalThis.Error("match error");
                  }
                });
                tmp86 = lambda5;
                tmp87 = Iter.mapping(tmp85, tmp86);
                tmp88 = Iter.joined(tmp87, " and ");
                return Predef.mkStr(tmp84, tmp88)
              }
            } else {
              kind = param011;
              items = param17;
              if (kind instanceof Tree.DefineKind.Let.class) {
                param012 = kind.recursive;
                if (param012 === true) {
                  tmp89 = "let rec ";
                } else if (param012 === false) {
                  tmp89 = "let ";
                } else {
                  throw new globalThis.Error("match error");
                }
              } else if (kind instanceof Tree.DefineKind.Type.class) {
                tmp89 = "type ";
              } else if (kind instanceof Tree.DefineKind.Exception.class) {
                tmp89 = "exception ";
              } else {
                throw new globalThis.Error("match error");
              }
              tmp90 = Iter.fromStack(items);
              lambda6 = (undefined, function (caseScrut) {
                let first13, first03, lhs3, rhs3, tree5, tmp130, tmp131, tmp132;
                if (caseScrut instanceof Tree.Tree) {
                  tree5 = caseScrut;
                  return go(tree5)
                } else if (globalThis.Array.isArray(caseScrut) && caseScrut.length === 2) {
                  first03 = caseScrut[0];
                  first13 = caseScrut[1];
                  lhs3 = first03;
                  rhs3 = first13;
                  tmp130 = go(lhs3);
                  tmp131 = tmp130 + " = ";
                  tmp132 = go(rhs3);
                  return tmp131 + tmp132
                } else {
                  throw new globalThis.Error("match error");
                }
              });
              tmp91 = lambda6;
              tmp92 = Iter.mapping(tmp90, tmp91);
              tmp93 = Iter.joined(tmp92, " and ");
              return Predef.mkStr(tmp89, tmp93)
            }
          } else {
            kind = param011;
            items = param17;
            if (kind instanceof Tree.DefineKind.Let.class) {
              param012 = kind.recursive;
              if (param012 === true) {
                tmp94 = "let rec ";
              } else if (param012 === false) {
                tmp94 = "let ";
              } else {
                throw new globalThis.Error("match error");
              }
            } else if (kind instanceof Tree.DefineKind.Type.class) {
              tmp94 = "type ";
            } else if (kind instanceof Tree.DefineKind.Exception.class) {
              tmp94 = "exception ";
            } else {
              throw new globalThis.Error("match error");
            }
            tmp95 = Iter.fromStack(items);
            lambda7 = (undefined, function (caseScrut) {
              let first13, first03, lhs3, rhs3, tree5, tmp130, tmp131, tmp132;
              if (caseScrut instanceof Tree.Tree) {
                tree5 = caseScrut;
                return go(tree5)
              } else if (globalThis.Array.isArray(caseScrut) && caseScrut.length === 2) {
                first03 = caseScrut[0];
                first13 = caseScrut[1];
                lhs3 = first03;
                rhs3 = first13;
                tmp130 = go(lhs3);
                tmp131 = tmp130 + " = ";
                tmp132 = go(rhs3);
                return tmp131 + tmp132
              } else {
                throw new globalThis.Error("match error");
              }
            });
            tmp96 = lambda7;
            tmp97 = Iter.mapping(tmp95, tmp96);
            tmp98 = Iter.joined(tmp97, " and ");
            return Predef.mkStr(tmp94, tmp98)
          }
        } else if (tree1 instanceof Tree.LetIn.class) {
          param09 = tree1.bindings;
          param16 = tree1.body;
          bindings = param09;
          body5 = param16;
          tmp99 = Iter.fromStack(bindings);
          tmp100 = Iter.mapping(tmp99, go);
          tmp101 = Iter.joined(tmp100, " and ");
          if (body5 instanceof Option.Some.class) {
            param010 = body5.value;
            body6 = param010;
            tmp102 = go(body6);
            tmp103 = [
              " in ",
              tmp102
            ];
          } else if (body5 instanceof Option.None.class) {
            tmp103 = [];
          } else {
            throw new globalThis.Error("match error");
          }
          return Predef.mkStr("let ", tmp101, ...tmp103)
        } else {
          if (tree1 instanceof Tree.While.class) {
            param08 = tree1.cond;
            param15 = tree1.body;
            cond = param08;
            body4 = param15;
            tmp104 = go(cond);
            tmp105 = go(body4);
            return Predef.mkStr("while ", tmp104, " do ", tmp105, " done")
          } else if (tree1 instanceof Tree.For.class) {
            param07 = tree1.head;
            param14 = tree1.start;
            param22 = tree1.end;
            param31 = tree1.body;
            head = param07;
            start = param14;
            end = param22;
            body3 = param31;
            tmp106 = go(head);
            tmp107 = go(start);
            tmp108 = go(end);
            tmp109 = go(body3);
            return Predef.mkStr("for ", tmp106, " = ", tmp107, " to ", tmp108, " do ", tmp109, " done")
          } else if (tree1 instanceof Tree.Ternary.class) {
            param04 = tree1.keyword;
            param13 = tree1.lhs;
            param21 = tree1.rhs;
            param3 = tree1.body;
            keyword = param04;
            lhs = param13;
            rhs = param21;
            body1 = param3;
            lambda8 = (undefined, function (arg1, arg2) {
              return arg1 + arg2
            });
            tmp110 = runtime.safeCall(Predef.fold(lambda8));
            tmp111 = go(lhs);
            scrut = keyword.name;
            if (scrut === "if") {
              tmp112 = " then ";
            } else if (scrut === "type") {
              tmp112 = " = ";
            } else if (scrut === "let") {
              tmp112 = " = ";
            } else {
              throw new globalThis.Error("match error");
            }
            if (rhs instanceof Option.Some.class) {
              param05 = rhs.value;
              rhs$_ = param05;
              tmp113 = go(rhs$_);
            } else {
              tmp113 = go(rhs);
            }
            scrut1 = keyword.name;
            if (scrut1 === "if") {
              tmp114 = " then ";
            } else if (scrut1 === "type") {
              tmp114 = "";
            } else if (scrut1 === "let") {
              tmp114 = " in ";
            } else {
              throw new globalThis.Error("match error");
            }
            if (body1 instanceof Option.Some.class) {
              param06 = body1.value;
              body2 = param06;
              tmp115 = go(body2);
            } else {
              tmp115 = go(body1);
            }
            return runtime.safeCall(tmp110(keyword.name, " ", tmp111, tmp112, tmp113, tmp114, tmp115))
          } else if (tree1 instanceof Tree.Lambda.class) {
            param03 = tree1.params;
            param12 = tree1.body;
            params = param03;
            body = param12;
            lambda9 = (undefined, function (arg1, arg2) {
              return arg1 + arg2
            });
            tmp116 = runtime.safeCall(Predef.fold(lambda9));
            tmp117 = Iter.fromStack(params);
            tmp118 = Iter.mapping(tmp117, go);
            tmp119 = Iter.joined(tmp118, " ");
            tmp120 = go(body);
            return runtime.safeCall(tmp116("fun ", tmp119, " -> ", tmp120))
          } else if (tree1 instanceof Keyword.Keyword.class) {
            param02 = tree1.name;
            param11 = tree1.leftPrec;
            param2 = tree1.rightPrec;
            name = param02;
            return name
          } else if (tree1 instanceof Option.Some.class) {
            param01 = tree1.value;
            tree2 = param01;
            tmp121 = wrap(tree2);
            tmp122 = "Some(" + tmp121;
            return tmp122 + ")"
          } else if (tree1 instanceof Option.None.class) {
            return "None"
          } else if (tree1 instanceof Stack.Cons.class) {
            param0 = tree1.head;
            param1 = tree1.tail;
            tmp123 = Iter.fromStack(tree1);
            tmp124 = Iter.mapping(tmp123, wrap);
            tmp125 = Iter.joined(tmp124, " :: ");
            return tmp125 + " :: Nil"
          } else if (tree1 instanceof Stack.Nil.class) {
            return "Nil"
          } else if (globalThis.Array.isArray(tree1) && tree1.length >= 0) {
            rest = runtime.safeCall(globalThis.Predef.tupleSlice(tree1, 0, 0));
            trees = rest;
            lambda10 = (undefined, function (tree5, _, _1) {
              return wrap(tree5)
            });
            tmp126 = runtime.safeCall(trees.map(lambda10));
            tmp127 = runtime.safeCall(tmp126.join(", "));
            tmp128 = "[" + tmp127;
            return tmp128 + "]"
          } else {
            tmp129 = "<unexpected:" + tree1;
            return tmp129 + ">"
          }
        }
      }
    };
    return wrap(tree)
  } 
  static infix(op) {
    return (lhs, rhs) => {
      return Tree.Infix(op, lhs, rhs)
    }
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
  static nonEmpty(tree5) {
    let param0, param1;
    if (tree5 instanceof Tree.Empty.class) {
      return false
    } else if (tree5 instanceof Tree.Error.class) {
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
  static nonEmptyError(tree6) {
    let param0, param1;
    if (tree6 instanceof Tree.Error.class) {
      param0 = tree6.tree;
      param1 = tree6.message;
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
});
let Tree = Tree2; export default Tree;
