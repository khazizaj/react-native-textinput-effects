import React from 'react';
import PropTypes from 'prop-types';
import {
  Animated,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';

import BaseInput from './BaseInput';

const fontScale = Dimensions.get("window").fontScale;

export default class Hoshi extends BaseInput {
  static propTypes = {
    borderColor: PropTypes.string,
    /*
     * this is used to set backgroundColor of label mask.
     * this should be replaced if we can find a better way to mask label animation.
     */
    maskColor: PropTypes.string,
    inputPadding: PropTypes.number,
    height: PropTypes.number,
  };

  static defaultProps = {
    borderColor: 'red',
    inputPadding: 16,
    height: 48,
    borderHeight: 3,
  };

  render() {
    const {
      label,
      style: containerStyle,
      inputStyle,
      labelStyle,
      maskColor,
      borderColor,
      borderHeight,
      inputPadding,
      height: inputHeight,
    } = this.props;
    const { width, focusedAnim, value } = this.state;
    const flatStyles = StyleSheet.flatten(containerStyle) || {};
    const containerWidth = flatStyles.width || width;
    let marginTop = 0;
    console.log('FONT SCALE', fontScale);
    console.log('HEIGHT', inputHeight + (fontScale<1 ? 0 : inputPadding) + fontScale);
    console.log(fontScale);
    if(fontScale === 1) {
      marginTop = 0;
    }
    else if (fontScale === 0.823) {
      marginTop = this.state.focused ? fontScale*5 : 0;
    }
    else if (fontScale === 0.882) {
      marginTop = this.state.focused ? fontScale*6 : 0;
    }
    else if (fontScale === 0.941) {
      marginTop = this.state.focused ? fontScale*7 : 0;
    }
    else if (fontScale === 1.118) {
      marginTop = this.state.focused ? fontScale * 2 : fontScale;
    }
    else if (fontScale === 1.235) {
      marginTop = this.state.focused ? fontScale * 4 : fontScale * 2;
    }
    else if (fontScale === 1.353) {
      marginTop = this.state.focused ? fontScale * 6 : fontScale * 3;
    }
    else if (fontScale === 1.786) {
      marginTop = this.state.focused ? fontScale * 8 : fontScale * 4;
    }
    else if (fontScale === 2.143) {
      marginTop = this.state.focused ? fontScale * 10 : fontScale * 5;
    }
    else if (fontScale === 2.643) {
      marginTop = this.state.focused ? fontScale * 12 : fontScale * 6;
    }
    else if (fontScale === 3.143) {
      marginTop = this.state.focused ? fontScale * 14 : fontScale*7;
    }
    else if (fontScale === 3.571) {
      marginTop = this.state.focused ? fontScale * 16 : fontScale * 8;
    }
    return (
        <View
            style={[
              styles.container,
              containerStyle,
              {
                height: inputHeight + (fontScale<1 ? 0 : inputPadding) + fontScale*2,
                width: containerWidth,
              },
            ]}
            onLayout={this._onLayout}
        >
          <TextInput
              ref={this.input}
              {...this.props}
              style={[
                styles.textInput,
                inputStyle,
                {
                  width,
                  height: inputHeight,
                },
              ]}
              value={value}
              onBlur={(event) => {
                this.setState({focused:false});
                this._onBlur(event);
              }}
              onChange={this._onChange}
              onFocus={(event) => {
                this.setState({focused: true});
                this._onFocus(event);
              }}
              underlineColorAndroid={'transparent'}
          />
          <TouchableWithoutFeedback onPress={this.focus}>
            <Animated.View
                style={[
                  styles.labelContainer,
                  {
                    opacity: focusedAnim.interpolate({
                      inputRange: [0, 0.5, 1],
                      outputRange: [1, 0, 1],
                    }),
                    top: focusedAnim.interpolate({
                      inputRange: [0, 0.5, 0.5, 1],
                      outputRange: [24, 24, 0, 0],
                    }),
                    left: focusedAnim.interpolate({
                      inputRange: [0, 0.5, 0.5, 1],
                      outputRange: [0, 0, 0, 0],
                    }),
                  },
                ]}
            >
              <Text style={[
                styles.label,
                labelStyle,
                {
                  top: -marginTop,
                }
              ]}>
                {label}
              </Text>
            </Animated.View>
          </TouchableWithoutFeedback>
          <View
              style={[styles.labelMask, {
                backgroundColor: maskColor,
                width: inputPadding,
              }]}
          />
          <Animated.View
              style={[
                styles.border,
                {
                  width: focusedAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, width],
                  }),
                  backgroundColor: borderColor,
                  height: borderHeight,
                },
              ]}
          />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 2,
    borderBottomColor: '#b9c1ca',
  },
  labelContainer: {
    position: 'absolute',
  },
  label: {
    fontSize: 16,
    color: '#6a7989',
  },
  textInput: {
    position: 'absolute',
    bottom: 2,
    padding: 0,
    color: '#6a7989',
    fontSize: 18,
    fontWeight: 'bold',
  },
  labelMask: {
    height: 24,
  },
  border: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});
