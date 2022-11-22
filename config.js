require('dotenv').config();
module.exports = {
    app: {
        token: process.env.API_TOKEN,
        playing: 'Super Mario',
        global: process.env.GLOBAL_COMMANDS == 'true' ? true : false,
        guilds: ['473280135903182849', '473280135903182849']
    },

    opt: {
        DJ: {
            enabled: true,
            roleName: 'DJ',
            commands: ['clear', 'pause', 'skip', 'stop', 'remove', 'volume', 'controller', 'jump', 'loop', 'seek', 'playnext']
        },
        Active: {
            enabled: true,
            roleName: 'Active',
            commands: ['letin']
        },
        maxVol: 100,
        leaveOnEnd: true,
        loopMessage: false,
        spotifyBridge: true,
        defaultvolume: 75,
        discordPlayer: {
            ytdlOptions: {
                quality: 'highestaudio',
                highWaterMark: 1 << 25
            }
        }
    }
};
