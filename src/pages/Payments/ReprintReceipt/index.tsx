import React, { useState } from 'react';
import { RootStackParamList } from '../../../routes';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  CheckBoxLabel,
  Container,
  FormCheckBox,
  FormTextInput,
  ShowReceiptView,
  TextInput,
  TextInputLabel
} from './styles';
import SubmitButton from '../../../components/SubmitButtom';
import { ActivityIndicator, ToastAndroid } from 'react-native';
import { Payment } from '../../../native_modules/payment';
import CheckBox from '@react-native-community/checkbox';

type ReprintReceiptScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'ReprintReceipt'
>;

export default function ReprintReceipt(
  _props: Readonly<ReprintReceiptScreenProps>
) {
  const [loading, setLoading] = useState(false);
  const [paymentId, setPaymentId] = useState('');
  const [previewCustomerReceipt, setPreviewCustomerReceipt] = useState(true);
  const [previewMerchantReceipt, setPreviewMerchantReceipt] = useState(true);
  const [printMerchantReceipt, setPrintMerchantReceipt] = useState(false);
  const [printCustomerReceipt, setPrintCustomerReceipt] = useState(false);

  const handleStartInitialization = async () => {
    const idPayment = paymentId.trim().length > 0 ? paymentId : undefined;
    setLoading(true);
    await Payment.reprintV2({
      printMerchantReceipt: printMerchantReceipt,
      printCustomerReceipt: printCustomerReceipt,
      previewCustomerReceipt: previewCustomerReceipt,
      previewMerchantReceipt: previewMerchantReceipt,
      paymentId: idPayment
    })
      .then((_res) => {
        ToastAndroid.showWithGravity(
          'Reimpressão Concluida',
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
        <>
          <FormTextInput>
            <TextInputLabel>PaymentId</TextInputLabel>
            <TextInput value={paymentId} onChangeText={setPaymentId} />
          </FormTextInput>
          <ShowReceiptView>
            <FormCheckBox>
              <CheckBox
                value={previewMerchantReceipt}
                onValueChange={setPreviewMerchantReceipt}
              />
              <CheckBoxLabel>Exibir via do estabelecimento</CheckBoxLabel>
            </FormCheckBox>
          </ShowReceiptView>

          <ShowReceiptView>
            <FormCheckBox>
              <CheckBox
                value={previewCustomerReceipt}
                onValueChange={setPreviewCustomerReceipt}
              />
              <CheckBoxLabel>Exibir via do cliente</CheckBoxLabel>
            </FormCheckBox>
          </ShowReceiptView>

          <ShowReceiptView>
            <FormCheckBox>
              <CheckBox
                value={printMerchantReceipt}
                onValueChange={setPrintMerchantReceipt}
              />
              <CheckBoxLabel>
                Imprimir via do estabelecimento automaticamente
              </CheckBoxLabel>
            </FormCheckBox>
          </ShowReceiptView>

          <ShowReceiptView>
            <FormCheckBox>
              <CheckBox
                value={printCustomerReceipt}
                onValueChange={setPrintCustomerReceipt}
              />
              <CheckBoxLabel>
                Imprimir via do cliente automaticamente
              </CheckBoxLabel>
            </FormCheckBox>
          </ShowReceiptView>

          <SubmitButton
            onPress={handleStartInitialization}
            title="Imprimir Comprovante"
          />
        </>
      )}
    </Container>
  );
}
