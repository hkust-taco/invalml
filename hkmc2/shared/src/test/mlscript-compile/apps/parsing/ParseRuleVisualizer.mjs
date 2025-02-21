import runtime from "./../../Runtime.mjs";
import Parser from "./../Parser.mjs";
import ParseRule from "./ParseRule.mjs";
import Predef from "./../../Predef.mjs";
import Stack from "./../../Stack.mjs";
import Option from "./../../Option.mjs";
import TreeTracer from "./../../TreeTracer.mjs";
import XML from "./../../XML.mjs";
import path from "path";
import railroad from "./../../../vendors/railroad/railroad.mjs";
let RecursiveKnot1, ParseRuleVisualizer1, LinkOpts1;
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
ParseRuleVisualizer1 = class ParseRuleVisualizer {
  static #tracer;
  static {
    let tmp, tmp1, tmp2;
    this.rr = railroad;
    tmp = path.join(ParseRuleVisualizer.libraryPath, "railroad.css");
    tmp1 = globalThis.fs.readFileSync(tmp, "utf-8");
    this.CSS_CONTENT = tmp1;
    tmp2 = new TreeTracer.TreeTracer();
    ParseRuleVisualizer.#tracer = tmp2;
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
    tmp = runtime.safeCall(path.resolve(ParseRuleVisualizer.findProjectRoot, "src", "test", "mlscript", "apps", "output"));
    return ParseRuleVisualizer.ensurePath(tmp);
  } 
  static get libraryPath() {
    let tmp;
    tmp = runtime.safeCall(path.resolve(ParseRuleVisualizer.findProjectRoot, "src", "test", "vendors", "railroad"));
    return ParseRuleVisualizer.ensurePath(tmp);
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
    tmp15 = runtime.safeCall(tmp14("body{margin:0;font-family:system-ui,sans-serif}", ParseRuleVisualizer.CSS_CONTENT));
    tmp16 = runtime.safeCall(tmp10(tmp13, tmp15));
    return runtime.safeCall(tmp(tmp8, tmp16))
  } 
  static save(fileName, ...diagrams) {
    let tmp, tmp1, tmp2, tmp3;
    tmp = path.join(ParseRuleVisualizer.outputPath, fileName);
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
    tmp3 = ParseRuleVisualizer.toHTML(...tmp2);
    return runtime.safeCall(globalThis.fs.writeFileSync(tmp, tmp3, "utf-8"))
  } 
  static render(rule) {
    let diagram, sequence, renderChoice, renderRule, helperRules, renderCache, tmp, tmp1, tmp2;
    sequence = function sequence(lhs, rhsOpt) {
      let param0, rhs;
      if (rhsOpt instanceof Option.Some.class) {
        param0 = rhsOpt.value;
        rhs = param0;
        return ParseRuleVisualizer.rr.Sequence(lhs, rhs)
      } else if (rhsOpt instanceof Option.None.class) {
        return lhs
      } else {
        throw new globalThis.Error("match error");
      }
    };
    diagram = function diagram(choicesOpt) {
      let param0, choices, tmp3;
      if (choicesOpt instanceof Option.Some.class) {
        param0 = choicesOpt.value;
        choices = param0;
        tmp3 = choices;
      } else {
        tmp3 = [];
      }
      return runtime.safeCall(ParseRuleVisualizer.rr.Diagram(tmp3))
    };
    renderChoice = function renderChoice(choice, currentRule) {
      let doTemp, param0, param1, get, make, proxyRule, ruleName, param01, ruleName1, rule1, scrut, ruleName2, param02, param11, param2, rest, param03, param12, rule2, rest1, scrut1, latterPart, param04, optionalPart, param05, param13, keyword, rest2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20, tmp21, tmp22, tmp23, tmp24, tmp25, tmp26, tmp27, tmp28, tmp29, tmp30, tmp31, tmp32, tmp33, tmp34, tmp35, tmp36, tmp37, tmp38, tmp39, tmp40, tmp41, tmp42, tmp43;
      if (choice instanceof ParseRule.Choice.End.class) {
        tmp3 = runtime.safeCall(ParseRuleVisualizer.#tracer.print("found Choice.End"));
        return Option.None
      } else if (choice instanceof ParseRule.Choice.Keyword.class) {
        param05 = choice.keyword;
        param13 = choice.rest;
        keyword = param05;
        rest2 = param13;
        tmp4 = runtime.safeCall(ParseRuleVisualizer.#tracer.print("found Choice.Keyword"));
        tmp5 = runtime.safeCall(ParseRuleVisualizer.rr.Terminal(keyword.name));
        tmp6 = renderRule(rest2, currentRule);
        tmp7 = sequence(tmp5, tmp6);
        return Option.Some(tmp7)
      } else if (choice instanceof ParseRule.Choice.Optional.class) {
        param03 = choice.rule;
        param12 = choice.rest;
        rule2 = param03;
        rest1 = param12;
        tmp8 = runtime.safeCall(ParseRuleVisualizer.#tracer.print("found Choice.Optional"));
        scrut1 = renderRule(rule2, currentRule);
        latterPart = renderRule(rest1, currentRule);
        if (scrut1 instanceof Option.Some.class) {
          param04 = scrut1.value;
          optionalPart = param04;
          tmp9 = runtime.safeCall(ParseRuleVisualizer.rr.Optional(optionalPart));
          tmp10 = sequence(tmp9, latterPart);
        } else if (scrut1 instanceof Option.None.class) {
          tmp10 = latterPart;
        } else {
          throw new globalThis.Error("match error");
        }
        return Option.Some(tmp10)
      } else if (choice instanceof ParseRule.Choice.Expr.class) {
        param02 = choice.isType;
        param11 = choice.process;
        param2 = choice.rest;
        rest = param2;
        tmp11 = runtime.safeCall(ParseRuleVisualizer.#tracer.print("found Choice.Expr"));
        tmp12 = runtime.safeCall(ParseRuleVisualizer.rr.NonTerminal("expr"));
        tmp13 = renderRule(rest, currentRule);
        tmp14 = sequence(tmp12, tmp13);
        return Option.Some(tmp14)
      } else if (choice instanceof ParseRule.Choice.Lazy.class) {
        param0 = choice.get;
        param1 = choice.make;
        get = param0;
        make = param1;
        scrut = runtime.safeCall(renderCache.has(choice));
        if (scrut === true) {
          tmp15 = runtime.safeCall(ParseRuleVisualizer.#tracer.print("found Choice.Lazy in cache"));
          tmp16 = runtime.safeCall(renderCache.get(choice));
          ruleName2 = tmp16;
          tmp17 = "#" + ruleName2;
          tmp18 = LinkOpts1(tmp17);
          tmp19 = ParseRuleVisualizer.rr.NonTerminal(ruleName2, tmp18);
          return Option.Some(tmp19)
        } else {
          if (currentRule instanceof Option.Some.class) {
            param01 = currentRule.value;
            ruleName1 = param01;
            tmp20 = runtime.safeCall(ParseRuleVisualizer.#tracer.print("found Choice.Lazy in recursion"));
            tmp21 = runtime.safeCall(get());
            rule1 = tmp21;
            if (rule1 instanceof RecursiveKnot1.class) {
              tmp22 = runtime.safeCall(ParseRuleVisualizer.#tracer.print("found RecursiveKnot"));
              tmp23 = "#" + ruleName1;
              tmp24 = LinkOpts1(tmp23);
              tmp25 = ParseRuleVisualizer.rr.NonTerminal(ruleName1, tmp24);
              return Option.Some(tmp25)
            } else {
              tmp26 = globalThis.String(rule1);
              tmp27 = "expect RecursiveKnot, found " + tmp26;
              tmp28 = runtime.safeCall(ParseRuleVisualizer.#tracer.print(tmp27));
              return Predef.notImplementedError
            }
          } else if (currentRule instanceof Option.None.class) {
            tmp29 = runtime.safeCall(ParseRuleVisualizer.#tracer.print("found Choice.Lazy in top-level"));
            tmp30 = runtime.safeCall(make(() => {
              return RecursiveKnot1
            }));
            proxyRule = tmp30;
            tmp31 = runtime.safeCall(helperRules.length.toString());
            tmp32 = "rule$" + tmp31;
            ruleName = tmp32;
            tmp33 = Option.Some(ruleName);
            tmp34 = renderChoice(proxyRule, tmp33);
            tmp35 = diagram(tmp34);
            tmp36 = Predef.tuple(ruleName, tmp35);
            tmp37 = runtime.safeCall(helperRules.push(tmp36));
            tmp38 = renderCache.set(choice, ruleName);
            tmp39 = "#" + ruleName;
            tmp40 = LinkOpts1(tmp39);
            tmp41 = ParseRuleVisualizer.rr.NonTerminal(ruleName, tmp40);
            return Option.Some(tmp41)
          } else {
            tmp42 = "unexpected choice: " + choice;
            doTemp = runtime.safeCall(globalThis.console.log(tmp42));
            throw new globalThis.Error("match error");
          }
        }
      } else {
        tmp43 = "unexpected choice: " + choice;
        doTemp = runtime.safeCall(globalThis.console.log(tmp43));
        throw new globalThis.Error("match error");
      }
    };
    renderRule = function renderRule(rule1, currentRule) {
      let tmp3;
      tmp3 = () => {
        let rest, optional, nodes, param0, param1, head, tail, scrut, param01, node, choice, scrut1, tmp4, tmp5, tmp6, tmp7, tmp8;
        rest = rule1.choices;
        optional = false;
        nodes = [];
        tmp9: while (true) {
          if (rest instanceof Stack.Cons.class) {
            param0 = rest.head;
            param1 = rest.tail;
            head = param0;
            tail = param1;
            scrut = renderChoice(head, currentRule);
            if (scrut instanceof Option.Some.class) {
              param01 = scrut.value;
              node = param01;
              tmp4 = runtime.safeCall(nodes.push(node));
            } else if (scrut instanceof Option.None.class) {
              optional = true;
              tmp4 = runtime.Unit;
            } else {
              tmp4 = runtime.Unit;
            }
            rest = tail;
            tmp5 = runtime.Unit;
            continue tmp9;
          } else {
            tmp5 = runtime.Unit;
          }
          break;
        }
        tmp6 = runtime.safeCall(nodes.length.toString());
        tmp7 = ParseRuleVisualizer.#tracer.print("nodes: ", tmp6);
        scrut1 = nodes.length;
        if (scrut1 === 0) {
          return Option.None
        } else {
          choice = ParseRuleVisualizer.rr.Choice(0, ...nodes);
          if (optional === true) {
            tmp8 = runtime.safeCall(ParseRuleVisualizer.rr.Optional(choice));
            return Option.Some(tmp8)
          } else {
            return Option.Some(choice)
          }
        }
      };
      return runtime.safeCall(ParseRuleVisualizer.#tracer.trace("renderRule <<< ", (result) => {
        return "renderRule >>> "
      }, tmp3))
    };
    helperRules = [];
    tmp = new globalThis.Map();
    renderCache = tmp;
    tmp1 = renderRule(rule, Option.None);
    tmp2 = diagram(tmp1);
    return [
      [
        "Prefix Rules",
        tmp2
      ],
      ...helperRules
    ]
  }
  static toString() { return "ParseRuleVisualizer"; }
};
let ParseRuleVisualizer = ParseRuleVisualizer1; export default ParseRuleVisualizer;
