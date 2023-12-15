/* eslint-disable prettier/prettier */
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CheckBox from '@react-native-community/checkbox';

const styles = StyleSheet.create({
  container: {
    marginBottom: 5
  },
  checkBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4
  },
  label: {
    fontSize: 14,
    flexShrink: 1,
  }
});

interface CheckBoxProps {
    label: string,
    onPress?: () => void,
    value?: boolean
}

export function CheckBoxItem(props: CheckBoxProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={props.onPress} activeOpacity={0.8} style={styles.checkBox}>
        <Text style={styles.label}>{props.label}</Text>
        <CheckBox value={props.value} onValueChange={props.onPress} />
      </TouchableOpacity>
    </View>
  );
}
