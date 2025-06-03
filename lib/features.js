// lib/features.js
const fs = require('fs');
const path = require('path');

const pluginsPath = path.join(__dirname, '../plugins');

const loadPlugins = () => {
    const plugins = [];
    const files = fs.readdirSync(pluginsPath);
    for (const file of files) {
        if (file.endsWith('.js')) {
            const plugin = require(path.join(pluginsPath, file));
            plugins.push(plugin);
        }
    }
    return plugins;
};

const handleCommand = async (sock, msg) => {
    const text = msg.message.conversation || msg.message.extendedTextMessage?.text || '';
    const from = msg.key.remoteJid;

    const plugins = loadPlugins();
    for (const plugin of plugins) {
        await plugin(sock, msg, text, from);
    }
};

module.exports = { handleCommand };
