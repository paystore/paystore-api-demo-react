import React, { useEffect, useState } from 'react';
import { RootStackParamList } from '../../routes';
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
import { CheckBoxItem } from '../../components/Checkbox';
import { InputText } from '../../components/Input';
import { Payment } from '../../native_modules/payment';
import { currencyToFloat, maskMoney } from '../../helper/strings';

type FormReversalScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'FormReversal'
>;

interface ReversalRequire {
  paymentId: string;
  value: string;
  transactionId: string;
  showReceiptView: boolean;
  showPrintMerchantReceipt: boolean;
  showPrintCustomerReceipt: boolean;
}

export default function FormReversal({
  navigation,
  route
}: Readonly<FormReversalScreenProps>) {
  const { item } = route.params;
  const [initialValues, setInitialValues] = useState<ReversalRequire>();

  useEffect(() => {
    if (!item) {
      navigation.navigate('FormListPayments', {
        status: ['CONFIRMED'],
        navigateTo: 'FormReversal'
      });
    } else {
      setInitialValues({
        paymentId: item.paymentId,
        value: maskMoney(item.value.toFixed(2)),
        transactionId: item.appTransactionId,
        showReceiptView: true,
        showPrintMerchantReceipt: true,
        showPrintCustomerReceipt: true
      });
    }
    navigation.setOptions({
      title: 'Estornar Pagamentos'
    });
  }, [item, navigation]);

  function onSubmit(values: ReversalRequire) {
    const subscription = DeviceEventEmitter.addListener(
      'onReversal',
      (_event) => {
        subscription.remove();
        Alert.alert('Devolução', 'Devolução realizada com Sucesso!');
        navigation.navigate('Main', {});
      }
    );
    const valueReversal = currencyToFloat(values.value);
    Payment.startPaymentReversal(
      valueReversal,
      values.transactionId,
      values.paymentId,
      values.showReceiptView,
      values.showPrintMerchantReceipt,
      values.showPrintCustomerReceipt
    )
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

  return (
    <ScrollView style={{ padding: 10 }}>
      {initialValues ? (
        <Formik
          initialValues={initialValues}
          validate={(values: FormikValues) => {
            let errors: FormikErrors<FormikValues> = {};
            if (
              typeof values.paymentId === 'string' &&
              values.paymentId.length === 0
            ) {
              errors.paymentId = 'Campo Requerido';
            }
            if (typeof values.value === 'string' && values.value.length === 0) {
              errors.value = 'Campo Requerido';
            }
            if (
              typeof values.transactionId === 'string' &&
              values.transactionId.length === 0
            ) {
              errors.transactionId = 'Campo Requerido';
            }

            return errors;
          }}
          onSubmit={onSubmit}
        >
          {({ values, handleChange, setFieldValue, handleSubmit, errors }) => {
            return (
              <View>
                <InputText
                  label="Identificador de Transação para Aplicação"
                  value={values.transactionId}
                  onChangeText={handleChange('transactionId')}
                  onSubmitEditing={handleSubmit}
                  errors={{
                    visible: !!errors.transactionId,
                    text: errors.transactionId ?? ''
                  }}
                />
                <InputText
                  label="Identificador do pagamento"
                  value={values.paymentId}
                  onChangeText={handleChange('paymentId')}
                  onSubmitEditing={handleSubmit}
                  errors={{
                    visible: !!errors.paymentId,
                    text: errors.paymentId ?? ''
                  }}
                />
                <InputText
                  label="Valor"
                  value={values.value}
                  onChangeText={(v) => {
                    const maskValue = maskMoney(v as string);
                    setFieldValue('value', maskValue);
                  }}
                  keyboardType="numeric"
                  onSubmitEditing={handleSubmit}
                  errors={{
                    visible: !!errors.value,
                    text: errors.value ?? ''
                  }}
                />
                <CheckBoxItem
                  label="Mostrar comprovante"
                  value={values.showReceiptView}
                  onPress={() =>
                    setFieldValue('showReceiptView', !values.showReceiptView)
                  }
                />
                <CheckBoxItem
                  label="Imprimir via do Estabelecimento"
                  value={values.showPrintMerchantReceipt}
                  onPress={() =>
                    setFieldValue(
                      'showPrintMerchantReceipt',
                      !values.showPrintMerchantReceipt
                    )
                  }
                />
                <CheckBoxItem
                  label="Imprimir via do Cliente"
                  value={values.showPrintCustomerReceipt}
                  onPress={() =>
                    setFieldValue(
                      'showPrintCustomerReceipt',
                      !values.showPrintCustomerReceipt
                    )
                  }
                />
                {/*@ts-ignore*/}
                <Button onPress={handleSubmit} title="DEVOLVER" />
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
