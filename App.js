import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import axios from 'axios';
import Userprofile from './app/components/Userprofile';
import Appform from './app/components/Appform';
import ImageUpload from './app/components/imageupload';

const Stack=createStackNavigator();

const StackNavigator=()=>{
  return(
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen component={Appform} name='Appform'/>
      <Stack.Screen component={ImageUpload} name='ImageUpload'/>
      <Stack.Screen component={Userprofile} name='Userprofile'/>
    </Stack.Navigator>
  );
}

export default function App() {

  return (
    <NavigationContainer>
      <StackNavigator/>
    </NavigationContainer>
  );
}
