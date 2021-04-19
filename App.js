import React from 'react';
import {View, Button} from 'react-native';
import LogIn from './src/components/LogIn';
import SignUp from './src/components/SignUp';
import BookTicket from './src/components/BookTicket';
import HomePage from './src/components/HomePage';
import TicketHistory from './src/components/TicketHistory';
import Profile from './src/components/Profile';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Icon, CheckBox} from 'react-native-elements';
import Payment from './src/components/Payment';

const AuthStack = createStackNavigator();
const TicketStack = createStackNavigator();
var Token = null;
var isAUth = true;
console.log('App.js');
const getData = async () => {
  var token = null;
  try {
    const value = await AsyncStorage.getItem('@token');
    if (value !== null) {
      // value previously stored
      Token = value;
      console.log('Token from async', value, Token);
    }
  } catch (e) {
    // error reading value
  }
  return token;
};

const removeValue = async () => {
  try {
    isAUth = false;
    await AsyncStorage.removeItem('@token');
  } catch (e) {
    // remove error
  }

  console.log('Done.', isAUth);
};

getData();
console.log('Token', Token);

var user = [
  {email: 'kv77724@gmail.com', password: '123456'},
  {email: 'deepakvermillion191@gmail.com', password: '123456'},
  {email: 'sumit23181998gmail.com', password: '123456'},
];

export default function MainApp() {
  getData();
  return (
    <NavigationContainer>
      {/* {token === null ? ( */}
      {/* <AuthStack.Navigator initialRouteName={!isAUth ? 'LogIn' : 'HomePage'}> */}
      <AuthStack.Navigator>
        {/* <AuthStack.Screen
          name="LogIn"
          component={LogIn}
          options={{title: 'Log In', headerLeft: null,headerStyle: {
              backgroundColor: '#314e52'
            },
            headerTintColor: 'white',}}
          headerTruncatedBackTitle
        />
        <AuthStack.Screen
          name="SignUp"
          component={SignUp}
          options={{title: 'Sign Up', headerLeft: null,headerStyle: {
              backgroundColor: '#314e52'
            },
            headerTintColor: 'white',}}
          headerTruncatedBackTitle
        /> */}
        <AuthStack.Screen
          name="HomePage"
          component={HomePage}
          // options={{
          //   title: 'Home Page',
          //   headerLeft: null,
          //   headerStyle: {
          //     backgroundColor: '#314e52',
          //   },
          //   headerRight: () => (
          //     <View style={{marginRight: 10}}>
          //       <Button
          //         onPress={() => {
          //           alert('This is a button!');
          //           removeValue({navigation});
          //         }}
          //         title="LogOut"
          //         color="#289672"
          //         // color=""
          //       />
          //     </View>
          //   ),
          // }}
          options={({route, navigation}) => ({
            title: 'Home',
            headerLeft: null,
            headerStyle: {
              backgroundColor: '#314e52',
            },
            headerTintColor: 'white',
            headerRight: () => (
              <View style={{marginRight: 10}}>
                <Button
                  onPress={() => {
                    removeValue({navigation});
                    navigation.navigate('LogIn');
                  }}
                  title="LogOut"
                  color="#314e52"
                  // color=""
                />
              </View>
            ),
          })}
        />
        <AuthStack.Screen
          name="BookTicket"
          component={BookTicket}
          options={{
            title: 'Book Ticket',
            headerStyle: {
              backgroundColor: '#314e52',
            },
            headerTintColor: 'white',
          }}
          headerTruncatedBackTitle
        />
        <AuthStack.Screen
          name="TicketHistory"
          component={TicketHistory}
          options={{
            title: 'Booked Ticket History',
            headerStyle: {
              backgroundColor: '#314e52',
            },
            headerTintColor: 'white',
          }}
          headerTruncatedBackTitle
        />
        <AuthStack.Screen
          name="Profile"
          component={Profile}
          options={{
            title: 'Your Profile',
            headerStyle: {
              backgroundColor: '#314e52',
            },
            headerTintColor: 'white',
          }}
          headerTruncatedBackTitle
        />
        <AuthStack.Screen
          name="Payment"
          component={Payment}
          options={{
            title: 'Payment',
            headerStyle: {
              backgroundColor: '#314e52',
            },
            headerTintColor: 'white',
          }}
          headerTruncatedBackTitle
        />
      </AuthStack.Navigator>
      {/* ) : (
        <TicketStack.Navigator initialRouteName="HomePage">
          <TicketStack.Screen
            name="HomePage"
            component={HomePage}
            options={{title: 'Home Page'}}
            headerTruncatedBackTitle
          />
          <TicketStack.Screen
            name="BookTicket"
            component={BookTicket}
            options={{title: 'Book Ticket'}}
            headerTruncatedBackTitle
          />
          <TicketStack.Screen
            name="TicketHistory"
            component={TicketHistory}
            options={{title: 'Booked Ticket History'}}
            headerTruncatedBackTitle
          />
          <TicketStack.Screen
            name="Profile"
            component={Profile}
            options={{title: 'Your Profile'}}
            headerTruncatedBackTitle
          />
        </TicketStack.Navigator>
      )} */}
    </NavigationContainer>
  );
}
