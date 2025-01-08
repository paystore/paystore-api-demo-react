import React, { useState, useEffect } from 'react';
import { Alert, DeviceEventEmitter, ToastAndroid } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { Pix } from '../../../native_modules/payment';
import { maskMoney, currencyToFloat } from '../../../helper/strings';
import {
  Container,
  FormTextInput,
  TextInput,
  TextInputLabel,
  ShowReceiptView,
  FormCheckBox,
  CheckBoxLabel,
  SubmitButtonView,
  Button,
  ButtonText
} from './styles';
import { RootStackParamList } from '../../../routes';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PixResult } from '../../../../types/pixModule';
import uuid from 'react-native-uuid';
import SubmitButton from '../../../components/SubmitButtom';

type FormPaymentScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'FormPixPayment'
>;

export default function FormPixPayment({
  navigation
}: Readonly<FormPaymentScreenProps>) {
  useEffect(() => {
    navigation.setOptions({
      title: 'Gerar Cobrança'
    });
  }, [navigation]);

  const defaultValue = maskMoney((Math.random() * 100).toFixed(2).toString());

  const [value, setValue] = useState(defaultValue);
  const [printMerchantReceipt, setPrintMerchantReceipt] = useState(true);
  const [printCustomerReceipt, setPrintCustomerReceipt] = useState(true);
  const [enableValue, setEnableValue] = useState(false);
  const pixClientId = uuid.v4();

  function submit() {
    const errors = validateOnSubmit();
    if (errors.length > 0) {
      Alert.alert('Campos obrigatórios', errors.toString().replace(',', '\n'));
    } else {
      sendToPayment();
    }
  }

  function sendToPayment() {
    const subscription = DeviceEventEmitter.addListener(
      'onPixPayment',
      (paymentEvent) => {
        subscription.remove();
        Alert.alert('Pagamento realizado com Sucesso!');
        console.log({ paymentEvent });
        const paymentData: PixResult = JSON.parse(paymentEvent);
        return navigation.navigate('ShowPixResult', { item: paymentData });
      }
    );

    const valuePayment = currencyToFloat(value);
    Pix.startPixPayment(
      enableValue ? valuePayment : '',
      pixClientId,
      printMerchantReceipt,
      printCustomerReceipt
    )
      .then(() => {})
      .catch((error: Error) => {
        const message = error.toString();
        //Remover listener.
        subscription.remove();
        ToastAndroid.showWithGravity(
          message,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
      });
  }

  function validateOnSubmit() {
    let errors: string[] = [];
    return errors;
  }

  return (
    <Container>
      <ShowReceiptView>
        <FormCheckBox>
          <CheckBox value={enableValue} onValueChange={setEnableValue} />
          <CheckBoxLabel>Enviar Valor</CheckBoxLabel>
        </FormCheckBox>
      </ShowReceiptView>
      <FormTextInput>
        <TextInputLabel>Valor a pagar</TextInputLabel>
        <TextInput
          editable={enableValue}
          keyboardType="numeric"
          value={value}
          onChangeText={(v) => setValue(maskMoney(v))}
        />
      </FormTextInput>
      <FormTextInput>
        <TextInputLabel>PixClientId</TextInputLabel>
        <TextInput editable={false} value={pixClientId} />
      </FormTextInput>
      <ShowReceiptView>
        <FormCheckBox>
          <CheckBox
            value={printMerchantReceipt}
            onValueChange={setPrintMerchantReceipt}
          />
          <CheckBoxLabel>Imprimir via do Comerciante</CheckBoxLabel>
        </FormCheckBox>
      </ShowReceiptView>

      <ShowReceiptView>
        <FormCheckBox>
          <CheckBox
            value={printCustomerReceipt}
            onValueChange={setPrintCustomerReceipt}
          />
          <CheckBoxLabel>Imprimir via do Cliente</CheckBoxLabel>
        </FormCheckBox>
      </ShowReceiptView>

      <SubmitButton onPress={submit} title="PAGAR" />
    </Container>
  );
}
