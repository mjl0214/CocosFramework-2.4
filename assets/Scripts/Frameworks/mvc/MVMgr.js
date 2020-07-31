/*
 * @Author: jacklove
 * @Date: 2020-03-29 11:16:42
 * @LastEditTime: 2020-07-31 14:56:12
 * @LastEditors: jacklove
 * @Description: 
 * @FilePath: \NewProject_test\assets\Scripts\Frameworks\mvc\MVMgr.js
 */
module.exports = {

    m_bind_event : [],

    registerEvent(event_map)
    {
        unit.MVDef.BindDef = cc.Enum(event_map);
    },

    /**
     * @description: 绑定
     * @param {cc.Node} node 
     * @return: 
     */
    bind(node)
    {
        var comp = this._getComp(node);
        if (comp == null) { return; }
        
        this.m_bind_event.push(node);
    },
    
    /**
     * @description: 注销
     * @param {cc.Node} node 
     * @return: 
     */
    unbund(node)
    {
        var comp = this._getComp(node);
        if (comp == null) { return; }
        
        for (let i = 0; i < this.m_bind_event.length; i++) {
            if (this.m_bind_event[i] === node) {
                this.m_bind_event.splice(i, 1);
                break;
            }
        }
    },

    dispatch(data)
    {
        if (data == null) { return; }
        for (let i = 0; i < this.m_bind_event.length; i++) {
            let node = this.m_bind_event[i];
            var comp = this._getComp(node);
            if (comp) { comp.handleData(data); }
        }
    },

    _formatData(path, value)
    {
        var format_data = {};
        path = path.trim();//防止空格,自动剔除
        keys = path.split('.');

        var cache = format_data;
        for (let i = 0; i < keys.length; i++) {
            const _key = keys[i];
            cache[_key] = {};
            
            if (i >= keys.length - 1) { cache[_key] = value; }
            else { cache = cache[_key]; }
        }

        return format_data;
    },

    dispatchLabel(path, value)
    {
        var send_data = this._formatData(path, value);
        this.dispatch(send_data);
    },

    dispatchSprite(path, atlasName, frameName)
    {
        var send_data = this._formatData(path, [atlasName, frameName]);
        this.dispatch(send_data);
    },

    dispatchSkel(path, url, play_data)
    {
        var send_data = this._formatData(path, [url, play_data]);
        this.dispatch(send_data);
    },

    _getComp(node)
    {
        if (!cc.isValid(node)) { 
            console.error('node is not valid');
            return null; 
        }

        var comp = node.getComponent('MVUnit');
        return comp;
    },

    findData(data, path)
    {
        if (!data) { return null; }

        var keys = [];
        path = path.trim();//防止空格,自动剔除
        keys = path.split('.');
        
        var _data_ = data;
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            if (_data_.hasOwnProperty(key)) {
                _data_ = _data_[key];
            }
            else
            {
                return null;
            }
        }
        return _data_;
    },
};