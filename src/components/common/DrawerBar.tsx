import {
  View,
  Text,
  Dimensions,
  Animated,
  StyleSheet,
  Image,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React, {
  Children,
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import CustomButton from '../../Screens/__Common__/Buttons/CustomButton';
import {useNavigation} from '@react-navigation/native';
import LineButton from '../../Screens/__Common__/Buttons/LineButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {USER_CONFIG} from '../../constants/conig';
import {GlobalVariable} from '../../../App';
import {COLORS} from '../../Utilities/Constants';

const {width, height} = Dimensions.get('window');

const SideBar = forwardRef((props, ref) => {
  const {setProfileDone} = useContext(GlobalVariable);
  const navigation = useNavigation();

  const animated = new Animated.Value(0);
  const opacity = new Animated.Value(0);
  useImperativeHandle(ref, () => ({
    openDrawer() {
      Animated.timing(animated, {
        toValue: width,
        duration: 500,
        useNativeDriver: true,
      }).start();
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    },
    closeDrawer() {
      Animated.timing(animated, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
      Animated.timing(opacity, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    },
  }));
  const closeDrawer = () => {
    Animated.timing(animated, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
    Animated.timing(opacity, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };
  const logout = async () => {
    await AsyncStorage.removeItem(USER_CONFIG.PROFILE_DONE);
    await AsyncStorage.removeItem(USER_CONFIG.TOKEN_DETAILS);
    await AsyncStorage.removeItem(USER_CONFIG.USER_ID);
    setProfileDone();
  };
  return (
    <Animated.View
      onStartShouldSetResponder={closeDrawer}
      style={[
        {transform: [{translateX: animated}], opacity: opacity},
        styles.animtedView,
      ]}>
      <View style={styles.innerView}>
        <Pressable onPress={() => navigation.navigate('Tabs' as never)}>
          <View style={[styles.style_small_circle, {backgroundColor: 'white'}]}>
            <Image
              source={require('../../assets/Images/home_active.png')}
              style={{
                width: 20,
                height: 20,
                resizeMode: 'contain',
                tintColor: COLORS.MAIN_APP,
              }}
            />
          </View>
        </Pressable>
        <LineButton
          title="Add Relative"
          onPress={() => navigation.navigate('RelativeAdd' as never)}
          style={{
            width: '100%',
            borderRadius: 5,
            marginTop: -10,
            marginBottom: 10,
            paddingHorizontal: 10,
            borderWidth: 0,
            borderBottomWidth: 1,
          }}
        />
        <LineButton
          title="About Us"
          onPress={() => navigation.navigate('About' as never)}
          style={{
            width: '100%',
            borderRadius: 5,
            marginBottom: 10,
            paddingHorizontal: 10,
            borderWidth: 0,
            borderBottomWidth: 1,
          }}
        />
        <LineButton
          title="Content"
          onPress={() => navigation.navigate('Content' as never)}
          style={{
            width: '100%',
            borderRadius: 5,
            marginBottom: 10,
            paddingHorizontal: 10,
            borderWidth: 0,
            borderBottomWidth: 1,
          }}
        />
        <LineButton
          title="Committee Members"
          onPress={() => navigation.navigate('CommiteeMembers' as never)}
          style={{
            width: '100%',
            borderRadius: 5,
            marginBottom: 10,
            paddingHorizontal: 10,
            borderWidth: 0,
            borderBottomWidth: 1,
          }}
        />
        <LineButton
          title="Bussiness Directory"
          onPress={() => navigation.navigate('BussinessDirectory' as never)}
          style={{
            width: '100%',
            borderRadius: 5,
            marginBottom: 10,
            paddingHorizontal: 10,
            borderWidth: 0,
            borderBottomWidth: 1,
          }}
        />
        <LineButton
          title="Logout"
          onPress={logout}
          style={{
            width: '100%',
            borderRadius: 5,
            marginBottom: 10,
            paddingHorizontal: 10,
            borderWidth: 0,
            borderBottomWidth: 1,
          }}
        />
      </View>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  animtedView: {
    height,
    width: width,
    alignItems: 'flex-start',
    position: 'absolute',
    left: -width,
    zIndex: 2000,
  },
  innerView: {
    paddingTop: 55,
    backgroundColor: 'white',
    height,
    width: (2 * width) / 3.5,
    alignItems: 'center',
    zIndex: 1000,
  },
  style_small_circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: 'white',
    backgroundColor: 'white',
  },
});
export default SideBar;
