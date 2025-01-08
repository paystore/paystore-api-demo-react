import styled from 'styled-components/native';

export const Container = styled.ScrollView.attrs({
  contentContainerStyle: { margin: 10 }
})``;

export const FormTextInput = styled.View`
  width: 100%;
`;

export const TextInputLabel = styled.Text`
  color: #000;
  font-size: 16px;
  margin-left: 5px;
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
