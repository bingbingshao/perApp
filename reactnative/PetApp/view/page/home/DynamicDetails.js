/**
 * Created by bingPo on 2019/1/4.
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
    KeyboardAvoidingView,
    RefreshControl,
    Share,
    Alert, AsyncStorage, DeviceEventEmitter
} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {createRandomID} from '../../compont/Function';
import Style from '../../css/Style';
import ETTStatus from "../../compont/ETTStatus"
import Global from '../../compont/Global';
import Hint from '../../compont/Hint';
import Loading from '../../compont/Loading';
import Video from 'react-native-video';
import Model from "../../model";
import {Toast} from "teaset";

export default class ArticleDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            login_id: '',
            loading: true,
            refreshing: false,
            title: '',
            paused: true,
            dynamicData: '',
            commentData: [],
            commentPost: ''  //评论消息
        }

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

    /*
     * 事件处理
     */
    start = (login_id) => {
        /*
         *  获取上一个页面传参的数值
         */
        let data_id = this.props.navigation.state.params.data_id;  //获取动态的ID
        // console.log("data_id",data_id);
        this.getData(data_id, login_id);
        this.getDataComment(data_id, login_id);
    };
    getData = (data_id, login_id) => {
        /*
         *  根据ID获取动态数据
         */
        let param = {'login_id': login_id, 'data_id': data_id};
        Model.details_data(param, (json) => {
            //把字符串转化为数组
            let tempData = json.retData;
            for (let data of tempData) {
                data.image = data.image.split('ΩΩ');
            }
            this.setState({
                dynamicData: tempData,
                loading: false
            });
        }, (json) => {
            Toast.show({
                text: "数据获取失败",
                position: 'center',
                duration: 2000,
            });
        });
    };
    getDataComment = (data_id) => {
        /*
         *  根据ID获取评论信息
         */
        let param = {'login_id': this.state.login_id, 'data_id': data_id};
        Model.gain_comments(param, (json) => {

            if (json.info == 0) { //还没有评论
                this.setState({
                    commentData: [],
                    loading: false
                })
            } else { //
                this.setState({
                    commentData: json.retData,
                    loading: false
                })
            }

        }, (json) => {
            console.log('details_data失败: ', json);
        });
    };
    attentions = (user_id) => {
        /*
         *  添加或取消关注
         */
        let login_id = this.state.login_id;
        if (login_id == "") { // 没有登录
            Toast.show({
                text: "请先登录",
                position: 'center',
                duration: 2000,
            });
        } else {
            let attention_id = createRandomID();
            let param = {'attention_id': attention_id, 'login_id': login_id, 'user_id': user_id};
            Model.attentions(param, (json) => {
                //添加或取消关注 成功
                Toast.show({
                    text: json.msg,
                    position: 'center',
                    duration: 2000,
                });
                //刷新数据
                this.getData(login_id);
            }, (json) => {
                console.log('details_data失败: ', json);
            });
        }
    };
    dataDelete = (data_id) => {
        /*
         *  删除自己发表的动态
         */
        Alert.alert(
            '删除数据',
            '是否要删除数据',
            [
                {text: '取消', onPress: () => console.log('Cancel Pressed')},
                {text: '确定', onPress: () => this.dataDeletes(data_id)},
            ],
            {cancelable: false}
        );
    };
    dataDeletes = (data_id) => {
        /*
         *  删除自己发表的动态s
         */
        let param = {'data_id': data_id,};
        console.log('data_id',data_id);
        Model.delete_data(param, (json) => {
            //删除评论
            Toast.show({
                text: json.msg,
                position: 'center',
                duration: 2000,
            });
            //重新刷新页面
            //this.setState({loading:true});
            //数据删除成功 添加提示
            DeviceEventEmitter.emit('deleteData', this.state.login_id);
            this.props.navigation.goBack();
        }, (json) => {
            console.log('dete_data: ', json);
        });
    };
    dataLikes = (data) => {
        /*
         *  动态的点赞与取消点赞
         */
        let login_id = this.state.login_id;
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
                this.setState({loading:true});
                this.start(this.state.login_id);
            }, (json) => {
                console.log('likes失败: ', json);
            });
        }

    };
    dataCollect = (data) => {
        /*
         *  动态的收藏与取消收藏
         */
        let login_id = this.state.login_id;
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
                this.setState({loading:true});
                this.start(this.state.login_id);
            }, (json) => {
                console.log('collect失败: ', json);
            });
        }
    };
    dataGift = (data) => {
        /*
         *  动态的点赞与取消
         */
        //待定
    };

    jump = (name, data) => {
        /*
         *  调转页面
         */
        this.props.navigation.navigate(name, data);
    };

    likeComment = (comment_id) => {
        let login_id = this.state.login_id;
        if (login_id == "") { // 没有登录
            Toast.show({
                text: "请先登录",
                position: 'center',
                duration: 2000,
            });
        } else {
            let likes_comments_id = createRandomID();
            let param = {'likes_comments_id': likes_comments_id, 'comment_id': comment_id, 'login_id': login_id,};
            console.log("param", param);
            Model.likes_comments(param, (json) => {
                //提示点赞或取消点赞成功
                Toast.show({
                    text: json.msg,
                    position: 'center',
                    duration: 2000,
                });
                //重新刷新页面
                this.setState({loading:true});
                this.start(this.state.login_id);
            }, (json) => {
                Toast.show({
                    text: json.msg,
                    position: 'center',
                    duration: 2000,
                });
                console.log('likes失败: ', json);
            });
        }
    };
    gotoPersonal = (user_id) => {
        /*
         *  进入其他用户主页
         */
        if(user_id != this.state.login_id)
            this.props.navigation.navigate('OtherPersonal', {user_id: user_id,login_id:this.state.login_id})
    };

    sentComment = () => {
        /*
         *  发送聊天消息
         *  未填写信息时 点击无效
         */
        let data = this.state.dynamicData[0];
        let login_id = this.state.login_id;
        // console.log("data",data);
        if (login_id == "") { // 没有登录
            Toast.show({
                text: "请先登录",
                position: 'center',
                duration: 2000,
            });
        } else {
            let comments_id = createRandomID();
            let data_id = data.id;
            let type = data.type;
            // login_id = 13381765961;
            let param = {
                'comments_id': comments_id,
                'data_id': data_id,
                'login_id': login_id,
                'type': type,
                'content': this.state.commentPost
            };
            Model.edit_comments(param, (json) => {
                //提示收藏和取消收藏成功
                Toast.show({
                    text: json.msg,
                    position: 'center',
                    duration: 2000,
                });
                //重新刷新页面
                this.setState({
                    commentPost: '',
                    loading: true,
                });
                this.refs.inputComment.blur();  //主动失去焦点
                this.start(this.state.login_id);
            }, (json) => {
                console.log('collect失败: ', json);
            });

        }
    };
    deleteComment = (comment_id) => {
        /*
         *  删除自己发表的评论
         */
        Alert.alert(
            '删除评论',
            '是否要删除评论',
            [
                {text: '取消', onPress: () => console.log('Cancel Pressed')},
                {text: '确定', onPress: () => this.deleteComments(comment_id)},
            ],
            {cancelable: false}
        );

    };
    deleteComments = (comment_id) => {
        let param = {'comments_id': comment_id,};
        Model.delete_comments(param, (json) => {
            //删除评论
            Toast.show({
                text: json.msg,
                position: 'center',
                duration: 2000,
            });
            //重新刷新页面
            this.setState({loading:true});
            this.start(this.state.login_id);
        }, (json) => {
            console.log('delete_comments失败: ', json);
        });
    };
    emoji = () => {
        /*
         *  emoji
         */
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
                            <Text style={[Style.barText, Style.font_1]}>动态详情</Text>
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
    _contains = () => {
        /*
         *  动态内容等
         */
        // console.log('dynamic',dynamic);
        if (this.state.dynamicData == '') {
            //数据没有成功加载
        } else {
            //数据加载成功
            let data = this.state.dynamicData[0];
            // console.log("data", data);
            return (
                <View style={{marginTop: 2}}>
                    <View style={[styles.author_text, Style.flexRowBetween]}>
                        <TouchableHighlight
                            underlayColor={'transparent'}
                            onPress={() => this.gotoPersonal(data.user_id)}>
                            <View style={Style.flexRowCenter}>
                                <Image style={styles.author_img}
                                       source={{uri: data.user_pic}}/>
                                <View style={{paddingLeft: 10}}>
                                    <Text style={styles.author_font_1}>{data.user_name}</Text>
                                    <Text style={styles.author_font_2}>
                                        {data.user_motto.length > 15 ? data.user_motto.slice(0, 15) + '...' : data.user_motto}
                                    </Text>
                                </View>
                            </View>
                        </TouchableHighlight>
                        {
                            data.user_id == this.state.login_id ?  //是自己的时候不显示关注
                                <TouchableHighlight underlayColor={'transparent'}
                                                    onPress={() => this.dataDelete(data.id)}>
                                    <View style={[Style.flexRowCenter, styles.author_btn, {backgroundColor: '#bbb'}]}>
                                        <Text style={{color: '#fff', fontSize: 16}}>删除</Text>
                                    </View>
                                </TouchableHighlight>
                                :
                                data.is_attention == 0 ?
                                    <TouchableHighlight underlayColor={'transparent'}
                                                        onPress={() => this.attentions(data.user_id)}>
                                        <View style={[Style.flexRowCenter, styles.author_btn]}>
                                            <Text style={{color: '#fff', fontSize: 16}}>关注</Text>
                                        </View>
                                    </TouchableHighlight>
                                    :
                                    <TouchableHighlight underlayColor={'transparent'}
                                                        onPress={() => this.attentions(data.user_id)}>
                                        <View style={[Style.flexRowCenter, styles.author_btn_1]}>
                                            <Text style={{color: '#fff', fontSize: 16}}>已关注</Text>
                                        </View>
                                    </TouchableHighlight>
                        }

                    </View>
                    <View style={[styles.author_text]}>
                        <View style={Style.blackText}/>
                        <Text style={styles.article_font_1}>
                            {'   ' + data.brief}
                        </Text>
                    </View>
                    {
                        data.dynamic_type == 2 ? //视频动态
                            this._viewVideo(data.video)
                            :  //图文动态
                            data.image[0] == "" ?  //没有图片
                                null
                                :
                                data.image.length == 1 ?  //一张图片动态
                                    this._viewImage_1(data.image)
                                    :  //多张图动态
                                    data.image.length == 4 ? //适用于四张图片
                                        this._viewImage_3(data.image)
                                        :
                                        data.image.length <= 9 ? //适用于四张图片
                                            this._viewImage_2(data.image)
                                            : //大于九张图片
                                            this._viewImage_4(data.image)

                    }

                    <View style={[styles.author_text, Style.flexRowStart]}>
                        <Text
                            style={[styles.comment_font_4, {paddingLeft: 8, color: '#aaa'}]}>{data.publish_time}</Text>
                    </View>
                    {this._likeCollect(data)}
                </View>
            )
        }

    };
    _viewImage_1 = (image) => {
        /*
         * 适用于一张图
         */
        return (
            <View style={[styles.author_text, Style.flexWarp]}>
                <TouchableHighlight
                    underlayColor={'transparent'}
                    onPress={() => this.jump('ShowImage', {
                        imageData: image,
                        number: 0
                    })}>
                    <Image style={styles.article_img_1}
                           source={{uri: image[0]}}/>
                </TouchableHighlight>
            </View>
        )
    };
    _viewImage_2 = (image) => {
        /*
         * 适用于 2、3、5、6、7、8、9
         */
        return (
            <View style={[styles.author_text, Style.flexWarp]}>
                {
                    image.map((data, i) => {
                        return (
                            <TouchableHighlight
                                underlayColor={'transparent'}
                                onPress={() => this.jump('ShowImage', {
                                    imageData: image,
                                    number: 0
                                })}>
                                <Image style={styles.article_img_2}
                                       source={{uri: data}}/>
                            </TouchableHighlight>
                        )
                    })
                }
            </View>
        )
    };
    _viewImage_3 = (image) => {
        /*
         * 适用于 4
         */
        return (
            <View style={[styles.author_text, Style.flexWarp]}>
                {
                    image.map((data, i) => {
                        return (
                            <TouchableHighlight
                                underlayColor={'transparent'}
                                onPress={() => this.jump('ShowImage', {
                                    imageData: image,
                                    number: 0
                                })}>
                                <Image style={styles.article_img_2}
                                       source={{uri: data}}/>
                            </TouchableHighlight>
                        )
                    })
                }
            </View>
        )
    };
    _viewImage_4 = (image) => {
        /*
         * 适用于 大于9张
         */
        return (
            <View style={[styles.author_text, Style.flexWarp]}>
                {
                    image.map((data, i) => {
                        return (
                            <TouchableHighlight
                                underlayColor={'transparent'}
                                onPress={() => this.jump('ShowImage', {
                                    imageData: image,
                                    number: 0
                                })}>
                                <Image style={styles.article_img_2}
                                       source={{uri: data}}/>
                            </TouchableHighlight>
                        )
                    })
                }
                <View style={[styles.article_img_2, {backgroundColor: Global.colors.fontColor_15}]}>

                </View>
            </View>
        )
    };
    _viewVideo = (uri) => {
        /*
         *  视频动态
         */
        return (
            <View style={Style.flexRowCenter}>
                <Video
                    ref={(ref) => {
                        this.player = ref
                    }}
                    style={[styles.videoBox]}
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
            </View>
        );
    };
    _likeCollect = (data) => {
        /*
         *  点赞和收藏
         */
        return (
            <View style={[styles.collect_text, Style.flexRowAround]}>
                <TouchableHighlight underlayColor={'transparent'} onPress={() => this.dataLikes(data)}>
                    <View style={[Style.flexColumnCenter]}>
                        {
                            data.is_like == 0 ?  //登陆的用户未点赞
                                <View style={Style.flexRowCenter}>
                                    <AntDesign name={'like2'} size={25} color={'#bbb'} style={{paddingRight: 5}}/>
                                    <Text style={styles.comment_font_5}>{data.likes}</Text>
                                </View>
                                :  //登陆的用户已点赞
                                <View style={Style.flexRowCenter}>
                                    <AntDesign name={'like2'} size={25} color={Global.colors.fontColor_1}
                                               style={{paddingRight: 5}}/>
                                    <Text style={styles.comment_font_4}>{data.likes}</Text>
                                </View>

                        }
                        <Text style={styles.comment_font_4}></Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight underlayColor={'transparent'} onPress={() => this.dataGift(data)}>
                    <View style={[Style.flexColumnCenter]}>
                        <AntDesign name={'gift'} size={25} color={Global.colors.fontColor_1}/>
                        <Text style={styles.comment_font_4}></Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight underlayColor={'transparent'} onPress={() => this.dataCollect(data)}>
                    <View style={[Style.flexColumnCenter]}>
                        {
                            data.is_collect == 0 ? //登陆的用户未收藏
                                <View style={Style.flexRowCenter}>
                                    <AntDesign name={'staro'} size={25} color={'#bbb'} style={{paddingRight: 5}}/>
                                    <Text style={styles.comment_font_5}>{data.collect}</Text>
                                </View>
                                :  //登录的用户已收藏
                                <View style={Style.flexRowCenter}>
                                    <AntDesign name={'staro'} size={25} color={Global.colors.fontColor_1}
                                               style={{paddingRight: 5}}/>
                                    <Text style={styles.comment_font_4}>{data.collect}</Text>
                                </View>
                        }

                        <Text style={styles.comment_font_4}></Text>
                    </View>
                </TouchableHighlight>
            </View>
        )
    };
    _comment = () => {
        /*
         *  评论
         */
        let commentData = this.state.commentData;
        // let listData = this.state.listData;
        return (
            <View style={[styles.comment_text_1]}>
                <View style={[Style.flexRowStart, styles.comment_text_2]}>
                    <View style={{width: 3, height: 20, backgroundColor: Global.colors.fontColor_1}}/>
                    <Text style={styles.comment_font_1}>全部评论({commentData.length})</Text>
                </View>
                {
                    commentData.length < 1 ? //还没有评论
                        <View>
                            <Text style={{
                                color: Global.colors.fontColor_2,
                                fontSize: 16,
                                fontWeight: '500',
                                lineHeight: 40,
                                paddingLeft: 20
                            }}>还没有评论...</Text>
                        </View>
                        :
                        commentData.map((data, i) => {
                            return (
                                <TouchableHighlight
                                    underlayColor={'transparent'}>
                                    <View style={[styles.comment_text_3]}>
                                        <View style={[Style.flexRowBetween_start, {width: Global.window.width - 20}]}>
                                            <TouchableHighlight
                                                underlayColor={'transparent'}
                                                onPress={() => this.gotoPersonal(data.user_id)}>
                                                <View style={[Style.flexRowCenter]}>
                                                    <Image style={styles.comment_img} source={{uri: data.user_pic}}/>
                                                    <View style={{paddingLeft: 10}}>
                                                        <Text style={styles.comment_font_2}>{data.user_name}</Text>
                                                        <Text style={styles.comment_font_3}>{data.comment_time}</Text>
                                                    </View>
                                                </View>
                                            </TouchableHighlight>
                                            <View style={Style.flexRowCenter}>
                                                {
                                                    data.user_id == this.state.login_id ? //评论ID与登录ID相同
                                                        <TouchableHighlight
                                                            underlayColor={'transparent'}
                                                            onPress={() => this.deleteComment(data.comment_id)}>
                                                            <Text style={{
                                                                color: Global.colors.fontColor_2,
                                                                paddingLeft: 10,
                                                                width: 40,
                                                                fontSize: 12,
                                                                lineHeight: 20
                                                            }}>删除</Text>
                                                        </TouchableHighlight>
                                                        :
                                                        null
                                                }
                                                <TouchableHighlight
                                                    underlayColor={'transparent'}
                                                    onPress={() => this.likeComment(data.comment_id)}>
                                                    {
                                                        data.is_like == 1 ?
                                                            <View style={Style.flexRowCenter}>
                                                                <Text style={[styles.comment_font_3,{color:Global.colors.fontColor_1}]}>{data.likes}</Text>
                                                                <AntDesign name={'like2'} size={16}
                                                                           color={Global.colors.fontColor_1}
                                                                           style={{paddingLeft: 5}}/>
                                                            </View>
                                                            :
                                                            <View style={Style.flexRowCenter}>
                                                                <Text style={[styles.comment_font_3]}>{data.likes}</Text>
                                                                <AntDesign name={'like2'} size={16} color={'#bbb'}
                                                                           style={{paddingLeft: 5}}/>


                                                            </View>
                                                    }
                                                </TouchableHighlight>
                                            </View>

                                        </View>
                                        <View style={[styles.comment_contains, {flexDirection: 'row'}]}>
                                            <Text
                                                style={styles.comment_font_5}>{'    ' + data.content}</Text>

                                        </View>
                                    </View>
                                </TouchableHighlight>
                            )
                        })
                }
            </View>
        )
    };
    _bottomBtn = () => {
        /*
         *  底部悬浮按钮
         */
        return (
            <View style={[styles.bottom_contains, Style.flexColumnStart]}>
                <View style={[styles.bottom_center, Style.flexRowBetween]}>
                    <View style={[styles.bottom_text, Style.flexRowCenter]}>
                        <TextInput
                            ref='inputComment'
                            style={styles.bottom_input}
                            placeholder="在这里发表评论..."
                            placeholderTextColor='#555'
                            autoCapitalize='none'
                            selectionColor={Global.colors.fontColor_1}
                            clearButtonMode='while-editing'
                            underlineColorAndroid={'transparent'}
                            onChangeText={(text) => {
                                this.setState({commentPost: text});
                            }}
                            value={this.state.commentPost}
                        />
                    </View>
                    <View style={[Style.flexRowAround, {flex: 1}]}>
                        <TouchableHighlight
                            underlayColor={'transparent'}
                            onPress={() => this.emoji()}
                        >
                            <View style={[Style.flexColumnCenter]}>
                                <Entypo name={'emoji-happy'} size={26} color={'#555'}/>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight
                            underlayColor={'transparent'}
                            onPress={() => this._share()}
                        >
                            <View style={[Style.flexColumnCenter]}>
                                <AntDesign name={'sharealt'} size={26} color={'#555'}/>
                            </View>
                        </TouchableHighlight>
                        {
                            this.state.commentPost == '' ?//未填写信息
                                <View style={[Style.flexColumnCenter]}>
                                    <Icon name={'send-o'} size={26} color={'#555'}/>
                                </View>
                                :
                                <TouchableHighlight
                                    underlayColor={'transparent'}
                                    onPress={() => this.sentComment()}
                                >
                                    <View style={[Style.flexColumnCenter]}>
                                        <Icon name={'send-o'} size={26} color={Global.colors.fontColor_2}/>
                                    </View>
                                </TouchableHighlight>
                        }

                    </View>
                </View>
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
                    {this._contains()}
                    {this._comment()}
                </ScrollView>
                <KeyboardAvoidingView behavior='padding'>
                    {this._bottomBtn()}
                </KeyboardAvoidingView>
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

    author_text: {
        padding: 10,
        width: Global.window.width,
    },
    author_img: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderColor: '#eee',
        borderWidth: 1,
    },
    author_font_1: {
        fontSize: 18,
        color: '#222',
        lineHeight: 30,
        fontWeight: '600'
    },
    author_font_2: {
        fontSize: 14,
        color: '#888',
        lineHeight: 20,
    },
    author_btn: {
        width: 60,
        height: 25,
        borderRadius: 5,
        backgroundColor: Global.colors.fontColor_1
    },
    author_btn_1: {
        width: 60,
        height: 25,
        borderRadius: 5,
        backgroundColor: Global.colors.fontColor_2
    },
    article_font_1: {
        fontSize: 16,
        fontWeight: '400',
        color: '#222',
        lineHeight: 25,
    },
    article_img_1: {
        width: Global.window.width - 20 - 7,
        resizeMode: Image.resizeMode.contain,
        height: 200,
        margin: 3,
    },
    article_img_2: {
        width: (Global.window.width - 20) / 3 - 7,
        height: (Global.window.width - 20) / 3 - 7,
        margin: 3,
        // resizeMode: Image.resizeMode.contain,
    },
    article_img_3: {
        width: (Global.window.width - 20) / 3,
        height: (Global.window.width - 20) / 3,
        margin: 3,
    },
    collect_text: {
        marginTop: 40,
        width: Global.window.width,
        padding: 15
    },


    //评论
    comment_text_1: {
        width: Global.window.width,
        marginTop: 20,
    },
    comment_text_2: {
        width: Global.window.width - 10,
        padding: 10,
        marginLeft: 10,
        borderBottomColor: Global.colors.fontColor_3,
        borderBottomWidth: 1,
    },
    comment_text_3: {
        marginLeft: 5,
        width: Global.window.width - 5,
        padding: 5,
    },
    comment_img: {
        width: 36,
        height: 36,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: '#eee',
    },
    comment_font_1: {
        fontSize: 14,
        color: Global.colors.fontColor_1,
        paddingLeft: 10,
    },
    comment_font_2: {
        fontSize: 12,
        color: '#555',
        fontWeight: '600',
        lineHeight: 20,
    },
    comment_font_3: {
        fontSize: 12,
        color: '#aaa',
        lineHeight: 20,
    },
    comment_contains: {
        width: Global.window.width - 45,
        marginLeft: 45,
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 15,
        borderBottomColor: Global.colors.fontColor_14,
        borderBottomWidth: 1,
    },
    comment_font_4: {
        fontSize: 14,
        color: Global.colors.fontColor_1,
        lineHeight: 20,
    },
    comment_font_5: {
        fontSize: 14,
        color: '#888',
        lineHeight: 20,
    },
    videoBar: {
        width: Global.window.width,
        height: 211,
        // backgroundColor: '#eee',
    },
    videoBox: {
        width: Global.window.width - 8 - 15 - 10,
        height: 200,
    },

    //底部按钮
    bottom_contains: {
        width: Global.window.width,
        height: 60 + Global.margin_bottom,
        borderTopColor: '#eee',
        borderTopWidth: 1,
        backgroundColor: '#fff',
    },
    bottom_center: {
        height: 60,
        width: Global.window.width,
    },
    bottom_text: {
        marginLeft: 10,
        width: 200,
        height: 40,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc'
    },
    bottom_input: {
        width: 180,
        height: 40,
    }
});
