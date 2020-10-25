import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { Button, ThemeProvider, Header, Icon } from 'react-native-elements';
import HomeScreen from './src/HomeScreen';
import NotificationsScreen from './src/NotificationsScreen';
import EditScreen from './src/EditScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { navigationRef, isReadyRef} from './src/RootNavigation';
import * as RootNavigation from './src/RootNavigation.js';



const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function ADrawer() {
  return (<Drawer.Navigator initialRouteName="Home" screenOptions={{ swipeEnabled: true}}>
    <Drawer.Screen name="Home" component={HomeScreen} />
    <Drawer.Screen name="Notifications" component={NotificationsScreen} />
    <Drawer.Screen name="Create Post" component={EditScreen} />
  </Drawer.Navigator>)
}

function MenuButton() {

  return (<Button
icon={{
  name: "menu",
  size: 25,
  color: "black"
}}
iconContainerStyle={{backgroundColor: '#ffffff',}}
buttonStyle={{backgroundColor: '#ffffff',
paddingLeft: 0,
marginLeft: -5}}
title=""
onPress={() => RootNavigation.toggleDrawer()}
/>)
}

export default function App() {
  React.useEffect(() => {
    return () => {
      isReadyRef.current = false
    };
  }, []);

  return (
  <ThemeProvider>
    <NavigationContainer ref={navigationRef}
    onReady={() => {
        isReadyRef.current = true;
      }}>
    <Header leftComponent={MenuButton}
  centerComponent={{ text: 'NameTag', style: { color: 'black' } }}
  rightComponent={{ icon: 'home', color: 'black' }}
  containerStyle={{
    backgroundColor: '#ffffff',
    justifyContent: 'space-around',
  }}/>
    <ADrawer/>

    </NavigationContainer>
    </ThemeProvider>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
