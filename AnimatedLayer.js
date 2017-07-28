/**
 * Created by ruiwang on 2017/7/19.
 */
'use strict';
import React, {Component} from "react";
import {TouchableOpacity, Image, Text, StyleSheet, ScrollView, View, Animated, Keyboard} from "react-native";
import {CMModal, AppDevice, Color, CMTextInput, Config, Filter, Global,CMIcons} from "LocalReference";
//import {BoxShadow} from 'react-native-shadow';
var deviceWidth = AppDevice.screenWidth();
var deviceHeight = AppDevice.screenHeight();
var modalHeight = deviceWidth - 80;
var padLeft = (modalHeight - deviceWidth * 0.72 + 20) / 2;
var timeID;
let styles = StyleSheet.create({
    modal: {
        flex: 1,
        backgroundColor: Color.CM_Translucent,
    },
    modalInnerContainer: {
        backgroundColor: Color.CM_PopupBgColor,
        position: 'absolute',
        left: (deviceWidth-285)/2,
        right: (deviceWidth-285)/2,
        // left: 30,
        // right: 30,
        borderRadius: 6,
    },
    viewContainer: {
        justifyContent: 'center',
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

export  default  class extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            bottom: new Animated.Value(0),
            BgOpacity: new Animated.Value(0),
            boxHeight: deviceHeight*0.5 - 107,
        }
    }

    _boxLayout(event){
        this.setState({
            boxHeight : event.nativeEvent.layout.height
        })
    }

    showModal() {
        var _this = this;
        var bottom = deviceHeight*0.5 - this.state.boxHeight*0.5;
        this.CMModal.showModal(function () {
            Animated.timing(          // Uses easing functions
                _this.state.BgOpacity,    // The value to drive
                {toValue: 1, duration: 300}            // Configuration
            ).start();
            Animated.timing(          // Uses easing functions
                _this.state.bottom,    // The value to drive
                {toValue: bottom, duration: 300}            // Configuration
            ).start(
            );
        });
    }

    hideModal() {
        //清空密码框
        clearTimeout(timeID);
        var _this = this;
        Animated.timing(          // Uses easing functions
            this.state.bottom,    // The value to drive
            {toValue: 0, duration: 10}            // Configuration
        ).start();
        Animated.timing(          // Uses easing functions
            this.state.BgOpacity,    // The value to drive
            {toValue: 0, duration: 10}            // Configuration
        ).start(
            ()=> {
                _this.CMModal.hideModal();
            }
        );
    }


    render() {
        //这一块是为了做安卓的彩色阴影加了react-native-shadow,未成功，但是不要删除
        //const shdowOpt = {
        //     width:0,
        //     borderRadius:20,
        //     height:50,
        //     border:0,
        //     radius:0,
        //     opacity:0.5,
        //     x:0,
        //     y:0,
        //     style:{marginVertical:5,alignItems:'center',justifyContent:'center',marginLeft:deviceWidth*0.4}
        // }
        return (
            <CMModal
                ref={(refs)=> {
                    this.CMModal = refs
                }}
            >
                <Animated.View style={[styles.modal, {opacity: this.state.BgOpacity}]}>
                    <Animated.View
                        style={[styles.modalInnerContainer, {bottom: this.state.bottom}]}>
                        <View style={styles.viewContainer} onLayout={this._boxLayout.bind(this)} >
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
                                {/*<BoxShadow setting={shdowOpt}>*/}
                                    <TouchableOpacity style={[styles.touchBtn, styles.borderRight]} onPress={()=> {
                                    this.hideModal();
                                }}>
                                        <View style={styles.btnView}>
                                            <Text style={[styles.touchText, {color: Color.CM_WhiteColor}]}>我知道了</Text>
                                        </View>
                                    </TouchableOpacity>
                                {/*</BoxShadow>*/}

                            </View>
                        </View>
                    </Animated.View>
                </Animated.View>
            </CMModal>
        )
    }
}