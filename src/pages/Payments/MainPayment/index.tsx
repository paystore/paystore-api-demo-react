import React, { useEffect } from 'react';
import { FlatList } from 'react-native';

import { Container, Button, ButtonText, StatusBar } from './styles';

import { RootStackParamList } from '../../../routes';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type MainPaymentScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'MainPayment'
>;

type NavigationOption<T extends keyof RootStackParamList> = {
  id: string;
  title: string;
  navigationTo: T;
  params: RootStackParamList[T];
};

export default function MainPayment({
  navigation
}: Readonly<MainPaymentScreenProps>) {
  useEffect(() => {
    navigation.setOptions({
      title: 'PayStore Api Demo'
    });
  });

  const options: Array<
    | NavigationOption<'FormPayment'>
    | NavigationOption<'FormReversal'>
    | NavigationOption<'FormListPayments'>
    | NavigationOption<'FormCancelPayment'>
    | NavigationOption<'FormConfirmPayment'>
    | NavigationOption<'TerminalInfo'>
    | NavigationOption<'ShowLogo'>
    | NavigationOption<'ShowReceiptLogo'>
    | NavigationOption<'FormMainApp'>
  > = [
    {
      id: '1',
      title: 'Pagamento (Solicitação + Confirmação)',
      navigationTo: 'FormPayment',
      params: {}
    },
    {
      id: '2',
      title: 'Estornar Pagamento',
      navigationTo: 'FormReversal',
      params: {}
    },
    {
      id: '3',
      title: 'Listar Pagamentos',
      navigationTo: 'FormListPayments',
      params: { status: [] }
    },
    {
      id: '4',
      title: 'Cancelar Pagamento',
      navigationTo: 'FormCancelPayment',
      params: {}
    },
    {
      id: '5',
      title: 'Confirmar Pagamento',
      navigationTo: 'FormConfirmPayment',
      params: {}
    },
    {
      id: '6',
      title: 'Informações do Terminal',
      navigationTo: 'TerminalInfo',
      params: {}
    },
    {
      id: '7',
      title: 'Definir aplicação principal',
      navigationTo: 'FormMainApp',
      params: {}
    },
    {
      id: '8',
      title: 'Obter Logo Portal',
      navigationTo: 'ShowLogo',
      params: {}
    },
    {
      id: '9',
      title: 'Obter Logo Recibo',
      navigationTo: 'ShowReceiptLogo',
      params: {}
    }
  ];
  return (
    <Container>
      <StatusBar />
      <FlatList
        data={options}
        renderItem={({ item }) => (
          <Button
            key={item.id}
            //@ts-ignore
            onPress={() => navigation.navigate(item.navigationTo, item.params)}
          >
            <ButtonText>{item.title}</ButtonText>
          </Button>
        )}
      />
    </Container>
  );
}
