import type {
  ColorStyle,
  Direction,
  Edges,
  Locale,
  Scope,
  SupportedSchemes,
  SupportedFundSource,
  SupportedPaymentAuthentications,
  TapCurrencyCode,
  Theme,
  Purpose,
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
  loader: boolean;
  cardDirection: Direction;
  colorStyle: ColorStyle;
  powered: boolean;
};
export type Addons = {
  loader: boolean;
};
export type Acceptance = {
  supportedSchemes: SupportedSchemes[];
  supportedFundSource: SupportedFundSource[];
  supportedPaymentAuthentications: SupportedPaymentAuthentications[] | [];
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
  id?: String;
  name?: Name[];
  nameOnCard?: String;
  editable?: boolean;
  contact?: Contact;
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
  id?: String;
  amount?: number;
  currency?: TapCurrencyCode;
  description?: String;
  reference?: String;
  metadata?: Object;
};

export type Invoice = {
  id: String;
};

export type Post = {
  url: String;
};

export type Features = {
  alternativeCardInputs: {
    cardNFC: boolean;
    cardScanner: boolean;
  };
  acceptanceBadge: boolean;
  customerCards: {
    saveCard: boolean;
    autoSaveCard: boolean;
  };
};
export type Config = {
  merchant?: Merchant;
  order: Order;
  invoice?: Invoice;
  post?: Post;
  operator: { publicKey: string };
  purpose?: Purpose;
  fieldVisibility?: Fields;
  acceptance?: Acceptance;
  interface?: InterfaceConfig;
  scope: Scope;
  customer: Customer;
  features?: Features;
};
