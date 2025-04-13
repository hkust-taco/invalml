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
import Rules from "./parsing/Rules.mjs";
import ParseRule from "./parsing/ParseRule.mjs";
let Parser1;
(class Parser {
  static #termOptions;
  static #typeOptions;
  static {
    Parser1 = Parser;
    let kind, rule, allowOperators, allowLiterals, kind1, rule1, allowOperators1, allowLiterals1, tmp;
    tmp = new TreeTracer.TreeTracer();
    this.tracer = tmp;
    kind = "term";
    rule = Rules.termRule;
    allowOperators = true;
    allowLiterals = true;
    Parser.#termOptions = {
    "kind": kind, "rule": rule, "allowOperators": allowOperators, "allowLiterals": allowLiterals
    };
    kind1 = "type";
    rule1 = Rules.typeRule;
    allowOperators1 = false;
    allowLiterals1 = true;
    Parser.#typeOptions = {
    "kind": kind1, "rule": rule1, "allowOperators": allowOperators1, "allowLiterals": allowLiterals1
    };
  }
  static parse(tokens) {
    let parseKind, mod, exprCont, expr, handleDirective, parseRule, modCont, consume, counter, tree, param0, param1, token, message, tmp, tmp1, tmp2, lambda, lambda1;
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
      let scrut, param01, rule, tree1, scrut1, param02, param03, param11, param2, param3, param4, kind$_, process, rest, scrut2, shouldParse, tree$_, scrut3, param04, param12, token1, param05, param13, name, scrut4, param06, param14, token2, param07, param15, name1, scrut5, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20, tmp21, tmp22, tmp23, tmp24, tmp25, tmp26;
      if (kind === "type") {
        return expr(prec, Parser.#typeOptions)
      } else if (kind === "term") {
        return expr(prec, Parser.#termOptions)
      } else if (kind === "ident") {
        if (tokens instanceof Stack.Cons.class) {
          param06 = tokens.head;
          param14 = tokens.tail;
          if (param06 instanceof Token.Identifier.class) {
            param07 = param06.name;
            param15 = param06.symbolic;
            name1 = param07;
            if (param15 === false) {
              scrut5 = runtime.safeCall(Precedence.Keywords.all.get(name1));
              if (scrut5 instanceof Option.None.class) {
                tmp3 = consume();
                return Tree.Ident(name1, false)
              } else {
                token2 = param06;
                tmp4 = "expect an identifier but found " + token2;
                return Tree.error(tmp4)
              }
            } else {
              token2 = param06;
              tmp5 = "expect an identifier but found " + token2;
              return Tree.error(tmp5)
            }
          } else {
            token2 = param06;
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
          param04 = tokens.head;
          param12 = tokens.tail;
          if (param04 instanceof Token.Identifier.class) {
            param05 = param04.name;
            param13 = param04.symbolic;
            name = param05;
            if (param13 === false) {
              scrut4 = runtime.safeCall(name.at(0));
              if (scrut4 === "'") {
                tmp7 = consume();
                return Tree.Ident(name, false)
              } else {
                token1 = param04;
                tmp8 = "expect a type variable but found " + token1;
                return Tree.error(tmp8)
              }
            } else {
              token1 = param04;
              tmp9 = "expect a type variable but found " + token1;
              return Tree.error(tmp9)
            }
          } else {
            token1 = param04;
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
          tmp11 = parseRule(prec, rule);
          tree1 = tmp11;
          scrut1 = rule.refChoice;
          if (scrut1 instanceof Option.Some.class) {
            param02 = scrut1.value;
            if (param02 instanceof ParseRule.Choice.Ref.class) {
              param03 = param02.kind;
              param11 = param02.process;
              param2 = param02.outerPrec;
              param3 = param02.innerPrec;
              param4 = param02.rest;
              kind$_ = param03;
              process = param11;
              if (param2 instanceof Option.None.class) {
                if (param3 instanceof Option.None.class) {
                  rest = param4;
                  scrut2 = kind == kind$_;
                  if (scrut2 === true) {
                    shouldParse = true;
                    tmp27: while (true) {
                      if (shouldParse === true) {
                        tmp12 = parseRule(prec, rest);
                        tree$_ = tmp12;
                        scrut3 = Tree.nonEmpty(tree$_);
                        if (scrut3 === true) {
                          tmp13 = ">>> " + kind;
                          tmp14 = tmp13 + "Cont ";
                          tmp15 = tmp14 + prec;
                          tmp16 = tmp15 + " ";
                          tmp17 = Tree.summary(tree1);
                          tmp18 = tmp16 + tmp17;
                          tmp19 = tmp18 + " <<<";
                          tmp20 = Parser.tracer.print(tmp19, 74);
                          tmp21 = runtime.safeCall(process(tree1, tree$_));
                          tree1 = tmp21;
                          tmp22 = runtime.Unit;
                        } else {
                          shouldParse = false;
                          tmp22 = runtime.Unit;
                        }
                        tmp23 = tmp22;
                        continue tmp27;
                      } else {
                        tmp23 = runtime.Unit;
                      }
                      break;
                    }
                    tmp24 = tmp23;
                  } else {
                    tmp24 = runtime.Unit;
                  }
                } else {
                  tmp24 = runtime.Unit;
                }
              } else {
                tmp24 = runtime.Unit;
              }
            } else {
              tmp24 = runtime.Unit;
            }
          } else {
            tmp24 = runtime.Unit;
          }
          return tree1
        } else {
          tmp25 = "Unknown syntax kind: \"" + kind;
          tmp26 = tmp25 + "\"";
          throw globalThis.Error(tmp26);
        }
      }
    };
    parseRule = function parseRule(prec, rule) {
      let tmp3, tmp4, tmp5, tmp6, lambda2, lambda3;
      tmp3 = "parsing rule \"" + rule.name;
      tmp4 = tmp3 + "\" with precedence ";
      tmp5 = tmp4 + prec;
      lambda2 = (undefined, function () {
        let scrut, param01, value, param02, param11, other, doTemp, doTemp1, doTemp2, scrut1, param03, value1, scrut2, param04, param05, param12, param2, param3, param4, kind, process, outerPrec, innerPrec, rest, doTemp3, outerPrec$_, innerPrec$_, doTemp4, scrut3, acc, doTemp5, doTemp6, scrut4, param06, value2, scrut5, scrut6, tree1, tree2, param07, param13, message1, param08, param14, name, doTemp7, scrut7, param09, keyword, doTemp8, doTemp9, scrut8, doTemp10, param010, rest1, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20, tmp21, tmp22, tmp23, tmp24, tmp25, tmp26, tmp27, tmp28, tmp29, tmp30, tmp31, tmp32, tmp33, tmp34, tmp35, tmp36, tmp37, tmp38, tmp39, tmp40, tmp41, tmp42, tmp43, tmp44, tmp45, tmp46, tmp47, tmp48, tmp49, tmp50, tmp51, tmp52, tmp53, tmp54, tmp55, tmp56, tmp57, tmp58, tmp59, tmp60, tmp61, tmp62, tmp63, tmp64, tmp65, tmp66, tmp67, tmp68, tmp69, tmp70, tmp71, tmp72, tmp73, tmp74, tmp75, tmp76, tmp77, tmp78, tmp79, tmp80, tmp81, tmp82, tmp83, tmp84, tmp85, tmp86, tmp87, tmp88, tmp89, tmp90, tmp91, tmp92, tmp93, tmp94, tmp95, tmp96, lambda4;
        if (tokens instanceof Stack.Cons.class) {
          param02 = tokens.head;
          param11 = tokens.tail;
          if (param02 instanceof Token.Identifier.class) {
            param08 = param02.name;
            param14 = param02.symbolic;
            name = param08;
            tmp7 = "found an identifier \"" + name;
            tmp8 = tmp7 + "\"";
            doTemp7 = Parser.tracer.print(tmp8, 86);
            scrut7 = runtime.safeCall(Precedence.Keywords.all.get(name));
            if (scrut7 instanceof Option.Some.class) {
              param09 = scrut7.value;
              keyword = param09;
              tmp9 = runtime.safeCall(keyword.toString());
              doTemp8 = Parser.tracer.print(tmp9, 88);
              lambda4 = (undefined, function (caseScrut) {
                let first1, first0, k, v, tmp97;
                if (globalThis.Array.isArray(caseScrut) && caseScrut.length === 2) {
                  first0 = caseScrut[0];
                  first1 = caseScrut[1];
                  k = first0;
                  v = first1;
                  tmp97 = "`" + k;
                  return tmp97 + "`"
                } else {
                  throw new globalThis.Error("match error");
                }
              });
              tmp10 = lambda4;
              tmp11 = Iter.mapping(rule.keywordChoices, tmp10);
              tmp12 = Iter.joined(tmp11, ", ");
              doTemp9 = Parser.tracer.print("keyword choices: ", tmp12);
              scrut8 = runtime.safeCall(rule.keywordChoices.get(name));
              if (scrut8 instanceof Option.Some.class) {
                param010 = scrut8.value;
                rest1 = param010;
                tmp13 = "found a rule starting with `" + name;
                tmp14 = tmp13 + "`";
                tmp15 = Parser.tracer.print(tmp14, 94);
                tmp16 = "the rest of the rule: " + rest1.display;
                tmp17 = Parser.tracer.print(tmp16, 95);
                tmp18 = consume();
                return parseRule(0, rest1)
              } else {
                tmp19 = "\"" + name;
                tmp20 = tmp19 + "\" is not a keyword";
                doTemp10 = Parser.tracer.print(tmp20, 98);
                other = param02;
                tmp21 = "the current rule is " + rule.display;
                doTemp = runtime.safeCall(Parser.tracer.print(tmp21));
                scrut2 = rule.refChoice;
                if (scrut2 instanceof Option.Some.class) {
                  param04 = scrut2.value;
                  if (param04 instanceof ParseRule.Choice.Ref.class) {
                    param05 = param04.kind;
                    param12 = param04.process;
                    param2 = param04.outerPrec;
                    param3 = param04.innerPrec;
                    param4 = param04.rest;
                    kind = param05;
                    process = param12;
                    outerPrec = param2;
                    innerPrec = param3;
                    rest = param4;
                    tmp22 = "try to parse kind \"" + kind;
                    tmp23 = tmp22 + "\" at ";
                    tmp24 = TokenHelpers.preview(tokens);
                    tmp25 = tmp23 + tmp24;
                    doTemp3 = Parser.tracer.print(tmp25, 102);
                    outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxKeywordPrec);
                    innerPrec$_ = Option.getOrElse(innerPrec, prec);
                    scrut3 = outerPrec$_ > prec;
                    if (scrut3 === true) {
                      acc = parseKind(kind, prec);
                      scrut5 = Tree.nonEmptyError(acc);
                      if (scrut5 === true) {
                        scrut6 = parseRule(prec, rest);
                        if (scrut6 instanceof Tree.Error.class) {
                          param07 = scrut6.tree;
                          param13 = scrut6.message;
                          message1 = param13;
                          tree2 = scrut6;
                          tmp26 = "cannot parse due to error: " + message1;
                          tmp27 = Parser.tracer.print(tmp26, 109);
                          return tree2
                        } else {
                          tree1 = scrut6;
                          tmp28 = Tree.summary(acc);
                          tmp29 = "acc: " + tmp28;
                          tmp30 = Parser.tracer.print(tmp29, 112);
                          tmp31 = Tree.summary(tree1);
                          tmp32 = "parsed from rest rule: " + tmp31;
                          tmp33 = Parser.tracer.print(tmp32, 113);
                          return runtime.safeCall(process(acc, tree1))
                        }
                      } else {
                        doTemp5 = Parser.tracer.print("cannot parse more", 115);
                        scrut4 = rule.endChoice;
                        if (scrut4 instanceof Option.Some.class) {
                          param06 = scrut4.value;
                          value2 = param06;
                          tmp34 = Parser.tracer.print("found end choice", 117);
                          return value2
                        } else {
                          doTemp6 = Parser.tracer.print("no end choice", 119);
                          return acc
                        }
                      }
                    } else {
                      tmp35 = "did not parse kind \"" + kind;
                      tmp36 = tmp35 + "\" because of the precedence";
                      doTemp4 = Parser.tracer.print(tmp36, 121);
                      doTemp1 = Parser.tracer.print("no reference choice", 122);
                      scrut1 = rule.endChoice;
                      if (scrut1 instanceof Option.Some.class) {
                        param03 = scrut1.value;
                        value1 = param03;
                        tmp37 = Parser.tracer.print("found end choice", 124);
                        return value1
                      } else {
                        doTemp2 = Parser.tracer.print("no end choice", 126);
                        tmp38 = consume();
                        tmp39 = "unexpected token " + other;
                        return Tree.error(tmp39)
                      }
                    }
                  } else {
                    doTemp1 = Parser.tracer.print("no reference choice", 122);
                    scrut1 = rule.endChoice;
                    if (scrut1 instanceof Option.Some.class) {
                      param03 = scrut1.value;
                      value1 = param03;
                      tmp40 = Parser.tracer.print("found end choice", 124);
                      return value1
                    } else {
                      doTemp2 = Parser.tracer.print("no end choice", 126);
                      tmp41 = consume();
                      tmp42 = "unexpected token " + other;
                      return Tree.error(tmp42)
                    }
                  }
                } else {
                  doTemp1 = Parser.tracer.print("no reference choice", 122);
                  scrut1 = rule.endChoice;
                  if (scrut1 instanceof Option.Some.class) {
                    param03 = scrut1.value;
                    value1 = param03;
                    tmp43 = Parser.tracer.print("found end choice", 124);
                    return value1
                  } else {
                    doTemp2 = Parser.tracer.print("no end choice", 126);
                    tmp44 = consume();
                    tmp45 = "unexpected token " + other;
                    return Tree.error(tmp45)
                  }
                }
              }
            } else {
              other = param02;
              tmp46 = "the current rule is " + rule.display;
              doTemp = runtime.safeCall(Parser.tracer.print(tmp46));
              scrut2 = rule.refChoice;
              if (scrut2 instanceof Option.Some.class) {
                param04 = scrut2.value;
                if (param04 instanceof ParseRule.Choice.Ref.class) {
                  param05 = param04.kind;
                  param12 = param04.process;
                  param2 = param04.outerPrec;
                  param3 = param04.innerPrec;
                  param4 = param04.rest;
                  kind = param05;
                  process = param12;
                  outerPrec = param2;
                  innerPrec = param3;
                  rest = param4;
                  tmp47 = "try to parse kind \"" + kind;
                  tmp48 = tmp47 + "\" at ";
                  tmp49 = TokenHelpers.preview(tokens);
                  tmp50 = tmp48 + tmp49;
                  doTemp3 = Parser.tracer.print(tmp50, 102);
                  outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxKeywordPrec);
                  innerPrec$_ = Option.getOrElse(innerPrec, prec);
                  scrut3 = outerPrec$_ > prec;
                  if (scrut3 === true) {
                    acc = parseKind(kind, prec);
                    scrut5 = Tree.nonEmptyError(acc);
                    if (scrut5 === true) {
                      scrut6 = parseRule(prec, rest);
                      if (scrut6 instanceof Tree.Error.class) {
                        param07 = scrut6.tree;
                        param13 = scrut6.message;
                        message1 = param13;
                        tree2 = scrut6;
                        tmp51 = "cannot parse due to error: " + message1;
                        tmp52 = Parser.tracer.print(tmp51, 109);
                        return tree2
                      } else {
                        tree1 = scrut6;
                        tmp53 = Tree.summary(acc);
                        tmp54 = "acc: " + tmp53;
                        tmp55 = Parser.tracer.print(tmp54, 112);
                        tmp56 = Tree.summary(tree1);
                        tmp57 = "parsed from rest rule: " + tmp56;
                        tmp58 = Parser.tracer.print(tmp57, 113);
                        return runtime.safeCall(process(acc, tree1))
                      }
                    } else {
                      doTemp5 = Parser.tracer.print("cannot parse more", 115);
                      scrut4 = rule.endChoice;
                      if (scrut4 instanceof Option.Some.class) {
                        param06 = scrut4.value;
                        value2 = param06;
                        tmp59 = Parser.tracer.print("found end choice", 117);
                        return value2
                      } else {
                        doTemp6 = Parser.tracer.print("no end choice", 119);
                        return acc
                      }
                    }
                  } else {
                    tmp60 = "did not parse kind \"" + kind;
                    tmp61 = tmp60 + "\" because of the precedence";
                    doTemp4 = Parser.tracer.print(tmp61, 121);
                    doTemp1 = Parser.tracer.print("no reference choice", 122);
                    scrut1 = rule.endChoice;
                    if (scrut1 instanceof Option.Some.class) {
                      param03 = scrut1.value;
                      value1 = param03;
                      tmp62 = Parser.tracer.print("found end choice", 124);
                      return value1
                    } else {
                      doTemp2 = Parser.tracer.print("no end choice", 126);
                      tmp63 = consume();
                      tmp64 = "unexpected token " + other;
                      return Tree.error(tmp64)
                    }
                  }
                } else {
                  doTemp1 = Parser.tracer.print("no reference choice", 122);
                  scrut1 = rule.endChoice;
                  if (scrut1 instanceof Option.Some.class) {
                    param03 = scrut1.value;
                    value1 = param03;
                    tmp65 = Parser.tracer.print("found end choice", 124);
                    return value1
                  } else {
                    doTemp2 = Parser.tracer.print("no end choice", 126);
                    tmp66 = consume();
                    tmp67 = "unexpected token " + other;
                    return Tree.error(tmp67)
                  }
                }
              } else {
                doTemp1 = Parser.tracer.print("no reference choice", 122);
                scrut1 = rule.endChoice;
                if (scrut1 instanceof Option.Some.class) {
                  param03 = scrut1.value;
                  value1 = param03;
                  tmp68 = Parser.tracer.print("found end choice", 124);
                  return value1
                } else {
                  doTemp2 = Parser.tracer.print("no end choice", 126);
                  tmp69 = consume();
                  tmp70 = "unexpected token " + other;
                  return Tree.error(tmp70)
                }
              }
            }
          } else {
            other = param02;
            tmp71 = "the current rule is " + rule.display;
            doTemp = runtime.safeCall(Parser.tracer.print(tmp71));
            scrut2 = rule.refChoice;
            if (scrut2 instanceof Option.Some.class) {
              param04 = scrut2.value;
              if (param04 instanceof ParseRule.Choice.Ref.class) {
                param05 = param04.kind;
                param12 = param04.process;
                param2 = param04.outerPrec;
                param3 = param04.innerPrec;
                param4 = param04.rest;
                kind = param05;
                process = param12;
                outerPrec = param2;
                innerPrec = param3;
                rest = param4;
                tmp72 = "try to parse kind \"" + kind;
                tmp73 = tmp72 + "\" at ";
                tmp74 = TokenHelpers.preview(tokens);
                tmp75 = tmp73 + tmp74;
                doTemp3 = Parser.tracer.print(tmp75, 102);
                outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxKeywordPrec);
                innerPrec$_ = Option.getOrElse(innerPrec, prec);
                scrut3 = outerPrec$_ > prec;
                if (scrut3 === true) {
                  acc = parseKind(kind, prec);
                  scrut5 = Tree.nonEmptyError(acc);
                  if (scrut5 === true) {
                    scrut6 = parseRule(prec, rest);
                    if (scrut6 instanceof Tree.Error.class) {
                      param07 = scrut6.tree;
                      param13 = scrut6.message;
                      message1 = param13;
                      tree2 = scrut6;
                      tmp76 = "cannot parse due to error: " + message1;
                      tmp77 = Parser.tracer.print(tmp76, 109);
                      return tree2
                    } else {
                      tree1 = scrut6;
                      tmp78 = Tree.summary(acc);
                      tmp79 = "acc: " + tmp78;
                      tmp80 = Parser.tracer.print(tmp79, 112);
                      tmp81 = Tree.summary(tree1);
                      tmp82 = "parsed from rest rule: " + tmp81;
                      tmp83 = Parser.tracer.print(tmp82, 113);
                      return runtime.safeCall(process(acc, tree1))
                    }
                  } else {
                    doTemp5 = Parser.tracer.print("cannot parse more", 115);
                    scrut4 = rule.endChoice;
                    if (scrut4 instanceof Option.Some.class) {
                      param06 = scrut4.value;
                      value2 = param06;
                      tmp84 = Parser.tracer.print("found end choice", 117);
                      return value2
                    } else {
                      doTemp6 = Parser.tracer.print("no end choice", 119);
                      return acc
                    }
                  }
                } else {
                  tmp85 = "did not parse kind \"" + kind;
                  tmp86 = tmp85 + "\" because of the precedence";
                  doTemp4 = Parser.tracer.print(tmp86, 121);
                  doTemp1 = Parser.tracer.print("no reference choice", 122);
                  scrut1 = rule.endChoice;
                  if (scrut1 instanceof Option.Some.class) {
                    param03 = scrut1.value;
                    value1 = param03;
                    tmp87 = Parser.tracer.print("found end choice", 124);
                    return value1
                  } else {
                    doTemp2 = Parser.tracer.print("no end choice", 126);
                    tmp88 = consume();
                    tmp89 = "unexpected token " + other;
                    return Tree.error(tmp89)
                  }
                }
              } else {
                doTemp1 = Parser.tracer.print("no reference choice", 122);
                scrut1 = rule.endChoice;
                if (scrut1 instanceof Option.Some.class) {
                  param03 = scrut1.value;
                  value1 = param03;
                  tmp90 = Parser.tracer.print("found end choice", 124);
                  return value1
                } else {
                  doTemp2 = Parser.tracer.print("no end choice", 126);
                  tmp91 = consume();
                  tmp92 = "unexpected token " + other;
                  return Tree.error(tmp92)
                }
              }
            } else {
              doTemp1 = Parser.tracer.print("no reference choice", 122);
              scrut1 = rule.endChoice;
              if (scrut1 instanceof Option.Some.class) {
                param03 = scrut1.value;
                value1 = param03;
                tmp93 = Parser.tracer.print("found end choice", 124);
                return value1
              } else {
                doTemp2 = Parser.tracer.print("no end choice", 126);
                tmp94 = consume();
                tmp95 = "unexpected token " + other;
                return Tree.error(tmp95)
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
            tmp96 = Parser.tracer.print("no end choice but found the end of input", 133);
            return Tree.error("unexpected end of input")
          } else {
            throw new globalThis.Error("match error");
          }
        } else {
          throw new globalThis.Error("match error");
        }
      });
      tmp6 = lambda2;
      lambda3 = (undefined, function (result) {
        let tmp7, tmp8, tmp9;
        tmp7 = "parsed rule \"" + rule.name;
        tmp8 = tmp7 + "\": ";
        tmp9 = Tree.summary(result);
        return tmp8 + tmp9
      });
      return runtime.safeCall(Parser.tracer.trace(tmp5, lambda3, tmp6))
    };
    expr = function expr(prec, options) {
      let tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, lambda2, lambda3;
      tmp3 = options.kind + " <<< ";
      tmp4 = tmp3 + prec;
      tmp5 = tmp4 + " ";
      tmp6 = TokenHelpers.preview(tokens);
      tmp7 = tmp5 + tmp6;
      lambda2 = (undefined, function () {
        let param01, param11, token1, param02, param12, kind, literal, scrut, param03, param13, name, symbolic, scrut1, scrut2, param04, keyword, scrut3, param05, rule, scrut4, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20, tmp21, tmp22, tmp23, tmp24, tmp25, tmp26, tmp27;
        if (tokens instanceof Stack.Cons.class) {
          param01 = tokens.head;
          param11 = tokens.tail;
          if (param01 instanceof Token.Identifier.class) {
            param03 = param01.name;
            param13 = param01.symbolic;
            name = param03;
            symbolic = param13;
            scrut1 = runtime.safeCall(Precedence.Keywords.all.get(name));
            if (scrut1 instanceof Option.Some.class) {
              param04 = scrut1.value;
              keyword = param04;
              scrut3 = runtime.safeCall(options.rule.keywordChoices.get(name));
              if (scrut3 instanceof Option.Some.class) {
                param05 = scrut3.value;
                rule = param05;
                scrut4 = keyword.leftPrecOrMin > prec;
                if (scrut4 === true) {
                  tmp9 = consume();
                  tmp10 = parseRule(keyword.rightPrecOrMax, rule);
                  return exprCont(tmp10, prec, options)
                } else {
                  tmp11 = "the left precedence of \"" + name;
                  tmp12 = tmp11 + "\" is less";
                  tmp13 = Parser.tracer.print(tmp12, 148);
                  return Tree.empty
                }
              } else if (scrut3 instanceof Option.None.class) {
                tmp14 = "no rule starting with " + name;
                tmp15 = Parser.tracer.print(tmp14, 151);
                return Tree.empty
              } else {
                token1 = param01;
                tmp16 = "unrecognized token: " + token1;
                return Tree.error(tmp16)
              }
            } else if (scrut1 instanceof Option.None.class) {
              scrut2 = Predef.not(options.allowOperators);
              if (scrut2 === true) {
                if (symbolic === true) {
                  tmp17 = "symbolic identifiers are disallowed in kind \"" + options.kind;
                  tmp18 = tmp17 + "\"";
                  return Tree.error(tmp18)
                } else {
                  tmp19 = consume();
                  tmp20 = Tree.Ident(name, symbolic);
                  return exprCont(tmp20, prec, options)
                }
              } else {
                tmp21 = consume();
                tmp22 = Tree.Ident(name, symbolic);
                return exprCont(tmp22, prec, options)
              }
            } else {
              token1 = param01;
              tmp23 = "unrecognized token: " + token1;
              return Tree.error(tmp23)
            }
          } else if (param01 instanceof Token.Literal.class) {
            param02 = param01.kind;
            param12 = param01.literal;
            kind = param02;
            literal = param12;
            scrut = options.allowLiterals;
            if (scrut === true) {
              tmp24 = consume();
              tmp25 = Tree.Literal(kind, literal);
              return exprCont(tmp25, prec, options)
            } else {
              token1 = param01;
              tmp26 = "unrecognized token: " + token1;
              return Tree.error(tmp26)
            }
          } else {
            token1 = param01;
            tmp27 = "unrecognized token: " + token1;
            return Tree.error(tmp27)
          }
        } else if (tokens instanceof Stack.Nil.class) {
          return Tree.error("unexpected end of input")
        } else {
          throw new globalThis.Error("match error");
        }
      });
      tmp8 = lambda2;
      lambda3 = (undefined, function (result) {
        let tmp9, tmp10;
        tmp9 = options.kind + " >>> ";
        tmp10 = Tree.summary(result);
        return tmp9 + tmp10
      });
      return runtime.safeCall(Parser.tracer.trace(tmp7, lambda3, tmp8))
    };
    exprCont = function exprCont(acc, prec, options) {
      let infix, doTemp, doTemp1, doTemp2, param01, param11, token1, scrut, param02, param03, param12, param2, param3, param4, kind, process, outerPrec, innerPrec, rest, doTemp3, outerPrec$_, innerPrec$_, doTemp4, scrut1, scrut2, rhs, restRes, param04, param13, name, scrut3, scrut4, doTemp5, scrut5, param05, first1, first0, leftPrec, rightPrec, doTemp6, scrut6, op, rhs1, name1, scrut7, param06, keyword, doTemp7, doTemp8, scrut8, param07, rule, doTemp9, scrut9, scrut10, param08, param09, param14, param21, param31, param41, kind1, process1, outerPrec1, innerPrec1, rest1, doTemp10, outerPrec$_1, innerPrec$_1, scrut11, rhs2, restRes1, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20, tmp21, tmp22, tmp23, tmp24, tmp25, tmp26, tmp27, tmp28, tmp29, tmp30, tmp31, tmp32, tmp33, tmp34, tmp35, tmp36, tmp37, tmp38, tmp39, tmp40, tmp41, tmp42, tmp43, tmp44, tmp45, tmp46, tmp47, tmp48, tmp49, tmp50, tmp51, tmp52, tmp53, tmp54, tmp55, tmp56, tmp57, tmp58, tmp59, tmp60, tmp61, tmp62, tmp63, tmp64, tmp65, tmp66, tmp67, tmp68, tmp69, tmp70, tmp71, tmp72, tmp73, tmp74, tmp75, tmp76, tmp77, tmp78, tmp79, tmp80, tmp81, tmp82, tmp83, tmp84, tmp85, tmp86, tmp87, tmp88, tmp89, tmp90, tmp91, tmp92, tmp93, tmp94, tmp95, tmp96, tmp97, tmp98, tmp99, tmp100, tmp101, tmp102, tmp103, tmp104, tmp105, tmp106, tmp107, tmp108, tmp109, tmp110, tmp111, tmp112, tmp113, tmp114, tmp115, tmp116, tmp117, tmp118, tmp119, tmp120, tmp121, tmp122, tmp123, tmp124, tmp125, tmp126, tmp127, tmp128, tmp129, tmp130, tmp131, tmp132, tmp133, tmp134, tmp135, tmp136, tmp137, tmp138, tmp139, tmp140, tmp141, tmp142, tmp143, tmp144, tmp145, tmp146, tmp147, tmp148, tmp149, tmp150, tmp151, tmp152, tmp153, tmp154, tmp155, tmp156, tmp157, tmp158, tmp159, tmp160, tmp161, tmp162, tmp163, tmp164, tmp165, tmp166, tmp167, tmp168, tmp169, tmp170, tmp171, tmp172, tmp173, tmp174, tmp175, tmp176, tmp177, tmp178, tmp179, tmp180, tmp181, tmp182, tmp183, tmp184, tmp185, tmp186, tmp187, tmp188, tmp189, tmp190, tmp191, tmp192, tmp193, tmp194, tmp195, tmp196, tmp197, tmp198, tmp199, tmp200, tmp201, tmp202, tmp203, tmp204, tmp205, tmp206, tmp207, tmp208, tmp209, tmp210, tmp211, tmp212, tmp213, tmp214, tmp215, tmp216, tmp217, tmp218, tmp219, tmp220, tmp221, tmp222, tmp223, tmp224, tmp225, tmp226, tmp227, tmp228, tmp229, tmp230, tmp231, tmp232, tmp233, tmp234, tmp235, tmp236, tmp237, tmp238, tmp239, tmp240, tmp241, tmp242, tmp243, tmp244, tmp245, tmp246, tmp247, tmp248, tmp249, tmp250, tmp251, tmp252, tmp253, tmp254, tmp255, tmp256, tmp257, tmp258, tmp259, tmp260, tmp261, tmp262, tmp263, tmp264, tmp265, tmp266, tmp267, tmp268, tmp269, tmp270, tmp271, tmp272, tmp273, tmp274, tmp275, tmp276, tmp277, tmp278, tmp279, tmp280, tmp281, tmp282, tmp283, tmp284, tmp285, tmp286, tmp287, tmp288, tmp289, tmp290, tmp291, tmp292, tmp293, tmp294, tmp295, tmp296, tmp297, tmp298, tmp299, tmp300, tmp301, tmp302, tmp303, tmp304, tmp305, tmp306, tmp307, tmp308, tmp309, tmp310, tmp311, tmp312, tmp313, tmp314, tmp315, tmp316, tmp317, tmp318, tmp319, tmp320, tmp321, tmp322, tmp323, tmp324, tmp325, tmp326, tmp327, tmp328, tmp329, tmp330, tmp331, tmp332, tmp333, tmp334, tmp335, tmp336, tmp337, tmp338, tmp339, tmp340, tmp341, tmp342, tmp343, tmp344, tmp345, tmp346, tmp347, tmp348, tmp349, tmp350, tmp351, tmp352, tmp353, tmp354, tmp355, tmp356, tmp357, tmp358, tmp359, tmp360, tmp361, tmp362, tmp363, tmp364, tmp365, tmp366, tmp367, tmp368, tmp369, tmp370, tmp371, tmp372, tmp373, tmp374, tmp375, tmp376, tmp377, tmp378, tmp379, tmp380, tmp381, tmp382, tmp383, tmp384, tmp385, tmp386, tmp387, tmp388, tmp389, tmp390, tmp391, tmp392, tmp393, tmp394, tmp395, tmp396, tmp397, tmp398, tmp399, tmp400, tmp401, tmp402, tmp403, tmp404, tmp405, tmp406, tmp407, tmp408, tmp409, tmp410, tmp411, tmp412, tmp413, tmp414, tmp415, tmp416, tmp417, tmp418, tmp419, tmp420, tmp421, tmp422, tmp423, tmp424, tmp425, tmp426, tmp427, tmp428, tmp429, tmp430, tmp431, tmp432, tmp433, tmp434, tmp435, tmp436, tmp437, tmp438, tmp439, tmp440, tmp441, tmp442, tmp443, tmp444, tmp445, tmp446, tmp447, tmp448, tmp449, tmp450, tmp451, tmp452, tmp453, tmp454, tmp455, tmp456, tmp457, tmp458, tmp459, tmp460, tmp461, tmp462, tmp463, tmp464, tmp465, tmp466, tmp467, tmp468, tmp469, tmp470, tmp471, tmp472, tmp473, tmp474, tmp475, tmp476, tmp477, tmp478, tmp479, tmp480, tmp481, tmp482, tmp483, tmp484, tmp485, tmp486, tmp487, tmp488, tmp489, tmp490, tmp491, tmp492, tmp493, tmp494, tmp495, tmp496, tmp497, tmp498, tmp499, tmp500, tmp501, tmp502, tmp503, tmp504, tmp505, tmp506, tmp507, tmp508, tmp509, tmp510, tmp511, tmp512, tmp513, tmp514, tmp515, tmp516, tmp517, tmp518, tmp519, tmp520, tmp521, tmp522, tmp523, tmp524, tmp525, tmp526, tmp527, tmp528, tmp529, tmp530, tmp531, tmp532, tmp533, tmp534, tmp535, tmp536, tmp537, tmp538, tmp539, tmp540, tmp541, tmp542, tmp543, tmp544, tmp545, tmp546, tmp547, tmp548, tmp549, tmp550, tmp551, tmp552, tmp553, tmp554, tmp555, tmp556, tmp557, tmp558, tmp559, tmp560, tmp561, tmp562, tmp563, tmp564, tmp565, lambda2;
      lambda2 = (undefined, function (caseScrut) {
        let param010, param15, param22, param32, param42, kind2, process2, rest2, scrut12, process3, rule1, tmp566, tmp567, tmp568, tmp569, tmp570, tmp571, tmp572, tmp573;
        if (caseScrut instanceof ParseRule.Choice.Ref.class) {
          param010 = caseScrut.kind;
          param15 = caseScrut.process;
          param22 = caseScrut.outerPrec;
          param32 = caseScrut.innerPrec;
          param42 = caseScrut.rest;
          kind2 = param010;
          process2 = param15;
          if (param22 instanceof Option.None.class) {
            if (param32 instanceof Option.None.class) {
              rest2 = param42;
              scrut12 = kind2 == options.kind;
              if (scrut12 === true) {
                process3 = process2;
                rule1 = rest2;
                return {
                "process": process3, "rule": rule1
                }
              } else {
                tmp566 = "Kind " + options.kind;
                tmp567 = tmp566 + " does not have infix rules";
                throw globalThis.Error(tmp567);
              }
            } else {
              tmp568 = "Kind " + options.kind;
              tmp569 = tmp568 + " does not have infix rules";
              throw globalThis.Error(tmp569);
            }
          } else {
            tmp570 = "Kind " + options.kind;
            tmp571 = tmp570 + " does not have infix rules";
            throw globalThis.Error(tmp571);
          }
        } else {
          tmp572 = "Kind " + options.kind;
          tmp573 = tmp572 + " does not have infix rules";
          throw globalThis.Error(tmp573);
        }
      });
      tmp3 = lambda2;
      infix = Option.flatMap(options.rule.refChoice, tmp3);
      tmp4 = ">>> " + options.kind;
      tmp5 = tmp4 + "Cont ";
      tmp6 = tmp5 + prec;
      tmp7 = tmp6 + " ";
      tmp8 = Tree.summary(acc);
      tmp9 = tmp7 + tmp8;
      tmp10 = tmp9 + " <<<";
      doTemp = Parser.tracer.print(tmp10, 173);
      tmp11 = TokenHelpers.preview(tokens);
      tmp12 = "check keyword " + tmp11;
      doTemp1 = Parser.tracer.print(tmp12, 175);
      if (tokens instanceof Stack.Cons.class) {
        param01 = tokens.head;
        param11 = tokens.tail;
        if (param01 instanceof Token.Identifier.class) {
          param04 = param01.name;
          param13 = param01.symbolic;
          name1 = param04;
          scrut7 = runtime.safeCall(Precedence.Keywords.all.get(name1));
          if (scrut7 instanceof Option.Some.class) {
            param06 = scrut7.value;
            keyword = param06;
            tmp13 = "found a keyword: " + name1;
            doTemp7 = Parser.tracer.print(tmp13, 177);
            scrut8 = runtime.safeCall(infix.rule.keywordChoices.get(name1));
            if (scrut8 instanceof Option.Some.class) {
              param07 = scrut8.value;
              rule = param07;
              tmp14 = "keyword `" + name1;
              tmp15 = tmp14 + "` is found in infix rules";
              doTemp9 = Parser.tracer.print(tmp15, 179);
              scrut9 = keyword.leftPrecOrMin > prec;
              if (scrut9 === true) {
                scrut10 = rule.refChoice;
                if (scrut10 instanceof Option.Some.class) {
                  param08 = scrut10.value;
                  if (param08 instanceof ParseRule.Choice.Ref.class) {
                    param09 = param08.kind;
                    param14 = param08.process;
                    param21 = param08.outerPrec;
                    param31 = param08.innerPrec;
                    param41 = param08.rest;
                    kind1 = param09;
                    process1 = param14;
                    outerPrec1 = param21;
                    innerPrec1 = param31;
                    rest1 = param41;
                    tmp16 = "try to parse kind \"" + kind1;
                    tmp17 = tmp16 + "\" at ";
                    tmp18 = TokenHelpers.preview(tokens);
                    tmp19 = tmp17 + tmp18;
                    doTemp10 = Parser.tracer.print(tmp19, 182);
                    outerPrec$_1 = Option.getOrElse(outerPrec1, Precedence.Keywords.maxOperatorPrec);
                    innerPrec$_1 = Option.getOrElse(innerPrec1, outerPrec$_1);
                    scrut11 = outerPrec$_1 > prec;
                    if (scrut11 === true) {
                      tmp20 = consume();
                      tmp21 = parseKind(kind1, keyword.rightPrecOrMin);
                      rhs2 = tmp21;
                      tmp22 = parseRule(innerPrec$_1, rest1);
                      restRes1 = tmp22;
                      tmp23 = runtime.safeCall(process1(rhs2, restRes1));
                      tmp24 = infix.process(acc, tmp23);
                      return exprCont(tmp24, prec, options)
                    } else {
                      tmp25 = "keyword `" + name1;
                      tmp26 = tmp25 + "` does not have infix rules";
                      doTemp8 = Parser.tracer.print(tmp26, 191);
                      name = param04;
                      if (param13 === true) {
                        scrut3 = runtime.safeCall(Precedence.Keywords.all.get(name));
                        if (scrut3 instanceof Option.None.class) {
                          scrut4 = options.allowOperators;
                          if (scrut4 === true) {
                            tmp27 = "found an operator \"" + name;
                            tmp28 = tmp27 + "\"";
                            doTemp5 = Parser.tracer.print(tmp28, 194);
                            scrut5 = Precedence.opPrecOpt(name);
                            if (scrut5 instanceof Option.Some.class) {
                              param05 = scrut5.value;
                              if (globalThis.Array.isArray(param05) && param05.length === 2) {
                                first0 = param05[0];
                                first1 = param05[1];
                                leftPrec = first0;
                                rightPrec = first1;
                                tmp29 = "leftPrec = " + leftPrec;
                                tmp30 = tmp29 + "; rightPrec = ";
                                tmp31 = tmp30 + rightPrec;
                                doTemp6 = Parser.tracer.print(tmp31, 196);
                                scrut6 = leftPrec > prec;
                                if (scrut6 === true) {
                                  tmp32 = consume();
                                  tmp33 = Tree.Ident(name, true);
                                  op = tmp33;
                                  tmp34 = expr(rightPrec, Parser.#termOptions);
                                  rhs1 = tmp34;
                                  tmp35 = Stack.Cons(rhs1, Stack.Nil);
                                  tmp36 = Stack.Cons(acc, tmp35);
                                  tmp37 = Tree.App(op, tmp36);
                                  return exprCont(tmp37, prec, options)
                                } else {
                                  return acc
                                }
                              } else {
                                doTemp2 = Parser.tracer.print("not a keyword", 205);
                                token1 = param01;
                                scrut = infix.rule.refChoice;
                                if (scrut instanceof Option.Some.class) {
                                  param02 = scrut.value;
                                  if (param02 instanceof ParseRule.Choice.Ref.class) {
                                    param03 = param02.kind;
                                    param12 = param02.process;
                                    param2 = param02.outerPrec;
                                    param3 = param02.innerPrec;
                                    param4 = param02.rest;
                                    kind = param03;
                                    process = param12;
                                    outerPrec = param2;
                                    innerPrec = param3;
                                    rest = param4;
                                    tmp38 = "found reference to " + kind;
                                    tmp39 = tmp38 + " with outerPrec = ";
                                    tmp40 = tmp39 + outerPrec;
                                    doTemp3 = Parser.tracer.print(tmp40, 208);
                                    outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                                    innerPrec$_ = Option.getOrElse(innerPrec, outerPrec$_);
                                    scrut1 = outerPrec$_ > prec;
                                    if (scrut1 === true) {
                                      tmp41 = Option.getOrElse(innerPrec, outerPrec$_);
                                      scrut2 = parseKind(kind, tmp41);
                                      if (scrut2 instanceof Tree.Empty.class) {
                                        tmp42 = Parser.tracer.print("nothing was parsed", 214);
                                        return acc
                                      } else if (scrut2 instanceof Tree.Error.class) {
                                        tmp43 = Parser.tracer.print("cannot parse more", 217);
                                        return acc
                                      } else {
                                        rhs = scrut2;
                                        tmp44 = Tree.summary(rhs);
                                        tmp45 = "parsed " + tmp44;
                                        tmp46 = Parser.tracer.print(tmp45, 220);
                                        tmp47 = parseRule(innerPrec$_, rest);
                                        restRes = tmp47;
                                        tmp48 = runtime.safeCall(process(rhs, restRes));
                                        tmp49 = infix.process(acc, tmp48);
                                        return exprCont(tmp49, prec, options)
                                      }
                                    } else {
                                      tmp50 = "the outer precedence is less than " + prec;
                                      doTemp4 = Parser.tracer.print(tmp50, 223);
                                      return acc
                                    }
                                  } else {
                                    throw new globalThis.Error("match error");
                                  }
                                } else if (scrut instanceof Option.None.class) {
                                  tmp51 = "cannot consume " + token1;
                                  tmp52 = Parser.tracer.print(tmp51, 226);
                                  return acc
                                } else {
                                  throw new globalThis.Error("match error");
                                }
                              }
                            } else {
                              doTemp2 = Parser.tracer.print("not a keyword", 205);
                              token1 = param01;
                              scrut = infix.rule.refChoice;
                              if (scrut instanceof Option.Some.class) {
                                param02 = scrut.value;
                                if (param02 instanceof ParseRule.Choice.Ref.class) {
                                  param03 = param02.kind;
                                  param12 = param02.process;
                                  param2 = param02.outerPrec;
                                  param3 = param02.innerPrec;
                                  param4 = param02.rest;
                                  kind = param03;
                                  process = param12;
                                  outerPrec = param2;
                                  innerPrec = param3;
                                  rest = param4;
                                  tmp53 = "found reference to " + kind;
                                  tmp54 = tmp53 + " with outerPrec = ";
                                  tmp55 = tmp54 + outerPrec;
                                  doTemp3 = Parser.tracer.print(tmp55, 208);
                                  outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                                  innerPrec$_ = Option.getOrElse(innerPrec, outerPrec$_);
                                  scrut1 = outerPrec$_ > prec;
                                  if (scrut1 === true) {
                                    tmp56 = Option.getOrElse(innerPrec, outerPrec$_);
                                    scrut2 = parseKind(kind, tmp56);
                                    if (scrut2 instanceof Tree.Empty.class) {
                                      tmp57 = Parser.tracer.print("nothing was parsed", 214);
                                      return acc
                                    } else if (scrut2 instanceof Tree.Error.class) {
                                      tmp58 = Parser.tracer.print("cannot parse more", 217);
                                      return acc
                                    } else {
                                      rhs = scrut2;
                                      tmp59 = Tree.summary(rhs);
                                      tmp60 = "parsed " + tmp59;
                                      tmp61 = Parser.tracer.print(tmp60, 220);
                                      tmp62 = parseRule(innerPrec$_, rest);
                                      restRes = tmp62;
                                      tmp63 = runtime.safeCall(process(rhs, restRes));
                                      tmp64 = infix.process(acc, tmp63);
                                      return exprCont(tmp64, prec, options)
                                    }
                                  } else {
                                    tmp65 = "the outer precedence is less than " + prec;
                                    doTemp4 = Parser.tracer.print(tmp65, 223);
                                    return acc
                                  }
                                } else {
                                  throw new globalThis.Error("match error");
                                }
                              } else if (scrut instanceof Option.None.class) {
                                tmp66 = "cannot consume " + token1;
                                tmp67 = Parser.tracer.print(tmp66, 226);
                                return acc
                              } else {
                                throw new globalThis.Error("match error");
                              }
                            }
                          } else {
                            doTemp2 = Parser.tracer.print("not a keyword", 205);
                            token1 = param01;
                            scrut = infix.rule.refChoice;
                            if (scrut instanceof Option.Some.class) {
                              param02 = scrut.value;
                              if (param02 instanceof ParseRule.Choice.Ref.class) {
                                param03 = param02.kind;
                                param12 = param02.process;
                                param2 = param02.outerPrec;
                                param3 = param02.innerPrec;
                                param4 = param02.rest;
                                kind = param03;
                                process = param12;
                                outerPrec = param2;
                                innerPrec = param3;
                                rest = param4;
                                tmp68 = "found reference to " + kind;
                                tmp69 = tmp68 + " with outerPrec = ";
                                tmp70 = tmp69 + outerPrec;
                                doTemp3 = Parser.tracer.print(tmp70, 208);
                                outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                                innerPrec$_ = Option.getOrElse(innerPrec, outerPrec$_);
                                scrut1 = outerPrec$_ > prec;
                                if (scrut1 === true) {
                                  tmp71 = Option.getOrElse(innerPrec, outerPrec$_);
                                  scrut2 = parseKind(kind, tmp71);
                                  if (scrut2 instanceof Tree.Empty.class) {
                                    tmp72 = Parser.tracer.print("nothing was parsed", 214);
                                    return acc
                                  } else if (scrut2 instanceof Tree.Error.class) {
                                    tmp73 = Parser.tracer.print("cannot parse more", 217);
                                    return acc
                                  } else {
                                    rhs = scrut2;
                                    tmp74 = Tree.summary(rhs);
                                    tmp75 = "parsed " + tmp74;
                                    tmp76 = Parser.tracer.print(tmp75, 220);
                                    tmp77 = parseRule(innerPrec$_, rest);
                                    restRes = tmp77;
                                    tmp78 = runtime.safeCall(process(rhs, restRes));
                                    tmp79 = infix.process(acc, tmp78);
                                    return exprCont(tmp79, prec, options)
                                  }
                                } else {
                                  tmp80 = "the outer precedence is less than " + prec;
                                  doTemp4 = Parser.tracer.print(tmp80, 223);
                                  return acc
                                }
                              } else {
                                throw new globalThis.Error("match error");
                              }
                            } else if (scrut instanceof Option.None.class) {
                              tmp81 = "cannot consume " + token1;
                              tmp82 = Parser.tracer.print(tmp81, 226);
                              return acc
                            } else {
                              throw new globalThis.Error("match error");
                            }
                          }
                        } else {
                          doTemp2 = Parser.tracer.print("not a keyword", 205);
                          token1 = param01;
                          scrut = infix.rule.refChoice;
                          if (scrut instanceof Option.Some.class) {
                            param02 = scrut.value;
                            if (param02 instanceof ParseRule.Choice.Ref.class) {
                              param03 = param02.kind;
                              param12 = param02.process;
                              param2 = param02.outerPrec;
                              param3 = param02.innerPrec;
                              param4 = param02.rest;
                              kind = param03;
                              process = param12;
                              outerPrec = param2;
                              innerPrec = param3;
                              rest = param4;
                              tmp83 = "found reference to " + kind;
                              tmp84 = tmp83 + " with outerPrec = ";
                              tmp85 = tmp84 + outerPrec;
                              doTemp3 = Parser.tracer.print(tmp85, 208);
                              outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                              innerPrec$_ = Option.getOrElse(innerPrec, outerPrec$_);
                              scrut1 = outerPrec$_ > prec;
                              if (scrut1 === true) {
                                tmp86 = Option.getOrElse(innerPrec, outerPrec$_);
                                scrut2 = parseKind(kind, tmp86);
                                if (scrut2 instanceof Tree.Empty.class) {
                                  tmp87 = Parser.tracer.print("nothing was parsed", 214);
                                  return acc
                                } else if (scrut2 instanceof Tree.Error.class) {
                                  tmp88 = Parser.tracer.print("cannot parse more", 217);
                                  return acc
                                } else {
                                  rhs = scrut2;
                                  tmp89 = Tree.summary(rhs);
                                  tmp90 = "parsed " + tmp89;
                                  tmp91 = Parser.tracer.print(tmp90, 220);
                                  tmp92 = parseRule(innerPrec$_, rest);
                                  restRes = tmp92;
                                  tmp93 = runtime.safeCall(process(rhs, restRes));
                                  tmp94 = infix.process(acc, tmp93);
                                  return exprCont(tmp94, prec, options)
                                }
                              } else {
                                tmp95 = "the outer precedence is less than " + prec;
                                doTemp4 = Parser.tracer.print(tmp95, 223);
                                return acc
                              }
                            } else {
                              throw new globalThis.Error("match error");
                            }
                          } else if (scrut instanceof Option.None.class) {
                            tmp96 = "cannot consume " + token1;
                            tmp97 = Parser.tracer.print(tmp96, 226);
                            return acc
                          } else {
                            throw new globalThis.Error("match error");
                          }
                        }
                      } else {
                        doTemp2 = Parser.tracer.print("not a keyword", 205);
                        token1 = param01;
                        scrut = infix.rule.refChoice;
                        if (scrut instanceof Option.Some.class) {
                          param02 = scrut.value;
                          if (param02 instanceof ParseRule.Choice.Ref.class) {
                            param03 = param02.kind;
                            param12 = param02.process;
                            param2 = param02.outerPrec;
                            param3 = param02.innerPrec;
                            param4 = param02.rest;
                            kind = param03;
                            process = param12;
                            outerPrec = param2;
                            innerPrec = param3;
                            rest = param4;
                            tmp98 = "found reference to " + kind;
                            tmp99 = tmp98 + " with outerPrec = ";
                            tmp100 = tmp99 + outerPrec;
                            doTemp3 = Parser.tracer.print(tmp100, 208);
                            outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                            innerPrec$_ = Option.getOrElse(innerPrec, outerPrec$_);
                            scrut1 = outerPrec$_ > prec;
                            if (scrut1 === true) {
                              tmp101 = Option.getOrElse(innerPrec, outerPrec$_);
                              scrut2 = parseKind(kind, tmp101);
                              if (scrut2 instanceof Tree.Empty.class) {
                                tmp102 = Parser.tracer.print("nothing was parsed", 214);
                                return acc
                              } else if (scrut2 instanceof Tree.Error.class) {
                                tmp103 = Parser.tracer.print("cannot parse more", 217);
                                return acc
                              } else {
                                rhs = scrut2;
                                tmp104 = Tree.summary(rhs);
                                tmp105 = "parsed " + tmp104;
                                tmp106 = Parser.tracer.print(tmp105, 220);
                                tmp107 = parseRule(innerPrec$_, rest);
                                restRes = tmp107;
                                tmp108 = runtime.safeCall(process(rhs, restRes));
                                tmp109 = infix.process(acc, tmp108);
                                return exprCont(tmp109, prec, options)
                              }
                            } else {
                              tmp110 = "the outer precedence is less than " + prec;
                              doTemp4 = Parser.tracer.print(tmp110, 223);
                              return acc
                            }
                          } else {
                            throw new globalThis.Error("match error");
                          }
                        } else if (scrut instanceof Option.None.class) {
                          tmp111 = "cannot consume " + token1;
                          tmp112 = Parser.tracer.print(tmp111, 226);
                          return acc
                        } else {
                          throw new globalThis.Error("match error");
                        }
                      }
                    }
                  } else {
                    tmp113 = "keyword `" + name1;
                    tmp114 = tmp113 + "` does not have infix rules";
                    doTemp8 = Parser.tracer.print(tmp114, 191);
                    name = param04;
                    if (param13 === true) {
                      scrut3 = runtime.safeCall(Precedence.Keywords.all.get(name));
                      if (scrut3 instanceof Option.None.class) {
                        scrut4 = options.allowOperators;
                        if (scrut4 === true) {
                          tmp115 = "found an operator \"" + name;
                          tmp116 = tmp115 + "\"";
                          doTemp5 = Parser.tracer.print(tmp116, 194);
                          scrut5 = Precedence.opPrecOpt(name);
                          if (scrut5 instanceof Option.Some.class) {
                            param05 = scrut5.value;
                            if (globalThis.Array.isArray(param05) && param05.length === 2) {
                              first0 = param05[0];
                              first1 = param05[1];
                              leftPrec = first0;
                              rightPrec = first1;
                              tmp117 = "leftPrec = " + leftPrec;
                              tmp118 = tmp117 + "; rightPrec = ";
                              tmp119 = tmp118 + rightPrec;
                              doTemp6 = Parser.tracer.print(tmp119, 196);
                              scrut6 = leftPrec > prec;
                              if (scrut6 === true) {
                                tmp120 = consume();
                                tmp121 = Tree.Ident(name, true);
                                op = tmp121;
                                tmp122 = expr(rightPrec, Parser.#termOptions);
                                rhs1 = tmp122;
                                tmp123 = Stack.Cons(rhs1, Stack.Nil);
                                tmp124 = Stack.Cons(acc, tmp123);
                                tmp125 = Tree.App(op, tmp124);
                                return exprCont(tmp125, prec, options)
                              } else {
                                return acc
                              }
                            } else {
                              doTemp2 = Parser.tracer.print("not a keyword", 205);
                              token1 = param01;
                              scrut = infix.rule.refChoice;
                              if (scrut instanceof Option.Some.class) {
                                param02 = scrut.value;
                                if (param02 instanceof ParseRule.Choice.Ref.class) {
                                  param03 = param02.kind;
                                  param12 = param02.process;
                                  param2 = param02.outerPrec;
                                  param3 = param02.innerPrec;
                                  param4 = param02.rest;
                                  kind = param03;
                                  process = param12;
                                  outerPrec = param2;
                                  innerPrec = param3;
                                  rest = param4;
                                  tmp126 = "found reference to " + kind;
                                  tmp127 = tmp126 + " with outerPrec = ";
                                  tmp128 = tmp127 + outerPrec;
                                  doTemp3 = Parser.tracer.print(tmp128, 208);
                                  outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                                  innerPrec$_ = Option.getOrElse(innerPrec, outerPrec$_);
                                  scrut1 = outerPrec$_ > prec;
                                  if (scrut1 === true) {
                                    tmp129 = Option.getOrElse(innerPrec, outerPrec$_);
                                    scrut2 = parseKind(kind, tmp129);
                                    if (scrut2 instanceof Tree.Empty.class) {
                                      tmp130 = Parser.tracer.print("nothing was parsed", 214);
                                      return acc
                                    } else if (scrut2 instanceof Tree.Error.class) {
                                      tmp131 = Parser.tracer.print("cannot parse more", 217);
                                      return acc
                                    } else {
                                      rhs = scrut2;
                                      tmp132 = Tree.summary(rhs);
                                      tmp133 = "parsed " + tmp132;
                                      tmp134 = Parser.tracer.print(tmp133, 220);
                                      tmp135 = parseRule(innerPrec$_, rest);
                                      restRes = tmp135;
                                      tmp136 = runtime.safeCall(process(rhs, restRes));
                                      tmp137 = infix.process(acc, tmp136);
                                      return exprCont(tmp137, prec, options)
                                    }
                                  } else {
                                    tmp138 = "the outer precedence is less than " + prec;
                                    doTemp4 = Parser.tracer.print(tmp138, 223);
                                    return acc
                                  }
                                } else {
                                  throw new globalThis.Error("match error");
                                }
                              } else if (scrut instanceof Option.None.class) {
                                tmp139 = "cannot consume " + token1;
                                tmp140 = Parser.tracer.print(tmp139, 226);
                                return acc
                              } else {
                                throw new globalThis.Error("match error");
                              }
                            }
                          } else {
                            doTemp2 = Parser.tracer.print("not a keyword", 205);
                            token1 = param01;
                            scrut = infix.rule.refChoice;
                            if (scrut instanceof Option.Some.class) {
                              param02 = scrut.value;
                              if (param02 instanceof ParseRule.Choice.Ref.class) {
                                param03 = param02.kind;
                                param12 = param02.process;
                                param2 = param02.outerPrec;
                                param3 = param02.innerPrec;
                                param4 = param02.rest;
                                kind = param03;
                                process = param12;
                                outerPrec = param2;
                                innerPrec = param3;
                                rest = param4;
                                tmp141 = "found reference to " + kind;
                                tmp142 = tmp141 + " with outerPrec = ";
                                tmp143 = tmp142 + outerPrec;
                                doTemp3 = Parser.tracer.print(tmp143, 208);
                                outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                                innerPrec$_ = Option.getOrElse(innerPrec, outerPrec$_);
                                scrut1 = outerPrec$_ > prec;
                                if (scrut1 === true) {
                                  tmp144 = Option.getOrElse(innerPrec, outerPrec$_);
                                  scrut2 = parseKind(kind, tmp144);
                                  if (scrut2 instanceof Tree.Empty.class) {
                                    tmp145 = Parser.tracer.print("nothing was parsed", 214);
                                    return acc
                                  } else if (scrut2 instanceof Tree.Error.class) {
                                    tmp146 = Parser.tracer.print("cannot parse more", 217);
                                    return acc
                                  } else {
                                    rhs = scrut2;
                                    tmp147 = Tree.summary(rhs);
                                    tmp148 = "parsed " + tmp147;
                                    tmp149 = Parser.tracer.print(tmp148, 220);
                                    tmp150 = parseRule(innerPrec$_, rest);
                                    restRes = tmp150;
                                    tmp151 = runtime.safeCall(process(rhs, restRes));
                                    tmp152 = infix.process(acc, tmp151);
                                    return exprCont(tmp152, prec, options)
                                  }
                                } else {
                                  tmp153 = "the outer precedence is less than " + prec;
                                  doTemp4 = Parser.tracer.print(tmp153, 223);
                                  return acc
                                }
                              } else {
                                throw new globalThis.Error("match error");
                              }
                            } else if (scrut instanceof Option.None.class) {
                              tmp154 = "cannot consume " + token1;
                              tmp155 = Parser.tracer.print(tmp154, 226);
                              return acc
                            } else {
                              throw new globalThis.Error("match error");
                            }
                          }
                        } else {
                          doTemp2 = Parser.tracer.print("not a keyword", 205);
                          token1 = param01;
                          scrut = infix.rule.refChoice;
                          if (scrut instanceof Option.Some.class) {
                            param02 = scrut.value;
                            if (param02 instanceof ParseRule.Choice.Ref.class) {
                              param03 = param02.kind;
                              param12 = param02.process;
                              param2 = param02.outerPrec;
                              param3 = param02.innerPrec;
                              param4 = param02.rest;
                              kind = param03;
                              process = param12;
                              outerPrec = param2;
                              innerPrec = param3;
                              rest = param4;
                              tmp156 = "found reference to " + kind;
                              tmp157 = tmp156 + " with outerPrec = ";
                              tmp158 = tmp157 + outerPrec;
                              doTemp3 = Parser.tracer.print(tmp158, 208);
                              outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                              innerPrec$_ = Option.getOrElse(innerPrec, outerPrec$_);
                              scrut1 = outerPrec$_ > prec;
                              if (scrut1 === true) {
                                tmp159 = Option.getOrElse(innerPrec, outerPrec$_);
                                scrut2 = parseKind(kind, tmp159);
                                if (scrut2 instanceof Tree.Empty.class) {
                                  tmp160 = Parser.tracer.print("nothing was parsed", 214);
                                  return acc
                                } else if (scrut2 instanceof Tree.Error.class) {
                                  tmp161 = Parser.tracer.print("cannot parse more", 217);
                                  return acc
                                } else {
                                  rhs = scrut2;
                                  tmp162 = Tree.summary(rhs);
                                  tmp163 = "parsed " + tmp162;
                                  tmp164 = Parser.tracer.print(tmp163, 220);
                                  tmp165 = parseRule(innerPrec$_, rest);
                                  restRes = tmp165;
                                  tmp166 = runtime.safeCall(process(rhs, restRes));
                                  tmp167 = infix.process(acc, tmp166);
                                  return exprCont(tmp167, prec, options)
                                }
                              } else {
                                tmp168 = "the outer precedence is less than " + prec;
                                doTemp4 = Parser.tracer.print(tmp168, 223);
                                return acc
                              }
                            } else {
                              throw new globalThis.Error("match error");
                            }
                          } else if (scrut instanceof Option.None.class) {
                            tmp169 = "cannot consume " + token1;
                            tmp170 = Parser.tracer.print(tmp169, 226);
                            return acc
                          } else {
                            throw new globalThis.Error("match error");
                          }
                        }
                      } else {
                        doTemp2 = Parser.tracer.print("not a keyword", 205);
                        token1 = param01;
                        scrut = infix.rule.refChoice;
                        if (scrut instanceof Option.Some.class) {
                          param02 = scrut.value;
                          if (param02 instanceof ParseRule.Choice.Ref.class) {
                            param03 = param02.kind;
                            param12 = param02.process;
                            param2 = param02.outerPrec;
                            param3 = param02.innerPrec;
                            param4 = param02.rest;
                            kind = param03;
                            process = param12;
                            outerPrec = param2;
                            innerPrec = param3;
                            rest = param4;
                            tmp171 = "found reference to " + kind;
                            tmp172 = tmp171 + " with outerPrec = ";
                            tmp173 = tmp172 + outerPrec;
                            doTemp3 = Parser.tracer.print(tmp173, 208);
                            outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                            innerPrec$_ = Option.getOrElse(innerPrec, outerPrec$_);
                            scrut1 = outerPrec$_ > prec;
                            if (scrut1 === true) {
                              tmp174 = Option.getOrElse(innerPrec, outerPrec$_);
                              scrut2 = parseKind(kind, tmp174);
                              if (scrut2 instanceof Tree.Empty.class) {
                                tmp175 = Parser.tracer.print("nothing was parsed", 214);
                                return acc
                              } else if (scrut2 instanceof Tree.Error.class) {
                                tmp176 = Parser.tracer.print("cannot parse more", 217);
                                return acc
                              } else {
                                rhs = scrut2;
                                tmp177 = Tree.summary(rhs);
                                tmp178 = "parsed " + tmp177;
                                tmp179 = Parser.tracer.print(tmp178, 220);
                                tmp180 = parseRule(innerPrec$_, rest);
                                restRes = tmp180;
                                tmp181 = runtime.safeCall(process(rhs, restRes));
                                tmp182 = infix.process(acc, tmp181);
                                return exprCont(tmp182, prec, options)
                              }
                            } else {
                              tmp183 = "the outer precedence is less than " + prec;
                              doTemp4 = Parser.tracer.print(tmp183, 223);
                              return acc
                            }
                          } else {
                            throw new globalThis.Error("match error");
                          }
                        } else if (scrut instanceof Option.None.class) {
                          tmp184 = "cannot consume " + token1;
                          tmp185 = Parser.tracer.print(tmp184, 226);
                          return acc
                        } else {
                          throw new globalThis.Error("match error");
                        }
                      }
                    } else {
                      doTemp2 = Parser.tracer.print("not a keyword", 205);
                      token1 = param01;
                      scrut = infix.rule.refChoice;
                      if (scrut instanceof Option.Some.class) {
                        param02 = scrut.value;
                        if (param02 instanceof ParseRule.Choice.Ref.class) {
                          param03 = param02.kind;
                          param12 = param02.process;
                          param2 = param02.outerPrec;
                          param3 = param02.innerPrec;
                          param4 = param02.rest;
                          kind = param03;
                          process = param12;
                          outerPrec = param2;
                          innerPrec = param3;
                          rest = param4;
                          tmp186 = "found reference to " + kind;
                          tmp187 = tmp186 + " with outerPrec = ";
                          tmp188 = tmp187 + outerPrec;
                          doTemp3 = Parser.tracer.print(tmp188, 208);
                          outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                          innerPrec$_ = Option.getOrElse(innerPrec, outerPrec$_);
                          scrut1 = outerPrec$_ > prec;
                          if (scrut1 === true) {
                            tmp189 = Option.getOrElse(innerPrec, outerPrec$_);
                            scrut2 = parseKind(kind, tmp189);
                            if (scrut2 instanceof Tree.Empty.class) {
                              tmp190 = Parser.tracer.print("nothing was parsed", 214);
                              return acc
                            } else if (scrut2 instanceof Tree.Error.class) {
                              tmp191 = Parser.tracer.print("cannot parse more", 217);
                              return acc
                            } else {
                              rhs = scrut2;
                              tmp192 = Tree.summary(rhs);
                              tmp193 = "parsed " + tmp192;
                              tmp194 = Parser.tracer.print(tmp193, 220);
                              tmp195 = parseRule(innerPrec$_, rest);
                              restRes = tmp195;
                              tmp196 = runtime.safeCall(process(rhs, restRes));
                              tmp197 = infix.process(acc, tmp196);
                              return exprCont(tmp197, prec, options)
                            }
                          } else {
                            tmp198 = "the outer precedence is less than " + prec;
                            doTemp4 = Parser.tracer.print(tmp198, 223);
                            return acc
                          }
                        } else {
                          throw new globalThis.Error("match error");
                        }
                      } else if (scrut instanceof Option.None.class) {
                        tmp199 = "cannot consume " + token1;
                        tmp200 = Parser.tracer.print(tmp199, 226);
                        return acc
                      } else {
                        throw new globalThis.Error("match error");
                      }
                    }
                  }
                } else if (scrut10 instanceof Option.None.class) {
                  return acc
                } else {
                  tmp201 = "keyword `" + name1;
                  tmp202 = tmp201 + "` does not have infix rules";
                  doTemp8 = Parser.tracer.print(tmp202, 191);
                  name = param04;
                  if (param13 === true) {
                    scrut3 = runtime.safeCall(Precedence.Keywords.all.get(name));
                    if (scrut3 instanceof Option.None.class) {
                      scrut4 = options.allowOperators;
                      if (scrut4 === true) {
                        tmp203 = "found an operator \"" + name;
                        tmp204 = tmp203 + "\"";
                        doTemp5 = Parser.tracer.print(tmp204, 194);
                        scrut5 = Precedence.opPrecOpt(name);
                        if (scrut5 instanceof Option.Some.class) {
                          param05 = scrut5.value;
                          if (globalThis.Array.isArray(param05) && param05.length === 2) {
                            first0 = param05[0];
                            first1 = param05[1];
                            leftPrec = first0;
                            rightPrec = first1;
                            tmp205 = "leftPrec = " + leftPrec;
                            tmp206 = tmp205 + "; rightPrec = ";
                            tmp207 = tmp206 + rightPrec;
                            doTemp6 = Parser.tracer.print(tmp207, 196);
                            scrut6 = leftPrec > prec;
                            if (scrut6 === true) {
                              tmp208 = consume();
                              tmp209 = Tree.Ident(name, true);
                              op = tmp209;
                              tmp210 = expr(rightPrec, Parser.#termOptions);
                              rhs1 = tmp210;
                              tmp211 = Stack.Cons(rhs1, Stack.Nil);
                              tmp212 = Stack.Cons(acc, tmp211);
                              tmp213 = Tree.App(op, tmp212);
                              return exprCont(tmp213, prec, options)
                            } else {
                              return acc
                            }
                          } else {
                            doTemp2 = Parser.tracer.print("not a keyword", 205);
                            token1 = param01;
                            scrut = infix.rule.refChoice;
                            if (scrut instanceof Option.Some.class) {
                              param02 = scrut.value;
                              if (param02 instanceof ParseRule.Choice.Ref.class) {
                                param03 = param02.kind;
                                param12 = param02.process;
                                param2 = param02.outerPrec;
                                param3 = param02.innerPrec;
                                param4 = param02.rest;
                                kind = param03;
                                process = param12;
                                outerPrec = param2;
                                innerPrec = param3;
                                rest = param4;
                                tmp214 = "found reference to " + kind;
                                tmp215 = tmp214 + " with outerPrec = ";
                                tmp216 = tmp215 + outerPrec;
                                doTemp3 = Parser.tracer.print(tmp216, 208);
                                outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                                innerPrec$_ = Option.getOrElse(innerPrec, outerPrec$_);
                                scrut1 = outerPrec$_ > prec;
                                if (scrut1 === true) {
                                  tmp217 = Option.getOrElse(innerPrec, outerPrec$_);
                                  scrut2 = parseKind(kind, tmp217);
                                  if (scrut2 instanceof Tree.Empty.class) {
                                    tmp218 = Parser.tracer.print("nothing was parsed", 214);
                                    return acc
                                  } else if (scrut2 instanceof Tree.Error.class) {
                                    tmp219 = Parser.tracer.print("cannot parse more", 217);
                                    return acc
                                  } else {
                                    rhs = scrut2;
                                    tmp220 = Tree.summary(rhs);
                                    tmp221 = "parsed " + tmp220;
                                    tmp222 = Parser.tracer.print(tmp221, 220);
                                    tmp223 = parseRule(innerPrec$_, rest);
                                    restRes = tmp223;
                                    tmp224 = runtime.safeCall(process(rhs, restRes));
                                    tmp225 = infix.process(acc, tmp224);
                                    return exprCont(tmp225, prec, options)
                                  }
                                } else {
                                  tmp226 = "the outer precedence is less than " + prec;
                                  doTemp4 = Parser.tracer.print(tmp226, 223);
                                  return acc
                                }
                              } else {
                                throw new globalThis.Error("match error");
                              }
                            } else if (scrut instanceof Option.None.class) {
                              tmp227 = "cannot consume " + token1;
                              tmp228 = Parser.tracer.print(tmp227, 226);
                              return acc
                            } else {
                              throw new globalThis.Error("match error");
                            }
                          }
                        } else {
                          doTemp2 = Parser.tracer.print("not a keyword", 205);
                          token1 = param01;
                          scrut = infix.rule.refChoice;
                          if (scrut instanceof Option.Some.class) {
                            param02 = scrut.value;
                            if (param02 instanceof ParseRule.Choice.Ref.class) {
                              param03 = param02.kind;
                              param12 = param02.process;
                              param2 = param02.outerPrec;
                              param3 = param02.innerPrec;
                              param4 = param02.rest;
                              kind = param03;
                              process = param12;
                              outerPrec = param2;
                              innerPrec = param3;
                              rest = param4;
                              tmp229 = "found reference to " + kind;
                              tmp230 = tmp229 + " with outerPrec = ";
                              tmp231 = tmp230 + outerPrec;
                              doTemp3 = Parser.tracer.print(tmp231, 208);
                              outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                              innerPrec$_ = Option.getOrElse(innerPrec, outerPrec$_);
                              scrut1 = outerPrec$_ > prec;
                              if (scrut1 === true) {
                                tmp232 = Option.getOrElse(innerPrec, outerPrec$_);
                                scrut2 = parseKind(kind, tmp232);
                                if (scrut2 instanceof Tree.Empty.class) {
                                  tmp233 = Parser.tracer.print("nothing was parsed", 214);
                                  return acc
                                } else if (scrut2 instanceof Tree.Error.class) {
                                  tmp234 = Parser.tracer.print("cannot parse more", 217);
                                  return acc
                                } else {
                                  rhs = scrut2;
                                  tmp235 = Tree.summary(rhs);
                                  tmp236 = "parsed " + tmp235;
                                  tmp237 = Parser.tracer.print(tmp236, 220);
                                  tmp238 = parseRule(innerPrec$_, rest);
                                  restRes = tmp238;
                                  tmp239 = runtime.safeCall(process(rhs, restRes));
                                  tmp240 = infix.process(acc, tmp239);
                                  return exprCont(tmp240, prec, options)
                                }
                              } else {
                                tmp241 = "the outer precedence is less than " + prec;
                                doTemp4 = Parser.tracer.print(tmp241, 223);
                                return acc
                              }
                            } else {
                              throw new globalThis.Error("match error");
                            }
                          } else if (scrut instanceof Option.None.class) {
                            tmp242 = "cannot consume " + token1;
                            tmp243 = Parser.tracer.print(tmp242, 226);
                            return acc
                          } else {
                            throw new globalThis.Error("match error");
                          }
                        }
                      } else {
                        doTemp2 = Parser.tracer.print("not a keyword", 205);
                        token1 = param01;
                        scrut = infix.rule.refChoice;
                        if (scrut instanceof Option.Some.class) {
                          param02 = scrut.value;
                          if (param02 instanceof ParseRule.Choice.Ref.class) {
                            param03 = param02.kind;
                            param12 = param02.process;
                            param2 = param02.outerPrec;
                            param3 = param02.innerPrec;
                            param4 = param02.rest;
                            kind = param03;
                            process = param12;
                            outerPrec = param2;
                            innerPrec = param3;
                            rest = param4;
                            tmp244 = "found reference to " + kind;
                            tmp245 = tmp244 + " with outerPrec = ";
                            tmp246 = tmp245 + outerPrec;
                            doTemp3 = Parser.tracer.print(tmp246, 208);
                            outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                            innerPrec$_ = Option.getOrElse(innerPrec, outerPrec$_);
                            scrut1 = outerPrec$_ > prec;
                            if (scrut1 === true) {
                              tmp247 = Option.getOrElse(innerPrec, outerPrec$_);
                              scrut2 = parseKind(kind, tmp247);
                              if (scrut2 instanceof Tree.Empty.class) {
                                tmp248 = Parser.tracer.print("nothing was parsed", 214);
                                return acc
                              } else if (scrut2 instanceof Tree.Error.class) {
                                tmp249 = Parser.tracer.print("cannot parse more", 217);
                                return acc
                              } else {
                                rhs = scrut2;
                                tmp250 = Tree.summary(rhs);
                                tmp251 = "parsed " + tmp250;
                                tmp252 = Parser.tracer.print(tmp251, 220);
                                tmp253 = parseRule(innerPrec$_, rest);
                                restRes = tmp253;
                                tmp254 = runtime.safeCall(process(rhs, restRes));
                                tmp255 = infix.process(acc, tmp254);
                                return exprCont(tmp255, prec, options)
                              }
                            } else {
                              tmp256 = "the outer precedence is less than " + prec;
                              doTemp4 = Parser.tracer.print(tmp256, 223);
                              return acc
                            }
                          } else {
                            throw new globalThis.Error("match error");
                          }
                        } else if (scrut instanceof Option.None.class) {
                          tmp257 = "cannot consume " + token1;
                          tmp258 = Parser.tracer.print(tmp257, 226);
                          return acc
                        } else {
                          throw new globalThis.Error("match error");
                        }
                      }
                    } else {
                      doTemp2 = Parser.tracer.print("not a keyword", 205);
                      token1 = param01;
                      scrut = infix.rule.refChoice;
                      if (scrut instanceof Option.Some.class) {
                        param02 = scrut.value;
                        if (param02 instanceof ParseRule.Choice.Ref.class) {
                          param03 = param02.kind;
                          param12 = param02.process;
                          param2 = param02.outerPrec;
                          param3 = param02.innerPrec;
                          param4 = param02.rest;
                          kind = param03;
                          process = param12;
                          outerPrec = param2;
                          innerPrec = param3;
                          rest = param4;
                          tmp259 = "found reference to " + kind;
                          tmp260 = tmp259 + " with outerPrec = ";
                          tmp261 = tmp260 + outerPrec;
                          doTemp3 = Parser.tracer.print(tmp261, 208);
                          outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                          innerPrec$_ = Option.getOrElse(innerPrec, outerPrec$_);
                          scrut1 = outerPrec$_ > prec;
                          if (scrut1 === true) {
                            tmp262 = Option.getOrElse(innerPrec, outerPrec$_);
                            scrut2 = parseKind(kind, tmp262);
                            if (scrut2 instanceof Tree.Empty.class) {
                              tmp263 = Parser.tracer.print("nothing was parsed", 214);
                              return acc
                            } else if (scrut2 instanceof Tree.Error.class) {
                              tmp264 = Parser.tracer.print("cannot parse more", 217);
                              return acc
                            } else {
                              rhs = scrut2;
                              tmp265 = Tree.summary(rhs);
                              tmp266 = "parsed " + tmp265;
                              tmp267 = Parser.tracer.print(tmp266, 220);
                              tmp268 = parseRule(innerPrec$_, rest);
                              restRes = tmp268;
                              tmp269 = runtime.safeCall(process(rhs, restRes));
                              tmp270 = infix.process(acc, tmp269);
                              return exprCont(tmp270, prec, options)
                            }
                          } else {
                            tmp271 = "the outer precedence is less than " + prec;
                            doTemp4 = Parser.tracer.print(tmp271, 223);
                            return acc
                          }
                        } else {
                          throw new globalThis.Error("match error");
                        }
                      } else if (scrut instanceof Option.None.class) {
                        tmp272 = "cannot consume " + token1;
                        tmp273 = Parser.tracer.print(tmp272, 226);
                        return acc
                      } else {
                        throw new globalThis.Error("match error");
                      }
                    }
                  } else {
                    doTemp2 = Parser.tracer.print("not a keyword", 205);
                    token1 = param01;
                    scrut = infix.rule.refChoice;
                    if (scrut instanceof Option.Some.class) {
                      param02 = scrut.value;
                      if (param02 instanceof ParseRule.Choice.Ref.class) {
                        param03 = param02.kind;
                        param12 = param02.process;
                        param2 = param02.outerPrec;
                        param3 = param02.innerPrec;
                        param4 = param02.rest;
                        kind = param03;
                        process = param12;
                        outerPrec = param2;
                        innerPrec = param3;
                        rest = param4;
                        tmp274 = "found reference to " + kind;
                        tmp275 = tmp274 + " with outerPrec = ";
                        tmp276 = tmp275 + outerPrec;
                        doTemp3 = Parser.tracer.print(tmp276, 208);
                        outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                        innerPrec$_ = Option.getOrElse(innerPrec, outerPrec$_);
                        scrut1 = outerPrec$_ > prec;
                        if (scrut1 === true) {
                          tmp277 = Option.getOrElse(innerPrec, outerPrec$_);
                          scrut2 = parseKind(kind, tmp277);
                          if (scrut2 instanceof Tree.Empty.class) {
                            tmp278 = Parser.tracer.print("nothing was parsed", 214);
                            return acc
                          } else if (scrut2 instanceof Tree.Error.class) {
                            tmp279 = Parser.tracer.print("cannot parse more", 217);
                            return acc
                          } else {
                            rhs = scrut2;
                            tmp280 = Tree.summary(rhs);
                            tmp281 = "parsed " + tmp280;
                            tmp282 = Parser.tracer.print(tmp281, 220);
                            tmp283 = parseRule(innerPrec$_, rest);
                            restRes = tmp283;
                            tmp284 = runtime.safeCall(process(rhs, restRes));
                            tmp285 = infix.process(acc, tmp284);
                            return exprCont(tmp285, prec, options)
                          }
                        } else {
                          tmp286 = "the outer precedence is less than " + prec;
                          doTemp4 = Parser.tracer.print(tmp286, 223);
                          return acc
                        }
                      } else {
                        throw new globalThis.Error("match error");
                      }
                    } else if (scrut instanceof Option.None.class) {
                      tmp287 = "cannot consume " + token1;
                      tmp288 = Parser.tracer.print(tmp287, 226);
                      return acc
                    } else {
                      throw new globalThis.Error("match error");
                    }
                  }
                }
              } else {
                tmp289 = "keyword `" + name1;
                tmp290 = tmp289 + "` does not have infix rules";
                doTemp8 = Parser.tracer.print(tmp290, 191);
                name = param04;
                if (param13 === true) {
                  scrut3 = runtime.safeCall(Precedence.Keywords.all.get(name));
                  if (scrut3 instanceof Option.None.class) {
                    scrut4 = options.allowOperators;
                    if (scrut4 === true) {
                      tmp291 = "found an operator \"" + name;
                      tmp292 = tmp291 + "\"";
                      doTemp5 = Parser.tracer.print(tmp292, 194);
                      scrut5 = Precedence.opPrecOpt(name);
                      if (scrut5 instanceof Option.Some.class) {
                        param05 = scrut5.value;
                        if (globalThis.Array.isArray(param05) && param05.length === 2) {
                          first0 = param05[0];
                          first1 = param05[1];
                          leftPrec = first0;
                          rightPrec = first1;
                          tmp293 = "leftPrec = " + leftPrec;
                          tmp294 = tmp293 + "; rightPrec = ";
                          tmp295 = tmp294 + rightPrec;
                          doTemp6 = Parser.tracer.print(tmp295, 196);
                          scrut6 = leftPrec > prec;
                          if (scrut6 === true) {
                            tmp296 = consume();
                            tmp297 = Tree.Ident(name, true);
                            op = tmp297;
                            tmp298 = expr(rightPrec, Parser.#termOptions);
                            rhs1 = tmp298;
                            tmp299 = Stack.Cons(rhs1, Stack.Nil);
                            tmp300 = Stack.Cons(acc, tmp299);
                            tmp301 = Tree.App(op, tmp300);
                            return exprCont(tmp301, prec, options)
                          } else {
                            return acc
                          }
                        } else {
                          doTemp2 = Parser.tracer.print("not a keyword", 205);
                          token1 = param01;
                          scrut = infix.rule.refChoice;
                          if (scrut instanceof Option.Some.class) {
                            param02 = scrut.value;
                            if (param02 instanceof ParseRule.Choice.Ref.class) {
                              param03 = param02.kind;
                              param12 = param02.process;
                              param2 = param02.outerPrec;
                              param3 = param02.innerPrec;
                              param4 = param02.rest;
                              kind = param03;
                              process = param12;
                              outerPrec = param2;
                              innerPrec = param3;
                              rest = param4;
                              tmp302 = "found reference to " + kind;
                              tmp303 = tmp302 + " with outerPrec = ";
                              tmp304 = tmp303 + outerPrec;
                              doTemp3 = Parser.tracer.print(tmp304, 208);
                              outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                              innerPrec$_ = Option.getOrElse(innerPrec, outerPrec$_);
                              scrut1 = outerPrec$_ > prec;
                              if (scrut1 === true) {
                                tmp305 = Option.getOrElse(innerPrec, outerPrec$_);
                                scrut2 = parseKind(kind, tmp305);
                                if (scrut2 instanceof Tree.Empty.class) {
                                  tmp306 = Parser.tracer.print("nothing was parsed", 214);
                                  return acc
                                } else if (scrut2 instanceof Tree.Error.class) {
                                  tmp307 = Parser.tracer.print("cannot parse more", 217);
                                  return acc
                                } else {
                                  rhs = scrut2;
                                  tmp308 = Tree.summary(rhs);
                                  tmp309 = "parsed " + tmp308;
                                  tmp310 = Parser.tracer.print(tmp309, 220);
                                  tmp311 = parseRule(innerPrec$_, rest);
                                  restRes = tmp311;
                                  tmp312 = runtime.safeCall(process(rhs, restRes));
                                  tmp313 = infix.process(acc, tmp312);
                                  return exprCont(tmp313, prec, options)
                                }
                              } else {
                                tmp314 = "the outer precedence is less than " + prec;
                                doTemp4 = Parser.tracer.print(tmp314, 223);
                                return acc
                              }
                            } else {
                              throw new globalThis.Error("match error");
                            }
                          } else if (scrut instanceof Option.None.class) {
                            tmp315 = "cannot consume " + token1;
                            tmp316 = Parser.tracer.print(tmp315, 226);
                            return acc
                          } else {
                            throw new globalThis.Error("match error");
                          }
                        }
                      } else {
                        doTemp2 = Parser.tracer.print("not a keyword", 205);
                        token1 = param01;
                        scrut = infix.rule.refChoice;
                        if (scrut instanceof Option.Some.class) {
                          param02 = scrut.value;
                          if (param02 instanceof ParseRule.Choice.Ref.class) {
                            param03 = param02.kind;
                            param12 = param02.process;
                            param2 = param02.outerPrec;
                            param3 = param02.innerPrec;
                            param4 = param02.rest;
                            kind = param03;
                            process = param12;
                            outerPrec = param2;
                            innerPrec = param3;
                            rest = param4;
                            tmp317 = "found reference to " + kind;
                            tmp318 = tmp317 + " with outerPrec = ";
                            tmp319 = tmp318 + outerPrec;
                            doTemp3 = Parser.tracer.print(tmp319, 208);
                            outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                            innerPrec$_ = Option.getOrElse(innerPrec, outerPrec$_);
                            scrut1 = outerPrec$_ > prec;
                            if (scrut1 === true) {
                              tmp320 = Option.getOrElse(innerPrec, outerPrec$_);
                              scrut2 = parseKind(kind, tmp320);
                              if (scrut2 instanceof Tree.Empty.class) {
                                tmp321 = Parser.tracer.print("nothing was parsed", 214);
                                return acc
                              } else if (scrut2 instanceof Tree.Error.class) {
                                tmp322 = Parser.tracer.print("cannot parse more", 217);
                                return acc
                              } else {
                                rhs = scrut2;
                                tmp323 = Tree.summary(rhs);
                                tmp324 = "parsed " + tmp323;
                                tmp325 = Parser.tracer.print(tmp324, 220);
                                tmp326 = parseRule(innerPrec$_, rest);
                                restRes = tmp326;
                                tmp327 = runtime.safeCall(process(rhs, restRes));
                                tmp328 = infix.process(acc, tmp327);
                                return exprCont(tmp328, prec, options)
                              }
                            } else {
                              tmp329 = "the outer precedence is less than " + prec;
                              doTemp4 = Parser.tracer.print(tmp329, 223);
                              return acc
                            }
                          } else {
                            throw new globalThis.Error("match error");
                          }
                        } else if (scrut instanceof Option.None.class) {
                          tmp330 = "cannot consume " + token1;
                          tmp331 = Parser.tracer.print(tmp330, 226);
                          return acc
                        } else {
                          throw new globalThis.Error("match error");
                        }
                      }
                    } else {
                      doTemp2 = Parser.tracer.print("not a keyword", 205);
                      token1 = param01;
                      scrut = infix.rule.refChoice;
                      if (scrut instanceof Option.Some.class) {
                        param02 = scrut.value;
                        if (param02 instanceof ParseRule.Choice.Ref.class) {
                          param03 = param02.kind;
                          param12 = param02.process;
                          param2 = param02.outerPrec;
                          param3 = param02.innerPrec;
                          param4 = param02.rest;
                          kind = param03;
                          process = param12;
                          outerPrec = param2;
                          innerPrec = param3;
                          rest = param4;
                          tmp332 = "found reference to " + kind;
                          tmp333 = tmp332 + " with outerPrec = ";
                          tmp334 = tmp333 + outerPrec;
                          doTemp3 = Parser.tracer.print(tmp334, 208);
                          outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                          innerPrec$_ = Option.getOrElse(innerPrec, outerPrec$_);
                          scrut1 = outerPrec$_ > prec;
                          if (scrut1 === true) {
                            tmp335 = Option.getOrElse(innerPrec, outerPrec$_);
                            scrut2 = parseKind(kind, tmp335);
                            if (scrut2 instanceof Tree.Empty.class) {
                              tmp336 = Parser.tracer.print("nothing was parsed", 214);
                              return acc
                            } else if (scrut2 instanceof Tree.Error.class) {
                              tmp337 = Parser.tracer.print("cannot parse more", 217);
                              return acc
                            } else {
                              rhs = scrut2;
                              tmp338 = Tree.summary(rhs);
                              tmp339 = "parsed " + tmp338;
                              tmp340 = Parser.tracer.print(tmp339, 220);
                              tmp341 = parseRule(innerPrec$_, rest);
                              restRes = tmp341;
                              tmp342 = runtime.safeCall(process(rhs, restRes));
                              tmp343 = infix.process(acc, tmp342);
                              return exprCont(tmp343, prec, options)
                            }
                          } else {
                            tmp344 = "the outer precedence is less than " + prec;
                            doTemp4 = Parser.tracer.print(tmp344, 223);
                            return acc
                          }
                        } else {
                          throw new globalThis.Error("match error");
                        }
                      } else if (scrut instanceof Option.None.class) {
                        tmp345 = "cannot consume " + token1;
                        tmp346 = Parser.tracer.print(tmp345, 226);
                        return acc
                      } else {
                        throw new globalThis.Error("match error");
                      }
                    }
                  } else {
                    doTemp2 = Parser.tracer.print("not a keyword", 205);
                    token1 = param01;
                    scrut = infix.rule.refChoice;
                    if (scrut instanceof Option.Some.class) {
                      param02 = scrut.value;
                      if (param02 instanceof ParseRule.Choice.Ref.class) {
                        param03 = param02.kind;
                        param12 = param02.process;
                        param2 = param02.outerPrec;
                        param3 = param02.innerPrec;
                        param4 = param02.rest;
                        kind = param03;
                        process = param12;
                        outerPrec = param2;
                        innerPrec = param3;
                        rest = param4;
                        tmp347 = "found reference to " + kind;
                        tmp348 = tmp347 + " with outerPrec = ";
                        tmp349 = tmp348 + outerPrec;
                        doTemp3 = Parser.tracer.print(tmp349, 208);
                        outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                        innerPrec$_ = Option.getOrElse(innerPrec, outerPrec$_);
                        scrut1 = outerPrec$_ > prec;
                        if (scrut1 === true) {
                          tmp350 = Option.getOrElse(innerPrec, outerPrec$_);
                          scrut2 = parseKind(kind, tmp350);
                          if (scrut2 instanceof Tree.Empty.class) {
                            tmp351 = Parser.tracer.print("nothing was parsed", 214);
                            return acc
                          } else if (scrut2 instanceof Tree.Error.class) {
                            tmp352 = Parser.tracer.print("cannot parse more", 217);
                            return acc
                          } else {
                            rhs = scrut2;
                            tmp353 = Tree.summary(rhs);
                            tmp354 = "parsed " + tmp353;
                            tmp355 = Parser.tracer.print(tmp354, 220);
                            tmp356 = parseRule(innerPrec$_, rest);
                            restRes = tmp356;
                            tmp357 = runtime.safeCall(process(rhs, restRes));
                            tmp358 = infix.process(acc, tmp357);
                            return exprCont(tmp358, prec, options)
                          }
                        } else {
                          tmp359 = "the outer precedence is less than " + prec;
                          doTemp4 = Parser.tracer.print(tmp359, 223);
                          return acc
                        }
                      } else {
                        throw new globalThis.Error("match error");
                      }
                    } else if (scrut instanceof Option.None.class) {
                      tmp360 = "cannot consume " + token1;
                      tmp361 = Parser.tracer.print(tmp360, 226);
                      return acc
                    } else {
                      throw new globalThis.Error("match error");
                    }
                  }
                } else {
                  doTemp2 = Parser.tracer.print("not a keyword", 205);
                  token1 = param01;
                  scrut = infix.rule.refChoice;
                  if (scrut instanceof Option.Some.class) {
                    param02 = scrut.value;
                    if (param02 instanceof ParseRule.Choice.Ref.class) {
                      param03 = param02.kind;
                      param12 = param02.process;
                      param2 = param02.outerPrec;
                      param3 = param02.innerPrec;
                      param4 = param02.rest;
                      kind = param03;
                      process = param12;
                      outerPrec = param2;
                      innerPrec = param3;
                      rest = param4;
                      tmp362 = "found reference to " + kind;
                      tmp363 = tmp362 + " with outerPrec = ";
                      tmp364 = tmp363 + outerPrec;
                      doTemp3 = Parser.tracer.print(tmp364, 208);
                      outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                      innerPrec$_ = Option.getOrElse(innerPrec, outerPrec$_);
                      scrut1 = outerPrec$_ > prec;
                      if (scrut1 === true) {
                        tmp365 = Option.getOrElse(innerPrec, outerPrec$_);
                        scrut2 = parseKind(kind, tmp365);
                        if (scrut2 instanceof Tree.Empty.class) {
                          tmp366 = Parser.tracer.print("nothing was parsed", 214);
                          return acc
                        } else if (scrut2 instanceof Tree.Error.class) {
                          tmp367 = Parser.tracer.print("cannot parse more", 217);
                          return acc
                        } else {
                          rhs = scrut2;
                          tmp368 = Tree.summary(rhs);
                          tmp369 = "parsed " + tmp368;
                          tmp370 = Parser.tracer.print(tmp369, 220);
                          tmp371 = parseRule(innerPrec$_, rest);
                          restRes = tmp371;
                          tmp372 = runtime.safeCall(process(rhs, restRes));
                          tmp373 = infix.process(acc, tmp372);
                          return exprCont(tmp373, prec, options)
                        }
                      } else {
                        tmp374 = "the outer precedence is less than " + prec;
                        doTemp4 = Parser.tracer.print(tmp374, 223);
                        return acc
                      }
                    } else {
                      throw new globalThis.Error("match error");
                    }
                  } else if (scrut instanceof Option.None.class) {
                    tmp375 = "cannot consume " + token1;
                    tmp376 = Parser.tracer.print(tmp375, 226);
                    return acc
                  } else {
                    throw new globalThis.Error("match error");
                  }
                }
              }
            } else {
              tmp377 = "keyword `" + name1;
              tmp378 = tmp377 + "` does not have infix rules";
              doTemp8 = Parser.tracer.print(tmp378, 191);
              name = param04;
              if (param13 === true) {
                scrut3 = runtime.safeCall(Precedence.Keywords.all.get(name));
                if (scrut3 instanceof Option.None.class) {
                  scrut4 = options.allowOperators;
                  if (scrut4 === true) {
                    tmp379 = "found an operator \"" + name;
                    tmp380 = tmp379 + "\"";
                    doTemp5 = Parser.tracer.print(tmp380, 194);
                    scrut5 = Precedence.opPrecOpt(name);
                    if (scrut5 instanceof Option.Some.class) {
                      param05 = scrut5.value;
                      if (globalThis.Array.isArray(param05) && param05.length === 2) {
                        first0 = param05[0];
                        first1 = param05[1];
                        leftPrec = first0;
                        rightPrec = first1;
                        tmp381 = "leftPrec = " + leftPrec;
                        tmp382 = tmp381 + "; rightPrec = ";
                        tmp383 = tmp382 + rightPrec;
                        doTemp6 = Parser.tracer.print(tmp383, 196);
                        scrut6 = leftPrec > prec;
                        if (scrut6 === true) {
                          tmp384 = consume();
                          tmp385 = Tree.Ident(name, true);
                          op = tmp385;
                          tmp386 = expr(rightPrec, Parser.#termOptions);
                          rhs1 = tmp386;
                          tmp387 = Stack.Cons(rhs1, Stack.Nil);
                          tmp388 = Stack.Cons(acc, tmp387);
                          tmp389 = Tree.App(op, tmp388);
                          return exprCont(tmp389, prec, options)
                        } else {
                          return acc
                        }
                      } else {
                        doTemp2 = Parser.tracer.print("not a keyword", 205);
                        token1 = param01;
                        scrut = infix.rule.refChoice;
                        if (scrut instanceof Option.Some.class) {
                          param02 = scrut.value;
                          if (param02 instanceof ParseRule.Choice.Ref.class) {
                            param03 = param02.kind;
                            param12 = param02.process;
                            param2 = param02.outerPrec;
                            param3 = param02.innerPrec;
                            param4 = param02.rest;
                            kind = param03;
                            process = param12;
                            outerPrec = param2;
                            innerPrec = param3;
                            rest = param4;
                            tmp390 = "found reference to " + kind;
                            tmp391 = tmp390 + " with outerPrec = ";
                            tmp392 = tmp391 + outerPrec;
                            doTemp3 = Parser.tracer.print(tmp392, 208);
                            outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                            innerPrec$_ = Option.getOrElse(innerPrec, outerPrec$_);
                            scrut1 = outerPrec$_ > prec;
                            if (scrut1 === true) {
                              tmp393 = Option.getOrElse(innerPrec, outerPrec$_);
                              scrut2 = parseKind(kind, tmp393);
                              if (scrut2 instanceof Tree.Empty.class) {
                                tmp394 = Parser.tracer.print("nothing was parsed", 214);
                                return acc
                              } else if (scrut2 instanceof Tree.Error.class) {
                                tmp395 = Parser.tracer.print("cannot parse more", 217);
                                return acc
                              } else {
                                rhs = scrut2;
                                tmp396 = Tree.summary(rhs);
                                tmp397 = "parsed " + tmp396;
                                tmp398 = Parser.tracer.print(tmp397, 220);
                                tmp399 = parseRule(innerPrec$_, rest);
                                restRes = tmp399;
                                tmp400 = runtime.safeCall(process(rhs, restRes));
                                tmp401 = infix.process(acc, tmp400);
                                return exprCont(tmp401, prec, options)
                              }
                            } else {
                              tmp402 = "the outer precedence is less than " + prec;
                              doTemp4 = Parser.tracer.print(tmp402, 223);
                              return acc
                            }
                          } else {
                            throw new globalThis.Error("match error");
                          }
                        } else if (scrut instanceof Option.None.class) {
                          tmp403 = "cannot consume " + token1;
                          tmp404 = Parser.tracer.print(tmp403, 226);
                          return acc
                        } else {
                          throw new globalThis.Error("match error");
                        }
                      }
                    } else {
                      doTemp2 = Parser.tracer.print("not a keyword", 205);
                      token1 = param01;
                      scrut = infix.rule.refChoice;
                      if (scrut instanceof Option.Some.class) {
                        param02 = scrut.value;
                        if (param02 instanceof ParseRule.Choice.Ref.class) {
                          param03 = param02.kind;
                          param12 = param02.process;
                          param2 = param02.outerPrec;
                          param3 = param02.innerPrec;
                          param4 = param02.rest;
                          kind = param03;
                          process = param12;
                          outerPrec = param2;
                          innerPrec = param3;
                          rest = param4;
                          tmp405 = "found reference to " + kind;
                          tmp406 = tmp405 + " with outerPrec = ";
                          tmp407 = tmp406 + outerPrec;
                          doTemp3 = Parser.tracer.print(tmp407, 208);
                          outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                          innerPrec$_ = Option.getOrElse(innerPrec, outerPrec$_);
                          scrut1 = outerPrec$_ > prec;
                          if (scrut1 === true) {
                            tmp408 = Option.getOrElse(innerPrec, outerPrec$_);
                            scrut2 = parseKind(kind, tmp408);
                            if (scrut2 instanceof Tree.Empty.class) {
                              tmp409 = Parser.tracer.print("nothing was parsed", 214);
                              return acc
                            } else if (scrut2 instanceof Tree.Error.class) {
                              tmp410 = Parser.tracer.print("cannot parse more", 217);
                              return acc
                            } else {
                              rhs = scrut2;
                              tmp411 = Tree.summary(rhs);
                              tmp412 = "parsed " + tmp411;
                              tmp413 = Parser.tracer.print(tmp412, 220);
                              tmp414 = parseRule(innerPrec$_, rest);
                              restRes = tmp414;
                              tmp415 = runtime.safeCall(process(rhs, restRes));
                              tmp416 = infix.process(acc, tmp415);
                              return exprCont(tmp416, prec, options)
                            }
                          } else {
                            tmp417 = "the outer precedence is less than " + prec;
                            doTemp4 = Parser.tracer.print(tmp417, 223);
                            return acc
                          }
                        } else {
                          throw new globalThis.Error("match error");
                        }
                      } else if (scrut instanceof Option.None.class) {
                        tmp418 = "cannot consume " + token1;
                        tmp419 = Parser.tracer.print(tmp418, 226);
                        return acc
                      } else {
                        throw new globalThis.Error("match error");
                      }
                    }
                  } else {
                    doTemp2 = Parser.tracer.print("not a keyword", 205);
                    token1 = param01;
                    scrut = infix.rule.refChoice;
                    if (scrut instanceof Option.Some.class) {
                      param02 = scrut.value;
                      if (param02 instanceof ParseRule.Choice.Ref.class) {
                        param03 = param02.kind;
                        param12 = param02.process;
                        param2 = param02.outerPrec;
                        param3 = param02.innerPrec;
                        param4 = param02.rest;
                        kind = param03;
                        process = param12;
                        outerPrec = param2;
                        innerPrec = param3;
                        rest = param4;
                        tmp420 = "found reference to " + kind;
                        tmp421 = tmp420 + " with outerPrec = ";
                        tmp422 = tmp421 + outerPrec;
                        doTemp3 = Parser.tracer.print(tmp422, 208);
                        outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                        innerPrec$_ = Option.getOrElse(innerPrec, outerPrec$_);
                        scrut1 = outerPrec$_ > prec;
                        if (scrut1 === true) {
                          tmp423 = Option.getOrElse(innerPrec, outerPrec$_);
                          scrut2 = parseKind(kind, tmp423);
                          if (scrut2 instanceof Tree.Empty.class) {
                            tmp424 = Parser.tracer.print("nothing was parsed", 214);
                            return acc
                          } else if (scrut2 instanceof Tree.Error.class) {
                            tmp425 = Parser.tracer.print("cannot parse more", 217);
                            return acc
                          } else {
                            rhs = scrut2;
                            tmp426 = Tree.summary(rhs);
                            tmp427 = "parsed " + tmp426;
                            tmp428 = Parser.tracer.print(tmp427, 220);
                            tmp429 = parseRule(innerPrec$_, rest);
                            restRes = tmp429;
                            tmp430 = runtime.safeCall(process(rhs, restRes));
                            tmp431 = infix.process(acc, tmp430);
                            return exprCont(tmp431, prec, options)
                          }
                        } else {
                          tmp432 = "the outer precedence is less than " + prec;
                          doTemp4 = Parser.tracer.print(tmp432, 223);
                          return acc
                        }
                      } else {
                        throw new globalThis.Error("match error");
                      }
                    } else if (scrut instanceof Option.None.class) {
                      tmp433 = "cannot consume " + token1;
                      tmp434 = Parser.tracer.print(tmp433, 226);
                      return acc
                    } else {
                      throw new globalThis.Error("match error");
                    }
                  }
                } else {
                  doTemp2 = Parser.tracer.print("not a keyword", 205);
                  token1 = param01;
                  scrut = infix.rule.refChoice;
                  if (scrut instanceof Option.Some.class) {
                    param02 = scrut.value;
                    if (param02 instanceof ParseRule.Choice.Ref.class) {
                      param03 = param02.kind;
                      param12 = param02.process;
                      param2 = param02.outerPrec;
                      param3 = param02.innerPrec;
                      param4 = param02.rest;
                      kind = param03;
                      process = param12;
                      outerPrec = param2;
                      innerPrec = param3;
                      rest = param4;
                      tmp435 = "found reference to " + kind;
                      tmp436 = tmp435 + " with outerPrec = ";
                      tmp437 = tmp436 + outerPrec;
                      doTemp3 = Parser.tracer.print(tmp437, 208);
                      outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                      innerPrec$_ = Option.getOrElse(innerPrec, outerPrec$_);
                      scrut1 = outerPrec$_ > prec;
                      if (scrut1 === true) {
                        tmp438 = Option.getOrElse(innerPrec, outerPrec$_);
                        scrut2 = parseKind(kind, tmp438);
                        if (scrut2 instanceof Tree.Empty.class) {
                          tmp439 = Parser.tracer.print("nothing was parsed", 214);
                          return acc
                        } else if (scrut2 instanceof Tree.Error.class) {
                          tmp440 = Parser.tracer.print("cannot parse more", 217);
                          return acc
                        } else {
                          rhs = scrut2;
                          tmp441 = Tree.summary(rhs);
                          tmp442 = "parsed " + tmp441;
                          tmp443 = Parser.tracer.print(tmp442, 220);
                          tmp444 = parseRule(innerPrec$_, rest);
                          restRes = tmp444;
                          tmp445 = runtime.safeCall(process(rhs, restRes));
                          tmp446 = infix.process(acc, tmp445);
                          return exprCont(tmp446, prec, options)
                        }
                      } else {
                        tmp447 = "the outer precedence is less than " + prec;
                        doTemp4 = Parser.tracer.print(tmp447, 223);
                        return acc
                      }
                    } else {
                      throw new globalThis.Error("match error");
                    }
                  } else if (scrut instanceof Option.None.class) {
                    tmp448 = "cannot consume " + token1;
                    tmp449 = Parser.tracer.print(tmp448, 226);
                    return acc
                  } else {
                    throw new globalThis.Error("match error");
                  }
                }
              } else {
                doTemp2 = Parser.tracer.print("not a keyword", 205);
                token1 = param01;
                scrut = infix.rule.refChoice;
                if (scrut instanceof Option.Some.class) {
                  param02 = scrut.value;
                  if (param02 instanceof ParseRule.Choice.Ref.class) {
                    param03 = param02.kind;
                    param12 = param02.process;
                    param2 = param02.outerPrec;
                    param3 = param02.innerPrec;
                    param4 = param02.rest;
                    kind = param03;
                    process = param12;
                    outerPrec = param2;
                    innerPrec = param3;
                    rest = param4;
                    tmp450 = "found reference to " + kind;
                    tmp451 = tmp450 + " with outerPrec = ";
                    tmp452 = tmp451 + outerPrec;
                    doTemp3 = Parser.tracer.print(tmp452, 208);
                    outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                    innerPrec$_ = Option.getOrElse(innerPrec, outerPrec$_);
                    scrut1 = outerPrec$_ > prec;
                    if (scrut1 === true) {
                      tmp453 = Option.getOrElse(innerPrec, outerPrec$_);
                      scrut2 = parseKind(kind, tmp453);
                      if (scrut2 instanceof Tree.Empty.class) {
                        tmp454 = Parser.tracer.print("nothing was parsed", 214);
                        return acc
                      } else if (scrut2 instanceof Tree.Error.class) {
                        tmp455 = Parser.tracer.print("cannot parse more", 217);
                        return acc
                      } else {
                        rhs = scrut2;
                        tmp456 = Tree.summary(rhs);
                        tmp457 = "parsed " + tmp456;
                        tmp458 = Parser.tracer.print(tmp457, 220);
                        tmp459 = parseRule(innerPrec$_, rest);
                        restRes = tmp459;
                        tmp460 = runtime.safeCall(process(rhs, restRes));
                        tmp461 = infix.process(acc, tmp460);
                        return exprCont(tmp461, prec, options)
                      }
                    } else {
                      tmp462 = "the outer precedence is less than " + prec;
                      doTemp4 = Parser.tracer.print(tmp462, 223);
                      return acc
                    }
                  } else {
                    throw new globalThis.Error("match error");
                  }
                } else if (scrut instanceof Option.None.class) {
                  tmp463 = "cannot consume " + token1;
                  tmp464 = Parser.tracer.print(tmp463, 226);
                  return acc
                } else {
                  throw new globalThis.Error("match error");
                }
              }
            }
          } else {
            name = param04;
            if (param13 === true) {
              scrut3 = runtime.safeCall(Precedence.Keywords.all.get(name));
              if (scrut3 instanceof Option.None.class) {
                scrut4 = options.allowOperators;
                if (scrut4 === true) {
                  tmp465 = "found an operator \"" + name;
                  tmp466 = tmp465 + "\"";
                  doTemp5 = Parser.tracer.print(tmp466, 194);
                  scrut5 = Precedence.opPrecOpt(name);
                  if (scrut5 instanceof Option.Some.class) {
                    param05 = scrut5.value;
                    if (globalThis.Array.isArray(param05) && param05.length === 2) {
                      first0 = param05[0];
                      first1 = param05[1];
                      leftPrec = first0;
                      rightPrec = first1;
                      tmp467 = "leftPrec = " + leftPrec;
                      tmp468 = tmp467 + "; rightPrec = ";
                      tmp469 = tmp468 + rightPrec;
                      doTemp6 = Parser.tracer.print(tmp469, 196);
                      scrut6 = leftPrec > prec;
                      if (scrut6 === true) {
                        tmp470 = consume();
                        tmp471 = Tree.Ident(name, true);
                        op = tmp471;
                        tmp472 = expr(rightPrec, Parser.#termOptions);
                        rhs1 = tmp472;
                        tmp473 = Stack.Cons(rhs1, Stack.Nil);
                        tmp474 = Stack.Cons(acc, tmp473);
                        tmp475 = Tree.App(op, tmp474);
                        return exprCont(tmp475, prec, options)
                      } else {
                        return acc
                      }
                    } else {
                      doTemp2 = Parser.tracer.print("not a keyword", 205);
                      token1 = param01;
                      scrut = infix.rule.refChoice;
                      if (scrut instanceof Option.Some.class) {
                        param02 = scrut.value;
                        if (param02 instanceof ParseRule.Choice.Ref.class) {
                          param03 = param02.kind;
                          param12 = param02.process;
                          param2 = param02.outerPrec;
                          param3 = param02.innerPrec;
                          param4 = param02.rest;
                          kind = param03;
                          process = param12;
                          outerPrec = param2;
                          innerPrec = param3;
                          rest = param4;
                          tmp476 = "found reference to " + kind;
                          tmp477 = tmp476 + " with outerPrec = ";
                          tmp478 = tmp477 + outerPrec;
                          doTemp3 = Parser.tracer.print(tmp478, 208);
                          outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                          innerPrec$_ = Option.getOrElse(innerPrec, outerPrec$_);
                          scrut1 = outerPrec$_ > prec;
                          if (scrut1 === true) {
                            tmp479 = Option.getOrElse(innerPrec, outerPrec$_);
                            scrut2 = parseKind(kind, tmp479);
                            if (scrut2 instanceof Tree.Empty.class) {
                              tmp480 = Parser.tracer.print("nothing was parsed", 214);
                              return acc
                            } else if (scrut2 instanceof Tree.Error.class) {
                              tmp481 = Parser.tracer.print("cannot parse more", 217);
                              return acc
                            } else {
                              rhs = scrut2;
                              tmp482 = Tree.summary(rhs);
                              tmp483 = "parsed " + tmp482;
                              tmp484 = Parser.tracer.print(tmp483, 220);
                              tmp485 = parseRule(innerPrec$_, rest);
                              restRes = tmp485;
                              tmp486 = runtime.safeCall(process(rhs, restRes));
                              tmp487 = infix.process(acc, tmp486);
                              return exprCont(tmp487, prec, options)
                            }
                          } else {
                            tmp488 = "the outer precedence is less than " + prec;
                            doTemp4 = Parser.tracer.print(tmp488, 223);
                            return acc
                          }
                        } else {
                          throw new globalThis.Error("match error");
                        }
                      } else if (scrut instanceof Option.None.class) {
                        tmp489 = "cannot consume " + token1;
                        tmp490 = Parser.tracer.print(tmp489, 226);
                        return acc
                      } else {
                        throw new globalThis.Error("match error");
                      }
                    }
                  } else {
                    doTemp2 = Parser.tracer.print("not a keyword", 205);
                    token1 = param01;
                    scrut = infix.rule.refChoice;
                    if (scrut instanceof Option.Some.class) {
                      param02 = scrut.value;
                      if (param02 instanceof ParseRule.Choice.Ref.class) {
                        param03 = param02.kind;
                        param12 = param02.process;
                        param2 = param02.outerPrec;
                        param3 = param02.innerPrec;
                        param4 = param02.rest;
                        kind = param03;
                        process = param12;
                        outerPrec = param2;
                        innerPrec = param3;
                        rest = param4;
                        tmp491 = "found reference to " + kind;
                        tmp492 = tmp491 + " with outerPrec = ";
                        tmp493 = tmp492 + outerPrec;
                        doTemp3 = Parser.tracer.print(tmp493, 208);
                        outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                        innerPrec$_ = Option.getOrElse(innerPrec, outerPrec$_);
                        scrut1 = outerPrec$_ > prec;
                        if (scrut1 === true) {
                          tmp494 = Option.getOrElse(innerPrec, outerPrec$_);
                          scrut2 = parseKind(kind, tmp494);
                          if (scrut2 instanceof Tree.Empty.class) {
                            tmp495 = Parser.tracer.print("nothing was parsed", 214);
                            return acc
                          } else if (scrut2 instanceof Tree.Error.class) {
                            tmp496 = Parser.tracer.print("cannot parse more", 217);
                            return acc
                          } else {
                            rhs = scrut2;
                            tmp497 = Tree.summary(rhs);
                            tmp498 = "parsed " + tmp497;
                            tmp499 = Parser.tracer.print(tmp498, 220);
                            tmp500 = parseRule(innerPrec$_, rest);
                            restRes = tmp500;
                            tmp501 = runtime.safeCall(process(rhs, restRes));
                            tmp502 = infix.process(acc, tmp501);
                            return exprCont(tmp502, prec, options)
                          }
                        } else {
                          tmp503 = "the outer precedence is less than " + prec;
                          doTemp4 = Parser.tracer.print(tmp503, 223);
                          return acc
                        }
                      } else {
                        throw new globalThis.Error("match error");
                      }
                    } else if (scrut instanceof Option.None.class) {
                      tmp504 = "cannot consume " + token1;
                      tmp505 = Parser.tracer.print(tmp504, 226);
                      return acc
                    } else {
                      throw new globalThis.Error("match error");
                    }
                  }
                } else {
                  doTemp2 = Parser.tracer.print("not a keyword", 205);
                  token1 = param01;
                  scrut = infix.rule.refChoice;
                  if (scrut instanceof Option.Some.class) {
                    param02 = scrut.value;
                    if (param02 instanceof ParseRule.Choice.Ref.class) {
                      param03 = param02.kind;
                      param12 = param02.process;
                      param2 = param02.outerPrec;
                      param3 = param02.innerPrec;
                      param4 = param02.rest;
                      kind = param03;
                      process = param12;
                      outerPrec = param2;
                      innerPrec = param3;
                      rest = param4;
                      tmp506 = "found reference to " + kind;
                      tmp507 = tmp506 + " with outerPrec = ";
                      tmp508 = tmp507 + outerPrec;
                      doTemp3 = Parser.tracer.print(tmp508, 208);
                      outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                      innerPrec$_ = Option.getOrElse(innerPrec, outerPrec$_);
                      scrut1 = outerPrec$_ > prec;
                      if (scrut1 === true) {
                        tmp509 = Option.getOrElse(innerPrec, outerPrec$_);
                        scrut2 = parseKind(kind, tmp509);
                        if (scrut2 instanceof Tree.Empty.class) {
                          tmp510 = Parser.tracer.print("nothing was parsed", 214);
                          return acc
                        } else if (scrut2 instanceof Tree.Error.class) {
                          tmp511 = Parser.tracer.print("cannot parse more", 217);
                          return acc
                        } else {
                          rhs = scrut2;
                          tmp512 = Tree.summary(rhs);
                          tmp513 = "parsed " + tmp512;
                          tmp514 = Parser.tracer.print(tmp513, 220);
                          tmp515 = parseRule(innerPrec$_, rest);
                          restRes = tmp515;
                          tmp516 = runtime.safeCall(process(rhs, restRes));
                          tmp517 = infix.process(acc, tmp516);
                          return exprCont(tmp517, prec, options)
                        }
                      } else {
                        tmp518 = "the outer precedence is less than " + prec;
                        doTemp4 = Parser.tracer.print(tmp518, 223);
                        return acc
                      }
                    } else {
                      throw new globalThis.Error("match error");
                    }
                  } else if (scrut instanceof Option.None.class) {
                    tmp519 = "cannot consume " + token1;
                    tmp520 = Parser.tracer.print(tmp519, 226);
                    return acc
                  } else {
                    throw new globalThis.Error("match error");
                  }
                }
              } else {
                doTemp2 = Parser.tracer.print("not a keyword", 205);
                token1 = param01;
                scrut = infix.rule.refChoice;
                if (scrut instanceof Option.Some.class) {
                  param02 = scrut.value;
                  if (param02 instanceof ParseRule.Choice.Ref.class) {
                    param03 = param02.kind;
                    param12 = param02.process;
                    param2 = param02.outerPrec;
                    param3 = param02.innerPrec;
                    param4 = param02.rest;
                    kind = param03;
                    process = param12;
                    outerPrec = param2;
                    innerPrec = param3;
                    rest = param4;
                    tmp521 = "found reference to " + kind;
                    tmp522 = tmp521 + " with outerPrec = ";
                    tmp523 = tmp522 + outerPrec;
                    doTemp3 = Parser.tracer.print(tmp523, 208);
                    outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                    innerPrec$_ = Option.getOrElse(innerPrec, outerPrec$_);
                    scrut1 = outerPrec$_ > prec;
                    if (scrut1 === true) {
                      tmp524 = Option.getOrElse(innerPrec, outerPrec$_);
                      scrut2 = parseKind(kind, tmp524);
                      if (scrut2 instanceof Tree.Empty.class) {
                        tmp525 = Parser.tracer.print("nothing was parsed", 214);
                        return acc
                      } else if (scrut2 instanceof Tree.Error.class) {
                        tmp526 = Parser.tracer.print("cannot parse more", 217);
                        return acc
                      } else {
                        rhs = scrut2;
                        tmp527 = Tree.summary(rhs);
                        tmp528 = "parsed " + tmp527;
                        tmp529 = Parser.tracer.print(tmp528, 220);
                        tmp530 = parseRule(innerPrec$_, rest);
                        restRes = tmp530;
                        tmp531 = runtime.safeCall(process(rhs, restRes));
                        tmp532 = infix.process(acc, tmp531);
                        return exprCont(tmp532, prec, options)
                      }
                    } else {
                      tmp533 = "the outer precedence is less than " + prec;
                      doTemp4 = Parser.tracer.print(tmp533, 223);
                      return acc
                    }
                  } else {
                    throw new globalThis.Error("match error");
                  }
                } else if (scrut instanceof Option.None.class) {
                  tmp534 = "cannot consume " + token1;
                  tmp535 = Parser.tracer.print(tmp534, 226);
                  return acc
                } else {
                  throw new globalThis.Error("match error");
                }
              }
            } else {
              doTemp2 = Parser.tracer.print("not a keyword", 205);
              token1 = param01;
              scrut = infix.rule.refChoice;
              if (scrut instanceof Option.Some.class) {
                param02 = scrut.value;
                if (param02 instanceof ParseRule.Choice.Ref.class) {
                  param03 = param02.kind;
                  param12 = param02.process;
                  param2 = param02.outerPrec;
                  param3 = param02.innerPrec;
                  param4 = param02.rest;
                  kind = param03;
                  process = param12;
                  outerPrec = param2;
                  innerPrec = param3;
                  rest = param4;
                  tmp536 = "found reference to " + kind;
                  tmp537 = tmp536 + " with outerPrec = ";
                  tmp538 = tmp537 + outerPrec;
                  doTemp3 = Parser.tracer.print(tmp538, 208);
                  outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                  innerPrec$_ = Option.getOrElse(innerPrec, outerPrec$_);
                  scrut1 = outerPrec$_ > prec;
                  if (scrut1 === true) {
                    tmp539 = Option.getOrElse(innerPrec, outerPrec$_);
                    scrut2 = parseKind(kind, tmp539);
                    if (scrut2 instanceof Tree.Empty.class) {
                      tmp540 = Parser.tracer.print("nothing was parsed", 214);
                      return acc
                    } else if (scrut2 instanceof Tree.Error.class) {
                      tmp541 = Parser.tracer.print("cannot parse more", 217);
                      return acc
                    } else {
                      rhs = scrut2;
                      tmp542 = Tree.summary(rhs);
                      tmp543 = "parsed " + tmp542;
                      tmp544 = Parser.tracer.print(tmp543, 220);
                      tmp545 = parseRule(innerPrec$_, rest);
                      restRes = tmp545;
                      tmp546 = runtime.safeCall(process(rhs, restRes));
                      tmp547 = infix.process(acc, tmp546);
                      return exprCont(tmp547, prec, options)
                    }
                  } else {
                    tmp548 = "the outer precedence is less than " + prec;
                    doTemp4 = Parser.tracer.print(tmp548, 223);
                    return acc
                  }
                } else {
                  throw new globalThis.Error("match error");
                }
              } else if (scrut instanceof Option.None.class) {
                tmp549 = "cannot consume " + token1;
                tmp550 = Parser.tracer.print(tmp549, 226);
                return acc
              } else {
                throw new globalThis.Error("match error");
              }
            }
          }
        } else {
          doTemp2 = Parser.tracer.print("not a keyword", 205);
          token1 = param01;
          scrut = infix.rule.refChoice;
          if (scrut instanceof Option.Some.class) {
            param02 = scrut.value;
            if (param02 instanceof ParseRule.Choice.Ref.class) {
              param03 = param02.kind;
              param12 = param02.process;
              param2 = param02.outerPrec;
              param3 = param02.innerPrec;
              param4 = param02.rest;
              kind = param03;
              process = param12;
              outerPrec = param2;
              innerPrec = param3;
              rest = param4;
              tmp551 = "found reference to " + kind;
              tmp552 = tmp551 + " with outerPrec = ";
              tmp553 = tmp552 + outerPrec;
              doTemp3 = Parser.tracer.print(tmp553, 208);
              outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
              innerPrec$_ = Option.getOrElse(innerPrec, outerPrec$_);
              scrut1 = outerPrec$_ > prec;
              if (scrut1 === true) {
                tmp554 = Option.getOrElse(innerPrec, outerPrec$_);
                scrut2 = parseKind(kind, tmp554);
                if (scrut2 instanceof Tree.Empty.class) {
                  tmp555 = Parser.tracer.print("nothing was parsed", 214);
                  return acc
                } else if (scrut2 instanceof Tree.Error.class) {
                  tmp556 = Parser.tracer.print("cannot parse more", 217);
                  return acc
                } else {
                  rhs = scrut2;
                  tmp557 = Tree.summary(rhs);
                  tmp558 = "parsed " + tmp557;
                  tmp559 = Parser.tracer.print(tmp558, 220);
                  tmp560 = parseRule(innerPrec$_, rest);
                  restRes = tmp560;
                  tmp561 = runtime.safeCall(process(rhs, restRes));
                  tmp562 = infix.process(acc, tmp561);
                  return exprCont(tmp562, prec, options)
                }
              } else {
                tmp563 = "the outer precedence is less than " + prec;
                doTemp4 = Parser.tracer.print(tmp563, 223);
                return acc
              }
            } else {
              throw new globalThis.Error("match error");
            }
          } else if (scrut instanceof Option.None.class) {
            tmp564 = "cannot consume " + token1;
            tmp565 = Parser.tracer.print(tmp564, 226);
            return acc
          } else {
            throw new globalThis.Error("match error");
          }
        }
      } else {
        doTemp2 = Parser.tracer.print("not a keyword", 205);
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
      doTemp = Parser.tracer.print(">>>>>> mod <<<<<<", 247);
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
                tmp4 = expr(0, Parser.#termOptions);
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
                  tmp11 = parseRule(0, rule);
                  return handleDirective(tmp11, acc)
                } else {
                  tmp12 = expr(0, Parser.#termOptions);
                  tmp13 = Stack.Cons(tmp12, acc);
                  return modCont(tmp13)
                }
              }
            } else {
              tmp14 = expr(0, Parser.#termOptions);
              tmp15 = Stack.Cons(tmp14, acc);
              return modCont(tmp15)
            }
          }
        } else {
          tmp16 = expr(0, Parser.#termOptions);
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
      let doTemp, param01, param11, param02, param12, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8;
      tmp3 = TokenHelpers.preview(tokens);
      tmp4 = ">>>>>> modCont <<<<<< " + tmp3;
      doTemp = Parser.tracer.print(tmp4, 269);
      if (tokens instanceof Stack.Cons.class) {
        param01 = tokens.head;
        param11 = tokens.tail;
        if (param01 instanceof Token.Identifier.class) {
          param02 = param01.name;
          param12 = param01.symbolic;
          if (param02 === ";;") {
            tmp5 = consume();
            tmp6 = mod(acc);
            return (tmp5 , tmp6)
          } else {
            tmp7 = parseRule(0, Rules.declRule);
            return handleDirective(tmp7, acc)
          }
        } else {
          tmp8 = parseRule(0, Rules.declRule);
          return handleDirective(tmp8, acc)
        }
      } else if (tokens instanceof Stack.Nil.class) {
        return Stack.reverse(acc)
      } else {
        throw new globalThis.Error("match error");
      }
    };
    counter = 0;
    lambda = (undefined, function (result) {
      let tmp3;
      tmp3 = Tree.summary(result);
      return "module >>> " + tmp3
    });
    lambda1 = (undefined, function () {
      return mod(Stack.Nil)
    });
    tmp = runtime.safeCall(Parser.tracer.trace("module <<< ", lambda, lambda1));
    tree = tmp;
    if (tokens instanceof Stack.Cons.class) {
      param0 = tokens.head;
      param1 = tokens.tail;
      token = param0;
      tmp1 = "expect EOF instead of " + token;
      message = tmp1;
      tmp2 = Parser.tracer.print(message, 282);
      return Tree.Error(tree, message)
    } else if (tokens instanceof Stack.Nil.class) {
      return tree
    } else {
      throw new globalThis.Error("match error");
    }
  }
  static toString() { return "Parser"; }
});
let Parser = Parser1; export default Parser;
