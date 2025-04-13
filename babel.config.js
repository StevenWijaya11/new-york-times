module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    ['dotenv-import', {
      moduleName: '@env',
      path: '.env',
    }],
    ['module-resolver',{
        root: ['./'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: [
          { '@test': './__tests__/' },
          { '@app': './src/app/' },
          { '@core': './src/core/' },
          { '@resources': './src/resources/' },
          { '@ui': './src/ui/' },
          { '@utils': './src/utils/' },
        ],
      }],
  ],
};
