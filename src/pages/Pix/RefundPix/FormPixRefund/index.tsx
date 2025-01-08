import React, { useEffect, useState } from 'react';
import { RootStackParamList } from '../../../../routes';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  View,
  ScrollView,
  Button,
  DeviceEventEmitter,
  Alert,
  ToastAndroid
} from 'react-native';
import { Formik, FormikErrors, FormikValues } from 'formik';
import { CheckBoxItem } from '../../../../components/Checkbox';
import { InputText } from '../../../../components/Input';
import { Pix } from '../../../../native_modules/payment';
import SubmitButton from '../../../../components/SubmitButtom';

type FormPixRefundScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'FormPixRefund'
>;

interface RefundPixRequire {
  txId: string;
  printMerchantReceipt: boolean;
  printCustomerReceipt: boolean;
}

export default function FormPixRefund({
  navigation,
  route
}: Readonly<FormPixRefundScreenProps>) {
  const { type } = route.params;
  const [initialValues, setInitialValues] = useState<RefundPixRequire>({
    txId: '',
    printMerchantReceipt: true,
    printCustomerReceipt: true
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

  function onSubmit(values: RefundPixRequire) {
    const subscription = DeviceEventEmitter.addListener(
      'onPixRefund',
      (_reversalEvent) => {
        subscription.remove();
        Alert.alert('Devolução', 'Devolução realizada com Sucesso!');
        navigation.navigate('MainPix', {});
      }
    );

    if (type === 'TXID') {
      Pix.refundPixPayment(
        values.txId,
        values.printMerchantReceipt,
        values.printCustomerReceipt
      )
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
      Pix.refund(values.printMerchantReceipt, values.printCustomerReceipt)
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
                  label="Imprimir comprovante do Comerciante"
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
