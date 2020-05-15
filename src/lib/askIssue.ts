import readline from 'readline';
import { createIssue } from './createIssue';

const askInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

export const askIssue = async (dependency: string): Promise<void> => {
  return new Promise(resolve => {
    askInterface.question(`Couldnt find: ${dependency} would you like to create an issue? (Y/N) \n`, async answer => {
      if (answer === 'Y' || answer === 'y') {
        resolve(createIssue(dependency));
      } else {
        resolve();
      }
    })
  });
}