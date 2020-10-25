import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

function createHTML(options = {}) {
    const {
        backgroundColor = '#FFF',
        color = '#000033',
        placeholderColor = '#a9a9a9',
        contentCSSText = '',
        cssText = '',
    } = options;
    //ERROR: HTML height not 100%;
    return `
<!DOCTYPE html>
<html>
<head>
<style>h1 {
  font-size: 10vw;
}</style>
</head>
<body>
<h1>hi</h1>
</body>
</html>
`;
}

const HTML = createHTML();
export {HTML, createHTML};


export default class WebViewTest extends Component {

  render() {
    return (
      <View style={{ width: 100, height: 50, backgroundColor: 'transparent'}}>
      <WebView style={{backgroundColor: 'red', width: 300, height: 200}} source={{ html: HTML }} scalesPageToFit={false}></WebView>

      </View>
    );
  }
}
