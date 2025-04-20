import { View, Text, ImageBackground, Image, ScrollView, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native'
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
import BackButton from '../../../../components/common/BackButton';
import { useNavigation } from '@react-navigation/native';
const background = require('../../../../assets/Images/bg-welcome.jpg');
const appLogoAuth = require('../../../../assets/Images/header_image.png');

type Props = {};

const Profile = (props: Props) => {
  const calenderRef = useRef();
  const calenderRef1 = useRef();
  const [profile, setProfile] = useState<object | null>(null);
  const [loader, setLoader] = useState(false);
  const { setProfileDone } = useContext(GlobalVariable);
    const navigation = useNavigation();

  useEffect(() => {
    getProfile();
  }, []);
  const getProfile = async () => {
    try {
      const id = await AsyncStorage.getItem(USER_CONFIG.USER_ID);
      const token = await AsyncStorage.getItem(USER_CONFIG.TOKEN_DETAILS);
      const profile = await apiBaseHelper.get(URLS.GET_USER_PROFILE, token, {
        id: id,
      });
      if (profile.data.status != 200) {
        throw profile.data;
      }
      setProfile(profile.data.data[0]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };
  const updateProfile = async () => {
    try {
      setLoader(true);
      const id = await AsyncStorage.getItem(USER_CONFIG.USER_ID);
      const token = await AsyncStorage.getItem(USER_CONFIG.TOKEN_DETAILS);
      const data = {
        id: id,
        full_name: profile.full_name,
        email: profile.email,
        gender: profile.gender,
        occupation: profile.occupation,
        age: profile.age,
        gotra: profile.gotra,
        address: profile.address,
        married: profile.married,
        anni: profile.anni,
        image: profile.image?.filePath ?? profile.image
      };
      // data.append("file",profile.image);

      const response = await apiBaseHelper.post(
        URLS.COMPETE_PROFILE,
        data,
        token,
      );
      if (response?.data?.status === 200) {
        ToastAndroid.show('Member updated successfully', ToastAndroid.SHORT);
        setTimeout(() => {
          navigation.goBack();
        }, 1000);
      } else {
        throw response.data;
      }
      setProfile(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };
  const handleErrer = () => {
    try {
      if (!profile.full_name) throw 'Enter name';
      if (!profile.email) throw 'Enter Email';
      if (!profile.gender) throw 'Enter Occupation';
      if (!profile.occupation) throw 'Enter Occupation';
      if (!profile.age) throw 'Select Age';
      if (!profile.gotra) throw 'Enter Gotra';
      if (!profile.address) throw 'Enter address';
      if (!profile.married) throw 'Enter married';
      if (!profile.married == 'Married' && !profile.anni)
        throw 'Enter Date of Marriage';
      updateProfile();
    } catch (error) {
      alert(error);
    }
  };
  const handleInput = (type: any, value: any) => {
    setProfile({...profile, [type]: value});
  };

  return (
    <ImageBackground source={background} style={{flex: 1, paddingTop: 50}}>
      <View style={{marginTop: 50, display: 'flex', flexDirection: 'row'}}>
        <BackButton />
        <Image
          source={appLogoAuth}
          style={{
            width: width - 60,
            height: 70,
            resizeMode: 'contain',
            alignSelf: 'center',
          }}
        />
      </View>

      <View style={style.createCard}>
        {
          <ScrollView contentContainerStyle={{alignItems: 'center'}}>
            <Text style={style.heading}>PROFILE ACCOUNT</Text>
            {/* <Text style={style.subtitle}>Welcome Please enter your details</Text> */}
            <AddNewImage
              imageData={profile?.image}
              setSelectedImage={value => handleInput('image', value)}
            />
            <Text style={style.label}>Full Name</Text>
            <CustomInputBox
              isEditable={true}
              value={profile && profile?.full_name}
              iconPath={require('../../../../assets/icons/user.png')}
              onChange={e => handleInput('full_name', e)}
              hint="Name"
              width={width - 70}
              keyboardType="default"
            />
            <Text style={style.label}>Email</Text>
            <CustomInputBox
              isEditable={true}
              value={profile && profile?.email}
              iconPath={require('../../../../assets/icons/phone_tel.png')}
              onChange={e => handleInput('email', e)}
              hint="Email"
              width={width - 70}
              keyboardType="phone-pad"
              marginTop={20}
            />
            <Text style={style.label}>D.O.B</Text>{' '}
            <TouchableOpacity
              onPress={() => calenderRef.current.openOptions()}
              style={{
                height: 50,
                borderRadius: 10,
                width: width - 70,
                marginVertical: 5,
                justifyContent: 'center',
                backgroundColor: 'white',
                paddingHorizontal: 15,
              }}>
              <Text style={{color: 'black'}}>{profile && profile.age}</Text>
            </TouchableOpacity>
            <Text style={style.label}>Gotra</Text>
            <CustomInputBox
              isEditable={true}
              value={profile && profile?.gotra}
              iconPath={require('../../../../assets/icons/gotra.png')}
              onChange={e => handleInput('gotra', e)}
              hint="Gotra"
              width={width - 70}
              keyboardType="default"
              marginTop={20}
            />
            <Text style={style.label}>Address</Text>
            <CustomInputBox
              isEditable={true}
              value={profile && profile?.address}
              iconPath={require('../../../../assets/icons/Address_location.png')}
              onChange={e => handleInput('address', e)}
              hint="Address"
              multiLine={true}
              width={width - 70}
              keyboardType="default"
              marginTop={20}
            />
            {/* <CustomInputBox isEditable={true} value={profile?.gender} iconPath={require('../../../../assets/icons/Address_location.png')} onChange={(e) =>handleInput("gender",e)} hint='Gender' multiLine={false} width={width - 70} keyboardType='default' marginTop={20} /> */}
            {profile && (
              <>
                <Text style={style.label}>Gender</Text>
                <GenderFropDown
                  defalutValue={profile?.gender}
                  getGender={(value: any) => handleInput('gender', value)}
                />
                <Text style={style.label}>Marital Status</Text>
                <MarriedFropDown
                  defalutValue={profile?.married}
                  getMarried={(value: any) => handleInput('married', value)}
                />
                <Text style={style.label}>Occupation</Text>
                <OccupationDropDown
                  defalutValue={profile?.occupation}
                  getOccupation={(value: any) =>
                    handleInput('occupation', value)
                  }
                />
              </>
            )}
            <Text style={style.label}>Anniversary Date</Text>{' '}
            {profile && profile?.married === 'Married' && (
              <TouchableOpacity
                onPress={() => calenderRef1.current.openOptions()}
                style={{
                  height: 50,
                  borderRadius: 10,
                  width: width - 70,
                  marginVertical: 5,
                  justifyContent: 'center',
                  backgroundColor: 'white',
                  paddingHorizontal: 15,
                }}>
                <Text style={{color: 'black'}}>
                  {profile.anni ? profile.anni : 'Select Anniversary Date'}
                </Text>
              </TouchableOpacity>
            )}
            <CustomButton
              loader={loader}
              title="Edit Done"
              width={width - 70}
              onPress={handleErrer}
              marginTop={20}
              marginBottom={10}
            />
          </ScrollView>
        }
        <CalenderPopup
          onPress={date => {
            handleInput('age', moment(date).format('DD/MM/YYYY'));
            calenderRef.current.closeOptions();
          }}
          maxDate={new Date()}
          minDate={''}
          ref={calenderRef}
        />

        <CalenderPopup
          onPress={date => {
            handleInput('anni', moment(date).format('DD/MM/YYYY'));
            calenderRef1.current.closeOptions();
          }}
          maxDate={new Date()}
          minDate={''}
          ref={calenderRef1}
        />
      </View>
    </ImageBackground>
  );
};
const style = StyleSheet.create({
  createCard: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: COLORS.LIGHT_ORANGE,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    width,
    marginTop: 20,
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
    color: 'black',
  },
  subtitle: {
    color: 'gray',
    marginTop: 5,
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginTop: 12,
  },
});
export default Profile