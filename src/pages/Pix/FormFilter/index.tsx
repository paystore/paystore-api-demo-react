import React, { useEffect, useState } from 'react';
import { RootStackParamList } from '../../../routes';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PixStatus } from '../../../../types/pixModule';
import { SafeAreaView, ScrollView, ToastAndroid, View } from 'react-native';
import {
  Container,
  FABButton,
  FABGroupContainer,
  FabIcon,
  FilterTitle,
  PeriodButton,
  PeriodButtonText,
  PeriodIcon,
  PeriodInfoText,
  PeriodInfoView,
  PeriodInputView,
  PeriodView,
  StatusButtom,
  StatusText
} from './styles';
import InputPicker from '../../../components/InputPicker';

type FormFilterScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'FormFilter'
>;

export interface FormFilterPix {
  date: {
    dateStart: string;
    dateEnd: string;
  };
  status: PixStatus[];
}

export default function FormFilter({
  navigation,
  route
}: Readonly<FormFilterScreenProps>) {
  const { title } = route.params;
  // Define a data atual
  const { endOfDay, startOfDay } = getToday();
  const [radioValue, setRadioValue] = useState('today');
  const [dateStart, setDateStart] = useState<Date>(startOfDay);
  const [dateFinish, setDateFinish] = useState<Date>(endOfDay);
  const initStatusButton: Record<PixStatus, boolean> = {
    ACTIVE: true,
    CONCLUDED: true,
    REFUNDED: true,
    REFUND_PROCESSING: false,
    REFUND_NOT_DONE: false,
    REMOVED_BY_USER: false,
    REMOVED_BY_PSP: false,
    EXPIRED: false
  } as const;

  const PIX_STATUS: Record<PixStatus, string> = {
    ACTIVE: 'ATIVA',
    CONCLUDED: 'CONCLUIDA',
    REFUNDED: 'DEVOLVIDA',
    REFUND_PROCESSING: 'DEVOLUÇÃO EM PROCESSAMENTO',
    REFUND_NOT_DONE: 'DEVOLUÇÃO NÃO FINALIZADA',
    REMOVED_BY_USER: 'REMOVIDA PELO USUÁRIO',
    REMOVED_BY_PSP: 'REMOVIDA PELO PSP',
    EXPIRED: 'EXPIRADA'
  } as const;

  const [statusButton, setStatusButton] = useState(initStatusButton);

  useEffect(() => {
    navigation.setOptions({
      title
    });
  }, []);

  useEffect(() => {
    if (radioValue === 'today') {
      const { endOfDay, startOfDay } = getToday();
      setDateFinish(endOfDay);
      setDateStart(startOfDay);
    } else if (radioValue === 'month') {
      const date = new Date();
      setDateFinish(date);
      setDateStart(new Date(date.getFullYear(), date.getMonth(), 1));
    } else if (radioValue === 'custom') {
      const date = new Date();
      setDateFinish(date);
      const firstDayOfLastMonth = new Date(
        date.getFullYear(),
        date.getMonth() - 1,
        1
      );
      firstDayOfLastMonth.setHours(0, 0, 0, 0);
      setDateStart(firstDayOfLastMonth);
    }
  }, [radioValue]);

  function onChangeStartDate(value?: Date) {
    if (value) setDateStart(value);
  }

  function onChangeEndDate(value?: Date) {
    if (value) {
      setDateFinish(value);
    }
  }

  function onChangeButtonStatus(value: string) {
    setStatusButton({
      ...statusButton,
      [value]: !statusButton[value as PixStatus]
    });
  }

  function validate() {
    const errors: string[] = [];
    if (dateStart > dateFinish || dateFinish < dateStart) {
      errors.push('Data ou Hora inválidas');
    }

    const filtersEnabled = Object.values(statusButton).some(
      (value) => value === true
    );

    if (!filtersEnabled) errors.push('Deve selecionar pelo menos um status');

    return errors;
  }

  const handleFilter = () => {
    const filtersLink: FormFilterPix = {} as FormFilterPix;
    const errors = validate();
    if (errors.length >= 1) {
      errors.forEach((error) => {
        ToastAndroid.show(error, ToastAndroid.SHORT);
      });
    } else {
      filtersLink.date = {
        dateStart: dateStart.toISOString() as string,
        dateEnd: dateFinish.toISOString() as string
      };
      const filtersEnabled = Object.entries(statusButton)
        .filter(([key, value]) => value === true)
        .map(([key]) => key);

      filtersLink.status = filtersEnabled as PixStatus[];

      navigation.navigate('FormListPix', { ...filtersLink });
    }
  };

  function getDateInfo() {
    if (radioValue === 'today') {
      if (dateStart)
        return dateStart.toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        });
    } else if (radioValue === 'month' || radioValue === 'custom') {
      if (dateStart && dateFinish) {
        const start = dateStart.toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        });
        const finish = dateFinish.toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        });
        return `${start} a ${finish}`;
      }
    }
    return '';
  }

  function handleResetFilter() {
    setRadioValue('today');
    const { endOfDay, startOfDay } = getToday();
    setDateFinish(endOfDay);
    setDateStart(startOfDay);
    setStatusButton(initStatusButton);
  }

  const ButtonFilterGroup = () => {
    return (
      <FABGroupContainer>
        <FABButton onPress={handleFilter}>
          <FabIcon name="filter" />
        </FABButton>
        <FABButton onPress={handleResetFilter}>
          <FabIcon name="broom" />
        </FABButton>
      </FABGroupContainer>
    );
  };

  return (
    <SafeAreaView style={{ flexGrow: 1 }}>
      <ScrollView>
        <Container>
          <View>
            <FilterTitle>Período Atual</FilterTitle>
            <PeriodView>
              <ButtomFilter
                onSelect={() => setRadioValue('today')}
                status={radioValue === 'today' ? 'checked' : 'unchecked'}
                text="Dia Atual"
              />
              <ButtomFilter
                onSelect={() => setRadioValue('month')}
                status={radioValue === 'month' ? 'checked' : 'unchecked'}
                text="Mês Atual"
              />
              <ButtomFilter
                onSelect={() => setRadioValue('custom')}
                status={radioValue === 'custom' ? 'checked' : 'unchecked'}
                text="Outro Período"
              />
            </PeriodView>
            {(radioValue === 'today' || radioValue === 'custom') && (
              <PeriodInputView style={{ flex: 1 }}>
                <InputPicker
                  onChangeValue={onChangeStartDate}
                  // minWidth={150}
                  mode={radioValue === 'today' ? 'time' : 'date'}
                  label="Hora Inicial"
                  value={dateStart}
                  maximumDate={new Date()}
                />
                <InputPicker
                  mode={radioValue === 'today' ? 'time' : 'date'}
                  label="Hora Final"
                  // minWidth={150}
                  minimumDate={dateStart}
                  maximumDate={new Date()}
                  value={dateFinish}
                  onChangeValue={onChangeEndDate}
                />
              </PeriodInputView>
            )}
            <PeriodInfoView>
              <PeriodInfoText>{getDateInfo()}</PeriodInfoText>
            </PeriodInfoView>
          </View>

          <View>
            <FilterTitle>Status</FilterTitle>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {Object.entries(PIX_STATUS).map(([key, value]) => {
                return (
                  <ButtonStatus
                    key={key}
                    title={value}
                    onPress={() => onChangeButtonStatus(key)}
                    /**@ts-ignore */
                    active={statusButton[key] as boolean}
                  />
                );
              })}
            </View>
          </View>
        </Container>
      </ScrollView>

      <ButtonFilterGroup />
    </SafeAreaView>
  );
}

function getToday() {
  const today = new Date();

  // Configura a primeira hora do dia (00:00)
  const startOfDay = new Date(today);
  startOfDay.setHours(0, 0, 0, 0);

  // Configura a última hora do dia (23:59)
  const endOfDay = new Date(today);
  endOfDay.setHours(23, 59, 59, 999);

  return { startOfDay, endOfDay };
}

function ButtonStatus({
  onPress,
  title,
  active
}: {
  onPress: () => void;
  title: string;
  active: boolean;
}) {
  return (
    <StatusButtom onPress={onPress} active={active}>
      <StatusText active={active}>{title}</StatusText>
    </StatusButtom>
  );
}

function ButtomFilter({
  onSelect,
  text,
  status
}: {
  onSelect: () => void;
  text: string;
  status: string;
}) {
  return (
    <PeriodButton
      onPress={onSelect}
      style={{
        backgroundColor:
          status === 'checked' ? 'rgba(65,80,200,225)' : 'transparent'
      }}
    >
      <PeriodIcon
        name="calendar"
        style={{
          color: status === 'checked' ? '#fff' : 'rgba(65,80,200,225)'
        }}
      />
      <PeriodButtonText
        style={{
          color: status === 'checked' ? '#fff' : 'rgba(65,80,200,225)'
        }}
      >
        {text}
      </PeriodButtonText>
    </PeriodButton>
  );
}
