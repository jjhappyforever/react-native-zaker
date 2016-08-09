'use strict';
import React, { Component,PropTypes } from 'react';
import {
  StyleSheet,
  Image,
  View,
} from 'react-native';

var Animated = require('Animated');

import Util from './view/Util';

export default class Splash extends Component{

  static propsTypes={
    style:View.propTypes.style,
    onAnimEnd:PropTypes.func,
  }

  constructor(props){
    super(props);
    this.state={
      bounceAnimValue:new Animated.Value(1),
      opacityAnimValue:new Animated.Value(1),
    };
  }

  componentDidMount(){
    Animated.timing(
      this.state.bounceAnimValue,
      {
        toValue: 0.8,
        duration: 400,
        delay:1000,
      }
    ).start();
    Animated.timing(
      this.state.opacityAnimValue,
      {
        toValue:0,
        duration:400,
        delay:1000,
      }
    ).start();

    this.state.bounceAnimValue.addListener(value=>{
      if(value.value=='0.8'){
       this.props.onAnimEnd();
      }
    });
  }

  render(){
    return(
      <View style={[styles.container,this.props.style]}>
        <Animated.Image
          source={require('./images/splash.jpg')}
          style={{
            flex: 1,
            width: Util.size.width,
            height:null,
            opacity: this.state.opacityAnimValue,
            transform: [
              {scale: this.state.bounceAnimValue},
            ],
          }} />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    position:'absolute',
    height:500,
  },

});
