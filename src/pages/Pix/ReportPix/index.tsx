import {
  HeaderBackButton,
  HeaderBackButtonProps
} from '@react-navigation/elements';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps
} from '@react-navigation/native-stack';
import React, { useCallback, useEffect } from 'react';
import { ActivityIndicator, ToastAndroid } from 'react-native';
import { Pix } from '../../../native_modules/payment';
import { RootStackParamList } from '../../../routes';
import { Container } from './styles';

type GetReportScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'GetReportPix'
>;

const headerLeft = (
  props: HeaderBackButtonProps,
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    'GetReportPix',
    undefined
  >
) => (
  <HeaderBackButton
    {...props}
    onPress={() => navigation.navigate('MainPix', {})}
  />
);

export default function GetReportPix({
  navigation,
  route
}: Readonly<GetReportScreenProps>) {
  const { startDate, endDate, reportType } = route.params;

  useEffect(() => {
    navigation.setOptions({
      title: 'Relatórios',
      headerLeft: (props) => headerLeft(props, navigation)
    });
  }, [navigation]);

  const getReport = useCallback(() => {
    Pix.getReport({
      startDate: startDate,
      endDate: endDate,
      reportType: reportType
    })
      .then((res) => {
        navigation.goBack();
      })
      .catch((error: any) => {
        const message = error?.toString();
        ToastAndroid.showWithGravity(
          message,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
        navigation.goBack();
      });
  }, [reportType]);

  useEffect(() => {
    getReport();
  }, [getReport]);

  return (
    <Container>
      <ActivityIndicator size={50} color="#007AFF" />
    </Container>
  );
}
