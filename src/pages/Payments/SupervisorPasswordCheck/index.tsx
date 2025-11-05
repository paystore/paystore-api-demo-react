import React, { useState } from 'react';
import { Payment } from '../../../native_modules/payment';
import { RootStackParamList } from '../../../routes';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Alert, ToastAndroid } from 'react-native';
import { Container, FormTextInput, TextInputLabel } from './style';
import SubmitButton from '../../../components/SubmitButtom';
import { PasswordInput } from '../../../components/Input/InputPassword';

type SupervisorPasswordCheckScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'FormSupervisorPasswordCheck'
>;

export default function FormSupervisorPasswordCheck({
  navigation
}: Readonly<SupervisorPasswordCheckScreenProps>) {
  const [password, setPassword] = useState('');

  const submit = () => {
    const errors = validateOnSubmit();
    if (errors.length > 0) {
      Alert.alert('Campos obrigatórios', errors.toString().replace(',', '\n'));
    } else {
      Payment.supervisorPasswordCheck(password)
        .then((result) => {
          Alert.alert(
            'Supervisor',
            result === true ? 'Autenticado com sucesso!' : 'Senha incorrerta'
          );
          if (result === true) {
            navigation.navigate('MainPayment', {});
          }
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
    if (password.length === 0) {
      errors.push('Campo obrigatório');
    }
    return errors;
  }

  return (
    <Container>
      <FormTextInput>
        <TextInputLabel>Senha</TextInputLabel>
        <PasswordInput
          value={password}
          maxLength={6}
          onChangeText={setPassword}
          placeholder=""
        />
      </FormTextInput>

      <SubmitButton title="Autenticar" onPress={submit} />
    </Container>
  );
}
