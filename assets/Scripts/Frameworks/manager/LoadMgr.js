/*
 * @Description: In User Settings Edit
 * @Author: jacklove
 * @Date: 2019-10-21 14:12:07
 * @LastEditors  : jacklove
 * @LastEditTime : 2020-01-01 11:35:40
 */

let ResMgr = require("ResMgr")

module.exports = {
    m_loadResQueue : new Array(),   // 要加载的文件列表
    m_loadAmount : 0,
    m_loadIndex : 0,
    m_loadType : 'one',
    m_loadUseTime : 0,
    m_loadSucceedNum : 0,
    m_loadFailureNum : 0,
    m_completeFunc : null,
    m_progressFunc : null,
    
    // 清空加载列表
    clearQueue()
    {
        this.m_loadResQueue.length = 0;
    },

    stopLoading()
    {
        this.m_completeFunc = null;
        this.m_progressFunc = null;

        this.m_loadResQueue.length = 0;

        if (this.m_frameLoadHandler) {
            clearTimeout(this.m_frameLoadHandler);
        }
        this.m_frameLoadHandler = null;
    },

    isLoadingAsset()
    {
        return ResMgr.getLoadingCount() > 0;
    },

    // 开始加载资源
    loadRes(completeFunc, progressFunc, loadtype = 'one')
    {
        this.m_completeFunc = completeFunc;
        this.m_progressFunc = progressFunc;

        this.m_loadSucceedNum = 0;
        this.m_loadFailureNum = 0;
        this.m_loadAmount = 0;
        this.m_loadUseTime = Date.now();

        if (this.m_loadResQueue.length <= 0) {
            this._loadEndInfo();
            if (this.m_progressFunc) {
                this.m_progressFunc(1);
            }
            if (this.m_completeFunc) {
                this.m_completeFunc();
            }
            return;
        }

        this.m_loadType = loadtype;
        if (loadtype == 'one') {
            this._loadOneByOne();
        } else {
            this._startLoadByFrame();
        }
    },

    // 开启按帧加载
    _startLoadByFrame()
    {
        this.m_loadIndex = 0;
        this.m_frames = cc.director.getTotalFrames();

        var self = this;
        function check_load() {
            if (cc.director.getTotalFrames() != self.m_frames) {
                self.m_frames = cc.director.getTotalFrames();
                for (let i = 0; i < 3; i++) {
                    self.loadByFrame();
                }
            }
            if (self.m_loadIndex < self.m_loadResQueue.length) {
                self.m_frameLoadHandler = setTimeout(check_load, cc.director.getDeltaTime());
            }
            else
            {
                self.m_frameLoadHandler = null;
            }
        }

        this.m_frameLoadHandler = setTimeout(check_load, cc.director.getDeltaTime());
    },

    // 添加要加载的资源
    addRes(url, type)
    {
        if (url == undefined || url == null ) {
            unit.error('load resource url is null')
            return;
        }

        this.m_loadResQueue.push({url : url, type : type, });
    },

    // 添加要加载的资源
    addStaticRes(url, type)
    {
        if (url == undefined || url == null ) {
            unit.error('load resource url is null')
            return;
        }

        this.m_loadResQueue.push({url : url, type : type, isStatic : true});
    },

    // 按帧加载
    loadByFrame()
    {
        if (this.m_loadIndex >= this.m_loadResQueue.length) {
            return;
        }
        const resInfo = this.m_loadResQueue[this.m_loadIndex];
        var url = resInfo.url;
        var type = resInfo.type;

        this.m_loadIndex++;
        
        this._loadSync(url, type);
    },

    // 一个一个加载
    _loadOneByOne()
    {
        const resInfo = this.m_loadResQueue[this.m_loadAmount];
        var url = resInfo.url;
        var type = resInfo.type;

        this._loadSync(url, type);
    },

    // 异步加载
    _loadSync(url, type)
    {
        ResMgr.loadAsset(url, type, (obj)=>{
            this.m_loadAmount++;
            if (obj) { this.m_loadSucceedNum++; }
            else { this.m_loadFailureNum++; }
            this._checkComplete();
        }); 

    },

    // 检测是否加载完成
    _checkComplete()
    {
        if (this.m_progressFunc) {
            this.m_progressFunc(this.m_loadAmount / this.m_loadResQueue.length);
        }
        if (this.m_loadAmount >= this.m_loadResQueue.length) {
            this._loadEndInfo();
            if (this.m_completeFunc) {
                this.m_completeFunc();
            }
            if (this.m_frameLoadHandler) {
                clearTimeout(this.m_frameLoadHandler);
            }
            this.m_frameLoadHandler = null;
        }
        else
        {
            if (this.m_loadType == 'one') {
                this._loadOneByOne();
            }
        }
    },

    _loadEndInfo()
    {
        var useTime = Date.now() - this.m_loadUseTime;
        unit.log('加载用时: ' + useTime / 1000 + 's');
        var load_info = {
            load_succeed : this.m_loadSucceedNum,
            load_failure : this.m_loadFailureNum,
            load_total : this.m_loadResQueue.length,
        }
        unit.log(load_info);
    },
}