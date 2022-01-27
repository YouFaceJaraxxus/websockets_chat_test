import React from 'react';
import { useTranslation } from 'react-i18next';
import { TableStyled, TableTdStyled } from '../ui/paymentStyle';
import { CheckmarkIcon, XmarkIcon } from '../../../assets/icons';

const TableRevenueFlywheel = () => {
  const { t } = useTranslation();
  return (
    <div>
      <TableStyled>
        <tr>
          <th style={{ color: 'white' }}>none</th>
          <th>{t('revenue.seed')}</th>
          <th>{t('revenue.grow')}</th>
          <th>{t('revenue.accelerate')}</th>
        </tr>
        <tr>
          <TableTdStyled>{t('revenue.business-process')}</TableTdStyled>
          <td>
            <CheckmarkIcon />
          </td>
          <td>
            <CheckmarkIcon />
          </td>
          <td>
            <CheckmarkIcon />
          </td>
        </tr>
        <tr>
          <TableTdStyled>{t('revenue.productivity')}</TableTdStyled>
          <td>
            <CheckmarkIcon />
          </td>
          <td>
            <CheckmarkIcon />
          </td>
          <td>
            <CheckmarkIcon />
          </td>
        </tr>
        <tr>
          <TableTdStyled>{t('revenue.analytics')}</TableTdStyled>
          <td>
            <CheckmarkIcon />
          </td>
          <td>
            <CheckmarkIcon />
          </td>
          <td>
            <CheckmarkIcon />
          </td>
        </tr>
        <tr>
          <TableTdStyled>{t('revenue.intelligence')}</TableTdStyled>
          <td>
            <XmarkIcon />
          </td>
          <td>
            <CheckmarkIcon />
          </td>
          <td>
            <CheckmarkIcon />
          </td>
        </tr>
        <tr>
          <TableTdStyled>{t('revenue.customer')}</TableTdStyled>
          <td>
            <XmarkIcon />
          </td>
          <td>
            <XmarkIcon />
          </td>
          <td>
            <CheckmarkIcon />
          </td>
        </tr>
        <tr>
          <TableTdStyled>{t('revenue.custom-applications')}</TableTdStyled>
          <td>
            <XmarkIcon />
          </td>
          <td>{t('revenue.up-to')}</td>
          <td>{t('revenue.unlimited')}</td>
        </tr>
        <tr>
          <TableTdStyled>{t('revenue.data-management')}</TableTdStyled>
          <td>
            <CheckmarkIcon />
          </td>
          <td>
            <CheckmarkIcon />
          </td>
          <td>
            <CheckmarkIcon />
          </td>
        </tr>
        <tr>
          <TableTdStyled>{t('revenue.general-configuration')}</TableTdStyled>
          <td>
            <CheckmarkIcon />
          </td>
          <td>
            <CheckmarkIcon />
          </td>
          <td>
            <CheckmarkIcon />
          </td>
        </tr>
      </TableStyled>
    </div>
  );
};

export default TableRevenueFlywheel;
