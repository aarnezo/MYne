const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kick seorang member')
        .addUserOption(option =>
            option.setName('target')
                .setDescription('Member yang akan di-kick')
                .setRequired(true)
        ),
    async execute(interaction) {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
            return interaction.reply({ content: "Kamu tidak punya izin untuk kick member!", ephemeral: true });
        }

        const member = interaction.options.getMember('target');
        await member.kick();
        await interaction.reply(`${member.user.tag} telah di-kick.`);
    }
};