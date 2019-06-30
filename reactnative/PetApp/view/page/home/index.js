/**
 * Created by bingPo on 2018/11/12.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View,
    TouchableHighlight,
    ScrollView,
    RefreshControl,
    AsyncStorage, DeviceEventEmitter,

} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Video from 'react-native-video';
import ETTStatus from "../../compont/ETTStatus"
import Style from '../../css/Style';
import Global from '../../compont/Global';
import Swiper from 'react-native-swiper'; //轮播图
import Loading from '../../compont/Loading';
import Model from '../../model';


export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login_id: '',
            loading: false,
            refreshing: false,
            image: [],
            videos: [],
            articles: [],
            dynamics: [],
        };

    }

    componentWillMount() {
        AsyncStorage.getItem('login_id').then(json => {  //获取存储的账户信息
            if (json != null) {
                this.setState({login_id: json});
            };
        });
    }

    componentDidMount() {
        /*
         *  触发提示事件
         */
        this.subscription = DeviceEventEmitter.addListener('login_success', (data) => {
            // this.setState({ login_id: data, isLoading: true });
            // this.start(data);
        });
        this.subscription = DeviceEventEmitter.addListener('logout', (data) => {
            // this.setState({ login_id: '', isLoading: true });
            // this.start(data);
        });
        this.subscription = DeviceEventEmitter.addListener('deleteData', (data) => {
            this.setState({login_id: data, isLoading: true});
            this.start();
        });

        this.start();
    }

    /*
     * 点击事件
     */
    jump = (name, data) => {
        /*
         *  页面跳转
         */
        // console.log(data)
        if (name == null) {
            // console.log("data", data.data);
            let type = data.data.type;
            if (type == 1) {
                /*
                 *  文章
                 */
                name = "ArticleDetailsOld";
            } else if (type == 0) {
                /*
                 *  动态
                 */
                name = "DynamicDetails";
            } else if (type == 2) {
                /*
                 *  视频
                 */
                name = "VideoDetails";
            }
            this.props.navigation.navigate(name, {data_id:data.data.id});
        } else {
            this.props.navigation.navigate(name, data);
        }
    };
    start = () => {
        /*
         *   页面初始化事件
         */
        this.banner();  //获取轮播图
        this.article(); // 获取精品文章
        this.video(); // 获取视频
        this.dynamic(); // 获取动态
    };
    banner = () => {
        /*
         *  获取
         */
        let param = {};
        Model.banner(param, (json) => {
            this.setState({
                image: json.retData
            })
            // console.log("image",this.state.image)
        }, (json) => {
            console.log('banner失败: ' + json);
        });
    };
    article = () => {
        //获取精品文章
        let param = {};
        Model.home_article(param, (json) => {
            // console.log("article_json", json)
            this.setState({
                articles: json.retData
            });
        }, (json) => {
            console.log('home_article失败: ' + json);
        });
    };
    video = () => {
        //获取视频
        let param = {};
        Model.home_video(param, (json) => {
            //console.log("video_json", json);
            this.setState({
                videos: json.retData
            });
        }, (json) => {
            console.log('home_video失败: ' + json);
        });
    };
    dynamic = () => {
        //获取动态
        let param = {};
        Model.home_dynamic(param, (json) => {
            //把字符串转化为数组
            let tempData = json.retData;
            for (let data of tempData) {
                data.image = data.image.split('ΩΩ');
            }
            // console.log("tempData", tempData);
            this.setState({
                dynamics: tempData
            });
        }, (json) => {
            console.log('home_dynamic失败: ' + json);
        });
    };

    //下拉刷新
    onRefresh = () => {
        /*
         *  下拉刷新从新获取数据
         */
        this.setState({refreshing: true});
        this.data_refresh = setTimeout(() => {
            this.setState({refreshing: false});
            this.start();
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
                    >
                        <View style={[Style.icon_1, Style.flexRowCenter, {marginLeft: 10}]}>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight
                        underlayColor={'transparent'}
                    >
                        <View>
                            <Text style={[Style.barText, Style.font_1]}>首页</Text>
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

    _banner = () => {
        /*
         *  轮播图
         */
        let h = Global.window.width * 0.5;
        if (this.state.image.length > 1) {
            return (
                <Swiper
                    height={h}
                    showsButtons={false}
                    removeClippedSubviews={false} //这个很主要啊，解决白屏问题
                    autoplay={true}
                    swipeEnabled={true}
                    horizontal={true}
                    showsPagination={true}
                    paginationStyle={styles.paginationStyle}
                    dotStyle={styles.dotStyle}
                    activeDotStyle={styles.activeDotStyle}
                >
                    {
                        this.state.image.map((image, i) => {
                            return (
                                <View style={[styles.text_1, Style.flexRowCenter, {height: h}]}>
                                    <View style={[Style.shadow_4, styles.image_1, Style.flexColumnStart]}>
                                        <Image source={{uri: image.url}} style={[styles.image_1, {height: h - 6}]}/>
                                    </View>
                                </View>
                            )
                        })
                    }
                </Swiper>
            )
        } else {
            return (
                <View style={[styles.text_1, Style.flexRowCenter, {height: h}]}>
                    <View style={[Style.shadow_4, styles.image_1, Style.flexColumnStart]}>
                        <Image source={{uri: 'http://111.231.141.185/pet/image/pet-banner-1.jpg'}}
                               style={[styles.image_1, {height: h - 6}]}/>
                    </View>
                </View>
            )
        }
    };

    _childMenu1 = (data, i) => {
        /*
         *  信息简介样式 带图片
         */
        // console.log(data);
        return (
            <TouchableHighlight
                underlayColor={'transparent'}
                onPress={() => this.jump(null, {data: data})}
            >
                <View style={[Style.flexColumnStart]}>
                    <View style={[styles.list_text1, Style.flexRowStart]}>
                        <View style={[styles.list_image, Style.flexRowCenter]}>
                            <Image style={[styles.image_2]}
                                   source={{uri: data.image}}/>
                        </View>
                        <View style={[styles.list_text2, Style.flexColumnBetween1]}>
                            <Text style={styles.font_3}>{data.title}</Text>
                            <Text
                                style={styles.font_4}>{data.brief.length > 28 ? data.brief.slice(0, 28) + '...' : data.brief}</Text>
                            <View style={[Style.flexRowBetween, {width: '96%'}]}>
                                <Text style={[styles.font_5]}>{data.publish_time}</Text>
                                <View style={Style.flexRowCenter}>
                                    <Icon name={'eye'} size={18} color={Global.colors.fontColor_5}
                                          style={{paddingRight: 5}}/>s
                                    <Text style={styles.font_5}>{data.reads}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.line_1}/>
                </View>
            </TouchableHighlight>
        )
    };

    _childMenu2 = (data, i) => {
        /*
         *  信息简介样式 没有图片
         */
        // console.log(data);
        return (
            <TouchableHighlight
                underlayColor={'transparent'}
                onPress={() => this.jump(null, {data: data})}
            >
                <View style={[Style.flexColumnStart]}>
                    <View style={[styles.list_text1, Style.flexRowEnd]}>
                        <View style={[styles.list_text3, Style.flexColumnBetween1]}>
                            <Text
                                style={[styles.font_4, {paddingLeft: 20}]}>{data.brief.length > 28 ? data.brief.slice(0, 28) + '...' : data.brief}</Text>
                            <View style={[Style.flexRowBetween, {width: '96%'}]}>
                                <Text style={[styles.font_5]}>{data.publish_time}</Text>
                                <View style={Style.flexRowCenter}>
                                    <Icon name={'eye'} size={18} color={Global.colors.fontColor_5}
                                          style={{paddingRight: 5}}/>
                                    <Text style={styles.font_5}>{data.reads}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.line_1}/>
                </View>
            </TouchableHighlight>
        )
    };

    _childMenu3 = (data, i) => {
        /*
         *  精彩视频
         */
        // console.log(data);
        return (
            <TouchableHighlight
                underlayColor={'transparent'}
                onPress={() => this.jump(null, {data: data})}
            >
                <View style={[Style.flexColumnStart]}>
                    <View style={[styles.list_text1, Style.flexRowStart]}>
                        <View style={[styles.list_image]}>
                            <Video
                                ref={(ref) => {
                                    this.player = ref
                                }}
                                style={[styles.image_2, {position: 'absolute', top: 0, letf: 0}]}
                                source={{uri: data.video}}
                                paused={true}//暂停
                                rate={1}//播放速度
                                volume={1}//音量
                                muted={false}//是否静音
                                repeat={true}//确定在到达结尾时是否重复播放视频
                                controls={false}//视频打开 是否显示控制
                                playInBackground={false}//后台是否继续播放
                                resizeMode={'cover'}//视频屏幕适配
                                //ignoreSilentSwitch={'inherit'}//控制iOS静默开关行为
                                allowsExternalPlayback={false}//指示播放器是否允许切换到AirPlay或HDMI等外部播放模式
                            />
                            <View
                                style={[styles.image_2, Style.flexRowCenter, {backgroundColor: Global.colors.fontColor_12}]}>
                                <Icon name={'play-circle-o'} size={38} color={Global.colors.fontColor_4}/>
                            </View>
                        </View>
                        <View style={[styles.list_text2, Style.flexColumnBetween1]}>
                            <Text style={styles.font_3}>{data.title}</Text>
                            <Text
                                style={styles.font_4}>{data.brief.length > 15 ? data.brief.slice(0, 15) + '...' : data.brief}</Text>
                            <View style={[Style.flexRowBetween, {width: '96%'}]}>
                                <Text style={[styles.font_5]}>{data.publish_time}</Text>
                                <View style={Style.flexRowCenter}>
                                    <Icon name={'eye'} size={18} color={Global.colors.fontColor_5}
                                          style={{paddingRight: 5}}/>
                                    <Text style={styles.font_5}>{data.reads}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.line_1}/>
                </View>
            </TouchableHighlight>
        )
    };

    _childMenu4 = (data, i) => {
        /*
         *  信息简介样式 带图片
         */
        // console.log(data);
        return (
            <TouchableHighlight
                underlayColor={'transparent'}
                onPress={() => this.jump(null, {data: data})}
            >
                <View style={[Style.flexColumnStart]}>
                    <View style={[styles.list_text1, Style.flexRowStart]}>
                        <View style={[styles.list_image, Style.flexRowCenter]}>
                            <Image style={[styles.image_2]}
                                   source={{uri: data.image[0]}}/>
                        </View>
                        <View style={[styles.list_text2, Style.flexColumnBetween1]}>
                            <Text
                                style={styles.font_4}>{data.brief.length > 28 ? data.brief.slice(0, 28) + '...' : data.brief}</Text>
                            <View style={[Style.flexRowBetween, {width: '96%'}]}>
                                <Text style={[styles.font_5]}>{data.publish_time}</Text>
                                <View style={Style.flexRowCenter}>
                                    <Icon name={'eye'} size={18} color={Global.colors.fontColor_5}
                                          style={{paddingRight: 5}}/>s
                                    <Text style={styles.font_5}>{data.reads}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.line_1}/>
                </View>
            </TouchableHighlight>
        )
    };

    _childMenu5 = (data, i) => {
        /*
         *  带视频的动态
         */
        // console.log(data);
        return (
            <TouchableHighlight
                underlayColor={'transparent'}
                onPress={() => this.jump(null, {data: data})}
            >
                <View style={[Style.flexColumnStart]}>
                    <View style={[styles.list_text1, Style.flexRowStart]}>
                        <View style={[styles.list_image]}>
                            <Video
                                ref={(ref) => {
                                    this.player = ref
                                }}
                                style={[styles.image_2, {position: 'absolute', top: 0, letf: 0}]}
                                source={{uri: data.video}}
                                paused={true}//暂停
                                rate={1}//播放速度
                                volume={1}//音量
                                muted={false}//是否静音
                                repeat={true}//确定在到达结尾时是否重复播放视频
                                controls={false}//视频打开 是否显示控制
                                playInBackground={false}//后台是否继续播放
                                resizeMode={'cover'}//视频屏幕适配
                                //ignoreSilentSwitch={'inherit'}//控制iOS静默开关行为
                                allowsExternalPlayback={false}//指示播放器是否允许切换到AirPlay或HDMI等外部播放模式
                            />
                            <View
                                style={[styles.image_2, Style.flexRowCenter, {backgroundColor: Global.colors.fontColor_12}]}>
                                <Icon name={'play-circle-o'} size={38} color={Global.colors.fontColor_4}/>
                            </View>
                        </View>
                        <View style={[styles.list_text2, Style.flexColumnBetween1]}>
                            <Text
                                style={styles.font_4}>{data.brief.length > 30 ? data.brief.slice(0, 30) + '...' : data.brief}</Text>
                            <View style={[Style.flexRowBetween, {width: '96%'}]}>
                                <Text style={[styles.font_5]}>{data.publish_time}</Text>
                                <View style={Style.flexRowCenter}>
                                    <Icon name={'eye'} size={18} color={Global.colors.fontColor_5}
                                          style={{paddingRight: 5}}/>
                                    <Text style={styles.font_5}>{data.reads}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.line_1}/>
                </View>
            </TouchableHighlight>
        )
    };

    _list1 = () => {
        /*
         *  目前命名---精品文章
         */
        return (
            <View style={[styles.list, Style.flexColumnStart, Style.shadow_2]}>
                <View style={[Style.flexRowBetween, styles.list_title]}>
                    <Text style={[styles.font_1]}>精品文章</Text>
                    <TouchableHighlight
                        underlayColor={'transparent'}
                        onPress={() => this.jump('More', {type: 'article'})}
                    >
                        <Text style={[styles.font_2]}>更多>></Text>
                    </TouchableHighlight>
                </View>
                {
                    this.state.articles.map((data, i) => {
                        return (
                            <View>
                                {this._childMenu1(data, i)}
                            </View>
                        )
                    })
                }
            </View>
        )
    };

    _list2 = () => {
        /*
         *  目前命名---热门动态
         */
        return (
            <View style={[styles.list, Style.flexColumnStart, Style.shadow_2]}>
                <View style={[Style.flexRowBetween, styles.list_title]}>
                    <Text style={[styles.font_1]}>热门动态</Text>
                    <TouchableHighlight
                        underlayColor={'transparent'}
                        onPress={() => this.jump('More', {type: 'dynamic'})}
                    >
                        <Text style={[styles.font_2]}>更多>></Text>
                    </TouchableHighlight>
                </View>
                {
                    this.state.dynamics.map((data, i) => {
                        if (data.image[0] != "") {
                            return (
                                <View>
                                    {this._childMenu4(data, i)}
                                </View>
                            )
                        } else {
                            if (data.video == "") {
                                return (
                                    <View>
                                        {this._childMenu2(data, i)}
                                    </View>
                                )
                            } else {
                                return (
                                    <View>
                                        {this._childMenu5(data, i)}
                                    </View>
                                )
                            }
                        }
                    })
                }
            </View>
        )
    };

    _list3 = () => {
        /*
         *  目前命名---精彩视频
         */
        return (
            <View style={[styles.list, Style.flexColumnStart, Style.shadow_2]}>
                <View style={[Style.flexRowBetween, styles.list_title]}>
                    <Text style={[styles.font_1]}>精彩视频</Text>
                    <TouchableHighlight
                        underlayColor={'transparent'}
                        onPress={() => this.jump('More', {type: 'video'})}
                    >
                        <Text style={[styles.font_2]}>更多>></Text>
                    </TouchableHighlight>
                </View>
                {
                    this.state.videos.map((data, i) => {
                        return (
                            <View>
                                {this._childMenu3(data, i)}
                            </View>
                        )
                    })
                }
            </View>
        )
    };

    _tip = () => {
        /*
         *  提示到底部了
         */
        return (
            <View style={[styles.tip_text, Style.flexRowCenter]}>
                <Text style={styles.tip_font}>别拉啦! 到底了 (≖`_̆′≖⑉) ...</Text>
            </View>
        )
    };


    render() {
        return (
            <View style={[styles.contains]}>
                {this._nav()}
                <ScrollView
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
                    <View
                        style={[Style.flexColumnCenter, {width: Global.window.width}]}
                    >
                        {this._banner()}
                        {this._list2()}
                        {this._list3()}
                        {this._list1()}
                    </View>

                    {/*<View style={Style.bottom_black}/>*/}
                    {this._tip()}
                </ScrollView>

                {
                    this.state.loading ?
                        <Loading/>
                        : null
                }

            </View>
        );
    }
}
const styles = StyleSheet.create({
    contains: {
        flex: 1,
        backgroundColor: Global.colors.fontColor_8,
    },
    paginationStyle: {
        bottom: 6,
    },
    dotStyle: {
        width: 22,
        height: 3,
        backgroundColor: '#fff',
        opacity: 0.4,
        borderRadius: 0,
    },
    activeDotStyle: {
        width: 22,
        height: 3,
        backgroundColor: '#fff',
        borderRadius: 0,
    },
    text_1: {
        marginTop: 1,
        width: Global.window.width,
    },
    list: {
        marginTop: 10,
        width: Global.window.width - 8,
        padding: 10,
        backgroundColor: Global.colors.fontColor_4,
        borderRadius: 8,
    },
    list_title: {
        width: Global.window.width - 8 - 20,
        marginLeft: 20,
        paddingLeft: 4,
        paddingRight: 6,
        height: 30,
        borderBottomWidth: 1,
        borderBottomColor: Global.colors.fontColor_9,
    },
    list_text1: {
        width: Global.window.width - 8,
        height: 100,
        marginTop: 8,
    },
    list_text2: {
        width: Global.window.width - 8 - 10 - 10 - 80 - 5,
        height: 100,
        paddingTop: 20,
    },
    list_text3: {
        width: Global.window.width - 8 - 10,
        height: 100,
        paddingTop: 20,
    },
    list_image: {
        marginLeft: 10,
        marginRight: 10,
        width: 80,
        height: 80,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: Global.colors.fontColor_9,
        position: 'relative'
    },
    image_1: {
        width: Global.window.width - 8,
        borderRadius: 5,
    },
    image_2: {
        width: 80,
        height: 80,
        borderRadius: 5,
    },
    video_modal_text: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 80,
        borderRadius: 1,
        height: 80,
        backgroundColor: 'transparent',
        zIndex: 10,
    },
    font_1: {
        color: Global.colors.fontColor_7,
        fontSize: 16,
    },
    font_2: {
        color: Global.colors.fontColor_5,
        fontSize: 12,
    },
    font_3: {
        color: Global.colors.fontColor_10,
        fontSize: 15,
        fontWeight: '600'
    },
    font_4: {
        color: Global.colors.fontColor_10,
        fontSize: 15,
        fontWeight: '300',
        paddingLeft: 10,
    },
    font_5: {
        color: Global.colors.fontColor_11,
        fontSize: 12,
    },
    line_1: {
        width: Global.window.width - 10 - 30,
        marginLeft: 30,
        height: 1,
        backgroundColor: Global.colors.fontColor_9
    },


    ///底部提示
    tip_text: {
        width: Global.window.width,
        height: 40,
    },
    tip_font: {
        fontSize: 12,
        color: '#555'
    },
});