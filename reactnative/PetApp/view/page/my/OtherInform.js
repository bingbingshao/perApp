/**
 * Created by bingPo on 2018/11/14.
 * 查看他人的个人信息详情
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
    Image,
    Alert,
    Modal, AsyncStorage, DeviceEventEmitter
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import InputScrollView from 'react-native-input-scroll-view';
import Picker from 'react-native-picker';
import Style from '../../css/Style';
import ETTStatus from "../../compont/ETTStatus"
import Global from '../../compont/Global';
import area from '../../compont/area.json';
import Model from "../../model";
import {Toast} from "teaset";
import ImagePicker from "react-native-image-picker";
import Loading from '../../compont/Loading';


export default class OtherInform extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            user_id: '',
            gender: '男',
            select_modal: false,
            birth: '~选择~',
            address: '~选择~',
            personal: '',
            name: '',
            motto: '',
            pic: '',
            images: '',
            changePic: false,
        }
    };

    componentWillMount() {
        /*
         *  获取本地存储的 user_id 判断是否登录
         */
        let user_id = this.props.navigation.state.params.user_id;
        // console.log("user_id", user_id);
        this.setState({user_id: user_id});
        this.start(user_id);
    }

    /*
     * 点击事件
     */
    start = (user_id) => {
        /*
    *  获取个人信息
    */
        let param = {'login_id': user_id};
        Model.myPersonal(param, (json) => {
            let temp = json.retData[0];
            // console.log("myPersonal", json)
            this.setState({
                loading: false,
                personal: temp,
                birth: temp.birth,
                address: temp.address,
                name: temp.name,
                motto: temp.motto,
                pic: temp.pic,
                time: temp.register_time
            })
            if (temp.gender == 0) {
                this.setState({gender: '男'})
            }
            if (temp.gender == 1) {
                this.setState({gender: '女'})
            } else {
                this.setState({gender: '未知'})
            }

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
                            <Text style={[Style.barText, Style.font_1]}>用户信息</Text>
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

    _head = () => {
        /*
         *  更换头像
         */
        return (
            <TouchableHighlight underlayColor={'transparent'}>
                <View style={[styles.text_1, Style.shadow_1, Style.flexRowBetween, {paddingLeft: 15}]}>
                    <View style={[styles.text_4, Style.flexRowCenter, Style.shadow_3]}>
                        <Image source={{uri: this.state.pic}} style={[styles.image_1]}/>
                    </View>
                    <View style={[{paddingRight: 15}]}>
                        <Text style={[Style.font_4, Style.color_2, {paddingRight: 10}]}>注册于：</Text>
                        <Text style={[Style.font_4, Style.color_2, {paddingRight: 10,paddingTop: 20}]}>{this.state.time}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        )
    };

    _nickname = () => {
        /*
         *  昵称
         */
        return (
            <View style={[styles.text_2, Style.shadow_2, Style.flexRowBetween]} onPress={() => {
                alert('点击')
            }}>
                <Text
                    style={[Style.color_2, Style.font_4, {
                        paddingLeft: 10,
                        paddingRight: 10
                    }]}>昵称:</Text>
                <TextInput
                    style={[Style.color_4, Style.font_4, {width: Global.window.width * 0.73, paddingRight: 5}]}
                    placeholder="起什么名字好呢"
                    underlineColorAndroid='transparent'
                    placeholderTextColor="#836FFF"
                    clearButtonMode='while-editing'
                    keyboardType='default'  //选择弹出数字键盘
                    onChangeText={(phone) => this.setState({phone})}
                    value={this.state.name}
                    editable={false}
                />
            </View>
        )
    };

    _gender = () => {
        /*
         *  性别
         */
        return (
            <View style={[styles.text_2, Style.shadow_2, Style.flexRowStart]}>
                <Text
                    style={[Style.color_2, Style.font_4, {
                        paddingLeft: 10,
                        paddingRight: 10
                    }]}>性别:</Text>
                <Text style={[styles.font_1]}>{this.state.gender}</Text>
            </View>
        )
    };

    _birth = () => {
        /*
         *  出生年月
         */
        return (
            <View style={[styles.text_2, Style.shadow_2, Style.flexRowStart]}>
                <Text
                    style={[Style.color_2, Style.font_4, {
                        paddingLeft: 10,
                        paddingRight: 10
                    }]}>出生年月:</Text>
                <Text style={[styles.font_1]}>{this.state.birth}</Text>
            </View>
        )
    };

    _address = () => {
        /*
         *  地址
         */
        return (
            <View style={[styles.text_2, Style.shadow_2, Style.flexRowStart]}>
                <Text
                    style={[Style.color_2, Style.font_4, {
                        paddingLeft: 10,
                        paddingRight: 10
                    }]}>所在城市:</Text>
                <Text style={[styles.font_1]}>{this.state.address}</Text>
            </View>
        )
    };

    _sign = () => {
        /*
         *  简介
         */
        return (
            <View style={[Style.flexRowBetween_start, styles.text_3, Style.shadow_2]}>
                <Text
                    style={[Style.color_2, Style.font_4, {
                        paddingLeft: 10,
                        paddingRight: 10,
                        lineHeight: Global.window.width * 0.09,
                    }]}>简介:</Text>
                <TextInput style={[Style.color_4, Style.font_4, Style.flexRowStart, {
                    width: Global.window.width * 0.8,
                    height: Global.window.width * 0.4,
                    textAlignVertical: "top"
                }]}
                           placeholder="介绍一下(150)~"
                           underlineColorAndroid='transparent'
                           placeholderTextColor="#836FFF"
                           clearButtonMode='while-editing'
                           multiline={true}
                           maxLength={150}
                           onChangeText={(password) => this.setState({password})}
                           value={this.state.motto}
                           editable={false}
                />
            </View>
        )
    };


    render() {
        return (
            <View style={[styles.contains, Style.backgroundColor_5]}>
                {this._nav()}
                <InputScrollView>
                    <View style={[Style.flexColumnStart, styles.contains_center, Style.backgroundColor_5]}>
                        <View style={Style.blackText}/>
                        {this._head()}
                        <View style={Style.blackText}/><View style={Style.blackText}/>
                        <View style={Style.blackText}/><View style={Style.blackText}/>
                        {this._nickname()}
                        <View style={Style.blackText}/>
                        {this._gender()}
                        <View style={Style.blackText}/>
                        {this._birth()}
                        <View style={Style.blackText}/>
                        {this._address()}
                        <View style={Style.blackText}/>
                        {this._sign()}
                        <View style={Style.blackText}/><View style={Style.blackText}/>
                        <View style={Style.blackText}/><View style={Style.blackText}/>
                    </View>
                </InputScrollView>
                {
                    this.state.loading ?
                        <Loading/>
                        : null
                }v
            </View>
        )
    }
}

const styles = StyleSheet.create({
    contains: {
        flex: 1,
    },
    contains_center: {
        width: Global.window.width,
        position: 'relative',
    },
    text_1: {
        width: Global.window.width - 10,
        height: Global.window.width * 0.3,
        borderBottomWidth: 1,
        borderBottomColor: Global.colors.fontColor_3,
        borderStyle: 'solid',
        backgroundColor: Global.colors.fontColor_4,
        borderRadius: 5,
    },
    text_2: {
        width: Global.window.width - 8,
        height: Global.window.width * 0.14,
        borderBottomWidth: 1,
        borderBottomColor: Global.colors.fontColor_3,
        borderStyle: 'solid',
        backgroundColor: Global.colors.fontColor_4,
    },
    text_3: {
        width: Global.window.width - 8,
        height: Global.window.width * 0.4,
        borderWidth: 1,
        borderColor: Global.colors.fontColor_3,
        borderStyle: 'solid',
        borderRadius: 3,
        backgroundColor: Global.colors.fontColor_4,
    },
    text_4: {
        width: Global.window.width * 0.22,
        height: Global.window.width * 0.22,
        borderRadius: Global.window.width * 0.11,
        borderWidth: 1,
        borderColor: Global.colors.fontColor_3,
        borderStyle: 'solid',
    },
    image_1: {
        width: Global.window.width * 0.22,
        height: Global.window.width * 0.22,
        borderRadius: Global.window.width * 0.11,
    },
    font_1: {
        color: Global.colors.fontColor_2,
        fontSize: 16,
        width: 200,
        lineHeight: 30
    }
});
