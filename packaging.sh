#!/bin/sh
echo "re-package trello app"

echo "remove package..."
rm -rf ./TrelloApp-darwin-x64

echo "packaging now ..."
electron-packager ./TrelloApp TrelloApp --platform=darwin --arch=x64 --electronVersion=1.4.12 --icon=app.icns
