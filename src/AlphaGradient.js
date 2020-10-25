import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import tinycolor from 'tinycolor2';
import Gradient from './Gradient';

class AlphaGradient extends PureComponent {
  getStepColor = i => tinycolor({ s: 1, l: 0.5, h: 1, a: i }).toHslString();

  render() {
    const { style, gradientSteps } = this.props;
    return (
      <Gradient
        style={style}
        gradientSteps={gradientSteps}
        getStepColor={this.getStepColor}
        maximumValue={1}
      />
    );
  }
}

export default AlphaGradient;

AlphaGradient.propTypes = {
  gradientSteps: PropTypes.number.isRequired
};
