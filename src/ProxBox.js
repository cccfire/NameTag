import React from 'react';
import { StyleSheet, Text, Image, View, ScrollView, Dimensions } from 'react-native';


import {
  PanGestureHandler,
  PinchGestureHandler,
  RotationGestureHandler,
  TapGestureHandler,
  State,
} from 'react-native-gesture-handler';

export default class ProxBox extends React.Component{

  render(){
    return(
      <View {...this.props}>
    <View style={[

      {
        flex:1,
        width: this.props.width,
      height: this.props.height,
        transform: [
          { perspective: 200 },
          { translateX: this.props.translateX },
          { translateY: this.props.translateY },
          { scale: this.props.scale },
          { rotate: this.props.rotate },
        ],
        backgroundColor: "transparent",
      },
    ]}>
      {this.props.children}
    </View>
    </View>
  )
  }
}
