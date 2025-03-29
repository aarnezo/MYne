const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Ban seorang member')
        .addUserOption(option =>
            option.setName('target')
                .setDescription('Member yang akan di-ban')
                .setRequired(true)
        ),
    async execute(interaction) {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
            return interaction.reply({ content: "Kamu tidak punya izin untuk ban member!", ephemeral: true });
        }

        const member = interaction.options.getMember('target');
        await member.ban();
        await interaction.reply(`${member.user.tag} telah di-ban.`);
    }
};