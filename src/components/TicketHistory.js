import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {Icon} from 'react-native-elements';
import {ticketlist, getuser} from '../firebase/fire';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function BookTicket() {
  // const data = [
  //   {id:'101211',timestamp: '01/12/2020 6:30', from: 'Borivali', to: 'Nalasopara', type: 'Return', adult: '1', child:'0',class:'Second', cardid: '3257 1280 3454', fare: '30'},
  //   {id:'101212',timestamp: '01/13/2020 12:30', from: 'Andheri', to: 'churchgate', type: 'Return', adult: '2', child:'0', class:'Second', cardid: '1257 5647 3458', fare: '20'},
  //   {id:'101213',timestamp: '01/13/2020 1:52', from: 'Sion', to: 'CSMT', type: 'Return', adult: '3', child:'1', class:'Second', cardid: '8257 1280 3452', fare: '10'},
  //   {id:'101214',timestamp: '01/14/2020 4:39', from: 'Borivali', to: 'Malad', type: 'Return', adult: '1', child:'0', class:'Second', cardid: '3257 1280 3454', fare: '30'},
  //   {id:'101215',timestamp: '01/12/2020 6:30', from: 'Borivali', to: 'Nalasopara', type: 'Return', adult: '1', child:'0', class:'Second', cardid: '3257 1280 3454', fare: '30'}
  // ]

  const [data, setData] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    getList();
    return () => {};
  }, []);

  const getList = async () => {
    const value = await AsyncStorage.getItem('@token');
    const ret = await getuser(value);
    setUser(ret);
    try {
      let returnList = await ticketlist(value);
      setData(returnList);
    } catch (e) {
      console.log(e);
    }
  };
  const renderItem = ({item}) => (
    <View style={styles.card}>
      <View
        style={{
          flexDirection: 'row',
          padding: 10,
          justifyContent: 'space-between',
          alignSelf: 'stretch',
        }}>
        <Text>Ticket id: {(item?.ticketid).slice(0, 8)}</Text>
        <Text>Date: {item?.timestamp}</Text>
      </View>

      <View style={{flexDirection: 'row', padding: 5}}>
        <Text style={{fontSize: 26, fontWeight: 'bold'}}>{item?.source}</Text>
        <Icon name="swap-horiz" style={{paddingHorizontal: 10}} size={40} />
        <Text style={{fontSize: 26, fontWeight: 'bold'}}>
          {item?.destination}
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          padding: 10,
          justifyContent: 'space-evenly',
          alignSelf: 'stretch',
        }}>
        <Text>{item.tickettype}</Text>
        <Text>Adult: {item?.adult}</Text>
        <Text>Child: {item?.child}</Text>
        <Text>Class: {item?.classtype}</Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          padding: 10,
          justifyContent: 'space-between',
          alignSelf: 'stretch',
        }}>
        {item?.ticketform === 'Book with ID (Paperless)' && (
          <Text style={{paddingVertical: 8}}>
            Adhar/PAN No: {user?.idcardnumber}
          </Text>
        )}
        {item?.ticketform === 'Book & Print (Paper)' && (
          <Text style={{paddingVertical: 8}}>Ticket token: {item?.otp}</Text>
        )}
        {item?.ticketform === 'Book & Travel (Paperless)' && (
          <Text style={{paddingVertical: 8}}></Text>
        )}
        <Text style={{fontSize: 22, fontWeight: 'bold'}}>
          Fare: Rs. {item?.fare}.00/-
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          paddingBottom: 10,
          justifyContent: 'center',
          alignSelf: 'stretch',
        }}>
        <Text style={{color: 'red'}}>*{item?.ticketform}</Text>
      </View>
    </View>
  );
  return (
    <View style={styles.container}>
      {data.length === 0 ? (
        <Text>Nothing to show. Please book your ticket first.</Text>
      ) : (
        <FlatList
          data={data}
          keyExtractor={item => item.ticketid}
          renderItem={renderItem}
        />
      )}
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
});
