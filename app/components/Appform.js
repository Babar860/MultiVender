import React,{useEffect, useRef} from 'react';
import { ScrollView, StyleSheet, Text,  View,Animated,Dimensions } from 'react-native';
import FormHeader from './formHeader';
import FormSelectBtn from './formSelectorBtn';
import Loginform from './loginform';
import Signup from './signupform';
import axios from 'axios';

const {width} =Dimensions.get('window')

export default function Appform({navigation}) {
  
  const scrollView= useRef();
  const animation = useRef(new Animated.Value(0)).current;
  
  const fatchApi=async()=> {
    try{
      const res= await axios.get('http://192.168.100.23:3000/') 
      console.log(res.data)
    }catch(error){
      console.log(error.message);
    }
  }

  useEffect(()=>{
    fatchApi()
  },[])

  const rightheaderopacity=animation.interpolate({
    inputRange:[0,width],
    outputRange:[0,width]})
  const leftheaderTranslateX=animation.interpolate({
    inputRange:[0,width],
    outputRange:[85,0]
  })
  const rightheaderTranslateY=animation.interpolate({
    inputRange:[0,width],
    outputRange:[0,0]})
  const LogincolorInterpolate=animation.interpolate({
    inputRange:[0,width],
    outputRange:['rgba(27,27,51,1)','rgba(27,27,51,0.4)']
  })
  const SignupcolorInterpolate=animation.interpolate({
    inputRange:[0,width],
    outputRange:['rgba(27,27,51,0.4)','rgba(27,27,51,1)']
  })

  return (
    <View style={styles.container}>
      <View style={{height:70}}>
           <FormHeader leftheading={'E-Commerce'} rightheading={'Create Account'} subheading={'Welcome Multi-Vender App'} rightheaderopacity={rightheaderopacity} leftheaderTranslateX={leftheaderTranslateX} rightheaderTranslateY={rightheaderTranslateY}/>
      </View>
      <View style={{flexDirection:'row',padding:20 , paddingBottom:20}}>
        <FormSelectBtn backgroundColor={LogincolorInterpolate} style={styles.borderLeft} title={'Login '} onPress={()=>scrollView.current.scrollTo({x:0})}/>
        <FormSelectBtn backgroundColor={SignupcolorInterpolate} style={styles.borderRight} title={'Sign Up'} onPress={()=>scrollView.current.scrollTo({x:width})}/> 
      </View>
      <ScrollView ref={scrollView} horizontal pagingEnabled  showsHorizontalScrollIndicator={false} 
      onScroll={Animated.event([{nativeEvent:{contentOffset:{x:animation}}}],{useNativeDriver:false})}>
        <Loginform  navigation={navigation}/>
        <ScrollView  >
        <Signup navigation={navigation}/>
        </ScrollView>
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:120,
    backgroundColor: '#fff',
  },
  borderLeft:{
    borderTopLeftRadius: 15,
    borderBottomLeftRadius:15,
  },
  borderRight:{
    borderTopRightRadius:15,
    borderBottomRightRadius:15,
  }
});
