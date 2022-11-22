module.exports = {
    app: {
        token: 'MTA0NDQ2Nzg3Mjc2MTY1OTQyMw.GjrleQ.Oc_uYpsUTXz1K1K2Oxk4dsISkmJiVVETYH1jAg',
        playing: 'Super Mario',
        global: false,
        guild: '473280135903182849'
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
