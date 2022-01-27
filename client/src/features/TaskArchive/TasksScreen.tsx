import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  ComponentsHolder,
  BoxStyle,
  UsersHeaderStyled,
  UsersHeaderPStyled,
  IconBackground,
} from './TasksStyle';
import { KnowledgeIcon } from '../../assets/icons/index';
import TasksTable from './components/tasksTable';
import UserHeader from '../UserHeader/UserHeader';

const TasksScreen = () => {
  const { t } = useTranslation();
  return (
    <BoxStyle>
      <UserHeader />
      <ComponentsHolder>
        <UsersHeaderStyled>
          <IconBackground>
            <KnowledgeIcon />
          </IconBackground>
          <UsersHeaderPStyled>
            {t('task-archive.task-archive')}
          </UsersHeaderPStyled>
        </UsersHeaderStyled>
        <TasksTable />
      </ComponentsHolder>
    </BoxStyle>
  );
};
export default TasksScreen;
