import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

interface TableProps {
  items: TableItem[];
}

export type TableItem = {
  title: string;
  value?: string;
};

export function Table({ items }: Readonly<TableProps>) {
  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={[styles.cell, styles.cellTitle]}>{item.title}</Text>
            <Text style={[styles.cell]}>{item.value}</Text>
          </View>
        )}
        keyExtractor={(_item, ind) => `${ind}`}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: '#fff'
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
