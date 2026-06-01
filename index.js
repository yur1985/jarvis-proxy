const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3000;
const TWELVE_KEY = process.env.TWELVE_API_KEY;
const ANTHROPIC_KEY = process.env.ANTHROPIC_KEY;
app.use(cors());
app.use(express.json());
app.get('/quote', async (req, res) => {
  try {
    const r = await fetch(`https://api.twelvedata.com/quote?symbol=${encodeURIComponent(req.query.symbol)}&apikey=${TWELVE_KEY}`);
    res.json(await r.json());
  } catch(e) { res.status(500).json({error:e.message}); }
});
app.post('/claude', async (req, res) => {
  try {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method:'POST',
      headers:{'Content-Type':'application/json','x-api-key':ANTHROPIC_KEY,'anthropic-version':'2023-06-01'},
      body: JSON.stringify(req.body)
    });
    res.json(await r.json());
  } catch(e) { res.status(500).json({error:e.message}); }
});
app.get('/health', (req, res) => res.json({status:'JARVIS ONLINE'}));
app.listen(PORT, () => console.log('Port ' + PORT));
