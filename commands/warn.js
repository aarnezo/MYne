const { SlashCommandBuilder } = require('discord.js');

const warns = new Map(); // Simpan data warn dalam memori

module.exports = {
    data: new SlashCommandBuilder()
        .setName('warn')
        .setDescription('Memberikan peringatan kepada anggota')
        .addUserOption(option =>
            option.setName('target')
                .setDescription('Pilih user yang ingin diberi peringatan')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('alasan')
                .setDescription('Alasan peringatan')
                .setRequired(false)),
    async execute(interaction) {
        const target = interaction.options.getUser('target');
        const reason = interaction.options.getString('alasan') || 'Tidak ada alasan diberikan';

        // Tambahkan warn ke user
        const userId = target.id;
        const currentWarns = warns.get(userId) || 0;
        warns.set(userId, currentWarns + 1);

        await interaction.reply(`${target.username} telah diberi peringatan!\nTotal Warn: **${warns.get(userId)}**\nAlasan: ${reason}`);
    }
};