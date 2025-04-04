import { View, Text, ImageBackground, Image, StyleSheet, TouchableOpacity, ScrollView, TouchableOpacityBase } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { USER_CONFIG } from '../../../../constants/conig';
import { URLS } from '../../../../constants/URLS';
import { apiBaseHelper } from '../../../../Network/ApiBaseHelper';
import { COLORS, width } from '../../../../Utilities/Constants';
import CustomInputBox from '../../../__Common__/AppInputBox/CustomInputBox';
import GenderFropDown from '../../../../components/common/GenderFropDown';
import MarriedFropDown from '../../../../components/common/MarriedDropDown';
import CustomButton from '../../../__Common__/Buttons/CustomButton';
import CalenderPopup from '../../../../components/common/Calender';
import UserListModal from '../../../../components/common/UserListModal';
import LineButton from '../../../__Common__/Buttons/LineButton';
import { SVG_XML } from '../../../../constants/Svg_xml';
import SvgIcon from '../../../../components/common/SvgIcon';
import SideBar from '../../../../components/common/DrawerBar';
const background = require('../../../../assets/Images/bg-welcome.jpg');
const userPlaceholder = require('../../../../assets/Images/pictures.png')
const appLogoAuth = require('../../../../assets/Images/header_image.png');
type Props = {}

const RelativeAdd = (props: Props) => {
    const userListRef=useRef();
    const drawerRef=useRef();
    const navigation=useNavigation();
    const [loader,setLoader]=useState(false)
    const calenderRef=useRef();
    const [members,setMembers]=useState([]);
    const [userAddress,setUserAddress]=useState('')
    const [user,setUser]=useState({
        full_name:"",
        email:"",
        phone:"",
        age:"",
        address:userAddress,
        gender:"",
        occupation:"",
        married:""
    })
    const handleUser=(type:string,value:string)=>{
        setUser({...user,[type]:value})
    }

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
            setUserAddress(profile.data.data[0]?.address)
            
        } catch (error) {
            console.log(error);
        }finally{
            setLoader(false)
        }
    }

    const addUser=()=>{
        user.address=userAddress
        setMembers([...members,user])
        setUser({
            full_name:"",
            email:"",
            phone:"",
            age:"",
            address:userAddress,
            gender:"",
            occupation:"",
            married:""
        })
    }
    const handleErrer=()=>{
        try {
            if(!user.full_name)
                throw "Enter name";
            if(!user.email)
                throw "Enter Email";
            if(!user.phone)
                throw "Enter Phone";
            if(!user.age)
                throw "Enter Age";
            // if(!user.address)
            //     throw "Select Address";
            if(!user.occupation)
                throw "Enter Occupution";
            if(!user.gender)
                throw "Select Gender";
            if(!user.married)
                throw "Select Marital Status";
            addUser();

        } catch (error) {
            alert(error);
        }
    }
    return (
        <ImageBackground source={background} style={style.container}>
            <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
                <TouchableOpacity onPress={()=>drawerRef.current.openDrawer()} style={style.drawerBox}>
                    <SvgIcon svgXmlData={SVG_XML.HAMBURER} size={25} />
                </TouchableOpacity>
                {/* <SvgIcon svgXmlData={SVG_XML.OPTION_BLACK}  size={25} /> */}
                <Image source={appLogoAuth} style={{
                    width: width - 100, height: 100, resizeMode: 'contain',
                }} />
            </View>

            <View style={style.createCard}>
                <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
                    <Text style={style.heading}>Add Relative</Text>
                    <View style={style.userImage}>
                    </View>
                    <CustomInputBox value={user.full_name} iconPath={require('../../../../assets/icons/user.png')} onChange={(e) => { handleUser("full_name",e) }} hint='Name' width={width - 70} keyboardType='default' />
                    <CustomInputBox value={user.email} iconPath={require('../../../../assets/icons/phone_tel.png')} onChange={(e) => { handleUser("email",e) }} hint='Email' width={width - 70} keyboardType='default' marginTop={20} />
                    <CustomInputBox value={user.phone} iconPath={require('../../../../assets/icons/phone_tel.png')} onChange={(e) => { handleUser("phone",e) }} maxLength={10} hint='Phone' width={width - 70} keyboardType='numeric' marginTop={20} />
                    <TouchableOpacity onPress={()=>calenderRef.current.openOptions()} style={{height:50,borderRadius:10,width:width-70,marginVertical:5,justifyContent:"center",backgroundColor:'white',paddingHorizontal:15}} >
                        <Text style={{color:"grey"}}>{user.age?user.age:"Age"}</Text>
                    </TouchableOpacity>
                    <CustomInputBox isEditable={false} value={userAddress?userAddress:user.address} iconPath={require('../../../../assets/icons/Address_location.png')} onChange={(e) => {  }} hint='Address' multiLine={true} width={width - 70} keyboardType='default' marginTop={20} />
                    <CustomInputBox value={user.occupation} iconPath={require('../../../../assets/icons/Address_location.png')} onChange={(e) => { handleUser("occupation",e) }} hint='Occupation' multiLine={false} width={width - 70} keyboardType='default' marginTop={20} />
                    <GenderFropDown defalutValue={user.gender} getGender={(value:any)=>handleUser("gender",value)} />
                    <MarriedFropDown defalutValue={user.married} getMarried={(value:any)=>handleUser("married",value)} />
                    <CustomButton borderRadius={10} title='Add' width={width - 70} onPress={handleErrer} marginTop={20} marginBottom={10} />
                    {
                        members.length>0 && 
                        <LineButton
                            title='Save'
                            onPress={()=>userListRef.current.openOptions()}
                            style={{width:width - 70,borderRadius:5,marginBottom:10}}
                            isCenter={true}
                            titleColor={COLORS.MAIN_APP}
                        />
                        // <CustomButton title='Save' width={width - 70} onPress={()=>userListRef.current.openOptions()} marginBottom={20} />
                    }
                </ScrollView>
            </View>
            <CalenderPopup onPress={date=>{
                handleUser("age",new Date(date).toLocaleDateString())
                calenderRef.current.closeOptions()
            }} maxDate={new Date()} minDate={""} ref={calenderRef} />
            <UserListModal userArray={members} clearMembers={()=>{
                setMembers([])
                setUser({
                    full_name:"",
                    email:"",
                    phone:"",
                    age:"",
                    address:userAddress,
                    gender:"",
                    occupation:"",
                    married:""
                })
            }} ref={userListRef} />
            <SideBar ref={drawerRef} />
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
    },
    drawerBox:{
        width:40,
        height:40,
        borderRadius:4,
        alignItems:"center",
        justifyContent:"center",
        position:"absolute",
        left:-40
    },
    container:{
        flex:1,
        backgroundColor:COLORS.LIGHT_ORANGE,
        alignItems:"center",
        // justifyContent:"flex-end"
    },
})
export default RelativeAdd