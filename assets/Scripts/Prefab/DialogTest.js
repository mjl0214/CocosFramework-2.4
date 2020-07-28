/*
 * @Author: jacklove
 * @Date: 2020-07-22 16:13:00
 * @LastEditTime: 2020-07-28 15:33:57
 * @LastEditors: jacklove
 * @Description: 
 * @FilePath: \NewProject_test\assets\Scripts\Prefab\DialogTest.js
 */ 

let DialogBase = require("DialogBase")

cc.Class({
    extends: DialogBase,

    properties: {

    },

    // onLoad () {},

    start () {

    },

    onEnter(params)
    {// 对话框被激活时
        // console.log('DialogBase onEnable');
        unit.EventMgr.dispatch_s('test', 'test', {data : 12});
    },

    onLeave()
    {// 对话框被关闭时
        // console.log('DialogBase onDisable');
    },

    stateEvent(eventid)
    {

    },

    // update (dt) {},
});
