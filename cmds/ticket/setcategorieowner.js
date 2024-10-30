module.exports = {
    name: 'setcategorieowner',
    description: "Définit la catégorie pour les tickets",
    type: 1,
    options: [{
        name: 'categorie',
        description: "Spécifie la nouvelle catégorie pour les tickets",
        type: 7,
        required: true
    }],
    go: async (client, db, config, interaction, args) => {
        try {
            if (!db.get(`Owner_${interaction.guild.id}-${interaction.user.id}`) && !config.owners.includes(interaction.user.id) && interaction.user.id !== interaction.guild.ownerId) return interaction.reply({ content: `\`❌\` *Vous n'avez pas les permission pour executé cette commande*`, ephemeral: true })


            const newCategory = interaction.options.getChannel('categorie');

            db.set(`ticketcategoryowner_${interaction.guild.id}`, newCategory.id);

            interaction.reply({
                content: `La catégorie des tickets a été définie sur ${newCategory.name}.`,
                ephemeral: true
            });
        } catch (error) {
            console.log(error);
            interaction.reply({
                content: 'Une erreur est survenue lors du traitement de votre demande. Veuillez réessayer ultérieurement.',
                ephemeral: true
            });
        }
    }
};