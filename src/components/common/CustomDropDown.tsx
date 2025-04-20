import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ViewProps } from 'react-native'
import React, { useState, useEffect } from 'react'
import SvgIcon from './SvgIcon'
import { width } from '../../Utilities/Constants'
import { SVG_XML } from '../../constants/Svg_xml'

type DropDownProps={
    children?:ViewProps,
    onpress?:()=>void,
    title?:string,
    childrenStle?:object,
    open?:boolean,
    style?:object
}

const CustomDropDown = ({ children,onpress,title,style,childrenStle,open=false}:DropDownProps) => {
  
    return (
      <View style={[styles.expandableView, style]}>
        <TouchableOpacity onPress={onpress} style={styles.container}>
          <Text style={styles.loongtextStyle}>{title}</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={onpress}
              style={{transform: [{rotateZ: open ? '90deg' : '270deg'}]}}>
              <SvgIcon color="red" svgXmlData={SVG_XML.BACK_BUTTON} size={20} />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
        {open ? (
          <View style={[{width: children ? width - 80 : 0, borderRadius: 10}]}>
            {children}
          </View>
        ) : null}
      </View>
    );
}
const styles = StyleSheet.create({
    expandableView: {
        width: width - 100,
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: "white",
        alignSelf: "center",
        borderRadius: 10,
        marginVertical: 5,
    },
    container: {
        backgroundColor: 'white',
        width: '100%',
        height: 45,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 10,
        flexDirection: 'row',
        paddingHorizontal: 10,
        borderColor:'grey'
    },
    loongtextStyle:{
        color:'black',
        fontSize:14,
        width:'90%',
        alignSelf:"center",
    },
});
export default CustomDropDown;