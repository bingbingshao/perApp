/**
 * Created by bingPo on 2018/11/21.
 *
 * 我的收藏
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
    Image, RefreshControl, AsyncStorage
} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Style from '../../css/Style';
import ETTStatus from "../../compont/ETTStatus"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import Global from '../../compont/Global';
import Loading from '../../compont/Loading';
import Model from "../../model";
import {Toast} from "teaset";
import Video from 'react-native-video';


export default class Collect extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            refreshing: false,
            login_id: '',
            collect: [],
        }
    }

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
         *  获取 我的关注
         */
        let param = {'login_id': login_id};
        Model.myCollect(param, (json) => {
            console.log('json', json);
            let tempData = json.retData;
            for (let data of tempData) {
                data.image = data.image.split('ΩΩ');
            }
            this.setState({
                loading: false,
                collect: tempData
            })
        }, (json) => {
            console.log('collect失败: ', json);
            Toast.show({
                text: "获取我的收藏失败",
                position: 'center',
                duration: 2000,
            });
        });
    };

    jump = (name, data) => {
        /*
         *  页面跳转
         */
        this.props.navigation.navigate(name, data);
    };

    //下拉刷新
    onRefresh = () => {
        /*
         *  下拉刷新从新获取数据
         */
        this.setState({refreshing: true});
        this.data_refresh = setTimeout(() => {
            this.setState({refreshing: false});
            this.start(this.state.login_id);
            clearTimeout(this.data_refresh);
        }, 2000);
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
                            <Text style={[Style.barText, Style.font_1]}>我的收藏</Text>
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
         *  我的收藏视图列表
         */
        let collect = this.state.collect;

        return (
            <View style={Style.flexColumnCenter}>
                {
                    collect.map((data, i) => {
                        if (data.type == 0) {
                            /*
                             *   动态
                             */
                            return (
                                <View>
                                    {this._listDynamic(data)}
                                </View>
                            )
                        } else if (data.type == 1) {
                            /*
                             *   文章
                             */
                            return (
                                <View>
                                    {this._listArticle(data)}
                                </View>
                            )
                        } else {
                            /*
                             *   视频
                             */
                            return (
                                <View>
                                    {this._listVideo(data)}
                                </View>
                            )
                        }
                    })
                }
            </View>
        )
    };

    _listDynamic = (data) => {
        /*
         *  动态视图
         */
        return (
            <TouchableHighlight underlayColor={'transparent'}
                                onPress={() => this.jump("DynamicDetails", {data_id: data.data_id})}>
                <View style={[styles.text_1, Style.shadow_2, Style.flexColumnStart]}>
                    <View style={[styles.article_contains]}>
                        <Text
                            style={[styles.article_title_font]}>{data.brief.length > 30 ? data.brief.slice(0, 30) + '...' : data.brief}</Text>
                    </View>
                    <View style={[Style.flexRowCenter]}>
                        {
                            data.dynamic_type == 2 ? //视频动态
                                <TouchableHighlight underlayColor={'transparent'}>
                                    <View>
                                        <Video
                                            ref={(ref) => {
                                                this.player = ref
                                            }}
                                            style={[styles.videoBox]}
                                            source={{uri: data.video}}
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
                                </TouchableHighlight>
                                :  //图文动态
                                data.image[0] == "" ? //纯文字的动态
                                    <View></View>
                                    :  //图文动态
                                    data.image.length == 1 ?  //一张图片动态
                                        <Image style={[styles.article_pic2]}
                                               source={{uri: data.image[0]}}/>
                                        :  //多张图动态
                                        <View style={[styles.article_text1, Style.flexRowWarp]}>
                                            {
                                                data.image.map((list, j) => {
                                                    if (j < 6) {
                                                        return (
                                                            <Image style={[styles.article_pic1]}
                                                                   source={{uri: list}}/>
                                                        )
                                                    }
                                                })
                                            }
                                        </View>
                        }
                    </View>
                    <View style={styles.article_title}>
                        <Text style={styles.font_3}>{data.publish_time}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        )
    };
    _listArticle = (data) => {
        /*
         *  文章视图
         */
        return (
            <TouchableHighlight underlayColor={'transparent'}
                                onPress={() => this.jump('ArticleDetailsOld', {data_id: data.data_id})}>
                <View style={[styles.text_1, Style.shadow_2, Style.flexColumnStart]}>
                    <View style={[styles.article_title]}>
                        <Text style={[styles.article_title_font]}>{"    " + data.title}</Text>
                    </View>
                    <View>
                        <View style={[styles.article_contains]}>
                            <Text style={[styles.font_2]}>
                                {data.brief.length > 30 ? "     " + data.brief.slice(0, 30) + '...' : "     " + data.brief}
                            </Text>
                        </View>
                        <View style={[styles.article_title, Style.flexRowCenter]}>
                            <Image style={[styles.article_pic2]}
                                   source={{uri: data.image[0]}}/>
                        </View>
                    </View>
                    <View style={styles.article_title}>
                        <Text style={styles.font_3}>{data.publish_time}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        )
    };
    _listVideo = (data) => {
        /*
         *  视频视图
         */
        return (
            <TouchableHighlight underlayColor={'transparent'}
                                onPress={() => this.jump('VideoDetails', {data_id: data.data_id})}>
                <View style={[styles.text_1, Style.shadow_2, Style.flexColumnStart]}>
                    <View style={[styles.article_title]}>
                        <Text style={[styles.article_title_font]}>{"    " + data.title}</Text>
                    </View>
                    <View>
                        <View style={[styles.article_contains]}>
                            <Text style={[styles.font_2]}>
                                {data.brief.length > 30 ? "     " + data.brief.slice(0, 30) + '...' : "     " + data.brief}
                            </Text>
                        </View>
                        <View style={[styles.article_title, Style.flexRowCenter]}>
                            <Video
                                ref={(ref) => {
                                    this.player = ref
                                }}
                                style={[styles.videoBox]}
                                source={{uri: data.video}}
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
                    </View>
                    <View style={styles.article_title}>
                        <Text style={styles.font_3}>{data.publish_time}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        )
    };


    _bottomTip = () => {
        /*
         *   滚动面板到底提示
         */

        return (
            <View style={[Style.flexRowCenter, {width: Global.window.width, marginTop: 20, marginBottom: 20}]}>
                <Text style={{color: Global.colors.fontColor_3, fontSize: 14, lineHeight: 25}}>没有更多数据啦！</Text>
            </View>
        )
    };

    render() {

        return (
            <View style={[styles.contains, Style.backgroundColor_5]}>
                {this._nav()}
                <ScrollView
                    keyboardDismissMode='on-drag'
                    // showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh}
                            tintColor='#333'
                            title={this.state.refreshing ? '刷新中' : '刷新成功'}
                            titleColor='#333'
                            colors='#333'
                            progressBackgroundColor='#fff'/>
                    }
                    scrollEventThrottle={50}>
                    >
                    {this._list()}
                    {this._bottomTip()}
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
        width: Global.window.width - 8,
        paddingTop: 15,
        paddingLeft: 15,
        paddingRight: 10,
        paddingBottom: 5,
        backgroundColor: Global.colors.fontColor_4,
        borderRadius: 5,
        marginBottom: 10
    },
    article_title: {
        width: Global.window.width - 8 - 15 - 10,
        marginBottom: 6,
    },
    article_contains: {
        width: Global.window.width - 8 - 15 - 10 - 20,
        marginBottom: 6,
        marginTop: 10,
    },
    article_video: {
        width: Global.window.width - 8 - 15 - 10 - 20,
        marginBottom: 6,
        marginTop: 10,
        height: 150,
        position: 'relative'
    },
    article_title_font: {
        lineHeight: 25,
        fontSize: 17,
        color: Global.colors.fontColor_7,
        fontWeight: '600'
    },
    article_text1: {
        width: Global.window.width - 8 - 15 - 10 - 30,
    },
    article_pic1: {
        width: (Global.window.width - 8 - 15 - 10 - 30) / 3 - 10,
        height: (Global.window.width - 8 - 15 - 10 - 30) / 3 - 10,
        borderRadius: 5,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 3,
        marginBottom: 3,
    },
    article_pic2: {
        width: Global.window.width - 8 - 15 - 10 - 20,
        height: 130,
        borderRadius: 5,
        marginTop: 3,
        marginBottom: 3,
    },
    icon_1: {
        width: 40,
        height: 30,
    },
    font_1: {
        color: Global.colors.fontColor_11,
        fontSize: 14,
    },
    font_2: {
        color: Global.colors.fontColor_10,
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 18,
    },
    font_3: {
        color: '#555',
        fontSize: 14,
        fontWeight: '300',
        lineHeight: 30,
    },
    // video
    videoBar: {
        width: Global.window.width,
        height: 211,
        backgroundColor: '#acacac',
    },
    videoBox: {
        width: Global.window.width - 8 - 15 - 10,
        height: 200,
    },

});
