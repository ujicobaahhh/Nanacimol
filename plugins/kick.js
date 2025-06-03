module.exports = async (sock, msg, text, from) => {
  if (!text.startsWith('.kick')) return;

  const mentionedJid = msg.message.extendedTextMessage?.contextInfo?.mentionedJid;
  if (!mentionedJid) {
    return sock.sendMessage(from, { text: 'Tag anggota yang mau di-kick kak 😅' });
  }

  try {
    await sock.groupParticipantsUpdate(from, mentionedJid, 'remove');
    await sock.sendMessage(from, { text: 'Berhasil kick anggota!' });
  } catch (err) {
    await sock.sendMessage(from, { text: 'Gagal kick, mungkin bukan admin 😥' });
  }
};
