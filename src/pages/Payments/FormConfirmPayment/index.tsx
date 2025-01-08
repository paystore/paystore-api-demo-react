import React, { useCallback, useEffect } from 'react';
import { DeviceEventEmitter, Alert } from 'react-native';
import { Payment } from '../../../native_modules/payment';
import { RootStackParamList } from '../../../routes';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PaymentResult } from '../../../../types/paymentsModule';

type FormConfirmPaymentScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'FormConfirmPayment'
>;

export default function FormConfirmPayment({
  navigation,
  route
}: Readonly<FormConfirmPaymentScreenProps>) {
  const { item } = route.params;

  const confirmPayment = useCallback(
    (paymentItem: PaymentResult) => {
      const subscription = DeviceEventEmitter.addListener(
        'onPayment',
        (_event) => {
          subscription.remove();
          Alert.alert('Pagamento', 'Pagamento confirmado com Sucesso!');
          navigation.navigate('MainPayment', {});
        }
      );
      Payment.confirmPayment(JSON.stringify(paymentItem)).catch((e: any) => {
        subscription.remove();
        console.log(e);
      });
    },
    [navigation]
  );

  useEffect(() => {
    if (!item) {
      navigation.navigate('FormListPayments', {
        status: ['PENDING'],
        navigateTo: 'FormConfirmPayment',
        title: 'Lista de pagamentos pendentes'
      });
    } else {
      navigation.setOptions({
        title: 'Confirmar Pagamento'
      });
      confirmPayment(item);
    }
  }, [item, navigation, confirmPayment]);

  return <></>;
}
