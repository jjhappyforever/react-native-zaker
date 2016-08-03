
import React, { Component } from 'react';
import {
  StyleSheet,
  Navigator,
} from 'react-native';


import App from './app';

const toolbarAction=[
  {title:'频道订阅',icon: require('image!ic_search'),show:'always'},
  {title:'我的',icon: require('image!ic_personal_normal'),show:'always'}
];


export default class Root extends Component{

  render(){
    let defaultName='app';
    let defaultComponent=App;
    return(
      <Navigator
       initialRoute={{name:defaultName,component:defaultComponent}}
       configureScene={()=>Navigator.SceneConfigs.PushFromRight}
       renderScene={(route, navigator) => {
         let Component = route.component;
         return <Component {...route.params} navigator={navigator} />
      }} />
    );
  }
}
