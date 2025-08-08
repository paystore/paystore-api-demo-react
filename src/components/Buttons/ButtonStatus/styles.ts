import { TextProps, TouchableOpacityProps } from 'react-native';
import styled from 'styled-components/native';

interface TouchStatusProps extends TouchableOpacityProps {
  active?: boolean;
}

interface TextStatusProps extends TextProps {
  active?: boolean;
}

export const StatusButtom = styled.TouchableOpacity.attrs<TouchStatusProps>(
  (props) => ({})
)`
  padding: 10px;
  border-radius: 10px;
  margin-vertical: 5px;
  margin-horizontal: 10px;
  background: ${(props) => (props.active ? 'rgba(65,80,200,225)' : '#E0E0E0')};
`;

export const StatusText = styled.Text.attrs<TextStatusProps>((props) => ({}))`
  color: ${(props) => (props.active ? '#fff' : '#757575')};
`;
