document.getElementById('redisForm').addEventListener('submit', async function (event) {
  event.preventDefault()
  // Collect form data
  const formData = {
    host: document.getElementById('host').value,
    port: document.getElementById('port').value,
    password: document.getElementById('password').value,
    db: document.getElementById('db').value
  }
  try {
    // Save the data to a JSON file
    await window.saveRedisConfig(formData)
    // Show success message
    document.getElementById('status').textContent = 'Redis connection saved successfully!'
  } catch (err) {
    console.error('Error saving Redis connection:', err)
    document.getElementById('status').textContent = 'Failed to save Redis connection.'
    document.getElementById('status').style.color = 'red'
  }
})
