export interface ICatalog {
  name: string,
  description: string,
  url: string,
  cost1: number,
  cost2: number,
  cost3: number,
  req1?: number,
  req2?: number,
  req3?: number,
  category: number,
};

export interface ICatalogEntity extends ICatalog {
  id: number;
}