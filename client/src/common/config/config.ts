interface IConfig {
  statuses: IStatus[];
  priorities: IPriority[];
  objects: IObject[];
  products: IProduct[];
  taskTypes: ITaskType[];
  expiryDate?: Date;
}

interface IStatus {
  id: number;
  status: string;
  dateText: string;
}

interface IPriority {
  id: number;
  priority: string;
  colorCode: string;
}

interface IObject {
  id: number;
  object: string;
}

interface IProduct {
  id: number;
  product: string;
}

interface ITaskType {
  id: number;
  taskType: string;
  productId: number;
}

export type { IConfig };
export default {};
