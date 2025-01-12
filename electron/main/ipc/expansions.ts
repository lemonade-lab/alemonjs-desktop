import { ipcMain } from 'electron'
import {
  expansionsClose,
  expansionsPostMessage,
  expansionsRun,
  expansionsStatus
} from '../../core/expansions'

// expansions
ipcMain.handle('expansions-run', (event, data) => {
  try {
    expansionsRun(event.sender, data ? JSON.parse(data) : [])
  } catch (e) {
    console.error(e)
  }
})
ipcMain.handle('expansions-close', () => expansionsClose())
ipcMain.handle('expansions-status', () => expansionsStatus())
ipcMain.handle('expansions-post-message', (event, data) => {
  try {
    const d = JSON.parse(data)
    expansionsPostMessage(d)
  } catch (e) {
    console.error(e)
  }
})
