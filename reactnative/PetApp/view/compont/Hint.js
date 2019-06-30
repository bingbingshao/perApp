/**
 * Created by bingPo on 2018/11/14.
 */
import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    View,
    Text
} from 'react-native';
import Global from './Global';
export default class Hint extends Component {

    constructor(props) {
        super(props);
        this.state={
            show:false,
            text:'',
        }
    }
    componentWillMount() {
        this.timeHint && clearTimeout(this.timeHint );
    }
    showInform(text){
        // console.log("text",text);
        this.setState({
            show:true,
            text:text,
        });

        this.timeHint = setTimeout(()=>{
            this.setState({show:false,text:''});
            clearTimeout(this.timeHint);
        },1000)
    }

    render() {
        return (
            <View style={[styles.hint,styles.flexRowCenter,{display:this.state.show ? 'flex':'none'}]}>
                <View style={styles.hintCenter}>
                    <Text style={styles.hintFont}>{this.state.text}</Text>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    hint: {
        position: 'absolute',
        left: 0,
        top: Global.window.height * 0.85,
        width: Global.window.width,
    },
    hintCenter: {
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: 'rgba(0,0,0,1)',
        borderRadius: 5,
    },
    hintFont: {
        fontSize: 14,
        color: '#fff',
        fontWeight:'500'
    },
    flexRowCenter:{
        display:'flex',
        justifyContent:'center',
        flexDirection:'row',
        alignItems:'center',
    },
});