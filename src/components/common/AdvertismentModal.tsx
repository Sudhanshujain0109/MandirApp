import { View, Text, Dimensions, Animated, StyleSheet,Image,TouchableOpacity, ToastAndroid, Modal, Pressable, TextInput, Linking } from 'react-native'
import React,{forwardRef,useEffect,useImperativeHandle,  useState} from 'react';
import SvgIcon from './SvgIcon';
import { SVG_XML } from '../../constants/Svg_xml';

const {width,height}=Dimensions.get("window");

const AdsModal = forwardRef((props, ref) => {
    const [openPopup,setOpenPopup]=useState(true);
    useImperativeHandle(ref, () => ({
        openOptions() {
            setOpenPopup(true)
        },
        closeOptions(){
            setOpenPopup(false)
        }
    }));
    // useEffect(()=>{
        setTimeout(() => {
            setOpenPopup(false);
        }, 5000);
    // },[])
    return (
        <Modal visible={openPopup} animationType='fade' transparent={true} onRequestClose={()=>setOpenPopup(false)}>
            <View  style={styles.modeOuter}>
                <View style={styles.innnerModel}>
                    {/* <TouchableOpacity onPress={()=>setOpenPopup(false)} style={styles.cross}>
                        <SvgIcon svgXmlData={SVG_XML.CROSS} size={15} />
                    </TouchableOpacity> */}
                    <Image 
                        style={{width:'100%',height:'100%',resizeMode:"cover"}}
                        source={{uri:"https://cdn0.weddingwire.in/vendor/7634/3_2/960/jpg/22851911-1460257434090355-2462524299648797081-n_15_77634.jpeg"}}
                    />
                </View>
            </View>
        </Modal>
    )
})

const styles=StyleSheet.create({
    modeOuter: {
        backgroundColor: '#000000aa',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    innnerModel: {
        backgroundColor: 'white',
        width: width,
        // paddingBottom: 20,
        elevation: 10,
        shadowColor: "white",
        height:height
    },
    cross:{
        backgroundColor:'#9D9D9D',
        width:35,
        height:35,
        borderRadius:35/2,
        alignItems:'center',
        justifyContent:"center",
        position:"absolute",
        right:20,
        top:20,
        zIndex:1000
    }
})
export default AdsModal