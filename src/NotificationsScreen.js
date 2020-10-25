import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ScrollView, useWindowDimensions } from 'react-native';
import { Card, Button, ThemeProvider, Header, Icon } from 'react-native-elements';
import MarkdownEditor from './MarkdownEditor.js';
import ColorPicker from './ColorPicker.js';
import CardViewer from './CardViewer.js';
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

  </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: "#eaeaea"
  },
  selected: {
    opacity: 0.5
  },
  unselected: {

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
  }
});
