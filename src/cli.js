#!/usr/bin/env node

const { Command } = require("commander");
const listner = require("./lib/listner");

function handleCLIargs() {
    // creating a command instance
    const program = new Command();

    // creating tool
    program
    .name("directus_utils")
    .description("Utility For Directus Extensions")
    .version("1.0.4");

    // adding command
    program
    .command("gossip")
    .description("Watches for file change")
    .argument("<destination_file>", "Destination File")
    .action((a) => {
        listner(a);
    });

    program.parse();
}

handleCLIargs();

