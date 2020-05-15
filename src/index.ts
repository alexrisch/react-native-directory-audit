#!/usr/bin/env node
import {command, on, parse} from 'commander';
import { audit } from './commands';

function commaSeparatedList(value, dummyPrevious) {
  return value?.split(',');
}

command('audit')
  .description('Audit RN Packages')
  .option('-p, --path <type>', 'Path to project package.json', 'package.json')
  .option('-s, --score', 'Audit by score')
  .option('-m, --monthly', 'Audit further by monthly downloads')
  .option('-i, --ignore <items>', 'Comma seperated list of packages to ignore', commaSeparatedList)
  .option('-d, --devAudit', 'Audit dev packages also', false)
  .option('-o, --openIssueSkip', 'Skip ask to open issue for unknown packages', false)
  .action(audit)

on('--help', () => {/* no-op */});

// make help default
if (process.argv.length === 2) {
  process.argv.push('-h')
}
parse(process.argv);

