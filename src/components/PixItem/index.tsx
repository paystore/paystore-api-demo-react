/* eslint-disable prettier/prettier */
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15
  },
  status: {
    fontSize: 15
  },
  brand: {
    fontSize: 20
  },
  card: {
    color: 'gray'
  },
  value: {
    fontSize: 20
  },
  date: {
    color: 'gray'
  }
});

interface PixItemProps {
  item: PixItem;
}

type PixItem = {
  status: string;
  cob_value: string;
  date_time: string;
};

export function PixItem({ item }: PixItemProps) {
  return (
    <View style={style.container}>
      <View>
        <Text style={style.status}>{item.status}</Text>
      </View>
      <View>
        <Text style={style.value}>{item.cob_value}</Text>
        <Text style={style.date}>{item.date_time}</Text>
      </View>
    </View>
  );
}
