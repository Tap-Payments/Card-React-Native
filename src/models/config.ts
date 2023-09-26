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
export type Transaction = {
  metadata: Object;
  reference: String;
};
export type Phone = { countryCode: String; number: String };
export type Fields = { cardHolder: boolean };
export type InterfaceConfig = {
  locale: Locale;
  theme: Theme;
  edges: Edges;
  direction: Direction;
};
export type Addons = {
  displayPaymentBrands: boolean;
  loader: boolean;
  saveCard: boolean;
};
export type Acceptance = {
  supportedBrands: SupportedBrands[];
  supportedCards: SupportedCards[];
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
export type AuthenticationConfig = {
  channel: 'PAYER_BROWSER';
  purpose: 'PAYMENT_TRANSACTION';
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
};
