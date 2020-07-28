/*
 * @Author: jacklove
 * @Date: 2020-07-27 13:39:42
 * @LastEditTime: 2020-07-27 15:01:12
 * @LastEditors: jacklove
 * @Description: 
 * @FilePath: \NewProject_test\assets\Scripts\Frameworks\manager\BundleMgr.js
 */ 

module.exports = {

    loadPack(url, callback)
    {
        cc.assetManager.loadBundle(url, null, (e, b)=>{
            if (e) {
                console.error(e);
            } else {
                console.warn(b);
                if (callback) { callback(b); }
            }
        });
    },

    getPack(pack_name)
    {
        return cc.assetManager.getBundle(pack_name);
    },

    isLoadPack(pack_name)
    {
        var pack_bundle = this.getPack(pack_name);
        return pack_bundle != null;
    },

    loadPackScene(pack_name, scene_name, callback)
    {
        var pack_bundle = this.getPack(pack_name);
        if (!pack_bundle) {
            this.loadPack(pack_name, ()=>{
                this._loadPackScene(pack_name, scene_name, callback);
            });
            return;
        }
        this._loadPackScene(pack_name, scene_name, callback);
    },

    _loadPackScene(pack_name, scene_name, callback)
    {
        var pack_bundle = this.getPack(pack_name);
        if (!pack_bundle) {
            return;
        }
        pack_bundle.loadScene(scene_name, (err, asset) => {
            if (err) {
                cc.log('Error url [' + err + ']');
                // if (callback) { callback(asset); }
                return;
            }
            if (callback) { callback(asset); }
        });
    },
};