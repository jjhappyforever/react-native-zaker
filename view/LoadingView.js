'use strict';

import React, { Component } from 'react';

import
{
 StyleSheet,
 Text,
 View,
 Image,
 TouchableOpacity,
 Platform,
 ActivityIndicator,
} from 'react-native';

import Util from './Util';
/**
进度条
**/
export default class LoadingView extends Component{
  render(){
    var {title}=this.props;
    return(
      <View style={styles.container}>
      <ActivityIndicator
       color="#fb4747"
       style={{height:60}}
       size='large'
      />
      </View>
    );
  }
}


const styles=StyleSheet.create({
  container:{
    flex:1,
    height:null,
    paddingTop:null,
    alignItems:'center',
    justifyContent:'center',
  },
});
