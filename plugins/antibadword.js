const badWords = ['anjing', 'bajingan', 'bangsat', 'kontol', 'asu'];

module.exports = async (sock, msg, text, from) => {
  if (!msg.key.remoteJid.endsWith('@g.us')) return; // Cuma grup

  const lowerText = text.toLowerCase();
  for (const word of badWords) {
    if (lowerText.includes(word)) {
      await sock.sendMessage(from, { text: 'Jangan gunakan kata kasar!' });
      return;
    }
  }
};
