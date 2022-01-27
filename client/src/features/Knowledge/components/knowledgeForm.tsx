import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import {
  ButtonSaveKnowledgeStyled,
  ButtonUploadStyle, DeleteButtonHolderStyled,
  InputFileStyle,
  InputLabelStyle,
  KnowledgeFormHolder,
  UploadedFilesStyle,
  UploadTextStyled,
  MissingFileOrAttachWrapper,
  FileName,
  AttachmentIconText,
  ClickToUploadText,
} from '../ui/knowledgeFormStyle';
import {
  AttachmentIcon,
  DeleteAttachmentIcon,
  UploadIcon,
} from '../../../assets/icons/index';
import AssetsRestrictionEnum from '../../Dashboard/models/assets/assetRestrictionEnum';
import { createAsset, deleteAsset, uploadAsset } from '../../Dashboard/models/assets/AssetsService';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { ICreateKnowledge } from '../models/createKnowledge';
import { createKnowledgeAsync } from '../models/knowledge/knowledgesSlice';
import { TableSpinner, TableSpinnerWrapper } from '../../Dashboard/ui/TableDataStyle';
import { openNotification } from '../../../components/notifications/model/globalNotificationSlice';
import { ALLOWED_FILE_TYPES, isAllowedFileType, MAX_FILE_SIZE } from '../../../common/util';

const KnowledgeForm = () => {
  const dispatch = useAppDispatch();
  const toggleNotification = (
    success: boolean,
    messageBody: string,
  ) => {
    dispatch(openNotification({
      isOpen: true,
      messageBody,
      severity: success ? 'success' : 'error',
    }));
  };
  interface IKnowledgeBite {
    id: number;
    preSigned: string;
    name: string;
  }
  const { t } = useTranslation();
  const { handleSubmit, control, setValue, getValues } = useForm();
  const [uploadedFile, setUploadedFile] = useState(null as {
    knowledgeBite: IKnowledgeBite,
    file: File,
  });
  const creating = useAppSelector((state) => state.knowledges.creating);
  const [isValidating, setIsValidating] = useState(false);
  const [linkError, setLinkError] = useState(true);
  const linkOrAttachRequired = () => isValidating && (uploadedFile == null && linkError);

  const knowledgeNameRequired = t('knowledge-bites.knowledge-name-required');
  const linkRequired = t('knowledge-bites.link-required');

  // without this, it's impossible to pick a same file twice in a row.
  const handleUploadClick = (event) => {
    event.target.value = null;
  };

  const handleUpload = (event) => {
    const file = event.target.files[0] as File;
    createAsset({
      mimetype: file.type,
      name: file.name,
      size: file.size,
      restriction: AssetsRestrictionEnum.FREE_FOR_ALL_USERS,
    }).then((addAssetResponse) => {
      if (uploadedFile) {
        deleteAsset(uploadedFile.knowledgeBite.id);
      }
      toggleNotification(true, t('knowledge-bites.asset-uploaded'));
      setUploadedFile({
        knowledgeBite: {
          id: addAssetResponse.asset.id,
          preSigned: addAssetResponse.preSignedUrl,
          name: file.name,
        },
        file,
      });
    });
  };

  const onSubmit = () => {
    const createKnowledgeBody = {
      name: getValues('name'),
    } as ICreateKnowledge;
    if (uploadedFile) {
      createKnowledgeBody.assetId = uploadedFile.knowledgeBite.id;
      const formData = new FormData();
      formData.append('file', uploadedFile.file);
      formData.append('presignedUrl', uploadedFile.knowledgeBite.preSigned);
      if (!isAllowedFileType(uploadedFile.file.type)) {
        dispatch(
          openNotification({
            isOpen: true,
            messageBody: t('account.invalid-file-format'),
            severity: 'error',
          }),
        );
      } else if (uploadedFile.file.size > MAX_FILE_SIZE) {
        dispatch(
          openNotification({
            isOpen: true,
            messageBody: t('account.file-too-large'),
            severity: 'error',
          }),
        );
      } else {
        uploadAsset(formData).catch(() => {
          deleteAsset(uploadedFile.knowledgeBite.id);
        });
      }
    } else {
      createKnowledgeBody.link = getValues('link');
    }
    dispatch(createKnowledgeAsync(createKnowledgeBody))
      .then((response) => {
        if (response.payload) {
          setIsValidating(false);
          setLinkError(true);
          setUploadedFile(null);
          setValue('name', '');
          setValue('link', '');
          dispatch(openNotification({
            isOpen: true,
            messageBody: t('knowledge-bites.knowledge-created'),
            severity: 'success',
          }));
        }
      });
  };

  const deleteUploadedFile = () => {
    deleteAsset(uploadedFile.knowledgeBite.id);
    setUploadedFile(null);
  };
  const renderInputTitle = () => {
    if (uploadedFile != null && uploadedFile.file != null) return uploadedFile.file.name;
    return t('home-page.no-file-chosen');
  };

  return (
    <KnowledgeFormHolder>
      <h2>{t('home-page.add-new-knowledge')}</h2>
      <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              value={value}
              error={!!error}
              helperText={error ? error.message : null}
              onChange={onChange}
              type="name"
              fullWidth
              label={t('knowledge-bites.knowledge-name')}
              id="outlined-basic"
            />
          )}
          rules={{
            ...(uploadedFile == null && { required: knowledgeNameRequired }),
          }}
        />
        {uploadedFile == null &&
        (
          <Controller
            name="link"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                value={value}
                error={!!error}
                helperText={error ? error.message : null}
                onChange={(e) => {
                  onChange(e);
                  if (e.target.value && e.target.value.length > 0) {
                    setLinkError(false);
                  } else {
                    setLinkError(true);
                  }
                }}
                type="link"
                fullWidth
                label={t('knowledge-bites.past-link-here')}
                id="outlined-basic"
              />
            )}
            rules={{
              ...(uploadedFile == null && { required: linkRequired }),
            }}
          />
        )}
        {uploadedFile == null && <h2>{t('knowledge-bites.or')}</h2>}
        <ButtonUploadStyle>
          <UploadTextStyled sx={{
            '@media (max-width:600px)': {
              justifyContent: 'flex-start',
            },
          }}
          >
            <AttachmentIcon />
            <AttachmentIconText>{t('knowledge-bites.attach-document')}</AttachmentIconText>
          </UploadTextStyled>
          <UploadTextStyled sx={{
            '@media (max-width:600px)': {
              justifyContent: 'flex-end',
            },
          }}
          >
            <ClickToUploadText>{t('knowledge-bites.click-to-upload')}</ClickToUploadText>
            <UploadIcon />
          </UploadTextStyled>
          <InputFileStyle
            onChange={(e) => { handleUpload(e); }}
            onClick={handleUploadClick}
            type="file"
            title={renderInputTitle()}
            id="inputKnowledge"
            accept={ALLOWED_FILE_TYPES.join(', ')}
          />
          <InputLabelStyle htmlFor="inputKnowledge" />
        </ButtonUploadStyle>
        {uploadedFile &&
           (
           <UploadedFilesStyle>
             <FileName>{uploadedFile.file.name}</FileName>
             <DeleteButtonHolderStyled onClick={deleteUploadedFile}>
               <DeleteAttachmentIcon />
             </DeleteButtonHolderStyled>
           </UploadedFilesStyle>
           )}
        {
             creating ?
               (
                 <TableSpinnerWrapper>
                   <TableSpinner color="primary" />
                 </TableSpinnerWrapper>
               )
               :
               (
                 <>
                   {
                    linkOrAttachRequired() && (
                      <MissingFileOrAttachWrapper>{linkRequired}</MissingFileOrAttachWrapper>
                    )
                  }
                   <ButtonSaveKnowledgeStyled type="submit" onClick={() => { setIsValidating(true); }}>
                     {t('knowledge-bites.save-knowledge')}
                   </ButtonSaveKnowledgeStyled>
                 </>
               )
           }
      </form>
    </KnowledgeFormHolder>
  );
};

export default KnowledgeForm;
