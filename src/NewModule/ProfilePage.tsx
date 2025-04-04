import { View, Text, StyleSheet, Image, TextInput, FlatList, ScrollView, FlatListProps } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { COLORS } from '../Utilities/Constants'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiBaseHelper } from '../Network/ApiBaseHelper';
import { URLS } from '../constants/URLS';
import { USER_CONFIG } from '../constants/conig';

const ProfilePage = () => {

  const [profile, setProfile] = useState<any | null>(null);
  const [family, setFamily] = useState<any | null>(null);
  const [loader,setLoader]=useState(false);

  useEffect(()=>{
    getProfile();
    getFamily()
},[])

const renderItem = useCallback(({item,index} : any)=>(<View style={{flex:1,padding:10,margin:5,backgroundColor:"red",display:'flex'}}><Text>Hello</Text></View>),[])
const getProfile=async()=>{
    try {
        const id=await AsyncStorage.getItem(USER_CONFIG.USER_ID);
        const token=await AsyncStorage.getItem(USER_CONFIG.TOKEN_DETAILS);
        const profile=await apiBaseHelper.get(URLS.GET_USER_PROFILE,token,{id:id});
        if(profile.data.status != 200){
            throw profile.data;
        }
        setProfile(profile.data.data[0])
        console.log(profile.data.data)
        
    } catch (error) {
        console.log(error);
    }finally{
        setLoader(false)
    }
}
const getFamily=async()=>{
    try {
        const id=await AsyncStorage.getItem(USER_CONFIG.USER_ID);
        const token=await AsyncStorage.getItem(USER_CONFIG.TOKEN_DETAILS);
        const profile=await apiBaseHelper.get(URLS.GET_USER_FAMILY,token,{id:id});
        if(profile.data.status != 200){
            throw profile.data;
        }
        setFamily(profile.data.data[0])
        console.log(profile.data.data)
        
    } catch (error) {
        console.log(error);
    }finally{
        setLoader(false)
    }
}
  return (
    <ScrollView>
      <View style={styles.container}>
      
      <Text style={{fontSize:17,color:"black",alignSelf:'center',fontWeight:"bold"}}> {profile?.name??"No Name"}</Text>
      <Image source={{uri:profile?.image?? "data:image/png;base64,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"}}
      style={{width:150,aspectRatio:1,borderRadius:100,marginTop:20 ,alignSelf:"center" ,resizeMode:'contain'}}
      />
     <View style={{marginTop:10}}>
     <Text style={{color:"black",marginBottom:8,fontSize:16}}>Email</Text>
     <TextInput placeholder='Email' value={profile?.email??""} placeholderTextColor={"black"} style={{color:"black",borderWidth:1,borderRadius:12,padding:10,borderColor:"gray"}} editable={false}/>    
       
     </View>
     <View style={{marginTop:10}}>
     <Text style={{color:"black",marginBottom:8,fontSize:16}}>Phone</Text>
     <TextInput placeholder='Phone' value={profile?.phone??""} placeholderTextColor={"black"} style={{color:"black",borderWidth:1,borderRadius:12,padding:10,borderColor:"gray"}} editable={false}/>    
       
     </View>
     <View style={{marginTop:10}}>
     <Text style={{color:"black",marginBottom:8,fontSize:16}}>D.O.B</Text>
     <TextInput placeholder='D.O.B' value={profile?.age??""} placeholderTextColor={"black"} style={{color:"black",borderWidth:1,borderRadius:12,padding:10,borderColor:"gray"}} editable={false}/>    
       
     </View>
     <View style={{marginTop:10}}>
     <Text style={{color:"black",marginBottom:8,fontSize:16}}>Gotra</Text>
     <TextInput placeholder='Gotra' value={profile?.gotra??""} placeholderTextColor={"black"} style={{color:"black",borderWidth:1,borderRadius:12,padding:10,borderColor:"gray"}} editable={false}/>    
       
     </View>
     <View style={{marginTop:10}}>
     <Text style={{color:"black",marginBottom:8,fontSize:16}}>Gender</Text>
     <TextInput placeholder='Gender' value={profile?.gender??""} placeholderTextColor={"black"} style={{color:"black",borderWidth:1,borderRadius:12,padding:10,borderColor:"gray"}} editable={false}/>    
       
     </View>

     <View style={{marginTop:10}}>
     <Text style={{color:"black",marginBottom:8,fontSize:16}}>Family Members</Text>
      <FlatList data={[1,2,3,4,5,6,7,8,9,0]} numColumns={3} scrollEnabled={false} renderItem={renderItem}/>
     </View>

     
       </View>
    </ScrollView>
  )
}

const styles=StyleSheet.create({
  
  container:{
      flex:1,
      // alignItems:'center',
      paddingHorizontal:15,
      paddingVertical:40,
      backgroundColor:COLORS.TAB_INACTIVE_ICON
  }
})
export default ProfilePage