var fs = require('fs');
var path = require('path');
var crypto = require('crypto');

var manifest = {
	//服务器上资源文件存放路径（src，res的路径）
    packageUrl: '',
    remoteManifestUrl: '',
    remoteVersionUrl: '',
    version: '1.0.0',
    assets: {},
    searchPaths: []
};
//生成的manifest文件存放目录
var dest = './assets/';
//项目构建后资源的目录
var src = './build/jsb-link/';

// Parse arguments
var i = 2;
while ( i < process.argv.length) {
    var arg = process.argv[i];

    switch (arg) {
    case '--url' :
    case '-u' :
        var url = process.argv[i+1];
        manifest.packageUrl = url;
        manifest.remoteManifestUrl = url + 'project.manifest';
        manifest.remoteVersionUrl = url + 'version.manifest';
        i += 2;
        break;
    case '--version' :
    case '-v' :
        manifest.version = process.argv[i+1];
        i += 2;
        break;
    case '--src' :
    case '-s' :
        src = process.argv[i+1];
        i += 2;
        break;
    case '--dest' :
    case '-d' :
        dest = process.argv[i+1];
        i += 2;
        break;
    default :
        i++;
        break;
    }
}


function readDir (dir, obj) {
    var stat = fs.statSync(dir);
    if (!stat.isDirectory()) {
        return;
    }
    var subpaths = fs.readdirSync(dir), subpath, md5, relative;
    for (var i = 0; i < subpaths.length; ++i) {
        if (subpaths[i][0] === '.') {
            continue;
        }
        subpath = path.join(dir, subpaths[i]);
        stat = fs.statSync(subpath);
        if (stat.isDirectory()) {
            readDir(subpath, obj);
        }
        else if (stat.isFile()) {
            //修改  加utf8 参数后计算出来的md5值可能不对
            //md5 = crypto.createHash('md5').update(fs.readFileSync(subpath, 'utf8')).digest('hex');
            size = stat['size'];
            md5 = crypto.createHash('md5').update(fs.readFileSync(subpath, 'binary')).digest('hex');
            compressed = path.extname(subpath).toLowerCase() === '.zip';

            relative = path.relative(src, subpath);
            relative = relative.replace(/\\/g, '/');
            relative = encodeURI(relative);
            obj[relative] = {
                'size' : size,
                'md5' : md5
            };
            if (compressed) {
                obj[relative].compressed = true;
            }
        }
    }
}

var mkdirSync = function (path) {
    try {
        fs.mkdirSync(path);
    } catch(e) {
        if ( e.code != 'EEXIST' ) throw e;
    }
}

// Iterate res and src folder
readDir(path.join(src, 'src'), manifest.assets);
//readDir(path.join(src, 'res'), manifest.assets);
readDir(path.join(src, 'assets'), manifest.assets);

var destManifest = path.join(dest, 'project.manifest');
var destVersion = path.join(dest, 'version.manifest');

mkdirSync(dest);

var hotManifest = path.join(src, 'project.manifest');
var hotVersion = path.join(src, 'version.manifest');

fs.writeFile(destManifest, JSON.stringify(manifest), (err) => {
  if (err) throw err;
  console.log('Manifest successfully generated');
});

fs.writeFile(hotManifest, JSON.stringify(manifest), (err) => {
  if (err) throw err;
  console.log('hotManifest successfully generated');
});

//把生成的project替换到 jsb-binary\res\raw-assets
var lastManifest = path.join(src,"res","raw-assets", 'project.manifest');
fs.writeFile(lastManifest, JSON.stringify(manifest), (err) => {
  if (err) throw err;
  console.log('"raw-assets Manifest successfully generated');
});

delete manifest.assets;
delete manifest.searchPaths;

fs.writeFile(destVersion, JSON.stringify(manifest), (err) => {
  if (err) throw err;
  console.log('Version successfully generated');
});

//fs.writeFile(hotVersion, JSON.stringify(manifest), (err) => {
 // if (err) throw err;
//  console.log('hotVersion successfully generated');
//});
