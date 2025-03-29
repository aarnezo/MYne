const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('userinfo')
        .setDescription('Menampilkan informasi tentang user')
        .addUserOption(option =>
            option.setName('target')
                .setDescription('Pilih user untuk melihat infonya')
                .setRequired(false)
        ),

    async execute(interaction) {
        const user = interaction.options.getUser('target') || interaction.user; // Kalau tidak ada target, pakai user yang menjalankan command
        const member = await interaction.guild.members.fetch(user.id);

        const embed = new EmbedBuilder()
            .setColor('#ffffff') // Warna putih
            .setTitle(`ℹ️ **Informasi User**`)
            .setThumbnail(user.displayAvatarURL({ dynamic: true, size: 256 }))
            .addFields(
                { name: '**👤 Nama**', value: `${user.username}#${user.discriminator}`, inline: true },
                { name: '**🆔 ID**', value: user.id, inline: true },
                { name: '**📅 Akun Dibuat**', value: `<t:${Math.floor(user.createdTimestamp / 1000)}:F>`, inline: false },
                { name: '**📌 Bergabung di Server**', value: `<t:${Math.floor(member.joinedTimestamp / 1000)}:F>`, inline: false }
            )
            .setFooter({ text: `Diminta oleh ${interaction.user.username}` });

        await interaction.reply({ embeds: [embed] });
    },
};