import { View, Text, ImageBackground, Image, StyleSheet, TouchableOpacity, ScrollView, TouchableOpacityBase } from 'react-native'
import React, { useContext, useRef, useState } from 'react'
import { COLORS, height, width } from '../../Utilities/Constants';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import CustomInputBox from '../__Common__/AppInputBox/CustomInputBox';
import CustomButton from '../__Common__/Buttons/CustomButton';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { USER_CONFIG } from '../../constants/conig';
import { apiBaseHelper } from '../../Network/ApiBaseHelper';
import { URLS } from '../../constants/URLS';
import { GlobalVariable } from '../../../App';
import GenderFropDown from '../../components/common/GenderFropDown';
import MarriedFropDown from '../../components/common/MarriedDropDown';
import CalenderPopup from '../../components/common/Calender';
import AddNewImage from '../../components/common/ImagePickerComp';
import moment from 'moment';
import OccupationDropDown from '../../components/common/OccupationDropDown';
const background = require('../../assets/Images/bg-welcome.jpg');
const userPlaceholder = require('../../assets/Images/pictures.png')
const appLogoAuth = require('../../assets/Images/header_image.png');
type Props = {}

const SignUp = (props: Props) => {
    const {setProfileDone}=useContext(GlobalVariable)
    const [loader,setLoader]=useState(false)
    const calenderRef=useRef();
    const calenderRef1=useRef();
    const [name, setName] = useState<string>();
    const [phone, setPhone] = useState<string>();
    const [age, setAge] = useState<string>();
    const [gotra, setGotra] = useState<string>();
    const [address, setAddress] = useState<string>();
    const [gender, setgender] = useState<string>();
    const [occupation, setOccupation] = useState<string>();
    const [married, setmarried] = useState<string>();
    const [anniversary, setanniversary] = useState<string>();

    const updateUserdata=async()=>{
        try {
            setLoader(true)
            const token=await AsyncStorage.getItem(USER_CONFIG.TOKEN_DETAILS);
            const userId=await AsyncStorage.getItem(USER_CONFIG.USER_ID);
            const user=await apiBaseHelper.post(URLS.COMPETE_PROFILE,{id:parseInt(userId),full_name:name,email:phone,gender:gender,occupation:occupation,age:age,gotra:gotra,address:address,married:married},token);
            if(user.data.status!=200){
                throw user.data;
            }
            console.log(user.data.data.isProfileCompleted)
            await AsyncStorage.setItem(USER_CONFIG.PROFILE_DONE,user.data.data.isProfileCompleted.toString());
            setProfileDone()
        } catch (error) {
            console.log(error,"ee");
        }finally{
            setLoader(false)
        }
    }
    const handleErrer=()=>{
        try {
            if(!name)
                throw "Enter name";
            if(!phone)
                throw "Enter Email";
            if(!age)
                throw "Enter Age";
            if(!gotra)
                throw "Enter Gotra";
            if(!address)
                throw "Select Address";
            if(!occupation)
                throw "Enter Occupution";
            if(!gender)
                throw "Select Gender";
            if(!married)
                throw "Select Marital Status";
            updateUserdata()

        } catch (error) {
            alert(error);
        }
    }
    return (
        <ImageBackground source={background} style={{ flex: 1, paddingTop: 10 }}>
            <Image source={appLogoAuth} style={{
                width: width - 60, height: 70, resizeMode: 'contain',alignSelf:"center"
            }} />

            <View style={style.createCard}>
                <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
                    <Text style={style.heading}>CREATE ACCOUNT</Text>
                    <AddNewImage imageData={''} setSelectedImage={(value)=>console.log(value)} />
                    <CustomInputBox iconPath={require('../../assets/icons/user.png')} onChange={(e) => { setName(e) }} hint='Name' width={width - 70} keyboardType='default' />
                    <CustomInputBox iconPath={require('../../assets/icons/phone_tel.png')} onChange={(e) => { setPhone(e) }} hint='Email' width={width - 70} keyboardType='default' marginTop={20} />
                    <TouchableOpacity onPress={()=>calenderRef.current.openOptions()} style={{height:50,borderRadius:10,width:width-70,marginVertical:5,justifyContent:"center",backgroundColor:'white',paddingHorizontal:15}} >
                        <Text style={{color:"grey"}}>{age?age:"Age"}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>calenderRef1.current.openOptions()} style={{height:50,borderRadius:10,width:width-70,marginVertical:5,justifyContent:"center",backgroundColor:'white',paddingHorizontal:15}} >
                        <Text style={{color:"grey"}}>{anniversary?anniversary:"Anniversary"}</Text>
                    </TouchableOpacity>
                    <CustomInputBox iconPath={require('../../assets/icons/gotra.png')} onChange={(e) => { setGotra(e) }} hint='Gotra' width={width - 70} keyboardType='default' marginTop={20} />
                    <CustomInputBox iconPath={require('../../assets/icons/Address_location.png')} onChange={(e) => { setAddress(e) }} hint='Address' multiLine={true} width={width - 70} keyboardType='default' marginTop={20} />
                    {/* <CustomInputBox iconPath={require('../../assets/icons/Address_location.png')} onChange={(e) => { setgender(e) }} hint='Gender' multiLine={false} width={width - 70} keyboardType='default' marginTop={20} /> */}
                    {/* <CustomInputBox iconPath={require('../../assets/icons/Address_location.png')} onChange={(e) => { setOccupation(e) }} hint='Occupation' multiLine={false} width={width - 70} keyboardType='default' marginTop={20} /> */}
                    <GenderFropDown defalutValue={''} getGender={(value:any)=>setgender(value)} />
                    <MarriedFropDown defalutValue={''} getMarried={(value:any)=>setmarried(value)} />
                    <OccupationDropDown defalutValue={""} getOccupation={(value:any)=>setOccupation(value)} />
                    <CustomButton loader={loader} title='CONTINUE' width={width - 70} onPress={handleErrer} marginTop={20} marginBottom={20} />
                </ScrollView>
            </View>
            <CalenderPopup onPress={date=>{
                setAge(moment(date).format("DD/MM/YYYY"))
                calenderRef.current.closeOptions()
            }} maxDate={new Date()} minDate={""} ref={calenderRef} />

            <CalenderPopup onPress={date=>{
                    setanniversary(moment(date).format("DD/MM/YYYY"))
                    calenderRef1.current.closeOptions()
                }} maxDate={new Date()} minDate={""} ref={calenderRef1} />

        </ImageBackground>
    )
}
const style = StyleSheet.create({
    createCard: {
        alignItems: 'center',
        flex: 1, backgroundColor: COLORS.LIGHT_ORANGE,  borderTopLeftRadius: 30,
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
export default SignUp