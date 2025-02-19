import runtime from "./../Runtime.mjs";
import Parser from "./Parser.mjs";
import Predef from "./../Predef.mjs";
import Stack from "./../Stack.mjs";
import Option from "./../Option.mjs";
import TreeTracer from "./../TreeTracer.mjs";
import XML from "./../XML.mjs";
import path from "path";
import railroad from "./../../vendors/railroad/railroad.mjs";
let ParseRule1, RecursiveKnot1, LinkOpts1;
const RecursiveKnot$class = class RecursiveKnot {
  constructor() {}
  toString() { return "RecursiveKnot"; }
}; RecursiveKnot1 = new RecursiveKnot$class;
RecursiveKnot1.class = RecursiveKnot$class;
LinkOpts1 = function LinkOpts(href1) { return new LinkOpts.class(href1); };
LinkOpts1.class = class LinkOpts {
  constructor(href) {
    this.href = href;
  }
  toString() { return "LinkOpts(" + globalThis.Predef.render(this.href) + ")"; }
};
ParseRule1 = class ParseRule {
  static #tracer;
  static {
    let tmp, tmp1, tmp2;
    this.rr = railroad;
    tmp = path.join(ParseRule.libraryPath, "railroad.css");
    tmp1 = globalThis.fs.readFileSync(tmp, "utf-8");
    this.CSS_CONTENT = tmp1;
    tmp2 = new TreeTracer.TreeTracer();
    ParseRule.#tracer = tmp2;
  }
  static ensurePath(pathString) {
    let scrut, tmp, tmp1;
    tmp = runtime.safeCall(globalThis.fs.statSync(pathString));
    scrut = runtime.safeCall(tmp.isDirectory());
    if (scrut === false) {
      throw new globalThis.Error.class("The output directory does not exist.");
    } else {
      tmp1 = runtime.Unit;
    }
    return pathString
  } 
  static get findProjectRoot() {
    let base, fragments, scrut, scrut1, tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9;
    tmp = runtime.safeCall(globalThis.process.cwd());
    base = tmp;
    tmp1 = runtime.safeCall(base.split(path.sep));
    fragments = tmp1;
    tmp2 = - 1;
    scrut = runtime.safeCall(fragments.at(tmp2));
    if (scrut === "shared") {
      tmp3 = - 2;
      scrut1 = runtime.safeCall(fragments.at(tmp3));
      if (scrut1 === "hkmc2") {
        return base
      } else {
        tmp4 = base + path.sep;
        tmp5 = tmp4 + "hkmc2";
        tmp6 = tmp5 + path.sep;
        return tmp6 + "shared"
      }
    } else {
      tmp7 = base + path.sep;
      tmp8 = tmp7 + "hkmc2";
      tmp9 = tmp8 + path.sep;
      return tmp9 + "shared"
    }
  } 
  static get outputPath() {
    let tmp;
    tmp = runtime.safeCall(path.resolve(ParseRule.findProjectRoot, "src", "test", "mlscript", "apps", "output"));
    return ParseRule.ensurePath(tmp);
  } 
  static get libraryPath() {
    let tmp;
    tmp = runtime.safeCall(path.resolve(ParseRule.findProjectRoot, "src", "test", "vendors", "railroad"));
    return ParseRule.ensurePath(tmp);
  } 
  static toHTML(...elements) {
    let tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16;
    tmp = XML.html([
      "lang",
      "en"
    ]);
    tmp1 = XML.elem("head");
    tmp2 = XML.tag("meta");
    tmp3 = runtime.safeCall(tmp2([
      "charset",
      "UTF-8"
    ]));
    tmp4 = XML.tag("meta");
    tmp5 = runtime.safeCall(tmp4([
      "name",
      "viewport"
    ], [
      "content",
      "width=device-width, initial-scale=1.0"
    ]));
    tmp6 = XML.elem("title");
    tmp7 = runtime.safeCall(tmp6("Parse Rules"));
    tmp8 = runtime.safeCall(tmp1(tmp3, tmp5, tmp7));
    tmp9 = XML.style([
      "margin",
      "0"
    ], [
      "padding",
      "1em"
    ]);
    tmp10 = XML.elem("body", tmp9);
    tmp11 = XML.style([
      "display",
      "flex"
    ], [
      "flex-direction",
      "column"
    ], [
      "gap",
      "1em"
    ]);
    tmp12 = XML.elem("div", tmp11);
    tmp13 = runtime.safeCall(tmp12(...elements));
    tmp14 = XML.elem("style");
    tmp15 = runtime.safeCall(tmp14("body{margin:0;font-family:system-ui,sans-serif}", ParseRule.CSS_CONTENT));
    tmp16 = runtime.safeCall(tmp10(tmp13, tmp15));
    return runtime.safeCall(tmp(tmp8, tmp16))
  } 
  static save(fileName, ...diagrams) {
    let tmp, tmp1, tmp2, tmp3;
    tmp = path.join(ParseRule.outputPath, fileName);
    tmp1 = (caseScrut) => {
      let svg, first1, first0, caption, svg1, tmp4, tmp5, tmp6, tmp7;
      if (globalThis.Array.isArray(caseScrut) && caseScrut.length === 2) {
        first0 = caseScrut[0];
        first1 = caseScrut[1];
        caption = first0;
        svg1 = first1;
        tmp4 = XML.style([
          "text-align",
          "center"
        ]);
        tmp5 = XML.elem("figure", tmp4);
        tmp6 = XML.elem("figcaption", [
          "id",
          caption
        ]);
        tmp7 = runtime.safeCall(tmp6(caption));
        return runtime.safeCall(tmp5(svg1, tmp7))
      } else {
        svg = caseScrut;
        return svg
      }
    };
    tmp2 = runtime.safeCall(diagrams.flatMap(tmp1));
    tmp3 = ParseRule.toHTML(...tmp2);
    return runtime.safeCall(globalThis.fs.writeFileSync(tmp, tmp3, "utf-8"))
  } 
  static render(rule) {
    let diagram, sequence, renderRule, renderChoices, helperRules, renderCache, tmp, tmp1;
    sequence = function sequence(lhs, rhsOpt) {
      let param0, rhs;
      if (rhsOpt instanceof Option.Some.class) {
        param0 = rhsOpt.value;
        rhs = param0;
        return ParseRule.rr.Sequence(lhs, rhs)
      } else if (rhsOpt instanceof Option.None.class) {
        return lhs
      } else {
        throw new globalThis.Error("match error");
      }
    };
    diagram = function diagram(choicesOpt) {
      let param0, choices, tmp2;
      if (choicesOpt instanceof Option.Some.class) {
        param0 = choicesOpt.value;
        choices = param0;
        tmp2 = choices;
      } else {
        tmp2 = [];
      }
      return runtime.safeCall(ParseRule.rr.Diagram(tmp2))
    };
    renderRule = function renderRule(rule1, currentRule) {
      let tmp2;
      tmp2 = renderChoices(rule1.choices, currentRule);
      return diagram(tmp2)
    };
    renderChoices = function renderChoices(cs, currentRule) {
      let tmp2;
      tmp2 = () => {
        let optional, choices, param0, param1, head, tail, param01, param11, get, make, proxyRule, ruleName, param02, ruleName1, rule1, scrut, ruleName2, param03, param12, rest, param04, param13, rule2, rest1, scrut1, latterPart, param05, optionalPart, param06, param14, keyword, rest2, choice, scrut2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20, tmp21, tmp22, tmp23, tmp24, tmp25, tmp26, tmp27, tmp28, tmp29, tmp30, tmp31, tmp32, tmp33, tmp34, tmp35, tmp36, tmp37, tmp38, tmp39, tmp40, tmp41, tmp42, tmp43, tmp44, tmp45, tmp46, tmp47, tmp48;
        optional = false;
        choices = [];
        tmp49: while (true) {
          if (cs instanceof Stack.Cons.class) {
            param0 = cs.head;
            param1 = cs.tail;
            head = param0;
            tail = param1;
            if (head instanceof Parser.Choice.End.class) {
              tmp3 = runtime.safeCall(ParseRule.#tracer.print("found Choice.End"));
              optional = true;
              tmp4 = runtime.Unit;
            } else if (head instanceof Parser.Choice.Keyword.class) {
              param06 = head.keyword;
              param14 = head.rest;
              keyword = param06;
              rest2 = param14;
              tmp5 = runtime.safeCall(ParseRule.#tracer.print("found Choice.Keyword"));
              tmp6 = runtime.safeCall(ParseRule.rr.Terminal(keyword.name));
              tmp7 = renderChoices(rest2.choices, currentRule);
              tmp8 = sequence(tmp6, tmp7);
              tmp4 = runtime.safeCall(choices.push(tmp8));
            } else if (head instanceof Parser.Choice.Optional.class) {
              param04 = head.rule;
              param13 = head.rest;
              rule2 = param04;
              rest1 = param13;
              tmp9 = runtime.safeCall(ParseRule.#tracer.print("found Choice.Optional"));
              scrut1 = renderChoices(rule2.choices, currentRule);
              latterPart = renderChoices(rest1.choices, currentRule);
              if (scrut1 instanceof Option.Some.class) {
                param05 = scrut1.value;
                optionalPart = param05;
                tmp10 = runtime.safeCall(ParseRule.rr.Optional(optionalPart));
                tmp11 = sequence(tmp10, latterPart);
              } else if (scrut1 instanceof Option.None.class) {
                tmp11 = latterPart;
              } else {
                throw new globalThis.Error("match error");
              }
              tmp4 = runtime.safeCall(choices.push(tmp11));
            } else if (head instanceof Parser.Choice.Expr.class) {
              param03 = head.process;
              param12 = head.rest;
              rest = param12;
              tmp12 = runtime.safeCall(ParseRule.#tracer.print("found Choice.Expr"));
              tmp13 = runtime.safeCall(ParseRule.rr.NonTerminal("expr"));
              tmp14 = renderChoices(rest.choices, currentRule);
              tmp15 = sequence(tmp13, tmp14);
              tmp4 = runtime.safeCall(choices.push(tmp15));
            } else if (head instanceof Parser.Choice.Lazy.class) {
              param01 = head.get;
              param11 = head.make;
              get = param01;
              make = param11;
              scrut = runtime.safeCall(renderCache.has(head));
              if (scrut === true) {
                tmp16 = runtime.safeCall(ParseRule.#tracer.print("found Choice.Lazy in cache"));
                tmp17 = runtime.safeCall(renderCache.get(head));
                ruleName2 = tmp17;
                tmp18 = "#" + ruleName2;
                tmp19 = LinkOpts1(tmp18);
                tmp20 = ParseRule.rr.NonTerminal(ruleName2, tmp19);
                tmp4 = runtime.safeCall(choices.push(tmp20));
              } else {
                if (currentRule instanceof Option.Some.class) {
                  param02 = currentRule.value;
                  ruleName1 = param02;
                  tmp21 = runtime.safeCall(ParseRule.#tracer.print("found Choice.Lazy in recursion"));
                  tmp22 = runtime.safeCall(get());
                  rule1 = tmp22;
                  if (rule1 instanceof RecursiveKnot1.class) {
                    tmp23 = runtime.safeCall(ParseRule.#tracer.print("found RecursiveKnot"));
                    tmp24 = "#" + ruleName1;
                    tmp25 = LinkOpts1(tmp24);
                    tmp26 = ParseRule.rr.NonTerminal(ruleName1, tmp25);
                    tmp27 = runtime.safeCall(choices.push(tmp26));
                  } else {
                    tmp28 = globalThis.String(rule1);
                    tmp29 = "expect RecursiveKnot, found " + tmp28;
                    tmp30 = runtime.safeCall(ParseRule.#tracer.print(tmp29));
                    tmp27 = Predef.notImplementedError;
                  }
                  tmp4 = tmp27;
                } else if (currentRule instanceof Option.None.class) {
                  tmp31 = runtime.safeCall(ParseRule.#tracer.print("found Choice.Lazy in top-level"));
                  tmp32 = runtime.safeCall(make(() => {
                    return RecursiveKnot1
                  }));
                  proxyRule = tmp32;
                  tmp33 = runtime.safeCall(helperRules.length.toString());
                  tmp34 = "rule$" + tmp33;
                  ruleName = tmp34;
                  tmp35 = Stack.Cons(proxyRule, Stack.Nil);
                  tmp36 = Option.Some(ruleName);
                  tmp37 = renderChoices(tmp35, tmp36);
                  tmp38 = diagram(tmp37);
                  tmp39 = Predef.tuple(ruleName, tmp38);
                  tmp40 = runtime.safeCall(helperRules.push(tmp39));
                  tmp41 = "#" + ruleName;
                  tmp42 = LinkOpts1(tmp41);
                  tmp43 = ParseRule.rr.NonTerminal(ruleName, tmp42);
                  tmp44 = runtime.safeCall(choices.push(tmp43));
                  tmp4 = renderCache.set(head, ruleName);
                } else {
                  tmp4 = runtime.Unit;
                }
              }
            } else {
              tmp4 = runtime.Unit;
            }
            cs = tail;
            tmp45 = runtime.Unit;
            continue tmp49;
          } else {
            tmp45 = runtime.Unit;
          }
          break;
        }
        tmp46 = runtime.safeCall(choices.length.toString());
        tmp47 = ParseRule.#tracer.print("choices: ", tmp46);
        scrut2 = choices.length;
        if (scrut2 === 0) {
          return Option.None
        } else {
          choice = ParseRule.rr.Choice(0, ...choices);
          if (optional === true) {
            tmp48 = runtime.safeCall(ParseRule.rr.Optional(choice));
            return Option.Some(tmp48)
          } else {
            return Option.Some(choice)
          }
        }
      };
      return runtime.safeCall(ParseRule.#tracer.trace("renderChoices <<< ", (result) => {
        return "renderChoices >>> "
      }, tmp2))
    };
    helperRules = [];
    tmp = new globalThis.Map();
    renderCache = tmp;
    tmp1 = renderRule(rule, Option.None);
    return [
      [
        "Prefix Rules",
        tmp1
      ],
      ...helperRules
    ]
  }
  static toString() { return "ParseRule"; }
};
let ParseRule = ParseRule1; export default ParseRule;
