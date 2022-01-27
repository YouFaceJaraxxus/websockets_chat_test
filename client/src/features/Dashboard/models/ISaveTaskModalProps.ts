import { IConfig } from '../../../common/config/config';
import { IAssetResponse } from './assets/asset';
import { ISaveTask } from './saveTask.model';
import { ITask } from './tasks/task';

interface ISaveTaskModalProps {
  config: IConfig;
  open: boolean;
  handleClose: () => any;
  handleResult: (success: boolean, response?: ITask) => any;
  taskId: number;
  initialValues: ISaveTask;
  initialAttachments: IAssetResponse[];
  type: 'create' | 'edit';
  toggleModal: () => any;
  fetchTask?: boolean;
}

export type { ISaveTaskModalProps };
export default {};
