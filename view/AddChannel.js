'use strict';

import React, { Component } from 'react';

import
{
 StyleSheet,
 Text,
 View,
 Image,
 ListView,
 WebView,
 StatusBar,
 Platform,
 TouchableHighlight,
 TouchableNativeFeedback,
} from 'react-native';

import SubTitleBar from './SubTitleBar';
import Util from './Util';
import NewList from './../NewList';
import LoadingView from './LoadingView';

const API_THEMES_URL = 'http://news-at.zhihu.com/api/4/themes';

/**
添加 channel
**/
export default class AddChannel extends Component{

  constructor(){
    super();
    var ds=new ListView.DataSource(
      {
      rowHasChanged:(r1,r2)=>r1!==r2,//判断每一行
      }
  );
  this.state={
    dataSource:ds,
    isLoading:true,
  };
}

 componentDidMount(){
   setTimeout(()=>this.requestURL(),500);
  }

  requestURL(){
    fetch(API_THEMES_URL)
    .then((response)=>response.text())
    .then((responseText)=>{
      var data=JSON.parse(responseText);
      var array=data.others;
      this.setState({
        dataSource:this.state.dataSource.cloneWithRows(array),
        isLoading:false,
      });
    }).catch((error)=>{
      alert(error);
      this.setState({
        isLoading:false,
      });
    });
  }

  renderRow(rowData){
    return(
      <Item
      data={rowData}
      navigator={this.props}
      onPress={this.onPress.bind(this,rowData)}
      onSubscribe={this.onSubscribe.bind(this,rowData)}
      />
    );
  }

  /**
   订阅
  **/
  onSubscribe(data){
   //修改数据源数据
   if(!data.selected){
     data.selected=true;
      alert(data.id);
   }else{
     alert(data.selected);
   }

  }

  //item 点击回调
  onPress(data){
   const {navigator}=this.props;
   navigator&&navigator.push({name:'NewList',component:NewList,params:{title:data.name,id:data.id}});
  }

  /**
  添加channel
  **/
  onAddChannel(data){
   var {navigator}=this.props;
   navigator&&navigator.push({title:'AddChannel',component:AddChannel,params:{title:'订阅栏目'}});
  }


  render(){
    return(
     <View style={styles.container}>
     <SubTitleBar navigator={this.props.navigator} title='订阅栏目'/>
     {this.state.isLoading?
      <LoadingView/>
       :
      <ListView
        automaticallyAdjustContentInsets={false}
        dataSource={this.state.dataSource}
        renderRow={this.renderRow.bind(this)}
       />
     }

     </View>
    );
  }
}


class Item extends Component{

  //渲染每一个单元格
  renderItem(data,onPress,onSubscribe){
    var title=data.name;
    var dec=data.description;
    var image=data.thumbnail;
    var TodouchableElement=TouchableHighlight;
    if(Platform.OS==='android'){
      TodouchableElement=TouchableNativeFeedback;
    }
    if(!title){
      var itemStyle={borderWidth:0};
    }
    return(
    <TodouchableElement
    style={[styles.itemLayout,itemStyle]}
    underlayColor='#f8f8f8'
    onPress={title?onPress:null}
    >
    <View style={[styles.itemLayout,itemStyle]} >
    {image?<Image style={styles.imageItem} source={{uri:image}}/>:null}
    <View style={{flex:1,marginLeft:10,}}>
    <Text numberOfLines={1} style={styles.textTitle}>{title}</Text>
    <Text numberOfLines={2} style={styles.textDec}>{dec}</Text>
    </View>
    <TouchableHighlight style={{marginLeft:10,borderRadius:4,}}
    underlayColor='#fe0202' onPress={onSubscribe}>
    <View style={styles.itemBtn}>
    <Text style={{color:'#fff'}}>订阅{data.selected}</Text>
    </View>
    </TouchableHighlight>
    </View>
    </TodouchableElement>
    );
  }

  render(){
    var {data,onPress,onSubscribe}=this.props;
    var item= this.renderItem(data,onPress,onSubscribe);
    return item;
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  itemLayout:{
    flex:1,
    width:null,
    height:90,
    padding:10,
    flexDirection:'row',
    alignItems:'center',
    borderBottomWidth: Util.pixel,
    borderBottomColor: '#eaeaea'
  },
  imageItem: {
    height: 60,
    width: 60,
  },
  textTitle:{
    color:'#000',
    fontSize:16,
  },
  textDec:{
    color:'#5e676f',
    marginTop:5,
    fontSize:14,
  },
  itemBtn:{
    backgroundColor:'#fb4747',
    borderRadius:4,
    borderColor:'#fb4747',
    paddingLeft:10,
    paddingRight:10,
    paddingTop:7,
    paddingBottom:7,
    borderWidth:Util.pixel,
  }
});
