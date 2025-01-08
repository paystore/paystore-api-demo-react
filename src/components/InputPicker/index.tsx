import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import DateTimePicker, {
  DateTimePickerEvent
} from '@react-native-community/datetimepicker';
import PropTypes from 'prop-types';
import { InputTextPicker, InputTitle, InputContainer } from './styles';

InputPicker.propTypes = {
  mode: PropTypes.oneOf(['date', 'time']),
  label: PropTypes.oneOfType([PropTypes.string]),
  value: PropTypes.instanceOf(Date),
  onChangeValue: PropTypes.oneOfType([PropTypes.func]),
  minimumDate: PropTypes.oneOfType([PropTypes.instanceOf(Date)]),
  maximumDate: PropTypes.oneOfType([PropTypes.instanceOf(Date)])
};

type InputPickerProps = {
  mode: 'date' | 'time';
  label?: string;
  value: Date;
  onChangeValue: (value?: Date) => void;
  minimumDate?: Date;
  maximumDate?: Date;
};

function InputPicker({
  label,
  value,
  mode,
  onChangeValue,
  minimumDate,
  maximumDate
}: InputPickerProps) {
  const [showPicker, setShowPicker] = useState(false);
  const [stringDate, setStringDate] = useState('');

  useEffect(() => {
    const date = new Date(value);
    let dateValue = '';
    if (mode === 'time') {
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      dateValue = `${hours}:${minutes}`;
    } else {
      dateValue = date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    }

    setStringDate(dateValue);
  }, [value, mode]);

  function onChange(event: DateTimePickerEvent, selectedDate?: Date) {
    setShowPicker(false);
    onChangeValue(selectedDate);
  }

  return (
    <View>
      {showPicker && (
        <DateTimePicker
          minimumDate={minimumDate}
          maximumDate={maximumDate}
          mode={mode}
          value={value}
          onChange={onChange}
        />
      )}
      <InputTitle>{label}</InputTitle>
      <TouchableOpacity
        onPress={() => setShowPicker(!showPicker)}
        touchSoundDisabled
      >
        <InputContainer>
          <InputTextPicker value={stringDate} />
        </InputContainer>
      </TouchableOpacity>
    </View>
  );
}

InputPicker.defaultProps = {
  mode: 'date',
  label: undefined,
  onChangeValue: undefined
};

export default InputPicker;
