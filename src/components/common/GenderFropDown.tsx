import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomDropDown from './CustomDropDown'
import { width } from '../../Utilities/Constants';

type dropdownprops={
    getGender:(value:any)=>void,
    defalutValue:string
}
const GenderFropDown = ({getGender,defalutValue}:dropdownprops) => {
    const [open,setOpen]=useState(false);
    const [value,setValue]=useState<string>('')
    const [items, setItems] = useState([
        {label: 'Male', value: 'Male'},
        {label: 'Female', value: 'Female'},
    ]);
    useEffect(() => {
        setValue(defalutValue ? defalutValue : 'Select gender');
    }, [defalutValue]);
    
    return (
      <CustomDropDown
        open={open}
        childrenStle={{borderRadius: 10}}
        title={value}
        style={{width: width - 70}}
        onpress={() => setOpen(prev => !prev)}>
        {items.map((item, index) => (
          <TouchableOpacity
            onPress={() => {
              setOpen(false);
              setValue(item.label);
              getGender(item.value);
            }}>
            <Text style={{fontSize: 12, color: 'black', padding: 10}}>
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </CustomDropDown>
    );
}

export default GenderFropDown