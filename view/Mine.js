'use strict';

import React, { Component } from 'react';
import
{
 StyleSheet,
 Text,
 Image,
 View,
 TouchableOpacity,
} from 'react-native';

import Util from './Util';
import SubTitleBar from './SubTitleBar';
/**
我的
**/
export default class Mine extends Component{
  render(){
    return(
      <View style={{width:200,height:100,backgroundColor:'red'}}>
      <SubTitleBar title='我的'/>
      <View>
    
      </View>
      </View>
    );
  }
}
