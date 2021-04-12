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
import {listOfAllStn, listOfWRStn, listOfCRStn} from './constant';

export default function BookTicket() {
    const listofallstn = listOfAllStn;
    const listofwestn = listOfWRStn;
    const listofcrstn = listOfCRStn;

    const [goToList, setGoToList] = useState([])
    const [flag, setFlag] = useState(true)
    const [flag1, setFlag1] = useState(false)
    const [show, setShow] = useState(false)
    const [deptFrom, setdeptFrom] = useState() 
    const [goTo, setgoTo] = useState() 

    let createGoToList = (value) =>{
        setdeptFrom(value.label);
        if(listofwestn.some(station => station.label === value.label)){
            setGoToList(listofwestn); 
            setFlag(false);
            // setReset(null);
            //console.log("if wala"+reset)
        }else{
            setGoToList(listofcrstn);
            setFlag(false);
            //setReset(null);
            //console.log("else wala"+reset)
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
        }else{
            setShow(true);
            setFlag(true);
            setFlag1(true);
        }
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
                                        { label: 'One (1)', value: 'one' },
                                        { label: 'Two (2)', value: 'two' },
                                        { label: 'Three (3)', value: 'three' },
                                        { label: 'Four (4)', value: 'four' },
                                    ]}
                                    containerStyle={{ height: 30 }}
                                    defaultValue="one"
                                />
                            </View>

                            <View style={{ flex: 1, paddingLeft: 5 }}>
                                <Text style={styles.field_name}>Child</Text>
                                <DropDownPicker
                                    items={[
                                        { label: 'Zero (0)', value: 'zero' },
                                        { label: 'One (1)', value: 'one' },
                                        { label: 'Two (2)', value: 'two' },
                                        { label: 'Three (3)', value: 'three' },
                                        { label: 'Four (4)', value: 'four' },
                                    ]}
                                    containerStyle={{ height: 30 }}
                                    defaultValue="zero"
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
                            // checked={this.state.checked}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', padding: 5 }}>
                            <CheckBox
                                title="Book & Print (Paper)"
                                checkedIcon="dot-circle-o"
                                uncheckedIcon="circle-o"
                                containerStyle={{ backgroundColor: '#f7f6e7', flex: 1 }}
                            // checked={this.state.checked}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', padding: 5 }}>
                            <CheckBox
                                title="Book with ID (Paperless)"
                                checkedIcon="dot-circle-o"
                                uncheckedIcon="circle-o"
                                containerStyle={{ backgroundColor: '#f7f6e7', flex: 1 }}
                            // checked={this.state.checked}
                            />
                        </View>
                        <View style={styles.button}>
                            <TouchableOpacity>
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
