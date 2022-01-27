import React, { FC } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import { ACCOUNT_PLAN_PATH, ADMIN, ALL_WORKS, DASHBOARD_PATH, FAILED_PAY, getUserLevel, LOGIN_PATH, NOT_CHECKED, NOT_VERIFIED_OR_BLOCKED, NO_SUBS, PAYMENT_PATH, PERSONALINFORMATION_PATH, VERIFIED } from './path-constants';
import { IUser } from '../features/Auth/models/user/user';
import Fallback from '../features/Fallback/Fallback';

interface ProtectedRouteProps {
  path: string;
  exact: boolean;
  protectionLevel: number;
  component: FC;
}

const switchAccess = (user: IUser, userLevel: number) => {
  switch (userLevel) {
    case (ADMIN): {
      if (user.isLogged) return <Redirect to={DASHBOARD_PATH} />;
      return <Redirect to={LOGIN_PATH} />;
    }
    case (ALL_WORKS): {
      if (user.isLogged) return <Redirect to={DASHBOARD_PATH} />;
      return <Redirect to={LOGIN_PATH} />;
    }
    case (FAILED_PAY): {
      if (user.isLogged) return <Redirect to={ACCOUNT_PLAN_PATH} />;
      return <Redirect to={PAYMENT_PATH} />;
    }
    case (NO_SUBS): {
      return <Redirect to={PAYMENT_PATH} />;
    }
    case (VERIFIED): {
      return <Redirect to={PERSONALINFORMATION_PATH} />;
    }
    default: {
      return <Redirect to={PAYMENT_PATH} />;
    }
  }
};

// TODO Implement case-specific logic
export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  path,
  exact,
  protectionLevel,
  component: Component,
}) => {
  const { user, checkedSession } = useAppSelector((state) => state.auth);
  const userLevel = getUserLevel(user, checkedSession);
  return (
    <Route
      path={path}
      exact={exact}
      render={() => {
        if (userLevel === NOT_CHECKED) return <Fallback />;
        if (protectionLevel === NOT_VERIFIED_OR_BLOCKED) {
          if (userLevel === NOT_VERIFIED_OR_BLOCKED) return <Component />;
          return switchAccess(user, userLevel);
        }
        if (protectionLevel === VERIFIED) {
          if (userLevel === NOT_VERIFIED_OR_BLOCKED) return <Redirect to={LOGIN_PATH} />;
          if (userLevel === VERIFIED) return <Component />;
          return switchAccess(user, userLevel);
        }
        if (protectionLevel === NO_SUBS) {
          if (userLevel === NOT_VERIFIED_OR_BLOCKED) return <Redirect to={LOGIN_PATH} />;
          if (userLevel === VERIFIED) return <Redirect to={PERSONALINFORMATION_PATH} />;
          if (userLevel === NO_SUBS) return <Component />;
          return switchAccess(user, userLevel);
        }
        if (protectionLevel === FAILED_PAY) {
          if (userLevel === NOT_VERIFIED_OR_BLOCKED) return <Redirect to={LOGIN_PATH} />;
          if (userLevel === VERIFIED) return <Redirect to={PERSONALINFORMATION_PATH} />;
          if (userLevel === NO_SUBS) return <Redirect to={PAYMENT_PATH} />;
          if (userLevel === FAILED_PAY) {
            if (user.isLogged) return <Component />;
            return <Redirect to={PAYMENT_PATH} />;
          }
          if (userLevel === ALL_WORKS || userLevel === ADMIN) {
            return <Component />;
          }
        }
        if (protectionLevel === ALL_WORKS) {
          if (userLevel === NOT_VERIFIED_OR_BLOCKED) return <Redirect to={LOGIN_PATH} />;
          if (userLevel === VERIFIED) return <Redirect to={PERSONALINFORMATION_PATH} />;
          if (userLevel === NO_SUBS) return <Redirect to={PAYMENT_PATH} />;
          if (userLevel === FAILED_PAY) {
            if (user.isLogged) return <Redirect to={ACCOUNT_PLAN_PATH} />;
            return <Redirect to={PAYMENT_PATH} />;
          }
          if (userLevel === ALL_WORKS || userLevel === ADMIN) return <Component />;
          return <Redirect to={DASHBOARD_PATH} />;
        }
        if (protectionLevel === ADMIN) {
          if (userLevel === NOT_VERIFIED_OR_BLOCKED) return <Redirect to={LOGIN_PATH} />;
          if (userLevel === VERIFIED) return <Redirect to={PERSONALINFORMATION_PATH} />;
          if (userLevel === NO_SUBS) return <Redirect to={PAYMENT_PATH} />;
          if (userLevel === FAILED_PAY) {
            if (user.isLogged) return <Redirect to={ACCOUNT_PLAN_PATH} />;
            return <Redirect to={PAYMENT_PATH} />;
          }
          if (userLevel === ALL_WORKS) return <Redirect to={DASHBOARD_PATH} />;
          if (userLevel === ADMIN) return <Component />;
        }
        return <Component />;

        return switchAccess(user, userLevel);
      }}
    />
  );
};

export default ProtectedRoute;
