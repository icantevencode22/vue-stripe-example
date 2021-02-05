const stripe = require("stripe")(process.env.STRIPE_SECRET);
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

module.exports = function(api) {
  api.loadSource(({ addCollection }) => {
    // Use the Data Store API here: https://gridsome.org/docs/data-store-api/
  });

  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
  });

  api.configureServer((app) => {
    app.post("/create-payment-intent", jsonParser, async (req, res) => {
      const { amountInCents, currency } = req.body;
      // Create a PaymentIntent with the order amount and currency
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amountInCents,
        currency: currency,
      });

      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    });

    app.post("/create-customer", jsonParser, async (req, res) => {
      try {
        const { customer } = req.body;
        const result = await stripe.customers.create(customer);
        res.send({
          customer: result,
        });
      } catch (error) {
        res.send({
          customer: null,
        });
      }
    });

    app.post("/create-product", jsonParser, async (req, res) => {
      try {
        const { product } = req.body;
        const result = await stripe.products.create(product);
        res.send({
          product: result,
        });
      } catch (error) {
        res.send({
          product: null,
        });
      }
    });

    app.post("/create-price", jsonParser, async (req, res) => {
      try {
        const { price } = req.body;
        const result = await stripe.prices.create(price);
        res.send({
          price: result,
        });
      } catch (error) {
        res.send({
          price: null,
        });
      }
    });

    app.post("/create-subscription", jsonParser, async (req, res) => {
      const { paymentMethodId, customerId, orders } = req.body;
      try {
        await stripe.paymentMethods.attach(paymentMethodId, {
          customer: customerId,
        });

        await stripe.customers.update(customerId, {
          invoice_settings: {
            default_payment_method: paymentMethodId,
          },
        });

        const subscription = await stripe.subscriptions.create({
          customer: customerId,
          items: orders,
          expand: ["latest_invoice.payment_intent", "plan.product"],
        });

        res.send(subscription);
      } catch (error) {
        res.send({
          price: null,
        });
      }
    });

    app.get("/get-prices", jsonParser, async (req, res) => {
      try {
        const prices = await stripe.prices.list({
          limit: 20,
          active: true,
        });
        res.send(prices.data);
      } catch (error) {
        res.send([]);
      }
    });

    app.get("/get-products", jsonParser, async (req, res) => {
      try {
        const products = await stripe.products.list({
          limit: 20,
          active: true,
        });
        res.send(products.data);
      } catch (error) {
        res.send([]);
      }
    });

    app.get(
      "/get-subscription/:subscriptionId",
      jsonParser,
      async (req, res) => {
        try {
          const { subscriptionId } = req.params;
          const subscription = await stripe.subscriptions.retrieve(
            subscriptionId
          );
          res.send(subscription);
        } catch (error) {
          res.send([]);
        }
      }
    );

    app.post(
      "/update-subscription/:subscriptionId",
      jsonParser,
      async (req, res) => {
        try {
          const { subscriptionId } = req.params;
          const { subscription } = req.body;
          const resUpdate = await stripe.subscriptions.update(subscriptionId, {
            ...subscription,
          });
          res.send(resUpdate);
        } catch (error) {
          res.send(false);
        }
      }
    );

    app.post("/charge-token", jsonParser, async (req, res) => {
      try {
        const { stripeToken, amount, currency, description } = req.body;
        console.log("inside call", stripeToken, amount, currency, description);
        const charge = await stripe.charges.create({
          amount,
          currency,
          description,
          source: stripeToken.id,
        });
        console.log(charge, amount, currency, description);
        res.send({
          charge: charge,
        });
      } catch (error) {
        console.log('inside error')
        console.error(error)
        res.send({
          charge: null,
        });
      }
    });
  });
};
