import { IAsset } from '../assets/asset';

interface IAttachment{
  ticketId: number;
  assetId: number;
  asset: IAsset;
}

export type { IAttachment };
export default {};
