import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { width } from '../../Utilities/Constants'

type user={
    user:object
}
const UserCard = ({user}:user) => {
    return (
        <View style={styles.card}>
            <Text style={styles.text}>Name : {user?.name || user?.full_name}</Text>
            <Text style={styles.text}>Email : {user?.email}</Text>
            <Text style={styles.text}>Phone : {user?.phone}</Text>
            <Text style={styles.text}>Age : {user?.age}</Text>
            <Text style={styles.text}>Address : {user?.address}</Text>
            <Text style={styles.text}>Occupation : {user?.occupation}</Text>
            <Text style={styles.text}>Gender : {user?.gender}</Text>
            <Text style={styles.text}>Married : {user?.married}</Text>
        </View>
    )
}
const styles=StyleSheet.create({
    card:{
        width:width-40,
        padding:10,
        elevation:4,
        backgroundColor:"white",
        alignSelf:"center",
        borderRadius:10,
        marginVertical:5
    },
    text:{
        color:"black",
        fontWeight:"700",
        padding:5
    }
})
export default UserCard