import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { ButtonRemoveStyled, TotalMoneyStyled, IconHolderStyled } from './ui/orderDetailsPlanStyle';
import { paymentSlice } from '../../Auth/slices/paymentSlice';
import { useAppDispatch } from '../../../store/hooks';
import { priceFormatter } from '../../../common/formatter';
import {
  SeedIcon,
  GrowIcon,
  AccelerateIcon,
  DataIcon,
} from '../../../assets/icons';
import PackageTypeEnum from '../../Auth/enum/package-type.enum';
import { getUserMonthlySubStripeData } from '../../Auth/services/paymentService';

const moment = require('moment');

const OrderDetailsTablePlan = ({ checkoutDetails, discount, updateType }:
{ checkoutDetails: any, discount: any, updateType: 'downgrade' | 'upgrade' }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const DISCOUNT_CODE = discount.percentage;
  const COUPON_NAME = discount.couponName;
  interface Row {
    name: string;
    qty: number;
    unit: number;
    price: number;
    productId: string;
    type: string;
  }
  const [monthlySubStripeData, setMonthlySubStripeData] = useState(null);

  useEffect(() => {
    getUserMonthlySubStripeData().then((response) => setMonthlySubStripeData(response));
  }, []);

  function upgradePrice(row: Row): number {
    if (monthlySubStripeData) {
      const { latest_invoice: { lines } } = monthlySubStripeData;

      const subscriptionPayment = lines.data.find((line) => line.type === 'subscription');

      const discountAmount = subscriptionPayment?.discount_amounts &&
    subscriptionPayment?.discount_amounts.length ?
        subscriptionPayment?.discount_amounts[0].amount : 0;
      const lastPaymentAmount = subscriptionPayment?.amount - discountAmount;

      const currentDate = moment(new Date()).unix();

      const timeRemaining = monthlySubStripeData.current_period_end - currentDate;

      const unusedTimeOnCurrent = (lastPaymentAmount * timeRemaining) / (60 * 60 * 24) / 100;
      let unusedTimeOnUpgrade = (row.price * timeRemaining) / (60 * 60 * 24);

      let discountable = false;

      if (discount.couponName) {
        if (discount.products && discount?.products.length &&
          discount.products.some((item) => item === row.productId)) {
          discountable = true;
        } else if (!discount.products) {
          discountable = true;
        }

        if (discountable) {
          if (discount.percentage) {
            unusedTimeOnUpgrade -= unusedTimeOnUpgrade * (discount.percentage / 100);
          }
        }
      }

      return unusedTimeOnUpgrade - unusedTimeOnCurrent;
    }

    return row.price;
  }

  function downgradePrice(row: Row): number {
    let discountedPrice = 0;

    if (discount.couponName) {
      if (discount.products && discount?.products.length &&
          discount.products.some((item) => item === row.productId)) {
        discountedPrice += row.price;
      } else if (!discount.products) {
        discountedPrice += row.price;
      }

      if (!discountedPrice) {
        return row.price;
      }
      if (discount.percentage) {
        discountedPrice *= (discount.percentage / 100);
      } else if (discount.amountOff) {
        discountedPrice = discount.amountOff;
      }
    }

    console.log(discountedPrice, 'downgrade');
    return row.price - discountedPrice;
  }

  const discountSubTotal = (rows: Row[]): number => {
    let discountedProductsTotal = 0;
    let updatedPrice = 0;

    rows.forEach((row) => {
      if (discount.products && discount?.products.length &&
            discount.products.some((item) => item === row.productId)) {
        if (!updateType || (updateType && row.type !== 'MONTHLY')) {
          discountedProductsTotal += row.price;
        } else if (updateType === 'upgrade' && row.type === 'MONTHLY') {
          updatedPrice += row.price;
        }
      } else if (!discount.products) {
        if (!updateType || (updateType && row.type !== 'MONTHLY')) {
          discountedProductsTotal += row.price;
        } else if (updateType === 'upgrade' && row.type === 'MONTHLY') {
          updatedPrice += row.price;
        }
      }
    });
    console.log(discountedProductsTotal);
    console.log(updatedPrice);

    if (discount.percentage) {
      discountedProductsTotal *= (discount.percentage / 100);
    } else if (discount.amountOff) {
      discountedProductsTotal = discount.amountOff;
    }

    return discountedProductsTotal;
  };

  function priceRow(qty: number, unit: number) {
    return qty * unit;
  }

  function createRow(
    name: string,
    qty: number,
    unit: number,
    productId: string,
    type: string,
  ): Row {
    const price = priceRow(qty, unit);
    const row: Row = {
      name,
      qty,
      price,
      unit,
      productId,
      type,
    };

    if (type === 'MONTHLY') {
      if (updateType === 'upgrade') {
        row.price = upgradePrice(row);
      } else if (updateType === 'downgrade') {
        row.price = downgradePrice(row);
      }
    }

    row.price = row.price < 0 && updateType !== 'upgrade' ? 0 : row.price;
    return row;
  }

  function subtotal(items: readonly Row[]) {
    let subtotalPrice = 0;

    items.forEach((row) => {
      console.log(row);
      if (!updateType || (updateType && row.type !== 'MONTHLY')) {
        subtotalPrice += row.price;
      } else if (updateType === 'upgrade' && row.type === 'MONTHLY') {
        subtotalPrice += row.price;
      }
    });

    return subtotalPrice;
  }

  const rows = [];
  if (checkoutDetails.length > 0) {
    checkoutDetails.forEach((detail) => {
      rows.push(createRow(detail.name, 1, detail.price, detail.productId, detail.type));
    });
  }
  const removePackage = (name) => {
    dispatch(paymentSlice.actions.removeData(name));
  };

  const invoiceSubtotal = subtotal(rows);
  const invoiceTaxes = discount.couponName ? discountSubTotal(rows) : 0;
  const invoiceTotal = invoiceSubtotal - invoiceTaxes;

  const checkPackageTypeIcon = (name) => {
    switch (name) {
      case PackageTypeEnum.SEED:
        return <SeedIcon />;
        break;
      case PackageTypeEnum.GROW:
        return <GrowIcon />;
        break;
      case PackageTypeEnum.ACCELERATE:
        return <AccelerateIcon />;
        break;
      default:
        return <DataIcon />;
    }
  };

  return (
    <TableContainer>
      <Table sx={{ minWidth: 500 }} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell>
              <b>{t('account.product')}</b>
            </TableCell>
            <TableCell align="right">
              <b>{t('account.quantity')}</b>
            </TableCell>
            <TableCell align="right">
              <b>{t('account.subtotal')}</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell>
                <IconHolderStyled>
                  {checkPackageTypeIcon(row.name)}
                  {row.name}
                </IconHolderStyled>
              </TableCell>
              <TableCell align="right">
                <b>{row.qty}</b>
              </TableCell>
              <TableCell align="right">
                <TotalMoneyStyled>
                  {updateType === 'downgrade' && row.type === 'MONTHLY' ? '(Billed next cycle) ' : null}
                  {updateType === 'upgrade' && row.type === 'MONTHLY' ? '(Calculated from remaining time) ' : console.log(row)}
                  {priceFormatter.format(row.price)}
                  <ButtonRemoveStyled
                    type="submit"
                    onClick={() => removePackage(row.name)}
                  >
                    x
                  </ButtonRemoveStyled>
                </TotalMoneyStyled>
              </TableCell>
            </TableRow>
          ))}
          <h2>{t('account.cart-totals')}</h2>
          <TableRow>
            <TableCell colSpan={2}>
              <b>{t('account.subtotal')}</b>
            </TableCell>
            <TableCell align="right">
              <TotalMoneyStyled>{priceFormatter.format(invoiceSubtotal)}</TotalMoneyStyled>
            </TableCell>
          </TableRow>
          {DISCOUNT_CODE && invoiceTaxes ? (
            <TableRow>
              <TableCell>
                <b>{t('account.discount')}</b>
                &nbsp;
                {COUPON_NAME}
              </TableCell>
              <TableCell align="right">
                {`${DISCOUNT_CODE.toFixed(0)}%`}
              </TableCell>
              <TableCell align="right">
                <TotalMoneyStyled>
                  -
                  {priceFormatter.format(invoiceTaxes)}
                </TotalMoneyStyled>
              </TableCell>
            </TableRow>
          ) : null}
          <TableRow>
            <TableCell colSpan={2}>
              <b>{t('account.total')}</b>
            </TableCell>
            <TableCell align="right">
              <TotalMoneyStyled>{priceFormatter.format(invoiceTotal)}</TotalMoneyStyled>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrderDetailsTablePlan;
