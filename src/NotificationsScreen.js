import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, useWindowDimensions } from 'react-native';
import { Card, Button, ThemeProvider, Header, Icon } from 'react-native-elements';
import MarkdownEditor from './MarkdownEditor.js';
import ColorPicker from './ColorPicker.js';
import CardViewer from './CardViewer.js';
import AuthenticationUI from './AuthenticationUI.js';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  PanGestureHandler,
  PinchGestureHandler,
  RotationGestureHandler,
  TapGestureHandler,
  State,
} from 'react-native-gesture-handler';



export default class NotificationsScreen extends React.Component{




  render(){
    return(
      <View style={styles.container}>
      <AuthenticationUI/>
      </View>


    )
  }
}

const styles = StyleSheet.create({
  logo:{
  fontWeight:"bold",
  fontSize:50,
  color:"#ffffff",
  marginBottom:40
},
  container: {
    flex: 1,
  },
  inputView:{
  width: 250,
  backgroundColor:"#ffffff",
  borderRadius:25,
  height:50,
  marginBottom:20,
  justifyContent:"center",
  padding:20
},
inputText:{
    height:50,
    color:"white"
  },
  forgot:{
    color: "white",
    fontSize: 11
  },
  loginText:{
    textAlign: 'center',
    color: "white",
    fontSize: 20
  },
  loginBtn:{
    width:250,
    backgroundColor:"#370031",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
  },
  title: {
    marginTop: 16,
    paddingVertical: 8,
    borderWidth: 4,
    borderColor: "#20232a",
    borderRadius: 6,
    backgroundColor: "#61dafb",
    color: "#20232a",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold"
  },
});
