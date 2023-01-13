import Stripe from "stripe";
import algoliasearch from "algoliasearch";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const stripe = new Stripe(useRuntimeConfig().stripeSecret, {
    apiVersion: "2022-11-15",
  });

  const checkout = await stripe.checkout.sessions.create({
    cancel_url: "http://localhost:3000",
    success_url: "http://localhost:3000",
    mode: "payment",
    line_items: [
      {
        quantity: body.nights,
        price: "price_1MPfvYJZSynvim72KeEvxR8F",
      },
    ],
  });

  return checkout;
});
