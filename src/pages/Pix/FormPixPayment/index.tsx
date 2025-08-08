import CheckBox from '@react-native-community/checkbox';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Alert, DeviceEventEmitter, ToastAndroid } from 'react-native';
import uuid from 'react-native-uuid';
import { PixResult } from '../../../../types/pixModule';
import SubmitButton from '../../../components/SubmitButtom';
import { currencyToFloat, maskMoney } from '../../../helper/strings';
import { Pix } from '../../../native_modules/payment';
import { RootStackParamList } from '../../../routes';
import {
  CheckBoxLabel,
  Container,
  FormCheckBox,
  FormTextInput,
  ShowReceiptView,
  TextInput,
  TextInputLabel
} from './styles';

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

  const defaultValue = maskMoney(
    (Math.round(Math.random() * 1000) / 10).toFixed(2)
  );

  const [value, setValue] = useState(defaultValue);
  const [printMerchantReceipt, setPrintMerchantReceipt] = useState(true);
  const [printCustomerReceipt, setPrintCustomerReceipt] = useState(true);
  const [previewMerchantReceipt, setPreviewMerchantReceipt] = useState(true);
  const [previewCustomerReceipt, setPreviewCustomerReceipt] = useState(true);
  const [enableValue, setEnableValue] = useState(false);
  const [pixClientId, setPixClientId] = useState(() => uuid.v4());

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
    Pix.startPixPayment({
      value: enableValue ? valuePayment : '',
      pixClientId: pixClientId,
      printMerchantReceipt: printMerchantReceipt,
      printCustomerReceipt: printCustomerReceipt,
      previewMerchantReceipt: previewMerchantReceipt,
      previewCustomerReceipt: previewCustomerReceipt
    })
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
        setPixClientId(() => uuid.v4());
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
            value={previewMerchantReceipt}
            onValueChange={setPreviewMerchantReceipt}
          />
          <CheckBoxLabel>Exibir via do Comerciante</CheckBoxLabel>
        </FormCheckBox>
      </ShowReceiptView>

      <ShowReceiptView>
        <FormCheckBox>
          <CheckBox
            value={previewCustomerReceipt}
            onValueChange={setPreviewCustomerReceipt}
          />
          <CheckBoxLabel>Exibir via do Cliente</CheckBoxLabel>
        </FormCheckBox>
      </ShowReceiptView>

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
