'use strict';

const express = require('express');
const path = require('path');
const gamekit = require('express-gamekit');

const app = express();
const PORT = process.env.PORT || 3000;

// Mount the gamekit router with all modules and a demo API key
app.use(
  '/game',
  gamekit({
    apiKey: 'demo-secret',
    modules: ['players', 'leaderboard', 'saves', 'matchmaking', 'rooms']
  })
);

// Serve static UI files
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Demo server listening at http://localhost:${PORT}`);
  console.log(`🕹️  API available under http://localhost:${PORT}/game`);
});
