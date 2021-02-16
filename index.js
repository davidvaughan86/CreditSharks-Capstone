const express = require("express");
const app = express ();
const path = require("path");


// const helmet = require('helmet');

const morgan = require('morgan');
const es6Renderer = require('express-es6-template-engine');
const session = require('express-session');
// const FileStore = require('session-file-store')(session);

const logger = morgan('dev');

const loginRouter=require('./loginRouter')


app.use(session({
    // store: new FileStore(),  // no options for now
    secret: "secret",
    saveUninitialized: false,
    resave: true,
    rolling: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}));
app.engine('html', es6Renderer);
app.set('views', 'templates');
app.set('view engine', 'html');
// const server = http.createServer(app);



require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST)
app.use(express.json())

const bodyParser=require('body-parser')
const cors=require('cors')

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());

app.use('/login', loginRouter)



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