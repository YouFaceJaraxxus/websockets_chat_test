import { Avatar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Regular,
  CommentWrapper,
  CommentHeader,
  CommentHeaderAvatar,
  CommentHeaderText,
  CommentBody,
  BolderError,
  RegularError,
  BolderPrimary,
  CommentDeleteActions,
  ApproveDeleteButton,
  DeclineDeleteButton,
  BolderSuccess,
  RegularSuccess,
  SpinnerWrapper,
  Spinner,
  Bolder,
  CommentDate,
} from '../ui/TaskOverviewModalStyle';
import account from '../../../assets/icons/account.svg';
import { CancelIcon, ChecksIcon } from '../../../assets/icons';
import { IconWrapper } from '../ui/SaveTaskModalStyle';
import { IComment } from '../models/comments/comment';
import { IDeleteRequest } from '../models/deleteRequests/deleteRequest';
import { getAssetPresignedUrl } from '../models/assets/AssetsService';
import { parseDate } from '../../../common/util';

const DELETE_REQUEST_TYPE = 'delete_request';
const DELETE_REQUEST_RESPONSE_TYPE = 'delete_response';
const MARKED_COMPLETED = 'marked_completed';
const COMMENT = 'comment';
const DELETE_ACCEPTED = 'delete_accepted';
const TASK_EDITED = 'task_edited';
const DELIMITER = '#';
const TaskOverviewComment = ({
  comment,
  user,
  confirmDeleteComment,
  rejectDeleteComment,
} :
{ comment: IComment | IDeleteRequest,
  user: any,
  confirmDeleteComment: (deleteRequestId: number) => any,
  rejectDeleteComment: (deleteRequestId: number) => any,
}) => {
  const sameUser = comment.userId === user.id;
  const { t } = useTranslation();
  if (sameUser) comment = { ...comment, user };
  const getUserName = () => (sameUser ? 'You' :
    `${comment.user.firstname} ${comment.user.lastname}`);

  const handleDeleteRequest = (accept: boolean) => {
    if (accept) {
      confirmDeleteComment(comment.id);
    } else {
      rejectDeleteComment(comment.id);
    }
  };

  const [createdByUserIcon, setCreatedByIcon] = useState({
    createdByIcon: null as string,
    fetchingCreatedBy: false,
  });

  const getUserIcon = () => {
    if (comment?.user?.profileImageId) {
      setCreatedByIcon({
        createdByIcon: '',
        fetchingCreatedBy: true,
      });
      getAssetPresignedUrl(comment.user.profileImageId)
        .then((presigned) => {
          setCreatedByIcon({
            createdByIcon: presigned.preSignedUrl,
            fetchingCreatedBy: false,
          });
        });
    }
  };

  const parseEditedItems = (text: string) => {
    const edits = text.split(DELIMITER);
    if (edits.length === 1) return edits[0];
    if (edits.length === 2) return `${edits[0]} ${t('home-page.and')} ${edits[1]}`;

    let editReturn = edits.slice(0, edits.length - 1).join(', ');
    editReturn += ` ${t('home-page.and')} ${edits[edits.length - 1]}`;
    return editReturn;
  };

  useEffect(() => {
    getUserIcon();
  }, []);

  const parseUserIcon = () => (
    // eslint-disable-next-line no-nested-ternary
    createdByUserIcon.createdByIcon ?
      createdByUserIcon.fetchingCreatedBy ?
        (
          <SpinnerWrapper>
            <Spinner color="primary" />
          </SpinnerWrapper>
        )

        :
        (
          <CommentHeaderAvatar backgroundColor="white" size="40px">
            <Avatar
              alt="Account Icon"
              src={createdByUserIcon.createdByIcon}
              sx={{ width: 30, height: 30, margin: '0px auto' }}
            />
          </CommentHeaderAvatar>
        )
      :
      (
        <CommentHeaderAvatar backgroundColor="#948cfc36" size="40px">
          <Avatar
            alt="Account Icon"
            src={account}
            sx={{ width: 30, height: 30, margin: '0px auto' }}
          />
        </CommentHeaderAvatar>
      ));

  const renderDate = (date: Date) => {
    const { result, shouldTranslate } = parseDate(date);
    return shouldTranslate ? t(result) : result;
  };

  return (

    (comment != null && user != null && comment.user != null) ? (
      <CommentWrapper>
        <CommentHeader>
          {
          parseUserIcon()
        }
          {comment.type === COMMENT && (
          <>
            <CommentHeaderText>
              <BolderPrimary>
                {`${getUserName()}  `}
              </BolderPrimary>
              <Regular>{sameUser ? t('home-page.commented') : t('home-page.left-you-a-comment')}</Regular>
            </CommentHeaderText>
            <CommentDate>
              {renderDate(comment.createdAt)}
            </CommentDate>
          </>
          )}

          {comment.type === TASK_EDITED && (
          <>
            <CommentHeaderText>
              <BolderPrimary>
                {`${getUserName()}  `}
              </BolderPrimary>
              <Regular>
                {t('home-page.changed')}
                {' '}
              </Regular>
              <Bolder>{parseEditedItems(comment.text)}</Bolder>
              <Regular>{comment.userId === user.id ? ` ${t('home-page.in-the-task')}` : ` ${t('home-page.in-your-task')}`}</Regular>
            </CommentHeaderText>
            <CommentDate>
              {renderDate(comment.createdAt)}
            </CommentDate>
          </>
          )}

          {comment.type === DELETE_REQUEST_TYPE && (
          <>
            <CommentHeaderText>
              <BolderError>
                {`${getUserName()} `}
              </BolderError>
              <RegularError>{t('home-page.requested-to-delete-this-task')}</RegularError>
            </CommentHeaderText>
            <CommentDate>
              {renderDate(comment.createdAt)}
            </CommentDate>
          </>
          )}

          {comment.type === MARKED_COMPLETED && (
          <>
            <CommentHeaderText>
              <BolderSuccess>
                {`${getUserName()} `}
              </BolderSuccess>
              <RegularSuccess>{t('home-page.marked-this-task-as')}</RegularSuccess>
              <BolderSuccess>
                {` ${t('home-page.completed')}`}
              </BolderSuccess>
            </CommentHeaderText>
            <CommentDate>
              {renderDate(comment.createdAt)}
            </CommentDate>
          </>
          )}

          {comment.type === DELETE_REQUEST_RESPONSE_TYPE && (
          <>
            <CommentHeaderText>
              <BolderPrimary>
                {`${getUserName()} `}
              </BolderPrimary>
              {comment.text === DELETE_ACCEPTED ? (
                <BolderSuccess>
                  {` ${t('home-page.accepted')} `}
                </BolderSuccess>
              ) : (
                <BolderError>
                  {` ${t('home-page.refused')} `}
                </BolderError>
              )}
              <Regular>{t('home-page.to-delete-this-task')}</Regular>
            </CommentHeaderText>
            <Regular sx={{ fontSize: '0.9em' }}>
              {renderDate(comment.createdAt)}
            </Regular>
          </>
          )}

        </CommentHeader>
        {comment.type === COMMENT && (
        <CommentBody sx={{ backgroundColor: '#FAFAFA', borderRadius: '5px' }}>
          <Regular sx={{ margin: 'auto', textAlign: 'left', width: '100%' }}>
            {comment.text}
          </Regular>
        </CommentBody>
        )}
        {user.isAdmin && comment.type === 'delete_request' && (
        <CommentDeleteActions>
          <ApproveDeleteButton sx={{ marginRight: '5%' }} onClick={() => { handleDeleteRequest(true); }}>
            <ChecksIcon color="#FFFFFF" />
            &nbsp;
            {t('home-page.approve')}
          </ApproveDeleteButton>
          <DeclineDeleteButton onClick={() => { handleDeleteRequest(false); }}>
            <IconWrapper>
              <CancelIcon color="#221F40" />
            </IconWrapper>
            &nbsp;
            {t('home-page.decline')}
          </DeclineDeleteButton>
        </CommentDeleteActions>
        )}
      </CommentWrapper>
    ) :
      null
  );
};
export default TaskOverviewComment;
