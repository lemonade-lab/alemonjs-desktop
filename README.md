## 阿柠檬桌面端

https://alemonjs.com/

跨平台开发的事件驱动机器人客户端

### 本地

```sh
git clone --depth==1 https://github.com/lemonade-lab/alemonjs-desktop.git
```

```sh
# 使用 nvm切换版本
nvm use 22
# 安装 yarn
npm install yarn@1.19.1 -g
# 安装所有依赖
yarn install
# 生产捆绑资源
yarn bundle
```

- 开发

```sh
yarn dev # mac
yarn dev-win # win
```

- 生产应用

```sh
yarn build
```

### 环境变量

`ALEMONDEJS_BOT_PATH` 可配置机器人地址，若该目录无机器人则生产

- mac

> ~/.bashrc, ~/.bash_profile, ~/.zshrc

```
export ALEMONDEJS_BOT_PATH=/Users/[your name]/Desktop/[your path]
```

```sh
source ~/.bashrc
```

### Community

QQ Group 806943302
