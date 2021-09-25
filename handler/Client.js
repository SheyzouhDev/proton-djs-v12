const { Client, Collection } = require ('discord.js');

module.exports = class Proton extends Client {

    constructor(options) {
        super(options)

        this.commands = new Collection();
        this.cooldowns = new Collection();
        this.aliases = new Collection();
        this.settings = require('../settings.json');
        this.package = require("../package.json");
        this.recent = new Set();
    };
};