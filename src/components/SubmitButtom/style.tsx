import { Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

// Styled TouchableOpacity
export const StyledButton = styled(TouchableOpacity)`
  background-color: rgba(65, 80, 200, 0.9);
  padding: 12px 20px;
  margin: 10px;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
`;

// Styled Text
export const ButtonText = styled(Text)`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;
