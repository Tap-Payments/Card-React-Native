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
import { useState, type MutableRefObject } from 'react';
type Props = NativeStackScreenProps<RootStackParamList, 'HomeScreen'>;

function HomeScreen({ navigation }: Props) {
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
  const [config, setConfigState] = useState<Config>({
    publicKey: 'pk_test_YhUjg9PNT8oDlKJ1aE2fMRz7',
    merchant: {
      id: '',
    },
    transaction: {
      amount: 1,
      currency: TapCurrencyCode.SAR,
      description: '',
      metadata: {},
      reference: `tck_LV${generateTransactionId()}`,
    },
    order: {
      id: `${generateOrderId()}`,
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
  });

  const [response, setResponse] = useState<String>('');
  const [invalid, setInvalid] = useState<boolean>(true);

  const testRef =
    React.useRef<ITapCardViewInputRef>() as MutableRefObject<ITapCardViewInputRef>;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        // eslint-disable-next-line react-native/no-inline-styles
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
          style={{ width: '100%' }}
          config={config}
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
          <Text>Config SDK</Text>
        </TouchableOpacity>
        <ScrollView>
          <Text>{response}</Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

export default HomeScreen;
