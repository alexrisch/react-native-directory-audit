export interface Options {
  path?: string; // Path to package.json. Defaults to ./package.json
  score?: number; // 0 - 100
  monthlyDownloads?: number;
  ignore?: string[];
  devAudit: boolean;
  openIssueSkip: boolean;
}
