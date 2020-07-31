/*
 * @Author: jacklove
 * @Date: 2020-07-22 11:35:50
 * @LastEditTime: 2020-07-31 14:45:19
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
    },

    // update (dt) {},
    onClickTo()
    {
        unit.SceneMgr.loadingScene('Hall');
    },
});
