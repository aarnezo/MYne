const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('untimeout')
        .setDescription('Hapus timeout dari seorang member')
        .addUserOption(option =>
            option.setName('target')
                .setDescription('Member yang akan di-untimeout')
                .setRequired(true)
        ),
    async execute(interaction) {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) {
            return interaction.reply({ content: "Kamu tidak punya izin untuk untimeout member!", ephemeral: true });
        }

        const member = interaction.options.getMember('target');
        await member.timeout(null);
        await interaction.reply(`${member.user.tag} telah di-untimeout.`);
    }
};