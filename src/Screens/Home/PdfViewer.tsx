import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { useRoute } from '@react-navigation/native'
import Pdf from 'react-native-pdf';
import { COLORS, height, width } from '../../Utilities/Constants';
import LineButton from '../__Common__/Buttons/LineButton';
import RNFetchBlob from 'rn-fetch-blob';
import { COMMITTEE_MEMBERS, OTHER_MEMBERS } from '../../assets/data/Committee';
import CommitteeMemberBox from '../../components/Home/CommitteeMemberBox';
import BackButton from '../../components/common/BackButton';

const PdfViewer = () => {
    const route=useRoute();
    const {title,pdfSoutce}=route.params;
    const [loading,setLoading]=useState(false)

    const downloadPdf = () => {
        if(loading)
            return
        let date = new Date();
        const {config, fs} = RNFetchBlob;
        let downloadDir = fs.dirs.DownloadDir;
        let pathName=downloadDir + '/Mandir' + Math.floor(date.getTime() + date.getSeconds() / 2) + ".pdf"
        let options = {
            fileCache: true,
            addAndroidDownloads: {
                useDownloadManager: true,
                notification: true,
                path:pathName,
                description: 'Pdf',
            },
        };
        setLoading(true)
        config(options)
        .fetch('GET', 'http://172.105.56.136:8080/Images/form.pdf')
        .then((res:any) => {
            alert(`File downloded at\n${pathName.split("/")[pathName.split("/").length-2]}/${pathName.split("/")[pathName.split("/").length-1]}`)
        })
        .finally(()=>{
            setLoading(false)
        })
    };
    
    return (
        <View style={{ flex:1,backgroundColor:COLORS.TAB_INACTIVE_ICON}} >
        <View style={{backgroundColor:COLORS.MAIN_APP,padding:20,flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
            <View style={{flexDirection:"row",alignItems:"center"}} >
                <BackButton/>
                <Text style={{color:"white",fontWeight:"bold",fontSize:20,marginLeft:10}}>{title}</Text>
            </View>
            {
                title == "Booking" &&
                <LineButton
                    onPress={downloadPdf}
                    title='Download'
                    isCenter
                    style={{width:100,borderColor:"white",borderRadius:6}}
                    titleColor='white'
                    loader={loading}
                />
            }
        </View>
        {
            title == "Booking" && 
            <View style={{flexDirection:"row",flexWrap:"wrap",alignItems:"center",justifyContent:"space-around",paddingHorizontal:20}} >
                {
                    [OTHER_MEMBERS[3],COMMITTEE_MEMBERS[3]].map((item)=>(
                        <CommitteeMemberBox 
                            title={item.name}
                            subTitle={item.empType}
                            imageSource={item.image}
                            mobile={item.phone}
                        />
                    ))
                }
            </View>
        }
        <Pdf
            source={pdfSoutce}
            style={{width:width,height:height-50}}
            trustAllCerts={false}
        />
        </View>
    )
}

export default PdfViewer