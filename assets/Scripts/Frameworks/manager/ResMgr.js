/*
 * @Author: jacklove
 * @Date: 2020-07-22 10:37:15
 * @LastEditTime: 2020-07-31 14:20:33
 * @LastEditors: jacklove
 * @Description: 
 * @FilePath: \NewProject_test\assets\Scripts\Frameworks\manager\ResMgr.js
 */ 

module.exports = {

    _isDabug : true,
    _debug_list : new Object(),
    _loadingCount : 0,
    _cache_list : new Object(),

    getLoadingCount()
    {
        return this._loadingCount;
    },

    webImage(url, node)
    {
        cc.assetManager.loadRemote(url + '', {ext: '.png'}, (err, texture) => {
            if (!err && cc.isValid(node)) {
                let sp = node;
                sp.spriteFrame = new cc.SpriteFrame(texture);
                sp.type = cc.Sprite.Type.SIMPLE;
                sp.sizeMode = cc.Sprite.SizeMode.CUSTOM;
            }
        });
    },

    getPrefab(url, callback)
    {
        this.loadAsset(url, cc.Prefab, (prefab) => {
            // this.instantiate(prefab, callback);
            let node_prefab = cc.instantiate(prefab);
            if (callback) { callback(node_prefab); }
        });
    },

    _repSpriteTexture(target, sprite_key, sprite_frame) {
        if (!cc.isValid(target)) { return; }
        if (!sprite_frame) { return; }
        target[sprite_key] = sprite_frame;
    },

    _repSkeletonData(skeleton, skeleton_data) {
        if (!cc.isValid(skeleton)) { return; }
        if (!skeleton || !skeleton_data) { return; }
        skeleton.skeletonData = skeleton_data;
    },

    // 替换spine动画
    replaceSkel(target, url, callback)
    {
        this.replaceSkeletonData(target, url, callback);
    },

    // 替换spine动画
    replaceSkeletonData(target, url, callback)
    {
        if (!cc.isValid(target)) { console.log('参数错误'); return; }

        let skeleton = target.getComponent(sp.Skeleton);
        if (!skeleton) { console.log('目标节点没有Skeleton组件'); return; }
        
        this.loadAsset(url, sp.SkeletonData, (skeletonData) => {
            this._repSkeletonData(skeleton, skeletonData);
            if (callback) { callback(skeletonData); }
        })
    },

    // 替换纹理
    replaceFrame(target, atlasName, frameName, callback) {
        if (!cc.isValid(target)) { console.log('参数错误'); return; }

        let sprite = target.getComponent(cc.Sprite);
        if (!sprite) { console.log('目标节点没有Sprite组件'); return; }

        if (atlasName && frameName) {
            this.loadAsset(atlasName, cc.SpriteAtlas, (atlas) => {
                if (atlas) {
                    var sprite_frame = atlas.getSpriteFrame(frameName);
                    this._repSpriteTexture(sprite, 'spriteFrame', sprite_frame);
                }
                // _repSpriteTexture(sprite, "spriteFrame", sprite_frame);
                if (callback) { callback(); }
            });            
        } else {
            this.loadAsset(atlasName, cc.SpriteFrame, (sprite_frame) => {
                this._repSpriteTexture(sprite, 'spriteFrame', sprite_frame);
                if (callback) { callback(); }
            });
        }
    },

    // 加载资源
    loadAsset(url, type = cc.Asset, callback)
    {
        var res = cc.resources.get(url, type);
        if (res) {
            if (callback) { callback(res); }
            return;
        }

        this._debug_load_('begin', url);
        this._loadingCount++;
        cc.resources.load(url, type, (err, res) => {
            this._loadingCount--;
            this._debug_load_('end', url);
            if (err) {
                if (callback) { callback(null); }
                console.error('load ' + url + '--->', err, res); 
            }
            else {
                this._cache_list[url] = type;
                if (callback) { callback(res); }
            }
        });
    },

    // 释放资源
    releaseZero()
    {
        for (const url in this._cache_list) {
            var type = this._cache_list[url];
            this.releaseAsset(url, type);
        }
        this._cache_list = new Object();
    },

    // 释放资源
    releaseAsset(url, type = cc.Asset)
    {
        cc.resources.release(url, type);
    },

    _debug_load_(debug_type, url)
    {
        if (!this._isDabug) { return; }
        
        if (debug_type == 'begin') {
            this._debug_list[url] = {start_time : Date.now()};
        }
        else
        {
            if (this._debug_list[url]) {
                var delay_time = (Date.now() - this._debug_list[url].start_time);
                console.log(`加载[${url}] 用时 ${delay_time}ms`);
                delete this._debug_list[url];
            }
        }
    },

    _logger()
    {
        console.warn(cc.assetManager.assets);
        // console.warn(cc.assetManager.dependUtil);
    },
}