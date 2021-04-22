import React, { useState } from 'react'
import { StyleSheet, Text, View, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import {resetpass} from '../firebase/fire';

export default function ForgetPass() {
    const [email, setEmail] = useState('');
    const onSubmit = async()=>{
        try{
            await resetpass(email);
        }catch(e){
            console.log(e)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <View style={{ padding: 20, alignItems: 'stretch' }}>
                    <Text style={styles.field_name}>Email</Text>
                    <TextInput
                        placeholder="Your Email"
                        placeholderTextColor="#666666"
                        style={styles.text_input}
                        value={email}
                        onChangeText={value => {
                            setEmail(value);
                        }}
                    />
                </View>
                <View style={styles.button}>
                    <TouchableOpacity
                        onPress={onSubmit}>
                        <Text style={styles.textSign}>Send Reset Email</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

let ScreenHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e7e6e1',
        height: ScreenHeight,
    },
    card: {
        margin: 10,
        backgroundColor: '#f7f6e7',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'grey',
        alignItems: 'stretch'
    },
    text_input: {
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        color: '#05375a',
        borderBottomWidth: 1,
        borderBottomColor: '#314e52',
    },
    field_name: {
        color: '#314e52',
        fontSize: 18,
        paddingBottom: 5
    },
    button: {
        backgroundColor: '#314e52',
        marginTop: 5,
        marginBottom: 20,
        width: 200,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 50,
        flexDirection: 'row',
      },
      textSign: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
      },
})
