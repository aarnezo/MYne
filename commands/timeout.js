const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('timeout')
        .setDescription('Timeout seorang member')
        .addUserOption(option =>
            option.setName('target')
                .setDescription('Member yang akan di-timeout')
                .setRequired(true)
        )
        .addIntegerOption(option =>
            option.setName('duration')
                .setDescription('Durasi timeout dalam detik')
                .setRequired(true)
        ),
    async execute(interaction) {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) {
            return interaction.reply({ content: "Kamu tidak punya izin untuk timeout member!", ephemeral: true });
        }

        const member = interaction.options.getMember('target');
        const duration = interaction.options.getInteger('duration');

        await member.timeout(duration * 1000);
        await interaction.reply(`${member.user.tag} telah di-timeout selama ${duration} detik.`);
    }
};