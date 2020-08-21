/*
 * @Author: jacklove
 * @Date: 2020-07-24 13:40:08
 * @LastEditTime: 2020-08-13 10:23:19
 * @LastEditors: jacklove
 * @Description: 
 * @FilePath: \NewProject_test\assets\Scripts\Scene\Game\Game.js
 */ 
cc.Class({
    extends: cc.Component,

    properties: {
        layer_fish:
        {
            default: null,
            type : cc.Node,
            tooltip : '进度',
        },
        sp_box:
        {
            default: null,
            type : sp.Skeleton,
            tooltip : '进度',
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        unit.MemoryDetector.showMemoryStatus();
        cc.debug.setDisplayStats(true);

        this._idxSp = 0;

        this._spList = [
            {url : 'Spine/xiangzi', aniName : 'kai1'},
            {url : 'Spine/yaoyiyao', aniName : 'animation'},
            {url : 'Spine/yu1', aniName : 'yu'},
        ];
    },

    start () {
        unit.ResMgr._logger();
    },

    // update (dt) {},
    onClickTo()
    {
        unit.SceneMgr.loadingScene('Hall');
    },

    onClickFish()
    {
        unit.PoolMgr.getPerfab(uLogic.PoolID[uLogic.PoolID.pool_fish], (fish)=>{
            this.layer_fish.addChild(fish);
            fish.setPosition(uTool.UtilMgr.random2Int(-300, 300), uTool.UtilMgr.random2Int(-600, 600));
        });

        unit.MVMgr.dispatch(uLogic.MVDef.gold, {str : 12});
    },

    onClickRemoveAll()
    {
        unit.PoolMgr.recAllUsedPerfab(uLogic.PoolID[uLogic.PoolID.pool_fish]);
    },

    onClickRepSkel()
    {

        this._idxSp++;
        if (this._idxSp >= this._spList.length) {
            this._idxSp = 0;
        }

        // var send_data = {
        //     player : {
        //         test_spine : [
        //             this._spList[this._idxSp].url, 
        //             {
        //                 trackIndex : 0,
        //                 name : this._spList[this._idxSp].aniName,
        //             }
        //         ],
        //     },
        // }
        // unit.MVMgr.dispatch(send_data);

        var play_data = {
            trackIndex : 0,
            name : this._spList[this._idxSp].aniName,
        };
        unit.MVMgr.dispatchSkel('player.test_spine', this._spList[this._idxSp].url, play_data);
    },
});