const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('serverinfo')
        .setDescription('Menampilkan informasi tentang server ini'),
    async execute(interaction) {
        const { guild } = interaction;

        const embed = new EmbedBuilder()
            .setColor(0xffffff) // Warna putih
            .setTitle(`📜 Informasi Server: ${guild.name}`)
            .setThumbnail(guild.iconURL({ dynamic: true }))
            .addFields(
                { name: '📆 Dibuat Pada', value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:D>`, inline: true },
                { name: '👑 Pemilik', value: `<@${guild.ownerId}>`, inline: true },
                { name: '👥 Anggota', value: `${guild.memberCount} pengguna`, inline: true },
                { name: '🌍 Wilayah', value: guild.preferredLocale, inline: true },
                { name: '🛡️ Level Verifikasi', value: guild.verificationLevel.toString(), inline: true },
            )
            .setFooter({ text: `Server ID: ${guild.id}` });

        await interaction.reply({ embeds: [embed] });
    },
};