module.exports = {
    presets: [
      "@babel/preset-env",
      [
        "@babel/preset-react",
        {
          runtime: "classic" // "automatic" for React 17+ JSX transformation
        }
      ],
      "@babel/preset-typescript"
    ],
    plugins: [
      "@babel/plugin-proposal-optional-chaining"
    ]
  };