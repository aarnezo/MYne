const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Menampilkan daftar command yang tersedia'),
    async execute(interaction) {
        const helpEmbed = new EmbedBuilder()
            .setColor(0xffffff) // Warna putih
            .setTitle('📜 Daftar Command')
            .setDescription('Berikut adalah daftar command yang tersedia di bot ini:')
            .addFields(
                { name: '**🛠 Moderation Commands**', value: 
                    '`/ban <user>` - Ban pengguna\n' +
                    '`/kick <user>` - Kick pengguna\n' +
                    '`/timeout <user>` - Timeout pengguna\n' +
                    '`/unban <user_id>` - Unban pengguna\n' +
                    '`/untimeout <user>` - Menghapus timeout pengguna\n' +
                    '`/warn <user>` - Memberikan peringatan' 
                },
                { name: '**💰 Economy Commands**', value: 
                    '`/eco balance` - Melihat saldo uang\n' +
                    '`/eco daily` - Klaim hadiah harian\n' +
                    '`/eco work` - Bekerja untuk mendapatkan uang\n' +
                    '`/eco steal <user>` - Mencuri uang dari pengguna lain'
                },
                { name: '**ℹ️ Information Commands**', value: 
                    '`/serverinfo` - Melihat informasi server\n' +
                    '`/roleinfo <role>` - Melihat informasi tentang role tertentu\n' +
                    '`/user-info` - Melihat informasi pengguna'
                },
                { name: '**🔧 Utility Commands**', value: 
                    '`/help` - Menampilkan daftar command ini'
                }
            )
            .setFooter({ text: 'Gunakan command dengan bijak!' });

        await interaction.reply({ embeds: [helpEmbed] });
    },
};