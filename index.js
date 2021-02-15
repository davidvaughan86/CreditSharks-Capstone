const express = require("express");
const app = express ();
const path = require("path");



require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST)
app.use(express.json())

const bodyParser=require('body-parser')
const cors=require('cors')

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());



app.use(express.static(path.join(__dirname, "public")));


app.post("/api/stripe/charge", cors(), async (req, res) => {
    console.log("stripe-routes.js 9 | route reached", req.body);
    let { amount, id } = req.body;
    console.log("stripe-routes.js 10 | amount and id", amount, id);
    try {
      const payment = await stripe.paymentIntents.create({
        amount: amount,
        currency: "USD",
        description: "Your Company Description",
        payment_method: id,
        confirm: true,
      });
      console.log("stripe-routes.js 19 | payment", payment);
      res.json({
        message: "Payment Successful",
        success: true,
      });
    } catch (error) {
      console.log("stripe-routes.js 17 | error", error);
      res.json({
        message: "Payment Failed",
        success: false,
      });
    }
  });



const port = process.env.PORT || 4000;
app.listen(port, () => 
console.log(`listening on port ${port}`));