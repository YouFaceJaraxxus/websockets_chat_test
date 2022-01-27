interface INotificationConfig {
  isOpen: boolean;
  severity?: 'success' | 'error';
  messageBody?: string;
}

export type { INotificationConfig };
export default {};
