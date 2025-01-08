import React, { useState, useEffect } from 'react';
import { Alert, DeviceEventEmitter, ToastAndroid } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { Pix } from '../../../../native_modules/payment';
import {
  Container,
  FormTextInput,
  TextInput,
  TextInputLabel,
  ShowReceiptView,
  FormCheckBox,
  CheckBoxLabel
} from './styles';
import { RootStackParamList } from '../../../../routes';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PixResult } from '../../../../../types/pixModule';
import SubmitButton from '../../../../components/SubmitButtom';

type FormConsultPixScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'FormConsultPix'
>;

export default function FormConsultPix({
  navigation,
  route
}: Readonly<FormConsultPixScreenProps>) {
  const params = route.params;

  function getTitle() {
    switch (params.type) {
      case 'TXID':
        return 'Consulta por TxId';
      case 'PIXCLIENTID':
        return 'Consulta por ClientId';
      case 'GENERAL':
      default:
        return 'Consulta Geral';
    }
  }

  useEffect(() => {
    navigation.setOptions({
      title: getTitle()
    });
  }, [navigation]);

  const [printMerchantReceipt, setPrintMerchantReceipt] = useState(true);
  const [printCustomerReceipt, setPrintCustomerReceipt] = useState(true);
  const [txId, setTxId] = useState('');
  const [pixClientId, setPixClientId] = useState('');

  function submit() {
    const errors = validateOnSubmit();
    if (errors.length > 0) {
      Alert.alert('Campos obrigatórios', errors.toString().replace(',', '\n'));
    } else {
      sendToPayment();
    }
  }

  function subscriptionEvent() {
    const subscription = DeviceEventEmitter.addListener(
      'onPixConsult',
      (paymentEvent) => {
        subscription.remove();
        console.log({ paymentEvent });
        const paymentData: PixResult = JSON.parse(paymentEvent);
        return navigation.navigate('ShowPixResult', { item: paymentData });
      }
    );
    return subscription;
  }

  function sendToPayment() {
    const subscription = subscriptionEvent();
    if (params.type === 'TXID') {
      Pix.consultByTxId(txId, printMerchantReceipt, printCustomerReceipt)
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
    } else if (params.type === 'PIXCLIENTID') {
      const subscription = subscriptionEvent();
      Pix.consultByPixClientId(pixClientId)
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
    } else {
      Pix.consult(printMerchantReceipt, printCustomerReceipt)
        .then(() => {})
        .catch((error: Error) => {
          const message = error.toString();
          ToastAndroid.showWithGravity(
            message,
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
          );
        });
    }
  }

  function validateOnSubmit() {
    let errors: string[] = [];
    if (params.type === 'TXID' && txId.length === 0) {
      errors.push('Tx-Id');
    }
    if (params.type === 'PIXCLIENTID' && pixClientId.length === 0) {
      errors.push('Client ID');
    }
    return errors;
  }

  return (
    <Container>
      {params.type === 'TXID' || params.type === 'GENERAL' ? (
        <>
          {params.type === 'TXID' && (
            <FormTextInput>
              <TextInputLabel>Tx-Id</TextInputLabel>
              <TextInput value={txId} onChangeText={(v) => setTxId(v)} />
            </FormTextInput>
          )}

          <ShowReceiptView>
            <FormCheckBox>
              <CheckBox
                value={printMerchantReceipt}
                onValueChange={setPrintMerchantReceipt}
              />
              <CheckBoxLabel>Imprimir via do Comerciante</CheckBoxLabel>
            </FormCheckBox>
            <ShowReceiptView>
              <FormCheckBox>
                <CheckBox
                  value={printCustomerReceipt}
                  onValueChange={setPrintCustomerReceipt}
                />
                <CheckBoxLabel>Imprimir via do Cliente</CheckBoxLabel>
              </FormCheckBox>
            </ShowReceiptView>
          </ShowReceiptView>
        </>
      ) : (
        <FormTextInput>
          <TextInputLabel>Client ID</TextInputLabel>
          <TextInput
            value={pixClientId}
            onChangeText={(v) => setPixClientId(v)}
          />
        </FormTextInput>
      )}

      <SubmitButton title="Consultar" onPress={submit} />
    </Container>
  );
}
