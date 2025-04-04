import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { tabs } from '../Utilities/Config';
import { COLORS, height, width } from '../Utilities/Constants';
import SvgIcon from '../components/common/SvgIcon';
import { SVG_XML } from '../constants/Svg_xml';
import { useNavigation } from '@react-navigation/native';

type Props = {}

const Tab = createBottomTabNavigator();
const BottomTab = (props: Props) => {
    const navigate = useNavigation()
    return (
        <Tab.Navigator
            initialRouteName='Home'
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
            }}
        >
            {
                tabs.map((tab, index) => (
                    <Tab.Screen name={tab.name} component={tab.component} options={{
                        headerShown:index != 4 ? false:true,
                        headerTintColor:"white",
                        headerRight:(tint)=>
                                <TouchableOpacity onPress={()=>navigate.navigate("UserProfile")}>
                                     <Image source={require("../assets/user-avatar.png") }style={{
                                    height:30,
                                    width:30,
                                    tintColor:'white',
                                    marginRight:10
                                 }}/>
                                </TouchableOpacity>
                        ,
                        headerStyle:{
                            backgroundColor:COLORS.MAIN_APP
                        },
                        tabBarStyle: { backgroundColor: COLORS.MAIN_APP, height: 70,width:width-20,marginBottom:10,alignSelf:"center",borderRadius:10 },
                        tabBarIcon: ({ focused }) => (
                            <View key={index} style={[
                                { alignItems: 'center', justifyContent: 'center', height: '100%', width: 80, paddingVertical: 15, },
                                // index===2?styles.big_circle:null
                            ]}>
                                <View style={[styles.style_small_circle,{backgroundColor:!focused?COLORS.MAIN_APP:"white",}]}>
                                    {
                                        // tab.name==="Home" || tab.name==="News" || tab.name==="Events" || tab.name==="Profile"?
                                        <Image key={index} source={tab.tabIcons} style={{ width: 20, height: 20, resizeMode: "contain",  tintColor: !focused ?"white":COLORS.MAIN_APP}} />
                                        // <SvgIcon svgXmlData={tab.tabIcons} size={20} />
                                    }
                                </View>
                                {<Text key={index} style={{ color: 'white', fontWeight: "600", fontSize: 12 }}>{tab.nameShow}</Text>}
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
        backgroundColor:'white'
    }
});

export default BottomTab