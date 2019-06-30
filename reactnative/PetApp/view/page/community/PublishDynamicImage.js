/**
 * Created by bingPo on 2018/11/21.
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
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import InputScrollView from 'react-native-input-scroll-view';
import ImagePicker from 'react-native-image-picker';
import Style from '../../css/Style';
import ETTStatus from "../../compont/ETTStatus"
import Global from '../../compont/Global';
import Loading from '../../compont/Loading';
import {Toast} from "teaset";
import {createRandomID} from "../../compont/Function";
import Model from "../../model";


export default class PublishDynamicImage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            images: [],
            content: '',
            login_id: ''
        }
    }


    componentWillMount() {
        AsyncStorage.getItem('login_id').then(json => {  //获取存储的账户信息
            if (json != null) {
                this.setState({login_id: json});
            }
            ;
        });
    }

    /*
     * 点击事件
     */
    uploadImg = () => {
        /*
         *  上传图片
         */
        this.selectPhotoTapped();
    };
    minusImg = (number) => {
        /*
         *  去掉选择上传的图片
         */
        // console.log("number", number);
        // console.log("this.state.images", this.state.images);
        this.state.images.splice(number, 1);
        this.setState({
            images: this.state.images,
        })
        // alert('去掉选择上传的图片');
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
                this.state.images.push(response.uri);

                this.setState({
                    images: this.state.images
                });
            }
        });
    }

    publishDynamic = () => {
        /*
         *  发布动态
         */
        let content = this.state.content;
        let images = this.state.images;

        if (content == "") {
            Toast.show({
                text: "请输入内容",
                position: 'center',
                duration: 2000,
            });
        } else if (images.length != 0) {
            /*
             *  上传图片
             */
            let temp_images = [];
            images.map((pic, i) => {
                let param = {'file': pic, 'dir': this.state.login_id};
                Model.upload(param, (json) => {
                    let temp = json.url;
                    temp_images.push(temp);

                    if (i == images.length - 1) {
                        /*
                         *  图片上传完毕
                         */
                        this.setState({loading:true});
                        let id = createRandomID();
                        let iphone = this.state.login_id;
                        let dynamic_type = 1;
                        let brief = this.state.content;
                        let image = temp_images.join('ΩΩ');
                        let video = '';
                        let param = {
                            'id': id,
                            'dynamic_type': dynamic_type,
                            'iphone': iphone,
                            'brief': brief,
                            'image': image,
                            'video': video
                        };
                        Model.publishDynamicImage(param, (json) => {
                            Toast.show({
                                text: json.msg,
                                position: 'center',
                                duration: 2000,
                            });
                            this.setState({loading:false});
                            DeviceEventEmitter.emit('dyanmic_success', iphone);  //设置一个登录成功提示

                            this.props.navigation.navigate('Community');

                        }, (json) => {
                            Toast.show({
                                text: "动态发布失败",
                                position: 'center',
                                duration: 2000,
                            });
                        });

                    }

                }, (json) => {
                    Toast.show({
                        text: "图片上传失败",
                        position: 'center',
                        duration: 2000,
                    });
                });
            });
        } else {
            /*
             *  无图动态
             */
            this.setState({loading:true});
            let id = createRandomID();
            let iphone = this.state.login_id;
            let dynamic_type = 1;
            let brief = this.state.content;
            let image = '';
            let video = '';
            let param = {
                'id': id,
                'dynamic_type': dynamic_type,
                'iphone': iphone,
                'brief': brief,
                'image': image,
                'video': video
            };
            Model.publishDynamicImage(param, (json) => {
                Toast.show({
                    text: json.msg,
                    position: 'center',
                    duration: 2000,
                });
                this.setState({loading:false});
                DeviceEventEmitter.emit('dyanmic_success', iphone);  //设置一个登录成功提示

                this.props.navigation.navigate('Community');

            }, (json) => {
                Toast.show({
                    text: "动态发布失败",
                    position: 'center',
                    duration: 2000,
                });
            });
        }
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
                        underlayColor={'transparent'}>
                        <View>
                            <Text style={[Style.barText, Style.font_1]}>发布图文动态</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight
                        underlayColor={'transparent'}
                        onPress={() => this.publishDynamic()}
                    >
                        <View style={[Style.icon_1, Style.flexRowCenter]}>
                            <Icon name={'send-o'} size={16} color={Global.colors.fontColor_2}/>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        )
    };

    _content = () => {
        /*
         *  动态文本内容
         */
        return (
            <View style={[styles.content_text]}>
                <TextInput
                    style={styles.content_input}
                    placeholder="来吧，尽情的发挥吧~"
                    underlineColorAndroid='transparent'
                    placeholderTextColor="#836FFF"
                    clearButtonMode='while-editing'
                    multiline={true}
                    // maxLength={150}
                    onChangeText={(content) => this.setState({content: content})}
                    value={this.state.content}
                />
            </View>
        )
    };
    _image = () => {
        /*
         *  图片添加
         */
        let imageData = this.state.images;
        return (
            <View style={[styles.content_image, Style.flexWarp]}>
                {
                    imageData.map((image, i) => {
                        return (
                            <View style={styles.content_image_2}>
                                <Image style={styles.content_image_3}
                                       source={{uri: image}}/>
                                <TouchableHighlight
                                    style={styles.content_img_close}
                                    underlayColor={'transparent'}
                                    onPress={() => this.minusImg(i)}>
                                    <AntDesign name={'closecircle'} size={14} color={'#f00'}/>
                                </TouchableHighlight>
                            </View>
                        )
                    })
                }
                <TouchableHighlight underlayColor={'transparent'} onPress={() => this.uploadImg()}>
                    <View style={[styles.content_image_1, Style.flexRowCenter]}>
                        <Ionicons name={'md-add'} size={40} color={Global.colors.fontColor_3}/>
                    </View>
                </TouchableHighlight>
            </View>
        )
    };

    render() {

        return (
            <View style={[styles.contains]}>
                {this._nav()}
                <InputScrollView>
                    {this._content()}
                    {this._image()}
                </InputScrollView>
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

    //动态文本内容
    content_text: {
        // paddingTop: 10,
        margin: 15,
        paddingBottom: 20,
        // borderBottomColor: '#eee',
        // borderBottomWidth: 1,
    },
    content_input: {
        lineHeight: 25,
        textAlignVertical: "top",
        fontSize: 16,
        color: Global.colors.fontColor_1
    },
    content_image: {
        marginTop: 30,
        width: Global.window.width,
        padding: 10,
    },
    content_image_1: {
        width: (Global.window.width - 20) / 3 - 21,
        height: (Global.window.width - 20) / 3 - 21,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5,
        marginBottom: 5,
        position: 'relative',
        borderWidth: 2,
        borderColor: Global.colors.fontColor_3,
        borderRadius: 5,
        borderStyle: 'dashed'
    },
    content_image_2: {
        width: (Global.window.width - 20) / 3 - 21,
        height: (Global.window.width - 20) / 3 - 21,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5,
        marginBottom: 5,
        borderRadius: 5,
    },
    content_image_3: {
        width: (Global.window.width - 20) / 3 - 21,
        height: (Global.window.width - 20) / 3 - 21,
        borderRadius: 5,
    },
    content_img_close: {
        position: 'absolute',
        top: -5,
        right: -5,
        width: 15,
        height: 15,
    },

});
