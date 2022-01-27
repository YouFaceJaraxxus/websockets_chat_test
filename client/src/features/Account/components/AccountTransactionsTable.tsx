import React from 'react';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { ITransaction } from '../../Transactions/models/transaction/transaction';
import { NoTransactions } from './ui/AccountTransactionsStyle';
import { priceFormatter } from '../../../common/formatter';

export default function TableData({ transactions } : { transactions: ITransaction[] }) {
  const { t } = useTranslation();
  return (

    transactions != null && transactions.length > 0 ?
      (
        <TableContainer>
          <Table sx={{ minWidth: 650, border: 'none' }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bolder', width: '75px' }} align="left">
                  {t('transactions.id')}
                </TableCell>
                <TableCell sx={{ fontWeight: 'bolder', width: '150px' }} align="left">
                  {t('transactions.date')}
                </TableCell>
                <TableCell sx={{ fontWeight: 'bolder', width: '200px' }} align="left">
                  {t('transactions.package_add_on')}
                </TableCell>
                <TableCell sx={{ fontWeight: 'bolder' }} align="left">
                  {t('transactions.amount')}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell align="left">
                      {transaction.id}
                    </TableCell>
                    <TableCell align="left">
                      {moment(transaction.createdAt)?.format('DD/MM/YYYY')}
                    </TableCell>
                    <TableCell align="left">
                      {transaction.package}
                    </TableCell>
                    <TableCell align="left">{priceFormatter.format(parseInt(transaction.amount, 10))}</TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </TableContainer>
      )
      :
      (
        <NoTransactions>
          {t('account.no-transactions')}
        </NoTransactions>
      )

  );
}
