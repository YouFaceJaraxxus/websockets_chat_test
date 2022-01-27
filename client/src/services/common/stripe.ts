import { loadStripe } from '@stripe/stripe-js';
import { get } from '../../configuration';

const config = get();
const PUBLIC_KEY = config.STRIPE_PUBLIC_KEY;
const stripeTestPromise = loadStripe(PUBLIC_KEY);

export default stripeTestPromise;
