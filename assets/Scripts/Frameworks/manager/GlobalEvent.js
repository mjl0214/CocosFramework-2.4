/*
 * @Description: In User Settings Edit
 * @Author: jacklove
 * @Date: 2019-11-15 17:29:36
 * @LastEditors: jacklove
 * @LastEditTime: 2020-08-13 16:24:06
 */

module.exports = {
    __init__()
    {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    },

    onKeyDown(event)
    {
        switch (event.keyCode) {
            case cc.macro.KEY.escape:
                unit.ResMgr._logger();
                break;
            case cc.macro.KEY.tab:
                unit.CocosHelper.treeNode();
                break;
            case cc.macro.KEY.s:
                unit.RecordMgr.startRecord();
                break;
            case cc.macro.KEY.e:
                unit.RecordMgr.endRecord();
                break;
            case cc.macro.KEY.r:
                unit.RecordMgr.popRecord();
                break;
            case cc.macro.KEY.t:
                unit.RecordMgr.tokenRecord();
                break;
            default:
                break;
        }
    },
};
module.exports.__init__();