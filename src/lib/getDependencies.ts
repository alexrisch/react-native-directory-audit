import { PackageJSON } from '../types/PackageJSON';

export const getDependencies = (packageJSON: PackageJSON, includeDev: boolean, ignore?: string[]): string[] => {
  let dependencyArray = []; 
  const {dependencies, devDependencies} = packageJSON;
  if (dependencies) {
    dependencyArray = Object.keys(dependencies)
    .filter(item => {
      return filterItem(item, ignore);
    })
  }
  if (includeDev && devDependencies) {
    const devArray = Object.keys(devDependencies)
    .filter(item => {
      return filterItem(item, ignore);
    });
    dependencyArray = dependencyArray.concat(devArray);
  }
  return dependencyArray;
};

const filterItem = (dependency: string, ignore?: string[]): boolean => {
  if (!(dependency.includes('react-native') ||
  dependency.includes('expo') ||
  dependency.includes('reactnative') ||
  dependency.includes('rn'))) {
    return false;
  }
  if (!ignore) {
    return true;
  }
  return ignore.indexOf(dependency) === -1;
}

