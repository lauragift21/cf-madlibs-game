import { defineConfig } from 'astro/config';
import cloudflare from "@astrojs/cloudflare";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: cloudflare({
    runtime: {
      mode: 'local'
    }
  }),
  integrations: [react()]
});