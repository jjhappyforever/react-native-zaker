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
} from 'react-native';

import Util from './Util';

import Icon from 'react-native-vector-icons/FontAwesome';

export default class SubTitleBar extends Component{

  render(){
    return(
      <View style={styles.titleBar}>

      <TouchableOpacity onPress={()=>this.props.navigator.pop()}>
      <Icon name="angle-left" size={30} color="#fff" />
      </TouchableOpacity>
      <View style={{flex:1,alignItems:'center',}}>
      <Text style={{color:'#fff',fontSize:16}}>{this.props.title}</Text>
      </View>
      <View style={styles.icon}/>
      </View>
    );
  }
}

const styles=StyleSheet.create({
  titleBar:{
    height:Platform.OS=='android'?50:66,
    paddingTop:Platform.OS=='android'?0:15,
    flexDirection:'row',
    alignItems:'center',
    backgroundColor:'#fb4747',
    paddingLeft:15,
    paddingRight:10,
  },
  icon:{
    width:25,
    height:25,
  }
});
