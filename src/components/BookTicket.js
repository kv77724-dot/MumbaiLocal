import React, {useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Alert
} from 'react-native';
import { Icon, CheckBox } from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';
import {listOfAllStn, listOfWRStn, listOfCRStn, stnDistance} from './constant';


export default function BookTicket({navigation}) {
    const listofallstn = listOfAllStn;
    const listofwestn = listOfWRStn;
    const listofcrstn = listOfCRStn;

    const [goToList, setGoToList] = useState([])
    const [flag, setFlag] = useState(true)
    const [flag1, setFlag1] = useState(false)
    const [show, setShow] = useState(false)
    const [paperlessChecked, setpaperlessChecked] = useState(true)
    const [paperChecked, setpaperChecked] = useState(false)
    const [withIdChecked, setwithIdChecked] = useState(false)

    const [deptFrom, setdeptFrom] = useState(null) 
    const [goTo, setgoTo] = useState(null)
    const [noOfAdult, setnoOfAdult] = useState('1')
    const [noOfChild, setnoOfChild] = useState('0')
    const [ticketType, setticketType] = useState('journey')
    const [classType, setclassType] = useState('second')
    const [paymentType, setpaymentType] = useState('gpay')
    const [ticketForm, setticketForm] = useState('Book & Travel (Paperless)')
    

    let createGoToList = (value) =>{
        setdeptFrom(value.label);
        if(listofwestn.some(station => station.label === value.label)){
            setGoToList(listofwestn); 
            setFlag(false);
        }else{
            setGoToList(listofcrstn);
            setFlag(false);
        }
    };

    let checkSimilarStn = (value) => {
        setgoTo(value)
    }

    let onPressNext = ()=>{
        if(deptFrom === goTo){
            Alert.alert(
                "Alert!",
                "Source and Destination can not be same",
                [
                  { text: "OK"}
                ]
              );
        }else if(deptFrom === null || goTo === null){
            Alert.alert(
                "Alert!",
                "Please select both Source and Destination",
                [
                  { text: "OK"}
                ]
              );
        }else{
            setShow(true);
            setFlag(true);
            setFlag1(true);
        }
    }

    let onPressGetFare = () => {
        
        let distance = Math.abs(stnDistance[deptFrom] - stnDistance[goTo])
        let fare = 0;

        if(distance<=8)
            fare = 5
        else if(distance>8 && distance<=28)
            fare = 10
        else if(distance>28 && distance<=52)
            fare = 15;
        else if(distance>52 && distance<=74)
            fare = 20;
        else if(distance>74 && distance<=80)
            fare = 25;
        else
            fare = 30;

        if(ticketType === 'return'){
            fare = fare*2;
        }
        
        let totalFare = fare*parseInt(noOfAdult) + Math.round(fare/2)*parseInt(noOfChild);
        
        let data = {source: deptFrom, destination: goTo, adult: noOfAdult, child: noOfChild,
            classtype: classType, tickettype: ticketType, ticketform: ticketForm, fare: totalFare}
        navigation.navigate('Payment',data)
    }
    

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.card}>
                    <View style={styles.card_heading}>
                        <Text style={styles.title}>Book Your Ticket</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignSelf: 'stretch', padding: 5, marginTop: 10 }}>
                        <DropDownPicker
                            items={listofallstn}
                            containerStyle={{ height: 45, flex: 1 }}
                            style={{
                                backgroundColor: '#f7f6e7',
                                borderWidth: 1,
                                borderColor: '#314e52',
                            }}
                            disabled = {flag1}
                            placeholder="Depart from"
                            placeholderStyle={{ fontSize: 18 }}
                            searchable
                            onChangeItem={item => createGoToList(item)}
                        />

                        <Icon name="swap-horiz" style={{ paddingHorizontal: 10 }} size={40} />
                        <DropDownPicker
                            items={goToList}
                            containerStyle={{ height: 45, flex: 1 }}
                            style={{
                                backgroundColor: '#f7f6e7',
                                borderWidth: 1,
                                borderColor: '#314e52',
                            }}
                            placeholder="Going to"
                            disabled = {flag}
                            //defaultValue={reset}
                            placeholderStyle={{ fontSize: 18 }}
                            searchable
                            onChangeItem={item => checkSimilarStn(item.value)}
                        />
                    </View>
                    
                    {show === false && <View style={[styles.button,{marginBottom:80,marginTop:50}]}>
                        <TouchableOpacity onPress={onPressNext}>
                            <Text style={styles.textSign}>NEXT</Text>
                        </TouchableOpacity>
                    </View>}
                    {show && <View style={{flex:1,alignItems:"center",alignSelf: 'stretch'}}>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignSelf: 'stretch',
                                padding: 5,
                                marginTop: 20,
                            }}>
                            <View style={{ flex: 1, paddingRight: 5 }}>
                                <Text style={styles.field_name}>Adult</Text>
                                <DropDownPicker
                                    items={[
                                        { label: 'One (1)', value: '1' },
                                        { label: 'Two (2)', value: '2' },
                                        { label: 'Three (3)', value: '3' },
                                        { label: 'Four (4)', value: '4' },
                                    ]}
                                    containerStyle={{ height: 30 }}
                                    defaultValue='1'
                                    onChangeItem={(item)=>setnoOfAdult(item.value)}
                                />
                            </View>

                            <View style={{ flex: 1, paddingLeft: 5 }}>
                                <Text style={styles.field_name}>Child</Text>
                                <DropDownPicker
                                    items={[
                                        { label: 'Zero (0)', value: '0' },
                                        { label: 'One (1)', value: '1' },
                                        { label: 'Two (2)', value: '2' },
                                        { label: 'Three (3)', value: '3' },
                                        { label: 'Four (4)', value: '4' },
                                    ]}
                                    containerStyle={{ height: 30 }}
                                    defaultValue="0"
                                    onChangeItem={(item)=>setnoOfChild(item.value)}
                                />
                            </View>
                        </View>

                        <View
                            style={{
                                flexDirection: 'row',
                                alignSelf: 'stretch',
                                padding: 5,
                                marginTop: 10,
                            }}>
                            <View style={{ flex: 1, paddingRight: 5 }}>
                                <Text style={styles.field_name}>Ticket Type</Text>
                                <DropDownPicker
                                    items={[
                                        { label: 'Journey', value: 'journey' },
                                        { label: 'Return', value: 'return' },
                                    ]}
                                    containerStyle={{ height: 30 }}
                                    defaultValue="journey"
                                    onChangeItem={(item)=>setticketType(item.value)}
                                />
                            </View>

                            <View style={{ flex: 1, paddingRight: 5 }}>
                                <Text style={styles.field_name}>Class</Text>
                                <DropDownPicker
                                    items={[
                                        { label: 'First', value: 'first' },
                                        { label: 'Second', value: 'second' },
                                    ]}
                                    containerStyle={{ height: 30 }}
                                    defaultValue="second"
                                    onChangeItem={(item)=>setclassType(item.value)}
                                />
                            </View>
                        </View>

                        <View
                            style={{
                                flexDirection: 'row',
                                alignSelf: 'stretch',
                                padding: 5,
                                marginTop: 10,
                            }}>

                            <View style={{ flex: 1, paddingLeft: 5 }}>
                                <Text style={styles.field_name}>Payment Type</Text>
                                <DropDownPicker
                                    items={[
                                        { label: 'Google Pay', value: 'gpay' },
                                        { label: 'Other UPI/ Net Banking/ Debit Card', value: 'other' },
                                    ]}
                                    containerStyle={{ height: 30 }}
                                    defaultValue="gpay"
                                    onChangeItem={(item)=>setpaymentType(item.value)}
                                />
                            </View>
                            <View style={{ flex: 1, paddingLeft: 5 }}></View>
                        </View>

                        <View style={{ flexDirection: 'row', padding: 5, marginTop: 10 }}>
                            <CheckBox
                                title="Book & Travel (Paperless)"
                                checkedIcon="dot-circle-o"
                                uncheckedIcon="circle-o"
                                containerStyle={{ backgroundColor: '#f7f6e7', flex: 1 }}
                                checked={paperlessChecked}
                                onPress={()=>{
                                    setpaperlessChecked(true)
                                    setpaperChecked(false)
                                    setwithIdChecked(false)
                                    setticketForm('Book & Travel (Paperless)')
                                }}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', padding: 5 }}>
                            <CheckBox
                                title="Book & Print (Paper)"
                                checkedIcon="dot-circle-o"
                                uncheckedIcon="circle-o"
                                containerStyle={{ backgroundColor: '#f7f6e7', flex: 1 }}
                                checked={paperChecked}
                                onPress={()=>{
                                    setpaperlessChecked(false)
                                    setpaperChecked(true)
                                    setwithIdChecked(false)
                                    setticketForm('Book & Print (Paper)')
                                }}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', padding: 5 }}>
                            <CheckBox
                                title="Book with ID (Paperless)"
                                checkedIcon="dot-circle-o"
                                uncheckedIcon="circle-o"
                                containerStyle={{ backgroundColor: '#f7f6e7', flex: 1 }}
                                checked={withIdChecked}
                                onPress={()=>{
                                    setpaperlessChecked(false)
                                    setpaperChecked(false)
                                    setwithIdChecked(true)
                                    setticketForm('Book with ID (Paperless)')
                                }}
                            />
                        </View>
                        <View style={styles.button}>
                            <TouchableOpacity onPress={onPressGetFare}>
                                <Text style={styles.textSign}>GET FARE</Text>
                            </TouchableOpacity>
                        </View>
                    </View>}
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flex: 1,
        backgroundColor: '#e7e6e1',
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        margin: 5,
        flex: 1,
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
    text_input: {
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        color: '#05375a',
        fontSize: 18,
        borderBottomWidth: 1,
        borderBottomColor: '#314e52',
        flex: 1,
    },
    field_name: {
        color: '#314e52',
        fontSize: 16,
        marginBottom:5
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
    },
});
