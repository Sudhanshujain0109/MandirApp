import { FlatList, StyleSheet, Text, View,Image, Pressable, TouchableOpacity, ImageBackground } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import FeaturedBox from '../../../components/Home/FeaturedBox'
import { FEATURED } from '../../../assets/data/featured'
import EventCard from '../../../components/Home/EventCard'
import { EVENTS } from '../../../assets/data/Events'
import CustomSlider from '../../../components/Home/Slider'
import { COLORS, width } from '../../../Utilities/Constants'
import { SLIDER_DATA } from '../../../assets/data/SliderData'
import SvgIcon from '../../../components/common/SvgIcon'
import { SVG_XML } from '../../../constants/Svg_xml'
import SideBar from '../../../components/common/DrawerBar'
import AdsModal from '../../../components/common/AdvertismentModal'
import { useNavigation } from '@react-navigation/native'
import { Screen } from 'react-native-screens'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { apiBaseHelper } from '../../../Network/ApiBaseHelper'
import { URLS } from '../../../constants/URLS'
import { USER_CONFIG } from '../../../constants/conig'
const appLogoAuth = require('../../../assets/Images/header_image.png');
const PDF=require("../../../assets/docs/adinath_bhawan_maharnai_farm-1.pdf")
const calenderPdf=require("../../../assets/docs/Jaina_2023_Calendar.pdf")
const festivsalPdf=require("../../../assets/docs/Kalyanak.pdf")

const Home = () => {
    const [events,setEvents]=useState([]);
    const navigation=useNavigation();
    const drawerRef=useRef();
    const adsRef=useRef();

    useEffect(()=>{
        // adsRef.current.openOptions()
    },[])

    useEffect(()=>{
        getAllEvents()
    },[])

    const getAllEvents=async()=>{
        try {
            const token=await AsyncStorage.getItem(USER_CONFIG.TOKEN_DETAILS);
            const response=await apiBaseHelper.get(URLS.GET_EVETS,token);
            if(response.data.status != 200){
                throw response.data.data
            }
            setEvents(response?.data?.data?.events)
        } catch (error) {
            console.log(error)
        }finally{
            // setLoader(false)
        }
    }

    return (
        <ImageBackground source={require('../../../assets/Images/bg-welcome.jpg')} style={styles.container}>
            <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center",paddingHorizontal:5}}>
                <TouchableOpacity onPress={()=>drawerRef.current.openDrawer()} style={styles.drawerBox}>
                    <SvgIcon svgXmlData={SVG_XML.HAMBURER} size={25} />
                </TouchableOpacity>
                {/* <SvgIcon svgXmlData={SVG_XML.OPTION_BLACK}  size={25} /> */}
                <Image source={appLogoAuth} style={{
                    width: width - 150, height: 80, resizeMode: 'contain',
                }} />
                {/* <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
                    <Image style={[styles.icon,{tintColor:'#fe8c26'}]} source={require('../../../assets/icons/notification.png')} />
                    <Image style={[styles.icon,{tintColor:'#fe8c26',marginLeft:5}]} source={require('../../../assets/icons/search.png')} />
                </View> */}
            </View>
            <View style={{width:width,backgroundColor:COLORS.LIGHT_ORANGE,borderTopLeftRadius:10,borderTopRightRadius:10,flex:1}} >
                <CustomSlider data={SLIDER_DATA} />
                <Text style={{color:"black",fontWeight:"600",paddingHorizontal:15,paddingVertical:8}}>Featured</Text>
                <FlatList
                    horizontal={true}
                    data={FEATURED}
                    renderItem={({item})=>(
                        <FeaturedBox onPress={()=>{
                            if(item.title==="Booking")
                                navigation.navigate('PdfViewer' as never,{pdfSoutce:PDF,title:item.title})
                            else if(item.title==="Panchang")
                                navigation.navigate('PdfViewer' as never,{pdfSoutce:calenderPdf,title:item.title})
                            else if(item.title==='Festival')
                                navigation.navigate('PdfViewer' as never,{pdfSoutce:festivsalPdf,title:item.title})
                            else
                                null
                        }} style={{marginHorizontal: 10,}} bgColor={item.bgcolor} title={item.title} imageUrl={item.image} />
                    )}
                    style={{maxHeight:width/4.5}}
                />
                <Text style={{color:"black",fontWeight:"600",paddingHorizontal:15,paddingVertical:8}}>Latest Events and Festivals</Text>
                <FlatList
                    horizontal={true}
                    data={events}
                    renderItem={({item})=>(
                        <EventCard desc={item?.description.trim()} onPress={()=>navigation.navigate("EventDetail",{event:item})} image={item.image} name={item.name.trim()} date={new Date(item.start_date).toLocaleDateString()} time={new Date(item.start_date).toLocaleTimeString()}/>
                    )}
                    style={{maxHeight:170}}
                />
            </View>
            <SideBar ref={drawerRef} />
            {/* <AdsModal ref={adsRef} /> */}
        </ImageBackground>
    )
}

export default Home

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"white",
    },
    drawerBox:{
        width:40,
        height:40,
        borderRadius:4,
        alignItems:"center",
        justifyContent:"center",
        position:"absolute",
        left:10
    },
    icon:{
        width:25,
        height:25
    }
})