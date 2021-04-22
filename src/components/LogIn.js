import React, {useEffect, useState} from 'react';
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
  const [email, setEmail] = useState(null);
  const [pwd, setPwd] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [emailErr, setEmailErr] = useState(null);
  const [loginErr, setLoginErr] = useState(null);

  useEffect(() => {
    return () => {
      setEmail(null);
      setPwd(null);
    };
  }, []);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@token');
      if (value !== null) {
        // value previously stored
        setAuthToken(value);
        setEmail(null);
        setPwd(null);
        navigation.navigate('HomePage');
        console.log('Token from async', value);
      }
    } catch (e) {
      // error reading value
    }
  };

  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // console.log('Email', re.test(String(email).toLowerCase()));
    if (!re.test(String(email).toLowerCase())) {
      setEmailErr('Invalid Email');
    } else {
      setEmailErr(null);
    }
    return re.test(String(email).toLowerCase());
  }

  const onSubmit = async () => {
    // console.log('In onsubmit' + email + ' ' + pwd);
    try {
      let errorMessage = await login(email, pwd);
      await getData();
      if (authToken !== null) {
        setLoginErr(null);
        setAuthToken(null);
        // navigation.navigate('HomePage');
      }
      if (errorMessage !== null) {
        setLoginErr(errorMessage);
      }
    } catch (e) {
      console.log(e);
      setLoginErr(e);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome back!</Text>
        </View>

        <View style={styles.footer}>
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
          {emailErr !== null ? (
            <Text style={{color: 'red', marginVertical: 2}}>{emailErr}</Text>
          ) : null}

          <Text style={[styles.field_name, {paddingTop: 20}]}>Password</Text>
          <TextInput
            minLength={6}
            maxLength={20}
            placeholder="Your Password"
            placeholderTextColor="#666666"
            style={styles.text_input}
            value={pwd}
            onChangeText={value => {
              setPwd(value);
            }}
            secureTextEntry
            // onSubmitEditing={() => validateEmail()}
          />
          {pwd?.length < 6 ? (
            <Text style={{color: 'red', marginVertical: 2}}>
              Password Should be Minimum of 6 characters.
            </Text>
          ) : null}

          {loginErr === null ? null : (
            <View
              style={{
                margin: 5,
                justifyContent: 'center',
                // alignItems: 'center',
              }}>
              <Text style={{color: 'red', fontSize: 14}}>
                {loginErr.toUpperCase()}
              </Text>
            </View>
          )}

          <View style={styles.button}>
            <TouchableOpacity
              onPress={() => {
                pwd?.length > 5 && emailErr === null && email !== null
                  ? onSubmit()
                  : alert('Please Fill All The Details Correctly!');
              }}>
              <Text style={styles.textSign}>Login</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={()=> navigation.navigate('ForgetPass')}>
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
