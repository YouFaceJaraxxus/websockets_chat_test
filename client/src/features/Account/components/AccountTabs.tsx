import * as React from 'react';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useAppSelector } from '../../../store/hooks';
import { selectUser } from '../../Auth/slices/authSlice';
import AccountPersonalInformation from './AccountPersonalInformation';
import AccountPaymentDetails from './AccountPaymentDetails';
import AccountTransactions from './AccountTransactions';
import AccountPlan from './AccountPlan';

const AccountTabs = () => {
  const { t } = useTranslation();
  const user = useAppSelector(selectUser);
  const history = useHistory();
  const route = history.location?.pathname;
  // eslint-disable-next-line no-nested-ternary
  const [value, setValue] = React.useState(route &&
    route.endsWith('/plan') ? '3' :
    route && route.endsWith('/myPayments') ? '2'
      : '1');
  const { isAdmin } = user;

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const renderBorderBottom = (selectedTab: string) => {
    if (value === selectedTab) return '2px #948CFC solid';
    return 'none';
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1', overflowX: 'hidden' }}>
      <TabContext value={value}>
        <Box sx={{ '&>div>div>div': {
          overflowX: 'scroll',
          overflowY: 'hidden',
          scrollbarColor: 'white white',
          '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
            backgroundColor: 'none',
            width: 0,
            height: 0,
            opacity: 0,
          },
          '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
            backgroundColor: 'white',
            opacity: 0,
          },
          '&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus':
              {
                backgroundColor: 'white',
                opacity: 0,
              },
          '&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active':
              {
                backgroundColor: 'white',
                opacity: 0,
              },
          '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover':
              {
                backgroundColor: 'white',
                opacity: 0,
              },
          '&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner': {
            backgroundColor: 'white',
            opacity: 0,
          },
        } }}
        >
          {isAdmin ? (
            <>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label={t('account.personal-informations')} sx={{ fontWeight: 'bold' }} value="1" />
              </TabList>
            </>
          ) : (
            <>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
                sx={{
                  '& > div > span': {
                    display: 'none',
                  },
                }}
              >
                <Tab
                  label={t('account.personal-informations')}
                  value="1"
                  sx={{
                    borderBottom: renderBorderBottom('1'),
                  }}
                />
                <Tab
                  label={t('account.payment-details')}
                  value="2"
                  sx={{
                    borderBottom: renderBorderBottom('2'),
                  }}
                />
                <Tab
                  label={t('account.my-plan')}
                  value="3"
                  sx={{
                    borderBottom: renderBorderBottom('3'),
                  }}
                />
                <Tab
                  label={t('account.transactions')}
                  value="4"
                  sx={{
                    borderBottom: renderBorderBottom('4'),
                  }}
                />
              </TabList>
            </>
          )}
        </Box>
        <TabPanel value="1"><AccountPersonalInformation /></TabPanel>
        <TabPanel value="2"><AccountPaymentDetails type="single" /></TabPanel>
        <TabPanel value="3"><AccountPlan /></TabPanel>
        <TabPanel value="4" sx={{ padding: '0 !important' }}><AccountTransactions /></TabPanel>
      </TabContext>
    </Box>
  );
};

export default AccountTabs;
