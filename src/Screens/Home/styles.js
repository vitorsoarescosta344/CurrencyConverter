import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('screen');

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },

  containerTop: {
    width: width,
    paddingBottom: 15,
  },
  inputRow: {
    width: width,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containerInput: {
    width: width * 0.4,
    height: 40,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
  },
  textInput: {
    width: '100%',
    height: '100%',
  },
  containerPicker: {
    width: width * 0.4,
    height: 40,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
  },
});
