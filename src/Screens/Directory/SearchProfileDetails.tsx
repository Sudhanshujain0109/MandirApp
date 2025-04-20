import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  FlatList,
  ScrollView,
  ImageBackground,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import FamilyMemberCard from '../../NewModule/FamilyMemberCard';
import {useIsFocused} from '@react-navigation/native';
import {COLORS, width} from '../../Utilities/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {USER_CONFIG} from '../../constants/conig';
import {URLS} from '../../constants/URLS';
import {apiBaseHelper} from '../../Network/ApiBaseHelper';
import BackButton from '../../components/common/BackButton';
const background = require('../../assets/Images/bg-welcome.jpg');
const appLogoAuth = require('../../assets/Images/header_image.png');

const SearchProfileDetails = ({route}: any) => {
  const [profile, setProfile] = useState<any | null>(null);
  const [family, setFamily] = useState<any | null>(null);
  const [loader, setLoader] = useState(false);
  const isFocused = useIsFocused();
  const {user} = route.params;

  useEffect(() => {
    if (isFocused) {
      getFamily();
    }
  }, [isFocused]);

  useEffect(() => setProfile(user), [user]);

  const getFamily = async () => {
    try {
      const token = await AsyncStorage.getItem(USER_CONFIG.TOKEN_DETAILS);
      const familyProfile = await apiBaseHelper.get(
        URLS.GET_USER_FAMILY,
        token,
        {
          id: user.id,
        },
      );
      if (familyProfile.data.status != 200) {
        throw familyProfile.data;
      }
      setFamily(familyProfile.data.data);
    } catch (error) {
      console.log(error);
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
          marginTop: 40,
        }}>
        <BackButton />
        <Image
          source={appLogoAuth}
          style={{
            width: width - 100,
            height: 100,
            resizeMode: 'contain',
            marginLeft: 40,
          }}
        />
      </View>

      <View style={styles.createCard}>
        <ScrollView>
          <Text
            style={{
              fontSize: 17,
              color: 'black',
              alignSelf: 'center',
              fontWeight: 'bold',
            }}>
            {' '}
            {profile?.full_name ?? 'No Name'}
          </Text>
          {profile?.image && (
            <Image
              source={{
                uri: `http://172.105.56.136:8080/Images/${profile?.image}`,
              }}
              style={{
                width: 150,
                aspectRatio: 1,
                borderRadius: 100,
                marginTop: 20,
                alignSelf: 'center',
                resizeMode: 'contain',
              }}
            />
          )}
          <View style={{marginTop: 10}}>
            <Text style={{color: 'black', marginBottom: 8, fontSize: 16}}>
              Email
            </Text>
            <TextInput
              placeholder="Email"
              value={profile?.email ?? ''}
              placeholderTextColor={'black'}
              style={{
                color: 'black',
                borderWidth: 1,
                borderRadius: 12,
                padding: 10,
                borderColor: 'gray',
              }}
              editable={false}
            />
          </View>
          <View style={{marginTop: 10}}>
            <Text style={{color: 'black', marginBottom: 8, fontSize: 16}}>
              Phone
            </Text>
            <TextInput
              placeholder="Phone"
              value={profile?.phone ?? ''}
              placeholderTextColor={'black'}
              style={{
                color: 'black',
                borderWidth: 1,
                borderRadius: 12,
                padding: 10,
                borderColor: 'gray',
              }}
              editable={false}
            />
          </View>
          <View style={{marginTop: 10}}>
            <Text style={{color: 'black', marginBottom: 8, fontSize: 16}}>
              D.O.B
            </Text>
            <TextInput
              placeholder="D.O.B"
              value={profile?.age ?? ''}
              placeholderTextColor={'black'}
              style={{
                color: 'black',
                borderWidth: 1,
                borderRadius: 12,
                padding: 10,
                borderColor: 'gray',
              }}
              editable={false}
            />
          </View>
          <View style={{marginTop: 10}}>
            <Text style={{color: 'black', marginBottom: 8, fontSize: 16}}>
              Gotra
            </Text>
            <TextInput
              placeholder="Gotra"
              value={profile?.gotra ?? ''}
              placeholderTextColor={'black'}
              style={{
                color: 'black',
                borderWidth: 1,
                borderRadius: 12,
                padding: 10,
                borderColor: 'gray',
              }}
              editable={false}
            />
          </View>
          <View style={{marginTop: 10}}>
            <Text style={{color: 'black', marginBottom: 8, fontSize: 16}}>
              Gender
            </Text>
            <TextInput
              placeholder="Gender"
              value={profile?.gender ?? ''}
              placeholderTextColor={'black'}
              style={{
                color: 'black',
                borderWidth: 1,
                borderRadius: 12,
                padding: 10,
                borderColor: 'gray',
              }}
              editable={false}
            />
          </View>

          <View style={{marginTop: 10}}>
            <Text style={{color: 'black', marginBottom: 8, fontSize: 16}}>
              Family Members
            </Text>
            <FlatList
              data={family}
              renderItem={item => <FamilyMemberCard user={item?.item} />}
            />
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  //   container: {
  //     flex: 1,
  //     // alignItems:'center',
  //     paddingHorizontal: 15,
  //     paddingVertical: 40,
  //     backgroundColor: COLORS.TAB_INACTIVE_ICON,
  //   },
  tableHeader: {
    flexDirection: 'row',
    marginBottom: 5,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingBottom: 5,
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'center',
  },
  //   cell: {
  //     flex: 1,
  //     fontSize: 14,
  //     color: 'black',
  //   },
  headerText: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.LIGHT_ORANGE,
    // justifyContent:"flex-end"
  },
  createCard: {
    flex: 1,
    backgroundColor: COLORS.LIGHT_ORANGE,
    paddingBottom: 40,
    paddingHorizontal: 20,
    width: width,
  },
});
export default SearchProfileDetails;
