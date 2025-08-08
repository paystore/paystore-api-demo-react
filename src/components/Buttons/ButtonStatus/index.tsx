import React from 'react-native';
import { StatusButtom, StatusText } from './styles';

export function ButtonStatus({
  onPress,
  title,
  active
}: Readonly<{
  onPress: () => void;
  title: string;
  active: boolean;
}>) {
  return (
    <StatusButtom onPress={onPress} active={active}>
      <StatusText active={active}>{title}</StatusText>
    </StatusButtom>
  );
}
