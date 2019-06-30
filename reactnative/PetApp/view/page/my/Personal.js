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
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Style from '../../css/Style';
import ETTStatus from "../../compont/ETTStatus"
import Global from '../../compont/Global';
import Loading from '../../compont/Loading';
import {Toast} from 'teaset';
import Model from "../../model";


export default class Personal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            login_id: '',
            cacheSize: '0',
            loading: false,
            personal: ''
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
                this.myPersonal(json);
            }
        });

    }


    /*
     * 点击事件
     */

    jump = (name, data) => {
        /*
         *  页面跳转
         */
        if (this.state.login_id == '' || this.state.login_id == null) {
            //没有登录
            this.props.navigation.navigate('Login');
        } else {
            //已登录
            this.props.navigation.navigate(name, data);
        }
    };

    myPersonal = (login_id) => {
        /*
         *  获取个人信息
         */
        let param = {'login_id': login_id};
        Model.myPersonal(param, (json) => {
            // let temp = json.retData[0];
            // console.log("article_json", temp.name)
            this.setState({
                loading: false,
                personal: json.retData[0]
            })
        }, (json) => {
            console.log('MyPersonal失败: ', json);
            Toast.show({
                text: "获取个人信息失败",
                position: 'center',
                duration: 2000,
            });
        });
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
                            <Text style={[Style.barText, Style.font_1]}>个人信息</Text>
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
                {this._myInfo()}
                <View style={Style.blackText}/><View style={Style.blackText}/>
                {this._myQrcode()}
                <View style={Style.blackText}/>
                {this._modification()}
                <View style={Style.blackText}/><View style={Style.blackText}/>
                <View style={Style.blackText}/><View style={Style.blackText}/>
                <View style={Style.blackText}/><View style={Style.blackText}/>
                <View style={Style.blackText}/><View style={Style.blackText}/>
            </View>
        )
    };
    _myInfo = () => {
        /*
         *  个人信息
         */
        return (
            <TouchableHighlight
                underlayColor={'transparent'}
                onPress={() => this.jump('EditData', {
                    login_id: this.state.login_id
                })}>
                <View style={[styles.text_1, Style.shadow_1, Style.flexRowBetween, Style.backgroundColor_1]}>
                    <View style={[Style.flexRowCenter, {paddingLeft: 25}]}>
                        <AntDesign name={'edit'} size={24} color={Global.colors.fontColor_1} />
                        <Text style={[Style.font_4, Style.color_2, {paddingLeft: 5}]}>编写个人信息</Text>
                    </View>
                    <View style={[Style.flexRowCenter, {paddingRight: 15}]}>
                        <View style={[styles.text_3, Style.flexRowCenter, Style.shadow_3, {marginRight: 10}]}>
                            {
                                this.state.personal == '' ?
                                    <Image source={require('../../image/icon_head.png')} style={[styles.image_1]}/>
                                    :
                                    <Image source={{uri: this.state.personal.pic}} style={[styles.image_1]}/>
                            }
                        </View>
                        <Text style={[Style.font_4, Style.color_2,]}>
                            {this.state.personal == '' ? '请登录' : this.state.personal.name}
                        </Text>
                        <FontAwesome name='angle-right' size={28} color={Global.colors.fontColor_2}
                                     style={{paddingLeft: 15}}/>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }
    _myQrcode = () => {
        /*
         *  我的二维码
         */
        return (
            <TouchableHighlight
                underlayColor={'transparent'}
                onPress={() => this.jump('Qrcode', {
                    pic: this.state.personal.pic
                })}>
                <View style={[styles.text_2, Style.shadow_2, Style.flexRowBetween, Style.backgroundColor_1]}>
                    <Text style={[Style.font_4, Style.color_2, {paddingLeft: 20}]}>我的二维码</Text>
                    <View style={[Style.flexRowCenter, {paddingRight: 15}]}>
                        <FontAwesome name='qrcode' size={24} color={Global.colors.fontColor_3}
                                     style={{paddingRight: 10}}/>
                        <FontAwesome name='angle-right' size={28} color={Global.colors.fontColor_2}/>
                    </View>
                </View>
            </TouchableHighlight>
        )
    };
    _modification = () => {
        /*
         *  修改密码
         */
        return (
            <TouchableHighlight
                underlayColor={'transparent'}
                onPress={() => this.jump('Forget',)}>
                <View style={[styles.text_2, Style.shadow_2, Style.flexRowBetween, Style.backgroundColor_1]}>
                    <Text style={[Style.font_4, Style.color_2, {paddingLeft: 20}]}>修改密码</Text>
                    <View style={[Style.flexRowCenter, {paddingRight: 15}]}>
                        <FontAwesome name='lock' size={24} color={Global.colors.fontColor_3}
                                     style={{paddingRight: 10}}/>
                        <FontAwesome name='angle-right' size={28} color={Global.colors.fontColor_2}/>
                    </View>
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
