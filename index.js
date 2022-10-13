const knightOffset = [
  [1, 2],
  [1, -2],
  [2, 1],
  [2, -1],
  [-1, 2],
  [-1, -2],
  [-2, 1],
  [-2, -1],
];
let path = [];

function printPath() {
  return path;
}

function board() {
  let arr = new Array();

  for (let i = 0; i < 8; i++) {
    let innerArr = new Array();
    for (j = 0; j < 8; j++) {
      innerArr = [...innerArr, [i, j]];
    }
    arr = [...arr, innerArr];
  }
  return arr;
}

function buildGraph() {
  let ourBoard = board();
  let graph = {};

  for (let i of ourBoard) {
    for (let cordinates of i) {
      if (!graph[JSON.stringify(cordinates)]) {
        graph[JSON.stringify(cordinates)] = [];
      }

      let possibleMoves = findKnightsPossibleMoves(cordinates);
      possibleMoves.forEach((move) => {
        graph[JSON.stringify(cordinates)].push(move);
      });
    }
  }

  return graph;
}

function findKnightsPossibleMoves(location) {
  let posibleMoves = [];
  let [xl, yl] = location;
  for (let [x, y] of knightOffset) {
    rowPlus = xl + x;
    colPlus = yl + y;
    if (rowPlus < 8 && rowPlus >= 0 && colPlus < 8 && colPlus >= 0) {
      posibleMoves.push([xl + x, yl + y]);
    }
  }
  return posibleMoves.map((i) => JSON.stringify(i));
}

function knigtMoves(start, finish) {
  let graph = buildGraph();
  let visited = new Set();
  start = JSON.stringify(start);
  finish = JSON.stringify(finish);
  let queue = [start];
  path.unshift(start);

  while (queue.length > 0) {
    let current = queue.shift();

    let last = path[path.length - 1];

    if (last === finish) {
      return printPath();
    }

    if (!visited.has(current)) {
      visited.add(current);
      for (let i of graph[current]) {
        if (!visited.has(i)) {
          queue.push(i);
          path.push(i);
        }
      }
    }
  }

  return "not found";
}

console.log(knigtMoves([4, 5], [4, 3]));
