/*
 * @Author: your name
 * @Date: 2020-03-22 18:39:00
 * @LastEditTime: 2020-07-30 17:55:21
 * @LastEditors: jacklove
 * @Description: In User Settings Edit
 * @FilePath: \NewProject_test\assets\Scripts\Frameworks\helper\USystem.js
 */
module.exports = {
    u_version : '1.1.0',
    version_name : 'tomato',

    version_list : {
        '1.0.0' : 'apple',
        '1.0.1' : 'orange',
        '1.0.2' : 'banana',
        '1.0.3' : 'tomato',
        '1.1.0' : 'bean',
    },

    info()
    {
        var data = {
            version : this.u_version,
            version_name : this.version_list[this.u_version],
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