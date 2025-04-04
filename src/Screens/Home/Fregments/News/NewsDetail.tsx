import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'
import { COLORS, height, width } from '../../../../Utilities/Constants';
import { useWindowDimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import BackButton from '../../../../components/common/BackButton';

const NewsDetail = () => {
    const route=useRoute();
    const {news} = route.params;
    return (
        <View style={styles.container} >
            <View style={{backgroundColor:COLORS.MAIN_APP,padding:20,flexDirection:'row',alignItems:"center"}}>
                <BackButton/>
                <Text style={{fontWeight:"bold",fontSize:20,color:"white",marginLeft:10}} >News Detail</Text>
            </View>
            {/* <Text style={{color:"white",backgroundColor:COLORS.MAIN_APP,padding:20,fontWeight:"bold",fontSize:20}}> Detail</Text> */}
            <Text style={{color:"black",padding:20,fontWeight:"bold",fontSize:20}}>{news.title}</Text>
            <Image
                style={{height:170,width:'90%',borderRadius:10,alignSelf:"center",resizeMode:"contain"}} 
                source={{uri:`http://172.105.56.136:8080/Images/${news.image}`}}
            />
            <WebView
                source={{ html: news?.content }}
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

export default NewsDetail