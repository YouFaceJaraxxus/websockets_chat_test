import { IAsset } from '../../../Dashboard/models/assets/asset';

interface IKnowledge {
  id: number;
  name: string;
  link: string;
  assetId: number;
  asset: IAsset;
}

export type { IKnowledge };
export default {};
