const fs = require('fs');
const path = require('path');

const RESULT_PATH = path.resolve(__dirname, '../result.txt');

fs.writeFileSync(RESULT_PATH, '');

module.exports = {
  rules: {
    'walk-through': {
      create(context) {
        return {
          ImportDeclaration(node) {
            const specifiers = node.specifiers.map((item) => ({
              type: item.type,
              localName: item.local.name,
              importedName: item.imported?.name,
            }));

            const [, parentPath] = context.filename.split(context.cwd);
            const [, filename] = context.filename.split(context.cwd);
            const filePath = filename.split('/').slice(0, -1).join('/');

            const item = {
              parentPath,
              childPath: path.join(filePath, node.source.value),
              specifiers,
            };

            fs.appendFileSync(RESULT_PATH, `${JSON.stringify(item)}\n`);
          },
        };
      },
    }
  }
};
