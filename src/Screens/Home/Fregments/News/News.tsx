import { View, Text, ScrollView, StyleSheet, ActivityIndicator, RefreshControl } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { USER_CONFIG } from '../../../../constants/conig'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { apiBaseHelper } from '../../../../Network/ApiBaseHelper'
import { URLS } from '../../../../constants/URLS'
import NewsCard from '../../../../components/news/NewsCard'
import { COLORS, width } from '../../../../Utilities/Constants'
import { useNavigation } from '@react-navigation/native'
import { isScrollviewCloseToBottom } from '../../../../Utilities/scrollHandler'

type Props = {}
let TOTAL_PAGES=1

const News = (props: Props) => {
    const [refreshing, setRefreshing] = React.useState(false);
    const [loadMore,setLoadMore]=useState(false);

    const onRefresh = useCallback(async() => {
        setRefreshing(true);
        await getAllNews()
        setRefreshing(false);
    }, []);

    const navigation=useNavigation();
    const [news,setNews]=useState([]);
    const [page,setPage]=useState(1);
    const [loader,setLoader]=useState(true)

    useEffect(()=>{
        getAllNews()
    },[])

    const getAllNews=async()=>{
        try {
            setLoader(true);
            const token=await AsyncStorage.getItem(USER_CONFIG.TOKEN_DETAILS);
            const response=await apiBaseHelper.get(URLS.GET_NEWS,token,{page:page});
            if(response.data.status != 200){
                throw response.data.data
            }
            setNews(response?.data?.data?.news)   
            TOTAL_PAGES=response?.data?.data?.pagination?.totalPages
        } catch (error) {
            console.log(error)
        }finally{
            setLoader(false);
        }
    }
    const retrieveMore=async()=>{
        setLoadMore(true)
        let count=page;
        count++;
        try {
            const token=await AsyncStorage.getItem(USER_CONFIG.TOKEN_DETAILS);
            const response=await apiBaseHelper.get(URLS.GET_NEWS,token,{page:count});
            if(response.data.status != 200){
                throw response.data.data
            }
            setNews([...news,...response?.data?.data?.news]);
            setPage(response?.data?.data?.pagination.page);
        } catch (error) {
            console.log(error)
        }finally{
            setLoadMore(false)
        }
    }
    return (
        <View style={styles.container}>
            <Text style={{color:"white",backgroundColor:COLORS.MAIN_APP,padding:20,fontWeight:"bold",fontSize:20}}>News</Text>
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
                    } contentContainerStyle={{flexWrap:'wrap',flexDirection:"row",alignItems:"center",justifyContent:"space-around"}} 
                >
                    {
                        news.length>0 &&
                        news.map((item)=>(
                            <NewsCard onPress={()=>navigation.navigate("NewsDetail" as never,{news:item})} image={item.image} name={item.title} date={new Date(item.created_at).toLocaleDateString()}/>
                        ))
                    }
                    {
                        loadMore && <ActivityIndicator size={30} color={COLORS.MAIN_APP} style={{marginBottom:50}} />
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
export default News