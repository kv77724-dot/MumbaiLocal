import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList
} from 'react-native';
import {Icon, CheckBox} from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';

export default function BookTicket() {
  const data = [
    {id:'101211',timestamp: '01/12/2020 6:30', from: 'Borivali', to: 'Nalasopara', type: 'Return', adult: '1', child:'0',class:'Second', cardid: '3257 1280 3454', fare: '30'},
    {id:'101212',timestamp: '01/13/2020 12:30', from: 'Andheri', to: 'churchgate', type: 'Return', adult: '2', child:'0', class:'Second', cardid: '1257 5647 3458', fare: '20'},
    {id:'101213',timestamp: '01/13/2020 1:52', from: 'Sion', to: 'CSMT', type: 'Return', adult: '3', child:'1', class:'Second', cardid: '8257 1280 3452', fare: '10'},
    {id:'101214',timestamp: '01/14/2020 4:39', from: 'Borivali', to: 'Malad', type: 'Return', adult: '1', child:'0', class:'Second', cardid: '3257 1280 3454', fare: '30'},
    {id:'101215',timestamp: '01/12/2020 6:30', from: 'Borivali', to: 'Nalasopara', type: 'Return', adult: '1', child:'0', class:'Second', cardid: '3257 1280 3454', fare: '30'}
  ]
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={{flexDirection: 'row',padding:10,justifyContent:'space-between',alignSelf:'stretch'}}>
        <Text>Ticket id: {item.id}</Text>
        <Text>Date: {item.timestamp}</Text>
      </View>

      <View style={{flexDirection: 'row',padding:5}}>
        <Text style={{fontSize:26,fontWeight: 'bold'}}>{item.from}</Text>
        <Icon name="swap-horiz" style={{ paddingHorizontal: 10 }} size={40} />
        <Text style={{fontSize:26,fontWeight: 'bold'}}>{item.to}</Text>
      </View>

      <View style={{flexDirection: 'row',padding:10,justifyContent:'space-evenly',alignSelf:'stretch'}}>
          <Text>{item.type}</Text>
          <Text>Adult: {item.adult}</Text>
          <Text>Child: {item.child}</Text>
          <Text>Class: {item.class}</Text>
      </View>

      <View style={{flexDirection: 'row',padding:10,justifyContent:'space-between',alignSelf:'stretch'}}>
        <Text style={{paddingVertical:8}}>Adhar/PAN No: {item.cardid}</Text>
        <Text style={{fontSize:22,fontWeight:'bold'}}>Fare: Rs. {item.fare}/-</Text>
      </View>
    </View>
  );
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    </View>
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
