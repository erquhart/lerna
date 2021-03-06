"use strict";

jest.mock("@erquhart/lerna-child-process");

// mocked modules
const ChildProcessUtilities = require("@erquhart/lerna-child-process");

// file under test
const npmRunScript = require("..");

describe("npm-run-script", () => {
  ChildProcessUtilities.exec.mockResolvedValue();
  ChildProcessUtilities.spawnStreaming.mockResolvedValue();

  describe("npmRunScript()", () => {
    it("runs an npm script in a directory", async () => {
      const script = "foo";
      const config = {
        args: ["--bar", "baz"],
        pkg: {
          location: "/test/npm/run/script",
        },
        npmClient: "npm",
      };

      await npmRunScript(script, config);

      expect(ChildProcessUtilities.exec).toHaveBeenLastCalledWith("npm", ["run", script, "--bar", "baz"], {
        cwd: config.pkg.location,
        env: {},
        pkg: config.pkg,
        reject: true,
      });
    });

    it("accepts opts.reject", async () => {
      const script = "foo";
      const config = {
        args: [],
        pkg: {
          location: "/test/npm/run/script",
        },
        npmClient: "npm",
        reject: false,
      };

      await npmRunScript(script, config);

      expect(ChildProcessUtilities.exec).toHaveBeenLastCalledWith("npm", ["run", script], {
        cwd: config.pkg.location,
        env: {},
        pkg: config.pkg,
        reject: false,
      });
    });

    it("supports a different npmClient", async () => {
      const script = "foo";
      const config = {
        args: ["--bar", "baz"],
        pkg: {
          location: "/test/npm/run/script",
        },
        npmClient: "yarn",
      };

      await npmRunScript(script, config);

      expect(ChildProcessUtilities.exec).toHaveBeenLastCalledWith("yarn", ["run", script, "--bar", "baz"], {
        cwd: config.pkg.location,
        env: {},
        pkg: config.pkg,
        reject: true,
      });
    });
  });

  describe("npmRunScript.stream()", () => {
    it("runs an npm script in a package with streaming", async () => {
      const script = "foo";
      const config = {
        args: ["--bar", "baz"],
        pkg: {
          name: "qux",
          location: "/test/npm/run/script/stream",
        },
        prefix: true,
        npmClient: "npm",
      };

      await npmRunScript.stream(script, config);

      expect(ChildProcessUtilities.spawnStreaming).toHaveBeenLastCalledWith(
        "npm",
        ["run", script, "--bar", "baz"],
        {
          cwd: config.pkg.location,
          env: {},
          pkg: config.pkg,
          reject: true,
        },
        config.pkg.name
      );
    });

    it("accepts opts.reject", async () => {
      const script = "foo";
      const config = {
        args: [],
        pkg: {
          name: "qux",
          location: "/test/npm/run/script/stream",
        },
        npmClient: "npm",
        reject: false,
      };

      await npmRunScript.stream(script, config);

      expect(ChildProcessUtilities.spawnStreaming).toHaveBeenLastCalledWith(
        "npm",
        ["run", script],
        {
          cwd: config.pkg.location,
          env: {},
          pkg: config.pkg,
          reject: false,
        },
        undefined
      );
    });
  });
});
