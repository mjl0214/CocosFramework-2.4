/*
 * @Author: jacklove
 * @Date: 2020-04-10 10:46:16
 * @LastEditTime: 2020-04-14 13:22:21
 * @LastEditors: jacklove
 * @Description: 
 * @FilePath: \client\assets\Scripts\Frameworks\helper\CocosHelper.js
 */
module.exports = {

    _camera_node_ : null,
    _camera_ : null,
    m_fullPath : '/storage/emulated/0/',

    capture(file_name, camera = null)
    {
        if (cc.isValid(camera)) {
            this._camera_ = camera;
            let texture = new cc.RenderTexture();
            texture.initWithSize(cc.winSize.width, cc.winSize.height, cc.gfx.RB_FMT_S8);
            this._camera_.targetTexture = texture;
        }
        else
        {
            this._createCamera();
        }
        

        this._camera_.render();

        let data = this._camera_.targetTexture.readPixels();
        var _width = this._camera_.targetTexture.width;
        var _height = this._camera_.targetTexture.height;
        let picData = this.filpYImage(data, _width, _height);
        this.saveFile(picData, _width, _height, file_name);
        return picData;
    },

    _createCamera()
    {
        if (cc.isValid(this._camera_node_)) {
            return;
        }

        this._camera_node_ = new cc.Node();
        this._camera_node_.parent = cc.director.getScene().getChildByName('Canvas');
        this._camera_ = this._camera_node_.addComponent(cc.Camera);

        let texture = new cc.RenderTexture();
        texture.initWithSize(cc.winSize.width, cc.winSize.height, cc.gfx.RB_FMT_S8);
        this._camera_.targetTexture = texture;
    },

    saveFile(picData, width, height, file_name) {
        if (!cc.sys.isNative) {
            return;
        }

        let filePath = jsb.fileUtils.getWritablePath() + file_name + '.png';
        // let filePath = this.m_fullPath + file_name + '.png';
        // console.error("saveFile", filePath);
        let success = jsb.saveImageData(picData, width, height, filePath);
        if (success) {
            unit.log("save image data success, file: " + filePath);
        }
        else {
            unit.error("save image data failed!");
        }
    },

    filpYImage(data, width, height) {
        // create the data array
        let picData = new Uint8Array(width * height * 4);
        let rowBytes = width * 4;
        for (let row = 0; row < height; row++) {
            let srow = height - 1 - row;
            let start = srow * width * 4;
            let reStart = row * width * 4;
            // save the piexls data
            for (let i = 0; i < rowBytes; i++) {
                picData[reStart + i] = data[start + i];
            }
        }
        return picData;
    },
};