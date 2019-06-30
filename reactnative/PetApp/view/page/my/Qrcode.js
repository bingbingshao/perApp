/**
 * Created by bingPo on 2018/11/21.
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
    Image, AsyncStorage
} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Style from '../../css/Style';
import ETTStatus from "../../compont/ETTStatus"
import Global from '../../compont/Global';
import Hint from '../../compont/Hint';
import Loading from '../../compont/Loading';
import QRCode from 'react-native-qrcode-svg';


export default class Qrcode extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            pic: '',
            login_id: "11111",
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
                    login_id: json
                });
            }
        });

        let pic = this.props.navigation.state.params.pic;
        this.setState({
            pic: pic
        })
    }

    /*
     * 点击事件
     */

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
                            <Text style={[Style.barText, Style.font_1]}>我的二维码</Text>
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
         *  我的二维码
         */

        let login_id = this.state.login_id;

        return (
            <View style={[Style.flexRowCenter, {marginTop: Global.window.height * 0.15}]}>
                <View style={styles.text_1}>
                    <QRCode
                        value={login_id}
                        logo={this.state.pic}
                        logoBorderRadius={1}
                        color={'#111'}
                        backgroundColor={'#fff'}
                        logoSize={(Global.window.width - 50) * 0.2}
                        size={Global.window.width - 50}
                    />
                </View>
            </View>
        )
    };

    render() {

        return (
            <View style={[styles.contains]}>
                {this._nav()}

                {this._list()}
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
        width: Global.window.width - 50,
        height: Global.window.width - 50,
        shadowColor: Global.colors.fontColor_7,
        shadowOpacity: 0.4,
        shadowRadius: 2,
        shadowOffset: {width: 3, height: 2},
        backgroundColor: '#fff'
    }

});
