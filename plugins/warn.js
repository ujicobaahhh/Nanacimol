const warns = new Map();

module.exports = async (sock, msg, text, from) => {
  if (!text.startsWith('.warn')) return;

  if (!msg.key.participant) return;

  const mentionedJid = msg.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
  if (!mentionedJid) {
    return sock.sendMessage(from, { text: 'Tag anggota yang mau di-warn ya!' });
  }

  let count = warns.get(mentionedJid) || 0;
  count++;
  warns.set(mentionedJid, count);

  await sock.sendMessage(from, { text: `Member <@${mentionedJid.split('@')[0]}> telah diperingatkan. Total peringatan: ${count}` });

  if (count >= 3) {
    await sock.sendMessage(from, { text: `Member <@${mentionedJid.split('@')[0]}> sudah dapat 3 peringatan, di-kick ya!` });
    try {
      await sock.groupParticipantsUpdate(from, [mentionedJid], 'remove');
    } catch {
      await sock.sendMessage(from, { text: 'Gagal kick anggota setelah 3 peringatan 😥' });
    }
    warns.delete(mentionedJid);
  }
};
