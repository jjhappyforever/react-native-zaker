'use strict';

import React, { Component } from 'react';

import
{
 StyleSheet,
 Text,
 View,
 Image,
 Platform,
 TouchableOpacity,
} from 'react-native';

import Util from './Util';

export default class TitleBar extends Component{

  render(){
    const{onPressSearch,onPressMine}=this.props;
    return(
      <View style={styles.titleBar}>
      <Text style={{flex:1,color:'#fff',fontSize:16}}>订阅</Text>
      <TouchableOpacity onPress={onPressSearch}>
      <Image style={[styles.icon,{marginRight:5}]} source={require('./../images/ic_search.png')}/>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressMine}>
      <Image style={styles.icon} source={require('./../images/ic_personal_normal.png')}/>
      </TouchableOpacity>
      </View>
    );
  }
}
const styles=StyleSheet.create({
  //android ios statusbar 兼容
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
    width:35,
    height:35,
  }
});
