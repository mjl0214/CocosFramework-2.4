/*
 * @Author: jacklove
 * @Date: 2020-07-22 16:13:00
 * @LastEditTime: 2020-10-19 09:29:54
 * @LastEditors: jacklove
 * @Description: 
 * @FilePath: \NewProject_test\assets\Scripts\Dialog\DialogTest.js
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
        console.log('DialogTest', this.node.zIndex);
        unit.EventMgr.dispatch_s('test', 'test', {data : uTool.UtilMgr.random2Int(1, 1000)});
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
