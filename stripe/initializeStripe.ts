import { Stripe, loadStripe } from "@stripe/stripe-js";

let stripePromise: Stripe | null;

const initialzeStripe = async () => {
    if (!stripePromise) {
        stripePromise = await loadStripe(
            "pk_live_51MB3mZCOMPrKhD3nyoEb3b1V4f5loehb8kjbITs817Uc06DI4VwvgDBYGhbUyAVa3BvqyGn1EU9sYmGIP5UxOvTv00t1H4CDHR"
        );
    }
    return stripePromise;

}

export default initialzeStripe;