import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const Button = styled.TouchableOpacity`
  width: 100%;
  border-bottom-width: 1px;
  border-bottom-color: #0002;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

export const ButtonText = styled.Text`
  color: #000;
`;

export const StatusBar = styled.StatusBar.attrs({
  backgroundColor: 'rgba(65,50,200,225)',
  barStyle: 'light-content'
})``;
