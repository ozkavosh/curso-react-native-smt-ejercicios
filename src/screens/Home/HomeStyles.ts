import { StyleSheet } from 'react-native';

export default StyleSheet.create({
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
    marginVertical: 10,
  },
  input: {
    height: 40,
    flexGrow: 2,
    marginRight: 20,
    borderWidth: 1,
    padding: 10,
    borderRadius: 75,
  },
  button: {
    flexGrow: 1,
  },
});
