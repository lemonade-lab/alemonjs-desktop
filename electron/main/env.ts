import { app } from 'electron'
import { release } from 'node:os'
import { join } from 'node:path'
// 定义进程变量
process.env.DIST_ELECTRON = join(__dirname, '../')
// 被打包后的文件
process.env.DIST = join(process.env.DIST_ELECTRON, '../dist')
// 前端公共文件
process.env.VITE_PUBLIC = process.env.VITE_DEV_SERVER_URL
  ? join(process.env.DIST_ELECTRON, '../public')
  : process.env.DIST

// 禁用 Windows 7 的 GPU 加速
if (release().startsWith('6.1')) app.disableHardwareAcceleration()

// 设置 Windows 10+ 通知的应用程序名称
if (process.platform === 'win32') app.setAppUserModelId(app.getName())

// 该方法的返回值表明该实例是否是您的 应用程序成功获得锁。 如果获取锁失败， 您可以假设您的应用程序的另一个实例已经在运行 立即锁定并退出。
// IE。该方法返回true如果您的进程是您的主要实例 应用程序和您的应用程序应该继续加载。 它返回false如果你的 进程应立即退出，因为它已将其参数发送给另一个进程 已经获得锁的实例。
// 在 macOS 上，当用户尝试执行以下操作时，系统会自动强制执行单实例 在 Finder 中打开应用程序的第二个实例，然后open-file和open-url为此将发出事件。但是，当用户通过命令启动您的应用程序时 线，系统的单实例机制将被绕过，你必须 使用此方法可以确保单实例。
// 当第二个实例激活主实例窗口的示例 开始：
if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}
