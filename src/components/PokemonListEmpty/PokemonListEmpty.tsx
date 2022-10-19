import {View, Text} from 'react-native';
import React from 'react';

const PokemonListEmpty = ({search}) => {
  return (
    <View
      style={{
        marginTop: 25,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text>No se pudo encontrar ningún Pokemon con el nombre</Text>
      <Text
        style={{
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: 20,
        }}>{`"${search}"`}</Text>
    </View>
  );
};

export default PokemonListEmpty;
