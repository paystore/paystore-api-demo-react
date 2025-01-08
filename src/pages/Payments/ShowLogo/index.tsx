import React, { useEffect, useState } from 'react';
import { Image, ActivityIndicator, ToastAndroid } from 'react-native';
import { Container } from './style';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../routes';
import { Payment } from '../../../native_modules/payment';

type ShowLogoScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'ShowLogo'
>;

export default function ShowLogo(props: Readonly<ShowLogoScreenProps>) {
  const [loading, setLoading] = useState(true);
  const [logo, setLogo] = useState<string | null>(null);

  const strBase64ToBitmap = (base64String: string): string => {
    // Detecta o tipo da imagem dinamicamente, se possível
    if (base64String.startsWith('data:image/')) {
      return base64String;
    }

    // Adiciona cabeçalho padrão se ausente
    return `data:image/png;base64,${base64String}`;
  };

  useEffect(() => {
    async function getLogo() {
      try {
        const response = await Payment.getLogo();
        const cleanLogo = response.trim().replace(/(\r\n|\n|\r)/gm, '');
        setLogo(cleanLogo);
      } catch (error: any) {
        const message = error.toString();
        ToastAndroid.showWithGravity(
          message,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
      } finally {
        setLoading(false); // Finaliza o loading mesmo em caso de erro
      }
    }

    getLogo();
  }, []);

  return (
    <Container>
      {loading && <ActivityIndicator size="large" color="#007AFF" />}
      {logo ? (
        <Image
          source={{ uri: strBase64ToBitmap(logo) }}
          style={{ height: 200, width: 200 }}
          resizeMode="contain"
          onLoadEnd={() => setLoading(false)}
          onError={() => {
            ToastAndroid.showWithGravity(
              'Erro ao carregar a imagem',
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM
            );
            setLoading(false);
          }}
        />
      ) : (
        !loading && <ActivityIndicator size="large" color="#007AFF" />
      )}
    </Container>
  );
}
