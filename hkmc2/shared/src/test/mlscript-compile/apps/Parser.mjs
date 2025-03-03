import runtime from "./../Runtime.mjs";
import Predef from "./../Predef.mjs";
import Option from "./../Option.mjs";
import Stack from "./../Stack.mjs";
import BetterMap from "./../BetterMap.mjs";
import TreeTracer from "./../TreeTracer.mjs";
import Iter from "./../Iter.mjs";
import Lexer from "./Lexer.mjs";
import Extension from "./parsing/Extension.mjs";
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
    let parseKind, typeExprCont, term, handleDirective, parseRule, modCont, consume, termCont, typeExpr, mod, counter, tree, param0, param1, token, message, tmp, tmp1, tmp2;
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
      let scrut, param01, rule, param02, param11, token1, param03, param12, name, scrut1, param04, param13, token2, param05, param14, name1, scrut2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12;
      if (kind === "type") {
        return typeExpr(prec, Precedence.Keywords.all)
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
              scrut2 = runtime.safeCall(Precedence.Keywords.all.get(name1));
              if (scrut2 instanceof Option.None.class) {
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
          } else {
            token2 = param04;
            tmp6 = "expect an identifier but found " + token2;
            return Tree.error(tmp6)
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
                tmp7 = consume();
                return Tree.Ident(name, false)
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
          } else {
            token1 = param02;
            tmp10 = "expect a type variable but found " + token1;
            return Tree.error(tmp10)
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
          tmp11 = "Unknown syntax kind: \"" + kind;
          tmp12 = tmp11 + "\"";
          throw globalThis.Error(tmp12);
        }
      }
    };
    parseRule = function parseRule(prec, rule, allKeywords) {
      let tmp3, tmp4, tmp5, tmp6;
      tmp3 = "parsing rule \"" + rule.name;
      tmp4 = tmp3 + "\" with precedence ";
      tmp5 = tmp4 + prec;
      tmp6 = () => {
        let scrut, param01, value, param02, param11, other, doTemp, doTemp1, doTemp2, scrut1, param03, value1, scrut2, param04, first4, first3, first2, first1, first0, kind, process, outerPrec, innerPrec, rest, doTemp3, outerPrec$_, innerPrec$_, doTemp4, scrut3, scrut4, acc, tree1, scrut5, param05, value2, param06, param12, name, doTemp5, doTemp6, scrut6, param07, keyword, doTemp7, doTemp8, scrut7, doTemp9, doTemp10, scrut8, param08, value3, scrut9, param09, first41, first31, first21, first11, first01, kind1, process1, outerPrec1, innerPrec1, rest1, doTemp11, outerPrec$_1, innerPrec$_1, doTemp12, scrut10, scrut11, acc1, tree2, scrut12, param010, value4, param011, rest2, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20, tmp21, tmp22, tmp23, tmp24, tmp25, tmp26, tmp27, tmp28, tmp29, tmp30, tmp31, tmp32, tmp33, tmp34, tmp35, tmp36, tmp37, tmp38, tmp39, tmp40, tmp41, tmp42, tmp43, tmp44, tmp45, tmp46, tmp47, tmp48, tmp49, tmp50, tmp51, tmp52, tmp53, tmp54, tmp55, tmp56, tmp57, tmp58, tmp59, tmp60, tmp61, tmp62, tmp63, tmp64, tmp65, tmp66, tmp67, tmp68, tmp69, tmp70, tmp71, tmp72, tmp73, tmp74, tmp75, tmp76, tmp77, tmp78, tmp79, tmp80, tmp81, tmp82, tmp83, tmp84, tmp85, tmp86, tmp87, tmp88, tmp89, tmp90, tmp91, tmp92, tmp93, tmp94, tmp95, tmp96, tmp97, tmp98, tmp99, tmp100, tmp101, tmp102, tmp103, tmp104, tmp105, tmp106, tmp107, tmp108, tmp109, tmp110, tmp111, tmp112, tmp113, tmp114, tmp115, tmp116, tmp117, tmp118, tmp119, tmp120, tmp121, tmp122, tmp123, tmp124, tmp125, tmp126, tmp127;
        if (tokens instanceof Stack.Cons.class) {
          param02 = tokens.head;
          param11 = tokens.tail;
          if (param02 instanceof Token.Identifier.class) {
            param06 = param02.name;
            param12 = param02.symbolic;
            name = param06;
            tmp7 = "found an identifier \"" + name;
            tmp8 = tmp7 + "\"";
            doTemp5 = Parser.tracer.print(tmp8, 71);
            scrut6 = runtime.safeCall(allKeywords.get(name));
            if (scrut6 instanceof Option.Some.class) {
              param07 = scrut6.value;
              keyword = param07;
              tmp9 = runtime.safeCall(keyword.toString());
              doTemp7 = Parser.tracer.print(tmp9, 73);
              tmp10 = (caseScrut) => {
                let first12, first02, k, v, tmp128;
                if (globalThis.Array.isArray(caseScrut) && caseScrut.length === 2) {
                  first02 = caseScrut[0];
                  first12 = caseScrut[1];
                  k = first02;
                  v = first12;
                  tmp128 = "`" + k;
                  return tmp128 + "`"
                } else {
                  throw new globalThis.Error("match error");
                }
              };
              tmp11 = Iter.mapping(rule.keywordChoices, tmp10);
              tmp12 = Iter.joined(tmp11, ", ");
              doTemp8 = Parser.tracer.print("keyword choices: ", tmp12);
              scrut7 = runtime.safeCall(rule.keywordChoices.get(name));
              if (scrut7 instanceof Option.Some.class) {
                param011 = scrut7.value;
                rest2 = param011;
                tmp13 = "found a rule starting with `" + name;
                tmp14 = tmp13 + "`";
                tmp15 = Parser.tracer.print(tmp14, 79);
                tmp16 = "the rest of the rule: " + rest2.display;
                tmp17 = Parser.tracer.print(tmp16, 80);
                tmp18 = consume();
                return parseRule(0, rest2, allKeywords)
              } else if (scrut7 instanceof Option.None.class) {
                tmp19 = "no rule starting with `" + name;
                tmp20 = tmp19 + "` was found";
                doTemp9 = Parser.tracer.print(tmp20, 84);
                tmp21 = "the left prec of `" + name;
                tmp22 = tmp21 + "` is ";
                tmp23 = tmp22 + keyword.leftPrec;
                doTemp10 = Parser.tracer.print(tmp23, 85);
                scrut9 = rule.exprChoice;
                if (scrut9 instanceof Option.Some.class) {
                  param09 = scrut9.value;
                  if (globalThis.Array.isArray(param09) && param09.length === 5) {
                    first01 = param09[0];
                    first11 = param09[1];
                    first21 = param09[2];
                    first31 = param09[3];
                    first41 = param09[4];
                    kind1 = first01;
                    process1 = first11;
                    outerPrec1 = first21;
                    innerPrec1 = first31;
                    rest1 = first41;
                    tmp24 = "found an reference to \"" + kind1;
                    tmp25 = tmp24 + "\" at ";
                    tmp26 = TokenHelpers.preview(tokens);
                    tmp27 = tmp25 + tmp26;
                    doTemp11 = Parser.tracer.print(tmp27, 87);
                    outerPrec$_1 = Option.getOrElse(outerPrec1, Precedence.Keywords.maxKeywordPrec);
                    innerPrec$_1 = Option.getOrElse(innerPrec1, prec);
                    scrut10 = outerPrec$_1 > prec;
                    if (scrut10 === true) {
                      scrut11 = parseKind(kind1, prec);
                      if (scrut11 instanceof Tree.Error.class) {
                        tmp28 = Parser.tracer.print("cannot parse more", 93);
                        scrut12 = rule.endChoice;
                        if (scrut12 instanceof Option.Some.class) {
                          param010 = scrut12.value;
                          value4 = param010;
                          tmp29 = Parser.tracer.print("found end choice", 95);
                          return value4
                        } else {
                          throw new globalThis.Error("match error");
                        }
                      } else {
                        acc1 = scrut11;
                        tmp30 = parseRule(prec, rest1, allKeywords);
                        tree2 = tmp30;
                        tmp31 = Tree.summary(acc1);
                        tmp32 = "acc: " + tmp31;
                        tmp33 = Parser.tracer.print(tmp32, 99);
                        tmp34 = Tree.summary(tree2);
                        tmp35 = "parsed from rest rule: " + tmp34;
                        tmp36 = Parser.tracer.print(tmp35, 100);
                        return runtime.safeCall(process1(acc1, tree2))
                      }
                    } else {
                      tmp37 = "did not parse kind \"" + kind1;
                      tmp38 = tmp37 + "\" because of the precedence";
                      doTemp12 = Parser.tracer.print(tmp38, 102);
                      scrut8 = rule.endChoice;
                      if (scrut8 instanceof Option.Some.class) {
                        param08 = scrut8.value;
                        value3 = param08;
                        tmp39 = Parser.tracer.print("found end choice", 104);
                        return value3
                      } else {
                        tmp40 = consume();
                        tmp41 = "unexpected keyword " + keyword.name;
                        return Tree.error(tmp41)
                      }
                    }
                  } else {
                    scrut8 = rule.endChoice;
                    if (scrut8 instanceof Option.Some.class) {
                      param08 = scrut8.value;
                      value3 = param08;
                      tmp42 = Parser.tracer.print("found end choice", 104);
                      return value3
                    } else {
                      tmp43 = consume();
                      tmp44 = "unexpected keyword " + keyword.name;
                      return Tree.error(tmp44)
                    }
                  }
                } else {
                  scrut8 = rule.endChoice;
                  if (scrut8 instanceof Option.Some.class) {
                    param08 = scrut8.value;
                    value3 = param08;
                    tmp45 = Parser.tracer.print("found end choice", 104);
                    return value3
                  } else {
                    tmp46 = consume();
                    tmp47 = "unexpected keyword " + keyword.name;
                    return Tree.error(tmp47)
                  }
                }
              } else {
                tmp48 = "\"" + name;
                tmp49 = tmp48 + "\" is not a keyword";
                doTemp6 = Parser.tracer.print(tmp49, 109);
                other = param02;
                tmp50 = "the current rule is " + rule.display;
                doTemp = runtime.safeCall(Parser.tracer.print(tmp50));
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
                    tmp51 = "found an reference to \"" + kind;
                    tmp52 = tmp51 + "\" at ";
                    tmp53 = TokenHelpers.preview(tokens);
                    tmp54 = tmp52 + tmp53;
                    doTemp3 = Parser.tracer.print(tmp54, 113);
                    outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxKeywordPrec);
                    innerPrec$_ = Option.getOrElse(innerPrec, prec);
                    scrut3 = outerPrec$_ > prec;
                    if (scrut3 === true) {
                      scrut4 = parseKind(kind, prec);
                      if (scrut4 instanceof Tree.Error.class) {
                        tmp55 = Parser.tracer.print("cannot parse more", 119);
                        scrut5 = rule.endChoice;
                        if (scrut5 instanceof Option.Some.class) {
                          param05 = scrut5.value;
                          value2 = param05;
                          tmp56 = Parser.tracer.print("found end choice", 121);
                          return value2
                        } else {
                          throw new globalThis.Error("match error");
                        }
                      } else {
                        acc = scrut4;
                        tmp57 = parseRule(prec, rest, allKeywords);
                        tree1 = tmp57;
                        tmp58 = Tree.summary(acc);
                        tmp59 = "acc: " + tmp58;
                        tmp60 = Parser.tracer.print(tmp59, 125);
                        tmp61 = Tree.summary(tree1);
                        tmp62 = "parsed from rest rule: " + tmp61;
                        tmp63 = Parser.tracer.print(tmp62, 126);
                        return runtime.safeCall(process(acc, tree1))
                      }
                    } else {
                      tmp64 = "did not parse kind \"" + kind;
                      tmp65 = tmp64 + "\" because of the precedence";
                      doTemp4 = Parser.tracer.print(tmp65, 128);
                      doTemp1 = Parser.tracer.print("no reference choice", 129);
                      scrut1 = rule.endChoice;
                      if (scrut1 instanceof Option.Some.class) {
                        param03 = scrut1.value;
                        value1 = param03;
                        tmp66 = Parser.tracer.print("found end choice", 131);
                        return value1
                      } else {
                        doTemp2 = Parser.tracer.print("no end choice", 133);
                        tmp67 = consume();
                        tmp68 = "unexpected token " + other;
                        return Tree.error(tmp68)
                      }
                    }
                  } else {
                    doTemp1 = Parser.tracer.print("no reference choice", 129);
                    scrut1 = rule.endChoice;
                    if (scrut1 instanceof Option.Some.class) {
                      param03 = scrut1.value;
                      value1 = param03;
                      tmp69 = Parser.tracer.print("found end choice", 131);
                      return value1
                    } else {
                      doTemp2 = Parser.tracer.print("no end choice", 133);
                      tmp70 = consume();
                      tmp71 = "unexpected token " + other;
                      return Tree.error(tmp71)
                    }
                  }
                } else {
                  doTemp1 = Parser.tracer.print("no reference choice", 129);
                  scrut1 = rule.endChoice;
                  if (scrut1 instanceof Option.Some.class) {
                    param03 = scrut1.value;
                    value1 = param03;
                    tmp72 = Parser.tracer.print("found end choice", 131);
                    return value1
                  } else {
                    doTemp2 = Parser.tracer.print("no end choice", 133);
                    tmp73 = consume();
                    tmp74 = "unexpected token " + other;
                    return Tree.error(tmp74)
                  }
                }
              }
            } else {
              tmp75 = "\"" + name;
              tmp76 = tmp75 + "\" is not a keyword";
              doTemp6 = Parser.tracer.print(tmp76, 109);
              other = param02;
              tmp77 = "the current rule is " + rule.display;
              doTemp = runtime.safeCall(Parser.tracer.print(tmp77));
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
                  tmp78 = "found an reference to \"" + kind;
                  tmp79 = tmp78 + "\" at ";
                  tmp80 = TokenHelpers.preview(tokens);
                  tmp81 = tmp79 + tmp80;
                  doTemp3 = Parser.tracer.print(tmp81, 113);
                  outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxKeywordPrec);
                  innerPrec$_ = Option.getOrElse(innerPrec, prec);
                  scrut3 = outerPrec$_ > prec;
                  if (scrut3 === true) {
                    scrut4 = parseKind(kind, prec);
                    if (scrut4 instanceof Tree.Error.class) {
                      tmp82 = Parser.tracer.print("cannot parse more", 119);
                      scrut5 = rule.endChoice;
                      if (scrut5 instanceof Option.Some.class) {
                        param05 = scrut5.value;
                        value2 = param05;
                        tmp83 = Parser.tracer.print("found end choice", 121);
                        return value2
                      } else {
                        throw new globalThis.Error("match error");
                      }
                    } else {
                      acc = scrut4;
                      tmp84 = parseRule(prec, rest, allKeywords);
                      tree1 = tmp84;
                      tmp85 = Tree.summary(acc);
                      tmp86 = "acc: " + tmp85;
                      tmp87 = Parser.tracer.print(tmp86, 125);
                      tmp88 = Tree.summary(tree1);
                      tmp89 = "parsed from rest rule: " + tmp88;
                      tmp90 = Parser.tracer.print(tmp89, 126);
                      return runtime.safeCall(process(acc, tree1))
                    }
                  } else {
                    tmp91 = "did not parse kind \"" + kind;
                    tmp92 = tmp91 + "\" because of the precedence";
                    doTemp4 = Parser.tracer.print(tmp92, 128);
                    doTemp1 = Parser.tracer.print("no reference choice", 129);
                    scrut1 = rule.endChoice;
                    if (scrut1 instanceof Option.Some.class) {
                      param03 = scrut1.value;
                      value1 = param03;
                      tmp93 = Parser.tracer.print("found end choice", 131);
                      return value1
                    } else {
                      doTemp2 = Parser.tracer.print("no end choice", 133);
                      tmp94 = consume();
                      tmp95 = "unexpected token " + other;
                      return Tree.error(tmp95)
                    }
                  }
                } else {
                  doTemp1 = Parser.tracer.print("no reference choice", 129);
                  scrut1 = rule.endChoice;
                  if (scrut1 instanceof Option.Some.class) {
                    param03 = scrut1.value;
                    value1 = param03;
                    tmp96 = Parser.tracer.print("found end choice", 131);
                    return value1
                  } else {
                    doTemp2 = Parser.tracer.print("no end choice", 133);
                    tmp97 = consume();
                    tmp98 = "unexpected token " + other;
                    return Tree.error(tmp98)
                  }
                }
              } else {
                doTemp1 = Parser.tracer.print("no reference choice", 129);
                scrut1 = rule.endChoice;
                if (scrut1 instanceof Option.Some.class) {
                  param03 = scrut1.value;
                  value1 = param03;
                  tmp99 = Parser.tracer.print("found end choice", 131);
                  return value1
                } else {
                  doTemp2 = Parser.tracer.print("no end choice", 133);
                  tmp100 = consume();
                  tmp101 = "unexpected token " + other;
                  return Tree.error(tmp101)
                }
              }
            }
          } else {
            other = param02;
            tmp102 = "the current rule is " + rule.display;
            doTemp = runtime.safeCall(Parser.tracer.print(tmp102));
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
                tmp103 = "found an reference to \"" + kind;
                tmp104 = tmp103 + "\" at ";
                tmp105 = TokenHelpers.preview(tokens);
                tmp106 = tmp104 + tmp105;
                doTemp3 = Parser.tracer.print(tmp106, 113);
                outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxKeywordPrec);
                innerPrec$_ = Option.getOrElse(innerPrec, prec);
                scrut3 = outerPrec$_ > prec;
                if (scrut3 === true) {
                  scrut4 = parseKind(kind, prec);
                  if (scrut4 instanceof Tree.Error.class) {
                    tmp107 = Parser.tracer.print("cannot parse more", 119);
                    scrut5 = rule.endChoice;
                    if (scrut5 instanceof Option.Some.class) {
                      param05 = scrut5.value;
                      value2 = param05;
                      tmp108 = Parser.tracer.print("found end choice", 121);
                      return value2
                    } else {
                      throw new globalThis.Error("match error");
                    }
                  } else {
                    acc = scrut4;
                    tmp109 = parseRule(prec, rest, allKeywords);
                    tree1 = tmp109;
                    tmp110 = Tree.summary(acc);
                    tmp111 = "acc: " + tmp110;
                    tmp112 = Parser.tracer.print(tmp111, 125);
                    tmp113 = Tree.summary(tree1);
                    tmp114 = "parsed from rest rule: " + tmp113;
                    tmp115 = Parser.tracer.print(tmp114, 126);
                    return runtime.safeCall(process(acc, tree1))
                  }
                } else {
                  tmp116 = "did not parse kind \"" + kind;
                  tmp117 = tmp116 + "\" because of the precedence";
                  doTemp4 = Parser.tracer.print(tmp117, 128);
                  doTemp1 = Parser.tracer.print("no reference choice", 129);
                  scrut1 = rule.endChoice;
                  if (scrut1 instanceof Option.Some.class) {
                    param03 = scrut1.value;
                    value1 = param03;
                    tmp118 = Parser.tracer.print("found end choice", 131);
                    return value1
                  } else {
                    doTemp2 = Parser.tracer.print("no end choice", 133);
                    tmp119 = consume();
                    tmp120 = "unexpected token " + other;
                    return Tree.error(tmp120)
                  }
                }
              } else {
                doTemp1 = Parser.tracer.print("no reference choice", 129);
                scrut1 = rule.endChoice;
                if (scrut1 instanceof Option.Some.class) {
                  param03 = scrut1.value;
                  value1 = param03;
                  tmp121 = Parser.tracer.print("found end choice", 131);
                  return value1
                } else {
                  doTemp2 = Parser.tracer.print("no end choice", 133);
                  tmp122 = consume();
                  tmp123 = "unexpected token " + other;
                  return Tree.error(tmp123)
                }
              }
            } else {
              doTemp1 = Parser.tracer.print("no reference choice", 129);
              scrut1 = rule.endChoice;
              if (scrut1 instanceof Option.Some.class) {
                param03 = scrut1.value;
                value1 = param03;
                tmp124 = Parser.tracer.print("found end choice", 131);
                return value1
              } else {
                doTemp2 = Parser.tracer.print("no end choice", 133);
                tmp125 = consume();
                tmp126 = "unexpected token " + other;
                return Tree.error(tmp126)
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
            tmp127 = Parser.tracer.print("no end choice but found the end of input", 140);
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
        let param01, param11, token1, param02, param12, kind, literal, param03, param13, name, symbolic, scrut, param04, keyword, scrut1, param05, rule, scrut2, acc, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20, tmp21;
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
                  tmp10 = "the left precedence of \"" + name;
                  tmp11 = tmp10 + "\" is less";
                  tmp12 = Parser.tracer.print(tmp11, 156);
                  return Tree.empty
                }
              } else if (scrut1 instanceof Option.None.class) {
                tmp13 = "no rule starting with " + name;
                tmp14 = Parser.tracer.print(tmp13, 159);
                return Tree.empty
              } else {
                token1 = param01;
                tmp15 = "unrecognized token: " + token1;
                return Tree.error(tmp15)
              }
            } else if (scrut instanceof Option.None.class) {
              tmp16 = consume();
              tmp17 = Tree.Ident(name, symbolic);
              return termCont(tmp17, prec)
            } else {
              token1 = param01;
              tmp18 = "unrecognized token: " + token1;
              return Tree.error(tmp18)
            }
          } else if (param01 instanceof Token.Literal.class) {
            param02 = param01.kind;
            param12 = param01.literal;
            kind = param02;
            literal = param12;
            tmp19 = consume();
            tmp20 = Tree.Literal(kind, literal);
            return termCont(tmp20, prec)
          } else {
            token1 = param01;
            tmp21 = "unrecognized token: " + token1;
            return Tree.error(tmp21)
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
      let doTemp, param01, param11, token1, scrut, param02, first4, first3, first2, first1, first0, kind, process, outerPrec, innerPrec, rest, doTemp1, outerPrec$_, doTemp2, scrut1, scrut2, rhs, param03, param12, name, scrut3, doTemp3, scrut4, first11, first01, leftPrec, rightPrec, doTemp4, scrut5, op, rhs1, name1, symbolic, scrut6, param04, keyword, doTemp5, doTemp6, scrut7, param05, rule, doTemp7, scrut8, scrut9, param06, first41, first31, first21, first12, first02, kind1, process1, outerPrec1, innerPrec1, rest1, doTemp8, outerPrec$_1, innerPrec$_, scrut10, rhs2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20, tmp21, tmp22, tmp23, tmp24, tmp25, tmp26, tmp27, tmp28, tmp29, tmp30, tmp31, tmp32, tmp33, tmp34, tmp35, tmp36, tmp37, tmp38, tmp39, tmp40, tmp41, tmp42, tmp43, tmp44, tmp45, tmp46, tmp47, tmp48, tmp49, tmp50, tmp51, tmp52, tmp53, tmp54, tmp55, tmp56, tmp57, tmp58, tmp59, tmp60, tmp61, tmp62, tmp63, tmp64, tmp65, tmp66, tmp67, tmp68, tmp69, tmp70, tmp71, tmp72, tmp73, tmp74, tmp75, tmp76, tmp77, tmp78, tmp79, tmp80, tmp81, tmp82, tmp83, tmp84, tmp85, tmp86, tmp87, tmp88, tmp89, tmp90, tmp91, tmp92, tmp93, tmp94, tmp95, tmp96, tmp97, tmp98, tmp99, tmp100, tmp101, tmp102, tmp103, tmp104, tmp105, tmp106, tmp107, tmp108, tmp109, tmp110, tmp111, tmp112, tmp113, tmp114, tmp115, tmp116, tmp117, tmp118, tmp119, tmp120, tmp121, tmp122, tmp123, tmp124, tmp125, tmp126, tmp127, tmp128, tmp129, tmp130, tmp131, tmp132, tmp133, tmp134, tmp135, tmp136, tmp137, tmp138, tmp139, tmp140, tmp141, tmp142, tmp143, tmp144, tmp145, tmp146, tmp147, tmp148, tmp149, tmp150, tmp151, tmp152, tmp153, tmp154, tmp155, tmp156, tmp157, tmp158, tmp159, tmp160, tmp161, tmp162, tmp163, tmp164, tmp165, tmp166, tmp167, tmp168, tmp169, tmp170, tmp171, tmp172, tmp173, tmp174, tmp175, tmp176, tmp177, tmp178, tmp179, tmp180, tmp181, tmp182, tmp183, tmp184, tmp185, tmp186, tmp187, tmp188, tmp189, tmp190, tmp191, tmp192, tmp193, tmp194, tmp195, tmp196, tmp197, tmp198, tmp199, tmp200, tmp201, tmp202, tmp203, tmp204, tmp205, tmp206, tmp207, tmp208, tmp209, tmp210, tmp211, tmp212, tmp213, tmp214, tmp215, tmp216, tmp217, tmp218, tmp219, tmp220, tmp221, tmp222, tmp223, tmp224, tmp225, tmp226, tmp227, tmp228, tmp229, tmp230, tmp231, tmp232, tmp233, tmp234, tmp235, tmp236, tmp237, tmp238, tmp239, tmp240, tmp241, tmp242, tmp243, tmp244, tmp245, tmp246, tmp247, tmp248, tmp249, tmp250, tmp251, tmp252, tmp253, tmp254, tmp255, tmp256, tmp257, tmp258, tmp259, tmp260, tmp261, tmp262, tmp263, tmp264, tmp265, tmp266, tmp267, tmp268, tmp269, tmp270, tmp271, tmp272, tmp273, tmp274, tmp275, tmp276, tmp277, tmp278, tmp279, tmp280, tmp281, tmp282, tmp283, tmp284, tmp285, tmp286, tmp287, tmp288, tmp289, tmp290, tmp291, tmp292, tmp293, tmp294, tmp295, tmp296, tmp297, tmp298, tmp299, tmp300, tmp301, tmp302, tmp303, tmp304, tmp305, tmp306, tmp307, tmp308, tmp309, tmp310, tmp311, tmp312, tmp313, tmp314, tmp315, tmp316, tmp317, tmp318, tmp319, tmp320, tmp321;
      tmp3 = ">>> termCont " + prec;
      tmp4 = tmp3 + " ";
      tmp5 = Tree.summary(acc);
      tmp6 = tmp4 + tmp5;
      tmp7 = tmp6 + " <<<";
      doTemp = Parser.tracer.print(tmp7, 171);
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
            doTemp5 = Parser.tracer.print(tmp8, 174);
            scrut7 = runtime.safeCall(Rules.termInfixRule.keywordChoices.get(name1));
            if (scrut7 instanceof Option.Some.class) {
              param05 = scrut7.value;
              rule = param05;
              tmp9 = "the keyword is found in infix rules" + name1;
              doTemp7 = Parser.tracer.print(tmp9, 178);
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
                    tmp10 = "found an reference to \"" + kind1;
                    tmp11 = tmp10 + "\" at ";
                    tmp12 = TokenHelpers.preview(tokens);
                    tmp13 = tmp11 + tmp12;
                    doTemp8 = Parser.tracer.print(tmp13, 181);
                    outerPrec$_1 = Option.getOrElse(outerPrec1, Precedence.Keywords.maxOperatorPrec);
                    innerPrec$_ = Option.getOrElse(innerPrec1, keyword.rightPrecOrMin);
                    scrut10 = outerPrec$_1 > prec;
                    if (scrut10 === true) {
                      tmp14 = consume();
                      tmp15 = parseKind(kind1, keyword.rightPrecOrMin);
                      rhs2 = tmp15;
                      tmp16 = runtime.safeCall(process1(rhs2, runtime.Unit));
                      tmp17 = runtime.safeCall(tmp16(acc));
                      return termCont(tmp17, prec)
                    } else {
                      tmp18 = "keyword `" + name1;
                      tmp19 = tmp18 + "` does not have infix rules";
                      doTemp6 = Parser.tracer.print(tmp19, 189);
                      name = param03;
                      if (param12 === true) {
                        scrut3 = runtime.safeCall(Precedence.Keywords.all.get(name));
                        if (scrut3 instanceof Option.None.class) {
                          tmp20 = "found an operator \"" + name;
                          tmp21 = tmp20 + "\"";
                          doTemp3 = Parser.tracer.print(tmp21, 191);
                          scrut4 = Precedence.opPrec(name);
                          if (globalThis.Array.isArray(scrut4) && scrut4.length === 2) {
                            first01 = scrut4[0];
                            first11 = scrut4[1];
                            leftPrec = first01;
                            rightPrec = first11;
                            tmp22 = "leftPrec = " + leftPrec;
                            tmp23 = tmp22 + "; rightPrec = ";
                            tmp24 = tmp23 + rightPrec;
                            doTemp4 = Parser.tracer.print(tmp24, 193);
                            scrut5 = leftPrec > prec;
                            if (scrut5 === true) {
                              tmp25 = consume();
                              tmp26 = Tree.Ident(name, true);
                              op = tmp26;
                              tmp27 = term(rightPrec);
                              rhs1 = tmp27;
                              tmp28 = Stack.Cons(rhs1, Stack.Nil);
                              tmp29 = Stack.Cons(acc, tmp28);
                              tmp30 = Tree.App(op, tmp29);
                              return termCont(tmp30, prec)
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
                                tmp31 = "found an exprChoice with outerPrec = " + outerPrec;
                                doTemp1 = Parser.tracer.print(tmp31, 203);
                                outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                                scrut1 = outerPrec$_ > prec;
                                if (scrut1 === true) {
                                  tmp32 = Option.getOrElse(innerPrec, outerPrec$_);
                                  scrut2 = parseKind(kind, tmp32);
                                  if (scrut2 instanceof Tree.Empty.class) {
                                    tmp33 = Parser.tracer.print("nothing was parsed", 208);
                                    return acc
                                  } else if (scrut2 instanceof Tree.Error.class) {
                                    tmp34 = Parser.tracer.print("cannot parse more", 211);
                                    return acc
                                  } else {
                                    rhs = scrut2;
                                    tmp35 = Tree.summary(rhs);
                                    tmp36 = "parsed " + tmp35;
                                    tmp37 = Parser.tracer.print(tmp36, 214);
                                    tmp38 = runtime.safeCall(process(rhs, runtime.Unit));
                                    tmp39 = runtime.safeCall(tmp38(acc));
                                    return termCont(tmp39, prec)
                                  }
                                } else {
                                  tmp40 = "the outer precedence is less than " + prec;
                                  doTemp2 = Parser.tracer.print(tmp40, 216);
                                  return acc
                                }
                              } else {
                                throw new globalThis.Error("match error");
                              }
                            } else if (scrut instanceof Option.None.class) {
                              tmp41 = "cannot consume " + token1;
                              tmp42 = Parser.tracer.print(tmp41, 219);
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
                              tmp43 = "found an exprChoice with outerPrec = " + outerPrec;
                              doTemp1 = Parser.tracer.print(tmp43, 203);
                              outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                              scrut1 = outerPrec$_ > prec;
                              if (scrut1 === true) {
                                tmp44 = Option.getOrElse(innerPrec, outerPrec$_);
                                scrut2 = parseKind(kind, tmp44);
                                if (scrut2 instanceof Tree.Empty.class) {
                                  tmp45 = Parser.tracer.print("nothing was parsed", 208);
                                  return acc
                                } else if (scrut2 instanceof Tree.Error.class) {
                                  tmp46 = Parser.tracer.print("cannot parse more", 211);
                                  return acc
                                } else {
                                  rhs = scrut2;
                                  tmp47 = Tree.summary(rhs);
                                  tmp48 = "parsed " + tmp47;
                                  tmp49 = Parser.tracer.print(tmp48, 214);
                                  tmp50 = runtime.safeCall(process(rhs, runtime.Unit));
                                  tmp51 = runtime.safeCall(tmp50(acc));
                                  return termCont(tmp51, prec)
                                }
                              } else {
                                tmp52 = "the outer precedence is less than " + prec;
                                doTemp2 = Parser.tracer.print(tmp52, 216);
                                return acc
                              }
                            } else {
                              throw new globalThis.Error("match error");
                            }
                          } else if (scrut instanceof Option.None.class) {
                            tmp53 = "cannot consume " + token1;
                            tmp54 = Parser.tracer.print(tmp53, 219);
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
                            tmp55 = "found an exprChoice with outerPrec = " + outerPrec;
                            doTemp1 = Parser.tracer.print(tmp55, 203);
                            outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                            scrut1 = outerPrec$_ > prec;
                            if (scrut1 === true) {
                              tmp56 = Option.getOrElse(innerPrec, outerPrec$_);
                              scrut2 = parseKind(kind, tmp56);
                              if (scrut2 instanceof Tree.Empty.class) {
                                tmp57 = Parser.tracer.print("nothing was parsed", 208);
                                return acc
                              } else if (scrut2 instanceof Tree.Error.class) {
                                tmp58 = Parser.tracer.print("cannot parse more", 211);
                                return acc
                              } else {
                                rhs = scrut2;
                                tmp59 = Tree.summary(rhs);
                                tmp60 = "parsed " + tmp59;
                                tmp61 = Parser.tracer.print(tmp60, 214);
                                tmp62 = runtime.safeCall(process(rhs, runtime.Unit));
                                tmp63 = runtime.safeCall(tmp62(acc));
                                return termCont(tmp63, prec)
                              }
                            } else {
                              tmp64 = "the outer precedence is less than " + prec;
                              doTemp2 = Parser.tracer.print(tmp64, 216);
                              return acc
                            }
                          } else {
                            throw new globalThis.Error("match error");
                          }
                        } else if (scrut instanceof Option.None.class) {
                          tmp65 = "cannot consume " + token1;
                          tmp66 = Parser.tracer.print(tmp65, 219);
                          return acc
                        } else {
                          throw new globalThis.Error("match error");
                        }
                      }
                    }
                  } else {
                    tmp67 = "keyword `" + name1;
                    tmp68 = tmp67 + "` does not have infix rules";
                    doTemp6 = Parser.tracer.print(tmp68, 189);
                    name = param03;
                    if (param12 === true) {
                      scrut3 = runtime.safeCall(Precedence.Keywords.all.get(name));
                      if (scrut3 instanceof Option.None.class) {
                        tmp69 = "found an operator \"" + name;
                        tmp70 = tmp69 + "\"";
                        doTemp3 = Parser.tracer.print(tmp70, 191);
                        scrut4 = Precedence.opPrec(name);
                        if (globalThis.Array.isArray(scrut4) && scrut4.length === 2) {
                          first01 = scrut4[0];
                          first11 = scrut4[1];
                          leftPrec = first01;
                          rightPrec = first11;
                          tmp71 = "leftPrec = " + leftPrec;
                          tmp72 = tmp71 + "; rightPrec = ";
                          tmp73 = tmp72 + rightPrec;
                          doTemp4 = Parser.tracer.print(tmp73, 193);
                          scrut5 = leftPrec > prec;
                          if (scrut5 === true) {
                            tmp74 = consume();
                            tmp75 = Tree.Ident(name, true);
                            op = tmp75;
                            tmp76 = term(rightPrec);
                            rhs1 = tmp76;
                            tmp77 = Stack.Cons(rhs1, Stack.Nil);
                            tmp78 = Stack.Cons(acc, tmp77);
                            tmp79 = Tree.App(op, tmp78);
                            return termCont(tmp79, prec)
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
                              tmp80 = "found an exprChoice with outerPrec = " + outerPrec;
                              doTemp1 = Parser.tracer.print(tmp80, 203);
                              outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                              scrut1 = outerPrec$_ > prec;
                              if (scrut1 === true) {
                                tmp81 = Option.getOrElse(innerPrec, outerPrec$_);
                                scrut2 = parseKind(kind, tmp81);
                                if (scrut2 instanceof Tree.Empty.class) {
                                  tmp82 = Parser.tracer.print("nothing was parsed", 208);
                                  return acc
                                } else if (scrut2 instanceof Tree.Error.class) {
                                  tmp83 = Parser.tracer.print("cannot parse more", 211);
                                  return acc
                                } else {
                                  rhs = scrut2;
                                  tmp84 = Tree.summary(rhs);
                                  tmp85 = "parsed " + tmp84;
                                  tmp86 = Parser.tracer.print(tmp85, 214);
                                  tmp87 = runtime.safeCall(process(rhs, runtime.Unit));
                                  tmp88 = runtime.safeCall(tmp87(acc));
                                  return termCont(tmp88, prec)
                                }
                              } else {
                                tmp89 = "the outer precedence is less than " + prec;
                                doTemp2 = Parser.tracer.print(tmp89, 216);
                                return acc
                              }
                            } else {
                              throw new globalThis.Error("match error");
                            }
                          } else if (scrut instanceof Option.None.class) {
                            tmp90 = "cannot consume " + token1;
                            tmp91 = Parser.tracer.print(tmp90, 219);
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
                            tmp92 = "found an exprChoice with outerPrec = " + outerPrec;
                            doTemp1 = Parser.tracer.print(tmp92, 203);
                            outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                            scrut1 = outerPrec$_ > prec;
                            if (scrut1 === true) {
                              tmp93 = Option.getOrElse(innerPrec, outerPrec$_);
                              scrut2 = parseKind(kind, tmp93);
                              if (scrut2 instanceof Tree.Empty.class) {
                                tmp94 = Parser.tracer.print("nothing was parsed", 208);
                                return acc
                              } else if (scrut2 instanceof Tree.Error.class) {
                                tmp95 = Parser.tracer.print("cannot parse more", 211);
                                return acc
                              } else {
                                rhs = scrut2;
                                tmp96 = Tree.summary(rhs);
                                tmp97 = "parsed " + tmp96;
                                tmp98 = Parser.tracer.print(tmp97, 214);
                                tmp99 = runtime.safeCall(process(rhs, runtime.Unit));
                                tmp100 = runtime.safeCall(tmp99(acc));
                                return termCont(tmp100, prec)
                              }
                            } else {
                              tmp101 = "the outer precedence is less than " + prec;
                              doTemp2 = Parser.tracer.print(tmp101, 216);
                              return acc
                            }
                          } else {
                            throw new globalThis.Error("match error");
                          }
                        } else if (scrut instanceof Option.None.class) {
                          tmp102 = "cannot consume " + token1;
                          tmp103 = Parser.tracer.print(tmp102, 219);
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
                          tmp104 = "found an exprChoice with outerPrec = " + outerPrec;
                          doTemp1 = Parser.tracer.print(tmp104, 203);
                          outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                          scrut1 = outerPrec$_ > prec;
                          if (scrut1 === true) {
                            tmp105 = Option.getOrElse(innerPrec, outerPrec$_);
                            scrut2 = parseKind(kind, tmp105);
                            if (scrut2 instanceof Tree.Empty.class) {
                              tmp106 = Parser.tracer.print("nothing was parsed", 208);
                              return acc
                            } else if (scrut2 instanceof Tree.Error.class) {
                              tmp107 = Parser.tracer.print("cannot parse more", 211);
                              return acc
                            } else {
                              rhs = scrut2;
                              tmp108 = Tree.summary(rhs);
                              tmp109 = "parsed " + tmp108;
                              tmp110 = Parser.tracer.print(tmp109, 214);
                              tmp111 = runtime.safeCall(process(rhs, runtime.Unit));
                              tmp112 = runtime.safeCall(tmp111(acc));
                              return termCont(tmp112, prec)
                            }
                          } else {
                            tmp113 = "the outer precedence is less than " + prec;
                            doTemp2 = Parser.tracer.print(tmp113, 216);
                            return acc
                          }
                        } else {
                          throw new globalThis.Error("match error");
                        }
                      } else if (scrut instanceof Option.None.class) {
                        tmp114 = "cannot consume " + token1;
                        tmp115 = Parser.tracer.print(tmp114, 219);
                        return acc
                      } else {
                        throw new globalThis.Error("match error");
                      }
                    }
                  }
                } else if (scrut9 instanceof Option.None.class) {
                  return acc
                } else {
                  tmp116 = "keyword `" + name1;
                  tmp117 = tmp116 + "` does not have infix rules";
                  doTemp6 = Parser.tracer.print(tmp117, 189);
                  name = param03;
                  if (param12 === true) {
                    scrut3 = runtime.safeCall(Precedence.Keywords.all.get(name));
                    if (scrut3 instanceof Option.None.class) {
                      tmp118 = "found an operator \"" + name;
                      tmp119 = tmp118 + "\"";
                      doTemp3 = Parser.tracer.print(tmp119, 191);
                      scrut4 = Precedence.opPrec(name);
                      if (globalThis.Array.isArray(scrut4) && scrut4.length === 2) {
                        first01 = scrut4[0];
                        first11 = scrut4[1];
                        leftPrec = first01;
                        rightPrec = first11;
                        tmp120 = "leftPrec = " + leftPrec;
                        tmp121 = tmp120 + "; rightPrec = ";
                        tmp122 = tmp121 + rightPrec;
                        doTemp4 = Parser.tracer.print(tmp122, 193);
                        scrut5 = leftPrec > prec;
                        if (scrut5 === true) {
                          tmp123 = consume();
                          tmp124 = Tree.Ident(name, true);
                          op = tmp124;
                          tmp125 = term(rightPrec);
                          rhs1 = tmp125;
                          tmp126 = Stack.Cons(rhs1, Stack.Nil);
                          tmp127 = Stack.Cons(acc, tmp126);
                          tmp128 = Tree.App(op, tmp127);
                          return termCont(tmp128, prec)
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
                            tmp129 = "found an exprChoice with outerPrec = " + outerPrec;
                            doTemp1 = Parser.tracer.print(tmp129, 203);
                            outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                            scrut1 = outerPrec$_ > prec;
                            if (scrut1 === true) {
                              tmp130 = Option.getOrElse(innerPrec, outerPrec$_);
                              scrut2 = parseKind(kind, tmp130);
                              if (scrut2 instanceof Tree.Empty.class) {
                                tmp131 = Parser.tracer.print("nothing was parsed", 208);
                                return acc
                              } else if (scrut2 instanceof Tree.Error.class) {
                                tmp132 = Parser.tracer.print("cannot parse more", 211);
                                return acc
                              } else {
                                rhs = scrut2;
                                tmp133 = Tree.summary(rhs);
                                tmp134 = "parsed " + tmp133;
                                tmp135 = Parser.tracer.print(tmp134, 214);
                                tmp136 = runtime.safeCall(process(rhs, runtime.Unit));
                                tmp137 = runtime.safeCall(tmp136(acc));
                                return termCont(tmp137, prec)
                              }
                            } else {
                              tmp138 = "the outer precedence is less than " + prec;
                              doTemp2 = Parser.tracer.print(tmp138, 216);
                              return acc
                            }
                          } else {
                            throw new globalThis.Error("match error");
                          }
                        } else if (scrut instanceof Option.None.class) {
                          tmp139 = "cannot consume " + token1;
                          tmp140 = Parser.tracer.print(tmp139, 219);
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
                          tmp141 = "found an exprChoice with outerPrec = " + outerPrec;
                          doTemp1 = Parser.tracer.print(tmp141, 203);
                          outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                          scrut1 = outerPrec$_ > prec;
                          if (scrut1 === true) {
                            tmp142 = Option.getOrElse(innerPrec, outerPrec$_);
                            scrut2 = parseKind(kind, tmp142);
                            if (scrut2 instanceof Tree.Empty.class) {
                              tmp143 = Parser.tracer.print("nothing was parsed", 208);
                              return acc
                            } else if (scrut2 instanceof Tree.Error.class) {
                              tmp144 = Parser.tracer.print("cannot parse more", 211);
                              return acc
                            } else {
                              rhs = scrut2;
                              tmp145 = Tree.summary(rhs);
                              tmp146 = "parsed " + tmp145;
                              tmp147 = Parser.tracer.print(tmp146, 214);
                              tmp148 = runtime.safeCall(process(rhs, runtime.Unit));
                              tmp149 = runtime.safeCall(tmp148(acc));
                              return termCont(tmp149, prec)
                            }
                          } else {
                            tmp150 = "the outer precedence is less than " + prec;
                            doTemp2 = Parser.tracer.print(tmp150, 216);
                            return acc
                          }
                        } else {
                          throw new globalThis.Error("match error");
                        }
                      } else if (scrut instanceof Option.None.class) {
                        tmp151 = "cannot consume " + token1;
                        tmp152 = Parser.tracer.print(tmp151, 219);
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
                        tmp153 = "found an exprChoice with outerPrec = " + outerPrec;
                        doTemp1 = Parser.tracer.print(tmp153, 203);
                        outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                        scrut1 = outerPrec$_ > prec;
                        if (scrut1 === true) {
                          tmp154 = Option.getOrElse(innerPrec, outerPrec$_);
                          scrut2 = parseKind(kind, tmp154);
                          if (scrut2 instanceof Tree.Empty.class) {
                            tmp155 = Parser.tracer.print("nothing was parsed", 208);
                            return acc
                          } else if (scrut2 instanceof Tree.Error.class) {
                            tmp156 = Parser.tracer.print("cannot parse more", 211);
                            return acc
                          } else {
                            rhs = scrut2;
                            tmp157 = Tree.summary(rhs);
                            tmp158 = "parsed " + tmp157;
                            tmp159 = Parser.tracer.print(tmp158, 214);
                            tmp160 = runtime.safeCall(process(rhs, runtime.Unit));
                            tmp161 = runtime.safeCall(tmp160(acc));
                            return termCont(tmp161, prec)
                          }
                        } else {
                          tmp162 = "the outer precedence is less than " + prec;
                          doTemp2 = Parser.tracer.print(tmp162, 216);
                          return acc
                        }
                      } else {
                        throw new globalThis.Error("match error");
                      }
                    } else if (scrut instanceof Option.None.class) {
                      tmp163 = "cannot consume " + token1;
                      tmp164 = Parser.tracer.print(tmp163, 219);
                      return acc
                    } else {
                      throw new globalThis.Error("match error");
                    }
                  }
                }
              } else {
                tmp165 = "keyword `" + name1;
                tmp166 = tmp165 + "` does not have infix rules";
                doTemp6 = Parser.tracer.print(tmp166, 189);
                name = param03;
                if (param12 === true) {
                  scrut3 = runtime.safeCall(Precedence.Keywords.all.get(name));
                  if (scrut3 instanceof Option.None.class) {
                    tmp167 = "found an operator \"" + name;
                    tmp168 = tmp167 + "\"";
                    doTemp3 = Parser.tracer.print(tmp168, 191);
                    scrut4 = Precedence.opPrec(name);
                    if (globalThis.Array.isArray(scrut4) && scrut4.length === 2) {
                      first01 = scrut4[0];
                      first11 = scrut4[1];
                      leftPrec = first01;
                      rightPrec = first11;
                      tmp169 = "leftPrec = " + leftPrec;
                      tmp170 = tmp169 + "; rightPrec = ";
                      tmp171 = tmp170 + rightPrec;
                      doTemp4 = Parser.tracer.print(tmp171, 193);
                      scrut5 = leftPrec > prec;
                      if (scrut5 === true) {
                        tmp172 = consume();
                        tmp173 = Tree.Ident(name, true);
                        op = tmp173;
                        tmp174 = term(rightPrec);
                        rhs1 = tmp174;
                        tmp175 = Stack.Cons(rhs1, Stack.Nil);
                        tmp176 = Stack.Cons(acc, tmp175);
                        tmp177 = Tree.App(op, tmp176);
                        return termCont(tmp177, prec)
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
                          tmp178 = "found an exprChoice with outerPrec = " + outerPrec;
                          doTemp1 = Parser.tracer.print(tmp178, 203);
                          outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                          scrut1 = outerPrec$_ > prec;
                          if (scrut1 === true) {
                            tmp179 = Option.getOrElse(innerPrec, outerPrec$_);
                            scrut2 = parseKind(kind, tmp179);
                            if (scrut2 instanceof Tree.Empty.class) {
                              tmp180 = Parser.tracer.print("nothing was parsed", 208);
                              return acc
                            } else if (scrut2 instanceof Tree.Error.class) {
                              tmp181 = Parser.tracer.print("cannot parse more", 211);
                              return acc
                            } else {
                              rhs = scrut2;
                              tmp182 = Tree.summary(rhs);
                              tmp183 = "parsed " + tmp182;
                              tmp184 = Parser.tracer.print(tmp183, 214);
                              tmp185 = runtime.safeCall(process(rhs, runtime.Unit));
                              tmp186 = runtime.safeCall(tmp185(acc));
                              return termCont(tmp186, prec)
                            }
                          } else {
                            tmp187 = "the outer precedence is less than " + prec;
                            doTemp2 = Parser.tracer.print(tmp187, 216);
                            return acc
                          }
                        } else {
                          throw new globalThis.Error("match error");
                        }
                      } else if (scrut instanceof Option.None.class) {
                        tmp188 = "cannot consume " + token1;
                        tmp189 = Parser.tracer.print(tmp188, 219);
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
                        tmp190 = "found an exprChoice with outerPrec = " + outerPrec;
                        doTemp1 = Parser.tracer.print(tmp190, 203);
                        outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                        scrut1 = outerPrec$_ > prec;
                        if (scrut1 === true) {
                          tmp191 = Option.getOrElse(innerPrec, outerPrec$_);
                          scrut2 = parseKind(kind, tmp191);
                          if (scrut2 instanceof Tree.Empty.class) {
                            tmp192 = Parser.tracer.print("nothing was parsed", 208);
                            return acc
                          } else if (scrut2 instanceof Tree.Error.class) {
                            tmp193 = Parser.tracer.print("cannot parse more", 211);
                            return acc
                          } else {
                            rhs = scrut2;
                            tmp194 = Tree.summary(rhs);
                            tmp195 = "parsed " + tmp194;
                            tmp196 = Parser.tracer.print(tmp195, 214);
                            tmp197 = runtime.safeCall(process(rhs, runtime.Unit));
                            tmp198 = runtime.safeCall(tmp197(acc));
                            return termCont(tmp198, prec)
                          }
                        } else {
                          tmp199 = "the outer precedence is less than " + prec;
                          doTemp2 = Parser.tracer.print(tmp199, 216);
                          return acc
                        }
                      } else {
                        throw new globalThis.Error("match error");
                      }
                    } else if (scrut instanceof Option.None.class) {
                      tmp200 = "cannot consume " + token1;
                      tmp201 = Parser.tracer.print(tmp200, 219);
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
                      tmp202 = "found an exprChoice with outerPrec = " + outerPrec;
                      doTemp1 = Parser.tracer.print(tmp202, 203);
                      outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                      scrut1 = outerPrec$_ > prec;
                      if (scrut1 === true) {
                        tmp203 = Option.getOrElse(innerPrec, outerPrec$_);
                        scrut2 = parseKind(kind, tmp203);
                        if (scrut2 instanceof Tree.Empty.class) {
                          tmp204 = Parser.tracer.print("nothing was parsed", 208);
                          return acc
                        } else if (scrut2 instanceof Tree.Error.class) {
                          tmp205 = Parser.tracer.print("cannot parse more", 211);
                          return acc
                        } else {
                          rhs = scrut2;
                          tmp206 = Tree.summary(rhs);
                          tmp207 = "parsed " + tmp206;
                          tmp208 = Parser.tracer.print(tmp207, 214);
                          tmp209 = runtime.safeCall(process(rhs, runtime.Unit));
                          tmp210 = runtime.safeCall(tmp209(acc));
                          return termCont(tmp210, prec)
                        }
                      } else {
                        tmp211 = "the outer precedence is less than " + prec;
                        doTemp2 = Parser.tracer.print(tmp211, 216);
                        return acc
                      }
                    } else {
                      throw new globalThis.Error("match error");
                    }
                  } else if (scrut instanceof Option.None.class) {
                    tmp212 = "cannot consume " + token1;
                    tmp213 = Parser.tracer.print(tmp212, 219);
                    return acc
                  } else {
                    throw new globalThis.Error("match error");
                  }
                }
              }
            } else {
              tmp214 = "keyword `" + name1;
              tmp215 = tmp214 + "` does not have infix rules";
              doTemp6 = Parser.tracer.print(tmp215, 189);
              name = param03;
              if (param12 === true) {
                scrut3 = runtime.safeCall(Precedence.Keywords.all.get(name));
                if (scrut3 instanceof Option.None.class) {
                  tmp216 = "found an operator \"" + name;
                  tmp217 = tmp216 + "\"";
                  doTemp3 = Parser.tracer.print(tmp217, 191);
                  scrut4 = Precedence.opPrec(name);
                  if (globalThis.Array.isArray(scrut4) && scrut4.length === 2) {
                    first01 = scrut4[0];
                    first11 = scrut4[1];
                    leftPrec = first01;
                    rightPrec = first11;
                    tmp218 = "leftPrec = " + leftPrec;
                    tmp219 = tmp218 + "; rightPrec = ";
                    tmp220 = tmp219 + rightPrec;
                    doTemp4 = Parser.tracer.print(tmp220, 193);
                    scrut5 = leftPrec > prec;
                    if (scrut5 === true) {
                      tmp221 = consume();
                      tmp222 = Tree.Ident(name, true);
                      op = tmp222;
                      tmp223 = term(rightPrec);
                      rhs1 = tmp223;
                      tmp224 = Stack.Cons(rhs1, Stack.Nil);
                      tmp225 = Stack.Cons(acc, tmp224);
                      tmp226 = Tree.App(op, tmp225);
                      return termCont(tmp226, prec)
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
                        tmp227 = "found an exprChoice with outerPrec = " + outerPrec;
                        doTemp1 = Parser.tracer.print(tmp227, 203);
                        outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                        scrut1 = outerPrec$_ > prec;
                        if (scrut1 === true) {
                          tmp228 = Option.getOrElse(innerPrec, outerPrec$_);
                          scrut2 = parseKind(kind, tmp228);
                          if (scrut2 instanceof Tree.Empty.class) {
                            tmp229 = Parser.tracer.print("nothing was parsed", 208);
                            return acc
                          } else if (scrut2 instanceof Tree.Error.class) {
                            tmp230 = Parser.tracer.print("cannot parse more", 211);
                            return acc
                          } else {
                            rhs = scrut2;
                            tmp231 = Tree.summary(rhs);
                            tmp232 = "parsed " + tmp231;
                            tmp233 = Parser.tracer.print(tmp232, 214);
                            tmp234 = runtime.safeCall(process(rhs, runtime.Unit));
                            tmp235 = runtime.safeCall(tmp234(acc));
                            return termCont(tmp235, prec)
                          }
                        } else {
                          tmp236 = "the outer precedence is less than " + prec;
                          doTemp2 = Parser.tracer.print(tmp236, 216);
                          return acc
                        }
                      } else {
                        throw new globalThis.Error("match error");
                      }
                    } else if (scrut instanceof Option.None.class) {
                      tmp237 = "cannot consume " + token1;
                      tmp238 = Parser.tracer.print(tmp237, 219);
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
                      tmp239 = "found an exprChoice with outerPrec = " + outerPrec;
                      doTemp1 = Parser.tracer.print(tmp239, 203);
                      outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                      scrut1 = outerPrec$_ > prec;
                      if (scrut1 === true) {
                        tmp240 = Option.getOrElse(innerPrec, outerPrec$_);
                        scrut2 = parseKind(kind, tmp240);
                        if (scrut2 instanceof Tree.Empty.class) {
                          tmp241 = Parser.tracer.print("nothing was parsed", 208);
                          return acc
                        } else if (scrut2 instanceof Tree.Error.class) {
                          tmp242 = Parser.tracer.print("cannot parse more", 211);
                          return acc
                        } else {
                          rhs = scrut2;
                          tmp243 = Tree.summary(rhs);
                          tmp244 = "parsed " + tmp243;
                          tmp245 = Parser.tracer.print(tmp244, 214);
                          tmp246 = runtime.safeCall(process(rhs, runtime.Unit));
                          tmp247 = runtime.safeCall(tmp246(acc));
                          return termCont(tmp247, prec)
                        }
                      } else {
                        tmp248 = "the outer precedence is less than " + prec;
                        doTemp2 = Parser.tracer.print(tmp248, 216);
                        return acc
                      }
                    } else {
                      throw new globalThis.Error("match error");
                    }
                  } else if (scrut instanceof Option.None.class) {
                    tmp249 = "cannot consume " + token1;
                    tmp250 = Parser.tracer.print(tmp249, 219);
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
                    tmp251 = "found an exprChoice with outerPrec = " + outerPrec;
                    doTemp1 = Parser.tracer.print(tmp251, 203);
                    outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                    scrut1 = outerPrec$_ > prec;
                    if (scrut1 === true) {
                      tmp252 = Option.getOrElse(innerPrec, outerPrec$_);
                      scrut2 = parseKind(kind, tmp252);
                      if (scrut2 instanceof Tree.Empty.class) {
                        tmp253 = Parser.tracer.print("nothing was parsed", 208);
                        return acc
                      } else if (scrut2 instanceof Tree.Error.class) {
                        tmp254 = Parser.tracer.print("cannot parse more", 211);
                        return acc
                      } else {
                        rhs = scrut2;
                        tmp255 = Tree.summary(rhs);
                        tmp256 = "parsed " + tmp255;
                        tmp257 = Parser.tracer.print(tmp256, 214);
                        tmp258 = runtime.safeCall(process(rhs, runtime.Unit));
                        tmp259 = runtime.safeCall(tmp258(acc));
                        return termCont(tmp259, prec)
                      }
                    } else {
                      tmp260 = "the outer precedence is less than " + prec;
                      doTemp2 = Parser.tracer.print(tmp260, 216);
                      return acc
                    }
                  } else {
                    throw new globalThis.Error("match error");
                  }
                } else if (scrut instanceof Option.None.class) {
                  tmp261 = "cannot consume " + token1;
                  tmp262 = Parser.tracer.print(tmp261, 219);
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
                tmp263 = "found an operator \"" + name;
                tmp264 = tmp263 + "\"";
                doTemp3 = Parser.tracer.print(tmp264, 191);
                scrut4 = Precedence.opPrec(name);
                if (globalThis.Array.isArray(scrut4) && scrut4.length === 2) {
                  first01 = scrut4[0];
                  first11 = scrut4[1];
                  leftPrec = first01;
                  rightPrec = first11;
                  tmp265 = "leftPrec = " + leftPrec;
                  tmp266 = tmp265 + "; rightPrec = ";
                  tmp267 = tmp266 + rightPrec;
                  doTemp4 = Parser.tracer.print(tmp267, 193);
                  scrut5 = leftPrec > prec;
                  if (scrut5 === true) {
                    tmp268 = consume();
                    tmp269 = Tree.Ident(name, true);
                    op = tmp269;
                    tmp270 = term(rightPrec);
                    rhs1 = tmp270;
                    tmp271 = Stack.Cons(rhs1, Stack.Nil);
                    tmp272 = Stack.Cons(acc, tmp271);
                    tmp273 = Tree.App(op, tmp272);
                    return termCont(tmp273, prec)
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
                      tmp274 = "found an exprChoice with outerPrec = " + outerPrec;
                      doTemp1 = Parser.tracer.print(tmp274, 203);
                      outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                      scrut1 = outerPrec$_ > prec;
                      if (scrut1 === true) {
                        tmp275 = Option.getOrElse(innerPrec, outerPrec$_);
                        scrut2 = parseKind(kind, tmp275);
                        if (scrut2 instanceof Tree.Empty.class) {
                          tmp276 = Parser.tracer.print("nothing was parsed", 208);
                          return acc
                        } else if (scrut2 instanceof Tree.Error.class) {
                          tmp277 = Parser.tracer.print("cannot parse more", 211);
                          return acc
                        } else {
                          rhs = scrut2;
                          tmp278 = Tree.summary(rhs);
                          tmp279 = "parsed " + tmp278;
                          tmp280 = Parser.tracer.print(tmp279, 214);
                          tmp281 = runtime.safeCall(process(rhs, runtime.Unit));
                          tmp282 = runtime.safeCall(tmp281(acc));
                          return termCont(tmp282, prec)
                        }
                      } else {
                        tmp283 = "the outer precedence is less than " + prec;
                        doTemp2 = Parser.tracer.print(tmp283, 216);
                        return acc
                      }
                    } else {
                      throw new globalThis.Error("match error");
                    }
                  } else if (scrut instanceof Option.None.class) {
                    tmp284 = "cannot consume " + token1;
                    tmp285 = Parser.tracer.print(tmp284, 219);
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
                    tmp286 = "found an exprChoice with outerPrec = " + outerPrec;
                    doTemp1 = Parser.tracer.print(tmp286, 203);
                    outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                    scrut1 = outerPrec$_ > prec;
                    if (scrut1 === true) {
                      tmp287 = Option.getOrElse(innerPrec, outerPrec$_);
                      scrut2 = parseKind(kind, tmp287);
                      if (scrut2 instanceof Tree.Empty.class) {
                        tmp288 = Parser.tracer.print("nothing was parsed", 208);
                        return acc
                      } else if (scrut2 instanceof Tree.Error.class) {
                        tmp289 = Parser.tracer.print("cannot parse more", 211);
                        return acc
                      } else {
                        rhs = scrut2;
                        tmp290 = Tree.summary(rhs);
                        tmp291 = "parsed " + tmp290;
                        tmp292 = Parser.tracer.print(tmp291, 214);
                        tmp293 = runtime.safeCall(process(rhs, runtime.Unit));
                        tmp294 = runtime.safeCall(tmp293(acc));
                        return termCont(tmp294, prec)
                      }
                    } else {
                      tmp295 = "the outer precedence is less than " + prec;
                      doTemp2 = Parser.tracer.print(tmp295, 216);
                      return acc
                    }
                  } else {
                    throw new globalThis.Error("match error");
                  }
                } else if (scrut instanceof Option.None.class) {
                  tmp296 = "cannot consume " + token1;
                  tmp297 = Parser.tracer.print(tmp296, 219);
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
                  tmp298 = "found an exprChoice with outerPrec = " + outerPrec;
                  doTemp1 = Parser.tracer.print(tmp298, 203);
                  outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                  scrut1 = outerPrec$_ > prec;
                  if (scrut1 === true) {
                    tmp299 = Option.getOrElse(innerPrec, outerPrec$_);
                    scrut2 = parseKind(kind, tmp299);
                    if (scrut2 instanceof Tree.Empty.class) {
                      tmp300 = Parser.tracer.print("nothing was parsed", 208);
                      return acc
                    } else if (scrut2 instanceof Tree.Error.class) {
                      tmp301 = Parser.tracer.print("cannot parse more", 211);
                      return acc
                    } else {
                      rhs = scrut2;
                      tmp302 = Tree.summary(rhs);
                      tmp303 = "parsed " + tmp302;
                      tmp304 = Parser.tracer.print(tmp303, 214);
                      tmp305 = runtime.safeCall(process(rhs, runtime.Unit));
                      tmp306 = runtime.safeCall(tmp305(acc));
                      return termCont(tmp306, prec)
                    }
                  } else {
                    tmp307 = "the outer precedence is less than " + prec;
                    doTemp2 = Parser.tracer.print(tmp307, 216);
                    return acc
                  }
                } else {
                  throw new globalThis.Error("match error");
                }
              } else if (scrut instanceof Option.None.class) {
                tmp308 = "cannot consume " + token1;
                tmp309 = Parser.tracer.print(tmp308, 219);
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
              tmp310 = "found an exprChoice with outerPrec = " + outerPrec;
              doTemp1 = Parser.tracer.print(tmp310, 203);
              outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
              scrut1 = outerPrec$_ > prec;
              if (scrut1 === true) {
                tmp311 = Option.getOrElse(innerPrec, outerPrec$_);
                scrut2 = parseKind(kind, tmp311);
                if (scrut2 instanceof Tree.Empty.class) {
                  tmp312 = Parser.tracer.print("nothing was parsed", 208);
                  return acc
                } else if (scrut2 instanceof Tree.Error.class) {
                  tmp313 = Parser.tracer.print("cannot parse more", 211);
                  return acc
                } else {
                  rhs = scrut2;
                  tmp314 = Tree.summary(rhs);
                  tmp315 = "parsed " + tmp314;
                  tmp316 = Parser.tracer.print(tmp315, 214);
                  tmp317 = runtime.safeCall(process(rhs, runtime.Unit));
                  tmp318 = runtime.safeCall(tmp317(acc));
                  return termCont(tmp318, prec)
                }
              } else {
                tmp319 = "the outer precedence is less than " + prec;
                doTemp2 = Parser.tracer.print(tmp319, 216);
                return acc
              }
            } else {
              throw new globalThis.Error("match error");
            }
          } else if (scrut instanceof Option.None.class) {
            tmp320 = "cannot consume " + token1;
            tmp321 = Parser.tracer.print(tmp320, 219);
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
            scrut = runtime.safeCall(Precedence.Keywords.all.get(name));
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
                  tmp9 = parseRule(keyword.rightPrecOrMax, rule, Precedence.Keywords.all);
                  acc = tmp9;
                  return typeExprCont(acc, prec)
                } else {
                  tmp10 = "the left precedence is less" + name;
                  tmp11 = Parser.tracer.print(tmp10, 236);
                  return Tree.empty
                }
              } else if (scrut1 instanceof Option.None.class) {
                tmp12 = "no rule starting with " + name;
                tmp13 = Parser.tracer.print(tmp12, 239);
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
                tmp17 = Tree.Ident(name, symbolic);
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
      let doTemp, doTemp1, param01, param11, token1, scrut, param02, first4, first3, first2, first1, first0, kind, process, outerPrec, innerPrec, rest, doTemp2, outerPrec$_, doTemp3, scrut1, scrut2, rhs, param03, param12, name, scrut3, param04, keyword, scrut4, param05, rule, doTemp4, doTemp5, scrut5, scrut6, param06, first41, first31, first21, first11, first01, kind1, process1, outerPrec1, innerPrec1, rest1, doTemp6, outerPrec$_1, innerPrec$_, scrut7, rhs1, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20, tmp21, tmp22, tmp23, tmp24, tmp25, tmp26, tmp27, tmp28, tmp29, tmp30, tmp31, tmp32, tmp33, tmp34, tmp35, tmp36, tmp37, tmp38, tmp39, tmp40, tmp41, tmp42, tmp43, tmp44, tmp45, tmp46, tmp47, tmp48, tmp49, tmp50, tmp51, tmp52, tmp53, tmp54, tmp55, tmp56, tmp57, tmp58, tmp59, tmp60, tmp61, tmp62, tmp63, tmp64, tmp65, tmp66, tmp67, tmp68, tmp69, tmp70, tmp71, tmp72, tmp73, tmp74, tmp75, tmp76, tmp77, tmp78, tmp79, tmp80, tmp81, tmp82, tmp83, tmp84, tmp85, tmp86, tmp87, tmp88, tmp89, tmp90, tmp91, tmp92, tmp93, tmp94, tmp95, tmp96, tmp97, tmp98;
      tmp3 = ">>> typeExprCont " + prec;
      tmp4 = tmp3 + " ";
      tmp5 = Tree.summary(acc);
      tmp6 = tmp4 + tmp5;
      tmp7 = tmp6 + " <<<";
      tmp8 = Parser.tracer.print(tmp7, 251);
      tmp9 = TokenHelpers.preview(tokens);
      tmp10 = "check keyword " + tmp9;
      doTemp = Parser.tracer.print(tmp10, 253);
      if (tokens instanceof Stack.Cons.class) {
        param01 = tokens.head;
        param11 = tokens.tail;
        if (param01 instanceof Token.Identifier.class) {
          param03 = param01.name;
          param12 = param01.symbolic;
          name = param03;
          scrut3 = runtime.safeCall(Precedence.Keywords.all.get(name));
          if (scrut3 instanceof Option.Some.class) {
            param04 = scrut3.value;
            keyword = param04;
            scrut4 = runtime.safeCall(Rules.typeInfixRule.keywordChoices.get(name));
            if (scrut4 instanceof Option.Some.class) {
              param05 = scrut4.value;
              rule = param05;
              tmp11 = "keyword `" + name;
              tmp12 = tmp11 + "` is found in infix rules";
              doTemp4 = Parser.tracer.print(tmp12, 256);
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
                    tmp13 = "found an reference to \"" + kind1;
                    tmp14 = tmp13 + "\" at ";
                    tmp15 = TokenHelpers.preview(tokens);
                    tmp16 = tmp14 + tmp15;
                    doTemp6 = Parser.tracer.print(tmp16, 259);
                    outerPrec$_1 = Option.getOrElse(outerPrec1, Precedence.Keywords.maxOperatorPrec);
                    innerPrec$_ = Option.getOrElse(innerPrec1, keyword.rightPrecOrMin);
                    scrut7 = outerPrec$_1 > prec;
                    if (scrut7 === true) {
                      tmp17 = consume();
                      tmp18 = parseKind(kind1, keyword.rightPrecOrMin);
                      rhs1 = tmp18;
                      tmp19 = runtime.safeCall(process1(rhs1));
                      tmp20 = runtime.safeCall(tmp19(acc));
                      return typeExprCont(tmp20, prec)
                    } else {
                      tmp21 = "keyword `" + name;
                      tmp22 = tmp21 + "` does not have infix rules";
                      doTemp5 = Parser.tracer.print(tmp22, 267);
                      doTemp1 = Parser.tracer.print("not a keyword", 269);
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
                          tmp23 = "found an exprChoice with outerPrec = " + outerPrec;
                          doTemp2 = Parser.tracer.print(tmp23, 272);
                          outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                          scrut1 = outerPrec$_ > prec;
                          if (scrut1 === true) {
                            tmp24 = Option.getOrElse(innerPrec, outerPrec$_);
                            scrut2 = parseKind(kind, tmp24);
                            if (scrut2 instanceof Tree.Empty.class) {
                              tmp25 = Parser.tracer.print("nothing was parsed", 277);
                              return acc
                            } else if (scrut2 instanceof Tree.Error.class) {
                              tmp26 = Parser.tracer.print("cannot parse more", 280);
                              return acc
                            } else {
                              rhs = scrut2;
                              tmp27 = Tree.summary(rhs);
                              tmp28 = "parsed " + tmp27;
                              tmp29 = Parser.tracer.print(tmp28, 283);
                              tmp30 = runtime.safeCall(process(rhs));
                              tmp31 = runtime.safeCall(tmp30(acc));
                              return typeExprCont(tmp31, prec)
                            }
                          } else {
                            tmp32 = "the outer precedence is less than " + prec;
                            doTemp3 = Parser.tracer.print(tmp32, 285);
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
                    tmp33 = "keyword `" + name;
                    tmp34 = tmp33 + "` does not have infix rules";
                    doTemp5 = Parser.tracer.print(tmp34, 267);
                    doTemp1 = Parser.tracer.print("not a keyword", 269);
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
                        tmp35 = "found an exprChoice with outerPrec = " + outerPrec;
                        doTemp2 = Parser.tracer.print(tmp35, 272);
                        outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                        scrut1 = outerPrec$_ > prec;
                        if (scrut1 === true) {
                          tmp36 = Option.getOrElse(innerPrec, outerPrec$_);
                          scrut2 = parseKind(kind, tmp36);
                          if (scrut2 instanceof Tree.Empty.class) {
                            tmp37 = Parser.tracer.print("nothing was parsed", 277);
                            return acc
                          } else if (scrut2 instanceof Tree.Error.class) {
                            tmp38 = Parser.tracer.print("cannot parse more", 280);
                            return acc
                          } else {
                            rhs = scrut2;
                            tmp39 = Tree.summary(rhs);
                            tmp40 = "parsed " + tmp39;
                            tmp41 = Parser.tracer.print(tmp40, 283);
                            tmp42 = runtime.safeCall(process(rhs));
                            tmp43 = runtime.safeCall(tmp42(acc));
                            return typeExprCont(tmp43, prec)
                          }
                        } else {
                          tmp44 = "the outer precedence is less than " + prec;
                          doTemp3 = Parser.tracer.print(tmp44, 285);
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
                  tmp45 = "keyword `" + name;
                  tmp46 = tmp45 + "` does not have infix rules";
                  doTemp5 = Parser.tracer.print(tmp46, 267);
                  doTemp1 = Parser.tracer.print("not a keyword", 269);
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
                      tmp47 = "found an exprChoice with outerPrec = " + outerPrec;
                      doTemp2 = Parser.tracer.print(tmp47, 272);
                      outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                      scrut1 = outerPrec$_ > prec;
                      if (scrut1 === true) {
                        tmp48 = Option.getOrElse(innerPrec, outerPrec$_);
                        scrut2 = parseKind(kind, tmp48);
                        if (scrut2 instanceof Tree.Empty.class) {
                          tmp49 = Parser.tracer.print("nothing was parsed", 277);
                          return acc
                        } else if (scrut2 instanceof Tree.Error.class) {
                          tmp50 = Parser.tracer.print("cannot parse more", 280);
                          return acc
                        } else {
                          rhs = scrut2;
                          tmp51 = Tree.summary(rhs);
                          tmp52 = "parsed " + tmp51;
                          tmp53 = Parser.tracer.print(tmp52, 283);
                          tmp54 = runtime.safeCall(process(rhs));
                          tmp55 = runtime.safeCall(tmp54(acc));
                          return typeExprCont(tmp55, prec)
                        }
                      } else {
                        tmp56 = "the outer precedence is less than " + prec;
                        doTemp3 = Parser.tracer.print(tmp56, 285);
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
                tmp57 = "keyword `" + name;
                tmp58 = tmp57 + "` does not have infix rules";
                doTemp5 = Parser.tracer.print(tmp58, 267);
                doTemp1 = Parser.tracer.print("not a keyword", 269);
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
                    tmp59 = "found an exprChoice with outerPrec = " + outerPrec;
                    doTemp2 = Parser.tracer.print(tmp59, 272);
                    outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                    scrut1 = outerPrec$_ > prec;
                    if (scrut1 === true) {
                      tmp60 = Option.getOrElse(innerPrec, outerPrec$_);
                      scrut2 = parseKind(kind, tmp60);
                      if (scrut2 instanceof Tree.Empty.class) {
                        tmp61 = Parser.tracer.print("nothing was parsed", 277);
                        return acc
                      } else if (scrut2 instanceof Tree.Error.class) {
                        tmp62 = Parser.tracer.print("cannot parse more", 280);
                        return acc
                      } else {
                        rhs = scrut2;
                        tmp63 = Tree.summary(rhs);
                        tmp64 = "parsed " + tmp63;
                        tmp65 = Parser.tracer.print(tmp64, 283);
                        tmp66 = runtime.safeCall(process(rhs));
                        tmp67 = runtime.safeCall(tmp66(acc));
                        return typeExprCont(tmp67, prec)
                      }
                    } else {
                      tmp68 = "the outer precedence is less than " + prec;
                      doTemp3 = Parser.tracer.print(tmp68, 285);
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
              doTemp1 = Parser.tracer.print("not a keyword", 269);
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
                  tmp69 = "found an exprChoice with outerPrec = " + outerPrec;
                  doTemp2 = Parser.tracer.print(tmp69, 272);
                  outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                  scrut1 = outerPrec$_ > prec;
                  if (scrut1 === true) {
                    tmp70 = Option.getOrElse(innerPrec, outerPrec$_);
                    scrut2 = parseKind(kind, tmp70);
                    if (scrut2 instanceof Tree.Empty.class) {
                      tmp71 = Parser.tracer.print("nothing was parsed", 277);
                      return acc
                    } else if (scrut2 instanceof Tree.Error.class) {
                      tmp72 = Parser.tracer.print("cannot parse more", 280);
                      return acc
                    } else {
                      rhs = scrut2;
                      tmp73 = Tree.summary(rhs);
                      tmp74 = "parsed " + tmp73;
                      tmp75 = Parser.tracer.print(tmp74, 283);
                      tmp76 = runtime.safeCall(process(rhs));
                      tmp77 = runtime.safeCall(tmp76(acc));
                      return typeExprCont(tmp77, prec)
                    }
                  } else {
                    tmp78 = "the outer precedence is less than " + prec;
                    doTemp3 = Parser.tracer.print(tmp78, 285);
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
            doTemp1 = Parser.tracer.print("not a keyword", 269);
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
                tmp79 = "found an exprChoice with outerPrec = " + outerPrec;
                doTemp2 = Parser.tracer.print(tmp79, 272);
                outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                scrut1 = outerPrec$_ > prec;
                if (scrut1 === true) {
                  tmp80 = Option.getOrElse(innerPrec, outerPrec$_);
                  scrut2 = parseKind(kind, tmp80);
                  if (scrut2 instanceof Tree.Empty.class) {
                    tmp81 = Parser.tracer.print("nothing was parsed", 277);
                    return acc
                  } else if (scrut2 instanceof Tree.Error.class) {
                    tmp82 = Parser.tracer.print("cannot parse more", 280);
                    return acc
                  } else {
                    rhs = scrut2;
                    tmp83 = Tree.summary(rhs);
                    tmp84 = "parsed " + tmp83;
                    tmp85 = Parser.tracer.print(tmp84, 283);
                    tmp86 = runtime.safeCall(process(rhs));
                    tmp87 = runtime.safeCall(tmp86(acc));
                    return typeExprCont(tmp87, prec)
                  }
                } else {
                  tmp88 = "the outer precedence is less than " + prec;
                  doTemp3 = Parser.tracer.print(tmp88, 285);
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
          doTemp1 = Parser.tracer.print("not a keyword", 269);
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
              tmp89 = "found an exprChoice with outerPrec = " + outerPrec;
              doTemp2 = Parser.tracer.print(tmp89, 272);
              outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
              scrut1 = outerPrec$_ > prec;
              if (scrut1 === true) {
                tmp90 = Option.getOrElse(innerPrec, outerPrec$_);
                scrut2 = parseKind(kind, tmp90);
                if (scrut2 instanceof Tree.Empty.class) {
                  tmp91 = Parser.tracer.print("nothing was parsed", 277);
                  return acc
                } else if (scrut2 instanceof Tree.Error.class) {
                  tmp92 = Parser.tracer.print("cannot parse more", 280);
                  return acc
                } else {
                  rhs = scrut2;
                  tmp93 = Tree.summary(rhs);
                  tmp94 = "parsed " + tmp93;
                  tmp95 = Parser.tracer.print(tmp94, 283);
                  tmp96 = runtime.safeCall(process(rhs));
                  tmp97 = runtime.safeCall(tmp96(acc));
                  return typeExprCont(tmp97, prec)
                }
              } else {
                tmp98 = "the outer precedence is less than " + prec;
                doTemp3 = Parser.tracer.print(tmp98, 285);
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
        doTemp1 = Parser.tracer.print("not a keyword", 269);
        if (tokens instanceof Stack.Nil.class) {
          return acc
        } else {
          throw new globalThis.Error("match error");
        }
      }
    };
    handleDirective = function handleDirective(tree1, acc) {
      let tree2, tree3, param01, param11, param02, param12, first1, first0, name, body, param03, param13, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12;
      if (tree1 instanceof Tree.Define.class) {
        param01 = tree1.kind;
        param11 = tree1.items;
        if (param01 instanceof Tree.DefineKind.Directive.class) {
          if (param11 instanceof Stack.Cons.class) {
            param02 = param11.head;
            param12 = param11.tail;
            if (globalThis.Array.isArray(param02) && param02.length === 2) {
              first0 = param02[0];
              first1 = param02[1];
              name = first0;
              body = first1;
              if (param12 instanceof Stack.Nil.class) {
                tree3 = tree1;
                if (name instanceof Tree.Ident.class) {
                  param03 = name.name;
                  param13 = name.symbolic;
                  if (param03 === "newKeyword") {
                    tmp3 = Extension.extendKeyword(body);
                    return modCont(acc)
                  } else if (param03 === "newCategory") {
                    tmp4 = Extension.newCategory(body);
                    return modCont(acc)
                  } else if (param03 === "extendCategory") {
                    tmp5 = Extension.extendCategory(body);
                    return modCont(acc)
                  } else {
                    tmp6 = Stack.Cons(tree3, acc);
                    return modCont(tmp6)
                  }
                } else {
                  tmp7 = Stack.Cons(tree3, acc);
                  return modCont(tmp7)
                }
              } else {
                tree2 = tree1;
                tmp8 = Stack.Cons(tree2, acc);
                return modCont(tmp8)
              }
            } else {
              tree2 = tree1;
              tmp9 = Stack.Cons(tree2, acc);
              return modCont(tmp9)
            }
          } else {
            tree2 = tree1;
            tmp10 = Stack.Cons(tree2, acc);
            return modCont(tmp10)
          }
        } else {
          tree2 = tree1;
          tmp11 = Stack.Cons(tree2, acc);
          return modCont(tmp11)
        }
      } else {
        tree2 = tree1;
        tmp12 = Stack.Cons(tree2, acc);
        return modCont(tmp12)
      }
    };
    mod = function mod(acc) {
      let doTemp, param01, param11, param02, param12, name, scrut, param03, keyword, scrut1, param04, rule, scrut2, param05, rule1, tree1, param06, param13, bindings, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17;
      doTemp = Parser.tracer.print(">>>>>> mod <<<<<<", 307);
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
                tree1 = tmp4;
                if (tree1 instanceof Tree.LetIn.class) {
                  param06 = tree1.bindings;
                  param13 = tree1.body;
                  bindings = param06;
                  if (param13 instanceof Tree.Empty.class) {
                    tmp5 = Tree.DefineKind.Let(false);
                    tmp6 = Tree.Define(tmp5, bindings);
                    tmp7 = Stack.Cons(tmp6, acc);
                    return modCont(tmp7)
                  } else {
                    tmp8 = Stack.Cons(tree1, acc);
                    return modCont(tmp8)
                  }
                } else {
                  tmp9 = Stack.Cons(tree1, acc);
                  return modCont(tmp9)
                }
              } else {
                scrut1 = runtime.safeCall(Rules.declRule.keywordChoices.get(name));
                if (scrut1 instanceof Option.Some.class) {
                  param04 = scrut1.value;
                  rule = param04;
                  tmp10 = consume();
                  tmp11 = parseRule(0, rule, Precedence.Keywords.all);
                  return handleDirective(tmp11, acc)
                } else {
                  tmp12 = term(0, Option.None);
                  tmp13 = Stack.Cons(tmp12, acc);
                  return modCont(tmp13)
                }
              }
            } else {
              tmp14 = term(0, Option.None);
              tmp15 = Stack.Cons(tmp14, acc);
              return modCont(tmp15)
            }
          }
        } else {
          tmp16 = term(0, Option.None);
          tmp17 = Stack.Cons(tmp16, acc);
          return modCont(tmp17)
        }
      } else if (tokens instanceof Stack.Nil.class) {
        return Stack.reverse(acc)
      } else {
        throw new globalThis.Error("match error");
      }
    };
    modCont = function modCont(acc) {
      let doTemp, param01, param11, param02, param12, tmp3, tmp4, tmp5, tmp6, tmp7;
      tmp3 = TokenHelpers.preview(tokens);
      tmp4 = ">>>>>> modCont <<<<<< " + tmp3;
      doTemp = Parser.tracer.print(tmp4, 329);
      if (tokens instanceof Stack.Cons.class) {
        param01 = tokens.head;
        param11 = tokens.tail;
        if (param01 instanceof Token.Identifier.class) {
          param02 = param01.name;
          param12 = param01.symbolic;
          if (param02 === ";;") {
            tmp5 = consume();
            return mod(acc)
          } else {
            tmp6 = parseRule(0, Rules.declRule, Precedence.Keywords.all);
            return handleDirective(tmp6, acc)
          }
        } else {
          tmp7 = parseRule(0, Rules.declRule, Precedence.Keywords.all);
          return handleDirective(tmp7, acc)
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
      tmp2 = Parser.tracer.print(message, 344);
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
