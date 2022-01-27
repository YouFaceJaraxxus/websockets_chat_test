import React, { useEffect } from 'react';
import moment from 'moment';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { useHistory } from 'react-router';
import { UserCardStyle, BackgroundIcons } from '../DashboardStyle';
import transactionsIcon from '../../../assets/icons/transactions.svg';
import { AmountCell,
  DateCell,
  NameCell,
  TransactionsTitle,
  TransactionsTitleIcon,
  TransactionsHeader,
  ViewAllText,
  ViewAll,
  ViewAllArrow,
  NoTransactions,
} from '../ui/TransactionsCardStyle';
import { TRANSACTIONS_PATH } from '../../../routes/path-constants';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { TableSpinnerWrapper, TableSpinner } from '../ui/TableDataStyle';
import { getLatestTransactionsAsync } from '../../Transactions/models/transaction/transactionsSlice';
import { priceFormatter } from '../../../common/formatter';

const TransactionsCard = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useAppDispatch();

  const getLatestTransactions = () => {
    dispatch(getLatestTransactionsAsync());
  };

  useEffect(() => {
    getLatestTransactions();
  }, []);

  const { latestTransactions, fetchingLatest } = useAppSelector((state) => state.transactions);
  return (
    <UserCardStyle>
      <TransactionsHeader>
        <TransactionsTitleIcon>
          <BackgroundIcons
            backColor="#948cfc36"
            sx={{
              minWidth: '50px',
              minHeight: '50px',
              '@media (max-width: 768px)': {
                minWidth: '30px',
                minHeight: '30px',
              } }}
          >
            <Avatar
              alt="Transactions"
              src={transactionsIcon}
              sx={{ width: '80%', height: '80%', margin: '0px auto' }}
            />
          </BackgroundIcons>
          <TransactionsTitle>
            <Typography
              variant="h5"
              sx={{ fontWeight: 'bold', marginLeft: '20px' }}
            >
              {t('home-page.latest-transactions')}
            </Typography>
            <Typography
              variant="h5"
              sx={{ fontWeight: 'bold',
                marginLeft: '20px',
                '@media (max-width: 400px)': {
                  fontSize: '1.1em',
                  minWidth: '110px',
                  marginLeft: '8px',
                } }}
            >
              {t('home-page.transactions')}
            </Typography>
          </TransactionsTitle>
        </TransactionsTitleIcon>
        <ViewAll onClick={() => { history.push(TRANSACTIONS_PATH); }}>
          <ViewAllText>
            {t('home-page.view-all')}
          </ViewAllText>
          <ViewAllArrow />
        </ViewAll>
      </TransactionsHeader>
      {
        // eslint-disable-next-line no-nested-ternary
        fetchingLatest ?
          (
            <TableSpinnerWrapper>
              <TableSpinner color="primary" />
            </TableSpinnerWrapper>
          )
          :
          latestTransactions && latestTransactions.length > 0 ?
            (
              <TableContainer>
                <Table sx={{ border: 'none' }} aria-label="simple table">
                  <TableBody>
                    {latestTransactions.map((transaction) => (
                      <TableRow
                        key={transaction.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <DateCell align="left">{moment(transaction.createdAt)?.format('DD/MM/YYYY')}</DateCell>
                        <NameCell align="left">{transaction.user ? transaction.user.firstname : t('home-page.account-deleted')}</NameCell>
                        <AmountCell align="right">
                          +&nbsp;
                          {priceFormatter.format(parseInt(transaction.amount, 10))}
                        </AmountCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )
            :
            (
              <NoTransactions>
                {t('home-page.no-transactions-available')}
              </NoTransactions>
            )
      }
    </UserCardStyle>
  );
};

export default TransactionsCard;
