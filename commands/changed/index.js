"use strict";

const Command = require("@erquhart/lerna-command");
const collectUpdates = require("@erquhart/lerna-collect-updates");
const listable = require("@erquhart/lerna-listable");
const output = require("@erquhart/lerna-output");

module.exports = factory;

function factory(argv) {
  return new ChangedCommand(argv);
}

class ChangedCommand extends Command {
  get otherCommandConfigs() {
    // back-compat
    return ["version", "publish"];
  }

  initialize() {
    const updates = collectUpdates(
      this.packageGraph.rawPackageList,
      this.packageGraph,
      this.execOpts,
      this.options
    );

    this.result = listable.format(updates.map(node => node.pkg), this.options);

    if (this.result.count === 0) {
      this.logger.info("", "No changed packages found");

      process.exitCode = 1;

      // prevents execute()
      return false;
    }
  }

  execute() {
    output(this.result.text);

    this.logger.success(
      "found",
      "%d %s ready to publish",
      this.result.count,
      this.result.count === 1 ? "package" : "packages"
    );
  }
}

module.exports.ChangedCommand = ChangedCommand;
