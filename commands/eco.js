const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');

const dataFile = 'economy.json';

// Load database ekonomi dari file JSON
let economy = {};
if (fs.existsSync(dataFile)) {
    economy = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
}

function saveEconomy() {
    fs.writeFileSync(dataFile, JSON.stringify(economy, null, 2));
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('eco')
        .setDescription('Sistem ekonomi server')
        .addSubcommand(subcommand =>
            subcommand.setName('balance')
                .setDescription('Lihat saldo uang')
                .addUserOption(option =>
                    option.setName('target')
                        .setDescription('User yang ingin dicek')
                        .setRequired(false)))
        .addSubcommand(subcommand =>
            subcommand.setName('daily')
                .setDescription('Klaim daily rewards'))
        .addSubcommand(subcommand =>
            subcommand.setName('work')
                .setDescription('Bekerja untuk mendapatkan uang')
                .addStringOption(option =>
                    option.setName('job')
                        .setDescription('Pilih pekerjaan')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Programmer', value: 'programmer' },
                            { name: 'Kasir', value: 'kasir' }
                        )))
        .addSubcommand(subcommand =>
            subcommand.setName('deposit')
                .setDescription('Masukkan uang ke bank')
                .addIntegerOption(option =>
                    option.setName('jumlah')
                        .setDescription('Jumlah yang ingin disimpan')
                        .setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand.setName('withdraw')
                .setDescription('Tarik uang dari bank')
                .addIntegerOption(option =>
                    option.setName('jumlah')
                        .setDescription('Jumlah yang ingin ditarik')
                        .setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand.setName('transfer')
                .setDescription('Transfer uang ke user lain')
                .addUserOption(option =>
                    option.setName('target')
                        .setDescription('User tujuan')
                        .setRequired(true))
                .addIntegerOption(option =>
                    option.setName('jumlah')
                        .setDescription('Jumlah yang ingin dikirim')
                        .setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand.setName('steal')
                .setDescription('Coba mencuri uang dari user lain')
                .addUserOption(option =>
                    option.setName('target')
                        .setDescription('User yang ingin dicuri')
                        .setRequired(true))),

    async execute(interaction) {
        const userId = interaction.user.id;
        const subcommand = interaction.options.getSubcommand();
        const target = interaction.options.getUser('target');
        const amount = interaction.options.getInteger('jumlah');
        const job = interaction.options.getString('job');

        if (!economy[userId]) economy[userId] = { wallet: 0, bank: 0 };
        if (target && !economy[target.id]) economy[target.id] = { wallet: 0, bank: 0 };

        if (subcommand === 'balance') {
            const targetUser = target || interaction.user;
            const userBalance = economy[targetUser.id];

            const embed = new EmbedBuilder()
                .setColor('#ffffff')
                .setTitle(`💰 **Saldo ${targetUser.username}**`)
                .setDescription(`🪙 **Dompet:** ${userBalance.wallet}\n🏦 **Bank:** ${userBalance.bank}`);
            
            await interaction.reply({ embeds: [embed] });
        }

        else if (subcommand === 'daily') {
            economy[userId].wallet += 500;
            saveEconomy();
            await interaction.reply(`🎁 Kamu telah klaim **500** uang!`);
        }

        else if (subcommand === 'work') {
            const jobs = { programmer: 700, kasir: 500 };
            economy[userId].wallet += jobs[job];
            saveEconomy();
            await interaction.reply(`💼 Kamu bekerja sebagai **${job}** dan mendapat **${jobs[job]}** uang!`);
        }

        else if (subcommand === 'deposit') {
            if (amount > economy[userId].wallet) return interaction.reply('❌ Uang tidak cukup!');
            economy[userId].wallet -= amount;
            economy[userId].bank += amount;
            saveEconomy();
            await interaction.reply(`🏦 Kamu menyimpan **${amount}** ke bank!`);
        }

        else if (subcommand === 'withdraw') {
            if (amount > economy[userId].bank) return interaction.reply('❌ Saldo bank tidak cukup!');
            economy[userId].wallet += amount;
            economy[userId].bank -= amount;
            saveEconomy();
            await interaction.reply(`💸 Kamu menarik **${amount}** dari bank!`);
        }

        else if (subcommand === 'transfer') {
            if (userId === target.id) return interaction.reply('❌ Tidak bisa transfer ke diri sendiri!');
            if (amount > economy[userId].wallet) return interaction.reply('❌ Uang tidak cukup!');
            economy[userId].wallet -= amount;
            economy[target.id].wallet += amount;
            saveEconomy();
            await interaction.reply(`📩 Kamu mengirim **${amount}** uang ke **${target.username}**!`);
        }

        else if (subcommand === 'steal') {
            if (target.id === userId) return interaction.reply('❌ Tidak bisa mencuri dari diri sendiri!');
            if (economy[target.id].wallet < 100) return interaction.reply('❌ Target tidak punya cukup uang di dompet!');
            
            const success = Math.random() < 0.5; // 50% sukses mencuri
            if (success) {
                const stolenAmount = Math.floor(Math.random() * 200) + 100;
                if (stolenAmount > economy[target.id].wallet) return interaction.reply('❌ Tidak bisa mencuri lebih dari saldo dompet target!');
                
                economy[userId].wallet += stolenAmount;
                economy[target.id].wallet -= stolenAmount;
                saveEconomy();
                await interaction.reply(`🕵️ Kamu berhasil mencuri **${stolenAmount}** dari **${target.username}**!`);
            } else {
                await interaction.reply(`🚔 **${target.username}** menangkapmu! Gagal mencuri.`);
            }
        }
    },
};