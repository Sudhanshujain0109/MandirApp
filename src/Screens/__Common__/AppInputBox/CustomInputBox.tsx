import { View, Image, TextInput, KeyboardTypeOptions,ImageSourcePropType } from 'react-native'
import { inputBoxStyle } from './InputBox.style'
import { Double } from 'react-native/Libraries/Types/CodegenTypes'
import { useState } from 'react'

type Props = {
    hint: string,
    width?: Double,
    marginBottom?: number,
    marginTop?: number,
    maxLength?: number,
    onChange: (e: string) => void
    multiLine?: boolean,
    keyboardType?: KeyboardTypeOptions,
    height?:Double,
    iconPath?:ImageSourcePropType,
    value?:string,
    isEditable?:boolean

}

const CustomInputBox = (props: Props) => {
    const [multiLineState, setMultiState] = useState<number>(80);
    return (
        <View style={[inputBoxStyle.main,{flexDirection:"row",alignItems:'center',height:50,borderRadius:10,width:props.width,justifyContent:"center"}]}>
            {/* <Image source={props.iconPath} style={{width:12,height:50,resizeMode:"contain"}} /> */}
            <TextInput editable={props.isEditable} value={props.value} onChangeText={(e) => {
                const newHeight = Math.max(15, e.split('\n').length * 20);
                setMultiState(newHeight)
                props.onChange(e);
            }}  
            keyboardType={props.keyboardType ?? 'email-address'} 
            multiline={props.multiLine} 
            maxLength={props.maxLength} 
            placeholder={props.hint} 
            style={[ 
                { 
                    textAlignVertical: props.multiLine ? 'top' : 'center', 
                    flex:1,
                    color:"black",
                }]} 
            placeholderTextColor='rgba(48,48,48,0.5)'/>
        </View>
    )
}

export default CustomInputBox