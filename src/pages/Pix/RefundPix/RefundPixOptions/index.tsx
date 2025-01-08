import React, { useEffect } from 'react';
import { FlatList } from 'react-native';

import { Container, Button, ButtonText, StatusBar } from './styles';

import { RootStackParamList } from '../../../../routes';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type RefundPixOptionsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'RefundPixOptions'
>;

type NavigationOption<T extends keyof RootStackParamList> = {
  id: string;
  title: string;
  navigationTo: T;
  params: RootStackParamList[T];
};

export default function RefundPixOptions({
  navigation
}: Readonly<RefundPixOptionsScreenProps>) {
  const options: Array<NavigationOption<'FormPixRefund'>> = [
    {
      id: '1',
      title: 'Devolver por TxId',
      navigationTo: 'FormPixRefund',
      params: { type: 'TXID' }
    },
    {
      id: '2',
      title: 'Devolver',
      navigationTo: 'FormPixRefund',
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
