/**
 * Created by ruiwang on 2017/7/27.
 */
'use strict';
import React, {Component} from 'react';
import  {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Modal,
    Image,
    NativeModules
} from 'react-native';
var RCTDeviceEventEmitter = require('RCTDeviceEventEmitter');
import {Basic, Color, Global, Actions, AppDevice, Filter, CMIcons, CMMessageBox} from 'LocalReference';
var deviceWidth = AppDevice.screenWidth();
var deviceHeight = AppDevice.screenHeight();
var minWidth = AppDevice.minWidth();
var isIos = Global.isIOS();
export default class QRCodeModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
        }
    }
    showModal() {
        this.setState({
            modalVisible: true,
        })
    }

    hideModal() {
        this.setState({
            modalVisible: false,
        })
    }

    render() {
        return (
            <Modal
                animationType={'fade'}
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                    this.hideModal();
                }}>
                <View style={[styles.modal, {opacity: 1}]}>
                    <View style={styles.modalInnerContainer}>
                        <View style={styles.viewContainer}>
                            <View style={styles.topView}>
                                <View style={styles.topViewOne}>
                                    <View style={styles.topViewTwo}><Text style={styles.topViewTwoText}>{this.props.bankRepairName}</Text><Text style={styles.white}>正在维护</Text></View>
                                    <Text style={styles.topText}>暂不支持交易</Text>
                                </View>
                                <View style={styles.topThreeView}>
                                </View>
                                <Image style={styles.imageView} source={require('../../content/img/loan/gear.png')} />
                                <TouchableOpacity onPress={() => {this.hideModal()}} style={styles.touchableView}>
                                    <View>
                                        <CMIcons name="icon-close" size={20} color='#1368be'></CMIcons>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.middleView}>
                                <Text style={styles.middleViewText}>{this.props.bankRepairTitle}</Text>
                            </View>
                            <View>
                                <TouchableOpacity style={[styles.touchBtn, styles.borderRight]} onPress={()=> {
                                    this.hideModal();
                                }}>
                                    <View style={styles.btnView}>
                                        <Text style={[styles.touchText, {color: Color.CM_WhiteColor}]}>我知道了</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        backgroundColor: Color.CM_Translucent,
        justifyContent: 'center',
        alignItems:'center',
    },
    modalInnerContainer: {
        backgroundColor: Color.CM_PopupBgColor,
        // position: 'absolute',
        // left: (deviceWidth-285)/2,
        // right: (deviceWidth-285)/2,
        // left: 30,
        // right: 30,
        borderRadius: 6,
        width:285,
        justifyContent: 'center',
        alignItems:'center',
    },
    viewContainer: {
        justifyContent: 'center',
        alignItems:'center',
        width:285
    },
    topView: {
        justifyContent: 'center',
        borderBottomColor: Color.CM_BorderColor,
        borderBottomWidth: AppDevice.minWidth(),
        height:60,
        // paddingTop:15,
        // paddingBottom:15,
        alignItems: 'center',
        backgroundColor:Color.CMHeaderBgColor,
        borderTopLeftRadius:6,
        borderTopRightRadius:6,
        flexDirection:'row',
        position:'relative'
    },
    topViewOne:{
        flex:4,
        alignItems:'center'
    },
    topViewTwo:{
        flexDirection:'row',
        alignItems:'center',
        height:20
    },
    topViewTwoText:{
        color:'white',
        fontWeight:'800',
        fontSize:15
    },
    topText:{
        color:'white',
        paddingTop:5,
        fontSize:15,
    },
    topThreeView:{
        flex:1
    },
    middleView: {
        paddingVertical:25,
        paddingHorizontal:15,
        minHeight:85
        //这里的85是(50+70+50)/2
        //react native中的盒模型是：width+border
        //padding是内减在width里面了
    },
    middleViewText:{
        lineHeight:20,
        textAlign:'justify',
        color:'#333',
        fontSize:14
    },
    imageView:{
        position:'absolute',
        width:60,
        height:27.85,
        bottom:0,
        right:35
    },
    white: {
        color: 'white',
        fontSize:15
    },
    touchableView:{
        padding:10,
        position:'absolute',
        top:0,
        right:0
    },
    touchBtn: {
        paddingBottom:25,
        justifyContent: 'center',
        alignItems: 'center'
    },
    touchText: {
        fontSize: 15
    },
    btnView:{
        width:170,
        alignItems:'center',
        borderRadius:20,
        height:35,
        justifyContent:'center',
        backgroundColor: Color.CMHeaderBgColor,

        shadowOffset: {width: 0, height: 5},
        shadowOpacity: 0.5,
        shadowRadius: 5,
        //注意：这一句是可以让安卓拥有灰色阴影
        //elevation: 4,
        shadowColor: Color.CMHeaderBgColor,
        zIndex: Global.isIOS() ? 1 : 0
    }
});
