import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, Image, View, ScrollView, Dimensions } from 'react-native';
import { Card, Button, ThemeProvider, Header, Icon } from 'react-native-elements';
import Markdown from 'react-native-markdown-display';
import ProxBox from './ProxBox.js';
import ColorPicker from './ColorPicker.js';
import {
  PanGestureHandler,
  PinchGestureHandler,
  RotationGestureHandler,
  TapGestureHandler,
  State,
} from 'react-native-gesture-handler';

export default class CardViewer extends React.Component{
  constructor(){
    super();
    this.selected = null;
  }

  moveRight = () => {
    if(this.selected < this.compArray.length-1){
      [this.compArray[this.selected+1], this.compArray[this.selected]] = [this.compArray[this.selected], this.compArray[this.selected+1]];
      this.selected++;
      this.setState({compArray: this.compArray});
    }
  }

  moveRightMost = () => {
    var obj = this.compArray.splice(this.selected, 1)[0];
    this.compArray.push(obj);
    this.selected = this.compArray.length-1;
    this.setState({compArray: this.compArray});
  }

  moveLeft = () => {
    if(this.selected > 0){
      [this.compArray[this.selected-1], this.compArray[this.selected]] = [this.compArray[this.selected], this.compArray[this.selected-1]];
      this.selected--;
      this.setState({compArray: this.compArray});
    }
  }

  moveLeftMost = () => {
    var obj = this.compArray.splice(this.selected, 1)[0];
    this.compArray.unshift(obj);
    this.selected = 0;
    this.setState({compArray: this.compArray});
  }

  delete = () => {
    if(this.selected != null){
      //console.log(this.compArray);
      this.compArray.splice(this.selected, 1);
      this.selected = null;

      this.setState({compArray: this.compArray});

    }
  }

  select = (key) => {
    //console.log(this.compArray[key].isSelected);
    if(!this.compArray[key].isSelected){
      if(this.selected != null){
        this.compArray[this.selected].isSelected = false;
      }
      this.selected = key;
      this.compArray[key].isSelected = true;
      this.setState({compArray: this.compArray});
    }else{
    //  console.log('hello');
      this.compArray[key].isSelected = false;
      this.selected = null;
      this.setState({compArray: this.compArray});
    }
  //  console.log(this.compArray);
  //  console.log('touch')
  };
  render(){
    this.compArray = this.props.arr;
  //  console.log(this.props.arr);
    var listArr = (() => this.compArray.map((function (object, index){
      return(
        <Card style={{padding: 0, margin: 0}}>
          <CardStuff viewHeight={this.props.viewHeight} arr={this.props.arr[index].compArray} isSelected={object.isSelected} select={this.select} color={object.color} id={index}/>
        </Card>
      )
    }).bind(this))).call();


    return(

      <View style={styles.container}>
    <View style={{flex: 4}}>
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
    {listArr}
    <View style={{flex:1, backgroundColor:'transparent', alignItems: 'center', justifyContent: 'center'}}>
    <Button
    style={{justifySelf: 'center'}}
    icon={
      <Icon
      name='addfile'
      size={30}
      type='antdesign'
      color='red'
      />
    }
    buttonStyle={{backgroundColor: 'transparent',}}
    title=""
    onPress={() => this.props.createPage()}
    />
    </View>

    </ScrollView>
    </View>
    {(this.selected != null) ? (<View style={{flex:1, flexDirection: 'column'}}>
    <View style={{flex:1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
    <Button
    icon={
      <Icon
      name='chevrons-left'
      size={30}
      type='feather'
      color='rgb(84, 176, 214)'
      />
    }
    buttonStyle={{backgroundColor: 'transparent',}}
    title=""
    onPress={() => this.moveLeftMost()}
    />
    <Button
    icon={
      <Icon
      name='chevron-left'
      size={30}
      type='feather'
      color='rgb(84, 176, 214)'
      />
    }
    buttonStyle={{backgroundColor: 'transparent',}}
    title=""
    onPress={() => this.moveLeft()}
    />
    <Button
    style={{alignSelf: 'flex-end'}}
    icon={
      <Icon
      name='delete'
      size={30}
      type='antdesign'
      color='red'
      />
    }
    buttonStyle={{backgroundColor: 'transparent',}}
    title=""
    onPress={() => this.delete()}
    />
    <Button
    icon={
      <Icon
      name='chevron-right'
      size={30}
      type='feather'
      color='rgb(84, 176, 214)'
      />
    }
    buttonStyle={{backgroundColor: 'transparent',}}
    title=""
    onPress={() => this.moveRight()}
    />
    <Button
    icon={
      <Icon
      name='chevrons-right'
      size={30}
      type='feather'
      color='rgb(84, 176, 214)'
      />
    }
    buttonStyle={{backgroundColor: 'transparent',}}
    title=""
    onPress={() => this.moveRightMost()}
    />
    </View>
      <Button
      icon={
        <Icon
        name='edit'
        size={30}
        type='antdesign'
        color='rgb(84, 176, 214)'
        />
      }
      buttonStyle={{backgroundColor: 'transparent',}}
      title=""
      onPress={() => {
        this.props.setSelectedPage(this.selected);
        this.compArray[this.selected].isSelected = false;
        this.selected = null;
        this.props.unshowCards();}}
      />
    </View>) : (<View style={{flex: 1}}></View>)}
    <View style={{justifyContent: 'flex-end', }}>
    <Button
    style={{alignSelf: 'flex-end'}}
    icon={
      <Text style={{fontSize: 20, color: 'rgb(84, 176, 214)'}}>Post ></Text>
    }
    buttonStyle={{backgroundColor: 'transparent',}}
    title=""
    onPress={() => {this.props.post(); this.props.unshowCards();}}
    />
</View>
  </View>
    )
  }

}


class CardStuff extends React.Component{

  checkStyle = (a) => {
    if(a){
      return(0.5);
    }else{
      return(1);
    }
  }

  _onSingleTap = event => {
    if (event.nativeEvent.state === State.ACTIVE) {
        this.props.select(this.props.id);
    }
  };


  render(){
    //console.log('hi')
    //console.log(this.props.arr);
    buttonsListArr = (() => this.props.arr.map((function (object, index){
      switch(object.type){
        case 'image':
        return(
          <ProxBox key={object.id} id={index} style={{zIndex: index, position: 'absolute'}} translateX={object.translateX * 0.6} translateY={object.translateY * 0.6} scale={object.scale} rotate={object.rotate} width={object.width * 0.6} height={object.height * 0.6}>
          <Image
          style={{
            opacity: this.checkStyle(object.isSelected),
            width: object.width * 0.6,
            height: object.height * 0.6,}}
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
            return(<ProxBox key={object.id} id={index} style={{zIndex: index, position: 'absolute'}} translateX={object.translateX*0.6+(object.width*0.6-object.width)/2} translateY={object.translateY*0.6+(object.height*0.6-object.height)/2}  width={object.width} height={object.height} scale={object.scale*0.6} rotate={object.rotate}>
              {textbox}
              </ProxBox>)
            }
          }).bind(this))).call();

    //console.log(this.props.id);
  //  console.log(this.props.viewHeight);
    return(
      <View>
      <TapGestureHandler onHandlerStateChange={this._onSingleTap}>
      <View style={{opacity: this.checkStyle(this.props.isSelected), backgroundColor: 'rgba(0,0,0,0.1)', position: 'relative'}}>
    <View style={[{overflow: 'hidden', width: (Dimensions.get('screen').width*60/100), height: (this.props.viewHeight*60/100), position: 'relative'},{}]}>
    {buttonsListArr}
    </View>
    </View>
    </TapGestureHandler>
    </View>
  )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#eaeaea"
  },
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: "transparent",
    position: "relative",
    top: 0
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
