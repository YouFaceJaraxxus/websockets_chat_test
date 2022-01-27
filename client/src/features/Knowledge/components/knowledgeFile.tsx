import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../../store/hooks';
import {
  KnowledgeItemStyled,
  KnowledgeSpanStyled,
  SingleKnowledgeStyle,
} from '../ui/knowledgeListStyle';
import knowBookIcon from '../../../assets/icons/knowBook.svg';
import { getAssetPresignedUrl } from '../../Dashboard/models/assets/AssetsService';
import { CardIconRed, DeleteCardIcon } from '../../../assets/icons';
import { IconWrapperPointer } from '../../Account/components/ui/MyCardsStyle';
import { openNotification } from '../../../components/notifications/model/globalNotificationSlice';
import ConfirmationDialog from '../../../components/confirmationDialog/confirmation';
import { deleteKnowledgeAsync } from '../models/knowledge/knowledgesSlice';

const KnowledgeFile = ({ knowledge }) => {
  const [link, setLink] = useState(null);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    dialogMessage: '',
    actionText: '',
    IconComponent: null,
    type: '',
    method: null,
  });
  const getLink = () => {
    if (knowledge.link != null) {
      setLink(knowledge.link);
    } else if (knowledge.assetId) {
      getAssetPresignedUrl(knowledge.assetId).then((response) => {
        setLink(response.preSignedUrl);
      });
    }
  };
  const openLink = () => {
    if (link) {
      window.open(link);
    }
  };
  const toggleNotification = (success: boolean, messageBody: string) => {
    if (success) {
      dispatch(
        openNotification({
          isOpen: true,
          messageBody,
          severity: 'success',
        }),
      );
    }
  };
  const closeConfirmKnowledgeDialog = () => {
    setConfirmDialog({
      ...confirmDialog,
      open: false,
    });
  };
  const deleteKnowledge = (knowledgeID) => {
    dispatch(deleteKnowledgeAsync(knowledgeID)).then((response) => {
      if (response.payload) {
        toggleNotification(true, t('knowledge-bites.knowledge-deleted'));
      }
    });
    closeConfirmKnowledgeDialog();
  };
  const openConfirmDeleteKnowledgeDialog = (knowledgeID) => {
    const confirmDialogConfig = {
      dialogMessage: t('knowledge-bites.knowledge-delete'),
      actionText: t('knowledge-bites.knowledge-delete-button'),
      IconComponent: CardIconRed,
      type: 'red',
      method: () => {
        deleteKnowledge(knowledgeID);
      },
    };
    setConfirmDialog({
      open: true,
      ...confirmDialogConfig,
    });
  };
  useEffect(() => {
    getLink();
  }, []);
  return (
    <SingleKnowledgeStyle myColor="white">
      <KnowledgeItemStyled>
        <Avatar
          alt="Knowledge Icon"
          src={knowBookIcon}
          sx={{ width: 25, height: 25, margin: '0px auto' }}
        />
        <KnowledgeSpanStyled onClick={openLink}>
          {knowledge.name}
        </KnowledgeSpanStyled>
        <IconWrapperPointer
          sx={{ width: '15%' }}
          onClick={() => {
            openConfirmDeleteKnowledgeDialog(knowledge.id);
          }}
        >
          <DeleteCardIcon />
        </IconWrapperPointer>
      </KnowledgeItemStyled>
      {confirmDialog.open && (
        <ConfirmationDialog
          isOpen={confirmDialog.open}
          handleAcceptConfirmation={confirmDialog.method}
          handleCloseConfirmation={closeConfirmKnowledgeDialog}
          confirmationTitle={confirmDialog.dialogMessage}
          icon={<confirmDialog.IconComponent />}
          approveText={confirmDialog.actionText}
          declineText={t('knowledge-bites.knowledge-cancel')}
          type={confirmDialog.type}
        />
      )}
    </SingleKnowledgeStyle>
  );
};

export default KnowledgeFile;
