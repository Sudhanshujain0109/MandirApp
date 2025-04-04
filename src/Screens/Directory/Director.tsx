import { FlatList, StyleSheet, Text, View,Image, Pressable, TouchableOpacity, ImageBackground, ScrollView } from 'react-native'
import React, { useRef, useState } from 'react'
import { SVG_XML } from '../../constants/Svg_xml';
import SvgIcon from '../../components/common/SvgIcon';
import { COLORS, height, width } from '../../Utilities/Constants';
import SideBar from '../../components/common/DrawerBar';
import CustomInputBox from '../__Common__/AppInputBox/CustomInputBox';
import CustomButton from '../__Common__/Buttons/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { USER_CONFIG } from '../../constants/conig';
import { apiBaseHelper } from '../../Network/ApiBaseHelper';
import { URLS } from '../../constants/URLS';
import UserCard from '../../components/Profile/userCard';
import SmallUserCard from '../../components/Profile/UserSmallCard';
import MarriedFropDown from '../../components/common/MarriedDropDown';
const appLogoAuth = require('../../assets/Images/logo-welcome-screen.png');
const background = require('../../assets/Images/bg-welcome.jpg');

const Directory = () => {
    const drawerRef=useRef();
    const [loader,setLoader]=useState(false)
    const [search,setSearch]=useState("")
    const [marriedOotnot,setmarriedOotnot]=useState("Married")
    const [data,setData]=useState([]);

    const searchData=async()=>{
        try {
            // if(!search)
            //     return
// console.log(marriedOotnot,'ss');

            setLoader(true);
            const token=await AsyncStorage.getItem(USER_CONFIG.TOKEN_DETAILS);
            const result=await apiBaseHelper.post(URLS.SEARCH,{query:search,status:marriedOotnot},token);
            if(result.error)
                throw result
            setData(result.data.data);
            console.log(result.data.data,"datas");
            
        } catch (error) {
            console.log(error)
            setData([])
        }finally{
            setLoader(false);
        }
    }
    // data.forEach((t)=>console.log(t))
    
    return (
        <ImageBackground source={background} style={styles.container}>
            <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
                <TouchableOpacity onPress={()=>drawerRef.current.openDrawer()} style={styles.drawerBox}>
                    <SvgIcon svgXmlData={SVG_XML.HAMBURER} size={25} />
                </TouchableOpacity>
                {/* <SvgIcon svgXmlData={SVG_XML.OPTION_BLACK}  size={25} /> */}
                <Image source={appLogoAuth} style={{
                    width: width - 100, height: 100, resizeMode: 'contain',
                }} />
            </View>
            <ScrollView style={styles.loginCard} contentContainerStyle={{ alignItems: 'center',paddingBottom:40}}>
                <Text style={{color:COLORS.MAIN_APP,fontWeight:"700",textAlign:"center",padding:10}}>Search in Directory</Text>
                <CustomInputBox isEditable={true} value={search} onChange={(e) =>setSearch(e)} hint='Search by Name or Business Type' multiLine={false} width={width - 50} keyboardType='default' marginTop={20} />
                <MarriedFropDown style={{width:width-50}} defalutValue={marriedOotnot} getMarried={(value:any)=>setmarriedOotnot(value)} />
                <CustomButton loader={loader} title='Continue' width={width - 50} onPress={()=>searchData(search,marriedOotnot)} marginTop={20} marginBottom={10} />
                {
                    data.length>0 &&
                    data.map((item)=>(
                        <SmallUserCard  user={item} />
                    ))
                }
            </ScrollView>
            <SideBar ref={drawerRef} />
        </ImageBackground>
    )
}

export default Directory

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:COLORS.LIGHT_ORANGE,
        alignItems:"center",
        // justifyContent:"flex-end"
    },
    drawerBox:{
        width:40,
        height:40,
        borderRadius:4,
        alignItems:"center",
        justifyContent:"center",
        position:"absolute",
        left:-40
    },
    icon:{
        width:25,
        height:25
    },
    loginCard: {
        backgroundColor: COLORS.LIGHT_ORANGE,
        // flex: 0.35,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 20,
        width: width,
        height:height-180
    },
})