/**
 * Created by bingPo on 2018/11/21.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableHighlight, AsyncStorage,
} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import InputScrollView from 'react-native-input-scroll-view';
import ImagePicker from 'react-native-image-picker';
import Style from '../../css/Style';
import ETTStatus from "../../compont/ETTStatus"
import Global from '../../compont/Global';
import Hint from '../../compont/Hint';
import Loading from '../../compont/Loading';
import Video from 'react-native-video';
import {Toast} from "teaset";


export default class PublishDynamicImage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            videos: '',
            login_id:'',
            content:''
        }
    }


    componentWillMount() {
        AsyncStorage.getItem('login_id').then(json => {  //获取存储的账户信息
            if (json != null) {
                this.setState({login_id: json});
            };
        });

    }

    /*
     * 点击事件
     */

    uploadImg = () => {
        /*
         *  上传图片
         */
        this.selectVideoTapped();
    };


    selectVideoTapped() {
        /*
         *  选择视频
         */
        const options = {

            title: '选择视频',
            cancelButtonTitle: '取消',
            takePhotoButtonTitle: '录制视频',
            chooseFromLibraryButtonTitle: '选择视频',
            mediaType: 'video',
            videoQuality: 'medium'
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled video picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {

            }
        });
    }
    publishDynamic = () => {
        /*
         *  发布动态
         */
        let content = this.state.content;
        let videos = this.state.videos;

        if(content == ""){
            Toast.show({
                text: "请输入内容",
                position: 'center',
                duration: 2000,
            });
        }else if(videos == ""){
            Toast.show({
                text: "请上传视频",
                position: 'center',
                duration: 2000,
            });
        }else{

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
                            <Text style={[Style.barText, Style.font_1]}>发布视频动态</Text>
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
                    onChangeText={(content) => this.setState({content:content})}
                    value={this.state.content}
                />
            </View>
        )
    };
    _video = () => {
        /*
         *  视频添加
         */
        let video = this.state.videos;
        return (
            <View style={[styles.content_image, Style.flexWarp]}>
                {
                    video == '' ?
                        <TouchableHighlight underlayColor={'transparent'} onPress={() => this.uploadImg()}>
                            <View style={[styles.content_image_1, Style.flexRowCenter]}>
                                <Ionicons name={'md-add'} size={40} color={Global.colors.fontColor_3}/>
                            </View>
                        </TouchableHighlight>
                        :
                        <View>
                            <Video
                                ref={(ref) => {
                                    this.player = ref
                                }}
                                style={styles.videoBox}
                                source={{uri: 'http://111.231.141.185/pet/videos/birdie.mp4'}}
                                paused={true}//暂停
                                rate={1}//播放速度
                                volume={1}//音量
                                muted={false}//是否静音
                                repeat={true}//确定在到达结尾时是否重复播放视频
                                controls={true}//视频打开 是否显示控制
                                playInBackground={false}//后台是否继续播放
                                resizeMode={'cover'}//视频屏幕适配
                                //ignoreSilentSwitch={'inherit'}//控制iOS静默开关行为
                                allowsExternalPlayback={false}//指示播放器是否允许切换到AirPlay或HDMI等外部播放模式
                            />
                        </View>
                }
            </View>
        )
    };

    render() {

        return (
            <View style={[styles.contains]}>
                {this._nav()}
                <InputScrollView>
                    {this._content()}
                    {this._video()}
                </InputScrollView>
                {
                    this.state.loading ?
                        <Loading/>
                        : null
                }
                <Hint ref="hint"/>
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
    videoBox: {
        width: 200,
        height: 120,
    },

});
