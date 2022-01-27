import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { Pagination, PaginationItem, Modal } from '@mui/material';
import { StatusBar } from '../../Dashboard/ui/TableDataStyle';
import {
  DeleteIcon,
  ThreeDotsIcon,
  BlockUserIcon,
  UnblockUserIcon,
  FilterIcon,
} from '../../../assets/icons/index';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  unblockUserAsync,
  blockUserAsync,
  deleteUserAsync,
  getUsersAsync,
} from '../usersSlice';
import UsersStatusEnum from '../enum/users-status.enum';
import {
  ButtonActionStyle,
  SortableCell,
  SortableCellText,
  IconWrapperPointer,
  Spinner,
  SpinnerWrapper,
} from '../ui/usersTableStyle';
import ConfirmationDialog from '../../../components/confirmationDialog/confirmation';
import { openNotification } from '../../../components/notifications/model/globalNotificationSlice';
import { IUser } from '../../Auth/models/user/user';
import UserFilterModal from '../../Dashboard/components/UserFilterModal';

const LIMIT = 12;
const ASC = 'asc';
const DESC = 'desc';
const BLOCKED_STATUS = 'BLOCKED';
const NAME = 'firstname';
const STATUS = 'status';
const SEARCH_INPUT_DELAY = 500;
export default function UsersTable() {
  const { t } = useTranslation();
  const [sliderOpen, setSliderOpen] = useState(false);
  const { users, count } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    dialogMessage: '',
    actionText: '',
    IconComponent: null,
    method: null,
    type: '',
  });
  const onClose = () => {
    setSliderOpen(false);
  };
  const renderStatus = (status) => {
    let color = '';
    if (status !== null && status !== undefined) {
      if (status === UsersStatusEnum.PENDING) {
        color = '#948CFC';
      } else if (status === UsersStatusEnum.ACTIVE) {
        color = '#2ECC71';
      } else if (status === UsersStatusEnum.BLOCKED) {
        color = '#FF3A4F';
      } else {
        color = '#FF3A4F';
      }
      return (
        <StatusBar color={color} style={{ margin: '0px auto' }}>
          {status}
        </StatusBar>
      );
    }
    return null;
  };
  const [currentPage, setCurrentPage] = useState(1);
  const getNumberOfPages = () => Math.ceil(count / LIMIT);

  const [sort, setSort] = useState({
    sortBy: NAME,
    sortDirection: DESC,
  });
  const [searchValue, setSearchValue] = useState(null);
  const [canFetch, setCanFetch] = useState(false);

  const getUsers = (
    page = 1,
    sortParams = sort,
    searchFilter = searchValue,
  ) => {
    const queryParams = {
      page,
      limit: LIMIT,
      ...sortParams,
      ...(searchFilter &&
        searchFilter.length > 0 && { where: { userFilter: searchFilter } }),
    };
    dispatch(getUsersAsync(queryParams)).then((response) => {
      if (response.payload) {
        setCanFetch(true);
        if (page > getNumberOfPages() && count >= LIMIT) setCurrentPage(page - 1);
      }
    });
  };

  const getNextSortState = (sortValue: string): string => {
    if (sortValue === ASC) return DESC;
    if (sortValue === DESC) return ASC;
    return DESC;
  };

  const toggleSortState = (sortBy: string) => {
    let direction = null;
    if (sort.sortBy !== sortBy) {
      direction = DESC;
    } else {
      direction = getNextSortState(sort.sortDirection);
    }
    setSort({
      sortBy,
      sortDirection: direction,
    });
    if (direction != null) {
      getUsers(currentPage, {
        sortBy,
        sortDirection: direction,
      });
    }
  };

  useEffect(() => {
    getUsers();
  }, [dispatch]);

  const handlePaginationChange = (
    event: React.ChangeEvent<unknown>,
    newPage: number,
  ) => {
    if (currentPage !== newPage) {
      setCurrentPage(newPage);
      getUsers(newPage);
    }
  };

  const getNumberIconColor = (item) => {
    if (item.type === 'previous' || item.type === 'next') return '#948CFC !important';
    return currentPage === item.page
      ? '#948CFC !important'
      : 'black !important';
  };

  const getNumberIconWeight = (item) => {
    if (item.type === 'previous' || item.type === 'next') return 'bolder';
    return currentPage === item.page ? 'bolder' : 'regular';
  };

  const toggleNotification = (success: boolean, messageBody: string) => {
    dispatch(
      openNotification({
        isOpen: true,
        messageBody,
        severity: success ? 'success' : 'error',
      }),
    );
  };

  const closeConfirmDialog = () => {
    setConfirmDialog({ ...confirmDialog, open: false });
  };

  const blockUser = (userId, userStatus) => {
    if (userStatus === UsersStatusEnum.BLOCKED) {
      toggleNotification(false, t('users.user-already-blocked'));
    } else {
      closeConfirmDialog();
      setSliderOpen(true);
      dispatch(blockUserAsync(userId)).then((response) => {
        if (response.payload) {
          setSliderOpen(false);
          toggleNotification(true, t('users.user-blocked'));
        } else {
          setSliderOpen(false);
          toggleNotification(false, t('users.failed-to-block'));
        }
      });
    }
  };

  const openConfirmBlockDialog = (userId, userStatus) => {
    setConfirmDialog({
      open: true,
      dialogMessage: t('users.block-this-user'),
      actionText: t('users.block-user'),
      IconComponent: BlockUserIcon,
      method: () => {
        blockUser(userId, userStatus);
      },
      type: 'orange',
    });
  };

  const unBlockUser = (userId, userStatus) => {
    if (userStatus === UsersStatusEnum.ACTIVE) {
      toggleNotification(false, t('users.user-already-activated'));
    } else {
      closeConfirmDialog();
      setSliderOpen(true);
      dispatch(unblockUserAsync(userId)).then((response) => {
        if (response.payload) {
          setSliderOpen(false);
          toggleNotification(true, t('users.user-unblocked'));
          getUsers(currentPage);
        } else {
          setSliderOpen(false);
          toggleNotification(false, t('users.failed-to-unblock'));
        }
      });
    }
  };

  const openConfirmUnblockDialog = (userId, userStatus) => {
    setConfirmDialog({
      open: true,
      dialogMessage: t('users.unblock-this'),
      actionText: t('users.unblock-user'),
      IconComponent: UnblockUserIcon,
      method: () => {
        unBlockUser(userId, userStatus);
        getUsers(currentPage);
      },
      type: 'green',
    });
  };

  const deleteUser = (id) => {
    closeConfirmDialog();
    setSliderOpen(true);
    dispatch(deleteUserAsync(id)).then((response) => {
      if (response.payload) {
        setSliderOpen(false);
        toggleNotification(true, t('users.user-deleted'));
        getUsers(currentPage);
      } else {
        setSliderOpen(false);
        toggleNotification(false, t('users.failed-to-delete'));
      }
    });
  };

  const openConfirmDeleteDialog = (userId) => {
    setConfirmDialog({
      open: true,
      dialogMessage: t('users.delete-this-user'),
      actionText: t('users.delete-user'),
      IconComponent: DeleteIcon,
      method: () => {
        deleteUser(userId);
      },
      type: 'red',
    });
  };

  const renderArrow = (sortBy: string) => {
    if (sortBy === sort.sortBy) {
      const currentSortValue = sort.sortDirection;
      if (currentSortValue === ASC) {
        return (
          <KeyboardArrowUp
            onClick={() => {
              toggleSortState(sortBy);
            }}
            sx={{ cursor: 'pointer' }}
          />
        );
      }
      if (currentSortValue === DESC) {
        return (
          <KeyboardArrowDown
            onClick={() => {
              toggleSortState(sortBy);
            }}
            sx={{ cursor: 'pointer' }}
          />
        );
      }
      return (
        <KeyboardArrowDown
          onClick={() => {
            toggleSortState(sortBy);
          }}
          sx={{ cursor: 'pointer' }}
        />
      );
    }
    return (
      <KeyboardArrowDown
        onClick={() => {
          toggleSortState(sortBy);
        }}
        sx={{ cursor: 'pointer' }}
      />
    );
  };

  const getTooltipText = (sortBy: string): string => {
    if (sortBy === sort.sortBy) {
      const currentSortValue = sort.sortDirection;
      if (currentSortValue === ASC) return t('home-page.ascending');
      if (currentSortValue === DESC) return t('home-page.descending');
      return t('home-page.not-selected');
    }
    return t('home-page.not-selected');
  };

  const [filterByUserNameModalOpen, setUserFilterModalOpen] = useState(false);
  const closeUserFilterModal = () => {
    if (filterByUserNameModalOpen) {
      setUserFilterModalOpen(false);
    }
  };
  const openUserFilterModal = () => {
    if (!filterByUserNameModalOpen) {
      setUserFilterModalOpen(true);
    }
  };

  const getFilterIconColor = () => (searchValue != null &&
  searchValue.length > 0 ?
    '#948CFC' :
    '#9BA8DB');

  const runSearch = (newSearchValue) => {
    setCurrentPage(1);
    getUsers(1, sort, newSearchValue);
  };

  const handleSearchValueChange = (e) => {
    const newValue = e.target.value;
    console.log('new val', newValue);
    setSearchValue(newValue);
  };

  useEffect(() => {
    let timeoutId = null;
    if (canFetch) {
      timeoutId = setTimeout(() => runSearch(searchValue), SEARCH_INPUT_DELAY);
    }
    return () => clearTimeout(timeoutId);
  }, [searchValue]);

  const isBlocked = (user: IUser) => user.status === BLOCKED_STATUS;
  return (
    <>
      <TableContainer>
        <Table sx={{ minWidth: 650, border: 'none' }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', maxWidth: '50px !important', minWidth: '50px !important' }} align="center">
                {t('users.nr')}
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', maxWidth: '125px !important', minWidth: '125px !important' }} align="center">
                <SortableCell>
                  <SortableCellText title={getTooltipText(NAME)}>
                    {t('users.name')}
                  </SortableCellText>
                  {renderArrow(NAME)}
                </SortableCell>
              </TableCell>
              <TableCell
                sx={{ fontWeight: 'bold',
                  maxWidth: '300px !important',
                  minWidth: '300px !important' }}
                align="center"
              >
                {t('users.email-adress')}
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', maxWidth: '125px !important', minWidth: '125px !important' }} align="center">
                <SortableCell>
                  <SortableCellText title={getTooltipText(STATUS)}>
                    {t('users.status')}
                  </SortableCellText>
                  {renderArrow(STATUS)}
                </SortableCell>
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 'bold',
                  maxWidth: '350px !important',
                  minWidth: '350px !important' }}
                align="center"
              >
                {t('users.package')}
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', maxWidth: '50px !important', minWidth: '50px !important' }} align="center" />
              <TableCell
                sx={{
                  fontWeight: 'bold',
                  maxWidth: '125px !important',
                  minWidth: '125px !important',
                  position: 'relative',
                }}
                align="right"
              >
                <IconWrapperPointer onClick={openUserFilterModal}>
                  <FilterIcon color={getFilterIconColor()} />

                  {filterByUserNameModalOpen && (
                    <UserFilterModal
                      open={filterByUserNameModalOpen}
                      handleClose={closeUserFilterModal}
                      toggleUser={() => {}}
                      selectedUsers={[]}
                      resetSelectedUsers={() => {}}
                      allUsers={[]}
                      setAllUsers={() => {}}
                      filterValue={searchValue}
                      handleFilterValueChange={handleSearchValueChange}
                    />
                  )}
                </IconWrapperPointer>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ position: 'relative' }}>
            {sliderOpen ? (
              <Modal
                open
                onClose={onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <SpinnerWrapper>
                  <Spinner color="primary" />
                </SpinnerWrapper>
              </Modal>
            ) : null}
            {users.map((user, index) => (
              <TableRow
                key={user.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell sx={{ maxWidth: '50px !important', minWidth: '50px !important' }} align="center">{index + 1}</TableCell>
                <TableCell sx={{ maxWidth: '125px !important', minWidth: '125px !important' }} align="center">{user.firstname}</TableCell>
                <TableCell
                  sx={{ maxWidth: '300px !important',
                    minWidth: '300px !important',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden' }}
                  align="center"
                >
                  {user.email}

                </TableCell>
                <TableCell sx={{ maxWidth: '125px !important', minWidth: '125px !important' }} align="center">
                  {user.status !== undefined ? (
                    renderStatus(user.status)
                  ) : (
                    <p>{t('users.no-status')}</p>
                  )}
                </TableCell>
                <TableCell
                  sx={{ maxWidth: '350px !important',
                    minWidth: '350px !important',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden' }}
                  align="center"
                >
                  {user.subscriptions && user.subscriptions.length ? (
                    user.subscriptions.map((item) => item.name).join(' + ')
                  ) : (
                    <p style={{ color: '#FF3A4F', fontWeight: 'bold' }}>
                      {t('users.not-selected')}
                    </p>
                  )}
                </TableCell>
                <TableCell sx={{ maxWidth: '50px !important', minWidth: '50px !important' }} align="center">
                  <PopupState variant="popover" popupId="demo-popup-menu">
                    {(popupState) => (
                      <div>
                        <ButtonActionStyle {...bindTrigger(popupState)}>
                          <ThreeDotsIcon />
                        </ButtonActionStyle>
                        <Menu {...bindMenu(popupState)}>
                          {isBlocked(user) ? (
                            <MenuItem
                              onClick={() => {
                                popupState.close();
                                openConfirmUnblockDialog(user.id, user.status);
                              }}
                            >
                              {t('users.unblock')}
                            </MenuItem>
                          ) : (
                            <MenuItem
                              onClick={() => {
                                popupState.close();
                                openConfirmBlockDialog(user.id, user.status);
                              }}
                            >
                              {t('users.block')}
                            </MenuItem>
                          )}
                          <MenuItem
                            onClick={() => {
                              popupState.close();
                              openConfirmDeleteDialog(user.id);
                            }}
                          >
                            {t('users.delete')}
                          </MenuItem>
                        </Menu>
                      </div>
                    )}
                  </PopupState>
                </TableCell>
                <TableCell sx={{ maxWidth: '125px !important', minWidth: '125px !important' }} />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {confirmDialog.open && (
        <ConfirmationDialog
          isOpen={confirmDialog.open}
          handleAcceptConfirmation={confirmDialog.method}
          handleCloseConfirmation={closeConfirmDialog}
          confirmationTitle={confirmDialog.dialogMessage}
          icon={<confirmDialog.IconComponent />}
          approveText={confirmDialog.actionText}
          declineText={t('users.cancel')}
          type={confirmDialog.type}
        />
      )}
      <Pagination
        sx={{
          '& > ul:first-child': {
            color: 'red !important',
          },
          '& > ul:last-child': {
            color: 'red !important',
          },
        }}
        count={getNumberOfPages()}
        page={+currentPage}
        onChange={handlePaginationChange}
        defaultPage={+1}
        renderItem={(item) => (
          <PaginationItem
            {...item}
            sx={{
              backgroundColor: 'white !important',
              color: getNumberIconColor(item),
              fontWeight: getNumberIconWeight(item),
            }}
          >
            {item.page}
          </PaginationItem>
        )}
        variant="text"
        color="primary"
      />
    </>
  );
}
