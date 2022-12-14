import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity
} from 'react-native';
import {capitalize} from '../../utils/capitalizeString';
import React, {useState, memo} from 'react';
import PokemonModal from '../PokemonModal/PokemonModal';

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
    boxSizing: 'border-box',
    padding: 15,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'red',
    backgroundColor: 'yellow',
  },
  pokemonText: {
    marginLeft: 17,
    fontWeight: 'bold',
    fontSize: 17,
    color: 'black',
  },
});

const PokemonListItem = ({pokemon, dispatch}) => {
  const [showModal, setShowModal] = useState(false);

  const handleButtonPress = () => {
    setShowModal(true);
  };

  return (
    <View style={styles.pokemon}>
      <TouchableOpacity
        onPress={() => 
           dispatch({ type: 'SHOW_POKEMON', payload: pokemon.url })
        }>
        <Image style={styles.pokemonImg} source={{uri: pokemon.url}} />
      </TouchableOpacity>
      <Text style={styles.pokemonText}>{capitalize(pokemon.name)}</Text>
      <View style={{marginLeft: 'auto'}}>
        <Button title="VER IMAGEN" onPress={handleButtonPress} />
      </View>
      {showModal && (
        <PokemonModal
          pokemonUrl={pokemon.url}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
    </View>
  );
};

export default memo(PokemonListItem);
