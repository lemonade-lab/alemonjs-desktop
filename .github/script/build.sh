#!/bin/bash

mkdir release
# 删除 npmrc
rm -rf .npmrc
# 安装yarn
npm install yarn@1.19.1 -g
# 加载依赖
yarn install --ignore-engines
# icons
yarn icons
# 打包
yarn build --mac --win --linux