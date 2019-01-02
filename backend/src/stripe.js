//STRIPE_SECRET :secret key on website https://dashboard.stripe.com/account/apikeys
module.exports = require('stripe')(process.env.STRIPE_SECRET);
