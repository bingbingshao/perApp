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
    ScrollView, Modal, RefreshControl, DeviceEventEmitter,
} from 'react-native';
import ETTStatus from "../../compont/ETTStatus"
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icons from 'react-native-vector-icons/FontAwesome5';
import Global from "../../compont/Global"
import Style from '../../css/Style';
import Hint from '../../compont/Hint';
import Loading from '../../compont/Loading';

export default class Information extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            sid: '',
            plusSomething: false,
            refreshing: false
        };
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
    }

    /*
     * 点击事件
     */
    jump = (name, data) => {
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
                        <View style={[Style.icon_1, Style.flexRowCenter, {marginLeft: 10}]}>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight
                        underlayColor={'transparent'}
                    >
                        <View>
                            <Text style={[Style.barText, Style.font_1]}>消息</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight
                        underlayColor={'transparent'}
                        onPress={() => {
                            this.setState({plusSomething: true})
                        }}
                    >
                        <View style={[Style.icon_1, Style.flexRowCenter, {marginRight: 10}]}>
                            <AntDesign name={'plus'} size={24} color={Global.colors.fontColor_1}/>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        )
    };

    _listMenu = () => {
        /*
         *   子菜单
         */
        return (
            <View style={[Style.flexRowAround, {width: Global.window.width - 20, margin: 20}]}>
                <TouchableHighlight
                    underlayColor={'transparent'}
                    onPress={() => this.jump('FriendList', {sid: this.state.sid})}
                >
                    <View style={[Style.flexColumnAround, styles.menus_text_1]}>
                        {/*<View style={[styles.menus_text_2}>*/}
                        <Icons name={'user-alt'} size={30} color={Global.colors.fontColor_1}/>
                        {/*</View>*/}
                        <Text style={styles.menus_font_1}>好友</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight
                    underlayColor={'transparent'}
                    onPress={() => this.jump('GroupList', {sid: this.state.sid})}
                >
                    <View style={[Style.flexColumnAround, styles.menus_text_1]}>
                        {/*<View style={styles.menus_text_2}></View>*/}
                        <Icons name={'user-friends'} size={30} color={Global.colors.fontColor_1}/>
                        <Text style={styles.menus_font_1}>群组</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight
                    underlayColor={'transparent'}
                    onPress={() => this.jump('ChatRoomList', {sid: this.state.sid})}
                >
                    <View style={[Style.flexColumnAround, styles.menus_text_1]}>
                        <Icons name={'users'} size={30} color={Global.colors.fontColor_1}/>
                        {/*<View style={styles.menus_text_2}></View>*/}
                        <Text style={styles.menus_font_1}>聊天室</Text>
                    </View>
                </TouchableHighlight>
            </View>
        )
    };

    _listChild = () => {
        /*
         *   子列表
         */
        return (
            <View>
                <View style={[Style.blackText, {backgroundColor: Global.colors.fontColor_16}]}/>
                <TouchableHighlight underlayColor={'transparent'} onPress={() => this.jump('Chat')}>
                    <View style={[styles.list_text_1, Style.flexRowBetween]}>
                        <Image style={[styles.list_image]}
                               source={{uri: 'http://111.231.141.185/pet/image/pet-banner-1.jpg'}}/>
                        <View style={[styles.list_text_2, Style.flexColumnBetween]}>
                            <View style={[styles.list_text_3, Style.flexRowBetween]}>
                                <Text style={styles.list_font_1}>蓝猫</Text>
                                <Text style={styles.list_font_2}>05:10</Text>
                            </View>
                            <View style={[styles.list_text_3, Style.flexRowBetween]}>
                                <Text style={styles.list_font_3}>[图片]</Text>
                            </View>
                        </View>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight underlayColor={'transparent'} onPress={() => this.jump('Chat1')}>
                    <View style={[styles.list_text_1, Style.flexRowBetween]}>
                        <Image style={[styles.list_image]}
                               source={{uri: 'http://111.231.141.185/pet/image/pet-banner-2.jpg'}}/>
                        <View style={[styles.list_text_2, Style.flexColumnBetween]}>
                            <View style={[styles.list_text_3, Style.flexRowBetween]}>
                                <Text style={styles.list_font_1}>粘人的布偶</Text>
                                <Text style={styles.list_font_2}>12:10</Text>
                            </View>
                            <View style={[styles.list_text_3, Style.flexRowBetween]}>
                                <Text style={styles.list_font_3}>[图片]</Text>
                            </View>
                        </View>
                    </View>
                </TouchableHighlight>
            </View>
        )
    };

    _modalPlusSomething = () => {
        /*
         *  显示发布动态的分类
         */
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.plusSomething}
            >
                <TouchableHighlight
                    style={[styles.modal_text_1]}
                    underlayColor={'transparent'}
                    onPress={() => this.setState({plusSomething: false})}>
                    <View style={[styles.modal_text_2, Style.flexColumnCenter]}>
                        <View style={styles.modal_text_triangle}></View>
                        <TouchableHighlight
                            underlayColor={'transparent'}
                            onPress={() => this.jump('', {sid: this.state.sid})}>
                            <View style={[styles.modal_text_3, Style.flexRowCenter]}>
                                <Text style={styles.modal_text_font}>添加好友</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight
                            onPress={() => this.jump('', {sid: this.state.sid})}>
                            <View style={[styles.modal_text_3, Style.flexRowCenter]}>
                                <Text style={styles.modal_text_font}>添加群聊</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight
                            onPress={() => this.jump('', {sid: this.state.sid})}>
                            <View style={[styles.modal_text_3, Style.flexRowCenter]}>
                                <Text style={styles.modal_text_font}>添加聊天室</Text>
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
                {this._listMenu()}
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
                    {this._listChild()}
                </ScrollView>
                {this._modalPlusSomething()}
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

    //  顶部子菜单
    menus_text_1: {
        width: 80,
        height: 80,
        borderWidth: 1,
        borderColor: Global.colors.fontColor_3,
        borderRadius: 10,
    },
    menus_text_2: {
        width: 50,
        height: 50,
    },
    menus_font_1: {
        fontSize: 14,
        fontWeight: '300',
        color: Global.colors.fontColor_2
    },
    list_text_1: {
        width: Global.window.width - 15,
        height: 80,
        padding: 10,
        marginLeft: 15,
        borderBottomColor: Global.colors.fontColor_3,
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