import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useHistory } from 'react-router';
import {
  ButtonRemoveStyled,
  TotalMoneyStyled,
  IconHolderStyled,
} from '../ui/orderDetailsStyle';
import { paymentSlice } from '../slices/paymentSlice';
import { useAppDispatch } from '../../../store/hooks';
import { PAYMENT_PATH } from '../../../routes/path-constants';
import { priceFormatter } from '../../../common/formatter';
import {
  SeedIcon,
  GrowIcon,
  AccelerateIcon,
  DataIcon,
} from '../../../assets/icons';
import PackageTypeEnum from '../enum/package-type.enum';

const OrderDetailsTable = ({ checkoutDetails, discount }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const history = useHistory();

  const DISCOUNT_CODE = discount.percentage ?? discount.amountOff;
  const COUPON_NAME = discount.couponName;

  useEffect(() => {
    if (checkoutDetails == null || checkoutDetails.length === 0) {
      history.push(PAYMENT_PATH);
    }
  }, []);

  interface Row {
    name: string;
    qty: number;
    unit: number;
    price: number;
    discounted: boolean;
    productId: string;
  }

  function priceRow(qty: number, unit: number) {
    return qty * unit;
  }

  /* function discountPrice(price) {
    if (discount.percentage) {
      price -= price * (discount.percentage / 100);
    } else if (discount.amountOff) {
      price -= discount.amountOff;
    }

    return price;
  } */

  const discountSubTotal = (rows: Row[]): number => {
    let discountedProductsTotal = 0;

    if (discount.couponName) {
      rows.forEach((row) => {
        if (discount.products && discount?.products.length &&
            discount.products.some((item) => item === row.productId)) {
          discountedProductsTotal += row.price;
        } else if (!discount.products) {
          discountedProductsTotal += row.price;
        }
      });
      if (discount.percentage) {
        discountedProductsTotal *= (discount.percentage / 100);
      } else if (discount.amountOff) {
        discountedProductsTotal = discount.amountOff;
      }
    }

    return discountedProductsTotal;
  };

  function createRow(
    name: string,
    qty: number,
    unit: number,
    productId: string,
  ) {
    let price = priceRow(qty, unit);
    const discounted = false;

    /* if (discount.percentage || discount.amountOff) {
      if (discount?.products) {
        if (discount.products.some((prod) => prod === productId)) {
          price = discountPrice(price);
          discounted = true;
        }
      } else {
        price = discountPrice(price);
        discounted = true;
      }
    } */

    price = price < 0 ? 0 : price;
    return { name, qty, price, unit, discounted, productId };
  }

  function subtotal(items: readonly Row[]) {
    return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
  }

  const rows = [];
  if (checkoutDetails.length > 0) {
    checkoutDetails.forEach((detail) => {
      rows.push(createRow(detail.name, 1, detail.price, detail.productId));
    });
  }
  const removePackage = (name) => {
    dispatch(paymentSlice.actions.removeData(name));
  };

  const invoiceSubtotal = subtotal(rows);
  const invoiceTaxes = discountSubTotal(rows);
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
                  { row.discounted
                    ? `discounted (${discount.percentage ? `-${discount.percentage}%`
                      : `-${priceFormatter.format(discount.amountOff)}`
                    }) ` : null}
                  {priceFormatter.format(row.price)}
                  <ButtonRemoveStyled onClick={() => removePackage(row.name)}>
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
              <TotalMoneyStyled>
                {priceFormatter.format(invoiceSubtotal)}
              </TotalMoneyStyled>
            </TableCell>
          </TableRow>
          {DISCOUNT_CODE ? (
            <TableRow>
              <TableCell>
                <b>{t('account.discount')}</b>
                &nbsp;
                {COUPON_NAME}
              </TableCell>
              <TableCell align="right">
                {discount.percentage ? `${DISCOUNT_CODE.toFixed(0)}%` : priceFormatter.format(discount.amountOff)}
              </TableCell>
              <TableCell align="right">
                <TotalMoneyStyled>
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
              <TotalMoneyStyled>
                {priceFormatter.format(invoiceTotal)}
              </TotalMoneyStyled>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrderDetailsTable;
