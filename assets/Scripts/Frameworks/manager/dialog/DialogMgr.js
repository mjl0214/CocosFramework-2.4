/*
 * @Author: jacklove
 * @Date: 2019-12-11 15:20:29
 * @LastEditTime: 2020-08-27 13:29:13
 * @LastEditors: jacklove
 * @Description: 
 * @FilePath: \NewProject_test\assets\Scripts\Frameworks\manager\dialog\DialogMgr.js
 */

module.exports = {
    m_register_list : new Object(), // 注册列表
    m_alloc_index : 0,              // 分配索引
    m_baseZIndex : 1000,            // 基础ZIndex
    m_dialogs : new Array(),        // 对话框节点列表
    m_maskPool : new cc.NodePool(), // 遮罩节点池
    m_masks : new Array(),          // 遮罩节点列表
    m_maskIndex : 0,                // 遮罩索引
    m_factory : new Object(),       // 工厂状态
    m_create_list : new Array(),    // 创建队列

    __init__()
    {
        cc.director.on(cc.Director.EVENT_BEFORE_SCENE_LOADING, this.beforeSceneLoading.bind(this));
        cc.director.on(cc.Director.EVENT_AFTER_SCENE_LAUNCH, this.afterSceneLaunch.bind(this));
    },

    afterSceneLaunch(scene_name)
    {
        // 清理所有预制体
        this.m_maskPool.clear();
        this.m_factory = new Object();
    },

    beforeSceneLoading(scene_name)
    {

    },

    registerMask(url)
    {
        // DialogDef.DialogMask = url;
    },

    registerDialog(id_map)
    {
        this.m_register_list = new Object();
        for (const dialog_id in id_map) {
            const url = id_map[dialog_id];
            this.m_register_list[dialog_id] = url;
            this.m_register_list[url] = dialog_id;
            unit.PoolMgr.initPool(dialog_id, url);
        }
    },

    showDialog(dialog_id, params = {})
    {
        var dialog_name = this._getNameById(dialog_id);
        if (dialog_name == null) { console.error('对话框不存在 id =[' + dialog_id + ']'); return; }

        var _dialog_comp_ = this._getDialogComponent(dialog_id);
        if (_dialog_comp_ && _dialog_comp_.isSingle()) { this.reopenDialog(dialog_id, params); }
        else { this.newDialog(dialog_id, params); }
    },

    // 分配对话框层级索引
    allocDialogIndex()
    {
        this.m_alloc_index += 1;
        var audo_index = this.m_alloc_index + this.m_baseZIndex;
        if (audo_index > cc.macro.MAX_ZINDEX) {
            audo_index = cc.macro.MAX_ZINDEX;
        }
        return audo_index;
    },

    _getDialogComponent(dialog_id)
    {
        var _dialog_node_ = this.getDialog(dialog_id);
        if (!cc.isValid(_dialog_node_)) { return null; }
        var _dialog_comp_ = _dialog_node_.getComponent('DialogBase');
        return _dialog_comp_;
    },

    // 重新打开弹窗
    reopenDialog(dialog_id, params)
    {
        var zIndex = this.allocDialogIndex();
        var _dialog_comp_ = this._getDialogComponent(dialog_id);
        if (_dialog_comp_) {
            // 重置显示层级
            this.setDialogZIndex(_dialog_node_, zIndex);
            // 重调进入函数
            _dialog_comp_.onEnter(params);

            var dlg_state = _dialog_comp_._getState();
            if (dlg_state == unit.DialogDef.DialogState.closing || dlg_state == unit.DialogDef.DialogState.closed) {
                // 重新播放开启动画
                _dialog_comp_._playOpenAni();
            }
        }
    },

    getDialog(dialog_id)
    {
        var dialog_name = this._getNameById(dialog_id);

        for (let index = this.m_dialogs.length - 1; index >= 0; index--) {
            const _dialog_node_ = this.m_dialogs[index];
            if (!cc.isValid(_dialog_node_)) {
                continue;
            }
            var dialog_comp = _dialog_node_.getComponent('DialogBase');
            // console.log(dlgComp.dialog_id);
            if (dialog_comp._getDialogName() == dialog_name) {
                return _dialog_node_;
            }
        }
        return null;
    },

    getAllDialog(dialog_id)
    {
        var dialog_name = this._getNameById(dialog_id);

        var res_list = [];
        for (let index = this.m_dialogs.length - 1; index >= 0; index--) {
            const _dialog_node_ = this.m_dialogs[index];
            if (!cc.isValid(_dialog_node_)) {
                continue;
            }
            var dialog_comp = _dialog_node_.getComponent('DialogBase');
            // console.log(dlgComp.dialog_id);
            if (dialog_comp._getDialogName() == dialog_name) {
                res_list.push(_dialog_node_);
            }
        }
        return res_list;
    },

    closeDialog(dialog_node)
    {
        // console.error(dialog_node)
        var _dialog_node_ = dialog_node;
        // console.log(typeof dialog);
        if (typeof dialog_node == 'string') {
            _dialog_node_ = this.getDialog(dialog_node);
        }

        if (cc.isValid(_dialog_node_)) {
            _dialog_node_.getComponent('DialogBase')._playCloseAni();
        } 
    },

    closeAllDialog()
    {
        // console.log(this.m_dialogs);
        for (let index = this.m_dialogs.length - 1; index >= 0; index--) {
            const _dialog_node_ = this.m_dialogs[index];
            // var dlgComp = _dialog_node_.getComponent('DialogBase');
            this.closeDialog(_dialog_node_);
        }
    },

    setDialogZIndex(dialog_node, zIndex)
    {
        var dialog_comp = dialog_node.getComponent('DialogBase');

        var mask_node = this._getMask(dialog_comp._getMaskId());
        if (cc.isValid(mask_node)) {
            mask_node.zIndex = zIndex - 1;
        }
        
        dialog_node.zIndex = zIndex;
        this._autoMaxZIndex();
    },

    _closeDialog(dialog_node)
    {
        var dialog_comp = dialog_node.getComponent('DialogBase');
        var dialog_name = dialog_comp.__dialog_name__;
        var dialog_id = dialog_comp.dialog_id;
        var maskId = dialog_comp._getMaskId();
        dialog_comp.onLeave();

        unit.PoolMgr.recoveryPerfab(dialog_name, dialog_node);

        for (let index = 0; index < this.m_dialogs.length; index++) {
            const _dialog_node_ = this.m_dialogs[index];
            if (dialog_node == _dialog_node_) {
                this.m_dialogs.splice(index, 1);
                break;
            }
        }
        
        this._subMask(maskId);
        this._autoMaxZIndex();
    },

    _removeMask(mask_node)
    {

    },

    _removeDialog(dialog_node)
    {
        cc.log('_removeDialog');
        var dialog_comp = dialog_node.getComponent('DialogBase');
        dialog_comp.onLeave();
        var maskId = dialog_comp._getMaskId();
        this._subMask(maskId);
        unit.PoolMgr.removeUsedPerfab(dialog_comp._getDialogName(), dialog_node);

        for (let index = 0; index < this.m_dialogs.length; index++) {
            const _dialog_node_ = this.m_dialogs[index];
            if (dialog_node == _dialog_node_) {
                this.m_dialogs.splice(index, 1);
                break;
            }
        }

        this._autoMaxZIndex();
    },

    _autoMaxZIndex()
    {
        var active_amount = 0;
        for (let index = 0; index < this.m_dialogs.length; index++) {
            const _dialog_node_ = this.m_dialogs[index];
            if (cc.isValid(_dialog_node_)) { active_amount++; }
        }

        if (active_amount <= 0) {
            this.m_alloc_index = 0;
        }

        // console.log('_autoMaxZIndex', this.m_alloc_index);
    },

    _setFactoryState(dialog_id, state)
    {
        var dialog_name = this._getNameById(dialog_id);
        this.m_factory[dialog_name] = state;
    },

    _getFactoryState(dialog_id)
    {
        var dialog_name = this._getNameById(dialog_id);
        if (!this.m_factory[dialog_name]) {
            this.m_factory[dialog_name] = 'init';
        }
        return this.m_factory[dialog_name];
    },

    newDialog(dialog_id, params)
    {
        var zIndex = this.allocDialogIndex();
        var dialog_name = this._getNameById(dialog_id);
        if (this._getFactoryState(dialog_id) == 'creating') {
            console.warn('[' + dialog_name + ']正在创建！');
            return;
        }
        this._setFactoryState(dialog_id, 'creating');

        var mask_id = this.allocMaskIndex();

        this._createDialog(dialog_id, mask_id, params, zIndex);
    },

    _initDialog(dialog_node, dialog_id, mask_id, params, zIndex)
    {
        this._createMask(dialog_id, mask_id, params, zIndex);
        this._getParent().addChild(dialog_node, zIndex);
        this.m_dialogs.push(dialog_node);

        var dialog_name = this._getNameById(dialog_id);
        
        dialog_node.setPosition(cc.v2(0, 0));
        var _dialog_comp_ = dialog_node.getComponent('DialogBase');
        _dialog_comp_.__dialog_name__ = dialog_name;
        _dialog_comp_.dialog_id = dialog_id;
        _dialog_comp_._setMaskId(mask_id);
        // set state
        this._setFactoryState(dialog_id, 'created');
        // init
        this.setMaskMask(mask_id, _dialog_comp_._getIsMask());
        this.setMaskInput(mask_id, _dialog_comp_._getIsInput());
        this.setMaskOpacity(mask_id, _dialog_comp_.maskOpacity);

        _dialog_comp_.onEnter(params);
        _dialog_comp_._playOpenAni();
    },

    _createDialog(dialog_id, mask_id, params, zIndex)
    {
        var dialog_name = this._getNameById(dialog_id);
        unit.PoolMgr.getPerfab(dialog_name, (_dialog_node_) => {
            if (cc.isValid(_dialog_node_)) { 
                this._initDialog(_dialog_node_, dialog_id, mask_id, params, zIndex); 
            }
            else {
                console.error('[' + dialog_id + ']创建失败');
                this._setFactoryState(dialog_id, 'created');
            }
        });
    },

    _initMask(mask_node, dialog_id, mask_id, params, zIndex)
    {
        this._getParent().addChild(mask_node, zIndex - 1);
        mask_node.setPosition(cc.v2(0, 0));
        mask_node.__maskId__ = mask_id;
        this.m_masks.push(mask_node);

    },

    _createMask(dialog_id, mask_id, params, zIndex)
    {
        var _mask_node_ = this.m_maskPool.get();

        if (!cc.isValid(_mask_node_))
        {
            _mask_node_ = new cc.Node('DialogMask');

            // create input
            var inputNode = new cc.Node('inputNode');
            inputNode.addComponent(cc.BlockInputEvents);
            inputNode.setContentSize(cc.winSize);
            _mask_node_.addChild(inputNode);

            // create black mask
            var maskNode = new cc.Node('maskNode');
            let graph = maskNode.addComponent(cc.Graphics);
            graph.fillColor = new cc.Color(0, 0, 0, 255 * 0.6);
            graph.fillRect(-cc.winSize.width / 2, -cc.winSize.height / 2, cc.winSize.width, cc.winSize.height);
            maskNode.setContentSize(cc.winSize);
            _mask_node_.addChild(maskNode);
        }
        this._initMask(_mask_node_, dialog_id, mask_id, params, zIndex);
    },

    _subMask(mask_id)
    {
        for (let index = 0; index < this.m_masks.length; index++) {
            const _mask_node_ = this.m_masks[index];
            if (!cc.isValid(_mask_node_)) {
                continue;
            }
            if (_mask_node_.__maskId__ == mask_id) 
            {
                this.m_maskPool.put(_mask_node_);
                this.m_masks.splice(index, 1);
                break;
            }
        }
    },

    _getMask(mask_id)
    {
        for (let index = 0; index < this.m_masks.length; index++) {
            const _mask_node_ = this.m_masks[index];
            if (_mask_node_.__maskId__ == mask_id) 
            {
                return _mask_node_;
            }
        }
        return null;
    },

    setMaskInput(mask_id, input)
    {
        var _mask_node_ = this._getMask(mask_id);
        if (_mask_node_) {
            _mask_node_.getChildByName('inputNode').active = input;
        }
    },

    setMaskMask(mask_id, mask)
    {
        var _mask_node_ = this._getMask(mask_id);
        if (_mask_node_) {
            _mask_node_.getChildByName('maskNode').active = mask;
        }
    },

    setMaskOpacity(mask_id, opacity)
    {
        var _mask_node_ = this._getMask(mask_id);
        if (_mask_node_) {
            var _mask_ = _mask_node_.getChildByName('maskNode');
            let graph = _mask_.getComponent(cc.Graphics);
            graph.clear();
            graph.fillColor = new cc.Color(0, 0, 0, opacity);
            graph.fillRect(-cc.winSize.width / 2, -cc.winSize.height / 2, cc.winSize.width, cc.winSize.height);
        }
    },

    allocMaskIndex()
    {
        return ++this.m_maskIndex;
    },

    _getNameById(dialog_id)
    {
        return this.m_register_list[dialog_id];
    },

    _getParent()
    {
        // return cc.director.getScene();
        return cc.director.getScene().getChildByName('Canvas');
    },

    listen(callback, cls, priority = 0) 
    {
        unit.EventMgr.listen_s('_dialog_mgr_', unit.DialogDef.DialogEvent, callback, cls, priority);
    },

    dispatch(dialog_id, data)
    {
        unit.EventMgr.dispatch_s('_dialog_mgr_', unit.DialogDef.DialogEvent, {dialog_id : dialog_id, data : data});
    },
};

module.exports.__init__();