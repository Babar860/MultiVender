import React from "react";
import { Text,View,StyleSheet, TouchableOpacity } from "react-native";

const Formsubmit=({title, submitting,onPress}) =>{
    const backgroundColor=submitting ? 'rgba(27,27,51,0.4)':'rgba(27,27,51,1)'
    return(
    <TouchableOpacity onPress={!submitting ? onPress: null} style={[styles.container,{backgroundColor}]}>
        <Text style={{fontSize:20, color:'#fff'}}>{title}</Text>
    </TouchableOpacity>
    );
}
const styles=StyleSheet.create({
    container:{
        height:45,
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
    },
});
export default Formsubmit;