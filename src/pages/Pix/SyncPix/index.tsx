import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { Alert, Text, ToastAndroid } from 'react-native';
import { Pix } from '../../../native_modules/payment';
import { RootStackParamList } from '../../../routes';
import { Container } from './style';

type PixSyncScreenProps = NativeStackScreenProps<RootStackParamList, 'SyncPix'>;

export default function SyncPix({ navigation }: Readonly<PixSyncScreenProps>) {
  useEffect(() => {
    const pixInstalled = async () => {
      await Pix.synchronize()
        .then((res) => {
          Alert.alert('Sincronização Finalizada', res);
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

  return <Container>{<Text>Sincronizando...</Text>}</Container>;
}
