'use strict';

import React, { Component } from 'react';

import
{
 ListView,
 StyleSheet,
 Text,
 Image,
 TouchableHighlight,
 StatusBar,
 RefreshControl,
 ScrollView,
 View,
} from 'react-native';

import Util from './Util';
import Detail from './Detail';
import HomeBanner from './HomeBanner';
import LoadingView from './LoadingView';

const HOME_URL='http://news-at.zhihu.com/api/4/theme/';
const HOME_PAGE_URL='http://news-at.zhihu.com/api/4/theme/';
const BANNER_URL='http://news-at.zhihu.com/api/4/news/latest';

var currentTheme=null;//当前主题id

var dataCache={
  data:[],
  id:null,
  description:null,//头部描述
  background:null,//头部背景图
  editors:'',//做着头像
};//全局数据源

class Item extends Component{
  render(){
    var {data}=this.props;
    var title=data.title;
    var image=data.images?data.images[0]:null;
    return(
      <TouchableHighlight
       style={{
         borderRadius:3,
         marginLeft:8,
         marginRight:8,
         marginTop:4,
         marginBottom:4,

       }}
      underlayColor='#ddd' onPress={this.props.onPress}>
      <View style={styles.itemLayout}>
      <Text numberOfLines={3} style={{flex:1,height:70,color:'#000',fontSize:18}}>{title}</Text>
      {image?<Image style={styles.imageItem}source={{uri:image}}/>:null}
      </View>
      </TouchableHighlight>
    );
  }
}

export default class SimpleListView extends Component{

  constructor(){
    super();
    var ds=new ListView.DataSource(
      {
      rowHasChanged:(r1,r2)=>r1!==r2,//判断每一行
      sectionHeaderHasChanged:(s1,s2)=>s1!==s2,//判断每一个header
      }
  );
    this.state={
      isLoading:true,
      isRefreshing:false,
      dataSource:ds,
    }

    this.renderRow=this.renderRow.bind(this);
  }

  componentDidMount(){
    currentTheme=this.props.theme;
    setTimeout(()=>this.requestURL(currentTheme),500);
  }
  /**
  主题id
  **/
  requestURL(theme,id){
    var url;
    if(id){
      url=HOME_PAGE_URL+theme+'/before/'+id;
    }else{
      url=HOME_URL+theme;
    }
    fetch(url)
    .then((response)=>response.text())
    .then((responseText)=>{
      var data=JSON.parse(responseText);
      if(id){
        //追加数据源
       dataCache.data=dataCache.data.concat(data.stories);
       }else{
       dataCache.data=data.stories;
       dataCache.description=data.description;
       dataCache.background=data.background;
       dataCache.editors=data.editors;
     }
     var length=data.stories.length;
     dataCache.id=data.stories[length-1].id;

      this.setState({
        dataSource:this.state.dataSource.cloneWithRows(dataCache.data),
        isRefreshing:false,
        isLoading:false,
      });
    }).catch((error)=>{
      alert(error);
      this.setState({
        isRefreshing:false,
        isLoading:false,
      });
    });
  }

  //item 点击回调
  onPressItem(rowData){
    var {navigator}=this.props;
    navigator&&navigator.push({title:'detail',component:Detail,params:{data:rowData}});
  }

  //渲染一行
  renderRow(rowData,sectionID,rowID){
    return(
      <Item data={rowData}
       onPress={this.onPressItem.bind(this,rowData)}
      />
    );
  }
  //加载更多
  onEndReached(){
    this.requestURL(currentTheme,dataCache.id);
  }
  //下拉刷新
  onRefresh(){
    this.setState({
      isRefreshing:true,
    });
   //更新数据
   this.requestURL(currentTheme);
  }

  //主编头像
  renderHeaderIcon(editors){
    editors.map((data,index)=>{
      return(
        <Image
         style={{width:40,height:40}}
         source={{uri:data.url}}
        />
      );
    });
  }

  //渲染头像
  renderHeader(){
    if(dataCache.editors){
      var headerIcon= dataCache.editors.map((data,index)=>{
         return(
           <Image
            key={data.id}
            style={{width:30,height:30,marginLeft:8,borderRadius:15}}
            source={{uri:data.avatar}}
           />
         );
       });
    }
    var ImageBG;
    if(dataCache.background){
     ImageBG=<Image
       style={styles.headImage}
       source={{uri:dataCache.background}}
       ><Text style={styles.headerDes}>{dataCache.description}</Text>
      </Image> ;
    }else{
     ImageBG=<Image
      style={styles.headImage}
      ><Text style={styles.headerDes}>{dataCache.description}</Text>
     </Image>
    }


   return (
     <View style={{flex:1,height:272}}>
      {ImageBG}
     <ScrollView style={{flex:1,height:50,}} horizontal={true}>
     <View style={styles.headerIcon}>
      <Text style={{color:'#707070'}}>主编</Text>
     {headerIcon}
     </View>
     </ScrollView>
     </View>
   );
  }
  //分组操作
  renderSectionHeader(){

  }
  render(){
    return(
      <View style={styles.container}>
      {this.state.isLoading?
      <LoadingView/>:
      <ListView
       dataSource={this.state.dataSource}
       renderRow={this.renderRow}
       onEndReached={this.onEndReached.bind(this)}
       onEndReachedThreshold={50}
      //  renderSectionHeader={this.renderSectionHeader}
       renderHeader={this.renderHeader}
       refreshControl={
         <RefreshControl
           onRefresh={this.onRefresh.bind(this)}
           refreshing={this.state.isRefreshing}
           colors={['#ff0000', '#00ff00', '#0000ff']}
           tintColor='#fb4747'
           enabled={true}
           />
       }
      />
      }
      </View>
    );
  }
}

const styles=StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
  },
  list: {
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
    color:'#fff',
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
    height:98,
    flexDirection:'row',
    backgroundColor:'#fff',
    borderColor:'#f3f3f3',
    alignItems:'center',
    borderWidth:Util.Pixel,
    paddingLeft:15,
    paddingRight:15,
  },
  imageItem: {
    backgroundColor: '#dddddd',
    height: 70,
    marginLeft: 10,
    width: 83,
  },
});
