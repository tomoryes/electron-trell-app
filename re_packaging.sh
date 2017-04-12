#!/bin/sh

echo "remove package..."
rm -rf ./TrelloApp-darwin-x64

echo "repackaging..."
electron-packager ./TrelloApp TrelloApp --platform=darwin --arch=x64 --electronVersion=1.4.12 --icon=1492055849_trello.icns
