interface IEditUserForm {
  firstname?: string;
  lastname?: string;
  oldPassword?: string;
  newPassword?: string;
  confirmedPassword?: string;
  email?: string;
  newProfileImageId?: number;
}

interface IEditPersonalInfoForm {
  firstname?: string;
  lastname?: string;
  email?: string;
  newProfileImageId?: number;
}

interface IEditPasswordForm {
  oldPassword?: string;
  newPassword?: string;
  confirmedPassword?: string;
}

export type { IEditUserForm, IEditPersonalInfoForm, IEditPasswordForm };
export default {};
