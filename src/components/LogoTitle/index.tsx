import React from 'react';
import { Image, View } from 'react-native';

export function LogoTitle() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center', // Centraliza verticalmente
        alignItems: 'center'
      }}
    >
      <Image
        style={{ height: 30 }}
        source={require('../../assets/phoebus.webp')}
        resizeMode="contain"
      />
    </View>
  );
}
