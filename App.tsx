import React from 'react';
import { View, StatusBar } from 'react-native';
import Home from './src/screens/Home/Home';


const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor="red"/>
      <Home/>
    </View>
  );
};

export default App;
