# MCP Echo Starter

Minimal [Model Context Protocol](https://modelcontextprotocol.io/) server in TypeScript: one `echo` tool over stdio. Use it as a hello-world before building real tools.

## Requirements

- Node.js 18+

## Setup

```bash
npm install
npm test
npm start
```

## Connect

**Claude Code**

```bash
claude mcp add echo -- node /absolute/path/to/mcp-echo-starter/dist/index.js
```

**Cursor** — add to MCP settings:

```json
{
  "mcpServers": {
    "echo": {
      "command": "node",
      "args": ["/absolute/path/to/mcp-echo-starter/dist/index.js"]
    }
  }
}
```

Then ask the model to call the `echo` tool.

## What this is (and isn't)

This free sample has **one tool** and a smoke test. The paid [MCP Server Starter](https://shipreadyagents.com/templates/mcp-server-starter) adds notes CRUD, an SSRF-safe `fetch_url`, a resource, a prompt template, and a fuller test suite.

Guide: [Best MCP Server Starter for TypeScript](https://shipreadyagents.com/blog/best-mcp-server-starter)

## License

MIT
