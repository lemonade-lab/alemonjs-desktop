// 被激活的时候。
export const activate = context => {
  context.onCommand('open.redis', () => {
    const html = `
        <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>QQ Bot</title>
    </head>
    <body>
    <h1>Welcome to QQ Bot</h1>
    <p>This is dynamically loaded HTML.</p>
    </body>
    </html>
    `
    context.sidebar.webView.loadWebView(html)
  })
}
