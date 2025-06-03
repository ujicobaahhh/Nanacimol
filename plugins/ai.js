const axios = require('axios');

module.exports = async (sock, msg, text, from) => {
  if (!text.startsWith('.ai')) return;

  const prompt = text.replace('.ai', '').trim();
  if (!prompt) return sock.sendMessage(from, { text: 'Tolong tulis pesan untuk AI ya!' });

  try {
    // Ganti URL dan API key sesuai layanan AI yang kamu pakai
    const response = await axios.post('https://api.example-ai.com/chat', { prompt });
    await sock.sendMessage(from, { text: response.data.reply });
  } catch {
    await sock.sendMessage(from, { text: 'AI sedang sibuk, coba lagi nanti ya.' });
  }
};
