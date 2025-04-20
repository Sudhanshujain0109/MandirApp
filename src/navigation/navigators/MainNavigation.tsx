import { View, Text, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import { COLORS } from '../../Utilities/Constants'
import BottomTab from '../tab'
import NewsDetail from '../../Screens/Home/Fregments/News/NewsDetail'
import EventDetail from '../../Screens/Home/Fregments/Events/EventsDetails'
import RelativeAdd from '../../Screens/Home/Fregments/Profile/RelativeAdd'
import PdfViewer from '../../Screens/Home/PdfViewer'
import About from '../../Screens/__Common__/About'
import ContentData from '../../Screens/Home/Fregments/Drawer/Content'
import CommiteeMembers from '../../Screens/Directory/CommitteeMembers'
import BussinessDirectory from '../../Screens/Directory/BussinessDirectory'
import Profile from '../../Screens/Home/Fregments/Profile/Profile'
import FamilyMemberUpdate from '../../NewModule/FamilyMemberUpdate'
import SearchProfileDetails from '../../Screens/Directory/SearchProfileDetails'

const Stack = createNativeStackNavigator()

const MainNavigation = () => {
  const [user,setUser]=useState(null);

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Tabs" component={BottomTab} />
      <Stack.Screen name="NewsDetail" component={NewsDetail} />
      <Stack.Screen name="EventDetail" component={EventDetail} />
      <Stack.Screen name="RelativeAdd" component={RelativeAdd} />
      <Stack.Screen name="PdfViewer" component={PdfViewer} />
      <Stack.Screen name="About" component={About} />
      <Stack.Screen name="Content" component={ContentData} />
      <Stack.Screen name="CommiteeMembers" component={CommiteeMembers} />
      <Stack.Screen name="UserProfile" component={Profile} />
      <Stack.Screen name="BussinessDirectory" component={BussinessDirectory} />
      <Stack.Screen name="FamilyMemberUpdate" component={FamilyMemberUpdate} />
      <Stack.Screen name="SearchProfileDetails" component={SearchProfileDetails} />
    </Stack.Navigator>
  );
}

export default MainNavigation