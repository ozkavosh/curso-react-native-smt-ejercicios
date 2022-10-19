import { View, Text, Image, StyleSheet } from 'react-native'
import { capitalize } from '../../utils/capitalizeString';
import React from 'react'

const styles = StyleSheet.create({
    pokemon: {
        width: '100%',
        height: 'auto',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
      },
      pokemonImg: {
        width: 75,
        height: 75,
        padding: 25,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: 'black',
        backgroundColor: 'yellow',
      },
      pokemonText: {
        marginLeft: 20,
        fontWeight: 'bold',
        color: 'black',
      },
})

const PokemonListItem = ({pokemon}) => (
    <View style={styles.pokemon}>
      <Image style={styles.pokemonImg} source={{uri: pokemon.url}} />
      <Text style={styles.pokemonText}>{capitalize(pokemon.name)}</Text>
    </View>
);

export default PokemonListItem