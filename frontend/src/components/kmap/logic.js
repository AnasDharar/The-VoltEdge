// src/tools/kmap/solver.js

// K-map index layout for 4 variables (rows=AB, cols=CD) in Gray order
const KMAP4 = [
  [0, 1, 3, 2],
  [4, 5, 7, 6],
  [12, 13, 15, 14],
  [8, 9, 11, 10],
];

const VARS = ["A", "B", "C", "D"];

/**
 * grid: length 16 array with values: 0 | 1 | 'X'
 * returns:
 * {
 *   groups: number[][],   // each group is list of minterm indices
 *   expression: string    // simplified SOP
 * }
 */
export function solveKMap4(grid) {
  if (!Array.isArray(grid) || grid.length !== 16) {
    throw new Error("solveKMap4: grid must be an array of length 16");
  }

  // 1) collect all 1-minterms
  const ones = [];
  for (let i = 0; i < 16; i++) {
    if (grid[i] === 1) ones.push(i);
  }

  // edge cases
  if (ones.length === 0) {
    return { groups: [], expression: "0" };
  }

  // if everything is 1 (ignoring X), answer is 1
  if (ones.length === 16) {
    return { groups: [Array.from({ length: 16 }, (_, i) => i)], expression: "1" };
  }

  // 2) generate all valid groups
  const allGroups = generateAllValidGroups4(grid);

  // 3) build coverage map: minterm -> groups covering it
  const coverMap = new Map(); // m -> groupIndices[]
  for (const m of ones) coverMap.set(m, []);

  for (let gi = 0; gi < allGroups.length; gi++) {
    const g = allGroups[gi];
    for (const m of g) {
      if (coverMap.has(m)) coverMap.get(m).push(gi);
    }
  }

  // 4) find essential prime implicants (EPIs)
  const chosen = [];
  const chosenSet = new Set(); // group signature string
  const covered = new Set();   // minterms covered by chosen groups

  for (const m of ones) {
    const list = coverMap.get(m) || [];
    if (list.length === 1) {
      const essentialGroup = allGroups[list[0]];
      const sig = signature(essentialGroup);
      if (!chosenSet.has(sig)) {
        chosen.push(essentialGroup);
        chosenSet.add(sig);
      }
    }
  }

  // mark covered by EPIs
  for (const g of chosen) {
    for (const m of g) {
      if (grid[m] === 1) covered.add(m);
    }
  }

  // 5) greedy cover remaining minterms
  let remaining = ones.filter((m) => !covered.has(m));

  while (remaining.length > 0) {
    let bestGroup = null;
    let bestScore = -1;

    for (const g of allGroups) {
      // score = how many uncovered 1-minterms it covers
      let score = 0;
      for (const m of g) {
        if (grid[m] === 1 && remaining.includes(m)) score++;
      }

      if (score === 0) continue;

      // tie-breakers:
      // 1) higher score
      // 2) larger group size (prefer bigger groups)
      // 3) fewer literals (optional: derived from group size, bigger => fewer literals)
      if (
        score > bestScore ||
        (score === bestScore && bestGroup && g.length > bestGroup.length)
      ) {
        bestScore = score;
        bestGroup = g;
      }
    }

    if (!bestGroup) {
      // should not happen, but safety
      break;
    }

    const sig = signature(bestGroup);
    if (!chosenSet.has(sig)) {
      chosen.push(bestGroup);
      chosenSet.add(sig);
    }

    // update covered
    for (const m of bestGroup) {
      if (grid[m] === 1) covered.add(m);
    }

    remaining = ones.filter((m) => !covered.has(m));
  }

  // 6) convert chosen groups to SOP expression
  const terms = chosen.map(groupToSOPTerm4);

  // if any term becomes "1" => whole expression is 1
  if (terms.includes("1")) {
    return { groups: chosen, expression: "1" };
  }

  // remove duplicate terms (rare but possible)
  const uniqueTerms = Array.from(new Set(terms));

  const expression = uniqueTerms.join(" + ");

  return { groups: chosen, expression };
}

/* -------------------- helpers -------------------- */

function generateAllValidGroups4(grid) {
  const sizes = [
    [1, 1],
    [1, 2],
    [2, 1],
    [1, 4],
    [4, 1],
    [2, 2],
    [2, 4],
    [4, 2],
    [4, 4],
  ];

  const groups = [];
  const seen = new Set();

  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      for (const [h, w] of sizes) {
        const cells = [];

        for (let i = 0; i < h; i++) {
          for (let j = 0; j < w; j++) {
            const rr = (r + i) % 4;
            const cc = (c + j) % 4;
            const idx = KMAP4[rr][cc]; // minterm index
            cells.push(idx);
          }
        }

        // dedupe inside group (wrap-around might repeat in weird cases)
        const unique = Array.from(new Set(cells)).sort((a, b) => a - b);

        if (!isValidGroup(grid, unique)) continue;

        const sig = signature(unique);
        if (seen.has(sig)) continue;
        seen.add(sig);

        groups.push(unique);
      }
    }
  }

  // Sort groups: larger first (helps selection + EPI behavior)
  groups.sort((a, b) => b.length - a.length);

  return groups;
}

function isValidGroup(grid, group) {
  // all must be 1 or X, and at least one must be 1
  let hasOne = false;
  for (const idx of group) {
    const v = grid[idx];
    if (v !== 1 && v !== "X") return false;
    if (v === 1) hasOne = true;
  }
  return hasOne;
}

function signature(group) {
  // group is sorted
  return group.join("-");
}

function groupToSOPTerm4(group) {
  // Convert each minterm index into ABCD bits
  // A = bit3, B = bit2, C = bit1, D = bit0
  const bits = group.map((m) => [
    (m >> 3) & 1,
    (m >> 2) & 1,
    (m >> 1) & 1,
    m & 1,
  ]);

  // check each variable if constant across all minterms in group
  const termParts = [];

  for (let varIdx = 0; varIdx < 4; varIdx++) {
    const first = bits[0][varIdx];
    let constant = true;

    for (let k = 1; k < bits.length; k++) {
      if (bits[k][varIdx] !== first) {
        constant = false;
        break;
      }
    }

    if (!constant) continue;

    if (first === 1) termParts.push(VARS[varIdx]);
    else termParts.push(VARS[varIdx] + "'");
  }

  // if no variable is constant => term is 1
  if (termParts.length === 0) return "1";

  return termParts.join("");
}