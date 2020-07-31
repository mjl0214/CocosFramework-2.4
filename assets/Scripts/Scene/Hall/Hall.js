/*
 * @Author: jacklove
 * @Date: 2020-07-24 11:17:23
 * @LastEditTime: 2020-07-31 17:05:42
 * @LastEditors: jacklove
 * @Description: 
 * @FilePath: \NewProject_test\assets\Scripts\Scene\Hall\Hall.js
 */ 

cc.Class({
    extends: cc.Component,

    properties: {
        img_head:
        {
            default: null,
            type : cc.Sprite,
            tooltip : '粒子节点',
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        unit.init();
        unit.MemoryDetector.showMemoryStatus();

        this._idxSp = 0;

        this._spList = [
            {url : 'Texture/unpack/map_01'},
            {url : 'Texture/unpack/login_bg'},
        ];

        unit.EventMgr.listen_s('test', 'test', this.onEventTest, this, 0);
        unit.DialogMgr.listen(this.onDialogEvent, this, 0);
    },

    onDialogEvent(data)
    {
        console.warn('onDialogEvent', data.data);
    },

    onEventTest(data)
    {
        console.warn('onTest', data);
        // unit.EventMgr.removeAll_s('test');
    },

    start () {
        cc.debug.setDisplayStats(false);

        unit.error('isLoadPack', unit.BundleMgr.isLoadPack('testgame'));
        unit.error('isCachePack', unit.BundleMgr.isCachePack('testgame'));

        console.error(unit.CocosHelper.findNodePath(this.img_head));
    },

    onDestroy()
    {
    },

    // update (dt) {},
    onClickLoad()
    {
        // unit.ResMgr.replaceFrame(this.img_test, 'Texture/pack/common', 'tu4', ()=>{
        //     unit.ResMgr._logger();
        // });
        // var send_data = {
        //     player : {
        //         // test1 : v1,
        //         img_test : ['Texture/pack/common', 'tu4'],
        //     },
        // }
        // unit.MVMgr.dispatch(send_data);
        unit.MVMgr.dispatchSprite('player.img_test', 'Texture/pack/common', 'tu4');
    },

    onClickRelease()
    {
        unit.ResMgr.releaseZero();
    },

    onClickUnload()
    {
        unit.ResMgr.releaseAsset('Texture/pack/common', cc.SpriteAtlas);
    },

    onClickRemove()
    {
        unit.DialogMgr.showDialog(uLogic.DialogID.dialog_test);
    },

    onClickTo()
    {
        unit.SceneMgr.loadingScene('Game');
    },

    onClickChangeBg()
    {
        this._idxSp++;
        if (this._idxSp >= this._spList.length) {
            this._idxSp = 0;
        }
        
        // var send_data = {
        //     game : {
        //         // test1 : v1,
        //         img_bg : [this._spList[this._idxSp].url, null],
        //     },
        // }
        // unit.MVMgr.dispatch(send_data);
        unit.MVMgr.dispatchSprite('game.img_bg', this._spList[this._idxSp].url, null);
    },

    onClickHead()
    {
        var url = 'http://thirdwx.qlogo.cn/mmopen/vi_32/CSFHlofer5mgZmoqv43PjBmtSjkMxIfytle66bLn5yAYGoa5HKJ8vIaMqCMiahWibUJnlMicHc5Azx7OZSZAcpNIQ/132';
        unit.ResMgr.webImage(url, this.img_head);
    },

    onClickLoadBundle()
    {
        var pack_url = 'http://down.51v.cn/MiniGames/kxnc/test/testgame';
        // var pack_url = 'testgame';

        if (!unit.BundleMgr.isLoadPack('testgame')) {
            unit.BundleMgr.loadPack(pack_url, (asset)=>{
            });            
        }
    },

    onClickToPack()
    {
        if (unit.BundleMgr.isLoadPack('testgame')) {
            unit.SceneMgr.loadingScene('testgame');           
        }
    },

    onClickChangeLabel()
    {
        var v1 = uTool.UtilMgr.random2Int(1, 1000);
        var v2 = uTool.UtilMgr.random2Int(1, 1000);
        // var send_data = {
        //     player : {
        //         test1 : v1,
        //         test2 : v2,
        //     },
        // }
        // unit.MVMgr.dispatch(send_data);
        unit.MVMgr.dispatchLabel('player.test1', v1);
        unit.MVMgr.dispatchLabel('player.test2', v2);

        unit.MVMgr.dispatchLabel('player.hp', v1<v2?v1/v2:v2/v1);
    },
});
