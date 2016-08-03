/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

 import React, { Component } from 'react';
 import {
   AppRegistry,
   StyleSheet,
   Text,
   View,
   Image,
   Platform,
   BackAndroid,
   ToastAndroid,
 } from 'react-native';

 //引入tabbar支持包
 import TabNavigator from 'react-native-tab-navigator';
//首页
 import Home from './Home';
 import Hot from './hot';
 import Fun from './fun';
 import City from './city';
 import Community from './community';

 const TabNavigatorItem =TabNavigator.Item;

 const TAB_NORMAL_1=require('image!tab_1');
 const TAB_NORMAL_2=require('image!tab_2');
 const TAB_NORMAL_3=require('image!tab_3');
 const TAB_NORMAL_4=require('image!tab_4');
 const TAB_NORMAL_5=require('image!tab_5');

 const TAB_PRESS_1=require('image!tab_press_1');
 const TAB_PRESS_2=require('image!tab_press_2');
 const TAB_PRESS_3=require('image!tab_press_3');
 const TAB_PRESS_4=require('image!tab_press_4');
 const TAB_PRESS_5=require('image!tab_press_5');

 export default class app extends Component {

   constructor(){
     super();
     this.state={
       selectedTab:'Home',
     }
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






   /**
   tab点击方法
   **/
   onPress(tabName){
     if(tabName){
       this.setState(
         {
           selectedTab:tabName,
         }
       );
     }
   }
    /**
    渲染每项
    **/
    renderTabView(title,tabName,tabContent,isBadge){
      var tabNomal;
      var tabPress;
      var component;
      switch (tabName) {
        case 'Home':
          tabNomal=TAB_NORMAL_1;
          tabPress=TAB_PRESS_1;
          component=<Home navigator={this.props.navigator}/>;
          break;
        case 'hot':
          tabNomal=TAB_NORMAL_2;
          tabPress=TAB_PRESS_2;
          component=<Hot/>;
          break;
        case 'city':
          tabNomal=TAB_NORMAL_3;
          tabPress=TAB_PRESS_3;
          component=<City/>;
          break;
        case 'fun':
          tabNomal=TAB_NORMAL_4;
          tabPress=TAB_PRESS_4;
          component=<Fun/>;
          break;
        case 'Community':
          tabNomal=TAB_NORMAL_5;
          tabPress=TAB_PRESS_5;
          component=<Community/>;
          break;
          default:

      }
      return(
        <TabNavigatorItem
         title={title}
         renderIcon={()=><Image style={styles.tabIcon} source={tabNomal}/>}
         renderSelectedIcon={()=><Image style={styles.tabIcon} source={tabPress}/>}
         selected={this.state.selectedTab===tabName}
         selectedTitleStyle={{color:'#f85959'}}
         onPress={()=>this.onPress(tabName)}
         renderBadge={()=>isBadge?<View style={styles.badgeView}><Text style={styles.badgeText}>15</Text></View>:null}
        >
        {component}
        </TabNavigatorItem>
      );
    }

    /**
    自定义tabbar
    **/
   tabBarView(){
     return (
       <View style={{flex:1}}>
       <TabNavigator
        tabBarStyle={styles.tab}
       >
       {this.renderTabView('订阅','Home','头条板块',false)}
       {this.renderTabView('热点','hot','视频板块',false)}
       {this.renderTabView('上海','city','关注板块',false)}
       {this.renderTabView('玩乐','fun','我的板块',false)}
       {this.renderTabView('社区','Community','我的板块',false)}
       </TabNavigator>
       </View>
     );
   }


   render() {
     var tabBarView=this.tabBarView();
     return (
       <View style={styles.container}>
         {tabBarView}
       </View>
     );
   }
 }

 const styles = StyleSheet.create({
   container: {
     flex: 1,
     backgroundColor: '#F5FCFF',

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
   tab:{
     height: 52,
     alignItems:'center',
     backgroundColor:'#f4f5f6',
   },
   tabIcon:{
     width:25,
     height:25,
   },
   badgeView:{
     width:22,
     height:14 ,
     backgroundColor:'#f85959',
     borderWidth:1,
     marginLeft:10,
     marginTop:5,
     borderColor:'#FFF',
     alignItems:'center',
     justifyContent:'center',
     borderRadius:8,
   },
   badgeText:{
     color:'#fff',
     fontSize:8,
   }
 });
