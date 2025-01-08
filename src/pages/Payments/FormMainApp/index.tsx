import React, { useState } from 'react';
import { Payment } from '../../../native_modules/payment';
import { RootStackParamList } from '../../../routes';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Alert, ToastAndroid } from 'react-native';
import { Container, FormTextInput, TextInput, TextInputLabel } from './style';
import SubmitButton from '../../../components/SubmitButtom';

type FormMainAppPaymentScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'FormMainApp'
>;

export default function FormMainApp({
  navigation
}: Readonly<FormMainAppPaymentScreenProps>) {
  const [mainApp, setMainApp] = useState('com.phoebus.appdemo');

  const submit = () => {
    const errors = validateOnSubmit();
    if (errors.length > 0) {
      Alert.alert('Campos obrigatórios', errors.toString().replace(',', '\n'));
    } else {
      Payment.setMainApp(mainApp)
        .then((_e) => {
          Alert.alert(
            'PackageName',
            'Aplicação principal definida com sucesso!'
          );
          navigation.navigate('MainPayment', {});
        })
        .catch((error: Error) => {
          const message = error.toString();
          ToastAndroid.showWithGravity(
            message,
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
          );
        });
    }
  };

  function validateOnSubmit() {
    let errors: string[] = [];
    if (mainApp.length === 0) {
      errors.push('Campo obrigatório');
    }
    return errors;
  }

  return (
    <Container>
      <FormTextInput>
        <TextInputLabel>PackageName da Aplicação</TextInputLabel>
        <TextInput value={mainApp} onChangeText={(v) => setMainApp(v)} />
      </FormTextInput>

      <SubmitButton title="Definir Aplicação Principal" onPress={submit} />
    </Container>
  );
}
