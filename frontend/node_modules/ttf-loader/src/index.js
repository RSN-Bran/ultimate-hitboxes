const ttf2woff = require('ttf2woff');
const fileLoader = require('file-loader');

module.exports = function ttfLoader(ttfContent) {
  const woff = Buffer.from(ttf2woff(ttfContent).buffer);

  const ttfSource = fileLoader.call(this, ttfContent);
  const woffSource = fileLoader.call(
    Object.assign({}, this, {
      query: Object.assign({}, this.query, {
        name: this.query.name.replace('[ext]', 'woff'),
      }),
    }),
    woff,
  );

  const ttfSourceValue = ttfSource.replace('module.exports = ', '').replace(';', '');
  const woffSourceValue = woffSource.replace('module.exports = ', '').replace(';', '');

  return `
var createFontFamily = require('ttf-loader/lib/create-font-family');

module.exports = createFontFamily({
  ttf: ${ttfSourceValue},
  woff: ${woffSourceValue},
});
`.substr(1); // to remove first empty line
};

module.exports.raw = true;
