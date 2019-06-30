/**
 * Created by bingPo on 2018/11/21.
 * 我的粉丝
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
import Style from '../../css/Style';
import ETTStatus from "../../compont/ETTStatus"
import Global from '../../compont/Global';
import Loading from '../../compont/Loading';
import Model from "../../model";
import {Toast} from "teaset";


export default class Attention extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            refreshing: false,
            login_id: '',
            attentions: [],
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
        Model.myFans(param, (json) => {
            // console.log('json', json);
            this.setState({
                loading: false,
                attentions: json.retData
            })
        }, (json) => {
            console.log('collect失败: ', json);
            Toast.show({
                text: "获取我的发丝失败",
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
                            <Text style={[Style.barText, Style.font_1]}>我的粉丝</Text>
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
         *  我的关注
         */
        let attentions = this.state.attentions;

        return (
            <View style={[Style.flexColumnCenter]}>
                {
                    attentions.map((data, i) => {
                        console.log(data);
                        return (
                            <TouchableHighlight
                                underlayColor={'transparent'}
                                onPress={() => this.jump('OtherPersonal', {
                                    'login_id': this.state.login_id,
                                    'user_id': data.user_id
                                })}
                            >
                                <View style={[styles.text_1, Style.flexRowStart]}>
                                    <Image source={{uri: data.user_pic}} style={styles.image_1}/>
                                    <View style={[Style.flexColumnBetween1,{paddingLeft:15}]}>
                                        <Text style={styles.font_1}>{data.user_name}</Text>
                                        <Text style={styles.font_2}>
                                            {
                                                data.user_motto.length > 80 ?
                                                    data.user_motto.slice(0,80) + '...'
                                                    :
                                                    data.user_motto
                                            }
                                        </Text>
                                    </View>
                                </View>
                            </TouchableHighlight>
                        )
                    })
                }
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
        marginTop: 10,
        width: Global.window.width - 10,
        height: 120,
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    image_1: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    font_1: {
        fontWeight: '600',
        lineHeight: 30,
        fontSize: 18,
        color: '#222',
    },
    font_2: {
        width:280,
        fontWeight: '300',
        lineHeight: 20,
        fontSize: 14,
        color: '#555',
    }

});
