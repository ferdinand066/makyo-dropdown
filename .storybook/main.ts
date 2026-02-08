import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
  webpackFinal: async (config) => {
    config.module = config.module || {};
    config.module.rules = config.module.rules || [];

    config.module.rules = config.module.rules.map((rule: any) => {
      if (rule && rule.test && rule.test.toString().includes('tsx')) {
        return {
          ...rule,
          use: [
            {
              loader: require.resolve('babel-loader'),
              options: {
                presets: [
                  require.resolve('@babel/preset-env'),
                  [require.resolve('@babel/preset-react'), { runtime: 'automatic' }],
                  require.resolve('@babel/preset-typescript'),
                ],
              },
            },
          ],
        };
      }
      return rule;
    });

    config.module.rules = config.module.rules.map((rule: any) => {
      if (rule && rule.test && rule.test.toString().includes('css')) {
        return {
          ...rule,
          use: [
            require.resolve('style-loader'),
            require.resolve('css-loader'),
            {
              loader: require.resolve('postcss-loader'),
              options: {
                postcssOptions: {
                  plugins: [
                    require('tailwindcss'),
                    require('autoprefixer'),
                  ],
                },
              },
            },
          ],
        };
      }
      return rule;
    });

    return config;
  },
};

export default config;
