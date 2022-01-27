import dotenv from 'dotenv';

dotenv.config();

const {
  REACT_APP_API_BASE_URL: API_BASE_URL,
  REACT_APP_STRIPE_PUBLIC_KEY: STRIPE_PUBLIC_KEY,
} = process.env;

export default {
  API_BASE_URL,
  STRIPE_PUBLIC_KEY,
};
