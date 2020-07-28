
@echo off

set FLASHFXP_PATH=.\FlashFXP\
set UPLOAD_URL=ftp://minigames:JY123qwe!@#@139.196.206.155:2121

::记录当前路径
set CMD_PATH=%cd%
set COPY_TO_FOLDER=HotUpdate
set REMOTE_PATH=/kxnc/test/HotUpdate

%FLASHFXP_PATH%\FlashFXP.exe -upload %UPLOAD_URL% -localpath=%CMD_PATH%\%COPY_TO_FOLDER%\ -remotepath=%REMOTE_PATH%