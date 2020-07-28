/*
 * @Description: In User Settings Edit
 * @Author: jacklove
 * @Date: 2019-11-15 17:29:36
 * @LastEditors: jacklove
 * @LastEditTime: 2020-07-23 17:56:05
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
            case cc.macro.KEY.t:
                uTool.UtilMgr.treeNode();
                break;
            default:
                break;
        }
    },
};
module.exports.__init__();