/*
 * @Author: jacklove
 * @Date: 2020-10-14 15:52:59
 * @LastEditTime: 2020-10-14 17:31:23
 * @LastEditors: jacklove
 * @Description: 
 * @FilePath: \NewProject_test\assets\Scripts\Model\Common\SuctNetMgr.js
 */
module.exports = {

    m_msgId : 0,
    m_uid: 0,
	m_sid: '',
	m_st: 'st',

    init()
    {
        let IWebSocket = require("IWebSocket")
        this.m_ws = new IWebSocket();

        this.m_ws.setUrl('ws://47.100.231.114:32101');
        this.m_ws.connect(this._wsopen.bind(this), this._wsmessage.bind(this), this._wserror.bind(this), this._wsclose.bind(this));
    },

    _wsopen(evt){
        unit.error('WSopen',evt);
        // this.startHeart();
    },

    _wsmessage(evt){
        // unit.log('WSmessage',evt);

        var data = evt.data;

        var json_data = {};
        try {
            json_data = JSON.parse(data);         
        } catch (err) {
            console.error('wsmessage', err);
        }

        unit.log('SuctNetMgr wsmessage', json_data);

        let reader = unit.ISuct.createReader(json_data);

        unit.log('SuctNetMgr', reader);

        // if (json_data.hasOwnProperty('resp')) {
        //     this.saveToCache(json_data);
        //     this._setLocalTime();
        //     unit.EventMgr.dispatch(json_data.resp, json_data);
        //     unit.EventMgr.dispatch(uLogic.ServerMsgDef.SERVER_EVENT, {type : json_data.resp, data : json_data});
        // }    

    },

    _wserror(evt){
        unit.error('WSerror',evt);
        
    },

    _wsclose(evt){
        // this.stopHeart();
        unit.warn('WSclose',evt);
        // unit.EventMgr.dispatch(uLogic.ServerMsgDef.ReConnectWS);
    },

    _getMsgId()
    {
        this.m_msgId++;
        return this.m_msgId;
    },

    wsSend(ActionId, params)
    {
        let _params = {
            ActionId : ActionId, 
            MsgId: this._getMsgId(),
            Sid: this.m_uid,
            Uid: this.m_sid,
            St : this.m_st,
        };

        let data = unit.ISuct.extend(_params, params);
        // console.error(p);
        // unit.error('test', unit.ISuct.transData(str));
        let json_data = unit.ISuct.transData(data);
        console.error(typeof json_data, json_data);
        var result = this.m_ws.send(json_data);
        return result;
    },

    isConnect()
    {
        if (this.m_ws == null) {
            return false;
        }
        return this.m_ws.isConnect();
    },

    close()
    {
        if (this.m_ws != null) {
            this.m_ws.close();
        }
    },
};