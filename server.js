const express = require('express');
const fetch = require('node-fetch'); // npm install node-fetch@2
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Replace this with your actual Discord webhook URL (keep secret!)
const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1376545268882997269/wlE0guNblC0d11uHuTtyJ8KUYe0T42BhB8TjSfi9uS5_xMAmGT4AbZj2UqNFXTU-dQhl';

app.use(cors()); // Enable CORS for all origins (adjust if needed)
app.use(express.json());

app.post('/send', async (req, res) => {
  const { message } = req.body;
  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    const response = await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: message.trim() }),
    });

    if (!response.ok) {
      throw new Error(`Discord webhook error: ${response.statusText}`);
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Failed to send message:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
