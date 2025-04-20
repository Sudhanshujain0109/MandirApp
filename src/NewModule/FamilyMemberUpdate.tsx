import {
  View,
  Text,
  ImageBackground,
  Image,
  StyleSheet,
  ScrollView,
  ToastAndroid,
  Pressable,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CalenderPopup from '../components/common/Calender';
import GenderFropDown from '../components/common/GenderFropDown';
import MarriedFropDown from '../components/common/MarriedDropDown';
import {USER_CONFIG} from '../constants/conig';
import {URLS} from '../constants/URLS';
import {apiBaseHelper} from '../Network/ApiBaseHelper';
import CustomInputBox from '../Screens/__Common__/AppInputBox/CustomInputBox';
import CustomButton from '../Screens/__Common__/Buttons/CustomButton';
import {width, COLORS} from '../Utilities/Constants';
import BackButton from '../components/common/BackButton';

const background = require('../assets/Images/bg-welcome.jpg');
const appLogoAuth = require('../assets/Images/header_image.png');

const FamilyMemberUpdate = () => {
  const calenderRef = useRef();
  const navigation = useNavigation();
  const route = useRoute();
  const {familyMember} = route.params || {}; // 👈 Get existing family member data

  const [user, setUser] = useState({
    full_name: '',
    email: '',
    phone: '',
    age: '',
    address: '',
    gender: '',
    occupation: '',
    married: '',
  });

  useEffect(() => {
    if (familyMember) {
      setUser(familyMember);
    }
  }, [familyMember]);

  const handleUser = (type: string, value: string) => {
    setUser({...user, [type]: value});
  };

  const handleUpdate = async () => {
    try {
      if (!user.full_name) throw 'Enter name';
      if (!user.email) throw 'Enter Email';
      if (!user.phone) throw 'Enter Phone';
      if (!user.age) throw 'Enter Age';
      if (!user.occupation) throw 'Enter Occupation';
      if (!user.gender) throw 'Select Gender';
      if (!user.married) throw 'Select Marital Status';

      const token = await AsyncStorage.getItem(USER_CONFIG.TOKEN_DETAILS);
      const payload = {
        ...user,
        id: familyMember?.id, // 👈 Include ID to update the right member
      };

      const res = await apiBaseHelper.post(URLS.UPDATE_MEMBER, payload, token);
      if (res?.data?.status === 200) {
        ToastAndroid.show('Member updated successfully', ToastAndroid.SHORT);
        setTimeout(() => {
          navigation.goBack();
        }, 1000); 
      }
    } catch (err) {
      ToastAndroid.show(err?.message, ToastAndroid.SHORT);
    }
  };

  return (
    <ImageBackground source={background} style={style.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 40,
        }}>
        <BackButton />
        <Image
          source={appLogoAuth}
          style={{
            width: width - 100,
            height: 100,
            resizeMode: 'contain',
            marginLeft: 20,
          }}
        />
      </View>

      <View style={style.createCard}>
        <ScrollView contentContainerStyle={{alignItems: 'center'}}>
          <Text style={style.heading}>Update Relative</Text>

          <Text style={style.label}>Full Name</Text>
          <CustomInputBox
            value={user.full_name}
            iconPath={require('../assets/icons/user.png')}
            onChange={e => handleUser('full_name', e)}
            hint="Name"
            width={width - 70}
          />
          <Text style={style.label}>Email</Text>
          <CustomInputBox
            value={user.email}
            iconPath={require('../assets/icons/phone_tel.png')}
            onChange={e => handleUser('email', e)}
            hint="Email"
            width={width - 70}
            marginTop={20}
          />
          <Text style={style.label}>Phone</Text>
          <CustomInputBox
            value={user.phone}
            iconPath={require('../assets/icons/phone_tel.png')}
            onChange={e => handleUser('phone', e)}
            hint="Phone"
            width={width - 70}
            marginTop={20}
            keyboardType="numeric"
            maxLength={10}
          />
          <Text style={style.label}>D.O.B</Text>
          <Pressable
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
            <Text style={{color: 'grey'}}>{user.age ? user.age : 'Age'}</Text>
          </Pressable>
          <Text style={style.label}>Address</Text>
          <CustomInputBox
            isEditable={false}
            value={user.address}
            iconPath={require('../assets/icons/Address_location.png')}
            onChange={() => {}}
            hint="Address"
            multiLine={true}
            width={width - 70}
            marginTop={20}
          />
          <Text style={style.label}>Occupation</Text>
          <CustomInputBox
            value={user.occupation}
            iconPath={require('../assets/icons/Address_location.png')}
            onChange={e => handleUser('occupation', e)}
            hint="Occupation"
            width={width - 70}
            marginTop={20}
          />
          <Text style={style.label}>Gender</Text>
          <GenderFropDown
            defalutValue={user?.gender}
            getGender={(val: any) => handleUser('gender', val)}
          />
          <Text style={style.label}>Marital Status</Text>
          <MarriedFropDown
            defalutValue={user?.married}
            getMarried={(val: any) => handleUser('married', val)}
          />

          <CustomButton
            title="Save"
            onPress={handleUpdate}
            width={width - 70}
            marginTop={20}
            marginBottom={20}
          />
        </ScrollView>
      </View>

      <CalenderPopup
        onPress={date => {
          handleUser('age', new Date(date).toLocaleDateString());
          calenderRef.current.closeOptions();
        }}
        maxDate={new Date()}
        ref={calenderRef}
        minDate={''}
      />
    </ImageBackground>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.LIGHT_ORANGE,
    alignItems: 'center',
  },
  drawerBox: {
    width: 40,
    height: 40,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: -40,
  },
  createCard: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: COLORS.LIGHT_ORANGE,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    width,
    marginTop: 20,
  },
  heading: {
    fontSize: 20,
    marginTop: 15,
    fontWeight: '700',
    color: 'black',
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginTop: 12,
  },
});

export default FamilyMemberUpdate;
