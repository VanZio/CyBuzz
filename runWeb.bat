@echo off

REM Navigate to the backend directory and run the Flask server
cd backend\app
start "Watchdog Activating" cmd /k python runscriptwatchdog.py 

REM Navigate to the directory containing slitherprocess.py and run it
cd ..
start "Flask Server" cmd /k flask run

REM Navigate to the frontend directory and start the React server
cd ..\frontend
start "React Application" cmd /k npm start

