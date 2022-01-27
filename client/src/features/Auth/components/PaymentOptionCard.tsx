import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import {
  PaymentOptionStyled,
  OptionPriceStyled,
  OptionNameStyled,
  OptionImageHolderStyled,
  OptionValuesHolderStyled,
} from '../ui/paymentOptionCardStyle';
import { priceFormatter } from '../../../common/formatter';

const PaymentOptionCard = ({
  price,
  name,
  icon,
  options,
  subscription,
  setSelectedPackages,
  setActiveCard,
  activeCard,
  scrollOnClick,
}) => {
  const { t } = useTranslation();
  const addPackage = async () => {
    setActiveCard(subscription);
    scrollOnClick();
    await setSelectedPackages(subscription);
  };

  return (
    <PaymentOptionStyled
      className={activeCard?.name === name ? 'active' : null}
      onClick={addPackage}
    >
      <OptionImageHolderStyled>{icon}</OptionImageHolderStyled>
      <OptionNameStyled>{name}</OptionNameStyled>
      <OptionPriceStyled>
        {priceFormatter.format(price)}
        /mo
      </OptionPriceStyled>
      {options &&
        options.map((option) => (
          <OptionValuesHolderStyled>
            <div>{option.icon}</div>
            <p>{option.text}</p>
          </OptionValuesHolderStyled>
        ))}
      <Button variant="contained" type="submit">
        {t('account.select-package')}
      </Button>
    </PaymentOptionStyled>
  );
};

export default PaymentOptionCard;
