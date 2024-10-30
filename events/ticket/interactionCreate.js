const { PermissionFlagsBits, ChannelType, ActionRowBuilder, EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

module.exports = async (client, db, config, interaction) => {
    try {
        if (!interaction.isStringSelectMenu()) return;

        const reasonModal = new ModalBuilder()
            .setCustomId('ticket_reason')
            .setTitle('Raison du Ticket');
        
        const reasonInput = new TextInputBuilder()
            .setCustomId('reason')
            .setLabel("» Raison de votre Ticket")
            .setStyle(TextInputStyle.Paragraph)
            .setPlaceholder("Expliquez brièvement la raison de votre demande.")
            .setRequired(true);

        reasonModal.addComponents(new ActionRowBuilder().addComponents(reasonInput));

        const category = db.get(`ticketcategory_${interaction.guild.id}`);
        const categoryGap = db.get(`ticketcategorygap_${interaction.guild.id}`);
        const categoryOwner = db.get(`ticketcategoryowner_${interaction.guild.id}`);
        
        const gs = db.get(`gsrole_${interaction.guild.id}`);
        const gapRole = db.get(`gaprole_${interaction.guild.id}`);
        const ownerRole = db.get(`ownerrole_${interaction.guild.id}`);
        
        const existingChannel = interaction.guild.channels.cache.find(c => c.topic == interaction.user.id);

        if (interaction.customId === "select") {
            if (existingChannel) {
                return interaction.reply({
                    embeds: [{
                        description: 'Vous avez déjà un ticket ouvert sur le serveur.',
                        color: 0x2E3136,
                    }],
                    ephemeral: true
                });
            }

            let selectedCategory, selectedRole, channelName;

            switch (interaction.values[0]) {
                case "gestionstaff":
                    selectedCategory = category;
                    selectedRole = gs;
                    channelName = `🧧・${interaction.user.username}`;
                    break;
                case "gestionabus":
                    selectedCategory = categoryGap;
                    selectedRole = gapRole;
                    channelName = `🛡️・${interaction.user.username}`;
                    break;
                case "owner":
                    selectedCategory = categoryOwner;
                    selectedRole = ownerRole;
                    channelName = `👑・${interaction.user.username}`;
                    break;
                default:
                    return;
            }

            await interaction.showModal(reasonModal);

            try {
                const submittedModal = await interaction.awaitModalSubmit({
                    time: 0,
                    filter: i => i.customId === 'ticket_reason' && i.user.id === interaction.user.id
                });

                const reason = submittedModal.fields.getTextInputValue('reason');

                const channel = await interaction.guild.channels.create({
                    name: channelName,
                    type: ChannelType.GuildText,
                    topic: `${interaction.user.id}`,
                    parent: selectedCategory,
                    permissionOverwrites: [
                        {
                            id: interaction.user.id,
                            allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.SendMessages, PermissionFlagsBits.UseApplicationCommands],
                            deny: [PermissionFlagsBits.MentionEveryone]
                        },
                        {
                            id: interaction.guild.id,
                            deny: [PermissionFlagsBits.ViewChannel]
                        },
                        {
                            id: selectedRole,
                            allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.SendMessages, PermissionFlagsBits.UseApplicationCommands],
                            deny: [PermissionFlagsBits.MentionEveryone]
                        }
                    ]
                });

                const staffEmbed = new EmbedBuilder()
                    .setAuthor({ name: interaction.values[0] === 'gestionstaff' ? 'Gestion Staff' : interaction.values[0] === 'gestionabus' ? 'Gestion Abus' : 'Owner' })
                    .setDescription(`:link: L'utilisateur : <@${interaction.user.id}> (\`${interaction.user.id}\`) a ouvert un ticket pour la raison suivante : \`\`\` ${reason} \`\`\` `)
                    .setColor(0x2E3136)
                    .setFooter({ text: `${new Date(interaction.createdTimestamp).toLocaleString()}` });

                await channel.send({ 
                    embeds: [staffEmbed], 
                    content: `<@&${selectedRole}> | ${interaction.user}` 
                });

                await submittedModal.reply({
                    content: `➜ Votre demande de ticket a été créée avec succès : <#${channel.id}>.`,
                    ephemeral: true
                });
            } catch (error) {
                console.log(error);
            }
        }
    } catch (error) {
        console.log(error);
    }
};