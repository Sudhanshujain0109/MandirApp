import { Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, width } from '../../Utilities/Constants';

interface Props{
    imageSource:ImageSourcePropType,
    title:string,
    subTitle:string,
    mobile:string
}
const CommitteeMemberBox = ({imageSource,title,subTitle,mobile}:Props) => {
    return (
        <View style={{marginVertical:10}}>
            <Image
                style={{width:120,height:120,resizeMode:"contain",borderRadius:1000,borderWidth:2,borderColor:"red"}}
                source={imageSource}
            />  
            <Text style={{color:"rgba(205,36,29,255)",fontWeight:"600",textAlign:"center"}}>{title}</Text>
            <Text style={{color:"black",fontWeight:"600",textAlign:"center"}}>{subTitle}</Text>
            <Text style={{color:"black",fontWeight:"600",textAlign:"center"}}>{mobile}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    
});

export default CommitteeMemberBox