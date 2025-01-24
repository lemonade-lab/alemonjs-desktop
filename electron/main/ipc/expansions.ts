import { ipcMain } from 'electron'
import {
  expansionsClose,
  expansionsPostMessage,
  expansionsRun,
  expansionsStatus
} from '../../src/expansions'
import Logger from 'electron-log'

ipcMain.handle('expansions-status', () => expansionsStatus())

// expansions
ipcMain.on('expansions-run', (event, data) => {
  try {
    expansionsRun(event.sender, data ?? [])
  } catch (e) {
    Logger.error(e)
  }
})

ipcMain.on('expansions-close', () => {
  expansionsClose()
})

// expansions post message
ipcMain.handle('expansions-post-message', (event, data) => {
  try {
    expansionsPostMessage(event.sender, data)
  } catch (e) {
    Logger.error(e)
  }
})
