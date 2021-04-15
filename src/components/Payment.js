import React from 'react'
import { StyleSheet, Text, View, ScrollView, Dimensions, TouchableOpacity } from 'react-native'

export default function Payment({route}) {
    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.card}>
                    <View style={styles.card_heading}>
                        <Text style={styles.title}>Ticket Summary</Text>
                    </View>
                    <View style={styles.row}>
                        <View >
                            <Text style={styles.label}>Soure Station</Text>
                            <Text style={styles.field_value}>{route.params.source}</Text>
                        </View>
                        <View>
                            <Text style={styles.label}>Destination Station</Text>
                            <Text style={styles.field_value}>{route.params.destination}</Text>
                        </View>
                    </View>

                    <View
                        style={{
                            borderBottomColor: '#e3e3e3',
                            borderBottomWidth: 1,
                            marginHorizontal:10,
                            alignSelf: 'stretch', 
                        }}
                    />

                    <View style={styles.row}>
                        <View style={{flexDirection: 'row'}} >
                            <Text style={styles.label}>Adult: </Text>
                            <Text style={styles.field_value}>{route.params.adult}   </Text>
                            <Text style={styles.label}>Child: </Text>
                            <Text style={styles.field_value}>{route.params.child}</Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.label}>Class Type: </Text>
                            <Text style={styles.field_value}>{route.params.classtype}</Text>
                        </View>
                    </View>
                    
                    <View
                        style={{
                            borderBottomColor: '#e3e3e3',
                            borderBottomWidth: 1,
                            marginHorizontal:10,
                            alignSelf: 'stretch', 
                        }}
                    />
                    
                    <View style={styles.row}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.label}>Ticket Type: </Text>
                            <Text style={styles.field_value}>{route.params.tickettype}</Text>
                        </View>
                    </View>

                    <View style={styles.row}>
                        <View style={{flexDirection: 'row'}}>
                            <Text>{route.params.ticketform}</Text>
                        </View>
                    </View>

                    <View style={{backgroundColor: '#e3e3e3', alignSelf: 'stretch', marginHorizontal:20,marginVertical:20}}>
                        <Text style={{alignSelf:'center',marginVertical:5}}>Total Fare:</Text>
                        <Text style={{fontSize:18,alignSelf:'center',color:'red', marginBottom:5,fontWeight:'bold'}}>Rs. {route.params.fare}.00/-</Text>
                    </View>

                    <View style={styles.button}>
                        <TouchableOpacity>
                            <Text style={styles.textSign}>BOOK TICKET</Text>
                        </TouchableOpacity>
                    </View>
                    
                </View>
            </View>
        </ScrollView>  
    )
}
let ScreenHeight = Dimensions.get("window").height;
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
    title: {
        color: 'white',
        fontSize: 26,
        fontWeight: 'bold',
    },
    card_heading: {
        padding: 5,
        borderRadius: 5,
        backgroundColor: '#314e52',
        alignSelf: 'stretch',
    },
    label: {
        color:'#ff8303',
        marginBottom:5
    },
    field_value: {
        textTransform:'uppercase'
    },
    row: {
        flexDirection: 'row',
        justifyContent:'space-between', 
        alignSelf: 'stretch', 
        paddingHorizontal:20, 
        marginVertical:10
    },
    button: {
        backgroundColor: '#314e52',
        marginVertical: 10,
        width: 160,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        flexDirection: 'row',
    },
    textSign: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    }
})
