import React, { useState } from "react";
import { View,Text,StyleSheet, Dimensions, KeyboardAvoidingView, Platform } from "react-native";
import FormInput from "./formInput";
import Formsubmit from "./formsubmit";
import { StackActions } from "@react-navigation/native";
import CheckBox from "@react-native-community/checkbox";

import { Formik} from "formik";
import * as Yup from 'yup' 

import client from "../api/client";

const validationSchema=Yup.object({
    fullname:  Yup.string().trim().min(3,'Invalid Name').required('Name is required!'),
    email:Yup.string().email('Invalid Email!').required('Email is required!'),
    phone:Yup.string().trim().min(11,'phone is too Short').required('phone Number is required'),
    cnic:Yup.string().trim().min(14,'Wrong Cnic').required('Cnic is required'),
    password:Yup.string().trim().min(8,'password is too short!').required('Password is required'),
    cnf_pass:Yup.string().equals([Yup.ref('password'), null],'Password doees not match')
})

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

const Signup=({navigation})=>{
    const userInfo = {
        fullname:'',
        email:'',
        phone:'',
        cnic:'',
        password:'',
        cnf_pass:'',
    }
    const initialState={
        customer:false,
        vender:false,
    }
    const [state,setState]=useState(initialState);
    const [toggleCheckBox,setToggleCheckBox]=useState(false);
    const [error,setError]=useState('')
    const{fullname,email,phone,cnic,password,cnf_pass}=userInfo 
    const handleChange=(value,feildName)=>{
        setUserInfo({...userInfo,[feildName]:value})
    }   
    const isValidForm=()=>{
        if(!isValidObjFeild(userInfo)) return updateError('Required All Feild',setError)
        if(!fullname.trim()|| fullname.length<3) return updateError('Invalid name!',setError)
        if(!isvalidEmail(email)) return updateError('Invalid email!',setError)
        if(!phone.trim()||phone.length<11) return updateError('Invalid phone Number!',setError)
        if(!cnic.trim()||cnic.length<14) return updateError('Invalid cnic!',setError)
        if(!password.trim()|| password.length<8) return updateError('password is Less then 8 character!',setError)
        if(password!==cnf_pass) return updateError('password does not match',setError)
        
        return true;
    }

    const submitForm=()=>{
        if(isValidForm()){
            console.log(userInfo)
        }
    }     
    const signUp= async(values,formikActions)=>{

        const res = await client.post('/create-user',{...values,});

        if(res.data.success){
            const signinres=await client.post('/sign-in',{email:values.email, password:values.password});
            if(signinres.data.success){
                navigation.dispatch(
                    StackActions.replace('ImageUpload',{
                        token: signinres.data.token,
                    })
                );
            }
        }

        formikActions.resetForm(); 
        formikActions.setSubmitting( false );
    };
    return (        
    <KeyboardAvoidingView style={styles.container} enabled behavior={Platform.OS==='ios'? 'padding':null}>
        <Formik initialValues={userInfo} validationSchema={validationSchema} onSubmit={signUp}> 
        {({values,isSubmitting,handleChange,errors,touched,handleBlur,handleSubmit})=>{
            const {fullname,email,phone,cnic,password,cnf_pass}=values    
            return<>
            <FormInput value={fullname} error={touched.fullname && errors.fullname } onBlur={handleBlur('fullname')} onChangeText={handleChange('fullname')} placeholder={'fullname'} title={'Full Name'} />
            <FormInput value={email} autoCapitilze='none' error={touched.email && errors.email } onBlur={handleBlur('email')} onChangeText={handleChange('email')} placeholder={'email'} title={'Email'} />
            <FormInput value={phone} placeholder={'phone'} error={touched.phone && errors.phone } onBlur={handleBlur('phone')} onChangeText={handleChange('phone')} title={'Phone'} />
            <FormInput value={cnic} placeholder={'Cnic'} error={touched.cnic && errors.cnic } onBlur={handleBlur('cnic')} onChangeText={handleChange('cnic')} title={'CNIC'} />
            <FormInput value={password} autoCapitilze='none' onChangeText={handleChange('password')} error={touched.password && errors.password } onBlur={handleBlur('password')} secureTextEntry placeholder={'password'} title={'Password'} />
            <FormInput value={cnf_pass} autoCapitilze='none' onChangeText={handleChange('cnf_pass')} error={touched.cnf_pass && errors.cnf_pass } onBlur={handleBlur('cnf_pass')} secureTextEntry placeholder={'conf_password'} title={'Confirm Password'} />
            <Formsubmit submitting={isSubmitting} onPress={handleSubmit} title={'Sign Up'}/>
            {/* <CheckBox disabled={false} 
             value={state.customer} onValueChange={(value)=> setState({...state,customer:value})}/> <Text>Customer</Text>
            <CheckBox disabled={false} value={state.vender} onValueChange={(value)=> setToggleCheckBox({...state,vender:value})}/> <Text>Vender</Text> */}
           
            </>
        }}</Formik>
  </KeyboardAvoidingView>);
};
const styles=StyleSheet.create({
    container:{paddingHorizontal:20, width: Dimensions.get('window').width }
})
export default Signup;