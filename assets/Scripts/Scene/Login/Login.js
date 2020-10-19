/*
 * @Author: jacklove
 * @Date: 2020-07-22 11:35:50
 * @LastEditTime: 2020-09-04 14:24:34
 * @LastEditors: jacklove
 * @Description: 
 * @FilePath: \NewProject_test\assets\Scripts\Scene\Login\Login.js
 */
cc.Class({
    extends: cc.Component,

    properties: {
        lbl_version:
        {
            default: null,
            type : cc.Label,
            tooltip : '进度',
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        unit.MemoryDetector.showMemoryStatus();

        this.lbl_version.string = gConfig.CLIENT_VERSION;
    },

    start () {
        unit.ResMgr._logger();

        console.error(uTool.UtilMgr.str2bytes('我是傻逼'));

        unit.IHttp.isLog(1);
    },

    // update (dt) {},
    onClickTo()
    {
        unit.SceneMgr.loadingScene('Hall');
        // var url = 'http://122.51.207.156:9501/' + 'user/login';
        // var params = {
        //     type : 2,
        //     username : '我',
        // };

        // var headers = {
        //     'Content-Type' : 'application/json',
        //     // 'Access-Control-Allow-Origin' : '*',
        //     // 'Access-Control-Request-Method' : '*',
        // }

        // var sParams = JSON.stringify(params);
        // unit.IHttp.post(url, sParams, (resp)=>{
        //     console.error(resp)
        // }, null, headers);
    },
});
