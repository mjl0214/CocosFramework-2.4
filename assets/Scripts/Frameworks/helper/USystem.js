/*
 * @Author: your name
 * @Date: 2020-03-22 18:39:00
 * @LastEditTime: 2020-03-22 18:56:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Plant\assets\Scripts\Frameworks\USystem.js
 */
module.exports = {
    u_version : '1.0.3',
    version_name : 'tomato',

    version_list : {
        '1.0.0' : 'apple',
        '1.0.1' : 'orange',
        '1.0.2' : 'banana',
        '1.0.3' : 'tomato',
    },

    info()
    {
        var data = {
            version : this.u_version,
            version_name : this.version_name,
            history_version : this.version_list,
        }
        console.log('unit', data);
    },

    dump()
    {
        console.log(unit);
        console.log(uTool);
    },
};