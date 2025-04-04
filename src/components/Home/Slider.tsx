import React, { useState } from "react";
import {
    View,
    Image,
    Dimensions,
    StyleSheet,
    ScrollView,
    Text,
    TouchableOpacity,
    ImageBackground
} from 'react-native';
import { COLORS, width } from "../../Utilities/Constants";
const windowWidth=Dimensions.get('window').width;
const windowHeight=Dimensions.get('window').height;

type SliderProps={
    data:Array<object>
}

const CustomSlider=(props:SliderProps)=>{
    const [active,setActive]=useState(0);
    return(
        <View style={styles.continer}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                onScroll={(e) => {
                    let value=Math.ceil(e.nativeEvent.contentOffset.x/windowWidth)
                    if(value!==active){
                        setActive(value);
                    }
                }}
            >
                {
                    props.data.map((item:any,index:number)=>(
                        <ImageBackground source={item.url} imageStyle={{borderRadius:10,resizeMode:"contain"}} style={{borderRadius:10,height:windowHeight/5,backgroundColor:"#f18118",width:width-30,flexDirection:"row",justifyContent:"space-between",marginHorizontal:10}}>
                            <View style={{alignItems:"flex-start",justifyContent:"center",width:'100%'}}>
                                <Text style={{color:'white',fontWeight:'bold',textAlign:"center",fontSize:19,width:'60%',marginLeft:10,paddingLeft:10,fontStyle:"italic"}}>{item.title}</Text>
                                {/* <Text style={{color:'white',fontWeight:'500',textAlign:"center",fontSize:12,width:'60%',marginVertical:5,marginLeft:10,paddingLeft:10}}>{item.desc}</Text> */}
                                {/* <Text style={{position:"absolute",bottom:10,right:"50%",color:"white",fontWeight:'700',textAlign:"center",fontSize:12,backgroundColor:COLORS.TAB_ACTIVE_ICONS,paddingHorizontal: 10,paddingVertical:6,borderRadius:6}}>
                                    READ MORE
                                </Text> */}
                            </View>
                        </ImageBackground>
                    ))
                }
            </ScrollView>
            <View
                style={{
                    flexDirection:"row",
                    alignSelf:"center",
                    position:"absolute",
                    bottom:-15,
                    alignItems:"center"
                }}
            >
                {
                    props.data.map((i:any,k:number)=>(
                        <View style={k===active?styles.seletedImage:styles.notSeletedImage} />
                    ))
                }
            </View>
        </View>
    )
}
const styles=StyleSheet.create({
    continer:{
        width:windowWidth,
        height:windowHeight/4.5,
        alignSelf:"center",
        alignItems:"center",
        justifyContent:"center",
        margin:10,
        borderRadius:12,
        marginBottom:30,
    },
    imageStyle:{
        width:windowWidth-90,
        height:windowHeight/5,
        resizeMode:"cover",
        borderRadius:30,
    },
    seletedImage:{
        backgroundColor:'#D0251D',
        width:15,
        height:6,
        borderRadius:10,
        marginHorizontal:3
    },
    notSeletedImage:{
        backgroundColor:"#C8C8C8",
        width:6,
        height:6,
        borderRadius:10,
        marginHorizontal:3
    },
    dotsContainer:{
        flexDirection:"row",
        alignSelf:"center",
        position:"absolute",
        bottom:8,
        alignItems:"center"
    }
})
export default CustomSlider;