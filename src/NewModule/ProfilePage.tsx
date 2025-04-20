import { View, Text, StyleSheet, Image, TextInput, FlatList, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS } from '../Utilities/Constants'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiBaseHelper } from '../Network/ApiBaseHelper';
import { URLS } from '../constants/URLS';
import { USER_CONFIG } from '../constants/conig';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import FamilyMemberCard from './FamilyMemberCard';

const ProfilePage = () => {
  const [profile, setProfile] = useState<any | null>(null);
  const [family, setFamily] = useState<any | null>(null);
  const [loader, setLoader] = useState(false);
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  useEffect(() => {
    if (isFocused) {
      getProfile();
      getFamily();
    }
  }, [isFocused]);


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
      console.log(profile.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };
  const getFamily = async () => {
    try {
      const id = await AsyncStorage.getItem(USER_CONFIG.USER_ID);
      const token = await AsyncStorage.getItem(USER_CONFIG.TOKEN_DETAILS);
      const profile = await apiBaseHelper.get(URLS.GET_USER_FAMILY, token, {
        id: id,
      });
      if (profile.data.status != 200) {
        throw profile.data;
      }
      setFamily(profile.data.data);
      console.log(profile.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };
  return (
    <ScrollView>
      <View style={styles.container}>
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
        <Image
          source={{uri: `http://172.105.56.136:8080/Images/${profile?.image}`}}
          style={{
            width: 150,
            aspectRatio: 1,
            borderRadius: 100,
            marginTop: 20,
            alignSelf: 'center',
            resizeMode: 'contain',
          }}
        />
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
            renderItem={item => (
              <FamilyMemberCard
                user={item?.item}
                onPress={() =>
                  navigation.navigate('FamilyMemberUpdate', {
                    familyMember: item.item,
                  })
                }
              />
            )}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems:'center',
    paddingHorizontal: 15,
    paddingVertical: 40,
    backgroundColor: COLORS.TAB_INACTIVE_ICON,
  },
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
});
export default ProfilePage