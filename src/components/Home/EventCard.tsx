import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, width } from '../../Utilities/Constants'

type Events={
    image:string,
    name:string,
    date:string,
    time:string,
    desc:string,
    onPress?:()=>void
}
const EventCard = ({image,name,time,date,desc,onPress}:Events) => {
    
    return (
        <Pressable onPress={onPress} style={styles.contianer}>
            <Image style={{width:150,height:'100%',borderTopLeftRadius:10,borderBottomLeftRadius:10}} source={{uri:`http://172.105.56.136:8080/Images/${image}`}} />
            <View style={{marginLeft:10,height:"95%",width:"55%"}}>
                <Text style={{color:COLORS.MAIN_APP,fontWeight:'500',fontSize:18}}>{name}</Text>
                <View style={{flexDirection:"row"}}>
                    <Text style={{color:'black',fontWeight:'400',fontSize:11}}>{date}</Text>
                    <Text style={{color:'black',fontWeight:'400',fontSize:11,marginHorizontal:5}}>|</Text>
                    <Text style={{color:'black',fontWeight:'400',fontSize:11}}>{time}</Text>
                </View>
                <Text numberOfLines={6} style={{color:'black',fontWeight:'400', fontSize:12,paddingVertical:5,paddingRight:10}}>{desc}...</Text>
            </View>
        </Pressable>
    )
}

export default EventCard

const styles = StyleSheet.create({
    contianer:{
        width:width-30,
        backgroundColor:"white",
        marginHorizontal:10,
        borderRadius:10,
        flexDirection:"row",
        alignItems:"center",
        height:150,
        alignSelf:"center",
        marginVertical:10,
        borderWidth:1,
        borderColor:COLORS.MAIN_APP
    }
})