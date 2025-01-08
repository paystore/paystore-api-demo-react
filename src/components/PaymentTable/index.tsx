import React, { ReactNode, isValidElement } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';

interface PaymentTableProps {
  items: PaymentTableItem[];
}

export type PaymentTableItem = {
  name: string;
  value?: string | ReactNode;
};

export function PaymentTable({ items }: Readonly<PaymentTableProps>) {
  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <View style={isValidElement(item.value) ? styles.column : styles.row}>
            <PaymentNameItem item={item.name} />
            <PaymentValueItem item={item.value} />
          </View>
        )}
        keyExtractor={(_item, ind) => `${ind}`}
      />
    </View>
  );
}

function PaymentNameItem({ item }: { item: PaymentTableItem['name'] }) {
  return <Text style={[styles.cell, styles.cellTitle]}>{item}</Text>;
}

function PaymentValueItem({ item }: { item: PaymentTableItem['value'] }) {
  if (isValidElement(item)) {
    return <View>{item}</View>;
  } else {
    function handleCopyToClipBoard(item: PaymentTableItem['value']) {
      if (typeof item === 'string') {
        Clipboard.setString(item);
        ToastAndroid.show('Copiado', ToastAndroid.SHORT);
      }
    }
    return (
      <TouchableOpacity onPress={() => handleCopyToClipBoard(item)}>
        <Text style={styles.cell}>{item ?? '-'}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: '#fff'
  },
  column: {
    flexDirection: 'column',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 5
  },
  cell: {
    flex: 1,
    textAlign: 'left',
    color: '#808080'
  },
  cellTitle: {
    textDecorationLine: 'underline'
  }
});
