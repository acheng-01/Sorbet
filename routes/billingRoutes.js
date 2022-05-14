const requireLogin = require('../middlewares/requireLogin');
const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeApiSecret);

module.exports = app => {
    app.post('/api/stripe', requireLogin, async (req, res) => {
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price: 'price_1KyPPwI3pV5nW5UuLhCgl2wq',
                    quantity: 1,
                },
            ],
            client_reference_id: req.user.googleID,
            mode: 'payment',
            success_url: `${keys.redirectDomain}/payment/success`,
            cancel_url: `${keys.redirectDomain}/payment/cancel`,
        });
        res.json({url: session.url});
    });
};