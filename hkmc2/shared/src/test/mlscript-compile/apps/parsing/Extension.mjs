import runtime from "./../../Runtime.mjs";
import Precedence from "./Precedence.mjs";
import Rules from "./Rules.mjs";
import Token from "./Token.mjs";
import ParseRule from "./ParseRule.mjs";
import Keyword from "./Keyword.mjs";
import Tree from "./Tree.mjs";
import Stack from "./../../Stack.mjs";
import Option from "./../../Option.mjs";
import Predef from "./../../Predef.mjs";
import Iter from "./../../Iter.mjs";
let Extension1;
Extension1 = class Extension {
  static {
    const OpenCategory$class = class OpenCategory {
      constructor() {}
      unapply(scrut) {
        if (scrut === "term") {
          return runtime.safeCall(globalThis.Predef.MatchResult([]))
        } else if (scrut === "type") {
          return runtime.safeCall(globalThis.Predef.MatchResult([]))
        } else if (scrut === "decl") {
          return runtime.safeCall(globalThis.Predef.MatchResult([]))
        } else {
          return runtime.safeCall(globalThis.Predef.MatchFailure())
        }
      } 
      unapplyStringPrefix(topic) {
        let cond, sliced, cond1, sliced1, cond2, sliced2;
        cond = globalThis.Predef.stringStartsWith(topic, "term");
        if (cond === true) {
          sliced = globalThis.Predef.stringDrop(topic, 4);
          return runtime.safeCall(globalThis.Predef.MatchResult([
            sliced
          ]))
        } else {
          cond1 = globalThis.Predef.stringStartsWith(topic, "type");
          if (cond1 === true) {
            sliced1 = globalThis.Predef.stringDrop(topic, 4);
            return runtime.safeCall(globalThis.Predef.MatchResult([
              sliced1
            ]))
          } else {
            cond2 = globalThis.Predef.stringStartsWith(topic, "decl");
            if (cond2 === true) {
              sliced2 = globalThis.Predef.stringDrop(topic, 4);
              return runtime.safeCall(globalThis.Predef.MatchResult([
                sliced2
              ]))
            } else {
              return runtime.safeCall(globalThis.Predef.MatchFailure())
            }
          }
        }
      }
      toString() { return "OpenCategory"; }
    };
    this.OpenCategory = new OpenCategory$class;
    this.OpenCategory.class = OpenCategory$class;
    const ClosedCategory$class = class ClosedCategory {
      constructor() {}
      unapply(scrut) {
        if (scrut === "ident") {
          return runtime.safeCall(globalThis.Predef.MatchResult([]))
        } else if (scrut === "typevar") {
          return runtime.safeCall(globalThis.Predef.MatchResult([]))
        } else {
          return runtime.safeCall(globalThis.Predef.MatchFailure())
        }
      } 
      unapplyStringPrefix(topic) {
        let cond, sliced, cond1, sliced1;
        cond = globalThis.Predef.stringStartsWith(topic, "ident");
        if (cond === true) {
          sliced = globalThis.Predef.stringDrop(topic, 5);
          return runtime.safeCall(globalThis.Predef.MatchResult([
            sliced
          ]))
        } else {
          cond1 = globalThis.Predef.stringStartsWith(topic, "typevar");
          if (cond1 === true) {
            sliced1 = globalThis.Predef.stringDrop(topic, 7);
            return runtime.safeCall(globalThis.Predef.MatchResult([
              sliced1
            ]))
          } else {
            return runtime.safeCall(globalThis.Predef.MatchFailure())
          }
        }
      }
      toString() { return "ClosedCategory"; }
    };
    this.ClosedCategory = new ClosedCategory$class;
    this.ClosedCategory.class = ClosedCategory$class;
  }
  static isDiagramDirective(tree) {
    let param0, param1, param01, param11, first1, first0, param02, param12;
    if (tree instanceof Tree.Define.class) {
      param0 = tree.kind;
      param1 = tree.items;
      if (param0 instanceof Tree.DefineKind.Directive.class) {
        if (param1 instanceof Stack.Cons.class) {
          param01 = param1.head;
          param11 = param1.tail;
          if (globalThis.Array.isArray(param01) && param01.length === 2) {
            first0 = param01[0];
            first1 = param01[1];
            if (first0 instanceof Tree.Ident.class) {
              param02 = first0.name;
              param12 = first0.symbolic;
              if (param02 === "diagram") {
                if (param11 instanceof Stack.Nil.class) {
                  return true
                } else {
                  return false
                }
              } else {
                return false
              }
            } else {
              return false
            }
          } else {
            return false
          }
        } else {
          return false
        }
      } else {
        return false
      }
    } else {
      return false
    }
  } 
  static parsePrecedenceTree(tree1) {
    let param0, param1, param01, param11, param02, param12, value, param03, param13, tmp;
    if (tree1 instanceof Tree.Ident.class) {
      param03 = tree1.name;
      param13 = tree1.symbolic;
      if (param03 === "None") {
        return Option.None
      } else {
        throw new globalThis.Error("match error");
      }
    } else if (tree1 instanceof Tree.App.class) {
      param0 = tree1.callee;
      param1 = tree1.argument;
      if (param0 instanceof Tree.Ident.class) {
        param01 = param0.name;
        param11 = param0.symbolic;
        if (param01 === "Some") {
          if (param1 instanceof Tree.Literal.class) {
            param02 = param1.kind;
            param12 = param1.value;
            if (param02 instanceof Token.LiteralKind.Integer.class) {
              value = param12;
              tmp = globalThis.parseInt(value, 10);
              return Option.Some(tmp)
            } else {
              throw new globalThis.Error("match error");
            }
          } else {
            throw new globalThis.Error("match error");
          }
        } else {
          throw new globalThis.Error("match error");
        }
      } else {
        throw new globalThis.Error("match error");
      }
    } else {
      throw new globalThis.Error("match error");
    }
  } 
  static extendKeyword(tree2) {
    let param0, param01, param1, keyword, param02, param11, leftPrec, param03, param12, rightPrec, param04, param13, name, leftPrec$_, rightPrec$_, tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8;
    if (tree2 instanceof Tree.Tuple.class) {
      param0 = tree2.trees;
      if (param0 instanceof Stack.Cons.class) {
        param01 = param0.head;
        param1 = param0.tail;
        keyword = param01;
        if (param1 instanceof Stack.Cons.class) {
          param02 = param1.head;
          param11 = param1.tail;
          leftPrec = param02;
          if (param11 instanceof Stack.Cons.class) {
            param03 = param11.head;
            param12 = param11.tail;
            rightPrec = param03;
            if (param12 instanceof Stack.Nil.class) {
              if (keyword instanceof Tree.Literal.class) {
                param04 = keyword.kind;
                param13 = keyword.value;
                if (param04 instanceof Token.LiteralKind.String.class) {
                  name = param13;
                  tmp = Extension.parsePrecedenceTree(leftPrec);
                  leftPrec$_ = tmp;
                  tmp1 = Extension.parsePrecedenceTree(rightPrec);
                  rightPrec$_ = tmp1;
                  return Precedence.Keywords.keyword(name, leftPrec$_, rightPrec$_)
                } else {
                  tmp2 = "expect a string literal but found " + keyword;
                  return Predef.print(tmp2)
                }
              } else {
                tmp3 = "expect a string literal but found " + keyword;
                return Predef.print(tmp3)
              }
            } else {
              tmp4 = "expect a tuple but found " + tree2;
              return Predef.print(tmp4)
            }
          } else {
            tmp5 = "expect a tuple but found " + tree2;
            return Predef.print(tmp5)
          }
        } else {
          tmp6 = "expect a tuple but found " + tree2;
          return Predef.print(tmp6)
        }
      } else {
        tmp7 = "expect a tuple but found " + tree2;
        return Predef.print(tmp7)
      }
    } else {
      tmp8 = "expect a tuple but found " + tree2;
      return Predef.print(tmp8)
    }
  } 
  static newCategory(tree3) {
    let param0, param1, name, scrut, param01, rule, tmp, tmp1, tmp2, tmp3, tmp4;
    if (tree3 instanceof Tree.Literal.class) {
      param0 = tree3.kind;
      param1 = tree3.value;
      if (param0 instanceof Token.LiteralKind.String.class) {
        name = param1;
        scrut = runtime.safeCall(Rules.syntaxKinds.get(name));
        if (scrut instanceof Option.Some.class) {
          param01 = scrut.value;
          rule = param01;
          tmp = "Category already exists: " + rule.display;
          return Predef.print(tmp)
        } else if (scrut instanceof Option.None.class) {
          tmp1 = ParseRule.ParseRule(name, Stack.Nil);
          return Rules.syntaxKinds.insert(name, tmp1)
        } else {
          tmp2 = "expect a string literal but found " + tree3;
          return Predef.print(tmp2)
        }
      } else {
        tmp3 = "expect a string literal but found " + tree3;
        return Predef.print(tmp3)
      }
    } else {
      tmp4 = "expect a string literal but found " + tree3;
      return Predef.print(tmp4)
    }
  } 
  static extendCategory(choiceBodyTree) {
    let scrut, param0, first1, first0, kindName, choice, scrut1, param01, rule, matchResult, matchResult1, param02, param1, param2, param3, param4, refKindName, process, outerPrec, innerPrec, rest, scrut2, param03, refRule, tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7;
    scrut = Extension.parseChoiceTree(choiceBodyTree);
    if (scrut instanceof Option.Some.class) {
      param0 = scrut.value;
      if (globalThis.Array.isArray(param0) && param0.length === 2) {
        first0 = param0[0];
        first1 = param0[1];
        kindName = first0;
        choice = first1;
        scrut1 = runtime.safeCall(Rules.syntaxKinds.get(kindName));
        if (scrut1 instanceof Option.Some.class) {
          param01 = scrut1.value;
          rule = param01;
          matchResult1 = runtime.safeCall(Extension.OpenCategory.unapply(kindName));
          if (matchResult1 instanceof globalThis.Predef.MatchResult.class) {
            if (choice instanceof ParseRule.Choice.Ref.class) {
              param02 = choice.kind;
              param1 = choice.process;
              param2 = choice.outerPrec;
              param3 = choice.innerPrec;
              param4 = choice.rest;
              refKindName = param02;
              process = param1;
              outerPrec = param2;
              innerPrec = param3;
              rest = param4;
              scrut2 = runtime.safeCall(Rules.syntaxKinds.get(refKindName));
              if (scrut2 instanceof Option.Some.class) {
                param03 = scrut2.value;
                refRule = param03;
                tmp = refRule.andThen2(rest, process);
                return runtime.safeCall(rule.extendChoices(tmp.choices))
              } else {
                tmp1 = "Unknown referenced syntax category: " + refKindName;
                return Predef.print(tmp1)
              }
            } else {
              tmp2 = Stack.Cons(choice, Stack.Nil);
              return runtime.safeCall(rule.extendChoices(tmp2))
            }
          } else {
            matchResult = runtime.safeCall(Extension.ClosedCategory.unapply(kindName));
            if (matchResult instanceof globalThis.Predef.MatchResult.class) {
              tmp3 = "Cannot extend a closed category: " + kindName;
              return Predef.print(tmp3)
            } else {
              tmp4 = Stack.Cons(choice, Stack.Nil);
              return runtime.safeCall(rule.extendChoices(tmp4))
            }
          }
        } else if (scrut1 instanceof Option.None.class) {
          tmp5 = "Unknown syntax kind: " + kindName;
          return Predef.print(tmp5)
        } else {
          throw new globalThis.Error("match error");
        }
      } else {
        throw new globalThis.Error("match error");
      }
    } else if (scrut instanceof Option.None.class) {
      tmp6 = Tree.summary(choiceBodyTree);
      tmp7 = "Invalid syntax description: " + tmp6;
      return Predef.print(tmp7)
    } else {
      throw new globalThis.Error("match error");
    }
  } 
  static parseChoiceTree(tree4) {
    let go, param0, param01, param1, categoryIdent, param02, param11, choiceTree, param03, param12, funcIdent, param04, param13, categoryName, op, param05, param14, other, param06, elements, tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20, tmp21, tmp22, tmp23, tmp24, tmp25, tmp26, tmp27, tmp28, tmp29, tmp30, tmp31, tmp32, tmp33, tmp34, tmp35, tmp36;
    go = function go(trees) {
      let res, param07, param15, param08, param16, name, rest, param09, param17, param010, param18, param011, param19, name1, rest1, scrut, param012, keyword, tmp37, tmp38, tmp39;
      if (trees instanceof Stack.Cons.class) {
        param07 = trees.head;
        param15 = trees.tail;
        if (param07 instanceof Tree.App.class) {
          param09 = param07.callee;
          param17 = param07.argument;
          if (param09 instanceof Tree.Ident.class) {
            param010 = param09.name;
            param18 = param09.symbolic;
            if (param010 === "keyword") {
              if (param17 instanceof Tree.Literal.class) {
                param011 = param17.kind;
                param19 = param17.value;
                if (param011 instanceof Token.LiteralKind.String.class) {
                  name1 = param19;
                  rest1 = param15;
                  scrut = runtime.safeCall(Precedence.Keywords.all.get(name1));
                  if (scrut instanceof Option.Some.class) {
                    param012 = scrut.value;
                    keyword = param012;
                    tmp37 = go(rest1);
                    tmp38 = ParseRule.Choice.keyword(keyword, tmp37);
                  } else {
                    throw new globalThis.Error("match error");
                  }
                } else {
                  throw new globalThis.Error("match error");
                }
              } else {
                throw new globalThis.Error("match error");
              }
            } else {
              throw new globalThis.Error("match error");
            }
          } else {
            throw new globalThis.Error("match error");
          }
        } else if (param07 instanceof Tree.Literal.class) {
          param08 = param07.kind;
          param16 = param07.value;
          if (param08 instanceof Token.LiteralKind.String.class) {
            name = param16;
            rest = param15;
            tmp39 = go(rest);
            tmp38 = ParseRule.Choice.reference(name, (head, tail) => {
              return Stack.Cons(head, tail)
            }, "unnamed", tmp39);
          } else {
            throw new globalThis.Error("match error");
          }
        } else {
          throw new globalThis.Error("match error");
        }
      } else if (trees instanceof Stack.Nil.class) {
        tmp38 = ParseRule.Choice.end(Stack.Nil);
      } else {
        throw new globalThis.Error("match error");
      }
      res = tmp38;
      return res
    };
    if (tree4 instanceof Tree.Tuple.class) {
      param0 = tree4.trees;
      if (param0 instanceof Stack.Cons.class) {
        param01 = param0.head;
        param1 = param0.tail;
        categoryIdent = param01;
        if (param1 instanceof Stack.Cons.class) {
          param02 = param1.head;
          param11 = param1.tail;
          choiceTree = param02;
          if (param11 instanceof Stack.Cons.class) {
            param03 = param11.head;
            param12 = param11.tail;
            funcIdent = param03;
            if (param12 instanceof Stack.Nil.class) {
              if (categoryIdent instanceof Tree.Literal.class) {
                param04 = categoryIdent.kind;
                param13 = categoryIdent.value;
                if (param04 instanceof Token.LiteralKind.String.class) {
                  categoryName = param13;
                  if (funcIdent instanceof Tree.Ident.class) {
                    op = (trees) => {
                      let tmp37;
                      tmp37 = Iter.fromStack(trees);
                      return Iter.folded(tmp37, funcIdent, (f, x) => {
                        return Tree.App(f, x)
                      })
                    };
                    if (choiceTree instanceof Tree.Bracketed.class) {
                      param05 = choiceTree.kind;
                      param14 = choiceTree.tree;
                      if (param05 instanceof Token.Square.class) {
                        if (param14 instanceof Tree.Tuple.class) {
                          param06 = param14.trees;
                          elements = param06;
                          tmp = go(elements);
                          tmp1 = ParseRule.Choice.map(tmp, op);
                          tmp2 = Predef.tuple(categoryName, tmp1);
                          return Option.Some(tmp2)
                        } else {
                          other = param14;
                          tmp3 = Stack.Cons(other, Stack.Nil);
                          tmp4 = go(tmp3);
                          tmp5 = ParseRule.Choice.map(tmp4, op);
                          tmp6 = Predef.tuple(categoryName, tmp5);
                          return Option.Some(tmp6)
                        }
                      } else {
                        tmp7 = Tree.summary(choiceTree);
                        tmp8 = "Expect the choiceTree to be a bracketed term but found " + tmp7;
                        tmp9 = Predef.print(tmp8);
                        return Option.None
                      }
                    } else {
                      tmp10 = Tree.summary(choiceTree);
                      tmp11 = "Expect the choiceTree to be a bracketed term but found " + tmp10;
                      tmp12 = Predef.print(tmp11);
                      return Option.None
                    }
                  } else {
                    tmp13 = Tree.summary(choiceTree);
                    tmp14 = "Expect the choiceTree to be a bracketed term but found " + tmp13;
                    tmp15 = Predef.print(tmp14);
                    return Option.None
                  }
                } else {
                  tmp16 = Tree.summary(categoryIdent);
                  tmp17 = "Expect a the category to be an identifier but found " + tmp16;
                  tmp18 = Predef.print(tmp17);
                  return Option.None
                }
              } else {
                tmp19 = Tree.summary(categoryIdent);
                tmp20 = "Expect a the category to be an identifier but found " + tmp19;
                tmp21 = Predef.print(tmp20);
                return Option.None
              }
            } else {
              tmp22 = Tree.summary(tree4);
              tmp23 = "Expect the definition to be a tuple but found " + tmp22;
              tmp24 = Predef.print(tmp23);
              return Option.None
            }
          } else {
            tmp25 = Tree.summary(tree4);
            tmp26 = "Expect the definition to be a tuple but found " + tmp25;
            tmp27 = Predef.print(tmp26);
            return Option.None
          }
        } else {
          tmp28 = Tree.summary(tree4);
          tmp29 = "Expect the definition to be a tuple but found " + tmp28;
          tmp30 = Predef.print(tmp29);
          return Option.None
        }
      } else {
        tmp31 = Tree.summary(tree4);
        tmp32 = "Expect the definition to be a tuple but found " + tmp31;
        tmp33 = Predef.print(tmp32);
        return Option.None
      }
    } else {
      tmp34 = Tree.summary(tree4);
      tmp35 = "Expect the definition to be a tuple but found " + tmp34;
      tmp36 = Predef.print(tmp35);
      return Option.None
    }
  }
  static toString() { return "Extension"; }
};
let Extension = Extension1; export default Extension;
