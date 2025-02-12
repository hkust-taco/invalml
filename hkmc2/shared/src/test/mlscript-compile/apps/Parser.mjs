import runtime from "./../Runtime.mjs";
import Predef from "./../Predef.mjs";
import Option from "./../Option.mjs";
import Stack from "./../Stack.mjs";
import Map from "./../Map.mjs";
import TreeTracer from "./../TreeTracer.mjs";
import Lexer from "./Lexer.mjs";
let Parser1;
Parser1 = class Parser {
  static #INT_MIN;
  static #INT_MAX;
  static #precMap;
  static #appPrec;
  static #prefixPrec;
  static #letChoice;
  static {
    let scrut, param0, prec, tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18;
    tmp = - 2147483648;
    Parser.#INT_MIN = tmp;
    Parser.#INT_MAX = 2147483647;
    tmp1 = new Map.Map();
    this.keywords = tmp1;
    this.Keyword = function Keyword(name1, leftPrec1, rightPrec1) { return new Keyword.class(name1, leftPrec1, rightPrec1); };
    this.Keyword.class = class Keyword {
      constructor(name, leftPrec, rightPrec) {
        this.name = name;
        this.leftPrec = leftPrec;
        this.rightPrec = rightPrec;
        let tmp19;
        tmp19 = Parser.keywords.insert(this.name, this);
      }
      get leftPrecOrMin() {
        let scrut1, param01, prec1;
        scrut1 = this.leftPrec;
        if (scrut1 instanceof Option.Some.class) {
          param01 = scrut1.value;
          prec1 = param01;
          return prec1
        } else {
          return Parser.#INT_MIN
        }
      } 
      get rightPrecOrMin() {
        let scrut1, param01, prec1;
        scrut1 = this.rightPrec;
        if (scrut1 instanceof Option.Some.class) {
          param01 = scrut1.value;
          prec1 = param01;
          return prec1
        } else {
          return Parser.#INT_MIN
        }
      } 
      toString() {
        let scrut1, param01, prec1, scrut2, param02, prec2, tmp19, tmp20, tmp21;
        tmp19 = Predef.fold((arg1, arg2) => {
          return arg1 + arg2
        });
        scrut1 = this.leftPrec;
        if (scrut1 instanceof Option.Some.class) {
          param01 = scrut1.value;
          prec1 = param01;
          tmp20 = runtime.safeCall(prec1.toString());
        } else {
          tmp20 = "N/A";
        }
        scrut2 = this.rightPrec;
        if (scrut2 instanceof Option.Some.class) {
          param02 = scrut2.value;
          prec2 = param02;
          tmp21 = runtime.safeCall(prec2.toString());
        } else {
          tmp21 = "N/A";
        }
        return runtime.safeCall(tmp19("Keyword(`", this.name, "`, ", tmp20, ", ", tmp21, ")"))
      }
    };
    this.Keywords = class Keywords {
      static #prec;
      static #basePrec;
      static #semiPrec;
      static #commaPrec;
      static #eqPrec;
      static #ascPrec;
      static #thenPrec;
      static {
        let tmp19, tmp20, tmp21, tmp22, tmp23, tmp24, tmp25, tmp26, tmp27, tmp28, tmp29, tmp30, tmp31, tmp32, tmp33, tmp34, tmp35, tmp36, tmp37, tmp38, tmp39, tmp40, tmp41, tmp42, tmp43;
        Keywords.#prec = 0;
        Keywords.#basePrec = Keywords.currPrec;
        tmp19 = Parser.Keyword("class", Option.None, Keywords.#basePrec);
        this._class = tmp19;
        tmp20 = Parser.Keyword("begin", Option.None, Keywords.#basePrec);
        this._begin = tmp20;
        tmp21 = Parser.Keyword("end", Keywords.#basePrec, Option.None);
        this._end = tmp21;
        Keywords.#semiPrec = Keywords.nextPrec;
        Keywords.#commaPrec = Keywords.nextPrec;
        tmp22 = Parser.Keyword(";", Keywords.#semiPrec, Keywords.#basePrec);
        this._semicolon = tmp22;
        tmp23 = Parser.Keyword(",", Keywords.#commaPrec, Keywords.#semiPrec);
        this._comma = tmp23;
        Keywords.#eqPrec = Keywords.nextPrec;
        Keywords.#ascPrec = Keywords.nextPrec;
        tmp24 = Parser.Keyword("=", Keywords.#eqPrec, Keywords.#eqPrec);
        this._equal = tmp24;
        tmp25 = Parser.Keyword("|", Option.None, Keywords.currPrec);
        this._bar = tmp25;
        tmp26 = Parser.Keyword(":", Keywords.#ascPrec, Keywords.#eqPrec);
        this._colon = tmp26;
        tmp27 = Parser.Keyword("match", Option.None, Keywords.currPrec);
        this._match = tmp27;
        tmp28 = Parser.Keyword("if", Option.None, Keywords.currPrec);
        this._if = tmp28;
        tmp29 = Parser.Keyword("with", Option.None, Keywords.currPrec);
        this._with = tmp29;
        tmp30 = Parser.Keyword("case", Option.None, Keywords.currPrec);
        this._case = tmp30;
        Keywords.#thenPrec = Keywords.nextPrec;
        tmp31 = Parser.Keyword("then", Keywords.#thenPrec, Keywords.#thenPrec);
        this._then = tmp31;
        tmp32 = Parser.Keyword("do", Keywords.#thenPrec, Keywords.#thenPrec);
        this._do = tmp32;
        tmp33 = Parser.Keyword("else", Keywords.nextPrec, Keywords.currPrec);
        this._else = tmp33;
        tmp34 = Parser.Keyword("let", Keywords.nextPrec, Keywords.currPrec);
        this._let = tmp34;
        tmp35 = Parser.Keyword("in", Keywords.#thenPrec, Keywords.#thenPrec);
        this._in = tmp35;
        tmp36 = Parser.Keyword("true", Option.None, Option.None);
        this._true = tmp36;
        tmp37 = Parser.Keyword("false", Option.None, Option.None);
        this._false = tmp37;
        tmp38 = Parser.Keyword("->", Keywords.currPrec, Keywords.#eqPrec);
        this._thinArrow = tmp38;
        tmp39 = Parser.Keyword("fun", Keywords.currPrec, Option.None);
        this._fun = tmp39;
        tmp40 = Parser.Keyword("function", Keywords.currPrec, Option.None);
        this._function = tmp40;
        tmp41 = Parser.Keyword("type", Keywords.currPrec, Option.None);
        this._type = tmp41;
        tmp42 = Parser.Keyword("rec", Option.None, Option.None);
        this._rec = tmp42;
        tmp43 = Parser.Keyword("_", Option.None, Option.None);
        this._underscore = tmp43;
        this.maxPrec = Keywords.#prec;
      }
      static get currPrec() {
        return Option.Some(Keywords.#prec);
      } 
      static get nextPrec() {
        let tmp19;
        tmp19 = Keywords.#prec + 1;
        Keywords.#prec = tmp19;
        return Option.Some(Keywords.#prec);
      }
      static toString() { return "Keywords"; }
    };
    tmp2 = Parser.makePrecMap(",", "@", ":", "|", "&", "=", "/ \\", "^", "!", "< >", "+ -", "* %", "~", "", "", ".");
    Parser.#precMap = tmp2;
    scrut = runtime.safeCall(Parser.#precMap.get("."));
    if (scrut instanceof Option.Some.class) {
      param0 = scrut.value;
      prec = param0;
      tmp3 = prec - 1;
    } else {
      throw new globalThis.Error("match error");
    }
    Parser.#appPrec = tmp3;
    tmp4 = Parser.#appPrec - 1;
    Parser.#prefixPrec = tmp4;
    const Letter$class = class Letter {
      constructor() {}
      unapply(scrut1) {
        let gtLo, ltHi, gtLo1, ltHi1;
        gtLo = "a" <= scrut1;
        if (gtLo === true) {
          ltHi = scrut1 <= "z";
          if (ltHi === true) {
            return runtime.safeCall(globalThis.Predef.MatchResult([]))
          } else {
            gtLo1 = "A" <= scrut1;
            if (gtLo1 === true) {
              ltHi1 = scrut1 <= "Z";
              if (ltHi1 === true) {
                return runtime.safeCall(globalThis.Predef.MatchResult([]))
              } else {
                return runtime.safeCall(globalThis.Predef.MatchFailure())
              }
            } else {
              return runtime.safeCall(globalThis.Predef.MatchFailure())
            }
          }
        } else {
          gtLo1 = "A" <= scrut1;
          if (gtLo1 === true) {
            ltHi1 = scrut1 <= "Z";
            if (ltHi1 === true) {
              return runtime.safeCall(globalThis.Predef.MatchResult([]))
            } else {
              return runtime.safeCall(globalThis.Predef.MatchFailure())
            }
          } else {
            return runtime.safeCall(globalThis.Predef.MatchFailure())
          }
        }
      } 
      unapplyStringPrefix(topic) {
        let emptyTest, head, tail, gtLo, ltHi, emptyTest1, head1, tail1, gtLo1, ltHi1;
        emptyTest = topic == "";
        if (emptyTest === true) {
          return runtime.safeCall(globalThis.Predef.MatchFailure())
        } else {
          head = globalThis.Predef.stringGet(topic, 0);
          tail = globalThis.Predef.stringDrop(topic, 1);
          gtLo = "a" <= head;
          if (gtLo === true) {
            ltHi = head <= "z";
            if (ltHi === true) {
              return runtime.safeCall(globalThis.Predef.MatchResult([
                tail
              ]))
            } else {
              emptyTest1 = topic == "";
              if (emptyTest1 === true) {
                return runtime.safeCall(globalThis.Predef.MatchFailure())
              } else {
                head1 = globalThis.Predef.stringGet(topic, 0);
                tail1 = globalThis.Predef.stringDrop(topic, 1);
                gtLo1 = "A" <= head1;
                if (gtLo1 === true) {
                  ltHi1 = head1 <= "Z";
                  if (ltHi1 === true) {
                    return runtime.safeCall(globalThis.Predef.MatchResult([
                      tail1
                    ]))
                  } else {
                    return runtime.safeCall(globalThis.Predef.MatchFailure())
                  }
                } else {
                  return runtime.safeCall(globalThis.Predef.MatchFailure())
                }
              }
            }
          } else {
            emptyTest1 = topic == "";
            if (emptyTest1 === true) {
              return runtime.safeCall(globalThis.Predef.MatchFailure())
            } else {
              head1 = globalThis.Predef.stringGet(topic, 0);
              tail1 = globalThis.Predef.stringDrop(topic, 1);
              gtLo1 = "A" <= head1;
              if (gtLo1 === true) {
                ltHi1 = head1 <= "Z";
                if (ltHi1 === true) {
                  return runtime.safeCall(globalThis.Predef.MatchResult([
                    tail1
                  ]))
                } else {
                  return runtime.safeCall(globalThis.Predef.MatchFailure())
                }
              } else {
                return runtime.safeCall(globalThis.Predef.MatchFailure())
              }
            }
          }
        }
      }
      toString() { return "Letter"; }
    };
    this.Letter = new Letter$class;
    this.Letter.class = Letter$class;
    const FloatOperator$class = class FloatOperator {
      constructor() {}
      unapply(scrut1) {
        if (scrut1 === "+.") {
          return runtime.safeCall(globalThis.Predef.MatchResult([]))
        } else if (scrut1 === "-.") {
          return runtime.safeCall(globalThis.Predef.MatchResult([]))
        } else if (scrut1 === "*.") {
          return runtime.safeCall(globalThis.Predef.MatchResult([]))
        } else if (scrut1 === "/.") {
          return runtime.safeCall(globalThis.Predef.MatchResult([]))
        } else {
          return runtime.safeCall(globalThis.Predef.MatchFailure())
        }
      } 
      unapplyStringPrefix(topic) {
        let cond, sliced, cond1, sliced1, cond2, sliced2, cond3, sliced3;
        cond = globalThis.Predef.stringStartsWith(topic, "+.");
        if (cond === true) {
          sliced = globalThis.Predef.stringDrop(topic, 2);
          return runtime.safeCall(globalThis.Predef.MatchResult([
            sliced
          ]))
        } else {
          cond1 = globalThis.Predef.stringStartsWith(topic, "-.");
          if (cond1 === true) {
            sliced1 = globalThis.Predef.stringDrop(topic, 2);
            return runtime.safeCall(globalThis.Predef.MatchResult([
              sliced1
            ]))
          } else {
            cond2 = globalThis.Predef.stringStartsWith(topic, "*.");
            if (cond2 === true) {
              sliced2 = globalThis.Predef.stringDrop(topic, 2);
              return runtime.safeCall(globalThis.Predef.MatchResult([
                sliced2
              ]))
            } else {
              cond3 = globalThis.Predef.stringStartsWith(topic, "/.");
              if (cond3 === true) {
                sliced3 = globalThis.Predef.stringDrop(topic, 2);
                return runtime.safeCall(globalThis.Predef.MatchResult([
                  sliced3
                ]))
              } else {
                return runtime.safeCall(globalThis.Predef.MatchFailure())
              }
            }
          }
        }
      }
      toString() { return "FloatOperator"; }
    };
    this.FloatOperator = new FloatOperator$class;
    this.FloatOperator.class = FloatOperator$class;
    const RightAssociative$class = class RightAssociative {
      constructor() {}
      unapply(scrut1) {
        if (scrut1 === "@") {
          return runtime.safeCall(globalThis.Predef.MatchResult([]))
        } else if (scrut1 === "/") {
          return runtime.safeCall(globalThis.Predef.MatchResult([]))
        } else if (scrut1 === ",") {
          return runtime.safeCall(globalThis.Predef.MatchResult([]))
        } else if (scrut1 === ":") {
          return runtime.safeCall(globalThis.Predef.MatchResult([]))
        } else {
          return runtime.safeCall(globalThis.Predef.MatchFailure())
        }
      } 
      unapplyStringPrefix(topic) {
        let cond, sliced, cond1, sliced1, cond2, sliced2, cond3, sliced3;
        cond = globalThis.Predef.stringStartsWith(topic, "@");
        if (cond === true) {
          sliced = globalThis.Predef.stringDrop(topic, 1);
          return runtime.safeCall(globalThis.Predef.MatchResult([
            sliced
          ]))
        } else {
          cond1 = globalThis.Predef.stringStartsWith(topic, "/");
          if (cond1 === true) {
            sliced1 = globalThis.Predef.stringDrop(topic, 1);
            return runtime.safeCall(globalThis.Predef.MatchResult([
              sliced1
            ]))
          } else {
            cond2 = globalThis.Predef.stringStartsWith(topic, ",");
            if (cond2 === true) {
              sliced2 = globalThis.Predef.stringDrop(topic, 1);
              return runtime.safeCall(globalThis.Predef.MatchResult([
                sliced2
              ]))
            } else {
              cond3 = globalThis.Predef.stringStartsWith(topic, ":");
              if (cond3 === true) {
                sliced3 = globalThis.Predef.stringDrop(topic, 1);
                return runtime.safeCall(globalThis.Predef.MatchResult([
                  sliced3
                ]))
              } else {
                return runtime.safeCall(globalThis.Predef.MatchFailure())
              }
            }
          }
        }
      }
      toString() { return "RightAssociative"; }
    };
    this.RightAssociative = new RightAssociative$class;
    this.RightAssociative.class = RightAssociative$class;
    this.Tree = class Tree {
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
        let par, prec1, go, wrap;
        par = function par(text, cond) {
          let tmp19;
          if (cond === true) {
            tmp19 = "(" + text;
            return tmp19 + ")"
          } else {
            return text
          }
        };
        prec1 = function prec(tree1, side) {
          let param01, param1, param2, op, param02, param11, callee, param03, param12, op1, scrut1, first1, first0, leftPrec, rightPrec, param04, param13, tree2;
          if (tree1 instanceof Tree.Empty.class) {
            return Parser.#INT_MAX
          } else if (tree1 instanceof Tree.Error.class) {
            param04 = tree1.tree;
            param13 = tree1.message;
            tree2 = param04;
            return prec1(tree2, side)
          } else {
            if (tree1 instanceof Tree.Ident.class) {
              return Parser.#INT_MAX
            } else if (tree1 instanceof Tree.Underscore.class) {
              return Parser.#INT_MAX
            } else if (tree1 instanceof Tree.Modified.class) {
              return 1
            } else if (tree1 instanceof Tree.Tuple.class) {
              return Parser.#INT_MAX
            } else if (tree1 instanceof Tree.Sequence.class) {
              return 1
            } else if (tree1 instanceof Tree.Literal.class) {
              return Parser.#INT_MAX
            } else if (tree1 instanceof Tree.Match.class) {
              return 2
            } else if (tree1 instanceof Tree.App.class) {
              param02 = tree1.callee;
              param11 = tree1.arguments;
              callee = param02;
              if (callee instanceof Tree.Ident.class) {
                param03 = callee.name;
                param12 = callee.symbolic;
                op1 = param03;
                if (param12 === true) {
                  scrut1 = Parser.opPrec(op1);
                  if (globalThis.Array.isArray(scrut1) && scrut1.length === 2) {
                    first0 = scrut1[0];
                    first1 = scrut1[1];
                    leftPrec = first0;
                    rightPrec = first1;
                    if (side === true) {
                      return rightPrec
                    } else {
                      return leftPrec
                    }
                  } else {
                    return Parser.#appPrec
                  }
                } else {
                  return Parser.#appPrec
                }
              } else {
                return Parser.#appPrec
              }
            } else if (tree1 instanceof Tree.Infix.class) {
              param01 = tree1.op;
              param1 = tree1.lhs;
              param2 = tree1.rhs;
              op = param01;
              if (side === true) {
                return Parser.orMaxPrec(op.rightPrec)
              } else {
                return Parser.orMaxPrec(op.leftPrec)
              }
            } else if (tree1 instanceof Tree.Ternary.class) {
              return 3
            } else {
              throw new globalThis.Error("match error");
            }
          }
        };
        wrap = function wrap(something) {
          let tmp19, tmp20;
          if (something instanceof Tree.Tree) {
            tmp19 = go(something);
            tmp20 = "{" + tmp19;
            return tmp20 + "}"
          } else {
            return go(something)
          }
        };
        go = function go(tree1) {
          let rest, trees, param01, param1, param02, tree2, param03, param11, param2, name, param04, param12, params, body, param05, param13, param21, param3, keyword, lhs, rhs, body1, scrut1, param06, rhs$_, scrut2, param07, body2, param08, param14, param22, op, lhs1, rhs1, param09, param15, callee, arguments1, param010, param16, op1, param011, param17, lhs2, param012, param18, rhs2, scrut3, first1, first0, leftPrec, rightPrec, target, param013, param19, field, scrut4, first11, first01, leftPrec1, param014, param110, scrutinee, branches, param015, param111, value, value1, scrut5, param016, trees1, param017, trees2, param018, param112, modifier, subject, param019, param113, name1, param020, param114, tree3, tmp19, tmp20, tmp21, tmp22, tmp23, tmp24, tmp25, tmp26, tmp27, tmp28, tmp29, tmp30, tmp31, tmp32, tmp33, tmp34, tmp35, tmp36, tmp37, tmp38, tmp39, tmp40, tmp41, tmp42, tmp43, tmp44, tmp45, tmp46, tmp47, tmp48, tmp49, tmp50, tmp51, tmp52, tmp53, tmp54, tmp55, tmp56, tmp57, tmp58, tmp59, tmp60, tmp61, tmp62, tmp63, tmp64, tmp65, tmp66, tmp67, tmp68, tmp69, tmp70, tmp71, tmp72, tmp73, tmp74, tmp75, tmp76, tmp77, tmp78, tmp79, tmp80, tmp81, tmp82, tmp83, tmp84, tmp85, tmp86, tmp87, tmp88, tmp89, tmp90, tmp91, tmp92, tmp93, tmp94, tmp95, tmp96, tmp97, tmp98, tmp99, tmp100, tmp101, tmp102, tmp103, tmp104, tmp105, tmp106, tmp107, tmp108, tmp109, tmp110, tmp111, tmp112, tmp113, tmp114;
          if (tree1 instanceof Tree.Empty.class) {
            return ""
          } else if (tree1 instanceof Tree.Error.class) {
            param020 = tree1.tree;
            param114 = tree1.message;
            if (param020 instanceof Tree.Empty.class) {
              return "\u26A0"
            } else {
              tree3 = param020;
              tmp19 = go(tree3);
              tmp20 = "<\u26A0:" + tmp19;
              return tmp20 + ">"
            }
          } else if (tree1 instanceof Tree.Ident.class) {
            param019 = tree1.name;
            param113 = tree1.symbolic;
            name1 = param019;
            return name1
          } else if (tree1 instanceof Tree.Underscore.class) {
            return "_"
          } else if (tree1 instanceof Tree.Modified.class) {
            param018 = tree1.modifier;
            param112 = tree1.subject;
            modifier = param018;
            subject = param112;
            tmp21 = go(modifier);
            tmp22 = tmp21 + " ";
            tmp23 = go(subject);
            return tmp22 + tmp23
          } else if (tree1 instanceof Tree.Tuple.class) {
            param017 = tree1.trees;
            trees2 = param017;
            tmp24 = Parser.mapJoin(trees2, go, ", ");
            tmp25 = "(" + tmp24;
            return tmp25 + ")"
          } else if (tree1 instanceof Tree.Sequence.class) {
            param016 = tree1.trees;
            trees1 = param016;
            return Parser.mapJoin(trees1, go, "; ")
          } else if (tree1 instanceof Tree.Literal.class) {
            param015 = tree1.kind;
            param111 = tree1.value;
            if (param015 instanceof Lexer.LiteralKind.String.class) {
              value1 = param111;
              scrut5 = value1.length > 5;
              if (scrut5 === true) {
                tmp26 = value1.slice(0, 5);
                tmp27 = runtime.safeCall(globalThis.JSON.stringify(tmp26));
                tmp28 = - 1;
                tmp29 = tmp27.slice(0, tmp28);
                return tmp29 + "\u2026\""
              } else {
                return runtime.safeCall(globalThis.JSON.stringify(value1))
              }
            } else {
              value = param111;
              return value
            }
          } else if (tree1 instanceof Tree.Match.class) {
            param014 = tree1.scrutinee;
            param110 = tree1.branches;
            scrutinee = param014;
            branches = param110;
            tmp30 = Predef.fold((arg1, arg2) => {
              return arg1 + arg2
            });
            tmp31 = go(scrutinee);
            tmp32 = Parser.mapJoin(branches, go, " | ");
            return runtime.safeCall(tmp30("match ", tmp31, " with ", tmp32))
          } else {
            if (tree1 instanceof Tree.App.class) {
              param09 = tree1.callee;
              param15 = tree1.arguments;
              if (param09 instanceof Tree.Ident.class) {
                param010 = param09.name;
                param16 = param09.symbolic;
                if (param010 === ".") {
                  if (param15 instanceof Stack.Cons.class) {
                    param011 = param15.head;
                    param17 = param15.tail;
                    target = param011;
                    if (param17 instanceof Stack.Cons.class) {
                      param012 = param17.head;
                      param18 = param17.tail;
                      if (param012 instanceof Tree.Ident.class) {
                        param013 = param012.name;
                        param19 = param012.symbolic;
                        field = param013;
                        if (param18 instanceof Stack.Nil.class) {
                          scrut4 = Parser.opPrec(".");
                          if (globalThis.Array.isArray(scrut4) && scrut4.length === 2) {
                            first01 = scrut4[0];
                            first11 = scrut4[1];
                            leftPrec1 = first01;
                            tmp33 = Predef.fold((arg1, arg2) => {
                              return arg1 + arg2
                            });
                            tmp34 = go(target);
                            tmp35 = prec1(target, false);
                            tmp36 = tmp35 < leftPrec1;
                            tmp37 = par(tmp34, tmp36);
                            return runtime.safeCall(tmp33(tmp37, ".", field))
                          } else {
                            throw new globalThis.Error("match error");
                          }
                        } else {
                          op1 = param010;
                          if (param16 === true) {
                            lhs2 = param011;
                            rhs2 = param012;
                            callee = param09;
                            arguments1 = param15;
                            tmp38 = Predef.fold((arg1, arg2) => {
                              return arg1 + arg2
                            });
                            tmp39 = go(callee);
                            tmp40 = Parser.mapJoin(arguments1, go, ",");
                            return runtime.safeCall(tmp38(tmp39, "(", tmp40, ")"))
                          } else {
                            callee = param09;
                            arguments1 = param15;
                            tmp41 = Predef.fold((arg1, arg2) => {
                              return arg1 + arg2
                            });
                            tmp42 = go(callee);
                            tmp43 = Parser.mapJoin(arguments1, go, ",");
                            return runtime.safeCall(tmp41(tmp42, "(", tmp43, ")"))
                          }
                        }
                      } else {
                        op1 = param010;
                        if (param16 === true) {
                          lhs2 = param011;
                          rhs2 = param012;
                          if (param18 instanceof Stack.Nil.class) {
                            scrut3 = Parser.opPrec(op1);
                            if (globalThis.Array.isArray(scrut3) && scrut3.length === 2) {
                              first0 = scrut3[0];
                              first1 = scrut3[1];
                              leftPrec = first0;
                              rightPrec = first1;
                              tmp44 = Predef.fold((arg1, arg2) => {
                                return arg1 + arg2
                              });
                              tmp45 = go(lhs2);
                              tmp46 = prec1(lhs2, false);
                              tmp47 = tmp46 < leftPrec;
                              tmp48 = par(tmp45, tmp47);
                              tmp49 = go(rhs2);
                              tmp50 = prec1(rhs2, true);
                              tmp51 = tmp50 < rightPrec;
                              tmp52 = par(tmp49, tmp51);
                              return runtime.safeCall(tmp44(tmp48, " ", op1, " ", tmp52))
                            } else {
                              throw new globalThis.Error("match error");
                            }
                          } else {
                            callee = param09;
                            arguments1 = param15;
                            tmp53 = Predef.fold((arg1, arg2) => {
                              return arg1 + arg2
                            });
                            tmp54 = go(callee);
                            tmp55 = Parser.mapJoin(arguments1, go, ",");
                            return runtime.safeCall(tmp53(tmp54, "(", tmp55, ")"))
                          }
                        } else {
                          callee = param09;
                          arguments1 = param15;
                          tmp56 = Predef.fold((arg1, arg2) => {
                            return arg1 + arg2
                          });
                          tmp57 = go(callee);
                          tmp58 = Parser.mapJoin(arguments1, go, ",");
                          return runtime.safeCall(tmp56(tmp57, "(", tmp58, ")"))
                        }
                      }
                    } else {
                      op1 = param010;
                      if (param16 === true) {
                        lhs2 = param011;
                        callee = param09;
                        arguments1 = param15;
                        tmp59 = Predef.fold((arg1, arg2) => {
                          return arg1 + arg2
                        });
                        tmp60 = go(callee);
                        tmp61 = Parser.mapJoin(arguments1, go, ",");
                        return runtime.safeCall(tmp59(tmp60, "(", tmp61, ")"))
                      } else {
                        callee = param09;
                        arguments1 = param15;
                        tmp62 = Predef.fold((arg1, arg2) => {
                          return arg1 + arg2
                        });
                        tmp63 = go(callee);
                        tmp64 = Parser.mapJoin(arguments1, go, ",");
                        return runtime.safeCall(tmp62(tmp63, "(", tmp64, ")"))
                      }
                    }
                  } else {
                    op1 = param010;
                    if (param16 === true) {
                      callee = param09;
                      arguments1 = param15;
                      tmp65 = Predef.fold((arg1, arg2) => {
                        return arg1 + arg2
                      });
                      tmp66 = go(callee);
                      tmp67 = Parser.mapJoin(arguments1, go, ",");
                      return runtime.safeCall(tmp65(tmp66, "(", tmp67, ")"))
                    } else {
                      callee = param09;
                      arguments1 = param15;
                      tmp68 = Predef.fold((arg1, arg2) => {
                        return arg1 + arg2
                      });
                      tmp69 = go(callee);
                      tmp70 = Parser.mapJoin(arguments1, go, ",");
                      return runtime.safeCall(tmp68(tmp69, "(", tmp70, ")"))
                    }
                  }
                } else {
                  op1 = param010;
                  if (param16 === true) {
                    if (param15 instanceof Stack.Cons.class) {
                      param011 = param15.head;
                      param17 = param15.tail;
                      lhs2 = param011;
                      if (param17 instanceof Stack.Cons.class) {
                        param012 = param17.head;
                        param18 = param17.tail;
                        rhs2 = param012;
                        if (param18 instanceof Stack.Nil.class) {
                          scrut3 = Parser.opPrec(op1);
                          if (globalThis.Array.isArray(scrut3) && scrut3.length === 2) {
                            first0 = scrut3[0];
                            first1 = scrut3[1];
                            leftPrec = first0;
                            rightPrec = first1;
                            tmp71 = Predef.fold((arg1, arg2) => {
                              return arg1 + arg2
                            });
                            tmp72 = go(lhs2);
                            tmp73 = prec1(lhs2, false);
                            tmp74 = tmp73 < leftPrec;
                            tmp75 = par(tmp72, tmp74);
                            tmp76 = go(rhs2);
                            tmp77 = prec1(rhs2, true);
                            tmp78 = tmp77 < rightPrec;
                            tmp79 = par(tmp76, tmp78);
                            return runtime.safeCall(tmp71(tmp75, " ", op1, " ", tmp79))
                          } else {
                            throw new globalThis.Error("match error");
                          }
                        } else {
                          callee = param09;
                          arguments1 = param15;
                          tmp80 = Predef.fold((arg1, arg2) => {
                            return arg1 + arg2
                          });
                          tmp81 = go(callee);
                          tmp82 = Parser.mapJoin(arguments1, go, ",");
                          return runtime.safeCall(tmp80(tmp81, "(", tmp82, ")"))
                        }
                      } else {
                        callee = param09;
                        arguments1 = param15;
                        tmp83 = Predef.fold((arg1, arg2) => {
                          return arg1 + arg2
                        });
                        tmp84 = go(callee);
                        tmp85 = Parser.mapJoin(arguments1, go, ",");
                        return runtime.safeCall(tmp83(tmp84, "(", tmp85, ")"))
                      }
                    } else {
                      callee = param09;
                      arguments1 = param15;
                      tmp86 = Predef.fold((arg1, arg2) => {
                        return arg1 + arg2
                      });
                      tmp87 = go(callee);
                      tmp88 = Parser.mapJoin(arguments1, go, ",");
                      return runtime.safeCall(tmp86(tmp87, "(", tmp88, ")"))
                    }
                  } else {
                    callee = param09;
                    arguments1 = param15;
                    tmp89 = Predef.fold((arg1, arg2) => {
                      return arg1 + arg2
                    });
                    tmp90 = go(callee);
                    tmp91 = Parser.mapJoin(arguments1, go, ",");
                    return runtime.safeCall(tmp89(tmp90, "(", tmp91, ")"))
                  }
                }
              } else {
                callee = param09;
                arguments1 = param15;
                tmp92 = Predef.fold((arg1, arg2) => {
                  return arg1 + arg2
                });
                tmp93 = go(callee);
                tmp94 = Parser.mapJoin(arguments1, go, ",");
                return runtime.safeCall(tmp92(tmp93, "(", tmp94, ")"))
              }
            } else if (tree1 instanceof Tree.Infix.class) {
              param08 = tree1.op;
              param14 = tree1.lhs;
              param22 = tree1.rhs;
              op = param08;
              lhs1 = param14;
              rhs1 = param22;
              tmp95 = Predef.fold((arg1, arg2) => {
                return arg1 + arg2
              });
              tmp96 = go(lhs1);
              tmp97 = go(op);
              tmp98 = go(rhs1);
              return runtime.safeCall(tmp95(tmp96, " ", tmp97, " ", tmp98))
            } else if (tree1 instanceof Tree.Ternary.class) {
              param05 = tree1.keyword;
              param13 = tree1.lhs;
              param21 = tree1.rhs;
              param3 = tree1.body;
              keyword = param05;
              lhs = param13;
              rhs = param21;
              body1 = param3;
              tmp99 = Predef.fold((arg1, arg2) => {
                return arg1 + arg2
              });
              tmp100 = go(lhs);
              scrut1 = keyword.name;
              if (scrut1 === "if") {
                tmp101 = " then ";
              } else if (scrut1 === "type") {
                tmp101 = " = ";
              } else if (scrut1 === "let") {
                tmp101 = " = ";
              } else {
                throw new globalThis.Error("match error");
              }
              if (rhs instanceof Option.Some.class) {
                param06 = rhs.value;
                rhs$_ = param06;
                tmp102 = go(rhs$_);
              } else {
                tmp102 = go(rhs);
              }
              scrut2 = keyword.name;
              if (scrut2 === "if") {
                tmp103 = " then ";
              } else if (scrut2 === "type") {
                tmp103 = "";
              } else if (scrut2 === "let") {
                tmp103 = " in ";
              } else {
                throw new globalThis.Error("match error");
              }
              if (body1 instanceof Option.Some.class) {
                param07 = body1.value;
                body2 = param07;
                tmp104 = go(body2);
              } else {
                tmp104 = "";
              }
              return runtime.safeCall(tmp99(keyword.name, " ", tmp100, tmp101, tmp102, tmp103, tmp104))
            } else if (tree1 instanceof Tree.Lambda.class) {
              param04 = tree1.params;
              param12 = tree1.body;
              params = param04;
              body = param12;
              tmp105 = Predef.fold((arg1, arg2) => {
                return arg1 + arg2
              });
              tmp106 = Parser.mapJoin(params, go, " ");
              tmp107 = go(body);
              return runtime.safeCall(tmp105("fun ", tmp106, " -> ", tmp107))
            } else if (tree1 instanceof Parser.Keyword.class) {
              param03 = tree1.name;
              param11 = tree1.leftPrec;
              param2 = tree1.rightPrec;
              name = param03;
              return name
            } else if (tree1 instanceof Option.Some.class) {
              param02 = tree1.value;
              tree2 = param02;
              tmp108 = wrap(tree2);
              tmp109 = "Some(" + tmp108;
              return tmp109 + ")"
            } else if (tree1 instanceof Option.None.class) {
              return "None"
            } else if (tree1 instanceof Stack.Cons.class) {
              param01 = tree1.head;
              param1 = tree1.tail;
              tmp110 = Parser.mapJoin(tree1, wrap, " :: ");
              return tmp110 + " :: Nil"
            } else if (tree1 instanceof Stack.Nil.class) {
              return "Nil"
            } else if (globalThis.Array.isArray(tree1) && tree1.length >= 0) {
              rest = runtime.safeCall(globalThis.Predef.tupleSlice(tree1, 0, 0));
              trees = rest;
              tmp111 = runtime.safeCall(trees.map((tree4, _, _1) => {
                return wrap(tree4)
              }));
              tmp112 = runtime.safeCall(tmp111.join(", "));
              tmp113 = "[" + tmp112;
              return tmp113 + "]"
            } else {
              tmp114 = "<unexpected:" + tree1;
              return tmp114 + ">"
            }
          }
        };
        return wrap(tree)
      }
      static toString() { return "Tree"; }
    };
    this.ParseRule = function ParseRule(name1, choices1) { return new ParseRule.class(name1, choices1); };
    this.ParseRule.class = class ParseRule {
      constructor(name, choices) {
        this.name = name;
        this.choices = choices;
      }
      get endChoice() {
        let tmp19;
        tmp19 = (choice) => {
          let scrut1, param01, value;
          scrut1 = Parser.Choice.forced(choice);
          if (scrut1 instanceof Parser.Choice.End.class) {
            param01 = scrut1.value;
            value = param01;
            return Option.Some(value)
          } else {
            return Option.None
          }
        };
        return Parser.collectFirst(this.choices, tmp19);
      } 
      get keywordChoices() {
        let tmp19, tmp20;
        tmp19 = (choice) => {
          let scrut1, param01, param1, keyword, rest;
          scrut1 = Parser.Choice.forced(choice);
          if (scrut1 instanceof Parser.Choice.Keyword.class) {
            param01 = scrut1.keyword;
            param1 = scrut1.rest;
            keyword = param01;
            rest = param1;
            return Option.Some([
              keyword.name,
              rest
            ])
          } else {
            return Option.None
          }
        };
        tmp20 = Parser.collectToArray(this.choices, tmp19);
        return Map.toMap(...tmp20);
      } 
      get exprChoice() {
        let tmp19;
        tmp19 = (choice) => {
          let scrut1, param01, param1, process, rest;
          scrut1 = Parser.Choice.forced(choice);
          if (scrut1 instanceof Parser.Choice.Expr.class) {
            param01 = scrut1.process;
            param1 = scrut1.rest;
            process = param01;
            rest = param1;
            return Option.Some([
              process,
              rest
            ])
          } else {
            return Option.None
          }
        };
        return Parser.collectFirst(this.choices, tmp19);
      } 
      get display() {
        let go, Knot1, displayChoice, scrut1, first1, first0, name1, lines, rest, first01, head, tail, line, tmp19, tmp20, tmp21, tmp22, tmp23;
        displayChoice = function displayChoice(choice) {
          let other, param01, param1, get, make, scrut2, param02, param11, rest1, prefix, scrut3, first11, first02, name2, lines1, name3, first03, line1, param03, param12, keyword, rest2, prefix1, scrut4, first12, first04, name4, rest3, first05, head1, tail$_, name5, line2, tmp24, tmp25, tmp26, tmp27, tmp28, tmp29, tmp30, tmp31, tmp32, tmp33, tmp34, tmp35, tmp36, tmp37;
          if (choice instanceof Parser.Choice.Keyword.class) {
            param03 = choice.keyword;
            param12 = choice.rest;
            keyword = param03;
            rest2 = param12;
            tmp24 = "`" + keyword.name;
            prefix1 = tmp24 + "` ";
            scrut4 = go(rest2);
            if (globalThis.Array.isArray(scrut4) && scrut4.length === 2) {
              first04 = scrut4[0];
              first12 = scrut4[1];
              name5 = first04;
              name4 = first04;
              if (globalThis.Array.isArray(first12) && first12.length === 1) {
                first05 = first12[0];
                line2 = first05;
                tmp25 = prefix1 + line2;
                return [
                  tmp25
                ]
              } else if (globalThis.Array.isArray(first12) && first12.length >= 1) {
                first05 = first12[0];
                rest3 = runtime.safeCall(globalThis.Predef.tupleSlice(first12, 1, 0));
                head1 = first05;
                tail$_ = rest3;
                tmp26 = prefix1 + head1;
                return [
                  tmp26,
                  ...tail$_
                ]
              } else {
                other = choice;
                tmp27 = runtime.safeCall(globalThis.JSON.stringify(other));
                tmp28 = "<unknown>" + tmp27;
                return [
                  tmp28
                ]
              }
            } else {
              other = choice;
              tmp29 = runtime.safeCall(globalThis.JSON.stringify(other));
              tmp30 = "<unknown>" + tmp29;
              return [
                tmp30
              ]
            }
          } else if (choice instanceof Parser.Choice.Expr.class) {
            param02 = choice.process;
            param11 = choice.rest;
            rest1 = param11;
            prefix = "<expression> ";
            scrut3 = go(rest1);
            if (globalThis.Array.isArray(scrut3) && scrut3.length === 2) {
              first02 = scrut3[0];
              first11 = scrut3[1];
              name3 = first02;
              if (globalThis.Array.isArray(first11) && first11.length === 1) {
                first03 = first11[0];
                line1 = first03;
                tmp31 = prefix + line1;
                return [
                  tmp31
                ]
              } else {
                name2 = first02;
                lines1 = first11;
                tmp32 = runtime.safeCall(lines1.map((line3, _, _1) => {
                  return "  " + line3
                }));
                return [
                  prefix,
                  ...tmp32
                ]
              }
            } else {
              other = choice;
              tmp33 = runtime.safeCall(globalThis.JSON.stringify(other));
              tmp34 = "<unknown>" + tmp33;
              return [
                tmp34
              ]
            }
          } else if (choice instanceof Parser.Choice.End.class) {
            return [
              "<end>"
            ]
          } else if (choice instanceof Parser.Choice.Lazy.class) {
            param01 = choice.get;
            param1 = choice.make;
            get = param01;
            make = param1;
            scrut2 = runtime.safeCall(get());
            if (scrut2 instanceof Knot1.class) {
              return [
                "<rec>"
              ]
            } else {
              tmp35 = runtime.safeCall(make(() => {
                return Knot1
              }));
              return displayChoice(tmp35)
            }
          } else {
            other = choice;
            tmp36 = runtime.safeCall(globalThis.JSON.stringify(other));
            tmp37 = "<unknown>" + tmp36;
            return [
              tmp37
            ]
          }
        };
        go = function go(rule) {
          let choices1, lines1, param01, param1, head1, tail1, tmp24, tmp25, tmp26, tmp27;
          choices1 = rule.choices;
          lines1 = [];
          tmp28: while (true) {
            if (choices1 instanceof Stack.Cons.class) {
              param01 = choices1.head;
              param1 = choices1.tail;
              head1 = param01;
              tail1 = param1;
              tmp24 = displayChoice(head1);
              tmp25 = runtime.safeCall(lines1.push(tmp24));
              choices1 = tail1;
              tmp26 = runtime.Unit;
              continue tmp28;
            } else {
              tmp26 = runtime.Unit;
            }
            break;
          }
          tmp27 = runtime.safeCall(lines1.flat());
          return [
            rule.name,
            tmp27
          ]
        };
        const Knot$class = class Knot {
          constructor() {}
          toString() { return "Knot"; }
        }; Knot1 = new Knot$class;
        Knot1.class = Knot$class;
        scrut1 = go(this);
        if (globalThis.Array.isArray(scrut1) && scrut1.length === 2) {
          first0 = scrut1[0];
          first1 = scrut1[1];
          name1 = first0;
          lines = first1;
          tmp19 = "<" + name1;
          tmp20 = tmp19 + "> ::= ";
          if (globalThis.Array.isArray(lines) && lines.length === 1) {
            first01 = lines[0];
            line = first01;
            tmp21 = line;
          } else if (globalThis.Array.isArray(lines) && lines.length >= 1) {
            first01 = lines[0];
            rest = runtime.safeCall(globalThis.Predef.tupleSlice(lines, 1, 0));
            head = first01;
            tail = rest;
            tmp22 = head + "\n";
            tmp23 = runtime.safeCall(tail.join("\n"));
            tmp21 = tmp22 + tmp23;
          } else {
            throw new globalThis.Error("match error");
          }
          return tmp20 + tmp21
        } else {
          throw new globalThis.Error("match error");
        }
      }
      toString() { return "ParseRule(" + globalThis.Predef.render(this.name) + ", " + globalThis.Predef.render(this.choices) + ")"; }
    };
    this.Choice = class Choice {
      static {
        this.Keyword = function Keyword(keyword1, rest1) { return new Keyword.class(keyword1, rest1); };
        this.Keyword.class = class Keyword1 {
          constructor(keyword, rest) {
            this.keyword = keyword;
            this.rest = rest;
          }
          toString() { return "Keyword(" + globalThis.Predef.render(this.keyword) + ", " + globalThis.Predef.render(this.rest) + ")"; }
        };
        this.Expr = function Expr(process1, rest1) { return new Expr.class(process1, rest1); };
        this.Expr.class = class Expr {
          constructor(process, rest) {
            this.process = process;
            this.rest = rest;
          }
          toString() { return "Expr(" + globalThis.Predef.render(this.process) + ", " + globalThis.Predef.render(this.rest) + ")"; }
        };
        this.End = function End(value1) { return new End.class(value1); };
        this.End.class = class End {
          constructor(value) {
            this.value = value;
          }
          toString() { return "End(" + globalThis.Predef.render(this.value) + ")"; }
        };
        this.Lazy = function Lazy(get1, make1) { return new Lazy.class(get1, make1); };
        this.Lazy.class = class Lazy {
          constructor(get, make) {
            this.get = get;
            this.make = make;
          }
          toString() { return "Lazy(" + globalThis.Predef.render(this.get) + ", " + globalThis.Predef.render(this.make) + ")"; }
        };
      }
      static forced(choice) {
        let param01, param1, get;
        if (choice instanceof Choice.Lazy.class) {
          param01 = choice.get;
          param1 = choice.make;
          get = param01;
          return runtime.safeCall(get())
        } else {
          return choice
        }
      } 
      static keyword(keyword, name, ...choices) {
        let tmp19;
        tmp19 = Parser.rule(name, ...choices);
        return Choice.Keyword(keyword, tmp19)
      } 
      static expr(process, name1, ...choices1) {
        let tmp19;
        tmp19 = Parser.rule(name1, ...choices1);
        return Choice.Expr(process, tmp19)
      } 
      static end(value) {
        return Choice.End(value)
      } 
      static lazy(makeChoice) {
        let getChoice, cache;
        getChoice = function getChoice() {
          let param01, choice1, tmp19;
          if (cache instanceof Option.Some.class) {
            param01 = cache.value;
            choice1 = param01;
            return choice1
          } else {
            tmp19 = runtime.safeCall(makeChoice(getChoice));
            cache = tmp19;
            return cache
          }
        };
        cache = Option.None;
        return Choice.Lazy(getChoice, makeChoice)
      }
      static toString() { return "Choice"; }
    };
    tmp5 = new TreeTracer.TreeTracer();
    this.tracer = tmp5;
    tmp6 = Parser.letBinding(Parser.Keywords._let);
    Parser.#letChoice = tmp6;
    tmp7 = Parser.funChoice();
    tmp8 = Parser.typeDefinition();
    tmp9 = Parser.matchWithChoice();
    tmp10 = Parser.matchFunctionChoice();
    tmp11 = Parser.ifThenElse();
    tmp12 = Parser.Tree.Underscore();
    tmp13 = Parser.Choice.end(tmp12);
    tmp14 = Parser.Choice.keyword(Parser.Keywords._underscore, "wildcard pattern", tmp13);
    tmp15 = Parser.rule("start of the statement", Parser.#letChoice, tmp7, tmp8, tmp9, tmp10, tmp11, tmp14);
    this.prefixRules = tmp15;
    tmp16 = runtime.safeCall(Parser.prefixRules.keywordChoices.get("fun"));
    tmp17 = Parser.makeInfixChoice(Parser.Keywords._bar);
    tmp18 = Parser.rule("the continuation of expressions", tmp17);
    this.infixRules = tmp18;
  }
  static at(target, index) {
    return runtime.safeCall(target.at(index))
  } 
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
  static toStack(array2) {
    let length, i, reserve, scrut, tmp, tmp1, tmp2, tmp3, tmp4;
    length = array2.length;
    tmp = length - 1;
    i = tmp;
    reserve = Stack.Nil;
    tmp5: while (true) {
      scrut = i >= 0;
      if (scrut === true) {
        tmp1 = runtime.safeCall(array2.at(i));
        tmp2 = Stack.Cons(tmp1, reserve);
        reserve = tmp2;
        tmp3 = i - 1;
        i = tmp3;
        tmp4 = runtime.Unit;
        continue tmp5;
      } else {
        tmp4 = runtime.Unit;
      }
      break;
    }
    return reserve
  } 
  static stack(...args) {
    return Parser.toStack(args)
  } 
  static mapJoin(stack, op, sep) {
    let buffer, param0, param1, head, tail, param01, param11, tmp, tmp1, tmp2, tmp3, tmp4;
    buffer = "";
    tmp5: while (true) {
      if (stack instanceof Stack.Cons.class) {
        param0 = stack.head;
        param1 = stack.tail;
        head = param0;
        tail = param1;
        tmp = runtime.safeCall(op(head));
        tmp1 = buffer + tmp;
        buffer = tmp1;
        if (tail instanceof Stack.Cons.class) {
          param01 = tail.head;
          param11 = tail.tail;
          tmp2 = buffer + sep;
          buffer = tmp2;
          tmp3 = runtime.Unit;
        } else {
          tmp3 = runtime.Unit;
        }
        stack = tail;
        tmp4 = runtime.Unit;
        continue tmp5;
      } else {
        tmp4 = runtime.Unit;
      }
      break;
    }
    return buffer
  } 
  static collectFirst(stack1, op1) {
    let lastResult, param0, param1, head, tail, doTemp, tmp, tmp1;
    lastResult = Option.None;
    tmp2: while (true) {
      if (stack1 instanceof Stack.Cons.class) {
        param0 = stack1.head;
        param1 = stack1.tail;
        head = param0;
        tail = param1;
        tmp = runtime.safeCall(op1(head));
        lastResult = tmp;
        doTemp = runtime.Unit;
        if (lastResult instanceof Option.None.class) {
          stack1 = tail;
          tmp1 = runtime.Unit;
          continue tmp2;
        } else {
          tmp1 = runtime.Unit;
        }
      } else {
        tmp1 = runtime.Unit;
      }
      break;
    }
    return lastResult
  } 
  static collectToArray(stack2, p) {
    let elements, param0, param1, head, tail, scrut, param01, value, tmp, tmp1;
    elements = [];
    tmp2: while (true) {
      if (stack2 instanceof Stack.Cons.class) {
        param0 = stack2.head;
        param1 = stack2.tail;
        head = param0;
        tail = param1;
        scrut = runtime.safeCall(p(head));
        if (scrut instanceof Option.Some.class) {
          param01 = scrut.value;
          value = param01;
          tmp = runtime.safeCall(elements.push(value));
        } else {
          tmp = runtime.Unit;
        }
        stack2 = tail;
        tmp1 = runtime.Unit;
        continue tmp2;
      } else {
        tmp1 = runtime.Unit;
      }
      break;
    }
    return elements
  } 
  static makePrecMap(...ops) {
    let m, i, scrut, tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6;
    tmp = new Map.Map();
    m = tmp;
    i = 0;
    tmp7: while (true) {
      scrut = i < ops.length;
      if (scrut === true) {
        tmp1 = runtime.safeCall(ops.at(i));
        tmp2 = runtime.safeCall(tmp1.split(" "));
        tmp3 = (op2, _, _1) => {
          let scrut1, tmp8;
          scrut1 = op2.length > 0;
          if (scrut1 === true) {
            tmp8 = i + Parser.Keywords.maxPrec;
            return m.insert(op2, tmp8)
          } else {
            return runtime.Unit
          }
        };
        tmp4 = runtime.safeCall(tmp2.forEach(tmp3));
        tmp5 = i + 1;
        i = tmp5;
        tmp6 = runtime.Unit;
        continue tmp7;
      } else {
        tmp6 = runtime.Unit;
      }
      break;
    }
    return m
  } 
  static orMaxPrec(precOpt) {
    let param0, prec;
    if (precOpt instanceof Option.Some.class) {
      param0 = precOpt.value;
      prec = param0;
      return prec
    } else if (precOpt instanceof Option.None.class) {
      return Parser.#INT_MAX
    } else {
      throw new globalThis.Error("match error");
    }
  } 
  static charPrec(op2) {
    let scrut, param0, prec;
    scrut = runtime.safeCall(Parser.#precMap.get(op2));
    if (scrut instanceof Option.Some.class) {
      param0 = scrut.value;
      prec = param0;
      return prec
    } else {
      return Parser.#INT_MAX
    }
  } 
  static hasLetter(s) {
    return runtime.safeCall([
      ...s
    ].some((ch, _, _1) => {
      let matchResult;
      matchResult = runtime.safeCall(Parser.Letter.unapply(ch));
      if (matchResult instanceof globalThis.Predef.MatchResult.class) {
        return true
      } else {
        return false
      }
    }))
  } 
  static opPrec(opStr) {
    let leftPrec, rightOp, rightPrec, matchResult, scrut, matchResult1, tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6;
    matchResult1 = runtime.safeCall(Parser.FloatOperator.unapply(opStr));
    if (matchResult1 instanceof globalThis.Predef.MatchResult.class) {
      tmp = runtime.safeCall(opStr.at(0));
      tmp1 = Parser.charPrec(tmp);
      tmp2 = runtime.safeCall(opStr.at(0));
      tmp3 = Parser.charPrec(tmp2);
      return [
        tmp1,
        tmp3
      ]
    } else {
      scrut = Parser.hasLetter(opStr);
      if (scrut === true) {
        return [
          Parser.Keywords.maxPrec,
          Parser.Keywords.maxPrec
        ]
      } else {
        tmp4 = runtime.safeCall(opStr.at(0));
        leftPrec = Parser.charPrec(tmp4);
        tmp5 = - 1;
        rightOp = runtime.safeCall(opStr.at(tmp5));
        rightPrec = Parser.charPrec(rightOp);
        matchResult = runtime.safeCall(Parser.RightAssociative.unapply(rightOp));
        if (matchResult instanceof globalThis.Predef.MatchResult.class) {
          tmp6 = rightPrec - 1;
          return [
            leftPrec,
            tmp6
          ]
        } else {
          return [
            leftPrec,
            rightPrec
          ]
        }
      }
    }
  } 
  static rule(name, ...choices) {
    let tmp;
    tmp = Parser.toStack(choices);
    return Parser.ParseRule(name, tmp)
  } 
  static indented(text) {
    let tmp;
    tmp = runtime.safeCall(text.split("\n"));
    return runtime.safeCall(tmp.join("\n  "))
  } 
  static showAsTree(thing) {
    let itemize, go;
    itemize = function itemize(something) {
      let keyword, param0, param1, p1, b, param01, param11, param2, param3, n, l, r, b1, param02, param12, param21, op3, lhs, rhs, param03, param13, c, a, param04, param14, scrutinee, branches, param05, param15, k, v, param06, t, param07, t1, param08, param16, m, s1, param09, param17, n1, param010, param18, t2, m1, m2, param011, param19, head, tail, items, remaining, param012, param110, head$_, tail$_, param013, content, tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20, tmp21, tmp22, tmp23, tmp24, tmp25, tmp26, tmp27, tmp28, tmp29, tmp30, tmp31, tmp32, tmp33, tmp34, tmp35, tmp36, tmp37, tmp38;
      if (something instanceof Option.Some.class) {
        param013 = something.value;
        content = param013;
        tmp = go(content);
        tmp1 = "Some of " + tmp;
        return Predef.tuple([
          tmp1
        ], [])
      } else if (something instanceof Option.None.class) {
        return Predef.tuple("None", [])
      } else if (something instanceof Stack.Cons.class) {
        param011 = something.head;
        param19 = something.tail;
        head = param011;
        tail = param19;
        tmp2 = go(head);
        items = [
          tmp2
        ];
        remaining = tail;
        tmp39: while (true) {
          if (remaining instanceof Stack.Cons.class) {
            param012 = remaining.head;
            param110 = remaining.tail;
            head$_ = param012;
            tail$_ = param110;
            tmp3 = go(head$_);
            tmp4 = runtime.safeCall(items.push(tmp3));
            remaining = tail$_;
            tmp5 = runtime.Unit;
            continue tmp39;
          } else {
            tmp5 = runtime.Unit;
          }
          break;
        }
        tmp6 = "Stack of \n" + "  ";
        tmp7 = runtime.safeCall(items.join("\n"));
        tmp8 = Parser.indented(tmp7);
        tmp9 = tmp6 + tmp8;
        return Predef.tuple(tmp9, [])
      } else if (something instanceof Stack.Nil.class) {
        return [
          "Nil",
          []
        ]
      } else {
        if (typeof something === 'string') {
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
        } else if (something instanceof Parser.Tree.Empty.class) {
          return [
            "Empty",
            []
          ]
        } else if (something instanceof Parser.Tree.Error.class) {
          param010 = something.tree;
          param18 = something.message;
          if (param010 instanceof Parser.Tree.Empty.class) {
            m2 = param18;
            tmp12 = go(m2);
            return Predef.tuple("Error", [
              [
                "message",
                tmp12
              ]
            ])
          } else {
            t2 = param010;
            m1 = param18;
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
        } else if (something instanceof Parser.Tree.Ident.class) {
          param09 = something.name;
          param17 = something.symbolic;
          n1 = param09;
          tmp15 = go(n1);
          return Predef.tuple("Ident", [
            [
              "name",
              tmp15
            ]
          ])
        } else if (something instanceof Parser.Tree.Underscore.class) {
          return Predef.tuple("Underscore", [])
        } else if (something instanceof Parser.Tree.Modified.class) {
          param08 = something.modifier;
          param16 = something.subject;
          m = param08;
          s1 = param16;
          tmp16 = go(m);
          tmp17 = go(s1);
          return Predef.tuple("Modified", [
            [
              "modifier",
              tmp16
            ],
            [
              "subject",
              tmp17
            ]
          ])
        } else if (something instanceof Parser.Tree.Tuple.class) {
          param07 = something.trees;
          t1 = param07;
          tmp18 = go(t1);
          return Predef.tuple("Tuple", [
            [
              "items",
              tmp18
            ]
          ])
        } else if (something instanceof Parser.Tree.Sequence.class) {
          param06 = something.trees;
          t = param06;
          tmp19 = go(t);
          return Predef.tuple("Sequence", [
            [
              "items",
              tmp19
            ]
          ])
        } else if (something instanceof Parser.Tree.Literal.class) {
          param05 = something.kind;
          param15 = something.value;
          k = param05;
          v = param15;
          tmp20 = go(k);
          tmp21 = "Literal#" + tmp20;
          tmp22 = tmp21 + " of ";
          tmp23 = go(v);
          tmp24 = tmp22 + tmp23;
          return Predef.tuple(tmp24, [])
        } else {
          if (something instanceof Parser.Tree.Match.class) {
            param04 = something.scrutinee;
            param14 = something.branches;
            scrutinee = param04;
            branches = param14;
            tmp25 = go(branches);
            return Predef.tuple("Match", [
              [
                "scrutinee",
                scrutinee
              ],
              [
                "branches",
                tmp25
              ]
            ])
          } else if (something instanceof Parser.Tree.App.class) {
            param03 = something.callee;
            param13 = something.arguments;
            c = param03;
            a = param13;
            tmp26 = go(c);
            tmp27 = go(a);
            return Predef.tuple("App", [
              [
                "callee",
                tmp26
              ],
              [
                "arguments",
                tmp27
              ]
            ])
          } else if (something instanceof Parser.Tree.Infix.class) {
            param02 = something.op;
            param12 = something.lhs;
            param21 = something.rhs;
            op3 = param02;
            lhs = param12;
            rhs = param21;
            tmp28 = go(op3);
            tmp29 = go(lhs);
            tmp30 = go(rhs);
            return Predef.tuple("Infix", [
              [
                "op",
                tmp28
              ],
              [
                "lhs",
                tmp29
              ],
              [
                "rhs",
                tmp30
              ]
            ])
          } else if (something instanceof Parser.Tree.Ternary.class) {
            param01 = something.keyword;
            param11 = something.lhs;
            param2 = something.rhs;
            param3 = something.body;
            n = param01;
            l = param11;
            r = param2;
            b1 = param3;
            tmp31 = go(n);
            tmp32 = go(l);
            tmp33 = go(r);
            tmp34 = go(b1);
            return Predef.tuple("Ternary", [
              [
                "name",
                tmp31
              ],
              [
                "lhs",
                tmp32
              ],
              [
                "rhs",
                tmp33
              ],
              [
                "body",
                tmp34
              ]
            ])
          } else if (something instanceof Parser.Tree.Lambda.class) {
            param0 = something.params;
            param1 = something.body;
            p1 = param0;
            b = param1;
            tmp35 = go(p1);
            tmp36 = go(b);
            return Predef.tuple("Lambda", [
              [
                "params",
                tmp35
              ],
              [
                "body",
                tmp36
              ]
            ])
          } else if (something instanceof Parser.Keyword.class) {
            keyword = something;
            tmp37 = runtime.safeCall(keyword.toString());
            return [
              tmp37,
              []
            ]
          } else if (something instanceof Lexer.LiteralKind.Integer.class) {
            return Predef.tuple("Integer", [])
          } else if (something instanceof Lexer.LiteralKind.Decimal.class) {
            return Predef.tuple("Decimal", [])
          } else if (something instanceof Lexer.LiteralKind.String.class) {
            return Predef.tuple("String", [])
          } else if (something instanceof Lexer.LiteralKind.Boolean.class) {
            return Predef.tuple("Boolean", [])
          } else {
            tmp38 = runtime.safeCall(globalThis.JSON.stringify(something));
            return Predef.tuple("Unknown", [
              [
                "JSON.stringify(_)",
                tmp38
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
            tmp1 = Parser.second(field);
            return tmp + tmp1
          } else {
            intro = first0;
            fields = first1;
            tmp2 = runtime.safeCall(fields.map((field1, _, _1) => {
              let tmp10, tmp11, tmp12;
              tmp10 = Parser.first(field1);
              tmp11 = tmp10 + " = ";
              tmp12 = Parser.second(field1);
              return tmp11 + tmp12
            }));
            dialogue = tmp2;
            tmp3 = intro + ":\n  ";
            tmp4 = runtime.safeCall(dialogue.join("\n"));
            tmp5 = Parser.indented(tmp4);
            return tmp3 + tmp5
          }
        } else {
          intro = first0;
          fields = first1;
          tmp6 = runtime.safeCall(fields.map((field1, _, _1) => {
            let tmp10, tmp11, tmp12;
            tmp10 = Parser.first(field1);
            tmp11 = tmp10 + " = ";
            tmp12 = Parser.second(field1);
            return tmp11 + tmp12
          }));
          dialogue = tmp6;
          tmp7 = intro + ":\n  ";
          tmp8 = runtime.safeCall(dialogue.join("\n"));
          tmp9 = Parser.indented(tmp8);
          return tmp7 + tmp9
        }
      } else {
        throw new globalThis.Error("match error");
      }
    };
    return go(thing)
  } 
  static letBinding(keyword) {
    let intro, tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15;
    tmp = keyword.name + " binding: ";
    intro = tmp;
    tmp1 = intro + "keyword";
    tmp2 = (lhs, rhsAndBody) => {
      let first1, first0, rhs, body;
      if (globalThis.Array.isArray(rhsAndBody) && rhsAndBody.length === 2) {
        first0 = rhsAndBody[0];
        first1 = rhsAndBody[1];
        rhs = first0;
        body = first1;
        return Parser.Tree.Ternary(keyword, lhs, rhs, body)
      } else {
        throw new globalThis.Error("match error");
      }
    };
    tmp3 = intro + "left-hand side";
    tmp4 = intro + "equal sign";
    tmp5 = intro + "right-hand side";
    tmp6 = intro + "`in` keyword";
    tmp7 = intro + "body";
    tmp8 = Parser.Choice.end(Option.None);
    tmp9 = Parser.Choice.expr((body, _) => {
      return Option.Some(body)
    }, tmp7, tmp8);
    tmp10 = Parser.Choice.keyword(Parser.Keywords._in, tmp6, tmp9);
    tmp11 = Parser.Choice.end(Option.None);
    tmp12 = Parser.Choice.expr((expr, body) => {
      let tmp16;
      tmp16 = Option.Some(expr);
      return [
        tmp16,
        body
      ]
    }, tmp5, tmp10, tmp11);
    tmp13 = Parser.Choice.keyword(Parser.Keywords._equal, tmp4, tmp12);
    tmp14 = Parser.Choice.end([
      Option.None,
      Option.None
    ]);
    tmp15 = Parser.Choice.expr(tmp2, tmp3, tmp13, tmp14);
    return Parser.Choice.keyword(keyword, tmp1, tmp15)
  } 
  static typeDefinition() {
    let intro, tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7;
    intro = "type definition: ";
    tmp = intro + "`type` keyword";
    tmp1 = intro + "name";
    tmp2 = intro + "equal sign";
    tmp3 = intro + "body";
    tmp4 = Parser.Choice.end(runtime.Unit);
    tmp5 = Parser.Choice.expr((body, _) => {
      return body
    }, tmp3, tmp4);
    tmp6 = Parser.Choice.keyword(Parser.Keywords._equal, tmp2, tmp5);
    tmp7 = Parser.Choice.expr((name1, body) => {
      return Parser.Tree.Ternary(Parser.Keywords._type, name1, body, Option.None)
    }, tmp1, tmp6);
    return Parser.Choice.keyword(Parser.Keywords._type, tmp, tmp7)
  } 
  static ifThenElse() {
    let intro, tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13;
    intro = "if-then-else: ";
    tmp = intro + "`if` keyword";
    tmp1 = (tst, conAndAlt) => {
      let first1, first0, con, alt;
      if (globalThis.Array.isArray(conAndAlt) && conAndAlt.length === 2) {
        first0 = conAndAlt[0];
        first1 = conAndAlt[1];
        con = first0;
        alt = first1;
        return Parser.Tree.Ternary(Parser.Keywords._if, tst, con, alt)
      } else {
        throw new globalThis.Error("match error");
      }
    };
    tmp2 = intro + "condition";
    tmp3 = intro + "`then` keyword";
    tmp4 = intro + "consequent";
    tmp5 = intro + "`else` keyword";
    tmp6 = intro + "alternative";
    tmp7 = Parser.Choice.end(Option.None);
    tmp8 = Parser.Choice.expr((alt, _) => {
      return Option.Some(alt)
    }, tmp6, tmp7);
    tmp9 = Parser.Choice.keyword(Parser.Keywords._else, tmp5, tmp8);
    tmp10 = Parser.Choice.end(Option.None);
    tmp11 = Parser.Choice.expr((con, optAlt) => {
      return [
        con,
        optAlt
      ]
    }, tmp4, tmp9, tmp10);
    tmp12 = Parser.Choice.keyword(Parser.Keywords._then, tmp3, tmp11);
    tmp13 = Parser.Choice.expr(tmp1, tmp2, tmp12);
    return Parser.Choice.keyword(Parser.Keywords._if, tmp, tmp13)
  } 
  static funChoice() {
    let intro, tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7;
    intro = "function expression: ";
    tmp = intro + "keyword";
    tmp1 = intro + "parameters";
    tmp2 = intro + "arrow";
    tmp3 = intro + "body";
    tmp4 = Parser.Choice.end(Option.None);
    tmp5 = Parser.Choice.expr((body, _) => {
      return body
    }, tmp3, tmp4);
    tmp6 = Parser.Choice.keyword(Parser.Keywords._thinArrow, tmp2, tmp5);
    tmp7 = Parser.Choice.expr((params, body) => {
      let tmp8;
      tmp8 = Stack.Cons(params, Stack.Nil);
      return Parser.Tree.Lambda(tmp8, body)
    }, tmp1, tmp6);
    return Parser.Choice.keyword(Parser.Keywords._fun, tmp, tmp7)
  } 
  static patternMatchingBody(intro, cons, nil) {
    let makeMatchArms, matchArms, tmp, tmp1, tmp2;
    makeMatchArms = function makeMatchArms(get) {
      let tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12;
      tmp3 = (pat, rhsAndRest) => {
        let first1, first0, rhs, rest, tmp13;
        if (globalThis.Array.isArray(rhsAndRest) && rhsAndRest.length === 2) {
          first0 = rhsAndRest[0];
          first1 = rhsAndRest[1];
          rhs = first0;
          rest = first1;
          tmp13 = Parser.Tree.Infix(Parser.Keywords._thinArrow, pat, rhs);
          return runtime.safeCall(cons(tmp13, rest))
        } else {
          throw new globalThis.Error("match error");
        }
      };
      tmp4 = intro + "pattern";
      tmp5 = intro + "arrow";
      tmp6 = intro + "body";
      tmp7 = Parser.Choice.end(nil);
      tmp8 = intro + "leading bar";
      tmp9 = Parser.Choice.Lazy(get, makeMatchArms);
      tmp10 = Parser.Choice.keyword(Parser.Keywords._bar, tmp8, tmp9);
      tmp11 = Parser.Choice.expr((curr, next) => {
        return [
          curr,
          next
        ]
      }, tmp6, tmp7, tmp10);
      tmp12 = Parser.Choice.keyword(Parser.Keywords._thinArrow, tmp5, tmp11);
      return Parser.Choice.expr(tmp3, tmp4, tmp12)
    };
    tmp = Parser.Choice.lazy(makeMatchArms);
    matchArms = tmp;
    tmp1 = intro + "leading bar";
    tmp2 = Parser.Choice.keyword(Parser.Keywords._bar, tmp1, matchArms);
    return Predef.tuple(tmp2, matchArms)
  } 
  static matchWithChoice() {
    let intro1, tmp, tmp1, tmp2, tmp3, tmp4, tmp5;
    intro1 = "`match`-`with` expression: ";
    tmp = intro1 + "keyword";
    tmp1 = intro1 + "scrutinee";
    tmp2 = intro1 + "with";
    tmp3 = Parser.patternMatchingBody(intro1, (x, xs) => {
      return Stack.Cons(x, xs)
    }, Stack.Nil);
    tmp4 = Parser.Choice.keyword(Parser.Keywords._with, tmp2, ...tmp3);
    tmp5 = Parser.Choice.expr((scrutinee, branches) => {
      return Parser.Tree.Match(scrutinee, branches)
    }, tmp1, tmp4);
    return Parser.Choice.keyword(Parser.Keywords._match, tmp, tmp5)
  } 
  static matchFunctionChoice() {
    let intro1, tmp, tmp1, tmp2, tmp3;
    intro1 = "`match` function: ";
    tmp = intro1 + "`function` keyword";
    tmp1 = (x, xs) => {
      let param0, param1, scrut, arms, tmp4;
      if (xs instanceof Parser.Tree.Match.class) {
        param0 = xs.scrutinee;
        param1 = xs.branches;
        scrut = param0;
        arms = param1;
        tmp4 = Stack.Cons(x, arms);
        return Parser.Tree.Match(scrut, tmp4)
      } else {
        throw new globalThis.Error("match error");
      }
    };
    tmp2 = Parser.Tree.Match(Parser.Tree.empty, Stack.Nil);
    tmp3 = Parser.patternMatchingBody(intro1, tmp1, tmp2);
    return Parser.Choice.keyword(Parser.Keywords._function, tmp, ...tmp3)
  } 
  static makeInfixChoice(keyword1) {
    let tmp, tmp1, tmp2, tmp3, tmp4, tmp5;
    tmp = "operator `" + keyword1.name;
    tmp1 = tmp + "`";
    tmp2 = "operator `" + keyword1.name;
    tmp3 = tmp2 + "` right-hand side";
    tmp4 = Parser.Choice.end(runtime.Unit);
    tmp5 = Parser.Choice.expr((rhs, _) => {
      return (lhs) => {
        return Parser.Tree.Infix(keyword1, lhs, rhs)
      }
    }, tmp3, tmp4);
    return Parser.Choice.keyword(keyword1, tmp1, tmp5)
  } 
  static parse(tokens) {
    let exprCont, simpleExpr, parseRule, yeetSpaces, consume, current, counter;
    yeetSpaces = function yeetSpaces() {
      let param0, param1, tail, tmp, tmp1, tmp2, tmp3;
      tmp4: while (true) {
        if (current instanceof Stack.Cons.class) {
          param0 = current.head;
          param1 = current.tail;
          if (param0 instanceof Lexer.Token.Space.class) {
            tail = param1;
            tmp = "skipped a space at " + counter;
            tmp1 = Parser.tracer.print(tmp, 604);
            current = tail;
            tmp2 = counter + 1;
            counter = tmp2;
            tmp3 = runtime.Unit;
            continue tmp4;
          } else {
            tmp3 = runtime.Unit;
          }
        } else {
          tmp3 = runtime.Unit;
        }
        break;
      }
      return current
    };
    consume = function consume() {
      let param0, param1, head, tail, tmp, tmp1, tmp2, tmp3, tmp4, tmp5;
      if (current instanceof Stack.Cons.class) {
        param0 = current.head;
        param1 = current.tail;
        head = param0;
        tail = param1;
        tmp = Lexer.Token.summary(head);
        tmp1 = "consumed `" + tmp;
        tmp2 = tmp1 + "` at ";
        tmp3 = tmp2 + counter;
        tmp4 = Parser.tracer.print(tmp3, 612);
        current = tail;
        tmp5 = counter + 1;
        counter = tmp5;
        return runtime.Unit
      } else {
        return Parser.tracer.print("consumed: EOF", 616)
      }
    };
    parseRule = function parseRule(prec, rule, opened) {
      let tmp, tmp1, tmp2, tmp3;
      tmp = "parsing rule \"" + rule.name;
      tmp1 = tmp + "\" with precedence ";
      tmp2 = tmp1 + prec;
      tmp3 = () => {
        let expr, scrut, scrut1, param0, value, param01, param1, other, doTemp, scrut2, reserve, scrut3, param02, first1, first0, process, rest, rhs, param03, param11, scrut4, param04, value1, param05, param12, name1, doTemp1, doTemp2, scrut5, param06, keyword2, scrut6, scrut7, param07, first11, first01, process1, rest1, rhs1, param08, rule1, param09, encountered, doTemp3, param010, expected, scrut8, scrut9, param011, value2, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20, tmp21, tmp22, tmp23, tmp24, tmp25, tmp26, tmp27, tmp28, tmp29, tmp30, tmp31, tmp32, tmp33, tmp34, tmp35, tmp36, tmp37, tmp38, tmp39, tmp40, tmp41, tmp42, tmp43, tmp44, tmp45, tmp46, tmp47, tmp48, tmp49, tmp50, tmp51, tmp52, tmp53, tmp54, tmp55, tmp56, tmp57, tmp58, tmp59, tmp60, tmp61, tmp62, tmp63, tmp64, tmp65, tmp66, tmp67, tmp68, tmp69, tmp70, tmp71, tmp72, tmp73, tmp74, tmp75, tmp76, tmp77, tmp78, tmp79, tmp80, tmp81, tmp82, tmp83, tmp84, tmp85, tmp86, tmp87, tmp88, tmp89, tmp90, tmp91, tmp92, tmp93, tmp94, tmp95, tmp96, tmp97, tmp98, tmp99, tmp100, tmp101, tmp102, tmp103, tmp104, tmp105, tmp106, tmp107, tmp108, tmp109, tmp110, tmp111, tmp112, tmp113, tmp114, tmp115, tmp116, tmp117, tmp118, tmp119, tmp120, tmp121, tmp122, tmp123, tmp124, tmp125, tmp126, tmp127, tmp128, tmp129, tmp130, tmp131, tmp132, tmp133, tmp134, tmp135, tmp136, tmp137, tmp138;
        tmp4 = yeetSpaces();
        scrut = tmp4;
        if (scrut instanceof Stack.Cons.class) {
          param01 = scrut.head;
          param1 = scrut.tail;
          if (param01 instanceof Lexer.Token.Close.class) {
            param09 = param01.kind;
            encountered = param09;
            doTemp3 = Parser.tracer.print("the case of closing brackets", 624);
            if (opened instanceof Option.Some.class) {
              param010 = opened.value;
              expected = param010;
              scrut8 = encountered == expected;
              if (scrut8 === true) {
                scrut9 = rule.endChoice;
                if (scrut9 instanceof Option.Some.class) {
                  param011 = scrut9.value;
                  value2 = param011;
                  return value2
                } else if (scrut9 instanceof Option.None.class) {
                  tmp5 = "unexpected close bracket `" + encountered;
                  tmp6 = tmp5 + "`";
                  return Parser.Tree.error(tmp6)
                } else {
                  return Parser.Tree.error("mismatched brackets")
                }
              } else {
                return Parser.Tree.error("mismatched brackets")
              }
            } else if (opened instanceof Option.None.class) {
              tmp7 = "unexpected bracket: " + encountered;
              return Parser.Tree.error(tmp7)
            } else {
              other = param01;
              tmp8 = Lexer.Token.preview(current);
              tmp9 = "try parse an expression from " + tmp8;
              doTemp = Parser.tracer.print(tmp9, 653);
              scrut2 = simpleExpr(prec, opened);
              if (scrut2 instanceof Parser.Tree.Error.class) {
                param03 = scrut2.tree;
                param11 = scrut2.message;
                if (param03 instanceof Parser.Tree.Empty.class) {
                  scrut4 = rule.endChoice;
                  if (scrut4 instanceof Option.Some.class) {
                    param04 = scrut4.value;
                    value1 = param04;
                    return value1
                  } else {
                    reserve = scrut2;
                    scrut3 = rule.exprChoice;
                    if (scrut3 instanceof Option.Some.class) {
                      param02 = scrut3.value;
                      if (globalThis.Array.isArray(param02) && param02.length === 2) {
                        first0 = param02[0];
                        first1 = param02[1];
                        process = first0;
                        rest = first1;
                        tmp10 = parseRule(prec, rest, opened);
                        rhs = tmp10;
                        tmp11 = Parser.Tree.summary(rhs);
                        tmp12 = "the result from sub-rule: " + tmp11;
                        tmp13 = Parser.tracer.print(tmp12, 660);
                        tmp14 = Parser.Tree.summary(reserve);
                        tmp15 = "the reserved expression: " + tmp14;
                        tmp16 = Parser.tracer.print(tmp15, 661);
                        return runtime.safeCall(process(reserve, rhs))
                      } else {
                        throw new globalThis.Error("match error");
                      }
                    } else if (scrut3 instanceof Option.None.class) {
                      tmp17 = Parser.tracer.print("the rule doesn't have a choice starting with expressions", 664);
                      tmp18 = Parser.tracer.print(rule.display, 665);
                      return Parser.Tree.error("unexpected expression")
                    } else {
                      throw new globalThis.Error("match error");
                    }
                  }
                } else {
                  reserve = scrut2;
                  scrut3 = rule.exprChoice;
                  if (scrut3 instanceof Option.Some.class) {
                    param02 = scrut3.value;
                    if (globalThis.Array.isArray(param02) && param02.length === 2) {
                      first0 = param02[0];
                      first1 = param02[1];
                      process = first0;
                      rest = first1;
                      tmp19 = parseRule(prec, rest, opened);
                      rhs = tmp19;
                      tmp20 = Parser.Tree.summary(rhs);
                      tmp21 = "the result from sub-rule: " + tmp20;
                      tmp22 = Parser.tracer.print(tmp21, 660);
                      tmp23 = Parser.Tree.summary(reserve);
                      tmp24 = "the reserved expression: " + tmp23;
                      tmp25 = Parser.tracer.print(tmp24, 661);
                      return runtime.safeCall(process(reserve, rhs))
                    } else {
                      throw new globalThis.Error("match error");
                    }
                  } else if (scrut3 instanceof Option.None.class) {
                    tmp26 = Parser.tracer.print("the rule doesn't have a choice starting with expressions", 664);
                    tmp27 = Parser.tracer.print(rule.display, 665);
                    return Parser.Tree.error("unexpected expression")
                  } else {
                    throw new globalThis.Error("match error");
                  }
                }
              } else {
                reserve = scrut2;
                scrut3 = rule.exprChoice;
                if (scrut3 instanceof Option.Some.class) {
                  param02 = scrut3.value;
                  if (globalThis.Array.isArray(param02) && param02.length === 2) {
                    first0 = param02[0];
                    first1 = param02[1];
                    process = first0;
                    rest = first1;
                    tmp28 = parseRule(prec, rest, opened);
                    rhs = tmp28;
                    tmp29 = Parser.Tree.summary(rhs);
                    tmp30 = "the result from sub-rule: " + tmp29;
                    tmp31 = Parser.tracer.print(tmp30, 660);
                    tmp32 = Parser.Tree.summary(reserve);
                    tmp33 = "the reserved expression: " + tmp32;
                    tmp34 = Parser.tracer.print(tmp33, 661);
                    return runtime.safeCall(process(reserve, rhs))
                  } else {
                    throw new globalThis.Error("match error");
                  }
                } else if (scrut3 instanceof Option.None.class) {
                  tmp35 = Parser.tracer.print("the rule doesn't have a choice starting with expressions", 664);
                  tmp36 = Parser.tracer.print(rule.display, 665);
                  return Parser.Tree.error("unexpected expression")
                } else {
                  throw new globalThis.Error("match error");
                }
              }
            }
          } else if (param01 instanceof Lexer.Token.Identifier.class) {
            param05 = param01.name;
            param12 = param01.symbolic;
            name1 = param05;
            tmp37 = "check if \"" + name1;
            tmp38 = tmp37 + "\" is a keyword or not";
            doTemp1 = Parser.tracer.print(tmp38, 636);
            scrut5 = runtime.safeCall(Parser.keywords.get(name1));
            if (scrut5 instanceof Option.Some.class) {
              param06 = scrut5.value;
              keyword2 = param06;
              scrut6 = runtime.safeCall(rule.keywordChoices.get(name1));
              if (scrut6 instanceof Option.Some.class) {
                param08 = scrut6.value;
                rule1 = param08;
                tmp39 = "found a rule starting with " + name1;
                tmp40 = Parser.tracer.print(tmp39, 640);
                tmp41 = consume();
                tmp42 = Parser.orMaxPrec(keyword2.rightPrec);
                return parseRule(tmp42, rule1, opened)
              } else if (scrut6 instanceof Option.None.class) {
                tmp43 = "no rule starting with " + name1;
                tmp44 = tmp43 + " was found";
                tmp45 = Parser.tracer.print(tmp44, 644);
                tmp46 = simpleExpr(prec, opened);
                expr = tmp46;
                scrut7 = rule.exprChoice;
                if (scrut7 instanceof Option.Some.class) {
                  param07 = scrut7.value;
                  if (globalThis.Array.isArray(param07) && param07.length === 2) {
                    first01 = param07[0];
                    first11 = param07[1];
                    process1 = first01;
                    rest1 = first11;
                    tmp47 = parseRule(prec, rest1, opened);
                    rhs1 = tmp47;
                    return runtime.safeCall(process1(expr, rhs1))
                  } else {
                    throw new globalThis.Error("match error");
                  }
                } else if (scrut7 instanceof Option.None.class) {
                  return Parser.Tree.Error(expr, "unexpected expression")
                } else {
                  throw new globalThis.Error("match error");
                }
              } else {
                tmp48 = "\"" + name1;
                tmp49 = tmp48 + "\" is not a keyword";
                doTemp2 = Parser.tracer.print(tmp49, 651);
                other = param01;
                tmp50 = Lexer.Token.preview(current);
                tmp51 = "try parse an expression from " + tmp50;
                doTemp = Parser.tracer.print(tmp51, 653);
                scrut2 = simpleExpr(prec, opened);
                if (scrut2 instanceof Parser.Tree.Error.class) {
                  param03 = scrut2.tree;
                  param11 = scrut2.message;
                  if (param03 instanceof Parser.Tree.Empty.class) {
                    scrut4 = rule.endChoice;
                    if (scrut4 instanceof Option.Some.class) {
                      param04 = scrut4.value;
                      value1 = param04;
                      return value1
                    } else {
                      reserve = scrut2;
                      scrut3 = rule.exprChoice;
                      if (scrut3 instanceof Option.Some.class) {
                        param02 = scrut3.value;
                        if (globalThis.Array.isArray(param02) && param02.length === 2) {
                          first0 = param02[0];
                          first1 = param02[1];
                          process = first0;
                          rest = first1;
                          tmp52 = parseRule(prec, rest, opened);
                          rhs = tmp52;
                          tmp53 = Parser.Tree.summary(rhs);
                          tmp54 = "the result from sub-rule: " + tmp53;
                          tmp55 = Parser.tracer.print(tmp54, 660);
                          tmp56 = Parser.Tree.summary(reserve);
                          tmp57 = "the reserved expression: " + tmp56;
                          tmp58 = Parser.tracer.print(tmp57, 661);
                          return runtime.safeCall(process(reserve, rhs))
                        } else {
                          throw new globalThis.Error("match error");
                        }
                      } else if (scrut3 instanceof Option.None.class) {
                        tmp59 = Parser.tracer.print("the rule doesn't have a choice starting with expressions", 664);
                        tmp60 = Parser.tracer.print(rule.display, 665);
                        return Parser.Tree.error("unexpected expression")
                      } else {
                        throw new globalThis.Error("match error");
                      }
                    }
                  } else {
                    reserve = scrut2;
                    scrut3 = rule.exprChoice;
                    if (scrut3 instanceof Option.Some.class) {
                      param02 = scrut3.value;
                      if (globalThis.Array.isArray(param02) && param02.length === 2) {
                        first0 = param02[0];
                        first1 = param02[1];
                        process = first0;
                        rest = first1;
                        tmp61 = parseRule(prec, rest, opened);
                        rhs = tmp61;
                        tmp62 = Parser.Tree.summary(rhs);
                        tmp63 = "the result from sub-rule: " + tmp62;
                        tmp64 = Parser.tracer.print(tmp63, 660);
                        tmp65 = Parser.Tree.summary(reserve);
                        tmp66 = "the reserved expression: " + tmp65;
                        tmp67 = Parser.tracer.print(tmp66, 661);
                        return runtime.safeCall(process(reserve, rhs))
                      } else {
                        throw new globalThis.Error("match error");
                      }
                    } else if (scrut3 instanceof Option.None.class) {
                      tmp68 = Parser.tracer.print("the rule doesn't have a choice starting with expressions", 664);
                      tmp69 = Parser.tracer.print(rule.display, 665);
                      return Parser.Tree.error("unexpected expression")
                    } else {
                      throw new globalThis.Error("match error");
                    }
                  }
                } else {
                  reserve = scrut2;
                  scrut3 = rule.exprChoice;
                  if (scrut3 instanceof Option.Some.class) {
                    param02 = scrut3.value;
                    if (globalThis.Array.isArray(param02) && param02.length === 2) {
                      first0 = param02[0];
                      first1 = param02[1];
                      process = first0;
                      rest = first1;
                      tmp70 = parseRule(prec, rest, opened);
                      rhs = tmp70;
                      tmp71 = Parser.Tree.summary(rhs);
                      tmp72 = "the result from sub-rule: " + tmp71;
                      tmp73 = Parser.tracer.print(tmp72, 660);
                      tmp74 = Parser.Tree.summary(reserve);
                      tmp75 = "the reserved expression: " + tmp74;
                      tmp76 = Parser.tracer.print(tmp75, 661);
                      return runtime.safeCall(process(reserve, rhs))
                    } else {
                      throw new globalThis.Error("match error");
                    }
                  } else if (scrut3 instanceof Option.None.class) {
                    tmp77 = Parser.tracer.print("the rule doesn't have a choice starting with expressions", 664);
                    tmp78 = Parser.tracer.print(rule.display, 665);
                    return Parser.Tree.error("unexpected expression")
                  } else {
                    throw new globalThis.Error("match error");
                  }
                }
              }
            } else {
              tmp79 = "\"" + name1;
              tmp80 = tmp79 + "\" is not a keyword";
              doTemp2 = Parser.tracer.print(tmp80, 651);
              other = param01;
              tmp81 = Lexer.Token.preview(current);
              tmp82 = "try parse an expression from " + tmp81;
              doTemp = Parser.tracer.print(tmp82, 653);
              scrut2 = simpleExpr(prec, opened);
              if (scrut2 instanceof Parser.Tree.Error.class) {
                param03 = scrut2.tree;
                param11 = scrut2.message;
                if (param03 instanceof Parser.Tree.Empty.class) {
                  scrut4 = rule.endChoice;
                  if (scrut4 instanceof Option.Some.class) {
                    param04 = scrut4.value;
                    value1 = param04;
                    return value1
                  } else {
                    reserve = scrut2;
                    scrut3 = rule.exprChoice;
                    if (scrut3 instanceof Option.Some.class) {
                      param02 = scrut3.value;
                      if (globalThis.Array.isArray(param02) && param02.length === 2) {
                        first0 = param02[0];
                        first1 = param02[1];
                        process = first0;
                        rest = first1;
                        tmp83 = parseRule(prec, rest, opened);
                        rhs = tmp83;
                        tmp84 = Parser.Tree.summary(rhs);
                        tmp85 = "the result from sub-rule: " + tmp84;
                        tmp86 = Parser.tracer.print(tmp85, 660);
                        tmp87 = Parser.Tree.summary(reserve);
                        tmp88 = "the reserved expression: " + tmp87;
                        tmp89 = Parser.tracer.print(tmp88, 661);
                        return runtime.safeCall(process(reserve, rhs))
                      } else {
                        throw new globalThis.Error("match error");
                      }
                    } else if (scrut3 instanceof Option.None.class) {
                      tmp90 = Parser.tracer.print("the rule doesn't have a choice starting with expressions", 664);
                      tmp91 = Parser.tracer.print(rule.display, 665);
                      return Parser.Tree.error("unexpected expression")
                    } else {
                      throw new globalThis.Error("match error");
                    }
                  }
                } else {
                  reserve = scrut2;
                  scrut3 = rule.exprChoice;
                  if (scrut3 instanceof Option.Some.class) {
                    param02 = scrut3.value;
                    if (globalThis.Array.isArray(param02) && param02.length === 2) {
                      first0 = param02[0];
                      first1 = param02[1];
                      process = first0;
                      rest = first1;
                      tmp92 = parseRule(prec, rest, opened);
                      rhs = tmp92;
                      tmp93 = Parser.Tree.summary(rhs);
                      tmp94 = "the result from sub-rule: " + tmp93;
                      tmp95 = Parser.tracer.print(tmp94, 660);
                      tmp96 = Parser.Tree.summary(reserve);
                      tmp97 = "the reserved expression: " + tmp96;
                      tmp98 = Parser.tracer.print(tmp97, 661);
                      return runtime.safeCall(process(reserve, rhs))
                    } else {
                      throw new globalThis.Error("match error");
                    }
                  } else if (scrut3 instanceof Option.None.class) {
                    tmp99 = Parser.tracer.print("the rule doesn't have a choice starting with expressions", 664);
                    tmp100 = Parser.tracer.print(rule.display, 665);
                    return Parser.Tree.error("unexpected expression")
                  } else {
                    throw new globalThis.Error("match error");
                  }
                }
              } else {
                reserve = scrut2;
                scrut3 = rule.exprChoice;
                if (scrut3 instanceof Option.Some.class) {
                  param02 = scrut3.value;
                  if (globalThis.Array.isArray(param02) && param02.length === 2) {
                    first0 = param02[0];
                    first1 = param02[1];
                    process = first0;
                    rest = first1;
                    tmp101 = parseRule(prec, rest, opened);
                    rhs = tmp101;
                    tmp102 = Parser.Tree.summary(rhs);
                    tmp103 = "the result from sub-rule: " + tmp102;
                    tmp104 = Parser.tracer.print(tmp103, 660);
                    tmp105 = Parser.Tree.summary(reserve);
                    tmp106 = "the reserved expression: " + tmp105;
                    tmp107 = Parser.tracer.print(tmp106, 661);
                    return runtime.safeCall(process(reserve, rhs))
                  } else {
                    throw new globalThis.Error("match error");
                  }
                } else if (scrut3 instanceof Option.None.class) {
                  tmp108 = Parser.tracer.print("the rule doesn't have a choice starting with expressions", 664);
                  tmp109 = Parser.tracer.print(rule.display, 665);
                  return Parser.Tree.error("unexpected expression")
                } else {
                  throw new globalThis.Error("match error");
                }
              }
            }
          } else {
            other = param01;
            tmp110 = Lexer.Token.preview(current);
            tmp111 = "try parse an expression from " + tmp110;
            doTemp = Parser.tracer.print(tmp111, 653);
            scrut2 = simpleExpr(prec, opened);
            if (scrut2 instanceof Parser.Tree.Error.class) {
              param03 = scrut2.tree;
              param11 = scrut2.message;
              if (param03 instanceof Parser.Tree.Empty.class) {
                scrut4 = rule.endChoice;
                if (scrut4 instanceof Option.Some.class) {
                  param04 = scrut4.value;
                  value1 = param04;
                  return value1
                } else {
                  reserve = scrut2;
                  scrut3 = rule.exprChoice;
                  if (scrut3 instanceof Option.Some.class) {
                    param02 = scrut3.value;
                    if (globalThis.Array.isArray(param02) && param02.length === 2) {
                      first0 = param02[0];
                      first1 = param02[1];
                      process = first0;
                      rest = first1;
                      tmp112 = parseRule(prec, rest, opened);
                      rhs = tmp112;
                      tmp113 = Parser.Tree.summary(rhs);
                      tmp114 = "the result from sub-rule: " + tmp113;
                      tmp115 = Parser.tracer.print(tmp114, 660);
                      tmp116 = Parser.Tree.summary(reserve);
                      tmp117 = "the reserved expression: " + tmp116;
                      tmp118 = Parser.tracer.print(tmp117, 661);
                      return runtime.safeCall(process(reserve, rhs))
                    } else {
                      throw new globalThis.Error("match error");
                    }
                  } else if (scrut3 instanceof Option.None.class) {
                    tmp119 = Parser.tracer.print("the rule doesn't have a choice starting with expressions", 664);
                    tmp120 = Parser.tracer.print(rule.display, 665);
                    return Parser.Tree.error("unexpected expression")
                  } else {
                    throw new globalThis.Error("match error");
                  }
                }
              } else {
                reserve = scrut2;
                scrut3 = rule.exprChoice;
                if (scrut3 instanceof Option.Some.class) {
                  param02 = scrut3.value;
                  if (globalThis.Array.isArray(param02) && param02.length === 2) {
                    first0 = param02[0];
                    first1 = param02[1];
                    process = first0;
                    rest = first1;
                    tmp121 = parseRule(prec, rest, opened);
                    rhs = tmp121;
                    tmp122 = Parser.Tree.summary(rhs);
                    tmp123 = "the result from sub-rule: " + tmp122;
                    tmp124 = Parser.tracer.print(tmp123, 660);
                    tmp125 = Parser.Tree.summary(reserve);
                    tmp126 = "the reserved expression: " + tmp125;
                    tmp127 = Parser.tracer.print(tmp126, 661);
                    return runtime.safeCall(process(reserve, rhs))
                  } else {
                    throw new globalThis.Error("match error");
                  }
                } else if (scrut3 instanceof Option.None.class) {
                  tmp128 = Parser.tracer.print("the rule doesn't have a choice starting with expressions", 664);
                  tmp129 = Parser.tracer.print(rule.display, 665);
                  return Parser.Tree.error("unexpected expression")
                } else {
                  throw new globalThis.Error("match error");
                }
              }
            } else {
              reserve = scrut2;
              scrut3 = rule.exprChoice;
              if (scrut3 instanceof Option.Some.class) {
                param02 = scrut3.value;
                if (globalThis.Array.isArray(param02) && param02.length === 2) {
                  first0 = param02[0];
                  first1 = param02[1];
                  process = first0;
                  rest = first1;
                  tmp130 = parseRule(prec, rest, opened);
                  rhs = tmp130;
                  tmp131 = Parser.Tree.summary(rhs);
                  tmp132 = "the result from sub-rule: " + tmp131;
                  tmp133 = Parser.tracer.print(tmp132, 660);
                  tmp134 = Parser.Tree.summary(reserve);
                  tmp135 = "the reserved expression: " + tmp134;
                  tmp136 = Parser.tracer.print(tmp135, 661);
                  return runtime.safeCall(process(reserve, rhs))
                } else {
                  throw new globalThis.Error("match error");
                }
              } else if (scrut3 instanceof Option.None.class) {
                tmp137 = Parser.tracer.print("the rule doesn't have a choice starting with expressions", 664);
                tmp138 = Parser.tracer.print(rule.display, 665);
                return Parser.Tree.error("unexpected expression")
              } else {
                throw new globalThis.Error("match error");
              }
            }
          }
        } else if (scrut instanceof Stack.Nil.class) {
          scrut1 = rule.endChoice;
          if (scrut1 instanceof Option.Some.class) {
            param0 = scrut1.value;
            value = param0;
            return value
          } else if (scrut1 instanceof Option.None.class) {
            return Parser.Tree.error("unexpected EOF")
          } else {
            throw new globalThis.Error("match error");
          }
        } else {
          throw new globalThis.Error("match error");
        }
      };
      return runtime.safeCall(Parser.tracer.trace(tmp2, (result) => {
        let tmp4;
        tmp4 = Parser.Tree.summary(result);
        return "parsed: " + tmp4
      }, tmp3))
    };
    simpleExpr = function simpleExpr(prec, bracket) {
      let tmp, tmp1, tmp2, tmp3, tmp4;
      tmp = "simple expression <<< " + prec;
      tmp1 = tmp + " ";
      tmp2 = Lexer.Token.preview(current);
      tmp3 = tmp1 + tmp2;
      tmp4 = () => {
        let scrut, param0, param1, token, param01, kind, param02, kind$_, scrut1, param03, kind1, content, content1, scrut2, param04, param11, token1, message, param05, kind$_1, scrut3, param06, param12, kind2, literal, param07, param13, name1, symbolic, scrut4, param08, keyword2, scrut5, param09, rule, acc, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20, tmp21, tmp22, tmp23, tmp24, tmp25, tmp26, tmp27, tmp28;
        tmp5 = yeetSpaces();
        scrut = tmp5;
        if (scrut instanceof Stack.Cons.class) {
          param0 = scrut.head;
          param1 = scrut.tail;
          if (param0 instanceof Lexer.Token.Identifier.class) {
            param07 = param0.name;
            param13 = param0.symbolic;
            name1 = param07;
            symbolic = param13;
            scrut4 = runtime.safeCall(Parser.keywords.get(name1));
            if (scrut4 instanceof Option.Some.class) {
              param08 = scrut4.value;
              keyword2 = param08;
              scrut5 = runtime.safeCall(Parser.prefixRules.keywordChoices.get(name1));
              if (scrut5 instanceof Option.Some.class) {
                param09 = scrut5.value;
                rule = param09;
                tmp6 = consume();
                tmp7 = Parser.orMaxPrec(keyword2.rightPrec);
                tmp8 = parseRule(tmp7, rule, bracket);
                acc = tmp8;
                return exprCont(acc, prec, bracket)
              } else if (scrut5 instanceof Option.None.class) {
                tmp9 = "no rule starting with " + name1;
                tmp10 = Parser.tracer.print(tmp9, 683);
                return Parser.Tree.empty
              } else {
                token = param0;
                tmp11 = "unrecognized token: " + token;
                return Parser.Tree.error(tmp11)
              }
            } else if (scrut4 instanceof Option.None.class) {
              tmp12 = consume();
              tmp13 = Parser.Tree.Ident(name1, symbolic);
              return exprCont(tmp13, prec, bracket)
            } else {
              token = param0;
              tmp14 = "unrecognized token: " + token;
              return Parser.Tree.error(tmp14)
            }
          } else if (param0 instanceof Lexer.Token.Literal.class) {
            param06 = param0.kind;
            param12 = param0.literal;
            kind2 = param06;
            literal = param12;
            tmp15 = consume();
            tmp16 = Parser.Tree.Literal(kind2, literal);
            return exprCont(tmp16, prec, bracket)
          } else if (param0 instanceof Lexer.Token.Open.class) {
            param03 = param0.kind;
            kind1 = param03;
            tmp17 = consume();
            tmp18 = Option.Some(kind1);
            content1 = simpleExpr(0, tmp18);
            tmp19 = yeetSpaces();
            scrut2 = tmp19;
            if (scrut2 instanceof Stack.Cons.class) {
              param04 = scrut2.head;
              param11 = scrut2.tail;
              if (param04 instanceof Lexer.Token.Close.class) {
                param05 = param04.kind;
                kind$_1 = param05;
                scrut3 = kind1 == kind$_1;
                if (scrut3 === true) {
                  tmp20 = consume();
                  tmp21 = content1;
                } else {
                  tmp21 = Parser.Tree.Error(content1, "mismatched brackets");
                }
              } else {
                token1 = param04;
                tmp22 = "expect a close bracket instead of " + token1;
                message = tmp22;
                tmp23 = Parser.tracer.print(message, 704);
                tmp21 = Parser.Tree.Error(content1, message);
              }
            } else if (scrut2 instanceof Stack.Nil.class) {
              tmp24 = Parser.tracer.print("expect a close bracket instead of EOF", 707);
              tmp21 = Parser.Tree.Error(content1, "expect a close bracket instead of EOF");
            } else {
              throw new globalThis.Error("match error");
            }
            content = tmp21;
            return exprCont(content, prec, bracket)
          } else if (param0 instanceof Lexer.Token.Close.class) {
            param01 = param0.kind;
            kind = param01;
            if (bracket instanceof Option.Some.class) {
              param02 = bracket.value;
              kind$_ = param02;
              scrut1 = kind == kind$_;
              if (scrut1 === true) {
                tmp25 = consume();
                return Parser.Tree.Empty()
              } else {
                return Parser.Tree.error("mismatched brackets")
              }
            } else if (bracket instanceof Option.None.class) {
              tmp26 = Parser.tracer.print("missing close bracket", 717);
              return Parser.Tree.error("missing close bracket")
            } else {
              token = param0;
              tmp27 = "unrecognized token: " + token;
              return Parser.Tree.error(tmp27)
            }
          } else {
            token = param0;
            tmp28 = "unrecognized token: " + token;
            return Parser.Tree.error(tmp28)
          }
        } else if (scrut instanceof Stack.Nil.class) {
          return Parser.Tree.error("unexpected EOF")
        } else {
          throw new globalThis.Error("match error");
        }
      };
      return runtime.safeCall(Parser.tracer.trace(tmp3, (result) => {
        let tmp5;
        tmp5 = Parser.Tree.summary(result);
        return "simple expression >>> " + tmp5
      }, tmp4))
    };
    exprCont = function exprCont(acc, prec, bracket) {
      let scrut, doTemp, doTemp1, param0, param1, token, scrut1, scrut2, rhs, scrut3, param01, keyword2, scrut4, param02, leftPrec, scrut5, scrut6, param03, rightPrec, acc$_, scrut7, tree, param04, trees, scrut8, param05, keyword3, scrut9, param06, leftPrec1, scrut10, scrut11, param07, rightPrec1, acc$_1, scrut12, tree1, param08, trees1, param09, kind, doTemp2, param010, kind$_, scrut13, param011, param11, name1, scrut14, doTemp3, scrut15, first1, first0, leftPrec2, rightPrec2, doTemp4, scrut16, op3, rhs1, name2, scrut17, param012, keyword4, doTemp5, doTemp6, scrut18, param013, rule, doTemp7, scrut19, scrut20, param014, first11, first01, process, rest, rhs2, acc$_2, tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20, tmp21, tmp22, tmp23, tmp24, tmp25, tmp26, tmp27, tmp28, tmp29, tmp30, tmp31, tmp32, tmp33, tmp34, tmp35, tmp36, tmp37, tmp38, tmp39, tmp40, tmp41, tmp42, tmp43, tmp44, tmp45, tmp46, tmp47, tmp48, tmp49, tmp50, tmp51, tmp52, tmp53, tmp54, tmp55, tmp56, tmp57, tmp58, tmp59, tmp60, tmp61, tmp62, tmp63, tmp64, tmp65, tmp66, tmp67, tmp68, tmp69, tmp70, tmp71, tmp72, tmp73, tmp74, tmp75, tmp76, tmp77, tmp78, tmp79, tmp80, tmp81, tmp82, tmp83, tmp84, tmp85, tmp86, tmp87, tmp88, tmp89, tmp90, tmp91, tmp92, tmp93, tmp94, tmp95, tmp96, tmp97, tmp98, tmp99, tmp100, tmp101, tmp102, tmp103, tmp104, tmp105, tmp106, tmp107, tmp108, tmp109, tmp110, tmp111, tmp112, tmp113, tmp114, tmp115, tmp116, tmp117, tmp118, tmp119, tmp120, tmp121, tmp122, tmp123, tmp124, tmp125, tmp126, tmp127, tmp128, tmp129, tmp130, tmp131, tmp132, tmp133, tmp134, tmp135, tmp136, tmp137, tmp138, tmp139, tmp140, tmp141, tmp142, tmp143, tmp144, tmp145, tmp146, tmp147, tmp148, tmp149, tmp150, tmp151, tmp152, tmp153, tmp154, tmp155, tmp156, tmp157, tmp158, tmp159, tmp160, tmp161, tmp162, tmp163, tmp164, tmp165;
      tmp = yeetSpaces();
      scrut = tmp;
      tmp1 = ">>> exprCont " + prec;
      tmp2 = tmp1 + " ";
      tmp3 = Parser.Tree.summary(acc);
      tmp4 = tmp2 + tmp3;
      tmp5 = tmp4 + " <<<";
      doTemp = Parser.tracer.print(tmp5, 723);
      if (scrut instanceof Stack.Cons.class) {
        param0 = scrut.head;
        param1 = scrut.tail;
        if (param0 instanceof Lexer.Token.Identifier.class) {
          param011 = param0.name;
          param11 = param0.symbolic;
          name2 = param011;
          scrut17 = runtime.safeCall(Parser.keywords.get(name2));
          if (scrut17 instanceof Option.Some.class) {
            param012 = scrut17.value;
            keyword4 = param012;
            tmp6 = "found a keyword: " + name2;
            doTemp5 = Parser.tracer.print(tmp6, 725);
            scrut18 = runtime.safeCall(Parser.infixRules.keywordChoices.get(name2));
            if (scrut18 instanceof Option.Some.class) {
              param013 = scrut18.value;
              rule = param013;
              tmp7 = "found an infix keyword " + name2;
              doTemp7 = Parser.tracer.print(tmp7, 727);
              scrut19 = keyword4.leftPrecOrMin > prec;
              if (scrut19 === true) {
                scrut20 = rule.exprChoice;
                if (scrut20 instanceof Option.Some.class) {
                  param014 = scrut20.value;
                  if (globalThis.Array.isArray(param014) && param014.length === 2) {
                    first01 = param014[0];
                    first11 = param014[1];
                    process = first01;
                    rest = first11;
                    tmp8 = consume();
                    tmp9 = simpleExpr(keyword4.rightPrecOrMin, bracket);
                    rhs2 = tmp9;
                    tmp10 = Parser.Tree.Infix(keyword4, acc, rhs2);
                    acc$_2 = tmp10;
                    return exprCont(acc$_2, prec, bracket)
                  } else {
                    tmp11 = "keyword `" + name2;
                    tmp12 = tmp11 + "` does not have infix rules";
                    doTemp6 = Parser.tracer.print(tmp12, 735);
                    name1 = param011;
                    if (param11 === true) {
                      scrut14 = runtime.safeCall(Parser.keywords.get(name1));
                      if (scrut14 instanceof Option.None.class) {
                        tmp13 = "found an operator \"" + name1;
                        tmp14 = tmp13 + "\"";
                        doTemp3 = Parser.tracer.print(tmp14, 737);
                        scrut15 = Parser.opPrec(name1);
                        if (globalThis.Array.isArray(scrut15) && scrut15.length === 2) {
                          first0 = scrut15[0];
                          first1 = scrut15[1];
                          leftPrec2 = first0;
                          rightPrec2 = first1;
                          tmp15 = "its precedence is " + leftPrec2;
                          doTemp4 = Parser.tracer.print(tmp15, 739);
                          scrut16 = leftPrec2 > prec;
                          if (scrut16 === true) {
                            tmp16 = consume();
                            tmp17 = Parser.Tree.Ident(name1, true);
                            op3 = tmp17;
                            tmp18 = simpleExpr(rightPrec2, bracket);
                            rhs1 = tmp18;
                            tmp19 = Stack.Cons(rhs1, Stack.Nil);
                            tmp20 = Stack.Cons(acc, tmp19);
                            tmp21 = Parser.Tree.App(op3, tmp20);
                            return exprCont(tmp21, prec, bracket)
                          } else {
                            return acc
                          }
                        } else {
                          token = param0;
                          scrut1 = Parser.#appPrec > prec;
                          if (scrut1 === true) {
                            tmp22 = Parser.tracer.print("found an application", 783);
                            scrut2 = simpleExpr(Parser.#appPrec, bracket);
                            if (scrut2 instanceof Parser.Tree.Empty.class) {
                              return acc
                            } else if (scrut2 instanceof Parser.Tree.Error.class) {
                              return acc
                            } else {
                              rhs = scrut2;
                              tmp23 = Stack.Cons(rhs, Stack.Nil);
                              tmp24 = Parser.Tree.App(acc, tmp23);
                              return exprCont(tmp24, prec, bracket)
                            }
                          } else {
                            tmp25 = "cannot consume " + token;
                            tmp26 = Parser.tracer.print(tmp25, 789);
                            return acc
                          }
                        }
                      } else {
                        token = param0;
                        scrut1 = Parser.#appPrec > prec;
                        if (scrut1 === true) {
                          tmp27 = Parser.tracer.print("found an application", 783);
                          scrut2 = simpleExpr(Parser.#appPrec, bracket);
                          if (scrut2 instanceof Parser.Tree.Empty.class) {
                            return acc
                          } else if (scrut2 instanceof Parser.Tree.Error.class) {
                            return acc
                          } else {
                            rhs = scrut2;
                            tmp28 = Stack.Cons(rhs, Stack.Nil);
                            tmp29 = Parser.Tree.App(acc, tmp28);
                            return exprCont(tmp29, prec, bracket)
                          }
                        } else {
                          tmp30 = "cannot consume " + token;
                          tmp31 = Parser.tracer.print(tmp30, 789);
                          return acc
                        }
                      }
                    } else {
                      token = param0;
                      scrut1 = Parser.#appPrec > prec;
                      if (scrut1 === true) {
                        tmp32 = Parser.tracer.print("found an application", 783);
                        scrut2 = simpleExpr(Parser.#appPrec, bracket);
                        if (scrut2 instanceof Parser.Tree.Empty.class) {
                          return acc
                        } else if (scrut2 instanceof Parser.Tree.Error.class) {
                          return acc
                        } else {
                          rhs = scrut2;
                          tmp33 = Stack.Cons(rhs, Stack.Nil);
                          tmp34 = Parser.Tree.App(acc, tmp33);
                          return exprCont(tmp34, prec, bracket)
                        }
                      } else {
                        tmp35 = "cannot consume " + token;
                        tmp36 = Parser.tracer.print(tmp35, 789);
                        return acc
                      }
                    }
                  }
                } else if (scrut20 instanceof Option.None.class) {
                  return acc
                } else {
                  tmp37 = "keyword `" + name2;
                  tmp38 = tmp37 + "` does not have infix rules";
                  doTemp6 = Parser.tracer.print(tmp38, 735);
                  name1 = param011;
                  if (param11 === true) {
                    scrut14 = runtime.safeCall(Parser.keywords.get(name1));
                    if (scrut14 instanceof Option.None.class) {
                      tmp39 = "found an operator \"" + name1;
                      tmp40 = tmp39 + "\"";
                      doTemp3 = Parser.tracer.print(tmp40, 737);
                      scrut15 = Parser.opPrec(name1);
                      if (globalThis.Array.isArray(scrut15) && scrut15.length === 2) {
                        first0 = scrut15[0];
                        first1 = scrut15[1];
                        leftPrec2 = first0;
                        rightPrec2 = first1;
                        tmp41 = "its precedence is " + leftPrec2;
                        doTemp4 = Parser.tracer.print(tmp41, 739);
                        scrut16 = leftPrec2 > prec;
                        if (scrut16 === true) {
                          tmp42 = consume();
                          tmp43 = Parser.Tree.Ident(name1, true);
                          op3 = tmp43;
                          tmp44 = simpleExpr(rightPrec2, bracket);
                          rhs1 = tmp44;
                          tmp45 = Stack.Cons(rhs1, Stack.Nil);
                          tmp46 = Stack.Cons(acc, tmp45);
                          tmp47 = Parser.Tree.App(op3, tmp46);
                          return exprCont(tmp47, prec, bracket)
                        } else {
                          return acc
                        }
                      } else {
                        token = param0;
                        scrut1 = Parser.#appPrec > prec;
                        if (scrut1 === true) {
                          tmp48 = Parser.tracer.print("found an application", 783);
                          scrut2 = simpleExpr(Parser.#appPrec, bracket);
                          if (scrut2 instanceof Parser.Tree.Empty.class) {
                            return acc
                          } else if (scrut2 instanceof Parser.Tree.Error.class) {
                            return acc
                          } else {
                            rhs = scrut2;
                            tmp49 = Stack.Cons(rhs, Stack.Nil);
                            tmp50 = Parser.Tree.App(acc, tmp49);
                            return exprCont(tmp50, prec, bracket)
                          }
                        } else {
                          tmp51 = "cannot consume " + token;
                          tmp52 = Parser.tracer.print(tmp51, 789);
                          return acc
                        }
                      }
                    } else {
                      token = param0;
                      scrut1 = Parser.#appPrec > prec;
                      if (scrut1 === true) {
                        tmp53 = Parser.tracer.print("found an application", 783);
                        scrut2 = simpleExpr(Parser.#appPrec, bracket);
                        if (scrut2 instanceof Parser.Tree.Empty.class) {
                          return acc
                        } else if (scrut2 instanceof Parser.Tree.Error.class) {
                          return acc
                        } else {
                          rhs = scrut2;
                          tmp54 = Stack.Cons(rhs, Stack.Nil);
                          tmp55 = Parser.Tree.App(acc, tmp54);
                          return exprCont(tmp55, prec, bracket)
                        }
                      } else {
                        tmp56 = "cannot consume " + token;
                        tmp57 = Parser.tracer.print(tmp56, 789);
                        return acc
                      }
                    }
                  } else {
                    token = param0;
                    scrut1 = Parser.#appPrec > prec;
                    if (scrut1 === true) {
                      tmp58 = Parser.tracer.print("found an application", 783);
                      scrut2 = simpleExpr(Parser.#appPrec, bracket);
                      if (scrut2 instanceof Parser.Tree.Empty.class) {
                        return acc
                      } else if (scrut2 instanceof Parser.Tree.Error.class) {
                        return acc
                      } else {
                        rhs = scrut2;
                        tmp59 = Stack.Cons(rhs, Stack.Nil);
                        tmp60 = Parser.Tree.App(acc, tmp59);
                        return exprCont(tmp60, prec, bracket)
                      }
                    } else {
                      tmp61 = "cannot consume " + token;
                      tmp62 = Parser.tracer.print(tmp61, 789);
                      return acc
                    }
                  }
                }
              } else {
                tmp63 = "keyword `" + name2;
                tmp64 = tmp63 + "` does not have infix rules";
                doTemp6 = Parser.tracer.print(tmp64, 735);
                name1 = param011;
                if (param11 === true) {
                  scrut14 = runtime.safeCall(Parser.keywords.get(name1));
                  if (scrut14 instanceof Option.None.class) {
                    tmp65 = "found an operator \"" + name1;
                    tmp66 = tmp65 + "\"";
                    doTemp3 = Parser.tracer.print(tmp66, 737);
                    scrut15 = Parser.opPrec(name1);
                    if (globalThis.Array.isArray(scrut15) && scrut15.length === 2) {
                      first0 = scrut15[0];
                      first1 = scrut15[1];
                      leftPrec2 = first0;
                      rightPrec2 = first1;
                      tmp67 = "its precedence is " + leftPrec2;
                      doTemp4 = Parser.tracer.print(tmp67, 739);
                      scrut16 = leftPrec2 > prec;
                      if (scrut16 === true) {
                        tmp68 = consume();
                        tmp69 = Parser.Tree.Ident(name1, true);
                        op3 = tmp69;
                        tmp70 = simpleExpr(rightPrec2, bracket);
                        rhs1 = tmp70;
                        tmp71 = Stack.Cons(rhs1, Stack.Nil);
                        tmp72 = Stack.Cons(acc, tmp71);
                        tmp73 = Parser.Tree.App(op3, tmp72);
                        return exprCont(tmp73, prec, bracket)
                      } else {
                        return acc
                      }
                    } else {
                      token = param0;
                      scrut1 = Parser.#appPrec > prec;
                      if (scrut1 === true) {
                        tmp74 = Parser.tracer.print("found an application", 783);
                        scrut2 = simpleExpr(Parser.#appPrec, bracket);
                        if (scrut2 instanceof Parser.Tree.Empty.class) {
                          return acc
                        } else if (scrut2 instanceof Parser.Tree.Error.class) {
                          return acc
                        } else {
                          rhs = scrut2;
                          tmp75 = Stack.Cons(rhs, Stack.Nil);
                          tmp76 = Parser.Tree.App(acc, tmp75);
                          return exprCont(tmp76, prec, bracket)
                        }
                      } else {
                        tmp77 = "cannot consume " + token;
                        tmp78 = Parser.tracer.print(tmp77, 789);
                        return acc
                      }
                    }
                  } else {
                    token = param0;
                    scrut1 = Parser.#appPrec > prec;
                    if (scrut1 === true) {
                      tmp79 = Parser.tracer.print("found an application", 783);
                      scrut2 = simpleExpr(Parser.#appPrec, bracket);
                      if (scrut2 instanceof Parser.Tree.Empty.class) {
                        return acc
                      } else if (scrut2 instanceof Parser.Tree.Error.class) {
                        return acc
                      } else {
                        rhs = scrut2;
                        tmp80 = Stack.Cons(rhs, Stack.Nil);
                        tmp81 = Parser.Tree.App(acc, tmp80);
                        return exprCont(tmp81, prec, bracket)
                      }
                    } else {
                      tmp82 = "cannot consume " + token;
                      tmp83 = Parser.tracer.print(tmp82, 789);
                      return acc
                    }
                  }
                } else {
                  token = param0;
                  scrut1 = Parser.#appPrec > prec;
                  if (scrut1 === true) {
                    tmp84 = Parser.tracer.print("found an application", 783);
                    scrut2 = simpleExpr(Parser.#appPrec, bracket);
                    if (scrut2 instanceof Parser.Tree.Empty.class) {
                      return acc
                    } else if (scrut2 instanceof Parser.Tree.Error.class) {
                      return acc
                    } else {
                      rhs = scrut2;
                      tmp85 = Stack.Cons(rhs, Stack.Nil);
                      tmp86 = Parser.Tree.App(acc, tmp85);
                      return exprCont(tmp86, prec, bracket)
                    }
                  } else {
                    tmp87 = "cannot consume " + token;
                    tmp88 = Parser.tracer.print(tmp87, 789);
                    return acc
                  }
                }
              }
            } else {
              tmp89 = "keyword `" + name2;
              tmp90 = tmp89 + "` does not have infix rules";
              doTemp6 = Parser.tracer.print(tmp90, 735);
              name1 = param011;
              if (param11 === true) {
                scrut14 = runtime.safeCall(Parser.keywords.get(name1));
                if (scrut14 instanceof Option.None.class) {
                  tmp91 = "found an operator \"" + name1;
                  tmp92 = tmp91 + "\"";
                  doTemp3 = Parser.tracer.print(tmp92, 737);
                  scrut15 = Parser.opPrec(name1);
                  if (globalThis.Array.isArray(scrut15) && scrut15.length === 2) {
                    first0 = scrut15[0];
                    first1 = scrut15[1];
                    leftPrec2 = first0;
                    rightPrec2 = first1;
                    tmp93 = "its precedence is " + leftPrec2;
                    doTemp4 = Parser.tracer.print(tmp93, 739);
                    scrut16 = leftPrec2 > prec;
                    if (scrut16 === true) {
                      tmp94 = consume();
                      tmp95 = Parser.Tree.Ident(name1, true);
                      op3 = tmp95;
                      tmp96 = simpleExpr(rightPrec2, bracket);
                      rhs1 = tmp96;
                      tmp97 = Stack.Cons(rhs1, Stack.Nil);
                      tmp98 = Stack.Cons(acc, tmp97);
                      tmp99 = Parser.Tree.App(op3, tmp98);
                      return exprCont(tmp99, prec, bracket)
                    } else {
                      return acc
                    }
                  } else {
                    token = param0;
                    scrut1 = Parser.#appPrec > prec;
                    if (scrut1 === true) {
                      tmp100 = Parser.tracer.print("found an application", 783);
                      scrut2 = simpleExpr(Parser.#appPrec, bracket);
                      if (scrut2 instanceof Parser.Tree.Empty.class) {
                        return acc
                      } else if (scrut2 instanceof Parser.Tree.Error.class) {
                        return acc
                      } else {
                        rhs = scrut2;
                        tmp101 = Stack.Cons(rhs, Stack.Nil);
                        tmp102 = Parser.Tree.App(acc, tmp101);
                        return exprCont(tmp102, prec, bracket)
                      }
                    } else {
                      tmp103 = "cannot consume " + token;
                      tmp104 = Parser.tracer.print(tmp103, 789);
                      return acc
                    }
                  }
                } else {
                  token = param0;
                  scrut1 = Parser.#appPrec > prec;
                  if (scrut1 === true) {
                    tmp105 = Parser.tracer.print("found an application", 783);
                    scrut2 = simpleExpr(Parser.#appPrec, bracket);
                    if (scrut2 instanceof Parser.Tree.Empty.class) {
                      return acc
                    } else if (scrut2 instanceof Parser.Tree.Error.class) {
                      return acc
                    } else {
                      rhs = scrut2;
                      tmp106 = Stack.Cons(rhs, Stack.Nil);
                      tmp107 = Parser.Tree.App(acc, tmp106);
                      return exprCont(tmp107, prec, bracket)
                    }
                  } else {
                    tmp108 = "cannot consume " + token;
                    tmp109 = Parser.tracer.print(tmp108, 789);
                    return acc
                  }
                }
              } else {
                token = param0;
                scrut1 = Parser.#appPrec > prec;
                if (scrut1 === true) {
                  tmp110 = Parser.tracer.print("found an application", 783);
                  scrut2 = simpleExpr(Parser.#appPrec, bracket);
                  if (scrut2 instanceof Parser.Tree.Empty.class) {
                    return acc
                  } else if (scrut2 instanceof Parser.Tree.Error.class) {
                    return acc
                  } else {
                    rhs = scrut2;
                    tmp111 = Stack.Cons(rhs, Stack.Nil);
                    tmp112 = Parser.Tree.App(acc, tmp111);
                    return exprCont(tmp112, prec, bracket)
                  }
                } else {
                  tmp113 = "cannot consume " + token;
                  tmp114 = Parser.tracer.print(tmp113, 789);
                  return acc
                }
              }
            }
          } else {
            name1 = param011;
            if (param11 === true) {
              scrut14 = runtime.safeCall(Parser.keywords.get(name1));
              if (scrut14 instanceof Option.None.class) {
                tmp115 = "found an operator \"" + name1;
                tmp116 = tmp115 + "\"";
                doTemp3 = Parser.tracer.print(tmp116, 737);
                scrut15 = Parser.opPrec(name1);
                if (globalThis.Array.isArray(scrut15) && scrut15.length === 2) {
                  first0 = scrut15[0];
                  first1 = scrut15[1];
                  leftPrec2 = first0;
                  rightPrec2 = first1;
                  tmp117 = "its precedence is " + leftPrec2;
                  doTemp4 = Parser.tracer.print(tmp117, 739);
                  scrut16 = leftPrec2 > prec;
                  if (scrut16 === true) {
                    tmp118 = consume();
                    tmp119 = Parser.Tree.Ident(name1, true);
                    op3 = tmp119;
                    tmp120 = simpleExpr(rightPrec2, bracket);
                    rhs1 = tmp120;
                    tmp121 = Stack.Cons(rhs1, Stack.Nil);
                    tmp122 = Stack.Cons(acc, tmp121);
                    tmp123 = Parser.Tree.App(op3, tmp122);
                    return exprCont(tmp123, prec, bracket)
                  } else {
                    return acc
                  }
                } else {
                  token = param0;
                  scrut1 = Parser.#appPrec > prec;
                  if (scrut1 === true) {
                    tmp124 = Parser.tracer.print("found an application", 783);
                    scrut2 = simpleExpr(Parser.#appPrec, bracket);
                    if (scrut2 instanceof Parser.Tree.Empty.class) {
                      return acc
                    } else if (scrut2 instanceof Parser.Tree.Error.class) {
                      return acc
                    } else {
                      rhs = scrut2;
                      tmp125 = Stack.Cons(rhs, Stack.Nil);
                      tmp126 = Parser.Tree.App(acc, tmp125);
                      return exprCont(tmp126, prec, bracket)
                    }
                  } else {
                    tmp127 = "cannot consume " + token;
                    tmp128 = Parser.tracer.print(tmp127, 789);
                    return acc
                  }
                }
              } else {
                token = param0;
                scrut1 = Parser.#appPrec > prec;
                if (scrut1 === true) {
                  tmp129 = Parser.tracer.print("found an application", 783);
                  scrut2 = simpleExpr(Parser.#appPrec, bracket);
                  if (scrut2 instanceof Parser.Tree.Empty.class) {
                    return acc
                  } else if (scrut2 instanceof Parser.Tree.Error.class) {
                    return acc
                  } else {
                    rhs = scrut2;
                    tmp130 = Stack.Cons(rhs, Stack.Nil);
                    tmp131 = Parser.Tree.App(acc, tmp130);
                    return exprCont(tmp131, prec, bracket)
                  }
                } else {
                  tmp132 = "cannot consume " + token;
                  tmp133 = Parser.tracer.print(tmp132, 789);
                  return acc
                }
              }
            } else {
              token = param0;
              scrut1 = Parser.#appPrec > prec;
              if (scrut1 === true) {
                tmp134 = Parser.tracer.print("found an application", 783);
                scrut2 = simpleExpr(Parser.#appPrec, bracket);
                if (scrut2 instanceof Parser.Tree.Empty.class) {
                  return acc
                } else if (scrut2 instanceof Parser.Tree.Error.class) {
                  return acc
                } else {
                  rhs = scrut2;
                  tmp135 = Stack.Cons(rhs, Stack.Nil);
                  tmp136 = Parser.Tree.App(acc, tmp135);
                  return exprCont(tmp136, prec, bracket)
                }
              } else {
                tmp137 = "cannot consume " + token;
                tmp138 = Parser.tracer.print(tmp137, 789);
                return acc
              }
            }
          }
        } else if (param0 instanceof Lexer.Token.Close.class) {
          param09 = param0.kind;
          kind = param09;
          tmp139 = "found a close bracket of " + kind;
          doTemp2 = Parser.tracer.print(tmp139, 748);
          if (bracket instanceof Option.Some.class) {
            param010 = bracket.value;
            kind$_ = param010;
            scrut13 = kind == kind$_;
            if (scrut13 === true) {
              return acc
            } else {
              return Parser.Tree.Error(acc, "mismatched brackets")
            }
          } else if (bracket instanceof Option.None.class) {
            return Parser.Tree.Error(acc, "missing close bracket")
          } else {
            token = param0;
            scrut1 = Parser.#appPrec > prec;
            if (scrut1 === true) {
              tmp140 = Parser.tracer.print("found an application", 783);
              scrut2 = simpleExpr(Parser.#appPrec, bracket);
              if (scrut2 instanceof Parser.Tree.Empty.class) {
                return acc
              } else if (scrut2 instanceof Parser.Tree.Error.class) {
                return acc
              } else {
                rhs = scrut2;
                tmp141 = Stack.Cons(rhs, Stack.Nil);
                tmp142 = Parser.Tree.App(acc, tmp141);
                return exprCont(tmp142, prec, bracket)
              }
            } else {
              tmp143 = "cannot consume " + token;
              tmp144 = Parser.tracer.print(tmp143, 789);
              return acc
            }
          }
        } else if (param0 instanceof Lexer.Token.Semicolon.class) {
          tmp145 = Parser.tracer.print("found a semicolon", 754);
          scrut8 = runtime.safeCall(Parser.keywords.get(";"));
          if (scrut8 instanceof Option.Some.class) {
            param05 = scrut8.value;
            keyword3 = param05;
            scrut9 = keyword3.leftPrec;
            if (scrut9 instanceof Option.Some.class) {
              param06 = scrut9.value;
              leftPrec1 = param06;
              scrut10 = leftPrec1 > prec;
              if (scrut10 === true) {
                tmp146 = consume();
                scrut11 = keyword3.rightPrec;
                if (scrut11 instanceof Option.Some.class) {
                  param07 = scrut11.value;
                  rightPrec1 = param07;
                  scrut12 = simpleExpr(rightPrec1, bracket);
                  if (scrut12 instanceof Parser.Tree.Sequence.class) {
                    param08 = scrut12.trees;
                    trees1 = param08;
                    tmp147 = Stack.Cons(acc, trees1);
                    tmp148 = Parser.Tree.Sequence(tmp147);
                  } else {
                    tree1 = scrut12;
                    tmp149 = Stack.Cons(tree1, Stack.Nil);
                    tmp150 = Stack.Cons(acc, tmp149);
                    tmp148 = Parser.Tree.Sequence(tmp150);
                  }
                  acc$_1 = tmp148;
                  return exprCont(acc$_1, prec, bracket)
                } else {
                  throw new globalThis.Error("match error");
                }
              } else {
                tmp151 = "cannot consume " + keyword3;
                tmp152 = Parser.tracer.print(tmp151, 765);
                return acc
              }
            } else {
              throw new globalThis.Error("match error");
            }
          } else {
            throw new globalThis.Error("match error");
          }
        } else if (param0 instanceof Lexer.Token.Comma.class) {
          tmp153 = Parser.tracer.print("found a comma", 768);
          scrut3 = runtime.safeCall(Parser.keywords.get(","));
          if (scrut3 instanceof Option.Some.class) {
            param01 = scrut3.value;
            keyword2 = param01;
            scrut4 = keyword2.leftPrec;
            if (scrut4 instanceof Option.Some.class) {
              param02 = scrut4.value;
              leftPrec = param02;
              scrut5 = leftPrec > prec;
              if (scrut5 === true) {
                tmp154 = consume();
                scrut6 = keyword2.rightPrec;
                if (scrut6 instanceof Option.Some.class) {
                  param03 = scrut6.value;
                  rightPrec = param03;
                  scrut7 = simpleExpr(rightPrec, bracket);
                  if (scrut7 instanceof Parser.Tree.Tuple.class) {
                    param04 = scrut7.trees;
                    trees = param04;
                    tmp155 = Stack.Cons(acc, trees);
                    tmp156 = Parser.Tree.Tuple(tmp155);
                  } else {
                    tree = scrut7;
                    tmp157 = Stack.Cons(tree, Stack.Nil);
                    tmp158 = Stack.Cons(acc, tmp157);
                    tmp156 = Parser.Tree.Tuple(tmp158);
                  }
                  acc$_ = tmp156;
                  return exprCont(acc$_, prec, bracket)
                } else {
                  throw new globalThis.Error("match error");
                }
              } else {
                tmp159 = "cannot consume " + keyword2;
                tmp160 = Parser.tracer.print(tmp159, 779);
                return acc
              }
            } else {
              throw new globalThis.Error("match error");
            }
          } else {
            throw new globalThis.Error("match error");
          }
        } else {
          token = param0;
          scrut1 = Parser.#appPrec > prec;
          if (scrut1 === true) {
            tmp161 = Parser.tracer.print("found an application", 783);
            scrut2 = simpleExpr(Parser.#appPrec, bracket);
            if (scrut2 instanceof Parser.Tree.Empty.class) {
              return acc
            } else if (scrut2 instanceof Parser.Tree.Error.class) {
              return acc
            } else {
              rhs = scrut2;
              tmp162 = Stack.Cons(rhs, Stack.Nil);
              tmp163 = Parser.Tree.App(acc, tmp162);
              return exprCont(tmp163, prec, bracket)
            }
          } else {
            tmp164 = "cannot consume " + token;
            tmp165 = Parser.tracer.print(tmp164, 789);
            return acc
          }
        }
      } else if (scrut instanceof Stack.Nil.class) {
        doTemp1 = Parser.tracer.print("found an EOF", 792);
        if (bracket instanceof Option.Some.class) {
          return Parser.Tree.Error(acc, "expect a close bracket instead of EOF")
        } else if (bracket instanceof Option.None.class) {
          return acc
        } else {
          throw new globalThis.Error("match error");
        }
      } else {
        throw new globalThis.Error("match error");
      }
    };
    current = tokens;
    counter = 0;
    return simpleExpr(0, Option.None)
  }
  static toString() { return "Parser"; }
};
let Parser = Parser1; export default Parser;
