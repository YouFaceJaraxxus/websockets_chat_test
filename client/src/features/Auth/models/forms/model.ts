interface IUserLogin {
  email: string;
  password: string;
}

interface IUserRegister {
  email: string;
  password: string;
  confirmedPassword: string;
  checkbox?: boolean;
}

interface NotificationConfig {
  isOpen?: boolean;
  severity?: string;
  messageBody?: string;
}

interface ICode {
  code: number;
}

interface IUserPersonalInformation {
  firstname: string;
  lastname: string;
}

export type {
  IUserLogin,
  IUserRegister,
  NotificationConfig,
  ICode,
  IUserPersonalInformation,
};
export default {};
