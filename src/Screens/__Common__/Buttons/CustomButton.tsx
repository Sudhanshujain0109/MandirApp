import { ActivityIndicator, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../../Utilities/Constants'
import { Double } from 'react-native/Libraries/Types/CodegenTypes';
const { width, height } = Dimensions.get("window");

type ButtonProps = {
    title: string,
    bgColor?: string,
    width?: Double,
    marginTop?: Double,
    marginBottom?: Double,
    txtColor?: string,
    onPress?: () => void,
    borderRadius?: number,
    loader?:boolean,
    style?:object
}

const CustomButton = (props: ButtonProps) => {
    const { title, bgColor = COLORS.MAIN_APP, txtColor = COLORS.TAB_INACTIVE_ICON, onPress, borderRadius = 20,loader=false } = props
    return (
        <TouchableOpacity style={[styles.button, { marginTop: props.marginTop, marginBottom: props.marginBottom, width: props.width ?? width, backgroundColor: bgColor, borderRadius: borderRadius },{...props.style}]} onPress={props.onPress}>
            {
                loader?<ActivityIndicator size={20} color={"white"} />:
                <Text style={[styles.buttonText, { color: txtColor }]}>{title}</Text>
            }
        </TouchableOpacity>
    )
}

export default CustomButton

const styles = StyleSheet.create({
    button: {
        width: width,
        alignItems: 'center',
        justifyContent: "center",
        paddingVertical: 3,
        alignSelf: "center",
        height:45
    },
    buttonText: {
        fontWeight: '600',
        fontSize: 16
    }
})