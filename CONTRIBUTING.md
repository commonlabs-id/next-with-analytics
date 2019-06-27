# Contributing Guidelines

Pull requests & contributions welcome! This document outlines the steps you need to take to develop this package locally and contribute changes. This project was bootstrapped with [TSDX](https://github.com/jaredpalmer/tsdx).

## The Five Golden Rules

The simple steps of contributing to any GitHub project are as follows:

1. [Fork the repository](https://github.com/kata-ai/wicara/fork)
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push -u origin my-new-feature`
5. Create a [Pull Request](https://github.com/kata-ai/wicara/pulls)!

To keep your fork of in sync with this repository, [follow this guide](https://help.github.com/articles/syncing-a-fork/).

## Prerequisites

### Windows, macOS and Linux

- [Git](http://git-scm.com/)
- [Node.js](http://nodejs.org/) (8.0.0+)
- [Yarn](https://yarnpkg.com/)
- Text Editor with [EditorConfig](http://editorconfig.org/) & [Prettier](https://prettier.io/) support. (We recommend [Visual Studio Code](https://code.visualstudio.com/))

#### Prerequisite Check

Run these commands inside the Terminal (PowerShell/Command Prompt for Windows).

**Git:** You should see the version number:

```sh-session
$ git version
git version 2.18.0
```

**Node.js:** You should see the version number:

```sh-session
$ node -v
v10.16.0
```

**Yarn:** You should see the version number:

```sh-session
$ yarn -v
1.16.0
```

## Setting Up

First, you should clone the repository.

```sh-session
$ git clone https://github.com/pinjhollist/next-with-analytics.git
Cloning into 'next-with-analytics'...
remote: Enumerating objects: 61, done.
remote: Counting objects: 100% (61/61), done.
remote: Compressing objects: 100% (43/43), done.
remote: Total 61 (delta 22), reused 51 (delta 13), pack-reused 0
Unpacking objects: 100% (61/61), done.
```

After these repository has been cloned, `cd` into the repository:

```sh-session
$ cd next-with-analytics
```

Install the project's dependencies. Note that we use Yarn, not npm:

```sh-session
$ yarn
```

## Local Development

Below is a list of commands you will probably find useful.

### `npm start` or `yarn start`

Runs the project in development/watch mode. Your project will be rebuilt upon changes. TSDX has a special logger for you convenience. Error messages are pretty printed and formatted for compatibility VS Code's Problems tab.

<img src="https://user-images.githubusercontent.com/4060187/52168303-574d3a00-26f6-11e9-9f3b-71dbec9ebfcb.gif" width="600" />

Your library will be rebuilt if you make edits.

### `npm run build` or `yarn build`

Bundles the package to the `dist` folder.
The package is optimized and bundled with Rollup into multiple formats (CommonJS, UMD, and ES Module).

<img src="https://user-images.githubusercontent.com/4060187/52168322-a98e5b00-26f6-11e9-8cf6-222d716b75ef.gif" width="600" />

### `npm test` or `yarn test`

Runs the test watcher (Jest) in an interactive mode.
By default, runs tests related to files changed since the last commit.
