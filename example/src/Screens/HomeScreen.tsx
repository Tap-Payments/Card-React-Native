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
  SupportedSchemes,
  SupportedFundSource,
  Theme,
  Edges,
  Direction,
  Scope,
  type ITapCardViewInputRef,
  SupportedPaymentAuthentications,
  ColorStyle,
  Purpose,
} from 'card-react-native';
import { useState, type MutableRefObject } from 'react';
type Props = NativeStackScreenProps<RootStackParamList, 'HomeScreen'>;

function HomeScreen({ navigation }: Props) {
  const [config, setConfigState] = useState<Config>({
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
