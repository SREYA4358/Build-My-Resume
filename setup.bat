@echo off
REM Resume Builder - Quick Setup Script for Windows
REM This script automates the installation process

echo ========================================
echo Resume Builder - Quick Setup
echo ========================================
echo.

REM Check Python version
echo Checking Python version...
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Python is not installed
    echo Please install Python 3.8 or higher from https://www.python.org/
    pause
    exit /b 1
)

for /f "tokens=2" %%i in ('python --version 2^>^&1') do set PYTHON_VERSION=%%i
echo Found Python %PYTHON_VERSION%
echo.

REM Create virtual environment
echo Creating virtual environment...
python -m venv venv
if %errorlevel% neq 0 (
    echo Failed to create virtual environment
    pause
    exit /b 1
)
echo Virtual environment created
echo.

REM Activate virtual environment
echo Activating virtual environment...
call venv\Scripts\activate.bat
echo Virtual environment activated
echo.

REM Install dependencies
echo Installing dependencies...
pip install -r requirements.txt
if %errorlevel% neq 0 (
    echo Failed to install dependencies
    pause
    exit /b 1
)
echo Dependencies installed
echo.

REM Run migrations
echo Running database migrations...
python manage.py migrate
if %errorlevel% neq 0 (
    echo Failed to run migrations
    pause
    exit /b 1
)
echo Database migrations completed
echo.

REM Success message
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo To start the server, run:
echo   venv\Scripts\activate
echo   python manage.py runserver
echo.
echo Then open your browser to:
echo   http://127.0.0.1:8000/
echo.
echo Happy Resume Building!
echo.
pause
