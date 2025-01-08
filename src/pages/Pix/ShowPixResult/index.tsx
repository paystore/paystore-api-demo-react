import React, { useEffect } from 'react';
import { RootStackParamList } from '../../../routes';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PixResult } from '../../../../types/pixModule';
import {
  PaymentTable,
  PaymentTableItem
} from '../../../components/PaymentTable';
import { currencyNumberToString } from '../../../helper/strings';

type ShowPaymentResultScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'ShowPixResult'
>;

export default function ShowPixResult({
  navigation,
  route
}: Readonly<ShowPaymentResultScreenProps>) {
  const { item } = route.params;

  const tableItems = mountTableInformation(item);

  return <PaymentTable items={tableItems} />;
}

function mountTableInformation(PixResult: PixResult): PaymentTableItem[] {
  return [
    {
      name: 'Identificador do Client Pix',
      value: PixResult?.pix_client_id ?? ''
    },

    {
      name: 'Identificador da Cobrança',
      value: PixResult?.tx_id
    },
    {
      name: 'Valor',
      value: PixResult?.cob_value
        ? currencyNumberToString(Number(PixResult?.cob_value))
        : '-'
    },
    {
      name: 'Status do Pagamento',
      value: PixResult.status
    },
    {
      name: 'Data da Cobrança',
      value: PixResult?.date_time ?? ''
    }
  ];
}
