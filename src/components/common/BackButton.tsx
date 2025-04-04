import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import SvgIcon from './SvgIcon';
import { SVG_XML } from '../../constants/Svg_xml';

const BackButton = () => {
    const navigation=useNavigation();
    return (
        <TouchableOpacity
            onPress={() => {
                navigation.goBack()
            }}
            style={{}}
        >
            <SvgIcon fill='white'  svgXmlData={SVG_XML.BACK_BUTTON} size={20}/>
        </TouchableOpacity>
    )
}

export default BackButton