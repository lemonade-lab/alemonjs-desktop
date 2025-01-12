document.getElementById('redisForm').addEventListener('submit', async function (event) {
  event.preventDefault()
  // Collect form data
  const formData = {
    host: document.getElementById('host').value,
    port: document.getElementById('port').value,
    password: document.getElementById('password').value,
    db: document.getElementById('db').value
  }
  const API = createDesktopAPI()
  API.postMessage(JSON.stringify(formData))
  console.log('formData', formData)
})
