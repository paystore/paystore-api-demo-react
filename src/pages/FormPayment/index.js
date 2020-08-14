import React, { useState } from "react";
import { Alert } from "react-native";
import CheckBox from "@react-native-community/checkbox";
import { DeviceEventEmitter, ToastAndroid } from "react-native";
import Payment from "../../native_modules/payment";
import { maskMoney, currencyToFloat } from "../../helper/strings";
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
  ButtonText,
} from "./styles";

export default function FormPayment({ navigation }) {
  const defaultValue = maskMoney((Math.random() * 100).toFixed(2).toString());
  const defaulAppTransaction = new Date().getTime().toString();

  const [value, setValue] = useState(defaultValue);
  const [installments, setInstallments] = useState();
  const [appTransaction, setAppTransaction] = useState(defaulAppTransaction);
  const [showsReceipt, setShowsReceipt] = useState(false);
  const [credit, setCredit] = useState(true);
  const [debit, setDebit] = useState(true);
  const [creditAdmin, setCreditAdmin] = useState();
  const [creditStore, setCreditStore] = useState();
  const [voucher, setVoucher] = useState();
  const [preAuthorization, setPreAuthorization] = useState();
  const [preAuthorizationConfirm, setPreAuthorizationConfirm] = useState();
  const [paymentTypes, setPaymentTypes] = useState(["CREDIT", "DEBIT"]);

  function onPaymentTypeClick(type, set) {
    return (checked) => {
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
      Alert.alert("Campos obrigatórios", errors.toString().replace(",", "\n"));
    } else {
      const subscription = DeviceEventEmitter.addListener("onPayment", (event) => {
        subscription.remove();
        Alert.alert("Pagamento", event);
        navigation.navigate("Main");
      });

      const valuePayment = currencyToFloat(value);
      Payment.startPayment(
        valuePayment > 0 ? valuePayment.toString() : null,
        appTransaction,
        showsReceipt,
        paymentTypes.toString(),
        (creditAdmin || creditStore) && installments ? parseInt(installments) : 0,
      )
        .then(() => {})
        .catch((error) => {
          const message = error.toString();
          ToastAndroid.showWithGravity(message, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
        });
    }
  }

  function validateOnSubmit() {
    let errors = [];
    if (!appTransaction) {
      errors.push("- Identificador de transação para aplicação");
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
          onChangeText={(value) => {
            if (/[0-9]$/.test(value)) {
              setValue(maskMoney(value));
            }
          }}
        />
      </FormTextInput>

      <FormTextInput>
        <TextInputLabel>Parcelas</TextInputLabel>
        <TextInput keyboardType="numeric" value={installments} onChangeText={setInstallments} />
      </FormTextInput>

      <FormTextInput>
        <TextInputLabel>Identificador de Transação para Aplicação</TextInputLabel>
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
            <CheckBox value={credit} onValueChange={onPaymentTypeClick("CREDIT", setCredit)} />
            <CheckBoxLabel>Crédito à Vista</CheckBoxLabel>
          </FormCheckBox>
          <FormCheckBox>
            <CheckBox value={creditStore} onValueChange={onPaymentTypeClick("CREDIT_STORE", setCreditStore)} />
            <CheckBoxLabel>Crédito Lojista</CheckBoxLabel>
          </FormCheckBox>
          <FormCheckBox>
            <CheckBox value={creditAdmin} onValueChange={onPaymentTypeClick("CREDIT_ADMIN", setCreditAdmin)} />
            <CheckBoxLabel>Crédito Administrativo</CheckBoxLabel>
          </FormCheckBox>
          <FormCheckBox>
            <CheckBox value={voucher} onValueChange={onPaymentTypeClick("VOUCHER", setVoucher)} />
            <CheckBoxLabel>Voucher</CheckBoxLabel>
          </FormCheckBox>
        </CheckBoxColumn>
        <CheckBoxColumn>
          <FormCheckBox>
            <CheckBox value={debit} onValueChange={onPaymentTypeClick("DEBIT", setDebit)} />
            <CheckBoxLabel>Débito</CheckBoxLabel>
          </FormCheckBox>
          <FormCheckBox>
            <CheckBox
              value={preAuthorization}
              onValueChange={onPaymentTypeClick("PRE_AUTHORIZATION", setPreAuthorization)}
            />
            <CheckBoxLabel>Pré-autorização</CheckBoxLabel>
          </FormCheckBox>
          <FormCheckBox>
            <CheckBox
              value={preAuthorizationConfirm}
              onValueChange={onPaymentTypeClick("PRE_AUTHORIZATION_CONFIRMATION", setPreAuthorizationConfirm)}
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

FormPayment.navigationOptions = {
  title: "Pagamento",
  headerLeft: () => null,
};
