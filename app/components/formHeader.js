import React from "react";
import { View,StyleSheet,Text,Animated } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

const FormHeader = ({leftheading,rightheading,subheading, leftheaderTranslateX=40,rightheaderTranslateY=-20,rightheaderopacity=0})=>{
return  (
<>  
<View style={styles.container}>
<Animated.Text style={[styles.heading, {transform:[{translateX:leftheaderTranslateX}]}] }> {leftheading} </Animated.Text>
<Animated.Text style={[styles.heading1 ,  {opacity:rightheaderopacity, transform:[{translateY:rightheaderTranslateY}]}]}> {rightheading} </Animated.Text>
</View>
<Text style={styles.subheading}>{subheading}</Text>
</>
);
};

const styles=StyleSheet.create({
    container:{flexDirection:'row', alignItems:'center', justifyContent:'center'},
    heading1:{fontSize:23,fontWeight:'bold', color:'green'},
    heading:{fontSize:23,fontWeight:'bold',},
    subheading:{fontSize:20,fontWeight:'bold',textAlign:'center'}
})

export default FormHeader;