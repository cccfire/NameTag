import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, useWindowDimensions } from 'react-native';
import { Card, Button, ThemeProvider, Header, Icon } from 'react-native-elements';
import MarkdownEditor from './MarkdownEditor.js';
import ColorPicker from './ColorPicker.js';
import CardViewer from './CardViewer.js';
import {requestLogin, requestSignup} from './connector.js';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  PanGestureHandler,
  PinchGestureHandler,
  RotationGestureHandler,
  TapGestureHandler,
  State,
} from 'react-native-gesture-handler';

const Stack = createStackNavigator();

class LoginForm extends React.Component{
  constructor(){
    super();
    this.state={
      email:"",
      password:""
    }
  }

  render(){
    return(
      <View style={styles.container}>
      <Text style={styles.logo}>NameTag</Text>
      <View style={styles.inputView} >
          <TextInput
            style={styles.inputText}
            placeholder="Email..."
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({email:text})}/>
        </View>
        <View style={styles.inputView} >
          <TextInput
            style={styles.inputText}
            placeholder="Password..."
            placeholderTextColor="#003f5c"
            secureTextEntry
            onChangeText={text => this.setState({password:text})}/>
        </View>
        <TouchableOpacity>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginBtn} onPress={() =>
          {
            requestLogin(this.state.email, this.state.password)
            .then(data =>
              {
                if(data.type === 'success'){
                  alert('successfully logged in!')
                }
              }
            )
          }}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('SignupForm')}>
          <Text style={styles.loginText}>Sign Up</Text>
        </TouchableOpacity>
</View>
    )
  }
}

class SignupForm extends React.Component{
  constructor(){
    super();
    this.state={
      email:"",
      password:"",
      confirmpassword: ""
    }
  }

  render(){
    return(
      <View style={styles.container}>
      <Text style={styles.logo}>NameTag</Text>
      <View style={styles.inputView} >
          <TextInput
            style={styles.inputText}
            placeholder="Email..."
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({email:text})}/>
        </View>
        <View style={styles.inputView} >
          <TextInput
            style={styles.inputText}
            placeholder="Password..."
            placeholderTextColor="#003f5c"
            secureTextEntry
            onChangeText={text => this.setState({password:text})}/>
        </View>
        <View style={styles.inputView} >
          <TextInput
            style={styles.inputText}
            placeholder="Confirm Password..."
            placeholderTextColor="#003f5c"
            secureTextEntry
            onChangeText={text => this.setState({confirmpassword:text})}/>
        </View>
        <TouchableOpacity>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginBtn}
        onPress={() => {
          if(this.state.password === this.state.confirmpassword ){
            if(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.state.email)){
              requestSignup(this.state.email, this.state.password)
              .then(data =>
                {
                  if(data.type === 'success'){
                    alert('Successfully signed up! Check your email for a verification link')
                  }
                }
              )
            }else{
              alert('invalid email address!');
            }
          }else{alert('Passwords do not match!')}
        }}>
          <Text style={styles.loginText}>SIGN UP</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.pop()}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
</View>
    )
  }
}

export default class AuthenticationUI extends React.Component{




  render(){
    return(

      <Stack.Navigator headerMode="none" initialRouteName="LoginForm">
        <Stack.Screen name="LoginForm" component={LoginForm} />
        <Stack.Screen name="SignupForm" component={SignupForm} />
      </Stack.Navigator>



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
    backgroundColor: '#990000',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
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
    color:"black"
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
