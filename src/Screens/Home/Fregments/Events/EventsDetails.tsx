import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'
import { COLORS, height, width } from '../../../../Utilities/Constants';
import BackButton from '../../../../components/common/BackButton';
import CustomButton from '../../../__Common__/Buttons/CustomButton';

const EventDetail = () => {
    const route=useRoute();
    const {event} = route.params;
    
    return (
        <>
         <View style={{backgroundColor:COLORS.MAIN_APP,padding:20,flexDirection:'row',justifyContent:"space-between",alignItems:"center"}}>
                <View style={{flexDirection:"row",alignItems:"center"}}>
                    <BackButton/>
                    <Text style={{fontWeight:"bold",fontSize:20,color:"white",marginLeft:10}} >Event Detail</Text>
                </View>
                <Text style={{fontWeight:"bold",fontSize:16,color:event.type===0?'limegreen':"red",paddingHorizontal:15,paddingVertical:5,borderRadius:100,backgroundColor:"white",textAlign:"center"}} >{event.type===0?"Live":"On-Site"}</Text>
        </View>
            <ScrollView style={styles.container} >
               
                <Text style={{color:"black",padding:10,fontWeight:"bold",fontSize:25,paddingHorizontal:20}}>{event?.name}</Text>
                <Image
                    style={{height:170,width:'90%',borderRadius:10,alignSelf:"center",resizeMode:"contain"}} 
                    source={{uri:`http://172.105.56.136:8080/Images/${event.image}`}}
                />
                <Text style={{color:"black",padding:5,fontWeight:"600",fontSize:15,paddingHorizontal:15}}>From : {new Date(event?.start_date).toLocaleString()}</Text>
                <Text style={{color:"black",padding:5,fontWeight:"600",fontSize:15,paddingHorizontal:15}}>To : {new Date(event?.end_date).toLocaleString()}</Text>
                <View style={{padding:5}}>
                    <Text style={{color:"black",paddingHorizontal:10,paddingVertical:0, fontWeight:"bold",fontSize:18,}}>Descriprion : </Text>
                    <Text style={{color:"grey",paddingHorizontal:10,paddingVertical:0, fontWeight:"600",fontSize:15}}>{event?.description.trim()}</Text>
                </View>
                <View style={{padding:5}}>
                    <Text style={{color:"black",paddingHorizontal:10,paddingVertical:0, fontWeight:"bold",fontSize:18,marginTop:10}}>Address : </Text>
                    <Text style={{color:"grey",paddingHorizontal:10,paddingVertical:0, fontWeight:"600",fontSize:15}}>{event?.address.trim()}</Text>
                </View>
                <View style={{marginBottom:80}} />
            </ScrollView>
            {event.type===0? <CustomButton
                style={{position:"absolute",alignSelf:"center",bottom:0}}
                title='Join' width={width - 70} onPress={()=>{}}  marginBottom={30} 
            /> : <View></View>}
        </>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:COLORS.TAB_INACTIVE_ICON
    }
})

export default EventDetail