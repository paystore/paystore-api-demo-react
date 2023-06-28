import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Main from '../pages/Main';
import FormPayment from '../pages/FormPayment';

function NavigationRoutes() {
  const Stack = createStackNavigator<RootStackParamList>();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: 'rgba(65,80,200,225)' },
        headerTitleStyle: { color: '#fff' }
      }}
    >
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="FormPayment" component={FormPayment} />
    </Stack.Navigator>
  );
}

export type RootStackParamList = {
  Main: undefined;
  FormPayment: {};
};

export default function Routes() {
  return (
    <NavigationContainer>
      <NavigationRoutes />
    </NavigationContainer>
  );
}
