import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { Alert, Text, ToastAndroid } from 'react-native';
import { Pix } from '../../../native_modules/payment';
import { RootStackParamList } from '../../../routes';
import { Container } from './style';

type FormPixInstalledScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'PixInstalled'
>;

export default function PixInstalled({
  navigation
}: Readonly<FormPixInstalledScreenProps>) {
  useEffect(() => {
    const pixInstalled = async () => {
      await Pix.isPixInstalled()
        .then((res) => {
          Alert.alert('Pix Instalado', res ? 'SIM' : 'NÃO');
          navigation.goBack();
        })
        .catch((error: Error) => {
          const message = error.toString();
          ToastAndroid.showWithGravity(
            message,
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
          );
          navigation.goBack();
        });
    };
    pixInstalled();
  }, []);

  return <Container>{<Text>Verificado Instalação...</Text>}</Container>;
}
