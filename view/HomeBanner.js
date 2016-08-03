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
        <Image
        source={{uri: data.image}}
        style={styles.banner} />
       );
     }else{
       return null;
     }
   }

  render(){
    return(
    <View style={{height:180}}>
     <ViewPager
      style={{height:180}}
      dataSource={this.state.dataSource}
      renderPage={this.renderPage}
      isLoop={true}
      autoPlay={true}
     />
     </View>
    );
  }
}


const styles=StyleSheet.create({
  banner:{
    height:180,
    width:Util.size.width,
    resizeMode:'cover',
  }
});
