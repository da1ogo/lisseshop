const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    allowedHosts: "all",
    client: {
      webSocketURL: 'auto://0.0.0.0:0/ws',
      overlay: false,
    },
  },
  css: {
    loaderOptions: {
      scss: {
        additionalData: `
          @import "@/assets/scss/tailwind.scss";
          @import "@/assets/scss/dashboard/style.scss";
          @import "@/assets/scss/vueform-multiselect.scss";
          @import "@/assets/scss/main.scss";
        `,
      },
    },
  },
});
