import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, width } from '../../Utilities/Constants'

type Events={
    image?:string,
    name?:string,
    date?:string,
    onPress?:()=>void
}
const NewsCard = ({image,name,date,onPress}:Events) => {
    return (
        <Pressable onPress={onPress} style={styles.contianer}>
            <Image style={{width:'100%',height:100,borderTopLeftRadius:10,borderTopRightRadius:10,resizeMode:"contain"}} source={{uri:`http://172.105.56.136:8080/Images/${image}`}} />
            <View style={{marginTop:10,paddingLeft:10}}>
                <Text style={{color:COLORS.MAIN_APP,fontWeight:'500',fontSize:15}}>{name?.substr(0,17)}...</Text>
                <Text style={{color:'black',fontWeight:'500',fontSize:12}}>{date}</Text>
            </View>
        </Pressable>
    )
}

export default NewsCard

const styles = StyleSheet.create({
    contianer:{
        width:width/2.2,
        backgroundColor:"white",
        borderRadius:10,
        alignSelf:"center",
        marginVertical:10,
        elevation:8,
        paddingBottom:10
    }
})