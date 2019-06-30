/**
 * Created by bingPo on 2018/11/14.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Dimensions,
    TouchableHighlight,
    ScrollView, AsyncStorage, DeviceEventEmitter
} from 'react-native';
import TimerCountdown from 'react-native-timer-countdown';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ETTStatus from "../../compont/ETTStatus"
import Style from '../../css/Style';
import Global from '../../compont/Global';
import Model from "../../model";
import {Toast} from "teaset";
import {createRandomID_1} from '../../compont/Function';

export default class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            residue_time_show: Global.getTime.register_show,
            iphone: '',
            modifyCode: '',
            uid:'', //用来存放验证码对用数据库的编号
        }
    }


    componentWillMount() {
        this.timer_register && clearInterval(this.timer_register)
    }

    componentDidMount() {
        // console.log("props_R:", this.props);
    };

    /*
     * 点击事件
     */

    get_verify = () => {
        /*
         *  获取验证码
         */

        let iphone = this.state.iphone;
        if (iphone == "") {
            Toast.show({
                text: "请输入手机号",
                position: 'center',
                duration: 2000,
            });
        } else if (!this.isIphone(iphone)) {  //是不是手机号
            Toast.show({
                text: "请正确输入手机号",
                position: 'center',
                duration: 2000,
            });
        } else {
            /*
             *  获取验证码处理
             */
            let uid = createRandomID_1();  //获取随即数 记录UID

            let param = {'iphone': iphone, 'uid': uid};
            Model.send_code(param, (json) => {
                console.log("json", json);
                Toast.show({
                    text: json.msg,
                    position: 'center',
                    duration: 2000,
                });
                if (json.code == 0) {  //发送成功
                    this.setState({
                        uid:json.uid
                    });
                    this.calumniateTime();
                } else {  //发送失败

                }
            }, (json) => {
                console.log('likes失败: ', json);
            });
        }
    };
    isIphone = (iphone) => {
        /*
         *  判断是不是手机号码
         */
        let phoneCodeVerification = /^[1][3,4,5,7,8][0-9]{9}$/;
        return phoneCodeVerification.test(iphone);
    };
    isModifyCode = (code) => {
        /*
         *  判断是不是验证码
         */
        let phoneCodeVerification = /^[1][3,4,5,7,8][0-9]{9}$/;
        return phoneCodeVerification.test(code);
    };
    calumniateTime = () => {
        /*
         *  启动时间计时
         */
        /*
         *  计时器处理
         */
        console.log("Global.getTime.register_show", Global.getTime.register_show);
        Global.getTime.register_show = !Global.getTime.register_show;
        if (Global.getTime.register_show) {
            console.log("Global.getTime.register_show", Global.getTime.register_show);
            this.timer_register = setInterval(() => {
                Global.getTime.register_time -= 1;
                if (Global.getTime.register_time == 0) {
                    clearInterval(this.timer_register);
                    Global.getTime.register_time = 59;
                }
            }, 1000);
        }
        // console.log("Global.getTime.register_show", Global.getTime.register_show);
        this.setState({
            residue_time_show: Global.getTime.register_show,
        });
    };


    register_user = () => {
        /*
         *  注册
         */
        // this.props.navigation.navigate('EditMessage',{iphone:this.state.iphone});

        let iphone = this.state.iphone;
        let modifyCode = this.state.modifyCode;
        if (iphone == "") {
            Toast.show({
                text: "请输入手机号",
                position: 'center',
                duration: 2000,
            });
        } else if (!this.isIphone(iphone)) {  //是不是手机号
            Toast.show({
                text: "请正确输入手机号",
                position: 'center',
                duration: 2000,
            });
        } else if(modifyCode == ""){
            Toast.show({
                text: "请输入验证码",
                position: 'center',
                duration: 2000,
            });
        }else {
            let param = {'code_id':this.state.uid,'codes':this.state.modifyCode};
            // let param = {'code_id':'15a55a5415600620287454325dd7f549','codes':this.state.modifyCode};
            console.log('param',param);
            Model.modify_code(param, (json) => {
                console.log("json", json);
                Toast.show({
                    text: json.msg,
                    position: 'center',
                    duration: 2000,
                });
                if (json.code == 0) {  //发送成功
                    this.props.navigation.navigate('EditMessage');
                } else {  //发送失败

                }
            }, (json) => {
                console.log('likes失败: ', json);
            });
        }
    };

    /*
     * 界面视图
     */
    _nav = () => {
        /*
         *  顶部导航
         */
        return (
            <View style={[Style.barTop]}>
                <ETTStatus/>
                <View style={[Style.barView, Style.flexRowBetween]}>
                    <TouchableHighlight
                        underlayColor={'transparent'}
                        onPress={() => this.props.navigation.goBack()}
                    >
                        <View style={[Style.icon_1, Style.flexRowCenter]}>
                            <EvilIcons name="chevron-left" size={40} color={Global.colors.fontColor_1}/>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight
                        underlayColor={'transparent'}
                    >
                        <View>
                            <Text style={[Style.barText, Style.font_1]}>注册</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight
                        underlayColor={'transparent'}
                    >
                        <View style={[Style.icon_1, Style.flexRowCenter, {marginRight: 10}]}>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        )
    };
    _list = () => {
        /*
         *
         */
        return (
            <View style={[Style.flexColumnStart, styles.contains_center, Style.backgroundColor_1]}>
                <View style={Style.blackText}/><View style={Style.blackText}/>
                <View style={Style.blackText}/><View style={Style.blackText}/>
                <View style={Style.blackText}/><View style={Style.blackText}/>
                <View style={Style.blackText}/><View style={Style.blackText}/>
                {this._phoneCode()}
                <View style={Style.blackText}/><View style={Style.blackText}/>
                {this._modifyCode()}
                <View style={Style.blackText}/><View style={Style.blackText}/>
                <View style={Style.blackText}/><View style={Style.blackText}/>
                <View style={Style.blackText}/><View style={Style.blackText}/>
                {this._bottomBtn()}
            </View>
        )
    };
    _phoneCode = () => {
        /*
         *  手机号
         */
        return (
            <View style={[styles.text_1, Style.flexRowBetween]}>
                <FontAwesome name='mobile-phone' size={34} color='#836FFF'
                             style={{paddingLeft: 10, paddingRight: 10}}/>
                <TextInput
                    ref='iphone'
                    style={[Style.color_4, Style.font_4, {width: Global.window.width * 0.8}]}
                    placeholder="请输入手机号"
                    underlineColorAndroid='transparent'
                    placeholderTextColor="#836FFF"
                    clearButtonMode='while-editing'
                    keyboardType='numeric'  //选择弹出数字键盘
                    onChangeText={(phone) => this.setState({iphone: phone})}
                    value={this.state.iphone}
                    maxLength={11}
                />
                <TouchableHighlight underlayColor={'transparent'}>
                    <FontAwesome name='eye' size={20} color='transparent' style={{paddingRight: 10}}/>
                </TouchableHighlight>
            </View>
        )
    };
    _modifyCode = () => {
        /*
         *  验证码
         */
        return (
            <View style={[Style.flexRowBetween, styles.text_3]}>
                <View style={[styles.text_2, Style.flexRowBetween]}>
                    <FontAwesome name='lock' size={30} color='#836FFF'
                                 style={{paddingLeft: 10, paddingRight: 10}}/>
                    <TextInput
                        ref='modifyCode'
                        style={[Style.color_4, Style.font_4, {width: Global.window.width * 0.4}]}
                        placeholder="请输入验证码"
                        underlineColorAndroid='transparent'
                        placeholderTextColor="#836FFF"
                        keyboardType='numeric'  //选择弹出数字键盘
                        onChangeText={(text) => this.setState({modifyCode: text})}
                        value={this.state.modifyCode}
                        maxLength={5}
                    />
                </View>
                <View style={[styles.button_1, Style.flexRowCenter]}>
                    <TouchableHighlight underlayColor={'transparent'} onPress={() => this.get_verify()}>
                        <View style={[styles.button_2, Style.flexRowCenter]}>
                            <Text style={[Style.font_4, Style.color_2]}>获取验证码</Text>
                        </View>
                    </TouchableHighlight>
                    <View style={[styles.button_3, Style.flexRowCenter, Style.backgroundColor_4,
                        {display: this.state.residue_time_show ? 'flex' : 'none'}]}
                    >
                        <TimerCountdown
                            style={[Style.font_1, Style.color_1,]}
                            initialSecondsRemaining={1000 * Global.getTime.register_time}    //倒计时的剩余时间(ms)
                            interval={1000}    //计时器时间间隔(ms)
                            //allowFontScaling={true}   //字体缩放
                            //onTick={secondsRemaining => console.log("secondsRemaining", secondsRemaining)}  //调用每个刻度的函数。它返回剩余的秒数。
                            onTimeElapsed={() => {
                                // console.log("tetetetttee")
                                Global.getTime.register_show = !Global.getTime.register_show;
                                this.setState({
                                    residue_time_show: Global.getTime.register_show,
                                });
                            }}   //倒计时完成时调用的函数
                            //formatSecondsRemaining={() => console.log('complete')}   //格式化剩余时间
                        />
                    </View>
                </View>
            </View>
        )
    };
    _bottomBtn = () => {
        /*
         *  底部按钮
         */
        return (
            <TouchableHighlight underlayColor={'transparent'} onPress={() => this.register_user()}>
                <View style={[styles.button_4, Style.flexRowCenter, Style.backgroundColor_2]}>
                    <Text style={[Style.font_1, Style.color_1]}>注 册</Text>
                </View>
            </TouchableHighlight>
        )
    };


    render() {
        return (
            <View style={[styles.contains, Style.backgroundColor_5]}>
                {this._nav()}
                <ScrollView
                    keyboardDismissMode='on-drag'
                    showsVerticalScrollIndicator='false'
                >
                    {this._list()}
                </ScrollView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    contains: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contains_center: {
        width: Global.window.width,
        height: Global.window.height,
        position: 'relative',
    },
    text_1: {
        width: Global.window.width * 0.9,
        height: Global.window.width * 0.16,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: Global.colors.fontColor_2,
        borderStyle: 'solid'
    },
    text_2: {
        width: Global.window.width * 0.5,
        height: Global.window.width * 0.16,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#836FFF',
        borderStyle: 'solid'
    },
    text_3: {
        width: Global.window.width * 0.9,
        height: Global.window.width * 0.16,
    },
    button_1: {
        width: Global.window.width * 0.35,
        height: Global.window.width * 0.16,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#836FFF',
        borderStyle: 'solid',
        position: 'relative'
    },
    button_2: {
        width: Global.window.width * 0.35,
        height: Global.window.width * 0.16,
        borderRadius: 15,
    },
    button_3: {
        position: 'absolute',
        top: -1,
        left: -1,
        width: Global.window.width * 0.35,
        height: Global.window.width * 0.16,
        borderRadius: 15,
    },
    button_4: {
        width: Global.window.width * 0.8,
        height: Global.window.width * 0.107,
        borderRadius: 20,
    },
});

