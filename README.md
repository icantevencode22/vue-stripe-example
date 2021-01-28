
# vue-stripe-example

Generated with Gridsome, uses additional packages as Stripe & Element UI.

## Starting the project from scratch:
1. Install and use `yarn` (our preferred package manager)
2. Create `.env` file
3. Install all dependencies
4. Start the development server


## ENV File
You can get your Stripe keys from your dashboard

    GRIDSOME_STRIPE_PUBLISHABLE - Stripe Publishable key
    STRIPE_SECRET - Stripe Secret key (should be hidden and used only in server)


## Additional notes/docs:
- [Stripe Info](docs/StripeInfo.md)
- [Stripe Notes](docs/StripeNotes.md)


## Project setup
```
yarn install
```
### Compiles and hot-reloads for development (builds dev backend server under gridsome.server.js)
```
yarn dev
```
### Compiles and minifies for production (no backend server)
```
yarn build
```


