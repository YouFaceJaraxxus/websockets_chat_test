import React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {
  AddonPriceStyled,
  AddonsCheckboxesHolderStyled,
  LabelPriceHolderStyled,
} from './ui/AddonOptionCard';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { selectActiveSubscription } from '../../Auth/slices/authSlice';
import { priceFormatter } from '../../../common/formatter';
import { removeData } from '../../Auth/slices/paymentSlice';

const AddonOptionCard = ({ addon, setSelectedPackages }) => {
  const dispatch = useAppDispatch();
  const userActiveSubs = useAppSelector(selectActiveSubscription);
  const addPackage = async (e) => {
    if (e.target.checked) {
      await setSelectedPackages(addon);
    } else {
      await dispatch(removeData(addon.name));
    }
  };

  const isBought = userActiveSubs.some((item) => addon.id === item.id);

  return (
    <FormGroup sx={{ padding: '2%', width: '100%' }}>
      <AddonsCheckboxesHolderStyled>
        <LabelPriceHolderStyled>
          <FormControlLabel
            control={(
              <Checkbox
                defaultChecked={isBought}
                disabled={isBought}
                onChange={(e) => addPackage(e)}
              />
            )}
            label={`${addon.name} -`}
          />
          <AddonPriceStyled>{priceFormatter.format(addon.price)}</AddonPriceStyled>
        </LabelPriceHolderStyled>
      </AddonsCheckboxesHolderStyled>
    </FormGroup>
  );
};
export default AddonOptionCard;
