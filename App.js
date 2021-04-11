import React from 'react';
import LogIn from './src/components/LogIn';
import SignUp from './src/components/SignUp';
import BookTicket from './src/components/BookTicket';
import HomePage from './src/components/HomePage';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const AuthStack = createStackNavigator();
const TicketStack = createStackNavigator();
var token = 10;

export default function MainApp() {
  return (
    <NavigationContainer>
      {token === null ? (
        <AuthStack.Navigator>
          <AuthStack.Screen
            name="LogIn"
            component={LogIn}
            options={{title: 'Log In', headerLeft: null}}
            headerTruncatedBackTitle
          />
          <AuthStack.Screen
            name="SignUp"
            component={SignUp}
            options={{title: 'Sign Up', headerLeft: null}}
            headerTruncatedBackTitle
          />
        </AuthStack.Navigator>
      ) : (
        <TicketStack.Navigator>
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
        </TicketStack.Navigator>
      )}
    </NavigationContainer>
  );
}
