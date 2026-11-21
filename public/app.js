// public/app.js
'use strict';

const API_URL = '/game';
const API_KEY = 'demo-secret';

function apiHeaders() {
  return {
    'Content-Type': 'application/json',
    'x-api-key': API_KEY
  };
}

// ---------- Players ----------
const createBtn = document.getElementById('create-player');
const playerOutput = document.getElementById('player-output');
createBtn.addEventListener('click', async () => {
  const name = document.getElementById('player-name').value.trim();
  if (!name) return alert('Enter a name');
  const res = await fetch(`${API_URL}/players`, {
    method: 'POST',
    headers: apiHeaders(),
    body: JSON.stringify({ name })
  });
  const data = await res.json();
  playerOutput.textContent = JSON.stringify(data, null, 2);
});

// ---------- Leaderboard ----------
const submitScoreBtn = document.getElementById('submit-score');
const viewBoardBtn = document.getElementById('view-board');
const lbOutput = document.getElementById('leaderboard-output');
submitScoreBtn.addEventListener('click', async () => {
  const board = document.getElementById('board-name').value.trim();
  const playerId = document.getElementById('lb-player-id').value.trim();
  const score = Number(document.getElementById('lb-score').value);
  if (!board || !playerId || isNaN(score)) return alert('Fill board, playerId, score');
  const res = await fetch(`${API_URL}/leaderboard/${encodeURIComponent(board)}`, {
    method: 'POST',
    headers: apiHeaders(),
    body: JSON.stringify({ playerId, score })
  });
  const data = await res.json();
  lbOutput.textContent = JSON.stringify(data, null, 2);
});
viewBoardBtn.addEventListener('click', async () => {
  const board = document.getElementById('board-name').value.trim();
  const res = await fetch(`${API_URL}/leaderboard/${encodeURIComponent(board)}`);
  const data = await res.json();
  lbOutput.textContent = JSON.stringify(data, null, 2);
});

// ---------- Saves ----------
const saveBtn = document.getElementById('save-data-btn');
const loadBtn = document.getElementById('load-data-btn');
const savesOutput = document.getElementById('saves-output');
saveBtn.addEventListener('click', async () => {
  const playerId = document.getElementById('save-player-id').value.trim();
  let payload;
  try {
    payload = JSON.parse(document.getElementById('save-data').value);
  } catch (e) {
    return alert('Invalid JSON in save data');
  }
  const res = await fetch(`${API_URL}/saves/${encodeURIComponent(playerId)}`, {
    method: 'PUT',
    headers: apiHeaders(),
    body: JSON.stringify(payload)
  });
  const data = await res.json();
  savesOutput.textContent = JSON.stringify(data, null, 2);
});
loadBtn.addEventListener('click', async () => {
  const playerId = document.getElementById('save-player-id').value.trim();
  const res = await fetch(`${API_URL}/saves/${encodeURIComponent(playerId)}`);
  const data = await res.json();
  savesOutput.textContent = JSON.stringify(data, null, 2);
});

// ---------- Matchmaking ----------
const joinBtn = document.getElementById('join-queue');
const statusBtn = document.getElementById('check-status');
const leaveBtn = document.getElementById('leave-queue');
const mmOutput = document.getElementById('mm-output');
joinBtn.addEventListener('click', async () => {
  const playerId = document.getElementById('mm-player-id').value.trim();
  const rating = Number(document.getElementById('mm-rating').value);
  if (!playerId || isNaN(rating)) return alert('Provide playerId and rating');
  const res = await fetch(`${API_URL}/matchmaking/join`, {
    method: 'POST',
    headers: apiHeaders(),
    body: JSON.stringify({ playerId, rating })
  });
  const data = await res.json();
  mmOutput.textContent = JSON.stringify(data, null, 2);
});
statusBtn.addEventListener('click', async () => {
  const playerId = document.getElementById('mm-player-id').value.trim();
  if (!playerId) return alert('Provide playerId');
  const res = await fetch(`${API_URL}/matchmaking/status/${encodeURIComponent(playerId)}`);
  const data = await res.json();
  mmOutput.textContent = JSON.stringify(data, null, 2);
});
leaveBtn.addEventListener('click', async () => {
  const playerId = document.getElementById('mm-player-id').value.trim();
  if (!playerId) return alert('Provide playerId');
  const res = await fetch(`${API_URL}/matchmaking/leave`, {
    method: 'POST',
    headers: apiHeaders(),
    body: JSON.stringify({ playerId })
  });
  const data = await res.json();
  mmOutput.textContent = JSON.stringify(data, null, 2);
});
