"use strict";

const cli = require("@erquhart/lerna-cli");

const addCmd = require("@erquhart/lerna-add/command");
const bootstrapCmd = require("@erquhart/lerna-bootstrap/command");
const changedCmd = require("@erquhart/lerna-changed/command");
const cleanCmd = require("@erquhart/lerna-clean/command");
const createCmd = require("@erquhart/lerna-create/command");
const diffCmd = require("@erquhart/lerna-diff/command");
const execCmd = require("@erquhart/lerna-exec/command");
const importCmd = require("@erquhart/lerna-import/command");
const initCmd = require("@erquhart/lerna-init/command");
const linkCmd = require("@erquhart/lerna-link/command");
const listCmd = require("@erquhart/lerna-list/command");
const publishCmd = require("@erquhart/lerna-publish/command");
const runCmd = require("@erquhart/lerna-run/command");
const versionCmd = require("@erquhart/lerna-version/command");

const pkg = require("./package.json");

module.exports = main;

function main(argv) {
  const context = {
    lernaVersion: pkg.version,
  };

  return cli()
    .command(addCmd)
    .command(bootstrapCmd)
    .command(changedCmd)
    .command(cleanCmd)
    .command(createCmd)
    .command(diffCmd)
    .command(execCmd)
    .command(importCmd)
    .command(initCmd)
    .command(linkCmd)
    .command(listCmd)
    .command(publishCmd)
    .command(runCmd)
    .command(versionCmd)
    .parse(argv, context);
}
