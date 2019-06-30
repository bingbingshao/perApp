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
    AsyncStorage,
    RefreshControl,
    DeviceEventEmitter,
    Share
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ETTStatus from "../../compont/ETTStatus"
import Style from '../../css/Style';
import Global from '../../compont/Global';
import Loading from '../../compont/Loading';
import Video from 'react-native-video';
import Model from "../../model";
import {Toast} from 'teaset';
import {createRandomID} from "../../compont/Function";


export default class My extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login_id: '',
            loading: false,
            refreshing: false,
            variety: [
                {id: 'dynamic', name: '动态'},
                {id: 'article', name: '文章'},
                {id: 'video', name: '视频'}
            ],
            variety_id: 'dynamic',
            personal: '',
            myCollect: [],
            myPublish: [],
            myAttention: [],
            myFans: [],
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
        this.subscription = DeviceEventEmitter.addListener('save_edit', (data) => {
            this.setState({isLoading: true});
            this.start(data);
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

    select_variety = (id) => {  //选择分菜单显示的种类
        this.setState({  //重新设置选中的菜单种类
            variety_id: id,
            // loading: true,
        });
        // this.getData(id, this.state.login_id);
    };

    start = (login_id) => {
        /*
         *  数据获取初始函数
         */
        if (login_id == null || login_id == "") {
            //还原数据
            this.setState({
                personal: '',
                myCollect: [],
                myPublish: [],
                myAttention: [],
                myFans: [],
                loading: false,
            })
        } else {
            //获取个人信息
            this.myPersonal(login_id);
            //获取我的收藏
            this.myCollect(login_id);
            //获取我的关注
            this.myAttention(login_id);
            //获取我的粉丝
            this.myFans(login_id);
            //获取我的发布
            this.myPublish(login_id);
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
            // console.log('MyPersonal失败: ', json);
            Toast.show({
                text: "获取个人信息失败",
                position: 'center',
                duration: 2000,
            });
        });
    };

    myCollect = (login_id) => {
        /*
         * 获取我的收藏
         */
        let param = {'login_id': login_id};
        Model.myCollect(param, (json) => {
            // console.log("myCollect", json)
            this.setState({
                myCollect: json.retData,
                loading: false,
            })
        }, (json) => {
            // console.log('myCollect失败: ', json);
        });
    };

    myAttention = (login_id) => {
        /*
         * 获取我的收藏
         */
        let param = {'login_id': login_id};
        Model.myAttention(param, (json) => {
            // console.log("myAttention", json)
            this.setState({
                myAttention: json.retData,
                loading: false,
            })
        }, (json) => {
            // console.log('myAttention失败: ', json);
        });
    };

    myFans = (login_id) => {
        /*
         * 获取我的收藏
         */
        let param = {'login_id': login_id};
        Model.myFans(param, (json) => {
            // console.log("myFans", json)
            this.setState({
                myFans: json.retData,
                loading: false,
            })
        }, (json) => {
            // console.log('myFans失败: ', json);
        });
    };

    myPublish = (login_id) => {
        /*
         * 获取我的收藏
         */
        let param = {'login_id': login_id};
        Model.myPublish(param, (json) => {
            let tempData = json.retData;
            for (let data of tempData) {
                data.image = data.image.split('ΩΩ');
            }
            this.setState({
                myPublish: json.retData,
                loading: false,
            })
        }, (json) => {
            // console.log('myPublish失败: ', json);
        });
    };

    likes = (data, login_id) => {
        /*
         *  点赞和取消点赞自己数据
         */
        this.setState({loading: false});

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
            //重新获取数据
            this.myPublish(this.state.login_id);
        }, (json) => {
            // console.log('likes失败: ', json);
            Toast.show({
                text: "点赞失败",
                position: 'center',
                duration: 2000,
            });
        });
    };
    collect = (data, login_id) => {
        /*
         *  收藏或者取消收藏自己的数据
         */
        this.setState({loading: false});

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
            this.myPublish(this.state.login_id);
        }, (json) => {
            // console.log('collect失败: ', json);
            Toast.show({
                text: "收藏失败",
                position: 'center',
                duration: 2000,
            });
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
                    >
                        <View style={[Style.icon_1, Style.flexRowCenter]}>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight
                        underlayColor={'transparent'}
                    >
                        <View>
                            <Text style={[Style.barText, Style.font_1]}>我的</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight
                        underlayColor={'transparent'}
                        onPress={() => this.props.navigation.navigate('Setting')}
                    >
                        <View style={[Style.icon_1, Style.flexRowCenter]}>
                            <Feather name='settings' size={20} color={Global.colors.fontColor_2}/>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        )
    };

    _head = () => {
        return (
            <View style={[styles.text_1, Style.backgroundColor_1, Style.flexRowCenter, Style.shadow_1]}>
                <View style={[styles.headView, Style.flexColumnAround]}>
                    <View style={[Style.flexRowCenter]}>
                        <View style={[styles.text_3, Style.flexRowCenter, Style.shadow_3]}>
                            {
                                this.state.personal == '' ?
                                    <Image source={require('../../image/icon_head.png')} style={[styles.image_1]}/>
                                    :
                                    <Image source={{uri: this.state.personal.pic}} style={[styles.image_1]}/>
                            }

                        </View>
                        <TouchableHighlight
                            underlayColor={'transparent'}
                            onPress={() => this.jump('Personal', {
                                user_id: this.state.user_id
                            })}
                        >
                            <View style={[Style.flexColumnBetween1, styles.headText]}>
                                <Text style={{
                                    color: '#000',
                                    fontSize: 16,
                                    lineHeight: 30,
                                    marginBottom: 5,
                                    fontWeight: '500'
                                }}>{this.state.personal == '' ? '还没有登录' : this.state.personal.name}</Text>
                                <Text style={{color: '#555', fontSize: 14, lineHeight: 20, width: 200}}>
                                    {
                                        this.state.personal == '' ?
                                            '想照顾好您的主子吗, 来注册试一下吧...'
                                            :
                                            this.state.personal.motto.length > 80 ?
                                                this.state.personal.motto.slice(0, 80) + '...'
                                                :
                                                this.state.personal.motto

                                    }
                                </Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View style={[Style.flexRowAround, {width: Global.window.width * 0.9, marginTop: 30}]}>
                        <TouchableHighlight
                            underlayColor={'transparent'}
                            onPress={() => this.jump('Attention')}>
                            <View style={Style.flexColumnAround}>
                                <Text style={styles.font_1}>{this.state.myAttention.length}</Text>
                                <Text style={styles.font_2}>关注</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight
                            underlayColor={'transparent'}
                            onPress={() => this.jump('Fans')}>
                            <View style={Style.flexColumnAround}>
                                <Text style={styles.font_1}>{this.state.myFans.length}</Text>
                                <Text style={styles.font_2}>粉丝</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight
                            underlayColor={'transparent'}
                            onPress={() => this.jump('Collect')}>
                            <View style={Style.flexColumnAround}>
                                <Text style={styles.font_1}>{this.state.myCollect.length}</Text>
                                <Text style={styles.font_2}>收藏</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight
                            underlayColor={'transparent'}
                            onPress={() => this.jump('')}>
                            <View style={Style.flexColumnAround}>
                                <Text style={styles.font_1}>{this.state.myPublish.length}</Text>
                                <Text style={styles.font_2}>发布</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        )
    };


    _childMenu = () => {
        /*
         *  子菜单
         */
        return (
            <View style={[{width: Global.window.width, backgroundColor: '#fff', paddingBottom: 5}]}>
                <ScrollView
                    horizontal={true}
                >
                    <View style={[Style.flexRowAround, {width: Global.window.width, backgroundColor: 'transform'}]}>
                        {
                            this.state.variety.map((info, i) => {
                                if (this.state.variety_id === info.id) {
                                    return (
                                        <TouchableHighlight underlayColor={'transparent'}>
                                            <View style={[Style.flexRowCenter, {
                                                height: 30,
                                                borderBottomColor: '#7D26CD',
                                                borderBottomWidth: 1
                                            }]}>
                                                <Text style={[Style.color_4]}>{info.name}</Text>
                                            </View>
                                        </TouchableHighlight>
                                    )
                                } else {
                                    return (
                                        <TouchableHighlight underlayColor={'transparent'}
                                                            onPress={() => this.select_variety(info.id)}>
                                            <View style={[Style.flexRowCenter, {height: 30}]}>
                                                <Text style={[Style.color_2]}>{info.name}</Text>
                                            </View>
                                        </TouchableHighlight>
                                    )
                                }
                            })
                        }
                    </View>
                </ScrollView>
            </View>
        )
    };
    _DataList = () => {
        /*
         *   用于显示 个人发表的数据
         */
        return (
            <View style={{marginTop: 10}}>
                {this._childMenu()}
                {
                    this.state.login_id == '' ?
                        <View style={[styles.text_tip, Style.flexRowCenter]}>
                            <Text style={styles.font_tip}>
                                请先登录
                            </Text>
                        </View>
                        :
                        this.state.variety_id == 'dynamic' ? //登陆后显示动态页面数据
                            <View style={[Style.flexColumnStart, {width: Global.window.width}]}>
                                {
                                    this.state.myPublish.map((data, i) => {
                                        if (data.type == "0") {
                                            return (
                                                this._listDynamic(data)
                                            )
                                        }
                                    })
                                }
                                {this._bottomTip()}
                            </View>
                            :
                            this.state.variety_id == 'article' ?  //登陆后显示文章页面数据
                                <View style={[Style.flexColumnStart, {width: Global.window.width}]}>
                                    {
                                        this.state.myPublish.map((data, i) => {
                                            if (data.type == "1") {
                                                return (
                                                    this._listArticle(data)
                                                )
                                            }
                                        })
                                    }
                                    {this._bottomTip()}
                                </View>
                                :
                                <View style={[Style.flexColumnStart, {width: Global.window.width}]}>
                                    {
                                        this.state.myPublish.map((data, i) => {
                                            if (data.type == "2") {
                                                return (
                                                    this._listVideo(data)
                                                )
                                            }
                                        })
                                    }
                                    {this._bottomTip()}
                                </View>
                }
            </View>
        )
    };
    _listArticle = (data) => {
        /*
         *  显示用户发表的动态数据
         */
        return (
            <TouchableHighlight underlayColor={'transparent'}
                                onPress={() => this.jump('ArticleDetailsOld', {data_id: data.id})}>
                <View style={[styles.child_text, Style.shadow_2, Style.flexColumnStart]}>
                    <View style={[styles.article_title]}>
                        <Text style={[styles.article_title_font]}>{data.title}</Text>
                    </View>
                    <View>
                        <View style={[styles.article_contains]}>
                            <Text style={[styles.child_font_2]}>
                                {data.brief.length > 30 ? "     " + data.brief.slice(0, 30) + '...' : "     " + data.brief}
                            </Text>
                        </View>
                        <View style={[styles.article_title, Style.flexRowCenter]}>
                            <Image style={[styles.article_pic2]}
                                   source={{uri: data.image[0]}}/>
                        </View>
                    </View>
                    {this._list_bottom(data)}
                </View>
            </TouchableHighlight>
        )

    };
    _listDynamic = (data) => {
        /*
         *  显示用户发表的文章数据
         */
        return (
            <TouchableHighlight underlayColor={'transparent'}
                                onPress={() => this.jump("DynamicDetails", {data_id: data.id})}>
                <View style={[styles.child_text, Style.shadow_2, Style.flexColumnStart]}>
                    <View style={[styles.article_contains]}>
                        <Text
                            style={[styles.article_title_font]}>
                            {data.brief.length > 30 ? data.brief.slice(0, 30) + '...' : data.brief}
                        </Text>
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
                    {this._list_bottom(data)}
                </View>
            </TouchableHighlight>
        )
    };
    _listVideo = (data) => {
        /*
         *   显示用户发表的视频数据
         */
        return (
            <TouchableHighlight underlayColor={'transparent'}
                                onPress={() => this.jump('VideoDetails', {data_id: data.id})}>
                <View style={[styles.child_text, Style.shadow_2, Style.flexColumnStart]}>
                    <View style={[styles.article_title]}>
                        <Text style={[styles.article_title_font]}>{data.title}</Text>
                    </View>
                    <View>
                        <View style={[styles.article_contains]}>
                            <Text style={[styles.child_font_2]}>
                                {data.brief.length > 30 ? "     " + data.brief.slice(0, 30) + '...' : "     " + data.brief}
                            </Text>
                        </View>
                        <TouchableHighlight underlayColor={'transparent'}>
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
                        </TouchableHighlight>
                    </View>
                    {this._list_bottom(data)}
                </View>
            </TouchableHighlight>
        )
    };
    _list_bottom = (data) => {
        /*
         *   底部按钮
         */
        // console.log(data);
        return (
            <View style={[styles.article_title, Style.flexRowBetween, {marginTop: 10}]}>
                <View style={[Style.flexRowCenter]}>
                    <View style={[Style.flexRowCenter]}>
                        <Icon name={'eye'} size={22} color={Global.colors.fontColor_11}/>
                        <Text style={[styles.child_font_1, {paddingLeft: 2}]}>{data.reads}</Text>
                    </View>
                    <TouchableHighlight
                        underlayColor={'transparent'}
                        onPress={() => this.likes(data, this.state.login_id)}>
                        {
                            data.is_like == 0 ?
                                <View style={[Style.flexRowCenter, {marginLeft: 20}]}>
                                    <AntDesign name={'like2'} size={22} color={Global.colors.fontColor_11}/>
                                    <Text style={[styles.child_font_1, {paddingLeft: 2,}]}>{data.likes}</Text>
                                </View>
                                :
                                <View style={[Style.flexRowCenter, {marginLeft: 20}]}>
                                    <AntDesign name={'like2'} size={22} color={Global.colors.fontColor_2}/>
                                    <Text style={[styles.child_font_1, {
                                        paddingLeft: 2,
                                        color: Global.colors.fontColor_2
                                    }]}>{data.likes}</Text>
                                </View>
                        }
                    </TouchableHighlight>
                    <View style={[Style.flexRowCenter, {marginLeft: 20}]}>
                        <MaterialCommunityIcons name={'comment-text-outline'} size={22}
                                                color={Global.colors.fontColor_11}/>
                        <Text style={[styles.child_font_1, {paddingLeft: 2}]}>{data.comments}</Text>
                    </View>
                    <TouchableHighlight
                        underlayColor={'transparent'}
                        onPress={() => this.collect(data, this.state.login_id)}>
                        {
                            data.is_collect == 0 ?
                                <View style={[Style.flexRowCenter, {marginLeft: 20}]}>
                                    <AntDesign name={'staro'} size={22} color={Global.colors.fontColor_11}/>
                                    <Text style={[styles.child_font_1, {paddingLeft: 2,}]}>{data.collect}</Text>
                                </View>
                                :
                                <View style={[Style.flexRowCenter, {marginLeft: 20}]}>
                                    <AntDesign name={'staro'} size={22} color={Global.colors.fontColor_2}/>
                                    < Text style={[styles.child_font_1, {
                                        paddingLeft: 2,
                                        color: Global.colors.fontColor_2
                                    }]}>{data.collect}</Text>
                                </View>
                        }
                    </TouchableHighlight>
                </View>
                <TouchableHighlight underlayColor={'transparent'} onPress={() => this._share(data)}>
                    <View style={[styles.icon_1, Style.flexRowCenter]}>
                        <AntDesign name={'sharealt'} size={22} color={Global.colors.fontColor_11}/>
                    </View>
                </TouchableHighlight>
            </View>

        )
    };

    _bottomTip = () => {
        /*
         *   滚动面板到底提示
         */

        return (
            <View style={[Style.flexRowCenter, {width: Global.window.width, marginTop: 20}]}>
                <Text style={{color: Global.colors.fontColor_3, fontSize: 14, lineHeight: 25}}>没有更多数据啦！</Text>
            </View>
        )
    };

    _share = (data) => {
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
                    <View style={[Style.flexColumnCenter, {width: Global.window.width}]}>
                        {this._head()}
                        {this._DataList()}
                    </View>

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
        backgroundColor: Global.colors.fontColor_4,
    },
    contains_center: {
        width: Global.window.width,
        position: 'relative',
    },
    text_1: {
        width: Global.window.width - 10,
        height: Global.window.width * 0.45,
        marginTop: 4,
        borderRadius: 5,
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
        width: Global.window.width * 0.24,
        height: Global.window.width * 0.24,
        borderRadius: Global.window.width * 0.12,
        borderWidth: 1,
        borderColor: Global.colors.fontColor_3,
        borderStyle: 'solid',
    },
    image_1: {
        width: Global.window.width * 0.24,
        height: Global.window.width * 0.24,
        borderRadius: Global.window.width * 0.12,
    },
    headView: {
        width: Global.window.width * 0.9,
        height: Global.window.width * 0.4,
    },
    headText: {
        marginLeft: 30,
    },
    font_1: {
        color: Global.colors.fontColor_2,
        fontSize: 16,
        fontWeight: '500'
    },
    font_2: {
        color: Global.colors.fontColor_2,
        fontSize: 14,
        fontWeight: '500'
    },
    text_tip: {
        width: Global.window.width,
        height: 200,
    },
    font_tip: {
        color: '#888',
        fontSize: 18,
        fontWeight: '600'
    },

    ////
    child_text: {
        width: Global.window.width - 8,
        paddingTop: 15,
        paddingLeft: 15,
        paddingRight: 10,
        paddingBottom: 5,
        backgroundColor: Global.colors.fontColor_4,
        borderRadius: 5,
        marginTop: 10
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
    child_font_1: {
        color: Global.colors.fontColor_11,
        fontSize: 14,
    },
    child_font_2: {
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
    ////

    bottomBlack: {
        width: Global.window.width,
        height: 60 + Global.margin_bottom,
    },
});