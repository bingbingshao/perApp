/**
 * Created by bingpo on 2018/9/3.
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
    Alert, AsyncStorage, DeviceEventEmitter,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import ETTStatus from "../../compont/ETTStatus"
import Style from '../../css/Style';
import Global from '../../compont/Global';
import Loading from '../../compont/Loading';
import Hint from '../../compont/Hint';
import ImagePicker from "react-native-image-picker";
import {Toast} from "teaset";
import Model from "../../model";


export default class Edit_message extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show_eye: false,
            isLoading: false,
            gender: '男',
            pic:'',
            name:'',
            password:'',
            iphone:'',
        }
    }
    componentWillMount() {
        /*
         *  获取页面传参
         */
        let iphone = this.props.navigation.state.params.iphone;
        this.setState({iphone:iphone})
    }

    /*
     * 点击事件
     */
    show_eye = ()=> {
        /*
         *  查看或者关闭密码显示
         */
        this.setState({
            show_eye: !this.state.show_eye,
        })
    };

    upload_head = ()=> {
        /*
         *   上传头像
         */

        const options = {
            title: '请选择',
            cancelButtonTitle: '取消',
            takePhotoButtonTitle: '拍照',
            chooseFromLibraryButtonTitle: '选择相册',
            quality: 0.75,
            allowsEditing: true,
            noData: false,
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };

        ImagePicker.showImagePicker(options, (response) => {
            // console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                // let source = {uri: response};
                // console.log("response",response);
                // this.state.images.push(response);

                this.setState({
                    pic: response.uri,
                });
            }
        });
    };

    change_gender = ()=> {   //更改性别
        Alert.alert('性别', '选择性别',
            [
                {text: "保密", onPress: ()=>this.gender_option('secrecy')},
                {text: "男", onPress: ()=>this.gender_option('male')},
                {text: "女", onPress: ()=>this.gender_option('female')},
            ]
        );
    };
    gender_option(gender) {
        /*
         *  数据转化
         */
        let temp = '';
        if (gender === 'male') {
            temp = '男'
        } else if (gender === 'female') {
            temp = '女'
        } else {
            temp = '保密'
        }
        this.setState({
            gender: temp,
        })
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

    enter_into = ()=> {
        /*
         *  数据填写完整后进入登录页面
         */
        let iphone = this.state.iphone;
        let pic = this.state.pic;
        let name = this.state.name;
        let gender = this.state.gender;
        let password = this.state.password;

        if(gender = "男"){
            gender = 0;
        }else if(gender = "女"){
            gender = 1;
        }else{
            gender = 2;
        }

        if(pic == ""){
            Toast.show({
                text: "请上传头像",
                position: 'center',
                duration: 2000,
            });
        }else if(name = ""){
            Toast.show({
                text: "请输入昵称",
                position: 'center',
                duration: 2000,
            });
        }else if(name = ""){
            Toast.show({
                text: "请输入昵称",
                position: 'center',
                duration: 2000,
            });
        }else if(password == ""){
            Toast.show({
                text: "请输入密码",
                position: 'center',
                duration: 2000,
            });
        }else if(!this.isPassword(password)){
            Toast.show({
                text: "密码要求：6～20位密码，字母/数字/符号至少2种",
                position: 'center',
                duration: 2000,
            });
        }else{
            /*
             *  先上传头像
             */
            let param = {'file': pic, 'dir': this.state.login_id};
            Model.upload(param, (json) => {
                this.setState({
                    pic: json.url
                });
                param = {'iphone':iphone,'name':name,'pic':json.url,'gender':gender,'password':password};
                Model.register(param, (json) => {
                    //登录返回数据提示
                    Toast.show({
                        text: json.msg,
                        position: 'center',
                        duration: 2000,
                    });
                    if (json.code == 200 || json.code == 0) { //登陆成功
                        this.jump('Login', null)
                    }
                }, (json) => {
                    console.log('likes失败: ', json);
                });

            }, (json) => {
                Toast.show({
                    text: "图片上传失败",
                    position: 'center',
                    duration: 2000,
                });
            });
        }
    };
    uploadImage = (pic) => {
        /*
         *  上传图片到服务器
         */

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
                            <Text style={[Style.barText, Style.font_1]}>填写信息</Text>
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

    _list = ()=> {
        /*
         *
         */
        return (
            <View style={[Style.flexColumnStart, styles.contains_center, Style.backgroundColor_1]}>
                <View style={Style.blackText}/><View style={Style.blackText}/>
                {this._upload()}
                <View style={Style.blackText}/><View style={Style.blackText}/>
                <View style={Style.blackText}/><View style={Style.blackText}/>
                {this._editNick()}
                <View style={Style.blackText}/>
                {this._editGender()}
                <View style={Style.blackText}/>
                {this._editPW()}
                <View style={Style.blackText}/><View style={Style.blackText}/>
                <View style={Style.blackText}/><View style={Style.blackText}/>
                <View style={Style.blackText}/><View style={Style.blackText}/>
                {this._enterBtn()}
            </View>
        )
    };
    _upload = ()=> {
        /*
         *  上传头像
         */
        return (
            <TouchableHighlight
                underlayColor={'transparent'}
                onPress={()=>this.upload_head()}>
                <View style={[styles.text_1, Style.flexRowBetween, {paddingLeft: 15}]}>
                    {
                        this.state.pic  == '' ?
                            <Image source={require('../../image/icon_head.png')} style={[styles.image_1]}/>
                            :
                            <Image source={{uri:this.state.pic}} style={[styles.image_1]}/>
                    }
                    <View style={[Style.flexRowCenter, {paddingRight: 15}]}>
                        <Text style={[Style.font_4, Style.color_2, {paddingRight: 10}]}>上传头像</Text>
                        <FontAwesome name='angle-right' size={28} color='#836FFF'/>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }
    _editNick = ()=> {
        return (
            <View style={[styles.text_2, Style.flexRowBetween]}>
                <Text
                    style={[Style.color_2, Style.font_4, {paddingLeft: 10, paddingRight: 10}]}>昵称:</Text>
                <TextInput style={[Style.color_4, Style.font_4, {
                    width: Global.window.width * 0.73,
                    paddingRight: 5,
                }]}
                           placeholder="起什么名字好呢"
                           underlineColorAndroid='transparent'
                           placeholderTextColor="#836FFF"
                           clearButtonMode='while-editing'
                           keyboardType='default'  //选择弹出数字键盘
                           onChangeText={(name)=>this.setState({name:name})}
                           value={this.state.name}
                />
            </View>
        )
    };
    _editGender = ()=> {
        /*
         *  修改性别
         */
        return (
            <View style={[styles.text_2, Style.flexRowStart]}>
                <Text style={[Style.color_2, Style.font_4, {paddingLeft: 10, paddingRight: 10}]}>性别:</Text>
                <TouchableHighlight
                    underlayColor={'transparent'}
                    onPress={()=>this.change_gender()}>
                    <View style={{width: Global.window.width * 0.7}}>
                        <Text style={[Style.color_2, Style.font_4,]}>{this.state.gender}</Text>
                    </View>
                </TouchableHighlight>
            </View>
        )
    };
    _editPW = ()=> {
        /*
         *  修改密码
         */
        return (
            <View style={[styles.text_2, Style.flexRowBetween]}>
                <Text
                    style={[Style.color_2, Style.font_4, {paddingLeft: 10, paddingRight: 10}]}>密码:</Text>
                <TextInput style={[Style.color_4, Style.font_4, {width: Global.window.width * 0.65}]}
                           placeholder="请设置密码"
                           underlineColorAndroid='transparent'
                           placeholderTextColor="#836FFF"
                           clearButtonMode='while-editing'
                           onChangeText={(password)=>this.setState({password:password})}
                           secureTextEntry={!this.state.show_eye}
                           value={this.state.password}
                />
                <TouchableHighlight
                    underlayColor={'transparent'}
                    onPress={()=>this.show_eye()}>
                    <FontAwesome name={this.state.show_eye ? 'eye' : 'eye-slash'} size={20} color='#836FFF'
                                 style={{paddingRight: 10}}/>
                </TouchableHighlight>
            </View>
        )
    };
    _enterBtn = ()=> {
        /*
         *  进人按钮
         */
        return (
            <TouchableHighlight
                underlayColor={'transparent'}
                onPress={()=>this.enter_into()}>
                <View style={[styles.button_1, Style.flexRowCenter, Style.backgroundColor_2]}>
                    <Text style={[Style.font_1, Style.color_1]}>进 入</Text>
                </View>
            </TouchableHighlight>
        )
    };


    render() {
        return (
            <View style={[styles.contains, Style.backgroundColor_1]}>
                {this._nav()}
                <ScrollView
                    keyboardDismissMode='on-drag'
                    showsVerticalScrollIndicator='false'
                >
                    {this._list()}
                </ScrollView>
                {
                    this.state.isLoading ?
                        <Loading/>
                        : null
                }
                <Hint ref={'hint'}/>
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
        height: Global.window.width * 0.32,
        borderColor: Global.colors.fontColor_2,
        borderBottomWidth: 1,
        borderStyle: 'solid'
    },
    text_2: {
        width: Global.window.width * 0.9,
        height: Global.window.width * 0.16,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#836FFF',
        borderStyle: 'solid'
    },
    button_1: {
        width: Global.window.width * 0.8,
        height: Global.window.width * 0.107,
        borderRadius: 20,
    },
    image_1: {
        width: Global.window.width * 0.24,
        height: Global.window.width * 0.24,
        borderRadius: Global.window.width * 0.12,
        borderWidth: 1,
        borderColor: Global.colors.fontColor_3,
        borderStyle: 'solid'
    }
});
