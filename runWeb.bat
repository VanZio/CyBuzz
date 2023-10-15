@echo off

REM run virtualenv
cd backend\flask
start "virtualenv" cmd /k scripts\activate 
REM start flask
cd ..
start "start flask" cmd /k flask run

REM Navigate to the directory containing slitherprocess.py and run it
cd app
start "Watchdog Activation" cmd /k python runscriptwatchdog.py

REM Navigate to the frontend directory and start the React server
cd ..\..\frontend
start "React Application" cmd /k npm start

