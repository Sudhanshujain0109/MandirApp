import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, width } from '../../../Utilities/Constants'

interface buttonProps{
    style?:object,
    title:string,
    onPress:()=>void,
    isCenter?:boolean,
    titleColor?:string,
    loader?:boolean
}
const LineButton = ({style,title,onPress,isCenter=false,titleColor="black",loader=false}:buttonProps) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.buttonBody,{...style},{justifyContent:"center",alignItems:isCenter?"center":"flex-start"}]} >
            {
                loader?<ActivityIndicator color={titleColor} size={25} />:
                <Text style={[styles.buttonText,{color:titleColor}]} >
                    {title}
                </Text>
            }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonBody:{
        backgroundColor:'transparent',
        width:width-40,
        height:40,
        borderWidth:1,
        borderColor:COLORS.MAIN_APP
    },
    buttonText:{
        color:'black',
        fontWeight:"700"
    }
})

export default LineButton