export interface DirectoryEntry {
  githubUrl?: string;
  ios: boolean;
  android: boolean;
  web: boolean;
  expo: boolean;
  github?: object;
  npmPkg: string;
  npm: NPMData;
  score: number;
  matchingScoreModifiers: object[];
  topicSearchString: string;
  unmaintained: boolean;
}

interface NPMData {
  downloads: number;
}
