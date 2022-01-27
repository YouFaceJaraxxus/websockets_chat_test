import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import moment from 'moment';
import { ITransaction } from '../models/transaction/transaction';
import { NoTransactions } from '../TransactionsStyle';
import { priceFormatter } from '../../../common/formatter';
import { SortableCell, SortableCellText, IconWrapperPointer, TableSpinnerWrapper, TableSpinner } from '../ui/transactionTableStyle';
import { FilterIcon } from '../../../assets/icons';
import UserFilterModal from '../../Dashboard/components/UserFilterModal';

const ASC = 'asc';
const DESC = 'desc';
const ID = 'id';
const NAME = 'name';
const DATE = 'createdAt';
const PACKAGE_ADD_ON = 'package';
const AMOUNT = 'amount';
export default function TableData({
  fetching,
  transactions,
  toggleSortState,
  sort,
  toggleUser,
  selectedUsers,
  resetSelectedUsers,
  allUsers,
  setAllUsers,
}: {
  fetching: boolean,
  transactions: ITransaction[],
  toggleSortState: (sortBy: string) => void,
  sort: any,
  toggleUser: any,
  selectedUsers: any,
  resetSelectedUsers: any,
  allUsers: any,
  setAllUsers: any,
}) {
  const { t } = useTranslation();
  const renderArrow = (sortBy: string) => {
    if (sortBy === sort.sortBy) {
      const currentSortValue = sort.sortDirection;
      if (currentSortValue === ASC) {
        return (
          <KeyboardArrowUp
            onClick={() => { toggleSortState(sortBy); }}
            sx={{ cursor: 'pointer' }}
          />
        );
      }
      if (currentSortValue === DESC) {
        return (
          <KeyboardArrowDown
            onClick={() => { toggleSortState(sortBy); }}
            sx={{ cursor: 'pointer' }}
          />
        );
      }
      return (
        <KeyboardArrowDown
          onClick={() => { toggleSortState(sortBy); }}
          sx={{ cursor: 'pointer' }}
        />
      );
    }
    return (
      <KeyboardArrowDown
        onClick={() => { toggleSortState(sortBy); }}
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
    } return t('home-page.not-selected');
  };

  const [filterByUserNameModalOpen, setUserFilterModalOpen] = useState(false);
  const closeUserFilterModal = () => {
    if (filterByUserNameModalOpen) { setUserFilterModalOpen(false); }
  };
  const openUserFilterModal = () => {
    if (!filterByUserNameModalOpen) { setUserFilterModalOpen(true); }
  };

  const getFilterIconColor = () => (selectedUsers &&
    selectedUsers.length > 0 ?
    '#948CFC' :
    '#9BA8DB');

  return (
    <TableContainer>
      <Table sx={{ minWidth: 650, border: 'none' }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold', maxWidth: '50px !important', minWidth: '50px !important' }} align="center">
              <SortableCell>
                <SortableCellText
                  title={getTooltipText(ID)}
                >
                  {t('transactions.id')}
                </SortableCellText>
                {renderArrow(ID)}
              </SortableCell>
            </TableCell>
            <TableCell sx={{ fontWeight: 'bold', maxWidth: '125px !important', minWidth: '125px !important' }} align="center">
              <SortableCell>
                <SortableCellText
                  title={getTooltipText(NAME)}
                >
                  {t('transactions.name')}
                </SortableCellText>
                {renderArrow(NAME)}
              </SortableCell>
            </TableCell>
            <TableCell sx={{ fontWeight: 'bold', maxWidth: '350px !important', minWidth: '350px !important' }} align="center">
              {t('transactions.email-adress')}
            </TableCell>
            <TableCell sx={{ fontWeight: 'bold', maxWidth: '100px !important', minWidth: '100px !important' }} align="center">
              <SortableCell>
                <SortableCellText
                  title={getTooltipText(DATE)}
                >
                  {t('transactions.date')}
                </SortableCellText>
                {renderArrow(DATE)}
              </SortableCell>
            </TableCell>
            <TableCell sx={{ fontWeight: 'bold', maxWidth: '350px !important', minWidth: '350px !important' }} align="center">
              <SortableCell>
                <SortableCellText
                  title={getTooltipText(PACKAGE_ADD_ON)}
                >
                  {t('transactions.package_add_on')}
                </SortableCellText>
                {renderArrow(PACKAGE_ADD_ON)}
              </SortableCell>
            </TableCell>
            <TableCell sx={{ fontWeight: 'bold', maxWidth: '125px !important', minWidth: '125px !important' }} align="center">
              <SortableCell>
                <SortableCellText
                  title={getTooltipText(AMOUNT)}
                >
                  {t('transactions.amount')}
                </SortableCellText>
                {renderArrow(AMOUNT)}
              </SortableCell>
            </TableCell>
            <TableCell
              sx={{
                fontWeight: 'bold',
                maxWidth: '125px !important',
                minWidth: '125px !important',
                position: 'relative' }}
              align="right"
            >
              <IconWrapperPointer
                onClick={openUserFilterModal}
              >
                <FilterIcon color={getFilterIconColor()} />

                {filterByUserNameModalOpen && (
                  <UserFilterModal
                    open={filterByUserNameModalOpen}
                    handleClose={closeUserFilterModal}
                    toggleUser={toggleUser}
                    selectedUsers={selectedUsers}
                    resetSelectedUsers={resetSelectedUsers}
                    allUsers={allUsers}
                    setAllUsers={setAllUsers}
                  />
                )}
              </IconWrapperPointer>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            fetching ?
              (
                <TableRow>
                  <TableCell colSpan={7}>
                    <TableSpinnerWrapper>
                      <TableSpinner color="primary" />
                    </TableSpinnerWrapper>
                  </TableCell>
                </TableRow>
              )
              : (
                <>
                  {
                    transactions != null && transactions.length > 0 &&
                    transactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell sx={{ color: '#171719', maxWidth: '50px !important', minWidth: '50px !important' }} align="center">
                          {transaction.id}
                        </TableCell>
                        <TableCell sx={{ color: '#171719', maxWidth: '125px !important', minWidth: '125px !important' }} align="center">
                          {`${
                            transaction.user ? transaction.user.firstname : 'Account'
                          } ${transaction.user ? transaction.user.lastname : 'Deleted'}`}
                        </TableCell>
                        <TableCell
                          sx={{ color: '#171719',
                            maxWidth: '350px !important',
                            minWidth: '350px !important',
                            textOverflow: 'ellipsis',
                            overflow: 'hidden' }}
                          align="center"
                        >
                          {transaction.user?.email}
                        </TableCell>
                        <TableCell sx={{ color: '#171719', maxWidth: '100px !important', minWidth: '100px !important' }} align="center">
                          {moment(transaction.createdAt)?.format('DD/MM/YYYY')}
                        </TableCell>
                        <TableCell
                          sx={{ color: '#171719',
                            maxWidth: '350px !important',
                            minWidth: '350px !important',
                            textOverflow: 'ellipsis',
                            overflow: 'hidden' }}
                          align="center"
                        >
                          {transaction.package}
                        </TableCell>
                        <TableCell sx={{ color: '#171719', maxWidth: '125px !important', minWidth: '125px !important' }} align="center">
                          {priceFormatter.format(parseInt(transaction.amount, 10))}
                        </TableCell>
                        <TableCell sx={{ maxWidth: '125px !important', minWidth: '125px !important' }} />
                      </TableRow>
                    ))
                  }
                  {
                    (transactions == null || transactions.length === 0) &&
                    (
                      <TableRow>
                        <TableCell colSpan={7} sx={{ borderBottom: 'none' }}>
                          <NoTransactions>
                            {t('transactions.no-data')}
                          </NoTransactions>
                        </TableCell>
                      </TableRow>
                    )
                  }
                </>
              )
        }

        </TableBody>
      </Table>
    </TableContainer>
  );
}
