import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
/**@ts-ignone */
import CheckBox from '@react-native-community/checkbox';
import { DeviceEventEmitter, ToastAndroid } from 'react-native';
import { Payment } from '../../native_modules/payment';
import { maskMoney, currencyToFloat } from '../../helper/strings';
import {
  Container,
  FormTextInput,
  TextInput,
  TextInputLabel,
  ShowReceiptView,
  PaymentTypesLabel,
  PaymentTypesView,
  CheckBoxColumn,
  FormCheckBox,
  CheckBoxLabel,
  SubmitButtonView,
  Button,
  ButtonText
} from './styles';
import { RootStackParamList } from '../../routes';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PaymentTypes } from '../../../types/paymentsModule';

type FormPaymentScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'FormPayment'
>;

export default function FormPayment({ navigation }: FormPaymentScreenProps) {
  useEffect(() => {
    navigation.setOptions({
      title: 'Pagamento',
      headerLeft: () => null
    });
  });

  const defaultValue = maskMoney((Math.random() * 100).toFixed(2).toString());
  const defaulAppTransaction = new Date().getTime().toString();

  const [value, setValue] = useState(defaultValue);
  const [installments, setInstallments] = useState<string>();
  const [appTransaction, setAppTransaction] = useState(defaulAppTransaction);
  const [showsReceipt, setShowsReceipt] = useState(false);
  const [credit, setCredit] = useState(true);
  const [debit, setDebit] = useState(true);
  const [creditAdmin, setCreditAdmin] = useState();
  const [creditStore, setCreditStore] = useState();
  const [voucher, setVoucher] = useState();
  const [preAuthorization, setPreAuthorization] = useState();
  const [preAuthorizationConfirm, setPreAuthorizationConfirm] = useState();
  const [paymentTypes, setPaymentTypes] = useState<PaymentTypes[]>([
    'CREDIT',
    'DEBIT'
  ]);

  function onPaymentTypeClick(type: PaymentTypes, set: React.Dispatch<any>) {
    return (checked: any) => {
      set(checked);
      let selectedTypes = paymentTypes;
      if (checked) {
        selectedTypes.push(type);
      } else {
        selectedTypes = paymentTypes.filter((selected) => selected !== type);
      }

      setPaymentTypes(selectedTypes);
    };
  }

  function submit() {
    const errors = validateOnSubmit();
    if (errors.length > 0) {
      Alert.alert('Campos obrigatórios', errors.toString().replace(',', '\n'));
    } else {
      const subscription = DeviceEventEmitter.addListener(
        'onPayment',
        (event) => {
          subscription.remove();
          console.debug(event?.payment);
          Alert.alert('Pagamento', 'Pagamento realizado com Sucesso!');
          navigation.navigate('Main');
        }
      );

      const valuePayment = currencyToFloat(value);
      Payment.startPayment(
        valuePayment > 0 ? valuePayment.toString() : '0.00',
        appTransaction,
        showsReceipt,
        paymentTypes,
        (creditAdmin || creditStore) && installments
          ? parseInt(installments, 10)
          : 0
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
  }

  function validateOnSubmit() {
    let errors: string[] = [];
    if (!appTransaction) {
      errors.push('- Identificador de transação para aplicação');
    }
    return errors;
  }

  return (
    <Container>
      <FormTextInput>
        <TextInputLabel>Valor a pagar</TextInputLabel>
        <TextInput
          keyboardType="numeric"
          value={value}
          onChangeText={(val: string) => {
            if (/[0-9]$/.test(val)) {
              setValue(maskMoney(val));
            }
          }}
        />
      </FormTextInput>

      <FormTextInput>
        <TextInputLabel>Parcelas</TextInputLabel>
        <TextInput
          keyboardType="numeric"
          value={installments}
          onChangeText={setInstallments}
        />
      </FormTextInput>

      <FormTextInput>
        <TextInputLabel>
          Identificador de Transação para Aplicação
        </TextInputLabel>
        <TextInput value={appTransaction} onChangeText={setAppTransaction} />
      </FormTextInput>

      <ShowReceiptView>
        <FormCheckBox>
          <CheckBox value={showsReceipt} onValueChange={setShowsReceipt} />
          <CheckBoxLabel>Mostrar Tela de Comprovante</CheckBoxLabel>
        </FormCheckBox>
      </ShowReceiptView>

      <PaymentTypesLabel>Tipos de Pagamento</PaymentTypesLabel>
      <PaymentTypesView>
        <CheckBoxColumn>
          <FormCheckBox>
            <CheckBox
              value={credit}
              onValueChange={onPaymentTypeClick('CREDIT', setCredit)}
            />
            <CheckBoxLabel>Crédito à Vista</CheckBoxLabel>
          </FormCheckBox>
          <FormCheckBox>
            <CheckBox
              value={creditStore}
              onValueChange={onPaymentTypeClick('CREDIT_STORE', setCreditStore)}
            />
            <CheckBoxLabel>Crédito Lojista</CheckBoxLabel>
          </FormCheckBox>
          <FormCheckBox>
            <CheckBox
              value={creditAdmin}
              onValueChange={onPaymentTypeClick('CREDIT_ADMIN', setCreditAdmin)}
            />
            <CheckBoxLabel>Crédito Administrativo</CheckBoxLabel>
          </FormCheckBox>
          <FormCheckBox>
            <CheckBox
              value={voucher}
              onValueChange={onPaymentTypeClick('VOUCHER', setVoucher)}
            />
            <CheckBoxLabel>Voucher</CheckBoxLabel>
          </FormCheckBox>
        </CheckBoxColumn>
        <CheckBoxColumn>
          <FormCheckBox>
            <CheckBox
              value={debit}
              onValueChange={onPaymentTypeClick('DEBIT', setDebit)}
            />
            <CheckBoxLabel>Débito</CheckBoxLabel>
          </FormCheckBox>
          <FormCheckBox>
            <CheckBox
              value={preAuthorization}
              onValueChange={onPaymentTypeClick(
                'PRE_AUTHORIZATION',
                setPreAuthorization
              )}
            />
            <CheckBoxLabel>Pré-autorização</CheckBoxLabel>
          </FormCheckBox>
          <FormCheckBox>
            <CheckBox
              value={preAuthorizationConfirm}
              onValueChange={onPaymentTypeClick(
                'PRE_AUTHORIZATION_CONFIRMATION',
                setPreAuthorizationConfirm
              )}
            />
            <CheckBoxLabel>Confirmação de Pré-autorização</CheckBoxLabel>
          </FormCheckBox>
        </CheckBoxColumn>
      </PaymentTypesView>

      <SubmitButtonView>
        <Button onPress={submit}>
          <ButtonText>PAGAR</ButtonText>
        </Button>
      </SubmitButtonView>
    </Container>
  );
}
