import React, { useCallback, useEffect, useState } from 'react';
import { RootStackParamList } from '../../routes';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HeaderBackButton } from '@react-navigation/elements';
import {
  FlatList,
  DeviceEventEmitter,
  RefreshControl,
  Text
} from 'react-native';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import { PaymentItem } from '../../components/PaymentItem';
import { Payment } from '../../native_modules/payment';
import { PaymentResult } from '../../../types/paymentsModule';
import { Container } from '../Main/styles';
import {
  HeaderBackButtonProps,
  NativeStackNavigationProp
} from '@react-navigation/native-stack/lib/typescript/src/types';

type FormListPaymentsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'FormListPayments'
>;

const headerLeft = (
  props: HeaderBackButtonProps,
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    'FormListPayments',
    undefined
  >
) => (
  <HeaderBackButton
    {...props}
    onPress={() => navigation.navigate('Main', {})}
  />
);

export default function FormListPayments({
  navigation,
  route
}: Readonly<FormListPaymentsScreenProps>) {
  const { status, navigateTo, title } = route.params;
  useEffect(() => {
    navigation.setOptions({
      title: title ?? 'Lista de Pagamentos',
      headerLeft: (props) => headerLeft(props, navigation)
    });
  }, [navigation, title]);

  const [payments, setPayments] = useState<PaymentResult[]>([]);

  const [loading, setLoading] = useState(true);

  const fetchPayments = useCallback(() => {
    const subscribe = DeviceEventEmitter.addListener(
      'onFindPayments',
      (result: PaymentResult[]) => {
        subscribe.remove();
        setPayments(result);
        setLoading(false);
      }
    );
    Payment.listPayments(status).catch((e) => console.log(e));
  }, [status]);

  useEffect(() => {
    setLoading(true);
    fetchPayments();
  }, [fetchPayments]);

  return (
    <Container>
      <FlatList
        data={payments}
        keyExtractor={(item, index) => `${index}`}
        refreshControl={
          <RefreshControl onRefresh={fetchPayments} refreshing={loading} />
        }
        ListEmptyComponent={
          <Text style={{ textAlign: 'center' }}>
            {loading ? '' : 'Nenhum dado encontrado'}
          </Text>
        }
        renderItem={({ item }) => (
          <TouchableNativeFeedback
            onPress={() => {
              if (navigateTo) {
                //@ts-ignore
                return navigation.navigate(navigateTo, { item });
              }
            }}
          >
            <PaymentItem
              item={{
                cardBrand: item.card.brand,
                cardNumber: `BIN **** ${item.card.panLast4Digits}`,
                status: item.paymentStatus,
                value: `R$ ${item.value.toFixed(2)}`,
                dateTime: item.paymentDate
              }}
            />
          </TouchableNativeFeedback>
        )}
      />
    </Container>
  );
}
