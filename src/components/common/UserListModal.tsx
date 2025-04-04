import { View, Text, Dimensions, Animated, StyleSheet,Image,TouchableOpacity, ToastAndroid, Modal, Pressable, TextInput, Linking, ScrollView } from 'react-native'
import React,{forwardRef,useEffect,useImperativeHandle,  useState} from 'react';
import UserCard from '../Profile/userCard';
import CustomButton from '../../Screens/__Common__/Buttons/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { USER_CONFIG } from '../../constants/conig';
import { apiBaseHelper } from '../../Network/ApiBaseHelper';
import { URLS } from '../../constants/URLS';

const {width,height}=Dimensions.get("window");

type Props={
    userArray?:Array<object>,
    clearMembers:()=>void
}
const UserListModal = forwardRef(({userArray,clearMembers}:Props, ref) => {
    
    const [loader,setLoader]=useState(false);
    const [openPopup,setOpenPopup]=useState(false); 
    useImperativeHandle(ref, () => ({
        openOptions() {
            setOpenPopup(true)
        },
        closeOptions(){
            setOpenPopup(false)
        }
    }));
    const uploadUser=async()=>{
        try {
            setLoader(true)
            const token=await AsyncStorage.getItem(USER_CONFIG.TOKEN_DETAILS);
            const userId=await AsyncStorage.getItem(USER_CONFIG.USER_ID);
            const bodyObj={
                id:userId,
                members:userArray
            }
            const user=await apiBaseHelper.post(URLS.ADD_MEMBER,bodyObj,token);
            if(user.data.status!=200){
                throw user.data;
            }
            console.log(user.data);
            setOpenPopup(false);
            clearMembers()
            alert("User Added")
        } catch (error) {
            console.log(error);
            
            alert("Users not added, try again")
        }finally{
            setLoader(false);
        }
    }
    return (
        <Modal visible={openPopup} animationType='slide' transparent={true} onRequestClose={()=>setOpenPopup(false)}>
            <View style={styles.modeOuter}>
                <View style={styles.innnerModel}>
                    <ScrollView style={width}>
                        {
                            userArray?.length>0 &&
                            userArray?.map((item)=>(
                                <UserCard user={item} />
                            ))
                        }
                    </ScrollView>
                    <CustomButton loader={loader} title='Save' width={width - 70} onPress={uploadUser} marginTop={10} />
                </View>
            </View>
        </Modal>
    )
})

const styles=StyleSheet.create({
    modeOuter: {
        backgroundColor: '#000000aa',
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    innnerModel: {
        backgroundColor: 'white',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        width: width,
        paddingBottom: 20,
        elevation: 10,
        shadowColor: "white",
        padding:15,
        height,
    },
})
export default UserListModal