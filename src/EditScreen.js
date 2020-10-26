import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Modal, Text, View, Alert, Image, TextInput, Keyboard, KeyboardAvoidingView, Switch, useWindowDimensions } from 'react-native';
import { Button, ThemeProvider, Header, Icon } from 'react-native-elements';
import PinchableBox from './PinchableBox';
import ColorPicker from './ColorPicker';
import CardViewer from './CardViewer';
import { postData, postImage } from './connector.js';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import Markdown from 'react-native-markdown-display';
import Slider from '@react-native-community/slider';
import RnVerticalSlider from 'rn-vertical-slider';
import {
  TapGestureHandler,
  PanGestureHandler,
  PinchGestureHandler,
  RotationGestureHandler,
  State,
} from 'react-native-gesture-handler';
import 'react-native-get-random-values';
import { Divider } from 'react-native-elements';
import { v4 as uuidv4 } from 'uuid';
const shortid = require('shortid');





export class Blob extends React.Component {
  state = {
    keyboardBool: false,
    modalVisible: false,
    modalVisibleB: false,
    modalVisibleC: false
  };


  setModalVisibleB = (visible) => {
    this.setState({ modalVisibleB: visible });
  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  setModalVisibleC = (visible) => {
    this.setState({ modalVisibleC: visible });
  }

  counter = 1;
  constructor(props){
    super(props);
    //console.log(uuidv4());
    this.value = null;
    this.selected = null;
    this.selectedPage = 0;
    this.compArray = this.props.arr[this.props.selectedPage];

  }

  updateJSON = (a, translateX, translateY, scale, rotate) => {
    var obj = this.compArray[a]
    obj.translateX = translateX;
    obj.translateY = translateY;
    obj.scale = scale;
    obj.rotate = rotate;
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }


  addText = () => {
    this.compArray.push( { backgroundColor: 'transparent', textColor: 'black', value: '**click here**', translateX: 0 + (150-100), translateY: 0 + (60-40)/2, scale: 1.5, rotate: 0, width: 100, height: 40, isSelected: false, isFocus: false, id: uuidv4(), type: 'text'} );
    this.setState({compArray: this.compArray});
  }

  handleClick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      base64: true,
      quality: undefined,
    });
    if (!result.cancelled) {
      //  console.log(this.counter);
      this.compArray.push( { translateX: 0, translateY: 0, scale: 1, rotate: 0, base64: result.base64, source: result.uri, width: result.width, height: result.height, id: uuidv4(), type: 'image'} );
      //this.counter++;
      //  console.log(this.counter);
      this.setState({compArray: this.compArray});
    }else{
      //alert('Operation has been cancelled');
    }
  }

  moveUp = () => {
    if(this.selected < this.compArray.length-1){
      [this.compArray[this.selected+1], this.compArray[this.selected]] = [this.compArray[this.selected], this.compArray[this.selected+1]];
      this.selected++;
      this.setState({compArray: this.compArray});
    }
  }

  moveTop = () => {
    var obj = this.compArray.splice(this.selected, 1)[0];
    this.compArray.push(obj);
    this.selected = this.compArray.length-1;
    this.setState({compArray: this.compArray});
  }

  moveDown = () => {
    if(this.selected > 0){
      [this.compArray[this.selected-1], this.compArray[this.selected]] = [this.compArray[this.selected], this.compArray[this.selected-1]];
      this.selected--;
      this.setState({compArray: this.compArray});
    }
  }

  moveBottom = () => {
    var obj = this.compArray.splice(this.selected, 1)[0];
    this.compArray.unshift(obj);
    this.selected = 0;
    this.setState({compArray: this.compArray});
  }

  tapRef = React.createRef();

  checkStyle = (a) => {
    if(a){
      return(0.5);
    }else{
      return(1);
    }
  }


  componentDidMount() {
    this.getPermissionAsync();
    //console.log('hi');
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide,
    );
  }

  select = (key) => {
    if(!this.compArray[key].isSelected){
      if(this.selected != null){
        this.compArray[this.selected].isSelected = false;
        //this.compArray[this.selected].isFocus = false;
        Keyboard.dismiss();
      }
      this.selected = key;
      this.compArray[key].isSelected = true;
      this.compArray[key].isFocus = true;
      this.setState({compArray: this.compArray});
    }else{
      this.compArray[this.selected].isSelected = false;
      //this.compArray[this.selected].isFocus = false;
      this.selected = null;
      this.setState({compArray: this.compArray});
      Keyboard.dismiss();
    }
    //console.log(this.compArray);
    //console.log('touch')
  };



  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow = () => {
    var keyboardBool = true;
    this.setState({keyboardBool});
    if(this.selected != null){
      this.compArray[this.selected].isFocus = true;
      this.setState({compArray: this.compArray});
      //console.log(this.compArray)
    }

    //    console.log(this.state.keyboardBool);
    //  console.log('show keyboard')
  }

  _keyboardDidHide = () => {
    var keyboardBool = false;
    this.setState({keyboardBool});
    for(var i = 0; i < this.compArray.length; i++){
      this.compArray[i].isFocus = false;
      this.setState({compArray: this.compArray});
      //console.log(this.compArray)
    }
    //    console.log(this.state.keyboardBool);
    //  console.log('hide keyboard')
  }

  delete = () => {
    if(this.selected != null){
      console.log(this.compArray.splice(this.selected, 1));
      this.selected = null;

      this.setState({compArray: this.compArray});
      //  console.log(this.compArray)
    }
  }

  textCallback = (id, value) => {
    this.compArray[id].value = value;
    this.setState({compArray: this.compArray});
    //  console.log(this.compArray)
  }

  updateHeight = (id, value) => {
    this.compArray[id].height = value;
    this.setState({compArray: this.compArray});
    //  console.log(this.compArray)
  }

  hideKeyboard = () => {
    Keyboard.dismiss();
    if(this.selected != null){
      this.compArray[this.selected].isFocus = false;
      this.setState({compArray: this.compArray});
      //  console.log(this.compArray)
    }
  }

  changeTextColor = (color) => {
    if(this.selected != null){
      this.compArray[this.selected].textColor = color;
      this.setState({compArray: this.compArray});
      //  console.log('hi');
    }
  }

    changeWidth = (value) => {
      if(this.selected != null){
        this.compArray[this.selected].width = value;
        this.setState({compArray: this.compArray});
        //  console.log('hi');
      }
    }
  changeBackgroundColor = (color) => {
    if(this.selected != null){
      this.compArray[this.selected].backgroundColor = color;
      this.setState({compArray: this.compArray});
      //  console.log('hi');
    }
  }

  render(){
    this.compArray = this.props.arr[this.props.selectedPage].compArray;
    buttonsListArr = (() => this.compArray.map((function (object, index){
      switch(object.type){
        case 'image':
        return(
          <PinchableBox updateJSON={this.updateJSON} select={this.select} key={object.id} id={index} style={{zIndex: index, position: 'absolute'}} translateX={object.translateX} translateY={object.translateY} scale={object.scale} rotate={object.rotate} width={object.width} height={object.height}>
          <Image
          style={{
            padding: 0,
            margin: 0,
            opacity: this.checkStyle(object.isSelected),
            width: object.width,
            height: object.height,}}
            source={{
              uri: object.source,
            }}
            />
            </PinchableBox>);
            break;
            case 'text':

            var textbox = ((object.isFocus) ? <SelectableTextInput updateHeight={this.updateHeight} value={object.value} select={this.select} callback={this.textCallback} id={index} style={{width: object.width,
              height: object.height,
              textColor: object.textColor
            }}/> : <View style={{padding: 0, margin: 0, backgroundColor: object.backgroundColor, position: 'absolute'}}><Markdown style={{body: {color: object.textColor}}}>{object.value}</Markdown></View>)
            //console.log(object.value);
            //console.log('djfksal;');
            return(<PinchableBox updateJSON={this.updateJSON} select={this.select} key={object.id} id={index} style={{zIndex: index, position: 'absolute'}} translateX={object.translateX} translateY={object.translateY}  width={object.width} height={object.height} scale={object.scale} rotate={object.rotate}>
              {textbox}
              </PinchableBox>)
            }
          }).bind(this))).call();


          return(
            <View style={{}}>
            <Modal
            animationType='fade'
            visible={this.state.modalVisibleC}
            >
            <CardViewer viewHeight={this.props.viewHeight} arr={this.props.arr} setSelectedPage={(a) => this.props.setSelectedPage(a)}
            unshowCards={() => {this.setModalVisibleC(!this.state.modalVisibleC)}}
            createPage={() => this.props.createPage()}
            post={() => this.props.post()}
            />
            </Modal>
            <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
            >
              <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.2)',  flexDirection: 'column', justifySelf: 'center', textAlign: 'center'}} >
              <View style={{flex: 1}}>
              </View>
              <View style={{flex: 7}}>
              <Text style={{fontSize: 20, textAlign: 'center'}}>Change Text Background Color</Text>
              <ColorPicker color={this.compArray[this.selected]?.backgroundColor} onColorChange={this.changeBackgroundColor}/>
                <Button
                style={{alignSelf: 'center'}}
                icon={
                  <Icon
                  name='closecircleo'
                  size={30}
                  type='antdesign'
                  color='black'
                  />
                }
                buttonStyle={{backgroundColor: 'rgba(35, 35, 35, 0.34)',}}
                title=""
                onPress={() => this.setModalVisible(!this.state.modalVisible)}
                />
              </View>
              </View>

            </Modal>

            <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisibleB}
            >
              <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.2)', justifySelf: 'center'}} >
              <View style={{flex: 1}}>
              </View>
              <View style={{flex: 7}}>
                <Text style={{fontSize: 20, textAlign: 'center'}}>Change Text Color</Text>
                <ColorPicker color={this.compArray[this.selected]?.textColor} onColorChange={this.changeTextColor}/>
                <Button
                style={{alignSelf: 'center'}}
                icon={
                  <Icon
                  name='closecircleo'
                  size={30}
                  type='antdesign'
                  color='black'
                  />
                }
                buttonStyle={{backgroundColor: 'rgba(35, 35, 35, 0.34)',}}
                title=""
                onPress={() => this.setModalVisibleB(!this.state.modalVisibleB)}
                />
              </View>
              </View>
            </Modal>



            {((this.props.toolbar) ? <Toolbar expandCards={() => {this.setModalVisibleC(!this.state.modalVisibleC);}} backgroundColorPicker={() => {this.setModalVisible(!this.state.modalVisible);}} textColorPicker={() => {this.setModalVisibleB(!this.state.modalVisibleB);}} hideKeyboard={this.hideKeyboard} keyboardbool={this.state.keyboardBool} selecttextbool={((this.selected != null) && (this.compArray[this.selected].type=='text'))} addText={() => this.addText()} addClick={() => this.handleClick()} delete={() => this.delete()} moveDown={() => this.moveDown()} moveBottom={() => this.moveBottom()} changeWidth={this.changeWidth} moveUp={() => this.moveUp()} moveTop={() => this.moveTop()} selectbool={(this.selected != null)}/> : <View></View>)}

            {buttonsListArr}
            </View>
          )
        }
      }

      export class SelectableTextInput extends React.Component{
        constructor (props) {
          super(props);
          this.state = {
            newValue: '',
            height: this.props.height,
            width: this.props.width
          }
          this.keyboardBool = false;
        }
        updateSize = (height) => {
          this.setState({
            height
          });
          this.props.updateHeight(this.props.id, height);
          //console.log('broskis');
        }
        updateWidth = (val) => {
          var pixelWidth = require('string-pixel-width');

          let width = pixelWidth(val, { font: 'open sans', size: 12 });
          console.log('This text is ' + width + 'px long in the size of 10px.');
          width += 5;
          this.setState({
            width
          });
        }





        render(){
          const {newValue, height, width} = this.state;

          let aStyle = {
            height,
            backgroundColor: 'rgba(0,0,0,0.03)'
            ,fontSize: 14
          }

          var value = null;
          return(
            <TextInput
            {... this.props}
            placeholder="YOUR TEXT HERE"
            style={[aStyle]}
            multiline={true}
            //  onSubmitEditing={Keyboard.dismiss}
            keyboardType= 'default'
            autoFocus={true}
            onChangeText={(value) => {this.setState({value}); this.props.callback(this.props.id, value)}}
            // Inherit any props passed to it; e.g., multiline, numberOfLines below
            onContentSizeChange={(e) => this.updateSize(e.nativeEvent.contentSize.height + 20)}
            editable
            onFocus={this.focusEvent}

            />
          )
        }
      }

      export class Toolbar extends React.Component{
        constructor(){
          super();


        }



        render(){
          //  console.log('hey');

          let closeText = ((this.props.selecttextbool && this.props.keyboardbool) ? (<KeyboardAvoidingView style={{alignSelf: 'flex-start'}}>
          <Button
          icon={
            <Icon
            name='keyboard-hide'
            size={30}
            type='materialicons'
            color='red'
            />
          }
          buttonStyle={{backgroundColor: 'rgba(35, 35, 35, 0.34)',}}
          title=""
          onPress={() => this.props.hideKeyboard()}
          />

          </KeyboardAvoidingView> ):(<View></View>));

          let vertslide = (this.props.selecttextbool ? (<View>
            <RnVerticalSlider
        value={100}
        disabled={false}
        min={50}
        max={400}
        onChange={(value: number) => {
          this.props.changeWidth(value)
        }}
        onComplete={(value: number) => {
          this.props.changeWidth(value)
        }}
        width={20}
        height={300}
        step={1}
        borderRadius={5}
        minimumTrackTintColor={'#32a88b'}
        maximumTrackTintColor={'rgba(0,0,0,0.3)'}
        showBallIndicator
        ballIndicatorColor={'gray'}
        ballIndicatorTextColor={'white'}
      />
            </View> ):(<View></View>));

          let colorpicks = (this.props.selecttextbool ? (<View>
            <Button
            style={{alignSelf: 'flex-start'}}
            icon={
              <Icon
              name='text-color'
              size={30}
              type='foundation'
              color='black'
              />
            }
            buttonStyle={{backgroundColor: 'rgba(35, 35, 35, 0.34)',}}
            title=""
            onPress={() => this.props.textColorPicker()}
            />

            <Button
            style={{alignSelf: 'flex-start'}}
            icon={
              <Icon
              name='background-color'
              size={30}
              type='foundation'
              color='black'
              />
            }
            buttonStyle={{backgroundColor: 'rgba(35, 35, 35, 0.34)',}}
            title=""
            onPress={() => this.props.backgroundColorPicker()}
            />
            </View> ):(<View></View>));

            let move = (this.props.selectbool ? (<View>
              <Button
              style={{alignSelf: 'flex-end'}}
              icon={
                <Icon
                name='chevrons-up'
                size={30}
                type='feather'
                color='black'
                />
              }
              buttonStyle={{backgroundColor: 'rgba(35, 35, 35, 0.34)',}}
              title=""
              onPress={() => this.props.moveTop()}
              />

              <Button
              style={{alignSelf: 'flex-end'}}
              icon={
                <Icon
                name='chevron-up'
                size={30}
                type='feather'
                color='black'
                />
              }
              buttonStyle={{backgroundColor: 'rgba(35, 35, 35, 0.34)',}}
              title=""
              onPress={() => this.props.moveUp()}
              />

              <Button
              style={{alignSelf: 'flex-end'}}
              icon={
                <Icon
                name='chevron-down'
                size={30}
                type='feather'
                color='black'
                />
              }
              buttonStyle={{backgroundColor: 'rgba(35, 35, 35, 0.34)',}}
              title=""
              onPress={() => this.props.moveDown()}
              />

              <Button
              style={{alignSelf: 'flex-end'}}
              icon={
                <Icon
                name='chevrons-down'
                size={30}
                type='feather'
                color='black'
                />
              }
              buttonStyle={{backgroundColor: 'rgba(35, 35, 35, 0.34)',}}
              title=""
              onPress={() => this.props.moveBottom()}
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
              buttonStyle={{backgroundColor: 'rgba(35, 35, 35, 0.34)',}}
              title=""
              onPress={() => this.props.delete()}
              />
              </View> ):(<View></View>));
              return (
                <View style={{zIndex: 1000, flex: 1}}>
                <View style={{zIndex: 1000, flex: 1, flexDirection: 'column', position: 'absolute'}}>{closeText}{colorpicks}{vertslide}</View>
                <View style={{zIndex: 1000, flex: 1, flexDirection: 'row', position: 'absolute', alignSelf: 'flex-end'}}>

                <View style={{flexDirection: 'column'}}>
                <Button
                style={{alignSelf: 'flex-end'}}
                icon={
                  <Icon
                  name='edit'
                  size={30}
                  type='antdesign'
                  color='black'
                  />
                }
                buttonStyle={{backgroundColor: 'rgba(35, 35, 35, 0.34)',}}
                title=""
                onPress={() => {}}
                />
                <Button
                style={{alignSelf: 'flex-end'}}
                icon={
                  <Icon
                  name='cards-outline'
                  size={30}
                  type='material-community'
                  color='black'
                  />
                }
                buttonStyle={{backgroundColor: 'rgba(35, 35, 35, 0.34)',}}
                title=""
                onPress={() => this.props.expandCards()}
                />

                <Button
                style={{alignSelf: 'flex-end'}}
                icon={
                  <Icon
                  name='text-fields'
                  size={30}
                  type='materialicons'
                  color='black'
                  />
                }
                buttonStyle={{backgroundColor: 'rgba(35, 35, 35, 0.34)',}}
                title=""
                onPress={() => {this.props.addText()}}
                />

                <Button
                style={{alignSelf: 'flex-end'}}
                icon={
                  <Icon
                  name='addfile'
                  size={30}
                  type='antdesign'
                  color='black'
                  />
                }
                buttonStyle={{backgroundColor: 'rgba(35, 35, 35, 0.34)',}}
                title=""
                onPress={() => this.props.addClick()}
                />

                {move}

                </View>
                </View>
                </View>


              )
            }
          }

          export default class EditScreen extends React.Component{
            constructor(){
              super();
              this.toolbar = true;
              this.compArray = [
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
              ]
              this.selectedPage = 0;
            }

            post = async () => {
              var prox = uuidv4();
              console.log(prox);
              for(var i = 0; i < this.compArray.length; i++){
                for(var j = 0; j < this.compArray[i].compArray.length; j++){
                  switch(this.compArray[i].compArray[j].type){
                    case 'image':
                      if(typeof this.compArray[i].compArray[j].base64 != 'undefined'){

                          var result = await postImage(this.compArray[i].compArray[j].base64);

                          var src = await result.data.link;
                          this.compArray[i].compArray[j].source = await src;
                          delete this.compArray[i].compArray[j].base64;

                      }
                      break;
                  }
                }
              }
              postData(prox, this.compArray);
            }


            setSelectedPage = (a) => {
              //console.log(this.toolbar);
              this.selectedPage = a;
              this.setState({selectedPage: this.selectedPage})
            //  console.log('selected page');
            //  console.log(this.selectedPage);
            //  console.log(this.toolbar);
            }

            createPage = () => {
              this.compArray.push(
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
            });
            this.setState({compArray: this.compArray});
            //console.log(this.compArray);
            }

            toggleToolbar = () => {
              //console.log(this.toolbar);
              this.toolbar = !this.toolbar;
              this.setState({toolbar: this.toolbar})
            //  console.log(this.toolbar);
            }

            render(){
              return(

                <View style={[styles.container, {overflow: 'hidden'} ]}  onLayout={(event) => {
  this.width = event.nativeEvent.layout.width;
  this.height = event.nativeEvent.layout.height;
  this.setState({width: this.width});
  this.setState({height: this.height});
  console.log('width: '+this.width+' height: '+this.height);
}}>
                <View style={{position: 'absolute', bottom: 0, left: 0}}>
                <Switch
                trackColor={{ false: "red", true: "#3e3e3e" }}
                thumbColor={this.toolbar ? "#f4f3f4" : "#f4f3f4"}
                onValueChange={this.toggleToolbar}
                value={this.toolbar}
                ios_backgroundColor="red"
                />
                </View>
                <Blob post={() => this.post()} viewWidth={this.width} viewHeight={this.height}  createPage={() => this.createPage()} setSelectedPage={(a) => this.setSelectedPage(a)} selectedPage={this.selectedPage} arr={this.compArray} toolbar={this.toolbar}/>


                </View>
              )
            }
          }

          const styles = StyleSheet.create({
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
            textStyles:{

            },
            title: {
              marginTop: 16,
              paddingVertical: 8,
              borderWidth: 4,
              borderColor: "#20232a",
              borderRadius: 6,
              backgroundColor: "transparent",
              color: "#20232a",
              textAlign: "center",
              fontSize: 30,
              fontWeight: "bold"
            }
          });
