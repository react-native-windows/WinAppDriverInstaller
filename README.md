# Azure Pipeline Task: WinAppDriver Installer 
## Overview
[Windows Application Driver](https://github.com/microsoft/WinAppDriver) (WinAppDriver) is a service to support Selenium-like UI Test Automation on Windows Applications. And it's widely used for Windows UI Automation.

WinAppDriver is released on [github](https://github.com/Microsoft/WinAppDriver/releases), and this task helps you to install different version of WinAppDriver to agent.

## How to use it 
```
- task: WinAppDriverInstaller@0
  inputs:
    WinAppDriverVersion: 'v1.1.1'
```
Or

![assist](Installerparameter.png)

## Init, build and create package
`npm run package` 

## windows-application-driver-installer in marketplace
[windows-application-driver-installer](https://marketplace.visualstudio.com/items?itemName=licanhua.windows-application-driver-installer)
