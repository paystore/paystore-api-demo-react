import React, { useState } from 'react';
import { RootStackParamList } from '../../../routes';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Container } from './styles';
import SubmitButton from '../../../components/SubmitButtom';
import { ActivityIndicator, ToastAndroid } from 'react-native';
import { Payment } from '../../../native_modules/payment';

type StartInitializationScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'StartInitialization'
>;

export default function StartInitialization(
  _props: Readonly<StartInitializationScreenProps>
) {
  const [loading, setLoading] = useState(false);

  const handleStartInitialization = async () => {
    setLoading(true);
    await Payment.startInitialization()
      .then((_res) => {
        ToastAndroid.showWithGravity(
          'Inicialização Concluída',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
      })
      .catch((error) => {
        const message = error?.toString();
        ToastAndroid.showWithGravity(
          message,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
      })
      .finally(() => setLoading(false));
  };

  return (
    <Container>
      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : (
        <SubmitButton onPress={handleStartInitialization} title="Inicializar" />
      )}
    </Container>
  );
}
