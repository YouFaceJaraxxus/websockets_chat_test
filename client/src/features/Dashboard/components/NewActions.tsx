import * as React from 'react';
import { NewActionsIcon } from '../../../assets/icons';
import { CountBadge, NewActionsWrapper } from '../ui/NewActionsStyle';

const NewActions = ({ value }) => (
  <NewActionsWrapper>
    <NewActionsIcon />
    <CountBadge>
      {value}
    </CountBadge>
  </NewActionsWrapper>
);
export default NewActions;
