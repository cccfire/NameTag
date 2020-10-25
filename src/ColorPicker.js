import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, ThemeProvider, Header, Icon } from 'react-native-elements';
import tinycolor from 'tinycolor2';
import HueSlider from './HueSlider.js';
import LightnessSlider from './LightnessSlider.js';
import SaturationSlider from './SaturationSlider.js';
import AlphaSlider from './AlphaSlider.js';
const modes = {
  hex: {
    getString: color => tinycolor(color).toHexString(),
    label: 'HEX'
  },
  hsl: {
    getString: color => tinycolor(color).toHslString(),
    label: 'HSL'
  },
  hsv: {
    getString: color => tinycolor(color).toHsvString(),
    label: 'HSV'
  },
  rgb: {
    getString: color => tinycolor(color).toRgbString(),
    label: 'RGB'
  }
};

export default class ColorPicker extends React.Component{
  constructor(props) {
    super(props);
    const color = tinycolor(this.props.color).toHsl();
    //const mode = tinycolor(this.props.mode).toHsl();
    this.state = {
      color,
      mode: 'hex'
    };
  }

  updateHue = h => {this.setState({ color: { ...this.state.color, h } }); this.props.onColorChange?.(tinycolor(this.state.color).toHslString());}
  updateSaturation = s => {this.setState({ color: { ...this.state.color, s } }); this.props.onColorChange?.(tinycolor(this.state.color).toHslString());}
  updateLightness = l => {this.setState({ color: { ...this.state.color, l } }); this.props.onColorChange?.(tinycolor(this.state.color).toHslString());}
  updateAlpha = a => {this.setState({ color: { ...this.state.color, a } }); this.props.onColorChange?.(tinycolor(this.state.color).toHslString());}
  render(){
    const colorHex = tinycolor(this.state.color).toHslString();
  //  console.log(tinycolor(this.state.color).toHslString());
//console.log(this.state.color)
    return(

      <View>
<View style={{width: 250, height: 250, backgroundColor: colorHex, alignSelf: 'center'}}></View>

    <HueSlider
      style={styles.sliderRow}
      gradientSteps={40}
      value={this.state.color.h}
      onValueChange={this.updateHue}
    />
    <SaturationSlider
      style={styles.sliderRow}
      gradientSteps={20}
      value={this.state.color.s}
      color={this.state.color}
      onValueChange={this.updateSaturation}
    />
    <LightnessSlider
      style={styles.sliderRow}
      gradientSteps={20}
      value={this.state.color.l}
      color={this.state.color}
      onValueChange={this.updateLightness}
    />
    <AlphaSlider
      style={styles.sliderRow}
      gradientSteps={40}
      color={this.state.color}
      value={this.state.color.a}
      onValueChange={this.updateAlpha}
    />
  </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#eaeaea"
  },sliderRow: {
    marginTop: 16
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
