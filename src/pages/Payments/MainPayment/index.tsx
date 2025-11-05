import React, { useEffect } from 'react';
import { FlatList } from 'react-native';

import { Button, ButtonText, Container, StatusBar } from './styles';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../routes';

type MainPaymentScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'MainPayment'
>;

type NavigationOption<T extends keyof Partial<RootStackParamList>> = {
  id: string;
  title: string;
  navigationTo: T;
  params: RootStackParamList[T];
};

type NavigationOptions = {
  [K in keyof RootStackParamList]: NavigationOption<K>;
}[keyof RootStackParamList];

export default function MainPayment({
  navigation
}: Readonly<MainPaymentScreenProps>) {
  useEffect(() => {
    navigation.setOptions({
      title: 'PayStore Api Demo'
    });
  });

  const options: NavigationOptions[] = [
    {
      id: '1',
      title: 'Pagamento (Solicitação + Confirmação)',
      navigationTo: 'FormPayment',
      params: {}
    },
    {
      id: '2',
      title: 'Filtrar Pagamentos',
      navigationTo: 'FormFindPayment',
      params: { request: {} }
    },
    {
      id: '3',
      title: 'Estornar Pagamento',
      navigationTo: 'FormReversal',
      params: {}
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
    },
    {
      id: '10',
      title: 'Reimprimir Comprovante',
      navigationTo: 'ReprintReceipt',
      params: {}
    },
    {
      id: '11',
      title: 'Inicializar',
      navigationTo: 'StartInitialization',
      params: {}
    },
    {
      id: '12',
      title: 'Autenticar Supervisor',
      navigationTo: 'FormSupervisorPasswordCheck',
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
