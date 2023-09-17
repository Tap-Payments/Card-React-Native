import { type Config } from 'card-sdk-react-native';

export type RootStackParamList = {
  ConfigScreen: { config: Config; setConfig: (config: Config) => void };
  HomeScreen: undefined;
};
