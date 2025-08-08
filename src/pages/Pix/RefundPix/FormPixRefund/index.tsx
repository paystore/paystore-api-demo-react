import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Formik, FormikErrors, FormikValues } from 'formik';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  DeviceEventEmitter,
  ScrollView,
  ToastAndroid,
  View
} from 'react-native';
import { StartRefundRequest } from '../../../../../types/pixModule';
import { CheckBoxItem } from '../../../../components/Checkbox';
import { InputText } from '../../../../components/Input';
import SubmitButton from '../../../../components/SubmitButtom';
import { Pix } from '../../../../native_modules/payment';
import { RootStackParamList } from '../../../../routes';

type FormPixRefundScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'FormPixRefund'
>;

export default function FormPixRefund({
  navigation,
  route
}: Readonly<FormPixRefundScreenProps>) {
  const { type } = route.params;
  const [initialValues, setInitialValues] = useState<StartRefundRequest>({
    txId: '',
    printMerchantReceipt: true,
    printCustomerReceipt: true,
    previewCustomerReceipt: true,
    previewMerchantReceipt: true
  });

  function getTitle() {
    if (type === 'GENERAL') {
      return 'Devolver';
    } else {
      return 'Devolver por TxId';
    }
  }

  useEffect(() => {
    navigation.setOptions({
      title: getTitle()
    });
  }, [navigation]);

  function onSubmit(values: StartRefundRequest) {
    const subscription = DeviceEventEmitter.addListener(
      'onPixRefund',
      (_reversalEvent) => {
        subscription.remove();
        Alert.alert('Devolução', 'Devolução realizada com Sucesso!');
        navigation.navigate('MainPix', {});
      }
    );

    if (type === 'TXID') {
      Pix.refundPixPayment(values)
        .then(() => {})
        .catch((error: Error) => {
          const message = error.toString();
          subscription.remove();
          ToastAndroid.showWithGravity(
            message,
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
          );
        });
    } else {
      Pix.refund({
        printMerchantReceipt: values.printMerchantReceipt,
        printCustomerReceipt: values.printCustomerReceipt,
        previewCustomerReceipt: values.previewCustomerReceipt,
        previewMerchantReceipt: values.previewMerchantReceipt
      })
        .then(() => {})
        .catch((error: Error) => {
          const message = error.toString();
          subscription.remove();
          ToastAndroid.showWithGravity(
            message,
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
          );
        });
    }
  }

  return (
    <ScrollView style={{ padding: 10 }}>
      {initialValues ? (
        <Formik
          initialValues={initialValues}
          validate={(values: FormikValues) => {
            let errors: FormikErrors<FormikValues> = {};
            if (type === 'TXID') {
              if (typeof values.txId === 'string' && values.txId.length === 0) {
                errors.txId = 'Campo Requerido';
              }
            }

            return errors;
          }}
          onSubmit={onSubmit}
        >
          {({ values, handleChange, setFieldValue, handleSubmit, errors }) => {
            return (
              <View>
                {type === 'TXID' && (
                  <InputText
                    label="Identificador da Cobrança"
                    value={values.txId}
                    onChangeText={handleChange('txId')}
                    onSubmitEditing={handleSubmit}
                    errors={{
                      visible: !!errors.txId,
                      text: errors.txId ?? ''
                    }}
                  />
                )}

                <CheckBoxItem
                  label="Exibir comprovante do Comerciante"
                  value={values.previewMerchantReceipt}
                  onPress={() =>
                    setFieldValue(
                      'previewMerchantReceipt',
                      !values.previewMerchantReceipt
                    )
                  }
                />
                <CheckBoxItem
                  label="Exibir via do Cliente"
                  value={values.previewCustomerReceipt}
                  onPress={() =>
                    setFieldValue(
                      'previewCustomerReceipt',
                      !values.previewCustomerReceipt
                    )
                  }
                />

                <CheckBoxItem
                  label="Imprimir via do Comerciante"
                  value={values.printMerchantReceipt}
                  onPress={() =>
                    setFieldValue(
                      'printMerchantReceipt',
                      !values.printMerchantReceipt
                    )
                  }
                />
                <CheckBoxItem
                  label="Imprimir via do Cliente"
                  value={values.printCustomerReceipt}
                  onPress={() =>
                    setFieldValue(
                      'printCustomerReceipt',
                      !values.printCustomerReceipt
                    )
                  }
                />
                <SubmitButton onPress={handleSubmit} title="DEVOLVER" />
              </View>
            );
          }}
        </Formik>
      ) : (
        <></>
      )}
    </ScrollView>
  );
}
