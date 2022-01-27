import { AxiosResponse } from 'axios';
import BaseService from '../../../../services/common/BaseService';
import { IAssetDeleteResponse } from '../assetDeleteResponse';
import { IBulkDeleteAssetsDto } from '../bulkDeleteAssets.model';
import { ICreateAsset } from '../createAsset';
import { IGetAssetPresignedUrl } from '../getAssetPresignedUrl.model';
import { IAssetResponse } from './asset';

const baseService = new BaseService();
const ASSETS_STACKBITES_BASE_URL = 'https://file-upload.stackbites.stg.jsguru.io';
const ASSETS_STACKBITES_UPLOAD = 'upload';
const ASSETS_BASE_URL = 'assets';
const ASSETS_BULK_DELETE = 'bulk';

const createAsset = async (data: ICreateAsset, query = {}): Promise<IAssetResponse> => {
  const queryString = baseService.qs.stringify(query);
  const path = baseService.url.build(ASSETS_BASE_URL);
  const url = BaseService.combine(path, queryString);
  const response: AxiosResponse<IAssetResponse> = await baseService.post(url, data, {});
  return response.data;
};

const deleteAsset = async (assetId: number, query = {}): Promise<IAssetDeleteResponse> => {
  const queryString = baseService.qs.stringify(query);
  const path = baseService.url.build(`${ASSETS_BASE_URL}/${assetId}`);
  const url = BaseService.combine(path, queryString);
  const response: AxiosResponse<IAssetDeleteResponse> = await baseService.delete(url, {});
  return response.data;
};

const bulkDeleteAssets = async (
  data: IBulkDeleteAssetsDto,
  query = {},
): Promise<IAssetResponse> => {
  const queryString = baseService.qs.stringify(query);
  const path = baseService.url.build(`${ASSETS_BASE_URL}/${ASSETS_BULK_DELETE}`);
  const url = BaseService.combine(path, queryString);
  const response: AxiosResponse<IAssetResponse> = await baseService.post(url, data, {});
  return response.data;
};

const uploadAsset = async (
  data: FormData,
  query = {},
): Promise<object> => {
  const queryString = baseService.qs.stringify(query);
  const path = baseService.url.build(`${ASSETS_STACKBITES_BASE_URL}/${ASSETS_STACKBITES_UPLOAD}`);
  const url = BaseService.combine(path, queryString);
  const response: AxiosResponse<object> = await baseService.post(url, data, {});
  return response.data;
};

const getAssetPresignedUrl = async (
  assetId: number,
  query = {},
): Promise<IGetAssetPresignedUrl> => {
  const queryString = baseService.qs.stringify(query);
  const path = baseService.url.build(`${ASSETS_BASE_URL}/${assetId}`);
  const url = BaseService.combine(path, queryString);
  const response: AxiosResponse<IGetAssetPresignedUrl> = await baseService.get(url, {});
  return response.data;
};

export {
  createAsset,
  deleteAsset,
  bulkDeleteAssets,
  uploadAsset,
  getAssetPresignedUrl };
export default {};
