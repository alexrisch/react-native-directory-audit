import open from 'open';
import { getDirectory } from './getDirectory';

const REPO_URL = `https://github.com/react-native-directory/website/edit/master/react-native-libraries.json`

const TEMPLATE_ENTRY = `{
  "githubUrl": "<THE GITHUB URL>",
  "ios": false,
  "android": false,
  "web": false,
  "expo": false,
  "windows": false,
  "macos": false,
  "examples": ["<THE URL TO REPO>"],
  "npmPkg": "<NPM PACKAGE NAME>",
  "unmaintained": false,
}`;

const TEMPLATE_CHANGE = `
# Why

<!--
Does this PR add a feature? Address a bug? Add a new library?

Document your changes here.
-->

# Checklist

<!--
Check completed item, when applicable, via: [X]
-->

If you added a new library:

- [x] Added it to **react-native-libraries.json**

If you added a feature or fixed a bug:

- [ ] Documented in this PR how to use the feature or replicate the bug.
- [ ] Documented in this PR how you fixed or created the feature.

* Added from react-native-directory-audit *
** COPY BELOW CONTENTS TO THE END OF THE FILE **
`;

export const createIssue = async (dependency: string): Promise<void> => {
  await openIssueUrl(dependency);
  return;
};


async function openIssueUrl(title: string): Promise<void> {

  const updatedTitle = 'Missing package ' + title;
  let changeUrl = `${REPO_URL}?message=${encodeURIComponent(updatedTitle)}`;

  // description 
  const updatedDescription = TEMPLATE_CHANGE + TEMPLATE_ENTRY.replace('<NPM PACKAGE NAME>', title);
  changeUrl += '&description=' + encodeURIComponent(updatedDescription);

  await open(changeUrl)
  return;
}

