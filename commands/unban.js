const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unban')
        .setDescription('Unban seorang member')
        .addStringOption(option =>
            option.setName('userid')
                .setDescription('ID user yang akan di-unban')
                .setRequired(true)
        ),
    async execute(interaction) {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
            return interaction.reply({ content: "Kamu tidak punya izin untuk unban member!", ephemeral: true });
        }

        const userId = interaction.options.getString('userid');
        try {
            await interaction.guild.members.unban(userId);
            await interaction.reply(`User dengan ID **${userId}** telah di-unban.`);
        } catch (error) {
            await interaction.reply({ content: `Gagal unban. Pastikan ID benar dan user memang di-ban!`, ephemeral: true });
        }
    }
};