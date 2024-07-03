const path = require("path");

module.exports = {
  input: [
    "src/**/*.{js,jsx,ts,tsx}", // Adjust this to match your source files' location and extensions
    "!node_modules/**",
    "!dist/**",
  ],
  output: "src/locales", // Path to your existing locale files
  options: {
    debug: false,
    func: {
      list: ["t"], // The function names to scan for
      extensions: [".js", ".jsx", ".ts", ".tsx"], // File types to include
    },
    lngs: ["en", "hr"], // List of languages your application supports
    ns: ["translation"], // List of namespaces you use
    defaultLng: "en",
    defaultNs: "translation",
    resource: {
      loadPath: path.join(__dirname, "src/locales/{{lng}}.json"), // Load path for existing locale files
      savePath: path.join(__dirname, "src/locales/{{lng}}.json"), // Save path for extracted keys
      jsonIndent: 2, // Indentation for JSON files
      lineEnding: "\n", // Line ending for JSON files
    },
    keySeparator: ".", // Separator for nested keys
    nsSeparator: ":", // Separator for namespace and key
    interpolation: {
      prefix: "{{",
      suffix: "}}",
    },
  },
  transform: function customTransform(file, enc, done) {
    const parser = this.parser;
    const content = file.contents.toString(enc);

    // Extract keys from t() function calls
    parser.parseFuncFromString(content, { list: ["t"] }, (key, options) => {
      options.defaultValue = key; // Use the key as the default value
      parser.set(key, options);
    });

    done();
  },
};
