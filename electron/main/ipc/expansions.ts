import { ipcMain } from 'electron'
import {
  expansionsClose,
  expansionsPostMessage,
  expansionsRun,
  expansionsStatus
} from '../../core/expansions'

ipcMain.handle('expansions-status', () => expansionsStatus())

// expansions
ipcMain.on('expansions-run', (event, data) => {
  try {
    expansionsRun(event.sender, data ?? [])
  } catch (e) {
    console.error(e)
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
    console.error(e)
  }
})

// webview post message
ipcMain.handle('webview-post-message', (event, data) => {
  try {
    expansionsPostMessage(event.sender, data)
  } catch (e) {
    console.error(e)
  }
})
