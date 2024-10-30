module.exports = {
    name: 'setownerrole',
    description: 'Définir le rôle pour les ticket owner.',
    options: [{
        name: 'role',
        description: "Le rôle à définir pour les owners.",
        type: 8,
        required: true
    }],
    go: async (client, db, config, interaction, args) => {
        try {
            if (!db.get(`Owner_${interaction.guild.id}-${interaction.user.id}`) && !config.owners.includes(interaction.user.id) && interaction.user.id !== interaction.guild.ownerId) {
                return interaction.reply({ content: `\`❌\` *Vous n'avez pas les permissions pour exécuter cette commande*`, ephemeral: true });
            }

            const role = interaction.options.getRole('role');

        
            db.set(`ownerrole_${interaction.guild.id}`, role.id);

            interaction.reply({
                content: `Le rôle pour les ticket owner : ${role}.`,
                ephemeral: true
            });
        } catch (error) {
            console.log(error);
            interaction.reply({
                content: 'Une erreur est survenue lors du traitement de votre commande.',
                ephemeral: true
            });
        }
    },
};
