const path = require('path');
const fs = require('fs');
const del = require('del');

const rootFolder = path.join(__dirname, '..');
const docsFolder = path.join(rootFolder, 'docs');
const srcFolder = path.join(rootFolder, 'dist');

del(`${docsFolder}/**`).then(() => {
  fs.mkdirSync(docsFolder);
  fs.readdirSync(srcFolder).forEach((filename) => {
    fs.copyFileSync(path.join(srcFolder, filename), path.join(docsFolder, filename));
    console.log(`Copied: docs/${filename}`); // eslint-disable-line no-console
  });
});
