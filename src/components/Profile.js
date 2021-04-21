import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView
} from 'react-native';
import { Avatar } from "react-native-elements";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getuser} from '../firebase/fire'


export default function SignUp({navigation}) {

  const [user,setUser] = useState(null)

  useEffect(() => {
    
    userInit();
    return () => {
    }
  }, [])

  const userInit = async()=>{
    const value = await AsyncStorage.getItem('@token');
    const ret = await getuser(value);
    console.log(ret)
    setUser(ret);
  }
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Avatar
            rounded
            size='large'
            icon={{name: 'user', type: 'font-awesome'}}
            containerStyle={{backgroundColor:'black',marginTop:20}}
          />
        </View>

        <View style={styles.footer}>
          <View style={styles.row}>
            <View style={[styles.row_item, {marginRight: 10}]}>
              <Text style={styles.field_name}>First Name</Text>
              <TextInput
                defaultValue={user?.firstname}
                style={styles.text_input}
                editable={false}
              />
            </View>
            <View style={[styles.row_item, {marginLeft: 10}]}>
              <Text style={styles.field_name}>Last Name</Text>
              <TextInput
                defaultValue={user?.lastname}
                style={styles.text_input}
                editable={false}
              />
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.row_item}>
              <Text style={styles.field_name}>Email</Text>
              <TextInput
                defaultValue={user?.email}
                style={styles.text_input}
                editable={false}
              />
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.row_item}>
              <Text style={styles.field_name}>Mobile Number</Text>
              <TextInput
                defaultValue={user?.mobilenumber}
                style={styles.text_input}
                editable={false}
              />
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.row_item}>
              <Text style={styles.field_name}>Id Card Type</Text>
              <TextInput
                defaultValue={user?.idcard}
                style={styles.text_input}
                editable={false}
              />
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.row_item}>
              <Text style={styles.field_name}>Id Card Number</Text>
              <TextInput
                defaultValue={user?.idcardnumber}
                style={styles.text_input}
                editable={false}
              />
            </View>
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
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  footer: {
    flex: 10,
    backgroundColor: '#f7f6e7',
    marginTop:20,
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
    fontWeight:'bold',
    paddingBottom: 10,
    paddingLeft:5
    
  },
  text_input: {
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    color: '#05375a',
    fontSize:16,
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
