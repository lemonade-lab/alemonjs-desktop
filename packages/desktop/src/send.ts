export const processSend = (data: { type: string; data: any }) => {
  process.send(data)
}
