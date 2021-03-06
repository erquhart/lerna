"use strict";

jest.mock("@erquhart/lerna-child-process");

const { exec: mockExec } = require("@erquhart/lerna-child-process");
const gitTag = require("../lib/git-tag");

describe("gitTag", () => {
  mockExec.mockResolvedValue();

  it("creates an annotated git tag", async () => {
    const tag = "v1.2.3";
    const opts = { cwd: "default" };

    await gitTag(tag, {}, opts);

    expect(mockExec).toHaveBeenLastCalledWith("git", ["tag", tag, "-m", tag], opts);
  });

  it("signs the tag when configured", async () => {
    const tag = "v3.2.1";
    const opts = { cwd: "signed" };

    await gitTag(tag, { signGitTag: true }, opts);

    expect(mockExec).toHaveBeenLastCalledWith("git", ["tag", tag, "-m", tag, "--sign"], opts);
  });
});
