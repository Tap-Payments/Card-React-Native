import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen, ConfigScreen, type RootStackParamList } from './Screens';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    // <View style={styles.container}>
    <NavigationContainer>
      {
        <Stack.Navigator>
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ConfigScreen"
            component={ConfigScreen}
            options={{
              title: 'Configurations',
              headerBackTitle: 'Back',
            }}
          />
        </Stack.Navigator>
      }
    </NavigationContainer>
    // </View>
  );
}
