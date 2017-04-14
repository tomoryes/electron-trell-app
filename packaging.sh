#!/bin/sh
echo "re-package Trellectron"

echo "remove package..."
rm -rf ./Trellectron-darwin-x64

echo "packaging now ..."
electron-packager ./src Trellectron --platform=darwin --arch=x64 --electronVersion=1.4.12 --icon=app.icns
