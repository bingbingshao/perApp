/**
 * Created by bingPo on 2018/11/23.
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
    RefreshControl,
    Share, AsyncStorage, DeviceEventEmitter
} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Video from 'react-native-video';
import {Toast} from 'teaset';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import Style from '../../css/Style';
import ETTStatus from "../../compont/ETTStatus"
import Global from '../../compont/Global';
import {createRandomID} from '../../compont/Function';
import Hint from '../../compont/Hint';
import Loading from '../../compont/Loading';
import Model from "../../model";


export default class More extends Component {

    constructor(props) {
        super(props);
        this.state = {
            login_id: '',
            loading: false,
            refreshingL: false,
            title: '',
            type: '',
            articles: [],
            dynamics: [],
            videos: [],
        };

    }

    componentWillMount() {
        AsyncStorage.getItem('login_id').then(json => {  //获取存储的账户信息
            if (json != null) {
                this.setState({login_id: json});
                this.start(json);
            } else {
                this.start('');
            }
        });
    }

    componentDidMount() {
        /*
         *  触发提示事件
         */
        this.subscription = DeviceEventEmitter.addListener('login_success', (data) => {
            this.setState({login_id: data, isLoading: true});
            this.start(data);
        });
        this.subscription = DeviceEventEmitter.addListener('logout', (data) => {
            this.setState({login_id: '', isLoading: true});
            this.start(data);
        });
        this.subscription = DeviceEventEmitter.addListener('deleteData', (data) => {
            this.setState({login_id: data, isLoading: true});
            this.start(data);
        });

    }

    /*
     * 事件处理
     */
    start = (login_id) => {
        /*
         *  更改标题名
         */
        let type = this.props.navigation.state.params.type;
        /*
         * 初始化选中参数
         */
        this.setState({type: type});
        switch (type) {
            case 'article':
                this.setState({title: '精品文章'});
                this.article(login_id);
                break;
            case 'dynamic':
                this.setState({title: '热门动态'});
                this.dynamic(login_id);
                break;
            case 'video':
                this.setState({title: '精彩视频'});
                this.video(login_id);
                break;
        }
    };
    article = (login_id) => {
        //获取精品文章
        let param = {'login_id': login_id};
        Model.more_article(param, (json) => {
            // console.log("article_json", json)
            this.setState({
                articles: json.retData,
                loading: false
            });
        }, (json) => {
            console.log('more_article失败: ', json);
        });
    };
    video = (login_id) => {
        //获取视频
        let param = {'login_id': login_id};
        Model.more_video(param, (json) => {
            //console.log("video_json", json);
            this.setState({
                videos: json.retData,
                loading: false
            });
        }, (json) => {
            console.log('home_video失败: ', json);
        });
    };
    dynamic = (login_id) => {
        //获取动态
        let param = {'login_id': login_id};
        Model.more_dynamic(param, (json) => {
            //把字符串转化为数组
            let tempData = json.retData;
            for (let data of tempData) {
                data.image = data.image.split('ΩΩ');
            }
            // console.log("tempData", tempData);
            this.setState({
                dynamics: tempData,
                loading: false
            });
        }, (json) => {
            console.log('home_dynamic失败: ', json);
        });
    };


    likes = (login_id, data) => {
        /*
         *  作品点赞和取消点赞
         */
        if (login_id == "") { // 没有登录
            Toast.show({
                text: "请先登录",
                position: 'center',
                duration: 2000,
            });
        } else {
            let likes_id = createRandomID();
            let data_id = data.id;
            let type = data.type;
            // login_id = 13381765961;
            let param = {'likes_id': likes_id, 'data_id': data_id, 'login_id': login_id, 'type': type};
            Model.likes(param, (json) => {
                //提示点赞或取消点赞成功
                Toast.show({
                    text: json.msg,
                    position: 'center',
                    duration: 2000,
                });
                //重新刷新页面
                this.start(login_id);
            }, (json) => {
                console.log('likes失败: ', json);
                Toast.show({
                    text: "点赞失败",
                    position: 'center',
                    duration: 2000,
                });
            });
        }
    };
    collects = (login_id, data) => {
        /*
         *  作品收藏和取消收藏
         */
        if (login_id == "") { // 没有登录
            Toast.show({
                text: "请先登录",
                position: 'center',
                duration: 2000,
            });
        } else {
            let collect_id = createRandomID();
            let data_id = data.id;
            let type = data.type;
            // login_id = 13381765961;
            let param = {'collect_id': collect_id, 'data_id': data_id, 'login_id': login_id, 'type': type};
            Model.collect(param, (json) => {
                //提示收藏和取消收藏成功
                Toast.show({
                    text: json.msg,
                    position: 'center',
                    duration: 2000,
                });
                //重新刷新页面
                this.start(login_id);
            }, (json) => {
                console.log('collect失败: ', json);
                Toast.show({
                    text: "收藏失败",
                    position: 'center',
                    duration: 2000,
                });
            });
        }

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
            this.setState({refreshing: false, loading: true});
            this.start(this.state.login_id);
            clearTimeout(this.data_refresh);
        }, 2000);
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
                            <Text style={[Style.barText, Style.font_1]}>{this.state.title}</Text>
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
         *  内容列表
         */
        switch (this.state.type) {
            case 'article':
                return (
                    <View style={[Style.flexColumnStart, {width: Global.window.width}]}>
                        {
                            this.state.articles.map((data, i) => {
                                return (this._childList1(data, i))
                            })
                        }
                    </View>
                );
                break;
            case 'dynamic':
                return (
                    <View style={[Style.flexColumnStart, {width: Global.window.width}]}>
                        {
                            this.state.dynamics.map((data, i) => {
                                return (this._childList2(data, i))
                            })
                        }
                    </View>
                );
                break;
            case 'video':
                return (
                    <View style={[Style.flexColumnStart, {width: Global.window.width}]}>
                        {
                            this.state.videos.map((data, i) => {
                                return (this._childList3(data, i))
                            })
                        }
                    </View>
                );
                break;
        }

    };

    _childList1 = (data, i) => {
        /*
         *  布局模式一
         *  文章布局
         */
        // console.log(data);
        return (
            <TouchableHighlight underlayColor={'transparent'}
                                onPress={() => this.jump('ArticleDetailsOld', {data_id: data.id})}>
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
                                   source={{uri: data.image}}/>
                        </View>
                    </View>
                    {this._list_bottom(data, i)}
                </View>
            </TouchableHighlight>
        )
    };

    _childList2 = (data, i) => {
        /*
         *  布局模式一
         *  动态布局
         */
        // console.log("data", data);
        return (
            <TouchableHighlight underlayColor={'transparent'}
                                onPress={() => this.jump("DynamicDetails", {data_id: data.id})}>
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
                    {this._list_bottom(data, i)}
                </View>
            </TouchableHighlight>
        )
    };

    _childList3 = (data, i) => {
        /*
         *  布局模式一
         *  视频布局
         */
        // console.log(data);
        return (
            <TouchableHighlight underlayColor={'transparent'}
                                onPress={() => this.jump('VideoDetails', {data_id: data.id})}>
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
                    {this._list_bottom(data, i)}
                </View>
            </TouchableHighlight>
        )
    };

    _list_bottom = (data, i) => {
        /*
         *   底部按钮
         */
        // console.log(data);
        return (
            <View style={[styles.article_title, Style.flexRowBetween, {marginTop: 10}]}>
                <View style={[Style.flexRowCenter]}>
                    <TouchableHighlight underlayColor={'transparent'}>
                        <View style={[Style.flexRowCenter]}>
                            <Icon name={'eye'} size={22} color={Global.colors.fontColor_11}/>
                            <Text style={[styles.font_1, {paddingLeft: 2}]}>{data.reads}</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor={'transparent'}
                                        onPress={() => this.likes(this.state.login_id, data)}>
                        {
                            data.is_like == 0 ?
                                <View style={[Style.flexRowCenter, {marginLeft: 20}]}>

                                    <AntDesign name={'like2'} size={22} color={Global.colors.fontColor_11}/>
                                    <Text style={[styles.font_1, {paddingLeft: 2,}]}>{data.likes}</Text>
                                </View>
                                :
                                <View style={[Style.flexRowCenter, {marginLeft: 20}]}>
                                    <AntDesign name={'like2'} size={22} color={Global.colors.fontColor_2}/>
                                    <Text style={[styles.font_1, {
                                        paddingLeft: 2,
                                        color: Global.colors.fontColor_2
                                    }]}>{data.likes}</Text>
                                </View>
                        }
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor={'transparent'}>
                        <View style={[Style.flexRowCenter, {marginLeft: 20}]}>
                            <MaterialCommunityIcons name={'comment-text-outline'} size={22}
                                                    color={Global.colors.fontColor_11}/>
                            <Text style={[styles.font_1, {paddingLeft: 2}]}>{data.comments}</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor={'transparent'}
                                        onPress={() => this.collects(this.state.login_id, data)}>
                        {
                            data.is_collect == 0 ?
                                <View style={[Style.flexRowCenter, {marginLeft: 20}]}>

                                    <AntDesign name={'staro'} size={22} color={Global.colors.fontColor_11}/>
                                    <Text style={[styles.font_1, {paddingLeft: 2,}]}>{data.collect}</Text>
                                </View>
                                :
                                <View style={[Style.flexRowCenter, {marginLeft: 20}]}>
                                    <AntDesign name={'staro'} size={22} color={Global.colors.fontColor_2}/>
                                    <Text
                                        style={[styles.font_1, {
                                            paddingLeft: 2,
                                            color: Global.colors.fontColor_2
                                        }]}>{data.collect}</Text>
                                </View>
                        }
                    </TouchableHighlight>
                </View>
                <TouchableHighlight underlayColor={'transparent'} onPress={() => this._share()}>
                    <View style={[styles.icon_1, Style.flexRowCenter]}>
                        <AntDesign name={'sharealt'} size={22} color={Global.colors.fontColor_11}/>
                    </View>
                </TouchableHighlight>
            </View>

        )
    };

    _share = () => {
        /*
         *  分享
         */
        Share.share({
            message: '海量资讯实时掌握，尽在雷登娱乐',
            url: 'itms-apps://itunes.apple.com/WebObjects/MZStore.woa/wa/viewSoftware?id=1447594369',
            title: '雷登娱乐'
        }, {
            dialogTitle: '雷登娱乐',
            excludedActivityTypes: ['com.apple.UIKit.activity.PostToTwitter'],
            tintColor: 'green'
        })
            .then(this._showResult)
            .catch((error) => this.setState({result: 'error: ' + error.message}));
    };

    render() {
        return (
            <View style={[styles.contains, Style.backgroundColor_5]}>
                {this._nav()}
                <ScrollView
                    style={{paddingTop: 5,}}
                    showsVerticalScrollIndicator={false}
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

                    <View style={Style.bottom_black}/>
                </ScrollView>
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
