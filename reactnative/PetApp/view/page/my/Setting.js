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
    ScrollView,
    Image, AsyncStorage, DeviceEventEmitter
} from 'react-native';
import * as CacheManager from 'react-native-http-cache';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Style from '../../css/Style';
import ETTStatus from "../../compont/ETTStatus"
import Global from '../../compont/Global';
import Loading from '../../compont/Loading';
import {Toast} from 'teaset';


export default class Setting extends Component {

    constructor(props) {
        super(props);
        this.state = {
            login_id: '',
            cacheSize: '0',
            loading: false,
        }
    }

    componentWillMount() {
        /*
         *  获取本地存储的 login_id 判断是否登录
         */
        AsyncStorage.getItem('login_id').then(json => {
            if (json != null) {
                //用户已经登录
                this.setState({
                    login_id: json
                });
            }
        });

        this.timer_clear && clearTimeout(this.timer_clear);
        this.timer_logout && clearTimeout(this.timer_logout);

        this.getCacheSize();
    }


    /*
     * 点击事件
     */
    async getCacheSize() {
        /*
         * 获得缓存大小
         */
        const data = await CacheManager.getCacheSize();
        const size = data / (1024 * 1024);
        this.setState({cacheSize: size.toFixed(2) + 'M'});
    }

    async clearCacheSize() {
        /*
         * 清除缓存
         */
        this.setState({loading: true});
        await CacheManager.clearCache();
        //this.getCacheSize();
        // 这里貌似清除不能全部清除为0，这里直接写死0即可。
        this.timer_clear = setTimeout(() => {
            this.setState({
                cacheSize: '0M',
                loading: false
            });
            Toast.show({
                text: "清除缓存成功",
                position: 'center',
                duration: 2000,
            });
            clearTimeout(this.timer_clear);
        }, 1000);

    }

    jump = (name, data) => {
        /*
         *  页面跳转
         */
        if (this.state.user_id == '') {
            //没有登录
            this.props.navigation.navigate('Login');
        } else {
            //已登录
            this.props.navigation.navigate(name, data);
        }
    };

    logout = () => {
        /*
         *  用户登出
         */
        this.setState({loading: true});
        AsyncStorage.setItem('login_id', "");  //把登录账号存储
        DeviceEventEmitter.emit('logout', "");  //设置一个登录成功提示

        this.timer_logout = setTimeout(() => {
            this.setState({loading: false});
            Toast.show({
                text: "登出成功",
                position: 'center',
                duration: 2000,
            });
            clearTimeout(this.timer_logout);
            this.props.navigation.navigate('My');
        }, 2000)
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
                        underlayColor={'transparent'}>
                        <View>
                            <Text style={[Style.barText, Style.font_1]}>设置</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight
                        underlayColor={'transparent'}
                    >
                        <View style={[Style.icon_1, Style.flexRowCenter]}>
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
            <View style={[styles.contains_center, Style.flexColumnStart]}>
                <View style={Style.blackText}/>
                {this._feedBack()}
                <View style={Style.blackText}/>
                {this._share()}
                <View style={Style.blackText}/><View style={Style.blackText}/>
                {this._Service()}
                <View style={Style.blackText}/>
                {this._Policy()}
                <View style={Style.blackText}/><View style={Style.blackText}/>
                {this._clearCache()}
                <View style={Style.blackText}/>
                {this._aboutUs()}
                {
                    this.state.login_id != '' ?
                        this._logoutBtn()
                        :
                        null
                }
                <View style={Style.blackText}/><View style={Style.blackText}/>
                <View style={Style.blackText}/><View style={Style.blackText}/>
                <View style={Style.blackText}/><View style={Style.blackText}/>
                <View style={Style.blackText}/><View style={Style.blackText}/>
            </View>
        )
    };
    _Service = () => {
        /*
         *  服务条款
         */
        return (
            <TouchableHighlight
                underlayColor={'transparent'}
                onPress={() => this.jump('Service', {
                    user_id: this.state.user_id
                })}>
                <View style={[styles.text_2, Style.shadow_2, Style.flexRowBetween, Style.backgroundColor_1]}>
                    <Text style={[Style.font_4, Style.color_2, {paddingLeft: 20}]}>服务条款</Text>
                    <View style={[Style.flexRowCenter, {paddingRight: 15}]}>
                        {/*<AntDesign name='Safety' size={24} color={Global.colors.fontColor_3}*/}
                                     {/*style={{paddingRight: 10}}/>*/}
                        <FontAwesome name='angle-right' size={28} color={Global.colors.fontColor_2}/>
                    </View>
                </View>
            </TouchableHighlight>
        )
    };
    _Policy= () => {
        /*
         *  隐私政策
         */
        return (
            <TouchableHighlight
                underlayColor={'transparent'}
                onPress={() => this.jump('Policy', {
                    user_id: this.state.user_id
                })}>
                <View style={[styles.text_2, Style.shadow_2, Style.flexRowBetween, Style.backgroundColor_1]}>
                    <Text style={[Style.font_4, Style.color_2, {paddingLeft: 20}]}>隐私政策</Text>
                    <View style={[Style.flexRowCenter, {paddingRight: 15}]}>
                        {/*<Entypo name={'shield'} size={24} color={Global.colors.fontColor_3}*/}
                                {/*style={{paddingRight: 10}}/>*/}
                        <FontAwesome name='angle-right' size={28} color={Global.colors.fontColor_2}/>
                    </View>
                </View>
            </TouchableHighlight>
        )
    };
    _share = () => {
        /*
         *  分享
         */
        return (
            <TouchableHighlight underlayColor={'transparent'}>
                <View style={[styles.text_2, Style.shadow_2, Style.flexRowBetween, Style.backgroundColor_1]}>
                    <Text style={[Style.font_4, Style.color_2, {paddingLeft: 20}]}>分享好友</Text>
                    <View style={[Style.flexRowCenter, {paddingRight: 15}]}>
                        <Text style={[Style.font_4, Style.color_2, {paddingRight: 10}]}>
                        </Text>
                        <FontAwesome name='angle-right' size={28} color={Global.colors.fontColor_2}/>
                    </View>
                </View>
            </TouchableHighlight>
        )
    };
    _feedBack = () => {
        /*
         *  反馈
         */
        return (
            <TouchableHighlight underlayColor={'transparent'}
                                onPress={() => this.jump('Feedback', {
                                    user_id: this.state.user_id
                                })}>
                <View style={[styles.text_2, Style.shadow_2, Style.flexRowBetween, Style.backgroundColor_1]}>
                    <Text style={[Style.font_4, Style.color_2, {paddingLeft: 20}]}>反馈</Text>
                    <View style={[Style.flexRowCenter, {paddingRight: 15}]}>
                        <Text style={[Style.font_4, Style.color_2, {paddingRight: 10}]}>
                        </Text>
                        <FontAwesome name='angle-right' size={28} color={Global.colors.fontColor_2}/>
                    </View>
                </View>
            </TouchableHighlight>
        )
    };
    _clearCache = () => {
        /*
         *  清除缓存
         */
        return (
            <TouchableHighlight
                underlayColor={'transparent'}
                onPress={() => this.clearCacheSize()}
            >
                <View style={[styles.text_2, Style.shadow_2, Style.flexRowBetween, Style.backgroundColor_1]}>
                    <Text style={[Style.font_4, Style.color_2, {paddingLeft: 20}]}>清除缓存</Text>
                    <View style={[Style.flexRowCenter, {paddingRight: 15}]}>
                        <Text style={[Style.font_4, Style.color_2, {paddingRight: 10}]}>
                            {this.state.cacheSize}
                        </Text>
                        <FontAwesome name='angle-right' size={28} color={Global.colors.fontColor_2}/>
                    </View>
                </View>
            </TouchableHighlight>
        )
    };
    _aboutUs = () => {
        /*
         *  关于
         */
        return (
            <TouchableHighlight underlayColor={'transparent'}
                                onPress={() => this.jump('AboutUs', {
                                    user_id: this.state.user_id
                                })}>
                <View style={[styles.text_2, Style.shadow_2, Style.flexRowBetween, Style.backgroundColor_1]}>
                    <Text style={[Style.font_4, Style.color_2, {paddingLeft: 20}]}>关于</Text>
                    <View style={[Style.flexRowCenter, {paddingRight: 15}]}>
                        <Text style={[Style.font_4, Style.color_2, {paddingRight: 10}]}>
                        </Text>
                        <FontAwesome name='angle-right' size={28} color={Global.colors.fontColor_2}/>
                    </View>
                </View>
            </TouchableHighlight>
        )
    };
    _logoutBtn = () => {
        /*
         *  退出登录
         */
        return (
            <TouchableHighlight
                underlayColor={'transparent'}
                onPress={() => this.logout()}>
                <View style={[styles.button_1, Style.flexRowCenter, Style.backgroundColor_2]}>
                    <Text style={[Style.font_1, Style.color_1]}>退 出 登 录</Text>
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
                    showsHorizontalScrollIndicator='false'
                >
                    {this._list()}
                </ScrollView>

                {
                    this.state.loading ?
                        <Loading/>
                        : null
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    contains: {
        flex: 1,
        backgroundColor: Global.colors.fontColor_4,
    },
    contains_center: {
        width: Global.window.width,
        position: 'relative',
    },
    text_1: {
        width: Global.window.width - 10,
        height: Global.window.width * 0.3,
        borderRadius: 5,
        borderBottomWidth: 1,
        borderBottomColor: Global.colors.fontColor_3,
        borderStyle: 'solid'
    },
    text_2: {
        width: Global.window.width - 5,
        height: Global.window.width * 0.14,
        borderRadius: 2,
        borderBottomWidth: 1,
        borderBottomColor: Global.colors.fontColor_3,
        borderStyle: 'solid'
    },
    text_3: {
        width: Global.window.width * 0.16,
        height: Global.window.width * 0.16,
        borderRadius: Global.window.width * 0.08,
        borderWidth: 1,
        borderColor: Global.colors.fontColor_3,
        borderStyle: 'solid',
    },
    image_1: {
        width: Global.window.width * 0.16,
        height: Global.window.width * 0.16,
        borderRadius: Global.window.width * 0.08,
    },
    button_1: {
        width: Global.window.width * 0.8,
        height: Global.window.width * 0.107,
        borderRadius: 20,
        marginTop: 30,
    },

});
