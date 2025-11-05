import React from 'react';
import { FlatList } from 'react-native';

import { Button, ButtonText, Container, StatusBar } from './styles';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../routes';

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
