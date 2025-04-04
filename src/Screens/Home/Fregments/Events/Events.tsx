import { View, Text, StyleSheet, ScrollView, ActivityIndicator, RefreshControl } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { apiBaseHelper } from '../../../../Network/ApiBaseHelper';
import { URLS } from '../../../../constants/URLS';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { USER_CONFIG } from '../../../../constants/conig';
import { COLORS } from '../../../../Utilities/Constants';
import EventCard from '../../../../components/Home/EventCard';
import { useNavigation } from '@react-navigation/native';
import { isScrollviewCloseToBottom } from '../../../../Utilities/scrollHandler';

type Props = {}
let TOTAL_PAGES=1

const Events = (props: Props) => {
    const [refreshing, setRefreshing] = React.useState(false);
    const [loadMore,setLoadMore]=useState(false);

    const onRefresh = useCallback(async() => {
        setRefreshing(true);
        await getAllEvents()
        setRefreshing(false);
    }, []);
    
    const navigation=useNavigation();
    const [events,setEvents]=useState([]);
    const [page,setPage]=useState(1);
    const [loader,setLoader]=useState(true)

    useEffect(()=>{
        getAllEvents()
    },[])

    const getAllEvents=async()=>{
        try {
            const token=await AsyncStorage.getItem(USER_CONFIG.TOKEN_DETAILS);
            const response=await apiBaseHelper.get(URLS.GET_EVETS,token,{page:page});
            if(response.data.status != 200){
                throw response.data.data
            }
            setEvents(response?.data?.data?.events)
            TOTAL_PAGES=response?.data?.data?.pagination?.totalPages
        } catch (error) {
            console.log(error)
        }finally{
            setLoader(false)
        }
    }
    const retrieveMore=async()=>{
        setLoadMore(true)
        let count=page;
        count++;
        try {
            const token=await AsyncStorage.getItem(USER_CONFIG.TOKEN_DETAILS);
            const response=await apiBaseHelper.get(URLS.GET_EVETS,token,{page:count});
            if(response.data.status != 200){
                throw response.data.data
            }
            setEvents([...events,...response?.data?.data?.events]);
            setPage(response?.data?.data?.pagination.page);
        } catch (error) {
            console.log(error)
        }finally{
            setLoadMore(false)
        }
    }
    return (
        <View style={styles.container}>
            {/* <Text style={{color:"black"}}>{events.length}</Text> */}
            <Text style={{color:"white",backgroundColor:COLORS.MAIN_APP,padding:20,fontWeight:"bold",fontSize:20}}>Events</Text>
            {
                loader ?<ActivityIndicator size={30} color={COLORS.MAIN_APP} style={{marginTop:10}} />:
                <ScrollView 
                    onMomentumScrollEnd={({ nativeEvent }) => {
                        if (isScrollviewCloseToBottom(nativeEvent) && TOTAL_PAGES>page) {
                            retrieveMore();
                        }
                    }}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    } 
                >
                    {
                        events.length>0 &&
                        events.map((item)=>(
                            <EventCard desc={item?.description} onPress={()=>navigation.navigate("EventDetail",{event:item})} image={item.image} name={item.name} date={new Date(item.start_date).toLocaleDateString()} time={new Date(item.start_date).toLocaleTimeString()}/>
                        ))
                    }
                    {
                        loadMore && <ActivityIndicator size={30} color={COLORS.MAIN_APP} />
                    }
                </ScrollView>
            }
        </View>
    )
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:COLORS.TAB_INACTIVE_ICON
    }
})
export default Events