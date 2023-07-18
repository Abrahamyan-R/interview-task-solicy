export interface IAsset {
  type: number;
  level: number;
  address: string;
};

export interface IAssetEntity extends IAsset {
  id: number;
};