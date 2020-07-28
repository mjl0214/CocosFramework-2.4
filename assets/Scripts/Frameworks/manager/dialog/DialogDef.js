/*
 * @Description: 对话框定义
 * @Author: jacklove
 * @LastEditors: jacklove
 * @Date: 2019-04-18 16:27:03
 * @LastEditTime: 2020-07-28 12:45:06
 */

var DialogDef = module.exports;

// Dialog Model
DialogDef.DialogModel = cc.Enum({
    destory : 0,              // 毁灭模式
    hide : 1,                 // 神隐模式
});

// Dialog State
DialogDef.DialogState = cc.Enum({
    closed : 0,             // 关闭
    opened : 1,             // 开启
    opening : 2,            // 打开中
    closing : 3,            // 关闭中
});

// Dialog Animation
DialogDef.DialogAnimation = cc.Enum({
    no_animation : 0,             // 没有动画
    ease_back_out : 1,            // 由小变大
    left_to_right : 2,            // 左到右
    right_to_left : 3,            // 右到左
    top_to_down : 4,              // 上到下
    down_to_top : 5,              // 下到上
    rotate_to_centre : 6,         // 旋转到中心
    fade_to_centre : 7,           // 淡入
    fall_to_centre : 8,           // 坠入
    jump_to_centre : 9,           // 跳入
    skew_to_centre : 10,          // 倾斜
    flip_to_centre : 11,          // 翻转
});

// DialogDef.DialogMask = 'Prefab/DialogMask';

DialogDef.DialogEvent = '_dialog_event_';

// Dialog ID
DialogDef.DialogID = cc.Enum({
});