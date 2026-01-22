// boolean_solver.js

// -------------------- Tokenizer --------------------
function tokenize(expr) {
  const tokens = [];
  let i = 0;

  while (i < expr.length) {
    const ch = expr[i];

    if (ch === " " || ch === "\t" || ch === "\n") {
      i++;
      continue;
    }

    // Operators + parentheses
    if ("!&|^()".includes(ch)) {
      tokens.push({ type: "OP", value: ch });
      i++;
      continue;
    }

    // Variable names: letters, digits, underscore
    if (/[a-zA-Z_]/.test(ch)) {
      let j = i;
      while (j < expr.length && /[a-zA-Z0-9_]/.test(expr[j])) j++;
      tokens.push({ type: "VAR", value: expr.slice(i, j) });
      i = j;
      continue;
    }

    throw new Error(`Invalid character: '${ch}' at position ${i}`);
  }

  return tokens;
}

// -------------------- Shunting Yard (to RPN) --------------------
const PRECEDENCE = {
  "!": 4,
  "&": 3,
  "^": 2,
  "|": 1,
};

const RIGHT_ASSOC = new Set(["!"]); // NOT is right-associative (unary)

function toRPN(tokens) {
  const output = [];
  const ops = [];

  for (let k = 0; k < tokens.length; k++) {
    const t = tokens[k];

    if (t.type === "VAR") {
      output.push(t);
      continue;
    }

    if (t.type === "OP") {
      const op = t.value;

      if (op === "(") {
        ops.push(t);
        continue;
      }

      if (op === ")") {
        while (ops.length && ops[ops.length - 1].value !== "(") {
          output.push(ops.pop());
        }
        if (!ops.length) throw new Error("Mismatched parentheses");
        ops.pop(); // remove "("
        continue;
      }

      // operator: ! & ^ |
      while (
        ops.length &&
        ops[ops.length - 1].type === "OP" &&
        ops[ops.length - 1].value !== "("
      ) {
        const top = ops[ops.length - 1].value;

        const cond =
          (!RIGHT_ASSOC.has(op) && PRECEDENCE[top] >= PRECEDENCE[op]) ||
          (RIGHT_ASSOC.has(op) && PRECEDENCE[top] > PRECEDENCE[op]);

        if (!cond) break;
        output.push(ops.pop());
      }

      ops.push(t);
      continue;
    }
  }

  while (ops.length) {
    const t = ops.pop();
    if (t.value === "(" || t.value === ")") throw new Error("Mismatched parentheses");
    output.push(t);
  }

  return output;
}

// -------------------- RPN -> AST --------------------
class Node {
  constructor(type, value = null, left = null, right = null) {
    this.type = type;   // "VAR" or "OP"
    this.value = value; // variable name or operator
    this.left = left;
    this.right = right;
  }
}

function rpnToAST(rpn) {
  const st = [];

  for (const t of rpn) {
    if (t.type === "VAR") {
      st.push(new Node("VAR", t.value));
      continue;
    }

    // operator
    const op = t.value;

    if (op === "!") {
      if (st.length < 1) throw new Error("Invalid expression: missing operand for '!'");
      const a = st.pop();
      st.push(new Node("OP", "!", a, null));
    } else {
      if (st.length < 2) throw new Error(`Invalid expression: missing operands for '${op}'`);
      const b = st.pop();
      const a = st.pop();
      st.push(new Node("OP", op, a, b));
    }
  }

  if (st.length !== 1) throw new Error("Invalid expression");
  return st[0];
}

// -------------------- Evaluate AST --------------------
function evalAST(node, env) {
  if (node.type === "VAR") {
    if (!(node.value in env)) {
      throw new Error(`Missing value for variable '${node.value}'`);
    }
    return !!env[node.value];
  }

  const op = node.value;

  if (op === "!") return !evalAST(node.left, env);

  const a = evalAST(node.left, env);
  const b = evalAST(node.right, env);

  if (op === "&") return a && b;
  if (op === "|") return a || b;
  if (op === "^") return a !== b;

  throw new Error(`Unknown operator '${op}'`);
}

// -------------------- Collect Variables --------------------
function collectVars(node, set = new Set()) {
  if (node.type === "VAR") {
    set.add(node.value);
    return set;
  }
  if (node.left) collectVars(node.left, set);
  if (node.right) collectVars(node.right, set);
  return set;
}

// -------------------- Truth Table Generator --------------------
export function truthTable(expr) {
  const tokens = tokenize(expr);
  const rpn = toRPN(tokens);
  const ast = rpnToAST(rpn);

  const vars = Array.from(collectVars(ast)).sort();
  const n = vars.length;

  const rows = [];

  for (let mask = 0; mask < (1 << n); mask++) {
    const env = {};
    for (let i = 0; i < n; i++) {
      env[vars[i]] = !!(mask & (1 << (n - 1 - i)));
    }
    const result = evalAST(ast, env);
    rows.push({ ...env, result });
  }

  return { vars, rows };
}

// -------------------- Demo --------------------
function printTruthTable(expr) {
  const { vars, rows } = truthTable(expr);

  const header = [...vars, "RESULT"];
  console.log(header.join("\t"));

  for (const row of rows) {
    const line = vars.map(v => (row[v] ? 1 : 0));
    line.push(row.result ? 1 : 0);
    console.log(line.join("\t"));
  }
}

// Example usage:
const expr = "!(A & B) | C";
printTruthTable(expr);