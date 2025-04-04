import { Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, width } from '../../Utilities/Constants'

interface AdsProps{
    imageUrl?:string,
    title?:string,
    onPress?:()=>void
}

const AdsCard = ({imageUrl,onPress,title}:AdsProps) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <Image
                style={{width:"100%",height:'80%',borderRadius:4}}
                source={{uri:`http://172.105.56.136:8080/Images/${imageUrl}`}}
            />
            <Text style={styles.textStyle}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        width:width-50,
        height:width/1.5,
        backgroundColor:'white',
        borderRadius:8,
        borderWidth:1,
        borderColor:"#8C8C8C"
    },
    textStyle:{
        color:'#5D5D5D',
        padding:10
    }
})

export default AdsCard