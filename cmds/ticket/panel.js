module.exports = {
    name: 'ticket',
    description: "Ouvre un ticket de support.",
    go: async (client, db, config, interaction, args) => {
        try {
            const isOwner = db.get(`Owner_${interaction.guild.id}-${interaction.user.id}`) || config.owners.includes(interaction.user.id) || interaction.user.id === interaction.guild.ownerId;
            if (!isOwner) {
                return interaction.reply({
                    content: `\`❌\` *Vous n'avez pas les permissions pour exécuter cette commande*`,
                    ephemeral: true
                });
            }

            await interaction.deferReply();

            const buttonRow = {
                type: 1,
                components: [
                    {
                        type: 2,
                        style: 2, 
                        label: '🎫 Ouvrir un Ticket',
                        custom_id: 'open_ticket',
                        disabled: false 
                    }
                ]
            };

            await interaction.editReply({
                content: '',
                embeds: [{
                    title: `Besoin de contacter l'équipe Yuka ?`,
                    description: `> Créer un ticket sera donc votre solution ! Vous pouvez en créer un avec le bouton ci-dessous et vous recevrez des indications pour aider à la fois le staff et vous-même pour vous donner une réponse dès que possible !`,
                    color: 0x2E3136,
                    footer: { text: 'Ticket' }
                }],
                files: [{
                    attachment: 'https://media.discordapp.net/attachments/1297135566147817504/1299312388088004629/sup_naha.png?ex=671cbe75&is=671b6cf5&hm=dc04c08d0218e5f943d3bf2797bb4204e23d9d8b30ea0f075056e7c7fb76722d&=&format=webp&quality=lossless&width=1023&height=266',
                    name: 'ticket_image.gif'
                }],
                components: [buttonRow]
            });

        } catch (error) {
            console.log(error);
        }
    }
};
