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
  StatusBar,
  Platform,
  ActivityIndicator,
} from 'react-native';

import SimpleListView from './view/SimpleListView';
import SubTitleBar from './view/SubTitleBar';
import Detail from './view/Detail';

const toolbarAction=[
  {title:'频道订阅',icon: require('image!ic_search'),show:'always'},
  {title:'我的',icon: require('image!ic_personal_normal'),show:'always'}
];

export default class NewList extends Component {

  render() {
    return (
      <View style={styles.container}>
      <StatusBar
       backgroundColor='#fb4747'
       barStyle='light-content'
       animated={true}
       hidden={false}
      />
      <SubTitleBar navigator={this.props.navigator} title={this.props.title}/>
      <SimpleListView navigator={this.props.navigator} theme={this.props.id}/>
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
