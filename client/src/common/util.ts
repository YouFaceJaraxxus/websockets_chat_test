import moment from 'moment';

const fiveMinInMilis = 5 * 60 * 1000;
const sixMinInMilis = 6 * 60 * 1000;
const GLOBAL_ERROR = 'GLOBAL_ERROR';
export const parseDate = (date: Date): { result: string, shouldTranslate: boolean } => {
  const cmpDate = new Date(date);
  const now = new Date();
  const diff = now.getTime() - cmpDate.getTime();
  if (cmpDate.toLocaleDateString() === now.toLocaleDateString()) {
    if (diff < fiveMinInMilis) return { result: 'date.lt5min', shouldTranslate: true };
    if (diff < sixMinInMilis) return { result: 'date.5min', shouldTranslate: true };
    return { result: 'date.today', shouldTranslate: true };
  }
  cmpDate.setDate(cmpDate.getDate() + 1);
  if (cmpDate.toLocaleDateString() === now.toLocaleDateString()) return { result: 'date.yesterday', shouldTranslate: true };
  return { result: moment(cmpDate).format('DD/MM/YYYY'), shouldTranslate: false };
};

export const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const getErrorMessage = (errorBody) => {
  if (errorBody.message) {
    const entries = Object.entries(errorBody.message);
    if (entries && entries.length > 0) {
      const err = entries[0];
      if (err && err.length > 1) {
        const errorType = err[0];
        if (errorType === 'size') return 'size';
        const errorMsgArray = err[1] as any;
        if (errorMsgArray && errorMsgArray.length > 0) {
          return errorMsgArray[0].message;
        }
      }
    }
  } return GLOBAL_ERROR;
};

export const getCookie = (name: string) => document.cookie.split(';').some((c) => c.trim().startsWith(`${name}=`));
export const deleteCookie = (name: string, path = null, domain = null) => {
  if (getCookie(name)) {
    document.cookie = `${name}=${
      (path) ? `;path=${path}` : ''
    }${(domain) ? `;domain=${domain}` : ''
    };expires=Thu, 01 Jan 1970 00:00:01 GMT`;
  }
};
export const MAX_FILE_SIZE = 3145728;
export const ALLOWED_FILE_TYPES = [
  'image/png',
  'image/jpeg',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain',
  'image/gif',
  'text/csv',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
];
export const ALLOWED_IMAGE_TYPES = [
  'image/png',
  'image/jpeg',
  'image/gif',
];

export const isAllowedFileType = (fileType: string) => ALLOWED_FILE_TYPES.includes(fileType);
export const isAllowedImageType = (imageType: string) => ALLOWED_IMAGE_TYPES.includes(imageType);

export default {};
