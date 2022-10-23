import React, {useState, useEffect} from 'react';
import {
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
import styles from './HomeStyles';

const Home = () => {
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState('');
  const [currentSearch, setCurrentSearch] = useState('');
  const [pokemons, setPokemons] = useState([]);

  const searchPokemons = () => {
    setCurrentSearch(searchInputValue);
    if (searchInputValue) {
      setPokemons(
        pokemonList.filter(pokemon =>
          pokemon.name.includes(searchInputValue.toLowerCase()),
        ),
      );
    } else {
      setPokemons(pokemonList);
    }
    setLoading(false);
  };

  const handleSearch = () => {
    setLoading(true);
    if(searchInputValue){
      setTimeout(searchPokemons, 3000);
    }else{
      searchPokemons();
    }
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
          marginTop: 15,
        }}>
        <Text style={{marginRight: 5}}>Desactivar Búsqueda</Text>
        <Switch
          onValueChange={_ => setDisabled((prev: boolean) => !prev)}
          value={disabled}></Switch>
      </View>

      <PokemonList loading={loading} pokemons={pokemons} search={currentSearch} handleSearch={handleSearch}/>

      <View style={styles.search}>
        <TextInput
          onChangeText={(newText: string) => setSearchInputValue(newText)}
          onSubmitEditing={handleSearch}
          value={searchInputValue}
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
    </SafeAreaView>
  );
};

export default Home;
