import { TextInput, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

export const InputTitle = styled.Text`
  margin-bottom: 5px;
  margin-horizontal: 10px;
  font-weight: 700;
  text-transform: uppercase;
`;

export const InputContainer = styled.View`
  border-radius: 50px;
  border-color: #000;
  border-width: 1px;
  margin: 0px;
  padding: 0px;
`;

export const InputTextPicker = styled(TextInput).attrs((props) => ({
  textAlign: 'center',
  editable: false,
  textAlignVertical: 'center'
}))`
  height: 25px;
  padding: 0px;
`;
