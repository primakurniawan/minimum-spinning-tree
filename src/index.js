import { dom } from "./GraphView";
import { addEdge, runMST, resetGraph } from "./GraphModel";

dom().addEdge.addEventListener("submit", (e) => {
  e.preventDefault();
  const src = dom().src.value;
  const target = dom().target.value;
  const weight = dom().weight.value;
  if (src !== "" && target !== "" && parseInt(weight) > 0)
    addEdge(src, target, parseInt(weight));
  dom().src.value = "";
  dom().target.value = "";
  dom().weight.value = "";
  dom().src.focus();
});

dom().runMST.addEventListener("click", (e) => {
  runMST();
});

dom().Top.addEventListener("click", (e) => {
  if (e.target == dom().reset) {
    const del = confirm("Are You Sure");
    if (del) {
      resetGraph();
      location.reload();
    }
  }
});
