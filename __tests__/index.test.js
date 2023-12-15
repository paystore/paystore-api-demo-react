import { AppRegistry } from 'react-native';
import App from '../src/index';

jest.mock('../src/index', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue(null)
}));

describe('AppRegistry', () => {
  it('registers the component without error', () => {
    const registerComponentMock = jest.fn();

    jest.mock('react-native', () => ({
      AppRegistry: {
        registerComponent: registerComponentMock
      }
    }));

    // Simule a chamada do método registerComponent
    AppRegistry.registerComponent('MyApp', () => App);

    expect(registerComponentMock).toHaveBeenCalledWith(
      'MyApp',
      expect.any(Function)
    );
  });
});
