import { StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ef235f',
    padding: 40
  },
  box: {
    backgroundColor: 'yellow',
    width: 30,
    height: 30,
    position: 'absolute',
    top: 20,
    left: 30,
    borderRadius: 30
  },
  text:{
    color: 'white',
    fontSize: 34,
    fontWeight: 'bold'
  }
});
