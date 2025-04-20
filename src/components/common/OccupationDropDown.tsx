import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomDropDown from './CustomDropDown'
import { width } from '../../Utilities/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { USER_CONFIG } from '../../constants/conig';
import { apiBaseHelper } from '../../Network/ApiBaseHelper';
import { URLS } from '../../constants/URLS';

type dropdownprops={
    getMarried:(value:any)=>void,
    defalutValue:string,
    style?:object
}
const OccupationDropDown = ({getOccupation,defalutValue,style}:dropdownprops) => {
    const [open,setOpen]=useState(false);
    const [value,setValue]=useState<string>('')
    const [items, setItems] = useState([]);
    useEffect(()=>{
        setValue(defalutValue?defalutValue:"Select Occupation")
    },[])

    useEffect(()=>{
        getOccupationData();
    },[]);
    const getOccupationData=async()=>{
        try {
            const token=await AsyncStorage.getItem(USER_CONFIG.TOKEN_DETAILS);
            const occupations=await apiBaseHelper.get(URLS.GET_OCCUPATION,token);
            if(occupations.error) 
                throw occupations.data;
            // console.log(occupations?.data?.data,'als')
            const formattedOccupations = occupations?.data?.data.map((occupation:any) => ({
                label: occupation.name, 
                value: occupation.name,
            }));
            setItems(formattedOccupations);
        } catch (error) {
            console.log(error)
        }
    }

    return (
      <CustomDropDown
        open={open}
        childrenStle={{}}
        title={value}
        style={{width: width - 70, marginTop: 12, ...style}}
        onpress={() => setOpen(prev => !prev)}>
        {items.map((item, index) => (
          <TouchableOpacity
            onPress={() => {
              setOpen(false);
              setValue(item.label);
              getOccupation(item.value);
            }}>
            <Text style={{fontSize: 12, color: 'black', padding: 10}}>
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </CustomDropDown>
    );
}

export default OccupationDropDown