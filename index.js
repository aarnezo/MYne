require("dotenv").config();
const { Client, GatewayIntentBits, Collection } = require("discord.js");
const fs = require("fs");
const keepAlive = require("./keep_alive");

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

// Load commands
client.commands = new Collection();
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
}

client.on("ready", () => {
  console.log(`✅ Bot ${client.user.tag} sudah online!`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: "Terjadi kesalahan!", ephemeral: true });
  }
});

client.login(process.env.TOKEN);
