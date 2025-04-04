import { View, Text, ImageBackground, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { USER_CONFIG } from '../../../../constants/conig';
import { apiBaseHelper } from '../../../../Network/ApiBaseHelper';
import { URLS } from '../../../../constants/URLS';
import { COLORS, width } from '../../../../Utilities/Constants';
import CustomInputBox from '../../../__Common__/AppInputBox/CustomInputBox';
import CustomButton from '../../../__Common__/Buttons/CustomButton';
import { GlobalVariable } from '../../../../../App';
import GenderFropDown from '../../../../components/common/GenderFropDown';
import MarriedFropDown from '../../../../components/common/MarriedDropDown';
import CalenderPopup from '../../../../components/common/Calender';
import AddNewImage from '../../../../components/common/ImagePickerComp';
import moment from 'moment';
import OccupationDropDown from '../../../../components/common/OccupationDropDown';
const background = require('../../../../assets/Images/bg-welcome.jpg');
const appLogoAuth = require('../../../../assets/Images/header_image.png');

type Props = {}

const Profile = (props: Props) => {
    const calenderRef=useRef();
    const calenderRef1=useRef();
    const [profile, setProfile] = useState<object | null>(null);
    const [loader,setLoader]=useState(false);
    const {setProfileDone}=useContext(GlobalVariable)

    useEffect(()=>{
        getProfile();
    },[])
    const getProfile=async()=>{
        try {
            const id=await AsyncStorage.getItem(USER_CONFIG.USER_ID);
            const token=await AsyncStorage.getItem(USER_CONFIG.TOKEN_DETAILS);
            const profile=await apiBaseHelper.get(URLS.GET_USER_PROFILE,token,{id:id});
            if(profile.data.status != 200){
                throw profile.data;
            }
            setProfile(profile.data.data[0])
            
        } catch (error) {
            console.log(error);
        }finally{
            setLoader(false)
        }
    }
    const data=new FormData();
    const updateProfile=async()=>{
        try {
            setLoader(true)
            const id=await AsyncStorage.getItem(USER_CONFIG.USER_ID);
            const token=await AsyncStorage.getItem(USER_CONFIG.TOKEN_DETAILS);
            data.append("id",id);
            data.append("full_name",profile.full_name);
            data.append("email",profile.email);
            data.append("gender",profile.gender);
            data.append("occupation",profile.occupation);
            data.append("age",profile.age);
            data.append("gotra",profile.gotra);
            data.append("address",profile.address);
            data.append("married",profile.married);
            data.append("anni",profile.anniversary);
            // data.append("file",profile.image);
            
            const response=await apiBaseHelper.post(URLS.COMPETE_PROFILE,data,token);
            if(response.data.status != 200){
                throw response.data;
            }
            setProfile(response.data.data)
            // console.log(response.data.data)
        } catch (error) {
            console.log(error);
        }finally{
            setLoader(false)
        }
    }
    const handleErrer=()=>{
        try {
            if(!profile.full_name)
                throw "Enter name";
            if(!profile.email)
                throw "Enter Email";
            if(!profile.gender)
                throw "Enter Occupation";
            if(!profile.occupation)
                throw "Enter Occupation";
            if(!profile.age)
                throw "Select Age";
            if(!profile.gotra)
                throw "Enter Gotra";
            if(!profile.address)
                throw "Enter address";
            if(!profile.married)
                throw "Enter married";
            if(!profile.married == "Married" && !profile.anniversary)
                throw "Enter Date of Marriage";
            updateProfile()

        } catch (error) {
            alert(error);
        }
    }
    const handleInput=(type:any,value:any)=>{
        setProfile({...profile,[type]:value});
    }
    
    return (
        <ImageBackground source={background} style={{ flex: 1, paddingTop: 10 }}>
            <Image source={appLogoAuth} style={{
                width: width - 60, height: 70, resizeMode: 'contain',alignSelf:"center"
            }} />

            <View style={style.createCard}>
                {
                    <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
                        <Text style={style.heading}>PROFILE ACCOUNT</Text>
                        {/* <Text style={style.subtitle}>Welcome Please enter your details</Text> */}
                        <AddNewImage imageData={profile?.image} setSelectedImage={(value)=>handleInput("image",value)} />
                        <CustomInputBox isEditable={true} value={profile && profile?.full_name} iconPath={require('../../../../assets/icons/user.png')} onChange={(e) =>handleInput("full_name",e)} hint='Name' width={width - 70} keyboardType='default' />
                        <CustomInputBox isEditable={true} value={profile && profile?.email} iconPath={require('../../../../assets/icons/phone_tel.png')} onChange={(e) =>handleInput("email",e)} hint='Email' width={width - 70} keyboardType='phone-pad' marginTop={20} />
                        {/* <CustomInputBox isEditable={true} value={profile?.age?.toString()} iconPath={require('../../../../assets/icons/calender.png')} onChange={(e) =>handleInput("age",e)} hint='Age' width={width - 70} keyboardType='numeric' marginTop={20} /> */}
                        <TouchableOpacity onPress={()=>calenderRef.current.openOptions()} style={{height:50,borderRadius:10,width:width-70,marginVertical:5,justifyContent:"center",backgroundColor:'white',paddingHorizontal:15}} >
                            <Text style={{color:"black"}}>{profile && profile.age}</Text>
                        </TouchableOpacity>
                        <CustomInputBox isEditable={true} value={profile && profile?.gotra} iconPath={require('../../../../assets/icons/gotra.png')} onChange={(e) =>handleInput("gotra",e)} hint='Gotra' width={width - 70} keyboardType='default' marginTop={20} />
                        <CustomInputBox isEditable={true} value={profile && profile?.address} iconPath={require('../../../../assets/icons/Address_location.png')} onChange={(e) =>handleInput("address",e)} hint='Address' multiLine={true} width={width - 70} keyboardType='default' marginTop={20} />
                        {/* <CustomInputBox isEditable={true} value={profile?.gender} iconPath={require('../../../../assets/icons/Address_location.png')} onChange={(e) =>handleInput("gender",e)} hint='Gender' multiLine={false} width={width - 70} keyboardType='default' marginTop={20} /> */}
                        {
                            profile &&
                            <>
                                <GenderFropDown defalutValue={profile?.gender} getGender={(value:any)=>handleInput("gender",value)} />
                                <MarriedFropDown defalutValue={profile?.married} getMarried={(value:any)=>handleInput("married",value)} />
                                <OccupationDropDown defalutValue={profile?.occupation} getOccupation={(value:any)=>handleInput("occupation",value)} />
                            </>
                        }
                        {/* <CustomInputBox isEditable={true} value={profile && profile?.occupation} iconPath={require('../../../../assets/icons/Address_location.png')} onChange={(e) =>handleInput("occupation",e)} hint='Occupation' multiLine={false} width={width - 70} keyboardType='default' marginTop={20} /> */}
                        {
                            profile && profile?.married === "Married" && <TouchableOpacity onPress={()=>calenderRef1.current.openOptions()} style={{height:50,borderRadius:10,width:width-70,marginVertical:5,justifyContent:"center",backgroundColor:'white',paddingHorizontal:15}} >
                            <Text style={{color:"black"}}>{profile.anniversary ? profile.anniversary : "Select Anniversary Date"}</Text>
                            </TouchableOpacity>
                        }
                        <CustomButton loader={loader} title='Edit Done' width={width - 70} onPress={handleErrer} marginTop={20} marginBottom={10} />
                    </ScrollView>
                }
                <CalenderPopup onPress={date=>{
                    handleInput("age",moment(date).format("DD/MM/YYYY"))
                    calenderRef.current.closeOptions()
                }} maxDate={new Date()} minDate={""} ref={calenderRef} />
                
                <CalenderPopup onPress={date=>{
                    handleInput("anniversary",moment(date).format("DD/MM/YYYY"))
                    calenderRef1.current.closeOptions()
                }} maxDate={new Date()} minDate={""} ref={calenderRef1} />
            </View>
        </ImageBackground>
)
}
const style = StyleSheet.create({
    createCard: {
        alignItems: 'center',
        flex: 1, 
        backgroundColor: COLORS.LIGHT_ORANGE,  
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,width,
        marginTop:20
    },
    userImage: {
        height: 100,
        marginTop: 20,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(208,137,90,0.7)',
        width: 100,
        borderRadius: 100,
    },
    heading: {
        fontSize: 20,
        marginTop: 15,
        fontWeight: '700',
        color: 'black'
    },
    subtitle: {
        color: 'gray',
        marginTop: 5
    }
})
export default Profile