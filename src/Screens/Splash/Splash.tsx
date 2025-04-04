import { StyleSheet, Image, ImageBackground } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { height, width } from '../../Utilities/Constants'
const splash = require('../../assets/Images/splashBG.jpeg')
const background = require('../../assets/Images/bg-welcome.jpg');
const loginImage = require('../../assets/Images/event.jpg')
const splashCenter = require('../../assets/Images/splash.png')
const Splash = () => {
    return (
        <ImageBackground source={background} style={{
            flex: 1,
            height: height,
            alignItems:"center",
            justifyContent:"center"
        }}>
            <Image source={splashCenter} style={styles.loginImage} />
        </ImageBackground>
    )
}
const styles=StyleSheet.create({
    loginImage: {
        width: width-40, height: height, resizeMode: 'contain',
    },
})
export default Splash