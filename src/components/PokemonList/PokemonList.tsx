import {FlatList, RefreshControl} from 'react-native';
import React from 'react';
import PokemonListItem from '../PokemonListItem/PokemonListItem';
import PokemonListEmpty from '../PokemonListEmpty/PokemonListEmpty';

const PokemonList = ({pokemons, loading, search, handleSearch}) => {
  return (
    <FlatList
      style={{width: '100%'}}
      data={pokemons}
      maxToRenderPerBatch={5}
      initialNumToRender={5}
      keyExtractor={item => item.name}
      renderItem={({item}) => <PokemonListItem pokemon={item}/>}
      refreshControl = { <RefreshControl onRefresh={handleSearch} refreshing={loading} /> }
      extraData={pokemons}
      ListEmptyComponent={<PokemonListEmpty search={search} />}
    />
  );
};

export default PokemonList;
