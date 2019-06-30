import React, {Component} from 'react'

import {
    StyleSheet,
    View,
    Alert,
    Dimensions,
    Button,
    Platform,
    TouchableHighlight, Text
} from 'react-native'

var RNFS = require('react-native-fs')
import Global from "../../compont/Global"
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

var ReactNative = require('react-native')
import IMUI from 'aurora-imui-react-native'
import Style from "../../css/Style";
import ETTStatus from "./index";
import {Theme, Toast} from 'teaset';
var InputView = IMUI.ChatInput
var MessageListView = IMUI.MessageList
const AuroraIController = IMUI.AuroraIMUIController
const window = Dimensions.get('window')


/*
 *   判断 手机是不是iPhoneX
 */
let initHeight, bottomMargin;
if (Platform.OS === "ios") {
    if (Theme.isIPhoneX) {
        bottomMargin = 20;
        initHeight = 45;
    } else {
        bottomMargin = 0;
        initHeight = 40
    }
} else {
    initHeight = 100
}



var themsgid = 1

function constructNormalMessage() {

    var message = {}
    message.msgId = themsgid.toString()
    themsgid += 1
    message.status = "send_succeed"
    message.isOutgoing = true
    var date = new Date()
    message.timeString = date.getHours() + ":" + date.getMinutes()
    var user = {
        userId: "",
        displayName: "replace your nickname",
        avatarPath: "images"
    }
    if (Platform.OS === "ios") {
        user.avatarPath = RNFS.MainBundlePath + '/default_header.png'
    }
    message.fromUser = user

    return message
}

var imageUrlArray = [
    "http://111.231.141.185/pet/image/pet-banner-1.jpg",
    "http://111.231.141.185/pet/image/pet-banner-2.jpg",
    "http://111.231.141.185/pet/image/pet-banner-3.jpg",
    "http://111.231.141.185/pet/image/pet-banner-4.jpg",
    "http://111.231.141.185/pet/image/pet-banner-5.jpg",
    "http://111.231.141.185/pet/image/pet-banner-6.jpg",
    "http://111.231.141.185/pet/image/pet-banner-7.jpg",
    "http://111.231.141.185/pet/image/pet-banner-8.jpg",
    "http://111.231.141.185/pet/image/pet-banner-9.jpg",
    "http://111.231.141.185/pet/image/pet-banner-10.jpg",
]

class CustomVew extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (<img src={`${RNFS.MainBundlePath}/default_header.png`}></img>)
    }
}

export default class TestRNIMUI extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputLayoutHeight: initHeight,
            messageListLayout: {flex: 1, width: window.width, margin: 0},
            inputViewLayout: {width: window.width, height: initHeight, marginBottom: bottomMargin},
            isAllowPullToRefresh: true,
            navigationBar: {},
        }


        this.updateLayout = this.updateLayout.bind(this);
        this.onMsgClick = this.onMsgClick.bind(this);
        this.messageListDidLoadEvent = this.messageListDidLoadEvent.bind(this);
    }

    componentDidMount() {
        /**
         * Android only
         * Must set menu height once, the height should be equals with the soft keyboard height so that the widget won't flash.
         * 在别的界面计算一次软键盘的高度，然后初始化一次菜单栏高度，如果用户唤起了软键盘，则之后会自动计算高度。
         */
        if (Platform.OS === "android") {
            this.refs["ChatInput"].setMenuContainerHeight(316)
        }
        this.resetMenu()
        AuroraIController.addMessageListDidLoadListener(this.messageListDidLoadEvent);
    }

    messageListDidLoadEvent() {
        this.getHistoryMessage()
    }

    getHistoryMessage() {
        var messages = []
        for (var index in imageUrlArray) {
            var message = constructNormalMessage()
            message.fromUser.avatarUrl = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534926548887&di=f107f4f8bd50fada6c5770ef27535277&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F11%2F67%2F23%2F69i58PICP37.jpg",//1
                message.msgType = 'image'
            message.mediaPath = imageUrlArray[index]
            message.contentSize = {'height': 100, 'width': 200}
            message.extras = {"extras": "fdfsf"}
            messages.push(message)
            // AuroraIController.appendMessages([message])
            // AuroraIController.scrollToBottom(true)
        }
        AuroraIController.appendMessages(messages)
        AuroraIController.scrollToBottom(true)

        // for (var i = 0; i < 10; i++) {
        //   var message = constructNormalMessage()
        //   message.msgType = 'custom'

        //   if (Platform.OS === "ios") {
        //     message.content = `
        //     <h5>This is a custom message. </h5>
        //     <img src="file://${RNFS.MainBundlePath}/default_header.png"/>
        //     `
        //   } else {
        //     message.content = '<body bgcolor="#ff3399"><h5>This is a custom message. </h5>\
        //     <img src="/storage/emulated/0/XhsEmoticonsKeyboard/Emoticons/wxemoticons/icon_040_cover.png"></img></body>'
        //   }

        //   var eventMessage = constructNormalMessage()
        //   eventMessage.msgType = "event"
        //   eventMessage.text = 'fsadfad'

        //   message.contentSize = { 'height': 100, 'width': 200 }
        //   message.extras = { "extras": "fdfsf" }
        //   AuroraIController.appendMessages([message, eventMessage])
        //   AuroraIController.scrollToBottom(true)
        // }
    }

    onInputViewSizeChange = (size) => {
        console.log("onInputViewSizeChange height: " + size.height + " width: " + size.width)
        if (this.state.inputLayoutHeight != size.height) {
            this.setState({
                inputLayoutHeight: size.height,
                inputViewLayout: {width: window.width, height: size.height, marginBottom: bottomMargin},
                messageListLayout: {flex: 1, width: window.width, margin: 0}
            })
        }
    }

    componentWillUnmount() {
        AuroraIController.removeMessageListDidLoadListener(this.messageListDidLoadEvent)
    }

    resetMenu() {

        AuroraIController.hidenFeatureView(true)
    }

    /**
     * Android need this event to invoke onSizeChanged
     */
    onTouchEditText = () => {
        // this.refs["ChatInput"].showMenu(false)
    }

    onFullScreen = () => {
        console.log("on full screen")
        this.setState({
            messageListLayout: {flex: 0, width: 0, height: 0},
            inputViewLayout: {flex: 1, width: window.width, height: window.height, marginBottom: bottomMargin},
            navigationBar: {height: 0}
        })
    }

    onRecoverScreen = () => {
        // this.setState({
        //   inputLayoutHeight: 100,
        //   messageListLayout: { flex: 1, width: window.width, margin: 0 },
        //   inputViewLayout: { flex: 0, width: window.width, height: 100 },
        //   navigationBar: { height: 64, justifyContent: 'center' }
        // })
    }

    onAvatarClick = (message) => {
        // Alert.alert()
        // AuroraIController.removeMessage(message.msgId)
    }

    onMsgClick(message) {
        // console.log(message)
        // Alert.alert("message", JSON.stringify(message))
    }

    onMsgLongClick = (message) => {
        // Alert.alert('message bubble on long press', 'message bubble on long press')
    }

    onStatusViewClick = (message) => {
        // message.status = 'send_succeed'
        // AuroraIController.updateMessage(message)
    }

    onBeginDragMessageList = () => {
        this.resetMenu()
        AuroraIController.hidenFeatureView(true)
    }

    onTouchMsgList = () => {
        AuroraIController.hidenFeatureView(true)
    }

    onPullToRefresh = () => {
        console.log("on pull to refresh")
        var messages = []
        for (var i = 0; i < 14; i++) {
            var message = constructNormalMessage()
            // if (index%2 == 0) {
            message.msgType = "text"
            message.text = "" + i
            // }

            if (i % 3 == 0) {
                message.msgType = "video"
                message.text = "" + i
                message.mediaPath = "/storage/emulated/0/ScreenRecorder/screenrecorder.20180323101705.mp4"
                message.duration = 12
            }
            messages.push(message)
        }
        AuroraIController.insertMessagesToTop(messages)
        if (Platform.OS === 'android') {
            this.refs["MessageList"].refreshComplete()
        }

    }

    onSendText = (text) => {
        var message = constructNormalMessage()
        var evenmessage = constructNormalMessage()

        message.msgType = 'text'
        message.text = text

        AuroraIController.appendMessages([message])
    }

    onTakePicture = (media) => {
        console.log("media " + JSON.stringify(media))
        var message = constructNormalMessage()
        message.msgType = 'image'
        message.mediaPath = media.mediaPath
        AuroraIController.appendMessages([message])
        this.resetMenu()
        AuroraIController.scrollToBottom(true)
    }

    onStartRecordVoice = (e) => {
        console.log("on start record voice")
    }

    onFinishRecordVoice = (mediaPath, duration) => {
        var message = constructNormalMessage()
        message.msgType = "voice"
        message.mediaPath = mediaPath
        message.timeString = "safsdfa"
        message.duration = duration
        AuroraIController.appendMessages([message])
        console.log("on finish record voice")
    }

    onCancelRecordVoice = () => {
        console.log("on cancel record voice")
    }

    onStartRecordVideo = () => {
        console.log("on start record video")
    }

    onFinishRecordVideo = (video) => {
        // var message = constructNormalMessage()

        // message.msgType = "video"
        // message.mediaPath = video.mediaPath
        // message.duration = video.duration
        // AuroraIController.appendMessages([message])
    }

    onSendGalleryFiles = (mediaFiles) => {
        /**
         * WARN: This callback will return original image,
         * if insert it directly will high memory usage and blocking UI。
         * You should crop the picture before insert to messageList。
         *
         * WARN: 这里返回的是原图，直接插入大会话列表会很大且耗内存.
         * 应该做裁剪操作后再插入到 messageListView 中，
         * 一般的 IM SDK 会提供裁剪操作，或者开发者手动进行裁剪。
         *
         * 代码用例不做裁剪操作。
         */
        Alert.alert('fas', JSON.stringify(mediaFiles))
        for (index in mediaFiles) {
            var message = constructNormalMessage()
            if (mediaFiles[index].mediaType == "image") {
                message.msgType = "image"
            } else {
                message.msgType = "video"
                message.duration = mediaFiles[index].duration
            }

            message.mediaPath = mediaFiles[index].mediaPath
            message.timeString = "8:00"
            message.status = "send_going"
            AuroraIController.appendMessages([message])
            AuroraIController.scrollToBottom(true)
        }

        this.resetMenu()
    }

    onSwitchToMicrophoneMode = () => {
        AuroraIController.scrollToBottom(true)
    }

    onSwitchToEmojiMode = () => {
        AuroraIController.scrollToBottom(true)
    }
    onSwitchToGalleryMode = () => {
        AuroraIController.scrollToBottom(true)
    }

    onSwitchToCameraMode = () => {
        AuroraIController.scrollToBottom(true)
    }

    onShowKeyboard = (keyboard_height) => {
    }

    updateLayout(layout) {
        this.setState({inputViewLayout: layout})
    }

    onInitPress() {
        console.log('on click init push ');
        this.updateAction();
    }

    onClickSelectAlbum = () => {
        console.log("on click select album")
    }

    onCloseCamera = () => {
        console.log("On close camera event")
        this.setState({
            inputLayoutHeight: 100,
            messageListLayout: {flex: 1, width: window.width, margin: 0},
            inputViewLayout: {flex: 0, width: window.width, height: 100},
            navigationBar: {height: 64, justifyContent: 'center'}
        })
    }

    /**
     * Switch to record video mode or not
     */
    switchCameraMode = (isRecordVideoMode) => {
        console.log("Switching camera mode: isRecordVideoMode: " + isRecordVideoMode)
        // If record video mode, then set to full screen.
        if (isRecordVideoMode) {
            this.setState({
                messageListLayout: {flex: 0, width: 0, height: 0},
                inputViewLayout: {flex: 1, width: window.width, height: window.height,},
                navigationBar: {height: 0}
            })
        }
    }

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
                            <Text style={[Style.barText, Style.font_1]}>蓝猫</Text>
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

    render() {
        return (
            <View style={styles.container}>
                {this._nav()}
                <View style={[styles.box]}/>

                <MessageListView
                    style={this.state.messageListLayout}
                    ref="MessageList"
                    isAllowPullToRefresh={true}     ///是否开启下拉刷新功能
                    onAvatarClick={this.onAvatarClick}   //点击头像触发
                    onMsgClick={this.onMsgClick}   //点击消息气泡触发
                    onStatusViewClick={this.onStatusViewClick}  //点击消息状态按钮触发
                    onTouchMsgList={this.onTouchMsgList}   //点击消息列表触发。
                    //onTapMessageCell={this.onTapMessageCell}  //???????
                    onBeginDragMessageList={this.onBeginDragMessageList}   //开始滑动消息列表的时候触发，用于调整布局
                    onPullToRefresh={this.onPullToRefresh}    //滚动 MessageList 到顶部时，下拉触发,
                    avatarSize={{width: 50, height: 50}}
                    avatarCornerRadius={25}   //设置头像圆角半径
                    messageListBackgroundColor={"#f3f3f3"}  //设置消息列表背景颜色
                    sendBubbleTextSize={18}   //设置发送消息的文本字体大小，单位点
                    sendBubbleTextColor={"#000000"}  //设置发送消息的文本颜色
                    sendBubblePadding={{left: 10, top: 10, right: 15, bottom: 10}}  //发送消息泡泡的内边距
                    datePadding={{left: 5, top: 5, right: 5, bottom: 5}}  //设置时间的内边距
                    dateBackgroundColor={"#F3F3F3"}  //设置时间的背景颜色
                    photoMessageRadius={5}  // 消息为图片时图片的圆角
                    maxBubbleWidth={0.5}    ///设置气泡的最大宽度。值为屏幕宽度的百分比
                    videoDurationTextColor={"#ffffff"}  //
                />
                <InputView
                    style={this.state.inputViewLayout}
                    ref="ChatInput"
                    onTouchEditText={this.onTouchEditText()}   //点击输入框触发。
                    onSendText={this.onSendText}  //输入文字后点击发送按钮触发
                    onTakePicture={this.onTakePicture}  //点击拍照按钮触发
                    onStartRecordVoice={this.onStartRecordVoice}   //点击录音按钮触发
                    onFinishRecordVoice={this.onFinishRecordVoice}  //录音完成后松开手指触发，result 参数为 {mediaPath: string, duration: number}
                    onCancelRecordVoice={this.onCancelRecordVoice}  //手指移动到取消录音区域后，抬起手指触发
                    onSendGalleryFiles={this.onSendGalleryFiles}   //选中视频或图片后点击发送按钮触发，result 参数为 {mediaFiles: [string]}, 图片路径数组
                    onSwitchToEmojiMode={this.onSwitchToEmojiMode}  //点击菜单栏表情按钮触发。
                    onSwitchToMicrophoneMode={this.onSwitchToMicrophoneMode}   //点击菜单栏麦克风按钮触发。
                    onSwitchToGalleryMode={this.onSwitchToGalleryMode}  //点击菜单栏图片按钮触发。
                    onSwitchToCameraMode={this.onSwitchToCameraMode}   //点击菜单栏拍照按钮触发。
                    onFullScreen={this.onFullScreen}    //当摄像机全屏的时候触发这个回调（例如：可以在摄像机全屏的时候隐藏系统状态栏）。
                    onRecoverScreen={this.onRecoverScreen}  //摄像机取消全屏的时候触发这个回调
                    onSizeChange={this.onInputViewSizeChange}  //输入组件尺寸变更时触发
                    onShowKeyboard={this.onShowKeyboard}  //
                    switchCameraMode={this.switchCameraMode}   //
                    closeCamera={this.onCloseCamera}   //关闭相机
                    showSelectAlbumBtn={true}   //设置选择相册按钮的可见性。
                    showRecordVideoBtn={false}   //设置视频录制按钮的可见性。
                    onClickSelectAlbum={this.onClickSelectAlbum}  //点击选择相册按钮触发
                    inputPadding={{left: 30, top: 10, right: 10, bottom: 10}}  //设置输入框内边距。
                    galleryScale={0.6}   //default = 0.5
                    compressionQuality={0.6}
                    customLayoutItems={{   //自定义 ChatInput 组件和布局。
                        left: ['emoji'],
                        right: ['send']
                        //bottom: ['voice','gallery','camera','emoji','send']
                    }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    sendCustomBtn: {},
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    inputView: {
        backgroundColor: 'green',
        width: window.width,
        height: 100,
    },
    btnStyle: {
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#3e83d7',
        borderRadius: 8,
        backgroundColor: '#3e83d7'
    },
    box: {
        marginTop: Global.window.top_height,
        width: Global.window.width,
    },

});

