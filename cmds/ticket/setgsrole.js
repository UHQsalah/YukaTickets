module.exports = {
    name: 'setgsrole',
    description: 'Définir le rôle pour la gestion du staff.',
    options: [{
        name: 'role',
        description: "Le rôle à définir pour la gestion du staff.",
        type: 8,
        required: true
    }],
    go: async (client, db, config, interaction, args) => {
        try {

            if (!db.get(`Owner_${interaction.guild.id}-${interaction.user.id}`) && !config.owners.includes(interaction.user.id) && interaction.user.id !== interaction.guild.ownerId) {
                return interaction.reply({ content: `\`❌\` *Vous n'avez pas les permissions pour exécuter cette commande*`, ephemeral: true });
            }

            const role = interaction.options.getRole('role');

            
            
            db.set(`gsrole_${interaction.guild.id}`, role.id);

            
            interaction.reply({
                content: `Le rôle pour la gestion du staff a été défini sur ${role}.`,
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
