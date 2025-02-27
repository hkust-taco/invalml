import runtime from "./../Runtime.mjs";
import Predef from "./../Predef.mjs";
import Option from "./../Option.mjs";
import Stack from "./../Stack.mjs";
import BetterMap from "./../BetterMap.mjs";
import TreeTracer from "./../TreeTracer.mjs";
import Iter from "./../Iter.mjs";
import Lexer from "./Lexer.mjs";
import Token from "./parsing/Token.mjs";
import TokenHelpers from "./parsing/TokenHelpers.mjs";
import Precedence from "./parsing/Precedence.mjs";
import Tree from "./parsing/Tree.mjs";
import ParseRule from "./parsing/ParseRule.mjs";
import Rules from "./parsing/Rules.mjs";
let Parser1;
Parser1 = class Parser {
  static {
    let tmp;
    tmp = new TreeTracer.TreeTracer();
    this.tracer = tmp;
  }
  static parse(tokens) {
    let parseKind, typeExprCont, term, parseRule, modCont, consume, termCont, typeExpr, mod, counter, tree, param0, param1, token, message, tmp, tmp1, tmp2;
    consume = function consume() {
      let param01, param11, head, tail, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8;
      if (tokens instanceof Stack.Cons.class) {
        param01 = tokens.head;
        param11 = tokens.tail;
        head = param01;
        tail = param11;
        tmp3 = Token.summary(head);
        tmp4 = "consume: `" + tmp3;
        tmp5 = tmp4 + "` at #";
        tmp6 = tmp5 + counter;
        tmp7 = runtime.safeCall(Parser.tracer.print(tmp6));
        tokens = tail;
        tmp8 = counter + 1;
        counter = tmp8;
        return runtime.Unit
      } else {
        return runtime.safeCall(Parser.tracer.print("consume: the end of input"))
      }
    };
    parseKind = function parseKind(kind, prec) {
      let scrut, param01, rule, param02, param11, token1, param03, param12, name, scrut1, param04, param13, token2, param05, param14, name1, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11;
      if (kind === "type") {
        return typeExpr(prec, Precedence.TypeKeywords.all)
      } else if (kind === "term") {
        return term(prec, Precedence.Keywords.all)
      } else if (kind === "ident") {
        if (tokens instanceof Stack.Cons.class) {
          param04 = tokens.head;
          param13 = tokens.tail;
          if (param04 instanceof Token.Identifier.class) {
            param05 = param04.name;
            param14 = param04.symbolic;
            name1 = param05;
            if (param14 === false) {
              tmp3 = consume();
              return Tree.Ident(name1, false)
            } else {
              token2 = param04;
              tmp4 = "expect an identifier but found " + token2;
              return Tree.error(tmp4)
            }
          } else {
            token2 = param04;
            tmp5 = "expect an identifier but found " + token2;
            return Tree.error(tmp5)
          }
        } else if (tokens instanceof Stack.Nil.class) {
          return Tree.error("expect an identifier but found the end of input")
        } else {
          throw new globalThis.Error("match error");
        }
      } else if (kind === "typevar") {
        if (tokens instanceof Stack.Cons.class) {
          param02 = tokens.head;
          param11 = tokens.tail;
          if (param02 instanceof Token.Identifier.class) {
            param03 = param02.name;
            param12 = param02.symbolic;
            name = param03;
            if (param12 === false) {
              scrut1 = runtime.safeCall(name.at(0));
              if (scrut1 === "'") {
                tmp6 = consume();
                return Tree.Ident(name, false)
              } else {
                token1 = param02;
                tmp7 = "expect a type variable but found " + token1;
                return Tree.error(tmp7)
              }
            } else {
              token1 = param02;
              tmp8 = "expect a type variable but found " + token1;
              return Tree.error(tmp8)
            }
          } else {
            token1 = param02;
            tmp9 = "expect a type variable but found " + token1;
            return Tree.error(tmp9)
          }
        } else if (tokens instanceof Stack.Nil.class) {
          return Tree.error("expect a type variable but found the end of input")
        } else {
          throw new globalThis.Error("match error");
        }
      } else {
        scrut = runtime.safeCall(Rules.syntaxKinds.get(kind));
        if (scrut instanceof Option.Some.class) {
          param01 = scrut.value;
          rule = param01;
          return parseRule(prec, rule, Precedence.Keywords.all)
        } else {
          tmp10 = "Unknown syntax kind: \"" + kind;
          tmp11 = tmp10 + "\"";
          throw globalThis.Error(tmp11);
        }
      }
    };
    parseRule = function parseRule(prec, rule, allKeywords) {
      let tmp3, tmp4, tmp5, tmp6;
      tmp3 = "parsing rule \"" + rule.name;
      tmp4 = tmp3 + "\" with precedence ";
      tmp5 = tmp4 + prec;
      tmp6 = () => {
        let scrut, param01, value, param02, param11, other, doTemp, doTemp1, doTemp2, scrut1, param03, value1, scrut2, param04, first4, first3, first2, first1, first0, kind, process, outerPrec, innerPrec, rest, doTemp3, acc, doTemp4, scrut3, tree1, param05, param12, name, doTemp5, doTemp6, scrut4, param06, keyword, doTemp7, doTemp8, scrut5, doTemp9, doTemp10, doTemp11, scrut6, param07, value2, scrut7, param08, first41, first31, first21, first11, first01, kind1, process1, outerPrec1, innerPrec1, rest1, acc1, tree2, param09, rest2, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20, tmp21, tmp22, tmp23, tmp24, tmp25, tmp26, tmp27, tmp28, tmp29, tmp30, tmp31, tmp32, tmp33, tmp34, tmp35, tmp36, tmp37, tmp38, tmp39, tmp40, tmp41, tmp42, tmp43, tmp44, tmp45, tmp46, tmp47, tmp48, tmp49, tmp50, tmp51, tmp52, tmp53, tmp54, tmp55, tmp56, tmp57, tmp58, tmp59, tmp60, tmp61, tmp62, tmp63, tmp64, tmp65, tmp66, tmp67, tmp68, tmp69, tmp70, tmp71, tmp72, tmp73, tmp74, tmp75, tmp76, tmp77, tmp78, tmp79, tmp80, tmp81, tmp82, tmp83, tmp84, tmp85, tmp86, tmp87, tmp88, tmp89, tmp90, tmp91, tmp92, tmp93, tmp94, tmp95, tmp96, tmp97, tmp98, tmp99, tmp100, tmp101, tmp102, tmp103, tmp104, tmp105, tmp106, tmp107, tmp108, tmp109, tmp110, tmp111, tmp112, tmp113, tmp114;
        if (tokens instanceof Stack.Cons.class) {
          param02 = tokens.head;
          param11 = tokens.tail;
          if (param02 instanceof Token.Identifier.class) {
            param05 = param02.name;
            param12 = param02.symbolic;
            name = param05;
            tmp7 = "found an identifier \"" + name;
            tmp8 = tmp7 + "\"";
            doTemp5 = Parser.tracer.print(tmp8, 71);
            scrut4 = runtime.safeCall(allKeywords.get(name));
            if (scrut4 instanceof Option.Some.class) {
              param06 = scrut4.value;
              keyword = param06;
              tmp9 = runtime.safeCall(keyword.toString());
              doTemp7 = Parser.tracer.print(tmp9, 73);
              tmp10 = (caseScrut) => {
                let first12, first02, k, v, tmp115;
                if (globalThis.Array.isArray(caseScrut) && caseScrut.length === 2) {
                  first02 = caseScrut[0];
                  first12 = caseScrut[1];
                  k = first02;
                  v = first12;
                  tmp115 = "`" + k;
                  return tmp115 + "`"
                } else {
                  throw new globalThis.Error("match error");
                }
              };
              tmp11 = Iter.mapping(rule.keywordChoices, tmp10);
              tmp12 = Iter.joined(tmp11, ", ");
              doTemp8 = Parser.tracer.print("keyword choices: ", tmp12);
              scrut5 = runtime.safeCall(rule.keywordChoices.get(name));
              if (scrut5 instanceof Option.Some.class) {
                param09 = scrut5.value;
                rest2 = param09;
                tmp13 = "found a rule starting with `" + name;
                tmp14 = tmp13 + "`";
                tmp15 = Parser.tracer.print(tmp14, 79);
                tmp16 = "the rest of the rule: " + rest2.display;
                tmp17 = Parser.tracer.print(tmp16, 80);
                tmp18 = consume();
                return parseRule(0, rest2, allKeywords)
              } else if (scrut5 instanceof Option.None.class) {
                tmp19 = "no rule starting with `" + name;
                tmp20 = tmp19 + "` was found";
                doTemp9 = Parser.tracer.print(tmp20, 84);
                tmp21 = "the left prec of `" + name;
                tmp22 = tmp21 + "` is ";
                tmp23 = tmp22 + keyword.leftPrec;
                doTemp10 = Parser.tracer.print(tmp23, 85);
                scrut7 = rule.exprChoice;
                if (scrut7 instanceof Option.Some.class) {
                  param08 = scrut7.value;
                  if (globalThis.Array.isArray(param08) && param08.length === 5) {
                    first01 = param08[0];
                    first11 = param08[1];
                    first21 = param08[2];
                    first31 = param08[3];
                    first41 = param08[4];
                    kind1 = first01;
                    process1 = first11;
                    outerPrec1 = first21;
                    innerPrec1 = first31;
                    rest1 = first41;
                    tmp24 = Parser.tracer.print("found an expression choice", 88);
                    tmp25 = parseKind(kind1, prec);
                    acc1 = tmp25;
                    tmp26 = parseRule(prec, rest1, allKeywords);
                    tree2 = tmp26;
                    return runtime.safeCall(process1(acc1, tree2))
                  } else {
                    tmp27 = "no exprChoice or the prec is less than " + prec;
                    doTemp11 = Parser.tracer.print(tmp27, 92);
                    scrut6 = rule.endChoice;
                    if (scrut6 instanceof Option.Some.class) {
                      param07 = scrut6.value;
                      value2 = param07;
                      tmp28 = Parser.tracer.print("found end choice", 94);
                      return value2
                    } else {
                      tmp29 = consume();
                      tmp30 = "unexpected keyword " + keyword.name;
                      return Tree.error(tmp30)
                    }
                  }
                } else {
                  tmp31 = "no exprChoice or the prec is less than " + prec;
                  doTemp11 = Parser.tracer.print(tmp31, 92);
                  scrut6 = rule.endChoice;
                  if (scrut6 instanceof Option.Some.class) {
                    param07 = scrut6.value;
                    value2 = param07;
                    tmp32 = Parser.tracer.print("found end choice", 94);
                    return value2
                  } else {
                    tmp33 = consume();
                    tmp34 = "unexpected keyword " + keyword.name;
                    return Tree.error(tmp34)
                  }
                }
              } else {
                tmp35 = "\"" + name;
                tmp36 = tmp35 + "\" is not a keyword";
                doTemp6 = Parser.tracer.print(tmp36, 99);
                other = param02;
                tmp37 = "the current rule is " + rule.display;
                doTemp = runtime.safeCall(Parser.tracer.print(tmp37));
                scrut2 = rule.exprChoice;
                if (scrut2 instanceof Option.Some.class) {
                  param04 = scrut2.value;
                  if (globalThis.Array.isArray(param04) && param04.length === 5) {
                    first0 = param04[0];
                    first1 = param04[1];
                    first2 = param04[2];
                    first3 = param04[3];
                    first4 = param04[4];
                    kind = first0;
                    process = first1;
                    outerPrec = first2;
                    innerPrec = first3;
                    rest = first4;
                    tmp38 = "parse \"" + kind;
                    tmp39 = tmp38 + "\" kind from ";
                    tmp40 = TokenHelpers.preview(tokens);
                    tmp41 = tmp39 + tmp40;
                    doTemp3 = Parser.tracer.print(tmp41, 104);
                    acc = parseKind(kind, prec);
                    scrut3 = Tree.nonEmptyError(acc);
                    if (scrut3 === true) {
                      tmp42 = "the rest rule: " + rest.display;
                      tmp43 = Parser.tracer.print(tmp42, 107);
                      tmp44 = parseRule(prec, rest, allKeywords);
                      tree1 = tmp44;
                      tmp45 = Tree.summary(acc);
                      tmp46 = "acc: " + tmp45;
                      tmp47 = Parser.tracer.print(tmp46, 109);
                      tmp48 = Tree.summary(tree1);
                      tmp49 = "tree: " + tmp48;
                      tmp50 = Parser.tracer.print(tmp49, 110);
                      tmp51 = "tree AST is: " + tree1;
                      tmp52 = Parser.tracer.print(tmp51, 111);
                      return runtime.safeCall(process(acc, tree1))
                    } else {
                      doTemp4 = Parser.tracer.print("fallback to end choice", 113);
                      doTemp1 = Parser.tracer.print("no expression choice", 114);
                      scrut1 = rule.endChoice;
                      if (scrut1 instanceof Option.Some.class) {
                        param03 = scrut1.value;
                        value1 = param03;
                        tmp53 = Parser.tracer.print("found end choice", 116);
                        return value1
                      } else {
                        doTemp2 = Parser.tracer.print("no end choice", 118);
                        tmp54 = consume();
                        tmp55 = "unexpected token " + other;
                        return Tree.error(tmp55)
                      }
                    }
                  } else {
                    doTemp1 = Parser.tracer.print("no expression choice", 114);
                    scrut1 = rule.endChoice;
                    if (scrut1 instanceof Option.Some.class) {
                      param03 = scrut1.value;
                      value1 = param03;
                      tmp56 = Parser.tracer.print("found end choice", 116);
                      return value1
                    } else {
                      doTemp2 = Parser.tracer.print("no end choice", 118);
                      tmp57 = consume();
                      tmp58 = "unexpected token " + other;
                      return Tree.error(tmp58)
                    }
                  }
                } else {
                  doTemp1 = Parser.tracer.print("no expression choice", 114);
                  scrut1 = rule.endChoice;
                  if (scrut1 instanceof Option.Some.class) {
                    param03 = scrut1.value;
                    value1 = param03;
                    tmp59 = Parser.tracer.print("found end choice", 116);
                    return value1
                  } else {
                    doTemp2 = Parser.tracer.print("no end choice", 118);
                    tmp60 = consume();
                    tmp61 = "unexpected token " + other;
                    return Tree.error(tmp61)
                  }
                }
              }
            } else {
              tmp62 = "\"" + name;
              tmp63 = tmp62 + "\" is not a keyword";
              doTemp6 = Parser.tracer.print(tmp63, 99);
              other = param02;
              tmp64 = "the current rule is " + rule.display;
              doTemp = runtime.safeCall(Parser.tracer.print(tmp64));
              scrut2 = rule.exprChoice;
              if (scrut2 instanceof Option.Some.class) {
                param04 = scrut2.value;
                if (globalThis.Array.isArray(param04) && param04.length === 5) {
                  first0 = param04[0];
                  first1 = param04[1];
                  first2 = param04[2];
                  first3 = param04[3];
                  first4 = param04[4];
                  kind = first0;
                  process = first1;
                  outerPrec = first2;
                  innerPrec = first3;
                  rest = first4;
                  tmp65 = "parse \"" + kind;
                  tmp66 = tmp65 + "\" kind from ";
                  tmp67 = TokenHelpers.preview(tokens);
                  tmp68 = tmp66 + tmp67;
                  doTemp3 = Parser.tracer.print(tmp68, 104);
                  acc = parseKind(kind, prec);
                  scrut3 = Tree.nonEmptyError(acc);
                  if (scrut3 === true) {
                    tmp69 = "the rest rule: " + rest.display;
                    tmp70 = Parser.tracer.print(tmp69, 107);
                    tmp71 = parseRule(prec, rest, allKeywords);
                    tree1 = tmp71;
                    tmp72 = Tree.summary(acc);
                    tmp73 = "acc: " + tmp72;
                    tmp74 = Parser.tracer.print(tmp73, 109);
                    tmp75 = Tree.summary(tree1);
                    tmp76 = "tree: " + tmp75;
                    tmp77 = Parser.tracer.print(tmp76, 110);
                    tmp78 = "tree AST is: " + tree1;
                    tmp79 = Parser.tracer.print(tmp78, 111);
                    return runtime.safeCall(process(acc, tree1))
                  } else {
                    doTemp4 = Parser.tracer.print("fallback to end choice", 113);
                    doTemp1 = Parser.tracer.print("no expression choice", 114);
                    scrut1 = rule.endChoice;
                    if (scrut1 instanceof Option.Some.class) {
                      param03 = scrut1.value;
                      value1 = param03;
                      tmp80 = Parser.tracer.print("found end choice", 116);
                      return value1
                    } else {
                      doTemp2 = Parser.tracer.print("no end choice", 118);
                      tmp81 = consume();
                      tmp82 = "unexpected token " + other;
                      return Tree.error(tmp82)
                    }
                  }
                } else {
                  doTemp1 = Parser.tracer.print("no expression choice", 114);
                  scrut1 = rule.endChoice;
                  if (scrut1 instanceof Option.Some.class) {
                    param03 = scrut1.value;
                    value1 = param03;
                    tmp83 = Parser.tracer.print("found end choice", 116);
                    return value1
                  } else {
                    doTemp2 = Parser.tracer.print("no end choice", 118);
                    tmp84 = consume();
                    tmp85 = "unexpected token " + other;
                    return Tree.error(tmp85)
                  }
                }
              } else {
                doTemp1 = Parser.tracer.print("no expression choice", 114);
                scrut1 = rule.endChoice;
                if (scrut1 instanceof Option.Some.class) {
                  param03 = scrut1.value;
                  value1 = param03;
                  tmp86 = Parser.tracer.print("found end choice", 116);
                  return value1
                } else {
                  doTemp2 = Parser.tracer.print("no end choice", 118);
                  tmp87 = consume();
                  tmp88 = "unexpected token " + other;
                  return Tree.error(tmp88)
                }
              }
            }
          } else {
            other = param02;
            tmp89 = "the current rule is " + rule.display;
            doTemp = runtime.safeCall(Parser.tracer.print(tmp89));
            scrut2 = rule.exprChoice;
            if (scrut2 instanceof Option.Some.class) {
              param04 = scrut2.value;
              if (globalThis.Array.isArray(param04) && param04.length === 5) {
                first0 = param04[0];
                first1 = param04[1];
                first2 = param04[2];
                first3 = param04[3];
                first4 = param04[4];
                kind = first0;
                process = first1;
                outerPrec = first2;
                innerPrec = first3;
                rest = first4;
                tmp90 = "parse \"" + kind;
                tmp91 = tmp90 + "\" kind from ";
                tmp92 = TokenHelpers.preview(tokens);
                tmp93 = tmp91 + tmp92;
                doTemp3 = Parser.tracer.print(tmp93, 104);
                acc = parseKind(kind, prec);
                scrut3 = Tree.nonEmptyError(acc);
                if (scrut3 === true) {
                  tmp94 = "the rest rule: " + rest.display;
                  tmp95 = Parser.tracer.print(tmp94, 107);
                  tmp96 = parseRule(prec, rest, allKeywords);
                  tree1 = tmp96;
                  tmp97 = Tree.summary(acc);
                  tmp98 = "acc: " + tmp97;
                  tmp99 = Parser.tracer.print(tmp98, 109);
                  tmp100 = Tree.summary(tree1);
                  tmp101 = "tree: " + tmp100;
                  tmp102 = Parser.tracer.print(tmp101, 110);
                  tmp103 = "tree AST is: " + tree1;
                  tmp104 = Parser.tracer.print(tmp103, 111);
                  return runtime.safeCall(process(acc, tree1))
                } else {
                  doTemp4 = Parser.tracer.print("fallback to end choice", 113);
                  doTemp1 = Parser.tracer.print("no expression choice", 114);
                  scrut1 = rule.endChoice;
                  if (scrut1 instanceof Option.Some.class) {
                    param03 = scrut1.value;
                    value1 = param03;
                    tmp105 = Parser.tracer.print("found end choice", 116);
                    return value1
                  } else {
                    doTemp2 = Parser.tracer.print("no end choice", 118);
                    tmp106 = consume();
                    tmp107 = "unexpected token " + other;
                    return Tree.error(tmp107)
                  }
                }
              } else {
                doTemp1 = Parser.tracer.print("no expression choice", 114);
                scrut1 = rule.endChoice;
                if (scrut1 instanceof Option.Some.class) {
                  param03 = scrut1.value;
                  value1 = param03;
                  tmp108 = Parser.tracer.print("found end choice", 116);
                  return value1
                } else {
                  doTemp2 = Parser.tracer.print("no end choice", 118);
                  tmp109 = consume();
                  tmp110 = "unexpected token " + other;
                  return Tree.error(tmp110)
                }
              }
            } else {
              doTemp1 = Parser.tracer.print("no expression choice", 114);
              scrut1 = rule.endChoice;
              if (scrut1 instanceof Option.Some.class) {
                param03 = scrut1.value;
                value1 = param03;
                tmp111 = Parser.tracer.print("found end choice", 116);
                return value1
              } else {
                doTemp2 = Parser.tracer.print("no end choice", 118);
                tmp112 = consume();
                tmp113 = "unexpected token " + other;
                return Tree.error(tmp113)
              }
            }
          }
        } else if (tokens instanceof Stack.Nil.class) {
          scrut = rule.endChoice;
          if (scrut instanceof Option.Some.class) {
            param01 = scrut.value;
            value = param01;
            return value
          } else if (scrut instanceof Option.None.class) {
            tmp114 = Parser.tracer.print("no end choice but found the end of input", 125);
            return Tree.error("unexpected end of input")
          } else {
            throw new globalThis.Error("match error");
          }
        } else {
          throw new globalThis.Error("match error");
        }
      };
      return runtime.safeCall(Parser.tracer.trace(tmp5, (result) => {
        let tmp7, tmp8, tmp9;
        tmp7 = "parsed rule \"" + rule.name;
        tmp8 = tmp7 + "\": ";
        tmp9 = Tree.summary(result);
        return tmp8 + tmp9
      }, tmp6))
    };
    term = function term(prec) {
      let tmp3, tmp4, tmp5, tmp6, tmp7;
      tmp3 = "term <<< " + prec;
      tmp4 = tmp3 + " ";
      tmp5 = TokenHelpers.preview(tokens);
      tmp6 = tmp4 + tmp5;
      tmp7 = () => {
        let param01, param11, token1, param02, param12, kind, literal, param03, param13, name, symbolic, scrut, param04, keyword, scrut1, param05, rule, scrut2, acc, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20;
        if (tokens instanceof Stack.Cons.class) {
          param01 = tokens.head;
          param11 = tokens.tail;
          if (param01 instanceof Token.Identifier.class) {
            param03 = param01.name;
            param13 = param01.symbolic;
            name = param03;
            symbolic = param13;
            scrut = runtime.safeCall(Precedence.Keywords.all.get(name));
            if (scrut instanceof Option.Some.class) {
              param04 = scrut.value;
              keyword = param04;
              scrut1 = runtime.safeCall(Rules.termRule.keywordChoices.get(name));
              if (scrut1 instanceof Option.Some.class) {
                param05 = scrut1.value;
                rule = param05;
                scrut2 = keyword.leftPrecOrMin > prec;
                if (scrut2 === true) {
                  tmp8 = consume();
                  tmp9 = parseRule(keyword.rightPrecOrMax, rule, Precedence.Keywords.all);
                  acc = tmp9;
                  return termCont(acc, prec)
                } else {
                  tmp10 = "the left precedence is less" + name;
                  tmp11 = Parser.tracer.print(tmp10, 141);
                  return Tree.empty
                }
              } else if (scrut1 instanceof Option.None.class) {
                tmp12 = "no rule starting with " + name;
                tmp13 = Parser.tracer.print(tmp12, 144);
                return Tree.empty
              } else {
                token1 = param01;
                tmp14 = "unrecognized token: " + token1;
                return Tree.error(tmp14)
              }
            } else if (scrut instanceof Option.None.class) {
              tmp15 = consume();
              tmp16 = Tree.Ident(name, symbolic);
              return termCont(tmp16, prec)
            } else {
              token1 = param01;
              tmp17 = "unrecognized token: " + token1;
              return Tree.error(tmp17)
            }
          } else if (param01 instanceof Token.Literal.class) {
            param02 = param01.kind;
            param12 = param01.literal;
            kind = param02;
            literal = param12;
            tmp18 = consume();
            tmp19 = Tree.Literal(kind, literal);
            return termCont(tmp19, prec)
          } else {
            token1 = param01;
            tmp20 = "unrecognized token: " + token1;
            return Tree.error(tmp20)
          }
        } else if (tokens instanceof Stack.Nil.class) {
          return Tree.error("unexpected end of input")
        } else {
          throw new globalThis.Error("match error");
        }
      };
      return runtime.safeCall(Parser.tracer.trace(tmp6, (result) => {
        let tmp8;
        tmp8 = Tree.summary(result);
        return "term >>> " + tmp8
      }, tmp7))
    };
    termCont = function termCont(acc, prec) {
      let doTemp, param01, param11, token1, scrut, param02, first4, first3, first2, first1, first0, kind, process, outerPrec, innerPrec, rest, doTemp1, outerPrec$_, doTemp2, scrut1, scrut2, rhs, param03, param12, name, scrut3, doTemp3, scrut4, first11, first01, leftPrec, rightPrec, doTemp4, scrut5, op, rhs1, name1, symbolic, scrut6, param04, keyword, doTemp5, doTemp6, scrut7, param05, rule, doTemp7, scrut8, scrut9, param06, first41, first31, first21, first12, first02, kind1, process1, outerPrec1, innerPrec1, rest1, rhs2, acc$_, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20, tmp21, tmp22, tmp23, tmp24, tmp25, tmp26, tmp27, tmp28, tmp29, tmp30, tmp31, tmp32, tmp33, tmp34, tmp35, tmp36, tmp37, tmp38, tmp39, tmp40, tmp41, tmp42, tmp43, tmp44, tmp45, tmp46, tmp47, tmp48, tmp49, tmp50, tmp51, tmp52, tmp53, tmp54, tmp55, tmp56, tmp57, tmp58, tmp59, tmp60, tmp61, tmp62, tmp63, tmp64, tmp65, tmp66, tmp67, tmp68, tmp69, tmp70, tmp71, tmp72, tmp73, tmp74, tmp75, tmp76, tmp77, tmp78, tmp79, tmp80, tmp81, tmp82, tmp83, tmp84, tmp85, tmp86, tmp87, tmp88, tmp89, tmp90, tmp91, tmp92, tmp93, tmp94, tmp95, tmp96, tmp97, tmp98, tmp99, tmp100, tmp101, tmp102, tmp103, tmp104, tmp105, tmp106, tmp107, tmp108, tmp109, tmp110, tmp111, tmp112, tmp113, tmp114, tmp115, tmp116, tmp117, tmp118, tmp119, tmp120, tmp121, tmp122, tmp123, tmp124, tmp125, tmp126, tmp127, tmp128, tmp129, tmp130, tmp131, tmp132, tmp133, tmp134, tmp135, tmp136, tmp137, tmp138, tmp139, tmp140, tmp141, tmp142, tmp143, tmp144, tmp145, tmp146, tmp147, tmp148, tmp149, tmp150, tmp151, tmp152, tmp153, tmp154, tmp155, tmp156, tmp157, tmp158, tmp159, tmp160, tmp161, tmp162, tmp163, tmp164, tmp165, tmp166, tmp167, tmp168, tmp169, tmp170, tmp171, tmp172, tmp173, tmp174, tmp175, tmp176, tmp177, tmp178, tmp179, tmp180, tmp181, tmp182, tmp183, tmp184, tmp185, tmp186, tmp187, tmp188, tmp189, tmp190, tmp191, tmp192, tmp193, tmp194, tmp195, tmp196, tmp197, tmp198, tmp199, tmp200, tmp201, tmp202, tmp203, tmp204, tmp205, tmp206, tmp207, tmp208, tmp209, tmp210, tmp211, tmp212, tmp213, tmp214, tmp215, tmp216, tmp217, tmp218, tmp219, tmp220, tmp221, tmp222, tmp223, tmp224, tmp225, tmp226, tmp227, tmp228, tmp229, tmp230, tmp231, tmp232, tmp233, tmp234, tmp235, tmp236, tmp237, tmp238, tmp239, tmp240, tmp241, tmp242, tmp243, tmp244, tmp245, tmp246, tmp247, tmp248, tmp249, tmp250, tmp251, tmp252, tmp253, tmp254, tmp255, tmp256, tmp257, tmp258, tmp259, tmp260, tmp261, tmp262, tmp263, tmp264, tmp265, tmp266, tmp267, tmp268;
      tmp3 = ">>> termCont " + prec;
      tmp4 = tmp3 + " ";
      tmp5 = Tree.summary(acc);
      tmp6 = tmp4 + tmp5;
      tmp7 = tmp6 + " <<<";
      doTemp = Parser.tracer.print(tmp7, 156);
      if (tokens instanceof Stack.Cons.class) {
        param01 = tokens.head;
        param11 = tokens.tail;
        if (param01 instanceof Token.Identifier.class) {
          param03 = param01.name;
          param12 = param01.symbolic;
          name1 = param03;
          symbolic = param12;
          scrut6 = runtime.safeCall(Precedence.Keywords.all.get(name1));
          if (scrut6 instanceof Option.Some.class) {
            param04 = scrut6.value;
            keyword = param04;
            tmp8 = "found a keyword: " + name1;
            doTemp5 = Parser.tracer.print(tmp8, 159);
            scrut7 = runtime.safeCall(Rules.termInfixRule.keywordChoices.get(name1));
            if (scrut7 instanceof Option.Some.class) {
              param05 = scrut7.value;
              rule = param05;
              tmp9 = "the keyword is found in infix rules" + name1;
              doTemp7 = Parser.tracer.print(tmp9, 163);
              scrut8 = keyword.leftPrecOrMin > prec;
              if (scrut8 === true) {
                scrut9 = rule.exprChoice;
                if (scrut9 instanceof Option.Some.class) {
                  param06 = scrut9.value;
                  if (globalThis.Array.isArray(param06) && param06.length === 5) {
                    first02 = param06[0];
                    first12 = param06[1];
                    first21 = param06[2];
                    first31 = param06[3];
                    first41 = param06[4];
                    kind1 = first02;
                    process1 = first12;
                    outerPrec1 = first21;
                    innerPrec1 = first31;
                    rest1 = first41;
                    tmp10 = consume();
                    tmp11 = parseKind(kind1, keyword.rightPrecOrMin);
                    rhs2 = tmp11;
                    tmp12 = runtime.safeCall(process1(rhs2, runtime.Unit));
                    tmp13 = runtime.safeCall(tmp12(acc));
                    acc$_ = tmp13;
                    return termCont(acc$_, prec)
                  } else {
                    tmp14 = "keyword `" + name1;
                    tmp15 = tmp14 + "` does not have infix rules";
                    doTemp6 = Parser.tracer.print(tmp15, 172);
                    name = param03;
                    if (param12 === true) {
                      scrut3 = runtime.safeCall(Precedence.Keywords.all.get(name));
                      if (scrut3 instanceof Option.None.class) {
                        tmp16 = "found an operator \"" + name;
                        tmp17 = tmp16 + "\"";
                        doTemp3 = Parser.tracer.print(tmp17, 174);
                        scrut4 = Precedence.opPrec(name);
                        if (globalThis.Array.isArray(scrut4) && scrut4.length === 2) {
                          first01 = scrut4[0];
                          first11 = scrut4[1];
                          leftPrec = first01;
                          rightPrec = first11;
                          tmp18 = "leftPrec = " + leftPrec;
                          tmp19 = tmp18 + "; rightPrec = ";
                          tmp20 = tmp19 + rightPrec;
                          doTemp4 = Parser.tracer.print(tmp20, 176);
                          scrut5 = leftPrec > prec;
                          if (scrut5 === true) {
                            tmp21 = consume();
                            tmp22 = Tree.Ident(name, true);
                            op = tmp22;
                            tmp23 = term(rightPrec);
                            rhs1 = tmp23;
                            tmp24 = Stack.Cons(rhs1, Stack.Nil);
                            tmp25 = Stack.Cons(acc, tmp24);
                            tmp26 = Tree.App(op, tmp25);
                            return termCont(tmp26, prec)
                          } else {
                            return acc
                          }
                        } else {
                          token1 = param01;
                          scrut = Rules.termInfixRule.exprChoice;
                          if (scrut instanceof Option.Some.class) {
                            param02 = scrut.value;
                            if (globalThis.Array.isArray(param02) && param02.length === 5) {
                              first0 = param02[0];
                              first1 = param02[1];
                              first2 = param02[2];
                              first3 = param02[3];
                              first4 = param02[4];
                              kind = first0;
                              process = first1;
                              outerPrec = first2;
                              innerPrec = first3;
                              rest = first4;
                              tmp27 = "found an exprChoice with outerPrec = " + outerPrec;
                              doTemp1 = Parser.tracer.print(tmp27, 186);
                              outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                              scrut1 = outerPrec$_ > prec;
                              if (scrut1 === true) {
                                tmp28 = Option.getOrElse(innerPrec, outerPrec$_);
                                scrut2 = parseKind(kind, tmp28);
                                if (scrut2 instanceof Tree.Empty.class) {
                                  tmp29 = Parser.tracer.print("nothing was parsed", 191);
                                  return acc
                                } else if (scrut2 instanceof Tree.Error.class) {
                                  tmp30 = Parser.tracer.print("cannot parse more", 194);
                                  return acc
                                } else {
                                  rhs = scrut2;
                                  tmp31 = Tree.summary(rhs);
                                  tmp32 = "parsed " + tmp31;
                                  tmp33 = Parser.tracer.print(tmp32, 197);
                                  tmp34 = runtime.safeCall(process(rhs, runtime.Unit));
                                  tmp35 = runtime.safeCall(tmp34(acc));
                                  return termCont(tmp35, prec)
                                }
                              } else {
                                tmp36 = "the outer precedence is less than " + prec;
                                doTemp2 = Parser.tracer.print(tmp36, 199);
                                return acc
                              }
                            } else {
                              throw new globalThis.Error("match error");
                            }
                          } else if (scrut instanceof Option.None.class) {
                            tmp37 = "cannot consume " + token1;
                            tmp38 = Parser.tracer.print(tmp37, 202);
                            return acc
                          } else {
                            throw new globalThis.Error("match error");
                          }
                        }
                      } else {
                        token1 = param01;
                        scrut = Rules.termInfixRule.exprChoice;
                        if (scrut instanceof Option.Some.class) {
                          param02 = scrut.value;
                          if (globalThis.Array.isArray(param02) && param02.length === 5) {
                            first0 = param02[0];
                            first1 = param02[1];
                            first2 = param02[2];
                            first3 = param02[3];
                            first4 = param02[4];
                            kind = first0;
                            process = first1;
                            outerPrec = first2;
                            innerPrec = first3;
                            rest = first4;
                            tmp39 = "found an exprChoice with outerPrec = " + outerPrec;
                            doTemp1 = Parser.tracer.print(tmp39, 186);
                            outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                            scrut1 = outerPrec$_ > prec;
                            if (scrut1 === true) {
                              tmp40 = Option.getOrElse(innerPrec, outerPrec$_);
                              scrut2 = parseKind(kind, tmp40);
                              if (scrut2 instanceof Tree.Empty.class) {
                                tmp41 = Parser.tracer.print("nothing was parsed", 191);
                                return acc
                              } else if (scrut2 instanceof Tree.Error.class) {
                                tmp42 = Parser.tracer.print("cannot parse more", 194);
                                return acc
                              } else {
                                rhs = scrut2;
                                tmp43 = Tree.summary(rhs);
                                tmp44 = "parsed " + tmp43;
                                tmp45 = Parser.tracer.print(tmp44, 197);
                                tmp46 = runtime.safeCall(process(rhs, runtime.Unit));
                                tmp47 = runtime.safeCall(tmp46(acc));
                                return termCont(tmp47, prec)
                              }
                            } else {
                              tmp48 = "the outer precedence is less than " + prec;
                              doTemp2 = Parser.tracer.print(tmp48, 199);
                              return acc
                            }
                          } else {
                            throw new globalThis.Error("match error");
                          }
                        } else if (scrut instanceof Option.None.class) {
                          tmp49 = "cannot consume " + token1;
                          tmp50 = Parser.tracer.print(tmp49, 202);
                          return acc
                        } else {
                          throw new globalThis.Error("match error");
                        }
                      }
                    } else {
                      token1 = param01;
                      scrut = Rules.termInfixRule.exprChoice;
                      if (scrut instanceof Option.Some.class) {
                        param02 = scrut.value;
                        if (globalThis.Array.isArray(param02) && param02.length === 5) {
                          first0 = param02[0];
                          first1 = param02[1];
                          first2 = param02[2];
                          first3 = param02[3];
                          first4 = param02[4];
                          kind = first0;
                          process = first1;
                          outerPrec = first2;
                          innerPrec = first3;
                          rest = first4;
                          tmp51 = "found an exprChoice with outerPrec = " + outerPrec;
                          doTemp1 = Parser.tracer.print(tmp51, 186);
                          outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                          scrut1 = outerPrec$_ > prec;
                          if (scrut1 === true) {
                            tmp52 = Option.getOrElse(innerPrec, outerPrec$_);
                            scrut2 = parseKind(kind, tmp52);
                            if (scrut2 instanceof Tree.Empty.class) {
                              tmp53 = Parser.tracer.print("nothing was parsed", 191);
                              return acc
                            } else if (scrut2 instanceof Tree.Error.class) {
                              tmp54 = Parser.tracer.print("cannot parse more", 194);
                              return acc
                            } else {
                              rhs = scrut2;
                              tmp55 = Tree.summary(rhs);
                              tmp56 = "parsed " + tmp55;
                              tmp57 = Parser.tracer.print(tmp56, 197);
                              tmp58 = runtime.safeCall(process(rhs, runtime.Unit));
                              tmp59 = runtime.safeCall(tmp58(acc));
                              return termCont(tmp59, prec)
                            }
                          } else {
                            tmp60 = "the outer precedence is less than " + prec;
                            doTemp2 = Parser.tracer.print(tmp60, 199);
                            return acc
                          }
                        } else {
                          throw new globalThis.Error("match error");
                        }
                      } else if (scrut instanceof Option.None.class) {
                        tmp61 = "cannot consume " + token1;
                        tmp62 = Parser.tracer.print(tmp61, 202);
                        return acc
                      } else {
                        throw new globalThis.Error("match error");
                      }
                    }
                  }
                } else if (scrut9 instanceof Option.None.class) {
                  return acc
                } else {
                  tmp63 = "keyword `" + name1;
                  tmp64 = tmp63 + "` does not have infix rules";
                  doTemp6 = Parser.tracer.print(tmp64, 172);
                  name = param03;
                  if (param12 === true) {
                    scrut3 = runtime.safeCall(Precedence.Keywords.all.get(name));
                    if (scrut3 instanceof Option.None.class) {
                      tmp65 = "found an operator \"" + name;
                      tmp66 = tmp65 + "\"";
                      doTemp3 = Parser.tracer.print(tmp66, 174);
                      scrut4 = Precedence.opPrec(name);
                      if (globalThis.Array.isArray(scrut4) && scrut4.length === 2) {
                        first01 = scrut4[0];
                        first11 = scrut4[1];
                        leftPrec = first01;
                        rightPrec = first11;
                        tmp67 = "leftPrec = " + leftPrec;
                        tmp68 = tmp67 + "; rightPrec = ";
                        tmp69 = tmp68 + rightPrec;
                        doTemp4 = Parser.tracer.print(tmp69, 176);
                        scrut5 = leftPrec > prec;
                        if (scrut5 === true) {
                          tmp70 = consume();
                          tmp71 = Tree.Ident(name, true);
                          op = tmp71;
                          tmp72 = term(rightPrec);
                          rhs1 = tmp72;
                          tmp73 = Stack.Cons(rhs1, Stack.Nil);
                          tmp74 = Stack.Cons(acc, tmp73);
                          tmp75 = Tree.App(op, tmp74);
                          return termCont(tmp75, prec)
                        } else {
                          return acc
                        }
                      } else {
                        token1 = param01;
                        scrut = Rules.termInfixRule.exprChoice;
                        if (scrut instanceof Option.Some.class) {
                          param02 = scrut.value;
                          if (globalThis.Array.isArray(param02) && param02.length === 5) {
                            first0 = param02[0];
                            first1 = param02[1];
                            first2 = param02[2];
                            first3 = param02[3];
                            first4 = param02[4];
                            kind = first0;
                            process = first1;
                            outerPrec = first2;
                            innerPrec = first3;
                            rest = first4;
                            tmp76 = "found an exprChoice with outerPrec = " + outerPrec;
                            doTemp1 = Parser.tracer.print(tmp76, 186);
                            outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                            scrut1 = outerPrec$_ > prec;
                            if (scrut1 === true) {
                              tmp77 = Option.getOrElse(innerPrec, outerPrec$_);
                              scrut2 = parseKind(kind, tmp77);
                              if (scrut2 instanceof Tree.Empty.class) {
                                tmp78 = Parser.tracer.print("nothing was parsed", 191);
                                return acc
                              } else if (scrut2 instanceof Tree.Error.class) {
                                tmp79 = Parser.tracer.print("cannot parse more", 194);
                                return acc
                              } else {
                                rhs = scrut2;
                                tmp80 = Tree.summary(rhs);
                                tmp81 = "parsed " + tmp80;
                                tmp82 = Parser.tracer.print(tmp81, 197);
                                tmp83 = runtime.safeCall(process(rhs, runtime.Unit));
                                tmp84 = runtime.safeCall(tmp83(acc));
                                return termCont(tmp84, prec)
                              }
                            } else {
                              tmp85 = "the outer precedence is less than " + prec;
                              doTemp2 = Parser.tracer.print(tmp85, 199);
                              return acc
                            }
                          } else {
                            throw new globalThis.Error("match error");
                          }
                        } else if (scrut instanceof Option.None.class) {
                          tmp86 = "cannot consume " + token1;
                          tmp87 = Parser.tracer.print(tmp86, 202);
                          return acc
                        } else {
                          throw new globalThis.Error("match error");
                        }
                      }
                    } else {
                      token1 = param01;
                      scrut = Rules.termInfixRule.exprChoice;
                      if (scrut instanceof Option.Some.class) {
                        param02 = scrut.value;
                        if (globalThis.Array.isArray(param02) && param02.length === 5) {
                          first0 = param02[0];
                          first1 = param02[1];
                          first2 = param02[2];
                          first3 = param02[3];
                          first4 = param02[4];
                          kind = first0;
                          process = first1;
                          outerPrec = first2;
                          innerPrec = first3;
                          rest = first4;
                          tmp88 = "found an exprChoice with outerPrec = " + outerPrec;
                          doTemp1 = Parser.tracer.print(tmp88, 186);
                          outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                          scrut1 = outerPrec$_ > prec;
                          if (scrut1 === true) {
                            tmp89 = Option.getOrElse(innerPrec, outerPrec$_);
                            scrut2 = parseKind(kind, tmp89);
                            if (scrut2 instanceof Tree.Empty.class) {
                              tmp90 = Parser.tracer.print("nothing was parsed", 191);
                              return acc
                            } else if (scrut2 instanceof Tree.Error.class) {
                              tmp91 = Parser.tracer.print("cannot parse more", 194);
                              return acc
                            } else {
                              rhs = scrut2;
                              tmp92 = Tree.summary(rhs);
                              tmp93 = "parsed " + tmp92;
                              tmp94 = Parser.tracer.print(tmp93, 197);
                              tmp95 = runtime.safeCall(process(rhs, runtime.Unit));
                              tmp96 = runtime.safeCall(tmp95(acc));
                              return termCont(tmp96, prec)
                            }
                          } else {
                            tmp97 = "the outer precedence is less than " + prec;
                            doTemp2 = Parser.tracer.print(tmp97, 199);
                            return acc
                          }
                        } else {
                          throw new globalThis.Error("match error");
                        }
                      } else if (scrut instanceof Option.None.class) {
                        tmp98 = "cannot consume " + token1;
                        tmp99 = Parser.tracer.print(tmp98, 202);
                        return acc
                      } else {
                        throw new globalThis.Error("match error");
                      }
                    }
                  } else {
                    token1 = param01;
                    scrut = Rules.termInfixRule.exprChoice;
                    if (scrut instanceof Option.Some.class) {
                      param02 = scrut.value;
                      if (globalThis.Array.isArray(param02) && param02.length === 5) {
                        first0 = param02[0];
                        first1 = param02[1];
                        first2 = param02[2];
                        first3 = param02[3];
                        first4 = param02[4];
                        kind = first0;
                        process = first1;
                        outerPrec = first2;
                        innerPrec = first3;
                        rest = first4;
                        tmp100 = "found an exprChoice with outerPrec = " + outerPrec;
                        doTemp1 = Parser.tracer.print(tmp100, 186);
                        outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                        scrut1 = outerPrec$_ > prec;
                        if (scrut1 === true) {
                          tmp101 = Option.getOrElse(innerPrec, outerPrec$_);
                          scrut2 = parseKind(kind, tmp101);
                          if (scrut2 instanceof Tree.Empty.class) {
                            tmp102 = Parser.tracer.print("nothing was parsed", 191);
                            return acc
                          } else if (scrut2 instanceof Tree.Error.class) {
                            tmp103 = Parser.tracer.print("cannot parse more", 194);
                            return acc
                          } else {
                            rhs = scrut2;
                            tmp104 = Tree.summary(rhs);
                            tmp105 = "parsed " + tmp104;
                            tmp106 = Parser.tracer.print(tmp105, 197);
                            tmp107 = runtime.safeCall(process(rhs, runtime.Unit));
                            tmp108 = runtime.safeCall(tmp107(acc));
                            return termCont(tmp108, prec)
                          }
                        } else {
                          tmp109 = "the outer precedence is less than " + prec;
                          doTemp2 = Parser.tracer.print(tmp109, 199);
                          return acc
                        }
                      } else {
                        throw new globalThis.Error("match error");
                      }
                    } else if (scrut instanceof Option.None.class) {
                      tmp110 = "cannot consume " + token1;
                      tmp111 = Parser.tracer.print(tmp110, 202);
                      return acc
                    } else {
                      throw new globalThis.Error("match error");
                    }
                  }
                }
              } else {
                tmp112 = "keyword `" + name1;
                tmp113 = tmp112 + "` does not have infix rules";
                doTemp6 = Parser.tracer.print(tmp113, 172);
                name = param03;
                if (param12 === true) {
                  scrut3 = runtime.safeCall(Precedence.Keywords.all.get(name));
                  if (scrut3 instanceof Option.None.class) {
                    tmp114 = "found an operator \"" + name;
                    tmp115 = tmp114 + "\"";
                    doTemp3 = Parser.tracer.print(tmp115, 174);
                    scrut4 = Precedence.opPrec(name);
                    if (globalThis.Array.isArray(scrut4) && scrut4.length === 2) {
                      first01 = scrut4[0];
                      first11 = scrut4[1];
                      leftPrec = first01;
                      rightPrec = first11;
                      tmp116 = "leftPrec = " + leftPrec;
                      tmp117 = tmp116 + "; rightPrec = ";
                      tmp118 = tmp117 + rightPrec;
                      doTemp4 = Parser.tracer.print(tmp118, 176);
                      scrut5 = leftPrec > prec;
                      if (scrut5 === true) {
                        tmp119 = consume();
                        tmp120 = Tree.Ident(name, true);
                        op = tmp120;
                        tmp121 = term(rightPrec);
                        rhs1 = tmp121;
                        tmp122 = Stack.Cons(rhs1, Stack.Nil);
                        tmp123 = Stack.Cons(acc, tmp122);
                        tmp124 = Tree.App(op, tmp123);
                        return termCont(tmp124, prec)
                      } else {
                        return acc
                      }
                    } else {
                      token1 = param01;
                      scrut = Rules.termInfixRule.exprChoice;
                      if (scrut instanceof Option.Some.class) {
                        param02 = scrut.value;
                        if (globalThis.Array.isArray(param02) && param02.length === 5) {
                          first0 = param02[0];
                          first1 = param02[1];
                          first2 = param02[2];
                          first3 = param02[3];
                          first4 = param02[4];
                          kind = first0;
                          process = first1;
                          outerPrec = first2;
                          innerPrec = first3;
                          rest = first4;
                          tmp125 = "found an exprChoice with outerPrec = " + outerPrec;
                          doTemp1 = Parser.tracer.print(tmp125, 186);
                          outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                          scrut1 = outerPrec$_ > prec;
                          if (scrut1 === true) {
                            tmp126 = Option.getOrElse(innerPrec, outerPrec$_);
                            scrut2 = parseKind(kind, tmp126);
                            if (scrut2 instanceof Tree.Empty.class) {
                              tmp127 = Parser.tracer.print("nothing was parsed", 191);
                              return acc
                            } else if (scrut2 instanceof Tree.Error.class) {
                              tmp128 = Parser.tracer.print("cannot parse more", 194);
                              return acc
                            } else {
                              rhs = scrut2;
                              tmp129 = Tree.summary(rhs);
                              tmp130 = "parsed " + tmp129;
                              tmp131 = Parser.tracer.print(tmp130, 197);
                              tmp132 = runtime.safeCall(process(rhs, runtime.Unit));
                              tmp133 = runtime.safeCall(tmp132(acc));
                              return termCont(tmp133, prec)
                            }
                          } else {
                            tmp134 = "the outer precedence is less than " + prec;
                            doTemp2 = Parser.tracer.print(tmp134, 199);
                            return acc
                          }
                        } else {
                          throw new globalThis.Error("match error");
                        }
                      } else if (scrut instanceof Option.None.class) {
                        tmp135 = "cannot consume " + token1;
                        tmp136 = Parser.tracer.print(tmp135, 202);
                        return acc
                      } else {
                        throw new globalThis.Error("match error");
                      }
                    }
                  } else {
                    token1 = param01;
                    scrut = Rules.termInfixRule.exprChoice;
                    if (scrut instanceof Option.Some.class) {
                      param02 = scrut.value;
                      if (globalThis.Array.isArray(param02) && param02.length === 5) {
                        first0 = param02[0];
                        first1 = param02[1];
                        first2 = param02[2];
                        first3 = param02[3];
                        first4 = param02[4];
                        kind = first0;
                        process = first1;
                        outerPrec = first2;
                        innerPrec = first3;
                        rest = first4;
                        tmp137 = "found an exprChoice with outerPrec = " + outerPrec;
                        doTemp1 = Parser.tracer.print(tmp137, 186);
                        outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                        scrut1 = outerPrec$_ > prec;
                        if (scrut1 === true) {
                          tmp138 = Option.getOrElse(innerPrec, outerPrec$_);
                          scrut2 = parseKind(kind, tmp138);
                          if (scrut2 instanceof Tree.Empty.class) {
                            tmp139 = Parser.tracer.print("nothing was parsed", 191);
                            return acc
                          } else if (scrut2 instanceof Tree.Error.class) {
                            tmp140 = Parser.tracer.print("cannot parse more", 194);
                            return acc
                          } else {
                            rhs = scrut2;
                            tmp141 = Tree.summary(rhs);
                            tmp142 = "parsed " + tmp141;
                            tmp143 = Parser.tracer.print(tmp142, 197);
                            tmp144 = runtime.safeCall(process(rhs, runtime.Unit));
                            tmp145 = runtime.safeCall(tmp144(acc));
                            return termCont(tmp145, prec)
                          }
                        } else {
                          tmp146 = "the outer precedence is less than " + prec;
                          doTemp2 = Parser.tracer.print(tmp146, 199);
                          return acc
                        }
                      } else {
                        throw new globalThis.Error("match error");
                      }
                    } else if (scrut instanceof Option.None.class) {
                      tmp147 = "cannot consume " + token1;
                      tmp148 = Parser.tracer.print(tmp147, 202);
                      return acc
                    } else {
                      throw new globalThis.Error("match error");
                    }
                  }
                } else {
                  token1 = param01;
                  scrut = Rules.termInfixRule.exprChoice;
                  if (scrut instanceof Option.Some.class) {
                    param02 = scrut.value;
                    if (globalThis.Array.isArray(param02) && param02.length === 5) {
                      first0 = param02[0];
                      first1 = param02[1];
                      first2 = param02[2];
                      first3 = param02[3];
                      first4 = param02[4];
                      kind = first0;
                      process = first1;
                      outerPrec = first2;
                      innerPrec = first3;
                      rest = first4;
                      tmp149 = "found an exprChoice with outerPrec = " + outerPrec;
                      doTemp1 = Parser.tracer.print(tmp149, 186);
                      outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                      scrut1 = outerPrec$_ > prec;
                      if (scrut1 === true) {
                        tmp150 = Option.getOrElse(innerPrec, outerPrec$_);
                        scrut2 = parseKind(kind, tmp150);
                        if (scrut2 instanceof Tree.Empty.class) {
                          tmp151 = Parser.tracer.print("nothing was parsed", 191);
                          return acc
                        } else if (scrut2 instanceof Tree.Error.class) {
                          tmp152 = Parser.tracer.print("cannot parse more", 194);
                          return acc
                        } else {
                          rhs = scrut2;
                          tmp153 = Tree.summary(rhs);
                          tmp154 = "parsed " + tmp153;
                          tmp155 = Parser.tracer.print(tmp154, 197);
                          tmp156 = runtime.safeCall(process(rhs, runtime.Unit));
                          tmp157 = runtime.safeCall(tmp156(acc));
                          return termCont(tmp157, prec)
                        }
                      } else {
                        tmp158 = "the outer precedence is less than " + prec;
                        doTemp2 = Parser.tracer.print(tmp158, 199);
                        return acc
                      }
                    } else {
                      throw new globalThis.Error("match error");
                    }
                  } else if (scrut instanceof Option.None.class) {
                    tmp159 = "cannot consume " + token1;
                    tmp160 = Parser.tracer.print(tmp159, 202);
                    return acc
                  } else {
                    throw new globalThis.Error("match error");
                  }
                }
              }
            } else {
              tmp161 = "keyword `" + name1;
              tmp162 = tmp161 + "` does not have infix rules";
              doTemp6 = Parser.tracer.print(tmp162, 172);
              name = param03;
              if (param12 === true) {
                scrut3 = runtime.safeCall(Precedence.Keywords.all.get(name));
                if (scrut3 instanceof Option.None.class) {
                  tmp163 = "found an operator \"" + name;
                  tmp164 = tmp163 + "\"";
                  doTemp3 = Parser.tracer.print(tmp164, 174);
                  scrut4 = Precedence.opPrec(name);
                  if (globalThis.Array.isArray(scrut4) && scrut4.length === 2) {
                    first01 = scrut4[0];
                    first11 = scrut4[1];
                    leftPrec = first01;
                    rightPrec = first11;
                    tmp165 = "leftPrec = " + leftPrec;
                    tmp166 = tmp165 + "; rightPrec = ";
                    tmp167 = tmp166 + rightPrec;
                    doTemp4 = Parser.tracer.print(tmp167, 176);
                    scrut5 = leftPrec > prec;
                    if (scrut5 === true) {
                      tmp168 = consume();
                      tmp169 = Tree.Ident(name, true);
                      op = tmp169;
                      tmp170 = term(rightPrec);
                      rhs1 = tmp170;
                      tmp171 = Stack.Cons(rhs1, Stack.Nil);
                      tmp172 = Stack.Cons(acc, tmp171);
                      tmp173 = Tree.App(op, tmp172);
                      return termCont(tmp173, prec)
                    } else {
                      return acc
                    }
                  } else {
                    token1 = param01;
                    scrut = Rules.termInfixRule.exprChoice;
                    if (scrut instanceof Option.Some.class) {
                      param02 = scrut.value;
                      if (globalThis.Array.isArray(param02) && param02.length === 5) {
                        first0 = param02[0];
                        first1 = param02[1];
                        first2 = param02[2];
                        first3 = param02[3];
                        first4 = param02[4];
                        kind = first0;
                        process = first1;
                        outerPrec = first2;
                        innerPrec = first3;
                        rest = first4;
                        tmp174 = "found an exprChoice with outerPrec = " + outerPrec;
                        doTemp1 = Parser.tracer.print(tmp174, 186);
                        outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                        scrut1 = outerPrec$_ > prec;
                        if (scrut1 === true) {
                          tmp175 = Option.getOrElse(innerPrec, outerPrec$_);
                          scrut2 = parseKind(kind, tmp175);
                          if (scrut2 instanceof Tree.Empty.class) {
                            tmp176 = Parser.tracer.print("nothing was parsed", 191);
                            return acc
                          } else if (scrut2 instanceof Tree.Error.class) {
                            tmp177 = Parser.tracer.print("cannot parse more", 194);
                            return acc
                          } else {
                            rhs = scrut2;
                            tmp178 = Tree.summary(rhs);
                            tmp179 = "parsed " + tmp178;
                            tmp180 = Parser.tracer.print(tmp179, 197);
                            tmp181 = runtime.safeCall(process(rhs, runtime.Unit));
                            tmp182 = runtime.safeCall(tmp181(acc));
                            return termCont(tmp182, prec)
                          }
                        } else {
                          tmp183 = "the outer precedence is less than " + prec;
                          doTemp2 = Parser.tracer.print(tmp183, 199);
                          return acc
                        }
                      } else {
                        throw new globalThis.Error("match error");
                      }
                    } else if (scrut instanceof Option.None.class) {
                      tmp184 = "cannot consume " + token1;
                      tmp185 = Parser.tracer.print(tmp184, 202);
                      return acc
                    } else {
                      throw new globalThis.Error("match error");
                    }
                  }
                } else {
                  token1 = param01;
                  scrut = Rules.termInfixRule.exprChoice;
                  if (scrut instanceof Option.Some.class) {
                    param02 = scrut.value;
                    if (globalThis.Array.isArray(param02) && param02.length === 5) {
                      first0 = param02[0];
                      first1 = param02[1];
                      first2 = param02[2];
                      first3 = param02[3];
                      first4 = param02[4];
                      kind = first0;
                      process = first1;
                      outerPrec = first2;
                      innerPrec = first3;
                      rest = first4;
                      tmp186 = "found an exprChoice with outerPrec = " + outerPrec;
                      doTemp1 = Parser.tracer.print(tmp186, 186);
                      outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                      scrut1 = outerPrec$_ > prec;
                      if (scrut1 === true) {
                        tmp187 = Option.getOrElse(innerPrec, outerPrec$_);
                        scrut2 = parseKind(kind, tmp187);
                        if (scrut2 instanceof Tree.Empty.class) {
                          tmp188 = Parser.tracer.print("nothing was parsed", 191);
                          return acc
                        } else if (scrut2 instanceof Tree.Error.class) {
                          tmp189 = Parser.tracer.print("cannot parse more", 194);
                          return acc
                        } else {
                          rhs = scrut2;
                          tmp190 = Tree.summary(rhs);
                          tmp191 = "parsed " + tmp190;
                          tmp192 = Parser.tracer.print(tmp191, 197);
                          tmp193 = runtime.safeCall(process(rhs, runtime.Unit));
                          tmp194 = runtime.safeCall(tmp193(acc));
                          return termCont(tmp194, prec)
                        }
                      } else {
                        tmp195 = "the outer precedence is less than " + prec;
                        doTemp2 = Parser.tracer.print(tmp195, 199);
                        return acc
                      }
                    } else {
                      throw new globalThis.Error("match error");
                    }
                  } else if (scrut instanceof Option.None.class) {
                    tmp196 = "cannot consume " + token1;
                    tmp197 = Parser.tracer.print(tmp196, 202);
                    return acc
                  } else {
                    throw new globalThis.Error("match error");
                  }
                }
              } else {
                token1 = param01;
                scrut = Rules.termInfixRule.exprChoice;
                if (scrut instanceof Option.Some.class) {
                  param02 = scrut.value;
                  if (globalThis.Array.isArray(param02) && param02.length === 5) {
                    first0 = param02[0];
                    first1 = param02[1];
                    first2 = param02[2];
                    first3 = param02[3];
                    first4 = param02[4];
                    kind = first0;
                    process = first1;
                    outerPrec = first2;
                    innerPrec = first3;
                    rest = first4;
                    tmp198 = "found an exprChoice with outerPrec = " + outerPrec;
                    doTemp1 = Parser.tracer.print(tmp198, 186);
                    outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                    scrut1 = outerPrec$_ > prec;
                    if (scrut1 === true) {
                      tmp199 = Option.getOrElse(innerPrec, outerPrec$_);
                      scrut2 = parseKind(kind, tmp199);
                      if (scrut2 instanceof Tree.Empty.class) {
                        tmp200 = Parser.tracer.print("nothing was parsed", 191);
                        return acc
                      } else if (scrut2 instanceof Tree.Error.class) {
                        tmp201 = Parser.tracer.print("cannot parse more", 194);
                        return acc
                      } else {
                        rhs = scrut2;
                        tmp202 = Tree.summary(rhs);
                        tmp203 = "parsed " + tmp202;
                        tmp204 = Parser.tracer.print(tmp203, 197);
                        tmp205 = runtime.safeCall(process(rhs, runtime.Unit));
                        tmp206 = runtime.safeCall(tmp205(acc));
                        return termCont(tmp206, prec)
                      }
                    } else {
                      tmp207 = "the outer precedence is less than " + prec;
                      doTemp2 = Parser.tracer.print(tmp207, 199);
                      return acc
                    }
                  } else {
                    throw new globalThis.Error("match error");
                  }
                } else if (scrut instanceof Option.None.class) {
                  tmp208 = "cannot consume " + token1;
                  tmp209 = Parser.tracer.print(tmp208, 202);
                  return acc
                } else {
                  throw new globalThis.Error("match error");
                }
              }
            }
          } else {
            name = param03;
            if (param12 === true) {
              scrut3 = runtime.safeCall(Precedence.Keywords.all.get(name));
              if (scrut3 instanceof Option.None.class) {
                tmp210 = "found an operator \"" + name;
                tmp211 = tmp210 + "\"";
                doTemp3 = Parser.tracer.print(tmp211, 174);
                scrut4 = Precedence.opPrec(name);
                if (globalThis.Array.isArray(scrut4) && scrut4.length === 2) {
                  first01 = scrut4[0];
                  first11 = scrut4[1];
                  leftPrec = first01;
                  rightPrec = first11;
                  tmp212 = "leftPrec = " + leftPrec;
                  tmp213 = tmp212 + "; rightPrec = ";
                  tmp214 = tmp213 + rightPrec;
                  doTemp4 = Parser.tracer.print(tmp214, 176);
                  scrut5 = leftPrec > prec;
                  if (scrut5 === true) {
                    tmp215 = consume();
                    tmp216 = Tree.Ident(name, true);
                    op = tmp216;
                    tmp217 = term(rightPrec);
                    rhs1 = tmp217;
                    tmp218 = Stack.Cons(rhs1, Stack.Nil);
                    tmp219 = Stack.Cons(acc, tmp218);
                    tmp220 = Tree.App(op, tmp219);
                    return termCont(tmp220, prec)
                  } else {
                    return acc
                  }
                } else {
                  token1 = param01;
                  scrut = Rules.termInfixRule.exprChoice;
                  if (scrut instanceof Option.Some.class) {
                    param02 = scrut.value;
                    if (globalThis.Array.isArray(param02) && param02.length === 5) {
                      first0 = param02[0];
                      first1 = param02[1];
                      first2 = param02[2];
                      first3 = param02[3];
                      first4 = param02[4];
                      kind = first0;
                      process = first1;
                      outerPrec = first2;
                      innerPrec = first3;
                      rest = first4;
                      tmp221 = "found an exprChoice with outerPrec = " + outerPrec;
                      doTemp1 = Parser.tracer.print(tmp221, 186);
                      outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                      scrut1 = outerPrec$_ > prec;
                      if (scrut1 === true) {
                        tmp222 = Option.getOrElse(innerPrec, outerPrec$_);
                        scrut2 = parseKind(kind, tmp222);
                        if (scrut2 instanceof Tree.Empty.class) {
                          tmp223 = Parser.tracer.print("nothing was parsed", 191);
                          return acc
                        } else if (scrut2 instanceof Tree.Error.class) {
                          tmp224 = Parser.tracer.print("cannot parse more", 194);
                          return acc
                        } else {
                          rhs = scrut2;
                          tmp225 = Tree.summary(rhs);
                          tmp226 = "parsed " + tmp225;
                          tmp227 = Parser.tracer.print(tmp226, 197);
                          tmp228 = runtime.safeCall(process(rhs, runtime.Unit));
                          tmp229 = runtime.safeCall(tmp228(acc));
                          return termCont(tmp229, prec)
                        }
                      } else {
                        tmp230 = "the outer precedence is less than " + prec;
                        doTemp2 = Parser.tracer.print(tmp230, 199);
                        return acc
                      }
                    } else {
                      throw new globalThis.Error("match error");
                    }
                  } else if (scrut instanceof Option.None.class) {
                    tmp231 = "cannot consume " + token1;
                    tmp232 = Parser.tracer.print(tmp231, 202);
                    return acc
                  } else {
                    throw new globalThis.Error("match error");
                  }
                }
              } else {
                token1 = param01;
                scrut = Rules.termInfixRule.exprChoice;
                if (scrut instanceof Option.Some.class) {
                  param02 = scrut.value;
                  if (globalThis.Array.isArray(param02) && param02.length === 5) {
                    first0 = param02[0];
                    first1 = param02[1];
                    first2 = param02[2];
                    first3 = param02[3];
                    first4 = param02[4];
                    kind = first0;
                    process = first1;
                    outerPrec = first2;
                    innerPrec = first3;
                    rest = first4;
                    tmp233 = "found an exprChoice with outerPrec = " + outerPrec;
                    doTemp1 = Parser.tracer.print(tmp233, 186);
                    outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                    scrut1 = outerPrec$_ > prec;
                    if (scrut1 === true) {
                      tmp234 = Option.getOrElse(innerPrec, outerPrec$_);
                      scrut2 = parseKind(kind, tmp234);
                      if (scrut2 instanceof Tree.Empty.class) {
                        tmp235 = Parser.tracer.print("nothing was parsed", 191);
                        return acc
                      } else if (scrut2 instanceof Tree.Error.class) {
                        tmp236 = Parser.tracer.print("cannot parse more", 194);
                        return acc
                      } else {
                        rhs = scrut2;
                        tmp237 = Tree.summary(rhs);
                        tmp238 = "parsed " + tmp237;
                        tmp239 = Parser.tracer.print(tmp238, 197);
                        tmp240 = runtime.safeCall(process(rhs, runtime.Unit));
                        tmp241 = runtime.safeCall(tmp240(acc));
                        return termCont(tmp241, prec)
                      }
                    } else {
                      tmp242 = "the outer precedence is less than " + prec;
                      doTemp2 = Parser.tracer.print(tmp242, 199);
                      return acc
                    }
                  } else {
                    throw new globalThis.Error("match error");
                  }
                } else if (scrut instanceof Option.None.class) {
                  tmp243 = "cannot consume " + token1;
                  tmp244 = Parser.tracer.print(tmp243, 202);
                  return acc
                } else {
                  throw new globalThis.Error("match error");
                }
              }
            } else {
              token1 = param01;
              scrut = Rules.termInfixRule.exprChoice;
              if (scrut instanceof Option.Some.class) {
                param02 = scrut.value;
                if (globalThis.Array.isArray(param02) && param02.length === 5) {
                  first0 = param02[0];
                  first1 = param02[1];
                  first2 = param02[2];
                  first3 = param02[3];
                  first4 = param02[4];
                  kind = first0;
                  process = first1;
                  outerPrec = first2;
                  innerPrec = first3;
                  rest = first4;
                  tmp245 = "found an exprChoice with outerPrec = " + outerPrec;
                  doTemp1 = Parser.tracer.print(tmp245, 186);
                  outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                  scrut1 = outerPrec$_ > prec;
                  if (scrut1 === true) {
                    tmp246 = Option.getOrElse(innerPrec, outerPrec$_);
                    scrut2 = parseKind(kind, tmp246);
                    if (scrut2 instanceof Tree.Empty.class) {
                      tmp247 = Parser.tracer.print("nothing was parsed", 191);
                      return acc
                    } else if (scrut2 instanceof Tree.Error.class) {
                      tmp248 = Parser.tracer.print("cannot parse more", 194);
                      return acc
                    } else {
                      rhs = scrut2;
                      tmp249 = Tree.summary(rhs);
                      tmp250 = "parsed " + tmp249;
                      tmp251 = Parser.tracer.print(tmp250, 197);
                      tmp252 = runtime.safeCall(process(rhs, runtime.Unit));
                      tmp253 = runtime.safeCall(tmp252(acc));
                      return termCont(tmp253, prec)
                    }
                  } else {
                    tmp254 = "the outer precedence is less than " + prec;
                    doTemp2 = Parser.tracer.print(tmp254, 199);
                    return acc
                  }
                } else {
                  throw new globalThis.Error("match error");
                }
              } else if (scrut instanceof Option.None.class) {
                tmp255 = "cannot consume " + token1;
                tmp256 = Parser.tracer.print(tmp255, 202);
                return acc
              } else {
                throw new globalThis.Error("match error");
              }
            }
          }
        } else {
          token1 = param01;
          scrut = Rules.termInfixRule.exprChoice;
          if (scrut instanceof Option.Some.class) {
            param02 = scrut.value;
            if (globalThis.Array.isArray(param02) && param02.length === 5) {
              first0 = param02[0];
              first1 = param02[1];
              first2 = param02[2];
              first3 = param02[3];
              first4 = param02[4];
              kind = first0;
              process = first1;
              outerPrec = first2;
              innerPrec = first3;
              rest = first4;
              tmp257 = "found an exprChoice with outerPrec = " + outerPrec;
              doTemp1 = Parser.tracer.print(tmp257, 186);
              outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
              scrut1 = outerPrec$_ > prec;
              if (scrut1 === true) {
                tmp258 = Option.getOrElse(innerPrec, outerPrec$_);
                scrut2 = parseKind(kind, tmp258);
                if (scrut2 instanceof Tree.Empty.class) {
                  tmp259 = Parser.tracer.print("nothing was parsed", 191);
                  return acc
                } else if (scrut2 instanceof Tree.Error.class) {
                  tmp260 = Parser.tracer.print("cannot parse more", 194);
                  return acc
                } else {
                  rhs = scrut2;
                  tmp261 = Tree.summary(rhs);
                  tmp262 = "parsed " + tmp261;
                  tmp263 = Parser.tracer.print(tmp262, 197);
                  tmp264 = runtime.safeCall(process(rhs, runtime.Unit));
                  tmp265 = runtime.safeCall(tmp264(acc));
                  return termCont(tmp265, prec)
                }
              } else {
                tmp266 = "the outer precedence is less than " + prec;
                doTemp2 = Parser.tracer.print(tmp266, 199);
                return acc
              }
            } else {
              throw new globalThis.Error("match error");
            }
          } else if (scrut instanceof Option.None.class) {
            tmp267 = "cannot consume " + token1;
            tmp268 = Parser.tracer.print(tmp267, 202);
            return acc
          } else {
            throw new globalThis.Error("match error");
          }
        }
      } else if (tokens instanceof Stack.Nil.class) {
        return acc
      } else {
        throw new globalThis.Error("match error");
      }
    };
    typeExpr = function typeExpr(prec) {
      let tmp3, tmp4, tmp5, tmp6, tmp7;
      tmp3 = "typeExpr <<< " + prec;
      tmp4 = tmp3 + " ";
      tmp5 = TokenHelpers.preview(tokens);
      tmp6 = tmp4 + tmp5;
      tmp7 = () => {
        let param01, param11, token1, param02, param12, name, symbolic, scrut, param03, keyword, scrut1, param04, rule, scrut2, acc, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19;
        if (tokens instanceof Stack.Cons.class) {
          param01 = tokens.head;
          param11 = tokens.tail;
          if (param01 instanceof Token.Identifier.class) {
            param02 = param01.name;
            param12 = param01.symbolic;
            name = param02;
            symbolic = param12;
            scrut = runtime.safeCall(Precedence.TypeKeywords.all.get(name));
            if (scrut instanceof Option.Some.class) {
              param03 = scrut.value;
              keyword = param03;
              scrut1 = runtime.safeCall(Rules.typeRule.keywordChoices.get(name));
              if (scrut1 instanceof Option.Some.class) {
                param04 = scrut1.value;
                rule = param04;
                scrut2 = keyword.leftPrecOrMin > prec;
                if (scrut2 === true) {
                  tmp8 = consume();
                  tmp9 = parseRule(keyword.rightPrecOrMax, rule, Precedence.TypeKeywords.all);
                  acc = tmp9;
                  return typeExprCont(acc, prec)
                } else {
                  tmp10 = "the left precedence is less" + name;
                  tmp11 = Parser.tracer.print(tmp10, 219);
                  return Tree.empty
                }
              } else if (scrut1 instanceof Option.None.class) {
                tmp12 = "no rule starting with " + name;
                tmp13 = Parser.tracer.print(tmp12, 222);
                return Tree.empty
              } else {
                token1 = param01;
                tmp14 = "unrecognized token: " + token1;
                return Tree.error(tmp14)
              }
            } else if (scrut instanceof Option.None.class) {
              if (symbolic === true) {
                tmp15 = "unexpected symbolic identifier: " + name;
                return Tree.error(tmp15)
              } else {
                tmp16 = consume();
                tmp17 = Tree.Ident(name);
                return typeExprCont(tmp17, prec)
              }
            } else {
              token1 = param01;
              tmp18 = "unrecognized token: " + token1;
              return Tree.error(tmp18)
            }
          } else {
            token1 = param01;
            tmp19 = "unrecognized token: " + token1;
            return Tree.error(tmp19)
          }
        } else {
          return Tree.error("unexpected end of input")
        }
      };
      return runtime.safeCall(Parser.tracer.trace(tmp6, (result) => {
        let tmp8;
        tmp8 = Tree.summary(result);
        return "typeExpr >>> " + tmp8
      }, tmp7))
    };
    typeExprCont = function typeExprCont(acc, prec) {
      let doTemp, doTemp1, param01, param11, token1, scrut, param02, first4, first3, first2, first1, first0, kind, process, outerPrec, innerPrec, rest, doTemp2, outerPrec$_, doTemp3, scrut1, scrut2, rhs, param03, param12, name, scrut3, param04, keyword, scrut4, param05, rule, doTemp4, doTemp5, scrut5, scrut6, param06, first41, first31, first21, first11, first01, kind1, process1, outerPrec1, innerPrec1, rest1, rhs1, acc$_, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20, tmp21, tmp22, tmp23, tmp24, tmp25, tmp26, tmp27, tmp28, tmp29, tmp30, tmp31, tmp32, tmp33, tmp34, tmp35, tmp36, tmp37, tmp38, tmp39, tmp40, tmp41, tmp42, tmp43, tmp44, tmp45, tmp46, tmp47, tmp48, tmp49, tmp50, tmp51, tmp52, tmp53, tmp54, tmp55, tmp56, tmp57, tmp58, tmp59, tmp60, tmp61, tmp62, tmp63, tmp64, tmp65, tmp66, tmp67, tmp68, tmp69, tmp70, tmp71, tmp72, tmp73, tmp74, tmp75, tmp76, tmp77, tmp78, tmp79, tmp80, tmp81;
      tmp3 = ">>> typeExprCont " + prec;
      tmp4 = tmp3 + " ";
      tmp5 = Tree.summary(acc);
      tmp6 = tmp4 + tmp5;
      tmp7 = tmp6 + " <<<";
      tmp8 = Parser.tracer.print(tmp7, 234);
      tmp9 = TokenHelpers.preview(tokens);
      tmp10 = "check keyword " + tmp9;
      doTemp = Parser.tracer.print(tmp10, 236);
      if (tokens instanceof Stack.Cons.class) {
        param01 = tokens.head;
        param11 = tokens.tail;
        if (param01 instanceof Token.Identifier.class) {
          param03 = param01.name;
          param12 = param01.symbolic;
          name = param03;
          scrut3 = runtime.safeCall(Precedence.TypeKeywords.all.get(name));
          if (scrut3 instanceof Option.Some.class) {
            param04 = scrut3.value;
            keyword = param04;
            scrut4 = runtime.safeCall(Rules.typeInfixRule.keywordChoices.get(name));
            if (scrut4 instanceof Option.Some.class) {
              param05 = scrut4.value;
              rule = param05;
              tmp11 = "the keyword is found in infix rules" + name;
              doTemp4 = Parser.tracer.print(tmp11, 239);
              scrut5 = keyword.leftPrecOrMin > prec;
              if (scrut5 === true) {
                scrut6 = rule.exprChoice;
                if (scrut6 instanceof Option.Some.class) {
                  param06 = scrut6.value;
                  if (globalThis.Array.isArray(param06) && param06.length === 5) {
                    first01 = param06[0];
                    first11 = param06[1];
                    first21 = param06[2];
                    first31 = param06[3];
                    first41 = param06[4];
                    kind1 = first01;
                    process1 = first11;
                    outerPrec1 = first21;
                    innerPrec1 = first31;
                    rest1 = first41;
                    tmp12 = consume();
                    tmp13 = parseKind(kind1, keyword.rightPrecOrMin);
                    rhs1 = tmp13;
                    tmp14 = runtime.safeCall(process1(rhs1));
                    tmp15 = runtime.safeCall(tmp14(acc));
                    acc$_ = tmp15;
                    return typeExprCont(acc$_, prec)
                  } else {
                    tmp16 = "keyword `" + name;
                    tmp17 = tmp16 + "` does not have infix rules";
                    doTemp5 = Parser.tracer.print(tmp17, 248);
                    doTemp1 = Parser.tracer.print("not a keyword", 250);
                    token1 = param01;
                    scrut = Rules.typeInfixRule.exprChoice;
                    if (scrut instanceof Option.Some.class) {
                      param02 = scrut.value;
                      if (globalThis.Array.isArray(param02) && param02.length === 5) {
                        first0 = param02[0];
                        first1 = param02[1];
                        first2 = param02[2];
                        first3 = param02[3];
                        first4 = param02[4];
                        kind = first0;
                        process = first1;
                        outerPrec = first2;
                        innerPrec = first3;
                        rest = first4;
                        tmp18 = "found an exprChoice with outerPrec = " + outerPrec;
                        doTemp2 = Parser.tracer.print(tmp18, 253);
                        outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                        scrut1 = outerPrec$_ > prec;
                        if (scrut1 === true) {
                          tmp19 = Option.getOrElse(innerPrec, outerPrec$_);
                          scrut2 = parseKind(kind, tmp19);
                          if (scrut2 instanceof Tree.Empty.class) {
                            tmp20 = Parser.tracer.print("nothing was parsed", 258);
                            return acc
                          } else if (scrut2 instanceof Tree.Error.class) {
                            tmp21 = Parser.tracer.print("cannot parse more", 261);
                            return acc
                          } else {
                            rhs = scrut2;
                            tmp22 = Tree.summary(rhs);
                            tmp23 = "parsed " + tmp22;
                            tmp24 = Parser.tracer.print(tmp23, 264);
                            tmp25 = runtime.safeCall(process(rhs));
                            tmp26 = runtime.safeCall(tmp25(acc));
                            return typeExprCont(tmp26, prec)
                          }
                        } else {
                          tmp27 = "the outer precedence is less than " + prec;
                          doTemp3 = Parser.tracer.print(tmp27, 266);
                          return acc
                        }
                      } else {
                        throw new globalThis.Error("match error");
                      }
                    } else if (scrut instanceof Option.None.class) {
                      return acc
                    } else {
                      throw new globalThis.Error("match error");
                    }
                  }
                } else if (scrut6 instanceof Option.None.class) {
                  return acc
                } else {
                  tmp28 = "keyword `" + name;
                  tmp29 = tmp28 + "` does not have infix rules";
                  doTemp5 = Parser.tracer.print(tmp29, 248);
                  doTemp1 = Parser.tracer.print("not a keyword", 250);
                  token1 = param01;
                  scrut = Rules.typeInfixRule.exprChoice;
                  if (scrut instanceof Option.Some.class) {
                    param02 = scrut.value;
                    if (globalThis.Array.isArray(param02) && param02.length === 5) {
                      first0 = param02[0];
                      first1 = param02[1];
                      first2 = param02[2];
                      first3 = param02[3];
                      first4 = param02[4];
                      kind = first0;
                      process = first1;
                      outerPrec = first2;
                      innerPrec = first3;
                      rest = first4;
                      tmp30 = "found an exprChoice with outerPrec = " + outerPrec;
                      doTemp2 = Parser.tracer.print(tmp30, 253);
                      outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                      scrut1 = outerPrec$_ > prec;
                      if (scrut1 === true) {
                        tmp31 = Option.getOrElse(innerPrec, outerPrec$_);
                        scrut2 = parseKind(kind, tmp31);
                        if (scrut2 instanceof Tree.Empty.class) {
                          tmp32 = Parser.tracer.print("nothing was parsed", 258);
                          return acc
                        } else if (scrut2 instanceof Tree.Error.class) {
                          tmp33 = Parser.tracer.print("cannot parse more", 261);
                          return acc
                        } else {
                          rhs = scrut2;
                          tmp34 = Tree.summary(rhs);
                          tmp35 = "parsed " + tmp34;
                          tmp36 = Parser.tracer.print(tmp35, 264);
                          tmp37 = runtime.safeCall(process(rhs));
                          tmp38 = runtime.safeCall(tmp37(acc));
                          return typeExprCont(tmp38, prec)
                        }
                      } else {
                        tmp39 = "the outer precedence is less than " + prec;
                        doTemp3 = Parser.tracer.print(tmp39, 266);
                        return acc
                      }
                    } else {
                      throw new globalThis.Error("match error");
                    }
                  } else if (scrut instanceof Option.None.class) {
                    return acc
                  } else {
                    throw new globalThis.Error("match error");
                  }
                }
              } else {
                tmp40 = "keyword `" + name;
                tmp41 = tmp40 + "` does not have infix rules";
                doTemp5 = Parser.tracer.print(tmp41, 248);
                doTemp1 = Parser.tracer.print("not a keyword", 250);
                token1 = param01;
                scrut = Rules.typeInfixRule.exprChoice;
                if (scrut instanceof Option.Some.class) {
                  param02 = scrut.value;
                  if (globalThis.Array.isArray(param02) && param02.length === 5) {
                    first0 = param02[0];
                    first1 = param02[1];
                    first2 = param02[2];
                    first3 = param02[3];
                    first4 = param02[4];
                    kind = first0;
                    process = first1;
                    outerPrec = first2;
                    innerPrec = first3;
                    rest = first4;
                    tmp42 = "found an exprChoice with outerPrec = " + outerPrec;
                    doTemp2 = Parser.tracer.print(tmp42, 253);
                    outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                    scrut1 = outerPrec$_ > prec;
                    if (scrut1 === true) {
                      tmp43 = Option.getOrElse(innerPrec, outerPrec$_);
                      scrut2 = parseKind(kind, tmp43);
                      if (scrut2 instanceof Tree.Empty.class) {
                        tmp44 = Parser.tracer.print("nothing was parsed", 258);
                        return acc
                      } else if (scrut2 instanceof Tree.Error.class) {
                        tmp45 = Parser.tracer.print("cannot parse more", 261);
                        return acc
                      } else {
                        rhs = scrut2;
                        tmp46 = Tree.summary(rhs);
                        tmp47 = "parsed " + tmp46;
                        tmp48 = Parser.tracer.print(tmp47, 264);
                        tmp49 = runtime.safeCall(process(rhs));
                        tmp50 = runtime.safeCall(tmp49(acc));
                        return typeExprCont(tmp50, prec)
                      }
                    } else {
                      tmp51 = "the outer precedence is less than " + prec;
                      doTemp3 = Parser.tracer.print(tmp51, 266);
                      return acc
                    }
                  } else {
                    throw new globalThis.Error("match error");
                  }
                } else if (scrut instanceof Option.None.class) {
                  return acc
                } else {
                  throw new globalThis.Error("match error");
                }
              }
            } else {
              doTemp1 = Parser.tracer.print("not a keyword", 250);
              token1 = param01;
              scrut = Rules.typeInfixRule.exprChoice;
              if (scrut instanceof Option.Some.class) {
                param02 = scrut.value;
                if (globalThis.Array.isArray(param02) && param02.length === 5) {
                  first0 = param02[0];
                  first1 = param02[1];
                  first2 = param02[2];
                  first3 = param02[3];
                  first4 = param02[4];
                  kind = first0;
                  process = first1;
                  outerPrec = first2;
                  innerPrec = first3;
                  rest = first4;
                  tmp52 = "found an exprChoice with outerPrec = " + outerPrec;
                  doTemp2 = Parser.tracer.print(tmp52, 253);
                  outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                  scrut1 = outerPrec$_ > prec;
                  if (scrut1 === true) {
                    tmp53 = Option.getOrElse(innerPrec, outerPrec$_);
                    scrut2 = parseKind(kind, tmp53);
                    if (scrut2 instanceof Tree.Empty.class) {
                      tmp54 = Parser.tracer.print("nothing was parsed", 258);
                      return acc
                    } else if (scrut2 instanceof Tree.Error.class) {
                      tmp55 = Parser.tracer.print("cannot parse more", 261);
                      return acc
                    } else {
                      rhs = scrut2;
                      tmp56 = Tree.summary(rhs);
                      tmp57 = "parsed " + tmp56;
                      tmp58 = Parser.tracer.print(tmp57, 264);
                      tmp59 = runtime.safeCall(process(rhs));
                      tmp60 = runtime.safeCall(tmp59(acc));
                      return typeExprCont(tmp60, prec)
                    }
                  } else {
                    tmp61 = "the outer precedence is less than " + prec;
                    doTemp3 = Parser.tracer.print(tmp61, 266);
                    return acc
                  }
                } else {
                  throw new globalThis.Error("match error");
                }
              } else if (scrut instanceof Option.None.class) {
                return acc
              } else {
                throw new globalThis.Error("match error");
              }
            }
          } else {
            doTemp1 = Parser.tracer.print("not a keyword", 250);
            token1 = param01;
            scrut = Rules.typeInfixRule.exprChoice;
            if (scrut instanceof Option.Some.class) {
              param02 = scrut.value;
              if (globalThis.Array.isArray(param02) && param02.length === 5) {
                first0 = param02[0];
                first1 = param02[1];
                first2 = param02[2];
                first3 = param02[3];
                first4 = param02[4];
                kind = first0;
                process = first1;
                outerPrec = first2;
                innerPrec = first3;
                rest = first4;
                tmp62 = "found an exprChoice with outerPrec = " + outerPrec;
                doTemp2 = Parser.tracer.print(tmp62, 253);
                outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                scrut1 = outerPrec$_ > prec;
                if (scrut1 === true) {
                  tmp63 = Option.getOrElse(innerPrec, outerPrec$_);
                  scrut2 = parseKind(kind, tmp63);
                  if (scrut2 instanceof Tree.Empty.class) {
                    tmp64 = Parser.tracer.print("nothing was parsed", 258);
                    return acc
                  } else if (scrut2 instanceof Tree.Error.class) {
                    tmp65 = Parser.tracer.print("cannot parse more", 261);
                    return acc
                  } else {
                    rhs = scrut2;
                    tmp66 = Tree.summary(rhs);
                    tmp67 = "parsed " + tmp66;
                    tmp68 = Parser.tracer.print(tmp67, 264);
                    tmp69 = runtime.safeCall(process(rhs));
                    tmp70 = runtime.safeCall(tmp69(acc));
                    return typeExprCont(tmp70, prec)
                  }
                } else {
                  tmp71 = "the outer precedence is less than " + prec;
                  doTemp3 = Parser.tracer.print(tmp71, 266);
                  return acc
                }
              } else {
                throw new globalThis.Error("match error");
              }
            } else if (scrut instanceof Option.None.class) {
              return acc
            } else {
              throw new globalThis.Error("match error");
            }
          }
        } else {
          doTemp1 = Parser.tracer.print("not a keyword", 250);
          token1 = param01;
          scrut = Rules.typeInfixRule.exprChoice;
          if (scrut instanceof Option.Some.class) {
            param02 = scrut.value;
            if (globalThis.Array.isArray(param02) && param02.length === 5) {
              first0 = param02[0];
              first1 = param02[1];
              first2 = param02[2];
              first3 = param02[3];
              first4 = param02[4];
              kind = first0;
              process = first1;
              outerPrec = first2;
              innerPrec = first3;
              rest = first4;
              tmp72 = "found an exprChoice with outerPrec = " + outerPrec;
              doTemp2 = Parser.tracer.print(tmp72, 253);
              outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
              scrut1 = outerPrec$_ > prec;
              if (scrut1 === true) {
                tmp73 = Option.getOrElse(innerPrec, outerPrec$_);
                scrut2 = parseKind(kind, tmp73);
                if (scrut2 instanceof Tree.Empty.class) {
                  tmp74 = Parser.tracer.print("nothing was parsed", 258);
                  return acc
                } else if (scrut2 instanceof Tree.Error.class) {
                  tmp75 = Parser.tracer.print("cannot parse more", 261);
                  return acc
                } else {
                  rhs = scrut2;
                  tmp76 = Tree.summary(rhs);
                  tmp77 = "parsed " + tmp76;
                  tmp78 = Parser.tracer.print(tmp77, 264);
                  tmp79 = runtime.safeCall(process(rhs));
                  tmp80 = runtime.safeCall(tmp79(acc));
                  return typeExprCont(tmp80, prec)
                }
              } else {
                tmp81 = "the outer precedence is less than " + prec;
                doTemp3 = Parser.tracer.print(tmp81, 266);
                return acc
              }
            } else {
              throw new globalThis.Error("match error");
            }
          } else if (scrut instanceof Option.None.class) {
            return acc
          } else {
            throw new globalThis.Error("match error");
          }
        }
      } else {
        doTemp1 = Parser.tracer.print("not a keyword", 250);
        if (tokens instanceof Stack.Nil.class) {
          return acc
        } else {
          throw new globalThis.Error("match error");
        }
      }
    };
    mod = function mod(acc) {
      let doTemp, param01, param11, param02, param12, name, scrut, param03, keyword, scrut1, param04, rule, tree1, scrut2, param05, rule1, tree2, param06, param13, bindings, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18;
      doTemp = Parser.tracer.print(">>>>>> mod <<<<<<", 272);
      if (tokens instanceof Stack.Cons.class) {
        param01 = tokens.head;
        param11 = tokens.tail;
        if (param01 instanceof Token.Identifier.class) {
          param02 = param01.name;
          param12 = param01.symbolic;
          if (param02 === ";;") {
            tmp3 = consume();
            return mod
          } else {
            name = param02;
            scrut = runtime.safeCall(Precedence.Keywords.all.get(name));
            if (scrut instanceof Option.Some.class) {
              param03 = scrut.value;
              keyword = param03;
              scrut2 = runtime.safeCall(Rules.termRule.keywordChoices.get(name));
              if (scrut2 instanceof Option.Some.class) {
                param05 = scrut2.value;
                rule1 = param05;
                tmp4 = term(0);
                tree2 = tmp4;
                if (tree2 instanceof Tree.LetIn.class) {
                  param06 = tree2.bindings;
                  param13 = tree2.body;
                  bindings = param06;
                  if (param13 instanceof Tree.Empty.class) {
                    tmp5 = Tree.DefineKind.Let(false);
                    tmp6 = Tree.Define(tmp5, bindings);
                    tmp7 = Stack.Cons(tmp6, acc);
                    return modCont(tmp7)
                  } else {
                    tmp8 = Stack.Cons(tree2, acc);
                    return modCont(tmp8)
                  }
                } else {
                  tmp9 = Stack.Cons(tree2, acc);
                  return modCont(tmp9)
                }
              } else {
                scrut1 = runtime.safeCall(Rules.declRule.keywordChoices.get(name));
                if (scrut1 instanceof Option.Some.class) {
                  param04 = scrut1.value;
                  rule = param04;
                  tmp10 = consume();
                  tmp11 = parseRule(0, rule, Precedence.Keywords.all);
                  tree1 = tmp11;
                  tmp12 = Stack.Cons(tree1, acc);
                  return modCont(tmp12)
                } else {
                  tmp13 = term(0, Option.None);
                  tmp14 = Stack.Cons(tmp13, acc);
                  return modCont(tmp14)
                }
              }
            } else {
              tmp15 = term(0, Option.None);
              tmp16 = Stack.Cons(tmp15, acc);
              return modCont(tmp16)
            }
          }
        } else {
          tmp17 = term(0, Option.None);
          tmp18 = Stack.Cons(tmp17, acc);
          return modCont(tmp18)
        }
      } else if (tokens instanceof Stack.Nil.class) {
        return Stack.reverse(acc)
      } else {
        throw new globalThis.Error("match error");
      }
    };
    modCont = function modCont(acc) {
      let doTemp, param01, param11, param02, param12, tmp3, tmp4, tmp5, tmp6, tmp7;
      doTemp = Parser.tracer.print(">>>>>> modCont <<<<<<", 293);
      if (tokens instanceof Stack.Cons.class) {
        param01 = tokens.head;
        param11 = tokens.tail;
        if (param01 instanceof Token.Identifier.class) {
          param02 = param01.name;
          param12 = param01.symbolic;
          if (param02 === ";;") {
            tmp3 = consume();
            return mod(acc)
          } else {
            tmp4 = parseRule(0, Rules.declRule, Precedence.Keywords.all);
            tmp5 = Stack.Cons(tmp4, acc);
            return modCont(tmp5)
          }
        } else {
          tmp6 = parseRule(0, Rules.declRule, Precedence.Keywords.all);
          tmp7 = Stack.Cons(tmp6, acc);
          return modCont(tmp7)
        }
      } else if (tokens instanceof Stack.Nil.class) {
        return Stack.reverse(acc)
      } else {
        throw new globalThis.Error("match error");
      }
    };
    counter = 0;
    tmp = runtime.safeCall(Parser.tracer.trace("module <<< ", (result) => {
      let tmp3;
      tmp3 = Tree.summary(result);
      return "module >>> " + tmp3
    }, () => {
      return mod(Stack.Nil)
    }));
    tree = tmp;
    if (tokens instanceof Stack.Cons.class) {
      param0 = tokens.head;
      param1 = tokens.tail;
      token = param0;
      tmp1 = "expect EOF instead of " + token;
      message = tmp1;
      tmp2 = Parser.tracer.print(message, 308);
      return Tree.Error(tree, message)
    } else if (tokens instanceof Stack.Nil.class) {
      return tree
    } else {
      throw new globalThis.Error("match error");
    }
  }
  static toString() { return "Parser"; }
};
let Parser = Parser1; export default Parser;
