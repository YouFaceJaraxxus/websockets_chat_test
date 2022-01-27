import React, { useEffect, useState } from 'react';
import { Pagination, PaginationItem } from '@mui/material';
import BasicTable from './AccountTransactionsTable';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { getAllUserTransactionsAsync } from '../../Transactions/models/transaction/transactionsSlice';
import { TableSpinnerWrapper, TableSpinner } from '../../Dashboard/ui/TableDataStyle';

const ALL_TRANSACTIONS_LIMIT = 12;
const AccountTransactions = () => {
  const dispatch = useAppDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const {
    allTransactions,
    allTransactionsCount,
    fetching,
  } = useAppSelector((state) => state.transactions);

  const getTransactions = (page = 1) => {
    dispatch(getAllUserTransactionsAsync({
      limit: ALL_TRANSACTIONS_LIMIT,
      page,
    }));
  };
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

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <>
      {
          fetching ?
            (
              <TableSpinnerWrapper>
                <TableSpinner color="primary" />
              </TableSpinnerWrapper>
            )
            :
            (
              <>
                <BasicTable transactions={allTransactions} />
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
    </>
  );
};

export default AccountTransactions;
