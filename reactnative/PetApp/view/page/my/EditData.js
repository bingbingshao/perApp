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


export default class EditData extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading:false,
            login_id:'',
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
         *  获取本地存储的 login_id 判断是否登录
         */
        AsyncStorage.getItem('login_id').then(json => {
            if (json != null || json != "") {
                //用户已经登录
                // console.log("json", json);
                this.setState({
                    loading: true,
                    login_id: json
                });
                this.start(json);
            }
        });
    }

    /*
     * 点击事件
     */
    start = (login_id) => {
        /*
    *  获取个人信息
    */
        let param = {'login_id': login_id};
        Model.myPersonal(param, (json) => {
            let temp = json.retData[0];
            console.log("myPersonal", json)
            this.setState({
                loading: false,
                personal: temp,
                birth: temp.birth,
                address: temp.address,
                name: temp.name,
                motto: temp.motto,
                pic: temp.pic
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

    save_alter = () => {
        /*
         *  保存数据 存储数据库
         */
        if (this.state.changePic) {
            //当用户更改头像的时候先上传头像
            this.uploadImage();
        } else {
            this.saveEdit(this.state.pic);
        }

    };

    uploadImage = () => {
        /*
         *  上传图片到服务器
         */
        let param = {'file': this.state.pic, 'dir': this.state.login_id};
        Model.upload(param, (json) => {
            this.setState({
                pic: json.url
            });
            //图片上传成功后调用保存数据
            this.saveEdit(json.url);
        }, (json) => {
            Toast.show({
                text: "图片上传失败",
                position: 'center',
                duration: 2000,
            });
        });
    };

    saveEdit = (pic) => {
        /*
         *  保存修改的数据到数据库
         */
        let gender = 0;
        if(this.state.gender == '男'){
            gender = 0;
        }else if(this.state.gender == '女'){
            gender = 1;
        }else{
            gender = 2;
        }
        let param = {
            'login_id': this.state.login_id,
            'name': this.state.name,
            'pic': pic,
            'gender':gender,
            'birth':this.state.birth,
            'motto':this.state.motto,
            'address':this.state.address,
        };
        Model.savePersonal(param, (json) => {
            this.setState({
                loading:true,
            });

            this.timerWait1 = setTimeout(()=>{
                clearTimeout(this.timerWait1 );
                Toast.show({
                    text: json.msg,
                    position: 'center',
                    duration: 2000,
                });
                DeviceEventEmitter.emit('save_edit', this.state.login_id);  //设置一个信息更新成功提示
                this.props.navigation.navigate('My');
            },1000);

        }, (json) => {
            Toast.show({
                text: "保存失败",
                position: 'center',
                duration: 2000,
            });
        });
    };

    upload_head = () => {
        /*
         *  上传头像
         */
        this.selectPhotoTapped();
    };
    selectPhotoTapped = () => {
        /*
         *  选择上传的图片
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
                    images: response,
                    pic: response.uri,
                    changePic: true
                });
            }
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
                            <Text style={[Style.barText, Style.font_1]}>编辑信息</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight
                        underlayColor={'transparent'}
                        onPress={() => this.save_alter()}
                    >
                        <View style={[Style.icon_1, Style.flexRowCenter, {marginRight: 10}]}>
                            <Text style={[Style.font_2, Style.color_4]}>保存</Text>
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
            <TouchableHighlight underlayColor={'transparent'} onPress={() => this.upload_head()}>
                <View style={[styles.text_1, Style.shadow_1, Style.flexRowBetween, {paddingLeft: 15}]}>
                    <View style={[styles.text_4, Style.flexRowCenter, Style.shadow_3]}>
                        {
                            this.state.personal == "" ?
                                <Image source={require('../../image/icon_head.png')} style={[styles.image_1]}/>
                                :
                                <Image source={{uri: this.state.pic}} style={[styles.image_1]}/>
                        }

                    </View>
                    <View style={[Style.flexRowCenter, {paddingRight: 15}]}>
                        <Text style={[Style.font_4, Style.color_2, {paddingRight: 10}]}>更换头像</Text>
                        <FontAwesome name='angle-right' size={28} color={Global.colors.fontColor_2}/>
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
                    onChangeText={(phone) => this.setState({name:phone})}
                    value={this.state.name}
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
                <TouchableHighlight underlayColor='#fff' onPress={this._showGenderPicker.bind(this)}>
                    <Text style={[styles.font_1]}>{this.state.gender}</Text>
                </TouchableHighlight>
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
                <TouchableHighlight underlayColor='#fff' onPress={this._showTimePicker.bind(this)}>
                    <Text style={[styles.font_1]}>{this.state.birth}</Text>
                </TouchableHighlight>
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
                <TouchableHighlight underlayColor='#fff' onPress={this._showAreaPicker.bind(this)}>
                    <Text style={[styles.font_1]}>{this.state.address}</Text>
                </TouchableHighlight>
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
                           onChangeText={(sign) => this.setState({motto:sign})}
                           value={this.state.motto}
                />
            </View>
        )
    };

    _modal = () => {
        /*
         *  遮盖层
         */
        return (
            <Modal
                style={{backgroundColor: '#000'}}
                visible={this.state.select_modal}  // 根据isModal决定是否显示
                animationType={'fade'}       /// 显示格式  slide:从底部 none:无  fade:淡入淡出
                transparent={true}    // 不透明
                onRequestClose={() => this.onRequestClose()}
                onPress={() => {
                    Picker.toggle();
                    this.setState({
                        select_modal: false
                    })
                }}
            >
                <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.6)'}}
                      onPress={() => {
                          Picker.toggle();
                          this.setState({
                              select_modal: false
                          })
                      }}>
                </View>
            </Modal>
        )
    }

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
                {this._modal()}
                {
                    this.state.loading ?
                        <Loading/>
                        : null
                }v
            </View>
        )
    }

    _showTimePicker() {
        /*
         *  时间
         */
        //设置遮盖层
        this.setState({select_modal: true});
        let years = [],
            months = [],
            days = [];

        for (let i = 1; i < 51; i++) {
            years.push(i + 1980);
        }
        for (let i = 1; i < 13; i++) {
            months.push(i);
        }
        for (let i = 1; i < 32; i++) {
            days.push(i);
        }
        let pickerData = [years, months, days];
        let date = new Date();
        let selectedValue = [
            date.getFullYear(),
            date.getMonth() + 1,
            date.getDate(),
        ];
        Picker.init({
            pickerData,
            selectedValue,
            pickerTitleText: '选择日期',
            pickerTitleColor: [125, 38, 205, 1],
            pickerConfirmBtnText: '确定',
            pickerConfirmBtnColor: [125, 38, 205, 0.8],
            pickerCancelBtnText: '取消',
            pickerCancelBtnColor: [131, 112, 255, 1],
            pickerToolBarBg: [248, 248, 248, 1],
            pickerBg: [255, 255, 255, 1],
            pickerFontColor: [0, 0, 0, 1],
            pickerFontSize: 18,
            wheelFlex: [1, 1, 1],
            onPickerConfirm: pickedValue => {
                /*
                 *  确定选择
                 */
                this.setState({
                    birth: pickedValue[0] + "-" + pickedValue[1] + "-" + pickedValue[2],
                    select_modal: false,
                })
            },
            onPickerCancel: pickedValue => {
                /*
                 *  取消选择
                 */
                this.setState({select_modal: false});
                // console.log('area', pickedValue);
            },
            onPickerSelect: pickedValue => {
                let targetValue = [...pickedValue];
                if (parseInt(targetValue[1]) === 2) {
                    if (targetValue[0] % 4 === 0 && targetValue[2] > 29) {
                        targetValue[2] = 29;
                    } else if (targetValue[0] % 4 !== 0 && targetValue[2] > 28) {
                        targetValue[2] = 28;
                    }
                } else if (targetValue[1] in {4: 1, 6: 1, 9: 1, 11: 1} && targetValue[2] > 30) {
                    targetValue[2] = 30;

                }
                // forbidden some value such as some 2.29, 4.31, 6.31...
                if (JSON.stringify(targetValue) !== JSON.stringify(pickedValue)) {
                    // android will return String all the time，but we put Number into picker at first
                    // so we need to convert them to Number again
                    targetValue.map((v, k) => {
                        if (k !== 3) {
                            targetValue[k] = parseInt(v);
                        }
                    });
                    Picker.select(targetValue);
                    pickedValue = targetValue;
                }
            }
        });
        Picker.show();
    }

    _showAreaPicker() {
        /*
         *  位置
         */
        //设置遮盖层
        this.setState({select_modal: true});
        Picker.init({
            pickerData: this._createAreaData(),
            pickerTitleText: '选择地址',
            pickerTitleColor: [125, 38, 205, 1],
            pickerConfirmBtnText: '确定',
            pickerConfirmBtnColor: [125, 38, 205, 0.8],
            pickerCancelBtnText: '取消',
            pickerCancelBtnColor: [131, 112, 255, 1],
            pickerToolBarBg: [248, 248, 248, 1],
            pickerBg: [255, 255, 255, 1],
            pickerFontColor: [0, 0, 0, 1],
            pickerFontSize: 18,
            selectedValue: ['北京', '北京', '东城区'],
            onPickerConfirm: pickedValue => {
                //设置遮盖层
                this.setState({
                    select_modal: false,
                    address: pickedValue[0] + "-" + pickedValue[1] + "-" + pickedValue[2]
                });
                // console.log('area', pickedValue);
            },
            onPickerCancel: pickedValue => {
                this.setState({
                    select_modal: false,
                });
                // console.log('area', pickedValue);
            },
            onPickerSelect: pickedValue => {
                //Picker.select(['山东', '青岛', '黄岛区'])
                // console.log('area', pickedValue);
            }
        });
        Picker.show();
    }

    _createAreaData() {
        //位置数组
        let data = [];
        let len = area.length;
        for (let i = 0; i < len; i++) {
            let city = [];
            for (let j = 0, cityLen = area[i]['city'].length; j < cityLen; j++) {
                let _city = {};
                _city[area[i]['city'][j]['name']] = area[i]['city'][j]['area'];
                city.push(_city);
            }

            let _data = {};
            _data[area[i]['name']] = city;
            data.push(_data);
        }
        return data;
    }

    _showGenderPicker() {
        /*
         *  时间
         */
        //设置遮盖层
        this.setState({select_modal: true});
        Picker.init({
            pickerData: ["男", "女", "未知"],
            selectedValue: ["男"],
            pickerTitleText: '选择性别',
            pickerTitleColor: [125, 38, 205, 1],
            pickerConfirmBtnText: '确定',
            pickerConfirmBtnColor: [125, 38, 205, 0.8],
            pickerCancelBtnText: '取消',
            pickerCancelBtnColor: [131, 112, 255, 1],
            pickerToolBarBg: [248, 248, 248, 1],
            pickerBg: [255, 255, 255, 1],
            pickerFontColor: [0, 0, 0, 1],
            pickerFontSize: 18,
            wheelFlex: [1],
            onPickerConfirm: pickedValue => {
                /*
                 *  确定选择
                 */
                this.setState({
                    gender: pickedValue[0],
                    select_modal: false,
                })
            },
            onPickerCancel: pickedValue => {
                /*
                 *  取消选择
                 */
                this.setState({select_modal: false});
                // console.log('area', pickedValue);
            },
            onPickerSelect: pickedValue => {
                // console.log('area', pickedValue);
            }
        });
        Picker.show();
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
