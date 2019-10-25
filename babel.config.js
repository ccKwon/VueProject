module.exports = function (api) {
  api.cache(true);

  const presets = ["@babel/preset-env"];
  const plugins = ["@babel/plugin-transform-runtime", "@babel/plugin-proposal-class-properties",
    ["component", 
      {
        "libraryName": "mint-ui",
        "style": true
      }
    ]];

  return {
    presets,
    plugins
  };
}