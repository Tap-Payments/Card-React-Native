import { type Config } from 'card-react-native';

export type RootStackParamList = {
  ConfigScreen: { config: Config; setConfig: (config: Config) => void };
  HomeScreen: undefined;
};
