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

interface PaymentItemProps {
    item: PaymentItem
}

type PaymentItem = {
    status: string,
    cardBrand: string,
    cardNumber: string,
    value: string,
    dateTime: string
}

export function PaymentItem({item}: PaymentItemProps) {
  return <View style={style.container} >
    <View>
        <Text style={style.status}>{item.status}</Text>
        <Text style={style.brand}>{item.cardBrand}</Text>
        <Text style={style.card}>{item.cardNumber}</Text>
    </View>
    <View> 
        <Text style={style.value}>{item.value}</Text>
        <Text style={style.date}>{item.dateTime}</Text>       
    </View>
  </View>;
}
