import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  BackHandler,
  Alert,
} from 'react-native';

export default function HomePage({navigation}) {
  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to exit?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <TouchableOpacity onPress={() => navigation.navigate('BookTicket')}>
          <Text style={styles.textSign}>Book Ticket</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.button}>
        <TouchableOpacity onPress={() => navigation.navigate('TicketHistory')}>
          <Text style={styles.textSign}>Ticket History</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.button}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.textSign}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e7e6e1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#314e52',
    marginTop: 50,
    width: 160,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
  },
  textSign: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
