import React from 'react';
import { TableStyled, TableTdStyled } from '../ui/paymentStyle';
import { CheckmarkIcon, XmarkIcon } from '../../../assets/icons';

const TableGetTraction = () => (
  <div>
    <TableStyled>
      <tr>
        <th style={{ color: 'white' }}>none</th>
        <th>Out of the Box</th>
        <th>Scaling </th>
        <th>Customer 360</th>
      </tr>
      <tr>
        <TableTdStyled>Business Process Automation</TableTdStyled>
        <td>
          <XmarkIcon />
        </td>
        <td>Up to 3</td>
        <td>Unlimited</td>
      </tr>
      <tr>
        <TableTdStyled>Productivity & Collaboration</TableTdStyled>
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
        <TableTdStyled>Analytics</TableTdStyled>
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
        <TableTdStyled>Intelligence</TableTdStyled>
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
        <TableTdStyled>Customer 360</TableTdStyled>
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
        <TableTdStyled>Custom Applications & Integrations</TableTdStyled>
        <td>
          <XmarkIcon />
        </td>
        <td>Up to 3</td>
        <td>Unlimited</td>
      </tr>
      <tr>
        <TableTdStyled>Data Management & CRM Hygiene</TableTdStyled>
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
        <TableTdStyled>General configuration</TableTdStyled>
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

export default TableGetTraction;
