## 阿柠檬桌面端

https://alemonjs.com/

跨平台开发的事件驱动机器人客户端

### 本地打包

```sh
git clone --depth==1 https://github.com/lemonade-lab/alemonjs-desktop.git
```

```sh
# 使用 nvm切换版本
nvm use
# 安装 yarn
npm install yarn@1.19.1 -g
# 安装所有依赖
yarn install
```

```sh
# 编程开发
yarn dev # mac
yarn dev-win # win
```

```sh
# 生产图标
yarn icons
# 打包
yarn build
```

### 体验客户端

打开客户端 > 启动

选择聊天窗口(会提示已连接)

输入/hello

### 连接测试客户端

开发项目中增加gui平台支持

```sh
yarn add @alemonjs/gui
```

选择登录gui

```sh
npx lvyjs --alemonjs --login gui
```

> 切记先关闭客户端内制的测试机器人

### Community

QQ Group 806943302
