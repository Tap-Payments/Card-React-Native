import type {
  ColorStyle,
  Direction,
  Edges,
  Locale,
  SupportedSchemes,
  SupportedFundSource,
  SupportedPaymentAuthentications,
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
  order: {
    description: string;
    id: string;
    amount: number;
    currency: string;
    reference: string;
    metadata: {
      [key: string]: string;
    };
  };
  purpose: string;
  scope: string;
  post: {
    url: string;
  };
  features: {
    customerCards: {
      autoSaveCard: boolean;
      saveCard: boolean;
    };
    alternativeCardInputs: {
      cardScanner: boolean;
    };
    acceptanceBadge: boolean;
  };
  customer: {
    contact: {
      email: string;
      phone: {
        countryCode: string;
        number: string;
      };
    };
    name: Array<{
      lang: string;
      first: string;
      middle: string;
      last: string;
    }>;
    nameOnCard: string;
    id: string;
    editable: boolean;
  };
  acceptance: {
    supportedSchemes: string[];
    supportedFundSource: string[];
    supportedPaymentAuthentications: string[];
  };
  operator: {
    publicKey: string;
  };
  fieldVisibility: {
    card: {
      cvv: boolean;
      cardHolder: boolean;
    };
  };
  merchant: {
    id: string;
  };
  invoice: {
    id: string;
  };
  transaction: {
    paymentAgreement: {
      id: string;
      contract: {
        id: string;
      };
    };
    reference: string;
  };
  interface: {
    powered: boolean;
    loader: boolean;
    theme: string;
    cardDirection: string;
    colorStyle: string;
    edges: string;
    locale: string;
  };
};
