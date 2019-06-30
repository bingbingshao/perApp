/**
 * Created by ljunb on 16/6/2.
 */
import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    ActivityIndicator,
} from 'react-native';

import Global from './Global';

export default class Loading extends React.Component {

    render() {
        return (
            <View style={styles.loading}>
                <ActivityIndicator color="white"/>
                <Text style={styles.loadingTitle}>加载中……</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    loading: {
        backgroundColor: 'rgba(0,0,0,0.7)',
        height: 80,
        width: 100,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: (Global.window.height-80)/2,
        left: (Global.window.width-100)/2,
    },

    loadingTitle: {
        marginTop: 10,
        fontSize: 14,
        color: 'white'
    }
})