import type {
  Direction,
  Edges,
  Locale,
  Scope,
  SupportedBrands,
  SupportedCards,
  TapCurrencyCode,
  Theme,
} from './enums';

export type Merchant = { id: String };
export type PaymentAgreement = {
  id: String;
  contract: Contract;
};
export type Contract = {
  id: String;
};
export type Transaction = {
  metadata: Object;
  reference: String;
  paymentAgreement: PaymentAgreement;
};

export type Phone = { countryCode: String; number: String };
export type Fields = {
  card: { cardHolder: boolean; cvv: boolean };
};
export type InterfaceConfig = {
  locale: Locale;
  theme: Theme;
  edges: Edges;
  cardDirection: Direction;
  colorStyle: 'monochrome' | 'colored';
  powered: true;
};
export type Addons = {
  loader: boolean;
};
export type Acceptance = {
  supportedSchemes: SupportedBrands[];
  supportedFundSource: SupportedCards[];
  supportedPaymentAuthentications: ['3DS'] | [];
};
export type Contact = {
  email: String;
  phone: Phone;
};
export type Name = {
  lang: Locale;
  first: String;
  last: String;
  middle: String;
};
export type Customer = {
  id: String;
  name: Name[];
  nameOnCard: String;
  editable: boolean;
  contact: Contact;
};
export type AuthenticationTransactionInvoice = {
  id: string;
};

export type AuthenticationPost = {
  url: String;
};

export type AuthenticationTransaction = {
  transaction: String;
  order: String;
};

export type Order = {
  id: String;
  amount: number;
  currency: TapCurrencyCode;
  description: String;
};

export type Invoice = {
  id: String;
};

export type Post = {
  url: String;
};
export type Redirect = {
  url: String;
};
export type Features = {
  scanner: boolean;
  acceptanceBadge: boolean;
  nfc: boolean;
  customerCards: {
    saveCard: boolean;
    autoSaveCard: boolean;
  };
};
export type Config = {
  publicKey: String;
  merchant: Merchant;
  transaction: Transaction;
  order: Order;
  invoice: Invoice;
  post: Post;
  operator: { publicKey: String };
  purpose:
    | 'PAYMENT_TRANSACTION'
    | 'RECURRING_TRANSACTION'
    | 'INSTALLMENT_TRANSACTION'
    | 'ADD_CARD'
    | 'CARDHOLDER_VERIFICATION';
  fields: Fields;
  acceptance: Acceptance;
  addons: Addons;
  interface: InterfaceConfig;
  scope: Scope;
  customer: Customer;
  redirect: Redirect;
  features: Features;
};
