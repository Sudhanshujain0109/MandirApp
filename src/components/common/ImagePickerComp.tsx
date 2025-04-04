import { View, Text, Image, TouchableOpacity, Pressable, Platform } from 'react-native'
import React, { useState } from 'react'
import ImagePicker from 'react-native-image-crop-picker';

type props={
    setSelectedImage:(value:object)=>void,
    imageData:string
}
const AddNewImage = ({setSelectedImage,imageData}:props) => {
    
    const [path,setPath]=useState(imageData)
    const pickImage = async () => {
        ImagePicker.openPicker({
            width: 400,
            height: 250,
            cropping: true
        }).then((image:any) => {
            setPath(image.path)
            // setSelectedImage(image)
            setSelectedImage({ filename: image.path.split("/")[image.path.split("/").length-1], type: 'image/png', filePath: Platform.OS==='ios'?image.path:image.path });
        }).catch(e=>console.log(e))
    };
    return (
        <TouchableOpacity 
            disabled={true}
            onPress={pickImage}
            style={{
                height: 100,
                marginTop: 20,
                marginBottom: 20,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: path?"transparent":'rgba(208,137,90,0.7)',
                width: 100,
                borderRadius: 100,
            }}
        >
            <Image style={{width:100,aspectRatio:1,borderRadius:100,resizeMode:'contain'}} source={{uri:path}} />
        </TouchableOpacity>
    )
}

export default AddNewImage