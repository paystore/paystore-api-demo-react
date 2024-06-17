import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Main from '../pages/Main';
import FormPayment from '../pages/FormPayment';
import FormReversal from '../pages/FormReversal';
import FormListPayments from '../pages/FormListPayments';
import FormCancelPayment from '../pages/FormCancelPayment';
import FormConfirmPayment from '../pages/FormConfirmPayment';
import { PaymentResult, PaymentStatus } from '../../types/paymentsModule';
import ShowPaymentResult from '../pages/ShowPaymentResult';

function NavigationRoutes() {
  const Stack = createStackNavigator<RootStackParamList>();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: 'rgba(65,80,200,225)' },
        headerTitleStyle: { color: '#fff' },
        headerTintColor: '#fff'
      }}
    >
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="FormPayment" component={FormPayment} />
      <Stack.Screen name="FormReversal" component={FormReversal} />
      <Stack.Screen name="FormListPayments" component={FormListPayments} />
      <Stack.Screen name="FormCancelPayment" component={FormCancelPayment} />
      <Stack.Screen name="FormConfirmPayment" component={FormConfirmPayment} />
      <Stack.Screen name="ShowPaymentResult" component={ShowPaymentResult} />
    </Stack.Navigator>
  );
}

export type RootStackParamList = {
  Main: {};
  FormPayment: {};
  FormReversal: {
    item?: PaymentResult;
  };
  FormListPayments: {
    status: PaymentStatus[];
    navigateTo?: keyof RootStackParamList;
    title?: string;
  };
  FormCancelPayment: {
    item?: PaymentResult;
  };
  FormConfirmPayment: {
    item?: PaymentResult;
  };
  ShowPaymentResult: {
    item: PaymentResult;
  };
};

export default function Routes() {
  return (
    <NavigationContainer>
      <NavigationRoutes />
    </NavigationContainer>
  );
}
