const fs = require('fs');
const path = require('path');

const DEPENDENCIES_PATH = path.resolve(__dirname, '../fe/data/raw_dependencies.txt');

fs.writeFileSync(DEPENDENCIES_PATH, '');

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
            
            // TODO typescript aliases
            const isLocalModules = /\./i.test(node.source.value[0]);

            const item = {
              parentPath,
              childPath: isLocalModules ? path.join(filePath, node.source.value) : node.source.value,
              specifiers,
            };

            fs.appendFileSync(DEPENDENCIES_PATH, `${JSON.stringify(item)}\n`);
          },
        };
      },
    }
  }
};
