const { ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder } = require('discord.js');

module.exports = async (client, db, config, interaction) => {
    try {
        if (interaction.isButton() && interaction.customId === 'open_ticket') {
            await interaction.deferUpdate(); 

            const selectRow = new ActionRowBuilder().addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId('select')
                    .setPlaceholder("» Sélectionne le pôle")
                    .addOptions([
                        {
                            label: 'Gestion Abus',
                            description: `Afin de vous plaindre d'un abus de la part d'un staff.`,
                            emoji: `1076179985267703910`,
                            value: 'gestionabus',
                        },
                        {
                            label: 'Gestion Staff',
                            description: `Si vous souhaitez rejoindre l'équipe staff.`,
                            emoji: `1076179672192262244`,
                            value: 'gestionstaff',
                        },
                        {
                            label: 'Owner',
                            description: 'Si vous souhaitez parler à un owner.',
                            emoji: `1076180002447573063`,
                            value: 'owner',
                        },
                        {
                            label: 'Annulé',
                            description: 'Réinitialiser votre choix',
                            emoji: `❌`,
                            value: 'cancel',
                        }
                    ])
            );

            await interaction.followUp({
                content: '',
                embeds: [{
                    title: `🔐 Bonjour ${interaction.user.tag}, bienvenue dans votre ticket !`,
                    description: `Veuillez sélectionner entre les trois options celle qui correspond le mieux à la raison pour laquelle vous ouvrez ce ticket :
<:Staff:1297149911032397844> Gestion Staff
<:arrowcat3:1297148934044651551> Pour tout ce qui concerne le staff.
<:Administrator:1297149909182582826> Gestion Abus
<:arrowcat3:1297148934044651551> Si souhaitez signaler un utilisateurs ou un abus de permission.
<:Owner:1297149914090045461> Owners
<:arrowcat3:1297148934044651551> Pour toute question relative aux owners.`,
                    color: 0x2E3136
                }],
                components: [selectRow],
                ephemeral: true 
            });
        }
    } catch (error) {
        console.error(error);
    }
};
