# Contributing to this scaffold project

All contributions are welcome in the form of a PR or issue. When making PRs, first make the PR into the 'staging' branch to keep our development database up-to-date. Once you are content with the changes, make a second PR to merge them into main.

## ESLint and prettier

[ESLint](https://eslint.org/) and [prettier](https://prettier.io/) are already
configured with Lambda Labs standards and ready to go. These must be ran from
the CLI prior to commiting code in the following ways:

- `npm run lint` to view all purposed fixes.
- `npm run lint:fix` to apply fixes to eslint issues.
- `npm run format` to apply the standards defined by eslint/prettier config.

Alternatively you can install plugins for your editor of choice.
