import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import React from 'react';
import { width } from '../Utilities/Constants';

type user = {
    user: object;
    onPress?: Function
};
const FamilyMemberCard = ({user,onPress}: user) => {
  return (
    <Pressable style={styles.card} onPress={() => onPress && onPress()}>
      <View style={{flex: 1}}>
        <Text style={styles.text}>{user?.full_name}</Text>
        <Text style={styles.subtext}>{user?.phone}</Text>
      </View>
      <Text style={styles.subtext}>{user?.gender}</Text>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  card: {
    width: width - 40,
    padding: 10,

    backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius: 10,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
  },
  text: {
    color: 'black',
    fontWeight: '500',
  },
  subtext: {
    color: 'gray',
    fontWeight: '400',
  },
});
export default FamilyMemberCard;
