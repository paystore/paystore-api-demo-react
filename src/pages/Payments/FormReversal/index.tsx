import React, { useEffect, useState } from 'react';
import { RootStackParamList } from '../../../routes';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  View,
  ScrollView,
  DeviceEventEmitter,
  Alert,
  ToastAndroid
} from 'react-native';
import { Formik, FormikErrors, FormikValues } from 'formik';
import { CheckBoxItem } from '../../../components/Checkbox';
import { InputText } from '../../../components/Input';
import { Payment } from '../../../native_modules/payment';
import { currencyToFloat, maskMoney } from '../../../helper/strings';
import SubmitButton from '../../../components/SubmitButtom';

type FormReversalScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'FormReversal'
>;

interface ReversalRequire {
  paymentId: string;
  value: string;
  transactionId: string;
  printMerchantReceipt: boolean;
  printCustomerReceipt: boolean;
  previewMerchantReceipt: boolean;
  previewCustomerReceipt: boolean;
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
        request: { status: ['CONFIRMED'] },
        navigateTo: 'FormReversal'
      });
    } else {
      setInitialValues({
        paymentId: item.paymentId,
        value: maskMoney(item.value.toFixed(2)),
        transactionId: item.appTransactionId,
        printMerchantReceipt: false,
        printCustomerReceipt: false,
        previewMerchantReceipt: true,
        previewCustomerReceipt: true
      });
    }
    navigation.setOptions({
      title: 'Estornar Pagamentos'
    });
  }, [item, navigation]);

  function onSubmit(values: ReversalRequire) {
    const subscription = DeviceEventEmitter.addListener(
      'onReversal',
      (reversalEvent) => {
        subscription.remove();
        Alert.alert('Devolução', 'Devolução realizada com Sucesso!');
        console.log(reversalEvent);
        navigation.navigate('MainPayment', {});
      }
    );
    const valueReversal = currencyToFloat(values.value);
    Payment.reversePaymentV2({
      value: valueReversal,
      appTransactionId: values.transactionId,
      paymentId: values.paymentId,
      printMerchantReceipt: values.printMerchantReceipt,
      printCustomerReceipt: values.printCustomerReceipt,
      previewMerchantReceipt: values.previewMerchantReceipt,
      previewCustomerReceipt: values.previewCustomerReceipt
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
                  label="Exibir via do estabelecimento"
                  value={values.previewMerchantReceipt}
                  onPress={() =>
                    setFieldValue(
                      'previewMerchantReceipt',
                      !values.previewMerchantReceipt
                    )
                  }
                />
                <CheckBoxItem
                  label="Exibir via do cliente"
                  value={values.previewCustomerReceipt}
                  onPress={() =>
                    setFieldValue(
                      'previewCustomerReceipt',
                      !values.previewCustomerReceipt
                    )
                  }
                />
                <CheckBoxItem
                  label="Imprimir via do estabelecimento automaticamente "
                  value={values.printMerchantReceipt}
                  onPress={() =>
                    setFieldValue(
                      'printMerchantReceipt',
                      !values.printMerchantReceipt
                    )
                  }
                />
                <CheckBoxItem
                  label="Imprimir via do cliente automaticamente"
                  value={values.printCustomerReceipt}
                  onPress={() =>
                    setFieldValue(
                      'printCustomerReceipt',
                      !values.printCustomerReceipt
                    )
                  }
                />
                {/*@ts-ignore*/}
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
