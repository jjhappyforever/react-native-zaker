'use strict';

import React, { Component } from 'react';

import
{
 ListView,
 StyleSheet,
 Text,
 Image,
 TouchableHighlight,
 TouchableNativeFeedback,
 StatusBar,
 RefreshControl,
 ScrollView,
 View,
 Platform,
} from 'react-native';

import Util from './Util';
import NewList from './../NewList';
import HomeBanner from './HomeBanner';
import AddChannel from './AddChannel';

var {NativeModules}=require('react-native');
var dialog=NativeModules.RemoveChannel;//原生组件.

const API_THEMES_URL = 'http://news-at.zhihu.com/api/4/themes';
const PAGE_SIZE=3;

class Item extends Component{

 //渲染最后一项
  renderAddMore(onAddChannel){
    var TodouchableElement=TouchableHighlight;
    if(Platform.OS==='android'){
      TodouchableElement=TouchableNativeFeedback;
    }
   return(
     <TodouchableElement
     style={styles.itemLayout}
     underlayColor='#f8f8f8'
     onPress={onAddChannel}
     >
     <View style={styles.itemLayout}>
     <Image style={{width:40,height:40,}} source={require('./../images/channellist_add_icon.png')}/>
     <Text numberOfLines={1} style={[styles.textItem]}>添加更多</Text>
     </View>
     </TodouchableElement>
   );
  }
  //渲染每一个单元格
  renderItem(data,onPress,onLongPress){
    var title=data.name;
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
    onLongPress={title?onLongPress:null}
    >
    <View style={[styles.itemLayout,itemStyle]} >
    {image?<Image style={styles.imageItem} source={{uri:image}}/>:null}
    <Text numberOfLines={1} style={styles.textItem}>{title}</Text>
    </View>
    </TodouchableElement>
    );
  }

  render(){
    var {data,onPress,onLongPress,onAddChannel}=this.props;
    var item;
    if(data){
     item=this.renderItem(data,onPress,onLongPress);
    }else{
     item=this.renderAddMore(onAddChannel);
    }
    return item;
  }
}

export default class GridView extends Component{

  constructor(){
    super();
    var ds=new ListView.DataSource(
      {
      rowHasChanged:(r1,r2)=>r1!==r2,//判断每一行
      sectionHeaderHasChanged:(s1,s2)=>s1!==s2,//判断每一个header
      }
  );
    this.state={
      isLoading:false,
      dataSource:ds,
    }

    //绑定
    this.renderRow=this.renderRow.bind(this);
  }

  componentDidMount(){
    this.requestURL();
  }

  requestURL(id){
    fetch(API_THEMES_URL)
    .then((response)=>response.text())
    .then((responseText)=>{
      var data=JSON.parse(responseText);
      var array=data.others;
      var emptyNum=array.length%PAGE_SIZE;
      if(emptyNum==0){
        array.push(null);
        array.push({image:null,title:null});
        array.push({image:null,title:null});
      }else if(emptyNum==1){
        array.push(null);
        array.push({image:null,title:null});
      }else if(emptyNum==2){
        array.push(null);
      }

      this.setState({
        dataSource:this.state.dataSource.cloneWithRows(data.others),
        isLoading:false,
      });
    }).catch((error)=>{
      alert(error);
      this.setState({
        isLoading:false,
      });
    });
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

  /**
  长按事件
  **/
  onLongPress(data){
   dialog.show(data.name,(msg)=>{
     alert('移除成功');
   });
  }

  //渲染一行
  renderRow(rowData,sectionID,rowID){
    return(
      <Item
      data={rowData}
      navigator={this.props}
      onPress={this.onPress.bind(this,rowData)}
      onLongPress={this.onLongPress.bind(this,rowData)}
      onAddChannel={this.onAddChannel.bind(this,rowData)}
      />
    );
  }
  //下拉刷新
  onRefresh(){
    this.setState({
      isLoading:true,
    });
   //更新数据
   this.requestURL();
  }

  render(){
    return(
      <View style={styles.container}>
      <ScrollView style={{flex:1,height:null,width:null}}>

      <ListView
      automaticallyAdjustContentInsets={false}
      contentContainerStyle={styles.grid}
      dataSource={this.state.dataSource}
      renderRow={this.renderRow.bind(this)}
      pageSize={PAGE_SIZE}
      refreshControl={
         <RefreshControl
           onRefresh={this.onRefresh.bind(this)}
           refreshing={this.state.isLoading}
           colors={['#ff0000', '#00ff00', '#0000ff']}
           enabled={true}
           />
       }
      />
      </ScrollView>
      </View>
    );
  }
}

const styles=StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  grid: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  headImage:{
    flex:1,
    height:200,
  },
  headerDes:{
    flex:1,
    fontSize:18,
    color:'#ffffff',
    position:'absolute',
    backgroundColor:'transparent',
    bottom:20,
    left:15,
    right:15,
  },
  headerIcon:{
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    marginLeft:15,
    marginRight:8,
  },
  itemLayout:{
    flex:1,
    width:Util.size.width/3,
    height:Util.size.width/3,
    alignItems:'center',
    justifyContent:'center',
    borderWidth: Util.pixel,
    borderColor: '#eaeaea'
  },
  imageItem: {
    height: 60,
    width: 60,
  },
  textItem:{
    color:'#000',
    fontSize:14,
    marginTop:10,
  }
});
