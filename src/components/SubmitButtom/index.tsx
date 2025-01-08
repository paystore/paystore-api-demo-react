import React from 'react';
import { ButtonText, StyledButton } from './style';

interface SubmitButtonProps {
  onPress: () => void;
  title: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ onPress, title }) => {
  return (
    <StyledButton onPress={onPress}>
      <ButtonText>{title}</ButtonText>
    </StyledButton>
  );
};

export default SubmitButton;
