import React from 'react';
import { Animated, StyleSheet } from 'react-native';

import {
  PanGestureHandler,
  PinchGestureHandler,
  RotationGestureHandler,
  TapGestureHandler,
  State,
} from 'react-native-gesture-handler';

export class PinchableBox extends React.Component {
  panRef = React.createRef();
  rotationRef = React.createRef();
  pinchRef = React.createRef();
  constructor(props) {
    super(props);

    this._translateX = new Animated.Value(0);
    this._translateY = new Animated.Value(0);
    this._lastOffset = { x: this.props.translateX, y: this.props.translateY };
    this._translateX.setOffset(this._lastOffset.x);
    this._translateX.setValue(0);
    this._translateY.setOffset(this._lastOffset.y);
    this._translateY.setValue(0);
    this._onGestureEvent = Animated.event(
      [
        {
          nativeEvent: {
            translationX: this._translateX,
            translationY: this._translateY,
          },
        },
      ],
      { useNativeDriver: true }
    );

    /* Pinching */
    this._baseScale = new Animated.Value(1);
    this._pinchScale = new Animated.Value(1);
    this._scale = Animated.multiply(this._baseScale, this._pinchScale);
    this._lastScale = this.props.scale;
    this._baseScale.setValue(this._lastScale);
    this._pinchScale.setValue(1);
    this._onPinchGestureEvent = Animated.event(
      [{ nativeEvent: { scale: this._pinchScale } }],
      { useNativeDriver: true }
    );

    /* Rotation */
    this._rotate = new Animated.Value(0);
    this._rotateStr = this._rotate.interpolate({
      inputRange: [-100, 100],
      outputRange: ['-100rad', '100rad'],
    });
    this._lastRotate = this.props.rotate;
    this._rotate.setOffset(this._lastRotate);
    this._rotate.setValue(0);
    this._onRotateGestureEvent = Animated.event(
      [{ nativeEvent: { rotation: this._rotate } }],
      { useNativeDriver: true }
    );

    /* Tilt */
    this._tilt = new Animated.Value(0);
    this._tiltStr = this._tilt.interpolate({
      inputRange: [-501, -500, 0, 1],
      outputRange: ['1rad', '1rad', '0rad', '0rad'],
    });
    this._lastTilt = 0;
    this._onTiltGestureEvent = Animated.event(
      [{ nativeEvent: { translationY: this._tilt } }],
      { useNativeDriver: true }
    );
  }

  reconstruct = () => {
        this._lastOffset = { x: this.props.translateX, y: this.props.translateY };
        this._translateX.setOffset(this._lastOffset.x);
        this._translateX.setValue(0);
        this._translateY.setOffset(this._lastOffset.y);
        this._translateY.setValue(0);



        this._scale = Animated.multiply(this._baseScale, this._pinchScale);
        this._lastScale = this.props.scale;
        this._baseScale.setValue(this._lastScale);
        this._pinchScale.setValue(1);


        /* Rotation */
        this._rotate = new Animated.Value(0);
        this._rotateStr = this._rotate.interpolate({
          inputRange: [-100, 100],
          outputRange: ['-100rad', '100rad'],
        });
        this._lastRotate = this.props.rotate;
        this._rotate.setOffset(this._lastRotate);
        this._rotate.setValue(0);
        this._onRotateGestureEvent = Animated.event(
          [{ nativeEvent: { rotation: this._rotate } }],
          { useNativeDriver: true }
        );

        /* Tilt */
        this._tilt = new Animated.Value(0);
        this._tiltStr = this._tilt.interpolate({
          inputRange: [-501, -500, 0, 1],
          outputRange: ['1rad', '1rad', '0rad', '0rad'],
        });
        this._lastTilt = 0;
        this._onTiltGestureEvent = Animated.event(
          [{ nativeEvent: { translationY: this._tilt } }],
          { useNativeDriver: true }
        );
  }

  _onHandlerStateChange = event => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      this._lastOffset.x += event.nativeEvent.translationX;
      this._lastOffset.y += event.nativeEvent.translationY;
      this._translateX.setOffset(this._lastOffset.x);
      this._translateX.setValue(0);
      this._translateY.setOffset(this._lastOffset.y);
      this._translateY.setValue(0);
      this.props.updateJSON(this.props.id, this._lastOffset.x, this._lastOffset.y, this._lastScale, this._lastRotate)
    }else if(event.nativeEvent.state === State.END){
      this.props.updateJSON(this.props.id, this._lastOffset.x, this._lastOffset.y, this._lastScale, this._lastRotate)
      this.reconstruct();
    }
  };

  _onRotateHandlerStateChange = event => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      this._lastRotate += event.nativeEvent.rotation;
      this._rotate.setOffset(this._lastRotate);
      this._rotate.setValue(0);
      this.props.updateJSON(this.props.id, this._lastOffset.x, this._lastOffset.y, this._lastScale, this._lastRotate)
    }else if(event.nativeEvent.state === State.END){
      this.props.updateJSON(this.props.id, this._lastOffset.x, this._lastOffset.y, this._lastScale, this._lastRotate)
      this.reconstruct();
    }
  };
  _onPinchHandlerStateChange = event => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      this._lastScale *= event.nativeEvent.scale;
      this._baseScale.setValue(this._lastScale);
      this._pinchScale.setValue(1);
      this.props.updateJSON(this.props.id, this._lastOffset.x, this._lastOffset.y, this._lastScale, this._lastRotate)
    }else if(event.nativeEvent.state === State.END){
      this.props.updateJSON(this.props.id, this._lastOffset.x, this._lastOffset.y, this._lastScale, this._lastRotate)
      this.reconstruct();
    }
  };
  _onTiltGestureStateChange = event => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      this._lastTilt += event.nativeEvent.translationY;
      this._tilt.setOffset(this._lastTilt);
      this._tilt.setValue(0);
      //this.props.updateJSON(this.props.id, this._lastOffset.x, this._lastOffset.y, this._lastScale, this._lastRotate)
    }
  };
  _onSingleTap = event => {
    if (event.nativeEvent.state === State.ACTIVE) {

      this.props.select(this.props.id);
    }
  };
  render() {
    return (

      <PanGestureHandler
        {...this.props}
        onGestureEvent={this._onGestureEvent}
        onHandlerStateChange={this._onHandlerStateChange}>
        <Animated.View style={styles.wrapper}>
          <RotationGestureHandler
            ref={this.rotationRef}
            simultaneousHandlers={this.pinchRef}
            onGestureEvent={this._onRotateGestureEvent}
            onHandlerStateChange={this._onRotateHandlerStateChange}>
            <Animated.View style={styles.wrapper}>
              <PinchGestureHandler
                ref={this.pinchRef}
                simultaneousHandlers={this.rotationRef}
                onGestureEvent={this._onPinchGestureEvent}
                onHandlerStateChange={this._onPinchHandlerStateChange}>
                <Animated.View style={styles.wrapper}>
                <TapGestureHandler onHandlerStateChange={this._onSingleTap}>

                <Animated.View style={[

                  {
                    width: this.props.width,
                  height: this.props.height,
                    transform: [
                      { perspective: 200 },
                      { translateX: this._translateX },
                      { translateY: this._translateY },
                      { scale: this._scale },
                      { rotate: this._rotateStr },
                    ],
                    backgroundColor: "transparent",


                  },
                ]}>
                  {this.props.children}
                </Animated.View>
                </TapGestureHandler>
                </Animated.View>
              </PinchGestureHandler>
            </Animated.View>
          </RotationGestureHandler>
        </Animated.View>
      </PanGestureHandler>

    );
  }
}

export default PinchableBox;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});
