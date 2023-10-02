import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Switch,
  ScrollView,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  useForm,
  Controller,
  type SubmitHandler,
  type FieldValues,
} from 'react-hook-form';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from './Screens.types';
import {
  Direction,
  Edges,
  Locale,
  Scope,
  SupportedBrands,
  SupportedCards,
  TapCurrencyCode,
  Theme,
} from 'card-react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'ConfigScreen'>;

function ConfigScreen({ route, navigation }: Props) {
  const { config, setConfig } = route.params;
  const [currencyListOpen, setCurrencyListOpen] = useState(false);
  const [modeListOpen, setModeListOpen] = useState(false);
  const [supportedBrandListOpen, setSupportedBrandListOpen] = useState(false);
  const [supportedCardListOpen, setSupportedCardListOpen] = useState(false);

  const [localListOpen, setLocalListOpen] = useState(false);
  const [themeListOpen, setThemeListOpen] = useState(false);
  const [edgesListOpen, setEdgesListOpen] = useState(false);
  const [directionListOpen, setDirectionListOpen] = useState(false);
  const [supportedCards, setSupportedCards] = useState<SupportedCards[]>([]);
  const [cardBrands, setCardBrands] = useState<SupportedBrands[]>([]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    setValue('key', config.publicKey);
    setValue('merchantId', config.merchant.id);
    setValue('amount', config.order.amount.toString());
    setValue('currency', config.order.currency);
    setValue('customerId', config.customer.id);
    setValue('nameOnCard', config.customer.nameOnCard);
    setValue('firstName', config.customer.name[0]?.first);
    setValue('lastName', config.customer.name[0]?.last);
    setValue('middleName', config.customer.name[0]?.middle);
    setValue('customerEmail', config.customer.contact.email);
    setValue('customerCountryCode', config.customer.contact.phone.number);
    setValue('customerPhone', config.customer.contact.phone.countryCode);
    setValue('editable', config.customer.editable);
    setSupportedCards(config.acceptance.supportedFundSource);
    setCardBrands(config.acceptance.supportedSchemes);
    setValue('saveCard', config.features.customerCards.saveCard);
    setValue('loader', config.addons.loader);
    setValue('scanner', config.features.scanner);
    setValue('nfc', config.features.nfc);
    setValue('cardHolder', config.fields.card.cardHolder);
    setValue('cvv', config.fields.card.cvv);
    setValue('edges', config.interface.edges);
    setValue('scope', config.scope);
    setValue('direction', config.interface.cardDirection);
    setValue('theme', config.interface.theme);
    setValue('locale', config.interface.locale);
  }, [
    config.acceptance.supportedFundSource,
    config.acceptance.supportedSchemes,
    config.addons.loader,
    config.customer.contact.email,
    config.customer.contact.phone.countryCode,
    config.customer.contact.phone.number,
    config.customer.editable,
    config.customer.id,
    config.customer.name,
    config.customer.nameOnCard,
    config.features.customerCards.saveCard,
    config.features.nfc,
    config.features.scanner,
    config.fields.card.cardHolder,
    config.fields.card.cvv,
    config.interface.cardDirection,
    config.interface.edges,
    config.interface.locale,
    config.interface.theme,
    config.merchant.id,
    config.operator.publicKey,
    config.order.amount,
    config.order.currency,
    config.publicKey,
    config.scope,
    setValue,
  ]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setConfig({
      ...config,
      publicKey: data.key,
      operator: { publicKey: data.key },
      merchant: { id: data.merchantId },
      order: {
        ...config.order,
        amount: data.amount,
        currency: data.currency,
      },
      transaction: {
        ...config.transaction,
      },
      customer: {
        editable: data.editable,
        nameOnCard: data.nameOnCard ?? data.firstName,
        id: data.customerId,
        name: [
          {
            first: data.firstName,
            last: data.lastName,
            middle: data.middleName,
            lang: Locale.en,
          },
        ],
        contact: {
          email: data.customerEmail,
          phone: {
            number: data.customerCountryCode,
            countryCode: data.customerPhone,
          },
        },
      },
      acceptance: {
        supportedFundSource: supportedCards,
        supportedSchemes: cardBrands,
        supportedPaymentAuthentications: ['3DS'],
      },
      addons: {
        loader: data.loader,
      },
      features: {
        customerCards: {
          saveCard: data.saveCard,
          autoSaveCard: data.autoSaveCard,
        },
        scanner: data.scanner,
        acceptanceBadge: data.acceptanceBadge,
        nfc: data.nfc,
      },
      fields: {
        card: { cardHolder: data.cardHolder, cvv: data.cvv },
      },
      scope: data.scope,
      interface: {
        colorStyle: 'monochrome',
        powered: data.powered,
        cardDirection: data.direction,
        theme: data.theme,
        locale: data.locale,
        edges: data.edges,
      },
    });
    navigation.pop();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={[styles.container]}>
        <View style={styles.container}>
          <Text>{'public key'}</Text>
          <Controller
            control={control}
            name="key"
            render={({ field: { onChange, value } }) => (
              <View style={styles.textBox}>
                <TextInput
                  style={styles.text}
                  placeholder="public key"
                  defaultValue={value}
                  onChangeText={(v) => onChange(v)}
                />
              </View>
            )}
            rules={{
              required: {
                value: true,
                message: 'Please fill out all required fields.',
              },
            }}
          />

          {errors.key?.message ? (
            <Text style={styles.errorText}>{`${errors.key?.message}`}</Text>
          ) : null}
          <Text>{'Scope'}</Text>
          <Controller
            control={control}
            name="scope"
            render={({ field: { onChange, value } }) => {
              return (
                <DropDownPicker
                  style={styles.dropdown}
                  placeholder="Select your mode"
                  placeholderStyle={styles.dropdownPlaceholder}
                  open={modeListOpen}
                  setOpen={() => setModeListOpen(!modeListOpen)}
                  items={Object.keys(Scope).map((item) => ({
                    label: item,
                    value: item,
                  }))}
                  value={value}
                  setValue={(item: any) => onChange(item())}
                  mode="BADGE"
                />
              );
            }}
            rules={{
              required: {
                value: true,
                message: 'Please fill out all required fields.',
              },
            }}
          />

          {errors.scope?.message ? (
            <Text style={styles.errorText}>{`${errors.scope?.message}`}</Text>
          ) : null}
          <View style={{ height: 20 }}></View>
          <Text>{'Merchant Id'}</Text>

          <Controller
            control={control}
            name="merchantId"
            render={({ field: { onChange, value } }) => (
              <View style={styles.textBox}>
                <TextInput
                  style={styles.text}
                  placeholder="Merchant Id"
                  defaultValue={value}
                  onChangeText={(v) => onChange(v)}
                />
              </View>
            )}
          />

          {errors.merchantId?.message ? (
            <Text
              style={styles.errorText}
            >{`${errors.merchantId?.message}`}</Text>
          ) : null}

          <View style={{ height: 20 }}></View>

          <Text>{'Amount'}</Text>

          <Controller
            control={control}
            name="amount"
            render={({ field: { onChange, value } }) => (
              <View style={styles.textBox}>
                <TextInput
                  keyboardType="numeric"
                  style={styles.text}
                  placeholder="Amount"
                  defaultValue={value}
                  onChangeText={(v) => onChange(v)}
                />
              </View>
            )}
            rules={{
              required: {
                value: true,
                message: 'Please fill out all required fields.',
              },
            }}
          />

          <Text>{'Currency'}</Text>

          <Controller
            control={control}
            name="currency"
            render={({ field: { onChange, value } }) => (
              <DropDownPicker
                multiple={false}
                style={styles.dropdown}
                placeholder="Select your Currency"
                placeholderStyle={styles.dropdownPlaceholder}
                open={currencyListOpen}
                setOpen={() => setCurrencyListOpen(!currencyListOpen)}
                items={Object.keys(TapCurrencyCode).map((item) => ({
                  label: item,
                  value: item,
                }))}
                value={value}
                setValue={(item: any) => onChange(item())}
                mode="BADGE"
              />
            )}
            rules={{
              required: {
                value: true,
                message: 'Please fill out all required fields.',
              },
            }}
          />

          {errors.currency?.message ? (
            <Text
              style={styles.errorText}
            >{`${errors.currency?.message}`}</Text>
          ) : null}

          <View style={{ zIndex: -1 }}>
            <View style={{ height: 20 }}></View>

            <Text>{'Customer ID'}</Text>
            <Controller
              control={control}
              name="customerId"
              render={({ field: { onChange, value } }) => (
                <View style={styles.textBox}>
                  <TextInput
                    style={styles.text}
                    placeholder="Customer Id"
                    defaultValue={value}
                    onChangeText={(v) => onChange(v)}
                  />
                </View>
              )}
            />

            {errors.customerId?.message ? (
              <Text
                style={styles.errorText}
              >{`${errors.customerId?.message}`}</Text>
            ) : null}

            <Text>{'First name'}</Text>
            <Controller
              control={control}
              name="firstName"
              render={({ field: { onChange, value } }) => (
                <View style={styles.textBox}>
                  <TextInput
                    style={styles.text}
                    placeholder="first name"
                    defaultValue={value}
                    onChangeText={(v) => onChange(v)}
                  />
                </View>
              )}
              rules={{
                required: {
                  value: true,
                  message: 'Please fill out all required fields.',
                },
              }}
            />

            <Text>{'First name'}</Text>
            <Controller
              control={control}
              name="nameOnCard"
              render={({ field: { onChange, value } }) => (
                <View style={styles.textBox}>
                  <TextInput
                    style={styles.text}
                    placeholder="Name on Card"
                    defaultValue={value}
                    onChangeText={(v) => onChange(v)}
                  />
                </View>
              )}
            />

            {errors.firstName?.message ? (
              <Text
                style={styles.errorText}
              >{`${errors.firstName?.message}`}</Text>
            ) : null}

            <Text>{'Middle Name'}</Text>
            <Controller
              control={control}
              name="middleName"
              render={({ field: { onChange, value } }) => (
                <View style={styles.textBox}>
                  <TextInput
                    style={styles.text}
                    placeholder="Middle Name"
                    defaultValue={value}
                    onChangeText={(v) => onChange(v)}
                  />
                </View>
              )}
              rules={{
                required: {
                  value: true,
                  message: 'Please fill out all required fields.',
                },
              }}
            />

            {errors.middleName?.message ? (
              <Text
                style={styles.errorText}
              >{`${errors.middleName?.message}`}</Text>
            ) : null}

            <Text>{'Last Name'}</Text>
            <Controller
              control={control}
              name="lastName"
              render={({ field: { onChange, value } }) => (
                <View style={styles.textBox}>
                  <TextInput
                    style={styles.text}
                    placeholder="Last Name"
                    defaultValue={value}
                    onChangeText={(v) => onChange(v)}
                  />
                </View>
              )}
              rules={{
                required: {
                  value: true,
                  message: 'Please fill out all required fields.',
                },
              }}
            />

            {errors.lastName?.message ? (
              <Text
                style={styles.errorText}
              >{`${errors.lastName?.message}`}</Text>
            ) : null}

            <Text>{'Customer Phone'}</Text>
            <Controller
              control={control}
              name="customerPhone"
              render={({ field: { onChange, value } }) => (
                <View style={styles.textBox}>
                  <TextInput
                    style={styles.text}
                    placeholder="Customer Phone"
                    defaultValue={value}
                    onChangeText={(v) => onChange(v)}
                  />
                </View>
              )}
              rules={{
                required: {
                  value: true,
                  message: 'Please fill out all required fields.',
                },
              }}
            />

            {errors.customerPhone?.message ? (
              <Text
                style={styles.errorText}
              >{`${errors.customerPhone?.message}`}</Text>
            ) : null}

            <Text>{'Customer Country Code'}</Text>
            <Controller
              control={control}
              name="customerCountryCode"
              render={({ field: { onChange, value } }) => (
                <View style={styles.textBox}>
                  <TextInput
                    style={styles.text}
                    placeholder="Customer Country Code"
                    defaultValue={value}
                    onChangeText={(v) => onChange(v)}
                  />
                </View>
              )}
              rules={{
                required: {
                  value: true,
                  message: 'Please fill out all required fields.',
                },
              }}
            />
            {errors.customerCountryCode?.message ? (
              <Text
                style={styles.errorText}
              >{`${errors.customerCountryCode?.message}`}</Text>
            ) : null}

            <Text>{'Customer Email'}</Text>
            <Controller
              control={control}
              name="customerEmail"
              render={({ field: { onChange, value } }) => (
                <View style={styles.textBox}>
                  <TextInput
                    style={styles.text}
                    placeholder="Customer Email"
                    defaultValue={value}
                    onChangeText={(v) => onChange(v)}
                  />
                </View>
              )}
              rules={{
                required: {
                  value: true,
                  message: 'Please fill out all required fields.',
                },
              }}
            />

            <Text style={{ marginVertical: 10 }}>{'editable'}</Text>
            <Controller
              control={control}
              name="editable"
              defaultValue={false}
              render={({ field: { onChange, value } }) => {
                return (
                  <Switch
                    value={value}
                    onValueChange={(val: boolean) => {
                      onChange(val);
                    }}
                  />
                );
              }}
            />

            <View style={{ height: 20 }}></View>

            <Text>{'Supported Brand'}</Text>
            <DropDownPicker
              multiple={true}
              style={styles.dropdown}
              placeholder="Supported Brand"
              placeholderStyle={styles.dropdownPlaceholder}
              open={supportedBrandListOpen}
              setOpen={() => setSupportedBrandListOpen(!supportedBrandListOpen)}
              items={Object.keys(SupportedBrands).map((item) => {
                return { label: item, value: item };
              })}
              value={cardBrands}
              setValue={setCardBrands}
              mode="BADGE"
            />
            <View style={{ zIndex: -2 }}>
              <Text>{'Supported Cards'}</Text>
              <DropDownPicker
                multiple={true}
                style={styles.dropdown}
                placeholder="Supported Cards"
                placeholderStyle={styles.dropdownPlaceholder}
                open={supportedCardListOpen}
                setOpen={() => setSupportedCardListOpen(!supportedCardListOpen)}
                items={Object.keys(SupportedCards).map((item) => {
                  return { label: item, value: item };
                })}
                value={supportedCards}
                setValue={setSupportedCards}
                mode="BADGE"
              />
              <View style={{ zIndex: -3 }}>
                <Controller
                  control={control}
                  name="locale"
                  render={({ field: { onChange, value } }) => {
                    return (
                      <DropDownPicker
                        style={styles.dropdown}
                        placeholder="Locale"
                        placeholderStyle={styles.dropdownPlaceholder}
                        open={localListOpen}
                        setOpen={() => setLocalListOpen(!localListOpen)}
                        items={Object.keys(Locale).map((item) => ({
                          label: item,
                          value: item,
                        }))}
                        value={value}
                        setValue={(item: any) => onChange(item())}
                        mode="BADGE"
                      />
                    );
                  }}
                  rules={{
                    required: {
                      value: true,
                      message: 'Please fill out all required fields.',
                    },
                  }}
                />
                <View style={{ zIndex: -4 }}>
                  <Text style={{ marginVertical: 10 }}>{'Card Holder'}</Text>
                  <Controller
                    control={control}
                    name="cardHolder"
                    defaultValue={false}
                    render={({ field: { onChange, value } }) => {
                      return (
                        <Switch
                          value={value}
                          onValueChange={(val: boolean) => {
                            onChange(val);
                          }}
                        />
                      );
                    }}
                  />

                  <Text style={{ marginVertical: 10 }}>{'cvv'}</Text>
                  <Controller
                    control={control}
                    name="cvv"
                    defaultValue={false}
                    render={({ field: { onChange, value } }) => {
                      return (
                        <Switch
                          value={value}
                          onValueChange={(val: boolean) => {
                            onChange(val);
                          }}
                        />
                      );
                    }}
                  />

                  <Text style={{ marginVertical: 10 }}>{'powered'}</Text>
                  <Controller
                    control={control}
                    name="powered"
                    defaultValue={false}
                    render={({ field: { onChange, value } }) => {
                      return (
                        <Switch
                          value={value}
                          onValueChange={(val: boolean) => {
                            onChange(val);
                          }}
                        />
                      );
                    }}
                  />

                  <Text style={{ marginVertical: 10 }}>
                    {'Acceptance Badge'}
                  </Text>
                  <Controller
                    control={control}
                    name="acceptanceBadge"
                    defaultValue={false}
                    render={({ field: { onChange, value } }) => {
                      return (
                        <Switch
                          value={value}
                          onValueChange={(val: boolean) => {
                            onChange(val);
                          }}
                        />
                      );
                    }}
                  />

                  <Text style={{ marginVertical: 10 }}>{'Auto save card'}</Text>
                  <Controller
                    control={control}
                    name="autoSaveCard"
                    defaultValue={false}
                    render={({ field: { onChange, value } }) => {
                      return (
                        <Switch
                          value={value}
                          onValueChange={(val: boolean) => {
                            onChange(val);
                          }}
                        />
                      );
                    }}
                  />
                  <Text style={{ marginVertical: 10 }}>{'Scanner'}</Text>
                  <Controller
                    control={control}
                    name="scanner"
                    defaultValue={false}
                    render={({ field: { onChange, value } }) => {
                      return (
                        <Switch
                          value={value}
                          onValueChange={(val: boolean) => {
                            onChange(val);
                          }}
                        />
                      );
                    }}
                  />

                  <Text style={{ marginVertical: 10 }}>{'NFC'}</Text>
                  <Controller
                    control={control}
                    name="nfc"
                    defaultValue={false}
                    render={({ field: { onChange, value } }) => {
                      return (
                        <Switch
                          value={value}
                          onValueChange={(val: boolean) => {
                            onChange(val);
                          }}
                        />
                      );
                    }}
                  />

                  <Text style={{ marginVertical: 10 }}>{'Loader'}</Text>
                  <Controller
                    control={control}
                    name="loader"
                    defaultValue={false}
                    render={({ field: { onChange, value } }) => {
                      return (
                        <Switch
                          value={value}
                          onValueChange={(val: boolean) => {
                            onChange(val);
                          }}
                        />
                      );
                    }}
                  />

                  <Text style={{ marginVertical: 10 }}>{'Save Card'}</Text>
                  <Controller
                    control={control}
                    name="saveCard"
                    defaultValue={false}
                    render={({ field: { onChange, value } }) => {
                      return (
                        <Switch
                          value={value}
                          onValueChange={(val: boolean) => {
                            onChange(val);
                          }}
                        />
                      );
                    }}
                  />
                  <Controller
                    control={control}
                    name="edges"
                    render={({ field: { onChange, value } }) => {
                      return (
                        <DropDownPicker
                          style={styles.dropdown}
                          placeholder="Edges"
                          placeholderStyle={styles.dropdownPlaceholder}
                          open={edgesListOpen}
                          setOpen={() => setEdgesListOpen(!edgesListOpen)}
                          items={Object.keys(Edges).map((item) => ({
                            label: item,
                            value: item,
                          }))}
                          value={value}
                          setValue={(item: any) => {
                            onChange(item());
                          }}
                          mode="BADGE"
                        />
                      );
                    }}
                    rules={{
                      required: {
                        value: true,
                        message: 'Please fill out all required fields.',
                      },
                    }}
                  />
                  <View style={{ zIndex: -8 }}>
                    <Text>{'Direction'}</Text>
                    <Controller
                      control={control}
                      name="direction"
                      render={({ field: { onChange, value } }) => {
                        return (
                          <DropDownPicker
                            style={styles.dropdown}
                            placeholder="Direction"
                            placeholderStyle={styles.dropdownPlaceholder}
                            open={directionListOpen}
                            setOpen={() =>
                              setDirectionListOpen(!directionListOpen)
                            }
                            items={Object.keys(Direction).map((item) => ({
                              label: item,
                              value: item,
                            }))}
                            value={value}
                            setValue={(item: any) => {
                              onChange(item());
                            }}
                            mode="BADGE"
                          />
                        );
                      }}
                      rules={{
                        required: {
                          value: true,
                          message: 'Please fill out all required fields.',
                        },
                      }}
                    />

                    <View style={{ zIndex: -1 }}>
                      <Text>{'Theme'}</Text>
                      <Controller
                        control={control}
                        name="theme"
                        render={({ field: { onChange, value } }) => {
                          return (
                            <DropDownPicker
                              style={styles.dropdown}
                              placeholder="Theme"
                              placeholderStyle={styles.dropdownPlaceholder}
                              open={themeListOpen}
                              setOpen={() => setThemeListOpen(!themeListOpen)}
                              items={Object.keys(Theme).map((item) => ({
                                label: item,
                                value: item,
                              }))}
                              value={value}
                              setValue={(item: any) => {
                                onChange(item());
                              }}
                              mode="BADGE"
                            />
                          );
                        }}
                        rules={{
                          required: {
                            value: true,
                            message: 'Please fill out all required fields.',
                          },
                        }}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={{ height: 100, zIndex: -10 }} />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            handleSubmit(onSubmit, (err) => {
              console.log(
                '🚀 ~ file: ConfigScreen.tsx:763 ~ handleSubmit ~ err:',
                err
              );
            })();
          }}
        >
          <Text style={styles.buttonText}>{'Edit'}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    alignItems: 'center',
    justifyContent: 'space-around',
    margin: 16,
  },
  container: {
    width: '100%',
  },
  textBox: {
    backgroundColor: '#fafafa',
    borderRadius: 10,
    paddingStart: 5,
    borderColor: '#e4e4e4',
    borderWidth: 1,
    alignSelf: 'stretch',
    marginVertical: 7,
  },
  text: {
    fontSize: 15,
    paddingVertical: 10,
  },
  errorText: {
    color: 'red',
  },
  dropdown: {
    marginVertical: 10,
  },
  dropdownPlaceholder: {
    color: '#c7c7c8',
  },
  button: {
    width: '100%',
    backgroundColor: '#517CFF',
    borderRadius: 10,
    paddingVertical: 10,
    marginVertical: 20,
  },
  buttonText: {
    color: 'white',
    alignSelf: 'center',
  },
});

export default ConfigScreen;
