import runtime from "./../../Runtime.mjs";
import Lexer from "./../Lexer.mjs";
import Precedence from "./Precedence.mjs";
import ParseRule from "./ParseRule.mjs";
import Token from "./Token.mjs";
import Tree from "./Tree.mjs";
import TokenHelpers from "./TokenHelpers.mjs";
import TreeHelpers from "./TreeHelpers.mjs";
import Parser from "./../Parser.mjs";
import Iter from "./../../Iter.mjs";
import Option from "./../../Option.mjs";
import Predef from "./../../Predef.mjs";
import Stack from "./../../Stack.mjs";
let Test1;
Test1 = class Test {
  static {
    const Flag$class = class Flag {
      constructor() {}
      unapply(scrut) {
        if (scrut === "tree") {
          return runtime.safeCall(globalThis.Predef.MatchResult([]))
        } else if (scrut === "trace") {
          return runtime.safeCall(globalThis.Predef.MatchResult([]))
        } else if (scrut === "tokens") {
          return runtime.safeCall(globalThis.Predef.MatchResult([]))
        } else {
          return runtime.safeCall(globalThis.Predef.MatchFailure())
        }
      } 
      unapplyStringPrefix(topic) {
        let cond, sliced, cond1, sliced1, cond2, sliced2;
        cond = globalThis.Predef.stringStartsWith(topic, "tree");
        if (cond === true) {
          sliced = globalThis.Predef.stringDrop(topic, 4);
          return runtime.safeCall(globalThis.Predef.MatchResult([
            sliced
          ]))
        } else {
          cond1 = globalThis.Predef.stringStartsWith(topic, "trace");
          if (cond1 === true) {
            sliced1 = globalThis.Predef.stringDrop(topic, 5);
            return runtime.safeCall(globalThis.Predef.MatchResult([
              sliced1
            ]))
          } else {
            cond2 = globalThis.Predef.stringStartsWith(topic, "tokens");
            if (cond2 === true) {
              sliced2 = globalThis.Predef.stringDrop(topic, 6);
              return runtime.safeCall(globalThis.Predef.MatchResult([
                sliced2
              ]))
            } else {
              return runtime.safeCall(globalThis.Predef.MatchFailure())
            }
          }
        }
      }
      toString() { return "Flag"; }
    };
    this.Flag = new Flag$class;
    this.Flag.class = Flag$class;
  }
  static flags(tokens) {
    let result, param0, param1, param01, param11, param02, param12, param03, param13, flag, matchResult, tail, param04, param14, param05, param15, flag1, matchResult1, tail1, tmp, tmp1, tmp2, tmp3;
    tmp = new globalThis.Set();
    result = tmp;
    tmp4: while (true) {
      if (tokens instanceof Stack.Cons.class) {
        param0 = tokens.head;
        param1 = tokens.tail;
        if (param0 instanceof Token.Space.class) {
          if (param1 instanceof Stack.Cons.class) {
            param02 = param1.head;
            param12 = param1.tail;
            if (param02 instanceof Token.Identifier.class) {
              param03 = param02.name;
              param13 = param02.symbolic;
              if (param03 === ":") {
                if (param12 instanceof Stack.Cons.class) {
                  param04 = param12.head;
                  param14 = param12.tail;
                  if (param04 instanceof Token.Identifier.class) {
                    param05 = param04.name;
                    param15 = param04.symbolic;
                    matchResult1 = runtime.safeCall(Test.Flag.unapply(param05));
                    if (matchResult1 instanceof globalThis.Predef.MatchResult.class) {
                      flag1 = param05;
                      tail1 = param14;
                      tmp1 = runtime.safeCall(result.add(flag1));
                      tokens = tail1;
                      tmp2 = runtime.Unit;
                      continue tmp4;
                    } else {
                      tmp2 = [
                        result,
                        tokens
                      ];
                    }
                  } else {
                    tmp2 = [
                      result,
                      tokens
                    ];
                  }
                } else {
                  tmp2 = [
                    result,
                    tokens
                  ];
                }
              } else {
                tmp2 = [
                  result,
                  tokens
                ];
              }
            } else {
              tmp2 = [
                result,
                tokens
              ];
            }
          } else {
            tmp2 = [
              result,
              tokens
            ];
          }
        } else if (param0 instanceof Token.Identifier.class) {
          param01 = param0.name;
          param11 = param0.symbolic;
          if (param01 === ":") {
            if (param1 instanceof Stack.Cons.class) {
              param02 = param1.head;
              param12 = param1.tail;
              if (param02 instanceof Token.Identifier.class) {
                param03 = param02.name;
                param13 = param02.symbolic;
                matchResult = runtime.safeCall(Test.Flag.unapply(param03));
                if (matchResult instanceof globalThis.Predef.MatchResult.class) {
                  flag = param03;
                  tail = param12;
                  tmp3 = runtime.safeCall(result.add(flag));
                  tokens = tail;
                  tmp2 = runtime.Unit;
                  continue tmp4;
                } else {
                  tmp2 = [
                    result,
                    tokens
                  ];
                }
              } else {
                tmp2 = [
                  result,
                  tokens
                ];
              }
            } else {
              tmp2 = [
                result,
                tokens
              ];
            }
          } else {
            tmp2 = [
              result,
              tokens
            ];
          }
        } else {
          tmp2 = [
            result,
            tokens
          ];
        }
      } else {
        tmp2 = [
          result,
          tokens
        ];
      }
      break;
    }
    return tmp2
  } 
  static example(...lines) {
    let source, tokens1, scrut, first1, first0, flags, tokens2, scrut1, trees, scrut2, tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13;
    tmp = runtime.safeCall(lines.join("\n"));
    source = tmp;
    tmp1 = Lexer.lex(source);
    tokens1 = tmp1;
    scrut = Test.flags(tokens1);
    if (globalThis.Array.isArray(scrut) && scrut.length === 2) {
      first0 = scrut[0];
      first1 = scrut[1];
      flags = first0;
      tokens2 = first1;
      scrut1 = runtime.safeCall(flags.has("tokens"));
      if (scrut1 === true) {
        tmp2 = TokenHelpers.panorama(tokens2);
        tmp3 = Predef.print(tmp2);
      } else {
        tmp3 = runtime.Unit;
      }
      tmp4 = runtime.safeCall(Parser.tracer.reset());
      tmp5 = runtime.safeCall(flags.has("trace"));
      Parser.tracer.enabled = tmp5;
      tmp6 = Parser.parse(tokens2);
      trees = tmp6;
      Parser.tracer.enabled = false;
      scrut2 = runtime.safeCall(flags.has("tree"));
      if (scrut2 === true) {
        tmp7 = Iter.fromStack(trees);
        tmp8 = Iter.mapping(tmp7, TreeHelpers.showAsTree);
        tmp9 = Iter.joined(tmp8, "\n");
        tmp10 = Predef.print(tmp9);
      } else {
        tmp10 = runtime.Unit;
      }
      tmp11 = Iter.fromStack(trees);
      tmp12 = Iter.mapping(tmp11, Tree.summary);
      tmp13 = Iter.joined(tmp12, "\n");
      return Predef.print(tmp13)
    } else {
      throw new globalThis.Error("match error");
    }
  }
  static toString() { return "Test"; }
};
let Test = Test1; export default Test;
