import React, { useEffect } from 'react';
import { RootStackParamList } from '../../routes';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PaymentResult } from '../../../types/paymentsModule';
import { PaymentTable, PaymentTableItem } from '../../components/PaymentTable';
import { currencyNumberToString } from '../../helper/strings';
import { Receipt } from '../../components/Receipt';

type ShowPaymentResultScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'ShowPaymentResult'
>;

export default function ShowPaymentResult({
  navigation,
  route
}: Readonly<ShowPaymentResultScreenProps>) {
  useEffect(() => {
    navigation.setOptions({
      title: 'Resultado'
    });
  }, [navigation]);

  const { item } = route.params;

  const tableItems = mountTableInformation(item);

  return <PaymentTable items={tableItems} />;
}

function mountTableInformation(
  PaymentResult: PaymentResult
): PaymentTableItem[] {
  return [
    {
      name: 'Tipo de Pagamento',
      value: PaymentResult.paymentType
    },
    {
      name: 'Forma de Captura',
      value: PaymentResult.captureType
    },
    {
      name: 'Identificador do Pagamento',
      value: PaymentResult.paymentId
    },
    {
      name: 'Ident. para a Adquirente',
      value: PaymentResult.acquirerId
    },
    {
      name: 'Número de Autorização',
      value: PaymentResult.acquirerAuthorizationNumber
    },
    {
      name: 'NSU',
      value: PaymentResult.acquirerNsu
    },
    {
      name: 'Adquirente',
      value: PaymentResult.acquirer
    },
    {
      name: 'Data/Hora Adquirente',
      value: PaymentResult.acquirerResponseDate
    },
    {
      name: 'Data/Hora Terminal',
      value: PaymentResult.paymentDate
    },
    {
      name: 'Código de Resposta',
      value: PaymentResult.acquirerResponseCode
    },
    {
      name: 'Cartão',
      value: PaymentResult?.card?.panLast4Digits
    },
    {
      name: 'Bandeira',
      value: PaymentResult?.card?.brand
    },
    {
      name: 'Parcelas',
      value: PaymentResult.installments?.toString()
    },
    {
      name: 'Valor',
      value: PaymentResult?.value
        ? currencyNumberToString(PaymentResult?.value)
        : '-'
    },
    {
      name: 'AppTransactionId',
      value: PaymentResult.appTransactionId
    },
    {
      name: 'Status do Pagamento',
      value: PaymentResult.paymentStatus
    },
    {
      name: 'Via do Cliente',
      value: <Receipt item={PaymentResult?.receipt?.clientVia} />
    },
    {
      name: 'Via do Estabelecimento',
      value: <Receipt item={PaymentResult?.receipt?.merchantVia} />
    }
  ];
}
