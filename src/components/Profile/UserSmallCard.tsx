import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { width } from '../../Utilities/Constants'

type user={
    user:object
}
const SmallUserCard = ({user}:user) => {
    return (
        <View style={styles.card}>
            <Image source={require("../../assets/user.png")} style={{height:40,width:40,marginRight:10}} />
            <View style={{flex:1}}>
                <Text style={styles.text}>{user?.full_name?.substr(0,20)}...</Text>
                <Text style={styles.subtext}>{user?.phone}</Text>
            </View>
            <Text style={styles.subtext}>{user?.occupation}</Text>
        </View>
    )
}
const styles=StyleSheet.create({
    card:{
        width:width-40,
        padding:10,
        
        backgroundColor:"white",
        alignSelf:"center",
        borderRadius:10,
        marginVertical:5,
        flexDirection:"row",
        alignItems:"center",
        
    },
    text:{
        color:"black",
        fontWeight:"500",
        
    },
    subtext:{
        color:"gray",
        fontWeight:"400",
        
    }
})
export default SmallUserCard