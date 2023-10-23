# card-react-native

Tap Card React-Native Wrapper


# Introduction[]()

Before diving into the development process, it's essential to establish the prerequisites and criteria necessary for a successful build. In this step, we'll outline the specific iOS requirements, including the minimum SDK version and other important details you need to consider. Let's ensure your project is set up for success from the very beginning.


# Sample Demo[]()


https://github.com/Tap-Payments/Card-React-Native/assets/121755223/5a926c3b-45f3-4ed8-94e2-e1e69deb55a3



# Step 1: Requirements[]()

-  React native 0.64
- -   A minimum  [Android SDK/API level](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)  of 24+
-  In order to be able to use card scanner functionality, please make sure you added the correct permission key-value in the iOS project info.plist.
    
    ```xml
    <key>NSCameraUsageDescription</key>
    <string>Card SDK needs it for scanner functionality</string>
    ```
- in order to accept online payments on your application, you will need to add at least the Internet permission in the manifest file.
```xml
    <uses-permission android:name="android.permission.INTERNET" /> //get internet access to complete online payments
        <uses-permission android:name="android.permission.CAMERA"/>
    <uses-permission android:name="android.permission.NFC" />
    <uses-feature android:name="android.hardware.nfc" android:required="true" />
    <uses-feature
      android:name="android.hardware.camera"
      android:required="true" />

```

# Step 2: Get Your Public Keys[]()

While you can certainly use the sandbox keys available within our sample app which you can get by following the  [installation](https://developers.tap.company/docs/android-card-sdk#step-3-installation-using-gradle)  process, however, we highly recommend visiting our  [onboarding](https://register.tap.company/ae/en/sell)  page, there you'll have the opportunity to register your package name and acquire your essential Tap Key for activating Card-iOS integration.


# Step 3: Installation[]()

We got you covered, `card-react-native` can be installed with all possible technologies.

## Node modules

```sh
npm install card-react-native
```

```sh
yarn install card-react-native
```

Then run in your terminal

```swift
cd ios
pod install
pod update
```



# Import the dependency
```Ts
import TapCardView from ‘card-react-native’;
```

# Step 4: Integrating Card-React-Native[]()
This integration offers two distinct options: a simple integration designed for rapid development and streamlined merchant requirements, and an advanced integration that adds extra features for a more dynamic payment integration experience.

## Simple Integration[]()

Here, you'll discover a comprehensive table featuring the parameters applicable to the simple integration. Additionally, you'll explore the various methods for integrating the SDK, either using storyboard to create the layout and then implementing the controllers functionalities by code, or directly using code. Furthermore, you'll gain insights into card tokenization after the initial payment and learn how to receive the callback notifications.

### Parameters[]()
Each parameter is linked to the  [reference](https://developers.tap.company/docs/card-sdk-ios#reference)  section, which provides a more in depth explanation of it.


|Configuration|Description | Required | Type| Sample
|--|--|--| --|--|
| operator| This is the `Key` that you will get after registering you bundle id. | True  | `String`| `let operator  {publicKey: 'pk_test_YhUjg9PNT8oDlKJ1aE2fMRz7'}` |
| scope| Defines the intention of using the `Card-React-native`. | True  | `Scope`| ` let scope = Scope.AuthenticatedToken`|
| purpose| Defines the intention of using the `Token` after generation. | True  | `String`| ` let purpose = "Transaction"` |
| order| This is the `order id` that you created before or `amount` and `currency` to generate a new order.   It will be linked this token. | True  | `Order`| ` let order: = { amount: 1, currency: TapCurrencyCode.SAR, description: '', id: '', , reference : ''}` |


## Simple widget initialisation
```Ts
function MinRequirement() {
  const testRef =
    React.useRef<ITapCardViewInputRef>() as MutableRefObject<ITapCardViewInputRef>;

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <TapCardView
        onSuccess={(tokenValue) => {
          console.log(
            '🚀 ~ file: HomeScreen.tsx:136 ~ HomeScreen ~ tokenValue:',
            tokenValue
          );
        }}
        ref={cardSdkRef}
        style={{ width: '100%' }}
        config={{
          merchant: {
            id: '',
          },
          order: {
            amount: 1,
            currency: TapCurrencyCode.SAR,
          },
          operator: {
            publicKey: 'pk_test_YhUjg9PNT8oDlKJ1aE2fMRz7'
          },
          scope: Scope.AuthenticatedToken,
          customer: {
            nameOnCard: 'Tap Payments',
            editable: true,
            name: [
              {
                first: 'Tap',
                lang: Locale.en,
                middle: 'Company',
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
        }}
        onInvalidInput={(invalidInput: boolean) => {
          console.log(
            '🚀 ~ file: HomeScreen.tsx:145 ~ HomeScreen ~ invalidInput:',
            invalidInput
          );
        }}
      />
    </View>
  );
}
```
###  Tokenise the card[]()

> 📘
> 
> A token is like a secret code that stands in for sensitive info, like credit card data. Instead of keeping the actual card info, we use this code. Tokens are hard for anyone to understand if they try to peek, making it a safer way to handle sensitive stuff.

```Ts
const cardSdkRef =
    React.useRef<ITapCardViewInputRef>() as MutableRefObject<ITapCardViewInputRef>;
cardSdkRef.current.generateToken();
```

# Advanced Integration
## Advanced Integration

[]()

The advanced configuration for the Card-iOS integration not only has all the features available in the simple integration but also introduces new capabilities, providing merchants with maximum flexibility. You can find a code below, where you'll discover comprehensive guidance on implementing the advanced flow as well as a complete description of each parameter.

### Parameters[]()
Each parameter is linked to the  [reference]()  section, which provides a more in depth explanation of it.

|Configuration|Description | Required | Type| Sample
|--|--|--| --|--|
| operator| This is the `Key` that you will get after registering you bundle id. | True  | `String`| `let operator  {publicKey: 'pk_test_YhUjg9PNT8oDlKJ1aE2fMRz7'}` |
| scope| Defines the intention of using the `Card-React-native`. | True  | `Scope`| ` let scope = Scope.AuthenticatedToken`|
| purpose| Defines the intention of using the `Token` after generation. | True  | `String`| ` let purpose = "Transaction"` |
| order| This is the `order id` that you created before or `amount` and `currency` to generate a new order.   It will be linked this token. | True  | `Order`| ` let order: = { amount: 1, currency: TapCurrencyCode.SAR, description: '', id: '', , reference : ''}` |
| invoice| This is the `invoice id` that you want to link this token to if any. | False  | `Invoice`| ` let invoice = {"id":""}` |
| merchant| This is the `Merchant id` that you will get after registering you bundle id. | True  | `Merchant`| ` let merchant = {"id":""}` |
| customer| The customer details you want to attach to this tokenization process. | True  | `Customer`| ` let customer = {"id":"", "name":{{"lang":"en","first":"TAP","middle":"","last":"PAYMENTS"}}, "nameOnCard":"TAP PAYMENTS", "editble":true, "contact":{"email":"tap@tap.company", "phone":{"countryCode":"+965","number":"88888888"}}}` |
| features| Some extra features that you can enable/disable based on the experience you want to provide.. | False  | `Features`| ` let features = {"alternativeCardInputs":{ "cardScanner":true,"cardNFC":false}, "acceptanceBadge":true, "customerCards":{"saveCard":false, "autoSaveCard":false}`|
| acceptance| The acceptance details for the transaction. Including, which card brands and types you want to allow for the customer to tokenize/save. | False  | `Acceptance`| ` let acceptance = {"supportedSchemes":{ SupportedBrands.AMEX, SupportedBrands.MASTERCARD, SupportedBrands.VISA, SupportedBrands.MADA,}, "supportedFundSource":{"CREDIT","DEBIT"}, "supportedPaymentAuthentications":["3DS"]}`|
| fields| Needed to define visibility of the optional fields in the card form. | False  | `fieldVisibility`| ` let fieldVisibility ={ "card":{"cardHolder":true}}` |
| interface| Needed to defines look and feel related configurations. | False  | `Interface`| ` let interface = {locale: Locale.en, theme: Theme.dark, edges: Edges.curved, cardDirection: Direction.ltr, colorStyle: 'monochrome', powered: true, "loader": true}` |
| post| This is the `webhook` for your server, if you want us to update you server to server. | False  | `Post`| ` let post = {"url":""}` |

## Advanced configuration initiliasation
```Ts
const config = React.useMemo(() => {
    return {
      merchant: {
        id: '',
      },
      order: {
        reference: '',
        amount: 1,
        currency: TapCurrencyCode.SAR,
        description: '',
        id: '',
        metadata: {},
      },
      invoice: {
        id: 'Map to authenticate.reference.invoice',
      },
      post: {
        url: 'Map to authenticate.reference.post',
      },
      purpose: Purpose.BillingTransaction,
      operator: {
        publicKey: 'pk_test_YhUjg9PNT8oDlKJ1aE2fMRz7'
      },
      scope: Scope.AuthenticatedToken,
      customer: {
        nameOnCard: 'Tap Payments',
        editable: true,
        id: '',
        name: [
          {
            first: 'Tap',
            lang: Locale.en,
            middle: 'Company',
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
        supportedSchemes: [
          SupportedSchemes.AMEX,
          SupportedSchemes.MASTERCARD,
          SupportedSchemes.VISA,
          SupportedSchemes.MADA,
        ],
        supportedFundSource: [
          SupportedFundSource.Debit,
          SupportedFundSource.Credit,
        ],
        supportedPaymentAuthentications: [
          SupportedPaymentAuthentications.secured,
        ],
      },
      fieldsVisibility: {
        card: { cardHolder: true, cvv: true },
      },
      interface: {
        loader: true,
        locale: Locale.en,
        theme: Theme.dark,
        edges: Edges.curved,
        cardDirection: Direction.ltr,
        colorStyle: ColorStyle.colored,
        powered: true,
      },
      features: {
        alternativeCardInputs: {
          cardNFC: true,
          cardScanner: true,
        },
        customerCards: {
          saveCard: true,
          autoSaveCard: true,
        },
        acceptanceBadge: true,
      },
    };
  }, []);
```
## Advanced widget initialisation
```Ts
<View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <TapCardView
          onSuccess={(tokenValue) => {}}
          ref={cardSdkRef}
          style={{ width: '100%' }}
          config={config}
          onHeightChange={() => {}}
          onReady={() => {}}
          onFocus={() => {}}
          onBinIdentification={(binIdentification: Object) => {}}
          onInvalidInput={(invalidInput: boolean) => {}}
          onError={(error: object) => {}}
        />
      </View>
```

# TapCardView Callbacks

callbacks that allows integrators to get notified from events fired from the `TapCardView`.

```Ts
 {
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

# Parameters Reference[]()

Below you will find more details about each parameter shared in the above tables that will help you easily integrate Card-iOS SDK.

## operator[]()

1.  Definition: It links the payment gateway to your merchant account with Tap, in order to know your business name, logo, etc...
2.  Type: string (_required_)
3.  Fields:
    -   **publicKey**  
        _Definition_: This is a unique public key that you will receive after creating an account with Tap which is considered a reference to identify you as a merchant. You will receive 2 public keys, one for sandbox/testing and another one for production.  
4. Example:
        
```swift
let operator:[String:Any]: ["publicKey":"pk_test_YhUjg9PNT8oDlKJ1aE2fMRz7"]
```
## scope []()

1.  Definition: This is used in order to identify the type of token you want to generate. A token is created in order to save the card details after submitting the form in a more secure way.
2.  Type: string (_required_)
3.  Possible Values:
    -   **Token**  
        _Definition:_  Created before the payment in complete, in order to save the card and do a charge later  
	4. Example: `let scope:String = "Token"`
        
    -   **AuthenticatedToken**  
        _Definition:_  This is a token created and authenticated by the customer. Which means that the customer entered the card information and also passed the Authentication step (3DS) and got the token after.  
        _Example:_ `let scope:String = "AuthenticatedToken"`
        
    -   **SaveToken**  
        _Definition:_  This is used in case you want to have the card information saved in a token, however you want the customer to go through the authentication step (receive OTP or PIN) each time the card is used.  
        _Example:_ `let scope:String = "SaveToken"`
    
        
    -   **SaveAuthenticatedToken**  
        _Definition:_  This means you will get an authenticated token to use in multiple times right away.  
        _Example:_ `let scope:String = "SaveAuthenticatedToken"`

## purpose[]()

1.  Definition: This will identify the reason of choosing the type of token generated in the scope field, like if it will be used for a single transaction, recurring, saving the token, etc...  
    Note: Only choose the option that suits your needs best.
2.  Type: string (_required_)
3.  Possible Values:
    -   **Transaction**:  
        _Definition:_  In case the token will be used only for a single charge request.  
        _Example:_ `const purpose:String = "Transaction"`
        
    -   **Milestone Transaction**:  
        _Definition:_  Using the token for paying a part of a bigger order, when reaching a certain milestone.  
        _Example:_`const purpose = "Milestone Transaction"`
        
    -   **Instalment Transaction**:  
        _Definition:_  Using the token for a charge that is a part of an instalment plan.  
        _Example:_`const purpose = "Instalment Transaction"`
        
    -   **Billing Transaction**:  
        _Definition:_  Using the token for paying a bill.  
        _Example:_`const purpose = "Billing Transaction"`
        
    -   **Subscription Transaction**:  
        _Definition:_  Using the token for a recurring based transaction.  
        _Example:_`const purpose = "Subscription Transaction"`
        
    -   **Verify Cardholder**:  
        _Definition:_  Using the token to verify the ownership of the card, in other words, making sure of the identity of the cardholder.  
        _Example:_`const purpose = "Verify Cardholder*"`
        
    -   **Save Card**:  
        _Definition:_  Using the token to save this card and link it to the customer itself.  
        _Example:_`const purpose = "Save Card"`
        
    -   **Maintain Card**:  
        _Definition:_  Used to renew a saved card.  
        _Example:_`const purpose = "Maintain Card"`
        

##  order []()

1.  Definition: This defined the details of the order that you are trying to purchase, in which you need to specify some details like the id, amount, currency ...
2.  Type: Dictionary, (_required_)
3.  Fields:
    -   **id**  
        _Definition:_  Pass the order ID created for the order you are trying to purchase, which will be available in your database.  
        Note: This field can be empty  
    -   **currency**  
        _Definition:_  The currency which is linked to the order being paid.  
    -   **amount**  
        _Definition:_  The order amount to be paid by the customer.  
        Note: Minimum amount to be added is 0.1.  
    -   **description**  
        _Definition:_  Order details, which defines what the customer is paying for or the description of the service you are providing.  
    -   **reference**  
        _Definition:_  This will be the order reference present in your database in which the paying is being done for.  
4.  _Example:_
  ```ts
  let order = {
      reference: '',
      amount: 1,
      currency: TapCurrencyCode.SAR,
      description: '',
      id: '',
      metadata: {},
    }
  ```

## 

merchant

[]()

1.  Definition: It is the Merchant id that you get from our onboarding team. This will be used as reference for your account in Tap.
2.  Type: Dictionary (_required_)
3.  Fields:
    -   **id**  
        _Definition:_  Generated once your account with Tap is created, which is unique for every merchant.  
        _Example:_
```swift
	let merchant = {id:""}
```
        

##  invoice []()

1.  Definition: After the token is generated, you can use it to pay for any invoice. Each invoice will have an invoice ID which you can add here using the SDK.  
    Note: An invoice will first show you a receipt/summary of the order you are going to pay for as well as the amount, currency, and any related field before actually opening the payment form and completing the payment.
2.  Type: Dictionary (_optional_)
3.  Fields:
    -   **id**  
        _Definition:_  Unique Invoice ID which we are trying to pay.  
        _Example:_
```swift
let invoice = {id:""}
```
        

## customer []()

1.  Definition: Here, you will collect the information of the customer that is paying using the token generate in the SDK.
    
2.  Type: Dictionary (_required_)
    
3.  Fields:
    
    -   **id**  
        _Definition:_  This is an optional field that you do not have before the token is generated. But, after the token is created once the card details are added, then you will receive the customer ID in the response which can be handled in the onSuccess callback function.  
    -   **name**  
        _Definition:_  Full Name of the customer paying.  
        _Fields:_
        
        1.  **lang**  
            Definition: Language chosen to write the customer name.
        2.  **first**  
            Definition: Customer's first name.
        3.  **middle**  
            Definition: Customer's middle name.
        4.  **last**  
            Definition: Customer's last name.  
        
    -   **editable**  
        _Definition:_  The customer's name on the card he is paying with, also known as cardholder name.  
        Note: It is of type Boolean, and indicated whether or not the customer can edit the cardholder name already entered when the token got created.  
      
    -   **contact**  
        _Definition:_  The customer's contact information like email address and phone number.  
        Note: The contact information has to either have the email address or the phone details of the customers or both but it should not be empty.  
        _Fields:_
        
        1.  **email**  
            Definition: Customer's email address  
            Note: The email is of type string.
        2.  **phone**  
            Definition: Customer's Phone number details
            1.  **countryCode**
            2.  **number**  
      
    -   **nameOnCard**  
        _Definition:_  Pre-fill the cardholder name already received once the payment form is submitted.  
4.  _Example:_
```ts
let customer = {
      nameOnCard: 'Tap Payments',
      editable: true,
      id: '',
      name: [
        {
          first: 'Tap',
          lang: Locale.en,
          middle: 'Company',
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
    }
```
        

##  featuresv[]()

1.  Definition: Additional functionalities to be added in order to make the payment gateway experience more customisable for your needs, like showing the accepted card brands on the payment form, save card toggle button...
    
2.  Type: Dictionary (optional)
    
3.  Fields:
    
    -   **acceptanceBadge**  
        _Definition:_  A boolean to indicate wether or not you want to display the list of supported card brands that appear beneath the card form itself.  
        
    -   **customerCards**  
        _Definition:_  You will have the option to display either the toggle button that allows to save the card or the autosave card.  
        _Fields:_
        
        1.  **saveCard**  
            Definition: A boolean to indicate wether or not you want to display the save card option to the customer.  
            Must be used with a combination of these 2 scopes either SaveToken or SaveAuthenticatedToken.
        2.  **autoSave**  
            Definition: A boolean to indicate wether or not you want the save card switch to be on by default.  
       
    -   **alternativeCardInput**  
        _Definition:_ You can also, either add the card information by scanning the card or by using NFC.  
        Note: In order for that to work, you will need to add the Camera usage description to your info.plist file like so 

		_Fields:_
        
        1.  **cardScanner**  
            Definition: A boolean to indicate whether or not you want to display the scan card icon.
4. - _Example:_
```ts
let features =  {
      alternativeCardInputs: {
        cardNFC: true,
        cardScanner: true,
      },
      customerCards: {
        saveCard: true,
        autoSaveCard: true,
      },
      acceptanceBadge: true,
    }
```
    
        

## acceptance[]()

1.  Definition: This will help in controlling the supported payment schemes, like MasterCard and Visa, and the fund source either being debit or credit card and you will also be able to check if you want the customers to complete the 3DS phase (Authentication) or not.
2.  Type: Dictionary (_optional_)
3.  Fields:
    -   **supportedSchemes**  
        _Definition:_  A list to control which card schemes the customer can pay with, note that he can choose more than one card scheme.  
        _Possible Values:_
        
        1.  AMERICAN_EXPRESS
        2.  VISA
        3.  MASTERCARD
        4.  MADA
        5.  OMANNET  
        
    -   **supportedFundSource**  
        _Definition:_  A list to control which card types are allowed by your customer.  
        _Possible Values:_
        
        1.  Debit
        2.  Credit  
        
    -   **supportedPaymentAuthentications**  
        _Definition:_  A list of what authentication techniques you want to enforce like 3DS authentication  
        _Possible Values:_
        
        1.  3DS
4.  _Example:_
```Ts
let acceptance =  acceptance: {
      supportedSchemes: [
        SupportedSchemes.AMEX,
        SupportedSchemes.MASTERCARD,
        SupportedSchemes.VISA,
        SupportedSchemes.MADA,
      ],
      supportedFundSource: [
        SupportedFundSource.Debit,
        SupportedFundSource.Credit,
      ],
      supportedPaymentAuthentications: [
        SupportedPaymentAuthentications.secured,
      ],
    }
  ```
        

## fieldVisibility []()

1.  Definition: A boolean to indicate wether or not you want to show/collect the card holder name.
2.  Type: Dictionary (_optional_)
3.  Fields:
    -   **card**
        1.  **cardHolder**  
            _Definition:_  The person that is paying using credit or debit card.  
4. _Example:_
```Ts
let fieldVisibility = {
      card: { 
        cardHolder: true,
        cvv: true 
      },
    }
```
            

##  interface []()

1.  Definition: This will help you control the layout (UI) of the payment form, like changing the theme light to dark, the language used (en or ar), ...
2.  Type: Dictionary (_optional_)
3.  Fields:
    -   **loader**  
        _Definition:_  A boolean to indicate wether or not you want to show a loading view on top of the card form while it is performing api requests.  
    -   **locale**  
        _Definition:_  The language of the card form. Accepted values as of now are:  
        _Possible Values:_
        
        1.  **en**(for english)
        2.  **ar**(for arabic).  
        
    -   **theme**  
        _Definition:_  The display styling of the card form. Accepted values as of now are:  
        _Options:_
        
        1.  **light**
        2.  **dark**
        3.  **dynamic**  ( follow the device's display style )  
        
    -   **edges**  
        _Definition:_  Control the edges of the payment form.  
        _Possible Values:_
        
        1.  **curved**
        2.  **flat**  
        
    -   **cardDirection**  
        _Definition:_  The layout of the fields (card logo, number, date & CVV) within the card element itself.  
        _Possible Values:_
        
        1.  **ltr**  
            Definition: The fields will inflate from left to right.
        2.  **rtl  
            **Definition: The fields will inflate from right to left.
        3.  **dynamic**  
            Definition: The fields will inflate in the locale's direction.  
        
    -   **powered**  
        _Definition:_  A boolean to indicate wether or not you want to show powered by tap.  
        Note, that you have to have the permission to hide it from the integration team. Otherwise, you will get an error if you pass it as false.  

    -   **colorStyle**  
        _Definition:_  How do you want the icons rendered inside the card form.  
        _Possible Values:_
        
        1.  **colored**
        2.  **monochrome**  
4.  _Example:_
```Ts
let interface =  interface: {
      loader: true,
      locale: Locale.en,
      theme: Theme.dark,
      edges: Edges.curved,
      cardDirection: Direction.ltr,
      colorStyle: ColorStyle.colored,
      powered: true,
    },
```
        

##  post []()

1.  Definition: Here you can pass the webhook URL you have, in order to receive notifications of the results of each Transaction happening on your application.
    
2.  Type: Post (_optional_)
    
3.  Fields:
    
    -   **url**  
        _Definition:_  The webhook server's URL that you want to receive notifications on.  
        _Example:_
```Ts
let post:Post = {"url":""}
```        
# Expected Callbacks Responses[]()

## onBindIdentification
```json
{
    "bin": "557607",
    "bank": "COMMERCIAL INTERNATIONAL BANK (EGYPT) S.A.E.",
    "card_brand": "MASTERCARD",
    "card_type": "DEBIT",
    "card_category": "PLATINUM",
    "card_scheme": "MASTERCARD",
    "country": "EG",
    "address_required": false,
    "api_version": "V2",
    "issuer_id": "bnk_TS02A1320232208a5O41810531",
    "brand": "MASTERCARD"
}
```

## onSuccess
The response here will differ based on the scope:
### Token
```json
{
    "id": "tok_4WUP3423199C4Vp18rY9y554",
    "created": 1697656174554,
    "object": "token",
    "live_mode": false,
    "type": "CARD",
    "purpose": "Transaction",
    "source": "CARD-ENCRYPTED",
    "used": false,
    "card": {
        "id": "card_U8Wb34231992m7q185g9i558",
        "object": "card",
        "address": {},
        "funding": "CREDIT",
        "fingerprint": "gRkNTnMrJPtVYkFDVU485JtGPdhzQr%2FnmHGhlzLBvuc%3D",
        "brand": "VISA",
        "scheme": "VISA",
        "category": "",
        "exp_month": 2,
        "exp_year": 44,
        "last_four": "4242",
        "first_six": "424242",
        "first_eight": "42424242",
        "name": "AHMED",
        "issuer": {
            "bank": "",
            "country": "GB",
            "id": "bnk_TS05A3420232209Kp2j1810445"
        }
    },
    "save_card": false,
    "url": ""
}
```


## AuthenticatedToken
```json
{
    "id": "auth_payer_MhIp23231913vYjl18nx94755",
    "object": "Authenticate",
    "live_mode": false,
    "api_version": "V2",
    "status": "AUTHENTICATED",
    "created": "1697656409282",
    "amount": 1,
    "currency": "KWD",
    "save_card": false,
    "provider": {
        "name": "MPGS"
    },
    "transaction": {
        "timezone": "UTCZ",
        "created": "1697656409282"
    },
    "response": {
        "code": "000",
        "message": "Authentication Successful"
    },
    "reference": {
        "transaction": "tck_LV02G1720231634Xj51824647",
        "order": "ord_Tlh924231913OouS18vd9O487"
    },
    "customer": {
        "id": "",
        "name": [
            {
                "first_name": "test",
                "middle_name": "test",
                "last_name": "test",
                "locale": "en"
            }
        ],
        "name_on_card": "Ahmed",
        "email": "test@tap.com",
        "phone": {
            "country_code": "+20",
            "number": "1099137777"
        }
    },
    "source": {
        "id": "tok_RCiU23231913dWqQ18WV9Q18"
    },
    "merchant": {
        "id": "1124340"
    },
    "card": {
        "first_six": "424242",
        "scheme": "VISA",
        "brand": "VISA",
        "category": "",
        "last_four": "4242",
        "name": "AHMED",
        "expiry": {
            "month": "02",
            "year": "44"
        },
        "funding": "CREDIT"
    },
    "authentication": {
        "acsEci": "02",
        "card_enrolled": "Y",
        "authenticationToken": "jHyn+7YFi1EUAREAAAAvNUe6Hv8=",
        "transactionId": "h3q0bQzZNyBueA//+57RcpfPo6s=",
        "version": "3DS1",
        "channel": "PAYER_BROWSER",
        "purpose": "Transaction",
        "url": "https://authenticate.alpha.tap.company/redirect/auth_payer_MhIp23231913vYjl18nx94755",
        "transStatus": "Y",
        "mode": "C"
    },
    "redirect": {
        "url": ""
    }
}
```

## SaveAuthenticatedToken
If the user didn't enable the save token switch, it will be as the previous scope. Otherwise it will be:
```json
{
  "id": "auth_payer_yhFr59231914mJvN18c79665",
  "object": "Authenticate",
  "live_mode": false,
  "api_version": "V2",
  "status": "AUTHENTICATED",
  "created": "1697656504329",
  "amount": 1,
  "currency": "KWD",
  "save_card": true,
  "provider": {
    "name": "MPGS"
  },
  "transaction": {
    "timezone": "UTCZ",
    "created": "1697656504329"
  },
  "response": {
    "code": "000",
    "message": "Authentication Successful"
  },
  "reference": {
    "transaction": "tck_LV02G1720231634Xj60014708",
    "order": "ord_Zu5d59231914gJa018lJ9b720"
  },
  "customer": {
    "id": "cus_TS01A1520232215Nx3n1810085",
    "name": [
      {
        "first_name": "test",
        "middle_name": "test",
        "last_name": "test",
        "locale": "en"
      }
    ],
    "name_on_card": "Ahmed",
    "email": "test@tap.com",
    "phone": {
      "country_code": "+20",
      "number": "1099137777"
    }
  },
  "source": {
    "id": "tok_2AKI58231914GLWn18V69C147"
  },
  "merchant": {
    "id": "1124340"
  },
  "card": {
    "id": "card_rSWi582319149ys718hD9B151",
    "first_six": "424242",
    "scheme": "VISA",
    "brand": "VISA",
    "category": "",
    "last_four": "4242",
    "name": "AHMED",
    "expiry": {
      "month": "04",
      "year": "44"
    },
    "funding": "CREDIT"
  },
  "authentication": {
    "acsEci": "02",
    "card_enrolled": "Y",
    "authenticationToken": "jHyn+7YFi1EUAREAAAAvNUe6Hv8=",
    "transactionId": "FOdR5lit6PaxiidyOxmjSS9z1ls=",
    "version": "3DS1",
    "channel": "PAYER_BROWSER",
    "purpose": "Transaction",
    "url": "https://authenticate.alpha.tap.company/redirect/auth_payer_yhFr59231914mJvN18c79665",
    "transStatus": "Y",
    "mode": "C"
  },
  "payment_agreement": {
    "id": "payment_agreement_NDL3172319152Gck18109189",
    "type": "UNSCHEDULED",
    "contract": {
      "id": "card_rSWi582319149ys718hD9B151",
      "type": "SAVED_CARD"
    }
  },
  "redirect": {
    "url": ""
  }
}
```
