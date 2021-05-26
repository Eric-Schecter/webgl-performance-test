type Node = {
  id: string,
  group: number,
}

const randomBetween = (min: number, max: number) => {
  return ~~(Math.random() * (max - min + 1) + min);
}

const randomString = (strLength: number) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const length = chars.length;
  return new Array(strLength).fill(0).map(() => chars[randomBetween(0, length)]).join('');
}

export const dataGenerator = (n: number,g:number) => {
  const nodes = new Array(n).fill(0).map(() => {
    const id = randomString(10);
    const group = randomBetween(1, g);
    return { id, group }
  });
  const geneLink = (node: Node, index: number) => {
    let targetIndex = index;
    while (targetIndex === index) {
      targetIndex = randomBetween(0, n-1);
    }
    return { source: node.id, target: nodes[targetIndex].id, value: randomBetween(1, 10) };
  }
  const links = nodes.map((node, index) =>
    new Array(randomBetween(1,10))
      .fill(0)
      .map(() => geneLink(node, index)))
    .reduce((pre, curr) => pre.concat(curr), [])
  return { nodes, links };
}