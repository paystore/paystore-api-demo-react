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
  const options: Array<
    NavigationOption<'PaymentsRoutes'> | NavigationOption<'PixRoutes'>
  > = [
    {
      id: '1',
      title: 'Pagamentos',
      navigationTo: 'PaymentsRoutes',
      params: {}
    },
    {
      id: '2',
      title: 'Pix',
      navigationTo: 'PixRoutes',
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
