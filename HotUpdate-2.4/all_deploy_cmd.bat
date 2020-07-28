
set CMD_PATH=%cd%
call create_hotupdate_files_cmd.bat
cd /d %CMD_PATH%
call fxp_upload_cmd.bat
cd /d %CMD_PATH%
call open_cache_url_cmd.bat
pause