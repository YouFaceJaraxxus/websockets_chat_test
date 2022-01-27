/* eslint-disable no-nested-ternary */
import { Avatar } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { IUser } from '../../Auth/models/user/user';
import { TaskListUserWrapper } from '../ui/TaskListUserStyle';
import account from '../../../assets/icons/account.svg';
import { getAssetPresignedUrl } from '../models/assets/AssetsService';

const TaskListUser = ({ user, type } : { user: IUser, type:'createdBy' | 'assignedTo' }) => {
  const { t } = useTranslation();
  const [userImage, setUserImage] = useState({
    imgSrc: null,
    loading: false,
  });

  const getUserIcon = () => {
    if (user && user.profileImageId) {
      setUserImage({
        ...userImage,
        loading: true,
      });
      getAssetPresignedUrl(user.profileImageId)
        .then((presigned) => {
          setUserImage({
            imgSrc: presigned.preSignedUrl,
            loading: false,
          });
        }).catch(() => {
          setUserImage({
            imgSrc: null,
            loading: false,
          });
        });
    }
  };

  useEffect(() => {
    getUserIcon();
  }, []);

  return (
    user ? (
      <TaskListUserWrapper>
        {
          userImage.imgSrc ?
            (
              <Avatar
                alt="Account Icon"
                src={userImage.imgSrc}
                sx={{ width: 30, height: 30, margin: 'auto 5% auto 0' }}
              />
            ) :
            (
              <Avatar
                alt="Account Icon"
                src={account}
                sx={{ width: 30, height: 30, margin: 'auto 5% auto 0' }}
              />
            )
        }
        {user.firstname}
        {' '}
        {user.lastname}
      </TaskListUserWrapper>
    )
      : (
        <TaskListUserWrapper>
          {
            type === 'createdBy' ? t('home-page.account-deleted') : t('home-page.unassigned')
          }
        </TaskListUserWrapper>
      )
  );
};
export default TaskListUser;
