import { TreeNodeData } from '../src/App/viz/player/dataHandler/force-directed-tree/treenodedata';
import { LeafNodeData } from '../src/App/viz/player/dataHandler/force-directed-tree/leafnodedata';

describe('generate daea', () => {
  test('test force-directed-tree data', () => {
    const n = 100;
    const data = new TreeNodeData(n, 4);
    const fn = (node: TreeNodeData | LeafNodeData):number => {
      return 1 + (node instanceof TreeNodeData
        ? node.children.map(child => fn(child)).reduce((pre, curr) => pre + curr, 0)
        : 0);
    }
    expect(fn(data)).toBe(n);
  })
})