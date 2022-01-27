import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  ComponentsHolder,
  BoxStyle,
  KnowledgeHeaderStyled,
  KnowledgeHeaderPStyled,
  IconBackground,
} from './KnowledgeStyle';
import { KnowledgeIcon } from '../../assets/icons/index';
import KnowledgeList from './components/knowledgeList';
import KnowledgeForm from './components/knowledgeForm';
import UserHeader from '../UserHeader/UserHeader';

const KnowledgeScreen = () => {
  const { t } = useTranslation();
  return (
    <BoxStyle>
      <UserHeader />
      <ComponentsHolder>
        <KnowledgeHeaderStyled>
          <IconBackground>
            <KnowledgeIcon />
          </IconBackground>
          <KnowledgeHeaderPStyled>
            {t('knowledge-bites.knowledge')}
          </KnowledgeHeaderPStyled>
        </KnowledgeHeaderStyled>
        <KnowledgeList />
        <KnowledgeForm />
      </ComponentsHolder>
    </BoxStyle>
  );
};

export default KnowledgeScreen;
