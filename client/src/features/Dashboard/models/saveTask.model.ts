interface ISaveTask {
  title?: string;
  productId?: number;
  taskTypeId?: number;
  dueDate?: Date;
  priorityId?: number;
  objectId?: number;
  subject?: string;
  description?: string;
}

export type { ISaveTask };
export default {};
