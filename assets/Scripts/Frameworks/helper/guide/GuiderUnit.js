/*
 * @Author: jacklove
 * @Date: 2020-04-23 09:39:01
 * @LastEditTime: 2020-04-23 09:59:34
 * @LastEditors: jacklove
 * @Description: 
 * @FilePath: \client\assets\Scripts\Frameworks\helper\guide\GuiderUnit.js
 */

cc.Class({
    extends: cc.Component,

    properties: {
        node_id:
        {
            default: 0,
            type : cc.Integer,
            tooltip : '节点id',
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        unit.GuideHelper.setNodeID(this.node, this.node_id);
    },

    start () {

    },

    // update (dt) {},
});
