import { PackageJSON } from '../types/PackageJSON';
import path from 'path';

export const getPackageJSON = (pathToPackage: string): PackageJSON => {
  const resolvedPath = path.resolve(process.cwd(), pathToPackage);

  const packageContents = require(resolvedPath);

  return packageContents;
};
