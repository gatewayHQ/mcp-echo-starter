#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "mcp-echo-starter",
  version: "1.0.0",
});

server.tool(
  "echo",
  "Echo back a short message. Useful as a hello-world MCP tool.",
  { message: z.string().min(1).max(500).describe("Text to echo back") },
  async ({ message }) => ({
    content: [{ type: "text", text: message }],
  }),
);

const transport = new StdioServerTransport();
await server.connect(transport);
