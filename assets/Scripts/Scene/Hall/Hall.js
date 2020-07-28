/*
 * @Author: jacklove
 * @Date: 2020-07-24 11:17:23
 * @LastEditTime: 2020-07-28 15:37:42
 * @LastEditors: jacklove
 * @Description: 
 * @FilePath: \NewProject_test\assets\Scripts\Scene\Hall\Hall.js
 */ 

cc.Class({
    extends: cc.Component,

    properties: {
        img_test:
        {
            default: null,
            type : cc.Sprite,
            tooltip : '粒子节点',
        },

        img_bg:
        {
            default: null,
            type : cc.Sprite,
            tooltip : '粒子节点',
        },

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
        console.error('onDialogEvent', data.data);
    },

    onEventTest(data)
    {
        console.error('onTest', data);
        unit.EventMgr.removeAll_s('test');
        // setTimeout(() => {
        //     unit.EventMgr.removeAll_s('test');
        // }, 0);
    },

    start () {
        cc.debug.setDisplayStats(true);

        unit.error('isLoadPack', unit.BundleMgr.isLoadPack('testgame'));
    },

    onDestroy()
    {
    },

    // update (dt) {},
    onClickLoad()
    {
        unit.ResMgr.replaceFrame(this.img_test, 'Texture/pack/common', 'tu4', ()=>{
            unit.ResMgr._logger();
        });
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
        
        unit.ResMgr.replaceFrame(this.img_bg, this._spList[this._idxSp].url, null, ()=>{
        });
    },

    onClickHead()
    {
        var url = 'http://thirdwx.qlogo.cn/mmopen/vi_32/CSFHlofer5mgZmoqv43PjBmtSjkMxIfytle66bLn5yAYGoa5HKJ8vIaMqCMiahWibUJnlMicHc5Azx7OZSZAcpNIQ/132';
        unit.ResMgr.webImage(url, this.img_head);
    },

    onClickLoadBundle()
    {
        unit.BundleMgr.loadPackScene('testgame', 'testgame', (asset)=>{
            unit.SceneMgr.loadingScene(asset);
            // console.error(asset instanceof );
            console.error(asset);
        });
    },

});
