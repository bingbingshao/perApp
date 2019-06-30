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
    Modal, AsyncStorage, RefreshControl, DeviceEventEmitter
} from 'react-native';
import Video from 'react-native-video';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ETTStatus from "../../compont/ETTStatus"
import Style from '../../css/Style';
import Global from '../../compont/Global';
import Hint from '../../compont/Hint';
import Loading from '../../compont/Loading';
import Model from "../../model";
import {Toast} from "teaset";
import {createRandomID} from "../../compont/Function";


export default class Community extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            refreshing: false,
            login_id: '',
            variety: [
                {id: 'find', name: '发现'},
                {id: 'attention', name: '关注'}
            ],
            variety_id: 'find',
            listData: "",
            listDataHeight: '',
            modal_publish: false,
        };
    }


    componentWillMount() {
        AsyncStorage.getItem('login_id').then(json => {  //获取存储的账户信息
            if (json != null) {
                this.setState({login_id: json});
                this.getData(this.state.variety_id, json);
            } else {
                this.setState({login_id: ''});
                this.getData(this.state.variety_id, '');
            }
        });
    }
    componentDidMount() {
        /*
         *  触发提示事件
         */
        this.subscription = DeviceEventEmitter.addListener('login_success', (data) => {
            this.setState({login_id: data, isLoading: true});
            this.getData(this.state.variety_id,data);
        });
        this.subscription = DeviceEventEmitter.addListener('logout', (data) => {
            this.setState({login_id: '', isLoading: true});
            this.getData(this.state.variety_id,data);
        });
        this.subscription = DeviceEventEmitter.addListener('deleteData', (data) => {
            this.setState({login_id: data, isLoading: true});
            this.getData(this.state.variety_id,data);
        });
        this.subscription = DeviceEventEmitter.addListener('dyanmic_success', (data) => {
            this.setState({login_id: data, isLoading: true,variety_id:'attention'});
            this.getData('attention',data);
        });

    }

    /*
     * 事件处理
     */
    getData = (variety_id, login_id) => {
        /*
         *  获取数据
         */
        if (variety_id == 'find') {  //子菜单是'发现'
            //获取精品文章
            let param = {'login_id': login_id};
            Model.community_find(param, (json) => {
                // console.log("community_find", json)
                if (json.code == 1) {
                    //获取失败
                    Toast.show({
                        text: json.msg,
                        position: 'center',
                        duration: 2000,
                    });
                    this.setState({
                        loading: false,
                        listData: ""
                    });
                } else {
                    //把字符串转化为数组
                    let tempData = json.retData;
                    for (let data of tempData) {
                        data.image = data.image.split('ΩΩ');
                    }
                    this.modificationHeight(tempData);
                    this.setState({
                        loading: false,
                        listData: tempData
                    });
                }
            }, (json) => {
                console.log('community_find失败: ' + json);
                Toast.show({
                    text: "网络连接失败",
                    position: 'center',
                    duration: 2000,
                });
                this.setState({
                    loading: false,
                    listData: ""
                });
            });
        } else if (variety_id == 'attention') {  // 子菜单是'关注'
            //获取精品文章
            let param = {'login_id': login_id};
            if (login_id == "") {
                Toast.show({
                    text: "还没有登录哦",
                    position: 'center',
                    duration: 2000,
                });
                this.setState({
                    loading: false,
                    listData: ""
                });
            } else {
                Model.community_attention(param, (json) => {
                    console.log("community_attention", json)
                    if (json.code == 1) {
                        //获取失败
                        Toast.show({
                            text: json.msg,
                            position: 'center',
                            duration: 2000,
                        });
                        this.setState({
                            loading: false,
                            listData: ""
                        });
                    } else {
                        // 把字符串转化为数组
                        let tempData = json.retData;
                        for (let data of tempData) {
                            data.image = data.image.split('ΩΩ');
                        }
                        this.modificationHeight(tempData);
                        this.setState({
                            loading: false,
                            listData: tempData
                        })
                    }

                }, (json) => {
                    console.log('community_attention失败: ' + json);
                    Toast.show({
                        text: "获取数据失败，请重新获取。",
                        position: 'center',
                        duration: 2000,
                    });
                    this.setState({
                        loading: false,
                        listData: ""
                    });
                });
            }
        }
    };

    modificationHeight = (listData) => {
        /*
         *  图片加载完成显示
         *  计算图片的大小
         */
        let temp_heights = {};
        listData.map((data, i) => {
            if (data.type != 'video') {
                if (data.image.length > 0) {
                    Image.getSize(data.image[0],
                        (width, height) => {
                            let temp_height = (Global.window.width / 2 - 20) * height / width;
                            // //console.log("temp_height", temp_height);
                            temp_heights[i] = temp_height;
                            this.setState({listDataHeight: temp_heights});
                        },
                        (json) => {
                            // //console.log("error", json)
                        }
                    );
                } else {
                    temp_heights[i] = 0;
                    this.setState({listDataHeight: temp_heights});
                }
            }
        })
    };

    jump = (name, data) => {
        /*
         *  页面跳转事件
         */
        // alert(name)
        if (name == 'Details') {
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
        }
        this.props.navigation.navigate(name, data);
    };
    gotoPersonal = (user_id) => {
        /*
         *  进入其他用户主页
         */
        if(user_id != this.state.login_id)
            this.props.navigation.navigate('OtherPersonal', {user_id: user_id,login_id:this.state.login_id})
    };

    select_variety = (id) => {  //选择分菜单显示的种类
        this.setState({  //重新设置选中的菜单种类
            variety_id: id,
            loading: true,
        });
        this.getData(id, this.state.login_id);
    };

    publish_means = (type) => {
        /*
         *  选择发布的动态类型
         */
        this.setState({modal_publish: false})
        if (type == 'image') {
            //图文
            this.jump('PublishDynamicImage', {})
        } else {
            //视频
            this.jump('PublishDynamicVideo', {})
        }

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
                // console.log('json',json)
                Toast.show({
                    text: json.msg,
                    position: 'center',
                    duration: 2000,
                });
                //重新刷新页面
                this.getData(this.state.variety_id, this.state.login_id);
            }, (json) => {
                console.log('likes失败: ', json);
            });
        }
    };

    //下拉刷新
    onRefresh = () => {
        /*
         *  下拉刷新从新获取数据
         */
        this.setState({refreshing: true});
        this.data_refresh = setTimeout(() => {
            this.setState({refreshing: false});
            this.getData(this.state.variety_id, this.state.login_id);
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
                            <Text style={[Style.barText, Style.font_1]}>社区</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight
                        underlayColor={'transparent'}
                        onPress={() => {
                            this.setState({modal_publish: true})
                        }}
                    >
                        <View style={[Style.icon_1, Style.flexRowCenter, {marginRight: 0}]}>
                            <AntDesign name={'pluscircleo'} size={18} color={Global.colors.fontColor_1}/>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        )
    };

    _childMenu = () => {
        /*
         *  子菜单
         */
        return (
            <View style={[{width: Global.window.width}]}>
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

    _list = () => {
        /*
         *  列表
         */
        // //console.log("listDataHeight", this.state.listDataHeight)
        return (
            <View style={[Style.flexRowAround_start, {
                width: Global.window.width - 10,
                marginTop: 5,
                marginLeft: 5,
                marginRight: 5,
            }]}>
                <View style={[styles.text_1, Style.flexColumnStart]}>
                    {
                        this.state.listData == "" ?
                            <View/>
                            :
                            this.state.listData.map((data, i) => {
                                if (i % 2 == 0) {
                                    return (
                                        <View>
                                            {
                                                this._listChild(data, i)
                                            }
                                        </View>
                                    )
                                }
                            })
                    }
                </View>
                <View style={[styles.text_1, Style.flexColumnStart]}>
                    {
                        this.state.listData == "" ?
                            <View>

                            </View>
                            :
                            this.state.listData.map((data, i) => {
                                if (i % 2 == 0) {
                                } else {
                                    return (
                                        <View>
                                            {
                                                this._listChild(data, i)
                                            }
                                        </View>
                                    )
                                }
                            })
                    }
                </View>
            </View>
        )
    };

    _videoView = (uri) => {
        /*
         *  视频显示
         */
        return (
            <View style={styles.video_modal}>
                <Video
                    ref={(ref) => {
                        this.player = ref
                    }}
                    style={styles.video_1}
                    source={{uri: uri}}
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
                <View style={styles.video_modal_text}/>
            </View>
        )

    };

    _articleView = (uri, i) => {
        /*
         *  文章
         */
        return (
            <Image
                style={[styles.image_1, {height: this.state.listDataHeight[i]}]}
                source={{uri: uri}}/>
        )
    };
    _dynamicView = (uri, i) => {
        /*
         *  动态
         */
        return (
            <Image
                style={[styles.image_1, {height: this.state.listDataHeight[i]}]}
                source={{uri: uri}}/>
        )
    };

    _listChild = (data, i) => {
        /*
         *
         */
        return (
            <TouchableHighlight
                underlayColor={'transparent'}
                onPress={() => this.jump('Details', {data: data})}>
                <View style={[styles.text_2, Style.shadow_2, Style.flexColumnStart_start]}>
                    {
                        data.type == 2 ?
                            this._videoView(data.video)
                            :
                            data.type == 1 ?
                                this._articleView(data.image[0], i)
                                :
                                this._dynamicView(data.image[0], i)
                    }
                    <Text style={[styles.font_1, {
                        color: '#555',
                        fontSize: 14,
                        paddingLeft: 2
                    }]}>{data.brief.length > 20 ? "   " + data.brief.slice(0, 20) + '..' : "   " + data.brief}</Text>
                    <View style={[styles.text_3, Style.flexRowBetween]}>
                        <TouchableHighlight
                            underlayColor={'transparent'}
                            onPress={() => this.gotoPersonal(data.user_id)}>
                            <View style={[Style.flexRowCenter]}>
                                <Image style={[styles.image_2]} source={{uri: data.user_pic}}/>
                                <Text
                                    style={styles.font_2}>{data.user_name.length > 5 ? data.user_name.slice(0, 5) + '..' : data.user_name}</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight
                            underlayColor={'transparent'}
                            onPress={() => this.likes(this.state.login_id, data)}>
                            {
                                data.is_like == 0 ?
                                    <View style={[Style.flexRowCenter]}>
                                        <AntDesign name={'like2'} size={16} color={'#aaa'}/>
                                        <Text style={styles.font_3}>{data.likes}</Text>
                                    </View>
                                    :
                                    <View style={[Style.flexRowCenter]}>
                                        <AntDesign name={'like2'} size={16} color={Global.colors.fontColor_1}/>
                                        <Text
                                            style={[styles.font_3, {color: Global.colors.fontColor_1}]}>{data.likes}</Text>
                                    </View>
                            }
                        </TouchableHighlight>
                    </View>
                </View>
            </TouchableHighlight>
        )
    };

    _modalPublish = () => {
        /*
         *  显示发布动态的分类
         */
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.modal_publish}
            >
                <TouchableHighlight
                    style={[styles.modal_text_1]}
                    underlayColor={'transparent'}
                    onPress={() => this.setState({modal_publish: false})}>
                    <View style={[styles.modal_text_2, Style.flexColumnCenter]}>
                        <View style={styles.modal_text_triangle}></View>
                        <TouchableHighlight
                            underlayColor={'transparent'}
                            onPress={() => this.publish_means('image')}>
                            <View style={[styles.modal_text_3, Style.flexRowCenter]}>
                                <Text style={styles.modal_text_font}>图文动态</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight
                            onPress={() => this.publish_means('video')}>
                            <View style={[styles.modal_text_3, Style.flexRowCenter]}>
                                <Text style={styles.modal_text_font}>视频动态</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                </TouchableHighlight>
            </Modal>
        )
    };

    render() {
        return (
            <View style={[styles.contains]}>
                {this._nav()}
                {this._childMenu()}
                <ScrollView
                    style={{paddingTop: 5,}}
                    keyboardDismissMode='on-drag'
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

                    {
                        this.state.listData == "" ?
                            <View style={[Style.flexRowCenter, {marginTop: 20}]}>
                                <Text style={{color: Global.colors.fontColor_2, fontSize: 16}}>还没数据哦..</Text>
                            </View>
                            :
                            this._list()
                    }
                    <View style={Style.bottom_black}/>
                </ScrollView>
                {this._modalPublish()}
                {
                    this.state.loading ?
                        <Loading/>
                        : null
                }
                <Hint ref="hint"/>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    contains: {
        flex: 1,
        backgroundColor: Global.colors.fontColor_8,
    },
    text_1: {
        width: Global.window.width / 2,
    },
    text_2: {
        width: Global.window.width / 2 - 10,
        paddingBottom: 10,
        backgroundColor: Global.colors.fontColor_4,
        borderRadius: 2,
        marginBottom: 8,
    },
    text_3: {
        width: Global.window.width / 2 - 10,
        marginTop: 10,
        paddingLeft: 5,
        paddingRight: 5,
    },
    image_1: {
        width: Global.window.width / 2 - 10,
        borderRadius: 1,
    },
    video_1: {
        width: Global.window.width / 2 - 10,
        borderRadius: 1,
        height: 140,
    },
    video_modal: {
        width: Global.window.width / 2 - 10,
        borderRadius: 1,
        height: 140,
        position: 'relative',
    },
    video_modal_text: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: Global.window.width / 2 - 20,
        borderRadius: 1,
        height: 140,
        backgroundColor: 'transparent',
        zIndex: 10,
    },
    image_2: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#eee'
    },
    font_1: {
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 22,
        paddingTop: 10,
        color: '#222'
    },
    font_2: {
        fontSize: 14,
        fontWeight: '300',
        lineHeight: 22,
        color: '#555',
        paddingLeft: 4,
    },
    font_3: {
        fontSize: 12,
        color: '#aaa',
    },


    //遮盖层
    modal_text_1: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        position: 'relative'
    },
    modal_text_2: {
        backgroundColor: '#fff',
        position: 'absolute',
        top: 44 + Global.topHeight,
        right: 10,
        // width: 120,
        // height: 80,
        borderRadius: 2,
        padding: 10,
    },
    modal_text_triangle: {
        position: 'absolute',
        top: -20,
        right: 2,
        borderBottomColor: '#fff',
        borderBottomWidth: 15,
        borderTopColor: 'transparent',
        borderTopWidth: 8,
        borderRightColor: 'transparent',
        borderRightWidth: 8,
        borderLeftColor: 'transparent',
        borderLeftWidth: 8,
    },
    modal_text_3: {
        paddingRight: 15,
        paddingLeft: 15,
        height: 30,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        backgroundColor: '#fff',
    },
    modal_text_font: {
        fontSize: 14,
        color: '#555',
    }

});