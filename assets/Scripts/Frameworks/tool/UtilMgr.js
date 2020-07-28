/*
 * @Author: jacklove
 * @Date: 2019-12-23 17:31:34
 * @LastEditTime: 2020-06-08 10:32:49
 * @LastEditors: zhaozhifei
 * @Description: 
 * @FilePath: \client\assets\Scripts\Frameworks\tool\UtilMgr.js
 */

String.prototype.format = function(args) { 
    if (arguments.length>0) { 
        var result = this; 
        if (arguments.length == 1 && typeof (args) == "object") { 
            for (var key in args) { 
                var reg=new RegExp ("({"+key+"})","g"); 
                result = result.replace(reg, args[key]); 
            } 
        } 
        else { 
            for (var i = 0; i < arguments.length; i++) { 
                if(arguments[i]==undefined) { 
                    return ""; 
                } 
                else { 
                    var reg=new RegExp ("({["+i+"]})","g"); 
                    result = result.replace(reg, arguments[i]); 
                } 
            } 
        } 
        return result; 
    } 
    else { 
        return this;
    } 
};

cc.Node.prototype.setId = function (id) {
    this.m_id = id;
}

cc.Node.prototype.getId = function () {
    return this.m_id;
}

module.exports = {

    encrypt(dataString, secretkey, nBits = 256)
    {// 封印
        var encryptjs=require('encryptjs');
        var encrypted = encryptjs.encrypt(dataString, secretkey, nBits);
        return encrypted;
    },

    decrypt(encrypted, secretkey, nBits = 256)
    {// 解印
        var encryptjs=require('encryptjs');
        var dataString = encryptjs.decrypt(encrypted, secretkey, nBits);
        return dataString;
    },

    treeNode (node = cc.director.getScene()) {
        let nameStyle =
            `color: ${node.parent === null || node.activeInHierarchy ? 'green' : 'grey'}; font-size: 14px;font-weight:bold`;
        let nameValue = `%c${node.name}`;
        if (node.childrenCount > 0) {
            console.groupCollapsed(nameValue, nameStyle);
            for (let i = 0; i < node.childrenCount; i++) {
                this.treeNode(node.children[i]);
            }
            console.groupEnd();
        } else {
            console.log(nameValue, nameStyle);
        }
    },

    findNodeById(id, node)
    {
        if (node == null) {
            if (cc.isValid(cc.director.getScene())) {
                node = cc.director.getScene().getChildByName('Canvas');
            }
            else
            {
                return null;
            }
        }
        if (node.m_id && node.m_id == id) {
            return node;
        }

        for (let index = node.children.length - 1; index >= 0; index--) {
            const child = node.children[index];
            var find_node = this.findNodeById(id, child);
            if (find_node) {
                return find_node;
            }
        }

        return null;
    },

    random2Int(min, max){
        return Math.round(Math.random() * (max - min) + min);
    },

    createUUID()
    {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    },

    createUID()
    {
        return 'xxxxxxxxxxxxxxxx4xxxyxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    },

    setItem(key, value)
    {
        cc.sys.localStorage.setItem(key, value);
    },

    getItem(key, value)
    {
        var val = cc.sys.localStorage.getItem(key);
        if (val == null || val == undefined || val == 'undefined') {
            return value;
        }
        return val;
    },

    removeItem(key)
    {
        cc.sys.localStorage.removeItem(key);
    },

    timestampToTime(timestamp)
    {
        var date = new Date(timestamp * 1000);    // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
        var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
        var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
        return Y + M + D + h + m + s;
    },

    timeToString(date, format)
    {
        var _date = {
            "M+": date.getMonth() + 1,
            "d+": date.getDate(),
            "h+": date.getHours(),
            "m+": date.getMinutes(),
            "s+": date.getSeconds(),
            "q+": Math.floor((date.getMonth() + 3) / 3),
            "S+": date.getMilliseconds()
        };
        if (/(y+)/i.test(format)) {
            format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        for (var k in _date) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1
                    ? _date[k] : ("00" + _date[k]).substr(("" + _date[k]).length));
            }
        }
        return format;
    },

    getTodayTimestamp(timestamp)
    {
        var date = new Date(timestamp);
        var _date = new Date(date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + '00:00:00:000');
        return _date.getTime();
    },

    getEasyNum(num, save = 2)
    {
        return this.getEasyNumHaveDecimal(num, save);
    },

    getEasyNumHaveDecimal(num, decimal = 2) {
        let str = "";
        if (num >= 100000000) {   // 亿
            str = this.formatDecimal(num / 100000000, decimal) + '亿';
        }
        else if (num >= 10000) {
            // str = (num / 10000).toFixed(decimal) + "万";
            str = this.formatDecimal(num / 10000, decimal) + '万';
        }
        else {
            str = num;
        }
    
        return str;
    },

    formatDecimal(num, decimal) {
        if (num == null) {
            return 0;
        }
        num = num.toString()
        let index = num.indexOf('.')
        if (index !== -1) {
          num = num.substring(0, decimal + index + 1)
        } else {
          num = num.substring(0)
        }
        return parseFloat(num).toFixed(decimal)
    },

     //4.四舍五入保留2位小数（若第二位小数为0，则保留一位小数）  
    keepTwoDecimal(num) {  
        var result = parseFloat(num);  
        if (isNaN(result)) {  
            alert('传递参数错误，请检查！');  
            return false;  
        }  
        result = Math.round(num * 100) / 100;  
        return result;  
    },

    numberFormat (number, decimals, decPoint, thousandsSep, roundtag) {
        /*
        * 参数说明：
        * number：要格式化的数字
        * decimals：保留几位小数
        * dec_point：小数点符号
        * thousands_sep：千分位符号
        * roundtag:舍入参数，默认 'ceil' 向上取,'floor'向下取,'round' 四舍五入
        * */
        number = (number + '').replace(/[^0-9+-Ee.]/g, '')
        roundtag = roundtag || 'ceil' // 'ceil','floor','round'
        var n = !isFinite(+number) ? 0 : +number
        var prec = !isFinite(+decimals) ? 0 : Math.abs(decimals)
        var sep = (typeof thousandsSep === 'undefined') ? ',' : thousandsSep
        var dec = (typeof decPoint === 'undefined') ? '.' : decPoint
        var s = ''
        var toFixedFix = function (n, prec) {
        var k = Math.pow(10, prec)
        console.log()

        return '' + parseFloat(Math[roundtag](parseFloat((n * k).toFixed(prec * 2))).toFixed(prec * 2)) / k
        }
        s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.')
        var re = /(-?\d+)(\d{3})/
        while (re.test(s[0])) {
            s[0] = s[0].replace(re, '$1' + sep + '$2')
        }

        if ((s[1] || '').length < prec) {
            s[1] = s[1] || ''
            s[1] += new Array(prec - s[1].length + 1).join('0')
        }
        return s.join(dec)
    },

    timeToHMS(timestamp, tag = 'en') {
        var h = Math.floor(timestamp / 3600);
        var m = Math.floor((timestamp - h * 3600) / 60).toString().padStart(2, '0');
        var s = Math.floor((timestamp - h * 3600 - 60 * m)).toString().padStart(2, '0');
    
        if (tag == 'en') {
            return h + ':' + m + ':' + s;
        }
        if (tag == 'cn') {
            return h + '时' + m + '分' + s + '秒';
        }
    },

    deepCloneObj(obj) {
        var i;
        var o = Array.isArray(obj) ? [] : {};
        for (i in obj) {
            o[i] = typeof obj[i] === "Object" ? this.deepCloneObj(obj[i]) : obj[i];
        }
        return o;
    },

    autoScale(w1, h1, w2, h2)
    {
        var sc1 = w1 / w2;
        var sc2 = h1 / h2;

        return Math.min(sc1, sc2);
    },

    randCh(num = 1)
    {
        var result = '';
        for (let i = 0; i < num; i++) {
            var rand = this.random2Int(0x4e00, 0x9fa5);
            result += String.fromCharCode(rand.toString(10));
        }
        return result;
    },

    isChinese(s)
    {
        return /[\u4e00-\u9fa5]/.test(s);
    },

    ch2Unicode(str)
    {
        if(!str){
            return;
        }
        var unicode = '';
        for (var i = 0; i <  str.length; i++) {
            var temp = str.charAt(i);
            if(this.isChinese(temp)){
                unicode += '\\u' +  temp.charCodeAt(0).toString(16);
            }
            else{
                unicode += temp;
            }
        }
        
	    return unicode;
    },

    unicode2Ch(str)
    {
        if(!str){
            return;
        }
        // 控制循环跃迁
        var len = 1;
        var result = '';
            // 注意，这里循环变量的变化是i=i+len 了
        for (var i = 0; i < str.length; i=i+len) {
            len = 1;
            var temp = str.charAt(i);
            if(temp == '\\'){
                // 找到形如 \u 的字符序列
                if(str.charAt(i+1) == 'u'){
                    // 提取从i+2开始(包括)的 四个字符
                    var unicode = str.substr((i+2),4); 
                                    // 以16进制为基数解析unicode字符串，得到一个10进制的数字
                    result += String.fromCharCode(parseInt(unicode,16).toString(10));
                    // 提取这个unicode经过了5个字符， 去掉这5次循环
                    len = 6;
                }
                else{
                    result += temp;
                }
            }
            else{
                result += temp;
            }
        }
        return result;
    },
};