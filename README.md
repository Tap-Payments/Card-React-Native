# card-sdk-react-native

Tap Card SDK Wrapper

#Card-SDK

We at [Tap Payments](https://www.tap.company/) strive to make your payments easier than ever. We as a PCI compliant company, provide you a from the self solution to process card payments in your iOS apps.


# Get your Tap keys
You can always use the example keys within our example app, but we do recommend you to head to our [onboarding](https://register.tap.company/sell)  page. You will need to register your `bundle id` to get your `Tap Key` that you will need to activate our `Card SDK`.

# Installation

We got you covered, `TapCardSDK` can be installed with all possible technologies.

## Node modules

```sh
npm install card-sdk-react-native
```

```sh
yarn install card-sdk-react-native
```

Then run in your terminal
```swift
cd ios
pod install
pod update
```


## Documentation

To make our sdk as dynamic as possible, we do accept many configurations as input. Let us start by declaring them and explaining the structure and the usage of each.

```js
/**

Creates a configuration model to be passed to the SDK

- Parameters:

	- publicKey: The Tap public key

	- scope: The scope of the card sdk. Default is generating a tap token

	- purpose: The intended purpose of using the generated token afterwards.

	- merchant: The Tap merchant details

	- transaction: The transaction details

	- order: The tap order id

	- invoice: Link this token to an invoice

	- customer: The Tap customer details

	- acceptance: The acceptance details for the transaction

	- fields: Defines the fields visibility

	- addons: Defines some UI/UX addons enablement

	- interface: Defines some UI related configurations

*/
```

|Configuration|Description | Required | Type| Sample
|--|--|--| --|--|
| publicKey| This is the `Tap Key` that you will get after registering you bundle id. | True  | `String`| `let publicKey = "key"` |
| scope| Defines the intention of using the `TapCardSDK`. | True  | `Scope` enum| ` let scope:Scope = .Token //This means you will get a Tap token to use afterwards` OR ` let scope:Scope = .Authenticate //This means you will get an authenticated Tap token to use in our charge api right away`  |
| merchant| This is the `Merchant id` that you will get after registering you bundle id. | True  | `Merchant`| ` let merchant: { id: ''}` |
| purpose| Defines the intention of using the `Token` after generation. | True  | `String`| ` let purpose:String = "PAYMENT_TRANSACTION" //Using the token for a single charge.` OR ` let purpose:String = "RECURRING_TRANSACTION" //Using the token for multiple recurring charges.` OR ` let purpose:String = "INSTALLMENT_TRANSACTION" //Using the token for a charge that is a part of an installement plan.` OR ` let purpose:String = "ADD_CARD" //Using the token for a save a card for a customer.` OR ` let purpose:String = "CARDHOLDER_VERIFICATION" //Using the token for to verify the ownership of the card.` 
| transaction| Needed to define the amount and the currency, if you are generating an authenticated token. | False  | `Transaction`| ` let transaction = { metadata: {}, reference: A reference to this transaciton in your system,` |
| customer| The customer details you want to attach to this tokenization process. | True  | `Customer`| ` let customer = {nameOnCard: 'Tap Payments',editable: true,id: '',name: [  {    first: 'Tap',    lang: Locale.en,    middle: '',    last: 'Payments',  },],contact: {  phone: {    number: '88888888',    countryCode: '+965',  },  email: 'tappayments@tap.company'},` |
| post| This is the `webhook` for your server, if you want us to update you server to server. | False  | `Post`| ` let post = {url:""}` |
| acceptance| The acceptance details for the transaction. Including, which card brands and types you want to allow for the customer to tokenize. | False  | `Acceptance`| ` let acceptance = {supportedBrands: [  SupportedBrands.AMEX,  SupportedBrands.MASTERCARD,  SupportedBrands.VISA,  SupportedBrands.MADA,],supportedCards: [SupportedCards.Debit, SupportedCards.Credit]},` |
| order| This is the `Tap order id` that you created before and want to attach this token to it if any. | False  | `Order`| ` let order = {id:"", amount: 1, currency: TapCurrencyCode.SAR, description: ''}` |
| invoice| This is the `invoice id` that you want to link this token to if any. | False  | `Invoice`| ` let invoice:Invoice = {id:""}` |
| fields| Needed to define visibility of the optional fields in the card form. | False  | `Fields`| ` let fields = {cardHolder: true}` |
| addons| Needed to define the enabling of some extra features on top of the basic card form. | False  | `Addons`| ` let addons = { displayPaymentBrands: true, loader: true, saveCard: true }` `/**- displayPaymentBrands: Defines to show the supported card brands logos - loader: Defines to show a loader on top of the card when it is in a processing state - scanner: Defines whether to enable card scanning functionality or not*/`|
| interface| Needed to defines look and feel related configurations. | False  | `Interface`| ` let interface = {locale: Locale.en,theme: Theme.dark,edges: Edges.curved,direction: Direction.ltr},` |
| perator| Operator publicKey. | False  | `Operator`| ` let operator = {publicKey: "key"},` |

## Initialisation of the input

### Initialise Config
You can create a model from our defined structure to pass it afterwards to our `TapCardSDK` as a configuration.
```Ts
  const generateTransactionId = () => {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < 23) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  };

  const generateOrderId = () => {
    let result = '';
    const characters = '0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < 17) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  };
var config: Config = {
    publicKey: 'pk_test_YhUjg9PNT8oDlKJ1aE2fMRz7',
    merchant: {
      id: '',
    },
    transaction: {
      metadata: {},
      reference: `tck_LV${generateTransactionId()}`,
    },
    order: {
      id: `${generateOrderId()}`,
      amount: 1,
      currency: TapCurrencyCode.SAR,
      description: '',
    },
    invoice: {
      id: 'Map to authenticate.reference.invoice',
    },
    post: {
      url: 'Map to authenticate.reference.post',
    },
    purpose: 'PAYMENT_TRANSACTION',
    operator: {
      publicKey: 'pk_test_YhUjg9PNT8oDlKJ1aE2fMRz7',
    },
    scope: Scope.Authenticate,
    customer: {
      nameOnCard: 'Tap Payments',
      editable: true,
      id: '',
      name: [
        {
          first: 'Tap',
          lang: Locale.en,
          middle: '',
          last: 'Payments',
        },
      ],
      contact: {
        phone: {
          number: '88888888',
          countryCode: '+965',
        },
        email: 'tappayments@tap.company',
      },
    },
    acceptance: {
      supportedBrands: [
        SupportedBrands.AMEX,
        SupportedBrands.MASTERCARD,
        SupportedBrands.VISA,
        SupportedBrands.MADA,
      ],
      supportedCards: [SupportedCards.Debit, SupportedCards.Credit],
    },
    fields: {
      cardHolder: true,
    },
    addons: {
      displayPaymentBrands: true,
      loader: true,
      saveCard: true,
    },
    interface: {
      locale: Locale.en,
      theme: Theme.dark,
      edges: Edges.curved,
      direction: Direction.ltr,
    },
  }
```
# Initializing the TapCardSDK form

```ts
import TapCardView, {
  TapCurrencyCode,
  type Config,
  Locale,
  SupportedBrands,
  SupportedCards,
  Theme,
  Edges,
  Direction,
  Scope,
  type ITapCardViewInputRef,
} from 'card-sdk-react-native';

  const tapCardRef =
    React.useRef<ITapCardViewInputRef>() as MutableRefObject<ITapCardViewInputRef>;

  <TapCardView
          ref={tapCardRef}
          style={{ width: '100%' }}
          config={config}
          onSuccess={(tokenValue) => {}}
          onHeightChange={(height) => {}}
          onReady={() => {}}
          onFocus={() => {}}
          onBinIdentification={(binIdentification: Object) => {}}
          onInvalidInput={(invalidInput: boolean) => {}}
          onError={(error: object) => {}}
        />
```

# TapCardView Callbacks
callbacks that allows integrators to get notified from events fired from the `TapCardView`. 

```Ts
@objc public protocol TapCardViewDelegate {
    /// Will be fired whenever the card is rendered and loaded
    onReady={() => {}}
    /// Will be fired once the user focuses any of the card fields
    onFocus={() => {}}
    /// Will be fired once we detect the brand and related issuer data for the entered card data
    /** - Parameter data: will include the data in JSON format. example :
     *{
        "bin": "424242",
        "bank": "",
        "card_brand": "VISA",
        "card_type": "CREDIT",
        "card_category": "",
        "card_scheme": "VISA",
        "country": "GB",
        "address_required": false,
        "api_version": "V2",
        "issuer_id": "bnk_TS02A5720231337s3YN0809429",
        "brand": "VISA"
     }*     */
     onBinIdentification={(binIdentification: Object) => {}}
    /// Will be fired whenever the validity of the card data changes.
    /// - Parameter invalid: Will be true if the card data is invalid and false otherwise.
       onInvalidInput={(invalidInput: boolean) => {}}
    /**
        Will be fired whenever the card sdk finishes successfully the task assigned to it. Whether `TapToken` or `AuthenticatedToken`
     - Parameter data: will include the data in JSON format. For `TapToken`:
     {
         "id": "tok_MrL97231045SOom8cF8G939",
         "created": 1694169907939,
         "object": "token",
         "live_mode": false,
         "type": "CARD",
         "source": "CARD-ENCRYPTED",
         "used": false,
         "card": {
             "id": "card_d9Vj7231045akVT80B8n944",
             "object": "card",
             "address": {},
             "funding": "CREDIT",
             "fingerprint": "gRkNTnMrJPtVYkFDVU485Gc%2FQtEo%2BsV44sfBLiSPM1w%3D",
             "brand": "VISA",
             "scheme": "VISA",
             "category": "",
             "exp_month": 4,
             "exp_year": 24,
             "last_four": "4242",
             "first_six": "424242",
             "name": "AHMED",
             "issuer": {
                "bank": "",
                "country": "GB",
                "id": "bnk_TS07A0720231345Qx1e0809820"
            }
         },
         "url": ""
     }
     */
    onSuccess={(tokenValue) => {}}
    /// Will be fired whenever there is an error related to the card connectivity or apis
    /// - Parameter data: includes a JSON format for the error description and error
    onError={(error: object) => {}}
    /// Will be fired whenever the card element changes its height for your convience
    /// - Parameter height: The new needed height
    onHeightChange={(height) => {}}

}
```
# Tokenize the card

Once you get notified that the `TapCardView` now has a valid input from the callback. You can start the tokenization process by calling the public interface:

```swift
///  Wil start the process of generating a `TapToken` with the current card data
tapCardRef.current.generateToken();
```