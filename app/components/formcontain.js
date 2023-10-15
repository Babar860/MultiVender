import React from "react";
import { Dimensions,Text,View,StyleSheet } from "react-native";

const FormContainer=({childern})=>{
    return( 
        <View style={styles.container}>{childern}</View>
    );
};
const styles=StyleSheet.create({
    container:{justifyContent:'center', alignItems:'center', width: Dimensions.get('window').width }
})
export default FormContainer;