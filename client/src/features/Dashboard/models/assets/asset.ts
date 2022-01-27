import { IUser } from '../../../Auth/models/user/user';

interface IAsset {
  id: number;
  name: string;
  path: string;
  type: string;
  mimeType: string;
  size: number;
  ownerId: number;
  owner: IUser;
  restriction: string;
}

interface IAssetResponse {
  preSignedUrl: string;
  asset: IAsset;
}

export type { IAssetResponse, IAsset };
export default {};
