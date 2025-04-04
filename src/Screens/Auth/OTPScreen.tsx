import { View, Text, ImageBackground,Image,StyleSheet,TextInput,Keyboard } from 'react-native'
import React,{useContext, useRef, useState} from 'react'
import { COLORS, height, width } from '../../Utilities/Constants'
import CustomButton from '../__Common__/Buttons/CustomButton';
import { useNavigation, useRoute } from '@react-navigation/native';
import CustomInputBox from '../__Common__/AppInputBox/CustomInputBox';
import { apiBaseHelper } from '../../Network/ApiBaseHelper';
import { URLS } from '../../constants/URLS';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { USER_CONFIG } from '../../constants/conig';
import { GlobalVariable } from '../../../App';
const background = require('../../assets/Images/bg-welcome.jpg');
const appLogoAuth = require('../../assets/Images/header_image.png');

type Props = {}

const OTPScreen = (props: Props) => {
    const {setUserValue}=useContext(GlobalVariable);
    const route=useRoute();
    const navigation=useNavigation();
    const {phone}=route.params;
    
    const otpBox1 = useRef(null);
    const otpBox2 = useRef(null);
    const otpBox3 = useRef(null);
    const otpBox4 = useRef(null);
    const [otp,setOtp]=useState({1:'',2:'',3:'',4:''});
    const [loader,setLoader]=useState(false)


    function updatePositionBasedOnOtp(currentPosition:any,value:any){
        setOtp({...otp,[currentPosition]:value})
        if(currentPosition === 1){
            if(value)
                otpBox2.current.focus();
        }
        else if(currentPosition === 2){
            if(value)
                otpBox3.current.focus();
            else otpBox1.current.focus();
        }
        else if(currentPosition === 3){
            if(value)
                otpBox4.current.focus();
            else otpBox2.current.focus();
        }
        else if(currentPosition === 4){
            if(value)
                Keyboard.dismiss()
            else otpBox3.current.focus();
        }

    }

    const verifyOtp=async()=>{
        try {
            if(!otp['1'] || !otp['2'] || !otp['3'] ||!otp['4'])
                throw {message:"Enter OTP"}
            setLoader(true);
            let finalOtp=otp['1']+otp['2']+otp['3']+otp['4']
            const response=await apiBaseHelper.post(URLS.VERIFY_OTP,{phone:phone,otp:parseInt(finalOtp)},null)
            if(response.data.status != 200){
                throw response.data
            }
            await AsyncStorage.setItem(USER_CONFIG.PROFILE_DONE,response.data.data.isProfileCompleted.toString());
            await AsyncStorage.setItem(USER_CONFIG.TOKEN_DETAILS,response.data.token);
            await AsyncStorage.setItem(USER_CONFIG.USER_ID,response.data.data.id.toString())

            if(response.data.data.isProfileCompleted==0)
                navigation.navigate("SignUp" as never);
            else   {
                setUserValue(response.data.data)
            }
        } catch (error) {
            alert(error.message)
        }finally{
            setLoader(false);
        }
    }

    return (
        <ImageBackground source={background} style={{ flex: 1, paddingTop: 10,justifyContent:"space-between" }}>
            <Image source={appLogoAuth} style={{
                width: width - 60, height: 70, resizeMode: 'contain',alignSelf:"center"
            }} />
            <View style={styles.loginCard}>
                <Text style={styles.heading}>OTP VERIFICATIONP</Text>
                <Text style={[styles.footerText,{marginTop:0,textAlign: 'center',}]}>
                    Enter the OTP send to 1324657890
                </Text>
                <View style={styles.InputOTP}>
                <TextInput keyboardType='numeric' placeholderTextColor='grey' style={styles.OTPInput} onChangeText={(value:any)=>updatePositionBasedOnOtp(1,value)} maxLength={1} ref={otpBox1}/>
                <TextInput keyboardType='numeric' placeholderTextColor='grey' style={styles.OTPInput} onChangeText={(value:any)=>updatePositionBasedOnOtp(2,value)} maxLength={1} ref={otpBox2}/>
                <TextInput keyboardType='numeric' placeholderTextColor='grey' style={styles.OTPInput} onChangeText={(value:any)=>updatePositionBasedOnOtp(3,value)} maxLength={1} ref={otpBox3}/>
                <TextInput keyboardType='numeric' placeholderTextColor='grey' style={styles.OTPInput} onChangeText={(value:any)=>updatePositionBasedOnOtp(4,value)} maxLength={1} ref={otpBox4}/>
                </View>
                <CustomButton loader={loader} marginTop={20} marginBottom={20} width={width - 40} title='VERIFY OTP' onPress={verifyOtp} />
                <Text style={[styles.footerText,{color:COLORS.MAIN_APP,textAlign: 'right',}]}>Resend</Text>
            </View>
        </ImageBackground>
    )
}

const styles=StyleSheet.create({
    footerText: {
        color: 'gray',
        fontWeight: '600',
        width:width-60,
        fontSize:12
    },
    loginCard: {
        backgroundColor:COLORS.LIGHT_ORANGE,
        flex: 0.4,
        alignItems: 'center',

        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 20,
        width: width ,
        alignSelf:"center"
    },
    loginImage: {
        width: width / 2, height: height
         * 0.23, resizeMode: 'contain',
    },
    heading: {
        fontSize: 20,
        color: 'black',
        marginBottom: 20,
        fontWeight: '700'
    },
    InputOTP: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        width: "70%",
        marginHorizontal: 10,
        marginVertical:20
    },
    OTPInput: {
        borderRadius: 6,
        paddingHorizontal: 18,
        textAlign:'center',
        color:"black",
        backgroundColor:COLORS.TAB_INACTIVE_ICON,
        height:45,
        width:45,
    }
})
export default OTPScreen