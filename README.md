# Sorbet
Link to live app: https://stormy-fjord-11394.herokuapp.com/

## Overview
Sorbet is a RESTful web application that allows users to create their own surveys and mass distribute them to participants for
feedback. It also uses a credit system that keeps track of user credits, which enables the user to send the surveys. Javascript
is used as the coding language for this app.

![](https://github.com/acheng-01/Sorbet/blob/main/Sorbet-Sample.gif)

On the client side, ReactJS is used as the primary library for faster rendering, generated through Create-React-App. A few other
technologies used on the client side include:
- Redux (for app-wide state management)
- React Router v6 (for routing related actions)
- Axios (for fetch request handling)

On the server side, NodeJS is used with Express as its framework. The server side takes care of user authentication, database
changes, Stripe Checkout payments, and email distrbution via Twilio's Sendgrid API. Webhooks are used for the latter two
technologies to obtain notifications that a user has successfully made a payment and (for each user) that a participant has
clicked on a response in an email survey that was sent.

MongoDB is chosen for this app for practice with a NoSQL database management system. Mongoose is used to connect with MongoDB
to make changes to data.

## Limitations
Currently for this MVP, each user of this app is only able to send out one yes or no question to their participants.
In addition, users only have one option for authentication: Google Oauth.

Future expansion for this app might include:
- Allowing sorting of the list of surveys displayed on the dashboard with certain criteria such as date added, name, or number
of responses.
- Incorporating other methods of authentication, such as JWTs for non-Oauth related local authentication (i.e. email and
password).
- Allowing users to create a form using an API such as the recently debuted Google Forms API. This would generate a unique link
to the form as well as the form itself, which would allow for more types of questions to be added and responded to.

## Usage
1. Log in to the app using the Login with Google button on the upper right hand corner of the page (where the header is).
2. Add credits. Stripe Checkout is in test mode so it won't accept real credit card information. Please replace credit card
number with 4242 4242 4242 4242. You may use any random date for the expiration and security code.
3. Start a new survey with the plus button on the bottom right corner of the page. Again, **use only one yes or no question
for the survey body!** Otherwise the email sent won't make any sense. If you have multiple recipients, they may be separated
using commas.
4. Each click of 'Yes' or 'No' from the emails by anyone who received them should add themselves up in each survey card on the
dashboard.
5. Log out with the logout button on the upper right corner of the screen.

## Local Install and Run Guide
To run this app locally on your machine:
1. Fork this repository over and download it either with git or by zip.
2. Navigate to where the file is downloaded in terminal, then use command `npm i` while in the file directory to install
all server dependencies.
3. Navigate to the client directory (which is in the server directory) with `cd client`, then `npm i` again to install
all client-side dependencies.
4. In the server directory, you will need to create a `dev.js` file in the config folder. This is the file that will contain
all of your keys that are needed for all the APIs to work. Please see the prod.js file in the same folder on the variable
naming schemes. Each variable must be spelled in exactly the same way. It should look like:
```
module.exports = {
    googleClientID: "<your own Google client ID here>",
    googleClientSecret: "<your own Google client secret here>",
    ...
}
```
(`cookieKey` can be anything you set it to. `redirectDomain` should be the same localhost port you are using server-side.
By default it should be set to http://localhost:3000. For all the other keys, please see the asteriks below.)

5. Run `npm run dev`. Your terminal should start listening for activity on PORT 5001. The web page should also start itself
on your default browser as http://localhost:3000. Of course, you are welcome to change the listening port. This can be done
in the `index.js` file in the root server directory.

* Instructions are assuming that npm and NodeJS (and git, optional) are already installed on your machine. If you do not have
these, please visit https://docs.npmjs.com/downloading-and-installing-node-js-and-npm for instructions to set up and download.

** You will need to have or set up an account with Google, Sendgrid, Stripe, MongoDB, and Ngrok for everything to work. Here are
a few links to help you obtain all the keys needed:
- https://console.developers.google.com/ (Start a new project, make sure to configure Oauth consent and Oauth credentials to
get the client ID and client secret. When prompted by the credentials screen, set Javascript origin to `http://localhost:3000`
and redirect URL to `http://localhost:3000/auth/google/callback`. Finishing these steps should give you the `googleClientID`
and `googleClientSecret` to add to `dev.js`.)
- https://stripe.com/ (The Stripe secret key, or `stripeApiSecret` should be waiting for you on your dashboard after creating
an account. This is NOT the same as the endpoint secret. See asterisks below.)
- https://www.mongodb.com/ (The `mongoURI` is obtained first by setting up a free account, starting a new project, then starting
a new database cluster. Once the cluster is created, click 'connect' on the cluster and select 'connect with my application'.
Doing so will give your your `mongoURI`. Make sure to replace the password and database name as instructed.)
- https://sendgrid.com/ (`sendGridKey` can be created under 'API Keys' under Settings once you have created an account.)
- https://ngrok.com/ (See below.)

*** Webhooks will need to be activated and configured for Sendgrid and Stripe. More details here, after making an account with
them:
- https://docs.sendgrid.com/for-developers/tracking-events/getting-started-event-webhook (This is where Ngrok comes in. Because
you are running locally, Sendgrid won't know what http://localhost:5001 means. Ngrok essentially proxies service between your
local network and a link that it generates. You must use that generated link for the webhook origin and add on
'/api/surveys/webhooks' to the end of that URL, like so: `https://<Ngrok URL>/api/surveys/webhooks`
- https://stripe.com/docs/webhooks (You will need to first install the Stripe CLI so that you can let Stripe know to listen
to your local machine. Please see the site instructions for more details. No Ngrok is necessary for this webhook, but you will
need to obtain that endpoint secret for the webhook and add it to `dev.js`.
