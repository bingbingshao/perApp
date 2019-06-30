/**
 * Created by bingPo on 2018/11/14.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableHighlight,
    ScrollView,
    AsyncStorage,
    DeviceEventEmitter,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import ETTStatus from "../../compont/ETTStatus"
import Style from '../../css/Style';
import Global from '../../compont/Global';
import {Toast} from 'teaset';
import Model from "../../model";
import {clearCache} from "react-native-http-cache";

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show_eye: false,
            iphone: '',
            password: '',
        };
    }

    /*
     * 点击事件
     */
    show_eye = () => {
        this.setState({
            show_eye: !this.state.show_eye,
        })
    };
    jump = (name, data) => {
        /*
         *  页面跳转
         */
        this.props.navigation.navigate(name, data);
    };

    login_user = () => {
        let iphone = this.state.iphone;
        let password = this.state.password;
        //编辑框失去焦点
        this.refs.iphone.blur();
        this.refs.password.blur();
        if (iphone == "") {  //没有输号码
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
        } else if (password == "") {  //没有输入密码
            Toast.show({
                text: "请输入密码",
                position: 'center',
                duration: 2000,
            });
        } else if (!this.isPassword(password)) {  //验证密码是否符合要求
            Toast.show({
                text: '6～20位密码，字母/数字/符号至少2种',
                position: 'center',
                duration: 1000,
            });
        } else {  //连接数据库验证 手机号和密码是否正确
            let param = {'iphone': iphone, 'password': password};
            Model.login(param, (json) => {
                //登录返回数据提示
                Toast.show({
                    text: json.msg,
                    position: 'center',
                    duration: 2000,
                });
                if (json.code == 0) { //登陆成功
                    AsyncStorage.setItem('login_id', iphone);  //把登录账号存储

                    DeviceEventEmitter.emit('login_success', iphone);  //设置一个登录成功提示

                    this.jump('My', null)
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
    isPassword = (password) => {
        /*
         *  密码验证
         */
        if (password.length > 5 && password.length < 21) {  //密码长度为6~20位 且 字母/数字/符号至少2种
            let passwordCodeVerification = /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{6,20}$/;
            return passwordCodeVerification.test(password);
        }
        return false
    };

    /*
     * 界面视图
     */
    _nav() {
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
                            <Text style={[Style.barText, Style.font_1]}>登录</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight
                        underlayColor={'transparent'}
                        onPress={() => this.props.navigation.navigate('Register')}
                    >
                        <View style={[Style.icon_1, Style.flexRowCenter, {marginRight: 10}]}>
                            <Text style={[Style.font_2, Style.color_4]}>注册</Text>
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
                {this._editPW()}
                {this._otherLink()}
                <View style={Style.blackText}/><View style={Style.blackText}/>
                <View style={Style.blackText}/><View style={Style.blackText}/>
                {this._loginBtn()}
                <View style={Style.blackText}/><View style={Style.blackText}/>
                <View style={Style.blackText}/><View style={Style.blackText}/>
                <View style={Style.blackText}/>
                {this._otherLogin()}
            </View>
        )
    };
    _phoneCode = () => {
        /*
         *  手机号码
         */
        return (
            <View style={[styles.text_1, Style.flexRowBetween]}>
                <FontAwesome name='mobile-phone' size={34} color='#836FFF'
                             style={{paddingLeft: 10, paddingRight: 10}}/>
                <TextInput
                    ref='iphone'
                    style={[Style.color_4, Style.font_4, {width: Global.window.width * 0.8}]}
                    placeholder="请输入账号"
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
    }
    _editPW = () => {
        /*
         *  编写密码
         */
        return (
            <View style={[styles.text_1, Style.flexRowBetween]}>
                <FontAwesome name='lock' size={30} color='#836FFF'
                             style={{paddingLeft: 10, paddingRight: 10}}/>
                <TextInput
                    ref='password'
                    style={[Style.color_4, Style.font_4, {width: Global.window.width * 0.7}]}
                    placeholder="请输入密码"
                    underlineColorAndroid='transparent'
                    placeholderTextColor="#836FFF"
                    clearButtonMode='while-editing'
                    onChangeText={(password) => this.setState({password: password})}
                    secureTextEntry={!this.state.show_eye}
                    value={this.state.password}
                />
                <TouchableHighlight underlayColor={'transparent'} onPress={() => this.show_eye()}>
                    <FontAwesome name={this.state.show_eye ? 'eye' : 'eye-slash'} size={20} color='#836FFF'
                                 style={{paddingRight: 10}}/>
                </TouchableHighlight>
            </View>
        )
    };
    _otherLink = () => {
        /*
         *  其他操作
         */
        return (
            <View style={[Style.flexRowBetween, {width: Global.window.width * 0.8, height: 40}]}>
                <TouchableHighlight underlayColor={'transparent'}
                                    onPress={() => this.jump('Forget',null)}>
                    <Text style={[Style.font_2, Style.color_2, {padding: 8}]}>忘记密码</Text>
                </TouchableHighlight>
                <TouchableHighlight underlayColor={'transparent'}
                                    onPress={() => this.jump('LoginPhone',null)}>
                    <Text style={[Style.font_2, Style.color_2, {padding: 8}]}>短信登录</Text>
                </TouchableHighlight>
            </View>
        )
    }
    _loginBtn = () => {
        /*
         *  登录按钮
         */
        return (
            <TouchableHighlight underlayColor={'transparent'} onPress={() => this.login_user()}>
                <View style={[styles.button_1, Style.flexRowCenter, Style.backgroundColor_2]}>
                    <Text style={[Style.font_1, Style.color_1]}>登 录</Text>
                </View>
            </TouchableHighlight>
        )
    };
    _otherLogin = () => {
        /*
         *  其他方式登录
         */
        return (
            <View>
                <View style={[Style.flexRowCenter]}>
                    <Text style={[Style.font_3, Style.color_3]}>----------- 其他方式登录 -----------</Text>
                </View>
                <View style={[Style.flexRowBetween, {width: Global.window.width * 0.75, height: 80}]}>
                    <TouchableHighlight underlayColor={'transparent'}>
                        <View style={[styles.button_2, Style.flexRowCenter, Style.backgroundColor_3]}>
                            <FontAwesome name="weixin" size={30} color='rgb(113,199,49)'/>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor={'transparent'}>
                        <View style={[styles.button_2, Style.flexRowCenter, Style.backgroundColor_3]}>
                            <FontAwesome name="qq" size={30} color='rgb(20,136,245)'/>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor={'transparent'}>
                        <View style={[styles.button_2, Style.flexRowCenter, Style.backgroundColor_3]}>
                            <FontAwesome name="weibo" size={30} color='rgb(206,29,38)'/>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        )
    };

    render() {
        const {navigation} = this.props;
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
    button_1: {
        width: Global.window.width * 0.8,
        height: Global.window.width * 0.107,
        borderRadius: 20,
    },
    button_2: {
        width: Global.window.width * 0.14,
        height: Global.window.width * 0.14,
        borderRadius: Global.window.width * 0.07,
    },
});

