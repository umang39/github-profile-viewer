const path = require("path");
console.log(__dirname);
module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app",
    "@storybook/addon-docs",
  ],
  framework: "@storybook/react",
  webpackFinal: async (config) => {
    config.resolve.alias = {
      "@src": path.resolve(__dirname, "../src"),
      "@components": path.resolve(__dirname, "../src/components"),
      "@hooks": path.resolve(__dirname, "../src/hooks"),
      "@pages": path.resolve(__dirname, "../src/pages"),
      "@services": path.resolve(__dirname, "../src/services"),
      "@store": path.resolve(__dirname, "../src/store"),
      "@interface": path.resolve(__dirname, "../src/interface"),
      "@constants": path.resolve(__dirname, "../src/constants"),
      "@assets": path.resolve(__dirname, "../src/assets"),
    };
    return config;
  },
};
