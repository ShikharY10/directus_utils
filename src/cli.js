#!/usr/bin/env node

const { Command } = require("commander");
const listner = require("./lib/listner");

function handleCLIargs() {
    // creating a command instance
    const program = new Command();

    // creating tool
    program
    .name("directus_utils")
    .description("A CLI tool for performing simple math functions")
    .version("1.0.0");

    // adding command
    program
    .command("gossip")
    .description("Watches for file change")
    .argument("<project_name>", "Project Name")
    .argument("<extension_type>", "Extension Type")
    .argument("<extension name>", "Extension Name")
    .action((a, b, c) => {
        listner(a, b, c);
    });

    program.parse();
}

handleCLIargs();

