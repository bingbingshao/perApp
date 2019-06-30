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
    KeyboardAvoidingView
} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import Style from '../../css/Style';
import ETTStatus from "../../compont/ETTStatus"
import Global from '../../compont/Global';
import Hint from '../../compont/Hint';
import Loading from '../../compont/Loading';
import Video from 'react-native-video';

export default class ArticleDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            title: '',
            paused: true,
            listData: {
                article_id: 'article1', //文章编号
                article_title: '饲养宠物蜘蛛的秘密',//文章标题
                author_id: 'author1', //作者id
                author_name: 'wolf',//作者名字
                author_path: 'http://111.231.141.185/pet/image/pet-banner-1.jpg',//作者头像
                author_motto: '曾经,美好的未来。曾经,美好的未来曾经,美好的未来。曾经,美好的未来。',//作者座右铭
                time: '2019-01-09 17:03:33',//发布时间
                is_attention: 0,//是否关注作者
                read: 10,//阅读次数
                like: 10,//点赞次数
                is_like: 0,//是否点赞  未登录时返回0
                collect: 10,//收藏次数
                is_collect: 0,//是否收藏
                comment: 10,//评论次数
                connect: [  //内容
                    {
                        text: '很多人一听到蜘蛛这个词，都会感到害怕，会想到剧毒之类的。但事实上蜘蛛也有可爱的一面，很多品种的蜘蛛长得很漂亮，小巧灵活，深受一些喜欢冷门宠物人们的喜爱。如今把蜘蛛当宠物饲养的人越来越多，在花鸟鱼虫市场也经常看到各种各样的蜘蛛，既然蜘蛛已经走入大家的生活，那么我们不妨了解一下蜘蛛的饲养方法，给想养蜘蛛的人一些小建议。',//文字内容
                    }, {
                        pic: 'http://111.231.141.185/pet/image/pet-banner-14.jpg',//图片内容
                        number: 0
                    }, {
                        text: '一、 饲养方法'
                    }, {
                        text: '大家饲养蜘蛛最好选择木盒子，由于蜘蛛有很强的领地意识，所以要将蜘蛛们分开，每个蜘蛛都要有属于自己的“单间”。木盒子可以自己找，也可以直接从花鸟鱼虫市场购买，但是盒子大小很重要。到底盒子的大小怎么选择呢?很简单，根据自己所饲养的蜘蛛大小而定，适合的即可。'
                    }, {
                        text: '小编在这里提醒大家，饲养蜘蛛的盒子不要太小，会影响蜘蛛活动和生长发育；也不能太大，因为太大盒子透气孔也比较大，蜘蛛很可能从透气孔中钻出来，那就太危险了！'
                    }, {
                        text: '2、喂食'
                    }, {
                        text: '喂食蜘蛛的食物一般是面包虫，喂食量取决于所饲养的蜘蛛大小。如果是身长1厘米左右的小幼体蜘蛛，那么一次喂1/3个面包虫即可。可将面包虫剪成三段，放进去一小段让小蜘蛛吃，如果面包虫长度太长，会吓到小蜘蛛。如果饲养的蜘蛛身长超过4厘米的，可以喂整条面包虫。如果是亚成体的蜘蛛，一次可喂食两三条面包虫。另外，无论蜘蛛大小，都是一周喂食一次哦！'
                    }, {
                        text: '小编提醒各位，如果大家发现蜘蛛趴在面包虫上面不动，不要着急，更不要去打扰，这是蜘蛛正在享用美食，在吸食面包虫中的汁水，如果被打扰，蜘蛛就很可能出现拒食情况。'
                    }, {
                        text: '3、 温度'
                    }, {
                        text: '蜘蛛的饲养对于温度要求还是比较苛刻，因为很多宠物蜘蛛是热带物种，所以饲养的时候温度一定要在25摄氏度左右，最好不要低于20度，温度高点没大问题，但是温度太低会影响蜘蛛的进食和生长发育，如果是几度或者零下的话，还会对蜘蛛的生命构成威胁。'
                    }, {
                        text: '4、 湿度'
                    }, {
                        text: '生存环境湿度对于蜘蛛生存很重要，如果环境特别干燥的话，幼小的蜘蛛就有可能出现脱水而亡的情况，大的蜘蛛也会出现蜕皮的情况。但是如果太潮湿也不行，容易滋生细菌，蜘蛛容易生病。'
                    }, {
                        pic: 'http://111.231.141.185/pet/image/pet-banner-15.jpg',
                        number: 1
                    }, {
                        text: '二、注意事项'
                    },  {
                        text: '1、蜘蛛带回家要先静养三四天，因为蜘蛛换了新环境需要一个熟悉的过程，这三四天先不需要喂食。'
                    },  {
                        text: '2、小蜘蛛饭量比较小，有时候吃不完喂食的东西，那么需要大家及时清理出来残羹剩饭，否则会滋生细菌，影响蜘蛛的健康。'
                    },  {
                        text: '3、蜘蛛的“房间”不需要布置的太花哨复杂，简单明了就很好，这样利于蜘蛛寻找捕食食物。但是躲避布置还是要有，因为蜘蛛需要安全感。'
                    }, {
                        title: '4、大家日常饲养蜘蛛时一定要戴上手套哦，安全第一，大多数蜘蛛还是有毒的，不要直接用手，以防发生意外。'
                    },  {
                        title: '5、蜘蛛网不要经常清理，因为蜘蛛网对于蜘蛛来说意味着家，破坏蜘蛛的家，很肯能会受到蜘蛛的攻击，也不利于蜘蛛的成长。'
                    }, {
                        pic: 'http://111.231.141.185/pet/image/pet-banner-16.jpg',
                        number: 2
                    }, {
                        text: '以上就是小编为大家介绍的蜘蛛养殖方法，方法虽然有了，但是实际操作也很重要，大家需要做好每个小细节。现在是不是也蠢蠢欲动想养这种独特的宠物了？心动不如行动，只要认真耐心，一定会把小宠物养的健康又可爱。'
                    },
                ]

            },
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
        this.start();
    };

    componentDidMount() {
        this.calculateImage();
    };

    /*
     * 事件处理
     */
    start = ()=> {
        /*
         *  更改标题名
         */
        this.setState({
            title: this.state.listData.article_title
        })
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
        let title = this.state.title;
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
                    {this._contains()}
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
