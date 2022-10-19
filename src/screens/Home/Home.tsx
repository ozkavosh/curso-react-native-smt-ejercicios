import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Image,
  ActivityIndicator,
  Button,
  Switch,
  TextInput,
} from 'react-native';
import PokemonList from '../../components/PokemonList/PokemonList';
import pokemonList from '../../db/pokemonList.js';

const styles = StyleSheet.create({
  mainContainer: {
    margin: 10,
    flex: 1,
  },
  container: {
    flexDirection: 'row',
    marginBottom: 10,
    height: 75,
  },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 45,
  },
  input: {
    height: 40,
    flexGrow: 2,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    flexGrow: 1,
  },
  
});

const Home = () => {
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [pokemons, setPokemons] = useState([]);

  const searchPokemons = () => {
    if (search) {
      setPokemons(
        pokemonList.filter(pokemon =>
          pokemon.name.includes(search.toLowerCase()),
        ),
      );
    } else {
      setPokemons(pokemonList);
    }
    setLoading(false);
  };

  const handleSearch = () => {
    setLoading(true);
    setTimeout(searchPokemons, 3000);
  };

  useEffect(() => {
    setPokemons(pokemonList);
  }, []);

  return (
    <SafeAreaView style={[styles.mainContainer, {alignItems: 'center'}]}>
      <Image source={require('../../img/logo.png')} />
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          marginVertical: 15,
        }}>
        <Text style={{marginRight: 5}}>Desactivar Búsqueda</Text>
        <Switch
          onValueChange={_ => setDisabled((prev: boolean) => !prev)}
          value={disabled}></Switch>
      </View>
      <View style={styles.search}>
        <TextInput
          onChangeText={(newText: string) => setSearch(newText)}
          onSubmitEditing={handleSearch}
          value={search}
          editable={!disabled}
          style={[
            styles.input,
            (disabled || loading) && {backgroundColor: 'gray'},
          ]}
          placeholder="Ingresa el nombre del pokemon"
        />
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Button
            disabled={disabled}
            style={styles.button}
            title="Buscar"
            onPress={handleSearch}
          />
        )}
      </View>

      <PokemonList loading={loading} pokemons={pokemons} search={search}/>
    </SafeAreaView>
  );
};

export default Home;
