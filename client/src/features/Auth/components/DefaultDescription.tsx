import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  CloudIcon,
  ClockIcon,
  CheckCircleIcon,
  QuestionIcon,
  AllInclusiveIcon,
  AddtaskIcon,
} from '../../../assets/icons/index';
import {
  DefaultDescriptionHolderStyled,
  SingleDescriptionHolderStyled,
} from '../ui/defaultDescriptionStyled';

const DefaultDescription = () => {
  const { t } = useTranslation();
  const defaultOptions = [
    {
      text: t('default-description.any-task'),
      icon: <CloudIcon />,
    },
    {
      text: t('default-description.every-task'),
      icon: <CheckCircleIcon />,
    },
    {
      text: t('default-description.access'),
      icon: <ClockIcon />,
    },
    {
      text: t('default-description.qa-process'),
      icon: <QuestionIcon />,
    },
    {
      text: t('default-description.unlimited-ongoing'),
      icon: <AddtaskIcon />,
    },
    {
      text: t('default-description.unlimited-task'),
      icon: <AllInclusiveIcon />,
    },
  ];
  return (
    <DefaultDescriptionHolderStyled>
      {defaultOptions.map((option) => (
        <SingleDescriptionHolderStyled>
          <p>{option.icon}</p>
          <p>{option.text}</p>
        </SingleDescriptionHolderStyled>
      ))}
    </DefaultDescriptionHolderStyled>
  );
};

export default DefaultDescription;
