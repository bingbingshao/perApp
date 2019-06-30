/**
 * Created by bingPo on 2018/11/12.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Image,
    View,
    TouchableHighlight,
    ScrollView, Modal,
} from 'react-native';
import ETTStatus from "../../compont/ETTStatus"
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Global from "../../compont/Global"
import Style from '../../css/Style';
import Hint from '../../compont/Hint';
import Loading from '../../compont/Loading';


export default class ChatRoomList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            sid: '',
            plusSomething: false
        };
    }

    /*
     * 点击事件
     */
    jump = (name, data) => {

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
                        underlayColor={'transparent'}
                    >
                        <View>
                            <Text style={[Style.barText, Style.font_1]}>聊天室列表</Text>
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

    _searchOne = () => {
        /*
         *  指定搜索某一个人
         */
        return (
            <View style={[styles.search_text_1, Style.flexRowCenter]}>
                <View style={[styles.search_text_2, Style.flexRowCenter]}>
                    <AntDesign name={'search1'} size={18} color={Global.colors.fontColor_11}/>
                    <Text style={styles.search_font_1}>搜索</Text>
                </View>
            </View>
        )
    };

    _listChild = () => {
        /*
         *   子列表
         */
        return (
            <View>
                <View style={[Style.blackText, {color: Global.colors.fontColor_5}]}/>
                <View style={[styles.list_text_1, Style.flexRowBetween]}>
                    <Image style={[styles.list_image]}/>
                    <View style={[styles.list_text_2, Style.flexColumnBetween]}>
                        <View style={[styles.list_text_3, Style.flexRowBetween]}>
                            <Text style={styles.list_font_1}>想找蓝猫打一下</Text>
                            <Text style={styles.list_font_2}>05:10</Text>
                        </View>
                        <View style={[styles.list_text_3, Style.flexRowBetween]}>
                            <Text style={styles.list_font_3}>最后一条信息</Text>
                        </View>
                    </View>
                </View>
                <View style={[styles.list_text_1, Style.flexRowBetween]}>
                    <Image style={[styles.list_image]}/>
                    <View style={[styles.list_text_2, Style.flexColumnBetween]}>
                        <View style={[styles.list_text_3, Style.flexRowBetween]}>
                            <Text style={styles.list_font_1}>边牧最聪明了</Text>
                            <Text style={styles.list_font_2}>05:10</Text>
                        </View>
                        <View style={[styles.list_text_3, Style.flexRowBetween]}>
                            <Text style={styles.list_font_3}>最后一条信息</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    };


    render() {
        return (
            <View style={[styles.contains]}>
                {this._nav()}
                {this._searchOne()}
                <ScrollView>
                    {this._listChild()}
                </ScrollView>
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
        backgroundColor: Global.colors.fontColor_4,
    },

    search_text_1: {
        width: Global.window.width,
        height: 45,
        backgroundColor: Global.colors.fontColor_16
    },
    search_text_2: {
        width: Global.window.width - 30,
        height: 30,
        backgroundColor: Global.colors.fontColor_4,
        borderRadius: 5,
    },
    search_font_1: {
        fontSize: 14,
        color: Global.colors.fontColor_11,
        paddingLeft: 5,
    },

    list_text_1: {
        width: Global.window.width - 15,
        height: 80,
        padding: 10,
        marginLeft: 15,
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
    },
    list_image: {
        width: 60,
        height: 60,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#eee'
    },
    list_text_2: {
        width: Global.window.width - 10 - 15 - 60,
        paddingLeft: 15,
        height: 55
    },
    list_text_3: {
        width: Global.window.width - 10 - 15 - 60,
        paddingRight: 20,
    },
    list_font_1: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
    },
    list_font_2: {
        fontSize: 14,
        fontWeight: '200',
        color: '#888',
    },
    list_font_3: {
        fontSize: 14,
        fontWeight: '200',
        color: '#888',
        lineHeight: 25,
        paddingLeft: 5,
    },


})