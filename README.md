# frontend-lint-seed
starter skeleton for lintable and Jenkins friendly frontend projects.

## Setup

* install [VS Code](https://code.visualstudio.com/) Version 1.0
* install [VS Code extensions](https://code.visualstudio.com/docs/editor/extension-gallery).
  * ext install EditorConfig
  * ext install ESLint
  * ext install CSSLint
  * ext install HTMLHint
* npm install

## Usage

```shell
$ npm run lint
```

Let's check reports directory.

```
reports
├── csslint-checkstyle.xml
├── eslint-checkstyle.xml
└── htmlhint-checkstyle.xml
```

## Configuration

* [VS Code .vscode/setting.json]()
* [.editconfig]()
* [.eslintrc]()
* [.csslintrc]()
* [.htmlhintrc]()

## Links

* [ESLint Rules](http://eslint.org/docs/rules/)
* [CSSLint Rules](https://github.com/CSSLint/csslint/wiki/rules)
* [HTMLHint Rules](https://github.com/yaniswang/HTMLHint/wiki/Rules)
