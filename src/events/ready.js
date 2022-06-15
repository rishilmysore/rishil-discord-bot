module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log('Rishil Bot is online!');
        client.user.setPresence({activities: [{name: `with your mom`, type: `PLAYING`}]});
    },
};