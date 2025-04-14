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
let ParseRuleVisualizer1;
(class ParseRuleVisualizer {
  static #defaultKinds;
  static #renderedKinds;
  static {
    ParseRuleVisualizer1 = ParseRuleVisualizer;
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
    let diagram, sequence, renderChoice, renderRule, helperRules, referencedKinds, renderCache, diagrams, scrut, currentKinds, tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, lambda;
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
    renderChoice = function renderChoice(parentRule, choice) {
      let param0, param1, param2, param3, param4, kind, outerPrec, innerPrec, rest, scrut1, param01, param11, param21, param31, rule1, optional, rest1, scrut2, latterPart, param02, optionalPart, param03, param12, keyword, rest2, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20, tmp21, tmp22, tmp23, tmp24;
      if (choice instanceof ParseRule.Choice.End.class) {
        tmp10 = runtime.safeCall(ParseRuleVisualizer.tracer.print("found Choice.End"));
        return Option.None
      } else if (choice instanceof ParseRule.Choice.Keyword.class) {
        param03 = choice.keyword;
        param12 = choice.rest;
        keyword = param03;
        rest2 = param12;
        tmp11 = runtime.safeCall(ParseRuleVisualizer.tracer.print("found Choice.Keyword"));
        tmp12 = runtime.safeCall(rr.Terminal(keyword.name));
        tmp13 = renderRule(rest2);
        tmp14 = sequence(tmp12, tmp13);
        return Option.Some(tmp14)
      } else if (choice instanceof ParseRule.Choice.Siding.class) {
        param01 = choice.init;
        param11 = choice.optional;
        param21 = choice.rest;
        param31 = choice.process;
        rule1 = param01;
        optional = param11;
        rest1 = param21;
        tmp15 = runtime.safeCall(ParseRuleVisualizer.tracer.print("found Choice.Siding"));
        scrut2 = renderRule(rule1);
        latterPart = renderRule(rest1);
        if (scrut2 instanceof Option.Some.class) {
          param02 = scrut2.value;
          optionalPart = param02;
          if (optional === true) {
            tmp16 = runtime.safeCall(rr.Optional(optionalPart));
            tmp17 = sequence(tmp16, latterPart);
          } else {
            tmp17 = sequence(optionalPart, latterPart);
          }
        } else if (scrut2 instanceof Option.None.class) {
          tmp17 = latterPart;
        } else {
          throw new globalThis.Error("match error");
        }
        return Option.Some(tmp17)
      } else if (choice instanceof ParseRule.Choice.Ref.class) {
        param0 = choice.kind;
        param1 = choice.process;
        param2 = choice.outerPrec;
        param3 = choice.innerPrec;
        param4 = choice.rest;
        kind = param0;
        outerPrec = param2;
        innerPrec = param3;
        rest = param4;
        tmp18 = "found Choice.Ref to " + kind;
        tmp19 = runtime.safeCall(ParseRuleVisualizer.tracer.print(tmp18));
        scrut1 = runtime.safeCall(ParseRuleVisualizer.#renderedKinds.has(kind));
        if (scrut1 === false) {
          tmp20 = runtime.safeCall(referencedKinds.add(kind));
        } else {
          tmp20 = runtime.Unit;
        }
        tmp21 = "#" + kind;
        tmp22 = rr.NonTerminal(kind, {
        "href": tmp21
        });
        tmp23 = renderRule(rest);
        tmp24 = sequence(tmp22, tmp23);
        return Option.Some(tmp24)
      } else {
        throw new globalThis.Error("match error");
      }
    };
    renderRule = function renderRule(rule1) {
      let tmp10, tmp11, lambda1, lambda2;
      tmp10 = "renderRule <<< " + rule1.name;
      lambda1 = (undefined, function () {
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
            scrut1 = renderChoice(rule1, head);
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
      });
      tmp11 = lambda1;
      lambda2 = (undefined, function (result) {
        return "renderRule >>> "
      });
      return runtime.safeCall(ParseRuleVisualizer.tracer.trace(tmp10, lambda2, tmp11))
    };
    helperRules = [];
    tmp = new globalThis.Set();
    referencedKinds = tmp;
    tmp1 = new globalThis.Map();
    renderCache = tmp1;
    tmp2 = renderRule(rule);
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
        lambda = (undefined, function (kind) {
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
        });
        tmp6 = lambda;
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
});
let ParseRuleVisualizer = ParseRuleVisualizer1; export default ParseRuleVisualizer;
