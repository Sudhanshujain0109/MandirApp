import { FlatList, StyleSheet, Text, View,Image, Pressable, TouchableOpacity, ImageBackground, ScrollView } from 'react-native'
import React, { useRef, useState } from 'react'
import SvgIcon from '../../components/common/SvgIcon';
import { SVG_XML } from '../../constants/Svg_xml';
import { COLORS, width } from '../../Utilities/Constants';
import SideBar from '../../components/common/DrawerBar';
import { COMMITTEE_MEMBERS, OTHER_MEMBERS } from '../../assets/data/Committee';
import CommitteeMemberBox from '../../components/Home/CommitteeMemberBox';
const appLogoAuth = require('../../assets/Images/logo-welcome-screen.png');
const background = require('../../assets/Images/bg-welcome.jpg');

const CommiteeMembers = () => {
    const drawerRef=useRef();

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
            <ScrollView contentContainerStyle={{alignItems: 'center',}} style={styles.loginCard}>
                <Text style={styles.topText} >
                    Our Team
                </Text>
                <View style={{flexDirection:"row",flexWrap:"wrap",alignItems:"center",justifyContent:"space-around",paddingHorizontal:20}} >
                    {
                        OTHER_MEMBERS.map((item)=>(
                            <CommitteeMemberBox 
                                title={item.name}
                                subTitle={item.empType}
                                imageSource={item.image}
                                mobile={item.phone}
                            />
                        ))
                    }
                </View>
                <Text style={[styles.topText,{backgroundColor:"rgba(255,249,181,255)",color:"rgba(255,118,1,255)",textAlign:"center",width:width}]} >
                    Comittee Member
                </Text>
                <View style={{flexDirection:"row",flexWrap:"wrap",alignItems:"center",justifyContent:"space-around",paddingBottom:20,paddingHorizontal:20}} >
                    {
                        COMMITTEE_MEMBERS.map((item)=>(
                            <CommitteeMemberBox 
                                title={item.name}
                                subTitle={item.empType}
                                imageSource={item.image}
                                mobile={item.phone}
                            />
                        ))
                    }
                </View>
            </ScrollView>
            <SideBar ref={drawerRef} />
        </ImageBackground>
    )
}

export default CommiteeMembers

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:COLORS.LIGHT_ORANGE,
        alignItems:"center",
    },
    loginCard: {
        backgroundColor: COLORS.LIGHT_ORANGE,
        flex: 1,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        // padding: 20,
        width: width,
        paddingTop:20
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
    topText:{
        backgroundColor:COLORS.MAIN_APP,
        width:width-40,
        paddingHorizontal:20,
        borderRadius:10,
        paddingVertical:15,
        color:'white',
        fontWeight:'700'
    }
})