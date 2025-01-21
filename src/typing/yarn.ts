export type WindowYarn = {
  /**
   *
   * @param name
   * @returns
   */
  cmds: (data: { type: string; value: string[] }) => Promise<void>
  /**
   *  监听
   * @param callback
   * @returns
   */
  on: (callback: (data: { type: string; value: number }) => void) => void
}
