import styled from 'styled-components/native';

export const Container = styled.ScrollView.attrs({
  contentContainerStyle: { marginHorizontal: 15, marginVertical: 20 }
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

export const PaymentTypesLabel = styled.Text`
  color: #666666;
  font-size: 18px;
  font-weight: bold;
  margin: 10px 0px 5px 5px;
`;

export const PaymentTypesView = styled.View`
  flex-direction: row;
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

export const SubmitButtonView = styled.View`
  flex: 1;
  align-items: center;
`;

export const Button = styled.TouchableOpacity`
  width: 100%;
  background: #dcdcdc;
  width: 90%;
  justify-content: center;
  align-items: center;
  padding: 10px;
  margin: 10px;
  elevation: 3;
`;

export const ButtonText = styled.Text`
  color: #000;
`;
