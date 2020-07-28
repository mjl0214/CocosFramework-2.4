/*
 * @Author: jacklove
 * @Date: 2019-12-21 11:05:49
 * @LastEditTime: 2020-07-28 15:25:41
 * @LastEditors: jacklove
 * @Description: 
 * @FilePath: \NewProject_test\assets\Scripts\Frameworks\sdk\SDKMgr.js
 */

let Wechat = require("Wechat")
let TTAd = require("TTAd")

module.exports = {
    USDK_API : 'uSDK',
    USDKMGR_API : 'uSDK/SDKManager',
    UTOOl_API : 'uSDK/tools/ToolUtil',
    COCOS_API : 'org/cocos2dx/javascript/AppActivity',
    WECHAT_API : 'uSDK/apis/wechat/WeChat',
    TTAD_API : 'uSDK/apis/ttad/TTAd',
    TALK_API : 'uSDK/apis/talkingdata/TalkData',
    OPENINS_API : 'uSDK/apis/openInstall/OpenIns',

    sdk_map : new Object(),

    init()
    {
        this.sdk_map = new Object();
        this.pushSDK(Wechat);
        this.pushSDK(TTAd);
    },

    pushSDK(clsName)
    {
        var obj = new clsName();
        obj.init();
        this.sdk_map[obj.sdk_name] = obj;
    },

    getSDK(name)
    {
        return this.sdk_map[name];
    },

    listen(type, callback, cls, priority = 0) 
    {
        unit.EventMgr.listen_s('_sdk_event_', type, callback, cls, priority);
    },

    dispatch(type, data)
    {
        unit.EventMgr.dispatch_s('_sdk_event_', type, data);
    },

    // 微信方法
    callWechatMethod(method_name, return_name, ...params)
    {
        return this._callStaticMethod(this.WECHAT_API, method_name, return_name, ...params);
    },

    // ttad方法
    callTTADMethod(method_name, return_name, ...params)
    {
        return this._callStaticMethod(this.TTAD_API, method_name, return_name, ...params);
    },

    // Cocos工具方法
    callCocosMethod(method_name, return_name, ...params)
    {
        return this._callStaticMethod(this.COCOS_API, method_name, return_name, ...params);
    },

    // 工具方法
    callToolMethod(method_name, return_name, ...params)
    {
        return this._callStaticMethod(this.UTOOl_API, method_name, return_name, ...params);
    },
    
    _callStaticMethod(class_name, method_name, return_name, ...params)
    {
        var value = unit.PlatformHelper.callStaticMethod(class_name, method_name, return_name, ...params);
        return value;
    },

    callMethod(class_name, method_name, return_name, ...params)
    {
        return this._callStaticMethod(class_name, method_name, return_name, ...params);
    },

    onRegisterCallback(method_name, return_name, callback_method)
    {
        unit.PlatformHelper.callStaticMethod(this.UTOOl_API, 'registerCall', return_name, method_name, callback_method);
    },
};

// module.exports.__init__();