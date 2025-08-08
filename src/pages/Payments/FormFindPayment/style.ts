import styled from 'styled-components/native';

export const Container = styled.View`
  margin: 20px 15px;
`;

export const TextTitle = styled.Text`
  font-size: 14px;
`;

export const FormTextInput = styled.View`
  width: 100%;
  padding-bottom: 4px;
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
`;

export const FilterTitle = styled.Text`
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
`;
