# react-native-directory-audit
CLI package to audit package dependencies against https://reactnative.directory/

# Getting Started

**NPM**
```
npm i react-native-directory-audit
```
**Yarn**
```
yarn add react-native-directory-audit
```

# How it works
Pulls data from https://reactnative.directory/ and checks against your package.json

# Running 
Run:
```
rn-audit audit
```
This will run with default options (see below)

# Options
**Path**
-p --path
Path to package.json to audit

**Score**
-s --score
number 0-100 to audit score from directories site

-m --monthly
Monthly downloads of npm package

-i --ignore
Comma seperated list of packages to ignore

-d -devAudit
Whether to allso audit devDependencies

-o --openIssueSkip 
Don't ask to open new change requests for missing dependencies
