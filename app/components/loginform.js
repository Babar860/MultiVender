import {React,useState} from "react";
import { Text,View,StyleSheet,Dimensions, KeyboardAvoidingView, Platform } from "react-native";
import FormInput from "./formInput";
import Formsubmit from "./formsubmit";
import client from "../api/client";


const isValidObjFeild=(obj)=>{
    return   Object.values(obj).every(value=>value.trim())
}
const updateError=(error,stateUpdater)=>{
    stateUpdater(error);
    setTimeout(()=>{
        stateUpdater('')
    },2500)
}
const isvalidEmail=(value)=>{
    const regx= /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    return regx.test(value)
}
const Loginform= ()=>{

    const[userInfo , setUserInfo]= useState({
        email:'',
        password:'',
    })
    const [error,setError]=useState('')
    const{email,password}=userInfo 
    const handleOnChangeText=(value,feildName)=>{
        setUserInfo({...userInfo,[feildName]:value})
    }
    const isValidForm=()=>{
        if(!isValidObjFeild(userInfo)) return updateError('Required All Feild',setError)
        if(!isvalidEmail(email)) return updateError('Invalid email!',setError)
        if(!password.trim()|| password.length<8) return updateError('password is Less then 8 character!',setError)
        
        return true;
    }
    const submitForm= async()=>{
        if(isValidForm()){
            try{
            const res = await client.post('/sign-in',{...userInfo});
            if(res.data.success){
                    setUserInfo({email:'', password:''});
            }
            console.log(res.data);
            }catch(error){
                console.log(error.message);
            }

        }
    }
    return(
        <KeyboardAvoidingView style={styles.container} enabled behavior={Platform.OS==='ios'? 'padding':null}>
   {error? <Text style={{color:'red', fontSize:18,textAlign:'center'}}>{error}</Text>:null}
            <FormInput value={email} autoCapitilze='none' onChangeText={(value)=>handleOnChangeText(value,'email')} placeholder={'examplegmail.com'} title={'Email'} />
            <FormInput  value={password} autoCapitilze='none' secureTextEntry onChangeText={(value)=>handleOnChangeText(value,'password')} placeholder={'*****'} title={'Password'} />
            <Formsubmit onPress={submitForm} title={'Login'}/>
        </KeyboardAvoidingView>
    );
};

const styles=StyleSheet.create({
    container:{paddingHorizontal:20,  width: Dimensions.get('window').width}
})
export default Loginform;