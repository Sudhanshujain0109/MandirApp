import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import WebView from 'react-native-webview'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { USER_CONFIG } from '../../../../constants/conig'
import { URLS } from '../../../../constants/URLS'
import { apiBaseHelper } from '../../../../Network/ApiBaseHelper'
import GenderFropDown from '../../../../components/common/GenderFropDown'
import { COLORS, height, width } from '../../../../Utilities/Constants'
import ContentDropDown from '../../../../components/common/ContentDropDown'
import BackButton from '../../../../components/common/BackButton'

const ContentData = () => {
    const [Content,setContetn]=useState("");
    const [selectedData,setSetectedData]=useState()

    useEffect(()=>{
        getContent();
    },[]);
    const getContent=async()=>{
        try {
            const token=await AsyncStorage.getItem(USER_CONFIG.TOKEN_DETAILS);
            const about=await apiBaseHelper.get(URLS.GET_CONTENT,token);
            if(about.error) 
                throw about.data;
            setContetn(about.data.data)
            setSetectedData(about.data.data[0])
        } catch (error) {
            console.log(error)
        }
    }
    const handleVlae=(value:string)=>{
        let data=Content.find((data:object)=>data.section === value)
        setSetectedData(data);
    }
    return (
        <View style={styles.container} >
            <View style={{backgroundColor:COLORS.MAIN_APP,padding:20,flexDirection:"row",alignItems:"center"}} >
                <BackButton/>
                <Text style={{color:"white",fontWeight:"bold",fontSize:20,marginLeft:10}}>Content</Text>
            </View>
            <ContentDropDown defalutValue={selectedData?.section} getGender={(value:any)=>handleVlae(value)} />
            <WebView
                source={{ html: selectedData?.content }}
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
export default ContentData