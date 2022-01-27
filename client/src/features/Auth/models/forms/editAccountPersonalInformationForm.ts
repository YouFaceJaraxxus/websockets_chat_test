import { IEditUserForm } from '../../../Account/models/userForm/editUserForm';

interface IEditAccountPersonalInformationForm extends IEditUserForm {
  email: string;
  password: string;
}
export type { IEditAccountPersonalInformationForm };
export default {};
