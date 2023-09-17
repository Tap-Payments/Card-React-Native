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
export type Transaction = { amount: number; currency: TapCurrencyCode };
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

export type Authentication = {
  description: String;
  metadata: Object;
  reference: AuthenticationTransaction;
  post: AuthenticationPost;
  invoice: AuthenticationTransactionInvoice;
  authentication: AuthenticationConfig;
};

export type Config = {
  publicKey: String;
  scope: Scope;
  merchant: Merchant;
  transaction: Transaction;
  customer: Customer;
  acceptance: Acceptance;
  fields: Fields;
  addons: Addons;
  interface: InterfaceConfig;
  authentication: Authentication;
};
