import React, {useState, useEffect, useReducer, useRef} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  ActivityIndicator,
  Button,
  Switch,
  TextInput,
  Animated,
  Easing,
  TouchableOpacity,
} from 'react-native';
import PokemonList from '../../components/PokemonList/PokemonList';
import pokemonList from '../../db/pokemonList.js';
import styles from './HomeStyles';
import PokemonWebView from '../../components/PokemonWebView/PokemonWebView';

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
  const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
  const animatedValue = useRef(new Animated.Value(0)).current;

  const animate = () => {
    animatedValue.setValue(0);
    Animated.timing(animatedValue, {
      toValue: 2,
      duration: 2500,
      easing: Easing.elastic(1),
      useNativeDriver: true,
    }).start();
  };

  const animatedStyles = [
    {
      transform: [
        {
          rotateY: animatedValue.interpolate({
            inputRange: [0, 1, 2],
            outputRange: ['0deg', '360deg', '720deg'],
          }),
        },
        {perspective: 1000},
      ],
    },
  ];

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

  const handleSwitch = () => {
    setDisabled((prev: boolean) => !prev);
    animate();
  };

  useEffect(() => {
    setPokemons(pokemonList);
  }, []);

  return (
    <SafeAreaView
      style={[styles.mainContainer, {zIndex: 1, alignItems: 'center'}]}>
      {state.showImage && (
        <PokemonWebView
          show={state.showImage}
          imageUrl={state.imageUrl}
          handlePress={dispatch}
        />
      )}
      <AnimatedTouchable style={animatedStyles} onPress={() => animate()}>
        <Image source={require('../../img/logo.png')} />
      </AnimatedTouchable>
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          marginTop: 15,
        }}>
        <Text style={{marginRight: 5}}>Desactivar Búsqueda</Text>
        <Switch onValueChange={handleSwitch} value={disabled}></Switch>
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
            title="Buscar"
            onPress={handleSearch}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Home;
