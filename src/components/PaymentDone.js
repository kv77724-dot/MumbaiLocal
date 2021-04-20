import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

export default function PaymentDone({navigation}) {
    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <View style={styles.row}>
                    <Text style={styles.title}>Payment Successful!</Text>
                </View>
                <View style={styles.row}>
                    <Icon name="check-circle" color='green' size={100} />
                </View>
                <View style={styles.row}>
                    <Text>* To view the ticket visit Ticket History page or click below.</Text>
                </View>
                <View>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('TicketHistory');
                        }}>
                        <Text style={[styles.click,{marginBottom: 30}]}>Click Here</Text>
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
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'grey',
      },
      row: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'stretch',
        paddingHorizontal: 10,
        marginVertical: 10,
      },
      title: {
        color: '#314e52',
        fontSize: 26,
        fontWeight: 'bold',
      },
      click: {
        color: 'red',
        fontSize: 16,
        textDecorationLine: 'underline'
      },
})
