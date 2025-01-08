import styled from 'styled-components/native';

import IconVector from 'react-native-vector-icons/Octicons';
import IconVectorMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import { TextProps, TouchableOpacityProps } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export const PeriodButton = styled.TouchableOpacity`
  border-radius: 50px;
  align-items: center;
  width: 100px;
  margin: 0px;
  flex: 1;
  padding-vertical: 10px;
`;

export const PeriodIcon = styled(IconVector).attrs((props) => ({ size: 20 }))``;

export const PeriodButtonText = styled.Text`
  text-align: center;
  padding-top: 5px;
`;

export const Container = styled.View`
  margin: 20px 15px;
`;

export const FilterTitle = styled.Text`
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
`;

export const PeriodView = styled.View`
  margin-vertical: 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #ededed;
  border-radius: 50px;
`;

export const PeriodInputView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`;

export const PeriodInfoView = styled.View`
  background-color: #ededed;
  border-radius: 50px;
  margin-vertical: 10px;
`;

export const PeriodInfoText = styled.Text`
  text-align: center;
  font-size: 14px;
  padding-vertical: 10px;
`;

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

export const FABGroupContainer = styled.View`
  position: absolute;
  bottom: 20px;
  right: 20px;
  flex-direction: column;
  align-items: flex-end;
`;

export const FABButton = styled(TouchableOpacity)`
  width: 56px;
  height: 56px;
  border-radius: 50px;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  background-color: rgba(65, 80, 200, 225);
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
`;

export const FabIcon = styled(IconVectorMaterial).attrs((props) => ({
  size: 24,
  color: '#fff'
}))``;
