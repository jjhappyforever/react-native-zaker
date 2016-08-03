/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  ToolbarAndroid,
  View,
  Image,
  StatusBar,
  Platform,
  Navigator,
  BackAndroid,
  ToastAndroid,
} from 'react-native';

import Util from './view/Util';
import TitleBar from './view/TitleBar';
import GridView from './view/GridView';
import Mine from  './view/Mine';

const toolbarAction=[
  {title:'频道订阅',icon: require('image!ic_search'),show:'always'},
  {title:'我的',icon: require('image!ic_personal_normal'),show:'always'}
];


export default class city extends Component {

  constructor(){
    super();
  }

  render() {
    var titleBar;
    if(Platform.OS==='android'){
      titleBar=<ToolbarAndroid
      subtitle='上海'
      subtitleColor='#fff'
      style={styles.toolbar}
      actions={toolbarAction}
      onActionSelected={this.onActionSelected}
      />;
    }else if(Platform.OS==='ios'){
      titleBar=<TitleBar/>
    }
      return (
        <View style={styles.container}>
        <StatusBar
         backgroundColor='#fb4747'
         barStyle='light-content'
         animated={true}
         hidden={false}
        />
        {titleBar}
        <View style={{flex:1,alignItems:'center',marginTop:50}}>
        <Text style={{fontSize:20}}>上海</Text>
        </View>
        </View>
    );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  toolbar:{
    backgroundColor:'#fb4747',
    height:48,
  },
  banner:{
    height:173,
    width:Util.size.width,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
