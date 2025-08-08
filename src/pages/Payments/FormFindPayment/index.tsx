import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Button, ScrollView, Text, View } from 'react-native';
import { PaymentStatus } from '../../../../types/paymentsModule';
import { ButtonStatus } from '../../../components/Buttons/ButtonStatus';
import SubmitButton from '../../../components/SubmitButtom';
import { RootStackParamList } from '../../../routes';
import {
  Container,
  FilterTitle,
  FormTextInput,
  TextInput,
  TextInputLabel
} from './style';

type FormFindPaymentScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'FormFindPayment'
>;

export default function FormFindPayment({
  navigation
}: Readonly<FormFindPaymentScreenProps>) {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [finishDate, setFinishDate] = useState<Date | undefined>(undefined);
  const [paymentId, setPaymentId] = useState('');
  const [appTransactionId, setAppTransactionId] = useState('');
  const [lastDigits, setLastDigits] = useState('');
  const initStatusButton: Partial<Record<PaymentStatus, boolean>> = {
    PENDING: false,
    CANCELLED: false,
    CONFIRMED: true,
    REVERSED: false,
    REFUNDED: false,
    PROCESSING: false
  } as const;

  const [selectedStatuses, setSelectedStatuses] = useState(initStatusButton);

  const PAYMENT_STATUS: Partial<Record<PaymentStatus, string>> = {
    PENDING: 'PENDENTE',
    CONFIRMED: 'CONFIRMADO',
    REFUNDED: 'DEVOLVIDO',
    REVERSED: 'ESTORNADO',
    PROCESSING: 'EM PROCESSAMENTO',
    CANCELLED: 'DESFEITO'
  } as const;

  function onChangeButtonStatus(value: string) {
    setSelectedStatuses({
      ...selectedStatuses,
      [value]: !selectedStatuses[value as PaymentStatus]
    });
  }

  const toUTCString = (date: Date | undefined) =>
    date ? new Date(date).toISOString() : undefined;

  const showDateTimePicker = (isStart: boolean) => {
    // Primeiro: selecionar a data
    DateTimePickerAndroid.open({
      value: new Date(),
      mode: 'date',
      is24Hour: true,
      onChange: (dateEvent, selectedDate) => {
        if (dateEvent.type !== 'set' || !selectedDate) {
          // Cancelou a seleção de data → não salva nada
          isStart ? setStartDate(undefined) : setFinishDate(undefined);
          return;
        }

        // Em seguida: selecionar a hora
        DateTimePickerAndroid.open({
          value: selectedDate,
          mode: 'time',
          is24Hour: true,
          onChange: (timeEvent, selectedTime) => {
            if (timeEvent.type !== 'set' || !selectedTime) {
              // Cancelou a seleção de hora → não salva nada
              isStart ? setStartDate(undefined) : setFinishDate(undefined);
              return;
            }

            // Mescla data + hora
            const finalDate = new Date(
              selectedDate.getFullYear(),
              selectedDate.getMonth(),
              selectedDate.getDate(),
              selectedTime.getHours(),
              selectedTime.getMinutes()
            );

            isStart ? setStartDate(finalDate) : setFinishDate(finalDate);
          }
        });
      }
    });
  };

  const handleSubmit = () => {
    const filtersEnabled = Object.entries(selectedStatuses)
      .filter(([key, value]) => value === true)
      .map(([key]) => key) as PaymentStatus[];

    navigation.navigate('FormListPayments', {
      request: {
        startDate: toUTCString(startDate),
        finishDate: toUTCString(finishDate),
        paymentId: paymentId.length > 0 ? paymentId : undefined,
        appTransactionId:
          appTransactionId.length > 0 ? appTransactionId : undefined,
        lastDigits: lastDigits.length === 4 ? lastDigits : undefined,
        status: filtersEnabled
      },
      title: 'Filtrar Pagamentos'
    });
  };

  function FilterStatusButtons() {
    return (
      <View>
        <FilterTitle>Status</FilterTitle>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {Object.entries(PAYMENT_STATUS).map(([key, value]) => {
            return (
              <ButtonStatus
                key={key}
                title={value}
                onPress={() => onChangeButtonStatus(key)}
                /**@ts-ignore */
                active={selectedStatuses[key] as boolean}
              />
            );
          })}
        </View>
      </View>
    );
  }

  return (
    <ScrollView>
      <Container>
        <FormTextInput>
          <TextInputLabel>Período Inícial</TextInputLabel>
          <Button
            title="Selecionar Data Inicial"
            onPress={() => showDateTimePicker(true)}
          />
          {startDate && (
            <Text style={{ paddingVertical: 2 }}>
              Início: {startDate.toLocaleString()}
            </Text>
          )}
        </FormTextInput>

        <FormTextInput>
          <TextInputLabel>Período Final</TextInputLabel>
          <Button
            title="Selecionar Data Final"
            onPress={() => showDateTimePicker(false)}
          />
          {finishDate && (
            <Text style={{ paddingVertical: 2 }}>
              Fim: {finishDate.toLocaleString()}
            </Text>
          )}
        </FormTextInput>

        <FormTextInput>
          <TextInputLabel>PaymentId</TextInputLabel>
          <TextInput value={paymentId} onChangeText={setPaymentId} />
        </FormTextInput>

        <FormTextInput>
          <TextInputLabel>appTransactionId</TextInputLabel>
          <TextInput
            value={appTransactionId}
            onChangeText={setAppTransactionId}
          />
        </FormTextInput>

        <FormTextInput>
          <TextInputLabel>Últimos 4 dígitos do cartão</TextInputLabel>
          <TextInput
            value={lastDigits}
            maxLength={4}
            onChangeText={setLastDigits}
          />
        </FormTextInput>
        <FilterStatusButtons />
        <SubmitButton title="Filtrar Pagamentos" onPress={handleSubmit} />
      </Container>
    </ScrollView>
  );
}
