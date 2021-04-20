import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {login} from '../firebase/fire';

var users = [
  {email: 'kv77724@gmail.com', password: '123456'},
  {email: 'deepakvermillion191@gmail.com', password: '123456'},
  {email: 'sumit23181998gmail.com', password: '123456'},
];

export default function LogIn({navigation}) {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [authToken, setAuthToken] = useState(null);
  const [emailErr, setEmailErr] = useState('');
  const [loginErr, setLoginErr] = useState('');

  console.log('EMail', email);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@token');
      if (value !== null) {
        // value previously stored
        setAuthToken(value);
        console.log('Token from async', value);
      }
    } catch (e) {
      // error reading value
    }
  };

  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    console.log('Email', re.test(String(email).toLowerCase()));
    if (!re.test(String(email).toLowerCase())) {
      setEmailErr('Invalid Email');
    } else {
      setEmailErr('');
    }
    return re.test(String(email).toLowerCase());
  }

  const onSubmit = async () => {
    console.log('In onsubmit' + email + ' ' + pwd);
    try {
      login(email, pwd);
      await getData();
      if (authToken !== null) {
        navigation.navigate('HomePage');
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome back!</Text>
        </View>

        <View style={styles.footer}>
          {loginErr === '' ? (
            <View style={{margin: 5}}>
              <Text style={{color: 'red', fontSize: 14}}>{loginErr}</Text>
            </View>
          ) : null}
          <Text style={styles.field_name}>Email</Text>
          <TextInput
            placeholder="Your Email"
            placeholderTextColor="#666666"
            style={styles.text_input}
            value={email}
            onChangeText={value => {
              setEmail(value);
              validateEmail(email);
            }}
            onSubmitEditing={() => validateEmail()}
          />
          {setEmailErr !== '' ? (
            <Text style={{color: 'red', marginVertical: 2}}>{emailErr}</Text>
          ) : null}

          <Text style={[styles.field_name, {paddingTop: 20}]}>Password</Text>
          <TextInput
            minLength={6}
            maxLength={20}
            placeholder="Your Password"
            placeholderTextColor="#666666"
            style={styles.text_input}
            onChangeText={value => {
              setPwd(value);
              console.log(value);
            }}
            secureTextEntry
            // onSubmitEditing={() => validateEmail()}
          />

          <View style={styles.button}>
            <TouchableOpacity onPress={onSubmit}>
              <Text style={styles.textSign}>Login</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity>
            <Text style={styles.forgot_password}>Forgot Password?</Text>
          </TouchableOpacity>

          <View style={styles.new_user}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('SignUp');
              }}>
              <Text style={styles.forgot_password}>New User? Sign Up Here</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e7e6e1',
  },
  header: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  footer: {
    flex: 3,
    backgroundColor: '#f7f6e7',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  title: {
    color: '#314e52',
    fontSize: 30,
    fontWeight: 'bold',
  },
  field_name: {
    color: '#314e52',
    fontSize: 18,
  },
  text_input: {
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    color: '#05375a',
    borderBottomWidth: 1,
    borderBottomColor: '#314e52',
  },
  button: {
    backgroundColor: '#314e52',
    marginTop: 30,
    width: 130,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row',
  },
  textSign: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  forgot_password: {
    marginTop: 10,
    color: '#666666',
    fontSize: 16,
    marginLeft: 5,
  },
  new_user: {
    flex: 1,
    marginTop: 60,
    alignItems: 'center',
  },
});
