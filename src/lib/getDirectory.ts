import curl from 'curlrequest';
import { DirectoryEntry } from '../types/DirectoryEntry';

const CURL = 'https://github.com/react-native-community/directory/raw/master/react-native-libraries.json';

let savedDirectory: DirectoryEntry[] | null;

export const getDirectory = (): Promise<DirectoryEntry[]> => {
  return new Promise(resolve => {
    if (savedDirectory) {
      resolve(savedDirectory);
    }
    curl.request({url: CURL}, (err, stdout, meta) => {
      const directory = JSON.parse(stdout);
      savedDirectory = directory;
      resolve(directory);
    });
  });
};

