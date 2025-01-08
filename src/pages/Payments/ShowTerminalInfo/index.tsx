import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { RootStackParamList } from '../../../routes';
import { Alert, View } from 'react-native';
import { Table, TableItem } from '../../../components/Table';
import { Payment } from '../../../native_modules/payment';
import { TerminalInfoResult } from '../../../../types/paymentsModule';

type TerminalInfoResultScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'TerminalInfo'
>;

export default function ShowTerminalInfo({
  navigation
}: Readonly<TerminalInfoResultScreenProps>) {
  const [tableItems, setTableItems] = useState<TableItem[]>([]);
  useEffect(() => {
    navigation.setOptions({
      title: 'Informações do Terminal'
    });
  }, [navigation]);

  useEffect(() => {
    (async function () {
      await Payment.getTerminalInfo()
        .then((result) => {
          const terminalInfoResult: TerminalInfoResult = JSON.parse(result);
          const getTableInformation = mountTableItems(terminalInfoResult);
          setTableItems(getTableInformation);
        })
        .catch((e) => {
          console.log(e);
          Alert.alert('Houve um problema ao listar as informações do terminal');
        });
    })();
  }, []);

  return <Table items={tableItems} />;
}

function mountTableItems(items: TerminalInfoResult): TableItem[] {
  return [
    { title: 'terminalId', value: items.terminalId },
    { title: 'merchantId', value: items.merchantId },
    { title: 'merchantName', value: items.merchantName },
    { title: 'merchantNationalId', value: items.merchantNationalId },
    { title: 'Nome Comercial', value: items.merchantCommercialName },
    { title: 'Rua', value: items.mcStreet },
    { title: 'Número', value: items.mcAddressNumber },
    { title: 'Cidade', value: items.mcCity },
    { title: 'Complemento', value: items.mcComplement },
    { title: 'País', value: items.mcCountry },
    { title: 'Bairro', value: items.mcNeighbourhood },
    { title: 'CEP', value: items.mcPostalCode },
    { title: 'Estado', value: items.mcState },
    { title: 'Estado ABRV', value: items.mcStateAbbreviation }
  ];
}
