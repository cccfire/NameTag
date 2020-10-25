import React, { Component } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from 'react-native';
import Markdown from 'react-native-markdown-display';

export default class MarkdownEditor extends Component {
  state = { text: 'type here ...' ,
inputText: ''};
  onClick = e => {
    this.textInput.focus();
  };
  render() {
    return (

      <View style={styles.container}>
      <TouchableOpacity onPress={this.onClick}>
        <Markdown style={{color: 'red'}}>{this.state.text}</Markdown>
      </TouchableOpacity>
      <TextInput
        ref={input => { this.textInput = input }}
        style={{color: 'transparent'}}
        onChangeText={text => {this.setState({text: text});}}
        value={this.state.text}
        multiline={true}
        >



      </TextInput>



      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
});
