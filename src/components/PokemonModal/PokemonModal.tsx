import {
  View,
  Text,
  StyleSheet,
  Modal,
  Alert,
  Pressable,
  Linking,
} from 'react-native';
import React, {useCallback} from 'react';

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#2196F3',
  },
  buttonClose: {
    backgroundColor: 'red',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
});

const OpenURLButton = ({url}) => {
  const handlePress = useCallback(async () => {
    await Linking.openURL(url);
  }, [url]);

  return (
    <Pressable
      style={[styles.button, styles.buttonOpen]}
      onPress={handlePress}>
      <Text style={styles.textStyle}>Abrir Imagen</Text>
    </Pressable>
  );
};

const PokemonModal = ({pokemonUrl, showModal, setShowModal}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showModal}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setShowModal(!showModal);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>
            Si aceptas vamos a abrir tu navegador para mostrarte la imagen,
            ¿Estás seguro?
          </Text>
          <View style={styles.buttonContainer}>
            <OpenURLButton url={pokemonUrl}>Ver Imagen</OpenURLButton>
            <Pressable
              style={[styles.button, styles.buttonClose, {marginLeft: 5}]}
              onPress={() => setShowModal(!showModal)}>
              <Text style={styles.textStyle}>Cerrar Modal</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default PokemonModal;
