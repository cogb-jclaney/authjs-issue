import { Config, defineConfig } from "drizzle-kit";

// export default defineConfig({
//   schema: "./src/db/schema.ts",
//   out: "./drizzle",
//   dialect: "",
//   driver: "d1-http",
//   dbCredentials: {
//     accountId:
//     wranglerConfigPath: "wrangler.toml",
//     dbName: "waste",
//   },
// }) satisfies Config;

export default defineConfig({
  dialect: "sqlite",
  schema: "./src/db/schema.ts",
  dbCredentials: {
    url: ".wrangler/state/v3/d1/miniflare-D1DatabaseObject/09caf13acd201f4d518c59e4af06dd8c41169eafc5d95412fe8d2c16935e508a.sqlite",
  },
});
