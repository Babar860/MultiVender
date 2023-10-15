import React from "react";
import { Text,TextInput,View ,StyleSheet} from "react-native";

const FormInput=(props)=>{
    const{placeholder,title,error}=props
    return(
        <>
        <View style={{flexDirection:'row',justifyContent:'space-between'}}> 
        <Text style={{fontWeight:'bold'}}>{title}</Text>
         {error ? < Text style={{color:'red',fontSize:16}}>{error}</Text>:null}
        </View>
        <TextInput {...props} placeholder={placeholder}style={styles.input}/>
        </>
    );
};
const styles=StyleSheet.create({
    input:{
        borderWidth:1,
        borderColor: '#1b1b33',
        height:35,
        borderRadius:15,
        fontSize:15,
        paddingLeft:10,
        marginBottom:20,
    }
});
export default FormInput;
