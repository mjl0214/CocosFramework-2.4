/*
 * @Author: jacklove
 * @Date: 2020-07-27 13:47:57
 * @LastEditTime: 2020-07-27 15:54:09
 * @LastEditors: jacklove
 * @Description: 
 * @FilePath: \NewProject_test\assets\testgame\script\testgame.js
 */ 

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},

    onClickTo()
    {
        unit.SceneMgr.loadingScene('Hall');
    },
    
});
