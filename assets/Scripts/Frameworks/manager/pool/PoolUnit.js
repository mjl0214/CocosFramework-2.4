/*
 * @Description: 池节点可视化组件
 * @Author: jacklove
 * @LastEditors: Please set LastEditors
 * @Date: 2019-04-12 08:51:20
 * @LastEditTime: 2020-03-22 17:38:15
 */

let PoolMgr = require('PoolMgr')

cc.Class({
    extends: cc.Component,

    properties: {

        __pool_name__ : {
            default: '', 
            tooltip : "Pool Name",
            visible : false,
        },

        poolNameEx : {
            default : '',
            visible() {
                return (this.custom == true);
            },
            displayName : 'Pool Name',
        },

        custom : {
            default : false,
            tooltip : '自定义poolName',
        },

        poolNum : {
            default : 1,
            type : cc.Integer,
            tooltip : '预制体池初始化数量',
            // serializable: true, 
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // console.log('name' + PoolDef[this.poolName]);
    },

    onDestroy()
    {
        // console.error('DialogBase onDestroy', this)
        PoolMgr.removeUsedPerfab(this.getPoolName(), this.node);
    },

    getPoolName()
    {
        return this.__pool_name__;
    },

    setPoolName(pool_name)
    {
        this.__pool_name__ = pool_name;
    },

    start () {
        // console.log(this);
    },

    // update (dt) {},
});
