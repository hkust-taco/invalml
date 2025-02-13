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
        let tmp19, tmp20, tmp21, tmp22, tmp23, tmp24, tmp25, tmp26, tmp27, tmp28, tmp29, tmp30, tmp31, tmp32, tmp33, tmp34, tmp35, tmp36, tmp37, tmp38, tmp39, tmp40, tmp41, tmp42, tmp43, tmp44;
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
        tmp26 = Parser.Keyword("and", Option.None, Keywords.currPrec);
        this._and = tmp26;
        tmp27 = Parser.Keyword(":", Keywords.#ascPrec, Keywords.#eqPrec);
        this._colon = tmp27;
        tmp28 = Parser.Keyword("match", Option.None, Keywords.currPrec);
        this._match = tmp28;
        tmp29 = Parser.Keyword("if", Option.None, Keywords.currPrec);
        this._if = tmp29;
        tmp30 = Parser.Keyword("with", Option.None, Keywords.currPrec);
        this._with = tmp30;
        tmp31 = Parser.Keyword("case", Option.None, Keywords.currPrec);
        this._case = tmp31;
        Keywords.#thenPrec = Keywords.nextPrec;
        tmp32 = Parser.Keyword("then", Keywords.#thenPrec, Keywords.#thenPrec);
        this._then = tmp32;
        tmp33 = Parser.Keyword("do", Keywords.#thenPrec, Keywords.#thenPrec);
        this._do = tmp33;
        tmp34 = Parser.Keyword("else", Keywords.nextPrec, Keywords.currPrec);
        this._else = tmp34;
        tmp35 = Parser.Keyword("let", Keywords.nextPrec, Keywords.#semiPrec);
        this._let = tmp35;
        tmp36 = Parser.Keyword("in", Keywords.#thenPrec, Keywords.#thenPrec);
        this._in = tmp36;
        tmp37 = Parser.Keyword("true", Option.None, Option.None);
        this._true = tmp37;
        tmp38 = Parser.Keyword("false", Option.None, Option.None);
        this._false = tmp38;
        tmp39 = Parser.Keyword("->", Keywords.currPrec, Keywords.#eqPrec);
        this._thinArrow = tmp39;
        tmp40 = Parser.Keyword("fun", Keywords.currPrec, Option.None);
        this._fun = tmp40;
        tmp41 = Parser.Keyword("function", Keywords.currPrec, Option.None);
        this._function = tmp41;
        tmp42 = Parser.Keyword("type", Keywords.currPrec, Option.None);
        this._type = tmp42;
        tmp43 = Parser.Keyword("rec", Option.None, Option.None);
        this._rec = tmp43;
        tmp44 = Parser.Keyword("_", Option.None, Option.None);
        this._underscore = tmp44;
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
    tmp15 = Parser.rule("start of the statement", Parser.#letChoice, Parser.recursiveModifier, tmp7, tmp8, tmp9, tmp10, tmp11, tmp14);
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
    let makeItems, makeBinding, intro, items, tmp, tmp1, tmp2, tmp3;
    makeBinding = function makeBinding(body) {
      let tmp4, tmp5, tmp6, tmp7;
      tmp4 = (lhs, rhsAndBody) => {
        let first1, first0, rhs, body1;
        if (globalThis.Array.isArray(rhsAndBody) && rhsAndBody.length === 2) {
          first0 = rhsAndBody[0];
          first1 = rhsAndBody[1];
          rhs = first0;
          body1 = first1;
          return Parser.Tree.Ternary(Parser.Keywords._let, lhs, rhs, body1)
        } else {
          throw new globalThis.Error("match error");
        }
      };
      tmp5 = intro + "left-hand side";
      tmp6 = intro + "equal sign";
      tmp7 = Parser.Choice.keyword(Parser.Keywords._equal, tmp6, body);
      return Parser.Choice.expr(tmp4, tmp5, tmp7)
    };
    makeItems = function makeItems(get) {
      let tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14;
      tmp4 = intro + "right-hand side";
      tmp5 = intro + "`and` keyword";
      tmp6 = Parser.Choice.Lazy(get, makeItems);
      tmp7 = makeBinding(tmp6);
      tmp8 = Parser.Choice.keyword(Parser.Keywords._and, tmp5, tmp7);
      tmp9 = intro + "`in` keyword";
      tmp10 = intro + "body";
      tmp11 = Parser.Choice.end(runtime.Unit);
      tmp12 = Parser.Choice.expr((body, _) => {
        return body
      }, tmp10, tmp11);
      tmp13 = Parser.Choice.keyword(Parser.Keywords._in, tmp9, tmp12);
      tmp14 = Parser.Choice.end(Parser.Tree.empty);
      return Parser.Choice.expr((rhs, body) => {
        return [
          rhs,
          body
        ]
      }, tmp4, tmp8, tmp13, tmp14)
    };
    tmp = keyword.name + " binding: ";
    intro = tmp;
    tmp1 = Parser.Choice.lazy(makeItems);
    items = tmp1;
    tmp2 = intro + "keyword";
    tmp3 = makeBinding(items);
    return Parser.Choice.keyword(keyword, tmp2, tmp3)
  } 
  static get recursiveModifier() {
    let tmp, tmp1;
    tmp = Parser.Choice.end(runtime.Unit);
    tmp1 = Parser.Choice.expr((body, _) => {
      return Parser.Tree.Modified(Parser.Keywords._rec, body)
    }, "body", tmp);
    return Parser.Choice.keyword(Parser.Keywords._rec, "rec keyword", tmp1);
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
    let exprCont, simpleExpr, parseRule, yeetSpaces, consume, current, counter, tree, scrut, param0, param1, token, message, tmp, tmp1, tmp2, tmp3;
    yeetSpaces = function yeetSpaces() {
      let param01, param11, tail, tmp4, tmp5, tmp6, tmp7;
      tmp8: while (true) {
        if (current instanceof Stack.Cons.class) {
          param01 = current.head;
          param11 = current.tail;
          if (param01 instanceof Lexer.Token.Space.class) {
            tail = param11;
            tmp4 = "skipped a space at " + counter;
            tmp5 = Parser.tracer.print(tmp4, 620);
            current = tail;
            tmp6 = counter + 1;
            counter = tmp6;
            tmp7 = runtime.Unit;
            continue tmp8;
          } else {
            tmp7 = runtime.Unit;
          }
        } else {
          tmp7 = runtime.Unit;
        }
        break;
      }
      return current
    };
    consume = function consume() {
      let param01, param11, head, tail, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9;
      if (current instanceof Stack.Cons.class) {
        param01 = current.head;
        param11 = current.tail;
        head = param01;
        tail = param11;
        tmp4 = Lexer.Token.summary(head);
        tmp5 = "consumed `" + tmp4;
        tmp6 = tmp5 + "` at ";
        tmp7 = tmp6 + counter;
        tmp8 = Parser.tracer.print(tmp7, 628);
        current = tail;
        tmp9 = counter + 1;
        counter = tmp9;
        return runtime.Unit
      } else {
        return Parser.tracer.print("consumed: EOF", 632)
      }
    };
    parseRule = function parseRule(prec, rule, opened) {
      let tmp4, tmp5, tmp6, tmp7;
      tmp4 = "parsing rule \"" + rule.name;
      tmp5 = tmp4 + "\" with precedence ";
      tmp6 = tmp5 + prec;
      tmp7 = () => {
        let scrut1, scrut2, param01, value, param02, param11, other, doTemp, scrut3, reserve, scrut4, param03, first1, first0, process, rest, rhs, param04, param12, scrut5, param05, value1, param06, param13, name1, doTemp1, doTemp2, scrut6, param07, keyword2, scrut7, scrut8, expr, scrut9, param08, first11, first01, process1, rest1, rhs1, scrut10, scrut11, param09, value2, param010, rule1, param011, encountered, doTemp3, param012, expected, scrut12, scrut13, param013, value3, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20, tmp21, tmp22, tmp23, tmp24, tmp25, tmp26, tmp27, tmp28, tmp29, tmp30, tmp31, tmp32, tmp33, tmp34, tmp35, tmp36, tmp37, tmp38, tmp39, tmp40, tmp41, tmp42, tmp43, tmp44, tmp45, tmp46, tmp47, tmp48, tmp49, tmp50, tmp51, tmp52, tmp53, tmp54, tmp55, tmp56, tmp57, tmp58, tmp59, tmp60, tmp61, tmp62, tmp63, tmp64, tmp65, tmp66, tmp67, tmp68, tmp69, tmp70, tmp71, tmp72, tmp73, tmp74, tmp75, tmp76, tmp77, tmp78, tmp79, tmp80, tmp81, tmp82, tmp83, tmp84, tmp85, tmp86, tmp87, tmp88, tmp89, tmp90, tmp91, tmp92, tmp93, tmp94, tmp95, tmp96, tmp97, tmp98, tmp99, tmp100, tmp101, tmp102, tmp103, tmp104, tmp105, tmp106, tmp107, tmp108, tmp109, tmp110, tmp111, tmp112, tmp113, tmp114, tmp115, tmp116, tmp117, tmp118, tmp119, tmp120, tmp121, tmp122, tmp123, tmp124, tmp125, tmp126, tmp127, tmp128, tmp129, tmp130, tmp131, tmp132, tmp133, tmp134, tmp135, tmp136, tmp137, tmp138, tmp139, tmp140, tmp141, tmp142;
        tmp8 = yeetSpaces();
        scrut1 = tmp8;
        if (scrut1 instanceof Stack.Cons.class) {
          param02 = scrut1.head;
          param11 = scrut1.tail;
          if (param02 instanceof Lexer.Token.Close.class) {
            param011 = param02.kind;
            encountered = param011;
            doTemp3 = Parser.tracer.print("the case of closing brackets", 640);
            if (opened instanceof Option.Some.class) {
              param012 = opened.value;
              expected = param012;
              scrut12 = encountered == expected;
              if (scrut12 === true) {
                scrut13 = rule.endChoice;
                if (scrut13 instanceof Option.Some.class) {
                  param013 = scrut13.value;
                  value3 = param013;
                  return value3
                } else if (scrut13 instanceof Option.None.class) {
                  tmp9 = "unexpected close bracket `" + encountered;
                  tmp10 = tmp9 + "`";
                  return Parser.Tree.error(tmp10)
                } else {
                  return Parser.Tree.error("mismatched brackets")
                }
              } else {
                return Parser.Tree.error("mismatched brackets")
              }
            } else if (opened instanceof Option.None.class) {
              tmp11 = "unexpected bracket: " + encountered;
              return Parser.Tree.error(tmp11)
            } else {
              other = param02;
              tmp12 = Lexer.Token.preview(current);
              tmp13 = "try parse an expression from " + tmp12;
              doTemp = Parser.tracer.print(tmp13, 674);
              scrut3 = simpleExpr(prec, opened);
              if (scrut3 instanceof Parser.Tree.Error.class) {
                param04 = scrut3.tree;
                param12 = scrut3.message;
                if (param04 instanceof Parser.Tree.Empty.class) {
                  scrut5 = rule.endChoice;
                  if (scrut5 instanceof Option.Some.class) {
                    param05 = scrut5.value;
                    value1 = param05;
                    return value1
                  } else {
                    reserve = scrut3;
                    scrut4 = rule.exprChoice;
                    if (scrut4 instanceof Option.Some.class) {
                      param03 = scrut4.value;
                      if (globalThis.Array.isArray(param03) && param03.length === 2) {
                        first0 = param03[0];
                        first1 = param03[1];
                        process = first0;
                        rest = first1;
                        tmp14 = parseRule(prec, rest, opened);
                        rhs = tmp14;
                        tmp15 = Parser.Tree.summary(reserve);
                        tmp16 = "the reserved expression: " + tmp15;
                        tmp17 = Parser.tracer.print(tmp16, 681);
                        tmp18 = Parser.Tree.summary(rhs);
                        tmp19 = "the result from sub-rule: " + tmp18;
                        tmp20 = Parser.tracer.print(tmp19, 682);
                        return runtime.safeCall(process(reserve, rhs))
                      } else {
                        throw new globalThis.Error("match error");
                      }
                    } else if (scrut4 instanceof Option.None.class) {
                      tmp21 = Parser.tracer.print("the rule doesn't have a choice starting with expressions", 685);
                      tmp22 = Parser.tracer.print(rule.display, 686);
                      return Parser.Tree.error("unexpected expression")
                    } else {
                      throw new globalThis.Error("match error");
                    }
                  }
                } else {
                  reserve = scrut3;
                  scrut4 = rule.exprChoice;
                  if (scrut4 instanceof Option.Some.class) {
                    param03 = scrut4.value;
                    if (globalThis.Array.isArray(param03) && param03.length === 2) {
                      first0 = param03[0];
                      first1 = param03[1];
                      process = first0;
                      rest = first1;
                      tmp23 = parseRule(prec, rest, opened);
                      rhs = tmp23;
                      tmp24 = Parser.Tree.summary(reserve);
                      tmp25 = "the reserved expression: " + tmp24;
                      tmp26 = Parser.tracer.print(tmp25, 681);
                      tmp27 = Parser.Tree.summary(rhs);
                      tmp28 = "the result from sub-rule: " + tmp27;
                      tmp29 = Parser.tracer.print(tmp28, 682);
                      return runtime.safeCall(process(reserve, rhs))
                    } else {
                      throw new globalThis.Error("match error");
                    }
                  } else if (scrut4 instanceof Option.None.class) {
                    tmp30 = Parser.tracer.print("the rule doesn't have a choice starting with expressions", 685);
                    tmp31 = Parser.tracer.print(rule.display, 686);
                    return Parser.Tree.error("unexpected expression")
                  } else {
                    throw new globalThis.Error("match error");
                  }
                }
              } else {
                reserve = scrut3;
                scrut4 = rule.exprChoice;
                if (scrut4 instanceof Option.Some.class) {
                  param03 = scrut4.value;
                  if (globalThis.Array.isArray(param03) && param03.length === 2) {
                    first0 = param03[0];
                    first1 = param03[1];
                    process = first0;
                    rest = first1;
                    tmp32 = parseRule(prec, rest, opened);
                    rhs = tmp32;
                    tmp33 = Parser.Tree.summary(reserve);
                    tmp34 = "the reserved expression: " + tmp33;
                    tmp35 = Parser.tracer.print(tmp34, 681);
                    tmp36 = Parser.Tree.summary(rhs);
                    tmp37 = "the result from sub-rule: " + tmp36;
                    tmp38 = Parser.tracer.print(tmp37, 682);
                    return runtime.safeCall(process(reserve, rhs))
                  } else {
                    throw new globalThis.Error("match error");
                  }
                } else if (scrut4 instanceof Option.None.class) {
                  tmp39 = Parser.tracer.print("the rule doesn't have a choice starting with expressions", 685);
                  tmp40 = Parser.tracer.print(rule.display, 686);
                  return Parser.Tree.error("unexpected expression")
                } else {
                  throw new globalThis.Error("match error");
                }
              }
            }
          } else if (param02 instanceof Lexer.Token.Identifier.class) {
            param06 = param02.name;
            param13 = param02.symbolic;
            name1 = param06;
            tmp41 = "check if \"" + name1;
            tmp42 = tmp41 + "\" is a keyword or not";
            doTemp1 = Parser.tracer.print(tmp42, 652);
            scrut6 = runtime.safeCall(Parser.keywords.get(name1));
            if (scrut6 instanceof Option.Some.class) {
              param07 = scrut6.value;
              keyword2 = param07;
              scrut7 = runtime.safeCall(rule.keywordChoices.get(name1));
              if (scrut7 instanceof Option.Some.class) {
                param010 = scrut7.value;
                rule1 = param010;
                tmp43 = "found a rule starting with `" + name1;
                tmp44 = tmp43 + "`";
                tmp45 = Parser.tracer.print(tmp44, 656);
                tmp46 = consume();
                tmp47 = Parser.orMaxPrec(keyword2.rightPrec);
                return parseRule(tmp47, rule1, opened)
              } else if (scrut7 instanceof Option.None.class) {
                tmp48 = "no rule starting with `" + name1;
                tmp49 = tmp48 + "` was found";
                tmp50 = Parser.tracer.print(tmp49, 660);
                scrut8 = simpleExpr(prec, opened);
                if (scrut8 instanceof Parser.Tree.Empty.class) {
                  scrut11 = rule.endChoice;
                  if (scrut11 instanceof Option.Some.class) {
                    param09 = scrut11.value;
                    value2 = param09;
                    return value2
                  } else {
                    scrut10 = rule.exprChoice;
                    if (scrut10 instanceof Option.Some.class) {
                      return Parser.Tree.error("expect an expression")
                    } else {
                      return Predef.notImplementedError
                    }
                  }
                } else {
                  expr = scrut8;
                  scrut9 = rule.exprChoice;
                  if (scrut9 instanceof Option.Some.class) {
                    param08 = scrut9.value;
                    if (globalThis.Array.isArray(param08) && param08.length === 2) {
                      first01 = param08[0];
                      first11 = param08[1];
                      process1 = first01;
                      rest1 = first11;
                      tmp51 = parseRule(prec, rest1, opened);
                      rhs1 = tmp51;
                      return runtime.safeCall(process1(expr, rhs1))
                    } else {
                      throw new globalThis.Error("match error");
                    }
                  } else if (scrut9 instanceof Option.None.class) {
                    return Parser.Tree.Error(expr, "unexpected expression")
                  } else {
                    throw new globalThis.Error("match error");
                  }
                }
              } else {
                tmp52 = "\"" + name1;
                tmp53 = tmp52 + "\" is not a keyword";
                doTemp2 = Parser.tracer.print(tmp53, 672);
                other = param02;
                tmp54 = Lexer.Token.preview(current);
                tmp55 = "try parse an expression from " + tmp54;
                doTemp = Parser.tracer.print(tmp55, 674);
                scrut3 = simpleExpr(prec, opened);
                if (scrut3 instanceof Parser.Tree.Error.class) {
                  param04 = scrut3.tree;
                  param12 = scrut3.message;
                  if (param04 instanceof Parser.Tree.Empty.class) {
                    scrut5 = rule.endChoice;
                    if (scrut5 instanceof Option.Some.class) {
                      param05 = scrut5.value;
                      value1 = param05;
                      return value1
                    } else {
                      reserve = scrut3;
                      scrut4 = rule.exprChoice;
                      if (scrut4 instanceof Option.Some.class) {
                        param03 = scrut4.value;
                        if (globalThis.Array.isArray(param03) && param03.length === 2) {
                          first0 = param03[0];
                          first1 = param03[1];
                          process = first0;
                          rest = first1;
                          tmp56 = parseRule(prec, rest, opened);
                          rhs = tmp56;
                          tmp57 = Parser.Tree.summary(reserve);
                          tmp58 = "the reserved expression: " + tmp57;
                          tmp59 = Parser.tracer.print(tmp58, 681);
                          tmp60 = Parser.Tree.summary(rhs);
                          tmp61 = "the result from sub-rule: " + tmp60;
                          tmp62 = Parser.tracer.print(tmp61, 682);
                          return runtime.safeCall(process(reserve, rhs))
                        } else {
                          throw new globalThis.Error("match error");
                        }
                      } else if (scrut4 instanceof Option.None.class) {
                        tmp63 = Parser.tracer.print("the rule doesn't have a choice starting with expressions", 685);
                        tmp64 = Parser.tracer.print(rule.display, 686);
                        return Parser.Tree.error("unexpected expression")
                      } else {
                        throw new globalThis.Error("match error");
                      }
                    }
                  } else {
                    reserve = scrut3;
                    scrut4 = rule.exprChoice;
                    if (scrut4 instanceof Option.Some.class) {
                      param03 = scrut4.value;
                      if (globalThis.Array.isArray(param03) && param03.length === 2) {
                        first0 = param03[0];
                        first1 = param03[1];
                        process = first0;
                        rest = first1;
                        tmp65 = parseRule(prec, rest, opened);
                        rhs = tmp65;
                        tmp66 = Parser.Tree.summary(reserve);
                        tmp67 = "the reserved expression: " + tmp66;
                        tmp68 = Parser.tracer.print(tmp67, 681);
                        tmp69 = Parser.Tree.summary(rhs);
                        tmp70 = "the result from sub-rule: " + tmp69;
                        tmp71 = Parser.tracer.print(tmp70, 682);
                        return runtime.safeCall(process(reserve, rhs))
                      } else {
                        throw new globalThis.Error("match error");
                      }
                    } else if (scrut4 instanceof Option.None.class) {
                      tmp72 = Parser.tracer.print("the rule doesn't have a choice starting with expressions", 685);
                      tmp73 = Parser.tracer.print(rule.display, 686);
                      return Parser.Tree.error("unexpected expression")
                    } else {
                      throw new globalThis.Error("match error");
                    }
                  }
                } else {
                  reserve = scrut3;
                  scrut4 = rule.exprChoice;
                  if (scrut4 instanceof Option.Some.class) {
                    param03 = scrut4.value;
                    if (globalThis.Array.isArray(param03) && param03.length === 2) {
                      first0 = param03[0];
                      first1 = param03[1];
                      process = first0;
                      rest = first1;
                      tmp74 = parseRule(prec, rest, opened);
                      rhs = tmp74;
                      tmp75 = Parser.Tree.summary(reserve);
                      tmp76 = "the reserved expression: " + tmp75;
                      tmp77 = Parser.tracer.print(tmp76, 681);
                      tmp78 = Parser.Tree.summary(rhs);
                      tmp79 = "the result from sub-rule: " + tmp78;
                      tmp80 = Parser.tracer.print(tmp79, 682);
                      return runtime.safeCall(process(reserve, rhs))
                    } else {
                      throw new globalThis.Error("match error");
                    }
                  } else if (scrut4 instanceof Option.None.class) {
                    tmp81 = Parser.tracer.print("the rule doesn't have a choice starting with expressions", 685);
                    tmp82 = Parser.tracer.print(rule.display, 686);
                    return Parser.Tree.error("unexpected expression")
                  } else {
                    throw new globalThis.Error("match error");
                  }
                }
              }
            } else {
              tmp83 = "\"" + name1;
              tmp84 = tmp83 + "\" is not a keyword";
              doTemp2 = Parser.tracer.print(tmp84, 672);
              other = param02;
              tmp85 = Lexer.Token.preview(current);
              tmp86 = "try parse an expression from " + tmp85;
              doTemp = Parser.tracer.print(tmp86, 674);
              scrut3 = simpleExpr(prec, opened);
              if (scrut3 instanceof Parser.Tree.Error.class) {
                param04 = scrut3.tree;
                param12 = scrut3.message;
                if (param04 instanceof Parser.Tree.Empty.class) {
                  scrut5 = rule.endChoice;
                  if (scrut5 instanceof Option.Some.class) {
                    param05 = scrut5.value;
                    value1 = param05;
                    return value1
                  } else {
                    reserve = scrut3;
                    scrut4 = rule.exprChoice;
                    if (scrut4 instanceof Option.Some.class) {
                      param03 = scrut4.value;
                      if (globalThis.Array.isArray(param03) && param03.length === 2) {
                        first0 = param03[0];
                        first1 = param03[1];
                        process = first0;
                        rest = first1;
                        tmp87 = parseRule(prec, rest, opened);
                        rhs = tmp87;
                        tmp88 = Parser.Tree.summary(reserve);
                        tmp89 = "the reserved expression: " + tmp88;
                        tmp90 = Parser.tracer.print(tmp89, 681);
                        tmp91 = Parser.Tree.summary(rhs);
                        tmp92 = "the result from sub-rule: " + tmp91;
                        tmp93 = Parser.tracer.print(tmp92, 682);
                        return runtime.safeCall(process(reserve, rhs))
                      } else {
                        throw new globalThis.Error("match error");
                      }
                    } else if (scrut4 instanceof Option.None.class) {
                      tmp94 = Parser.tracer.print("the rule doesn't have a choice starting with expressions", 685);
                      tmp95 = Parser.tracer.print(rule.display, 686);
                      return Parser.Tree.error("unexpected expression")
                    } else {
                      throw new globalThis.Error("match error");
                    }
                  }
                } else {
                  reserve = scrut3;
                  scrut4 = rule.exprChoice;
                  if (scrut4 instanceof Option.Some.class) {
                    param03 = scrut4.value;
                    if (globalThis.Array.isArray(param03) && param03.length === 2) {
                      first0 = param03[0];
                      first1 = param03[1];
                      process = first0;
                      rest = first1;
                      tmp96 = parseRule(prec, rest, opened);
                      rhs = tmp96;
                      tmp97 = Parser.Tree.summary(reserve);
                      tmp98 = "the reserved expression: " + tmp97;
                      tmp99 = Parser.tracer.print(tmp98, 681);
                      tmp100 = Parser.Tree.summary(rhs);
                      tmp101 = "the result from sub-rule: " + tmp100;
                      tmp102 = Parser.tracer.print(tmp101, 682);
                      return runtime.safeCall(process(reserve, rhs))
                    } else {
                      throw new globalThis.Error("match error");
                    }
                  } else if (scrut4 instanceof Option.None.class) {
                    tmp103 = Parser.tracer.print("the rule doesn't have a choice starting with expressions", 685);
                    tmp104 = Parser.tracer.print(rule.display, 686);
                    return Parser.Tree.error("unexpected expression")
                  } else {
                    throw new globalThis.Error("match error");
                  }
                }
              } else {
                reserve = scrut3;
                scrut4 = rule.exprChoice;
                if (scrut4 instanceof Option.Some.class) {
                  param03 = scrut4.value;
                  if (globalThis.Array.isArray(param03) && param03.length === 2) {
                    first0 = param03[0];
                    first1 = param03[1];
                    process = first0;
                    rest = first1;
                    tmp105 = parseRule(prec, rest, opened);
                    rhs = tmp105;
                    tmp106 = Parser.Tree.summary(reserve);
                    tmp107 = "the reserved expression: " + tmp106;
                    tmp108 = Parser.tracer.print(tmp107, 681);
                    tmp109 = Parser.Tree.summary(rhs);
                    tmp110 = "the result from sub-rule: " + tmp109;
                    tmp111 = Parser.tracer.print(tmp110, 682);
                    return runtime.safeCall(process(reserve, rhs))
                  } else {
                    throw new globalThis.Error("match error");
                  }
                } else if (scrut4 instanceof Option.None.class) {
                  tmp112 = Parser.tracer.print("the rule doesn't have a choice starting with expressions", 685);
                  tmp113 = Parser.tracer.print(rule.display, 686);
                  return Parser.Tree.error("unexpected expression")
                } else {
                  throw new globalThis.Error("match error");
                }
              }
            }
          } else {
            other = param02;
            tmp114 = Lexer.Token.preview(current);
            tmp115 = "try parse an expression from " + tmp114;
            doTemp = Parser.tracer.print(tmp115, 674);
            scrut3 = simpleExpr(prec, opened);
            if (scrut3 instanceof Parser.Tree.Error.class) {
              param04 = scrut3.tree;
              param12 = scrut3.message;
              if (param04 instanceof Parser.Tree.Empty.class) {
                scrut5 = rule.endChoice;
                if (scrut5 instanceof Option.Some.class) {
                  param05 = scrut5.value;
                  value1 = param05;
                  return value1
                } else {
                  reserve = scrut3;
                  scrut4 = rule.exprChoice;
                  if (scrut4 instanceof Option.Some.class) {
                    param03 = scrut4.value;
                    if (globalThis.Array.isArray(param03) && param03.length === 2) {
                      first0 = param03[0];
                      first1 = param03[1];
                      process = first0;
                      rest = first1;
                      tmp116 = parseRule(prec, rest, opened);
                      rhs = tmp116;
                      tmp117 = Parser.Tree.summary(reserve);
                      tmp118 = "the reserved expression: " + tmp117;
                      tmp119 = Parser.tracer.print(tmp118, 681);
                      tmp120 = Parser.Tree.summary(rhs);
                      tmp121 = "the result from sub-rule: " + tmp120;
                      tmp122 = Parser.tracer.print(tmp121, 682);
                      return runtime.safeCall(process(reserve, rhs))
                    } else {
                      throw new globalThis.Error("match error");
                    }
                  } else if (scrut4 instanceof Option.None.class) {
                    tmp123 = Parser.tracer.print("the rule doesn't have a choice starting with expressions", 685);
                    tmp124 = Parser.tracer.print(rule.display, 686);
                    return Parser.Tree.error("unexpected expression")
                  } else {
                    throw new globalThis.Error("match error");
                  }
                }
              } else {
                reserve = scrut3;
                scrut4 = rule.exprChoice;
                if (scrut4 instanceof Option.Some.class) {
                  param03 = scrut4.value;
                  if (globalThis.Array.isArray(param03) && param03.length === 2) {
                    first0 = param03[0];
                    first1 = param03[1];
                    process = first0;
                    rest = first1;
                    tmp125 = parseRule(prec, rest, opened);
                    rhs = tmp125;
                    tmp126 = Parser.Tree.summary(reserve);
                    tmp127 = "the reserved expression: " + tmp126;
                    tmp128 = Parser.tracer.print(tmp127, 681);
                    tmp129 = Parser.Tree.summary(rhs);
                    tmp130 = "the result from sub-rule: " + tmp129;
                    tmp131 = Parser.tracer.print(tmp130, 682);
                    return runtime.safeCall(process(reserve, rhs))
                  } else {
                    throw new globalThis.Error("match error");
                  }
                } else if (scrut4 instanceof Option.None.class) {
                  tmp132 = Parser.tracer.print("the rule doesn't have a choice starting with expressions", 685);
                  tmp133 = Parser.tracer.print(rule.display, 686);
                  return Parser.Tree.error("unexpected expression")
                } else {
                  throw new globalThis.Error("match error");
                }
              }
            } else {
              reserve = scrut3;
              scrut4 = rule.exprChoice;
              if (scrut4 instanceof Option.Some.class) {
                param03 = scrut4.value;
                if (globalThis.Array.isArray(param03) && param03.length === 2) {
                  first0 = param03[0];
                  first1 = param03[1];
                  process = first0;
                  rest = first1;
                  tmp134 = parseRule(prec, rest, opened);
                  rhs = tmp134;
                  tmp135 = Parser.Tree.summary(reserve);
                  tmp136 = "the reserved expression: " + tmp135;
                  tmp137 = Parser.tracer.print(tmp136, 681);
                  tmp138 = Parser.Tree.summary(rhs);
                  tmp139 = "the result from sub-rule: " + tmp138;
                  tmp140 = Parser.tracer.print(tmp139, 682);
                  return runtime.safeCall(process(reserve, rhs))
                } else {
                  throw new globalThis.Error("match error");
                }
              } else if (scrut4 instanceof Option.None.class) {
                tmp141 = Parser.tracer.print("the rule doesn't have a choice starting with expressions", 685);
                tmp142 = Parser.tracer.print(rule.display, 686);
                return Parser.Tree.error("unexpected expression")
              } else {
                throw new globalThis.Error("match error");
              }
            }
          }
        } else if (scrut1 instanceof Stack.Nil.class) {
          scrut2 = rule.endChoice;
          if (scrut2 instanceof Option.Some.class) {
            param01 = scrut2.value;
            value = param01;
            return value
          } else if (scrut2 instanceof Option.None.class) {
            return Parser.Tree.error("unexpected EOF")
          } else {
            throw new globalThis.Error("match error");
          }
        } else {
          throw new globalThis.Error("match error");
        }
      };
      return runtime.safeCall(Parser.tracer.trace(tmp6, (result) => {
        let tmp8;
        tmp8 = Parser.Tree.summary(result);
        return "parsed: " + tmp8
      }, tmp7))
    };
    simpleExpr = function simpleExpr(prec, bracket) {
      let tmp4, tmp5, tmp6, tmp7, tmp8;
      tmp4 = "simple expression <<< " + prec;
      tmp5 = tmp4 + " ";
      tmp6 = Lexer.Token.preview(current);
      tmp7 = tmp5 + tmp6;
      tmp8 = () => {
        let scrut1, param01, param11, token1, param02, kind, param03, kind$_, scrut2, param04, kind1, content, content1, scrut3, message1, param05, param12, token2, message2, param06, kind$_1, scrut4, param07, param13, kind2, literal, param08, param14, name1, symbolic, scrut5, param09, keyword2, scrut6, param010, rule, acc, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20, tmp21, tmp22, tmp23, tmp24, tmp25, tmp26, tmp27, tmp28, tmp29, tmp30, tmp31, tmp32, tmp33, tmp34;
        tmp9 = yeetSpaces();
        scrut1 = tmp9;
        if (scrut1 instanceof Stack.Cons.class) {
          param01 = scrut1.head;
          param11 = scrut1.tail;
          if (param01 instanceof Lexer.Token.Identifier.class) {
            param08 = param01.name;
            param14 = param01.symbolic;
            name1 = param08;
            symbolic = param14;
            scrut5 = runtime.safeCall(Parser.keywords.get(name1));
            if (scrut5 instanceof Option.Some.class) {
              param09 = scrut5.value;
              keyword2 = param09;
              scrut6 = runtime.safeCall(Parser.prefixRules.keywordChoices.get(name1));
              if (scrut6 instanceof Option.Some.class) {
                param010 = scrut6.value;
                rule = param010;
                tmp10 = consume();
                tmp11 = Parser.orMaxPrec(keyword2.rightPrec);
                tmp12 = parseRule(tmp11, rule, bracket);
                acc = tmp12;
                return exprCont(acc, prec, bracket)
              } else if (scrut6 instanceof Option.None.class) {
                tmp13 = "no rule starting with " + name1;
                tmp14 = Parser.tracer.print(tmp13, 704);
                return Parser.Tree.empty
              } else {
                token1 = param01;
                tmp15 = "unrecognized token: " + token1;
                return Parser.Tree.error(tmp15)
              }
            } else if (scrut5 instanceof Option.None.class) {
              tmp16 = consume();
              tmp17 = Parser.Tree.Ident(name1, symbolic);
              return exprCont(tmp17, prec, bracket)
            } else {
              token1 = param01;
              tmp18 = "unrecognized token: " + token1;
              return Parser.Tree.error(tmp18)
            }
          } else if (param01 instanceof Lexer.Token.Literal.class) {
            param07 = param01.kind;
            param13 = param01.literal;
            kind2 = param07;
            literal = param13;
            tmp19 = consume();
            tmp20 = Parser.Tree.Literal(kind2, literal);
            return exprCont(tmp20, prec, bracket)
          } else if (param01 instanceof Lexer.Token.Open.class) {
            param04 = param01.kind;
            kind1 = param04;
            tmp21 = consume();
            tmp22 = Option.Some(kind1);
            content1 = simpleExpr(0, tmp22);
            tmp23 = yeetSpaces();
            scrut3 = tmp23;
            if (scrut3 instanceof Stack.Cons.class) {
              param05 = scrut3.head;
              param12 = scrut3.tail;
              if (param05 instanceof Lexer.Token.Close.class) {
                param06 = param05.kind;
                kind$_1 = param06;
                scrut4 = kind1 == kind$_1;
                if (scrut4 === true) {
                  tmp24 = "closing bracket " + kind1;
                  tmp25 = Parser.tracer.print(tmp24, 720);
                  tmp26 = consume();
                  if (content1 instanceof Parser.Tree.Empty.class) {
                    if (kind1 instanceof Lexer.Round.class) {
                      tmp27 = Parser.Tree.Tuple(Stack.Nil);
                    } else if (kind1 instanceof Lexer.BeginEnd.class) {
                      tmp27 = Parser.Tree.Sequence(Stack.Nil);
                    } else {
                      tmp27 = content1;
                    }
                  } else {
                    tmp27 = content1;
                  }
                  tmp28 = tmp27;
                } else {
                  tmp28 = Parser.Tree.Error(content1, "mismatched brackets");
                }
              } else {
                token2 = param05;
                tmp29 = "expect a close bracket instead of " + token2;
                message2 = tmp29;
                tmp30 = Parser.tracer.print(message2, 730);
                tmp28 = Parser.Tree.Error(content1, message2);
              }
            } else if (scrut3 instanceof Stack.Nil.class) {
              message1 = "expect a close bracket instead of EOF";
              tmp31 = Parser.tracer.print(message1, 734);
              tmp28 = Parser.Tree.Error(content1, message1);
            } else {
              throw new globalThis.Error("match error");
            }
            content = tmp28;
            return exprCont(content, prec, bracket)
          } else if (param01 instanceof Lexer.Token.Close.class) {
            param02 = param01.kind;
            kind = param02;
            if (bracket instanceof Option.Some.class) {
              param03 = bracket.value;
              kind$_ = param03;
              scrut2 = kind == kind$_;
              if (scrut2 === true) {
                return Parser.Tree.Empty()
              } else {
                return Parser.Tree.error("mismatched brackets")
              }
            } else if (bracket instanceof Option.None.class) {
              tmp32 = Parser.tracer.print("missing close bracket", 742);
              return Parser.Tree.error("missing close bracket")
            } else {
              token1 = param01;
              tmp33 = "unrecognized token: " + token1;
              return Parser.Tree.error(tmp33)
            }
          } else {
            token1 = param01;
            tmp34 = "unrecognized token: " + token1;
            return Parser.Tree.error(tmp34)
          }
        } else if (scrut1 instanceof Stack.Nil.class) {
          return Parser.Tree.error("unexpected EOF")
        } else {
          throw new globalThis.Error("match error");
        }
      };
      return runtime.safeCall(Parser.tracer.trace(tmp7, (result) => {
        let tmp9;
        tmp9 = Parser.Tree.summary(result);
        return "simple expression >>> " + tmp9
      }, tmp8))
    };
    exprCont = function exprCont(acc, prec, bracket) {
      let scrut1, doTemp, doTemp1, param01, param11, token1, scrut2, scrut3, rhs, scrut4, param02, keyword2, scrut5, param03, leftPrec, scrut6, scrut7, param04, rightPrec, acc$_, scrut8, tree1, param05, trees, scrut9, param06, keyword3, scrut10, param07, leftPrec1, scrut11, scrut12, param08, rightPrec1, acc$_1, scrut13, tree2, param09, trees1, param010, kind, doTemp2, param011, kind$_, scrut14, param012, param12, name1, scrut15, doTemp3, scrut16, first1, first0, leftPrec2, rightPrec2, doTemp4, scrut17, op3, rhs1, name2, scrut18, param013, keyword4, doTemp5, doTemp6, scrut19, param014, rule, doTemp7, scrut20, scrut21, param015, first11, first01, process, rest, rhs2, acc$_2, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20, tmp21, tmp22, tmp23, tmp24, tmp25, tmp26, tmp27, tmp28, tmp29, tmp30, tmp31, tmp32, tmp33, tmp34, tmp35, tmp36, tmp37, tmp38, tmp39, tmp40, tmp41, tmp42, tmp43, tmp44, tmp45, tmp46, tmp47, tmp48, tmp49, tmp50, tmp51, tmp52, tmp53, tmp54, tmp55, tmp56, tmp57, tmp58, tmp59, tmp60, tmp61, tmp62, tmp63, tmp64, tmp65, tmp66, tmp67, tmp68, tmp69, tmp70, tmp71, tmp72, tmp73, tmp74, tmp75, tmp76, tmp77, tmp78, tmp79, tmp80, tmp81, tmp82, tmp83, tmp84, tmp85, tmp86, tmp87, tmp88, tmp89, tmp90, tmp91, tmp92, tmp93, tmp94, tmp95, tmp96, tmp97, tmp98, tmp99, tmp100, tmp101, tmp102, tmp103, tmp104, tmp105, tmp106, tmp107, tmp108, tmp109, tmp110, tmp111, tmp112, tmp113, tmp114, tmp115, tmp116, tmp117, tmp118, tmp119, tmp120, tmp121, tmp122, tmp123, tmp124, tmp125, tmp126, tmp127, tmp128, tmp129, tmp130, tmp131, tmp132, tmp133, tmp134, tmp135, tmp136, tmp137, tmp138, tmp139, tmp140, tmp141, tmp142, tmp143, tmp144, tmp145, tmp146, tmp147, tmp148, tmp149, tmp150, tmp151, tmp152, tmp153, tmp154, tmp155, tmp156, tmp157, tmp158, tmp159, tmp160, tmp161, tmp162, tmp163, tmp164, tmp165, tmp166, tmp167, tmp168, tmp169;
      tmp4 = yeetSpaces();
      scrut1 = tmp4;
      tmp5 = ">>> exprCont " + prec;
      tmp6 = tmp5 + " ";
      tmp7 = Parser.Tree.summary(acc);
      tmp8 = tmp6 + tmp7;
      tmp9 = tmp8 + " <<<";
      doTemp = Parser.tracer.print(tmp9, 748);
      if (scrut1 instanceof Stack.Cons.class) {
        param01 = scrut1.head;
        param11 = scrut1.tail;
        if (param01 instanceof Lexer.Token.Identifier.class) {
          param012 = param01.name;
          param12 = param01.symbolic;
          name2 = param012;
          scrut18 = runtime.safeCall(Parser.keywords.get(name2));
          if (scrut18 instanceof Option.Some.class) {
            param013 = scrut18.value;
            keyword4 = param013;
            tmp10 = "found a keyword: " + name2;
            doTemp5 = Parser.tracer.print(tmp10, 750);
            scrut19 = runtime.safeCall(Parser.infixRules.keywordChoices.get(name2));
            if (scrut19 instanceof Option.Some.class) {
              param014 = scrut19.value;
              rule = param014;
              tmp11 = "found an infix keyword " + name2;
              doTemp7 = Parser.tracer.print(tmp11, 752);
              scrut20 = keyword4.leftPrecOrMin > prec;
              if (scrut20 === true) {
                scrut21 = rule.exprChoice;
                if (scrut21 instanceof Option.Some.class) {
                  param015 = scrut21.value;
                  if (globalThis.Array.isArray(param015) && param015.length === 2) {
                    first01 = param015[0];
                    first11 = param015[1];
                    process = first01;
                    rest = first11;
                    tmp12 = consume();
                    tmp13 = simpleExpr(keyword4.rightPrecOrMin, bracket);
                    rhs2 = tmp13;
                    tmp14 = Parser.Tree.Infix(keyword4, acc, rhs2);
                    acc$_2 = tmp14;
                    return exprCont(acc$_2, prec, bracket)
                  } else {
                    tmp15 = "keyword `" + name2;
                    tmp16 = tmp15 + "` does not have infix rules";
                    doTemp6 = Parser.tracer.print(tmp16, 760);
                    name1 = param012;
                    if (param12 === true) {
                      scrut15 = runtime.safeCall(Parser.keywords.get(name1));
                      if (scrut15 instanceof Option.None.class) {
                        tmp17 = "found an operator \"" + name1;
                        tmp18 = tmp17 + "\"";
                        doTemp3 = Parser.tracer.print(tmp18, 762);
                        scrut16 = Parser.opPrec(name1);
                        if (globalThis.Array.isArray(scrut16) && scrut16.length === 2) {
                          first0 = scrut16[0];
                          first1 = scrut16[1];
                          leftPrec2 = first0;
                          rightPrec2 = first1;
                          tmp19 = "its precedence is " + leftPrec2;
                          doTemp4 = Parser.tracer.print(tmp19, 764);
                          scrut17 = leftPrec2 > prec;
                          if (scrut17 === true) {
                            tmp20 = consume();
                            tmp21 = Parser.Tree.Ident(name1, true);
                            op3 = tmp21;
                            tmp22 = simpleExpr(rightPrec2, bracket);
                            rhs1 = tmp22;
                            tmp23 = Stack.Cons(rhs1, Stack.Nil);
                            tmp24 = Stack.Cons(acc, tmp23);
                            tmp25 = Parser.Tree.App(op3, tmp24);
                            return exprCont(tmp25, prec, bracket)
                          } else {
                            return acc
                          }
                        } else {
                          token1 = param01;
                          scrut2 = Parser.#appPrec > prec;
                          if (scrut2 === true) {
                            tmp26 = Parser.tracer.print("found an application", 808);
                            scrut3 = simpleExpr(Parser.#appPrec, bracket);
                            if (scrut3 instanceof Parser.Tree.Empty.class) {
                              return acc
                            } else if (scrut3 instanceof Parser.Tree.Error.class) {
                              return acc
                            } else {
                              rhs = scrut3;
                              tmp27 = Stack.Cons(rhs, Stack.Nil);
                              tmp28 = Parser.Tree.App(acc, tmp27);
                              return exprCont(tmp28, prec, bracket)
                            }
                          } else {
                            tmp29 = "cannot consume " + token1;
                            tmp30 = Parser.tracer.print(tmp29, 814);
                            return acc
                          }
                        }
                      } else {
                        token1 = param01;
                        scrut2 = Parser.#appPrec > prec;
                        if (scrut2 === true) {
                          tmp31 = Parser.tracer.print("found an application", 808);
                          scrut3 = simpleExpr(Parser.#appPrec, bracket);
                          if (scrut3 instanceof Parser.Tree.Empty.class) {
                            return acc
                          } else if (scrut3 instanceof Parser.Tree.Error.class) {
                            return acc
                          } else {
                            rhs = scrut3;
                            tmp32 = Stack.Cons(rhs, Stack.Nil);
                            tmp33 = Parser.Tree.App(acc, tmp32);
                            return exprCont(tmp33, prec, bracket)
                          }
                        } else {
                          tmp34 = "cannot consume " + token1;
                          tmp35 = Parser.tracer.print(tmp34, 814);
                          return acc
                        }
                      }
                    } else {
                      token1 = param01;
                      scrut2 = Parser.#appPrec > prec;
                      if (scrut2 === true) {
                        tmp36 = Parser.tracer.print("found an application", 808);
                        scrut3 = simpleExpr(Parser.#appPrec, bracket);
                        if (scrut3 instanceof Parser.Tree.Empty.class) {
                          return acc
                        } else if (scrut3 instanceof Parser.Tree.Error.class) {
                          return acc
                        } else {
                          rhs = scrut3;
                          tmp37 = Stack.Cons(rhs, Stack.Nil);
                          tmp38 = Parser.Tree.App(acc, tmp37);
                          return exprCont(tmp38, prec, bracket)
                        }
                      } else {
                        tmp39 = "cannot consume " + token1;
                        tmp40 = Parser.tracer.print(tmp39, 814);
                        return acc
                      }
                    }
                  }
                } else if (scrut21 instanceof Option.None.class) {
                  return acc
                } else {
                  tmp41 = "keyword `" + name2;
                  tmp42 = tmp41 + "` does not have infix rules";
                  doTemp6 = Parser.tracer.print(tmp42, 760);
                  name1 = param012;
                  if (param12 === true) {
                    scrut15 = runtime.safeCall(Parser.keywords.get(name1));
                    if (scrut15 instanceof Option.None.class) {
                      tmp43 = "found an operator \"" + name1;
                      tmp44 = tmp43 + "\"";
                      doTemp3 = Parser.tracer.print(tmp44, 762);
                      scrut16 = Parser.opPrec(name1);
                      if (globalThis.Array.isArray(scrut16) && scrut16.length === 2) {
                        first0 = scrut16[0];
                        first1 = scrut16[1];
                        leftPrec2 = first0;
                        rightPrec2 = first1;
                        tmp45 = "its precedence is " + leftPrec2;
                        doTemp4 = Parser.tracer.print(tmp45, 764);
                        scrut17 = leftPrec2 > prec;
                        if (scrut17 === true) {
                          tmp46 = consume();
                          tmp47 = Parser.Tree.Ident(name1, true);
                          op3 = tmp47;
                          tmp48 = simpleExpr(rightPrec2, bracket);
                          rhs1 = tmp48;
                          tmp49 = Stack.Cons(rhs1, Stack.Nil);
                          tmp50 = Stack.Cons(acc, tmp49);
                          tmp51 = Parser.Tree.App(op3, tmp50);
                          return exprCont(tmp51, prec, bracket)
                        } else {
                          return acc
                        }
                      } else {
                        token1 = param01;
                        scrut2 = Parser.#appPrec > prec;
                        if (scrut2 === true) {
                          tmp52 = Parser.tracer.print("found an application", 808);
                          scrut3 = simpleExpr(Parser.#appPrec, bracket);
                          if (scrut3 instanceof Parser.Tree.Empty.class) {
                            return acc
                          } else if (scrut3 instanceof Parser.Tree.Error.class) {
                            return acc
                          } else {
                            rhs = scrut3;
                            tmp53 = Stack.Cons(rhs, Stack.Nil);
                            tmp54 = Parser.Tree.App(acc, tmp53);
                            return exprCont(tmp54, prec, bracket)
                          }
                        } else {
                          tmp55 = "cannot consume " + token1;
                          tmp56 = Parser.tracer.print(tmp55, 814);
                          return acc
                        }
                      }
                    } else {
                      token1 = param01;
                      scrut2 = Parser.#appPrec > prec;
                      if (scrut2 === true) {
                        tmp57 = Parser.tracer.print("found an application", 808);
                        scrut3 = simpleExpr(Parser.#appPrec, bracket);
                        if (scrut3 instanceof Parser.Tree.Empty.class) {
                          return acc
                        } else if (scrut3 instanceof Parser.Tree.Error.class) {
                          return acc
                        } else {
                          rhs = scrut3;
                          tmp58 = Stack.Cons(rhs, Stack.Nil);
                          tmp59 = Parser.Tree.App(acc, tmp58);
                          return exprCont(tmp59, prec, bracket)
                        }
                      } else {
                        tmp60 = "cannot consume " + token1;
                        tmp61 = Parser.tracer.print(tmp60, 814);
                        return acc
                      }
                    }
                  } else {
                    token1 = param01;
                    scrut2 = Parser.#appPrec > prec;
                    if (scrut2 === true) {
                      tmp62 = Parser.tracer.print("found an application", 808);
                      scrut3 = simpleExpr(Parser.#appPrec, bracket);
                      if (scrut3 instanceof Parser.Tree.Empty.class) {
                        return acc
                      } else if (scrut3 instanceof Parser.Tree.Error.class) {
                        return acc
                      } else {
                        rhs = scrut3;
                        tmp63 = Stack.Cons(rhs, Stack.Nil);
                        tmp64 = Parser.Tree.App(acc, tmp63);
                        return exprCont(tmp64, prec, bracket)
                      }
                    } else {
                      tmp65 = "cannot consume " + token1;
                      tmp66 = Parser.tracer.print(tmp65, 814);
                      return acc
                    }
                  }
                }
              } else {
                tmp67 = "keyword `" + name2;
                tmp68 = tmp67 + "` does not have infix rules";
                doTemp6 = Parser.tracer.print(tmp68, 760);
                name1 = param012;
                if (param12 === true) {
                  scrut15 = runtime.safeCall(Parser.keywords.get(name1));
                  if (scrut15 instanceof Option.None.class) {
                    tmp69 = "found an operator \"" + name1;
                    tmp70 = tmp69 + "\"";
                    doTemp3 = Parser.tracer.print(tmp70, 762);
                    scrut16 = Parser.opPrec(name1);
                    if (globalThis.Array.isArray(scrut16) && scrut16.length === 2) {
                      first0 = scrut16[0];
                      first1 = scrut16[1];
                      leftPrec2 = first0;
                      rightPrec2 = first1;
                      tmp71 = "its precedence is " + leftPrec2;
                      doTemp4 = Parser.tracer.print(tmp71, 764);
                      scrut17 = leftPrec2 > prec;
                      if (scrut17 === true) {
                        tmp72 = consume();
                        tmp73 = Parser.Tree.Ident(name1, true);
                        op3 = tmp73;
                        tmp74 = simpleExpr(rightPrec2, bracket);
                        rhs1 = tmp74;
                        tmp75 = Stack.Cons(rhs1, Stack.Nil);
                        tmp76 = Stack.Cons(acc, tmp75);
                        tmp77 = Parser.Tree.App(op3, tmp76);
                        return exprCont(tmp77, prec, bracket)
                      } else {
                        return acc
                      }
                    } else {
                      token1 = param01;
                      scrut2 = Parser.#appPrec > prec;
                      if (scrut2 === true) {
                        tmp78 = Parser.tracer.print("found an application", 808);
                        scrut3 = simpleExpr(Parser.#appPrec, bracket);
                        if (scrut3 instanceof Parser.Tree.Empty.class) {
                          return acc
                        } else if (scrut3 instanceof Parser.Tree.Error.class) {
                          return acc
                        } else {
                          rhs = scrut3;
                          tmp79 = Stack.Cons(rhs, Stack.Nil);
                          tmp80 = Parser.Tree.App(acc, tmp79);
                          return exprCont(tmp80, prec, bracket)
                        }
                      } else {
                        tmp81 = "cannot consume " + token1;
                        tmp82 = Parser.tracer.print(tmp81, 814);
                        return acc
                      }
                    }
                  } else {
                    token1 = param01;
                    scrut2 = Parser.#appPrec > prec;
                    if (scrut2 === true) {
                      tmp83 = Parser.tracer.print("found an application", 808);
                      scrut3 = simpleExpr(Parser.#appPrec, bracket);
                      if (scrut3 instanceof Parser.Tree.Empty.class) {
                        return acc
                      } else if (scrut3 instanceof Parser.Tree.Error.class) {
                        return acc
                      } else {
                        rhs = scrut3;
                        tmp84 = Stack.Cons(rhs, Stack.Nil);
                        tmp85 = Parser.Tree.App(acc, tmp84);
                        return exprCont(tmp85, prec, bracket)
                      }
                    } else {
                      tmp86 = "cannot consume " + token1;
                      tmp87 = Parser.tracer.print(tmp86, 814);
                      return acc
                    }
                  }
                } else {
                  token1 = param01;
                  scrut2 = Parser.#appPrec > prec;
                  if (scrut2 === true) {
                    tmp88 = Parser.tracer.print("found an application", 808);
                    scrut3 = simpleExpr(Parser.#appPrec, bracket);
                    if (scrut3 instanceof Parser.Tree.Empty.class) {
                      return acc
                    } else if (scrut3 instanceof Parser.Tree.Error.class) {
                      return acc
                    } else {
                      rhs = scrut3;
                      tmp89 = Stack.Cons(rhs, Stack.Nil);
                      tmp90 = Parser.Tree.App(acc, tmp89);
                      return exprCont(tmp90, prec, bracket)
                    }
                  } else {
                    tmp91 = "cannot consume " + token1;
                    tmp92 = Parser.tracer.print(tmp91, 814);
                    return acc
                  }
                }
              }
            } else {
              tmp93 = "keyword `" + name2;
              tmp94 = tmp93 + "` does not have infix rules";
              doTemp6 = Parser.tracer.print(tmp94, 760);
              name1 = param012;
              if (param12 === true) {
                scrut15 = runtime.safeCall(Parser.keywords.get(name1));
                if (scrut15 instanceof Option.None.class) {
                  tmp95 = "found an operator \"" + name1;
                  tmp96 = tmp95 + "\"";
                  doTemp3 = Parser.tracer.print(tmp96, 762);
                  scrut16 = Parser.opPrec(name1);
                  if (globalThis.Array.isArray(scrut16) && scrut16.length === 2) {
                    first0 = scrut16[0];
                    first1 = scrut16[1];
                    leftPrec2 = first0;
                    rightPrec2 = first1;
                    tmp97 = "its precedence is " + leftPrec2;
                    doTemp4 = Parser.tracer.print(tmp97, 764);
                    scrut17 = leftPrec2 > prec;
                    if (scrut17 === true) {
                      tmp98 = consume();
                      tmp99 = Parser.Tree.Ident(name1, true);
                      op3 = tmp99;
                      tmp100 = simpleExpr(rightPrec2, bracket);
                      rhs1 = tmp100;
                      tmp101 = Stack.Cons(rhs1, Stack.Nil);
                      tmp102 = Stack.Cons(acc, tmp101);
                      tmp103 = Parser.Tree.App(op3, tmp102);
                      return exprCont(tmp103, prec, bracket)
                    } else {
                      return acc
                    }
                  } else {
                    token1 = param01;
                    scrut2 = Parser.#appPrec > prec;
                    if (scrut2 === true) {
                      tmp104 = Parser.tracer.print("found an application", 808);
                      scrut3 = simpleExpr(Parser.#appPrec, bracket);
                      if (scrut3 instanceof Parser.Tree.Empty.class) {
                        return acc
                      } else if (scrut3 instanceof Parser.Tree.Error.class) {
                        return acc
                      } else {
                        rhs = scrut3;
                        tmp105 = Stack.Cons(rhs, Stack.Nil);
                        tmp106 = Parser.Tree.App(acc, tmp105);
                        return exprCont(tmp106, prec, bracket)
                      }
                    } else {
                      tmp107 = "cannot consume " + token1;
                      tmp108 = Parser.tracer.print(tmp107, 814);
                      return acc
                    }
                  }
                } else {
                  token1 = param01;
                  scrut2 = Parser.#appPrec > prec;
                  if (scrut2 === true) {
                    tmp109 = Parser.tracer.print("found an application", 808);
                    scrut3 = simpleExpr(Parser.#appPrec, bracket);
                    if (scrut3 instanceof Parser.Tree.Empty.class) {
                      return acc
                    } else if (scrut3 instanceof Parser.Tree.Error.class) {
                      return acc
                    } else {
                      rhs = scrut3;
                      tmp110 = Stack.Cons(rhs, Stack.Nil);
                      tmp111 = Parser.Tree.App(acc, tmp110);
                      return exprCont(tmp111, prec, bracket)
                    }
                  } else {
                    tmp112 = "cannot consume " + token1;
                    tmp113 = Parser.tracer.print(tmp112, 814);
                    return acc
                  }
                }
              } else {
                token1 = param01;
                scrut2 = Parser.#appPrec > prec;
                if (scrut2 === true) {
                  tmp114 = Parser.tracer.print("found an application", 808);
                  scrut3 = simpleExpr(Parser.#appPrec, bracket);
                  if (scrut3 instanceof Parser.Tree.Empty.class) {
                    return acc
                  } else if (scrut3 instanceof Parser.Tree.Error.class) {
                    return acc
                  } else {
                    rhs = scrut3;
                    tmp115 = Stack.Cons(rhs, Stack.Nil);
                    tmp116 = Parser.Tree.App(acc, tmp115);
                    return exprCont(tmp116, prec, bracket)
                  }
                } else {
                  tmp117 = "cannot consume " + token1;
                  tmp118 = Parser.tracer.print(tmp117, 814);
                  return acc
                }
              }
            }
          } else {
            name1 = param012;
            if (param12 === true) {
              scrut15 = runtime.safeCall(Parser.keywords.get(name1));
              if (scrut15 instanceof Option.None.class) {
                tmp119 = "found an operator \"" + name1;
                tmp120 = tmp119 + "\"";
                doTemp3 = Parser.tracer.print(tmp120, 762);
                scrut16 = Parser.opPrec(name1);
                if (globalThis.Array.isArray(scrut16) && scrut16.length === 2) {
                  first0 = scrut16[0];
                  first1 = scrut16[1];
                  leftPrec2 = first0;
                  rightPrec2 = first1;
                  tmp121 = "its precedence is " + leftPrec2;
                  doTemp4 = Parser.tracer.print(tmp121, 764);
                  scrut17 = leftPrec2 > prec;
                  if (scrut17 === true) {
                    tmp122 = consume();
                    tmp123 = Parser.Tree.Ident(name1, true);
                    op3 = tmp123;
                    tmp124 = simpleExpr(rightPrec2, bracket);
                    rhs1 = tmp124;
                    tmp125 = Stack.Cons(rhs1, Stack.Nil);
                    tmp126 = Stack.Cons(acc, tmp125);
                    tmp127 = Parser.Tree.App(op3, tmp126);
                    return exprCont(tmp127, prec, bracket)
                  } else {
                    return acc
                  }
                } else {
                  token1 = param01;
                  scrut2 = Parser.#appPrec > prec;
                  if (scrut2 === true) {
                    tmp128 = Parser.tracer.print("found an application", 808);
                    scrut3 = simpleExpr(Parser.#appPrec, bracket);
                    if (scrut3 instanceof Parser.Tree.Empty.class) {
                      return acc
                    } else if (scrut3 instanceof Parser.Tree.Error.class) {
                      return acc
                    } else {
                      rhs = scrut3;
                      tmp129 = Stack.Cons(rhs, Stack.Nil);
                      tmp130 = Parser.Tree.App(acc, tmp129);
                      return exprCont(tmp130, prec, bracket)
                    }
                  } else {
                    tmp131 = "cannot consume " + token1;
                    tmp132 = Parser.tracer.print(tmp131, 814);
                    return acc
                  }
                }
              } else {
                token1 = param01;
                scrut2 = Parser.#appPrec > prec;
                if (scrut2 === true) {
                  tmp133 = Parser.tracer.print("found an application", 808);
                  scrut3 = simpleExpr(Parser.#appPrec, bracket);
                  if (scrut3 instanceof Parser.Tree.Empty.class) {
                    return acc
                  } else if (scrut3 instanceof Parser.Tree.Error.class) {
                    return acc
                  } else {
                    rhs = scrut3;
                    tmp134 = Stack.Cons(rhs, Stack.Nil);
                    tmp135 = Parser.Tree.App(acc, tmp134);
                    return exprCont(tmp135, prec, bracket)
                  }
                } else {
                  tmp136 = "cannot consume " + token1;
                  tmp137 = Parser.tracer.print(tmp136, 814);
                  return acc
                }
              }
            } else {
              token1 = param01;
              scrut2 = Parser.#appPrec > prec;
              if (scrut2 === true) {
                tmp138 = Parser.tracer.print("found an application", 808);
                scrut3 = simpleExpr(Parser.#appPrec, bracket);
                if (scrut3 instanceof Parser.Tree.Empty.class) {
                  return acc
                } else if (scrut3 instanceof Parser.Tree.Error.class) {
                  return acc
                } else {
                  rhs = scrut3;
                  tmp139 = Stack.Cons(rhs, Stack.Nil);
                  tmp140 = Parser.Tree.App(acc, tmp139);
                  return exprCont(tmp140, prec, bracket)
                }
              } else {
                tmp141 = "cannot consume " + token1;
                tmp142 = Parser.tracer.print(tmp141, 814);
                return acc
              }
            }
          }
        } else if (param01 instanceof Lexer.Token.Close.class) {
          param010 = param01.kind;
          kind = param010;
          tmp143 = "found a close bracket of " + kind;
          doTemp2 = Parser.tracer.print(tmp143, 773);
          if (bracket instanceof Option.Some.class) {
            param011 = bracket.value;
            kind$_ = param011;
            scrut14 = kind == kind$_;
            if (scrut14 === true) {
              return acc
            } else {
              return Parser.Tree.Error(acc, "mismatched brackets")
            }
          } else if (bracket instanceof Option.None.class) {
            return Parser.Tree.Error(acc, "missing close bracket")
          } else {
            token1 = param01;
            scrut2 = Parser.#appPrec > prec;
            if (scrut2 === true) {
              tmp144 = Parser.tracer.print("found an application", 808);
              scrut3 = simpleExpr(Parser.#appPrec, bracket);
              if (scrut3 instanceof Parser.Tree.Empty.class) {
                return acc
              } else if (scrut3 instanceof Parser.Tree.Error.class) {
                return acc
              } else {
                rhs = scrut3;
                tmp145 = Stack.Cons(rhs, Stack.Nil);
                tmp146 = Parser.Tree.App(acc, tmp145);
                return exprCont(tmp146, prec, bracket)
              }
            } else {
              tmp147 = "cannot consume " + token1;
              tmp148 = Parser.tracer.print(tmp147, 814);
              return acc
            }
          }
        } else if (param01 instanceof Lexer.Token.Semicolon.class) {
          tmp149 = Parser.tracer.print("found a semicolon", 779);
          scrut9 = runtime.safeCall(Parser.keywords.get(";"));
          if (scrut9 instanceof Option.Some.class) {
            param06 = scrut9.value;
            keyword3 = param06;
            scrut10 = keyword3.leftPrec;
            if (scrut10 instanceof Option.Some.class) {
              param07 = scrut10.value;
              leftPrec1 = param07;
              scrut11 = leftPrec1 > prec;
              if (scrut11 === true) {
                tmp150 = consume();
                scrut12 = keyword3.rightPrec;
                if (scrut12 instanceof Option.Some.class) {
                  param08 = scrut12.value;
                  rightPrec1 = param08;
                  scrut13 = simpleExpr(rightPrec1, bracket);
                  if (scrut13 instanceof Parser.Tree.Sequence.class) {
                    param09 = scrut13.trees;
                    trees1 = param09;
                    tmp151 = Stack.Cons(acc, trees1);
                    tmp152 = Parser.Tree.Sequence(tmp151);
                  } else {
                    tree2 = scrut13;
                    tmp153 = Stack.Cons(tree2, Stack.Nil);
                    tmp154 = Stack.Cons(acc, tmp153);
                    tmp152 = Parser.Tree.Sequence(tmp154);
                  }
                  acc$_1 = tmp152;
                  return exprCont(acc$_1, prec, bracket)
                } else {
                  throw new globalThis.Error("match error");
                }
              } else {
                tmp155 = "cannot consume " + keyword3;
                tmp156 = Parser.tracer.print(tmp155, 790);
                return acc
              }
            } else {
              throw new globalThis.Error("match error");
            }
          } else {
            throw new globalThis.Error("match error");
          }
        } else if (param01 instanceof Lexer.Token.Comma.class) {
          tmp157 = Parser.tracer.print("found a comma", 793);
          scrut4 = runtime.safeCall(Parser.keywords.get(","));
          if (scrut4 instanceof Option.Some.class) {
            param02 = scrut4.value;
            keyword2 = param02;
            scrut5 = keyword2.leftPrec;
            if (scrut5 instanceof Option.Some.class) {
              param03 = scrut5.value;
              leftPrec = param03;
              scrut6 = leftPrec > prec;
              if (scrut6 === true) {
                tmp158 = consume();
                scrut7 = keyword2.rightPrec;
                if (scrut7 instanceof Option.Some.class) {
                  param04 = scrut7.value;
                  rightPrec = param04;
                  scrut8 = simpleExpr(rightPrec, bracket);
                  if (scrut8 instanceof Parser.Tree.Tuple.class) {
                    param05 = scrut8.trees;
                    trees = param05;
                    tmp159 = Stack.Cons(acc, trees);
                    tmp160 = Parser.Tree.Tuple(tmp159);
                  } else {
                    tree1 = scrut8;
                    tmp161 = Stack.Cons(tree1, Stack.Nil);
                    tmp162 = Stack.Cons(acc, tmp161);
                    tmp160 = Parser.Tree.Tuple(tmp162);
                  }
                  acc$_ = tmp160;
                  return exprCont(acc$_, prec, bracket)
                } else {
                  throw new globalThis.Error("match error");
                }
              } else {
                tmp163 = "cannot consume " + keyword2;
                tmp164 = Parser.tracer.print(tmp163, 804);
                return acc
              }
            } else {
              throw new globalThis.Error("match error");
            }
          } else {
            throw new globalThis.Error("match error");
          }
        } else {
          token1 = param01;
          scrut2 = Parser.#appPrec > prec;
          if (scrut2 === true) {
            tmp165 = Parser.tracer.print("found an application", 808);
            scrut3 = simpleExpr(Parser.#appPrec, bracket);
            if (scrut3 instanceof Parser.Tree.Empty.class) {
              return acc
            } else if (scrut3 instanceof Parser.Tree.Error.class) {
              return acc
            } else {
              rhs = scrut3;
              tmp166 = Stack.Cons(rhs, Stack.Nil);
              tmp167 = Parser.Tree.App(acc, tmp166);
              return exprCont(tmp167, prec, bracket)
            }
          } else {
            tmp168 = "cannot consume " + token1;
            tmp169 = Parser.tracer.print(tmp168, 814);
            return acc
          }
        }
      } else if (scrut1 instanceof Stack.Nil.class) {
        doTemp1 = Parser.tracer.print("found an EOF", 817);
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
    tmp = simpleExpr(0, Option.None);
    tree = tmp;
    tmp1 = yeetSpaces();
    scrut = tmp1;
    if (scrut instanceof Stack.Cons.class) {
      param0 = scrut.head;
      param1 = scrut.tail;
      token = param0;
      tmp2 = "expect EOF instead of " + token;
      message = tmp2;
      tmp3 = Parser.tracer.print(message, 825);
      return Parser.Tree.Error(tree, message)
    } else if (scrut instanceof Stack.Nil.class) {
      return tree
    } else {
      throw new globalThis.Error("match error");
    }
  }
  static toString() { return "Parser"; }
};
let Parser = Parser1; export default Parser;
