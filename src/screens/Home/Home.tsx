import React, {useState, useEffect, useReducer} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  ActivityIndicator,
  Button,
  Switch,
  TextInput,
  Pressable,
  Modal,
} from 'react-native';
import PokemonList from '../../components/PokemonList/PokemonList';
import pokemonList from '../../db/pokemonList.js';
import {WebView} from 'react-native-webview';
import styles from './HomeStyles';

const Home = () => {
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState('');
  const [currentSearch, setCurrentSearch] = useState('');
  const [pokemons, setPokemons] = useState([]);
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'HIDE_POKEMON':
          return {
            showImage: false,
            imageUrl: '',
          };
        case 'SHOW_POKEMON':
          return {
            showImage: true,
            imageUrl: action.payload,
          };
        default:
          return state;
      }
    },
    {showImage: false, imageUrl: ''},
  );

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
    if (searchInputValue) {
      setTimeout(searchPokemons, 3000);
    } else {
      searchPokemons();
    }
  };

  useEffect(() => {
    setPokemons(pokemonList);
  }, []);

  return (
    <SafeAreaView
      style={[styles.mainContainer, {zIndex: 1, alignItems: 'center'}]}>
      {state.showImage && (
        <Modal
          visible={state.showImage}
          transparent={true}
          animationType="slide"
          onRequestClose={() => {
            dispatch({type: 'HIDE_POKEMON'});
          }}>
          <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', alignItems: 'center'}}>
            <Pressable onPress={() => dispatch({type: 'HIDE_POKEMON'})}>
              <Text style={{color: 'white', fontSize: 30, marginBottom: '45%'}}>
                X
              </Text>
            </Pressable>
            <WebView
              containerStyle={{width: 300, height: 300, flex: 0}}
              source={{
                uri: state.imageUrl,
              }}
            />
          </View>
        </Modal>
      )}
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

      <PokemonList
        dispatch={dispatch}
        loading={loading}
        pokemons={pokemons}
        search={currentSearch}
        handleSearch={handleSearch}
      />

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
