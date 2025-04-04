import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomDropDown from './CustomDropDown'
import { width } from '../../Utilities/Constants';

type dropdownprops={
    getMarried:(value:any)=>void,
    defalutValue:string,
    style?:object
}
const MarriedFropDown = ({getMarried,defalutValue,style}:dropdownprops) => {
    const [open,setOpen]=useState(false);
    const [value,setValue]=useState<string>('')
    const [items, setItems] = useState([
        {label: 'Married', value: 'Married'},
        {label: 'Unmarried', value: 'Unmarried'},
    ]);
    useEffect(()=>{
        setValue(defalutValue?defalutValue:"Marital Status")
    },[])

    return (
        <CustomDropDown open={open} childrenStle={{}} title={value} style={{width:width-70,marginTop:12,...style}} >
            {
                items.map((item,index)=>(
                    <TouchableOpacity onPress={()=>{
                        setOpen(false)
                        setValue(item.label)
                        getMarried(item.value)
                    }}>
                        <Text style={{ fontSize: 12, color: 'black',padding:10 }}>
                            {item.label}
                        </Text>
                    </TouchableOpacity>
                ))
            }
        </CustomDropDown>
    )
}

export default MarriedFropDown