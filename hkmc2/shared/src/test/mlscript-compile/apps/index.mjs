import Parser from "./Parser.mjs";
import Lexer from "./Lexer.mjs";
import Iter from "../Iter.mjs"
import Predef from "../Predef.mjs";
import TreeHelpers from "./parsing/TreeHelpers.mjs";
import ParseRuleVisualizer from "./parsing/ParseRuleVisualizer.mjs";
import Rules from "./parsing/Rules.mjs";

globalThis.Predef = Predef;

const editor = document.getElementById("editor");
editor.value = `let spaces n = make_string n " ";;
let disk size =
    let right_half = make_string size ">"
    and left_half = make_string size "<"
    in left_half ^ "|" ^ right_half;;
let disk_number n largest_disk_size =
    let white_part = spaces (largest_disk_size + 1 - n) in
    white_part ^ (disk n) ^ white_part;;
let peg_base largest_disk_size =
    let half = make_string largest_disk_size "_" in
    " " ^ half ^ "|" ^ half ^ " ";;
let rec peg largest_disk_size = function
  | (0, []) -> []
  | (0, head::rest) ->
      disk_number head largest_disk_size ::
      peg largest_disk_size (0, rest)
  | (offset, lst) ->
      disk_number 0 largest_disk_size ::
      peg largest_disk_size (offset-1, lst);;
let rec join_lines l1 l2 l3 =
  match (l1, l2, l3) with
  | ([], [], []) -> []
  | (t1::r1, t2::r2, t3::r3) -> (t1 ^ t2 ^ t3) :: join_lines r1 r2 r3
  | _ -> failwith "join_lines";;`
editor.addEventListener("keydown", function (event) {
  if (event.key === "Tab") {
    event.preventDefault();
    let start = this.selectionStart;
    let end = this.selectionEnd;
    this.value = this.value.substring(0, start) + "  " + this.value.substring(end);
    this.selectionStart = this.selectionEnd = start + 2;
  }
});

const parseButton = document.getElementById("parse");

const outputPanel = document.getElementById("output");

parseButton.addEventListener("click", () => {
  const source = editor.value;
  const tokens = Lexer.lex(source, true);
  const trees = Parser.parse(tokens);
  outputPanel.innerHTML = "";
  for (const tree of Iter.fromStack(trees)) {
    const collapsibleTree = document.createElement('collapsible-tree');
    collapsibleTree.textContent = TreeHelpers.showAsTree(tree);
    outputPanel.appendChild(collapsibleTree);
  }
});

function parseIndentedText(text) {
  const lines = text
    .split('\n')
    .map(line => line.replace(/\r$/, ''))
    .filter(line => line.trim().length > 0);
  const root = { text: '', children: [] };
  const stack = [{ node: root, indent: -1 }];
  for (let line of lines) {
    const indent = line.match(/^(\s*)/)[1].length;
    const text = line.trim();
    while (indent <= stack[stack.length - 1].indent) stack.pop();
    const newNode = { text, children: [] };
    stack[stack.length - 1].node.children.push(newNode);
    stack.push({ node: newNode, indent });
  }
  return root.children;
}

function createDetailsTree(nodes) {
  const fragment = document.createDocumentFragment();
  for (const node of nodes) {
    const details = document.createElement('details');
    details.setAttribute('open', '');
    const summary = document.createElement('summary');
    summary.textContent = node.text;
    details.appendChild(summary);
    if (node.children && node.children.length > 0) {
      details.appendChild(createDetailsTree(node.children));
    } else {
      details.setAttribute("leaf", "");
    }
    fragment.appendChild(details);
    const rule = document.createElement("div");
    rule.classList.add("rule");
    fragment.appendChild(rule);
  }
  return fragment;
}

class CollapsibleTree extends HTMLElement {
  connectedCallback() {
    const rawText = this.textContent;
    this.textContent = '';
    const treeData = parseIndentedText(rawText);
    const treeDom = createDetailsTree(treeData);
    this.appendChild(treeDom);
  }
}

if (!customElements.get('collapsible-tree')) {
  customElements.define('collapsible-tree', CollapsibleTree);
}

import('./parsing/vendors/railroad/railroad.mjs').then(({ default: rr }) => {
  globalThis.rr = rr;
  ParseRuleVisualizer.reset();
  const sections = [];
  function addElements(entries) {
    const figures = entries.map(([name, svg]) => `<figure><figcaption id="${name}">${name}</figcaption>${svg}</figure>`);
    sections.push("<section>" + figures.join('') + "</section>");
  }
  sections.push(`<h3>Term</h3>`);
  addElements(ParseRuleVisualizer.render(rr, "term", Rules.termRule));
  sections.push(`<h3>Type</h3>`);
  addElements(ParseRuleVisualizer.render(rr, "type", Rules.typeRule));
  sections.push(`<h3>Definition</h3>`);
  addElements(ParseRuleVisualizer.render(rr, "definition", Rules.declRule));
  document.querySelector("#syntax-diagrams > main").innerHTML = sections.join('');
})
