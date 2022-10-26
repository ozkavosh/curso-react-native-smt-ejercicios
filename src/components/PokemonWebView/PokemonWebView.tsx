import { View, Text, Modal, Pressable } from "react-native";
import { WebView } from "react-native-webview";
import React from "react";

const PokemonWebView = ({ show, imageUrl, handlePress }) => {
  return (
    <Modal
      visible={show}
      transparent={true}
      animationType="slide"
      onRequestClose={() => {
        handlePress({ type: "HIDE_POKEMON" });
      }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.4)",
          alignItems: "center",
        }}
      >
        <Pressable onPress={() => handlePress({ type: "HIDE_POKEMON" })}>
          <Text style={{ color: "white", fontSize: 30, marginBottom: "45%" }}>
            X
          </Text>
        </Pressable>
        <WebView
          containerStyle={{ width: 300, height: 300, flex: 0 }}
          source={{
            uri: imageUrl,
          }}
        />
      </View>
    </Modal>
  );
};

export default PokemonWebView;
