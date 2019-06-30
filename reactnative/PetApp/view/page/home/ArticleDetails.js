/**
 * Created by bingPo on 2019/1/4.
 * 文章详情
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
    KeyboardAvoidingView, AsyncStorage
} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import OpenFile from 'react-native-doc-viewer';
import Icon from 'react-native-vector-icons/FontAwesome';
import Style from '../../css/Style';
import ETTStatus from "../../compont/ETTStatus"
import Global from '../../compont/Global';
import Hint from '../../compont/Hint';
import Loading from '../../compont/Loading';
import Model from "../../model";

export default class ArticleDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            paused: true,
            listData: '',
            imageData: [],
            commentData: [
                {
                    comment_id: 'comment1', //评论ID
                    dynamic_id: 'article1', //评论对象ID 文章 视频 动态
                    user_id: 'comment_id1',//用户ID
                    user_name: '月下独饮',//用户昵称
                    user_path: 'http://111.231.141.185/pet/image/pet-banner-11.jpg',//用户头像
                    time: '昨天 20:08',//评论时间,
                    like: 102,//点赞次数
                    is_like: 0,//是否点赞
                    comment_text: '假如那一次成功了,我还是自己一个人吗?但是没有假如,因此我还是自己一个人。',//评论内容
                },
                {
                    comment_id: 'comment2', //评论ID
                    dynamic_id: 'article1', //评论对象ID 文章 视频 动态
                    user_id: 'comment_id2',//用户ID
                    user_name: '夜中独酌',//用户昵称
                    user_path: 'http://111.231.141.185/pet/image/pet-banner-9.jpg',//用户头像
                    time: '10:08',//评论时间,
                    like: 10,//点赞次数
                    is_like: 1,//是否点赞
                    comment_text: '如果当初选择不回来,现在我又在哪。是否还会还念外面的生活,是否还有那不知明的快乐。但是我回来了。',//评论内容
                },
            ],
        }

    }

    componentWillMount() {
        AsyncStorage.getItem('login_id').then(json => {  //获取存储的账户信息
            if (json != null) {
                this.setState({login_id: json});
            };
        });
    }

    componentDidMount() {
        this.start();
    };

    /*
     * 事件处理
     */
    start = ()=> {
        /*
         *  更改标题名
         */
        let data_id = this.props.navigation.state.params.data.id;  //获取文章ID
        this.getData(data_id);
    };
    getData = (data_id) => {
        /*
         *  根据ID获取动态数据
         */
        let param = {'login_id': this.state.login_id, 'data_id': data_id};
        Model.details_data(param, (json) => {
            //把字符串转化为数组
            let tempData = json.retData;
            this.setState({
                dynamicData: tempData,
                loading: false
            });
            console.log("tempData",tempData);
        }, (json) => {
            console.log('details_data失败: ', json);
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
                    commentData: []
                })
            } else { //
                this.setState({
                    commentData: json.retData
                })
            }

        }, (json) => {
            console.log('details_data失败: ', json);
        });
    };
    attention = (sid, is_attention)=> {
        /*
         *  添加关注&&取关
         *  sid 文章作者
         *  is_attention 是否关注
         */
        alert('关注')
    };
    calculateImage = ()=> {
        /*
         *  计算图片的宽度
         *  收集图片到一起
         */
        let list = this.state.listData.connect;
        let key = 'height';
        let images = [];
        list.map((data, i)=> {
            if (data.pic) {
                Image.getSize(data.pic,
                    (width, height) => {
                        list[i][key] = (Global.window.width - 60) * height / width;
                        this.state.listData.connect = list;
                        this.setState({
                            listData: this.state.listData
                        })
                    },
                    (json)=> {
                        console.log("error", json)
                    }
                );
                images.push(data.pic);
                this.setState({
                    imageData: images
                })
            }
        })

    };
    jump = (name, data)=> {
        /*
         *  调转页面
         */
        this.props.navigation.navigate(name, data);
    };
    clickComment = (commentId)=> {
        alert('点击评论')
    };
    likeComment = (commentId)=> {
        alert('点赞或取消点赞评论')
    };

    /*
     * 界面视图
     */
    _nav = ()=> {
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
                            <Text
                                style={[Style.barText, Style.font_1]}>文章详情</Text>
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
    _contains = ()=> {
        /*
         *  简介评论等
         */
        let listData = this.state.listData;
        return (
            <View>
                {this._title(listData.article_title)}
                {this._read(listData)}
                {this._author(listData)}
                {this._article(listData.connect)}
                {this._likeCollect(listData)}
            </View>
        )
    };
    _title = (title)=> {
        /*
         *  文章标题
         */
        return (
            <View style={styles.title_text}>
                <Text style={styles.title_font}>{'   ' + title}</Text>
            </View>
        )
    };
    _read = (list)=> {
        /*
         *  浏览次数&&发布时间
         */
        return (
            <View style={[{width: Global.window.width}, Style.flexRowEnd]}>
                <Text style={styles.author_font2}>{list.read}阅读</Text>
                <Text style={[styles.author_font2, {paddingLeft: 10, paddingRight: 10}]}>{list.time}</Text>
            </View>
        )
    };
    _author = (list)=> {
        /*
         *  显示作者
         */
        return (
            <View style={[styles.author_text, Style.flexRowBetween]}>
                <View style={Style.flexRowCenter}>
                    <Image style={styles.author_image} source={{uri: list.author_path}}/>
                    <View style={{paddingLeft: 5, width: Global.window.width * 0.65}}>
                        <Text style={[styles.author_font1]}>{list.author_name}</Text>
                        <Text style={styles.author_font2}>
                            {list.author_motto.length > 18 ? list.author_motto.slice(0, 18) + '..' : list.author_motto}
                        </Text>
                    </View>
                </View>
                <TouchableHighlight underlayColor={'transparent'}
                                    onPress={()=>this.attention(list.article_id, list.is_attention)}>
                    <View style={[
                        styles.author_btn,
                        Style.flexRowCenter,
                        {backgroundColor: list.is_attention == 0 ? Global.colors.fontColor_1 : Global.colors.fontColor_2}]}>
                        <Text style={{color: '#fff', fontSize: 14}}>{list.is_attention == 0 ? '关注' : '已关注'}</Text>
                    </View>
                </TouchableHighlight>
            </View>
        )
    };
    _article = (list)=> {
        /*
         *  文章内容
         */
        return (
            <View style={{paddingBottom: 20}}>
                {
                    list.map((data, i)=> {
                        if (data.title) {
                            return (
                                <View style={styles.article}>
                                    <Text style={styles.article_font2}>
                                        {"  " + data.title}
                                    </Text>
                                </View>
                            )
                        } else if (data.pic) {
                            return (
                                <TouchableHighlight
                                    underlayColor={'transparent'}
                                    onPress={()=>this.jump('ShowImage', {
                                        imageData: this.state.imageData,
                                        number: data.number
                                    })}>
                                    <View style={[styles.article, Style.flexRowCenter]}>
                                        <Image style={[styles.article_img, {height: data.height ? data.height : 200}]}
                                               source={{uri: data.pic}}/>
                                    </View>
                                </TouchableHighlight>
                            )
                        } else {
                            return (
                                <View style={styles.article}>
                                    <Text style={styles.article_font}>
                                        {"    " + data.text}
                                    </Text>
                                </View>
                            )
                        }
                    })
                }
            </View>
        )
    };
    _likeCollect = (list)=> {
        /*
         *  点赞和收藏
         */
        return (
            <View style={[styles.collect_text, Style.flexRowAround]}>
                <TouchableHighlight underlayColor={'transparent'} onPress={()=>alert('like')}>
                    <View style={[Style.flexColumnCenter]}>
                        <View style={Style.flexRowCenter}>
                            <AntDesign name={'like2'} size={25} color={'#bbb'} style={{paddingRight: 5}}/>
                            <Text style={styles.comment_font_4}>20</Text>
                        </View>
                        <Text style={styles.comment_font_4}>点赞</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight underlayColor={'transparent'} onPress={()=>alert('gift')}>
                    <View style={[Style.flexColumnCenter]}>
                        <AntDesign name={'gift'} size={25} color={Global.colors.fontColor_1}/>
                        <Text style={styles.comment_font_4}>打赏</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight underlayColor={'transparent'} onPress={()=>alert('collect')}>
                    <View style={[Style.flexColumnCenter]}>
                        <View style={Style.flexRowCenter}>
                            <AntDesign name={'staro'} size={25} color={'#bbb'} style={{paddingRight: 5}}/>
                            <Text style={styles.comment_font_4}>20</Text>
                        </View>
                        <Text style={styles.comment_font_4}>收藏</Text>
                    </View>
                </TouchableHighlight>
            </View>
        )
    };
    _comment = ()=> {
        /*
         *  评论
         */
        let commentData = this.state.commentData;
        let listData = this.state.listData;
        return (
            <View style={[styles.comment_text_1]}>
                <View style={[Style.flexRowStart, styles.comment_text_2]}>
                    <View style={{width: 3, height: 20, backgroundColor: Global.colors.fontColor_1}}/>
                    <Text style={styles.comment_font_1}>全部评论({listData.comment})</Text>
                </View>
                {
                    commentData.map((data, i)=> {
                        return (
                            <TouchableHighlight
                                underlayColor={'transparent'}
                                onPress={()=>this.clickComment(data.comment_id)}>
                                <View style={[styles.comment_text_3]}>
                                    <View style={[Style.flexRowBetween_start, {width: Global.window.width - 20}]}>
                                        <View style={[Style.flexRowCenter]}>
                                            <Image style={styles.comment_img} source={{uri: data.user_path}}/>
                                            <View style={{paddingLeft: 10}}>
                                                <Text style={styles.comment_font_2}>{data.user_name}</Text>
                                                <Text style={styles.comment_font_3}>{data.time}</Text>
                                            </View>
                                        </View>
                                        <TouchableHighlight
                                            underlayColor={'transparent'}
                                            onPress={()=>this.likeComment(data.comment_id)}>
                                            <View style={Style.flexRowCenter}>
                                                <Text style={styles.comment_font_3}>{data.like}</Text>
                                                {
                                                    data.is_like == 1 ?
                                                        <AntDesign name={'like2'} size={16}
                                                                   color={Global.colors.fontColor_1}
                                                                   style={{paddingLeft: 5}}/>
                                                        :
                                                        <AntDesign name={'like2'} size={16} color={'#bbb'}
                                                                   style={{paddingLeft: 5}}/>
                                                }

                                            </View>
                                        </TouchableHighlight>
                                    </View>
                                    <View style={styles.comment_contains}>
                                        <Text
                                            style={styles.comment_font_4}>{'    ' + data.comment_text}</Text>
                                    </View>
                                </View>
                            </TouchableHighlight>
                        )
                    })
                }
            </View>
        )
    };
    _bottomBtn = ()=> {
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
                        />
                    </View>
                    <View style={[Style.flexRowAround, {flex: 1}]}>
                        <TouchableHighlight
                            underlayColor={'transparent'}
                            onPress={()=>this.reportPost('')}
                        >
                            <View style={[Style.flexColumnCenter]}>
                                <AntDesign name={'warning'} size={18} color={'#555'}/>
                                <Text style={{paddingTop: 3, color: '#555', fontSize: 12}}>举报</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight
                            underlayColor={'transparent'}
                            onPress={()=>this.share()}
                        >
                            <View style={[Style.flexColumnCenter]}>
                                <AntDesign name={'sharealt'} size={18} color={'#555'}/>
                                <Text style={{paddingTop: 3, color: '#555', fontSize: 12}}>分享</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight
                            underlayColor={'transparent'}
                            onPress={()=>this.sentComment()}
                        >
                            <View style={[Style.flexColumnCenter]}>
                                <Icon name={'send-o'} size={18} color={'#555'}/>
                                <Text style={{paddingTop: 3, color: '#555', fontSize: 12}}>发布</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        )
    };

    render() {
        return (
            <View style={[styles.contains]}>
                {this._nav()}
                <ScrollView>
                    {/*{this._contains()}*/}
                    {this._comment()}
                </ScrollView>
                <KeyboardAvoidingView behavior='padding'>
                    {this._bottomBtn()}
                </KeyboardAvoidingView>
                {
                    this.state.loading ?
                        <Loading />
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


    //文章
    title_text: {
        width: Global.window.width,
        padding: 5,
        marginTop: 10
    },
    title_font: {
        lineHeight: 30,
        fontSize: 22,
        fontWeight: '600',
    },
    author_text: {
        width: Global.window.width,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 15,
    },
    author_image: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#eee'
    },
    author_font1: {
        lineHeight: 28,
        fontSize: 16,
        color: '#222',
        fontWeight: '500',
    },
    author_font2: {
        fontSize: 12,
        color: '#555',
        fontWeight: '300',
    },
    author_btn: {
        width: 60,
        height: 25,
        borderRadius: 3,
    },
    article: {
        marginTop: 10,
        marginBottom: 10,
        width: Global.window.width - 10,
        marginRight: 5,
        marginLeft: 5,
    },
    article_font: {
        color: '#222',
        fontSize: 16,
        fontWeight: '500',
        lineHeight: 25
    },
    article_font2: {
        color: '#000',
        fontSize: 17,
        fontWeight: '600',
        lineHeight: 25
    },
    article_img: {
        width: Global.window.width - 60,
        resizeMode: Image.resizeMode.contain,
    },
    collect_text: {
        marginTop: 30,
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
        color: '#555',
        lineHeight: 20,
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
