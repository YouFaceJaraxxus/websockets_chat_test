import AssetsRestrictionEnum from './assets/assetRestrictionEnum';

interface ICreateAsset {
  name: string;
  size: number;
  mimetype: string;
  restriction: AssetsRestrictionEnum;
}

export type { ICreateAsset };
export default {};
