import React from 'react';
import { FallbackSpinnerWrapper, FallbackSpinner } from './FallbackStyle';

function Fallback() {
  return (
    <FallbackSpinnerWrapper>
      <FallbackSpinner color="primary" />
    </FallbackSpinnerWrapper>
  );
}

export default Fallback;
