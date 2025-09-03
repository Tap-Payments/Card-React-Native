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
  type Config,
  type ITapCardViewInputRef,
} from 'card-react-native';
import { useState, type MutableRefObject } from 'react';
type Props = NativeStackScreenProps<RootStackParamList, 'HomeScreen'>;

function HomeScreen({ navigation }: Props) {
  const [config, setConfigState] = useState<Config>({
    order: {
      description: 'Authentication description',
      id: '',
      amount: 1,
      currency: 'SAR',
      reference: 'order_ref',
      metadata: {
        key: 'value',
      },
    },
    purpose: 'Charge',
    scope: 'Token',
    post: {
      url: '',
    },
    features: {
      customerCards: {
        autoSaveCard: true,
        saveCard: true,
      },
      alternativeCardInputs: {
        cardScanner: true,
        cardNFC: true,
      },
      acceptanceBadge: true,
    },
    customer: {
      contact: {
        email: 'tap@tap.company',
        phone: {
          countryCode: '+965',
          number: '88888888',
        },
      },
      name: [
        {
          lang: 'en',
          first: 'TAP',
          middle: '',
          last: 'PAYMENTS',
        },
      ],
      nameOnCard: 'TAP PAYMENTS',
      id: '',
      editable: true,
    },
    acceptance: {
      supportedSchemes: [
        'AMERICAN_EXPRESS',
        'VISA',
        'MASTERCARD',
        'OMANNET',
        'MADA',
      ],
      supportedFundSource: ['CREDIT', 'DEBIT'],
      supportedPaymentAuthentications: ['3DS'],
    },
    operator: {
      publicKey: 'pk_test_YhUjg9PNT8oDlKJ1aE2fMRz7',
    },
    fieldVisibility: {
      card: {
        cvv: false,
        cardHolder: true,
      },
    },
    merchant: {
      id: '1124340',
    },
    invoice: {
      id: 'inv',
    },
    transaction: {
      paymentAgreement: {
        id: '',
        contract: {
          id: '',
        },
      },
      reference: 'trx_ref',
    },
    interface: {
      powered: true,
      loader: true,
      theme: 'light',
      cardDirection: 'LTR',
      colorStyle: 'colored',
      edges: 'curved',
      locale: 'dynamic',
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
