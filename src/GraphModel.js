const Graph = require("graphology");
const GlobalGraph = new Graph();
const { undirectedSingleSourceLength } = require("graphology-shortest-path");

export function addEdge(src, target, weight) {
  GlobalGraph.mergeUndirectedEdge(src, target, { weight: weight });
  localStorage.setItem("globalGraph", JSON.stringify(showGraph(GlobalGraph)));
  console.log("edges is added");
}

// addEdge("a", "f", 9);
// addEdge("b", "c", 8);
// addEdge("a", "c", 7);
// addEdge("b", "e", 7);
// addEdge("c", "e", 6);
// addEdge("b", "f", 5);
// addEdge("a", "e", 4);
// addEdge("d", "f", 4);
// addEdge("b", "d", 3);

function showNodes(graph) {
  return graph.nodes();
}

function showEdges(graph) {
  const arrayEdges = [];
  graph.forEachUndirectedEdge((key, attributes, src, target) =>
    arrayEdges.push({ src, target, weight: attributes.weight })
  );
  arrayEdges.sort((a, b) => b.weight - a.weight);

  return arrayEdges;
}

function showGraph(graph) {
  return { nodes: showNodes(graph), edges: showEdges(graph) };
}

export function runMST() {
  const tempGraph = Object.create(GlobalGraph);

  const mstGraph = [];
  showEdges(GlobalGraph).forEach(({ src, target, weight }) => {
    tempGraph.dropEdge(src, target);

    let connect = false;
    for (let node of showNodes(GlobalGraph)) {
      const paths = undirectedSingleSourceLength(tempGraph, node);

      if (Object.keys(paths).length == tempGraph.order) {
        connect = true;
      } else {
        connect = false;
        break;
      }
    }
    mstGraph.push({
      edge: { src, target, weight },
      graph: showGraph(tempGraph),
      connect,
    });
    if (!connect) tempGraph.mergeUndirectedEdge(src, target, { weight });
  });
  console.log("MST is running");
  localStorage.setItem("mstGraph", JSON.stringify(mstGraph));
  return mstGraph;
}

export function resetGraph() {
  GlobalGraph.clear();
  localStorage.removeItem("globalGraph");
  localStorage.removeItem("mstGraph");
  return "Graph is reset";
}
