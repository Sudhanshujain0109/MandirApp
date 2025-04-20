import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomDropDown from './CustomDropDown'
import { width } from '../../Utilities/Constants'

type dropdownprops={
    getGender:(value:any)=>void,
    defalutValue:string
}
const ContentDropDown = ({getGender,defalutValue}:dropdownprops) => {
    const [open,setOpen]=useState(false);
    const [value,setValue]=useState<string>('')
    const [items, setItems] = useState([
        {label: 'about', value: 'about'},
        {label: 'terms', value: 'terms'},
        {label: 'privacy', value: 'privacy'},
    ]);
    useEffect(()=>{
        setValue(defalutValue?defalutValue:"Select Content Type")
    },[])

    return (
      <CustomDropDown
        open={open}
        childrenStle={{borderRadius: 6}}
        title={value}
        style={{width: width - 40, borderWidth: 1, borderColor: 'grey'}}
        onpress={() => setOpen(prev => !prev)}>
        {items.map((item, index) => (
          <TouchableOpacity
            onPress={() => {
              setOpen(!open);
              setValue(item.label);
              getGender(item.value);
            }}>
            <Text
              style={{
                fontSize: 14,
                color: 'black',
                paddingVertical: 8,
                paddingHorizontal: 0,
              }}>
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </CustomDropDown>
    );
}

export default ContentDropDown