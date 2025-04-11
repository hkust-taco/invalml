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
let Parser1;
Parser1 = class Parser {
  static #termOptions;
  static #typeOptions;
  static {
    let name, rule, infixRule, allowOperators, allowLiterals, name1, rule1, infixRule1, allowOperators1, allowLiterals1, tmp;
    tmp = new TreeTracer.TreeTracer();
    this.tracer = tmp;
    name = "term";
    rule = Rules.termRule;
    infixRule = Rules.termInfixRule;
    allowOperators = true;
    allowLiterals = true;
    Parser.#termOptions = {
    "name": name, "rule": rule, "infixRule": infixRule, "allowOperators": allowOperators, "allowLiterals": allowLiterals
    };
    name1 = "typeExpr";
    rule1 = Rules.typeRule;
    infixRule1 = Rules.typeInfixRule;
    allowOperators1 = false;
    allowLiterals1 = true;
    Parser.#typeOptions = {
    "name": name1, "rule": rule1, "infixRule": infixRule1, "allowOperators": allowOperators1, "allowLiterals": allowLiterals1
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
        let scrut, param01, value, param02, param11, other, doTemp, doTemp1, doTemp2, scrut1, param03, value1, scrut2, param04, first4, first3, first2, first1, first0, kind, process, outerPrec, innerPrec, rest, doTemp3, outerPrec$_, innerPrec$_, doTemp4, scrut3, scrut4, acc, tree1, scrut5, param05, value2, param06, param12, name, doTemp5, scrut6, param07, keyword, doTemp6, doTemp7, scrut7, doTemp8, param08, rest1, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20, tmp21, tmp22, tmp23, tmp24, tmp25, tmp26, tmp27, tmp28, tmp29, tmp30, tmp31, tmp32, tmp33, tmp34, tmp35, tmp36, tmp37, tmp38, tmp39, tmp40, tmp41, tmp42, tmp43, tmp44, tmp45, tmp46, tmp47, tmp48, tmp49, tmp50, tmp51, tmp52, tmp53, tmp54, tmp55, tmp56, tmp57, tmp58, tmp59, tmp60, tmp61, tmp62, tmp63, tmp64, tmp65, tmp66, tmp67, tmp68, tmp69, tmp70, tmp71, tmp72, tmp73, tmp74, tmp75, tmp76, tmp77, tmp78, tmp79, tmp80, tmp81, tmp82, tmp83, tmp84, tmp85, tmp86, tmp87, tmp88, tmp89, tmp90, tmp91, tmp92, tmp93, tmp94, tmp95, tmp96, lambda4;
        if (tokens instanceof Stack.Cons.class) {
          param02 = tokens.head;
          param11 = tokens.tail;
          if (param02 instanceof Token.Identifier.class) {
            param06 = param02.name;
            param12 = param02.symbolic;
            name = param06;
            tmp7 = "found an identifier \"" + name;
            tmp8 = tmp7 + "\"";
            doTemp5 = Parser.tracer.print(tmp8, 72);
            scrut6 = runtime.safeCall(Precedence.Keywords.all.get(name));
            if (scrut6 instanceof Option.Some.class) {
              param07 = scrut6.value;
              keyword = param07;
              tmp9 = runtime.safeCall(keyword.toString());
              doTemp6 = Parser.tracer.print(tmp9, 74);
              lambda4 = (undefined, function (caseScrut) {
                let first11, first01, k, v, tmp97;
                if (globalThis.Array.isArray(caseScrut) && caseScrut.length === 2) {
                  first01 = caseScrut[0];
                  first11 = caseScrut[1];
                  k = first01;
                  v = first11;
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
                param08 = scrut7.value;
                rest1 = param08;
                tmp13 = "found a rule starting with `" + name;
                tmp14 = tmp13 + "`";
                tmp15 = Parser.tracer.print(tmp14, 80);
                tmp16 = "the rest of the rule: " + rest1.display;
                tmp17 = Parser.tracer.print(tmp16, 81);
                tmp18 = consume();
                return parseRule(0, rest1)
              } else {
                tmp19 = "\"" + name;
                tmp20 = tmp19 + "\" is not a keyword";
                doTemp8 = Parser.tracer.print(tmp20, 84);
                other = param02;
                tmp21 = "the current rule is " + rule.display;
                doTemp = runtime.safeCall(Parser.tracer.print(tmp21));
                scrut2 = rule.refChoice;
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
                    tmp22 = "try to parse kind \"" + kind;
                    tmp23 = tmp22 + "\" at ";
                    tmp24 = TokenHelpers.preview(tokens);
                    tmp25 = tmp23 + tmp24;
                    doTemp3 = Parser.tracer.print(tmp25, 88);
                    outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxKeywordPrec);
                    innerPrec$_ = Option.getOrElse(innerPrec, prec);
                    scrut3 = outerPrec$_ > prec;
                    if (scrut3 === true) {
                      scrut4 = parseKind(kind, prec);
                      if (scrut4 instanceof Tree.Error.class) {
                        tmp26 = Parser.tracer.print("cannot parse more", 93);
                        scrut5 = rule.endChoice;
                        if (scrut5 instanceof Option.Some.class) {
                          param05 = scrut5.value;
                          value2 = param05;
                          tmp27 = Parser.tracer.print("found end choice", 95);
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
                        tmp31 = Parser.tracer.print(tmp30, 99);
                        tmp32 = Tree.summary(tree1);
                        tmp33 = "parsed from rest rule: " + tmp32;
                        tmp34 = Parser.tracer.print(tmp33, 100);
                        return runtime.safeCall(process(acc, tree1))
                      }
                    } else {
                      tmp35 = "did not parse kind \"" + kind;
                      tmp36 = tmp35 + "\" because of the precedence";
                      doTemp4 = Parser.tracer.print(tmp36, 102);
                      doTemp1 = Parser.tracer.print("no reference choice", 103);
                      scrut1 = rule.endChoice;
                      if (scrut1 instanceof Option.Some.class) {
                        param03 = scrut1.value;
                        value1 = param03;
                        tmp37 = Parser.tracer.print("found end choice", 105);
                        return value1
                      } else {
                        doTemp2 = Parser.tracer.print("no end choice", 107);
                        tmp38 = consume();
                        tmp39 = "unexpected token " + other;
                        return Tree.error(tmp39)
                      }
                    }
                  } else {
                    doTemp1 = Parser.tracer.print("no reference choice", 103);
                    scrut1 = rule.endChoice;
                    if (scrut1 instanceof Option.Some.class) {
                      param03 = scrut1.value;
                      value1 = param03;
                      tmp40 = Parser.tracer.print("found end choice", 105);
                      return value1
                    } else {
                      doTemp2 = Parser.tracer.print("no end choice", 107);
                      tmp41 = consume();
                      tmp42 = "unexpected token " + other;
                      return Tree.error(tmp42)
                    }
                  }
                } else {
                  doTemp1 = Parser.tracer.print("no reference choice", 103);
                  scrut1 = rule.endChoice;
                  if (scrut1 instanceof Option.Some.class) {
                    param03 = scrut1.value;
                    value1 = param03;
                    tmp43 = Parser.tracer.print("found end choice", 105);
                    return value1
                  } else {
                    doTemp2 = Parser.tracer.print("no end choice", 107);
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
                  tmp47 = "try to parse kind \"" + kind;
                  tmp48 = tmp47 + "\" at ";
                  tmp49 = TokenHelpers.preview(tokens);
                  tmp50 = tmp48 + tmp49;
                  doTemp3 = Parser.tracer.print(tmp50, 88);
                  outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxKeywordPrec);
                  innerPrec$_ = Option.getOrElse(innerPrec, prec);
                  scrut3 = outerPrec$_ > prec;
                  if (scrut3 === true) {
                    scrut4 = parseKind(kind, prec);
                    if (scrut4 instanceof Tree.Error.class) {
                      tmp51 = Parser.tracer.print("cannot parse more", 93);
                      scrut5 = rule.endChoice;
                      if (scrut5 instanceof Option.Some.class) {
                        param05 = scrut5.value;
                        value2 = param05;
                        tmp52 = Parser.tracer.print("found end choice", 95);
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
                      tmp56 = Parser.tracer.print(tmp55, 99);
                      tmp57 = Tree.summary(tree1);
                      tmp58 = "parsed from rest rule: " + tmp57;
                      tmp59 = Parser.tracer.print(tmp58, 100);
                      return runtime.safeCall(process(acc, tree1))
                    }
                  } else {
                    tmp60 = "did not parse kind \"" + kind;
                    tmp61 = tmp60 + "\" because of the precedence";
                    doTemp4 = Parser.tracer.print(tmp61, 102);
                    doTemp1 = Parser.tracer.print("no reference choice", 103);
                    scrut1 = rule.endChoice;
                    if (scrut1 instanceof Option.Some.class) {
                      param03 = scrut1.value;
                      value1 = param03;
                      tmp62 = Parser.tracer.print("found end choice", 105);
                      return value1
                    } else {
                      doTemp2 = Parser.tracer.print("no end choice", 107);
                      tmp63 = consume();
                      tmp64 = "unexpected token " + other;
                      return Tree.error(tmp64)
                    }
                  }
                } else {
                  doTemp1 = Parser.tracer.print("no reference choice", 103);
                  scrut1 = rule.endChoice;
                  if (scrut1 instanceof Option.Some.class) {
                    param03 = scrut1.value;
                    value1 = param03;
                    tmp65 = Parser.tracer.print("found end choice", 105);
                    return value1
                  } else {
                    doTemp2 = Parser.tracer.print("no end choice", 107);
                    tmp66 = consume();
                    tmp67 = "unexpected token " + other;
                    return Tree.error(tmp67)
                  }
                }
              } else {
                doTemp1 = Parser.tracer.print("no reference choice", 103);
                scrut1 = rule.endChoice;
                if (scrut1 instanceof Option.Some.class) {
                  param03 = scrut1.value;
                  value1 = param03;
                  tmp68 = Parser.tracer.print("found end choice", 105);
                  return value1
                } else {
                  doTemp2 = Parser.tracer.print("no end choice", 107);
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
                tmp72 = "try to parse kind \"" + kind;
                tmp73 = tmp72 + "\" at ";
                tmp74 = TokenHelpers.preview(tokens);
                tmp75 = tmp73 + tmp74;
                doTemp3 = Parser.tracer.print(tmp75, 88);
                outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxKeywordPrec);
                innerPrec$_ = Option.getOrElse(innerPrec, prec);
                scrut3 = outerPrec$_ > prec;
                if (scrut3 === true) {
                  scrut4 = parseKind(kind, prec);
                  if (scrut4 instanceof Tree.Error.class) {
                    tmp76 = Parser.tracer.print("cannot parse more", 93);
                    scrut5 = rule.endChoice;
                    if (scrut5 instanceof Option.Some.class) {
                      param05 = scrut5.value;
                      value2 = param05;
                      tmp77 = Parser.tracer.print("found end choice", 95);
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
                    tmp81 = Parser.tracer.print(tmp80, 99);
                    tmp82 = Tree.summary(tree1);
                    tmp83 = "parsed from rest rule: " + tmp82;
                    tmp84 = Parser.tracer.print(tmp83, 100);
                    return runtime.safeCall(process(acc, tree1))
                  }
                } else {
                  tmp85 = "did not parse kind \"" + kind;
                  tmp86 = tmp85 + "\" because of the precedence";
                  doTemp4 = Parser.tracer.print(tmp86, 102);
                  doTemp1 = Parser.tracer.print("no reference choice", 103);
                  scrut1 = rule.endChoice;
                  if (scrut1 instanceof Option.Some.class) {
                    param03 = scrut1.value;
                    value1 = param03;
                    tmp87 = Parser.tracer.print("found end choice", 105);
                    return value1
                  } else {
                    doTemp2 = Parser.tracer.print("no end choice", 107);
                    tmp88 = consume();
                    tmp89 = "unexpected token " + other;
                    return Tree.error(tmp89)
                  }
                }
              } else {
                doTemp1 = Parser.tracer.print("no reference choice", 103);
                scrut1 = rule.endChoice;
                if (scrut1 instanceof Option.Some.class) {
                  param03 = scrut1.value;
                  value1 = param03;
                  tmp90 = Parser.tracer.print("found end choice", 105);
                  return value1
                } else {
                  doTemp2 = Parser.tracer.print("no end choice", 107);
                  tmp91 = consume();
                  tmp92 = "unexpected token " + other;
                  return Tree.error(tmp92)
                }
              }
            } else {
              doTemp1 = Parser.tracer.print("no reference choice", 103);
              scrut1 = rule.endChoice;
              if (scrut1 instanceof Option.Some.class) {
                param03 = scrut1.value;
                value1 = param03;
                tmp93 = Parser.tracer.print("found end choice", 105);
                return value1
              } else {
                doTemp2 = Parser.tracer.print("no end choice", 107);
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
            tmp96 = Parser.tracer.print("no end choice but found the end of input", 114);
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
      tmp3 = options.name + " <<< ";
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
                  tmp13 = Parser.tracer.print(tmp12, 129);
                  return Tree.empty
                }
              } else if (scrut3 instanceof Option.None.class) {
                tmp14 = "no rule starting with " + name;
                tmp15 = Parser.tracer.print(tmp14, 132);
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
                  tmp17 = "symbolic identifiers are disallowed in kind \"" + options.name;
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
        tmp9 = options.name + " >>> ";
        tmp10 = Tree.summary(result);
        return tmp9 + tmp10
      });
      return runtime.safeCall(Parser.tracer.trace(tmp7, lambda3, tmp8))
    };
    exprCont = function exprCont(acc, prec, options) {
      let doTemp, doTemp1, doTemp2, param01, param11, token1, scrut, param02, first4, first3, first2, first1, first0, kind, process, outerPrec, innerPrec, rest, doTemp3, outerPrec$_, doTemp4, scrut1, scrut2, rhs, param03, param12, name, scrut3, scrut4, doTemp5, scrut5, first11, first01, leftPrec, rightPrec, doTemp6, scrut6, op, rhs1, name1, scrut7, param04, keyword, doTemp7, doTemp8, scrut8, param05, rule, doTemp9, scrut9, scrut10, param06, first41, first31, first21, first12, first02, kind1, process1, outerPrec1, innerPrec1, rest1, doTemp10, outerPrec$_1, innerPrec$_, scrut11, rhs2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20, tmp21, tmp22, tmp23, tmp24, tmp25, tmp26, tmp27, tmp28, tmp29, tmp30, tmp31, tmp32, tmp33, tmp34, tmp35, tmp36, tmp37, tmp38, tmp39, tmp40, tmp41, tmp42, tmp43, tmp44, tmp45, tmp46, tmp47, tmp48, tmp49, tmp50, tmp51, tmp52, tmp53, tmp54, tmp55, tmp56, tmp57, tmp58, tmp59, tmp60, tmp61, tmp62, tmp63, tmp64, tmp65, tmp66, tmp67, tmp68, tmp69, tmp70, tmp71, tmp72, tmp73, tmp74, tmp75, tmp76, tmp77, tmp78, tmp79, tmp80, tmp81, tmp82, tmp83, tmp84, tmp85, tmp86, tmp87, tmp88, tmp89, tmp90, tmp91, tmp92, tmp93, tmp94, tmp95, tmp96, tmp97, tmp98, tmp99, tmp100, tmp101, tmp102, tmp103, tmp104, tmp105, tmp106, tmp107, tmp108, tmp109, tmp110, tmp111, tmp112, tmp113, tmp114, tmp115, tmp116, tmp117, tmp118, tmp119, tmp120, tmp121, tmp122, tmp123, tmp124, tmp125, tmp126, tmp127, tmp128, tmp129, tmp130, tmp131, tmp132, tmp133, tmp134, tmp135, tmp136, tmp137, tmp138, tmp139, tmp140, tmp141, tmp142, tmp143, tmp144, tmp145, tmp146, tmp147, tmp148, tmp149, tmp150, tmp151, tmp152, tmp153, tmp154, tmp155, tmp156, tmp157, tmp158, tmp159, tmp160, tmp161, tmp162, tmp163, tmp164, tmp165, tmp166, tmp167, tmp168, tmp169, tmp170, tmp171, tmp172, tmp173, tmp174, tmp175, tmp176, tmp177, tmp178, tmp179, tmp180, tmp181, tmp182, tmp183, tmp184, tmp185, tmp186, tmp187, tmp188, tmp189, tmp190, tmp191, tmp192, tmp193, tmp194, tmp195, tmp196, tmp197, tmp198, tmp199, tmp200, tmp201, tmp202, tmp203, tmp204, tmp205, tmp206, tmp207, tmp208, tmp209, tmp210, tmp211, tmp212, tmp213, tmp214, tmp215, tmp216, tmp217, tmp218, tmp219, tmp220, tmp221, tmp222, tmp223, tmp224, tmp225, tmp226, tmp227, tmp228, tmp229, tmp230, tmp231, tmp232, tmp233, tmp234, tmp235, tmp236, tmp237, tmp238, tmp239, tmp240, tmp241, tmp242, tmp243, tmp244, tmp245, tmp246, tmp247, tmp248, tmp249, tmp250, tmp251, tmp252, tmp253, tmp254, tmp255, tmp256, tmp257, tmp258, tmp259, tmp260, tmp261, tmp262, tmp263, tmp264, tmp265, tmp266, tmp267, tmp268, tmp269, tmp270, tmp271, tmp272, tmp273, tmp274, tmp275, tmp276, tmp277, tmp278, tmp279, tmp280, tmp281, tmp282, tmp283, tmp284, tmp285, tmp286, tmp287, tmp288, tmp289, tmp290, tmp291, tmp292, tmp293, tmp294, tmp295, tmp296, tmp297, tmp298, tmp299, tmp300, tmp301, tmp302, tmp303, tmp304, tmp305, tmp306, tmp307, tmp308, tmp309, tmp310, tmp311, tmp312, tmp313, tmp314, tmp315, tmp316, tmp317, tmp318, tmp319, tmp320, tmp321, tmp322, tmp323, tmp324, tmp325, tmp326, tmp327, tmp328, tmp329, tmp330, tmp331, tmp332, tmp333, tmp334, tmp335, tmp336, tmp337, tmp338, tmp339, tmp340, tmp341, tmp342, tmp343, tmp344, tmp345, tmp346, tmp347, tmp348, tmp349, tmp350, tmp351, tmp352, tmp353, tmp354, tmp355, tmp356, tmp357, tmp358, tmp359, tmp360, tmp361, tmp362, tmp363, tmp364, tmp365, tmp366, tmp367, tmp368, tmp369, tmp370, tmp371, tmp372, tmp373, tmp374, tmp375, tmp376, tmp377, tmp378, tmp379, tmp380, tmp381, tmp382, tmp383, tmp384, tmp385, tmp386, tmp387, tmp388, tmp389, tmp390, tmp391, tmp392, tmp393, tmp394, tmp395, tmp396, tmp397, tmp398, tmp399, tmp400, tmp401, tmp402, tmp403, tmp404, tmp405, tmp406, tmp407, tmp408, tmp409, tmp410, tmp411, tmp412, tmp413, tmp414, tmp415, tmp416, tmp417, tmp418, tmp419, tmp420, tmp421, tmp422, tmp423, tmp424, tmp425, tmp426, tmp427, tmp428, tmp429, tmp430, tmp431, tmp432, tmp433, tmp434, tmp435, tmp436, tmp437, tmp438, tmp439, tmp440, tmp441, tmp442, tmp443, tmp444, tmp445, tmp446, tmp447, tmp448;
      tmp3 = ">>> " + options.name;
      tmp4 = tmp3 + "Cont ";
      tmp5 = tmp4 + prec;
      tmp6 = tmp5 + " ";
      tmp7 = Tree.summary(acc);
      tmp8 = tmp6 + tmp7;
      tmp9 = tmp8 + " <<<";
      doTemp = Parser.tracer.print(tmp9, 152);
      tmp10 = TokenHelpers.preview(tokens);
      tmp11 = "check keyword " + tmp10;
      doTemp1 = Parser.tracer.print(tmp11, 154);
      if (tokens instanceof Stack.Cons.class) {
        param01 = tokens.head;
        param11 = tokens.tail;
        if (param01 instanceof Token.Identifier.class) {
          param03 = param01.name;
          param12 = param01.symbolic;
          name1 = param03;
          scrut7 = runtime.safeCall(Precedence.Keywords.all.get(name1));
          if (scrut7 instanceof Option.Some.class) {
            param04 = scrut7.value;
            keyword = param04;
            tmp12 = "found a keyword: " + name1;
            doTemp7 = Parser.tracer.print(tmp12, 156);
            scrut8 = runtime.safeCall(options.infixRule.keywordChoices.get(name1));
            if (scrut8 instanceof Option.Some.class) {
              param05 = scrut8.value;
              rule = param05;
              tmp13 = "keyword `" + name1;
              tmp14 = tmp13 + "` is found in infix rules";
              doTemp9 = Parser.tracer.print(tmp14, 158);
              scrut9 = keyword.leftPrecOrMin > prec;
              if (scrut9 === true) {
                scrut10 = rule.refChoice;
                if (scrut10 instanceof Option.Some.class) {
                  param06 = scrut10.value;
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
                    tmp15 = "try to parse kind \"" + kind1;
                    tmp16 = tmp15 + "\" at ";
                    tmp17 = TokenHelpers.preview(tokens);
                    tmp18 = tmp16 + tmp17;
                    doTemp10 = Parser.tracer.print(tmp18, 161);
                    outerPrec$_1 = Option.getOrElse(outerPrec1, Precedence.Keywords.maxOperatorPrec);
                    innerPrec$_ = Option.getOrElse(innerPrec1, keyword.rightPrecOrMin);
                    scrut11 = outerPrec$_1 > prec;
                    if (scrut11 === true) {
                      tmp19 = consume();
                      tmp20 = parseKind(kind1, keyword.rightPrecOrMin);
                      rhs2 = tmp20;
                      tmp21 = runtime.safeCall(process1(rhs2, runtime.Unit));
                      tmp22 = runtime.safeCall(tmp21(acc));
                      return exprCont(tmp22, prec, options)
                    } else {
                      tmp23 = "keyword `" + name1;
                      tmp24 = tmp23 + "` does not have infix rules";
                      doTemp8 = Parser.tracer.print(tmp24, 169);
                      name = param03;
                      if (param12 === true) {
                        scrut3 = runtime.safeCall(Precedence.Keywords.all.get(name));
                        if (scrut3 instanceof Option.None.class) {
                          scrut4 = options.allowOperators;
                          if (scrut4 === true) {
                            tmp25 = "found an operator \"" + name;
                            tmp26 = tmp25 + "\"";
                            doTemp5 = Parser.tracer.print(tmp26, 172);
                            scrut5 = Precedence.opPrec(name);
                            if (globalThis.Array.isArray(scrut5) && scrut5.length === 2) {
                              first01 = scrut5[0];
                              first11 = scrut5[1];
                              leftPrec = first01;
                              rightPrec = first11;
                              tmp27 = "leftPrec = " + leftPrec;
                              tmp28 = tmp27 + "; rightPrec = ";
                              tmp29 = tmp28 + rightPrec;
                              doTemp6 = Parser.tracer.print(tmp29, 174);
                              scrut6 = leftPrec > prec;
                              if (scrut6 === true) {
                                tmp30 = consume();
                                tmp31 = Tree.Ident(name, true);
                                op = tmp31;
                                tmp32 = expr(rightPrec, Parser.#termOptions);
                                rhs1 = tmp32;
                                tmp33 = Stack.Cons(rhs1, Stack.Nil);
                                tmp34 = Stack.Cons(acc, tmp33);
                                tmp35 = Tree.App(op, tmp34);
                                return exprCont(tmp35, prec, options)
                              } else {
                                return acc
                              }
                            } else {
                              doTemp2 = Parser.tracer.print("not a keyword", 183);
                              token1 = param01;
                              scrut = options.infixRule.refChoice;
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
                                  tmp36 = "found reference to " + kind;
                                  tmp37 = tmp36 + " with outerPrec = ";
                                  tmp38 = tmp37 + outerPrec;
                                  doTemp3 = Parser.tracer.print(tmp38, 186);
                                  outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                                  scrut1 = outerPrec$_ > prec;
                                  if (scrut1 === true) {
                                    tmp39 = Option.getOrElse(innerPrec, outerPrec$_);
                                    scrut2 = parseKind(kind, tmp39);
                                    if (scrut2 instanceof Tree.Empty.class) {
                                      tmp40 = Parser.tracer.print("nothing was parsed", 191);
                                      return acc
                                    } else if (scrut2 instanceof Tree.Error.class) {
                                      tmp41 = Parser.tracer.print("cannot parse more", 194);
                                      return acc
                                    } else {
                                      rhs = scrut2;
                                      tmp42 = Tree.summary(rhs);
                                      tmp43 = "parsed " + tmp42;
                                      tmp44 = Parser.tracer.print(tmp43, 197);
                                      tmp45 = runtime.safeCall(process(rhs, runtime.Unit));
                                      tmp46 = runtime.safeCall(tmp45(acc));
                                      return exprCont(tmp46, prec, options)
                                    }
                                  } else {
                                    tmp47 = "the outer precedence is less than " + prec;
                                    doTemp4 = Parser.tracer.print(tmp47, 199);
                                    return acc
                                  }
                                } else {
                                  throw new globalThis.Error("match error");
                                }
                              } else if (scrut instanceof Option.None.class) {
                                tmp48 = "cannot consume " + token1;
                                tmp49 = Parser.tracer.print(tmp48, 202);
                                return acc
                              } else {
                                throw new globalThis.Error("match error");
                              }
                            }
                          } else {
                            doTemp2 = Parser.tracer.print("not a keyword", 183);
                            token1 = param01;
                            scrut = options.infixRule.refChoice;
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
                                tmp50 = "found reference to " + kind;
                                tmp51 = tmp50 + " with outerPrec = ";
                                tmp52 = tmp51 + outerPrec;
                                doTemp3 = Parser.tracer.print(tmp52, 186);
                                outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                                scrut1 = outerPrec$_ > prec;
                                if (scrut1 === true) {
                                  tmp53 = Option.getOrElse(innerPrec, outerPrec$_);
                                  scrut2 = parseKind(kind, tmp53);
                                  if (scrut2 instanceof Tree.Empty.class) {
                                    tmp54 = Parser.tracer.print("nothing was parsed", 191);
                                    return acc
                                  } else if (scrut2 instanceof Tree.Error.class) {
                                    tmp55 = Parser.tracer.print("cannot parse more", 194);
                                    return acc
                                  } else {
                                    rhs = scrut2;
                                    tmp56 = Tree.summary(rhs);
                                    tmp57 = "parsed " + tmp56;
                                    tmp58 = Parser.tracer.print(tmp57, 197);
                                    tmp59 = runtime.safeCall(process(rhs, runtime.Unit));
                                    tmp60 = runtime.safeCall(tmp59(acc));
                                    return exprCont(tmp60, prec, options)
                                  }
                                } else {
                                  tmp61 = "the outer precedence is less than " + prec;
                                  doTemp4 = Parser.tracer.print(tmp61, 199);
                                  return acc
                                }
                              } else {
                                throw new globalThis.Error("match error");
                              }
                            } else if (scrut instanceof Option.None.class) {
                              tmp62 = "cannot consume " + token1;
                              tmp63 = Parser.tracer.print(tmp62, 202);
                              return acc
                            } else {
                              throw new globalThis.Error("match error");
                            }
                          }
                        } else {
                          doTemp2 = Parser.tracer.print("not a keyword", 183);
                          token1 = param01;
                          scrut = options.infixRule.refChoice;
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
                              tmp64 = "found reference to " + kind;
                              tmp65 = tmp64 + " with outerPrec = ";
                              tmp66 = tmp65 + outerPrec;
                              doTemp3 = Parser.tracer.print(tmp66, 186);
                              outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                              scrut1 = outerPrec$_ > prec;
                              if (scrut1 === true) {
                                tmp67 = Option.getOrElse(innerPrec, outerPrec$_);
                                scrut2 = parseKind(kind, tmp67);
                                if (scrut2 instanceof Tree.Empty.class) {
                                  tmp68 = Parser.tracer.print("nothing was parsed", 191);
                                  return acc
                                } else if (scrut2 instanceof Tree.Error.class) {
                                  tmp69 = Parser.tracer.print("cannot parse more", 194);
                                  return acc
                                } else {
                                  rhs = scrut2;
                                  tmp70 = Tree.summary(rhs);
                                  tmp71 = "parsed " + tmp70;
                                  tmp72 = Parser.tracer.print(tmp71, 197);
                                  tmp73 = runtime.safeCall(process(rhs, runtime.Unit));
                                  tmp74 = runtime.safeCall(tmp73(acc));
                                  return exprCont(tmp74, prec, options)
                                }
                              } else {
                                tmp75 = "the outer precedence is less than " + prec;
                                doTemp4 = Parser.tracer.print(tmp75, 199);
                                return acc
                              }
                            } else {
                              throw new globalThis.Error("match error");
                            }
                          } else if (scrut instanceof Option.None.class) {
                            tmp76 = "cannot consume " + token1;
                            tmp77 = Parser.tracer.print(tmp76, 202);
                            return acc
                          } else {
                            throw new globalThis.Error("match error");
                          }
                        }
                      } else {
                        doTemp2 = Parser.tracer.print("not a keyword", 183);
                        token1 = param01;
                        scrut = options.infixRule.refChoice;
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
                            tmp78 = "found reference to " + kind;
                            tmp79 = tmp78 + " with outerPrec = ";
                            tmp80 = tmp79 + outerPrec;
                            doTemp3 = Parser.tracer.print(tmp80, 186);
                            outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                            scrut1 = outerPrec$_ > prec;
                            if (scrut1 === true) {
                              tmp81 = Option.getOrElse(innerPrec, outerPrec$_);
                              scrut2 = parseKind(kind, tmp81);
                              if (scrut2 instanceof Tree.Empty.class) {
                                tmp82 = Parser.tracer.print("nothing was parsed", 191);
                                return acc
                              } else if (scrut2 instanceof Tree.Error.class) {
                                tmp83 = Parser.tracer.print("cannot parse more", 194);
                                return acc
                              } else {
                                rhs = scrut2;
                                tmp84 = Tree.summary(rhs);
                                tmp85 = "parsed " + tmp84;
                                tmp86 = Parser.tracer.print(tmp85, 197);
                                tmp87 = runtime.safeCall(process(rhs, runtime.Unit));
                                tmp88 = runtime.safeCall(tmp87(acc));
                                return exprCont(tmp88, prec, options)
                              }
                            } else {
                              tmp89 = "the outer precedence is less than " + prec;
                              doTemp4 = Parser.tracer.print(tmp89, 199);
                              return acc
                            }
                          } else {
                            throw new globalThis.Error("match error");
                          }
                        } else if (scrut instanceof Option.None.class) {
                          tmp90 = "cannot consume " + token1;
                          tmp91 = Parser.tracer.print(tmp90, 202);
                          return acc
                        } else {
                          throw new globalThis.Error("match error");
                        }
                      }
                    }
                  } else {
                    tmp92 = "keyword `" + name1;
                    tmp93 = tmp92 + "` does not have infix rules";
                    doTemp8 = Parser.tracer.print(tmp93, 169);
                    name = param03;
                    if (param12 === true) {
                      scrut3 = runtime.safeCall(Precedence.Keywords.all.get(name));
                      if (scrut3 instanceof Option.None.class) {
                        scrut4 = options.allowOperators;
                        if (scrut4 === true) {
                          tmp94 = "found an operator \"" + name;
                          tmp95 = tmp94 + "\"";
                          doTemp5 = Parser.tracer.print(tmp95, 172);
                          scrut5 = Precedence.opPrec(name);
                          if (globalThis.Array.isArray(scrut5) && scrut5.length === 2) {
                            first01 = scrut5[0];
                            first11 = scrut5[1];
                            leftPrec = first01;
                            rightPrec = first11;
                            tmp96 = "leftPrec = " + leftPrec;
                            tmp97 = tmp96 + "; rightPrec = ";
                            tmp98 = tmp97 + rightPrec;
                            doTemp6 = Parser.tracer.print(tmp98, 174);
                            scrut6 = leftPrec > prec;
                            if (scrut6 === true) {
                              tmp99 = consume();
                              tmp100 = Tree.Ident(name, true);
                              op = tmp100;
                              tmp101 = expr(rightPrec, Parser.#termOptions);
                              rhs1 = tmp101;
                              tmp102 = Stack.Cons(rhs1, Stack.Nil);
                              tmp103 = Stack.Cons(acc, tmp102);
                              tmp104 = Tree.App(op, tmp103);
                              return exprCont(tmp104, prec, options)
                            } else {
                              return acc
                            }
                          } else {
                            doTemp2 = Parser.tracer.print("not a keyword", 183);
                            token1 = param01;
                            scrut = options.infixRule.refChoice;
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
                                tmp105 = "found reference to " + kind;
                                tmp106 = tmp105 + " with outerPrec = ";
                                tmp107 = tmp106 + outerPrec;
                                doTemp3 = Parser.tracer.print(tmp107, 186);
                                outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                                scrut1 = outerPrec$_ > prec;
                                if (scrut1 === true) {
                                  tmp108 = Option.getOrElse(innerPrec, outerPrec$_);
                                  scrut2 = parseKind(kind, tmp108);
                                  if (scrut2 instanceof Tree.Empty.class) {
                                    tmp109 = Parser.tracer.print("nothing was parsed", 191);
                                    return acc
                                  } else if (scrut2 instanceof Tree.Error.class) {
                                    tmp110 = Parser.tracer.print("cannot parse more", 194);
                                    return acc
                                  } else {
                                    rhs = scrut2;
                                    tmp111 = Tree.summary(rhs);
                                    tmp112 = "parsed " + tmp111;
                                    tmp113 = Parser.tracer.print(tmp112, 197);
                                    tmp114 = runtime.safeCall(process(rhs, runtime.Unit));
                                    tmp115 = runtime.safeCall(tmp114(acc));
                                    return exprCont(tmp115, prec, options)
                                  }
                                } else {
                                  tmp116 = "the outer precedence is less than " + prec;
                                  doTemp4 = Parser.tracer.print(tmp116, 199);
                                  return acc
                                }
                              } else {
                                throw new globalThis.Error("match error");
                              }
                            } else if (scrut instanceof Option.None.class) {
                              tmp117 = "cannot consume " + token1;
                              tmp118 = Parser.tracer.print(tmp117, 202);
                              return acc
                            } else {
                              throw new globalThis.Error("match error");
                            }
                          }
                        } else {
                          doTemp2 = Parser.tracer.print("not a keyword", 183);
                          token1 = param01;
                          scrut = options.infixRule.refChoice;
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
                              tmp119 = "found reference to " + kind;
                              tmp120 = tmp119 + " with outerPrec = ";
                              tmp121 = tmp120 + outerPrec;
                              doTemp3 = Parser.tracer.print(tmp121, 186);
                              outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                              scrut1 = outerPrec$_ > prec;
                              if (scrut1 === true) {
                                tmp122 = Option.getOrElse(innerPrec, outerPrec$_);
                                scrut2 = parseKind(kind, tmp122);
                                if (scrut2 instanceof Tree.Empty.class) {
                                  tmp123 = Parser.tracer.print("nothing was parsed", 191);
                                  return acc
                                } else if (scrut2 instanceof Tree.Error.class) {
                                  tmp124 = Parser.tracer.print("cannot parse more", 194);
                                  return acc
                                } else {
                                  rhs = scrut2;
                                  tmp125 = Tree.summary(rhs);
                                  tmp126 = "parsed " + tmp125;
                                  tmp127 = Parser.tracer.print(tmp126, 197);
                                  tmp128 = runtime.safeCall(process(rhs, runtime.Unit));
                                  tmp129 = runtime.safeCall(tmp128(acc));
                                  return exprCont(tmp129, prec, options)
                                }
                              } else {
                                tmp130 = "the outer precedence is less than " + prec;
                                doTemp4 = Parser.tracer.print(tmp130, 199);
                                return acc
                              }
                            } else {
                              throw new globalThis.Error("match error");
                            }
                          } else if (scrut instanceof Option.None.class) {
                            tmp131 = "cannot consume " + token1;
                            tmp132 = Parser.tracer.print(tmp131, 202);
                            return acc
                          } else {
                            throw new globalThis.Error("match error");
                          }
                        }
                      } else {
                        doTemp2 = Parser.tracer.print("not a keyword", 183);
                        token1 = param01;
                        scrut = options.infixRule.refChoice;
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
                            tmp133 = "found reference to " + kind;
                            tmp134 = tmp133 + " with outerPrec = ";
                            tmp135 = tmp134 + outerPrec;
                            doTemp3 = Parser.tracer.print(tmp135, 186);
                            outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                            scrut1 = outerPrec$_ > prec;
                            if (scrut1 === true) {
                              tmp136 = Option.getOrElse(innerPrec, outerPrec$_);
                              scrut2 = parseKind(kind, tmp136);
                              if (scrut2 instanceof Tree.Empty.class) {
                                tmp137 = Parser.tracer.print("nothing was parsed", 191);
                                return acc
                              } else if (scrut2 instanceof Tree.Error.class) {
                                tmp138 = Parser.tracer.print("cannot parse more", 194);
                                return acc
                              } else {
                                rhs = scrut2;
                                tmp139 = Tree.summary(rhs);
                                tmp140 = "parsed " + tmp139;
                                tmp141 = Parser.tracer.print(tmp140, 197);
                                tmp142 = runtime.safeCall(process(rhs, runtime.Unit));
                                tmp143 = runtime.safeCall(tmp142(acc));
                                return exprCont(tmp143, prec, options)
                              }
                            } else {
                              tmp144 = "the outer precedence is less than " + prec;
                              doTemp4 = Parser.tracer.print(tmp144, 199);
                              return acc
                            }
                          } else {
                            throw new globalThis.Error("match error");
                          }
                        } else if (scrut instanceof Option.None.class) {
                          tmp145 = "cannot consume " + token1;
                          tmp146 = Parser.tracer.print(tmp145, 202);
                          return acc
                        } else {
                          throw new globalThis.Error("match error");
                        }
                      }
                    } else {
                      doTemp2 = Parser.tracer.print("not a keyword", 183);
                      token1 = param01;
                      scrut = options.infixRule.refChoice;
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
                          tmp147 = "found reference to " + kind;
                          tmp148 = tmp147 + " with outerPrec = ";
                          tmp149 = tmp148 + outerPrec;
                          doTemp3 = Parser.tracer.print(tmp149, 186);
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
                              return exprCont(tmp157, prec, options)
                            }
                          } else {
                            tmp158 = "the outer precedence is less than " + prec;
                            doTemp4 = Parser.tracer.print(tmp158, 199);
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
                } else if (scrut10 instanceof Option.None.class) {
                  return acc
                } else {
                  tmp161 = "keyword `" + name1;
                  tmp162 = tmp161 + "` does not have infix rules";
                  doTemp8 = Parser.tracer.print(tmp162, 169);
                  name = param03;
                  if (param12 === true) {
                    scrut3 = runtime.safeCall(Precedence.Keywords.all.get(name));
                    if (scrut3 instanceof Option.None.class) {
                      scrut4 = options.allowOperators;
                      if (scrut4 === true) {
                        tmp163 = "found an operator \"" + name;
                        tmp164 = tmp163 + "\"";
                        doTemp5 = Parser.tracer.print(tmp164, 172);
                        scrut5 = Precedence.opPrec(name);
                        if (globalThis.Array.isArray(scrut5) && scrut5.length === 2) {
                          first01 = scrut5[0];
                          first11 = scrut5[1];
                          leftPrec = first01;
                          rightPrec = first11;
                          tmp165 = "leftPrec = " + leftPrec;
                          tmp166 = tmp165 + "; rightPrec = ";
                          tmp167 = tmp166 + rightPrec;
                          doTemp6 = Parser.tracer.print(tmp167, 174);
                          scrut6 = leftPrec > prec;
                          if (scrut6 === true) {
                            tmp168 = consume();
                            tmp169 = Tree.Ident(name, true);
                            op = tmp169;
                            tmp170 = expr(rightPrec, Parser.#termOptions);
                            rhs1 = tmp170;
                            tmp171 = Stack.Cons(rhs1, Stack.Nil);
                            tmp172 = Stack.Cons(acc, tmp171);
                            tmp173 = Tree.App(op, tmp172);
                            return exprCont(tmp173, prec, options)
                          } else {
                            return acc
                          }
                        } else {
                          doTemp2 = Parser.tracer.print("not a keyword", 183);
                          token1 = param01;
                          scrut = options.infixRule.refChoice;
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
                              tmp174 = "found reference to " + kind;
                              tmp175 = tmp174 + " with outerPrec = ";
                              tmp176 = tmp175 + outerPrec;
                              doTemp3 = Parser.tracer.print(tmp176, 186);
                              outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                              scrut1 = outerPrec$_ > prec;
                              if (scrut1 === true) {
                                tmp177 = Option.getOrElse(innerPrec, outerPrec$_);
                                scrut2 = parseKind(kind, tmp177);
                                if (scrut2 instanceof Tree.Empty.class) {
                                  tmp178 = Parser.tracer.print("nothing was parsed", 191);
                                  return acc
                                } else if (scrut2 instanceof Tree.Error.class) {
                                  tmp179 = Parser.tracer.print("cannot parse more", 194);
                                  return acc
                                } else {
                                  rhs = scrut2;
                                  tmp180 = Tree.summary(rhs);
                                  tmp181 = "parsed " + tmp180;
                                  tmp182 = Parser.tracer.print(tmp181, 197);
                                  tmp183 = runtime.safeCall(process(rhs, runtime.Unit));
                                  tmp184 = runtime.safeCall(tmp183(acc));
                                  return exprCont(tmp184, prec, options)
                                }
                              } else {
                                tmp185 = "the outer precedence is less than " + prec;
                                doTemp4 = Parser.tracer.print(tmp185, 199);
                                return acc
                              }
                            } else {
                              throw new globalThis.Error("match error");
                            }
                          } else if (scrut instanceof Option.None.class) {
                            tmp186 = "cannot consume " + token1;
                            tmp187 = Parser.tracer.print(tmp186, 202);
                            return acc
                          } else {
                            throw new globalThis.Error("match error");
                          }
                        }
                      } else {
                        doTemp2 = Parser.tracer.print("not a keyword", 183);
                        token1 = param01;
                        scrut = options.infixRule.refChoice;
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
                            tmp188 = "found reference to " + kind;
                            tmp189 = tmp188 + " with outerPrec = ";
                            tmp190 = tmp189 + outerPrec;
                            doTemp3 = Parser.tracer.print(tmp190, 186);
                            outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                            scrut1 = outerPrec$_ > prec;
                            if (scrut1 === true) {
                              tmp191 = Option.getOrElse(innerPrec, outerPrec$_);
                              scrut2 = parseKind(kind, tmp191);
                              if (scrut2 instanceof Tree.Empty.class) {
                                tmp192 = Parser.tracer.print("nothing was parsed", 191);
                                return acc
                              } else if (scrut2 instanceof Tree.Error.class) {
                                tmp193 = Parser.tracer.print("cannot parse more", 194);
                                return acc
                              } else {
                                rhs = scrut2;
                                tmp194 = Tree.summary(rhs);
                                tmp195 = "parsed " + tmp194;
                                tmp196 = Parser.tracer.print(tmp195, 197);
                                tmp197 = runtime.safeCall(process(rhs, runtime.Unit));
                                tmp198 = runtime.safeCall(tmp197(acc));
                                return exprCont(tmp198, prec, options)
                              }
                            } else {
                              tmp199 = "the outer precedence is less than " + prec;
                              doTemp4 = Parser.tracer.print(tmp199, 199);
                              return acc
                            }
                          } else {
                            throw new globalThis.Error("match error");
                          }
                        } else if (scrut instanceof Option.None.class) {
                          tmp200 = "cannot consume " + token1;
                          tmp201 = Parser.tracer.print(tmp200, 202);
                          return acc
                        } else {
                          throw new globalThis.Error("match error");
                        }
                      }
                    } else {
                      doTemp2 = Parser.tracer.print("not a keyword", 183);
                      token1 = param01;
                      scrut = options.infixRule.refChoice;
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
                          tmp202 = "found reference to " + kind;
                          tmp203 = tmp202 + " with outerPrec = ";
                          tmp204 = tmp203 + outerPrec;
                          doTemp3 = Parser.tracer.print(tmp204, 186);
                          outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                          scrut1 = outerPrec$_ > prec;
                          if (scrut1 === true) {
                            tmp205 = Option.getOrElse(innerPrec, outerPrec$_);
                            scrut2 = parseKind(kind, tmp205);
                            if (scrut2 instanceof Tree.Empty.class) {
                              tmp206 = Parser.tracer.print("nothing was parsed", 191);
                              return acc
                            } else if (scrut2 instanceof Tree.Error.class) {
                              tmp207 = Parser.tracer.print("cannot parse more", 194);
                              return acc
                            } else {
                              rhs = scrut2;
                              tmp208 = Tree.summary(rhs);
                              tmp209 = "parsed " + tmp208;
                              tmp210 = Parser.tracer.print(tmp209, 197);
                              tmp211 = runtime.safeCall(process(rhs, runtime.Unit));
                              tmp212 = runtime.safeCall(tmp211(acc));
                              return exprCont(tmp212, prec, options)
                            }
                          } else {
                            tmp213 = "the outer precedence is less than " + prec;
                            doTemp4 = Parser.tracer.print(tmp213, 199);
                            return acc
                          }
                        } else {
                          throw new globalThis.Error("match error");
                        }
                      } else if (scrut instanceof Option.None.class) {
                        tmp214 = "cannot consume " + token1;
                        tmp215 = Parser.tracer.print(tmp214, 202);
                        return acc
                      } else {
                        throw new globalThis.Error("match error");
                      }
                    }
                  } else {
                    doTemp2 = Parser.tracer.print("not a keyword", 183);
                    token1 = param01;
                    scrut = options.infixRule.refChoice;
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
                        tmp216 = "found reference to " + kind;
                        tmp217 = tmp216 + " with outerPrec = ";
                        tmp218 = tmp217 + outerPrec;
                        doTemp3 = Parser.tracer.print(tmp218, 186);
                        outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                        scrut1 = outerPrec$_ > prec;
                        if (scrut1 === true) {
                          tmp219 = Option.getOrElse(innerPrec, outerPrec$_);
                          scrut2 = parseKind(kind, tmp219);
                          if (scrut2 instanceof Tree.Empty.class) {
                            tmp220 = Parser.tracer.print("nothing was parsed", 191);
                            return acc
                          } else if (scrut2 instanceof Tree.Error.class) {
                            tmp221 = Parser.tracer.print("cannot parse more", 194);
                            return acc
                          } else {
                            rhs = scrut2;
                            tmp222 = Tree.summary(rhs);
                            tmp223 = "parsed " + tmp222;
                            tmp224 = Parser.tracer.print(tmp223, 197);
                            tmp225 = runtime.safeCall(process(rhs, runtime.Unit));
                            tmp226 = runtime.safeCall(tmp225(acc));
                            return exprCont(tmp226, prec, options)
                          }
                        } else {
                          tmp227 = "the outer precedence is less than " + prec;
                          doTemp4 = Parser.tracer.print(tmp227, 199);
                          return acc
                        }
                      } else {
                        throw new globalThis.Error("match error");
                      }
                    } else if (scrut instanceof Option.None.class) {
                      tmp228 = "cannot consume " + token1;
                      tmp229 = Parser.tracer.print(tmp228, 202);
                      return acc
                    } else {
                      throw new globalThis.Error("match error");
                    }
                  }
                }
              } else {
                tmp230 = "keyword `" + name1;
                tmp231 = tmp230 + "` does not have infix rules";
                doTemp8 = Parser.tracer.print(tmp231, 169);
                name = param03;
                if (param12 === true) {
                  scrut3 = runtime.safeCall(Precedence.Keywords.all.get(name));
                  if (scrut3 instanceof Option.None.class) {
                    scrut4 = options.allowOperators;
                    if (scrut4 === true) {
                      tmp232 = "found an operator \"" + name;
                      tmp233 = tmp232 + "\"";
                      doTemp5 = Parser.tracer.print(tmp233, 172);
                      scrut5 = Precedence.opPrec(name);
                      if (globalThis.Array.isArray(scrut5) && scrut5.length === 2) {
                        first01 = scrut5[0];
                        first11 = scrut5[1];
                        leftPrec = first01;
                        rightPrec = first11;
                        tmp234 = "leftPrec = " + leftPrec;
                        tmp235 = tmp234 + "; rightPrec = ";
                        tmp236 = tmp235 + rightPrec;
                        doTemp6 = Parser.tracer.print(tmp236, 174);
                        scrut6 = leftPrec > prec;
                        if (scrut6 === true) {
                          tmp237 = consume();
                          tmp238 = Tree.Ident(name, true);
                          op = tmp238;
                          tmp239 = expr(rightPrec, Parser.#termOptions);
                          rhs1 = tmp239;
                          tmp240 = Stack.Cons(rhs1, Stack.Nil);
                          tmp241 = Stack.Cons(acc, tmp240);
                          tmp242 = Tree.App(op, tmp241);
                          return exprCont(tmp242, prec, options)
                        } else {
                          return acc
                        }
                      } else {
                        doTemp2 = Parser.tracer.print("not a keyword", 183);
                        token1 = param01;
                        scrut = options.infixRule.refChoice;
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
                            tmp243 = "found reference to " + kind;
                            tmp244 = tmp243 + " with outerPrec = ";
                            tmp245 = tmp244 + outerPrec;
                            doTemp3 = Parser.tracer.print(tmp245, 186);
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
                                return exprCont(tmp253, prec, options)
                              }
                            } else {
                              tmp254 = "the outer precedence is less than " + prec;
                              doTemp4 = Parser.tracer.print(tmp254, 199);
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
                    } else {
                      doTemp2 = Parser.tracer.print("not a keyword", 183);
                      token1 = param01;
                      scrut = options.infixRule.refChoice;
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
                          tmp257 = "found reference to " + kind;
                          tmp258 = tmp257 + " with outerPrec = ";
                          tmp259 = tmp258 + outerPrec;
                          doTemp3 = Parser.tracer.print(tmp259, 186);
                          outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                          scrut1 = outerPrec$_ > prec;
                          if (scrut1 === true) {
                            tmp260 = Option.getOrElse(innerPrec, outerPrec$_);
                            scrut2 = parseKind(kind, tmp260);
                            if (scrut2 instanceof Tree.Empty.class) {
                              tmp261 = Parser.tracer.print("nothing was parsed", 191);
                              return acc
                            } else if (scrut2 instanceof Tree.Error.class) {
                              tmp262 = Parser.tracer.print("cannot parse more", 194);
                              return acc
                            } else {
                              rhs = scrut2;
                              tmp263 = Tree.summary(rhs);
                              tmp264 = "parsed " + tmp263;
                              tmp265 = Parser.tracer.print(tmp264, 197);
                              tmp266 = runtime.safeCall(process(rhs, runtime.Unit));
                              tmp267 = runtime.safeCall(tmp266(acc));
                              return exprCont(tmp267, prec, options)
                            }
                          } else {
                            tmp268 = "the outer precedence is less than " + prec;
                            doTemp4 = Parser.tracer.print(tmp268, 199);
                            return acc
                          }
                        } else {
                          throw new globalThis.Error("match error");
                        }
                      } else if (scrut instanceof Option.None.class) {
                        tmp269 = "cannot consume " + token1;
                        tmp270 = Parser.tracer.print(tmp269, 202);
                        return acc
                      } else {
                        throw new globalThis.Error("match error");
                      }
                    }
                  } else {
                    doTemp2 = Parser.tracer.print("not a keyword", 183);
                    token1 = param01;
                    scrut = options.infixRule.refChoice;
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
                        tmp271 = "found reference to " + kind;
                        tmp272 = tmp271 + " with outerPrec = ";
                        tmp273 = tmp272 + outerPrec;
                        doTemp3 = Parser.tracer.print(tmp273, 186);
                        outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                        scrut1 = outerPrec$_ > prec;
                        if (scrut1 === true) {
                          tmp274 = Option.getOrElse(innerPrec, outerPrec$_);
                          scrut2 = parseKind(kind, tmp274);
                          if (scrut2 instanceof Tree.Empty.class) {
                            tmp275 = Parser.tracer.print("nothing was parsed", 191);
                            return acc
                          } else if (scrut2 instanceof Tree.Error.class) {
                            tmp276 = Parser.tracer.print("cannot parse more", 194);
                            return acc
                          } else {
                            rhs = scrut2;
                            tmp277 = Tree.summary(rhs);
                            tmp278 = "parsed " + tmp277;
                            tmp279 = Parser.tracer.print(tmp278, 197);
                            tmp280 = runtime.safeCall(process(rhs, runtime.Unit));
                            tmp281 = runtime.safeCall(tmp280(acc));
                            return exprCont(tmp281, prec, options)
                          }
                        } else {
                          tmp282 = "the outer precedence is less than " + prec;
                          doTemp4 = Parser.tracer.print(tmp282, 199);
                          return acc
                        }
                      } else {
                        throw new globalThis.Error("match error");
                      }
                    } else if (scrut instanceof Option.None.class) {
                      tmp283 = "cannot consume " + token1;
                      tmp284 = Parser.tracer.print(tmp283, 202);
                      return acc
                    } else {
                      throw new globalThis.Error("match error");
                    }
                  }
                } else {
                  doTemp2 = Parser.tracer.print("not a keyword", 183);
                  token1 = param01;
                  scrut = options.infixRule.refChoice;
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
                      tmp285 = "found reference to " + kind;
                      tmp286 = tmp285 + " with outerPrec = ";
                      tmp287 = tmp286 + outerPrec;
                      doTemp3 = Parser.tracer.print(tmp287, 186);
                      outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                      scrut1 = outerPrec$_ > prec;
                      if (scrut1 === true) {
                        tmp288 = Option.getOrElse(innerPrec, outerPrec$_);
                        scrut2 = parseKind(kind, tmp288);
                        if (scrut2 instanceof Tree.Empty.class) {
                          tmp289 = Parser.tracer.print("nothing was parsed", 191);
                          return acc
                        } else if (scrut2 instanceof Tree.Error.class) {
                          tmp290 = Parser.tracer.print("cannot parse more", 194);
                          return acc
                        } else {
                          rhs = scrut2;
                          tmp291 = Tree.summary(rhs);
                          tmp292 = "parsed " + tmp291;
                          tmp293 = Parser.tracer.print(tmp292, 197);
                          tmp294 = runtime.safeCall(process(rhs, runtime.Unit));
                          tmp295 = runtime.safeCall(tmp294(acc));
                          return exprCont(tmp295, prec, options)
                        }
                      } else {
                        tmp296 = "the outer precedence is less than " + prec;
                        doTemp4 = Parser.tracer.print(tmp296, 199);
                        return acc
                      }
                    } else {
                      throw new globalThis.Error("match error");
                    }
                  } else if (scrut instanceof Option.None.class) {
                    tmp297 = "cannot consume " + token1;
                    tmp298 = Parser.tracer.print(tmp297, 202);
                    return acc
                  } else {
                    throw new globalThis.Error("match error");
                  }
                }
              }
            } else {
              tmp299 = "keyword `" + name1;
              tmp300 = tmp299 + "` does not have infix rules";
              doTemp8 = Parser.tracer.print(tmp300, 169);
              name = param03;
              if (param12 === true) {
                scrut3 = runtime.safeCall(Precedence.Keywords.all.get(name));
                if (scrut3 instanceof Option.None.class) {
                  scrut4 = options.allowOperators;
                  if (scrut4 === true) {
                    tmp301 = "found an operator \"" + name;
                    tmp302 = tmp301 + "\"";
                    doTemp5 = Parser.tracer.print(tmp302, 172);
                    scrut5 = Precedence.opPrec(name);
                    if (globalThis.Array.isArray(scrut5) && scrut5.length === 2) {
                      first01 = scrut5[0];
                      first11 = scrut5[1];
                      leftPrec = first01;
                      rightPrec = first11;
                      tmp303 = "leftPrec = " + leftPrec;
                      tmp304 = tmp303 + "; rightPrec = ";
                      tmp305 = tmp304 + rightPrec;
                      doTemp6 = Parser.tracer.print(tmp305, 174);
                      scrut6 = leftPrec > prec;
                      if (scrut6 === true) {
                        tmp306 = consume();
                        tmp307 = Tree.Ident(name, true);
                        op = tmp307;
                        tmp308 = expr(rightPrec, Parser.#termOptions);
                        rhs1 = tmp308;
                        tmp309 = Stack.Cons(rhs1, Stack.Nil);
                        tmp310 = Stack.Cons(acc, tmp309);
                        tmp311 = Tree.App(op, tmp310);
                        return exprCont(tmp311, prec, options)
                      } else {
                        return acc
                      }
                    } else {
                      doTemp2 = Parser.tracer.print("not a keyword", 183);
                      token1 = param01;
                      scrut = options.infixRule.refChoice;
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
                          tmp312 = "found reference to " + kind;
                          tmp313 = tmp312 + " with outerPrec = ";
                          tmp314 = tmp313 + outerPrec;
                          doTemp3 = Parser.tracer.print(tmp314, 186);
                          outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                          scrut1 = outerPrec$_ > prec;
                          if (scrut1 === true) {
                            tmp315 = Option.getOrElse(innerPrec, outerPrec$_);
                            scrut2 = parseKind(kind, tmp315);
                            if (scrut2 instanceof Tree.Empty.class) {
                              tmp316 = Parser.tracer.print("nothing was parsed", 191);
                              return acc
                            } else if (scrut2 instanceof Tree.Error.class) {
                              tmp317 = Parser.tracer.print("cannot parse more", 194);
                              return acc
                            } else {
                              rhs = scrut2;
                              tmp318 = Tree.summary(rhs);
                              tmp319 = "parsed " + tmp318;
                              tmp320 = Parser.tracer.print(tmp319, 197);
                              tmp321 = runtime.safeCall(process(rhs, runtime.Unit));
                              tmp322 = runtime.safeCall(tmp321(acc));
                              return exprCont(tmp322, prec, options)
                            }
                          } else {
                            tmp323 = "the outer precedence is less than " + prec;
                            doTemp4 = Parser.tracer.print(tmp323, 199);
                            return acc
                          }
                        } else {
                          throw new globalThis.Error("match error");
                        }
                      } else if (scrut instanceof Option.None.class) {
                        tmp324 = "cannot consume " + token1;
                        tmp325 = Parser.tracer.print(tmp324, 202);
                        return acc
                      } else {
                        throw new globalThis.Error("match error");
                      }
                    }
                  } else {
                    doTemp2 = Parser.tracer.print("not a keyword", 183);
                    token1 = param01;
                    scrut = options.infixRule.refChoice;
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
                        tmp326 = "found reference to " + kind;
                        tmp327 = tmp326 + " with outerPrec = ";
                        tmp328 = tmp327 + outerPrec;
                        doTemp3 = Parser.tracer.print(tmp328, 186);
                        outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                        scrut1 = outerPrec$_ > prec;
                        if (scrut1 === true) {
                          tmp329 = Option.getOrElse(innerPrec, outerPrec$_);
                          scrut2 = parseKind(kind, tmp329);
                          if (scrut2 instanceof Tree.Empty.class) {
                            tmp330 = Parser.tracer.print("nothing was parsed", 191);
                            return acc
                          } else if (scrut2 instanceof Tree.Error.class) {
                            tmp331 = Parser.tracer.print("cannot parse more", 194);
                            return acc
                          } else {
                            rhs = scrut2;
                            tmp332 = Tree.summary(rhs);
                            tmp333 = "parsed " + tmp332;
                            tmp334 = Parser.tracer.print(tmp333, 197);
                            tmp335 = runtime.safeCall(process(rhs, runtime.Unit));
                            tmp336 = runtime.safeCall(tmp335(acc));
                            return exprCont(tmp336, prec, options)
                          }
                        } else {
                          tmp337 = "the outer precedence is less than " + prec;
                          doTemp4 = Parser.tracer.print(tmp337, 199);
                          return acc
                        }
                      } else {
                        throw new globalThis.Error("match error");
                      }
                    } else if (scrut instanceof Option.None.class) {
                      tmp338 = "cannot consume " + token1;
                      tmp339 = Parser.tracer.print(tmp338, 202);
                      return acc
                    } else {
                      throw new globalThis.Error("match error");
                    }
                  }
                } else {
                  doTemp2 = Parser.tracer.print("not a keyword", 183);
                  token1 = param01;
                  scrut = options.infixRule.refChoice;
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
                      tmp340 = "found reference to " + kind;
                      tmp341 = tmp340 + " with outerPrec = ";
                      tmp342 = tmp341 + outerPrec;
                      doTemp3 = Parser.tracer.print(tmp342, 186);
                      outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                      scrut1 = outerPrec$_ > prec;
                      if (scrut1 === true) {
                        tmp343 = Option.getOrElse(innerPrec, outerPrec$_);
                        scrut2 = parseKind(kind, tmp343);
                        if (scrut2 instanceof Tree.Empty.class) {
                          tmp344 = Parser.tracer.print("nothing was parsed", 191);
                          return acc
                        } else if (scrut2 instanceof Tree.Error.class) {
                          tmp345 = Parser.tracer.print("cannot parse more", 194);
                          return acc
                        } else {
                          rhs = scrut2;
                          tmp346 = Tree.summary(rhs);
                          tmp347 = "parsed " + tmp346;
                          tmp348 = Parser.tracer.print(tmp347, 197);
                          tmp349 = runtime.safeCall(process(rhs, runtime.Unit));
                          tmp350 = runtime.safeCall(tmp349(acc));
                          return exprCont(tmp350, prec, options)
                        }
                      } else {
                        tmp351 = "the outer precedence is less than " + prec;
                        doTemp4 = Parser.tracer.print(tmp351, 199);
                        return acc
                      }
                    } else {
                      throw new globalThis.Error("match error");
                    }
                  } else if (scrut instanceof Option.None.class) {
                    tmp352 = "cannot consume " + token1;
                    tmp353 = Parser.tracer.print(tmp352, 202);
                    return acc
                  } else {
                    throw new globalThis.Error("match error");
                  }
                }
              } else {
                doTemp2 = Parser.tracer.print("not a keyword", 183);
                token1 = param01;
                scrut = options.infixRule.refChoice;
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
                    tmp354 = "found reference to " + kind;
                    tmp355 = tmp354 + " with outerPrec = ";
                    tmp356 = tmp355 + outerPrec;
                    doTemp3 = Parser.tracer.print(tmp356, 186);
                    outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                    scrut1 = outerPrec$_ > prec;
                    if (scrut1 === true) {
                      tmp357 = Option.getOrElse(innerPrec, outerPrec$_);
                      scrut2 = parseKind(kind, tmp357);
                      if (scrut2 instanceof Tree.Empty.class) {
                        tmp358 = Parser.tracer.print("nothing was parsed", 191);
                        return acc
                      } else if (scrut2 instanceof Tree.Error.class) {
                        tmp359 = Parser.tracer.print("cannot parse more", 194);
                        return acc
                      } else {
                        rhs = scrut2;
                        tmp360 = Tree.summary(rhs);
                        tmp361 = "parsed " + tmp360;
                        tmp362 = Parser.tracer.print(tmp361, 197);
                        tmp363 = runtime.safeCall(process(rhs, runtime.Unit));
                        tmp364 = runtime.safeCall(tmp363(acc));
                        return exprCont(tmp364, prec, options)
                      }
                    } else {
                      tmp365 = "the outer precedence is less than " + prec;
                      doTemp4 = Parser.tracer.print(tmp365, 199);
                      return acc
                    }
                  } else {
                    throw new globalThis.Error("match error");
                  }
                } else if (scrut instanceof Option.None.class) {
                  tmp366 = "cannot consume " + token1;
                  tmp367 = Parser.tracer.print(tmp366, 202);
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
                scrut4 = options.allowOperators;
                if (scrut4 === true) {
                  tmp368 = "found an operator \"" + name;
                  tmp369 = tmp368 + "\"";
                  doTemp5 = Parser.tracer.print(tmp369, 172);
                  scrut5 = Precedence.opPrec(name);
                  if (globalThis.Array.isArray(scrut5) && scrut5.length === 2) {
                    first01 = scrut5[0];
                    first11 = scrut5[1];
                    leftPrec = first01;
                    rightPrec = first11;
                    tmp370 = "leftPrec = " + leftPrec;
                    tmp371 = tmp370 + "; rightPrec = ";
                    tmp372 = tmp371 + rightPrec;
                    doTemp6 = Parser.tracer.print(tmp372, 174);
                    scrut6 = leftPrec > prec;
                    if (scrut6 === true) {
                      tmp373 = consume();
                      tmp374 = Tree.Ident(name, true);
                      op = tmp374;
                      tmp375 = expr(rightPrec, Parser.#termOptions);
                      rhs1 = tmp375;
                      tmp376 = Stack.Cons(rhs1, Stack.Nil);
                      tmp377 = Stack.Cons(acc, tmp376);
                      tmp378 = Tree.App(op, tmp377);
                      return exprCont(tmp378, prec, options)
                    } else {
                      return acc
                    }
                  } else {
                    doTemp2 = Parser.tracer.print("not a keyword", 183);
                    token1 = param01;
                    scrut = options.infixRule.refChoice;
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
                        tmp379 = "found reference to " + kind;
                        tmp380 = tmp379 + " with outerPrec = ";
                        tmp381 = tmp380 + outerPrec;
                        doTemp3 = Parser.tracer.print(tmp381, 186);
                        outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                        scrut1 = outerPrec$_ > prec;
                        if (scrut1 === true) {
                          tmp382 = Option.getOrElse(innerPrec, outerPrec$_);
                          scrut2 = parseKind(kind, tmp382);
                          if (scrut2 instanceof Tree.Empty.class) {
                            tmp383 = Parser.tracer.print("nothing was parsed", 191);
                            return acc
                          } else if (scrut2 instanceof Tree.Error.class) {
                            tmp384 = Parser.tracer.print("cannot parse more", 194);
                            return acc
                          } else {
                            rhs = scrut2;
                            tmp385 = Tree.summary(rhs);
                            tmp386 = "parsed " + tmp385;
                            tmp387 = Parser.tracer.print(tmp386, 197);
                            tmp388 = runtime.safeCall(process(rhs, runtime.Unit));
                            tmp389 = runtime.safeCall(tmp388(acc));
                            return exprCont(tmp389, prec, options)
                          }
                        } else {
                          tmp390 = "the outer precedence is less than " + prec;
                          doTemp4 = Parser.tracer.print(tmp390, 199);
                          return acc
                        }
                      } else {
                        throw new globalThis.Error("match error");
                      }
                    } else if (scrut instanceof Option.None.class) {
                      tmp391 = "cannot consume " + token1;
                      tmp392 = Parser.tracer.print(tmp391, 202);
                      return acc
                    } else {
                      throw new globalThis.Error("match error");
                    }
                  }
                } else {
                  doTemp2 = Parser.tracer.print("not a keyword", 183);
                  token1 = param01;
                  scrut = options.infixRule.refChoice;
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
                      tmp393 = "found reference to " + kind;
                      tmp394 = tmp393 + " with outerPrec = ";
                      tmp395 = tmp394 + outerPrec;
                      doTemp3 = Parser.tracer.print(tmp395, 186);
                      outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                      scrut1 = outerPrec$_ > prec;
                      if (scrut1 === true) {
                        tmp396 = Option.getOrElse(innerPrec, outerPrec$_);
                        scrut2 = parseKind(kind, tmp396);
                        if (scrut2 instanceof Tree.Empty.class) {
                          tmp397 = Parser.tracer.print("nothing was parsed", 191);
                          return acc
                        } else if (scrut2 instanceof Tree.Error.class) {
                          tmp398 = Parser.tracer.print("cannot parse more", 194);
                          return acc
                        } else {
                          rhs = scrut2;
                          tmp399 = Tree.summary(rhs);
                          tmp400 = "parsed " + tmp399;
                          tmp401 = Parser.tracer.print(tmp400, 197);
                          tmp402 = runtime.safeCall(process(rhs, runtime.Unit));
                          tmp403 = runtime.safeCall(tmp402(acc));
                          return exprCont(tmp403, prec, options)
                        }
                      } else {
                        tmp404 = "the outer precedence is less than " + prec;
                        doTemp4 = Parser.tracer.print(tmp404, 199);
                        return acc
                      }
                    } else {
                      throw new globalThis.Error("match error");
                    }
                  } else if (scrut instanceof Option.None.class) {
                    tmp405 = "cannot consume " + token1;
                    tmp406 = Parser.tracer.print(tmp405, 202);
                    return acc
                  } else {
                    throw new globalThis.Error("match error");
                  }
                }
              } else {
                doTemp2 = Parser.tracer.print("not a keyword", 183);
                token1 = param01;
                scrut = options.infixRule.refChoice;
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
                    tmp407 = "found reference to " + kind;
                    tmp408 = tmp407 + " with outerPrec = ";
                    tmp409 = tmp408 + outerPrec;
                    doTemp3 = Parser.tracer.print(tmp409, 186);
                    outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                    scrut1 = outerPrec$_ > prec;
                    if (scrut1 === true) {
                      tmp410 = Option.getOrElse(innerPrec, outerPrec$_);
                      scrut2 = parseKind(kind, tmp410);
                      if (scrut2 instanceof Tree.Empty.class) {
                        tmp411 = Parser.tracer.print("nothing was parsed", 191);
                        return acc
                      } else if (scrut2 instanceof Tree.Error.class) {
                        tmp412 = Parser.tracer.print("cannot parse more", 194);
                        return acc
                      } else {
                        rhs = scrut2;
                        tmp413 = Tree.summary(rhs);
                        tmp414 = "parsed " + tmp413;
                        tmp415 = Parser.tracer.print(tmp414, 197);
                        tmp416 = runtime.safeCall(process(rhs, runtime.Unit));
                        tmp417 = runtime.safeCall(tmp416(acc));
                        return exprCont(tmp417, prec, options)
                      }
                    } else {
                      tmp418 = "the outer precedence is less than " + prec;
                      doTemp4 = Parser.tracer.print(tmp418, 199);
                      return acc
                    }
                  } else {
                    throw new globalThis.Error("match error");
                  }
                } else if (scrut instanceof Option.None.class) {
                  tmp419 = "cannot consume " + token1;
                  tmp420 = Parser.tracer.print(tmp419, 202);
                  return acc
                } else {
                  throw new globalThis.Error("match error");
                }
              }
            } else {
              doTemp2 = Parser.tracer.print("not a keyword", 183);
              token1 = param01;
              scrut = options.infixRule.refChoice;
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
                  tmp421 = "found reference to " + kind;
                  tmp422 = tmp421 + " with outerPrec = ";
                  tmp423 = tmp422 + outerPrec;
                  doTemp3 = Parser.tracer.print(tmp423, 186);
                  outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
                  scrut1 = outerPrec$_ > prec;
                  if (scrut1 === true) {
                    tmp424 = Option.getOrElse(innerPrec, outerPrec$_);
                    scrut2 = parseKind(kind, tmp424);
                    if (scrut2 instanceof Tree.Empty.class) {
                      tmp425 = Parser.tracer.print("nothing was parsed", 191);
                      return acc
                    } else if (scrut2 instanceof Tree.Error.class) {
                      tmp426 = Parser.tracer.print("cannot parse more", 194);
                      return acc
                    } else {
                      rhs = scrut2;
                      tmp427 = Tree.summary(rhs);
                      tmp428 = "parsed " + tmp427;
                      tmp429 = Parser.tracer.print(tmp428, 197);
                      tmp430 = runtime.safeCall(process(rhs, runtime.Unit));
                      tmp431 = runtime.safeCall(tmp430(acc));
                      return exprCont(tmp431, prec, options)
                    }
                  } else {
                    tmp432 = "the outer precedence is less than " + prec;
                    doTemp4 = Parser.tracer.print(tmp432, 199);
                    return acc
                  }
                } else {
                  throw new globalThis.Error("match error");
                }
              } else if (scrut instanceof Option.None.class) {
                tmp433 = "cannot consume " + token1;
                tmp434 = Parser.tracer.print(tmp433, 202);
                return acc
              } else {
                throw new globalThis.Error("match error");
              }
            }
          }
        } else {
          doTemp2 = Parser.tracer.print("not a keyword", 183);
          token1 = param01;
          scrut = options.infixRule.refChoice;
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
              tmp435 = "found reference to " + kind;
              tmp436 = tmp435 + " with outerPrec = ";
              tmp437 = tmp436 + outerPrec;
              doTemp3 = Parser.tracer.print(tmp437, 186);
              outerPrec$_ = Option.getOrElse(outerPrec, Precedence.Keywords.maxOperatorPrec);
              scrut1 = outerPrec$_ > prec;
              if (scrut1 === true) {
                tmp438 = Option.getOrElse(innerPrec, outerPrec$_);
                scrut2 = parseKind(kind, tmp438);
                if (scrut2 instanceof Tree.Empty.class) {
                  tmp439 = Parser.tracer.print("nothing was parsed", 191);
                  return acc
                } else if (scrut2 instanceof Tree.Error.class) {
                  tmp440 = Parser.tracer.print("cannot parse more", 194);
                  return acc
                } else {
                  rhs = scrut2;
                  tmp441 = Tree.summary(rhs);
                  tmp442 = "parsed " + tmp441;
                  tmp443 = Parser.tracer.print(tmp442, 197);
                  tmp444 = runtime.safeCall(process(rhs, runtime.Unit));
                  tmp445 = runtime.safeCall(tmp444(acc));
                  return exprCont(tmp445, prec, options)
                }
              } else {
                tmp446 = "the outer precedence is less than " + prec;
                doTemp4 = Parser.tracer.print(tmp446, 199);
                return acc
              }
            } else {
              throw new globalThis.Error("match error");
            }
          } else if (scrut instanceof Option.None.class) {
            tmp447 = "cannot consume " + token1;
            tmp448 = Parser.tracer.print(tmp447, 202);
            return acc
          } else {
            throw new globalThis.Error("match error");
          }
        }
      } else {
        doTemp2 = Parser.tracer.print("not a keyword", 183);
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
      doTemp = Parser.tracer.print(">>>>>> mod <<<<<<", 223);
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
      doTemp = Parser.tracer.print(tmp4, 245);
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
      tmp2 = Parser.tracer.print(message, 258);
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
