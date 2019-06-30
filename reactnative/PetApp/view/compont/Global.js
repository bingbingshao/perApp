/**
 * Created by bingPo on 2018/11/12.
 */
import {Dimensions} from 'react-native';

/*
 *  屏幕高度
 */
let window = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
}
/*
 *  主体颜色
 */
let colors = {
    //themeColor: 'rgb(247, 75, 58)',
    fontColor_1: '#7D26CD',  //主题色(选择)
    fontColor_2: '#836FFF',  //主题色(未选)
    fontColor_3: 'rgba(131,112,255,0.4)',
    fontColor_4: '#fff',
    fontColor_5: '#aaa',
    fontColor_6: '#f00',
    fontColor_7: '#000',
    fontColor_8: 'rgba(248,248,248,1)',
    fontColor_9: '#eee',
    fontColor_10: '#222',
    fontColor_11: '#888',
    fontColor_12: 'rgba(0,0,0,0.2)',
    fontColor_13: '#555',
    fontColor_14: 'rgba(131,112,255,0.2)',
    fontColor_15: '#eee',
    fontColor_16: 'rgba(250,250,250,1)',

}

/*
 *  屏幕适配
 */
let top_height = 0, margin_bottom = 0;

function award_top_height() {
    if (window.height == 812) {
        //iphone X、iphone Xs
        top_height = 30;
    } else if (window.height == 896) {
        //iphone XR 、iphone Xs Max
        top_height = 35;
    } else {
        top_height = 20;
    }
    return top_height;
}

function award_margin_bottom() {
    if (window.height == 812) {
        //iphone X、iphone Xs
        margin_bottom = 20;
    } else if (window.height == 896) {
        //iphone XR 、iphone Xs Max
        margin_bottom = 20;
    } else {
        margin_bottom = 0;
    }
    return margin_bottom;
}

/*
 *  注册页面倒计时
 */
let time = {
    register_time: 59,
    register_show: false,
    forget_time: 59,
    forget_show: false,
    phone_time: 59,
    phone_show: false,
};


export default {
    window: window,
    colors: colors,
    topHeight: award_top_height(),
    margin_bottom: award_margin_bottom(),
    getTime: time,
}