import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import GradientSlider from './GradientSlider';
import AlphaGradient from './AlphaGradient';
import tinycolor from 'tinycolor2';

const AlphaSlider = ({ style, value, onValueChange, color, gradientSteps }) => {
  return (
    <GradientSlider
      gradient={<AlphaGradient gradientSteps={gradientSteps} />}
      style={style}
      step={0.01}
      maximumValue={1}
      value={value}
      thumbTintColor={tinycolor({ ...color, a: value }).toHslString()}
      onValueChange={onValueChange}
    />
  );
};

export default AlphaSlider;

AlphaSlider.propTypes = {
  value: PropTypes.number.isRequired,
  onValueChange: PropTypes.func.isRequired,
  gradientSteps: PropTypes.number.isRequired
};
