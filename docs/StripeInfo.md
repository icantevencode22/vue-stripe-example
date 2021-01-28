# How to use Stripe
Always load Stripe.js directly from https://js.stripe.com. You can’t include it in a bundle or self-host it.
<script src="https://js.stripe.com/v3/"></script>

## SEPA Cards usage
You can find more here: [official docs](https://stripe.com/docs/payments/sepa-debit)
Accept SEPA Payment: [official docs](https://stripe.com/docs/payments/sepa-debit/accept-a-payment)

The SEPA Direct Debit rulebook requires that you notify your customer each time you debit their account. For this case, by default, Stripe automatically sends the customer an email.

A Checkout Session must satisfy all of the following conditions to support SEPA Direct Debit payments:

- You can only use one-time line items (recurring subscription plans are not supported).
- Prices for all line items must be expressed in Euro (currency code eur).

In Stripe payment you have to set:
- payment_method_types: ['sepa_debit'] or you can take multiple payment methods with payment_method_types: ['card', 'sepa_debit', ...]
- currency: 'eur' To accept `sepa_debit`, all line items must have currency: `eur`
      

      
## Test cards 

### Credit cards
You can find more here: [official docs](https://stripe.com/docs/testing)
| Card number | CVC | EXP | Type
|:---:|:--:|:--:|:--:|
|4242 4242 4242 4242|123|08/25|Visa - No Auth
|4000 0027 6000 3184|123|08/25| Visa - Auth req
|5555 5555 5555 4444|123|08/25| MasterCard - No Auth

### SEPA cards
You can find more here: [official docs](https://stripe.com/docs/payments/sepa-debit/accept-a-payment#test-integration)

You’ll want to use the SEPA Direct Debit test numbers when testing your Checkout integration with SEPA Direct Debit.
Germany:
| Card number | CVC | EXP | DESCRIPTION
|:---:|:--:|:--:|:--:|
|DE89370400440532013000|123|08/25|Succeeds and instantly processes the payment.
|DE08370400440532013003|123  | 08/25| Succeeds and processes the payment after a 3-minute delay.
|5555 5555 5555 4444|123  | 08/25| MasterCard - No Auth