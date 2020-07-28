/*
 * @Author: jacklove
 * @Date: 2020-03-18 14:22:12
 * @LastEditTime: 2020-05-26 10:51:34
 * @LastEditors: jacklove
 * @Description: 
 * @FilePath: \client\assets\Scripts\Frameworks\manager\DataMgr.js
 */
module.exports = {

    _cache_ : {},

    _word_:[],


    // 放入缓存数据
    setCache(key, value)
    {
        this._cache_[key] = value;
    },

    
    // 取出缓存数据
    getCache(key, value)
    {
        if (this._cache_.hasOwnProperty(key)) {
            return this._cache_[key];
        }
        return value;
    },

    // 删除缓存
    deleteCache(key)
    {
        delete this._cache_[key];
    },

    // 清理所有缓存
    clearCache()
    {
        delete this._cache_;
        this._cache_ = {};
    },

    logCache()
    {
        // unit.log('logCache', this._cache_);
    },

    setItem(key, value)
    {
        uTool.UtilMgr.setItem(key, value);
    },

    getItem(key, value)
    {
        return uTool.UtilMgr.getItem(key, value);
    },

    // 存入指定键值的数据结构中
    setUnique(unique_key, key, value)
    {
        var unique_data = this.getItem(unique_key);
        if (unique_data == null) {
            unique_data = {};
        }
        else
        {
            unique_data = JSON.parse(unique_data);
        }

        unique_data[key] = value;

        this.setItem(unique_key, JSON.stringify(unique_data));
    },

    // 取出指定键值的数据结构中
    getUnique(unique_key, key, value)
    {
        var unique_data = this.getItem(unique_key);
        if (unique_data == null) {
            return value;
        }

        unique_data = JSON.parse(unique_data);

        if (unique_data.hasOwnProperty(key)) {
            return unique_data[key];
        }

        return value;
    },

    output(datas, file_name)
    {
        if (cc.sys.isBrowser) {
            this._saveByBrowser(datas, file_name);
        } else {
            
        }
    },

    _saveByBrowser(datas, file_name)
    {
        datas = JSON.stringify(datas);
        var textFileAsBlob = new Blob([datas], { type: 'application/json' });
        var downloadLink = document.createElement("a");
        downloadLink.download = file_name;
        downloadLink.innerHTML = "Download File";
        if (window.webkitURL != null) {
            // Chrome允许点击链接
            //而无需实际将其添加到DOM中。
            downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
        }
        else {
            //在点击之前 Firefox要求将链接添加到DOM中
            downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
            downloadLink.onclick = destroyClickedElement;
            downloadLink.style.display = "none";
            document.body.appendChild(downloadLink);
        }
        downloadLink.click();
    },
};