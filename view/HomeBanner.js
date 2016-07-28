'use strict';

import React, { Component } from 'react';

import
{
 StyleSheet,
 Text,
 Image,
 View,
 TouchableOpacity,
} from 'react-native';

import ViewPager from 'react-native-viewpager';
import Util from './Util';

const BANNER_URL='http://news-at.zhihu.com/api/4/news/latest';

/**
首页banner
**/
export default class HomeBanner extends Component{

   constructor(){
     super();
     var ds=new ViewPager.DataSource({pageHasChanged:(p1,p2)=>p1!==p2});
     this.state={
     dataSource:ds,
     };
   }

   componentDidMount(){
     fetch(BANNER_URL)
     .then((response)=>response.text())
     .then((responseText)=>{
       var data=JSON.parse(responseText);
       this.setState({
         dataSource:this.state.dataSource.cloneWithPages(data.top_stories),
       });
     }).catch((err)=>{
       alert(err);
     });
   }

   renderPage(data,pageID){
     if(data){
       return(
        <TouchableOpacity  onpress={()=>console.log('...')}>
        <Image
        source={{uri: data.image}}
        style={styles.banner} />
        </TouchableOpacity>
       );
     }else{
       return null;
     }
   }

  render(){
    return(
     <ViewPager
      style={{flex:1,height:170}}
      dataSource={this.state.dataSource}
      renderPage={this.renderPage}
      isLoop={true}
      autoPlay={true}
     />
    );
  }
}


const styles=StyleSheet.create({
  banner:{
    flex:1,
    height:170,
    width:Util.size.width,
    resizeMode:'cover',
  }
});
