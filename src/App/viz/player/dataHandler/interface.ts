type MyObject = { [prop: string]: any };

export interface DataHandler {
  reset: (n: number) => void,
  data: { nodes: MyObject[], links: MyObject[] }
}