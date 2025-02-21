import { ipcMain } from 'electron'
import {
  expansionsClose,
  expansionsPostMessage,
  expansionsRun,
  expansionsStatus
} from '../../src/script/expansions'

ipcMain.handle('expansions-status', () => expansionsStatus())

// expansions
ipcMain.on('expansions-run', (event, data) => {
  expansionsRun(event.sender, data ?? [])
})

ipcMain.on('expansions-close', () => {
  expansionsClose()
})

// expansions post message
ipcMain.handle('expansions-post-message', (event, data) => {
  expansionsPostMessage(event.sender, data)
})
