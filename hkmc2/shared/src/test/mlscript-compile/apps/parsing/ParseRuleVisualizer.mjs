import runtime from "./../../Runtime.mjs";
import ParseRule from "./ParseRule.mjs";
import Predef from "./../../Predef.mjs";
import Stack from "./../../Stack.mjs";
import Option from "./../../Option.mjs";
import TreeTracer from "./../../TreeTracer.mjs";
import XML from "./../../XML.mjs";
import path from "path";
import railroad from "./../../../vendors/railroad/railroad.mjs";
let RecursiveKnot1, ParseRuleVisualizer1, LinkOpts1;
RecursiveKnot1 = function RecursiveKnot(getName1) { return new RecursiveKnot.class(getName1); };
RecursiveKnot1.class = class RecursiveKnot {
  constructor(getName) {
    this.getName = getName;
  }
  toString() { return "RecursiveKnot(" + globalThis.Predef.render(this.getName) + ")"; }
};
LinkOpts1 = function LinkOpts(href1) { return new LinkOpts.class(href1); };
LinkOpts1.class = class LinkOpts {
  constructor(href) {
    this.href = href;
  }
  toString() { return "LinkOpts(" + globalThis.Predef.render(this.href) + ")"; }
};
ParseRuleVisualizer1 = class ParseRuleVisualizer {
  static #outputPath;
  static {
    let tmp, tmp1, tmp2, tmp3, tmp4;
    this.rr = railroad;
    tmp = runtime.safeCall(path.resolve(ParseRuleVisualizer.findProjectRoot, "src", "test", "mlscript", "apps", "output"));
    tmp1 = ParseRuleVisualizer.ensurePath(tmp);
    ParseRuleVisualizer.#outputPath = tmp1;
    tmp2 = path.join(ParseRuleVisualizer.libraryPath, "railroad.css");
    tmp3 = globalThis.fs.readFileSync(tmp2, "utf-8");
    this.CSS_CONTENT = tmp3;
    tmp4 = new TreeTracer.TreeTracer();
    this.tracer = tmp4;
  }
  static ensurePath(pathString) {
    let scrut, tmp, tmp1;
    tmp = runtime.safeCall(globalThis.fs.statSync(pathString));
    scrut = runtime.safeCall(tmp.isDirectory());
    if (scrut === false) {
      throw globalThis.Error("The output directory does not exist.");
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
  static filePath(...fragments) {
    return path.join(ParseRuleVisualizer.#outputPath, ...fragments)
  } 
  static get libraryPath() {
    let tmp;
    tmp = runtime.safeCall(path.resolve(ParseRuleVisualizer.findProjectRoot, "src", "test", "vendors", "railroad"));
    return ParseRuleVisualizer.ensurePath(tmp);
  } 
  static render(title, rule) {
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
    renderChoice = function renderChoice(parentRule, choice, currentRule) {
      let doTemp, param0, param1, get, make, rule1, proxyChoice, getProxyChoiceName, ruleName, param01, getName, scrut, ruleName1, param02, param11, param2, kind, rest, param03, param12, rule2, rest1, scrut1, latterPart, param04, optionalPart, param05, param13, keyword, rest2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20, tmp21, tmp22, tmp23, tmp24, tmp25, tmp26, tmp27, tmp28, tmp29, tmp30, tmp31, tmp32, tmp33, tmp34, tmp35, tmp36, tmp37, tmp38, tmp39, tmp40, tmp41, tmp42, tmp43;
      if (choice instanceof ParseRule.Choice.End.class) {
        tmp3 = runtime.safeCall(ParseRuleVisualizer.tracer.print("found Choice.End"));
        return Option.None
      } else if (choice instanceof ParseRule.Choice.Keyword.class) {
        param05 = choice.keyword;
        param13 = choice.rest;
        keyword = param05;
        rest2 = param13;
        tmp4 = runtime.safeCall(ParseRuleVisualizer.tracer.print("found Choice.Keyword"));
        tmp5 = runtime.safeCall(ParseRuleVisualizer.rr.Terminal(keyword.name));
        tmp6 = renderRule(rest2, currentRule);
        tmp7 = sequence(tmp5, tmp6);
        return Option.Some(tmp7)
      } else if (choice instanceof ParseRule.Choice.Optional.class) {
        param03 = choice.rule;
        param12 = choice.rest;
        rule2 = param03;
        rest1 = param12;
        tmp8 = runtime.safeCall(ParseRuleVisualizer.tracer.print("found Choice.Optional"));
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
      } else if (choice instanceof ParseRule.Choice.Ref.class) {
        param02 = choice.kind;
        param11 = choice.process;
        param2 = choice.rest;
        kind = param02;
        rest = param2;
        tmp11 = "found Choice.Ref to " + kind;
        tmp12 = runtime.safeCall(ParseRuleVisualizer.tracer.print(tmp11));
        tmp13 = runtime.safeCall(ParseRuleVisualizer.rr.NonTerminal(kind));
        tmp14 = renderRule(rest, currentRule);
        tmp15 = sequence(tmp13, tmp14);
        return Option.Some(tmp15)
      } else if (choice instanceof ParseRule.Choice.Lazy.class) {
        param0 = choice.get;
        param1 = choice.make;
        get = param0;
        make = param1;
        scrut = runtime.safeCall(renderCache.has(make));
        if (scrut === true) {
          tmp16 = runtime.safeCall(ParseRuleVisualizer.tracer.print("found Choice.Lazy in cache"));
          tmp17 = runtime.safeCall(renderCache.get(make));
          ruleName1 = tmp17;
          tmp18 = "#" + ruleName1;
          tmp19 = LinkOpts1(tmp18);
          tmp20 = ParseRuleVisualizer.rr.NonTerminal(ruleName1, tmp19);
          return Option.Some(tmp20)
        } else {
          tmp21 = runtime.safeCall(get());
          rule1 = tmp21;
          if (rule1 instanceof RecursiveKnot1.class) {
            param01 = rule1.getName;
            getName = param01;
            tmp22 = runtime.safeCall(getName());
            tmp23 = "found RecursiveKnot of \"" + tmp22;
            tmp24 = tmp23 + "\"";
            tmp25 = runtime.safeCall(ParseRuleVisualizer.tracer.print(tmp24));
            tmp26 = runtime.safeCall(getName());
            tmp27 = runtime.safeCall(getName());
            tmp28 = "#" + tmp27;
            tmp29 = LinkOpts1(tmp28);
            tmp30 = ParseRuleVisualizer.rr.NonTerminal(tmp26, tmp29);
            return Option.Some(tmp30)
          } else {
            tmp31 = runtime.safeCall(ParseRuleVisualizer.tracer.print("found Choice.Lazy not in cache"));
            proxyChoice = null;
            tmp32 = () => {
              let scrut2, param06, rule3;
              scrut2 = ParseRule.Choice.rest(proxyChoice);
              if (scrut2 instanceof Option.Some.class) {
                param06 = scrut2.value;
                rule3 = param06;
                return rule3.name
              } else {
                return "???"
              }
            };
            getProxyChoiceName = tmp32;
            tmp33 = runtime.safeCall(make(() => {
              return RecursiveKnot1(getProxyChoiceName)
            }));
            proxyChoice = tmp33;
            tmp34 = runtime.safeCall(getProxyChoiceName());
            ruleName = tmp34;
            tmp35 = renderCache.set(make, ruleName);
            tmp36 = renderChoice(parentRule, proxyChoice, Option.None);
            tmp37 = diagram(tmp36);
            tmp38 = Predef.tuple(ruleName, tmp37);
            tmp39 = runtime.safeCall(helperRules.push(tmp38));
            tmp40 = "#" + ruleName;
            tmp41 = LinkOpts1(tmp40);
            tmp42 = ParseRuleVisualizer.rr.NonTerminal(ruleName, tmp41);
            return Option.Some(tmp42)
          }
        }
      } else {
        tmp43 = "unexpected choice: " + choice;
        doTemp = runtime.safeCall(globalThis.console.log(tmp43));
        throw new globalThis.Error("match error");
      }
    };
    renderRule = function renderRule(rule1, currentRule) {
      let tmp3, tmp4;
      tmp3 = "renderRule <<< " + rule1.name;
      tmp4 = () => {
        let rest, optional, nodes, param0, param1, head, tail, scrut, param01, node, choice, scrut1, tmp5, tmp6, tmp7, tmp8, tmp9;
        rest = rule1.choices;
        optional = false;
        nodes = [];
        tmp10: while (true) {
          if (rest instanceof Stack.Cons.class) {
            param0 = rest.head;
            param1 = rest.tail;
            head = param0;
            tail = param1;
            scrut = renderChoice(rule1, head, currentRule);
            if (scrut instanceof Option.Some.class) {
              param01 = scrut.value;
              node = param01;
              tmp5 = runtime.safeCall(nodes.push(node));
            } else if (scrut instanceof Option.None.class) {
              optional = true;
              tmp5 = runtime.Unit;
            } else {
              tmp5 = runtime.Unit;
            }
            rest = tail;
            tmp6 = runtime.Unit;
            continue tmp10;
          } else {
            tmp6 = runtime.Unit;
          }
          break;
        }
        tmp7 = runtime.safeCall(nodes.length.toString());
        tmp8 = ParseRuleVisualizer.tracer.print("nodes: ", tmp7);
        scrut1 = nodes.length;
        if (scrut1 === 0) {
          return Option.None
        } else {
          choice = ParseRuleVisualizer.rr.Choice(0, ...nodes);
          if (optional === true) {
            tmp9 = runtime.safeCall(ParseRuleVisualizer.rr.Optional(choice));
            return Option.Some(tmp9)
          } else {
            return Option.Some(choice)
          }
        }
      };
      return runtime.safeCall(ParseRuleVisualizer.tracer.trace(tmp3, (result) => {
        return "renderRule >>> "
      }, tmp4))
    };
    helperRules = [];
    tmp = new globalThis.Map();
    renderCache = tmp;
    tmp1 = renderRule(rule, Option.None);
    tmp2 = diagram(tmp1);
    return [
      [
        title,
        tmp2
      ],
      ...helperRules
    ]
  }
  static toString() { return "ParseRuleVisualizer"; }
};
let ParseRuleVisualizer = ParseRuleVisualizer1; export default ParseRuleVisualizer;
