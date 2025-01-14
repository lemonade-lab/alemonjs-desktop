# [https://alemonjs.com/](https://alemonjs.com/)

- 如何有效定义扩展 ？

```json
{
  "name": "@alemonjs/desktop",
  "type": "module",
  "version": "0.0.2",
  "description": "阿柠檬桌面交互协议",
  "main": "lib/index.js",
  "exports": {
    ".": "./lib/index.js",
    // 包配置信息（必须的）
    "./package": "./package.json",
    // 桌面扩展脚本
    "./desktop": "./desktop.js"
  },
  // config
  "alemonjs": {
    // 桌面
    "desktop": {
      // 指令输入框
      "commond": [
        {
          "name": "desktop",
          // 发送指令
          "commond": "open.desktop"
        }
      ],
      // 侧边栏
      "sidebars": [
        {
          "name": "desktop",
          // 发送指令
          "commond": "open.desktop"
        }
      ]
    }
  }
}
```
