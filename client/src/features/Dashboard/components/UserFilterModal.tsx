import React, { useState, useEffect } from 'react';
import { Checkbox, Modal, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import {
  FilterInputWrapper,
  CustomFilterByUserNameWrapper,
  TitleText,
  UserList,
  UserListItem,
  SpinnerWrapper,
  Spinner,
  UserName,
  ClearButton,
} from '../ui/UserFilterModalStyle';
import { getUsers } from '../../Auth/models/user/UserService';
import { IUser } from '../../Auth/models/user/user';

const FIRST_NAME = 'firstname';
const ASC = 'ASC';
const SEARCH_INPUT_DELAY = 500;
const UserFilterModal = ({
  open,
  handleClose,
  toggleUser,
  selectedUsers,
  resetSelectedUsers,
  allUsers,
  setAllUsers,
  filterValue = null,
  handleFilterValueChange = null,
}) => {
  const closeModal = (e) => {
    e.stopPropagation();
    handleClose();
  };

  const [fetchingUsers, setFetchingUsers] = useState(false);
  const [canFetch, setCanFetch] = useState(false);
  const [userFilterValue, setUserFilterValue] = useState(null);

  const fetchUsers = (searchValue = userFilterValue) => {
    setFetchingUsers(true);
    getUsers({ where: {
      userFilter: searchValue,
    },
    page: 1,
    limit: 10000,
    sortBy: FIRST_NAME,
    sortDirection: ASC,
    }).then((response) => {
      setAllUsers(response);
      if (!canFetch)setCanFetch(true);
      setFetchingUsers(false);
    }).catch(() => {
      setFetchingUsers(false);
    });
  };

  useEffect(() => {
    fetchUsers(null);
  }, []);

  const runSearch = (searchValue) => {
    setUserFilterValue(searchValue);
    fetchUsers(searchValue);
  };

  useEffect(() => {
    let timeoutId = null;
    if (canFetch) {
      timeoutId = setTimeout(() => runSearch(userFilterValue), SEARCH_INPUT_DELAY);
    }
    return () => clearTimeout(timeoutId);
  }, [userFilterValue]);

  const toggleLabelText = (text, labelText) => {
    if (text && text.length > 0) return labelText;
    return null;
  };
  const { t } = useTranslation();

  const handleChange = (e) => {
    const { value } = e.target;
    setUserFilterValue(value);
  };

  const getIsChecked = (user: IUser) => user != null && selectedUsers != null
  && selectedUsers.find((u) => u.id === user.id) != null;

  const resetFilter = () => {
    resetSelectedUsers();
    setUserFilterValue('');
  };

  const clearDisabled = () => (selectedUsers == null || selectedUsers.length === 0) &&
  (userFilterValue == null || userFilterValue.length === 0);

  return (
    <Modal
      open={open}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <CustomFilterByUserNameWrapper
        type={filterValue == null && handleFilterValueChange == null ? 'field' : 'list'}
      >
        <TitleText>
          {t('home-page.filter-user')}
        </TitleText>
        {
          filterValue == null && handleFilterValueChange == null ?
            (
              <>
                <FilterInputWrapper>
                  <TextField
                    value={userFilterValue}
                    onChange={handleChange}
                    type="text"
                    fullWidth
                    id="outlined-basic"
                    label={toggleLabelText(userFilterValue, t('home-page.user-name'))}
                    placeholder={t('home-page.user-name-placeholder')}
                    inputProps={{ maxLength: 50 }}
                    autoComplete="off"
                  />
                </FilterInputWrapper>

                {
          fetchingUsers ?
            (
              <SpinnerWrapper>
                <Spinner color="primary" />
              </SpinnerWrapper>
            )
            :
            (
              <UserList>
                {
                  allUsers && allUsers.users && allUsers.users.length > 0 &&
                  allUsers.users.map((user) => (
                    <UserListItem key={user.id} onClick={() => { toggleUser(user); }}>
                      <Checkbox checked={getIsChecked(user)} />
                      <UserName sx={{
                        color: getIsChecked(user) ? '#948CFC' : 'black',
                      }}
                      >
                        {user.firstname}
                        {' '}
                        {user.lastname}
                      </UserName>
                    </UserListItem>
                  ))
                }
              </UserList>
            )
          }
                <ClearButton
                  onClick={resetFilter}
                  disabled={clearDisabled()}
                >
                  {t('home-page.filter-clear')}
                </ClearButton>
              </>
            )
            :
            (
              <FilterInputWrapper>
                <TextField
                  value={filterValue}
                  onChange={handleFilterValueChange}
                  type="text"
                  fullWidth
                  id="outlined-basic"
                  label={toggleLabelText(filterValue, t('home-page.user-name'))}
                  placeholder={t('home-page.user-name-placeholder')}
                  inputProps={{ maxLength: 50 }}
                  autoComplete="off"
                />
              </FilterInputWrapper>
            )
        }

      </CustomFilterByUserNameWrapper>
    </Modal>
  );
};

export default UserFilterModal;
