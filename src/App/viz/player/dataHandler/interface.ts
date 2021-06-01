type MyObject = { [prop: string]: any };

export interface DataHandler {
  init: (n: number) => void,
  data: { nodes: MyObject[], links: MyObject[] }
}