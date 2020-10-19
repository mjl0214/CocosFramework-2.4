/*
 * @Author: jacklove
 * @Date: 2020-07-22 16:04:19
 * @LastEditTime: 2020-10-19 09:35:13
 * @LastEditors: jacklove
 * @Description: 
 * @FilePath: \NewProject_test\assets\Scripts\Model\initGame.js
 */ 

require("InitFramework")

if (window.uLogic == null) {
    window.uLogic = {};  
}

//-------------------------- common --------------------------//

// 预制体与对话框定义
import RegDef from './Common/RegDef';
uLogic.PoolID = RegDef.PoolID;
uLogic.DialogID = RegDef.DialogID;

// 支付管理器
import PayMgr from './Common/PayMgr';
uLogic.PayMgr = PayMgr;

// 支付管理器
import SuctNetMgr from './Common/SuctNetMgr';
uLogic.SuctNetMgr = SuctNetMgr;

//-------------------------- hall --------------------------//

// 大厅管理器
import HallMgr from './Hall/HallMgr';
uLogic.HallMgr = HallMgr;

// 背包管理器
import BagMgr from './Hall/BagMgr';
uLogic.BagMgr = BagMgr;

// 广播管理器
import BroadcastMgr from './Hall/BroadcastMgr';
uLogic.BroadcastMgr = BroadcastMgr;

// 邀请管理器
import ShareMgr from './Hall/ShareMgr';
uLogic.ShareMgr = ShareMgr;

// 玩家管理器
import UserMgr from './Hall/UserMgr';
uLogic.UserMgr = UserMgr;

//-------------------------- game --------------------------//

// 游戏管理器
import GameMgr from './Game/GameMgr';
uLogic.GameMgr = GameMgr;

//-------------------------- guide --------------------------//

// 引导管理器
import GuideMgr from './Guide/GuideMgr';
uLogic.GuideMgr = GuideMgr;



function __init__()
{
    unit.AudioMgr.setAudioPath('Audio');
    unit.SceneMgr.setLoading('Loading');

    // 注册预制体
    unit.PoolMgr.registerPool(uLogic.PoolID);
    // 注册对话框
    unit.DialogMgr.registerDialog(uLogic.DialogID);

    // unit.PoolMgr.debugPool();
};
__init__();