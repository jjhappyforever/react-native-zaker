'use strict';

import React, { Component } from 'react';

import
{
 StyleSheet,
 Text,
 View,
 Image,
 WebView,
 StatusBar,
} from 'react-native';

import Util from './Util';
import DetailTitleBar from './DetailTitleBar';

export default class Detail extends Component{

  render(){
    var{data}=this.props;
    return(
      <View style={styles.container}>
      <StatusBar
       backgroundColor='#fb4747'
       barStyle='light-content'
       animated={true}
       hidden={false}
      />
      <DetailTitleBar navigator={this.props.navigator} title={this.props.title}/>
      <WebView
      style={styles.webview}
      source={{uri:'http://daily.zhihu.com/story/'+data.id}}
      />
      </View>
    );
  }
}

const styles=StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  webview:{
  flex:1,
  }
});
