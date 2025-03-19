@echo off
echo Starting Farm AI Pest & Disease Detection System...
echo.
echo Starting backend server...
cd "ai image detection"
start cmd /k node server.js
echo.
echo Backend server started at http://localhost:3000
echo.
echo Please open pest-disease-detection.html in your browser to use the application.
echo.
pause 