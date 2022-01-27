import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Tooltip from '@mui/material/Tooltip';
import {
  LogoIcon,
  SeedIcon,
  GrowSeedIcon,
  GrowContactIcon,
  AddtaskIcon,
  GrowThumbUpIcon,
  PhoneIcon,
  EditIcon,
  TaskIcon,
  NavigateIcon,
  GrowIcon,
  AccelerateIcon,
  SettingsIcon,
  PersonIcon,
  SettingPhoneIcon,
} from '../../assets/icons';
import {
  CardStylePaymentStyled,
  PaymentHeaderStyled,
  PaymentHolderStyled,
  PaymentTabsHolderStyled,
  PaymentTextStyled,
  PaymentTitleStyled,
  PaymentOptionsHolderStyled,
  ButtonCheckoutStyled,
  ButtonCheckoutDisabledStyled,
} from './ui/paymentStyle';
import PaymentOptionCard from './components/PaymentOptionCard';
import AddonOptionCard from './components/AddonOptionCard';
import TableRevenueFlywheel from './components/TableRevenueFlywheel';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getSubscriptionsAsync, selectSubscriptions } from './slices/authSlice';
import { paymentSlice, resetSelectedProducts } from './slices/paymentSlice';
import { CHECKOUT_PATH } from '../../routes/path-constants';
import SubscriptionTypeEnum from './enum/subscription-type.enum';
import DefaultDescription from './components/DefaultDescription';
import {
  AddonOptionHolderStyled,
  AddonTitleStyled,
} from './ui/addonOptionCard';

const Payment = () => {
  const subscriptions = useAppSelector(selectSubscriptions);
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { t } = useTranslation();
  const [value, setValue] = useState('1');
  const [fetchingPackages, setFetchingPackages] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const [addonSelected, setAddonSelected] = useState(true);

  const setSelectedPackages = (newPackages) => {
    dispatch(paymentSlice.actions.setDataArray(newPackages));
    if (newPackages.type === SubscriptionTypeEnum.MONTHLY) {
      setAddonSelected(false);
    }
  };

  useEffect(() => {
    dispatch(resetSelectedProducts());
    dispatch(getSubscriptionsAsync()).then(() => {
      setFetchingPackages(true);
    });
  }, [dispatch]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleSubscriptions = () => {
    const monthlyPayment = [];
    const addOnPayment = [];
    subscriptions.forEach((subscription) => {
      if (subscription.type === SubscriptionTypeEnum.MONTHLY) {
        monthlyPayment.push(subscription);
      } else if (subscription.type === SubscriptionTypeEnum.ADDON) {
        addOnPayment.push(subscription);
      } else {
        return null;
      }
      return null;
    });
    return {
      monthlySubs: monthlyPayment.sort((a, b) => a.price - b.price),
      addOnPayment,
    };
  };

  const { monthlySubs, addOnPayment } = handleSubscriptions();
  const monthlyPaymentIcons = [<SeedIcon />, <GrowIcon />, <AccelerateIcon />];

  const monthlyOptions = [
    [
      {
        text: 'Initial 60-Point “Salesforce CRM Audit',
        icon: <EditIcon />,
      },
      {
        text: 'Initial One-to-One Kick Off Call with a Salesforce Expert',
        icon: <PhoneIcon />,
      },
      {
        text: '1 Open Active Task at a time',
        icon: <TaskIcon />,
      },
    ],
    [
      {
        text: 'Everything in Seed included',
        icon: <GrowSeedIcon />,
      },
      {
        text: '1 Initial Growth Plan Call with a dedicated Revenue Tech Stack Expert',
        icon: <GrowContactIcon />,
      },
      {
        text: '2 additional Open Active Task at a time',
        icon: <AddtaskIcon />,
      },
      {
        text: 'Dedicated Customer Success Manager',
        icon: <GrowThumbUpIcon />,
      },
    ],
    [
      {
        text: 'Everything in Grow included',
        icon: <GrowSeedIcon />,
      },
      {
        text: 'Monthly Impact Coaching Call with a dedicated Revenue Tech Stack Expert',
        icon: <GrowContactIcon />,
      },
      {
        text: '4 additional Open Active Task at a time',
        icon: <AddtaskIcon />,
      },
      {
        text: 'Recurring task set up',
        icon: <SettingsIcon />,
      },
      {
        text: 'Dedicated Customer Success Manager',
        icon: <PersonIcon />,
      },
      {
        text: 'Monthly architect call',
        icon: <SettingPhoneIcon />,
      },
    ],
  ];

  const myRef = useRef(null);
  const scrollToCheckout = () => {
    myRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'nearest',
    });
  };

  const proceedToCheckout = () => {
    history.push(CHECKOUT_PATH);
  };

  return (
    <PaymentHolderStyled>
      <LogoIcon />
      <CardStylePaymentStyled>
        <PaymentHeaderStyled>
          <PaymentTitleStyled>{t('payment.plan-pricing')}</PaymentTitleStyled>
          <PaymentTextStyled>
            {t('payment.plan-pricing-description')}
          </PaymentTextStyled>
        </PaymentHeaderStyled>
        <PaymentTabsHolderStyled>
          <TabContext value={value}>
            <Box>
              <TabList
                sx={{ transition: 'none' }}
                onChange={handleChange}
                aria-label="lab tabs"
                centered
              >
                <Tab label={t('account.the-revenue-flywheel')} value="1" />
              </TabList>
            </Box>
            <Box>
              <TabPanel value="1">
                <DefaultDescription />
                <PaymentOptionsHolderStyled>
                  {fetchingPackages ? (
                    <>
                      {monthlySubs.map((subscription, key) => {
                        return (
                          <PaymentOptionCard
                            key={subscription.id}
                            icon={monthlyPaymentIcons[key]}
                            name={subscription.name}
                            price={subscription.price}
                            options={monthlyOptions[key]}
                            subscription={subscription}
                            setSelectedPackages={setSelectedPackages}
                            setActiveCard={setActiveCard}
                            activeCard={activeCard}
                            scrollOnClick={scrollToCheckout}
                          />
                        );
                        return null;
                      })}
                    </>
                  ) : (
                    <p>{t('account.no-data')}</p>
                  )}
                </PaymentOptionsHolderStyled>
                <AddonOptionHolderStyled>
                  <AddonTitleStyled>{` ${t('account.add-on')} `}</AddonTitleStyled>
                  {addOnPayment.map((subscription) => (
                    <AddonOptionCard
                      addon={subscription}
                      setSelectedPackages={setSelectedPackages}
                    />
                  ))}
                </AddonOptionHolderStyled>
                {!addonSelected ? (
                  <ButtonCheckoutStyled
                    type="submit"
                    onClick={proceedToCheckout}
                    ref={myRef}
                  >
                    {t('account.proceed-to-checkout')}
                    <NavigateIcon />
                  </ButtonCheckoutStyled>
                ) : (
                  <Tooltip
                    title={t('account.no-package-selected')}
                    placement="top"
                    arrow
                  >
                    <ButtonCheckoutDisabledStyled ref={myRef} type="submit">
                      {t('account.proceed-to-checkout')}
                      <NavigateIcon />
                    </ButtonCheckoutDisabledStyled>
                  </Tooltip>
                )}
                <TableRevenueFlywheel />
              </TabPanel>
            </Box>
          </TabContext>
        </PaymentTabsHolderStyled>
      </CardStylePaymentStyled>
    </PaymentHolderStyled>
  );
};

export default Payment;
