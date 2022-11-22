const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'letin',
    description: 'let a user in by giving them the \'champs\' role. active members only.',
    options: [
        {
            name: 'user',
            description: 'the user you want to let in',
            type: ApplicationCommandOptionType.User,
            required: true
        }
    ],

    execute({ inter }) {
        const user = inter.options.getUser('user');
        const member = inter.guild.members.cache.get(user.id);
        const champs = inter.guild.roles.cache.find(role => role.name === 'Champs');

        if (member.bot) return inter.reply({ content: `You can't let a bot in ${inter.member}... try again ? ❌`, ephemeral: true });

        if (member.roles.cache.has(champs.id)) return inter.reply({ content: `This user is already a champ ${inter.member}... try again ? ❌`, ephemeral: true });

        member.roles.add(champs)
            .then(() => inter.reply({ content: `${inter.user} has let ${user} in! ✅` }))
            .catch((e) => {
                console.log(e);
                inter.reply({ content: `Something went wrong ${inter.member}... try again ? ❌`, ephemeral: true })}
            );
    },
};