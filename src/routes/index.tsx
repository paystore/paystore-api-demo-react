import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  TransitionPresets
} from '@react-navigation/stack';
import Main from '../pages/Main';
import FormPayment from '../pages/Payments/FormPayment';
import FormReversal from '../pages/Payments/FormReversal';
import FormListPayments from '../pages/Payments/FormListPayments';
import FormCancelPayment from '../pages/Payments/FormCancelPayment';
import FormConfirmPayment from '../pages/Payments/FormConfirmPayment';
import { PaymentResult, PaymentStatus } from '../../types/paymentsModule';
import ShowPaymentResult from '../pages/Payments/ShowPaymentResult';
import ShowTerminalInfo from '../pages/Payments/ShowTerminalInfo';
import FormPixPayment from '../pages/Pix/FormPixPayment';
import FormListPix from '../pages/Pix/FormListPix';
import ShowPixResult from '../pages/Pix/ShowPixResult';
import FormPixRefund from '../pages/Pix/RefundPix/FormPixRefund';
import MainPix from '../pages/Pix/MainPix';
import MainPayment from '../pages/Payments/MainPayment';
import PixInstalled from '../pages/Pix/PixInstalled';
import { PixResult, PixStatus } from '../../types/pixModule';
import ConsultPixOptions from '../pages/Pix/ConsultPix/ConsultPixOptions';
import FormConsultPix from '../pages/Pix/ConsultPix/FormConsultPix';
import SyncPix from '../pages/Pix/SyncPix';
import { LogoTitle } from '../components/LogoTitle';
import ShowLogo from '../pages/Payments/ShowLogo';
import ShowReceiptLogo from '../pages/Payments/ShowReceiptLogo';
import FormFilter from '../pages/Pix/FormFilter';
import RefundPixOptions from '../pages/Pix/RefundPix/RefundPixOptions';
import FormMainApp from '../pages/Payments/FormMainApp';

const Stack = createStackNavigator<RootStackParamList>();

const screenOptions = {
  ...TransitionPresets.SlideFromRightIOS,
  headerStyle: { backgroundColor: 'rgba(65,80,200,225)' },
  headerTitleStyle: { color: '#fff' },
  headerTintColor: '#fff'
};

const PaymentsRoutes = () => {
  return (
    <Stack.Navigator
      initialRouteName="MainPayment"
      screenOptions={{
        ...screenOptions
      }}
    >
      <Stack.Screen name="MainPayment" component={MainPayment} />
      <Stack.Screen name="FormPayment" component={FormPayment} />
      <Stack.Screen name="FormReversal" component={FormReversal} />
      <Stack.Screen name="FormListPayments" component={FormListPayments} />
      <Stack.Screen name="FormCancelPayment" component={FormCancelPayment} />
      <Stack.Screen name="FormConfirmPayment" component={FormConfirmPayment} />
      <Stack.Screen name="ShowPaymentResult" component={ShowPaymentResult} />
      <Stack.Screen name="TerminalInfo" component={ShowTerminalInfo} />
      <Stack.Screen
        options={{ title: 'Obter Logo Portal' }}
        name="ShowLogo"
        component={ShowLogo}
      />
      <Stack.Screen
        options={{ title: 'Obter Logo Recibo' }}
        name="ShowReceiptLogo"
        component={ShowReceiptLogo}
      />
      <Stack.Screen
        options={{ title: 'Definir aplicação principal' }}
        name="FormMainApp"
        component={FormMainApp}
      />
    </Stack.Navigator>
  );
};

const PixRoutes = () => {
  return (
    <Stack.Navigator
      initialRouteName="MainPix"
      screenOptions={{
        ...screenOptions
      }}
    >
      <Stack.Screen
        options={{ title: 'Pix Demo' }}
        name="MainPix"
        component={MainPix}
      />
      <Stack.Screen
        options={{ title: 'Verificar Instalação' }}
        name="PixInstalled"
        component={PixInstalled}
      />
      <Stack.Screen
        options={{ title: 'Gerar Cobrança' }}
        name="FormPixPayment"
        component={FormPixPayment}
      />
      <Stack.Screen
        options={{ title: 'Listar Pix' }}
        name="FormListPix"
        component={FormListPix}
      />
      <Stack.Screen name="FormFilter" component={FormFilter} />
      <Stack.Screen name="FormPixRefund" component={FormPixRefund} />
      <Stack.Screen
        options={{ title: 'Pix Information' }}
        name="ShowPixResult"
        component={ShowPixResult}
      />
      <Stack.Screen
        options={{ title: 'Consultar Pix' }}
        name="ConsultPixOptions"
        component={ConsultPixOptions}
      />
      <Stack.Screen
        options={{ title: 'Devolver Pix' }}
        name="RefundPixOptions"
        component={RefundPixOptions}
      />
      <Stack.Screen name="FormConsultPix" component={FormConsultPix} />
      <Stack.Screen
        options={{ title: 'Sincronizar Pix' }}
        name="SyncPix"
        component={SyncPix}
      />
    </Stack.Navigator>
  );
};

const MainRoute = () => {
  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{
        ...screenOptions,
        headerTitle: () => <LogoTitle />,
        headerTitleAlign: 'center'
      }}
    >
      <Stack.Screen name="Main" component={Main} />
    </Stack.Navigator>
  );
};

function NavigationRoutes() {
  return (
    <Stack.Navigator
      initialRouteName="MainRoute"
      screenOptions={{
        //@ts-ignore
        headerMode: 'none',
        ...screenOptions
      }}
    >
      <Stack.Screen name="MainRoute" component={MainRoute} />
      <Stack.Screen name="PaymentsRoutes" component={PaymentsRoutes} />
      <Stack.Screen name="PixRoutes" component={PixRoutes} />
    </Stack.Navigator>
  );
}

export type RootStackParamList = {
  Main: {};
  MainRoute: {};
  PaymentsRoutes: {};
  PixRoutes: {};
  //Rotas Payments
  MainPayment: {};
  FormPayment: {};
  FormReversal: {
    item?: PaymentResult;
  };
  FormListPayments: {
    status: PaymentStatus[];
    navigateTo?: keyof RootStackParamList;
    title?: string;
  };
  FormCancelPayment: {
    item?: PaymentResult;
  };
  FormConfirmPayment: {
    item?: PaymentResult;
  };
  ShowPaymentResult: {
    item: PaymentResult;
  };
  TerminalInfo: {};
  ShowLogo: {};
  ShowReceiptLogo: {};
  //Rotas Pix
  MainPix: {};
  FormPixPayment: {};
  FormListPix: {
    status: PixStatus[];
    date: {
      dateStart: string;
      dateEnd: string;
    };
  };
  ShowPixResult: {
    item: PixResult;
  };
  FormPixRefund: {
    type: 'TXID' | 'GENERAL';
  };
  PixInstalled: {};
  ConsultPixOptions: {};
  RefundPixOptions: {};
  FormConsultPix: {
    type: 'TXID' | 'PIXCLIENTID' | 'GENERAL';
  };
  SyncPix: {};
  FormFilter: {
    title?: string;
  };
  FormMainApp: {};
};

export default function Routes() {
  return (
    <NavigationContainer>
      <NavigationRoutes />
    </NavigationContainer>
  );
}
