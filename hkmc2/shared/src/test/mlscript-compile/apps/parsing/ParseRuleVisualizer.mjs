import runtime from "./../../Runtime.mjs";
import ParseRule from "./ParseRule.mjs";
import Rules from "./Rules.mjs";
import Parser from "./../Parser.mjs";
import Predef from "./../../Predef.mjs";
import Stack from "./../../Stack.mjs";
import Iter from "./../../Iter.mjs";
import Option from "./../../Option.mjs";
import TreeTracer from "./../../TreeTracer.mjs";
import XML from "./../../XML.mjs";
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
  static #defaultKinds;
  static #renderedKinds;
  static {
    let tmp, tmp1, tmp2;
    tmp = new TreeTracer.TreeTracer();
    this.tracer = tmp;
    tmp1 = Predef.tuple("type", "term", "typevar", "ident");
    ParseRuleVisualizer.#defaultKinds = tmp1;
    tmp2 = new globalThis.Set(ParseRuleVisualizer.#defaultKinds);
    ParseRuleVisualizer.#renderedKinds = tmp2;
  }
  static reset() {
    let tmp;
    tmp = new globalThis.Set(ParseRuleVisualizer.#defaultKinds);
    ParseRuleVisualizer.#renderedKinds = tmp;
    return runtime.Unit
  } 
  static render(rr, title, rule) {
    let diagram, sequence, renderChoice, renderRule, helperRules, referencedKinds, renderCache, diagrams, scrut, currentKinds, tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9;
    sequence = function sequence(lhs, rhsOpt) {
      let param0, rhs;
      if (rhsOpt instanceof Option.Some.class) {
        param0 = rhsOpt.value;
        rhs = param0;
        return rr.Sequence(lhs, rhs)
      } else if (rhsOpt instanceof Option.None.class) {
        return lhs
      } else {
        throw new globalThis.Error("match error");
      }
    };
    diagram = function diagram(choicesOpt) {
      let param0, choices, tmp10;
      if (choicesOpt instanceof Option.Some.class) {
        param0 = choicesOpt.value;
        choices = param0;
        tmp10 = choices;
      } else {
        tmp10 = [];
      }
      return runtime.safeCall(rr.Diagram(tmp10))
    };
    renderChoice = function renderChoice(parentRule, choice, currentRule) {
      let doTemp, param0, param1, get, make, rule1, proxyChoice, getProxyChoiceName, ruleName, param01, getName, scrut1, ruleName1, param02, param11, param2, param3, param4, kind, outerPrec, innerPrec, rest, scrut2, param03, param12, param21, rule2, optional, rest1, scrut3, latterPart, param04, optionalPart, param05, param13, keyword, rest2, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20, tmp21, tmp22, tmp23, tmp24, tmp25, tmp26, tmp27, tmp28, tmp29, tmp30, tmp31, tmp32, tmp33, tmp34, tmp35, tmp36, tmp37, tmp38, tmp39, tmp40, tmp41, tmp42, tmp43, tmp44, tmp45, tmp46, tmp47, tmp48, tmp49, tmp50, tmp51, tmp52, tmp53;
      if (choice instanceof ParseRule.Choice.End.class) {
        tmp10 = runtime.safeCall(ParseRuleVisualizer.tracer.print("found Choice.End"));
        return Option.None
      } else if (choice instanceof ParseRule.Choice.Keyword.class) {
        param05 = choice.keyword;
        param13 = choice.rest;
        keyword = param05;
        rest2 = param13;
        tmp11 = runtime.safeCall(ParseRuleVisualizer.tracer.print("found Choice.Keyword"));
        tmp12 = runtime.safeCall(rr.Terminal(keyword.name));
        tmp13 = renderRule(rest2, currentRule);
        tmp14 = sequence(tmp12, tmp13);
        return Option.Some(tmp14)
      } else if (choice instanceof ParseRule.Choice.Siding.class) {
        param03 = choice.rule;
        param12 = choice.optional;
        param21 = choice.rest;
        rule2 = param03;
        optional = param12;
        rest1 = param21;
        tmp15 = runtime.safeCall(ParseRuleVisualizer.tracer.print("found Choice.Siding"));
        scrut3 = renderRule(rule2, currentRule);
        latterPart = renderRule(rest1, currentRule);
        if (scrut3 instanceof Option.Some.class) {
          param04 = scrut3.value;
          optionalPart = param04;
          if (optional === true) {
            tmp16 = runtime.safeCall(rr.Optional(optionalPart));
            tmp17 = sequence(tmp16, latterPart);
          } else {
            tmp17 = sequence(optionalPart, latterPart);
          }
        } else if (scrut3 instanceof Option.None.class) {
          tmp17 = latterPart;
        } else {
          throw new globalThis.Error("match error");
        }
        return Option.Some(tmp17)
      } else if (choice instanceof ParseRule.Choice.Ref.class) {
        param02 = choice.kind;
        param11 = choice.process;
        param2 = choice.outerPrec;
        param3 = choice.innerPrec;
        param4 = choice.rest;
        kind = param02;
        outerPrec = param2;
        innerPrec = param3;
        rest = param4;
        tmp18 = "found Choice.Ref to " + kind;
        tmp19 = runtime.safeCall(ParseRuleVisualizer.tracer.print(tmp18));
        scrut2 = runtime.safeCall(ParseRuleVisualizer.#renderedKinds.has(kind));
        if (scrut2 === false) {
          tmp20 = runtime.safeCall(referencedKinds.add(kind));
        } else {
          tmp20 = runtime.Unit;
        }
        tmp21 = "#" + kind;
        tmp22 = LinkOpts1(tmp21);
        tmp23 = rr.NonTerminal(kind, tmp22);
        tmp24 = renderRule(rest, currentRule);
        tmp25 = sequence(tmp23, tmp24);
        return Option.Some(tmp25)
      } else if (choice instanceof ParseRule.Choice.Lazy.class) {
        param0 = choice.get;
        param1 = choice.make;
        get = param0;
        make = param1;
        scrut1 = runtime.safeCall(renderCache.has(make));
        if (scrut1 === true) {
          tmp26 = runtime.safeCall(ParseRuleVisualizer.tracer.print("found Choice.Lazy in cache"));
          tmp27 = runtime.safeCall(renderCache.get(make));
          ruleName1 = tmp27;
          tmp28 = "#" + ruleName1;
          tmp29 = LinkOpts1(tmp28);
          tmp30 = rr.NonTerminal(ruleName1, tmp29);
          return Option.Some(tmp30)
        } else {
          tmp31 = runtime.safeCall(get());
          rule1 = tmp31;
          if (rule1 instanceof RecursiveKnot1.class) {
            param01 = rule1.getName;
            getName = param01;
            tmp32 = runtime.safeCall(getName());
            tmp33 = "found RecursiveKnot of \"" + tmp32;
            tmp34 = tmp33 + "\"";
            tmp35 = runtime.safeCall(ParseRuleVisualizer.tracer.print(tmp34));
            tmp36 = runtime.safeCall(getName());
            tmp37 = runtime.safeCall(getName());
            tmp38 = "#" + tmp37;
            tmp39 = LinkOpts1(tmp38);
            tmp40 = rr.NonTerminal(tmp36, tmp39);
            return Option.Some(tmp40)
          } else {
            tmp41 = runtime.safeCall(ParseRuleVisualizer.tracer.print("found Choice.Lazy not in cache"));
            proxyChoice = null;
            tmp42 = () => {
              let scrut4, param06, rule3;
              scrut4 = ParseRule.Choice.rest(proxyChoice);
              if (scrut4 instanceof Option.Some.class) {
                param06 = scrut4.value;
                rule3 = param06;
                return rule3.name
              } else {
                return "???"
              }
            };
            getProxyChoiceName = tmp42;
            tmp43 = runtime.safeCall(make(() => {
              return RecursiveKnot1(getProxyChoiceName)
            }));
            proxyChoice = tmp43;
            tmp44 = runtime.safeCall(getProxyChoiceName());
            ruleName = tmp44;
            tmp45 = renderCache.set(make, ruleName);
            tmp46 = renderChoice(parentRule, proxyChoice, Option.None);
            tmp47 = diagram(tmp46);
            tmp48 = Predef.tuple(ruleName, tmp47);
            tmp49 = runtime.safeCall(helperRules.push(tmp48));
            tmp50 = "#" + ruleName;
            tmp51 = LinkOpts1(tmp50);
            tmp52 = rr.NonTerminal(ruleName, tmp51);
            return Option.Some(tmp52)
          }
        }
      } else {
        tmp53 = "unexpected choice: " + choice;
        doTemp = runtime.safeCall(globalThis.console.log(tmp53));
        throw new globalThis.Error("match error");
      }
    };
    renderRule = function renderRule(rule1, currentRule) {
      let tmp10, tmp11;
      tmp10 = "renderRule <<< " + rule1.name;
      tmp11 = () => {
        let rest, optional, nodes, param0, param1, head, tail, scrut1, param01, node, choice, scrut2, tmp12, tmp13, tmp14, tmp15, tmp16;
        rest = rule1.choices;
        optional = false;
        nodes = [];
        tmp17: while (true) {
          if (rest instanceof Stack.Cons.class) {
            param0 = rest.head;
            param1 = rest.tail;
            head = param0;
            tail = param1;
            scrut1 = renderChoice(rule1, head, currentRule);
            if (scrut1 instanceof Option.Some.class) {
              param01 = scrut1.value;
              node = param01;
              tmp12 = runtime.safeCall(nodes.push(node));
            } else if (scrut1 instanceof Option.None.class) {
              optional = true;
              tmp12 = runtime.Unit;
            } else {
              tmp12 = runtime.Unit;
            }
            rest = tail;
            tmp13 = runtime.Unit;
            continue tmp17;
          } else {
            tmp13 = runtime.Unit;
          }
          break;
        }
        tmp14 = runtime.safeCall(nodes.length.toString());
        tmp15 = ParseRuleVisualizer.tracer.print("nodes: ", tmp14);
        scrut2 = nodes.length;
        if (scrut2 === 0) {
          return Option.None
        } else {
          choice = rr.Choice(0, ...nodes);
          if (optional === true) {
            tmp16 = runtime.safeCall(rr.Optional(choice));
            return Option.Some(tmp16)
          } else {
            return Option.Some(choice)
          }
        }
      };
      return runtime.safeCall(ParseRuleVisualizer.tracer.trace(tmp10, (result) => {
        return "renderRule >>> "
      }, tmp11))
    };
    helperRules = [];
    tmp = new globalThis.Set();
    referencedKinds = tmp;
    tmp1 = new globalThis.Map();
    renderCache = tmp1;
    tmp2 = renderRule(rule, Option.None);
    tmp3 = diagram(tmp2);
    diagrams = [
      [
        title,
        tmp3
      ]
    ];
    tmp10: while (true) {
      scrut = referencedKinds.size > 0;
      if (scrut === true) {
        currentKinds = referencedKinds;
        tmp4 = runtime.safeCall(ParseRuleVisualizer.#renderedKinds.union(currentKinds));
        ParseRuleVisualizer.#renderedKinds = tmp4;
        tmp5 = new globalThis.Set();
        referencedKinds = tmp5;
        tmp6 = (kind) => {
          let theRule, tmp11, tmp12, tmp13, tmp14;
          tmp11 = runtime.safeCall(Rules.syntaxKinds.get(kind));
          tmp12 = Option.unsafe.get(tmp11);
          theRule = tmp12;
          tmp13 = renderRule(theRule);
          tmp14 = diagram(tmp13);
          return [
            kind,
            tmp14
          ]
        };
        tmp7 = Iter.mapping(currentKinds, tmp6);
        tmp8 = Iter.toArray(tmp7);
        tmp9 = runtime.safeCall(diagrams.push(...tmp8));
        continue tmp10;
      } else {
        tmp9 = runtime.Unit;
      }
      break;
    }
    return diagrams
  }
  static toString() { return "ParseRuleVisualizer"; }
};
let ParseRuleVisualizer = ParseRuleVisualizer1; export default ParseRuleVisualizer;
