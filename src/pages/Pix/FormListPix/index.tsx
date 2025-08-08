import React, { useCallback, useEffect, useState } from 'react';
import { RootStackParamList } from '../../../routes';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HeaderBackButton } from '@react-navigation/elements';
import {
  FlatList,
  DeviceEventEmitter,
  RefreshControl,
  Text
} from 'react-native';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import { PixItem } from '../../../components/PixItem';
import { Pix } from '../../../native_modules/payment';
import { PixResult } from '../../../../types/pixModule';
import { Container } from '../../Main/styles';
import {
  HeaderBackButtonProps,
  NativeStackNavigationProp
} from '@react-navigation/native-stack/lib/typescript/src/types';
import { currencyNumberToString } from '../../../helper/strings';

type FormListPaymentsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'FormListPix'
>;

const headerLeft = (
  props: HeaderBackButtonProps,
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    'FormListPix',
    undefined
  >
) => (
  <HeaderBackButton
    {...props}
    onPress={() => navigation.navigate('MainPix', {})}
  />
);

export default function FormListPix({
  navigation,
  route
}: Readonly<FormListPaymentsScreenProps>) {
  const { status, date } = route.params;
  useEffect(() => {
    navigation.setOptions({
      title: 'Listar Pagamentos Pix',
      headerLeft: (props) => headerLeft(props, navigation)
    });
  }, [navigation]);

  const [pix, setPix] = useState<PixResult[]>([]);

  const [loading, setLoading] = useState(true);

  const fetchPix = useCallback(() => {
    const subscribe = DeviceEventEmitter.addListener(
      'onPixList',
      (result: string) => {
        subscribe.remove();
        const data: PixResult[] = JSON.parse(result);
        const ordenedData = data.sort((a, b) =>
          b.date_time.localeCompare(a.date_time)
        );
        setPix(ordenedData);
        setLoading(false);
      }
    );

    Pix.listPixPayments({
      startDate: date.dateStart,
      endDate: date.dateEnd,
      status: status
    }).catch((e) => {
      subscribe.remove();
      console.log(e);
    });
  }, [status]);

  useEffect(() => {
    setLoading(true);
    fetchPix();
  }, [fetchPix]);

  return (
    <Container>
      <FlatList
        data={pix}
        keyExtractor={(item, index) => `${index}`}
        refreshControl={
          <RefreshControl onRefresh={fetchPix} refreshing={loading} />
        }
        ListEmptyComponent={
          <Text style={{ textAlign: 'center' }}>
            {loading ? '' : 'Nenhum dado encontrado'}
          </Text>
        }
        renderItem={({ item }) => (
          <TouchableNativeFeedback
            onPress={() => {
              return navigation.navigate('ShowPixResult', { item });
            }}
          >
            <PixItem
              item={{
                cob_value: currencyNumberToString(Number(item?.cob_value)),
                status: item.status,
                date_time: item.date_time
              }}
            />
          </TouchableNativeFeedback>
        )}
      />
    </Container>
  );
}
