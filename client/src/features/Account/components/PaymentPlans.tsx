import React, { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Tooltip from '@mui/material/Tooltip';
import { useTranslation } from 'react-i18next';
import {
  AccelerateIcon,
  AddtaskIcon,
  EditIcon,
  GrowContactIcon,
  GrowIcon,
  GrowSmallIcon,
  GrowSeedIcon,
  GrowThumbUpIcon,
  NavigateIcon,
  PersonIcon,
  PhoneIcon,
  SeedIcon,
  SettingPhoneIcon,
  SettingsIcon,
  TaskIcon,
} from '../../../assets/icons';
import {
  ButtonCheckoutDisabledStyled,
  ButtonCheckoutStyled,
  CardStylePaymentStyled,
  PaymentHolderStyled,
  PaymentOptionsHolderStyled,
  PaymentTabsHolderStyled,
} from './ui/PaymentStyle';
import PaymentOptionCard from './PaymentOptionCard';
import AddonOptionCard from './AddonOptionCard';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  getSubscriptionsAsync,
  selectSubscriptions,
} from '../../Auth/slices/authSlice';
import { paymentSlice, resetSelectedProducts } from '../../Auth/slices/paymentSlice';
import SubscriptionTypeEnum from '../enum/subscription-type.enum';
import DefaultDescription from './DefaultDescription';
import {
  AddonOptionHolderStyled,
  AddonTitleStyled,
} from './ui/AddonOptionCard';
import TableRevenueFlywheel from '../../Auth/components/TableRevenueFlywheel';

const CHECKOUT_PAGE = 'checkout';
const PaymentPlans = ({
  setCurrentSelectPlanPage,
  setDiscountModalOpen,
  discount,
}) => {
  const subscriptions = useAppSelector(selectSubscriptions);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [value, setValue] = useState('1');
  const [fetchingPackages, setFetchingPackages] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const selectedPackages = useAppSelector(
    (state) => state.payment.checkoutDetails,
  );

  const setSelectedPackages = (newPackages) => {
    dispatch(paymentSlice.actions.setDataArray(newPackages));
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

  const proceedToCheckout = () => {
    setCurrentSelectPlanPage(CHECKOUT_PAGE);
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
        text: t('monthly-options.initial-point'),
        icon: <EditIcon />,
      },
      {
        text: t('monthly-options.initial-one-to-one'),
        icon: <PhoneIcon />,
      },
      {
        text: t('monthly-options.one-open-active'),
        icon: <TaskIcon />,
      },
    ],
    [
      {
        text: t('monthly-options.in-seed'),
        icon: <GrowSeedIcon />,
      },
      {
        text: t('monthly-options.initail-growth'),
        icon: <GrowContactIcon />,
      },
      {
        text: t('monthly-options.two-additional'),
        icon: <AddtaskIcon />,
      },
      {
        text: t('monthly-options.dedicated'),
        icon: <GrowThumbUpIcon />,
      },
    ],
    [
      {
        text: t('monthly-options.in-grow'),
        icon: <GrowSmallIcon />,
      },
      {
        text: t('monthly-options.monthly-impact'),
        icon: <PhoneIcon />,
      },
      {
        text: t('monthly-options.four-additional'),
        icon: <AddtaskIcon />,
      },
      {
        text: t('monthly-options.recurring-task'),
        icon: <SettingsIcon />,
      },
      {
        text: t('monthly-options.dedicated-customer'),
        icon: <PersonIcon />,
      },
      {
        text: t('monthly-options.monthly-architect'),
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

  return (
    <PaymentHolderStyled>
      <CardStylePaymentStyled>
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
                            setDiscountModalOpen={setDiscountModalOpen}
                            discount={discount}
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
                  <AddonTitleStyled>
                    {' '}
                    {t('account.add-on')}
                    {' '}
                  </AddonTitleStyled>
                  {addOnPayment.map((subscription) => (
                    <AddonOptionCard
                      addon={subscription}
                      setSelectedPackages={setSelectedPackages}
                    />
                  ))}
                </AddonOptionHolderStyled>
                {selectedPackages.length ? (
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
                    <ButtonCheckoutDisabledStyled type="submit" ref={myRef}>
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

export default PaymentPlans;
