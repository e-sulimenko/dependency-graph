type Specifier = {
  type: 'ImportDefaultSpecifier' | 'ImportSpecifier';
  localName: string;
  importedName?: string;
}

type DependencyNode = {
  parentPath: string;
  childPath: string;
  specifiers: Specifier[];
}

declare const initialData: DependencyNode[];
