import React from 'react';
import { FlatList } from 'react-native';

import { Button, ButtonText, Container, StatusBar } from './styles';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../routes';

type MainPixScreenProps = NativeStackScreenProps<RootStackParamList, 'MainPix'>;

type NavigationOption<T extends keyof Partial<RootStackParamList>> = {
  id: string;
  title: string;
  navigationTo: T;
  params: RootStackParamList[T];
};

type NavigationOptions = {
  [K in keyof RootStackParamList]: NavigationOption<K>;
}[keyof RootStackParamList];

export default function MainPix({ navigation }: Readonly<MainPixScreenProps>) {
  const options: NavigationOptions[] = [
    {
      id: '1',
      title: 'Verificar App Pix Instalado',
      navigationTo: 'PixInstalled',
      params: {}
    },
    {
      id: '2',
      title: 'Gerar Cobrança',
      navigationTo: 'FormPixPayment',
      params: {}
    },
    {
      id: '3',
      title: 'Listar Pagamentos Pix',
      navigationTo: 'FormFilter',
      params: {
        title: 'Listar Pagamentos',
        filterType: 'COB'
      }
    },
    {
      id: '4',
      title: 'Devolver Pix',
      navigationTo: 'RefundPixOptions',
      params: {}
    },
    {
      id: '5',
      title: 'Consultar Pix',
      navigationTo: 'ConsultPixOptions',
      params: {}
    },
    {
      id: '6',
      title: 'Sincronizar',
      navigationTo: 'SyncPix',
      params: {}
    },
    {
      id: '6',
      title: 'Relatórios',
      navigationTo: 'FormFilter',
      params: {
        title: 'Relatórios',
        filterType: 'REPORT'
      }
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
