import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  ActivityIndicator,
  Button,
  Switch,
  TextInput,
} from 'react-native';
import pokemonList from './src/db/pokemonList';

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
  search:{
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
});

const capitalize = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const App = () => {
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
  }

  const handleSearch = () => {
    setLoading(true);
    setTimeout(searchPokemons, 3000);
  }

  useEffect(() => {
    setPokemons(pokemonList);
  }, [])

  return (
    <View style={[styles.mainContainer, {alignItems: 'center'}]}>
      <Image source={require('./src/img/logo.png')} />
      <View style={{ alignItems: 'center', flexDirection: 'row', marginVertical: 15}}>
        <Text style={{marginRight: 5}}>Desactivar Búsqueda</Text>
        <Switch onValueChange={_ => setDisabled((prev: boolean) => !prev)} value={disabled}></Switch>
      </View>
      <View style={styles.search}>
        <TextInput
          onChangeText={(newText: string) => setSearch(newText)}
          onSubmitEditing={handleSearch}
          value={search}
          editable={!disabled}
          style={[styles.input, (disabled || loading) && { backgroundColor: 'gray' }]}
          placeholder="Ingresa el nombre del pokemon"
        />
        {loading ? <ActivityIndicator/> : <Button disabled={disabled} style={styles.button} title="Buscar" onPress={handleSearch} />}
      </View>

      {pokemons.length ? (
        <ScrollView style={{width: '100%'}}>
          {pokemons.map(
            (pokemon: {url: string; name: string}, index: number) => (
              <View key={index} style={styles.pokemon}>
                <Image style={styles.pokemonImg} source={{uri: pokemon.url}} />
                <Text style={styles.pokemonText}>
                  {capitalize(pokemon.name)}
                </Text>
              </View>
            ),
          )}
        </ScrollView>
      ) : (
        <View>
          <Text>No se pudo encontrar ningún Pokemon con el nombre</Text>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 20,
            }}>{`"${search}"`}</Text>
        </View>
      )}
    </View>
  );
};

export default App;
