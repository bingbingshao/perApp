/**
 * Created by bingpo on 2018/9/3.
 */
import {StyleSheet,Dimensions} from 'react-native';
var {height, width} = Dimensions.get('window');
import Global from '../compont/Global'

const styles = StyleSheet.create({
    /************   常用布局   *************/
    flexRowCenter:{
        display:'flex',
        justifyContent:'center',
        flexDirection:'row',
        alignItems:'center',
    },
    flexRowStart:{
        display:'flex',
        justifyContent:'flex-start',
        flexDirection:'row',
        alignItems:'center',
    },
    flexRowEnd:{
        display:'flex',
        justifyContent:'flex-end',
        flexDirection:'row',
        alignItems:'center',
    },
    flexRowWarp:{
        display:'flex',
        flexWrap:'wrap',
        flexDirection:'row',
        alignItems:'center',
    },
    flexWarp:{
        display:'flex',
        flexWrap:'wrap',
        flexDirection:'row',
    },
    flexRowBetween:{
        display:'flex',
        justifyContent:'space-between',
        flexDirection:'row',
        alignItems:'center',
    },
    flexRowBetween_start:{
        display:'flex',
        justifyContent:'space-between',
        flexDirection:'row',
        alignItems:'flex-start',
    },
    flexRowAround:{
        display:'flex',
        justifyContent:'space-around',
        flexDirection:'row',
        alignItems:'center',
    },
    flexRowAround_start:{
        display:'flex',
        justifyContent:'space-around',
        flexDirection:'row',
        alignItems:'flex-start',
    },


    flexColumnStart:{
        display:'flex',
        justifyContent:'flex-start',
        flexDirection:'column',
        alignItems:'center',
    },
    flexColumnStart_start:{
        display:'flex',
        justifyContent:'flex-start',
        flexDirection:'column',
        alignItems:'flex-start',
    },
    flexColumnCenter:{
        display:'flex',
        justifyContent:'center',
        flexDirection:'column',
        alignItems:'center',
    },
    flexColumnAround:{
        display:'flex',
        justifyContent:'space-evenly',
        flexDirection:'column',
        alignItems:'center',
    },
    flexColumnBetween:{
        display:'flex',
        justifyContent:'space-between',
        flexDirection:'column',
        alignItems:'center',
    },
    flexColumnBetween1:{
        display:'flex',
        justifyContent:'space-between',
        flexDirection:'column',
        alignItems:'flex-start',
    },
    /************   页面布局   *************/
    backgroundColor_1:{
        backgroundColor:Global.colors.fontColor_4,
    },
    backgroundColor_2:{
        backgroundColor:Global.colors.fontColor_2,
    },
    backgroundColor_3:{
        backgroundColor:'rgb(230,230,247)'
    },
    backgroundColor_4:{
        backgroundColor:'rgba(131,112,255,0.8)'
    },
    backgroundColor_5:{
        backgroundColor:'rgb(248,248,248)'
    },

    color_1:{
        color:Global.colors.fontColor_4
    },
    color_2:{
        color:Global.colors.fontColor_2
    },
    color_3:{
        color:Global.colors.fontColor_5
    },
    color_4:{
        color:Global.colors.fontColor_1
    },
    color_5:{
        color:Global.colors.fontColor_6
    },
    /************   字体布局   *************/
    font_1:{
        fontSize: 18,
    },
    font_2:{
        fontSize:14,
    },
    font_3:{
        fontSize:12
    },
    font_4:{
        fontSize:16
    },

    /************   特殊布局   *************/
    blackText:{
        width:Global.window.width,
        height:Global.window.height*0.015,
    },
    shadow_1:{
        // shadowColor: Global.colors.fontColor_7,
        // shadowOpacity: 0.4,
        // shadowRadius: 2,
        // shadowOffset: {width: 3, height: 2},
    },
    shadow_2:{
        // shadowColor: Global.colors.fontColor_7,
        // shadowOpacity: 0.3,
        // shadowRadius: 1,
        // shadowOffset: {width: 3, height: 1},
    },
    shadow_3:{
        // shadowColor: Global.colors.fontColor_2,
        // shadowOpacity: 0.4,
        // shadowRadius: 2,
        // shadowOffset: {width: 2, height: 2},
    },
    shadow_4:{
        // shadowColor: Global.colors.fontColor_7,
        // shadowOpacity: 0.7,
        // shadowRadius: 1,
        // shadowOffset: {width: 1, height: 1},
    },
    /************   常用布局   *************/

    /************   头部导航   *************/
    barTop:{
        height: 44+Global.topHeight,
        paddingTop: Global.topHeight,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: '#ddd',
        borderBottomWidth: 1 ,
        backgroundColor: 'white',
    },
    barView:{
        height:44,
        width:Global.window.width
    },
    barText:{
        fontWeight:'600',
        color:Global.colors.fontColor_1,
    },
    icon_1:{
        width:44,
        height:44,
    },
    /************** 底部留白 ****************/
    bottom_black:{
        width:Global.window.width,
        height:20
    }
});
export default styles;