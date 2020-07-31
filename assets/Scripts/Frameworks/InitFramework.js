/*
 * @Description: In User Settings Edit
 * @Author: jacklove
 * @Date: 2019-10-14 10:43:12
 * @LastEditors: jacklove
 * @LastEditTime: 2020-07-30 12:34:31
 */

console.log('InitFramework')

//-------------------------- uTool --------------------------//
if (window.uTool == null) {
    window.uTool = {};  
}

console.log('Init uTool')

import md5 from './tool/md5';
uTool.md5 = md5;

import UtilMgr from './tool/UtilMgr';
uTool.UtilMgr = UtilMgr;

import base64 from './tool/base64';
uTool.Base64 = base64.Base64;

import IDCard from './tool/IDCard';
uTool.IDCard = IDCard;

//-------------------------- unit --------------------------//
if (window.unit == null) {
    window.unit = {};  
}

console.log('Init unit')
// u_sys
import USystem from './helper/USystem';
unit.sys = USystem;
unit.sys.info();

// log
import LogMgr from './manager/LogMgr';
// unit.log = LogMgr.log.bind(LogMgr);
// unit.warn = LogMgr.warn.bind(LogMgr);
// unit.error = LogMgr.error.bind(LogMgr);
unit.log = function (tag, ...subst) {
    LogMgr.log(tag, ...subst);
};
unit.warn = function (tag, ...subst) {
    LogMgr.warn(tag, ...subst);
};
unit.error = function (tag, ...subst) {
    LogMgr.error(tag, ...subst);
};
unit.LogMgr = LogMgr;

// DataMgr
import DataMgr from './manager/DataMgr';
unit.DataMgr = DataMgr;

// DataMgr
import TimerMgr from './manager/TimerMgr';
unit.TimerMgr = TimerMgr;

// HotUpdate
import HotUpdateMgr from './manager/HotUpdateMgr';
unit.HotUpdateMgr = HotUpdateMgr;

import HotUpExMgr from './manager/HotUpExMgr';
unit.HotUpExMgr = HotUpExMgr;

// 着色器
import ShaderMgr from './shader/ShaderMgr';
unit.ShaderMgr = ShaderMgr;
import ShaderDef from './shader/ShaderDef';
unit.EffectDef = ShaderDef.EffectDef;

// 全局事件
import GlobalEvent from './manager/GlobalEvent';
unit.GlobalEvent = GlobalEvent;

// 事件管理
import EventMgr from './event/EventMgr';
unit.EventMgr = EventMgr;

// 线程管理
import ThreadMgr from './thread/ThreadMgr';
unit.ThreadMgr = ThreadMgr;

// 内存
import MemoryDetector from './manager/MemoryDetector';
unit.MemoryDetector = MemoryDetector;

// 资源管理
import ResMgr from './manager/ResMgr';
unit.ResMgr = ResMgr;

// Audio
import AudioMgr from './manager/AudioMgr';
unit.AudioMgr = AudioMgr;

// 加载管理
import LoadMgr from './manager/LoadMgr';
unit.LoadMgr = LoadMgr;

// 场景管理
import SceneMgr from './manager/SceneMgr';
unit.SceneMgr = SceneMgr;

// 预制体管理
import PoolMgr from './manager/pool/PoolMgr';
unit.PoolMgr = PoolMgr;

import PoolDef from './manager/pool/PoolDef';
unit.PoolDef = PoolDef;

// 对话框管理
import DialogMgr from './manager/dialog/DialogMgr';
unit.DialogMgr = DialogMgr;

import DialogDef from './manager/dialog/DialogDef';
unit.DialogDef = DialogDef;

// MVC管理器
import MVMgr from './mvc/MVMgr';
unit.MVMgr = MVMgr;

import MVDef from './mvc/MVDef';
unit.MVDef = MVDef;

import BundleMgr from './manager/BundleMgr';
unit.BundleMgr = BundleMgr;

// HTTP
import IHttp from './net/IHttp';
unit.IHttp = IHttp;

// Platform
import PlatformHelper from './helper/PlatformHelper';
unit.PlatformHelper = PlatformHelper;

// 多语言
import InterMgr from './helper/ui18n/InterMgr';
unit.InterMgr = InterMgr;

// 多语言
import CocosHelper from './helper/CocosHelper';
unit.CocosHelper = CocosHelper;

// SDK
import SDKMgr from './sdk/SDKMgr';
unit.SDKMgr = SDKMgr;

import SDKEvtDef from './sdk/SDKEvtDef';
unit.SDKEvtDef = SDKEvtDef;

// Transition
import Transition from './helper/Transition';
unit.Transition = Transition;

// GuideHelper
import GuideHelper from './helper/guide/GuideHelper';
unit.GuideHelper = GuideHelper;

// PokoMgr
import PakoMgr from './helper/gzip/PakoMgr';
unit.PakoMgr = PakoMgr;

unit.init = function () {
    unit.ShaderMgr.init();
    unit.InterMgr.init();
    unit.SDKMgr.init();
    unit.IHttp.isLog(0);
    unit.InterMgr.setLanguage('zh');
    unit.LogMgr.setPrint(true);
}
