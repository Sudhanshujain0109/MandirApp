// import axios, { AxiosInstance } from "axios";
// import { ApiResponse } from "./ApiResponse";

// class ApiBaseHelper {

//     private apiResponse?: ApiResponse;
//     private instance: AxiosInstance;
//     constructor(BASEURL: string) {
//         this.instance = axios.create({
//             baseURL: BASEURL,
//             // headers: { "Content-Type": "application/json" },
//             headers: {  },
//         });
//     }

//     async get(url: string,token:any,params:object) {
//         try {

//             if(token){
//                 axios.defaults.headers.common['authorization'] = `Bearer ${token}`
//                 console.log(axios.defaults.headers.common['authorization'],"ekowr")
//                 console.log(token,'eee')
//             }

//             let response = await this.instance.get(url)

//             if (response.status >= 200 && response.status < 300) {

//                 this.apiResponse = new ApiResponse(true, response.data, response.statusText)

//             } else {

//                 this.apiResponse = new ApiResponse(false, "", response.statusText)
//             }

//         } catch (error) {
           
//             this.apiResponse = new ApiResponse(false, "", error)
//         }

//         return this.apiResponse
//     }

//     async post(url: string, body: any,token:any) {
//         try {
//             if(token){
//                 axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
//             }
//             let response = await this.instance.post(url, body)

//             if (response.status >= 200 && response.status < 300) {

//                 this.apiResponse = new ApiResponse(true, response.statusText, response.data)

//             } else {

//                 this.apiResponse = new ApiResponse(false, response.statusText, response.data)
//             }
//         } catch (error) {

//             this.apiResponse = new ApiResponse(false, (error as Error).message, null)
//         }

//         return this.apiResponse
//     }
// }

// export const apiBaseHelper = new ApiBaseHelper("http://172.105.56.136:8080/");


import axios from 'axios';
class ApiHelper{
      
    baseurl=''
    headers={}
    constructor(baseurl:any){
        this.baseurl=baseurl;
        this.headers={contentType : "application/json",};
    }
    get=async(url:any,token:any,params:any)=>{
        console.log(token)
        if(token){
            this.headers={...this.headers,'authorization': `Bearer ${token}`}
        }
        return axios.get(`${this.baseurl}/${url}`,{ headers: this.headers,params:params})
            .then(function (response) {
                return {data:response.data,error:false};
            })
            .catch(function (error) {
                return {data:error,error:true}
            })
    }
    deleteData=async(url:any,token:any)=>{
        this.headers={'contentType':"multipart/form-data"}
        if(token){
            this.headers={...this.headers,'authorization': `Bearer ${token}`}
        }
        console.log(this.headers)
        return axios.delete(`${this.baseurl}/${url}`,{headers: this.headers})
            .then(function (response) {
                return {data:'Data Deleted',error:false};
            })
            .catch(function (error) {
                console.log(error.response.data,"redss");
                return {data:error,error:true}
            })
    }
    post=async(url:any,body:any,token:any)=>{
        // this.headers={"Content-Type": "multipart/form-data"}
        if(token){
            this.headers={...this.headers,'authorization': `Bearer ${token}`}
        }
        return axios.post(`${this.baseurl}/${url}`,body,{headers:this.headers})
            .then(function (response) {
                return {data:response?.data,error:false};
            })
            .catch(function (error) {
                // console.log(error.response.data,"EEE");
                return {data:error,error:true}
            })
    }
    putData=async(url:any,body:any,token:any)=>{
        this.headers={'contentType':"multipart/form-data"}
        if(token){
            this.headers={...this.headers,'authorization': `Bearer ${token}`}
        }
        return axios.put(`${this.baseurl}/${url}`,body,{ headers: this.headers})
            .then(function (response) {
                console.log(response,'s')
                return {data:response?.data,error:false};
            })
            .catch(function (error) {
                console.log(error,"error");
                return {data:error,error:true}
            })
    }
    fetchPost=async(url:any,body:any,token:any)=>{
        const requestOptions = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`, 
                'Content-Type': 'multipart/form-data',
            },
            body: body,
        };
        
        return fetch(`${this.baseurl}/${url}`, requestOptions)
            .then(response => {
                if (!response.ok) {
                throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                return {data:data,error:true}
            })
            .catch(error => {
                return {data:error,error:false}
            });
    }
}

// export const API_REQUEST=new ApiHelper("http://localhost:9001/v1")
export const apiBaseHelper=new ApiHelper("http://172.105.56.136:8080")
// export const apiBaseHelper = new ApiHelper('http://10.0.2.2:8080');
