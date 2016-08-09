
import React, { Component } from 'react';
import {
  StyleSheet,
  Navigator,
  View,
  Animated,
  Text,
  Platform,
} from 'react-native';

import App from './app';

const toolbarAction=[
  {title:'频道订阅',icon: require('image!ic_search'),show:'always'},
  {title:'我的',icon: require('image!ic_personal_normal'),show:'always'}
];

import Splash from './Splash';
import Util from './view/Util';

export default class Root extends Component{

  constructor(props){
    super(props);
    this.state={
      splashed:false,
      bounceAnimValue:new Animated.Value(1.4),//初始化
    };
    this.onAnimEnd=this.onAnimEnd.bind(this);
  }

  componentDidMount(){
    Animated.timing(this.state.bounceAnimValue,
    {
      toValue:1,
      duration:400,
      delay:1000,
    }).start();
  }

  //splash 动画执行完毕回调
  onAnimEnd(){
   this.setState({
     splashed:true
   });
  }

  render(){
    let defaultName='app';
    let defaultComponent=App;

    return (
     <View style={styles.container}>

     <View style={styles.main}>

     <Animated.View
     style={{
            flex:1,
            transform: [
              {scale: this.state.bounceAnimValue},
             ]
          }}>
           <Navigator
             initialRoute={{name:defaultName,component:defaultComponent}}
             configureScene={()=>Navigator.SceneConfigs.PushFromRight}
             renderScene={(route, navigator) => {
               let Component = route.component;
               return <Component {...route.params} navigator={navigator} />
            }} />
      </Animated.View>
      </View>

      {this.state.splashed?
         null:
         <Splash
         style={{height:Util.size.height,position:'absolute'}}
         onAnimEnd={this.onAnimEnd}
         />
       }

      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#fff'
  },
  main:{
    height:Platform.OS==='android'?Util.size.height-24:Util.size.height,
    width:Util.size.width,
    position:'absolute',
  }

});
