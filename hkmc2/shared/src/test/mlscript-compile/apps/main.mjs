import runtime from "./../Runtime.mjs";
import Parser from "./Parser.mjs";
import Lexer from "./Lexer.mjs";
import Iter from "./../Iter.mjs";
import XML from "./../XML.mjs";
import Option from "./../Option.mjs";
import Runtime from "./../Runtime.mjs";
import Predef from "./../Predef.mjs";
import TreeHelpers from "./parsing/TreeHelpers.mjs";
import Extension from "./parsing/Extension.mjs";
import ParseRuleVisualizer from "./parsing/ParseRuleVisualizer.mjs";
import Rules from "./parsing/Rules.mjs";
import railroad from "./parsing/vendors/railroad/railroad.mjs";
let Main1;
(class Main {
  static #query;
  static #editor;
  static #selector;
  static #parseButton;
  static #outputPanel;
  static #indentRegex;
  static #errorDisplayStyle;
  static {
    Main1 = Main;
    let tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, lambda, lambda1, lambda2;
    globalThis.Predef = Predef;
    tmp = runtime.safeCall(globalThis.document.querySelector.bind(globalThis.document));
    Main.#query = tmp;
    tmp1 = runtime.safeCall(Main.#query("#editor"));
    Main.#editor = tmp1;
    tmp2 = runtime.safeCall(Main.#query("select#example"));
    Main.#selector = tmp2;
    tmp3 = runtime.safeCall(Main.#query("button#parse"));
    Main.#parseButton = tmp3;
    tmp4 = runtime.safeCall(Main.#query("#output"));
    Main.#outputPanel = tmp4;
    tmp5 = Main.showExample1();
    lambda = (undefined, function (event) {
      let scrut, start, end, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20;
      scrut = event.key;
      if (scrut === "Tab") {
        tmp15 = runtime.safeCall(event.preventDefault());
        start = Main.#editor.selectionStart;
        end = Main.#editor.selectionEnd;
        tmp16 = Main.#editor.value.substring(0, start);
        tmp17 = tmp16 + "  ";
        tmp18 = runtime.safeCall(Main.#editor.value.substring(end));
        tmp19 = tmp17 + tmp18;
        Main.#editor.value = tmp19;
        tmp20 = start + 2;
        Main.#editor.selectionEnd = tmp20;
        Main.#editor.selectionStart = Main.#editor.selectionEnd;
        return runtime.Unit
      } else {
        return runtime.Unit
      }
    });
    tmp6 = lambda;
    tmp7 = Main.#editor.addEventListener("keydown", tmp6);
    lambda1 = (undefined, function (event) {
      let scrut;
      scrut = Main.#selector.value;
      if (scrut === "example-1") {
        return Main.showExample1()
      } else if (scrut === "example-2") {
        return Main.showExample2()
      } else {
        return runtime.Unit
      }
    });
    tmp8 = lambda1;
    tmp9 = Main.#selector.addEventListener("change", tmp8);
    lambda2 = (undefined, function (event) {
      let tokens, tmp15, tmp16, tmp17, lambda3, lambda4;
      tmp15 = Lexer.lex(Main.#editor.value, {
      "noWhitespace": true
      });
      tokens = tmp15;
      Main.#outputPanel.innerHTML = "";
      lambda3 = (undefined, function () {
        let trees, tmp18, tmp19, tmp20, lambda5;
        tmp18 = Parser.parse(tokens);
        trees = tmp18;
        tmp19 = Iter.fromStack(trees);
        lambda5 = (undefined, function (tree) {
          let collapsibleTree, scrut, tmp21, tmp22;
          scrut = Extension.isDiagramDirective(tree);
          if (scrut === true) {
            return Main.displayRules()
          } else {
            tmp21 = runtime.safeCall(globalThis.document.createElement("collapsible-tree"));
            collapsibleTree = tmp21;
            tmp22 = TreeHelpers.showAsTree(tree);
            collapsibleTree.textContent = tmp22;
            return runtime.safeCall(Main.#outputPanel.appendChild(collapsibleTree))
          }
        });
        tmp20 = lambda5;
        return Iter.each(tmp19, tmp20)
      });
      tmp16 = lambda3;
      lambda4 = (undefined, function (error) {
        let errorDisplay, tmp18, tmp19;
        tmp18 = runtime.safeCall(globalThis.document.createElement("error-display"));
        errorDisplay = tmp18;
        tmp19 = runtime.safeCall(errorDisplay.setError(error));
        return runtime.safeCall(Main.#outputPanel.appendChild(errorDisplay))
      });
      tmp17 = lambda4;
      return Runtime.try_catch(tmp16, tmp17)
    });
    tmp10 = lambda2;
    tmp11 = Main.#parseButton.addEventListener("click", tmp10);
    tmp12 = new globalThis.RegExp("^(\\s*)");
    Main.#indentRegex = tmp12;
    Main.#errorDisplayStyle = "\n.error-container {\n  background-color: #fdd;\n  padding: 0.375rem 0.75rem 0.5rem;\n  font-family: var(--monospace);\n  color: #991b1bff;\n  display: flex;\n  flex-direction: column;\n  gap: 0.25rem;\n}\n\n.error-message {\n  margin: 0;\n  font-weight: bold;\n  font-size: 1.125rem;\n}\n\n.stack-trace {\n  font-size: 0.875rem;\n  margin: 0;\n  list-style-type: none;\n  padding-left: 0.5rem;\n}";
    this.CollapsibleTree = class CollapsibleTree extends globalThis.HTMLElement {
      constructor() {
        super();
      }
      connectedCallback() {
        let rawText, treeData, treeElement, tmp15, tmp16;
        rawText = this.textContent;
        this.textContent = "";
        tmp15 = Main.parseIndentedText(rawText);
        treeData = tmp15;
        tmp16 = this.createDetailsTree(treeData);
        treeElement = tmp16;
        return runtime.safeCall(this.appendChild(treeElement))
      } 
      createDetailsTree(nodes) {
        let fragment, tmp15, tmp16, tmp17, lambda3;
        tmp15 = runtime.safeCall(globalThis.document.createDocumentFragment());
        fragment = tmp15;
        const this$CollapsibleTree = this;
        lambda3 = (undefined, function (node) {
          let details, summary, scrut, rule, tmp18, tmp19, tmp20, tmp21, tmp22, tmp23, tmp24, tmp25, tmp26;
          tmp18 = runtime.safeCall(globalThis.document.createElement("details"));
          details = tmp18;
          tmp19 = details.setAttribute("open", "");
          tmp20 = runtime.safeCall(globalThis.document.createElement("summary"));
          summary = tmp20;
          summary.textContent = node.text;
          tmp21 = runtime.safeCall(details.appendChild(summary));
          scrut = node.children.length > 0;
          if (scrut === true) {
            tmp22 = this$CollapsibleTree.createDetailsTree(node.children);
            tmp23 = runtime.safeCall(details.appendChild(tmp22));
          } else {
            tmp23 = details.setAttribute("leaf", "");
          }
          tmp24 = runtime.safeCall(fragment.appendChild(details));
          tmp25 = runtime.safeCall(globalThis.document.createElement("rule"));
          rule = tmp25;
          tmp26 = runtime.safeCall(rule.classList.add("rule"));
          return runtime.safeCall(fragment.appendChild(rule))
        });
        tmp16 = lambda3;
        tmp17 = Iter.each(nodes, tmp16);
        return fragment
      }
      toString() { return "CollapsibleTree"; }
    };
    tmp13 = globalThis.customElements.define("collapsible-tree", Main.CollapsibleTree);
    this.ErrorDisplay = class ErrorDisplay extends globalThis.HTMLElement {
      #_error;
      constructor() {
        super();
        let tmp15;
        tmp15 = runtime.safeCall(this.attachShadow({
        "mode": "open"
        }));
        this.#_error = Option.None;
      }
      connectedCallback() {
        return runtime.safeCall(this.render())
      } 
      setError(value) {
        let tmp15;
        tmp15 = Option.Some(value);
        this.#_error = tmp15;
        return runtime.safeCall(this.render())
      } 
      render() {
        let scrut, param0, error, stackLines, scrut1, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20, tmp21, tmp22, tmp23, tmp24, tmp25, tmp26, tmp27, tmp28, tmp29, lambda3;
        scrut = this.#_error;
        if (scrut instanceof Option.Some.class) {
          param0 = scrut.value;
          error = param0;
          tmp15 = runtime.safeCall(error.stack.split("\n"));
          stackLines = tmp15;
          scrut1 = runtime.safeCall(stackLines[0].startsWith(error.name));
          if (scrut1 === true) {
            tmp16 = runtime.safeCall(stackLines.shift());
          } else {
            tmp16 = runtime.Unit;
          }
          tmp17 = XML.elem("div", {
          "class": "error-container"
          });
          tmp18 = XML.elem("h3", {
          "class": "error-message"
          });
          tmp19 = error.name + ": ";
          tmp20 = tmp19 + error.message;
          tmp21 = runtime.safeCall(tmp18(tmp20));
          tmp22 = XML.elem("ul", {
          "class": "stack-trace"
          });
          lambda3 = (undefined, function (line) {
            let tmp30, tmp31;
            tmp30 = XML.elem("li");
            tmp31 = runtime.safeCall(line.trim());
            return runtime.safeCall(tmp30(tmp31))
          });
          tmp23 = lambda3;
          tmp24 = Iter.mapping(stackLines, tmp23);
          tmp25 = Iter.joined(tmp24, "");
          tmp26 = runtime.safeCall(tmp22(tmp25));
          tmp27 = XML.elem("style");
          tmp28 = runtime.safeCall(tmp27(Main.#errorDisplayStyle));
          tmp29 = runtime.safeCall(tmp17(tmp21, tmp26, tmp28));
          this.shadowRoot.innerHTML = tmp29;
          return runtime.Unit
        } else {
          return runtime.Unit
        }
      }
      toString() { return "ErrorDisplay"; }
    };
    tmp14 = globalThis.customElements.define("error-display", Main.ErrorDisplay);
    Main.displayRules()
  }
  static showExample1() {
    Main.#editor.value = "let spaces n = make_string n \" \";;\nlet disk size =\n    let right_half = make_string size \">\"\n    and left_half = make_string size \"<\"\n    in left_half ^ \"|\" ^ right_half;;\nlet disk_number n largest_disk_size =\n    let white_part = spaces (largest_disk_size + 1 - n) in\n    white_part ^ (disk n) ^ white_part;;\nlet peg_base largest_disk_size =\n    let half = make_string largest_disk_size \"_\" in\n    \" \" ^ half ^ \"|\" ^ half ^ \" \";;\nlet rec peg largest_disk_size = function\n  | (0, []) -> []\n  | (0, head::rest) ->\n      disk_number head largest_disk_size ::\n      peg largest_disk_size (0, rest)\n  | (offset, lst) ->\n      disk_number 0 largest_disk_size ::\n      peg largest_disk_size (offset-1, lst);;\nlet rec join_lines l1 l2 l3 =\n  match (l1, l2, l3) with\n  | ([], [], []) -> []\n  | (t1::r1, t2::r2, t3::r3) -> (t1 ^ t2 ^ t3) :: join_lines r1 r2 r3\n  | _ -> failwith \"join_lines\";;\n";
    return runtime.Unit
  } 
  static showExample2() {
    Main.#editor.value = "#newKeyword (\"hello\", Some 3, Some 3)\n#newKeyword (\"goodbye\", None, None)\n  \n#newCategory(\"greeting\")\n  \n#extendCategory(\"greeting\", [ keyword(\"hello\"), \"term\", \"greeting\" ], foo)\n#extendCategory(\"greeting\", [ keyword(\"goodbye\") ], bar)\n  \n#extendCategory(\"decl\", [ \"greeting\" ], baz)\n  \n  \nhello \"Rob\" hello \"Bob\" goodbye\n  \n#diagram \"\"\n";
    return runtime.Unit
  } 
  static parseIndentedText(text) {
    let root, text1, children, stack, node, indent, tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, lambda, lambda1;
    tmp = globalThis.console.log("parseIndentedText", text);
    text1 = "";
    children = [];
    root = {
    "text": text1, "children": children
    };
    node = root;
    tmp1 = - 1;
    indent = tmp1;
    stack = [
      {
      "node": node, "indent": indent
      }
    ];
    tmp2 = runtime.safeCall(text.split("\n"));
    lambda = (undefined, function (line) {
      let tmp7;
      tmp7 = runtime.safeCall(line.trim());
      return tmp7.length > 0
    });
    tmp3 = Iter.filtering(tmp2, lambda);
    lambda1 = (undefined, function (line) {
      let indent1, text2, scrut, newNode, text3, children1, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13;
      tmp7 = globalThis.console.log("parseIndentedText (line)", line);
      tmp8 = runtime.safeCall(line.match(Main.#indentRegex));
      indent1 = tmp8[1].length;
      tmp9 = runtime.safeCall(line.substring(indent1));
      text2 = tmp9;
      tmp14: while (true) {
        tmp10 = stack.length - 1;
        scrut = indent1 <= stack[tmp10].indent;
        if (scrut === true) {
          tmp11 = runtime.safeCall(stack.pop());
          continue tmp14;
        } else {
          tmp11 = runtime.Unit;
        }
        break;
      }
      text3 = text2;
      children1 = [];
      newNode = {
      "text": text3, "children": children1
      };
      tmp12 = stack.length - 1;
      tmp13 = runtime.safeCall(stack[tmp12].node.children.push(newNode));
      return runtime.safeCall(stack.push({
      "node": newNode, "indent": indent1
      }))
    });
    tmp4 = lambda1;
    tmp5 = Iter.each(tmp3, tmp4);
    tmp6 = runtime.safeCall(globalThis.console.log(root));
    return root.children
  } 
  static makeFigures(entries) {
    let tmp, tmp1, lambda;
    lambda = (undefined, function (caseScrut) {
      let first1, first0, name, svg, tmp2, tmp3, tmp4;
      if (globalThis.Array.isArray(caseScrut) && caseScrut.length === 2) {
        first0 = caseScrut[0];
        first1 = caseScrut[1];
        name = first0;
        svg = first1;
        tmp2 = XML.elem("figure");
        tmp3 = XML.elem("figcaption");
        tmp4 = runtime.safeCall(tmp3(name));
        return runtime.safeCall(tmp2(tmp4, svg))
      } else {
        throw new globalThis.Error("match error");
      }
    });
    tmp = lambda;
    tmp1 = Iter.mapping(entries, tmp);
    return Iter.joined(tmp1, "")
  } 
  static displayRules() {
    let tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20, lambda, lambda1;
    tmp = ParseRuleVisualizer.reset();
    tmp1 = runtime.safeCall(Main.#query("#syntax-diagrams>main"));
    tmp2 = XML.elem("h3");
    tmp3 = runtime.safeCall(tmp2("Term"));
    tmp4 = ParseRuleVisualizer.render(railroad, "term", Rules.termRule);
    tmp5 = Main.makeFigures(tmp4);
    tmp6 = XML.elem("h3");
    tmp7 = runtime.safeCall(tmp6("Type"));
    tmp8 = ParseRuleVisualizer.render(railroad, "term", Rules.typeRule);
    tmp9 = Main.makeFigures(tmp8);
    tmp10 = XML.elem("h3");
    tmp11 = runtime.safeCall(tmp10("Definition"));
    tmp12 = ParseRuleVisualizer.render(railroad, "term", Rules.declRule);
    tmp13 = Main.makeFigures(tmp12);
    tmp14 = XML.elem("h3");
    tmp15 = runtime.safeCall(tmp14("Extension"));
    lambda = (undefined, function (kindName) {
      let tmp21, tmp22;
      tmp21 = Rules.getRuleByKind(kindName);
      tmp22 = ParseRuleVisualizer.render(railroad, kindName, tmp21);
      return Main.makeFigures(tmp22)
    });
    tmp16 = lambda;
    tmp17 = Iter.mapping(Rules.extendedKinds, tmp16);
    tmp18 = Iter.joined(tmp17, "");
    tmp19 = Predef.tuple(tmp3, tmp5, tmp7, tmp9, tmp11, tmp13, tmp15, tmp18);
    lambda1 = (undefined, function (_) {
      return Iter.joined(_, "")
    });
    tmp20 = Predef.pipeFrom(lambda1, tmp19);
    tmp1.innerHTML = tmp20;
    return runtime.Unit
  }
  static toString() { return "Main"; }
});