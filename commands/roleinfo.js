const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roleinfo')
        .setDescription('Menampilkan informasi tentang sebuah role')
        .addRoleOption(option =>
            option.setName('role')
                .setDescription('Pilih role yang ingin dilihat informasinya')
                .setRequired(true)),
    async execute(interaction) {
        const role = interaction.options.getRole('role');

        const embed = new EmbedBuilder()
            .setColor(role.color || 0xffffff) // Gunakan warna role, kalau 0 berarti putih
            .setTitle(`🎭 Informasi Role: ${role.name}`)
            .addFields(
                { name: '🆔 Role ID', value: role.id, inline: true },
                { name: '👥 Jumlah Pengguna', value: `${role.members.size} pengguna`, inline: true },
                { name: '🌈 Warna', value: role.hexColor.toUpperCase(), inline: true },
                { name: '🔒 Hoist?', value: role.hoist ? '✅ Ya' : '❌ Tidak', inline: true },
                { name: '📌 Mentionable?', value: role.mentionable ? '✅ Ya' : '❌ Tidak', inline: true },
                { name: '📆 Dibuat Pada', value: `<t:${Math.floor(role.createdTimestamp / 1000)}:D>`, inline: true },
            );

        await interaction.reply({ embeds: [embed] });
    },
};