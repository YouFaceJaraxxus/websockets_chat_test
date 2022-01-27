import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pagination, PaginationItem } from '@mui/material';
import {
  ComponentsHolder,
  BoxStyle,
  TransactionHeaderStyled,
  TransactionHeaderPStyled,
  IconBackground,
} from './TransactionsStyle';
import { TransactionIconPage } from '../../assets/icons/index';
import BasicTable from './components/transactionTable';
import UserHeader from '../UserHeader/UserHeader';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getAllTransactionsAsync } from './models/transaction/transactionsSlice';
import { TableSpinner, TableSpinnerWrapper } from '../Dashboard/ui/TableDataStyle';
import { IUser } from '../Auth/models/user/user';

const ALL_TRANSACTIONS_LIMIT = 12;
const ASC = 'asc';
const DESC = 'desc';
const ID = 'id';
const TransactionsScreen = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [allUsers, setAllUsers] = useState([] as IUser[]);
  const [selectedUsers, setSelectedUsers] = useState([] as IUser[]);
  const [sort, setSort] = useState({
    sortBy: ID,
    sortDirection: DESC,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const getTransactions = (page = 1, sortParams = sort, users = selectedUsers) => {
    dispatch(getAllTransactionsAsync({
      limit: ALL_TRANSACTIONS_LIMIT,
      page,
      ...sortParams,
      ...(users && users.length > 0 && { where: { userFilter: users.map((u) => u.id) } }),
    }));
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
      getTransactions(currentPage, {
        sortBy,
        sortDirection: direction,
      });
    }
  };
  const {
    allTransactions,
    allTransactionsCount,
    fetching,
    firstFetch,
  } = useAppSelector((state) => state.transactions);
  const getNumberOfPages = () => Math.ceil(allTransactionsCount / ALL_TRANSACTIONS_LIMIT);

  const handlePaginationChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
    if (currentPage !== newPage) {
      setCurrentPage(newPage);
      getTransactions(newPage);
    }
  };

  const getNumberIconColor = (item) => {
    if (item.type === 'previous' || item.type === 'next') return '#948CFC !important';
    return (currentPage === item.page ? '#948CFC !important' : 'black !important');
  };

  const getNumberIconWeight = (item) => {
    if (item.type === 'previous' || item.type === 'next') return 'bolder';
    return (currentPage === item.page ? 'bolder' : 'regular');
  };

  const runSearch = (users = selectedUsers) => {
    setCurrentPage(1);
    getTransactions(1, sort, users);
  };

  const toggleUser = (user: IUser) => {
    const existingUser = selectedUsers.find((u) => u.id === user.id);
    let users = selectedUsers;
    if (existingUser) {
      setSelectedUsers(selectedUsers.filter((u) => u.id !== user.id));
      users = users.filter((u) => u.id !== user.id);
    } else {
      setSelectedUsers([...selectedUsers, user]);
      users.push(user);
    }
    runSearch(users);
  };

  const resetSelectedUsers = () => {
    setSelectedUsers([]);
    runSearch([]);
  };

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <BoxStyle>
      <UserHeader />
      <ComponentsHolder>
        <TransactionHeaderStyled>
          <IconBackground>
            <TransactionIconPage />
          </IconBackground>
          <TransactionHeaderPStyled>
            {t('transactions.transactions')}
          </TransactionHeaderPStyled>
        </TransactionHeaderStyled>
        {
          firstFetch ?
            (
              <TableSpinnerWrapper>
                <TableSpinner color="primary" />
              </TableSpinnerWrapper>
            )
            :
            (
              <>
                <BasicTable
                  fetching={fetching}
                  transactions={allTransactions}
                  toggleSortState={toggleSortState}
                  sort={sort}
                  toggleUser={toggleUser}
                  selectedUsers={selectedUsers}
                  resetSelectedUsers={resetSelectedUsers}
                  allUsers={allUsers}
                  setAllUsers={setAllUsers}
                />

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
            )
        }

      </ComponentsHolder>
    </BoxStyle>
  );
};

export default TransactionsScreen;
