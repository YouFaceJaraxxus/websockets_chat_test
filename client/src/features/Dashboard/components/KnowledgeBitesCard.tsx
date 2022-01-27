import React from 'react';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import { UserCardStyle, CardHeader, BackgroundIcons } from '../DashboardStyle';
import KnowledgeBitesCardHolder from '../ui/KnowledgeBitesCardStyle';
import KnowledgeFile from './knowledgeFileCard';
import knowledgeIcon from '../../../assets/icons/knowledge.svg';
import { useAppSelector } from '../../../store/hooks';

const KnowledgeBitesCard = () => {
  const { t } = useTranslation();
  const knowledges = useAppSelector((state) => state.knowledges.knowledges);
  return (
    <UserCardStyle>
      <CardHeader>
        <BackgroundIcons backColor="#948cfc36">
          <Avatar
            alt="Knowledge Bites"
            src={knowledgeIcon}
            sx={{ width: '80%', height: '80%', margin: '0px auto' }}
          />
        </BackgroundIcons>
        <Typography
          variant="h5"
          sx={{ fontWeight: 'bold', marginLeft: '20px' }}
        >
          {t('home-page.knowledge-bites')}
        </Typography>
      </CardHeader>
      <KnowledgeBitesCardHolder>
        {
          knowledges &&
          knowledges
            .map((knowledge) => (
              <KnowledgeFile
                knowledge={knowledge}
                key={knowledge.id}
              />
            ))
        }
      </KnowledgeBitesCardHolder>
    </UserCardStyle>
  );
};

export default KnowledgeBitesCard;
