import React, { useCallback, useEffect } from 'react';
import { DeviceEventEmitter, Alert } from 'react-native';
import { Payment } from '../../native_modules/payment';
import { RootStackParamList } from '../../routes';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type FormCancelPaymentScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'FormCancelPayment'
>;

export default function FormCancelPayment({
  navigation,
  route
}: Readonly<FormCancelPaymentScreenProps>) {
  const { item } = route.params;

  const cancelPayment = useCallback(
    (paymentId: string) => {
      const subscribe = DeviceEventEmitter.addListener(
        'onCancelPayments',
        () => {
          subscribe.remove();
          Alert.alert(
            'Cancelamento',
            'Cancelamento de pagamento realizado com Sucesso!'
          );
          navigation.navigate('Main', {});
        }
      );
      Payment.cancelPayment(paymentId).catch((e: any) => console.log(e));
    },
    [navigation]
  );

  useEffect(() => {
    if (!item) {
      navigation.navigate('FormListPayments', {
        status: ['PENDING'],
        navigateTo: 'FormCancelPayment',
        title: 'Lista de pagamentos pendentes'
      });
    } else {
      navigation.setOptions({
        title: 'Cancelar Pagamento'
      });
      cancelPayment(item.paymentId);
    }
  }, [item, navigation, cancelPayment]);

  return <></>;
}
