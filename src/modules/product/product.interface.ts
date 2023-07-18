export interface IProduct {
  address: string;
}

export interface IProductEntity extends IProduct {
  id: number;
}

export interface IBuyProduct {
  catalogId: number;
  walletAddress: string
}