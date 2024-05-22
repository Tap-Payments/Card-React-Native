export enum SupportedSchemes {
  AMEX = 'AMEX',
  CARTESBANCAIRES = 'CARTESBANCAIRES',
  DISCOVER = 'DISCOVER',
  EFTPOS = 'EFTPOS',
  ELECTRON = 'ELECTRON',
  IDCREDIT = 'IDCREDIT',
  INTERAC = 'INTERAC',
  JCB = 'JCB',
  MAESTRO = 'MAESTRO',
  MASTERCARD = 'MASTERCARD',
  PRIVATELABEL = 'PRIVATELABEL',
  QUICPAY = 'QUICPAY',
  SUICA = 'SUICA',
  VISA = 'VISA',
  VPAY = 'VPAY',
  MADA = 'MADA',
}

export enum Scope {
  Token = 'Token',
  AuthenticatedToken = 'AuthenticatedToken',
}

export enum SdkMode {
  production,
  sandbox,
}

export enum Locale {
  en = 'en',
  ar = 'ar',
}

export enum SupportedFundSource {
  All = 'All',
  Debit = 'DEBIT',
  Credit = 'CREDIT',
}

export enum Purpose {
  Charge = 'Charge',
  Authorize = 'Authorize',
  SaveToken = 'Save Token',
}

export enum SupportedPaymentAuthentications {
  secured = '3ds',
}
export enum ColorStyle {
  monochrome = 'monochrome',
  colored = 'colored',
}
export enum Theme {
  light = 'light',
  dark = 'dark',
}

export enum Edges {
  curved = 'curved',
  flat = 'flat',
}

export enum Direction {
  ltr = 'ltr',
  rtl = 'rtl',
}
