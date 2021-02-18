const express = require('express');
const app = express();


  
  
  // Set your secret key. Remember to switch to your live secret key in production.
  // See your keys here: https://dashboard.stripe.com/account/apikeys
  const stripe = require('stripe')(process.env.STRIPE_SECRET_TEST);
  
  app.post('/order/success', async (req, res) => {
    const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
    const customer = await stripe.customers.retrieve(session.customer);
  
    res.send(`<html><body><h1>Thanks for your order, ${customer.name}!</h1></body></html>`);
  });
  