import { defineConfig } from "cypress";
//import customViteConfig from './customConfig'

export default defineConfig({
  viewportHeight: 1080,
  viewportWidth: 1920,
  e2e: {
    setupNodeEvents(on, config) {

    },
    baseUrl: "http://localhost:5173/",
    specPattern: "cypress/e2e/**/*.spec.{js,jsx,ts,tsx}",
  },
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
      // optionally pass in vite config
      //viteConfig: customViteConfig,
      // or a function - the result is merged with
      // any `vite.config` file that is detected
      // viteConfig: async () => {
      //   // ... do things ...
      //   const modifiedConfig = await injectCustomConfig(baseConfig)
      //   return modifiedConfig
      // },
    },
  },
});
