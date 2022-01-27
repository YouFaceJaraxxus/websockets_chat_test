import React from 'react';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import TasksOverview from './TasksOverview';
import { UserCardStyle, CardHeader, BackgroundIcons } from '../DashboardStyle';
import { StatsCardStyled } from '../ui/StatsCardStyle';
import closedTasksIcon from '../../../assets/icons/closedTasks.svg';
import openTasksIcon from '../../../assets/icons/openTasks.svg';
import pendingTasksIcon from '../../../assets/icons/pendingTasks.svg';
import statsIcon from '../../../assets/icons/stats.svg';
import { useAppSelector } from '../../../store/hooks';

const StatsCard = ({ isAdmin }) => {
  const { t } = useTranslation();
  const stats = useAppSelector((state) => state.tasks.stats);
  return (
    <UserCardStyle>
      <CardHeader>
        <BackgroundIcons backColor="#948cfc36">
          <Avatar
            alt="Statistics"
            src={statsIcon}
            sx={{ width: '80%', height: '80%', margin: '0px auto' }}
          />
        </BackgroundIcons>
        <Typography
          variant="h5"
          sx={{ fontWeight: 'bold', marginLeft: '20px' }}
        >
          {isAdmin ? t('home-page.tasks-stats') : t('home-page.my-tasks-stats')}
        </Typography>
      </CardHeader>
      <StatsCardStyled>
        <TasksOverview
          myColor="#FF6A00"
          number={stats.openTasks}
          status={t('home-page.open-tasks')}
          icon={openTasksIcon}
        />
        <TasksOverview
          myColor="#948CFC"
          number={stats.pendingTasks}
          status={t('home-page.pending-tasks')}
          icon={pendingTasksIcon}
        />
        <TasksOverview
          myColor="#2ECC71"
          number={stats.closedTasks}
          status={t('home-page.closed-tasks')}
          icon={closedTasksIcon}
        />
      </StatsCardStyled>
    </UserCardStyle>
  );
};

export default StatsCard;
