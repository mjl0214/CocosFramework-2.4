/*
 * @Author: jacklove
 * @Date: 2020-03-29 11:16:42
 * @LastEditTime: 2020-03-29 15:42:15
 * @LastEditors: jacklove
 * @Description: 
 * @FilePath: \Plant\assets\Scripts\Frameworks\manager\mvc\MVMgr.js
 */
module.exports = {

    m_bind_event : {},

    registerEvent(event_map)
    {
        unit.MVDef = cc.Enum(event_map);
    },

    /**
     * @description: 注册
     * @param {cc.Node} node 
     * @return: 
     */
    bind(node)
    {
        var comp = node.getComponent('MVUnit');
        if (comp == null) {
            return;
        }
        var sub_cache = this.m_bind_event[comp.bind_key] || [];
        sub_cache.push(node);
        this.m_bind_event[comp.bind_key] = sub_cache;
    },
    
    /**
     * @description: 注销
     * @param {cc.Node} node 
     * @return: 
     */
    unbund(node)
    {
        var comp = node.getComponent('MVUnit');
        if (comp == null) {
            return;
        }
        var bind_key = comp.bind_key;
        let sub_cache = this.m_bind_event[bind_key];
        if (!sub_cache) {
            return;
        }

        for (let i = 0; i < sub_cache.length; i++) {
            if (sub_cache[i] === node) {
                sub_cache.splice(i, 1);
                break;
            }
        }
        if (sub_cache.length == 0) {
            delete this.m_bind_event[bind_key];
        }
    },

    dispatch(bind_key, data)
    {
        let sub_cache = this.m_bind_event[bind_key];
        if (!sub_cache) {
            return;
        }
        for (let i = 0; i < sub_cache.length; i++) {
            let node = sub_cache[i];
            var comp = node.getComponent('MVUnit');
            comp.handleData(data);
        }
    },
};