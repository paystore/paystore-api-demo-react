import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const TextInputLabel = styled.Text`
  color: #000;
  font-size: 16px;
  margin-left: 5px;
`;

export const FormTextInput = styled.View`
  width: 100%;
`;

export const TextInput = styled.TextInput.attrs({
  underlineColorAndroid: '#000'
})`
  padding-top: 2px;
  padding-bottom: 4px;
`;

export const ShowReceiptView = styled.View`
  margin: 5px 0 0 0;
`;

export const CheckBoxColumn = styled.View`
  width: 50%;
`;

export const FormCheckBox = styled.View`
  flex-direction: row;
`;

export const CheckBoxLabel = styled.Text`
  color: #000;
  font-size: 16px;
  margin-top: 4px;
  flex-wrap: wrap;
  flex-shrink: 1;
`;
