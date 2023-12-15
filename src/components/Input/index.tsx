import React, { ChangeEvent } from 'react';
import {
  InputModeOptions,
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

const style = StyleSheet.create({
  inputView: {
    marginTop: 10
  },
  label: {
    fontSize: 14,
    marginLeft: 4
  },
  containerInput: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  containerInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  TextInput: {
    fontSize: 18,
    borderWidth: 2,
    borderColor: 'gray',
    borderRadius: 3,
    flex: 1
  },
  TextInputError: {
    // fontSize: theme.fontSize.small,
    margin: 0,
    padding: 0 // Tornar visível por padrão
  }
});

type InputError = {
  visible: boolean;
  text: string;
};

interface InputTextProps {
  readonly label: string;
  readonly autoFocus?: boolean;
  readonly multiline?: boolean;
  readonly errors?: InputError;
  readonly maxLength?: number;
  readonly inputMode?: InputModeOptions;
  readonly onChangeText?: (e: string | ChangeEvent<any>) => void;
  readonly keyboardType?: KeyboardTypeOptions;
  readonly onSubmitEditing?: () => void;
  readonly autoCorrect?: boolean;
  readonly value?: string;
  readonly autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  readonly placeholder?: string;
  readonly disabled?: boolean;
}

export function InputText({
  label,
  placeholder,
  autoFocus,
  inputMode,
  onSubmitEditing,
  keyboardType,
  autoCapitalize,
  onChangeText,
  value,
  autoCorrect,
  errors,
  maxLength,
  multiline,
  disabled
}: InputTextProps) {
  return (
    <>
      <View style={style.inputView}>
        <Text style={style.label}>{label + ':'}</Text>
        <TextInput
          editable={!disabled}
          style={style.TextInput}
          inputMode={inputMode}
          multiline={multiline}
          autoCorrect={autoCorrect}
          placeholder={placeholder}
          autoFocus={autoFocus}
          maxLength={maxLength}
          onSubmitEditing={onSubmitEditing}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          onChangeText={onChangeText}
          value={value}
        />
      </View>
      <View style={style.containerInfo}>
        {errors?.visible ? (
          <Text style={style.TextInputError}>{errors?.text}</Text>
        ) : (
          <></>
        )}
      </View>
    </>
  );
}
