import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS, height, width } from '../../Utilities/Constants'
import WebView from 'react-native-webview'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { USER_CONFIG } from '../../constants/conig'
import { apiBaseHelper } from '../../Network/ApiBaseHelper'
import { URLS } from '../../constants/URLS'
import BackButton from '../../components/common/BackButton'

const About = () => {
    const [about,setAbout]=useState("");

    useEffect(()=>{
        getContent();
    },[]);
    const getContent=async()=>{
        try {
            const token=await AsyncStorage.getItem(USER_CONFIG.TOKEN_DETAILS);
            const about=await apiBaseHelper.get(URLS.GET_ABPUT,token);
            if(about.error) 
                throw about.data;
            setAbout(about.data.data[0])
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <View style={styles.container} >
            <View style={{backgroundColor:COLORS.MAIN_APP,padding:20,flexDirection:"row",alignItems:"center"}} >
                <BackButton/>
                <Text style={{color:"white",fontWeight:"bold",fontSize:20,marginLeft:10}}>About Us</Text>
            </View>
            <WebView
                source={{ html: about?.text }}
                style={{width:width-40,height:height-100,alignSelf:"center",marginVertical:20}}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:COLORS.TAB_INACTIVE_ICON
    }
})
export default About