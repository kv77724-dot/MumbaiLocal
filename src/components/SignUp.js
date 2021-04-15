import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

export default function SignUp({navigation}) {
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
            />
          </View>
          <View style={[styles.row_item, {marginLeft: 10}]}>
            <Text style={styles.field_name}>Last Name</Text>
            <TextInput
              placeholder="Last Name"
              placeholderTextColor="#666666"
              style={styles.text_input}
            />
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.row_item}>
            <Text style={styles.field_name}>Email</Text>
            <TextInput
              placeholder="Your Email"
              placeholderTextColor="#666666"
              style={styles.text_input}
            />
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.row_item}>
            <Text style={styles.field_name}>Choose Id Card:</Text>
          </View>
          <View style={styles.row_item}>
            <DropDownPicker
              items={[
                {label: 'Adhar Card', value: 'adhar'},
                {label: 'Pan Card', value: 'pan'},
              ]}
              containerStyle={{height: 30}}
            />
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.row_item}>
            <Text style={styles.field_name}>Id Card Number</Text>
            <TextInput
              placeholder="Enter Id card Number"
              placeholderTextColor="#666666"
              style={styles.text_input}
            />
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.row_item}>
            <Text style={styles.field_name}>Password</Text>
            <TextInput
              placeholder="Enter your password"
              placeholderTextColor="#666666"
              style={styles.text_input}
            />
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.row_item}>
            <Text style={styles.field_name}>Confirm Password</Text>
            <TextInput
              placeholder="Re-enter password"
              placeholderTextColor="#666666"
              style={styles.text_input}
            />
          </View>
        </View>
        <View style={styles.button}>
          <TouchableOpacity>
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
