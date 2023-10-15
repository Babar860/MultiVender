import React, { useState } from "react";
import { Text,View,StyleSheet,TouchableOpacity,Image } from "react-native";
import * as ImagePicker from 'expo-image-picker';  
import { StackActions } from "@react-navigation/native"; 
import client from "../api/client";

const ImageUpload=(props)=>{
    const {token}=props.route.params
    const [profileImage,setProfileImage]=useState('');
    const [progress,setprogress]=useState(0)
    const openImageLibrary=async ()=>{
        const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if(status !== 'granted'){
            alert('sorry we need to roll camera to make this work');
        }    
        if(status === 'granted'){
            const result =await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing:true,
            });
            console.log(result)
            if(!result.canceled){
                setProfileImage(result.uri)
              }
        }
    };
    const uploadImage= async()=>{
        const formData= new FormData();
        formData.append('profile',{
            name:new Date()+"_profile",
            uri:profileImage,
            type:'image/jpg' 
        })
        try{
            const res=await client.post('/upload-profile',formData,{
                headers:{
                    Accept:'application/json',
                    "Content-Type":'multipart/form-data',
                     authorization:`JWT ${token}`,
                },
            });
            if(res.data.success){
                props.navigation.dispatch(
                    StackActions.replace('Userprofile'));
            }
                console.log(res.data)
        }catch(error){
                console.log(error.message)
        }
       
    }
    return(
        <View style={styles.container}>
            <View>
                <TouchableOpacity onPress={openImageLibrary} style={styles.uploadBtnCont}>
                {profileImage ?<Image source={{uri:profileImage}} style={{width:'100%',height:'100%'}}/>:<Text style={styles.uploadBtn}>Upload Profile Image</Text>}
                </TouchableOpacity>
                 <Text style={styles.skip}>skip</Text>
                {profileImage ?  ( <Text onPress={uploadImage} style={[styles.skip,{backgroundColor:'green',color:'white', borderRadius:8}]}>Upload</Text>) :null}
            </View>
        </View>
    )
}
const styles=StyleSheet.create({
    container:{
            flex:1,
            justifyContent:'center',
            alignItems:'center',
    },
    uploadBtnCont:{
        height:200,
        width:200,
        borderWidth:2,
        borderStyle:'dashed',
        borderRadius:125/2,
        justifyContent:'center',
        alignItems:'center',
        overflow:'hidden',
    },
    uploadBtn:{
        textAlign:'center',
        fontSize:16,
        opacity:0.3,
        fontWeight:'bold'
    },
    skip:{
        textAlign:'center',
        padding:20,
        fontSize:16,
        fontWeight:'bold',
        textTransform:'uppercase',
        letterSpacing:2,
        opacity:0.5,
    }, 
});

export default ImageUpload;