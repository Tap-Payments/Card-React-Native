/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import type { RootStackParamList } from './Screens.types';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import TapCardView, {
  Scope,
  SupportedFundSource,
  SupportedPaymentAuthentications,
  SupportedSchemes,
  TapCurrencyCode,
  type Config,
  type ITapCardViewInputRef,
} from 'card-react-native';
import { useState, type MutableRefObject } from 'react';
type Props = NativeStackScreenProps<RootStackParamList, 'HomeScreen'>;

function HomeScreen({ navigation }: Props) {
  const [config, setConfigState] = useState<Config>({
    merchant: {
      id: '67966359',
    },
    operator: {
      publicKey: 'pk_test_LFyakwcWDeuoAO1mTgRfd5Hi',
    },
    order: {
      amount: 1,
      currency: TapCurrencyCode.AED,
      description: 'Payment for order',
      id: '',
      reference: '',
      metadata: {},
    },
    scope: Scope.AuthenticatedToken,
    purpose: 'Save Card',
    customer: {
      id: 'cus_TS02A1320251102Kh950309263',
      nameOnCard: 'Mahmoud Allam 11',
      editable: true,
      name: [
        {
          first: 'Mahmoud',
          lang: 'en',
          middle: '',
          last: 'Allam',
        },
      ],
      contact: {
        phone: {
          number: '123123213',
          countryCode: '+971',
        },
        email: 'test@example.com',
      },
    },
    interface: {
      loader: true,
      locale: 'eng',
      theme: 'light',
      edges: 'curved',
      cardDirection: 'ltr',
      colorStyle: 'colored',
      powered: true,
    },
    acceptance: {
      supportedSchemes: [
        SupportedSchemes.AMEX,
        SupportedSchemes.MASTERCARD,
        SupportedSchemes.VISA,
      ],
      supportedFundSource: [
        SupportedFundSource.Debit,
        SupportedFundSource.Credit,
      ],
      supportedPaymentAuthentications: [
        SupportedPaymentAuthentications.secured,
      ],
    },
    fieldVisibility: {
      card: {
        cardHolder: true,
        cvv: true,
      },
    },
    features: {
      acceptanceBadge: true,
      customerCards: {
        saveCard: true,
        autoSaveCard: true,
      },
      alternativeCardInputs: {
        cardScanner: false,
        cardNFC: false,
      },
    },
    post: {
      url: `/api/v1/payment_cards`,
    },
    invoice: {
      id: '',
    },
    transaction: {
      reference: '',
      paymentAgreement: {
        id: '',
        contract: {
          id: '',
        },
      },
    },
  });

  const [response, setResponse] = useState<String>('');
  const [invalid, setInvalid] = useState<boolean>(true);

  const testRef =
    React.useRef<ITapCardViewInputRef>() as MutableRefObject<ITapCardViewInputRef>;

  React.useEffect(() => {
    setResponse('');
    setResponse(`config${JSON.stringify(config, null, 2)}`);
  }, [config]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <TapCardView
          onSuccess={(tokenValue) => {
            setResponse(
              `${response} \n =====onSuccessStart==== \n ${JSON.stringify(
                tokenValue,
                null,
                2
              )} \n =====onSuccessEnd===== \n`
            );
          }}
          ref={testRef}
          style={{ width: '95%' }}
          config={config}
          onChangeSaveCard={(cardSaved: boolean) => {
            setResponse(
              `${response} \n =====cardSaved====  \n ${cardSaved} \n =====cardSaved===== \n`
            );
          }}
          onHeightChange={() => {}}
          onReady={() => {
            setResponse(
              `${response} \n =====onReady==== \n onReady \n =====onReady===== \n`
            );
          }}
          onFocus={() => {
            setResponse(
              `${response} \n =====onFocus==== \n onFocus \n =====onFocus===== \n`
            );
          }}
          onBinIdentification={(binIdentification: Object) => {
            setResponse(
              `${response} \n =====onBinIdentificationStart==== \n ${JSON.stringify(
                binIdentification,
                null,
                2
              )} \n =====onBinIdentificationEnd===== \n`
            );
          }}
          onInvalidInput={(invalidInput: boolean) => {
            console.log(
              '🚀 ~ file: HomeScreen.tsx:174 ~ HomeScreen ~ invalidInput:',
              invalidInput
            );
            setInvalid(invalidInput);
            setResponse(
              `${response} \n =====onInvalidInputStart==== \n ${invalid} \n =====onInvalidInputEnd===== \n`
            );
          }}
          onError={(error: object) => {
            setResponse(
              `${response} \n =====onErrorStart==== \n ${JSON.stringify(
                error,
                null,
                2
              )} \n =====onErrorEnd===== \n`
            );
          }}
        />
        <TouchableOpacity
          // disabled={invalid}
          onPress={() => {
            testRef.current.generateToken();
          }}
        >
          <Text style={{ color: invalid ? 'gray' : 'green' }}>
            Generate Token
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ConfigScreen', {
              config,
              setConfig: setConfigState,
            });
          }}
        >
          <Text style={{ color: 'black' }}>Config SDK</Text>
        </TouchableOpacity>
        <ScrollView>
          <Text style={{ color: 'black' }}>{response}</Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

export default HomeScreen;
