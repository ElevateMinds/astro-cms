import { defineConfig } from "astro/config";

import db from "@astrojs/db";
import auth from "auth-astro";

// https://astro.build/config
export default defineConfig({
  integrations: [db(), auth()],
});
