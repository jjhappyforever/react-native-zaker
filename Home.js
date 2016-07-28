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


export default class FirstCompent extends Component{

  render(){
    let defaultName='Home';
    let defaultComponent=Home;
    return(
      <Navigator
       initialRoute={{name:defaultName,component:defaultComponent}}
       configureScene={()=>Navigator.SceneConfigs.FloatFromRight}
       renderScene={(route, navigator) => {
         let Component = route.component;
         return <Component {...route.params} navigator={navigator} />
      }} />
    );
  }

}

class Home extends Component {

  constructor(){
    super();
  }


  componentWillMount(){
   if(Platform.OS==='android'){
     BackAndroid.addEventListener('hardwareBackPress',this.onBackAndroid.bind(this));
   }
  }

  componentWillUnmount(){
    if(Platform.OS==='android'){
      BackAndroid.removeEventListener('hardwareBackPress',this.onBackAndroid.bind(this));
    }
  }

  /**
  返回true:执行back，返回false，执行eixt
  **/
  onBackAndroid(){
    const nav = this.props.navigator;
    const routers = nav.getCurrentRoutes();
    if(routers.length>1){
     nav.pop();
     return true;
    }
    if(this.lastBackPressed&&(this.lastBackPressed+2000>=Date.now())){
      //两秒内back处理
      return false;
    }else{
      this.lastBackPressed = Date.now();
      ToastAndroid.show('在按一次退出程序',ToastAndroid.SHORT);
      return true;
    }
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
   alert(position);
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
       <TitleBar onPressSearch={this.onPressSearch.bind(this)} onPressMine={this.onPressMine}/>
       <GridView
        navigator={this.props.navigator}
       />
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
