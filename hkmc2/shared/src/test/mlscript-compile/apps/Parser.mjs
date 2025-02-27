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
    let parseKind, require, typeExprCont, term, parseRule, yeetSpaces, modCont, consume, termCont, typeExpr, mod, current, counter, tree, scrut, param0, param1, token, message, tmp, tmp1, tmp2, tmp3;
    yeetSpaces = function yeetSpaces() {
      let param01, param11, tail, tmp4, tmp5, tmp6, tmp7;
      tmp8: while (true) {
        if (current instanceof Stack.Cons.class) {
          param01 = current.head;
          param11 = current.tail;
          if (param01 instanceof Token.Space.class) {
            tail = param11;
            tmp4 = "skipped a space at " + counter;
            tmp5 = runtime.safeCall(Parser.tracer.print(tmp4));
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
        tmp4 = Token.summary(head);
        tmp5 = "consumed `" + tmp4;
        tmp6 = tmp5 + "` at ";
        tmp7 = tmp6 + counter;
        tmp8 = runtime.safeCall(Parser.tracer.print(tmp7));
        current = tail;
        tmp9 = counter + 1;
        counter = tmp9;
        return runtime.Unit
      } else {
        return runtime.safeCall(Parser.tracer.print("consumed: EOF"))
      }
    };
    require = function require(result, expected) {
      let scrut1, param01, param11, actual, scrut2, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10;
      tmp4 = yeetSpaces();
      scrut1 = tmp4;
      if (scrut1 instanceof Stack.Cons.class) {
        param01 = scrut1.head;
        param11 = scrut1.tail;
        actual = param01;
        scrut2 = Token.same(expected, actual);
        if (scrut2 === true) {
          tmp5 = consume();
          return result
        } else {
          tmp6 = Token.summary(expected);
          tmp7 = Token.summary(actual);
          tmp8 = Predef.mkStr("Expected token ", tmp6, ", but found ", tmp7);
          return Tree.Error(result, tmp8)
        }
      } else if (scrut1 instanceof Stack.Nil.class) {
        tmp9 = Token.summary(expected);
        tmp10 = Predef.mkStr("Expected token ", tmp9, ", but found end of input");
        return Tree.Error(result, tmp10)
      } else {
        throw new globalThis.Error("match error");
      }
    };
    parseKind = function parseKind(kind, prec) {
      let scrut1, param01, rule, tmp4, tmp5;
      if (kind === "type") {
        return typeExpr(prec, Precedence.TypeKeywords.all)
      } else if (kind === "term") {
        return term(prec, Precedence.Keywords.all)
      } else {
        scrut1 = runtime.safeCall(Rules.syntaxKinds.get(kind));
        if (scrut1 instanceof Option.Some.class) {
          param01 = scrut1.value;
          rule = param01;
          return parseRule(prec, rule, Precedence.Keywords.all)
        } else {
          tmp4 = "Unknown syntax kind: \"" + kind;
          tmp5 = tmp4 + "\"";
          throw globalThis.Error(tmp5);
        }
      }
    };
    parseRule = function parseRule(prec, rule, allKeywords) {
      let tmp4, tmp5, tmp6, tmp7;
      tmp4 = "parsing rule \"" + rule.name;
      tmp5 = tmp4 + "\" with precedence ";
      tmp6 = tmp5 + prec;
      tmp7 = () => {
        let scrut1, scrut2, param01, value, param02, param11, other, doTemp, doTemp1, doTemp2, scrut3, param03, value1, scrut4, param04, first4, first3, first2, first1, first0, kind, process, outerPrec, innerPrec, rest, doTemp3, acc, doTemp4, scrut5, tree1, param05, param12, name, doTemp5, doTemp6, scrut6, param06, keyword, doTemp7, doTemp8, scrut7, doTemp9, doTemp10, doTemp11, scrut8, param07, value2, scrut9, param08, first41, first31, first21, first11, first01, kind1, process1, outerPrec1, innerPrec1, rest1, acc1, tree2, param09, rest2, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20, tmp21, tmp22, tmp23, tmp24, tmp25, tmp26, tmp27, tmp28, tmp29, tmp30, tmp31, tmp32, tmp33, tmp34, tmp35, tmp36, tmp37, tmp38, tmp39, tmp40, tmp41, tmp42, tmp43, tmp44, tmp45, tmp46, tmp47, tmp48, tmp49, tmp50, tmp51, tmp52, tmp53, tmp54, tmp55, tmp56, tmp57, tmp58, tmp59, tmp60, tmp61, tmp62, tmp63, tmp64, tmp65, tmp66, tmp67, tmp68, tmp69, tmp70, tmp71, tmp72, tmp73, tmp74, tmp75, tmp76, tmp77, tmp78, tmp79, tmp80, tmp81, tmp82, tmp83, tmp84, tmp85, tmp86, tmp87, tmp88, tmp89, tmp90, tmp91, tmp92, tmp93, tmp94, tmp95, tmp96, tmp97, tmp98, tmp99, tmp100, tmp101, tmp102, tmp103, tmp104, tmp105, tmp106, tmp107, tmp108, tmp109, tmp110, tmp111, tmp112, tmp113, tmp114, tmp115, tmp116;
        tmp8 = yeetSpaces();
        scrut1 = tmp8;
        if (scrut1 instanceof Stack.Cons.class) {
          param02 = scrut1.head;
          param11 = scrut1.tail;
          if (param02 instanceof Token.Identifier.class) {
            param05 = param02.name;
            param12 = param02.symbolic;
            name = param05;
            tmp9 = "found an identifier \"" + name;
            tmp10 = tmp9 + "\"";
            doTemp5 = Parser.tracer.print(tmp10, 83);
            scrut6 = runtime.safeCall(allKeywords.get(name));
            if (scrut6 instanceof Option.Some.class) {
              param06 = scrut6.value;
              keyword = param06;
              tmp11 = runtime.safeCall(keyword.toString());
              doTemp7 = Parser.tracer.print(tmp11, 85);
              tmp12 = (caseScrut) => {
                let first12, first02, k, v, tmp117;
                if (globalThis.Array.isArray(caseScrut) && caseScrut.length === 2) {
                  first02 = caseScrut[0];
                  first12 = caseScrut[1];
                  k = first02;
                  v = first12;
                  tmp117 = "`" + k;
                  return tmp117 + "`"
                } else {
                  throw new globalThis.Error("match error");
                }
              };
              tmp13 = Iter.mapping(rule.keywordChoices, tmp12);
              tmp14 = Iter.joined(tmp13, ", ");
              doTemp8 = Parser.tracer.print("keyword choices: ", tmp14);
              scrut7 = runtime.safeCall(rule.keywordChoices.get(name));
              if (scrut7 instanceof Option.Some.class) {
                param09 = scrut7.value;
                rest2 = param09;
                tmp15 = "found a rule starting with `" + name;
                tmp16 = tmp15 + "`";
                tmp17 = Parser.tracer.print(tmp16, 91);
                tmp18 = "the rest of the rule: " + rest2.display;
                tmp19 = Parser.tracer.print(tmp18, 92);
                tmp20 = consume();
                return parseRule(0, rest2, allKeywords)
              } else if (scrut7 instanceof Option.None.class) {
                tmp21 = "no rule starting with `" + name;
                tmp22 = tmp21 + "` was found";
                doTemp9 = Parser.tracer.print(tmp22, 96);
                tmp23 = "the left prec of `" + name;
                tmp24 = tmp23 + "` is ";
                tmp25 = tmp24 + keyword.leftPrec;
                doTemp10 = Parser.tracer.print(tmp25, 97);
                scrut9 = rule.exprChoice;
                if (scrut9 instanceof Option.Some.class) {
                  param08 = scrut9.value;
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
                    tmp26 = Parser.tracer.print("found an expression choice", 100);
                    tmp27 = parseKind(kind1, prec);
                    acc1 = tmp27;
                    tmp28 = parseRule(prec, rest1, allKeywords);
                    tree2 = tmp28;
                    return runtime.safeCall(process1(acc1, tree2))
                  } else {
                    tmp29 = "no exprChoice or the prec is less than " + prec;
                    doTemp11 = Parser.tracer.print(tmp29, 104);
                    scrut8 = rule.endChoice;
                    if (scrut8 instanceof Option.Some.class) {
                      param07 = scrut8.value;
                      value2 = param07;
                      tmp30 = Parser.tracer.print("found end choice", 106);
                      return value2
                    } else {
                      tmp31 = consume();
                      tmp32 = "unexpected keyword " + keyword.name;
                      return Tree.error(tmp32)
                    }
                  }
                } else {
                  tmp33 = "no exprChoice or the prec is less than " + prec;
                  doTemp11 = Parser.tracer.print(tmp33, 104);
                  scrut8 = rule.endChoice;
                  if (scrut8 instanceof Option.Some.class) {
                    param07 = scrut8.value;
                    value2 = param07;
                    tmp34 = Parser.tracer.print("found end choice", 106);
                    return value2
                  } else {
                    tmp35 = consume();
                    tmp36 = "unexpected keyword " + keyword.name;
                    return Tree.error(tmp36)
                  }
                }
              } else {
                tmp37 = "\"" + name;
                tmp38 = tmp37 + "\" is not a keyword";
                doTemp6 = Parser.tracer.print(tmp38, 111);
                other = param02;
                tmp39 = "the current rule is " + rule.display;
                doTemp = runtime.safeCall(Parser.tracer.print(tmp39));
                scrut4 = rule.exprChoice;
                if (scrut4 instanceof Option.Some.class) {
                  param04 = scrut4.value;
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
                    tmp40 = "parse \"" + kind;
                    tmp41 = tmp40 + "\" kind from ";
                    tmp42 = TokenHelpers.preview(current);
                    tmp43 = tmp41 + tmp42;
                    doTemp3 = Parser.tracer.print(tmp43, 116);
                    acc = parseKind(kind, prec);
                    scrut5 = Tree.nonEmptyError(acc);
                    if (scrut5 === true) {
                      tmp44 = "the rest rule: " + rest.display;
                      tmp45 = Parser.tracer.print(tmp44, 119);
                      tmp46 = parseRule(prec, rest, allKeywords);
                      tree1 = tmp46;
                      tmp47 = Tree.summary(acc);
                      tmp48 = "acc: " + tmp47;
                      tmp49 = Parser.tracer.print(tmp48, 121);
                      tmp50 = Tree.summary(tree1);
                      tmp51 = "tree: " + tmp50;
                      tmp52 = Parser.tracer.print(tmp51, 122);
                      tmp53 = "tree AST is: " + tree1;
                      tmp54 = Parser.tracer.print(tmp53, 123);
                      return runtime.safeCall(process(acc, tree1))
                    } else {
                      doTemp4 = Parser.tracer.print("fallback to end choice", 125);
                      doTemp1 = Parser.tracer.print("no expression choice", 126);
                      scrut3 = rule.endChoice;
                      if (scrut3 instanceof Option.Some.class) {
                        param03 = scrut3.value;
                        value1 = param03;
                        tmp55 = Parser.tracer.print("found end choice", 128);
                        return value1
                      } else {
                        doTemp2 = Parser.tracer.print("no end choice", 130);
                        tmp56 = consume();
                        tmp57 = "unexpected token " + other;
                        return Tree.error(tmp57)
                      }
                    }
                  } else {
                    doTemp1 = Parser.tracer.print("no expression choice", 126);
                    scrut3 = rule.endChoice;
                    if (scrut3 instanceof Option.Some.class) {
                      param03 = scrut3.value;
                      value1 = param03;
                      tmp58 = Parser.tracer.print("found end choice", 128);
                      return value1
                    } else {
                      doTemp2 = Parser.tracer.print("no end choice", 130);
                      tmp59 = consume();
                      tmp60 = "unexpected token " + other;
                      return Tree.error(tmp60)
                    }
                  }
                } else {
                  doTemp1 = Parser.tracer.print("no expression choice", 126);
                  scrut3 = rule.endChoice;
                  if (scrut3 instanceof Option.Some.class) {
                    param03 = scrut3.value;
                    value1 = param03;
                    tmp61 = Parser.tracer.print("found end choice", 128);
                    return value1
                  } else {
                    doTemp2 = Parser.tracer.print("no end choice", 130);
                    tmp62 = consume();
                    tmp63 = "unexpected token " + other;
                    return Tree.error(tmp63)
                  }
                }
              }
            } else {
              tmp64 = "\"" + name;
              tmp65 = tmp64 + "\" is not a keyword";
              doTemp6 = Parser.tracer.print(tmp65, 111);
              other = param02;
              tmp66 = "the current rule is " + rule.display;
              doTemp = runtime.safeCall(Parser.tracer.print(tmp66));
              scrut4 = rule.exprChoice;
              if (scrut4 instanceof Option.Some.class) {
                param04 = scrut4.value;
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
                  tmp67 = "parse \"" + kind;
                  tmp68 = tmp67 + "\" kind from ";
                  tmp69 = TokenHelpers.preview(current);
                  tmp70 = tmp68 + tmp69;
                  doTemp3 = Parser.tracer.print(tmp70, 116);
                  acc = parseKind(kind, prec);
                  scrut5 = Tree.nonEmptyError(acc);
                  if (scrut5 === true) {
                    tmp71 = "the rest rule: " + rest.display;
                    tmp72 = Parser.tracer.print(tmp71, 119);
                    tmp73 = parseRule(prec, rest, allKeywords);
                    tree1 = tmp73;
                    tmp74 = Tree.summary(acc);
                    tmp75 = "acc: " + tmp74;
                    tmp76 = Parser.tracer.print(tmp75, 121);
                    tmp77 = Tree.summary(tree1);
                    tmp78 = "tree: " + tmp77;
                    tmp79 = Parser.tracer.print(tmp78, 122);
                    tmp80 = "tree AST is: " + tree1;
                    tmp81 = Parser.tracer.print(tmp80, 123);
                    return runtime.safeCall(process(acc, tree1))
                  } else {
                    doTemp4 = Parser.tracer.print("fallback to end choice", 125);
                    doTemp1 = Parser.tracer.print("no expression choice", 126);
                    scrut3 = rule.endChoice;
                    if (scrut3 instanceof Option.Some.class) {
                      param03 = scrut3.value;
                      value1 = param03;
                      tmp82 = Parser.tracer.print("found end choice", 128);
                      return value1
                    } else {
                      doTemp2 = Parser.tracer.print("no end choice", 130);
                      tmp83 = consume();
                      tmp84 = "unexpected token " + other;
                      return Tree.error(tmp84)
                    }
                  }
                } else {
                  doTemp1 = Parser.tracer.print("no expression choice", 126);
                  scrut3 = rule.endChoice;
                  if (scrut3 instanceof Option.Some.class) {
                    param03 = scrut3.value;
                    value1 = param03;
                    tmp85 = Parser.tracer.print("found end choice", 128);
                    return value1
                  } else {
                    doTemp2 = Parser.tracer.print("no end choice", 130);
                    tmp86 = consume();
                    tmp87 = "unexpected token " + other;
                    return Tree.error(tmp87)
                  }
                }
              } else {
                doTemp1 = Parser.tracer.print("no expression choice", 126);
                scrut3 = rule.endChoice;
                if (scrut3 instanceof Option.Some.class) {
                  param03 = scrut3.value;
                  value1 = param03;
                  tmp88 = Parser.tracer.print("found end choice", 128);
                  return value1
                } else {
                  doTemp2 = Parser.tracer.print("no end choice", 130);
                  tmp89 = consume();
                  tmp90 = "unexpected token " + other;
                  return Tree.error(tmp90)
                }
              }
            }
          } else {
            other = param02;
            tmp91 = "the current rule is " + rule.display;
            doTemp = runtime.safeCall(Parser.tracer.print(tmp91));
            scrut4 = rule.exprChoice;
            if (scrut4 instanceof Option.Some.class) {
              param04 = scrut4.value;
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
                tmp92 = "parse \"" + kind;
                tmp93 = tmp92 + "\" kind from ";
                tmp94 = TokenHelpers.preview(current);
                tmp95 = tmp93 + tmp94;
                doTemp3 = Parser.tracer.print(tmp95, 116);
                acc = parseKind(kind, prec);
                scrut5 = Tree.nonEmptyError(acc);
                if (scrut5 === true) {
                  tmp96 = "the rest rule: " + rest.display;
                  tmp97 = Parser.tracer.print(tmp96, 119);
                  tmp98 = parseRule(prec, rest, allKeywords);
                  tree1 = tmp98;
                  tmp99 = Tree.summary(acc);
                  tmp100 = "acc: " + tmp99;
                  tmp101 = Parser.tracer.print(tmp100, 121);
                  tmp102 = Tree.summary(tree1);
                  tmp103 = "tree: " + tmp102;
                  tmp104 = Parser.tracer.print(tmp103, 122);
                  tmp105 = "tree AST is: " + tree1;
                  tmp106 = Parser.tracer.print(tmp105, 123);
                  return runtime.safeCall(process(acc, tree1))
                } else {
                  doTemp4 = Parser.tracer.print("fallback to end choice", 125);
                  doTemp1 = Parser.tracer.print("no expression choice", 126);
                  scrut3 = rule.endChoice;
                  if (scrut3 instanceof Option.Some.class) {
                    param03 = scrut3.value;
                    value1 = param03;
                    tmp107 = Parser.tracer.print("found end choice", 128);
                    return value1
                  } else {
                    doTemp2 = Parser.tracer.print("no end choice", 130);
                    tmp108 = consume();
                    tmp109 = "unexpected token " + other;
                    return Tree.error(tmp109)
                  }
                }
              } else {
                doTemp1 = Parser.tracer.print("no expression choice", 126);
                scrut3 = rule.endChoice;
                if (scrut3 instanceof Option.Some.class) {
                  param03 = scrut3.value;
                  value1 = param03;
                  tmp110 = Parser.tracer.print("found end choice", 128);
                  return value1
                } else {
                  doTemp2 = Parser.tracer.print("no end choice", 130);
                  tmp111 = consume();
                  tmp112 = "unexpected token " + other;
                  return Tree.error(tmp112)
                }
              }
            } else {
              doTemp1 = Parser.tracer.print("no expression choice", 126);
              scrut3 = rule.endChoice;
              if (scrut3 instanceof Option.Some.class) {
                param03 = scrut3.value;
                value1 = param03;
                tmp113 = Parser.tracer.print("found end choice", 128);
                return value1
              } else {
                doTemp2 = Parser.tracer.print("no end choice", 130);
                tmp114 = consume();
                tmp115 = "unexpected token " + other;
                return Tree.error(tmp115)
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
            tmp116 = Parser.tracer.print("no end choice but found the end of input", 137);
            return Tree.error("unexpected end of input")
          } else {
            throw new globalThis.Error("match error");
          }
        } else {
          throw new globalThis.Error("match error");
        }
      };
      return runtime.safeCall(Parser.tracer.trace(tmp6, (result) => {
        let tmp8, tmp9, tmp10;
        tmp8 = "parsed rule \"" + rule.name;
        tmp9 = tmp8 + "\": ";
        tmp10 = Tree.summary(result);
        return tmp9 + tmp10
      }, tmp7))
    };
    term = function term(prec) {
      let tmp4, tmp5, tmp6, tmp7, tmp8;
      tmp4 = "term <<< " + prec;
      tmp5 = tmp4 + " ";
      tmp6 = TokenHelpers.preview(current);
      tmp7 = tmp5 + tmp6;
      tmp8 = () => {
        let scrut1, param01, param11, token1, param02, param12, kind, literal, param03, param13, name, symbolic, scrut2, param04, keyword, scrut3, param05, rule, scrut4, acc, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20, tmp21, tmp22;
        tmp9 = yeetSpaces();
        scrut1 = tmp9;
        if (scrut1 instanceof Stack.Cons.class) {
          param01 = scrut1.head;
          param11 = scrut1.tail;
          if (param01 instanceof Token.Identifier.class) {
            param03 = param01.name;
            param13 = param01.symbolic;
            name = param03;
            symbolic = param13;
            scrut2 = runtime.safeCall(Precedence.Keywords.all.get(name));
            if (scrut2 instanceof Option.Some.class) {
              param04 = scrut2.value;
              keyword = param04;
              scrut3 = runtime.safeCall(Rules.termRule.keywordChoices.get(name));
              if (scrut3 instanceof Option.Some.class) {
                param05 = scrut3.value;
                rule = param05;
                scrut4 = keyword.leftPrecOrMin > prec;
                if (scrut4 === true) {
                  tmp10 = consume();
                  tmp11 = parseRule(keyword.rightPrecOrMax, rule, Precedence.Keywords.all);
                  acc = tmp11;
                  return termCont(acc, prec)
                } else {
                  tmp12 = "the left precedence is less" + name;
                  tmp13 = Parser.tracer.print(tmp12, 153);
                  return Tree.empty
                }
              } else if (scrut3 instanceof Option.None.class) {
                tmp14 = "no rule starting with " + name;
                tmp15 = Parser.tracer.print(tmp14, 156);
                return Tree.empty
              } else {
                token1 = param01;
                tmp16 = "unrecognized token: " + token1;
                return Tree.error(tmp16)
              }
            } else if (scrut2 instanceof Option.None.class) {
              tmp17 = consume();
              tmp18 = Tree.Ident(name, symbolic);
              return termCont(tmp18, prec)
            } else {
              token1 = param01;
              tmp19 = "unrecognized token: " + token1;
              return Tree.error(tmp19)
            }
          } else if (param01 instanceof Token.Literal.class) {
            param02 = param01.kind;
            param12 = param01.literal;
            kind = param02;
            literal = param12;
            tmp20 = consume();
            tmp21 = Tree.Literal(kind, literal);
            return termCont(tmp21, prec)
          } else {
            token1 = param01;
            tmp22 = "unrecognized token: " + token1;
            return Tree.error(tmp22)
          }
        } else if (scrut1 instanceof Stack.Nil.class) {
          return Tree.error("unexpected end of input")
        } else {
          throw new globalThis.Error("match error");
        }
      };
      return runtime.safeCall(Parser.tracer.trace(tmp7, (result) => {
        let tmp9;
        tmp9 = Tree.summary(result);
        return "term >>> " + tmp9
      }, tmp8))
    };
    termCont = function termCont(acc, prec) {
      let scrut1, doTemp, param01, param11, token1, scrut2, param02, first4, first3, first2, first1, first0, kind, process, outerPrec, innerPrec, rest, doTemp1, outerPrec$_, doTemp2, scrut3, scrut4, rhs, param03, param12, name, scrut5, doTemp3, scrut6, first11, first01, leftPrec, rightPrec, doTemp4, scrut7, op, rhs1, name1, symbolic, scrut8, param04, keyword, doTemp5, doTemp6, scrut9, param05, rule, doTemp7, scrut10, scrut11, param06, first41, first31, first21, first12, first02, kind1, process1, outerPrec1, innerPrec1, rest1, rhs2, acc$_, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20, tmp21, tmp22, tmp23, tmp24, tmp25, tmp26, tmp27, tmp28, tmp29, tmp30, tmp31, tmp32, tmp33, tmp34, tmp35, tmp36, tmp37, tmp38, tmp39, tmp40, tmp41, tmp42, tmp43, tmp44, tmp45, tmp46, tmp47, tmp48, tmp49, tmp50, tmp51, tmp52, tmp53, tmp54, tmp55, tmp56, tmp57, tmp58, tmp59, tmp60, tmp61, tmp62, tmp63, tmp64, tmp65, tmp66, tmp67, tmp68, tmp69, tmp70, tmp71, tmp72, tmp73, tmp74, tmp75, tmp76, tmp77, tmp78, tmp79, tmp80, tmp81, tmp82, tmp83, tmp84, tmp85, tmp86, tmp87, tmp88, tmp89, tmp90, tmp91, tmp92, tmp93, tmp94, tmp95, tmp96, tmp97, tmp98, tmp99, tmp100, tmp101, tmp102, tmp103, tmp104, tmp105, tmp106, tmp107, tmp108, tmp109, tmp110, tmp111, tmp112, tmp113, tmp114, tmp115, tmp116, tmp117, tmp118, tmp119, tmp120, tmp121, tmp122, tmp123, tmp124, tmp125, tmp126, tmp127, tmp128, tmp129, tmp130, tmp131, tmp132, tmp133, tmp134, tmp135, tmp136, tmp137, tmp138, tmp139, tmp140, tmp141, tmp142, tmp143, tmp144, tmp145, tmp146, tmp147, tmp148, tmp149, tmp150, tmp151, tmp152, tmp153, tmp154, tmp155, tmp156, tmp157, tmp158, tmp159, tmp160, tmp161, tmp162, tmp163, tmp164, tmp165, tmp166, tmp167, tmp168, tmp169, tmp170, tmp171, tmp172, tmp173, tmp174, tmp175, tmp176, tmp177, tmp178, tmp179, tmp180, tmp181, tmp182, tmp183, tmp184, tmp185, tmp186, tmp187, tmp188, tmp189, tmp190, tmp191, tmp192, tmp193, tmp194, tmp195, tmp196, tmp197, tmp198, tmp199, tmp200, tmp201, tmp202, tmp203, tmp204, tmp205, tmp206, tmp207, tmp208, tmp209, tmp210, tmp211, tmp212, tmp213, tmp214, tmp215, tmp216, tmp217, tmp218, tmp219, tmp220, tmp221, tmp222, tmp223, tmp224, tmp225, tmp226, tmp227, tmp228, tmp229, tmp230, tmp231, tmp232, tmp233, tmp234, tmp235, tmp236, tmp237, tmp238, tmp239, tmp240, tmp241, tmp242, tmp243, tmp244, tmp245, tmp246, tmp247, tmp248, tmp249, tmp250, tmp251, tmp252, tmp253, tmp254, tmp255, tmp256, tmp257, tmp258, tmp259, tmp260, tmp261, tmp262, tmp263, tmp264, tmp265, tmp266, tmp267, tmp268, tmp269, tmp270;
      tmp4 = yeetSpaces();
      scrut1 = tmp4;
      tmp5 = ">>> termCont " + prec;
      tmp6 = tmp5 + " ";
      tmp7 = Tree.summary(acc);
      tmp8 = tmp6 + tmp7;
      tmp9 = tmp8 + " <<<";
      doTemp = Parser.tracer.print(tmp9, 168);
      if (scrut1 instanceof Stack.Cons.class) {
        param01 = scrut1.head;
        param11 = scrut1.tail;
        if (param01 instanceof Token.Identifier.class) {
          param03 = param01.name;
          param12 = param01.symbolic;
          name1 = param03;
          symbolic = param12;
          scrut8 = runtime.safeCall(Precedence.Keywords.all.get(name1));
          if (scrut8 instanceof Option.Some.class) {
            param04 = scrut8.value;
            keyword = param04;
            tmp10 = "found a keyword: " + name1;
            doTemp5 = Parser.tracer.print(tmp10, 171);
            scrut9 = runtime.safeCall(Rules.termInfixRule.keywordChoices.get(name1));
            if (scrut9 instanceof Option.Some.class) {
              param05 = scrut9.value;
              rule = param05;
              tmp11 = "the keyword is found in infix rules" + name1;
              doTemp7 = Parser.tracer.print(tmp11, 175);
              scrut10 = keyword.leftPrecOrMin > prec;
              if (scrut10 === true) {
                scrut11 = rule.exprChoice;
                if (scrut11 instanceof Option.Some.class) {
                  param06 = scrut11.value;
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
                    tmp12 = consume();
                    tmp13 = parseKind(kind1, keyword.rightPrecOrMin);
                    rhs2 = tmp13;
                    tmp14 = runtime.safeCall(process1(rhs2, runtime.Unit));
                    tmp15 = runtime.safeCall(tmp14(acc));
                    acc$_ = tmp15;
                    return termCont(acc$_, prec)
                  } else {
                    tmp16 = "keyword `" + name1;
                    tmp17 = tmp16 + "` does not have infix rules";
                    doTemp6 = Parser.tracer.print(tmp17, 184);
                    name = param03;
                    if (param12 === true) {
                      scrut5 = runtime.safeCall(Precedence.Keywords.all.get(name));
                      if (scrut5 instanceof Option.None.class) {
                        tmp18 = "found an operator \"" + name;
                        tmp19 = tmp18 + "\"";
                        doTemp3 = Parser.tracer.print(tmp19, 186);
                        scrut6 = Precedence.opPrec(name);
                        if (globalThis.Array.isArray(scrut6) && scrut6.length === 2) {
                          first01 = scrut6[0];
                          first11 = scrut6[1];
                          leftPrec = first01;
                          rightPrec = first11;
                          tmp20 = "leftPrec = " + leftPrec;
                          tmp21 = tmp20 + "; rightPrec = ";
                          tmp22 = tmp21 + rightPrec;
                          doTemp4 = Parser.tracer.print(tmp22, 188);
                          scrut7 = leftPrec > prec;
                          if (scrut7 === true) {
                            tmp23 = consume();
                            tmp24 = Tree.Ident(name, true);
                            op = tmp24;
                            tmp25 = term(rightPrec);
                            rhs1 = tmp25;
                            tmp26 = Stack.Cons(rhs1, Stack.Nil);
                            tmp27 = Stack.Cons(acc, tmp26);
                            tmp28 = Tree.App(op, tmp27);
                            return termCont(tmp28, prec)
                          } else {
                            return acc
                          }
                        } else {
                          token1 = param01;
                          scrut2 = Rules.termInfixRule.exprChoice;
                          if (scrut2 instanceof Option.Some.class) {
                            param02 = scrut2.value;
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
                              tmp29 = "found an exprChoice with outerPrec = " + outerPrec;
                              doTemp1 = Parser.tracer.print(tmp29, 198);
                              outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                              scrut3 = outerPrec$_ > prec;
                              if (scrut3 === true) {
                                tmp30 = Option.getOrElse(innerPrec, outerPrec$_);
                                scrut4 = parseKind(kind, tmp30);
                                if (scrut4 instanceof Tree.Empty.class) {
                                  tmp31 = Parser.tracer.print("nothing was parsed", 203);
                                  return acc
                                } else if (scrut4 instanceof Tree.Error.class) {
                                  tmp32 = Parser.tracer.print("cannot parse more", 206);
                                  return acc
                                } else {
                                  rhs = scrut4;
                                  tmp33 = Tree.summary(rhs);
                                  tmp34 = "parsed " + tmp33;
                                  tmp35 = Parser.tracer.print(tmp34, 209);
                                  tmp36 = runtime.safeCall(process(rhs, runtime.Unit));
                                  tmp37 = runtime.safeCall(tmp36(acc));
                                  return termCont(tmp37, prec)
                                }
                              } else {
                                tmp38 = "the outer precedence is less than " + prec;
                                doTemp2 = Parser.tracer.print(tmp38, 211);
                                return acc
                              }
                            } else {
                              throw new globalThis.Error("match error");
                            }
                          } else if (scrut2 instanceof Option.None.class) {
                            tmp39 = "cannot consume " + token1;
                            tmp40 = Parser.tracer.print(tmp39, 214);
                            return acc
                          } else {
                            throw new globalThis.Error("match error");
                          }
                        }
                      } else {
                        token1 = param01;
                        scrut2 = Rules.termInfixRule.exprChoice;
                        if (scrut2 instanceof Option.Some.class) {
                          param02 = scrut2.value;
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
                            tmp41 = "found an exprChoice with outerPrec = " + outerPrec;
                            doTemp1 = Parser.tracer.print(tmp41, 198);
                            outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                            scrut3 = outerPrec$_ > prec;
                            if (scrut3 === true) {
                              tmp42 = Option.getOrElse(innerPrec, outerPrec$_);
                              scrut4 = parseKind(kind, tmp42);
                              if (scrut4 instanceof Tree.Empty.class) {
                                tmp43 = Parser.tracer.print("nothing was parsed", 203);
                                return acc
                              } else if (scrut4 instanceof Tree.Error.class) {
                                tmp44 = Parser.tracer.print("cannot parse more", 206);
                                return acc
                              } else {
                                rhs = scrut4;
                                tmp45 = Tree.summary(rhs);
                                tmp46 = "parsed " + tmp45;
                                tmp47 = Parser.tracer.print(tmp46, 209);
                                tmp48 = runtime.safeCall(process(rhs, runtime.Unit));
                                tmp49 = runtime.safeCall(tmp48(acc));
                                return termCont(tmp49, prec)
                              }
                            } else {
                              tmp50 = "the outer precedence is less than " + prec;
                              doTemp2 = Parser.tracer.print(tmp50, 211);
                              return acc
                            }
                          } else {
                            throw new globalThis.Error("match error");
                          }
                        } else if (scrut2 instanceof Option.None.class) {
                          tmp51 = "cannot consume " + token1;
                          tmp52 = Parser.tracer.print(tmp51, 214);
                          return acc
                        } else {
                          throw new globalThis.Error("match error");
                        }
                      }
                    } else {
                      token1 = param01;
                      scrut2 = Rules.termInfixRule.exprChoice;
                      if (scrut2 instanceof Option.Some.class) {
                        param02 = scrut2.value;
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
                          tmp53 = "found an exprChoice with outerPrec = " + outerPrec;
                          doTemp1 = Parser.tracer.print(tmp53, 198);
                          outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                          scrut3 = outerPrec$_ > prec;
                          if (scrut3 === true) {
                            tmp54 = Option.getOrElse(innerPrec, outerPrec$_);
                            scrut4 = parseKind(kind, tmp54);
                            if (scrut4 instanceof Tree.Empty.class) {
                              tmp55 = Parser.tracer.print("nothing was parsed", 203);
                              return acc
                            } else if (scrut4 instanceof Tree.Error.class) {
                              tmp56 = Parser.tracer.print("cannot parse more", 206);
                              return acc
                            } else {
                              rhs = scrut4;
                              tmp57 = Tree.summary(rhs);
                              tmp58 = "parsed " + tmp57;
                              tmp59 = Parser.tracer.print(tmp58, 209);
                              tmp60 = runtime.safeCall(process(rhs, runtime.Unit));
                              tmp61 = runtime.safeCall(tmp60(acc));
                              return termCont(tmp61, prec)
                            }
                          } else {
                            tmp62 = "the outer precedence is less than " + prec;
                            doTemp2 = Parser.tracer.print(tmp62, 211);
                            return acc
                          }
                        } else {
                          throw new globalThis.Error("match error");
                        }
                      } else if (scrut2 instanceof Option.None.class) {
                        tmp63 = "cannot consume " + token1;
                        tmp64 = Parser.tracer.print(tmp63, 214);
                        return acc
                      } else {
                        throw new globalThis.Error("match error");
                      }
                    }
                  }
                } else if (scrut11 instanceof Option.None.class) {
                  return acc
                } else {
                  tmp65 = "keyword `" + name1;
                  tmp66 = tmp65 + "` does not have infix rules";
                  doTemp6 = Parser.tracer.print(tmp66, 184);
                  name = param03;
                  if (param12 === true) {
                    scrut5 = runtime.safeCall(Precedence.Keywords.all.get(name));
                    if (scrut5 instanceof Option.None.class) {
                      tmp67 = "found an operator \"" + name;
                      tmp68 = tmp67 + "\"";
                      doTemp3 = Parser.tracer.print(tmp68, 186);
                      scrut6 = Precedence.opPrec(name);
                      if (globalThis.Array.isArray(scrut6) && scrut6.length === 2) {
                        first01 = scrut6[0];
                        first11 = scrut6[1];
                        leftPrec = first01;
                        rightPrec = first11;
                        tmp69 = "leftPrec = " + leftPrec;
                        tmp70 = tmp69 + "; rightPrec = ";
                        tmp71 = tmp70 + rightPrec;
                        doTemp4 = Parser.tracer.print(tmp71, 188);
                        scrut7 = leftPrec > prec;
                        if (scrut7 === true) {
                          tmp72 = consume();
                          tmp73 = Tree.Ident(name, true);
                          op = tmp73;
                          tmp74 = term(rightPrec);
                          rhs1 = tmp74;
                          tmp75 = Stack.Cons(rhs1, Stack.Nil);
                          tmp76 = Stack.Cons(acc, tmp75);
                          tmp77 = Tree.App(op, tmp76);
                          return termCont(tmp77, prec)
                        } else {
                          return acc
                        }
                      } else {
                        token1 = param01;
                        scrut2 = Rules.termInfixRule.exprChoice;
                        if (scrut2 instanceof Option.Some.class) {
                          param02 = scrut2.value;
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
                            tmp78 = "found an exprChoice with outerPrec = " + outerPrec;
                            doTemp1 = Parser.tracer.print(tmp78, 198);
                            outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                            scrut3 = outerPrec$_ > prec;
                            if (scrut3 === true) {
                              tmp79 = Option.getOrElse(innerPrec, outerPrec$_);
                              scrut4 = parseKind(kind, tmp79);
                              if (scrut4 instanceof Tree.Empty.class) {
                                tmp80 = Parser.tracer.print("nothing was parsed", 203);
                                return acc
                              } else if (scrut4 instanceof Tree.Error.class) {
                                tmp81 = Parser.tracer.print("cannot parse more", 206);
                                return acc
                              } else {
                                rhs = scrut4;
                                tmp82 = Tree.summary(rhs);
                                tmp83 = "parsed " + tmp82;
                                tmp84 = Parser.tracer.print(tmp83, 209);
                                tmp85 = runtime.safeCall(process(rhs, runtime.Unit));
                                tmp86 = runtime.safeCall(tmp85(acc));
                                return termCont(tmp86, prec)
                              }
                            } else {
                              tmp87 = "the outer precedence is less than " + prec;
                              doTemp2 = Parser.tracer.print(tmp87, 211);
                              return acc
                            }
                          } else {
                            throw new globalThis.Error("match error");
                          }
                        } else if (scrut2 instanceof Option.None.class) {
                          tmp88 = "cannot consume " + token1;
                          tmp89 = Parser.tracer.print(tmp88, 214);
                          return acc
                        } else {
                          throw new globalThis.Error("match error");
                        }
                      }
                    } else {
                      token1 = param01;
                      scrut2 = Rules.termInfixRule.exprChoice;
                      if (scrut2 instanceof Option.Some.class) {
                        param02 = scrut2.value;
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
                          tmp90 = "found an exprChoice with outerPrec = " + outerPrec;
                          doTemp1 = Parser.tracer.print(tmp90, 198);
                          outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                          scrut3 = outerPrec$_ > prec;
                          if (scrut3 === true) {
                            tmp91 = Option.getOrElse(innerPrec, outerPrec$_);
                            scrut4 = parseKind(kind, tmp91);
                            if (scrut4 instanceof Tree.Empty.class) {
                              tmp92 = Parser.tracer.print("nothing was parsed", 203);
                              return acc
                            } else if (scrut4 instanceof Tree.Error.class) {
                              tmp93 = Parser.tracer.print("cannot parse more", 206);
                              return acc
                            } else {
                              rhs = scrut4;
                              tmp94 = Tree.summary(rhs);
                              tmp95 = "parsed " + tmp94;
                              tmp96 = Parser.tracer.print(tmp95, 209);
                              tmp97 = runtime.safeCall(process(rhs, runtime.Unit));
                              tmp98 = runtime.safeCall(tmp97(acc));
                              return termCont(tmp98, prec)
                            }
                          } else {
                            tmp99 = "the outer precedence is less than " + prec;
                            doTemp2 = Parser.tracer.print(tmp99, 211);
                            return acc
                          }
                        } else {
                          throw new globalThis.Error("match error");
                        }
                      } else if (scrut2 instanceof Option.None.class) {
                        tmp100 = "cannot consume " + token1;
                        tmp101 = Parser.tracer.print(tmp100, 214);
                        return acc
                      } else {
                        throw new globalThis.Error("match error");
                      }
                    }
                  } else {
                    token1 = param01;
                    scrut2 = Rules.termInfixRule.exprChoice;
                    if (scrut2 instanceof Option.Some.class) {
                      param02 = scrut2.value;
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
                        tmp102 = "found an exprChoice with outerPrec = " + outerPrec;
                        doTemp1 = Parser.tracer.print(tmp102, 198);
                        outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                        scrut3 = outerPrec$_ > prec;
                        if (scrut3 === true) {
                          tmp103 = Option.getOrElse(innerPrec, outerPrec$_);
                          scrut4 = parseKind(kind, tmp103);
                          if (scrut4 instanceof Tree.Empty.class) {
                            tmp104 = Parser.tracer.print("nothing was parsed", 203);
                            return acc
                          } else if (scrut4 instanceof Tree.Error.class) {
                            tmp105 = Parser.tracer.print("cannot parse more", 206);
                            return acc
                          } else {
                            rhs = scrut4;
                            tmp106 = Tree.summary(rhs);
                            tmp107 = "parsed " + tmp106;
                            tmp108 = Parser.tracer.print(tmp107, 209);
                            tmp109 = runtime.safeCall(process(rhs, runtime.Unit));
                            tmp110 = runtime.safeCall(tmp109(acc));
                            return termCont(tmp110, prec)
                          }
                        } else {
                          tmp111 = "the outer precedence is less than " + prec;
                          doTemp2 = Parser.tracer.print(tmp111, 211);
                          return acc
                        }
                      } else {
                        throw new globalThis.Error("match error");
                      }
                    } else if (scrut2 instanceof Option.None.class) {
                      tmp112 = "cannot consume " + token1;
                      tmp113 = Parser.tracer.print(tmp112, 214);
                      return acc
                    } else {
                      throw new globalThis.Error("match error");
                    }
                  }
                }
              } else {
                tmp114 = "keyword `" + name1;
                tmp115 = tmp114 + "` does not have infix rules";
                doTemp6 = Parser.tracer.print(tmp115, 184);
                name = param03;
                if (param12 === true) {
                  scrut5 = runtime.safeCall(Precedence.Keywords.all.get(name));
                  if (scrut5 instanceof Option.None.class) {
                    tmp116 = "found an operator \"" + name;
                    tmp117 = tmp116 + "\"";
                    doTemp3 = Parser.tracer.print(tmp117, 186);
                    scrut6 = Precedence.opPrec(name);
                    if (globalThis.Array.isArray(scrut6) && scrut6.length === 2) {
                      first01 = scrut6[0];
                      first11 = scrut6[1];
                      leftPrec = first01;
                      rightPrec = first11;
                      tmp118 = "leftPrec = " + leftPrec;
                      tmp119 = tmp118 + "; rightPrec = ";
                      tmp120 = tmp119 + rightPrec;
                      doTemp4 = Parser.tracer.print(tmp120, 188);
                      scrut7 = leftPrec > prec;
                      if (scrut7 === true) {
                        tmp121 = consume();
                        tmp122 = Tree.Ident(name, true);
                        op = tmp122;
                        tmp123 = term(rightPrec);
                        rhs1 = tmp123;
                        tmp124 = Stack.Cons(rhs1, Stack.Nil);
                        tmp125 = Stack.Cons(acc, tmp124);
                        tmp126 = Tree.App(op, tmp125);
                        return termCont(tmp126, prec)
                      } else {
                        return acc
                      }
                    } else {
                      token1 = param01;
                      scrut2 = Rules.termInfixRule.exprChoice;
                      if (scrut2 instanceof Option.Some.class) {
                        param02 = scrut2.value;
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
                          tmp127 = "found an exprChoice with outerPrec = " + outerPrec;
                          doTemp1 = Parser.tracer.print(tmp127, 198);
                          outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                          scrut3 = outerPrec$_ > prec;
                          if (scrut3 === true) {
                            tmp128 = Option.getOrElse(innerPrec, outerPrec$_);
                            scrut4 = parseKind(kind, tmp128);
                            if (scrut4 instanceof Tree.Empty.class) {
                              tmp129 = Parser.tracer.print("nothing was parsed", 203);
                              return acc
                            } else if (scrut4 instanceof Tree.Error.class) {
                              tmp130 = Parser.tracer.print("cannot parse more", 206);
                              return acc
                            } else {
                              rhs = scrut4;
                              tmp131 = Tree.summary(rhs);
                              tmp132 = "parsed " + tmp131;
                              tmp133 = Parser.tracer.print(tmp132, 209);
                              tmp134 = runtime.safeCall(process(rhs, runtime.Unit));
                              tmp135 = runtime.safeCall(tmp134(acc));
                              return termCont(tmp135, prec)
                            }
                          } else {
                            tmp136 = "the outer precedence is less than " + prec;
                            doTemp2 = Parser.tracer.print(tmp136, 211);
                            return acc
                          }
                        } else {
                          throw new globalThis.Error("match error");
                        }
                      } else if (scrut2 instanceof Option.None.class) {
                        tmp137 = "cannot consume " + token1;
                        tmp138 = Parser.tracer.print(tmp137, 214);
                        return acc
                      } else {
                        throw new globalThis.Error("match error");
                      }
                    }
                  } else {
                    token1 = param01;
                    scrut2 = Rules.termInfixRule.exprChoice;
                    if (scrut2 instanceof Option.Some.class) {
                      param02 = scrut2.value;
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
                        tmp139 = "found an exprChoice with outerPrec = " + outerPrec;
                        doTemp1 = Parser.tracer.print(tmp139, 198);
                        outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                        scrut3 = outerPrec$_ > prec;
                        if (scrut3 === true) {
                          tmp140 = Option.getOrElse(innerPrec, outerPrec$_);
                          scrut4 = parseKind(kind, tmp140);
                          if (scrut4 instanceof Tree.Empty.class) {
                            tmp141 = Parser.tracer.print("nothing was parsed", 203);
                            return acc
                          } else if (scrut4 instanceof Tree.Error.class) {
                            tmp142 = Parser.tracer.print("cannot parse more", 206);
                            return acc
                          } else {
                            rhs = scrut4;
                            tmp143 = Tree.summary(rhs);
                            tmp144 = "parsed " + tmp143;
                            tmp145 = Parser.tracer.print(tmp144, 209);
                            tmp146 = runtime.safeCall(process(rhs, runtime.Unit));
                            tmp147 = runtime.safeCall(tmp146(acc));
                            return termCont(tmp147, prec)
                          }
                        } else {
                          tmp148 = "the outer precedence is less than " + prec;
                          doTemp2 = Parser.tracer.print(tmp148, 211);
                          return acc
                        }
                      } else {
                        throw new globalThis.Error("match error");
                      }
                    } else if (scrut2 instanceof Option.None.class) {
                      tmp149 = "cannot consume " + token1;
                      tmp150 = Parser.tracer.print(tmp149, 214);
                      return acc
                    } else {
                      throw new globalThis.Error("match error");
                    }
                  }
                } else {
                  token1 = param01;
                  scrut2 = Rules.termInfixRule.exprChoice;
                  if (scrut2 instanceof Option.Some.class) {
                    param02 = scrut2.value;
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
                      tmp151 = "found an exprChoice with outerPrec = " + outerPrec;
                      doTemp1 = Parser.tracer.print(tmp151, 198);
                      outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                      scrut3 = outerPrec$_ > prec;
                      if (scrut3 === true) {
                        tmp152 = Option.getOrElse(innerPrec, outerPrec$_);
                        scrut4 = parseKind(kind, tmp152);
                        if (scrut4 instanceof Tree.Empty.class) {
                          tmp153 = Parser.tracer.print("nothing was parsed", 203);
                          return acc
                        } else if (scrut4 instanceof Tree.Error.class) {
                          tmp154 = Parser.tracer.print("cannot parse more", 206);
                          return acc
                        } else {
                          rhs = scrut4;
                          tmp155 = Tree.summary(rhs);
                          tmp156 = "parsed " + tmp155;
                          tmp157 = Parser.tracer.print(tmp156, 209);
                          tmp158 = runtime.safeCall(process(rhs, runtime.Unit));
                          tmp159 = runtime.safeCall(tmp158(acc));
                          return termCont(tmp159, prec)
                        }
                      } else {
                        tmp160 = "the outer precedence is less than " + prec;
                        doTemp2 = Parser.tracer.print(tmp160, 211);
                        return acc
                      }
                    } else {
                      throw new globalThis.Error("match error");
                    }
                  } else if (scrut2 instanceof Option.None.class) {
                    tmp161 = "cannot consume " + token1;
                    tmp162 = Parser.tracer.print(tmp161, 214);
                    return acc
                  } else {
                    throw new globalThis.Error("match error");
                  }
                }
              }
            } else {
              tmp163 = "keyword `" + name1;
              tmp164 = tmp163 + "` does not have infix rules";
              doTemp6 = Parser.tracer.print(tmp164, 184);
              name = param03;
              if (param12 === true) {
                scrut5 = runtime.safeCall(Precedence.Keywords.all.get(name));
                if (scrut5 instanceof Option.None.class) {
                  tmp165 = "found an operator \"" + name;
                  tmp166 = tmp165 + "\"";
                  doTemp3 = Parser.tracer.print(tmp166, 186);
                  scrut6 = Precedence.opPrec(name);
                  if (globalThis.Array.isArray(scrut6) && scrut6.length === 2) {
                    first01 = scrut6[0];
                    first11 = scrut6[1];
                    leftPrec = first01;
                    rightPrec = first11;
                    tmp167 = "leftPrec = " + leftPrec;
                    tmp168 = tmp167 + "; rightPrec = ";
                    tmp169 = tmp168 + rightPrec;
                    doTemp4 = Parser.tracer.print(tmp169, 188);
                    scrut7 = leftPrec > prec;
                    if (scrut7 === true) {
                      tmp170 = consume();
                      tmp171 = Tree.Ident(name, true);
                      op = tmp171;
                      tmp172 = term(rightPrec);
                      rhs1 = tmp172;
                      tmp173 = Stack.Cons(rhs1, Stack.Nil);
                      tmp174 = Stack.Cons(acc, tmp173);
                      tmp175 = Tree.App(op, tmp174);
                      return termCont(tmp175, prec)
                    } else {
                      return acc
                    }
                  } else {
                    token1 = param01;
                    scrut2 = Rules.termInfixRule.exprChoice;
                    if (scrut2 instanceof Option.Some.class) {
                      param02 = scrut2.value;
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
                        tmp176 = "found an exprChoice with outerPrec = " + outerPrec;
                        doTemp1 = Parser.tracer.print(tmp176, 198);
                        outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                        scrut3 = outerPrec$_ > prec;
                        if (scrut3 === true) {
                          tmp177 = Option.getOrElse(innerPrec, outerPrec$_);
                          scrut4 = parseKind(kind, tmp177);
                          if (scrut4 instanceof Tree.Empty.class) {
                            tmp178 = Parser.tracer.print("nothing was parsed", 203);
                            return acc
                          } else if (scrut4 instanceof Tree.Error.class) {
                            tmp179 = Parser.tracer.print("cannot parse more", 206);
                            return acc
                          } else {
                            rhs = scrut4;
                            tmp180 = Tree.summary(rhs);
                            tmp181 = "parsed " + tmp180;
                            tmp182 = Parser.tracer.print(tmp181, 209);
                            tmp183 = runtime.safeCall(process(rhs, runtime.Unit));
                            tmp184 = runtime.safeCall(tmp183(acc));
                            return termCont(tmp184, prec)
                          }
                        } else {
                          tmp185 = "the outer precedence is less than " + prec;
                          doTemp2 = Parser.tracer.print(tmp185, 211);
                          return acc
                        }
                      } else {
                        throw new globalThis.Error("match error");
                      }
                    } else if (scrut2 instanceof Option.None.class) {
                      tmp186 = "cannot consume " + token1;
                      tmp187 = Parser.tracer.print(tmp186, 214);
                      return acc
                    } else {
                      throw new globalThis.Error("match error");
                    }
                  }
                } else {
                  token1 = param01;
                  scrut2 = Rules.termInfixRule.exprChoice;
                  if (scrut2 instanceof Option.Some.class) {
                    param02 = scrut2.value;
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
                      tmp188 = "found an exprChoice with outerPrec = " + outerPrec;
                      doTemp1 = Parser.tracer.print(tmp188, 198);
                      outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                      scrut3 = outerPrec$_ > prec;
                      if (scrut3 === true) {
                        tmp189 = Option.getOrElse(innerPrec, outerPrec$_);
                        scrut4 = parseKind(kind, tmp189);
                        if (scrut4 instanceof Tree.Empty.class) {
                          tmp190 = Parser.tracer.print("nothing was parsed", 203);
                          return acc
                        } else if (scrut4 instanceof Tree.Error.class) {
                          tmp191 = Parser.tracer.print("cannot parse more", 206);
                          return acc
                        } else {
                          rhs = scrut4;
                          tmp192 = Tree.summary(rhs);
                          tmp193 = "parsed " + tmp192;
                          tmp194 = Parser.tracer.print(tmp193, 209);
                          tmp195 = runtime.safeCall(process(rhs, runtime.Unit));
                          tmp196 = runtime.safeCall(tmp195(acc));
                          return termCont(tmp196, prec)
                        }
                      } else {
                        tmp197 = "the outer precedence is less than " + prec;
                        doTemp2 = Parser.tracer.print(tmp197, 211);
                        return acc
                      }
                    } else {
                      throw new globalThis.Error("match error");
                    }
                  } else if (scrut2 instanceof Option.None.class) {
                    tmp198 = "cannot consume " + token1;
                    tmp199 = Parser.tracer.print(tmp198, 214);
                    return acc
                  } else {
                    throw new globalThis.Error("match error");
                  }
                }
              } else {
                token1 = param01;
                scrut2 = Rules.termInfixRule.exprChoice;
                if (scrut2 instanceof Option.Some.class) {
                  param02 = scrut2.value;
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
                    tmp200 = "found an exprChoice with outerPrec = " + outerPrec;
                    doTemp1 = Parser.tracer.print(tmp200, 198);
                    outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                    scrut3 = outerPrec$_ > prec;
                    if (scrut3 === true) {
                      tmp201 = Option.getOrElse(innerPrec, outerPrec$_);
                      scrut4 = parseKind(kind, tmp201);
                      if (scrut4 instanceof Tree.Empty.class) {
                        tmp202 = Parser.tracer.print("nothing was parsed", 203);
                        return acc
                      } else if (scrut4 instanceof Tree.Error.class) {
                        tmp203 = Parser.tracer.print("cannot parse more", 206);
                        return acc
                      } else {
                        rhs = scrut4;
                        tmp204 = Tree.summary(rhs);
                        tmp205 = "parsed " + tmp204;
                        tmp206 = Parser.tracer.print(tmp205, 209);
                        tmp207 = runtime.safeCall(process(rhs, runtime.Unit));
                        tmp208 = runtime.safeCall(tmp207(acc));
                        return termCont(tmp208, prec)
                      }
                    } else {
                      tmp209 = "the outer precedence is less than " + prec;
                      doTemp2 = Parser.tracer.print(tmp209, 211);
                      return acc
                    }
                  } else {
                    throw new globalThis.Error("match error");
                  }
                } else if (scrut2 instanceof Option.None.class) {
                  tmp210 = "cannot consume " + token1;
                  tmp211 = Parser.tracer.print(tmp210, 214);
                  return acc
                } else {
                  throw new globalThis.Error("match error");
                }
              }
            }
          } else {
            name = param03;
            if (param12 === true) {
              scrut5 = runtime.safeCall(Precedence.Keywords.all.get(name));
              if (scrut5 instanceof Option.None.class) {
                tmp212 = "found an operator \"" + name;
                tmp213 = tmp212 + "\"";
                doTemp3 = Parser.tracer.print(tmp213, 186);
                scrut6 = Precedence.opPrec(name);
                if (globalThis.Array.isArray(scrut6) && scrut6.length === 2) {
                  first01 = scrut6[0];
                  first11 = scrut6[1];
                  leftPrec = first01;
                  rightPrec = first11;
                  tmp214 = "leftPrec = " + leftPrec;
                  tmp215 = tmp214 + "; rightPrec = ";
                  tmp216 = tmp215 + rightPrec;
                  doTemp4 = Parser.tracer.print(tmp216, 188);
                  scrut7 = leftPrec > prec;
                  if (scrut7 === true) {
                    tmp217 = consume();
                    tmp218 = Tree.Ident(name, true);
                    op = tmp218;
                    tmp219 = term(rightPrec);
                    rhs1 = tmp219;
                    tmp220 = Stack.Cons(rhs1, Stack.Nil);
                    tmp221 = Stack.Cons(acc, tmp220);
                    tmp222 = Tree.App(op, tmp221);
                    return termCont(tmp222, prec)
                  } else {
                    return acc
                  }
                } else {
                  token1 = param01;
                  scrut2 = Rules.termInfixRule.exprChoice;
                  if (scrut2 instanceof Option.Some.class) {
                    param02 = scrut2.value;
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
                      tmp223 = "found an exprChoice with outerPrec = " + outerPrec;
                      doTemp1 = Parser.tracer.print(tmp223, 198);
                      outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                      scrut3 = outerPrec$_ > prec;
                      if (scrut3 === true) {
                        tmp224 = Option.getOrElse(innerPrec, outerPrec$_);
                        scrut4 = parseKind(kind, tmp224);
                        if (scrut4 instanceof Tree.Empty.class) {
                          tmp225 = Parser.tracer.print("nothing was parsed", 203);
                          return acc
                        } else if (scrut4 instanceof Tree.Error.class) {
                          tmp226 = Parser.tracer.print("cannot parse more", 206);
                          return acc
                        } else {
                          rhs = scrut4;
                          tmp227 = Tree.summary(rhs);
                          tmp228 = "parsed " + tmp227;
                          tmp229 = Parser.tracer.print(tmp228, 209);
                          tmp230 = runtime.safeCall(process(rhs, runtime.Unit));
                          tmp231 = runtime.safeCall(tmp230(acc));
                          return termCont(tmp231, prec)
                        }
                      } else {
                        tmp232 = "the outer precedence is less than " + prec;
                        doTemp2 = Parser.tracer.print(tmp232, 211);
                        return acc
                      }
                    } else {
                      throw new globalThis.Error("match error");
                    }
                  } else if (scrut2 instanceof Option.None.class) {
                    tmp233 = "cannot consume " + token1;
                    tmp234 = Parser.tracer.print(tmp233, 214);
                    return acc
                  } else {
                    throw new globalThis.Error("match error");
                  }
                }
              } else {
                token1 = param01;
                scrut2 = Rules.termInfixRule.exprChoice;
                if (scrut2 instanceof Option.Some.class) {
                  param02 = scrut2.value;
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
                    tmp235 = "found an exprChoice with outerPrec = " + outerPrec;
                    doTemp1 = Parser.tracer.print(tmp235, 198);
                    outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                    scrut3 = outerPrec$_ > prec;
                    if (scrut3 === true) {
                      tmp236 = Option.getOrElse(innerPrec, outerPrec$_);
                      scrut4 = parseKind(kind, tmp236);
                      if (scrut4 instanceof Tree.Empty.class) {
                        tmp237 = Parser.tracer.print("nothing was parsed", 203);
                        return acc
                      } else if (scrut4 instanceof Tree.Error.class) {
                        tmp238 = Parser.tracer.print("cannot parse more", 206);
                        return acc
                      } else {
                        rhs = scrut4;
                        tmp239 = Tree.summary(rhs);
                        tmp240 = "parsed " + tmp239;
                        tmp241 = Parser.tracer.print(tmp240, 209);
                        tmp242 = runtime.safeCall(process(rhs, runtime.Unit));
                        tmp243 = runtime.safeCall(tmp242(acc));
                        return termCont(tmp243, prec)
                      }
                    } else {
                      tmp244 = "the outer precedence is less than " + prec;
                      doTemp2 = Parser.tracer.print(tmp244, 211);
                      return acc
                    }
                  } else {
                    throw new globalThis.Error("match error");
                  }
                } else if (scrut2 instanceof Option.None.class) {
                  tmp245 = "cannot consume " + token1;
                  tmp246 = Parser.tracer.print(tmp245, 214);
                  return acc
                } else {
                  throw new globalThis.Error("match error");
                }
              }
            } else {
              token1 = param01;
              scrut2 = Rules.termInfixRule.exprChoice;
              if (scrut2 instanceof Option.Some.class) {
                param02 = scrut2.value;
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
                  tmp247 = "found an exprChoice with outerPrec = " + outerPrec;
                  doTemp1 = Parser.tracer.print(tmp247, 198);
                  outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                  scrut3 = outerPrec$_ > prec;
                  if (scrut3 === true) {
                    tmp248 = Option.getOrElse(innerPrec, outerPrec$_);
                    scrut4 = parseKind(kind, tmp248);
                    if (scrut4 instanceof Tree.Empty.class) {
                      tmp249 = Parser.tracer.print("nothing was parsed", 203);
                      return acc
                    } else if (scrut4 instanceof Tree.Error.class) {
                      tmp250 = Parser.tracer.print("cannot parse more", 206);
                      return acc
                    } else {
                      rhs = scrut4;
                      tmp251 = Tree.summary(rhs);
                      tmp252 = "parsed " + tmp251;
                      tmp253 = Parser.tracer.print(tmp252, 209);
                      tmp254 = runtime.safeCall(process(rhs, runtime.Unit));
                      tmp255 = runtime.safeCall(tmp254(acc));
                      return termCont(tmp255, prec)
                    }
                  } else {
                    tmp256 = "the outer precedence is less than " + prec;
                    doTemp2 = Parser.tracer.print(tmp256, 211);
                    return acc
                  }
                } else {
                  throw new globalThis.Error("match error");
                }
              } else if (scrut2 instanceof Option.None.class) {
                tmp257 = "cannot consume " + token1;
                tmp258 = Parser.tracer.print(tmp257, 214);
                return acc
              } else {
                throw new globalThis.Error("match error");
              }
            }
          }
        } else {
          token1 = param01;
          scrut2 = Rules.termInfixRule.exprChoice;
          if (scrut2 instanceof Option.Some.class) {
            param02 = scrut2.value;
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
              tmp259 = "found an exprChoice with outerPrec = " + outerPrec;
              doTemp1 = Parser.tracer.print(tmp259, 198);
              outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
              scrut3 = outerPrec$_ > prec;
              if (scrut3 === true) {
                tmp260 = Option.getOrElse(innerPrec, outerPrec$_);
                scrut4 = parseKind(kind, tmp260);
                if (scrut4 instanceof Tree.Empty.class) {
                  tmp261 = Parser.tracer.print("nothing was parsed", 203);
                  return acc
                } else if (scrut4 instanceof Tree.Error.class) {
                  tmp262 = Parser.tracer.print("cannot parse more", 206);
                  return acc
                } else {
                  rhs = scrut4;
                  tmp263 = Tree.summary(rhs);
                  tmp264 = "parsed " + tmp263;
                  tmp265 = Parser.tracer.print(tmp264, 209);
                  tmp266 = runtime.safeCall(process(rhs, runtime.Unit));
                  tmp267 = runtime.safeCall(tmp266(acc));
                  return termCont(tmp267, prec)
                }
              } else {
                tmp268 = "the outer precedence is less than " + prec;
                doTemp2 = Parser.tracer.print(tmp268, 211);
                return acc
              }
            } else {
              throw new globalThis.Error("match error");
            }
          } else if (scrut2 instanceof Option.None.class) {
            tmp269 = "cannot consume " + token1;
            tmp270 = Parser.tracer.print(tmp269, 214);
            return acc
          } else {
            throw new globalThis.Error("match error");
          }
        }
      } else if (scrut1 instanceof Stack.Nil.class) {
        return acc
      } else {
        throw new globalThis.Error("match error");
      }
    };
    typeExpr = function typeExpr(prec) {
      let tmp4, tmp5, tmp6, tmp7, tmp8;
      tmp4 = "typeExpr <<< " + prec;
      tmp5 = tmp4 + " ";
      tmp6 = TokenHelpers.preview(current);
      tmp7 = tmp5 + tmp6;
      tmp8 = () => {
        let scrut1, param01, param11, token1, param02, param12, name, symbolic, scrut2, param03, keyword, scrut3, param04, rule, scrut4, acc, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20, tmp21;
        tmp9 = yeetSpaces();
        scrut1 = tmp9;
        if (scrut1 instanceof Stack.Cons.class) {
          param01 = scrut1.head;
          param11 = scrut1.tail;
          if (param01 instanceof Token.Identifier.class) {
            param02 = param01.name;
            param12 = param01.symbolic;
            name = param02;
            symbolic = param12;
            scrut2 = runtime.safeCall(Precedence.TypeKeywords.all.get(name));
            if (scrut2 instanceof Option.Some.class) {
              param03 = scrut2.value;
              keyword = param03;
              scrut3 = runtime.safeCall(Rules.typeRule.keywordChoices.get(name));
              if (scrut3 instanceof Option.Some.class) {
                param04 = scrut3.value;
                rule = param04;
                scrut4 = keyword.leftPrecOrMin > prec;
                if (scrut4 === true) {
                  tmp10 = consume();
                  tmp11 = parseRule(keyword.rightPrecOrMax, rule, Precedence.TypeKeywords.all);
                  acc = tmp11;
                  return typeExprCont(acc, prec)
                } else {
                  tmp12 = "the left precedence is less" + name;
                  tmp13 = Parser.tracer.print(tmp12, 231);
                  return Tree.empty
                }
              } else if (scrut3 instanceof Option.None.class) {
                tmp14 = "no rule starting with " + name;
                tmp15 = Parser.tracer.print(tmp14, 234);
                return Tree.empty
              } else {
                token1 = param01;
                tmp16 = "unrecognized token: " + token1;
                return Tree.error(tmp16)
              }
            } else if (scrut2 instanceof Option.None.class) {
              if (symbolic === true) {
                tmp17 = "unexpected symbolic identifier: " + name;
                return Tree.error(tmp17)
              } else {
                tmp18 = consume();
                tmp19 = Tree.Ident(name);
                return typeExprCont(tmp19, prec)
              }
            } else {
              token1 = param01;
              tmp20 = "unrecognized token: " + token1;
              return Tree.error(tmp20)
            }
          } else {
            token1 = param01;
            tmp21 = "unrecognized token: " + token1;
            return Tree.error(tmp21)
          }
        } else {
          return Tree.error("unexpected end of input")
        }
      };
      return runtime.safeCall(Parser.tracer.trace(tmp7, (result) => {
        let tmp9;
        tmp9 = Tree.summary(result);
        return "typeExpr >>> " + tmp9
      }, tmp8))
    };
    typeExprCont = function typeExprCont(acc, prec) {
      let scrut1, doTemp, doTemp1, param01, param11, token1, scrut2, param02, first4, first3, first2, first1, first0, kind, process, outerPrec, innerPrec, rest, doTemp2, outerPrec$_, doTemp3, scrut3, scrut4, rhs, param03, param12, name, scrut5, param04, keyword, scrut6, param05, rule, doTemp4, doTemp5, scrut7, scrut8, param06, first41, first31, first21, first11, first01, kind1, process1, outerPrec1, innerPrec1, rest1, rhs1, acc$_, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20, tmp21, tmp22, tmp23, tmp24, tmp25, tmp26, tmp27, tmp28, tmp29, tmp30, tmp31, tmp32, tmp33, tmp34, tmp35, tmp36, tmp37, tmp38, tmp39, tmp40, tmp41, tmp42, tmp43, tmp44, tmp45, tmp46, tmp47, tmp48, tmp49, tmp50, tmp51, tmp52, tmp53, tmp54, tmp55, tmp56, tmp57, tmp58, tmp59, tmp60, tmp61, tmp62, tmp63, tmp64, tmp65, tmp66, tmp67, tmp68, tmp69, tmp70, tmp71, tmp72, tmp73, tmp74, tmp75, tmp76, tmp77, tmp78, tmp79, tmp80, tmp81, tmp82, tmp83;
      tmp4 = ">>> typeExprCont " + prec;
      tmp5 = tmp4 + " ";
      tmp6 = Tree.summary(acc);
      tmp7 = tmp5 + tmp6;
      tmp8 = tmp7 + " <<<";
      tmp9 = Parser.tracer.print(tmp8, 246);
      tmp10 = yeetSpaces();
      scrut1 = tmp10;
      tmp11 = TokenHelpers.preview(current);
      tmp12 = "check keyword " + tmp11;
      doTemp = Parser.tracer.print(tmp12, 248);
      if (scrut1 instanceof Stack.Cons.class) {
        param01 = scrut1.head;
        param11 = scrut1.tail;
        if (param01 instanceof Token.Identifier.class) {
          param03 = param01.name;
          param12 = param01.symbolic;
          name = param03;
          scrut5 = runtime.safeCall(Precedence.TypeKeywords.all.get(name));
          if (scrut5 instanceof Option.Some.class) {
            param04 = scrut5.value;
            keyword = param04;
            scrut6 = runtime.safeCall(Rules.typeInfixRule.keywordChoices.get(name));
            if (scrut6 instanceof Option.Some.class) {
              param05 = scrut6.value;
              rule = param05;
              tmp13 = "the keyword is found in infix rules" + name;
              doTemp4 = Parser.tracer.print(tmp13, 251);
              scrut7 = keyword.leftPrecOrMin > prec;
              if (scrut7 === true) {
                scrut8 = rule.exprChoice;
                if (scrut8 instanceof Option.Some.class) {
                  param06 = scrut8.value;
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
                    tmp14 = consume();
                    tmp15 = parseKind(kind1, keyword.rightPrecOrMin);
                    rhs1 = tmp15;
                    tmp16 = runtime.safeCall(process1(rhs1));
                    tmp17 = runtime.safeCall(tmp16(acc));
                    acc$_ = tmp17;
                    return typeExprCont(acc$_, prec)
                  } else {
                    tmp18 = "keyword `" + name;
                    tmp19 = tmp18 + "` does not have infix rules";
                    doTemp5 = Parser.tracer.print(tmp19, 260);
                    doTemp1 = Parser.tracer.print("not a keyword", 262);
                    token1 = param01;
                    scrut2 = Rules.typeInfixRule.exprChoice;
                    if (scrut2 instanceof Option.Some.class) {
                      param02 = scrut2.value;
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
                        tmp20 = "found an exprChoice with outerPrec = " + outerPrec;
                        doTemp2 = Parser.tracer.print(tmp20, 265);
                        outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                        scrut3 = outerPrec$_ > prec;
                        if (scrut3 === true) {
                          tmp21 = Option.getOrElse(innerPrec, outerPrec$_);
                          scrut4 = parseKind(kind, tmp21);
                          if (scrut4 instanceof Tree.Empty.class) {
                            tmp22 = Parser.tracer.print("nothing was parsed", 270);
                            return acc
                          } else if (scrut4 instanceof Tree.Error.class) {
                            tmp23 = Parser.tracer.print("cannot parse more", 273);
                            return acc
                          } else {
                            rhs = scrut4;
                            tmp24 = Tree.summary(rhs);
                            tmp25 = "parsed " + tmp24;
                            tmp26 = Parser.tracer.print(tmp25, 276);
                            tmp27 = runtime.safeCall(process(rhs));
                            tmp28 = runtime.safeCall(tmp27(acc));
                            return typeExprCont(tmp28, prec)
                          }
                        } else {
                          tmp29 = "the outer precedence is less than " + prec;
                          doTemp3 = Parser.tracer.print(tmp29, 278);
                          return acc
                        }
                      } else {
                        throw new globalThis.Error("match error");
                      }
                    } else if (scrut2 instanceof Option.None.class) {
                      return acc
                    } else {
                      throw new globalThis.Error("match error");
                    }
                  }
                } else if (scrut8 instanceof Option.None.class) {
                  return acc
                } else {
                  tmp30 = "keyword `" + name;
                  tmp31 = tmp30 + "` does not have infix rules";
                  doTemp5 = Parser.tracer.print(tmp31, 260);
                  doTemp1 = Parser.tracer.print("not a keyword", 262);
                  token1 = param01;
                  scrut2 = Rules.typeInfixRule.exprChoice;
                  if (scrut2 instanceof Option.Some.class) {
                    param02 = scrut2.value;
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
                      tmp32 = "found an exprChoice with outerPrec = " + outerPrec;
                      doTemp2 = Parser.tracer.print(tmp32, 265);
                      outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                      scrut3 = outerPrec$_ > prec;
                      if (scrut3 === true) {
                        tmp33 = Option.getOrElse(innerPrec, outerPrec$_);
                        scrut4 = parseKind(kind, tmp33);
                        if (scrut4 instanceof Tree.Empty.class) {
                          tmp34 = Parser.tracer.print("nothing was parsed", 270);
                          return acc
                        } else if (scrut4 instanceof Tree.Error.class) {
                          tmp35 = Parser.tracer.print("cannot parse more", 273);
                          return acc
                        } else {
                          rhs = scrut4;
                          tmp36 = Tree.summary(rhs);
                          tmp37 = "parsed " + tmp36;
                          tmp38 = Parser.tracer.print(tmp37, 276);
                          tmp39 = runtime.safeCall(process(rhs));
                          tmp40 = runtime.safeCall(tmp39(acc));
                          return typeExprCont(tmp40, prec)
                        }
                      } else {
                        tmp41 = "the outer precedence is less than " + prec;
                        doTemp3 = Parser.tracer.print(tmp41, 278);
                        return acc
                      }
                    } else {
                      throw new globalThis.Error("match error");
                    }
                  } else if (scrut2 instanceof Option.None.class) {
                    return acc
                  } else {
                    throw new globalThis.Error("match error");
                  }
                }
              } else {
                tmp42 = "keyword `" + name;
                tmp43 = tmp42 + "` does not have infix rules";
                doTemp5 = Parser.tracer.print(tmp43, 260);
                doTemp1 = Parser.tracer.print("not a keyword", 262);
                token1 = param01;
                scrut2 = Rules.typeInfixRule.exprChoice;
                if (scrut2 instanceof Option.Some.class) {
                  param02 = scrut2.value;
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
                    tmp44 = "found an exprChoice with outerPrec = " + outerPrec;
                    doTemp2 = Parser.tracer.print(tmp44, 265);
                    outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                    scrut3 = outerPrec$_ > prec;
                    if (scrut3 === true) {
                      tmp45 = Option.getOrElse(innerPrec, outerPrec$_);
                      scrut4 = parseKind(kind, tmp45);
                      if (scrut4 instanceof Tree.Empty.class) {
                        tmp46 = Parser.tracer.print("nothing was parsed", 270);
                        return acc
                      } else if (scrut4 instanceof Tree.Error.class) {
                        tmp47 = Parser.tracer.print("cannot parse more", 273);
                        return acc
                      } else {
                        rhs = scrut4;
                        tmp48 = Tree.summary(rhs);
                        tmp49 = "parsed " + tmp48;
                        tmp50 = Parser.tracer.print(tmp49, 276);
                        tmp51 = runtime.safeCall(process(rhs));
                        tmp52 = runtime.safeCall(tmp51(acc));
                        return typeExprCont(tmp52, prec)
                      }
                    } else {
                      tmp53 = "the outer precedence is less than " + prec;
                      doTemp3 = Parser.tracer.print(tmp53, 278);
                      return acc
                    }
                  } else {
                    throw new globalThis.Error("match error");
                  }
                } else if (scrut2 instanceof Option.None.class) {
                  return acc
                } else {
                  throw new globalThis.Error("match error");
                }
              }
            } else {
              doTemp1 = Parser.tracer.print("not a keyword", 262);
              token1 = param01;
              scrut2 = Rules.typeInfixRule.exprChoice;
              if (scrut2 instanceof Option.Some.class) {
                param02 = scrut2.value;
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
                  tmp54 = "found an exprChoice with outerPrec = " + outerPrec;
                  doTemp2 = Parser.tracer.print(tmp54, 265);
                  outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                  scrut3 = outerPrec$_ > prec;
                  if (scrut3 === true) {
                    tmp55 = Option.getOrElse(innerPrec, outerPrec$_);
                    scrut4 = parseKind(kind, tmp55);
                    if (scrut4 instanceof Tree.Empty.class) {
                      tmp56 = Parser.tracer.print("nothing was parsed", 270);
                      return acc
                    } else if (scrut4 instanceof Tree.Error.class) {
                      tmp57 = Parser.tracer.print("cannot parse more", 273);
                      return acc
                    } else {
                      rhs = scrut4;
                      tmp58 = Tree.summary(rhs);
                      tmp59 = "parsed " + tmp58;
                      tmp60 = Parser.tracer.print(tmp59, 276);
                      tmp61 = runtime.safeCall(process(rhs));
                      tmp62 = runtime.safeCall(tmp61(acc));
                      return typeExprCont(tmp62, prec)
                    }
                  } else {
                    tmp63 = "the outer precedence is less than " + prec;
                    doTemp3 = Parser.tracer.print(tmp63, 278);
                    return acc
                  }
                } else {
                  throw new globalThis.Error("match error");
                }
              } else if (scrut2 instanceof Option.None.class) {
                return acc
              } else {
                throw new globalThis.Error("match error");
              }
            }
          } else {
            doTemp1 = Parser.tracer.print("not a keyword", 262);
            token1 = param01;
            scrut2 = Rules.typeInfixRule.exprChoice;
            if (scrut2 instanceof Option.Some.class) {
              param02 = scrut2.value;
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
                tmp64 = "found an exprChoice with outerPrec = " + outerPrec;
                doTemp2 = Parser.tracer.print(tmp64, 265);
                outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                scrut3 = outerPrec$_ > prec;
                if (scrut3 === true) {
                  tmp65 = Option.getOrElse(innerPrec, outerPrec$_);
                  scrut4 = parseKind(kind, tmp65);
                  if (scrut4 instanceof Tree.Empty.class) {
                    tmp66 = Parser.tracer.print("nothing was parsed", 270);
                    return acc
                  } else if (scrut4 instanceof Tree.Error.class) {
                    tmp67 = Parser.tracer.print("cannot parse more", 273);
                    return acc
                  } else {
                    rhs = scrut4;
                    tmp68 = Tree.summary(rhs);
                    tmp69 = "parsed " + tmp68;
                    tmp70 = Parser.tracer.print(tmp69, 276);
                    tmp71 = runtime.safeCall(process(rhs));
                    tmp72 = runtime.safeCall(tmp71(acc));
                    return typeExprCont(tmp72, prec)
                  }
                } else {
                  tmp73 = "the outer precedence is less than " + prec;
                  doTemp3 = Parser.tracer.print(tmp73, 278);
                  return acc
                }
              } else {
                throw new globalThis.Error("match error");
              }
            } else if (scrut2 instanceof Option.None.class) {
              return acc
            } else {
              throw new globalThis.Error("match error");
            }
          }
        } else {
          doTemp1 = Parser.tracer.print("not a keyword", 262);
          token1 = param01;
          scrut2 = Rules.typeInfixRule.exprChoice;
          if (scrut2 instanceof Option.Some.class) {
            param02 = scrut2.value;
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
              tmp74 = "found an exprChoice with outerPrec = " + outerPrec;
              doTemp2 = Parser.tracer.print(tmp74, 265);
              outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
              scrut3 = outerPrec$_ > prec;
              if (scrut3 === true) {
                tmp75 = Option.getOrElse(innerPrec, outerPrec$_);
                scrut4 = parseKind(kind, tmp75);
                if (scrut4 instanceof Tree.Empty.class) {
                  tmp76 = Parser.tracer.print("nothing was parsed", 270);
                  return acc
                } else if (scrut4 instanceof Tree.Error.class) {
                  tmp77 = Parser.tracer.print("cannot parse more", 273);
                  return acc
                } else {
                  rhs = scrut4;
                  tmp78 = Tree.summary(rhs);
                  tmp79 = "parsed " + tmp78;
                  tmp80 = Parser.tracer.print(tmp79, 276);
                  tmp81 = runtime.safeCall(process(rhs));
                  tmp82 = runtime.safeCall(tmp81(acc));
                  return typeExprCont(tmp82, prec)
                }
              } else {
                tmp83 = "the outer precedence is less than " + prec;
                doTemp3 = Parser.tracer.print(tmp83, 278);
                return acc
              }
            } else {
              throw new globalThis.Error("match error");
            }
          } else if (scrut2 instanceof Option.None.class) {
            return acc
          } else {
            throw new globalThis.Error("match error");
          }
        }
      } else {
        doTemp1 = Parser.tracer.print("not a keyword", 262);
        if (scrut1 instanceof Stack.Nil.class) {
          return acc
        } else {
          throw new globalThis.Error("match error");
        }
      }
    };
    mod = function mod(acc) {
      let scrut1, doTemp, param01, param11, param02, param12, name, scrut2, param03, keyword, scrut3, param04, rule, tree1, scrut4, param05, rule1, tree2, param06, param13, bindings, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20;
      tmp4 = yeetSpaces();
      scrut1 = tmp4;
      doTemp = Parser.tracer.print(">>>>>> mod <<<<<<", 284);
      if (scrut1 instanceof Stack.Cons.class) {
        param01 = scrut1.head;
        param11 = scrut1.tail;
        if (param01 instanceof Token.Identifier.class) {
          param02 = param01.name;
          param12 = param01.symbolic;
          if (param02 === ";;") {
            tmp5 = consume();
            return mod
          } else {
            name = param02;
            scrut2 = runtime.safeCall(Precedence.Keywords.all.get(name));
            if (scrut2 instanceof Option.Some.class) {
              param03 = scrut2.value;
              keyword = param03;
              scrut4 = runtime.safeCall(Rules.termRule.keywordChoices.get(name));
              if (scrut4 instanceof Option.Some.class) {
                param05 = scrut4.value;
                rule1 = param05;
                tmp6 = term(0);
                tree2 = tmp6;
                if (tree2 instanceof Tree.LetIn.class) {
                  param06 = tree2.bindings;
                  param13 = tree2.body;
                  bindings = param06;
                  if (param13 instanceof Tree.Empty.class) {
                    tmp7 = Tree.DefineKind.Let(false);
                    tmp8 = Tree.Define(tmp7, bindings);
                    tmp9 = Stack.Cons(tmp8, acc);
                    return modCont(tmp9)
                  } else {
                    tmp10 = Stack.Cons(tree2, acc);
                    return modCont(tmp10)
                  }
                } else {
                  tmp11 = Stack.Cons(tree2, acc);
                  return modCont(tmp11)
                }
              } else {
                scrut3 = runtime.safeCall(Rules.declRule.keywordChoices.get(name));
                if (scrut3 instanceof Option.Some.class) {
                  param04 = scrut3.value;
                  rule = param04;
                  tmp12 = consume();
                  tmp13 = parseRule(0, rule, Precedence.Keywords.all);
                  tree1 = tmp13;
                  tmp14 = Stack.Cons(tree1, acc);
                  return modCont(tmp14)
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
          }
        } else {
          tmp19 = term(0, Option.None);
          tmp20 = Stack.Cons(tmp19, acc);
          return modCont(tmp20)
        }
      } else if (scrut1 instanceof Stack.Nil.class) {
        return Stack.reverse(acc)
      } else {
        throw new globalThis.Error("match error");
      }
    };
    modCont = function modCont(acc) {
      let scrut1, doTemp, param01, param11, param02, param12, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9;
      tmp4 = yeetSpaces();
      scrut1 = tmp4;
      doTemp = Parser.tracer.print(">>>>>> modCont <<<<<<", 305);
      if (scrut1 instanceof Stack.Cons.class) {
        param01 = scrut1.head;
        param11 = scrut1.tail;
        if (param01 instanceof Token.Identifier.class) {
          param02 = param01.name;
          param12 = param01.symbolic;
          if (param02 === ";;") {
            tmp5 = consume();
            return mod(acc)
          } else {
            tmp6 = parseRule(0, Rules.declRule, Precedence.Keywords.all);
            tmp7 = Stack.Cons(tmp6, acc);
            return modCont(tmp7)
          }
        } else {
          tmp8 = parseRule(0, Rules.declRule, Precedence.Keywords.all);
          tmp9 = Stack.Cons(tmp8, acc);
          return modCont(tmp9)
        }
      } else if (scrut1 instanceof Stack.Nil.class) {
        return Stack.reverse(acc)
      } else {
        throw new globalThis.Error("match error");
      }
    };
    current = tokens;
    counter = 0;
    tmp = runtime.safeCall(Parser.tracer.trace("module <<< ", (result) => {
      let tmp4;
      tmp4 = Tree.summary(result);
      return "module >>> " + tmp4
    }, () => {
      return mod(Stack.Nil)
    }));
    tree = tmp;
    tmp1 = yeetSpaces();
    scrut = tmp1;
    if (scrut instanceof Stack.Cons.class) {
      param0 = scrut.head;
      param1 = scrut.tail;
      token = param0;
      tmp2 = "expect EOF instead of " + token;
      message = tmp2;
      tmp3 = Parser.tracer.print(message, 320);
      return Tree.Error(tree, message)
    } else if (scrut instanceof Stack.Nil.class) {
      return tree
    } else {
      throw new globalThis.Error("match error");
    }
  }
  static toString() { return "Parser"; }
};
let Parser = Parser1; export default Parser;
