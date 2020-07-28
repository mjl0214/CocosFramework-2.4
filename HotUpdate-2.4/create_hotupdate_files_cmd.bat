
@echo off&setlocal enabledelayedexpansion

::变量设置(引擎路径 工程路径 keystore路径)
set COCOS_PATH=D:\Cocos\Creator\2.4.1
set VERSION_FILE=.\hotupdate_version.txt
set COPY_TO_FOLDER=HotUpdate

set HOTUPDATE_URL=http://down.51v.cn/MiniGames/kxnc/test/HotUpdate/
set PACKAGE_NAME=com.zqdhd.htys
set PROJECT_PATH=D:\MySpace\CocosProject\NewProject_test
set KEYSTORE_PATH=D:\MySpace\jacklove.jks
set KEYSTORE_PASSWORD=19880204
set KEYSTORE_ALIAS=jack
set KEYSTORE_ALIAS_PASSWORD=19880204

set ENCRYPT_JS=true
set XX_TEA_KEY=a8d65b06-fd25-45

::记录当前路径
set CMD_PATH=%cd%

::自动版本号
set HOTUPDATE_VERSION=1.0.0
if not exist %VERSION_FILE% (
	echo please input app version
	set /p APP_VERSION_INPUT=
	type NUL > %VERSION_FILE%
	echo !APP_VERSION_INPUT! > %VERSION_FILE%
)

for /f %%i in (%VERSION_FILE%) do (
	set HOTUPDATE_VERSION=%%i
)
for /f "tokens=1-3,* delims=." %%i in ("%HOTUPDATE_VERSION%") do (
	set VERSION_A=%%i
	set VERSION_B=%%j
	set VERSION_C=%%k
)
set /a VERSION_C+=1
set APP_VERSION=%VERSION_A%.%VERSION_B%.%VERSION_C%
::echo %APP_VERSION%

echo %APP_VERSION% > %VERSION_FILE%
type NUL > .\%APP_VERSION%.log

::执行cocos编译
cd /d %COCOS_PATH%
CocosCreator.exe --path %PROJECT_PATH% --build "platform=android;debug=false;autoCompile=false;template=link;apiLevel=android-27;appABIs=['armeabi-v7a','x86'];md5Cache=false;packageName=%PACKAGE_NAME%;orientation={'portrait': true,'upsideDown': true};useDebugKeystore=false;keystorePath=%KEYSTORE_PATH%;keystorePassword=%KEYSTORE_PASSWORD%;keystoreAlias=%KEYSTORE_ALIAS%;keystoreAliasPassword=%KEYSTORE_ALIAS_PASSWORD%;encryptJs=%ENCRYPT_JS%;xxteaKey=%XX_TEA_KEY%;zipCompressJs=true"

::拷贝main.js
copy /y %CMD_PATH%\main.js %PROJECT_PATH%\build\jsb-link\

::生成manifest文件
node "%CMD_PATH%/version_generator.js" -v "%APP_VERSION%" -u %HOTUPDATE_URL% -s "%PROJECT_PATH%/build/jsb-link/" -d "%PROJECT_PATH%/assets/"

::拷贝文件
if not exist %CMD_PATH%\%COPY_TO_FOLDER%\ (mkdir %CMD_PATH%\%COPY_TO_FOLDER%\)

copy /y %PROJECT_PATH%\assets\project.manifest %CMD_PATH%\%COPY_TO_FOLDER%\
copy /y %PROJECT_PATH%\assets\version.manifest %CMD_PATH%\%COPY_TO_FOLDER%\
ROBOCOPY %PROJECT_PATH%\build\jsb-link\assets %CMD_PATH%\%COPY_TO_FOLDER%\assets /E
ROBOCOPY %PROJECT_PATH%\build\jsb-link\src %CMD_PATH%\%COPY_TO_FOLDER%\src
