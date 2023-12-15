import React, { useEffect } from 'react';
import { FlatList } from 'react-native';

import { Container, Button, ButtonText, StatusBar } from './styles';

import { RootStackParamList } from '../../routes';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type MainScreenProps = NativeStackScreenProps<RootStackParamList, 'Main'>;

type NavigationOption<T extends keyof RootStackParamList> = {
  id: string;
  title: string;
  navigationTo: T;
  params: RootStackParamList[T];
};

export default function Main({ navigation }: Readonly<MainScreenProps>) {
  useEffect(() => {
    navigation.setOptions({
      title: 'PayStore Api Demo'
    });
  });

  const options: Array<
    | NavigationOption<'Main'>
    | NavigationOption<'FormPayment'>
    | NavigationOption<'FormReversal'>
    | NavigationOption<'FormListPayments'>
    | NavigationOption<'FormCancelPayment'>
    | NavigationOption<'FormConfirmPayment'>
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
