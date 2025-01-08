import React, { useEffect } from 'react';
import { FlatList } from 'react-native';

import { Container, Button, ButtonText, StatusBar } from './styles';

import { RootStackParamList } from '../../../routes';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CobStatusList } from '../../../utils/constants';

type MainPixScreenProps = NativeStackScreenProps<RootStackParamList, 'MainPix'>;

type NavigationOption<T extends keyof RootStackParamList> = {
  id: string;
  title: string;
  navigationTo: T;
  params: RootStackParamList[T];
};

export default function MainPix({ navigation }: Readonly<MainPixScreenProps>) {
  const options: Array<
    | NavigationOption<'FormPixPayment'>
    | NavigationOption<'RefundPixOptions'>
    | NavigationOption<'FormListPix'>
    | NavigationOption<'FormFilter'>
    | NavigationOption<'PixInstalled'>
    | NavigationOption<'ConsultPixOptions'>
    | NavigationOption<'SyncPix'>
  > = [
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
        title: 'Listar Pagamentos'
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
