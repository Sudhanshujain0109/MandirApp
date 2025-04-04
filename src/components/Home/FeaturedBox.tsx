import { Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { width } from '../../Utilities/Constants'

type Box={
    bgColor:string,
    imageUrl:ImageSourcePropType,
    title:string,
    style?:object,
    onPress:()=>void
}
const FeaturedBox = (props:Box) => {
    return (
        <TouchableOpacity onPress={props.onPress} style={[styles.boxBody,{...props.style},{backgroundColor:props.bgColor}]}>
            <Image style={{width:30,height:30,resizeMode:"contain",tintColor:"red"}} source={props.imageUrl} />
            <Text style={{color:"black",fontWeight:"700",marginTop:5,fontSize:10}}>{props.title}</Text>
        </TouchableOpacity>
    )
}

export default FeaturedBox

const styles = StyleSheet.create({
    boxBody:{
        width:width/5,
        height:width/5,
        borderRadius:8,
        alignItems:"center",
        justifyContent:"center"
    }
})