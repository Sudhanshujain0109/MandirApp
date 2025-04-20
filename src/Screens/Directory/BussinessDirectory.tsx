import { FlatList, StyleSheet, Text, View,Image, Pressable, TouchableOpacity, ImageBackground, ScrollView, Linking } from 'react-native'
import React, {useEffect, useRef, useState} from 'react';
import {SVG_XML} from '../../constants/Svg_xml';
import SvgIcon from '../../components/common/SvgIcon';
import {COLORS, height, width} from '../../Utilities/Constants';
import SideBar from '../../components/common/DrawerBar';
import CustomInputBox from '../__Common__/AppInputBox/CustomInputBox';
import CustomButton from '../__Common__/Buttons/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {USER_CONFIG} from '../../constants/conig';
import {apiBaseHelper} from '../../Network/ApiBaseHelper';
import {URLS} from '../../constants/URLS';
import UserCard from '../../components/Profile/userCard';
import SmallUserCard from '../../components/Profile/UserSmallCard';
import AdsCard from '../../components/common/AdsCard';
import FamilyMemberCard from '../../NewModule/FamilyMemberCard';
import CustomDropDown from '../../components/common/CustomDropDown';
const appLogoAuth = require('../../assets/Images/logo-welcome-screen.png');
const background = require('../../assets/Images/bg-welcome.jpg');

const BussinessDirectory = () => {
  const drawerRef = useRef();
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState([]);
  const [occupationList, setOccupationList] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string>('Select Occupation');

  useEffect(() => {
    getOccupationData();
  }, []);
  const getOccupationData = async () => {
    try {
      const token = await AsyncStorage.getItem(USER_CONFIG.TOKEN_DETAILS);
      const occupations = await apiBaseHelper.get(
        URLS.GET_OCCUPATION,
        token,
      );
      if (occupations.error) throw occupations.data;
      const formattedOccupations = occupations?.data?.data.map(
        (occupation: any) => ({
          label: occupation.name,
          value: occupation.name,
        }),
      );
      setOccupationList(formattedOccupations);
    } catch (error) {
      console.log(error);
    }
  };

  const searchData = async () => {
    try {
      if (value === 'Select Occupation') return;

      setLoader(true);
      const token = await AsyncStorage.getItem(USER_CONFIG.TOKEN_DETAILS);
      const result = await apiBaseHelper.get(URLS.SEARCH_BY_OCCUPATION, token, {
        query: value,
      });
      if (result.error) throw result;
      setData(result.data.data);
      console.log(result.data.data);
    } catch (error) {
      console.log(error?.data?.response?.data);
      setData([]);
    } finally {
      setLoader(false);
    }
  };

  return (
    <ImageBackground source={background} style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          onPress={() => drawerRef.current.openDrawer()}
          style={styles.drawerBox}>
          <SvgIcon svgXmlData={SVG_XML.HAMBURER} size={25} />
        </TouchableOpacity>
        {/* <SvgIcon svgXmlData={SVG_XML.OPTION_BLACK}  size={25} /> */}
        <Image
          source={appLogoAuth}
          style={{
            width: width - 100,
            height: 100,
            resizeMode: 'contain',
          }}
        />
      </View>
      <ScrollView
        style={styles.loginCard}
        contentContainerStyle={{alignItems: 'center', paddingBottom: 40}}>
        <Text
          style={{
            color: COLORS.MAIN_APP,
            fontWeight: '700',
            textAlign: 'center',
            padding: 10,
          }}>
          Search in Business Directory
        </Text>
        <CustomDropDown
          open={open}
          childrenStle={{}}
          title={value}
          style={{width: width - 70, marginTop: 12}}
          onpress={() => setOpen(prev => !prev)}>
          {occupationList.map((item, index) => (
            <TouchableOpacity
              onPress={() => {
                setOpen(false);
                setValue(item.label);
              }}>
              <Text style={{fontSize: 12, color: 'black', padding: 10}}>
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </CustomDropDown>
        <CustomButton
          loader={loader}
          title="Continue"
          width={width - 50}
          onPress={searchData}
          marginTop={20}
          marginBottom={10}
        />
        {data?.length > 0 && data.map(item => <FamilyMemberCard user={item} />)}
      </ScrollView>
      <SideBar ref={drawerRef} />
    </ImageBackground>
  );
};

export default BussinessDirectory

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:COLORS.LIGHT_ORANGE,
        alignItems:"center",
        // justifyContent:"flex-end"
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
    icon:{
        width:25,
        height:25
    },
    loginCard: {
        backgroundColor: COLORS.LIGHT_ORANGE,
        // flex: 0.35,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 20,
        width: width,
        height:height-180
    },
})