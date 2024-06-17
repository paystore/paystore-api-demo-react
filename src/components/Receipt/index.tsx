import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

interface ReceiptProps {
  item?: string;
}

export function Receipt({ item }: ReceiptProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.body}>{item}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFED9',
    paddingHorizontal: 5,
    paddingVertical: 16,
    alignItems: 'center'
  },
  body: {
    fontSize: 12,
    fontFamily: 'monospace'
  }
});
