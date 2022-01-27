import React, { useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import { Autocomplete, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import {
  AutocompleteWrapper,
  CustomAssignTaskWrapper,
  SubmitButton,
  TitleWrapper,
  TitleIconTextWrapper,
  SpinnerWrapper,
  Spinner,
  TitleText,
} from '../ui/AssignTaskModalStyle';
import {
  IconWrapper,
} from '../ui/TaskOverviewModalStyle';
import {
  AssignToUserIcon,
  CloseIcon,
} from '../../../assets/icons';
import { IconWrapperPointer } from '../ui/SaveTaskModalStyle';
import { IUser } from '../../Auth/models/user/user';
import { getAdminUsers } from '../../Auth/models/user/UserService';
import { useAppSelector } from '../../../store/hooks';

const AssignTaskModal = ({ open, handleClose, handleAssignTask, currentUser }) => {
  const closeModal = () => {
    handleClose();
  };
  const { t } = useTranslation();

  const [users, setUsers] = useState({
    fetching: false,
    users: [] as IUser[],
  });

  const { assigningTask } = useAppSelector((state) => state.tasks.taskProcesses);
  const fetchUsers = () => {
    setUsers({ fetching: true, users: [] });

    getAdminUsers().then((admins) => {
      const currentUserAdmin = admins.find((admin) => admin.id === currentUser.id);
      const startingUser = admins[0];
      admins[admins.indexOf(currentUserAdmin)] = startingUser;
      admins[0] = currentUserAdmin;
      setUsers({
        fetching: false,
        users: admins,
      });
    }).catch(() => {
      setUsers({
        fetching: false,
        users: [],
      });
    });
  };

  const [selectedUser, setselectedUser] = useState(users.users[0]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const assignTask = () => {
    handleAssignTask(selectedUser);
  };

  const getOptionText = (user: IUser) => user.firstname + (user.id === currentUser.id ? ' (You)' : '');

  return (
    <Modal
      open={open}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <CustomAssignTaskWrapper>
        <TitleWrapper>
          <TitleIconTextWrapper>
            <IconWrapper>
              <AssignToUserIcon />
            </IconWrapper>
            <TitleText>
              {t('home-page.assign-a-task')}
            </TitleText>
          </TitleIconTextWrapper>
          <IconWrapperPointer sx={{ marginLeft: 'auto' }} onClick={closeModal}>
            <CloseIcon />
          </IconWrapperPointer>
        </TitleWrapper>
        {
          users.fetching || assigningTask ? (
            <SpinnerWrapper>
              <Spinner color="primary" />
            </SpinnerWrapper>
          )
            :
            (
              <>
                <AutocompleteWrapper>
                  <Autocomplete
                    value={null}
                    onChange={(event: any, newValue: IUser | null) => {
                      setselectedUser(newValue);
                    }}
                    fullWidth
                    disablePortal
                    id="combo-box-demo"
                    options={users.users}
                    getOptionLabel={(option) => getOptionText(option)}
                    renderInput={(params) => (
                      <TextField
                        fullWidth
                        {...params}
                        label={t('home-page.assign-to')}
                        placeholder={t('home-page.type-a-name-to-assign')}
                      />
                    )}
                  />
                </AutocompleteWrapper>
                <SubmitButton
                  disabled={selectedUser == null}
                  onClick={assignTask}
                >
                  {t('home-page.assign-task')}
                </SubmitButton>
              </>
            )
        }
      </CustomAssignTaskWrapper>
    </Modal>
  );
};

export default AssignTaskModal;
