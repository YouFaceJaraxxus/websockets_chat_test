interface ICreateComment {
  text: string;
  type: 'comment' | 'delete_request' | 'marked_completed' | 'delete_response';
}

export type { ICreateComment };
export default {};
