import React from 'react';
import { FlatList } from 'react-native';

import { Button, ButtonText, Container, StatusBar } from './styles';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../../routes';

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
