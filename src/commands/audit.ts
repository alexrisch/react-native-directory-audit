import { Options } from '../types/Options';
import { getPackageJSON } from '../lib/getPackageJSON';
import { getDependencies } from '../lib/getDependencies';
import { getDirectory } from '../lib/getDirectory';
import { DirectoryEntry } from '../types/DirectoryEntry';
import { askIssue } from '../lib/askIssue';
import { autoIgnoredLibs } from '../lib/autoIgnoredLibs';

interface AuditEntry {
  name: string;
  reason: string;
}

export async function audit(options: Options) {
  const { path, score, monthlyDownloads, ignore, devAudit, openIssueSkip } = options;

  const updatedIgnore = ignore ? autoIgnoredLibs.concat(ignore) : autoIgnoredLibs;

  const packageJSON = getPackageJSON(path);
  const dependencies = getDependencies(packageJSON, devAudit, updatedIgnore);
  // Get directory
  const directory = await getDirectory();
  // Create Audit list
  const auditList = await auditDependencies(dependencies, directory, openIssueSkip, score, monthlyDownloads);
  const auditLength = auditList.length;
  // Write out
  for (const auditDependency of auditList) {
    console.log('\x1b[30m\x1b[41m\x1b[4m', auditDependency.name, '\x1b[0m');
    console.log(auditDependency.reason);
  }
  console.log('\x1b[32m', 'RN Dependency audit finished found ' + auditLength + ' issues','\x1b[0m')
  if (auditLength) {
    process.exit(1);
  }
  process.exit();
}

const auditDependencies = async (dependencies: string[], directory: DirectoryEntry[], openIssueSkip: boolean, score?: number, monthlyDownloads?: number): Promise<AuditEntry[]> => {
  const auditArray: AuditEntry[] = [];

  for (const dependency of dependencies) {
    const directoryDependency = directory.find(x => {
      return x.npmPkg === dependency || x.githubUrl.split('/').pop() === dependency;
    });

    if (!directoryDependency ) {
      if (!openIssueSkip) {
        await askIssue(dependency)
      }
    } else {
      const reason: string[] = [];

      if (directoryDependency.unmaintained) {
        reason.push('Unmaintained');
      }

      if (score && directoryDependency.score <= score) {
        reason.push('Low Score: ' + directoryDependency.score);
      }

      if (monthlyDownloads && directoryDependency.npm.downloads <= monthlyDownloads) {
        reason.push('Low Monthly Downloads: ' + directoryDependency.npm.downloads);
      }

      if (reason.length) {
        auditArray.push({
          name: dependency,
          reason: reason.join('\n')
        });  
      }
    }
  }

  return auditArray;
};
