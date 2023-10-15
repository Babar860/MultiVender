import React from "react";
import { View,StyleSheet,Text,TouchableWithoutFeedback,Animated } from "react-native";

const FormSelectBtn = ({ title,backgroundColor,style, onPress })=>{
    return(
        <TouchableWithoutFeedback onPress={onPress}>
        <Animated.View style={[styles.container, style,{backgroundColor}]}>
          <Text style={styles.title}>{title}</Text>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
};
const styles=StyleSheet.create({
    container:{height:45, justifyContent:'center',alignItems:'center', width:'50%'},
    title:{color:'white',fontSize:18}
})
export default FormSelectBtn;