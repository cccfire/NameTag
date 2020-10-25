import React, { Component } from 'react'
import { AppRegistry, StyleSheet, Text, View, Dimensions, Image, ScrollView, RefreshControl, FlatList, SafeAreaView } from 'react-native'
import 'react-native-get-random-values';
import Swiper from 'react-native-swiper'
import ProxBox from './ProxBox.js';
import { v4 as uuidv4 } from 'uuid';
import {getAllData} from './connector.js';
import { Divider } from 'react-native-elements';


const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  }
});

export class Slide extends Component {
    constructor(){
      super();
    }

  render(){
      var listArr = (() => this.props.arr.map((function (object, index){
        switch(object.type){
          case 'image':
          return(
            <ProxBox key={object.id} id={index} style={{zIndex: index, position: 'absolute'}} translateX={object.translateX} translateY={object.translateY} scale={object.scale} rotate={object.rotate} width={object.width} height={object.height}>
            <Image
            style={{
              width: object.width,
              height: object.height,}}
              source={{
                uri: object.source,
              }}
              />
              </ProxBox>);
              break;
              case 'text':

              var textbox = <View style={{padding: 0, margin: 0, backgroundColor: object.backgroundColor, position: 'absolute',}}><Markdown style={{body: {color: object.textColor}}}>{object.value}</Markdown></View>
              //console.log(object.value);
              //console.log('djfksal;');
              return(<ProxBox key={object.id} id={index} style={{zIndex: index, position: 'absolute'}} translateX={object.translateX} translateY={object.translateY}  width={object.width} height={object.height} scale={object.scale} rotate={object.rotate}>
                {textbox}
                </ProxBox>)
              }
            }).bind(this))).call();
    return(
      <View style={{ backgroundColor: 'rgba(0,0,0,0.1)', position: 'relative'}}>
    <View style={[{overflow: 'hidden', width: (Dimensions.get('screen').width), height: (Dimensions.get('screen').height), position: 'relative'},{}]}>
    {listArr}
    </View>
    </View>
  )
  }
}

export class Feed extends Component {
  constructor(props){
    super(props);
    console.log('fun');
    this.refreshing = false;
    this.data = [['ab',[
      {
        compArray: [
          {
            translateX: 0,
            translateY: 0,
            scale: 1,
            rotate: 0,
            source: 'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/81a75eb1d68969b09bd4dd49e9d58c4b',
            width: 250,
            height: 250,
            isSelected: false,
            id: uuidv4(),
            type: 'image'
          }
        ],
        isSelected: false
      },
      {
        compArray: [
          {
            translateX: 0,
            translateY: 0,
            scale: 1,
            rotate: 0,
            source: 'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/81a75eb1d68969b09bd4dd49e9d58c4b',
            width: 250,
            height: 250,
            isSelected: false,
            id: uuidv4(),
            type: 'image'
          }
        ],
        isSelected: false
      }
    ]]];
    getAllData().then(data => {this.data = data; this.setState({data: this.data})});

  }

  refresh = () => {
    this.refreshing = true;
    this.setState({refreshing: this.refreshing})
    console.log('refresh');
    getAllData().then(data => {this.data = data; this.setState({data: this.data}); this.refreshing = false; this.setState({refreshing: this.refreshing})});
  }

  render() {
    var listArr = (() => this.data.map((function (object, index){
        return(<Post key={this.data[index][0]} arr={this.data[index][1]}/>)
          }).bind(this))).call();
    return (
        <Swiper refreshControl={
          <RefreshControl refreshing={this.refreshing} onRefresh={this.refresh} />
        } style={styles.wrapper} horizontal={false} showsButtons={false} loop={false} showsPagination={false} scrollsToTop={true} bounces={true}>
          {listArr}
        </Swiper>
    )
  }
}

export default class Post extends Component {
  constructor(props){
    super(props);
    this.compArray = props.arr;

  }
  render() {
    var listArr = (() => this.compArray.map((function (object, index){
        return(<Slide arr={this.compArray[index].compArray}/>)
          }).bind(this))).call();
    return (
      <Swiper style={styles.wrapper} showsButtons={false} loop={false}>
        {listArr}
      </Swiper>
    )
  }
}
