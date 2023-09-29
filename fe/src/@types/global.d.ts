type Specifier = {
  type: 'ImportDefaultSpecifier' | 'ImportSpecifier' | 'ImportNamespaceSpecifier';
  localName: string;
  importedName?: string;
}

type DependencyNode = {
  parentPath: string;
  childPath: string;
  specifiers: Specifier[];
}

declare const initialData: DependencyNode[];
