
# Stripe notes

## subscription-lifecycle
[subscription-lifecycle official docs](https://stripe.com/docs/billing/subscriptions/overview#subscription-lifecycle)

**Unpaid**
When the initial payment fails, customers have about 23 hours to make a successful payment. If payment is made, the subscription is updated to `active` and the invoice is `paid`. If no payment is made, the subscription is updated to `incomplete_expired` and the invoice becomes `void`. This window exists because the first payment for a subscription is usually made with the customer on-session. If the customer returns to your application after 23 hours, create a new subscription for them.

For unpaid subscriptions, the latest invoice remains open but payments aren’t attempted. Invoices continue to be generated each billing cycle and remain in `draft` state. To reactivate the subscription, you need to:

**Paid**
The subscription’s status remains `active` as long as automatic payments succeed. If automatic payment fails, the subscription is updated to `past_due` and Stripe attempts to recover payment based on your [retry rules](https://dashboard.stripe.com/account/billing/automatic). If payment recovery fails, you can set the subscription status to `canceled`, `unpaid`, or you can leave it active.

*If you leave the subscription in place, the most recent unpaid invoice remains open, new invoices are generated, and payments on new invoices are attempted. Use this behavior if you want to continue attempts to bill your customers every month, even when previous invoice payments have failed.

[automatic-payment](https://stripe.com/docs/billing/subscriptions/overview#automatic-payment) : You can configure Stripe to retry failed payments.  [Smart Retries](https://dashboard.stripe.com/settings/billing/automatic) use Stripe’s machine learning to pick the optimal time to retry, over a configurable time period up to one month after the initial payment fails.

## Base price
Docs: [Flat fee](https://stripe.com/docs/billing/subscriptions/examples#flat-fee)
You can subscribe the customer to two separate products to model a pricing structure that includes both a base fee and additional per-seat pricing. One product serves as the flat base price and the other product represents the variable per-seat pricing.

## Changing prices
Docs [Upgrade and downgrade subscriptions](https://stripe.com/docs/billing/subscriptions/upgrade-downgrade#changing)
If both prices have the same billing periods—combination of  `interval`  and  `interval_count`, the subscription retains the same billing dates. If the prices have different billing periods, the new price is billed at the new interval, starting on the day of the change. For example, switching a customer from one monthly subscription to another does not change the billing dates. However, switching a customer from a monthly subscription to a yearly subscription moves the billing date to the date of the switch. Switching a customer from one monthly subscription to another monthly subscription while introducing a trial period also moves the billing date (to the conclusion of the trial).

## Immediate payment
Stripe immediately attempts payment for these subscription changes:
-   From a subscription that doesn’t require payment (e.g., due to a trial or free subscription) to a paid subscription
-   When the billing period changes

When billing is performed immediately, but the required payment fails, the subscription change request will succeed and the subscription will transition to  `past_due`.