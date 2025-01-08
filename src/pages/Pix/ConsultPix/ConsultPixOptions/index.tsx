import React, { useEffect } from 'react';
import { FlatList } from 'react-native';

import { Container, Button, ButtonText, StatusBar } from './styles';

import { RootStackParamList } from '../../../../routes';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type ConsultPixOptionsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'ConsultPixOptions'
>;

type NavigationOption<T extends keyof RootStackParamList> = {
  id: string;
  title: string;
  navigationTo: T;
  params: RootStackParamList[T];
};

export default function ConsultPixOptions({
  navigation
}: Readonly<ConsultPixOptionsScreenProps>) {
  const options: Array<NavigationOption<'FormConsultPix'>> = [
    {
      id: '1',
      title: 'Consultar por TxId',
      navigationTo: 'FormConsultPix',
      params: { type: 'TXID' }
    },
    {
      id: '2',
      title: 'Consultar por ClientId',
      navigationTo: 'FormConsultPix',
      params: { type: 'PIXCLIENTID' }
    },
    {
      id: '3',
      title: 'Consulta Geral',
      navigationTo: 'FormConsultPix',
      params: { type: 'GENERAL' }
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
