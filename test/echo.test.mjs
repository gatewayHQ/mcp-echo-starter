import { test } from "node:test";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function rpc(proc, id, method, params) {
  const payload = JSON.stringify({ jsonrpc: "2.0", id, method, params }) + "\n";
  proc.stdin.write(payload);
}

test("echo tool returns the same message over stdio", async () => {
  const proc = spawn("node", [join(root, "dist/index.js")], {
    stdio: ["pipe", "pipe", "pipe"],
  });
  let buf = "";
  const replies = [];
  proc.stdout.on("data", (chunk) => {
    buf += chunk.toString("utf8");
    let idx;
    while ((idx = buf.indexOf("\n")) >= 0) {
      const line = buf.slice(0, idx);
      buf = buf.slice(idx + 1);
      if (line.trim()) replies.push(JSON.parse(line));
    }
  });

  rpc(proc, 1, "initialize", {
    protocolVersion: "2024-11-05",
    capabilities: {},
    clientInfo: { name: "test", version: "1.0.0" },
  });

  await new Promise((r) => setTimeout(r, 200));
  proc.stdin.write(JSON.stringify({ jsonrpc: "2.0", method: "notifications/initialized" }) + "\n");

  rpc(proc, 2, "tools/call", {
    name: "echo",
    arguments: { message: "hello-mcp" },
  });

  await new Promise((r) => setTimeout(r, 400));
  proc.kill();

  const call = replies.find((r) => r.id === 2);
  assert.ok(call, "expected tools/call reply");
  assert.equal(call.result?.content?.[0]?.text, "hello-mcp");
});
