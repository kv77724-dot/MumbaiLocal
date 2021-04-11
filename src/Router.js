import React from 'react';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const AuthStack = createStackNavigator();

export default function MainApp() {
  <NavigationContainer>
    <AuthStack.Navigator>
      <AuthStack.Screen name="SignIn" component={LogIn} />
      <AuthStack.Screen name="SignUp" component={SignUp} />
    </AuthStack.Navigator>
  </NavigationContainer>;
}
