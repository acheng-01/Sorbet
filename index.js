const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
const stripe = require('stripe')(keys.stripeApiSecret);
require('./models/User');
require('./models/Survey');
require('./services/passport');

mongoose.connect(keys.mongoURI);
const User = mongoose.model('users');

const app = express();

/*  This particular webhook route is placed here due to a bodyParser error when it is placed after
    bodyParser.json is called as a middleware */

app.post('/api/stripe/webhook', bodyParser.raw({type: 'application/json'}), async (req, res) => {
    const sig = req.headers['stripe-signature'];

    let event;

    try {
        event = await stripe.webhooks.constructEvent(req.body, sig, keys.stripeEndpointSecret);
    } catch (err) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
        const user = await User.findOneAndUpdate({ googleID: event.data.object.client_reference_id }, { $inc: { credits: 5 }});
        user.save();
    }

    res.status(200).end();
});

app.use(bodyParser.json());
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
)
app.use(morgan((keys.NODE_ENV === 'production') ? 'tiny' : 'common' ));
app.use(cors());
app.use(helmet({
    contentSecurityPolicy: false,
}))
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5001;
app.listen(PORT);