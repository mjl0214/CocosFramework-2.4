/*
 * @Author: mengjl
 * @Date: 2020-04-29 14:36:02
 * @LastEditTime: 2020-07-24 13:25:51
 * @LastEditors: jacklove
 * @Description: 
 * @FilePath: \NewProject_test\assets\Scripts\Frameworks\manager\HotUpExMgr.js
 */
module.exports = {

    checkEngineEx(url, callback)
    {
        var data = {
            engine_version : '1.0',
        };
        unit.IHttp.get(url, (resJson)=>{
            if (resJson == null) {
                if (callback) {
                    callback(data);
                }
                return;
            }

            if (callback) {
                callback(resJson);
            }
        });
    },

    checkEngine(url, callback)
    {
        var result_data = {
            engine_update : 0,
            download_url : '',
            hot_update : 1,
        };

        unit.IHttp.get(url, (resJson)=>{
            if (resJson == null) {
                if (callback) {
                    callback(result_data);
                }
                return;
            }

            unit.log('versionInfo', JSON.stringify(resJson));

            var channel_info = this.getChannelVerInfo(resJson);

            if (channel_info == null) {
                if (callback) { callback(result_data); }
                return;
            }

            var local_engine = this.getLocalEngineVersion();
            if (channel_info.engine_version > local_engine) {
                result_data.engine_update = 1;
                result_data.download_url = channel_info.download_url;
                result_data.hot_update = channel_info.hot_update;
            }

            if (callback) { callback(result_data); }
        });
    },

    getChannelVerInfo(resJson)
    {
        var channel_id = this.getChannelID();
        unit.log('channel_id', channel_id);
        if (resJson.hasOwnProperty('ver')) {
            for (let i = 0; i < resJson.ver.length; i++) {
                const info = resJson.ver[i];
                if (info.channel == channel_id) {
                    return info;
                }
            }
        }
        return null;
    },

    getLocalEngineVersion()
    {
        var local_engine = unit.SDKMgr.callToolMethod('getVersionName', 'S');
        if (local_engine == undefined) {
            local_engine = '1.0';
        }
        return local_engine;
    },

    getChannelID()
    {
        var channel_id = unit.SDKMgr.callMethod(unit.SDKMgr.USDKMGR_API, 'getChannelID', 'S');
        if (channel_id == undefined) {
            channel_id = '1000';
        }
        return channel_id;
    }
};