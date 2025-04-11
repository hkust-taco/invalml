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
Parser1 = class Parser {
  static #termOptions;
  static #typeOptions;
  static {
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
      let scrut, param01, rule, param02, param11, token1, param03, param12, name, scrut1, param04, param13, token2, param05, param14, name1, scrut2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12;
      if (kind === "type") {
        return expr(prec, Parser.#typeOptions)
      } else if (kind === "term") {
        return expr(prec, Parser.#termOptions)
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
          return parseRule(prec, rule)
        } else {
          tmp11 = "Unknown syntax kind: \"" + kind;
          tmp12 = tmp11 + "\"";
          throw globalThis.Error(tmp12);
        }
      }
    };
    parseRule = function parseRule(prec, rule) {
      let tmp3, tmp4, tmp5, tmp6, lambda2, lambda3;
      tmp3 = "parsing rule \"" + rule.name;
      tmp4 = tmp3 + "\" with precedence ";
      tmp5 = tmp4 + prec;
      lambda2 = (undefined, function () {
        let scrut, param01, value, param02, param11, other, doTemp, doTemp1, doTemp2, scrut1, param03, value1, scrut2, param04, param05, param12, param2, param3, param4, kind, process, outerPrec, innerPrec, rest, doTemp3, outerPrec$_, innerPrec$_, doTemp4, scrut3, scrut4, acc, tree1, scrut5, param06, value2, param07, param13, name, doTemp5, scrut6, param08, keyword, doTemp6, doTemp7, scrut7, doTemp8, param09, rest1, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20, tmp21, tmp22, tmp23, tmp24, tmp25, tmp26, tmp27, tmp28, tmp29, tmp30, tmp31, tmp32, tmp33, tmp34, tmp35, tmp36, tmp37, tmp38, tmp39, tmp40, tmp41, tmp42, tmp43, tmp44, tmp45, tmp46, tmp47, tmp48, tmp49, tmp50, tmp51, tmp52, tmp53, tmp54, tmp55, tmp56, tmp57, tmp58, tmp59, tmp60, tmp61, tmp62, tmp63, tmp64, tmp65, tmp66, tmp67, tmp68, tmp69, tmp70, tmp71, tmp72, tmp73, tmp74, tmp75, tmp76, tmp77, tmp78, tmp79, tmp80, tmp81, tmp82, tmp83, tmp84, tmp85, tmp86, tmp87, tmp88, tmp89, tmp90, tmp91, tmp92, tmp93, tmp94, tmp95, tmp96, lambda4;
        if (tokens instanceof Stack.Cons.class) {
          param02 = tokens.head;
          param11 = tokens.tail;
          if (param02 instanceof Token.Identifier.class) {
            param07 = param02.name;
            param13 = param02.symbolic;
            name = param07;
            tmp7 = "found an identifier \"" + name;
            tmp8 = tmp7 + "\"";
            doTemp5 = Parser.tracer.print(tmp8, 75);
            scrut6 = runtime.safeCall(Precedence.Keywords.all.get(name));
            if (scrut6 instanceof Option.Some.class) {
              param08 = scrut6.value;
              keyword = param08;
              tmp9 = runtime.safeCall(keyword.toString());
              doTemp6 = Parser.tracer.print(tmp9, 77);
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
              doTemp7 = Parser.tracer.print("keyword choices: ", tmp12);
              scrut7 = runtime.safeCall(rule.keywordChoices.get(name));
              if (scrut7 instanceof Option.Some.class) {
                param09 = scrut7.value;
                rest1 = param09;
                tmp13 = "found a rule starting with `" + name;
                tmp14 = tmp13 + "`";
                tmp15 = Parser.tracer.print(tmp14, 83);
                tmp16 = "the rest of the rule: " + rest1.display;
                tmp17 = Parser.tracer.print(tmp16, 84);
                tmp18 = consume();
                return parseRule(0, rest1)
              } else {
                tmp19 = "\"" + name;
                tmp20 = tmp19 + "\" is not a keyword";
                doTemp8 = Parser.tracer.print(tmp20, 87);
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
                    doTemp3 = Parser.tracer.print(tmp25, 91);
                    outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxKeywordPrec);
                    innerPrec$_ = Option.getOrElse(innerPrec, prec);
                    scrut3 = outerPrec$_ > prec;
                    if (scrut3 === true) {
                      scrut4 = parseKind(kind, prec);
                      if (scrut4 instanceof Tree.Error.class) {
                        tmp26 = Parser.tracer.print("cannot parse more", 96);
                        scrut5 = rule.endChoice;
                        if (scrut5 instanceof Option.Some.class) {
                          param06 = scrut5.value;
                          value2 = param06;
                          tmp27 = Parser.tracer.print("found end choice", 98);
                          return value2
                        } else {
                          throw new globalThis.Error("match error");
                        }
                      } else {
                        acc = scrut4;
                        tmp28 = parseRule(prec, rest);
                        tree1 = tmp28;
                        tmp29 = Tree.summary(acc);
                        tmp30 = "acc: " + tmp29;
                        tmp31 = Parser.tracer.print(tmp30, 102);
                        tmp32 = Tree.summary(tree1);
                        tmp33 = "parsed from rest rule: " + tmp32;
                        tmp34 = Parser.tracer.print(tmp33, 103);
                        return runtime.safeCall(process(acc, tree1))
                      }
                    } else {
                      tmp35 = "did not parse kind \"" + kind;
                      tmp36 = tmp35 + "\" because of the precedence";
                      doTemp4 = Parser.tracer.print(tmp36, 105);
                      doTemp1 = Parser.tracer.print("no reference choice", 106);
                      scrut1 = rule.endChoice;
                      if (scrut1 instanceof Option.Some.class) {
                        param03 = scrut1.value;
                        value1 = param03;
                        tmp37 = Parser.tracer.print("found end choice", 108);
                        return value1
                      } else {
                        doTemp2 = Parser.tracer.print("no end choice", 110);
                        tmp38 = consume();
                        tmp39 = "unexpected token " + other;
                        return Tree.error(tmp39)
                      }
                    }
                  } else {
                    doTemp1 = Parser.tracer.print("no reference choice", 106);
                    scrut1 = rule.endChoice;
                    if (scrut1 instanceof Option.Some.class) {
                      param03 = scrut1.value;
                      value1 = param03;
                      tmp40 = Parser.tracer.print("found end choice", 108);
                      return value1
                    } else {
                      doTemp2 = Parser.tracer.print("no end choice", 110);
                      tmp41 = consume();
                      tmp42 = "unexpected token " + other;
                      return Tree.error(tmp42)
                    }
                  }
                } else {
                  doTemp1 = Parser.tracer.print("no reference choice", 106);
                  scrut1 = rule.endChoice;
                  if (scrut1 instanceof Option.Some.class) {
                    param03 = scrut1.value;
                    value1 = param03;
                    tmp43 = Parser.tracer.print("found end choice", 108);
                    return value1
                  } else {
                    doTemp2 = Parser.tracer.print("no end choice", 110);
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
                  doTemp3 = Parser.tracer.print(tmp50, 91);
                  outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxKeywordPrec);
                  innerPrec$_ = Option.getOrElse(innerPrec, prec);
                  scrut3 = outerPrec$_ > prec;
                  if (scrut3 === true) {
                    scrut4 = parseKind(kind, prec);
                    if (scrut4 instanceof Tree.Error.class) {
                      tmp51 = Parser.tracer.print("cannot parse more", 96);
                      scrut5 = rule.endChoice;
                      if (scrut5 instanceof Option.Some.class) {
                        param06 = scrut5.value;
                        value2 = param06;
                        tmp52 = Parser.tracer.print("found end choice", 98);
                        return value2
                      } else {
                        throw new globalThis.Error("match error");
                      }
                    } else {
                      acc = scrut4;
                      tmp53 = parseRule(prec, rest);
                      tree1 = tmp53;
                      tmp54 = Tree.summary(acc);
                      tmp55 = "acc: " + tmp54;
                      tmp56 = Parser.tracer.print(tmp55, 102);
                      tmp57 = Tree.summary(tree1);
                      tmp58 = "parsed from rest rule: " + tmp57;
                      tmp59 = Parser.tracer.print(tmp58, 103);
                      return runtime.safeCall(process(acc, tree1))
                    }
                  } else {
                    tmp60 = "did not parse kind \"" + kind;
                    tmp61 = tmp60 + "\" because of the precedence";
                    doTemp4 = Parser.tracer.print(tmp61, 105);
                    doTemp1 = Parser.tracer.print("no reference choice", 106);
                    scrut1 = rule.endChoice;
                    if (scrut1 instanceof Option.Some.class) {
                      param03 = scrut1.value;
                      value1 = param03;
                      tmp62 = Parser.tracer.print("found end choice", 108);
                      return value1
                    } else {
                      doTemp2 = Parser.tracer.print("no end choice", 110);
                      tmp63 = consume();
                      tmp64 = "unexpected token " + other;
                      return Tree.error(tmp64)
                    }
                  }
                } else {
                  doTemp1 = Parser.tracer.print("no reference choice", 106);
                  scrut1 = rule.endChoice;
                  if (scrut1 instanceof Option.Some.class) {
                    param03 = scrut1.value;
                    value1 = param03;
                    tmp65 = Parser.tracer.print("found end choice", 108);
                    return value1
                  } else {
                    doTemp2 = Parser.tracer.print("no end choice", 110);
                    tmp66 = consume();
                    tmp67 = "unexpected token " + other;
                    return Tree.error(tmp67)
                  }
                }
              } else {
                doTemp1 = Parser.tracer.print("no reference choice", 106);
                scrut1 = rule.endChoice;
                if (scrut1 instanceof Option.Some.class) {
                  param03 = scrut1.value;
                  value1 = param03;
                  tmp68 = Parser.tracer.print("found end choice", 108);
                  return value1
                } else {
                  doTemp2 = Parser.tracer.print("no end choice", 110);
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
                doTemp3 = Parser.tracer.print(tmp75, 91);
                outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxKeywordPrec);
                innerPrec$_ = Option.getOrElse(innerPrec, prec);
                scrut3 = outerPrec$_ > prec;
                if (scrut3 === true) {
                  scrut4 = parseKind(kind, prec);
                  if (scrut4 instanceof Tree.Error.class) {
                    tmp76 = Parser.tracer.print("cannot parse more", 96);
                    scrut5 = rule.endChoice;
                    if (scrut5 instanceof Option.Some.class) {
                      param06 = scrut5.value;
                      value2 = param06;
                      tmp77 = Parser.tracer.print("found end choice", 98);
                      return value2
                    } else {
                      throw new globalThis.Error("match error");
                    }
                  } else {
                    acc = scrut4;
                    tmp78 = parseRule(prec, rest);
                    tree1 = tmp78;
                    tmp79 = Tree.summary(acc);
                    tmp80 = "acc: " + tmp79;
                    tmp81 = Parser.tracer.print(tmp80, 102);
                    tmp82 = Tree.summary(tree1);
                    tmp83 = "parsed from rest rule: " + tmp82;
                    tmp84 = Parser.tracer.print(tmp83, 103);
                    return runtime.safeCall(process(acc, tree1))
                  }
                } else {
                  tmp85 = "did not parse kind \"" + kind;
                  tmp86 = tmp85 + "\" because of the precedence";
                  doTemp4 = Parser.tracer.print(tmp86, 105);
                  doTemp1 = Parser.tracer.print("no reference choice", 106);
                  scrut1 = rule.endChoice;
                  if (scrut1 instanceof Option.Some.class) {
                    param03 = scrut1.value;
                    value1 = param03;
                    tmp87 = Parser.tracer.print("found end choice", 108);
                    return value1
                  } else {
                    doTemp2 = Parser.tracer.print("no end choice", 110);
                    tmp88 = consume();
                    tmp89 = "unexpected token " + other;
                    return Tree.error(tmp89)
                  }
                }
              } else {
                doTemp1 = Parser.tracer.print("no reference choice", 106);
                scrut1 = rule.endChoice;
                if (scrut1 instanceof Option.Some.class) {
                  param03 = scrut1.value;
                  value1 = param03;
                  tmp90 = Parser.tracer.print("found end choice", 108);
                  return value1
                } else {
                  doTemp2 = Parser.tracer.print("no end choice", 110);
                  tmp91 = consume();
                  tmp92 = "unexpected token " + other;
                  return Tree.error(tmp92)
                }
              }
            } else {
              doTemp1 = Parser.tracer.print("no reference choice", 106);
              scrut1 = rule.endChoice;
              if (scrut1 instanceof Option.Some.class) {
                param03 = scrut1.value;
                value1 = param03;
                tmp93 = Parser.tracer.print("found end choice", 108);
                return value1
              } else {
                doTemp2 = Parser.tracer.print("no end choice", 110);
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
            tmp96 = Parser.tracer.print("no end choice but found the end of input", 117);
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
                  tmp13 = Parser.tracer.print(tmp12, 132);
                  return Tree.empty
                }
              } else if (scrut3 instanceof Option.None.class) {
                tmp14 = "no rule starting with " + name;
                tmp15 = Parser.tracer.print(tmp14, 135);
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
      let infix, doTemp, doTemp1, doTemp2, param01, param11, token1, scrut, param02, param03, param12, param2, param3, param4, kind, process, outerPrec, innerPrec, rest, doTemp3, outerPrec$_, innerPrec$_, doTemp4, scrut1, scrut2, rhs, restRes, param04, param13, name, scrut3, scrut4, doTemp5, scrut5, first1, first0, leftPrec, rightPrec, doTemp6, scrut6, op, rhs1, name1, scrut7, param05, keyword, doTemp7, doTemp8, scrut8, param06, rule, doTemp9, scrut9, scrut10, param07, param08, param14, param21, param31, param41, kind1, process1, outerPrec1, innerPrec1, rest1, doTemp10, outerPrec$_1, innerPrec$_1, scrut11, rhs2, restRes1, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20, tmp21, tmp22, tmp23, tmp24, tmp25, tmp26, tmp27, tmp28, tmp29, tmp30, tmp31, tmp32, tmp33, tmp34, tmp35, tmp36, tmp37, tmp38, tmp39, tmp40, tmp41, tmp42, tmp43, tmp44, tmp45, tmp46, tmp47, tmp48, tmp49, tmp50, tmp51, tmp52, tmp53, tmp54, tmp55, tmp56, tmp57, tmp58, tmp59, tmp60, tmp61, tmp62, tmp63, tmp64, tmp65, tmp66, tmp67, tmp68, tmp69, tmp70, tmp71, tmp72, tmp73, tmp74, tmp75, tmp76, tmp77, tmp78, tmp79, tmp80, tmp81, tmp82, tmp83, tmp84, tmp85, tmp86, tmp87, tmp88, tmp89, tmp90, tmp91, tmp92, tmp93, tmp94, tmp95, tmp96, tmp97, tmp98, tmp99, tmp100, tmp101, tmp102, tmp103, tmp104, tmp105, tmp106, tmp107, tmp108, tmp109, tmp110, tmp111, tmp112, tmp113, tmp114, tmp115, tmp116, tmp117, tmp118, tmp119, tmp120, tmp121, tmp122, tmp123, tmp124, tmp125, tmp126, tmp127, tmp128, tmp129, tmp130, tmp131, tmp132, tmp133, tmp134, tmp135, tmp136, tmp137, tmp138, tmp139, tmp140, tmp141, tmp142, tmp143, tmp144, tmp145, tmp146, tmp147, tmp148, tmp149, tmp150, tmp151, tmp152, tmp153, tmp154, tmp155, tmp156, tmp157, tmp158, tmp159, tmp160, tmp161, tmp162, tmp163, tmp164, tmp165, tmp166, tmp167, tmp168, tmp169, tmp170, tmp171, tmp172, tmp173, tmp174, tmp175, tmp176, tmp177, tmp178, tmp179, tmp180, tmp181, tmp182, tmp183, tmp184, tmp185, tmp186, tmp187, tmp188, tmp189, tmp190, tmp191, tmp192, tmp193, tmp194, tmp195, tmp196, tmp197, tmp198, tmp199, tmp200, tmp201, tmp202, tmp203, tmp204, tmp205, tmp206, tmp207, tmp208, tmp209, tmp210, tmp211, tmp212, tmp213, tmp214, tmp215, tmp216, tmp217, tmp218, tmp219, tmp220, tmp221, tmp222, tmp223, tmp224, tmp225, tmp226, tmp227, tmp228, tmp229, tmp230, tmp231, tmp232, tmp233, tmp234, tmp235, tmp236, tmp237, tmp238, tmp239, tmp240, tmp241, tmp242, tmp243, tmp244, tmp245, tmp246, tmp247, tmp248, tmp249, tmp250, tmp251, tmp252, tmp253, tmp254, tmp255, tmp256, tmp257, tmp258, tmp259, tmp260, tmp261, tmp262, tmp263, tmp264, tmp265, tmp266, tmp267, tmp268, tmp269, tmp270, tmp271, tmp272, tmp273, tmp274, tmp275, tmp276, tmp277, tmp278, tmp279, tmp280, tmp281, tmp282, tmp283, tmp284, tmp285, tmp286, tmp287, tmp288, tmp289, tmp290, tmp291, tmp292, tmp293, tmp294, tmp295, tmp296, tmp297, tmp298, tmp299, tmp300, tmp301, tmp302, tmp303, tmp304, tmp305, tmp306, tmp307, tmp308, tmp309, tmp310, tmp311, tmp312, tmp313, tmp314, tmp315, tmp316, tmp317, tmp318, tmp319, tmp320, tmp321, tmp322, tmp323, tmp324, tmp325, tmp326, tmp327, tmp328, tmp329, tmp330, tmp331, tmp332, tmp333, tmp334, tmp335, tmp336, tmp337, tmp338, tmp339, tmp340, tmp341, tmp342, tmp343, tmp344, tmp345, tmp346, tmp347, tmp348, tmp349, tmp350, tmp351, tmp352, tmp353, tmp354, tmp355, tmp356, tmp357, tmp358, tmp359, tmp360, tmp361, tmp362, tmp363, tmp364, tmp365, tmp366, tmp367, tmp368, tmp369, tmp370, tmp371, tmp372, tmp373, tmp374, tmp375, tmp376, tmp377, tmp378, tmp379, tmp380, tmp381, tmp382, tmp383, tmp384, tmp385, tmp386, tmp387, tmp388, tmp389, tmp390, tmp391, tmp392, tmp393, tmp394, tmp395, tmp396, tmp397, tmp398, tmp399, tmp400, tmp401, tmp402, tmp403, tmp404, tmp405, tmp406, tmp407, tmp408, tmp409, tmp410, tmp411, tmp412, tmp413, tmp414, tmp415, tmp416, tmp417, tmp418, tmp419, tmp420, tmp421, tmp422, tmp423, tmp424, tmp425, tmp426, tmp427, tmp428, tmp429, tmp430, tmp431, tmp432, tmp433, tmp434, tmp435, tmp436, tmp437, tmp438, tmp439, tmp440, tmp441, tmp442, tmp443, tmp444, tmp445, tmp446, tmp447, tmp448, tmp449, tmp450, tmp451, tmp452, tmp453, tmp454, tmp455, tmp456, tmp457, tmp458, tmp459, tmp460, tmp461, tmp462, tmp463, tmp464, tmp465, tmp466, tmp467, tmp468, tmp469, tmp470, tmp471, tmp472, tmp473, tmp474, tmp475, lambda2;
      lambda2 = (undefined, function (caseScrut) {
        let param09, param15, param22, param32, param42, kind2, process2, rest2, scrut12, process3, rule1, tmp476, tmp477, tmp478, tmp479, tmp480, tmp481, tmp482, tmp483;
        if (caseScrut instanceof ParseRule.Choice.Ref.class) {
          param09 = caseScrut.kind;
          param15 = caseScrut.process;
          param22 = caseScrut.outerPrec;
          param32 = caseScrut.innerPrec;
          param42 = caseScrut.rest;
          kind2 = param09;
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
                tmp476 = "Kind " + options.kind;
                tmp477 = tmp476 + " does not have infix rules";
                throw globalThis.Error(tmp477);
              }
            } else {
              tmp478 = "Kind " + options.kind;
              tmp479 = tmp478 + " does not have infix rules";
              throw globalThis.Error(tmp479);
            }
          } else {
            tmp480 = "Kind " + options.kind;
            tmp481 = tmp480 + " does not have infix rules";
            throw globalThis.Error(tmp481);
          }
        } else {
          tmp482 = "Kind " + options.kind;
          tmp483 = tmp482 + " does not have infix rules";
          throw globalThis.Error(tmp483);
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
      doTemp = Parser.tracer.print(tmp10, 157);
      tmp11 = TokenHelpers.preview(tokens);
      tmp12 = "check keyword " + tmp11;
      doTemp1 = Parser.tracer.print(tmp12, 159);
      if (tokens instanceof Stack.Cons.class) {
        param01 = tokens.head;
        param11 = tokens.tail;
        if (param01 instanceof Token.Identifier.class) {
          param04 = param01.name;
          param13 = param01.symbolic;
          name1 = param04;
          scrut7 = runtime.safeCall(Precedence.Keywords.all.get(name1));
          if (scrut7 instanceof Option.Some.class) {
            param05 = scrut7.value;
            keyword = param05;
            tmp13 = "found a keyword: " + name1;
            doTemp7 = Parser.tracer.print(tmp13, 161);
            scrut8 = runtime.safeCall(infix.rule.keywordChoices.get(name1));
            if (scrut8 instanceof Option.Some.class) {
              param06 = scrut8.value;
              rule = param06;
              tmp14 = "keyword `" + name1;
              tmp15 = tmp14 + "` is found in infix rules";
              doTemp9 = Parser.tracer.print(tmp15, 163);
              scrut9 = keyword.leftPrecOrMin > prec;
              if (scrut9 === true) {
                scrut10 = rule.refChoice;
                if (scrut10 instanceof Option.Some.class) {
                  param07 = scrut10.value;
                  if (param07 instanceof ParseRule.Choice.Ref.class) {
                    param08 = param07.kind;
                    param14 = param07.process;
                    param21 = param07.outerPrec;
                    param31 = param07.innerPrec;
                    param41 = param07.rest;
                    kind1 = param08;
                    process1 = param14;
                    outerPrec1 = param21;
                    innerPrec1 = param31;
                    rest1 = param41;
                    tmp16 = "try to parse kind \"" + kind1;
                    tmp17 = tmp16 + "\" at ";
                    tmp18 = TokenHelpers.preview(tokens);
                    tmp19 = tmp17 + tmp18;
                    doTemp10 = Parser.tracer.print(tmp19, 166);
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
                      doTemp8 = Parser.tracer.print(tmp26, 175);
                      name = param04;
                      if (param13 === true) {
                        scrut3 = runtime.safeCall(Precedence.Keywords.all.get(name));
                        if (scrut3 instanceof Option.None.class) {
                          scrut4 = options.allowOperators;
                          if (scrut4 === true) {
                            tmp27 = "found an operator \"" + name;
                            tmp28 = tmp27 + "\"";
                            doTemp5 = Parser.tracer.print(tmp28, 178);
                            scrut5 = Precedence.opPrec(name);
                            if (globalThis.Array.isArray(scrut5) && scrut5.length === 2) {
                              first0 = scrut5[0];
                              first1 = scrut5[1];
                              leftPrec = first0;
                              rightPrec = first1;
                              tmp29 = "leftPrec = " + leftPrec;
                              tmp30 = tmp29 + "; rightPrec = ";
                              tmp31 = tmp30 + rightPrec;
                              doTemp6 = Parser.tracer.print(tmp31, 180);
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
                              doTemp2 = Parser.tracer.print("not a keyword", 189);
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
                                  doTemp3 = Parser.tracer.print(tmp40, 192);
                                  outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                                  innerPrec$_ = Option.getOrElse(innerPrec, outerPrec$_);
                                  scrut1 = outerPrec$_ > prec;
                                  if (scrut1 === true) {
                                    tmp41 = Option.getOrElse(innerPrec, outerPrec$_);
                                    scrut2 = parseKind(kind, tmp41);
                                    if (scrut2 instanceof Tree.Empty.class) {
                                      tmp42 = Parser.tracer.print("nothing was parsed", 198);
                                      return acc
                                    } else if (scrut2 instanceof Tree.Error.class) {
                                      tmp43 = Parser.tracer.print("cannot parse more", 201);
                                      return acc
                                    } else {
                                      rhs = scrut2;
                                      tmp44 = Tree.summary(rhs);
                                      tmp45 = "parsed " + tmp44;
                                      tmp46 = Parser.tracer.print(tmp45, 204);
                                      tmp47 = parseRule(innerPrec$_, rest);
                                      restRes = tmp47;
                                      tmp48 = runtime.safeCall(process(rhs, restRes));
                                      tmp49 = infix.process(acc, tmp48);
                                      return exprCont(tmp49, prec, options)
                                    }
                                  } else {
                                    tmp50 = "the outer precedence is less than " + prec;
                                    doTemp4 = Parser.tracer.print(tmp50, 207);
                                    return acc
                                  }
                                } else {
                                  throw new globalThis.Error("match error");
                                }
                              } else if (scrut instanceof Option.None.class) {
                                tmp51 = "cannot consume " + token1;
                                tmp52 = Parser.tracer.print(tmp51, 210);
                                return acc
                              } else {
                                throw new globalThis.Error("match error");
                              }
                            }
                          } else {
                            doTemp2 = Parser.tracer.print("not a keyword", 189);
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
                                doTemp3 = Parser.tracer.print(tmp55, 192);
                                outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                                innerPrec$_ = Option.getOrElse(innerPrec, outerPrec$_);
                                scrut1 = outerPrec$_ > prec;
                                if (scrut1 === true) {
                                  tmp56 = Option.getOrElse(innerPrec, outerPrec$_);
                                  scrut2 = parseKind(kind, tmp56);
                                  if (scrut2 instanceof Tree.Empty.class) {
                                    tmp57 = Parser.tracer.print("nothing was parsed", 198);
                                    return acc
                                  } else if (scrut2 instanceof Tree.Error.class) {
                                    tmp58 = Parser.tracer.print("cannot parse more", 201);
                                    return acc
                                  } else {
                                    rhs = scrut2;
                                    tmp59 = Tree.summary(rhs);
                                    tmp60 = "parsed " + tmp59;
                                    tmp61 = Parser.tracer.print(tmp60, 204);
                                    tmp62 = parseRule(innerPrec$_, rest);
                                    restRes = tmp62;
                                    tmp63 = runtime.safeCall(process(rhs, restRes));
                                    tmp64 = infix.process(acc, tmp63);
                                    return exprCont(tmp64, prec, options)
                                  }
                                } else {
                                  tmp65 = "the outer precedence is less than " + prec;
                                  doTemp4 = Parser.tracer.print(tmp65, 207);
                                  return acc
                                }
                              } else {
                                throw new globalThis.Error("match error");
                              }
                            } else if (scrut instanceof Option.None.class) {
                              tmp66 = "cannot consume " + token1;
                              tmp67 = Parser.tracer.print(tmp66, 210);
                              return acc
                            } else {
                              throw new globalThis.Error("match error");
                            }
                          }
                        } else {
                          doTemp2 = Parser.tracer.print("not a keyword", 189);
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
                              doTemp3 = Parser.tracer.print(tmp70, 192);
                              outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                              innerPrec$_ = Option.getOrElse(innerPrec, outerPrec$_);
                              scrut1 = outerPrec$_ > prec;
                              if (scrut1 === true) {
                                tmp71 = Option.getOrElse(innerPrec, outerPrec$_);
                                scrut2 = parseKind(kind, tmp71);
                                if (scrut2 instanceof Tree.Empty.class) {
                                  tmp72 = Parser.tracer.print("nothing was parsed", 198);
                                  return acc
                                } else if (scrut2 instanceof Tree.Error.class) {
                                  tmp73 = Parser.tracer.print("cannot parse more", 201);
                                  return acc
                                } else {
                                  rhs = scrut2;
                                  tmp74 = Tree.summary(rhs);
                                  tmp75 = "parsed " + tmp74;
                                  tmp76 = Parser.tracer.print(tmp75, 204);
                                  tmp77 = parseRule(innerPrec$_, rest);
                                  restRes = tmp77;
                                  tmp78 = runtime.safeCall(process(rhs, restRes));
                                  tmp79 = infix.process(acc, tmp78);
                                  return exprCont(tmp79, prec, options)
                                }
                              } else {
                                tmp80 = "the outer precedence is less than " + prec;
                                doTemp4 = Parser.tracer.print(tmp80, 207);
                                return acc
                              }
                            } else {
                              throw new globalThis.Error("match error");
                            }
                          } else if (scrut instanceof Option.None.class) {
                            tmp81 = "cannot consume " + token1;
                            tmp82 = Parser.tracer.print(tmp81, 210);
                            return acc
                          } else {
                            throw new globalThis.Error("match error");
                          }
                        }
                      } else {
                        doTemp2 = Parser.tracer.print("not a keyword", 189);
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
                            doTemp3 = Parser.tracer.print(tmp85, 192);
                            outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                            innerPrec$_ = Option.getOrElse(innerPrec, outerPrec$_);
                            scrut1 = outerPrec$_ > prec;
                            if (scrut1 === true) {
                              tmp86 = Option.getOrElse(innerPrec, outerPrec$_);
                              scrut2 = parseKind(kind, tmp86);
                              if (scrut2 instanceof Tree.Empty.class) {
                                tmp87 = Parser.tracer.print("nothing was parsed", 198);
                                return acc
                              } else if (scrut2 instanceof Tree.Error.class) {
                                tmp88 = Parser.tracer.print("cannot parse more", 201);
                                return acc
                              } else {
                                rhs = scrut2;
                                tmp89 = Tree.summary(rhs);
                                tmp90 = "parsed " + tmp89;
                                tmp91 = Parser.tracer.print(tmp90, 204);
                                tmp92 = parseRule(innerPrec$_, rest);
                                restRes = tmp92;
                                tmp93 = runtime.safeCall(process(rhs, restRes));
                                tmp94 = infix.process(acc, tmp93);
                                return exprCont(tmp94, prec, options)
                              }
                            } else {
                              tmp95 = "the outer precedence is less than " + prec;
                              doTemp4 = Parser.tracer.print(tmp95, 207);
                              return acc
                            }
                          } else {
                            throw new globalThis.Error("match error");
                          }
                        } else if (scrut instanceof Option.None.class) {
                          tmp96 = "cannot consume " + token1;
                          tmp97 = Parser.tracer.print(tmp96, 210);
                          return acc
                        } else {
                          throw new globalThis.Error("match error");
                        }
                      }
                    }
                  } else {
                    tmp98 = "keyword `" + name1;
                    tmp99 = tmp98 + "` does not have infix rules";
                    doTemp8 = Parser.tracer.print(tmp99, 175);
                    name = param04;
                    if (param13 === true) {
                      scrut3 = runtime.safeCall(Precedence.Keywords.all.get(name));
                      if (scrut3 instanceof Option.None.class) {
                        scrut4 = options.allowOperators;
                        if (scrut4 === true) {
                          tmp100 = "found an operator \"" + name;
                          tmp101 = tmp100 + "\"";
                          doTemp5 = Parser.tracer.print(tmp101, 178);
                          scrut5 = Precedence.opPrec(name);
                          if (globalThis.Array.isArray(scrut5) && scrut5.length === 2) {
                            first0 = scrut5[0];
                            first1 = scrut5[1];
                            leftPrec = first0;
                            rightPrec = first1;
                            tmp102 = "leftPrec = " + leftPrec;
                            tmp103 = tmp102 + "; rightPrec = ";
                            tmp104 = tmp103 + rightPrec;
                            doTemp6 = Parser.tracer.print(tmp104, 180);
                            scrut6 = leftPrec > prec;
                            if (scrut6 === true) {
                              tmp105 = consume();
                              tmp106 = Tree.Ident(name, true);
                              op = tmp106;
                              tmp107 = expr(rightPrec, Parser.#termOptions);
                              rhs1 = tmp107;
                              tmp108 = Stack.Cons(rhs1, Stack.Nil);
                              tmp109 = Stack.Cons(acc, tmp108);
                              tmp110 = Tree.App(op, tmp109);
                              return exprCont(tmp110, prec, options)
                            } else {
                              return acc
                            }
                          } else {
                            doTemp2 = Parser.tracer.print("not a keyword", 189);
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
                                tmp111 = "found reference to " + kind;
                                tmp112 = tmp111 + " with outerPrec = ";
                                tmp113 = tmp112 + outerPrec;
                                doTemp3 = Parser.tracer.print(tmp113, 192);
                                outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                                innerPrec$_ = Option.getOrElse(innerPrec, outerPrec$_);
                                scrut1 = outerPrec$_ > prec;
                                if (scrut1 === true) {
                                  tmp114 = Option.getOrElse(innerPrec, outerPrec$_);
                                  scrut2 = parseKind(kind, tmp114);
                                  if (scrut2 instanceof Tree.Empty.class) {
                                    tmp115 = Parser.tracer.print("nothing was parsed", 198);
                                    return acc
                                  } else if (scrut2 instanceof Tree.Error.class) {
                                    tmp116 = Parser.tracer.print("cannot parse more", 201);
                                    return acc
                                  } else {
                                    rhs = scrut2;
                                    tmp117 = Tree.summary(rhs);
                                    tmp118 = "parsed " + tmp117;
                                    tmp119 = Parser.tracer.print(tmp118, 204);
                                    tmp120 = parseRule(innerPrec$_, rest);
                                    restRes = tmp120;
                                    tmp121 = runtime.safeCall(process(rhs, restRes));
                                    tmp122 = infix.process(acc, tmp121);
                                    return exprCont(tmp122, prec, options)
                                  }
                                } else {
                                  tmp123 = "the outer precedence is less than " + prec;
                                  doTemp4 = Parser.tracer.print(tmp123, 207);
                                  return acc
                                }
                              } else {
                                throw new globalThis.Error("match error");
                              }
                            } else if (scrut instanceof Option.None.class) {
                              tmp124 = "cannot consume " + token1;
                              tmp125 = Parser.tracer.print(tmp124, 210);
                              return acc
                            } else {
                              throw new globalThis.Error("match error");
                            }
                          }
                        } else {
                          doTemp2 = Parser.tracer.print("not a keyword", 189);
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
                              doTemp3 = Parser.tracer.print(tmp128, 192);
                              outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                              innerPrec$_ = Option.getOrElse(innerPrec, outerPrec$_);
                              scrut1 = outerPrec$_ > prec;
                              if (scrut1 === true) {
                                tmp129 = Option.getOrElse(innerPrec, outerPrec$_);
                                scrut2 = parseKind(kind, tmp129);
                                if (scrut2 instanceof Tree.Empty.class) {
                                  tmp130 = Parser.tracer.print("nothing was parsed", 198);
                                  return acc
                                } else if (scrut2 instanceof Tree.Error.class) {
                                  tmp131 = Parser.tracer.print("cannot parse more", 201);
                                  return acc
                                } else {
                                  rhs = scrut2;
                                  tmp132 = Tree.summary(rhs);
                                  tmp133 = "parsed " + tmp132;
                                  tmp134 = Parser.tracer.print(tmp133, 204);
                                  tmp135 = parseRule(innerPrec$_, rest);
                                  restRes = tmp135;
                                  tmp136 = runtime.safeCall(process(rhs, restRes));
                                  tmp137 = infix.process(acc, tmp136);
                                  return exprCont(tmp137, prec, options)
                                }
                              } else {
                                tmp138 = "the outer precedence is less than " + prec;
                                doTemp4 = Parser.tracer.print(tmp138, 207);
                                return acc
                              }
                            } else {
                              throw new globalThis.Error("match error");
                            }
                          } else if (scrut instanceof Option.None.class) {
                            tmp139 = "cannot consume " + token1;
                            tmp140 = Parser.tracer.print(tmp139, 210);
                            return acc
                          } else {
                            throw new globalThis.Error("match error");
                          }
                        }
                      } else {
                        doTemp2 = Parser.tracer.print("not a keyword", 189);
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
                            doTemp3 = Parser.tracer.print(tmp143, 192);
                            outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                            innerPrec$_ = Option.getOrElse(innerPrec, outerPrec$_);
                            scrut1 = outerPrec$_ > prec;
                            if (scrut1 === true) {
                              tmp144 = Option.getOrElse(innerPrec, outerPrec$_);
                              scrut2 = parseKind(kind, tmp144);
                              if (scrut2 instanceof Tree.Empty.class) {
                                tmp145 = Parser.tracer.print("nothing was parsed", 198);
                                return acc
                              } else if (scrut2 instanceof Tree.Error.class) {
                                tmp146 = Parser.tracer.print("cannot parse more", 201);
                                return acc
                              } else {
                                rhs = scrut2;
                                tmp147 = Tree.summary(rhs);
                                tmp148 = "parsed " + tmp147;
                                tmp149 = Parser.tracer.print(tmp148, 204);
                                tmp150 = parseRule(innerPrec$_, rest);
                                restRes = tmp150;
                                tmp151 = runtime.safeCall(process(rhs, restRes));
                                tmp152 = infix.process(acc, tmp151);
                                return exprCont(tmp152, prec, options)
                              }
                            } else {
                              tmp153 = "the outer precedence is less than " + prec;
                              doTemp4 = Parser.tracer.print(tmp153, 207);
                              return acc
                            }
                          } else {
                            throw new globalThis.Error("match error");
                          }
                        } else if (scrut instanceof Option.None.class) {
                          tmp154 = "cannot consume " + token1;
                          tmp155 = Parser.tracer.print(tmp154, 210);
                          return acc
                        } else {
                          throw new globalThis.Error("match error");
                        }
                      }
                    } else {
                      doTemp2 = Parser.tracer.print("not a keyword", 189);
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
                          doTemp3 = Parser.tracer.print(tmp158, 192);
                          outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                          innerPrec$_ = Option.getOrElse(innerPrec, outerPrec$_);
                          scrut1 = outerPrec$_ > prec;
                          if (scrut1 === true) {
                            tmp159 = Option.getOrElse(innerPrec, outerPrec$_);
                            scrut2 = parseKind(kind, tmp159);
                            if (scrut2 instanceof Tree.Empty.class) {
                              tmp160 = Parser.tracer.print("nothing was parsed", 198);
                              return acc
                            } else if (scrut2 instanceof Tree.Error.class) {
                              tmp161 = Parser.tracer.print("cannot parse more", 201);
                              return acc
                            } else {
                              rhs = scrut2;
                              tmp162 = Tree.summary(rhs);
                              tmp163 = "parsed " + tmp162;
                              tmp164 = Parser.tracer.print(tmp163, 204);
                              tmp165 = parseRule(innerPrec$_, rest);
                              restRes = tmp165;
                              tmp166 = runtime.safeCall(process(rhs, restRes));
                              tmp167 = infix.process(acc, tmp166);
                              return exprCont(tmp167, prec, options)
                            }
                          } else {
                            tmp168 = "the outer precedence is less than " + prec;
                            doTemp4 = Parser.tracer.print(tmp168, 207);
                            return acc
                          }
                        } else {
                          throw new globalThis.Error("match error");
                        }
                      } else if (scrut instanceof Option.None.class) {
                        tmp169 = "cannot consume " + token1;
                        tmp170 = Parser.tracer.print(tmp169, 210);
                        return acc
                      } else {
                        throw new globalThis.Error("match error");
                      }
                    }
                  }
                } else if (scrut10 instanceof Option.None.class) {
                  return acc
                } else {
                  tmp171 = "keyword `" + name1;
                  tmp172 = tmp171 + "` does not have infix rules";
                  doTemp8 = Parser.tracer.print(tmp172, 175);
                  name = param04;
                  if (param13 === true) {
                    scrut3 = runtime.safeCall(Precedence.Keywords.all.get(name));
                    if (scrut3 instanceof Option.None.class) {
                      scrut4 = options.allowOperators;
                      if (scrut4 === true) {
                        tmp173 = "found an operator \"" + name;
                        tmp174 = tmp173 + "\"";
                        doTemp5 = Parser.tracer.print(tmp174, 178);
                        scrut5 = Precedence.opPrec(name);
                        if (globalThis.Array.isArray(scrut5) && scrut5.length === 2) {
                          first0 = scrut5[0];
                          first1 = scrut5[1];
                          leftPrec = first0;
                          rightPrec = first1;
                          tmp175 = "leftPrec = " + leftPrec;
                          tmp176 = tmp175 + "; rightPrec = ";
                          tmp177 = tmp176 + rightPrec;
                          doTemp6 = Parser.tracer.print(tmp177, 180);
                          scrut6 = leftPrec > prec;
                          if (scrut6 === true) {
                            tmp178 = consume();
                            tmp179 = Tree.Ident(name, true);
                            op = tmp179;
                            tmp180 = expr(rightPrec, Parser.#termOptions);
                            rhs1 = tmp180;
                            tmp181 = Stack.Cons(rhs1, Stack.Nil);
                            tmp182 = Stack.Cons(acc, tmp181);
                            tmp183 = Tree.App(op, tmp182);
                            return exprCont(tmp183, prec, options)
                          } else {
                            return acc
                          }
                        } else {
                          doTemp2 = Parser.tracer.print("not a keyword", 189);
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
                              tmp184 = "found reference to " + kind;
                              tmp185 = tmp184 + " with outerPrec = ";
                              tmp186 = tmp185 + outerPrec;
                              doTemp3 = Parser.tracer.print(tmp186, 192);
                              outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                              innerPrec$_ = Option.getOrElse(innerPrec, outerPrec$_);
                              scrut1 = outerPrec$_ > prec;
                              if (scrut1 === true) {
                                tmp187 = Option.getOrElse(innerPrec, outerPrec$_);
                                scrut2 = parseKind(kind, tmp187);
                                if (scrut2 instanceof Tree.Empty.class) {
                                  tmp188 = Parser.tracer.print("nothing was parsed", 198);
                                  return acc
                                } else if (scrut2 instanceof Tree.Error.class) {
                                  tmp189 = Parser.tracer.print("cannot parse more", 201);
                                  return acc
                                } else {
                                  rhs = scrut2;
                                  tmp190 = Tree.summary(rhs);
                                  tmp191 = "parsed " + tmp190;
                                  tmp192 = Parser.tracer.print(tmp191, 204);
                                  tmp193 = parseRule(innerPrec$_, rest);
                                  restRes = tmp193;
                                  tmp194 = runtime.safeCall(process(rhs, restRes));
                                  tmp195 = infix.process(acc, tmp194);
                                  return exprCont(tmp195, prec, options)
                                }
                              } else {
                                tmp196 = "the outer precedence is less than " + prec;
                                doTemp4 = Parser.tracer.print(tmp196, 207);
                                return acc
                              }
                            } else {
                              throw new globalThis.Error("match error");
                            }
                          } else if (scrut instanceof Option.None.class) {
                            tmp197 = "cannot consume " + token1;
                            tmp198 = Parser.tracer.print(tmp197, 210);
                            return acc
                          } else {
                            throw new globalThis.Error("match error");
                          }
                        }
                      } else {
                        doTemp2 = Parser.tracer.print("not a keyword", 189);
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
                            tmp199 = "found reference to " + kind;
                            tmp200 = tmp199 + " with outerPrec = ";
                            tmp201 = tmp200 + outerPrec;
                            doTemp3 = Parser.tracer.print(tmp201, 192);
                            outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                            innerPrec$_ = Option.getOrElse(innerPrec, outerPrec$_);
                            scrut1 = outerPrec$_ > prec;
                            if (scrut1 === true) {
                              tmp202 = Option.getOrElse(innerPrec, outerPrec$_);
                              scrut2 = parseKind(kind, tmp202);
                              if (scrut2 instanceof Tree.Empty.class) {
                                tmp203 = Parser.tracer.print("nothing was parsed", 198);
                                return acc
                              } else if (scrut2 instanceof Tree.Error.class) {
                                tmp204 = Parser.tracer.print("cannot parse more", 201);
                                return acc
                              } else {
                                rhs = scrut2;
                                tmp205 = Tree.summary(rhs);
                                tmp206 = "parsed " + tmp205;
                                tmp207 = Parser.tracer.print(tmp206, 204);
                                tmp208 = parseRule(innerPrec$_, rest);
                                restRes = tmp208;
                                tmp209 = runtime.safeCall(process(rhs, restRes));
                                tmp210 = infix.process(acc, tmp209);
                                return exprCont(tmp210, prec, options)
                              }
                            } else {
                              tmp211 = "the outer precedence is less than " + prec;
                              doTemp4 = Parser.tracer.print(tmp211, 207);
                              return acc
                            }
                          } else {
                            throw new globalThis.Error("match error");
                          }
                        } else if (scrut instanceof Option.None.class) {
                          tmp212 = "cannot consume " + token1;
                          tmp213 = Parser.tracer.print(tmp212, 210);
                          return acc
                        } else {
                          throw new globalThis.Error("match error");
                        }
                      }
                    } else {
                      doTemp2 = Parser.tracer.print("not a keyword", 189);
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
                          doTemp3 = Parser.tracer.print(tmp216, 192);
                          outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                          innerPrec$_ = Option.getOrElse(innerPrec, outerPrec$_);
                          scrut1 = outerPrec$_ > prec;
                          if (scrut1 === true) {
                            tmp217 = Option.getOrElse(innerPrec, outerPrec$_);
                            scrut2 = parseKind(kind, tmp217);
                            if (scrut2 instanceof Tree.Empty.class) {
                              tmp218 = Parser.tracer.print("nothing was parsed", 198);
                              return acc
                            } else if (scrut2 instanceof Tree.Error.class) {
                              tmp219 = Parser.tracer.print("cannot parse more", 201);
                              return acc
                            } else {
                              rhs = scrut2;
                              tmp220 = Tree.summary(rhs);
                              tmp221 = "parsed " + tmp220;
                              tmp222 = Parser.tracer.print(tmp221, 204);
                              tmp223 = parseRule(innerPrec$_, rest);
                              restRes = tmp223;
                              tmp224 = runtime.safeCall(process(rhs, restRes));
                              tmp225 = infix.process(acc, tmp224);
                              return exprCont(tmp225, prec, options)
                            }
                          } else {
                            tmp226 = "the outer precedence is less than " + prec;
                            doTemp4 = Parser.tracer.print(tmp226, 207);
                            return acc
                          }
                        } else {
                          throw new globalThis.Error("match error");
                        }
                      } else if (scrut instanceof Option.None.class) {
                        tmp227 = "cannot consume " + token1;
                        tmp228 = Parser.tracer.print(tmp227, 210);
                        return acc
                      } else {
                        throw new globalThis.Error("match error");
                      }
                    }
                  } else {
                    doTemp2 = Parser.tracer.print("not a keyword", 189);
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
                        doTemp3 = Parser.tracer.print(tmp231, 192);
                        outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                        innerPrec$_ = Option.getOrElse(innerPrec, outerPrec$_);
                        scrut1 = outerPrec$_ > prec;
                        if (scrut1 === true) {
                          tmp232 = Option.getOrElse(innerPrec, outerPrec$_);
                          scrut2 = parseKind(kind, tmp232);
                          if (scrut2 instanceof Tree.Empty.class) {
                            tmp233 = Parser.tracer.print("nothing was parsed", 198);
                            return acc
                          } else if (scrut2 instanceof Tree.Error.class) {
                            tmp234 = Parser.tracer.print("cannot parse more", 201);
                            return acc
                          } else {
                            rhs = scrut2;
                            tmp235 = Tree.summary(rhs);
                            tmp236 = "parsed " + tmp235;
                            tmp237 = Parser.tracer.print(tmp236, 204);
                            tmp238 = parseRule(innerPrec$_, rest);
                            restRes = tmp238;
                            tmp239 = runtime.safeCall(process(rhs, restRes));
                            tmp240 = infix.process(acc, tmp239);
                            return exprCont(tmp240, prec, options)
                          }
                        } else {
                          tmp241 = "the outer precedence is less than " + prec;
                          doTemp4 = Parser.tracer.print(tmp241, 207);
                          return acc
                        }
                      } else {
                        throw new globalThis.Error("match error");
                      }
                    } else if (scrut instanceof Option.None.class) {
                      tmp242 = "cannot consume " + token1;
                      tmp243 = Parser.tracer.print(tmp242, 210);
                      return acc
                    } else {
                      throw new globalThis.Error("match error");
                    }
                  }
                }
              } else {
                tmp244 = "keyword `" + name1;
                tmp245 = tmp244 + "` does not have infix rules";
                doTemp8 = Parser.tracer.print(tmp245, 175);
                name = param04;
                if (param13 === true) {
                  scrut3 = runtime.safeCall(Precedence.Keywords.all.get(name));
                  if (scrut3 instanceof Option.None.class) {
                    scrut4 = options.allowOperators;
                    if (scrut4 === true) {
                      tmp246 = "found an operator \"" + name;
                      tmp247 = tmp246 + "\"";
                      doTemp5 = Parser.tracer.print(tmp247, 178);
                      scrut5 = Precedence.opPrec(name);
                      if (globalThis.Array.isArray(scrut5) && scrut5.length === 2) {
                        first0 = scrut5[0];
                        first1 = scrut5[1];
                        leftPrec = first0;
                        rightPrec = first1;
                        tmp248 = "leftPrec = " + leftPrec;
                        tmp249 = tmp248 + "; rightPrec = ";
                        tmp250 = tmp249 + rightPrec;
                        doTemp6 = Parser.tracer.print(tmp250, 180);
                        scrut6 = leftPrec > prec;
                        if (scrut6 === true) {
                          tmp251 = consume();
                          tmp252 = Tree.Ident(name, true);
                          op = tmp252;
                          tmp253 = expr(rightPrec, Parser.#termOptions);
                          rhs1 = tmp253;
                          tmp254 = Stack.Cons(rhs1, Stack.Nil);
                          tmp255 = Stack.Cons(acc, tmp254);
                          tmp256 = Tree.App(op, tmp255);
                          return exprCont(tmp256, prec, options)
                        } else {
                          return acc
                        }
                      } else {
                        doTemp2 = Parser.tracer.print("not a keyword", 189);
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
                            tmp257 = "found reference to " + kind;
                            tmp258 = tmp257 + " with outerPrec = ";
                            tmp259 = tmp258 + outerPrec;
                            doTemp3 = Parser.tracer.print(tmp259, 192);
                            outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                            innerPrec$_ = Option.getOrElse(innerPrec, outerPrec$_);
                            scrut1 = outerPrec$_ > prec;
                            if (scrut1 === true) {
                              tmp260 = Option.getOrElse(innerPrec, outerPrec$_);
                              scrut2 = parseKind(kind, tmp260);
                              if (scrut2 instanceof Tree.Empty.class) {
                                tmp261 = Parser.tracer.print("nothing was parsed", 198);
                                return acc
                              } else if (scrut2 instanceof Tree.Error.class) {
                                tmp262 = Parser.tracer.print("cannot parse more", 201);
                                return acc
                              } else {
                                rhs = scrut2;
                                tmp263 = Tree.summary(rhs);
                                tmp264 = "parsed " + tmp263;
                                tmp265 = Parser.tracer.print(tmp264, 204);
                                tmp266 = parseRule(innerPrec$_, rest);
                                restRes = tmp266;
                                tmp267 = runtime.safeCall(process(rhs, restRes));
                                tmp268 = infix.process(acc, tmp267);
                                return exprCont(tmp268, prec, options)
                              }
                            } else {
                              tmp269 = "the outer precedence is less than " + prec;
                              doTemp4 = Parser.tracer.print(tmp269, 207);
                              return acc
                            }
                          } else {
                            throw new globalThis.Error("match error");
                          }
                        } else if (scrut instanceof Option.None.class) {
                          tmp270 = "cannot consume " + token1;
                          tmp271 = Parser.tracer.print(tmp270, 210);
                          return acc
                        } else {
                          throw new globalThis.Error("match error");
                        }
                      }
                    } else {
                      doTemp2 = Parser.tracer.print("not a keyword", 189);
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
                          tmp272 = "found reference to " + kind;
                          tmp273 = tmp272 + " with outerPrec = ";
                          tmp274 = tmp273 + outerPrec;
                          doTemp3 = Parser.tracer.print(tmp274, 192);
                          outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                          innerPrec$_ = Option.getOrElse(innerPrec, outerPrec$_);
                          scrut1 = outerPrec$_ > prec;
                          if (scrut1 === true) {
                            tmp275 = Option.getOrElse(innerPrec, outerPrec$_);
                            scrut2 = parseKind(kind, tmp275);
                            if (scrut2 instanceof Tree.Empty.class) {
                              tmp276 = Parser.tracer.print("nothing was parsed", 198);
                              return acc
                            } else if (scrut2 instanceof Tree.Error.class) {
                              tmp277 = Parser.tracer.print("cannot parse more", 201);
                              return acc
                            } else {
                              rhs = scrut2;
                              tmp278 = Tree.summary(rhs);
                              tmp279 = "parsed " + tmp278;
                              tmp280 = Parser.tracer.print(tmp279, 204);
                              tmp281 = parseRule(innerPrec$_, rest);
                              restRes = tmp281;
                              tmp282 = runtime.safeCall(process(rhs, restRes));
                              tmp283 = infix.process(acc, tmp282);
                              return exprCont(tmp283, prec, options)
                            }
                          } else {
                            tmp284 = "the outer precedence is less than " + prec;
                            doTemp4 = Parser.tracer.print(tmp284, 207);
                            return acc
                          }
                        } else {
                          throw new globalThis.Error("match error");
                        }
                      } else if (scrut instanceof Option.None.class) {
                        tmp285 = "cannot consume " + token1;
                        tmp286 = Parser.tracer.print(tmp285, 210);
                        return acc
                      } else {
                        throw new globalThis.Error("match error");
                      }
                    }
                  } else {
                    doTemp2 = Parser.tracer.print("not a keyword", 189);
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
                        tmp287 = "found reference to " + kind;
                        tmp288 = tmp287 + " with outerPrec = ";
                        tmp289 = tmp288 + outerPrec;
                        doTemp3 = Parser.tracer.print(tmp289, 192);
                        outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                        innerPrec$_ = Option.getOrElse(innerPrec, outerPrec$_);
                        scrut1 = outerPrec$_ > prec;
                        if (scrut1 === true) {
                          tmp290 = Option.getOrElse(innerPrec, outerPrec$_);
                          scrut2 = parseKind(kind, tmp290);
                          if (scrut2 instanceof Tree.Empty.class) {
                            tmp291 = Parser.tracer.print("nothing was parsed", 198);
                            return acc
                          } else if (scrut2 instanceof Tree.Error.class) {
                            tmp292 = Parser.tracer.print("cannot parse more", 201);
                            return acc
                          } else {
                            rhs = scrut2;
                            tmp293 = Tree.summary(rhs);
                            tmp294 = "parsed " + tmp293;
                            tmp295 = Parser.tracer.print(tmp294, 204);
                            tmp296 = parseRule(innerPrec$_, rest);
                            restRes = tmp296;
                            tmp297 = runtime.safeCall(process(rhs, restRes));
                            tmp298 = infix.process(acc, tmp297);
                            return exprCont(tmp298, prec, options)
                          }
                        } else {
                          tmp299 = "the outer precedence is less than " + prec;
                          doTemp4 = Parser.tracer.print(tmp299, 207);
                          return acc
                        }
                      } else {
                        throw new globalThis.Error("match error");
                      }
                    } else if (scrut instanceof Option.None.class) {
                      tmp300 = "cannot consume " + token1;
                      tmp301 = Parser.tracer.print(tmp300, 210);
                      return acc
                    } else {
                      throw new globalThis.Error("match error");
                    }
                  }
                } else {
                  doTemp2 = Parser.tracer.print("not a keyword", 189);
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
                      doTemp3 = Parser.tracer.print(tmp304, 192);
                      outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                      innerPrec$_ = Option.getOrElse(innerPrec, outerPrec$_);
                      scrut1 = outerPrec$_ > prec;
                      if (scrut1 === true) {
                        tmp305 = Option.getOrElse(innerPrec, outerPrec$_);
                        scrut2 = parseKind(kind, tmp305);
                        if (scrut2 instanceof Tree.Empty.class) {
                          tmp306 = Parser.tracer.print("nothing was parsed", 198);
                          return acc
                        } else if (scrut2 instanceof Tree.Error.class) {
                          tmp307 = Parser.tracer.print("cannot parse more", 201);
                          return acc
                        } else {
                          rhs = scrut2;
                          tmp308 = Tree.summary(rhs);
                          tmp309 = "parsed " + tmp308;
                          tmp310 = Parser.tracer.print(tmp309, 204);
                          tmp311 = parseRule(innerPrec$_, rest);
                          restRes = tmp311;
                          tmp312 = runtime.safeCall(process(rhs, restRes));
                          tmp313 = infix.process(acc, tmp312);
                          return exprCont(tmp313, prec, options)
                        }
                      } else {
                        tmp314 = "the outer precedence is less than " + prec;
                        doTemp4 = Parser.tracer.print(tmp314, 207);
                        return acc
                      }
                    } else {
                      throw new globalThis.Error("match error");
                    }
                  } else if (scrut instanceof Option.None.class) {
                    tmp315 = "cannot consume " + token1;
                    tmp316 = Parser.tracer.print(tmp315, 210);
                    return acc
                  } else {
                    throw new globalThis.Error("match error");
                  }
                }
              }
            } else {
              tmp317 = "keyword `" + name1;
              tmp318 = tmp317 + "` does not have infix rules";
              doTemp8 = Parser.tracer.print(tmp318, 175);
              name = param04;
              if (param13 === true) {
                scrut3 = runtime.safeCall(Precedence.Keywords.all.get(name));
                if (scrut3 instanceof Option.None.class) {
                  scrut4 = options.allowOperators;
                  if (scrut4 === true) {
                    tmp319 = "found an operator \"" + name;
                    tmp320 = tmp319 + "\"";
                    doTemp5 = Parser.tracer.print(tmp320, 178);
                    scrut5 = Precedence.opPrec(name);
                    if (globalThis.Array.isArray(scrut5) && scrut5.length === 2) {
                      first0 = scrut5[0];
                      first1 = scrut5[1];
                      leftPrec = first0;
                      rightPrec = first1;
                      tmp321 = "leftPrec = " + leftPrec;
                      tmp322 = tmp321 + "; rightPrec = ";
                      tmp323 = tmp322 + rightPrec;
                      doTemp6 = Parser.tracer.print(tmp323, 180);
                      scrut6 = leftPrec > prec;
                      if (scrut6 === true) {
                        tmp324 = consume();
                        tmp325 = Tree.Ident(name, true);
                        op = tmp325;
                        tmp326 = expr(rightPrec, Parser.#termOptions);
                        rhs1 = tmp326;
                        tmp327 = Stack.Cons(rhs1, Stack.Nil);
                        tmp328 = Stack.Cons(acc, tmp327);
                        tmp329 = Tree.App(op, tmp328);
                        return exprCont(tmp329, prec, options)
                      } else {
                        return acc
                      }
                    } else {
                      doTemp2 = Parser.tracer.print("not a keyword", 189);
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
                          tmp330 = "found reference to " + kind;
                          tmp331 = tmp330 + " with outerPrec = ";
                          tmp332 = tmp331 + outerPrec;
                          doTemp3 = Parser.tracer.print(tmp332, 192);
                          outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                          innerPrec$_ = Option.getOrElse(innerPrec, outerPrec$_);
                          scrut1 = outerPrec$_ > prec;
                          if (scrut1 === true) {
                            tmp333 = Option.getOrElse(innerPrec, outerPrec$_);
                            scrut2 = parseKind(kind, tmp333);
                            if (scrut2 instanceof Tree.Empty.class) {
                              tmp334 = Parser.tracer.print("nothing was parsed", 198);
                              return acc
                            } else if (scrut2 instanceof Tree.Error.class) {
                              tmp335 = Parser.tracer.print("cannot parse more", 201);
                              return acc
                            } else {
                              rhs = scrut2;
                              tmp336 = Tree.summary(rhs);
                              tmp337 = "parsed " + tmp336;
                              tmp338 = Parser.tracer.print(tmp337, 204);
                              tmp339 = parseRule(innerPrec$_, rest);
                              restRes = tmp339;
                              tmp340 = runtime.safeCall(process(rhs, restRes));
                              tmp341 = infix.process(acc, tmp340);
                              return exprCont(tmp341, prec, options)
                            }
                          } else {
                            tmp342 = "the outer precedence is less than " + prec;
                            doTemp4 = Parser.tracer.print(tmp342, 207);
                            return acc
                          }
                        } else {
                          throw new globalThis.Error("match error");
                        }
                      } else if (scrut instanceof Option.None.class) {
                        tmp343 = "cannot consume " + token1;
                        tmp344 = Parser.tracer.print(tmp343, 210);
                        return acc
                      } else {
                        throw new globalThis.Error("match error");
                      }
                    }
                  } else {
                    doTemp2 = Parser.tracer.print("not a keyword", 189);
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
                        tmp345 = "found reference to " + kind;
                        tmp346 = tmp345 + " with outerPrec = ";
                        tmp347 = tmp346 + outerPrec;
                        doTemp3 = Parser.tracer.print(tmp347, 192);
                        outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                        innerPrec$_ = Option.getOrElse(innerPrec, outerPrec$_);
                        scrut1 = outerPrec$_ > prec;
                        if (scrut1 === true) {
                          tmp348 = Option.getOrElse(innerPrec, outerPrec$_);
                          scrut2 = parseKind(kind, tmp348);
                          if (scrut2 instanceof Tree.Empty.class) {
                            tmp349 = Parser.tracer.print("nothing was parsed", 198);
                            return acc
                          } else if (scrut2 instanceof Tree.Error.class) {
                            tmp350 = Parser.tracer.print("cannot parse more", 201);
                            return acc
                          } else {
                            rhs = scrut2;
                            tmp351 = Tree.summary(rhs);
                            tmp352 = "parsed " + tmp351;
                            tmp353 = Parser.tracer.print(tmp352, 204);
                            tmp354 = parseRule(innerPrec$_, rest);
                            restRes = tmp354;
                            tmp355 = runtime.safeCall(process(rhs, restRes));
                            tmp356 = infix.process(acc, tmp355);
                            return exprCont(tmp356, prec, options)
                          }
                        } else {
                          tmp357 = "the outer precedence is less than " + prec;
                          doTemp4 = Parser.tracer.print(tmp357, 207);
                          return acc
                        }
                      } else {
                        throw new globalThis.Error("match error");
                      }
                    } else if (scrut instanceof Option.None.class) {
                      tmp358 = "cannot consume " + token1;
                      tmp359 = Parser.tracer.print(tmp358, 210);
                      return acc
                    } else {
                      throw new globalThis.Error("match error");
                    }
                  }
                } else {
                  doTemp2 = Parser.tracer.print("not a keyword", 189);
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
                      tmp360 = "found reference to " + kind;
                      tmp361 = tmp360 + " with outerPrec = ";
                      tmp362 = tmp361 + outerPrec;
                      doTemp3 = Parser.tracer.print(tmp362, 192);
                      outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                      innerPrec$_ = Option.getOrElse(innerPrec, outerPrec$_);
                      scrut1 = outerPrec$_ > prec;
                      if (scrut1 === true) {
                        tmp363 = Option.getOrElse(innerPrec, outerPrec$_);
                        scrut2 = parseKind(kind, tmp363);
                        if (scrut2 instanceof Tree.Empty.class) {
                          tmp364 = Parser.tracer.print("nothing was parsed", 198);
                          return acc
                        } else if (scrut2 instanceof Tree.Error.class) {
                          tmp365 = Parser.tracer.print("cannot parse more", 201);
                          return acc
                        } else {
                          rhs = scrut2;
                          tmp366 = Tree.summary(rhs);
                          tmp367 = "parsed " + tmp366;
                          tmp368 = Parser.tracer.print(tmp367, 204);
                          tmp369 = parseRule(innerPrec$_, rest);
                          restRes = tmp369;
                          tmp370 = runtime.safeCall(process(rhs, restRes));
                          tmp371 = infix.process(acc, tmp370);
                          return exprCont(tmp371, prec, options)
                        }
                      } else {
                        tmp372 = "the outer precedence is less than " + prec;
                        doTemp4 = Parser.tracer.print(tmp372, 207);
                        return acc
                      }
                    } else {
                      throw new globalThis.Error("match error");
                    }
                  } else if (scrut instanceof Option.None.class) {
                    tmp373 = "cannot consume " + token1;
                    tmp374 = Parser.tracer.print(tmp373, 210);
                    return acc
                  } else {
                    throw new globalThis.Error("match error");
                  }
                }
              } else {
                doTemp2 = Parser.tracer.print("not a keyword", 189);
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
                    tmp375 = "found reference to " + kind;
                    tmp376 = tmp375 + " with outerPrec = ";
                    tmp377 = tmp376 + outerPrec;
                    doTemp3 = Parser.tracer.print(tmp377, 192);
                    outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                    innerPrec$_ = Option.getOrElse(innerPrec, outerPrec$_);
                    scrut1 = outerPrec$_ > prec;
                    if (scrut1 === true) {
                      tmp378 = Option.getOrElse(innerPrec, outerPrec$_);
                      scrut2 = parseKind(kind, tmp378);
                      if (scrut2 instanceof Tree.Empty.class) {
                        tmp379 = Parser.tracer.print("nothing was parsed", 198);
                        return acc
                      } else if (scrut2 instanceof Tree.Error.class) {
                        tmp380 = Parser.tracer.print("cannot parse more", 201);
                        return acc
                      } else {
                        rhs = scrut2;
                        tmp381 = Tree.summary(rhs);
                        tmp382 = "parsed " + tmp381;
                        tmp383 = Parser.tracer.print(tmp382, 204);
                        tmp384 = parseRule(innerPrec$_, rest);
                        restRes = tmp384;
                        tmp385 = runtime.safeCall(process(rhs, restRes));
                        tmp386 = infix.process(acc, tmp385);
                        return exprCont(tmp386, prec, options)
                      }
                    } else {
                      tmp387 = "the outer precedence is less than " + prec;
                      doTemp4 = Parser.tracer.print(tmp387, 207);
                      return acc
                    }
                  } else {
                    throw new globalThis.Error("match error");
                  }
                } else if (scrut instanceof Option.None.class) {
                  tmp388 = "cannot consume " + token1;
                  tmp389 = Parser.tracer.print(tmp388, 210);
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
                  tmp390 = "found an operator \"" + name;
                  tmp391 = tmp390 + "\"";
                  doTemp5 = Parser.tracer.print(tmp391, 178);
                  scrut5 = Precedence.opPrec(name);
                  if (globalThis.Array.isArray(scrut5) && scrut5.length === 2) {
                    first0 = scrut5[0];
                    first1 = scrut5[1];
                    leftPrec = first0;
                    rightPrec = first1;
                    tmp392 = "leftPrec = " + leftPrec;
                    tmp393 = tmp392 + "; rightPrec = ";
                    tmp394 = tmp393 + rightPrec;
                    doTemp6 = Parser.tracer.print(tmp394, 180);
                    scrut6 = leftPrec > prec;
                    if (scrut6 === true) {
                      tmp395 = consume();
                      tmp396 = Tree.Ident(name, true);
                      op = tmp396;
                      tmp397 = expr(rightPrec, Parser.#termOptions);
                      rhs1 = tmp397;
                      tmp398 = Stack.Cons(rhs1, Stack.Nil);
                      tmp399 = Stack.Cons(acc, tmp398);
                      tmp400 = Tree.App(op, tmp399);
                      return exprCont(tmp400, prec, options)
                    } else {
                      return acc
                    }
                  } else {
                    doTemp2 = Parser.tracer.print("not a keyword", 189);
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
                        tmp401 = "found reference to " + kind;
                        tmp402 = tmp401 + " with outerPrec = ";
                        tmp403 = tmp402 + outerPrec;
                        doTemp3 = Parser.tracer.print(tmp403, 192);
                        outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                        innerPrec$_ = Option.getOrElse(innerPrec, outerPrec$_);
                        scrut1 = outerPrec$_ > prec;
                        if (scrut1 === true) {
                          tmp404 = Option.getOrElse(innerPrec, outerPrec$_);
                          scrut2 = parseKind(kind, tmp404);
                          if (scrut2 instanceof Tree.Empty.class) {
                            tmp405 = Parser.tracer.print("nothing was parsed", 198);
                            return acc
                          } else if (scrut2 instanceof Tree.Error.class) {
                            tmp406 = Parser.tracer.print("cannot parse more", 201);
                            return acc
                          } else {
                            rhs = scrut2;
                            tmp407 = Tree.summary(rhs);
                            tmp408 = "parsed " + tmp407;
                            tmp409 = Parser.tracer.print(tmp408, 204);
                            tmp410 = parseRule(innerPrec$_, rest);
                            restRes = tmp410;
                            tmp411 = runtime.safeCall(process(rhs, restRes));
                            tmp412 = infix.process(acc, tmp411);
                            return exprCont(tmp412, prec, options)
                          }
                        } else {
                          tmp413 = "the outer precedence is less than " + prec;
                          doTemp4 = Parser.tracer.print(tmp413, 207);
                          return acc
                        }
                      } else {
                        throw new globalThis.Error("match error");
                      }
                    } else if (scrut instanceof Option.None.class) {
                      tmp414 = "cannot consume " + token1;
                      tmp415 = Parser.tracer.print(tmp414, 210);
                      return acc
                    } else {
                      throw new globalThis.Error("match error");
                    }
                  }
                } else {
                  doTemp2 = Parser.tracer.print("not a keyword", 189);
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
                      tmp416 = "found reference to " + kind;
                      tmp417 = tmp416 + " with outerPrec = ";
                      tmp418 = tmp417 + outerPrec;
                      doTemp3 = Parser.tracer.print(tmp418, 192);
                      outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                      innerPrec$_ = Option.getOrElse(innerPrec, outerPrec$_);
                      scrut1 = outerPrec$_ > prec;
                      if (scrut1 === true) {
                        tmp419 = Option.getOrElse(innerPrec, outerPrec$_);
                        scrut2 = parseKind(kind, tmp419);
                        if (scrut2 instanceof Tree.Empty.class) {
                          tmp420 = Parser.tracer.print("nothing was parsed", 198);
                          return acc
                        } else if (scrut2 instanceof Tree.Error.class) {
                          tmp421 = Parser.tracer.print("cannot parse more", 201);
                          return acc
                        } else {
                          rhs = scrut2;
                          tmp422 = Tree.summary(rhs);
                          tmp423 = "parsed " + tmp422;
                          tmp424 = Parser.tracer.print(tmp423, 204);
                          tmp425 = parseRule(innerPrec$_, rest);
                          restRes = tmp425;
                          tmp426 = runtime.safeCall(process(rhs, restRes));
                          tmp427 = infix.process(acc, tmp426);
                          return exprCont(tmp427, prec, options)
                        }
                      } else {
                        tmp428 = "the outer precedence is less than " + prec;
                        doTemp4 = Parser.tracer.print(tmp428, 207);
                        return acc
                      }
                    } else {
                      throw new globalThis.Error("match error");
                    }
                  } else if (scrut instanceof Option.None.class) {
                    tmp429 = "cannot consume " + token1;
                    tmp430 = Parser.tracer.print(tmp429, 210);
                    return acc
                  } else {
                    throw new globalThis.Error("match error");
                  }
                }
              } else {
                doTemp2 = Parser.tracer.print("not a keyword", 189);
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
                    tmp431 = "found reference to " + kind;
                    tmp432 = tmp431 + " with outerPrec = ";
                    tmp433 = tmp432 + outerPrec;
                    doTemp3 = Parser.tracer.print(tmp433, 192);
                    outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                    innerPrec$_ = Option.getOrElse(innerPrec, outerPrec$_);
                    scrut1 = outerPrec$_ > prec;
                    if (scrut1 === true) {
                      tmp434 = Option.getOrElse(innerPrec, outerPrec$_);
                      scrut2 = parseKind(kind, tmp434);
                      if (scrut2 instanceof Tree.Empty.class) {
                        tmp435 = Parser.tracer.print("nothing was parsed", 198);
                        return acc
                      } else if (scrut2 instanceof Tree.Error.class) {
                        tmp436 = Parser.tracer.print("cannot parse more", 201);
                        return acc
                      } else {
                        rhs = scrut2;
                        tmp437 = Tree.summary(rhs);
                        tmp438 = "parsed " + tmp437;
                        tmp439 = Parser.tracer.print(tmp438, 204);
                        tmp440 = parseRule(innerPrec$_, rest);
                        restRes = tmp440;
                        tmp441 = runtime.safeCall(process(rhs, restRes));
                        tmp442 = infix.process(acc, tmp441);
                        return exprCont(tmp442, prec, options)
                      }
                    } else {
                      tmp443 = "the outer precedence is less than " + prec;
                      doTemp4 = Parser.tracer.print(tmp443, 207);
                      return acc
                    }
                  } else {
                    throw new globalThis.Error("match error");
                  }
                } else if (scrut instanceof Option.None.class) {
                  tmp444 = "cannot consume " + token1;
                  tmp445 = Parser.tracer.print(tmp444, 210);
                  return acc
                } else {
                  throw new globalThis.Error("match error");
                }
              }
            } else {
              doTemp2 = Parser.tracer.print("not a keyword", 189);
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
                  tmp446 = "found reference to " + kind;
                  tmp447 = tmp446 + " with outerPrec = ";
                  tmp448 = tmp447 + outerPrec;
                  doTemp3 = Parser.tracer.print(tmp448, 192);
                  outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                  innerPrec$_ = Option.getOrElse(innerPrec, outerPrec$_);
                  scrut1 = outerPrec$_ > prec;
                  if (scrut1 === true) {
                    tmp449 = Option.getOrElse(innerPrec, outerPrec$_);
                    scrut2 = parseKind(kind, tmp449);
                    if (scrut2 instanceof Tree.Empty.class) {
                      tmp450 = Parser.tracer.print("nothing was parsed", 198);
                      return acc
                    } else if (scrut2 instanceof Tree.Error.class) {
                      tmp451 = Parser.tracer.print("cannot parse more", 201);
                      return acc
                    } else {
                      rhs = scrut2;
                      tmp452 = Tree.summary(rhs);
                      tmp453 = "parsed " + tmp452;
                      tmp454 = Parser.tracer.print(tmp453, 204);
                      tmp455 = parseRule(innerPrec$_, rest);
                      restRes = tmp455;
                      tmp456 = runtime.safeCall(process(rhs, restRes));
                      tmp457 = infix.process(acc, tmp456);
                      return exprCont(tmp457, prec, options)
                    }
                  } else {
                    tmp458 = "the outer precedence is less than " + prec;
                    doTemp4 = Parser.tracer.print(tmp458, 207);
                    return acc
                  }
                } else {
                  throw new globalThis.Error("match error");
                }
              } else if (scrut instanceof Option.None.class) {
                tmp459 = "cannot consume " + token1;
                tmp460 = Parser.tracer.print(tmp459, 210);
                return acc
              } else {
                throw new globalThis.Error("match error");
              }
            }
          }
        } else {
          doTemp2 = Parser.tracer.print("not a keyword", 189);
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
              tmp461 = "found reference to " + kind;
              tmp462 = tmp461 + " with outerPrec = ";
              tmp463 = tmp462 + outerPrec;
              doTemp3 = Parser.tracer.print(tmp463, 192);
              outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
              innerPrec$_ = Option.getOrElse(innerPrec, outerPrec$_);
              scrut1 = outerPrec$_ > prec;
              if (scrut1 === true) {
                tmp464 = Option.getOrElse(innerPrec, outerPrec$_);
                scrut2 = parseKind(kind, tmp464);
                if (scrut2 instanceof Tree.Empty.class) {
                  tmp465 = Parser.tracer.print("nothing was parsed", 198);
                  return acc
                } else if (scrut2 instanceof Tree.Error.class) {
                  tmp466 = Parser.tracer.print("cannot parse more", 201);
                  return acc
                } else {
                  rhs = scrut2;
                  tmp467 = Tree.summary(rhs);
                  tmp468 = "parsed " + tmp467;
                  tmp469 = Parser.tracer.print(tmp468, 204);
                  tmp470 = parseRule(innerPrec$_, rest);
                  restRes = tmp470;
                  tmp471 = runtime.safeCall(process(rhs, restRes));
                  tmp472 = infix.process(acc, tmp471);
                  return exprCont(tmp472, prec, options)
                }
              } else {
                tmp473 = "the outer precedence is less than " + prec;
                doTemp4 = Parser.tracer.print(tmp473, 207);
                return acc
              }
            } else {
              throw new globalThis.Error("match error");
            }
          } else if (scrut instanceof Option.None.class) {
            tmp474 = "cannot consume " + token1;
            tmp475 = Parser.tracer.print(tmp474, 210);
            return acc
          } else {
            throw new globalThis.Error("match error");
          }
        }
      } else {
        doTemp2 = Parser.tracer.print("not a keyword", 189);
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
      doTemp = Parser.tracer.print(">>>>>> mod <<<<<<", 231);
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
      doTemp = Parser.tracer.print(tmp4, 253);
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
      tmp2 = Parser.tracer.print(message, 266);
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
