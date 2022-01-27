import React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {
  AddonPriceStyled,
  AddonsCheckboxesHolderStyled,
  LabelPriceHolderStyled,
} from '../ui/addonOptionCard';
import { priceFormatter } from '../../../common/formatter';
import { useAppDispatch } from '../../../store/hooks';
import { removeData } from '../slices/paymentSlice';

const AddonOptionCard = ({
  addon,
  setSelectedPackages,
}) => {
  const dispatch = useAppDispatch();
  const addPackage = async (e) => {
    if (e.target.checked) {
      await setSelectedPackages(addon);
    } else {
      await dispatch(removeData(addon.name));
    }
  };

  return (
    <FormGroup sx={{ padding: '2%', width: '100%' }}>
      <AddonsCheckboxesHolderStyled>
        <LabelPriceHolderStyled>
          <FormControlLabel
            control={<Checkbox onChange={(e) => addPackage(e)} />}
            label={`${addon.name} -`}
          />
          <AddonPriceStyled>{priceFormatter.format(addon.price)}</AddonPriceStyled>
        </LabelPriceHolderStyled>
      </AddonsCheckboxesHolderStyled>
    </FormGroup>
  );
};
export default AddonOptionCard;
