import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {signup} from '../firebase/fire';
const AADHAR_CARD = 'Adhar Card';
const PAN_CARD = 'Pan Card';

export default function SignUp({navigation}) {
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [mobNumber, setMobNumber] = useState(null);
  const [idCard, setIdCard] = useState(null);
  const [idCardErr, setIdCardErr] = useState(null);
  const [idCardNum, setIdCardNum] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confPassword, setConfPassword] = useState(null);
  const [emailErr, setEmailErr] = useState(null);
  const [SignUpErr, setSignUpErr] = useState(null);

  var isValid =
    firstName?.length > 0 &&
    lastName?.length > 0 &&
    mobNumber?.length === 10 &&
    idCardErr === null &&
    emailErr === null &&
    password === confPassword &&
    password?.length > 5;

  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    console.log('Email', re.test(String(email).toLowerCase()));
    if (!re.test(String(email).toLowerCase())) {
      setEmailErr('Invalid Email.');
    } else {
      setEmailErr(null);
    }
    return re.test(String(email).toLowerCase());
  }

  function idValidation(idCardNum) {
    const re = /[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    console.log('Email', idCardNum, re.test(String(idCardNum).toUpperCase()));
    if (idCard !== AADHAR_CARD) {
      if (!re.test(String(idCardNum).toUpperCase())) {
        setIdCardErr('Invalid Pan Card Number.');
      } else {
        setIdCardNum(idCardNum.toUpperCase());
        setIdCardErr(null);
      }
      // return re.test(String(email).toLowerCase());
    }
  }

  // const mobileNumberValidate = mobNumber => {
  //   var val = mobNumber;
  //   // if (/^\d{10}$/.test(val)) {
  //   //   // value is ok, use it
  //   //   console.log('Its 10', val);
  //   //   setErr(null);
  //   // } else {
  //   //   setErr('Invalid number; must be ten digits');
  //   // }

  //   if (mobNumber?.length < 10) {
  //     setMobNumberErr('Invalid Mobile Number.');
  //   }
  // };
  const onSubmit = async () => {
    try {
      let errorMessage = await signup(
        email,
        password,
        firstName,
        lastName,
        mobNumber,
        idCard,
        idCardNum,
      );
      //alert('Registration Successful');
      // if (errorMessage !== null) {
      //   console.log("//////////")
      //   console.log('Error message', errorMessage);
      //   setSignUpErr(errorMessage);
      // }
      navigation.navigate('LogIn');
    } catch (e) {
      console.log(e);
      setSignUpErr(e.code);
    }
  };
  const onPressDebounced = debounce(() => this.onPressed(), 500);
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Create Account</Text>
        </View>

        <View style={styles.footer}>
          <View style={styles.row}>
            <View style={[styles.row_item, {marginRight: 10}]}>
              <Text style={styles.field_name}>First Name</Text>
              <TextInput
                placeholder="First Name"
                placeholderTextColor="#666666"
                style={styles.text_input}
                onChangeText={value => {
                  setFirstName(value);
                }}
              />
              {firstName === '' ? (
                <Text style={{color: 'red', marginVertical: 2}}>
                  Required field
                </Text>
              ) : null}
            </View>
            <View style={[styles.row_item, {marginLeft: 10}]}>
              <Text style={styles.field_name}>Last Name</Text>
              <TextInput
                placeholder="Last Name"
                placeholderTextColor="#666666"
                style={styles.text_input}
                onChangeText={value => {
                  setLastName(value);
                }}
              />
              {lastName === '' ? (
                <Text style={{color: 'red', marginVertical: 2}}>
                  Required field
                </Text>
              ) : null}
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.row_item}>
              <Text style={styles.field_name}>Email</Text>
              <TextInput
                placeholder="Your Email"
                placeholderTextColor="#666666"
                style={styles.text_input}
                onChangeText={value => {
                  setEmail(value);
                  validateEmail(email);
                }}
              />
              {emailErr !== null ? (
                <Text style={{color: 'red', marginVertical: 2}}>
                  Required field. {emailErr}
                </Text>
              ) : null}
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.row_item}>
              <Text style={styles.field_name}>Mobile Number</Text>
              <TextInput
                maxLength={10}
                keyboardType="numeric"
                placeholder="Enter Mobile Number"
                placeholderTextColor="#666666"
                style={styles.text_input}
                value={mobNumber}
                onChangeText={value => {
                  setMobNumber(value.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, ''));
                }}
              />
              {mobNumber?.length < 10 ? (
                <Text style={{color: 'red', marginVertical: 2}}>
                  Invalid Mobile Number.
                </Text>
              ) : null}
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.row_item}>
              <Text style={styles.field_name}>Choose Id Card:</Text>
            </View>
            <View style={styles.row_item}>
              <DropDownPicker
                items={[
                  {label: AADHAR_CARD, value: AADHAR_CARD},
                  {label: PAN_CARD, value: PAN_CARD},
                ]}
                containerStyle={{height: 30}}
                onChangeItem={item => {
                  setIdCard(item.value);
                  console.log('Value', item.value);
                  setIdCardNum(null);
                }}
              />
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.row_item}>
              <Text style={styles.field_name}>Id Card Number</Text>
              <TextInput
                keyboardType={idCard === 'Adhar Card' ? 'numeric' : null}
                placeholder="Enter Id card Number"
                maxLength={idCard === 'Adhar Card' ? 12 : 10}
                placeholderTextColor="#666666"
                style={styles.text_input}
                value={idCardNum}
                onChangeText={value => {
                  console.log('Va;ue', value);
                  var val = value.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, '');
                  setIdCardNum(val);
                  idValidation(value);
                }}
              />
              <View style={{flexDirection: 'row', marginLeft: 5}}>
                {idCardNum === '' ? (
                  <Text style={{color: 'red', marginVertical: 2}}>
                    Required field
                  </Text>
                ) : null}
                {idCardErr !== null ? (
                  <Text style={{color: 'red', marginVertical: 2}}>
                    {idCardErr}
                  </Text>
                ) : null}
              </View>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.row_item}>
              <Text style={styles.field_name}>Password</Text>
              <TextInput
                maxLength={20}
                secureTextEntry={true}
                placeholder="Enter your password"
                placeholderTextColor="#666666"
                style={styles.text_input}
                onChangeText={value => {
                  setPassword(value);
                }}
              />
              {confPassword !== null && confPassword !== password ? (
                <Text style={{color: 'red', marginVertical: 2}}>
                  Password Does not Match.
                </Text>
              ) : null}
              {password?.length < 6 ? (
                <Text style={{color: 'red', marginVertical: 2}}>
                  Password Should be Minimum of 6 characters.
                </Text>
              ) : null}
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.row_item}>
              <Text style={styles.field_name}>Confirm Password</Text>
              <TextInput
                maxLength={20}
                secureTextEntry={true}
                placeholder="Re-enter password"
                placeholderTextColor="#666666"
                style={styles.text_input}
                onChangeText={value => {
                  setConfPassword(value);
                }}
              />
              {confPassword !== password ? (
                <Text style={{color: 'red', marginVertical: 2}}>
                  Password Does not Match.
                </Text>
              ) : null}
            </View>
          </View>
          {SignUpErr === null ? null : (
            <View
              style={{
                margin: 5,
                justifyContent: 'center',
                // alignItems: 'center',
              }}>
              <Text style={{color: 'red', fontSize: 14}}>
                {SignUpErr}
              </Text>
            </View>
          )}
          <View style={styles.button}>
            <TouchableOpacity
              onPress={() => {
                isValid ? onSubmit() : alert('Please Fill All the Details!');
                onPressDebounced();
              }}>
              <Text style={styles.textSign}>Signup</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.new_user}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('LogIn');
              }}>
              <Text style={styles.forgot_password}>
                Already a User? Sign In Here
              </Text>
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
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  footer: {
    flex: 10,
    backgroundColor: '#f7f6e7',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 20,
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
  row: {
    flexDirection: 'row',
    flex: 1,
    paddingBottom: 40,
  },
  row_item: {
    flex: 1,
  },
  button: {
    backgroundColor: '#314e52',
    marginTop: 20,
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
  new_user: {
    flex: 1,
    marginTop: 60,
    alignItems: 'center',
  },
});
