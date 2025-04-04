import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { tabs } from '../../Utilities/Config';
import { COLORS, width } from '../../Utilities/Constants';

type Props = {}

const Tab = createBottomTabNavigator();
const Dashboard = (props: Props) => {
    return (
        <Tab.Navigator
            initialRouteName='ExploreStack'
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
            }}
        >
            {
                tabs.map((tab, index) => (
                    <Tab.Screen name={tab.name} component={tab.component} options={{
                        tabBarStyle: { backgroundColor: COLORS.MAIN_APP, height: 70,width:width-20,marginBottom:10,alignSelf:"center",borderRadius:10 },
                        tabBarIcon: ({ focused }) => (
                            <View key={index} style={[
                                { alignItems: 'center', justifyContent: 'center', height: '100%', width: 80, paddingVertical: 15,marginTop:index==2?-70:0 },
                                index===2?styles.big_circle:null
                            ]}>
                                {/* <View style={index===2?null:styles.style_small_circle}> */}
                                    {/* <Image key={index} source={tab.tabIcons} style={{ width: 20, height: 20, resizeMode: "contain", marginBottom: 5, tintColor: focused ? COLORS.TAB_ACTIVE_ICONS : COLORS.TAB_INACTIVE_ICON }} /> */}
                                {/* </View> */}
                                {index!==2 && <Text key={index} style={{ color: "white", fontWeight: "600", fontSize: 12 }}>{tab.nameShow}</Text>}
                            </View>
                        )
                    }}
                    />
                ))
            }
        </Tab.Navigator>
    )
}
const styles=StyleSheet.create({
    big_circle:{
        width:60,
        height:60,
        borderRadius:30,
        alignItems:"center",
        justifyContent:"center",
        borderWidth:1.5,
        borderColor:'white'
    },
    style_small_circle:{
        width:40,
        height:40,
        borderRadius:20,
        alignItems:"center",
        justifyContent:"center",
        borderWidth:1.5,
        borderColor:'white',
        backgroundColor:"white"
    }
});

export default Dashboard