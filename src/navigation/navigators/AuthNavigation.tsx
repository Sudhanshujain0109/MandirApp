import { View, Text, Dimensions } from 'react-native'
import React, { useContext, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import { COLORS } from '../../Utilities/Constants'
import Login from '../../Screens/Auth/Login'
import OTPScreen from '../../Screens/Auth/OTPScreen'
import SignUp from '../../Screens/Auth/SignUp'
import { GlobalVariable } from '../../../App'

const Stack = createNativeStackNavigator()

const AuthNavigation = () => {
  const {profileScreen}=useContext(GlobalVariable);
  console.log(profileScreen,"op")


  return (
    <Stack.Navigator initialRouteName={profileScreen==null?'Login':"SignUp"} screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='OTPScreen' component={OTPScreen} />
      <Stack.Screen name='SignUp' component={SignUp} />
    </Stack.Navigator>
  )
}

export default AuthNavigation