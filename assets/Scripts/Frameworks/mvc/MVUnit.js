/*
 * @Author: jacklove
 * @Date: 2020-03-29 11:16:51
 * @LastEditTime: 2020-08-17 10:12:17
 * @LastEditors: jacklove
 * @Description: 
 * @FilePath: \NewProject_test\assets\Scripts\Frameworks\mvc\MVUnit.js
 */

let MVBase = require('./view/MVBase')

cc.Class({
    extends: cc.Component,

    properties: {

        bind_mode : {
            default : unit.MVDef.BindMode.auto,
            type : unit.MVDef.BindMode,
            tooltip : '绑定模式',
            notify() {
                this.setBindType();
            },
        },

        bind_type : {
            default : -1,
            tooltip : '绑定类型',
            readonly : true,
            visible : false,
        },

        show_bind_type : {
            default : 'unknown',
            tooltip : '绑定类型',
            readonly : true,
            displayName : 'bind_type',
            visible() {
                return this.bind_mode == unit.MVDef.BindMode.auto;
            },
        },

        s_uuid : {
            default : '',
            tooltip : 'uuid',
            displayName : 'uuid',
            readonly : true,
        },

        handle_cls : {
            default : null,
            type : MVBase,
            tooltip : '组件参数列表',
        },
    },

    editor : {
        executeInEditMode : true,
    },

    onLoad () {
        if (CC_EDITOR) { 
            // cc.Class["Attr"].setClassAttr(this, 'bind_key', 'type', 'Enum');
            // cc.Class["Attr"].setClassAttr(this, 'bind_key', 'enumList', cc.Enum.getList(unit.MVDef.BindDef));
            this.setBindType();
            this.showUUID();
            if (this.handle_cls == null)  { this.setHandle(); } 
        }
        else
        {
            if (this.handle_cls != null) { this.handle_cls.init(this.node); }
        }

    },

    start () {
    },

    // update (dt) {},

    onEnable()
    {
        unit.MVMgr.bind(this.node);
    },

    onDisable()
    {
        unit.MVMgr.unbund(this.node);
    },

    setHandle()
    {
        if (this.bind_mode == unit.MVDef.BindMode.auto) {
            if (this.bind_type == unit.MVDef.BindType.MVLabel || this.bind_type == unit.MVDef.BindType.MVRichText) {
                let MVLabel = require('./view/MVLabel')
                this.handle_cls = new MVLabel();
            }
            else if (this.bind_type == unit.MVDef.BindType.MVSprite) {
                let MVSprite = require('./view/MVSprite')
                this.handle_cls = new MVSprite();
            }
            else if (this.bind_type == unit.MVDef.BindType.MVSkel) {
                let MVSkel = require('./view/MVSkel')
                this.handle_cls = new MVSkel();
            }
            else if (this.bind_type == unit.MVDef.BindType.MVProgress) {
                let MVProgress = require('./view/MVProgress')
                this.handle_cls = new MVProgress();
            }
            else
            {
                let MVNode = require('./view/MVNode')
                this.handle_cls = new MVNode();
            }
        } else {
            let MVCustom = require('./view/MVCustom')
            this.handle_cls = new MVCustom();
        }
        this.handle_cls.initEditMode(this.node);
    },

    setBindType()
    {
        if (this.bind_mode == unit.MVDef.BindMode.auto) {
            if (this.node.getComponent(cc.Label)) { this.bind_type = unit.MVDef.BindType.MVLabel; }
            else if (this.node.getComponent(cc.RichText)) { this.bind_type = unit.MVDef.BindType.MVRichText; }
            else if (this.node.getComponent(cc.ProgressBar)) { this.bind_type = unit.MVDef.BindType.MVProgress; }
            else if (this.node.getComponent(cc.Sprite)) { this.bind_type = unit.MVDef.BindType.MVSprite; }
            else if (this.node.getComponent(sp.Skeleton)) { this.bind_type = unit.MVDef.BindType.MVSkel; }
            else { this.bind_type = unit.MVDef.BindType.MVNode; }
        }
        else { this.bind_type = unit.MVDef.BindType.MVCustom; }

        this.show_bind_type = unit.MVDef.BindType[this.bind_type];
    },

    showUUID()
    {
        this.s_uuid = this.uuid;
    },

    getBindType()
    {
        return this.bind_type;
    },

    handleData(data)
    {
        if (this.handle_cls) { this.handle_cls.handleData(data); }
    },

    getWatchs()
    {
        if (this.handle_cls) { return this.handle_cls.watchPathArr; }
        return [];
    },

});
