import { PaymentsInterface } from './paymentsModule';
import { PixInterface } from './pixModule';

declare module 'react-native' {
  interface NativeModulesStatic {
    Payment: PaymentsInterface;
    Pix: PixInterface;
  }
}
