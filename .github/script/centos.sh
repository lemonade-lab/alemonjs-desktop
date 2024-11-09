#!/bin/bash

# Centos8 以上

# 服务器环境初始化脚本
sudo yum update -y

# 安装 rsync
sudo yum install rsync -y
rsync --version

# 安装 git
yum install git
