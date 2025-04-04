import { View, Text, ImageBackground, Image, useWindowDimensions, Dimensions, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import CustomInputBox from '../__Common__/AppInputBox/CustomInputBox';
import { COLORS, height, width } from '../../Utilities/Constants';
import CustomButton from '../__Common__/Buttons/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { apiBaseHelper } from '../../Network/ApiBaseHelper';
import { URLS } from '../../constants/URLS';
const background = require('../../assets/Images/bg-welcome.jpg');
const appLogoAuth = require('../../assets/Images/logo-color.png');
const loginImage = require('../../assets/Images/header_image.png');
type Props = {}



const Login = (props: Props) => {
    const [phone,setPhone]=useState('');
    const navigation=useNavigation();
    const [loader,setLoader]=useState(false);

    const requestOtp=async()=>{
        try {
            if(!phone)
                throw {message:"Enter Phone number"}
            if(phone.length!=10)
                throw {message:"phone should be 10 digit"}
            setLoader(true)
            const response = await apiBaseHelper.post(URLS.SEND_OTP, { phone: phone }, null)
            console.log(response, "2957247562478")
            if(response.data.status != 200){
                throw response.data
            }
            console.log(response.data)
            navigation.navigate("OTPScreen" as never,{phone:phone});
        } catch (error) {
            console.log(error)
            alert(error.message)
        }finally{
            setLoader(false)
        }
    }
    return (

        <ImageBackground source={background} style={style.main}>
            <View style={{ flex: 0.4, alignItems: 'center' }}>
                <Image source={loginImage} style={style.loginImage} />
                {/* <Image source={appLogoAuth} style={style.header} /> */}
            </View>
            <View style={style.loginCard}>
                <Text style={style.heading}>LOGIN/SIGN UP</Text>
                <Text style={style.footerText}>We will send one time OTP password on your{"\n"}mobile number</Text>
                <CustomInputBox iconPath={require('../../assets/icons/phone.png')} onChange={(e) => setPhone(e)}  keyboardType='phone-pad' maxLength={10} width={width-40} hint='Enter your mobile number' />
                <CustomButton loader={loader} marginTop={20} marginBottom={20}  width={width-40} title='Continue' onPress={requestOtp} />
            </View>
        </ImageBackground>
    )
}

const style = StyleSheet.create({
    main: {
        flex: 1, alignItems: 'center',
        paddingTop: 20,
        justifyContent: 'space-between'

    },
    footerText: {
        color: '#666666',
        fontWeight: '400',
        textAlign: 'center',
        marginVertical:10
    },
    loginCard: {
        backgroundColor: COLORS.LIGHT_ORANGE,
        flex: 0.35,
        alignItems: 'center',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 20,
        width: width
    },
    loginImage: {
        width: width -60, height: height * 0.23, resizeMode: 'contain',marginTop:-50
    },
    heading: {
        fontSize: 20,
        color: '#333333',
        fontWeight: '700'
    },
    header: {
        width: width - 20, height: 70, resizeMode: 'contain',
    }
});

export default Login