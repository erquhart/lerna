"use strict";

const describeRef = require("@erquhart/lerna-describe-ref");
const ValidationError = require("@erquhart/lerna-validation-error");

module.exports = checkWorkingTree;
module.exports.throwIfReleased = throwIfReleased;
module.exports.throwIfUncommitted = throwIfUncommitted;

function checkWorkingTree({ cwd } = {}) {
  let chain = Promise.resolve();

  chain = chain.then(() => describeRef({ cwd }));

  // wrap each test separately to allow all applicable errors to be reported
  const tests = [
    // prevent duplicate versioning
    chain.then(throwIfReleased),
    // prevent publish of uncommitted changes
    chain.then(throwIfUncommitted),
  ];

  // passes through result of describeRef() to aid composability
  return chain.then(result => Promise.all(tests).then(() => result));
}

function throwIfReleased({ refCount }) {
  if (refCount === "0") {
    throw new ValidationError(
      "ERELEASED",
      "The current commit has already been released. Please make new commits before continuing."
    );
  }
}

function throwIfUncommitted({ isDirty }) {
  if (isDirty) {
    throw new ValidationError(
      "EUNCOMMIT",
      "Working tree has uncommitted changes, please commit or remove changes before continuing."
    );
  }
}
