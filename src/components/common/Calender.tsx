import { View, Text, Dimensions, Animated, StyleSheet,Image,TouchableOpacity, ToastAndroid, Modal, Pressable, TextInput } from 'react-native'
import React,{forwardRef,useEffect,useImperativeHandle,  useState} from 'react';
import CalendarPicker from 'react-native-calendar-picker';
import { width } from '../../Utilities/Constants';

type calenderProp={
    onPress:(date:any)=>void,
    minDate:Date|string,
    maxDate:Date|string
}

const CalenderPopup = forwardRef(({onPress,minDate=new Date(),maxDate=new Date()}:calenderProp, ref) => {
    const [openPopup,setOpenPopup]=useState(false);

    useImperativeHandle(ref, () => ({
        openOptions() {
            setOpenPopup(true)
        },
        closeOptions(){
            setOpenPopup(false)
        }
    }));
    return (
        <Modal visible={openPopup} animationType='slide' transparent={true} onRequestClose={()=>setOpenPopup(false)}>
            <View onStartShouldSetResponder={()=>setOpenPopup(false)} style={styles.modeOuter}>
                <View style={styles.innnerModel}>
                    <CalendarPicker
                        style={{position:"absolute"}}
                        startFromMonday={true}
                        allowRangeSelection={false}
                        weekdays={['Mon','Tue','Wed','Thur','Fri','Sat','Sun']}
                        months={['January','Febraury','March','April','May','June','July','August','September','October','November','December',]}
                        previousTitle="Previous"
                        nextTitle="Next"
                        textStyle={{
                            fontFamily: 'Cochin',
                            color: '#000000',
                        }}
                        onDateChange={(date:any)=>onPress(date)}
                        maxDate={maxDate}
                        minDate={minDate}
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
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    innnerModel: {
        backgroundColor: 'white',
        borderTopLeftRadius: 10,
        borderTopRightRadius:10,
        width: width,
        paddingBottom: 20,
        elevation: 10,
        shadowColor: "white",
        alignItems:"center",
        paddingTop:15,
        padding:20
    },
})
export default CalenderPopup