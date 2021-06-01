import { Data as DataFDT } from "../dataHandler/force-directed-tree";
import { Data as DataFDG } from "../dataHandler/force-directed-graph";
import { Data as DataDFDG } from "../dataHandler/disjoint-force-directed-graph";

// eslint-disable-next-line no-restricted-globals
const ctx = self as any;

const table: { [prop: string]: any } = {
  'force-directed-tree': DataFDT,
  'force-directed-graph': DataFDG,
  'disjoint-force-directed-graph': DataDFDG,
}

ctx.addEventListener('message', (e: { data: { type: string, count: number } }) => {
  const { type, count } = e.data;
  const Data = table[type];
  const { nodes, links } = new Data(count);
  console.log(nodes,links)
  ctx.postMessage({ nodes, links });
})