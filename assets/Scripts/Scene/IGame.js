// const { urlEncode } = require('../Frameworks/net/scut/ISuct');

/*
 * @Author: jacklove
 * @Date: 2020-09-04 13:54:09
 * @LastEditTime: 2020-10-19 18:00:21
 * @LastEditors: jacklove
 * @Description: 
 * @FilePath: \CocosFramework-2.4\assets\Scripts\Scene\IGame.js
 */
cc.Class({
    extends: cc.Component,

    properties: {
        web_node : cc.WebView,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
    },

    start () {
        // let p = {ActionId : 3002, };
        // let p2 = {
        //     MsgId: 1,
        //     Sid: '',
        //     Uid: '',
        //     St : 'st',
        // }
        // let str = unit.ISuct.extend(p, p2);
        // unit.error('test', unit.ISuct.transData(str));

        // uLogic.SuctNetMgr.init();
    },

    // update (dt) {},
    onClickAttack()
    {
        uLogic.SuctNetMgr.wsSend(1000, {a : 1, });
    },

    onClickConnect()
    {
        uLogic.SuctNetMgr.init();
    },
});