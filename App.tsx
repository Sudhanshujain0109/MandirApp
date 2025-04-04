import {View, Text, Dimensions} from 'react-native';
import React, {createContext, useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from './src/Screens/Splash/Splash';
import Login from './src/Screens/Auth/Login';
import Dashboard from './src/navigation/navigators/Dashboard';
import {COLORS} from './src/Utilities/Constants';
import OTPScreen from './src/Screens/Auth/OTPScreen';
import SignUp from './src/Screens/Auth/SignUp';
import AuthNavigation from './src/navigation/navigators/AuthNavigation';
import MainNavigation from './src/navigation/navigators/MainNavigation';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {USER_CONFIG} from './src/constants/conig';
import NWLogs from './src/components/common/NwLogs';

interface ContextProps {
  user: any;
  setUserValue: (value: any) => void;
  profileScreen: any;
  setProfileDone: () => void;
}
export const GlobalVariable = createContext<ContextProps | null>(null);

const Stack = createNativeStackNavigator();

const App = () => {
  const [user, setUser] = useState(null);
  const [profileDone, setProfileDone] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkForAuth();
  }, []);

  const checkForAuth = async () => {
    try {
      const token = await AsyncStorage.getItem(USER_CONFIG.TOKEN_DETAILS);
      const isProfileDone = await AsyncStorage.getItem(
        USER_CONFIG.PROFILE_DONE,
      );
      if (token) {
        if (isProfileDone == 0) setProfileDone(isProfileDone);
        else setUser(token);
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
      setProfileDone(null);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
  };

  if (loading) {
    return <Splash />;
  }

  return (
    <GlobalVariable.Provider
      value={{
        user: user,
        setUserValue: (value: any) => setUser(value),
        profileScreen: profileDone,
        setProfileDone: () => checkForAuth(),
      }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {!user ? (
            <Stack.Screen name="AuthNavigation" component={AuthNavigation} />
          ) : (
            <Stack.Screen name="MainNavigation" component={MainNavigation} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
      {<NWLogs />}
    </GlobalVariable.Provider>
  );
};

export default App;
