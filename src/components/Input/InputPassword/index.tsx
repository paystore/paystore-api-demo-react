import React, { useState } from 'react';
import { Container, EyeIcon, Hint, TextInput, ToggleButton } from './style';
import { TextInputProps } from 'react-native';

export interface PasswordInputProps extends TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  hint?: string;
  iconSize?: number;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  value,
  onChangeText,
  placeholder = 'Password',
  hint,
  iconSize = 20,
  ...rest
}) => {
  const [hidden, setHidden] = useState(true);

  return (
    <>
      <Container>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#9b9b9b"
          secureTextEntry={hidden}
          keyboardType="default"
          textContentType="password"
          autoCapitalize="none"
          autoCorrect={false}
          {...rest}
        />

        <ToggleButton
          onPress={() => setHidden((s) => !s)}
          accessible
          accessibilityLabel={hidden ? 'Mostrar senha' : 'Ocultar senha'}
          accessibilityRole="button"
          testID="password-toggle-button"
        >
          <EyeIcon
            name={hidden ? 'eye-off' : 'eye'}
            size={iconSize}
            color="#6b6b6b"
          />
        </ToggleButton>
      </Container>

      {hint ? <Hint>{hint}</Hint> : null}
    </>
  );
};
