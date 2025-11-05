import { Platform, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import IconVector from 'react-native-vector-icons/Ionicons';

export const Container = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  border-width: 1px;
  border-color: #d0d0d0;
  border-radius: 8px;
  padding-vertical: 6px;
  padding-horizontal: 12px;
  background-color: #fff;
`;

export const TextInput = styled.TextInput.attrs({
  underlineColorAndroid: '#000'
})`
  flex: 1;
  font-size: 16px;
  padding-vertical: ${Platform.OS === 'ios' ? '10px' : '6px'};
  color: #222;
`;

/* Botão do olho */
export const ToggleButton = styled(TouchableOpacity)`
  padding: 6px;
  margin-left: 8px;
  justify-content: center;
  align-items: center;
`;

/* Se quiser um texto pequeno de ajuda/erro abaixo do input */
export const Hint = styled.Text`
  margin-top: 6px;
  color: #9b9b9b;
  font-size: 12px;
`;

export const EyeIcon = styled(IconVector).attrs((props) => ({ size: 20 }))``;
