const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.TWELVE_API_KEY;
app.use(cors());
app.get('/quote', async (req, res) => {
  try {
    const r = await fetch(`https://api.twelvedata.com/quote?symbol=${req.query.symbol}&apikey=${API_KEY}`);
    const data = await r.json();
    res.json(data);
  } catch(e) { res.status(500).json({error:e.message}); }
});
app.get('/health', (req, res) => res.json({status:'JARVIS ONLINE'}));
app.listen(PORT, () => console.log('JARVIS Proxy port ' + PORT));
