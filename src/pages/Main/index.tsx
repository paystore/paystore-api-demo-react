import React, { useEffect } from 'react';
import { FlatList } from 'react-native';

import { Container, Button, ButtonText, StatusBar } from './styles';

import { RootStackParamList } from '../../routes';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type MainScreenProps = NativeStackScreenProps<RootStackParamList, 'Main'>;

export default function Main({ navigation }: MainScreenProps) {
  useEffect(() => {
    navigation.setOptions({
      title: 'PayStore Api Demo'
    });
  });

  const options: Array<{
    id: string;
    title: string;
    navigationTo: keyof RootStackParamList;
  }> = [
    {
      id: '1',
      title: 'Pagamento (Solicitação + Confirmação',
      navigationTo: 'FormPayment'
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
            onPress={() => navigation.navigate('FormPayment', {})}
          >
            <ButtonText>{item.title}</ButtonText>
          </Button>
        )}
      />
    </Container>
  );
}
