import React, {useState, useEffect} from 'react';
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
import PaymentDone from './src/components/PaymentDone';
import {HeaderBackButton} from '@react-navigation/stack';
import ForgetPass from './src/components/ForgetPass';

const AuthStack = createStackNavigator();
const TicketStack = createStackNavigator();

console.log('App launch');

var user = [
  {email: 'kv77724@gmail.com', password: '123456'},
  {email: 'deepakvermillion191@gmail.com', password: '123456'},
  {email: 'sumit23181998gmail.com', password: '123456'},
];

export default function MainApp() {
  const [authToken, setAuthToken] = useState(null);
  const [currentRoute, setCurrentRoute] = useState('LogIn');

  useEffect(() => {
    // async function() {
    getData();
    // }
    return () => {};
  }, [authToken, currentRoute]);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@token');
      if (value !== null) {
        // value previously stored
        setAuthToken(value);
        setCurrentRoute('HomePage');
        console.log('Token from async', value);
      }
    } catch (e) {
      // error reading value
    }
  };

  const removeValue = async () => {
    try {
      await AsyncStorage.removeItem('@token');
      setAuthToken(null);
      // navigation.navigate('LogIn');
    } catch (e) {
      // remove error
    }
  };

  console.log('Token is', authToken);

  return (
    <NavigationContainer>
      <AuthStack.Navigator initialRouteName={currentRoute}>
        {/* // initialRouteName={authToken === null ? 'LogIn' : 'HomePage'}> */}
        <AuthStack.Screen
          name="LogIn"
          component={LogIn}
          options={{
            title: 'Log In',
            headerLeft: null,
            headerStyle: {
              backgroundColor: '#314e52',
            },
            headerTintColor: 'white',
          }}
          headerTruncatedBackTitle
        />
        <AuthStack.Screen
          name="SignUp"
          component={SignUp}
          options={{
            title: 'Sign Up',
            headerLeft: null,
            headerStyle: {
              backgroundColor: '#314e52',
            },
            headerTintColor: 'white',
          }}
          headerTruncatedBackTitle
        />
        <AuthStack.Screen
          name="HomePage"
          component={HomePage}
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
                    removeValue();
                    navigation.navigate('LogIn');
                  }}
                  title="LogOut"
                  color="#314e52"
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
          // options={{
          //   title: 'Booked Ticket History',
          //   headerStyle: {
          //     backgroundColor: '#314e52',
          //   },
          //   headerLeft: props => (
          //     <HeaderBackButton
          //       onPress={() => {
          //         // Do something
          //         console.log('Pressing....');
          //         navigation.navigate('HomePage');
          //       }}
          //     />
          //   ),
          //   headerTintColor: 'white',
          // }}
          options={({route, navigation}) => ({
            title: 'Booked Ticket History',
            headerStyle: {
              backgroundColor: '#314e52',
            },
            headerTintColor: 'white',
            headerLeft: props => (
              <HeaderBackButton
                onPress={() => {
                  // Do something
                  console.log('Pressing....');
                  navigation.navigate('HomePage');
                }}
              />
            ),
          })}
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
        <AuthStack.Screen
          name="PaymentDone"
          component={PaymentDone}
          options={{
            title: 'Payment successful',
            headerLeft: null,
            headerStyle: {
              backgroundColor: '#314e52',
            },
            headerTintColor: 'white',
          }}
          headerTruncatedBackTitle
        />
        <AuthStack.Screen
          name="ForgetPass"
          component={ForgetPass}
          options={{
            title: 'Forget password',
            headerStyle: {
              backgroundColor: '#314e52',
            },
            headerTintColor: 'white',
          }}
          headerTruncatedBackTitle
        />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
}
