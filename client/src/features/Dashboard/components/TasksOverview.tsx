import React from 'react';
import Avatar from '@mui/material/Avatar';
import SingleItem from '../ui/SingleItemStyle';
import { BackgroundIcons } from '../DashboardStyle';
import {
  NumberSpan,
  StatusSpan,
  TasksOverviewIconStatus,
} from '../ui/StatsCardStyle';

const TasksOverview = ({ myColor, number, status, icon }) => (
  <SingleItem myColor={myColor}>
    <TasksOverviewIconStatus>
      <BackgroundIcons backColor="#ffffff36">
        <Avatar
          alt="Task Overview"
          src={icon}
          sx={{ width: '80%', height: '80%', margin: '0px auto' }}
        />
      </BackgroundIcons>
      <StatusSpan>{status}</StatusSpan>
    </TasksOverviewIconStatus>
    <NumberSpan>{number}</NumberSpan>
  </SingleItem>
);

export default TasksOverview;
