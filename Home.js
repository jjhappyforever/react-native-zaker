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
  ScrollView,
} from 'react-native';

import Util from './view/Util';
import TitleBar from './view/TitleBar';
import GridView from './view/GridView';
import Mine from  './view/Mine';

import HomeBanner from './view/HomeBanner';

const toolbarAction=[
  {title:'频道订阅',icon: require('image!ic_search'),show:'always'},
  {title:'我的',icon: require('image!ic_personal_normal'),show:'always'}
];

export default  class Home extends Component {

  constructor(){
    super();
  }

  //渲染每一个Banner
  renderPage(data){
   return(
     <Image
    source={{uri: data.image}}
    style={styles.banner} />
   );
  }
  //actionbar click
  onActionSelected(position){
   if(position==0){
     this.props.navigator.push({
       navigator:Mine,
       name:'Mine',
     });
   }
  }

  //我的点击
  onPressMine(){
   alert('我的');
  }

  onPressSearch(){
   var{navigator}=this.props;
   navigator.push({name:'Mine',component:Mine});
  }

  render() {
      var titleBar;
      if(Platform.OS==='android'){
        titleBar=<ToolbarAndroid
        subtitle='订阅'
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
       <ScrollView>
       <View>
       <HomeBanner/>
       <GridView
        navigator={this.props.navigator}
       />
       </View>
       </ScrollView>
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
